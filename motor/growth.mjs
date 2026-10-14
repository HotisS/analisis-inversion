#!/usr/bin/env node
// Análisis growth: puntuación (0-100), objetivo a 12 meses por múltiplo y señal.
// Método: verticales/growth/metodo.md. Sin dependencias. Las versiones del método
// (para el backtest, verticales/growth/backtest/) están en VERSIONES; manda VIGENTE.
//
//   node motor/growth.mjs informes-growth/<carpeta>/datos.json   → escribe "calc" en el JSON e imprime el resumen
//   node motor/growth.mjs --todos                                → recalcula todas y rehace informes-growth/resumen.md
//   --version vN                                                 → calcula con otra versión (no la escribe)

import fs from 'node:fs';
import path from 'node:path';

const BASE = {
  pesos: { A: 25, B: 20, C: 20, D: 15, E: 10, F: 10 },
  desaceleracion: true,           // rebaja el múltiplo base en proporción a la desaceleración
  bajista_factor: 0.6, alcista_techo: 1.4,
  euforia: { modo: 'resta', puntos: 3, subida: 150, ratio: null },
  ratio_max: null,                // filtro de compra: EV/ventas NTM ÷ crecimiento NTM (%)
  compra: { puntuacion: 70, ponderada: 20, base: 10, senales: 3, bajista: -45, pista: 24 },
  venta: { puntuacion: 50, ponderada: -10 },
  objetivo: 'reversion',          // 'reversion': base = mín(actual, mediana 3 años); 'actual': base = múltiplo de hoy
  desac_exp: 1, desac_min: 0.6,   // rebaja por desaceleración = (g objetivo / g actual)^exp, con suelo
  evbb_max: null,                 // filtro de compra: EV / beneficio bruto de los próximos 12 meses
  proy_forward: false,            // la proyección mecánica mezcla el crecimiento pasado con el CAGR propio
};
export const VERSIONES = {
  v1: { ...BASE, descripcion: 'Primera versión (14-oct, 14:30)' },
  v2: { ...BASE, descripcion: 'Objetivo con el múltiplo de hoy (sin vuelta a la media), rebaja suave por desaceleración',
    objetivo: 'actual', desac_exp: 0.5, desac_min: 0.7, alcista_techo: 1.3,
    compra: { ...BASE.compra, bajista: -50 } },
  v3: { ...BASE, descripcion: 'v2 + filtro de valoración (EV/beneficio bruto ≤ 35) + euforia que veta + listones 60 puntos y 15 %',
    objetivo: 'actual', desac_exp: 0.5, desac_min: 0.7, alcista_techo: 1.3, proy_forward: true,
    evbb_max: 35, euforia: { modo: 'veto', subida: 150, evbb: 20 },
    compra: { puntuacion: 60, ponderada: 15, base: 10, senales: 3, bajista: -50, pista: 24 } },
  v4: { ...BASE, descripcion: 'v3 + el alcista puede volver a su mediana o a comparables (techo ×1,6) + compra si el precio no exige más múltiplo (base ≥ 0, ponderada ≥ 10 %) con ≥ 4 señales',
    objetivo: 'actual', desac_exp: 0.5, desac_min: 0.7, alcista_techo: 1.6, alcista_min: 1.3, proy_forward: true,
    evbb_max: 35, euforia: { modo: 'veto', subida: 150, evbb: 20 },
    compra: { puntuacion: 60, ponderada: 10, base: 0, senales: 4, bajista: -50, pista: 24 },
    forzar_mecanica: true, vigilar: { ponderada: 0 } },
};
// Fase 2 del backtest (universo neutral ARKK, protocolo.md): v5-v8 ajustadas con las cohortes 2019 y 2021
const V4 = VERSIONES.v4;
VERSIONES.v5 = { ...V4, descripcion: 'v4 pidiendo 2 señales en vez de 4', compra: { ...V4.compra, senales: 2 } };
VERSIONES.v6 = { ...V4, descripcion: 'v4 sin mínimo de señales (cuentan solo dentro de la puntuación)', compra: { ...V4.compra, senales: 0 } };
VERSIONES.v7 = { ...VERSIONES.v6, descripcion: 'v6 con ponderada ≥ 5 %', compra: { ...VERSIONES.v6.compra, ponderada: 5 } };
VERSIONES.v8 = { ...VERSIONES.v7, descripcion: 'v7 + proyección que respeta la desaceleración + la señal de múltiplo no cuenta si ya está > 1,3 × su mediana',
  proy_desacel: true, senal_multiplo_tope: 1.3 };
// Candidata v9 (14-oct, tandas 4-5; backtest/resultados-v9.md): el crecimiento de partida no pasa de la guía de la empresa
// para los 12 meses siguientes más lo que suele batirla (crecimiento.guia_12m_pct + exceso_guia_pp). Solo recorta; sin guía = v7.
VERSIONES.v9 = { ...VERSIONES.v7, descripcion: 'v7 + el crecimiento de partida no pasa de la guía de la empresa más su exceso medio sobre la guía (solo recorta)',
  proy_guia: true, alertas: true }; // alertas: chequeos de robustez (no cambian cifras ni señal); desde v9 todas las versiones las llevan
// Candidata v10 (14-oct; backtest/resultados-v10.md): en las valoradas por EV/EBITDA, el margen EBITDA no se congela:
// bajista con el de hoy, base con la media entre hoy y valoracion.margen_ebitda_obj_pct, alcista con el objetivo (sin él, = v9).
// Además lee valoracion.ebitda_ntm_m (múltiplo de hoy = EV / EBITDA NTM) y aplica el margen también a las ventas del analista.
VERSIONES.v10 = { ...VERSIONES.v9, descripcion: 'v9 + en las valoradas por EV/EBITDA, margen EBITDA hacia el objetivo de la empresa (bajista hoy, base media, alcista objetivo) en vez de congelado',
  margen_obj: true };
// Candidata v11 (14-oct; backtest/resultados-v11.md): ventas de cada escenario = la menor entre la mecánica (v9) y la del analista
// (valoracion.ventas_objetivo_m), si existe y está en la misma unidad (base del analista ≥ mitad de la mecánica); el margen implícito
// se aplica también a las del analista; y el «compra hasta» comprueba además el listón del bajista (−50 %).
VERSIONES.v11 = { ...VERSIONES.v9, descripcion: 'v9 + ventas de cada escenario = la menor entre la mecánica y la del analista + «compra hasta» que respeta el bajista',
  ventas_min_analista: true, pmax_bajista: true };
// Candidata v12 (14-oct; backtest/resultados-v12.md): v11 + crecimiento orgánico (crecimiento.crecimiento_actual_organico_pct):
// la partida de la proyección es como mucho el orgánico y la rebaja por desaceleración se mide desde él (el del año objetivo ya es
// orgánico); + alertas (no cambian nada): euforia en las valoradas por EBITDA (múltiplo > 1,5 × su mediana de 3 años y subida ≥ 80 %)
// y proyección mecánica < 0,85 × la del analista o el consenso. Probadas y NO adoptadas (código desactivado, para reproducir la prueba):
// desac_desde_partida (sube el objetivo de los fracasos de > 60 % en su pico) y guia_tipo (sin efecto: v11 ya lo cubre).
// Corrección (14-oct, noche; proforma): el orgánico se aplica sobre ventas pro forma (con el año entero de las compras ya cerradas),
// no sobre las de 12 m; sin ella el bajista quedaba por debajo de ventas ya casi aseguradas (Construction Partners). Ver proyeccion().
VERSIONES.v12 = { ...VERSIONES.v11, descripcion: 'v11 + crecimiento orgánico en la proyección y en la rebaja por desaceleración + alertas de euforia en EV/EBITDA y de proyección mecánica corta',
  organico: true, proforma: true, euforia_ebitda: { ratio: 1.5, subida: 80, modo: 'alerta' }, alerta_mecanica_corta: true, v12: true };
// Candidata v13 (14-oct; backtest/resultados-v13.md): v12 + exceso sobre la guía = 0 si la empresa ya recortó la guía del año en curso
// (crecimiento.guia_recortada = true; solo recorta) + tres alertas que no cambian nada: bajista con el múltiplo en su mediana cuando el de hoy
// la dobla, euforia a 6 meses (tendencia.subida_6m_pct ≥ 100 % con EV/beneficio bruto > 20) y regla del 40 y puntuación restando los pagos
// en acciones (> 15 % de las ventas). Probadas y NO adoptadas como regla (código para reproducir la prueba): multiplo_caro 'bajista' y 'veto'
// (quitan Nvidia 2016), sbc_regla40 (no separa ganadoras de fracasos) y euforia_6m 'veto' (con U = 80 quita CrowdStrike 2020; con U = 100,
// de 5 casos marcados 4 ya tenían la euforia de 12 meses).
VERSIONES.v13 = { ...VERSIONES.v12, descripcion: 'v12 + exceso sobre la guía = 0 si ya recortó la guía del año + alertas de múltiplo > 2 × mediana (bajista en la mediana), euforia a 6 meses y regla del 40 restando pagos en acciones',
  guia_recortada: true, multiplo_caro: { ratio: 2, modo: 'alerta' }, euforia_6m: { subida: 100, evbb: 20, modo: 'alerta' }, alerta_sbc: 15, v13: true };
// Candidata v14 (14-oct, noche; backtest/resultados-v14.md): v13 + (1) probabilidades 35/50/15 automáticas si un producto es > 70 % de las
// ventas (mercado.peso_primer_producto_pct) o hay una decisión de reembolso o regulatoria abierta sobre > 30 % (riesgos.decision_pendiente_pct),
// salvo que las del analista ya sean tan prudentes; (2) dilución prevista (finanzas.dilucion_esperada_pct) en vez de la pasada en las acciones
// a 12 meses cuando la pasada es una ampliación ya cobrada (con pista < 24 meses, la mayor de las dos; la puntuación sigue con la pasada);
// (3) con crecimiento de partida negativo, bajista 1,5 g y alcista 0,8 g (g + (f − 1) × |g|); (4) alerta (no cambia nada) si el margen por
// volumen de un procesador de pagos cae > 10 % en un año (mercado.margen_volumen_cambio_pct), con la ponderada proyectando sobre beneficio bruto.
VERSIONES.v14 = { ...VERSIONES.v13, descripcion: 'v13 + probabilidades 35/50/15 automáticas (producto > 70 % o decisión pendiente > 30 %) + dilución prevista separada de la pasada + escenarios coherentes con partida negativa + alerta de margen por volumen en pagos',
  prob_auto: { producto: 70, decision: 30, probs: { bajista: 35, base: 50, alcista: 15 } }, dil_esperada: true, esc_neg: true, alerta_pagos: { caida: 10 }, v14: true };
export const VIGENTE = 'v11';

const escala = (v, cortes) => {
  if (v === null || v === undefined || Number.isNaN(v)) return 0;
  for (const [u, p] of cortes) if (v >= u) return p;
  return 0;
};
const r1 = x => (x === null || x === undefined || !Number.isFinite(x) ? x : Math.round(x * 10) / 10);
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const SENALES = ['revisiones_al_alza', 'precio_sobre_media_200', 'fuerza_relativa_6m', 'mejora_de_multiplo',
  'inflexion_operativa', 'sentimiento_mejorando', 'compras_directivos_o_institucionales', 'catalizador_nuevo'];
const RENTAB = { fcf_creciente: 5, fcf_positivo: 4, breakeven_12m: 3, breakeven_24m: 2, lejos: 1, sin_camino: 0 };

// Proyección mecánica de ventas (backtest, o si el analista no da la suya): crecimiento de partida =
// media del de 12 meses y el del último trimestre (entre −20 % y +60 %), que decae un 15 % cada año.
export function proyeccion(d, fwd = false, desacel = false, guia = false, op = {}) {
  const c = d.crecimiento, v = d.valoracion;
  const g12 = c.ventas_12m_pct ?? 0, gq = c.ultimo_trimestre_pct ?? g12;
  const pasado = (g12 + gq) / 2;
  const sinTope = fwd && c.cagr_2a_propio_pct != null ? (pasado + c.cagr_2a_propio_pct) / 2 : pasado;
  let g1 = clamp(sinTope, -20, 60) / 100;
  const frena = desacel && (c.aceleracion_pp ?? 0) < -10;
  if (frena) g1 = Math.min(g1, gq / 100); // si frena fuerte, se parte como mucho del último trimestre
  // v12: como mucho el crecimiento orgánico de los 12 meses siguientes (sin compras), si se conoce (solo recorta)
  const org = op.organico && c.crecimiento_actual_organico_pct != null ? c.crecimiento_actual_organico_pct / 100 : null;
  const g1sinOrg = g1;
  if (org !== null) g1 = Math.min(g1, org);
  // v12: exceso frente al objetivo a medio plazo si no hay guía anual; y el menor de los dos años si el año en curso cumple justo
  let exceso = c.exceso_guia_pp ?? 0;
  if (op.guia_tipo) {
    if (c.tipo_guia === 'medio_plazo' && c.exceso_guia_mp_pp != null) exceso = c.exceso_guia_mp_pp;
    if (c.exceso_guia_actual_pp != null && c.exceso_guia_actual_pp <= 2) exceso = Math.min(exceso, c.exceso_guia_actual_pp);
  }
  // v13: si la empresa ya recortó la guía del año en curso, no se suma el exceso del año pasado (solo recorta)
  if (op.guia_recortada && c.guia_recortada === true && exceso > 0) exceso = 0;
  const gGuia = guia && c.guia_12m_pct != null ? (c.guia_12m_pct + exceso) / 100 : null;
  const recorte = gGuia !== null && gGuia < g1;
  if (recorte) g1 = gGuia; // v9: como mucho la guía más el exceso habitual sobre ella
  const n = v.anios_hasta_objetivo ?? 2;
  const camino = (f, s = d.mercado.ventas_12m_m, g0 = g1) => {
    // v14: con partida negativa, el bajista crece menos (cae más) y el alcista más: g + (f − 1) × |g| (con g ≥ 0 es g × f)
    let g = op.esc_neg && g0 < 0 ? g0 + (f - 1) * Math.abs(g0) : g0 * f, ult = g;
    for (let i = 0; i < n; i++) { const tramo = Math.min(1, n - i); s *= Math.pow(1 + g, tramo); ult = g; g *= frena ? 0.75 : 0.85; }
    return { ventas: s, g_final: ult };
  };
  const F = { bajista: 0.5, base: 1, alcista: 1.2 };
  let esc = Object.fromEntries(Object.entries(F).map(([k, f]) => [k, camino(f)]));
  let proforma = null;
  // v12 (corregida 14-oct): el orgánico se aplica sobre una base pro forma, que suma la aportación anualizada de las compras ya
  // cerradas (las ventas de 12 m no las llevan enteras): crecimiento.ventas_proforma_12m_m si se escribe; si no, ventas de 12 m ×
  // (1 + crecimiento_actual_pct − orgánico), porque esa diferencia es justo lo que suman en 12 meses las compras ya cerradas.
  // Esa parte no se escala por escenario (ya está hecha); cada escenario queda como mucho en la proyección sin orgánico (solo recorta).
  // Sin base pro forma posible (sin ventas_proforma_12m_m ni crecimiento_actual_pct): la proyección de v11.
  if (org !== null && op.proforma) {
    const gTot = v.crecimiento_actual_pct;
    proforma = c.ventas_proforma_12m_m > 0 ? c.ventas_proforma_12m_m
      : gTot != null ? d.mercado.ventas_12m_m * (1 + Math.max(0, gTot / 100 - org)) : null;
    const g1v11 = gGuia !== null && gGuia < g1sinOrg ? gGuia : g1sinOrg;
    const v11 = Object.fromEntries(Object.entries(F).map(([k, f]) => [k, camino(f, d.mercado.ventas_12m_m, g1v11)]));
    if (proforma === null) { esc = v11; g1 = g1v11; }
    else for (const k of Object.keys(F)) { const o = camino(F[k], proforma); esc[k] = { ventas: Math.min(o.ventas, v11[k].ventas), g_final: o.g_final }; }
  }
  return { g1: g1 * 100, g_final: esc.base.g_final * 100, bajista: esc.bajista.ventas, base: esc.base.ventas, alcista: esc.alcista.ventas, ...(guia ? { recorte_guia: recorte } : {}),
    topado: sinTope > 60, ...(org !== null ? { g_organico: org * 100 } : {}), ...(proforma !== null ? { ventas_proforma: proforma } : {}), exceso_usado: exceso };
}

export function calcular(d, cfg = VERSIONES[VIGENTE]) {
  const avisos = [];
  const c = d.crecimiento, m = d.mercado, t = d.tendencia, e = d.economia, f = d.finanzas, x = d.ejecucion, v = d.valoracion;
  const P = cfg.pesos;
  const crec = [[40, 5], [30, 4], [20, 3], [15, 2], [10, 1]];

  // A. Crecimiento
  const a = [escala(c.ventas_12m_pct, crec), escala(c.cagr_2a_propio_pct, crec),
    escala(c.aceleracion_pp, [[5, 5], [2, 4], [-2, 3], [-5, 2], [-10, 1]])];
  const A = (a.reduce((s, y) => s + y, 0) / 15) * P.A;

  // B. Mercado y tecnología
  const penetr = m.tam_m ? (m.ventas_12m_m / m.tam_m) * 100 : null;
  const b = [penetr === null ? 2 : penetr < 2 ? 5 : penetr < 5 ? 4 : penetr < 10 ? 3 : penetr < 20 ? 2 : 1,
    m.tecnologia_0a5 ?? 0, m.posicion_0a5 ?? 0];
  if (penetr === null) avisos.push('Sin TAM: penetración puntuada con 2 de 5.');
  const B = (b.reduce((s, y) => s + y, 0) / 15) * P.B;

  // Valor de empresa y múltiplo de ventas de los próximos 12 meses (para el filtro de valoración)
  const pr = proyeccion(d, cfg.proy_forward, cfg.proy_desacel, cfg.proy_guia, { organico: cfg.organico, proforma: cfg.proforma, guia_tipo: cfg.guia_tipo, guia_recortada: cfg.guia_recortada, esc_neg: cfg.esc_neg });
  if (cfg.proy_guia && c.guia_12m_pct == null) avisos.push('Sin guía de la empresa (crecimiento.guia_12m_pct): proyección como v7.');
  const ev = d.precio * d.acciones_diluidas_m + (d.deuda_m ?? 0) - (d.caja_m ?? 0);
  const gNtm = v.crecimiento_actual_pct ?? pr.g1;
  const evVentasNtm = ev / (m.ventas_12m_m * (1 + gNtm / 100));
  const ratio = gNtm > 0 ? evVentasNtm / gNtm : Infinity;
  const evbb = e.margen_bruto_pct > 0 ? evVentasNtm / (e.margen_bruto_pct / 100) : Infinity;

  // C. Cambio de tendencia: 8 señales; la euforia resta o veta la compra
  const caro = cfg.senal_multiplo_tope && (!v.metrica || /ventas/i.test(v.metrica)) && v.mediana_3a && evVentasNtm > cfg.senal_multiplo_tope * v.mediana_3a;
  const activas = SENALES.filter(k => t.senales?.[k]?.valor === true && !(k === 'mejora_de_multiplo' && caro));
  for (const k of SENALES) if (!t.senales?.[k]) avisos.push(`Falta la señal ${k}.`);
  const subida = t.subida_12m_pct;
  const euforia = subida !== undefined && subida !== null
    ? subida >= cfg.euforia.subida && (cfg.euforia.ratio == null || ratio > cfg.euforia.ratio) && (cfg.euforia.evbb == null || evbb > cfg.euforia.evbb)
    : !!t.euforia;
  const C = Math.max(0, (activas.length / 8) * P.C - (euforia && cfg.euforia.modo === 'resta' ? cfg.euforia.puntos : 0));

  // D. Economía unitaria y camino a la rentabilidad
  // v13 (prueba): con pagos en acciones > umbral (% de las ventas), la regla del 40 los resta del margen FCF
  const sbcResta = cfg.sbc_regla40 != null && f.sbc_sobre_ventas_pct > cfg.sbc_regla40 ? f.sbc_sobre_ventas_pct : 0;
  const regla40 = (c.ventas_12m_pct ?? 0) + (e.margen_fcf_pct ?? 0) - sbcResta;
  const dd = [escala(e.margen_bruto_pct, [[75, 5], [60, 4], [45, 3], [30, 2], [20, 1]]),
    escala(regla40, [[60, 5], [50, 4], [40, 3], [30, 2], [20, 1]]), RENTAB[e.rentabilidad] ?? 0];
  if (!(e.rentabilidad in RENTAB)) avisos.push(`rentabilidad «${e.rentabilidad}» no válida.`);
  const D = (dd.reduce((s, y) => s + y, 0) / 15) * P.D;
  // v13 (alerta): regla del 40 y bloque D restando los pagos en acciones si superan cfg.alerta_sbc (% de las ventas)
  const sbcAlerta = cfg.alerta_sbc != null && f.sbc_sobre_ventas_pct > cfg.alerta_sbc;
  const regla40Sbc = sbcAlerta ? regla40 - f.sbc_sobre_ventas_pct : null;
  const dSbc = sbcAlerta ? ((dd[0] + escala(regla40Sbc, [[60, 5], [50, 4], [40, 3], [30, 2], [20, 1]]) + dd[2]) / 15) * P.D - D : 0;

  // E. Caja y dilución
  const quema = Math.max(0, f.quema_anual_m ?? 0);
  const pista = quema === 0 ? Infinity : ((d.caja_m ?? 0) / quema) * 12;
  const ee = [pista >= 36 ? 5 : pista >= 24 ? 3 : pista >= 12 ? 1 : 0,
    escala(-(f.dilucion_anual_pct ?? 0), [[-2, 5], [-4, 3], [-7, 1]])];
  const E = (ee.reduce((s, y) => s + y, 0) / 10) * P.E;

  // F. Ejecución y dirección
  const F = (((x.historial_0a5 ?? 0) + (x.direccion_0a5 ?? 0)) / 10) * P.F;
  const puntuacion = r1(A + B + C + D + E + F);

  // Objetivo a 12 meses
  const mecanica = cfg.forzar_mecanica || !v.ventas_objetivo_m || v.ventas_objetivo_m.base == null;
  let ventas = mecanica ? { bajista: pr.bajista, base: pr.base, alcista: pr.alcista } : v.ventas_objetivo_m;
  // v11: escenario a escenario, la menor entre la mecánica y la del analista (si está en la misma unidad)
  const va = v.ventas_objetivo_m, vaBase = va && va.base > 0 ? va.base : null;
  const vaOtraUnidad = vaBase !== null && vaBase < 0.5 * pr.base;
  const usaMin = !!cfg.ventas_min_analista && mecanica && vaBase !== null && !vaOtraUnidad;
  if (usaMin) ventas = Object.fromEntries(['bajista', 'base', 'alcista'].map(y => [y, va[y] > 0 ? Math.min(pr[y], va[y]) : pr[y]]));
  if (cfg.ventas_min_analista && vaOtraUnidad) avisos.push(`ventas_objetivo_m (base ${Math.round(vaBase)}) < mitad de la mecánica (${Math.round(pr.base)}): no parece la misma unidad; v11 no la usa.`);
  const esVentas = !v.metrica || /ventas/i.test(v.metrica);
  // Si el múltiplo es de EBITDA y la proyección es mecánica, el margen EBITDA implícito sale de los dos múltiplos.
  // v1-v9: con ventas del analista el margen no se aplicaba (fallo latente; v10 lo aplica siempre).
  // v10: con valoracion.ebitda_ntm_m, el múltiplo de hoy es EV / EBITDA NTM (no se escribe a mano).
  const conMargen = !esVentas && (mecanica || !!cfg.margen_obj);
  const esEbitda = !esVentas && /ebitda/i.test(v.metrica);
  const ebitdaNtm = cfg.margen_obj && esEbitda && v.ebitda_ntm_m > 0 ? v.ebitda_ntm_m : null;
  const multEbitda = ebitdaNtm ? ev / ebitdaNtm : v.multiplo_actual;
  if (ebitdaNtm && v.multiplo_actual && Math.abs(multEbitda / v.multiplo_actual - 1) > 0.05)
    avisos.push(`multiplo_actual escrito (${v.multiplo_actual}) distinto de EV/ebitda_ntm_m (${r1(multEbitda)}): manda el calculado.`);
  const margenImpl = conMargen && multEbitda ? evVentasNtm / multEbitda : 1;
  const multActual = multEbitda ?? evVentasNtm;
  if (conMargen && !multEbitda) avisos.push('Múltiplo de EBITDA sin multiplo_actual: se usa EV/ventas.');
  // v10: margen EBITDA hacia el objetivo de la empresa (bajista hoy, base media, alcista objetivo)
  const mObj = cfg.margen_obj && esEbitda && multEbitda && v.margen_ebitda_obj_pct != null ? v.margen_ebitda_obj_pct / 100 : null;
  const margenes = mObj === null ? { bajista: margenImpl, base: margenImpl, alcista: margenImpl }
    : { bajista: margenImpl, base: (margenImpl + mObj) / 2, alcista: mObj };
  let gAct = v.crecimiento_actual_pct ?? pr.g1;
  const gObj = v.crecimiento_obj_pct ?? pr.g_final;
  // v12: la rebaja por desaceleración se mide desde el crecimiento orgánico (sin compras), si se conoce,
  // y, si el tope del 60 % ya recorta la proyección, desde la partida topada (sin doble castigo)
  if (cfg.organico && c.crecimiento_actual_organico_pct != null) gAct = c.crecimiento_actual_organico_pct;
  if (cfg.desac_desde_partida && pr.topado) gAct = Math.min(gAct, pr.g1);
  const factorDesac = cfg.desaceleracion && gAct > 0 && gObj < gAct ? Math.max(cfg.desac_min, Math.pow(Math.max(0, gObj) / gAct, cfg.desac_exp)) : 1;
  const ref = cfg.objetivo === 'actual' ? multActual : Math.min(multActual, v.mediana_3a ?? multActual);
  const mBase = ref * factorDesac;
  let mBaj = cfg.objetivo === 'actual' ? mBase * cfg.bajista_factor : Math.min(mBase * cfg.bajista_factor, v.minimo_3a ?? Infinity);
  const mAlc = cfg.objetivo === 'actual'
    ? (cfg.alcista_min ? Math.min(Math.max(mBase * cfg.alcista_min, v.mediana_3a ?? 0, v.mediana_comparables ?? 0), mBase * cfg.alcista_techo) : mBase * cfg.alcista_techo) : Math.min(Math.max(mBase, v.mediana_3a ?? 0, v.mediana_comparables ?? 0), mBase * cfg.alcista_techo);
  // v13: múltiplo de hoy > ratio × su mediana de 3 años → el bajista vuelve como mucho a la mediana ('bajista'), o veta ('veto', solo prueba)
  const mc = cfg.multiplo_caro;
  const multCaro = !!(mc && v.mediana_3a > 0 && multActual > mc.ratio * v.mediana_3a);
  const mBaj12 = mBaj;
  if (multCaro && mc.modo === 'bajista') mBaj = Math.min(mBaj, v.mediana_3a);
  // v14: dilución prevista (finanzas.dilucion_esperada_pct, o caja.dilucion_esperada_pct) en lugar de la pasada cuando esta viene de una
  // ampliación ya cobrada (ya en caja_m y en acciones_diluidas_m); con pista < 24 meses, la mayor de las dos. La puntuación sigue con la pasada.
  const dilEsp = f.dilucion_esperada_pct ?? (d.caja && typeof d.caja === 'object' ? d.caja.dilucion_esperada_pct : null) ?? null;
  const dilUsada = cfg.dil_esperada && dilEsp != null
    ? (pista < 24 ? Math.max(dilEsp, f.dilucion_anual_pct ?? 0) : dilEsp) : (f.dilucion_anual_pct ?? 0);
  const acciones = d.acciones_diluidas_m * (1 + dilUsada / 100);
  const cajaFutura = (d.caja_m ?? 0) - quema;
  const precioDe = (mult, vtas, marg = margenImpl) => (mult * vtas * marg + cajaFutura - (d.deuda_m ?? 0)) / acciones;
  const casos = {
    bajista: { multiplo: r1(mBaj), ventas_m: Math.round(ventas.bajista) },
    base: { multiplo: r1(mBase), ventas_m: Math.round(ventas.base) },
    alcista: { multiplo: r1(mAlc), ventas_m: Math.round(ventas.alcista) },
  };
  const div = v.dividendo_pct ?? 0;
  const crudo = {};
  for (const k in casos) {
    const p = precioDe(k === 'bajista' ? mBaj : k === 'base' ? mBase : mAlc, ventas[k], margenes[k]);
    crudo[k] = p;
    casos[k].precio = r1(p);
    casos[k].rent_pct = r1((p / d.precio - 1) * 100 + div);
  }
  let p = v.probabilidades ?? { bajista: 25, base: 50, alcista: 25 };
  // v14: 35/50/15 automáticas si un producto pesa > 70 % de las ventas o hay una decisión de reembolso o regulatoria abierta sobre > 30 %
  // (salvo que las del analista ya sean al menos tan prudentes)
  const pa = cfg.prob_auto, pesoProd = m.peso_primer_producto_pct ?? null, decPend = d.riesgos?.decision_pendiente_pct ?? null;
  const probAuto = !!(pa && (pesoProd > pa.producto || decPend > pa.decision));
  const probAutoCambia = probAuto && !(p.bajista >= pa.probs.bajista && p.alcista <= pa.probs.alcista);
  if (probAutoCambia && pa.modo !== 'alerta') p = { ...pa.probs };
  const objetivo = (casos.bajista.precio * p.bajista + casos.base.precio * p.base + casos.alcista.precio * p.alcista) / 100;
  const ponderada = r1((objetivo / d.precio - 1) * 100 + div);
  const asimetria = casos.bajista.rent_pct < 0 ? r1(casos.alcista.rent_pct / -casos.bajista.rent_pct) : null;

  // Señal
  const k = cfg.compra;
  const falta = [];
  if (puntuacion < k.puntuacion) falta.push(`puntuación < ${k.puntuacion}`);
  if (ponderada < k.ponderada) falta.push(`ponderada < ${k.ponderada} %`);
  if (casos.base.rent_pct < k.base) falta.push(`base < ${k.base} %`);
  if (activas.length < k.senales) falta.push(`menos de ${k.senales} señales`);
  if (pista < k.pista) falta.push(`pista < ${k.pista} meses`);
  if (casos.bajista.rent_pct < k.bajista) falta.push(`bajista peor que ${k.bajista} %`);
  if (cfg.ratio_max !== null && ratio > cfg.ratio_max) falta.push(`EV/ventas ÷ crecimiento > ${cfg.ratio_max}`);
  if (euforia && cfg.euforia.modo === 'veto') falta.push('euforia');
  if (cfg.evbb_max !== null && !(evbb <= cfg.evbb_max)) falta.push(`EV/beneficio bruto > ${cfg.evbb_max}`);
  // v12: euforia en las valoradas por EBITDA: múltiplo de hoy > ratio × su mediana de 3 años y subida a 12 m ≥ umbral
  const ee12 = cfg.euforia_ebitda;
  const euforiaEbitda = !!(ee12 && esEbitda && v.mediana_3a > 0 && subida != null && multActual > ee12.ratio * v.mediana_3a && subida >= ee12.subida);
  if (euforiaEbitda && ee12.modo === 'veto') falta.push('euforia (múltiplo de EBITDA)');
  // v13: euforia a 6 meses: subida a 6 m ≥ umbral con EV/beneficio bruto NTM > evbb
  const e6 = cfg.euforia_6m, sub6 = t.subida_6m_pct;
  const euforia6 = !!(e6 && sub6 != null && sub6 >= e6.subida && evbb > e6.evbb);
  if (euforia6 && e6.modo === 'veto') falta.push('euforia a 6 meses');
  if (multCaro && mc.modo === 'veto') falta.push(`múltiplo > ${mc.ratio} × su mediana de 3 años`);
  let senal, motivo;
  if (puntuacion < cfg.venta.puntuacion || ponderada <= cfg.venta.ponderada || pista < 12 || d.tesis_rota) {
    senal = 'Vender';
    motivo = puntuacion < cfg.venta.puntuacion ? `puntuación < ${cfg.venta.puntuacion}` : ponderada <= cfg.venta.ponderada ? `ponderada ≤ ${cfg.venta.ponderada} %` : pista < 12 ? 'pista de caja < 12 meses' : 'tesis rota';
  } else if (!falta.length) {
    senal = 'Comprar'; motivo = 'cumple todos los requisitos de compra';
  } else {
    senal = 'Mantener'; motivo = 'no compra: ' + falta.join(', ');
  }
  // Vigilar: pasa todo salvo la rentabilidad (entre 0 y el listón): la tendencia y la valoración acompañan
  const soloRent = falta.length && falta.every(y => /^(ponderada|bajista)/.test(y));
  const vigilar = !!(cfg.vigilar && senal === 'Mantener' && soloRent && ponderada >= cfg.vigilar.ponderada);
  if (vigilar) motivo += ' → en vigilancia';
  const conviccion = senal === 'Comprar'
    ? (puntuacion >= 80 && (asimetria ?? 9) >= 2 ? 'alta' : puntuacion >= 75 ? 'media' : 'baja') : null;
  const peso = senal === 'Comprar' ? { alta: 5, media: 4, baja: 3.5 }[conviccion] : 0;
  let pmax = Math.min(objetivo / (1 + (k.ponderada - div) / 100), casos.base.precio / (1 + (k.base - div) / 100));
  if (cfg.evbb_max !== null && Number.isFinite(evbb)) { // precio al que el EV/beneficio bruto llega al tope
    const bb = m.ventas_12m_m * (1 + gNtm / 100) * e.margen_bruto_pct / 100;
    pmax = Math.min(pmax, (cfg.evbb_max * bb - (d.deuda_m ?? 0) + (d.caja_m ?? 0)) / d.acciones_diluidas_m);
  }
  if (cfg.pmax_bajista) pmax = Math.min(pmax, crudo.bajista / (1 + (k.bajista - div) / 100)); // v11: el bajista no peor que el listón
  const precioMax = r1(pmax);

  // Alertas de robustez (desde v9): no cambian cifras ni señal; dicen dónde el método puede chirriar con esta empresa.
  const alertas = [];
  if (cfg.alertas) {
    const fx = (n, dd = 0) => (Math.round(n * 10 ** dd) / 10 ** dd).toLocaleString('es-ES');
    if (vaBase !== null && !vaOtraUnidad && pr.base > 1.2 * vaBase)
      alertas.push(`Proyección mecánica (${fx(pr.base)} M) > 1,2 × la del analista (${fx(vaBase)} M): ${usaMin ? 'v11 usa la del analista' : 'el motor proyecta más que el propio informe'}.`);
    if (vaOtraUnidad) alertas.push(`ventas_objetivo_m (base ${fx(vaBase)} M) es menos de la mitad de la mecánica (${fx(pr.base)} M): parece EBITDA o beneficio, no ventas.`);
    if (v.consenso_ventas_obj_m > 0 && ventas.base > 1.2 * v.consenso_ventas_obj_m)
      alertas.push(`Ventas del escenario base (${fx(ventas.base)} M${usaMin && ventas.base < pr.base ? ', las del analista' : ''}) > 1,2 × el consenso (${fx(v.consenso_ventas_obj_m)} M).`);
    if (multCaro && mc.modo === 'alerta') {
      const bajMed = (precioDe(Math.min(mBaj, v.mediana_3a), ventas.bajista, margenes.bajista) / d.precio - 1) * 100 + div;
      alertas.push(`Múltiplo de hoy (${fx(multActual, 1)}) > ${fx(mc.ratio, 1)} × su mediana de 3 años (${fx(v.mediana_3a, 1)}): con el múltiplo bajista en la mediana, el bajista sería ${fx(bajMed, 1)} % en vez de ${fx(casos.bajista.rent_pct, 1)} %${bajMed < k.bajista ? ` (peor que ${k.bajista} %: con esa regla no compraría)` : ''}. En el backtest, con el múltiplo > 2 × su mediana, el resultado real a 12 meses quedó por debajo del bajista en 6 de 11 casos (13 de 73 en el resto) y solo 1 de 11 batió al Nasdaq-100.`);
    } else if (v.mediana_3a > 0 && multActual > 2 * v.mediana_3a)
      alertas.push(`Múltiplo de hoy (${fx(multActual, 1)}) > 2 × su mediana de 3 años (${fx(v.mediana_3a, 1)}): el objetivo supone que no vuelve a la media.`);
    if (c.guia_12m_pct == null)
      alertas.push(`Sin guía anual de 12 meses${/trimestr/i.test(c.nota_guia ?? '') ? ' (solo trimestral)' : ''}: el recorte por la guía (v9) no actúa.`);
    if (c.exceso_guia_pp > 10) alertas.push(`Exceso sobre la guía de ${fx(c.exceso_guia_pp, 1)} pp (> 10): el recorte por la guía casi no actúa.`);
    if (esEbitda && !(v.ebitda_ntm_m > 0)) alertas.push('Valorada por EV/EBITDA sin ebitda_ntm_m: el múltiplo de hoy va escrito a mano y no se puede comprobar.');
    if (esEbitda && v.ebitda_ntm_m > 0 && Math.abs(margenImpl - v.ebitda_ntm_m / (m.ventas_12m_m * (1 + gNtm / 100))) > 0.03)
      alertas.push(`Margen EBITDA implícito (${fx(margenImpl * 100, 1)} %) distinto en más de 3 pp del de ebitda_ntm_m (${fx(v.ebitda_ntm_m / (m.ventas_12m_m * (1 + gNtm / 100)) * 100, 1)} %).`);
    if (conMargen && multEbitda && (margenImpl < 0.03 || margenImpl > 0.65))
      alertas.push(`Margen implícito (${fx(margenImpl * 100, 1)} %) fuera de lo razonable (3-65 %): revisar múltiplo y métrica.`);
    if (!esVentas && !esEbitda) alertas.push(`Métrica «${String(v.metrica).split(' (')[0].slice(0, 30)}» (ni ventas ni EBITDA): el motor aplica el múltiplo a ventas × margen implícito${(d.caja_m || d.deuda_m) ? ' y suma caja y resta deuda (en P/beneficio deberían ir a 0)' : ''}; la puntuación (margen bruto, regla del 40) no está pensada para este negocio.`);
    const bajEnMax = pmax > 0 ? (crudo.bajista / pmax - 1) * 100 + div : null;
    if (bajEnMax !== null && bajEnMax < k.bajista)
      alertas.push(`En el «compra hasta» (${fx(pmax, 1)}) el bajista sería ${fx(bajEnMax, 1)} % (< ${k.bajista} %): a ese precio el motor ya no daría Comprar.`);
    const top2 = m.clientes_top2_pct ?? null, top3 = m.clientes_top3_pct ?? null;
    if (top2 > 40 || top3 > 60) alertas.push(top2 > 40 ? `Dos clientes suman el ${fx(top2)} % de las ventas (> 40 %): concentración que el método no puntúa.`
      : `Tres clientes suman más del ${fx(top3)} % de las ventas (luego dos, > 40 %): concentración que el método no puntúa.`);
    if (euforiaEbitda) alertas.push(`Euforia en múltiplo de EBITDA: ${fx(multActual, 1)}x es > ${fx(ee12.ratio, 1)} × su mediana de 3 años (${fx(v.mediana_3a, 1)}x) tras subir un ${fx(subida)} % en 12 meses (≥ ${ee12.subida} %)${ee12.modo === 'veto' ? ': veta la compra' : ': no veta (sin muestra para probarlo)'}.`);
    if (cfg.alerta_mecanica_corta) {
      if (vaBase !== null && !vaOtraUnidad && pr.base < 0.85 * vaBase)
        alertas.push(`Proyección mecánica (${fx(pr.base)} M) < 0,85 × la del analista (${fx(vaBase)} M): el motor es mucho más prudente que el informe y manda la mecánica (tope del 60 %, guía…); en el backtest, con crecimientos > 60 %, esa prudencia acertó.`);
      if (v.consenso_ventas_obj_m > 0 && pr.base < 0.85 * v.consenso_ventas_obj_m)
        alertas.push(`Proyección mecánica (${fx(pr.base)} M) < 0,85 × el consenso (${fx(v.consenso_ventas_obj_m)} M): el motor proyecta mucho menos que el mercado (no cambia nada; explicar por qué en el informe).`);
    }
    if (multCaro && mc.modo === 'bajista' && mBaj < mBaj12)
      alertas.push(`Múltiplo de hoy > ${fx(mc.ratio, 1)} × su mediana de 3 años: el bajista vuelve a la mediana (${fx(v.mediana_3a, 1)}x en vez de ${fx(mBaj12, 1)}x).`);
    if (euforia6 && e6.modo === 'alerta') alertas.push(`Euforia a 6 meses: +${fx(sub6)} % en 6 meses (≥ ${e6.subida} %) con EV/beneficio bruto ${fx(evbb, 1)} (> ${e6.evbb})${euforia ? ' (también la de 12 meses)' : ''}: no veta. En el backtest, 0 de 5 casos así batieron al Nasdaq-100, pero 4 ya tenían la euforia de 12 meses: solo 1 caso nuevo.`);
    if (sbcAlerta) alertas.push(`Pagos en acciones del ${fx(f.sbc_sobre_ventas_pct, 1)} % de las ventas (> ${cfg.alerta_sbc} %): restándolos, la regla del 40 sería ${fx(regla40Sbc, 1)} (no ${fx(regla40, 1)}) y la puntuación ${fx(puntuacion + dSbc, 1)} (no ${fx(puntuacion, 1)})${puntuacion + dSbc < k.puntuacion && puntuacion >= k.puntuacion ? `, por debajo del listón de compra (${k.puntuacion})` : ''}. No cambia nada: en el backtest las de pagos > 15 % batieron algo menos (6 de 20 frente a 26 de 64), sin llegar a demostrar un sesgo.`);
    else if (f.sbc_sobre_ventas_pct > 15 && cfg.alerta_sbc == null) alertas.push(`Pagos en acciones del ${fx(f.sbc_sobre_ventas_pct, 1)} % de las ventas (> 15 %): la regla del 40 y el FCF no los restan.`);
    // v14 (alerta): procesadores de pagos con el margen por volumen cayendo > umbral en un año
    const ap = cfg.alerta_pagos, mv = m.margen_volumen_cambio_pct;
    if (ap && mv != null && mv < -ap.caida) {
      let alt = null;
      if (c.beneficio_bruto_12m_pct != null) {
        const d2 = structuredClone(d);
        d2.crecimiento = { ...d2.crecimiento, ventas_12m_pct: c.beneficio_bruto_12m_pct, ultimo_trimestre_pct: c.beneficio_bruto_trimestre_pct ?? c.beneficio_bruto_12m_pct };
        alt = calcular(d2, { ...cfg, alerta_pagos: null });
      }
      alertas.push(`Margen por volumen ${fx(mv, 1)} % en un año (cae más del ${ap.caida} %): las ventas crecen más que el beneficio bruto y la proyección sobre ventas lo exagera${alt ? `; proyectando con el crecimiento del beneficio bruto (${fx(c.beneficio_bruto_12m_pct, 1)} %), la ponderada sería ${fx(alt.rent_ponderada_pct, 1)} % (no ${fx(ponderada, 1)} %) y la señal ${alt.senal}` : ''}. No cambia nada (sin casos en el backtest para probarlo).`);
    }
    if (probAutoCambia && pa.modo === 'alerta') alertas.push(`Probabilidades: ${pesoProd > pa.producto ? `un producto es el ${fx(pesoProd)} % de las ventas` : `decisión pendiente sobre el ${fx(decPend)} % de las ventas`}; con 35/50/15 la ponderada cambiaría.`);
  }

  return {
    version: Object.entries(VERSIONES).find(([, c2]) => c2 === cfg)?.[0] ?? 'otra',
    puntuacion,
    bloques: { crecimiento: r1(A), mercado_tecnologia: r1(B), cambio_tendencia: r1(C), economia_unitaria: r1(D), caja_dilucion: r1(E), ejecucion: r1(F) },
    senales_activas: activas, n_senales: activas.length, euforia,
    penetracion_pct: r1(penetr), regla_40: r1(regla40), ev_ventas_ntm: r1(evVentasNtm), ev_bb_ntm: r1(evbb), ratio_crecimiento: Number.isFinite(ratio) ? Math.round(ratio * 100) / 100 : null,
    pista_meses: pista === Infinity ? 'FCF positivo' : r1(pista),
    proyeccion: usaMin ? 'mín(mecánica, analista)' : mecanica ? 'mecánica' : 'analista', ...(cfg.ventas_min_analista ? { ventas_mecanica_m: { bajista: Math.round(pr.bajista), base: Math.round(pr.base), alcista: Math.round(pr.alcista) } } : {}), ...(cfg.proy_guia ? { g1_pct: r1(pr.g1), recorte_guia: pr.recorte_guia } : {}), factor_desaceleracion: Math.round(factorDesac * 100) / 100,
    casos, probabilidades: p, objetivo_12m: r1(objetivo), rent_ponderada_pct: ponderada, rent_base_pct: casos.base.rent_pct,
    asimetria, senal, vigilar, motivo,
    ...(cfg.margen_obj && conMargen ? { multiplo_ebitda: r1(multEbitda), multiplo_ebitda_de: ebitdaNtm ? 'EV/ebitda_ntm_m' : 'multiplo_actual',
      margen_ebitda_pct: { hoy: r1(margenImpl * 100), base: r1(margenes.base * 100), objetivo: mObj === null ? null : r1(mObj * 100) } } : {}),
    ventas_analista_m: v.ventas_objetivo_m ?? null, conviccion, peso_orientativo_pct: peso, precio_max_compra: precioMax, avisos,
    ...(cfg.alertas ? { alertas } : {}),
    ...(cfg.v13 ? { multiplo_caro: multCaro, euforia_6m: euforia6, regla_40_resta_sbc: sbcResta > 0 } : {}),
    ...(cfg.v14 ? { prob_auto: probAuto ? (pesoProd > pa.producto ? `producto ${pesoProd} %` : `decisión pendiente ${decPend} %`) : null, prob_auto_cambia: probAutoCambia,
      dilucion_usada_pct: r1(dilUsada) } : {}),
    ...(cfg.v12 ? { ...(pr.ventas_proforma != null ? { ventas_proforma_12m_m: Math.round(pr.ventas_proforma) } : {}), g_actual_desac_pct: r1(gAct), exceso_guia_usado_pp: r1(pr.exceso_usado), euforia_ebitda: euforiaEbitda } : {}),
  };
}

function linea(d, k) {
  const fmt = n => (n > 0 ? '+' : '') + String(n).replace('.', ',');
  return `| ${d.empresa} | ${d.ticker} | ${k.puntuacion} | ${k.n_senales}/8 | ${fmt(k.rent_ponderada_pct)} % | ${fmt(k.rent_base_pct)} % | ${k.senal}${k.conviccion ? ` (${k.conviccion})` : ''} | ${k.peso_orientativo_pct ? k.peso_orientativo_pct + ' %' : '—'} | ${k.precio_max_compra} ${d.moneda} | ${d.fecha} |`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
  const iv = args.indexOf('--version');
  const ver = iv >= 0 ? args[iv + 1] : VIGENTE;
  const cfg = VERSIONES[ver];
  if (!cfg) { console.error(`Versión ${ver} desconocida.`); process.exit(1); }
  const escribir = ver === VIGENTE;
  let archivos = args.filter((y, i) => !y.startsWith('--') && args[i - 1] !== '--version');
  if (args.includes('--todos')) {
    const dir = path.join(raiz, 'informes-growth');
    archivos = fs.readdirSync(dir, { withFileTypes: true }).filter(y => y.isDirectory())
      .map(y => path.join(dir, y.name, 'datos.json')).filter(fs.existsSync);
  }
  if (!archivos.length) { console.error('Uso: node motor/growth.mjs <datos.json…> | --todos [--version vN]'); process.exit(1); }
  const filas = [];
  for (const a of archivos) {
    const d = JSON.parse(fs.readFileSync(a, 'utf8'));
    const k = calcular(d, cfg);
    if (escribir) { d.calc = k; fs.writeFileSync(a, JSON.stringify(d, null, 2) + '\n'); }
    filas.push([d, k]);
    console.log(`${d.empresa} [${ver}]: ${k.puntuacion}/100, ${k.n_senales}/8 señales, EV/ventas NTM ${k.ev_ventas_ntm} (÷ crec. ${k.ratio_crecimiento}), ponderada ${k.rent_ponderada_pct} %, base ${k.rent_base_pct} %, bajista ${k.casos.bajista.rent_pct} % → ${k.senal}${k.conviccion ? ' (' + k.conviccion + ')' : ''}; ${k.motivo}; compra ≤ ${k.precio_max_compra} ${d.moneda}`);
    for (const w of k.avisos) console.log('  aviso: ' + w);
    for (const w of k.alertas ?? []) console.log('  ALERTA: ' + w);
  }
  if (args.includes('--todos') && escribir) {
    filas.sort((p, q) => q[1].rent_ponderada_pct - p[1].rent_ponderada_pct);
    const md = `# Análisis growth: resumen\n\nLo genera \`node motor/growth.mjs --todos\` (no editar a mano). Método ${VIGENTE}: [verticales/growth/metodo.md](../verticales/growth/metodo.md). Ordenado por rentabilidad ponderada a 12 meses.\n\n| Empresa | Ticker | Puntuación | Señales | Ponderada 12 m | Base 12 m | Señal | Peso orientativo | Compra hasta | Fecha |\n|---|---|---|---|---|---|---|---|---|---|\n${filas.map(([d, k]) => linea(d, k)).join('\n')}\n`;
    fs.writeFileSync(path.join(raiz, 'informes-growth', 'resumen.md'), md);
    console.log('informes-growth/resumen.md rehecho.');
  }
}

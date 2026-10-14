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
export function proyeccion(d, fwd = false, desacel = false, guia = false) {
  const c = d.crecimiento, v = d.valoracion;
  const g12 = c.ventas_12m_pct ?? 0, gq = c.ultimo_trimestre_pct ?? g12;
  const pasado = (g12 + gq) / 2;
  let g1 = clamp(fwd && c.cagr_2a_propio_pct != null ? (pasado + c.cagr_2a_propio_pct) / 2 : pasado, -20, 60) / 100;
  const frena = desacel && (c.aceleracion_pp ?? 0) < -10;
  if (frena) g1 = Math.min(g1, gq / 100); // si frena fuerte, se parte como mucho del último trimestre
  const gGuia = guia && c.guia_12m_pct != null ? (c.guia_12m_pct + (c.exceso_guia_pp ?? 0)) / 100 : null;
  const recorte = gGuia !== null && gGuia < g1;
  if (recorte) g1 = gGuia; // v9: como mucho la guía más el exceso habitual sobre ella
  const n = v.anios_hasta_objetivo ?? 2;
  const camino = f => {
    let s = d.mercado.ventas_12m_m, g = g1 * f, ult = g;
    for (let i = 0; i < n; i++) { const tramo = Math.min(1, n - i); s *= Math.pow(1 + g, tramo); ult = g; g *= frena ? 0.75 : 0.85; }
    return { ventas: s, g_final: ult };
  };
  const b = camino(1);
  return { g1: g1 * 100, g_final: b.g_final * 100, bajista: camino(0.5).ventas, base: b.ventas, alcista: camino(1.2).ventas, ...(guia ? { recorte_guia: recorte } : {}) };
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
  const pr = proyeccion(d, cfg.proy_forward, cfg.proy_desacel, cfg.proy_guia);
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
  const regla40 = (c.ventas_12m_pct ?? 0) + (e.margen_fcf_pct ?? 0);
  const dd = [escala(e.margen_bruto_pct, [[75, 5], [60, 4], [45, 3], [30, 2], [20, 1]]),
    escala(regla40, [[60, 5], [50, 4], [40, 3], [30, 2], [20, 1]]), RENTAB[e.rentabilidad] ?? 0];
  if (!(e.rentabilidad in RENTAB)) avisos.push(`rentabilidad «${e.rentabilidad}» no válida.`);
  const D = (dd.reduce((s, y) => s + y, 0) / 15) * P.D;

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
  const gAct = v.crecimiento_actual_pct ?? pr.g1, gObj = v.crecimiento_obj_pct ?? pr.g_final;
  const factorDesac = cfg.desaceleracion && gAct > 0 && gObj < gAct ? Math.max(cfg.desac_min, Math.pow(Math.max(0, gObj) / gAct, cfg.desac_exp)) : 1;
  const ref = cfg.objetivo === 'actual' ? multActual : Math.min(multActual, v.mediana_3a ?? multActual);
  const mBase = ref * factorDesac;
  const mBaj = cfg.objetivo === 'actual' ? mBase * cfg.bajista_factor : Math.min(mBase * cfg.bajista_factor, v.minimo_3a ?? Infinity);
  const mAlc = cfg.objetivo === 'actual'
    ? (cfg.alcista_min ? Math.min(Math.max(mBase * cfg.alcista_min, v.mediana_3a ?? 0, v.mediana_comparables ?? 0), mBase * cfg.alcista_techo) : mBase * cfg.alcista_techo) : Math.min(Math.max(mBase, v.mediana_3a ?? 0, v.mediana_comparables ?? 0), mBase * cfg.alcista_techo);
  const acciones = d.acciones_diluidas_m * (1 + (f.dilucion_anual_pct ?? 0) / 100);
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
  const p = v.probabilidades ?? { bajista: 25, base: 50, alcista: 25 };
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
    if (v.mediana_3a > 0 && multActual > 2 * v.mediana_3a)
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
    if (f.sbc_sobre_ventas_pct > 15) alertas.push(`Pagos en acciones del ${fx(f.sbc_sobre_ventas_pct, 1)} % de las ventas (> 15 %): la regla del 40 y el FCF no los restan.`);
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

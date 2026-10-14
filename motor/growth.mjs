#!/usr/bin/env node
// Análisis growth: puntuación (0-100), objetivo a 12 meses por múltiplo de ventas y señal.
// Método: verticales/growth/metodo.md. Sin dependencias.
//
//   node motor/growth.mjs informes-growth/<carpeta>/datos.json   → escribe "calc" en el JSON e imprime el resumen
//   node motor/growth.mjs --todos                                → recalcula todas y rehace informes-growth/resumen.md

import fs from 'node:fs';
import path from 'node:path';

const escala = (v, cortes) => { // cortes de mayor a menor: [[umbral, puntos], ...]
  if (v === null || v === undefined || Number.isNaN(v)) return 0;
  for (const [u, p] of cortes) if (v >= u) return p;
  return 0;
};
const r1 = x => Math.round(x * 10) / 10;
const SENALES = ['revisiones_al_alza', 'precio_sobre_media_200', 'fuerza_relativa_6m', 'mejora_de_multiplo',
  'inflexion_operativa', 'sentimiento_mejorando', 'compras_directivos_o_institucionales', 'catalizador_nuevo'];
const RENTAB = { fcf_creciente: 5, fcf_positivo: 4, breakeven_12m: 3, breakeven_24m: 2, lejos: 1, sin_camino: 0 };

export function calcular(d) {
  const avisos = [];
  const c = d.crecimiento, m = d.mercado, t = d.tendencia, e = d.economia, f = d.finanzas, x = d.ejecucion, v = d.valoracion;
  const crec = [[40, 5], [30, 4], [20, 3], [15, 2], [10, 1]];

  // A. Crecimiento (25)
  const a = [escala(c.ventas_12m_pct, crec), escala(c.cagr_2a_propio_pct, crec),
    escala(c.aceleracion_pp, [[5, 5], [2, 4], [-2, 3], [-5, 2], [-10, 1]])];
  const A = (a.reduce((s, y) => s + y, 0) / 15) * 25;

  // B. Mercado y tecnología (20)
  const penetr = m.tam_m ? (m.ventas_12m_m / m.tam_m) * 100 : null;
  const b = [penetr === null ? 2 : penetr < 2 ? 5 : penetr < 5 ? 4 : penetr < 10 ? 3 : penetr < 20 ? 2 : 1,
    m.tecnologia_0a5 ?? 0, m.posicion_0a5 ?? 0];
  if (penetr === null) avisos.push('Sin TAM: penetración puntuada con 2 de 5.');
  const B = (b.reduce((s, y) => s + y, 0) / 15) * 20;

  // C. Cambio de tendencia (20): 8 señales × 2,5; −3 si hay euforia
  const activas = SENALES.filter(k => t.senales?.[k]?.valor === true);
  for (const k of SENALES) if (!t.senales?.[k]) avisos.push(`Falta la señal ${k}.`);
  const C = Math.max(0, activas.length * 2.5 - (t.euforia ? 3 : 0));

  // D. Economía unitaria y camino a la rentabilidad (15)
  const regla40 = (c.ventas_12m_pct ?? 0) + (e.margen_fcf_pct ?? 0);
  const dd = [escala(e.margen_bruto_pct, [[75, 5], [60, 4], [45, 3], [30, 2], [20, 1]]),
    escala(regla40, [[60, 5], [50, 4], [40, 3], [30, 2], [20, 1]]), RENTAB[e.rentabilidad] ?? 0];
  if (!(e.rentabilidad in RENTAB)) avisos.push(`rentabilidad «${e.rentabilidad}» no válida.`);
  const D = (dd.reduce((s, y) => s + y, 0) / 15) * 15;

  // E. Caja y dilución (10)
  const quema = Math.max(0, f.quema_anual_m ?? 0);
  const pista = quema === 0 ? Infinity : ((d.caja_m ?? 0) / quema) * 12; // meses
  const ee = [pista >= 36 ? 5 : pista >= 24 ? 3 : pista >= 12 ? 1 : 0,
    escala(-(f.dilucion_anual_pct ?? 0), [[-2, 5], [-4, 3], [-7, 1]])];
  const E = (ee.reduce((s, y) => s + y, 0) / 10) * 10;

  // F. Ejecución y dirección (10)
  const F = (((x.historial_0a5 ?? 0) + (x.direccion_0a5 ?? 0)) / 10) * 10;

  const puntuacion = r1(A + B + C + D + E + F);

  // Objetivo a 12 meses: múltiplo de ventas (o la métrica que diga v.metrica) × ventas del ejercicio objetivo
  const factorDesac = v.crecimiento_actual_pct > 0 && v.crecimiento_obj_pct < v.crecimiento_actual_pct
    ? Math.max(0.6, v.crecimiento_obj_pct / v.crecimiento_actual_pct) : 1;
  const ref = Math.min(v.multiplo_actual, v.mediana_3a ?? v.multiplo_actual);
  const mBase = ref * factorDesac;
  const mBaj = Math.min(mBase * 0.6, v.minimo_3a ?? Infinity);
  const mAlc = Math.min(Math.max(mBase, v.mediana_3a ?? 0, v.mediana_comparables ?? 0), mBase * 1.4);
  const acciones = d.acciones_diluidas_m * (1 + (f.dilucion_anual_pct ?? 0) / 100);
  const cajaFutura = (d.caja_m ?? 0) - quema;
  const precioDe = (mult, ventas) => (mult * ventas + cajaFutura - (d.deuda_m ?? 0)) / acciones;
  const casos = {
    bajista: { multiplo: r1(mBaj), ventas_m: v.ventas_objetivo_m.bajista },
    base: { multiplo: r1(mBase), ventas_m: v.ventas_objetivo_m.base },
    alcista: { multiplo: r1(mAlc), ventas_m: v.ventas_objetivo_m.alcista },
  };
  const div = v.dividendo_pct ?? 0;
  for (const k in casos) {
    casos[k].precio = r1(precioDe(casos[k].multiplo, casos[k].ventas_m));
    casos[k].rent_pct = r1((casos[k].precio / d.precio - 1) * 100 + div);
  }
  const p = v.probabilidades ?? { bajista: 25, base: 50, alcista: 25 };
  const objetivo = (casos.bajista.precio * p.bajista + casos.base.precio * p.base + casos.alcista.precio * p.alcista) / 100;
  const ponderada = r1((objetivo / d.precio - 1) * 100 + div);
  const asimetria = casos.bajista.rent_pct < 0 ? r1(casos.alcista.rent_pct / -casos.bajista.rent_pct) : null;

  // Señal
  const pistaOk = pista >= 24;
  let senal, motivo;
  if (puntuacion < 50 || ponderada <= -10 || pista < 12 || d.tesis_rota) {
    senal = 'Vender';
    motivo = puntuacion < 50 ? 'puntuación < 50' : ponderada <= -10 ? 'ponderada ≤ −10 %' : pista < 12 ? 'pista de caja < 12 meses' : 'tesis rota';
  } else if (puntuacion >= 70 && ponderada >= 20 && casos.base.rent_pct >= 10 && activas.length >= 3 && pistaOk && casos.bajista.rent_pct >= -45) {
    senal = 'Comprar'; motivo = 'cumple los seis requisitos de compra';
  } else {
    senal = 'Mantener';
    const falta = [];
    if (puntuacion < 70) falta.push('puntuación < 70');
    if (ponderada < 20) falta.push('ponderada < 20 %');
    if (casos.base.rent_pct < 10) falta.push('base < 10 %');
    if (activas.length < 3) falta.push('menos de 3 señales de cambio de tendencia');
    if (!pistaOk) falta.push('pista < 24 meses');
    if (casos.bajista.rent_pct < -45) falta.push('bajista peor que −45 %');
    motivo = 'no compra: ' + falta.join(', ');
  }
  const conviccion = senal === 'Comprar'
    ? (puntuacion >= 80 && (asimetria ?? 9) >= 2 ? 'alta' : puntuacion >= 75 ? 'media' : 'baja') : null;
  const peso = senal === 'Comprar' ? { alta: 5, media: 4, baja: 3.5 }[conviccion] : 0;
  // Precio máximo de compra: el que da una ponderada del 20 % y una base del 10 %
  const precioMax = r1(Math.min(objetivo / (1.2 - div / 100), casos.base.precio / (1.1 - div / 100)));

  return {
    puntuacion,
    bloques: { crecimiento: r1(A), mercado_tecnologia: r1(B), cambio_tendencia: r1(C), economia_unitaria: r1(D), caja_dilucion: r1(E), ejecucion: r1(F) },
    senales_activas: activas, n_senales: activas.length,
    penetracion_pct: penetr === null ? null : r1(penetr), regla_40: r1(regla40),
    pista_meses: pista === Infinity ? 'FCF positivo' : r1(pista),
    factor_desaceleracion: r1(factorDesac * 100) / 100,
    casos, probabilidades: p, objetivo_12m: r1(objetivo), rent_ponderada_pct: ponderada, rent_base_pct: casos.base.rent_pct,
    asimetria, senal, motivo, conviccion, peso_orientativo_pct: peso, precio_max_compra: precioMax, avisos,
  };
}

function linea(d, k) {
  const fmt = n => (n > 0 ? '+' : '') + String(n).replace('.', ',');
  return `| ${d.empresa} | ${d.ticker} | ${k.puntuacion} | ${k.n_senales}/8 | ${fmt(k.rent_ponderada_pct)} % | ${fmt(k.rent_base_pct)} % | ${k.senal}${k.conviccion ? ` (${k.conviccion})` : ''} | ${k.peso_orientativo_pct ? k.peso_orientativo_pct + ' %' : '—'} | ${d.fecha} |`;
}

const args = process.argv.slice(2);
if (import.meta.url === `file://${process.argv[1]}`) {
  const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
  let archivos = args.filter(x => !x.startsWith('--'));
  if (args.includes('--todos')) {
    const dir = path.join(raiz, 'informes-growth');
    archivos = fs.readdirSync(dir, { withFileTypes: true }).filter(x => x.isDirectory())
      .map(x => path.join(dir, x.name, 'datos.json')).filter(fs.existsSync);
  }
  if (!archivos.length) { console.error('Uso: node motor/growth.mjs <datos.json…> | --todos'); process.exit(1); }
  const filas = [];
  for (const a of archivos) {
    const d = JSON.parse(fs.readFileSync(a, 'utf8'));
    const k = calcular(d);
    d.calc = k;
    fs.writeFileSync(a, JSON.stringify(d, null, 2) + '\n');
    filas.push([d, k]);
    console.log(`${d.empresa}: ${k.puntuacion}/100, ${k.n_senales}/8 señales, ponderada ${k.rent_ponderada_pct} %, base ${k.rent_base_pct} %, bajista ${k.casos.bajista.rent_pct} % → ${k.senal}${k.conviccion ? ' (' + k.conviccion + ')' : ''}; ${k.motivo}; compra ≤ ${k.precio_max_compra} ${d.moneda}`);
    for (const w of k.avisos) console.log('  aviso: ' + w);
  }
  if (args.includes('--todos')) {
    filas.sort((p, q) => q[1].rent_ponderada_pct - p[1].rent_ponderada_pct);
    const md = `# Análisis growth: resumen\n\nLo genera \`node motor/growth.mjs --todos\` (no editar a mano). Método: [verticales/growth/metodo.md](../verticales/growth/metodo.md). Ordenado por rentabilidad ponderada a 12 meses.\n\n| Empresa | Ticker | Puntuación | Señales | Ponderada 12 m | Base 12 m | Señal | Peso orientativo | Fecha |\n|---|---|---|---|---|---|---|---|---|\n${filas.map(([d, k]) => linea(d, k)).join('\n')}\n`;
    fs.writeFileSync(path.join(raiz, 'informes-growth', 'resumen.md'), md);
    console.log('informes-growth/resumen.md rehecho.');
  }
}

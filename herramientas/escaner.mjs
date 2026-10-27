// Escáner de mercado: busca candidatas para analizar en Europa, Américas y Asia-Pacífico. Sin dependencias ni API
// de pago: datos de Yahoo (buscador, ficha y cuentas anuales) y la configuración editable de escaner/perfiles.json.
//
// Embudo en tres pasos:
//   1. Buscador de Yahoo por bolsas de la región con los filtros base y los del perfil (segundos, sin descargar fichas).
//   2. Ficha de cada superviviente (perfil, datos y cuentas de cuatro-cinco años), en caché una semana, y métricas
//      propias: ROIC, crecimiento, estabilidad del margen, conversión en caja, FCF yield, lo que descuenta el precio…
//   3. Filtros y puntuación de cada perfil (percentiles dentro de la región) → ranking.
//
//   node herramientas/escaner.mjs [--perfiles a,b] [--regiones europa,americas,apac] [--max 15]
//        [--buscar "regex"] [--contar] [--refrescar] [--concurrencia 4] [--salida escaneos/escaneo-AAAA-MM-DD.xlsx]
//
//   --contar      solo el paso 1: cuántas empresas pasan el buscador por perfil y región (para afinar filtros).
//   --buscar      expresión regular extra sobre descripción, sector e industria (p. ej. "water|filtration|valve").
//   --refrescar   ignora la caché de fichas.

import { readFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { buscar, ficha, aUsd, divisaPrincipal, enParalelo } from './yahoo.mjs';
import { escribirXlsx } from './xlsx.mjs';

const argv = process.argv.slice(2);
const arg = (k, def) => (argv.includes(k) ? argv[argv.indexOf(k) + 1] : def);
const CONF = JSON.parse(readFileSync(arg('--config', 'escaner/perfiles.json'), 'utf8'));
const BASE = CONF.base;
const hoy = new Date().toISOString().slice(0, 10);
const perfiles = Object.entries(CONF.perfiles).filter(([k, p]) => (arg('--perfiles') ? arg('--perfiles').split(',').includes(k) : p.activo !== false));
const regiones = (arg('--regiones') || Object.keys(CONF.regiones).join(',')).split(',');
const maxRegion = +arg('--max', BASE.max_por_region || 15);
const concurrencia = +arg('--concurrencia', 4);
const extra = arg('--buscar') ? new RegExp(arg('--buscar'), 'i') : null;
const salida = arg('--salida', `escaneos/escaneo-${hoy}.xlsx`);
for (const r of regiones) if (!CONF.regiones[r]) throw new Error(`Región desconocida: ${r} (hay ${Object.keys(CONF.regiones).join(', ')})`);
if (!perfiles.length) throw new Error('Ningún perfil activo o con ese nombre');

const n = (v) => (v === null || v === undefined || !Number.isFinite(+v) ? null : +v);
const red = (x, d = 1) => (x === null ? null : Math.round(x * 10 ** d) / 10 ** d);
const mediana = (xs) => { const s = xs.filter((x) => x !== null).sort((a, b) => a - b); return s.length ? (s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2) : null; };
const regionDePais = (pais) => Object.entries(CONF.regiones).find(([, r]) => r.paises.includes(pais))?.[0] ?? null;

// ── Paso 1: buscador ──
// El tope de capitalización del buscador va en la divisa de cada bolsa: se agrupan las bolsas por divisa.
async function candidatasBuscador(region, perfil) {
  const porDivisa = new Map();
  for (const b of CONF.regiones[region].bolsas) {
    const div = { GER: 'EUR', PAR: 'EUR', AMS: 'EUR', HEL: 'EUR', MCE: 'EUR', MIL: 'EUR', BRU: 'EUR', VIE: 'EUR', ISE: 'EUR', LIS: 'EUR', LSE: 'GBP', EBS: 'CHF', STO: 'SEK', CPH: 'DKK', OSL: 'NOK', WSE: 'PLN', ATH: 'EUR', ICE: 'ISK', SGO: 'CLP', BVC: 'COP', SAU: 'SAR', DFM: 'AED', DOH: 'QAR', TLV: 'ILS', JNB: 'ZAR', KLS: 'MYR', SET: 'THB', JKT: 'IDR',
      NYQ: 'USD', NMS: 'USD', NGM: 'USD', NCM: 'USD', ASE: 'USD', TOR: 'CAD', SAO: 'BRL', MEX: 'MXN', JPX: 'JPY', ASX: 'AUD', NZE: 'NZD', HKG: 'HKD', SES: 'SGD', KSC: 'KRW', KOE: 'KRW', TAI: 'TWD', TWO: 'TWD', NSI: 'INR', SHH: 'CNY', SHZ: 'CNY' }[b] || 'USD';
    porDivisa.set(div, [...(porDivisa.get(div) || []), b]);
  }
  const todas = [];
  let total = 0;
  for (const [div, bolsas] of porDivisa) {
    const fx = await aUsd(div);
    if (!fx) { console.warn(`  sin tipo de cambio para ${div}: se salta ${bolsas.join(', ')}`); continue; }
    // Margen del 20 % por debajo: el filtro fino en USD se hace luego con el precio y las acciones.
    const filtros = [['exchange', '=', bolsas], ['intradaymarketcap', '>=', (BASE.cap_min_musd * 1e6 * 0.8) / fx],
      ...(BASE.excluir_sectores?.length ? [] : []), ...(perfil.buscador || []).filter(([c]) => c !== 'intradaymarketcap')];
    const r = await buscar(filtros);
    total += r.total;
    todas.push(...r.cotizaciones);
  }
  return { total, cotizaciones: todas };
}

// Filtro de liquidez y capitalización en USD, y una sola cotización por empresa (Yahoo lista la misma empresa en
// varias bolsas: Fráncfort, Viena, Milán…). La de más volumen en USD representa al grupo hasta conocer el país.
async function depurar(cotizaciones) {
  const vistas = new Map();
  for (const q of cotizaciones) {
    const fx = await aUsd(q.currency), fxCap = await aUsd(divisaPrincipal(q.currency));
    const cap = n(q.marketCap) !== null && fxCap ? (q.marketCap * fxCap) / 1e6 : null;
    const volumen = n(q.averageDailyVolume3Month) !== null && n(q.regularMarketPrice) !== null && fx ? (q.averageDailyVolume3Month * q.regularMarketPrice * fx) / 1e6 : null;
    if (cap === null || cap < BASE.cap_min_musd || (volumen ?? 0) < (BASE.volumen_min_musd ?? 0)) continue;
    const clave = String(q.longName || q.shortName || q.symbol).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
    const previa = vistas.get(clave);
    const fila = { simbolo: q.symbol, bolsa: q.exchange, nombre: q.longName || q.shortName, cap_musd: cap, volumen_musd: volumen, listados: [...(previa?.listados || []), { simbolo: q.symbol, bolsa: q.exchange, volumen }] };
    if (!previa || (volumen ?? 0) > (previa.volumen_musd ?? 0)) vistas.set(clave, fila);
    else previa.listados = fila.listados;
  }
  return [...vistas.values()];
}

// ── Paso 2: métricas propias a partir de la ficha ──
async function metricas(f) {
  const fxP = await aUsd(divisaPrincipal(f.divisa)), fxC = await aUsd(f.divisa_cuentas || f.divisa);
  const anos = Object.keys(f.anual).sort();
  const serie = (k) => anos.map((a) => n(f.anual[a][k]));
  const ventas = serie('TotalRevenue'), ebit = serie('EBIT'), fcf = serie('FreeCashFlow'), bn = serie('NetIncome'), capInv = serie('InvestedCapital'), tasa = serie('TaxRateForCalcs');
  const roics = ebit.map((e, i) => {
    const ci = i > 0 && capInv[i - 1] && capInv[i] ? (capInv[i - 1] + capInv[i]) / 2 : capInv[i];
    const t = Math.min(Math.max(tasa[i] ?? 0.25, 0), 0.35);
    return e !== null && ci > 0 ? (e * (1 - t)) / ci * 100 : null;
  });
  const margenes = ebit.map((e, i) => (e !== null && ventas[i] > 0 ? (e / ventas[i]) * 100 : null)).filter((x) => x !== null);
  const valid = ventas.map((v, i) => [anos[i], v]).filter(([, v]) => v > 0);
  const crec = valid.length >= 3 ? ((valid.at(-1)[1] / valid[0][1]) ** (1 / (valid.length - 1)) - 1) * 100 : null;
  const suma = (xs) => xs.reduce((a, b) => a + (b ?? 0), 0);
  const conversion = bn.filter((x) => x !== null).length >= 3 && suma(bn) > 0 ? (suma(fcf) / suma(bn)) * 100 : null;
  const cap = n(f.capitalizacion) !== null && fxP ? f.capitalizacion * fxP : null;
  const ultimoAno = anos.at(-1) ? f.anual[anos.at(-1)] : {};
  const deudaNeta = n(ultimoAno.NetDebt) ?? (n(ultimoAno.TotalDebt) !== null ? ultimoAno.TotalDebt - (ultimoAno.CashAndCashEquivalents ?? 0) : null);
  const ev = cap !== null ? cap + (deudaNeta ?? 0) * (fxC ?? 0) : null;
  const ebit12 = n(f.ultimos12.EBIT) ?? ebit.at(-1), ebitda12 = n(f.ultimos12.EBITDA) ?? n(ultimoAno.EBITDA);
  const fcf12 = n(f.ultimos12.FreeCashFlow) ?? fcf.at(-1);
  const fcfUsd = fcf12 !== null && fxC ? fcf12 * fxC : null;
  const pais = f.pais;
  const beta = Math.min(Math.max(n(f.beta) ?? 1, BASE.beta_min), BASE.beta_max);
  const rf = CONF.tasa_libre[f.divisa_cuentas || f.divisa] ?? CONF.tasa_libre.USD;
  // Prima país sin contarla dos veces (27-oct-2026, barrido de Brasil: WACC ≈ 20,4 % = bono en reales 13,5 % + prima + 3 de
  // prima país). Un bono en moneda local de un emergente YA lleva el riesgo de impago del país: con cuentas en esa moneda solo
  // se suma un tercio de la prima país (Damodaran: Ke = bono local − diferencial de impago + prima país ≈ bono + ⅓ prima país).
  // Con cuentas en divisa fuerte (USD, EUR…) la tasa libre no lleva el riesgo país y se suma entera.
  const divCuentas = f.divisa_cuentas || f.divisa;
  const primaPais = CONF.prima_pais[pais] ?? 0;
  const local = !['USD', 'EUR', 'GBP', 'CHF', 'JPY'].includes(divCuentas) && CONF.tasa_libre[divCuentas] !== undefined;
  const wacc = rf + beta * BASE.prima_mercado_pct + (local ? primaPais / 3 : primaPais);
  // Lo que descuenta el precio: crecimiento perpetuo del flujo libre que justifica el valor de empresa
  // (Gordon: EV = FCF·(1+g)/(WACC−g) → g = (WACC·EV − FCF)/(EV + FCF)). Frente al crecimiento de las ventas.
  // Con flujo libre negativo no tiene sentido: queda sin dato.
  const gImpl = ev > 0 && fcfUsd > 0 ? ((wacc / 100) * ev - fcfUsd) / (ev + fcfUsd) * 100 : null;
  const roicMedio = roics.filter((x) => x !== null).length ? mediana(roics) : null;
  const caida = n(f.precio) !== null && n(f.max_52s) ? (f.precio / f.max_52s - 1) * 100 : null;
  return {
    cap_musd: cap !== null ? cap / 1e6 : null, ev_musd: ev !== null ? ev / 1e6 : null,
    ev_ebit: ev !== null && ebit12 > 0 && fxC ? ev / (ebit12 * fxC) : null,
    ev_ebitda: ev !== null && ebitda12 > 0 && fxC ? ev / (ebitda12 * fxC) : null,
    per_adelantado: n(f.per_adelantado) > 0 ? n(f.per_adelantado) : null,
    fcf_yield: cap > 0 && fcfUsd !== null ? (fcfUsd / cap) * 100 : null,
    roic_medio: roicMedio, roic_ultimo: roics.at(-1) ?? null, roic_min: roics.some((x) => x !== null) ? Math.min(...roics.filter((x) => x !== null)) : null,
    wacc, roic_wacc: roicMedio !== null ? roicMedio - wacc : null,
    crec_ventas_3a: crec, anos_cuentas: valid.length,
    margen_ebit: margenes.at(-1) ?? null, margen_medio: margenes.length ? mediana(margenes) : null,
    rango_margen: margenes.length >= 3 ? Math.max(...margenes) - Math.min(...margenes) : null,
    conversion_fcf: conversion,
    dn_ebitda: deudaNeta !== null && ebitda12 > 0 ? deudaNeta / ebitda12 : null,
    caida_max52: caida, var_52s: n(f.var_52s) !== null ? f.var_52s * 100 : null,
    g_implicito: gImpl, margen_seguridad: gImpl !== null && crec !== null ? crec - gImpl : null,
    potencial_analistas: n(f.objetivo_medio) && n(f.precio) ? (f.objetivo_medio / f.precio - 1) * 100 : null,
    n_analistas: n(f.n_analistas), insiders_pct: n(f.insiders) !== null ? f.insiders * 100 : null,
    rentabilidad_dividendo: n(f.rentabilidad_dividendo) !== null ? f.rentabilidad_dividendo * 100 : null,
    sbc_ventas: n(ultimoAno.StockBasedCompensation) !== null && ventas.at(-1) > 0 ? (ultimoAno.StockBasedCompensation / ventas.at(-1)) * 100 : null,
  };
}

const METRICAS = {
  cap_musd: ['Capitalización (M USD)', 'Precio por acciones, en millones de dólares.', 'entero'],
  ev_musd: ['Valor de empresa (M USD)', 'Capitalización más deuda neta del último ejercicio (de Yahoo; puede incluir arrendamientos).', 'entero'],
  ev_ebit: ['EV/EBIT', 'Valor de empresa entre el EBIT de los últimos doce meses.', 'mult'],
  ev_ebitda: ['EV/EBITDA', 'Valor de empresa entre el EBITDA de los últimos doce meses.', 'mult'],
  per_adelantado: ['PER próximos 12 m', 'Precio entre el beneficio por acción esperado (consenso de Yahoo).', 'mult'],
  fcf_yield: ['FCF yield', 'Flujo de caja libre de los últimos doce meses entre la capitalización.', 'pct'],
  roic_medio: ['ROIC medio', 'Mediana del ROIC de los ejercicios disponibles (4-5): EBIT por (1 − tipo impositivo) entre el capital invertido medio. Aproximado; el informe calcula el bueno.', 'pct'],
  roic_ultimo: ['ROIC último', 'ROIC del último ejercicio cerrado.', 'pct'],
  roic_min: ['ROIC mínimo', 'El peor ROIC de los ejercicios disponibles: mide la resistencia en un mal año.', 'pct'],
  wacc: ['WACC orientativo', 'Tasa libre de la divisa de las cuentas + beta (acotada) × prima del mercado (4,20 %) + prima país (entera con cuentas en divisa fuerte; un tercio si el bono es en moneda local de un emergente, que ya lleva el riesgo país). Solo para el escáner.', 'pct'],
  roic_wacc: ['ROIC − WACC', 'Diferencia en puntos entre el ROIC medio y el WACC orientativo.', 'pct'],
  crec_ventas_3a: ['Crecimiento ventas', 'Crecimiento anual compuesto de las ventas entre el primer y el último ejercicio disponible (3-4 años).', 'pct'],
  margen_ebit: ['Margen EBIT', 'EBIT entre ventas del último ejercicio.', 'pct'],
  margen_medio: ['Margen EBIT medio', 'Mediana del margen EBIT de los ejercicios disponibles.', 'pct'],
  rango_margen: ['Rango del margen (pp)', 'Diferencia entre el mejor y el peor margen EBIT de los ejercicios disponibles: cuanto menor, más estable.', 'num'],
  conversion_fcf: ['Conversión en caja', 'Flujo libre acumulado entre beneficio neto acumulado de los ejercicios disponibles.', 'pct'],
  dn_ebitda: ['DN/EBITDA', 'Deuda neta del último ejercicio entre el EBITDA de los últimos doce meses (negativo = caja neta).', 'mult'],
  caida_max52: ['Caída desde máximos 52 s', 'Precio frente al máximo de las últimas 52 semanas.', 'pct'],
  var_52s: ['Variación 52 s', 'Variación del precio en las últimas 52 semanas.', 'pct'],
  g_implicito: ['Crecimiento que descuenta', 'Crecimiento perpetuo del flujo libre que justifica el valor de empresa con el WACC orientativo (Gordon). Versión rápida del DCF inverso del informe.', 'pct'],
  margen_seguridad: ['Margen de seguridad (pp)', 'Crecimiento de las ventas de los últimos años menos el que descuenta el precio: positivo = el precio pide menos de lo que la empresa ha venido dando.', 'num'],
  potencial_analistas: ['Potencial analistas', 'Precio objetivo medio de los analistas frente al precio.', 'pct'],
  n_analistas: ['Nº analistas', 'Analistas con precio objetivo.', 'entero'],
  insiders_pct: ['Insiders', 'Porcentaje del capital en manos de directivos, consejeros y fundadores.', 'pct'],
  rentabilidad_dividendo: ['Dividendo', 'Rentabilidad por dividendo.', 'pct'],
  sbc_ventas: ['Pagos en acciones / ventas', 'Remuneración en acciones entre ventas del último ejercicio: si es alta, el flujo libre la sobrestima.', 'pct'],
};

// Marcas rápidas con los mismos umbrales que seguimiento.xlsx donde aplica.
const tramo = (v, bien, mal, alReves = false) => (v === null ? null : !alReves ? (v >= bien ? '✓' : v < mal ? '✗' : '=') : (v <= bien ? '✓' : v > mal ? '✗' : '='));
const MARCAS = [
  ['Crecimiento', (m) => tramo(m.crec_ventas_3a, 8, 3)],
  ['ROIC frente a WACC', (m) => tramo(m.roic_wacc, 5, 0)],
  ['Balance', (m) => tramo(m.dn_ebitda, 1.5, 3, true)],
  ['Caja libre', (m) => tramo(m.fcf_yield, 5, 2.5)],
  ['Estabilidad', (m) => tramo(m.rango_margen, 5, 12, true)],
  ['Lo que descuenta el precio', (m) => (m.margen_seguridad === null ? null : m.margen_seguridad >= 1 ? '✓' : m.margen_seguridad <= -1 ? '✗' : '=')],
  ['Visión de los analistas', (m) => tramo(m.potencial_analistas, 15, 0)],
];

// Datos que no cuadran: casi siempre un fallo de Yahoo o un negocio que estas métricas no miden bien (saldos de
// clientes en el flujo libre, arrendamientos, patrimonio negativo, extraordinarios).
function avisos(m) {
  const a = [];
  if (m.fcf_yield !== null && m.fcf_yield > 35) a.push(`FCF yield del ${red(m.fcf_yield, 0)} %`);
  if (m.ev_musd !== null && m.ev_musd <= 0) a.push('valor de empresa negativo (¿saldos de clientes o caja que no es suya?)');
  if (m.roic_medio !== null && m.roic_medio > 100) a.push(`ROIC del ${red(m.roic_medio, 0)} % (¿capital invertido casi nulo o negativo?)`);
  if (m.conversion_fcf !== null && m.conversion_fcf > 300) a.push(`flujo libre ${red(m.conversion_fcf / 100, 1)} veces el beneficio`);
  if (m.anos_cuentas < 3) a.push('menos de tres ejercicios de cuentas');
  return a;
}

function cumple(m, [k, op, v]) {
  const x = m[k];
  if (x === null || x === undefined) return false;
  return op === '>=' ? x >= v : op === '<=' ? x <= v : op === '>' ? x > v : op === '<' ? x < v : op === 'entre' ? x >= v[0] && x <= v[1] : op === '=' ? x === v : false;
}

// Puntuación: media ponderada de percentiles dentro del grupo (un dato que falta cuenta como 0,4).
function puntuar(grupo, pesos) {
  const total = Object.values(pesos).reduce((a, w) => a + Math.abs(w), 0);
  const rangos = Object.fromEntries(Object.keys(pesos).map((k) => [k, grupo.map((c) => c.m[k]).filter((x) => x !== null).sort((a, b) => a - b)]));
  for (const c of grupo) {
    let s = 0;
    for (const [k, w] of Object.entries(pesos)) {
      const xs = rangos[k], x = c.m[k];
      let p = 0.4;
      if (x !== null && xs.length > 1) { const menores = xs.filter((y) => y < x).length, iguales = xs.filter((y) => y === x).length; p = (menores + (iguales - 1) / 2) / (xs.length - 1); }
      else if (x !== null) p = 0.5;
      s += Math.abs(w) * (w > 0 ? p : 1 - p);
    }
    c.puntos = Math.round((s / total) * 100);
  }
}

// ── Ya analizadas: informes del repo ──
const normal = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/\b(the|inc|corp|corporation|company|co|ltd|limited|plc|ag|sa|se|nv|asa|ab|a\/s|as|spa|oyj|holdings?|group|groupe|gruppen|kgaa|se & co)\b/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const analizadas = [];
if (existsSync('informes')) for (const dir of readdirSync('informes', { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)) {
  const archivos = readdirSync(join('informes', dir));
  const vs = archivos.map((f) => f.match(/^datos-v(\d+)\.json$/)).filter(Boolean).sort((a, b) => b[1] - a[1]);
  const datos = vs.length ? vs[0][0] : archivos.includes('datos.json') ? 'datos.json' : null;
  if (!datos) continue;
  try {
    const d = JSON.parse(readFileSync(join('informes', dir, datos), 'utf8'));
    const senal = d.calc?.recomendacion?.recomendacion;
    if (!senal) continue;
    analizadas.push({ ticker: String(d.identificacion?.ticker || '').split(/[\s;(]/)[0].toUpperCase(), nombre: normal(d.identificacion?.nombre_corto || d.identificacion?.nombre), senal, fecha: d.meta?.fecha_corte });
  } catch { /* informe a medias */ }
}
function yaAnalizada(c) {
  const bases = c.listados.map((l) => l.simbolo.split('.')[0].toUpperCase().replace(/-[A-Z]$/, ''));
  const nom = normal(c.f.nombre || c.nombre);
  const hits = analizadas.filter((a) => (a.ticker && bases.includes(a.ticker.replace(/-[A-Z]$/, ''))) || (a.nombre && nom && (nom === a.nombre || nom.startsWith(a.nombre + ' ') || a.nombre.startsWith(nom + ' '))))
    .sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)));
  return hits.length ? `${hits[0].senal} (${hits[0].fecha})` : null;
}

// ── Ejecución ──
//   --simbolos A,B  ficha rápida de esas empresas con todas las métricas (para comprobar o mirar una suelta).
// --simbolos A,B: ficha rápida de empresas concretas (sin buscador ni perfiles), para comprobar métricas.
//   --simbolos-archivo lista.txt --json   lo mismo para una lista larga (un símbolo por línea), en JSON: lo usa
//                                          herramientas/indices.mjs para el filtro previo de calidad de las altas en índices.
if (arg('--simbolos-archivo') && argv.includes('--json')) {
  const lista = readFileSync(arg('--simbolos-archivo'), 'utf8').split(/\s+/).filter(Boolean);
  const out = await enParalelo(lista, concurrencia, async (s) => {
    try {
      const f = await ficha(s, { diasCache: argv.includes('--refrescar') ? 0 : 7 });
      if (!f?.nombre) return { simbolo: s, error: 'sin ficha' };
      const m = await metricas(f);
      return { simbolo: s, nombre: f.nombre, pais: f.pais, sector: f.sector, industria: f.industria, descripcion: (f.descripcion || '').slice(0, 300),
        ...Object.fromEntries(Object.entries(m).map(([k, v]) => [k, v === null ? null : red(v, 2)])), ya_analizada: yaAnalizada({ listados: [{ simbolo: s }], f, nombre: f.nombre }) || null };
    } catch (e) { return { simbolo: s, error: String(e.message || e).slice(0, 120) }; }
  });
  // Por escrito y saliendo al terminar: con console.log + process.exit una salida grande por tubería se corta.
  process.stdout.write(JSON.stringify(out) + '\n', () => process.exit(0));
  await new Promise(() => {});
}
if (arg('--simbolos')) {
  for (const s of arg('--simbolos').split(',')) {
    const f = await ficha(s, { diasCache: argv.includes('--refrescar') ? 0 : 7 });
    const m = await metricas(f);
    console.log(`\n${f.nombre} (${s}) · ${f.pais} · ${f.sector} / ${f.industria} · cuentas en ${f.divisa_cuentas}, ejercicios ${Object.keys(f.anual).sort().join(' ')}`);
    for (const [k, [t, , tipo]] of Object.entries(METRICAS)) console.log(`  ${t.padEnd(28)} ${m[k] === null ? 'n.d.' : red(m[k], tipo === 'entero' ? 0 : 1)}${tipo === 'pct' ? ' %' : tipo === 'mult' ? 'x' : ''}`);
    console.log(`  ${MARCAS.map(([t, fn]) => `${t}: ${fn(m) ?? '·'}`).join(' · ')}`);
    const a = yaAnalizada({ listados: [{ simbolo: s }], f, nombre: f.nombre });
    if (a) console.log(`  Ya analizada: ${a}`);
  }
  process.exit(0);
}
const inicio = Date.now();
const resultados = [];   // { perfil, region, candidatos: [...] }
const universo = new Map(); // simbolo → candidata enriquecida (para la hoja de sectores)
const dudosas = [];
for (const [clave, perfil] of perfiles) {
  for (const region of regiones) {
    const { total, cotizaciones } = await candidatasBuscador(region, perfil);
    const lista = await depurar(cotizaciones);
    console.log(`${clave} · ${region}: ${total} en el buscador → ${lista.length} tras capitalización, liquidez y duplicados`);
    if (argv.includes('--contar')) continue;
    const fichas = await enParalelo(lista, concurrencia, (c) => ficha(c.simbolo, { diasCache: argv.includes('--refrescar') ? 0 : 7 }),
      (h, t) => { if (h % 25 === 0 || h === t) process.stdout.write(`\r  fichas ${h}/${t}   `); });
    process.stdout.write('\n');
    const grupo = [];
    for (let i = 0; i < lista.length; i++) {
      const c = lista[i], f = fichas[i];
      if (!f || f.error) continue;
      // La región la da el país de la sede (no la bolsa): fuera las extranjeras cotizadas aquí y las de países de
      // fuera de las tres regiones. Si la sede es un paraíso (Bermudas, Caimán…), cuenta la bolsa.
      const reg = regionDePais(f.pais) ?? ((CONF.paraisos || []).includes(f.pais) ? regionDePais(CONF.bolsa_pais[c.bolsa]) : null);
      // Región «extranjeras» (perfiles-amplio.json): las de sede fuera del país de la bolsa que cotizan allí (ADR, dLocal…).
      const rc = CONF.regiones[region];
      if (rc.extranjeras ? (f.pais === rc.extranjeras || reg === null) : reg !== region) continue;
      if (BASE.excluir_sectores?.includes(f.sector)) continue;
      // Bolsas que un particular no puede comprar (ChiNext 300/301 y STAR 688/689 por Stock Connect, y la India, solo para residentes; Hotis, 20-oct-2026).
      if (BASE.excluir_simbolos && new RegExp(BASE.excluir_simbolos).test(c.simbolo || '')) continue;
      if (BASE.excluir_industrias && new RegExp(BASE.excluir_industrias, 'i').test(f.industria || '')) continue;
      if (perfil.excluir_industrias && new RegExp(perfil.excluir_industrias, 'i').test(f.industria || '')) continue;
      const texto = `${f.sector || ''} ${f.industria || ''} ${f.descripcion || ''}`;
      if (BASE.excluir && new RegExp(BASE.excluir, 'i').test(texto)) continue;
      if (perfil.excluir && new RegExp(perfil.excluir, 'i').test(texto)) continue;
      if (perfil.incluir && !new RegExp(perfil.incluir, 'i').test(texto)) continue;
      if (extra && !extra.test(texto)) continue;
      const m = await metricas(f);
      const cand = { ...c, f, m, region, avisos: avisos(m) };
      universo.set(f.simbolo, cand);
      if (!(perfil.filtros || []).every((fl) => cumple(m, fl))) continue;
      // Con datos que no cuadran no entra en el ranking: va a la hoja «Dudosas» para mirarla a mano.
      if (cand.avisos.length) dudosas.push({ ...cand, perfil: clave }); else grupo.push(cand);
    }
    puntuar(grupo, perfil.puntuacion || {});
    grupo.sort((a, b) => b.puntos - a.puntos);
    for (const c of grupo) c.analizada = yaAnalizada(c);
    console.log(`  ${grupo.length} cumplen los filtros del perfil; las ${Math.min(maxRegion, grupo.length)} primeras:`);
    for (const c of grupo.slice(0, maxRegion)) console.log(`   ${String(c.puntos).padStart(3)}  ${String(c.f.nombre).slice(0, 34).padEnd(34)} ${c.simbolo.padEnd(12)} ${String(c.f.pais).slice(0, 14).padEnd(14)} ROIC ${red(c.m.roic_medio, 0)} · FCF ${red(c.m.fcf_yield)} % · caída ${red(c.m.caida_max52, 0)} %${c.analizada ? ` · ya analizada: ${c.analizada}` : ''}`);
    resultados.push({ perfil: clave, region, candidatos: grupo });
  }
}
if (argv.includes('--contar')) process.exit(0);

// ── Excel ──
const pct = (x) => (x === null ? null : x / 100);
const colsM = ['cap_musd', 'caida_max52', 'var_52s', 'ev_ebit', 'per_adelantado', 'fcf_yield', 'roic_medio', 'roic_min', 'wacc', 'crec_ventas_3a', 'g_implicito', 'margen_seguridad', 'margen_ebit', 'rango_margen', 'conversion_fcf', 'dn_ebitda', 'sbc_ventas', 'insiders_pct', 'potencial_analistas', 'n_analistas'];
const valorM = (k, x) => (METRICAS[k][2] === 'pct' ? pct(x) : x === null ? null : METRICAS[k][2] === 'entero' ? Math.round(x) : red(x, 2));
const filasCand = [];
for (const r of resultados) r.candidatos.slice(0, maxRegion).forEach((c, i) => filasCand.push([
  r.perfil, r.region, i + 1, c.puntos, c.f.nombre, c.simbolo, c.f.pais, c.f.sector, c.f.industria,
  ...colsM.map((k) => valorM(k, c.m[k])), ...MARCAS.map(([, fn]) => fn(c.m)), c.analizada,
  c.f.descripcion ? c.f.descripcion.slice(0, 280) + (c.f.descripcion.length > 280 ? '…' : '') : null, `https://finance.yahoo.com/quote/${c.simbolo}`,
]));
const hojaCand = {
  nombre: 'Candidatas', inmovilizar: 6, filas: filasCand,
  columnas: [{ titulo: 'Perfil', ancho: 18 }, { titulo: 'Región', ancho: 10, tipo: 'centro' }, { titulo: 'Puesto', ancho: 7, tipo: 'centro' }, { titulo: 'Puntos', ancho: 7, tipo: 'centro' },
    { titulo: 'Empresa', ancho: 26 }, { titulo: 'Símbolo', ancho: 11, tipo: 'centro' }, { titulo: 'País', ancho: 13 }, { titulo: 'Sector', ancho: 16 }, { titulo: 'Industria', ancho: 22 },
    ...colsM.map((k) => ({ titulo: METRICAS[k][0], ancho: 11, tipo: METRICAS[k][2] })), ...MARCAS.map(([t]) => ({ titulo: t, ancho: 10, tipo: 'marca' })),
    { titulo: 'Ya analizada', ancho: 18, tipo: 'centro' }, { titulo: 'Qué hace', ancho: 70 }, { titulo: 'Yahoo', ancho: 12, tipo: 'enlace' }],
};

// Sectores e industrias: medianas de todo lo descargado (las supervivientes del buscador de todos los perfiles).
const porIndustria = new Map();
for (const c of universo.values()) {
  const k = `${c.region}|${c.f.sector}|${c.f.industria}`;
  porIndustria.set(k, [...(porIndustria.get(k) || []), c]);
}
const filasSect = [...porIndustria.entries()].map(([k, cs]) => {
  const [region, sector, industria] = k.split('|');
  const med = (m) => mediana(cs.map((c) => c.m[m]));
  return [region, sector, industria, cs.length, pct(med('roic_medio')), pct(med('crec_ventas_3a')), pct(med('margen_ebit')), pct(med('caida_max52')), pct(med('var_52s')), red(med('ev_ebit'), 1), pct(med('fcf_yield')), red(med('margen_seguridad'), 1),
    cs.sort((a, b) => (b.m.roic_medio ?? -99) - (a.m.roic_medio ?? -99)).slice(0, 4).map((c) => c.f.nombre).join(' · ')];
}).filter((f) => f[3] >= 2).sort((a, b) => a[0].localeCompare(b[0]) || (b[4] ?? -9) - (a[4] ?? -9));
const hojaSect = {
  nombre: 'Sectores', inmovilizar: 3, filas: filasSect,
  columnas: [{ titulo: 'Región', ancho: 10, tipo: 'centro' }, { titulo: 'Sector', ancho: 18 }, { titulo: 'Industria', ancho: 28 }, { titulo: 'Empresas', ancho: 9, tipo: 'entero' },
    { titulo: 'ROIC medio (mediana)', ancho: 11, tipo: 'pct' }, { titulo: 'Crecimiento ventas', ancho: 11, tipo: 'pct' }, { titulo: 'Margen EBIT', ancho: 10, tipo: 'pct' },
    { titulo: 'Caída desde máximos', ancho: 11, tipo: 'pct' }, { titulo: 'Variación 52 s', ancho: 10, tipo: 'pct' }, { titulo: 'EV/EBIT', ancho: 9, tipo: 'mult' }, { titulo: 'FCF yield', ancho: 9, tipo: 'pct' },
    { titulo: 'Margen de seguridad (pp)', ancho: 11, tipo: 'num' }, { titulo: 'Las de más ROIC', ancho: 70 }],
};

const hojaDud = {
  nombre: 'Dudosas', inmovilizar: 4, filas: dudosas.sort((a, b) => a.perfil.localeCompare(b.perfil) || a.region.localeCompare(b.region)).map((c) => [
    c.perfil, c.region, c.f.nombre, c.simbolo, c.f.pais, c.f.industria, c.avisos.join('; '), valorM('fcf_yield', c.m.fcf_yield), valorM('roic_medio', c.m.roic_medio), valorM('ev_ebit', c.m.ev_ebit), valorM('caida_max52', c.m.caida_max52), yaAnalizada(c),
    c.f.descripcion ? c.f.descripcion.slice(0, 200) + '…' : null]),
  columnas: [{ titulo: 'Perfil', ancho: 18 }, { titulo: 'Región', ancho: 10, tipo: 'centro' }, { titulo: 'Empresa', ancho: 26 }, { titulo: 'Símbolo', ancho: 11, tipo: 'centro' }, { titulo: 'País', ancho: 13 }, { titulo: 'Industria', ancho: 22 },
    { titulo: 'Por qué no entra en el ranking', ancho: 45, tipo: 'largo' }, { titulo: 'FCF yield', ancho: 9, tipo: 'pct' }, { titulo: 'ROIC medio', ancho: 9, tipo: 'pct' }, { titulo: 'EV/EBIT', ancho: 8, tipo: 'mult' }, { titulo: 'Caída desde máximos', ancho: 10, tipo: 'pct' },
    { titulo: 'Ya analizada', ancho: 16, tipo: 'centro' }, { titulo: 'Qué hace', ancho: 60 }],
};
const hojaPerf = {
  nombre: 'Perfiles', filtro: false,
  columnas: [{ titulo: 'Perfil', ancho: 22 }, { titulo: 'Qué busca', ancho: 70, tipo: 'largo' }, { titulo: 'Filtros', ancho: 60, tipo: 'largo' }, { titulo: 'Puntuación', ancho: 50, tipo: 'largo' }, { titulo: 'Resultado', ancho: 40, tipo: 'largo' }],
  filas: perfiles.map(([k, p]) => [k, p.descripcion,
    [...(p.buscador || []).map(([c, o, v]) => `Yahoo: ${c} ${o} ${JSON.stringify(v)}`), ...(p.filtros || []).map(([c, o, v]) => `${METRICAS[c]?.[0] || c} ${o} ${JSON.stringify(v)}`), p.incluir ? `incluye: ${p.incluir}` : null, p.excluir ? `excluye: ${p.excluir}` : null].filter(Boolean).join('\n'),
    Object.entries(p.puntuacion || {}).map(([c, w]) => `${METRICAS[c]?.[0] || c}: ${w > 0 ? '+' : ''}${w}`).join('\n'),
    resultados.filter((r) => r.perfil === k).map((r) => `${r.region}: ${r.candidatos.length} cumplen`).join('\n')]),
};
const hojaMet = {
  nombre: 'Métricas', filtro: false,
  columnas: [{ titulo: 'Métrica', ancho: 28 }, { titulo: 'Clave en perfiles.json', ancho: 22 }, { titulo: 'Qué mide', ancho: 110, tipo: 'largo' }],
  filas: [
    ['Puntos', '', 'Media ponderada de los percentiles de la empresa dentro de las que cumplen el perfil en su región (0-100), con los pesos de «puntuacion». Un dato que falta cuenta como percentil 40.'],
    ...Object.entries(METRICAS).map(([k, [t, e]]) => [t, k, e]),
    ['Marcas ✓ = ✗', '', 'Mismos umbrales que seguimiento.xlsx: crecimiento ≥ 8 % / < 3 %; ROIC − WACC ≥ 5 / < 0; DN/EBITDA ≤ 1,5 / > 3; FCF yield ≥ 5 % / < 2,5 %; estabilidad: rango del margen ≤ 5 / > 12 pp; lo que descuenta: margen de seguridad ≥ 1 / ≤ −1 pp; analistas ≥ 15 % / < 0 %.'],
    ['Ya analizada', '', 'Señal y fecha del último informe del repo de esa empresa (por ticker o nombre).'],
    ['Fuente y límites', '', `Yahoo Finance a ${hoy} (no es una API oficial). Cuentas de 4-5 ejercicios; el ROIC y el WACC son aproximados y no tratan arrendamientos ni partidas extraordinarias como el informe. Fuera: ${BASE.excluir_sectores.join(', ')} (el motor no tiene modelo de bancos ni inmobiliarias). Es un filtro para decidir qué analizar, no una recomendación.`],
  ],
};
mkdirSync(dirname(salida) || '.', { recursive: true });
escribirXlsx(salida, [hojaCand, hojaSect, hojaDud, hojaPerf, hojaMet]);
console.log(`\n${salida}: ${filasCand.length} candidatas, ${dudosas.length} dudosas, ${universo.size} empresas con ficha, ${filasSect.length} industrias · ${Math.round((Date.now() - inicio) / 1000)} s`);

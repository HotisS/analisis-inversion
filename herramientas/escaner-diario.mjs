// Escáner diario de precios y señales (14-oct-2026, pedido del usuario: «escáner diario de actualización de precios que
// se lance cada día sobre las 9:30 y las 15:00 (EE. UU. y Europa abiertos); si una acción toca banda de comprar (y puede
// entrar como candidata) o de vender (y está en cartera), se actualiza el análisis (Vup) y se emite señal»).
// Procedimiento completo, con el paso «Vup» que hace Claude a mano: escaner/README.md. Sin dependencias.
// REGLA DURA (usuario, 14-oct 18:04): las señales son avisos, nunca órdenes. Ninguna herramienta ni paso automático toca el
// broker; una orden solo se lanza si el usuario la pide explícitamente en el chat y la confirma cuando se le pide confirmación.
//
//   NODE_USE_ENV_PROXY=1 node herramientas/escaner-diario.mjs
//       1) precios de todas las analizadas (herramientas/precios.mjs, sesión en curso) y de las growth (Yahoo)
//       2) pruebas de robustez al precio de ahora (robustez.mjs --actual y robustez-growth.mjs --precios), objetivo fijo
//       3) reglas de MEMORIA.md (escaner/reglas.json) contra la cartera (carpeta privada: escaner-cartera.json)
//       → <privada>/escaner/escaneo-ultimo.json: «candidatas» (necesitan Vup antes de ser señal), «observaciones» (tocan banda pero
//         no hay liquidez, ya están en órdenes…) y «activas» (señales ya emitidas que siguen en pie)
//   … --sin-precios         no vuelve a pedir precios (usa los de verticales/empresa/precios.json)
//   node herramientas/escaner-diario.mjs --vup <clave> --bpa 0,95
//       recalcula una candidata value con el BPA de los tres escenarios × factor (resultados publicados después del
//       informe) y dice si la compra robusta sigue en pie y a qué límite
//   NODE_USE_ENV_PROXY=1 node herramientas/escaner-diario.mjs --registrar   (lee <privada>/escaner/decisiones.json)
//       apunta en <privada>/escaner/registro-senales.json las señales decididas tras el Vup y las observaciones, actualiza el
//       seguimiento de todas las señales (frente al índice) y escribe <privada>/escaner/SENALES.md y el mensaje para el chat
//       (<privada>/escaner/mensaje-ultimo.md; <privada> = /mnt/project-files/cartera/real o CARTERA_REAL)
//   NODE_USE_ENV_PROXY=1 node herramientas/escaner-diario.mjs --seguimiento   solo el seguimiento y SENALES.md
//   node herramientas/escaner-diario.mjs --vigilancia   (mañana) qué vigiladas publicaron resultados desde la última pasada,
//       cuáles los publican en 7 días y la lista para las alertas de riesgo (escaner/calendario.json manda en las fechas)
//   NODE_USE_ENV_PROXY=1 node herramientas/escaner-diario.mjs --semanal   (domingo) informe semanal: cartera frente al
//       índice, señales y aciertos, lista de espera, suplentes, liquidez ociosa, robustez de todo e informes viejos
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { ultimoDatos } from './objetivo12m.mjs';
import { ultimoCierre, leerPrecios } from './precios.mjs';
import { leerCalendario, fechaResultados } from './calendario.mjs';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
process.chdir(RAIZ);
const E = 'escaner/';
// Las salidas llevan datos de la cuenta (posiciones, liquidez, títulos de cada aviso): van a la carpeta privada del
// proyecto, nunca al repo (público). En el repo solo quedan reglas, calendario y control de rutinas.
const P = `${process.env.CARTERA_REAL || '/mnt/project-files/cartera/real'}/escaner/`;
mkdirSync(P, { recursive: true });
const leer = (p, def = null) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : def);
const guardar = (p, x) => writeFileSync(p, JSON.stringify(x, null, 1) + '\n');
const num = (v) => (v === null || v === undefined || v === '' || Number.isNaN(Number(v)) ? null : Number(v));
const r = (x, d = 1) => (x === null || x === undefined || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
const f = (x, d = 1) => (x === null || x === undefined || !Number.isFinite(x) ? 'n.d.' : x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));
const fp = (x) => (x === null || x === undefined ? 'n.d.' : `${x > 0 ? '+' : ''}${f(x, 1)} %`);
const fPrecio = (x) => f(x, x >= 1000 ? 0 : 2);
const dias = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);
const madrid = (d = new Date()) => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(d).map((x) => [x.type, x.value]));
  return { fecha: `${p.year}-${p.month}-${p.day}`, hora: `${p.hour}:${p.minute}` };
};
const fechaCorta = (iso) => { if (!iso) return '¿?'; const [, m, d] = iso.split('-'); return `${+d}-${['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][+m - 1]}`; };
const nodo = (script, a) => execFileSync(process.execPath, [script, ...a], { cwd: RAIZ, env: process.env, maxBuffer: 512 * 1024 * 1024, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

const args = process.argv.slice(2);
const opcion = (k) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : null; };
const bandera = (k) => { const i = args.indexOf(k); if (i >= 0) args.splice(i, 1); return i >= 0; };
const vup = opcion('--vup'), bpa = opcion('--bpa'), registrar = (() => { const i = args.indexOf('--registrar'); if (i < 0) return null; const v = args[i + 1]; if (v && !v.startsWith('--')) { args.splice(i, 2); return v; } args.splice(i, 1); return `${P}decisiones.json`; })();
const sinPrecios = bandera('--sin-precios'), soloSeguimiento = bandera('--seguimiento');

const REGLAS = leer(`${E}reglas.json`);
// La cartera real NO va en el repo (público): vive en la carpeta privada del proyecto (CARTERA_REAL o
// /mnt/project-files/cartera/real/escaner-cartera.json; plantilla sin datos en escaner/cartera.ejemplo.json).
// Sin ese archivo el escáner sigue funcionando con una cartera vacía (sin reglas de cartera ni liquidez libre).
const RUTA_CARTERA = `${process.env.CARTERA_REAL || '/mnt/project-files/cartera/real'}/escaner-cartera.json`;
const CARTERA = leer(RUTA_CARTERA) ?? (console.error(`Aviso: no está ${RUTA_CARTERA}; el escáner sigue con la cartera vacía.`),
  { posiciones: [], liquidez_eur: 0, liquidez_libre_eur: 0, ordenes_pendientes: {} });
const REV = leer('verticales/empresa/objetivo12m-revisados.json').revisados;
const RUTA_REG = `${P}registro-senales.json`, RUTA_ESC = `${P}escaneo-ultimo.json`;

// ---------- Tipos de cambio (EUR por unidad de la divisa de cotización) ----------
const FX = { EUR: 1 };
async function aEur(divisa) {
  if (!divisa) return null;
  if (divisa === 'GBp' || divisa === 'GBX') return (await aEur('GBP')) / 100;
  const d = divisa.toUpperCase();
  if (FX[d] !== undefined) return FX[d];
  const q = await ultimoCierre(`EUR${d}=X`);
  FX[d] = q.error ? null : 1 / (q.en_curso?.precio ?? q.precio);
  return FX[d];
}
async function precioAhora(simbolo) {
  const q = await ultimoCierre(simbolo);
  return q.error ? null : { precio: q.en_curso?.precio ?? q.precio, fecha: q.en_curso?.fecha ?? q.fecha, divisa: q.divisa };
}

// ---------- Calidad (MEMORIA.md: ROIC − WACC ≥ 5 puntos y sostenibilidad «Sí») ----------
function calidad(carpeta, clave) {
  const d = ultimoDatos(carpeta);
  const filas = (d?.calc?.roic_frente_wacc || []).filter((x) => num(x.roic_pct) !== null && num(x.wacc_pct) !== null && !/e$/i.test(String(x.periodo)));
  const u = filas.at(-1);
  const dif = u ? r(u.roic_pct - u.wacc_pct) : null;
  const sost = d?.calc?.dcf?.sostenibilidad?.veredicto || null;
  const exc = REGLAS.calidad_excepciones?.[clave];
  const pasaRoic = dif === null ? null : dif >= REGLAS.calidad_min_roic_wacc || !!exc;
  const pasa = pasaRoic === false || (sost && !/^s[ií]/i.test(sost)) ? false : pasaRoic === null || !sost ? null : true;
  const txt = `ROIC − WACC ${dif === null ? 'n.d. (revisar a mano)' : `${f(dif)} puntos`}${exc ? ` (${exc})` : ''}; sostenibilidad ${sost || 'n.d.'}`;
  return { pasa, dif, sost, txt, d };
}

// ---------- Escaneo ----------
async function escanear() {
  const ahora = madrid();
  if (!sinPrecios) { process.stderr.write('Precios value (precios.mjs)…\n'); nodo('herramientas/precios.mjs', []); }
  const PRECIOS = leerPrecios();
  process.stderr.write('Robustez value al precio de ahora…\n');
  const rob = JSON.parse(nodo('herramientas/robustez.mjs', ['--todas', '--json', '--actual']))
    .filter((x) => !x.error && REV[x.clave]?.carpeta === x.carpeta);
  process.stderr.write('Growth (precios y robustez)…\n');
  const gro = JSON.parse(nodo('herramientas/robustez-growth.mjs', ['--precios', '--json']));

  const pos = new Map(CARTERA.posiciones.map((p) => [p.clave, p]));
  const pend = CARTERA.ordenes_pendientes || {};
  const enOrdenes = new Map([...(pend.comprar || []).map((o) => [o.clave, `orden de compra del 15-oct (límite ${fPrecio(o.limite)} ${o.divisa})`]),
    ...(pend.lista_espera || []).map((o) => [o.clave, `${o.hasta ? `lista de espera hasta el ${fechaCorta(o.hasta)}` : (o.condicion || 'lista de espera')} (límite ${fPrecio(o.limite)} ${o.divisa})`])]);
  const ventaPend = new Set(pend.vender || []);

  // Valor de la cartera a precio de ahora (para el tamaño y el bolsillo growth).
  let total = CARTERA.liquidez_eur, growthEur = 0;
  const valorPos = {};
  for (const p of CARTERA.posiciones) {
    let eur = p.valor_eur ?? null;
    const x = rob.find((y) => y.clave === p.clave), g = gro.find((y) => y.ticker === p.clave);
    if (x?.precio_cot) eur = p.titulos * x.precio_cot * (await aEur(x.divisa_cotizacion));
    else if (g?.precio_hoy) eur = p.titulos * g.precio_hoy * (await aEur(g.divisa));
    else if (PRECIOS.precios[p.clave] && !PRECIOS.precios[p.clave].error) { const q = PRECIOS.precios[p.clave]; eur = p.titulos * (q.en_curso?.precio ?? q.precio) * (await aEur(q.divisa)); }
    valorPos[p.clave] = eur ?? 0; total += eur ?? 0;
    if (p.vertical === 'growth') growthEur += eur ?? 0;
  }
  // Las compras emitidas que siguen activas ya tienen su dinero apartado.
  let libre = CARTERA.liquidez_libre_eur - (leer(RUTA_REG, { senales: [] }).senales.filter((s) => s.tipo === 'COMPRA' && s.estado === 'emitida' && dias(s.fecha, ahora.fecha) <= REGLAS.dias_senal_activa
    && !(CARTERA.posiciones.some((p) => p.clave === s.clave))).reduce((t, s) => t + (s.importe_eur || 0), 0));
  const tamano = async (precio, divisa) => {
    const fx = await aEur(divisa), pe = precio * fx;
    const objetivo = Math.min(Math.max(REGLAS.peso_objetivo_pct / 100 * total, REGLAS.minimo_posicion_eur), REGLAS.tope_posicion_pct / 100 * total);
    const importe = Math.min(objetivo, libre);
    const titulos = Math.floor(importe / pe);
    return { titulos, eur: r(titulos * pe, 0), cabe: titulos > 0 && titulos * pe >= REGLAS.minimo_posicion_eur, fx };
  };

  const reg = leer(RUTA_REG, { senales: [] });
  const activa = (clave, tipo) => reg.senales.filter((s) => s.clave === clave && s.tipo === tipo && s.estado === 'emitida' && dias(s.fecha, ahora.fecha) <= REGLAS.dias_senal_activa).at(-1);
  // Descartada en el Vup hace menos de 7 días: no se vuelve a revisar salvo que el precio haya bajado más de un 5 % desde entonces.
  const descartadaHacePoco = (c) => reg.senales.some((s) => s.clave === c.clave && s.tipo === c.tipo && s.estado === 'descartada tras Vup' && dias(s.fecha, ahora.fecha) < 7
    && (c.tipo === 'COMPRA' ? c.precio > 0.95 * s.precio : c.precio < 1.05 * s.precio));
  const yaVisto = (clave, tipo, estado) => reg.senales.some((s) => s.clave === clave && s.tipo === tipo && s.estado === estado && dias(s.fecha, ahora.fecha) <= REGLAS.dias_senal_activa);

  const candidatas = [], observaciones = [], activas = [], descartesCalidad = [], recientes = [];
  const horaPrecio = madrid(new Date(PRECIOS.actualizado)).hora;
  const base = (x, extra) => ({ fecha: ahora.fecha, hora: ahora.hora, ...extra });

  // --- Value: compras ---
  const compras = [];
  for (const x of rob) {
    if (pos.has(x.clave) || REGLAS.exclusiones[x.clave] || !x.precio_cot || x.limite_comprar_cot === null) continue;
    const limite = r(Math.min(x.limite_comprar_cot, x.limite_comprar_control_cot ?? Infinity), 2);
    if (x.precio_cot > limite) continue;
    const rev = REV[x.clave], q = calidad(x.carpeta, x.clave), d = q.d;
    const sim = PRECIOS.precios[x.clave]?.simbolo || null;
    const fila = base(x, { tipo: 'COMPRA', vertical: 'value', clave: x.clave, nombre: x.nombre, carpeta: `informes/${x.carpeta}`, simbolo: sim,
      precio: x.precio_cot, divisa: x.divisa_cotizacion, hora_precio: x.fecha_precio === ahora.fecha ? horaPrecio : `cierre del ${fechaCorta(x.fecha_precio)}`,
      limite, rentabilidad_12m_pct: x.ponderada, rentabilidad_v2_pct: x.v2, base_pct: x.base, metodo: rev?.selector?.regla || x.version,
      accion_robusta: x.accion_robusta, veredicto: x.veredicto, calidad: q.txt,
      fecha_corte: d?.meta?.fecha_corte || null, proximos_resultados: fechaResultados(x.clave, d),
      senal_alarma: d?.resumen?.cambiaria_recomendacion || null, que_vigilar: d?.resumen?.que_vigilar || null,
      marcas: x.marcas.filter((m) => m.tratamiento !== 'AVISO' || /^E/.test(m.codigo)).map((m) => `[${m.codigo} ${m.tratamiento}] ${m.texto}`),
      motivo: `Toca su precio de compra robusto (${fPrecio(limite)} ${x.divisa_cotizacion}: pasa con el método vigente y con v2). Rentabilidad esperada a 12 meses ${fp(x.ponderada)}; ${q.txt}.`,
      objecion_auto: x.frente?.[0] ? `Con otra lectura razonable cambia: ${x.frente[0]}.` : (x.marcas.find((m) => m.tratamiento === 'VARIANTE')?.texto || x.marcas.find((m) => m.tratamiento === 'AVISO')?.texto || 'Sin objeción fuerte en las pruebas de robustez.') });
    if (q.pasa === false) { descartesCalidad.push(`${x.nombre} (${q.txt})`); continue; }
    if (x.accion_robusta === 'Comprar') compras.push(fila);
    else {
      // Solo pasan a Vup las que se quedan fuera por cosas que el Vup resuelve: resultados publicados después del informe
      // (E1) o un precio que se ha movido más de un 15 % desde el informe (E3). El resto no pasa la robustez y no es señal.
      const bloq = x.marcas.filter((m) => m.tratamiento === 'CONFIANZA' || m.tratamiento === 'CORREGIR');
      if (x.veredicto !== 'BLOQUEADA' && bloq.length && bloq.every((m) => ['E1', 'E3'].includes(m.codigo)) && x.variantes?.find((t) => t.variante === 'v2 (control)')?.comprar !== false) {
        fila.vup_obligatorio = bloq.map((m) => m.texto).join(' '); compras.push(fila);
      }
    }
  }
  compras.sort((a, b) => b.rentabilidad_12m_pct - a.rentabilidad_12m_pct);
  for (const c of compras) {
    if (q_calidad_manual(c)) c.calidad_a_mano = true;
    if (enOrdenes.has(c.clave)) { if (!yaVisto(c.clave, 'COMPRA', 'ya en órdenes')) observaciones.push({ ...c, estado: 'ya en órdenes', nota: enOrdenes.get(c.clave) }); continue; }
    const a = activa(c.clave, 'COMPRA');
    if (a) { activas.push({ ...c, desde: a.fecha, precio_senal: a.precio }); continue; }
    if (descartadaHacePoco(c)) { recientes.push(c.nombre); continue; }
    const t = await tamano(c.precio, c.divisa);
    if (!t.cabe) { if (!yaVisto(c.clave, 'COMPRA', 'sin liquidez')) observaciones.push({ ...c, estado: 'sin liquidez', nota: `liquidez libre ${f(libre, 0)} EUR` }); continue; }
    libre -= t.eur;
    candidatas.push({ ...c, titulos: t.titulos, importe_eur: t.eur });
  }

  // --- Growth: compras ---
  const bolsilloPct = total ? (100 * growthEur) / total : 0;
  for (const g of gro.filter((y) => y.precio_hoy && !pos.has(y.ticker) && !REGLAS.exclusiones[y.ticker]).sort((a, b) => b.ponderada_hoy - a.ponderada_hoy)) {
    const pasa = g.precio_hoy <= g.precio_max_compra && /^Comprar/.test(g.senal_robusta || '') && g.ponderada_hoy >= g.listones.ponderada && g.base_hoy >= g.listones.base;
    if (!pasa) continue;
    const c = { fecha: ahora.fecha, hora: ahora.hora, tipo: 'COMPRA', vertical: 'growth', clave: g.ticker, nombre: g.empresa, carpeta: `informes-growth/${g.carpeta}`, simbolo: g.simbolo,
      precio: g.precio_hoy, divisa: g.divisa, hora_precio: g.fecha_hoy === ahora.fecha ? ahora.hora : `cierre del ${fechaCorta(g.fecha_hoy)}`, limite: g.precio_max_compra,
      rentabilidad_12m_pct: g.ponderada_hoy, base_pct: g.base_hoy, conviccion: g.conviccion, fecha_corte: leer(`informes-growth/${g.carpeta}/datos.json`)?.fecha || null, proximos_resultados: fechaResultados(g.ticker, leer(`informes-growth/${g.carpeta}/datos.json`)), accion_robusta: g.senal_robusta, veredicto: g.veredicto,
      marcas: g.marcas.filter((m) => m.tratamiento !== 'AVISO').map((m) => `[${m.codigo} ${m.tratamiento}] ${m.texto}`),
      motivo: `Growth: por debajo de su «compra hasta» (${fPrecio(g.precio_max_compra)} ${g.divisa}); rentabilidad esperada a 12 meses ${fp(g.ponderada_hoy)}, convicción ${g.conviccion}.`,
      objecion_auto: g.frente?.[0] ? `Con otra lectura razonable cambia: ${g.frente[0]}.` : (g.marcas.find((m) => m.tratamiento !== 'AVISO')?.texto || g.marcas.find((m) => !['G2', 'G4'].includes(m.codigo))?.texto || 'Sin objeción fuerte en las pruebas de robustez.') };
    if (enOrdenes.has(c.clave)) { if (!yaVisto(c.clave, 'COMPRA', 'ya en órdenes')) observaciones.push({ ...c, estado: 'ya en órdenes', nota: enOrdenes.get(c.clave) }); continue; }
    const a = activa(c.clave, 'COMPRA');
    if (a) { activas.push({ ...c, desde: a.fecha, precio_senal: a.precio }); continue; }
    if (descartadaHacePoco(c)) { recientes.push(c.nombre); continue; }
    const tg = await tamano(c.precio, c.divisa);
    const hueco = bolsilloPct + (100 * tg.eur) / total <= REGLAS.bolsillo_growth_max_pct + 0.5;
    if (!tg.cabe || !hueco) {
      const est = !tg.cabe ? 'sin liquidez' : 'sin hueco en el bolsillo growth';
      if (!yaVisto(c.clave, 'COMPRA', est)) observaciones.push({ ...c, estado: est, nota: !tg.cabe ? `liquidez libre ${f(libre, 0)} EUR` : `bolsillo growth al ${f(bolsilloPct, 0)} % (tope ${REGLAS.bolsillo_growth_max_pct} %): entraría sustituyendo a otra` });
      continue;
    }
    libre -= tg.eur;
    candidatas.push({ ...c, titulos: tg.titulos, importe_eur: tg.eur });
  }

  // --- Ventas (lo que está en cartera) ---
  for (const p of CARTERA.posiciones) {
    if (REGLAS.no_vender[p.clave] || p.vertical === 'otro') continue;
    // Regla 12 (METODO-VIGENTE.md §4): lo comprado no se vende en 3 meses por recálculos de valoración ni umbrales de
    // precio; solo por un hecho nuevo y duro, que se mira a mano (resultados, supervisor, guía), no lo dispara el escáner.
    const hastaR12 = [p.no_tocar_hasta, REGLAS.mantener_hasta?.[p.clave]].filter((f) => /^\d{4}-\d{2}-\d{2}$/.test(f || '')).sort().at(-1);
    if (hastaR12 && hastaR12 >= ahora.fecha) continue;
    const motivos = [];
    let fila = null;
    if (p.vertical === 'value') {
      const x = rob.find((y) => y.clave === p.clave);
      if (!x?.precio_cot) continue;
      const q = calidad(x.carpeta, x.clave), d = q.d, vi = num(d?.calc?.sintesis?.valor_objetivo), tc = num(d?.meta?.tipo_cambio) || 1;
      if (x.accion_vigente === 'No mantener') {
        const fallos = [];
        if (x.ponderada < 10) fallos.push(`la rentabilidad esperada a 12 meses baja a ${fp(x.ponderada)} (hace falta ≥ 10 %)`);
        if (x.base < 5) fallos.push(`la del escenario base baja a ${fp(x.base)} (hace falta ≥ 5 %)`);
        if (vi && vi / tc < 0.85 * x.precio_cot) fallos.push(`el valor intrínseco (${fPrecio(vi / tc)}) queda más de un 15 % bajo el precio`);
        motivos.push(`Deja de pasar el filtro para mantener: ${fallos.join('; ') || 'no pasa con la regla vigente'}.`);
      }
      // Para seguir en cartera la calidad es ROIC − WACC ≥ 5 (ICE y Equifax salen por eso); la sostenibilidad «En parte»
      // no obliga a vender (Intuit se queda sin ampliar, decisión del hilo value del 14-oct).
      // METODO-VIGENTE.md §4 (6594d99): a menos de 0,5 puntos del umbral cuenta como «al límite» y vale para mantener.
      if (q.dif !== null && q.dif < REGLAS.calidad_min_roic_wacc - 0.5 && !REGLAS.calidad_excepciones?.[p.clave]) motivos.push(`No pasa calidad (${q.txt}).`);
      for (const u of REGLAS.umbrales_venta.filter((u) => u.clave === p.clave)) if (x.divisa_cotizacion === u.divisa && x.precio_cot > u.precio) motivos.push(`Cruza el umbral apuntado: ${u.motivo}.`);
      fila = { tipo: 'VENTA', vertical: 'value', clave: p.clave, nombre: p.nombre, carpeta: `informes/${x.carpeta}`, simbolo: PRECIOS.precios[p.clave]?.simbolo || null,
        precio: x.precio_cot, divisa: x.divisa_cotizacion, hora_precio: x.fecha_precio === ahora.fecha ? horaPrecio : `cierre del ${fechaCorta(x.fecha_precio)}`,
        limite: x.limite_mantener_cot, rentabilidad_12m_pct: x.ponderada, base_pct: x.base, calidad: q.txt, fecha_corte: d?.meta?.fecha_corte || null,
        proximos_resultados: fechaResultados(p.clave, d), senal_alarma: d?.resumen?.cambiaria_recomendacion || null,
        objecion_auto: x.colchon?.mantener !== null && x.ponderada >= 0 ? `La empresa sigue siendo buena; el problema es el precio: el objetivo del informe da ${fp(x.ponderada)}.` : 'La tesis puede volver con los próximos resultados.' };
    } else if (p.vertical === 'growth') {
      const g = gro.find((y) => y.ticker === p.clave);
      if (!g?.precio_hoy) continue;
      if (g.ponderada_hoy <= g.listones.vender) motivos.push(`Growth: al precio de hoy la rentabilidad esperada a 12 meses es ${fp(g.ponderada_hoy)} (se vende con −10 % o menos).`);
      fila = { tipo: 'VENTA', vertical: 'growth', clave: p.clave, nombre: p.nombre, carpeta: `informes-growth/${g.carpeta}`, simbolo: g.simbolo, precio: g.precio_hoy, divisa: g.divisa,
        hora_precio: g.fecha_hoy === ahora.fecha ? ahora.hora : `cierre del ${fechaCorta(g.fecha_hoy)}`, limite: r(g.objetivo_12m / 0.9, 2), rentabilidad_12m_pct: g.ponderada_hoy,
        objecion_auto: 'La salida growth es por tesis, no por precio: si el negocio sigue acelerando, el objetivo se queda corto.' };
    }
    if (!motivos.length) continue;
    fila = { fecha: ahora.fecha, hora: ahora.hora, ...fila, titulos: p.titulos, importe_eur: r(valorPos[p.clave], 0), motivo: motivos.join(' ') };
    if (ventaPend.has(p.clave)) { if (!yaVisto(p.clave, 'VENTA', 'ya en órdenes')) observaciones.push({ ...fila, estado: 'ya en órdenes', nota: 'venta ya decidida para el 15-oct' }); continue; }
    const a = activa(p.clave, 'VENTA');
    if (a) { activas.push({ ...fila, desde: a.fecha, precio_senal: a.precio }); continue; }
    if (descartadaHacePoco(fila)) { recientes.push(fila.nombre); continue; }
    candidatas.push(fila);
  }

  // Calendario de resultados (regla 11 de METODO-VIGENTE.md, 15-oct: los resultados cercanos no aplazan ni parten la compra, solo se avisa; con resultados ya
  // publicados después del informe, revisión obligatoria en el Vup antes de dar la señal).
  for (const c of [...candidatas, ...observaciones, ...activas]) {
    const pr = c.proximos_resultados;
    if (!pr) continue;
    const dd = dias(ahora.fecha, pr);
    if (dd >= 0 && dd <= 10) c.resultados_cerca = `resultados el ${fechaCorta(pr)} (en ${dd} días)${c.tipo === 'COMPRA' ? ': se compra entera sin esperar (regla 11); revisar lo publicado al día siguiente' : ': se vende cuando lo dice la señal, sin esperar a los resultados (regla 11)'}`;
    if (dd < 0 && c.fecha_corte && pr > c.fecha_corte) c.vup_obligatorio = `${c.vup_obligatorio ? `${c.vup_obligatorio} ` : ''}Publicó resultados el ${fechaCorta(pr)}, después del informe (corte ${fechaCorta(c.fecha_corte)}): revisarlos antes de dar la señal.`;
  }
  const esc = { fecha: ahora.fecha, hora: ahora.hora, precios_actualizados: PRECIOS.actualizado, valor_cartera_eur: r(total, 0), liquidez_libre_eur: CARTERA.liquidez_libre_eur,
    bolsillo_growth_pct: r(bolsilloPct), revisadas: { value: rob.length, growth: gro.length }, candidatas, observaciones, activas, descartes_calidad: descartesCalidad, descartadas_hace_poco: recientes };
  guardar(RUTA_ESC, esc);
  console.log(`Escáner ${fechaCorta(ahora.fecha)} ${ahora.hora} (Madrid): ${rob.length} value y ${gro.length} growth revisadas; cartera ${f(total, 0)} EUR, liquidez libre ${f(CARTERA.liquidez_libre_eur, 0)} EUR, bolsillo growth ${f(bolsilloPct, 0)} %.`);
  console.log(`\nCANDIDATAS (necesitan Vup antes de ser señal): ${candidatas.length}`);
  for (const c of candidatas) {
    console.log(`\n· ${c.tipo} ${c.nombre} [${c.clave}, ${c.vertical}] ${c.carpeta}\n  Precio ${fPrecio(c.precio)} ${c.divisa} (${c.hora_precio}); límite ${fPrecio(c.limite)}; rentabilidad 12 m ${fp(c.rentabilidad_12m_pct)}${c.titulos ? `; ${c.titulos} títulos ≈ ${f(c.importe_eur, 0)} EUR` : ''}`);
    console.log(`  Motivo: ${c.motivo}\n  Objeción (automática): ${c.objecion_auto}`);
    if (c.fecha_corte) console.log(`  Informe con corte ${c.fecha_corte}; próximos resultados: ${c.proximos_resultados || 'n.d.'}`);
    if (c.vup_obligatorio) console.log(`  Vup OBLIGATORIO: ${c.vup_obligatorio}`);
    if (c.resultados_cerca) console.log(`  Calendario: ${c.resultados_cerca}`);
    if (c.calidad_a_mano) console.log('  Calidad: ROIC no aplica o sin sostenibilidad: juzgarla con el informe.');
    for (const m of c.marcas || []) console.log(`  ${m}`);
    if (c.senal_alarma) console.log(`  Señal de alarma del informe: ${[].concat(c.senal_alarma).join(' | ')}`);
  }
  console.log(`\nOBSERVACIONES (se apuntan sin Vup): ${observaciones.length}`);
  for (const o of observaciones) console.log(`· ${o.tipo} ${o.nombre}: ${o.estado} (${o.nota}); precio ${fPrecio(o.precio)} ${o.divisa}, límite ${fPrecio(o.limite)}, ${fp(o.rentabilidad_12m_pct)}`);
  if (activas.length) console.log(`\nACTIVAS: ${activas.map((a) => `${a.tipo} ${a.nombre} (desde ${fechaCorta(a.desde)})`).join('; ')}`);
  if (recientes.length) console.log(`\nDescartadas en un Vup de los últimos 7 días (no se repiten): ${recientes.join(', ')}`);
  if (descartesCalidad.length) console.log(`\nTocan banda pero no pasan calidad: ${descartesCalidad.join('; ')}`);
  console.log(`\nSiguiente paso: Vup de cada candidata (escaner/README.md) → ${P}decisiones.json → --registrar.`);
}
function q_calidad_manual(c) { return / n\.d\./.test(c.calidad || ''); }

// ---------- Vup (value): BPA × factor ----------
function vupValue(clave, factor) {
  const rev = REV[clave];
  if (!rev) throw new Error(`${clave}: no es una clave de objetivo12m-revisados.json (value). En growth el Vup es solo de noticias y guía (README).`);
  const fac = String(factor ?? '1').replace(',', '.');
  const [x] = JSON.parse(nodo('herramientas/robustez.mjs', [rev.carpeta, '--json', '--actual', '--bpa-factor', fac]));
  const limite = r(Math.min(x.limite_comprar_cot, x.limite_comprar_control_cot ?? Infinity), 2);
  const sigue = x.accion_robusta === 'Comprar' && x.precio_cot <= limite;
  const res = { clave, carpeta: rev.carpeta, bpa_factor: +fac, precio: x.precio_cot, divisa: x.divisa_cotizacion, rentabilidad_12m_pct: x.ponderada, v2_pct: x.v2,
    limite_robusto: limite, limite_mantener: x.limite_mantener_cot, accion_vigente: x.accion_vigente, accion_robusta: x.accion_robusta, compra_sigue: sigue, frente: x.frente };
  console.log(JSON.stringify(res, null, 1));
  console.log(`\n${x.nombre} con BPA × ${fac}: rentabilidad ${fp(x.ponderada)} (v2 ${fp(x.v2)}); límite robusto ${fPrecio(limite)} ${x.divisa_cotizacion} frente a ${fPrecio(x.precio_cot)}; acción robusta ${x.accion_robusta}. ${sigue ? 'La compra SIGUE en pie.' : 'La compra NO se sostiene.'} Filtro de mantener hasta ${fPrecio(x.limite_mantener_cot)}.`);
  const esc = leer(RUTA_ESC);
  const c = esc?.candidatas.find((y) => y.clave === clave);
  if (c) { c.vup_calc = res; guardar(RUTA_ESC, esc); }
}

// ---------- Registro y seguimiento ----------
async function seguimiento(reg, hoy) {
  const idx = await precioAhora(REGLAS.indice_referencia.simbolo);
  const cache = {};
  for (const s of reg.senales) {
    if (!s.simbolo || !s.precio_eur) continue;
    cache[s.simbolo] ??= await precioAhora(s.simbolo);
    const q = cache[s.simbolo];
    if (!q) continue;
    const fx = await aEur(q.divisa === 'GBp' ? 'GBp' : q.divisa);
    const precioEur = q.precio * fx;
    const varPct = r(100 * (precioEur / s.precio_eur - 1));
    const idxPct = idx && s.indice ? r(100 * (idx.precio / s.indice - 1)) : null;
    // Compra: acierta si lo hace mejor que el índice. Venta: acierta si, después de vender, lo hace peor que el índice.
    const exceso = idxPct === null ? null : r(s.tipo === 'COMPRA' ? varPct - idxPct : idxPct - varPct);
    const d = dias(s.fecha, hoy);
    s.seguimiento = { fecha: hoy, precio: q.precio, variacion_eur_pct: varPct, indice_pct: idxPct, exceso_pct: exceso, dias: d };
    for (const [k, n] of [['a_1m', 30], ['a_3m', 91], ['a_6m', 182], ['a_12m', 365]]) if (d >= n && !s[k]) s[k] = { variacion_eur_pct: varPct, indice_pct: idxPct, exceso_pct: exceso, acierta: exceso === null ? null : exceso > 0 };
  }
}
const ESTADOS = ['emitida', 'descartada tras Vup', 'sin liquidez', 'sin hueco en el bolsillo growth', 'ya en órdenes'];
function resumenSeguimiento(reg) {
  const lineas = [];
  for (const est of ESTADOS) {
    const s = reg.senales.filter((x) => x.estado === est && x.seguimiento?.exceso_pct !== null && x.seguimiento?.exceso_pct !== undefined);
    if (!s.length) continue;
    const bien = s.filter((x) => x.seguimiento.exceso_pct > 0).length;
    const med = s.map((x) => x.seguimiento.exceso_pct).sort((a, b) => a - b)[Math.floor(s.length / 2)];
    lineas.push({ estado: est, n: s.length, bien, mediana_exceso: med });
  }
  return lineas;
}
function escribirSenalesMd(reg) {
  const res = resumenSeguimiento(reg);
  const fila = (s) => `| ${fechaCorta(s.fecha)} ${s.hora} | ${s.tipo} | ${s.nombre} | ${s.estado} | ${fPrecio(s.precio)} ${s.divisa} | ${s.limite !== null && s.limite !== undefined ? fPrecio(s.limite) : '—'} | ${fp(s.rentabilidad_12m_pct)} | ${s.seguimiento ? fp(s.seguimiento.variacion_eur_pct) : '—'} | ${s.seguimiento ? fp(s.seguimiento.indice_pct) : '—'} | ${s.seguimiento?.exceso_pct !== null && s.seguimiento?.exceso_pct !== undefined ? fp(s.seguimiento.exceso_pct) : '—'} | ${(s.estado === 'emitida' ? s.motivo : s.estado === 'descartada tras Vup' ? s.vup : s.nota || '').replace(/\|/g, '/').slice(0, 220)} |`;
  const md = `# Señales del escáner diario

Registro de todas las señales del escáner (\`herramientas/escaner-diario.mjs\`, procedimiento en \`escaner/README.md\`). Se rehace en cada ejecución; los datos están en \`<privada>/escaner/registro-senales.json\`. Última actualización: ${reg.actualizado}.

**Cómo se mide si acierta.** Desde el precio de la señal, en euros, frente al índice mundial (${REGLAS.indice_referencia.nombre}). Una compra acierta si lo hace mejor que el índice; una venta acierta si, después de vender, la acción lo hace peor que el índice. También se siguen las que tocaron banda y no se emitieron (sin liquidez, descartadas tras el Vup), para saber si el filtro ayuda. Se guarda la foto a 1, 3, 6 y 12 meses.

## Resumen

| Estado | Señales | Mejor que el índice | Diferencia mediana frente al índice |
|---|---|---|---|
${res.map((x) => `| ${x.estado} | ${x.n} | ${x.bien} | ${fp(x.mediana_exceso)} |`).join('\n') || '| — | 0 | — | — |'}

## Todas (la más reciente arriba)

| Fecha (Madrid) | Tipo | Valor | Estado | Precio | Límite | Rentab. 12 m | Desde la señal (EUR) | Índice | Diferencia | Motivo / Vup |
|---|---|---|---|---|---|---|---|---|---|---|
${[...reg.senales].reverse().map(fila).join('\n')}
`;
  writeFileSync(`${P}SENALES.md`, md);
}
function mensaje(esc, nuevas, reg, avisos = []) {
  const emit = nuevas.filter((s) => s.estado === 'emitida');
  const desc0 = nuevas.filter((s) => s.estado === 'descartada tras Vup');
  // Sin nada nuevo (ni señales, ni descartes, ni avisos de resultados o de riesgo): una sola línea (regla del usuario).
  if (!emit.length && !desc0.length && !avisos.length) return `Escáner ${fechaCorta(esc.fecha)}, ${esc.hora}: sin señales nuevas${esc.activas.length ? `; siguen en pie ${esc.activas.map((a) => `${a.tipo === 'COMPRA' ? 'comprar' : 'vender'} ${a.nombre}`).join(', ')}` : ''}.`;
  const L = [`**Escáner ${fechaCorta(esc.fecha)}, ${esc.hora} (Madrid)**`, ''];
  if (avisos.length) L.push('Resultados y avisos de riesgo:', ...avisos.map((a) => `- ${a}`), '');
  const linea = (s) => s.tipo === 'COMPRA'
    ? `- **${s.nombre}**: aviso de compra, ${s.titulos} títulos hasta ${fPrecio(s.limite)} ${s.divisa} (ahora ${fPrecio(s.precio)} ${s.divisa}, ${s.hora_precio}). Rentabilidad esperada a 12 meses: ${fp(s.rentabilidad_12m_pct)}. Por qué: ${s.motivo_llano || s.motivo} Objeción más fuerte: ${s.objecion}${s.resultados_cerca ? ` Ojo: ${s.resultados_cerca}.` : ''}`
    : `- **${s.nombre}**: aviso de venta de los ${s.titulos} títulos (ahora ${fPrecio(s.precio)} ${s.divisa}, ${s.hora_precio}). Por qué: ${s.motivo_llano || s.motivo} Objeción más fuerte: ${s.objecion}${s.resultados_cerca ? ` Ojo: ${s.resultados_cerca}.` : ''}`;
  const c = emit.filter((s) => s.tipo === 'COMPRA'), v = emit.filter((s) => s.tipo === 'VENTA');
  if (c.length) L.push('Avisos de compra:', ...c.map(linea), '');
  if (v.length) L.push('Avisos de venta:', ...v.map(linea), '');
  // Regla dura del usuario (14-oct 18:04): ninguna orden sin que lo diga en el chat y lo confirme cuando se le pida.
  if (emit.length) L.push('Son avisos, no órdenes: no se lanza nada salvo que me lo digas en el chat y lo confirmes cuando te lo pregunte.', '');
  if (!emit.length) L.push('Hoy no hay señales nuevas de compra ni de venta.', '');
  const desc = nuevas.filter((s) => s.estado === 'descartada tras Vup');
  if (desc.length) L.push(`Descartadas al actualizar el análisis: ${desc.map((s) => `${s.nombre} (${s.vup})`).join('; ')}.`);
  const sinLiq = nuevas.filter((s) => s.estado === 'sin liquidez' || s.estado === 'sin hueco en el bolsillo growth');
  if (sinLiq.length) L.push(`Tocan su precio de compra pero no hay sitio (${sinLiq.some((s) => s.estado === 'sin liquidez') ? 'liquidez libre insuficiente' : 'bolsillo growth lleno'}): ${sinLiq.map((s) => `${s.nombre} (${fp(s.rentabilidad_12m_pct)})`).join(', ')}.`);
  if (esc.activas.length) L.push(`Siguen en pie: ${esc.activas.map((a) => `${a.tipo === 'COMPRA' ? 'comprar' : 'vender'} ${a.nombre} (desde el ${fechaCorta(a.desde)})`).join(', ')}.`);
  const e = resumenSeguimiento(reg).find((x) => x.estado === 'emitida');
  L.push('', e ? `Seguimiento: ${e.n === 1 ? '1 señal emitida' : `${e.n} señales emitidas`}; ${e.bien} ${e.bien === 1 ? 'va' : 'van'} mejor que el índice mundial.` : 'Seguimiento: todavía no hay señales emitidas que medir.');
  return L.filter((x, i, a) => !(x === '' && a[i - 1] === '')).join('\n').trim();
}
async function registrarDecisiones(ruta) {
  const esc = leer(RUTA_ESC);
  if (!esc) throw new Error('No hay <privada>/escaner/escaneo-ultimo.json: lanza antes el escáner.');
  // decisiones.json: la lista de decisiones, o { "decisiones": [...], "avisos": ["Wise publicó…", …] } con los avisos de
  // resultados y de riesgo de la vigilancia de la mañana (--vigilancia).
  const bruto = leer(ruta, []);
  const dec = Array.isArray(bruto) ? bruto : bruto.decisiones || [];
  const avisos = Array.isArray(bruto) ? [] : bruto.avisos || [];
  const faltan = esc.candidatas.filter((c) => !dec.find((d) => d.clave === c.clave && (d.tipo || c.tipo) === c.tipo));
  if (faltan.length) throw new Error(`Faltan decisiones (Vup) para: ${faltan.map((c) => `${c.tipo} ${c.clave}`).join(', ')}`);
  const reg = leer(RUTA_REG, { nota: 'Registro histórico del escáner diario (herramientas/escaner-diario.mjs). Lo escribe la herramienta; no editar a mano.', senales: [] });
  const idx = await precioAhora(REGLAS.indice_referencia.simbolo);
  const nuevas = [];
  const apuntar = async (s) => {
    const fx = await aEur(s.divisa);
    const x = { id: `${s.fecha}-${s.hora.replace(':', '')}-${s.tipo}-${s.clave}`, ...s, precio_eur: fx ? r(s.precio * fx, 4) : null, indice: idx?.precio ?? null };
    delete x.marcas; delete x.que_vigilar;
    reg.senales.push(x); nuevas.push(x);
  };
  for (const c of esc.candidatas) {
    const d = dec.find((y) => y.clave === c.clave && (y.tipo || c.tipo) === c.tipo);
    if (!/^(emitir|descartar)$/.test(d.decision)) throw new Error(`${c.clave}: decision tiene que ser «emitir» o «descartar»`);
    if (!d.vup) throw new Error(`${c.clave}: falta el texto del Vup (qué se miró y qué salió)`);
    await apuntar({ ...c, ...(d.limite ? { limite: d.limite } : {}), ...(d.titulos ? { titulos: d.titulos } : {}), estado: d.decision === 'emitir' ? 'emitida' : 'descartada tras Vup',
      vup: d.vup, objecion: d.objecion || c.objecion_auto, motivo_llano: d.motivo || null });
  }
  for (const o of esc.observaciones) await apuntar(o);
  reg.actualizado = `${esc.fecha} ${esc.hora} (Madrid)`;
  await seguimiento(reg, esc.fecha);
  guardar(RUTA_REG, reg);
  escribirSenalesMd(reg);
  const m = mensaje(esc, nuevas, reg, avisos);
  writeFileSync(`${P}mensaje-ultimo.md`, m + '\n');
  console.log(m);
}

// ---------- Vigilancia de la mañana: resultados publicados y alertas de riesgo ----------
function vigilados() {
  const pend = CARTERA.ordenes_pendientes || {}, sup = CARTERA.suplentes || {};
  const growthDir = (t) => { try { return execFileSync('bash', ['-c', `grep -l '"ticker": *"${t}"' informes-growth/*/datos.json | head -1`], { encoding: 'utf8' }).trim().split('/')[1] || null; } catch { return null; } };
  const lista = [
    ...CARTERA.posiciones.filter((p) => p.vertical !== 'otro').map((p) => ({ clave: p.clave, nombre: p.nombre, vertical: p.vertical, papel: 'cartera' })),
    ...(pend.comprar || []).map((o) => ({ clave: o.clave, vertical: o.vertical || 'value', papel: 'orden de compra' })),
    ...(pend.lista_espera || []).map((o) => ({ clave: o.clave, vertical: 'value', papel: 'lista de espera' })),
    ...(sup.growth || []).map((t) => ({ clave: t, vertical: 'growth', papel: 'suplente growth' })),
    ...(sup.value || []).map((t) => ({ clave: t, vertical: 'value', papel: 'suplente value' })),
  ];
  const vistos = new Map();
  for (const v of lista) if (!vistos.has(v.clave)) vistos.set(v.clave, v);
  const CAL = leerCalendario();
  return [...vistos.values()].map((v) => {
    let carpeta = null, corte = null, prox = CAL[v.clave]?.fecha || null, nombre = v.nombre || v.clave;
    if (v.vertical === 'value' && REV[v.clave]) {
      carpeta = `informes/${REV[v.clave].carpeta}`;
      const d = ultimoDatos(REV[v.clave].carpeta);
      corte = d?.meta?.fecha_corte || null; nombre = d?.identificacion?.nombre_corto || d?.identificacion?.nombre || nombre;
      prox ??= String(d?.identificacion?.proximos_resultados || '').match(/\d{4}-\d{2}-\d{2}/)?.[0] || null;
    } else if (v.vertical === 'growth') {
      const dir = growthDir(v.clave);
      if (dir) { const d = leer(`informes-growth/${dir}/datos.json`); carpeta = `informes-growth/${dir}`; corte = d?.fecha || null; nombre = d?.empresa || nombre; }
    }
    return { ...v, nombre, carpeta, fecha_corte: corte, proximos_resultados: prox };
  });
}
function vigilancia() {
  const hoy = madrid().fecha;
  const ult = leer(`${P}vigilancia-ultima.json`)?.fecha || new Date(Date.now() - 3 * 864e5).toISOString().slice(0, 10);
  const vs = vigilados();
  const publicaron = vs.filter((v) => v.proximos_resultados && v.proximos_resultados > ult && v.proximos_resultados <= hoy);
  const sinActualizar = vs.filter((v) => v.proximos_resultados && v.fecha_corte && v.proximos_resultados > v.fecha_corte && v.proximos_resultados <= ult);
  const pronto = vs.filter((v) => v.proximos_resultados && v.proximos_resultados > hoy && dias(hoy, v.proximos_resultados) <= 7);
  const res = { fecha: hoy, desde: ult, publicaron, sin_actualizar: sinActualizar, proximos_7_dias: pronto, riesgo: vs.filter((v) => v.papel === 'cartera').map((v) => v.nombre) };
  guardar(`${P}vigilancia-ultima.json`, res);
  console.log(`Vigilancia ${fechaCorta(hoy)} (desde el ${fechaCorta(ult)}): ${vs.length} empresas vigiladas.`);
  console.log(`\nPUBLICARON RESULTADOS (actualizar análisis y revisar señal): ${publicaron.length ? '' : 'ninguna'}`);
  for (const v of publicaron) console.log(`· ${v.nombre} [${v.clave}, ${v.papel}] el ${fechaCorta(v.proximos_resultados)}; informe ${v.carpeta || 'sin informe'} con corte ${v.fecha_corte || 'n.d.'}`);
  if (sinActualizar.length) console.log(`\nRESULTADOS YA PUBLICADOS QUE EL INFORME NO RECOGE (pendientes de versión nueva): ${sinActualizar.map((v) => `${v.nombre} (${fechaCorta(v.proximos_resultados)})`).join(', ')}`);
  console.log(`\nPRÓXIMOS 7 DÍAS: ${pronto.map((v) => `${v.nombre} ${fechaCorta(v.proximos_resultados)}`).join(', ') || 'ninguno'}`);
  console.log(`\nALERTAS DE RIESGO (buscar noticias desde el ${fechaCorta(ult)}: salida del consejero delegado, recorte de previsión, investigación abierta; y la ley francesa de Edenred): ${res.riesgo.join(', ')}`);
  console.log(`\nLo que salga va a "avisos" de ${P}decisiones.json (una frase llana por aviso). Fechas nuevas de resultados: escaner/calendario.json.`);
}

// ---------- Informe semanal ----------
async function cierreHace(simbolo, n) {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(simbolo)}?range=1mo&interval=1d`;
    const j = await (await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, signal: AbortSignal.timeout(30000) })).json();
    const x = j.chart.result[0], q = x.indicators.quote[0].close;
    const lim = Date.now() / 1000 - n * 864e5 / 1000;
    let k = -1; x.timestamp.forEach((t, i) => { if (t <= lim && q[i] != null) k = i; });
    return k >= 0 ? q[k] : null;
  } catch { return null; }
}
async function semanal() {
  const ahora = madrid(), hoy = ahora.fecha;
  if (!sinPrecios) nodo('herramientas/precios.mjs', []);
  const PRECIOS = leerPrecios();
  const rob = JSON.parse(nodo('herramientas/robustez.mjs', ['--todas', '--json', '--actual'])).filter((x) => !x.error && REV[x.clave]?.carpeta === x.carpeta);
  const vs = vigilados();
  const supG = vs.filter((v) => v.papel === 'suplente growth' && v.carpeta).map((v) => v.carpeta.split('/')[1]);
  const gro = supG.length ? JSON.parse(nodo('herramientas/robustez-growth.mjs', ['--precios', '--json', ...supG])) : [];
  // 1. La cartera en la semana frente al índice mundial. Si existe la vertical de seguimiento de cartera (IBKR,
  // herramientas/cartera-real.mjs --semanal), esa parte la da ella y aquí no se duplica.
  const conVertical = existsSync('herramientas/cartera-real.mjs');
  let antes = 0, despues = 0;
  const filas = [];
  for (const p of conVertical ? [] : CARTERA.posiciones) {
    const q = PRECIOS.precios[p.clave];
    const sim = p.simbolo || q?.simbolo || (p.vertical === 'growth' ? gro.find((g) => g.ticker === p.clave)?.simbolo || p.clave : null);
    if (!sim) { antes += p.valor_eur || 0; despues += p.valor_eur || 0; continue; }
    const ah = await precioAhora(sim), hace = await cierreHace(sim, 7);
    if (!ah || !hace) { antes += p.valor_eur || 0; despues += p.valor_eur || 0; continue; }
    const div = ah.divisa === 'GBp' ? 'GBP' : (ah.divisa || 'EUR').toUpperCase(), k = ah.divisa === 'GBp' ? 0.01 : 1;
    const fxH = await aEur(div), fxA = div === 'EUR' ? 1 : 1 / ((await cierreHace(`EUR${div}=X`, 7)) || 1 / fxH);
    const a = p.titulos * hace * k * fxA, b = p.titulos * ah.precio * k * fxH;
    antes += a; despues += b; filas.push({ nombre: p.nombre, pct: r(100 * (b / a - 1)), eur: r(b - a, 0) });
  }
  antes += CARTERA.liquidez_eur; despues += CARTERA.liquidez_eur;
  const carteraPct = r(100 * (despues / antes - 1));
  const iA = await precioAhora(REGLAS.indice_referencia.simbolo), iH = await cierreHace(REGLAS.indice_referencia.simbolo, 7);
  const indicePct = iA && iH ? r(100 * (iA.precio / iH - 1)) : null;
  filas.sort((x, y) => y.pct - x.pct);
  // 2. Señales.
  const reg = leer(RUTA_REG, { senales: [] });
  await seguimiento(reg, hoy); reg.actualizado = `${hoy} ${ahora.hora} (Madrid)`; guardar(RUTA_REG, reg); escribirSenalesMd(reg);
  const semana = reg.senales.filter((x) => x.estado === 'emitida' && dias(x.fecha, hoy) <= 7);
  const e = resumenSeguimiento(reg).find((x) => x.estado === 'emitida');
  // 3. Lista de espera, suplentes y liquidez ociosa.
  const espera = (CARTERA.ordenes_pendientes?.lista_espera || []).map((o) => { const x = rob.find((y) => y.clave === o.clave); return { nombre: x?.nombre || o.clave, precio: x?.precio_cot, limite: o.limite, divisa: o.divisa, hasta: o.hasta, falta: x?.precio_cot ? r(100 * (x.precio_cot / o.limite - 1)) : null }; });
  const sup = gro.map((g) => ({ nombre: g.empresa, precio: g.precio_hoy, limite: g.precio_max_compra, divisa: g.divisa, pond: g.ponderada_hoy, dentro: g.precio_hoy && g.precio_hoy <= g.precio_max_compra && /^Comprar/.test(g.senal_robusta || '') }));
  const ociosa = CARTERA.liquidez_libre_eur >= 3000 && CARTERA.liquidez_libre_desde && dias(CARTERA.liquidez_libre_desde, hoy) >= 90;
  // 4. Método: robustez de todo y avisos de informes viejos.
  const ver = rob.reduce((t, x) => ({ ...t, [x.veredicto]: (t[x.veredicto] || 0) + 1 }), {});
  const CAL = leerCalendario();
  const viejos = [];
  for (const x of rob) {
    const d = ultimoDatos(x.carpeta), corte = d?.meta?.fecha_corte, prox = CAL[x.clave]?.fecha || String(d?.identificacion?.proximos_resultados || '').match(/\d{4}-\d{2}-\d{2}/)?.[0];
    if (corte && dias(corte, hoy) > 90) viejos.push(`${x.nombre} (informe de hace ${dias(corte, hoy)} días)`);
    else if (prox && corte && prox > corte && prox <= hoy) viejos.push(`${x.nombre} (resultados del ${fechaCorta(prox)} posteriores al informe)`);
  }
  const L = [conVertical ? '**Señales, candidatas y método de la semana**' : `**Informe semanal ${fechaCorta(hoy)}**`, '',
    ...(conVertical ? [] : [`| | Esta semana |`, `|---|---|`, `| Tu cartera | ${fp(carteraPct)} |`, `| Índice mundial | ${fp(indicePct)} |`, `| Diferencia | ${fp(indicePct === null ? null : r(carteraPct - indicePct))} |`, '']),
    !conVertical && filas.length ? `Lo que más sube: ${filas.slice(0, 2).map((x) => `${x.nombre} ${fp(x.pct)}`).join(', ')}. Lo que más baja: ${filas.slice(-2).reverse().map((x) => `${x.nombre} ${fp(x.pct)}`).join(', ')}.` : '', '',
    `Señales de la semana: ${semana.length ? semana.map((x) => `${x.tipo === 'COMPRA' ? 'comprar' : 'vender'} ${x.nombre} (${fechaCorta(x.fecha)})`).join(', ') : 'ninguna'}. ${e ? `Desde el principio: ${e.n} emitidas, ${e.bien} mejor que el índice.` : 'Todavía no hay señales emitidas que medir.'}`,
    `Lista de espera: ${espera.map((x) => `${x.nombre} ${x.precio ? `${fPrecio(x.precio)} ${x.divisa} frente a límite ${fPrecio(x.limite)} (${x.falta <= 0 ? 'dentro' : `le falta bajar ${f(x.falta)} %`})` : 'sin precio'}`).join('; ') || 'vacía'}.`,
    `Suplentes growth bajo su precio de compra: ${sup.filter((x) => x.dentro).map((x) => `${x.nombre} (${fp(x.pond)})`).join(', ') || 'ninguno'}.`,
    conVertical ? '' : `Liquidez libre: ${f(CARTERA.liquidez_libre_eur, 0)} EUR${ociosa ? '. Lleva 3 meses o más sin destino: toca pasarla a XEON (regla de liquidez).' : '. No toca XEON (hace falta ≥ 3.000 EUR ociosos durante 3 meses).'}`, '',
    `Repaso del método: ${rob.length} informes value probados al precio de hoy (${Object.entries(ver).map(([k, v]) => `${v} ${k.toLowerCase()}`).join(', ')}). ${viejos.length ? `Se han quedado viejos ${viejos.length} y conviene ponerlos en la cola: ${viejos.join('; ')}.` : 'Ningún informe se ha quedado viejo.'}`];
  const m = L.filter((x, i, a) => !(x === '' && a[i - 1] === '')).join('\n').trim();
  writeFileSync(`${P}semanal-ultimo.md`, m + '\n');
  console.log(m);
}

if (bandera('--vigilancia')) vigilancia();
else if (bandera('--semanal')) await semanal();
else if (vup) vupValue(vup, bpa);
else if (registrar) await registrarDecisiones(registrar);
else if (soloSeguimiento) { const reg = leer(RUTA_REG, { senales: [] }); reg.actualizado = `${madrid().fecha} ${madrid().hora} (Madrid)`; await seguimiento(reg, madrid().fecha); guardar(RUTA_REG, reg); escribirSenalesMd(reg); console.log(resumenSeguimiento(reg)); }
else await escanear();

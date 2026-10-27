#!/usr/bin/env node
// Comprobaciones automáticas de coherencia (27-oct-2026, Hotis: «revisa más potenciales errores y arregla el método y el
// código para que no vuelvan a ocurrir»). Cada comprobación sale de un error real; ninguna cambia datos ni señales: solo
// avisa. La corren el escáner (antes de escanear) y cualquier hilo antes de entregar una tabla o una foto de cartera.
//
//   node herramientas/comprobar.mjs            texto; sale con código 1 si hay algún ERROR
//   node herramientas/comprobar.mjs --json
//
// Lo privado (cartera, órdenes, vigía) se lee de /mnt/project-files/cartera/real (o CARTERA_REAL) si existe; nunca se
// copia al repo y la salida solo da claves, no importes.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { slugCarpeta, carpetasMasNuevas } from './carpetas.mjs';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const REAL = process.env.CARTERA_REAL || '/mnt/project-files/cartera/real';
const leer = (r, d = null) => { try { return JSON.parse(readFileSync(r, 'utf8')); } catch { return d; } };
const hoy = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
const dias = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);
const sumarMeses = (iso, m) => { const d = new Date(`${iso}T12:00:00Z`); d.setUTCMonth(d.getUTCMonth() + m); return d.toISOString().slice(0, 10); };
const res = [];
const nota = (nivel, codigo, texto) => res.push({ nivel, codigo, texto });

const REV = leer(join(RAIZ, 'verticales/empresa/objetivo12m-revisados.json'), { revisados: {} }).revisados;
const REGLAS = leer(join(RAIZ, 'escaner/reglas.json'), {});

// C1 · objetivo12m-revisados.json tiene que apuntar al informe MÁS NUEVO de cada empresa (CR Sanjiu 26-oct; Moncler 27-oct).
const nuevas = carpetasMasNuevas();
for (const [k, v] of Object.entries(REV)) {
  const n = nuevas[slugCarpeta(v.carpeta || '')];
  if (n && n !== v.carpeta) nota('ERROR', 'C1', `${k}: objetivo12m-revisados.json apunta a ${v.carpeta} y hay ${n}. Rehacer: node herramientas/apuntar-12m.mjs ${n} --precios`);
}

// C1b · dos claves de revisados.json para la misma empresa (MONC y MONC.MI el 27-oct): el escáner la veía dos veces.
const porEmpresa = {};
for (const [k, v] of Object.entries(REV)) (porEmpresa[slugCarpeta(v.carpeta || '')] ||= []).push(k);
for (const [e, ks] of Object.entries(porEmpresa)) if (e && ks.length > 1) nota('ERROR', 'C1', `${e}: ${ks.join(' y ')} son la misma empresa en objetivo12m-revisados.json; dejar una sola clave (la de precios.json).`);
// C10 · simbolos.json con la carpeta vieja (precios.json la copia y algunas búsquedas van por carpeta).
const SIMB = leer(join(RAIZ, 'verticales/empresa/simbolos.json'), { empresas: {} }).empresas;
const simbViejos = Object.entries(SIMB).filter(([, e]) => e.carpeta && nuevas[slugCarpeta(e.carpeta)] && nuevas[slugCarpeta(e.carpeta)] !== e.carpeta).map(([k]) => k);
if (simbViejos.length) nota('AVISO', 'C10', `simbolos.json apunta a carpetas viejas en ${simbViejos.length} empresas (${simbViejos.slice(0, 8).join(', ')}${simbViejos.length > 8 ? '…' : ''}).`);

// C2 · robustez.json guardado viejo: leads.mjs y quien lo lea usarían límites de otro día.
for (const [ruta, campo] of [['verticales/empresa/robustez.json', 'fecha'], ['informes-growth/robustez.json', 'fecha']]) {
  const j = leer(join(RAIZ, ruta));
  const f = String(j?.[campo] || '').slice(0, 10);
  if (f && dias(f, hoy) > 3) nota('AVISO', 'C2', `${ruta} es del ${f} (${dias(f, hoy)} días). No sirve para límites: rehacer con --escribir o calcular al momento.`);
}

// C3 · doble prima país en el WACC del informe: flujos en moneda local de un emergente + prima adicional (Brasil 26-oct).
const EMERGENTE_LOCAL = ['BRL', 'MXN', 'INR', 'ZAR', 'COP', 'IDR', 'TRY', 'ARS', 'CLP', 'PEN', 'PHP', 'EGP', 'NGN', 'VND', 'PKR'];
const ultimo = (dir) => {
  const a = readdirSync(dir);
  const vs = a.map((f) => f.match(/^datos-v(\d+)\.json$/)).filter(Boolean).sort((x, y) => y[1] - x[1]);
  return vs.length ? join(dir, vs[0][0]) : a.includes('datos.json') ? join(dir, 'datos.json') : null;
};
for (const c of Object.values(nuevas)) {
  const r = ultimo(join(RAIZ, 'informes', c)); if (!r) continue;
  const d = leer(r); if (!d) continue;
  const w = d.dcf?.wacc || {};
  if (EMERGENTE_LOCAL.includes(d.meta?.divisa) && (+w.prima_adicional_pct || 0) >= 1.5) nota('AVISO', 'C3', `${c}: flujos en ${d.meta.divisa} (bono local ${w.tasa_libre_pct} %) y prima adicional ${w.prima_adicional_pct} %: posible doble prima país.`);
  // C4 · horas de los pasos: en hora de Madrid, no en UTC (Puig/Moncler 21-oct). Solo informes desde el 28-oct (los anteriores dicen «UTC» y son correctos).
  const fecha = c.match(/\d{4}-\d{2}-\d{2}$/)?.[0];
  const diario = join(RAIZ, 'informes', c, 'diario.md');
  if (fecha && fecha >= '2026-10-28' && existsSync(diario) && /Pasos \(UTC/i.test(readFileSync(diario, 'utf8'))) nota('AVISO', 'C4', `${c}: los pasos del diario van en UTC. Desde el 27-oct, en hora de Madrid (TZ=Europe/Madrid date +%H:%M); Madrid es UTC+1 desde el 25-oct.`);
  // C5 · base del BPA declarada en informes nuevos (desde el 28-oct): per_historico.base_bpa y objetivo_12m.base_bpa iguales.
  const o = d.valoracion?.objetivo_12m;
  if (fecha && fecha >= '2026-10-28' && o?.per_historico) {
    const a = o.per_historico.base_bpa, b = o.base_bpa;
    if (!a || !b) nota('AVISO', 'C5', `${c}: falta declarar base_bpa (ajustado / publicado) en per_historico y en objetivo_12m.`);
    else if (String(a).slice(0, 5).toLowerCase() !== String(b).slice(0, 5).toLowerCase()) nota('ERROR', 'C5', `${c}: historia del PER en BPA ${a} y escenarios en BPA ${b}: bases mezcladas.`);
  }
}

// ---- Lo privado: cartera, órdenes y vigía ----
const cartera = leer(join(REAL, 'escaner-cartera.json'));
if (cartera) {
  const movs = leer(join(REAL, 'compras-y-ventas.json'), { posiciones: [] }).posiciones;
  const menc = leer(join(REAL, 'escaner-menciones.json'), { lista: [] }).lista;
  const noVender = new Set([...Object.keys(REGLAS.no_vender || {}), ...menc.filter((m) => m.tipo === 'no_vender').flatMap((m) => m.claves || [])]);
  // C6 · regla de 3 meses: toda compra de menos de 3 meses lleva su fecha de «no tocar» (TUI1 se quedó sin ella el 20-oct).
  for (const p of cartera.posiciones || []) {
    const m = movs.find((x) => x.clave === p.clave);
    const ultima = (m?.compras || []).filter((x) => x.tipo === 'compra').map((x) => x.fecha).sort().at(-1);
    if (!ultima) continue;
    const hasta = sumarMeses(ultima, 3);
    const tiene = [p.no_tocar_hasta, REGLAS.mantener_hasta?.[p.clave]].filter(Boolean).sort().at(-1);
    if (hasta >= hoy && !noVender.has(p.clave) && (!tiene || tiene < hasta)) nota('ERROR', 'C6', `${p.clave}: comprada el ${ultima}; no se toca hasta el ${hasta} y no lo tiene apuntado (no_tocar_hasta ${tiene || 'vacío'}). El escáner podría dar una venta.`);
  }
  // C11 · nivel de cada compra value desde el 20-oct (regla 16): sin él no se pueden aplicar los topes conjuntos de los niveles 2 y 3.
  for (const p of (cartera.posiciones || []).filter((x) => x.vertical === 'value' && !x.nivel)) {
    const m = movs.find((x) => x.clave === p.clave);
    const ultima = (m?.compras || []).filter((x) => x.tipo === 'compra').map((x) => x.fecha).sort().at(-1);
    if (ultima && ultima >= '2026-10-20') nota('AVISO', 'C11', `${p.clave}: comprada el ${ultima} sin «nivel» en la cartera privada; el escáner la cuenta como A para los topes de niveles 2 y 3.`);
  }
  // C7 · niveles en órdenes y vigía: los niveles A/B1/B2/C son solo value; una growth no lleva nivel (Nu «Nivel A» 21-oct);
  // la clave con sufijo (NEM-B1) y el campo nivel tienen que decir lo mismo.
  const growth = new Set(readdirSync(join(RAIZ, 'informes-growth'), { withFileTypes: true }).filter((e) => e.isDirectory())
    .map((e) => leer(join(RAIZ, 'informes-growth', e.name, 'datos.json'))?.ticker).filter(Boolean).map((t) => String(t).toUpperCase()));
  const vigia = leer(join(REAL, 'vigia', 'escaner-cartera.json'));
  const listas = [['órdenes', cartera.ordenes_pendientes || {}], ['vigía', vigia?.ordenes_pendientes || {}]];
  for (const [donde, op] of listas) for (const o of [...(op.comprar || []), ...(op.lista_espera || []), ...(op.vigia_cerca || [])]) {
    if (!o?.clave) continue;
    const base = String(o.clave).replace(/-(A|B1|B2|C)$/, ''), suf = String(o.clave).match(/-(A|B1|B2|C)$/)?.[1];
    const esG = o.vertical === 'growth' || (o.vertical !== 'value' && growth.has(base.toUpperCase()));
    if (esG && o.nivel) nota('ERROR', 'C7', `${donde}: ${o.clave} es growth y lleva «nivel ${o.nivel}»; los niveles son solo value.`);
    if (!esG && !o.nivel && o.limite) nota('AVISO', 'C7', `${donde}: ${o.clave} sin nivel: el vigía ya no lo da por A; apuntar el nivel con robustez.mjs.`);
    if (suf && o.nivel && suf !== o.nivel) nota('ERROR', 'C7', `${donde}: ${o.clave} dice nivel ${o.nivel} y su clave dice ${suf}.`);
  }
  // C8 · compras condicionadas a vender lo que Hotis decidió quedarse (Equifax/ICE 20-oct): notas con «si … vend…» que nombran
  // una posición que no se vende.
  const nombres = Object.fromEntries((cartera.posiciones || []).map((p) => [p.clave, p.nombre]));
  const op = cartera.ordenes_pendientes || {};
  const textos = [];
  const recoger = (v) => { if (typeof v === 'string') textos.push(v); else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => k !== 'disuelta' && recoger(x)); };
  recoger(op);
  const quedan = [...noVender, ...String(op.vender_nota || '').match(/\b(Herm[eè]s|ICE|Equifax)\b/gi) || []];
  for (const t of textos.filter((x) => !/Superado/i.test(x))) for (const q of new Set(quedan)) {
    const nom = nombres[q] || q;
    if (new RegExp(`\\bsi\\b[^.]{0,40}\\b${nom.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b[^.]{0,40}vend`, 'i').test(t)) nota('AVISO', 'C8', `Nota de órdenes condiciona algo a vender ${nom}, que Hotis mantiene: «${t.slice(0, 140)}…». Superada: no condicionar compras a esa venta.`);
  }
  // C9 · escaneo-ultimo de otro día: el vigía y la foto lo usan como lista.
  const esc = leer(join(REAL, 'escaner', 'escaneo-ultimo.json'));
  if (esc?.fecha && dias(esc.fecha, hoy) > 3) nota('AVISO', 'C9', `escaneo-ultimo.json es del ${esc.fecha}: el vigía vigila una lista vieja.`);
}

if (process.argv.includes('--json')) console.log(JSON.stringify({ fecha: hoy, resultados: res }, null, 1));
else {
  const e = res.filter((x) => x.nivel === 'ERROR').length;
  console.log(res.length ? res.map((x) => `[${x.nivel} ${x.codigo}] ${x.texto}`).join('\n') : 'Sin problemas.');
  console.log(`\n${e} errores, ${res.length - e} avisos (${hoy}).`);
}
process.exitCode = res.some((x) => x.nivel === 'ERROR') ? 1 : 0;

#!/usr/bin/env node
// Exclusiones y bloqueos de compra o venta con fecha, motivo y caducidad (Hotis, 15-oct-2026).
//
// La fuente es `menciones` de escaner/reglas.json (lo que puede ser público) y, para lo que toca a sus cuentas,
// /mnt/project-files/cartera/real/escaner-menciones.json (mismo formato; nunca va al repo). Cada mención:
//   { claves: [...], cuenta?: "cuenta-2", tipo: "no_comprar" | "no_vender", origen: "Hotis" | "método",
//     motivo, fecha, mensaje?, caduca?, recordado? }
// Caducidad por defecto de lo que dijo Hotis: empresa 6 meses, sector 12 meses. Dos semanas antes de caducar, el
// informe del domingo lo recuerda; al caducar la mención sigue en vigor hasta que Hotis la haya visto en ese
// recordatorio (`recordado`). Lo del método no caduca.
//
//   node herramientas/exclusiones.mjs --lista             tabla de todas (públicas y privadas)
//   node herramientas/exclusiones.mjs --aplicar           rehace `exclusiones` y `no_vender` de reglas.json con las vigentes
//   node herramientas/exclusiones.mjs --recordar [--marcar]   líneas «Recordar: …» para el informe del domingo
//
// Lo usan escaner-diario.mjs (vigentes, también las privadas) y el informe semanal.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const RUTA = new URL('../escaner/reglas.json', import.meta.url);
const PRIVADA = `${process.env.CARTERA_REAL || '/mnt/project-files/cartera/real'}/escaner-menciones.json`;
const leer = (r, d) => { try { return JSON.parse(readFileSync(r, 'utf8')); } catch { return d; } };
const hoyMadrid = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
const sumarDias = (iso, n) => { const d = new Date(`${iso}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fc = (iso) => (iso ? `${+iso.slice(8, 10)}-${MESES[+iso.slice(5, 7) - 1]}-${iso.slice(0, 4)}` : '—');

export function leerMenciones({ privadas = true } = {}) {
  const pub = (leer(RUTA, {}).menciones?.lista || []).map((m) => ({ ...m, _privada: false }));
  const pri = privadas && existsSync(PRIVADA) ? (leer(PRIVADA, {}).lista || []).map((m) => ({ ...m, _privada: true })) : [];
  return [...pub, ...pri];
}

// Vigente: sin caducidad, aún no caducada, o caducada pero sin haberla visto Hotis en el recordatorio.
export const vigente = (m, hoy = hoyMadrid()) => !m.caduca || m.caduca >= hoy || !m.recordado;

export function vigentes(lista = leerMenciones(), hoy = hoyMadrid()) { return lista.filter((m) => vigente(m, hoy)); }

const texto = (m) => `${m.motivo}${m.origen === 'Hotis' ? ` (Hotis, ${fc(m.fecha)}${m.caduca ? `; caduca el ${fc(m.caduca)}` : ''})` : ''}`;

// Mapas clave → texto, como los leen robustez, seguimiento, leads y noticias.
export function mapas(lista) {
  const exclusiones = {}, no_vender = {}, no_vender_cuentas = {};
  for (const m of lista) {
    if (m.tipo === 'no_vender' && m.cuenta && !(m.claves || []).length) { no_vender_cuentas[m.cuenta] = texto(m); continue; }
    const destino = m.tipo === 'no_vender' ? no_vender : exclusiones;
    for (const k of m.claves || []) destino[k] = texto(m);
  }
  return { exclusiones, no_vender, no_vender_cuentas };
}

function aplicar() {
  const reglas = leer(RUTA, null);
  if (!reglas?.menciones) throw new Error('escaner/reglas.json no tiene «menciones»');
  const { exclusiones, no_vender } = mapas(vigentes(leerMenciones({ privadas: false })));
  reglas.exclusiones = exclusiones;
  reglas.no_vender = no_vender;
  writeFileSync(RUTA, `${JSON.stringify(reglas, null, 2)}\n`);
  console.log(`reglas.json: ${Object.keys(exclusiones).length} exclusiones de compra y ${Object.keys(no_vender).length} de venta vigentes.`);
}

function recordar(marcar) {
  const hoy = hoyMadrid(), limite = sumarDias(hoy, 14);
  const lineas = [];
  for (const privada of [false, true]) {
    const ruta = privada ? PRIVADA : RUTA;
    if (!existsSync(ruta)) continue;
    const doc = leer(ruta, {});
    const lista = privada ? doc.lista || [] : doc.menciones?.lista || [];
    let cambia = false;
    for (const m of lista) {
      if (!m.caduca || m.caduca > limite || m.recordado) continue;
      const nombre = m.nombre || (m.claves || []).join(', ') || m.cuenta;
      const que = m.tipo === 'no_vender' ? 'no se vende' : 'está excluida de compra';
      lineas.push(`Recordar: ${nombre} ${que} desde el ${fc(m.fecha)} por «${m.motivo}»; caduca el ${fc(m.caduca)}. ¿Se mantiene?`);
      if (marcar) { m.recordado = hoy; cambia = true; }
    }
    if (cambia) writeFileSync(ruta, `${JSON.stringify(doc, null, 2)}\n`);
  }
  console.log(lineas.length ? lineas.join('\n') : 'Recordar: ninguna exclusión caduca en las próximas dos semanas.');
}

function lista() {
  const hoy = hoyMadrid();
  console.log('| Qué | Tipo | Origen | Desde | Motivo | Caduca | Vigente |\n|---|---|---|---|---|---|---|');
  for (const m of leerMenciones()) {
    console.log(`| ${m.nombre || (m.claves || []).join(', ') || m.cuenta}${m._privada ? ' (privada)' : ''} | ${m.tipo === 'no_vender' ? 'no vender' : 'no comprar'} | ${m.origen} | ${fc(m.fecha)} | ${m.motivo} | ${fc(m.caduca)} | ${vigente(m, hoy) ? 'sí' : 'no'} |`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  if (a.includes('--aplicar')) aplicar();
  else if (a.includes('--recordar')) recordar(a.includes('--marcar'));
  else lista();
}

#!/usr/bin/env node
// Lista del vigía = grupo «calidad completa a menos de un 5 %» del último escáner (27-oct-2026). Antes vivía en la carpeta
// temporal de otra sesión: si esa máquina se reciclaba, el script desaparecía y el vigía seguía en silencio con la lista vieja.
// Ahora está en el repo y avisa si el escáner del que copia es de otro día.
//
//   node herramientas/sincronizar-cerca.mjs               enseña lo que pondría
//   node herramientas/sincronizar-cerca.mjs --escribir    escribe <privada>/vigia/escaner-cartera.json (y la copia en
//                                                         ordenes_pendientes.vigia_cerca de la cartera privada)
//
// Una entrada por nivel: «NEM» con el límite A y «NEM-B1» con el de B1 si es más alto. Solo value (las growth no tienen
// niveles). Nunca toca el broker.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { leerPrecios } from './precios.mjs';

const REAL = process.env.CARTERA_REAL_BASE || '/mnt/project-files/cartera/real';
const leer = (r, d = null) => { try { return JSON.parse(readFileSync(r, 'utf8')); } catch { return d; } };
const hoy = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
const esc = leer(`${REAL}/escaner/escaneo-ultimo.json`);
if (!esc?.cerca) { console.error(`No veo ${REAL}/escaner/escaneo-ultimo.json con «cerca»: el vigía se queda con su lista.`); process.exit(1); }
const habiles = (a, b) => { let n = 0; for (let d = new Date(`${a}T12:00:00Z`); d < new Date(`${b}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + 1)) if (![0, 6].includes(d.getUTCDay())) n++; return n; };
const viejo = habiles(esc.fecha, hoy) > 1;
const cartera = leer(`${REAL}/escaner-cartera.json`, {});
const destino = `${REAL}/vigia/escaner-cartera.json`;
const previo = leer(destino, { ordenes_pendientes: { lista_espera: [] } });
const desde = new Map((previo.ordenes_pendientes?.lista_espera || []).map((o) => [o.clave, o.desde]));
const P = leerPrecios()?.precios || {};
const cond = 'calidad completa a menos de un 5 % de su primer nivel: comprar ahora a mercado si cotiza en el límite o por debajo (sin orden límite)';
const lista = [], simbolos = {};
for (const c of esc.cerca.filter((x) => x.grupo === 'menos de 5 %' && x.vertical !== 'growth')) {
  const a = c.limite_a ?? c.limite, b = c.limite;
  const nota = (n) => `${esc.fecha}: ${c.nombre}${n ? ` nivel ${n}` : ''}, grupo a menos de 5 % (escáner ${esc.hora})`;
  lista.push({ clave: c.clave, limite: a, nivel: 'A', divisa: c.divisa, vertical: 'value', desde: desde.get(c.clave) || esc.fecha, condicion: cond, nota: nota(null) });
  if (b > a + 1e-9) {
    lista.push({ clave: `${c.clave}-B1`, limite: b, nivel: 'B1', divisa: c.divisa, vertical: 'value', desde: desde.get(`${c.clave}-B1`) || esc.fecha, condicion: cond, nota: nota('B1') });
    const s = P[c.clave]?.simbolo; if (s) simbolos[`${c.clave}-B1`] = s;
  }
}
const salida = { nota: 'Copia para el vigía (herramientas/sincronizar-cerca.mjs); no editar a mano.', escaner: `${esc.fecha} ${esc.hora}`, liquidez_libre_eur: cartera.liquidez_libre_eur ?? previo.liquidez_libre_eur ?? 0,
  ordenes_pendientes: { lista_espera: lista, simbolos: { ...(previo.ordenes_pendientes?.simbolos || {}), ...simbolos } } };
if (viejo) console.error(`AVISO: el escáner es del ${esc.fecha} ${esc.hora} (más de un día hábil): el vigía vigila una lista vieja.`);
console.log(`${lista.length} entradas (${esc.cerca.filter((x) => x.grupo === 'menos de 5 %').length} empresas) del escáner ${esc.fecha} ${esc.hora}.`);
if (process.argv.includes('--escribir')) {
  if (!existsSync(`${REAL}/vigia`)) mkdirSync(`${REAL}/vigia/escaner`, { recursive: true });
  writeFileSync(destino, `${JSON.stringify(salida, null, 1)}\n`);
  if (cartera.ordenes_pendientes) {
    cartera.ordenes_pendientes.vigia_cerca = lista;
    writeFileSync(`${REAL}/escaner-cartera.json`, `${JSON.stringify(cartera, null, 2)}\n`);
  }
}

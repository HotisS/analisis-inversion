// Control de las rutinas programadas (14-oct-2026, regla del usuario: «cualquier tarea programada que no pudiera lanzarse
// se lanza inmediatamente cuando pueda»). Cada rutina apunta aquí su última ejecución COMPLETADA; al arrancar, cualquier
// rutina (y la comprobación horaria) mira si alguna se quedó sin hacer desde su hora prevista y la hace primero.
// Calendario y pasos de cada rutina: escaner/README.md. Sin dependencias.
//
//   node herramientas/rutinas.mjs --pendientes        rutinas sin completar desde su última hora prevista (la más antigua
//                                                     primero); sale con código 0 y «ninguna» si no hay
//   node herramientas/rutinas.mjs --empieza <rutina>  apunta que ha empezado (si no termina, la siguiente la retoma)
//   node herramientas/rutinas.mjs --hecha <rutina>    apunta que ha terminado (solo después del push)
//   … --ahora 2026-10-15T12:00:00Z                    (pruebas) como si fuera esa hora
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const RUTA = fileURLToPath(new URL('../escaner/ejecuciones.json', import.meta.url));
// Horas de Madrid. dias: 0 = domingo … 6 = sábado. primerDomingo: solo si el día del mes es ≤ 7.
export const RUTINAS = {
  manana: { nombre: 'Vigilancia y escáner de la mañana', dias: [1, 2, 3, 4, 5], hora: '09:25' },
  tarde: { nombre: 'Escáner de la tarde', dias: [1, 2, 3, 4, 5], hora: '15:45' },
  semanal: { nombre: 'Informe semanal', dias: [0], hora: '17:50' },
  mensual: { nombre: 'Backtest mensual', dias: [0], hora: '17:20', primerDomingo: true },
};
const args = process.argv.slice(2);
const opcion = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const AHORA = opcion('--ahora') ? new Date(opcion('--ahora')) : new Date();

// Fecha y hora de Madrid → instante UTC (con el horario de verano que toque ese día).
function madridAUtc(fecha, hora) {
  const [y, m, d] = fecha.split('-').map(Number), [hh, mm] = hora.split(':').map(Number);
  let t = Date.UTC(y, m - 1, d, hh, mm);
  for (let i = 0; i < 2; i++) {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date(t)).map((x) => [x.type, x.value]));
    const visto = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute);
    t += Date.UTC(y, m - 1, d, hh, mm) - visto;
  }
  return new Date(t);
}
// Última hora prevista de una rutina antes de «ahora».
export function ultimaPrevista(r, ahora = AHORA) {
  for (let k = 0; k <= 40; k++) {
    const dia = new Date(ahora.getTime() - k * 864e5);
    const fecha = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(dia);
    const t = madridAUtc(fecha, r.hora);
    const dow = new Date(`${fecha}T12:00:00Z`).getUTCDay();
    if (t <= ahora && r.dias.includes(dow) && (!r.primerDomingo || +fecha.slice(8) <= 7)) return t;
  }
  return null;
}
const leer = () => (existsSync(RUTA) ? JSON.parse(readFileSync(RUTA, 'utf8')) : { nota: 'Última ejecución de cada rutina programada (herramientas/rutinas.mjs). Lo escribe la herramienta.', rutinas: {} });
const guardar = (j) => writeFileSync(RUTA, JSON.stringify(j, null, 1) + '\n');

export function pendientes(ahora = AHORA) {
  const j = leer(), out = [];
  for (const [id, r] of Object.entries(RUTINAS)) {
    const prevista = ultimaPrevista(r, ahora);
    const hecha = j.rutinas[id]?.hecha ? new Date(j.rutinas[id].hecha) : null;
    // Una rutina nueva no arrastra pasadas de antes de existir el control.
    const alta = j.rutinas[id]?.alta ? new Date(j.rutinas[id].alta) : null;
    if (prevista && (!hecha || hecha < prevista) && (!alta || alta <= prevista)) out.push({ id, nombre: r.nombre, prevista: prevista.toISOString(), ultima_hecha: hecha?.toISOString() || null, empezada_sin_terminar: j.rutinas[id]?.empezada && (!hecha || new Date(j.rutinas[id].empezada) > hecha) ? j.rutinas[id].empezada : null });
  }
  return out.sort((a, b) => a.prevista.localeCompare(b.prevista));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (args.includes('--pendientes')) {
    const p = pendientes();
    if (!p.length) console.log('ninguna');
    for (const x of p) console.log(`${x.id}: ${x.nombre} — prevista ${x.prevista}, última completada ${x.ultima_hecha || 'nunca'}${x.empezada_sin_terminar ? ` (empezó ${x.empezada_sin_terminar} y no terminó: retomarla)` : ''}`);
  } else if (opcion('--empieza') || opcion('--hecha') || opcion('--alta')) {
    const id = opcion('--empieza') || opcion('--hecha') || opcion('--alta');
    if (!RUTINAS[id]) throw new Error(`Rutina desconocida: ${id} (${Object.keys(RUTINAS).join(', ')})`);
    const j = leer();
    j.rutinas[id] ??= {};
    j.rutinas[id][opcion('--empieza') ? 'empezada' : opcion('--hecha') ? 'hecha' : 'alta'] = AHORA.toISOString();
    guardar(j);
    console.log(`${id}: ${opcion('--empieza') ? 'empezada' : opcion('--hecha') ? 'hecha' : 'alta'} ${AHORA.toISOString()}`);
  } else console.log('Uso: --pendientes | --empieza <rutina> | --hecha <rutina>');
}

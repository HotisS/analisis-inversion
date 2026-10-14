// Calendario de resultados único (14-oct-2026, pedido del usuario: «en la lista de seguimiento (Excel), análisis y escáner
// apunta también el calendario de resultados y estate atento para tenerlo en cuenta»). La fuente es
// `escaner/calendario.json` (cartera, órdenes, lista de espera y suplentes, value y growth); lo pone al día la pasada de
// las 9:25 (escaner/README.md). Lo leen el escáner, `seguimiento.mjs` (columna «Próximos resultados») y, con --aplicar,
// los propios análisis (solo el campo de la fecha; no se rehace ningún cálculo). Sin dependencias.
//
//   node herramientas/calendario.mjs                 lista el calendario por fecha
//   node herramientas/calendario.mjs --aplicar       escribe la fecha en el último datos*.json de cada análisis:
//                                                    value → identificacion.proximos_resultados; growth → proximos_resultados
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const RUTA = `${RAIZ}escaner/calendario.json`;

export function leerCalendario() {
  const j = existsSync(RUTA) ? JSON.parse(readFileSync(RUTA, 'utf8')) : { fechas: {} };
  const out = {};
  for (const [k, v] of Object.entries(j.fechas || {})) out[k] = typeof v === 'string' ? { fecha: v } : v;
  return out;
}
const FECHA = /\d{4}-\d{2}-\d{2}/;
// Fecha de los próximos resultados: manda el calendario; si no está, la del informe.
export function fechaResultados(clave, datos = null, cal = leerCalendario()) {
  const c = cal[clave]?.fecha;
  if (c) return c;
  return String(datos?.identificacion?.proximos_resultados || datos?.proximos_resultados || '').match(FECHA)?.[0] || null;
}

// Último datos*.json de una carpeta (por número de versión; datos.json es la versión 1).
function ultimoArchivo(dir) {
  const fs = readdirSync(dir).filter((f) => /^datos(-v\d+)?\.json$/.test(f));
  fs.sort((a, b) => (+(a.match(/-v(\d+)/)?.[1] || 1)) - (+(b.match(/-v(\d+)/)?.[1] || 1)));
  return fs.length ? `${dir}/${fs.at(-1)}` : null;
}
function escribirCampo(ruta, aplicar) {
  const txt = readFileSync(ruta, 'utf8');
  const d = JSON.parse(txt);
  if (!aplicar(d)) return false;
  writeFileSync(ruta, JSON.stringify(d, null, 2) + (txt.endsWith('\n') ? '\n' : ''));
  return true;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const cal = leerCalendario();
  if (process.argv.includes('--aplicar')) {
    const rev = JSON.parse(readFileSync(`${RAIZ}verticales/empresa/objetivo12m-revisados.json`, 'utf8')).revisados;
    const growth = readdirSync(`${RAIZ}informes-growth`, { withFileTypes: true }).filter((e) => e.isDirectory() && existsSync(`${RAIZ}informes-growth/${e.name}/datos.json`)).map((e) => e.name);
    let n = 0;
    for (const [clave, c] of Object.entries(cal)) {
      const texto = `${c.fecha}${c.confirmada === false ? ' (estimada)' : ''}${c.nota ? `: ${c.nota}` : ''}`;
      if (rev[clave]) {
        const f = ultimoArchivo(`${RAIZ}informes/${rev[clave].carpeta}`);
        if (f && escribirCampo(f, (d) => { if (d.identificacion?.proximos_resultados === texto) return false; d.identificacion.proximos_resultados = texto; return true; })) { n++; console.log(`value  ${clave}: ${texto}`); }
      }
      for (const g of growth) {
        const f = `${RAIZ}informes-growth/${g}/datos.json`;
        if (JSON.parse(readFileSync(f, 'utf8')).ticker !== clave) continue;
        if (escribirCampo(f, (d) => { if (d.proximos_resultados === texto) return false; d.proximos_resultados = texto; return true; })) { n++; console.log(`growth ${clave}: ${texto}`); }
      }
    }
    console.log(`${n} análisis con la fecha puesta al día.`);
  } else {
    for (const [k, c] of Object.entries(cal).sort((a, b) => a[1].fecha.localeCompare(b[1].fecha))) console.log(`${c.fecha}  ${k.padEnd(8)} ${c.nombre || ''}${c.confirmada === false ? ' (estimada)' : ''}${c.nota ? ` — ${c.nota}` : ''}`);
  }
}

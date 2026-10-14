// Rehace el Word (y el PDF) de informes value ya hechos con el motor VIGENTE, sin investigación nueva: toma el último
// datos*.json de la carpeta, lo recalcula con motor/calcular-empresa.mjs (regla a 12 meses, controles, síntesis), lo
// guarda como versión nueva y rellena la plantilla. Sirve para que ningún informe quede con cifras de un método viejo
// (14-oct-2026: paso de todos a la regla v3 con tope ×1,1 y la cifra v2 al lado).
//
//   node herramientas/regenerar.mjs <carpeta> [<carpeta> …] | --todas  [--sin-pdf] [--simular]
//
// Versión: si el último datos es datos-vN.json y ya existe el Word «… vN.docx», se crea datos-v(N+1).json y el Word
// v(N+1); si no existe ese Word (la migración dejó datos-vN sin Word), se reutiliza N. Sin ninguna versión, datos.json y
// el Word sin sufijo. El nombre base del Word es el de los que ya hay en la carpeta («<Nombre> - <AAAA-MM-DD>»).
// El PDF se hace con LibreOffice (soffice --headless), con las imágenes a 150 ppp para que no pese; sin soffice, se avisa.
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, appendFileSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { calcularEmpresa } from '../motor/calcular-empresa.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const bandera = (k) => { const i = args.indexOf(k); if (i >= 0) args.splice(i, 1); return i >= 0; };
const todas = bandera('--todas'), sinPdf = bandera('--sin-pdf'), simular = bandera('--simular');
const hoy = new Date().toISOString().slice(0, 10);
const dirInformes = join(raiz, 'informes');
const esEmpresa = (c) => { const p = join(dirInformes, c, 'datos.json'); if (!existsSync(p)) return false; try { const d = JSON.parse(readFileSync(p, 'utf8')); return !!(d.identificacion && d.valoracion); } catch { return false; } };
const carpetas = todas ? readdirSync(dirInformes).filter((c) => statSync(join(dirInformes, c)).isDirectory() && esEmpresa(c)).sort() : args.map((a) => a.replace(/\/$/, '').replace(/^informes\//, ''));
if (!carpetas.length) throw new Error('Indica carpetas de informes/ o --todas');
const n = (v) => (v === null || v === undefined || Number.isNaN(+v) ? null : +v);
const f1 = (x) => (x === null || x === undefined ? 'n.d.' : (+x).toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 }));
const soffice = !sinPdf && spawnSync('sh', ['-c', 'command -v soffice'], { encoding: 'utf8' }).stdout.trim();
if (!sinPdf && !soffice) console.error('AVISO: sin soffice (LibreOffice): se hace el Word y no el PDF.');
const resumen = [];

for (const carpeta of carpetas) {
  const dir = join(dirInformes, carpeta);
  const archivos = readdirSync(dir);
  const datos = archivos.filter((a) => /^datos(-v\d+)?\.json$/.test(a)).sort((a, b) => (n(a.match(/v(\d+)/)?.[1]) ?? 1) - (n(b.match(/v(\d+)/)?.[1]) ?? 1));
  if (!datos.length) { console.error(`${carpeta}: sin datos.json`); continue; }
  const ultimo = datos.at(-1), K = n(ultimo.match(/v(\d+)/)?.[1]) ?? 1;
  const d = JSON.parse(readFileSync(join(dir, ultimo), 'utf8'));
  // Nombre base del Word: el de los que ya hay; si no, nombre y fecha de corte.
  const docx = archivos.map((a) => a.match(/^(.+ - \d{4}-\d{2}-\d{2})( v(\d+))?\.docx$/)).filter(Boolean);
  const base = docx.length ? docx[0][1] : `${d.identificacion?.nombre || carpeta} - ${d.meta?.fecha_corte || carpeta.slice(-10)}`;
  const nombreWord = (v) => (v <= 1 ? `${base}.docx` : `${base} v${v}.docx`);
  const N = existsSync(join(dir, nombreWord(K))) ? K + 1 : K;
  const archivoDatos = N <= 1 ? 'datos.json' : `datos-v${N}.json`;
  const salidaDocx = join(dir, nombreWord(N)), salidaPdf = salidaDocx.replace(/\.docx$/, '.pdf');
  if (simular) { console.log(`${carpeta}: ${ultimo} → ${archivoDatos} y «${nombreWord(N)}»`); continue; }
  // 1. Recalcular con el motor vigente.
  const antes = d.calc?.recomendacion?.objetivo_12m ? { s: d.calc.recomendacion.objetivo_12m.senal, r: d.calc.recomendacion.objetivo_12m.rentabilidad_ponderada_pct, v: d.calc.recomendacion.objetivo_12m.version } : null;
  const calculado = calcularEmpresa(d);
  calculado.meta = { ...(calculado.meta || {}), regenerado: hoy };
  writeFileSync(join(dir, archivoDatos), JSON.stringify(calculado, null, 2) + '\n');
  const o = calculado.calc?.recomendacion?.objetivo_12m;
  // 2. Word.
  const r1 = spawnSync(process.execPath, [join(raiz, 'motor/rellenar.mjs'), '--plantilla', join(raiz, 'verticales/empresa/plantilla.docx'), '--datos', join(dir, archivoDatos), '--salida', salidaDocx], { encoding: 'utf8' });
  if (r1.status !== 0) { console.error(`${carpeta}: rellenar falló: ${(r1.stderr || r1.stdout).slice(-400)}`); continue; }
  const avisos = (r1.stdout.match(/aviso/gi) || []).length;
  // 3. PDF (imágenes a 150 ppp).
  let pdf = 'sin PDF';
  if (soffice) {
    const filtro = 'pdf:writer_pdf_Export:{"ReduceImageResolution":{"type":"boolean","value":"true"},"MaxImageResolution":{"type":"long","value":"150"}}';
    let r2 = spawnSync(soffice, ['--headless', '--convert-to', filtro, '--outdir', dir, salidaDocx], { encoding: 'utf8', timeout: 180000 });
    if (!existsSync(salidaPdf)) r2 = spawnSync(soffice, ['--headless', '--convert-to', 'pdf', '--outdir', dir, salidaDocx], { encoding: 'utf8', timeout: 180000 });
    pdf = existsSync(salidaPdf) ? `PDF ${(statSync(salidaPdf).size / 1e6).toFixed(1)} MB` : `PDF falló: ${(r2.stderr || r2.stdout || '').slice(-200)}`;
  }
  // 4. Diario.
  const linea = `- ${hoy}: ${archivoDatos} y «${nombreWord(N)}» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: ${o ? `${o.version} ${o.senal} ${f1(o.rentabilidad_ponderada_pct)} %` : 'sin objetivo a 12 m'}${antes ? ` (antes ${antes.v || 'v2'} ${antes.s} ${f1(antes.r)} %)` : ''}.${o?.comparacion_txt ? ` ${o.comparacion_txt}` : ''}\n`;
  appendFileSync(join(dir, 'diario.md'), linea);
  const fila = `${carpeta}: ${archivoDatos}, «${nombreWord(N)}» (${avisos} avisos), ${pdf} → ${o ? `${o.version} ${o.senal} ${f1(o.rentabilidad_ponderada_pct)} %` : 'sin objetivo'}${antes ? ` (antes ${antes.s} ${f1(antes.r)} %)` : ''}`;
  console.log(fila); resumen.push(fila);
}
if (resumen.length > 1) console.log(`\n${resumen.length} informes regenerados.`);

// Aprendizaje automático sobre las noticias (15-oct-2026, a petición del usuario: «a medida que acumulemos señales,
// busquemos patrones, leads… machine learning con RSS»). Protocolo preregistrado en
// verticales/empresa/backtest/noticias-modelo-preregistro-2026-10-15.md: el modelo NO decide nada hasta pasar la
// validación fuera de muestra que allí se fija, y aun entonces solo ordena los leads; lo que llega al usuario sigue
// pasando el análisis completo y la compra robusta.
//
//   NODE_USE_ENV_PROXY=1 node herramientas/noticias-modelo.mjs --datos      tabla de entrenamiento (carpeta privada)
//   … --entrenar                                                           regresión logística con validación por meses
//   … --muestra                                                            cuánta muestra hay y cuánta falta
//
// Una fila = una noticia (empresa, día, categoría, gravedad, tono, nº de medios) + cómo venía el precio ese día (1 mes,
// distancia al máximo de 52 semanas y a la media de 200) → qué hizo después frente al índice (5, 20 y 60 sesiones), y si
// acabó en lead, en candidata del escáner o en compra. Los datos viven en la carpeta privada: nunca en el repo.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serie } from './movimiento.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const PRIV = process.env.CARTERA_REAL || '/mnt/project-files/cartera/real';
const P = `${PRIV}/escaner/`;
const DATOS = `${P}noticias-datos.jsonl`, MODELO = `${P}noticias-modelo.json`;
const leer = (p, d) => { try { return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : d; } catch { return d; } };
const tiene = (n) => process.argv.includes(n);
const r1 = (x) => (x == null || !Number.isFinite(x) ? null : Math.round(x * 10) / 10);
const enParalelo = async (lista, n, fn) => { const out = []; let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < lista.length) { const k = i++; out[k] = await fn(lista[k]); } })); return out; };

// Criterios fijados en el preregistro (no se tocan después de ver resultados).
const CRITERIO = { desdeVivo: '2026-11', minFilasTest: 2000, minEmpresas: 100, minMesesEntreno: 6, minPliegues: 2, auc: 0.55, excesoDecil: 2 };

// ------------------------------------------------------------------ datos
async function datos() {
  const dir = `${P}expedientes/`;
  const indice = leer(join(RAIZ, 'escaner/reglas.json'), {}).indice_referencia?.simbolo || 'IWDA.AS';
  const si = await serie(indice, { anios: 5 });
  if (si.error) throw new Error(`sin serie del índice ${indice}`);
  const leads = leer(`${P}leads-registro.json`, { leads: [] }).leads;
  const senales = leer(`${P}registro-senales.json`, { senales: [] }).senales;
  const compras = (leer(`${PRIV}/compras-y-ventas.json`, {}).posiciones || []).flatMap((p) => (p.compras || []).filter((c) => /compra/i.test(c.tipo || '')).map((c) => ({ clave: p.clave, fecha: c.fecha })));
  const archivos = readdirSync(dir).filter((f) => f.endsWith('.json') && !f.startsWith('sector-'));
  const filas = [];
  await enParalelo(archivos, 6, async (f) => {
    const e = leer(dir + f, null);
    if (!e?.simbolo || !e.noticias?.length) return;
    const s = await serie(e.simbolo, { anios: 5 });
    if (s.error) return;
    const pts = s.puntos;
    const iDe = (fecha) => { let i = pts.findIndex((p) => p[0] >= fecha); return i < 0 ? null : i; };
    const ri = (fecha, n) => { const a = si.puntos.findIndex((p) => p[0] >= fecha); return a < 0 || a + n >= si.puntos.length ? null : si.puntos[a + n][1] / si.puntos[a][1] - 1; };
    const vistas = new Set();
    for (const n of e.noticias) {
      if (n.categoria === 'otras' && n.gravedad === 'baja') continue;
      const clave = `${n.fecha}|${n.categoria}|${n.tono}`;
      if (vistas.has(clave)) continue;
      vistas.add(clave);
      const i = iDe(n.fecha);
      if (i === null || i < 252) continue;
      const c = pts.map((p) => p[1]);
      const m200 = c.slice(i - 199, i + 1).reduce((a, b) => a + b, 0) / 200, max52 = Math.max(...c.slice(i - 251, i + 1));
      const rel = (k) => { if (i + k >= pts.length) return null; const x = ri(pts[i][0], k); return x === null ? null : r1((c[i + k] / c[i] - 1 - x) * 100); };
      const cerca = (fs, d) => fs.some((x) => x.clave === e.clave && Math.abs(new Date(x.fecha) - new Date(n.fecha)) <= d * 864e5);
      filas.push({
        fecha: n.fecha, clave: e.clave, categoria: n.categoria, gravedad: n.gravedad, tono: n.tono, medios: (n.medios || []).length,
        var_1m: r1((c[i] / c[Math.max(0, i - 21)] - 1) * 100), dist_max52: r1((c[i] / max52 - 1) * 100), dist_m200: r1((c[i] / m200 - 1) * 100),
        rel_5: rel(5), rel_20: rel(20), rel_60: rel(60),
        lead: cerca(leads, 7), candidata: cerca(senales.filter((x) => x.tipo === 'COMPRA'), 30), compra: cerca(compras, 30),
      });
    }
  });
  filas.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  writeFileSync(DATOS, filas.map((x) => JSON.stringify(x)).join('\n') + '\n');
  return filas;
}
const cargar = () => (existsSync(DATOS) ? readFileSync(DATOS, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)) : []);

// ------------------------------------------------------------------ modelo
// Regresión logística con L2: ¿la noticia va seguida de batir al índice a 20 sesiones? Rasgos: categoría, tono y gravedad
// (uno contra todos), nº de medios y los tres del precio (estandarizados con la media y la desviación del entrenamiento).
function rasgos(filas) {
  const cats = [...new Set(filas.map((x) => x.categoria))].sort(), tonos = ['positivo', 'negativo', 'neutro'];
  const nombres = [...cats.map((c) => `cat:${c}`), ...tonos.map((t) => `tono:${t}`), 'alta', 'medios', 'var_1m', 'dist_max52', 'dist_m200'];
  const vec = (x) => [...cats.map((c) => +(x.categoria === c)), ...tonos.map((t) => +(x.tono === t)), +(x.gravedad === 'alta'), Math.log1p(x.medios), x.var_1m ?? 0, x.dist_max52 ?? 0, x.dist_m200 ?? 0];
  return { nombres, vec };
}
function ajustar(X, y, l2 = 1e-2, vueltas = 400, paso = 0.1) {
  const k = X[0].length, w = new Array(k + 1).fill(0);
  for (let v = 0; v < vueltas; v++) {
    const g = new Array(k + 1).fill(0);
    for (let i = 0; i < X.length; i++) {
      const z = w[k] + X[i].reduce((s, x, j) => s + x * w[j], 0), p = 1 / (1 + Math.exp(-z)), e = p - y[i];
      for (let j = 0; j < k; j++) g[j] += e * X[i][j];
      g[k] += e;
    }
    for (let j = 0; j <= k; j++) w[j] -= paso * (g[j] / X.length + (j < k ? l2 * w[j] : 0));
  }
  return w;
}
const prob = (w, x) => 1 / (1 + Math.exp(-(w[w.length - 1] + x.reduce((s, v, j) => s + v * w[j], 0))));
function auc(ps, ys) {
  const o = ps.map((p, i) => [p, ys[i]]).sort((a, b) => a[0] - b[0]);
  let rango = 0, pos = 0;
  o.forEach(([, y], i) => { if (y) { rango += i + 1; pos++; } });
  const neg = o.length - pos;
  return pos && neg ? (rango - (pos * (pos + 1)) / 2) / (pos * neg) : null;
}
const mediana = (xs) => { const o = xs.filter((x) => x != null).sort((a, b) => a - b); return o.length ? o[Math.floor(o.length / 2)] : null; };

function entrenar(filas) {
  const con = filas.filter((x) => x.rel_20 !== null);
  const { nombres, vec } = rasgos(con);
  const meses = [...new Set(con.map((x) => x.fecha.slice(0, 7)))].sort();
  const pliegues = [];
  // Validación por meses hacia delante: se entrena con lo que ya tenía su resultado (fecha + 30 días naturales antes del
  // mes de prueba, para que las 20 sesiones no se solapen) y se prueba en el mes siguiente.
  for (let m = CRITERIO.minMesesEntreno; m < meses.length; m++) {
    const ini = `${meses[m]}-01`, corte = new Date(new Date(ini) - 30 * 864e5).toISOString().slice(0, 10);
    const tr = con.filter((x) => x.fecha < corte), te = con.filter((x) => x.fecha.startsWith(meses[m]));
    if (tr.length < 200 || te.length < 50) continue;
    const med = nombres.map((_, j) => tr.reduce((s, x) => s + vec(x)[j], 0) / tr.length);
    const sd = nombres.map((_, j) => Math.sqrt(tr.reduce((s, x) => s + (vec(x)[j] - med[j]) ** 2, 0) / tr.length) || 1);
    const z = (x) => vec(x).map((v, j) => (v - med[j]) / sd[j]);
    const w = ajustar(tr.map(z), tr.map((x) => +(x.rel_20 > 0)));
    const ps = te.map((x) => prob(w, z(x)));
    const corteDecil = [...ps].sort((a, b) => b - a)[Math.floor(ps.length / 10)];
    const top = te.filter((_, i) => ps[i] >= corteDecil);
    pliegues.push({ mes: meses[m], entreno: tr.length, prueba: te.length, auc: auc(ps, te.map((x) => +(x.rel_20 > 0))), exceso_decil: r1((mediana(top.map((x) => x.rel_20)) ?? 0) - (mediana(te.map((x) => x.rel_20)) ?? 0)) });
  }
  // Solo cuentan los meses de prueba «en vivo» (datos recogidos cada día desde el 16-oct-2026): el histórico de Google
  // Noticias sirve para entrenar y para explorar, pero tiene sesgo (Google guarda lo que guarda) y las reglas de
  // clasificación se afinaron mirando octubre de 2026.
  const vivos = pliegues.filter((p) => p.mes >= CRITERIO.desdeVivo);
  const filasTest = vivos.reduce((s, p) => s + p.prueba, 0), empresas = new Set(con.map((x) => x.clave)).size;
  const ultimos = vivos.slice(-CRITERIO.minPliegues);
  const apto = filasTest >= CRITERIO.minFilasTest && empresas >= CRITERIO.minEmpresas && ultimos.length === CRITERIO.minPliegues &&
    ultimos.every((p) => p.auc >= CRITERIO.auc && p.exceso_decil >= CRITERIO.excesoDecil);
  return { fecha: new Date().toISOString().slice(0, 10), filas: con.length, empresas, filas_prueba: filasTest, pliegues, criterio: CRITERIO, apto, nota: apto ? 'Pasa la validación: puede ORDENAR los leads si el usuario lo aprueba; no decide compras.' : 'No pasa (o no hay muestra): los leads siguen saliendo solo de las reglas explícitas.' };
}

function muestra(filas) {
  const con = filas.filter((x) => x.rel_20 !== null);
  const meses = [...new Set(con.map((x) => x.fecha.slice(0, 7)))].sort();
  const porMes = meses.length ? con.length / meses.length : 0;
  const vivos = meses.filter((m) => m >= CRITERIO.desdeVivo).length;
  const faltanMeses = Math.max(CRITERIO.minMesesEntreno - meses.filter((m) => m < CRITERIO.desdeVivo).length, 0) + Math.max(CRITERIO.minPliegues - vivos, 0);
  return [
    `Filas: ${filas.length} (con resultado a 20 sesiones: ${con.length}); empresas: ${new Set(con.map((x) => x.clave)).size}; meses con datos: ${meses.length} (${meses[0] || '—'} a ${meses.at(-1) || '—'}); ${Math.round(porMes)} filas por mes.`,
    `Mínimos del preregistro: ${CRITERIO.minMesesEntreno} meses para entrenar + ${CRITERIO.minPliegues} meses de prueba en vivo (desde ${CRITERIO.desdeVivo}), ${CRITERIO.minFilasTest} filas de prueba y ${CRITERIO.minEmpresas} empresas.`,
    faltanMeses ? `Faltan al menos ${faltanMeses} meses de datos con resultado (más las 20 sesiones de espera del último).` : 'Hay meses suficientes: la validación decide.',
    `Leads registrados: ${filas.filter((x) => x.lead).length}; candidatas: ${filas.filter((x) => x.candidata).length}; compras: ${filas.filter((x) => x.compra).length}.`,
  ].join('\n');
}

let filas = cargar();
if (tiene('--datos')) { filas = await datos(); console.log(`Tabla: ${filas.length} filas → ${DATOS}`); }
if (tiene('--muestra') || tiene('--datos')) console.log(muestra(filas));
if (tiene('--entrenar')) {
  const res = entrenar(filas);
  writeFileSync(MODELO, JSON.stringify(res, null, 1) + '\n');
  console.log(`Modelo: ${res.filas} filas, ${res.empresas} empresas, ${res.pliegues.length} meses de prueba (${res.filas_prueba} filas). ${res.nota}`);
  for (const p of res.pliegues) console.log(`- ${p.mes}: entreno ${p.entreno}, prueba ${p.prueba}, AUC ${p.auc?.toFixed(3)}, decil alto ${p.exceso_decil} puntos sobre la mediana`);
}

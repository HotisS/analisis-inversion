import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const a = JSON.parse(fs.readFileSync(path.join(dir, 'A.json'), 'utf8'));
const r = JSON.parse(fs.readFileSync(path.join(dir, 'A-resto.json'), 'utf8'));
r.capital.comentario = r.capital.comentario.replace('6.473 M', '6.423 M').replace('31.394 M', '27.594 M');
a.negocio = r.negocio;
a.trimestres.ultima_presentacion = r.trimestres_ultima_presentacion + ' Bases de la tabla: 3T24 y 4T24 son cifras publicadas con Mobility (4T24 derivado del año menos nueve meses) [6]; 1T25-2T26 son pro forma sin Mobility [1-3]; el crecimiento de 1T25-4T25 es el publicado con Mobility, y el de 1T26-2T26, pro forma frente a pro forma; EBITDA = beneficio operativo + depreciación + amortización, con las ganancias por ventas dentro (175 M en 1T26 y 270 M en 4T25).';
a.trimestres.items.find(x => x.periodo === '1T26').vs_consenso = 'Superior';
a.trimestres.comentario_fuente = undefined;
Object.assign(a.balance, r.balance_extra);
a.flujos.comentario = r.flujos_comentario;
a.calidad = r.calidad;
a.capital = r.capital;
a.rentabilidad = null;
a.fuentes.push(...r.fuentes_extra);
a.huecos = [
  { seccion: 'balance', campo: 'rating (nota y perspectiva)', tipo: 'Complemento', intentos: '1) 10-Q 2T26 y folleto 424B3 de jul-2026: solo nombran a Moody\'s y Fitch como agencias, sin nota; 2) búsqueda web de notas de Moody\'s/Fitch sobre S&P Global y Mobility Global 2026: sin resultado; 3) 10-K 2025 y resto de documentos descargados (grep «Moody», «Fitch»): sin nota', decision: 'Omitido (se dice solo que es grado de inversión calificado por Moody\'s y Fitch)' },
  { seccion: 'trimestres', campo: 'vs_consenso de 3T24-4T25 y 2T26', tipo: 'Complemento', intentos: '1) notas de resultados y 10-Q: no publican consenso; 2) búsqueda web de transcripciones (AllMind, GuruFocus 403, Bullfincher sin texto): solo el 1T26 (Insider Monkey, BPA ajustado 4,97 frente a 4,84); 3) la dirección dice que el 2T26 superó lo esperado en ingresos, pero sin cifra de consenso', decision: 'Omitido salvo 1T26' },
  { seccion: 'trimestres', campo: 'pro forma sin Mobility de 3T24 y 4T24 y crecimientos interanuales pro forma de 2025', tipo: 'Complemento', intentos: '1) 8-K/A ex99-1 y ex99-2: solo dan trimestres de 2025 y 1T26 y años 2023-2025; 2) nota de resultados 2T26: solo 2T25 y 1S25; 3) derivar 2024 trimestral sin Mobility: no hay desglose trimestral de Mobility de 2024 en lo leído', decision: '3T24-4T24 con cifras publicadas (con Mobility) y crecimientos de 1T25-4T25 publicados (con Mobility); 1T26 y 2T26 pro forma frente a pro forma' },
  { seccion: 'negocio', campo: 'segmentos reexpresados de 2019-2024', tipo: 'Núcleo', intentos: '1) 8-K/A ex99-1: reexpresa solo los cuatro trimestres de 2025 y 1T26; 2) 10-Q 2T26 y nota de 2T26: solo 2T25/1S25; 3) 10-K 2025: segmentación anterior con Mobility y sin las transferencias de 451 Research y Maritime & Trade', decision: 'Omitido: solo 2025 con la segmentación vigente' },
  { seccion: 'negocio', campo: 'geografias_criterio y geografías sin Mobility', tipo: 'Complemento', intentos: '1) nota de segmentos del 10-K 2025: no dice si es por cliente o por origen; 2) pro forma ex99-1/ex99-2: sin desglose geográfico; 3) 10-Q 2T26: sin desglose geográfico', decision: 'Geografías de 2025 con Mobility; criterio en null' },
  { seccion: 'flujos', campo: 'desinversiones 2019', tipo: 'Complemento', intentos: '1) XBRL companyfacts: sin etiqueta para 2019; 2) 10-K 2022: el estado de flujos empieza en 2020; 3) no se descargó el 10-K 2020/2021 por presupuesto', decision: 'Omitido (null)' },
  { seccion: 'capital', campo: 'importes de Visible Alpha, ProntoNLP y TeraHelix; múltiplos pagados', tipo: 'Complemento', intentos: '1) 10-K 2025, nota 2: no publica precio (no materiales); 2) 10-K 2022 para IHS: contraprestación sin múltiplo; 3) no se buscó en prensa por presupuesto', decision: 'Omitido' },
  { seccion: 'capital', campo: 'política de retorno en % del flujo libre ajustado', tipo: 'Complemento', intentos: '1) 10-K 2025 y 10-Q 2T26: solo «targeted capital return», sin porcentaje; 2) transcripción del 2T26 (AllMind): no lo cita; 3) nota de resultados 2T26: solo recompras de más de 7.000 M', decision: 'Omitido' },
  { seccion: 'trimestres', campo: 'transcripción completa del 1T26', tipo: 'Complemento', intentos: '1) web de inversores (no descargable sin navegador); 2) Insider Monkey: solo el inicio; 3) AllMind: sin página del 1T26', decision: 'Resumen del 1T26 limitado al BPA frente a lo esperado' }
];
delete a._estado;
a.trimestres.items.forEach(x => {});
const orden = ['negocio','financieros','trimestres','balance','flujos','calidad','rentabilidad','capital','fuentes','huecos'];
const out = {};
for (const k of orden) out[k] = a[k];
fs.writeFileSync(path.join(dir, 'A.json'), JSON.stringify(out, null, 2) + '\n');
console.log('ok', Object.keys(out));

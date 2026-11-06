// Actualiza C.json (del 28-oct) con la guía revisada del 5-nov-2026 y las presentaciones de EDGAR hasta el 6-nov.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const origen = path.join(dir, 'C-28oct.json');
if (!fs.existsSync(origen)) fs.copyFileSync(path.join(dir, 'C.json'), origen);
const c = JSON.parse(fs.readFileSync(origen, 'utf8'));

c.fuentes.push(
  { id: 25, titulo: 'Nota de prensa de resultados del 3T 2026 y guía de 2026 revisada (8-K, anexo 99.1)', editor: 'Zoetis Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-05', url: 'https://www.sec.gov/Archives/edgar/data/1555280/000155528026000048/exhibit99q32026.htm' },
  { id: 27, titulo: 'Informe trimestral 10-Q del 3T 2026 (balance y portada: acciones en circulación y autocartera)', editor: 'Zoetis Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-05', url: 'https://www.sec.gov/Archives/edgar/data/1555280/000155528026000050/zts-20260930.htm' },
  { id: 26, titulo: 'Form 4 de consejeros y directivos de Zoetis, 6-nov-2025 a 6-nov-2026 (109 presentaciones; herramienta form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-06', url: 'https://data.sec.gov/submissions/CIK0001555280.json' },
);

const g = c.directivos.historial_guidance.find((x) => x.anio === '2026');
g.real = 'Agosto: rebajada a 9.120-9.320 M USD (orgánico −3 % a −1 %) y BPA ajustado de 6,15-6,25 USD [14]. Noviembre: ventas estrechadas a 9.220-9.320 M (orgánico −2 % a −1 %), BPA ajustado subido a 6,25-6,35 USD y contable bajado a 5,50-5,60 USD por deterioros [25]. Frente a febrero, −6,6 % de ventas y −11 % de BPA ajustado en el punto medio';
g.cumplida = 'No';

c.directivos.comentario = 'La dirección cumplió o superó su guía en 2021, 2024 y 2025 y falló por divisa en 2022, pero 2026 rompe ese historial: dos rebajas (mayo y agosto) llevaron el BPA ajustado de 7,00-7,10 a 6,15-6,25 USD y el orgánico de +3/+5 % a −3/−1 % [12-14]. En noviembre no hubo tercera rebaja: la guía de ventas se estrecha hacia arriba (9.220-9.320 M) y la del BPA ajustado sube a 6,25-6,35 USD, aunque la contable baja a 5,50-5,60 USD por 89 M de deterioros [25]. El problema sigue siendo el negocio de mascotas en EE. UU. El equipo pierde estabilidad: cambian el director financiero (agosto de 2026) y el de I+D (enero de 2026), y el nuevo financiero, Jay Saccaro, asume además las operaciones; en su primera conferencia anunció que revisará qué métricas de guía publica [1, 5, 25]. Peck lleva casi siete años al frente; no hay candidato público a la sucesión y el cargo doble de Saccaro lo convierte en uno de hecho [1].';

// Directivos: sin compras ni ventas en mercado nuevas desde el informe anterior (form4.mjs, 6-nov) [26].
c.gobierno.insiders_sin_operaciones = false;
const acc = c.gobierno.accionistas.find((x) => /utocartera/i.test(x.nombre));
if (acc) { acc.variacion = '94,40 M de acciones a 30-sep-2026 frente a 76,96 M a 31-dic-2025, por las recompras; quedan 407,49 M en circulación (406,32 M el 30-oct) [27]'; acc.pct = 18.81; }
fs.writeFileSync(path.join(dir, 'C.json'), JSON.stringify(c, null, 2));
console.log('C.json actualizado');

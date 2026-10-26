// Nota A (cuentas) de la iteración del 26-oct-2026: parte de la nota A del informe del 7-oct
// (informes/fanuc-2026-10-07/notas/A.json, cuentas anuales FY2016-FY2025 ya comprobadas) y añade lo
// publicado el 23-oct-2026: Tanshin semestral y presentación del 1S FY2026. Fuentes nuevas: 26-29.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const aqui = dirname(fileURLToPath(import.meta.url));
const A = JSON.parse(readFileSync(join(aqui, '../../fanuc-2026-10-07/notas/A.json'), 'utf8'));

// ---------- Fuentes nuevas ----------
A.fuentes.push(
  { id: 26, titulo: 'Consolidated Interim Financial Results for the six months ended September 30, 2026 (Kessan Tanshin 1S FY2026)', editor: 'FANUC Corporation', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://www.fanuc.co.jp/en/ir/announce/pdf/2026/financialresult202609_e.pdf' },
  { id: 27, titulo: 'Financial Results for the Six Months Ended September 30, 2026 (presentación de resultados 1S FY2026)', editor: 'FANUC Corporation', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://www.fanuc.co.jp/en/ir/announce/pdf/2026/reference202609_e.pdf' },
  { id: 28, titulo: 'ファナック---反発、通期業績上方修正で部材調達問題への懸念も後退 (Fisco)', editor: 'Kabutan / Fisco', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://kabutan.jp/stock/news?code=6954&b=n202610260313' },
  { id: 29, titulo: 'ファナック、通期純利益予想を15.3%上方修正、最大500億円の自社株買い・中間増配も', editor: 'Nihon Inter (media-ir.com)', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://www.media-ir.com/news/?p=186039' },
);

// ---------- Trimestres: últimos 8 (3T FY24 a 2T FY26) ----------
const it = A.trimestres.items.filter(x => x.periodo !== '2T FY24');
it.push({ periodo: '2T FY26', ingresos: 242673, crecimiento_pct: 14.9, crecimiento_organico_pct: null, ebitda: 75135, margen_ebitda_pct: 31.0, bpa: 66.27, vs_consenso: 'Superior' });
A.trimestres.items = it;
A.trimestres.ultima_presentacion = `Del 1T al 2T FY26 el discurso pasó de la oferta a la demanda. En la conferencia del 31-jul-2026 la dirección explicó que parte del salto de los pedidos de FA (+63,8 %) eran clientes que pedían antes por los plazos de entrega, admitió que en China algunos clientes se iban a la competencia por esos plazos (sin concluir que perdiera cuota), justificó que el beneficio creciera menos que las ventas por el coste de los componentes, el desfase en trasladarlo a precios y los aranceles de EE. UU., y anunció más capacidad para FA [21]. El mercado leyó un problema de aprovisionamiento de componentes y la acción cayó un 14,3 % en un día [28]. El 23-oct-2026 los números contestaron a esa duda: margen operativo del 26,0 % en el 2T (23,2 % en el 1T), con un coste de ventas plano frente al 1T con un 5 % más de ventas, y pedidos récord de 306,0 mil M (+49,0 %; FA +130,1 % y ROBOMACHINE +72,3 %) [26, 27]. La guía sube por segunda vez (ventas 1,01 billones; BE 240.700 M) y la prensa recoge que se aleja el temor por los componentes [28]. Lo que la presentación no explica: la caída del 14,3 % de las ventas de robots en China en el 2T y por qué la guía del 2S supone un margen del 23,0 %, por debajo del 24,6 % del 1S, con el yen a 150 [27, 29]. El resumen de preguntas y respuestas de la conferencia del 23-oct no estaba publicado a la fecha de corte. Las cifras de cada trimestre salen de restar los acumulados de los Tanshin; el 2T FY26 supera en unos 7.000 M de BE al consenso de mercado previo [26, 28].`;

// ---------- LTM a 30-sep-2026 (FY2025 + 1S FY26 − 1S FY25) ----------
A.financieros.ltm = {
  periodo: 'LTM sep-26', fecha_fin: '2026-09-30',
  ingresos: 923971, ebitda: 262789, ebit: 214461, beneficio_neto: 199299, bpa: 213.83,
  dpa: 128.30, dpa_extraordinario: 0, fcf: 251203,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
};
A.financieros.comentario = A.financieros.comentario.replace(
  /El 1T FY26 sube al 23,2 %[^]*$/,
  `El 1S FY26 sube al 24,6 % (ventas +16,2 %; 26,0 % en el 2T) y el 23-oct-2026 la empresa elevó por segunda vez la guía de FY2026: ventas de 1.013.700 M (+18,2 %, primera vez por encima del billón) y resultado operativo de 240.700 M (23,7 %), con el yen a 150 por dólar en el 2S [26, 27]. Los últimos doce meses a septiembre suman 923.971 M de ventas y un margen EBIT del 23,2 % [1, 13, 26].`);
A.financieros.ajustes = A.financieros.ajustes.replace('y 11.371 M solo en el 1T FY26 [1, 11].', 'y 22.977 M en el 1S FY26 (+56 % sobre los 14.725 M del 1S FY25) [1, 26].');

// ---------- Balance y flujos (anuales sin cambios; textos con el 30-sep-2026) ----------
A.balance.liquidez = `Sin deuda financiera. A 31-mar-2026: caja y depósitos 718.071 M JPY y valores negociables a corto 35.800 M, en total 753.871 M (en \`caja\`) [1]. A 30-sep-2026: 746.285 M + 40.800 M = 787.085 M, ya después de pagar los 50.011 M de la recompra de julio-septiembre y 52.018 M de dividendos [26]; de ellos, 551.185 M son efectivo y equivalentes y el resto depósitos a más de tres meses. Aparte, inversiones a largo plazo (investment securities) de 242.860 M a sep-26 (223.287 M a mar-26): las participadas por puesta en equivalencia (167.210 M a mar-26) y acciones y otros valores [1, 25, 26]. No publica líneas de crédito.`;
A.balance.otros_pasivos = A.balance.otros_pasivos
  .replace('Pasivo neto por prestaciones definidas: 20.191 M JPY a mar-26 (31.208 M a mar-25), con un activo de 1.310 M;', 'Pasivo neto por prestaciones definidas: 20.191 M JPY a mar-26 (31.208 M a mar-25) y 19.386 M a sep-26, con un activo de 1.310 M a mar-26;')
  .replace('Autocartera de 49,1 M de acciones a jun-26;', 'Autocartera de 57,4 M de acciones a sep-26 (49,2 M a mar-26), tras comprar 8,27 M entre julio y septiembre;');
A.balance.otros_pasivos = A.balance.otros_pasivos.replace('[1, 11].', '[1, 26].');
A.balance.comentario += ` En el 1S FY26 las existencias subieron 8.526 M hasta 300.712 M y los clientes bajaron a 162.142 M, mientras los proveedores pasaron de 46.262 M a 56.132 M: el circulante comercial queda en el 44,0 % de las ventas de los últimos doce meses, frente al 48,6 % de FY2025 [26].`;
A.flujos.comentario = A.flujos.comentario.replace(
  'La empresa anticipa más inversión para FA en FY2026 (7.400 M en el 1T) [18, 21].',
  'La empresa anticipa más inversión para FA: el capex del 1S FY26 fue de 16.603 M, frente a 10.151 M un año antes [21, 26]. En el 1S FY26 el flujo operativo fue de 155.858 M (+21,8 %) y el flujo libre, de 139.255 M; en los últimos doce meses, 251.203 M (1,26 veces el beneficio) [26].');

// ---------- Capital ----------
A.capital.politica = A.capital.politica.replace(
  'La anterior, también de hasta 50.000 M, se ejecutó solo por 553 M [1, 22].',
  'Esta se completó entre julio y el 17-sep-2026 (8.268.900 acciones por 50.011 M) [26]; la anterior, también de hasta 50.000 M, se ejecutó solo por 553 M [1, 22]. El 23-oct-2026 aprobó otra de hasta 10 M de acciones (1,08 %) o 50.000 M, del 26-oct-2026 al 30-abr-2027, en el mercado [26]. Dividendo a cuenta de FY2026: 72,54 JPY (51,33 un año antes) [26].');

// ---------- Negocio: KPI con el 1S FY26 ----------
const k = A.negocio.kpis;
const kp = n => k.find(x => x.kpi === n);
Object.assign(kp('Pedidos del 1T (abr-jun)'), { kpi: 'Pedidos del 1S (abr-sep)', valor_anterior: '411,2 mil M JPY (1S FY25)', valor_actual: '587,9 mil M JPY (1S FY26)', variacion: '+43,0 %', comentario: 'Pedidos de 281,9 mil M en el 1T y 306,0 mil M en el 2T (récord trimestral; +49,0 %); book-to-bill de 1,26 en el 2T (306,0/242,7) [18, 27]. La dirección atribuyó en julio parte del alza a pedidos adelantados por los plazos de entrega [21].' });
Object.assign(kp('Pedidos FA'), { valor_actual: '229,6 mil M (FY2025); 90,2 y 112,2 mil M (1T y 2T FY26)', variacion: '+13,6 % anual; +63,8 % y +130,1 % en el 1T y el 2T', comentario: 'China (centros de datos de IA, semiconductores, piezas de humanoides, vehículo eléctrico), Japón, Corea, Taiwán e India [18, 27].' });
Object.assign(kp('Pedidos ROBOT'), { valor_actual: '381,8 mil M (FY2025); 97,9 y 103,4 mil M (1T y 2T FY26)', variacion: '+20,3 % anual; +8,1 % y +12,6 % en el 1T y el 2T', comentario: 'Américas (inversión en automatización ligada a la IA y repunte del automóvil) y China; las ventas de robots en China cayeron un 14,3 % en el 2T [27].' });
Object.assign(kp('Pedidos ROBOMACHINE'), { valor_actual: '133,3 mil M (FY2025); 57,6 y 51,2 mil M (1T y 2T FY26)', variacion: '-7,4 % anual; +98,3 % y +72,3 % en el 1T y el 2T', comentario: 'ROBODRILL y ROBOSHOT para piezas de servidores de IA y 3C, sobre todo en China [18, 27].' });
Object.assign(kp('Existencias al cierre'), { valor_actual: '300,7 mil M JPY (sep-26)', variacion: '-14,2 % desde el máximo', comentario: '292,2 mil M a mar-26; suben 8.526 M en el 1S con los pedidos récord [1, 26].' });
k.push({ kpi: 'Margen operativo trimestral', valor_anterior: '20,6 % (2T FY25)', valor_actual: '26,0 % (2T FY26)', variacion: '+5,4 puntos', comentario: 'Coste de ventas plano frente al 1T con un 5,0 % más de ventas; 23,2 % en el 1T FY26 [27].' });

// ---------- Huecos ----------
A.huecos = A.huecos.filter(h => !(h.seccion === 'financieros' && h.campo === 'ltm.fcf'));
A.huecos.push({ seccion: 'trimestres', campo: 'Resumen de preguntas y respuestas de la conferencia del 23-oct-2026', tipo: 'Complemento', intentos: '1) Web de inversores de Fanuc (announce): solo Tanshin y presentación del 1S; 2) la URL con el patrón de los anteriores (qasummary202609_e.pdf) da 404; 3) prensa japonesa del 23 al 26-oct (Kabutan, Minkabu, Nihon Inter, Business+IT): resume las cifras, no la conferencia', decision: 'Omitido; se usa la conferencia del 31-jul y lo que dicen las cifras' });
A.huecos = A.huecos.map(h => h.campo === 'items[].vs_consenso' ? { ...h, intentos: '1) Presentaciones y Q&A: no citan consenso; 2) web de inversores: no publica consenso (QUICK e IFIS son de pago); 3) prensa: solo para el 2T FY26 (Fisco: BE unos 7.000 M sobre el consenso)', decision: 'Solo el 2T FY26; el resto omitido' } : h);

// Notas de trabajo heredadas que se imprimían (nombres de campo entre comillas invertidas): a texto llano.
const llano = { '`ebit`': 'El EBIT', '`ebitda`': 'el EBITDA', '`resultado_financiero`': 'El resultado financiero', '(`participadas_en_ebitda` = null)': '(no se suman al EBITDA)', ' (en `caja`)': '', 'por lo que `arrendamientos` = 0': 'por lo que los arrendamientos son cero' };
const limpia = (t) => { for (const [a, b] of Object.entries(llano)) t = t.split(a).join(b); return t.replace('El EBIT es el operating income; el EBITDA', 'El EBIT es el beneficio de explotación (operating income); el EBITDA'); };
A.financieros.ajustes = limpia(A.financieros.ajustes); A.balance.liquidez = limpia(A.balance.liquidez); A.balance.otros_pasivos = limpia(A.balance.otros_pasivos);
for (const h of A.huecos) if (typeof h.intentos === 'string') h.intentos = h.intentos.replace('con las cuentas del subagente A', 'con las cuentas del informe');
writeFileSync(join(aqui, 'A.json'), JSON.stringify(A, null, 1));
console.log('A.json', A.trimestres.items.length, 'trimestres; fuentes', A.fuentes.length);

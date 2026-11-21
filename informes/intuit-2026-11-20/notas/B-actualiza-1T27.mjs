// Actualización de la nota B tras el 1T FY27 (19-nov-2026). Ejecutar una vez desde la raíz del repo.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const ruta = join(dir, 'B.json');
const b = JSON.parse(readFileSync(ruta, 'utf8'));
if (b.fuentes.some((f) => f.id === 25)) { console.log('Ya actualizada'); process.exit(0); }

const EDGAR = 'https://www.sec.gov/Archives/edgar/data/896878';
b.fuentes.push(
  { id: 25, titulo: 'Intuit Inc. Form 10-Q, 1T del ejercicio fiscal 2027 (cerrado el 31-oct-2026)', editor: 'Intuit / SEC', tipo: 'Primaria', fecha: '2026-11-19', url: `${EDGAR}/000089687826000045/intu-20261031.htm` },
  { id: 26, titulo: 'Intuit Reports First-Quarter Results and Enters Agreement to Sell Mailchimp to Bending Spoons (8-K, anexo 99.01)', editor: 'Intuit / SEC', tipo: 'Primaria', fecha: '2026-11-19', url: `${EDGAR}/000089687826000043/fy27q1earningspressrelease.htm` },
  { id: 27, titulo: 'Form 8-K: Equity and Asset Purchase Agreement con Bending Spoons US Inc. (Item 1.01)', editor: 'Intuit / SEC', tipo: 'Primaria', fecha: '2026-11-19', url: `${EDGAR}/000119312526468834/d182669d8k.htm` },
  { id: 28, titulo: 'Intuit (INTU) Q1 2027 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Primaria', fecha: '2026-11-20', url: 'https://www.fool.com/earnings/call-transcripts/2026/11/20/intuit-intu-q1-2027-earnings-call-transcript/' },
  { id: 29, titulo: 'Xero upgrades FY27 outlook amid strong first-half performance', editor: 'ARN', tipo: 'Prensa', fecha: '2026-11-12', url: 'https://www.arnnet.com.au/article/4248176/xero-upgrades-fy27-outlook-amid-strong-first-half-performance-2.html' },
  { id: 30, titulo: 'H&R Block Reports Fiscal 2027 First Quarter Results and Reaffirms Fiscal 2027 Outlook', editor: 'H&R Block / GlobeNewswire', tipo: 'Primaria', fecha: '2026-11-09', url: 'https://www.globenewswire.com/news-release/2026/11/09/3398946/0/en/h-r-block-reports-fiscal-2027-first-quarter-results-and-reaffirms-fiscal-2027-outlook.html' },
  { id: 31, titulo: 'Earnings call transcript: Intuit tops Q1 2027 estimates but shares fall', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-11-19', url: 'https://www.investing.com/news/transcripts/earnings-call-transcript-intuit-tops-q1-2027-estimates-but-shares-fall-93CH-5040262' },
);

// historia
b.historia.resumen = b.historia.resumen.replace(
  'y en el FY2026 superó los 21.000 M USD de ingresos [4].',
  'y en el FY2026 superó los 21.000 M USD de ingresos [4]. El 19 de noviembre de 2026 acordó vender Mailchimp a Bending Spoons por unos 3.680 M USD (3.310 M en efectivo y 368 M en acciones del comprador), menos de un tercio de lo que pagó en 2021; el cierre se espera a comienzos de 2027 y el efectivo irá a recompras [26, 27].',
);
b.historia.hitos.push({
  anio: '2026',
  hito: 'Acuerdo de venta de Mailchimp a Bending Spoons (19 de noviembre) por unos 3.680 M USD: 3.310 M en efectivo y 368 M en 8,8 M de acciones nuevas de la matriz italiana; Intuit la había comprado en 2021 por 12.000 M. Cierre previsto a comienzos de 2027, pendiente de autorizaciones de competencia; el efectivo irá a recompras en el FY2027 [2, 26, 27].',
});

// sector
b.sector.regulacion = b.sector.regulacion.replace(
  'El 20 de marzo de 2026 el Quinto Circuito anuló la orden de la FTC sobre la publicidad de TurboTax «gratis» [1].',
  'El 20 de marzo de 2026 el Quinto Circuito anuló la orden de la FTC sobre la publicidad de TurboTax «gratis» [1]; el 15 de septiembre de 2026 un tribunal federal de California archivó por falta de objeto la demanda restante de la FTC, con lo que el caso queda cerrado [25]. En el 10-Q del 1T FY2027 Intuit sigue señalando que los defensores de Direct File continúan pidiendo su vuelta y que Free File podría crecer con más apoyo público [25].',
);
b.sector.tendencias += ' Desde el 28 de octubre ha aparecido un cuarto efecto: el descubrimiento de productos financieros se traslada a los modelos de lenguaje. Intuit atribuyó a ello, junto con los tipos de interés, la caída de Credit Karma por debajo de sus planes, porque menos del 1 % de su tráfico venía de buscadores y no aparecía en esas herramientas; TurboTax y QuickBooks, en cambio, figuran entre las primeras respuestas y ya están integrados en ChatGPT y Claude mediante conectores MCP [28]. En pymes, Xero elevó su previsión de ingresos del FY2027 a 3.770-3.830 M NZD tras crecer un 46 % en el semestre con Melio (ingresos en EE. UU. de 365 M NZD) [29].';

// competencia
b.competencia.amenazas += ' Novedades del 1T FY2027: la dirección prevé que los ingresos de TurboTax caigan en el 2T porque los clientes sensibles al precio eligen ofertas gratuitas antes en la campaña, y responde con Credit Karma Tax (federal gratis y estatal a 15 USD; el 70 % de los usuarios de la prueba eran nuevos para Intuit) y con Sign and File a precio «disruptivo» para el segmento asistido [28]. Es decir, Intuit compite ahora en precio para recuperar cuota de declaraciones electrónicas, lo que baja el ingreso medio por cliente del FY2027 [28]. Credit Karma recorta su guía de crecimiento al 3-7 % (antes 11-13 %) por los tipos y por el paso de la búsqueda a los modelos de lenguaje [4, 26, 28].';
for (const c of b.competencia.competidores) {
  if (c.nombre === 'H&R Block') c.comentario += ' En el 1T FY2027 (julio-septiembre, trimestre de temporada baja) ingresó 224,3 M USD (+10,2 %) y reafirmó su previsión de 4.110-4.160 M USD para el ejercicio [30].';
  if (c.nombre === 'Xero') c.comentario += ' En el 1S FY2027 (abril-septiembre de 2026) ingresó 1.745 M NZD (+46 %, con Melio), llegó a 5,146 millones de clientes y elevó la previsión anual a 3.770-3.830 M NZD; Melio sigue en pérdidas [29].';
}

// esg (solo lo nuevo)
b.esg.controversias = b.esg.controversias.replace(
  'y petición de archivo el 31-ago-2026 [1].',
  'y demanda restante archivada el 15-sep-2026 [1, 25].',
).replace(
  'Intuit no puede estimar la pérdida posible [1].',
  'En septiembre de 2026 se añadieron dos demandas derivadas de accionistas contra consejeros y directivos actuales y antiguos [25]. Intuit no puede estimar la pérdida posible [1, 25].',
);

b.huecos.push({
  seccion: 'competencia',
  campo: 'Sage Group: cuentas del FY2026 (cerrado el 30-sep-2026)',
  tipo: 'Complemento',
  intentos: '1) PDF de resultados en sage.com: HTTP 403; 2) RNS en Investegate: solo un resumen automático sin tabla; 3) ADVFN: no abre',
  decision: 'Omitido: se mantiene la fila con el FY2025',
});
b._estado = {
  terminado: '2026-11-20',
  resumen: 'Actualizada tras el 1T FY27: venta de Mailchimp a Bending Spoons (3.680 M USD, 368 M en acciones) como hito; FTC archivada (15-sep-2026); en la conferencia, TurboTax compite en precio (Credit Karma Tax gratis, Sign and File) y prevé ingresos del 2T a la baja; Credit Karma recorta guía a +3-7 % por tipos y por la búsqueda en modelos de lenguaje; Xero eleva previsión con Melio; H&R Block reafirma. Sin novedades de Direct File. Notas previas del 28-oct comprobadas y mantenidas.',
};
writeFileSync(ruta, JSON.stringify(b, null, 2) + '\n');
console.log('B.json actualizado:', b.fuentes.length, 'fuentes');

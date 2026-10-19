// actualizar-notas.mjs — DSV, iteración del 19-oct-2026.
// Parte de las notas A-D del análisis del 7-oct (copiadas tal cual) y cambia SOLO lo que se ha vuelto a comprobar a
// la nueva fecha de corte: no hay resultados nuevos desde el 1S26 (22-jul; el 3T26 sale el 21-oct), ni anuncios de
// la empresa desde el 5-oct (lista de MFN del 19-oct), así que las cuentas, el gobierno y el sector no cambian salvo
// los datos de mercado. Se ejecuta una sola vez sobre las copias: node informes/dsv-2026-10-19/notas/actualizar-notas.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const leer = (n) => JSON.parse(readFileSync(join(dir, n), 'utf8'));
const escribir = (n, o) => writeFileSync(join(dir, n), JSON.stringify(o, null, 2) + '\n');
const fuente = (nota, id) => {
  const f = nota.fuentes.find((x) => x.id === id);
  if (!f) throw new Error(`Falta la fuente ${id}`);
  return f;
};

// ---------- D: mercado y valoración ----------
const D = leer('D.json');
const bolsa = leer('bolsa.json');
const comps = JSON.parse(readFileSync(join(dir, 'comparables-2026-10-19.json'), 'utf8'));

Object.assign(D.identificacion, {
  precio: 1211.5, fecha_precio: '2026-10-19', max_52s: 1913.5, min_52s: 1130.5,
  volumen_medio_diario: '≈ 746 M DKK/día (569.000 acciones; media de 66 sesiones) [2]',
  proximos_resultados: '2026-10-21',
});

D.consenso.estimaciones = [
  { periodo: '2026e', ingresos: 298086, ebitda: 34739, ebit: 24262, bpa: 40.67, dpa: 7.11, fuente: 'MarketScreener, consenso de 21 analistas, 19-oct-2026 [4]' },
  { periodo: '2027e', ingresos: 302976, ebitda: 39120, ebit: 28504, bpa: 79.42, dpa: 8.63, fuente: 'MarketScreener, consenso de 21 analistas, 19-oct-2026 [4]' },
  { periodo: '2028e', ingresos: 311666, ebitda: 42444, ebit: 31610, bpa: 95.46, dpa: 10.34, fuente: 'MarketScreener, consenso de 21 analistas, 19-oct-2026 [4]' },
];
D.consenso.recomendaciones = { n_analistas: 21, comprar: 19, mantener: 2, vender: 0, po_medio: 1824.95, po_min: 1250, po_max: 2300 };
D.consenso.revisiones = 'En los doce días desde el análisis anterior el consenso ha bajado poco en beneficio y mucho en precio objetivo. El EBIT de MarketScreener pasa de 24.370 a 24.262 M DKK en 2026e (−0,4 %), de 28.942 a 28.504 M en 2027e (−1,5 %) y de 32.217 a 31.610 M en 2028e (−1,9 %); el BPA contable, de 41,00 a 40,67, de 81,30 a 79,42 y de 97,83 a 95,46 DKK [4]. El objetivo medio cae de 1.939 a 1.824,95 DKK y el mínimo de 1.580 a 1.250 DKK [5, 6]. Antes del 3T26, siete casas recortaron objetivo en una semana: Barclays (1.900 → 1.800, 8-oct), JPMorgan (rebaja a neutral, 1.400, 9-oct), Nordea (1.840 → 1.670, 13-oct), Jyske (2.100 → 1.600, 14-oct), UBS (1.945 → 1.805, 14-oct) y Deutsche Bank (1.823 → 1.425, 15-oct), y RBC empezó a cubrirla con «sector perform» y 1.250 DKK por los problemas de integración de Schenker [5, 9, 27]. Jyske lo resume: la pregunta no es si Road será débil en el 3T, sino si el 3T es el fondo [9]. Stock Analysis (S&P Global) cuenta 21 analistas: 15 compra fuerte, 4 compra y 2 mantener; BPA ajustado de 2026e 61,95 DKK (55,69-68,58) [6]. No hay historial gratuito de revisiones de BPA a 3 y 12 meses.';

Object.assign(D.bolsa, {
  tipo_rentabilidad: bolsa.bolsa.tipo_rentabilidad,
  rentabilidades: bolsa.bolsa.rentabilidades,
  anual: bolsa.bolsa.anual,
  beta: bolsa.bolsa.beta, volatilidad_pct: bolsa.bolsa.volatilidad_pct, max_drawdown_pct: bolsa.bolsa.max_drawdown_pct,
  posicion_corta_pct: 2.1,
});

D.comparables.empresas = comps;
D.comparables.criterio = 'Siete cotizadas de transitario y logística contractual, con el consenso de MarketScreener del 19-oct-2026 y los cierres del 19-oct (NX Holdings, el de Tokio del 19-oct) [11-17]: los dos rivales globales asset-light directos (Kuehne+Nagel y Expeditors), el mayor intermediario de carretera y transitario de EE. UU. (C.H. Robinson), DHL Group (dueño de DHL Global Forwarding), NX Holdings (transitario japonés global) y dos de logística contractual (GXO e ID Logistics), comparables con el negocio de almacén que trajo Schenker. Capitalización en millones de DKK al tipo del BCE del 19-oct-2026 [26]; múltiplos de los próximos 12 meses con el 20 % de 2026e y el 80 % de 2027e; EV/EBITDA de los últimos 12 meses, margen y ROIC sin cambios desde el 7-oct (ninguno ha publicado resultados desde entonces) [21-25]. Fuera Sinotrans (acciones A y H a precios distintos), Kintetsu World Express (no cotiza) y Kerry Logistics (sin consenso completo gratis).';

D.transacciones.comentario = D.transacciones.comentario.replace('(≈277.000 M DKK de capitalización)', '(≈289.800 M DKK de capitalización al cierre del 19-oct)');
D.multiplos_historicos.comentario = D.multiplos_historicos.comentario.replace('El precio actual (1.157 DKK) está por debajo de los cierres de 2021, 2023, 2024 y 2025 y solo por encima del de 2022 (1.096,5 DKK) [2]', 'El precio actual (1.211,5 DKK, cierre del 19-oct) está por debajo de los cierres de 2021, 2023, 2024 y 2025 y solo por encima del de 2022 (1.096,5 DKK) [2]');

Object.assign(fuente(D, 2), { titulo: 'Históricos diarios de DSV.CO, ^STOXX, EXSA.DE, EXH4.DE y EXV1.DE (herramientas/bolsa.mjs y movimiento.mjs)', fecha: '2026-10-19' });
fuente(D, 4).fecha = '2026-10-19';
fuente(D, 5).fecha = '2026-10-19';
fuente(D, 6).fecha = '2026-10-19';
Object.assign(fuente(D, 8), { titulo: 'Rendimiento del bono federal alemán a 10 años (serie diaria BBSIS D.I.ZST.ZI.EUR.S1311.B.A604.R10XX), 19-oct-2026: 3,49 %', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' });
Object.assign(fuente(D, 9), { titulo: 'DSV Faces Customer Retention Crisis as Analyst Slashes Price Target by 24% (Jyske Bank, 2.100 → 1.600 DKK)', editor: 'Breakbulk News', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://breakbulk.news/dsv-faces-customer-retention-crisis-as-analyst-slashes-price-target-by-24/' });
for (const id of [11, 12, 13, 14, 15, 16, 17]) fuente(D, id).fecha = '2026-10-19';
Object.assign(fuente(D, 26), { titulo: 'Euro foreign exchange reference rates, 19 October 2026 (DKK 7,4747; USD 1,1225; CHF 0,9261; JPY 177,63)', fecha: '2026-10-19', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' });
const nuevas = [
  { id: 27, titulo: 'RBC sets DKK 1,250 target for DSV stock', editor: 'ad-hoc-news.de', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://www.ad-hoc-news.de/boerse/news/nebenwerte/rbc-sets-dkk-1-250-target-for-dsv-stock/70350101' },
  { id: 28, titulo: 'Trucking and logistics shares plummet amid AI fears (SemiCab de Algorhythm, 12-feb-2026: DSV −11 %, Kuehne+Nagel −13 %, C.H. Robinson −15 %)', editor: 'SSBCrack News', tipo: 'Prensa', fecha: '2026-02-15', url: 'https://news.ssbcrack.com/trucking-and-logistics-shares-plummet-amid-ai-fears/' },
  { id: 29, titulo: 'Former karaoke company drags logistics into the AI scare trade', editor: 'SupplyChainBrain', tipo: 'Prensa', fecha: '2026-02-13', url: 'https://www.supplychainbrain.com/articles/43474-former-karaoke-company-drags-logistics-into-the-ai-scare-trade' },
  { id: 30, titulo: 'Lista de anuncios de DSV A/S (último: n.º 1173, calendario financiero de 2027, 5-oct-2026)', editor: 'MFN', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://mfn.se/all/a/dsv' },
];
for (const f of nuevas) if (!D.fuentes.some((x) => x.id === f.id)) D.fuentes.push(f);
D.huecos = D.huecos.filter((h) => !/Tasa libre/.test(h.campo) && h.campo !== 'posicion_corta_pct');
D.notas_integrador = 'Iteración del 19-oct-2026 sobre la nota del 7-oct: precio, rango, volumen, rentabilidades, betas (frente a EXSA.DE: 1,36 mensual 5a, 1,21 semanal 2a, 1,24 ajustada) y volatilidad de bolsa.json (cierre del 19-oct, sin aviso de cierre); consenso, objetivos y comparables de MarketScreener del 19-oct; tasa libre = Bund a 10 años del 19-oct (3,49 %, Bundesbank), como pide lecciones-paises.md para Dinamarca (el informe del 7-oct usó el bono danés de agosto, 3,1 %); puente del 30-jun sin cambios (no hay balance posterior hasta el 21-oct).';
escribir('D.json', D);

// ---------- B: sector (solo el dato de fletes) ----------
const B = leer('B.json');
Object.assign(fuente(B, 14), { titulo: 'World Container Index assessed by Drewry (15 oct 2026: 4.485 USD por contenedor de 40 pies, +3 % en la semana)', fecha: '2026-10-15' });
const txtB = JSON.stringify(B);
if (!txtB.includes('4.434')) console.warn('B: no aparece 4.434 (WCI del 1-oct); revisar a mano');
escribir('B.json', JSON.parse(txtB.replaceAll('4.434 USD por FEU a 1-oct-2026', '4.485 USD por FEU a 15-oct-2026').replaceAll('4.434 USD/FEU a 1-oct-2026', '4.485 USD/FEU a 15-oct-2026')));

// ---------- C: gobierno (comprobado sin cambios) ----------
const C = leer('C.json');
if (!C.fuentes.some((x) => x.id === 29)) C.fuentes.push({ id: 29, titulo: 'Lista de anuncios de DSV A/S en MFN, consultada el 19-oct-2026: sin operaciones de directivos ni avisos de accionistas significativos desde el n.º 1172 (28-jul-2026)', editor: 'MFN', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://mfn.se/all/a/dsv' });
escribir('C.json', C);
console.log('Notas B, C y D actualizadas.');

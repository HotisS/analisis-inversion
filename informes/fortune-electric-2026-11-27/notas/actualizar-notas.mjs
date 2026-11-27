// Iteración del 27-nov-2026 de Fortune Electric (1519.TW). Parte de las notas A-E del 16-oct (copiadas) y cambia lo que se ha
// vuelto a comprobar a hoy: 3T26 (datos abiertos de la TWSE, comunicado de MOPS del 10-nov y Stock Analysis), LTM sep-26,
// ventas de octubre, puente a 30-sep-2026, consenso de Yahoo (27-nov), comparables rehechos con Yahoo (27-nov), bolsa y
// sentimiento. Ejecutar una sola vez sobre las copias: node notas/actualizar-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (l) => JSON.parse(fs.readFileSync(path.join(dir, `${l}.json`), 'utf8'));
const guarda = (l, o) => fs.writeFileSync(path.join(dir, `${l}.json`), JSON.stringify(o, null, 2) + '\n', 'utf8');
const ACC = 347.47;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;

// ------------------------------------------------------------------ A
const A = lee('A');
if (A._iteracion === '2026-11-27') { console.log('Ya actualizado'); process.exit(0); }
A._iteracion = '2026-11-27';
A.fuentes.push(
  { id: 12, titulo: 'Datos abiertos de la Bolsa de Taiwán: cuenta consolidada acumulada enero-septiembre de 2026 (t187ap06_L_ci), balance consolidado a 30-sep-2026 (t187ap07_L_ci) y ventas de octubre de 2026 (t187ap05_L) de 華城 (1519)', editor: 'Taiwan Stock Exchange (OpenAPI)', tipo: 'Primaria', fecha: '2026-11-27', url: 'https://openapi.twse.com.tw/v1/opendata/t187ap06_L_ci' },
  { id: 13, titulo: '華城:公告本公司115年第3季合併財務報告業經提報董事會通過 (hecho relevante de MOPS del 10-nov-2026: ventas, margen bruto, resultado de explotación, beneficio y BPA de enero-septiembre)', editor: 'Fortune Electric Co., Ltd. (MOPS, reproducido por Anue)', tipo: 'Primaria', fecha: '2026-11-10', url: 'https://news.cnyes.com/news/id/6656418' },
  { id: 14, titulo: '華城10月營收18.89億元年減15.38% 1—10月達180.96億元', editor: 'Anue 鉅亨網', tipo: 'Prensa', fecha: '2026-11-10', url: 'https://news.cnyes.com/news/id/6656862' },
  { id: 15, titulo: 'Fortune Electric (TPE: 1519): cuenta, balance y flujos trimestrales 2T25-3T26 (amortización, anticipos de clientes, deuda, arrendamientos, capex y dividendos)', editor: 'Stock Analysis (S&P Global Market Intelligence)', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://stockanalysis.com/quote/tpe/1519/financials/balance-sheet/?p=quarterly' },
  { id: 16, titulo: '華城:澄清115年11月03日工商時報A13之新聞內容 (inversión de 3.500 M TWD de la filial 華城重電 en una fábrica inteligente en el puerto de Taichung)', editor: 'Fortune Electric Co., Ltd. (MOPS, reproducido por Anue)', tipo: 'Primaria', fecha: '2026-11-03', url: 'https://news.cnyes.com/news/id/6644998' },
  { id: 17, titulo: 'Yahoo Finance: historial de BPA frente a la estimación del consenso por trimestre (4T25-3T26)', editor: 'Yahoo Finance (quoteSummary, earningsHistory)', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/1519.TW/analysis/' },
);

// LTM a 30-sep-2026 = 9M-2026 oficial [12, 13] + 4T25 (2025 auditado − 9M-2025).
// 9M-2026: ventas 16.207,0; resultado de explotación 4.013,2; beneficio atribuido 3.640,3; BPA 10,48 [12, 13].
// 4T25 (Stock Analysis, cuadrado con el anual): ventas 8.096,6; explotación 1.613,6; beneficio 1.678,3; BPA 4,81 [15].
// Amortización: 9M-2026 381,1 (119,1 + 127,2 + 134,8) y 4T25 111,9 (103,2 + 8,6) [15].
// FCF LTM: flujo operativo 6.731,1 − capex 1.564,1 − intangibles 38,4 − principal de arrendamientos 96,1 = 5.032,5 [15].
A.financieros.ltm = {
  periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 24303.6, ebitda: r1(4013.2 + 1613.6 + 381.1 + 111.9), ebit: r1(4013.2 + 1613.6),
  beneficio_neto: r1(3640.3 + 1678.3), bpa: r2(10.48 + 4.81), dpa: 10, dpa_extraordinario: 0, fcf: 5032.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
};
A.financieros.comentario = A.financieros.comentario.replace(/2026 es un año de pausa:.*$/,
  '2026 es un año de pausa en ventas y de salto en margen: nueve meses −0,7 % (16.207,0 M frente a 16.326,5 M) y octubre −15,4 % por retrasos de entregas a EE. UU., pero el margen bruto de enero-septiembre sube al 44,1 % (7.145,3 M) y el resultado de explotación al 24,8 % de las ventas; en el 3T26 solo, margen bruto del 45,0 % y de explotación del 30,3 % [12-15].');

// Trimestres: 4T24-3T26 (8). EBITDA = explotación + amortización de Stock Analysis desde el 2T25 [15]; BPA en la base de 347,47 M.
const T = (periodo, ingresos, crec, ebitda, bpa, vs) => ({ periodo, ingresos, crecimiento_pct: crec, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: ebitda == null ? null : r1((ebitda / ingresos) * 100), bpa, vs_consenso: vs });
A.trimestres.items = [
  T('4T24', 7162.6, null, null, 4.5, null),
  T('1T25', 4421.3, null, null, 2.48, null),
  T('2T25', 6073.4, 30.7, r1(1513.6 + 72.0 + 7.9), 2.27, null),
  T('3T25', 5831.8, 8.9, r1(1222.0 + 83.8 + 8.3), 3.14, null),
  T('4T25', 8096.6, 13.0, r1(1613.6 + 103.2 + 8.6), 4.81, 'En línea'),
  T('1T26', 4756.5, 7.6, r1(1008.3 + 119.1), 2.98, 'Inferior'),
  T('2T26', 5455.7, -10.2, r1(1230.3 + 127.2), 2.94, 'Inferior'),
  T('3T26', 5994.9, 2.8, r1(1815.5 + 134.8), 4.54, 'Superior'),
];
A.trimestres.ultima_presentacion = 'Fortune no celebra conferencias con analistas tras cada trimestre ni da guía numérica: no hay transcripción del 3T26 ni del 2T26 (buscadas en Anue y en la prensa taiwanesa), y lo que dice la dirección sale de los hechos relevantes y de la prensa. El consejo aprobó el 3T26 el 10-nov-2026 (no el 13-nov que teníamos como fecha estimada) [13]. Enero-septiembre: ventas de 16.207,0 M TWD (−0,7 %), margen bruto del 44,1 %, resultado de explotación de 4.013,2 M, beneficio atribuido de 3.640,3 M y BPA de 10,48 TWD (+33 % frente a 7,89) [12, 13]. El 3T26 solo: ventas de 5.994,9 M (+2,8 %), margen bruto del 45,0 %, explotación del 30,3 % y BPA de 4,54 (+45 % frente a 3,14), un 25 % por encima de la estimación del consenso (3,63) [15, 17]. El salto es de margen, no de volumen: la mezcla de transformadores de potencia de exportación y el reparto de aranceles pesan menos que en 2025 [10, 15]. Los anticipos de clientes suben a 10.693 M (de 7.577 M en diciembre) y las existencias a 11.402 M (+37 %): hay producto fabricado esperando entrega, y octubre aún cae un 15,4 % [14, 15]. El 3-nov la empresa confirmó en MOPS una inversión de 3.500 M en una fábrica inteligente en el puerto de Taichung [16].';
A.trimestres.confianza = 'Media';
A.huecos = A.huecos.filter((h) => h.seccion !== 'trimestres');
A.huecos.push({ seccion: 'trimestres', campo: 'transcripción de las dos últimas conferencias y EBITDA trimestral de 4T24 y 1T25', tipo: 'Complemento', intentos: '1) MOPS (rechaza la consulta desde la nube: «FOR SECURITY REASONS») y web de la empresa (Incapsula); 2) Anue y prensa taiwanesa (la empresa no celebra conferencia trimestral; solo hechos relevantes); 3) Stock Analysis (amortización trimestral solo desde el 2T25)', decision: 'Omitido' });

// Balance: el histórico anual no cambia. Liquidez y otros pasivos a 30-sep-2026 [12, 15].
A.balance.liquidez = 'Caja de 5.646,9 M TWD a 30-sep-2026 más 322,7 M de inversiones a corto (5.969,6 M), frente a 1.561,8 M de deuda bancaria (880 M a corto y 681,8 M a largo); en el 3T26 se pagó el dividendo de 3.474,7 M [12, 15].';
A.balance.otros_pasivos = 'Arrendamientos de 2.122,6 M TWD a 30-sep-2026 (131,0 M a corto y 1.991,6 M a largo), sobre todo el suelo de la fábrica de Taichung; NIIF 16, van al puente [15]. Anticipos de clientes (pasivos de contrato) de 10.693,2 M (6.123,0 M a corto y 4.570,2 M a más de un año), un 41 % más que en diciembre (7.577,0 M): financian el circulante y caerían si los pedidos frenan [15]. Existencias de 11.401,8 M (8.333,5 M en diciembre). Plan de pensiones de prestación definida pequeño [2].';
A.balance.comentario = A.balance.comentario.replace(/\(6\.472 M en junio de 2026 antes del dividendo de agosto\)/, '(4.407,8 M en septiembre de 2026 después de pagar 3.474,7 M de dividendo)') + ' A 30-sep-2026 los anticipos ya suman 10.693 M y las existencias 11.402 M: la cartera crece aunque las entregas se retrasen [15].';
A.balance.vencimientos = [{ anio: '2026-27 (corto plazo)', importe: 880 }, { anio: '2027 en adelante (largo plazo)', importe: 681.8 }];
A.flujos.comentario += ' En enero-septiembre de 2026 el flujo operativo fue de 4.910,0 M y el capex de 1.261,8 M (más 31,8 M de intangibles), con 3.474,7 M de dividendo pagado en el 3T [15].';

// KPI
const kpis = A.negocio.kpis;
kpis[1] = { kpi: 'Anticipos de clientes (pasivos de contrato)', valor_anterior: '7.577 M TWD (dic-2025)', valor_actual: '10.693 M TWD (sep-2026)', variacion: '+41 %', comentario: 'La empresa no publica la cartera total; los anticipos son el mejor indicador observable [15].' };
kpis[2] = { kpi: 'Margen bruto', valor_anterior: '40,5 % (2025)', valor_actual: '44,1 % (9M-2026); 45,0 % (3T26)', variacion: '+3,6 pp', comentario: 'Mezcla de transformadores de potencia de exportación [12, 15].' };
guarda('A', A);

// ------------------------------------------------------------------ D
const D = lee('D');
const C = JSON.parse(fs.readFileSync('/tmp/claude-0/tanda-1127/fortune-electric/comparables.json', 'utf8'));
D._iteracion = '2026-11-27';
D.fuentes = D.fuentes.map((f) => {
  if (f.id === 1) return { ...f, titulo: 'Yahoo Finance: históricos diarios de 1519.TW, 0050.TW y 2308.TW hasta el 27-nov-2026 (rango, volumen, rentabilidades, betas y cierres de ejercicio ajustados)', fecha: '2026-11-27' };
  if (f.id === 4) return { id: 4, titulo: 'Yahoo Finance quoteSummary de los comparables (precio, capitalización, valor empresa, ventas, EBITDA y FCF de 12 meses, deuda, caja y estimaciones de BPA y ventas de los dos próximos ejercicios), 27-nov-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/267260.KS/analysis/' };
  if (f.id === 5) return { ...f, titulo: 'Taiwan 10-Year Government Bond Yield: 1,86 % (27-nov-2026)', fecha: '2026-11-27' };
  if (f.id === 6) return { ...f, titulo: 'Implied ERP by month (ERPbymonth.xlsx), noviembre de 2026: 4,41 % (T12m with sustainable payout)', fecha: '2026-11' };
  if (f.id === 7) return { id: 7, titulo: 'Yahoo Finance: tipos de cambio a TWD del 27-nov-2026 (USD 32,94; KRW 0,0247; CAD 23,153; BRL 5,811; EUR 36,14)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/USDTWD=X/' };
  if (f.id === 12) return { id: 12, titulo: 'Balance a 30-sep-2026: datos abiertos de la TWSE (totales) y detalle de Stock Analysis (caja, inversiones a corto, deuda, arrendamientos, minoritarios)', editor: 'Taiwan Stock Exchange (OpenAPI) y Stock Analysis', tipo: 'Primaria', fecha: '2026-11-27', url: 'https://openapi.twse.com.tw/v1/opendata/t187ap07_L_ci' };
  if (f.id === 14) return { id: 14, titulo: 'Fortune Electric (TPE: 1519): ratios y accionariado (flotante, insiders 46,4 %)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/1519.TW/key-statistics/' };
  return f;
});
D.fuentes.push(
  { id: 15, titulo: 'Fortune Electric (1519.TW): consenso de Yahoo Finance (BPA y ventas de 4T26, 2026 y 2027 con número de analistas y revisiones a 30 y 90 días; recomendaciones; objetivo medio 878,89, mínimo 720 y máximo 1.000 TWD)', editor: 'Yahoo Finance (quoteSummary: earningsTrend, financialData, recommendationTrend)', tipo: 'Analistas', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/1519.TW/analysis/' },
);
Object.assign(D.identificacion, { precio: 484, fecha_precio: '2026-11-27', capitalizacion_publicada: 168175, max_52s: 1013.64, min_52s: 390.5, volumen_medio_diario: '≈ 997 M TWD/día (3 meses; 1,62 M de acciones)', proximos_resultados: '2027-03-13' });
D.consenso.estimaciones = [
  { periodo: '2026e', ingresos: 28128, ebitda: null, ebit: null, bpa: 18.03, dpa: null, fuente: 'Yahoo Finance, media de 7 analistas (ventas de 7), 27-nov-2026; la del 4T26 sola (6 analistas) da 16,76 [15]' },
  { periodo: '2027e', ingresos: 34654, ebitda: null, ebit: null, bpa: 23.47, dpa: null, fuente: 'Yahoo Finance, media de 7 analistas, 27-nov-2026 [15]' },
  { periodo: '2028e', ingresos: 41490, ebitda: null, ebit: null, bpa: 27.74, dpa: null, fuente: 'FactSet vía Anue, mediana de 7 analistas (23-sep-2026), en la base de 347,47 M de acciones [2]' },
];
D.consenso.recomendaciones = { n_analistas: 8, comprar: 8, mantener: 0, vender: 0, po_medio: 878.89, po_min: 720, po_max: 1000 };
D.consenso.revisiones = 'Tras el 3T26 el consenso de BPA casi no se mueve pese a la sorpresa de margen: la media de 2026 de Yahoo baja de 19,02 TWD hace 90 días a 18,77 hace 30 y 18,03 hoy, y la de 2027 de 23,75 a 24,13 y 23,47 [15]. La estimación del 4T26 baja de 6,74 a 6,28 (6 analistas): el mercado corrige ventas (octubre −15,4 %) más que margen. El objetivo medio sube a 878,89 TWD (720-1.000) y los 8 analistas siguen en compra [15]. Corrección frente al informe del 16-oct: allí dividimos el BPA de FactSet por 1,1 suponiendo que seguía en la base anterior a la ampliación gratuita de agosto; no es así (el rango de FactSet, 16,15-21,42 en 2026, coincide con el de S&P en la base nueva, y el BPA de los últimos 12 meses de Yahoo, 15,28, es el oficial de 10,48 + 4,81 sobre 347,47 M de acciones) [2, 15]. Los BPA de FactSet van ahora sin dividir.';
D.consenso.guidance = 'La empresa no publica guía numérica ni celebra conferencia trimestral. En el 1S26 dijo que el segundo semestre sería mejor que el primero y que la exportación superaría el 60 % de las ventas; la capacidad sube un 30 % en 2026 (Guanyin 3B) y la fábrica de Taichung (muy alta tensión) entra en 2027; el 3-nov confirmó una inversión de 3.500 M en una fábrica inteligente en el puerto de Taichung [12]. Hasta octubre las ventas acumulan −2,5 % (18.095,7 M).';
D.comparables.empresas = C;
D.comparables.criterio = 'Nueve cotizadas de transformadores y equipos de red: los tres coreanos que más exportan a EE. UU. (HD Hyundai Electric, Hyosung Heavy, LS Electric), Hammond (Norteamérica), WEG (Brasil, transformadores y motores), los tres rivales taiwaneses (Shihlin, Chung-Hsin, Allis) y Siemens Energy (redes y turbinas). Hitachi Energy no cotiza aparte y GE Vernova se excluye porque vive sobre todo de turbinas de gas y su BPA de 2026 lleva un extraordinario (31,80 frente a 26,23 en 2027). Rehechos el 27-nov con Yahoo (precio, valor empresa, EBITDA y FCF de 12 meses, y BPA y ventas estimados de los dos próximos ejercicios ponderados por los meses de los próximos 12; Siemens Energy cierra en septiembre); capitalización en M TWD al cambio del día [4, 7]. El ROIC es el de Stock Analysis del 16-oct (sin dato fiable para Siemens Energy).';
D.huecos = D.huecos.map((h) => (h.seccion === 'comparables' ? { ...h, intentos: '1) Yahoo quoteSummary (no da EBITDA estimado); 2) Stock Analysis (solo VE/EBITDA de 12 meses pasados); 3) MarketScreener (de pago por comparable)' } : h));
guarda('D', D);

// ------------------------------------------------------------------ E
const E = lee('E');
E._iteracion = '2026-11-27';
E.fuentes.push({ id: 6, titulo: 'Búsquedas de 華城, 1519 y 重電 en PTT Stock (27-nov-2026): el último hilo propio es del 12-may-2026', editor: 'PTT (foro Stock)', tipo: 'Foros y redes', fecha: '2026-11-27', url: 'https://www.ptt.cc/bbs/Stock/search?q=%E8%8F%AF%E5%9F%8E' });
E.sentimiento.tendencia = 'Empeora';
E.sentimiento.lectura = 'Desde el informe del 16-oct no hay debate nuevo de particulares sobre Fortune en PTT (el último hilo propio es del 12-may; búsquedas de 華城, 1519 y 重電 del 27-nov) [6]. El sentimiento se ve en el precio: cinco sesiones de ±10 % (límite diario) en noviembre, siempre del lado del índice en un mercado que cae un 16,6 % desde el 16-oct antes de las elecciones locales del 28-nov. El debate fue eufórico hasta el máximo de febrero (1.014 TWD ajustado) y después se volvió dividido, con la valoración y el freno de las ventas como temas [1, 2]; la prensa sigue tratando a Fortune como líder del grupo de equipos eléctricos pesados [3-5]. No es capitulación: los ocho analistas siguen en compra. No añade un riesgo que el informe no recoja.';
guarda('E', E);
console.log('Notas A, D y E actualizadas');

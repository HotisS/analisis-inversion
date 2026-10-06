// Escribe transacciones.json y añade sus fuentes (63-76) a fuentes.json (idempotente).
import { readFileSync, writeFileSync } from 'node:fs';
const P = 'informes/intuitive-2026-10-06/notas/D_scripts';
const E = 'https://www.sec.gov/Archives/edgar/data';
let F = JSON.parse(readFileSync(`${P}/fuentes.json`, 'utf8')).filter((f) => f.id <= 62);
const nuevas = [
  [63, 'Stryker to acquire Inari Medical (nota de prensa, Exhibit 99.1 del 8-K de Stryker)', 'Stryker Corporation (SEC EDGAR)', 'Primaria', '2025-01-06', `${E}/310764/000119312525002537/d899660dex991.htm`],
  [64, 'Johnson & Johnson to acquire Shockwave Medical (nota de prensa, Exhibit 99.1)', 'Shockwave Medical / Johnson & Johnson (SEC EDGAR)', 'Primaria', '2024-04-05', `${E}/1642545/000119312524087890/d819714dex991.htm`],
  [65, 'Johnson & Johnson to acquire Abiomed (nota de prensa, Exhibit 99.1 del 8-K de J&J)', 'Johnson & Johnson (SEC EDGAR)', 'Primaria', '2022-11-01', `${E}/200406/000119312522274491/d395813dex991.htm`],
  [66, 'Zimmer Biomet to acquire Paragon 28 (nota de prensa, Exhibit 99.1)', 'Zimmer Biomet Holdings (SEC EDGAR)', 'Primaria', '2025-01-28', `${E}/1136869/000119312525014569/d644888dex991.htm`],
  [67, 'Silk Road Medical enters into definitive agreement to be acquired by Boston Scientific (nota de prensa, Exhibit 99.1)', 'Silk Road Medical (SEC EDGAR)', 'Primaria', '2024-06-18', `${E}/1397702/000110465924072846/tm2417405d1_ex99-1.htm`],
  [68, 'Boston Scientific to acquire Penumbra (nota de prensa, Exhibit 99.1)', 'Boston Scientific (SEC EDGAR)', 'Primaria', '2026-01-15', `${E}/885725/000094787126000034/ss5822817_ex9901.htm`],
  [69, 'Abbott acquisition of Exact Sciences (presentación a inversores, Exhibit 99.2 del 8-K)', 'Abbott Laboratories (SEC EDGAR)', 'Primaria', '2025-11-20', `${E}/1800/000110465925114422/tm2531676d2_ex99-2.htm`],
  [70, 'Zimmer Biomet to acquire Monogram Technologies (presentación, Exhibit 99.1 del 8-K)', 'Zimmer Biomet Holdings (SEC EDGAR)', 'Primaria', '2025-07-14', `${E}/1136869/000119312525158442/d76564dex991.htm`],
  [71, 'Boston Scientific Announces Agreement to Acquire Axonics, Inc.', 'Boston Scientific (sala de prensa)', 'Primaria', '2024-01-08', 'https://news.bostonscientific.com/2024-01-08-Boston-Scientific-Announces-Agreement-to-Acquire-Axonics,-Inc'],
  [72, 'XBRL Company Facts de Shockwave Medical (CIK 0001642545)', 'SEC EDGAR', 'Primaria', '2024-05', 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001642545.json'],
  [73, 'XBRL Company Facts de Abiomed (CIK 0000815094)', 'SEC EDGAR', 'Primaria', '2022-11', 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000815094.json'],
  [74, 'XBRL Company Facts de Inari Medical (CIK 0001531048)', 'SEC EDGAR', 'Primaria', '2024-11', 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001531048.json'],
  [75, 'XBRL Company Facts de Silk Road Medical (CIK 0001397702)', 'SEC EDGAR', 'Primaria', '2024-08', 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001397702.json'],
  [76, 'Históricos diarios de cotización de Penumbra (PEN), enero de 2026', 'Yahoo Finance', 'Datos de mercado', '2026-01-16', 'https://finance.yahoo.com/quote/PEN/history'],
].map(([id, titulo, editor, tipo, fecha, url]) => ({ id, titulo, editor, tipo, fecha, url }));
writeFileSync(`${P}/fuentes.json`, JSON.stringify([...F, ...nuevas], null, 2));

const op = (fecha, objetivo, comprador, ev, ventas, prima, comentario) => ({ fecha, objetivo, comprador, ev, ev_ventas: ventas ? Math.round(ev / ventas * 100) / 100 : null, ev_ebitda: null, prima_pct: prima, comentario });
const sec = {
  operaciones: [
    op('2026-01', 'Penumbra', 'Boston Scientific', 14500, 1400, 19.3, 'Trombectomía y vascular. 374 USD por acción (73 % en efectivo, 27 % en acciones de BSX); EV ≈ 14.500 M; ventas 2025 ≈ 1.400 M (+17,3 %-17,5 %) [68]. Prima frente al cierre del 14-ene-2026 (313,43 USD) [76]. Cierre previsto en 2026.'),
    op('2025-11', 'Exact Sciences', 'Abbott Laboratories', 23000, 3227.5, null, 'Diagnóstico oncológico. 105 USD por acción en efectivo; precio de las acciones 21.000 M y EV ≈ 23.000 M; ventas 2025 estimadas 3.220-3.235 M (punto medio) [69]. Cierre previsto en el 2T26.'),
    op('2025-07', 'Monogram Technologies', 'Zimmer Biomet', 168, null, null, 'Robótica ortopédica semiautónoma (rodilla). 4,04 USD por acción en efectivo, EV ≈ 168 M, más CVR de hasta 12,37 USD por acción; sin ventas significativas [70].'),
    op('2025-01', 'Paragon 28', 'Zimmer Biomet', 1200, 256, null, 'Pie y tobillo. 13,00 USD por acción en efectivo más CVR de hasta 1,00 USD; precio de las acciones ≈ 1.100 M y EV ≈ 1.200 M; ventas 2024 de 255,9-256,2 M (+18 %) [66].'),
    op('2025-01', 'Inari Medical', 'Stryker', 4789, 574.5, null, 'Trombectomía venosa. 80 USD por acción en efectivo; valor de las acciones totalmente diluido ≈ 4.900 M [63]. EV y ventas de 12 meses a sep-2024 calculados con las cuentas de Inari: caja e inversiones 111,5 M, sin deuda; ventas 574,5 M [74] (estimación propia).'),
    op('2024-06', 'Silk Road Medical', 'Boston Scientific', 1161, 185.5, 38.0, 'Revascularización carotídea (TCAR). 27,50 USD por acción en efectivo; valor de las acciones ≈ 1.260 M; prima del 38 % sobre la media ponderada de 60 días [67]. EV y ventas de 12 meses a mar-2024 con las cuentas de Silk Road: caja e inversiones 174,4 M, deuda 75,9 M, ventas 185,5 M [75] (estimación propia).'),
    op('2024-04', 'Shockwave Medical', 'Johnson & Johnson', 13100, 730.2, null, 'Litotricia intravascular. 335 USD por acción en efectivo; EV ≈ 13.100 M incluida la caja [64]; ventas 2023 de 730,2 M [72].'),
    op('2024-01', 'Axonics', 'Boston Scientific', 3400, 366, null, 'Neuromodulación sacra (urología). 71 USD por acción en efectivo; valor de las acciones ≈ 3.700 M y EV ≈ 3.400 M; ventas 2023 ≈ 366 M (+34 %) [71].'),
    op('2022-11', 'Abiomed', 'Johnson & Johnson', 16600, 1031.8, null, 'Asistencia cardiaca (Impella). 380 USD por acción en efectivo más CVR de hasta 35 USD; EV ≈ 16.600 M incluida la caja [65]; ventas del ejercicio a mar-2022 de 1.031,8 M [73].'),
  ],
  comentario: null,
  confianza: 'Media',
  extra: [
    'Ninguna nota oficial publica el múltiplo de EBITDA pagado: varias compañías compradas tenían EBITDA bajo o negativo (Monogram, Silk Road, Axonics). ev_ebitda se deja en null en todas [63-71].',
    'EV/ventas: valor empresa publicado (o calculado, donde se indica) dividido por las ventas del último ejercicio o de 12 meses publicadas en la nota o en las cuentas del objetivo (cálculo propio). Rango: 4,7x (Paragon 28) a 17,9x (Shockwave); mediana de las ocho con ventas ≈ 8,8x.',
    'Primas: solo Silk Road la publica (38 % sobre la media de 60 días) [67]; la de Penumbra (19,3 %) es cálculo propio con el cierre previo al anuncio [76]. Los demás objetivos ya no cotizan y Yahoo no conserva su histórico; las notas de los compradores no dan la prima.',
    'Operaciones de robótica quirúrgica: ninguna gran operación con múltiplo publicado en 5-7 años; Zimmer-Monogram (EV 168 M, sin ventas) [70] es la más cercana. Karl Storz-Asensus (2024) fue de tamaño menor y no se encontró la nota oficial; no se incluye.',
    'La propia Intuitive compró el 1-mar-2026 los negocios de distribución de da Vinci e Ion de ab medica, Abex y Excelencia Robótica (Italia, España, Portugal) por ≈ 533,1 M en efectivo, con 218,0 M de fondo de comercio; no publica ventas ni múltiplo del negocio adquirido [2].',
    'Intuitive como objetivo: capitalización ≈ 143.000 M y free float del 99,5 % [5, 12]; superaría a cualquier operación de la lista en casi diez veces.'
  ]
};
writeFileSync(`${P}/transacciones.json`, JSON.stringify(sec, null, 2));
const m = sec.operaciones.map((o) => o.ev_ventas).filter((x) => x != null).sort((a, b) => a - b);
console.log(sec.operaciones.map((o) => `${o.objetivo}: ${o.ev_ventas}`).join('; '), '| mediana', (m[3] + m[4]) / 2);

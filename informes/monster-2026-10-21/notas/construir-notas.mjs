// Escribe las notas A-E de Monster Beverage (corte 2026-10-21) a partir de los documentos de notas/docs (EDGAR), del XBRL
// de la SEC (cuentas-xbrl.json), de bolsa.json, de yahoo-datos.json (Yahoo quoteSummary del 21-oct-2026, 16:38 UTC) y de
// form4.json. Cada nota cita solo con [n] de su propia lista de fuentes.
// SPLIT: Monster hizo un 2:1 en marzo de 2023 y otro 2:1 el 11-ago-2026. Todo BPA y número de acciones va en acciones de
// HOY (después del split de 2026): 2021-2025 del XBRL ×2 acciones (÷2 BPA); 2016-2020 ×4 (÷4).
// Ejecutar: node informes/monster-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const r3 = (x) => (x == null ? null : Math.round(x * 1000) / 1000);
const n2 = (x) => String(x).replace('.', ',');
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const ED = 'https://www.sec.gov/Archives/edgar/data/865752';
const FACTOR = (a) => (+a >= 2021 ? 2 : 4); // acciones de hoy por acción publicada entonces

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025: cuentas, segmentos, clientes (CCEP, Coca-Cola Consolidated), relación con TCCC, deterioros del alcohol, riesgos', editor: 'Monster Beverage Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-27', url: `${ED}/000110465926020831/mnst-20251231x10k.htm` },
  { id: 2, titulo: 'Form 10-Q del 2T26 (30-jun-2026): balance, inversiones, recompras, split 2:1, compromisos', editor: 'Monster Beverage Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-07', url: `${ED}/000110465926092193/mnst-20260630x10q.htm` },
  { id: 3, titulo: 'Monster Beverage Reports 2026 Second Quarter Financial Results (nota de resultados y datos de Nielsen, exhibits 99.1 y 99.2)', editor: 'Monster Beverage Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-06', url: `${ED}/000110465926092046/tm2622396d1_ex99-1.htm` },
  { id: 4, titulo: 'Notas de resultados del 1T26, 4T25, 3T25, 2T25, 1T25 y 4T24 (resultado operativo ajustado, BPA, ventas por segmento)', editor: 'Monster Beverage Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-07', url: `${ED}/000110465926057188/tm2613885d1_ex99-1.htm` },
  { id: 5, titulo: 'Form 10-Q del 1T26 y del 3T25', editor: 'Monster Beverage Corporation (SEC)', tipo: 'Primaria', fecha: '2026-05-08', url: `${ED}/000110465926057398/mnst-20260331x10q.htm` },
  { id: 6, titulo: 'Form 10-K de 2023 y 2022 (compra de Bang Energy por 363 M USD en 2023 y de CANarchy por 329 M en 2022)', editor: 'Monster Beverage Corporation (SEC)', tipo: 'Primaria', fecha: '2024-02-29', url: `${ED}/000110465924029425/` },
  { id: 7, titulo: 'XBRL company facts de Monster Beverage (cuenta, balance y flujos 2016-2025): herramienta cuentas.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000865752.json' },
  { id: 8, titulo: 'Form 8-K: split 2:1 de las acciones (registro el 24-jul-2026, cotiza ajustado desde el 11-ago-2026)', editor: 'Monster Beverage Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-08', url: `${ED}/000110465926081842/tm2619964d1_8k.htm` },
  { id: 9, titulo: 'Monster Beverage Q2 2026 earnings call (resumen de la transcripción: aluminio, precios, internacional, julio)', editor: 'Webull / transcripción de la conferencia', tipo: 'Prensa', fecha: '2026-08-06', url: 'https://www.webull.com/news/MNST' },
];

const anios = ['2021', '2022', '2023', '2024', '2025'];
// No recurrentes en el EBIT (se suman para el EBITDA ajustado): deterioros del negocio de alcohol (fondo de comercio,
// intangibles e inmovilizado), del estado de flujos del 10-K [1, 6].
const DETERIOROS = { 2021: 0, 2022: 0, 2023: 43.0, 2024: 135.3, 2025: 50.4 };
// Caja + inversiones a corto y a largo (títulos de renta fija para gestión de tesorería) [1, 6].
const CAJA_INV = { 2021: 1326.5 + 1749.7 + 99.4, 2022: 1307.1 + 1362.3 + 61.4, 2023: 2297.7 + 955.6 + 76.4, 2024: 1533.3, 2025: 2088.1 + 677.1 + 487.3 };
const ADQ = { 2021: 0, 2022: 329.5, 2023: 363.4, 2024: 0, 2025: 0 };
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => {
  const a = c.periodo, f = FACTOR(a);
  const acc = r1(c.acciones_diluidas * f);
  const o = { ...c, acciones_diluidas: acc, bpa: r3(c.beneficio_neto / acc), dpa: 0, dpa_extraordinario: 0, minoritarios: 0,
    participadas_en_ebitda: 0, no_recurrentes_en_ebitda: DETERIOROS[a], gastos_financieros: { 2021: null, 2022: null, 2023: 0.4, 2024: 25.3, 2025: 5.3 }[a] };
  delete o.fin; return o;
});
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const o = { ...b, caja: r1(CAJA_INV[b.periodo]), deuda_financiera: b.periodo === '2024' ? 374.0 : 0, arrendamientos: 0, minoritarios: 0, activos_contrato: null };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const o = { ...f, adquisiciones: ADQ[f.periodo], dividendos: 0, pagos_arrendamientos: f.pagos_arrendamientos ?? 0 };
  delete o.fin; return o;
});
const bpaHist = Object.fromEntries(X.financieros.cuenta.map((c) => [c.periodo, r3(c.beneficio_neto / (c.acciones_diluidas * FACTOR(c.periodo)))]));

// Trimestres: EBITDA = resultado operativo GAAP + amortizaciones del trimestre [3, 4, 5]; BPA diluido GAAP ÷ 2 (split de 2026).
const trim = (p, ing, g, ebitda, bpa) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda: r1(ebitda), margen_ebitda_pct: r2(ebitda / ing * 100), bpa, vs_consenso: null });
const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC comprobadas con el 10-K 2025, el 10-Q del 2T26 y las notas de resultados. BPA y acciones en acciones de hoy (después del split 2:1 del 11-ago-2026; y del de marzo de 2023 para 2016-2020). Caja = efectivo + inversiones financieras a corto y largo (títulos de tesorería). No recurrentes = deterioros del negocio de alcohol. Arrendamientos operativos fuera (US GAAP). Sin deuda desde abril de 2025.',
  financieros: {
    cuenta, ltm: null,
    cambios_perimetro: [
      { periodo: '2023', descripcion: 'Compra de los activos de Bang Energy (Vital Pharmaceuticals, en concurso) el 31-jul-2023 por 363,4 M USD en caja: marca Bang y una fábrica de bebidas en Phoenix; ganancia de 45,4 M por la operación en el resultado financiero [6].' },
      { periodo: '2022', descripcion: 'Compra de CANarchy Craft Brewery Collective el 17-feb-2022 por 329,5 M USD netos de caja: origen del segmento de alcohol (Monster Brewing: cervezas artesanas, The Beast Unleashed y Nasty Beast) [6].' },
    ],
    comentario: 'Las ventas pasaron de 5.541 M USD en 2021 a 8.294 M en 2025 (TCAC del 10,6 %) y siguen acelerando: 4.891 M en el 1S26, un 23 % más que un año antes (+20 % sin divisa) [1, 3]. El 92 % viene de la bebida energética Monster (Monster, Reign, Bang) y el 6 % de las marcas «estratégicas» compradas a Coca-Cola en 2015 y de las baratas Predator y Fury, que se venden sobre todo como concentrado [1]. El margen bruto cayó del 56,1 % de 2021 al 50,3 % en 2022 (aluminio, fletes e inflación) y se ha recuperado con subidas de precio y menos coste: 54,0 % en 2024, 55,8 % en 2025 y 55,9 % en el 2T26 [1, 3]. El resultado operativo fue de 2.419 M en 2025 (29,2 % de las ventas) y de 1.470 M en el 1S26 (30,1 %) [1, 3]. Lo que lastra es el alcohol: pierde dinero cada año (−127 M de resultado de segmento en 2025 y −200 M en 2024, con 50 y 135 M de deterioros) y vende menos (135 M en 2025 frente a 185 M en 2023) [1]. Los ingresos financieros (85 M en 2025) vienen de una caja que no se usa [1].',
    ajustes: 'La empresa publica un resultado operativo y un BPA «ajustados» desde 2025 que excluyen los deterioros del alcohol, provisiones de litigios y la aceleración de pagos en acciones: 2.575 M USD de resultado operativo ajustado en 2025 frente a 2.419 GAAP [4]. Este informe trabaja con el BPA GAAP (con el alcohol y sus deterioros dentro), que es el que hay en toda la serie histórica; la diferencia en 2025 es de ≈ 0,06 USD por acción [4]. Los pagos en acciones (≈ 125 M al año) son coste real y no se excluyen.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('3T25', 2197.1, 16.8, 675.4 + 29.6, 0.265),
      trim('4T25', 2131.1, 17.6, 542.6 + 32.4, 0.23),
      trim('1T26', 2353.3, 26.9, 730.0 + 28.4, 0.29),
      trim('2T26', 2537.5, 20.2, 740.4 + 29.8, 0.295),
    ],
    ultima_presentacion: 'Último trimestre publicado: 2T26 (6-ago-2026). Ventas de 2.537,5 M USD (+20,2 %; +17,9 % sin divisa), margen bruto del 55,9 %, resultado operativo de 740,4 M (+17,2 %; ajustado 748,1 M, +13,3 %) y BPA diluido de 0,30 USD en acciones de hoy (+19 %) [3]. Monster no da guía. En la conferencia, la dirección dijo que julio creció un 14,3 % sin alcohol, que habrá subidas de precio selectivas en EE. UU. en el 4T26 y bajas de un dígito en EMEA, y que los aranceles han disparado la prima Midwest del aluminio, con un coste que subirá algo trimestre a trimestre hasta final de 2026 [9]. Fuera de EE. UU. las ventas crecieron un 34,6 % (46 % del total; China +62,5 %, India +84 %, Brasil +82 %) [9]. Los analistas preguntaron sobre todo por el internacional, los precios, el margen bruto con el aluminio, los gastos por caja y las novedades [9]. El 1T26 (7-may) había crecido un 26,9 % con un margen operativo del 31,0 % [5]. Resultados del 3T26: hacia el 5/6-nov-2026.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja e inversiones de 4.200,6 M USD a 30-jun-2026 (2.192,4 de efectivo, 1.226,8 a corto y 781,3 a largo, en papel comercial, depósitos, letras del Tesoro y bonos) y una línea de crédito de 750 M sin disponer [2]. El préstamo de 750 M que financió las recompras de 2024 se devolvió en abril de 2025: sin deuda financiera [1, 2].',
    rating: 'Sin calificación de deuda (no tiene deuda emitida)',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Compromisos de compra de 218,9 M USD y contratos de patrocinio y otros de ≈ 1.058 M (deportistas, eventos, equipos) [2]. Ingresos diferidos de 205,3 M a 31-dic-2025: lo que pagó Coca-Cola y otros distribuidores por los derechos de distribución, que se reconoce en ventas a razón de ≈ 40 M al año [1]. Arrendamientos operativos de 64 M (fuera del puente, US GAAP) [1].',
    comentario: 'Balance sin deuda y con caja creciente: 3.253 M USD de caja e inversiones a final de 2025 y 4.201 M a 30-jun-2026 [1, 2]. El patrimonio (9.364 M en junio de 2026) incluye 6.476 M de acciones propias compradas [2]. El circulante pesa: existencias + clientes − proveedores = 1.852 M en 2025 (22 % de las ventas) [1]; los clientes subieron un 32 % en 2025 por el crecimiento del 4T y los distribuidores internacionales.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo fue de 2.098 M USD en 2025 y 1.114 M en el 1S26; la inversión, de 132 M en 2025 (1,6 % de las ventas) tras 221-264 M en 2023-2024 por la fábrica de Phoenix (de Bang) y capacidad propia; la dirección prevé menos de 250 M hasta junio de 2027 [1, 2]. Flujo libre de ≈ 1.966 M en 2025 (24 % de las ventas). La caja se va a recompras (3.806 M en 2024 con la oferta pública y el préstamo; 104 M en 2025; 134 M en el 1T26 y 0 en el 2T26) y se acumula: no paga dividendo y nunca lo ha pagado [1, 2].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 3, opinion: 'Favorable (sin salvedades) en 2025, también sobre el control interno [1]',
    comentario: 'Cuentas limpias y sencillas: un solo producto principal, sin deuda, sin compras grandes. El ruido viene del alcohol (deterioros de 43, 135 y 50 M USD en 2023-2025 y 86 M de fondo de comercio deteriorado acumulado) [1, 6]. EY sustituyó a Deloitte en 2023. Las comisiones a la red de Coca-Cola se restan de las ventas (115,4 M en 2025) y otra parte va a gastos (46,6 M) [1]. Los descuentos promocionales subieron al 16,0 % de la facturación bruta en 2025 (14,7 % en 2024) [1]. Los cambios de distribuidor generan pagos de terminación que se reconocen como ingreso diferido (≈ 40 M al año) [1].',
    senales: [
      { senal: 'Deterioros repetidos en el alcohol', nivel: 'Media', comentario: '43 M USD en 2023, 135 M en 2024 y 50 M en 2025; el segmento pierde dinero desde la compra de CANarchy [1, 6].' },
      { senal: 'Clientes que crecen más que las ventas', nivel: 'Baja', comentario: 'Cuentas a cobrar +32 % en 2025 frente a ventas +11 %; explicado por un 4T fuerte y el internacional [1].' },
      { senal: 'Descuentos promocionales al alza', nivel: 'Baja', comentario: '16,0 % de la facturación bruta en 2025 frente a 14,7 % en 2024: más promoción para defender cuota [1].' },
      { senal: 'BPA ajustado desde 2025', nivel: 'Baja', comentario: 'La empresa empezó a publicar cifras ajustadas en 2025; la diferencia con el GAAP es pequeña (≈ 6 %) [4].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Sin dividendo nunca; recompras oportunistas: 3.806 M USD en 2024 (con un préstamo de 750 M devuelto en 2025), 104 M en 2025 y 134 M en el 1S26; quedan ≈ 900 M autorizados tras el plan de 500 M del 14-may-2026 [1, 2]. Compras pequeñas para entrar en categorías nuevas (CANarchy, Bang) y en sabores (AFF, 2016) [1, 6]. La caja se acumula: 4.201 M a junio de 2026.',
    adquisiciones: [
      { anio: '2022', objetivo: 'CANarchy Craft Brewery Collective (cervezas artesanas)', importe: 329.5, ev_ebitda: null, financiacion: 'Caja', resultado: 'Mal: el segmento de alcohol pierde dinero cada año y acumula 86 M de fondo de comercio deteriorado y ≈ 230 M de deterioros en total [1, 6].' },
      { anio: '2023', objetivo: 'Bang Energy (activos de Vital Pharmaceuticals en concurso)', importe: 363.4, ev_ebitda: null, financiacion: 'Caja', resultado: 'Regular: fábrica en Phoenix y marca, pero Bang sigue cayendo (−25,8 % en el escáner de EE. UU. a 13 semanas) [6, 3].' },
    ],
    comentario: 'La asignación de capital del negocio principal es excelente (crecer sin deuda con ≈ 2 % de las ventas en inversión) y la de las diversificaciones, mala: el alcohol ha restado ≈ 440 M de resultado operativo en 2023-2025 entre pérdidas y deterioros [1]. El otro punto débil es la caja: 4.201 M (≈ 5 % de la capitalización) rinden ≈ 3 % antes de impuestos; las recompras grandes llegan a saltos (2024) y el resto del tiempo la caja crece [2].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Monster Energy Drinks', descripcion: 'Bebidas energéticas Monster, Reign, Reign Storm y Bang; las embotella y distribuye sobre todo la red de Coca-Cola.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 6555.1, resultado: 2338.7 }, { periodo: '2024', ingresos: 6864.6, resultado: 2462.5 }, { periodo: '2025', ingresos: 7665.9, resultado: 2976.5 }] },
      { nombre: 'Strategic Brands', descripcion: 'Marcas energéticas compradas a Coca-Cola en 2015 (NOS, Full Throttle, Burn, Mother, Relentless y otras) y las baratas Predator y Fury; buena parte se vende como concentrado a embotelladores fuera de EE. UU.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 376.6, resultado: 207.1 }, { periodo: '2024', ingresos: 432.2, resultado: 233.8 }, { periodo: '2025', ingresos: 468.7, resultado: 240.8 }] },
      { nombre: 'Alcohol Brands', descripcion: 'Cervezas artesanas de CANarchy y bebidas alcohólicas con sabor (The Beast Unleashed, Nasty Beast).', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 184.9, resultado: -81.1 }, { periodo: '2024', ingresos: 172.3, resultado: -200.3 }, { periodo: '2025', ingresos: 134.7, resultado: -127.0 }] },
      { nombre: 'Other y corporativo', descripcion: 'Sabores para terceros (AFF) y gastos corporativos no asignados.', tipo_resultado: 'EBIT', historico: [{ periodo: '2023', ingresos: 23.5, resultado: 3.6 - 515.0 }, { periodo: '2024', ingresos: 23.6, resultado: 4.6 - 570.2 }, { periodo: '2025', ingresos: 25.0, resultado: 3.4 - 674.4 }] },
    ],
    geografias: [{ nombre: 'EE. UU. y Canadá', peso_pct: 61.2 }, { nombre: 'EMEA', peso_pct: 22.9 }, { nombre: 'Latinoamérica', peso_pct: 8.4 }, { nombre: 'Asia-Pacífico', peso_pct: 7.5 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Cajas de bebida energética (M de cajas de 192 onzas)', valor_anterior: '846,7', valor_actual: '959,0', variacion: '+13,3 %', comentario: '2025 frente a 2024 [1].' },
      { kpi: 'Ventas netas por caja (USD)', valor_anterior: '8,62', valor_actual: '8,48', variacion: '−1,6 %', comentario: 'Mezcla internacional más barata y más promoción [1].' },
      { kpi: 'Margen bruto', valor_anterior: '54,0 %', valor_actual: '55,8 %', variacion: '+1,8 p.', comentario: '55,9 % en el 2T26; precio y cadena de suministro; el aluminio presiona en el 2S26 [1, 3].' },
      { kpi: 'Margen operativo', valor_anterior: '25,8 %', valor_actual: '29,2 %', variacion: '+3,4 p.', comentario: '30,1 % en el 1S26 [1, 3].' },
      { kpi: 'Ventas fuera de EE. UU.', valor_anterior: '≈ 40 %', valor_actual: '46 % (2T26)', variacion: '+34,6 % en el 2T26', comentario: 'China, India, Brasil, Japón [9].' },
      { kpi: 'Cuota de MEC en conveniencia de EE. UU. (Nielsen, 4 semanas)', valor_anterior: '35,5 %', valor_actual: '35,4 %', variacion: '−0,1 p.', comentario: 'Marca Monster +1,1 p.; Reign y Bang caen [3].' },
    ],
    clientes: 'La red de Coca-Cola embotella y distribuye la mayor parte del volumen: Coca-Cola Europacific Partners fue el 15 % de las ventas de 2025 y Coca-Cola Consolidated el 10 % [1]. The Coca-Cola Company (TCCC) tiene el 20,9 % de Monster; Monster le pagó comisiones de 115,4 M USD restadas de ventas y 46,6 M en gastos en 2025, y le vende concentrado a sus filiales (251 M) [1]. El acuerdo internacional de coordinación de la distribución con TCCC se renovó en febrero de 2025 por cinco años [1]. Poder de precio alto: Monster ha subido precios en 2022-2026 sin perder cuota [3].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso de cada trimestre', tipo: 'Complemento', intentos: '1) notas de resultados (no comparan con el consenso); 2) Yahoo quoteSummary (solo el trimestre en curso); 3) MarketBeat (sin histórico de sorpresas legible)', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025 de Monster Beverage: negocio, competencia, regulación, aluminio, distribución', editor: 'Monster Beverage Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-27', url: `${ED}/000110465926020831/mnst-20251231x10k.htm` },
  { id: 2, titulo: 'Datos de Nielsen de la categoría energética (EE. UU. a 13 y 4 semanas hasta el 25-jul-2026; EMEA, Asia, Latinoamérica): exhibit 99.2 del 2T26', editor: 'Monster Beverage Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-06', url: `${ED}/000110465926092046/tm2622396d1_ex99-2.htm` },
  { id: 3, titulo: 'Celsius Holdings: resultados del 2T26 (Celsius, Alani Nu, Rockstar; cuota en EE. UU.)', editor: 'Celsius Holdings, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.sec.gov/Archives/edgar/data/0001341766/000134176626000047/ex9912q2026.htm' },
  { id: 4, titulo: 'Global Energy Drinks Market (ingresos netos de fabricantes 2025, cuotas, previsión a 2032)', editor: 'Ken Research', tipo: 'Sectorial', fecha: '2026', url: 'https://www.kenresearch.com/global-energy-drinks-market' },
  { id: 5, titulo: 'Energy Drinks Global Market Report 2026 (valor de venta 2025-2030)', editor: 'The Business Research Company (vía GII)', tipo: 'Sectorial', fecha: '2026-03-25', url: 'https://www.giiresearch.com/report/tbrc1979999-energy-drinks-global-market-report.html' },
  { id: 6, titulo: 'Red Bull: cifras de 2025 (facturación de 12.196 M EUR, 13.969 M de latas)', editor: 'Red Bull GmbH (nota de prensa)', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.redbull.com/int-en/energydrink/company-profile' },
  { id: 7, titulo: 'Fichas de comparables (ventas, márgenes, PER) de Yahoo Finance', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com' },
  { id: 8, titulo: 'Monster Beverage Q2 2026 earnings call (aluminio, aranceles, prima Midwest, precios)', editor: 'Webull / transcripción de la conferencia', tipo: 'Prensa', fecha: '2026-08-06', url: 'https://www.webull.com/news/MNST' },
];
const B_ = {
  _estado: 'Completa salvo ficha sectorial: no hay ficha de bebidas energéticas en sectores/ y el encargo no permite escribir fuera de la carpeta del informe; el perímetro y el tamaño salen de dos informes de mercado y de los datos de Nielsen que publica Monster.',
  sector: {
    definicion: 'Mercado relevante: las bebidas energéticas en el mundo, medido como ingresos netos de los fabricantes (lo que cobran Monster, Red Bull o Celsius a embotelladores y distribuidores, no lo que paga el consumidor), que es la misma base que las ventas de Monster [4]. El 98 % de las ventas de Monster es bebida energética (Monster Energy Drinks y Strategic Brands) [1]. Con el precio de venta al público el mercado es mayor (72.230 M USD en 2025 según TBRC) [5].',
    tamano: '≈ 52.600 M USD de ingresos netos de fabricantes en 2025 (Ken Research) [4]',
    unidad_serie: 'millones de USD (ingresos netos de fabricantes; 2025 de Ken Research y previsión con su TCAC del 7,5 %)',
    serie: [{ anio: '2025', tamano: 52643 }, { anio: '2026e', tamano: 56591 }, { anio: '2027e', tamano: 60835 }, { anio: '2028e', tamano: 65398 }, { anio: '2030e', tamano: 75576 }],
    tcac_historico_pct: null, tcac_previsto_pct: 7.5, cr5_pct: 54.6, estructura: 'Concentrada',
    drivers: [
      { driver: 'Consumo de energía funcional (jóvenes, trabajo, deporte, sustituto del café)', efecto: '+', horizonte: 'Estructural', evidencia: 'La categoría creció un 7,1 % en EE. UU. en 13 semanas, un 10,4 % en EMEA, un 11,7 % en Asia-Pacífico y un 23,8 % en Latinoamérica (Nielsen, 2T26) [2].' },
      { driver: 'Penetración internacional (China, India, Brasil, Japón)', efecto: '+', horizonte: 'Estructural', evidencia: 'Las ventas de Monster fuera de EE. UU. crecieron un 34,6 % en el 2T26 y ya son el 46 % [8].' },
      { driver: 'Versiones sin azúcar y «saludables» (fitness, mujeres)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Alani Nu ganó 2 puntos de cuota en conveniencia en un año (+74 % de ventas); Celsius pierde (−7,2 %) [2, 3].' },
      { driver: 'Aluminio y aranceles', efecto: '−', horizonte: 'Cíclico', evidencia: 'Los aranceles de EE. UU. al aluminio disparan la prima Midwest; Monster espera más coste de lata hasta final de 2026 [8].' },
      { driver: 'Regulación sanitaria (cafeína, menores, azúcar, impuestos)', efecto: '−', horizonte: 'Estructural', evidencia: 'Prohibición de venta a menores en Reino Unido (2026), advertencias en Texas, límites a SNAP en estados de EE. UU., impuestos especiales en México y otros países [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Dos líderes (Red Bull y Monster, ≈ 42 % del mundo) y aspirantes que entran fuerte en EE. UU. (Celsius con Alani Nu en la red de PepsiCo, Ghost con Keurig Dr Pepper) [2, 3, 4].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Las cadenas de conveniencia y la gran distribución negocian promociones (16 % de la facturación bruta), pero el consumidor pide la marca [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Latas de aluminio de pocos fabricantes (Ball, Crown) y prima Midwest con aranceles; embotelladores de la red de Coca-Cola [1, 8].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Hacer la bebida es fácil; lo difícil es la distribución en frío y el marketing: los que entran necesitan a PepsiCo o a Keurig [3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Café, bebidas de café listas, refrescos con cafeína, polvos y marcas blancas a menor precio [1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La bebida energética no depende mucho del ciclo: Monster creció en 2009 y 2020. Lo que se mueve es el coste (aluminio, azúcar, fletes) y el precio de la gasolina en EE. UU. (las tiendas de conveniencia de gasolineras son el canal principal) [1]. Hoy la categoría crece al 7-24 % según la región [2].' },
    regulacion: 'Riesgo sanitario creciente: las directrices alimentarias de EE. UU. de enero de 2026 piden limitar las bebidas energéticas; varios estados restringen su compra con ayudas SNAP y Texas exige advertencias de ingredientes; Reino Unido prohibió en 2026 la venta a menores de bebidas con mucha cafeína; hay límites de cafeína e impuestos especiales a bebidas azucaradas en México (IEPS), Brasil y otros países [1]. Aranceles: los de EE. UU. al aluminio importado elevan la prima Midwest que paga Monster por cada lata [8].',
    tendencias: 'Sin azúcar y funcional (proteína, «limpio»), marcas orientadas a mujeres (Alani Nu), formatos grandes y sabores nuevos; la red de distribución decide: PepsiCo se quedó con Celsius y Alani Nu y Keurig Dr Pepper con Ghost [3]. En el mundo, la bebida energética barata (marcas locales en Asia y Latinoamérica: Predator y Fury de Monster) crece más que la premium [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 15.0, posicion: '2.º del mundo en bebidas energéticas (≈ 15 % de los ingresos de fabricantes, detrás de Red Bull con ≈ 27 %) [4]; en EE. UU., 35,4 % de cuota de la empresa en conveniencia frente al 35,1 % de Red Bull (Nielsen, 4 semanas) [2]',
    competidores: [
      { nombre: 'Red Bull (privada)', pais: 'Austria', ticker: null, ingresos: null, cuota_pct: 27.2, margen_ebit_pct: null, comentario: 'Líder mundial: 12.196 M EUR de facturación en 2025 (+8,6 %) y 13.969 M de latas [6]; en EE. UU. pierde 1,5 puntos de cuota en conveniencia en un año [2].' },
      { nombre: 'Celsius Holdings (Celsius, Alani Nu, Rockstar)', pais: 'EE. UU.', ticker: 'CELH', ingresos: r1(Y.CELH.ventas / 1e6), cuota_pct: 4.4, margen_ebit_pct: null, comentario: 'Distribuida por PepsiCo; 20,1 % de cuota en EE. UU. con sus tres marcas; Celsius cae un 11,7 % y Alani Nu sube (364 M en el 2T26) [3, 2].' },
      { nombre: 'PepsiCo', pais: 'EE. UU.', ticker: 'PEP', ingresos: r1(Y.PEP.ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Distribuye Celsius y Alani Nu; vendió Rockstar a Celsius en 2025 [3].' },
      { nombre: 'Keurig Dr Pepper (Ghost)', pais: 'EE. UU.', ticker: 'KDP', ingresos: r1(Y.KDP.ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Ghost: 3,6 % de cuota en conveniencia y +20 % de ventas [2].' },
      { nombre: 'Eastroc Beverage', pais: 'China', ticker: '605499.SS', ingresos: null, cuota_pct: 4.2, margen_ebit_pct: null, comentario: 'Líder en China con bebida energética barata [4].' },
      { nombre: 'Carabao Group', pais: 'Tailandia', ticker: 'CBG.BK', ingresos: r1(Y['CBG.BK'].ventas / 1e6 * 0.0298), cuota_pct: null, margen_ebit_pct: null, comentario: 'Bebida energética barata en Asia y Reino Unido [7].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'No hay red de usuarios; el marketing de deportes extremos y música crea comunidad, no red [1].' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Para el consumidor cambiar de lata no cuesta nada [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'La marca Monster crece un 10 % en EE. UU. con subidas de precio y gana cuota (+1,1 puntos) mientras Reign, Bang y Celsius caen [2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Modelo ligero: la red de Coca-Cola embotella y distribuye; Monster invierte ≈ 2 % de las ventas y tiene un margen operativo del 29 % [1].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Distribución en frío de Coca-Cola en casi todo el mundo, asegurada por el acuerdo de 2015 renovado en 2025 [1].' },
      ],
    },
    amenazas: 'La mayor amenaza en EE. UU. es Alani Nu dentro de la red de PepsiCo (+2 puntos de cuota en un año) y la llegada de marcas con distribución fuerte (Ghost con Keurig) [2, 3]. Red Bull pierde cuota pero sigue siendo el líder mundial y gasta mucho en marketing. Las marcas blancas y las baratas presionan en los mercados emergentes. Fuera de la competencia: la regulación sanitaria (menores, cafeína, SNAP) y el coste del aluminio.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Monster Beverage diseña, comercializa y vende bebidas energéticas: Monster Energy (con decenas de sabores y versiones Ultra sin azúcar), Reign y Bang, marcas compradas a Coca-Cola en 2015 (NOS, Full Throttle, Burn, Mother, Relentless) y las baratas Predator y Fury [1]. No embotella casi nada: compra latas y concentrado, y la red de embotelladores de Coca-Cola produce, distribuye y vende en tiendas de conveniencia, supermercados y bares de ≈ 158 países y territorios [1]. Tiene ≈ 6.900 empleados [1]. Desde 2022 también vende cerveza artesana y bebidas alcohólicas con sabor (Monster Brewing), que pierden dinero [1].',
    como_gana_dinero: 'Cobra a los embotelladores el precio de la lata o del concentrado y se queda con un margen bruto del ≈ 56 %; gasta en marketing (deportes extremos, música, deportistas: ≈ 1.000 M de contratos) y en promociones con las cadenas [1]. Al no fabricar ni distribuir, invierte muy poco (1,6 % de las ventas en 2025) y el margen operativo es del 29 % [1]. Coca-Cola cobra comisión por distribuir (≈ 160 M en 2025) y es accionista del 20,9 % [1].',
  },
  huecos: [
    { seccion: 'sector', campo: 'ficha sectorial corta de bebidas energéticas (sectores/)', tipo: 'Complemento', intentos: '1) sectores/ del repositorio (no hay ficha de bebidas energéticas ni de refrescos); 2) informes del repositorio de empresas del sector (solo PepsiCo, sin perímetro de energéticas); 3) hacerla ahora (el encargo no permite escribir fuera de la carpeta del informe)', decision: 'Perímetro, tamaño y comparables documentados en esta nota con Ken Research, TBRC y Nielsen; ficha pendiente para el hilo principal' },
    { seccion: 'sector', campo: 'tcac_historico_pct', tipo: 'Complemento', intentos: '1) Ken Research (resumen público sin serie); 2) TBRC vía GII (solo previsión); 3) Red Bull y Monster (solo sus ventas)', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración de 2025, accionistas a 17-mar-2026, operaciones vinculadas', editor: 'Monster Beverage Corporation (SEC)', tipo: 'Primaria', fecha: '2026-03-27', url: `${ED}/000110465926035990/tm261427d1_def14a.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta de 2026 (votos de consejeros y de remuneración; nuevo plan de recompras de 500 M)', editor: 'Monster Beverage Corporation (SEC)', tipo: 'Primaria', fecha: '2026-05-14', url: `${ED}/000110465926062567/tm2614725d1_8k.htm` },
  { id: 3, titulo: 'Form 8-K: dimisión del consejero Mark J. Hall (efectiva el 1-ago-2026)', editor: 'Monster Beverage Corporation (SEC)', tipo: 'Primaria', fecha: '2026-06-04', url: `${ED}/000110465926070506/tm2616810d1_8k.htm` },
  { id: 4, titulo: 'Form 8-K: Matthew S. Burroughs, director de contabilidad y director financiero adjunto (3-sep-2026)', editor: 'Monster Beverage Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-04', url: `${ED}/000110465926105498/tm2624805d1_8k.htm` },
  { id: 5, titulo: 'Form 8-K: Rob Gehring deja de ser consejero delegado de América el 30-nov-2026 para presidir Coca-Cola Norteamérica', editor: 'Monster Beverage Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-25', url: `${ED}/000110465926110965/tm2626151d1_8k.htm` },
  { id: 6, titulo: 'Form 4 de directivos y consejeros de Monster Beverage (21-oct-2025 a 21-oct-2026): herramienta form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000865752&type=4' },
  { id: 7, titulo: 'Form 10-K 2025 (directivos, relación con TCCC)', editor: 'Monster Beverage Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-27', url: `${ED}/000110465926020831/mnst-20251231x10k.htm` },
];
const C = {
  _estado: 'Completa. Proxy 2026, 8-K de la junta de mayo de 2026 y de cambios de consejo y directivos, Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Hilton H. Schlosberg', cargo: 'Vicepresidente del consejo y consejero delegado', desde: '1990', participacion_pct: 7.7, trayectoria: 'Con Rodney Sacks, al frente de la empresa desde noviembre de 1990 (entonces Hansen Natural); director financiero de 1996 a 2021, co-consejero delegado de 2021 a 2025 y consejero delegado único desde el 13-jun-2025; 73 años [1].' },
      { nombre: 'Rodney C. Sacks', cargo: 'Presidente del consejo', desde: '1990', participacion_pct: 7.5, trayectoria: 'Consejero delegado de 1990 a 2021 y co-consejero delegado de 2021 a junio de 2025; presidente del consejo y empleado hasta el 31-dic-2026; 76 años [1].' },
      { nombre: 'Thomas J. Kelly', cargo: 'Director financiero', desde: '2021', participacion_pct: null, trayectoria: 'Director financiero desde 2021; antes, contabilidad de la empresa [1].' },
      { nombre: 'Guy Carling', cargo: 'Consejero delegado de EMEA y de Strategic Brands', desde: '2017', participacion_pct: null, trayectoria: 'Dirige la zona que más crece fuera de EE. UU. [1].' },
      { nombre: 'Rob Gehring', cargo: 'Consejero delegado de América (hasta el 30-nov-2026)', desde: '2024', participacion_pct: null, trayectoria: 'Vino de Coca-Cola y vuelve a ella para presidir Coca-Cola Norteamérica [5].' },
      { nombre: 'Emelie Tirre', cargo: 'Directora de estrategia', desde: '2018', participacion_pct: null, trayectoria: 'Estrategia y nuevas categorías [1].' },
    ],
    historial_guidance: [],
    comentario: 'Monster no da guía de resultados, así que no hay historial que medir. Lo que se mide es la ejecución: ventas del 11 % anual en 2021-2025 sin deuda, recuperación del margen bruto tras 2022 y crecimiento internacional [7]. El punto débil fue el alcohol (CANarchy) y la defensa tardía frente a Celsius y Alani Nu. La sucesión es el tema abierto: Sacks (76 años) dejó el puesto ejecutivo y Schlosberg es consejero delegado único desde junio de 2025; el responsable de América se va a Coca-Cola el 30-nov-2026 y hay un nuevo director de contabilidad desde septiembre; Mark Hall, el último directivo histórico en el consejo, lo dejó el 1-ago-2026 [1, 3, 4, 5].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Rodney C. Sacks', cargo: 'Presidente del consejo (empleado hasta el 31-dic-2026)', tipo: 'Ejecutivo', desde: '1990', comisiones: 'Ejecutiva' },
      { nombre: 'Hilton H. Schlosberg', cargo: 'Vicepresidente y consejero delegado', tipo: 'Ejecutivo', desde: '1990', comisiones: 'Ejecutiva' },
      { nombre: 'Mark S. Vidergauz', cargo: 'Consejero coordinador independiente', tipo: 'Independiente', desde: '1998', comisiones: 'Nombramientos (presidente); Auditoría; Remuneración' },
      { nombre: 'Ana Demel', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Remuneración' },
      { nombre: 'James L. Dinkins', cargo: 'Consejero (ex presidente de Coca-Cola Norteamérica)', tipo: 'Independiente', desde: '2020', comisiones: '—' },
      { nombre: 'William W. Douglas III', cargo: 'Consejero (ex director financiero de Coca-Cola Enterprises)', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría' },
      { nombre: 'Tiffany M. Hall', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos' },
      { nombre: 'Jeanne P. Jackson', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: 'Remuneración (presidenta desde abr-2026)' },
      { nombre: 'Steven G. Pizula', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría (presidente); Nombramientos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 95.1, voto_remuneracion_contra_pct: 4.9, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 19.28, fijo: 1.25, variable_corto: 3.75, variable_largo: 14.18, ratio_salario_medio: 218 },
    remuneracion: 'El consejero delegado (Schlosberg) cobró 19,3 M USD en 2025: 1,25 M de fijo, 3,75 M de variable anual y 14,2 M en acciones y opciones [1]. El variable anual depende en un 75 % del resultado operativo ajustado y se pagó al 188 % del objetivo; las acciones por objetivos dependen del BPA ajustado acumulado de tres años [1]. No hay métrica de rentabilidad del capital ni de rentabilidad para el accionista. Ratio frente al empleado mediano (88.521 USD): ≈ 218 veces [1]. Voto consultivo de la junta de mayo de 2026: ≈ 95 % a favor (93,5 % en 2025) [2].',
    accionistas: [
      { nombre: 'The Coca-Cola Company', pct: 20.9, tipo: 'Estratégico', variacion: 'Desde 2015 (proxy 2026)' },
      { nombre: 'Hilton H. Schlosberg (con sociedades familiares)', pct: 7.7, tipo: 'Internos', variacion: 'Donaciones; sin ventas en mercado' },
      { nombre: 'Rodney C. Sacks (con sociedades familiares)', pct: 7.5, tipo: 'Internos', variacion: 'Venta de 15,2 M USD en dic-2025' },
      { nombre: 'Vanguard', pct: 6.5, tipo: 'Institucional', variacion: 'Proxy 2026' },
      { nombre: 'BlackRock', pct: 5.2, tipo: 'Institucional', variacion: 'Proxy 2026' },
      { nombre: 'Consejeros y directivos en conjunto', pct: 8.1, tipo: 'Internos', variacion: 'Ventas de 36,2 M USD en 12 meses' },
    ],
    insiders: [
      { fecha: '2025-12-12', persona: 'Rodney C. Sacks (presidente)', operacion: 'Venta', acciones: 206543, importe: 15.20 },
      { fecha: '2026-05-13', persona: 'Emelie Tirre (estrategia)', operacion: 'Venta', acciones: 98700, importe: 8.48 },
      { fecha: '2026-05-14', persona: 'Mark J. Hall (consejero)', operacion: 'Venta', acciones: 54000, importe: 4.63 },
      { fecha: '2025-11-13', persona: 'Guy Carling (EMEA)', operacion: 'Venta', acciones: 38438, importe: 2.74 },
      { fecha: '2025-12-12', persona: 'Emelie Tirre (estrategia)', operacion: 'Venta', acciones: 30000, importe: 2.20 },
      { fecha: '2026-06-10', persona: 'Guy Carling (EMEA)', operacion: 'Venta', acciones: 19000, importe: 1.73 },
    ],
    control_y_defensas: 'Sin accionista de control, pero con dos bloques: Coca-Cola (20,9 %; dos consejeros vienen de su red: Dinkins presidió Coca-Cola Norteamérica y Douglas fue director financiero de Coca-Cola Enterprises) y los fundadores Sacks y Schlosberg (≈ 15 %) [1]. Una acción, un voto; consejo elegido cada año; presidente que es empleado hasta final de 2026 (Sacks) con consejero coordinador independiente (Vidergauz, en el consejo desde 1998; 7 de 9 consejeros independientes, dos de ellos ex directivos de la red de Coca-Cola, con ≈ 12 % de votos en contra en 2026) [1, 2]. Operaciones vinculadas pequeñas: material promocional de una empresa de un consejero (≈ 2,3 M en un trimestre) y el uso del avión de Sacks [1]. Acciones anteriores al split de 2026 en la tabla de directivos.',
    alertas: [
      'Ventas de directivos por 36,2 M USD en 12 meses (15,2 M del presidente), ninguna compra y ninguna con plan 10b5-1 [6].',
      'Sucesión: fundador de 76 años que sale de la plantilla a final de 2026; el responsable de América se va a Coca-Cola el 30-nov-2026 [1, 5].',
      'Consejero coordinador en el consejo desde 1998 y un voto en contra del ≈ 12 % [2].',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de MNST, SPY y XLP (precio, rango, rentabilidades, beta, cierres de ejercicio): herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/MNST/history' },
  { id: 2, titulo: 'Consenso de MNST y comparables (BPA y ventas estimados, objetivos, recomendaciones; precio de la sesión del 21-oct a las 12:38 de Nueva York): quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/MNST/analysis' },
  { id: 3, titulo: 'Monster Beverage: cambios de recomendación y objetivos (Wells Fargo, Piper Sandler, UBS, RBC, Stifel, TD Cowen, Deutsche Bank, Zacks)', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://www.marketbeat.com/stocks/NASDAQ/MNST/forecast/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates, octubre de 2026 (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value_month=202610' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Movimiento del precio de MNST (1-12 meses, máximos, media de 200, avisos P1-P5): herramienta movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/MNST/history' },
  { id: 7, titulo: 'Form 4 de directivos (form4.mjs): ventas de 36,2 M USD en 12 meses, sin compras', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000865752&type=4' },
  { id: 8, titulo: 'Notas de resultados del 3T25, 4T25, 1T26 y 2T26 (6-nov-2025, 26-feb-2026, 7-may-2026, 6-ago-2026)', editor: 'Monster Beverage Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-06', url: `${ED}/000110465926092046/tm2622396d1_ex99-1.htm` },
  { id: 9, titulo: 'Titulares de Seeking Alpha sobre MNST (RSS, jul-oct 2026)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://seekingalpha.com/api/sa/combined/MNST.xml' },
  { id: 10, titulo: 'Noticias de Monster Beverage (resultados, analistas, directivos, split)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://www.marketbeat.com/stocks/NASDAQ/MNST/news/' },
  { id: 11, titulo: 'Form 8-K: split 2:1 (8-jul-2026); junta y plan de recompras de 500 M (14-may-2026); salida de Rob Gehring (25-sep-2026)', editor: 'Monster Beverage Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-25', url: `${ED}/000110465926110965/tm2626151d1_8k.htm` },
  { id: 12, titulo: 'Form 10-K 2025 (riesgos, litigios, regulación)', editor: 'Monster Beverage Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-27', url: `${ED}/000110465926020831/mnst-20251231x10k.htm` },
  { id: 13, titulo: 'Celsius Holdings: resultados del 2T26 (la acción cae al no cumplir lo esperado)', editor: 'Celsius Holdings, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.sec.gov/Archives/edgar/data/0001341766/000134176626000047/ex9912q2026.htm' },
];
const c = Y.MNST;
const t = Object.fromEntries(c.trend.map((x) => [x.periodo, x]));
const bol = B.bolsa;
const FX = { USD: 1, JPY: 0.0063, THB: 0.0298 };
const lista = ['CELH', 'KO', 'PEP', 'KDP', 'FIZZ', 'CCEP', '2587.T', 'CBG.BK', 'OSP.BK', 'PRMB'];
const PAIS = { CELH: 'US', KO: 'US', PEP: 'US', KDP: 'US', FIZZ: 'US', CCEP: 'GB', '2587.T': 'JP', 'CBG.BK': 'TH', 'OSP.BK': 'TH', PRMB: 'US' };
const comps = lista.map((tk) => {
  const y = Y[tk];
  const dn = (y.deuda ?? 0) - (y.caja ?? 0);
  return { nombre: y.nombre, ticker: tk, pais: PAIS[tk], capitalizacion: Math.round(y.cap * FX[y.divisa] / 1e6), ev_ventas: r2(y.ev_ventas), ev_ebitda_ltm: r1(y.ev_ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(y.per_adelantado), crecimiento_pct: y.crec_ventas == null ? null : r1(y.crec_ventas * 100), margen_ebitda_pct: y.margen_ebitda == null ? null : r1(y.margen_ebitda * 100), roic_pct: null,
    dn_ebitda: y.ebitda ? r1(dn / y.ebitda) : null, fcf_yield_pct: y.fcf && y.cap ? r1(y.fcf / y.cap * 100) : null };
});
const perMed = (() => { const v = comps.map((x) => x.per_ntm).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : r1((v[n / 2 - 1] + v[n / 2]) / 2); })();
const hora = new Date(c.hora * 1000).toISOString().slice(11, 16);
const D = {
  _estado: `Completa. Precio de cierre del 20-oct-2026 (47,04 USD); la sesión del 21-oct estaba abierta (${n2(c.precio)} USD a las ${hora} UTC). Mediana del PER adelantado de los comparables: ${n2(perMed)}.`,
  _per_mediana_comparables: perMed,
  _bpa_hist_hoy: bpaHist,
  identificacion: {
    nombre: 'Monster Beverage Corporation', nombre_corto: 'Monster Beverage', ticker: 'MNST', isin: 'US61174X1090', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Consumo básico', industria: 'Bebidas no alcohólicas', sede: 'Corona (California)', fundacion: 'Años treinta (Hansen\'s); Hansen Natural desde 1992', empleados: 6891, web: 'https://www.monsterbevcorp.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 1959.1, capitalizacion_publicada: Math.round(B.identificacion.precio * 1959.1), free_float_pct: 63.9,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: 'Monster no da guía de ventas ni de beneficio [8]. Indicaciones cualitativas de la conferencia del 2T26: julio +14,3 % sin alcohol, subidas de precio selectivas en EE. UU. en el 4T26 y bajas de un dígito en EMEA, coste del aluminio algo mayor trimestre a trimestre hasta final de 2026, inversión de menos de 250 M hasta junio de 2027, reunión con inversores el 1-dic-2026 [8].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(t['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['0y'].bpa), dpa: 0, fuente: `Yahoo Finance, ${t['0y'].n} analistas [2]` },
      { periodo: '2027e', ingresos: Math.round(t['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['+1y'].bpa), dpa: 0, fuente: `Yahoo Finance, ${t['+1y'].n} analistas [2]` },
    ],
    recomendaciones: { n_analistas: c.reco[0].strongBuy + c.reco[0].buy + c.reco[0].hold + c.reco[0].sell + c.reco[0].strongSell, comprar: c.reco[0].strongBuy + c.reco[0].buy, mantener: c.reco[0].hold, vender: c.reco[0].sell + c.reco[0].strongSell, po_medio: r2(c.po_medio), po_min: c.po_min, po_max: c.po_max },
    revisiones: `El BPA de 2026 del consenso subió de ${n2(r2(t['0y'].bpa_hace90))} USD hace 90 días a ${n2(r2(t['0y'].bpa))} y el de 2027 de ${n2(r2(t['+1y'].bpa_hace90))} a ${n2(r2(t['+1y'].bpa))}, tras el 2T26 [2]. Objetivos de precio mezclados (en acciones de hoy): Wells Fargo baja de 53 a 48 USD (5-oct, sobreponderar), Piper Sandler 50,50 (19-oct), UBS neutral 52,50, Stifel 52,50, RBC 48,50, TD Cowen 47,50; Deutsche Bank bajó la recomendación en julio y Zacks la subió a «compra fuerte» el 12-oct [3]. Yahoo: ${c.n_analistas} analistas, objetivo medio de ${n2(r2(c.po_medio))} USD (${c.po_min}-${c.po_max}) [2].`,
    base_ebitda: 'sin consenso de EBITDA (solo BPA y ventas)', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    beta: bol.beta, posicion_corta_pct: r1(c.corto_pct * 100),
    comentario: 'La acción ha batido al índice en el último año (+34,9 % frente al +15,8 % del S&P 500) y en cinco (+17,2 % anual frente al +12,7 %), no en tres ni en diez [1]. 2024 fue malo (−8,8 %: frenazo de la categoría en EE. UU., aluminio y el alcohol) y 2025 muy bueno (+45,9 %: vuelta al crecimiento de dos dígitos y del margen bruto) [1]. Beta baja (0,53 mensual a cinco años) y volatilidad del 26 % [1].',
    contexto: {
      movimiento: { fecha: '2026-10-21', var_1m_pct: 5.6, var_3m_pct: -0.0, var_6m_pct: 23.1, var_12m_pct: 34.1, dist_max_52s_pct: -6.4, dist_min_52s_pct: 41.0, dist_max_historico_pct: -6.4, tendencia: 'alcista', volatilidad_60d_pct: 25.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'nov 2025', var_pct: 12.2, causa: 'Resultados del 3T25 (6-nov-2025): ventas +16,8 % y BPA +41 %; +5,2 % el 7-nov [8].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar 2026', var_pct: -15.1, causa: 'Tras los resultados del 4T25 (26-feb) el mercado dudó del ritmo de EE. UU.: −5,0 % el 2-mar y −4,5 % el 18-mar; Wells Fargo bajó el objetivo el 16-mar; Jefferies atribuyó la caída a ruido (precio de la gasolina, cuota de Red Bull, geopolítica) [10, 3].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may 2026', var_pct: 14.3, causa: 'Resultados del 1T26 (7-may): ventas +26,9 % y BPA +27 %; +13,6 % el 8-may [8].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep 2026', var_pct: -9.4, causa: 'Sin causa concreta encontrada en tres búsquedas (8-K, titulares de Seeking Alpha, MarketBeat): coincidió con rebajas de objetivo, el anuncio de la salida de Gehring (25-sep) y rotación del consumo básico [10, 11, 9].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct 2026', var_pct: 12.3, causa: 'Rotación hacia valores defensivos mientras la tecnología cae (foros) y subida de Zacks a «compra fuerte»; sin noticias de la empresa [9, 3].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-11-05', tipo: 'resultados', hecho: 'Resultados del 3T26 hacia el 5/6-nov-2026 (consenso: BPA de 0,30 USD y ventas de 2.492 M) [2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-05', tipo: 'recomendación', hecho: 'Wells Fargo baja el objetivo de 53 a 48 USD (mantiene sobreponderar); Piper Sandler 50,50 el 19-oct; objetivo medio ≈ 50 USD, un 6 % sobre el precio [3, 2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-25', tipo: 'directivos', hecho: 'Rob Gehring, consejero delegado de América, se va el 30-nov-2026 a presidir Coca-Cola Norteamérica [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-11', tipo: 'deuda o capital', hecho: 'Split 2:1 de las acciones (no cambia el valor) [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-06', tipo: 'resultados', hecho: '2T26: ventas +20,2 %, BPA +19 %; aviso de más coste de aluminio por aranceles. Ese día Celsius cayó por no cumplir lo esperado [8, 13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-14', tipo: 'deuda o capital', hecho: 'Nuevo plan de recompras de 500 M USD (≈ 900 M disponibles) [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-13', tipo: 'directivos', hecho: 'Ventas de directivos por 36,2 M USD en 12 meses (Sacks 15,2 M en diciembre de 2025), sin compras ni planes 10b5-1 [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-01', tipo: 'demanda o regulador', hecho: 'Directrices alimentarias de EE. UU. que piden limitar las bebidas energéticas; restricciones de SNAP en estados y prohibición de venta a menores en Reino Unido [12].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-05',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está un 6,4 % bajo su máximo de 52 semanas tras subir un 34 % en un año; no salta ningún aviso P de la herramienta [6]. Los grandes movimientos tienen causa en resultados (3T25, 1T26) salvo septiembre de 2026 (−9 %), sin causa concreta, que ya se ha recuperado. No hay colocaciones, ampliaciones, litigios grandes ni fusiones con fecha. Los resultados del 3T26 (≈ 5-nov) no retrasan la decisión según la regla. Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => +x.anio >= 2018).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: bpaHist[String(+x.anio + 1)] ? r1(x.precio_cierre / bpaHist[String(+x.anio + 1)]) : null, excluir: false })),
    comentario: 'Precio de cierre de cada ejercicio (31 de diciembre, Yahoo, ajustado por splits) [1] ÷ BPA GAAP real del ejercicio siguiente en acciones de hoy: Monster ha cotizado entre 27 y 43 veces el beneficio del año siguiente en los últimos ocho años. El múltiplo más bajo fue el de final de 2024 (27,2 veces el BPA de 2025), tras un año de frenazo; el más alto, el de final de 2021 (43 veces el de 2022, año del aluminio caro).',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Empresas de bebidas cotizadas: el rival directo en energéticas (Celsius), las dos grandes de refrescos (Coca-Cola, PepsiCo), Keurig Dr Pepper (Ghost), dos embotelladores de Coca-Cola que distribuyen Monster (CCEP; Coca-Cola Consolidated se excluye por un PER de Yahoo erróneo), National Beverage, Primo Brands, Suntory Beverage & Food y dos de bebida energética de Tailandia (Carabao, Osotspa). Red Bull no cotiza. Ninguna tiene el crecimiento, el margen y la caja neta de Monster.',
    empresas: comps,
    comentario: `Monster cotiza a ${n2(r1(c.per_adelantado))} veces el BPA del consenso de los próximos 12 meses frente a una mediana de los comparables de ${n2(perMed)} [2]. La prima es enorme y en parte justificada: crece al 15-20 % frente al 3-7 % de las grandes, con margen operativo del 29 %, sin deuda y con inversión mínima. Coca-Cola, la más parecida en calidad, cotiza a ${n2(comps.find((x) => x.ticker === 'KO').per_ntm)} veces; Celsius, el rival directo, a ${n2(comps.find((x) => x.ticker === 'CELH').per_ntm)} veces tras caer por perder cuota.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-08', objetivo: 'Rockstar Energy (marca, EE. UU. y Canadá)', comprador: 'Celsius Holdings (a PepsiCo)', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Pagada en acciones de Celsius; sin precio comparable publicado.' },
            { fecha: '2023-07', objetivo: 'Bang Energy (activos en concurso)', comprador: 'Monster Beverage', ev: 363.4, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Compra en concurso de acreedores; no sirve como referencia de valor [12].' },
    ],
    comentario: 'No hay transacciones útiles para valorar Monster: las compras del sector son de marcas pequeñas o en concurso. Con ≈ 92.000 M USD de capitalización, el único comprador posible sería Coca-Cola (ya tiene el 20,9 %); no hay indicios y no se valora la prima de control.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA y BPA de 2028e del consenso', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo dos ejercicios); 2) MarketBeat (solo el año en curso y el siguiente); 3) MarketScreener no abre sin sesión', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'causa de la caída de septiembre de 2026', tipo: 'Complemento', intentos: '1) 8-K de la empresa de septiembre (solo directivos); 2) titulares de Seeking Alpha (RSS); 3) noticias de MarketBeat', decision: 'Se explica como rotación y rebajas de objetivo, sin causa concreta' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $MNST (25-sep a 20-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://api.stocktwits.com/api/2/streams/symbol/MNST.json' },
  { id: 2, titulo: 'Seeking Alpha: titulares sobre MNST (jul-oct 2026: «precio completo», «valoración justa», «sin margen de seguridad», «el crecimiento justifica la prima»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://seekingalpha.com/symbol/MNST/analysis' },
  { id: 3, titulo: 'MarketBeat: noticias y comentarios sobre Monster Beverage (ago-oct 2026)', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://www.marketbeat.com/stocks/NASDAQ/MNST/news/' },
];
const E = {
  _estado: 'Completa. Stocktwits (30 mensajes) y titulares de Seeking Alpha; Reddit no abre.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Stocktwits ($MNST)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: '17 mensajes marcados alcistas y ninguno bajista: ven a Monster como refugio («verde mientras la tecnología cae») y esperan buenos resultados del 3T [1].' },
      { plataforma: 'Seeking Alpha (titulares)', fecha: '2026-10', n_comentarios: 8, tono: 'Neutral', resumen: 'Divididos: unos dicen que el crecimiento justifica la prima y otros que el precio está completo y sin margen de seguridad [2].' },
      { plataforma: 'MarketBeat', fecha: '2026-10', n_comentarios: 6, tono: 'Neutral', resumen: 'Cambios de objetivo a la baja (Wells Fargo) y al alza (Zacks); ventas de directivos sin debate [3].' },
    ],
    temas: [
      { tema: 'Refugio defensivo con crecimiento', postura: 'Alcista', peso: 'Alto', contraste: 'Correcto: beta de 0,53 y ventas +20 %; pero el refugio se paga a 36 veces el beneficio [1].' },
      { tema: 'Internacional como motor', postura: 'Alcista', peso: 'Medio', contraste: 'Los datos lo apoyan (+34,6 % fuera de EE. UU. en el 2T26), con margen algo menor [2].' },
      { tema: 'Valoración exigente', postura: 'Bajista', peso: 'Medio', contraste: 'Es el punto clave del informe: el múltiplo está por encima de su mediana adelantada de cinco años [2].' },
      { tema: 'Celsius y Alani Nu', postura: 'Dividida', peso: 'Medio', contraste: 'Alani Nu gana cuota, pero Monster también (+1,1 p.); quien pierde es Red Bull y Celsius [3].' },
    ],
    lectura: 'Sentimiento positivo entre particulares y neutral entre los que escriben análisis: nadie duda del negocio y la discusión es el precio. No hay capitulación ni miedo que aprovechar. No anticipa riesgos que el informe no tenga. Opiniones, no datos: ninguna cifra sale de aquí.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm}`).join(', '));
console.log('BPA histórico en acciones de hoy:', JSON.stringify(bpaHist));

// Notas A-E del análisis de Hermès con corte 2026-10-28, a partir de las del 22-oct (notas/previo/), con cada cifra que cambia
// comprobada de nuevo en su fuente: precio y bolsa (bolsa.json, Yahoo hasta el 27-oct), movimiento (docs/D_movimiento.json),
// consenso tras el 3T26 (docs/D_yahoo_quoteSummary_2026-10-28.json), notas de analistas del 22-23 oct, Bund del 27-oct
// (Bundesbank), BCE del 27-oct, compras de Thod 15 (AMF 2026DD1146121 y 2026DD1146123) y foro de Boursorama.
// Las cuentas (ESEF 2019-2025, idénticas a las del 22-oct) y los ingresos del 3T26 (comunicado de MFN, releído) no cambian.
// Uso: node informes/hermes-2026-10-28/notas/actualizar-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
const escribe = (f, o) => fs.writeFileSync(path.join(DIR, f), JSON.stringify(o, null, 1) + '\n');
const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100;

// ---------------- A y B: sin cambios de cifras (cuentas idénticas; 3T26 releído en el comunicado) ----------------
const A = lee('previo/A.json'); A._estado = 'terminado'; escribe('A.json', A);
const B = lee('previo/B.json'); B._estado = 'terminado'; escribe('B.json', B);

// ---------------- C: compras de Thod 15 del 22 y 23-oct ----------------
const C = lee('previo/C.json');
const nC = C.fuentes.length + 1;
C.fuentes.push({ id: nC, titulo: 'Déclarations 2026DD1146123 (22-oct-2026) y 2026DD1146121 (23-oct-2026): Thod 15, persona jurídica ligada a Dorothée Dumas, miembro del Consejo de Vigilancia', editor: 'AMF (BDIF)', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://bdif.amf-france.org/back/api/v1/informations?RechercheTexte=HERMES%20INTERNATIONAL&TypesInformation=DD&From=0&Size=15' });
C.gobierno.insiders.push(
  { fecha: '2026-10-22', persona: 'Thod 15, sociedad vinculada a Dorothée Dumas (Consejo de Vigilancia)', operacion: 'Compra', acciones: 2000, importe: 2.49 },
  { fecha: '2026-10-23', persona: 'Thod 15, sociedad vinculada a Dorothée Dumas (Consejo de Vigilancia)', operacion: 'Compra', acciones: 2000, importe: 2.51 },
);
C.gobierno.insiders_sin_operaciones = false;
C.gobierno.extra = [...(C.gobierno.extra ?? []), `Tras los ingresos del 3T26, Thod 15 (ligada a Dorothée Dumas, del Consejo de Vigilancia) compró 2.000 acciones a 1.243,46 EUR el 22-oct y 2.000 a 1.254,07 EUR el 23-oct (≈ 5,0 M EUR en total); ninguna venta de dirigentes en 12 meses [${nC}].`];
C._estado = 'terminado';
escribe('C.json', C);

// ---------------- D: mercado, consenso, bolsa, comparables ----------------
const D = lee('previo/D.json');
const bol = lee('bolsa.json');
const mov = lee('docs/D_movimiento.json')['RMS.PA'];
const qs = lee('docs/D_yahoo_quoteSummary_2026-10-28.json').quoteSummary.result[0];
const fd = qs.financialData, tr = qs.earningsTrend.trend, rt = qs.recommendationTrend.trend[0];
const y0 = tr.find((t) => t.period === '0y'), y1 = tr.find((t) => t.period === '+1y');

// Fuentes: se actualizan las de precio, Bund y BCE; se añaden las nuevas al final.
const F = (id) => D.fuentes.find((f) => f.id === id);
Object.assign(F(1), { titulo: 'Históricos diarios de RMS.PA, CAC.PA y GLUX.PA con dividendos (bolsa.mjs, hasta el 27-oct-2026)', fecha: '2026-10-27' });
Object.assign(F(5), { fecha: '2026-10-27' });
Object.assign(F(37), { titulo: 'Tipos de cambio de referencia del euro (27-oct-2026: USD 1,1150; CHF 0,9239; HKD 8,7466)', fecha: '2026-10-27' });
let n = D.fuentes.length;
const nueva = (o) => { D.fuentes.push({ id: ++n, ...o }); return n; };
const fYahoo = nueva({ titulo: 'Hermès International (RMS.PA): financialData, earningsTrend y recommendationTrend (S&P Global), leídos el 28-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-28', url: 'https://query1.finance.yahoo.com/v10/finance/quoteSummary/RMS.PA?modules=financialData,earningsTrend,recommendationTrend' });
const fCortes = nueva({ titulo: 'HERMES INTL Aktie: Analysten senken Kursziele nach Umsatzenttäuschung (LBBW, UBS, Oddo BHF, RBC, Bernstein, Goldman, Berenberg)', editor: 'Goldesel', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://goldesel.de/aktien/news/hermes-intl-aktie-analysten-senken-kursziele-nach-umsatzenttauschung' });
const fDZ = nueva({ titulo: 'HERMES INTL Aktie: Umsatz enttäuscht, DZ Bank senkt Kursziel auf 1.600 Euro', editor: 'Goldesel', tipo: 'Prensa', fecha: '2026-10-22', url: 'https://goldesel.de/aktien/news/hermes-intl-aktie-q3-umsatz-verfehlt-erwartungen-asien-stagniert' });
const fAMF = nueva({ titulo: 'Déclarations des dirigeants 2026DD1146123 y 2026DD1146121 (Thod 15, 22 y 23-oct-2026)', editor: 'AMF (BDIF)', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://bdif.amf-france.org/back/api/v1/informations?RechercheTexte=HERMES%20INTERNATIONAL&TypesInformation=DD&From=0&Size=15' });
const fKer = nueva({ titulo: 'Kering chute de 11 % en Bourse, Gucci recule encore de 6 % au troisième trimestre', editor: 'France Épargne', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://www.france-epargne.fr/news/kering-chute-de-11-en-bourse-gucci-recule-encore-de-6-au-troisieme-trimestre' });
const fMov = nueva({ titulo: 'Movimiento de RMS.PA (movimiento.mjs: 1-12 meses, máximos y mínimos, medias de 50 y 200 sesiones), 28-oct-2026 a las 10:17 de Madrid', editor: 'Yahoo Finance (cálculo del repositorio)', tipo: 'Datos de mercado', fecha: '2026-10-28', url: 'https://finance.yahoo.com/quote/RMS.PA/history' });

// Identificación
const id = bol.identificacion;
Object.assign(D.identificacion, {
  precio: id.precio, fecha_precio: id.fecha_precio, max_52s: id.max_52s, min_52s: id.min_52s,
  volumen_medio_diario: `≈ ${String(Math.round(bol.volumen_3m.importe_dia_millones))} M EUR/día (${bol.volumen_3m.acciones_dia.toLocaleString('es-ES')} acciones, 3 meses)`,
  proximos_resultados: '2027-02-12',
  extra: [
    `Precio: cierre de Euronext París del martes 27-oct-2026, 1.268,50 EUR [1]. La sesión del 28-oct estaba abierta al hacer el análisis (1.275 EUR a las 10:17 de Madrid) [${fMov}]. Cierres tras los ingresos del 3T26: 1.289,5 EUR el 22-oct (−4,9 %), 1.238,5 el 23-oct, 1.278,5 el 26-oct [1].`,
    D.identificacion.extra?.[1] ?? null,
    `Máximo de 52 semanas 2.300 EUR (intradía) el 15-ene-2026; mínimo 1.228 EUR (intradía) el 23-oct-2026, al día siguiente de los ingresos del 3T26 [1].`,
  ].filter(Boolean),
});

// Consenso
const ms = Object.fromEntries(D.consenso.estimaciones.map((e) => [e.periodo, e]));
D.consenso.estimaciones = [
  { periodo: '2026e', ingresos: Math.round(y0.revenueEstimate.avg.raw / 1e6), ebitda: ms['2026e'].ebitda, ebit: ms['2026e'].ebit, bpa: r2(y0.earningsEstimate.avg.raw), dpa: ms['2026e'].dpa, fuente: `Ventas y BPA: S&P Global vía Yahoo, ${y0.earningsEstimate.numberOfAnalysts.raw} analistas, 28-oct-2026, ya con el 3T26 [${fYahoo}]; EBITDA, EBIT y DPA: MarketScreener del 22-oct, anteriores al 3T26 [2]` },
  { periodo: '2027e', ingresos: Math.round(y1.revenueEstimate.avg.raw / 1e6), ebitda: ms['2027e'].ebitda, ebit: ms['2027e'].ebit, bpa: r2(y1.earningsEstimate.avg.raw), dpa: ms['2027e'].dpa, fuente: `Ventas y BPA: S&P Global vía Yahoo, ${y1.earningsEstimate.numberOfAnalysts.raw} analistas, 28-oct-2026 [${fYahoo}]; EBITDA, EBIT y DPA: MarketScreener del 22-oct [2]` },
  { ...ms['2028e'], fuente: 'MarketScreener, 23 analistas, 22-oct-2026, anterior al 3T26 (sin dato gratuito posterior) [2]' },
];
D.consenso.recomendaciones = { n_analistas: rt.strongBuy + rt.buy + rt.hold + rt.sell + rt.strongSell, comprar: rt.strongBuy + rt.buy, mantener: rt.hold, vender: rt.sell + rt.strongSell, po_medio: r2(fd.targetMeanPrice.raw), po_min: fd.targetLowPrice.raw, po_max: fd.targetHighPrice.raw };
const t0 = y0.epsTrend, t1 = y1.epsTrend;
D.consenso.revisiones = `Los analistas recortan tras el 3T26. Según S&P Global, el BPA de 2026e pasa de 44,09 EUR hace 7 días a 43,98 (44,38 hace 90 días) y el de 2027e de 48,65 a 48,15 (51,28 hace 90 días: −6,1 % en tres meses) [${fYahoo}]. El objetivo medio baja a 1.562,78 EUR (1.625,35 el 22-oct en MarketScreener) con un rango de 1.150-1.920 EUR; las recomendaciones pasan de 11 compras, 10 mantener y 1 venta hace un mes a 9, 12 y 2 [${fYahoo}, 3]. Detrás, las notas del 22-23 oct: DZ Bank de 1.800 a 1.600 EUR (Comprar), LBBW de 1.825 a 1.725 (Comprar), Bernstein de 1.750 a 1.480 (Outperform), RBC de 1.600 a 1.500 (Sector Perform), Oddo BHF de 1.470 a 1.373 (Neutral), Goldman de 1.350 a 1.340 (Vender), UBS de 1.168 a 1.150 (Vender) y Berenberg rebaja a Mantener con objetivo de 1.850 a 1.230 [${fCortes}, ${fDZ}]. El motivo común: Asia sin Japón plana en el 3T y menor visibilidad para 2027. El recorte del BPA es pequeño (−1 % en una semana): baja sobre todo el múltiplo que los analistas están dispuestos a pagar.`;
D.consenso.extra = [
  ...(D.consenso.extra ?? []).filter((x) => !/Stock Analysis/.test(x)),
  `S&P Global (Yahoo, 28-oct-2026): ventas 2026e 16.641 M EUR y 2027e 17.920 M; BPA 43,98 y 48,15 EUR; 23 analistas (2 compra fuerte, 7 compra, 12 mantener, 2 vender); objetivo medio 1.562,78 EUR (1.150-1.920) [${fYahoo}].`,
];

// Bolsa
const bb = bol.bolsa;
Object.assign(D.bolsa, {
  tipo_rentabilidad: bb.tipo_rentabilidad, rentabilidades: bb.rentabilidades, anual: bb.anual,
  beta: bb.beta, volatilidad_pct: bb.volatilidad_pct, max_drawdown_pct: bb.max_drawdown_pct, posicion_corta_pct: null,
  comentario: `Hermès pierde un 39,6 % en 2026 con dividendos (hasta el 27-oct), frente al −1,1 % del CAC 40 y el −8,6 % del ETF de lujo mundial: la peor caída de su historia bursátil (−55,5 % desde el máximo del 14-feb-2025 hasta el mínimo del 23-oct-2026) [1]. Las caídas llegan con sus publicaciones y con las notas de analistas: −8,2 % con las ventas del 1T26 (15-abr), −5,9 % el 22-jun por una nota de Kepler Cheuvreux sobre el margen, −11,0 % con el 1S26 (29-jul), −15 % en septiembre entre recortes de objetivo y la entrada de UBS en Vender, y −4,9 % el 22-oct con los ingresos del 3T26 (−8 % en la mañana) [1, 10, 28, 33]. La caída es de múltiplo, no de beneficio: el BPA de los últimos doce meses (43,00 EUR) es casi el de 2024 [9]. Beta mensual a cinco años de 1,44 frente al CAC 40 con dividendos (1,21 la semanal ajustada) [1].`,
  extra: [
    'Rentabilidades y beta con el ETF del CAC 40 con dividendos (CAC.PA) y el ETF de lujo mundial (GLUX.PA), hasta el 27-oct-2026 [1].',
    `Betas frente al CAC 40: mensual 5 años ${bol.betas.mensual_5a}; semanal 5 años ${bol.betas.semanal_5a}; semanal 2 años ${bol.betas.semanal_2a}; ajustadas ${bol.betas.ajustada_mensual_5a} (mensual) y ${bol.betas.ajustada_semanal_5a} (semanal) [1].`,
  ],
});
D.bolsa.contexto = {
  movimiento: { fecha: mov.fecha, var_1m_pct: mov.var_1m_pct, var_3m_pct: mov.var_3m_pct, var_6m_pct: mov.var_6m_pct, var_12m_pct: mov.var_12m_pct, dist_max_52s_pct: mov.dist_max_52s_pct, dist_min_52s_pct: mov.dist_min_52s_pct, dist_max_historico_pct: mov.dist_max_historico_pct, tendencia: mov.tendencia, volatilidad_60d_pct: mov.volatilidad_60d_pct,
    avisos: [`P4 En mínimos de 52 semanas (3 % sobre el mínimo de cierre de 1.238,5 EUR del 23-oct)`, `P5 Un 23 % por debajo de la media de 200 sesiones (1.659 EUR; la de 50, 1.387 EUR): tendencia bajista`] },
  movimientos_fuertes: [
    { periodo: '2026-10-22 y 23', var_pct: -8.7, causa: `Ingresos del 3T26 por debajo de lo esperado: +4,3 % a tipo constante frente al 5,2 %, Asia sin Japón plana, confección y accesorios −2 % [28, 32]. Cierre de 1.289,5 EUR el 22-oct (−4,9 %; −8 % por la mañana) y de 1.238,5 EUR el 23-oct (−4,0 %), con siete bancos recortando objetivo y Berenberg rebajando a Mantener; Kering cayó un 11 % ese día por Gucci (−6 % en el 3T) [1, ${fCortes}, ${fKer}]. Rebote al 26-oct (1.278,5) [1]. La causa está en la tesis (China, frenazo de 2026) y en los supuestos del informe del 22-oct.`, veredicto: 'no cambia', condicion: null },
    { periodo: 'sep-2026 (2-sep a 1-oct)', var_pct: -15, causa: 'Recortes de objetivo de Bernstein, RBC, Oddo, LBBW (21-22 sep), Citi y HSBC (30-sep), y el impuesto chino sobre los fideicomisos en el extranjero (anuncio n.º 21 de 24-jul) como lastre de la demanda de los clientes chinos ricos [10, 32]. Mayor caída de un mes de los últimos seis.', veredicto: 'no cambia', condicion: null },
    { periodo: '2026-07-29', var_pct: -11, causa: 'Resultados del 1S26: ventas +6,1 % a tipo constante con Asia sin Japón +2,5 % en el 2T frente al +4 % esperado, BPA algo inferior al consenso y comentarios sobre subidas de precio menores en 2027 [9, 11].', veredicto: 'no cambia', condicion: null },
    { periodo: '2026-06-22', var_pct: -5.9, causa: 'Nota de Kepler Cheuvreux que anticipaba 100 puntos básicos menos de margen en el 1S26; al día siguiente HSBC rebajó a Mantener (2.100 → 1.870 EUR) [33, 34]. El margen del 1S26 quedó en el 41,0 %, 0,4 puntos menos [9].', veredicto: 'no cambia', condicion: null },
    { periodo: '2026-05-18 a 2026-06-16', var_pct: 10.7, causa: 'Mayor subida de un mes de los últimos seis; sin noticia propia identificada (es una subida: no cambia el veredicto) [1].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-10-23', tipo: 'directivos', hecho: `Thod 15, sociedad ligada a Dorothée Dumas (Consejo de Vigilancia), compra 2.000 acciones a 1.243,46 EUR el 22-oct y 2.000 a 1.254,07 EUR el 23-oct (≈ 5,0 M EUR), tras los ingresos; en 12 meses, solo compras de la familia y del consejo [${fAMF}, 35].`, veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-23', tipo: 'recomendación', hecho: `Tras el 3T26 recortan objetivo DZ Bank (1.600, Comprar), LBBW (1.725, Comprar), Bernstein (1.480, Outperform), RBC (1.500, Sector Perform), Oddo BHF (1.373, Neutral), Goldman (1.340, Vender) y UBS (1.150, Vender); Berenberg rebaja a Mantener con 1.230 EUR [${fCortes}, ${fDZ}]. Objetivo medio 1.562,78 EUR (23 analistas) [${fYahoo}].`, veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-23', tipo: 'resultados', hecho: `Kering cae un 11 % con el 3T26: Gucci −6 %; el sector sigue sin China [${fKer}]. LVMH (12-oct) creció un 1 % orgánico, con moda y marroquinería −5 % [32].`, veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-22', tipo: 'resultados', hecho: 'Ingresos de los nueve meses: 12.260 M EUR (+5,5 % a tipo constante, +2,9 % publicado); 3T26 4.096 M (+4,3 % a tipo constante), por debajo del 5,2 % esperado. Asia sin Japón 0,0 % en el trimestre; Japón +9,6 %; América +8,8 %; Europa sin Francia +9,5 %; marroquinería +10,8 %; confección y accesorios −2,0 %; relojes −6,0 %. Sin cifras de guía: repite el «objetivo ambicioso» a medio plazo [28].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-05', tipo: 'recomendación', hecho: 'UBS inicia con Vender y objetivo de 1.168 EUR; Goldman Sachs mantiene Vender [3, 10].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-09-30', tipo: 'recomendación', hecho: 'Citi y HSBC bajan su objetivo; antes, RBC (22-sep) y Bernstein (21-sep, por la demanda china) [3, 10].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-07-24', tipo: 'demanda o regulador', hecho: 'China grava las aportaciones a fideicomisos en el extranjero y sus rentas (anuncio n.º 21 de 2026, 20 % sobre la plusvalía latente); el plazo de gracia venció el 22-oct. Lastra la demanda de los clientes chinos con más patrimonio [32].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-06-23', tipo: 'recomendación', hecho: 'HSBC rebaja de Comprar a Mantener (objetivo de 2.100 a 1.870 EUR) [34].', veredicto: 'no cambia', condicion: null },
    { fecha: '2027-02-12', tipo: 'resultados', hecho: 'Próximos resultados: ejercicio 2026, 12-feb-2027 (calendario financiero del comunicado del 3T26) [28].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: '2027-02-12',
  veredicto: 'no cambia',
  condicion: null,
  comentario: `La acción cae un 40,7 % en doce meses y cotiza un 23 % por debajo de su media de 200 sesiones, a un 3 % de su mínimo de 52 semanas: tendencia bajista, con caídas en cada publicación y en las notas sobre China [1, ${fMov}]. El hecho pendiente del informe anterior, los ingresos del 3T26, ya está en el precio: −8,7 % en dos sesiones, siete recortes de objetivo y una rebaja [${fCortes}]. No hay colocaciones, ampliaciones, ofertas ni ventas de la familia; al contrario, Thod 15 compró ≈ 5 M EUR el 22 y 23-oct [${fAMF}]. Nada pendiente puede mover el precio más de un 5 % antes del 12-feb-2027 salvo el sector (Richemont publica el semestre en noviembre). Veredicto: no cambia.`,
};

// Comparables: estimaciones de MarketScreener del 21-oct (las del informe del 22-oct, sin revisión gratuita posterior salvo la de Kering,
// cuyo 26-oct coincide), llevadas al cierre del 27-oct de Yahoo y al BCE del 27-oct (CHF 0,9239; HKD 8,8155 → 8,7466).
const CMP = [
  { n: 'LVMH', t: 'MC.PA', p: 'FR', px: 388.25, sh: 493099, l: { v: 80807, e: 25756, dn: 27567, fcf: 11333 }, a1: { v: 80474, e: 24017, bpa: 22.01 }, a2: { v: 84269, e: 25517, bpa: 23.94 }, w: 2 / 12, m: 22 },
  { n: 'Kering', t: 'KER.PA', p: 'FR', px: 179.5, sh: 122618, l: { v: 14675, e: 3675, dn: 8039, fcf: 2300 }, a1: { v: 14555, e: 3763, bpa: 5.035 }, a2: { v: 15456, e: 4144, bpa: 8.842 }, w: 2 / 12, m: 22 },
  { n: 'Richemont', t: 'CFR.SW', p: 'CH', px: 164.15 / 0.9239, sh: 588340, l: { v: 22420, e: 6101, dn: -8496, fcf: 3918 }, a1: { v: 25206, e: 7178, bpa: 7.45 }, a2: { v: 27200, e: 8047, bpa: 8.584 }, w: 5 / 12, m: 19 },
  { n: 'Prada', t: '1913.HK', p: 'IT', px: 37.22 / 8.7466, sh: 2558824, l: { v: 5718, e: 2139, dn: 3563, fcf: 1043 }, a1: { v: 6401, e: 2131, bpa: 0.2961 }, a2: { v: 6717, e: 2290, bpa: 0.3294 }, w: 2 / 12, m: 22 },
  { n: 'Brunello Cucinelli', t: 'BC.MI', p: 'IT', px: 85.38, sh: 68000, l: { v: 1408, e: 416.5, dn: 983, fcf: 100.9 }, a1: { v: 1549, e: 462.6, bpa: 2.272 }, a2: { v: 1720, e: 514.9, bpa: 2.629 }, w: 2 / 12, m: 22 },
  { n: 'Moncler', t: 'MONC.MI', p: 'IT', px: 42.12, sh: 271598, l: { v: 3132, e: 1283, dn: -1458, fcf: 529 }, a1: { v: 3236, e: 1302, bpa: 2.352 }, a2: { v: 3466, e: 1419, bpa: 2.552 }, w: 2 / 12, m: 22 },
  { n: "L'Oréal", t: 'OR.PA', p: 'FR', px: 430.1, sh: 532387, l: { v: 44052, e: 10709, dn: 2051, fcf: 7167 }, a1: { v: 47035, e: 11358, bpa: 13.04 }, a2: { v: 50027, e: 12242, bpa: 14.53 }, w: 2 / 12, m: 22 },
];
D.comparables.empresas = CMP.map((c) => {
  const cap = (c.px * c.sh) / 1000, ev = cap + c.l.dn, nt = (k) => c.w * c.a1[k] + (1 - c.w) * c.a2[k];
  return { nombre: c.n, ticker: c.t, pais: c.p, capitalizacion: Math.round(cap), ev_ventas: r2(ev / c.l.v), ev_ebitda_ltm: r1(ev / c.l.e), ev_ebitda_ntm: r1(ev / nt('e')), per_ntm: r1(c.px / nt('bpa')),
    crecimiento_pct: r1((Math.pow(nt('v') / c.l.v, 12 / c.m) - 1) * 100), margen_ebitda_pct: r1((c.l.e / c.l.v) * 100), roic_pct: null, dn_ebitda: r2(c.l.dn / c.l.e), fcf_yield_pct: r1((c.l.fcf / cap) * 100) };
});
D.comparables.criterio = D.comparables.criterio.replace(/al cierre del 21-oct convertido a euros con el BCE \(Prada, cierre del 20-oct en Hong Kong\) \[12-18, 37\]\./, 'llevadas al cierre del 27-oct-2026 (Yahoo) y convertidas a euros con el BCE del 27-oct [1, 12-18, 37]. Kering cayó un 17 % entre el cierre del 21 y el del 27-oct, con su 3T26, sin que su consenso gratuito haya cambiado aún: su PER de los próximos 12 meses baja a ≈ 22x [' + fKer + '].');

// Puente y WACC: mismo balance (30-jun-2026); Bund del 27-oct.
D.valoracion.extra = [
  D.valoracion.extra[0],
  `WACC, datos de mercado: Bund a 10 años (Bundesbank, curva de rendimientos, vida residual 10 años) 3,42 % el 27-oct-2026 (3,47 % el 21-oct) [5]. Prima implícita de Damodaran, oct-2026: 4,20 % [6]. Beta: 1,21-1,44 frente al CAC 40 con dividendos según frecuencia y ajuste [1]. Sin deuda financiera: coste de la deuda ≈ tipo de los arrendamientos (2,4 %) [9].`,
  `Consenso para objetivo_12m.consenso (solo contraste): BPA 2026e 43,98 y 2027e 48,15 EUR; objetivo medio 1.562,78 EUR (1.150-1.920), 23 analistas, tendencia de 3 meses: recortes [${fYahoo}].`,
];
D.huecos = D.huecos.filter((h) => h.campo !== 'Consenso revisado tras los ingresos del 3T26');
D._estado = 'terminado';
escribe('D.json', D);

// ---------------- E: foro de Boursorama del 22 al 25-oct ----------------
const E = lee('previo/E.json');
const nE = E.fuentes.length + 1;
E.fuentes.push({ id: nE, titulo: 'Forum HERMES INTL (RMS): lista de hilos, 22-25 oct-2026', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-10-28', url: 'https://www.boursorama.com/bourse/forum/1rPRMS/' });
E.sentimiento.revisadas.unshift({ plataforma: 'Boursorama, foro de Hermès: hilos del 22 al 25-oct-2026 (tras los ingresos del 3T26)', fecha: '2026-10', n_comentarios: 40, tono: 'Negativo', resumen: `Los títulos de los hilos marcan el tono: la acción «a evitar», «nadie la quiere» y objetivos de 800-1.000 EUR, junto a un debate sobre si un PER de 30 sigue siendo caro (para unos, sí; para otros, «la buena noticia es que el PER baja»). Una minoría dice haber comprado en la caída [${nE}].` });
E.sentimiento.lectura = `${E.sentimiento.lectura} Tras el 3T26 el tono no cambia: sigue la capitulación irónica y el debate pasa del crecimiento al múltiplo (si 30 veces beneficios es aún caro), que es justo la pregunta de la valoración [${nE}].`;
E._estado = 'terminado';
escribe('E.json', E);
console.log('Notas A-E escritas. Fuentes nuevas de D:', { fYahoo, fCortes, fDZ, fAMF, fKer, fMov }, 'C:', nC, 'E:', nE);
console.log('Comparables:'); console.table(D.comparables.empresas.map((e) => ({ n: e.nombre, cap: e.capitalizacion, per: e.per_ntm, evn: e.ev_ebitda_ntm })));

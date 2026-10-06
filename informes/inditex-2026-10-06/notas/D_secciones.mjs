// Secciones del agente D que se añaden a D.json desde D_construir.mjs: consenso, multiplos_historicos, comparables, wacc, puente_mercado, transacciones.
import { readFileSync, existsSync } from 'node:fs';
export default function (D, { B, rd, r, es }) {
  const F = D.fuentes; const add = f => { const id = F.length + 1; F.push({ id, ...f }); return id; };
  const H = D.huecos;

  // ---------- consenso ----------
  const fWb1 = add({ titulo: 'INDITEX: Financials (copia de Wayback Machine del 18-abr-2026)', editor: 'MarketScreener (vía web.archive.org)', tipo: 'Datos de mercado', fecha: '2026-04-18', url: 'https://web.archive.org/web/20260418041810/https://www.marketscreener.com/quote/stock/INDITEX-16943135/finances/' });
  const fWb2 = add({ titulo: 'INDITEX: Financials (copia de Wayback Machine del 13-mar-2025)', editor: 'MarketScreener (vía web.archive.org)', tipo: 'Datos de mercado', fecha: '2025-03-13', url: 'https://web.archive.org/web/20250313130854/https://www.marketscreener.com/quote/stock/INDITEX-16943135/finances/' });
  D.consenso = {
    guidance: null,
    estimaciones: [
      { periodo: 'FY2026e', ingresos: 42930, ebitda: 12050, ebit: 8667, bpa: 2.165, dpa: 1.931, fuente: 'MarketScreener [7], consenso de 24 analistas (feb-2026 a ene-2027); Stock Analysis/S&P Global da las mismas ventas (42.930) y BPA (2,17) con 22 analistas [8]' },
      { periodo: 'FY2027e', ingresos: 46150, ebitda: 13053, ebit: 9446, bpa: 2.365, dpa: 2.096, fuente: 'MarketScreener [7], consenso de 24 analistas (feb-2027 a ene-2028); Stock Analysis: ventas 46.150 y BPA 2,37 [8]' },
      { periodo: 'FY2028e', ingresos: 49407, ebitda: 14059, ebit: 10225, bpa: 2.566, dpa: 2.275, fuente: 'MarketScreener [7], consenso de 24 analistas (feb-2028 a ene-2029); Stock Analysis no da este año gratis [8]' },
    ],
    recomendaciones: { n_analistas: 24, comprar: 20, mantener: 3, vender: 1, po_medio: 60.39, po_min: 41.50, po_max: 67.00 },
    revisiones: null,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
    extra: [
      'MarketScreener etiqueta los ejercicios por el año en que acaban: su «2027» es el FY2026 de Inditex (feb-2026 a ene-2027), «2028» = FY2027e y «2029» = FY2028e. Su «2026» es el FY2025 real: ventas 39.864, EBITDA 11.267, EBIT 7.997 y BPA 2,00, idénticos a las cuentas publicadas (39.864 / 11.267 / 7.997 / 1,996) [5, 7].',
      'Base del EBITDA: NIIF. El EBITDA real que usa MarketScreener (11.267 M en FY2025) es el EBITDA publicado por Inditex, que incluye el efecto de la NIIF 16 (los alquileres fijos no restan; amortización de derechos de uso por debajo) [5, 7]. Inditex no publica un EBITDA ajustado; ajuste_ebitda_pct_ventas = null.',
      'Crecimientos implícitos del consenso: ventas +7,7 % en FY2026e, +7,5 % en FY2027e y +7,1 % en FY2028e; margen EBITDA 28,1 %, 28,3 % y 28,5 %; margen EBIT 20,2 %, 20,5 % y 20,7 % [7]. En el 1S26 las ventas crecieron un 7,6 % (9,2 % a tipo constante) y el margen EBITDA fue del 27,9 % [4].',
      'Dividendo por acción del consenso: 1,931 / 2,096 / 2,275 EUR, un reparto del 89 % del BPA [7]. El dividendo FY2025 fue de 1,75 EUR (1,20 ordinario + 0,55 extraordinario) [5].',
      'Recomendaciones (Stock Analysis, S&P Global, sep-2026): 13 compra fuerte, 7 compra, 3 mantener, 0 vender y 1 venta fuerte, 24 en total [8]. Evolución: abr-2026 17 compra (13+4), 6 mantener y 1 vender; may 18/5/1; jun 19/4/1; jul y ago 20/3/1; sep 20/3/1 (la venta pasa de «vender» a «venta fuerte») [8]. MarketScreener: 24 analistas, consenso «BUY» [6].',
      'Precio objetivo: medio 60,39 EUR, mediana 61,00, mínimo 41,50 y máximo 67,00, idéntico en MarketScreener y Stock Analysis (potencial del 12,2 % sobre 53,82) [6, 8]. El 18-abr-2026 el precio objetivo medio de MarketScreener era 58,40 EUR con el mismo número de analistas (24) [' + fWb1 + '].',
      'Últimos cambios de analistas tras los resultados del 1S26 (Stock Analysis/TipRanks): RBC mantiene compra y 63 EUR (21-sep); UBS compra y 62 EUR (15-sep); Barclays compra, de 62,50 a 61 EUR (14-sep); Morgan Stanley compra, de 62 a 64 EUR (11-sep); Citi compra y 61 EUR (11-sep) [8]. MarketScreener recoge además compra de Jefferies, Berenberg, Deutsche Bank, JP Morgan y DZ Bank en las mismas semanas [6].',
      'Revisiones (MarketScreener no publica gratis la serie de revisiones a 3 y 12 meses; se comparan copias archivadas de su página de estimaciones): desde el 18-abr-2026 (≈ 6 meses, tras los resultados anuales) el consenso de FY2026e pasó de 42.744 a 42.930 M en ventas (+0,4 %), de 12.031 a 12.050 M en EBITDA (+0,2 %), de 8.693 a 8.667 M en EBIT (-0,3 %) y de 2,188 a 2,165 EUR en BPA (-1,1 %); FY2027e: BPA de 2,379 a 2,365 (-0,6 %), ventas de 45.812 a 46.150 (+0,7 %) [7, ' + fWb1 + '].',
      'A 19 meses (13-mar-2025, antes de los resultados de FY2024): el consenso de FY2026e era de 44.790 M en ventas, 12.456 M en EBITDA y 2,238 EUR de BPA; hoy es 4,2 %, 3,3 % y 3,3 % más bajo. El de FY2025 era de 41.607 / 11.523 / 2,034 y el real fue 39.864 / 11.267 / 1,996 (ventas un 4,2 % por debajo; el FY2025 creció un 3,2 % en euros con un fuerte impacto de divisa) [5, 7, ' + fWb2 + '].',
      'Deuda neta en MarketScreener: caja neta de 10.958 M en FY2025 (excluye arrendamientos: 5.276 de caja + 5.684 de inversiones financieras - 2 de deuda) [5, 7]; para FY2026e da una caja neta de solo 5.465 M y para FY2027e de 6.565 M, una caída que no casa con un flujo libre estimado de 6.087 M y un dividendo de ≈ 6.000 M: probablemente mezcla analistas que incluyen arrendamientos en la deuda. No usar esa línea.',
      'Hechos para la guía (no redactada aquí): para 2026 Inditex espera un margen bruto estable (+/-50 pb), crecimiento de la superficie bruta de ≈ 5 %, impacto de divisa en ventas de ≈ -1 %, capex ordinario de ≈ 2.300 M más ≈ 200 M extraordinarios en sedes corporativas; ventas a tipo constante del 1-ago al 7-sep de 2026 +9 % (9-sep-2026) [4].',
    ],
  };
  H.push({ seccion: 'consenso', campo: 'revisiones de BPA y EBITDA a 3 y 12 meses exactos', tipo: 'Complemento', intentos: '1) MarketScreener «consensus-revisions»: cifras solo para suscriptores; 2) Stock Analysis (S&P Global): solo tendencia de recomendaciones, sin serie de estimaciones; 3) copias de Wayback Machine de la página de estimaciones de MarketScreener: hay del 18-abr-2026 y del 13-mar-2025, no de jul-2026 ni de oct-2025', decision: 'Calculado y marcado como estimación' });

  // ---------- multiplos_historicos ----------
  const fVal = add({ titulo: 'INDITEX: Valuation (múltiplos por ejercicio con el precio de cierre de cada ejercicio)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.marketscreener.com/quote/stock/INDITEX-16943135/valuation/' });
  const C = B.cierres_ejercicio;
  D.multiplos_historicos = {
    serie: Object.entries(C).filter(([k]) => k >= 'FY2016').map(([k, v]) => ({ anio: k, precio_cierre: v[1], ev_ebitda_ntm: null, per_ntm: null })),
    comentario: null,
    confianza: 'Alta',
    extra: [
      'Precio de cierre de cada ejercicio: último cierre en o antes del 31 de enero siguiente (FY2016 = 31-ene-2017 ... FY2025 = 30-ene-2026), de Yahoo Finance (precio sin ajustar por dividendos; Inditex no ha hecho splits desde 2014) [1]: ' + Object.entries(C).filter(([k]) => k >= 'FY2016').map(([k, v]) => `${k} ${es(v[1])} (${v[0]})`).join('; ') + '. Cuadran con los «precios de referencia» de MarketScreener de FY2021-FY2025 (26,74 / 28,62 / 39,71 / 52,72 / 55,00) [' + fVal + '].',
      'Ningún proveedor gratuito publica la serie de múltiplos NTM (con el consenso de cada momento): ev_ebitda_ntm y per_ntm se dejan a null.',
      'MarketScreener sí publica múltiplos de cada ejercicio con su precio de cierre y sus cifras reales (definición: valor empresa = capitalización + deuda neta financiera SIN arrendamientos, es decir, restando la caja neta; PER = precio / BPA del ejercicio) [' + fVal + ']: EV/EBITDA FY2021 10,3x, FY2022 9,1x, FY2023 11,4x, FY2024 14,2x, FY2025 14,2x; PER 25,7x, 21,6x, 23,0x, 28,0x y 27,5x; EV/ventas 2,67x, 2,43x, 3,12x, 3,95x y 4,02x; rentabilidad por dividendo 3,48 %, 4,19 %, 3,88 %, 3,19 % y 3,18 %. Al precio de referencia de 53,00 EUR: EV/EBITDA 13,2x FY2026e, 12,1x FY2027e y 11,2x FY2028e; PER 24,5x, 22,4x y 20,7x [' + fVal + '].',
      'Capitalización a cierre de ejercicio según MarketScreener: 83.293 M (FY2021), 89.057 (FY2022), 123.620 (FY2023), 164.209 (FY2024) y 171.311 M (FY2025) [' + fVal + '].',
    ],
  };
  H.push({ seccion: 'multiplos_historicos', campo: 'ev_ebitda_ntm y per_ntm históricos', tipo: 'Complemento', intentos: '1) MarketScreener /valuation/: solo múltiplos del ejercicio con cifras reales (no NTM); 2) Stock Analysis: «forward PE» por año solo con la definición de su proveedor y sin EV/EBITDA NTM; 3) reconstruir el consenso histórico: no hay serie gratuita de estimaciones pasadas', decision: 'Omitido' });

  // ---------- comparables ----------
  const comps = rd('./comps.json');
  const fSA = add({ titulo: 'Statistics & Valuation Metrics de H&M (STO:HM.B), Fast Retailing (TYO:9983), TJX, Ross Stores, Next (LON:NXT), ABF (LON:ABF), Zalando (ETR:ZAL), Gap y Lululemon', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://stockanalysis.com/stocks/tjx/statistics/' });
  const fMS = add({ titulo: 'Financials, forecasts and estimates (finances) de H&M, Fast Retailing, TJX, Ross Stores, Next, ABF, Zalando, Gap y Lululemon', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.marketscreener.com/quote/stock/HENNES-MAURITZ-AB-6491104/finances/' });
  const fSEC = add({ titulo: 'XBRL companyfacts (10-K y 10-Q): OperatingLeaseCost y pasivos por arrendamiento operativo de TJX, Ross Stores, Gap y Lululemon', editor: 'SEC (EDGAR)', tipo: 'Primaria', fecha: '2026-09', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000109198.json' });
  const fBCE = add({ titulo: 'Tipos de cambio de referencia del euro, 6-oct-2026', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' });
  D.comparables = {
    criterio: null,
    empresas: comps.map(({ _datos, ...c }) => c),
    comentario: null,
    confianza: 'Media',
    extra: [
      `Muestra (9): los grandes distribuidores de moda con tienda propia y marca propia (H&M, Fast Retailing/Uniqlo, Next, Gap), los de precio rebajado estadounidenses que el mercado usa como referencia de calidad en distribución de ropa (TJX, Ross), Primark a través de ABF, la distribución online europea (Zalando) y una marca vertical de ropa deportiva (Lululemon) [${fSA}, ${fMS}].`,
      'Quedan fuera: Mango (no cotiza), Shein (no cotiza), Primark sola (no cotiza separada), Kering/LVMH (lujo, otro modelo de margen y precio), Nike/adidas (marcas mayoristas), Burlington, Abercrombie, Urban Outfitters, LPP (más pequeñas o con menos cobertura gratuita; LPP sería la alternativa europea más cercana en modelo).',
      'ABF es un conglomerado: Primark aporta aproximadamente la mitad de las ventas y el resto es alimentación, azúcar, ingredientes y agricultura, así que sus múltiplos no son los de un distribuidor de moda puro. Zalando es una plataforma online con un margen EBITDA del ≈ 8 %. Gap y Lululemon cotizan con múltiplos deprimidos por ventas estancadas o en caída.',
      `Fuentes por dato: ventas, EBITDA y BPA (reales y estimados) de MarketScreener, el mismo proveedor para LTM y NTM [${fMS}]; capitalización, valor empresa, ROIC y rentabilidad por FCF de Stock Analysis [${fSA}]; tipos de cambio del BCE del 6-oct-2026 (USD 1,1269; JPY 178,15; GBP 0,8488; SEK 11,2425) [${fBCE}]. Script reproducible: notas/comps.mjs (salida comps.json).`,
      `Homogeneización NIIF 16 / US GAAP (estimación propia): las europeas y Fast Retailing presentan en NIIF 16 (EBITDA antes de alquileres fijos), igual que Inditex. TJX, Ross, Gap y Lululemon presentan en US GAAP, donde el alquiler operativo resta en el EBITDA: se le suma el coste fijo de arrendamientos operativos del último 10-K (TJX 2.196 M USD, 3,6 % de las ventas; Ross 843 M, 3,7 %; Gap 907 M, 5,9 %; Lululemon 406 M, 3,7 %), en % de ventas aplicado a LTM y NTM [${fSEC}]. El valor empresa de Stock Analysis incluye los pasivos por arrendamiento en la deuda para todas (comprobado: TJX 14,32 mil M USD de deuda total = 1,87 de deuda + 11,45 de arrendamientos + parte corriente; Ross 4,74 = 1,02 + 3,72; Gap 5,72 = 1,49 + 4,23; Lululemon 2,14 = 2,14 de arrendamientos) [${fSA}, ${fSEC}]. Así, EV/EBITDA y DN/EBITDA miden lo mismo que en Inditex. Los múltiplos sin homogeneizar están en _nota de cada empresa.`,
      'dn_ebitda = (valor empresa - capitalización de Stock Analysis, es decir, deuda neta con arrendamientos) / EBITDA homogéneo del último ejercicio cerrado. margen_ebitda_pct = EBITDA homogéneo / ventas del último ejercicio cerrado (MarketScreener).',
      'ROIC y rentabilidad por FCF son de Stock Analysis con su definición (FCF = flujo de explotación - capex). Ojo: en NIIF 16 el principal de los arrendamientos va en financiación, así que el FCF de las europeas y de Fast Retailing no descuenta los alquileres, y el de las americanas sí: la rentabilidad por FCF de las europeas está inflada frente a la de las americanas. Inditex en Stock Analysis: ROIC 46,19 %, rentabilidad por FCF 5,01 % (FCF 8.270 M, antes de ≈ 1.900 M de pagos de arrendamientos) [9].',
      'Precios: cierre del 6-oct-2026 en Europa y Japón; las americanas, cotización intradía del 6-oct (≈ 15:40 EDT, mercado abierto) [' + fSA + '].',
      'Fast Retailing y ABF tienen cerrado un ejercicio que aún no han publicado (ago-2026 y sep-2026): su LTM usa el último trimestre publicado y su NTM salta al ejercicio siguiente (detalle en _nota).',
      'Gap: el BPA de su ejercicio a ene-2027 incluye un extraordinario (beneficio neto estimado de 1.382 M frente a 816 y 937 M en los años vecinos), lo que abarata su PER NTM (8,0x) [' + fMS + '].',
      'Para comparar, Inditex en Stock Analysis: capitalización 165.100 M EUR (con el cierre del 5-oct), valor empresa 160.890 M (con 6.200 M de arrendamientos y 10.400 M de caja), EV/EBITDA 14,0x con su EBITDA post-alquiler [9]; con el EBITDA NIIF 16 de MarketScreener (LTM ≈ 0,5·11.267 + 0,5·12.050 = 11.659 M) el EV/EBITDA LTM sería ≈ 13,8x (el motor lo calcula con el puente propio).',
    ],
  };

  // ---------- wacc ----------
  const fTEes = add({ titulo: 'Spain 10Y Bond Yield', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://tradingeconomics.com/spain/government-bond-yield' });
  const fTEde = add({ titulo: 'Germany 10Y Bond Yield', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://tradingeconomics.com/germany/government-bond-yield' });
  const fCNes = add({ titulo: 'Spain 10 Year Bond (ES10Y-ES)', editor: 'CNBC', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.cnbc.com/quotes/ES10Y-ES' });
  const fCNde = add({ titulo: 'Germany 10 Year Bond (DE10Y-DE)', editor: 'CNBC', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.cnbc.com/quotes/DE10Y-DE' });
  const fDam = add({ titulo: 'Country Default Spreads and Risk Premiums (actualización de enero de 2026)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Analistas', fecha: '2026-01-05', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html' });
  D.wacc = {
    tasa_libre_pct: 4.10,
    tasa_libre_fuente: `Bono español a 10 años el 6-oct-2026: 4,10 % (Trading Economics, «eased to 4.10% on October 6, 2026») [${fTEes}]; 4,1036 % (CNBC, último dato 19:42 UTC; cierre anterior 4,0784 %) [${fCNes}]`,
    bund_10a_pct: 3.49,
    bund_fuente: `Bund alemán a 10 años el 6-oct-2026: 3,49 % (Trading Economics) [${fTEde}]; 3,4852 % (CNBC; cierre anterior 3,4813 %) [${fCNde}]`,
    beta: B.beta.ibex_precio_5a.beta,
    beta_metodo: `Beta bruta (sin ajustar) calculada con 60 rentabilidades mensuales de precio de ITX frente al IBEX 35, oct-2021 a sep-2026, cierres de Yahoo [1]: ${es(B.beta.ibex_precio_5a.beta)} (R² ${es(B.beta.ibex_precio_5a.r2)}); ajustada de Blume (0,67·b + 0,33): ${es(B.beta.ibex_precio_5a.ajustada_blume)}. Frente al EURO STOXX 50: ${es(B.beta.sx5e_precio_5a.beta)} (Blume ${es(B.beta.sx5e_precio_5a.ajustada_blume)}). Stock Analysis publica 0,96 (5 años, índice no indicado) [9]. Inditex no tiene deuda financiera (caja neta de 10.398 M a 31-jul-2026) [4]: beta apalancada = desapalancada.`,
    prima_mercado_pct: 4.23,
    prima_mercado_fuente: `Damodaran, enero de 2026 (última actualización publicada de la página, 5-ene-2026): prima de un mercado maduro 4,23 % (la de Alemania, Aaa); España (A3) 5,78 %, con una prima país de 1,55 % sobre un diferencial de impago de 1,02 %; Estados Unidos 4,46 % [${fDam}]. No hay actualización de julio de 2026 en la página.`,
    extra: [
      `Diferencial España-Alemania a 10 años: ≈ 61 pb (4,10 - 3,49) [${fTEes}, ${fTEde}]. Trading Economics: el bono español toca máximos desde 2013-2014 (4,13 % intradía) tras la convocatoria de elecciones anticipadas para el 29-nov-2026; el Bund retrocede desde máximos de 17 años; el mercado descuenta otra subida del BCE antes de fin de año y la inflación de la eurozona está en 3,8 % [${fTEes}, ${fTEde}].`,
      'Para Inditex, con el 15,6 % de las ventas en España (1S26) [4], la tasa libre del Bund más una prima de mercado madura y la del bono español con la prima de Damodaran para España dan costes del capital muy distintos: decisión del analista principal.',
      `Coste de la deuda: Inditex no tiene deuda financiera (1 M a 31-jul-2026); los costes financieros de arrendamientos fueron 111 M en el 1S26 sobre ≈ 6.200 M de pasivos (≈ 3,6 % anualizado, estimación propia) [4].`,
    ],
  };

  // ---------- puente (lo completa A) ----------
  D.puente_mercado = {
    fecha: '2026-07-31', deuda_financiera: 1, arrendamientos: 6197, caja: 10399, minoritarios: 0, pensiones: null, asociadas: null, otros_ajustes: null,
    extra: [
      'Balance consolidado a 31-jul-2026 (anexos del 1S26) [4]: deuda financiera corriente 1 M y no corriente 0; pasivos por arrendamiento 4.549 M no corrientes + 1.648 M corrientes = 6.197 M; caja y equivalentes 4.361 M + inversiones financieras corrientes 6.038 M = 10.399 M; patrimonio atribuido a la dominante 17.855 M = patrimonio total (sin minoritarios). Posición financiera neta publicada: 10.398 M [4].',
      'Asociadas: Inditex tiene el 50 % del grupo Tempe (calzado), por puesta en equivalencia, dentro de «inversiones financieras» no corrientes (502 M a 31-jul-2026 en total) [2, 4]; el resultado por puesta en equivalencia fue 52 M en el 1S26 [4]. El importe exacto de la participación lo completa A.',
      'Pensiones: el grupo no mantiene, como regla general, planes de prestación definida (nota de las cuentas) [2]; importe a confirmar por A.',
      'Dividendo pendiente: 0,875 EUR por acción (≈ 2.725 M) se paga el 2-nov-2026, después del corte; a 31-jul-2026 estaba aprobado por la junta y probablemente registrado como pasivo dentro de «acreedores» (a confirmar por A).',
    ],
  };

  // ---------- transacciones ----------
  const T = existsSync(new URL('./D_transacciones.json', import.meta.url)) ? rd('./D_transacciones.json') : null;
  if (T) {
    const map = {}; for (const f of T.fuentes) map[f.k] = add({ titulo: f.titulo, editor: f.editor, tipo: f.tipo, fecha: f.fecha, url: f.url });
    const cite = s => s.replace(/\{(\w+)\}/g, (_, k) => map[k]);
    D.transacciones = { operaciones: T.operaciones.map(o => ({ ...o, comentario: cite(o.comentario) })), comentario: null, confianza: T.confianza, extra: T.extra.map(cite) };
    if (T.huecos) H.push(...T.huecos);
  }
}

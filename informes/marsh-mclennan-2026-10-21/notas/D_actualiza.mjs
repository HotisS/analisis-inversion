// Actualiza la nota D de Marsh al corte del 21-oct-2026 (tras el 3T26). Se ejecuta una vez sobre la copia del 14-oct.
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
const dir = path.dirname(fileURLToPath(import.meta.url));
const ruta = path.join(dir, 'D.json');
const D = JSON.parse(fs.readFileSync(ruta, 'utf8'));
const B = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));

// ---------- Fuentes: actualizar las que se han vuelto a leer y añadir las nuevas ----------
const F = Object.fromEntries(D.fuentes.map((f) => [f.id, f]));
F[1].titulo = 'Históricos diarios de MRSH, ^GSPC e IAK (precio, rango, volumen, beta, rentabilidades, cierres anuales, movimiento a 1-12 meses)';
F[1].fecha = '2026-10-20';
F[2].titulo = 'Marsh & McLennan Companies: Financial Data, Forecasts, Estimates (consulta del 20-oct-2026, tras el 3T26)';
F[2].fecha = '2026-10-20';
F[3].titulo = 'Marsh & McLennan Companies: consensus and target prices (23 analistas; cambios de objetivo de octubre de 2026)';
F[3].fecha = '2026-10-20';
F[4].titulo = 'MRSH stock forecast (23 analistas: 5 compra fuerte, 2 compra, 15 mantener, 1 venta; objetivo medio 204,52; BPA ajustado 2026)';
F[4].fecha = '2026-10-20';
F[5].titulo = 'Aon plc: estimaciones (base del 14-oct, comprobadas el 20-oct: BPA 2026-2027 sin cambios)';
F[5].fecha = '2026-10-20';
F[13].titulo = 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,12 % el 20-oct-2026)';
F[13].fecha = '2026-10-20';
F[13].url = 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026';
const nuevas = [
  { id: 18, titulo: 'Marsh reports third quarter 2026 results (nota de resultados del 3T26, 8-K, anexo 99.1)', editor: 'Marsh (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/Archives/edgar/data/62709/000006270926000256/mmc3q2026ex991newsrelease.htm' },
  { id: 19, titulo: 'Formulario 10-Q del tercer trimestre de 2026 (balance a 30-sep-2026, nota 17 de litigios, papel comercial, acciones a 12-oct-2026)', editor: 'Marsh (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/Archives/edgar/data/62709/000006270926000258/mrsh-20260930.htm' },
  { id: 20, titulo: 'Final Term Sheet (FWP): 600 M EUR al 4,250 % con vencimiento en 2032 y 600 M EUR al 4,625 % con vencimiento en 2036; liquidación el 27-oct-2026', editor: 'Marsh (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/Archives/edgar/data/62709/000119312526426649/d140031dfwp.htm' },
  { id: 21, titulo: 'Marsh declares quarterly cash dividend (0,99 USD por acción; registro el 1-oct-2026, pago el 13-nov-2026)', editor: 'Marsh', tipo: 'Primaria', fecha: '2026-09-16', url: 'https://www.marsh.com/en/corp/about/news/marsh-declares-quarterly-cash-dividend.html' },
  { id: 22, titulo: 'Aon to acquire USI (8-K, anexo 99.1): precio de 17.000 M (16.700 M netos), 14,5 veces el EBITDA ajustado de 12 meses con sinergias', editor: 'Aon plc (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-31', url: 'https://www.sec.gov/Archives/edgar/data/315293/000119312526375328/d108801dex991.htm' },
  { id: 23, titulo: 'Aon bets $17 billion on the middle market again, and its own shareholders balk', editor: 'InsuranceNewsNet', tipo: 'Prensa', fecha: '2026-08-31', url: 'https://insurancenewsnet.com/oarticle/aon-bets-17-billion-on-the-middle-market-again-and-its-own-shareholders-balk' },
  { id: 24, titulo: 'Marsh (MRSH) Q3 2026 Earnings Call: EPS up 10%, Thrive target raised (resumen de la conferencia)', editor: 'Mitrade / TradingKey', tipo: 'Prensa', fecha: '2026-10-16', url: 'https://www.mitrade.com/insights/news/live-news/article-0-2167160-20261016' },
  { id: 25, titulo: 'MRSH statistics: acciones, flotante y posición corta (6,35 M de acciones, 1,34 %)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://stockanalysis.com/stocks/mrsh/statistics/' },
  { id: 26, titulo: 'Cierres diarios de AON, WTW, AJG, BRO y RYAN (13-oct a 20-oct-2026 y movimiento de junio a octubre)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/AON/history/' },
  { id: 27, titulo: 'Form 4 de Marsh presentados desde el 21-abr-2026 (ventas de directivos)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=62709&type=4' },
];
D.fuentes = [...Object.values(F), ...nuevas];

// ---------- Identificación ----------
Object.assign(D.identificacion, {
  precio: 191.26,
  fecha_precio: '2026-10-20',
  acciones: 478.5,
  capitalizacion_publicada: 90950,
  free_float_pct: 99.8,
  max_52s: B.identificacion.max_52s,
  min_52s: B.identificacion.min_52s,
  volumen_medio_diario: '≈ 460 M USD/día (2,53 M de acciones; 3 meses)',
  proximos_resultados: null,
});

// ---------- Consenso ----------
D.consenso = {
  guidance: 'Con el 3T26 (15-oct-2026) la dirección mantiene la guía de 2026: crecimiento subyacente de los ingresos parecido al de 2025 (4 %), ampliación del margen ajustado del grupo y un buen crecimiento del BPA ajustado [24]. En nueve meses el subyacente va en el 5 % y el BPA ajustado sube un 9 %, hasta 8,29 USD [18]. Según el resumen de la conferencia, el objetivo de ahorro anual del programa Thrive sube de 400 a 600 M y la empresa sigue esperando unos 5.500 M de despliegue de capital en 2026 (compras, dividendos y recompras); lo llevamos como dato de prensa porque no está en la nota oficial [24]. No da guía numérica de BPA. Los resultados del 4T26 no tienen fecha; por el calendario de 2025 y 2026, hacia finales de enero de 2027.',
  estimaciones: [
    { periodo: '2026e', ingresos: 28719, ebitda: 8058, ebit: 7761, bpa: 8.62, dpa: 3.75, fuente: 'MarketScreener, 20-oct-2026 (BPA publicado; EBITDA y EBIT ajustados) [2]' },
    { periodo: '2027e', ingresos: 30121, ebitda: 8674, ebit: 8304, bpa: 10.21, dpa: 4.03, fuente: 'MarketScreener, 20-oct-2026 [2]' },
    { periodo: '2028e', ingresos: 31707, ebitda: 9247, ebit: 8855, bpa: 12.17, dpa: 4.28, fuente: 'MarketScreener, 20-oct-2026 [2]' },
  ],
  recomendaciones: { n_analistas: 23, comprar: 7, mantener: 15, vender: 1, po_medio: 205.38, po_min: 180, po_max: 228 },
  revisiones: 'Los resultados del 3T26 (BPA ajustado de 2,03 USD frente a 1,97 esperado e ingresos de 6.863 M frente a 6.640 M) dieron la vuelta a los objetivos [18, 3]. Del 5 al 12 de octubre recortaron Morgan Stanley (200 a 180), KBW (202 a 186), Wells Fargo (188 a 183), BofA (182 a 177) y Evercore (234 a 224); del 15 al 20 subieron Cantor (218 a 228), BMO (179 a 204), Mizuho (190 a 200), KBW (186 a 201), Jefferies (188 a 194), Goldman (197 a 199) y JPMorgan (215 a 218) [3, 4]. El objetivo medio pasa de 202,67 a 205,38 USD [3]. El BPA publicado de MarketScreener sube poco en 2026-2027 (8,60 a 8,62 y 10,08 a 10,21) y mucho en 2028 (11,19 a 12,17, sin explicación en la página) [2]. El ajustado de Stock Analysis para 2026 es 10,48 USD (14 analistas) [4]. Solo MarketScreener da estimaciones completas; objetivo y recomendaciones se contrastan con Stock Analysis (204,52 de media, mismo rango 180-228) [3, 4].',
  base_ebitda: 'ajustado',
  ajuste_ebitda_pct_ventas: 1.9,
  confianza: 'Media',
};

// ---------- Bolsa ----------
const mov = { fecha: '2026-10-20', var_1m_pct: 10.7, var_3m_pct: 8.7, var_6m_pct: 6.8, var_12m_pct: 0.9, dist_max_52s_pct: -3.2, dist_min_52s_pct: 21.6, dist_max_historico_pct: -21.7, tendencia: 'alcista', volatilidad_60d_pct: 23.1, avisos: [] };
D.bolsa = {
  tipo_rentabilidad: B.bolsa.tipo_rentabilidad,
  rentabilidades: B.bolsa.rentabilidades,
  anual: B.bolsa.anual,
  beta: B.bolsa.beta,
  volatilidad_pct: B.bolsa.volatilidad_pct,
  max_drawdown_pct: B.bolsa.max_drawdown_pct,
  posicion_corta_pct: 1.34,
  comentario: 'En un año la acción sube un 1,2 % frente al 14,5 % del S&P 500 y del ETF de seguros (IAK); en lo que va de año, +3,1 % frente a +12,7 % y +7,7 % [1]. El retraso viene del ciclo blando de tarifas y de tres golpes: −8,5 % el 16-oct-2025 con el 3T25, −7,5 % el 9-feb-2026 con el miedo a la IA en los corredores y el −12,5 % de septiembre, cuando todo el sector cayó tras la compra de USI por Aon [1, 22, 26]. Desde el mínimo del 3-jun-2026 (156,60) sube un 22 %, y el 3T26 (+4,6 % el 15-oct) la deja a un 3 % del máximo de 52 semanas [1, 18]. A diez años, +11,4 % anual, por encima del sector y por debajo del índice. Beta mensual de 5 años de 0,56 (0,71 ajustada), volatilidad del 25,3 % y caída máxima del −34,4 % entre abril de 2025 y junio de 2026 [1]. Posición corta del 1,34 % de las acciones, 2,3 días de volumen [25].',
  contexto: {
    movimiento: mov,
    movimientos_fuertes: [
      { periodo: 'feb-2026 (día 9)', var_pct: -7.5, causa: 'Caída de todos los corredores (−9 % de media ese día) por el miedo a que la IA desintermedie la colocación de seguros de pymes y particulares; no hubo noticia propia de Marsh [1]. La tesis ya recoge el riesgo de la IA.', veredicto: 'no cambia', condicion: null },
      { periodo: '29-jun a 29-jul-2026', var_pct: 18.5, causa: 'Rebote de todo el sector desde los mínimos de junio: en el mismo mes AJG +18,4 %, WTW +19,4 %, BRO +17,1 % y Aon +15,1 % [1, 26]. Los resultados del 2T26 (21-jul) restaron un 3,1 % al día siguiente; la subida de la semana del 27-jul (+7,8 % en dos sesiones) coincide con la de los demás corredores, sin noticia propia [1, 26].', veredicto: 'no cambia', condicion: null },
      { periodo: '24-ago a 23-sep-2026', var_pct: -12.5, causa: 'Caída de todo el sector: Aon −21,6 % tras anunciar el 31-ago la compra de USI por 17.000 M con deuda, BRO −17,3 %, AJG −15,6 % y WTW −14,8 % en el mismo mes [22, 23, 26]. Marsh cayó menos que sus rivales y sin noticia propia; el acuerdo de Greensill con Credit Suisse de septiembre cerró el litigio [19].', veredicto: 'no cambia', condicion: null },
      { periodo: '22-sep a 20-oct-2026', var_pct: 10.7, causa: 'Resultados del 3T26 mejores de lo esperado (subyacente del 5 %, BPA ajustado +10 %): +4,6 % el 15-oct, con todo el sector al alza ese día (AJG +5,5 %, BRO +4,9 %, WTW +4,5 %, Aon +4,2 %) y siete subidas de objetivo en cinco días [18, 3, 26].', veredicto: 'no cambia', condicion: null },
    ],
    noticias: [
      { fecha: '2026-10-15', tipo: 'resultados', hecho: 'Resultados del 3T26: ingresos de 6.863 M (+8 %; subyacente +5 %: Risk +5 %, reaseguro −6 %, consultoría +8 %), BPA de 1,69 USD y ajustado de 2,03 (+10 %). Incluyen 126 M de plusvalía contable por consolidar Deasterra y 144 M de cargo por Greensill [18, 19].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-16', tipo: 'recomendación', hecho: 'Tras los resultados suben el objetivo Cantor (228), BMO (204), Mizuho (200), KBW (201), Jefferies (194), Goldman (199) y JPMorgan (218); la semana anterior lo habían recortado Morgan Stanley (180), KBW (186), Wells Fargo (183), BofA (177, infraponderar) y Evercore (224) [3, 4].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-15', tipo: 'demanda o regulador', hecho: 'El 10-Q informa del acuerdo de septiembre con los fondos de Credit Suisse en el litigio de Greensill en Australia (el de Greensill Bank se cerró en junio): cargo de 569 M en nueve meses, neto del seguro, y la empresa dice que termina su participación y no espera más cargos [19].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-08-31', tipo: 'fusión u oferta', hecho: 'Aon compra USI (unos 3.000 M de ingresos) por 17.000 M, 14,5 veces el EBITDA con sinergias: refuerza al rival en la mediana empresa de EE. UU., donde Marsh compró McGriff en 2024 [22, 23].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-09-02', tipo: 'directivos', hecho: 'Ventas de directivos de 10,9 M USD desde abril (19 operaciones, ninguna compra): 5,8 M del consejero delegado con plan 10b5-1 y el resto de cinco directivos y un consejero; menos del 0,02 % del capital y sin un vendedor en serie sin motivo [27].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-10-20', tipo: 'ampliación o convertible', hecho: 'Emisión de bonos por 1.200 M EUR (600 M al 4,25 % a 2032 y 600 M al 4,625 % a 2036), rating A3/A-/A-, para fines generales; se liquida el 27-oct. No es capital ni convertible: deuda que sustituye al papel comercial (1.623 M a 30-sep) y al bono de 550 M EUR devuelto en septiembre [20, 18, 19].', veredicto: 'no cambia', condicion: null },
    ],
    proximos_resultados: null,
    veredicto: 'no cambia',
    condicion: null,
    comentario: 'La acción sube un 10,7 % en un mes y está en tendencia alcista (8,2 % sobre la media de 200 sesiones), a un 3,2 % del máximo de 52 semanas, sin avisos P1-P5 [1]. Los tres movimientos fuertes de 2026 son del sector entero, no de Marsh: rebote de julio, caída de septiembre tras la compra de USI por Aon y subida con los resultados del 3T26. No hay hechos pendientes que puedan mover el precio más de un 5 %: el litigio de Greensill queda cerrado, la emisión de bonos es deuda ordinaria y no hay colocaciones ni ofertas. Los resultados ya publicados no retrasan nada. Veredicto: no cambia. Buscado en EDGAR (8-K, 10-Q, FWP, Form 4), MarketScreener, Stock Analysis y prensa sectorial.',
  },
  confianza: 'Alta',
};

// ---------- Múltiplos históricos: la serie no cambia (cierres de ejercicio) ----------

// ---------- Comparables: estimaciones de MarketScreener del 14-oct llevadas al cierre del 20-oct ----------
D.comparables.criterio = 'Los cinco corredores cotizados de EE. UU. y Europa con negocio comparable: Aon y WTW (globales con consultoría de recursos humanos, los más parecidos), Gallagher y Brown & Brown (corredores de mediana empresa y compradores en serie) y Ryan Specialty (mayorista). Fuera: Baldwin (pérdidas), Hub, Acrisure y USI (privadas) y las consultoras puras. Estimaciones de MarketScreener (base publicada) del 14-oct, llevadas al cierre del 20-oct-2026 con la variación de precio de Yahoo (+7 % a +13 %: el sector subió con los resultados de Marsh) y la deuda neta sin cambios; en Aon se ha comprobado el 20-oct que el BPA 2026-2027 no ha cambiado. El EBITDA de MarketScreener es ajustado, así que sus EV/EBITDA son algo más bajos que el de Marsh con cifras publicadas: el PER es la referencia [5-10, 26].';
D.comparables.empresas = [
  { nombre: 'Aon', ticker: 'AON', pais: 'IE', capitalizacion: 62969, ev_ventas: 4.39, ev_ebitda_ltm: 13.1, ev_ebitda_ntm: 11.7, per_ntm: 19.9, crecimiento_pct: 6.9, margen_ebitda_pct: 33.5, roic_pct: 17.9, dn_ebitda: 2.2, fcf_yield_pct: 5.1 },
  { nombre: 'WTW', ticker: 'WTW', pais: 'IE', capitalizacion: 29734, ev_ventas: 3.39, ev_ebitda_ltm: 12.5, ev_ebitda_ntm: 10.4, per_ntm: 17.8, crecimiento_pct: 8.1, margen_ebitda_pct: 27.2, roic_pct: 13, dn_ebitda: 1.2, fcf_yield_pct: 5.2 },
  { nombre: 'Arthur J. Gallagher', ticker: 'AJG', pais: 'US', capitalizacion: 65965, ev_ventas: 5.62, ev_ebitda_ltm: 17.3, ev_ebitda_ntm: 13.2, per_ntm: 27, crecimiento_pct: 17, margen_ebitda_pct: 32.7, roic_pct: 5.6, dn_ebitda: 2.5, fcf_yield_pct: 2.7 },
  { nombre: 'Brown & Brown', ticker: 'BRO', pais: 'US', capitalizacion: 23581, ev_ventas: 5.14, ev_ebitda_ltm: 14.4, ev_ebitda_ntm: 11.9, per_ntm: 19.4, crecimiento_pct: 12.2, margen_ebitda_pct: 35.9, roic_pct: 6.5, dn_ebitda: 3.2, fcf_yield_pct: 5.8 },
  { nombre: 'Ryan Specialty', ticker: 'RYAN', pais: 'US', capitalizacion: 10910, ev_ventas: 4.62, ev_ebitda_ltm: 14.6, ev_ebitda_ntm: 13.1, per_ntm: 32.2, crecimiento_pct: 9.7, margen_ebitda_pct: 31.7, roic_pct: 9.4, dn_ebitda: 3.3, fcf_yield_pct: 5.3 },
];

// ---------- Transacciones: se añade Aon-USI ----------
D.transacciones.operaciones.unshift({
  fecha: '2026-08', objetivo: 'USI Insurance Services', comprador: 'Aon', ev: 17000, ev_ventas: 5.67, ev_ebitda: 14.5, prima_pct: null, excluir: false,
  comentario: 'Precio de 17.000 M (16.700 M netos de 278 M de créditos fiscales); 14,5 veces el EBITDA ajustado de 12 meses CON sinergias de 395 M (sin ellas, estimación propia ≈ 22 veces); ingresos de unos 3.000 M; cierre previsto en el 4T26 [22].',
});
D.transacciones.comentario = 'Las grandes corredurías privadas se han pagado a 14-22 veces el EBITDAC en 2023-2026, muy por encima de las compras pequeñas (10-11 veces según los analistas) [11]. La última, USI por Aon (agosto de 2026), a 14,5 veces con sinergias y en torno a 22 sin ellas, y el mercado la castigó (Aon −6 % el día del anuncio) [22, 23]. Es valor de control: el capital privado y los cuatro grandes compiten por las mismas plataformas de mediana empresa. Marsh, con unos 91.500 M de capitalización, no es objetivo plausible de una operación; las transacciones sirven de techo para lo que vale la correduría, no de catalizador.';

// ---------- Puente y contraste del consenso (para propio.mjs) ----------
D.valoracion = {
  puente: { fecha: '2026-09-30', deuda_financiera: 20533, arrendamientos: 0, caja: 1842, minoritarios: 235, pensiones: -1214, asociadas: 73, otros_ajustes: 1040 },
  objetivo_12m: {
    comparables_per: { mediana: 19.9 },
    consenso: { bpa_ano1: 8.62, bpa_ano2: 10.21, objetivo_medio: 205.38, objetivo_min: 180, objetivo_max: 228, analistas: 23, tendencia_3m: 'estables', fuente: 'MarketScreener (BPA publicado 2026-2027 y objetivos, 20-oct-2026) y Stock Analysis (recomendaciones y objetivo medio de 204,52) [D2, D3, D4]' },
  },
  notas_integrador: 'Puente a 30-sep-2026 (balance de la nota del 3T26 [18] y 10-Q [19]): deuda = 1.644 corto (incluye 1.623 de papel comercial) + 18.889 largo = 20.533; caja 1.842 (sin la fiduciaria de 12.273, que se compensa con el pasivo fiduciario); minoritarios a valor contable 235; pensiones = (693 de pasivos − 2.301 de activos) × (1 − 24,5 %) = −1.214 (superávit, suma valor); asociadas 73 (participadas por puesta en equivalencia, valor contable, nota del 10-Q); otros_ajustes 1.040 = 471 de dividendo a pagar (declarado en septiembre, registro el 1-oct: el precio del 20-oct ya va sin él [21]) + 569 de Greensill (cargo de nueve meses neto de seguro; el 10-Q habla de «recorded liability» y no dice si se ha pagado: lo tratamos como pendiente, igual que los 425 de junio; si ya se pagó, sobran ≈ 1,2 USD por acción). Arrendamientos operativos fuera (US GAAP). Los bonos de 1.200 M EUR se liquidan el 27-oct, después del corte: caja y deuda a la vez, efecto neutro, no entran. Acciones: 475,51 M a 12-oct-2026 (portada del 10-Q) + 3,0 M de dilución (479 diluidas − 476 básicas de media en el 3T) = 478,5 M; entre el 30-sep (475,41 M) y el 12-oct apenas cambian, así que no hace falta ajustar la caja por recompras. Tasa libre: 10 años del Tesoro al 5,12 % el 20-oct-2026 [D13] (antes 5,21 %). PER actual con el BPA de MarketScreener 2027e: 191,26 / 10,21 = 18,7x; el actual de la regla es precio ÷ vuestro BPA 2027e. Mediana del PER NTM de comparables al 20-oct: 19,9x (antes 18,5x). Marsh no da guía nueva: mantiene la de 2026; Thrive sube a 600 M de ahorro según la prensa [24]. La plusvalía de Deasterra (126 M, dentro de ingresos del 3T) no es recurrente.',
};

// ---------- Huecos ----------
D.huecos = [
  { seccion: 'identificacion', campo: 'fecha de los próximos resultados (4T26)', tipo: 'Complemento', intentos: '1) nota del 3T26 y 10-Q (no la anuncian); 2) web de inversores y lista de presentaciones de EDGAR (sin aviso de conferencia); 3) buscador de calendarios (solo el precedente: 29-ene-2026 para el 4T25)', decision: 'Omitido' },
];

D._estado = 'terminado';
fs.writeFileSync(ruta, JSON.stringify(D, null, 2) + '\n', 'utf8');
console.log('D.json actualizado:', D.fuentes.length, 'fuentes');

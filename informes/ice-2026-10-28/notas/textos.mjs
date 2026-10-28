// Textos del analista (ICE, corte 2026-10-28). Citas con prefijo de nota: [A1] = fuente 1 de A.json; [P1] = propia.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const aqui = dirname(fileURLToPath(import.meta.url));
const A = JSON.parse(readFileSync(join(aqui, 'A.json'), 'utf8'));
const C = JSON.parse(readFileSync(join(aqui, 'C.json'), 'utf8'));
export { resumen } from './resumen.mjs';

// Limpieza de textos de A que llevaban nombres de campo o notas de trabajo.
const ajustes = A.financieros.ajustes
  .replace('ICE no presenta coste de ventas, por eso `coste_ventas` va a null; `gastos_generales` recoge todos los gastos operativos sin amortizaciones.',
    'ICE no presenta coste de ventas: los gastos generales recogen todos los gastos operativos sin amortizaciones.');
const otros_pasivos = A.balance.otros_pasivos
  .replace('ICE responde con capital propio (*skin in the game*) y', 'ICE responde con capital propio aportado al fondo de garantía y con')
  .replace('Son de ICE, pero no están disponibles; no van en `caja` [1].', 'Son de ICE, pero no están disponibles y no cuentan como caja en el puente [1].')
  .replace('**Pensiones** (accrued employee benefits): 174 M USD [1].',
    '**Pensiones**: el plan de prestación definida (congelado) tiene un superávit de 69 M USD, pero el complementario de directivos (19 M) y las prestaciones posteriores a la jubilación (115 M) dejan un déficit neto de 65 M, 49 M después de impuestos, que va al puente [1].');
for (const [k, t] of Object.entries({ ajustes, otros_pasivos })) if (/`|subagente/.test(t)) throw new Error(`Texto de A sin limpiar: ${k}`);

export const limitaciones = 'Línea cotizada: acción ordinaria de ICE en la NYSE (USD). El análisis se hace el 28-oct-2026 antes de la apertura de Nueva York: precio = cierre del 27-oct-2026 (155,44 USD). **ICE publica los resultados del 3T26 el 29-oct-2026, el día siguiente al corte: este informe usa el 2T26 como último trimestre y habrá que rehacerlo con esos resultados.** Ingresos: siempre netos de gastos por transacción (la cifra principal de ICE). Balance: fuera los depósitos de margen y fondos de garantía de los miembros de las cámaras (no son de ICE) y la caja restringida para capital regulatorio. Arrendamientos operativos (US GAAP): fuera del puente y de la deuda. MarketAxess (compra firmada el 29-jul-2026; autorización de competencia de EE. UU. el 21-oct; junta de MarketAxess el 29-oct) no está en el DCF, ni en el BPA ni en el puente: se trata como neutra al precio pagado. **Base del BPA: ajustado** (el que publica ICE, sin amortización de intangibles adquiridos, integración ni asuntos regulatorios) en los tres casos y en la historia del PER. Consenso: BPA ajustado e ingresos de Yahoo Finance (28-oct) y EBITDA de MarketScreener (8-oct). Comparables tomados del informe de CME Group del 26-oct (cierre del 23-oct) y llevados al 27-oct con el precio. Notas A-D de la iteración del 8-oct, revisadas contra el XBRL de la SEC y las fuentes primarias; no se han leído las preguntas de los analistas en las conferencias.';

export const controles_explicados = [
  { control: 'Regresión múltiplo-crecimiento', explicacion: 'Con nueve comparables de modelos distintos (bolsas, datos puros, plataformas de renta fija) el crecimiento no explica el múltiplo (R² 0,05): no se usa la regresión, solo las medianas.' },
  { control: 'Compra robusta', explicacion: 'La v3 da Comprar y la v2 de control, Mantener (11,4 %), porque la v2 toma como base el PER actual (18,0x) sin acercarlo a la mediana de 21,2x. Para quien la tiene manda la regla vigente; para comprar faltaría un motivo de negocio propio, y además la calidad (rendimiento sobre el capital frente a su coste) no pasa el filtro.' },
];

export const huecos_resueltos = [
  { seccion: 'balance', campo: "rating (nota y perspectiva de Moody's y S&P)" },
  { seccion: 'gobierno', campo: 'insiders (una presentación de Form 4)' },
  { seccion: 'consenso', campo: 'revisiones de BPA y EBITDA a 3 y 12 meses' },
  { seccion: 'comparables', campo: 'Cboe Global Markets y Euronext' },
];

export const consenso_guidance = 'ICE no da objetivo de beneficio: guía ingresos recurrentes, gastos, inversión y acciones. El 30-jul-2026, con el 2T26, la subió [D3]: ingresos recurrentes de Bolsas con crecimiento de un dígito alto (en febrero, de un dígito medio [D5]); ingresos recurrentes de Renta fija y datos del 7-8 %; gastos operativos GAAP de 5.140-5.180 M USD y ajustados de 4.190-4.230 M (antes, 4.075-4.140 M), que excluyen la amortización de intangibles adquiridos, la integración y asuntos regulatorios; inversión de unos 850 M (antes, 740-790 M); 560-566 M de acciones medias en el 3T26 y gasto no operativo ajustado de 175-180 M en el trimestre [A6]. La guía no incluye MarketAxess. La próxima actualización llega con el 3T26, el 29-oct-2026 [P7].';
export const consenso_revisiones = 'Las estimaciones suben poco a poco. En Yahoo Finance, el BPA ajustado de 2026e pasó de 8,03 USD hace 90 días a 8,18 (+1,9 %) y el de 2027e, de 8,72 a 8,88 (+1,8 %); el del 3T26, de 1,88 a 1,97 tras las estadísticas de volumen de septiembre [P7, B21]. Los precios objetivo, en cambio, bajaron en junio y julio (Goldman Sachs de 208 a 180 USD, TD Cowen de 193 a 153) y se han estabilizado: media de 187,53 USD (185,33 el 8-oct). Las recomendaciones empeoran en el margen: TD Cowen bajó a mantener el 5-oct y Wells Fargo empezó con infraponderar (159-160 USD) el 2-oct; hoy son 13 compras, 2 mantener y 1 venta, frente a 14, 1 y 0 hace un mes [P7]. El EBITDA de MarketScreener es del 8-oct [D6]: sin historial gratuito de revisiones de EBITDA.';

export const bolsa_comentario = 'Rentabilidades totales con dividendos; índice, el ETF SPY del S&P 500, y sector, el ETF XLF de financieras de EE. UU. [P8]. La sesión del 28-oct no había abierto: se usa el cierre del 27-oct (155,44 USD). ICE pierde un 3,0 % en el año frente al +13,7 % del S&P 500 y el +3,3 % de las financieras, y en cinco años rinde un 4,1 % anual frente al 12,4 %. Tocó máximo el 29-ene-2026 (176,05 USD), cayó en febrero con la venta de valores de software y datos por miedo a la IA [P13] y marcó el mínimo el 29-jun (121,79 USD) con la baja volatilidad de junio y recortes de previsiones [P14]. Desde entonces ha subido un 27,6 % con los resultados del 2T26 y la compra de MarketAxess [A6, D28]. La peor caída de cinco años (−34,3 %) fue entre noviembre de 2021 y junio de 2022 [P8]. Beta mensual a cinco años frente al SPY: 0,87 (ajustada, 0,91). Posición corta: 1,18 % del capital flotante [P7].';

export const contexto = {
  movimiento: { fecha: '2026-10-27', var_1m_pct: 1.7, var_3m_pct: 0.8, var_6m_pct: -0.6, var_12m_pct: -1.4, dist_max_52s_pct: -11.2, dist_min_52s_pct: 26.5, dist_max_historico_pct: -17.5, tendencia: 'alcista', volatilidad_60d_pct: 21.9, avisos: [] },
  movimientos_fuertes: [
    { periodo: 'feb-2026', var_pct: -7.8, causa: 'Caídas diarias del 5,8 % (3-feb) y del 7,8 % (11-feb): venta generalizada de valores de software y datos por miedo a la IA, que arrastró a las bolsas con negocio de datos [P13]; los resultados del 4T25 (5-feb) batieron y subieron la guía [A5].', veredicto: 'no cambia', condicion: null },
    { periodo: 'jun-2026', var_pct: -17.4, causa: 'Baja volatilidad y menor volumen en junio, recortes de previsiones y de precios objetivo (TD Cowen de 193 a 153 USD el 22-jun; Goldman Sachs de 208 a 180 el 30-jun) y miedo a la competencia de los futuros perpetuos de cripto [P7, P13, P14]. Mínimo de 121,79 USD el 29-jun.', veredicto: 'no cambia', condicion: null },
    { periodo: 'jul-2026', var_pct: 26.9, causa: 'Rebote desde el mínimo y, el 30-jul, resultados del 2T26 por encima de lo esperado con la guía de ingresos recurrentes al alza, más el anuncio de la compra de MarketAxess [A6, D28].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-10-29', tipo: 'resultados', hecho: 'Resultados del 3T26 antes de la apertura; consenso de BPA ajustado de 1,97 USD e ingresos de 2.745 M USD [P7]. El volumen medio diario del trimestre subió un 31 % [B21]. El informe tendrá que rehacerse con ellos.', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-29', tipo: 'fusión u oferta', hecho: 'Junta extraordinaria de MarketAxess para votar la fusión con ICE (167 USD por acción en efectivo) [P6]. El 21-oct el Departamento de Justicia y la FTC dieron por terminado antes de tiempo el plazo de la ley HSR [P5].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-14', tipo: 'recomendación', hecho: 'Wells Fargo mantiene infraponderar (objetivo 160 USD; inició el 2-oct con 159), Morgan Stanley neutral con 173 (9-oct), Barclays sobreponderar con 189 (7-oct) y TD Cowen baja a mantener con 166 (5-oct) [P7].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-09-16', tipo: 'directivos', hecho: 'Ventas de directivos y consejeros: 91,3 M USD en 12 meses y ninguna compra; 88,9 M dentro de planes 10b5-1, 66,4 M del presidente y primer ejecutivo, Jeffrey Sprecher [P4].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-08-21', tipo: 'ampliación o convertible', hecho: 'Financiación de MarketAxess con deuda, sin acciones: 3.750 M USD en bonos (11-ago) y un préstamo a plazo de 2.000 M que cancela el puente [A15, A12].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-07-30', tipo: 'fusión u oferta', hecho: 'Acuerdo para comprar MarketAxess por unos 6.000 M USD en efectivo; si se bloquea por regulación, ICE paga 327,4 M [D28].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: '2026-10-29',
  veredicto: 'no cambia',
  condicion: null,
  comentario: 'La acción está en tierra de nadie: −1,4 % en 12 meses, a un 11,2 % del máximo de 52 semanas y un 26,5 % sobre el mínimo, con la media de 200 sesiones casi plana y tendencia alcista por poco. Los movimientos fuertes tienen causa conocida (miedo a la IA en febrero, volatilidad baja en junio, resultados y MarketAxess en julio) y ninguno es un deterioro del negocio. Hay dos hechos con fecha mañana, los resultados del 3T26 y la junta de MarketAxess, que no aplazan la decisión (regla 11) pero obligan a rehacer este informe. Las ventas de directivos son programadas y recurrentes. Veredicto: no cambia.',
};

export const multiplos_comentario = 'Precios de cierre de cada ejercicio de Yahoo Finance [P8]. Para el objetivo a 12 meses, el PER se calcula sobre el BPA ajustado que publica ICE, la misma base que nuestros casos: 2019 3,88 USD, 2020 4,41, 2021 5,06, 2022 5,30, 2023 5,62, 2024 6,07 y 2025 6,95 [P9, P10, A10, A9, P11, A5]. Con el BPA del año siguiente, el PER al cierre fue de 19,4 veces en 2018, 21,0 en 2019, 22,8 en 2020, 25,8 en 2021, 18,3 en 2022, 21,2 en 2023, 21,4 en 2024 y 19,9 en 2025 (sobre nuestro 2026e): mediana de cinco años de 21,2 veces. Hoy cotiza a 18,0 veces nuestro BPA de 2027e. El PER contable sale muy distinto (2,58 USD de BPA en 2022 por la pérdida en Bakkt) y no se usa. El descuento frente a su historia viene de la deuda de Black Knight y MarketAxess, del miedo a la IA en los datos y de un 2026 de volatilidad excepcional que el mercado no extrapola.';

export const comparables_criterio = 'Nueve cotizadas de infraestructura de mercados y datos: bolsas con cámara de compensación (CME, Nasdaq, Deutsche Börse, LSEG, Euronext y Cboe), una plataforma electrónica de renta fija (Tradeweb, como la división de ICE que crecerá con MarketAxess) y dos proveedores de índices y datos (S&P Global y MSCI), que encajan peor. Fuera MarketAxess (su precio está anclado a la oferta de ICE) y no hay cotizada que replique Tecnología hipotecaria. Cifras de MarketScreener y Stock Analysis del 23-oct-2026 (informes de CME Group y LSEG) [P12], llevadas al cierre del 27-oct con la variación del precio [P8]. El PER de los comparables de EE. UU. es sobre BPA ajustado, la misma base que el de ICE.';
export const comparables_comentario = 'ICE cotiza a 13,5 veces el EBITDA de los próximos 12 meses y a 17,7 veces el BPA, el múltiplo más bajo del grupo salvo LSEG en EV/EBITDA; la mediana de los comparables está en torno a 17-18 veces el EBITDA y 25,7 veces el beneficio. El descuento tiene tres razones medibles. Crece menos que Nasdaq, Tradeweb o MSCI en los próximos 12 meses una vez que se normaliza la energía; su rendimiento sobre el capital (8,1 %) es el más bajo del grupo junto con LSEG, por el fondo de comercio de Black Knight; y tiene más deuda (2,6 veces el EBITDA) que CME, Deutsche Börse o Tradeweb. A las medianas, ICE valdría 217,80 USD por EV/EBITDA y 225,06 por PER: es el techo de la valoración, no la base, porque supone cerrar un descuento que lleva tres años. Pesan el 20 %.';

export const etapa2_justificacion = 'No se usa. El rendimiento sobre el capital invertido de ICE es del 8,1 % en 2025, por debajo del WACC del 8,57 %, porque el capital es sobre todo fondo de comercio (30.646 M USD) e intangibles (15.353 M) de Ellie Mae y Black Knight [A1]. Con esa base, crecer más tiempo no crea valor según la regla del informe. Sin el fondo de comercio, el rendimiento es del 22,3 % y el incremental de 2021-2025, del 11,5 %: el negocio orgánico sí rinde, pero lo pagado por las compras no.';

export const dcf_justificacion = {
  crecimiento: 'El 2026e (+11,5 %, fijo) replica el consenso de 11.077 M USD [P7]: el 1S26 creció un 12,5 % (5.643 M frente a 5.016 M) [A8] y el volumen medio diario del 3T26 subió un 31 % interanual, con Brent +38 % y TTF +39 % [B21]. Para 2027e solo +5,0 % (el consenso da +5,8 %): la comparación con un 2026 de volatilidad récord en energía es exigente (el 1T26 creció un 20 % y el 2T26 un 4,8 %) [A6, A7]. Después, 6,0 % en 2028-2029, con ingresos recurrentes que crecen un 7-8 % [A6], la recuperación hipotecaria que prevé Fannie Mae [B13] y la compensación de bonos del Tesoro [B1]. Baja al 3 % en 2035e. La TCAC de 2021-2025 fue del 8,6 %, con Black Knight dentro [A1].',
  margenes: 'Margen EBITDA (sin integración ni asuntos regulatorios) del 67,5 % en 2026-2027 y del 68,0 % desde 2029. El de 2026 sale de la guía: 11.077 M de ingresos menos 4.190-4.230 M de gastos ajustados (que incluyen la amortización propia) dan un resultado operativo ajustado de unos 6.860 M, un 67,5 % de EBITDA con la amortización propia del 5,5 % [A6]. Es más que el 66,0 % de 2025 y menos que el 68,8 % del 1T26, inflado por la energía [A7]. Solo CME, con un 71 %, está por encima entre los comparables [P12]. La expansión posterior (medio punto) es la que da el apalancamiento operativo con un 5 % de crecimiento; la guía de gastos de 2026 subió dos veces [D3, D5].',
  inversion: 'Capex del 7,7 % de las ventas en 2026 (la guía de unos 850 M USD) [A6], que baja al 6,0 % en 2034-2035, frente al 8,0-8,1 % de 2024-2025 y al 6,1-6,6 % de 2021-2023 [A1]. La amortización del DCF es solo la del inmovilizado y el software propio (5,5 % de las ventas; 566 M USD en 2025 [A1]): la de intangibles adquiridos (993 M en 2025) no se deduce, porque no da escudo fiscal en caja. Lo confirma el pasivo por impuesto diferido de 4.064 M USD sobre 15.353 M de intangibles [A1]. Circulante del 4,8 % de las ventas, como en 2023-2025.',
  wacc: 'Tasa libre: bono del Tesoro de EE. UU. a 10 años del 4,99 % (27-oct-2026) [P3], frente al 5,27 % del informe anterior. Beta de 0,91: la ajustada, mensual a 5 años, frente al SPY [P8]; frente a una cesta de CME, Nasdaq y Cboe sale 1,01 y frente a las financieras, 0,85 [D1]. Prima de mercado del 5,0 %. Coste de la deuda del 5,8 %: la tasa libre más los 82 puntos básicos del bono a 2036 de ago-26, con calificación A3/A- [P2]. Peso de la deuda del 19 % a valor de mercado. Resultado: WACC del 8,57 % y coste del capital del 9,54 %. La recomendación de 12 meses no depende del WACC; el filtro de calidad sí, y con él ICE no llega ni con una beta de 0,5.',
  terminal: 'Crecimiento a perpetuidad del 3,0 % en USD, Gordon: por debajo del nominal de EE. UU. a largo plazo y entre la inflación esperada y la tasa libre menos medio punto (4,49 %). El valor terminal pesa el 62 % del valor. Cada medio punto de crecimiento a perpetuidad mueve el valor unos 11-13 USD por acción (156,74 USD con el 2,5 % y 180,02 con el 3,5 %).',
};

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 9.5, precio_pct: 1.5, otros_pct: 0.5, comentario: 'Año casi cerrado: el 1S26 creció un 12,5 % por el volumen de energía (1T26 +46 %) y el volumen medio diario del 3T26 subió un 31 % [A8, B21]. Precio: ingreso por contrato de energía de 1,70 a 1,74 USD en 2023-2025 y subidas contractuales en el software hipotecario [A1]. Otros: divisa. Reparto entre volumen y precio, estimación propia.' },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0, comentario: 'El volumen de energía se normaliza frente a un 2026 récord [A6, A7]; crecen los recurrentes: guía de Renta fija y datos del 7-8 % [A6]. Precio: inflación repercutida en tarifas y suscripciones [A1].' },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0, comentario: 'Recuperación de la originación hipotecaria (Fannie Mae) [B13] y compensación de bonos del Tesoro [B1]. El consenso da +6,5 % [D6].' },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0, comentario: 'Derivados cotizados con interés abierto récord (FIA) [B19] y gasto en datos financieros al alza [B20]; precio como en 2023-2025 [A1].' },
    { periodo: '2030e', volumen_pct: 3, precio_pct: 2.5, otros_pct: 0, comentario: 'El volumen se modera hacia el crecimiento del mercado; el precio sigue la inflación en tarifas y en contratos de software de cinco a siete años [A1].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí para el caso base, que pide poco: un 4,7 % anual en 2027e-2035e (5,4 % con 2026e), menos que el 8,6 % de 2021-2025. El foso es amplio (Brent y TTF con efectos de red; Encompass y MSP como sistemas de referencia) y el poder de precios está probado: ingreso por contrato de energía al alza y subidas contractuales en el software [A1]. Es de activos ligeros: la reinversión neta es el 3 % del NOPAT, así que la prueba de reinversión del motor (rendimiento del 42,7 % sobre la reinversión bruta) no dice nada; el crecimiento sale de precio y volumen sin capital nuevo. Sin cuota publicada comparable no hay prueba de cuota (mercado final sin dato). El riesgo es el ciclo, que va en el bajista.',
};

export const dcf_lectura = 'El DCF vale 167,33 USD por acción, un 7,6 % sobre el precio de 155,44. Sube frente a los 154,01 del 8-oct porque la tasa libre bajó del 5,27 % al 4,99 % (WACC del 8,84 % al 8,57 %) y porque la guía de gastos permite un margen del 67,5 % en 2026. El DCF inverso dice que el precio descuenta un crecimiento del 3,8 % anual en 2027e-2035e con un margen del 64,2 %, frente a nuestro 4,7 % y 68,0 %, y una rentabilidad implícita del 8,9 %: un poco más que nuestro WACC. No es exigente: ICE creció un 8,6 % anual en 2021-2025 y el consenso espera un 5,8 % en 2027 [P7]. El valor terminal pesa el 62 % y medio punto de WACC mueve el valor entre 151,19 y 186,68 USD. Con la prima de riesgo que hoy pide el mercado (4,2 %), el DCF sube a 190,57 USD. La conclusión es que el precio paga algo menos que el consenso, pero no una ganga: el problema de ICE no es el precio, sino que lo que se pagó por las compras no rinde su coste de capital.';

export const narrativas = {
  Bajista: 'La volatilidad de la energía se normaliza en 2027 y los ingresos de energía (2.362 M USD en los últimos 12 meses) vuelven a niveles de 2024: los ingresos caen un 3,5 % ese año y el margen pierde 2 puntos. EMIR 3.0 desplaza parte de los derivados de tipos en euros a cámaras de la UE y la originación hipotecaria se estanca. Ya pasó en 2022: Tecnología hipotecaria cayó un 20 % y la acción, un 25 % [A3].',
  Base: 'El consenso de 2026 (+11,5 %), +5 % en 2027 tras un año de volatilidad récord y un 6 % después, con margen EBITDA del 67,5-68 %. MarketAxess se integra sin destruir valor.',
  Alcista: 'El interés abierto récord se mantiene, la compensación de bonos del Tesoro despega y la originación hipotecaria vuelve a los niveles que prevé Fannie Mae [B13]: el crecimiento es 1,5 puntos mayor cada año y el margen, un punto más alto, con un WACC 0,25 puntos menor.',
};
export const escenarios_comentario = 'Con nuestro WACC, el alcista gana un 35,6 % (210,75 USD) y el bajista pierde un 27,1 % (113,30 USD): asimetría de 1,31 veces. El valor ponderado (164,68 USD) queda un 5,9 % sobre el precio. El bajista no es cosmético: incluye un año con caída de ingresos (algo que ICE no ha tenido en 2021-2025, pero su segmento hipotecario sí, en 2022 [A3]) y un WACC medio punto mayor. La pérdida máxima de la acción en cinco años fue del 34,3 % [P8].';

export const suma_partes = {
  aplica: true, descuento_holding_pct: 0,
  partes: [
    { segmento: 'Exchanges', metrica: 'EBITDA LTM jun-26', valor_metrica: 4645, multiplo: 16.0, ev_directo: null,
      justificacion: 'EBITDA del segmento de los últimos 12 meses sin costes de integración (resultado operativo 4.388 M + amortización 254 M + 3 M) [A1, A8]. 16 veces: por debajo de CME (21,5 veces los últimos 12 meses) y Nasdaq (20,4), en línea con Deutsche Börse y Euronext (16,0) [P12], porque el LTM lleva un primer trimestre de energía excepcional.' },
    { segmento: 'Fixed Income and Data Services', metrica: 'EBITDA LTM jun-26', valor_metrica: 1365, multiplo: 16.0, ev_directo: null,
      justificacion: 'EBITDA de los últimos 12 meses: resultado operativo 1.017 M + amortización 345 M + 3 M [A1, A8]. 16 veces, por debajo de S&P Global (20,6), MSCI (24,4) y Tradeweb (23,4) y por encima de LSEG (11,1) [P12]: ingresos recurrentes que crecen un 7-8 % y un margen EBITDA del 54 %.' },
    { segmento: 'Mortgage Technology', metrica: 'EBITDA LTM jun-26', valor_metrica: 1087, multiplo: 13.0, ev_directo: null,
      justificacion: 'EBITDA de los últimos 12 meses: resultado operativo 62 M + amortización 950 M + integración 75 M [A1, A8]. 13 veces, el múltiplo que ICE paga por MarketAxess [D25, D26]: software con un 75 % de ingresos recurrentes, pero ligado al ciclo hipotecario y sin comparable cotizado puro.' },
  ],
  comentario: 'La suma de partes da 167,40 USD por acción, un 7,7 % sobre el precio. Bolsas aporta dos tercios del valor. El precio no paga una prima por la mezcla: a 14,6 veces el EBITDA de los últimos 12 meses, el conjunto cotiza por debajo de cualquiera de sus partes valorada a múltiplos de sus comparables. Tecnología hipotecaria es la parte más discutible: a 13 veces vale 14.131 M USD, más de lo que ICE pagó por Black Knight (unos 11.800 M) [A1]; a 10 veces, el valor por acción bajaría unos 6 USD. No pesa en la síntesis más del 15 % porque usa un LTM con un trimestre de energía excepcional. Sin descuento de conglomerado: los tres segmentos comparten tecnología, red y clientes de datos.',
  confianza: 'Media',
};

export const just12m = {
  Bajista: 'Ventas de 2028e de 11.340 M USD: 2027 con −3,5 % por la normalización de la energía y margen EBITDA 2 puntos menor (65,5-65,8 %). BPA ajustado de 8,13 USD, por debajo del de 2026e: dos años sin crecer el beneficio.',
  Base: 'Ventas de 12.324 M USD (+5 % en 2027 y +6 % en 2028) con margen EBITDA del 67,8 % y gasto financiero ajustado de 640 M. BPA ajustado de 9,25 USD (+7,0 % anual desde 2026e), sin recompras y sin MarketAxess.',
  Alcista: 'Ventas de 12.677 M USD (+6,5 % y +7,5 %) con margen un punto mayor: el interés abierto de energía aguanta y despega la compensación de bonos del Tesoro. BPA ajustado de 9,71 USD.',
};
export const excluidos = 'Historia ADELANTADA en BPA AJUSTADO (la misma base que los casos): precio de cierre de cada año ÷ BPA ajustado real del año siguiente; 2025 ÷ nuestro BPA ajustado de 2026e (8,12). 2018 19,4x; 2019 21,0x; 2020 22,8x; 2021 25,8x; 2022 18,3x; 2023 21,2x; 2024 21,4x; 2025 19,9x. Sin exclusiones: en base ajustada no hay pérdidas, PER ≥ 150x ni años atípicos. La historia del informe del 8-oct (mediana 25,8x) mezclaba el PER contable (BPA de 2,58 USD en 2022 por Bakkt) con casos en BPA ajustado: se corrige aquí.';
export const diferencia_consenso = 'Nuestro BPA ajustado de 2026e (8,12 USD) queda un 0,7 % por debajo del consenso (8,18) y el de 2027e (8,63), un 2,8 % por debajo (8,88) [P7]: no suponemos recompras (la dirección recompra 350-400 M USD por trimestre) y crecemos un 5,0 % en 2027 frente al 5,8 % del consenso. Nuestro precio base (180,38 USD) queda un 3,8 % por debajo del objetivo medio de los analistas (187,53) y dentro de su rango (160-243). No hay una diferencia que explicar más allá de las recompras.';
export const objetivo12m_comentario = 'El objetivo a 12 meses ponderado (184,29 USD; +19,8 % con el dividendo, base +17,3 %) queda por encima del valor intrínseco de la síntesis (177,50 USD, +14,2 %) y del DCF (167,33 USD, +7,6 %). La diferencia viene del múltiplo: la regla común acerca el PER actual (18,0 veces) a la mediana de cinco años en base ajustada (21,2 veces) y el alcista toma la mediana de los comparables (25,7 veces), mientras el DCF descuenta al 8,57 %. Para cerrar la distancia hacen falta unos resultados del 3T26 que confirmen un 2026 de +11 % y una guía de 2027 que no recorte gastos ni recompras, más el cierre de MarketAxess sin sorpresas. Con la regla v2 de control (base = el PER actual), la ponderada baja al 11,4 %.';

export const valoracion_comentario = 'El DCF pesa el 40 % porque ICE es un negocio estable con un 51 % de ingresos recurrentes y flujos predecibles [B1]. Los escenarios (25 %) recogen el riesgo de que la volatilidad de la energía se normalice. Los comparables (20 %) y la suma de partes (15 %) aportan la lectura de mercado; los comparables dan más (221,43 USD) porque ICE cotiza con descuento frente a todo el grupo, y por eso pesan poco. Las transacciones no pesan: llevan prima de control y ICE es comprador, no objetivo. La dispersión (113-221 USD) es amplia, con el precio en la parte baja. El valor intrínseco de la síntesis es de 177,50 USD, un 14,2 % sobre el precio; el DCF solo, 167,33 USD.';

const ins = C.gobierno.insiders;
export const secciones = {
  financieros: { ajustes },
  balance: {
    otros_pasivos,
    rating: "Moody's A3 y S&P A-, ambas con perspectiva estable: calificación de los bonos senior emitidos el 11-ago-2026 para MarketAxess [P2].",
  },
  gobierno: {
    insiders: ins,
    insiders_sin_operaciones: false,
  },
  calidad: {
    auditor: 'Ernst & Young LLP (Atlanta)', anios_auditor: 24, opinion: 'Favorable (2025), también sobre el control interno',
    comentario: 'Ernst & Young audita a ICE desde 2002 y su única cuestión clave de auditoría de 2025 son las posiciones fiscales inciertas [A1]. Tres asuntos piden atención. Primero, la **amortización de intangibles adquiridos** (993 M USD en 2025) separa el beneficio contable (5,77 USD por acción) del ajustado que publica ICE (6,95 USD): el ajuste es legítimo en caja, pero oculta que ICE pagó por ese crecimiento, y es la razón de que el rendimiento sobre el capital invertido (8,1 %) no llegue al coste de capital [A1, A5]. Segundo, los **resultados de participadas** mueven el beneficio neto: plusvalías de 2.740 M USD en 2021 (Bakkt, Coinbase), pérdidas de 1.340 M en 2022 y 389 M de revalorización de Polymarket en el 1S26, al precio de una ronda posterior, sin cotización [A1, A8]. Tercero, el **flujo de explotación** lleva el desfase de las tasas de la Sección 31 (−237 M USD en 2024, +316 M en 2025) [A5]. La remuneración en acciones fue de 293 M USD en 2025, un 3,0 % de los ingresos [A1]. Indicadores: Piotroski de 8 sobre 9 y Beneish de −2,52, lejos de la zona de manipulación. El Altman Z (2,99, zona gris) se calcula sin los depósitos de las cámaras y no está pensado para un operador de mercados; no lo usamos.',
    senales: [
      { senal: 'Revalorización de Polymarket sin precio de mercado', nivel: 'Media', comentario: 'Preferentes contabilizadas a unos 2.000 M USD por una ronda de marzo de 2026; 389 M de ganancia en el 1S26 [A8]. Están en el puente a ese valor.' },
      { senal: 'Beneficio contable frente al ajustado', nivel: 'Baja', comentario: 'La diferencia es la amortización de intangibles adquiridos (unos 950 M USD anuales, según el calendario del 10-K) [A1]. El objetivo a 12 meses usa el ajustado en historia y casos.' },
      { senal: 'Desfase de las tasas de la Sección 31 en el flujo de explotación', nivel: 'Baja', comentario: 'Mueve el flujo en ±300 M USD de un año a otro; ICE publica un flujo libre ajustado que lo neutraliza [A5].' },
      { senal: 'Auditor durante 24 años', nivel: 'Baja', comentario: 'Ernst & Young desde 2002 [A1]; el socio rota según la norma de EE. UU., pero no la firma.' },
    ],
    confianza: 'Alta',
  },
  catalizadores: {
    items: [
      { fecha: '29-oct-2026', evento: 'Resultados del 3T26', efecto: 'Volumen medio diario +31 % en el trimestre [B21]; consenso de BPA ajustado de 1,97 USD [P7]. Confirma o no el +11 % de 2026. Este informe se rehace con ellos.', probabilidad: 'Alta', sentido: '+' },
      { fecha: '29-oct-2026', evento: 'Junta extraordinaria de MarketAxess', efecto: 'Votación de la fusión; la autorización de competencia de EE. UU. ya llegó el 21-oct [P5, P6].', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '4T26-1S27', evento: 'Cierre de MarketAxess', efecto: 'Apalancamiento de hasta 3,4 veces el EBITDA y vuelta a 3 o menos en 18-24 meses [A16]; si se bloquea por regulación, ICE paga 327,4 M USD [D28].', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '4T26', evento: 'Compensación de repos del Tesoro en ICE Clear Credit', efecto: 'Nueva línea de ingresos de compensación con la obligación de compensar del Tesoro de EE. UU. [B1].', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Guía de gastos y de ingresos recurrentes; primera lectura de la comparación con un 2026 récord.', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Normalización de la volatilidad en energía', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−27 % (escenario bajista: 113,30 USD)', mitigante: 'Interés abierto récord y 51 % de ingresos recurrentes [B1].', senal: 'Interés abierto de energía en las estadísticas mensuales de ICE [B21].' },
      { riesgo: 'Lo pagado por las compras no rinde su coste de capital', tipo: 'Estratégico', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'Sin efecto directo en el DCF; es el filtro de calidad del método el que no se cumple', mitigante: 'Rendimiento sin fondo de comercio del 22,3 % y ROIC incremental del 11,5 %.', senal: 'Rendimiento sobre el capital invertido por debajo del 9 % tras MarketAxess.' },
      { riesgo: 'Integración y precio de MarketAxess', tipo: 'Estratégico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 % a −5 % si destruye un tercio de su valor', mitigante: 'Múltiplo de 13,0 veces el EBITDA [D25].', senal: 'Cuota de MarketAxess en crédito de EE. UU. y bajas de clientes tras el cierre.' },
      { riesgo: 'La IA abarata los datos financieros', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 % por múltiplo', mitigante: 'Datos propios de precios y de referencia que la IA consume, no sustituye [A6].', senal: 'Crecimiento de los ingresos recurrentes de datos por debajo del 5 %.' },
      { riesgo: 'Coste de capital', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 % por cada medio punto de WACC (151,19 USD)', mitigante: 'Deuda a tipo fijo con vida media larga [A8].', senal: 'Bono a 10 años de EE. UU. por encima del 5,5 %.' },
      { riesgo: 'Ciclo hipotecario y bajas de clientes en Encompass', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−4 % (unos 6 USD) si Tecnología hipotecaria vale 10 veces su EBITDA en vez de 13', mitigante: '75 % de ingresos recurrentes y MSP como sistema de referencia en servicing; Wells Fargo renovó MSP en septiembre [A6, E2].', senal: 'Ingresos de originación por debajo de 190 M USD por trimestre (197 M en el 2T26) [A6].' },
      { riesgo: 'EMIR 3.0 y la compensación de derivados en euros', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−2 % a −4 %', mitigante: 'ICE Clear Netherlands en la UE [B1].', senal: 'Interés abierto de Euribor en ICE frente a Eurex.' },
      { riesgo: 'Sucesión de Jeffrey Sprecher', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Difícil de cuantificar; −5 % de reacción plausible', mitigante: 'Equipo con Ben Jackson (presidente) y Lynn Martin (NYSE) [C1].', senal: 'Nombramiento de un consejero delegado distinto del presidente.' },
    ],
    premortem: 'Octubre de 2029: la acción cotiza a 93 USD, un 40 % menos. Empezó en 2027: la volatilidad del petróleo y del gas europeo se normalizó y el volumen de energía cayó un 25 %. Con una base de costes fija, el margen EBITDA bajó del 67,5 % al 64 %. A la vez, EMIR 3.0 se llevó parte de los Euribor a Fráncfort y la Fed no bajó los tipos: el bono a 10 años siguió cerca del 5 % y la originación hipotecaria no se recuperó. MarketAxess, comprada con deuda, perdió cuota frente a Tradeweb y el apalancamiento se quedó en 3,4 veces, sin recompras durante dos años. El mercado, que ya pagaba un descuento por el bajo rendimiento sobre el capital, dejó de pagar 14 veces el EBITDA y pagó 11, como a LSEG. Lo habrían anticipado el interés abierto de energía, los ingresos de originación por trimestre y la guía de gastos de febrero de 2027.',
    ia: { exposicion: 'Media', sentido: 'Mixto', efecto_valor: '−5 % a +5 %', comentario: 'La IA toca Renta fija y datos (unos 2.300 M USD de ingresos al año) y Tecnología hipotecaria. Amenaza: que los modelos abaraten la analítica y el software de originación, que es lo que castigó la acción en febrero y septiembre [P13, E2]. Oportunidad: ICE vende datos propios (precios de evaluación de bonos, datos de referencia, datos de las bolsas) que los modelos necesitan y no pueden fabricar, y usa IA en Encompass para automatizar la tramitación. Señal: el crecimiento de los ingresos recurrentes de datos (guía del 7-8 % en 2026 [A6]); por debajo del 5 %, el riesgo pasa a ser de cifras y no solo de múltiplo.' },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Energía', pregunta: '¿Qué parte del crecimiento de energía de 2026 es interés abierto nuevo y qué parte volumen especulativo que se irá con la volatilidad?', por_que: 'El bajista depende de esto; el volumen del 3T26 subió un 31 % [B21].' },
      { tema: 'Rendimiento del capital', pregunta: '¿Qué rendimiento sobre el capital invertido espera ICE tras MarketAxess y en qué plazo superará su coste de capital?', por_que: 'Con el fondo de comercio de Black Knight, el rendimiento es del 8,1 % frente a un WACC del 8,57 %.' },
      { tema: 'MarketAxess', pregunta: '¿Qué sinergias de ingresos y costes se esperan, con qué plazo y con qué costes de integración?', por_que: 'A 13,0 veces el EBITDA, la compra solo crea valor con sinergias; no constan cifras en los documentos revisados.' },
      { tema: 'Apalancamiento', pregunta: '¿Qué ratio de deuda neta sobre EBITDA es compatible con mantener el A3/A- y las recompras de 350-400 M USD por trimestre?', por_que: 'La dirección prevé hasta 3,4 veces y volver a 3 o menos en 18-24 meses [A16].' },
      { tema: 'Hipotecas', pregunta: '¿Cuántos clientes de Encompass se perdieron en 2025 y cuál es la tasa de renovación de MSP?', por_que: 'No hay cuota publicada y la originación sigue en mínimos de ciclo.' },
      { tema: 'Polymarket', pregunta: '¿Cuál es el plan con la participación en Polymarket y qué ingresos de datos genera para ICE?', por_que: 'Unos 2.000 M USD de valor contable sin precio de mercado [A8].' },
      { tema: 'Sucesión', pregunta: '¿Hay plan de sucesión para el presidente y primer ejecutivo, en el cargo desde 2000?', por_que: 'No hay sucesor anunciado y vende acciones de forma programada (66,4 M USD en 12 meses) [P4, C1].' },
    ],
    confianza: 'Media',
  },
};

export const huecos = [];

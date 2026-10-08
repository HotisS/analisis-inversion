// Textos del analista (ICE, corte 2026-10-08). Citas con prefijo de nota: [A1] = fuente 1 de A.json; [P1] = propia.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const aqui = dirname(fileURLToPath(import.meta.url));
const A = JSON.parse(readFileSync(join(aqui, 'A.json'), 'utf8'));

// Limpieza de dos textos de A que llevaban nombres de campo entre comillas invertidas.
const ajustes = A.financieros.ajustes
  .replace('ICE no presenta coste de ventas, por eso `coste_ventas` va a null; `gastos_generales` recoge todos los gastos operativos sin amortizaciones.',
    'ICE no presenta coste de ventas: los gastos generales recogen todos los gastos operativos sin amortizaciones.');
const otrosPasivos = A.balance.otros_pasivos
  .replace('ICE responde con capital propio (*skin in the game*) y', 'ICE responde con capital propio aportado al fondo de garantía y con')
  .replace('Son de ICE, pero no están disponibles; no van en `caja` [1].', 'Son de ICE, pero no están disponibles y no cuentan como caja en el puente [1].')
  .replace('**Pensiones** (accrued employee benefits): 174 M USD [1].',
    '**Pensiones**: el plan de prestación definida (congelado) tiene un superávit de 69 M USD, pero el complementario de directivos (19 M) y las prestaciones posteriores a la jubilación (115 M) dejan un déficit neto de 65 M, 49 M después de impuestos, que va al puente [1].');

export const textos = {
  meta: {
    limitaciones: 'Línea cotizada: acción ordinaria de ICE en la NYSE (USD). La sesión del 8-oct-2026 no había cerrado a la hora del análisis: se usa el cierre del 7 de octubre (152,59 USD). Ingresos: siempre netos de gastos por transacción (la cifra principal de ICE), en cuentas, segmentos, trimestres, consenso y DCF. Balance: se excluyen del activo, del pasivo, de la caja, de la deuda neta y del capital invertido los depósitos de margen y fondos de garantía de los miembros de las cámaras (116.912 M USD a jun-26), que no son de ICE; la caja restringida para capital regulatorio tampoco cuenta como caja. Arrendamientos operativos (US GAAP): fuera del puente, de la deuda y del capital invertido. MarketAxess (compra firmada el 29-jul-2026, cierre previsto en el 1S27) no está en el DCF ni en el puente: se valora como neutra al precio pagado (13,0 veces EBITDA) y su efecto se discute aparte. El consenso es de una sola fuente con estimaciones completas (MarketScreener), contrastado con Stock Analysis. Comparables europeos convertidos al tipo del BCE del 7-oct-2026. No se han leído las preguntas de los analistas en las conferencias (solo la intervención de la dirección).',
    controles_explicados: [
      { control: 'Regresión múltiplo-crecimiento', explicacion: 'Con siete comparables de modelos distintos (bolsas, datos puros, plataformas de renta fija) el crecimiento no explica el múltiplo (R² 0,08): no se usa la regresión, solo las medianas.' },
    ],
  },
  identificacion: { capitalizacion_publicada: 86030, sector: 'Financieras', industria: 'Mercados de capitales: bolsas y datos financieros', sede: 'Atlanta (Georgia, EE. UU.)', fundacion: '2000', empleados: 12844, web: 'www.ice.com' },
  dcf: {
    etapa2: { justificacion: 'No se usa. El ROIC contable de ICE es del 8,1 % en 2025, por debajo del WACC del 8,84 %, porque el capital invertido es sobre todo fondo de comercio (30.646 M USD) e intangibles (15.353 M) de Ellie Mae y Black Knight [A1]. Con esa base, crecer más tiempo no crea valor según la regla del informe. El ROIC incremental de 2021-2025 (11,5 %) y el margen EBITDA del 66 % dicen que el negocio orgánico sí rinde por encima de su coste, pero la etapa de transición dependería de una tasa de reinversión que ICE no publica por segmento.' },
    justificacion: {
      crecimiento: 'El 2026e (+11,0 %, fijo) replica el consenso de 11.038 M USD [D6]: el 1S26 ya creció un 12,5 % (5.643 M frente a 5.016 M) [A8] y el volumen medio diario del 3T26 subió un 31 % interanual, con Brent +38 % y TTF +39 % [B21]. Para 2027e solo +5,0 %: la comparación con un 2026 de volatilidad récord en energía es exigente (el 1T26 creció un 20 %, el 2T26 un 4,8 %) [A6, A7]. Después, 6,0 % en 2028-2029, apoyado en ingresos recurrentes que crecen un 8 % (2T26) [A6], la recuperación hipotecaria que prevé Fannie Mae (2,12 billones USD en 2026 y 2,28 en 2027, aún la mitad de 2021) [B13] y la compensación de bonos del Tesoro (repos desde el 4T26) [B1]. Baja al 3 % en 2035e. La TCAC 2021-2025 fue del 8,6 %, con Black Knight dentro [A1].',
      margenes: 'Margen EBITDA del 66,5 % en 2026-2027 y del 67,0 % desde 2029. Es el de 2025 (66,0 % sin los 70 M de integración) y queda por debajo del 66,8 % del 2T26 y del 68,8 % del 1T26, trimestres inflados por la energía [A6, A7]. El consenso descuenta un 67,2 % ajustado en 2026, que equivale a un 66,5 % con el criterio de las cuentas (los costes de integración restan un 0,7 % de las ventas) [D5, D6]. Solo CME, con un 71 % de margen EBITDA, está por encima entre los comparables [D10]. No proyectamos expansión: la guía de gastos ajustados de 2026 subió dos veces (de 4.075-4.140 M a 4.190-4.230 M) [D3, D5].',
      inversion: 'Capex del 7,7 % de las ventas en 2026 (la guía de unos 850 M USD) [A6], que baja al 6,0 % en 2034-2035, frente al 8,0-8,1 % de 2024-2025 y al 6,1-6,6 % de 2021-2023, cuando no se capitalizaba tanto software [A1]. La amortización del DCF es solo la del inmovilizado y el software propio (5,5 % de las ventas; 566 M USD en 2025 [A1]): la de intangibles adquiridos (994 M en 2025) no se deduce, porque no da escudo fiscal en caja. Lo confirma el pasivo por impuesto diferido de 4.064 M USD sobre 15.353 M de intangibles [A1]. Circulante del 4,8 % de las ventas, como en 2023-2025.',
      wacc: 'Tasa libre: bono del Tesoro de EE. UU. a 10 años del 5,27 % (FRED, 6-oct-2026) [D4]. Beta de 0,91: la ajustada, mensual a 5 años, frente al SPY. Contraste: 0,85 frente a las financieras (XLF) y 1,01 frente a una cesta de CME, Nasdaq y Cboe [D1]. CME (0,20) y Cboe (0,41) son casi acíclicas, con R² por debajo de 0,1, y no sirven de referencia; ICE se mueve como Nasdaq (0,99), con un negocio hipotecario y de datos más ligado al ciclo [D1]. Prima de mercado del 5,0 %. Coste de la deuda del 6,1 %: el bono a 2036 de ago-26 salió a 82 puntos básicos sobre el Tesoro, y ICE tiene A3/A- [P2]. Peso de la deuda del 19 % a valor de mercado. Resultado: WACC del 8,84 % y coste del capital del 9,82 %.',
      terminal: 'Crecimiento a perpetuidad del 3,0 % en USD, Gordon. Es menos que el nominal de EE. UU. a largo plazo y queda entre la inflación esperada y la tasa libre menos medio punto (4,77 %). Implica un múltiplo de salida de 12,2 veces el EBITDA, por debajo de los 14,4 a los que cotiza hoy y de los 15,6 a 19,9 de los últimos cinco cierres de ejercicio. Es un terminal prudente para un negocio con un 51 % de ingresos recurrentes [B1]. El valor terminal pesa el 61 % del valor. Cada medio punto de crecimiento a perpetuidad mueve el valor unos 10-11 USD por acción.',
    },
    lectura: 'El DCF vale 154,01 USD por acción, un 0,9 % sobre el precio de 152,59: el mercado paga lo que valen las previsiones del consenso descontadas al 8,84 %. El DCF inverso lo confirma: el precio descuenta un crecimiento del 4,6 % anual en 2027e-2035e con un margen del 66,5 %, prácticamente nuestro caso base (4,7 % y 67,0 %), y una rentabilidad implícita del 8,9 %, igual a nuestro WACC. No es exigente: ICE creció un 8,6 % anual en 2021-2025 y el consenso espera un 6-7 % en 2027-2028 [D6]. Tampoco es una ganga: para ganar dinero hay que creer en más crecimiento que el de la base o en un coste de capital menor. Con la prima que hoy pide el mercado (4,2 % frente a nuestro 5,0 %), el WACC baja al 8,25 % y el DCF sube a 174,55 USD. La diferencia entre las dos lecturas es solo la tasa de descuento: nuestras cifras coinciden con el consenso (−0,1 % en ingresos y −0,2 % en EBITDA de 2026). El valor terminal pesa el 61 % y una variación de medio punto en el WACC mueve el valor entre 139,61 y 171,13 USD.',
  },
  narrativas: {
    Bajista: 'La volatilidad de la energía se normaliza en 2027 y los ingresos de energía (2.362 M USD en los últimos 12 meses) vuelven a niveles de 2024: los ingresos caen un 3,5 % ese año, el margen pierde 2 puntos (1,5 en los siguientes). EMIR 3.0 desplaza parte de los derivados de tipos en euros a cámaras de la UE y la originación hipotecaria se estanca. Ya pasó en 2022: Mortgage Technology cayó un 20 % [A3] y la acción, un 25 %.',
    Base: 'Las previsiones del consenso: +11 % en 2026, +5 % en 2027 tras un año de volatilidad récord y un 6 % después, con margen EBITDA estable en el 66,5-67 %. MarketAxess se integra sin destruir valor.',
    Alcista: 'El interés abierto récord se mantiene, la compensación de bonos del Tesoro despega y la originación hipotecaria se acerca a los 2,3 billones USD que prevé Fannie Mae para 2027 [B13]: el crecimiento es 1,5 puntos mayor cada año y el margen, un punto más alto, con un WACC 0,25 puntos menor.',
  },
  escenarios: {
    comentario: 'Con nuestro WACC, el alcista gana un 26,6 % (193,25 USD) y el bajista pierde un 31,4 % (104,71 USD): asimetría de 0,85 veces, que no compensa. El valor ponderado (151,50 USD) queda un 0,7 % por debajo del precio. Con la prima de riesgo que pide hoy el mercado, la asimetría pasa a 1,93 veces (alcista 221,30 USD, bajista 116,92 USD): es esa lectura la que da la recomendación. El bajista no es cosmético: incluye un año con caída de ingresos (algo que ICE no ha tenido en 2021-2025, pero su segmento hipotecario sí, en 2022 [A3]) y un WACC medio punto mayor. La pérdida máxima de la acción en cinco años fue del 34,3 % [D1].',
  },
  suma_partes: {
    aplica: true, descuento_holding_pct: 0,
    partes: [
      { segmento: 'Exchanges', metrica: 'EBITDA LTM jun-26', valor_metrica: 4645, multiplo: 16.0, ev_directo: null,
        justificacion: 'EBITDA del segmento de los últimos 12 meses sin costes de integración (resultado operativo 4.388 M + amortización 254 M + 3 M) [A1, A8]. 16 veces: por debajo de CME (20,7 veces los últimos 12 meses) y Nasdaq (19,4), en línea con Deutsche Börse (16,1) [D10, D11, D13], porque el LTM lleva un primer trimestre de energía excepcional.' },
      { segmento: 'Fixed Income and Data Services', metrica: 'EBITDA LTM jun-26', valor_metrica: 1365, multiplo: 16.0, ev_directo: null,
        justificacion: 'EBITDA de los últimos 12 meses: resultado operativo 1.017 M + amortización 345 M + 3 M [A1, A8]. 16 veces, como S&P Global (16,3 veces), por debajo de MSCI (24,2) y Tradeweb (20,8) y por encima de LSEG (10,5) [D14, D15, D16, D12]: ingresos recurrentes que crecen un 7-8 % y un margen EBITDA del 54 %.' },
      { segmento: 'Mortgage Technology', metrica: 'EBITDA LTM jun-26', valor_metrica: 1087, multiplo: 13.0, ev_directo: null,
        justificacion: 'EBITDA de los últimos 12 meses: resultado operativo 62 M + amortización 950 M + integración 75 M [A1, A8]. 13 veces, el múltiplo que ICE paga ahora por MarketAxess [D25, D26]: software con un 75 % de ingresos recurrentes, pero ligado al ciclo hipotecario y sin comparable cotizado puro.' },
    ],
    comentario: 'La suma de partes vale 110.291 M USD de valor empresa y 167,40 USD por acción, un 9,7 % sobre el precio. Exchanges aporta el 67 % del valor. El ejercicio muestra que el precio no paga una prima por la mezcla: a 14,4 veces el EBITDA de los últimos 12 meses, el conjunto cotiza por debajo de cualquiera de sus partes valoradas a múltiplos de sus comparables. Mortgage Technology es la parte más discutible: a 13 veces vale 14.131 M USD, cuando ICE pagó unos 11.800 M por Black Knight y 11.000 M por Ellie Mae [A1]; a 10 veces, el valor por acción bajaría unos 6 USD. No aplicamos descuento de conglomerado: los tres segmentos comparten tecnología, red y clientes de datos.',
    confianza: 'Media',
  },
  referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, Implied ERP by month, columna «ERP (T12m with sustainable payout)» de octubre de 2026 [P1]' },
  valoracion: {
    puente: { pensiones: 49 },
    comentario: 'El DCF pesa el 40 % porque ICE es un negocio estable con un 51 % de ingresos recurrentes y flujos predecibles [B1]. Los escenarios (25 %) recogen el riesgo de que la volatilidad de la energía se normalice. Los comparables (20 %) y la suma de partes (15 %) aportan la lectura de mercado: los dos dan más valor (179,17 y 167,40 USD) porque ICE cotiza a 13,3 veces el EBITDA de los próximos 12 meses, frente a la mediana de 15,7 de sus comparables, y a 14,4 veces el de los últimos 12, por debajo de su mínimo de cinco años (15,6) [D1]. Las transacciones no pesan: llevan prima de control (mediana de 24 veces) y ICE es comprador, no objetivo. La dispersión es moderada (151-179 USD sin transacciones), con el precio en la parte baja. El valor objetivo de 160,42 USD queda un 5,1 % por encima del precio; con la prima del mercado sube a 173,73 USD.',
  },
  secciones: {
    financieros: { ajustes },
    balance: {
      otros_pasivos: otrosPasivos,
      rating: "Moody's A3 y S&P A-, ambas con perspectiva estable: calificación de los bonos senior emitidos el 11-ago-2026 para MarketAxess [P2].",
    },
    calidad: {
      auditor: 'Ernst & Young LLP (Atlanta)', anios_auditor: 24, opinion: 'Favorable (2025), también sobre el control interno',
      comentario: 'Ernst & Young audita a ICE desde 2002 y su única cuestión clave de auditoría de 2025 son las posiciones fiscales inciertas, no los ingresos ni los intangibles [A1]. Tres asuntos piden atención. Primero, la **amortización de intangibles adquiridos** (994 M USD en 2025) separa el beneficio GAAP (5,77 USD por acción) del ajustado que publica ICE (6,95 USD): el ajuste es legítimo en caja, pero oculta que ICE pagó por ese crecimiento [A1, A5]. Segundo, los **resultados de participadas** mueven el beneficio neto: plusvalías de 2.740 M USD en 2021 (Bakkt, Coinbase), pérdidas de 1.340 M en 2022 y 389 M de revalorización de Polymarket en el 1S26, contabilizada al precio de una ronda posterior, sin cotización [A1, A8]. Tercero, el **flujo de explotación** lleva el desfase de las tasas de la Sección 31 (−237 M USD en 2024, +316 M en 2025) [A5]. La remuneración en acciones fue de 293 M USD en 2025, un 3,0 % de los ingresos [A1]. Indicadores del motor: Piotroski de 8 sobre 9 y Beneish de −2,52, lejos de la zona de manipulación. El Altman Z (2,95, zona gris) se ha calculado sin los depósitos de las cámaras: con ellos saldría absurdo, y aun así este indicador no está pensado para un operador de mercados con cámaras de contrapartida; no lo usamos.',
      senales: [
        { senal: 'Revalorización de Polymarket sin precio de mercado', nivel: 'Media', comentario: 'Preferentes contabilizadas a unos 2.000 M USD por una ronda de marzo de 2026; 389 M de ganancia en el 1S26 [A8]. Están en el puente a ese valor.' },
        { senal: 'Beneficio GAAP frente al ajustado', nivel: 'Baja', comentario: 'La diferencia es la amortización de intangibles adquiridos (unos 950 M USD anuales hasta 2027, según el calendario del 10-K) [A1].' },
        { senal: 'Desfase de las tasas de la Sección 31 en el flujo de explotación', nivel: 'Baja', comentario: 'Mueve el flujo en ±300 M USD de un año a otro; ICE publica un flujo libre ajustado que lo neutraliza [A5].' },
        { senal: 'Auditor durante 24 años', nivel: 'Baja', comentario: 'Ernst & Young desde 2002 [A1]; el socio rota según la norma de EE. UU., pero no la firma.' },
      ],
      confianza: 'Alta',
    },
    catalizadores: {
      items: [
        { fecha: '29-oct-2026', evento: 'Resultados del 3T26', efecto: 'Volumen medio diario +31 % y energía +18 % en el trimestre [B21]: prueba de que el 2026e del consenso (+11 %) se cumple.', probabilidad: 'Alta', sentido: '+' },
        { fecha: '29-oct-2026', evento: 'Junta extraordinaria de MarketAxess', efecto: 'Votación de la fusión; el plazo de espera de la ley HSR debía vencer el 25-sep-2026 [D25].', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '4T26', evento: 'Compensación de repos del Tesoro en ICE Clear Credit', efecto: 'Nueva línea de ingresos de compensación con la obligación de compensar del Tesoro de EE. UU. [B1].', probabilidad: 'Media', sentido: '+' },
        { fecha: 'Nov-2026', evento: 'Reglas de la SEC sobre escalones de precio y tarifas de acceso', efecto: 'Presión sobre los ingresos netos de acciones al contado de la NYSE [B1].', probabilidad: 'Alta', sentido: '−' },
        { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Guía de gastos y de ingresos recurrentes; primera lectura de la comparación con un 2026 récord.', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '1S27', evento: 'Cierre de MarketAxess', efecto: 'Apalancamiento de hasta 3,4 veces el EBITDA y vuelta a 3 o menos en 18-24 meses [A16]; si se bloquea, ICE paga 327,4 M USD y amortiza los bonos al 101 % [D28, P2].', probabilidad: 'Media', sentido: '+/−' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Normalización de la volatilidad en energía', tipo: 'Mercado', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−20 % a −30 % (escenario bajista: 104,71 USD)', mitigante: 'Interés abierto récord y 51 % de ingresos recurrentes [B1].', senal: 'Interés abierto de energía en las estadísticas mensuales de ICE; septiembre, +4 % [B21].' },
        { riesgo: 'Coste de capital: la tasa libre al 5,27 %', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−9 % por cada medio punto de WACC (139,61 USD)', mitigante: 'Deuda a tipo fijo con vida media de 13 años y coste del 3,7 % [A8].', senal: 'Bono a 10 años de EE. UU. por encima del 5,75 %.' },
        { riesgo: 'Integración y precio de MarketAxess', tipo: 'Estratégico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 % a −5 % si destruye un tercio de su valor', mitigante: 'Múltiplo de 13,0 veces, bajo para un activo de datos y negociación [D25].', senal: 'Cuota de MarketAxess en crédito de EE. UU. y bajas de clientes tras el cierre.' },
        { riesgo: 'Ciclo hipotecario y bajas de clientes en Encompass', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−4 % (unos 6 USD) si Mortgage Technology vale 10 veces su EBITDA en vez de 13', mitigante: '75 % de ingresos recurrentes y MSP como sistema de referencia en servicing [A6].', senal: 'Ingresos de originación por debajo de 190 M USD por trimestre (197 M en el 2T26) [A6].' },
        { riesgo: 'EMIR 3.0 y la compensación de derivados de euros en Londres', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−2 % a −4 %', mitigante: 'ICE Clear Netherlands en la UE; equivalencia británica hasta jun-2028 [B1].', senal: 'Interés abierto de Euribor en ICE frente a Eurex.' },
        { riesgo: 'Sucesión de Jeffrey Sprecher', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Difícil de cuantificar; −5 % de reacción plausible', mitigante: 'Equipo con Ben Jackson (presidente) y Lynn Martin (NYSE) [C1].', senal: 'Nombramiento de un consejero delegado distinto del presidente.' },
        { riesgo: 'Competencia de EEX en el gas europeo (TTF)', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 %', mitigante: 'Liquidez y opciones del TTF en ICE Endex [B1].', senal: 'Crecimiento del TTF en EEX frente a ICE (EEX +25 % en 2025) [B22].' },
        { riesgo: 'Inversiones en activos digitales (Polymarket, OKX)', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2,5 % (3,9 USD) si se depreciaran a cero (2.200 M USD)', mitigante: 'Fuera del EBITDA; se valoran aparte en el puente [D2].', senal: 'Rondas de financiación a la baja o problemas regulatorios de los mercados de predicción.' },
      ],
      premortem: 'Octubre de 2029: la acción cotiza a 92 USD, un 40 % menos. La historia empezó en 2027: tras dos años de guerra comercial y tensión geopolítica, la volatilidad del petróleo y del gas europeo se normalizó y el volumen de energía cayó un 25 %. Como la base de costes de ICE es fija, el margen EBITDA bajó del 66,5 % al 63 %. A la vez, la cuenta activa de EMIR 3.0 se llevó parte de los Euribor a Fráncfort y la Fed, con la inflación pegajosa, no bajó los tipos: el bono a 10 años siguió por encima del 5 % y la originación hipotecaria se quedó en 2 billones USD. MarketAxess, comprada en lo alto del ciclo de renta fija electrónica, perdió cuota frente a Tradeweb y la deuda se quedó en 3,4 veces el EBITDA, sin recompras durante dos años. El mercado dejó de pagar 14 veces el EBITDA y pagó 11, como a LSEG. Los indicadores que lo habrían anticipado: el interés abierto de energía (que ya solo crecía un 4 % en septiembre de 2026 [B21], frente al +31 % del volumen), los ingresos de originación hipotecaria por trimestre y la guía de gastos de febrero de 2027.',
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Energía', pregunta: '¿Qué parte del crecimiento de energía de 2026 es interés abierto nuevo y qué parte volumen especulativo que se irá con la volatilidad?', por_que: 'En septiembre el volumen de energía subió un 26 % y el interés abierto solo un 4 % [B21]; el bajista depende de esto.' },
        { tema: 'MarketAxess', pregunta: '¿Qué sinergias de ingresos y costes se esperan, con qué plazo y con qué costes de integración?', por_que: 'A 13,0 veces el EBITDA, la compra solo crea valor con sinergias; no se han publicado cifras en los documentos revisados.' },
        { tema: 'Apalancamiento', pregunta: '¿Qué ratio de deuda neta sobre EBITDA es compatible con mantener el A3/A- y las recompras de 350-400 M USD por trimestre?', por_que: 'La dirección prevé hasta 3,4 veces y volver a 3 o menos en 18-24 meses [A16].' },
        { tema: 'Hipotecas', pregunta: '¿Cuántos clientes de Encompass se perdieron en 2025 y cuál es la tasa de renovación de MSP?', por_que: 'El 10-K reconoce bajas de clientes en originación [B1] y no hay cuota publicada.' },
        { tema: 'EMIR 3.0', pregunta: '¿Cuánto interés abierto de Euribor se ha trasladado a ICE Clear Netherlands y cuánto a Eurex?', por_que: 'Es la amenaza competitiva con mayor probabilidad [B1].' },
        { tema: 'Polymarket', pregunta: '¿Cuál es el plan con la participación en Polymarket y qué ingresos de datos genera para ICE?', por_que: 'Unos 2.000 M USD de valor contable sin precio de mercado [D2].' },
        { tema: 'Sucesión', pregunta: '¿Hay plan de sucesión para el presidente y primer ejecutivo, de 71 años y en el cargo desde 2000?', por_que: 'No hay sucesor anunciado y el 23,7 % votó en 2026 por separar presidencia y dirección [C1, C2].' },
      ],
      confianza: 'Media',
    },
  },
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 2, titulo: 'Pricing term sheet de los bonos senior 2029, 2031, 2033 y 2036 (FWP)', editor: 'Intercontinental Exchange (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://www.sec.gov/Archives/edgar/data/1571949/000119312526345198/d177529dfwp.htm' },
  ],
  huecos: [],
  huecos_resueltos: [
    { seccion: 'balance', campo: "rating (nota y perspectiva de Moody's y S&P)" },
    { seccion: 'valoracion', campo: 'puente.pensiones' },
  ],
  _parches: [],
};

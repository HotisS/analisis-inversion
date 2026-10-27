// Textos del analista (Rovi, corte 2026-10-27). Cifras del motor tal cual; hechos con cita a la nota de origen.
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

export const limitaciones = `Se valora la acción ordinaria de Laboratorios Farmacéuticos Rovi en la Bolsa de Madrid (ROVI), en euros. Precio: cierre del lunes 26-oct-2026 (61,40 EUR); el 27-oct a mediodía cotizaba a 61,90 y la sesión no había cerrado [D1]. Acciones: 51,143 M (emitidas menos autocartera a 30-jun-2026) [D3]. Cuentas NIIF-UE presentadas por naturaleza: el «coste de ventas» es aprovisionamientos más variación de existencias y los gastos generales incluyen la I+D [A1, A2]. La cuenta, el balance y los flujos de 2020-2025 salen del XBRL del ESEF y se contrastaron con las cuentas auditadas; los segmentos de 2020-2023 vienen de un gráfico del Día del Mercado de Capitales en millones enteros [A7, A16]. El EBITDA del 1S26 lleva 62,4 M de diferencia negativa de consolidación (badwill) por la planta de Phoenix: fuera del EBITDA del LTM, del DCF y del BPA del objetivo, que van en base ajustada [A10, A12]. El puente es el balance de 30-jun-2026 y suma como deuda el dividendo de 49,2 M aprobado y pagado el 15-jul [D3]. No hay transcripciones públicas de las conferencias de resultados. Los resultados de los nueve meses salen el 5-nov-2026, nueve días después del corte [C10].`;

export const controles_explicados = [
  { control: 'Rendimiento del capital nuevo de la proyección ≤ 1,25 × el histórico', explicacion: 'Con el primer caso base (margen EBITDA del 31 % desde 2030) el capital nuevo tenía que rendir un 29,2 % frente al 21,8 % incremental histórico. Se rebajó el margen de largo plazo al 30 % y se subió algo el capex de 2033-2035: ahora rinde un 26,4 %, por debajo del límite de 27,3 %. El crecimiento financiable al ROIC actual (4,4 %) sigue por debajo del proyectado (6,2 %) porque la CDMO tiene capacidad vacía desde la caída de Moderna, que se llena sin capex nuevo; por eso el veredicto es «En parte».' },
];

export const secciones = {
  identificacion: { sector: 'Salud', industria: 'Farmacéutica: especialidades (heparinas, Okedi) y fabricación de inyectables para terceros (CDMO)' },
  rentabilidad: {
    comentario: `Rovi crea valor con holgura: un ROIC del 20,8 % en 2025 frente a un WACC del 8,02 %, 12,8 puntos de diferencia, y por encima del 19 % todos los años desde 2020. El ROIC se movió con el contrato de la vacuna de Moderna: del 19,6 % en 2020 al 43,3 % en 2022 y de vuelta al 20,8 % en 2025, cuando la CDMO cayó a 269,5 M [A1]. Lo que lo mueve es el margen (EBITDA del 34,1 % en 2022 frente al 29,1 % en 2025) y el capital invertido, que casi se duplicó (de 321 a más de 600 M) por las plantas de llenado y las existencias de heparina, con un ciclo de caja de unos 200 días. El ROIC incremental de la serie es del 21,8 %: la capacidad nueva rinde lo mismo que la vieja, pero hoy está a medio usar. Entre los comparables, Recordati e Ipsen tienen márgenes EBITDA de 35-38 % con más deuda; Rovi rinde más sobre el capital por no tener fondo de comercio [D12].`,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    comentario: `Rovi cotiza a 14,9 veces el EBITDA de los últimos 12 meses, cerca de su media de cinco cierres (15,2x), y a 17,0 veces el beneficio, un 26 % por debajo de su media (23,1x). La serie está deformada por la vacuna de Moderna: en 2021 el mercado pagó 26,7 veces un beneficio de pico y en 2022 solo 9,7 veces cuando se vio que el contrato bajaba [D1, A1]. El PER del LTM además está inflado por el badwill de Phoenix (62,4 M), sin el cual sería de unas 23 veces. Con la base adelantada (precio ÷ BPA del año siguiente), el PER actual de 20,7x queda algo por debajo de la mediana de cinco años (22,5x). No hay cambio estructural en el múltiplo: el mercado sigue pagando por la recuperación de la CDMO.`,
  },
  transacciones: {
    comentario: `Las compras de CDMO de inyectables estériles se han pagado a 3,8-7,1 veces las ventas (Catalent 3,8x, Baxter BioPharma Solutions 7,1x) con primas del 16-47 % sobre la cotización [D15, D16, D18]; ninguna nota publicó el múltiplo de EBITDA, así que el método es poco fiable y no pesa en el valor. Rovi no es objeto probable de una oferta: la familia López-Belmonte controla el 58,2 % a través de Norbel y Mayoral (Indumenta Pueri) tiene otro 13 %, y ninguno de los dos vende [C6]. El valor por transacciones (70,05 EUR de mediana) sirve solo para ver que un comprador industrial pagaría más que la bolsa.`,
  },
  bolsa: {
    comentario: `Rovi pierde un 3,3 % en 2026 frente al +10 % del Ibex y un 4 % en 12 meses frente al +19 %. La acción se movió por hechos de la empresa: subió del 58 al 86,70 EUR entre noviembre y abril con el acuerdo con Roche, los resultados de 2025 y la compra de Phoenix, y lo perdió casi todo en mayo (−31,6 % en 21 sesiones) cuando el 1T26 trajo un beneficio un 48 % menor y la rebaja de la guía de 2026 [D1, D5]. La beta mensual a 5 años (0,26) no sirve: la deforma el ciclo de la vacuna; la semanal a dos años es 0,67. JPMorgan AM tiene la única posición corta declarada, el 1,51 % [D9].`,
    contexto: {
      movimiento: { fecha: '2026-10-27', var_1m_pct: 3.3, var_3m_pct: 4.5, var_6m_pct: -22.0, var_12m_pct: -0.2, dist_max_52s_pct: -27.6, dist_min_52s_pct: 15.4, dist_max_historico_pct: -32.3, tendencia: 'bajista', volatilidad_60d_pct: 18.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'oct-2025', var_pct: 14.1, causa: 'Acuerdo con Roche para fabricar un medicamento en desarrollo (21-oct-2025); la empresa estima que añadirá al menos un 20-25 % a las ventas de la CDMO de 2024 en 2030 [D24, B2].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ene-2026', var_pct: 19.0, causa: 'Sin un hecho único: mejoras de recomendación de los analistas y subida de Moderna; causa sin fuente primaria [D24].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb-2026', var_pct: 17.9, causa: 'Resultados de 2025 (25-feb): vuelta al crecimiento y guía de 2026 de un dígito alto a doble dígito bajo [D5, A1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-2026', var_pct: -31.6, causa: 'Resultados del 1T26 (6-may): beneficio −48 %, EBITDA −33 % y guía de 2026 rebajada al 0-10 % por el retraso del contrato de jeringas con una farmacéutica global (pendiente de autorización regulatoria) y la presión de precio en heparinas con socios sobrealmacenados; −16 % ese día [D5, D21, A8]. Está en la tesis: el caso base ya parte de la guía rebajada.', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-03-11', tipo: 'recomendación', hecho: 'Jefferies baja a Mantener (objetivo 83,5 EUR) por la incertidumbre de la demanda de ARNm y la concentración de clientes de la CDMO [D23].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-09', tipo: 'accionista de referencia', hecho: 'Indumenta Pueri (familia Domínguez, Mayoral) declara el 13,44 % (10,0 % en acciones y 3,4 % en instrumentos), desde el 11,25 % de fin de 2025: compra en la caída [C6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-24', tipo: 'accionista de referencia', hecho: 'JPMorgan AM sube su posición corta del 0,80 % al 1,51 %, la única por encima del 0,5 % [D9, D10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-16', tipo: 'demanda o regulador', hecho: 'Termina el contrato de distribución de Neparvis con Novartis (56,7 M de ventas en 2025, el 7,6 %), anunciado por la empresa en sus resultados [B2]. Es conocido y la guía de 2026 lo recoge; nuestro 2027e lo descuenta.', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-23', tipo: 'recomendación', hecho: 'Jefferies espera el «despegue» de Rovi en 2027 tras un año de inversiones (titular; objetivo no leído) [D24].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-05', tipo: 'resultados', hecho: 'Resultados de los nueve meses de 2026, antes de la apertura; consenso de ingresos del 3T26: 232,6 M [C10, D2].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-05',
      veredicto: 'no cambia',
      condicion: null,
      comentario: `La caída de mayo tiene causa conocida (guía rebajada, jeringas retrasadas, precio de la heparina) y la recoge el caso base. No hay colocaciones, ampliaciones ni ventas de directivos en 12 meses: el registro de la CNMV no tiene operaciones de directivos desde junio de 2023 y los dos accionistas de referencia compran [C6, C8]. El fin de Neparvis es conocido. Los resultados del 5-nov no aplazan nada (regla 11). Veredicto: no cambia.`,
    },
  },
};

export const parches = [];

export const comparables_criterio = `Farmacéuticas europeas de especialidades de tamaño medio (Almirall, Faes, Recordati, Ipsen, Hikma) y CDMO de inyectables y principios activos (Siegfried, Lonza), más Indivior por los inyectables de larga duración. Se quita Camurus (43,5 veces el EBITDA): crece a tasas de lanzamiento y distorsiona la media. No hay ningún comparable con la mezcla exacta de Rovi (heparina, CDMO y un antipsicótico propio) [D12].`;
export const comparables_comentario = `Rovi cotiza con prima sobre sus comparables: 18,6 veces el beneficio de los próximos 12 meses frente a una mediana de 14,5x, y 14,9 veces el EBITDA frente a 11,6x. Por múltiplos valdría 47-48 EUR por acción (−22 %). La prima se apoya en un ROIC del 20,8 % sin deuda (la mediana tiene 1,7 veces de deuda neta sobre EBITDA) y en un crecimiento esperado de los próximos 12 meses que el consenso pone por encima del 10 % por la vuelta de la CDMO. Lonza, la CDMO pura, cotiza a 29 veces; las especialidades, a 9-20. Rovi está entre los dos grupos, como su negocio. Los comparables pesan solo un 15 % porque ninguno tiene la capacidad vacía que Rovi espera llenar [D12].`;

export const etapa2_justificacion = null;

export const dcf_justificacion = {
  crecimiento: `2026e crece un 4,5 % (777 M), dentro de la guía del 0-10 % y con el 1S26 al +9,4 %; el consenso espera 774 M [A10, D7]. 2027e +10 %: un año entero de Phoenix (mínimo de 50 M USD al año de BMS), Roche y la entrada probable de las jeringas, menos los 56,7 M de Neparvis que se pierden [A12, B2]; el consenso espera +15 %. Después, 9 % a 3,5 %: en 2030 los ingresos serían 1.077 M, por debajo del objetivo de la empresa para 2030 (1,5-1,8 veces 2024, 1.146-1.375 M), que la empresa ya no ha cumplido en 2026 [A16].`,
  margenes: `El margen EBITDA de 2026e (25,5 %) es el del consenso sin el badwill de Phoenix; el 1S26 sin él fue del 17,1 % y el segundo semestre es siempre el fuerte (Moderna) [A10, D7]. Sube al 28 % en 2027e y al 30 % desde 2029e, por la absorción de costes fijos de las plantas al llenarse: en 2022, con la CDMO llena, fue del 34,1 %; en 2025, del 29,1 % con la ayuda LAISOLID [A1]. Por debajo del 31,9 % que el consenso espera para 2028e [D7].`,
  inversion: `Capex del 9 % de las ventas en 2026e (Phoenix y Granada), bajando al 5,4 % en 2035e; en 2025 fue del 9,1 % (67,8 M, 21,6 M de mantenimiento) [A1]. Amortización del 4,4 % al 5 %, por debajo del capex en todos los años. Circulante comercial del 45 % de las ventas, bajando al 42 %: la heparina obliga a tener mucha materia prima (existencias de 288 M) [A1].`,
  wacc: `Bund a 10 años del 26-oct-2026, 3,43 % [D13]. Beta 0,78: la semanal a dos años (0,67) ajustada a la Blume; la mensual a 5 años (0,26) la deforma la vacuna. Prima de mercado del 5,5 % y 0,5 puntos más por tamaño y por la concentración de clientes de la CDMO. Deuda a mercado del 3,3 %, a un 3 % antes de impuestos (préstamos del BEI y bancarios al 0,7-3,0 %) [D3]. WACC del 8,02 %.`,
  terminal: `Gordon con un crecimiento del 2,5 % (inflación del euro del 2 % más medio punto real, por debajo del Bund menos medio punto). El valor terminal pesa el 67 %. El múltiplo implícito se contrasta con la mediana de comparables (12,8 veces el EBITDA).`,
};

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 7.5, precio_pct: -2.0, otros_pct: -1.0, comentario: 'Volumen: CDMO (+38 % en el 1S26, Phoenix desde abril) y Okedi (+27 %); precio: heparinas con presión de precio (guía de caída de un dígito medio); otros: Neparvis solo hasta el 16-oct [A10, B2].' },
    { periodo: '2027e', volumen_pct: 17.0, precio_pct: -1.0, otros_pct: -6.0, comentario: 'Volumen: Phoenix un año entero, Roche, jeringas de la farmacéutica global si se autorizan y Okedi; otros: sale Neparvis (≈ 45 M de 2026) [A12, B2].' },
    { periodo: '2028e', volumen_pct: 9.5, precio_pct: -0.5, otros_pct: 0.0, comentario: 'Volumen de la CDMO (capacidad de más de 500 millones de jeringas, hoy a medio usar) y Okedi hacia sus 100-200 M de ventas máximas [B4, A16].' },
    { periodo: '2029e', volumen_pct: 8.5, precio_pct: -0.5, otros_pct: 0.0, comentario: 'Igual que 2028e, con menos crecimiento a medida que se llena la capacidad [A16].' },
    { periodo: '2030e', volumen_pct: 7.5, precio_pct: -0.5, otros_pct: 0.0, comentario: 'Plan de la empresa para 2030: CDMO de unos 700 M; nuestro caso base se queda por debajo [A16].' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: `Las pruebas del motor pasan tras rebajar el margen de largo plazo al 30 %: el capital nuevo rinde un 26,4 % frente al 21,8 % incremental histórico. Pero el crecimiento financiable al ROIC actual (4,4 %) queda por debajo del proyectado (6,2 %), y la diferencia la cubre la capacidad vacía de la CDMO, que solo se llena si los clientes firman y arrancan: la farmacéutica global ya retrasó las jeringas en 2026 y Moderna bajó de 409 a 270 M en dos años [A1, A8]. El poder de precios es débil en heparinas (caída de precio en 2026) [B2]. La cuota de mercado no se puede probar con el motor (son tres mercados distintos: 6,3 % en heparinas de bajo peso molecular, en torno al 2 % en CDMO estéril y al 1 % en antipsicóticos inyectables) [B]. Por eso «En parte».`,
};

export const dcf_lectura = `El DCF da 61,35 EUR por acción, prácticamente el precio del 26-oct (61,40 EUR, −0,1 %), con un 67 % del valor en el terminal. El DCF inverso lo confirma: con nuestro WACC del 8,02 %, el precio descuenta un crecimiento del 6,4 % anual en 2027e-2035e con un margen del 30 %, casi exactamente nuestro caso base (6,3 %); dicho de otro modo, a este precio el accionista obtiene un 8,0 % anual. No es exigente ni conservador: el mercado ya paga que la CDMO se vuelva a llenar, aunque sin el objetivo de la empresa para 2030. Con la prima que hoy pide el mercado (4,2 %, Damodaran) el DCF sube a 75,69 EUR, y ahí está la diferencia entre las dos reglas: Rovi rinde más que lo que pide el mercado, pero no más que su coste de capital.`;

export const narrativas = {
  Bajista: 'El contrato de jeringas no arranca o se queda pequeño, Moderna sigue bajando y la heparina pierde precio, como en 2024-2026. La CDMO no llena la capacidad y el margen se queda en el 26 %.',
  Base: 'La CDMO se recupera con Phoenix, Roche y las jeringas desde 2027, Okedi sigue creciendo y la heparina se estabiliza; los ingresos llegan a 1.077 M en 2030 con un margen del 30 %, por debajo del plan de la empresa.',
  Alcista: 'Se cumple el plan de 2030 (CDMO de unos 700 M e ingresos de 1,5 veces los de 2024): las jeringas arrancan en 2027, Roche y BMS crecen y Okedi se acerca a los 100 M.',
};
export const escenarios_comentario = `La asimetría no compensa con nuestro WACC: el alcista (78,25 EUR) gana un 27,4 % y el bajista (40,16 EUR) pierde un 34,6 %. El bajista es verosímil porque ya ha pasado: la CDMO cayó un 34 % entre 2023 y 2025 y la guía de 2026 se rebajó a los cuatro meses. El alcista exige que el plan de 2030 se cumpla, cosa que la empresa no ha demostrado.`;

export const suma_partes = { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Rovi no publica el resultado de cada negocio (especialidades y CDMO comparten plantas, compras y estructura), así que no hay EBITDA por segmento al que aplicar un múltiplo [A1].', confianza: 'Media' };

export const valoracion_comentario = `Pesos: DCF 60 %, escenarios 25 % y comparables 15 %; transacciones 0 % (sin múltiplos de EBITDA publicados y con una oferta improbable por el control familiar). El DCF es el método más fiable: sin deuda, con la inversión ya hecha y una caja que depende sobre todo de cuánto se llene la CDMO, que es lo que mueven los escenarios. Los comparables pesan poco porque ninguno tiene la mezcla de Rovi. Los métodos se agrupan por debajo del precio (DCF 61,35; escenarios 60,28; comparables 47,64), y el valor intrínseco queda en 59,03 EUR (−3,9 %). La recomendación la decide el objetivo a 12 meses (regla v3): +10,7 % ponderado, por debajo del 15 % que pide una compra.`;

export const excluidos = 'Historia ADELANTADA en base ajustada (precio de cierre de cada año ÷ BPA real del año siguiente; el BPA publicado de 2021-2025 no lleva no recurrentes relevantes, así que ajustado = publicado; el de 2026e es el nuestro sin el badwill de Phoenix): 2020 13,7x (37,90 ÷ 2,76); 2021 19,8x (73,80 ÷ 3,73); 2022 11,3x (36,06 ÷ 3,20); 2023 22,5x (60,20 ÷ 2,67); 2024 22,9x (62,95 ÷ 2,75); 2025 26,6x (63,50 ÷ 2,39). No se excluye ningún año: 2021-2022 son de pico por la vacuna, pero no cumplen ninguna regla de exclusión. Mediana y mínimo de los últimos cinco (2021-2025); media larga de los seis. Cierres de Yahoo [D1]; BPA de las cuentas [A1, A7].';

export const just12m = {
  Bajista: 'Ventas de 865 M en 2028e y margen EBITDA del 26 %: las jeringas no arrancan, Moderna sigue bajando y la heparina pierde precio. BPA de 2,74 EUR, casi el de 2025.',
  Base: 'Ventas de 932 M en 2028e (Phoenix, Roche, jeringas desde 2027 y Okedi, sin Neparvis) y margen EBITDA del 29,5 %. BPA de 3,44 EUR, un 25 % más que 2025.',
  Alcista: 'Ventas de 983 M en 2028e y margen del 31,5 %, camino del plan de 2030 de la empresa. BPA de 3,93 EUR.',
};

export const diferencia_consenso = `Nuestro BPA base de 2028e (3,44 EUR) queda un 17 % por debajo del consenso (4,16) [D7]. La diferencia sale de las ventas (932 M frente a 978 M) y del margen (29,5 % frente al 31,9 %): el consenso se acerca al plan de 2030 de la empresa y nosotros partimos de la guía rebajada en mayo, de la salida de Neparvis (56,7 M) y de que el contrato de jeringas aún no tiene fecha. La revisamos supuesto a supuesto y la mantenemos. Nuestro precio base a 12 meses (74,30 EUR) queda casi igual que el objetivo medio de los analistas (73,69), porque el PER de la regla (21,6x) es mayor que el que implícitamente usa el consenso.`;

export const objetivo12m_comentario = `Valor intrínseco de 59,03 EUR (−3,9 %) frente a un objetivo a 12 meses ponderado de 67,00 EUR (+10,7 % con dividendo; base +22,6 %). La distancia entre los dos es del 13,5 %: la rentabilidad a 12 meses supone que el mercado mantiene un PER de unas 21 veces sobre un beneficio que crece un 25 % hasta 2028e, mientras que el DCF dice que, con ese crecimiento, el precio de hoy ya es justo. Lo que hunde la ponderada es el bajista: el mínimo de cinco años del PER (11,3x, en 2022) sobre un BPA un 20 % menor da 30,96 EUR. Con la historia al cierre (v2, control) la ponderada es del 8,8 %.`;

export const catalizadores = {
  items: [
    { fecha: '5-nov-2026', evento: 'Resultados de los nueve meses de 2026', efecto: 'Confirmación de la guía de 2026 (0-10 %) y primera lectura del 3T de la CDMO con Phoenix; consenso de ingresos del 3T: 232,6 M [D2].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'La guía de 2027 dirá si arranca el contrato de jeringas y cuánto pesa la salida de Neparvis; es el dato que más mueve el BPA de 2028e.', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027 (sin fecha)', evento: 'Autorización regulatoria del producto de la farmacéutica global en jeringas', efecto: 'Arranque de la fabricación rutinaria de hasta 100 millones de jeringas al año; su retraso fue la causa de la rebaja de mayo [A8, B].', probabilidad: 'Media', sentido: '+' },
    { fecha: '2027', evento: 'Datos de Moderna (vacuna personalizada contra el melanoma) y pedidos de vacunas', efecto: 'La CDMO depende aún de Moderna; una aprobación del producto oncológico daría volumen nuevo en Granada y Madrid [D24].', probabilidad: 'Baja', sentido: '+' },
    { fecha: '2026-2027', evento: 'Fase III de letrozol con tecnología ISM y nuevos mercados de Okedi', efecto: 'Más gasto de I+D en 2026-2027 (33,3 M en el 1S26) y opción de un segundo producto propio [A10, A16].', probabilidad: 'Media', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'El contrato de jeringas con la farmacéutica global se retrasa otra vez o se recorta', tipo: 'Comercial (CDMO)', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−35 % (escenario bajista)', mitigante: 'Capacidad ya construida: no hay que invertir más para servirlo; Phoenix y Roche diversifican.', senal: 'Guía de 2027 sin el contrato o nuevo retraso en los resultados del 5-nov.' },
    { riesgo: 'Moderna sigue reduciendo pedidos', tipo: 'Concentración de clientes', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 a −20 %', mitigante: 'Contrato de diez años desde 2022; productos oncológicos nuevos de Moderna fabricados por Rovi.', senal: 'Ventas de la CDMO del 2S por debajo de las del 2S25 (≈ 192 M).' },
    { riesgo: 'Precio de la heparina (biosimilares chinos, Techdow) y socios con existencias altas', tipo: 'Precio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Integración vertical (Glicopepton) y marcas propias en Europa.', senal: 'Ventas de heparinas de 2026 con caída de más de un dígito medio.' },
    { riesgo: 'Pérdida de Neparvis y de otros productos licenciados', tipo: 'Licencias', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−3 a −5 %', mitigante: 'Ya está en nuestro 2027e; el margen de un producto licenciado es menor que el de la cuenta.', senal: 'Ventas de especialidades de 2027 por debajo de 440 M.' },
    { riesgo: 'Ejecución en Phoenix (planta comprada con pérdidas)', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 a −4 %', mitigante: 'Pago mínimo de BMS de 50 M USD al año durante cinco años [A12].', senal: 'Pérdidas de Phoenix en 2027.' },
    { riesgo: 'Control familiar y poco capital flotante', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Descuento de liquidez', mitigante: 'Familia que compra, comisiones 100 % independientes [C1].', senal: 'Operaciones vinculadas crecientes o ampliaciones sin derecho de suscripción.' },
  ],
  premortem: `Es octubre de 2029 y Rovi vale un 40 % menos. Lo que pasó: el contrato de jeringas con la farmacéutica global se retrasó por segunda vez en 2027 y acabó con volúmenes muy inferiores a los 100 millones de unidades anuales; Moderna, sin nuevos productos aprobados, siguió bajando pedidos; y la heparina entró en una guerra de precios con los biosimilares chinos. La CDMO, con más de 500 millones de jeringas de capacidad, se quedó en el 40 % de uso y el margen EBITDA en el 25 %. El BPA no pasó de 2,7 EUR y el mercado volvió a pagar 11-13 veces, como en 2022. La señal que lo habría anticipado era la guía de 2027: si en febrero de 2027 no incluye el contrato de jeringas con fecha, la tesis de recuperación se retrasa un año.`,
  ia: { exposicion: 'Baja', sentido: 'Neutral', efecto_valor: '0 % a +3 %', comentario: 'La IA no sustituye lo que vende Rovi: llenado aséptico de inyectables, heparinas y un antipsicótico inyectable, que requieren plantas aprobadas por los reguladores. Puede acelerar la I+D (formulaciones de liberación prolongada) y los controles de calidad de las plantas, y Rovi ya tiene una participada de software médico (Cells IA, 95 %) sin peso en las cuentas [A2]. Si la IA acelera el descubrimiento de fármacos y hay más productos inyectables en desarrollo, la demanda de CDMO estéril sube: efecto ligeramente positivo. Señal: anuncios de contratos de CDMO con biotecnológicas nuevas.' },
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Contrato de jeringas', pregunta: '¿Qué autorización falta, con qué fecha esperada y cuántas unidades del mínimo contractual se facturarán en 2027?', por_que: 'Es la diferencia entre nuestro base y el consenso en 2027-2028.' },
    { tema: 'Neparvis', pregunta: '¿Qué margen de contribución dejaba Neparvis y qué lo sustituye en especialidades?', por_que: 'Sale el 7,6 % de las ventas de 2025; el efecto en el EBITDA depende del margen de distribución.' },
    { tema: 'Moderna', pregunta: '¿Qué volumen mínimo tiene el contrato con Moderna en 2027-2031 y qué peso tienen los productos oncológicos?', por_que: 'Moderna explica casi toda la caída de la CDMO entre 2023 y 2025.' },
    { tema: 'Heparinas', pregunta: '¿Cuánto ha bajado el precio de la enoxaparina en 2026 y cuándo se normalizan las existencias de los socios?', por_que: 'La heparina es el 35 % de las ventas y la guía prevé una caída de un dígito medio.' },
    { tema: 'Phoenix', pregunta: '¿Cuándo da beneficio Phoenix y cuánto de su capacidad está libre para terceros además de BMS?', por_que: 'Se compró con badwill de 62,4 M y dio pérdidas en el 2T26.' },
    { tema: 'Plan 2030', pregunta: '¿Se mantiene el objetivo de ingresos de 1,5-1,8 veces 2024 tras la rebaja de 2026?', por_que: 'Nuestro base queda por debajo del extremo bajo; el alcista lo cumple.' },
  ],
  confianza: 'Media',
};

export const fuentes = [
  { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
];
export const huecos = [];

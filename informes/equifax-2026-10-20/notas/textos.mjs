// Textos del analista (Equifax, corte 2026-10-20). Citas: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// Las cifras del motor se copian tal cual del último cálculo.
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

// EBITDA ajustado 2026e por negocio: estimación propia con la guía de julio [A21] y la de octubre [A29]
// (el grupo, 2.125 M en el punto medio; los costes corporativos cuadran la suma).
export const suma_partes = {
  aplica: true,
  descuento_holding_pct: 0,
  partes: [
    { segmento: 'Workforce Solutions', metrica: 'EBITDA ajustado 2026e', valor_metrica: 1435, multiplo: 15.0, ev_directo: null, justificacion: 'The Work Number: 223 millones de registros activos (+12 %), margen EBITDA ajustado del 51,4 % en el 3T26 y un objetivo de crecimiento del 13-15 % anual [A28, A29, A21]. 15 veces, entre FICO (12,6x) y Verisk (14,9x) por abajo y Moody\'s (19,1x) y MSCI (20,3x) por arriba [D25-D29].' },
    { segmento: 'U.S. Information Solutions', metrica: 'EBITDA ajustado 2026e', valor_metrica: 780, multiplo: 9.5, ev_directo: null, justificacion: 'Agencia de crédito de EE. UU., con la hipoteca como primer riesgo (informe doble y FICO) [A29, B37]. TransUnion, el par más directo, cotiza a 9,7 veces el EBITDA de los próximos 12 meses [D23].' },
    { segmento: 'International', metrica: 'EBITDA ajustado 2026e', valor_metrica: 428, multiplo: 10.0, ev_directo: null, justificacion: 'Burós en Reino Unido, Canadá, Australia y Latinoamérica con un margen EBITDA ajustado del 30,9 % en el 3T26 [A28]. Por debajo de Experian (11,1x), con más escala [D24].' },
    { segmento: 'Costes corporativos', metrica: 'EBITDA ajustado 2026e', valor_metrica: -518, multiplo: 12.0, ev_directo: null, justificacion: 'Costes centrales no asignados (529 M en 2025) [A4], capitalizados al múltiplo medio ponderado de los tres negocios.' },
  ],
  comentario: `La suma de partes da 184,01 USD por acción, un 16,0 % sobre el precio, y enseña dónde está el valor. Workforce Solutions, a 15 veces su EBITDA ajustado de 2026e (1.435 M, estimación propia con la guía), vale unos 21.500 M: casi todo el valor empresa de mercado del grupo (23.999 M). A 158,57 USD, una vez pagado Workforce Solutions a 15 veces, quedan unos 2.500 M para la agencia de crédito de EE. UU. y la división internacional netas de los costes centrales; esos dos negocios suman 1.208 M de EBITDA. Esa lectura es la que hace atractiva la acción y también la que la hace frágil: si la presión de precios llega a la verificación, el múltiplo de 15 veces cae. Los múltiplos de cada parte son los de sus pares más directos [D23-D38]; sin descuento de conglomerado, porque los tres negocios comparten datos, clientes y la plataforma en la nube [A1].`,
  confianza: 'Media',
};

export const limitaciones = `Una sola línea cotizada (NYSE: EFX), en dólares, como las cuentas (US GAAP). El precio es el cierre del 19-oct-2026 (158,57 USD): los resultados del 3T26 salieron el 20-oct antes de la apertura y la sesión del 20 no había cerrado al escribir [D3, A28]. Las acciones (117,9 M diluidas) son las 117,1 M en circulación a 30-sep más la dilución del 3T26, y el puente es del 30-sep-2026 del comunicado de resultados; pensiones y acuerdos judiciales devengados salen del 10-K y del 10-Q del 2T26, porque el 10-Q del 3T26 no estaba presentado [D1, D2, D4]. **El EBITDA de todo el informe es el contable más las partidas no recurrentes que la empresa excluye** (reestructuración, integración, litigios): coincide con su EBITDA ajustado (2.097,6 M en los 12 meses a septiembre frente a 2.097,9 publicado) [A28]. **El BPA del objetivo a 12 meses es el ajustado**, el de la guía (8,45-8,55 USD en 2026), sin amortización de intangibles adquiridos; el del consenso de MarketScreener es el contable, y el ajustado del consenso sale de Yahoo Finance [D5, D8]. **Desde 2026 los ingresos incluyen la reventa de la puntuación hipotecaria de FICO a margen casi nulo** (unos 375 M en 2026): infla el crecimiento unos 3 puntos y resta unos 2 al margen; la proyección separa esa línea [A29]. Los arrendamientos operativos no van a la deuda ni al puente (US GAAP). Círculo de Crédito (750 M, cierre en el 4T26) no está ni en la proyección ni en el puente [D14]. No hay aún transcripción de la conferencia del 3T26: lo de la dirección sale del comunicado y de la presentación [A28, A29].`;

export const controles_explicados = [
  { control: 'Regresión múltiplo-crecimiento', explicacion: 'La muestra mezcla burós, FICO y empresas de índices y calificaciones; el crecimiento no explica el múltiplo (R² 0,02). No se usa el valor de la regresión.' },
  { control: 'Comparables estables al quitar una empresa', explicacion: 'La mediana del EV/EBITDA se mueve entre 12,6x y 14,9x según qué empresa se quite; por eso los comparables pesan un 20 % y el comentario apoya la lectura en los burós y FICO (9,7-12,6x).' },
  { control: 'Crecimiento del BPA base', explicacion: 'El 26 % anual se mide desde el BPA contable de 2025 (5,32 USD), y el objetivo usa el ajustado: desde el ajustado de 2025 (7,65 USD) nuestro 10,63 de 2028e es un 11,6 % anual, con 2026 ya guiado en 8,45-8,55 [A4, A28].' },
];

export const huecos_resueltos = [
  { seccion: 'Sector y mercado', campo: 'Peso de las hipotecas en los ingresos de USIS y de Equifax' },
];

const rentabilidad = {
  comentario: `**Equifax no cubre hoy su coste de capital a nivel de grupo.** El ROIC después de impuestos pasa del 14,1 % de 2017 y el 14,3 % de 2020 al 8,5 % de 2023 y el 9,3 % de 2025, por debajo del WACC del 10,25 %: ROIC menos WACC de −0,9 puntos. La causa es el capital, no el margen: el capital invertido sube de 5.264 M en 2016 a 9.705 M en 2025 por las compras de 2021-2023 (Kount, Appriss Insights, Boa Vista), y el fondo de comercio es el 68 % de él. Sin fondo de comercio, el ROIC es del 29,5 %: el negocio operativo es muy rentable, pero las compras se pagaron caras. El ROIC incremental de 2016-2025 es del 7 %. TransUnion, con el mismo problema, tiene un ROIC del 7,6 %; Experian, del 15 %; FICO, del 65 % [D31-D33]. La compra de Círculo de Crédito a 12,1 veces el EBITDA [D14] no lo mejora a corto plazo.`,
  confianza: 'Media',
};

const multiplos_historicos = {
  comentario: `A 11,4 veces el EBITDA de los últimos 12 meses, Equifax cotiza cerca de su mínimo de diez años (12,0x en 2018, tras el ciberataque). En BPA ajustado adelantado, el PER de hoy es de 16,8 veces frente a una mediana de 33,3 veces en 2021-2025 y un mínimo de 25,8 veces: la mitad de su historia. Parte del descuento es estructural: el bono a 10 años está en el 5,15 % [D10], frente al 1-2 % de 2020-2021; el regulador hipotecario ataca los precios de las agencias [B4], FICO vende directo [B15] y el ROIC del grupo ya no cubre el WACC. Por eso el método trata a Equifax como «desrateada» y usa la regla v2, que no supone que el múltiplo antiguo vuelva.`,
  confianza: 'Media',
};

const comparables = {
  comentario: `Equifax cotiza a 10,4 veces el EBITDA de los próximos 12 meses y a 16,6 veces su BPA ajustado, frente a una mediana de 13,8 veces y 22,3 veces en la muestra [D23-D43]. La mediana no es la referencia buena: Moody's, S&P Global, MSCI y Verisk ganan márgenes EBITDA del 51-61 % y no dependen del ciclo hipotecario. El grupo útil son los burós y FICO: TransUnion a 9,7 veces el EBITDA y 13,8 veces el BPA, Experian a 11,1 y 19,4, y FICO a 12,6 y 15,9 [D23-D25, D39, D40]. Equifax está en medio, con una prima sobre TransUnion que se explica por Workforce Solutions (41 % de los ingresos del 3T26 con un margen EBITDA del 51,4 %) [A28]. El PER de la tabla para Equifax (20,3x) es el contable; con el ajustado de los comparables sería 16,6x. Con la mediana, los comparables dan 199,05 USD; con los múltiplos de TransUnion, Equifax valdría menos que el precio. Pesan un 20 %.`,
  confianza: 'Media',
};

export const secciones = { rentabilidad, multiplos_historicos, comparables };

export const etapa2_justificacion = `No se usa la etapa de transición. A favor está Workforce Solutions: The Work Number tiene 223 millones de registros activos, varias veces los de Experian Verify, y gana un 51,4 % de margen EBITDA [A29, A28, B13]; la dirección le pide un 13-15 % de crecimiento anual a largo plazo [A21], y Medicaid exigirá verificar los requisitos de trabajo desde 2027 [B18]. En contra, el ROIC del grupo (9,3 %) está por debajo del WACC (10,25 %), no cinco puntos por encima como exige el método, y el incremental de 2016-2025 es del 7 %: crecer más no crea valor. El precio de la verificación está bajo una demanda antimonopolio y la presión de los programas públicos [B45, B17], y la verificación con permiso del consumidor ataca ese foso [B24, B25, B46].`;

export const dcf_justificacion = {
  crecimiento: `La proyección separa dos líneas. La reventa de la puntuación de FICO entra a margen casi nulo: unos 375 M en 2026 y 390 M en 2027, y baja a 330 M en 2029 con la adopción de VantageScore (unos 2.000 prestamistas ya la usan) [A29]. El negocio propio crece un 6,6 % en 2026e (punto medio de la guía sin FICO, 6,3-6,8 %), que fija el año en 6.661 M [A28, A29]. Después crece un 6,0 % en 2027e, un punto menos que en el informe del 8-oct, porque el tipo hipotecario a 30 años subió del 6,43 % al 7,40 % entre julio y octubre [B35] y la empresa espera un mercado débil el resto de 2026 [A28]; un 7,0 % en 2028e-2029e con Gobierno y Talent Solutions, y baja al 4,0 % en 2035e. Es la parte baja del marco orgánico de la dirección (7-10 %) [A21]: **no proyectamos recuperación del volumen hipotecario**; las consultas duras cayeron un 9 % en el 3T26 [A29].`,
  margenes: `El margen EBITDA ajustado sin FICO pasa del 33,8 % de 2026e (guía: 2.116-2.133 M, con el margen sin FICO +100 pb) [A29] al 34,3 % en 2027e y al 36,0 % desde 2032e, medio punto al año, apoyado en los 150 M de ahorros por IA de 2026-2028 [A12, A28]. El 36 % es el margen de 2016-2017, antes de la nube; no lo superamos. Con FICO, el margen del grupo va del 31,9 % de 2026e al 34,7 % de 2035e.`,
  inversion: `La nube ya está hecha: el capex bajó del 12,2 % de las ventas en 2022 al 7,9 % en 2025 [A3]. Lo llevamos del 7,5 % de 2026e al 7,0 % en 2030e, por encima del 5,5-6,5 % de 2016-2017, porque parte del capex es desarrollo de producto. La amortización baja del 11,4 % al 7,0 %: la de intangibles de compras (unos 245 M en 2026) se agota y la del software se iguala al capex. Circulante del 13,0 % de las ventas; impuestos del 27 % en 2026e y del 26 % después. El flujo libre de los 12 meses a septiembre es de 1.104 M [A28].`,
  wacc: `Tasa libre del 5,15 %: el Tesoro a 10 años del 19-oct-2026 [D10]. Beta de 1,21, la ajustada mensual a cinco años frente al S&P 500 [D3]; la sectorial de Damodaran reapalancada da 0,91 [D12]: con ella el WACC bajaría un punto y medio y el DCF subiría con fuerza, por eso la regla relativa (con la prima del mercado) se da al lado. Prima de mercado del 5,5 %, sin prima adicional. Deuda al 6,3 % antes de impuestos (Tesoro más el diferencial de 115 pb de la emisión a 2033 de julio) [D13], con un 21,8 % de peso a valor de mercado. WACC del 10,25 %.`,
  terminal: `Gordon al 3,0 %: un punto real y alrededor de un 2 % de inflación en dólares, por debajo del techo de coherencia (tasa libre menos medio punto, 4,65 %). El valor terminal pesa el 55 %. En el último año el capex iguala la amortización (7,0 %) y el circulante sigue en el 13 %, coherente con crecer al 3 %.`,
};

export const dcf_lectura = `El DCF da **147,31 USD por acción**, un 7,1 % por debajo del precio, con un valor terminal que pesa el 55 %. **El DCF inverso dice que el precio descuenta un crecimiento de los ingresos del 6,4 % anual en 2027e-2035e**, frente al 5,5 % de nuestro caso base, **o un margen EBITDA del 36,3 %** frente al 34,7 %. Es decir: tras la subida de la acción desde el mínimo de 137,01 USD de septiembre, el mercado ya paga algo más de lo que proyectamos sin recuperación hipotecaria. La rentabilidad implícita en el precio es del 9,9 %, por debajo de nuestro WACC del 10,25 %. Con el precio del informe anterior (142,43 USD) el DCF daba margen; hoy no. La sensibilidad es alta: medio punto más de WACC baja el valor a 134,77 USD, y medio punto más de crecimiento terminal lo sube a 155,70. Con la prima implícita del mercado (4,20 %), el WACC baja al 9,02 % y el DCF sube a 187,15 USD: la tesis a favor depende de aceptar un coste de capital más bajo que el que da la beta histórica.`;

export const narrativas = {
  Bajista: 'La FHFA ordena el informe doble en 2027 y los originadores negocian precio; FICO se lleva la reventa de su puntuación; los programas públicos y la demanda antimonopolio fuerzan a bajar los precios de The Work Number. Es 2022-2023 otra vez: un año de caída (−6 puntos de crecimiento y −3 de margen en 2027e) y luego 2,5 puntos menos de crecimiento y 2 de margen [A3, B4, B37, B45].',
  Base: 'Sin recuperación del volumen hipotecario; la hipoteca débil y el informe doble restan un punto de crecimiento en 2027e; Gobierno y Talent Solutions sostienen Workforce Solutions; el margen sin FICO sube medio punto al año hasta el 36 %.',
  Alcista: 'Los tipos hipotecarios bajan y las consultas recuperan parte de lo perdido en 2028-2029 [B35], la FHFA mantiene los tres informes y Medicaid amplía la verificación pública: 1,5 puntos más de crecimiento y de margen, con 3-4 puntos adicionales de crecimiento en 2028e-2029e.',
};

export const escenarios_comentario = `Con nuestro coste de capital, el reparto no compensa: el alcista vale 184,90 USD (+16,6 %) y el bajista 97,66 USD (−38,4 %), una asimetría de 0,43 veces; el valor ponderado (25/50/25) es de 144,29 USD. El bajista no es cosmético: suma el informe doble, que la FHFA prepara [B37], la venta directa de FICO [B15] y la presión sobre el precio de la verificación [B17, B45]. Con la prima que hoy pide el mercado, el bajista queda en 124,03 USD y el alcista en 233,80 USD: una asimetría de 2,18 veces. La diferencia entre las dos lecturas es solo de tasa de descuento, no de cifras.`;

export const valoracion_comentario = `El valor objetivo es de **160,42 USD** (+1,2 %): DCF 40 %, escenarios ponderados 30 %, comparables 20 % y suma de partes 10 %. El DCF (147,31) y los escenarios (144,29) mandan porque el debate sobre Equifax es de flujos a largo plazo (cuánto margen sobrevive al informe doble, a FICO y a la presión de precios) y ningún múltiplo actual lo recoge. Los comparables (199,05 USD) pesan menos porque la mediana mezcla empresas de calificaciones e índices con márgenes del 51-61 %. La suma de partes (184,01 USD) es control: dice que el precio paga sobre todo Workforce Solutions. Las transacciones no pesan: tres con múltiplo y Equifax es compradora. El puente resta la deuda financiera (5.206,7 M), los minoritarios (141,3 M), las pensiones netas (78,7 M) y 70 M de acuerdos judiciales, y suma la caja (192,9 M), a 30-sep-2026 [D1, D2]: deuda neta ajustada de 5.163 M. Con la prima del mercado (4,20 %) el objetivo sube a 187,98 USD; el objetivo medio de 24 analistas es 194,00 USD, a la baja [D6, D7].`;

export const catalizadores = {
  items: [
    { fecha: 'Oct-dic 2026', evento: 'Orden de la FHFA para aceptar dos informes de crédito en las hipotecas de Fannie Mae y Freddie Mac; Bloomberg la adelantó el 1-oct y no hay anuncio oficial [B37, B42].', efecto: 'La empresa cifra el riesgo en unos 80 M de ingresos y 38 M de margen [A29]; el calendario de aplicación importa tanto como la decisión.', probabilidad: 'Alta', sentido: '−' },
    { fecha: '4T26', evento: 'Cierre de la compra de Círculo de Crédito (México), 750 M de valor empresa, 12,1 veces el EBITDA ajustado [D14].', efecto: 'Deuda neta hacia unos 5.760 M (≈2,7 veces el EBITDA) y un buró que crece al 31 % [A28, D14].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '1-ene-2027', evento: 'Entran en vigor las verificaciones de los requisitos de trabajo de Medicaid [B18].', efecto: 'Volumen nuevo para Gobierno en Workforce Solutions (unos 550 M de contratos firmados en 2026) [A29].', probabilidad: 'Media', sentido: '+' },
    { fecha: 'Feb-2027', evento: 'Resultados de 2026 y guía de 2027.', efecto: 'Dirá si el margen sin FICO sigue subiendo y cuánto pesa la hipoteca débil en 2027.', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Conversión de prestamistas a VantageScore 4.0, que Equifax vende a 1 USD [B44, A29].', efecto: 'Menos reventa de FICO sin margen y algo más de margen propio.', probabilidad: 'Media', sentido: '+' },
    { fecha: 'Sin fecha', evento: 'Investigación de la CFPB y demanda antimonopolio sobre The Work Number [C33, B45].', efecto: 'Una sanción con cambios de precio sería el riesgo más directo sobre el negocio más valioso.', probabilidad: 'Baja', sentido: '−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Informe doble (o único) en las hipotecas de Fannie Mae y Freddie Mac', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'La empresa: ≈80 M de ingresos y 38 M de margen (≈−3 % del valor, estimación propia); con presión de precio, hacia el bajista (−38,4 %)', mitigante: 'Equifax vende informes junto con The Work Number y VantageScore a 1 USD [A29, B44].', senal: 'Orden de la FHFA y su calendario; cuota de Equifax en los informes que eligen los originadores.' },
    { riesgo: 'Pérdida de precio en The Work Number por la presión pública, la demanda antimonopolio y la verificación con permiso del consumidor', tipo: 'Competencia y regulación', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Hacia el bajista (−38,4 %) si el múltiplo de Workforce Solutions cae de 15 a 10 veces', mitigante: '223 millones de registros activos; obligación de consulta en California [A29, B46].', senal: 'Margen EBITDA ajustado de Workforce Solutions por debajo del 50 % (51,4 % en el 3T26) [A28].' },
    { riesgo: 'Hipoteca hundida más tiempo con el tipo a 30 años por encima del 7 %', tipo: 'Cíclico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Entre el base y el bajista; la guía de 2026 ya baja 80 M por ello [A28]', mitigante: 'El caso base no proyecta recuperación del volumen.', senal: 'Consultas hipotecarias que siguen cayendo (−9 % en el 3T26) [A29].' },
    { riesgo: 'Coste de capital: beta de 1,21 y bono a 10 años del 5,15 %', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'WACC +0,5 puntos: −8,5 % (134,77 USD)', mitigante: 'Flujo libre de 1.104 M en 12 meses y rating BBB/Baa2 [A28, D13].', senal: 'Diferencial de los bonos de Equifax sobre el Tesoro.' },
    { riesgo: 'FICO se queda la puntuación hipotecaria', tipo: 'Proveedor', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: 'Poco valor: la reventa va a margen casi nulo', mitigante: 'La reventa sin margen ya está separada en el modelo; VantageScore como alternativa [A29].', senal: 'Peso de la licencia directa de FICO en los informes hipotecarios.' },
    { riesgo: 'Deuda al alza antes de pagar Círculo de Crédito', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Menos recompras; sin efecto directo en el DCF', mitigante: 'Crédito revolving ampliado a 2.000 M en abril [C35].', senal: 'Deuda neta por encima de 3,0 veces el EBITDA.' },
    { riesgo: 'Litigios por calidad de datos y otro incidente de ciberseguridad', tipo: 'Legal y operativo', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'El acuerdo del error de 2022 costó 100 M (40 M netos) [A2]; el ciberataque de 2017, unos 1.960 M [A4-A11]', mitigante: 'Plataforma en la nube y gasto de seguridad desde 2018.', senal: 'Nuevas demandas colectivas FCRA o sanciones de la CFPB.' },
    { riesgo: 'Sucesión del consejero delegado y ventas de directivos', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Sin efecto directo en el valor', mitigante: 'Presidente independiente y un 90 % de consejeros independientes [C14].', senal: 'Anuncio de sucesor o salida del director financiero; el consejero delegado vendió 32,06 M en 12 meses [C38].' },
  ],
  premortem: `Octubre de 2029: la acción vale unos 95 USD, un 40 % menos. A finales de 2026 la FHFA ordenó el informe doble y, un año después, permitió el único para los préstamos con verificación automatizada [B37]. Los grandes originadores sacaron a concurso las agencias y Equifax perdió buena parte de sus informes hipotecarios; FICO terminó de pasar su puntuación a la venta directa [B15]. El golpe fuerte llegó en Workforce Solutions: la demanda antimonopolio y la presión de los programas públicos acabaron en precios máximos para Medicaid y SNAP, y Fannie Mae aceptó la verificación por nómina con permiso del consumidor a mitad de precio [B45, B17, B46]. El margen de Workforce Solutions bajó del 51 % al 45 % y su múltiplo, de 15 a 10 veces. Con el tipo hipotecario por encima del 7 % [B35] las consultas no volvieron, y la deuda (Círculo de Crédito pagado con deuda) frenó las recompras. Las señales estaban a la vista: la orden de la FHFA, un margen de Workforce Solutions por debajo del 50 % en dos trimestres y contratos públicos ganados por otros proveedores.`,
  ia: {
    exposicion: 'Media',
    sentido: 'Mixto',
    efecto_valor: '−5 % a +5 % a 3-5 años (entre el base y una variante con 1 punto menos de margen); el bajista (−38,4 %) recoge el caso malo',
    comentario: `La IA toca a Equifax por dos lados. A favor: la empresa usa sus datos propios no públicos (The Work Number, ficheros de crédito) para modelos y puntuaciones nuevas, y la IA rebaja costes: 150 M de ahorro en 2026-2028 que ya se ven en el margen sin FICO (+100 pb en 2026) [A28, A29]; el índice de productos nuevos pasa del 17 % [A28]. En contra: los agregadores con permiso del consumidor (Truv, Argyle, Plaid) y la banca abierta permiten verificar ingresos y decidir crédito con datos de la nómina o la cuenta bancaria sin pasar por la agencia, y la norma 1033 de la CFPB está en revisión [B24, B25, B47]. Es la amenaza directa al negocio más valioso. Señal: contratos públicos o hipotecarios de verificación ganados por agregadores, o margen de Workforce Solutions por debajo del 50 %.`,
  },
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Informe doble', pregunta: '¿Cómo se calcula el riesgo de 80 M de ingresos y 38 M de margen, y qué cuota espera retener si los originadores eligen dos agencias?', por_que: 'Es la diferencia entre el caso base y el bajista [A29].' },
    { tema: 'Precio de la verificación', pregunta: '¿Cuánto del crecimiento de Workforce Solutions es precio y cuánto registros y volumen, y qué compromisos de precio hay en los contratos públicos?', por_que: 'La demanda antimonopolio y los programas públicos apuntan al precio [B45, B17]; el margen del 51,4 % sostiene el valor.' },
    { tema: 'Verificación con permiso del consumidor', pregunta: '¿Qué cuota han ganado Truv, Argyle o Experian en verificación hipotecaria y pública, y a qué precio?', por_que: 'Es la amenaza directa al foso [B24, B25, B46].' },
    { tema: 'Hipoteca', pregunta: '¿Qué supone la guía de 2027 para las originaciones con el tipo a 30 años por encima del 7 %?', por_que: 'La guía de 2026 ya baja 80 M por la hipoteca [A28, B35].' },
    { tema: 'Capital', pregunta: '¿Por qué pagar 12,1 veces el EBITDA por Círculo de Crédito con el ROIC del grupo por debajo del WACC, y cuál es el apalancamiento objetivo?', por_que: 'El ROIC incremental de 2016-2025 es del 7 % [D14].' },
    { tema: 'Flujo de caja', pregunta: '¿Por qué el flujo operativo de nueve meses está plano pese a un beneficio mayor?', por_que: 'Más circulante; en 9M26 los pagos al accionista (851 M) superan el flujo libre (763 M) [A28].' },
    { tema: 'Sucesión', pregunta: '¿Cuál es el calendario de sucesión del consejero delegado?', por_que: 'Contrato sin fecha de fin y ventas de 32,06 M en 12 meses [C38].' },
  ],
  confianza: 'Media',
};


// Objetivo a 12 meses: BPA AJUSTADO propio de 2028e (el de la guía de la empresa: sin amortización de intangibles adquiridos
// ni no recurrentes). Fórmula: EBITDA − amortización + intangibles adquiridos (235 M en 2028e) − intereses (245 M, deuda de
// sep-26 sin Círculo de Crédito, que queda fuera de la proyección y del puente) al 26 % − 4 M de minoritarios, ÷ 117,9 M de acciones
// diluidas de hoy sin recompras. Control 2026e: 8,42 USD frente a la guía de 8,45-8,55 (tipo del 27 % frente al ~25 % de la empresa).
export const objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 8.92, multiplo: null, precio: null, justificacion: 'Un año de caída hipotecaria e informe doble en 2027e (crecimiento −0,1 %, margen 29,4 %) y después 2,5 puntos menos de crecimiento y 2 de margen: ventas de 6.899 M y EBITDA de 2.148 M en 2028e. BPA ajustado de 8,92 USD, casi plano frente a la guía de 2026.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 10.63, multiplo: null, precio: null, justificacion: 'Sin recuperación hipotecaria; el negocio sin FICO crece un 6 % en 2027e y un 7 % en 2028e, con el margen sin FICO del 34,8 %: ventas de 7.490 M y EBITDA de 2.481 M. BPA ajustado de 10,63 USD (9,45 en 2027e).' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 11.94, multiplo: null, precio: null, justificacion: 'Las consultas hipotecarias recuperan parte de lo perdido en 2028e (+4 puntos de crecimiento) y el margen sube 1,5 puntos más: ventas de 7.882 M y EBITDA de 2.730 M. BPA ajustado de 11,94 USD.' },
  ],
  per_historico: {
    base: 'adelantado', actual: 16.8, mediana_5a: 33.3, minimo_5a: 25.8, media_larga: 29.4, anios: 5,
    excluidos: 'Historia ADELANTADA en BPA ajustado (precio de cierre ÷ BPA ajustado del año siguiente): 2019 20,1x; 2020 25,2x; 2021 38,7x; 2022 29,0x; 2023 33,9x; 2024 33,3x; 2025 25,8x (sobre nuestro 8,42 de 2026e). No hay BPA ajustado publicado antes de 2020 en las cuentas leídas, así que la serie larga es de siete años. Ningún año cumple una regla de exclusión. Corrige la historia del informe del 8-oct (mediana 47,9x), que dividía por el BPA contable mientras los casos van en ajustado.',
    v2: { actual: 16.8, mediana_5a: 35.0, minimo_5a: 25.7, media_larga: 32.0, base: 'cierre' },
  },
  comparables_per: { mediana: 22.3 },
  consenso: { bpa_ano1: 9.85, bpa_ano2: null, objetivo_medio: 194.0, objetivo_min: 148.0, objetivo_max: 245.0, analistas: 24, tendencia_3m: 'recortes', fuente: 'Yahoo Finance (BPA ajustado 2027e) y MarketBeat (objetivos), 19-oct-2026 [D]' },
  diferencia_consenso: 'Nuestro BPA ajustado de 2027e (9,45 USD) queda un 4,1 % por debajo del consenso ajustado (9,85), que lleva 90 días bajando (desde 10,26) [D8]: proyectamos un punto menos de crecimiento sin FICO por la hipoteca y el informe doble y no contamos recompras. Para 2028e no hay consenso ajustado gratuito; el contable de MarketScreener (9,82) no es comparable [D5]. Nuestro objetivo base (178,58 USD) queda un 7,9 % por debajo del objetivo medio de los analistas (194,00) y el ponderado (186,25) un 4,0 %: la diferencia es sobre todo de múltiplo (nosotros mantenemos el PER de hoy, 16,8 veces; los analistas suponen una recuperación parcial) [D6, D7].',
  media: 188.81,
  comentario: 'El objetivo a 12 meses (186,25 USD ponderado) queda un 16 % por encima del valor intrínseco (160,42) y un 26 % por encima del DCF (147,31). La distancia no sale de que la empresa valga más, sino de la regla: el base mantiene el PER de hoy (16,8 veces) sobre un BPA ajustado que crece un 11,6 % anual de 2025 a 2028e. Para que el precio llegue ahí en un año hace falta que el BPA de 2027 se cumpla y que el múltiplo no siga bajando, es decir, que la FHFA y la presión de precios no empeoren. El colchón es pequeño: con un BPA un 10 % peor la rentabilidad ponderada cae al 7,1 %, por debajo del 10 % que pide mantener.',
};


export const huecos = [];

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.5, precio_pct: 4.1, otros_pct: 3.1, comentario: 'Guía del 20-oct: crecimiento del 9,4-9,9 % contable y del 6,3-6,8 % sin FICO [A28, A29]. La hipoteca de USIS crece por precio y producto con las consultas duras al −9 % en el 3T26 [A29]; el volumen son registros de The Work Number (223 M, +12 %) y contratos públicos [A29]. Otros: reventa de FICO de ≈175 a ≈375 M, sin margen. Reparto volumen/precio: estimación propia.' },
    { periodo: '2027e', volumen_pct: 2.6, precio_pct: 3.4, otros_pct: -0.1, comentario: 'Negocio propio +6,0 %: un punto menos que en el informe del 8-oct por la hipoteca más débil (tipo a 30 años del 7,40 %) [B35] y el riesgo de informe doble (80 M de ingresos según la empresa) [A29]; volumen de Medicaid desde el 1-ene-2027 [B18]. FICO ≈390 M.' },
    { periodo: '2028e', volumen_pct: 3.4, precio_pct: 3.4, otros_pct: -0.6, comentario: 'Negocio propio +7,0 % con Gobierno y Talent Solutions, sin recuperación hipotecaria [A29]; la reventa de FICO baja a ≈360 M con la adopción de VantageScore (unos 2.000 prestamistas) [A29].' },
    { periodo: '2029e', volumen_pct: 3.4, precio_pct: 3.4, otros_pct: -0.5, comentario: 'Negocio propio +7,0 %, la parte baja del marco orgánico de la dirección (7-10 %) [A21]; FICO ≈330 M.' },
  ],
  mercado_final: { periodo: '2035e', tamano: 31105 },
  veredicto: 'En parte',
  justificacion: 'En parte. Es un negocio de activos ligeros (el capex no supera la amortización hasta 2035e), así que la prueba es el poder de precios y la cuota. El volumen tiene base: The Work Number suma registros al 12 % anual y Medicaid exige verificar desde 2027 [A29, B18]. Pero cerca de la mitad del crecimiento de 2026-2029 es precio (reparto: estimación propia), y el precio está bajo la presión de la FHFA, que llama «cártel» a las agencias [B4], de la CFPB y de una demanda antimonopolio [B45]. El grupo creció un 3-4 % en 2022-2023 [A3] y su ROIC (9,3 %) no cubre el WACC: el crecimiento no crea valor por encima del coste de capital. No se rebaja más el base: ya está en la parte baja del marco de la dirección y sin recuperación hipotecaria.',
};

export const contexto = {
  movimiento: { fecha: '2026-10-19', var_1m_pct: -0.2, var_3m_pct: -8.3, var_6m_pct: -20.1, var_12m_pct: -30.2, dist_max_52s_pct: -32.2, dist_min_52s_pct: 15.5, dist_max_historico_pct: -48.4, tendencia: 'bajista', volatilidad_60d_pct: 39.0, avisos: ['P5 Un 11-16 % por debajo de la media de 200 sesiones (tendencia bajista)'] },
  movimientos_fuertes: [
    { periodo: '3-feb-2026', var_pct: -12.1, causa: 'Tres senadores anuncian una investigación sobre los precios de The Work Number en los programas públicos [B17].', veredicto: 'no cambia', condicion: null },
    { periodo: '22-abr-2026', var_pct: -7.2, causa: 'Día siguiente a los resultados del 1T26 [A13].', veredicto: 'no cambia', condicion: null },
    { periodo: '17-jun-2026', var_pct: -7.4, causa: 'Sin hecho propio identificado tras buscar en comunicados, 8-K y prensa; coincide con la presión del regulador hipotecario sobre los precios de las agencias.', veredicto: 'no cambia', condicion: null },
    { periodo: '21-jul y 30-jul-2026', var_pct: -7.1, causa: 'Guía del segundo semestre por debajo de lo que esperaban los analistas pese a batir el 2T26 [P1]; el 30-jul, otro −5,8 % sin hecho propio identificado.', veredicto: 'no cambia', condicion: null },
    { periodo: 'sep-2026 (mes al 29-sep)', var_pct: -27.5, causa: 'El director de la FHFA llama «cártel» a las agencias y estudia el informe doble (4-sep, −6,4 %) [B4]; el 1-oct Bloomberg adelanta que la FHFA lo ordenará en semanas (−5,9 % fuera de hora) [B37, B38].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-10-20', tipo: 'resultados', hecho: '3T26: ingresos +10 %, BPA ajustado 2,26 USD frente a 2,20 de consenso; baja la guía de ingresos de 2026 a 6.646-6.676 M y deja el BPA ajustado en 8,45-8,55 USD [A28, A32].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-13/19', tipo: 'recomendación', hecho: 'Recortes de precio objetivo de Jefferies, Needham, Bank of America, Morgan Stanley, RBC y Mizuho, y Oppenheimer baja a neutral; objetivo medio de 203,90 a 194,00 USD [D6, D7].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-01', tipo: 'demanda o regulador', hecho: 'La FHFA prepara la orden de aceptar dos informes en lugar de tres; sin anuncio oficial a 20-oct; la empresa cifra el riesgo en unos 80 M de ingresos y 38 M de margen [B37, B42, A29].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-08-20', tipo: 'demanda o regulador', hecho: 'Acuerdo de 100 M USD en la demanda colectiva por el error de puntuaciones de 2022 (40 M netos tras el seguro, ya provisionados en el 2T26) [A2, C33].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-07-07', tipo: 'fusión u oferta', hecho: 'Compra de Círculo de Crédito (México) por 750 M de valor empresa, 12,1 veces su EBITDA ajustado; cierre en el 4T26 [D14].', veredicto: 'no cambia', condicion: null },
    { fecha: '2025-10/2026-09', tipo: 'directivos', hecho: 'Ventas de directivos por 38,46 M USD, todas con planes 10b5-1; el consejero delegado, 32,06 M; una sola compra de 0,46 M [C23, C38].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: null,
  veredicto: 'no cambia',
  condicion: null,
  comentario: 'La acción cae un 30,2 % en 12 meses por causas conocidas y recogidas en el informe: la presión del regulador hipotecario sobre los precios y el informe doble, la venta directa de FICO y la hipoteca más débil. La decisión de la FHFA sigue pendiente, pero la empresa la cifra en unos 80 M de ingresos (≈1,2 %), por debajo del 5 % que retrasaría una decisión, y ya está en el bajista. Los resultados del 3T26 no traen un hecho que la tesis no tuviera. Los próximos resultados (4T26) no tienen fecha; por el calendario de 2026, a primeros de febrero de 2027. Veredicto global: no cambia.',
};

export const fuentes_propias = [
  { id: 1, titulo: 'Why Equifax Stock Is Tumbling Today', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-07-21', url: 'https://www.fool.com/investing/2026/07/21/why-equifax-stock-is-tumbling-today/' },
];

export const fuentes = fuentes_propias;

// El BPA 2028e de MarketScreener es CONTABLE (9,82); nuestros casos son AJUSTADOS: compararlos en la prueba de robustez
// mezcla bases. Se deja la fila sin BPA (la cifra contable se cita en diferencia_consenso).
export const parches = [{ ruta: 'consenso.estimaciones[2].bpa', valor: null }];

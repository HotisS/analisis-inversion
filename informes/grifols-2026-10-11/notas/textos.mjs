// Textos del analista (Grifols, corte 2026-10-11). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json; [P1] = fuente propia.
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

export const fuentes = [
  { id: 1, titulo: 'Notificaciones de posiciones cortas: Grifols, S.A. (ES0171996087, ES0171996095)', editor: 'CNMV', tipo: 'Primaria', fecha: '2026-10-11', url: 'https://www.cnmv.es/portal/Consultas/EE/PosicionesCortas?nif=A58389123' },
];

export const huecos = [];

export const valoracion_extra = {
  puente: { fecha: '2026-06-30', deuda_financiera: 8311, arrendamientos: 1045, caja: 513, minoritarios: 2434, pensiones: 0, asociadas: 410, otros_ajustes: 462 },
};

export const parches = [
  { ruta: 'bolsa.posicion_corta_pct', valor: 1.81 },
];

export const limitaciones = `Se valora la acción A (con voto) de la Bolsa española, en euros, al cierre del viernes 9-oct-2026 (9,88 EUR): el corte cae en domingo [D3]. Grifols tiene además acciones B sin voto (6,74 EUR, un 31,8 % menos) y ADR en el NASDAQ (1 ADR = 1 acción B) [D1, D11]. Para que precio por acciones dé la capitalización real de las dos clases (5.913 M EUR), las B se cuentan como acciones A-equivalentes a su precio relativo: 422,357 M de A más 258,224 M de B por 6,74/9,88 = 598,51 M [D1]. Así, el valor por acción es el de una A si el descuento de la B se mantiene; si se cerrara, el valor de la A bajaría un 12 % y el de la B subiría. Acciones y puente, del balance de 30-jun-2026; el puente suma a la deuda 403 M de cesión de cuentas a cobrar sin recurso y 59 M de dividendo pagado el 2-jul-2026, y no resta el préstamo de 132 M a Scranton (vinculada) [D1, A7]. Minoritarios a valor contable (2.434 M): no hay precio de mercado para el 45 % de Grifols Diagnostic Solutions en manos de Shanghai RAAS ni para Haema y BPC Plasma. Cuentas de 2016-2025 de los 20-F; 2022-2023 reexpresados en 2024; en 2020-2021 se restan 457 M de la sobrevaloración de Shanghai RAAS que corrigió la reexpresión [A1, A2]. El EBITDA de la cuenta es el publicado; los ajustes de la empresa (132 M en 2025) van como no recurrentes aunque se repiten cada año. El consenso es de EBITDA ajustado: el motor le resta un 1,75 % de las ventas [D4].`;

export const controles_explicados = [
  { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: 'El 52,1 % de 2024 se debe a 32 M de impuestos extraordinarios por la venta de Shanghai RAAS y a una provisión fiscal en España por precios de transferencia que pasó de 76,6 M a 136,7 M [A2]. El DCF usa un 22 %.' },
  { control: 'Caja proyectada coherente con la histórica', explicacion: 'El DCF proyecta flujo libre de la empresa antes de intereses (FCFF); el histórico del motor es después de intereses, que Grifols paga dentro del flujo operativo (532 M en 2025) [A1]. Sumando los intereses netos de impuestos, el flujo libre de 2025 equivale a ≈ 920 M, en línea con los 965 M de 2026e. Los 238 M de media de 2023-2025 incluyen el −209 M de 2023, con 411 M de existencias.' },
  { control: 'Comparables estables al quitar una empresa', explicacion: 'Siete comparables muy distintos (CSL, Takeda y tres chinos con múltiplos de mercado local); por eso pesan un 15 % y se contrastan con la regresión crecimiento-múltiplo.' },
];

const rentabilidad = {
  comentario: `**Grifols no cubre hoy su coste de capital.** El ROIC fue del 9,2-11,5 % en 2016-2018, cuando el margen EBITDA rondaba el 27-28 %, y cayó al 3,0-3,1 % en 2021-2023: el coste del plasma subió tras la pandemia y la compra de Biotest (1.090,5 M) y de centros de plasma infló el capital invertido [A1, A3]. En 2025 se recupera al 6,6 %, aún por debajo del WACC del 8,2 % [A1]. Lo mueve el margen, no la rotación, que lleva una década en 0,3-0,4 veces por el inventario de plasma (260 días de coste de ventas) [A1]. El ROIC incremental (4,4 %) dice que el crecimiento de la década destruyó valor. La competencia hace más con menos: CSL Behring tiene un margen de segmento del 40,5 % y ADMA un margen EBIT del 37,5 % [B5, B7]. Para crear valor, Grifols necesita volver a márgenes EBITDA del 26-27 % con el capital que ya tiene.`,
  confianza: 'Media',
};

const capital = {
  comentario: `**La asignación de capital de la última década ha sido mala para el accionista.** De 2016 a 2025, Grifols generó 2.376 M de flujo libre, gastó 5.648 M en compras y pagó 1.454 M de dividendos: la diferencia la pagó la deuda, que pasó de 4.942 M a 8.561 M [A1, A6]. Las compras (Hologic, centros de plasma, Biotest) dejaron un ROIC incremental del 4,4 %, por debajo del WACC, y la operación con Scranton (venta de Haema y BPC en 2018 sin perder el control) creó la estructura vinculada que hoy pesa en el gobierno [A5, C1]. Desde 2024 la nueva dirección ha cambiado el orden: venta del 20 % de Shanghai RAAS (1.564 M cobrados), flujo libre de 468 M en 2025, refinanciación de 2027 y un dividendo prudente (158,2 M por 2025, con el límite del 4-6 % de la capitalización del contrato de crédito) [A1, A7, C13]. La prueba pendiente es llegar a 3,5x de apalancamiento a finales de 2027.`,
  confianza: 'Media',
};

const bolsa = {
  comentario: `La acción A ha perdido un 16,4 % en un año, frente al +23,0 % del IBEX, y un 13,0 % anual en cinco años [D3]. La caída máxima (−66,6 %) va del 14-oct-2021 al 6-mar-2024: primero el coste del plasma tras la pandemia y la deuda de Biotest, y después los informes de Gotham City de enero a marzo de 2024 [D3, C1]. En 2024 cayó un 40,8 % y en 2025 subió un 17,0 %, muy por debajo del IBEX (+49,3 %) [D3]. En 2026 marcó mínimo en 8,43 EUR el 23-mar y cayó un 4,1 % tras el semestre, con un flujo libre de 91 M [D3, A7]. La beta mensual a cinco años es de 1,63 frente al IBEX y la volatilidad del 28,5 %: es una acción apalancada. Kintbury Capital tiene una posición corta del 1,81 % del capital, la única por encima del 0,5 % [P1].`,
};

const multiplos_historicos = {
  comentario: `Grifols cotiza a 9,5 veces el EBITDA y 15,0 veces el beneficio de los últimos 12 meses, en el mínimo de su década y un 48 % y un 51 % por debajo de sus medias (18,2 y 30,5 veces). El descuento es estructural, no un error del mercado: en 2016-2023 el mercado pagaba un negocio de margen del 27-28 % y deuda de 4x; hoy paga un margen del 24 % con 4,9 veces de deuda neta, un ROIC del 6,6 % y la desconfianza que dejó Gotham [A1, C1]. Desde 2024 el múltiplo se ha quedado en 10 veces aunque el EBITDA ha mejorado: el mercado espera a ver la deuda bajar.`,
};

const comparables = {
  comentario: `Grifols cotiza a 9,0 veces el EBITDA de los próximos 12 meses y 10,1 veces el beneficio, frente a una mediana de los comparables de 10,8 y 21,9 veces [D13]. El descuento en EV/EBITDA es pequeño (17 %) y se justifica: menos margen (24,3 % frente al 28,1 % de la mediana), ROIC por debajo del coste de capital y 4,9 veces de deuda frente a 0,6 veces [D13]. El PER engaña: con tanta deuda, el beneficio por acción es muy sensible y el de 2026e lleva un ingreso financiero no recurrente de 109 M [A7]. La regresión del múltiplo sobre el crecimiento (R² de 0,52) da 10,7 veces y 15,38 EUR por acción, pero la muestra es frágil (la mediana va de 9,5 a 12,0 veces según qué empresa se quite) y mezcla CSL con tres chinos que cotizan en su mercado local. Usamos el EV/EBITDA como contraste, con un peso del 15 %.`,
};

const transacciones = {
  comentario: `Solo una operación del sector con múltiplo publicado: Haier pagó 23,6 veces el EBITDA por el 20 % de Shanghai RAAS en 2023, con prima del 15 %, por un activo chino con caja neta [D16]. Biotest se compró sin múltiplo publicado y la oferta de Brookfield con la familia (10,50 EUR por acción A, ≈ 9,2 veces el EBITDA ajustado) se retiró en noviembre de 2024 sin llegar a presentarse [D18, D19]. Ese precio, un 6 % por encima del actual, es la referencia más útil del valor de control: con la familia dentro, una opa a ese nivel ya no la aceptó el consejo. Las transacciones no pesan en el valor objetivo.`,
};

const sentimiento = {
  temas: [
    { tema: 'Infravaloración por múltiplo frente a su historia y a CSL', postura: 'Alcista', peso: 'Alto', contraste: 'Los datos les dan la razón a medias: 9,0 veces el EBITDA de los próximos 12 meses frente a 18,2 de media histórica, pero con 4,9 veces de deuda y un ROIC del 6,6 %, por debajo del WACC; el descuento frente a los comparables en EV/EBITDA es solo del 17 % [D13, A1].' },
    { tema: 'Recompra de Haema y BPC a Scranton y operaciones vinculadas con la familia', postura: 'Dividida', peso: 'Alto', contraste: 'Grifols ya consolida el 100 % de su EBITDA, con el 100 % como minoritarios (350 M en libros); recomprarlas no añade EBITDA, solo quita minoritarios a cambio de caja o deuda, y sigue el préstamo de 124-132 M a Scranton [A7, C1].' },
    { tema: 'Generación de caja, deuda y refinanciación', postura: 'Dividida', peso: 'Alto', contraste: 'Preocupación justificada: el flujo libre del primer semestre fue de 91 M frente a una guía anual de 500-575 M, y las existencias subieron 184 M; la refinanciación de 2027 está hecha y el siguiente vencimiento grande es 2028 (2.037 M) [A7].' },
    { tema: 'Gestión, comunicación con el mercado y control familiar', postura: 'Bajista', peso: 'Medio', contraste: 'La dirección nueva ha cumplido la guía de 2025, pero la familia sigue votando en torno al 51 % de los presentes en la junta y el consejo ha perdido dos independientes en 2026 [C1, C6, C10, C11].' },
    { tema: 'Efecto del tipo de cambio EUR/USD', postura: 'Dividida', peso: 'Medio', contraste: 'Con el euro a 1,18 frente a 1,04, los ingresos del 1T26 cayeron un 4,8 % aunque crecieron un 3,3 % a tipo constante; el 56,5 % de las ventas está en EE. UU. y Canadá [A8, A1].' },
    { tema: 'Regulador, proceso judicial ligado a Gotham y posiciones cortas', postura: 'Dividida', peso: 'Bajo', contraste: 'La CNMV multó con 1,36 M a Grifols y a consejeros (recurrido) y la única posición corta notificada es del 1,81 % [C1, P1].' },
  ],
  lectura: `El foro español (Rankia, Investing) está dividido y estable: cree que la acción está barata, pero no se fía de la caja ni de la familia [E1-E9]. Es la misma tensión que recoge el informe: el valor depende de que el EBITDA se convierta en caja y la deuda baje. Los foros dan peso a la recompra de Haema y BPC como catalizador; los datos no: ya están consolidadas y recomprarlas cuesta caja. El sentimiento no es extremo (ni capitulación ni euforia) y coincide con el de los analistas (8 de 12 recomiendan comprar) [D5]. No hemos podido leer foros en inglés (403), así que falta la visión del accionista del ADR.`,
};

const suma_partes = {
  aplica: false, descuento_holding_pct: 0, partes: [],
  comentario: 'No aplica en el valor objetivo: Biopharma es el 86 % de las ventas y casi todo el resultado de los segmentos (1.746 M de EBITDA en 2025, frente a 159 M de Diagnostic) [A1]. Diagnostic tiene un 45 % de minoritarios (Shanghai RAAS), que el puente ya resta a valor contable. La salida a bolsa de una parte de Biopharma EE. UU. que estudia Grifols sería la referencia para una suma de partes [C12].',
  confianza: 'Media',
};

export const secciones = { rentabilidad, capital, bolsa, multiplos_historicos, comparables, transacciones, sentimiento, suma_partes };

export const dcf_justificacion = {
  crecimiento: `2026e −1,0 %: en el primer semestre los ingresos crecieron un 2,6 % a tipo constante pero cayeron un 2,8 % en euros, con el dólar un 13 % más débil [A7, A8]; el consenso (+1,7 %) no parece recoger todo el efecto de la divisa [D4]. Después, +5,5 % en 2027e-2028e, frente al 6,3 % y 5,7 % del consenso: inmunoglobulinas al +8-13 % a tipo constante, albúmina a la baja en China y Diagnostic sin el negocio conjunto con QuidelOrtho [A7, A8]. Baja al 3 % en 2033e. La media (3,8 %) queda por debajo del 7,1 % anual de la década, que incluye compras, y del 6,5 % previsto para el mercado [B11].`,
  margenes: `Margen EBITDA publicado del 23,0 % en 2026e, que sube al 25,5 % en 2030e. La guía pide un margen ajustado de al menos el 25 % en 2026 y el consenso da 24,7 %, 25,9 % y 26,9 % en 2026e-2028e [D2, D4]. Nuestro margen queda 1,5-2 puntos por debajo porque los «no recurrentes» se repiten cada año (149 M en 2024, 132 M en 2025, 159 M en los últimos 12 meses) [A7, A9]. El 25,5 % final está por debajo del 27-28 % de 2016-2019 y del margen de segmento de CSL Behring (40,5 %) [B5]: supone recuperar parte del coste del plasma (Egipto, plan de eficiencias), no todo.`,
  inversion: `Capex del 7,0 % de las ventas en 2026e-2027e que baja al 6,5 %: el capex de caja fue del 5,6 % en 2025 y se le suman los pagos de arrendamientos (1,6 %) como aproximación a las altas de derechos de uso (NIIF 16) [A1]. Amortización del 6,0 %, la de 2025. Circulante del 41 % de las ventas, el de 2025 (existencias de 3.296 M, unos 260 días): cada euro de ventas nuevas consume 41 céntimos [A1]. Tipo impositivo normalizado del 22 %, entre el 18,7 % de 2025 y el 25 % nominal español.`,
  wacc: `Tasa libre del 3,53 %, el Bund a 10 años del 9-oct-2026 [D10]. Beta de 1,42, la mensual a cinco años frente al IBEX ajustada (1,63 sin ajustar); la semanal da 0,98, pero con un 61 % de deuda a valor de mercado una beta de acciones por debajo de 1 no es creíble [D3]. Prima de mercado del 5,5 % y 1 punto de prima adicional por el gobierno (control familiar, operaciones vinculadas con Scranton, expediente de la CNMV). Coste de la deuda del 6,5 % (bono garantizado de 2030 al 7,5 % y préstamos B a Euribor + 300 pb) [D1] y un 55 % de deuda, entre el 61 % de hoy y el objetivo de 3,5x. Coste de las acciones del 12,3 % y WACC del 8,2 %.`,
  terminal: `Crecimiento a perpetuidad del 2,5 %: inflación del euro del 2 % y algo de crecimiento real de la demanda de inmunoglobulinas, por debajo de la tasa libre menos medio punto (3,03 %). El múltiplo de salida implícito es de 9,5 veces el EBITDA, el de hoy y la mitad de su media histórica.`,
};

export const etapa2_justificacion = `No se usa: el ROIC (6,6 %) está por debajo del WACC (8,2 %), así que alargar el crecimiento no crea valor.`;

export const dcf_lectura = `El DCF da 14,21 EUR por acción A, un 43,8 % por encima del precio, con un 69 % del valor en el terminal. **El precio descuenta que Grifols no mejora.** El DCF inverso dice que los 9,88 EUR de hoy suponen un crecimiento de los ingresos del 0,2 % anual en 2026e-2033e, frente al 3,8 % de nuestro caso base, o, con nuestro crecimiento, un margen EBITDA final del 23,3 % en vez del 25,5 %: el margen de los últimos 12 meses (24,3 % sin ajustes) se quedaría donde está. Comprar hoy rinde un 9,1 % anual con nuestro caso base, frente a un WACC del 8,2 %. La otra cara es el apalancamiento: el valor de las acciones es solo un 43 % del valor empresa del DCF (8.504 de 19.833 M), así que cada medio punto de WACC mueve el valor un 19-23 % y el bajista deja la acción casi a cero. El caso es una apuesta apalancada a que el margen vuelva al 25-26 %, que es lo que pide la guía.`;

export const narrativas = {
  Bajista: `La competencia en inmunoglobulinas (anti-FcRn en CIDP, más plasma de CSL y Takeda) baja precios en EE. UU. y el coste del plasma no cede: el margen vuelve hacia el 19-21 % de 2021-2023 y el crecimiento se queda en el 1-2 %. Con 4,9 veces de deuda, la refinanciación de 2028 se encarece. Margen final del 21,5 %, WACC del 8,7 % y crecimiento a perpetuidad del 2 %.`,
  Base: `Se cumple a grandes rasgos la guía: margen ajustado del 25 % en 2026, crecimiento del 5,5 % en 2027-2028 con las inmunoglobulinas tirando y la deuda bajando hacia 3,5x en 2027-2028. Crecimiento medio del 3,8 % y margen EBITDA publicado del 25,5 % desde 2030.`,
  Alcista: `El plasma de Egipto y el plan de eficiencias bajan el coste por litro, el fibrinógeno y Yimmugo añaden ventas y la salida a bolsa de Biopharma EE. UU. cristaliza valor y baja deuda: crecimiento medio del 4,8 % y margen final del 27 %, el de 2016-2019.`,
};

export const escenarios_comentario = `La asimetría es pobre: el alcista vale 18,65 EUR (+88,8 %) y el bajista 1,78 EUR (−82,0 %), 1,08 veces. El bajista no es cosmético: deja el margen en el 21,5 %, todavía por encima del 18,6-19,7 % que Grifols tuvo de verdad en 2021-2023 [A1], y con la deuda de hoy eso borra casi todo el valor de las acciones. Es el precio del apalancamiento: 4 puntos de margen menos se comen el 87 % del valor base. Con la prima de riesgo que hoy pide el mercado, el bajista vale 4,73 EUR y la asimetría sube a 2,97 veces. La probabilidad del bajista (30 %) es alta a propósito: ya ocurrió hace tres años.`;

export const valoracion_comentario = `Pesos: DCF 55 %, escenarios 30 %, comparables 15 %, transacciones y suma de partes 0 %. El DCF manda porque recoge el circulante (41 % de las ventas) y la inversión que los múltiplos no ven, y porque el valor depende del margen a largo plazo; los escenarios pesan un 30 % porque la deuda hace el riesgo muy asimétrico. Los comparables pesan poco: la muestra es frágil y mezcla CSL con empresas chinas en su mercado local. Las transacciones no pesan: solo hay una con múltiplo (Shanghai RAAS, con caja neta). La dispersión es grande: de 1,78 EUR (bajista) a 21,34 EUR (PER de los comparables). El consenso de los analistas (14,76 EUR) queda cerca de nuestro valor objetivo [D5]; la oferta de Brookfield (10,50 EUR) es el suelo de valor de control que vio la familia en 2024 [D18].`;

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 0.5, otros_pct: -4.5, comentario: 'Primer semestre: +2,6 % a tipo constante, con inmunoglobulinas +12,8 % y albúmina −14,2 % por precio en China; la divisa resta unos 5 puntos (euro a 1,18 frente a 1,04) y Diagnostic pierde el negocio conjunto con QuidelOrtho; reparto entre volumen y precio, estimación propia [A7, A8].' },
    { periodo: '2027e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0.5, comentario: 'Volumen de inmunoglobulinas (26 % del volumen de EE. UU.) y de alfa-1; precio en EE. UU. limitado por la IRA en la Parte D; nuevos productos (fibrinógeno, Yimmugo) en otros [B1, A7].' },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0.5, comentario: 'Plasma de Egipto (hasta 3 M de litros en 2029) para crecer sin más centros en EE. UU.; consenso de ingresos de +5,7 % en 2028e [A7, D4].' },
  ],
  mercado_final: { periodo: '2033e', tamano: 52700 },
  veredicto: 'En parte',
  justificacion: `En parte. El crecimiento del 3,8 % anual está por debajo del mercado (6,5 %) y la cuota implícita apenas sube (19,1 % frente al 18,2 %) [B1, B11]. Pero la proyección necesita poca inversión neta (un 14 % del beneficio operativo después de impuestos) para crecer, lo que supone que las plantas y los centros que ya tiene, pagados en 2018-2023, absorben el volumen; con un ROIC del 6,6 % y un ROIC incremental del 4,4 %, Grifols no ha demostrado que su capital rinda. El poder de precios es limitado: la IRA, la albúmina en China y los anti-FcRn presionan, y el margen de 2025 sigue 4 puntos por debajo del de 2016-2019 [A1, B10]. Por eso el caso base queda por debajo del consenso y del mercado.`,
};

export const catalizadores = {
  items: [
    { fecha: '4-nov-2026 (estimada)', evento: 'Resultados del 3T26', efecto: 'Prueba de la guía de flujo libre (500-575 M) tras 91 M en el 1S', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Finales de febrero de 2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Margen ajustado ≥ 25 % y camino a 3,5x de apalancamiento en 2027', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027 (sin fecha)', evento: 'Posible salida a bolsa de una parte de Biopharma EE. UU.', efecto: 'Pondría precio a la mayor parte del negocio y bajaría deuda', probabilidad: 'Media', sentido: '+' },
    { fecha: 'Dic-2027', evento: 'Objetivo de apalancamiento de 3,5x o menos (contrato de crédito)', efecto: 'Abre la puerta a más dividendo y a mejor rating', probabilidad: 'Media', sentido: '+' },
    { fecha: '2027-2028', evento: 'Refinanciación de los bonos no garantizados de 2028 (2.037 M)', efecto: 'El coste de la deuda decide el valor de las acciones', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Sin fecha', evento: 'Recurso ante la Audiencia Nacional por la multa de la CNMV y demanda contra Gotham en Nueva York', efecto: 'Cierre del capítulo de 2024', probabilidad: 'Media', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Apalancamiento y refinanciación: 4,9 veces de deuda neta y 2.037 M de bonos en 2028', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Medio punto más de WACC: 11,51 EUR (−19 % sobre el DCF)', mitigante: 'Vencimientos de 2027 refinanciados, liquidez de 2.030 M, rating en mejora', senal: 'Apalancamiento según el contrato por encima de 4,0x a finales de 2026' },
    { riesgo: 'Presión de precio y de volumen en inmunoglobulinas (anti-FcRn en CIDP, más oferta de CSL y Takeda)', tipo: 'Competitivo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista: 1,78 EUR (−87 % sobre el DCF)', mitigante: '26 % del volumen de EE. UU. y mayor red privada de recogida de plasma', senal: 'Inmunoglobulinas por debajo del +6 % a tipo constante' },
    { riesgo: 'El coste del plasma no baja y el margen no vuelve al 25-26 %', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Cada punto de margen ≈ 2,3 EUR por acción (−16 %), estimación propia con el DCF', mitigante: 'Plasma de Egipto y plan de eficiencias', senal: 'Margen EBITDA ajustado de 2026 por debajo del 25 %' },
    { riesgo: 'Gobierno: control familiar y operaciones vinculadas con Scranton', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Ya en el WACC (1 punto de prima adicional ≈ −2,5 EUR por acción)', mitigante: 'Presidenta y consejero delegado independientes de la familia; activistas en el consejo', senal: 'Recompra de Haema y BPC a Scranton a un precio sin informe independiente' },
    { riesgo: 'Dólar débil: el 56,5 % de las ventas está en EE. UU. y Canadá', tipo: 'Divisa', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'Resta unos 5 puntos de crecimiento en 2026e', mitigante: 'Deuda en dólares (préstamo B) y costes del plasma en dólares', senal: 'Euro por encima de 1,25 dólares' },
    { riesgo: 'Regulación de precios en EE. UU. (IRA en la Parte D desde 2026 y en la B desde 2028) y aranceles', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'La IRA restó 108 M de ingresos en 2025', mitigante: 'Producción y plasma en EE. UU.', senal: 'Inmunoglobulinas incluidas en la negociación de Medicare' },
    { riesgo: 'Calidad contable y litigios (reexpresión, CNMV, Gotham)', tipo: 'Contable', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Ampliaría la prima de riesgo', mitigante: 'Auditor nuevo (Deloitte) y debilidad material subsanada', senal: 'Nueva salvedad o reexpresión' },
  ],
  premortem: `Octubre de 2029: la acción A vale unos 6 EUR, un 40 % menos. La historia más probable empieza en 2027: los anti-FcRn se comen buena parte de la CIDP en EE. UU., CSL y Takeda tienen más plasma del que pueden vender y el precio de las inmunoglobulinas baja por primera vez en una década. Grifols, con el coste por litro más alto que CSL, no llega al 25 % de margen ajustado y su flujo libre se queda en 300-400 M. El apalancamiento no baja de 4x en 2027, las agencias congelan el rating y la refinanciación de los bonos de 2028 sale al 8-9 %. La familia vuelve a proponer una operación con un fondo, ahora a un precio más bajo, y el mercado la descuenta. La señal temprana habría sido un 3T26 o un 2026 con flujo libre por debajo de 500 M y un margen ajustado por debajo del 25 %.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Caja', pregunta: '¿Cómo pasan de 91 M de flujo libre en el primer semestre a 500-575 M en el año, y cuánto es circulante que se revierte?', por_que: 'La guía de flujo libre es la base de la tesis de desapalancamiento.' },
    { tema: 'Plasma', pregunta: '¿Cuál es hoy el coste por litro frente a 2019 y cuánto lo bajará Egipto en 2028?', por_que: 'El margen final del DCF depende de recuperar parte de ese coste.' },
    { tema: 'Scranton', pregunta: '¿Se ejercerá la opción de compra de Haema y BPC, a qué precio y con qué informe independiente?', por_que: 'Es la mayor operación vinculada pendiente y el foro la ve como catalizador.' },
    { tema: 'Salida a bolsa', pregunta: '¿Qué parte de Biopharma EE. UU. se colocaría y con qué uso del dinero?', por_que: 'Pondría precio al negocio y bajaría deuda, pero añadiría minoritarios.' },
    { tema: 'Inmunoglobulinas', pregunta: '¿Qué parte del crecimiento de las inmunoglobulinas es CIDP y cuánto ha perdido frente a los anti-FcRn?', por_que: 'Es el principal motor y el principal riesgo de precio.' },
    { tema: 'Ajustes', pregunta: '¿Cuándo dejarán de existir los costes de reestructuración que se excluyen cada año del EBITDA ajustado?', por_que: 'Explican 1,5-2 puntos de diferencia entre nuestro margen y el de la guía.' },
  ],
  confianza: 'Media',
};

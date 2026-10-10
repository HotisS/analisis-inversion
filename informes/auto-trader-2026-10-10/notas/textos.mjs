// Textos del analista (Auto Trader, corte 2026-10-10). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json.
// Las cifras del motor se copian tal cual del último cálculo.
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

export const limitaciones = `Se valora la acción ordinaria de la Bolsa de Londres (AUTO), que cotiza en peniques; precio y valores por acción se dan en libras (488,7 p = 4,887 GBP, cierre del viernes 9-oct-2026; el corte cae en sábado) [D6]. El ejercicio cierra el 31 de marzo y se nombra por el año en que termina (FY2026 = abr-25 a mar-26). Las acciones (768,1 M diluidas) son las del 2-oct-2026, después de 57,7 M de acciones recompradas desde el balance; el puente es del 31-mar-2026 y resta en otros ajustes esas recompras (279,9 M con el impuesto de timbre) y el dividendo final de 7,8 p pagado en septiembre (≈60 M) [D3, D9, A2]. La cuenta se presenta por naturaleza; el EBITDA excluye el resultado de Dealer Auction (49 %), que se valora en el puente a valor contable, igual que hace el consenso [A2, D10]. FY2017 y FY2018 no aplican la NIIF 16 y FY2017 tuvo 369 días [A11]. Auto Trader publica semestres, no trimestres; los segundos semestres se obtienen restando el primero del año [A2]. No hay transcripciones gratuitas de las conferencias. Comparables y consenso de un solo proveedor (MarketScreener), contrastado con Stock Analysis [D10, D11]; sin ROIC de los comparables.`;

export const controles_explicados = [
  { control: 'Regresión múltiplo-crecimiento explicativa', explicacion: 'Con siete clasificados de cuatro países y dos negocios en caída (Cars.com y Hemnet), el crecimiento no explica el múltiplo (R² = 0,08); no se usa el valor de la regresión, solo las medianas.' },
];

const rentabilidad = {
  comentario: `**Auto Trader crea valor como pocas empresas cotizadas.** El ROIC después de impuestos ha estado entre el 46 % y el 56 % todos los años de la década salvo FY2021, cuando bajó al 29,4 % por los meses de anuncios gratis del confinamiento; en FY2026 fue del 50,9 %, más de cinco veces el WACC del 9,0 %. Lo sostiene el margen, no la rotación: un 66 % de EBITDA con un capital invertido de unos 600 M, casi todo fondo de comercio de la compra de 2014 [A1, A2]. El negocio apenas necesita capital: el capex normal es el 0,6-0,7 % de las ventas y el circulante, el 4-5 %. La única inversión que no ha rendido es Autorama, con 92,5 M de fondo de comercio y pérdidas en los cuatro años [A1, A2]. Entre los clasificados, solo Rightmove tiene un margen mayor (72 % frente a 66 %) [D13].`,
  confianza: 'Alta',
};

const comparables = {
  comentario: `Auto Trader cotiza a 10,3 veces el EBITDA de los últimos 12 meses y 9,5 veces el de los próximos, con descuento sobre la mediana de sus comparables (12,0 y 10,6 veces) pese a tener el segundo margen más alto del grupo (66 % frente a una mediana del 55,9 %) y un crecimiento algo menor (consenso de +4-5 % frente al 7,3 %) [D10-D19]. La mediana de EV/EBITDA y PER da 5,80 GBP. **El descuento no se explica por el negocio sino por el miedo**: Rightmove (12,0 veces), el negocio más parecido, sufre el mismo debate de la IA y cotiza con prima. Los dos comparables más baratos (Cars.com, 4,2 veces, y CarGurus, 7,7 veces) tienen márgenes de la mitad o menos y cuotas mucho menores en sus mercados. Usaríamos el EV/EBITDA de los próximos 12 meses; con la mediana del grupo, la acción vale lo que marca hoy el consenso de los analistas.`,
};

export const secciones = { rentabilidad, comparables };


export const dcf_justificacion = {
  crecimiento: `FY2027e +3,6 %: la guía da un beneficio operativo de 395-415 M con palancas del ARPR de +120-130 GBP (precio +85-95, producto +65-75 y stock −30-40) y forecourts −1-2 %, lo que deja los ingresos de concesionarios en +2,5-3 %; Autorama sube sus ventas de vehículos a ≈40 M [A2]. Los ingresos de abril fueron planos [A2]. El consenso da +3,9 % (648,6 M) [D10]. FY2028e-FY2030e +4,5-5,0 %: el ARPR ha subido entre 77 y 136 GBP al año por precio desde FY2023 [A2-A4] y el parque de 37 millones de coches no cae; por debajo del 8 % anual de la década, que incluye la recuperación del confinamiento. Baja al 3,0 % en FY2034e.`,
  margenes: `Margen EBITDA del 66,0 % en FY2027e, el mismo de FY2026 sin Dealer Auction (412,0 M sobre 624,3 M) [A2], con el impuesto digital (10,6 M) y la inversión en Deal Builder dentro. Sube hasta el 67 % desde FY2029e, por debajo del 69-71 % de FY2018-FY2022, antes de que Autorama y la inversión en producto rebajaran el del grupo [A2, A6]. El consenso da un 66,3 % en FY2027e y un 66,7 % en FY2029e [D10].`,
  inversion: `Capex del 1,4 % de las ventas en FY2027e que sube al 2,0 % en FY2033e: el normal de un portal (0,6-0,7 % de FY2019-FY2025) más las altas de derechos de uso de la sede nueva (NIIF 16). El 4,4 % de FY2026 fue la obra de la sede (25,1 M), que no se repite [A2]. La amortización baja del 3,6 % al 2,0 % a medida que se amortizan los intangibles de las compras y converge con el capex. Circulante del 4,2 % de las ventas, el de FY2026; la tasa impositiva, la general británica del 25 %.`,
  wacc: `Tasa libre del 5,39 %, el gilt a 10 años del Banco de Inglaterra del 7-oct-2026 [D8]. Beta de 0,75: la mensual a 5 años frente al FTSE 100 (0,62), ajustada por Blume; la semanal a 5 años es 0,83 [D6]. Prima de mercado del 5,5 % y sin prima adicional: vende en el Reino Unido y cotiza en el FTSE 100. Coste de la deuda del 5,9 % (crédito revolvente referenciado al SONIA) y un 10 % de deuda a valor de mercado. WACC del 9,01 %. Con la prima implícita del mercado (4,20 %), el WACC baja al 8,13 % [D27].`,
  terminal: `Crecimiento a perpetuidad del 3,0 %: inflación británica esperada de algo más del 2,5 % y casi nada real, por debajo de la tasa libre menos medio punto (4,89 %). El múltiplo de salida implícito es de 12,4 veces el EBITDA, por debajo de la media de la propia Auto Trader en la década (17,1 veces) y de los comparables con más margen (Rightmove, 12,0 veces hoy) [D13].`,
};

export const etapa2_justificacion = `No se usa. El ROIC (50,9 %) supera de sobra al WACC, pero el mercado británico de usados apenas crece (+0,9 % anual en 2021-2025) [B3] y el crecimiento ya depende del precio: alargarlo sería suponer que el poder de precios dura más que la proyección de ocho años.`;

export const dcf_lectura = `El DCF da 6,92 GBP por acción, un 41,6 % por encima del precio, con un 65 % del valor en el terminal. **El precio descuenta que Auto Trader deja de crecer.** El DCF inverso dice que, con nuestros márgenes, los 4,887 GBP de hoy suponen que los ingresos caen un 0,7 % al año de FY2027e a FY2034e, frente al +4,1 % de nuestro caso base; o, con nuestro crecimiento, que el margen EBITDA cae del 66 % al 49,5 %. Visto de otro modo, comprar a este precio rinde un 11,3 % anual si se cumple el caso base, frente a un WACC del 9,0 %. Ninguna de esas dos cosas ha pasado nunca: en los diez ejercicios solo cayeron los ingresos en FY2021, por los anuncios gratis del confinamiento, y el margen EBITDA del grupo no ha bajado del 62,8 % [A2-A11]. Lo que el precio descuenta es que la IA o un rival grande (Amazon, los asistentes de compra) rompan el foso. Es posible, pero no hay aún ningún dato que lo muestre: menos del 1 % del tráfico llega de asistentes de IA [B1].`;

export const narrativas = {
  Bajista: `El rechazo a Deal Builder se convierte en una salida lenta de concesionarios (−2 % de forecourts al año, como en el 2S26) y los asistentes de IA y Amazon Autos se quedan con parte de la búsqueda: Auto Trader pierde el poder de precios, como Hemnet en Suecia (ventas −16 % en 2026e) [D19]. Ingresos casi planos durante ocho años, margen EBITDA del 61 % y crecimiento a perpetuidad del 1,5 %.`,
  Base: `La guía de FY2027 se cumple con ingresos de +3,6 % y las palancas del ARPR siguen aportando +100-130 GBP al año; los forecourts se estabilizan. Crecimiento medio del 4,1 % y margen EBITDA del 67 % desde FY2029.`,
  Alcista: `Deal Builder se convierte en la palanca de producto que fue Co-Driver (el 86 % de los concesionarios ya lo usa) y el ARPR vuelve a subir como en FY2022-FY2024 (+136 GBP de producto en FY2024) [A2, A4]. Crecimiento medio del 6 % y margen del 68 %.`,
};

export const escenarios_comentario = `La asimetría es buena: el alcista vale 8,08 GBP (+65,3 %) y el bajista 3,69 (−24,5 %), una asimetría de 2,67 veces. El bajista no es cosmético: deja los ingresos casi planos ocho años, quita seis puntos de margen y baja el crecimiento a perpetuidad al 1,5 %, algo que a Auto Trader no le ha pasado nunca y que se parece a lo que hoy le pasa a Hemnet [D19]. Aun así, el bajista pierde menos de lo que gana el base, porque el precio ya descuenta casi ese mundo (el DCF inverso pide −0,7 % de crecimiento anual). El valor ponderado por probabilidad es de 6,34 GBP. Con la prima de riesgo que hoy pide el mercado (4,20 %), el bajista queda en 4,22 GBP (−13,6 %).`;

export const valoracion_comentario = `Pesos: DCF 50 %, comparables 25 %, escenarios 20 %, transacciones 5 % y suma de partes 0 %. El DCF manda porque el negocio es estable, casi no necesita capital y su caja es predecible: la conversión de beneficio en caja fue del 103 % en la década. Los comparables pesan un 25 % porque el mercado de clasificados online es amplio y comparable en márgenes, aunque hoy todos cotizan con el mismo miedo a la IA. Las transacciones (13,08 GBP, 22,9-26,5 veces el EBITDA) llevan prima de control y son de 2019-2024, con tipos más bajos: solo un 5 %, como recordatorio de lo que pagan los compradores estratégicos (REA ofreció 22,9 veces por Rightmove en 2024) [D25]. La dispersión es grande: de 5,80 GBP (comparables) a 6,92 GBP (DCF), todos por encima del precio de 4,887 GBP. El valor objetivo es de 6,83 GBP.`;

export const catalizadores = {
  items: [
    { fecha: '5-nov-2026', evento: 'Resultados del 1S FY2027', efecto: 'Primera prueba de la guía (beneficio operativo de 395-415 M): ingresos de concesionarios, forecourts tras el rechazo a Deal Builder y ARPR', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Abril de 2027', evento: 'Evento anual de precios y paquetes de FY2028', efecto: 'Fija la palanca de precio del ARPR; una subida por debajo de la inflación confirmaría la pérdida de poder de precios', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Continua (≈600 M en FY2027)', evento: 'Recompras de c. 500 M y dividendos', efecto: 'A este precio, la recompra retira ≈13 % del capital al año; ya van 278,6 M desde abril', probabilidad: 'Alta', sentido: '+' },
    { fecha: '2026-2027', evento: 'Investigación de la CMA sobre las reseñas en línea', efecto: 'Riesgo de sanción o de cambios en el producto; sin importe estimado', probabilidad: 'Media', sentido: '−' },
    { fecha: 'Sin fecha', evento: 'Entrada de Amazon Autos en el Reino Unido', efecto: 'La prueba del riesgo de desintermediación que el precio ya descuenta', probabilidad: 'Media', sentido: '−' },
    { fecha: 'Antes de la junta de 2027', evento: 'Revisión de la política de remuneración y plan de sucesión ejecutiva', efecto: 'Más estructura en la sucesión; posible cambio de métricas del variable', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Mayo de 2027', evento: 'Resultados de FY2027 y guía de FY2028', efecto: 'Confirma si la caída de forecourts de FY2026 fue puntual', probabilidad: 'Alta', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Desintermediación por la IA: asistentes de compra y agentes que buscan coches sin pasar por el portal', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista: 3,69 GBP, −47 % sobre el valor base', mitigante: 'Datos propios de precios y stock (155 millones de llamadas al mes) e integración con ChatGPT por MCP', senal: 'Visitas mensuales y minutos de uso a la baja dos semestres seguidos' },
    { riesgo: 'Pérdida de concesionarios y del poder de precios por el rechazo a Deal Builder', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Cada punto menos de crecimiento anual quita ≈0,5 GBP por acción (estimación propia con la sensibilidad)', mitigante: 'Disculpa pública del consejero delegado y menos de 100 bajas o rebajas declaradas', senal: 'Forecourts por debajo de −2 % interanual en el 1S27' },
    { riesgo: 'Entrada de Amazon Autos en el Reino Unido', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Parte del bajista', mitigante: 'Más del 75 % de los minutos en portales de coches y 11 veces la audiencia del segundo', senal: 'Anuncio de lanzamiento o acuerdos con grupos de concesionarios' },
    { riesgo: 'Ciclo del coche usado y de los concesionarios (tipos, financiación, quiebras)', tipo: 'Mercado', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Un año de forecourts −5 % quitaría ≈4 % de ingresos', mitigante: 'Ingresos por suscripción, no por venta', senal: 'Transacciones de usados de la SMMT por debajo de −5 % interanual' },
    { riesgo: 'Regulación: CMA (reseñas en línea), impuesto digital y la compensación de la FCA en la financiación de coches', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'El impuesto digital ya cuesta 10,6 M al año', mitigante: 'La FCA no afecta directamente a Auto Trader', senal: 'Conclusiones de la CMA o subida del impuesto digital' },
    { riesgo: 'Fondo de comercio de Autorama (92,5 M) con poca holgura', tipo: 'Contable', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Un deterioro no movería la caja; ≈0,12 GBP por acción en libros', mitigante: 'Autorama apenas pesa en el valor', senal: 'Entregas de Autorama por debajo del +40 % anual del test de deterioro' },
    { riesgo: 'Tipos: el gilt a 10 años en el 5,39 %', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'WACC del 10 %: el DCF baja a 5,86 GBP (−15 %)', mitigante: 'Balance con 1,3 veces de deuda neta ajustada', senal: 'Gilt por encima del 6 %' },
  ],
  premortem: `Octubre de 2029: la acción ha caído un 40 %, a unos 2,90 GBP. La historia más probable empieza en el semestre de noviembre de 2026: los forecourts caen otro 2 % y la dirección rebaja la palanca de precio del evento de abril de 2027 para frenar las bajas. Con los concesionarios en contra, Deal Builder no despega y el ARPR crece menos que la inflación por primera vez desde FY2021. En 2027 Amazon Autos llega al Reino Unido con grupos de concesionarios grandes y los asistentes de IA empiezan a mandar compradores directamente a las webs de los concesionarios; las visitas mensuales de Auto Trader bajan dos semestres seguidos. El margen aguanta un año gracias a los costes, pero el mercado deja de verlo como un monopolio y el múltiplo baja a 7-8 veces el EBITDA, como Cars.com o CarGurus. Las recompras, hechas a precios más altos, no lo evitan. El indicador que lo habría anticipado: los forecourts del 2S26 (−1,7 %) y unos ingresos de abril de 2026 planos.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Forecourts', pregunta: '¿Cuántos concesionarios se han dado de baja o han rebajado su paquete por Deal Builder desde noviembre de 2025, y cuántos han vuelto?', por_que: 'Los forecourts son la base del ingreso; cayeron un 1,7 % en el 2S26.' },
    { tema: 'Poder de precios', pregunta: '¿Qué subida de precio aplicará en el evento de abril de 2027 y qué peso tendrá Deal Builder en la palanca de producto?', por_que: 'El precio descuenta que el ARPR deja de crecer.' },
    { tema: 'IA', pregunta: '¿Qué parte de las búsquedas y de los contactos llega hoy de asistentes de IA y cómo cobra Auto Trader esa demanda?', por_que: 'Es el riesgo que más pesa en el bajista y en la posición corta del 6,77 %.' },
    { tema: 'Amazon', pregunta: '¿Qué grupos de concesionarios negocian con Amazon Autos y qué exclusividades tiene Auto Trader con ellos?', por_que: 'Un competidor con audiencia propia es la única amenaza creíble al foso.' },
    { tema: 'Autorama', pregunta: '¿Cuándo dará beneficio Autorama y qué pasa si las entregas no crecen al 44 % anual que supone el test de deterioro?', por_que: 'Es la única compra grande y no ha dado beneficio en cuatro años.' },
    { tema: 'Recompras', pregunta: '¿Hasta qué precio seguirá recomprando y con qué apalancamiento máximo?', por_que: 'Recompró a 630 p de media en FY2026, un 29 % por encima del precio de hoy.' },
    { tema: 'Sucesión', pregunta: '¿Quién cubre las funciones de la directora de operaciones y cuál es el plan de sucesión del consejero delegado?', por_que: 'La evaluación del propio consejo pide más estructura.' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];

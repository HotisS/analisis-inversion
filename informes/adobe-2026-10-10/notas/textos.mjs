// Textos del analista (Adobe, corte 2026-10-10). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json.
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

export const limitaciones = `Se valora la acción ordinaria del NASDAQ (ADBE), en dólares. El precio es el cierre del viernes 9-oct-2026 (242,27 USD); el corte cae en sábado [D6]. Las acciones (389,2 M) son las de la portada del 10-Q del 3T26, del 18-sep-2026; el puente es del 28-ago-2026 y resta unos 475 M de recompras posteriores (estimación) [D1]. El ejercicio es de 52/53 semanas y cierra a finales de noviembre (FY2025: 28-nov-2025). EBITDA en US GAAP, con los pagos en acciones como gasto (8,2 % de las ventas en FY2025); el consenso de MarketScreener los excluye y el motor resta un 8,3 % de las ventas para comparar [A1, D3]. Los arrendamientos operativos (399 M) no van al puente (US GAAP). Desde FY2026 la empresa reporta un único segmento: los tres segmentos anteriores (Digital Media, Digital Experience y Publishing and Advertising) se dan con su historia reexpresada hasta FY2025, solo con ingresos, y el ARR de Digital Media se sustituye por el ARR total [A1, A6]. Sin rating gratuito ni fecha confirmada de los resultados del 4T26.`;

export const controles_explicados = [
  { control: 'Múltiplos LTM y NTM de cada comparable coherentes', explicacion: 'ServiceNow y Workday excluyen de su EBITDA ajustado más partidas que los pagos en acciones y su amortización en XBRL parece baja; los comparables pesan solo un 10 % y el texto avisa de que la mediana está inflada.' },
];

const rentabilidad = {
  comentario: `**Adobe crea mucho valor, y cada vez más.** El ROIC después de impuestos ha subido del 26,7 % de FY2016 al 61,6 % de FY2025, cinco veces el WACC del 11,6 %. Lo explican un margen EBIT que pasó del 25,5 % al 36,6 % y un capital invertido que no crece: las recompras (45.706 M en la década) han reducido el patrimonio a 11.623 M [A1, A5]. Las compras pesan poco (9.748 M en la década) y la mayor, la de Figma, se anuló con un coste de 1.000 M en FY2024 [A1]. Microsoft tiene más margen (58,5 % de EBITDA), pero el resto del software de los comparables queda entre el 13 % y el 31 % [D17-D22].`,
  confianza: 'Alta',
};

const capital = {
  comentario: `**Asignación de capital de manual, con una gran excepción.** De FY2016 a FY2025 Adobe generó 56.773 M de flujo libre y recompró acciones por 45.706 M, sin dividendo; en FY2024-FY2025 recompró 20.781 M, más que su flujo libre, y subió la deuda de 3.634 a 6.210 M [A1]. La excepción fue Figma: 20.000 M ofrecidos en 2022, anulados en 2023 con 1.000 M de indemnización [A1, C26]. Semrush (1.874 M en 2026) es la mayor compra desde entonces [A6]. Las recompras se han hecho a precios mucho más altos que el de hoy; el programa pendiente (24.550 M hasta 2030) compraría un 26 % del capital al precio actual (estimación propia).`,
};

const multiplos_historicos = {
  comentario: `Adobe cotiza a 9,4 veces el EBITDA de los últimos 12 meses y 13,5 veces el beneficio, los mínimos de su década: la media fue de 36,6 y 46,5 veces, y el mínimo anterior de 14,3 veces el EBITDA [D6]. La compresión es de múltiplo, no de beneficio: el BPA ha crecido al 24,5 % anual desde FY2016 [A5]. El mercado ha pasado de pagar a Adobe como un monopolio del software creativo a pagarle como un negocio que la IA generativa puede convertir en una herramienta barata. El cambio de tipos explica una parte: el Tesoro a 10 años está en el 5,22 % [D7].`,
};

const comparables = {
  comentario: `Adobe cotiza a 8,5 veces el EBITDA de los próximos 12 meses y 11,5 veces el beneficio, con un descuento de casi la mitad sobre la mediana del software (16,0 y 25,4 veces), pese a tener más margen (39,3 % frente al 28,8 %) y un crecimiento algo menor (9,4 % frente al 12,4 %) [D10-D23]. Solo Intuit, que sufre el mismo debate de la IA, cotiza parecido (9,9 veces). La mediana daría 460,68 USD por EV/EBITDA y 533,45 USD por PER, pero exagera: ServiceNow y Workday excluyen más partidas de su EBITDA y el mercado no aplica a Adobe el múltiplo de quien no tiene su riesgo de sustitución. Pesan solo un 10 %.`,
};

const transacciones = {
  comentario: `Cuatro compras de software con múltiplo de ventas (mediana de 7,42 veces, prima del 35 %): Splunk, Ansys, Smartsheet e Informatica [D25-D32]; Figma (unas 50 veces el ARR) se excluye por extrema. Darían 492,03 USD por acción, el doble del precio, pero no se usan en el valor objetivo: son compras con prima de control a empresas sin el riesgo de la IA que hoy pesa sobre Adobe, y con 94.000 M de capitalización una opa no es realista. Sirven de recordatorio de lo barato que cotiza frente a lo que se paga por el software empresarial.`,
};

const sentimiento = {
  lectura: `Los comentarios que se pueden leer son más negativos que los números: de siete opiniones de gestores en julio-octubre, solo una es de compra y tres desaconsejan la acción, por la competencia gratuita (Canva) y la sucesión [1]. El nombramiento de Chakravarthy, que no esperaba el mercado, y la salida del responsable del negocio creativo costaron un 6,4 % en un día [2]. Ese pesimismo es la tesis: el precio descuenta crecer un 2 % anual mientras la empresa crece un 11-12 % y sube la guía. Los foros de particulares no se pudieron leer.`,
};

export const secciones = { rentabilidad, capital, multiplos_historicos, comparables, transacciones, sentimiento };

export const dcf_justificacion = {
  crecimiento: `FY2026e +12,0 % (fijo): tres trimestres publicados y guía elevada el 10-sep a 26.576-26.626 M, con Semrush desde abril [A7, C23]. FY2027e +8,5 % (consenso +9,2 %, con medio año más de Semrush) [D3]. Luego baja un punto al año hasta el 3 % de FY2033e. El ARR total crece un 11,2 % y la empresa guía un 10,2 % para FY2026, con Semrush [A6, A7]. La media del caso base (5,9 % en FY2027-FY2033) está muy por debajo del 16,8 % anual de la década.`,
  margenes: `Margen EBITDA GAAP del 39,5 % en FY2026e (el consenso no GAAP de 12.722 M menos un 8,3 % de pagos en acciones) y del 40,5 % desde FY2028e, en línea con el 40,1-40,3 % de FY2024-FY2025 y por debajo del 41,7 % de FY2021 [A1, D3]. No suponemos ni la mejora de margen que daría el apalancamiento de la IA ni la caída que traería una guerra de precios con Canva.`,
  inversion: `Capex del 1,0 % de las ventas en FY2026e que sube al 2,0 %: Adobe invierte poco (0,8 % en FY2025) porque su software se aloja en la nube de terceros [A1]. La amortización (3,6 %) incluye la de intangibles comprados (Semrush) y converge al capex. Circulante del 8,0 % de las ventas, el de FY2025; tipo impositivo del 21 %, cerca del 22,5 % de FY2025.`,
  wacc: `Tasa libre del 5,22 %, el Tesoro de EE. UU. a 10 años del 8-oct-2026 [D7]. Beta de 1,26: la ajustada (Blume) sobre la mensual a 5 años frente al S&P 500 [D6]. Prima de mercado del 5,5 %, sin prima adicional; coste de la deuda del 5,0 % (bonos al 2,7-5,4 %) y un 6,3 % de deuda a valor de mercado. WACC del 11,63 %, alto por la beta; con la prima implícita del mercado (4,20 %), el 10,10 % [D8].`,
  terminal: `Crecimiento a perpetuidad del 3,0 %: inflación en dólares de unos 2,5 % y algo de crecimiento real, por debajo de la tasa libre menos medio punto (4,72 %). El múltiplo de salida implícito es de 8,9 veces el EBITDA, por debajo del 9,4 de hoy y de cualquier año de la década.`,
};

export const etapa2_justificacion = `No se usa. El ROIC (61,6 %) lo permitiría, pero el riesgo de la IA hace que alargar el crecimiento más allá de FY2033 sea la apuesta contraria a la que hoy hace el mercado: preferimos no depender de ella.`;

export const dcf_lectura = `El DCF da 295,24 USD por acción, un 21,9 % por encima del precio, con un 56 % del valor en el terminal y un WACC exigente (11,6 %). **El precio descuenta que Adobe casi deja de crecer.** El DCF inverso dice que, con nuestros márgenes, los 242,27 USD de hoy suponen un crecimiento de los ingresos del 2,0 % anual de FY2027e a FY2033e, frente al 5,9 % de nuestro caso base, al +12 % de FY2026 y al 11,2 % del ARR; o, con nuestro crecimiento, un margen EBITDA del 33,6 % en vez del 40,5 %. Comprar a este precio rinde un 13,5 % anual si se cumple el caso base, casi dos puntos por encima de su coste de capital. Ese escenario no tiene precedente en Adobe, que nunca ha crecido menos de un 10 % en la década; lo que el precio teme es que la IA generativa haga con el software creativo lo que los móviles hicieron con las cámaras compactas.`;

export const narrativas = {
  Bajista: `La IA generativa convierte la edición creativa en una función gratuita de Canva, Google y OpenAI: Adobe deja de crecer y defiende la base bajando precios, como hizo al aplazar las subidas de Creative Cloud en 2026 [A16]. Ingresos planos durante siete años, margen EBITDA del 34,5 % y crecimiento a perpetuidad del 1,5 %.`,
  Base: `El ARR crece al 10 % en FY2026 y se frena después, con la IA cobrada dentro de los planes: ingresos +5,9 % de media en FY2027-FY2033 y margen EBITDA del 40,5 %, el de FY2024-FY2025.`,
  Alcista: `Firefly y los agentes se cobran (el ARR de productos de IA ya crece más del 150 %) y Adobe mantiene el 9-10 % de crecimiento varios años más: crecimiento medio del 7,9 % y margen del 41,5 % [A7].`,
};

export const escenarios_comentario = `La asimetría es justa con nuestro coste de capital: el alcista vale 335,05 USD (+38,3 %) y el bajista 169,00 (−30,2 %), 1,27 veces. El bajista no es cosmético: deja los ingresos planos siete años y quita seis puntos de margen, algo que Adobe no ha vivido nunca pero que el mercado ya descuenta en buena parte (el DCF inverso pide un 2,0 % anual). Por eso le damos un 30 % de probabilidad. Con la prima de riesgo que hoy pide el mercado (4,20 %), la asimetría sube a 3,7 veces y el bajista queda en 197,24 USD (−18,6 %). El valor ponderado por probabilidad es de 265,33 USD.`;

export const valoracion_comentario = `Pesos: DCF 60 %, escenarios 30 %, comparables 10 %, transacciones y suma de partes 0 %. El DCF manda porque la caja de Adobe es muy predecible (conversión del 137 % del beneficio en la década) y porque es el único método que recoge su riesgo con un WACC alto; los escenarios pesan un 30 % porque el riesgo de la IA es asimétrico y conviene ponerlo en precio. Los comparables (497,07 USD) y las transacciones (492,03 USD) darían el doble del precio, pero suponen que Adobe no tiene un riesgo de sustitución que los demás no tienen: pesan un 10 % y 0 %. El valor objetivo es de 306,45 USD.`;

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 4.0, precio_pct: 5.5, otros_pct: 2.5, comentario: 'Creative Cloud Pro sube de 59,99 a 69,99 USD (+16,7 %) desde jun-ago 2025; más usuarios (1.000 millones al mes) y Semrush desde abril (≈2,5 puntos, estimación propia) [B5, B6, A7].' },
    { periodo: 'FY2027e', volumen_pct: 3.5, precio_pct: 3.0, otros_pct: 2.0, comentario: 'Medio año más de Semrush y productos de IA (ARR +150 %); subidas de precio aplazadas en 2026 [A16, A7].' },
    { periodo: 'FY2028e', volumen_pct: 5.0, precio_pct: 3.0, otros_pct: 0.0, comentario: 'Usuarios y precio como en FY2023-FY2025 (crecimiento del 10-11 % anual) [A1].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: `Sí para nuestro caso base, que es modesto: un 5,9 % anual frente al 10-12 % que hoy crecen los ingresos y el ARR, sin necesitar capital (capex del 1-2 %) [A1, A6]. El poder de precios está demostrado: subió Creative Cloud un 16,7 % en 2025 y el ARR siguió creciendo un 11 % [B5, B6]. El foso (formatos estándar como PDF y PSD, flujos de trabajo de empresa) se estrecha por la IA, pero no ha desaparecido: los usuarios activos mensuales superan los 1.000 millones [A16]. La duda no es si Adobe puede crecer al 6 %, sino si tendrá que bajar precios para conseguirlo.`,
};

export const catalizadores = {
  items: [
    { fecha: '1-dic-2026', evento: 'Anil Chakravarthy, consejero delegado (Narayen, presidente ejecutivo)', efecto: 'Primer plan del nuevo equipo; posible director financiero definitivo', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Mediados de dic-2026 (estimada)', evento: 'Resultados del 4T26 y guía de FY2027', efecto: 'Crecimiento del ARR sin Semrush y política de precios de Creative Cloud', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Continuo', evento: 'Recompras (24.550 M pendientes hasta 2030)', efecto: 'Al precio actual retirarían un 26 % del capital', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Abril de 2027', evento: 'Junta: voto de la remuneración tras el 49,23 % en contra de 2026', efecto: 'Presión para cambiar el variable', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Sin fecha', evento: 'Nuevos modelos de vídeo e imagen de Google y OpenAI, y precios de Canva', efecto: 'La prueba del riesgo que descuenta el precio', probabilidad: 'Alta', sentido: '−' },
    { fecha: '2026-2027', evento: 'Recurso de la demanda colectiva por Figma', efecto: 'Pasivo contingente sin importe', probabilidad: 'Baja', sentido: '−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'La IA generativa abarata la creación de contenidos y desplaza a Creative Cloud', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista: 169,00 USD, −43 % sobre el valor base', mitigante: 'Firefly integra modelos de terceros; 1.000 millones de usuarios al mes', senal: 'ARR por debajo del 8 % sin compras' },
    { riesgo: 'Pérdida del poder de precios frente a Canva (Affinity gratis) y planes freemium', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Cada punto menos de crecimiento anual quita ≈14,5 USD (−5 %)', mitigante: 'Estándares de formato y flujos de empresa', senal: 'Nuevas rebajas o aplazamientos de precio' },
    { riesgo: 'Transición en la cúpula: nuevo consejero delegado, director financiero interino y salida del responsable del negocio creativo', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Retrasa la ejecución del caso base', mitigante: 'Chakravarthy dirigía Digital Experience; Narayen sigue de presidente ejecutivo', senal: 'Más salidas de directivos en el 1S27' },
    { riesgo: 'Coste de capital: beta de 1,26 y Tesoro al 5,22 %', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'WACC del 12,6 %: el DCF baja a 264,74 USD (+9 %)', mitigante: 'Caja neta casi nula y flujo libre del 11 % de la capitalización', senal: 'Tesoro a 10 años por encima del 5,75 %' },
    { riesgo: 'Regulación y litigios: suscripciones (acuerdo de 150 M con el DOJ) y la demanda por Figma', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'Menos del 1 % del valor', mitigante: 'Cambios ya hechos en las cancelaciones', senal: 'Nuevas demandas de consumidores' },
    { riesgo: 'Recompras con deuda a precios altos', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'La deuda subió de 3.634 a 6.210 M en FY2024-FY2025', mitigante: 'Deuda neta de 0,1 veces el EBITDA', senal: 'Deuda neta por encima de 1 vez el EBITDA' },
  ],
  premortem: `Octubre de 2029: la acción ha caído un 40 %, a unos 145 USD. La historia más probable empieza con el plan de Chakravarthy en 2027: para frenar la fuga de usuarios hacia Canva y los generadores de Google y OpenAI, Adobe incluye la IA en planes más baratos y renuncia a subir precios. El ARR se frena al 6 % en FY2027 y al 3 % en FY2028, mientras el coste de cálculo de la IA quita tres puntos de margen. El mercado deja de ver a Adobe como un estándar y la valora como un negocio en declive, a 6-7 veces el EBITDA. Las recompras, hechas con deuda a precios más altos, no lo evitan. El indicador que lo habría anticipado: el aplazamiento de las subidas de precio en 2026 y el RPO creciendo solo un 8 %.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Precios', pregunta: '¿Qué parte del crecimiento del ARR de FY2026 vino de la subida de Creative Cloud Pro y por qué se aplazaron las de 2026?', por_que: 'El precio de la acción descuenta que el poder de precios se ha agotado.' },
    { tema: 'IA', pregunta: '¿Qué margen tienen los productos nativos de IA (su ARR crece más de un 150 %) una vez pagado el cálculo y los modelos de terceros?', por_que: 'Decide si la IA suma o resta margen.' },
    { tema: 'Usuarios', pregunta: '¿Cuántos usuarios de pago ha ganado o perdido Creative Cloud en FY2026, sin contar los freemium?', por_que: 'El dato que separa el caso base del bajista.' },
    { tema: 'Sucesión', pregunta: '¿Qué cambiará Chakravarthy en la estrategia y quién será el director financiero?', por_que: 'Tres relevos en la cúpula en 2026.' },
    { tema: 'Recompras', pregunta: '¿Mantendrá las recompras con deuda si el flujo libre se frena?', por_que: 'En FY2024-FY2025 recompró más que su flujo libre.' },
    { tema: 'Remuneración', pregunta: '¿Qué cambiará en la remuneración tras el 49,23 % en contra de 2026?', por_que: 'Es casi un rechazo y la venta de 49,6 M de Narayen llegó dos semanas después de su relevo.' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];

export const huecos_resueltos = [{ seccion: 'gobierno', campo: 'voto_remuneracion_contra_libre_pct' }];

// Textos del analista (ICON plc, corte 2026-10-09). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json.
// Las cifras del motor se copian tal cual del último cálculo.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const DIR = dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(readFileSync(join(DIR, 'D.json'), 'utf8'));

let R = {};
try { R = await import('./resumen.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; }
export const resumen = R.resumen ?? null;

export const limitaciones = `Se valora la acción ordinaria de ICON plc en el Nasdaq (ICLR), en dólares, la misma divisa de las cuentas. El precio es el cierre del 8-oct-2026 (164,50 USD), porque la sesión del 9 no había cerrado a la fecha de corte [D1]. Las acciones (77,68 M) son las 77,15 M en circulación a 30-jun-2026 más el efecto dilutivo del segundo trimestre; no hubo recompras en el primer semestre [D2]. **Las cuentas de 2023 y 2024 son las reexpresadas** en el 20-F de 2025 y los trimestres de 2024-2025, los del 6-K/A; 2019-2022 son las publicadas en su día, que la empresa no reexpresó [A1, A2]. El EBITDA del informe es el contable (con pagos en acciones, reestructuración y costes de transacción dentro); solo se tratan como no recurrentes los deterioros de Data Solutions de 2025, la pérdida por su venta y los costes de la investigación. El consenso es de EBITDA y BPA ajustados por la empresa: el informe le resta 2,6 puntos de ventas para compararlo [D11]. Los trimestres usan el EBITDA ajustado de ICON. Los 102,8 M de arrendamientos operativos no van al puente (US GAAP: su gasto ya está en el EBITDA) [D2]. El puente es el balance de junio de 2026; la refinanciación de agosto cambia plazos y garantías, no el importe de la deuda [D4]. Se excluyen de los comparables WuXi AppTec y Tigermed (China, con plusvalías dentro del EBITDA) [D16].`;

export const controles_explicados = [
  { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'El 3,2 % refleja el peso de Irlanda (12,5 %) en el beneficio y los impuestos diferidos que genera la amortización de intangibles de PRA [A1]. El DCF usa el 19 %, por encima del 16,9 % que ICON aplica a su beneficio ajustado [A3].' },
  { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: 'El 8,0 % tiene la misma causa: Irlanda y los diferidos de la amortización de PRA [A1]. No se proyecta.' },
  { control: 'Tipo impositivo efectivo razonable (2025)', explicacion: 'El 9,1 % se calcula sobre un beneficio que resta 465 M de deterioros en buena parte sin efecto fiscal [A1]. El DCF usa el 19 %.' },
  { control: 'Regresión múltiplo-crecimiento explicativa', explicacion: 'Con seis comparables, el crecimiento explica poco los múltiplos (R² 0,16): la regresión no se usa en la valoración.' },
  { control: 'Comparables estables al quitar una empresa', explicacion: 'La muestra es pequeña (seis empresas y solo cuatro CRO cotizadas de tamaño); por eso los comparables pesan solo un 15 % en el valor objetivo.' },
];

const comparables = {
  empresas: D.comparables.empresas.filter((e) => !/WuXi|Tigermed/.test(e.nombre)),
  criterio: `Quedan pocas CRO cotizadas: Syneos, PPD, PRA y Parexel ya no cotizan [D19-D21]. Las referencias son IQVIA (la mayor CRO), Medpace (CRO pura de biotecnológicas), Charles River (preclínica) y Labcorp (laboratorio central de ensayos), con Fortrea (la CRO escindida de Labcorp, en reestructuración) y Thermo Fisher (dueña de PPD, aunque es un conglomerado) [D16-D18]. Se excluyen WuXi AppTec y Tigermed: cotizan en China, con riesgo geopolítico, y su EBITDA lleva plusvalías de inversiones (margen del 60 % en WuXi) [D16].`,
  comentario: `ICON cotiza a 12,8 veces el EBITDA de los próximos 12 meses frente a una mediana de 14,6 veces, y a 14,3 veces el BPA ajustado frente a 21,4 veces. A los múltiplos medianos valdría 191,18 USD por EV/EBITDA y 246,92 por PER, 219,05 de media. El descuento tiene causa: ICON crecerá en torno a un 1 % en los próximos 12 meses frente al 5-6 % de IQVIA, Medpace y Labcorp, su margen EBITDA es 4-6 puntos inferior y su ROIC (6,8 %) no cubre el WACC [D16, D18]. A eso se suma el descuento por la reexpresión, que ningún comparable tiene. En la base de los comparables (EBITDA ajustado, sin pagos en acciones) el múltiplo sería todavía menor, 10,9 veces [D11], así que el descuento no es un efecto de definiciones. La muestra es frágil: quitar una empresa mueve la mediana de 13,4 a 15,7 veces (173,66 a 208,69 USD por acción). Por eso los comparables pesan un 15 %: dicen que ICON es barata si se normaliza, no que vaya a normalizarse.`,
};

const multiplos_historicos = {
  comentario: `ICON cotiza a 12,4 veces el EBITDA de los últimos 12 meses, por debajo del mínimo de sus cierres de 2019-2025 (13,2 veces en 2025) y un 31 % por debajo de su media (18,0 veces) [D1]. El precio, 164,50 USD, está por debajo de todos los cierres de ejercicio desde 2019 [D1]. Hay razones estructurales para la rebaja: desde la compra de PRA el negocio no crece (+0,8 % en 2025), el margen ajustado ha caído del 20,4 % al 15,7 % y la investigación contable añade un riesgo que antes no había [A3, A7]. El PER de los últimos 12 meses (253,1 veces) no sirve: el beneficio contable de 0,65 USD por acción recoge deterioros, la pérdida por la venta de Symphony y la amortización de PRA [A7].`,
};

const rentabilidad = {
  comentario: `**ICON destruye valor desde que compró PRA.** Antes de la compra su ROIC era del 25,7 % (2019) y del 24,1 % (2020), más del doble del WACC del 10,1 %. PRA multiplicó el capital invertido por casi nueve, de 1.423 M a 12.807 M en 2022, sobre todo con fondo de comercio e intangibles [A9], y el ROIC cayó al 4,2 % en 2021 y se ha quedado entre el 5,6 % y el 7,6 % desde entonces (6,8 % en 2025). La caída es de rotación, no de margen: el capital rota 0,50 veces frente a 0,97 en 2019. El ROIC incremental de 2019-2025 es del 4,2 %: cada dólar invertido desde 2019 rinde menos que su coste. Los comparables tampoco llegan al WACC con el fondo de comercio dentro (IQVIA 9,8 %, Labcorp 8,7 %, Charles River 8,6 %) [D18], pero ICON está por debajo de todos. Con el capital de PRA ya pagado, lo que decide el valor es el margen sobre las ventas actuales: cada punto de margen EBITDA vale unos 13 USD por acción.`,
  confianza: 'Alta',
};

const transacciones = {
  comentario: `La mediana de seis operaciones con múltiplo (15,5 veces el EBITDA ajustado) daría 212,59 USD por acción, pero las transacciones no pesan en el valor objetivo [D19]. Las dos más caras, PRA (24,4 veces) y PPD (23,4 veces), se pagaron en 2021 en pleno auge de la financiación biotecnológica; Syneos, en 2023, ya se vendió a 9,7 veces el EBITDA previsto con una prima del 24 % [D19-D21]. ICON tiene un capital disperso (99,9 % de flotante) y ningún accionista de control [D10], pero con unos 15.000 M de valor empresa y una investigación contable abierta, los compradores posibles (Thermo Fisher, Labcorp, fondos) tienen motivos para esperar a que se remedie el control interno. No contamos con una operación.`,
};

const identificacion = { mercado: 'Nasdaq Global Select Market' };
const financieros = {
  cambios_perimetro: [{ periodo: '2021', descripcion: 'PRA Health Sciences, consolidada desde el 1-jul-21: entra en balance entera y en la cuenta solo seis meses.' }],
};

export const secciones = { identificacion, financieros, rentabilidad, comparables, multiplos_historicos, transacciones };

export const dcf_justificacion = {
  crecimiento: `2026e −1,6 % (8.119 M): el punto medio-alto de la guía (7.850-8.150 M, reafirmada el 29-jul) y casi el consenso (8.139 M), sin los ingresos de Symphony vendida en mayo [D3, D11]. 2027e +3,5 %, en línea con el consenso (+3,6 %), apoyado en una contratación de 1,46 veces la facturación en el primer semestre, aunque solo 1,2 veces en honorarios directos [A7]. 2028-2030e +5 %: algo por debajo del consenso de 2028 (+5,5 %) y del crecimiento que estimamos para el mercado (4,5 %) más una ligera recuperación de cuota; luego baja al 3 %. ICON creció un 0,8 % anual de 2023 a 2025 frente al 34 % acumulado de Medpace [B15]: el supuesto exige que deje de perder cuota.`,
  margenes: `Margen EBITDA del 13,9 % en 2026e: el consenso de EBITDA ajustado (1.322 M, 16,2 %) menos los 2,6 puntos de pagos en acciones, reestructuración y costes de transacción que la empresa excluye [D11]; en el primer semestre fue del 14,0 % en esta base [A7]. Sube al 16,5 % en 2032e, que equivale a un 19 % ajustado: por debajo del 20,4 % de 2024 y de los márgenes de IQVIA, Medpace y Charles River (22-24 %) [A3, D16]. La recuperación viene de dejar atrás los costes de la investigación y de que la contratación de 2026 se convierta en ingresos con margen.`,
  inversion: `Capex del 2,1 % de las ventas, el de 2024 y 2025 (1,4-2,1 % en la década), casi todo informática e instalaciones [A1]. La amortización baja del 4,4 % al 2,0 % porque se agotan los intangibles de PRA (227 M en 2025) y queda la depreciación, en torno al 1,8 % [A1]; en el último año el capex supera a la amortización. Circulante comercial del 10,0 % de las ventas, el de 2025 (9,7 % en 2024): los cobros anticipados (1.550 M) compensan casi toda la facturación pendiente [A1]. Tipo impositivo del 19 %, por encima del 16,9 % del beneficio ajustado de 2025, por el impuesto mínimo global del 15 % y la amortización de PRA, que no desgrava [A3].`,
  wacc: `Tasa libre del 5,28 %, el Tesoro de EE. UU. a 10 años del 7-oct-2026 [D7]. Beta de 1,15: la ajustada mensual a cinco años frente al S&P 500 [D1]; la bruta (1,23) está inflada por la caída del 39,9 % del 12-feb-2026, y la media ajustada de IQVIA, Medpace y Charles River es 1,16 [D1]. Prima de mercado del 5,5 % y sin prima adicional: el riesgo contable va en los escenarios, no en la tasa. Coste de la deuda del 5,5 % antes de impuestos, el cupón medio de los bonos de agosto de 2026 (5,064-5,995 %) [D4], con rating BBB-/Baa3 [A1]. Peso de la deuda del 21 % a valor de mercado. Coste de los fondos propios del 11,61 % y WACC del 10,10 %.`,
  terminal: `Crecimiento a perpetuidad del 3,0 %: inflación esperada en dólares de unos 2,5 % y medio punto real por el aumento del gasto en desarrollo clínico, por debajo del 4,5 % que estimamos para el mercado de CRO [B9, B16] y 2,3 puntos por debajo de la tasa libre. El método de Gordon da un valor terminal de 19.111 M; un múltiplo de salida de 11 veces el EBITDA daría 21.070 M, y el Gordon implica 10,0 veces, por debajo de la mediana actual de los comparables (14,6 veces) y del mínimo histórico de ICON (13,2 veces). Es un terminal conservador.`,
};

export const etapa2_justificacion = `No se usa. El ROIC de ICON (6,8 % en 2025) está por debajo del WACC (10,1 %): crecer más tiempo no crea valor mientras el capital de PRA no rinda.`;

export const dcf_lectura = `El DCF da **154,88 USD por acción, un 5,8 % por debajo del precio**, con el 55 % del valor en el terminal y un rango de 136,72 a 178,80 USD con el WACC y el crecimiento terminal ±0,5 puntos. El valor depende sobre todo del margen: un punto más o menos en todos los años mueve el valor unos 13 USD por acción. **El DCF inverso dice que el precio ya descuenta una recuperación completa**: un crecimiento del 4,9 % anual en 2027-2035 (frente al 4,1 % de nuestro caso base y el 4,5 % que estimamos para el mercado) y un margen EBITDA final del 17,2 % (16,5 % en el base), que equivale a un 20 % ajustado, el nivel de 2024, antes de la reexpresión y de que el negocio dejara de crecer. Con nuestros flujos, el precio da una rentabilidad del 9,8 %, por debajo del WACC del 10,1 % pero por encima del 8,9 % que pide hoy el mercado a una acción con esta beta. La acción no está cara para el mercado; para nosotros, solo está bien pagada si la recuperación llega entera y sin otro tropiezo contable.`;

export const narrativas = {
  Bajista: `La financiación biotecnológica no vuelve, los clientes castigan la reexpresión en los concursos y la contratación de 2026 se convierte en reembolsables sin margen: los ingresos caen un 1 % en 2027 y el margen se queda 2 puntos por debajo del base (14,5 % final). Ya le pasó a ICON: su margen ajustado bajó 4,7 puntos de 2024 al primer semestre de 2026 [A3, A7]. Crecimiento terminal del 2,5 %.`,
  Base: `ICON vuelve a crecer al 3,5-5 % desde 2027 gracias a la contratación del primer semestre y recupera el margen ajustado hacia el 19 % en 2032, todavía por debajo de 2024; la investigación se cierra sin sanción material.`,
  Alcista: `La contratación de 1,5 veces la facturación se convierte en crecimiento del 5-6,5 % y el margen recupera 1,5 puntos más que en el base (18 % final en nuestra base, unos 20,5 % ajustado, el nivel de 2024); las recompras se reanudan con 750 M autorizados [A1].`,
};

export const escenarios_comentario = `Con nuestro coste de capital la asimetría es mala: el alcista vale 194,06 USD (+18,0 %) y el bajista 103,26 (−37,2 %), una relación de 0,48 veces; ponderados al 25-50-25 dan 151,77 USD. El bajista no es cosmético: solo exige que el margen y el crecimiento de 2025-2026 se prolonguen, algo que ya ha ocurrido. Con la prima de riesgo que hoy pide el mercado (4,2 %), la asimetría se invierte: 239,88 USD de alcista frente a 127,07 de bajista, 2,01 veces. La diferencia entre los dos cálculos es la tesis: la acción compensa si se acepta la tasa de descuento del mercado, no con la nuestra.`;

export const suma_partes = {
  aplica: false,
  descuento_holding_pct: 0,
  partes: [],
  comentario: `No aplica: ICON tiene un solo segmento (servicios de investigación clínica) desde que vendió Symphony Health en mayo de 2026, y no publica resultados por línea de negocio [A1, A7].`,
  confianza: 'Alta',
};

export const valoracion_comentario = `Pesos: DCF 45 %, escenarios 40 %, comparables 15 %, transacciones y suma de partes 0 %. El valor objetivo es de 163,26 USD (−0,8 %). El DCF y los escenarios mandan porque el debate es si el margen se recupera, y eso solo lo recoge una proyección explícita. Los comparables dan 219,05 USD, un 33,2 % más, pero miden lo que valdría ICON si cotizara como IQVIA o Medpace, que crecen y no tienen una reexpresión; la muestra además es frágil (13,4-15,7 veces según qué empresa se quite). Las transacciones (212,59 USD) llevan prima de control y múltiplos de 2021. La dispersión cuenta la historia: el mercado (precio 164,50) está entre nuestro DCF (154,88) y los múltiplos del sector, y con la prima implícita del mercado el DCF sube a 191,83 USD y el objetivo a 194,24 (+18,1 %).`;

export const catalizadores = {
  items: [
    { fecha: '27-oct-2026', evento: 'Resultados del 3T26', efecto: 'Primera prueba de que la contratación de 1,51 veces del 2T26 se convierte en ingresos con margen; el punto medio de la guía exige unos 3.900 M de ingresos en el segundo semestre [D6, D3].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '4T26 (sin fecha)', evento: 'Reanudación de las recompras', efecto: 'Quedan 750 M autorizados (un 5,9 % de la capitalización) y la refinanciación de agosto liberó las garantías; en el primer semestre no recompró [A1, A11].', probabilidad: 'Media', sentido: '+' },
    { fecha: 'Febrero de 2027 (sin fecha)', evento: 'Resultados de 2026 y guía de 2027', efecto: 'La dirección prometió crecimiento sostenible en 2027; una guía de ingresos por debajo del +3,5 % del consenso invalidaría la recuperación [A3, D11].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Hasta abril de 2027', evento: 'Informe del auditor sobre el control interno de 2026 (20-F)', efecto: 'Si EY levanta las dos debilidades materiales, desaparece la mayor fuente de descuento; si siguen, se prolonga [A1].', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '2027 (sin fecha)', evento: 'Decisión del juez sobre la petición de archivo de la demanda colectiva', efecto: 'La empresa debía pedir el archivo antes del 1-sep-2026; la demanda incluye ya al director financiero actual y un cargo de esquema fraudulento [C38].', probabilidad: 'Media', sentido: '+/−' },
    { fecha: 'Sin fecha', evento: 'Respuesta de la SEC a la autodenuncia', efecto: 'ICON se autodenunció; una sanción o un acuerdo cerraría la incertidumbre, con un coste hoy no estimable [A1, C1].', probabilidad: 'Baja', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Nuevos hallazgos contables o sanción de la SEC', tipo: 'Gobierno y cumplimiento', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Sin estimación fiable; un día de noticias costó −39,9 % el 12-feb-2026', mitigante: 'Investigación del comité de auditoría cerrada, auditor nuevo (EY) y autodenuncia ante la SEC [A1].', senal: 'Retraso de un 6-K o del 20-F de 2026, o debilidades materiales sin remediar en abril de 2027.' },
    { riesgo: 'El margen no se recupera', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−8,6 % por punto de margen menos en todos los años; −17,1 % con dos', mitigante: 'Fin de los costes de la investigación (unos 50 M en el primer semestre, estimación propia) y reestructuración en curso [A7].', senal: 'Margen EBITDA ajustado trimestral por debajo del 15 % (15,9 % en el 2T26).' },
    { riesgo: 'Pérdida de cuota frente a Medpace e IQVIA', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−6,8 % por punto de crecimiento menos al año; −13,3 % con dos', mitigante: 'Alianzas plurianuales con grandes farmacéuticas; el primer cliente pesa el 7,0 % [A1].', senal: 'Ratio de contratación sobre honorarios directos por debajo de 1,1 veces (1,2 en el 2T26).' },
    { riesgo: 'Cartera inflada o cancelaciones altas', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Escenario bajista: −37,2 %', mitigante: 'El criterio nuevo de cancelaciones ya restó 3.900 M a la cartera en 2025 [A3].', senal: 'Cancelaciones trimestrales por encima de 600 M (562 M en el 2T26) o una brecha creciente entre la cartera (23.400 M) y las obligaciones auditadas (15.700 M).' },
    { riesgo: 'Financiación biotecnológica débil y política de precios de EE. UU.', tipo: 'Sector', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Escenario bajista: −37,2 %', mitigante: 'Los cinco primeros clientes, grandes farmacéuticas con alianzas plurianuales, aportan el 24,8 % de los ingresos [A1].', senal: 'Financiación biotecnológica trimestral en EE. UU. y Europa por debajo del ritmo de 2025 (68.450 M al año) [B31].' },
    { riesgo: 'Coste de la demanda colectiva', tipo: 'Legal', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Estimación propia: cada 100 M de acuerdo restan unos 1,29 USD por acción (−0,8 %)', mitigante: 'Caja de 928 M y una línea de crédito de 500 M sin disponer [A6, A1].', senal: 'Rechazo de la petición de archivo.' },
    { riesgo: 'Coste de capital más alto', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−7,8 % con medio punto más de WACC', mitigante: 'Sin vencimientos hasta 2029 y deuda neta de 2,0 veces el EBITDA [A11].', senal: 'Rebaja del rating por debajo de BBB-/Baa3.' },
    { riesgo: 'Sustitución por modelos funcionales (FSP) o por herramientas de IA', tipo: 'Estructural', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Recogido en el margen: −8,6 % por punto', mitigante: 'ICON ya ofrece servicios funcionales y alianzas a gran escala [B1].', senal: 'Peso creciente del FSP en la contratación de las grandes farmacéuticas.' },
  ],
  premortem: `Octubre de 2029: la acción ha caído un 40 %, a unos 99 USD. La historia más probable empieza el 27 de octubre de 2026: el tercer trimestre confirma que la contratación récord del 2T26 era sobre todo de reembolsables, con un ratio sobre honorarios directos de solo 1,1 veces, y el margen ajustado se queda en el 15-16 %. En febrero de 2027 la guía de ingresos es plana. En abril, el 20-F de 2026 mantiene una debilidad material en el control de ingresos por grado de avance, y la demanda colectiva supera la petición de archivo. Los clientes biotecnológicos, que eligen CRO en concursos donde la reputación pesa, se van a Medpace; las grandes farmacéuticas exigen tarifas más bajas a cambio de renovar alianzas. Las recompras se aplazan otra vez. Con ventas que no crecen y un margen 2 puntos por debajo del base, el mercado deja de pagar por la recuperación y aplica el múltiplo de Fortrea a un negocio que ya no es mejor que Fortrea. Los indicadores que lo habrían anticipado: el ratio de contratación sobre honorarios directos, el margen ajustado trimestral y la opinión del auditor sobre el control interno.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Reembolsables', pregunta: '¿Cuánto pesan los gastos reembolsables en los ingresos de 2025 y del primer semestre de 2026, y qué parte de la contratación del 2T26 (1,51 veces) son honorarios directos?', por_que: 'El ratio sobre honorarios directos (1,2) es muy inferior al publicado; decide si 2027 crece con margen.' },
    { tema: 'Control interno', pregunta: '¿Qué controles faltan por remediar y cuándo espera la dirección una opinión limpia del auditor?', por_que: 'Las dos debilidades materiales son la principal fuente de descuento frente a los comparables.' },
    { tema: 'SEC y demanda', pregunta: '¿En qué punto está la autodenuncia ante la SEC y qué cobertura de seguro hay para la demanda colectiva?', por_que: 'Es el riesgo sin cuantificar con mayor efecto potencial en el valor.' },
    { tema: 'Cartera', pregunta: '¿Por qué la cartera publicada (23.400 M) supera en un 49 % a las obligaciones de servicio auditadas (15.700 M)?', por_que: 'Una brecha que crece anticiparía nuevas cancelaciones.' },
    { tema: 'Margen', pregunta: '¿Qué margen ajustado considera la dirección alcanzable en 2028 y con qué palancas, sin reestructuración recurrente?', por_que: 'El precio descuenta volver a un 20 % ajustado; nuestro base llega al 19 % en 2032.' },
    { tema: 'Cuota', pregunta: '¿Cuántos concursos de biotecnológicas ha perdido ICON frente a Medpace desde 2024 y por qué?', por_que: 'Medpace creció un 34 % en 2023-2025 frente al 2,4 % de ICON.' },
    { tema: 'Recompras', pregunta: '¿Cuándo se reanudarán las recompras y a qué apalancamiento objetivo?', por_que: '750 M autorizados equivalen a casi un 6 % del capital.' },
    { tema: 'Remuneración', pregunta: '¿Se recuperará parte de la remuneración variable cobrada por los años reexpresados y por qué el largo plazo se mide solo con el BPA ajustado?', por_que: 'El variable no se liga al ROIC, que lleva cinco años por debajo del WACC.' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];

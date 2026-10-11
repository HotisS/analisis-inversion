// Textos del analista (Nemetschek, corte 2026-10-10). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json; [P1] = fuente propia.
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

// Ingresos diferidos (pasivos por contrato), corto + largo plazo, en M EUR, de la nota del balance de cada informe anual.
const diferidos = { 2016: 55.293, 2017: 68.835, 2018: 95.375, 2019: 122.185, 2020: 131.875, 2021: 160.941, 2022: 209.570, 2023: 271.247, 2024: 385.797, 2025: 466.580 };
export const parches = Object.entries(diferidos).map(([anio, v], i) => ({ ruta: `balance.historico[${i}].pasivos_contrato`, valor: v }));

export const limitaciones = `Se valora la acción ordinaria de Nemetschek SE en XETRA (NEM), en euros; precio de cierre del viernes 9-oct-2026 (67,40 EUR), porque el corte cae en sábado [D9]. Acciones: 115,49 M en circulación (115,5 M emitidas menos 9.206 propias), sin dilución potencial relevante [D1]. Índice de referencia: el MDAX (Nemetschek está en el MDAX y el TecDAX, no en el DAX) [D2]; la rentabilidad en bolsa se mide con fondos cotizados de rentabilidad total sobre el MDAX (EXS3) y la tecnología europea (EXV3) [P1]. **HCSS** se consolida desde el 1-jul-2026 y no está en el balance de junio: el puente suma 450 M de deuda neta adicional por la refinanciación de su deuda y resta como minoritario el ≈ 28 % del segmento Build que recibió Thoma Bravo, estimado en 1.900 M (estimación propia: 28 % de una división que aportará ≈ 60 % del EBITDA del grupo, sobre el valor empresa del DCF) [A8, D1, D3]. Los múltiplos de los últimos 12 meses mezclan un valor empresa con HCSS y un EBITDA sin ella: el EV/EBITDA LTM está inflado y la comparación útil es la de los próximos 12 meses. La segmentación vigente (Design, Build, Manage, Media) solo tiene cifras reexpresadas para 2023-2025 [A1, A3]. Cuenta por naturaleza: el coste de ventas es el coste de bienes y servicios comprados. El circulante incluye los ingresos diferidos de cada informe anual (466,6 M en 2025) [A1-A7, A14]. No hay transcripciones gratuitas de las conferencias con analistas.`;

export const controles_explicados = [
  { control: 'Cambio de perímetro declarado (2019)', explicacion: 'El activo de 2019 crece por la primera aplicación de la NIIF 16 (70,3 M de arrendamientos), la caja (+88 M) y compras de 97,9 M repartidas en varias filiales (Redshift para Maxon y otras) [A5]; no hubo una compra grande al cierre.' },
  { control: 'Regresión múltiplo-crecimiento explicativa', explicacion: 'Con siete comparables y crecimientos distorsionados (PTC −3,4 % por el calendario de licencias, Nemetschek +23,9 % por HCSS), la regresión no explica los múltiplos y no se usa.' },
  { control: 'Múltiplos LTM y NTM de cada comparable coherentes', explicacion: 'Procore: con los pagos en acciones restados su EBITDA es casi nulo (margen del 1,1 %) y sus múltiplos de EBITDA no son significativos; pesa poco en la mediana [D16].' },
];

const bolsa_comentario = `La acción pierde un 26,6 % en el año y un 36,4 % en doce meses (con dividendos), frente al −2,9 % y −1,5 % del MDAX y al +26,8 % y +28,0 % de la tecnología europea [P1]. Marcó máximos de 52 semanas en 108,30 EUR el 13-oct-2025 y mínimos en 50,45 EUR el 26-jun-2026, con una caída máxima del 61,8 % [D9]. No cayó el negocio (ingresos del 1S26 +11,9 %, +15,7 % a tipo constante): cayó el múltiplo, por el miedo a que la IA generativa abarate el software de diseño, que la propia empresa invoca para explicar el −41,2 % del semestre [D1, D2]. La mayor caída diaria (−13,7 %) fue el 30-jul-2026, con los resultados del 1S26 y el efecto cambiario en el margen del 2T26 [D2, D9]. Desde el mínimo ha recuperado un 33,6 %. Beta mensual a 5 años de 0,51 frente al MDAX y de 0,83 frente al DAX; la semanal a 5 años, de 1,02 y 1,12 [P1, D9].`;

const trimestres = {
  ultima_presentacion: `En el 1S26 (30-jul-2026) la dirección repitió los tres mensajes de marzo: el crecimiento orgánico sigue entre el 14 % y el 15 % a tipo constante, el negocio de suscripción y SaaS sigue tirando (ARR de 1.249,5 M, +17,4 % a tipo constante) y la IA es una oportunidad, con Bluebeam Max ya disponible en todos los canales [A8, D1]. Lo nuevo fue HCSS: la mayor compra de su historia, cerrada el 1-jul, que añade ≈ 600 puntos básicos al crecimiento de 2026 y resta ≈ 150 al margen por la asignación del precio de compra, los costes de integración y un plan de pagos en acciones propio de Build [D1, D2]. El margen EBITDA del 2T26 (30,1 %) quedó por debajo del 32-33 % de la guía por un efecto cambiario extraordinario «de un dígito alto» de millones en Design y por costes de la compra; la acción cayó un 13,7 % ese día [A8, D9]. La empresa no publica el precio de HCSS ni el reparto de derechos con Thoma Bravo dentro de Build (gobierno, salida, opciones de venta), lo que más importa para valorar al minoritario [D1, D3]. El flujo operativo del 1S26 bajó un 12,2 % por más impuestos pagados [A8]. No hay transcripciones gratuitas de la conferencia.`,
};

const rentabilidad = {
  comentario: `**Nemetschek crea valor con holgura, aunque menos que antes de comprar crecimiento.** El ROIC después de impuestos fue del 26-36 % en 2016-2023 y bajó al 19,3 % y al 19,2 % en 2024-2025, todavía más del doble del WACC del 8,25 %. La caída la explica el capital, no el margen: GoCanvas (732,7 M en 2024) duplicó el fondo de comercio hasta 1.135 M, mientras el margen EBIT subía del 23,4 % al 25,0 % [A1, A2]. El ROIC incremental de la década es del 17,9 %: lo comprado rinde el doble de su coste, pero la mitad que el negocio orgánico. HCSS (más de 2.000 M) volverá a bajarlo en 2026-2027 [D19]. El negocio apenas necesita capital: los clientes pagan por adelantado (466,6 M de ingresos diferidos) y el circulante es del −28,5 % de las ventas [A1].`,
  confianza: 'Media',
};

const capital = {
  comentario: `La dirección asigna bien el capital orgánico y paga caro el inorgánico. En la década generó 1.698 M de flujo libre y gastó 1.339 M en compras, 387 M en dividendos y solo 11 M en recompras [A1-A7]. GoCanvas (732,7 M) salió bien: Build creció un 41,3 % en 2025 con un margen del 35,8 % y la deuda de la compra bajó de 500,4 a 359,5 M en un año [A1]. Pixologic y Red Giant, en Media, no: Maxon está estancado en ≈ 121 M de ingresos desde 2023 [A1]. HCSS es la apuesta grande: más de 2.000 M, ≈ 20 veces el EBITDA, pagada sobre todo con el 28 % de Build para no ampliar capital [D3, D19]. Es caro para la empresa, porque cede parte de su mejor división a un fondo de capital riesgo cuyo horizonte de salida no se conoce.`,
  confianza: 'Media',
};

const multiplos_historicos = {
  comentario: `Nemetschek cotiza a 25,8 veces el EBITDA de los últimos 12 meses y 31,6 veces el beneficio, frente a una media de la década de 32,6 y 51,5 veces: un descuento del 21 % y del 39 %, en el percentil 20 y 0 de su historia [D9, A1]. El EV/EBITDA LTM exagera, porque el valor empresa ya lleva la deuda y el minoritario de HCSS y el EBITDA todavía no; con el de los próximos 12 meses baja a 19,2 veces. El PER, que no tiene ese sesgo, está en el mínimo de diez años, por debajo incluso del de finales de 2022 (34,1 veces). Lo que ha cambiado es el miedo a la IA en el software de diseño, no el crecimiento ni los tipos (el Bund estaba en el 2,5 % a finales de 2022 y hoy en el 3,47 %) [D26].`,
};

const comparables = {
  comentario: `Nemetschek cotiza a 19,2 veces el EBITDA de los próximos 12 meses y 26,7 veces el beneficio, en línea con la mediana del software de diseño y construcción (18,2 y 27,3 veces) [D6, D10-D16]. Su crecimiento de los próximos 12 meses (23,9 %) está inflado por HCSS; el orgánico (14-15 %) sigue por encima de la mediana (11,4 %), con un margen parecido (31,7 % frente al 30,2 %) [D1]. Autodesk (18,2 veces, +12,7 %) y Bentley (20,3 veces, +14,2 %) son los comparables más cercanos y no justifican ni prima ni descuento. Las medianas dan 62,88 EUR por EV/EBITDA y 69,01 EUR por PER (65,95 EUR de media). La regresión no explica los múltiplos (R² de 0,24) y no se usa. Pesan un 20 %.`,
};

const transacciones = {
  comentario: `Cinco compras de software de diseño, simulación y construcción en 2024-2026 se pagaron a 10,9-18 veces las ventas y 20-50 veces el EBITDA, con primas del 19-34 % sobre cotizadas [D3, D19-D25]. La mediana de EV/EBITDA (31 veces) daría 85,28 EUR por acción, un 26,5 % sobre el precio; pero lleva prima de control y la familia Nemetschek (45,07 % de los votos, con pacto) hace improbable una opa [C16]. La propia Nemetschek pagó por HCSS ≈ 20 veces el EBITDA, por encima de las 19,2 veces del EBITDA de los próximos 12 meses a las que cotiza ella. Pesan un 5 %.`,
};

const sentimiento = {
  tono: 'Dividido',
  tendencia: 'Mejora',
  revisadas: [
    { plataforma: 'wallstreet-online (foro de la acción)', fecha: '2026-10', n_comentarios: 5, tono: 'Positivo', resumen: 'Hilo largo con muy poca actividad: cinco mensajes en tres meses, el último sobre el rebote a la baja en la media de 200 sesiones; la encuesta de la página es alcista sin número de votos [E1].' },
    { plataforma: 'Börse Express (análisis de mercado)', fecha: '2026-04', n_comentarios: 0, tono: 'Dividido', resumen: 'Resume el miedo a que la IA agéntica desplace a los productos BIM, que hundió la acción en el 1T, frente a los bancos que mantienen la compra con objetivos rebajados [P2].' },
    { plataforma: 'trading-treff (análisis de mercado)', fecha: '2026-08', n_comentarios: 0, tono: 'Positivo', resumen: 'Tras el 1S26, dos casas reiteran la compra porque los resultados habrían desactivado el miedo a la IA; reconoce que las opiniones siguen divididas [P3].' },
  ],
  temas: [
    { tema: 'La IA como amenaza para el software de diseño', postura: 'Dividida', peso: 'Alto', contraste: 'Los datos no muestran daño todavía: ARR +17,4 % a tipo constante y crecimiento orgánico del 14-15 % confirmado en julio [A8]. Es el riesgo del escenario bajista.' },
    { tema: 'Valoración tras la caída', postura: 'Alcista', peso: 'Medio', contraste: 'El PER de los últimos 12 meses (31,6 veces) es el mínimo de la década, pero el EV/EBITDA de los próximos 12 meses (19,2 veces) está en la mediana de sus comparables: barata frente a su historia, no frente al sector.' },
    { tema: 'Análisis técnico (media de 200 sesiones)', postura: 'Dividida', peso: 'Bajo', contraste: 'Sin relación con el valor.' },
  ],
  lectura: `Hay muy poco debate de particulares: el foro alemán más activo tuvo cinco mensajes en tres meses y los foros en inglés no se pudieron leer [E1]. La conversación la marcan los análisis de mercado, que han pasado del miedo de abril (la IA agéntica desplazaría el BIM) a la tesis de que los resultados lo han desmentido [P2, P3]. No hay euforia ni capitulación: el sentimiento va con la tesis y con el consenso (14 compras de 18) [D7]. Ninguna cifra del informe sale de aquí. El riesgo que más pesa en la conversación, la IA, es el del escenario bajista.`,
  confianza: 'Baja',
};

const directivos = {
  comentario: `El equipo cumple lo que promete: la guía anual se cumplió o superó de 2021 a 2025 y la de 2026 se confirmó en julio [C10, C15]. Padrines (consejero delegado desde 2022) y Öfverström (directora financiera desde 2023) han llevado el paso a la suscripción y las dos mayores compras de la historia, GoCanvas y HCSS. El problema es el precio: 17,42 M EUR para el consejero delegado en 2025, 151 veces el coste medio por empleado, con un sistema nuevo que sube su tope de 9,5 a 14,5 M EUR [C2, C9]. No constan sus participaciones en el capital. Dobitsch preside el consejo de supervisión desde 1998.`,
};

export const secciones = { trimestres, rentabilidad, capital, multiplos_historicos, comparables, transacciones, sentimiento, directivos };
export { bolsa_comentario };

export const dcf_justificacion = {
  crecimiento: `2026e +19,2 % (1.420 M): guía orgánica del 14-15 % a tipo constante, ≈ 6 puntos de HCSS desde julio con la asignación del precio de compra y algo de efecto cambiario en contra; el consenso da 1.421 M [D1, D6]. 2027e +20,0 %: primer año completo de HCSS (≈ +10 puntos) y orgánico del ≈ 10 %; el consenso da +21,3 % [D6]. Después baja del 12,5 % de 2028e al 3,5 % de 2035e. La media de 2027e-2035e (9,5 %) queda por debajo del 15,1 % anual de la década (con compras) y en línea con el 9,9 % previsto para el mercado [B1, A1].`,
  margenes: `Margen EBITDA del 31,0 % en 2026e (punto medio de la guía, 32,5 %, menos ≈ 150 puntos de HCSS) [D1]; 33,0 % en 2027e, sin la asignación del precio de compra y con HCSS al ≈ 40 % [D3]; y 35,5 % desde 2031e. Es el margen de Dassault (35,1 %) y está por debajo del de PTC (40,5 %) y del de Build en el 1S26 (39,8 %) [D12, D13, A8]. La década se movió entre el 26,1 % y el 32,6 % [A1]. El consenso da un 34,4 % en 2028e; nosotros, un 34,0 % [D6].`,
  inversion: `Capex del 3,0 % de las ventas: el de caja de 2025 (1,2 %) más los pagos de arrendamientos (1,6 %), porque con la NIIF 16 el EBITDA no lleva los alquileres [A1]. La amortización (6,1 % en 2025, de ella 3,6 puntos de compras) sube al 6,5 % en 2027e con la de HCSS y converge al capex en 2034e. Circulante del −27 % de las ventas, entre el −25,9 % de 2024 y el −28,5 % de 2025: los clientes pagan las suscripciones por adelantado [A1]. Tipo impositivo del 23 %, frente al 21,8 % de 2025.`,
  wacc: `Tasa libre del 3,47 %, el Bund a 10 años del 9-oct-2026 [D26]. Beta de 1,00: entre la mensual a 5 años frente al DAX ajustada (0,89) y las semanales a 5 años frente al MDAX y al DAX (1,01 ajustada y 1,12); la mensual frente al MDAX (0,51) no es creíble para un software con una volatilidad del 47 % [D9, P1]. Prima de mercado del 5,5 %, coste de la deuda del 3,5 % antes de impuestos (Schuldschein y la refinanciación de HCSS) y un 11,4 % de deuda a valor de mercado. WACC del 8,25 %; con la prima implícita del mercado (4,20 %), el 7,1 % [D27].`,
  terminal: `Crecimiento a perpetuidad del 2,5 %: inflación del euro del 2 % y algo de crecimiento real, por debajo de la tasa libre menos medio punto (2,97 %). El múltiplo de salida implícito es de 13,0 veces el EBITDA, por debajo de las 19,2 veces de hoy y de la mediana de los comparables (18,2 veces).`,
};

export const etapa2_justificacion = `No se usa. El ROIC (19,2 %) supera al WACC en 11 puntos, pero la proyección explícita ya dura diez años y el riesgo de la IA aconseja no alargar el crecimiento más allá.`;

export const dcf_lectura = `El DCF da 76,10 EUR por acción, un 12,9 % por encima del precio, con un 63 % del valor en el terminal. **El precio descuenta casi lo mismo que nosotros.** El DCF inverso dice que los 67,40 EUR de hoy suponen un crecimiento de los ingresos del 8,3 % anual de 2027e a 2035e, frente al 9,5 % de nuestro caso base y al 9,9 % previsto para su mercado; o, con nuestro crecimiento, un margen EBITDA del 32,4 % en vez del 35,5 %, es decir, el margen de hoy sin mejora [B1]. Comprar a este precio rinde un 8,8 % anual si se cumple el caso base, medio punto por encima del WACC. No es un precio de crisis: es un precio que ya no paga la prima de calidad que el mercado daba a Nemetschek (32,6 veces el EBITDA de media en la década). Lo que separa el precio de nuestro valor son 1,2 puntos de crecimiento y 3 de margen, que dependen de que la IA no erosione el número de licencias de diseño. Con la prima de riesgo que hoy pide el mercado (4,20 %), el DCF sube a 101,27 EUR.`;

export const narrativas = {
  Bajista: `La IA generativa abarata el diseño y la documentación y reduce los puestos de proyectistas, que es como cobra Design; a la vez la construcción no residencial frena, como en 2023, cuando el crecimiento cayó del 17,7 % al 6,2 %. Crecimiento medio del 5,5 %, margen EBITDA estancado en el 32,5 % y crecimiento a perpetuidad del 2 %.`,
  Base: `Se cumple la guía de 2026, HCSS aporta un año completo en 2027 y el crecimiento orgánico baja del 12 % al 3,5 % en diez años, en línea con el mercado. El margen EBITDA sube al 35,5 % con la escala de la suscripción.`,
  Alcista: `Bluebeam, GoCanvas y HCSS cruzan ventas en la obra de EE. UU. y la IA se cobra como módulo adicional: crecimiento medio del 11,5 % y margen del 37 %.`,
};

export const escenarios_comentario = `La asimetría es justa: el alcista vale 97,22 EUR (+44,2 %) y el bajista 40,35 EUR (−40,1 %), 1,10 veces. El bajista no es cosmético: deja el margen en el nivel de hoy y el crecimiento en el 5,5 % anual, lo que pasó en 2023 cuando frenó la construcción. Con la prima de riesgo que pide el mercado, el bajista sube a 53,98 EUR y el alcista a 128,61, y la asimetría a 4,56 veces. El valor ponderado por probabilidad es de 71,39 EUR, un 5,9 % sobre el precio: la ganancia esperada depende más de la tasa de descuento que de los escenarios.`;

export const valoracion_comentario = `Pesos: DCF 50 %, escenarios 25 %, comparables 20 % y transacciones 5 %. El DCF manda porque el 92 % de los ingresos es recurrente y los clientes pagan por adelantado; los escenarios pesan un 25 % porque el riesgo de la IA es asimétrico. Los comparables (65,95 EUR) pesan un 20 %: la muestra es buena (Autodesk, Bentley, Dassault, PTC), pero los múltiplos de los últimos 12 meses no sirven por HCSS. Las transacciones (85,28 EUR) llevan prima de control y la familia controla el 45 % de los votos: un 5 %. El puente resta 1.937,6 M de minoritarios, 1.900 M de ellos por el 28 % de Build de Thoma Bravo (estimación propia, a valor del DCF); al precio de la operación (más de 2.000 M menos 450 M de deuda, ≈ 1.550 M) el valor subiría ≈ 3 EUR por acción [D3, D19]. El valor objetivo es de 73,35 EUR.`;

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 8.5, precio_pct: 6.0, otros_pct: 4.7, comentario: 'Orgánico del 14-15 % a tipo constante: más clientes (Bluebeam, GoCanvas) y más ingreso por cliente por el paso a la suscripción (suscripción y SaaS +51 % en 2025); otros = HCSS (+6 puntos) menos el efecto cambiario (≈ −1,3) [D1, A1].' },
    { periodo: '2027e', volumen_pct: 6.0, precio_pct: 4.5, otros_pct: 9.5, comentario: 'Otros = el primer semestre de HCSS que faltaba y la vuelta de la asignación del precio de compra (25-30 M) [D1]; orgánico del ≈ 10 %.' },
    { periodo: '2028e', volumen_pct: 8.0, precio_pct: 4.5, otros_pct: 0.0, comentario: 'Venta cruzada de HCSS con Bluebeam en EE. UU. y precios de la suscripción; consenso de +13,9 % [D6].' },
    { periodo: '2029e', volumen_pct: 6.5, precio_pct: 4.5, otros_pct: 0.0, comentario: 'En línea con el 9,9 % anual previsto para el mercado de diseño y construcción de Cambashi hasta 2029 [B1].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: `Sí. El crecimiento orgánico del caso base no necesita capital (la reinversión es negativa porque los clientes pagan por adelantado) y tiene precedente: el ARR crece un 17,4 % a tipo constante y la guía orgánica de 2026 es del 14-15 % [A8, D1]. El poder de precios está demostrado con el paso a la suscripción. La cuota que supone es razonable: sin Media y sin HCSS, los ingresos de 2029e serían ≈ 7 % de los 23.300 M de mercado previstos, frente al 6,3 % de hoy [B1]. Desde 2030e crecemos por debajo del mercado. El riesgo no es la capacidad de la empresa sino que la IA reduzca las licencias: está en el bajista.`,
};

export const catalizadores = {
  items: [
    { fecha: '5-nov-2026', evento: 'Resultados del 3T26', efecto: 'Primer trimestre con HCSS y primera cifra de minoritarios de Build', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Diciembre de 2026-marzo de 2027', evento: 'Asignación definitiva del precio de compra de HCSS', efecto: 'Dirá cuánto se pagó y cuánta amortización añade', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Marzo de 2027 (estimada)', evento: 'Resultados de 2026 y guía de 2027', efecto: 'La guía orgánica de 2027 es la prueba del miedo a la IA', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Mayo de 2027 (estimada)', evento: 'Junta general', efecto: 'Cuarto voto sobre una remuneración que rechaza el 86 % del capital libre', probabilidad: 'Alta', sentido: '−' },
    { fecha: 'Sin fecha', evento: 'Salida o ampliación de Thoma Bravo en Build', efecto: 'Fijaría el valor de mercado del minoritario', probabilidad: 'Baja', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'La IA generativa reduce las licencias de diseño o permite rivales baratos', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista: 40,35 EUR, −47 % sobre el valor base', mitigante: '92 % de ingresos recurrentes, costes de cambio altos y IA propia (Bluebeam Max)', senal: 'Crecimiento orgánico de Design por debajo del 5 % o ARR por debajo del 10 %' },
    { riesgo: 'Ciclo de la construcción no residencial', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Dos puntos menos de crecimiento: 62,09 EUR (−18 %)', mitigante: 'Ingresos por suscripción y peso de infraestructura (HCSS)', senal: 'Crecimiento de Build por debajo del 10 % orgánico' },
    { riesgo: 'Thoma Bravo en Build: salida, derechos y coste del minoritario', tipo: 'Estructura', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Cada 10 % de más en el valor del minoritario quita ≈ 1,65 EUR por acción', mitigante: 'Nemetschek mantiene ≈ 72 % y el control', senal: 'Pacto de socios, opciones de venta o salida a bolsa de Build' },
    { riesgo: 'Integración de HCSS y asignación del precio de compra', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Dos puntos menos de margen: 70,43 EUR (−7 %)', mitigante: 'GoCanvas se integró bien (Build +41 % en 2025)', senal: 'Margen de Build por debajo del 35 %' },
    { riesgo: 'Dólar: ≈ 42 % de las ventas en EE. UU. y más con HCSS', tipo: 'Divisa', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: 'Restó ≈ 4 puntos de crecimiento en el 1S26', mitigante: 'Costes también en dólares', senal: 'Dólar por encima de 1,25 por euro' },
    { riesgo: 'Coste de capital', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'WACC 0,5 puntos mayor: 68,09 EUR (−11 %)', mitigante: 'Deuda neta ajustada de 1,5 veces el EBITDA', senal: 'Bund por encima del 4 %' },
    { riesgo: 'Gobierno: remuneración rechazada por el capital libre y control familiar', tipo: 'Gobierno', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: 'No cambia el valor; limita una opa', mitigante: 'Seis de nueve consejeros independientes', senal: 'Nuevo voto en contra en 2027 sin cambios' },
  ],
  premortem: `Octubre de 2029: la acción ha caído un 40 %, a unos 40 EUR. La historia más probable empieza con la guía de 2027: los estudios de arquitectura usan herramientas de IA que generan planos y documentación, contratan menos proyectistas y renuevan menos licencias de Allplan, Vectorworks y Graphisoft; Design crece al 5 %. A la vez la construcción no residencial de EE. UU. frena y Bluebeam pierde clientes nuevos frente a Autodesk y Procore. HCSS crece, pero la asignación del precio de compra y el minoritario de Thoma Bravo dejan el beneficio por acción plano tres años. El mercado deja de pagar el 25 % de crecimiento por suscripción y valora a Nemetschek como a Dassault, a 11 veces el EBITDA. El indicador que lo habría anticipado: el crecimiento orgánico de Design (+7,3 % en el 1S26 frente a +11,9 % del grupo) y el ARR por debajo del 10 %.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Thoma Bravo', pregunta: '¿Qué derechos tiene Thoma Bravo en Build (opciones de venta, salida a bolsa, arrastre, dividendos) y a qué valor?', por_que: 'El minoritario es 1.900 M en el puente; un 10 % de diferencia mueve 1,65 EUR por acción.' },
    { tema: 'HCSS', pregunta: '¿Cuál fue el precio exacto de HCSS, su EBITDA de 2025 en NIIF y la amortización anual de la asignación del precio de compra?', por_que: 'La empresa no lo ha publicado.' },
    { tema: 'IA', pregunta: '¿Cómo evolucionan el número de licencias y el ingreso medio por licencia en Design?', por_que: 'Es lo primero que dañaría la IA.' },
    { tema: 'Remuneración', pregunta: '¿Por qué el consejo sube el tope del consejero delegado a 14,5 M EUR si el 86 % del capital libre votó en contra de la remuneración?', por_que: 'Mide el respeto al minoritario.' },
    { tema: 'Media', pregunta: '¿Qué plan hay para Maxon, estancado en ≈ 121 M de ingresos desde 2023?', por_que: 'Es el 10 % de las ventas y no crece.' },
    { tema: 'Plan de acciones de Build', pregunta: '¿Cuánto costará el nuevo plan de pagos en acciones de Build y se liquidará en caja?', por_que: 'Resta margen y diluye al grupo en su mejor división.' },
  ],
  confianza: 'Media',
};

export const suma_partes = { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica en el valor objetivo: las cuatro divisiones son software con suscripción y comparables parecidos, y el valor que más pesa (Build) ya se separa en el puente al restar el 28 % de Thoma Bravo.', confianza: 'Media' };

export const fuentes = [
  { id: 1, titulo: 'Históricos diarios de NEM.DE, EXS3.DE (iShares MDAX) y EXV3.DE (herramienta bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://finance.yahoo.com/quote/EXS3.DE/history' },
  { id: 2, titulo: 'Nemetschek Aktie: Übertriebener KI-Pessimismus', editor: 'Börse Express', tipo: 'Prensa', fecha: '2026-04-03', url: 'https://www.boerse-express.com/news/articles/nemetschek-aktie-uebertriebener-ki-pessimismus-887518' },
  { id: 3, titulo: 'Nemetschek Aktie: Analysten entschärfen KI-Befürchtungen', editor: 'trading-treff', tipo: 'Prensa', fecha: '2026-08-31', url: 'https://trading-treff.de/trading/nemetschek-aktie-analysten-entschaerfen-ki-befuerchtungen' },
];

export const huecos = [
  { seccion: 'trimestres', campo: 'ultima_presentacion (transcripciones de las conferencias)', tipo: 'Complemento', intentos: '1) Web de inversores de Nemetschek (solo presentación y grabación); 2) agregadores gratuitos de transcripciones (sin las de Nemetschek); 3) prensa sobre la conferencia del 30-jul-2026 (solo titulares)', decision: 'Omitido' },
];

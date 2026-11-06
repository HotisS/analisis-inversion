// Textos del analista (Nemetschek, corte 2026-11-06, tras el 3T26). Citas: [A17] = fuente 17 de A.json; [D29] = fuente 29 de D.json; [P1] = fuente propia.
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

// Ingresos diferidos (pasivos por contrato), corto + largo plazo, en M EUR, de la nota del balance de cada informe anual.
const diferidos = { 2016: 55.293, 2017: 68.835, 2018: 95.375, 2019: 122.185, 2020: 131.875, 2021: 160.941, 2022: 209.570, 2023: 271.247, 2024: 385.797, 2025: 466.580 };
export const parches = [
  ...Object.entries(diferidos).map(([anio, v], i) => ({ ruta: `balance.historico[${i}].pasivos_contrato`, valor: v })),
  { ruta: 'directivos.historial_guidance[5].real', valor: 'En curso. 9M26: ventas de 1.011,8 M (+14,6 % orgánico a tipo constante, +19,2 % con HCSS) y margen EBITDA del 30,9 % (32,1 % orgánico); el 5-nov se confirmó entera la guía del grupo y se rebajó la de Manage y Media [A17].' },
];

export const limitaciones = `Se valora la acción ordinaria de Nemetschek SE en XETRA (NEM), en euros. Precio: cierre del jueves 5-nov-2026 (68,00 EUR), el día de los resultados; la sesión del 6-nov no había cerrado al hacer el informe y la historia diaria de Yahoo aún no trae la barra del 5-nov, así que el cierre sale del gráfico de Yahoo y lo confirma MarketScreener [D28]. Las rentabilidades y la beta de la herramienta de bolsa llegan al 4-nov (75,70 EUR) y no recogen la caída del 5-nov (−10,2 %) [P1]. Acciones: 115,49 M en circulación, sin dilución relevante [D40]. Índice de referencia: el MDAX (Nemetschek está en el MDAX y el TecDAX); rentabilidad con fondos de rentabilidad total sobre el MDAX (EXS3) y la tecnología europea (EXV3) [P1]. **HCSS** consolida desde el 1-jul-2026 y ya está en el balance de septiembre [A17]. El minoritario de Thoma Bravo (≈ 28 % de Build) se resta al valor de la operación que registró la propia empresa (1.791,4 M) y no a valor contable [A17]. El ejercicio 2026e del DCF y los múltiplos de los últimos 12 meses mezclan un trimestre con HCSS y tres sin ella: la comparación útil es la de los próximos 12 meses. Las cuentas anuales vienen del informe anual de cada año (el repositorio ESEF filings.xbrl.org no tiene a Nemetschek: la herramienta de cuentas ESEF falla con el nombre y con el LEI); el 3T26 sale del comunicado trimestral, la nota de prensa y la presentación [A17-A19]. La segmentación vigente solo tiene cifras reexpresadas para 2023-2025 [A1, A3]. Cuenta por naturaleza. El circulante incluye los ingresos diferidos de cada informe anual (466,6 M en 2025) [A1-A7, A14]. Comparables: estimaciones de MarketScreener del 9-oct llevadas al cierre del 5-nov con la variación de precio [D38]. No hay transcripción literal gratuita de la conferencia del 3T26: se usa un resumen de prensa [A20].`;

export const controles_explicados = [
  { control: 'Cambio de perímetro declarado (2019)', explicacion: 'El activo de 2019 crece por la primera aplicación de la NIIF 16 (70,3 M de arrendamientos), la caja (+88 M) y compras de 97,9 M repartidas en varias filiales (Redshift para Maxon y otras) [A5]; no hubo una compra grande al cierre.' },
  { control: 'Múltiplos LTM y NTM de cada comparable coherentes', explicacion: 'Procore: con los pagos en acciones restados su EBITDA es casi nulo (margen del 1,1 %) y sus múltiplos de EBITDA no son significativos; pesa poco en la mediana [D16].' },
];

const bolsa_comentario = `Hasta el 4-nov la acción perdía un 17,6 % en el año y un 17,7 % en doce meses (con dividendos), frente al +0,9 % y +6,9 % del MDAX y al +21,6 % y +19,9 % de la tecnología europea [P1]; con la caída del 5-nov (−10,2 %, a 68,00 EUR) el año queda en ≈ −26 % [D28]. La caída máxima fue del 61,8 %, de agosto de 2025 al 25-jun-2026 [P1]. No cayó el negocio (ingresos de 9M26 +14,6 % orgánicos a tipo constante): cayó el múltiplo, por el miedo a que la IA abarate el software de diseño y por las ventas de todo el software europeo en junio [A17, P4]. Desde el mínimo de junio (50,45 EUR) ha recuperado un 35 %. Beta semanal a 5 años de 1,00 frente al MDAX y a 2 años de 0,86; la mensual a 5 años (0,54) no es creíble con una volatilidad anual del 48 % [P1].`;

export const contexto = {
  movimiento: { fecha: '2026-11-06', var_1m_pct: 4.6, var_3m_pct: 11.9, var_6m_pct: 17.4, var_12m_pct: -26.7, dist_max_52s_pct: -29.2, dist_min_52s_pct: 30.9, dist_max_historico_pct: -50.5, tendencia: 'alcista', volatilidad_60d_pct: 49, avisos: [] },
  movimientos_fuertes: [
    { periodo: 'jun-2026', var_pct: -21.0, causa: 'Ventas de todo el software europeo tras la guía de Oracle (11-jun, −6,9 % en el día) y el miedo a la IA; Jefferies bajó su objetivo de 90 a 70 EUR (25-jun) y Goldman de 100 a 90 (30-jun). Mínimo de 50,45 EUR el 26-jun [P4, P5, P6].', veredicto: 'no cambia', condicion: null },
    { periodo: 'jul-2026', var_pct: 26.6, causa: 'Cierre de HCSS (1-jul) y ampliación de la guía por la compra (28-jul); el 30-jul cayó un 13,7 % con el 1S26 por un efecto cambiario en el margen del 2T26 [A8, D2].', veredicto: 'no cambia', condicion: null },
    { periodo: '5-nov-2026', var_pct: -10.2, causa: 'Resultados del 3T26: crecimiento orgánico a tipo constante del 12,5 % frente al 13,6 % esperado y BPA publicado de 0,40 EUR frente a 0,46 por la amortización de HCSS y el minoritario de Thoma Bravo; guía de 2026 confirmada [A17, D30, D32].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-11-05', tipo: 'resultados', hecho: '3T26: ingresos +26,6 % (+12,5 % orgánico a tipo constante), margen EBITDA del 31,2 % (34,8 % orgánico), BPA de 0,40 EUR; guía de 2026 confirmada; Manage y Media rebajan la suya [A17, A18].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-11-05', tipo: 'recomendación', hecho: 'mwb baja el objetivo de 89 a 82 EUR («Buy»); Morgan Stanley lo sube a 75,50 («Equal-weight»); Jefferies de 72 a 79 («Buy»); DZ Bank mantiene «Halten» con 70; JPMorgan «Overweight» con 110 [D31-D34].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-07-01', tipo: 'fusión u oferta', hecho: 'Cierre de HCSS: Thoma Bravo recibe ≈ 28 % de Build. Su salida (venta o salida a bolsa de Build) fijaría el valor del minoritario; no hay fecha ni pacto publicado [A16, A17].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-08-19', tipo: 'directivos', hecho: 'Compras de dos consejeros de supervisión (Dobitsch el 30-jul y Schöneweis el 19-ago, ≈ 0,1 M EUR cada una); ninguna venta de directivos en 12 meses [C20, C21].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-09-10', tipo: 'accionista de referencia', hecho: 'BlackRock baja al 4,56 % de los votos (4,98 % con instrumentos). La familia Nemetschek mantiene el 45,07 % con pacto; no hay colocación anunciada [C16, C18].', veredicto: 'no cambia', condicion: null },
    { fecha: '2027-03', tipo: 'resultados', hecho: 'Resultados de 2026, guía de 2027 y asignación definitiva del precio de HCSS, en marzo de 2027 (sin fecha publicada) [D39].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: 'Marzo de 2027 (sin fecha publicada)',
  veredicto: 'no cambia',
  condicion: null,
  comentario: `La acción cayó un 10,2 % el 5-nov por un trimestre algo peor de lo esperado en crecimiento orgánico y en BPA publicado, con la guía de 2026 confirmada: es una caída con causa conocida y recogida en este informe, no un hecho nuevo que la tesis no tenga. La tendencia sigue alcista (6,7 % sobre la media de 200 sesiones) y no hay colocaciones, ampliaciones, litigios ni ventas de directivos pendientes. El único hecho abierto que puede mover el precio, la salida de Thoma Bravo de Build, no tiene fecha. Se buscó en la página de inversores, EQS, prensa alemana y el agregador de noticias del repositorio [D39, P7].`,
};

const trimestres = {
  ultima_presentacion: `En el 3T26 (5-nov-2026) la dirección repitió que la guía orgánica de 2026 se cumple (14-15 % a tipo constante, margen del 32-33 %) y explicó el frenazo del trimestre (12,5 % orgánico a tipo constante, frente al 16,2 % del 1S26) por Design: menos clientes de mantenimiento pasaron a suscripción que en el primer semestre, y la suscripción reconoce más ingreso al principio [A17, A20]. La directora financiera negó que hubiera cambios de precio o de duración de los contratos. Design cerrará el año con un crecimiento de un dígito alto y 2027 será otro año grande de transición [A20]. Build creció un 25,6 % orgánico con un margen orgánico del 44,7 %, y HCSS crece «en la parte alta de los diez» por ciento [A17, A20]. Frente a julio, cambian dos cosas: se rebaja la guía de Manage y Media, y la empresa admite que el ritmo de Design es difícil de prever, que es lo que más preguntaron los analistas [A17, D34]. Sobre el reparto con Thoma Bravo, la presentación aclara que Build tributa por transparencia y que el minoritario se lleva su 28 % antes de impuestos; el BPA publicado será algo menor en 2026, neutro en 2027 y mayor desde 2028 [A19]. La dirección no dio número de clientes de Bluebeam Max ni el precio total de HCSS [A20].`,
};

const rentabilidad = {
  comentario: `**Nemetschek crea valor con holgura, pero HCSS triplica el capital.** El ROIC después de impuestos fue del 26-36 % en 2016-2023 y del 19,3 % y 19,2 % en 2024-2025, más del doble del WACC (8,26 %). La caída la explica el capital, no el margen: GoCanvas duplicó el fondo de comercio [A1, A2]. HCSS repite la historia a mayor escala: el capital invertido (patrimonio, minoritarios y deuda neta) pasa de 1.118 M a cierre de 2025 a 3.380 M en septiembre de 2026, con 2.456,6 M de fondo de comercio y 1.308,8 M de intangibles [A17]. Con nuestro EBIT de 2027e (410 M) y un impuesto del 20,5 %, el ROIC sobre ese capital sería del ≈ 9,6 %, y del ≈ 12,5 % sin la amortización de compras (estimación propia): un punto y medio a cuatro sobre el WACC, no once. El ROIC de esta tabla (19,2 %) es el de 2025 y no lo recoge todavía. El negocio sigue sin necesitar capital: los clientes pagan por adelantado (594,3 M de ingresos diferidos en septiembre) [A17].`,
  confianza: 'Media',
};

const capital = {
  comentario: `La dirección asigna bien el capital orgánico y paga caro el inorgánico. En la década generó 1.698 M de flujo libre y gastó 1.339 M en compras, 387 M en dividendos y solo 11 M en recompras [A1-A7]. GoCanvas (732,7 M) salió bien: Build creció un 41,3 % en 2025 y la deuda de la compra bajó de 500,4 a 359,5 M en un año [A1]. Maxon, en Media, no: ingresos estables y guía rebajada a crecimiento cero en 2026 [A17]. HCSS es la apuesta grande: se pagó sobre todo con el ≈ 28 % de Build, que la empresa registró a 1.791,4 M, más la refinanciación de 404,3 M de deuda y 119,8 M de caja neta en 9M26 [A17]. Con ello la deuda neta sube a 425,9 M (≈ 1,0 veces el EBITDA de los últimos 12 meses) y el minoritario se lleva ya 12,3 M por trimestre [A17]. Cede parte de su mejor división (margen orgánico del 44,7 %) a un fondo cuyo horizonte de salida no se conoce.`,
  confianza: 'Media',
};

const multiplos_historicos = {
  comentario: `A 68,00 EUR Nemetschek cotiza a 24,2 veces el EBITDA de los últimos 12 meses y 33,0 veces el beneficio, frente a una media de la década de 32,6 y 51,5 veces: un descuento del 26 % y del 36 %, en el percentil 20 y 0 de su historia [D28, A1]. El EV/EBITDA LTM exagera, porque el valor empresa ya lleva el minoritario de HCSS y el EBITDA solo un trimestre de ella; con el de los próximos 12 meses baja a 18,5 veces. El PER está por debajo del de finales de 2022 (34,1 veces). Ha cambiado el miedo a la IA en el software de diseño y el reparto del beneficio con Thoma Bravo, no los tipos (Bund del 3,27 %) [D36].`,
};

const comparables = {
  comentario: `Nemetschek cotiza a 18,5 veces el EBITDA de los próximos 12 meses y 27,1 veces el beneficio, en línea con la mediana del software de diseño y construcción (18,8 y 29,5 veces) [D10-D16, D38]. Los comparables han subido desde octubre (Bentley +28,5 %, Procore +34,5 %, Dassault +20,4 %, Autodesk +14,4 %) mientras Nemetschek bajaba [D38]. Su crecimiento de los próximos 12 meses (23,1 %) está inflado por HCSS; el orgánico (12-15 %) sigue por encima de la mediana (11,4 %), con un margen parecido. Las medianas dan 69,61 EUR por EV/EBITDA y 74,02 EUR por PER (71,82 EUR de media). La regresión (R² de 0,31) daría 173 EUR porque toma el crecimiento con HCSS como orgánico: no se usa. Pesan un 20 %.`,
};

const transacciones = {
  comentario: `Cinco compras de software de diseño, simulación y construcción en 2024-2026 se pagaron a 10,9-18 veces las ventas y 20-50 veces el EBITDA, con primas del 19-34 % sobre cotizadas [D3, D19-D25]. La mediana de EV/EBITDA (31 veces) daría 92,77 EUR por acción, un 36,4 % sobre el precio; pero lleva prima de control y la familia Nemetschek (45,07 % de los votos, con pacto) hace improbable una opa [C16]. La propia Nemetschek valoró el 28 % de Build que entregó por HCSS en 1.791,4 M, lo que pone el 100 % de Build en ≈ 6.400 M, el 63 % del valor empresa de todo el grupo a precio de hoy [A17]. Pesan un 5 %.`,
};

const sentimiento = {
  tono: 'Dividido',
  tendencia: 'Empeora',
  revisadas: [
    { plataforma: 'wallstreet-online (foro de la acción)', fecha: '2026-10', n_comentarios: 5, tono: 'Positivo', resumen: 'Hilo largo con muy poca actividad: cinco mensajes en tres meses, el último sobre el rebote en la media de 200 sesiones; la encuesta de la página es alcista sin número de votos [E1].' },
    { plataforma: 'Seeking Alpha (análisis y transcripciones)', fecha: '2026-11', n_comentarios: 0, tono: 'Positivo', resumen: 'El último análisis de autor es del 1-jul («AI Fears Seem Overblown»); después, solo transcripciones. No hay debate nuevo tras el 3T26 [E2].' },
    { plataforma: 'Kapitalmarktexperten (comentario de mercado)', fecha: '2026-11', n_comentarios: 0, tono: 'Dividido', resumen: 'Tras el 3T26 el debate pasa de la IA al reparto del beneficio con Thoma Bravo: más ventas no significan más beneficio para el accionista [E3].' },
    { plataforma: 'trading-treff (análisis de mercado)', fecha: '2026-08', n_comentarios: 0, tono: 'Positivo', resumen: 'Tras el 1S26, dos casas reiteran la compra porque los resultados habrían desactivado el miedo a la IA [P3].' },
  ],
  temas: [
    { tema: 'Dilución por el 28 % de Build de Thoma Bravo', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: el minoritario se llevó 12,3 M en el 3T26 y el BPA publicado cayó un 15,7 % [A17]. Está en nuestro BPA (90 M de minoritarios en 2028e) y en el puente (1.841,8 M).' },
    { tema: 'La IA como amenaza para el software de diseño', postura: 'Dividida', peso: 'Alto', contraste: 'El crecimiento orgánico bajó al 12,5 % en el 3T26, pero por el ritmo de paso a suscripción en Design, según la empresa; el ARR orgánico crece un 16,6 % a tipo constante [A17, A20]. Es el riesgo del escenario bajista.' },
    { tema: 'Valoración tras la caída', postura: 'Alcista', peso: 'Medio', contraste: 'El PER de los últimos 12 meses (33,0 veces) está en el mínimo de la década; el EV/EBITDA de los próximos 12 meses (18,5 veces), en la mediana de sus comparables.' },
  ],
  lectura: `Sigue habiendo muy poco debate de particulares: el foro alemán más activo tuvo cinco mensajes en tres meses y Seeking Alpha no tiene análisis nuevos desde julio [E1, E2]. La conversación la marcan la prensa y los analistas, y tras el 3T26 ha cambiado de tema: del miedo a la IA al reparto del beneficio con Thoma Bravo [E3]. No hay euforia ni capitulación: 14 de 18 analistas siguen en comprar [D35]. Ninguna cifra del informe sale de aquí. El riesgo que más pesa en la conversación ya está en nuestro BPA.`,
  confianza: 'Baja',
};

const directivos = {
  comentario: `El equipo cumple lo que promete: la guía anual se cumplió o superó de 2021 a 2025 y la de 2026 se confirmó entera en noviembre, con 9M26 en línea (+14,6 % orgánico a tipo constante) [C10, C15, A17]. Padrines (consejero delegado desde 2022) y Öfverström (directora financiera desde 2023) han llevado el paso a la suscripción y las dos mayores compras de la historia. El problema es el precio: 17,42 M EUR para el consejero delegado en 2025, 151 veces el coste medio por empleado, con un sistema nuevo que sube su tope de 9,5 a 14,5 M EUR [C2, C9]. No constan sus participaciones en el capital.`,
};

export const secciones = { trimestres, rentabilidad, capital, multiplos_historicos, comparables, transacciones, sentimiento, directivos };
export { bolsa_comentario };

export const dcf_justificacion = {
  crecimiento: `2026e +19,4 % (1.422 M), fijo: 1.011,8 M de 9M26 más 410,3 M del 4T26 según el consenso; cuadra con la guía (14-15 % orgánico, ≈ 6 puntos de HCSS, efecto cambiario en contra) [A17, D35]. 2027e +21,0 %: HCSS entera (≈ +11 puntos) y orgánico del ≈ 10,5 %, medio punto menos que en octubre porque el 3T26 bajó al 12,5 % y Manage y Media rebajan su guía; el consenso da +21,5 % [A17, D29]. Después baja del 12 % de 2028e al 3,5 % de 2035e. La media de 2027e-2035e (9,6 %) queda por debajo del 15,1 % anual de la década y en línea con el 9,9 % previsto para el mercado [B1, A1].`,
  margenes: `Margen EBITDA del 31,0 % en 2026e (punto medio de la guía menos ≈ 150 puntos de HCSS; 30,9 % en 9M26) [A17]. 33,0 % en 2027e sin la rebaja de ingresos diferidos y con HCSS al ≈ 40 %, como el consenso (33,0 %) [D29]; 35,5 % desde 2031e. El margen orgánico ya fue del 34,8 % en el 3T26 y Build orgánico del 44,7 % [A17]. Es el margen de Dassault (35,1 %), por debajo del de PTC (40,5 %) [D12, D13].`,
  inversion: `Capex del 3,0 % de las ventas: capex de caja más pagos de arrendamientos (2,8 % en 2025 y 2,0 % en 9M26), con margen para las comisiones activadas [A1, A17]. La amortización sube al 8,4 % en 2026e y al 9,2 % en 2027e por la de HCSS (≈ 80 M al año; 19,0 M en el 3T26) y converge al capex en 2034e [A17, A19]. Circulante del −27 % de las ventas: los clientes pagan las suscripciones por adelantado [A1]. Tipo impositivo del 20,5 %: Build tributa por transparencia y el grupo solo paga sobre su 72 % (20,1 % en 9M26) [A17, A19].`,
  wacc: `Tasa libre del 3,27 %, el Bund a 10 años del 5-nov-2026 [D36]. Beta de 1,00, la semanal a 5 años frente al MDAX; la semanal a 2 años da 0,86 y la mensual a 5 años 0,54, poco creíble con una volatilidad del 48 % [P1]. Prima de mercado del 5,5 %, coste de la deuda del 3,5 % (Schuldschein y línea revolving) y un 8,5 % de deuda a valor de mercado. WACC del 8,26 %; con la prima implícita del mercado (4,41 % en noviembre), del 7,26 % [D37].`,
  terminal: `Crecimiento a perpetuidad del 2,5 %: inflación del euro del 2 % y algo de crecimiento real, por debajo de la tasa libre menos medio punto (2,77 %). El múltiplo de salida implícito es de 13,4 veces el EBITDA, por debajo de las 18,5 veces de hoy y de la mediana de los comparables (18,8 veces).`,
};

export const etapa2_justificacion = `No se usa. El ROIC de 2025 (19,2 %) supera al WACC en 11 puntos, pero con el capital de HCSS bajaría a ≈ 10-12 %; la proyección explícita ya dura diez años y el riesgo de la IA aconseja no alargar el crecimiento.`;

export const dcf_lectura = `El DCF da 82,04 EUR por acción, un 20,6 % por encima del precio, con un 63 % del valor en el terminal. Sube desde 76,10 EUR en octubre por el puente: la deuda neta real tras HCSS (470 M con arrendamientos) es menor que la estimada y el minoritario de Thoma Bravo se resta a su valor de operación (1.791 M) en vez de nuestros 1.900 M [A17]. **El precio descuenta algo menos que nosotros.** El DCF inverso dice que los 68,00 EUR de hoy suponen un crecimiento del 7,6 % anual de 2027e a 2035e, frente al 9,6 % de nuestro caso base y al 9,9 % previsto para su mercado; o, con nuestro crecimiento, un margen EBITDA del 30,8 % en vez del 35,5 %, por debajo del orgánico de hoy (32,1 % en 9M26) [B1, A17]. Comprar a este precio rinde un 9,2 % anual si se cumple el caso base, un punto sobre el WACC. Es un precio que ya no paga la prima de calidad (32,6 veces el EBITDA de media en la década) y que supone que el crecimiento orgánico baja de golpe a un dígito. Con la prima de riesgo que hoy pide el mercado (4,41 %), el DCF sube a 103,89 EUR.`;

export const narrativas = {
  Bajista: `La IA generativa abarata el diseño y la documentación y reduce los puestos de proyectistas, que es como cobra Design; a la vez la construcción no residencial frena, como en 2023, cuando el crecimiento cayó del 17,7 % al 6,2 %. Crecimiento medio del 5,6 %, margen EBITDA estancado en el 32,5 % y crecimiento a perpetuidad del 2 %.`,
  Base: `Se cumple la guía de 2026, HCSS aporta un año completo en 2027 y el crecimiento orgánico baja del 12 % al 3,5 % en diez años, en línea con el mercado. El margen EBITDA sube al 35,5 % con la escala de la suscripción y Build.`,
  Alcista: `Bluebeam, GoCanvas y HCSS cruzan ventas en la obra de EE. UU. y fuera, y la IA se cobra como módulo adicional (paquetes y créditos de uso en Allplan): crecimiento medio del 11,6 % y margen del 37 %.`,
};

export const escenarios_comentario = `La asimetría es favorable pero no amplia: el alcista vale 103,97 EUR (+52,9 %) y el bajista 44,87 EUR (−34,0 %), 1,56 veces. El bajista no es cosmético: deja el margen en el nivel de hoy y el crecimiento en el 5,6 % anual, lo que pasó en 2023 cuando frenó la construcción. Con la prima de riesgo que pide el mercado, el bajista sube a 56,76 EUR y el alcista a 131,21, y la asimetría a 5,62 veces. El valor ponderado por probabilidad es de 77,13 EUR, un 13,4 % sobre el precio.`;

export const valoracion_comentario = `Pesos: DCF 50 %, escenarios 25 %, comparables 20 % y transacciones 5 %. El DCF manda porque el 96 % de los ingresos es recurrente y los clientes pagan por adelantado; los escenarios pesan un 25 % porque el riesgo de la IA es asimétrico. Los comparables (71,82 EUR) pesan un 20 %: la muestra es buena (Autodesk, Bentley, Dassault, PTC), pero sus estimaciones son de octubre y los múltiplos de los últimos 12 meses no sirven por HCSS. Las transacciones (92,77 EUR) llevan prima de control y la familia controla el 45 % de los votos: un 5 %. El puente resta 1.841,8 M de minoritarios, de ellos 1.791,4 M por el 28 % de Build de Thoma Bravo al valor que registró la empresa [A17]; cada 10 % de más en ese valor quita ≈ 1,55 EUR por acción. El valor objetivo es de 79,30 EUR.`;

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 8.5, precio_pct: 6.0, otros_pct: 4.9, comentario: 'Orgánico del 14-15 % a tipo constante (14,6 % en 9M26): más clientes en Build y más ingreso por cliente con la suscripción (suscripción y SaaS +28,3 % orgánico en 9M26); otros = HCSS (+6 puntos) menos el efecto cambiario [A17].' },
    { periodo: '2027e', volumen_pct: 5.5, precio_pct: 4.5, otros_pct: 11.0, comentario: 'Otros = el primer semestre de HCSS que faltaba y la vuelta de la rebaja de ingresos diferidos (25-30 M) [A17]; orgánico del ≈ 10,5 %, con Design todavía en transición [A20].' },
    { periodo: '2028e', volumen_pct: 7.5, precio_pct: 4.5, otros_pct: 0.0, comentario: 'Venta cruzada de HCSS con los canales de Bluebeam en EE. UU. y fuera (pruebas en Reino Unido, Australia y Latinoamérica) y precios de la suscripción; consenso de +14,0 % [A20, D29].' },
    { periodo: '2029e', volumen_pct: 6.5, precio_pct: 4.5, otros_pct: 0.0, comentario: 'En línea con el 9,9 % anual previsto para el mercado de diseño y construcción de Cambashi hasta 2029 [B1].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: `Sí. El crecimiento orgánico del caso base no necesita capital (la reinversión es negativa porque los clientes pagan por adelantado) y tiene precedente: el ARR orgánico crece un 16,6 % a tipo constante y 9M26 lleva un 14,6 % orgánico [A17]. El poder de precios está demostrado con el paso a la suscripción. La cuota que supone es razonable: sin Media y sin HCSS, los ingresos de 2029e serían ≈ 7 % de los 23.300 M de mercado previstos, frente al 6,3 % de hoy [B1]. Desde 2030e crecemos por debajo del mercado. HCSS ya está pagada: no pide más capital, pero baja el ROIC del grupo a ≈ 10-12 %, que es un problema de rentabilidad del capital ya invertido, no de capacidad de crecer.`,
};

export const catalizadores = {
  items: [
    { fecha: 'Diciembre de 2026-marzo de 2027', evento: 'Asignación definitiva del precio de compra de HCSS', efecto: 'Fija la amortización anual y si el minoritario cambia de valor', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Marzo de 2027 (sin fecha)', evento: 'Resultados de 2026 y guía de 2027', efecto: 'La guía orgánica de 2027 es la prueba del miedo a la IA; el balance anual meterá el capital de HCSS en el ROIC', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Abril-mayo de 2027', evento: 'Resultados del 1T27', efecto: 'Primer trimestre sin la rebaja de ingresos diferidos de HCSS', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Mayo de 2027 (estimada)', evento: 'Junta general', efecto: 'Cuarto voto sobre una remuneración que rechaza el 86 % del capital libre', probabilidad: 'Alta', sentido: '−' },
    { fecha: '2027-2028', evento: 'Cobro de la IA (paquetes y créditos de uso en Allplan, Bluebeam Max)', efecto: 'Precio por cliente al alza si se cobra aparte', probabilidad: 'Media', sentido: '+' },
    { fecha: 'Sin fecha', evento: 'Salida o ampliación de Thoma Bravo en Build', efecto: 'Fijaría el valor de mercado del minoritario', probabilidad: 'Baja', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'La IA generativa reduce las licencias de diseño o permite rivales baratos', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista: 44,87 EUR, −45 % sobre el valor base', mitigante: '96 % de ingresos recurrentes, costes de cambio altos e IA propia (Archicad, Allplan y Bluebeam Max)', senal: 'Crecimiento orgánico de Design por debajo del 5 % o ARR orgánico por debajo del 10 %' },
    { riesgo: 'ROIC rebajado por el capital de HCSS', tipo: 'Rentabilidad', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'No cambia el DCF; con las cuentas de 2026 el ROIC quedará ≈ 3 puntos sobre el WACC (estimación propia)', mitigante: 'Build orgánico gana un 44,7 % de margen y HCSS crece en la parte alta de los diez', senal: 'ROIC de 2026 por debajo del 12,8 % (WACC + 4,5)' },
    { riesgo: 'Ciclo de la construcción no residencial', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Dos puntos menos de crecimiento: 67,50 EUR (−18 %)', mitigante: 'Ingresos por suscripción y peso de infraestructura (HCSS)', senal: 'Crecimiento orgánico de Build por debajo del 10 %' },
    { riesgo: 'Thoma Bravo en Build: salida, derechos y coste del minoritario', tipo: 'Estructura', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Cada 10 % de más en el valor del minoritario quita ≈ 1,55 EUR por acción', mitigante: 'Nemetschek mantiene ≈ 72 % y el control', senal: 'Pacto de socios, opciones de venta o salida a bolsa de Build' },
    { riesgo: 'Integración de HCSS y asignación del precio de compra', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Dos puntos menos de margen: 76,12 EUR (−7 %)', mitigante: 'GoCanvas se integró bien (Build +41 % en 2025)', senal: 'Margen orgánico de Build por debajo del 38 %' },
    { riesgo: 'Coste de capital', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'WACC 0,5 puntos mayor: 73,72 EUR (−10 %)', mitigante: 'Deuda neta ajustada de 1,1 veces el EBITDA', senal: 'Bund por encima del 4 %' },
    { riesgo: 'Dólar: más de un 40 % de las ventas en EE. UU., más con HCSS', tipo: 'Divisa', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: 'Restó ≈ 2,1 puntos de crecimiento en 9M26 (14,6 % a tipo constante frente al 12,5 % publicado)', mitigante: 'Costes también en dólares', senal: 'Dólar por encima de 1,25 por euro' },
    { riesgo: 'Gobierno: remuneración rechazada por el capital libre y control familiar', tipo: 'Gobierno', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: 'No cambia el valor; limita una opa', mitigante: 'Seis de nueve consejeros independientes', senal: 'Nuevo voto en contra en 2027 sin cambios' },
  ],
  premortem: `Noviembre de 2029: la acción ha caído un 40 %, a unos 41 EUR. La historia más probable empieza con la guía de 2027: los estudios de arquitectura usan herramientas de IA que generan planos y documentación, contratan menos proyectistas y renuevan menos licencias de Allplan, Vectorworks y Graphisoft; Design crece al 4 %, y la empresa lo atribuye otra vez al «ritmo de la transición», como en el 3T26. A la vez la construcción no residencial de EE. UU. frena y Bluebeam pierde clientes nuevos frente a Autodesk y Procore. HCSS crece, pero la amortización de la compra y el 28 % de Thoma Bravo dejan el BPA publicado por debajo de 2,30 EUR en 2028, y el ROIC del grupo, con 3.400 M de capital, cae al 9 %. El mercado deja de pagar crecimiento por suscripción y valora a Nemetschek como a Dassault, a 13 veces el EBITDA. El indicador que lo habría anticipado: el crecimiento orgánico de Design (+8,6 % a tipo constante en 9M26, frente al 14,6 % del grupo) y el ARR orgánico por debajo del 10 %.`,
  ia: {
    exposicion: 'Alta',
    sentido: 'Mixto',
    efecto_valor: '−45 % en el bajista; +27 % en el alcista',
    comentario: `Design (41 % de las ventas de 9M26) cobra por usuario: si la IA genera planos y documentación, los estudios necesitan menos licencias; es el bajista (44,87 EUR) [A17]. Build y HCSS cobran por obra y por empresa y ganan con la IA, que automatiza revisión de planos y presupuestos. La empresa ya vende módulos de IA (Bluebeam Max, con una adopción «por encima de lo esperado», Archicad Max, Allplan Max) y prepara un cobro híbrido con paquetes y créditos de uso [A17, A20]. Señal a vigilar: crecimiento orgánico de Design por debajo del 5 % o ARR orgánico por debajo del 10 %. Hasta ahora no se ve: ARR orgánico +16,6 % a tipo constante.`,
  },
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Thoma Bravo', pregunta: '¿Qué derechos tiene Thoma Bravo en Build (opciones de venta, salida a bolsa, arrastre, dividendos) y en qué plazo?', por_que: 'El minoritario es 1.791 M en el puente; un 10 % de diferencia mueve 1,55 EUR por acción.' },
    { tema: 'Design', pregunta: '¿Cuántos clientes de mantenimiento quedan por pasar a suscripción y qué ingreso medio por usuario tienen antes y después?', por_que: 'Es lo que frenó el 3T26 y lo primero que dañaría la IA.' },
    { tema: 'HCSS', pregunta: '¿Cuál fue el precio total de HCSS, su EBITDA de 2025 en NIIF y la amortización anual definitiva de la asignación del precio de compra?', por_que: 'Decide el BPA publicado de 2027-2028 y el ROIC.' },
    { tema: 'ROIC', pregunta: '¿Qué rentabilidad sobre el capital invertido exige la dirección a HCSS y en qué plazo?', por_que: 'El capital del grupo se ha triplicado y el ROIC caerá a ≈ 10-12 %.' },
    { tema: 'Remuneración', pregunta: '¿Por qué el consejo sube el tope del consejero delegado a 14,5 M EUR si el 86 % del capital libre votó en contra de la remuneración?', por_que: 'Mide el respeto al minoritario.' },
    { tema: 'Plan de acciones de Build', pregunta: '¿Cuánto costará el plan de pagos en acciones de Build y se liquidará en caja?', por_que: 'Resta margen (≈ 10 M con la integración en 2026) y diluye al grupo en su mejor división.' },
  ],
  confianza: 'Media',
};

export const suma_partes = { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica en el valor objetivo: las cuatro divisiones son software con suscripción y comparables parecidos, y el valor que más pesa (Build) ya se separa en el puente al restar el 28 % de Thoma Bravo a su valor de operación.', confianza: 'Media' };

export const fuentes = [
  { id: 1, titulo: 'Históricos diarios de NEM.DE, EXS3.DE (iShares MDAX) y EXV3.DE (herramienta bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-04', url: 'https://finance.yahoo.com/quote/EXS3.DE/history' },
  { id: 2, titulo: 'Nemetschek Aktie: Übertriebener KI-Pessimismus', editor: 'Börse Express', tipo: 'Prensa', fecha: '2026-04-03', url: 'https://www.boerse-express.com/news/articles/nemetschek-aktie-uebertriebener-ki-pessimismus-887518' },
  { id: 3, titulo: 'Nemetschek Aktie: Analysten entschärfen KI-Befürchtungen', editor: 'trading-treff', tipo: 'Prensa', fecha: '2026-08-31', url: 'https://trading-treff.de/trading/nemetschek-aktie-analysten-entschaerfen-ki-befuerchtungen' },
  { id: 4, titulo: 'Nemetschek Aktie: Oracle-Schock zieht Kurs runter', editor: 'Börse Express', tipo: 'Prensa', fecha: '2026-06-11', url: 'https://www.boerse-express.com/news/articles/nemetschek-aktie-oracle-schock-zieht-kurs-runter-916591' },
  { id: 5, titulo: 'Nemetschek Aktie: Jefferies senkt Ziel auf 70 Euro', editor: 'Börse Express', tipo: 'Prensa', fecha: '2026-06-26', url: 'https://www.boerse-express.com/news/articles/nemetschek-aktie-jefferies-senkt-ziel-auf-70-euro-921791' },
  { id: 6, titulo: 'Nemetschek-Aktie rutscht: Goldman senkt Kursziel auf 90 EUR', editor: 'Goldesel', tipo: 'Prensa', fecha: '2026-06-30', url: 'https://goldesel.de/aktien/news/nemetschek-aktie-rutscht-goldman-senkt-kursziel-auf-90-eur-chart-deutet-auf-erholung-hin' },
  { id: 7, titulo: 'Movimiento del precio y noticias de 12 meses de NEM.DE (herramientas movimiento.mjs y noticias.mjs)', editor: 'Yahoo Finance y agregadores de noticias', tipo: 'Datos de mercado', fecha: '2026-11-06', url: 'https://finance.yahoo.com/quote/NEM.DE/' },
];

export const huecos = [
  { seccion: 'trimestres', campo: 'ultima_presentacion (transcripción literal de la conferencia del 3T26)', tipo: 'Complemento', intentos: '1) Web de inversores (presentación y grabación MP3, sin texto); 2) agregadores gratuitos de transcripciones (Seeking Alpha solo hasta el 2T26 y de pago); 3) resumen de prensa de MarketBeat, usado en su lugar', decision: 'Omitido' },
  { seccion: 'financieros', campo: 'cuentas-xbrl.json (ESEF)', tipo: 'Complemento', intentos: '1) cuentas.mjs --esef "Nemetschek" (sin entidad en filings.xbrl.org); 2) con el LEI 391200QSLOCQDLVZHY72 (404); 3) búsqueda por nombre en la API de entidades (0 resultados): las cuentas anuales salen de los informes anuales, ya comprobadas en la iteración del 10-oct', decision: 'Omitido' },
];

// ---- Objetivo a 12 meses (regla común; BPA publicado, después de la amortización de compras y del minoritario) ----
export const objetivo_12m = {
  ejercicio: '2028e',
  base_bpa: 'publicado',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 2.1, multiplo: null, precio: null, justificacion: 'Ventas de 1.797 M (−4 puntos de crecimiento en 2027e-2028e) y margen EBITDA del 31 %: la IA reduce licencias de diseño y la construcción frena. Amortización de compras igual que en el base (154 M); Thoma Bravo se lleva 68 M antes de impuestos. Beneficio atribuido de 243 M.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 2.65, multiplo: null, precio: null, justificacion: 'Ventas de 1.928 M (+21 % en 2027e con HCSS entera y +12 % en 2028e) y margen EBITDA del 34 %; amortización de 154 M (≈ 80 M de HCSS), financieros de −18 M, 90 M de minoritarios (28 % del beneficio antes de impuestos de Build) e impuestos del 22 % sobre la parte del grupo. Beneficio atribuido de 306 M.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 2.94, multiplo: null, precio: null, justificacion: 'Ventas de 1.994 M (+2 puntos de crecimiento) y margen del 35,5 %: venta cruzada de HCSS y Bluebeam y la IA cobrada como módulo. Minoritarios de 100 M. Beneficio atribuido de 340 M.' },
  ],
  per_historico: {
    base: 'adelantado', base_bpa: 'publicado', actual: 32.1, mediana_5a: 49.8, minimo_5a: 34.1, media_larga: 51.9, anios: 5,
    excluidos: 'Historia adelantada en BPA publicado: precio de cierre de cada año ÷ BPA publicado del año siguiente (2025: ÷ nuestro BPA de 2026e, 1,95). 2018 29,9x (BPA de 2019 normalizado sin la plusvalía de DocuWare: 1,07); 2019 70,0x; 2020 51,6x; 2021 80,6x; 2022 34,1x; 2023 51,6x; 2024 49,8x; 2025 47,6x. Ninguno cumple las reglas de exclusión (pérdidas, PER ≥ 150x, más de 3 veces o menos de un tercio de la mediana del resto). Mediana y mínimo de 2021-2025; media larga de 2018-2025. PER actual: 68,00 ÷ 2,12 (nuestro BPA de 2027e).',
    v2: { actual: 32.1, mediana_5a: 56.1, minimo_5a: 34.1, media_larga: 49.9, base: 'cierre' },
  },
  comparables_per: { mediana: 29.5 },
  consenso: { bpa_ano1: 2.58, bpa_ano2: 3.22, objetivo_medio: 87.13, objetivo_min: 52, objetivo_max: 115, analistas: 18, tendencia_3m: 'estables', fuente: 'MarketScreener (BPA a 4-nov-2026) y Yahoo Finance (objetivos a 6-nov-2026) [D29, D35]' },
  diferencia_consenso: `Nuestro BPA es un 18 % menor que el del consenso en 2027e (2,12 frente a 2,58) y en 2028e (2,65 frente a 3,22), y nuestro precio base (93,54 EUR) un 7,4 % mayor que el objetivo medio (87,13). La diferencia de BPA es de base, no de negocio: nuestro EBITDA de 2028e (655 M) queda un 3 % por debajo del consenso (677,5 M), pero restamos ≈ 150 M de amortización con la de HCSS y 90 M de minoritarios, y parte de los analistas usa el BPA ajustado sin la amortización de compras (Yahoo da 2,84 para 2027e) [D29, D35]. El precio base es mayor porque la regla aplica el PER histórico, que también es de BPA publicado.`,
  media: null,
  comentario: `El valor intrínseco (79,30 EUR, +16,6 %) queda un 16 % por debajo del objetivo ponderado a 12 meses (94,30 EUR): la regla supone que el PER, hoy de 32,1 veces el BPA publicado de 2027e, vuelve un 10 % hacia su mediana de cinco años (49,8 veces). Para cerrar la distancia hace falta un catalizador con fecha: la guía de 2027 en marzo, con un crecimiento orgánico de dos dígitos, y el primer trimestre sin la rebaja de ingresos diferidos de HCSS (1T27). La distancia es menor del 25 %.`,
};

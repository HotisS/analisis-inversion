// Textos del analista (Gartner, corte 2026-10-11). Citas: [A3] = fuente 3 de A.json; [D30] = fuente 30 de D.json.
let R = {};
try { R = await import('./resumen.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; }
export const resumen = R.resumen ?? null;

export const limitaciones = `Se valora la acción ordinaria de Gartner, Inc. en la Bolsa de Nueva York (IT), en USD y con las cuentas en US GAAP; precio de cierre del viernes 9-oct-2026 (191,15 USD), porque el corte cae en domingo [D4]. Acciones: 63,23 M diluidas, las 63,15 M en circulación a 31-jul-2026 más 0,08 M de planes en acciones; como son posteriores al balance del puente (30-jun-2026), se restan de la caja unos 131,8 M de recompras de julio, deducidos del saldo pendiente de la autorización, que la empresa redondea [D1]. La deuda va por su principal (3.000 M), no por su valor contable (2.979,3 M). Los arrendamientos operativos de oficinas no van a la deuda: su gasto ya está en el EBITDA (US GAAP). El EBITDA de las cuentas y del DCF es el contable (lleva dentro los pagos en acciones, 2,4 % de las ventas); el del consenso es el ajustado de la empresa, y el motor le resta ese 2,4 % para compararlos [D7]. En 2025 la empresa cambió su segmentación (Insights, Conferences, Consulting y Otros) y solo reexpresó 2023-2025; 2021-2022 van en una fila con el antiguo segmento Research [A2]. 2026 no es comparable con 2025 por la venta de Digital Markets (227,4 M de ingresos en 2025) [A2, A3]. No hay estudio público que mida el gasto real del mercado de investigación y asesoramiento: el tamaño es el mercado potencial que estima la propia Gartner [B11, B12]. El consenso de estimaciones completas es de una sola fuente gratuita (MarketScreener) y su BPA mezcla bases contable y ajustada [D7]. No se han podido leer foros con comentarios de particulares (Seeking Alpha, Stocktwits y otros dan error de acceso): el sentimiento sale de artículos y notas de mercado [E1-E8].`;

export const controles_explicados = [
  { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: 'El 9,6 % de 2024 lleva un beneficio fiscal de 161,9 M por una transferencia interna de propiedad intelectual (diciembre de 2024) [A2]. No se proyecta: el DCF usa un 24,5 %, cerca del 24,7 % de 2025.' },
  { control: 'Regresión múltiplo-crecimiento explicativa', explicacion: 'R² de 0,20: el crecimiento no explica los múltiplos de estos comparables; los separa el margen (mediana del 45,6 % frente al 22,4 % de Gartner) y el riesgo de sustitución por la IA. No se usa la regresión.' },
];

export const parches = [
  { ruta: 'directivos.historial_guidance[0].guia', valor: 'Guía de feb-2020: ingresos +9 % sin efecto divisa, margen EBITDA ajustado ≥ 16,1 %, BPA ajustado de unos 4,06 USD y flujo libre de unos 505 M USD [C18]. Se retiró en mayo de 2020 por la COVID.' },
];

export const huecos_resueltos = [
  { seccion: 'gobierno', campo: 'demandas colectivas de valores 2025-2026' },
];

const rentabilidad = {
  comentario: `**Gartner crea mucho valor con poco capital, pero el ROIC dejó de subir.** El capital invertido de explotación es pequeño (1.733 M en 2025) porque los clientes pagan las suscripciones por adelantado: los ingresos diferidos (2.810 M) financian el circulante, que es negativo, un −36,4 % de las ventas [A2]. Con un beneficio operativo después de impuestos de 886 M, el ROIC fue del 51,1 % en 2025, frente a un WACC del 9,3 %. Lo crea desde 2020: tras la compra de CEB (2017), el fondo de comercio hundió el ROIC al 5,7-10,8 % en 2017-2019, y la subida al 56,4 % de 2024 vino del margen (EBIT del 9,2 % en 2018 al 18,4 % en 2024) con una rotación estable de 0,6-0,8 veces. El ROIC incremental histórico (46,9 %) confirma que el crecimiento orgánico apenas pide capital. En 2025 bajó cinco puntos porque el beneficio operativo cayó (deterioro de Digital Markets y despidos), no porque se invirtiera más. El ROE (86,9 %) no significa nada: el patrimonio es casi nulo, y negativo a junio de 2026, por las recompras [A3]. Forrester, el rival comparable, tiene pérdidas operativas [B7].`,
  confianza: 'Alta',
};

const calidad = {
  comentario: `Las cuentas son fiables en lo esencial. KPMG firma sin salvedades las cuentas y el control interno, y lleva 30 años como auditor; su materia clave es la incertidumbre fiscal por precios de transferencia [A2, A25]. Los tres indicadores son buenos: Altman Z de 3,38 (zona segura, pese al patrimonio casi nulo), Piotroski F de 6 sobre 9 (falla en el ROA, el endeudamiento y la liquidez, por la emisión de bonos para recomprar) y Beneish M de −2,88, lejos del umbral de manipulación. Hay que leer tres cosas con cuidado. El BPA ajustado que comunica la empresa (13,17 USD en 2025) excluye los pagos en acciones (155,9 M, el 2,4 % de las ventas y el 21 % del beneficio), que son un coste real: el BPA contable fue de 9,65 USD [A2, A6]. Los beneficios de 2021 y 2024 llevan 152,3 M y 300 M de indemnizaciones del seguro de cancelación de congresos, y el de 2024 otros 161,9 M de beneficio fiscal por una transferencia interna de propiedad intelectual: el BPA de 16,00 USD de 2024 no es repetible [A2]. Y las comisiones comerciales se activan (400,7 M en balance) y se amortizan con el contrato, lo que suaviza el gasto comercial [A2]. La caja confirma el beneficio: el flujo libre ha sido el 149 % del beneficio neto acumulado de 2016-2025.`,
};

const capital = {
  comentario: `La dirección es disciplinada en las compras y agresiva en las recompras, con mala fortuna en el precio. Desde CEB (3.519 M en 2017), que llevó Gartner a todas las funciones de la empresa y no se ha deteriorado, solo ha hecho compras pequeñas y ha vendido lo que no encajaba (Talent Assessment, TalentNeuron, Digital Markets) [A14, A2]. Entre 2016 y 2025 generó 7.897 M de flujo libre y dedicó 6.768 M a recompras, sin dividendos: las acciones diluidas bajaron de 91,0 M en 2019 a 75,6 M en 2025 y 66,6 M en el 2T26 [A1, A4]. El problema es el precio: recompró a unos 453 USD de media en 2024 y unos 283 USD en 2025 (estimación propia, caja entre acciones), muy por encima de los 191,15 USD de hoy; en 2025 gastó 1.991 M, el 273 % del beneficio, y se endeudó 800 M más para hacerlo [A23, A15]. Las del primer semestre de 2026 (1.081,8 M a 153,49 USD) sí han salido bien [A3]. Digital Markets, comprada por 206,9 M en 2015, se vendió por 104,8 M tras deteriorar 150 M [A2, A3]. Al precio actual, con un flujo libre del 10,7 % de la capitalización, recomprar tiene sentido si el valor de contratos vuelve a crecer.`,
};

const multiplos_historicos = {
  comentario: `Gartner cotiza en mínimos de diez años: 9,5 veces el EBITDA de los últimos 12 meses frente a una media de 25,4 veces y un mínimo anterior de 14,8, y 17,1 veces el beneficio contable frente a una media de 42,3. El descuento (−63 % en EV/EBITDA) no lo explica el beneficio, que aguanta (EBITDA de 1.449 M en los últimos 12 meses sin el deterioro, frente a 1.428 M en 2023), sino el crecimiento esperado: el valor de contratos ha pasado de crecer un 12-16 % en 2021-2022 a un 1-2 % en 2025-2026 [A4, B21-B26], y el mercado teme que la IA generativa sustituya parte de la investigación de pago. La media de diez años incluye los múltiplos de 30-35 veces de 2021-2024, cuando el valor de contratos crecía a doble dígito y el Tesoro a 10 años rendía un 1,5-4 %; con el 5,24 % de hoy, esa media no es un objetivo realista [D40].`,
  confianza: 'Alta',
};

const comparables = {
  comentario: `Gartner cotiza a 9,1 veces el EBITDA de los próximos 12 meses y 12,8 veces el beneficio ajustado, frente a medianas de 13,9 y 22,8 veces de los ocho comparables. El descuento tiene razones: su margen EBITDA (22,4 %) es la mitad de la mediana (45,6 %), crece menos (2,4 % en los próximos 12 meses frente al 6,0 %) y es el único de la muestra cuyo producto central se ve amenazado por la IA generativa; Accenture, el otro proveedor de servicios intensivos en personas, cotiza a 8,3 veces [D18]. A su favor, el ROIC (51,1 %) dobla la mediana (25,2 %) y la rentabilidad por flujo libre (10,7 %) dobla la del grupo (5,2 %). La mediana del EV/EBITDA da 303,23 USD y la del PER 340,83 USD (media, 322,03 USD), muy por encima del DCF: suponen que Gartner vuelve a cotizar como una empresa de datos, y eso exige que el valor de contratos vuelva a crecer. El crecimiento no explica los múltiplos (R² de 0,20). Pesan un 15 %.`,
  confianza: 'Media',
};

const transacciones = {
  comentario: `Las compras de empresas de información de alta calidad se han pagado a 21-24 veces el EBITDA (IHS Markit, ProQuest) y la de Dun & Bradstreet, con poco crecimiento y mucha deuda, a 8,3 veces [D34-D37]; Gartner pagó por CEB una prima del 25 % [D32]. La mediana (21,2 veces) daría 459,47 USD por acción, más del doble del precio, pero son activos con márgenes del 35-45 % y sin el riesgo de sustitución que hoy pesa sobre Gartner. El caso más parecido en riesgo es D&B: a 8,3 veces el EBITDA, por debajo de las 9,5 veces a las que cotiza Gartner. Con una capitalización de 12.086 M, una deuda neta de 1,2 veces el EBITDA y un flujo libre del 10,7 %, Gartner es un candidato natural para el capital privado, pero no hay indicios de una operación, y el consejo, sin accionista de control, tendría que aceptarla. Peso: 0 %; sirven como suelo de valor de control.`,
  confianza: 'Media',
};

const bolsa = {
  comentario: `Gartner ha sido una de las peores acciones del S&P 500 en dos años: −47,9 % en 2025 y −24,2 % en 2026, frente a +17,7 % y +15,1 % del índice, con una caída máxima del 77,2 % desde el máximo de noviembre de 2024 al mínimo de 124,25 USD del 22-jun-2026 [D4]. La causa es el frenazo del valor de contratos, del +8 % de 2024 al +1 % de 2025, con los recortes federales de EE. UU. y el miedo a la IA generativa [A4, B26]. El peor día fue el 3-feb-2026 (−20,9 %), con los resultados del 4T25 y una guía de 2026 por debajo de lo esperado [A19]. Desde junio rebota un 54 %, con los resultados del 2T26 (4-ago), que subieron la guía de beneficio [D28, E2]. La volatilidad (56,9 %) es la de una acción en crisis, no la de una empresa de suscripción, y la posición corta es alta: 13,2 % de las acciones y 7 días de cobertura [D5]. A 10 años rinde un 8,1 % anual, la mitad que el índice.`,
  confianza: 'Alta',
};

const gobierno = {
  alertas: [
    'El director jurídico, Thomas Kim, deja la empresa el 16-oct-2026, cinco días después del corte, sin sucesor anunciado [C5].',
    'Sucesión del primer ejecutivo: Hall tiene 69 años, lleva 22 en el cargo y desde 2024 también preside el consejo; su contrato llega hasta 2031 y no hay sucesor público [C1, C7].',
    'Demanda colectiva de valores (Schmidt v. Gartner Inc., tribunal de distrito de Connecticut) contra la empresa, Hall y Safian por declaraciones sobre la demanda y el valor de contratos entre el 30-jul-2024 y el 2-feb-2026; abogados principales nombrados el 16-jun-2026. El 10-Q del 2T26 no la cita expresamente [B20, A3].',
    'Consejo veterano: Grabe (87 años, consejero desde 1993) y Fuchs (desde 1999) recibieron un 8,2 % y un 8,1 % de votos en contra en 2026; Grabe llegó al 17,5 % en 2024 [C2-C4].',
    'La remuneración variable de 2025 se midió sin el negocio federal de EE. UU.; así, el bonus se pagó al 119,6 % aunque los ingresos quedaron por debajo del objetivo [C1].',
    'Tras las caídas de 2025-2026 solo compró en mercado un consejero, Pagliuca (9,94 M USD a unos 230 USD en dic-2025); después del desplome de feb-2026 solo hubo una compra simbólica y varias ventas pequeñas de directivos en ago-2026 [C10].',
  ],
};

const sentimiento = {
  lectura: `El tono ha pasado de la capitulación (enero-junio, con recomendaciones de «no comprar» porque la IA haría la investigación que vende Gartner) a un optimismo prudente tras los resultados del 2T26, y el giro lo han llevado comentaristas y artículos para particulares más que los analistas, que siguen en «mantener» (3 comprar, 10 mantener, 2 vender) [E1-E5, D8]. No hay euforia: casi todas las piezas alcistas añaden que falta ver crecer las ventas. Los temas coinciden con los del informe: la IA, el valor de contratos y las recompras. Lo útil para la decisión es que la acción reacciona a cada noticia sobre la IA en ambos sentidos (−3,8 % el 4-sep por una encuesta propia; subida tras el Symposium de septiembre) [E6, E7], y que la posición corta (13,2 %) es alta [D5]: el dato de valor de contratos y de retención de cartera del 3T26 (3-nov) moverá mucho el precio. No se ha podido leer a los particulares en sus foros, así que la confianza es baja.`,
};

export const secciones = { rentabilidad, calidad, capital, multiplos_historicos, comparables, transacciones, bolsa, gobierno, sentimiento };

export const suma_partes = {
  aplica: false, descuento_holding_pct: 0, partes: [],
  comentario: `No se usa. Insights es el 78 % de los ingresos y más del 80 % de la contribución; Conferences y Consulting comparten clientes, marca y fuerza de ventas con él [A2]. La empresa solo publica la contribución bruta de cada segmento, sin repartir los gastos comerciales y generales (unos 2.900 M), así que una suma de partes dependería de un reparto arbitrario. Tampoco hay razones para pensar que el mercado infravalore un segmento por estar dentro del grupo.`,
  confianza: 'Media',
};

export const dcf_justificacion = {
  crecimiento: `2026e, −1,2 %, el consenso (6.417 M) y algo por encima de la guía (al menos 6.375 M): cae por la venta de Digital Markets (227,4 M de ingresos en 2025, un 3,5 %); sin ella, crece un 2,3 % [D7, D28, A2]. Es año fijo: hay dos trimestres publicados. 2027e +2,5 % y 2028e +3,5 %, por debajo del consenso (+4,0 % y +4,8 %), porque el valor de contratos crece solo un 2 % y la plantilla comercial ha bajado de 5.102 a 4.874 personas desde dic-2024 [D7, A3]. Después, un 4 % en 2029e-2030e y un 3 % al final. La media (2,8 %) es la cuarta parte del 11,5 % anual de 2016-2025 y está por debajo del 6-8 % que creció el valor de contratos en 2023-2024 [A4].`,
  margenes: `El EBITDA del DCF es el contable, con los pagos en acciones dentro. 2026e, 22,6 %: el EBITDA ajustado del consenso (1.607 M) menos un 2,4 % de pagos en acciones, en línea con el 24,5 % del primer semestre y el segundo semestre estacionalmente más débil [D7, A3]. Sube al 23,5 % en 2030e, dentro de lo ya logrado (23,8 % en 2021 y 23,6 % en 2022) y por debajo del margen ajustado del 24,6 % que guía la empresa para 2026, que el director financiero llamó «la nueva base» [A18, D28]. Sale de dejar de perder dinero en Digital Markets y de una plantilla un 8 % menor. Coincide con el consenso: −0,8 % de EBITDA en 2027e y −1,6 % en 2028e.`,
  inversion: `Capex del 1,6-2,0 % de las ventas, entre el 1,4 % de los últimos 12 meses y el 1,8 % de 2025; es sobre todo software interno y oficinas [A2, A3]. La amortización baja del 2,9 % al 2,0 % a medida que se agota la de los intangibles de CEB; en los últimos años ya es igual al capex. Circulante del −36 % de las ventas, el de 2022-2025 (−36,3 % a −36,7 %): los ingresos diferidos financian el crecimiento, y cada dólar de ventas nuevas trae unos 36 céntimos de caja. Tipo impositivo del 24,5 %, cerca del 24,7 % de 2025; no se proyecta el 9,6 % de 2024 [A2].`,
  wacc: `Tasa libre del 5,24 %, el Tesoro de EE. UU. a 10 años del 9-oct-2026 [D40]. Beta de 0,97, la ajustada mensual a 5 años frente al S&P 500 (0,96 sin ajustar); la de Damodaran para servicios de información, reapalancada con la estructura de Gartner, es de 0,84: usamos la más alta por el riesgo de sustitución [D4, D31]. Prima de mercado del 5,5 % y ninguna adicional. Coste de los fondos propios del 10,58 %. Deuda al 5,6 % antes de impuestos, el cupón del bono de 2035, que marca el coste marginal (el medio es el 4,34 %) [A22, D1], con un peso del 19,9 % a valor de mercado. WACC del 9,31 %; con la prima implícita del mercado (4,20 %), el 8,3 % [D30].`,
  terminal: `Crecimiento a perpetuidad del 2,5 %, por debajo de la inflación del dólar más el crecimiento real y de la tasa libre menos medio punto (4,74 %): descontamos que la IA limita el crecimiento a largo plazo de la investigación de pago. El múltiplo de salida implícito es de 11,1 veces el EBITDA, por encima de las 9,1 veces de hoy y por debajo de la mediana de los comparables (13,9 veces) y del mínimo de diez años de Gartner (14,8 veces). El valor terminal es el 62 % del valor.`,
};

export const etapa2_justificacion = `No se usa. El ROIC (51,1 %) supera de largo al WACC, pero el valor de contratos crece un 2 % y la amenaza de la IA no permite alargar un crecimiento alto más allá de 2033e.`;

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -0.7, precio_pct: 3.0, otros_pct: -3.5, comentario: 'Otros: la venta de Digital Markets resta un 3,5 % (227,4 M de ingresos en 2025) [A2]. Sin ella, +2,3 %: subidas de tarifa de unos 3 puntos (estimación propia, con una retención de cartera del 97-99 % y una de clientes del 85-86 %) y algo menos de volumen (plantilla comercial −4,5 % desde dic-2024) [A3].' },
    { periodo: '2027e', volumen_pct: -0.5, precio_pct: 3.0, otros_pct: 0, comentario: 'Valor de contratos del +2 % a junio de 2026 [A4]: precio en línea con la inflación y número de usuarios aún a la baja, como en 2025-2026.' },
    { periodo: '2028e', volumen_pct: 0.5, precio_pct: 3.0, otros_pct: 0, comentario: 'Vuelve a crecer el número de usuarios si la retención de cartera sube del 97 % al 100 %, el nivel de 2024 [A2].' },
    { periodo: '2029e', volumen_pct: 1.0, precio_pct: 3.0, otros_pct: 0, comentario: 'Un 4 %, la mitad del crecimiento del valor de contratos de 2023-2024 (8 %), con más contratación comercial [B25, B26].' },
  ],
  mercado_final: null,
  veredicto: 'En parte',
  justificacion: `En parte. El crecimiento proyectado (2,8 % anual) no necesita capital: el circulante negativo hace que crecer genere caja, y el ROIC es del 51,1 %. El poder de precios existe (la retención de cartera superó el 100 % hasta 2024 y el margen de contribución de Insights es del 77 %) [A2, B1], y el 2,8 % está muy por debajo del 11,5 % de 2016-2025. Pero la parte de volumen no está demostrada hoy: la retención de cartera de GTS está en el 97 %, el valor de contratos crece un 2 % y la plantilla comercial baja [A3]; el caso base depende de que la IA no erosione más la renovación. Por eso el caso base queda por debajo del consenso y el bajista pesa un 30 %. No se calcula la cuota implícita: el único tamaño de mercado es un potencial teórico que estima la propia Gartner [B11, B12].`,
};

export const dcf_lectura = `El DCF da 254,13 USD por acción, un 32,9 % por encima del precio, con un 62 % del valor en el terminal y 1.671 M de deuda neta ajustada. **El precio descuenta una Gartner que no vuelve a crecer.** El DCF inverso dice que, con nuestros márgenes, los 191,15 USD suponen unas ventas planas (0,0 % anual) en 2027e-2033e, frente al 3,4 % de nuestro caso base, al 4-5 % del consenso y al 11,5 % de 2016-2025; o, con nuestro crecimiento, un margen EBITDA del 18,3 % en vez del 23,5 %, el de 2020. Comprar a este precio rinde un 11,3 % anual si se cumple el caso base, frente al WACC del 9,3 % y al 8,3 % que pide hoy el mercado. Es el precio de una empresa que la IA va a estancar, no el de una que va a desaparecer: con dos puntos menos de crecimiento y dos menos de margen en todos los años, el valor sería de 193,14 USD, el precio actual. El supuesto más exigente es que el volumen deje de caer en 2028e.`;

export const narrativas = {
  Bajista: 'La IA generativa hace con Insights lo que la competencia hizo con Forrester: la retención de cartera baja del 97 % al 90 %, el valor de contratos cae y los ingresos bajan un 1,5-2 % al año hasta 2033e. El margen EBITDA se queda en el 19-20 % de 2019-2020 y el crecimiento terminal en el 1,5 %.',
  Base: 'El valor de contratos se recupera despacio (del 2 % al 4 %) con subidas de tarifa y una retención estable; el margen EBITDA contable sube al 23,5 % con menos plantilla y sin Digital Markets.',
  Alcista: 'La IA se convierte en el gran tema de los directivos, como lo fue la nube en 2021-2022: el valor de contratos vuelve al 6-8 % de 2023-2024, el margen sube al 25 % por apalancamiento operativo y las recompras a precios bajos multiplican el BPA.',
};

export const escenarios_comentario = `La asimetría es favorable: el alcista vale 344,89 USD (+80,4 %) y el bajista 115,79 (−39,4 %), 2,04 veces. El bajista no es cosmético: deja los ingresos bajando un 1,5-2 % al año durante ocho años, lo que ya le pasa a Forrester (valor de contratos −6 % en 2025) [B7], y el margen en el 19-20 %. Pierde más de un 25 %, y por eso la convicción no llega a alta. El valor ponderado es de 230,78 USD (+20,7 %). Con la prima de riesgo que pide hoy el mercado, el bajista sube a 135,33 USD y el alcista a 410,68. El riesgo es binario en su causa (si la IA sustituye o no la investigación de pago), pero no en el tiempo: lo irá diciendo cada trimestre la retención de cartera.`;

export const valoracion_comentario = `Pesos: DCF 60 %, escenarios 25 %, comparables 15 % y transacciones y suma de partes 0 %. El DCF manda porque el negocio es fácil de proyectar en caja (flujo libre del 149 % del beneficio en 2016-2025, capex del 2 % de las ventas) y porque recoge lo que de verdad decide el valor, el crecimiento del valor de contratos. Los escenarios pesan un 25 % porque el riesgo de sustitución por la IA es el que decide la inversión. Los comparables (322,03 USD) pesan solo un 15 %: son empresas de datos con el doble de margen y sin la misma amenaza, y su crecimiento no explica sus múltiplos. Las transacciones (459,47 USD) no pesan: llevan prima de control y activos de más calidad. Todos los métodos quedan por encima del precio salvo el bajista; el más bajo, el escenario ponderado, da 230,78 USD (+20,7 %). Con la prima implícita del mercado, el valor objetivo sería de 298,15 USD.`;

export const catalizadores = {
  items: [
    { fecha: '3-nov-2026', evento: 'Resultados del 3T26', efecto: 'Valor de contratos (2 % en el 2T26) y retención de cartera de GTS (97 %): una tercera aceleración seguida confirmaría el caso base', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Principios de feb-2027', evento: 'Resultados del 4T26 y guía de 2027', efecto: 'Primera guía sin Digital Markets en la base; la de 2026 hundió la acción un 20,9 % el día de su publicación', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Oct-2026 a mar-2027', evento: 'Renovaciones del Gobierno federal de EE. UU. (año fiscal desde el 1-oct)', efecto: 'CV federal de unos 125 M; volvió a tener contratación neta positiva en el 2T26', probabilidad: 'Media', sentido: '+' },
    { fecha: '2S26-2027', evento: 'Recompras con la autorización ampliada en 500 M el 30-jul-2026', efecto: 'Unos 640 M disponibles a finales de julio: hasta un 5 % de las acciones al precio actual', probabilidad: 'Alta', sentido: '+' },
    { fecha: '2027', evento: 'Moción de desestimación en la demanda colectiva de valores (Connecticut)', efecto: 'Un acuerdo o la continuación del pleito tendrían coste limitado, pero mantienen el foco en la guía de 2025', probabilidad: 'Media', sentido: '−' },
    { fecha: 'Mayo-junio de 2027', evento: 'Junta de accionistas y posible plan de sucesión de Hall (69 años)', efecto: 'Un sucesor interno creíble reduciría el riesgo de persona clave', probabilidad: 'Baja', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Sustitución de la investigación de pago por la IA generativa', tipo: 'Tecnológico / negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−39 % (escenario bajista)', mitigante: 'Contenido propio, comparativas con datos de 13.000 clientes, AskGartner y acceso a analistas, que la IA no da', senal: 'Retención de cartera de GTS por debajo del 95 % o de clientes por debajo del 83 %' },
    { riesgo: 'El valor de contratos no se reacelera', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−8 % por cada punto menos de crecimiento anual (sensibilidad: 233,78 USD con −1 pp)', mitigante: 'Subidas de tarifa y venta a funciones fuera de TI (GBS)', senal: 'CV por debajo del +2 % en el 3T26 o el 4T26' },
    { riesgo: 'Recortes del sector público', tipo: 'Cliente', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 % (pérdida del CV federal restante, unos 125 M)', mitigante: 'El CV federal ya ha caído a la mitad y volvió a contratación neta positiva', senal: 'Nuevas rebajas de la guía de Insights por el sector público' },
    { riesgo: 'Margen: la plantilla comercial y de analistas vuelve a subir', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−9 % por cada 2 puntos de margen (230,00 USD)', mitigante: 'Guía de margen ajustado del 24,6 % llamada «nueva base»', senal: 'Margen EBITDA ajustado por debajo del 23,5 % en 2027' },
    { riesgo: 'Sucesión del primer ejecutivo', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5-10 % por múltiplo en una salida no planificada', mitigante: 'Contrato hasta 2031 y equipo estable (CFO desde 2014)', senal: 'Salidas de directivos clave (la del director jurídico, el 16-oct-2026)' },
    { riesgo: 'Recompras caras y apalancamiento', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−3 % (150 M más de deuda neta en recompras a precios altos)', mitigante: 'Deuda a tipo fijo hasta 2028-2035 y grado de inversión (BBB-/Baa3)', senal: 'Deuda bruta / EBITDA ajustado por encima de 2,5 veces' },
    { riesgo: 'Demanda colectiva de valores', tipo: 'Legal', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−1-2 % (acuerdo típico)', mitigante: 'Seguros de consejeros y directivos', senal: 'Rechazo de la moción de desestimación' },
    { riesgo: 'Divisa', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 % con un dólar un 5 % más fuerte (38 % de los ingresos fuera de EE. UU. y Canadá)', mitigante: 'Costes en las mismas divisas', senal: 'Rebajas de la guía de ingresos por divisa, como la de agosto de 2026' },
  ],
  premortem: `Octubre de 2029: la acción ha caído un 40 %, a unos 115 USD. La historia más probable empieza en las renovaciones de 2027: los grandes clientes de tecnología sustituyen parte de los asientos de Gartner por asistentes de IA entrenados con documentación pública y con informes de los propios proveedores, y la retención de cartera de GTS baja del 97 % al 92 %. El valor de contratos, que crecía un 2 % en 2026, cae un 3 % en 2027. La dirección recorta plantilla para defender el margen, pero la caída de ventas pesa más: el EBITDA contable baja al 19 % de las ventas. Mientras, Gartner sigue recomprando acciones con deuda a 180-200 USD y en julio de 2028 tiene que refinanciar 800 M al 6 %. El mercado deja de verla como una empresa de suscripción y la valora como a Forrester, por su caja y no por su crecimiento. Los indicadores que lo habrían anticipado: la retención de cartera de GTS por debajo del 100 % desde 2025, la plantilla comercial bajando (−4,5 % desde dic-2024), el valor de contratos de Forrester en caída y la posición corta en el 13 % [A3, B7, D5].`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'IA y renovaciones', pregunta: '¿Cuántos clientes que no renovaron en 2025-2026 citaron asistentes de IA como sustituto, y cómo evoluciona la retención de cartera de los clientes que usan AskGartner frente a los que no?', por_que: 'Es la diferencia entre el escenario base y el bajista (−39 %).' },
    { tema: 'Valor de contratos', pregunta: '¿Qué parte del +2 % del valor de contratos es precio y qué parte número de usuarios?', por_que: 'El puente de ingresos del DCF supone volumen negativo hasta 2027e; si todo es precio, el volumen cae más de lo que suponemos.' },
    { tema: 'Plantilla comercial', pregunta: '¿Por qué baja la plantilla comercial con cuota (de 5.102 a 4.874 personas) y cuándo volverá a crecer?', por_que: 'Históricamente el crecimiento del valor de contratos sigue a la contratación comercial con un año de retraso.' },
    { tema: 'Margen', pregunta: '¿El margen ajustado del 24,6 % es sostenible si el valor de contratos vuelve a crecer al 6-8 %, o habrá que volver a invertir en plantilla?', por_que: 'El DCF supone a la vez recuperación del crecimiento y margen estable.' },
    { tema: 'Recompras', pregunta: '¿Qué precio máximo o qué rentabilidad mínima exige el consejo a las recompras, y hasta qué apalancamiento las financiará con deuda?', por_que: 'Recompró a 453 USD de media en 2024 y a 283 USD en 2025, por encima del valor que estimamos.' },
    { tema: 'Sucesión', pregunta: '¿Hay un plan de sucesión de Hall (69 años) y quién lo supervisa, dado que es también presidente?', por_que: 'Lleva 22 años como primer ejecutivo y es la persona clave de la estrategia de ventas.' },
    { tema: 'Remuneración', pregunta: '¿Por qué los objetivos del variable de 2025 excluyeron el negocio federal y por qué ninguna métrica mide el ROIC, el TSR o el flujo libre?', por_que: 'El bonus se pagó al 119,6 % con unos ingresos por debajo del objetivo; el voto en contra subió al 12,6 %.' },
    { tema: 'Litigio', pregunta: '¿Qué exposición estima la empresa por la demanda colectiva de Connecticut y por qué no la cita en el 10-Q?', por_que: 'El periodo de clase cubre las declaraciones sobre la guía de 2025.' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];

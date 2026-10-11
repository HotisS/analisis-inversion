// Textos del analista (Deckers, corte 2026-10-11). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json.
let R = {};
try { R = await import('./resumen.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; }
export const resumen = R.resumen ?? null;

export const limitaciones = `Se valora la acción ordinaria de Deckers Outdoor Corporation en la Bolsa de Nueva York (DECK), en USD y con las cuentas en US GAAP; precio de cierre del viernes 9-oct-2026 (82,89 USD), porque el corte cae en domingo [D10]. El ejercicio cierra el 31 de marzo y se nombra por el año en que termina (FY2026 = abr-2025 a mar-2026) [A1]. Acciones: 136,71 M diluidas, las 136,41 M en circulación a 9-jul-2026 más 0,30 M de planes en acciones; la caja del puente (30-jun-2026) se ajusta con los 32,2 M recomprados del 1 al 9 de julio [D1]. Los arrendamientos operativos (375 M a marzo) no van a la deuda: su gasto ya está en el EBITDA (US GAAP). El LTM a jun-2026 es una estimación propia (FY2026 + 1T27 − 1T26) [A1, A2]. En FY2025 la empresa pasó de seis segmentos por canal a tres por marca y solo reexpresó FY2023-FY2025: para FY2020-FY2022 hay ventas por marca, pero no resultado [A8]. El EBITDA trimestral suma al resultado operativo la amortización derivada de los acumulados XBRL [A13]. El consenso de estimaciones es de una sola fuente gratuita completa (MarketScreener) y el BPA previo de cada trimestre, de MarketBeat [D5, A14]. Las conferencias se han leído en resúmenes de las transcripciones, no en el texto íntegro [A19, A20]. Varios comparables (On, adidas, Birkenstock, Asics, Amer Sports) aplican NIIF 16: su EBITDA es antes de alquileres y sus múltiplos no son del todo homogéneos con los de Deckers [D15-D22].`;

export const controles_explicados = [
  { control: 'Regresión múltiplo-crecimiento explicativa', explicacion: 'R² de 0,01: el crecimiento no explica los múltiplos de estos comparables (Nike cotiza a 15,6 veces con ventas a la baja porque su EBITDA está en mínimos). No se usa la regresión; el valor por comparables sale de las medianas.' },
  { control: 'Comparables estables al quitar una empresa', explicacion: 'La mediana del EV/EBITDA de los próximos 12 meses va de 7,6 a 9,7 veces según el comparable que se quite (Nike y Lululemon son los extremos). Por eso los comparables pesan solo un 20 % y se promedian con el PER.' },
];

const rentabilidad = {
  comentario: `**Deckers crea valor con muy poco capital.** El capital invertido de explotación (circulante, inmovilizado e intangibles, sin la caja) fue de 592 M en FY2026 para un beneficio operativo después de impuestos de 975 M: un ROIC del 160,3 %, frente a un WACC del 11,1 %. La cifra está inflada porque con US GAAP los 375 M de derechos de uso de las tiendas no entran en el capital [A1]; con ellos seguiría por encima del 90 %. El ROIC subió del 51,1 % de FY2019 al 160,3 % por margen (el EBIT pasó del 16,2 % al 23,1 % de las ventas), no por rotación, que se mantiene en torno a 1,5 veces el activo. El ROE (40,9 %) es menor porque el patrimonio incluye 1.907 M de caja que rinde un 3-4 %. Los rivales que más crecen ganan menos por dólar invertido: On un 32,3 %, Asics un 41,8 % y Crocs un 22,3 % [D24]. El crecimiento de Deckers no necesita capital: la prueba es el margen, no la reinversión.`,
  confianza: 'Media',
};

const calidad = {
  comentario: `Las cuentas son limpias y sencillas: sin deuda, sin compras desde hace más de diez años, sin ajustes al BPA (la empresa no publica cifras «ajustadas») y con un flujo operativo que supera al beneficio desde FY2024 (conversión del 107 % en FY2026) [A1]. KPMG firma sin salvedades las cuentas y el control interno; su única materia crítica es la provisión por devoluciones de los mayoristas (63,9 M de 80,1 M) [A1]. La remuneración en acciones es moderada: 44,8 M, el 4,4 % del beneficio [A1]. Los tres indicadores son buenos: Altman Z de 9,86 (zona segura), Piotroski F de 7 sobre 9 (falla en margen bruto, que cedió 20 puntos básicos por los aranceles, y en liquidez corriente) y Beneish M de −2,64, lejos del umbral de manipulación. Dos puntos de atención: KPMG lleva 34 años como auditor, y su ratificación tuvo un 9,4 % de votos en contra en 2026 [A21, C2]; y los unos 120 M de aranceles IEEPA pagados cuya devolución se reclama no están reconocidos, así que son un posible ingreso extraordinario de FY2027-FY2028 que no conviene sumar al beneficio recurrente [A2].`,
};

const capital = {
  comentario: `La dirección asigna el capital con disciplina en lo operativo y con mala fortuna en el precio de las recompras. En FY2017-FY2026 Deckers generó 5.173 M de flujo libre (109 % del beneficio), no hizo compras ni pagó dividendos y dedicó 3.333 M a recompras: las acciones diluidas bajaron de 172,2 M en FY2020 a 145,8 M en FY2026 [A1, A13]. HOKA, comprada en 2012 por una cifra pequeña, es hoy la mitad del grupo: la mejor compra del sector en la década [B3]. El problema es el precio: recompró 3,8 M de acciones a 149,21 USD en FY2025 y 10,5 M a 102,43 USD en FY2026 (1.075 M, el 105 % del beneficio), por encima de los 82,89 USD de hoy [A1]. Al precio actual, la autorización pendiente (4.711 M, el 42 % de la capitalización) rinde más: con un flujo libre del 9,9 % sobre la capitalización, recomprar es la mejor inversión disponible si la tesis es correcta. La caja ociosa (1.603 M a junio) es el único lastre: rinde menos que el WACC.`,
};

const consenso = {
  guidance: `El 23-jul-2026, con el 1T27, Deckers mantuvo la guía de ventas de FY2027 (5.860-5.910 M USD, +7-8 %) y subió el BPA diluido a 7,35-7,50 USD, el margen bruto a algo más del 56,5 % y el operativo a algo más del 21,5 %, con gastos generales en torno al 35 % de las ventas y un tipo del 23 % [D2]. La guía supone un arancel del 12,5 % concentrado en el 3T y el 4T, recompras por el 80 % del flujo libre y ninguna devolución de los aranceles IEEPA pagados [D2, A19]. En mayo de 2026 dio un marco para FY2028-FY2030: ventas con crecimiento de un dígito alto, HOKA de dos dígitos bajos, UGG de un dígito medio, margen operativo «en la zona baja del 20 %» y BPA creciendo a dos dígitos bajos [A5]. Ha batido su guía anual en FY2022-FY2026 [C16-C22].`,
};

const multiplos_historicos = {
  comentario: `Deckers cotiza en mínimos de diez años: 7,4 veces el EBITDA de los últimos 12 meses frente a una media de 10,7 veces (mínimo anterior: 8,6) y un PER de 11,8 veces frente a una media de 20,5 (mínimo: 14,0), un 42 % de descuento. No es que el beneficio haya caído (subió de 966 M en FY2025 a 1.024 M en FY2026) ni que haya cambiado el balance: lo que ha cambiado es el crecimiento esperado. Entre FY2021 y FY2025 las ventas crecieron un 15-24 % al año con HOKA al 20-30 % [A1]; ahora la guía da un 7-8 % y HOKA creció un 7,7 % en el 1T27 [D2]. El mercado ha pasado a valorar a Deckers como una marca madura de calzado, al nivel de Crocs (6,5 veces) [D19], y no como la de crecimiento que fue. El tipo a 10 años del 5,24 % también pesa sobre todos los múltiplos [D11].`,
  confianza: 'Alta',
};

const comparables = {
  criterio: `Ocho marcas cotizadas de calzado y ropa deportiva o de estilo de vida: las rivales de HOKA en running (On, Asics, Nike, adidas), las de UGG en calzado de confort (Birkenstock, Crocs) y dos marcas premium de ropa técnica (Lululemon, Amer Sports). Quedan fuera Skechers (no cotiza desde la compra de 3G Capital en 2025), Brooks y New Balance (no cotizan), y Puma y Wolverine por tamaño y márgenes muy inferiores [D5]. Todas las cifras son de MarketScreener a 9-oct-2026, con la misma definición de EBITDA para los últimos y los próximos 12 meses [D15-D22].`,
  comentario: `Deckers cotiza a 6,9 veces el EBITDA de los próximos 12 meses y 10,4 veces el beneficio, frente a medianas de 8,6 y 16,1 veces, con un margen EBITDA más alto (24,0 % frente a 19,8 %), caja neta y un crecimiento algo menor (8,1 % frente a 10,3 %). Solo Lululemon (4,5 veces, con ventas a la baja) y Crocs (6,5 veces, con deuda y HEYDUDE en caída) cotizan más baratas [D19, D21]. Las que crecen a doble dígito (On, Asics, Amer Sports) cotizan a 9,7-12,4 veces. La mediana del EV/EBITDA da 101,26 USD y la del PER 128,51; su media, 114,89 USD. La muestra es frágil (la mediana va de 7,6 a 9,7 veces según el comparable que se quite) y el crecimiento no explica los múltiplos: pesan un 20 %. El descuento de Deckers frente a On y Asics se justifica por el frenazo de HOKA; frente a la mediana, no, con un ROIC muy superior.`,
  confianza: 'Media',
};

const transacciones = {
  comentario: `Las marcas de calzado y ropa se han pagado a 11-17 veces el EBITDA (Champion 11,1; Sweaty Betty 16,0; Helly Hansen 16,8) y las de moda a 2,8-4,2 veces las ventas (Supreme, HEYDUDE) [D25, D28-D34]. La mediana de 16,0 veces daría 166,79 USD, el doble del precio, pero son marcas pequeñas compradas con prima de control. La referencia más útil es Skechers: 3G Capital pagó un 30 % de prima y la tasación de Greenhill usó 8-11 veces el EBITDA [D25, D26]. Deckers no tiene accionista de control (los consejeros y directivos tienen el 0,4 %) y su capitalización (11.332 M) está al alcance del capital privado, pero no hay indicios de una operación. Peso: 0 %; sirve como suelo de valor de las marcas, no como objetivo.`,
  confianza: 'Media',
};

const sentimiento = {
  lectura: `El sentimiento está dividido, sin euforia ni capitulación. Los particulares y la prensa de inversión minorista ven la acción barata tras caer un 49 % en 2025 y un 20 % en 2026, más que una parte de los analistas (13 comprar, 11 mantener y 3 vender), con una cobertura nueva en «infraponderar» en septiembre [E1, E4, E5, E7, D7]. La preocupación dominante coincide con los datos del informe: HOKA ha pasado de crecer un 15,9 % en FY2026 a un 7,7 % en el 1T27, con On y Asics creciendo al 20-30 %, y EE. UU. no crece (+0,2 %) [A1, D2]. Lo que los foros apenas recogen es la devolución de unos 120 M de aranceles IEEPA, el 1,1 % de la capitalización. La posición corta (8,7 % del flotante) y los resultados del 22 de octubre son el catalizador que todos esperan [D9]. No cambia la decisión: confirma que el precio ya recoge el miedo al frenazo de HOKA.`,
};

export const secciones = { rentabilidad, calidad, capital, consenso, multiplos_historicos, comparables, transacciones, sentimiento };

export const suma_partes = {
  aplica: false, descuento_holding_pct: 0, partes: [],
  comentario: `No se usa. HOKA y UGG publican resultado de segmento (911 M y 1.045 M en FY2026), pero 710 M de gastos corporativos no se asignan, y una suma de partes dependería de cómo se repartan [A1]. Además, las dos marcas comparten balance, canal mayorista y cadena de suministro; no hay razón para pensar que el mercado infravalora una de ellas por estar dentro del grupo.`,
  confianza: 'Media',
};

export const dcf_justificacion = {
  crecimiento: `FY2027e +7,5 %, el centro de la guía (5.860-5.910 M) y del consenso (5.881 M) [D2, D5]. FY2028e +7,0 % y FY2029e +6,5 %, algo por debajo del consenso (+7,3 % los dos) y del marco de la empresa («un dígito alto»), porque HOKA ha bajado del +15,9 % al +7,7 % en un trimestre [A1, A5, D5]. Después baja hasta el 3,5 % de FY2034e. La media (5,5 %) es menos de la mitad del 13,2 % anual de FY2017-FY2026 y está cerca del 5,2 % que se prevé para el calzado deportivo mundial [B15]. El crecimiento sale del exterior (+26,8 % en FY2026) y de HOKA; EE. UU. se queda casi plano [A1].`,
  margenes: `Margen EBITDA del 23,1 % en FY2027e, por debajo del 24,5 % de FY2026, porque los aranceles se pagan todo el año y la guía da un margen operativo «algo mejor que el 21,5 %» [D2]. Se queda en el 23,0-23,2 % hasta FY2034e, en línea con el consenso (23,2 %) y con la zona baja del 20 % de margen operativo del marco FY2028-FY2030 [D5, A5]. Es el margen de una marca premium: el bruto (57,7 %) supera en 15 puntos al de Nike y en 6 al de adidas [B6, B11]. No damos ninguna recuperación por la devolución de aranceles.`,
  inversion: `Capex del 2,5 % de las ventas en FY2027e (guía de 145-155 M, que incluye la implantación de sistemas en la nube) que baja al 2,0 %, por encima del 1,5-2,1 % de FY2024-FY2026 [A1, D5]. La amortización pasa del 1,4 % al 1,9 % de las ventas, por debajo del capex en todos los años. Circulante del 8,0 % de las ventas, entre el 7,7 % de FY2026 y el 8,2 % de FY2025, medido a 31 de marzo (en junio es mayor por la campaña de UGG) [A1, A2]. Tipo impositivo del 23 %, el de la guía [D2]. Los alquileres de las tiendas ya están en el EBITDA (US GAAP).`,
  wacc: `Tasa libre del 5,24 %, el Tesoro de EE. UU. a 10 años del 9-oct-2026 [D11]. Beta de 1,07, la ajustada (Blume) mensual a 5 años frente al S&P 500; la de Damodaran para calzado, corregida por caja, es 1,00 [D10, D14]. Prima de mercado del 5,5 % y ninguna prima adicional: Deckers no tiene deuda, ni accionista de control, ni riesgo país relevante. Sin deuda, el WACC es el coste de los fondos propios: 11,13 %. Con la prima implícita del mercado (4,20 %), el 9,73 % [D13].`,
  terminal: `Crecimiento a perpetuidad del 3,0 %: unos 2,5 puntos de inflación del dólar y algo de crecimiento real, por debajo de la tasa libre menos medio punto (4,74 %). El múltiplo de salida implícito es de 8,8 veces el EBITDA, por encima de los 6,9 de hoy y en línea con la mediana de los comparables (8,6 veces) y con el mínimo de diez años de la propia Deckers (8,6). El valor terminal es el 57 % del valor.`,
};

export const etapa2_justificacion = `No se usa. El ROIC supera de largo al WACC, pero el crecimiento de HOKA ya se ha frenado y el mercado de calzado deportivo crece en torno al 5 % [B15]: no hay base para alargar un crecimiento alto más allá de FY2034e.`;

export const dcf_lectura = `El DCF da 109,57 USD por acción, un 32,2 % por encima del precio de 82,89 USD, con un 57 % del valor en el terminal y 1.570 M de caja neta (11,5 USD por acción). **El precio descuenta una Deckers que no vuelve a crecer.** El DCF inverso dice que, con nuestros márgenes, los 82,89 USD suponen unas ventas planas (−0,1 % anual) en FY2027e-FY2034e, frente al 5,5 % de nuestro caso base, al 7-8 % de la guía de este año y al 5,2 % previsto para el mercado; o, con nuestro crecimiento, un margen EBITDA del 17,4 % en vez del 23,0 %, el de FY2020-FY2022, antes del despegue de HOKA. Comprar a este precio rinde un 14,2 % anual si se cumple el caso base, frente al WACC del 11,1 % y al 9,7 % que hoy pide el mercado. El supuesto que más pesa es el margen: con dos puntos menos y dos menos de crecimiento, el valor sería de 90,50 USD, todavía un 9 % por encima del precio.`;

export const narrativas = {
  Bajista: `HOKA sigue el camino de HEYDUDE en Crocs o de Nike en FY2025: On y Asics le quitan el corredor y la venta mayorista se para. UGG vuelve a su ciclo de moda, como en FY2017, cuando el margen EBITDA del grupo sin deterioros fue del 9,4 % [A12, A13]. Las ventas se quedan planas siete años y el margen EBITDA baja al 19 %.`,
  Base: `HOKA crece a un dígito alto con el exterior y la venta directa, UGG a un dígito medio y EE. UU. casi plano. Los aranceles quedan en el 10-15 % y el margen EBITDA se mantiene en el 23 %. Ventas de 8.393 M en FY2034e.`,
  Alcista: `HOKA vuelve a crecer a doble dígito fuera de EE. UU. y gana cuota a Nike en running; UGG consolida las categorías fuera del invierno. Se cobran los aranceles IEEPA y el margen EBITDA recupera el 24 % de FY2026.`,
};

export const escenarios_comentario = `La asimetría es favorable: el alcista vale 126,83 USD (+53,0 %) y el bajista 67,53 (−18,5 %), 2,86 veces. El bajista no es cosmético: deja las ventas planas siete años y el margen EBITDA en el 19 %, lo que ya le pasó a Deckers con UGG antes de FY2018 y a Crocs con HEYDUDE. La pérdida es limitada porque el precio ya descuenta casi eso y la caja neta pone 11,5 USD por acción de suelo. Un bajista peor, con el margen de FY2017, llevaría la acción a unos 55-60 USD por múltiplos (Lululemon cotiza a 4,5 veces el EBITDA). El valor ponderado es de 102,51 USD (+23,7 %). Con la prima de riesgo que pide hoy el mercado, el bajista sube a 77,56 USD y el alcista a 151,15.`;

export const valoracion_comentario = `Pesos: DCF 55 %, escenarios 25 %, comparables 20 % y transacciones y suma de partes 0 %. El DCF manda porque el negocio es sencillo de proyectar: sin deuda, sin compras y con una caja que convierte más del 100 % del beneficio [A1]. Los escenarios pesan un 25 % porque el riesgo de marca (HOKA y UGG) es el que decide la inversión. Los comparables (114,89 USD) pesan un 20 % porque la muestra es frágil y el crecimiento no explica sus múltiplos. Las transacciones (166,79 USD) no pesan: son marcas pequeñas con prima de control y Deckers no está en venta. Todos los métodos quedan por encima del precio: el más bajo, la mediana del EV/EBITDA de los próximos 12 meses, da 101,26 USD. El valor objetivo es de 108,87 USD (+31,3 %); con la prima implícita del mercado, 124,61 USD. La caja del puente es la de junio, estacionalmente baja (1.603 M frente a 1.907 M en marzo).`;

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 4.0, precio_pct: 3.5, otros_pct: 0.0, comentario: `Guía de +7-8 % [D2]. Precio: subidas por aranceles ya aplicadas en FY2026 (ingreso medio por par +3,4 %) [B1]. Volumen: unidades +6,2 % en FY2026; HOKA +7,7 % y venta directa +13 % en el 1T27 [A1, D2].` },
    { periodo: 'FY2028e', volumen_pct: 5.0, precio_pct: 2.0, otros_pct: 0.0, comentario: `Marco FY2028-FY2030: un dígito alto [A5]. Volumen por el exterior (+26,8 % en FY2026) y 20-25 tiendas HOKA al año [A1, A20]; precio a la inflación.` },
    { periodo: 'FY2029e', volumen_pct: 4.5, precio_pct: 2.0, otros_pct: 0.0, comentario: `Por debajo del consenso (+7,3 %) [D5]: menos tirón de HOKA en EE. UU.` },
    { periodo: 'FY2030e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0.0, comentario: `En línea con el 5,2 % previsto para el calzado deportivo mundial [B15].` },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: `Sí. El 5,5 % anual del caso base no necesita capital (la reinversión neta es el 5 % del beneficio operativo después de impuestos) y queda muy por debajo de lo demostrado: un 13,2 % anual en FY2017-FY2026, sin compras, y un 9,8 % en FY2026 con aranceles [A1]. El poder de precios está probado: el margen bruto pasó del 51,5 % de FY2019 al 57,7 % y solo cedió 20 puntos básicos con los aranceles, que se trasladaron con precio [A1, B1]. Las dos marcas tienen recorrido fuera de EE. UU., que ya es el 41,7 % de las ventas y crece al 27 %. El riesgo no es la capacidad sino la marca: si HOKA pierde el favor del corredor, es el escenario bajista. No se calcula cuota implícita porque la cuota publicada es solo la de HOKA en running.`,
};

export const catalizadores = {
  items: [
    { fecha: '22-oct-2026 (estimada)', evento: 'Resultados del 2T27 (jul-sep 2026) y revisión de la guía de FY2027', efecto: 'Crecimiento de HOKA (consenso implícito +doble dígito bajo) y efecto del arancel del 12,5 % en el margen; cada trimestre con HOKA por debajo del 8 % pesa en el precio', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Finales de enero de 2027', evento: 'Resultados del 3T27 (oct-dic 2026), el trimestre de Navidad (35,8 % de las ventas del grupo en FY2026) [A6]', efecto: 'Prueba de la demanda de UGG y de la elasticidad al precio con aranceles', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Devolución de los aranceles IEEPA pagados (≈ 120 M brutos) por el proceso CAPE de la CBP', efecto: '≈ 0,9 USD por acción de caja no incluida en la guía ni en nuestro valor', probabilidad: 'Media', sentido: '+' },
    { fecha: 'Mayo de 2027', evento: 'Resultados de FY2027 y guía de FY2028; confirmación del marco FY2028-FY2030', efecto: 'Un marco mantenido de crecimiento de un dígito alto contradice el crecimiento nulo que descuenta el precio', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Investigaciones de la sección 301 de la USTR para sustituir los aranceles anulados', efecto: 'Un arancel mayor que el 12,5 % supuesto en la guía restaría margen', probabilidad: 'Media', sentido: '−' },
    { fecha: 'Continuo', evento: 'Recompras con la autorización pendiente de 4.711 M (el 42 % de la capitalización) y el 80 % del flujo libre', efecto: 'Al precio actual, cada 1.000 M recompran un 9 % del capital', probabilidad: 'Alta', sentido: '+' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Frenazo estructural de HOKA frente a On, Asics y Nike en running', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−18 % (escenario bajista: 67,53 USD)', mitigante: 'Exterior +26,8 % y venta directa +13 % en el 1T27; HOKA aún es pequeña fuera de EE. UU. [A1, D2]', senal: 'HOKA por debajo del +5 % dos trimestres seguidos o caída de la cartera mayorista' },
    { riesgo: 'UGG vuelve a su ciclo de moda (como en FY2017)', tipo: 'Marca', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 % a −20 % (2 puntos menos de margen y de crecimiento: 90,50 USD)', mitigante: 'Diversificación en hombre, sandalias y zapatillas; UGG ya es solo el 50 % de las ventas del grupo [A1, A19]', senal: 'Ventas de UGG en el 3T27 por debajo del año anterior o más promociones' },
    { riesgo: 'Aranceles de EE. UU. sobre Vietnam e Indonesia más altos o permanentes', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−4 % por cada punto de margen EBITDA (104,77 USD con −1 punto)', mitigante: 'Precio y reparto de costes con los fabricantes: el margen bruto solo cedió 20 pb en FY2026 [A1]', senal: 'Resolución de la sección 301 con tipos por encima del 15 %' },
    { riesgo: 'Consumo débil en EE. UU. y presión de los grandes mayoristas', tipo: 'Ciclo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % (un punto menos de crecimiento: 104,13 USD)', mitigante: 'El 41,7 % de las ventas ya es exterior y el 41,4 % es venta directa [A1]', senal: 'Ventas en EE. UU. negativas o un cliente por encima del 20 % de las cuentas a cobrar (18,5 % hoy) [A1]' },
    { riesgo: 'Recompras a precios altos que destruyen valor', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Ya pagó 1.075 M a 102,43 USD en FY2026, un 24 % por encima del precio actual [A1]', mitigante: 'Al precio actual la recompra rinde un 9,9 % de flujo libre', senal: 'Recompras por encima del valor objetivo o con deuda' },
    { riesgo: 'Litigios de consumidores por las subidas de precio ligadas a los aranceles', tipo: 'Legal', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'No cuantificable; la empresa no ha provisionado nada [A2]', mitigante: 'La empresa dice que se defenderá', senal: 'Certificación de las demandas colectivas' },
    { riesgo: 'Divisa y consumo en Europa', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 % a −3 %', mitigante: 'Precio en moneda local y crecimiento del exterior', senal: 'Ventas internacionales por debajo del +10 %' },
  ],
  premortem: `Octubre de 2029: la acción ha caído un 40 %, a unos 50 USD. La historia más probable empieza en el 3T27: HOKA crece solo un 3 % en Navidad y la dirección rebaja la guía. Los corredores, que llevaron a HOKA de 223 M a 2.587 M de ventas en siete años, se pasan a On y Asics, que lanzan zapatillas de amortiguación máxima más baratas, y Nike recupera las tiendas especializadas. En FY2028 HOKA cae un 5 % en EE. UU. y la empresa tiene que dar descuentos para limpiar inventario. Al mismo tiempo, el ciclo de UGG se gira tras cinco años de crecimiento, como en FY2017, y el margen EBITDA baja del 24 % al 17 %. Deckers sigue recomprando acciones a 70-80 USD con la caja y se queda sin colchón. El mercado deja de verla como una marca de crecimiento y la valora como a Lululemon, a 4,5 veces el EBITDA. Los indicadores que lo habrían anticipado: el paso de HOKA del +15,9 % al +7,7 % en el 1T27, la caída de las ventas comparables de la venta directa en el 1T26 y el 2T26, y la subida de la posición corta al 8,7 % [A1, A14, D9].`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'HOKA', pregunta: '¿Cuánto creció HOKA en EE. UU. y en el exterior en el 1T27, y cómo evoluciona la cartera de pedidos mayoristas de primavera de 2027?', por_que: 'El crecimiento de HOKA (+7,7 % en el 1T27 frente a +15,9 % en FY2026) decide si el precio, que descuenta ventas planas, se equivoca [A1, D2].' },
    { tema: 'Aranceles', pregunta: '¿Qué importe neto de los ≈ 120 M de aranceles IEEPA espera cobrar, cuándo y cuánto tendrá que compartir con proveedores y clientes?', por_que: 'Son ≈ 0,9 USD por acción fuera de la guía y hay dos demandas de consumidores sobre ese dinero [A2].' },
    { tema: 'Margen', pregunta: '¿Qué parte del arancel del 12,5 % se trasladará a precio en la campaña de Navidad y con qué efecto en volumen?', por_que: 'Un punto de margen EBITDA vale unos 5 USD por acción en nuestro DCF.' },
    { tema: 'UGG', pregunta: '¿Qué peso tienen ya las categorías fuera del invierno (hombre, sandalias, zapatillas) en las ventas de UGG?', por_que: 'Es la defensa frente a un ciclo de moda como el que dejó el margen EBITDA en el 9,4 % en FY2017.' },
    { tema: 'Recompras', pregunta: '¿Por qué mantener 1.600-1.900 M de caja si la autorización pendiente es de 4.711 M y la acción rinde un 9,9 % de flujo libre?', por_que: 'La caja ociosa rinde por debajo del WACC; recomprar al precio actual crea más valor que en FY2025-FY2026.' },
    { tema: 'Canal', pregunta: '¿Qué cliente concentra el 18,5 % de las cuentas a cobrar y cuánto pesa en las ventas de HOKA?', por_que: 'La concentración subió desde el 13,6 % en un año [A1].' },
    { tema: 'Gobierno', pregunta: '¿Por qué el variable a largo plazo no mide rentabilidad (ROIC o flujo libre) y por qué votó en contra de KPMG un 9,4 % del capital?', por_que: 'La remuneración premia crecimiento y beneficio por acción, que las recompras inflan [C1, C2].' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];
export const parches = [];

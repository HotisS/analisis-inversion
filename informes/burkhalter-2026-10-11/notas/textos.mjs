// Textos del analista (Burkhalter, corte 2026-10-11). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json; [P1] = propia.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const aqui = path.dirname(fileURLToPath(import.meta.url));
const A = JSON.parse(fs.readFileSync(path.join(aqui, 'A.json'), 'utf8'));
const D = JSON.parse(fs.readFileSync(path.join(aqui, 'D.json'), 'utf8'));

let R = {};
try { R = await import('./resumen.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; }
export const resumen = R.resumen ?? null;

export const limitaciones = `Burkhalter presenta sus cuentas en Swiss GAAP FER, no en NIIF [A1]. Dos diferencias pesan en el análisis: el fondo de comercio de las compras se compensa contra el patrimonio el día de la compra (435,2 M acumulados a fin de 2025), lo que deja el patrimonio en 139,4 M e infla el ROIC y el ROE; y no hay NIIF 16, así que los alquileres (32,0 M en 2025) están dentro del EBITDA y los compromisos de arrendamiento (155,3 M) no son deuda [A1]. Por eso el EV/EBITDA de Burkhalter no es comparable directamente con el de competidores en NIIF 16 y el informe se apoya más en el PER. La cuenta es por naturaleza. Las cuentas completas cubren 2020-2025; 2020-2021 son solo el negocio eléctrico, antes de la fusión con poenina (efectiva desde el 1-ene-2022) [A3, A5]. La empresa publica semestres, no trimestres, y un solo segmento, sin ventas por oficio [A1, A6]. Precio de cierre del viernes 9-oct-2026 (124,60 CHF), porque el corte cae en domingo [D1]. Las operaciones de directivos de la SIX son anónimas y en Suiza no hay registro público de posiciones cortas [C12].`;

export const controles_explicados = [
  { control: 'Comparables estables al quitar una empresa', explicacion: 'Seis comparables con bases contables distintas (NIIF 16 y US GAAP frente a Swiss GAAP FER sin arrendamientos): la mediana del EV/EBITDA es frágil y la valoración por comparables solo pesa un 20 %, con el PER como referencia principal.' },
  { control: 'Múltiplos LTM y NTM de cada comparable coherentes', explicacion: 'Instalco: misma fuente (MarketScreener) para los dos múltiplos; el consenso espera un EBITDA muy superior al de 2025 con un crecimiento de ventas del 11 % que incluye compras. No se ha verificado la causa y no mueve la mediana de forma relevante.' },
];

const negocio = { kpis: A.negocio.kpis };

const rentabilidad = {
  comentario: `**El ROIC publicado (55,8 % en 2025) no mide la rentabilidad del capital que han puesto los accionistas.** Burkhalter compensa el fondo de comercio contra el patrimonio, así que su capital invertido no incluye los 435,2 M pagados de más en las compras, poenina incluida [A1]. Con ese fondo de comercio a coste, el capital invertido sube a unos 545 M y el ROIC después de impuestos baja a cerca del 11 % (estimación propia: 61,6 M de beneficio operativo después de impuestos de 2025 sobre ≈ 110 M de capital operativo más 435,2 M de fondo de comercio bruto) [A1]. Sigue por encima del WACC del 6,4 %, pero la creación de valor es mucho más modesta de lo que dicen el ROIC del 55,8 % y el ROIC incremental del 68,1 %. Lo que mueve el ROIC es la rotación: el negocio apenas necesita activo fijo (capex del 0,8 % de las ventas) y el circulante, con anticipos de clientes, ronda el 11 % de las ventas. El margen EBIT (6,1 % en 2025) es similar al de Bravida (5,9 %) y menor que el de SPIE (7,6 %) [B12, B13].`,
  confianza: 'Media',
};

const capital = {
  comentario: `La dirección asigna el capital de forma sencilla: reparte el 90 % del beneficio y compra con el resto. En 2020-2025 generó 315 M de flujo libre; 203 M fueron a dividendos y 73 M a compras en caja, y la gran operación, poenina, se pagó con 4,23 M de acciones nuevas (317,1 M) [A1, A4]. El resultado de poenina es aceptable pero no brillante: el BPA pasó de 3,99 CHF en 2021 a 5,78 CHF en 2025 (+45 %) con un 77 % más de acciones, y el margen EBIT del grupo solo subió del 5,4 % al 6,1 % [A1, A5]. Con un PER de unas 21 veces, emitir acciones para comprar empresas pequeñas a múltiplos que no se publican no crea valor evidente. La mitad del dividendo sale de reservas de aportaciones de capital, exentas de la retención suiza del 35 %, y la empresa dice que le quedan para unos tres años [A9]: después, el dividendo neto para el inversor suizo será menor. No hay recompras.`,
};

const bolsa = {
  comentario: `La acción multiplicó su precio por más de dos entre 2021 y el máximo de 192,40 CHF del 22-abr-2026: subió un 60,2 % en 2025, cuando la fusión con poenina ya se veía en el BPA y el mercado buscó valores suizos defensivos [D1]. Desde abril ha caído un 36,1 %, hasta el mínimo de 116,60 CHF del 15-sep-2026, y en el año pierde un 8,5 % frente al +7,1 % del SPI [D1]. La mayor caída diaria, −8,4 % el 8-sep-2026, llegó con el semestre: ventas planas pese a cinco compras [A6, D1]. A cinco años rinde un 18,5 % anual frente al 6,5 % del SPI; a diez años, solo un 4,5 % frente al 9,4 %, porque en 2017-2020 el negocio eléctrico perdió la mitad del margen y la acción, un 52 % [A5, D1]. Beta de 0,58 frente al SPI y volatilidad del 23 %. Liquidez baja: unos 2,7 M CHF al día [D1]. En Suiza no hay registro público de posiciones cortas [C12].`,
};

const multiplos_historicos = {
  comentario: `Burkhalter cotiza a 15,7 veces el EBITDA y a 20,9 veces el beneficio de los últimos 12 meses, con una prima del 22 % y del 17 % sobre sus medias de los seis cierres de 2020-2025 (12,9 y 17,8 veces), en el percentil 67 [D1]. La subida del múltiplo se explica por tres cambios: la fusión con poenina, que dio un grupo más grande y diversificado; unos tipos suizos muy bajos (el bono a 10 años rinde el 0,59 %) [D19], y el atractivo de un dividendo del 4 % en francos. Tras la caída desde abril, el múltiplo ya no está en máximos (en el cierre de 2025, 24,3 veces el beneficio) [D1], pero tampoco en la zona de 2021-2022 (15,8-16,2 veces), cuando el crecimiento orgánico era parecido al actual.`,
  confianza: 'Media',
};

const comparables = {
  empresas: D.comparables.empresas.filter((e) => !/Comfort/i.test(e.nombre)),
  criterio: `Seis instaladores y prestadores de servicios técnicos de edificios cotizados: los nórdicos Bravida e Instalco, con el mismo modelo de red de filiales locales y compras pequeñas; SPIE, que también compra en Suiza; EMCOR, el mayor de EE. UU.; Implenia, constructora suiza del mismo mercado final, y Bilfinger, servicios técnicos industriales [D8-D11, D13, D14]. Comfort Systems USA sale de la mediana: crece un 31 % anual por los centros de datos y cotiza a 21,4 veces el EBITDA de los próximos 12 meses [D12]. Ninguno es un comparable puro: ningún otro instalador cotizado vende solo en Suiza.`,
  comentario: `Burkhalter cotiza a 14,2 veces el EBITDA de los próximos 12 meses y 19,1 veces el beneficio, frente a medianas de 8,0 y 16,1 veces de sus comparables, con menos crecimiento esperado (3,8 % frente a 7,8 %) y un margen EBITDA menor (6,9 % frente a 8,6 %) [D8-D14]. Parte de la prima es contable: los comparables en NIIF 16 sacan el alquiler del EBITDA y Burkhalter no, lo que eleva su EV/EBITDA; por eso el PER es la referencia más limpia. Otra parte es la divisa: el bono suizo rinde el 0,59 %, unos tres puntos menos que el Bund, y un franco a ese tipo justifica múltiplos más altos [D19]. Aun así, a la mediana del PER valdría 105,24 CHF y a la del EV/EBITDA, 70,33 CHF. La regresión múltiplo-crecimiento (R² de 0,79) daría 49,28 CHF, pero mezcla crecimiento comprado y crecimiento de centros de datos: no se usa. Pesan un 20 %.`,
  confianza: 'Media',
};

const transacciones = {
  comentario: `No hay transacciones con múltiplo publicado que sirvan: la compra de Equans por Bouygues (7.100 M EUR) se publicó sobre el resultado operativo de 2026 con sinergias, la de Caverion por Triton solo con la prima (86,6 %) y la fusión con poenina fue un canje de acciones sin prima de control [D16-D18]. La única referencia con múltiplo, la salida a bolsa de Caverion en 2013 (9,9 veces el EBITDA), es antigua y no lleva control [D16]. Las transacciones no pesan en el valor objetivo. Burkhalter es opable en teoría (sin accionista de control, una acción un voto y sin cláusulas de cambio de control), pero el mayor accionista, la familia Grogg con el 14,2 %, no ha dado señales de vender [C1, C11].`,
  confianza: 'Baja',
};

export const secciones = { negocio, rentabilidad, capital, bolsa, multiplos_historicos, comparables, transacciones };

export const suma_partes = {
  aplica: false, descuento_holding_pct: 0, partes: [],
  comentario: `No se usa. Burkhalter publica un solo segmento y no separa las ventas de electricidad (unas 50 sociedades) y de climatización y fontanería (unas 33) [A1, B1]. Sin cifras por negocio, una suma de partes sería inventada.`,
  confianza: 'Media',
};

export const dcf_justificacion = {
  crecimiento: `2026e +0,8 % (año fijo): el semestre cerró con ventas planas (+0,1 %) pese a cinco compras, y las seis compras de 2026 aportan unos 20 M de ventas anuales, menos del 2 % [A6]. El consenso espera incluso una caída (1.192 M) [D5]. 2027e-2028e +2,5 %: orgánico, sin compras, con un punto de volumen (renovación energética, bombas de calor y fotovoltaica) y uno y medio de precio; la previsión del KOF para la inversión en construcción es de +1,9 % en 2026 y +1,5 % en 2027 [B3]. Luego baja hasta el 1,0 % de 2032e. El consenso (+8,1 % en 2027e) incluye compras [D5]. No proyectamos compras porque exigirían proyectar también su precio.`,
  margenes: `Margen EBITDA del 7,2 % en 2026e, coherente con un primer semestre del 6,0 % (5,8 % un año antes) y un segundo semestre que en 2024-2025 dio el 7,6-7,9 % [A6, A1]. Sube al 7,4 % en 2028e y se queda ahí. Es el máximo de la serie (6,9 % en 2025) más medio punto, por debajo del consenso (7,6 % en 2028e) [D5]. El margen no tiene recorrido largo: los contratos se licitan, suele ganar el precio más bajo y el personal es el 43,5 % de los ingresos operativos [B1].`,
  inversion: `Capex del 0,9 % de las ventas y amortización del 0,8 %, los de 2025 (0,8 % y 0,8 %) y por debajo del 1,2 % de 2023-2024 [A1]. Sin NIIF 16, el alquiler ya está en el EBITDA y no hace falta sumarlo al capex. Circulante comercial con obra en curso y anticipos del 11 % de las ventas, el de 2025 (10,9 %), por debajo del 14-18 % de 2022-2024: ojo, en el 1S26 la obra pendiente de facturar subió hasta 183,9 M [A6]. Tipo impositivo del 16,5 % (16,4 % en 2025) [A1].`,
  wacc: `Tasa libre del 0,59 %, el bono de la Confederación a 10 años del 30-sep-2026 [D19]. Beta de 0,90: entre la ajustada de la acción frente al SPI (0,72 mensual y 0,79 semanal a cinco años) y la sectorial desapalancada de Damodaran (1,09-1,14), porque el SPI es un índice defensivo y la poca liquidez rebaja la beta medida [D1, D21]. Prima de mercado del 5,5 % y prima adicional de un punto por tamaño (1.328 M CHF) y liquidez (2,7 M CHF diarios). Deuda del 3 % a un 2,0 % (hipotecas al 0,8-2,21 %) [A1]. Coste del capital del 6,54 % y WACC del 6,39 %; con la prima implícita del mercado (4,20 %), el 5,26 % [D20].`,
  terminal: `Crecimiento a perpetuidad del 1,0 %: la inflación esperada del franco, sin crecimiento real, porque el mercado de construcción suizo lleva siete años plano en términos nominales (66.672 M CHF en 2017 y 67.376 M en 2024) [B7]. Con el bono al 0,59 %, un terminal del 2 % sería incoherente. El múltiplo de salida implícito es de 13,4 veces el EBITDA, por debajo del actual (15,7 veces) y por encima de la mediana de los comparables (8,0 veces), que cotizan con tipos más altos.`,
};

export const etapa2_justificacion = `No se usa. El mercado de instalaciones suizo crece en línea con la construcción (≈ 1 % anual) y el ROIC corregido por el fondo de comercio (≈ 11 %) no supera al WACC en más de cinco puntos [B7].`;

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.2, precio_pct: 1.0, otros_pct: 1.0, comentario: 'Semestre plano (+0,1 %) con cinco compras; las seis compras del año suman ≈ 20 M de ventas anuales, ≈ 1 % del año; el orgánico es negativo (estimación propia) [A6].' },
    { periodo: '2027e', volumen_pct: 1.0, precio_pct: 1.5, otros_pct: 0.0, comentario: 'Inversión en construcción +1,5 % (KOF) y renovación energética; sin compras [B3].' },
    { periodo: '2028e', volumen_pct: 1.0, precio_pct: 1.5, otros_pct: 0.0, comentario: 'Último año de las deducciones fiscales por reformas antes de la supresión del valor locativo (no antes de 2028) [B1].' },
    { periodo: '2029e', volumen_pct: 0.8, precio_pct: 1.2, otros_pct: 0.0, comentario: 'Electrificación (bombas de calor, fotovoltaica, cargadores) y Gebäudeprogramm [B10].' },
    { periodo: '2030e', volumen_pct: 0.8, precio_pct: 1.2, otros_pct: 0.0, comentario: 'Converge hacia la inflación del franco más un volumen pequeño.' },
  ],
  mercado_final: { periodo: '2032e', tamano: 22500 },
  veredicto: 'Sí',
  justificacion: `Sí. El crecimiento que proyectamos es modesto (1,9 % anual en 2027e-2032e), apenas necesita capital (reinversión del 5 % del beneficio operativo después de impuestos) y deja la cuota en torno al 6 % de un mercado de instalaciones de unos 20.300 M CHF que suponemos crece un 1,5 % anual hasta 22.500 M en 2032e (estimación propia) [B1, B8, B9]. No pide ganar cuota ni poder de precios por encima de la inflación de salarios. El matiz: el orgánico de 2026 es negativo y Burkhalter no ha demostrado poder de precios (margen EBIT del 5,4-6,1 % en 2021-2025); su crecimiento de los últimos años ha sido comprado [A1]. El foso es estrecho.`,
};

export const dcf_lectura = `El DCF da 119,25 CHF por acción, un 4,3 % por debajo del precio de 124,60 CHF, con un 73 % del valor en el terminal y un múltiplo de salida implícito de 13,4 veces el EBITDA. **El precio descuenta más crecimiento del que el negocio ha dado sin compras.** El DCF inverso dice que los 124,60 CHF suponen un crecimiento de las ventas del 3,3 % anual en 2027e-2032e con nuestros márgenes, frente al 1,9 % de nuestro caso base; o, con nuestro crecimiento, un margen EBITDA del 7,7 % para siempre, por encima del máximo de la serie (6,9 % en 2025). Comprar a este precio rinde un 6,2 % anual si se cumple el caso base, casi igual que el WACC del 6,4 % y por encima del 5,3 % que pide hoy el mercado. No es una valoración exigente en términos absolutos: es la de un bono en francos con un dividendo del 4,2 %. El valor es muy sensible a la tasa: con el WACC y el crecimiento terminal medio punto más favorables, 143,07 CHF; medio punto peor, 102,84 CHF.`;

export const narrativas = {
  Bajista: 'La construcción suiza se frena (como en 2017-2020, cuando el margen EBIT del negocio eléctrico bajó del 7,4 % al 3,8 %) y el fin de las deducciones por reformas desde 2028 corta la renovación: ventas −6 % en 2027 y −3 % en 2028, margen EBITDA 1,5 puntos menor esos dos años y un punto menos para siempre por licitaciones y salarios; medio punto más de WACC [A5, B1].',
  Base: 'Orgánico del 2,0-2,5 % en 2027-2028 que converge al 1 %, margen EBITDA del 7,4 % y sin compras; el dividendo sigue en el 90 % del beneficio.',
  Alcista: 'La electrificación de los edificios y el Gebäudeprogramm llevan el orgánico al 4-4,5 % y el margen al 8,1 %, el nivel de los segundos semestres de 2024-2025; ventas un 4 % anual de media.',
};

export const escenarios_comentario = `La asimetría es desfavorable: el alcista vale 141,36 CHF (+13,5 %) y el bajista 78,28 CHF (−37,2 %), 0,36 veces. El bajista no es cosmético: Burkhalter ya vivió una caída así en 2017-2020, cuando con ventas planas el EBIT del negocio eléctrico pasó de 37,9 M a 18,7 M y la acción perdió la mitad [A5, D1]. Pierde tanto porque con un WACC del 6,4 % y un crecimiento terminal del 1 % cada punto de margen permanente vale mucho. El valor ponderado es de 114,54 CHF (−8,1 %). Con la prima de riesgo que hoy pide el mercado (4,20 %) el bajista sube a 95,62 CHF y el alcista a 179,38 CHF: la asimetría pasa a 1,89 veces. La conclusión depende de la tasa de descuento más que de las cifras.`;

export const valoracion_comentario = `Pesos: DCF 55 %, escenarios 25 % y comparables 20 %; transacciones, cero. El DCF manda porque la caja de Burkhalter es predecible (conversión del 127 % del beneficio en flujo libre en 2020-2025, ayudada por el cobro de clientes) y el negocio apenas necesita capital. Los escenarios pesan un 25 % porque el riesgo de margen es real y tiene precedente. Los comparables pesan solo un 20 % porque mezclan normas contables y divisas con tipos de interés mucho más altos; dan 87,79 CHF. No hay transacciones con múltiplo utilizable. Todos los métodos quedan por debajo del precio: el DCF un 4,3 %, los escenarios un 8,1 % y los comparables un 29,5 %. El valor objetivo, 111,78 CHF, queda por debajo del precio objetivo medio de los analistas (148,18 CHF) y de su mínimo (135 CHF) [D6]. Con la prima implícita del mercado, el valor objetivo sería de 136,60 CHF.`;

export const catalizadores = {
  items: [
    { fecha: 'Oct-dic de 2026', evento: 'Compras anunciadas por ad hoc (Plasco AG el 1-oct-2026) y previsión de invierno del KOF para la construcción', efecto: 'Más compras pequeñas sostienen las ventas publicadas; una previsión de construcción por debajo del +1 % para 2027 confirmaría el riesgo de volumen', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '12-abr-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Cumplir la guía exige un BPA por encima de 5,78 CHF; el mercado mirará el orgánico del segundo semestre y la obra pendiente de facturar (183,9 M a junio)', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '11-may-2027', evento: 'Junta general: dividendo de 2026 y votos de remuneración', efecto: 'El consenso espera 5,51 CHF; un voto en contra de la retribución variable por encima del 25 % por cuarto año seguido presionaría al consejo', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '6-sep-2027', evento: 'Resultados del 1S27', efecto: 'Prueba del orgánico sin el efecto de las compras de 2026 y del margen del primer semestre (6,0 % en 2026)', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027-2028', evento: 'Fecha de entrada en vigor de la supresión del valor locativo (no antes de 2028) y continuidad del Gebäudeprogramm', efecto: 'Adelanta reformas hasta su entrada en vigor y puede frenarlas después', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '2028-2029', evento: 'Fin de las reservas de aportaciones de capital para el dividendo exento de retención', efecto: 'El dividendo neto para el inversor suizo baja; puede restar demanda de la acción', probabilidad: 'Media', sentido: '−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Crecimiento orgánico negativo tapado por compras: ventas del 1S26 +0,1 % con cinco compras, facturación de 559,0 a 517,8 M y obra pendiente de facturar al alza', tipo: 'Demanda', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % a −20 % si el orgánico se queda en cero (estimación propia con el DCF)', mitigante: 'Cartera de 5-6 meses y renovación energética apoyada por el Gebäudeprogramm', senal: 'Ventas del 2S26 por debajo de 620 M o facturación del año a la baja' },
    { riesgo: 'Presión en márgenes por licitaciones al precio más bajo y por la falta de técnicos (personal = 43,5 % de los ingresos operativos)', tipo: 'Márgenes', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−37,2 % (escenario bajista: 78,28 CHF)', mitigante: 'Escala para compras de material y 1.031 aprendices propios', senal: 'Margen EBITDA del 1S27 por debajo del 5,8 %' },
    { riesgo: 'Subida de los tipos suizos: el valor descansa en un bono al 0,59 %', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−14 % con medio punto más de WACC y medio menos de crecimiento terminal (102,84 CHF)', mitigante: 'Caja neta y dividendo alto', senal: 'Bono de la Confederación a 10 años por encima del 1,0 %' },
    { riesgo: 'Compras más caras y de peor calidad por la competencia de SPIE y BKW por las mismas empresas locales', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % (estimación propia)', mitigante: 'Compras pequeñas y pagadas en caja; 47 desde 2008', senal: 'Fondo de comercio compensado por compra por encima de 2 veces las ventas compradas' },
    { riesgo: 'Fin de la ventaja fiscal del dividendo (reservas de aportaciones de capital para unos tres años)', tipo: 'Accionistas', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 % (menor demanda de inversores suizos; estimación propia)', mitigante: 'Payout del 90 % que se mantiene', senal: 'Propuesta de dividendo sin tramo de reservas de capital' },
    { riesgo: 'Gobierno: comité de auditoría presidido por un antiguo CEO, sin auditoría interna, votos en contra de más del 22 % a la retribución variable y ventas de un consejero (≈ 7,5 M CHF en 2025-2026)', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Guía cumplida cinco años seguidos; sin accionista de control', senal: 'Cambio de auditor, salida del CFO o nuevas ventas de consejeros' },
    { riesgo: 'Dirección de dos personas con 87 filiales que reportan al CEO, sin plan de sucesión publicado', tipo: 'Persona clave', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Sucesión interna ordenada en 2022', senal: 'Salida imprevista del CEO o del CFO' },
  ],
  premortem: `Octubre de 2029: la acción ha caído un 40 %, a unos 75 CHF. La historia más probable empieza el 12-abr-2027: Burkhalter cumple la guía de BPA de 2026 gracias a las compras y al margen, pero la facturación orgánica cae por segundo año y la obra pendiente de facturar se convierte en descuentos. En 2028 entra en vigor la supresión del valor locativo y los propietarios dejan de adelantar reformas; la construcción suiza se estanca. Las licitaciones se deciden por precio y los salarios de los electricistas suben por la falta de técnicos: el margen EBITDA vuelve al 5,5 % de los primeros semestres, como en 2017-2020 con el negocio eléctrico. El dividendo baja con el beneficio y pierde la exención de las reservas de capital; los inversores suizos que la tenían como bono la venden. Con los tipos suizos de vuelta al 1 %, el mercado deja de pagar 20 veces el beneficio. El indicador que lo habría anticipado: las ventas planas del 1S26 con cinco compras y el salto de la obra pendiente de facturar de 27,8 a 69,5 M.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Crecimiento orgánico', pregunta: '¿Cuál fue el crecimiento orgánico del 1S26 y por qué la facturación cayó un 7 % mientras la obra pendiente de facturar subía de 27,8 a 69,5 M?', por_que: 'Decide si el 2026 es un bache o el principio de una caída del volumen; el precio descuenta un 3,3 % anual.' },
    { tema: 'Márgenes', pregunta: '¿Qué parte de la subida del margen del 1S26 se debe a menos servicios de terceros y cuánto es sostenible si el volumen cae?', por_que: 'Cada punto de margen permanente mueve el valor en torno a un 15 %.' },
    { tema: 'Compras', pregunta: '¿A qué múltiplo de EBITDA se han pagado las compras de 2024-2026 y cuánto aportaron al EBIT?', por_que: 'El fondo de comercio se compensa contra el patrimonio y no se puede comprobar si las compras crean valor.' },
    { tema: 'Dividendo', pregunta: '¿Qué política de dividendo habrá cuando se agoten las reservas de aportaciones de capital?', por_que: 'El dividendo exento es buena parte del atractivo para el inversor suizo.' },
    { tema: 'Regulación', pregunta: '¿Cuánto de la cartera actual son reformas que los propietarios adelantan por la supresión del valor locativo?', por_que: 'Si es relevante, 2028-2029 tendrían un hueco de demanda.' },
    { tema: 'Gobierno', pregunta: '¿Por qué preside el comité de auditoría un antiguo CEO con contrato de asesoría y por qué no hay auditoría interna con 87 sociedades?', por_que: 'Es la principal debilidad de control en un grupo descentralizado que contabiliza obra por grado de avance.' },
    { tema: 'Sucesión', pregunta: '¿Hay plan de sucesión para el CEO y el CFO, y existe parentesco entre el CFO y el presidente?', por_que: 'La dirección son dos personas y el parentesco no se publica.' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];
export const parches = [];

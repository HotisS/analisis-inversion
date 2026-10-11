// Textos del analista (Hermès, corte 2026-10-11). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json; [P1] = fuente propia.
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

export const limitaciones = `Se valora la acción ordinaria de Hermès International en Euronext París (RMS), en euros; precio de cierre del viernes 9-oct-2026 (1.283,00 EUR), porque la fecha de corte cae en domingo [D1]. Acciones: 104,95 M diluidas (emitidas menos la autocartera de agosto de 2026 más el efecto de los planes de acciones gratuitas) [D7, D8]. Cuentas NIIF-UE por función; los arrendamientos van en la deuda (NIIF 16) y el capex del DCF incluye las altas de derechos de uso. La cuenta va de 2020 a 2025 con los comunicados anuales y el URD 2025: las amortizaciones de 2022 y 2023 son estimación propia (los URD anteriores no se pudieron descargar) [A5, A6]. Los segmentos son las zonas geográficas; el resultado por zona solo se publica para 2024-2025 [A1]. Hermès publica ventas trimestrales y resultados semestrales: los trimestres solo llevan ventas. El EBITDA del consenso (MarketScreener) suma los deterioros (0,8 % de las ventas), que el motor resta [D2]. Los comparables son de MarketScreener a 8-oct-2026, una sesión antes del corte [D12-D18]. Los impuestos de 2025 y 2026 incluyen la contribución excepcional francesa sobre los beneficios de las grandes empresas; el DCF la quita desde 2027e [A1, A2].`;

export const controles_explicados = [
  { control: 'Regresión múltiplo-crecimiento', explicacion: 'Con siete grupos de lujo de márgenes muy distintos (24-41 %) el crecimiento no explica el múltiplo; no se usa la regresión.' },
  { control: 'Comparables estables al quitar una empresa', explicacion: 'Richemont y L\'Oréal mueven la mediana: por eso los comparables pesan solo un 10 % y Hermès cotiza con una prima estructural que ningún comparable replica.' },
];

const T = {};

T.negocio = {
  descripcion: `Hermès diseña, fabrica y vende objetos de lujo con su única marca a través de 16 oficios. La Marroquinería-Guarnicionería (bolsos Birkin, Kelly, Constance, pequeña marroquinería y sillas de montar) hace el 44 % de las ventas de 2025 (7.070 M EUR); Prêt-à-porter y Accesorios, el 28 %; Seda y Textiles, el 6 %; los Otros oficios (joyería y casa), el 13 %; Perfumes y Belleza, Relojes y Otros productos, el resto [A1]. Vende en 294 tiendas exclusivas, 234 de ellas propias, y en hermes.com; Asia-Pacífico sin Japón supone el 42 % de las ventas, Américas el 19 % y Europa con Francia el 25 % [A1]. Fabrica el 55 % de sus objetos en talleres propios y exclusivos y el 75 % en Francia, con 79 centros de producción y 25 talleres de marroquinería [A1, A2].`,
  como_gana_dinero: `Vende caro lo que fabrica en cantidades que controla: el margen bruto fue del 71,1 % en 2025 y el margen operativo recurrente del 41,0 % [A1]. La marroquinería está limitada por la capacidad: cada taller nuevo (uno al año, unos 260 artesanos) añade volumen, y el resto del crecimiento sale del precio y la mezcla [A1, A7]. Casi todo se produce en euros y casi todo se vende en otras divisas: los tipos de cambio restaron más de 360 M EUR a las ventas del 1S26, aunque la empresa cubre casi el 100 % de sus flujos internos del año siguiente [A1, A2]. No hay ingresos recurrentes por contrato, pero la demanda de los modelos icónicos supera a la oferta y la venta es en tienda propia, sin rebajas ni outlets. El gasto en comunicación es solo del 3,9 % de las ventas [A1].`,
  clientes: `Clientes particulares de muy alto patrimonio, sin concentración: ningún cliente pesa en las cuentas [A1]. Los bolsos icónicos se asignan a clientes con historial de compra; un tribunal federal de California desestimó definitivamente en septiembre de 2025 la demanda colectiva que lo calificaba de venta condicionada [B6]. El poder de precios se ve en los márgenes: el margen operativo subió del 31,0 % de 2020 al 41,1 % de 2025 con una inflación de costes alta y con divisas en contra, y la empresa creció un 8,9 % a tipos constantes en 2025 cuando el mercado crecía un 1 % [A1, B1]. Bain calcula que los bolsos icónicos del sector subieron entre un 50 % y un 70 % de 2019 a 2025, y que eso expulsó a unos 70 millones de clientes aspiracionales del mercado desde 2022 [B1]: Hermès apenas depende de ellos.`,
};

T.sector = {
  definicion: `El mercado relevante es el de **bienes personales de lujo** a escala mundial (marroquinería, moda, calzado, joyería, relojería y belleza de gama alta), medido por Bain y Altagamma a precio de venta al público: 358.000 M EUR en 2025 [B1, B2]. Es donde están el 100 % de las ventas de Hermès. Dentro, la marroquinería de lujo suma unos 74.000 M EUR en 2025 (−5 % a −7 %) y Hermès tiene en torno al 9,6 % (estimación propia) [B1]. Usamos la serie de Bain de junio de 2026 (1996-2025) y la contrastamos con la edición de diciembre de 2025 [B1, B2]; los datos de los competidores salen de sus cuentas. El TCAC histórico se mide de 2019 a 2025 para no partir del valle de 2020; el previsto (3,5 %) es estimación propia a partir del +2/4 % que Bain prevé para 2026 y su visión de crecimiento positivo hasta 2035 [B1, B2].`,
  ciclo: { posicion: 'Recuperación', comentario: `El lujo personal cayó dos años seguidos (364.000 M EUR en 2024 y 358.000 M en 2025) y Bain prevé un +2 % a +4 % a tipos constantes en 2026, con un primer trimestre todavía negativo a tipos corrientes (−5 % a −3 %) [B2]. Es una recuperación tibia: el 1S26 sufrió el conflicto entre EE. UU. e Irán, el petróleo por encima de 100 USD y la primera subida de tipos del BCE desde 2023 [B2]. En 2020 el mercado cayó un 21 % y Hermès un 7 %; en 2025 el mercado retrocedió un 2 % y Hermès subió un 5,5 % publicado [A6, B2].` },
  regulacion: `Tres frentes con cifras. **Aranceles de EE. UU.**: Américas es el 19 % de las ventas y Hermès fabrica en Europa; aun así, la región creció un 15,3 % a tipos constantes en el 1S26 [A2]. **Fiscalidad francesa**: la contribución excepcional sobre los beneficios de las grandes empresas costó unos 325 M EUR en 2025 (dos puntos de margen neto) y sigue en 2026 [A1, A2]. **China**: Bain incluye el endurecimiento de normas entre los retos de corto plazo del sector, y la prensa recoge en octubre de 2026 la presión fiscal china sobre las marcas de lujo [B2, D10]. Además, la piel exótica (cocodrilo, avestruz) está sujeta al convenio CITES y a la presión de las organizaciones de bienestar animal [A1].`,
  tendencias: `El gasto se desplaza de los objetos a las experiencias (+2/6 % en 2026 frente al +2/4 % de los bienes personales) y la segunda mano llega a unos 50.000 M EUR [B1, B2]. La marroquinería es la categoría perdedora (−5 % a −7 % en 2025) por la fatiga de precio y la falta de novedades, y la joyería la ganadora (+4/+6 %) [B1]. Hermès gana con las dos: sus bolsos no pierden valor en la reventa y su joyería y casa (Otros oficios) crecieron un 11 % en 2025 [A1]. El riesgo para Hermès es la normalización china: las marcas locales ganan terreno entre los jóvenes [B1].`,
};

T.competencia = {
  amenazas: `La amenaza principal no es un competidor, sino la erosión de su propia escasez: si Hermès sube precios por encima de lo que acepta su cliente o fabrica más de lo que se desea, los bolsos dejarían de revenderse por encima del precio de tienda (Bain: el lujo perdió 70 millones de clientes desde 2022 por la subida de precios) [B1]. Probabilidad baja: Hermès crece con capacidad, uno o dos talleres al año [A2]. La segunda es China: Asia-Pacífico sin Japón es el 42 % de las ventas y crece un 2,4 % en el 1S26 [A2]. La tercera, Chanel, que factura algo más que Hermès (19.300 M USD) y compite en el mismo cliente y en bolsos de máximo precio [B5].`,
};

T.historia = {
  resumen: `Hermès nació en 1837 como taller de arneses de Thierry Hermès en París y se trasladó al 24 de la rue du Faubourg Saint-Honoré en 1880 [B3]. Pasó de la guarnicionería al bolso, la seda y la moda en el siglo XX (Kelly en 1956, Birkin en 1984) bajo las familias Hermès, Dumas y Puech [B3]. Salió a bolsa en 1993 con la familia en el control. En 2010 LVMH reveló una participación construida con derivados que llegó al 23 %; la familia agrupó más del 50 % en el holding H51 y en 2014 LVMH repartió su participación tras una multa de 8 M EUR de la AMF [B13]. La lección: el control familiar, blindado por la forma de comanditaria por acciones, es parte de la tesis. Axel Dumas, sexta generación, dirige la casa desde 2013 [B3].`,
};

T.financieros = {
  comentario: `Las ventas pasaron de 6.389 M EUR en 2020 a 16.002 M en 2025, un 20,2 % anual, sin compras relevantes: el crecimiento es orgánico salvo el control de la distribución en Emiratos en 2024 [A1, A4]. El margen EBITDA subió del 39,1 % de 2020 (año de cierres) al 45,6-47,3 % de 2021-2025, y el margen EBIT al 41,1 % en 2025 [A1]. El margen bruto mejoró del 69,1 % al 71,1 % por precio y mezcla, pese a las divisas [A1, A6]. El frenazo es reciente: de +15,7 % en 2023 a +5,5 % publicado en 2025 (+8,9 % a tipos constantes) y +1,6 % en el 1S26 (+6,1 %), por China y las divisas [A1, A2]. El beneficio neto cayó en 2025 (4.524 M frente a 4.603 M) por la contribución excepcional francesa: sin ella, el margen neto habría sido del 30,3 % [A1].`,
  ajustes: `Usamos las cifras publicadas. Hermès no presenta partidas no recurrentes desde 2021 (el resultado operativo recurrente es igual al operativo); en 2020 incluyó 91 M de ingresos no recurrentes, que el motor quita del EBITDA [A6]. El EBITDA es el resultado operativo más todas las amortizaciones, incluidas las de derechos de uso (799 M en 2025); las de 2022 y 2023 son estimación propia (660 y 700 M) [A1, A5]. Los deterioros de activos (127 M en 2025, 84 M en 2024) quedan dentro del EBITDA, como en las cuentas; MarketScreener los suma al suyo [A1, D2]. La contribución excepcional francesa infla el tipo impositivo de 2025 (33,4 %) y del 1S26 (35,4 %) frente al 28,7 % de 2024 [A1, A2].`,
};

T.trimestres = {
  ultima_presentacion: `En la conferencia del 1S26 (29-jul-2026) la dirección repitió su mensaje: «confianza» en el segundo semestre, control de los equilibrios y un objetivo «ambicioso» de crecimiento a tipos constantes, sin cifras [A2]. Destacó la aceleración del 2T (+6,7 % frente al +5,6 % del 1T), la Marroquinería (+10,2 % en el 2T) y la capacidad nueva: el taller de Loupes abierto en abril y tres más previstos hasta 2030 [A2, A10]. La caja creció más que el beneficio (flujo libre ajustado +18 %) por la gestión de existencias [A2]. Frente a febrero, el discurso añade la palabra «incertidumbres» geopolíticas y monetarias y la defensa de la «estrategia de valor» en Oriente Medio [A2, A3]. Lo que no se cuantificó: cuánto subirán los precios en 2027 (Bernstein espera que se moderen), cuándo vuelve a crecer China y el impacto de las divisas en el margen del 2S [D10]. El mercado castigó la acción un 11,0 % en la sesión: el BPA (21,32 EUR) quedó por debajo de lo esperado (21,56) y Asia-Pacífico sin Japón creció un 2,5 % en el 2T frente al 4,0 % esperado, aunque el margen (41,0 %) superó el 40,6 % del consenso [D1, D11].`,
};

T.balance = {
  otros_pasivos: `No hay deuda financiera relevante ni covenants: 34 M de préstamos a dic-2025 y 5 M a jun-2026 [A1, A2]. Los pasivos por arrendamiento suman 2.279 M a jun-2026 (tiendas y oficinas), que van en la deuda del puente [A2]. Pensiones y prestaciones a largo plazo: 179 M de provisión a jun-2026 (133 M después de impuestos) [A11]. Provisiones de 151 M y pasivos fiscales corrientes de 787 M (la contribución excepcional) [A2]. Las existencias brutas (4.240 M) llevan un deterioro de 1.536 M, el 36 %: es el juicio contable más relevante y un asunto clave del auditor [A11, A1].`,
  comentario: `El balance es una caja: la caja neta reexpresada pasó de 4.904 M en 2020 a 12.926 M en jun-2026 tras pagar 8.719 M en dividendos en 2020-2025 [A1, A2, A6]. El circulante comercial oscila entre el 11,9 % y el 17,1 % de las ventas: subió al 16,1 % en 2024 por existencias (2.797 M) y bajó al 13,8 % en 2025, y en el 1S26 se mantuvo estable [A1, A2]. Los activos financieros no corrientes (1.230 M) incluyen 616 M de colocaciones de tesorería a más de tres meses y participaciones en proveedores y curtidurías [A2, A11].`,
};

T.flujos = {
  comentario: `Hermès convierte en caja libre entre el 74 % y el 109 % de su beneficio neto: 3.881 M en 2025 (86 %) y 17.901 M acumulados en 2020-2025 [A1]. Los años bajos son los de inversión en existencias (2023: −794 M de circulante) [A5]. Las inversiones operativas subieron del 4,5 % de las ventas en 2022 al 7,3 % en 2025 (1.161 M): talleres de marroquinería, la nueva sede de rue d'Anjou y tiendas en propiedad, con 449 M en Américas y 359 M en Francia [A1]. Estimación propia: el mantenimiento está cerca de la amortización del inmovilizado (448 M, 2,8 % de las ventas) y el resto es crecimiento [A1]. Sumando los arrendamientos (332 M), la inversión total fue del 9,3 % de las ventas en 2025.`,
};

T.calidad = {
  auditor: 'PricewaterhouseCoopers Audit y Grant Thornton Audit',
  anios_auditor: 27,
  opinion: 'Favorable',
  comentario: `Opinión limpia de PwC (desde 2011) y Grant Thornton (desde 1999, 27 años seguidos) sobre 2025, con dos asuntos clave: la valoración de las existencias y la contabilización de las coberturas de divisa [A1]. Las existencias son el juicio más relevante: 1.429 M de deterioro sobre 4.004 M brutos a dic-2025 (36 %) [A1]. La remuneración en acciones (gratuitas para empleados) costó 199 M en 2025, el 3,0 % del resultado operativo [A1]. No hay capitalización de gastos de desarrollo ni fondo de comercio relevante (180 M). Los tres indicadores del motor son impecables: Altman Z de 18,02 (zona segura, por la caja y la ausencia de deuda), Piotroski F de 8 sobre 9 y Beneish M de −2,71, lejos de la zona de manipulación. La conversión del beneficio en caja (86 % en 2025) confirma que el beneficio es real.`,
  senales: [
    { senal: 'Antigüedad del auditor', nivel: 'Baja', comentario: 'Grant Thornton lleva 27 años seguidos; PwC, 15. En Francia la coauditoría obligatoria mitiga el riesgo [A1].' },
    { senal: 'Deterioro de existencias elevado', nivel: 'Baja', comentario: '36 % del bruto; criterio estable y asunto clave del auditor [A1, A11].' },
    { senal: 'Contribución excepcional francesa', nivel: 'Baja', comentario: 'Infla el tipo impositivo de 2025-2026; no es una partida recurrente pero puede prolongarse [A1, A2].' },
  ],
  confianza: 'Alta',
};

T.rentabilidad = {
  comentario: `Hermès crea valor por un margen enorme: el ROIC fue del 55,1 % en 2025, más de cinco veces el WACC del 9,99 %, y no ha bajado del 33 % ni en 2020 [A1]. Lo mueve el margen (EBIT del 41,1 %), no la rotación: el capital invertido creció con talleres, tiendas y existencias, y por eso el ROIC baja del 76,8 % de 2022 al 55,1 % aunque el margen se mantenga. El ROIC incremental histórico (79,4 %) dice que cada euro invertido en capacidad ha rendido mucho, pero el de 2025 es menor: las ventas crecieron un 5,5 % con un capital invertido que siguió subiendo. El ROE (25 %) queda por debajo del ROIC por la caja ociosa: 12.926 M que rinden lo que paguen los depósitos [A2]. Ningún comparable se acerca: LVMH tiene un ROIC del 12,7 % [D12].`,
  confianza: 'Alta',
};

T.capital = {
  politica: `La política es estable: dividendo ordinario creciente (18 EUR por 2025, 42 % del beneficio) y, cuando sobra caja, un dividendo extraordinario (5 EUR en 2012, 2015 y 2018; 10 EUR en 2024 y 2025) [A1]. Las recompras son pequeñas y sirven para cubrir las acciones gratuitas de los empleados: 160 M en el 1S26 [A2]. Las prioridades son la inversión en capacidad (talleres y tiendas, 1.161 M en 2025) y la integración vertical (curtidurías, proveedores) [A1]. No hay objetivo de endeudamiento: la empresa no usa deuda.`,
  comentario: `La dirección asigna bien el capital del negocio y mal el de la caja. En 2020-2025 generó 17.901 M de flujo libre, pagó 8.719 M en dividendos, gastó 650 M en compras pequeñas y 578 M en recompras, y acumuló el resto [A1]. Las inversiones en capacidad rinden (ROIC incremental histórico del 79,4 %) y las compras han sido de proveedores y distribuidores, sin deterioros relevantes [A1, A4]. Pero 12.926 M de caja (10 % de la capitalización) rinden un 2-3 % [A2]: un dividendo extraordinario o una recompra mayor, con la acción un 44 % por debajo de su máximo, crearían más valor. La familia compra a título personal (40,7 M EUR en 12 meses), no a través de la empresa [C6].`,
};

T.directivos = {
  comentario: `Equipo estable y alineado con el capital familiar: Axel Dumas dirige desde 2013 y el Comité Ejecutivo mezcla miembros de la familia (Pierre-Alexis Dumas, Guillaume de Seynes, Wilfried Guerrand) con directivos de carrera (Éric du Halgouët en Finanzas desde 2015) [C1]. La guía es cualitativa («crecimiento ambicioso a tipos constantes») y se ha cumplido todos los años de 2021 a 2025, con crecimientos del 9 % al 42 % [C1, A1]. La sucesión no está publicada: la decide Émile Hermès SAS, el socio colectivo, que nombra al gerente sin voto de la junta [C1]. No hubo cambios en la cúpula en 24 meses.`,
};

T.gobierno = {
  remuneracion: `Los gerentes cobran un fijo que sube con las ventas (con un tope del 5 % anual) y un variable que sube con el beneficio antes de impuestos; el 10 % del variable depende de criterios de RSC [C1, C5]. No hay variable a largo plazo, ni acciones, ni opciones: premia crecer, sin medir la rentabilidad del capital ni la del accionista. Axel Dumas devengó 7,83 M EUR en 2025 (30 veces el coste medio por empleado) y cobrará 5,31 M de variable por 2025 (+5,4 %) [C1, C5]. La junta de 2025 aprobó su política con el 91,12 %; como la familia vota con el 78,6 % de los derechos, eso equivale (estimación propia, cota inferior) a que al menos el 41,5 % de los votos del flotante votaron en contra [C1, C4].`,
  control_y_defensas: `Hermès es una sociedad comanditaria por acciones: Émile Hermès SAS, de los descendientes de Émile Hermès, es el socio colectivo con responsabilidad ilimitada, nombra y cesa a los gerentes y decide por estatutos, a propuesta del Consejo de Vigilancia, las opciones estratégicas, los presupuestos de explotación e inversión y las propuestas a la junta sobre reservas [C1]. La familia tiene además el 66,7 % del capital y el 78,6 % de los votos ejercitables (H51 el 54,3 % del capital) gracias a los derechos de voto dobles [C1]. Es imposible una opa hostil. Operaciones vinculadas: el socio colectivo recibe el 0,67 % del beneficio distribuible por estatutos, y hay contratos con sociedades de miembros de la gerencia de Émile Hermès SAS (estudio de arquitectura RDAI, 20 M EUR en 2025; Studio des Fleurs, 4 M) y alquileres de la sede con SIFAH [A1].`,
  alertas: [
    'La remuneración de los gerentes no tiene componente a largo plazo ni métricas de retorno, y al menos el 41,5 % de los votos del flotante la rechazó en 2025 (estimación propia) [C1].',
    'Contratos con sociedades de miembros de la gerencia del socio colectivo (RDAI, 20 M EUR; Studio des Fleurs, 4 M) [A1].',
    'Grant Thornton lleva 27 años como coauditor [C1].',
  ],
};

T.consenso = {
  guidance: `Hermès no da cifras: el 29-jul-2026 confirmó un «objetivo ambicioso de crecimiento de las ventas a tipos constantes» a medio plazo, «pese a las incertidumbres económicas, geopolíticas y monetarias», la misma frase de octubre de 2025, febrero y abril de 2026 [A2, A3, A7, A10]. Sobre el margen, solo el dato publicado (41,0 % en el 1S26 con divisas en contra) [A2]. La capacidad está fijada: talleres de marroquinería en 2027 (Charleville-Mézières), 2028 (Colombelles) y 2030 (Les Andelys) [A2].`,
  revisiones: `Las estimaciones van a la baja desde agosto: RBC rebajó en agosto, Bernstein recortó sus previsiones en septiembre por una demanda china «más moderada» y espera que Hermès modere las subidas de precio de la marroquinería en 2027; Citi y HSBC bajaron su objetivo, y UBS empezó con Vender y un objetivo de 1.168 EUR el 5-oct, mientras Goldman Sachs mantiene Vender [D3, D10]. Hoy hay 10 recomendaciones de compra, 11 de mantener y 2 de venta, con un objetivo medio de 1.657,61 EUR [D3, D4]. Las cifras de los últimos tres y doce meses no se publican gratis: solo la dirección de los cambios. El consenso de 2026e (16.709 M de ventas, +4,4 %) exige un 2S26 un 7,3 % mayor que el de 2025 [D2, A3].`,
};

T.bolsa = {
  comentario: `Hermès ha perdido un 38,9 % en 2026 con dividendos, frente al −1,8 % del CAC 40 y el −11,1 % del ETF de lujo mundial: la peor caída de su historia bursátil (−54,6 % desde el máximo de febrero de 2025) [D1, D10]. Las caídas se concentran en sus publicaciones: −8,2 % con las ventas del 1T26 (15-abr) y −11,0 % con los resultados del 1S26 (29-jul), por Asia y un BPA algo inferior al esperado [D1, D11]. En septiembre y octubre se sumaron los recortes de objetivo de varios bancos y la entrada de UBS en Vender [D10]. La caída es de múltiplo, no de beneficio: el BPA de los últimos doce meses (43,00 EUR) es casi el de 2024 [A2]. La beta mensual a cinco años es 1,44 frente al CAC 40 y 1,42 frente al Stoxx 600 [D1]. No consta posición corta neta publicada en la AMF (no se pudo comprobar).`,
};

T.multiplos_historicos = {
  comentario: `Hermès cotiza a 16,6 veces el EBITDA de los últimos doce meses y 29,8 veces el beneficio, frente a una media de 30,2 y 49,3 veces al cierre de 2021-2025 (2020 queda fuera por la pandemia): un descuento del 45 % y del 40 %, y por debajo del mínimo de esos cinco años (26,8 y 45,0 veces) [D1]. Lo que ha cambiado es el crecimiento: los múltiplos de 2021-2024 pagaban un 13-41 % anual de ventas; hoy crece un 6 % a tipos constantes. También subieron los tipos: el Bund pasó de negativo en 2021 al 3,53 % [D5]. El múltiplo actual sigue siendo el doble que el de la mediana del lujo (8,5 veces el EBITDA de los próximos 12 meses) [D12-D18].`,
};

T.comparables = {
  criterio: `Siete grupos europeos de lujo y belleza en NIIF: LVMH, Richemont, Kering, Moncler, Prada, Brunello Cucinelli y L'Oréal, con cifras de MarketScreener a 8-oct-2026 [D12-D18]. Chanel no cotiza; Ferrari, el otro negocio de escasez, quedó fuera por falta de datos gratuitos completos. Ninguno es comparable de verdad: Hermès tiene un margen EBITDA del 46 % frente a la mediana del 29,6 % y un ROIC cuatro veces mayor.`,
  comentario: `Hermès cotiza a 15,7 veces el EBITDA de los próximos 12 meses y 27,1 veces el beneficio, frente a una mediana de 8,5 y 22,4 veces: una prima del 85 % en EV/EBITDA y del 21 % en PER. La prima se justifica por el margen (46,0 % frente al 29,6 %), la caja neta (−1,4 veces el EBITDA) y un crecimiento previsto parecido al de la mediana (6,6 %), pero no por crecer más: hoy Hermès crece como el sector. La mediana daría 743,77 EUR por EV/EBITDA y 1.061,08 EUR por PER; el percentil 75 del PER, 1.255,30 EUR, sigue por debajo del precio. El crecimiento no explica los múltiplos (R² de 0,15), así que no usamos la regresión. Pesan solo un 10 %.`,
};

T.transacciones = {
  comentario: `Siete operaciones de lujo de 2018-2025, con EV/ventas de 1,7 a 5,6 veces y EV/EBITDA de 17,1 a 22,9 veces en las que lo publicaron [D19-D27]. Darían 770,75 EUR por acción, muy por debajo del precio, porque Hermès cotiza a 7,6 veces las ventas: ninguna operación se ha pagado así. No tienen peso: la familia controla el 78,6 % de los votos y el socio colectivo bloquea cualquier opa; el intento de LVMH de 2010-2014 terminó con su salida [C1, B13].`,
};

T.esg = {
  materialidad: `Tres asuntos mueven las cifras. **Las pieles y el bienestar animal**: el 90 % de los proveedores directos de piel tiene certificado LWG y la piel exótica depende de pocos criaderos; una restricción a la piel de cocodrilo afectaría a los bolsos más caros [B3]. **El empleo artesanal en Francia**: 16.656 empleados en Francia, prima de 3.000 EUR a todos los empleados y escuelas propias; es la base de la capacidad y de la licencia social [A2, B3]. **El clima**: emisiones de alcance 1 y 2 un 69 % por debajo de 2018 y 77 % de energía renovable [B3]. MSCI bajó la nota de AA a A en 2025; CDP la mantiene en A en clima y bosques [B3].`,
  controversias: `La demanda colectiva de 2024 en California, que acusaba a Hermès de condicionar la venta del Birkin a otras compras, se desestimó definitivamente en septiembre de 2025 [B6]. Nicolas Puech, heredero que decía tener unos 6 millones de acciones, denunció su desaparición; un tribunal suizo desestimó su demanda contra su antiguo gestor [B16]. No hay sanciones de reguladores en los últimos tres años [B3].`,
};

T.sentimiento_lectura = `El tono de los particulares franceses es negativo y empeora: en Boursorama dominan los objetivos técnicos a la baja (1.000 y hasta 900 EUR) y la ironía sobre el PER, con poca discusión del negocio [E1, E2]. Es un sentimiento de capitulación en el precio, no en las cifras: el BPA de los últimos doce meses es casi el de 2024 y la familia compró 40,7 M EUR de acciones en doce meses [A2, C6]. No contradice a los analistas, que también se han partido (UBS y Goldman en Vender) [D3]. Para la decisión aporta una señal contraria: la venta ya es mayoritaria entre los particulares y el riesgo de que la acción siga cayendo por impulso es real a corto plazo, pero no cambia el valor.`;

T.sentimiento_temas = [
  { tema: 'Valoración (¿cuánto PER merece Hermès?)', postura: 'Bajista', peso: 'Alto', contraste: 'Tienen razón a medias: el PER ha bajado a 29,8 veces desde una media de 49,3, pero el DCF inverso dice que el precio aún pide un 12,0 % anual de crecimiento [D1].' },
  { tema: 'Rebajas de los analistas (UBS y Goldman a Vender)', postura: 'Bajista', peso: 'Alto', contraste: 'Son 2 ventas de 23; el objetivo medio (1.657,61 EUR) sigue un 29 % por encima del precio [D3].' },
  { tema: 'China y Asia', postura: 'Bajista', peso: 'Medio', contraste: 'Fundado: Asia-Pacífico sin Japón crece un 2,4 % en el 1S26 y es el 42 % de las ventas [A2].' },
  { tema: 'Comprar en la caída / calidad a largo plazo', postura: 'Alcista', peso: 'Medio', contraste: 'La familia compra (40,7 M EUR en doce meses) y el margen se mantiene en el 41 %, pero la calidad no garantiza que el precio sea bajo [C6, A2].' },
  { tema: 'Análisis técnico y soportes', postura: 'Bajista', peso: 'Alto', contraste: 'Sin contenido fundamental; refleja el impulso de la caída (−38,9 % en el año) [D1].' },
];

export const secciones = {
  negocio: T.negocio,
  sector: T.sector,
  competencia: T.competencia,
  historia: T.historia,
  financieros: T.financieros,
  trimestres: T.trimestres,
  balance: T.balance,
  flujos: T.flujos,
  calidad: T.calidad,
  rentabilidad: T.rentabilidad,
  capital: T.capital,
  directivos: T.directivos,
  gobierno: T.gobierno,
  consenso: T.consenso,
  bolsa: T.bolsa,
  multiplos_historicos: T.multiplos_historicos,
  comparables: T.comparables,
  transacciones: T.transacciones,
  esg: T.esg,
  sentimiento: { lectura: T.sentimiento_lectura, temas: T.sentimiento_temas },
};

export const parches = [
  { ruta: 'trimestres.items[7].vs_consenso', valor: 'En línea' },
];

export const dcf_justificacion = {
  crecimiento: `2026e +4,0 % publicado: el 1S26 creció un 1,6 % publicado y un 6,1 % a tipos constantes, y el consenso pide un +4,4 % para el año [A2, D2]. 2027e-2030e +7,5 %, el consenso de 2027e-2028e (+7,5 % y +7,3 %) y el ritmo a tipos constantes de 2025-2026 (6-9 %) [D2, A1]. Luego baja medio punto al año hasta el 5,0 % de 2035e. La media del caso base (6,7 % en 2027e-2035e) está muy por debajo del 15,1 % anual de 2019-2025 y del 20,2 % de 2020-2025, pero casi dobla el 3,5 % que esperamos para el mercado [B2].`,
  margenes: `Margen EBITDA del 45,3 % en 2026e (el 1S26 fue del 46,2 % con un segundo semestre siempre algo más flojo y las divisas en contra) y del 45,5-46,0 % después, la banda de 2021-2025 (45,6-47,3 %) [A1, A2]. El consenso, sin los deterioros que suma MarketScreener, da un 44,5 % en 2026e y un 44,3 % en 2027e: nuestro margen es algo más alto [D2]. No suponemos expansión: la capacidad nueva y los salarios de los artesanos absorben el apalancamiento operativo.`,
  inversion: `Capex del 8,5 % de las ventas en 2026e-2027e (inversiones operativas del 7,3 % en 2025 más las altas de derechos de uso, que aproximamos con los pagos de arrendamientos, 2,1 %) que baja al 5,6 % en 2035e, cuando se acaban los talleres anunciados; la amortización (inmovilizado más derechos de uso) sube del 5,1 % al 5,5 % [A1]. Circulante comercial del 14,0 % de las ventas (13,8 % en 2025) [A1]. Tipo impositivo del 34,0 % en 2026e con la contribución excepcional y del 28,5 % desde 2027e, el de 2024 (28,7 %) [A1].`,
  wacc: `Tasa libre del 3,53 %, el Bund a 10 años del 9-oct-2026 [D5]. Beta de 1,20, la ajustada semanal a cinco años frente al CAC 40; las demás medidas dan 1,25-1,44, también frente al Stoxx 600 y al MSCI Europe [D1]. Prima de mercado del 5,5 % y sin prima adicional. Sin deuda financiera: el peso de la deuda (1,7 %) son los arrendamientos, a un coste del 2,4 % [A1]. WACC del 9,99 %; con la prima implícita del mercado (4,20 %), el 8,45 % [D6].`,
  terminal: `Crecimiento a perpetuidad del 3,0 %: inflación en euros de unos 2 % y un punto real, justo por debajo de la tasa libre menos medio punto (3,03 %). El múltiplo implícito es de 9,0 veces el EBITDA, la mitad del actual (16,6 veces) y del mínimo de 2021-2025 (26,8 veces) [D1]. Es el supuesto que más separa nuestro valor del precio: el mercado supone que Hermès seguirá creciendo por encima de la economía mucho después de 2035.`,
};

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 4.5, otros_pct: -2.0, comentario: 'Estimación propia: crecimiento del 6,1 % a tipos constantes en el 1S26 que reparten un precio de en torno al 4-5 % y volumen; las divisas restan unos 2 puntos (−360 M en el 1S26) [A2].' },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 4.0, otros_pct: 0.5, comentario: 'Volumen: taller de Charleville-Mézières y madurez de Loupes. Precio más moderado, como espera Bernstein [A2, D10].' },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 4.0, otros_pct: 0.0, comentario: 'Taller de Colombelles (2028) y joyería y casa [A2].' },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 4.0, otros_pct: 0.0, comentario: 'Precio en línea con su historia; volumen limitado por artesanos formados [A1].' },
  ],
  mercado_final: { periodo: '2035e', tamano: 505000 },
  veredicto: 'Sí',
  justificacion: `Sí, para nuestro caso base. El 6,7 % anual de 2027e-2035e lo financia de sobra un ROIC del 55,1 % con una reinversión mínima, y se apoya en un poder de precios demostrado (margen del 31,0 % al 41,1 % en cinco años con costes y divisas en contra) y en una capacidad que crece con un taller al año [A1, A2]. La cuota implícita pasa del 4,5 % al 5,9 % del mercado en 2035e, 1,3 veces la actual, cuando Hermès ha ganado cuota todos los años desde 2019 [B2]. Lo que la calidad no sostiene es el 12,0 % anual que pide el precio: eso exigiría volver a crecer como en 2019-2025 (15,1 % anual) con un mercado que crece un 3,5 %.`,
};

export const dcf_lectura = `El DCF da 944,86 EUR por acción, un 26,4 % por debajo del precio, con un 59 % del valor en el terminal. El DCF inverso es la clave: para justificar 1.283 EUR con nuestro WACC del 9,99 %, Hermès tendría que crecer un 12,0 % anual en 2027e-2035e con nuestros márgenes, frente al 6,7 % de nuestro caso base y el 7,5 % del consenso para 2027e-2028e; la rentabilidad implícita en el precio es del 8,0 % anual. Ese 12 % se parece a su historia (15,1 % anual en 2019-2025) en un mercado que crecía al 4 %; hoy el mercado crece entre un 2 % y un 4 % y Hermès un 6 % a tipos constantes [A1, A2, B2]. Con la prima implícita del mercado (WACC del 8,45 %) el DCF sube a 1.192,26 EUR, todavía un 7 % por debajo del precio. El supuesto que más pesa es el terminal: un 3 % a perpetuidad supone 9,0 veces el EBITDA en 2035, la mitad de lo que el mercado ha pagado nunca por Hermès. Si se cree que la marca valdrá en 2035 lo que hoy, el precio es razonable; si se cree que Hermès converge hacia un gran grupo de lujo, sobra un 25 %.`;

export const narrativas = {
  Bajista: 'El frenazo de 2025-2026 se vuelve permanente: China no se recupera, los clientes rechazan nuevas subidas de precio en marroquinería y Hermès crece un 3-4 % con el margen tres puntos menor por las divisas y la capacidad infrautilizada, como les pasó a Gucci y a la moda de LVMH en 2024-2025.',
  Base: 'Hermès crece un 7,5 % hasta 2030 con su capacidad nueva y subidas de precio moderadas, y converge al 5 % en 2035 con el margen en la banda del 46 %.',
  Alcista: 'China vuelve y el cliente de muy alto patrimonio sigue gastando: Hermès recupera un ritmo del 10-11 % a tipos constantes con un punto más de margen.',
};

export const escenarios_comentario = `La asimetría es mala con nuestro WACC: incluso el alcista (1.146,87 EUR) queda un 10,6 % por debajo del precio, mientras el bajista (703,16 EUR) pierde un 45,2 %. Con la prima del mercado el alcista gana un 14,3 % y el bajista pierde un 33,2% (asimetría de 0,43 veces). El bajista es verosímil: ya le pasó a Gucci (Kering perdió un 13 % de ventas en 2025) y a la moda de LVMH, cuyo margen bajó dos puntos en un año [B7, B10]. Para que comprar compense hay que creer en el alcista con una probabilidad mucho mayor que el 25 %.`;

export const valoracion_comentario = `Pesos: DCF 60 %, escenarios 30 % y comparables 10 %. El DCF es el método más fiable para un negocio sin deuda, con márgenes estables y una caja que se puede proyectar; los escenarios recogen la incertidumbre sobre el crecimiento, que es la variable que decide. Los comparables pesan poco porque Hermès no tiene comparables: su margen y su ROIC son el doble y el cuádruple de la mediana, y la mediana daría entre 743,77 y 1.061,08 EUR. Las transacciones no pesan (la familia hace imposible una opa). La dispersión es grande: de 700 EUR (comparables y bajista) a 1.192,26 EUR (DCF con la prima del mercado); solo el precio objetivo de los analistas (1.657,61 EUR) y la cotización de 52 semanas quedan por encima del precio.`;

export const catalizadores = {
  items: [
    { fecha: '22-oct-2026', evento: 'Ventas del 3T26', efecto: 'Un crecimiento por encima del 7 % a tipos constantes y la vuelta de Asia sostendrían el consenso del 2S26', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Dic-2026', evento: 'Presupuesto francés de 2027: fin o prórroga de la contribución excepcional sobre los beneficios', efecto: 'Unos 325 M EUR anuales de beneficio neto (2 puntos de margen neto)', probabilidad: 'Media', sentido: '+/−' },
    { fecha: 'Ene-2027', evento: 'Subidas de precio anuales', efecto: 'Bernstein espera que se moderen en marroquinería; una subida baja frenaría el crecimiento a corto plazo', probabilidad: 'Alta', sentido: '−' },
    { fecha: '11-feb-2027', evento: 'Resultados de 2026 y dividendo (¿extraordinario?)', efecto: 'Margen del 2S y uso de 12.926 M de caja', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '22-abr-2027', evento: 'Ventas del 1T27', efecto: 'Primera lectura del efecto de los precios de 2027 y de China', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027', evento: 'Apertura del taller de Charleville-Mézières', efecto: 'Capacidad de marroquinería para 2027-2028', probabilidad: 'Alta', sentido: '+' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'El mercado sigue pagando la historia de crecimiento y la acción rebota (riesgo de la recomendación de venta)', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '+29 % hasta el objetivo medio de los analistas', mitigante: 'El precio objetivo medio cae desde agosto', senal: 'Crecimiento a tipos constantes por encima del 9 % dos trimestres seguidos' },
    { riesgo: 'China no se recupera (42 % de las ventas en Asia-Pacífico sin Japón)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−26 % (escenario bajista frente al base)', mitigante: 'Japón, Américas y Europa crecen un 8-15 %', senal: 'Asia-Pacífico sin Japón por debajo del 0 % en un trimestre' },
    { riesgo: 'Fatiga de precio en marroquinería', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '≈ −10 % (estimación con el escenario bajista)', mitigante: 'Demanda superior a la oferta en los modelos icónicos', senal: 'Marroquinería por debajo del 8 % a tipos constantes' },
    { riesgo: 'Divisas (producción en euros, ventas en dólares, yenes y yuanes)', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '≈ −2,5 % por punto de margen EBITDA', mitigante: 'Cobertura de casi el 100 % del año siguiente', senal: 'Margen semestral por debajo del 40 %' },
    { riesgo: 'Prórroga de la contribución excepcional francesa', tipo: 'Fiscal', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '≈ −3 EUR por acción (−0,3 %) por año adicional', mitigante: 'Temporal por ley', senal: 'Proyecto de presupuesto de 2027' },
    { riesgo: 'Gobierno: remuneración sin componente a largo plazo y caja ociosa', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−1 a −2 % (12.926 M rinden un 2-3 %)', mitigante: 'Dividendos extraordinarios en 2024-2025', senal: 'Ausencia de dividendo extraordinario con caja creciente' },
    { riesgo: 'Restricciones a la piel exótica o escándalo en la cadena de suministro', tipo: 'ESG', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Integración vertical y certificaciones LWG', senal: 'Cambios en CITES o investigaciones a proveedores' },
  ],
  premortem: `Octubre de 2029: hemos recomendado vender y la acción ha subido un 40 %. La historia más probable: China vuelve a crecer en 2027 con el estímulo fiscal, el cliente de muy alto patrimonio estadounidense sigue gastando con las bolsas en máximos y Hermès, con los talleres de 2027 y 2028 en marcha, recupera un 10-12 % de crecimiento a tipos constantes sin bajar el margen del 41 %. El mercado vuelve a pagar más de 45 veces el beneficio, como al cierre de 2021-2025. La señal que lo habría anticipado: Asia-Pacífico sin Japón por encima del 6 % y la Marroquinería por encima del 12 % durante dos trimestres. La otra cara: si la recomendación acierta, la acción pierde un 25-30 % hasta los 900-950 EUR cuando el crecimiento se estabiliza en el 6-7 % y el mercado deja de pagar un múltiplo de escasez.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Crecimiento a medio plazo', pregunta: '¿Qué significa hoy «crecimiento ambicioso»? ¿Es compatible con un 6-7 % a tipos constantes o la dirección sigue pensando en dos cifras?', por_que: 'Es la diferencia entre nuestro valor (944,86 EUR) y lo que descuenta el precio (12 % anual).' },
    { tema: 'Precios', pregunta: '¿Cuánto subirán los precios de la marroquinería en 2027 y qué parte del crecimiento de 2025-2026 fue precio?', por_que: 'La empresa no separa precio y volumen; el puente de ingresos es estimación propia.' },
    { tema: 'China', pregunta: '¿Cómo evolucionan las ventas a clientes chinos dentro y fuera de China y la tasa de recompra?', por_que: 'Asia-Pacífico sin Japón es el 42 % de las ventas y crece un 2,4 %.' },
    { tema: 'Capacidad', pregunta: '¿Cuántos artesanos de marroquinería se forman al año y cuál es la capacidad de cada taller nuevo?', por_que: 'Fija el volumen máximo y la reinversión del DCF.' },
    { tema: 'Caja', pregunta: '¿Por qué mantener 12.926 M de caja neta sin una recompra mayor, con la acción un 44 % por debajo de su máximo?', por_que: 'La caja (10 % de la capitalización) rinde un 2-3 %.' },
    { tema: 'Margen y divisas', pregunta: '¿Qué tipo de cambio cubre ya 2027 y qué margen implica?', por_que: 'Un punto de margen EBITDA vale en torno a un 2,5 % del valor (estimación propia).' },
    { tema: 'Sucesión', pregunta: '¿Hay un plan de sucesión de Axel Dumas dentro de la familia y cómo lo decidirá Émile Hermès SAS?', por_que: 'La gerencia no la vota la junta.' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];

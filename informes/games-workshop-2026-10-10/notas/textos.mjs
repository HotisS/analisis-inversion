// Textos del analista (Games Workshop, corte 2026-10-10). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json.
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

export const limitaciones = `Se valora la acción ordinaria de la Bolsa de Londres (GAW), que cotiza en peniques; precio y valores por acción en libras (cierre del viernes 9-oct-2026, 163,90 GBP; el corte cae en sábado) [D1]. El ejercicio cierra el domingo más cercano al 31 de mayo y se nombra por el año en que termina (FY2026 = jun-25 a may-26); FY2018 y FY2024 tienen 53 semanas [A1, A4]. Hasta FY2020 las regalías se presentaban fuera de la cifra de negocio: se suman para que la serie sea homogénea [A7, A8]. Segmentos Core y Licencias solo desde FY2021, el único año que la empresa reexpresó [A6]. El capex del flujo de caja es solo el de caja; el del DCF suma las altas de derechos de uso de las tiendas (NIIF 16) [A1]. El puente es del 31-may-2026 y resta los dividendos pagados después (76 M) [D3, D4]. **El consenso de MarketScreener (3 analistas) es solo del negocio Core, sin licencias**: sus ingresos de FY2027e (692,2 M) crecen un 10,4 % sobre el Core de FY2026 (626,8 M), no un 4,9 % sobre el grupo; los múltiplos de los próximos 12 meses salen, por tanto, algo altos [D8, A1]. No hay transcripciones de conferencias ni previsiones de la empresa.`;

export const controles_explicados = [
  { control: 'Cambio de perímetro declarado (FY2020)', explicacion: 'No hubo compras: el salto del activo de FY2020 es la entrada en balance de los derechos de uso de las tiendas al aplicar la NIIF 16 (33,6 M en la transición) y más caja por la covid [A7].' },
  { control: 'Múltiplos LTM y NTM de cada comparable coherentes', explicacion: 'Funko sale de pérdidas y reestructuración: su EBITDA de los próximos 12 meses sube mucho más que las ventas. Pesa poco en la mediana y los comparables solo pesan un 15 %.' },
  { control: 'Proyección propia frente a consenso', explicacion: 'El consenso de MarketScreener (3 analistas) es solo del Core y su FY2029e (745,3 M de ventas, +1,6 %) es atípico; nuestro EBITDA incluye además las licencias (≈25-35 M al año con un 90 % de margen) [D8].' },
]

const consenso = {
  revisiones: `MarketScreener no publica en abierto la serie de revisiones, así que no se pueden dar los cambios a 3 y 12 meses [D8]. Su consenso, de solo 3 analistas, es del negocio Core: 692,2 M de ingresos en FY2027e, un 10,4 % más que los 626,8 M del Core de FY2026, y un BPA de 6,02 GBP frente a 6,225 de FY2026, porque no cuenta las licencias (29,9 M de beneficio operativo en FY2026) [D8, A1]. Stock Analysis, con 4 analistas, da 692,2 M de ventas y un BPA de 6,18 GBP [D11]. Con unas licencias de ≈25 M, el grupo crecería un 8-9 % en FY2027 (estimación propia).`,
};

const sentimiento = {
  lectura: `El poco debate abierto que se puede leer separa negocio y precio: nadie discute la calidad (márgenes y fidelidad de los aficionados), y la duda es la valoración tras la caída del 30 % desde junio [1, 2]. Coincide con nuestra lectura: la acción no cae por el negocio, que creció un 12,2 % a tipo constante en el Core, sino porque el precio de mayo (casi 40 veces el beneficio) pedía un crecimiento que nadie había visto en una empresa de este tamaño. El sentimiento no es extremo: la posición corta es del 1,23 % [D13]. Los foros de particulares no se pudieron leer.`,
};

export const secciones = { consenso, sentimiento };

export const dcf_justificacion = {
  crecimiento: `FY2027e +9,0 %: el Core crece un 10,4 % según el consenso (692,2 M) y las licencias bajan a ≈25 M sin un nuevo éxito como Space Marine 2 [D8, A1]. El Core creció un 12,2 % a tipo constante en FY2026 con subidas de precio de c. 3 %, unas 30 tiendas nuevas y más ventas a comercios independientes [A1, B2]. FY2028e +10 % y bajada gradual hasta el 4 % en FY2034e. La media del caso base (7,3 %) está por debajo del 12,3 % anual de FY2021-FY2026 y muy por debajo del 16,6 % de la década, que parte de una base mucho menor (165,6 M en FY2017) [A1-A8].`,
  margenes: `Margen EBITDA del 47,0 % en FY2027e y del 47,5 % después, frente al 48,7 % de FY2026 y el 49,6 % de FY2025, inflados por las licencias de Space Marine 2 (52,5 M de ingresos con un 94 % de margen) [A1, A2]. Sin licencias, el margen operativo Core fue del 39,1 % en FY2026 (41,9 % sin el reparto de beneficios a la plantilla) y la empresa quiere mantenerlo [A1]. Los aranceles de EE. UU. costaron c. 6 M en el 1S26 [A9].`,
  inversion: `Capex del 11,0 % de las ventas en FY2027e que baja al 9,5 %: el de caja (7,5 % en FY2026, con 17,0 M de desarrollo de producto capitalizado, moldes y la nueva fábrica) más las altas de derechos de uso de las tiendas (23,6 M, 3,6 % de las ventas) [A1]. La amortización (7,0 %) incluye la de los derechos de uso. Circulante del 5,5 % de las ventas, el de FY2026; tipo impositivo del 25 %.`,
  wacc: `Tasa libre del 5,39 %, el gilt a 10 años del Banco de Inglaterra del 7-oct-2026 [D38]. Beta de 0,99: la mensual a 5 años frente al FTSE 100 (la semanal a 5 años da 1,01) [D1]. Prima de mercado del 5,5 % y sin prima adicional; sin deuda financiera. WACC del 10,84 %; con la prima implícita del mercado (4,20 %), el 9,55 % [D39].`,
  terminal: `Crecimiento a perpetuidad del 3,0 %: inflación británica esperada de algo más del 2,5 % y algo de crecimiento real por la expansión del aficionado fuera del Reino Unido, por debajo de la tasa libre menos medio punto (4,89 %). El múltiplo de salida implícito es de 7,7 veces el EBITDA, bajo frente a los 16,7 veces de hoy: refleja un WACC alto y un crecimiento a perpetuidad que no paga la escasez de activos así.`,
};

export const etapa2_justificacion = `No se usa. El ROIC (102,3 %) cumple de sobra la condición, pero el caso base ya tiene ocho años de crecimiento por encima del terminal y el aficionado de Warhammer, aunque crece fuera del Reino Unido, es un nicho: alargar el crecimiento sería suponer que la serie de Amazon lo convierte en un mercado de masas, algo que no tiene fecha ni condiciones públicas.`;

export const dcf_lectura = `El DCF da 99,10 GBP por acción, un 39,5 % por debajo del precio, con un 59 % del valor en el terminal. **El precio descuenta que Games Workshop repite su década.** El DCF inverso dice que, con nuestros márgenes, los 163,90 GBP de hoy suponen un crecimiento de los ingresos del 15,9 % anual de FY2027e a FY2034e, frente al 7,3 % de nuestro caso base y al 12,3 % de FY2021-FY2026; comprar a este precio rinde un 7,8 % anual si se cumple el caso base, frente a un WACC del 10,8 %. Que lo haya hecho antes no basta: en la década pasada partía de 165,6 M de ventas; ahora factura 660 M y el Core ya está en 598 tiendas propias y miles de comercios. Para llegar al precio hace falta que la serie de Amazon o un videojuego multipliquen el número de aficionados, algo posible pero sin fecha.`;

export const narrativas = {
  Bajista: `El frenazo del 2S26 (Core +5,1 % frente al +17,3 % del 1S26) no es puntual: Warhammer se enfría, las subidas de precio y los aranceles pesan en el volumen de EE. UU. y las licencias no encuentran otro Space Marine 2 [A1]: crecimiento 4 puntos menor cada año, margen EBITDA del 43,5 % y crecimiento a perpetuidad del 2 %.`,
  Base: `El Core crece un 9-10 % dos años con precio, tiendas y comercios, y se frena hacia el 4 %; licencias de 25-35 M al año. Crecimiento medio del 7,3 % y margen EBITDA del 47,5 %.`,
  Alcista: `La serie de Amazon y nuevos videojuegos atraen aficionados y el Core crece como en FY2022-FY2025 (11-17 % al año): crecimiento 4 puntos mayor cada año y margen del 49,5 %, con más licencias.`,
};

export const escenarios_comentario = `La asimetría es mala: el alcista vale 132,01 GBP (−19,5 %) y el bajista 65,32 (−60,1 %). Ni el escenario bueno, con un crecimiento medio de más del 11 % durante ocho años, llega al precio. El bajista es verosímil: es prolongar el frenazo del Core del 2S26 (+5,1 %) [A1]. Con la prima de riesgo que hoy pide el mercado (4,20 %), el alcista sube a 159,28 GBP, aún por debajo del precio. El valor ponderado por probabilidad es de 98,88 GBP.`;

export const valoracion_comentario = `Pesos: DCF 50 %, escenarios 25 %, comparables 15 %, transacciones 10 % y suma de partes 0 %. El DCF manda porque el negocio es estable y su caja, predecible: convirtió en caja el 92 % del beneficio en la década. Los comparables pesan poco (15 %) porque ninguno se le parece: los juguetes masivos tienen márgenes de la mitad o menos y dependen de grandes minoristas; solo Sanrio se acerca. Las transacciones (118,00 GBP, 10,5-16,7 veces el EBITDA con prima de control) recuerdan que ningún comprador ha pagado nunca lo que hoy paga la bolsa por Games Workshop. Todos los métodos quedan entre 98,88 y 118,00 GBP, muy por debajo del precio de 163,90 GBP. El valor objetivo es de 102,00 GBP.`;

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 6.5, precio_pct: 3.0, otros_pct: -0.5, comentario: 'Core +10,4 % según el consenso: subidas de c. 3 %, unas 30 tiendas nuevas y más comercios; licencias de 32,9 a ≈25 M [A1, B2, D8].' },
    { periodo: 'FY2028e', volumen_pct: 7.0, precio_pct: 3.0, otros_pct: 0.0, comentario: 'Volumen como el del Core en FY2022-FY2026 (12,3 % anual en el grupo, con 2-6 % de precio) [A1, B2].' },
    { periodo: 'FY2029e', volumen_pct: 6.0, precio_pct: 3.0, otros_pct: 0.0, comentario: 'Expansión fuera del Reino Unido: Norteamérica ya es el 42,6 % del Core y Asia-Pacífico el 10,2 % [A1].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: `Para nuestro caso base, sí: el 7,3 % anual se financia con holgura, porque la reinversión prevista al ROIC actual (102 %) da para crecer un 11,6 % al año, y tiene precedente, con subidas de precio del 2-6 % cada año y volumen al alza en las tiendas y en los comercios [B2, A1]. El foso es amplio: propiedad intelectual propia, fábricas propias y un margen operativo Core del 39 % frente al 0-22 % de los juguetes [B10-B16]. Para el crecimiento que pide el precio (15,9 % anual), no: exigiría que el número de aficionados creciera más deprisa que en ningún momento con este tamaño, y eso no depende de la calidad sino de un éxito de pantalla sin fecha.`,
};

export const catalizadores = {
  items: [
    { fecha: '22-oct-2026 (ex)', evento: 'Dividendo de 0,70 GBP por acción', efecto: 'Sigue el reparto de toda la caja por encima del colchón de 120 M', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Diciembre de 2026 (estimada)', evento: 'Avance del 1S27 («no inferior a…»)', efecto: 'Primera cifra del año: si el Core sigue al 10 % sin licencias', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '12-ene-2027 (estimada)', evento: 'Resultados del 1S27', efecto: 'Margen Core con aranceles y licencias en mínimos', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Sin fecha', evento: 'Estreno de la serie de animación Deathwatch y avances de la serie de Amazon', efecto: 'Prueba de si la pantalla amplía el número de aficionados; el precio ya lo descuenta', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Nuevos videojuegos con licencia (Total War: Warhammer 40,000, Space Marine 3)', efecto: 'Licencias por encima de los 32,9 M de FY2026', probabilidad: 'Media', sentido: '+' },
    { fecha: 'Julio de 2027', evento: 'Resultados de FY2027', efecto: 'Confirma el crecimiento del Core y el ritmo de tiendas', probabilidad: 'Alta', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'El precio pide un crecimiento del 15,9 % anual durante ocho años', tipo: 'Valoración', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: 'Caso base: 99,10 GBP, −39,5 % sobre el precio', mitigante: 'Historial de crecimiento del 16,6 % anual en la década', senal: 'Core por debajo del 8 % a tipo constante en el 1S27' },
    { riesgo: 'Enfriamiento del aficionado (el Core creció solo un 5,1 % en el 2S26)', tipo: 'Demanda', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'Bajista: 65,32 GBP, −34 % sobre el valor base', mitigante: 'Más comercios y países; el aficionado de Warhammer es fiel y gasta cada año', senal: 'Ventas de las tiendas propias a la baja' },
    { riesgo: 'Licencias irregulares: de 52,5 M a 32,9 M en un año', tipo: 'Negocio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'Cada 10 M de licencias con un 90 % de margen ≈ 0,20 GBP de BPA', mitigante: 'Cartera de juegos anunciados', senal: 'Royalties por debajo de 25 M en FY2027' },
    { riesgo: 'Aranceles de EE. UU. sobre productos fabricados en el Reino Unido', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'c. 6 M en el 1S26; Norteamérica es el 42,6 % del Core', mitigante: 'Subidas de precio y 7,8 M de aranceles IEEPA recuperados', senal: 'Margen bruto Core por debajo del 69 %' },
    { riesgo: 'Tipos y coste de capital', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Con un WACC del 9,8 %, el DCF sube a 113,65 GBP, aún −31 %', mitigante: 'Sin deuda', senal: 'Gilt a 10 años por encima del 5,5 %' },
    { riesgo: 'Gobierno: consejo con 3 independientes de 7 y votos de remuneración del 20-29 % en contra en 2024-2025', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'No cambia el valor; resta en la prima', mitigante: 'Voto en contra del 4,90 % en 2026 tras ajustar la política', senal: 'Nuevo voto alto en contra o salida del consejero delegado' },
  ],
  premortem: `Octubre de 2029: la acción ha caído un 40 %, a unos 98 GBP. La historia más probable no es un colapso del negocio sino de las expectativas. FY2027 cierra con el Core creciendo un 7 % y unas licencias de 20 M; la serie de Amazon se retrasa y la de animación pasa sin pena ni gloria. En FY2028 los aranceles y los salarios suben el coste y la empresa sube precios un 5 %, lo que frena el volumen en EE. UU. El mercado deja de pagar 26 veces el beneficio por una empresa que crece al 6-8 %, y el PER baja hacia 18 veces, su media de FY2022. El indicador que lo habría anticipado: el 2S26, con el Core creciendo solo un 5,1 %, y un consenso que ya esperaba menos BPA en FY2027 que en FY2026.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Volumen', pregunta: '¿Cuántos clientes activos y cuántos comercios nuevos aportaron el crecimiento del Core en FY2026, y cuánto fue precio?', por_que: 'El precio exige un 15,9 % anual: hay que saber de dónde puede salir.' },
    { tema: 'Amazon', pregunta: '¿Qué ingresos mínimos y qué calendario tiene el acuerdo con Amazon, y qué parte del merchandising controla Games Workshop?', por_que: 'Es la única palanca que justificaría el precio y sus condiciones no son públicas.' },
    { tema: 'Licencias', pregunta: '¿Qué juegos con licencia tienen fecha en FY2027-FY2028 y qué garantías mínimas llevan?', por_que: 'Las licencias cayeron de 52,5 a 32,9 M en un año.' },
    { tema: '2S26', pregunta: '¿Por qué el Core creció solo un 5,1 % en el 2S26 frente al +17,3 % del 1S26?', por_que: 'Puede ser la primera señal del enfriamiento del bajista.' },
    { tema: 'Aranceles', pregunta: '¿Qué parte del coste arancelario se ha trasladado a precios en EE. UU. y con qué efecto en el volumen?', por_que: 'Norteamérica es el 42,6 % del Core.' },
    { tema: 'Gobierno', pregunta: '¿Cuándo se ampliará el consejo, con 3 independientes de 7 y uno solo presidiendo auditoría, remuneración y como consejero coordinador?', por_que: 'Concentra en una persona tres funciones de control.' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];

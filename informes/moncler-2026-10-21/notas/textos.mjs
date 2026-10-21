// Textos del analista (Moncler, corte 2026-10-21, tras las ventas de los nueve meses). Citas con la letra de la nota: [A22] = fuente 22 de A.json.
export default {
  limitaciones: 'Análisis rehecho entero con fuentes primarias (comunicados, informes anuales en ESEF, Consob y eMarket Storage); el del 14-oct salió de extractos de búsqueda. **Precio**: cierre del 21-oct-2026 en Milán (42,94 EUR), anterior a las ventas de los nueve meses, que se publicaron tras el cierre: la reacción del mercado no está en el precio [D1, D6]. **EBITDA**: Moncler no lo publica; es EBIT más todas las amortizaciones (con NIIF 16) [A24]. **Arrendamientos** de tiendas (1.198,6 M a jun-26) en el puente y altas de derechos de uso dentro del capex del DCF [A23]. Moncler no publica márgenes trimestrales: el 3T26 solo trae ventas [A22]. Acciones: 271,6 M (274,8 M emitidas menos 3,2 M de autocartera) [D4].',
  controles_explicados: [
    { control: 'Comparables estables al quitar una empresa', explicacion: 'Seis grupos de lujo muy distintos (de Kering, con el beneficio hundido, a Hermès): la mediana del EV/EBITDA NTM va de 8,7 a 13,4 veces según cuál se quite. Por eso los comparables pesan un 30 % y su PER solo es el techo del alcista a 12 meses.' },
    { control: 'Regresión múltiplo-crecimiento explicativa (R² ≥ 0,3)', explicacion: 'Con seis empresas, el crecimiento no explica los múltiplos (R² de 0,13): en el lujo pesa más la marca que el crecimiento de un año. No se usa.' },
    { control: 'Compra robusta (v3 y v2 dan Comprar)', explicacion: 'La v2 (PER al cierre) da 14,7 %, justo por debajo del 15 %: la compra es frágil. El motivo de negocio es que el precio está en mínimos de 52 semanas con el PER más bajo desde la salida a bolsa y caja neta; aun así, la señal espera al cierre del 22-oct.' },
  ],
  parches: [],
  huecos_resueltos: [],
  dcf_justificacion: {
    crecimiento: '2026e +1,5 %: los nueve meses crecen un 3 % a tipos corrientes y el 3T26 cae un 1,6 % (plano a tipos constantes) [A22]; suponemos un 4T, el mayor del año, un 1 % por debajo del de 2025 con la divisa en contra. El consenso (+3,3 %, antes del 3T) necesita un 4T del +3,9 % [D7]. 2027e +4 % y 2028e +5,5 %: el consenso da +7 % [D7]; Moncler creció un 11,2 % anual en 2021-2025, pero solo un 0,7 % en 2025 [A1]. Luego baja hasta el 3 % de 2035e, por debajo del 3,5 % que estimamos para el lujo personal [B5].',
    margenes: 'Margen EBITDA del 39,5 % en 2026e y 2027e (39,9 % en 2025; 40,1 % en los últimos 12 meses) por ventas planas y unos 10 M de costes del nuevo gobierno [A24, C6], que vuelve al 40-40,5 %, el de 2022-2025 [A]. Margen bruto del 78 %, el más alto del sector tras Hermès [B1].',
    inversion: 'Capex del 13 % de las ventas: inversión neta (6,9 % en 2025; guía de ≈6 % en 2026) más altas de derechos de uso de tiendas, porque con NIIF 16 el EBITDA no paga el alquiler (240,9 M en 2025) [A24, C6]. Baja al 12 %, por encima de la amortización (10,8 %). Circulante del 10 % de las ventas, el de jun-26 (7 % en 2021): las existencias crecieron un 14,6 % en 2025 con ventas planas [A].',
    wacc: 'Tasa libre del 3,47 %, el Bund a 10 años del 21-oct-2026 [D12]. Beta de 1,15: la de la acción frente al índice (1,1) [D6], algo más alta por la concentración en una categoría y una estación. Prima de mercado del 5,5 %; sin prima adicional (la familia Ruffini controla de hecho, pero el consejo tiene 7 independientes de 14 y no hay operaciones vinculadas relevantes) [C1]. Deuda = arrendamientos, ≈9 % del valor, al 3,5 %. WACC del 9,14 %; con la prima implícita del mercado (4,20 %), el 7,78 % [D13].',
    terminal: 'Crecimiento a perpetuidad del 2,5 %: inflación del euro y algo de crecimiento real, por debajo de la tasa libre.',
  },
  puente_comentarios: {
    '2026e': 'Subidas de precio de ≈3-4 % (aranceles en EE. UU. y lista de 2026) y volumen plano; −2,5 puntos de divisa [A22, B9].',
    '2027e': 'Precio del 3 % y algo de volumen con Stone Island (+5 % en el 3T26) [A22].',
    '2028e': 'Vuelta del turismo a Europa y de China: volumen del 2,5 % (estimación propia).',
    '2029e': 'Lujo personal al +3,5 % anual (estimación propia sobre Bain) [B5].',
    '2030e': 'Converge al mercado.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. La proyección (4,2 % anual) pide menos de lo que Moncler ha hecho en cualquier periodo de cinco años desde su salida a bolsa y apenas mueve su cuota del lujo personal [A, B5]. La reinversión es baja (9 % del beneficio operativo después de impuestos): el crecimiento depende del poder de precio, demostrado con un margen EBIT del 29-30 % estable durante el frenazo de 2024-2025 [A24]. La duda no es de calidad sino de demanda: la marca Moncler cayó un 1 % en el 3T26 y EMEA un 8 % por segundo trimestre [A22]. Por eso el bajista resta 5 puntos de crecimiento en 2027.',
  dcf_lectura: 'El DCF da 40,30 EUR por acción, un 6,1 % por debajo de 42,94 EUR, con un WACC del 9,14 % y un 58 % del valor en el terminal. El DCF inverso dice que el precio descuenta un crecimiento del 5,4 % anual, frente al 4,4 % de nuestro base, o una rentabilidad del 8,7 % con nuestras cifras: algo menos que nuestro coste de capital. Con la prima implícita del mercado (4,20 %) el DCF sube a 50,93 EUR: la conclusión depende de la tasa, no de las cifras.',
  narrativas: {
    Bajista: 'El frenazo del 3T26 sigue: Europa sin turistas, China débil y el abrigo de plumón pasado de moda; las ventas caen en 2027 y el margen pierde 3 puntos, como Burberry o Canada Goose [B17].',
    Base: 'Un 2026 plano y vuelta a crecer un 4-5,5 % en 2027-2028 con precios y Stone Island, con el margen en el 40 %.',
    Alcista: 'Asia y Europa vuelven en 2027, la nueva dirección (Rongone) acelera Stone Island y la venta directa: crecimiento de 2,5 puntos más y 1,5 puntos más de margen.',
  },
  escenarios_comentario: 'El DCF da 28,40 EUR en el bajista (−33,9 %), 40,30 en el base (−6,1 %) y 49,97 en el alcista (+16,4 %): asimetría desfavorable con nuestro WACC del 9,14 %; el ponderado (39,74 EUR) queda un 7,5 % por debajo del precio. A 12 meses, con el PER, el cuadro cambia: el bajista pierde un 18,4 % y el alcista gana un 69,1 %, porque el precio ya descuenta un PER de 17,9 veces, el más bajo desde 2020. Las dos lecturas no se contradicen: la acción está barata frente a su historia y justa frente a un coste de capital del 9 %.',
  valoracion_comentario: 'Pesos: DCF 40 %, comparables 30 % y escenarios 30 %. El DCF no pesa más porque el valor depende mucho de la tasa (40,30 EUR con la nuestra, 50,93 con la del mercado). Los comparables pesan un 30 % pese a la muestra frágil porque el lujo se valora por múltiplos: Moncler cotiza a 8,6 veces el EBITDA de los próximos 12 meses y 17,1 veces el beneficio, frente a medianas de 11,1 y 24,9 veces [D16-D21]. Las transacciones (44,76 EUR de mediana) no pesan: llevan prima de control y Ruffini controla de hecho con el 18,2 % y el pacto con LVMH [C1, C12]. El valor intrínseco es de 45,66 EUR (+6,3 %).',
  diferencia_consenso: 'Nuestro objetivo a 12 meses (51,63 EUR) queda un 12 % por debajo del objetivo medio de los analistas (58,74 EUR; 46,6-70) [D8]. Nuestro BPA de 2028e (2,58 EUR) es un 7 % menor que el del consenso (2,765), que aún no recoge el 3T26 [D7]; y el múltiplo base (19,7 veces) queda por debajo de los 21-23 veces que implican sus objetivos.',
  objetivo12m_comentario: 'Objetivo ponderado de 51,63 EUR (+23,5 % con dividendo; base +21,6 %). El base sube el PER actual (17,9 veces nuestro BPA de 2027e) solo un 10 %, el tope, aunque la mediana adelantada de cinco años es de 23,6 veces. Con el PER de cierre (v2) la rentabilidad baja al 14,7 % y con el BPA un 10 % más bajo al 11,5 %: la compra es frágil.',
  just12m: {
    Bajista: 'Ventas de 3.226 M en 2028e (−1 % en 2027) y margen EBITDA 3 puntos más bajo: BPA de 2,13 EUR a 15,8 veces.',
    Base: 'Ventas de 3.488 M y margen del 40 %: BPA de 2,58 EUR, un 7 % por debajo del consenso, a 19,7 veces (17,9 de hoy con el tope del 10 %) [D7].',
    Alcista: 'Ventas de 3.657 M y margen del 41,5 %: BPA de 2,86 EUR a la mediana del PER de los comparables (24,9 veces).',
  },
  catalizadores: {
    items: [
      { fecha: '22-oct-2026', evento: 'Primera sesión tras las ventas del 3T26', efecto: 'Marca Moncler −1 % y EMEA −8 %: si la acción cae, la compra mejora; la señal espera a este cierre [A22]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '4T26 (nov-dic)', evento: 'Temporada de invierno, el 40 % de las ventas del año', efecto: 'Decide si 2026 acaba plano o en el +3 % del consenso', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '18-feb-2027', evento: 'Resultados de 2026 y primer plan de la nueva dirección', efecto: 'Rongone como consejero delegado; posible uso de la caja neta (recompras autorizadas del 10 %) [D3, C14]', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2027', evento: 'Fin del pacto de Ruffini con LVMH', efecto: 'LVMH tiene hasta el 22 % de Double R: cualquier cambio de control movería el precio hacia las transacciones [C12, C13]', probabilidad: 'Baja', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'El frenazo de la marca Moncler (−1 % en el 3T26) se alarga', tipo: 'Demanda', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−33,9 % (escenario bajista)', mitigante: 'Precios al alza y caja neta de 1.112 M', senal: 'Venta directa de Moncler negativa dos trimestres seguidos' },
      { riesgo: 'Una categoría y una estación: abrigo de plumón y el 4T', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % con un invierno cálido', mitigante: 'Stone Island, punto y Grenoble', senal: 'Existencias por encima del 18 % de las ventas' },
      { riesgo: 'Europa sin turistas y China débil', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 %', mitigante: 'América crece', senal: 'EMEA por debajo del −5 % en el 4T' },
      { riesgo: 'Posiciones cortas del 3,65 % del capital (Ilex 2,23 %)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: 'Volatilidad', mitigante: 'Ninguno', senal: 'Cortos por encima del 5 %' },
      { riesgo: 'Gobierno: 31,4 % de la junta contra la remuneración de 2026', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '—', mitigante: 'Consejo con la mitad de independientes', senal: 'Otro voto en contra por encima del 30 % [C3]' },
    ],
    premortem: 'Octubre de 2027: la acción ha caído un 25 %. La historia más probable: el invierno de 2026 es cálido en Europa, el turista chino no vuelve y la marca Moncler encadena cuatro trimestres de caída en venta directa; las existencias, que ya subían un 14,6 % en 2025, obligan a rebajar precios y el margen EBIT baja del 29 % al 25 %. La nueva dirección no tiene historia que contar hasta 2028.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Demanda', pregunta: '¿Qué parte del −2 % de la venta directa de Moncler en el 3T26 es tráfico y qué parte precio?', por_que: 'Dice si el frenazo es de marca o de turismo.' },
      { tema: 'Caja', pregunta: '¿Por qué no usan la recompra del 10 % autorizada con la acción en mínimos y 1.112 M de caja neta?', por_que: 'Una recompra del 5 % subiría el BPA un 5 %.' },
      { tema: 'Existencias', pregunta: '¿Las existencias (+14,6 % en 2025) son compra estratégica de plumón o producto sin vender?', por_que: 'Es la primera señal de rebajas.' },
      { tema: 'Gobierno', pregunta: '¿Qué hará Double R al terminar el pacto con LVMH en 2027?', por_que: 'Un cambio de control llevaría el precio hacia las transacciones.' },
    ],
    confianza: 'Media',
  },
};

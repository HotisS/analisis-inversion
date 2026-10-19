// Textos finales del analista (Ningbo Deye, corte 2026-10-19): valoración, objetivo a 12 meses, riesgos, catalizadores,
// preguntas y resumen. Cifras del motor tal cual (último cálculo); hechos con cita de la letra de la nota.

const objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 3.17, multiplo: null, precio: null, justificacion: 'Ciclo como el de 2023: ventas de 2027e un 10 % por debajo de 2026e (21.120 M) y +4 % en 2028e (21.970 M), margen EBITDA del 22,5 %: EBIT ≈ 4.550 M, resultado financiero +150 M, impuestos del 14 %: beneficio ≈ 4.040 M sobre 1.272,7 M de acciones.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 5.62, multiplo: null, precio: null, justificacion: 'Ventas de 32.860 M (+25 % en 2027e y +12 % en 2028e) y margen EBITDA del 26,5 %: EBITDA de 8.710 M, amortización de 590 M, intereses netos de +200 M (caja de ≈ 11.000 M), impuestos del 14 %: beneficio de ≈ 7.150 M. Cuadra con 2025: EBIT de 3.389 M + 246 M financieros − 467 M de impuestos = 3.171 M.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 6.71, multiplo: null, precio: null, justificacion: 'Almacenamiento comercial y Australia tiran más: ventas de 36.280 M (+31 % y +18 %) con margen EBITDA del 28,5 %: beneficio de ≈ 8.550 M, un 2 % por encima de los 8.390 M que prevé Guosen y cerca del consenso de 2028e (6,59 CNY).' },
  ],
  per_historico: {
    base: 'adelantado', actual: 13.56, mediana_5a: 13.74, minimo_5a: 12.53, media_larga: 14.5,
    excluidos: 'Historia adelantada (precio de cierre de cada año ÷ BPA real del año siguiente, todo por acción de hoy): 2021 39,59 ÷ 1,29 = 30,7 (fuera: burbuja solar); 2022 67,06 ÷ 1,52 = 44,1 (fuera: burbuja; la acción cayó después un 77,5 %); 2023 30,58 ÷ 2,44 = 12,5; 2024 43,27 ÷ 2,51 = 17,2; 2025 61,57 ÷ 4,48 (nuestro BPA de 2026e) = 13,7. Mediana 13,74, mínimo 12,53 y media 14,5 (2023-2025). PER actual: 71,35 ÷ 5,26 (nuestro BPA de 2027e) = 13,56.',
    v2: { mediana_5a: 20.1, minimo_5a: 17.7, media_larga: 20.8, excluidos: 'Al cierre (precio ÷ BPA del mismo año): 2021 74,7 y 2022 52,0 (fuera, burbuja); 2023 20,1; 2024 17,7; 2025 24,5.' },
  },
  comparables_per: { mediana: 14.1 },
  consenso: { bpa_ano1: 4.52, bpa_ano2: 5.64, objetivo_medio: 135.48, objetivo_min: 91.0, objetivo_max: 187.86, analistas: 10, tendencia_3m: 'recortes', fuente: 'MarketScreener (estimaciones y objetivos, 16-oct-2026), Soochow y Guosen (15 y 18-oct-2026) [D2, D3, D5, D6]' },
  diferencia_consenso: 'Nuestro BPA de 2027e (5,26) queda un 7 % por debajo del consenso (5,64) y el de 2028e (5,62), un 15 % por debajo (6,59) [D2]. La diferencia es de ventas y margen: el consenso espera 27.700 M en 2027e y 32.800 M en 2028e con un margen EBITDA del 29-30 %; nosotros 29.300 M y 32.900 M con un margen que baja al 27,5 % y al 26,5 % por la mezcla de baterías, la competencia y la exclusión europea. El precio base (76,43) queda un 44 % por debajo del objetivo medio de los analistas (135,48), que además parece sin ajustar en parte a la ampliación liberada de 0,4 de mayo de 2026 (Soochow da 123 CNY con 20 veces el BPA de 2027e) [D3, D5]. La distancia viene sobre todo del múltiplo: los analistas aplican 20 veces y la regla común, 13,6.',
  media: null,
  comentario: 'El objetivo a 12 meses (ponderado 71,18 CNY; base 76,43) queda cerca del valor intrínseco (76,72): las dos medidas dicen que la acción está en precio. El base sube un 10 % por crecimiento del beneficio y dividendo, sin revalorización: el PER actual (13,6) ya está en su mediana adelantada de 2023-2025. El bajista pesa mucho porque replica la caída de 2023 con un PER de 10,9 veces. Para que la acción suba más haría falta que el mercado vuelva a pagar 17 veces (2024) o que el 2027e salga como espera el consenso; el catalizador con fecha más próximo es el informe del 3T26 (30-oct), pero el beneficio ya está adelantado.',
};

const riesgos = {
  items: [
    { riesgo: 'Fin del pico de demanda y ciclo de existencias en los distribuidores', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−49 % (escenario bajista)', mitigante: 'Diversificación en más de 160 países y peso creciente del comercial e industrial; caja neta de ≈ 9.200 M [A9, A6].', senal: 'Caída de ventas trimestrales frente al trimestre anterior y subida de existencias por encima de 4.000 M' },
    { riesgo: 'Exclusión de inversores chinos en la UE más allá de los fondos públicos', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % (pérdida de la mitad de Europa)', mitigante: 'Europa es el 32,7 % de las ventas y el resto crece; planta en Malasia [A9, B6].', senal: 'Propuesta de reforma de la Ley de Ciberseguridad de la UE con restricciones al mercado privado' },
    { riesgo: 'Guerra de precios entre fabricantes chinos', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 % por cada 2 puntos de margen EBITDA', mitigante: 'Margen bruto del 51 % en el inversor de almacenamiento y costes de fabricante de electrodomésticos [A1].', senal: 'Margen bruto del grupo por debajo del 34 % en un trimestre' },
    { riesgo: 'Yuan fuerte y pérdidas de cambio', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 % a −5 %', mitigante: 'Coberturas a plazo y fabricación en Malasia [A9].', senal: 'Pérdidas de cambio por encima de 300 M en un semestre' },
    { riesgo: 'Dilución y descuento de la salida a Hong Kong', tipo: 'Gobierno', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '−3 % a −8 %', mitigante: 'La emisión entra a precio de mercado y aporta caja; la familia mantiene el control [D14].', senal: 'Folleto definitivo con tamaño superior al 10 % del capital o descuento H/A superior al 25 %' },
    { riesgo: 'Coste de las celdas de litio y escasez de chips', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Proveedores chinos alternativos y compras adelantadas en el 1S26 [B4].', senal: 'Margen bruto de las baterías por debajo del 28 %' },
    { riesgo: 'Concentración en distribuidores y mercados frágiles (Pakistán, Líbano, Ucrania, Irak)', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Cobro adelantado o a 40-90 días; el primer cliente es el 10 % de las ventas [B2].', senal: 'Aumento de deterioros de cuentas a cobrar (66 M en 2024)' },
    { riesgo: 'Aranceles y restricciones en EE. UU.', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 %', mitigante: 'Norteamérica es solo el 4,7 % de las ventas [A9].', senal: 'Prohibición expresa de inversores chinos en la red de EE. UU.' },
  ],
  premortem: 'Octubre de 2029: Deye vale un 40 % menos. Lo que pasó: el pico de 2026 fue de existencias. Ucrania firmó un alto el fuego en 2027 y la demanda de emergencia desapareció; Australia recortó el programa de baterías a mitad de 2027 y los distribuidores europeos, que habían comprado para el invierno, dejaron de pedir durante dos trimestres, como en 2023. A la vez, la UE aprobó en 2028 la reforma de la Ley de Ciberseguridad y varios países exigieron inversores sin conexión a la nube de fabricantes chinos: Deye perdió la mitad de su negocio europeo frente a SMA, Fronius y los coreanos. Los rivales chinos, con fábricas nuevas vacías, bajaron precios un 20 % y el margen EBITDA cayó al 20 %. El beneficio de 2028 volvió a los 3.000 M de 2025 y el mercado, que ya pagaba solo 13 veces, bajó a 10. La emisión de acciones H a precio de saldo en 2027 hundió la confianza. Las señales que lo habrían anticipado: existencias al alza en el balance del 3T26 y 4T26, caída de las ventas trimestrales frente al trimestre anterior, el margen bruto por debajo del 34 % y la propuesta legislativa europea.',
  ia: {
    exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '+2 % a −2 %',
    comentario: 'Deye vende hardware de electrónica de potencia y baterías: la IA no sustituye el producto ni el canal de instaladores. Le favorece por dos vías indirectas: los centros de datos tensionan las redes y suben el precio de la electricidad, lo que mejora la rentabilidad del almacenamiento comercial, y su nube (德业云) ya usa algoritmos para comprar y vender electricidad según el precio dinámico [B4]. Le perjudica que la IA abarate el diseño de inversores para competidores nuevos y que la ciberseguridad de los equipos conectados (el argumento de la UE) gane peso con ataques automatizados [B6]. Ninguna de las dos mueve el valor más de un 2 % en 3-5 años. Señal: ventas de almacenamiento a centros de datos o, en contra, incidentes de seguridad en inversores conectados.',
  },
  confianza: 'Media',
};

const catalizadores = {
  items: [
    { fecha: '30-oct-2026', evento: 'Informe del 3T26', efecto: 'Ventas, margen y existencias del trimestre; el beneficio ya está adelantado (4.220-4.320 M en 9M26) [D10, D16]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'nov-2026 a feb-2027', evento: 'Campaña de invierno en Ucrania y Europa', efecto: 'Soochow espera que la producción de octubre se mantenga y más de 1,3 millones de inversores residenciales en 2026 [D5]', probabilidad: 'Media', sentido: '+' },
    { fecha: '2026-2027 (sin fecha)', evento: 'Salida a bolsa en Hong Kong (acciones H)', efecto: 'Dilución de tamaño desconocido y posible descuento; más visibilidad internacional [D14]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027', evento: 'Reforma de la Ley de Ciberseguridad de la UE (inversores)', efecto: 'Puede extender al mercado privado la exclusión de inversores chinos [D18]', probabilidad: 'Media', sentido: '−' },
    { fecha: 'abr-2027', evento: 'Resultados de 2026 y dividendo final', efecto: 'Dividendo de 2026e de ≈ 3 CNY por acción según el consenso (1,6 ya pagados) [D2]', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'hasta sep-2027', evento: 'Recompra de 100-200 M CNY', efecto: 'Pequeña (0,2 % del capital) y para incentivos [D19]', probabilidad: 'Alta', sentido: '+' },
  ],
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'Existencias del canal', pregunta: '¿Cuántas semanas de existencias tienen hoy sus distribuidores en Europa, Pakistán y Australia, y cuánto de las ventas del 2T y 3T de 2026 es reposición para el invierno?', por_que: 'El bajista replica la caída de 2023; de esto depende si 2027e crece un 25 % o cae.' },
    { tema: 'Exclusión europea', pregunta: '¿Qué parte de las ventas europeas va a proyectos con fondos públicos y qué plan hay si la UE extiende la exclusión al mercado privado (fabricación en Malasia, nube europea)?', por_que: 'Europa es el 32,7 % de las ventas.' },
    { tema: 'Salida a Hong Kong', pregunta: '¿Qué tamaño tendrá la emisión de acciones H y para qué hace falta con una caja neta de ≈ 9.200 M?', por_que: 'Dilución y posible descuento; uso del capital.' },
    { tema: 'Margen de la batería', pregunta: '¿Qué margen bruto tienen las baterías en 2026 y cómo se fija el precio frente al de la celda?', por_que: 'Las baterías ya son el 46 % de las ventas y su margen cayó 9,5 puntos en 2025.' },
    { tema: 'Divisa', pregunta: '¿Qué porcentaje de las ventas en dólares y euros está cubierto y a qué tipo?', por_que: 'Las pérdidas de cambio explican el 3T26 plano.' },
    { tema: 'Ucrania', pregunta: '¿Cuánto pesa Ucrania en las ventas de 2026 y qué pasa con un alto el fuego?', por_que: 'La demanda de emergencia puede desaparecer de golpe.' },
    { tema: 'Cliente principal', pregunta: '¿Qué relación comercial hay con el primer cliente, cuyo propietario fue consejero de la filial alemana?', por_que: 'Concentración (10 % de las ventas) y posible conflicto de interés [B2].' },
  ],
  confianza: 'Media',
};

const sintesis = `**La recomendación y por qué.** Mantener, con convicción baja. El objetivo a 12 meses es de 71,18 CNY (ponderado) y 76,43 CNY en el caso base, frente a un precio de 71,35 CNY: la rentabilidad a 12 meses, con el dividendo, es del 2,7 % ponderada y del 10,0 % en el base, lejos del 15 % que pide comprar. El valor intrínseco (76,72 CNY, +7,5 %) dice lo mismo: la acción está en precio. Los analistas (objetivo medio de 135,48 CNY) quedan muy por encima de nuestro rango (de 36,49 a 107,06 CNY), porque pagan 20 veces el beneficio y nosotros aplicamos 13,6, la mediana de los tres últimos años. La convicción es baja porque las reglas discrepan (la relativa daría comprar, la absoluta mantener) y la asimetría es de 1,02; subiría con un precio por debajo de 63,69 CNY o con un 4T26 que confirme que 2027e no cae.

**El negocio.** Deye es el primer fabricante mundial de inversores de almacenamiento residencial (20,6 % por ingresos) y vende baterías al mismo cliente [B1]. Su margen EBITDA del 29,6 % en 2025 duplica la mediana de los comparables y su ROIC es altísimo (183,5 % en el motor, 21,5 % con toda la caja en el capital) frente a un WACC del 8,84 %, porque el circulante es negativo [A9]. La sostenibilidad del crecimiento es «Sí»: crecer un 11,0 % anual en 2027-2031e apenas pide capital y supone perder cuota (del 10,2 % al 8,0 %), no ganarla.

**Sector y ciclo.** Estamos en la fase alta: el beneficio de 9M26 crece un 80-84 % por la crisis energética, Ucrania, Australia y los apagones de Asia y África [A10]. El canal ya cayó un 59 % en dos trimestres en 2023 [A3]. Desde mayo, la UE excluye de sus fondos los inversores chinos y estudia extenderlo al mercado privado; Europa es el 32,7 % de las ventas [A9, B6].

**Finanzas.** Ventas de 4.168 a 12.224 M CNY en 2021-2025 sin compras y 17.329 M en los últimos doce meses; caja neta ajustada de unos 9.200 M tras el dividendo a cuenta de octubre. Cuentas NIIF sin salvedades (BDO); el riesgo contable es el circulante financiado por proveedores (9.666 M) y las pérdidas de cambio [A6, A9].

**Equipo y gobierno.** Control familiar del 57,5 %, padre e hijos al frente; cumplen lo que prometen y reparten el 86 % del beneficio, pero preparan una emisión en Hong Kong que no necesitan [C1, C3, D14].

**Valoración.** El DCF da 78,49 CNY con un WACC del 8,84 % y un terminal del 1 %. El precio descuenta un crecimiento del 8,6 % anual en 2027-2031e frente a nuestro 11,0 %, y una rentabilidad implícita del 9,7 %: no es exigente. El PER de los próximos doce meses (13,2) está por debajo de la mediana de los comparables (14,1). Nuestro BPA de 2028e (5,62) queda un 15 % bajo el consenso porque bajamos el margen por la mezcla y la competencia.

**Riesgos y catalizadores.** El riesgo dominante es el ciclo: el bajista (36,49 CNY, −48,9 %) repite 2023. Le siguen la exclusión europea (−15 %) y la guerra de precios. Catalizadores: informe del 3T26 el 30-oct y campaña de invierno. Los foros chinos muestran cansancio («de crecimiento a dividendo»); no añaden un riesgo nuevo.

**Qué cambiaría la decisión.** Compraríamos por debajo de 63,69 CNY y venderíamos por encima de 81,39 CNY. Pasaríamos a comprar si el 4T26 mantiene las ventas por encima de 6.000 M con margen bruto superior al 36 %, y a vender si las existencias pasan de 4.500 M con ventas en caída o si la UE propone excluir a los inversores chinos del mercado privado.`;

const resumen = {
  recomendacion: 'Mantener', conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
  sintesis,
  tesis: 'Deye es el mayor fabricante del mundo de inversores de almacenamiento para hogares (20,6 % del mercado por ingresos en 2025) y vende la batería al mismo cliente: las baterías pasaron de cero en 2022 a 4.894 M CNY en el 1S26 [B1, A6]. Con un margen EBITDA del 28-30 %, el doble que sus rivales, un circulante negativo y una caja neta de unos 9.200 M, ha multiplicado el beneficio por 5,5 en cuatro años sin compras y reparte el 86 % [A9, A1].\n\nEl precio (71,35 CNY) descuenta un crecimiento del 8,6 % anual en 2027-2031e y cotiza a 13,2 veces el beneficio de los próximos doce meses, por debajo de la mediana de los comparables (14,1) y en su mediana adelantada de los tres últimos años. El mercado no paga el +80 % de 2026 porque cree que es un pico: Ucrania, Australia y la crisis energética son demanda de emergencia, y la UE ha empezado a cerrar la puerta a los inversores chinos [A10, B6].\n\nEl mercado tiene razón a medias. El negocio es de calidad y el precio no es exigente, pero el canal ya cayó un 59 % en 2023 y el riesgo europeo es real. Para invertir hay que creer que 2027 no repetirá 2023: con nuestro caso base la acción rinde un 10 % al año, y con el bajista pierde la mitad.',
  vision_diferencial: {
    mercado_descuenta: 'Que 2026 es un pico de demanda (Ucrania, Australia, crisis energética) y que el beneficio se estancará: crecimiento implícito del 8,6 % anual en 2027-2031e y PER de 13,2 veces los próximos doce meses. Los analistas, en cambio, esperan +23-47 % de ventas en 2027e y ponen objetivos medios de 135 CNY.',
    nuestra_vision: 'Entre los dos: el beneficio crecerá en 2027e (+17 %) pero menos que lo que esperan los analistas, porque el margen bajará por la mezcla de baterías, la competencia y la exclusión europea. El caso base vale 78,49 CNY en el DCF y 76,43 CNY a 12 meses; no vemos un error grande del mercado.',
    por_que: 'La historia de 2023 enseña que el canal de distribuidores amplifica los ciclos, y los rivales chinos tienen capacidad sobrante. Nuestra diferencia con el consenso es de margen y múltiplo, no de demanda: no compramos el PER de 20 veces que aplican los bancos chinos.',
  },
  a_favor: [
    '**Líder mundial** en inversores de almacenamiento residencial, con el 20,6 % del mercado por ingresos [B1].',
    '**Margen EBITDA del 29,6 %** en 2025, frente a una mediana del 17 % de los comparables [A9, D11].',
    '**Caja neta de unos 9.200 M CNY** tras el dividendo de octubre, el 10 % de la capitalización [A6].',
    '**Beneficio de 9M26 +80-84 %** y baterías +244 % en el 1S26 [A10, A6].',
    '**Dividendo alto**: reparte el 86 % del beneficio; 1,6 CNY a cuenta ya pagados en 2026 [A1, A12].',
  ],
  en_contra: [
    '**Ciclo del canal**: las ventas trimestrales cayeron un 59 % en dos trimestres de 2023 [A3].',
    '**Exclusión europea** de inversores chinos de los fondos de la UE desde mayo de 2026; Europa es el 32,7 % de las ventas [A9, B6].',
    '**Guerra de precios**: el margen bruto de las baterías bajó 9,5 puntos en 2025 [A1].',
    '**Emisión de acciones H** pendiente, sin tamaño ni precio [D14].',
    '**Control familiar del 57,5 %** con padre e hijos en la gestión [C3].',
  ],
  que_vigilar: 'La tesis depende de que 2027 no repita la caída de 2023. La señal está en el balance y en las ventas trimestrales: si las existencias suben por encima de 4.500 M (3.855 M en junio de 2026) mientras las ventas del trimestre bajan frente al anterior, el canal está lleno. La segunda señal es Bruselas: una propuesta para excluir a los inversores chinos del mercado privado cambiaría el caso base.',
  cambiaria_recomendacion: [
    'Precio por debajo de 63,69 CNY: pasaría a Comprar (ponderada a 12 meses ≥ 15 %).',
    'Precio por encima de 81,39 CNY: pasaría a Vender.',
    'Ventas del 4T26 por debajo de 5.000 M con existencias por encima de 4.500 M: revisaríamos a la baja el caso base.',
    'Propuesta legislativa de la UE para excluir inversores chinos del mercado privado: bajaríamos el base.',
    'Margen bruto del grupo por debajo del 34 % en un trimestre: revisaríamos el margen de toda la proyección.',
  ],
  kpis_seguimiento: [
    { kpi: 'Ventas trimestrales', nivel_actual: '6.182 M (2T26)', umbral_alerta: '< 5.000 M', por_que: 'Primer síntoma de un ciclo de existencias.' },
    { kpi: 'Existencias', nivel_actual: '3.855 M (jun-26)', umbral_alerta: '> 4.500 M con ventas a la baja', por_que: 'Canal lleno.' },
    { kpi: 'Margen bruto del grupo', nivel_actual: '37,6 % (1S26)', umbral_alerta: '< 34 %', por_que: 'Guerra de precios o mezcla.' },
    { kpi: 'Ventas en Europa', nivel_actual: '32,7 % del total (2025)', umbral_alerta: 'Caída de más del 20 % interanual', por_que: 'Efecto de la exclusión europea.' },
    { kpi: 'Pérdidas de cambio', nivel_actual: '≈ 236 M (1S26)', umbral_alerta: '> 300 M en un semestre', por_que: 'Yuan fuerte.' },
  ],
  confianza: 'Media',
};

export default {
  objetivo_12m, riesgos, catalizadores, preguntas, resumen,
  dcf_lectura: 'El DCF da 78,49 CNY por acción, un 10,0 % más que el precio, con un WACC del 8,84 % y un crecimiento terminal del 1 %; el valor terminal pesa el 69 %. El DCF inverso dice que el precio de 71,35 CNY descuenta un crecimiento del 8,6 % anual en 2027-2031e frente a nuestro 11,0 %, o un margen EBITDA terminal del 22,7 % frente a nuestro 25 %, y una rentabilidad implícita del 9,7 %, algo por encima del WACC. Frente a la historia es conservador: Deye creció un 31 % anual en 2021-2025 y su margen no bajó del 28 % ni en 2023. Pero el año de partida (2026e) es un pico: el beneficio crece un 80 % y el mercado lo trata como no repetible. El valor es sensible al margen: cada punto de margen EBITDA en toda la proyección mueve el valor en torno al 4 %. Con la prima implícita del mercado (4,2 %) el valor sube con fuerza y la regla relativa da comprar; la absoluta, mantener.',
  escenarios_comentario: 'La asimetría es neutra: el alcista (107,06 CNY, +50,0 %) gana lo mismo que pierde el bajista (36,49 CNY, −48,9 %), con probabilidades de 25/50/25. El bajista no es cosmético: repite 2023, cuando las ventas trimestrales cayeron un 59 %, con un margen 5 puntos más bajo que no se recupera del todo [A3]. El alcista supone que el comercial despega y que la UE no extiende la exclusión. Con un perfil así, el precio de hoy no compensa: el valor ponderado (76,72 CNY) apenas supera el precio.',
  valoracion_comentario: 'Pesos: DCF 40 %, escenarios 40 % y comparables 20 %. El DCF y los escenarios recogen el ciclo y la caja; los comparables pesan poco porque mezclan empresas en fases distintas del ciclo (Pylontech y Kehua a 22-25 veces con beneficios deprimidos, Sungrow y CATL a 10-11). Sin transacciones con múltiplo publicado y sin suma de partes (los negocios heredados pesan menos del 6 % de las ventas del 1S26). La dispersión entre métodos es moderada: el PER de los comparables da 76,37 CNY y el EV/EBITDA de los últimos doce meses 70,16 CNY, en torno al DCF (78,49). El puente parte del balance de junio de 2026 y resta el dividendo a cuenta de 2.037 M pagado el 14-oct y la recompra de 40 M [A12, D19].',
};

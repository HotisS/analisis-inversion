// Textos del analista (Sieyuan Electric, corte 2026-10-19). Citas con la letra de la nota ([A9] = fuente 9 de A.json).
// Las cifras del motor (DCF, escenarios, objetivo a 12 meses, controles) van sin cita y se comprueban tras el último cálculo.
import F from './textos-final.mjs';

const limitaciones = 'Línea cotizada: solo acciones A de la bolsa de Shenzhen (002028), en CNY. Está en el Shenzhen-Hong Kong Stock Connect hacia el norte (lista de HKEX de valores de SZSE que se pueden comprar y vender, actualizada el 16-oct-2026), de modo que un inversor extranjero la compra desde un broker como IBKR por esa vía [D8]. No tiene acciones H ni GDR: la solicitud para cotizar en Hong Kong del 11-feb-2026 caducó y no figura entre las activas de HKEX el 15-oct-2026 [C9, C10]. Cuentas en normas chinas (CAS) de los informes de CNINFO; en el informe anual de 2025 los estados son imágenes, por lo que las series se toman de la base F10 de Eastmoney y se comprueban línea a línea contra las páginas del informe (coinciden) [A1, A13]. Acciones diluidas: 782,57 M en circulación más 6,2 M de opciones a 43,80 CNY por el método de la autocartera [A12]. El 3T26 sale el 24-oct-2026, cinco días después del corte [D9].';

const huecos = [
  { seccion: 'negocio', campo: 'peso de EE. UU. en las ventas', tipo: 'Complemento', intentos: '1) Informes anual 2025 y semestral 2026: solo «exterior» (26,9 % y 29,5 %), sin país; 2) notas de Soochow, Sinolink y Zhonghang: hablan de Europa, Oriente Medio, África y Latinoamérica, sin cifra de EE. UU.; 3) prensa sobre la orden 14420: sin cifra de Sieyuan', decision: 'Omitido: el efecto de la orden 14420 se trata en el escenario bajista sin cuantificar el peso de EE. UU.' },
];

const controles_explicados = [
  { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'El 9,2 % de 2023 sale de la conciliación del informe anual: sobre 443 M de impuesto teórico al 25 %, las filiales con tipo reducido (alta tecnología al 15 %) restan 195 M y la deducción adicional de la I+D otros 141 M [A3]. No se proyecta: el DCF usa el 13,5-15 %, en línea con 2025 (12,4 %) y el 1S26 (13,6 %) [A1, A6].' },
  { control: 'Caja proyectada coherente con la histórica', explicacion: 'El flujo libre medio de 2023-2025 (1.481 M) está deprimido por el circulante: las cuentas a cobrar crecieron un 42 % en 2025 con la exportación y el EPC, y el circulante pasó del 15,2 % al 17,5 % de las ventas [A1]. El flujo libre de los últimos doce meses a junio de 2026 ya es de 2.347 M [A6, A7, A8, A13]. La proyección mantiene el circulante en el 17 % de las ventas (no lo mejora) y el salto viene del EBITDA: 3.949 M en 2025 y 5.021 M en 2026e, con un 1S26 de 2.091 M.' },
  { control: 'Proyección propia frente a consenso (2028e)', explicacion: 'Diferencia deliberada: el consenso (12 analistas) espera ventas de 46.216 M en 2028e (+29 % anual desde 2025) con un margen EBITDA del 18,9 %; nosotros 36.858 M (+20 % y +15 % en 2027e-2028e) porque la inversión de State Grid se frena (+1 % en 7M26), la orden 14420 cierra EE. UU. y los objetivos de 2026 de la propia empresa (ventas de 27.000 M, +25 %) ya implican desacelerar [B8, B3, D2, D16]. El consenso lleva seis meses recortando [D3].' },
];

const secciones = {
  rentabilidad: {
    comentario: 'Crea valor con holgura y cada vez más. El ROIC del motor pasó del 20,8 % de 2022 al 44,2 % de 2025, frente a un WACC del 8,09 %: el margen EBIT subió del 12,8 % al 16,9 % y la rotación del capital invertido mejoró porque los anticipos de clientes (2.977 M en 2025) financian parte de las existencias [A1]. El ROE es más bajo (22,6 % en 2025) porque el patrimonio incluye unos 7.300 M de caja neta que rinde menos del 2 %. El ROIC sin fondo de comercio (47,8 %) apenas cambia: la única compra relevante, 烯晶碳能, pesa poco [A3]. El riesgo es que el ROIC de 2025 sea el de un pico de precios en las licitaciones; con el margen de 2022 (14,2 % de EBITDA) seguiría por encima del 20 %.',
    confianza: 'Media',
  },
};

export default {
  limitaciones, huecos, controles_explicados, secciones,
  suma_partes_comentario: 'No aplica: las seis líneas comparten clientes (redes y eléctricas), licitaciones y fábricas, y la empresa solo publica ventas y margen bruto por producto, sin resultado operativo por línea [A1]. Almacenamiento y supercondensadores (7 % de las ventas de 2025) no tienen un valor separable con referencia de mercado.',
  dcf_justificacion: {
    crecimiento: '2026e queda medio cerrado (+24 %): ventas del 1S26 de 10.795 M (+27 %) y objetivo de la empresa de 27.000 M, con pedidos objetivo de 37.500 M (+30 %) [A6, D16]. Después frena: +20 % en 2027e, +15 % en 2028e y del 10 % al 5 % hasta 2031e, por debajo del consenso (+29 % y +27 %) porque la red china crece al 1-5 % y EE. UU. se cierra; el crecimiento sale de la exportación (29,5 % de las ventas del 1S26) y de la cuota en China [A6, B8, B3, D2].',
    margenes: 'El margen EBITDA fue del 17,3 % en 2021, el 14,2 % en 2022, el 15,6 % en 2023, el 17,5 % en 2024 (sin el deterioro del fondo de comercio), el 18,3 % en 2025 y el 19,4 % en el 1S26 [A1, A6]. Lo dejo en el 18,8 % en 2026e (exportación de más margen en el 2S) y lo bajo tres décimas al año hasta el 17,5 % en 2031e: la escasez de transformadores que permitió subir precios en 2024-2025 se irá cerrando con la capacidad nueva en Corea, Europa y EE. UU. [B8].',
    inversion: 'Capex del 4,5 % de las ventas en 2026e (fábricas de aparamenta y transformadores aprobadas en junio por 1.080 M y la de supercondensadores) que baja al 2,5 % en 2031e, por encima de la amortización (1,5-2,0 %) [A6, A14]. El circulante comercial se queda en el 17 % de las ventas, como en 2025 (17,5 %), sin suponer mejoras [A1].',
    wacc: 'Tasa libre del 1,6497 % (bono chino a 10 años, ChinaBond, 19-oct-2026) en CNY, la divisa de los flujos [D5]. Beta de 1,0: la mensual de cinco años frente al CSI 300 es de 0,69, la semanal de dos años de 1,09 y la ajustada de 0,79; uso 1,0 porque la volatilidad de 2026 (54 % anualizada) y la exposición a la exportación hacen poco creíble una beta inferior a la del mercado [D1]. Prima de mercado del 5,5 % y prima adicional del 1,0 % por riesgo de China y de acceso a mercados. Coste de la deuda del 2,5 % y peso de la deuda del 1 % (797 M de préstamos frente a 98.404 M de capitalización) [A6]. WACC del 8,09 %.',
    terminal: 'Crecimiento a perpetuidad del 1,0 % en CNY: con el bono a 10 años al 1,65 %, el techo de la regla (tasa libre menos medio punto) es el 1,15 % [D5]. Gordon con un WACC del 8,09 % es coherente con un fabricante de equipos maduro; el valor terminal pesa el 74 % del valor.',
  },
  puente_comentarios: {
    '2026e': 'Volumen: pedidos de 2025 de 28.891 M y objetivo de 37.500 M en 2026; ventas del 1S26 +27 %. Precio ligeramente a la baja en China (licitaciones de State Grid) y efecto de cambio negativo [A1, A6, D16].',
    '2027e': 'Entregas de los pedidos de exportación de 2026 (Europa, Oriente Medio, Latinoamérica) y de las fábricas nuevas de aparamenta y transformadores; EE. UU. fuera [A6, B3].',
    '2028e': 'Exportación y ultra alta tensión en China; el precio cede a medida que entra capacidad nueva en el mundo [B8].',
    '2029e': 'Convergencia hacia el crecimiento de la inversión mundial en redes (5 % anual entre 2025 y 2031e según la serie de la IEA) con ganancia de cuota [B1].',
    '2030e': 'Crecimiento cercano al del mercado; precio unitario a la baja [B1].',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Sí. El crecimiento proyectado (13,5 % anual) pide reinvertir el 23 % del NOPAT; con el ROIC de 2025 (44,2 %) eso financia un 10,3 % anual, y el resto exige que el capital nuevo rinda un 38,6 %, por debajo del 44,2 % actual y por encima del ROIC de 2021-2023 (19-27 %): exigente pero coherente con la mejora de márgenes que ya se ha producido. La cuota implícita pasa del 0,8 % al 1,3 % de la inversión mundial en redes en 2031e: 1,6 veces la actual, por encima del límite relativo de 1,5 veces, aunque dentro del margen absoluto de 10 puntos del motor. La considero alcanzable porque parte de las ventas (almacenamiento, supercondensadores, electrónica del automóvil, un 7 %) no es inversión en redes y porque la exportación (29,5 % de las ventas) crece sobre una base pequeña, pero es el punto más exigente del caso base [A1, A6, B1].',
  narrativas: {
    Bajista: 'EE. UU. publica en diciembre reglas que excluyen los equipos chinos y Europa lo imita en parte; State Grid mantiene la inversión plana y las licitaciones bajan de precio: el crecimiento queda 6 puntos por debajo del base cada año (+14 % en 2027e) y el margen EBITDA 2,5 puntos más bajo, como en 2022 [A1, B3, B8].',
    Base: 'La exportación a Europa, Oriente Medio y emergentes compensa una red china que crece poco: ventas +20 % en 2027e y +15 % en 2028e, margen EBITDA del 18,2 % en 2028e que baja al 17,5 % en 2031e.',
    Alcista: 'La demanda de redes de los centros de datos y la falta de transformadores en Europa duran más, y Sieyuan cumple las cifras que espera el consenso: crecimiento 5 puntos mayor cada año y margen 1,5 puntos más alto [D2, B1].',
  },
  ...F,
};

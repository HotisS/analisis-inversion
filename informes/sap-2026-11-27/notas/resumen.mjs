// Resumen ejecutivo (SAP, corte 2026-11-27: transcripción del 3T26, consenso posterior y hechos de noviembre). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción baja, y sin ampliar todavía. A 12 meses, con nuestra regla de múltiplos, el objetivo es de 243,74 EUR: +26,8 % ponderado y +28,7 % en el caso base (con dividendo) sobre el cierre de 194,14 EUR del 26-nov; coincide con el objetivo medio de los analistas (243,54 EUR) [D44]. El valor intrínseco es de 199,13 EUR, un 2,6 % sobre el precio: pasa la regla con poco margen. La convicción es baja porque la regla con nuestro WACC da Mantener y solo la de la prima del mercado da Comprar, y porque la compra no aguanta un BPA un 10 % peor (ponderada del 14,3 %): solo es robusta (nivel A) por debajo de 193,03 EUR. A 194,14 EUR es nivel B (límite 199,12). Además, el ciberataque confirmado el 27-nov retrasa cualquier compra hasta que SAP aclare su alcance. Subiría con una contratación del 4T que sostenga el backlog en el 24 % o más el 28-ene; bajaría si el código alterado hubiera llegado a clientes.

**Qué ha cambiado desde el 21-oct.** No hay trimestre nuevo. La transcripción del 3T26 modera el mensaje: el director financiero avisa de que el 4T (la mitad de la contratación del año) puede sufrir por la macro y los tipos, sitúa el backlog del 4T en «un 24 % o así» en la parte alta y mantiene la aceleración de 2027 como plan «más exigente» [A17]. El consenso sube el BPA un 1-2 % y el objetivo medio de 215,76 a 243,54 EUR [D43, D44]. La acción ha caído un 7,0 % desde los resultados, casi todo del 17 al 20-nov (−13,9 %) en la venta general de la tecnología, en la que Salesforce y Oracle cayeron un 15-16 % [D52, D53]. Bloomberg publica un recorte de 10.000 empleos, sin confirmar [D51]. No tocamos crecimiento ni margen: el BPA de 2028e (9,48 EUR) queda un 1,7 % bajo el consenso.

**El negocio.** SAP es el ERP de las grandes empresas: 36.800 M de ingresos en 2025, un 86 % recurrentes, con un ROIC del 15,5 %, 6,4 puntos por encima del WACC [A1]. Su calidad sostiene el crecimiento del caso base (8,3 % anual): no necesita capital y el foso es de costes de cambio. El riesgo es de modelo: que los agentes de IA desplacen el cobro por usuario.

**Valoración.** El DCF da 202,04 EUR (WACC del 9,10 %) y el DCF inverso dice que el precio pide un crecimiento del 7,8 % anual hasta 2035, algo menos que nuestro base (8,3 %). Cotiza a 23,7 veces nuestro BPA de 2027e, lejos de su mediana adelantada (31,3 veces) y por encima de los comparables, que han caído a 17,9 veces. Con la prima de riesgo del mercado (4,41 %) el DCF sube a 245,79 EUR: la discrepancia entre las dos reglas es de tasa, no de cifras.

**Riesgos y catalizadores.** El primero es la IA: en el bajista (129,66 EUR, −33,2 %) el backlog frena y el margen se queda bajo. El segundo es nuevo: el ciberataque («Project Granite»), con código fuente copiado y alterado en GitHub según Der Spiegel; SAP no ve acceso a datos de clientes, pero no ha dicho si el código llegó a productos [D50, D54]. Catalizadores: el cierre de la investigación, los resultados del 28-ene-2027 con la guía de 2027 y la recompra, que compró 1,93 M acciones en la caída [D42].

**Qué cambiaría la decisión.** Ampliar exige que SAP aclare el ciberataque y un precio de 193,03 EUR o menos (nivel A; hasta 199,12 EUR sería nivel B, con tope del 4 %). Para quien la tiene, se mantiene mientras cotice por debajo de 223,88 EUR (filtro de mantener); la banda de venta de la regla a 12 meses empieza en 273,60 EUR. Un backlog por debajo del +20 % a divisa constante nos llevaría hacia el bajista.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `SAP es el sistema de gestión (ERP) de la mayoría de las grandes empresas del mundo y está a mitad de su paso a la nube: la nube crece un 25 % en nueve meses y el current cloud backlog (24.144 M, +26 % a divisa constante) cubre el año próximo [A14]. El 86 % de los ingresos es recurrente y el margen sube.

Tras caer un 7 % desde los resultados en la venta de noviembre de la tecnología, el precio (194,14 EUR) descuenta un crecimiento del 7,8 % anual hasta 2035, algo menos que nuestro base (8,3 %), y cotiza a 23,7 veces el BPA de 2027e, lejos de su historia (31,3 veces). A 12 meses la regla da +26,8 % y el valor intrínseco queda un 2,6 % por encima.

Para comprar hay que creer que la IA amplía el ERP en vez de abaratarlo y que la contratación del 4T sostiene la aceleración de 2027; el margen es estrecho (la compra no aguanta un BPA un 10 % peor) y el ciberataque está por aclarar [D50].`,
  vision_diferencial: {
    mercado_descuenta: 'Un crecimiento de los ingresos del 7,8 % anual hasta 2035 o un margen EBITDA del 34,7 %; el objetivo medio de los analistas (243,54 EUR) queda un 25 % por encima del precio [D44].',
    nuestra_vision: 'Crecimiento del 8,3 % y margen del 36 %, con un BPA algo por debajo del consenso (−1,7 % en 2028e). Somos más prudentes con el coste de capital (WACC del 9,10 % frente al 7,94 % que implica la prima del mercado) y con la contratación del 4T.',
    por_que: 'La diferencia con el mercado es pequeña y está en el múltiplo: la venta de noviembre ha bajado el PER a 23,7 veces sin cambio en las cifras, y la recompra aprovecha la caída [D42].',
  },
  a_favor: [
    '**Backlog que no frena**: 24.144 M, +26 % a divisa constante en el 3T26 [A14].',
    '**Consenso al alza**: BPA +1-2 % y objetivo medio de 215,76 a 243,54 EUR desde los resultados [D43, D44].',
    '**Recompras**: 11,59 M acciones en el tramo 2 y ≈ 5.300 M pendientes del programa hasta 2027 [D42].',
    '**Migración forzada**: el mantenimiento estándar de ECC termina en diciembre de 2027 [B13].',
    '**Caída de sector, no propia**: −13,9 % del 17 al 20-nov frente a −15,9 % de Salesforce y −15,0 % de Oracle [D53].',
  ],
  en_contra: [
    '**Valor intrínseco solo un 2,6 % sobre el precio** y compra que no aguanta un BPA un 10 % peor (14,3 %).',
    '**Ciberataque sin aclarar**: código fuente alterado en GitHub según la prensa [D50].',
    '**2027 más exigente**: el director financiero avisa del riesgo en la contratación del 4T [A17].',
    '**Rotación en la cúpula**: Saueressig sale en marzo, tras Alam y otras tres salidas desde 2024 [D49].',
    '**Riesgo de la IA**: el bajista vale 129,66 EUR (−33,2 %).',
  ],
  que_vigilar: `La tesis depende de que el backlog de nube siga creciendo por encima del 20 % a divisa constante después de la ola de migraciones de ECC y de que los gastos crezcan al 80-90 % de los ingresos en 2027. Las señales de que no ocurre: un backlog del 4T por debajo del 22 % el 28-ene, un margen bruto de nube por debajo del 73 % o que el código alterado del ciberataque haya llegado a productos de clientes.`,
  cambiaria_recomendacion: [
    'Si SAP confirma que el código alterado no llegó a productos de clientes, el veredicto de precio y noticias vuelve a «no cambia» y la compra queda en nivel A por debajo de 193,03 EUR y en nivel B hasta 199,12 EUR.',
    'Si el precio supera 199,13 EUR (valor intrínseco), pasaríamos a Mantener; quien la tiene la mantiene hasta 223,88 EUR (filtro de mantener). La banda de venta de la regla a 12 meses empieza en 273,60 EUR.',
    'Si el current cloud backlog del 4T crece menos de un 22 % a divisa constante o la guía de 2027 no acelera los ingresos, revisaríamos el caso base hacia el bajista.',
    'Si se confirma que el ciberataque afectó a software entregado a clientes, rehacemos el informe antes de cualquier compra.',
  ],
  kpis_seguimiento: [
    { kpi: 'Current cloud backlog (divisa constante)', nivel_actual: '24.144 M, +26 % (sep-26); guía del 4T: «un 24 % o así» en la parte alta', umbral_alerta: '< +22 % en el 4T26', por_que: 'Anticipa la nube de 2027 y la aceleración de los ingresos.' },
    { kpi: 'Ingresos de la Cloud ERP Suite', nivel_actual: '+29 % (3T26)', umbral_alerta: '< +20 %', por_que: 'Mide la migración de ECC.' },
    { kpi: 'Margen bruto de nube (NIIF)', nivel_actual: '73,9 % (3T26)', umbral_alerta: '< 73 %', por_que: 'Mide el coste de la IA.' },
    { kpi: 'Investigación del ciberataque', nivel_actual: 'Sin indicios de acceso a datos de clientes (27-nov)', umbral_alerta: 'Código alterado en productos entregados', por_que: 'Es el hecho que retrasa la compra.' },
    { kpi: 'Beneficio operativo no NIIF', nivel_actual: 'Guía 2026: 11.800-12.200 M (mantenida el 21-oct)', umbral_alerta: 'Guía 2027 de gastos por encima del 90 % del crecimiento', por_que: 'Sostiene la expansión del margen.' },
  ],
  confianza: 'Media',
};

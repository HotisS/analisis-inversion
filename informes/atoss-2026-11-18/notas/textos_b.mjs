// Textos de juicio del analista (ATOSS Software, corte 2026-11-18), segunda parte. Citas con la letra de la nota.

export const controles_explicados = [];

const confianza = (c) => ({ confianza: c });

export const secciones = {
  historia: confianza('Alta'),
  financieros: confianza('Alta'),
  trimestres: confianza('Alta'),
  balance: { ...confianza('Alta'), coste_deuda_pct: null, vida_media_anios: null },
  flujos: confianza('Alta'),
  calidad: confianza('Alta'),
  capital: confianza('Alta'),
  directivos: confianza('Alta'),
  gobierno: confianza('Alta'),
  consenso: { base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null },
  rentabilidad: {
    comentario: `ATOSS crea valor con holgura y desde siempre: sin fondo de comercio, sin deuda y con un capital operativo de unos 8 M EUR en 2025 (inmovilizado de 3,9 M, derechos de uso y comisiones activadas, menos el circulante negativo de la facturación anticipada), el ROIC fue del 553,7 % frente a un WACC del 9,70 % [A1]. La cifra es tan alta porque el denominador casi no existe: la I+D (15 % de las ventas) va a gasto y los clientes pagan por adelantado [A1]. Lo relevante es el margen: el NOPAT pasó de 20 a 46 M EUR entre 2022 y 2025 sin capital nuevo, de ahí un ROIC incremental del 616,7 %. En 2026 el margen EBIT sube al 37 % en nueve meses con la plantilla a la baja (844 personas, −1 %) [A16]. El ROE, del 54,6 %, lo diluye la caja (158,9 M de liquidez a sep-26). Frente a los competidores, el margen EBIT del 36 % de 2025 supera al 26,1 % de SAP y al 7,5 % de Workday [B9, B12]. El riesgo para el ROIC no es el capital sino el margen: cada punto de margen EBITDA vale unos 2 EUR por acción.`,
    confianza: 'Alta',
  },
  bolsa: {
    comentario: `La acción pierde un 26,0 % en 2026 y un 20,7 % en doce meses, frente a subidas del 13,1 % y del 21,6 % del SDAX, con dividendos [D9]. No lo explican las cifras, que se cumplieron (nueve meses: ventas +12 % y margen EBIT del 37 % [D34]), sino el castigo al software por la IA: del máximo de 124,0 EUR del 13-ene al mínimo de 65,0 EUR del 26-jun, rebote hasta 101,8 EUR a finales de agosto y vuelta a 82,90 EUR [D9]. Los resultados del 3T se leyeron como mixtos: −9,0 % el 23-oct por las ventas en la parte baja de la guía y +8,7 % la sesión siguiente [D36, D37]. El 17-nov cayó un 5,4 % con todo el software europeo (SAP −5,6 %) [D40]. La caída máxima de cinco años llega al 52,4 % y la volatilidad, al 44,5 %, mucho más que la de un negocio con el 73 % de ingresos recurrentes [D9, A16]. A diez años sigue siendo una de las mejores del mercado alemán: 21,5 % anual frente al 8,0 % del SDAX [D9]. No hay posiciones cortas publicadas por encima del 0,5 % [D25].`,
  },
  multiplos_historicos: {
    comentario: `A 14,3 veces el EBITDA y 24,7 veces el beneficio de los últimos doce meses, ATOSS cotiza un 44 % y un 40 % por debajo de su media de diez años (25,4x y 41,1x), en el percentil 10 de su historia. La media está inflada por 2019-2021, con tipos cero y el Bund en negativo; hoy el Bund rinde un 3,42 % [D10], así que una parte del descuento es estructural y no una oportunidad. La otra parte es el miedo a la IA: el múltiplo se ha comprimido mientras el crecimiento (11-13 % trimestral) se mantenía y el margen subía [D34]. En PER adelantado (precio de cierre ÷ BPA del año siguiente), la mediana de 2021-2025 es 36,5x y el mínimo 30,9x, frente a 22,1x hoy. El mínimo de EV/EBITDA, 13,6x en 2016, es el suelo razonable del caso bajista.`,
  },
  comparables: {
    comentario: `ATOSS cotiza a 13,0 veces el EBITDA de los próximos doce meses, por debajo de la mediana de 16,6x de los ocho comparables, y a 22,0 veces el beneficio, por encima de la mediana de 19,3x [D26-D33]. Las dos lecturas se contradicen por la base: el EBITDA de los comparables es el contable de Yahoo (con los pagos en acciones como gasto, como ATOSS), pero su BPA del consenso es el ajustado, que los excluye; en Workday el PER ajustado es 14,3x y el EV/EBITDA contable 24,6x. Por eso el EV/EBITDA es el múltiplo más limpio. ATOSS crece algo menos que la mediana (12,3 % frente al 13,7 %) con el margen EBITDA más alto después de Paychex (40 % frente al 25,7 % de mediana) y caja neta; la regresión múltiplo-crecimiento (R² 0,48) le asigna 17,7x y 109,31 EUR. El valor implícito va de 72,58 EUR por PER a 102,80 EUR por EV/EBITDA: el PER subestima por la base.`,
  },
  transacciones: {
    comentario: `Las compras de software de personal se pagaron a 6,3-7,0 veces las ventas: Dayforce (Thoma Bravo, 6,99x y 24,5x el EBITDA, con una prima del 32 %), Paycor (Paychex, 6,81x) y Cornerstone (Clearlake, 6,26x) [D14, D16, D19]. Aplicado a ATOSS da 97,15 EUR por acción, un 17,2 % sobre el precio: con márgenes del 39 % frente al 20-25 % de esos objetivos, ATOSS cotiza a 5,7 veces las ventas, cerca del múltiplo de una compra. Una opa exige el acuerdo de la familia Obereder (25,1 % de los votos en el pool) y de General Atlantic (21,6 %), cuya restricción mutua de venta vence hacia mediados de 2027 [C1, C38, D22]. Es una opción, no la tesis: pesa un 5 % en la síntesis.`,
  },
};

export const parches = [];

export const suma_partes = {
  aplica: false, descuento_holding_pct: 0, partes: [],
  comentario: 'ATOSS tiene un único segmento (NIIF 8): nube, mantenimiento, licencias y consultoría se venden juntos a los mismos clientes y no tienen comparables separados [A1]. No aplica.',
  confianza: 'Alta',
};

export const etapa2_justificacion = 'No se usa: el crecimiento converge al 5 % en 2035e dentro de los diez años explícitos.';

export const dcf_justificacion = {
  crecimiento: `2026e crece un 11,4 % (210,8 M EUR), en la parte baja de la guía de 210-215 M a la que la dirección se remitió el 23-oct por las licencias on-premise [A16]; nueve meses +12 % y un 4T de 55 M, un 10 % más que el 4T25. 2027e crece un 11,5 % (235,1 M), la parte baja de la guía de 235-245 M que dio el CFO en la conferencia [A17], un 1,1 % por debajo del consenso de Yahoo (237,7 M) [D35]; 2028e, un 11 % (261 M), un 5,3 % por debajo del consenso de MarketScreener anterior al 3T [D1]. La base es la cartera de nube a doce meses, que crece al 23 % (125,0 M a sep-26) [A16]. Desde 2029 el crecimiento baja un punto al año hasta el 5 % de 2035e: por debajo del 16,1 % anual de 2016-2025 y del 11,9 % anual previsto para el mercado europeo [B6-B8]. Antes del 3T suponíamos un 12,5 % en 2026e y 2027e.`,
  margenes: `Margen EBITDA del 39,3 % en 2026e (EBIT en torno al 37 %, la guía elevada el 23-oct, con amortizaciones del 2,3 %) [A16] y del 39,0 % en 2027e (EBIT ≈ 36,6 %, dentro del 36-37 % que dio el CFO) [A17]. Sube hasta el 40,5 % en 2030e (EBIT ≈ 38 %) por la escala de la nube y la productividad de la IA, que ya bajó la plantilla un 1 % con ventas +12 % [A16]; el 4T25 y el 3T26 tuvieron márgenes EBITDA del 42,5 % y 42,3 % [A11, A16]. No suponemos el «más del 40 % de EBIT» a largo plazo que apunta el CFO [A17]. Antes del 3T suponíamos un 37,5 % en 2026e-2027e y un 39,5 % de techo.`,
  inversion: `Capex del 2,9 % de las ventas hasta 2028e, que baja al 2,6 %: el 0,5-1,2 % de capex de caja de 2021-2025, los pagos de arrendamiento (≈ 1,8 %, NIIF 16) y el aumento de las comisiones activadas por contratos nuevos (de 7,3 a 11,4 M en 2025, ≈ 6 % de las ventas), que no pasan por el EBITDA ni por el circulante [A1]. Amortización del 2,4 %. Circulante del 2,5 % de las ventas (2,4-2,7 % en 2023-2025), con los pasivos de contrato incluidos [A1, A9]. Impuestos del 32,5 % (32,1-32,9 % en 2022-2025).`,
  wacc: `Tasa libre del 3,42 %, el Bund a diez años del 17-nov-2026 [D10]. Beta de 1,05: entre la ajustada de la acción frente al SDAX (1,22; 1,33 sin ajustar y 1,04 semanal) [D9] y la sectorial de Damodaran para software europeo (0,96 corregida por caja) [D12]. Prima de mercado del 5,5 % y prima adicional de 0,5 puntos por tamaño (1.319 M de capitalización), por el 84,5 % de las ventas en Alemania y por el relevo del fundador [A1, C10]. Sin deuda financiera: el WACC es el coste de los fondos propios, 9,70 %. Con la prima implícita del mercado (4,41 % en noviembre [D11]) sería del 8,55 %.`,
  terminal: `Crecimiento a perpetuidad del 2,5 %: inflación del euro cerca del 2 % y medio punto real, por debajo del Bund menos medio punto (2,92 %). Con el WACC del 9,70 %, el valor terminal equivale a 8,9 veces el EBITDA de 2035e, por debajo de los 16,6x de los comparables hoy y del mínimo histórico de ATOSS (13,6x). Un múltiplo de salida de 14x implicaría un crecimiento perpetuo del 4,99 %, incompatible con un negocio maduro. Usamos Gordon: el múltiplo de hoy refleja todavía el crecimiento del 11-12 %. El valor terminal pesa el 58 % del valor empresa.`,
};

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 9.4, precio_pct: 3.0, otros_pct: -1.0, comentario: 'Volumen: nube +26 % en nueve meses y cartera de nube a doce meses +23 % (125,0 M a sep-26) [A16]. Precio: cláusulas de revisión de los contratos recurrentes, cerca de la inflación (estimación propia) [A1]. Otros: la caída de las licencias on-premise (−39 % en nueve meses) resta un punto [A16].' },
    { periodo: '2027e', volumen_pct: 9.0, precio_pct: 3.0, otros_pct: -0.5, comentario: 'Parte baja de la guía de 235-245 M, según el CFO en la conferencia del 3T [A17]. El volumen sale de la cartera de nube y de un New ACV que la dirección ve crecer un 3-7 % [A17]; el precio, de las revisiones anuales (estimación propia); las licencias siguen restando.' },
    { periodo: '2028e', volumen_pct: 8.5, precio_pct: 3.0, otros_pct: -0.5, comentario: 'Retención neta del 113 % en 2025 y del 112 % en el 3T26 (objetivo ≥ 110 %) [A1, A17]: los clientes actuales aportan unos 3 puntos por precio y ampliaciones; el resto, clientes nuevos.' },
    { periodo: '2029e', volumen_pct: 8.0, precio_pct: 2.5, otros_pct: -0.5, comentario: 'Menos migraciones pendientes y precio en línea con la inflación (estimación propia).' },
  ],

  mercado_final: { periodo: '2030e', tamano: 5115 },
  veredicto: 'Sí',
  justificacion: `La calidad sostiene el crecimiento del caso base, que pide menos de lo que ATOSS ha hecho. Proyectamos un 8,4 % anual, frente al 16,1 % de 2016-2025, con la cuota del mercado europeo algo a la baja (del 6,5 % al 6,1 % en 2030e, con un mercado que crece al 11,9 % [B6-B8]). No hace falta capital: la reinversión neta es de 20 M EUR en diez años (el 2 % del NOPAT), porque el crecimiento sale de vender más software sobre la misma estructura. El precio aporta unos 3 puntos al año con cláusulas de revisión [A1], y los costes de cambio son altos (integración con nóminas y convenios). Lo que podría fallar es el volumen: las bajas de la nube subieron al 3,2 % en 2025 y la retención neta fue del 112 % en el 3T26 (113 % en 2025) [A1, A17]; las licencias caen un 39 % [A16]. Por eso el caso base queda un 1-5 % por debajo del consenso.`,
};

export const dcf_lectura = `El DCF da 81,25 EUR por acción, un 2,0 % por debajo del precio de 82,90 EUR, con un WACC del 9,70 % y el valor terminal en el 58 % del valor empresa. **El DCF inverso dice que el precio descuenta un crecimiento anual del 8,5 % en 2027e-2035e, frente al 8,1 % de nuestro caso base**: casi lo mismo. Con nuestro margen, el precio equivale a una rentabilidad anual implícita del 9,5 %, apenas por debajo de nuestro WACC del 9,70 % y por encima del 8,55 % que pide hoy el mercado. Frente al informe del 11-oct, el valor sube de 80,58 a 81,25 EUR: el margen más alto (39,3 % frente al 37,5 % en 2026e) y un Bund más bajo compensan unas ventas algo menores, y la caja crece a 158,9 M. El precio no es exigente frente a la historia (16,1 % anual en 2016-2025) ni frente a la cartera de nube (+23 %). La sensibilidad cubre de 73,91 a 90,88 EUR con el WACC y el crecimiento terminal ±0,5 puntos. La valoración depende de la tasa de descuento: con la prima del mercado, el DCF da 95,55 EUR. ATOSS está a su valor con nuestro coste de capital y barata con el del mercado.`;

export const narrativas = {
  Bajista: 'La IA y las suites de RR. HH. (Workday, SAP, UKG) frenan las altas y suben las bajas, como el New ACV plano del 1T26 prolongado: el crecimiento cae 4 puntos (7,5 % en 2027e) y el margen EBITDA 3 puntos, hasta un margen EBIT del 33-34 %, el de 2025. El mercado exige medio punto más de WACC a un software «en riesgo», como entre febrero y junio de 2026, cuando la acción pasó de 124 a 65 EUR.',
  Base: 'ATOSS cumple la guía de 2026 y 2027 en su parte baja (211 y 235 M EUR) con el margen EBIT del 37 %, la nube sigue creciendo por encima del 20 % y el crecimiento se modera un punto al año hasta el 5 % de 2035e, con el margen EBITDA en el 40,5 % desde 2030e.',
  Alcista: 'La IA se convierte en una palanca de precio (agentes de ATC y ASES desde el 4T26) y la expansión fuera de los países de habla alemana funciona: 2,5 puntos más de crecimiento y el margen EBITDA 1,5 puntos mayor (42 % al final, EBIT cerca del 40 % que apunta el CFO), con la cartera de nube creciendo al 23-25 % como hoy.',
};

export const escenarios_comentario = `La asimetría es desfavorable con nuestro WACC: el alcista da 97,59 EUR (+17,7 %) y el bajista 55,24 EUR (−33,4 %), una relación de 0,53 veces. Con la prima implícita del mercado mejora a 1,62 veces (115,71 frente a 62,67 EUR). El bajista no es cosmético: es el precio de junio de 2026 (65 EUR) con algo más de deterioro y unas 9 veces el EBITDA de 2026e. El alcista necesita que la IA sume precio en vez de restar clientes, algo que los datos aún no muestran (retención neta del 112 % en el 3T26 [A17]). Con probabilidades del 25-50-25 %, el valor ponderado (78,83 EUR) queda un 5 % por debajo del precio: no compensa comprar hoy con nuestro coste de capital.`;

export const valoracion_comentario = `El DCF pesa el 50 % porque ATOSS es un negocio estable, sin deuda y con una proyección que coincide con la guía y el consenso; los escenarios, un 30 %, para recoger la asimetría del riesgo de la IA. Los comparables pesan un 15 %: el grupo es heterogéneo y la base del PER (ajustado en los comparables, publicado en ATOSS) lo sesga a la baja. Las transacciones, un 5 %, porque exigen el acuerdo de la familia Obereder y de General Atlantic. Los métodos van de 72,58 EUR (PER de comparables) a 102,80 EUR (EV/EBITDA de comparables), y el DCF con la prima del mercado da 95,55 EUR: la dispersión la explican la base de los múltiplos y la tasa de descuento. El valor objetivo es 82,29 EUR, casi el precio. El puente es la liquidez del 30-sep-2026: 158,9 M EUR (efectivo, depósitos y oro, sin deuda) menos 5,5 M de arrendamientos y 0,7 M de pensiones [D34, D6]. Restamos además 8,6 M (estimación propia): la caja de septiembre lleva cobros anticipados que el 4T consume (en el 4T25 la liquidez bajó 2,5 M) mientras el DCF suma la parte del flujo de 2026e posterior al corte (≈ 6,1 M) [D34].`;

export const catalizadores = {
  items: [
    { fecha: '23-nov-2026', evento: 'Deutsches Eigenkapitalforum', efecto: 'Primera presentación tras el 3T; posible detalle del New ACV y del margen de 2027 [A16].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '4T26', evento: 'Lanzamiento de los agentes de IA de ASES', efecto: 'Muestra si la IA suma precio y ventas cruzadas o solo defiende la base [A13].', probabilidad: 'Media', sentido: '+' },
    { fecha: '1-ene-2027', evento: 'Krishnamoorthy, CEO; Obereder pasa al Aufsichtsrat', efecto: 'Primer relevo del fundador desde 1987; el Vorstand queda en dos personas [C10].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Finales de ene-2027', evento: 'Resultados preliminares de 2026 y guía de 2027', efecto: 'Ventas de 2026 frente a la parte baja de 210-215 M y margen del 37 %; guía de 2027 (235-245 M y margen ≥ 35 %, que el CFO ya sitúa en la parte baja y en el 36-37 %) con el nuevo CEO [A16, A17].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Abr-2027', evento: 'Junta general', efecto: 'Dividendo (≈ 75 % del BPA, unos 2,4 EUR según el consenso) y nueva votación de la remuneración, rechazada por la mayoría del capital libre en 2025 y 2026 [C3, D1].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Mediados de 2027', evento: 'Vence la restricción mutua de venta entre AOB y General Atlantic', efecto: 'General Atlantic (21,6 %) podría colocar acciones o pactar una venta con prima [C1, D22].', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Aprobación de la reforma de la ley de jornada (ArbZG)', efecto: 'El registro electrónico obligatorio ampliaría la demanda en las empresas medianas [B15].', probabilidad: 'Media', sentido: '+' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'La IA y las suites de RR. HH. erosionan las altas y la retención', tipo: 'Competencia y tecnología', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−33 % (escenario bajista)', mitigante: 'Costes de cambio altos (integración con nóminas y convenios); agentes de IA propios en 2026 [A1, A13].', senal: 'Retención neta por debajo del 110 % o bajas de la nube por encima del 4 % [A1].' },
    { riesgo: 'Desaceleración de los contratos nuevos por la economía alemana (84,5 % de las ventas en Alemania)', tipo: 'Ciclo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−11 % (2 puntos menos de crecimiento cada año)', mitigante: 'El 73 % de las ventas es recurrente y la cartera de nube a doce meses suma 125,0 M EUR (+23 %) [A16].', senal: 'Cartera de nube creciendo por debajo del 15 % interanual [A9].' },
    { riesgo: 'Relevo del fundador y CEO el 1-ene-2027', tipo: 'Gestión', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−6 % (1 punto menos de crecimiento cada año)', mitigante: 'El sucesor es el COO desde 2021 y Obereder sigue en el Aufsichtsrat con el 23,9 % [C10].', senal: 'Rebaja de la guía de 2027 o salida del CFO en 2027.' },
    { riesgo: 'Colocación del paquete de General Atlantic (21,6 %) al vencer la restricción de venta', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Presión temporal sobre el precio, sin efecto en el valor', mitigante: 'Obereder compró 28,6 M EUR en bolsa entre nov-2025 y feb-2026 y el pool familiar tiene el 25,1 % de los votos [C11-C21, C38].', senal: 'Notificación de voto de General Atlantic o colocación acelerada [C1].' },
    { riesgo: 'Margen por debajo de la guía por la inversión en IA y el centro de India, o porque el ahorro de 2026 era gasto comercial aplazado', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 % (2 puntos menos de margen EBITDA)', mitigante: 'El margen EBIT superó la guía en 2 a 7 puntos cada año desde 2022 [C1].', senal: 'Margen EBIT trimestral por debajo del 35 % (guía de 2026: en torno al 37 %) [A16].' },
    { riesgo: 'Subida del coste de capital del software', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−12 % (WACC un punto mayor)', mitigante: 'Sin deuda y con 158,9 M EUR de liquidez [A16].', senal: 'Bund a diez años por encima del 4 %.' },
    { riesgo: 'Gobierno: remuneración rechazada por los minoritarios, control conjunto del 46,7 % y salida del presidente de la comisión de auditoría', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'Sin efecto directo; limita la protección del minoritario', mitigante: 'Una acción, un voto; operaciones vinculadas mínimas (0,07 M EUR) [C1].', senal: 'Votos en contra por encima del 30 % del capital presente en 2027 [C3].' },
  ],
  premortem: `Es octubre de 2029 y la acción vale 52 EUR. En 2027 el nuevo CEO mantuvo la guía, pero los contratos nuevos siguieron planos: los grandes clientes alemanes aplazaron la renovación de su planificación de turnos a la espera de los módulos de IA de SAP y Workday, y los clientes de la nube que renovaban negociaron precios a la baja con la amenaza de cambiar. La retención neta cayó del 113 % al 104 % y las bajas de la nube subieron al 5 %. El crecimiento bajó al 7 % en 2028 y la dirección mantuvo el margen recortando la consultoría, lo que frenó aún más las altas. General Atlantic vendió su 21,6 % en dos colocaciones con descuento en 2027 y 2028, y sin un comprador natural el múltiplo cayó a 10 veces el EBITDA, el de las nóminas de EE. UU. Las señales estaban ahí desde 2025: la retención neta bajaba (116 % a 113 %), las bajas de la nube subían (2,9 % a 3,2 %) y las comisiones activadas crecían mucho más que las ventas (de 7,3 a 11,4 M EUR), es decir, cada euro de venta nueva costaba más de captar [A1]. El indicador que lo habría anticipado es la retención neta por debajo del 110 % en el informe anual de 2026.`,
  ia: { exposicion: 'Alta', sentido: 'Mixto', efecto_valor: '−33 % si se cumple el bajista; +20 % si la IA sube el precio por empleado (alcista)', comentario: 'La IA toca las dos líneas. En ventas, los agentes de planificación de las suites (Workday, SAP, UKG) y los asistentes generales pueden restar altas a un software de turnos que vende por módulos; es la causa de la caída de 124 a 65 EUR en el 1S26 y del New ACV plano del 1T26 [E5, A13]. En costes ya es palanca: la dirección atribuye a la productividad de la IA en desarrollo, ventas y soporte parte del salto del margen EBIT al 37 % en 2026, con la plantilla a la baja [A16, A17]. ATOSS lanza agentes propios en ATC y ASES (4T26) y sus datos de convenios y jornadas son difíciles de replicar. Señal de aviso: retención neta por debajo del 110 % o New ACV en caída en 2027.' },
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'IA y precio', pregunta: '¿Qué parte de los clientes de la nube ha contratado los módulos de IA y a qué precio adicional por empleado?', por_que: 'Decide si la IA es el alcista (más precio) o el bajista (bajas); hoy no se publica [A13].' },
    { tema: 'Retención', pregunta: '¿Por qué subieron las bajas de la nube al 3,2 % y la de mantenimiento al 3,0 % en 2025, y a qué competidor se fueron esos clientes?', por_que: 'Es la primera señal de la tesis bajista [A1].' },
    { tema: 'New ACV', pregunta: '¿Cuál fue el New ACV de los nueve meses en cifra, qué parte vino de clientes nuevos y por qué la dirección solo espera un 3-7 % en 2027?', por_que: 'Solo se describe cualitativamente («ligeramente por encima»); mide el crecimiento de 2027-2028 [A16, A17].' },
    { tema: 'Comisiones activadas', pregunta: '¿Por qué crecieron las comisiones activadas un 56 % en 2025 frente a un 11 % de las ventas, y en cuántos años se amortizan?', por_que: 'Encarecen la captación de clientes y no aparecen en el EBITDA [A1].' },
    { tema: 'Sucesión', pregunta: '¿Qué cambia en la estrategia con Krishnamoorthy, qué papel tendrá Obereder desde el Aufsichtsrat y quién preside ahora la comisión de auditoría?', por_que: 'El fundador dirige la empresa desde 1987, su paso al órgano de control reduce la independencia y Bauer, presidente de auditoría, salió el 30-sep [C10, C31].' },
    { tema: 'General Atlantic', pregunta: '¿Tiene General Atlantic intención de vender al vencer la restricción de 2027, y ha habido interés de compradores por el conjunto?', por_que: 'Un 21,6 % del capital que puede salir al mercado o abrir una opa [C1].' },
    { tema: 'Margen', pregunta: '¿Qué parte del salto al 37 % de margen EBIT en 2026 es ahorro permanente por la IA y qué parte es gasto comercial por debajo del presupuesto (18 % de las ventas frente al 20,3 %)?', por_que: 'Si es gasto aplazado, el margen de 2027 vuelve al 35 % y el New ACV sufre; cada punto de margen EBITDA vale unos 2 EUR por acción [A17].' },
    { tema: 'Remuneración', pregunta: '¿Por qué no incorpora el variable a largo plazo métricas de rentabilidad o de flujo de caja, pese al rechazo de la mayoría del capital libre?', por_que: 'Alinea al nuevo CEO, que no tiene el incentivo patrimonial del fundador [C2, C3].' },
  ],
  confianza: 'Alta',
};

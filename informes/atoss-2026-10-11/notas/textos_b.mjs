// Textos de juicio del analista (ATOSS Software, corte 2026-10-11), segunda parte. Citas con la letra de la nota.

export const controles_explicados = [
  { control: 'Regresión múltiplo-crecimiento', explicacion: 'Con ocho comparables el crecimiento explica poco el EV/EBITDA (R² 0,17): mezcla software europeo de márgenes medios con nóminas de EE. UU. muy rentables y poco crecimiento. La regresión no entra en la síntesis; se usan las medianas.' },
];

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
    comentario: `ATOSS crea valor con holgura y desde siempre: sin fondo de comercio, sin deuda y con un capital operativo de unos 8 M EUR en 2025 (inmovilizado de 3,9 M, derechos de uso y comisiones activadas, menos el circulante negativo de la facturación anticipada), el ROIC fue del 553,7 % frente a un WACC del 9,81 % [A1]. La cifra es tan alta porque el denominador casi no existe: la I+D (15 % de las ventas) va a gasto y los clientes pagan por adelantado [A1]. Lo relevante es el margen: el NOPAT pasó de 20 a 46 M EUR entre 2022 y 2025 sin capital nuevo, de ahí un ROIC incremental del 616,7 %. El ROE, del 54,6 %, lo diluye la caja (91,2 M en efectivo a dic-25 más depósitos y oro). Frente a los competidores, el margen EBIT del 36 % supera al 26,1 % de SAP y al 7,5 % de Workday [B9, B12]. El riesgo para el ROIC no es el capital sino el margen: cada punto de margen EBITDA vale unos 2 EUR por acción.`,
    confianza: 'Alta',
  },
  bolsa: {
    comentario: `La acción pierde un 22,1 % en 2026 y un 17,8 % en doce meses, frente a subidas del 10,2 % y del 15,5 % del SDAX, con dividendos [D9]. No lo explican las cifras, que se cumplieron (1S26: ventas +12 % y margen EBIT del 35 % [A9]), sino el castigo al software por la IA: del máximo de 124,0 EUR del 13-ene-2026 al mínimo de 65,0 EUR del 26-jun, con caídas diarias del 8,1 % el 3-feb y del 7,6 % el 25-sep [D9, E5]. La caída máxima de cinco años llega al 52,4 % y la volatilidad, al 44,4 %, mucho más que la de un negocio con el 72 % de ingresos recurrentes [D9, A9]. A diez años sigue siendo una de las mejores del mercado alemán: 22,5 % anual frente al 7,6 % del SDAX [D9]. No hay posiciones cortas publicadas por encima del 0,5 % [D25].`,
  },
  multiplos_historicos: {
    comentario: `A 16,3 veces el EBITDA y 27,2 veces el beneficio de los últimos doce meses, ATOSS cotiza un 36 % y un 34 % por debajo de su media de diez años (25,4x y 41,1x), en el percentil 20 y 10 de su historia. La media está inflada por 2019-2021, con tipos cero y el Bund en negativo; hoy el Bund rinde un 3,53 % [D10], así que una parte del descuento es estructural y no una oportunidad. La otra parte es el miedo a la IA: el múltiplo se ha comprimido mientras el crecimiento (11-13 % trimestral) y el margen se mantenían [A9]. El mínimo de la serie, 13,6x, es el de 2016, cuando ATOSS facturaba 50 M EUR y su margen EBITDA era del 29 %: un suelo razonable para el caso bajista.`,
  },
  comparables: {
    comentario: `ATOSS cotiza a 14,3 veces el EBITDA de los próximos doce meses, por encima de la mediana de 12,4x de los ocho comparables, y a 23,7 veces el beneficio, algo por debajo de la mediana de 24,6x [D26-D33]. La prima en EV/EBITDA se justifica a medias: crece en línea con la mediana (13,8 % frente al 10 %), tiene el mayor margen EBITDA (39 % frente al 32,6 %) después de Paychex y Paycom, y caja neta; pero es unas 160 veces más pequeña que SAP y depende de Alemania. Ojo con la base: el EBITDA de Workday, Paycom y Paylocity excluye los pagos en acciones, así que sus múltiplos parecen más baratos de lo que son; sin Workday la mediana apenas cambia (12,5x). La regresión múltiplo-crecimiento no explica nada (R² 0,17) y no se usa. El valor implícito, 76,23 EUR por EV/EBITDA y 90,61 EUR por PER, deja el precio en medio.`,
  },
  transacciones: {
    comentario: `Las compras de software de personal se pagaron a 6,3-7,0 veces las ventas: Dayforce (Thoma Bravo, 6,99x y 24,5x el EBITDA, con una prima del 32 %), Paycor (Paychex, 6,81x) y Cornerstone (Clearlake, 6,26x) [D14, D16, D19]. Aplicado a ATOSS da 93,04 EUR por acción, solo un 6,6 % sobre el precio: con márgenes del 38 % frente al 20-25 % de esos objetivos, ATOSS ya cotiza en bolsa a casi el múltiplo de ventas de una compra. Una opa exige el acuerdo de Obereder (23,9 %) y General Atlantic (21,6 %), cuya restricción mutua de venta vence hacia mediados de 2027 [C1, D22]. Es una opción, no la tesis: pesa un 5 % en la síntesis.`,
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
  crecimiento: `2026e crece un 12,5 % (213 M EUR), en la mitad alta de la guía de 210-215 M confirmada el 24-jul y el 11-ago [A9, A10] y en línea con el 12 % del 1S26; el consenso espera 213,6 M [D1]. 2027e repite el 12,5 % (240 M), dentro de la guía de 235-245 M y un 1,3 % por debajo del consenso; 2028e, un 12 % (268 M), un 2,7 % por debajo [D1]. La base es la cartera de nube a doce meses, que crece al 25 % (120,7 M a jun-26) [A9]. Desde 2029 el crecimiento baja un punto al año hasta el 5 % de 2035e: por debajo del 16,1 % anual de 2016-2025 y del 11,9 % anual previsto para el mercado europeo [B6-B8].`,
  margenes: `Margen EBITDA del 37,5 % en 2026e y 2027e, que con amortizaciones del 2,4 % equivale a un margen EBIT del 35 %, el de la guía de 2027 (al menos el 35 %) y el del 1S26 [A9, A10]. Sube medio punto al año hasta el 39,5 % en 2031e por la escala de la nube, ya alcanzado en 2024 (39,8 %) y por debajo del 42,5 % del 4T25 [A1]. No suponemos la vuelta al máximo: la inversión en IA y en el centro de desarrollo de India pesa en el margen [A1]. El consenso pide un 38,1 % en 2028e, por encima de nuestro 38 % [D1].`,
  inversion: `Capex del 2,9 % de las ventas hasta 2028e, que baja al 2,6 %: el 0,5-1,2 % de capex de caja de 2021-2025, los pagos de arrendamiento (≈ 1,8 %, NIIF 16) y el aumento de las comisiones activadas por contratos nuevos (de 7,3 a 11,4 M en 2025, ≈ 6 % de las ventas), que no pasan por el EBITDA ni por el circulante [A1]. Amortización del 2,4 %. Circulante del 2,5 % de las ventas (2,4-2,7 % en 2023-2025), con los pasivos de contrato incluidos: al cierre son pequeños (3,3 M) porque se factura en enero, pero llegan a 10,7 M a junio [A1, A9]. Impuestos del 32,5 % (32,1-32,9 % en 2022-2025).`,
  wacc: `Tasa libre del 3,53 %, el Bund a diez años del 9-oct-2026 [D10]. Beta de 1,05: entre la ajustada de la acción frente al SDAX (1,18; 1,27 sin ajustar y 1,03 semanal) [D9] y la sectorial de Damodaran para software europeo (0,96 corregida por caja) [D12]. Prima de mercado del 5,5 % y prima adicional de 0,5 puntos por tamaño (1.389 M de capitalización), por el 84,5 % de las ventas en Alemania y por el relevo del fundador [A1, C10]. Sin deuda financiera: el WACC es el coste de los fondos propios, 9,81 %. Con la prima implícita del mercado (4,2 % [D11]) sería del 8,44 %.`,
  terminal: `Crecimiento a perpetuidad del 2,5 %: inflación del euro cerca del 2 % y medio punto real, por debajo del Bund menos medio punto (3,03 %). Con el WACC del 9,81 %, el valor terminal equivale a 8,8 veces el EBITDA de 2035e, por debajo del 12,4x de los comparables hoy y del mínimo histórico de ATOSS (13,6x). Un múltiplo de salida de 14x implicaría un crecimiento perpetuo del 5,11 %, incompatible con un negocio maduro. Usamos Gordon: el múltiplo de hoy refleja todavía el crecimiento del 12 %. El valor terminal pesa el 58 % del valor empresa.`,
};

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 9.0, precio_pct: 3.0, otros_pct: 0.5, comentario: 'Volumen: clientes nuevos (la mitad de los contratos firmados) y migración a la nube, con la cartera de nube +25 % [A9, A13]. Precio: cláusulas de revisión en los contratos recurrentes, cerca de la inflación (estimación propia) [A1]. Otros: mezcla de nube frente a licencias.' },
    { periodo: '2027e', volumen_pct: 9.0, precio_pct: 3.0, otros_pct: 0.5, comentario: 'Guía de 235-245 M [A10]. El volumen sale de la cartera de nube y del repunte del New ACV del 2T26 [A15]; el precio, de las revisiones anuales (estimación propia).' },
    { periodo: '2028e', volumen_pct: 8.5, precio_pct: 3.0, otros_pct: 0.5, comentario: 'Retención neta del 113 % (objetivo ≥ 110 %) [A1]: los clientes actuales aportan unos 3 puntos por precio y ampliaciones; el resto, clientes nuevos.' },
    { periodo: '2029e', volumen_pct: 8.0, precio_pct: 2.5, otros_pct: 0.5, comentario: 'Menos migraciones pendientes y precio en línea con la inflación (estimación propia).' },
  ],
  mercado_final: { periodo: '2030e', tamano: 5115 },
  veredicto: 'Sí',
  justificacion: `La calidad sostiene el crecimiento del caso base, que pide menos de lo que ATOSS ha hecho. Proyectamos un 9,3 % anual, frente al 16,1 % de 2016-2025, con la cuota del mercado europeo casi estable (del 6,5 % al 6,4 % en 2030e, con un mercado que crece al 11,9 % [B6-B8]). No hace falta capital: la reinversión neta es de 20 M EUR en diez años (el 2 % del NOPAT), porque el crecimiento sale de vender más software sobre la misma estructura. El precio aporta unos 3 puntos al año con cláusulas de revisión [A1], y los costes de cambio son altos (integración con nóminas y convenios). Lo que podría fallar es el volumen: las bajas de la nube subieron al 3,2 % y la retención neta bajó al 113 % en 2025 [A1]. Por eso el caso base queda un 1-3 % por debajo del consenso.`,
};

export const dcf_lectura = `El DCF da 80,58 EUR por acción, un 7,7 % por debajo del precio de 87,30 EUR, con un WACC del 9,81 % y el valor terminal en el 58 % del valor empresa. **El DCF inverso dice que el precio descuenta un crecimiento anual del 10,3 % en 2027e-2035e, frente al 8,9 % de nuestro caso base**: 1,4 puntos más al año durante nueve años. Con nuestro margen, el precio equivale a una rentabilidad anual implícita del 9,2 %, por debajo de nuestro WACC del 9,81 % y por encima del 8,44 % que pide hoy el mercado. Por tanto, el precio no es exigente frente a la historia (16,1 % anual en 2016-2025) pero sí frente a un crecimiento que ya se ha moderado al 11-13 % trimestral y una retención que empeora. Todo cabe en la sensibilidad: con el WACC del 8,8 % el DCF da 92,95 EUR y con el 10,8 %, 71,25 EUR. La valoración depende más de la tasa de descuento que de las cifras, que coinciden con el consenso con diferencias del 1-3 %: ATOSS está bien valorada si se acepta el coste de capital que hoy pide el mercado y algo cara con el nuestro.`;

export const narrativas = {
  Bajista: 'La IA y las suites de RR. HH. (Workday, SAP, UKG) frenan las altas y suben las bajas, como el New ACV plano del 1T26 prolongado: el crecimiento cae 4 puntos (cerca del 8 % en 2027e) y el margen EBITDA 3 puntos, hasta un margen EBIT del 32 %, el suelo de la guía inicial de 2026. El mercado exige medio punto más de WACC a un software «en riesgo», como entre febrero y junio de 2026, cuando la acción pasó de 124 a 65 EUR.',
  Base: 'ATOSS cumple la guía de 2026 y 2027 (213 y 240 M EUR, margen EBIT del 35 %), la nube sigue creciendo por encima del 20 % y el crecimiento se modera un punto al año hasta el 5 % de 2035e, con el margen EBITDA en el 39,5 % desde 2031e.',
  Alcista: 'La IA se convierte en una palanca de precio (agentes de ATC y ASES desde el 4T26) y la expansión fuera de los países de habla alemana funciona: 2,5 puntos más de crecimiento y el margen de 2024 (EBITDA cerca del 41 % al final), con la cartera de nube creciendo al 25 % como hoy.',
};

export const escenarios_comentario = `La asimetría es desfavorable con nuestro WACC: el alcista da 97,18 EUR (+11,3 %) y el bajista 54,15 EUR (−38,0 %), una relación de 0,30 veces. Con la prima implícita del mercado mejora a 1,37 veces (119,89 frente a 63,46 EUR). El bajista no es cosmético: es el precio de junio de 2026 (65 EUR) con algo más de deterioro, y supone unas 9,3 veces el EBITDA de 2026e, cerca de las 9,1 veces de Paycom hoy [D30]. El alcista necesita que la IA sume precio en vez de restar clientes, algo que los datos aún no muestran (retención neta del 113 %, a la baja [A1]). Con probabilidades del 25-50-25 %, el valor ponderado queda por debajo del precio: no compensa comprar hoy.`;

export const valoracion_comentario = `El DCF pesa el 50 % porque ATOSS es un negocio estable, sin deuda y con una proyección que coincide con la guía y el consenso; los escenarios, un 30 %, para recoger la asimetría del riesgo de la IA. Los comparables pesan un 15 %: el grupo es heterogéneo (software europeo y nóminas de EE. UU. con EBITDA sin pagos en acciones) y la regresión no explica nada. Las transacciones, un 5 %, porque exigen el acuerdo del fundador y de General Atlantic. Los métodos van de 76,23 EUR (EV/EBITDA de comparables) a 93,04 EUR (transacciones), y el DCF con la prima del mercado da 98,51 EUR: la dispersión la explica casi entera la tasa de descuento. El puente es el balance del 30-jun-2026: 121,3 M EUR de liquidez (efectivo, depósitos y oro) y 5,5 M de arrendamientos, tras pagar el dividendo de 36,3 M en mayo [A9, D6]. Esa caja incluye 7,4 M más de facturación anticipada que al cierre del año (10,7 M de pasivos de contrato frente a 3,3 M), que se consumirán en el segundo semestre; lo compensa la caja del tercer trimestre, que el puente no recoge [A9].`;

export const catalizadores = {
  items: [
    { fecha: '23-oct-2026', evento: 'Resultados del 3T26', efecto: 'Primera prueba del repunte del New ACV del 2T26 y de la cartera de nube; el punto medio de la guía exige ventas del 2S26 un 12 % por encima del 2S25 [A9].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '4T26', evento: 'Lanzamiento de los agentes de IA de ASES', efecto: 'Muestra si la IA suma precio y ventas cruzadas o solo defiende la base [A13].', probabilidad: 'Media', sentido: '+' },
    { fecha: '1-ene-2027', evento: 'Krishnamoorthy, CEO; Obereder pasa al Aufsichtsrat', efecto: 'Primer relevo del fundador desde 1987; el Vorstand queda en dos personas [C10].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Finales de ene-2027', evento: 'Resultados preliminares de 2026 y guía de 2027', efecto: 'Confirmación o rebaja de la guía de 235-245 M EUR y margen EBIT ≥ 35 % con el nuevo CEO [A10].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Abr-2027', evento: 'Junta general', efecto: 'Dividendo (≈ 75 % del BPA, unos 2,4 EUR según el consenso) y nueva votación de la remuneración, rechazada por la mayoría del capital libre en 2025 y 2026 [C3, D1].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Mediados de 2027', evento: 'Vence la restricción mutua de venta entre AOB y General Atlantic', efecto: 'General Atlantic (21,6 %) podría colocar acciones o pactar una venta con prima [C1, D22].', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Aprobación de la reforma de la ley de jornada (ArbZG)', efecto: 'El registro electrónico obligatorio ampliaría la demanda en las empresas medianas [B15].', probabilidad: 'Media', sentido: '+' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'La IA y las suites de RR. HH. erosionan las altas y la retención', tipo: 'Competencia y tecnología', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−38 % (escenario bajista)', mitigante: 'Costes de cambio altos (integración con nóminas y convenios); agentes de IA propios en 2026 [A1, A13].', senal: 'Retención neta por debajo del 110 % o bajas de la nube por encima del 4 % [A1].' },
    { riesgo: 'Desaceleración de los contratos nuevos por la economía alemana (84,5 % de las ventas en Alemania)', tipo: 'Ciclo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−11 % (2 puntos menos de crecimiento cada año)', mitigante: 'El 72 % de las ventas es recurrente y la cartera de nube a doce meses suma 120,7 M EUR [A9].', senal: 'Cartera de nube creciendo por debajo del 15 % interanual [A9].' },
    { riesgo: 'Relevo del fundador y CEO el 1-ene-2027', tipo: 'Gestión', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−6 % (1 punto menos de crecimiento cada año)', mitigante: 'El sucesor es el COO desde 2021 y Obereder sigue en el Aufsichtsrat con el 23,9 % [C10].', senal: 'Rebaja de la guía de 2027 o salida del CFO en 2027.' },
    { riesgo: 'Colocación del paquete de General Atlantic (21,6 %) al vencer la restricción de venta', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Presión temporal sobre el precio, sin efecto en el valor', mitigante: 'Obereder compró 28,6 M EUR en bolsa entre nov-2025 y feb-2026 y puede absorber papel [C11-C21].', senal: 'Notificación de voto de General Atlantic o colocación acelerada [C1].' },
    { riesgo: 'Margen por debajo de la guía por la inversión en IA y el centro de India', tipo: 'Operativo', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 % (2 puntos menos de margen EBITDA)', mitigante: 'El margen EBIT superó la guía en 2 a 7 puntos cada año desde 2022 [C1].', senal: 'Margen EBIT trimestral por debajo del 33 %.' },
    { riesgo: 'Subida del coste de capital del software', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−12 % (WACC un punto mayor)', mitigante: 'Sin deuda y con 121,3 M EUR de liquidez [A9].', senal: 'Bund a diez años por encima del 4 %.' },
    { riesgo: 'Gobierno: remuneración rechazada por los minoritarios y control conjunto del 45,5 %', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'Sin efecto directo; limita la protección del minoritario', mitigante: 'Una acción, un voto; operaciones vinculadas mínimas (0,07 M EUR) [C1].', senal: 'Votos en contra por encima del 30 % del capital presente en 2027 [C3].' },
  ],
  premortem: `Es octubre de 2029 y la acción vale 52 EUR. En 2027 el nuevo CEO mantuvo la guía, pero los contratos nuevos siguieron planos: los grandes clientes alemanes aplazaron la renovación de su planificación de turnos a la espera de los módulos de IA de SAP y Workday, y los clientes de la nube que renovaban negociaron precios a la baja con la amenaza de cambiar. La retención neta cayó del 113 % al 104 % y las bajas de la nube subieron al 5 %. El crecimiento bajó al 7 % en 2028 y la dirección mantuvo el margen recortando la consultoría, lo que frenó aún más las altas. General Atlantic vendió su 21,6 % en dos colocaciones con descuento en 2027 y 2028, y sin un comprador natural el múltiplo cayó a 10 veces el EBITDA, el de las nóminas de EE. UU. Las señales estaban ahí desde 2025: la retención neta bajaba (116 % a 113 %), las bajas de la nube subían (2,9 % a 3,2 %) y las comisiones activadas crecían mucho más que las ventas (de 7,3 a 11,4 M EUR), es decir, cada euro de venta nueva costaba más de captar [A1]. El indicador que lo habría anticipado es la retención neta por debajo del 110 % en el informe anual de 2026.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'IA y precio', pregunta: '¿Qué parte de los clientes de la nube ha contratado los módulos de IA y a qué precio adicional por empleado?', por_que: 'Decide si la IA es el alcista (más precio) o el bajista (bajas); hoy no se publica [A13].' },
    { tema: 'Retención', pregunta: '¿Por qué subieron las bajas de la nube al 3,2 % y la de mantenimiento al 3,0 % en 2025, y a qué competidor se fueron esos clientes?', por_que: 'Es la primera señal de la tesis bajista [A1].' },
    { tema: 'New ACV', pregunta: '¿Cuál fue el New ACV del 1S26 en cifra y qué parte vino de clientes nuevos frente a migraciones?', por_que: 'Solo se describe cualitativamente; mide el crecimiento de 2027-2028 [A9].' },
    { tema: 'Comisiones activadas', pregunta: '¿Por qué crecieron las comisiones activadas un 56 % en 2025 frente a un 11 % de las ventas, y en cuántos años se amortizan?', por_que: 'Encarecen la captación de clientes y no aparecen en el EBITDA [A1].' },
    { tema: 'Sucesión', pregunta: '¿Qué cambia en la estrategia con Krishnamoorthy, y qué papel tendrá Obereder desde el Aufsichtsrat?', por_que: 'El fundador dirige la empresa desde 1987 y su paso al órgano de control reduce la independencia [C10].' },
    { tema: 'General Atlantic', pregunta: '¿Tiene General Atlantic intención de vender al vencer la restricción de 2027, y ha habido interés de compradores por el conjunto?', por_que: 'Un 21,6 % del capital que puede salir al mercado o abrir una opa [C1].' },
    { tema: 'Margen', pregunta: '¿Qué margen EBIT espera la dirección una vez completado el centro de India, y a qué plazo vuelve el 37 % de 2024?', por_que: 'Cada punto de margen EBITDA vale unos 2 EUR por acción.' },
    { tema: 'Remuneración', pregunta: '¿Por qué no incorpora el variable a largo plazo métricas de rentabilidad o de flujo de caja, pese al rechazo de la mayoría del capital libre?', por_que: 'Alinea al nuevo CEO, que no tiene el incentivo patrimonial del fundador [C2, C3].' },
  ],
  confianza: 'Alta',
};

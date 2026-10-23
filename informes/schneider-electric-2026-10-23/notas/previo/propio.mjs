// Parte del analista (Schneider Electric, corte 2026-10-14). Citas con la letra de la nota.
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { R = null; }
// Proyección sobre 2025 (≈40.000 M EUR). EBITDA = EBITA ajustado + amortización de inmovilizado (3,5 % de las ventas, estimación).
const crec = [8.0, 9.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.5, 3.5, 3.0];
const margen = [23.1, 23.6, 24.0, 24.4, 24.7, 24.7, 24.7, 24.7, 24.7, 24.7];
const anios = crec.map((g, i) => ({ periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 3.5, capex_pct_ventas: i < 5 ? 4.0 : 3.7, nwc_pct_ventas: 0, tasa_impositiva_pct: 23, fijo: i === 0 }));
const pc = {
  '2026e': 'Orgánico del 10-13 % (guía subida en julio [A4]) menos ≈4-5 puntos de divisa (dólar débil): 8 % reportado.',
  '2027e': 'Centros de datos y redes (volumen ≈6 %) y precio ≈3 %, en la banda del 7-10 % orgánico del plan 2030 [A6].',
  '2028e': 'Igual que 2027e.', '2029e': 'Normalización de centros de datos.', '2030e': 'Hacia el suelo del plan (7 %).' };
export default {
  meta: { fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones', cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (UE)', formato_cuenta: 'funcion',
    limitaciones: 'Entorno sin acceso a documentos: todas las cifras salen de resultados de búsqueda web (comunicados de la empresa en el depósito OPENDATA de la AMF, Quartr, prensa), con su URL. Precio de 272,80 EUR del 5-oct-2026 (último hallado). EBITDA y amortización estimados (EBITA ajustado publicado + 3,5 % de las ventas); balance y flujos solo con cifras de cabecera. Cierres anuales 2020-2024 estimados. Sector, competencia y gobierno omitidos por un presupuesto de 18 minutos. Las ventas del 3T26 se publican el 29-oct-2026.',
    controles_explicados: [{ control: 'Al menos 5 comparables', explicacion: 'Solo Legrand con PER adelantado verificable (24x 2026e); el sector eléctrico europeo cotiza a 25,7-26,9x según Simply Wall St [D5, D6]. Peso de comparables 10 %.' },
    { control: 'BPA = beneficio neto / acciones', explicacion: 'El BPA es el ajustado de la empresa (sin amortización de intangibles de compras ni reestructuración) y el beneficio neto, el reportado; la diferencia es esa amortización (≈0,5-1,1 EUR por acción).' },
    { control: 'EBITDA del consenso en la base de las cuentas', explicacion: 'Sin consenso de EBITDA; solo BPA adelantado.' },
    { control: 'Sección de núcleo con datos', explicacion: 'Sector, competencia, rentabilidad, directivos y gobierno omitidos por un presupuesto de 18 minutos en un entorno solo con búsqueda web; registrados como huecos.' },
    { control: 'Tres búsquedas registradas', explicacion: 'Por el presupuesto (18 minutos, búsquedas compartidas) varios huecos no complementarios tienen menos de tres intentos.' },
    { control: 'Al menos 25 fuentes', explicacion: '21 fuentes por el presupuesto de tiempo.' },
    { control: 'Al menos 10 fuentes primarias', explicacion: 'Solo tres comunicados de la empresa accesibles vía búsqueda.' },
    { control: 'Fuentes sin citar', explicacion: 'Fuentes de contraste listadas sin cita en el texto.' }] },
  secciones: {
    financieros: { comentario: 'Ventas de 28.905 M EUR en 2021 a unos 40.000 M en 2025 (+9 % orgánico en 2025); EBITA ajustado de 5.000 M (17,3 %) a 7.500 M (18,7 %) [A2, A3]. BPA ajustado de 6,13 a 8,59 EUR; en 2025 solo +3 % reportado frente a +13,6 % orgánico por la divisa [A3]. En 1S26, ventas de 21.226 M (+14 % orgánico), EBITA ajustado de 4.100 M (19,3 %) y BPA ajustado de 4,79 (+21 %) [A4].', ajustes: 'El informe usa el BPA ajustado de la empresa (sin amortización de intangibles de compras ni reestructuración) para el PER y el objetivo a 12 meses.' },
    balance: { comentario: 'Deuda financiera neta de unos 15.400 M EUR a jun-26 (≈1,6 veces el EBITDA estimado de los últimos 12 meses) tras el dividendo, las recompras y las compras de Cognite y AiDASH [A4]; la empresa mantiene el compromiso de rating A [A7].' },
    rentabilidad: { comentario: 'ROIC estimado con datos incompletos (sin balance histórico): el objetivo de la empresa es un ROCE del 15-20 % [A6].' },
    consenso: { guidance: '2026 (subida el 30-jul): crecimiento orgánico de las ventas del 10-13 % y mejora del margen EBITA ajustado de 70-100 pb; EBITA ajustado +14-19 % orgánico [A4]. Plan 2026-2030: ventas +7-10 % orgánico anual, +250 pb de margen acumulado, conversión de caja ≈100 %, recompras de 2.500-3.500 M [A6].' },
    multiplos_historicos: { comentario: 'PER sobre BPA ajustado al cierre de cada año: 2021 28,1x, 2022 18,4x, 2023 25,0x, 2024 29,0x, 2025 27,5x (2020, 25,1x, excluido por BPA deprimido por la pandemia) [A1-A3, D4]. Cierres de 2020-2024 estimados.' },
    sentimiento: { lectura: 'Sentimiento positivo pero con la valoración en debate: el mercado premia los centros de datos y la guía subida, y la discusión es cuánto queda por descontar. No señala ni euforia ni capitulación: el precio está en la mitad alta de su rango de 52 semanas (220,40-312,30 EUR).' },
  },
  dcf: { anios,
    wacc: { tasa_libre_pct: 3.4, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 23, peso_deuda_pct: 8 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 16 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null }, mitad_de_anio: true,
    justificacion: { crecimiento: '8 % en 2026e (fijo: 10-13 % orgánico menos divisa), 9 % en 2027-2028e (plan 2030: 7-10 % orgánico [A6]) y bajada gradual al 3 % en 2035e.', margenes: 'EBITA ajustado del 19,6 % en 2026e (+90 pb, guía de 70-100 [A4]) hasta el 21,2 % en 2030e (+250 pb del plan [A6]); EBITDA = EBITA + 3,5 %.', inversion: 'Capex del 4 % hasta 2030e (incluye circulante; sin circulante en el balance) y 3,7 % después; amortización del 3,5 %.', wacc: 'OAT a 10 años del 3,4 % (estimación), beta 1,1 (estimación), prima del 5,5 %, coste de la deuda del 3,5 % (rating A), 8 % de deuda a mercado.', terminal: 'Gordon con un 2,5 %.' },
    sostenibilidad: { puente_ingresos: [
      { periodo: '2026e', volumen_pct: 8.5, precio_pct: 3.0, otros_pct: -3.5, comentario: pc['2026e'] },
      { periodo: '2027e', volumen_pct: 6.0, precio_pct: 3.0, otros_pct: 0, comentario: pc['2027e'] },
      { periodo: '2028e', volumen_pct: 6.0, precio_pct: 3.0, otros_pct: 0, comentario: pc['2028e'] },
      { periodo: '2029e', volumen_pct: 5.0, precio_pct: 3.0, otros_pct: 0, comentario: pc['2029e'] },
      { periodo: '2030e', volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 0, comentario: pc['2030e'] } ],
      mercado_final: null, veredicto: 'Sí',
      justificacion: 'La proyección pide un 9 % anual en 2027-2028e, dentro del 7-10 % orgánico del plan 2030 [A6] y por debajo del 14 % orgánico del 1S26 [A4]; el margen llega al 21,2 % EBITA, exactamente el plan (+250 pb), sin superarlo. La reinversión es baja (capex del 4 %) porque el crecimiento es de equipos, no de activos. Mercado final no medido (sector omitido).' },
    lectura: null, confianza: 'Baja' },
  escenarios: { casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, narrativa: 'El gasto en centros de datos se frena en 2027 (sobrecapacidad, eficiencia de la IA) y la construcción europea sigue floja: crecimiento 3 puntos menor y margen 1,5 puntos menor.' },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: 'Se cumple el plan 2030: 9 % anual reportado en 2027-28 y +250 pb de margen.' },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 1, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: 'Centros de datos y redes mantienen dos dígitos: crecimiento 2 puntos mayor y margen 1 punto mayor.' } ],
    comentario: null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: sin datos de resultado por segmento.', confianza: 'Baja' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 15400, arrendamientos: 0, caja: 0, minoritarios: 1000, pensiones: 1000, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth, octubre de 2026 [P1]' },
    pesos: { dcf: 55, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 35 },
    objetivo_12m: { ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 11.50, multiplo: null, precio: null, justificacion: 'Ventas de 48.540 M EUR en 2028e (−3 puntos en 2027-28) con EBITA ajustado del 19,0 %: 9.223 M, −500 M financieros, impuesto del 23 %, −230 M de minoritarios y 564 M de acciones.' },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 13.24, multiplo: null, precio: null, justificacion: 'Ventas de 51.326 M EUR (8 %, 9 %, 9 %) con EBITA ajustado del 20,5 % (EBITDA 24,0 % − 3,5 %): 10.522 M, −500 M financieros, impuesto del 23 %, −250 M de minoritarios y 564 M de acciones sin recompras.' },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 14.48, multiplo: null, precio: null, justificacion: 'Ventas de 53.224 M EUR (+2 puntos) con EBITA ajustado del 21,5 %: 11.443 M, −500 M financieros, impuesto del 23 % y −260 M de minoritarios.' } ],
      per_historico: { actual: 23.1, mediana_5a: 27.5, minimo_5a: 18.4, media_larga: 25.5, excluidos: '2020 excluido (BPA deprimido por la pandemia). BPA ajustado: 2021 28,1x (172,5/6,13); 2022 18,4x (130,7/7,11); 2023 25,0x (181,8/7,26); 2024 29,0x (240,9/8,32); 2025 27,5x (236,2/8,59) [A1-A3, D4]. Media larga 2020-2025 (seis años, no ocho). Actual = 272,80 ÷ 11,81 (nuestro BPA ajustado de 2027e).' },
      comparables_per: { mediana: 26.0 },
      consenso: { bpa_ano1: 12.14, bpa_ano2: null, objetivo_medio: 322.31, objetivo_min: null, objetivo_max: null, analistas: 26, tendencia_3m: 'al alza', fuente: 'AllInvestView e Investing.com [D1, D3]' },
      diferencia_consenso: 'El objetivo medio de los analistas (322,31 EUR) queda un 5 % por encima de nuestro base: aplican el PER de 27-28 veces de 2024-2025, mientras la regla común toma el PER actual sobre nuestro BPA de 2027e (23,1 veces). El BPA adelantado del consenso (12,14 EUR, ejercicio no indicado) es coherente con nuestro 11,81 de 2027e.',
      media: null, comentario: 'BPA ajustado propio de 2028e × PER de la regla común; ponderado 25/50/25.' },
    comentario: 'Pesos: DCF 55 %, escenarios 35 %, comparables 10 % (un solo comparable verificable).', confianza: 'Baja' },
  resumen: R,
  catalizadores: { items: [
    { fecha: '2026-10-29', evento: 'Ventas del 3T26', efecto: 'Confirma el 10-13 % orgánico y los pedidos de centros de datos', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027-02', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primer año del plan 2030', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Recompras del plan 2030', efecto: 'Hasta 3.500 M EUR', probabilidad: 'Media', sentido: '+' } ], confianza: 'Media' },
  riesgos: { items: [
    { riesgo: 'Frenazo del gasto en centros de datos', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista a 12 meses', mitigante: 'Redes y edificios', senal: 'Pedidos de centros de datos a la baja en el 3T26' },
    { riesgo: 'Dólar débil', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'BPA reportado 4-5 puntos por debajo del orgánico', mitigante: 'Producción local en EE. UU.', senal: 'EUR/USD por encima de 1,20' },
    { riesgo: 'Valoración: PER que vuelve a 18 veces (2022)', tipo: 'Mercado', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−25 %', mitigante: 'Crecimiento del BPA del 15 % anual', senal: 'Subida de tipos reales' } ],
    premortem: 'Octubre de 2029, la acción ha perdido un 35 %: los hiperescaladores recortaron inversión en 2027 y la competencia de Vertiv y Eaton erosionó el margen de energía segura.', confianza: 'Media' },
  preguntas: { items: [ { tema: 'Centros de datos', pregunta: '¿Qué peso tienen hoy los centros de datos en ventas y pedidos?', por_que: 'Es el motor y el principal riesgo.' } ], confianza: 'Media' },
  fuentes: [{ id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' }],
  huecos: [{ seccion: 'dcf', campo: 'beta y OAT a 10 años a la fecha de corte', tipo: 'Núcleo', intentos: '1) bolsa.mjs: sin red; 2) sin búsqueda por presupuesto; 3) estimación propia: beta 1,1 y OAT 3,4 %', decision: 'Calculado y marcado como estimación' }],
};

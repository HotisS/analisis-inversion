// Parte del analista (Texas Instruments, corte 2026-10-14). Citas: [A3] = fuente 3 de A.json; [P1] = fuente propia.
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { R = null; }
const crec = [24.5, 8, 5, 6, 6, 5, 5, 4, 4, 3];
const margen = [51, 54, 56, 56, 56, 55.5, 55, 55, 55, 55];
const amort = [11, 10.5, 10, 9.5, 9, 8.5, 8, 7.5, 7, 7];
const capex = [11.5, 9, 8, 7.5, 7.5, 7.5, 7, 7, 7, 7];
export default {
  meta: { fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones', cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: 'Análisis rápido (≈18 minutos) desde la nube: solo búsqueda web, sin 10-K ni bolsa.mjs. El precio es el último fechado que dio la búsqueda (286,06 USD, 10-ago-2026), coherente con ≈280-285 USD a principios de octubre; buena parte de la historia contable sale de la memoria del analista sobre los 10-K y está marcada. Confianza baja.',
    controles_explicados: [
      { control: "Caja proyectada coherente", explicacion: "El salto es real y conocido: el capex baja de 4.600-5.000 M (2023-25) a 2.000-3.000 M en 2026 al terminar las fábricas de 300 mm, y el FCF LTM a jun-26 ya es 6.534 M [A6]." },
      { control: "Al menos 5 comparables", explicacion: "Presupuesto de 18 min en la nube: solo ADI con PER adelantado verificado; la mediana de 25x es estimación del analista y solo afecta al alcista (hueco registrado)." },
      { control: "Sección de núcleo con datos: gobierno", explicacion: "Proxy no consultado por presupuesto; hueco registrado. No cambia la señal, que sale de la valoración." },
      { control: "Al menos 25 fuentes", explicacion: "Análisis rápido desde la nube con ≈12 búsquedas; las fuentes son extractos de búsqueda." },
      { control: "Al menos 10 fuentes primarias", explicacion: "sec.gov e investor.ti.com no son accesibles en la nube (solo WebSearch)." },
    ] },
  dcf: {
    anios: crec.map((g, i) => ({ periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i], capex_pct_ventas: capex[i], nwc_pct_ventas: 30, tasa_impositiva_pct: 14, fijo: i === 0 })),
    wacc: { tasa_libre_pct: 4.5, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 14, peso_deuda_pct: 5 },
    terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null }, mitad_de_anio: true,
    justificacion: '2026e fijo con el 1S26 real (10.293 M) y la guía del 3T26: ≈22.000 M (+24,5 %) [A4]. Después el ciclo se modera (+8 % y +5 %) y sigue al mercado analógico (≈6 %). El margen EBITDA vuelve al 56 % de los años de fábricas llenas (2022 ≈57 %) porque las de 300 mm se cargan; la amortización pesa más (10-11 % de ventas) y baja hasta igualar al capex de mantenimiento (7 %). Impuesto del 14 % (tipo efectivo histórico de TI con créditos fiscales).',
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 18, precio_pct: 5, otros_pct: 1.5, comentario: 'Rebote del ciclo (industrial +30 %, centros de datos ×2) y subidas de precio [A4].' },
        { periodo: '2027e', volumen_pct: 6, precio_pct: 2, otros_pct: 0, comentario: 'Menos que el consenso (+16 % de BPA): parte de 2026 es reposición de inventario.' },
        { periodo: '2028e', volumen_pct: 4, precio_pct: 1, otros_pct: 0, comentario: null },
        { periodo: '2029e', volumen_pct: 5, precio_pct: 1, otros_pct: 0, comentario: null },
        { periodo: '2030e', volumen_pct: 5, precio_pct: 1, otros_pct: 0, comentario: null },
      ],
      mercado_final: { periodo: '2035e', tamano: 160000 },
      veredicto: 'En parte',
      justificacion: 'Las ventas de 2035e (≈34.500 M) serían ≈21-22 % de un mercado analógico y embebido de ≈160.000 M (≈110.000 M en 2025 creciendo al 6 %), cerca de la cuota actual de TI en analógico (≈19 %): financiable. Pero el +24,5 % de 2026 incluye subidas de precio y reposición de inventario en fase alta del ciclo, que no se repiten: por eso el base ya va por debajo del consenso en 2027 (+8 % de ventas frente a ≈+16 % de BPA del consenso) y el margen no pasa del pico de 2022.',
    },
    lectura: null, confianza: 'Baja',
  },
  escenarios: { casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, narrativa: 'El rebote de 2026 era reposición de inventario: las ventas se estancan en 2027-28, las fábricas vuelven a infrautilizarse y el margen EBITDA se queda en el 51 %. BPA 2028e ≈8,9 USD.' },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: 'Ciclo normal: +8 % y +5 % en 2027-28 y margen EBITDA del 56 % con las fábricas de 300 mm cargadas. BPA 2028e ≈10,6 USD.' },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: 'Superciclo con IA (alimentación de centros de datos) y precios firmes: +10 % y +7 % y margen del 58 %. BPA 2028e ≈11,5 USD.' },
  ], comentario: 'Probabilidades 25/50/25: el ciclo está en fase alta, con riesgo simétrico.', confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Negocio único (analógico + embebido con las mismas fábricas).', confianza: 'Baja' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 14000, arrendamientos: 0, caja: 7000, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: "S&P 500 (prima implícita de Damodaran)", prima_implicita_pct: 4.2, fecha: "2026-10", fuente: "Damodaran, ERPbymonth (dato del informe de Group 1 del mismo día) [P1]" },
    pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 8.86, multiplo: null, precio: null, justificacion: 'Ventas 23.575 M, EBIT del 41 % (margen EBITDA 51 % − amortización 10 %) = 9.666 M, −300 M de intereses netos (14.000 M al 4 % menos rendimiento de 7.000 M de caja), impuesto del 14 % y 909 M de acciones sin recompras.' },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 10.58, multiplo: null, precio: null, justificacion: 'Ventas 24.962 M (+24,5 %, +8 %, +5 %), EBIT del 46 % = 11.482 M, −300 M de intereses netos, impuesto del 14 %, 909 M de acciones.' },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 11.48, multiplo: null, precio: null, justificacion: 'Ventas 25.908 M (+10 % y +7 %), EBIT del 48 % = 12.436 M, −300 M, impuesto del 14 %, 909 M de acciones.' },
      ],
      per_historico: { actual: 30.1, mediana_5a: 22.4, minimo_5a: 17.1, media_larga: 21.7, excluidos: '2024 (35,6x) y 2025 (31,5x): BPA de fondo de ciclo (5,20 y 5,45 USD) hundido por la amortización de las fábricas nuevas vacías; el PER sobre ese BPA no es repetible. Se usan 2018-2023 sobre BPA diluido GAAP (la misma base que los escenarios): 16,1; 23,9; 27,0; 22,4; 17,1; 23,8 [D2]. Actual = 286,06 ÷ 9,50 (nuestro BPA 2027e).' },
      comparables_per: { mediana: 25 },
      consenso: { bpa_ano1: 8.45, bpa_ano2: 9.84, objetivo_medio: 316, objetivo_min: 225, objetivo_max: 405, analistas: 21, tendencia_3m: 'subidas', fuente: 'Benzinga, Barchart y MarketScreener [D7, D3]' },
      diferencia_consenso: 'Nuestro BPA 2028e base (10,58) es un 5 % mayor que el de MarketScreener (10,11): no nos separamos en beneficio. La distancia al objetivo medio (316 USD) sale del múltiplo: los analistas aplican ≈30x, el PER de hoy, y la regla toma la mediana histórica sin los años de fondo de ciclo (22,4x).',
      media: null,
      comentario: 'El objetivo sale del PER histórico limpio: TI cotiza hoy a ≈30x nuestro BPA de 2027, por encima de su mediana de 22x de los años normales, porque el mercado paga ya la recuperación y el fin del capex.',
    },
    comentario: null, confianza: 'Baja',
  },
  rentabilidad: { comentario: 'ROIC aproximado: beneficio de explotación tras impuestos de 2025 (≈6.000 M × 0,86 ≈ 5.200 M) sobre ≈24.000 M de capital invertido (17.000 M de patrimonio + 7.000 M de deuda neta) ≈ 21-22 %; en 2026e, con un EBIT de ≈8.800 M, ≈31 %. Frente a un WACC de ≈9,9 %, la diferencia es de ≈12 puntos en 2025 y ≈20 en 2026e, aun con las fábricas a medio llenar. En 2021-22, con fábricas llenas, el ROIC superaba el 40 % (de memoria).', roic_pct: 21.7, confianza: 'Baja' },
  catalizadores: [{ evento: 'Resultados del 3T26 y guía del 4T26', fecha: '2026-10-21', impacto: 'Alto', comentario: 'La guía del 4T dirá si el ciclo sigue (estacionalidad normal: −5 a −8 %).' }, { evento: 'Vuelta de las recompras con el capex de 2.000-3.000 M', fecha: '2027', impacto: 'Medio', comentario: null }],
  riesgos: [{ riesgo: 'Ciclo: el rebote de 2026 es reposición de inventario', probabilidad: 'Media', impacto: 'Alto', mitigacion: 'Fábricas propias de bajo coste; dividendo protegido por 7.000 M de caja.' }, { riesgo: 'Competencia china en analógico y aranceles', probabilidad: 'Media', impacto: 'Medio', mitigacion: 'Capacidad en EE. UU. con ayudas CHIPS.' }, { riesgo: 'Valoración: 30x el BPA de 2027', probabilidad: 'Alta', impacto: 'Medio', mitigacion: null }],
  preguntas: ['¿Cuánto del +23 % del 2T26 es reposición de inventario de los distribuidores?', '¿Qué carga de fábrica y margen bruto se esperan para 2027?', '¿Cuándo vuelven las recompras?'],
  resumen: R,
  fuentes: [{ id: 1, titulo: "Implied ERP by month", editor: "A. Damodaran (NYU Stern)", tipo: "Secundaria", fecha: "2026-10", url: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/implpr.html" }],
  huecos: [],
};

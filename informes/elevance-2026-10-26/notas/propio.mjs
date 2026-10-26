// Parte del analista (Elevance Health, corte 2026-10-26). Citas con la letra de la nota: [A4] = fuente 4 de A.json.
// Criterio de flotante (lección de UnitedHealth): el EBITDA incluye la renta de la cartera de las filiales reguladas,
// así que la caja del puente es solo la de la matriz (2.416 M a 30-sep-2026), no los 10.348 M consolidados.
// El capital estatutario que las filiales deben retener al crecer se suma al capex (≈ 11 % del aumento de ventas).
// El BPA de los casos a 12 meses y la historia del PER usan el mismo BPA AJUSTADO (lección del informe del 14-oct).
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { if (e.code !== 'ERR_MODULE_NOT_FOUND') console.error('textos.mjs:', e.message); T = {}; }

const crec = [0.6, 3.0, 4.3, 4.5, 4.5, 4.0, 3.5];
// 2026e: 9M publicados + 4T estacional (EBITDA ≈ 9.640 M, con la provisión de CMS de 935 M y ≈ 530 M de renta de inversiones no recurrente).
// 2027e: coherente con la promesa de BPA ajustado ≥ 29,96 USD; después, recuperación gradual hacia el 6,0 %.
const margen = [4.85, 5.45, 5.65, 5.8, 5.95, 6.0, 6.0];
// Capex de 0,65 % de las ventas más el capital estatutario que retienen las filiales al crecer (≈ 11 % del aumento de ventas).
const capex = [0.6, 0.95, 1.1, 1.12, 1.12, 1.07, 1.02];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: 0.75, capex_pct_ventas: capex[i],
  nwc_pct_ventas: 7.2, tasa_impositiva_pct: 23, fijo: i === 0,
}));

export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: `Iteración del informe del 14-oct-2026 tras los resultados del 3T26 (21-oct-2026); todos los datos se han vuelto a comprobar con el 10-Q, la nota de prensa y la conferencia del 3T26 y con el XBRL de la SEC. Precio de cierre del viernes 23-oct-2026 (la sesión del lunes 26 no había cerrado). Cuenta de resultados en formato por función: EBIT = ingresos − prestaciones − coste de productos − gastos operativos + renta de inversiones − amortización de intangibles; los resultados de instrumentos financieros, los intereses y la amortización anticipada de deuda van al resultado financiero. Criterio de flotante (como en UnitedHealth): el EBITDA incluye la renta de las inversiones de las filiales reguladas, así que el puente solo cuenta la caja de la matriz (2.416 M a 30-sep-2026), las reservas médicas quedan fuera del circulante y el capital estatutario que exige el crecimiento se suma al capex del DCF. El BPA de los escenarios a 12 meses y la historia del PER usan el BPA ajustado publicado por la empresa (sin amortización de intangibles ni partidas no recurrentes); el informe del 14-oct mezclaba una historia sobre el BPA contable con casos sobre el ajustado. 2021 y 2022 están reexpresados por la norma LDTI en el 10-K 2023. Los comparables usan el PER: el valor empresa de Stock Analysis resta la caja regulada.`,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 5.0, beta: 0.92, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 23, peso_deuda_pct: 24.4 },
    terminal: { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 9.0 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: -4.5, precio_pct: 5.1, otros_pct: 0, comentario: `Volumen: 44,9 M de afiliados médicos a septiembre frente a 45,6 M en diciembre, con Medicare Advantage −15,5 % en un año y salidas de mercados de Medicaid y del ACA [A4, A5]. Precio: tarifas de Medicaid al alza (1-jul), tarifa de Medicare Advantage de 2026 del +5,06 % y primas comerciales subidas [A17, B15]. CarelonRx y Carelon Services crecen un 5-8 % [A4].` },
        { periodo: '2027e', volumen_pct: -2.0, precio_pct: 5.0, otros_pct: 0, comentario: `Volumen: requisitos de trabajo de Medicaid de la ley H.R. 1 desde 2027 y fin de los subsidios reforzados del ACA; la dirección no da afiliados de 2027 [A17, B29]. Precio: tarifa de Medicare Advantage de 2027 del +2,48 % (≈ 5 % con la tendencia de riesgo) y primas comerciales con una tendencia de coste elevada [B13, A17].` },
        { periodo: '2028e', volumen_pct: 0.0, precio_pct: 4.3, otros_pct: 0, comentario: `Volumen estable: termina la poda de mercados y Carelon sigue creciendo con terceros. Precio en línea con el gasto sanitario por persona [B4, B5].` },
        { periodo: '2029e', volumen_pct: 0.5, precio_pct: 4.0, otros_pct: 0, comentario: `Por debajo del gasto sanitario nacional previsto por CMS (≈ 5,6 % anual) [B5].` },
        { periodo: '2030e', volumen_pct: 0.5, precio_pct: 4.0, otros_pct: 0, comentario: `Igual que 2029e; Elevance tiene ≈ 12 % del seguro comercial y ≈ 5 % de Medicare Advantage, sin margen de ganancia de cuota grande [B17, B6].` },
      ],
      mercado_final: { periodo: '2030e', tamano: null },
      veredicto: 'En parte',
      justificacion: T.sostenibilidad ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2, ajuste_margen_pp: -0.8, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: `El coste médico de Medicaid y del comercial sigue por delante de las tarifas, los estados no compensan la cartera más enferma que dejan los requisitos de trabajo y la renta de inversiones vuelve a su nivel normal. El margen EBITDA se queda ≈ 0,8 puntos por debajo del base (≈ 5,2 % en 2030, el de 2025), los ingresos crecen 2 puntos menos al año y el mercado exige más prima. Es lo que pasó en 2024-2025.` },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: `Se cumple la guía de 2026 (BPA ajustado ≥ 29,00 USD) y el +12 % de 2027 sobre la base de 26,75 (≥ 29,96); Medicare Advantage sube del 2 % al 3-5 % de margen y Medicaid sale del suelo de 2026. El margen EBITDA llega al 6,0 % en 2031, por debajo del 6,8-7,3 % de 2021-2024, con ingresos al 3-4,5 % anual, menos que el gasto sanitario.` },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1, ajuste_margen_pp: 0.4, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: `Medicaid vuelve al 2-4 % de margen con tarifas actualizadas por los estados, Carelon crece con terceros y la eficiencia (IA en siniestros y autorizaciones) baja el ratio de gastos: el margen supera en 0,4 puntos al base y los ingresos crecen un punto más con el envejecimiento y nuevas licitaciones.` },
    ],
    comentario: T.escenarios_comentario ?? null,
    confianza: 'Media',
  },
  suma_partes: {
    aplica: true, descuento_holding_pct: 0,
    partes: [
      { segmento: 'Health Benefits', metrica: 'Resultado operativo ajustado normalizado (estimación propia)', valor_metrica: 5200, multiplo: 11.0, ev_directo: null, justificacion: `3.489 M de resultado operativo en nueve meses de 2026 (2,7 % de margen) y 4.158 M en 2025, frente a 6.243-6.888 M en 2023-2024 [A1, A4]. Normalizamos en 5.200 M (≈ 3,2 % de margen sobre ≈ 162.000 M de ingresos, la mitad del camino hacia 2023-2024) y aplicamos 11 veces, el EV/EBITDA de CVS y por encima de Cigna (8,3x) [D7, D8]. Sin la renta de inversiones, que va aparte.` },
      { segmento: 'CarelonRx', metrica: 'Resultado operativo 2026e (estimación propia)', valor_metrica: 2350, multiplo: 10.0, ev_directo: null, justificacion: `1.780 M en nueve meses (5,3 % de margen) y 2.418 M en 2025 [A1, A4]; 2026e ≈ 2.350 M. Express Scripts se compró a 9,2 veces el EBITDA y Cigna cotiza a 8,3 veces [D7, D22]; 10 veces por la farmacia de especialidad y la infusión (BioPlus, Paragon), a pesar de la reforma de los gestores de farmacia [B24].` },
      { segmento: 'Carelon Services', metrica: 'Resultado operativo 2026e (estimación propia)', valor_metrica: 1350, multiplo: 13.0, ev_directo: null, justificacion: `1.128 M en nueve meses (4,9 % de margen) y 960 M en 2025, con un 3T26 +33 % [A1, A4]. 13 veces: servicios de salud conductual, domicilio (CareBridge) y especialidades con terceros, por debajo de los 17,9-18,1 veces pagados por Amedisys y Change Healthcare [D24, D25, D29, D30].` },
      { segmento: 'Renta de inversiones (cartera regulada, neta de gastos corporativos)', metrica: 'Renta normal de inversiones menos gastos corporativos (estimación propia)', valor_metrica: 2100, multiplo: 8.0, ev_directo: null, justificacion: `Renta de inversiones de 2.506 M en nueve meses, con ≈ 530 M de ajustes de valoración no recurrentes; normal ≈ 2.600 M al año, menos ≈ 500 M de gastos corporativos [A4, A17]. 8 veces: depende de los tipos de interés y de una cartera que respalda reservas y capital estatutario.` },
    ],
    comentario: T.suma_partes_comentario ?? null,
    confianza: 'Media',
  },
  valoracion: {
    puente: { fecha: '2026-09-30', deuda_financiera: 30757, arrendamientos: 0, caja: 2416, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 593 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D15]' },
    pesos: { dcf: 40, comparables: 15, transacciones: 0, suma_partes: 10, escenarios: 35 },
    comentario: T.valoracion_comentario ?? null,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: 26.23, multiplo: null, precio: null, justificacion: T.obj12?.bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: 33.47, multiplo: null, precio: null, justificacion: T.obj12?.base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: 37.28, multiplo: null, precio: null, justificacion: T.obj12?.alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado', actual: 14.43, mediana_5a: 14.27, minimo_5a: 12.09, media_larga: 13.7, anios: 5,
        excluidos: T.obj12?.excluidos ?? null,
        v2: { actual: 14.43, mediana_5a: 14.23, minimo_5a: 11.17, media_larga: 14.9, base: 'cierre' },
      },
      comparables_per: { mediana: 16.05 },
      consenso: { bpa_ano1: 30.22, bpa_ano2: null, objetivo_medio: 481.48, objetivo_min: 406, objetivo_max: 523, analistas: 22, tendencia_3m: 'subidas', fuente: `S&P Global vía Stock Analysis (BPA ajustado y objetivos, 26-oct-2026) y MarketBeat (cambios de objetivo del 22-23 oct) [D2, D3]` },
      diferencia_consenso: T.obj12?.diferencia ?? null,
      media: null,
      comentario: T.obj12?.comentario ?? null,
    },
  },
};

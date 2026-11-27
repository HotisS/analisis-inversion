// Parte del analista (LVMH, corte 2026-11-27; precio del 26-nov; sin resultados nuevos desde el 21-oct). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-11-27', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    lectura: T.dcf_lectura ?? null,
    // 21-oct: prueba de sostenibilidad del crecimiento (no estaba en el informe del 8-oct).
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 0.0, precio_pct: 2.0, otros_pct: -4.9, comentario: 'Nueve meses: +2 % orgánico (sobre todo precio y mezcla; Moda −2 %), −3 puntos de divisa y −1 de perímetro (DFS, Marc Jacobs); el 4T suma la salida del resto de DFS [A, B].' },
        { periodo: '2027e', volumen_pct: 0.0, precio_pct: 2.0, otros_pct: -0.9, comentario: 'Moda plana (la vuelta se retrasa un año tras el −5 % del 3T26); Relojería y Joyería, Vinos y Perfumes crecen con precio; DFS resta todavía en Distribución Selectiva.' },
        { periodo: '2028e', volumen_pct: 2.3, precio_pct: 2.5, otros_pct: 0.0, comentario: 'Vuelve el volumen en Moda (+4,5 %) y Sephora crece un 5,5 %, en la banda del 4-6 % que Bain prevé para el lujo [B7].' },
        { periodo: '2029e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0.0, comentario: 'Crecimiento del 5,5 %, por debajo del 5,9 % anual de LVMH en 2021-2025.' },
        { periodo: '2030e', volumen_pct: 2.6, precio_pct: 2.5, otros_pct: 0.0, comentario: 'Convergencia hacia el 3 % de 2035e.' },
      ],
      mercado_final: null,
      veredicto: 'Sí',
      justificacion: 'Sí. El crecimiento proyectado (≈ 4 % anual en 2026e-2035e) está por debajo del de LVMH en 2021-2025 (5,9 %) y dentro del 4-6 % que Bain prevé para el lujo [B7]; no supone ganar cuota. No exige capital extraordinario: el capex (9,2-10 % de las ventas con las altas de derechos de uso) apenas supera la amortización (8,2-8,5 %). Lo que no está demostrado es el margen: el ROIC incremental de 2021-2025 fue negativo y el caso base sube el margen operativo recurrente del 22,0 % al ≈ 24 %. Por eso el bajista (sin esa mejora) pesa un 25 %.',
    },
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: T.secciones?.suma_partes ?? null,
  valoracion: {
    puente: T.puente ?? null,
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (válida para mercados desarrollados)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)», fila de noviembre de 2026 [P1]' },
    pesos,
    // 21-oct: BPA 2028e del DCF (EBIT − 322 de otros gastos − 980 de resultado financiero; impuesto del 26 %; minoritarios 3,1 %;
    // 27-nov: 490,37 M de acciones diluidas tras las recompras hasta el 20-nov [D]; 446 M menos de caja (+18 M de gasto financiero). Cuadre con 2025: 21,84 frente a 21,85 publicado.
    objetivo_12m: {
      ejercicio: '2028e',
      base_bpa: 'publicado', // BPA publicado (NIIF) en los casos y en la historia del PER
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 20.81, multiplo: null, precio: null, justificacion: 'Bajista del informe: 2027e con 7 puntos menos de crecimiento y 3,5 de margen, y después −1,5 y −2. Ventas de 2028e de 76.247 M, margen EBITDA del 28,6 % y amortización del 8,2 %: EBIT de 15.554 M; menos 322 M de otros gastos y 998 M de resultado financiero (980 M más 18 M por los 446 M de recompras desde el 19-oct), impuesto del 26 % y minoritarios del 3,1 %, entre 490,37 M de acciones: 20,81 EUR.' },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 25.30, multiplo: null, precio: null, justificacion: 'Caso base del DCF tras el 3T26, con la vuelta de Moda retrasada un año (2027e plano, margen del 34,0 %): ventas de 2028e de 83.141 M y EBIT de 18.619 M; menos 322 M de otros gastos y 998 M de resultado financiero (deuda neta con arrendamientos al 4 %, con las recompras hasta el 20-nov), impuesto del 26 % y minoritarios del 3,1 %, entre 490,37 M de acciones: 25,30 EUR.' },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 27.97, multiplo: null, precio: null, justificacion: 'Alcista del informe: 1,5 puntos más de crecimiento y de margen desde 2027e. Ventas de 2028e de 85.551 M y EBIT de 20.447 M: 27,97 EUR con los mismos ajustes.' },
      ],
      per_historico: {
        base: 'adelantado', base_bpa: 'publicado', actual: 17.3, mediana_5a: 25.9, minimo_5a: 21.4, media_larga: 25.6,
        excluidos: 'Historia adelantada (precio de cierre de cada año ÷ BPA real del año siguiente): 2020 21,4x; 2021 25,9x; 2022 22,4x; 2023 29,2x; 2024 29,1x. Actual: 401,05 ÷ 23,18 (nuestro BPA de 2027e, con impuesto del 27 % y 490,37 M de acciones) = 17,3x. El cierre de 2025 (645,0 ÷ nuestro BPA de 2026e) queda fuera como en el informe anterior, por coherencia; con él la mediana subiría a 29,1x y no cambiaría ningún escenario (el tope ×1,1 y el techo ×1,35 mandan).',
        v2: { mediana_5a: 25.3, minimo_5a: 24.2, media_larga: 24.6, excluidos: 'Historia al cierre (precio ÷ BPA del mismo año): 2021 30,4x, 2022 24,3x, 2023 24,2x, 2024 25,3x, 2025 29,5x.' },
      },
      comparables_per: { mediana: 21.6 },
      consenso: { bpa_ano1: 23.80, bpa_ano2: 26.01, objetivo_medio: 487.47, objetivo_min: 380, objetivo_max: 590, analistas: 27, tendencia_3m: 'recortes', fuente: 'MarketScreener (BPA 2027e-2028e, 27-nov-2026) y Yahoo Finance (objetivos y recomendaciones de 27 analistas, 27-nov-2026) [D4, D47]' },
      diferencia_consenso: T.diferencia_consenso_12m ?? null,
      media: null,
      comentario: T.objetivo_comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.secciones?.catalizadores ?? null,
  riesgos: T.secciones?.riesgos ?? null,
  preguntas: T.secciones?.preguntas ?? null,
  resumen: T.resumenObj ?? null,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de noviembre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-11', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    ...(T.fuentes ?? []),
  ],
  huecos: T.huecos ?? [],
};

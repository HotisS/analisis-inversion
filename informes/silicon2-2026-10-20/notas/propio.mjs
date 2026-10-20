// Parte del analista (Silicon2, corte 2026-10-20). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 32800; // cierre del 20-oct-2026 en el KOSDAQ [D1]

// Historia del PER adelantado (v3): cierre de cada ejercicio ÷ BPA diluido real del año siguiente [D1, A1, A2].
// 2021 3.216,67 ÷ 178 = 18,1x; 2022 2.455 ÷ 623 = 3,9x (EXCLUIDO); 2023 7.710 ÷ 1.981 = 3,9x (EXCLUIDO); 2024 32.700 ÷ 2.714 =
// 12,0x; 2025 38.650 ÷ nuestro BPA de 2026e. 2022 y 2023 excluidos como BPA atípico: el BPA se multiplicó por 3,5 (2023) y por
// 3,2 (2024), una sorpresa que ningún precio descontaba. Al cierre (v2): 3.216,67 ÷ 149; 2.455 ÷ 178; 7.710 ÷ 623;
// 32.700 ÷ 1.981; 38.650 ÷ 2.714. Con tres años útiles se aplica la regla de historia corta (el selector elige la más baja).
const adel = [3216.67 / 178, 32700 / 2714, 38650 / bpa26];
const cierre = [3216.67 / 149, 2455 / 178, 7710 / 623, 32700 / 1981, 38650 / 2714];
const med = (a) => { const s = [...a].sort((x, y) => x - y); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'KRW', divisa_cotizacion: 'KRW', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'K-IFRS (NIIF adoptadas en Corea), cuentas consolidadas', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { ...S.etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: S.mercado_final,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance K-IFRS de 30-jun-2026 [A3]. Deuda financiera: 68.123 a corto + 14 + 39 = 68.176. Arrendamientos 64.599. Caja:
    // efectivo 82.274 + otros activos financieros a corto 49.222 + los 300.000 M de las RCPS de CVC cobrados el 15-sep [A10] =
    // 431.496. Las RCPS se tratan como deuda en el DCF (otros_ajustes +300.000) con 65,45 M de acciones ordinarias con voto:
    // con un valor por acción por debajo de los 45.000 KRW de conversión, CVC pediría el reembolso y es la base más prudente
    // (en base convertida, 72,12 M de acciones, el DCF sale ≈ 1 % más alto). Asociadas (participaciones en marcas) 16.856 a valor
    // contable. otros_ajustes: +300.000 (RCPS) + 5.000 (fideicomiso de recompra del 19-oct, caja que sale) [A12] = 305.000.
    // El almacén de Yongin (55.034 M, pagado el 7-oct) está en el capex de 2026e. Pensiones: sin dato relevante.
    puente: { fecha: '2026-06-30', deuda_financiera: 68176, arrendamientos: 64599, caja: 431496, minoritarios: 0, pensiones: 0, asociadas: 16856, otros_ajustes: 305000 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        anios: adel.length,
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(adel.reduce((a, b) => a + b, 0) / adel.length),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(cierre.reduce((a, b) => a + b, 0) / cierre.length), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 12.8 },
      consenso: { bpa_ano1: 4233, bpa_ano2: 5143, objetivo_medio: 58385, objetivo_min: 52000, objetivo_max: 65000, analistas: 13, tendencia_3m: 'recortes', fuente: 'FnGuide/WiseReport (BPA de 2027e y 2028e a 19-oct-2026) y objetivos de las 13 casas [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(T.bolsa_contexto ? { bolsa: { contexto: T.bolsa_contexto } } : {}),
  ...(R ? { resumen: R } : {}),
  fuentes: T.fuentes ?? [],
};

// Parte del analista (Engie, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente 1 de aquí.
import S from './supuestos.mjs';
import { tabla } from './bpa.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const b = (n) => tabla[n]['2028e'];
const precio = 22.77;

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Puente a 30-jun-2026 (con UKPN): deuda financiera sin arrendamientos 64.760 M (deuda financiera neta 54.922 + caja 13.537 − arrendamientos 3.699) [A2].
    // Minoritarios a valor estimado: ≈1.000 M de beneficio recurrente de minoritarios × 10 = 10.000 M (contable 8.567 M).
    // Asociadas: ≈1.050 M de resultado recurrente × 9 = 9.500 M (contable 8.016 M).
    // Pensiones netas 974 M. otros_ajustes: híbridos 6.693 M + provisiones nucleares netas de activos dedicados (9.399 − 6.679 = 2.720 M)
    // + desmantelamiento no nuclear 1.659 M = 11.072 M [A2].
    puente: { fecha: '2026-06-30', deuda_financiera: 64760, arrendamientos: 3699, caja: 13537, minoritarios: 10000, pensiones: 974, asociadas: 9500, otros_ajustes: 11072 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, implied ERP [D18]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: b('Bajista').bpa, multiplo: null, precio: null, justificacion: T.o12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: b('Base').bpa, multiplo: null, precio: null, justificacion: T.o12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: b('Alcista').bpa, multiplo: null, precio: null, justificacion: T.o12?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado',
        actual: +(precio / tabla.Base['2027e'].bpa).toFixed(1),
        mediana_5a: 7.8, minimo_5a: 7.1, media_larga: 9.3, anios: 4,
        excluidos: 'Historia adelantada en base NRIgs por acción (recurrente, tras cupones de híbridos): cierre de cada año ÷ BPA recurrente real del año siguiente [D2, A5, A7]. 2020: 12,52 ÷ 1,26 = 9,9x; 2021: 13,01 ÷ 2,24 = 5,8x (excluido); 2022: 13,39 ÷ 2,18 = 6,1x (excluido); 2023: 15,92 ÷ 2,25 = 7,1x; 2024: 15,31 ÷ 1,96 = 7,8x; 2025: 22,41 ÷ 1,84 (nuestro 2026e) = 12,2x. Se excluyen 2021 y 2022 porque el BPA del año siguiente (2022-2023) es el pico de la crisis energética (lección de beneficio de pico en energía). Mediana de 5 años (2023-2025) 7,8x, mínimo 7,1x; media larga 2020 y 2023-2025, 9,3x (2016-2019 sin BPA recurrente homogéneo). Actual = 22,77 € ÷ nuestro BPA de 2027e (1,97 €).',
        v2: { mediana_5a: 10.3, minimo_5a: 6.8, media_larga: 9.5, excluidos: 'Historia al cierre (cierre ÷ BPA recurrente del mismo año): 2021 10,3x; 2024 6,8x; 2025 11,4x; sin 2022 y 2023 (pico) ni 2020 (COVID).' },
      },
      comparables_per: { mediana: 14.5 },
      consenso: { bpa_ano1: 1.90, bpa_ano2: 2.00, objetivo_medio: 30.54, objetivo_min: 24.5, objetivo_max: 33.8, analistas: 19, tendencia_3m: 'estables', fuente: 'MarketScreener (19 analistas, BPA de 2026e y 2027e) e Investing.com (17 comprar, 2 mantener) [D3, D4]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};

// Parte del analista (Endesa, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente 1 de aquí.
import S from './supuestos.mjs';
import { tabla } from './bpa.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const b = (n) => tabla[n]['2028e'];

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
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
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Deuda financiera neta de junio de 2026 (incluye arrendamientos) en «deuda_financiera», con caja 0.
    // otros_ajustes: complementario del dividendo pagado el 10-jul (1,084 € × ≈1.020 M de acciones ≈ 1.105 M) y la recompra
    // ejecutada desde julio (≈250 M, estimación), porque las acciones del cálculo son las de octubre.
    puente: { fecha: '2026-06-30', deuda_financiera: 10305, arrendamientos: 0, caja: 0, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 1355 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D11]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: b('Bajista').bpa, multiplo: null, precio: null, justificacion: T.o12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: b('Base').bpa, multiplo: null, precio: null, justificacion: T.o12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: b('Alcista').bpa, multiplo: null, precio: null, justificacion: T.o12?.Alcista ?? null },
      ],
      per_historico: { actual: +(43.03 / tabla.Base['2027e'].bpa).toFixed(1), mediana_5a: 12.5, minimo_5a: 11.2, media_larga: 12.5, excluidos: 'Solo hay dos cierres de ejercicio fiables (estimados desde rentabilidades publicadas): 2024 ≈21,1 € ÷ BPA ordinario 1,88 € = 11,2x y 2025 ≈31,1 € ÷ 2,25 € = 13,8x [D19, D18, A10, A2]. 2022 (beneficio de la crisis de precios) y 2023 (laudo del gas, BPA de 0,70 €) se excluirían por atípicos; 2021 no tiene cierre fiable en este entorno. Base del BPA: ordinario (sin extraordinarios), la misma que los escenarios. Actual = 43,03 € ÷ nuestro BPA de 2027e.' },
      comparables_per: { mediana: 14.9 },
      consenso: { bpa_ano1: 2.35, bpa_ano2: 2.35, objetivo_medio: 35.71, objetivo_min: null, objetivo_max: 45.0, analistas: 23, tendencia_3m: 'subidas', fuente: 'Investing.com (23 analistas) y MarketScreener (BPA implícito en su PER; objetivo medio 35,97 €) [D3, D4, D5]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Baja' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};

// Parte del analista (Iberdrola, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente 1 de aquí.
import S from './supuestos.mjs';
import { tabla } from './bpa.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const b = (n) => tabla[n]['2028e'];
const precio = 21.68;

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
    // Deuda neta ajustada de junio de 2026 (≈54.000 M) en «deuda_financiera», con caja 0.
    // Minoritarios a valor de mercado estimado: 505 M de beneficio de minoritarios (2025) × 15 = ≈7.600 M (estimación propia; el valor contable no se pudo leer).
    // otros_ajustes: dividendo complementario en efectivo pagado el 27-jul (0,427 € × 25,4 % de 6.575 M de acciones ≈ 713 M), porque el puente es de junio.
    puente: { fecha: '2026-06-30', deuda_financiera: 54000, arrendamientos: 0, caja: 0, minoritarios: 7600, pensiones: 0, asociadas: 0, otros_ajustes: 713 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D10]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: b('Bajista').bpa, multiplo: null, precio: null, justificacion: T.o12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: b('Base').bpa, multiplo: null, precio: null, justificacion: T.o12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: b('Alcista').bpa, multiplo: null, precio: null, justificacion: T.o12?.Alcista ?? null },
      ],
      per_historico: { actual: +(precio / tabla.Base['2027e'].bpa).toFixed(1), mediana_5a: 16.8, minimo_5a: 15.8, media_larga: 17.4, excluidos: 'Ningún año excluido: 2021-2025 sin pérdidas ni BPA atípico (precio de cierre ÷ BPA contable: 2021 10,41 ÷ 0,58 = 17,9x; 2022 10,93 ÷ 0,65 = 16,8x; 2023 11,87 ÷ 0,72 = 16,5x; 2024 13,30 ÷ 0,84 = 15,8x; 2025 ≈18,5 ÷ 0,925 = 20,0x) [D8, A1, A19]. El cierre de 2025 es estimado (capitalización de ≈125.000 M de enero de 2026 entre 6.758 M de acciones). Solo hay cinco años: la «media larga» es la de 2021-2025. Base del BPA: contable de operaciones continuadas, la misma que los escenarios (el ajustado de 2025, 6.231 M, casi coincide con el contable de 6.285 M). Actual = 21,68 € ÷ nuestro BPA de 2027e.' },
      comparables_per: { mediana: 14.9 },
      consenso: { bpa_ano1: 1.01, bpa_ano2: 1.06, objetivo_medio: 20.51, objetivo_min: 17.30, objetivo_max: 23.50, analistas: 23, tendencia_3m: 'estables', fuente: 'Investing.com (23 analistas) y MarketScreener (beneficio de 6.730 M en 2026e y 7.080 M en 2027e ÷ 6.673 M de acciones, estimación propia del BPA) [D4, D6]' },
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

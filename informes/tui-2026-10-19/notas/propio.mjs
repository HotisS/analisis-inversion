// Parte del analista (TUI AG, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 6.75; // cierre del 16-oct-2026 en Xetra [D1]

// Historia del PER [D1, A1, A5, A6]. Cierres de septiembre (ajustados por la agrupación 10:1 y la ampliación de 2023); BPA básico publicado.
const cierres = { FY2022: 6.54, FY2023: 5.22, FY2024: 6.84, FY2025: 7.74 };
const bpaReal = { FY2023: 0.80, FY2024: 1.00, FY2025: 1.25, FY2026: bpa26 };
// v3 (adelantado: cierre ÷ BPA del ejercicio siguiente). FY2021 excluido (BPA de FY2022 negativo). FY2025 ÷ nuestro BPA de FY2026e
// (ejercicio cerrado el 30-sep-2026, sin publicar hasta el 9-dic).
const adel = [['FY2022', 'FY2023'], ['FY2023', 'FY2024'], ['FY2024', 'FY2025'], ['FY2025', 'FY2026']].map(([c, b]) => cierres[c] / bpaReal[b]);
// v2 (cierre ÷ BPA del propio ejercicio). FY2021-FY2022 excluidos (pérdidas).
const cierre = ['FY2023', 'FY2024', 'FY2025'].map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 9, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (UE), cuentas consolidadas', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance de 30-jun-2026 [A2]: deuda financiera 2.303,7 (bonos, convertible 2031, Schuldschein, bancos); arrendamientos 2.275,1;
    // caja 2.220,5 + 10,3 de inversiones a corto. Pensiones 573,4 + 26,0. Minoritarios a valor de mercado: ≈ 8 veces su beneficio
    // (205,8 M en FY2025) = 1.650 M (en libros 1.024,8 M). Asociadas: TUI Cruises (50 %) a 9 veces su resultado para TUI de FY2025
    // (314 M) = 2.830 M, y resto de participadas (≈ 150 M: hoteles con Riu, Royalton, otras) a 6 veces = 900 M: 3.730 M (en libros 1.987,7 M).
    // Sin ajuste estacional: la deuda neta de junio (2.348 M) es mayor que la de septiembre (1.305 M a sep-25; la de sep-26 se publica el 9-dic).
    puente: { fecha: '2026-06-30', deuda_financiera: 2303.7, arrendamientos: 2275.1, caja: 2230.8, minoritarios: 1650, pensiones: 599.4, asociadas: 3730, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', anios: adel.length,
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adel)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 11.3 },
      consenso: { bpa_ano1: 1.33, bpa_ano2: null, objetivo_medio: 9.85, objetivo_min: 7.0, objetivo_max: 13.5, analistas: 13, tendencia_3m: 'recortes', fuente: 'Yahoo earningsTrend (BPA de FY2027 de 12-13 analistas; 1,398 hace 90 días) y objetivos de finanzen.net (sep-oct 2026) [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(T.comparables_comentario ? { comparables: { comentario: T.comparables_comentario } } : {}),
  ...(T.bolsa_contexto ? { bolsa: { contexto: T.bolsa_contexto } } : {}),
  ...(R ? { resumen: R } : {}),
  fuentes: T.fuentes ?? [],
};

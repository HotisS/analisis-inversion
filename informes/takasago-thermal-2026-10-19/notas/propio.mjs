// Parte del analista (Takasago Thermal Engineering, 1969.T, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 4187; // cierre del 19-oct-2026 [D1]

// Historia del PER (cierre de marzo de cada ejercicio, precios ajustados al split 1:2) [D1]; BPA reales en base posterior al split [A1-A6].
// Adelantado: cierre ÷ BPA real del ejercicio siguiente; para FY2025 (cierre de mar-26), nuestro BPA de FY2026e.
const cierres = { FY2021: 867.5, FY2022: 1054.5, FY2023: 2435, FY2024: 2776, FY2025: 4291 };
const bpaReal = { FY2021: 84.69, FY2022: 92.35, FY2023: 147.84, FY2024: 208.07, FY2025: 285.73, FY2026: bpa26 };
const anos = ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'];
const sig = (a) => `FY${Number(a.slice(2)) + 1}`;
const adel = anos.map((a) => cierres[a] / bpaReal[sig(a)]);
const cierre = anos.map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, bpa26, bpa27 };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'JPY', divisa_cotizacion: 'JPY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'inicio', normas_contables: 'Normas japonesas (J-GAAP), kessan tanshin y yuho', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A9, D7, D8]: ver la nota D. Pensiones = superávit neto de impuestos (suma); otros_ajustes = cartera de
    // participaciones cruzadas a valor de mercado menos el impuesto latente de la plusvalía (suma); asociadas = resto de inversiones.
    puente: { fecha: '2026-06-30', deuda_financiera: 40593, arrendamientos: 0, caja: 42125, minoritarios: 5274, pensiones: -6750, asociadas: 18794, otros_ajustes: -35750 },
    rab: null,
    referencia_mercado: { mercado: 'Prima implícita del S&P 500 (Damodaran), la principal, para mercados desarrollados; Japón sin prima adicional', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adel)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 15.98 },
      consenso: { bpa_ano1: 358.8, bpa_ano2: null, objetivo_medio: 5975, objetivo_min: 5250, objetivo_max: 6900, analistas: 6, tendencia_3m: 'subidas', fuente: 'MarketScreener (BPA de FY2027e y objetivos de 6 analistas: 5.975 JPY de media, 5.250-6.900) [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(R ? { resumen: R } : {}),
  fuentes: T.fuentes ?? [],
};

// Parte del analista (Smurfit Westrock, NYSE SW, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 41.16; // cierre de SW del 16-oct-2026 (último cierre antes del corte) [D1]

// Historia del PER. Hasta 2023 la cotizada era Smurfit Kappa (adquirente contable; cierres de Yahoo en USD) [D1].
// BPA ajustado (sin partidas no recurrentes) de la empresa: 2022 4,69; 2023 3,63; 2024 2,34; 2025 2,05 [A2, A9]; 2021 solo hay el contable (3,08) [A3].
// Adelantado = cierre ÷ BPA ajustado del año siguiente; para 2025, nuestro BPA de 2026e. Se excluye 2023 (el BPA de 2024 mezcla medio año de WestRock y las acciones nuevas de la fusión).
const cierres = { 2020: 47.05, 2021: 53.75, 2022: 37.33, 2023: 40.81, 2024: 53.86, 2025: 38.67 };
const bpaAj = { 2021: 3.08, 2022: 4.69, 2023: 3.63, 2024: 2.34, 2025: 2.05, 2026: bpa26 };
const anosAdel = [2020, 2021, 2022, 2024, 2025];
const adel = anosAdel.map((a) => cierres[a] / bpaAj[a + 1]);
// v2 (PER de cierre = cierre ÷ BPA del propio año): 2021-2025 sin 2024 (año de la fusión).
const anosCierre = [2021, 2022, 2023, 2025];
const cierre = anosCierre.map((a) => cierres[a] / bpaAj[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP (10-K 2024-2025 y 10-Q 2026 de la SEC; 2021-2023 de Smurfit Kappa en US GAAP del folleto 424B3)', formato_cuenta: 'funcion',
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
    // Balance de 30-jun-2026 [A4]: deuda 14.164 (incluye 543 de arrendamientos financieros; los operativos no son deuda en US GAAP), caja 677, minoritarios 24.
    // otros_ajustes: +659 = cuentas a cobrar vendidas sin recurso (factoring) que financian el circulante [A1, A4]; signo: suma a la deuda.
    // La compra de CMPC Chile (420 M, pendiente de cierre) no entra: no está en el balance ni en la proyección y es casi neutra en valor [D12].
    puente: { fecha: '2026-06-30', deuda_financiera: 14164, arrendamientos: 0, caja: 677, minoritarios: 24, pensiones: 0, asociadas: 0, otros_ajustes: 659 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adel)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 14.6 },
      consenso: { bpa_ano1: 3.53, bpa_ano2: 4.08, objetivo_medio: 56.47, objetivo_min: 46, objetivo_max: 69, analistas: 17, tendencia_3m: 'recortes', fuente: 'MarketScreener (BPA de 2027e y 2028e) y Yahoo (17 analistas, objetivo medio 56,47 USD, 46-69) [D2, D3, D4]' },
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

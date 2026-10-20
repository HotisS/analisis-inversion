// Parte del analista (Orange SA, corte 2026-10-20). Citas con la letra de la nota: [A1] = fuente 1 de A.json.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 14.20; // cierre del 19-oct-2026 en Euronext París (subasta de las 17:35 CEST) [D1]

// Historia del PER con BPA AJUSTADO de Orange [D2, A6]. Cierres de diciembre.
const cierres = { 2022: 9.28, 2023: 10.30, 2024: 9.63, 2025: 14.20 };
// 2023: 0,90 € es estimación propia (Orange publica el ajustado desde el plan de 2023; el de 2023 en el perímetro sin España no
// está en las fuentes leídas). 2024: 0,95 €; 2025: 0,86 € [A6]. 2026: nuestro 2026e.
const bpaAj = { 2023: 0.90, 2024: 0.95, 2025: 0.86, 2026: bpa26 };
// v3 (adelantado: cierre ÷ BPA del ejercicio siguiente). 2021 excluido (sin BPA ajustado de 2022 en el mismo perímetro).
const adel = [[2022, 2023], [2023, 2024], [2024, 2025], [2025, 2026]].map(([c, b]) => cierres[c] / bpaAj[b]);
// v2 (cierre ÷ BPA del propio ejercicio). 2022 excluido (sin BPA ajustado de 2022).
const cierre = [2023, 2024, 2025].map((a) => cierres[a] / bpaAj[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (UE), cuentas consolidadas', formato_cuenta: 'naturaleza',
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
    // Balance de 30-jun-2026 [A2], ya con MasOrange al 100 %: pasivos financieros 42.327 + 5.298 = 47.625; arrendamientos 7.206 + 1.653
    // = 8.859; caja 9.305 + activos financieros corrientes 2.178 = 11.483. Minoritarios a valor de mercado: ≈ 8 veces su beneficio de
    // los últimos 12 meses (601 − 294 + 349 = 656 M) = 5.250 M (en libros 3.321). Pensiones y beneficios a empleados a largo plazo
    // (2.856 M, sobre todo GEPP y prejubilaciones) netos de impuestos (× 0,75) = 2.140 M. Asociadas a valor contable (1.926 M).
    // otros_ajustes = híbridos 4.993 (patrimonio en NIIF, deuda para el accionista) + Scorefit 1.300 (pagada el 1-jul con deuda)
    // + desmantelamiento del cobre y otras redes 2.659 × 0,75 = 1.994 − 459 (diferencia con la deuda neta oficial de 35.683 M:
    // derivados, depósitos de garantía y otros activos que Orange resta) = 7.828 M.
    puente: { fecha: '2026-06-30', deuda_financiera: 47625, arrendamientos: 8859, caja: 11483, minoritarios: 5250, pensiones: 2140, asociadas: 1926, otros_ajustes: 7828 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', anios: adel.length,
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adel)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 11.2 },
      consenso: { bpa_ano1: 1.163, bpa_ano2: 1.285, objetivo_medio: 18.99, objetivo_min: 15.0, objetivo_max: 22.6, analistas: 16, tendencia_3m: 'estable', fuente: 'MarketScreener (BPA publicado 2027e y 2028e de 16 analistas) y Yahoo (objetivos) [D2, D3]' },
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

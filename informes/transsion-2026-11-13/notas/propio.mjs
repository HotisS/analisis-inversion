// Parte del analista (Transsion, línea H, corte 2026-11-13). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
import { TC, HA, PRECIO } from './precio.mjs'; // 13-nov-2026 [D1, D2, D8]

// Historia del PER en base H: cierre de la A × H/A [D2]. BPA reales de cada año [A1, A4]; para 2025 el BPA de 2026e es el nuestro.
const cierres = { 2020: 152.14, 2021: 156.9, 2022: 79.52, 2023: 138.4, 2024: 95.0, 2025: 66.16 };
const bpaReal = { 2020: 2.36, 2021: 3.47, 2022: 2.2, 2023: 4.87, 2024: 4.85, 2025: 2.25, 2026: bpa26 };
const anos = [2021, 2022, 2023, 2024, 2025];
const adel = anos.map((a) => (cierres[a] * HA) / bpaReal[a + 1]);
const cierre = anos.map((a) => (cierres[a] * HA) / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, HA, PRECIO, bpa26, bpa27 };

export default {
  meta: {
    fecha_corte: '2026-11-13', divisa: 'CNY', divisa_cotizacion: 'HKD', tipo_cambio: TC, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (cuentas del folleto de la línea H, 2023-1S26); 2021-2022 en normas chinas (CAS)', formato_cuenta: 'funcion',
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
    // Balance (normas chinas, sin auditar) de 30-sep-2026 [A13]. Caja = efectivo disponible 6.519,9 (sin los 1.322,8 restringidos, que garantizan pagarés a proveedores)
    // + productos de tesorería a valor razonable 4.698,0 = 11.217,9. Deuda: préstamos a corto 4.570,6 + vencimientos a menos de un año 601,0 + largo 73,7 = 5.245,3;
    // arrendamientos 50,6 (la parte corriente va dentro de los 601,0). Asociadas: participadas 938,3 + otros activos financieros no corrientes 1.979,2 = 2.917,5.
    // otros_ajustes: −(2.968,0 + 227,1) M HKD × 0,8498 = −2.715,2: ingresos netos de la salida a bolsa H (15-oct) y de la sobreasignación (11-nov), posteriores al balance [A11, A14].
    puente: { fecha: '2026-09-30', deuda_financiera: 5245.3, arrendamientos: 50.6, caja: 11217.9, minoritarios: 227.6, pensiones: 0, asociadas: 2917.5, otros_ajustes: -2715.2 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth [D7]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      base_bpa: 'publicado',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        base_bpa: 'publicado',
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adel)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 14.8 },
      consenso: { bpa_ano1: 3.364, bpa_ano2: 4.91, objetivo_medio: r2(54.25 * HA), objetivo_min: r2(47 * HA), objetivo_max: r2(60 * HA), analistas: 4, tendencia_3m: 'recortes', fuente: `BPA de 2027e de Yahoo (5 analistas; 3,64 hace 90 días) y de 2028e de Kaiyuan y China Post; objetivos de 4 analistas para la A (54,25 CNY de media, 47-60), pasados a base H con el cociente H/A del 13-nov (${HA}) [D3, D4, D16]` },
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

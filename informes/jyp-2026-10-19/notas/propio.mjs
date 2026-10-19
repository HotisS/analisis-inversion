// Parte del analista (JYP Entertainment, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 40200; // cierre del 19-oct-2026 en la KRX [D7]

// Historia del PER (cierres de ejercicio de Yahoo [D1]). Adelantado (v3): cierre ÷ BPA del año siguiente, con los BPA de 2021 y
// 2025 sin plusvalías (1.203 y 3.124 KRW) [A1-A4]: 2020 38.400 ÷ 1.203; 2021 50.700 ÷ 2.038; 2022 67.800 ÷ 3.184; 2023 101.300 ÷
// 2.951; 2024 69.900 ÷ 3.124; 2025 72.600 ÷ nuestro BPA de 2026e. Al cierre (v2): cierre ÷ BPA del propio año (2021 y 2025 sin
// plusvalías): 2020 38.400 ÷ 892; 2021 50.700 ÷ 1.203; 2022 67.800 ÷ 2.038; 2023 101.300 ÷ 3.184; 2024 69.900 ÷ 2.951; 2025 72.600 ÷ 3.124.
const adel = [38400 / 1203, 50700 / 2038, 67800 / 3184, 101300 / 2951, 69900 / 3124, 72600 / bpa26];
const cierre = [38400 / 892, 50700 / 1203, 67800 / 2038, 101300 / 3184, 69900 / 2951, 72600 / 3124];
const med = (a) => { const s = [...a].sort((x, y) => x - y); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const ult5 = (a) => a.slice(-5);
const media = (a) => a.reduce((x, y) => x + y, 0) / a.length;
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'KRW', divisa_cotizacion: 'KRW', tipo_cambio: 1, unidades: 'millones',
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
    // Balance K-IFRS de 30-jun-2026 [A5]. Sin deuda financiera. Caja: efectivo 273.779 + activos financieros a corto 102.857 = 376.636.
    // Arrendamientos 8.649. Participadas 34.272 (valor contable). Minoritarios 4.599. otros_ajustes (positivo resta valor):
    // +96.000 de la compra de edificios en Seongnae (caja que sale de oct-2026 a feb-2027 [A15]) − 75.537 del terreno de Godeok que se
    // venderá (coste de 2023 [A16]) − 56.949 de activos financieros a largo (32.860 a coste amortizado, 23.501 y 588 a valor razonable)
    // = −36.486.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 8649, caja: 376636, minoritarios: 4599, pensiones: 0, asociadas: 34272, otros_ajustes: -36486 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        anios: 6,
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(ult5(adel))), minimo_5a: r2(Math.min(...ult5(adel))), media_larga: r2(media(adel)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(ult5(cierre))), minimo_5a: r2(Math.min(...ult5(cierre))), media_larga: r2(media(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 15.2 },
      consenso: { bpa_ano1: 3538, bpa_ano2: 3647, objetivo_medio: 60467, objetivo_min: 49000, objetivo_max: 80000, analistas: 15, tendencia_3m: 'recortes', fuente: 'FnGuide/WiseReport (BPA de 2027e y 2028e, media de tres meses a 16-oct-2026) y último objetivo de las 15 casas de julio-octubre de 2026 [D2, D3]' },
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

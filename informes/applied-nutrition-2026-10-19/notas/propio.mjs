// Parte del analista (Applied Nutrition, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 2.915; // cierre del 16-oct-2026 en la Bolsa de Londres, 291,5 peniques [D1]

// Historia del PER: cierre de julio (fin de ejercicio) [D1] ÷ BPA. Cotiza desde el 29-oct-2024: solo hay dos cierres de ejercicio.
// Adelantado: precio de julio ÷ BPA del ejercicio que empieza (FY26 y FY27 son los nuestros: FY26 está cerrado pero sin cuentas).
// Al cierre (v2): precio de julio ÷ BPA del ejercicio que termina (FY25 real 0,084 [A2]; FY26 el nuestro).
const cierres = { 2025: 1.31, 2026: 3.235 };
const bpaReal = { 2025: 0.084, 2026: bpa26, 2027: bpa27 };
const anos = [2025, 2026];
const adel = anos.map((a) => cierres[a] / bpaReal[a + 1]);
const cierre = anos.map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'GBP', divisa_cotizacion: 'GBP', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 7, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF adoptadas en el Reino Unido (FY2021-FY2022: FRS 102 de la filial), cuentas consolidadas', formato_cuenta: 'funcion',
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
    // Puente a 31-jul-2026 (cierre de FY26, sin auditar): caja neta sin NIIF 16 de 15,9 M GBP y sin deuda bancaria [A6];
    // arrendamientos ≈ 3,1 M (3,0 M a jul-25 y 2,8 M a ene-26, más el almacén nuevo) [A2, A3].
    puente: { fecha: '2026-07-31', deuda_financiera: 0, arrendamientos: 3.1, caja: 15.9, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D8]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: Math.round(B[e].bpa * 10000) / 10000, multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        anios: 2,
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adel)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 10.2 },
      consenso: { bpa_ano1: 0.1392, bpa_ano2: 0.1532, objetivo_medio: 3.536, objetivo_min: 2.80, objetivo_max: 3.95, analistas: 7, tendencia_3m: 'subidas', fuente: 'MarketScreener (BPA de FY2027e y FY2028e y objetivos de 7 analistas, 19-oct-2026) [D2, D3]' },
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

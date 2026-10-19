// Parte del analista (HD Hyundai Electric, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const dir = path.dirname(fileURLToPath(import.meta.url));
const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 525000; // cierre del 19-oct-2026 en el KOSPI [D1]

// Historia del PER: cierre de diciembre [D1] ÷ BPA real [A1-A4]; para 2025 el BPA de 2026e es el nuestro.
// Adelantado (v3): 2022-2025. Fuera 2020 (BPA de 2021 en pérdidas) y 2021 (BPA de 2022 atípico: 85.777 M de otros ingresos y casi sin impuesto).
// Al cierre (v2): 2023-2025. Fuera 2021 (pérdidas) y 2022 (BPA atípico).
const cierres = { 2020: 16400, 2021: 19900, 2022: 42500, 2023: 82200, 2024: 382000, 2025: 774000 };
const bpaReal = { 2021: -936, 2022: 4514, 2023: 7200, 2024: 13935, 2025: 20354, 2026: bpa26 };
const anos = [2022, 2023, 2024, 2025];
const anosV2 = [2023, 2024, 2025];
const adel = anos.map((a) => cierres[a] / bpaReal[a + 1]);
const cierre = anosV2.map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
const Dn = JSON.parse(fs.readFileSync(path.join(dir, 'D.json'), 'utf8'));
const medComps = r2(med(Dn.comparables.empresas.map((c) => c.per_ntm).filter((x) => x > 0)));
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B, medComps };

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
    // Balance K-IFRS de 30-jun-2026 [A5]. Deuda: préstamos y bonos a corto 104.518 + a largo 9.949. Arrendamientos 15.721 + 52.031.
    // Caja: efectivo 988.054 + depósitos a corto 21.041. Minoritarios 3.311.
    puente: { fecha: '2026-06-30', deuda_financiera: 114467, arrendamientos: 67752, caja: 1009095, minoritarios: 3311, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D9]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        anios: anos.length,
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adel)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: medComps },
      consenso: { bpa_ano1: 32314, bpa_ano2: 39584, objetivo_medio: 1083056, objetivo_min: 900000, objetivo_max: 1430000, analistas: 18, tendencia_3m: 'recortes', fuente: 'FnGuide/WiseReport (BPA de 2027e y 2028e, media de tres meses a 16-oct-2026) y objetivos de 18 analistas [D2]' },
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

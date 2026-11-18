// Parte del analista (BSE, corte 2026-11-18; iteración tras el 2T FY27). Citas con la letra de la nota: [A1] = fuente 1 de A.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const dir = path.dirname(fileURLToPath(import.meta.url));
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa27 = bpa('Base', 1).bpa;
const bpa28 = bpa('Base', 2).bpa;
const PRECIO = bolsa.identificacion.precio; // último cierre en la NSE [D1]

// Historia del PER: cierre de marzo de cada ejercicio [D1] ÷ BPA real atribuible del ejercicio siguiente (sin operaciones
// interrumpidas; FY2024 sin la plusvalía de CDSL), ajustado por las ampliaciones gratuitas de 2022 y 2025 [A1-A4]; FY2027 es
// nuestro BPA. FY2021: 11,23 INR antes de excepcionales ÷ 3 = 3,74 [A4].
const cierres = { FY2020: 32.98, FY2021: 63.46, FY2022: 314.67, FY2023: 143.65, FY2024: 838.63, FY2025: 1826.6, FY2026: 2683.5 };
const bpaReal = { FY2021: 3.74, FY2022: 6.17, FY2023: 5.35, FY2024: 9.97, FY2025: 32.06, FY2026: 60.32, FY2027: bpa27 };
const sig = (a) => `FY${Number(a.slice(2)) + 1}`;
// Adelantada (v3): solo cierres con BPA REAL del año siguiente (lección del 9-nov-2026): FY2021-FY2025. El informe del 20-oct
// metía FY2026 con nuestro BPA de FY2027e; ya no entra (FY2027 no ha cerrado). Al cierre (v2): FY2022-FY2026, todos reales.
const anos = ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'];
const anosC = ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];
const largos = ['FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'];
const largosC = ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];
const adel = anos.map((a) => cierres[a] / bpaReal[sig(a)]);
const cierre = anosC.map((a) => cierres[a] / bpaReal[a]);
const adelL = largos.map((a) => cierres[a] / bpaReal[sig(a)]);
const cierreL = largosC.map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, adelL, cierreL, PRECIO, bpa27, bpa28, B };

export default {
  meta: {
    fecha_corte: '2026-11-18', divisa: 'INR', divisa_cotizacion: 'INR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'Ind AS (NIIF adaptadas en India), cuentas consolidadas', formato_cuenta: 'naturaleza',
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
    // Balance auditado de 31-mar-2026 [A1]: sin deuda; caja PROPIA LIBRE de 52.251 M (partidas «Owned» menos depósitos de
    // miembros y retenciones para el Estado; el informe del 20-oct daba 60.772 M porque dejaba dentro 7.478 M de «statutory
    // remittances»). Minoritarios a valor contable (filiales de GIFT City con pérdidas). Asociadas: 15 % de CDSL (31,35 M de
    // acciones a 1.416,6 INR = 44.410 M) neto de un 14,3 % de impuesto sobre la plusvalía (38.059 M) [D7] + resto de asociadas al
    // valor contable (872 M) [A1]. otros_ajustes: dividendo final de 10 INR (4.120 M) pagado en julio de 2026 [A15].
    puente: { fecha: '2026-03-31', deuda_financiera: 0, arrendamientos: 0, caja: 52251, minoritarios: 1225, pensiones: 0, asociadas: 38931, otros_ajustes: 4120 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2029e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      // Base de BPA: publicado (operaciones continuadas, atribuible) en la historia y en los casos; solo FY2024 sin la plusvalía
      // excepcional de CDSL, que no se repite.
      base_bpa: 'publicado',
      per_historico: {
        base_bpa: 'publicado',
        base: 'adelantado',
        actual: r2(PRECIO / bpa28),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adelL)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierreL)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 23.8 },
      consenso: { bpa_ano1: 95.69, bpa_ano2: null, objetivo_medio: 3952, objetivo_min: 3000, objetivo_max: 4711, analistas: 20, tendencia_3m: 'subidas', fuente: 'Yahoo Finance (BPA de FY2028e de 18 analistas y objetivo medio, mínimo y máximo de 20 analistas, 18-nov-2026) [D2]' },
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

// Parte del analista (BSE, corte 2026-10-20). Citas con la letra de la nota: [A1] = fuente 1 de A.json.
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
const anos = ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];
const largos = ['FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];
const largosC = ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];
const adel = anos.map((a) => cierres[a] / bpaReal[sig(a)]);
const cierre = anos.map((a) => cierres[a] / bpaReal[a]);
const adelL = largos.map((a) => cierres[a] / bpaReal[sig(a)]);
const cierreL = largosC.map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, adelL, cierreL, PRECIO, bpa27, bpa28, B };

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'INR', divisa_cotizacion: 'INR', tipo_cambio: 1, unidades: 'millones',
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
    // Balance de 31-mar-2026 [A1]: sin deuda; caja PROPIA de 60.772 M (sin márgenes de miembros ni Core SGF). Minoritarios a
    // valor contable (filiales de GIFT City con pérdidas). Asociadas: 15 % de CDSL (31,35 M de acciones a 1.270 INR = 39.815 M)
    // neto de un 14,3 % de impuesto sobre la plusvalía (34.120 M) [D7] + resto de asociadas al valor contable (872 M) [A1].
    // otros_ajustes: dividendo final de 10 INR (4.120 M) pagado en julio de 2026, después del balance [A13].
    puente: { fecha: '2026-03-31', deuda_financiera: 0, arrendamientos: 0, caja: 60772, minoritarios: 1225, pensiones: 0, asociadas: 34992, otros_ajustes: 4120 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2029e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r2(PRECIO / bpa28),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adelL)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierreL)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 23.0 },
      consenso: { bpa_ano1: 88.50, bpa_ano2: null, objetivo_medio: 3698, objetivo_min: 2820, objetivo_max: 4500, analistas: 19, tendencia_3m: 'recortes', fuente: 'Yahoo Finance (BPA de FY2028e y objetivo medio de 19 analistas, 20-oct-2026) [D2]; mínimo y máximo de los objetivos publicados en prensa (Bernstein 2.820, UBS 4.500) [D10, D13]' },
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

// Parte del analista (King Slide, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';
import { bpas } from './bpa12m.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const B = Object.fromEntries(S.casos.map((c) => [c.escenario, bpas(c)]));
const PRECIO = 10100;
const r1 = (x) => Math.round(x * 10) / 10;
// Historia del PER ADELANTADO en base básica (la de nuestro BPA, 95,3 M acciones): cierre de cada año ÷ BPA básico real del año siguiente;
// para el cierre de 2025, nuestro BPA de 2026e.
const H = [
  ['2020', 297, 21.75], ['2021', 517, 42.56], ['2022', 384, 28.38], ['2023', 914, 64.59], ['2024', 1550, 103.23], ['2025', 3750, B.Base['2026e'].bpa],
].map(([a, p, e]) => [a, p, e, p / e]);
const ult5 = H.slice(-5).map((h) => h[3]).sort((a, b) => a - b);
const med5 = ult5[2];
const min5 = ult5[0];
const mediaLarga = H.reduce((s, h) => s + h[3], 0) / H.length;
const actual = PRECIO / B.Base['2027e'].bpa;
const txtH = H.map(([a, p, e, x]) => `${a}: ${p} ÷ ${e.toFixed(2).replace('.', ',')} = ${r1(x).toFixed(1).replace('.', ',')}x`).join('; ');

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'TWD', divisa_cotizacion: 'TWD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF adoptadas en Taiwán (TIFRS)', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'King Slide publica sus segmentos por sociedad (la filial de servidores y la matriz de muebles), sin resultado de cada una en las fuentes accesibles. Los muebles son unos 2.000 M TWD de ventas, el 4 % de 2026e: una suma de partes no cambiaría el valor y no tendría cifras propias en que apoyarse.', confianza: 'Media' },
  valoracion: {
    // Puente: balance de jun-26 [A3]. Caja = efectivo 29.384 + inversiones a corto 23 = 29.408 M (SA: 29.408).
    // Deuda bancaria 72,5 + 238,7 = 311,3 M; arrendamientos 28,8 + 1.206 = 1.235 M; pensiones 10,5 M.
    // otros_ajustes = dividendo de 51 TWD × 95,297 M acciones aprobado en la junta del 30-jun-2026 y pendiente de pago (4.860 M), que sigue en la caja de jun-26.
    puente: { fecha: '2026-06-30', deuda_financiera: 311.27, arrendamientos: 1234.81, caja: 29408, minoritarios: 0, pensiones: 10.52, asociadas: 0, otros_ajustes: 4860 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P1]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: B[e]['2028e'].bpa, multiplo: null, precio: null, justificacion: T.casos12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', anios: H.length,
        actual: r1(actual), mediana_5a: r1(med5), minimo_5a: r1(min5), media_larga: r1(mediaLarga),
        excluidos: `Ningún año excluido (ninguno con pérdidas, PER ≥ 150x ni atípico frente a la mediana). Historia ADELANTADA en base de BPA básico (la de nuestro BPA, 95,3 M acciones): cierre de cada año ÷ BPA básico real del año siguiente; para el cierre de 2025, nuestro BPA de 2026e. ${txtH}. Mediana de 2021-2025 ${r1(med5).toFixed(1).replace('.', ',')}x; mínimo ${r1(min5).toFixed(1).replace('.', ',')}x (2025); media de 2020-2025 ${r1(mediaLarga).toFixed(1).replace('.', ',')}x. PER actual = 10.100 (cierre del 20-oct-2026) ÷ nuestro BPA de 2027e (${B.Base['2027e'].bpa.toFixed(2).replace('.', ',')}) = ${r1(actual).toFixed(1).replace('.', ',')}x. Los cierres de 2019 y anteriores no tienen BPA del año siguiente en las fuentes accesibles.`,
        v2: { mediana_5a: 24.0, minimo_5a: 9.0, media_larga: 25.1, excluidos: 'Historia AL CIERRE (cierre ÷ BPA básico del mismo año): 2021 517 ÷ 21,75 = 23,8x; 2022 384 ÷ 42,56 = 9,0x; 2023 914 ÷ 28,38 = 32,2x; 2024 1.550 ÷ 64,59 = 24,0x; 2025 3.750 ÷ 103,23 = 36,3x. Mediana 24,0x, mínimo 9,0x, media 25,1x.' },
      },
      comparables_per: { mediana: 19.0 },
      consenso: { bpa_ano1: 345.4, bpa_ano2: 501.9, objetivo_medio: 15132.54, objetivo_min: 12000, objetivo_max: 18360, analistas: 13, tendencia_3m: 'subidas', fuente: 'MarketScreener (13 analistas) y Yahoo [D2, D3, D4]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  esg: T.esg ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};

// Parte del analista (Iberdrola, corte 2026-10-26). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente 1 de aquí.
import S from './supuestos.mjs';
import { tabla } from './bpa.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const b = (n) => tabla[n]['2028e'];
const precio = 21.90;
const r1 = (x) => Math.round(x * 10) / 10;
// Historia del PER ADELANTADA (cierre del año ÷ BPA publicado del año siguiente, tras cupones de híbridos [A1]; para el
// cierre de 2025, nuestro BPA de 2026e en la misma base). Cierres de bolsa.mjs [D8].
const cierres = { 2019: 9.18, 2020: 11.70, 2021: 10.41, 2022: 10.93, 2023: 11.87, 2024: 13.30, 2025: 18.47 };
const bpaReal = { 2020: 0.533, 2021: 0.579, 2022: 0.644, 2023: 0.715, 2024: 0.813, 2025: 0.899, 2026: tabla.Base['2026e'].bpa };
const adel = Object.fromEntries(Object.entries(cierres).map(([a, p]) => [a, p / bpaReal[+a + 1]]));
const alCierre = Object.fromEntries([2020, 2021, 2022, 2023, 2024, 2025].map((a) => [a, cierres[a] / bpaReal[a]]));
const med = (v) => { const s = [...v].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const cinco = [2021, 2022, 2023, 2024, 2025];
const actual = precio / tabla.Base['2027e'].bpa;
const fmt = (x) => String(r1(x)).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance de 30-sep-2026 [A2, A5]: deuda financiera 62.282 M (bruta APM 65.137 M menos 2.855 M de arrendamientos),
    // arrendamientos 2.855 M, activos tesoreros 8.153 M → deuda neta 56.983 M. Minoritarios: 4.378 M contables + 8.250 M de
    // híbridos perpetuos a nominal = 12.628 M. Pensiones 958 M → ≈719 M netos de impuestos. Asociadas 1.981 M a valor
    // contable (su resultado, ≈90 M al año, no llega al 5 % del EBIT). otros_ajustes: 919 M de instrumentos de capital con
    // características de pasivo financiero. Los derivados sobre autocartera (1.793 M) quedan dentro de la deuda (prudente).
    puente: { fecha: '2026-09-30', deuda_financiera: 62282, arrendamientos: 2855, caja: 8153, minoritarios: 12628, pensiones: 719, asociadas: 1981, otros_ajustes: 919 },
    rab: null, // La base de activos (56.000 M) es solo de Redes: un EV/RAB de todo el grupo no mide nada.
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P1]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: b('Bajista').bpa, multiplo: null, precio: null, justificacion: T.o12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: b('Base').bpa, multiplo: null, precio: null, justificacion: T.o12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: b('Alcista').bpa, multiplo: null, precio: null, justificacion: T.o12?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado',
        actual: r1(actual),
        mediana_5a: r1(med(cinco.map((a) => adel[a]))),
        minimo_5a: r1(Math.min(...cinco.map((a) => adel[a]))),
        media_larga: r1(Object.values(adel).reduce((s, x) => s + x, 0) / Object.values(adel).length),
        excluidos: `Ningún año excluido. Historia adelantada (cierre ÷ BPA publicado del año siguiente, tras cupones de híbridos): ${Object.entries(adel).map(([a, x]) => `${a} ${fmt(x)}x`).join('; ')}. El de 2025 usa nuestro BPA de 2026e (${String(bpaReal[2026]).replace('.', ',')} €), en la misma base que los casos: atribuido NIIF de operaciones continuadas menos cupones de híbridos, sin la plusvalía de México ni los «capital allowances». La media larga es la de 2019-2025 (siete cierres; el BPA de 2019 no está en la cuenta). Actual = 21,90 € ÷ nuestro BPA de 2027e (${String(tabla.Base['2027e'].bpa).replace('.', ',')} €) [A1, D8].`,
        v2: {
          actual: r1(actual), base: 'cierre',
          mediana_5a: r1(med(cinco.map((a) => alCierre[a]))),
          minimo_5a: r1(Math.min(...cinco.map((a) => alCierre[a]))),
          media_larga: r1(Object.values(alCierre).reduce((s, x) => s + x, 0) / 6),
          excluidos: `Historia al cierre (precio ÷ BPA publicado del mismo año), solo para el selector v2: ${Object.entries(alCierre).map(([a, x]) => `${a} ${fmt(x)}x`).join('; ')}.`,
        },
      },
      comparables_per: { mediana: 14.8 },
      consenso: { bpa_ano1: 1.024, bpa_ano2: 1.114, objetivo_medio: 21.38, objetivo_min: 18.0, objetivo_max: 25.0, analistas: 23, tendencia_3m: 'subidas', fuente: 'Yahoo Finance (BPA de 9 y 12 analistas; objetivo de 23) y Stock Analysis (objetivo medio 21,16 €) [D3, D2]' },
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
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};

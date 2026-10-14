// Parte del analista (Group 1 Automotive, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// El floorplan (deuda que financia el inventario) queda fuera de la deuda del puente y sus intereses dentro del EBITDA: para que el
// circulante sea coherente se trata como pasivo de explotación (proveedores), igual que hace la empresa con su flujo operativo ajustado.
const A = JSON.parse(fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), 'A.json'), 'utf8'));
const balanceHist = A.balance.historico.map((b) => ({ ...b, proveedores: Math.round(((b.floorplan_no_comercial ?? 0) + (b.floorplan_comercial ?? 0)) * 10) / 10 }));

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  balance: { ...(T.secciones?.balance ?? {}), historico: balanceHist },
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
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Deuda sin floorplan (el EBITDA del DCF ya descuenta sus intereses) y con el precio de Hennessy (≈1.300 M), que se paga en el 4T26
    // y cuyas ventas entran en la proyección desde 2027.
    puente: { fecha: '2026-06-30', deuda_financiera: 3363, arrendamientos: 0, caja: 164.5, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 1300 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D18]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 28.84, multiplo: null, precio: null, justificacion: 'Ventas de 23.728 M (−2,5 puntos de crecimiento en 2027-28) con un margen EBITDA neto de floorplan del 3,55 %, entre el de antes de la pandemia y el actual: EBIT de 712 M, 250 M de intereses de la deuda (bonos de Hennessy incluidos), impuesto del 25,5 % y 11,93 M de acciones.' },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 40.37, multiplo: null, precio: null, justificacion: 'Ventas de 24.900 M (Hennessy desde el 4T26 y un 2-3 % orgánico) con un margen EBITDA neto de floorplan del 4,15 %, el de 2024-25 sin los extraordinarios: EBIT de 896 M, 250 M de intereses, impuesto del 25,5 % y 11,93 M de acciones sin recompras no anunciadas.' },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 46.78, multiplo: null, precio: null, justificacion: 'Ventas de 25.617 M (+1,5 puntos de crecimiento) y margen del 4,45 %: la posventa y el recorte de costes de 50 M devuelven el margen al nivel de 2023.' },
      ],
      per_historico: { actual: 6.2, mediana_5a: 9.6, minimo_5a: 6.9, media_larga: 8.3, excluidos: '2020-2022: BPA de pico por la escasez de coches (PER de 3,9-7,0 sobre beneficios no repetibles). Se usa el BPA ajustado (sin deterioros ni plusvalías), en la misma base que los escenarios: 2018 5,6x; 2019 8,8x; 2023 6,9x; 2024 10,7x; 2025 9,6x [D1, D16, D17, A7, A8]. Actual = 231,59 ÷ 37,28 (nuestro BPA de 2027e).' },
      comparables_per: { mediana: 8.7 },
      consenso: { bpa_ano1: 38.76, bpa_ano2: 43.83, objetivo_medio: 331.25, objetivo_min: 232, objetivo_max: 450, analistas: 10, tendencia_3m: 'recortes', fuente: 'Stock Analysis (S&P Global) y MarketBeat [D6, D8]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};

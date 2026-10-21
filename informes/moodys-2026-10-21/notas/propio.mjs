// Parte del analista (Moody's, corte 2026-10-21, tras el 3T26). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
// Las secciones de negocio, cuentas, gobierno, bolsa, comparables, ESG y sentimiento salen de las notas A-E (fuentes primarias).
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const PRECIO = 475.35;
const b = Object.fromEntries(S.casos.map((c) => [c.escenario, bpa(c)]));
const bpaDe = (e, p) => b[e].find((f) => f.periodo === p).bpa;
const r1 = (x) => Math.round(x * 10) / 10;

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [
    // Regla 13: unos resultados ya publicados no retrasan (METODO-VIGENTE §4.13); la reacción del día se mide en la robustez con el precio actual.
    { ruta: 'bolsa.contexto.veredicto', valor: 'no cambia' },
    { ruta: 'bolsa.contexto.condicion', valor: null },
    { ruta: 'bolsa.contexto.noticias[0].veredicto', valor: 'no cambia' },
    { ruta: 'bolsa.contexto.noticias[0].condicion', valor: null },
    ...(T.parches ?? []),
  ],
  huecos_resueltos: T.huecos_resueltos ?? [],
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map(({ perfil, ...c }) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'MIS y MA comparten marca, datos y clientes, y la empresa no reparte deuda ni costes centrales por segmento: la suma de partes añadiría supuestos sin mejorar la valoración.', confianza: 'Media' },
  valoracion: {
    // Puente a 30-sep-2026 de D (comunicado del 3T26): deuda 568 + 6.343; caja 1.513 + 108 de inversiones a corto; asociadas y pensiones a 30-jun [D].
    puente: { fecha: '2026-09-30', deuda_financiera: 6911, arrendamientos: 0, caja: 1621, minoritarios: 144, pensiones: 68, asociadas: 483, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [D21]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: bpaDe(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r1(PRECIO / bpaDe('Base', '2027e')),
        // Serie adelantada en BPA ajustado de D; 2025 = 510,85 ÷ nuestro 2026e (16,67) = 30,6x.
        mediana_5a: 30.6, minimo_5a: 23.6, media_larga: 25.7,
        excluidos: T.per_excluidos ?? null,
      },
      comparables_per: { mediana: 22.2 },
      consenso: { bpa_ano1: 16.9, bpa_ano2: 18.76, objetivo_medio: 551.38, objetivo_min: 470, objetivo_max: 600, analistas: 24, tendencia_3m: 'estables', fuente: 'Yahoo (BPA ajustado, 24 analistas), Stock Analysis y MarketBeat (objetivos) [D14, D16, D17]' },
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

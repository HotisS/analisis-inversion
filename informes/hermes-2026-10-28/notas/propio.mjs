// Parte del analista (Hermès, corte 2026-10-28). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos, bpa } from './supuestos.mjs';

const PRECIO = 1268.5;
const r1 = (x) => Math.round(x * 10) / 10;
const b = Object.fromEntries(casos.map((c) => [c.escenario, bpa(c)]));
const bpaDe = (e, p) => b[e].find((f) => f.periodo === p).bpa;

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-28', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: T.sostenibilidad ?? null,
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Hermès es una sola marca con 16 oficios que comparten tiendas, talleres y clientes, y solo publica resultado por zonas geográficas, no por oficios [A1].', confianza: 'Alta' },
  valoracion: {
    pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: bpaDe(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      // Adelantado = cierre del año ÷ BPA real del año siguiente (financieros.cuenta; el cierre de 2025 ÷ nuestro BPA de 2026e). Cierres de bolsa.json (Yahoo).
      // Serie: 2020 37,8x · 2021 47,9x · 2022 35,1x · 2023 43,7x · 2024 53,9x · 2025 2.122 ÷ BPA 2026e. Fuera 2019 (BPA de 2020 hundido por la pandemia: 50,4x).
      // Cierre (v2, control): PER del mismo año 2022-2025 (45,0 / 46,7 / 52,9 / 49,3x); 2020-2021 fuera por la pandemia y el rebote (65,9x en 2021).
      per_historico: (() => {
        const cier = { 2020: 879.6, 2021: 1536, 2022: 1445, 2023: 1918.8, 2024: 2322, 2025: 2122 };
        const bpaReal = { 2021: 23.3, 2022: 32.09, 2023: 41.12, 2024: 43.87, 2025: 43.07, 2026: bpaDe('Base', '2026e') };
        const serie = Object.keys(cier).map((a) => cier[a] / bpaReal[+a + 1]);
        const ult5 = serie.slice(-5).sort((x, y) => x - y);
        const v2 = [1445 / 32.09, 1918.8 / 41.12, 2322 / 43.87, 2122 / 43.07].sort((x, y) => x - y);
        return { base: 'adelantado', base_bpa: 'publicado', actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: r1(ult5[2]), minimo_5a: r1(ult5[0]), media_larga: r1(serie.reduce((a, b) => a + b, 0) / serie.length),
          excluidos: '2019 (cierre de 2019 ÷ BPA de 2020, hundido por la pandemia); la serie publicada empieza en 2020',
          v2: { actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: r1((v2[1] + v2[2]) / 2), minimo_5a: r1(v2[0]), media_larga: r1(v2.reduce((a, b) => a + b, 0) / v2.length), base: 'cierre' } };
      })(),
      base_bpa: 'publicado',
      comparables_per: { mediana: 21.9 },
      consenso: { bpa_ano1: 43.98, bpa_ano2: 48.15, objetivo_medio: 1562.78, objetivo_min: 1150, objetivo_max: 1920, analistas: 23, tendencia_3m: 'recortes', fuente: 'S&P Global vía Yahoo Finance, 28-oct-2026, ya con los ingresos del 3T26 [D38]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};

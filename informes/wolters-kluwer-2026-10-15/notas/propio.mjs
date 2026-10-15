// Parte del analista (Wolters Kluwer, corte 2026-10-15; iteración del informe del 8-oct). Citas con prefijo de nota:
// [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import bpa from './bpa.mjs';
import * as T from './textos.mjs';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const A = JSON.parse(readFileSync(fileURLToPath(new URL('./A.json', import.meta.url)), 'utf8'));
const E = JSON.parse(readFileSync(fileURLToPath(new URL('./E.json', import.meta.url)), 'utf8'));

const fuentes = [
  { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 2, titulo: 'Investor Teach-In: Artificial Intelligence', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2025-12-08', url: 'https://assets.contenthub.wolterskluwer.com/api/public/content/3060139-wolters-kluwer-artificial-intelligence-teach-in-ed993f4be7?v=f79f45bf' },
  { id: 3, titulo: 'UpToDate presentation', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2025-09-11', url: 'https://assets.contenthub.wolterskluwer.com/api/public/content/2971261-2025-09-11-wolters-kluwer-uptodate-presentation-f335034a04?v=147fabc2' },
  { id: 4, titulo: '2026 Half-Year Report (resultados del primer semestre de 2026; guía por división, notas 4 y conciliaciones)', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2026-08-05', url: 'https://assets.contenthub.wolterskluwer.com/api/public/content/3775537-2026-08-05-wolters-kluwer-2026-half-year-results-7d85c04c6c?v=15135ed1' },
  { id: 5, titulo: '2025 Full-Year Report (resultados de 2025; BPA ajustado y conciliación)', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://assets.contenthub.wolterskluwer.com/api/public/content/3118646-2026-02-25-wolters-kluwer-2025-full-year-results-7391945524?v=2c966da9' },
  { id: 6, titulo: 'Investor calendar 2026 (actualización de nueve meses: 4-nov-2026)', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.wolterskluwer.com/es/investors/calendar-faq/investor-calendar' },
  { id: 7, titulo: '2025 Annual Report', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2026-03-11', url: 'https://assets.contenthub.wolterskluwer.com/api/public/content/3210406-wolters-kluwer-2025-annual-report-pdf-8bb01b4e47?v=ddef685b' },
  { id: 8, titulo: 'Rendimiento diario de la deuda federal a 10 años (serie BBSIS R10XX), 14-oct-2026: 3,51 %', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
  { id: 9, titulo: 'Cuentas XBRL ESEF 2020-2025 (filings.xbrl.org, LEI 724500TEM53I0U077B74)', editor: 'Wolters Kluwer / XBRL International', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://filings.xbrl.org/' },
  { id: 10, titulo: 'Share buyback transaction details September 10-16, 2026', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2026-09-17', url: 'https://www.wolterskluwer.com/en/news/share-buyback-transaction-details-september-10-16-2026' },
];

const J = T.justificacion;
const b = (esc) => bpa[esc]['2028e'].bpa;

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones,
    controles_explicados: T.controlesExplicados,
  },
  identificacion: { fecha_precio: '2026-10-14' },
  dcf: {
    anios, wacc, terminal, mitad_de_anio: true,
    etapa2: { ...etapa2, justificacion: J.etapa2 },
    justificacion: { crecimiento: J.crecimiento, margenes: J.margenes, inversion: J.inversion, wacc: J.wacc, terminal: J.terminal },
    sostenibilidad: T.sostenibilidad,
    lectura: T.lectura,
    confianza: 'Media',
  },
  escenarios: {
    casos: casos.map((c) => ({ ...c, narrativa: T.narrativas[c.escenario] })),
    comentario: T.escenariosComentario,
    confianza: 'Media',
  },
  valoracion: {
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran; válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)» [P1]' },
    pesos,
    comentario: T.valoracionComentario,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: b('Bajista'), multiplo: null, precio: null, justificacion: T.oj.bajista },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: b('Base'), multiplo: null, precio: null, justificacion: T.oj.base },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: b('Alcista'), multiplo: null, precio: null, justificacion: T.oj.alcista },
      ],
      per_historico: {
        base: 'adelantado', actual: 14.19, mediana_5a: 27.83, minimo_5a: 17.36, media_larga: 25.76, anios: 7,
        excluidos: 'Historia ADELANTADA (precio de cierre de cada año ÷ BPA NIIF del año siguiente sin plusvalías ni pérdidas de desinversiones, la misma base que nuestros casos): 2019 24,1x (65,02/2,70); 2020 24,2x (69,06/2,86); 2021 27,8x (103,60/3,72, BPA 2022 sin la plusvalía de 75 M de Francia y España); 2022 24,0x (97,76/4,08); 2023 28,4x (128,70/4,54); 2024 34,5x (160,40/4,65, BPA 2025 sin la plusvalía de 231 M de FRR; con el publicado, 28,4x); 2025 17,4x (88,34 ÷ nuestro BPA 2026e de 5,09). Ningún año de pérdidas, PER ≥ 150x ni atípico; mediana y mínimo de 2021-2025, media de los siete. Actual: 78,06 ÷ nuestro BPA 2027e (5,50) = 14,2x. El informe del 8-oct no metía el cierre de 2025 ni normalizaba 2022 y 2025 (mediana 25,8x).',
        v2: { actual: 14.19, mediana_5a: 31.57, minimo_5a: 19.01, media_larga: 29.0, base: 'cierre', excluidos: 'Historia AL CIERRE (precio de cierre ÷ BPA del mismo año, misma base normalizada): 2020 25,6x; 2021 36,3x; 2022 26,3x; 2023 31,6x; 2024 35,3x; 2025 19,0x. Mediana y mínimo de 2021-2025, media de 2020-2025. Sin exclusiones (el informe del 8-oct quitaba 2021 de la media; aquí no se elige a mano).' },
      },
      comparables_per: { mediana: 21.0 },
      consenso: { bpa_ano1: 5.69, bpa_ano2: 6.34, objetivo_medio: 89.91, objetivo_min: 56, objetivo_max: 120, analistas: 16, tendencia_3m: 'estables', fuente: 'MarketScreener, 15-oct-2026 [D7, D8]' },
      diferencia_consenso: T.oj.diferencia,
      media: null,
      comentario: T.oj.comentario,
    },
    confianza: 'Media',
  },
  catalizadores: T.catalizadores,
  preguntas: T.preguntas,
  riesgos: { items: T.riesgos, premortem: T.premortem, ia: T.ia, confianza: 'Media' },
  comparables: { comentario: T.comparablesComentario },
  calidad: { comentario: A.calidad.comentario + T.calidadLectura },
  resumen: { ...T.resumen, vision_diferencial: T.vision, sintesis: T.sintesis },
  rentabilidad: { comentario: T.rentabilidadComentario, confianza: 'Alta' },
  capital: { comentario: T.capitalComentario },
  sentimiento: { ...E.sentimiento, temas: T.temasSentimiento },
  multiplos_historicos: { comentario: T.multiplosComentario },
  consenso: { guidance: T.guidance },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No se aplica. Las cinco divisiones venden suscripciones de información y software a profesionales con crecimientos orgánicos parecidos (3-7 % en 2025) y comparten tecnología, marca y la plataforma de IA; los márgenes difieren (de 7,5 % en CP&ESG a 35,2 % en Tax & Accounting y FCC) [A1], pero no hay comparables cotizados puros para valorarlas por separado: Elsevier va dentro de RELX y el rival de CT Corporation (CSC) no cotiza. Una suma de partes con múltiplos prestados añadiría error sin información nueva.', confianza: 'Media' },
  _parches: [
    { ruta: 'transacciones.operaciones[6].ev_ventas', valor: 11.2 },
    { ruta: 'negocio.kpis[4].valor_anterior', valor: 'No publicado (2024)' },
    { ruta: 'transacciones.operaciones[6].comentario', valor: 'Proveedor europeo de automatización del IVA con 112 empleados, comprado por 112 M EUR de valor empresa en efectivo [D1]. EV/ventas de 11,2 veces: estimación propia con los ingresos brutos de 2025 que da la empresa, en torno a 10 M EUR sin auditar (+25 %) [P4].' },
  ],
  fuentes,
};

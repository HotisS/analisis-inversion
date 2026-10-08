// Parte del analista (Wolters Kluwer, corte 2026-10-08). Citas con prefijo de nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import * as T from './textos.mjs';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const A = JSON.parse(readFileSync(fileURLToPath(new URL('./A.json', import.meta.url)), 'utf8'));

const fuentes = [
  { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 2, titulo: 'Investor Teach-In: Artificial Intelligence', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2025-12-08', url: 'https://assets.contenthub.wolterskluwer.com/api/public/content/3060139-wolters-kluwer-artificial-intelligence-teach-in-ed993f4be7?v=f79f45bf' },
  { id: 3, titulo: 'UpToDate presentation', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2025-09-11', url: 'https://assets.contenthub.wolterskluwer.com/api/public/content/2971261-2025-09-11-wolters-kluwer-uptodate-presentation-f335034a04?v=147fabc2' },
  { id: 4, titulo: '2026 Half-Year Report (resultados del primer semestre de 2026)', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2026-08-05', url: 'https://assets.contenthub.wolterskluwer.com/api/public/content/3775537-2026-08-05-wolters-kluwer-2026-half-year-results-7d85c04c6c?v=15135ed1' },
  { id: 5, titulo: '2025 Full-Year Report (resultados de 2025)', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://assets.contenthub.wolterskluwer.com/api/public/content/3118646-2026-02-25-wolters-kluwer-2025-full-year-results-7391945524?v=2c966da9' },
  { id: 6, titulo: 'First-Quarter 2026 Trading Update', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2026-05-06', url: 'https://assets.contenthub.wolterskluwer.com/api/public/content/3316098-2026-05-06-wolters-kluwer-first-quarter-2026-trading-update-a6a04158be?v=9092ad42' },
  { id: 7, titulo: 'Investor calendar 2026', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2026-10-08', url: 'https://www.wolterskluwer.com/en/investors/calendar-faq/investor-calendar' },
  { id: 8, titulo: '2025 Annual Report', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2026-03-11', url: 'https://assets.contenthub.wolterskluwer.com/api/public/content/3210406-wolters-kluwer-2025-annual-report-pdf-8bb01b4e47?v=ddef685b' },
  { id: 9, titulo: 'Rendimiento diario de la deuda federal a 10 años (serie BBSIS R10XX)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
];

const J = T.justificacion;

export default {
  meta: {
    fecha_corte: '2026-10-08', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones,
    controles_explicados: [{ control: 'Comparables estables al quitar una empresa', explicacion: 'La mediana del EV/EBITDA de los próximos 12 meses depende de Intuit, Veeva y Gartner, que encajan peor (EBITDA sin remuneración en acciones o ventas a la baja). Se explica en la sección de comparables y por eso pesan solo un 20 % del valor objetivo.' }],
  },
  dcf: {
    anios, wacc, terminal, mitad_de_anio: true,
    etapa2: { ...etapa2, justificacion: J.etapa2 },
    justificacion: { crecimiento: J.crecimiento, margenes: J.margenes, inversion: J.inversion, wacc: J.wacc, terminal: J.terminal },
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
    confianza: 'Media',
  },
  catalizadores: T.catalizadores,
  preguntas: T.preguntas,
  riesgos: { items: T.riesgos, premortem: T.premortem, confianza: 'Media' },
  comparables: { comentario: T.comparablesComentario },
  calidad: { comentario: A.calidad.comentario + T.calidadLectura },
  resumen: { ...T.resumen, vision_diferencial: T.vision, sintesis: T.sintesis },
  rentabilidad: { comentario: T.rentabilidadComentario, confianza: 'Alta' },
  capital: { comentario: T.capitalComentario },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No se aplica. Las cinco divisiones venden suscripciones de información y software a profesionales con crecimientos orgánicos parecidos (5-7 % en 2025) y comparten tecnología, marca y la plataforma de IA; los márgenes difieren (de 7,5 % en CP&ESG a 35,2 % en Tax & Accounting y FCC) [A1], pero no hay comparables cotizados puros para valorarlas por separado: Elsevier va dentro de RELX y el rival de CT Corporation (CSC) no cotiza. Una suma de partes con múltiplos prestados añadiría error sin información nueva.', confianza: 'Media' },
  _parches: [
    { ruta: 'transacciones.operaciones[6].ev_ventas', valor: 11.2 },
    { ruta: 'negocio.kpis[4].valor_anterior', valor: 'No publicado (2024)' },
    { ruta: 'transacciones.operaciones[6].comentario', valor: 'Proveedor europeo de automatización del IVA con 112 empleados, comprado por 112 M EUR de valor empresa en efectivo [D1]. EV/ventas de 11,2 veces: estimación propia con los ingresos brutos de 2025 que da la empresa, en torno a 10 M EUR sin auditar (+25 %) [P4].' },
  ],
  fuentes,
};

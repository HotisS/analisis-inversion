// Escribe las notas A-E de Interparfums SA (ITP, Euronext París; corte 2026-10-15) a partir de las fuentes leídas:
// XBRL ESEF 2020-2025 (cuentas-xbrl.json), documento de registro universal 2025 (AMF D.26-0188), comunicados del 1T26, 1S26 (ventas y
// resultados) y de derechos de voto del 30-sep-2026 (archivo AMF/DILA), declaraciones de directivos de la BDIF, bolsa.json (Yahoo),
// MarketScreener, comparables del repositorio (Puig 9-oct y ficha de higiene y cosmética 14-oct) y foros.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(dir, '..', '..', '..');
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const B = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const ACC = 87.83; // acciones de hoy: 87.984.846 emitidas (30-sep-2026) − 153.090 en autocartera
const r2 = (x) => Math.round(x * 1000) / 1000;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: "Document d'enregistrement universel 2025 (rapport financier annuel; comptes consolidés y notas)", editor: 'Interparfums SA / AMF (D.26-0188)', tipo: 'Primaria', fecha: '2026-03-31', url: 'https://bdif.amf-france.org/back/api/v1/documents/2026/D.26-0188/7C7EC956EFAB4270106AAC85431843C230E2AFD6926C0576B77E29068CCAC916.zip' },
  { id: 2, titulo: 'H1 2026 results: operating margin 21.1 %, net margin 15.8 % (cuenta, balance y flujos del 1S26)', editor: 'Interparfums SA (archivo AMF/DILA)', tipo: 'Primaria', fecha: '2026-09-09', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2026/09/FCECO083141_20260909.pdf' },
  { id: 3, titulo: '2026 first half sales: €414m at current exchange rates (−7.3 %) (ventas por marca y zona; previsión 2026)', editor: 'Interparfums SA (archivo AMF/DILA)', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2026/07/FCECO082676_20260723.pdf' },
  { id: 4, titulo: 'Comptes consolidés ESEF 2020-2025 (informes anuales en XBRL: cuenta, balance y flujos)', editor: 'Interparfums SA (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-03-31', url: 'https://filings.xbrl.org/969500SARWF33OPQED48/2025-12-31/ESEF/FR/0/itp-2025-12-31-1-fr/reports/itp-2025-12-31-1-fr.xhtml' },
  { id: 5, titulo: 'Q1 2026 sales: €229.5m at constant exchange rates, €215.5m at current exchange rates', editor: 'Interparfums SA (archivo AMF/DILA)', tipo: 'Primaria', fecha: '2026-04-22', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2026/04/FCECO081678_20260422.pdf' },
  { id: 6, titulo: 'Déclaration mensuelle du nombre total de droits de vote et du nombre d’actions au 30 septembre 2026', editor: 'Interparfums SA (archivo AMF/DILA)', tipo: 'Primaria', fecha: '2026-10-07', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2026/10/FCECO083381_20261007.pdf' },
];

// Cuenta: XBRL + gastos comerciales (faltaban en el XBRL) + BPA y DPA en acciones de hoy (11 ampliaciones gratuitas 1x10 y la de 1x20 de jul-2026).
const DPA = { 2020: 0.325, 2021: 0.611, 2022: 0.751, 2023: 0.905, 2024: 0.996, 2025: 1.0 }; // dividendo de cada ejercicio, ajustado (Yahoo y URD)
const NOREC = { 2022: 6.5, 2023: -5.2, 2024: 0.2 }; // otros gastos (+) e ingresos (−) de explotación fuera del resultado operativo corriente
const RES = { 2020: 337, 2021: 369, 2022: 404, 2023: 433, 2024: 469, 2025: 477 }; // reservas y resultados (patrimonio menos capital)
const cuenta = X.financieros.cuenta.map((c) => {
  const p = c.periodo;
  return {
    periodo: p, ingresos: c.ingresos, coste_ventas: c.coste_ventas,
    gastos_generales: Math.round((c.ingresos - c.coste_ventas - c.ebit) * 10) / 10,
    ebitda: Math.round((c.ebit + c.amortizaciones) * 10) / 10, amortizaciones: c.amortizaciones, ebit: c.ebit,
    resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: c.minoritarios,
    beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: NOREC[p] ?? null,
    bpa: r2(c.beneficio_neto / ACC), dpa: DPA[p], dpa_extraordinario: 0, acciones_diluidas: ACC,
  };
});
const INTANG = { 2020: 153.6, 2021: 149.8, 2022: 231.6, 2023: 235.2 };
const historico = X.balance.historico.map((b) => ({
  periodo: b.periodo, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente,
  pasivo_total: b.pasivo_total, fondo_comercio: 0, intangibles: b.intangibles ?? INTANG[b.periodo], inmovilizado_material: b.inmovilizado_material,
  existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: null,
  caja: b.periodo === '2025' ? 204.5 : b.periodo === '2024' ? 190.6 : b.caja, deuda_financiera: b.deuda_financiera, arrendamientos: b.arrendamientos,
  patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios, reservas: RES[b.periodo],
}));
const ARR = { 2020: 2.6, 2021: 2.5, 2022: 2.5, 2023: 2.5, 2024: 1.4, 2025: 2.9 };
const INTF = { 2024: 2.0, 2025: 4.6 };
const flujosH = X.flujos.historico.map((f) => ({
  periodo: f.periodo, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: ARR[f.periodo],
  adquisiciones: f.periodo === '2025' ? 2.0 : 0, desinversiones: 0, dividendos: f.dividendos, recompras: Math.max(0, f.recompras ?? 0),
  emision_acciones: 0, intereses_en_financiacion: INTF[f.periodo] ?? 0,
}));

const A = {
  _estado: 'completo',
  negocio: {
    descripcion: 'Interparfums SA crea, fabrica con subcontratistas y distribuye perfumes de prestigio para marcas de moda, joyería y accesorios: la mayoría bajo licencia exclusiva (Jimmy Choo, Coach, Montblanc, Lacoste, Van Cleef & Arpels, Boucheron, Karl Lagerfeld, Kate Spade, Moncler y, desde 2027, Longchamp) y unas pocas propias (Lanvin, Rochas, Off-White en perfumes, Annick Goutal y Solférino Paris) [1]. No tiene fábricas: jugos, frascos, tapones y acondicionamiento los hacen socios industriales, y la empresa controla el marketing, el desarrollo (12-18 meses por producto) y la logística desde un almacén de 36.000 m² en Francia y otros en EE. UU., Corea y Singapur [1]. Vende en más de 100 países y más de 25.000 puntos de venta a través de filiales propias, distribuidores independientes y operadores de duty free; el 93,6 % de las ventas de 2025 fue fuera de Francia y Norteamérica pesó el 38,6 % [1]. Plantilla de 378 personas a cierre de 2025 [1].',
    como_gana_dinero: 'El margen sale de vender un perfume con un margen bruto del 65 % (64,7 % en 2025; 67,3 % en el 1S26) del que se pagan dos grandes costes variables: publicidad y promoción, el 21,3 % de las ventas (191,9 M en 2025), y regalías a los dueños de las marcas, el 8,4 % (76,0 M) [1]. Con unos gastos de estructura muy bajos (administración 35,5 M, el 3,9 %), el resultado operativo corriente se ha movido entre el 19,5 % y el 21,9 % de 2022 a 2025 [1, 2]. No hay ingresos recurrentes por contrato: cada año se vende por la recompra en tienda de las líneas existentes y por los lanzamientos (unas 15 extensiones en 2026 y unas 20 iniciativas grandes en 2027-2028) [1, 3]. La palanca de margen es flexible: la empresa recorta publicidad cuando caen las ventas (mantuvo el 21 % de margen en el 1S26 con ventas −7 %) [2]. Estacionalidad: el primer semestre pesa más y el circulante se dispara en verano antes de Navidad [2].',
    segmentos: [
      { nombre: 'Jimmy Choo', descripcion: 'Licencia hasta dic-2031 (Capri Holdings)', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 131.0, resultado: null }, { periodo: '2022', ingresos: 181.6, resultado: null }, { periodo: '2023', ingresos: 209.9, resultado: null }, { periodo: '2024', ingresos: 224.3, resultado: null }, { periodo: '2025', ingresos: 227.9, resultado: null }] },
      { nombre: 'Coach', descripcion: 'Licencia hasta jun-2031 (Tapestry)', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 115.6, resultado: null }, { periodo: '2022', ingresos: 153.8, resultado: null }, { periodo: '2023', ingresos: 187.4, resultado: null }, { periodo: '2024', ingresos: 182.0, resultado: null }, { periodo: '2025', ingresos: 200.0, resultado: null }] },
      { nombre: 'Montblanc', descripcion: 'Licencia renovada hasta dic-2030 (Richemont)', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 142.3, resultado: null }, { periodo: '2022', ingresos: 184.0, resultado: null }, { periodo: '2023', ingresos: 205.6, resultado: null }, { periodo: '2024', ingresos: 203.4, resultado: null }, { periodo: '2025', ingresos: 193.2, resultado: null }] },
      { nombre: 'Lacoste', descripcion: 'Licencia desde 2024 hasta dic-2038', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 0, resultado: null }, { periodo: '2022', ingresos: 0, resultado: null }, { periodo: '2023', ingresos: 0, resultado: null }, { periodo: '2024', ingresos: 78.7, resultado: null }, { periodo: '2025', ingresos: 95.4, resultado: null }] },
      { nombre: 'Lanvin y Rochas (propias)', descripcion: 'Marcas en propiedad; Lanvin con opción de recompra del dueño de la moda el 1-jul-2027', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 87.7, resultado: null }, { periodo: '2022', ingresos: 88.0, resultado: null }, { periodo: '2023', ingresos: 89.3, resultado: null }, { periodo: '2024', ingresos: 87.4, resultado: null }, { periodo: '2025', ingresos: 82.0, resultado: null }] },
      { nombre: 'Otras licencias y marcas', descripcion: 'Karl Lagerfeld, Van Cleef & Arpels, Boucheron, Kate Spade, Moncler, Solférino y otras', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 84.2, resultado: null }, { periodo: '2022', ingresos: 99.2, resultado: null }, { periodo: '2023', ingresos: 106.3, resultado: null }, { periodo: '2024', ingresos: 104.7, resultado: null }, { periodo: '2025', ingresos: 100.9, resultado: null }] },
    ],
    geografias: [
      { nombre: 'Norteamérica', peso_pct: 38.6 }, { nombre: 'Europa occidental', peso_pct: 18.1 }, { nombre: 'Asia', peso_pct: 12.8 },
      { nombre: 'Europa del Este', peso_pct: 8.8 }, { nombre: 'Sudamérica', peso_pct: 8.8 }, { nombre: 'Francia', peso_pct: 6.4 },
      { nombre: 'Oriente Medio', peso_pct: 5.8 }, { nombre: 'África', peso_pct: 0.7 },
    ],
    geografias_criterio: 'destino',
    clientes: 'Los clientes son distribuidores, grandes almacenes, cadenas de perfumería y operadores de duty free; la empresa no publica la concentración por cliente [1]. El riesgo de concentración está en los licenciantes: Jimmy Choo (25,3 % de las ventas de 2025), Coach (22,2 %) y Montblanc (21,5 %) suman el 69 % [1]. Las licencias son largas y se han renovado casi siempre (Coach hasta 2031, Van Cleef & Arpels hasta 2033, Montblanc hasta 2030, Boucheron prolongada hasta 2027), pero la de Moncler acaba en dic-2026 sin renovación publicada y el dueño de la moda Lanvin tiene una opción para recomprar las marcas de perfume el 1-jul-2027 [1]. Las garantías mínimas de regalías comprometidas suman 308,7 M [1]. Poder de precios: el margen bruto se mantuvo en el 64,7-67,3 % con la inflación de costes de 2022-2025 y los aranceles de EE. UU., que se compensaron con precio y mezcla [1, 2].',
    kpis: [
      { kpi: 'Ventas a tipos constantes', valor_anterior: '+4 % (2025)', valor_actual: '−3,7 % (1S26)', variacion: '−7,7 pp', comentario: 'Guía 2026: −3 % a tipos constantes, 850-870 M a corrientes [3].' },
      { kpi: 'Margen bruto', valor_anterior: '65,5 % (1S25)', valor_actual: '67,3 % (1S26); 66,7 % sin aranceles', variacion: '+1,8 pp', comentario: 'Incluye la devolución de aranceles de EE. UU. de abr-2025 a feb-2026 [2].' },
      { kpi: 'Publicidad y promoción / ventas', valor_anterior: '18,1 % (1S25)', valor_actual: '20,0 % (1S26)', variacion: '+1,9 pp', comentario: 'Preparación de los lanzamientos de 2027 [2].' },
      { kpi: 'Margen operativo', valor_anterior: '19,5 % (2025)', valor_actual: '21,1 % (1S26); guía ≈18 % en 2026', variacion: '−1,5 pp previsto', comentario: 'La guía anual implica un 2S26 cerca del 15 % [2].' },
      { kpi: 'Existencias', valor_anterior: '234,8 M (jun-25)', valor_actual: '205,4 M (jun-26)', variacion: '−12,5 %', comentario: 'Compras de componentes más selectivas [2].' },
      { kpi: 'Ventas de la filial de EE. UU. en moneda local', valor_anterior: '+9 % (2025)', valor_actual: '≈+8 % (1S26)', variacion: 'estable', comentario: 'Coach y Jimmy Choo ganan cuota en EE. UU. [1, 3].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 866.8, ebitda: 180.5, ebit: 158.7, beneficio_neto: 119.0, bpa: r2(119.0 / ACC), dpa: 1.0, dpa_extraordinario: 0, fcf: 165.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Las ventas pasaron de 367 M en 2020 a 899 M en 2025 (TCAC del 19,7 %), con el auge de los perfumes de 2021-2024 y la entrada de Lacoste en 2024 (95 M en 2025); en 2025 crecieron solo un 2,1 % (+4 % a tipos constantes) y en el 1S26 cayeron un 7,3 % (−3,7 % a tipos constantes) por Oriente Medio (−32 %), Europa del Este (−20 %) y Europa occidental (−17 %), con EE. UU. al alza [1, 3]. El margen operativo corriente subió del 19,6 % de 2022 al 20,2 % de 2024 y bajó al 19,5 % en 2025 por 7,6 M de aranceles de EE. UU. (20,3 % sin ellos) [1]. En el 1S26 fue del 21,1 % (23,3 % en el 1S25), y la guía del año es de «alrededor del 18 %», lo que implica un segundo semestre en torno al 15 % por la publicidad previa a los lanzamientos de 2027 [2]. El resultado financiero empeoró en 2025 (−9,2 M) por el coste de las coberturas de divisa [1].',
    ajustes: 'Las cifras son las publicadas. El EBITDA es el resultado operativo más amortizaciones y provisiones del XBRL (206 M en 2025, igual que el de MarketScreener) [4]. Otros gastos y productos de explotación fuera del resultado corriente: −6,5 M en 2022, +5,2 M en 2023 y −0,2 M en 2024 (se devuelven al EBITDA como no recurrentes) [1]. El BPA y el DPA están expresados en las acciones de hoy (87,83 M): la empresa reparte cada año acciones gratuitas (1x10 de 2015 a 2025 y 1x20 en julio de 2026) y su BPA publicado solo se reexpresa a prorrata, así que se usa beneficio ÷ acciones de hoy (1,44 EUR en 2025 frente a 1,58 publicado) [1, 6]. En el 1S26 hay una devolución no prevista de los aranceles de EE. UU. pagados de abril de 2025 a febrero de 2026; neta del arancel del semestre mueve el margen bruto unos 0,6 puntos (≈2,5 M) [2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 422.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: r2(69.6 / ACC), vs_consenso: null },
      { periodo: '2S24', ingresos: 457.9, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: r2(60.3 / ACC), vs_consenso: null },
      { periodo: '1S25', ingresos: 446.9, crecimiento_pct: 5.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: r2(73.1 / ACC), vs_consenso: null },
      { periodo: '2S25', ingresos: 452.5, crecimiento_pct: -1.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: r2(53.5 / ACC), vs_consenso: null },
      { periodo: '1S26', ingresos: 414.3, crecimiento_pct: -7.3, crecimiento_organico_pct: -3.7, ebitda: null, margen_ebitda_pct: null, bpa: r2(65.5 / ACC), vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En las ventas del 1S26 (23-jul) la dirección habló de «un entorno que nunca ha sido tan complicado»: guerra en Oriente Medio, la situación de Europa del Este y el dólar (1,17 frente a 1,09 de media), y rebajó el año a 850-870 M de ventas (−3 % a tipos constantes) con un margen operativo del 19-20 % en el semestre [3]. En los resultados (9-sep) el margen salió en el 21,1 %, por encima de su propia guía, gracias a la devolución de los aranceles de EE. UU., y mantuvo para el año «alrededor del 18 %» [2]. El mensaje cambió del corto plazo a 2027-2028: unas 20 iniciativas grandes (primeros perfumes de Longchamp, Off-White y Annick Goutal, una tercera franquicia de Montblanc y novedades de Lacoste y Lanvin), que según la empresa han gustado a los distribuidores [2, 3]. La dirección no ha dado cifras para 2027: las publicará el 19-nov-2026 [2]. No dijo nada de la licencia de Moncler, que vence en dic-2026, ni de la opción de recompra de Lanvin de jul-2027 [1-3]. Los analistas esperaban un resultado operativo de 79,7 M y salió en 87,3 M (prensa del 9-sep) [2].',
    confianza: 'Media',
  },
  balance: {
    historico,
    vencimientos: [{ anio: '2026', importe: 45.1 }, { anio: '2027-2030', importe: 88.3 }, { anio: '2031+', importe: 7.8 }],
    liquidez: 'Caja y activos financieros corrientes de 115,0 M a 30-jun-2026 (204,5 M a dic-2025) frente a 118,2 M de deuda financiera; deuda neta de 3,2 M sin arrendamientos [2].',
    rating: 'Sin rating',
    coste_deuda_pct: 4.0,
    vida_media_anios: 2.5,
    otros_pasivos: 'Covenant de deuda neta / EBITDA < 2,5x sobre 78,5 M de préstamos (−0,26x en 2025) [1]. Garantías mínimas de regalías comprometidas con los licenciantes: 308,7 M (57,6 M a un año, 160,3 M a 1-5 años y 90,8 M a más de 5) y 22,7 M de mínimos de logística [1]: no son deuda, pero obligan aunque caigan las ventas. Provisiones de 4,3 M (sobre todo jubilaciones) [1]. Avance de regalías a Karl Lagerfeld en el activo (9,6 M de origen) [1]. Opción del dueño de Lanvin para recomprar las marcas de perfume el 1-jul-2027 (precio no publicado) [1].',
    comentario: 'El balance es muy holgado: patrimonio de 730 M, casi el 70 % del activo, y deuda financiera de 141 M cubierta por 204,5 M de caja a dic-2025 [1]. El circulante es el gran consumidor de caja: existencias + clientes − proveedores ≈ 30 % de las ventas (269 M en 2025); las existencias subieron de 92 M (2020) a 230 M (2024) por los plazos de suministro y bajaron a 197 M en 2025 al normalizarse [1]. La deuda se tomó en 2021-2023 para la sede de la rue de Solférino y la entrada en Lacoste y se va amortizando: −23 M en el 1S26 [2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosH,
    comentario: 'El flujo operativo pasó de 46 M (2020) a 150 M (2025); la conversión del beneficio en caja fue floja en 2022-2024 (79-108 M con beneficios de 100-130 M) porque el circulante absorbió 44 M solo en 2024, y buena en 2025 al bajar existencias (+4 M) [1]. La inversión no es de fábricas: en 2021 fue la compra de la sede (capex de 118 M), en 2022 la entrada en la licencia de Lacoste y en 2024-2025 las marcas Off-White y Annick Goutal (intangibles de 16-22 M al año) [1, 4]. El capex de mantenimiento (moldes, utillaje de vidrio, sistemas) es pequeño: unos 10-15 M al año (estimación propia por las amortizaciones de 22-31 M que incluyen las de marcas y licencias). Dividendos de 87,6 M en 2025, el 69 % del beneficio, y 87,8 M en el 1S26 [1, 2].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Forvis Mazars y SFECO & Fiducia Audit (en 2024 también Grant Thornton)',
    anios_auditor: null,
    opinion: 'Favorable',
    comentario: 'Las cuentas son sencillas: no hay fondo de comercio, los intangibles (251 M) son marcas propias (Lanvin, Rochas, Off-White, Annick Goutal) y derechos de licencia, con prueba de deterioro anual sin pérdidas en 2025 [1]. Los riesgos contables están en tres partidas: (1) devoluciones y provisiones comerciales con distribuidores, que mueven el margen bruto; (2) coberturas de divisa, cuyo coste pasó por el resultado financiero (−9,2 M en 2025); y (3) el BPA publicado, que reexpresa a prorrata las acciones gratuitas y no compara bien entre años (por eso usamos beneficio ÷ acciones de hoy) [1]. La empresa se integra además en el control interno Sarbanes-Oxley de su matriz estadounidense [1]. Los pagos en acciones son mínimos (0,2 M en 2025) [1]. Los tres indicadores no muestran alertas: Altman Z de 7,82 (muy lejos de la zona de riesgo, sin deuda), Piotroski F de 6 sobre 9 (restan el ROA, el endeudamiento sobre activo y el margen bruto de 2025) y Beneish M de −2,55, por debajo del umbral de manipulación (−1,78).',
    senales: [
      { senal: 'BPA publicado no comparable entre años', nivel: 'Baja', comentario: 'Reexpresión a prorrata de las acciones gratuitas; se usa beneficio ÷ 87,83 M acciones [1, 6].' },
      { senal: 'Circulante alto y volátil', nivel: 'Media', comentario: 'Existencias + clientes − proveedores ≈ 30 % de las ventas; consumió 44 M en 2024 [1].' },
      { senal: 'Devolución de aranceles en el 1S26', nivel: 'Baja', comentario: 'Partida no recurrente pequeña (≈0,6 puntos de margen bruto) [2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo de en torno al 65-70 % del beneficio desde 1998 (1,05 EUR por acción por 2025, 87,8 M pagados en mayo de 2026) más una ampliación gratuita casi cada año (1x10 de 2015 a 2025; 1x20 en julio de 2026) [1, 2]. Programa de recompra aprobado por la junta del 24-abr-2026 por hasta el 2,5 % del capital, que en la práctica se usa para el contrato de liquidez (autocartera de 153.090 acciones) [6]. La caja restante va a comprar marcas propias o derechos de licencia cuando aparecen [1].',
    adquisiciones: [
      { anio: '2007', objetivo: 'Marcas Lanvin (perfumes y maquillaje)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Ventas de 52 M en 2021 y 41 M en 2025, en descenso; el dueño de la moda tiene opción de recompra el 1-jul-2027 [1].' },
      { anio: '2015', objetivo: 'Marca Rochas (perfumes y moda)', importe: null, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Ventas de perfumes de 35-42 M al año desde 2021; la moda se cedió en licencia [1].' },
      { anio: '2024', objetivo: 'Marca Off-White en perfumes', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Primer lanzamiento propio previsto en 2027 [1].' },
      { anio: '2025', objetivo: 'Marca Annick Goutal en perfumes', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Desarrollo desde 2026; lanzamientos en 2027 [1].' },
    ],
    comentario: 'La dirección ha creado valor con el capital: el ROIC se ha mantenido muy por encima del coste de capital con una inversión pequeña, y la mayor parte de la caja vuelve al accionista en dividendos (87,6 M en 2025). Las dos compras grandes de marcas propias son las que peor han ido: Lanvin pierde ventas desde 2021 y Rochas está estancada en torno a 40 M [1]. Las licencias, en cambio, han rendido mucho (Jimmy Choo de 131 a 228 M y Coach de 116 a 200 M entre 2021 y 2025) [1]. La matriz, Interparfums Inc., absorbió en dic-2025 el holding intermedio sin efecto en los minoritarios (dilución mínima) [1].',
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'calidad', campo: 'anios_auditor', tipo: 'Complemento', intentos: '1) URD 2025, honorarios de auditores (sin fecha de primer nombramiento); 2) informe de los auditores del URD (sin antigüedad); 3) búsqueda de prensa (sin dato)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'EBITDA semestral', tipo: 'Complemento', intentos: '1) comunicados de resultados semestrales (solo resultado operativo); 2) flujos semestrales (amortizaciones con provisiones); 3) MarketScreener (sin semestres)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: "Document d'enregistrement universel 2025: parts de marché et concurrence, accords de licence, RSE", editor: 'Interparfums SA / AMF', tipo: 'Primaria', fecha: '2026-03-31', url: 'https://bdif.amf-france.org/back/api/v1/documents/2026/D.26-0188/7C7EC956EFAB4270106AAC85431843C230E2AFD6926C0576B77E29068CCAC916.zip' },
  { id: 2, titulo: '2025 Universal Registration Document, 1.2 Beauty market (mercado mundial de belleza ≈300.000 M EUR; perfumes ≈14 %)', editor: "L'Oréal", tipo: 'Sectorial', fecha: '2026-03', url: 'https://www.loreal-finance.com/eng/2025-universal-registration-document/en/article/23/' },
  { id: 3, titulo: 'Prospectus de la OPV, sección Industry (perfumes de gama alta)', editor: 'Puig Brands, S.A. / CNMV', tipo: 'Primaria', fecha: '2024-04-18', url: 'https://uploads.puig.com/uploads/Prospectus_Puig_a1dd7fa8d0.pdf' },
  { id: 4, titulo: 'Ficha sectorial corta: perfumes de prestigio y licencias (con cifras de Puig 11-oct y de la ficha de higiene y cosmética 14-oct)', editor: 'Análisis propio (repositorio)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/perfumes-licencias-2026-10-15.md' },
  { id: 5, titulo: 'Is Capri Holdings up for sale? (Jimmy Choo crece un 10,5 % en el 1T de su ejercicio 2027)', editor: 'FashionUnited', tipo: 'Prensa', fecha: '2026-09-25', url: 'https://fashionunited.com/news/business/is-capri-holdings-up-for-sale/2026092574852' },
  { id: 6, titulo: 'Moncler and Interparfums SA Sign a License Agreement for Fragrances (hasta el 31-dic-2026, con posible prórroga de 5 años)', editor: 'Business Wire', tipo: 'Primaria', fecha: '2020-06-11', url: 'https://www.businesswire.com/news/home/20200611005684/en/Moncler-and-Interparfums-SA-Sign-a-License-Agreement-for-Fragrances' },
  { id: 7, titulo: 'Análisis value de Puig (sector, competidores y comparables)', editor: 'Análisis propio (repositorio)', tipo: 'Sectorial', fecha: '2026-10-11', url: 'informes/puig-2026-10-11/' },
  { id: 8, titulo: '2026 first half sales (comentario por marca y zona)', editor: 'Interparfums SA (archivo AMF/DILA)', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2026/07/FCECO082676_20260723.pdf' },
];
const B_ = {
  _estado: 'completo',
  historia: {
    resumen: 'Philippe Benacin y Jean Madar fundaron Inter Parfums en 1982 para vender perfumes de imitación y de distribución masiva; en los noventa giraron hacia el prestigio con licencias de moda (Burberry desde 1993, hasta 2012). La filial francesa cotiza en París desde 1995 y la matriz estadounidense, Interparfums Inc., en el Nasdaq; los dos fundadores controlan la matriz con el 43,4 % y la matriz controla la francesa con el 72-74 % [1]. El modelo se amplió con marcas propias (Lanvin en 2007, Rochas en 2015) y con las licencias que hoy pesan más: Jimmy Choo y Montblanc (2010), Coach (2016) y Lacoste (2024) [1]. En dic-2025 la francesa absorbió el holding intermedio de la matriz sin cambiar el control [1].',
    hitos: [
      { anio: '1982', hito: 'Fundación por Philippe Benacin y Jean Madar [1].' },
      { anio: '1995', hito: 'Salida a bolsa de Interparfums SA en París; derechos de voto doble para acciones nominativas de más de tres años [1].' },
      { anio: '2007', hito: 'Compra de las marcas de perfume de Lanvin [1].' },
      { anio: '2010', hito: 'Licencias de Jimmy Choo y Montblanc, hoy las dos primeras marcas junto con Coach [1].' },
      { anio: '2012', hito: 'Fin anticipado de la licencia de Burberry, que recupera sus perfumes: el precedente de pérdida de una gran licencia [1].' },
      { anio: '2015', hito: 'Compra de la marca Rochas (perfumes y moda) [1].' },
      { anio: '2016', hito: 'Licencia de Coach, renovada en 2025 hasta jun-2031 [1].' },
      { anio: '2021', hito: 'Compra de la sede en el 10 rue de Solférino y comienzo del auge de los perfumes (+88 % en bolsa ese año) [1].' },
      { anio: '2024', hito: 'Entrada de Lacoste (licencia de 15 años) y compra de la marca Off-White en perfumes [1].' },
      { anio: '2025', hito: 'Compra de Annick Goutal, licencia de Longchamp hasta 2036 y fusión con el holding de la matriz [1].' },
    ],
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Perfumes de prestigio (distribución selectiva: perfumerías, grandes almacenes, duty free y tiendas propias) en el mundo, a precio de fabricante. Es el mercado en el que compite Interparfums; la belleza en conjunto (≈300.000 M EUR) es demasiado amplia [2]. Usamos la estimación del análisis de Puig: ≈28.000 M EUR en 2025 a precio de fabricante (14 % de la belleza y dos tercios de gama alta) [2, 3, 7]; Interparfums habla de un mercado de perfume selectivo de unos 40.000 M USD (fuente interna, probablemente a precio de venta) [1]. Las dos cifras dan a Interparfums una cuota del 2-3 %.',
    tamano: '≈ 28.000 M EUR en 2025 a precio de fabricante (estimación del análisis de Puig sobre L’Oréal) [7, 2]; ≈ 40.000 M USD según Interparfums [1]',
    unidad_serie: 'millones de EUR (precio de fabricante)',
    serie: [{ anio: '2023', tamano: 22400 }, { anio: '2024', tamano: 25133 }, { anio: '2025', tamano: 28000 }, { anio: '2026e', tamano: 29400 }, { anio: '2027e', tamano: 30870 }, { anio: '2028e', tamano: 32414 }, { anio: '2029e', tamano: 34034 }, { anio: '2030e', tamano: 35736 }],
    tcac_historico_pct: 11.8,
    tcac_previsto_pct: 5.0,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Auge de los perfumes en 2021-2024 (jóvenes, redes sociales, «lujo asequible»)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El mercado creció ≈12 % al año de 2023 a 2025 [7]; Interparfums pasó de 561 M a 899 M de ventas de 2021 a 2025 y cayó un 3,7 % a tipos constantes en el 1S26 [1, 8].' },
      { driver: 'EE. UU., el mayor mercado, sigue creciendo', efecto: '+', horizonte: 'Estructural', evidencia: 'Ventas locales de la filial de EE. UU. +9 % en 2025 y ≈+8 % en el 1S26 [1, 8].' },
      { driver: 'Geopolítica: Oriente Medio y Europa del Este', efecto: '−', horizonte: 'Cíclico', evidencia: 'Oriente Medio −32 % y Europa del Este −20 % en el 1S26; Rusia, Bielorrusia y Ucrania el 3,4 % de las ventas de 2025 [1, 8].' },
      { driver: 'Divisa (ventas en dólares, costes en euros)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Euro/dólar medio de 1,17 en el 1S26 frente a 1,09: ventas −7,3 % a corrientes frente a −3,7 % constantes [8].' },
      { driver: 'Aranceles de EE. UU. a los perfumes europeos', efecto: '−', horizonte: 'Cíclico', evidencia: '7,6 M de coste en 2025 (≈0,8 puntos de margen), devueltos en 2026 [1, 8].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Una decena de grandes (L’Oréal, Coty, Puig, LVMH, Estée Lauder, Chanel) y otra decena de medianos como Interparfums compiten por licencias y por el lineal [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Cadenas de perfumería y duty free concentrados en cada país; más de 25.000 puntos de venta reparten el riesgo [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'El proveedor clave es el dueño de la marca: cobra el 8,4 % de las ventas en regalías y decide la renovación (Burberry se fue en 2012) [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Las marcas nativas digitales y los perfumes de nicho entran con poco capital, pero la distribución mundial y el gasto en publicidad (21 % de las ventas) son una barrera [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Los «dupes» baratos crecen, pero el perfume de marca sigue siendo un regalo de prestigio [7].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Tras tres años de crecimiento de dos dígitos (2021-2024) el mercado se normaliza: Interparfums creció un 4 % a tipos constantes en 2025 y prevé −3 % en 2026 [1, 8]. En 2009 las ventas de perfume selectivo cayeron y se recuperaron en un año; en 2020 Interparfums vendió 367 M (−24 % frente a 2019) y en 2021 ya estaba por encima [1, 4]. En 2022 la inflación se trasladó a precio sin perder volumen. Los indicadores son las ventas de la filial de EE. UU., las de duty free y las de los grandes (L’Oréal Luxe, Puig Fragrance).' },
    regulacion: 'Reglamento europeo de cosméticos 1223/2009 y su revisión de alérgenos de fragancia (etiquetado ampliado a más de 80 alérgenos, con plazos hasta 2026-2028); ley MoCRA de EE. UU. (registro de instalaciones y productos desde 2023-2024); reglamento europeo de envases (2025), que exige materiales reciclables; aranceles de EE. UU. a las importaciones europeas desde abril de 2025, con devolución en 2026 [1, 8]. La empresa dejó de estar sujeta a la directiva CSRD en dic-2025 por el umbral de empleados [1].',
    tendencias: 'Gana el perfume de marca de moda accesible (Coach, Jimmy Choo) entre los jóvenes de EE. UU. y Latinoamérica, y la «alta perfumería» de precio alto, donde Interparfums entra con Solférino Paris y Annick Goutal [1]. Pierden las marcas sin lanzamientos (Lanvin −26 % en el 1S26) y los mercados sacudidos por la geopolítica [8]. Los grandes compran marcas de nicho a múltiplos altos (Creed, Byredo) y licencias largas (Kering Beauté a L’Oréal), lo que encarece las licencias nuevas [7].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 3.2,
    posicion: '≈3 % del perfume de prestigio mundial; ≈4 % en Francia y 2-5 % en EE. UU., Reino Unido, México y China; mediano independiente detrás de L’Oréal, Coty, Puig, LVMH, Estée Lauder y Chanel [1].',
    competidores: [
      { nombre: 'Puig (Fragrance and Fashion)', pais: 'ES', ticker: 'PUIG.MC', ingresos: 5096, cuota_pct: null, margen_ebit_pct: 15.7, comentario: 'Licencias y marcas propias (Carolina Herrera, Paco Rabanne, Jean Paul Gaultier, Byredo); grupo entero, últimos 12 meses [7].' },
      { nombre: 'Coty', pais: 'US', ticker: 'COTY', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'El mayor licenciatario de perfumes de moda (Gucci hasta su traspaso, Hugo Boss, Burberry, Chloé); muy endeudado [7].' },
      { nombre: "L'Oréal (Luxe)", pais: 'FR', ticker: 'OR.PA', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Licencias de Armani, YSL, Prada, Valentino y, desde 2026, Gucci, Bottega Veneta y Balenciaga [2, 7].' },
      { nombre: 'Interparfums Inc. (matriz)', pais: 'US', ticker: 'IPAR', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Consolida a Interparfums SA y añade licencias estadounidenses (GUESS, Abercrombie & Fitch, Donna Karan, Ferragamo); guía 2026 de 1.480 M USD de ventas [7].' },
      { nombre: 'Estée Lauder (fragancias)', pais: 'US', ticker: 'EL', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Marcas propias de nicho (Le Labo, Jo Malone, Tom Ford, Kilian) [7].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: el cliente final no gana nada por que otros compren el mismo perfume.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Para el licenciante cambiar de socio cuesta años de lanzamientos y existencias; Interparfums ha renovado casi todas sus licencias grandes (Coach, Montblanc, Van Cleef & Arpels, Jimmy Choo), pero Burberry se fue en 2012 [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marcas ajenas con contratos largos (Lacoste hasta 2038, Longchamp hasta 2036) y propias (Lanvin, Rochas); margen operativo del 19-22 % durante años frente al 15 % de Puig [1, 7].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Estructura ligera: 378 empleados para 899 M de ventas y gastos de administración del 3,9 % [1].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Distribución en más de 100 países y 25.000 puntos de venta, pero a una décima del tamaño de los grandes [1].' },
      ],
    },
    amenazas: 'La amenaza principal es perder una licencia grande: Jimmy Choo (25 %), Coach (22 %) y Montblanc (21,5 %) vencen en 2030-2031, y Capri, dueña de Jimmy Choo, está en venta: un comprador con división de perfumes propia podría no renovar en 2031 [1, 5]. Moncler vence en dic-2026 sin renovación publicada [1, 6] y el dueño de la moda Lanvin puede recomprar sus perfumes en jul-2027 [1]. Probabilidad de perder al menos una de las tres grandes antes de 2032: media (estimación propia).',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [
      { agencia: 'MSCI', calificacion: 'A', fecha: '2025-03' },
      { agencia: 'Sustainalytics', calificacion: '18,6 (riesgo bajo)', fecha: '2025-07' },
      { agencia: 'CDP Clima', calificacion: 'B', fecha: '2025-12' },
      { agencia: 'EcoVadis', calificacion: 'Oro', fecha: '2025-07' },
    ],
    materialidad: 'Los asuntos con efecto en las cifras son los envases (vidrio y cartón, la mayor parte de las emisiones de alcance 3; objetivos validados por SBTi en agosto de 2025) y la cadena de suministro subcontratada, que la empresa audita con su «cuaderno de ecodiseño» [1]. El reglamento europeo de envases obliga a rediseñar frascos y estuches, con coste en el margen bruto en los próximos años [1].',
    controversias: 'Ninguna relevante en los tres últimos años en el documento de registro (sin litigios ni sanciones significativas) [1]. Mantiene una actividad mínima en Rusia mediante un agente independiente, el 3,4 % de las ventas, dentro de las sanciones europeas [1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) URD 2025 (solo cuota propia); 2) L’Oréal URD 2025 (belleza, no perfume); 3) folleto de Puig (cuotas por marca, no CR5)', decision: 'Omitido' },
  ],
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Gobierno
const fC = [
  { id: 1, titulo: "Document d'enregistrement universel 2025, partie 4 (gouvernement d’entreprise) y partie 6 (capital)", editor: 'Interparfums SA / AMF', tipo: 'Primaria', fecha: '2026-03-31', url: 'https://bdif.amf-france.org/back/api/v1/documents/2026/D.26-0188/7C7EC956EFAB4270106AAC85431843C230E2AFD6926C0576B77E29068CCAC916.zip' },
  { id: 2, titulo: 'Déclarations des dirigeants (BDIF): compras de Interparfums Inc. en Euronext París, 10-ago a 16-sep-2026 (25 declaraciones)', editor: 'AMF (BDIF)', tipo: 'Primaria', fecha: '2026-09-17', url: 'https://bdif.amf-france.org/back/api/v1/informations?RechercheTexte=INTERPARFUMS&TypesInformation=DD&From=0&Size=40' },
  { id: 3, titulo: 'Examen de la mise en œuvre éventuelle d’une offre publique de retrait (fusión con Interparfums Holding; 225C1885)', editor: 'AMF', tipo: 'Primaria', fecha: '2025-11-06', url: 'https://bdif.amf-france.org/back/api/v1/documents/2025/225C1885/8E731D2F52F94E94A34727A14DD061F5251C2C94EFBB4059052761DD20EAF675.pdf' },
  { id: 4, titulo: 'Déclaration mensuelle des droits de vote au 30 septembre 2026', editor: 'Interparfums SA (archivo AMF/DILA)', tipo: 'Primaria', fecha: '2026-10-07', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2026/10/FCECO083381_20261007.pdf' },
  { id: 5, titulo: 'H1 2026 results y 2026 first half sales (guía 2026)', editor: 'Interparfums SA (archivo AMF/DILA)', tipo: 'Primaria', fecha: '2026-09-09', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2026/09/FCECO083141_20260909.pdf' },
];
const insiders = [
  ['2026-08-10', 40735, 24.81], ['2026-08-11', 39499, 24.88], ['2026-08-12', 32065, 24.56], ['2026-08-13', 18699, 24.75], ['2026-08-14', 52124, 24.70],
  ['2026-08-17', 133751, 24.54], ['2026-08-18', 76016, 25.08], ['2026-08-19', 86826, 25.76], ['2026-08-20', 88031, 26.28], ['2026-08-21', 44042, 26.37],
  ['2026-08-24', 57649, 26.89], ['2026-08-25', 46198, 27.33], ['2026-08-26', 61176, 27.81], ['2026-08-27', 67192, 27.83], ['2026-09-01', 4917, 28.0],
  ['2026-09-02', 544505, 27.96], ['2026-09-03', 83699, 27.89], ['2026-09-04', 18098, 27.96], ['2026-09-07', 5946, 27.90], ['2026-09-08', 2290, 28.0],
  ['2026-09-09', 5244, 27.91], ['2026-09-10', 51851, 27.78], ['2026-09-11', 27665, 27.74], ['2026-09-16', 1960, 28.0],
].map(([fecha, acciones, p]) => ({ fecha, persona: 'Interparfums Inc. (matriz, vinculada a Philippe Benacin y Jean Madar)', operacion: 'Compra', acciones, importe: Math.round(acciones * p / 1e4) / 100 }));
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Philippe Benacin', cargo: 'Presidente y consejero delegado (PDG); cofundador', desde: '1989', participacion_pct: 0.04, trayectoria: 'Cofundador del grupo en 1982 y primer ejecutivo desde siempre; con Jean Madar controla el 43,4 % de la matriz Interparfums Inc., que tiene el 74 % de la francesa, así que su interés económico indirecto ronda el 16 % (estimación propia). Llevó las ventas de 367 M en 2020 a 899 M en 2025 [1].' },
      { nombre: 'Philippe Santi', cargo: 'Consejero y director general delegado (finanzas)', desde: '2004', participacion_pct: 0.02, trayectoria: 'Antiguo auditor; responsable de finanzas y relación con inversores; consejero desde 2004 [1].' },
      { nombre: 'Jean Madar', cargo: 'Consejero (dominical); presidente y consejero delegado de Interparfums Inc.', desde: '1993', participacion_pct: 0.01, trayectoria: 'Cofundador; dirige la matriz estadounidense, que compite por licencias en EE. UU. y consolida a la francesa [1].' },
    ],
    historial_guidance: [
      { anio: '2026', guia: 'Margen operativo del 19-20 % en el 1S26 (23-jul)', real: '21,1 % (devolución de aranceles)', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ventas de 850-870 M y margen operativo de ≈18 % (23-jul y 9-sep)', real: '1S26: 414,3 M y 21,1 %; año pendiente', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Ventas de cerca de 900 M (anunciadas como objetivo del año)', real: '899,4 M (+4 % a tipos constantes)', cumplida: 'Sí' },
    ],
    comentario: 'Equipo fundador en el poder desde hace más de cuarenta años, muy estable y con un historial de guías prudentes que suele cumplir o superar (el margen del 1S26 batió su propia guía) [1, 5]. El riesgo es de sucesión y de doble lealtad: Benacin preside a la vez la francesa y es directivo de la matriz, y Madar dirige la matriz; no hay plan de sucesión público [1]. La remuneración en la francesa es moderada (0,96 M de Benacin en 2025) [1].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Philippe Benacin', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '1989', comisiones: '—' },
      { nombre: 'Jean Madar', cargo: 'Consejero (CEO de Interparfums Inc.)', tipo: 'Dominical', desde: '1993', comisiones: '—' },
      { nombre: 'Philippe Santi', cargo: 'Consejero y director general delegado', tipo: 'Ejecutivo', desde: '2004', comisiones: '—' },
      { nombre: 'Marie-Ange Verdickt', cargo: 'Consejera', tipo: 'Independiente', desde: '2015', comisiones: 'Auditoría (presidenta), RSE' },
      { nombre: 'Constance Benqué', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría, Gobierno, nombramientos y retribuciones (presidenta)' },
      { nombre: 'Natalie Bader Messian', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Gobierno, nombramientos y retribuciones' },
      { nombre: 'Olivier Mauny', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría, Gobierno, nombramientos y retribuciones, RSE' },
      { nombre: 'Caroline Renoux', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'RSE (presidenta)' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 0.964, fijo: 0.528, variable_corto: 0.43, variable_largo: 0, ratio_salario_medio: 11 },
    remuneracion: 'Benacin cobró 0,96 M en 2025 de la francesa (528.000 EUR fijos y 430.000 de variable anual) y Santi 0,99 M; no hay variable a largo plazo en acciones para ellos y el ratio con el salario medio es de 11 veces [1]. El variable anual depende de objetivos de ventas, resultado y criterios cualitativos y RSE fijados por el comité de retribuciones, formado solo por independientes [1]. La remuneración total de Benacin es mayor, porque también cobra de la matriz estadounidense, que la publica aparte [1]. No hay indemnizaciones extraordinarias publicadas; en 2025 Santi cobró 75.000 EUR de prima excepcional [1].',
    accionistas: [
      { nombre: 'Interparfums Inc. (Nasdaq: IPAR; controlada por Benacin y Madar con el 43,4 %)', pct: 74.2, tipo: 'Control', variacion: '72,4 % a dic-2025 (tras absorber el holding) y ≈1,59 M de acciones compradas en bolsa en ago-sep-2026 (estimación propia: 63,66 M + 1,59 M sobre 87,98 M)' },
      { nombre: 'Inversores extranjeros', pct: 12.0, tipo: 'Institucional', variacion: '12,6 % en 2024' },
      { nombre: 'Accionistas individuales', pct: 8.8, tipo: 'Minorista', variacion: '7,6 % en 2024' },
      { nombre: 'Inversores franceses e IIC', pct: 5.9, tipo: 'Institucional', variacion: '6,5 % en 2024' },
      { nombre: 'Empleados', pct: 0.8, tipo: 'Empleados', variacion: 'estable' },
      { nombre: 'Autocartera', pct: 0.2, tipo: 'Autocartera', variacion: '153.090 acciones a 30-sep-2026' },
    ],
    insiders,
    control_y_defensas: 'Interparfums Inc. tenía el 72,4 % del capital y el 83,6 % de los derechos de voto a dic-2025 (las acciones nominativas de más de tres años votan doble) y ha comprado en bolsa unos 1,59 M de acciones más (≈42,7 M EUR a 26,8 EUR de media) entre el 10-ago y el 16-sep-2026, hasta en torno al 74 % [1, 2, 4]. No hay pacto de accionistas [1]. El minoritario no tiene peso en la junta: depende de los cinco independientes y de la AMF, que en nov-2025 aceptó sin oferta de exclusión la fusión con el holding porque el control no cambiaba [3]. El conflicto de intereses es doble: (1) la matriz y la filial compiten por las licencias y la matriz decide a cuál va cada una (las estadounidenses van a IPAR y las europeas de lujo a la francesa); (2) las compras de la matriz en bolsa a 25-28 EUR acercan el umbral del 90 % de una retirada obligatoria a un precio que fijaría el controlador [1, 2].',
    alertas: [
      'Compras de la matriz en bolsa por ≈42,7 M EUR en ago-sep-2026 (≈1,8 % del capital): sostienen el precio y pueden preparar una oferta de exclusión a un precio fijado por el controlador [2].',
      'Presidente ejecutivo vinculado al accionista de control y sin consejero coordinador [1].',
      'Derechos de voto doble: el 72 % del capital da el 84 % del voto [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct', tipo: 'Complemento', intentos: '1) URD 2025 (solo las resoluciones propuestas para 2026); 2) búsqueda del acta de la junta del 24-abr-2026 en la web de inversores (bloqueada, 403); 3) prensa (sin resultados de votación)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'ITP.PA, ^FCHI y EXH7.DE: históricos diarios (precio, rango, volumen, beta, volatilidad y cierres de cada ejercicio, ajustados por acciones gratuitas)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/ITP.PA/history' },
  { id: 2, titulo: 'Interparfums: finances, estimaciones 2026-2028, objetivo medio y número de analistas', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/INTERPARFUMS-5204/finances/' },
  { id: 3, titulo: 'Comparables de belleza (cierre del 14-oct-2026) de la ficha de higiene personal y cosmética', editor: 'Análisis propio (repositorio; Yahoo Finance)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'sectores/higiene-cosmetica-2026-10-14-comparables.json' },
  { id: 4, titulo: 'Comparables de belleza del análisis de Puig (MarketScreener, 9-oct-2026), llevados al 14-oct con el precio de Yahoo', editor: 'Análisis propio (repositorio)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'informes/puig-2026-10-11/' },
  { id: 5, titulo: 'Rendimiento del Bund a 10 años (serie BBSIS, 14-oct-2026: 3,48 %)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lastNObservations=5&lang=en' },
  { id: 6, titulo: 'Implied ERP by month (ERP T12m with sustainable payout, oct-2026: 4,20 %)', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Interparfums retrouve les faveurs du marché (resultados del 1S26 frente a lo esperado; Oddo BHF «surperformance»)', editor: 'Zonebourse / Tradingsat', tipo: 'Prensa', fecha: '2026-09-09', url: 'https://www.tradingsat.com/interparfums-FR0004024222/actualites/interparfums-interparfums-retrouve-les-faveurs-du-marche-1169833.html' },
  { id: 8, titulo: 'H1 2026 results (calendario: ventas del 3T26 el 21-oct-2026; perspectivas 2027 el 19-nov-2026)', editor: 'Interparfums SA (archivo AMF/DILA)', tipo: 'Primaria', fecha: '2026-09-09', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2026/09/FCECO083141_20260909.pdf' },
  { id: 9, titulo: 'Kering and L’Oréal forge an alliance in beauty and wellness', editor: "L'Oréal", tipo: 'Primaria', fecha: '2025-10-19', url: 'https://www.loreal-finance.com/eng/press-release/kering-and-loreal-forge-alliance-beauty-and-wellness' },
  { id: 10, titulo: 'e.l.f. Beauty to acquire rhode (Form 8-K, exhibit 99.1)', editor: 'e.l.f. Beauty, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-05-28', url: 'https://www.sec.gov/Archives/edgar/data/1600033/000160003325000013/er991glazemasterpressrelea.htm' },
  { id: 11, titulo: "L'Oréal signs agreement with Natura &Co to acquire Aēsop", editor: "L'Oréal", tipo: 'Primaria', fecha: '2023-04-03', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/MKW/2023/04/FCMKW112074_20230403.pdf' },
  { id: 12, titulo: 'The Estée Lauder Companies to acquire the TOM FORD brand (Form 8-K, exhibit 99.1)', editor: 'The Estée Lauder Companies (SEC EDGAR)', tipo: 'Primaria', fecha: '2022-11-15', url: 'https://www.sec.gov/Archives/edgar/data/1001250/000100125022000199/tfbexhibit991.htm' },
  { id: 13, titulo: 'Special Purpose Consolidated Financial Statements 2023, 2022 and 2021 (compra de Byredo)', editor: 'Puig Brands, S.A.', tipo: 'Primaria', fecha: '2024-04', url: 'https://uploads.puig.com/uploads/PUIG_Special_Purpose_Financial_Statements_2023_2022_2021_1_3cef8099a7.pdf' },
  { id: 14, titulo: 'Coty announces strategic partnership with KKR (Form 8-K, exhibit 99.1)', editor: 'Coty Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2020-05-11', url: 'https://www.sec.gov/Archives/edgar/data/1024305/000102430520000048/exhibit991-earningsrel.htm' },
  { id: 15, titulo: "Kering's acquisition of Creed is reportedly valued at 3.5 billion euros", editor: 'FashionUnited', tipo: 'Prensa', fecha: '2023-07-10', url: 'https://fashionunited.uk/news/business/kering-s-acquisition-of-creed-is-reportedly-valued-at-3-5-billion-euros/2023071070464' },
  { id: 16, titulo: 'Déclaration mensuelle des droits de vote au 30 septembre 2026 (87.984.846 acciones)', editor: 'Interparfums SA (archivo AMF/DILA)', tipo: 'Primaria', fecha: '2026-10-07', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2026/10/FCECO083381_20261007.pdf' },
];
const H = JSON.parse(fs.readFileSync(path.join(raiz, 'sectores', 'higiene-cosmetica-2026-10-14-comparables.json'), 'utf8')).empresas;
const deH = (re, nombre, ticker) => { const e = H.find((x) => re.test(x.nombre)); return { ...e, nombre, ticker }; };
const mueve = (e, f) => ({ ...e, capitalizacion: Math.round(e.capitalizacion * f), per_ntm: Math.round(e.per_ntm * f * 10) / 10, fcf_yield_pct: Math.round(e.fcf_yield_pct / f * 100) / 100 });
const comparables = [
  deH(/Oréal/, "L'Oréal", 'OR.PA'),
  deH(/Estée/, 'Estée Lauder', 'EL'),
  deH(/Beiersdorf/, 'Beiersdorf', 'BEI.DE'),
  mueve({ nombre: 'Coty', ticker: 'COTY', pais: 'US', capitalizacion: 2240, ev_ventas: 0.97, ev_ebitda_ltm: 6.6, ev_ebitda_ntm: 7.3, per_ntm: 26.1, crecimiento_pct: -3.1, margen_ebitda_pct: 14.6, roic_pct: 4.71, dn_ebitda: 3.68, fcf_yield_pct: 13.87 }, 1.0316),
  mueve({ nombre: 'Inter Parfums Inc', ticker: 'IPAR', pais: 'US', capitalizacion: 3204, ev_ventas: 2.38, ev_ebitda_ltm: 12.0, ev_ebitda_ntm: 12.3, per_ntm: 22.3, crecimiento_pct: 3.0, margen_ebitda_pct: 19.9, roic_pct: 18.42, dn_ebitda: -0.14, fcf_yield_pct: 6.84 }, 1.0201),
  mueve({ nombre: 'Shiseido', ticker: '4911.T', pais: 'JP', capitalizacion: 7387, ev_ventas: 1.61, ev_ebitda_ltm: null, ev_ebitda_ntm: 10.9, per_ntm: 25.3, crecimiento_pct: 3.8, margen_ebitda_pct: 4.4, roic_pct: 4.88, dn_ebitda: 5.82, fcf_yield_pct: 5.88 }, 1.0259),
  { nombre: 'Puig', ticker: 'PUIG.MC', pais: 'ES', capitalizacion: 10856, ev_ventas: 2.26, ev_ebitda_ltm: 10.9, ev_ebitda_ntm: 10.2, per_ntm: 16.6, crecimiento_pct: 7.4, margen_ebitda_pct: 20.8, roic_pct: 13.1, dn_ebitda: 2.0, fcf_yield_pct: 4.4 },
];
const cierres = Object.fromEntries(B.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Interparfums SA', nombre_corto: 'Interparfums', ticker: 'ITP', isin: 'FR0004024222', mercado: 'Euronext París (compartimento A)', indice_referencia: 'CAC 40 (SBF 120 y CAC Mid 60)',
    pais: 'Francia', pais_iso: 'FR', sector: 'Productos de consumo básico', industria: 'Productos de cuidado personal (perfumes de prestigio)', sede: '10 rue de Solférino, París', fundacion: '1982', empleados: 378, web: 'www.interparfums-finance.fr',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: ACC, capitalizacion_publicada: null, free_float_pct: 25.6,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses)`, proximos_resultados: '2026-10-21',
  },
  consenso: {
    guidance: 'Para 2026 la empresa espera 850-870 M de ventas (−3 % a tipos constantes) y un margen operativo de «alrededor del 18 %» (confirmado el 9-sep-2026), tras un 21,1 % en el 1S26 [8]. No da objetivos a medio plazo: publicará las perspectivas de 2027 el 19-nov-2026 y las ventas del 3T26 el 21-oct-2026 [8]. Sí anuncia unas 20 iniciativas grandes de lanzamiento para 2027-2028 (Longchamp, Off-White, Annick Goutal, tercera franquicia de Montblanc, Lacoste y Lanvin) [8].',
    estimaciones: [
      { periodo: '2026e', ingresos: 862.1, ebitda: 179.2, ebit: 157.0, bpa: r2(114.8 / ACC), dpa: 1.0, fuente: 'MarketScreener, 9 analistas; BPA = beneficio 114,8 M ÷ 87,83 M acciones [2]' },
      { periodo: '2027e', ingresos: 943.1, ebitda: 190.8, ebit: 169.0, bpa: r2(122.2 / ACC), dpa: 1.07, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 1009.0, ebitda: 206.4, ebit: 185.4, bpa: r2(134.3 / ACC), dpa: 1.15, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 9, comprar: null, mantener: null, vender: null, po_medio: 30.37, po_min: null, po_max: null },
    revisiones: 'MarketScreener da un consenso de «sobreponderar» con 9 analistas y un objetivo medio de 30,37 EUR, un 5,3 % por debajo del cierre del 14-oct [2]. Las estimaciones de 2027 bajaron ligeramente entre agosto y septiembre de 2026 (ventas de ≈940 a ≈937-943 M) [2]. Tras los resultados del 1S26, que batieron lo esperado (resultado operativo de 87,3 M frente a 79,7 M), Oddo BHF mantuvo «surperformance» y TP ICAP Midcap subió su objetivo [7]. Solo una fuente gratuita da estimaciones completas; el número de recomendaciones de cada tipo no es accesible [2]. El BPA del consenso está expresado en acciones de hoy (beneficio ÷ 87,83 M); MarketScreener publica 1,343 EUR para 2026 con otra base de acciones.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción cayó un 57 % desde abril de 2023 hasta marzo de 2026 (de 46 a 20 EUR ajustados) con el fin del auge de los perfumes, la desaceleración de 2025 y el dólar; en 2025 perdió un 32 % frente al +10 % del CAC 40 [1]. Desde el mínimo de 20,74 EUR del 18-may-2026 ha subido un 55 % hasta 32,08 EUR, el máximo de 52 semanas, con tres impulsos: el 1S26 mejor de lo esperado (+3 % el 9-sep), las compras de la matriz en bolsa (≈1,59 M de acciones en ago-sep) y la rotación hacia consumo europeo barato [1, 7]. En el año sube un 33,6 % frente al −3,4 % del CAC 40 y el −12,3 % del sectorial europeo de cuidado personal [1]. Volatilidad del 31 % y beta mensual de 1,09 frente al CAC 40 [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2020', '2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cierres[a], ev_ebitda_ntm: null, per_ntm: null, excluir: a === '2020' || a === '2021' })),
    comentario: 'Interparfums cotizó entre 25 y 40 veces el beneficio en 2020-2024: el mercado pagaba un crecimiento de ventas del 20 % anual y un margen estable [1]. Hoy, a 22,3 veces nuestro BPA de 2027 y 24,6 veces el de 2026, está por debajo de su mediana adelantada de cinco años (26,8 veces) pero ya no barata: la subida de 2026 ha cerrado casi todo el descuento que tenía en mayo (16 veces). 2020 (covid) y 2021 (auge y BPA deprimido del año anterior) se excluyen del PER al cierre.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Siete cotizadas de belleza de gama alta con perfumes: Puig y Coty (perfumes con licencias de moda, el modelo más parecido), Inter Parfums Inc. (la matriz, que consolida a la francesa: comparable natural pero circular), L’Oréal y Estée Lauder (los líderes del lujo), Shiseido (prestigio en Asia) y Beiersdorf (cuidado de la piel, como referencia de consumo europeo). Fuera e.l.f. Beauty (maquillaje de masas que crece al 16 %) y LVMH (los perfumes pesan menos del 10 %). L’Oréal, Estée Lauder y Beiersdorf son del cierre del 14-oct [3]; Coty, Inter Parfums Inc., Shiseido y Puig vienen de MarketScreener del 9-oct con la capitalización y el PER llevados al 14-oct con el precio (+2-7 %); sus EV/EBITDA quedan al 9-oct [4].',
    empresas: comparables,
    comentario: 'Interparfums cotiza a ≈23 veces el beneficio de los próximos 12 meses, por debajo de la mediana del grupo (26 veces) y por encima de Puig (16,6 veces), con un margen EBITDA del 21-23 % (mediana del grupo ≈17 %), deuda nula y un ROIC del 19 %, frente a un crecimiento esperado del 4-9 % en 2027 que el consenso aún no ve en 2026. Su descuento frente a L’Oréal y Estée Lauder se justifica por tamaño, dependencia de licencias y control de la matriz; su prima frente a Puig, por margen y balance. El múltiplo de referencia para nosotros es el PER: el EV/EBITDA de Coty y Shiseido refleja su deuda y sus márgenes deprimidos.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-10', objetivo: 'Kering Beauté (Creed y licencias a 50 años de Gucci, Bottega Veneta y Balenciaga)', comprador: "L'Oréal", ev: 4000, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '4.000 M EUR en efectivo; sin ventas ni EBITDA publicados [9].' },
      { fecha: '2025-05', objetivo: 'Rhode', comprador: 'e.l.f. Beauty', ev: 714, ev_ventas: 3.8, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '800 M USD al cierre; 3,8 veces las ventas de 12 meses a mar-2025 [10].' },
      { fecha: '2023-06', objetivo: 'Creed', comprador: 'Kering', ev: 3500, ev_ventas: 14, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Unos 3.500 M EUR según la prensa; marca de nicho con márgenes muy altos: múltiplo atípico [15].' },
      { fecha: '2023-04', objetivo: 'Aesop', comprador: "L'Oréal", ev: 2253, ev_ventas: 4.7, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor empresa de 2.525 M USD sobre 537 M USD de ventas [11].' },
      { fecha: '2022-11', objetivo: 'Tom Ford (marca, con Tom Ford Beauty)', comprador: 'Estée Lauder', ev: 2499, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '2.800 M USD de valor empresa; sin ventas ni EBITDA del conjunto [12].' },
      { fecha: '2022-06', objetivo: 'Byredo (77 %)', comprador: 'Puig', ev: 1244, ev_ventas: 7.6, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor empresa estimado de 1.244 M sobre 163 M de ventas pro forma [13].' },
      { fecha: '2020-05', objetivo: 'Wella, Clairol, OPI y ghd (60 %)', comprador: 'KKR (a Coty)', ev: 3837, ev_ventas: 1.83, ev_ebitda: 12.3, prima_pct: null, excluir: false, comentario: '4.300 M USD, 12,3 veces el EBITDA de 2019 [14].' },
    ],
    comentario: 'Las compras de marcas de belleza se han pagado a 3,7-7,6 veces las ventas (Creed, 14 veces, fuera), muy por encima de las 3,2 veces a las que cotiza Interparfums; pero son marcas propias, no licencias que vencen. Para Interparfums la operación relevante es otra: una oferta de exclusión de la matriz, que ya tiene el 74 % y ha comprado en bolsa en ago-sep-2026. Una oferta así suele llevar prima, pero el precio lo fija el controlador y la experiencia francesa es de primas moderadas; no la ponderamos.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) registro de posiciones cortas de la AMF (ninguna declarada por encima del 0,5 %); 2) Boursorama (sin dato); 3) MarketScreener (sin dato)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'recomendaciones por tipo', tipo: 'Complemento', intentos: '1) MarketScreener (solo media «sobreponderar»); 2) Zonebourse (Oddo BHF y TP ICAP, sin el resto); 3) Investing.com (bloqueado)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Forum Interparfums (ITP): hilos de jul-oct-2026', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://www.boursorama.com/bourse/forum/1rPITP' },
  { id: 2, titulo: 'Interparfums retrouve les faveurs du marché (comentarios del mercado tras el 1S26)', editor: 'Zonebourse / Tradingsat', tipo: 'Prensa', fecha: '2026-09-09', url: 'https://www.tradingsat.com/interparfums-FR0004024222/actualites/interparfums-interparfums-retrouve-les-faveurs-du-marche-1169833.html' },
  { id: 3, titulo: 'Interparfums fait moins bien que prévu au 1er semestre et décroche en bourse (ventas del 1S26)', editor: 'Zonebourse / Bourse Direct', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://www.boursedirect.fr/fr/actualites/categorie/commentaires-sur-l-evolution-des-valeurs-en-cours-de-seance/interparfums-fait-moins-bien-que-prevu-au-1er-semestre-et-decroche-en-bourse-zone-bourse-059c21284c5f8136bdf94dbcf1521cf34c2e9886' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Boursorama, foro de Interparfums (hilos de objetivos de precio: «32 euros a corto», «hacia 35», «objetivo 2027»)', fecha: '2026-10', n_comentarios: 115, tono: 'Positivo', resumen: 'Los particulares celebran la subida desde 21 EUR y discuten objetivos de 30-35 EUR; pocos mensajes bajistas («dirección 20 €») [1].' },
      { plataforma: 'Boursorama, hilos sobre la matriz y una posible oferta de exclusión («compra de la casa madre», «si OPR, ¿qué valoración?»)', fecha: '2026-09', n_comentarios: 94, tono: 'Dividido', resumen: 'Las compras de Interparfums Inc. en bolsa alimentan la idea de una oferta de exclusión; unos esperan prima y otros temen un precio bajo impuesto por el controlador [1].' },
      { plataforma: 'Boursorama, hilos de resultados, aranceles y acciones gratuitas', fecha: '2026-09', n_comentarios: 90, tono: 'Dividido', resumen: 'Debate sobre la caída de ventas del 1S26 frente al margen del 21 %, la esperanza de recuperar el resto de los aranceles de EE. UU. y la utilidad real de las acciones gratuitas [1].' },
      { plataforma: 'Prensa bursátil (Zonebourse, comentarios del día)', fecha: '2026-09', n_comentarios: 3, tono: 'Positivo', resumen: 'El 1S26 «recupera el favor del mercado»: resultado operativo por encima de lo esperado y subida del 3 %; en julio, las ventas decepcionaron y el título cayó [2, 3].' },
    ],
    temas: [
      { tema: 'Oferta de exclusión de la matriz', postura: 'Alcista', peso: 'Alto', contraste: 'Es posible pero no anunciada: la matriz tiene ≈74 % y necesita el 90 % para una retirada obligatoria; el precio lo fija el controlador con un experto independiente. No la ponderamos en el objetivo [1].' },
      { tema: 'Objetivos de 30-35 EUR', postura: 'Alcista', peso: 'Alto', contraste: 'El consenso de analistas está en 30,37 EUR, por debajo del precio; nuestra regla da un base de ≈38 EUR a 12 meses pero el valor intrínseco queda por debajo del precio [1].' },
      { tema: 'Caída de ventas y margen del 2S26', postura: 'Dividida', peso: 'Medio', contraste: 'La guía de ≈18 % implica un 2S26 cerca del 15 %: los foros miran el 21 % del 1S26 y no el año [1].' },
      { tema: 'Aranceles de EE. UU.', postura: 'Dividida', peso: 'Bajo', contraste: 'Se devolvieron los pagados de abr-2025 a feb-2026; efecto neto de ≈0,6 puntos de margen bruto en el 1S26 [1].' },
    ],
    lectura: 'El sentimiento de los particulares es positivo y ha mejorado con la subida del 55 % desde mayo; la conversación gira menos en torno al negocio que en torno a la matriz y una posible oferta de exclusión. Eso es un riesgo para la tesis: parte del precio de hoy puede ser una prima de oferta que nadie ha anunciado. No hay en los foros ningún riesgo que el informe no recoja, salvo esa expectativa; nadie habla del vencimiento de Moncler ni de la opción de Lanvin.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas');

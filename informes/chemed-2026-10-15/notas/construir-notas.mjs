// Escribe las notas A-E de Chemed (corte 2026-10-15) sin subagentes, a partir de notas/docs (10-K 2025, 2023 y 2021;
// notas de prensa 8-K de 3T24-2T26; 10-Q 2T26; proxy 2026; 8-K de la junta; transcripciones 1T26 y 2T26; MedPAC; CMS),
// del XBRL de la SEC (cuentas-xbrl.json), de bolsa.json y de datos de mercado (Yahoo, Stock Analysis).
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const B = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const CP = JSON.parse(fs.readFileSync(path.join(dir, 'tmp', 'comps.json'), 'utf8'));
const TR = JSON.parse(fs.readFileSync(path.join(dir, 'tmp', 'trend.json'), 'utf8'));
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const EDGAR = 'https://www.sec.gov/Archives/edgar/data/19584';
const DESDE = 2018;

// ------------------------------------------------------------------ A. Cuentas
const fA = [
  { id: 1, titulo: 'Chemed Corporation, Form 10-K del ejercicio 2025 (cuentas, nota 5 de segmentos, nota 18 de litigios)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-27', url: `${EDGAR}/000156276226000020/che-20251231x10k.htm` },
  { id: 2, titulo: 'Chemed Corporation, Form 10-K del ejercicio 2023 (segmentos 2021-2023, deuda)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2024-02-29', url: `${EDGAR}/000156276224000045/che-20231231x10k.htm` },
  { id: 3, titulo: 'Chemed Corporation, Form 10-K del ejercicio 2021 (segmentos 2019-2021, deuda)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2022-02-28', url: `${EDGAR}/000156276222000060/che-20211231x10k.htm` },
  { id: 4, titulo: 'Chemed Corporation: hechos XBRL de los 10-K y 10-Q (companyfacts)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000019584.json' },
  { id: 5, titulo: 'Chemed Reports Second-Quarter 2026 Results (8-K, anexo 99)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-28', url: `${EDGAR}/000001958426000018/che-20260728xex99.htm` },
  { id: 6, titulo: 'Chemed Reports First-Quarter 2026 Results (8-K, anexo 99)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2026-04-23', url: `${EDGAR}/000001958426000010/che-20260423xex99.htm` },
  { id: 7, titulo: 'Chemed Reports Fourth-Quarter 2025 Results (8-K, anexo 99)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-25', url: `${EDGAR}/000001958426000002/che-20260225xex99.htm` },
  { id: 8, titulo: 'Chemed Reports Third-Quarter 2025 Results (8-K, anexo 99)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2025-10-28', url: `${EDGAR}/000001958425000004/che-20251028xex99.htm` },
  { id: 9, titulo: 'Chemed Reports Second-Quarter 2025 Results (8-K, anexo 99)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2025-07-29', url: `${EDGAR}/000156276225000181/che-20250729xex99.htm` },
  { id: 10, titulo: 'Chemed Reports First-Quarter 2025 Results (8-K, anexo 99)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2025-04-23', url: `${EDGAR}/000156276225000088/che-20250423xex99.htm` },
  { id: 11, titulo: 'Chemed Reports Fourth-Quarter 2024 Results (8-K, anexo 99)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2025-02-26', url: `${EDGAR}/000156276225000032/che-20250226xex99.htm` },
  { id: 12, titulo: 'Chemed Reports Third-Quarter 2024 Results (8-K, anexo 99)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2024-10-29', url: `${EDGAR}/000156276224000241/che-20241029xex99.htm` },
  { id: 13, titulo: 'Chemed Corporation, Form 10-Q del segundo trimestre de 2026 (acciones, deuda, litigios, concentración de cobros)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${EDGAR}/000001958426000020/che-20260630x10q.htm` },
  { id: 14, titulo: 'Chemed (CHE) Q2 2026 Earnings Call Transcript', editor: 'Stock Analysis', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://stockanalysis.com/stocks/che/transcripts/654455-q2-2026/' },
  { id: 15, titulo: 'Chemed (CHE) Q1 2026 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-04-24', url: 'https://www.fool.com/earnings/call-transcripts/2026/04/24/chemed-che-q1-2026-earnings-call-transcript/' },
  { id: 16, titulo: 'Chemed Corporation declares quarterly dividend of 70 cents', editor: 'Barchart (nota de prensa de GlobeNewswire)', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.barchart.com/story/news/3697160/chemed-corporation-declares-quarterly-dividend-of-70-cents' },
];
// Deuda financiera al cierre (largo + corto), de los balances de los 10-K [1, 2, 3]; los arrendamientos son operativos (US GAAP): fuera.
const deuda = { 2018: 89.2, 2019: 90.0, 2020: 0, 2021: 185.0, 2022: 97.5, 2023: 0, 2024: 0, 2025: 0 };
// Gastos que la empresa trata como no recurrentes y deja en el EBITDA (litigios, indemnización, costes de compras, «otros») [7, 11]
const noRec = { 2023: 2.1, 2024: 6.5, 2025: 6.8 };
const cuenta = X.financieros.cuenta.filter((c) => +c.periodo >= DESDE).map((c) => ({
  periodo: c.periodo, ingresos: r1(c.ingresos), coste_ventas: r1(c.coste_ventas), gastos_generales: r1(c.gastos_generales),
  ebitda: r1(c.ebitda), amortizaciones: r1(c.amortizaciones), ebit: r1(c.ebit), resultado_financiero: r1(c.resultado_financiero),
  bai: r1(c.bai), impuestos: r1(c.impuestos), minoritarios: 0, beneficio_neto: r1(c.beneficio_neto), gastos_financieros: r1(c.gastos_financieros),
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: noRec[c.periodo] ?? null,
  bpa: r2(c.bpa), dpa: r2(c.dpa), dpa_extraordinario: 0, acciones_diluidas: r2(c.acciones_diluidas),
}));
const balance = X.balance.historico.filter((b) => +b.periodo >= DESDE).map((b) => ({
  periodo: b.periodo, activo_total: r1(b.activo_total), activo_corriente: r1(b.activo_corriente), pasivo_corriente: r1(b.pasivo_corriente),
  pasivo_total: r1(b.pasivo_total), fondo_comercio: r1(b.fondo_comercio), intangibles: r1(b.intangibles), inmovilizado_material: r1(b.inmovilizado_material),
  existencias: r1(b.existencias), clientes: r1(b.clientes), proveedores: r1(b.proveedores), activos_contrato: null, pasivos_contrato: null,
  caja: r1(b.caja), deuda_financiera: deuda[b.periodo], arrendamientos: 0, patrimonio_neto: r1(b.patrimonio_neto), minoritarios: 0, reservas: r1(b.reservas),
}));
const flujos = X.flujos.historico.filter((f) => +f.periodo >= DESDE).map((f) => ({
  periodo: f.periodo, flujo_operativo: r1(f.flujo_operativo), capex: r1(f.capex), pagos_arrendamientos: 0, adquisiciones: r1(f.adquisiciones ?? 0),
  desinversiones: r1(f.desinversiones ?? 0), dividendos: r1(f.dividendos), recompras: r1(f.recompras), emision_acciones: r1(f.emision_acciones ?? 0), intereses_en_financiacion: 0,
}));
const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: filas.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2595.0, ebitda: 415.6, ebit: 349.2, beneficio_neto: 275.0, bpa: 19.88, dpa: 2.40, dpa_extraordinario: 0, fcf: 323.3, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 0.8 },
    cambios_perimetro: [],
    comentario: 'Chemed pasó de 1.783 M USD de ventas en 2018 a 2.530 M en 2025 (5,1 % anual), casi todo orgánico: las compras son pequeñas (Covenant Care en 2024 por 85 M y franquicias de Roto-Rooter) [1, 4]. El crecimiento no ha sido lineal: VITAS saltó en 2020 con la pandemia (1.335 M y 294,9 M de EBIT), cayó en 2021-2022 por la falta de personal de enfermería (155,1 M de EBIT en 2022) y volvió a 1.630 M en 2025; Roto-Rooter creció de 745 M en 2020 a 949 M en 2023 y desde entonces está plano (900 M en 2024 y 2025) con el EBIT del segmento a la baja: 226,8 M en 2023, 194,5 M en 2024 y 160,8 M en 2025 [1, 2, 3]. El margen EBIT del grupo bajó del 15,1 % de 2024 al 13,4 % de 2025 por el tope de Medicare de Florida (27,2 M de ingresos menos) y por la publicidad en internet de Roto-Rooter (77,1 M en 2025 frente a 67,7 M en 2023) [1, 7]. En el primer semestre de 2026 las ventas suben un 5,1 % y el EBIT un 6,7 %; en el 2T26, un 8,8 % y un 31,0 % [5].',
    ajustes: 'Usamos las cifras publicadas (US GAAP). La empresa da un BPA ajustado que suma el gasto en opciones sobre acciones (32,7 M en 2025), la amortización de derechos de franquicia recomprados (9,4 M), el incentivo a largo plazo (5,6 M), litigios (3,1 M) y «otros» (3,7 M), y quita beneficios fiscales de las opciones: 21,55 USD frente a 18,34 publicados en 2025 y 11,71 frente a 9,97 en el primer semestre de 2026 [7, 5]. No lo usamos: las opciones son un coste recurrente (1,3 % de las ventas). Como no recurrentes dentro del EBITDA solo devolvemos litigios, indemnizaciones, costes de compras y «otros»: 2,1 M en 2023, 6,5 M en 2024 y 6,8 M en 2025 [7, 11]. El ajuste a valor de mercado de los planes de compensación diferida va en gastos generales y se compensa con el mismo importe en otros ingresos financieros (7,6 M en el 1S26) [5]. 2018-2025 sin cambios de perímetro relevantes; 2017 queda fuera de la serie por el acuerdo de 75 M con el Departamento de Justicia y la reforma fiscal [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 606.2, crecimiento_pct: 7.4, crecimiento_organico_pct: null, ebitda: 117.2, margen_ebitda_pct: 19.3, bpa: 5.00, vs_consenso: null },
      { periodo: '4T24', ingresos: 640.0, crecimiento_pct: 9.2, crecimiento_organico_pct: null, ebitda: 136.5, margen_ebitda_pct: 21.3, bpa: 6.02, vs_consenso: null },
      { periodo: '1T25', ingresos: 646.9, crecimiento_pct: 9.8, crecimiento_organico_pct: null, ebitda: 112.0, margen_ebitda_pct: 17.3, bpa: 4.86, vs_consenso: null },
      { periodo: '2T25', ingresos: 618.8, crecimiento_pct: 3.8, crecimiento_organico_pct: null, ebitda: 87.8, margen_ebitda_pct: 14.2, bpa: 3.57, vs_consenso: 'Inferior' },
      { periodo: '3T25', ingresos: 624.9, crecimiento_pct: 3.1, crecimiento_organico_pct: null, ebitda: 100.2, margen_ebitda_pct: 16.0, bpa: 4.46, vs_consenso: null },
      { periodo: '4T25', ingresos: 639.3, crecimiento_pct: -0.1, crecimiento_organico_pct: null, ebitda: 122.3, margen_ebitda_pct: 19.1, bpa: 5.48, vs_consenso: 'Inferior' },
      { periodo: '1T26', ingresos: 657.5, crecimiento_pct: 1.6, crecimiento_organico_pct: null, ebitda: 106.2, margen_ebitda_pct: 16.2, bpa: 4.84, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 673.3, crecimiento_pct: 8.8, crecimiento_organico_pct: null, ebitda: 110.1, margen_ebitda_pct: 16.4, bpa: 5.13, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'EBITDA de los trimestres = el que publica la empresa (beneficio + intereses + impuestos + amortizaciones), sin sus ajustes [5-12]. En el 2T26 (28-29-jul) la dirección dijo que VITAS superó «incluso la parte alta» de sus previsiones: altas +9,0 %, censo medio diario +6,1 % (más de 24.000 pacientes al cierre del trimestre por primera vez), estancia media de 101,2 días frente a 137,1 y solo 0,5 M de tope de Medicare frente a 16,4 M un año antes [5, 14]. Subió la guía de VITAS por segunda vez (censo +5,75-6,25 %, ventas sin tope +8,25-9,25 %, margen EBITDA sin tope 19-19,5 %) y la del BPA ajustado a 25,00-25,75 USD (23,25-24,25 en febrero) [5, 14, 7]. Roto-Rooter cumplió su plan, pero los contactos gratuitos de búsquedas cayeron un 13,1 % y los de pago subieron un 7,3 %: el 59 % de los contactos ya es de pago (54 % un año antes, 44 % hace año y medio), con 3,1 M más de marketing en el trimestre [14]. Los analistas preguntaron por la sostenibilidad del crecimiento de VITAS, el margen de Roto-Rooter y el riesgo de tope en Florida. El consejero delegado reconoció que Google «odia los contactos gratuitos», habló de una «nueva normalidad» y comparó la IA con la llegada de internet frente a las páginas amarillas; no dio una cifra de cuánto costará [14]. Frente al 1T26, cuando los contactos totales aún subían un 3,3 % con los gratuitos cayendo un 16 %, el discurso de Roto-Rooter pasó de «tormentas y Google» a aceptar un coste de captación más alto de forma permanente [6, 15].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 0 }, { anio: '2031', importe: 140 }],
    liquidez: 'Caja de 40,2 M al 30-jun-2026 y 262,7 M sin disponer de la línea revolving de 450 M (abril de 2026, cinco años, SOFR + 100 pb, con 250 M de ampliación posible) tras 47,3 M de avales [5].',
    rating: 'Sin rating',
    coste_deuda_pct: 5.3,
    vida_media_anios: 4.5,
    otros_pasivos: 'Los arrendamientos son operativos (144 M de pasivo al cierre de 2025 y 154,8 M en junio de 2026); su gasto está dentro del EBITDA y no van al puente [1, 5]. Los planes de compensación diferida (147,0 M de pasivo) están cubiertos por inversiones en fideicomiso de 148,2 M [5]. Seguros devengados de 72,5 M (responsabilidad profesional, accidentes de trabajo y flota) [5]. El crédito exige un apalancamiento máximo de 3,5 veces y una cobertura de intereses mínima, con holgura amplia (deuda de 140 M frente a un EBITDA de 416 M) [1, 5]. La auditoría de nivel de cuidados de 2022 (50,3 M retenidos) se resolvió a favor de VITAS en 2025 y le devolvieron el depósito; las demandas colectivas por el ciberataque de octubre de 2025 se han pactado por un importe no material cubierto por el seguro [1, 13].',
    comentario: 'El circulante comercial es pequeño (clientes 183 M, proveedores 64,5 M: 5,0 % de las ventas en 2025) y estable; el 58 % de los cobros pendientes de VITAS es de Medicare y el 34-36 % de Medicaid [1, 13]. La deuda va y viene con las recompras: 185 M en 2021 tras recomprar 576 M, cero de 2023 a 2025 y 140 M en junio de 2026 tras recomprar 287,5 M en el semestre [4, 5]. El patrimonio neto baja (1.119 M en 2024, 979 M en 2025 y 830,5 M en junio de 2026) porque la autocartera acumulada ya suma 3.900 M [5]. Deuda neta de 99,8 M en junio de 2026, 0,24 veces el EBITDA de los últimos doce meses.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión de beneficio en caja es alta y estable: flujo operativo de 388 M en 2025 frente a 265 M de beneficio, con un capex de 62,8 M (2,5 % de las ventas, por debajo de las amortizaciones de 64,8 M) [1, 4]. 2020 está inflado (489 M) por el aplazamiento de cotizaciones sociales y los fondos de la ley CARES, que se devolvieron después; 2024 incluye 97,4 M de compras (Covenant Care, 85 M) [1, 4]. El capex es casi todo de mantenimiento: vehículos, equipos y sistemas de Roto-Rooter y oficinas y unidades de hospitalización de VITAS; la recompra de franquicias de Roto-Rooter (33,5 M en el 1S26) es la inversión de crecimiento [5, 14]. Entre 2018 y 2025 la empresa generó unos 2.830 M de flujo operativo y dedicó 1.981 M a recompras y 216 M a dividendos [4].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: null, opinion: 'Favorable, también sobre el control interno (27-feb-2026)',
    comentario: 'Cuentas sin cambios de criterio relevantes en 2018-2025. Las partidas de juicio son el tope de Medicare (la empresa estima por número de proveedor la devolución y la resta de los ingresos de forma lineal en el año del Gobierno: 27,2 M en 2025, 8,4 M en 2024), las concesiones implícitas de precio en los cobros de Medicare y Medicaid y los seguros de responsabilidad [1]. El gasto en opciones (32,7 M en 2025, 12 % del beneficio) y el incentivo a largo plazo se excluyen del BPA ajustado que usa la empresa y que mide el variable de la dirección [1, 7]. No hay deterioros del fondo de comercio (667 M, casi todo de la compra de VITAS en 2004). El tipo efectivo es estable (24-25 % salvo 2018-2019, con beneficios fiscales de opciones) [4].',
    senales: [
      { senal: 'BPA ajustado de la empresa muy por encima del publicado', nivel: 'Media', comentario: 'Diferencia de 3,21 USD por acción en 2025 (17,5 %), casi toda por opciones sobre acciones; el variable se mide con el ajustado [7].' },
      { senal: 'Tope de Medicare como estimación contable', nivel: 'Baja', comentario: 'Se estima por proveedor y año del Gobierno; 2025 llevó 27,2 M, 2026 se espera en 7 M [1, 5].' },
      { senal: 'Ciberataque de octubre de 2025 con acceso a datos de pacientes', nivel: 'Baja', comentario: 'Demandas colectivas pactadas por un importe no material cubierto por el seguro [13].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: compras de franquicias de Roto-Rooter y de hospicios en estados con licencia previa (certificado de necesidad), recompras «agresivas» cuando la oportunidad lo justifica y un dividendo creciente [14]. El dividendo trimestral pasó de 0,60 a 0,70 USD en agosto de 2026 (+16,7 %; 221 dividendos trimestrales seguidos) [16]. En los doce meses hasta junio de 2026 recompró 1.517.500 acciones a 423,63 USD de media, el 10,5 % del capital; quedaban 139,8 M de autorización [5].',
    adquisiciones: [
      { anio: '2024', objetivo: 'Covenant Care (hospicios y una residencia en el norte de Florida)', importe: 85.0, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en VITAS Florida; las altas de pacientes de hospitales en Florida llevaron al tope de Medicare de 2025 (27,2 M) [1, 7].' },
      { anio: '2024', objetivo: 'Tres franquicias de Roto-Rooter (Nueva Jersey, Texas, Kentucky)', importe: 12.4, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas como sucursales propias [1].' },
      { anio: '2026', objetivo: 'Cuatro franquicias de Roto-Rooter (San Francisco, Fort Worth, sur de Texas y otra)', importe: 33.5, ev_ebitda: null, financiacion: 'Caja y línea de crédito', resultado: 'San Francisco y Fort Worth aportarán 5-5,5 M de ventas en 2026; inmediatamente acrecientes según la empresa [6, 14].' },
      { anio: '2019', objetivo: 'Franquicias de Roto-Rooter (incluida la de mayor tamaño)', importe: 138.0, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Roto-Rooter creció de 745 M de ventas en 2020 a 949 M en 2023 [3, 4].' },
    ],
    comentario: 'Chemed es una de las asignadoras de capital más consistentes del mercado: entre 2018 y 2025 recompró 1.981 M y redujo las acciones diluidas de 16,8 a 14,5 M, y desde entonces a 13,2 M en el 2T26 [4, 5]. Las compras son pequeñas y cerca del negocio. El punto débil es el precio: recompró a 459 USD de media en 2025 y a 395 en el 1T26, por encima de nuestro valor intrínseco en 2025 [1, 6]. El ROIC con fondo de comercio ronda el 25 % y la dirección no ha diluido nunca para comprar.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      seg('VITAS', 'Cuidados paliativos (hospicio) a domicilio, en residencias y en unidades propias; más del 90 % de los ingresos de Medicare', [['2020', 1334.7, 294.9], ['2021', 1261.2, 196.2], ['2022', 1201.6, 155.1], ['2023', 1315.1, 184.1], ['2024', 1531.0, 264.0], ['2025', 1630.1, 246.9]]),
      seg('Roto-Rooter', 'Fontanería, desatascos, excavación y reparación de daños por agua para hogares (≈ 70 %) y empresas', [['2020', 744.9, 151.4], ['2021', 878.0, 211.0], ['2022', 933.4, 235.7], ['2023', 949.4, 226.8], ['2024', 900.3, 194.5], ['2025', 899.9, 160.8]]),
      seg('Corporativo', 'Gastos de la matriz, opciones sobre acciones e incentivos', [['2020', 0, -56.6], ['2021', 0, -64.2], ['2022', 0, -47.4], ['2023', 0, -70.3], ['2024', 0, -92.0], ['2025', 0, -69.5]]),
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 99 }, { nombre: 'Canadá y otros', peso_pct: 1 }], geografias_criterio: 'origen',
    kpis: [
      { kpi: 'VITAS: censo medio diario (pacientes)', valor_anterior: '22.330 (2T25)', valor_actual: '23.687 (2T26)', variacion: '+6,1 %', comentario: 'Récord: más de 24.000 al cierre del 2T26 [5, 14].' },
      { kpi: 'VITAS: altas de pacientes', valor_anterior: '17.546 (2T25)', valor_actual: '19.125 (2T26)', variacion: '+9,0 %', comentario: 'Hospitales 42,9 % de las altas en Florida (objetivo 42-45 %) [14].' },
      { kpi: 'VITAS: estancia media (días)', valor_anterior: '137,1 (2T25)', valor_actual: '101,2 (2T26)', variacion: '−26 %', comentario: 'Más pacientes de estancia corta: es lo que aleja el tope de Medicare [14].' },
      { kpi: 'VITAS: tope de Medicare (M USD, año natural)', valor_anterior: '27,2 (2025)', valor_actual: '7,0 (2026e)', variacion: '−74 %', comentario: 'Florida sin tope en el año del Gobierno 2026 [5].' },
      { kpi: 'Roto-Rooter: contactos de pago sobre el total', valor_anterior: '54 % (2T25)', valor_actual: '59 % (2T26)', variacion: '+5 pp', comentario: '44 % hace año y medio; contactos gratuitos −13,1 % [14].' },
      { kpi: 'Roto-Rooter: publicidad (M USD)', valor_anterior: '73,1 (2024)', valor_actual: '77,1 (2025)', variacion: '+5,5 %', comentario: '67,7 M en 2023; 8,6 % de las ventas del segmento en 2025 [1].' },
      { kpi: 'Roto-Rooter: ventas comerciales de sucursales (M USD)', valor_anterior: '53,2 (2T25)', valor_actual: '56,8 (2T26)', variacion: '+6,8 %', comentario: 'Residencial +1,7 % (159,1 M) [5].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'calidad', campo: 'años del auditor', tipo: 'Complemento', intentos: '1) 10-K 2025 (informe del auditor sin «we have served»); 2) proxy 2026 (honorarios, sin antigüedad); 3) Audit Analytics (de pago)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ------------------------------------------------------------------ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'MedPAC, Report to the Congress: Medicare Payment Policy, capítulo 10 (hospicio), marzo de 2026', editor: 'MedPAC', tipo: 'Sectorial', fecha: '2026-03-13', url: 'https://www.medpac.gov/wp-content/uploads/2026/03/Mar26_Ch10_MedPAC_Report_To_Congress_SEC.pdf' },
  { id: 2, titulo: 'Fiscal Year 2027 Hospice Wage Index and Payment Rate Update (hoja informativa de la norma final CMS-1851-F)', editor: 'CMS', tipo: 'Primaria', fecha: '2026-07-30', url: 'https://www.cms.gov/newsroom/fact-sheets/fiscal-year-2027-hospice-wage-index-payment-rate-update-hospice-quality-reporting-program' },
  { id: 3, titulo: 'Chemed Corporation, Form 10-K del ejercicio 2025 (competencia, regulación, riesgos)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-27', url: `${EDGAR}/000156276226000020/che-20251231x10k.htm` },
  { id: 4, titulo: 'CMS Announces Nationwide Six-Month Medicare Enrollment Moratoria for New Hospices and Home Health Agencies', editor: 'Venable LLP', tipo: 'Prensa', fecha: '2026-05', url: 'https://www.venable.com/insights/publications/2026/05/cms-announces-nationwide-six-month-medicare' },
  { id: 5, titulo: 'Plumbers in the US - Market Size (2006-2032)', editor: 'IBISWorld', tipo: 'Sectorial', fecha: '2026-02', url: 'https://www.ibisworld.com/united-states/market-size/plumbers/1946' },
  { id: 6, titulo: 'Yahoo Finance: cuentas de los últimos doce meses y consenso de ADUS, PNTG, BTSG, EHC, ENSG, AVAH, OPCH, ROL y FTDR', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/' },
  { id: 7, titulo: 'Chemed (CHE) Q2 2026 Earnings Call Transcript', editor: 'Stock Analysis', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://stockanalysis.com/stocks/che/transcripts/654455-q2-2026/' },
  { id: 8, titulo: 'Ficha sectorial de control de plagas (captación residencial con IA, Rollins)', editor: 'Análisis propio (repositorio)', tipo: 'Analistas', fecha: '2026-10-15', url: 'sectores/control-plagas-2026-10-15.md' },
];
const B2 = {
  _estado: 'completo',
  negocio: {
    descripcion: 'Chemed es un conglomerado de dos negocios sin relación operativa. VITAS (64 % de las ventas en 2025) es el mayor proveedor de cuidados paliativos de EE. UU.: atiende a enfermos terminales con una esperanza de vida de seis meses o menos, sobre todo en su domicilio (82 % del censo), en residencias y en unidades de hospitalización propias o contratadas, con 33 números de proveedor de Medicare en 15 estados y Washington, la mayor parte en Florida, California y Texas [3]. Roto-Rooter (36 %) es la mayor empresa de fontanería y desatascos del país: sucursales propias, contratistas independientes y franquiciados en EE. UU. y Canadá, con servicios de fontanería, desatasco, excavación y reparación de daños por agua para hogares (≈ 74 % de las ventas de sucursales) y empresas [3]. Ninguno de los dos usa al otro: la matriz asigna capital, recompra acciones y negocia el crédito [3].',
    como_gana_dinero: 'VITAS cobra por día de paciente una tarifa diaria fija de Medicare según el nivel de cuidados (rutinario a domicilio 188,62 USD de media en el 2T26; cuidados intensivos 1.152 USD), revisada cada 1 de octubre por la CMS [3, 2]. El margen depende del personal (los salarios son el 75 % del coste de los servicios) y de la mezcla de estancias: los pacientes de estancia larga son más rentables por día, pero acercan el tope anual por beneficiario (35.361 USD en el año del Gobierno 2026), que obliga a devolver lo cobrado por encima [3]. Roto-Rooter cobra por trabajo; el margen bruto ronda el 50 % y el coste clave es la captación: la publicidad (77,1 M en 2025) y, cada vez más, los clics de pago en Google; los servicios auxiliares (excavación y daños por agua) se venden sobre la misma visita sin coste de captación [3, 7].',
    clientes: 'En VITAS el cliente que paga es el Gobierno: más del 90 % de los ingresos viene de Medicare y más del 95 % de Medicare y Medicaid [3]. No hay contratos plurianuales: el poder de precio es nulo (la tarifa la fija la CMS: +2,3 % para el año fiscal 2027, con Florida algo por encima de la media según la empresa) y la palanca es el volumen y la mezcla de altas [2, 7]. Los pacientes llegan de hospitales (42,9 % de las altas en Florida en el 2T26), domicilios, residencias asistidas y residencias de mayores [7]. En Roto-Rooter, clientes particulares muy dispersos (ningún cliente relevante) y empresas atendidas por 30 gestores comerciales que hacen crecer las ventas comerciales un 13 % en sus sucursales [7]. Roto-Rooter ha subido precios por encima de la inflación entre 2021 y 2023, pero desde 2024 sus ventas están planas y el margen ajustado bajó del 26 % en 2024 al 21-22 % [3, 7].',
  },
  sector: {
    definicion: 'Usamos el mercado de cuidados paliativos pagados por Medicare en EE. UU. (pago por servicio), que es más del 90 % de los ingresos de VITAS y el 64 % de los de Chemed; MedPAC da el gasto de cada año [1]. Para Roto-Rooter el mercado relevante es el de reparación de fontanería y desatascos para hogares y empresas en EE. UU., que no tiene una estadística propia: IBISWorld da el de todos los fontaneros (190.600 M USD en 2025, con dos tercios de obra nueva no residencial), que sirve solo de techo [5]. La ficha sectorial y la prueba de cuota se hacen con el mercado de hospicios.',
    tamano: '≈ 28.300 M USD de gasto de Medicare en hospicios en 2024 (MedPAC) [1]',
    unidad_serie: 'millones de USD (gasto de Medicare en hospicios; 2025e-2030e estimación propia)',
    serie: [{ anio: '2019', tamano: 20900 }, { anio: '2022', tamano: 23700 }, { anio: '2023', tamano: 25700 }, { anio: '2024', tamano: 28300 }, { anio: '2025e', tamano: 30000 }, { anio: '2026e', tamano: 31800 }, { anio: '2030e', tamano: 39500 }],
    tcac_historico_pct: 6.2, tcac_previsto_pct: 5.6, cr5_pct: 15, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Envejecimiento y uso del hospicio', efecto: '+', horizonte: 'Estructural', evidencia: 'El 52,9 % de los fallecidos de Medicare usó un hospicio en 2024 (51,7 % en 2023); 1,82 millones de usuarios, +4,6 % [1].' },
      { driver: 'Tarifas de Medicare', efecto: '+/−', horizonte: 'Estructural', evidencia: '+2,3 % para el año fiscal 2027 (cesta de precios 3,2 % menos 0,9 de productividad); MedPAC pidió congelar la de 2027 por un margen medio del 8,0 % en 2023 y del 9 % previsto en 2026 [1, 2].' },
      { driver: 'Tope por beneficiario', efecto: '−', horizonte: 'Estructural', evidencia: '36.174,75 USD para 2027 (+2,3 %); el 28 % de los hospicios lo superó en 2023 [1, 2].' },
      { driver: 'Lucha contra el fraude (moratoria de nuevos hospicios)', efecto: '+', horizonte: 'Cíclico', evidencia: 'Moratoria nacional de seis meses desde el 13-may-2026 a nuevas altas en Medicare de hospicios; favorece a los grandes ya establecidos [4, 7].' },
      { driver: 'Captación digital en servicios al hogar', efecto: '−', horizonte: 'Estructural', evidencia: 'Roto-Rooter: contactos gratuitos −13,1 % y de pago 59 % del total en el 2T26 [7].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Unos 6.700 hospicios, con entrada continua de pequeños con ánimo de lucro (+5 % en 2024) [1]; en fontanería, miles de locales y compras de fondos [3].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'Medicare fija la tarifa y el tope; no hay negociación [1, 2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Enfermería escasa: en 2021-2022 la falta de personal hundió el EBIT de VITAS a 155 M [3]. En Roto-Rooter, Google como canal de captación con poder creciente [7].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Barreras bajas salvo en estados con certificado de necesidad (Florida) y durante la moratoria [3, 4].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Paliativos en hospital o Medicare Advantage con el hospicio dentro (aún no incluido); en fontanería, el bricolaje en lo pequeño [1, 3].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El hospicio no depende del ciclo económico sino de la demografía y de Medicare: el gasto creció cada año de 2019 a 2024 (5,3 % anual en 2019-2023 y 10,4 % en 2024) [1]. En 2020 VITAS ganó con la pandemia (más altas, EBIT de 294,9 M) y en 2021-2022 perdió por la falta de enfermería [3]. Roto-Rooter es algo cíclica (vivienda, lluvias y heladas): ventas +18 % en 2021, planas en 2024-2025 [3].' },
    regulacion: 'Lo que mueve las cifras: la tarifa anual de la CMS (+2,3 % desde el 1-oct-2026) y el tope por beneficiario (36.174,75 USD en el año del Gobierno 2027) [2]; la recomendación de MedPAC de congelar la tarifa de 2027, que la CMS no siguió [1, 2]; la moratoria de seis meses a nuevos hospicios desde el 13-may-2026, prorrogable [4]; el nuevo índice de variación de servicios (SSVI) y el anexo obligatorio a la elección de hospicio, que aumentan la vigilancia de los hospicios con estancias largas [2]; y la Ley de Reclamaciones Falsas, con la que VITAS pactó 75 M en 2017 [3].',
    tendencias: 'En hospicio, consolidación (UnitedHealth compró Amedisys en 2025), lucha contra el fraude en California y Texas, y posible entrada del hospicio en Medicare Advantage, que traería negociación de precios con aseguradoras [1, 7]. En servicios al hogar, la captación pasa de la búsqueda gratuita a los anuncios de pago y a las respuestas de IA: Roto-Rooter ya paga el 59 % de sus contactos, igual que Rollins ve caer los contactos residenciales [7, 8]. Gana quien tiene marca, escala para pagar clics y servicios auxiliares que rentabilizan cada visita.',
  },
  competencia: {
    cuota_pct: 5.0,
    posicion: '1.º en hospicios de EE. UU. por censo (≈ 5 % del gasto de Medicare); 1.º en fontanería y desatascos con marca nacional (cuota < 1 % de un mercado muy fragmentado)',
    competidores: [
      { nombre: 'Gentiva (hospicio, antes Kindred at Home)', pais: 'Estados Unidos', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor competidor en hospicio, propiedad de CD&R; no publica cuentas [3].' },
      { nombre: 'Amedisys (UnitedHealth/Optum)', pais: 'Estados Unidos', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Integrada en Optum desde 2025; hospicio y atención domiciliaria [7].' },
      { nombre: 'The Pennant Group', pais: 'Estados Unidos', ticker: 'PNTG', ingresos: 1102, cuota_pct: null, margen_ebit_pct: 5.7, comentario: 'Hospicio, atención domiciliaria y residencias; crece por compras (+25 % de ventas en 2026e) [6].' },
      { nombre: 'Addus HomeCare', pais: 'Estados Unidos', ticker: 'ADUS', ingresos: 1476, cuota_pct: null, margen_ebit_pct: 10.2, comentario: 'Cuidados personales a domicilio con hospicio como negocio menor [6].' },
      { nombre: 'Encompass Health', pais: 'Estados Unidos', ticker: 'EHC', ingresos: 6206, cuota_pct: null, margen_ebit_pct: 18.6, comentario: 'Hospitales de rehabilitación; mismo pagador (Medicare) y misma lógica de tarifa regulada [6].' },
      { nombre: 'Rollins (Orkin)', pais: 'Estados Unidos', ticker: 'ROL', ingresos: 3924, cuota_pct: null, margen_ebit_pct: 18.7, comentario: 'Servicios al hogar con captación residencial por internet: mismo problema de contactos [6, 8].' },
      { nombre: 'Frontdoor (American Home Shield)', pais: 'Estados Unidos', ticker: 'FTDR', ingresos: 2146, cuota_pct: null, margen_ebit_pct: 20.5, comentario: 'Garantías de reparación del hogar que subcontrata fontanería [6].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Relaciones con hospitales y médicos que derivan pacientes en cada mercado; no crecen con el tamaño nacional [3].' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'El paciente o el hospital eligen proveedor en cada alta; en fontanería no hay contrato [3].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Marca Roto-Rooter desde 1935, de las más conocidas del país; certificados de necesidad en Florida, donde VITAS está en casi todos los condados [3, 7].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala en compras, sistemas y cumplimiento; margen EBITDA ajustado de VITAS del 18-19 % frente a un margen medio de Medicare del 8-9 % en el sector [1, 7].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Densidad de pacientes y de técnicos por mercado; los mercados no son monopolios locales [3].' },
      ],
    },
    amenazas: 'Tres amenazas, de más a menos probable. Primero, la captación de Roto-Rooter: si los contactos gratuitos siguen cayendo un 13-16 % al año y los de pago pasan del 59 % al 70 %, el margen ajustado del segmento bajaría del 22 % hacia el 19-20 % (cada punto son unos 9 M de EBITDA) [7]. Segundo, la regulación de Medicare: una congelación de tarifas como la que pidió MedPAC, o un tope más estricto, toca directamente el 60 % del beneficio [1]. Tercero, una nueva investigación de fraude a VITAS, como la que acabó en 75 M en 2017 [3].',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado de reparación de fontanería y desatascos', tipo: 'Complemento', intentos: '1) 10-K de Chemed (sin cifra de mercado); 2) IBISWorld (solo fontaneros totales, con obra nueva); 3) asociaciones (PHCC, sin cifra pública)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuentas de Gentiva y de Amedisys tras su integración', tipo: 'Complemento', intentos: '1) web de Gentiva (privada, sin cuentas); 2) 10-K de UnitedHealth (no separa Amedisys); 3) prensa sectorial (sin cifras auditadas)', decision: 'Omitido' },
  ],
};
guarda('B', B2);

// ------------------------------------------------------------------ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Chemed Corporation, proxy statement (DEF 14A) para la junta de 2026', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2026-04-06', url: `${EDGAR}/000001958426000005/che-20251231xdef14a.htm` },
  { id: 2, titulo: 'Chemed Corporation, 8-K de resultados de la junta del 18-may-2026 (voto consultivo de remuneración rechazado)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2026-05-19', url: `${EDGAR}/000001958426000014/che-20260518x8k.htm` },
  { id: 3, titulo: 'SEC EDGAR: Form 4 de Chemed presentados entre el 15-oct-2025 y el 15-oct-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000019584&type=4' },
  { id: 4, titulo: 'Chemed Corporation, Form 10-K del ejercicio 2025', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-27', url: `${EDGAR}/000156276226000020/che-20251231x10k.htm` },
  { id: 5, titulo: 'Notas de prensa de resultados 3T24-2T26 (guías de BPA ajustado)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-28', url: `${EDGAR}/000001958426000018/che-20260728xex99.htm` },
  { id: 6, titulo: 'Seeking Alpha, noticias de CHE: «Chemed edges higher on report activist Barington has taken a stake» (3-jun-2026) y «Activist Barington pushes for Chemed to start a strategic review» (21-jul-2026)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-07-21', url: 'https://seekingalpha.com/symbol/CHE/news' },
  { id: 7, titulo: 'Chemed Reports Second-Quarter 2025 Results (salida del presidente de VITAS)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2025-07-29', url: `${EDGAR}/000156276225000181/che-20250729xex99.htm` },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Kevin J. McNamara', cargo: 'Presidente ejecutivo de la compañía (President) y consejero delegado', desde: '2001', participacion_pct: 1.34, trayectoria: 'En Chemed desde los años ochenta, President desde 1994 y consejero delegado desde mayo de 2001; 72 años. Compró VITAS en 2004 y bajo su mando el beneficio neto de VITAS creció un 11 % anual en 21 años según la empresa [1, 5].' },
      { nombre: 'Michael D. Witzeman', cargo: 'Vicepresidente ejecutivo, director financiero y controller', desde: '2024', participacion_pct: 0.19, trayectoria: 'Controller de Chemed durante años antes de la dirección financiera [1].' },
      { nombre: 'Joel L. Wherley', cargo: 'Presidente y consejero delegado de VITAS', desde: '2025', participacion_pct: 0.11, trayectoria: 'Sustituyó en julio de 2025 al anterior presidente de VITAS, que salió con el problema del tope de Florida; desde entonces las altas y el censo vuelven a crecer [7, 5].' },
      { nombre: 'Spencer S. Lee', cargo: 'Vicepresidente ejecutivo (Roto-Rooter)', desde: '2008', participacion_pct: 0.34, trayectoria: 'Dirige Roto-Rooter; vendió 1.000 acciones en agosto de 2026 [1, 3].' },
      { nombre: 'George J. Walsh III', cargo: 'Presidente del consejo (no ejecutivo)', desde: '1995', participacion_pct: 0.02, trayectoria: 'Abogado, socio de Thompson Hine hasta 2024; consejero desde 1995 [1].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'BPA ajustado 23,00-23,15 USD (revisada en el 3T)', real: '23,13 USD', cumplida: 'Sí' },
      { anio: '2025', guia: 'BPA ajustado 24,95-25,45 USD (febrero), rebajada a 22,00-22,30 (julio)', real: '21,55 USD', cumplida: 'No' },
      { anio: '2026', guia: 'BPA ajustado 23,25-24,25 USD (febrero), subida a 24,00-24,75 (abril) y a 25,00-25,75 (julio)', real: '11,71 USD en el 1S26 (en curso)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo muy estable y de larga trayectoria, con un historial de cumplir la guía salvo en 2025, cuando el tope de Medicare de Florida obligó a rebajarla un 12 % en julio y la empresa tampoco llegó a la parte baja [5]. El cambio en VITAS (julio de 2025) parece haber funcionado: dos subidas de guía en 2026. La sucesión es la gran pregunta: el consejero delegado tiene 72 años, lleva 25 en el cargo y no hay un sucesor anunciado; su hijo es vicepresidente y director de estrategia [1]. El rechazo del voto de remuneración en mayo de 2026 y la entrada de Barington apuntan a que los accionistas quieren cambios [2, 6].',
  },
  gobierno: {
    consejo: [
      { nombre: 'George J. Walsh III', cargo: 'Presidente', tipo: 'Independiente', desde: '1995', comisiones: 'Remuneración' },
      { nombre: 'Kevin J. McNamara', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '1987', comisiones: '' },
      { nombre: 'Thomas C. Hutton', cargo: 'Vicepresidente', tipo: 'Ejecutivo', desde: '1985', comisiones: '' },
      { nombre: 'Ron DeLyons', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría' },
      { nombre: 'Patrick P. Grace', cargo: 'Consejero', tipo: 'Independiente', desde: '1996', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Christopher J. Heaney', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Remuneración' },
      { nombre: 'Andrea R. Lindell', cargo: 'Consejera', tipo: 'Independiente', desde: '2008', comisiones: 'Remuneración' },
      { nombre: 'Eileen P. McCarthy', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneración' },
      { nombre: 'John M. Mount Jr.', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 38.7, voto_remuneracion_contra_pct: 61.1, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 12.90, fijo: 1.86, variable_corto: 1.49, variable_largo: 7.92, ratio_salario_medio: 209 },
    remuneracion: 'El primer ejecutivo cobró 12,9 M USD en 2025 (12,8 M en 2024): 1,86 M de fijo, 1,49 M de variable anual, 2,88 M en acciones de rendimiento, 5,04 M en opciones y 1,55 M de otros conceptos; 209 veces el salario mediano [1]. El variable anual depende en un 75 % del BPA ajustado y en un 25 % del rendimiento sobre activos; las acciones de rendimiento, del BPA ajustado acumulado a tres años y del rendimiento total frente a un grupo de comparables [1]. El BPA ajustado excluye las propias opciones, de modo que el gasto en acciones no penaliza el variable. En la junta del 18-may-2026 el voto consultivo de remuneración fue rechazado: 61,1 % en contra y 38,7 % a favor sobre los votos emitidos, frente al 88,6 % a favor de 2025 [2, 1]. Hay política de recuperación (clawback) [1].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 11.28, tipo: 'Institucional', variacion: 'Según 13G de feb-2024 [1]' },
      { nombre: 'BlackRock', pct: 9.4, tipo: 'Institucional', variacion: 'Según 13G de ene-2024 [1]' },
      { nombre: 'Consejeros y directivos (con opciones y fundación)', pct: 3.33, tipo: 'Directivos', variacion: 'Ventas periódicas del consejero delegado [1, 3]' },
      { nombre: 'Barington Capital', pct: null, tipo: 'Activista', variacion: 'Entra en junio de 2026 y pide una revisión estratégica en julio [6]' },
    ],
    insiders: [
      { fecha: '2026-09-28', persona: 'Kevin J. McNamara (consejero delegado)', operacion: 'Venta', acciones: 2000, importe: 1.03 },
      { fecha: '2026-09-18', persona: 'Kevin J. McNamara (consejero delegado)', operacion: 'Venta', acciones: 2000, importe: 1.00 },
      { fecha: '2026-08-21', persona: 'Kevin J. McNamara (consejero delegado)', operacion: 'Venta', acciones: 2000, importe: 1.08 },
      { fecha: '2026-08-21', persona: 'Spencer S. Lee (vicepresidente ejecutivo)', operacion: 'Venta', acciones: 1000, importe: 0.54 },
      { fecha: '2026-08-03', persona: 'Kevin J. McNamara (consejero delegado)', operacion: 'Venta', acciones: 2000, importe: 1.08 },
      { fecha: '2026-06-09', persona: 'Andrea R. Lindell (consejera)', operacion: 'Venta', acciones: 1347, importe: 0.60 },
      { fecha: '2026-05-29', persona: 'George J. Walsh III (presidente)', operacion: 'Venta', acciones: 500, importe: 0.22 },
      { fecha: '2026-05-01', persona: 'Kevin J. McNamara (consejero delegado)', operacion: 'Venta', acciones: 2000, importe: 0.84 },
      { fecha: '2026-03-27', persona: 'Kevin J. McNamara (consejero delegado)', operacion: 'Venta', acciones: 1500, importe: 0.55 },
      { fecha: '2026-03-12', persona: 'Kevin J. McNamara (consejero delegado)', operacion: 'Venta', acciones: 2000, importe: 0.81 },
    ],
    control_y_defensas: 'Sin accionista de control: los dos primeros son fondos indexados (Vanguard 11,3 %, BlackRock 9,4 %) y el consejo y la dirección tienen el 3,3 % con opciones [1]. Una acción, un voto; consejo de nueve con siete independientes según la NYSE; el presidente del consejo es independiente pero lleva 31 años en él, y cuatro consejeros superan los 17 años de antigüedad [1]. Los consejeros que no logran mayoría deben dimitir; en 2026 dos recibieron muchos votos en contra (Grace, 17 %; Walsh, 12 %) [2]. Vinculadas: el hijo del consejero delegado es vicepresidente y director de estrategia (433.195 USD en 2025), revisado por la comisión de auditoría [1]. Ventas de directivos sin compras en doce meses: 8,76 M USD, 7,27 M del consejero delegado, en paquetes de 2.000 acciones [3].',
    alertas: [
      'Voto consultivo de remuneración rechazado en la junta de 2026 (61,1 % en contra) [2].',
      'Barington, fondo activista, pide una revisión estratégica (julio de 2026) [6].',
      'Sucesión no anunciada de un consejero delegado de 72 años con 25 en el cargo; su hijo trabaja en la dirección [1].',
      'Consejo muy veterano: presidente desde 1995 y vicepresidente ejecutivo en el consejo desde 1985 [1].',
    ],
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'participación de Barington', tipo: 'Complemento', intentos: '1) EDGAR (sin 13D ni 13G de Barington); 2) Seeking Alpha (titular sin cifra); 3) búsqueda de la carta (no publicada en fuentes abiertas)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ------------------------------------------------------------------ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (CHE, SPY, XLV) hasta el 14-oct-2026 (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CHE/history/' },
  { id: 2, titulo: 'Yahoo Finance: consenso de BPA y ventas 2026-2027 (earningsTrend) de CHE y comparables', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/CHE/analysis/' },
  { id: 3, titulo: 'Chemed (CHE) Stock Forecast & Price Target (5 analistas)', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/che/forecast/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,19 % el 14-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Yahoo Finance: capitalización, cuentas de los últimos doce meses y deuda de los comparables (fundamentals-timeseries)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/' },
  { id: 7, titulo: 'Chemed (CHE) Statistics: posición corta, acciones, ROIC', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/che/statistics/' },
  { id: 8, titulo: 'Chemed To Report Third Quarter 2026 Earnings October 27, Related Conference Call To Be Held On October 28', editor: 'GlobeNewswire', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://www.globenewswire.com/news-release/2026/10/01/3372939/0/en/index.html' },
  { id: 9, titulo: 'Amedisys buys Compassionate Care for $340M (8 veces el EBITDA)', editor: 'Home Health Care News', tipo: 'Prensa', fecha: '2018-10', url: 'https://homehealthcarenews.com/2018/10/amedisys-buys-compassionate-care-for-340m-will-become-third-largest-us-hospice-provider/' },
  { id: 10, titulo: 'UnitedHealth Set to Snag Amedisys from Option Care (101 USD por acción, ≈ 3.300 M)', editor: 'Healthcare Innovation', tipo: 'Prensa', fecha: '2023-06', url: 'https://www.hcinnovationgroup.com/population-health-management/article/53064428/unitedhealth-set-to-snag-amedisys-from-option-care' },
  { id: 11, titulo: 'Humana starts hospice sale process (≈ 300 M de EBITDA; se buscaban 12 veces)', editor: 'Axios', tipo: 'Prensa', fecha: '2022-01-31', url: 'https://www.axios.com/2022/01/31/humana-hospice-sale-process' },
  { id: 12, titulo: 'Chemed Reports Second-Quarter 2026 Results (guía de BPA ajustado 25,00-25,75)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-28', url: `${EDGAR}/000001958426000018/che-20260728xex99.htm` },
  { id: 13, titulo: 'Chemed Corporation, Form 10-Q 2T26 (13.069.961 acciones al 30-jun-2026)', editor: 'Chemed Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${EDGAR}/000001958426000020/che-20260630x10q.htm` },
];
// Comparables: Yahoo (cuentas de los últimos doce meses, deuda neta del último balance anual, capitalización del 14-oct) y consenso de
// Yahoo (BPA y ventas 2026e-2027e). PER de los próximos 12 meses = precio ÷ (0,2 × BPA 2026e + 0,8 × BPA 2027e); crecimiento = ventas
// de los próximos 12 meses sobre las de los últimos 12, anualizado a 1,3 años (de jun-26 a oct-27). BPA de consenso = ajustado [2, 6].
const NOMBRES = { ADUS: 'Addus HomeCare', PNTG: 'The Pennant Group', BTSG: 'BrightSpring Health Services', EHC: 'Encompass Health', ENSG: 'The Ensign Group', AVAH: 'Aveanna Healthcare', OPCH: 'Option Care Health', ROL: 'Rollins', FTDR: 'Frontdoor' };
const comps = CP.filter((c) => NOMBRES[c.ticker]).map((c) => {
  const t = TR[c.ticker].tr; const y0 = t.find((x) => x.p === '0y'), y1 = t.find((x) => x.p === '+1y');
  const epsN = 0.2 * y0.eps + 0.8 * y1.eps, revN = (0.2 * y0.rev + 0.8 * y1.rev) / 1e6;
  return { nombre: NOMBRES[c.ticker], ticker: c.ticker, pais: 'US', capitalizacion: c.capitalizacion, ev_ventas: c.ev_ventas, ev_ebitda_ltm: c.ev_ebitda_ltm, ev_ebitda_ntm: null,
    per_ntm: r1(c._i.precio / epsN), crecimiento_pct: r1(100 * (Math.pow(revN / c._i.ventas, 1 / 1.3) - 1)), margen_ebitda_pct: c.margen_ebitda_pct, roic_pct: c.roic_pct, dn_ebitda: r1(c.dn_ebitda), fcf_yield_pct: c.fcf_yield_pct };
});
const ms = (y) => B.cierres_ejercicio.find((c) => c.anio === y)?.precio_cierre ?? null;
const tc = TR.CHE.tr;
const D = {
  _estado: 'completo',
  _comparables_calculo: 'PER NTM = precio ÷ (0,2 × BPA 2026e + 0,8 × BPA 2027e) del consenso de Yahoo; crecimiento NTM/LTM anualizado a 1,3 años.',
  identificacion: {
    nombre: 'Chemed Corporation', nombre_corto: 'Chemed', ticker: 'CHE', isin: 'US16359R1032', mercado: 'NYSE', indice_referencia: 'S&P MidCap 400',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Salud', industria: 'Proveedores y servicios de salud (cuidados paliativos) y servicios al hogar (fontanería)', sede: 'Cincinnati (Ohio)', fundacion: '1970', empleados: 15811, web: 'www.chemed.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 13.07, capitalizacion_publicada: 6707, free_float_pct: 91.0,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: '≈ 82 M USD/día (3 meses)', proximos_resultados: '2026-10-27',
  },
  consenso: {
    guidance: 'Guía de 2026 (28-jul-2026, segunda subida del año): BPA ajustado de 25,00-25,75 USD (23,25-24,25 en febrero; 24,00-24,75 en abril), con un tipo fiscal del 24,5 % y 13,5 M de acciones diluidas [12]. VITAS: censo +5,75-6,25 %, ventas sin tope +8,25-9,25 %, margen EBITDA ajustado sin tope del 19-19,5 % y tope de Medicare de 7 M [12]. Roto-Rooter: ventas +3,0-3,5 % y margen EBITDA ajustado del 21,5-22,5 % (22,5-23,0 % en febrero, rebajado en abril por el coste de marketing) [12]. La empresa dice que solo actualizará la guía una vez al año, con el 2T [12]. No hay plan a medio plazo publicado.',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(tc.find((x) => x.p === '0y').rev / 1e6), ebitda: null, ebit: 439, bpa: r2(tc.find((x) => x.p === '0y').eps), dpa: 2.60, fuente: 'Yahoo (5 analistas, BPA ajustado) [2]; Stock Analysis: beneficio operativo 439 M y neto 309 M [3]' },
      { periodo: '2027e', ingresos: Math.round(tc.find((x) => x.p === '+1y').rev / 1e6), ebitda: null, ebit: null, bpa: r2(tc.find((x) => x.p === '+1y').eps), dpa: null, fuente: 'Yahoo (5 analistas, BPA ajustado) [2, 3]' },
    ],
    recomendaciones: { n_analistas: 5, comprar: 2, mantener: 3, vender: 0, po_medio: 571.6, po_min: 520, po_max: 650 },
    revisiones: 'Al alza. El BPA ajustado de 2026 pasó de 24,34 USD hace 90 días a 25,49 (+4,7 %) y el de 2027 de 26,88 a 27,52 (+2,4 %), tras el 2T26 que batió el consenso (6,06 frente a 5,60) [2]. Objetivos: Oppenheimer de 500 a 590 (31-jul), RBC de 436 a 548 (30-jul), UBS inicia con 650 y compra (25-sep), Bank of America mantiene 550 y neutral (8-oct) [3]. Solo cinco analistas: el consenso es estrecho. El BPA del consenso es ajustado (sin opciones ni amortización de franquicias recompradas), unos 3,2 USD por encima del publicado.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.7,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: 5.0,
    comentario: '',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'].map((y) => ({ anio: y, precio_cierre: ms(y), ev_ebitda_ntm: null, per_ntm: null, excluir: y === '2020' })),
    comentario: '',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'No hay otro hospicio cotizado puro en EE. UU. desde que UnitedHealth compró Amedisys. Usamos proveedores de servicios de salud pagados sobre todo por Medicare y Medicaid (Pennant, Addus, Encompass, Ensign, Aveanna, BrightSpring, Option Care) y servicios al hogar con captación residencial (Rollins, Frontdoor). Enhabit queda fuera porque Yahoo no da sus cuentas. Todos con datos de Yahoo al 14-oct-2026; el PER de los próximos 12 meses es sobre BPA ajustado del consenso [2, 6].',
    empresas: comps,
    comentario: '',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2023-06', objetivo: 'Amedisys (hospicio y atención domiciliaria)', comprador: 'UnitedHealth (Optum)', ev: 3300, ev_ventas: 1.47, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '101 USD por acción; cerró en 2025 tras la revisión antimonopolio; ventas de 2.240 M en 2023 (estimación propia del múltiplo de ventas) [10].' },
      { fecha: '2022-02', objetivo: 'Kindred at Home, hospicio (hoy Gentiva), 60 %', comprador: 'CD&R (vende Humana)', ev: 4700, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '2.800 M por el 60 %; 100 % ≈ 4.700 M (estimación propia); Humana buscaba 12 veces un EBITDA de ≈ 300 M [11].' },
      { fecha: '2018-10', objetivo: 'Compassionate Care Hospice', comprador: 'Amedisys', ev: 340, ev_ventas: null, ev_ebitda: 8.0, prima_pct: null, excluir: false, comentario: '8 veces el EBITDA; la prensa sectorial hablaba entonces de 16-19 veces en otras operaciones [9].' },
      { fecha: '2024-01', objetivo: 'Covenant Care (hospicios en Florida)', comprador: 'Chemed (VITAS)', ev: 85, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Sin múltiplo publicado; da acceso a condados con certificado de necesidad [13].' },
    ],
    comentario: '',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'EV/EBITDA de las compras de hospicios de 2021-2025', tipo: 'Complemento', intentos: '1) prensa sectorial (Hospice News: importes sin EBITDA); 2) documentos de la fusión UnitedHealth-Amedisys (sin múltiplo de EBITDA publicado en lo leído); 3) Axios (múltiplo buscado, no pagado)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'EBITDA de consenso y estimaciones de 2028', tipo: 'Complemento', intentos: '1) Yahoo (solo BPA y ventas); 2) Stock Analysis (2028 de pago); 3) MarketScreener (no consultado por presupuesto)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ------------------------------------------------------------------ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: artículos y noticias de CHE (RSS, jul-oct 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/CHE.xml' },
  { id: 2, titulo: 'Stocktwits: flujo de mensajes de $CHE (jul-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-05', url: 'https://api.stocktwits.com/api/2/streams/symbol/CHE.json' },
  { id: 3, titulo: 'Chemed Corporation: Why A Spin-Off Could Unlock Its Hidden Value (artículo de autor)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-08-05', url: 'https://seekingalpha.com/article/4930610-chemed-corporation-why-a-spin-off-could-unlock-its-hidden-value' },
  { id: 4, titulo: 'Chemed\'s crossroads: a tale of two businesses at the Jefferies conference', editor: 'BriefGlance', tipo: 'Foros y redes', fecha: '2026-09-08', url: 'https://briefglance.com/articles/chemeds-crossroads-a-tale-of-two-businesses-at-the-jefferies-conference' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores y noticias)', fecha: '2026-09', n_comentarios: 15, tono: 'Positivo', resumen: 'Tras el 2T26 predominan las tesis de «suma de partes»: separar Roto-Rooter de VITAS destaparía valor, con el activista Barington como catalizador; la caída del 27-ago por una noticia sobre VITAS generó dudas puntuales [1, 3].' },
      { plataforma: 'Stocktwits ($CHE)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Pocos mensajes y casi todos alcistas de particulares («refugio», objetivos de 600-660 USD); en febrero dominaba el castigo por el 4T25 y la sensación de que la caída no estaba descontada [2].' },
      { plataforma: 'Resúmenes de conferencias con comentarios (BriefGlance)', fecha: '2026-09', n_comentarios: 5, tono: 'Dividido', resumen: 'Se presenta a Chemed como «dos empresas»: VITAS en plena recuperación y Roto-Rooter presionada por Google y el coste de los contactos de pago [4].' },
    ],
    temas: [
      { tema: 'Separar VITAS y Roto-Rooter (activista Barington)', postura: 'Alcista', peso: 'Alto', contraste: '' },
      { tema: 'VITAS ha dejado atrás el tope de Medicare de Florida', postura: 'Alcista', peso: 'Alto', contraste: '' },
      { tema: 'Google e IA encarecen los contactos de Roto-Rooter', postura: 'Bajista', peso: 'Medio', contraste: '' },
      { tema: 'Fraude en hospicios y regulación de Medicare', postura: 'Dividida', peso: 'Medio', contraste: '' },
    ],
    lectura: '',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit y comentarios de lectores', tipo: 'Complemento', intentos: '1) Reddit (403 en la nube); 2) comentarios de Seeking Alpha (requieren registro); 3) Motley Fool (sin debate reciente de CHE)', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas;', comps.length, 'comparables');
console.log(JSON.stringify(comps.map((c) => [c.ticker, c.per_ntm, c.crecimiento_pct, c.ev_ebitda_ltm])));

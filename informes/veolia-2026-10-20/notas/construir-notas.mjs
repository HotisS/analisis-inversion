// Construye las notas A-E de Veolia (corte 2026-10-20) a partir de los documentos leídos en notas/docs.
// Solo hechos con su fuente; los juicios van en propio.mjs. Uso: node notas/construir-notas.mjs (desde la carpeta del informe o el repo).
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = dirname(fileURLToPath(import.meta.url));
const w = (n, o) => writeFileSync(join(DIR, n), JSON.stringify(o, null, 1));
const VEO = 'https://www.veolia.com/sites/g/files/dvc4206/files/document';

// ───────────────────────────── A · Cuentas ─────────────────────────────
const A = {
  _estado: 'completo',
  fuentes: [
    { id: 1, titulo: 'Comptes consolidés au 31 décembre 2025 (états financiers y notas)', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2026-02-26', url: `${VEO}/2026/02/Finance_Veolia_Annexes_comptes_consolides_31-12-25.pdf` },
    { id: 2, titulo: 'Commentaires sur les résultats au 31 décembre 2025', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2026-02-26', url: `${VEO}/2026/02/Finance_Veolia_Commentaires_sur_les_resultats_2025.pdf` },
    { id: 3, titulo: 'Document d’enregistrement universel 2025 (D.26-0118)', editor: 'Veolia Environnement / AMF', tipo: 'Primaria', fecha: '2026-03-19', url: `${VEO}/2026/03/Veolia_Finance_DEU_2025_fr.pdf` },
    { id: 4, titulo: 'Communiqué: résultats du premier semestre 2026', editor: 'Veolia Environnement (también en la AMF)', tipo: 'Primaria', fecha: '2026-07-30', url: `${VEO}/2026/07/veolia-resultats-du-premier-semestre-2026.pdf` },
    { id: 5, titulo: 'Amendement du DEU 2025 incluant le rapport financier semestriel au 30 juin 2026', editor: 'Veolia Environnement / AMF', tipo: 'Primaria', fecha: '2026-07-30', url: `${VEO}/2026/07/Veolia_Finance_amendement_DEU_2025.pdf` },
    { id: 6, titulo: 'Informes ESEF 2021-2024 de Veolia Environnement (LEI 969500LENY69X51OOT31)', editor: 'filings.xbrl.org (repositorio ESEF)', tipo: 'Primaria', fecha: '2025-03', url: 'https://filings.xbrl.org/api/filings?filter[entity.identifier]=969500LENY69X51OOT31' },
    { id: 7, titulo: 'Résultats semestriels 2026 – présentation', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2026-07-30', url: `${VEO}/2026/07/Veolia_Finance_presentation_H1_2026_results.pdf` },
    { id: 8, titulo: 'Commentaires sur les résultats – comptes au 31 mars 2026', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2026-05-06', url: `${VEO}/2026/05/Rapport_de_gestion_Q1_2026.pdf` },
    { id: 9, titulo: 'Acquisition de Clean Earth – présentation investisseurs', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2025-11-21', url: `${VEO}/2025/11/Veolia_Clean_Earth_Investor_Presentation.pdf` },
    { id: 10, titulo: 'Résultats annuels 2025 – présentation', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2026-02-26', url: `${VEO}/2026/03/Finance_Veolia_2025_full_year_results_presentation.pdf` },
  ],
  financieros: {
    // EBITDA = el de la empresa (tabla 2021-2025 del URD [3]); EBIT = resultado operativo antes de la cuota de puestas en equivalencia;
    // «amortizaciones» = EBITDA − EBIT (incluye gastos de renovación, la amortización del PPA de Suez, deterioros y partidas no corrientes).
    // resultado_financiero incluye la cuota de las puestas en equivalencia (se valoran en el puente). bai = el publicado.
    cuenta: [
      { periodo: '2021', ingresos: 28508, coste_ventas: 23906, gastos_generales: 2893, ebitda: 4234, amortizaciones: 2916, ebit: 1318, resultado_financiero: -416.8, bai: 901, impuestos: 346, minoritarios: 151, beneficio_neto: 404, gastos_financieros: 342.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.65, dpa: 1.0, dpa_extraordinario: 0, acciones_diluidas: null },
      { periodo: '2022', ingresos: 42885, coste_ventas: 35740, gastos_generales: 4170, ebitda: 6196, amortizaciones: 3990, ebit: 2206, resultado_financiero: -710, bai: 1496, impuestos: 420, minoritarios: 282, beneficio_neto: 716, gastos_financieros: 632.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.0, dpa: 1.12, dpa_extraordinario: 0, acciones_diluidas: null },
      { periodo: '2023', ingresos: 45351, coste_ventas: 37852, gastos_generales: 4334, ebitda: 6543, amortizaciones: 3819, ebit: 2724, resultado_financiero: -855, bai: 1869, impuestos: 511, minoritarios: 397, beneficio_neto: 937, gastos_financieros: 539, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.28, dpa: 1.25, dpa_extraordinario: 0, acciones_diluidas: null },
      { periodo: '2024', ingresos: 44692, coste_ventas: 36924, gastos_generales: 4459, ebitda: 6788, amortizaciones: 3907, ebit: 2881, resultado_financiero: -767, bai: 2114, impuestos: 566, minoritarios: 347, beneficio_neto: 1098, gastos_financieros: 590, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.4, dpa: 1.4, dpa_extraordinario: 0, acciones_diluidas: 741 },
      { periodo: '2025', ingresos: 44396, coste_ventas: 36523, gastos_generales: 4326, ebitda: 7050, amortizaciones: 3842, ebit: 3208, resultado_financiero: -884, bai: 2324, impuestos: 587, minoritarios: 402, beneficio_neto: 1217, gastos_financieros: 654, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.54, dpa: 1.5, dpa_extraordinario: 0, acciones_diluidas: 732 },
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 44541, ebitda: 7235, ebit: null, beneficio_neto: 1242, bpa: null, dpa: 1.5, dpa_extraordinario: 0, fcf: 1341, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Suez consolidada desde el 18-ene-2022 (ingresos +50 %): 2021 no es comparable con 2022-2025 [3].' },
    ],
    comentario: null, ajustes: null,
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: 22048, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3367, margen_ebitda_pct: 15.3, bpa: null, vs_consenso: null },
      { periodo: '2S25', ingresos: 22348, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3683, margen_ebitda_pct: 16.5, bpa: null, vs_consenso: null },
      { periodo: '1S26', ingresos: 22193, crecimiento_pct: 0.7, crecimiento_organico_pct: 0.8, ebitda: 3552, margen_ebitda_pct: 16.0, bpa: null, vs_consenso: 'En línea' },
    ],
    ultima_presentacion: null,
    confianza: 'Media',
  },
  balance: {
    // deuda_financiera sin arrendamientos (2021-2022: pasivos financieros menos arrendamientos NIIF 16, que entonces iban dentro); clientes y proveedores = créances y dettes d'exploitation (incluyen otras partidas operativas).
    historico: [
      { periodo: '2021', activo_total: 53077, activo_corriente: 23444, pasivo_corriente: 23817, pasivo_total: 40307, fondo_comercio: 6201, intangibles: 5035, inmovilizado_material: 8702, existencias: 816, clientes: 10015, proveedores: 13549, activos_contrato: null, pasivos_contrato: null, caja: 10519, deuda_financiera: 17378, arrendamientos: 1709, patrimonio_neto: 11518, minoritarios: 1252, reservas: -3751 },
      { periodo: '2022', activo_total: 73304, activo_corriente: 28714, pasivo_corriente: 29204, pasivo_total: 58437, fondo_comercio: 11638, intangibles: 8434, inmovilizado_material: 16569, existencias: 1486, clientes: 14534, proveedores: 19475, activos_contrato: null, pasivos_contrato: null, caja: 9012, deuda_financiera: 24060, arrendamientos: 2153, patrimonio_neto: 12255, minoritarios: 2612, reservas: -4285 },
      { periodo: '2023', activo_total: 72566, activo_corriente: 27897, pasivo_corriente: 30014, pasivo_total: 57864, fondo_comercio: 11556, intangibles: 8500, inmovilizado_material: 17134, existencias: 1550, clientes: 14363, proveedores: 19808, activos_contrato: null, pasivos_contrato: null, caja: 8696, deuda_financiera: 25972, arrendamientos: 2000, patrimonio_neto: 12311, minoritarios: 2391, reservas: -4577 },
      { periodo: '2024', activo_total: 72959, activo_corriente: 27809, pasivo_corriente: 30670, pasivo_total: 57653, fondo_comercio: 11783, intangibles: 8085, inmovilizado_material: 17933, existencias: 1497, clientes: 14038, proveedores: 19540, activos_contrato: null, pasivos_contrato: null, caja: 9601, deuda_financiera: 27100, arrendamientos: 1985, patrimonio_neto: 12915, minoritarios: 2391, reservas: -4027 },
      { periodo: '2025', activo_total: 70671, activo_corriente: 25864, pasivo_corriente: 30039, pasivo_total: 57407, fondo_comercio: 11456, intangibles: 7946, inmovilizado_material: 18404, existencias: 1465, clientes: 13739, proveedores: 19216, activos_contrato: null, pasivos_contrato: null, caja: 8021, deuda_financiera: 27319, arrendamientos: 1983, patrimonio_neto: 10855, minoritarios: 2409, reservas: -6580 },
    ],
    vencimientos: [
      { anio: '2026', importe: 9792 },
      { anio: '2027-2028', importe: 4536 },
      { anio: '2029-2030', importe: 3128 },
      { anio: '2031+', importe: 9863 },
    ],
    liquidez: 'Al 30-jun-2026: liquidez total 15.205 M EUR (caja y activos líquidos 9.332 M, crédito sindicado no dispuesto 4.500 M y líneas bilaterales); deuda a corto y tesorería pasiva 11.374 M [A5].',
    rating: 'S&P BBB / A-2, perspectiva estable (confirmado el 27-abr-2026); Moody’s Baa1 / P-2, estable (4-may-2026) [A5]',
    coste_deuda_pct: 3.7,
    vida_media_anios: 6.2,
    otros_pasivos: null, comentario: null,
    confianza: 'Alta',
  },
  flujos: {
    // capex = inversiones industriales netas de subvenciones + nuevos activos financieros operativos (IFRIC 12); pagos_arrendamientos = principal NIIF 16 (corriente + no corriente);
    // intereses_en_financiacion = intereses financieros pagados + intereses IFRIC 12 + intereses NIIF 16 (Veolia los clasifica en financiación).
    historico: [
      { periodo: '2021', flujo_operativo: 3147, capex: 1895, pagos_arrendamientos: 579, adquisiciones: 327, desinversiones: 470, dividendos: 534, recompras: 0, emision_acciones: 2672, intereses_en_financiacion: 462 },
      { periodo: '2022', flujo_operativo: 4148, capex: 2966, pagos_arrendamientos: 683, adquisiciones: 4009, desinversiones: 9995, dividendos: 990, recompras: 5, emision_acciones: 227, intereses_en_financiacion: 769 },
      { periodo: '2023', flujo_operativo: 5005, capex: 3394, pagos_arrendamientos: 631, adquisiciones: 223, desinversiones: 658, dividendos: 1261, recompras: 0, emision_acciones: 210, intereses_en_financiacion: 681 },
      { periodo: '2024', flujo_operativo: 5038, capex: 3190, pagos_arrendamientos: 614, adquisiciones: 482, desinversiones: 949, dividendos: 1218, recompras: 8, emision_acciones: 341, intereses_en_financiacion: 737 },
      { periodo: '2025', flujo_operativo: 5153, capex: 3212, pagos_arrendamientos: 556, adquisiciones: 702, desinversiones: 59, dividendos: 1280, recompras: 402, emision_acciones: 318, intereses_en_financiacion: 764 },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG y Deloitte hasta 2025; nombramiento de nuevos auditores en 2025 para el ejercicio 2026 (commentaires 2025, §1.4) [A2]',
    anios_auditor: null,
    opinion: 'Favorable (cuentas 2025) [A3]',
    comentario: null, senales: [], confianza: 'Media',
  },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2022', objetivo: 'Suez (70 % restante tras el 29,9 % comprado a Engie en 2020)', importe: 12900, ev_ebitda: null, financiacion: 'Ampliación de capital de 2.500 M (oct-2021), híbridos y deuda; venta de la «nueva Suez» a Meridiam, GIP y CDC', resultado: 'Sinergias 534 M a fin de 2025, por encima de los 500 M prometidos (elevados a 530) [A2]; ROCE después de impuestos 9,4 % en 2025 frente a 7,6 % en 2023 [A3]' },
      { anio: '2025', objetivo: '30 % de Water Technologies and Solutions (WTS) comprado a CDPQ', importe: 1500, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Sinergias previstas ~90 M a 2027, 20 M logrados a fin de 2025; margen EBITDA de Tecnologías del Agua 13,5 % en 2025 (+120 pb) [A1, A2]' },
      { anio: '2025', objetivo: 'Flexibilidad eléctrica en Hungría', importe: 271, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada; contribuye al crecimiento de Bioenergías y flexibilidad [A1, A2]' },
      { anio: '2026', objetivo: 'Clean Earth (residuos peligrosos, EE. UU.)', importe: 2600, ev_ebitda: 15.0, financiacion: 'Deuda y caja; plan de desinversiones de más de 2.000 M hasta mediados de 2028', resultado: 'Cerrada en junio de 2026; 9,8 veces el EBITDA 2026e con sinergias de 120 M USD en el año 4; acretiva en BPA corriente desde 2027 [A4, A9]' },
      { anio: '2026', objetivo: 'Enviropacific (descontaminación de suelos y PFAS, Australia)', importe: 137, ev_ebitda: null, financiacion: 'Caja', resultado: 'Cerrada a fines de marzo de 2026; ventas ~250 M AUD (ejercicio 2025) [A4]' },
    ],
    comentario: null, confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'France et Déchets Dangereux Europe', descripcion: 'Agua y residuos en Francia y residuos peligrosos en Europa', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 9145, resultado: 1392 }, { periodo: '2025', ingresos: 8914, resultado: 1475 }] },
      { nombre: 'Europe', descripcion: 'Europa central y oriental (calefacción urbana, agua), Europa del Norte, Iberia e Italia', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 18619, resultado: 2642 }, { periodo: '2025', ingresos: 19206, resultado: 2758 }] },
      { nombre: 'Amériques, Asie Pacifique, Afrique Moyen-Orient', descripcion: 'Norteamérica, Latinoamérica, Asia, Pacífico, África y Oriente Medio', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 11945, resultado: 2025 }, { periodo: '2025', ingresos: 11316, resultado: 2009 }] },
      { nombre: 'Technologies de l’Eau', descripcion: 'Equipos, química y servicios de tratamiento de agua (antigua WTS de Suez)', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 4973, resultado: 612 }, { periodo: '2025', ingresos: 4954, resultado: 669 }] },
      { nombre: 'Otros', descripcion: 'Holding y otros', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 9, resultado: 117 }, { periodo: '2025', ingresos: 6, resultado: 139 }] },
    ],
    geografias: [
      { nombre: 'Francia', peso_pct: 19.3 }, { nombre: 'Estados Unidos', peso_pct: 10.5 }, { nombre: 'Alemania', peso_pct: 7.0 }, { nombre: 'España', peso_pct: 6.8 },
      { nombre: 'Polonia', peso_pct: 6.8 }, { nombre: 'Reino Unido', peso_pct: 6.7 }, { nombre: 'República Checa', peso_pct: 4.9 }, { nombre: 'Otros', peso_pct: 38.0 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Crecimiento orgánico del EBITDA', valor_anterior: '+6,3 % (2025)', valor_actual: '+5,0 % (1S26)', variacion: '−1,3 pp', comentario: 'Guía 2026: +5 % a +6 % [A4]' },
      { kpi: 'Margen EBITDA', valor_anterior: '15,3 % (1S25)', valor_actual: '16,0 % (1S26)', variacion: '+70 pb', comentario: 'Eficiencias de 195 M en el semestre [A4]' },
      { kpi: 'Ganancias de eficiencia brutas', valor_anterior: '399 M (2025)', valor_actual: '195 M (1S26)', variacion: 'Objetivo > 350 M anual', comentario: 'Retención del 47 % en el EBITDA en 2025 [A2]' },
      { kpi: 'Deuda financiera neta / EBITDA', valor_anterior: '2,79x (2025)', valor_actual: '≈3x fin de 2026 (guía)', variacion: 'Sube por Clean Earth', comentario: 'Deuda neta 24.548 M al 30-jun-2026 [A4]' },
      { kpi: 'ROCE después de impuestos', valor_anterior: '8,8 % (2024)', valor_actual: '9,4 % (2025)', variacion: '+0,6 pp', comentario: 'Definición de la empresa, con puestas en equivalencia [A2]' },
      { kpi: 'Inversión industrial neta', valor_anterior: '3.836 M (2024)', valor_actual: '3.855 M (2025)', variacion: '≈8,7 % de ventas', comentario: 'Incluye nuevos activos financieros operativos [A3]' },
    ],
  },
  huecos: [
    { seccion: 'trimestres', campo: 'items (1S24, 2S24 y trimestres sueltos)', tipo: 'Complemento', intentos: '1) Comunicado 1S26 y amendement: solo comparan con 1S25; 2) presentación FY2025 e informe 1T26: dan el 1T25 y el 1T26 pero no 2T-4T; 3) derivar 2S24 exige el 1S24, no descargado', decision: 'Omitido (tres semestres)' },
    { seccion: 'negocio', campo: 'segmentos 2021-2023', tipo: 'Complemento', intentos: '1) URD 2025: segmentos reexpresados solo 2024-2025; 2) XBRL 2021-2023: segmentación anterior (France, Europe hors France, Reste du monde, Activités mondiales) no comparable; 3) no hay reexpresión publicada', decision: 'Omitido (solo 2024-2025 con la segmentación vigente)' },
  ],
};

// ───────────────────────────── B · Sector ─────────────────────────────
const B = {
  _estado: 'completo',
  fuentes: [
    { id: 1, titulo: 'Ficha sectorial corta: gestión de residuos sólidos (14-oct-2026)', editor: 'Repo analisis-inversion (sectores/residuos-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/residuos-2026-10-14.md' },
    { id: 2, titulo: 'Document d’enregistrement universel 2025 (cap. 1: actividades, mercados y estrategia GreenUp)', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2026-03-19', url: `${VEO}/2026/03/Veolia_Finance_DEU_2025_fr.pdf` },
    { id: 3, titulo: 'Commentaires sur les résultats 2025 (ventas y EBITDA por actividad)', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2026-02-26', url: `${VEO}/2026/02/Finance_Veolia_Commentaires_sur_les_resultats_2025.pdf` },
    { id: 4, titulo: 'Communiqué: résultats du premier semestre 2026', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2026-07-30', url: `${VEO}/2026/07/veolia-resultats-du-premier-semestre-2026.pdf` },
    { id: 5, titulo: 'Acquisition de Clean Earth – présentation (mercado de residuos peligrosos en EE. UU.)', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2025-11-21', url: `${VEO}/2025/11/Veolia_Clean_Earth_Investor_Presentation.pdf` },
    { id: 6, titulo: 'Datos financieros de Hera, Acea, Iren, A2A, Séché, Severn Trent, United Utilities, American Water, Republic Services y Clean Harbors (20-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/' },
    { id: 7, titulo: 'Surtaxe sur les grands groupes réduite de 30 % dans le budget 2027 (BFM Bourse)', editor: 'Tradingsat / BFM Bourse', tipo: 'Prensa', fecha: '2026-10-01', url: 'https://www.tradingsat.com/actualites/marches-financiers/ils-reclamaient-sa-suppression-la-surtaxe-sur-les-grands-groupes-dont-ceux-du-cac-40-sera-reduite-de-30-dans-le-budget-2027-1170981.html' },
  ],
  sector: {
    definicion: null, tamano: null, unidad_serie: null, serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [], porter: [], ciclo: { posicion: 'Madurez del ciclo', comentario: null },
    regulacion: null, tendencias: null, confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: '1.º mundial en servicios medioambientales (agua, residuos y energía local); 1.º mundial en residuos peligrosos y 2.º en EE. UU. tras Clean Earth; 1.º en Francia en agua delegada [B2, B5]',
    competidores: [
      { nombre: 'Suez (nueva Suez, no cotizada)', pais: 'Francia', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival directo en agua municipal en Francia y en concursos internacionales; propiedad de Meridiam, GIP y CDC desde 2022 [B2]' },
      { nombre: 'Hera', pais: 'Italia', ticker: 'HER.MI', ingresos: 12673, cuota_pct: null, margen_ebit_pct: null, comentario: 'Multiservicio (agua, residuos, energía) regional; margen EBITDA 11,2 % (LTM) [B6]' },
      { nombre: 'Séché Environnement', pais: 'Francia', ticker: 'SCHP.PA', ingresos: 1293, cuota_pct: null, margen_ebit_pct: null, comentario: 'Residuos peligrosos en Francia; competidor directo en Déchets Dangereux Europe; margen EBITDA 14,0 % [B6]' },
      { nombre: 'Clean Harbors', pais: 'EE. UU.', ticker: 'CLH', ingresos: 5562, cuota_pct: null, margen_ebit_pct: null, comentario: 'N.º 1 en residuos peligrosos en EE. UU.; margen EBITDA 19,2 % [B6]' },
      { nombre: 'Republic Services', pais: 'EE. UU.', ticker: 'RSG', ingresos: 15048, cuota_pct: null, margen_ebit_pct: null, comentario: 'Residuos sólidos con vertederos propios en EE. UU.; margen EBITDA 31,1 % [B6]' },
      { nombre: 'A2A', pais: 'Italia', ticker: 'A2A.MI', ingresos: 15534, cuota_pct: null, margen_ebit_pct: null, comentario: 'Multiservicio lombardo (energía, residuos, agua) [B6]' },
    ],
    foso: { veredicto: 'Estrecho', tendencia: 'Estable', fuentes: [] },
    amenazas: null, confianza: 'Media',
  },
  historia: {
    resumen: null,
    hitos: [
      { anio: '1853', hito: 'Fundación de la Compagnie Générale des Eaux por decreto imperial [B2]' },
      { anio: '1998', hito: 'Vivendi: la antigua CGE se convierte en conglomerado de medios; las actividades de medio ambiente forman Vivendi Environnement [B2]' },
      { anio: '2000', hito: 'Salida a bolsa de Vivendi Environnement, renombrada Veolia Environnement en 2003 [B2]' },
      { anio: '2011', hito: 'Antoine Frérot, consejero delegado (2009) y presidente-director general: plan de desinversiones y salida de Transdev [B2]' },
      { anio: '2020', hito: 'Compra del 29,9 % de Suez a Engie (3.400 M) y lanzamiento de la oferta sobre el resto [B2]' },
      { anio: '2022', hito: 'Consolidación de Suez (18-ene-2022); Estelle Brachlianoff, directora general desde el 1-jul-2022 [B2]' },
      { anio: '2024', hito: 'Plan GreenUp 2024-2027: crecimiento en «boosters» (tecnologías del agua, residuos peligrosos, bioenergía) [B2]' },
      { anio: '2025', hito: 'Compra del 30 % de WTS a CDPQ (1.500 M) y acuerdo para comprar Clean Earth [B3, B5]' },
      { anio: '2026', hito: 'Cierre de Clean Earth (junio): n.º 2 en residuos peligrosos en EE. UU.; plan de desinversiones de más de 2.000 M hasta 2028 [B4]' },
    ],
    confianza: 'Alta',
  },
  esg: {
    calificaciones: [
      { agencia: 'CDP Climate change', calificacion: 'A (Leadership)', fecha: '2025-12' },
      { agencia: 'CDP Water security', calificacion: 'A (Leadership)', fecha: '2025-12' },
      { agencia: 'S&P Global CSA', calificacion: '80/100, 5.º de Multi and Water Utilities', fecha: '2025-12' },
      { agencia: 'ISS ESG', calificacion: 'Prime, B (primer decil)', fecha: '2025-09' },
      { agencia: 'EcoVadis', calificacion: '82/100 (percentil 98)', fecha: '2025' },
    ],
    materialidad: null, controversias: null, confianza: 'Media',
  },
  huecos: [
    { seccion: 'sector', campo: 'tamano, serie, tcac y cr5', tipo: 'Núcleo', intentos: '1) URD 2025 de Veolia: no da el tamaño de su mercado total; 2) informes de mercado gratuitos de residuos (TechSci 330.000 M USD 2024, MarketsandMarkets 1,22 billones USD 2024): definiciones incompatibles, solo resúmenes; 3) suma de cotizadas (Veolia, Suez, Hera, Republic…) no llega al mercado total', decision: 'Omitido (tamaño en texto, sin serie)' },
  ],
};

// ───────────────────────────── C · Equipo y gobierno ─────────────────────────────
const C = {
  _estado: 'completo',
  fuentes: [
    { id: 1, titulo: 'Document d’enregistrement universel 2025, cap. 3 (gobierno corporativo, remuneración) y cap. 7 (accionariado)', editor: 'Veolia Environnement / AMF', tipo: 'Primaria', fecha: '2026-03-19', url: `${VEO}/2026/03/Veolia_Finance_DEU_2025_fr.pdf` },
    { id: 2, titulo: 'Amendement du DEU 2025 (junta del 23-abr-2026, operaciones de los miembros del comité ejecutivo ene-jul 2026)', editor: 'Veolia Environnement / AMF', tipo: 'Primaria', fecha: '2026-07-30', url: `${VEO}/2026/07/Veolia_Finance_amendement_DEU_2025.pdf` },
    { id: 3, titulo: 'Commentaires sur les résultats 2025 (guía y objetivos cumplidos)', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2026-02-26', url: `${VEO}/2026/02/Finance_Veolia_Commentaires_sur_les_resultats_2025.pdf` },
    { id: 4, titulo: 'Communiqué: résultats du premier semestre 2026 (guía 2026 mejorada)', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2026-07-30', url: `${VEO}/2026/07/veolia-resultats-du-premier-semestre-2026.pdf` },
  ],
  directivos: {
    equipo: [
      { nombre: 'Estelle Brachlianoff', cargo: 'Directora general', desde: '2022', participacion_pct: 0.01, trayectoria: 'Directora general adjunta de operaciones antes de 2022 y en el grupo desde 2005 (Reino Unido, Île-de-France). Con ella el margen EBITDA pasó del 14,4 % (2023) al 15,9 % (2025) y las sinergias de Suez llegaron a 534 M frente a 500 M prometidos [C1, C3].' },
      { nombre: 'Antoine Frérot', cargo: 'Presidente del consejo (no ejecutivo)', desde: '2010', participacion_pct: 0.03, trayectoria: 'Consejero delegado desde 2009 y presidente-director general hasta junio de 2022; diseñó la compra de Suez. Renovado como consejero y presidente en la junta del 23-abr-2026 [C1, C2].' },
      { nombre: 'Emmanuelle Menning', cargo: 'Directora general adjunta de Finanzas y Compras', desde: '2023', participacion_pct: null, trayectoria: 'Directora financiera; con ella el apalancamiento cerró 2025 en 2,79x y el ROCE en 9,4 % [C3].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'EBITDA orgánico +5 % a +7 %; RNC creciente; DN/EBITDA < 3x', real: 'EBITDA 6.543 M (+5,6 %); RNC 1.335 M (+14,9 %)', cumplida: 'Sí' },
      { anio: '2024', guia: 'EBITDA orgánico +5 % a +6 %; RNC ≈ +8 % a cambio constante', real: 'EBITDA 6.788 M; RNC 1.530 M (+14,6 %)', cumplida: 'Sí' },
      { anio: '2025', guia: 'EBITDA orgánico +5 % a +6 %; RNC +8 % a cambio constante; DN/EBITDA ≤ 3x', real: 'EBITDA +6,3 % orgánico; RNC +9,1 % a cambio constante; 2,79x', cumplida: 'Sí' },
      { anio: '2026', guia: 'EBITDA orgánico +5 % a +6 %; RNC ≥ +8 % a cambio constante (con Clean Earth); DN/EBITDA ≈ 3x', real: '1S26: EBITDA +5,0 %, RNC +10,4 % (guía del RNC elevada el 30-jul)', cumplida: 'Parcial' },
    ],
    comentario: null, confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Antoine Frérot', cargo: 'Presidente', tipo: 'Otro externo', desde: '2010', comisiones: 'Raison d’être (presidente), Investigación e innovación' },
      { nombre: 'Estelle Brachlianoff', cargo: 'Consejera y directora general', tipo: 'Ejecutivo', desde: '2022', comisiones: '—' },
      { nombre: 'Pierre-André de Chalendar', cargo: 'Consejero coordinador (référent)', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos (presidente), Remuneraciones, Raison d’être' },
      { nombre: 'Olivier Andriès', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneraciones (presidente), Auditoría, I+D' },
      { nombre: 'Maryse Aulagnon', cargo: 'Consejera', tipo: 'Otro externo', desde: '2012', comisiones: 'Nombramientos, Remuneraciones, I+D' },
      { nombre: 'Véronique Bédague', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría' },
      { nombre: 'Philippe Brassac', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Nombramientos, I+D' },
      { nombre: 'Arnaud Caudoux', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría, I+D' },
      { nombre: 'Isabelle Courville', cargo: 'Consejera', tipo: 'Independiente', desde: '2016', comisiones: 'Nombramientos, Remuneraciones, I+D' },
      { nombre: 'Julia Marton-Lefèvre', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'I+D' },
      { nombre: 'Elena Salgado', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Remuneraciones, I+D' },
      { nombre: 'Guillaume Texier', cargo: 'Consejero', tipo: 'Independiente', desde: '2016', comisiones: 'Auditoría, I+D, Raison d’être' },
      { nombre: 'Franck Le Roux', cargo: 'Consejero (representa a los empleados)', tipo: 'Otro externo', desde: '2018', comisiones: 'Auditoría, Remuneraciones, I+D' },
      { nombre: 'Pavel Páša', cargo: 'Consejero (representa a los empleados)', tipo: 'Otro externo', desde: '2014', comisiones: 'I+D' },
      { nombre: 'Agata Mazurek-Bąk', cargo: 'Consejera (empleados accionistas; sustituida en la junta de 2026)', tipo: 'Otro externo', desde: '2022', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 3.48, fijo: 1.03, variable_corto: 1.41, variable_largo: 1.04, ratio_salario_medio: 62 },
    remuneracion: null,
    accionistas: [
      { nombre: 'Empleados (directa e indirectamente)', pct: 9.35, tipo: 'Empleados', variacion: 'Primer accionista; ampliaciones anuales reservadas' },
      { nombre: 'BlackRock', pct: 5.48, tipo: 'Gestora', variacion: '6,03 % a fin de 2024' },
      { nombre: 'Caisse des Dépôts (vía CNP Assurances y LBP Prévoyance)', pct: 5.11, tipo: 'Inversor público francés', variacion: 'Superó el 5 % el 17-mar-2025' },
      { nombre: 'CriteriaCaixa', pct: 5.1, tipo: 'Inversor estable', variacion: 'Entrada anunciada el 4-mar-2025' },
      { nombre: 'Autocartera', pct: 1.41, tipo: 'Autocartera', variacion: '10,4 millones de acciones a fin de 2025' },
    ],
    insiders: [
      { fecha: '2026-03-02', persona: 'Gavin Graveson (comité ejecutivo)', operacion: 'Venta', acciones: 10000, importe: 0.35 },
      { fecha: '2026-05-07', persona: 'Gavin Graveson (comité ejecutivo)', operacion: 'Venta', acciones: 2959, importe: 0.11 },
      { fecha: '2026-05-07', persona: 'Richard Kirkman (comité ejecutivo)', operacion: 'Venta', acciones: 62, importe: 0.0 },
    ],
    control_y_defensas: null,
    alertas: ['Ninguna relevante detectada tras revisar el URD 2025, el amendement de julio de 2026 y los comunicados de 2026; el voto de la junta sobre remuneración no se ha localizado con cifras.'],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct y voto_remuneracion_contra_pct', tipo: 'Complemento', intentos: '1) Amendement del URD (junta del 23-abr-2026): solo dice que se aprobaron todas las resoluciones; 2) URD 2025: no reproduce el resultado de la junta de 2025; 3) búsqueda del acta de votación en la web de la empresa: no localizada en el tiempo del análisis', decision: 'Omitido' },
  ],
};

// ───────────────────────────── D · Mercado y valoración ─────────────────────────────
const comps = JSON.parse(readFileSync(join(DIR, 'docs', 'comparables-calc.json'), 'utf8'));
const bolsa = JSON.parse(readFileSync(join(DIR, 'bolsa.json'), 'utf8'));
const mov = JSON.parse(readFileSync(join(DIR, 'movimiento.json'), 'utf8'))['VIE.PA'];
const D = {
  _estado: 'completo',
  fuentes: [
    { id: 1, titulo: 'Históricos diarios de VIE.PA, EXSA.DE (STOXX Europe 600) y EXH9.DE (STOXX Europe 600 Utilities): rentabilidades, betas, volatilidad y cierres de ejercicio hasta el 16-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/VIE.PA/history' },
    { id: 2, titulo: 'Veolia Environnement (FR0000124141-XPAR): histórico oficial de cotizaciones, cierre del 19-oct-2026', editor: 'Euronext (live.euronext.com)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://live.euronext.com/en/product/equities/FR0000124141-XPAR' },
    { id: 3, titulo: 'Veolia: estimaciones 2026-2028 (ventas, EBITDA, EBIT, beneficio, BPA publicado, dividendo, deuda neta, FCF) y objetivo medio', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://www.marketscreener.com/quote/stock/VEOLIA-ENVIRONNEMENT-4726/finances/' },
    { id: 4, titulo: 'Veolia (VIE.PA): consenso de BPA 2026-2027 (earningsTrend), recomendaciones y objetivos (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/VIE.PA/analysis' },
    { id: 5, titulo: 'Rendimiento de la deuda federal alemana a 10 años (BBSIS, curva de tipos), 19-oct-2026: 3,49 %', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
    { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 7, titulo: 'Spread OAT-Bund: historial diario (OAT 10 años 4,85 % y Bund 3,43 % el 19-oct-2026)', editor: 'Idéal Investisseur', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://www.ideal-investisseur.fr/marches/macro/spread-oat-bund.html' },
    { id: 8, titulo: 'Tipos de interés a largo plazo (convergencia), Francia y Alemania, mensual hasta sep-2026', editor: 'Banco Central Europeo (IRS)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://data.ecb.europa.eu/data/datasets/IRS' },
    { id: 9, titulo: 'Datos de mercado de los comparables (precio, capitalización, valor empresa, EBITDA, ventas, deuda, consenso de BPA y ventas), 20-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/' },
    { id: 10, titulo: 'Tipos de cambio de referencia del euro, 19-oct-2026 (USD 1,1225; GBP 0,84205)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
    { id: 11, titulo: 'Acquisition de Clean Earth – présentation (EV 3.000 M USD; ventas 1.030 M USD y EBITDA 200 M USD 2026e; 9,8x con sinergias)', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2025-11-21', url: `${VEO}/2025/11/Veolia_Clean_Earth_Investor_Presentation.pdf` },
    { id: 12, titulo: 'Comptes consolidés 2025, nota 3.2 (compra del 30 % de WTS por 1.750 M USD / 1.500 M EUR)', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2026-02-26', url: `${VEO}/2026/02/Finance_Veolia_Annexes_comptes_consolides_31-12-25.pdf` },
    { id: 13, titulo: 'Communiqué 1S26 (Enviropacific: 228 M AUD, ventas ~250 M AUD)', editor: 'Veolia Environnement', tipo: 'Primaria', fecha: '2026-07-30', url: `${VEO}/2026/07/veolia-resultats-du-premier-semestre-2026.pdf` },
    { id: 14, titulo: 'Veolia se replie, Morgan Stanley juge le potentiel d’appréciation limité (28-jul-2026)', editor: 'Tradingsat / BFM Bourse', tipo: 'Prensa', fecha: '2026-07-28', url: 'https://www.tradingsat.com/veolia-environ-FR0000124141/actualites/veolia-environ-veolia-se-replie-morgan-stanley-juge-le-potentiel-d-appreciation-limite-1167607.html' },
    { id: 15, titulo: 'Veolia se distingue sur le CAC 40, RBC voit encore du potentiel (19-ago-2026)', editor: 'Option Finance / Zonebourse', tipo: 'Prensa', fecha: '2026-08-19', url: 'https://www.optionfinance.fr/info-financiere-en-continu/d/2026-08-19-veolia-se-distingue-sur-le-cac-40-rbc-voit-encore-du-potentiel.html' },
    { id: 16, titulo: 'Veolia: après 20 % de baisse, le bout du tunnel est-il proche ? (7-oct-2026)', editor: 'ABC Bourse', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://www.abcbourse.com/analyses/veolia_apres_20_de_baisse_le_bout_du_tunnel_est_il_proche_-7144' },
    { id: 17, titulo: 'Movimiento del precio de VIE.PA, ENGI.PA, DG.PA, SCHP.PA, HER.MI, ACE.MI, ^FCHI, EXSA.DE y EXH9.DE (herramientas/movimiento.mjs, 20-oct-2026)', editor: 'Yahoo Finance (cálculo del repo)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/VIE.PA/' },
    { id: 18, titulo: 'Budget 2027: surtaxe sur les grands groupes réduite de 30 % (1-oct-2026)', editor: 'Tradingsat / BFM Bourse', tipo: 'Prensa', fecha: '2026-10-01', url: 'https://www.tradingsat.com/actualites/marches-financiers/ils-reclamaient-sa-suppression-la-surtaxe-sur-les-grands-groupes-dont-ceux-du-cac-40-sera-reduite-de-30-dans-le-budget-2027-1170981.html' },
  ],
  identificacion: {
    nombre: 'Veolia Environnement SA', nombre_corto: 'Veolia', ticker: 'VIE', isin: 'FR0000124141', mercado: 'Euronext París', indice_referencia: 'CAC 40 / STOXX Europe 600',
    pais: 'Francia', pais_iso: 'FR', sector: 'Utilities', industria: 'Multi-Utilities', sede: 'Aubervilliers (Francia)', fundacion: '1853', empleados: 215000, web: 'https://www.veolia.com',
    precio: 31.93, fecha_precio: '2026-10-19', acciones: 732.0, capitalizacion_publicada: 23664, free_float_pct: 89.2,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s,
    volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses)`,
    proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: 46261, ebitda: 7481, ebit: 4064, bpa: 2.41, dpa: 1.64, fuente: 'MarketScreener (ventas, EBITDA, EBIT corriente, DPA) [D3]; BPA corriente de Yahoo, 16 analistas [D4]' },
      { periodo: '2027e', ingresos: 48347, ebitda: 7954, ebit: 4404, bpa: 2.64, dpa: 1.8, fuente: 'MarketScreener [D3]; BPA corriente de Yahoo, 17 analistas [D4]' },
      { periodo: '2028e', ingresos: 50038, ebitda: 8295, ebit: 4676, bpa: null, dpa: 1.96, fuente: 'MarketScreener [D3]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: 13, mantener: 5, vender: 0, po_medio: 38.56, po_min: 33.0, po_max: 45.3 },
    revisiones: null,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bolsa.bolsa.tipo_rentabilidad,
    rentabilidades: bolsa.bolsa.rentabilidades,
    anual: bolsa.bolsa.anual,
    beta: bolsa.betas.mensual_5a, volatilidad_pct: bolsa.bolsa.volatilidad_pct, max_drawdown_pct: bolsa.bolsa.max_drawdown_pct, posicion_corta_pct: null,
    comentario: null,
    contexto: {
      movimiento: { fecha: mov.fecha, var_1m_pct: mov.var_1m_pct, var_3m_pct: mov.var_3m_pct, var_6m_pct: mov.var_6m_pct, var_12m_pct: mov.var_12m_pct, dist_max_52s_pct: mov.dist_max_52s_pct, dist_min_52s_pct: mov.dist_min_52s_pct, dist_max_historico_pct: mov.dist_max_historico_pct, tendencia: mov.tendencia, volatilidad_60d_pct: mov.volatilidad_60d_pct, avisos: mov.avisos },
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((c) => +c.anio >= 2021).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null, confianza: 'Media',
  },
  comparables: { criterio: null, empresas: comps, comentario: null, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2026-06', objetivo: 'Clean Earth (residuos peligrosos, EE. UU.)', comprador: 'Veolia', ev: 2600, ev_ventas: 2.91, ev_ebitda: 15.0, prima_pct: null, excluir: false, comentario: 'EV 3.000 M USD sobre ventas de 1.030 M y EBITDA de 200 M USD 2026e; 9,8x con 120 M USD de sinergias en el año 4 [D11]' },
      { fecha: '2025-05', objetivo: '30 % de Water Technologies and Solutions (valor del 100 %)', comprador: 'Veolia (a CDPQ)', ev: 5000, ev_ventas: 1.01, ev_ebitda: 8.2, prima_pct: null, excluir: false, comentario: 'Estimación propia: 1.500 M EUR por el 30 % → 5.000 M el 100 %, sobre ventas de 4.973 M y EBITDA de 612 M de 2024 del segmento (sin deuda neta relevante) [D12]' },
      { fecha: '2026-03', objetivo: 'Enviropacific (suelos y PFAS, Australia)', comprador: 'Veolia', ev: 137, ev_ventas: 0.91, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '228 M AUD sobre ventas de ~250 M AUD (ejercicio 2025); EBITDA no publicado [D13]' },
    ],
    comentario: null, confianza: 'Media',
  },
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Registro de posiciones cortas netas de la AMF: no consultado con éxito (requiere navegador); 2) ESMA: solo umbrales por encima del 0,5 %; 3) Yahoo no da cortos para París', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'BPA corriente 2028e', tipo: 'Complemento', intentos: '1) Yahoo earningsTrend: solo 2026-2027; 2) MarketScreener: BPA publicado, no corriente (2,47 en 2028e); 3) Investing: no abre sin JavaScript', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'operaciones de terceros (Renewi, Biffa, nueva Suez)', tipo: 'Complemento', intentos: '1) Comunicados de los compradores: múltiplos no localizados en primaria; 2) prensa: solo valores de capital; 3) informes de los vendedores no descargados', decision: 'Omitido (tres operaciones propias de Veolia)' },
  ],
};

// ───────────────────────────── E · Sentimiento ─────────────────────────────
const E = {
  _estado: 'completo',
  fuentes: [
    { id: 1, titulo: 'Forum Veolia Environnement (VIE): hilos de jul-oct 2026', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://www.boursorama.com/bourse/forum/1rPVIE/' },
    { id: 2, titulo: 'Stream $VEOEY (ADR de Veolia)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-09-22', url: 'https://api.stocktwits.com/api/2/streams/symbol/VEOEY.json' },
    { id: 3, titulo: 'Veolia: après 20 % de baisse, le bout du tunnel est-il proche ? (análisis con comentarios)', editor: 'ABC Bourse', tipo: 'Foros y redes', fecha: '2026-10-07', url: 'https://www.abcbourse.com/analyses/veolia_apres_20_de_baisse_le_bout_du_tunnel_est_il_proche_-7144' },
  ],
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Boursorama (foro de VIE)', fecha: '2026-10', n_comentarios: 40, tono: 'Dividido', resumen: 'Títulos de hilos de jul-oct: «Hausse des taux», «Veolia a perdu 7 € en 3 mois», «Quand il y a de belles annonces le titre baisse», frente a «Un bon titre pour traverser les turbulences» y «J’ai profité de la baisse pour reprendre quelques billes» [E1].' },
      { plataforma: 'Stocktwits ($VEOEY)', fecha: '2026-09', n_comentarios: 15, tono: 'Neutro', resumen: 'Poco debate en EE. UU.: mensajes sueltos de valor defensivo con dividendo y sorpresa por la caída de septiembre [E2].' },
      { plataforma: 'ABC Bourse (análisis técnico)', fecha: '2026-10', n_comentarios: 5, tono: 'Dividido', resumen: 'Lee la caída como corrección técnica pese a buenos resultados; soporte de largo plazo en 30 € y canal bajista aún sin romper [E3].' },
    ],
    temas: [], lectura: null, confianza: 'Baja',
  },
  huecos: [],
};

w('A.json', A); w('B.json', B); w('C.json', C); w('D.json', D); w('E.json', E);
console.log('Notas A-E escritas');

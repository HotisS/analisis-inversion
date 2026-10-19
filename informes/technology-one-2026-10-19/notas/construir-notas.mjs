// Escribe las notas A-E de Technology One Limited (ASX: TNE; corte 2026-10-19, cierre del 19-oct en la ASX).
// Fuentes primarias: informes anuales FY25 y FY24, informes preliminares FY23, FY22 y FY21, cuentas semestrales H1 FY26 y
// H1 FY25 (Appendix 4D, revisadas por EY), notas y presentaciones de resultados, anuncios a la ASX (guía de feb-26, junta,
// liderazgo, fideicomiso de empleados, accionistas significativos, Appendix 3Y), todo descargado del servidor de anuncios
// de la ASX en notas/docs. Australia no tiene XBRL público: cifras copiadas de los estados auditados.
// Ejercicio cerrado a 30 de septiembre: "FY2025" = oct-2024 a sep-2025 (etiqueta "fin"). Millones de AUD.
// Criterio de la cuenta: ingresos = "revenue from contracts with customers"; EBITDA = beneficio antes de impuestos
// − otros ingresos (intereses, divisas y otros) + gastos financieros + amortizaciones; resultado financiero = otros
// ingresos − gastos financieros. Las amortizaciones incluyen las del desarrollo activado, las comisiones activadas y
// los derechos de uso; el capex incluye lo activado (desarrollo y comisiones), como en el estado de flujos.
// Ejecutar: node informes/technology-one-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const yq = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8'));
const ASX = 'https://announcements.asx.com.au/asxpdf';
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const r3 = (x) => Math.round(x * 1000) / 1000;

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025: estados consolidados de FY25 y FY24, notas 4 (segmentos), 5 (ingresos), 6 (gastos y amortizaciones), 7 (impuestos), 13-14 (inmovilizado e intangibles), 21 (capital), 23 (dividendos), 24 (CourseLoop), 30-31 (flujos y BPA), informe de remuneraciones e información de accionistas', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2025-11-18', url: `${ASX}/20251118/pdf/06s446mgnpp1m0.pdf` },
  { id: 2, titulo: 'Annual Report 2024: estados consolidados de FY24 y FY23, notas 5 y 6', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2024-11-19', url: `${ASX}/20241119/pdf/06bjxy9wdn90x0.pdf` },
  { id: 3, titulo: 'Preliminary Final Report FY23 (Appendix 4E y estados consolidados de FY23 y FY22)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2023-11-21', url: `${ASX}/20231121/pdf/05xkw59688vh13.pdf` },
  { id: 4, titulo: 'Preliminary Final Report FY22 (estados consolidados de FY22 y FY21, notas 5, 6 y 13; compra de Scientia)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2022-11-22', url: `${ASX}/20221122/pdf/45hvxxd3rs9xpl.pdf` },
  { id: 5, titulo: 'Preliminary Final Report FY21 (estados de FY21 y FY20)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2021-11-23', url: `${ASX}/20211123/pdf/4538pklh5tb9rk.pdf` },
  { id: 6, titulo: 'Appendix 4D y Financial Report del semestre cerrado el 31-mar-2026 (revisión limitada de EY)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2026-05-19', url: `${ASX}/20260519/pdf/06zqk9tj6tpz8f.pdf` },
  { id: 7, titulo: 'Appendix 4D y Financial Report del semestre cerrado el 31-mar-2025', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2025-05-20', url: `${ASX}/20250520/pdf/06jwynspzzz0vy.pdf` },
  { id: 8, titulo: 'SaaS+ Momentum Drives Record ARR and Profit – Reaffirming Upgraded FY26 Guidance (nota de resultados H1 FY26)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2026-05-19', url: `${ASX}/20260519/pdf/06zqknrl05vfs7.pdf` },
  { id: 9, titulo: 'SaaS+ & UK momentum drive record ARR & profit - beating guidance (nota de resultados FY25)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2025-11-18', url: `${ASX}/20251118/pdf/06s444hmjk0xmd.pdf` },
  { id: 10, titulo: 'TNE H1 FY26 Half Year Results Presentation (ARR por vertical, Reino Unido, NRR, bajas, I+D, dividendo)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2026-05-19', url: `${ASX}/20260519/pdf/06zqksz2h9yrg9.pdf` },
  { id: 11, titulo: 'TNE FY25 Full Year Results Presentation', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2025-11-18', url: `${ASX}/20251118/pdf/06s451b1tvt3jf.pdf` },
  { id: 12, titulo: 'Guidance Upgraded – AI driving TechnologyOne’s confidence in the future (guía FY26 en la junta)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2026-02-18', url: `${ASX}/20260218/pdf/06wfkfl8f34qtr.pdf` },
  { id: 13, titulo: 'Completion of On-Market Purchase of Shares by ESP Trust (tramos 1 y 2: 2,8 M de acciones a 30,13 y 31,94 AUD)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2026-08-27', url: `${ASX}/20260827/pdf/073b583jbw5d8w.pdf` },
  { id: 14, titulo: 'Analyst Presentation – TNE Unleashes AI Revolution (precios de Plus y de la IA en producto)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2025-10-09', url: `${ASX}/20251009/pdf/06qb45cz53jm4y.pdf` },
];

// Cuenta: cifras en miles de AUD de los estados → millones.
const C = {
  FY2021: { ing: 311295, otros: 717, fin: 1493, da: 25832, pbt: 97843, tax: 25152, ni: 72691, bpa: 22.52, var: 41378, gg: 145466, dpa: 13.91, extra: 0 },
  FY2022: { ing: 368234, otros: 1157, fin: 1844, da: 38110, pbt: 112320, tax: 23477, ni: 88843, bpa: 27.38, var: 47051, gg: 170066, dpa: 17.02, extra: 2.0 },
  FY2023: { ing: 429378, otros: 11985, fin: 2123, da: 53502, pbt: 129854, tax: 26978, ni: 102876, bpa: 31.54, var: 55894, gg: 199990, dpa: 19.52, extra: 3.0 },
  FY2024: { ing: 505603, otros: 9823, fin: 2644, da: 68773, pbt: 152874, tax: 34860, ni: 118014, bpa: 36.03, var: 61158, gg: 229977, dpa: 22.45, extra: 0 },
  FY2025: { ing: 598502, otros: 11526, fin: 3511, da: 80797, pbt: 181546, tax: 43901, ni: 137645, bpa: 41.73, var: 81940, gg: 262234, dpa: 36.6, extra: 10.0 },
};
const cuenta = Object.entries(C).map(([p, c]) => {
  const ebit = c.pbt - c.otros + c.fin;
  return {
    periodo: p, ingresos: c.ing / 1000, coste_ventas: c.var / 1000, gastos_generales: c.gg / 1000,
    ebitda: r3((ebit + c.da) / 1000), amortizaciones: c.da / 1000, ebit: r3(ebit / 1000),
    resultado_financiero: r3((c.otros - c.fin) / 1000), bai: c.pbt / 1000, impuestos: c.tax / 1000, minoritarios: 0,
    beneficio_neto: c.ni / 1000, gastos_financieros: c.fin / 1000, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
    bpa: c.bpa / 100, dpa: r3(c.dpa / 100), dpa_extraordinario: r3(c.extra / 100), acciones_diluidas: r1(c.ni / c.bpa * 100 / 1000),
  };
});
// LTM a 31-mar-2026 = FY25 + H1 FY26 − H1 FY25 [A1, A6, A7]
const H26 = { ing: 318424, otros: 4262, fin: 1601, da: 45044, pbt: 89061, ni: 66794, bpa: 20.28 };
const H25 = { ing: 285693, otros: 5595, fin: 1807, da: 38863, pbt: 81919, ni: 62971, bpa: 19.08 };
const F = C.FY2025;
const ltmPbt = F.pbt + H26.pbt - H25.pbt, ltmOtros = F.otros + H26.otros - H25.otros, ltmFin = F.fin + H26.fin - H25.fin, ltmDa = F.da + H26.da - H25.da;
const ltm = {
  periodo: 'LTM mar-26', fecha_fin: '2026-03-31', ingresos: (F.ing + H26.ing - H25.ing) / 1000,
  ebitda: r3((ltmPbt - ltmOtros + ltmFin + ltmDa) / 1000), ebit: r3((ltmPbt - ltmOtros + ltmFin) / 1000),
  beneficio_neto: (F.ni + H26.ni - H25.ni) / 1000, bpa: r3((F.bpa + H26.bpa - H25.bpa) / 100), dpa: 0.38, dpa_extraordinario: 0.10,
  // FCF: flujo operativo 294.533 + 81.869 − 70.686; capex 106.389 + 58.852 − 44.963; arrendamientos 7.150 + 3.792 − 3.463
  fcf: r3((294533 + 81869 - 70686 - (106389 + 58852 - 44963) - (7150 + 3792 - 3463)) / 1000), participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
};

const A = {
  _estado: 'completo',
  financieros: {
    cuenta, ltm,
    cambios_perimetro: [
      { periodo: 'FY2025', descripcion: 'CourseLoop (gestión de planes de estudio, Australia y Reino Unido), comprada el 1-nov-2024 por 44,5 M en efectivo + 2,7 M contingentes; fondo de comercio de 35,9 M; aportó 11,4 M de ingresos en FY25 [A1].' },
      { periodo: 'FY2021', descripcion: 'Scientia (horarios y planificación de espacios, Reino Unido), comprada el 15-sep-2021: 11,5 M en efectivo + pago aplazado; consolidada 15 días en FY21 [A4].' },
    ],
    comentario: 'Los ingresos crecieron de 311,3 M en FY21 a 598,5 M en FY25 (+17,7 % anual) casi sin compras: CourseLoop aportó 11,4 M en FY25 [A1] y Scientia apenas nada en FY21 [A4]. El motor es el paso a la nube: las cuotas SaaS pasaron de 151,1 M (49 % de los ingresos) a 499,7 M (83 %), mientras las licencias caían de 95,7 M a 7,2 M y la consultoría crecía al 9 % anual hasta 91,6 M [A1, A4]. El margen EBITDA subió del 40,0 % al 42,5 % y el beneficio antes de impuestos del 31,4 % al 30,3 % de los ingresos por contratos (30 % sobre ingresos totales según la empresa), porque las amortizaciones del desarrollo activado se triplicaron (13,4 M → 53,1 M) [A1, A4]. La empresa dice que la transición a SaaS+ (implantación incluida en la cuota) le costó 2,7 puntos de margen en FY25 (17 M) [A9]. En el H1 FY26 los ingresos crecieron un 11,5 % y el beneficio antes de impuestos un 9 % por 9 M de gasto en el evento Showcase de lanzamiento de la IA [A6, A8].',
    ajustes: 'Las cifras son las publicadas (NIIF australianas, AASB). TNE separa «ingresos totales» (incluidos intereses y otros ingresos: 610,0 M en FY25) de los ingresos por contratos (598,5 M); aquí se usan los segundos y los intereses van al resultado financiero. En FY24 la empresa reclasificó 0,9 M de licencias heredadas a otros ingresos: se usa la cifra reexpresada del informe de FY25 (505,6 M) [A1, A2]. FY23 lleva 7,4 M de otros ingresos por la reversión del pago aplazado de Scientia (no recurrente, por debajo del EBIT con nuestro criterio) [A2]. La empresa da métricas no auditadas (ARR, NRR, flujo de caja libre, «heartbeat» sin Showcase ni divisa) que no se usan en la cuenta. Los pagos en acciones (11,6 M en FY25) son gasto dentro del EBITDA [A1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 240.554, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: r3((61529 - 4217 + 956 + 32622) / 1000), margen_ebitda_pct: r1((61529 - 4217 + 956 + 32622) / 240554 * 100), bpa: 0.1466, vs_consenso: null },
      { periodo: '2S24', ingresos: r3((505603 - 240554) / 1000), crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: r3((214468 - 90890) / 1000), margen_ebitda_pct: r1((214468 - 90890) / (505603 - 240554) * 100), bpa: r3((36.03 - 14.66) / 100), vs_consenso: null },
      { periodo: '1S25', ingresos: 285.693, crecimiento_pct: r1((285693 / 240554 - 1) * 100), crecimiento_organico_pct: r1(((285693 - 5000) / 240554 - 1) * 100), ebitda: r3((81919 - 5595 + 1807 + 38863) / 1000), margen_ebitda_pct: r1((81919 - 5595 + 1807 + 38863) / 285693 * 100), bpa: 0.1908, vs_consenso: null },
      { periodo: '2S25', ingresos: r3((598502 - 285693) / 1000), crecimiento_pct: r1(((598502 - 285693) / (505603 - 240554) - 1) * 100), crecimiento_organico_pct: null, ebitda: r3((254328 - 116994) / 1000), margen_ebitda_pct: r1((254328 - 116994) / (598502 - 285693) * 100), bpa: r3((41.73 - 19.08) / 100), vs_consenso: 'Inferior' },
      { periodo: '1S26', ingresos: 318.424, crecimiento_pct: r1((318424 / 285693 - 1) * 100), crecimiento_organico_pct: null, ebitda: r3((89061 - 4262 + 1601 + 45044) / 1000), margen_ebitda_pct: r1((89061 - 4262 + 1601 + 45044) / 318424 * 100), bpa: 0.2028, vs_consenso: 'En línea' },
    ],
    ultima_presentacion: 'En noviembre de 2025 (FY25) la dirección batió su guía de beneficio (+19 % frente a 13-17 %), pagó un dividendo extraordinario de 10 centavos y fijó el objetivo de 1.000 M de ARR en FY30, pero no dio guía para FY26: la remitió a la junta de febrero [A9]. El ARR creció un 18 %, por debajo del ≈21 % que esperaba el mercado, y la acción cayó un 17 % ese día [D11]. En la junta del 18-feb-2026 subió la guía a +18-20 % de beneficio antes de impuestos y +16-18 % de ARR, apuntando al extremo alto, y avisó de que el primer semestre crecería «un dígito alto» por 8-9 M del evento Showcase [A12]. El 19-may-2026 cumplió: +9 % de beneficio, ARR +17 % (+19 % a tipo de cambio constante), NRR del 114 % (118 % un año antes) y flujo de caja libre de 20,3 M (−15 %); reafirmó la guía sin subirla [A8, A10]. Lo que más se preguntó fue la IA: la dirección defiende que no cobra por puesto sino por inmuebles gravados, alumnos y, desde 2026, por conversaciones e interacciones de IA [A10, A14]. No cuantificó cuánto ARR aporta ya Plus ni cuántos clientes lo pagan, y las ventas nuevas del Reino Unido bajaron un 5 % en el semestre (4,1 M) [A10].',
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: 'FY2021', activo_total: 467.288, activo_corriente: 237.259, pasivo_corriente: 237.242, pasivo_total: 277.054, fondo_comercio: 47.694, intangibles: 128.765, inmovilizado_material: 29.819, existencias: 0, clientes: 51.108, proveedores: 40.425, activos_contrato: 25.808, pasivos_contrato: 169.322, caja: 144.21, deuda_financiera: 0, arrendamientos: 33.389, patrimonio_neto: 190.234, minoritarios: 0, reservas: 65.872 },
      { periodo: 'FY2022', activo_total: 539.945, activo_corriente: 282.155, pasivo_corriente: 271.147, pasivo_total: 300.848, fondo_comercio: 46.58, intangibles: 160.159, inmovilizado_material: 31.615, existencias: 0, clientes: 57.266, proveedores: 48.559, activos_contrato: 26.421, pasivos_contrato: 184.008, caja: 175.865, deuda_financiera: 0, arrendamientos: 35.304, patrimonio_neto: 239.097, minoritarios: 0, reservas: 99.587 },
      { periodo: 'FY2023', activo_total: 636.737, activo_corriente: 344.426, pasivo_corriente: 303.836, pasivo_total: 330.731, fondo_comercio: 47.951, intangibles: 192.98, inmovilizado_material: 35.956, existencias: 0, clientes: 62.416, proveedores: 49.247, activos_contrato: 26.509, pasivos_contrato: 214.495, caja: 223.265, deuda_financiera: 0, arrendamientos: 33.156, patrimonio_neto: 306.006, minoritarios: 0, reservas: 138.936 },
      { periodo: 'FY2024', activo_total: 757.44, activo_corriente: 407.093, pasivo_corriente: 322.786, pasivo_total: 378.178, fondo_comercio: 48.212, intangibles: 221.002, inmovilizado_material: 67.165, existencias: 0, clientes: 67.546, proveedores: 33.172, activos_contrato: 23.374, pasivos_contrato: 246.335, caja: 278.689, deuda_financiera: 0, arrendamientos: 59.667, patrimonio_neto: 379.262, minoritarios: 0, reservas: 183.842 },
      { periodo: 'FY2025', activo_total: 891.402, activo_corriente: 445.904, pasivo_corriente: 392.036, pasivo_total: 440.703, fondo_comercio: 84.908, intangibles: 268.892, inmovilizado_material: 59.755, existencias: 0, clientes: 60.802, proveedores: 40.913, activos_contrato: 20.304, pasivos_contrato: 294.458, caja: 319.641, deuda_financiera: 0, arrendamientos: 53.381, patrimonio_neto: 450.699, minoritarios: 0, reservas: 201.502 },
    ],
    vencimientos: [],
    liquidez: 'Sin deuda financiera. Caja e inversiones a corto de 245,5 M a 31-mar-2026 (efectivo 40,3 M + depósitos a plazo 205,1 M) [A6]; 319,6 M a 30-sep-2025 [A1]. Línea de avales de 8,3 M (3,8 M dispuestos) [A1].',
    rating: 'Sin rating',
    coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: 'Sin deuda bancaria ni bonos. Arrendamientos de oficinas por 49,4 M a 31-mar-2026 (5,5 M a corto y 44,0 M a largo) [A6]. El pasivo grande es el ingreso diferido (cuotas cobradas por adelantado): 294,5 M a 30-sep-2025 y 252,2 M a 31-mar-2026, que se consume con el servicio y no se devuelve en caja [A1, A6]. Provisiones de 32,5 M, sobre todo vacaciones y permisos del personal [A6]. Pagos contingentes de CourseLoop: 2,7 M por garantías (a los 18 meses) y 5 M de remuneración ligada a hitos de producto en dos años [A1]. Avales bancarios de 3,8 M por alquileres [A1]. Sin litigios materiales declarados [A1].',
    comentario: 'El balance es el de un software cobrado por adelantado: el circulante comercial es muy negativo (clientes y activos de contrato de 81 M frente a 335 M de proveedores e ingresos diferidos en FY25: −42 % de las ventas) y crecer libera caja [A1]. La caja está concentrada en el segundo semestre, cuando vencen los aniversarios de los contratos: en marzo cae (245,5 M) y en septiembre sube (319,6 M) [A1, A6]. Entre abril y septiembre de 2026 la empresa pagó 26,2 M de dividendo y el fideicomiso de empleados compró 2,8 M de acciones por ≈ 86,9 M [A6, A13], así que la caja de septiembre de 2026 dependerá del cobro del segundo semestre. Los intangibles (desarrollo activado de 204 M y comisiones activadas de 44 M) son el activo principal y se amortizan en 3-5 años [A1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: 'FY2021', flujo_operativo: 114.987, capex: 52.927, pagos_arrendamientos: 0.957, adquisiciones: 10.228, desinversiones: 0, dividendos: 42.504, recompras: 0, emision_acciones: 10.595, intereses_en_financiacion: 0 },
      { periodo: 'FY2022', flujo_operativo: 142.718, capex: 67.282, pagos_arrendamientos: 3.652, adquisiciones: 0, desinversiones: 0, dividendos: 46.127, recompras: 0, emision_acciones: 5.92, intereses_en_financiacion: 0 },
      { periodo: 'FY2023', flujo_operativo: 193.659, capex: 90.126, pagos_arrendamientos: 7.757, adquisiciones: 0, desinversiones: 0, dividendos: 56.605, recompras: 0, emision_acciones: 8.139, intereses_en_financiacion: 0 },
      { periodo: 'FY2024', flujo_operativo: 212.746, capex: 92.639, pagos_arrendamientos: 7.69, adquisiciones: 0, desinversiones: 0, dividendos: 64.846, recompras: 0, emision_acciones: 7.836, intereses_en_financiacion: 0 },
      { periodo: 'FY2025', flujo_operativo: 294.533, capex: 106.389, pagos_arrendamientos: 7.15, adquisiciones: 43.748, desinversiones: 0, dividendos: 78.413, recompras: 30.379, emision_acciones: 12.488, intereses_en_financiacion: 0 },
    ],
    comentario: 'La conversión es alta y estacional. El flujo operativo de FY25 (294,5 M) fue 2,1 veces el beneficio, por los ingresos diferidos (+42,2 M) y el cobro de clientes [A1]; restando el capex (106,4 M, de los que 84,4 M son desarrollo activado y 18,8 M comisiones de venta activadas) y los alquileres (7,2 M), quedan 181 M de caja libre, 1,3 veces el beneficio; la empresa da 184,2 M con su definición [A1, A9]. El «capex» de TNE es sobre todo I+D: invierte el 25 % de los ingresos en I+D y activa algo más de la mitad (54 % en el H1 FY26) [A8, A10]; casi todo es de crecimiento (productos nuevos y la generación de IA), aunque una parte sostiene la base. El primer semestre genera poca caja (20,3 M en el H1 FY26 frente a 24,0 M) porque los aniversarios de los contratos caen en el segundo [A6, A8]. Las «recompras» de FY25 (30,4 M) y las de 2026 (≈ 86,9 M) son compras del fideicomiso de empleados para cubrir opciones y derechos, no una reducción de capital [A1, A13].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young (Australia)', anios_auditor: null, opinion: 'Favorable (sin salvedades) en FY25; revisión limitada sin salvedades del H1 FY26',
    comentario: 'Tres asuntos de calidad contable. (1) **Activación del desarrollo**: TNE activa ≈ 54 % de su I+D (84,4 M en FY25 y 45,4 M en el H1 FY26) y lo amortiza en unos cinco años; la amortización (53,1 M) va por detrás de lo activado, lo que sube el beneficio contable en ≈ 31 M al año frente a gastarlo todo (estimación propia: 84,4 − 53,1) [A1, A10]. Es práctica normal y está auditada, pero el «margen del 30 %» sería del ≈ 25 % con todo el I+D en gasto. (2) **Comisiones activadas**: 18,8 M en FY25, amortizadas en el plazo del contrato [A1]. (3) **Pagos en acciones** de 11,6 M (1,9 % de los ingresos), pequeños para el sector, más las compras del fideicomiso de empleados para cubrirlos (30,4 M en FY25 y ≈ 86,9 M en 2026), que son el coste de caja real de las opciones [A1, A13]. El reconocimiento de ingresos es sencillo (SaaS diario, consultoría al prestarla) y el ingreso diferido crece al ritmo del ARR. El tipo efectivo del 24 % baja del 30 % legal por el incentivo fiscal a la I+D (10,5 M) [A1]. Lectura de los indicadores del motor: sin deuda y con caja neta, el Altman Z sale muy alto; el Beneish M puede marcar por el crecimiento de intangibles, que aquí es I+D activado y no manipulación.',
    senales: [
      { senal: 'Beneficio apoyado en la activación del I+D', nivel: 'Media', comentario: 'Lo activado (84,4 M) supera a la amortización (53,1 M) en 31 M, el 17 % del beneficio antes de impuestos de FY25 [A1].' },
      { senal: 'Coste real de las opciones mayor que el gasto contable', nivel: 'Baja', comentario: 'Gasto de 11,6 M frente a compras del fideicomiso de 30,4 M (FY25) y ≈ 86,9 M (2026) [A1, A13].' },
      { senal: 'Cambio de director financiero y salida del director de operaciones en 2026', nivel: 'Media', comentario: 'El director financiero pasó a un puesto comercial el 1-ago-2026 y el de relaciones con inversores es financiero en funciones; el COO se va el 18-nov-2026 [C4, C5].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo semestral desde 1996, franqueado al 65-75 %; reparto del 63 % del beneficio en FY25 más un extraordinario de 10 centavos (87 % en total) y, para FY26, un 65-75 % del beneficio, cargado al segundo semestre [A9, A10]. No hay recompras de capital: las compras en bolsa son del fideicomiso de empleados para entregar acciones de los planes de incentivos [A13]. Prioridades declaradas: I+D al 20-25 % de los ingresos, compras pequeñas que añadan producto (CourseLoop, Scientia) y caja sin deuda para invertir [A9, A10].',
    adquisiciones: [
      { anio: '2025', objetivo: 'CourseLoop (gestión de planes de estudio)', importe: 47.2, ev_ebitda: null, financiacion: 'Caja', resultado: 'Aportó 11,4 M de ingresos y +3,1 M de beneficio antes de impuestos en FY25 (−2 M con la contabilidad de la compra); integrada en la suite de educación [A1].' },
      { anio: '2021', objetivo: 'Scientia (horarios y planificación de espacios, Reino Unido)', importe: 19.2, ev_ebitda: null, financiacion: 'Caja y pago aplazado', resultado: 'El pago aplazado se revirtió en FY23 (7,4 M de ingreso) al no cumplirse los hitos; sirvió de entrada en universidades británicas, donde el ARR del Reino Unido creció hasta 53 M [A2, A4, A10].' },
    ],
    comentario: 'La dirección asigna bien el capital: casi todo el crecimiento es propio, financiado con el I+D, y las compras han sido pequeñas y de producto (66 M en cinco años frente a 1.120 M de flujo operativo acumulado) [A1-A5]. El dividendo se ha multiplicado por 2,6 desde FY21 (13,9 → 36,6 centavos con el extraordinario) sin deuda. La dilución es baja (acciones diluidas de 322,8 M a 329,9 M en cuatro años) porque las opciones se cubren cada vez más con compras en bolsa del fideicomiso, que cuestan caja [A1, A13]. El ROIC elevado viene de un capital invertido pequeño: el cliente paga por adelantado y casi no hay activos materiales.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Cuotas SaaS', descripcion: 'Suscripción al ERP en la nube (SaaS y SaaS+, con la implantación incluida en la cuota)', tipo_resultado: null, historico: [{ periodo: 'FY2021', ingresos: 151.052, resultado: null }, { periodo: 'FY2022', ingresos: 216.812, resultado: null }, { periodo: 'FY2023', ingresos: 316.181, resultado: null }, { periodo: 'FY2024', ingresos: 407.386, resultado: null }, { periodo: 'FY2025', ingresos: 499.725, resultado: null }] },
      { nombre: 'Licencias (anuales e iniciales)', descripcion: 'Mantenimiento anual de las instalaciones propias y licencias iniciales, en extinción', tipo_resultado: null, historico: [{ periodo: 'FY2021', ingresos: 95.735, resultado: null }, { periodo: 'FY2022', ingresos: 78.752, resultado: null }, { periodo: 'FY2023', ingresos: 40.014, resultado: null }, { periodo: 'FY2024', ingresos: 17.697, resultado: null }, { periodo: 'FY2025', ingresos: 7.211, resultado: null }] },
      { nombre: 'Consultoría', descripcion: 'Implantación y servicios fuera de SaaS+', tipo_resultado: null, historico: [{ periodo: 'FY2021', ingresos: 64.508, resultado: null }, { periodo: 'FY2022', ingresos: 72.67, resultado: null }, { periodo: 'FY2023', ingresos: 73.183, resultado: null }, { periodo: 'FY2024', ingresos: 80.52, resultado: null }, { periodo: 'FY2025', ingresos: 91.566, resultado: null }] },
    ],
    geografias: [
      { nombre: 'Australia', peso_pct: r1(487294 / 598502 * 100) },
      { nombre: 'Nueva Zelanda y Asia-Pacífico', peso_pct: r1(61027 / 598502 * 100) },
      { nombre: 'Reino Unido', peso_pct: r1(50181 / 598502 * 100) },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'ARR total (M AUD)', valor_anterior: '470,2 (FY24)', valor_actual: '554,6 (FY25); 598,0 (mar-26)', variacion: '+18 %; +17 % interanual en mar-26', comentario: 'Guía FY26: +16-18 %; objetivo de 1.000 M en FY30 [A9, A10].' },
      { kpi: 'Retención neta de ingresos (NRR)', valor_anterior: '118 % (H1 FY25)', valor_actual: '115 % (FY25); 114 % (H1 FY26)', variacion: '−4 puntos en un año', comentario: '116 % a tipo de cambio constante; objetivo 115-120 % [A10].' },
      { kpi: 'Bajas de clientes (churn)', valor_anterior: '≈ 1 %', valor_actual: '≈ 1 %', variacion: 'Estable', comentario: 'Retención de clientes del 99 % [A10].' },
      { kpi: 'ARR del Reino Unido (M AUD)', valor_anterior: '43,1 (H1 FY25)', valor_actual: '53,0 (H1 FY26)', variacion: '+23 %', comentario: 'Ventas nuevas del semestre 4,1 M (−5 %) [A10].' },
      { kpi: 'ARR medio por cliente (miles AUD)', valor_anterior: '442,5 (FY25)', valor_actual: '491 (H1 FY26)', variacion: '+11 % en seis meses', comentario: 'Unos 1.300 clientes [A8, A9].' },
      { kpi: 'I+D antes de activar (M AUD)', valor_anterior: '153,7 (FY25, 25 %)', valor_actual: '84,1 (H1 FY26, 26 %)', variacion: '+22 %', comentario: '54 % activado [A8].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report 2025: estrategia, productos, verticales y mercado direccionable', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2025-11-18', url: `${ASX}/20251118/pdf/06s446mgnpp1m0.pdf` },
  { id: 2, titulo: 'TNE H1 FY26 Half Year Results Presentation (mercado direccionable de 13.500 M AUD, penetración ≤ 15 % por vertical, ARR por vertical)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2026-05-19', url: `${ASX}/20260519/pdf/06zqksz2h9yrg9.pdf` },
  { id: 3, titulo: 'Ficha sectorial: software de aplicaciones (tamaño del ERP según Apps Run The World, software para gobiernos, mapa del riesgo de IA)', editor: 'Repositorio de análisis (sectores/software-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/software-2026-10-14.md' },
  { id: 4, titulo: 'Annual Report 2025 y ficha de Yahoo Finance de Tyler Technologies, Workday, Sage, Nemetschek, Constellation, Objective (ingresos y márgenes de los últimos 12 meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com' },
  { id: 5, titulo: 'Analyst Presentation – TNE Unleashes AI Revolution (Plus, precios por conversación e interacción, mercado direccionable)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2025-10-09', url: `${ASX}/20251009/pdf/06qb45cz53jm4y.pdf` },
  { id: 6, titulo: 'TNE launches Guide, extending AI to communities and students', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://www.asx.com.au/asx/v2/statistics/displayAnnouncement.do?display=pdf&idsId=03065135' },
  { id: 7, titulo: 'TNE FY25 Sustainability Report', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2025-11-25', url: 'https://www.asx.com.au/asx/v2/statistics/displayAnnouncement.do?display=pdf&idsId=03031300' },
  { id: 8, titulo: 'SaaS+ & UK momentum drive record ARR & profit (nota de resultados FY25: verticales, clientes ganados, NRR, bajas)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2025-11-18', url: `${ASX}/20251118/pdf/06s444hmjk0xmd.pdf` },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Adrian Di Marco y John Mactaggart fundaron TechnologyOne en Brisbane en 1987 para hacer software de gestión (finanzas, nóminas, inmuebles) para organizaciones medianas australianas [B1]. Salió a bolsa en la ASX en 1999 y se especializó en seis verticales de clientes que no pueden equivocarse: ayuntamientos, universidades y centros de formación profesional, administraciones, sanidad y servicios sociales, empresas de activos intensivos y servicios financieros [B1, B2]. Ha reescrito su código cuatro veces; la cuarta generación la llevó a la nube (2012-2024: 100 % SaaS) y en 2023 lanzó SaaS+, la implantación incluida en la cuota [B1, B2]. Edward Chung es consejero delegado desde mayo de 2017; Di Marco dejó la presidencia en 2021 y Mactaggart el consejo en 2024 [B1]. En el Reino Unido, donde entró con universidades, compró Scientia (2021) y ganó ayuntamientos londinenses [B8].',
    hitos: [
      { anio: '1987', hito: 'Fundación en Brisbane por Adrian Di Marco y John Mactaggart [B1].' },
      { anio: '1999', hito: 'Salida a bolsa en la ASX [B1].' },
      { anio: '2012', hito: 'Primera versión en la nube; inicio del paso de licencias a SaaS [B1].' },
      { anio: '2017', hito: 'Edward Chung, consejero delegado [B1].' },
      { anio: '2021', hito: 'Compra de Scientia (horarios universitarios, Reino Unido) [B1].' },
      { anio: '2023', hito: 'Lanzamiento de SaaS+ (implantación incluida en la cuota) [B8].' },
      { anio: '2024', hito: '100 % de clientes en la nube; entrada en el ASX 50 [B1].' },
      { anio: '2025', hito: 'Compra de CourseLoop; 500 M de ARR 18 meses antes de lo previsto; lanzamiento de Plus (IA) [B8].' },
      { anio: '2026', hito: 'Lanzamiento de Guide (IA para vecinos y alumnos) y nueva estructura por verticales [B6].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'TechnologyOne vende un ERP en la nube, una única instalación compartida por todos sus clientes, con 20 productos: finanzas, nóminas y recursos humanos, compras, activos, presupuestos, gestión documental, impuestos municipales sobre inmuebles («property & rating»), gestión de alumnos, horarios y planes de estudio, y desde 2025 la IA (Plus, Guide e IA en producto) [B1, B2]. Sus clientes son unos 1.300: ayuntamientos (41 % del ARR), universidades y centros de formación (25 %), administraciones (14 %), sanidad y servicios sociales, empresas de activos intensivos y financieras [B2]. Vende directamente, con su propio equipo de implantación, en Australia (81 % de los ingresos), Nueva Zelanda y Asia (10 %) y el Reino Unido (8 %) [B1].',
    como_gana_dinero: 'El 91 % de los ingresos es recurrente y contratado al empezar el año (ARR de 554,6 M frente a 610 M de ingresos totales en FY25) [B8]. Cobra una cuota anual por cliente según su tamaño (inmuebles gravados en un ayuntamiento, alumnos equivalentes a tiempo completo en una universidad, presupuesto en una administración), no por usuario, y la sube con la inflación y con cada módulo nuevo: la retención neta es del 114-115 % [B2, B8]. Con SaaS+ la implantación va dentro de la cuota (ARR un 40 % mayor por contrato), lo que convierte la consultoría en ingreso recurrente pero cuesta margen al principio [B2]. Desde 2026 la IA se cobra por conversación (Plus) e interacción por encima de un tramo gratuito y con publicidad en Guide [B5]. El coste es sobre todo personal (I+D al 25 % de los ingresos) y la nube; con una sola instalación, cada cliente nuevo tiene un coste marginal bajo: margen antes de impuestos del 30 % y objetivo del 35 % o más [B8].',
    clientes: 'Unos 1.300 clientes; ninguno pasa del 10 % de los ingresos [B1]. Contratos SaaS de 5-10 años (James Cook University y Townsville, 10 años en 2026) [B2]. Bajas del 1 % o menos al año y retención de clientes del 99 % [B2]. El ARR medio por cliente pasó de 100.000 AUD en FY12 a 491.000 AUD en marzo de 2026 [B2]. Poder de precios demostrado: la cuota se indexa a la inflación, la lista de precios de productos nuevos subió un 10 % con la IA y los clientes que vuelven pagan más (Townsville, tres veces el contrato anterior tras irse a un competidor) [B2, B5]. La penetración de TNE en cada vertical de Asia-Pacífico no pasa del 15 % del gasto direccionable de sus propios clientes, según la empresa [B2].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es el software de gestión (ERP y aplicaciones de sector) para el sector público local, la educación superior y las administraciones en Australia, Nueva Zelanda y el Reino Unido. No hay estadística oficial de ese nicho; usamos dos referencias: el mercado direccionable que calcula la empresa (13.500 M AUD con sus productos y clientes potenciales en sus países) [B2] y el mercado mundial de ERP de Apps Run The World (≈ 145.600 M USD en 2025, +7,1 % anual previsto) junto con el de software para gobiernos (≈ 26.700 M USD en 2024, +6 % anual hasta 2029) [B3]. El `mercado_final` del DCF usa el de la empresa, que es el perímetro de su cuota.',
    tamano: '≈ 13.500 M AUD de mercado direccionable para TNE en 2025 (empresa) [B2]; ERP mundial ≈ 145.600 M USD en 2025 (ARTW) [B3].',
    unidad_serie: 'millones de AUD (mercado direccionable de TNE; 2025 de la empresa y resto estimación propia al 7 % anual)',
    serie: [
      { anio: '2025', tamano: 13500 }, { anio: '2026e', tamano: 14445 }, { anio: '2027e', tamano: 15456 }, { anio: '2028e', tamano: 16538 }, { anio: '2029e', tamano: 17696 }, { anio: '2030e', tamano: 18934 },
    ],
    tcac_historico_pct: null, tcac_previsto_pct: 7.0, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Paso a la nube de sistemas antiguos en ayuntamientos y universidades', efecto: '+', horizonte: 'Estructural', evidencia: 'TNE terminó su migración (1.200 clientes) y gana sustituciones de sistemas antiguos en el Reino Unido (Islington, Greenwich, Royal Holloway) [B8].' },
      { driver: 'Presupuestos públicos y fusiones de ayuntamientos', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La reorganización municipal británica retrasa decisiones en 2026 pero creará consejos mayores [B2].' },
      { driver: 'Matrícula universitaria y finanzas de las universidades', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La cuota se liga a los alumnos equivalentes; los topes a estudiantes internacionales en Australia y el Reino Unido presionan presupuestos (estimación propia del efecto).' },
      { driver: 'IA generativa y agentes', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Abre ingresos por uso (Plus, Guide) pero abarata el desarrollo a medida y puede dar a los clientes poder de negociación [B3, B5].' },
      { driver: 'Indexación de las cuotas a la inflación', efecto: '+', horizonte: 'Estructural', evidencia: 'Las cuotas suben con la inflación y la NRR está en el 114-116 % [B2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Compite con Oracle, SAP, Workday y Microsoft en clientes grandes, y con especialistas locales (Civica, ReadyTech) en ayuntamientos; gana por especialización y por SaaS+ [B1, B2].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Compradores públicos que licitan y negocian a la renovación; pero un cliente pesa menos del 1 % y cambiar un sistema de registro cuesta años [B1, B2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'La nube pública (AWS) y el personal técnico son los costes clave; hay alternativas de nube y el coste variable de la nube es el 10 % de los ingresos [B1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hacen falta décadas de reglas fiscales y académicas de cada país; la IA abarata programar pero no la certificación ni los datos históricos [B2, B3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Agentes de IA y desarrollos a medida pueden sustituir funciones de atención y formularios; el registro contable, fiscal y académico sigue necesitando un sistema auditado [B3].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El gasto en software del sector público y la educación es poco cíclico: TNE batió su guía y subió el beneficio en 2008-09 (licencias y mantenimiento), en 2020 (pandemia) y en 2022 (subida de tipos) [B1]. Lo cíclico es el múltiplo: el software cayó en bolsa en 2022 por los tipos y otra vez en febrero de 2026 por la IA, sin que bajaran las ventas de TNE. Hoy el ciclo de compras públicas es normal en Australia (ayuntamientos +27 % de ARR) y más lento en el Reino Unido por la reorganización municipal [B2].' },
    regulacion: 'Las normas sobre protección de datos (Privacy Act australiana, reforzada en 2024; RGPD británico) y la exigencia de soberanía de los datos favorecen a un proveedor con centros de datos locales [B1]. Los impuestos municipales sobre inmuebles y las reglas académicas cambian por estado y país: cada cambio es una barrera para un recién llegado y una venta de módulos para TNE. Los concursos públicos fijan plazos de 5-10 años. La IA en administraciones empieza a regularse (marco australiano de uso responsable de IA en el gobierno, 2024; Ley de IA europea, que no aplica directamente en el Reino Unido); TNE dice que sus agentes trabajan dentro de su ERP y con los datos del cliente [B5].',
    tendencias: 'Tres tendencias: (1) la nube y los contratos todo incluido, donde TNE va por delante con SaaS+ y el objetivo de implantar el ERP en 30 días en 2028 (126 días hoy) [B2, B8]; (2) la IA agéntica, que TNE vende como generación 5 del ERP con cobro por uso (Plus, Guide), pero que también pone presión a los múltiplos de todo el software por puesto [B3, B5]; (3) la consolidación por fondos de capital riesgo de proveedores para el sector público y la educación (Civica, PowerSchool, Instructure), que eleva la competencia financiera en el Reino Unido [D].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 4.4,
    posicion: 'Mayor proveedor australiano de ERP; líder en ayuntamientos y universidades de Australia (gestión de alumnos en los TAFE de todos los estados salvo Australia Meridional y Nueva Gales del Sur) [B8]; ≈ 4,4 % de su mercado direccionable de 13.500 M AUD (estimación propia: 598,5 M de ingresos ÷ 13.500 M) [B2]. En el Reino Unido es un aspirante (53 M de ARR) [B2].',
    competidores: [
      { nombre: 'Tyler Technologies', pais: 'EE. UU.', ticker: 'TYL', ingresos: r1(2429.657 * 1.4317), cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder del software para gobiernos locales de EE. UU.; no compite en Australia; referencia de modelo y múltiplo [B3, B4].' },
      { nombre: 'Workday', pais: 'EE. UU.', ticker: 'WDAY', ingresos: r1(10155 * 1.4317), cuota_pct: null, margen_ebit_pct: null, comentario: 'ERP de RR. HH. y finanzas en la nube; compite en universidades grandes (Workday Student) [B4].' },
      { nombre: 'Oracle', pais: 'EE. UU.', ticker: 'ORCL', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'ERP para administraciones y universidades; Townsville volvió a TNE tras pasar a Oracle [B2].' },
      { nombre: 'Civica', pais: 'Reino Unido', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Software para ayuntamientos británicos y australianos (Authority); de capital riesgo, no cotiza.' },
      { nombre: 'Sage Group', pais: 'Reino Unido', ticker: 'SGE', ingresos: r1(2634 * 1.90786), cuota_pct: null, margen_ebit_pct: null, comentario: 'Contabilidad y ERP para pymes; poco solapamiento, referencia europea de margen [B4].' },
      { nombre: 'Objective Corporation', pais: 'Australia', ticker: 'OCL', ingresos: r1(134.711), cuota_pct: null, margen_ebit_pct: null, comentario: 'Gestión documental y de expedientes para administraciones australianas; compite en módulos [B4].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Poco: una sola instalación compartida mejora el producto con cada cliente, pero no hay red entre usuarios.' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'Sistemas de registro con décadas de datos (catastro, expedientes académicos, contabilidad); bajas del 1 % y contratos de 5-10 años [B2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: '38 años de reglas fiscales, académicas y de nómina de cada país; marca de referencia en ayuntamientos y universidades australianas [B2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Una sola instalación multicliente y equipo propio de implantación (SaaS+): margen antes de impuestos del 30 % frente a mucho menos en los rivales que implantan con terceros [B8].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Nichos pequeños (unos 540 ayuntamientos y 40 universidades en Australia) donde no caben muchos proveedores especializados.' },
      ],
    },
    amenazas: 'Tres amenazas, de más a menos probable. (1) **IA**: que los agentes de IA de los grandes (Microsoft, Oracle, Workday) o desarrollos a medida baratos hagan menos necesarios los módulos de atención, formularios y analítica, y que los clientes usen la IA para negociar a la baja en la renovación; probabilidad media a cinco años, más en los módulos que en el registro contable. (2) **Reino Unido**: que el crecimiento fuera de Australia no compense la madurez local (ventas nuevas británicas −5 % en el H1 FY26) [B2]. (3) **Consolidación por capital riesgo** de rivales con más dinero para precios agresivos en concursos.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es social y de gobierno: (1) la seguridad de los datos de ciudadanos y alumnos, porque un incidente grave en un sistema público dañaría la reputación y los concursos; TNE lo trata como riesgo principal y aloja los datos en el país del cliente [B1, B7]; (2) la atracción y retención de ingenieros, que son el 60 % del coste; (3) la ética del uso de IA en decisiones públicas. El ambiental es menor (oficinas y nube) [B7].',
    controversias: 'No encontramos sanciones ni litigios materiales en los últimos tres años [B1]. En diciembre de 2025 la empresa respondió a preguntas de accionistas sobre su director financiero por su paso anterior por Corporate Travel Management, investigada por su contabilidad; TNE le mantuvo la confianza y en julio de 2026 lo pasó a un puesto comercial [C].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) informe de sostenibilidad FY25 de la empresa; 2) informe anual FY25; 3) búsqueda de MSCI y Sustainalytics para TNE (de pago)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) presentaciones de la empresa; 2) ficha sectorial de software del repositorio; 3) búsqueda de cuotas de ERP del sector público australiano', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: informe de los consejeros, declaración de gobierno corporativo e informe de remuneraciones (auditado)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2025-11-18', url: `${ASX}/20251118/pdf/06s446mgnpp1m0.pdf` },
  { id: 2, titulo: 'Results of FY25 Annual General Meeting (votaciones del 18-feb-2026)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2026-02-18', url: `${ASX}/20260218/pdf/06wg3fmmdw104c.pdf` },
  { id: 3, titulo: 'TechnologyOne responds to shareholder enquiries related to CTM matter', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2025-12-08', url: `${ASX}/20251208/pdf/06t2868bs8q1gq.pdf` },
  { id: 4, titulo: 'TechnologyOne realigns and strengthens leadership structure (director financiero a vicepresidente; financiero en funciones)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2026-07-16', url: `${ASX}/20260716/pdf/071rtxwc8tgc5t.pdf` },
  { id: 5, titulo: 'TechnologyOne Leadership Update (dimisión del director de operaciones, efectiva el 18-nov-2026)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2026-08-19', url: `${ASX}/20260819/pdf/072xjgh1x9dm4h.pdf` },
  { id: 6, titulo: 'Appendix 3Y: E. Chung (27-mar-2026), P. Davis (25-feb y 8-jul-2026), D. Eckersley (20-feb-2026)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2026-07-09', url: `${ASX}/20260709/pdf/071kgbc3fbxcby.pdf` },
  { id: 7, titulo: 'Avisos de accionista significativo: AustralianSuper (2-jun-2026), Vanguard (15-jul-2026), State Street (25-sep-2026)', editor: 'Technology One Limited / ASX', tipo: 'Primaria', fecha: '2026-09-25', url: `${ASX}/20260925/pdf/074k280qg88jhw.pdf` },
  { id: 8, titulo: 'Guidance Upgraded (guía FY26 y retirada de C. Rosenberg)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2026-02-18', url: `${ASX}/20260218/pdf/06wfkfl8f34qtr.pdf` },
  { id: 9, titulo: 'Preliminary Final Reports FY21-FY23 y Annual Report FY24 (guía y resultado de cada año)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2024-11-19', url: `${ASX}/20241119/pdf/06bjxy9wdn90x0.pdf` },
  { id: 10, titulo: 'Appendix 4D H1 FY26 (consejo y directivos a 18-may-2026)', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2026-05-19', url: `${ASX}/20260519/pdf/06zqk9tj6tpz8f.pdf` },
];
const Cn = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Edward Chung', cargo: 'Consejero delegado y director gerente', desde: '2017', participacion_pct: r2(700068 / 327368541 * 100), trayectoria: 'En TNE desde 2012 (director de operaciones); antes en Mincom. Desde 2017 completó el paso a SaaS, lanzó SaaS+ y la IA: ARR de 202,5 M (FY19) a 598 M (mar-26) y beneficio antes de impuestos de 82,5 M (FY20) a 181,5 M (FY25) [C1, A].' },
      { nombre: 'Pat O’Sullivan', cargo: 'Presidente (independiente)', desde: '2021', participacion_pct: r2(51314 / 327368541 * 100), trayectoria: 'Exdirector financiero de Optus y Goodman Fielder; consejero desde marzo de 2021 y presidente después [C1].' },
      { nombre: 'Giovanni Rizzo', cargo: 'Director financiero en funciones (desde ago-2026)', desde: '2026', participacion_pct: null, trayectoria: 'Era director de relaciones con inversores; financiero en funciones mientras se busca uno permanente [C4].' },
      { nombre: 'Cale Bennett', cargo: 'Vicepresidente ejecutivo de sectores regulados (antes director financiero, 2023-2026)', desde: '2023', participacion_pct: 0.0, trayectoria: 'Exdirector financiero de Corporate Travel Management; dejó la dirección financiera el 1-ago-2026 [C3, C4].' },
      { nombre: 'Stuart MacDonald', cargo: 'Director de operaciones (sale el 18-nov-2026)', desde: '2016', participacion_pct: 0.0, trayectoria: 'Diez años en TNE; impulsó SaaS+ y Plus; se va a ser consejero delegado de otra cotizada australiana [C5].' },
    ],
    historial_guidance: [
      { anio: 'FY2021', guia: 'Beneficio antes de impuestos +15-19 %', real: '+19 % (97,8 M)', cumplida: 'Sí' },
      { anio: 'FY2022', guia: 'Beneficio antes de impuestos +10-15 %', real: '+15 % (112,3 M)', cumplida: 'Sí' },
      { anio: 'FY2023', guia: 'Beneficio antes de impuestos +13-15 % (mayo de 2023)', real: '+16 % (129,9 M)', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'Beneficio antes de impuestos +12-16 %', real: '+18 % (152,9 M)', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Beneficio antes de impuestos +13-17 % (mayo de 2025)', real: '+19 % (181,5 M); ARR +18 %, por debajo del ≈ 21 % que esperaba el mercado', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'Beneficio antes de impuestos +18-20 % y ARR +16-18 % (feb-26, extremo alto); H1 «un dígito alto»', real: 'H1 +9 % y ARR +17 % (resultado anual el ≈ 17-nov-2026)', cumplida: 'Parcial' },
    ],
    comentario: 'La dirección tiene un historial limpio: cumple o bate la guía de beneficio desde hace más de una década y cumplió el objetivo de 500 M de ARR 18 meses antes [C9, A9]. Pero 2026 trae rotación en el segundo nivel: el director financiero pasó a un puesto comercial (1-ago-2026), el financiero es interino y el director de operaciones se va el 18-nov-2026, un día después de los resultados [C4, C5]. El cambio llega tras las preguntas de accionistas por el pasado del director financiero en Corporate Travel Management [C3]. Chung, en el cargo desde 2017, no tiene sucesor público. Lectura: la ejecución comercial no depende de esas dos personas, pero una dirección financiera interina en el cierre del ejercicio y con la cuenta de la IA por explicar resta algo de credibilidad hasta que se nombre el financiero permanente.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Pat O’Sullivan', cargo: 'Presidente', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos' },
      { nombre: 'Edward Chung', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Dr Jane Andrews', cargo: 'Consejera', tipo: 'Independiente', desde: '2016', comisiones: 'Remuneraciones (presidenta)' },
      { nombre: 'Sharon Doyle', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría y riesgos' },
      { nombre: 'Peter Ball', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría y riesgos' },
      { nombre: 'Paul Robson', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Remuneraciones' },
      { nombre: 'Debra Eckersley', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'n.d.' },
      { nombre: 'Phil Davis', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'n.d.' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 98.12, voto_remuneracion_contra_pct: 1.88, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 4.474, fijo: 0.87, variable_corto: 1.775, variable_largo: 1.805, ratio_salario_medio: null },
    remuneracion: 'Remuneración total de Chung en FY25: 4,47 M AUD (estatutaria): fijo 0,87 M, incentivo anual 1,45 M más 0,33 M diferido en acciones, y 1,81 M de valor contable de opciones y retenciones a largo plazo [C1]. El incentivo anual depende del beneficio antes de impuestos, el ARR y objetivos de cliente; el largo plazo son opciones a tres años con BPA (82 %) y rentabilidad total relativa (18 %) [C1]. La empresa dice que su fijo está muy por debajo de las cotizadas comparables y que el variable pesa mucho [C1]. Sin indemnizaciones extraordinarias declaradas. Votación del informe de remuneraciones: 98,12 % a favor en la junta del 18-feb-2026 [C2]. El incentivo premia crecer el beneficio y el ARR, no el rendimiento del capital, pero con capital tan pequeño el BPA es buena aproximación.',
    accionistas: [
      { nombre: 'JL Mactaggart Holdings (John Mactaggart, cofundador)', pct: 6.0, tipo: 'Fundador', variacion: 'Estable; salió del consejo en feb-2024 con 24,9 M de acciones [C1].' },
      { nombre: 'State Street', pct: 6.03, tipo: 'Institucional (índices)', variacion: 'Baja del 7,11 % al 6,03 % (aviso del 25-sep-2026) [C7].' },
      { nombre: 'Vanguard', pct: 6.0, tipo: 'Institucional (índices)', variacion: 'Sube del 5,0 % al 6,0 % (9-jul-2026) [C7].' },
      { nombre: 'AustralianSuper', pct: 5.19, tipo: 'Fondo de pensiones', variacion: 'Nuevo accionista significativo el 29-may-2026 [C7].' },
      { nombre: 'Fideicomiso de empleados (autocartera)', pct: null, tipo: 'Autocartera', variacion: 'Compró 2,8 M de acciones entre mayo y agosto de 2026 para los planes de incentivos [A13].' },
    ],
    insiders: [
      { fecha: '2026-02-20', persona: 'Debra Eckersley (consejera)', operacion: 'Compra', acciones: 1021, importe: 0.025 },
      { fecha: '2026-02-25', persona: 'Phil Davis (consejero)', operacion: 'Compra', acciones: 4000, importe: 0.093 },
      { fecha: '2026-03-27', persona: 'Edward Chung (consejero delegado)', operacion: 'Venta', acciones: 172504, importe: null },
      { fecha: '2026-07-08', persona: 'Phil Davis (consejero)', operacion: 'Compra', acciones: 3275, importe: 0.1 },
    ],
    control_y_defensas: 'Sin accionista de control: el mayor es el cofundador Mactaggart con el 6 % y el resto son fondos índice y de pensiones [C1, C7]. Una acción, un voto; sin blindajes. El consejo es independiente salvo el consejero delegado, con presidente independiente y separado del ejecutivo [C1]. La única operación vinculada declarada es menor (155.100 AUD de servicios de organización de eventos de un familiar de un directivo, en condiciones de mercado) [A1]. El fundador Adrian Di Marco ya no está en el consejo.',
    alertas: [
      'Director financiero sustituido por un interino el 1-ago-2026 tras las preguntas de accionistas por su etapa en Corporate Travel Management (dic-2025) [C3, C4].',
      'Salida del director de operaciones (18-nov-2026), un día después de los resultados anuales [C5].',
      'Venta de las acciones de 172.504 opciones ejercidas por el consejero delegado el 27-mar-2026 (mantiene 700.068 acciones y 1,59 M de opciones) [C6].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo.ratio_salario_medio', tipo: 'Complemento', intentos: '1) informe de remuneraciones FY25; 2) informe de sostenibilidad FY25; 3) cálculo con la plantilla, que el informe anual no da en cifra', decision: 'Omitido' },
  ],
};
guarda('C', Cn);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de TNE.AX, STW.AX y ^AXIJ (precio, rango, betas, rentabilidades y cierres de ejercicio; herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/TNE.AX/history' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary (earningsTrend, financialData) de TNE.AX y nueve comparables; tipos de cambio AUDUSD, GBPAUD, EURAUD, CADAUD y AUDNZD del 19-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/TNE.AX/analysis' },
  { id: 3, titulo: 'FNArena: consenso de TNE (BPA FY26 49,6 centavos, DPA 34,3; objetivo medio 32,19 AUD) y revisiones de Morgan Stanley y Jarden', editor: 'FNArena', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://www.fnarena.com/stock-price-analysis/it-support/TNE' },
  { id: 4, titulo: 'Investing.com: consenso de 16 analistas (10 comprar, 4 mantener, 2 vender; objetivo medio 31,14 AUD, 22-36,56)', editor: 'Investing.com', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.investing.com/equities/technology-one-consensus-estimates' },
  { id: 5, titulo: 'RBA, tabla F2: rendimiento del bono del Gobierno australiano a 10 años (5,314 % el 14-oct-2026) y del indexado (2,983 %)', editor: 'Reserve Bank of Australia', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.rba.gov.au/statistics/tables/csv/f2-data.csv' },
  { id: 6, titulo: 'Damodaran, prima de riesgo implícita mensual del S&P 500 (ERPbymonth, octubre de 2026: 4,20 %)', editor: 'NYU Stern (A. Damodaran)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Bain Capital completes acquisition of PowerSchool (valor empresa ≈ 5.600 M USD) y lectura de Piper Sandler (6,9 veces ventas de los próximos 12 meses)', editor: 'Vista Equity Partners / Investing.com', tipo: 'Prensa', fecha: '2024-10-01', url: 'https://www.vistaequitypartners.com/news/bain-capital-completes-acquisition-of-powerschool/' },
  { id: 8, titulo: 'Instructure to be Acquired by KKR for $4.8 Billion', editor: 'Nasdaq (nota de prensa)', tipo: 'Prensa', fecha: '2024-07-25', url: 'https://www.nasdaq.com/press-release/instructure-be-acquired-kkr-48-billion-2024-07-25' },
  { id: 9, titulo: 'Listado anual de anuncios de TNE en la ASX (2025 y 2026)', editor: 'ASX', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.asx.com.au/asx/v2/statistics/announcements.do?by=asxCode&asxCode=TNE&timeframe=Y&year=2026' },
  { id: 10, titulo: 'Down 16%: What on earth is going on with TechnologyOne shares?', editor: 'The Motley Fool Australia', tipo: 'Prensa', fecha: '2026-06-24', url: 'https://www.fool.com.au/2026/06/24/down-16-what-on-earth-is-going-on-with-technologyone-shares/' },
  { id: 11, titulo: 'TechnologyOne shares slump despite beating full-year profit forecast and boosting dividends (ARR +18 % frente a ≈ 21 % esperado, sin guía FY26)', editor: 'Business News Australia', tipo: 'Prensa', fecha: '2025-11-18', url: 'https://www.businessnewsaustralia.com/articles/tecnologyone-shares-slump-despite-beating-full-year-profit-forecast.html' },
  { id: 12, titulo: 'Why This ASX 200 Tech Stock Is Under Pressure Despite Another Record Result (H1 FY26: valoración, tipos e IA)', editor: 'Kalkine Media', tipo: 'Prensa', fecha: '2026-05-20', url: 'https://kalkinemedia.com/au/stocks/technology/why-this-asx-200-tech-stock-is-under-pressure-despite-another-record-result' },
  { id: 13, titulo: 'Annual Report 2025 y FY24: cierres y BPA para los múltiplos históricos; acciones en circulación', editor: 'Technology One Limited', tipo: 'Primaria', fecha: '2025-11-18', url: `${ASX}/20251118/pdf/06s446mgnpp1m0.pdf` },
  { id: 14, titulo: 'The Motley Fool Australia: página de TNE (artículos de agosto-octubre de 2026; «6 ASX shares hit by broker downgrades this week», 15-oct-2026)', editor: 'The Motley Fool Australia', tipo: 'Prensa', fecha: '2026-10-16', url: 'https://www.fool.com.au/tickers/asx-tne/' },
];
const id = bolsa.identificacion;
const raw = (o) => o?.raw ?? null;
// Comparables: PER de los próximos 12 meses = precio ÷ (BPA del consenso de Yahoo ponderado por meses de los dos ejercicios que caen en oct-26/sep-27).
// Divisas a AUD del 19-oct-2026 [D2]: USD 1,4317; GBP 1,90786; EUR 1,6066; CAD 1,0145; NZD 1/1,232.
const FX = { AUD: 1, USD: 1.4317, GBP: 1.90786, GBp: 0.0190786, EUR: 1.6066, CAD: 1.0145, NZD: 1 / 1.232 };
const COMP = [
  { s: 'TYL', nombre: 'Tyler Technologies', pais: 'US', w: 0.2, epsCur: 'USD', crec: 10.1 },
  { s: 'SGE.L', nombre: 'Sage Group', pais: 'GB', w: 0.0, epsCur: 'GBP', crec: 9.2 },
  { s: 'NEM.DE', nombre: 'Nemetschek', pais: 'DE', w: 0.2, epsCur: 'EUR', crec: 21.4 },
  { s: 'XRO.AX', nombre: 'Xero', pais: 'NZ', w: 0.45, epsCur: 'NZD', crec: 20.8 },
  { s: 'WTC.AX', nombre: 'WiseTech Global', pais: 'AU', w: 0.7, epsCur: 'USD', crec: 9.7 },
  { s: 'WDAY', nombre: 'Workday', pais: 'US', w: 0.28, epsCur: 'USD', crec: 10.5 },
  { s: 'OCL.AX', nombre: 'Objective Corporation', pais: 'AU', w: 0.7, epsCur: 'AUD', crec: 9.0 },
  { s: 'CSU.TO', nombre: 'Constellation Software', pais: 'CA', w: 0.2, epsCur: 'USD', crec: 16.7 },
];
const empresas = COMP.map((c) => {
  const x = yq[c.s]; const p = x.price, f = x.financialData, k = x.defaultKeyStatistics;
  const tr = x.earningsTrend.trend; const y0 = raw(tr.find((t) => t.period === '0y').earningsEstimate.avg), y1 = raw(tr.find((t) => t.period === '+1y').earningsEstimate.avg);
  const eps = c.w * y0 + (1 - c.w) * y1;
  const precio = raw(p.regularMarketPrice) * FX[p.currency] ; // en AUD
  const per = precio / (eps * FX[c.epsCur]);
  const capAud = raw(p.marketCap) * (p.currency === 'GBp' ? FX.GBP : FX[p.currency]);
  const fcfAud = raw(f.freeCashflow) * FX[f.financialCurrency];
  const dn = (raw(f.totalDebt) - raw(f.totalCash)) / raw(f.ebitda);
  return {
    nombre: c.nombre, ticker: c.s, pais: c.pais, capitalizacion: Math.round(capAud / 1e6), ev_ventas: r2(raw(k.enterpriseToRevenue)),
    ev_ebitda_ltm: r1(raw(k.enterpriseToEbitda)), ev_ebitda_ntm: null, per_ntm: r1(per), crecimiento_pct: c.crec,
    margen_ebitda_pct: r1(raw(f.ebitdaMargins) * 100), roic_pct: { TYL: 8.9, 'NEM.DE': 19.2, 'CSU.TO': 21.7 }[c.s] ?? null, dn_ebitda: r1(dn), fcf_yield_pct: r1(fcfAud / capAud * 100),
  };
});
const tneY = yq['TNE.AX'].earningsTrend.trend;
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Technology One Limited', nombre_corto: 'TechnologyOne', ticker: 'TNE', isin: 'AU000000TNE8', mercado: 'ASX (Australian Securities Exchange)', indice_referencia: 'S&P/ASX 200',
    pais: 'Australia', pais_iso: 'AU', sector: 'Tecnologías de la información', industria: 'Software de aplicaciones', sede: 'Brisbane (Fortitude Valley, Queensland)', fundacion: '1987', empleados: null, web: 'https://www.technology1.com',
    precio: id.precio, fecha_precio: id.fecha_precio, acciones: 330.0, capitalizacion_publicada: Math.round(raw(yq['TNE.AX'].price.marketCap) / 1e6), free_float_pct: 94.0,
    max_52s: id.max_52s, min_52s: id.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M AUD/día (3 meses)`, proximos_resultados: '2026-11-17',
  },
  consenso: {
    guidance: 'Guía FY26 (ejercicio cerrado el 30-sep-2026), dada en la junta del 18-feb-2026 y reafirmada el 19-may-2026: beneficio antes de impuestos +18-20 % (≈ 214-218 M sobre 181,5 M) y ARR +16-18 % (≈ 643-654 M), ambos en el extremo alto; margen antes de impuestos del 30 % al 32 %; flujo de caja libre igual al beneficio neto; dividendo del 65-75 % del beneficio [A8, A12]. A medio plazo: ARR de más de 1.000 M en FY30, margen antes de impuestos del 35 % o más y «doblar cada cinco años» [A8]. Los resultados de FY26 se publicarán hacia el 17-nov-2026 (tercer martes de noviembre, como en 2025) [A9].',
    estimaciones: [
      { periodo: 'FY2026e', ingresos: r1(raw(tneY.find((t) => t.period === '0y').revenueEstimate.avg) / 1e6), ebitda: null, ebit: null, bpa: r3(raw(tneY.find((t) => t.period === '0y').earningsEstimate.avg)), dpa: 0.343, fuente: 'Yahoo Finance (15 analistas; ingresos totales) y FNArena (DPA) [D2, D3]' },
      { periodo: 'FY2027e', ingresos: r1(raw(tneY.find((t) => t.period === '+1y').revenueEstimate.avg) / 1e6), ebitda: null, ebit: null, bpa: r3(raw(tneY.find((t) => t.period === '+1y').earningsEstimate.avg)), dpa: 0.371, fuente: 'Yahoo Finance (16 analistas) y Morgan Stanley vía FNArena (DPA) [D2, D3]' },
    ],
    recomendaciones: { n_analistas: 16, comprar: 10, mantener: 4, vender: 2, po_medio: 31.14, po_min: 22.0, po_max: 36.56 },
    revisiones: 'Solo hay una fuente gratuita con estimaciones completas (Yahoo, 15-16 analistas): BPA de FY26 de 0,497 AUD y de FY27 de 0,602; ingresos de 679 M y 785 M [D2]. FNArena da 0,496 para FY26 y Morgan Stanley 0,598 para FY27 [D3]. Los objetivos se han recortado desde los máximos de 2025: Ord Minnett bajó a 29,78 (desde 33,04) y UBS mantiene «Hold» con 32,70 (15-oct-2026); el objetivo medio está en 31,14-32,19 AUD, a la par del precio [D3, D4, D14]. Tras los resultados de mayo, Jarden subió a sobreponderar con 31 AUD [D3]. No encontramos el histórico de revisiones del BPA a 3 y 12 meses en fuente gratuita: lo que se ve es que el BPA de FY26 apenas se ha movido desde la guía de febrero (la guía fija el beneficio) y lo que ha bajado es el múltiplo.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: 'TNE ha sido una de las mejores acciones de la ASX en diez años (+18,7 % anual frente al +4,5 % del índice, en precio) [D1]: subió un 104 % en 2024, cuando el mercado premió su crecimiento en la nube, hasta 39,99 AUD en octubre de 2025. Desde ahí cayó un 52 % hasta el 13-feb-2026 (20,14 AUD) en dos golpes: los resultados de FY25 (−17,2 % el 18-nov-2025, por un ARR por debajo de lo esperado y sin guía) y la venta de todo el software por el miedo a la IA en febrero de 2026 [D11, D1]. La guía al alza de la junta (18-feb) y el semestre en línea le devolvieron a 31,30 AUD, +55 % desde el mínimo y −19 % en doce meses, con el índice sectorial tecnológico a −40 % [D1]. Beta mensual de 5 años de 1,30 frente al ASX 200 y volatilidad del 44 % anual: es una acción de múltiplo alto que se mueve con los tipos y con el sentimiento sobre el software.',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((c) => ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'].includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Con el cierre de cada 30 de septiembre y el BPA real del año siguiente, TNE ha cotizado entre 33,6 veces (FY22) y 77,8 veces (FY25, sobre nuestro BPA de FY26), con una mediana de cinco años de 43 veces [D1, D13]. El múltiplo se expandió de 2023 a 2025 porque el mercado pagó la llegada al 100 % SaaS, la mejora del ARR y el Reino Unido, y con tipos aún altos. Hoy, a 31,30 AUD, paga ≈ 54 veces nuestro BPA de FY27: por debajo del pico, pero un 25 % por encima de su mediana y más del doble que sus comparables. Lo que ha cambiado es la prima de riesgo del software por la IA, que el mercado aplica a todo el sector sin distinguir.',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Software vertical o de gestión con cobro recurrente: tres de gobiernos y sector público (Tyler, Objective, Constellation, que compra software para administraciones), tres de ERP y gestión (Workday, Sage, Xero), una de diseño para construcción (Nemetschek) y una australiana de crecimiento (WiseTech). No hay un comparable puro: los del sector público de EE. UU. no compiten en Australia y los ERP grandes (SAP, Oracle) son demasiado diversos. PER de los próximos 12 meses con el consenso de Yahoo ponderado por meses; las bases de BPA están mezcladas (Workday y WiseTech, ajustado; el resto, cercano al publicado), y el EV/EBITDA de Yahoo no es comparable con el de TNE (que amortiza el desarrollo activado fuera del EBITDA): la valoración por comparables usa el PER.',
    empresas,
    comentario: 'TNE es la más cara del grupo con diferencia: ≈ 52 veces el BPA del consenso de los próximos 12 meses frente a una mediana de ≈ 22 veces, con un crecimiento esperado de ventas (+15,6 %) similar al de Nemetschek, Xero y Constellation (17-21 %), que cotizan a 17-40 veces [D2]. Su prima no se explica por el crecimiento: se explica por la calidad (margen antes de impuestos del 30 % sin deuda, bajas del 1 %, NRR del 115 %) y por ser la única empresa de software grande y rentable de la ASX junto a WiseTech y Xero. La regresión de múltiplo contra crecimiento la deja muy por encima de la línea. Usaríamos el PER, y aun dando a TNE una prima del 50 % sobre la mediana (≈ 33 veces), el valor implícito quedaría muy por debajo del precio.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-10', objetivo: 'PowerSchool (software para colegios, EE. UU.)', comprador: 'Bain Capital', ev: Math.round(5600 * 1.4317), ev_ventas: 6.9, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor empresa ≈ 5.600 M USD; 6,9 veces las ventas de los próximos 12 meses según Piper Sandler [D7].' },
      { fecha: '2024-07', objetivo: 'Instructure (plataforma educativa Canvas, EE. UU.)', comprador: 'KKR', ev: Math.round(4800 * 1.4317), ev_ventas: null, ev_ebitda: null, prima_pct: 16.4, excluir: false, comentario: 'Valor empresa ≈ 4.800 M USD; prima del 16 % sobre el precio no afectado de 20,27 USD [D8].' },
    ],
    comentario: 'Las compras de software para educación y sector público por capital riesgo en 2024 se pagaron a unas 7 veces las ventas (PowerSchool) [D7], muy por debajo de las ≈ 15,9 veces ventas a las que cotiza hoy TNE [D2]. Dicen que el valor de control de un software vertical comparable no justifica el precio actual. TNE, sin accionista de control y con una capitalización de ≈ 10.250 M AUD, podría interesar a un fondo, pero a este múltiplo una oferta exigiría una prima difícil de financiar. Solo dos operaciones con cifra verificada: no pesan en la valoración.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) fichero diario de posiciones cortas de ASIC (RR…SSDailyAggShortPos.csv); 2) búsqueda de prensa sobre posiciones cortas en TNE; 3) Yahoo (shortPercentOfFloat vacío para la ASX)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'estimaciones FY2028e y EBITDA del consenso', tipo: 'Complemento', intentos: '1) MarketScreener (no abre la ficha de TNE); 2) Yahoo earningsTrend (solo FY26-FY27); 3) FNArena e Investing (sin cifras de FY28 ni EBITDA)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'múltiplos de 3 o más operaciones', tipo: 'Complemento', intentos: '1) notas de prensa de PowerSchool e Instructure; 2) búsqueda de Civica (Blackstone) y Altium (Renesas); 3) ficha sectorial de software del repositorio (sin transacciones)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'The Motley Fool Australia: página de TNE (artículos de agosto a octubre de 2026)', editor: 'The Motley Fool Australia', tipo: 'Foros y redes', fecha: '2026-10-16', url: 'https://www.fool.com.au/tickers/asx-tne/' },
  { id: 2, titulo: 'Down 16%: What on earth is going on with TechnologyOne shares?', editor: 'The Motley Fool Australia', tipo: 'Foros y redes', fecha: '2026-06-24', url: 'https://www.fool.com.au/2026/06/24/down-16-what-on-earth-is-going-on-with-technologyone-shares/' },
  { id: 3, titulo: 'Why are Technology One shares crashing 4% today? (resultados del H1 FY26)', editor: 'The Motley Fool Australia', tipo: 'Foros y redes', fecha: '2026-05-19', url: 'https://www.fool.com.au/2026/05/19/why-are-technology-one-shares-crashing-4-today/' },
  { id: 4, titulo: 'The 4 questions that TechnologyOne needs to answer', editor: 'Livewire Markets', tipo: 'Foros y redes', fecha: '2026-05', url: 'https://www.livewiremarkets.com/wires/the-4-questions-that-technologyone-needs-to-answer' },
  { id: 5, titulo: 'Down 23% and 58%, should I buy TechnologyOne and Xero shares now?', editor: 'Webull / The Motley Fool', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.webull.com/news/15341950276690944' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'The Motley Fool Australia (página de TNE)', fecha: '2026-10', n_comentarios: 12, tono: 'Positivo', resumen: 'Los artículos de septiembre y octubre presentan a TNE como acción para «comprar y mantener una década» y «oportunidad rara» tras la caída, y la incluyen entre las rebajas de recomendación de la semana del 15-oct [E1].' },
      { plataforma: 'The Motley Fool Australia (junio de 2026)', fecha: '2026-06', n_comentarios: 1, tono: 'Neutro', resumen: 'Explica la caída del 16 % desde el máximo de junio como venta de todo el software de crecimiento, sin noticia de la empresa [E2].' },
      { plataforma: 'The Motley Fool Australia (mayo de 2026)', fecha: '2026-05', n_comentarios: 1, tono: 'Negativo', resumen: 'La acción bajó un 4 % con un semestre en línea: el mercado esperaba que subiera la guía y no lo hizo [E3].' },
      { plataforma: 'Livewire Markets', fecha: '2026-05', n_comentarios: 1, tono: 'Dividido', resumen: 'Gestores australianos plantean cuatro preguntas: si la IA erosiona el modelo, cuánto aporta Plus, si el Reino Unido acelera y si el múltiplo aguanta [E4].' },
      { plataforma: 'Webull / Motley Fool (septiembre de 2026)', fecha: '2026-09', n_comentarios: 1, tono: 'Dividido', resumen: 'Compara TNE (−23 %) y Xero (−58 %) desde máximos: TNE se ve más defensiva, pero aún cara [E5].' },
    ],
    temas: [
      { tema: 'La IA destruye el software por puesto', postura: 'Dividida', peso: 'Alto', contraste: 'TNE no cobra por puesto sino por inmuebles, alumnos y uso de IA, y la NRR sigue en el 114 % [A10]; el riesgo real es el poder de negociación de los clientes y la sustitución de módulos, no la base de cobro.' },
      { tema: 'Valoración demasiado alta', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: ≈ 52 veces el BPA de los próximos 12 meses frente a ≈ 22 de los comparables y 43 de su mediana [D2].' },
      { tema: 'Calidad y defensividad (compounder)', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: 16 años de récords, sin deuda y guía cumplida [A9, C9]; pero la calidad ya está en el precio.' },
      { tema: 'Reino Unido como segundo motor', postura: 'Dividida', peso: 'Medio', contraste: 'ARR británico +23 % hasta 53 M, pero ventas nuevas −5 % en el H1 FY26 [A10].' },
    ],
    lectura: 'El inversor particular australiano sigue viendo a TNE como una de las pocas empresas de calidad de la tecnología local y compra en las caídas; el debate profesional es si la IA cambia su modelo y si el múltiplo aguanta. El sentimiento no es extremo: ni euforia ni capitulación. Coincide con nuestro análisis en la calidad y discrepa en el precio, que es donde está nuestra tesis. Un riesgo que los foros señalan y conviene vigilar es que la guía de FY26 se cumpla «solo» en línea, como en mayo, y el mercado vuelva a castigarlo.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas');

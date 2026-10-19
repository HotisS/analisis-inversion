// Escribe las notas A-E de Pernod Ricard (corte 2026-10-19) con los datos primarios descargados en notas/docs.
// Uso: node informes/pernod-ricard-2026-10-19/notas/construir-notas.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const D = dirname(fileURLToPath(import.meta.url));
const leer = (f) => JSON.parse(readFileSync(join(D, f), 'utf8'));
const escribir = (f, o) => writeFileSync(join(D, f), JSON.stringify(o, null, 2) + '\n');

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Universal Registration Document 2025-2026 (incluye el informe financiero anual y las cuentas consolidadas a 30-jun-2026)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-09-16', url: 'https://www.pernod-ricard.com/system/files/2026-09/PERNOD_RICARD_DEU_2025-2026_EN.pdf' },
  { id: 2, titulo: 'FY26 Sales and Results (presentación, 27-ago-2026)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-08-27', url: 'https://www.pernod-ricard.com/system/files/2026-08/Pernod%20Ricard%20FY26%20Financial%20Communication.pdf' },
  { id: 3, titulo: 'Full Year FY26 Sales and Results (nota de prensa)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-08-27', url: 'https://www.pernod-ricard.com/system/files/news/downloads/2026-08/2026%2008%2027%20Full%20Year%2026.pdf' },
  { id: 4, titulo: 'Q1 FY27 Sales (nota de prensa, 15-oct-2026)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.pernod-ricard.com/system/files/news/downloads/2026-10/2026%2010%2015%20Pernod%20Ricard%20Q1%20FY27%20Release.pdf' },
  { id: 5, titulo: 'Transcript FY26 Sales and Results Call', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-08-27', url: 'https://www.pernod-ricard.com/sites/default/files/inline-files/Transcript%20Pernod%20Ricard%20F26%20Sales%20and%20Results%20Call.pdf' },
  { id: 6, titulo: 'H1 FY26 Sales and Results (presentación)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-02-19', url: 'https://www.pernod-ricard.com/sites/default/files/2026-02/Pernod%20Ricard%20FY26%20H1%20Financial%20Communication.pdf' },
  { id: 7, titulo: 'H1 FY26 results call transcript (19-feb-2026)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-02-19', url: 'https://www.pernod-ricard.com/system/files/2026-10/RI-EP_Transcript_2026-02-19.pdf' },
  { id: 8, titulo: 'Sales and Results FY25 (nota de prensa con anexos)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2025-08-28', url: 'https://www.pernod-ricard.com/sites/default/files/2025-08/Sales%20and%20Results%20FY25.pdf' },
  { id: 9, titulo: 'Universal Registration Document 2023-2024', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2024-09', url: 'https://www.pernod-ricard.com/sites/default/files/inline-files/PERNOD-RICARD_DEU_23-24_VUK_MEL_2409_1.pdf' },
  { id: 10, titulo: 'Universal Registration Document 2021-2022', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2022-09-27', url: 'https://www.pernod-ricard.com/sites/default/files/2022-09/PER_URD2021_EN_2022_09_27_MEL_3.pdf' },
  { id: 11, titulo: 'Informes anuales ESEF de Pernod Ricard FY2021-FY2025 (xBRL-JSON, LEI 52990097YFPX9J0H5D87)', editor: 'XBRL International (filings.xbrl.org)', tipo: 'Primaria', fecha: '2025-09', url: 'https://filings.xbrl.org/52990097YFPX9J0H5D87/' },
  { id: 12, titulo: 'Consensus as of October 9th 2026 (ventas orgánicas del 1T FY27: −1,7 %, rango −3,8 % / −0,2 %)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-10-09', url: 'https://www.pernod-ricard.com/en/consensus-october-9th-2026' },
];

const c = (periodo, ingresos, coste_ventas, ap, estructura, amort, ebit, rf, imp, min, bn, gf, bpa, dpa, acc) => ({
  periodo, ingresos, coste_ventas, gastos_generales: ap + estructura, ebitda: ebit + amort, amortizaciones: amort, ebit,
  resultado_financiero: rf, bai: ebit + rf, impuestos: imp, minoritarios: min, beneficio_neto: bn, gastos_financieros: gf,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
});
const cuenta = [
  c('FY2021', 8824, 3531, 1393, 1477, 367, 2423, -262, 526, 24, 1612, 410, 6.16, 3.12, 261.7),
  c('FY2022', 10701, 4228, 1698, 1751, 381, 3024, -215, 651, 34, 2124, 308, 8.18, 4.12, 259.7),
  c('FY2023', 12137, 4891, 1939, 1959, 417, 3348, -291, 691, 25, 2340, 380, 9.11, 4.70, 256.9),
  c('FY2024', 11598, 4623, 1872, 1987, 441, 3116, -417, 646, 53, 2000, 505, 7.90, 4.70, 253.2),
  c('FY2025', 10959, 4443, 1679, 1886, 422, 2951, -455, 619, 49, 1829, 584, 7.26, 4.70, 252.0),
  c('FY2026', 9404, 3909, 1409, 1663, 413, 2423, -421, 487, 38, 1476, 512, 5.85, 4.70, 252.3),
];
const b = (periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas) => ({
  periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores,
  activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas,
});
const historicoB = [
  b('FY2021', 32147, 10321, 4218, 17072, 5505, 10725, 3177, 6555, 1126, 2337, 2078, 9086, 508, 14829, 246, 11371),
  b('FY2022', 36012, 11896, 6107, 19759, 6145, 11512, 3591, 7369, 1388, 3019, 2527, 10664, 507, 15944, 309, 12492),
  b('FY2023', 37676, 12008, 6935, 20961, 6750, 12250, 3901, 8104, 1814, 3461, 1609, 11387, 484, 15717, 998, 12268),
  b('FY2024', 39185, 13065, 7091, 22388, 6806, 12234, 3982, 8255, 1581, 2930, 2683, 13170, 448, 15749, 1048, 12304),
  b('FY2025', 37080, 12292, 6442, 20854, 6406, 11515, 4206, 8418, 1484, 2711, 1829, 12153, 435, 15212, 1014, 11769),
  b('FY2026', 37297, 12396, 5013, 20757, 6458, 11542, 4187, 8470, 1372, 2578, 1993, 12217, 449, 15500, 1040, 12057),
];
const f = (periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras) => ({
  periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, emision_acciones: 0, intereses_en_financiacion: 0,
});
const historicoF = [
  f('FY2021', 1999, 433, 97, 131, 15, 704, 20),
  f('FY2022', 2294, 506, 115, 735, 12, 826, 813),
  f('FY2023', 2033, 702, 116, 1159, 30, 1072, 786),
  f('FY2024', 1727, 773, 125, 245, 334, 1208, 334),
  f('FY2025', 1788, 667, 113, 174, 308, 1201, 11),
  f('FY2026', 1579, 391, 101, 64, 438, 1226, 10),
];

const A = {
  _estado: 'Completo y recomprobado el 19-oct-2026: cuentas FY21-FY25 del XBRL ESEF (cuentas.mjs con el LEI, 19-oct) contra los documentos de registro; FY25-FY26 contra la nota de resultados del 27-ago-2026 (cuenta resumida, balance, deuda neta, BPA diluido); 1T FY27 de la nota del 15-oct-2026.',
  financieros: {
    cuenta: cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 9404, ebitda: 2836, ebit: 2423, beneficio_neto: 1476, bpa: 5.85, dpa: 4.70, dpa_extraordinario: 0, fcf: 1197, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: 'FY2023', descripcion: 'Compras de participaciones y negocios por 1.159 M (estado de flujos) y salto de los minoritarios de 309 a 998 M: el activo crece 1.664 M [9].' },
      { periodo: 'FY2026', descripcion: 'Venta de Imperial Blue (efectiva en diciembre de 2025) y de vinos (Mumm Napa, Kenwood): efecto perímetro de −582 M en ventas y −114 M en el resultado operativo recurrente [2, 1].' },
    ],
    comentario: 'Las ventas caen tres años seguidos desde el máximo de 12.137 M del FY23 hasta 9.404 M en el FY26 (−22,5 %): orgánico −1 % en el FY24, −3 % en el FY25 y −3,9 % en el FY26, más divisa (−568 M en el FY26) y ventas de negocios (−582 M) [2, 8]. EE. UU. (−14 % orgánico en el FY26) y China (−19 %) explican la caída; sin ellos el grupo creció un 0,5 % [2]. El margen operativo recurrente pasó del 27,6 % del FY23 al 25,8 % (−35 pb orgánicos en el FY26, −117 pb publicados): el margen bruto restó 221 pb (precio/mezcla negativo, aranceles −45 pb, inflación del líquido envejecido) y los gastos de estructura, que bajaron un 8 %, sumaron 109 pb [2]. El 1T FY27 (15-oct-2026) mejora: −0,9 % orgánico y −6,3 % publicado, con volúmenes +6 % y EE. UU. −10 %, China −25 % e India +19 % [4].',
    ajustes: 'La cuenta va en la base recurrente de la empresa: EBIT = resultado operativo recurrente (PRO), resultado financiero, impuesto y minoritarios recurrentes, beneficio neto recurrente atribuido y BPA recurrente diluido [2, 9, 10]. La diferencia con las NIIF son los «otros ingresos y gastos operativos» (reestructuraciones, deterioros, plusvalías de ventas de marcas): −261 M en el FY26 y −208 M en el FY25, con un beneficio neto publicado de 1.203 M (BPA 4,77) y 1.626 M (6,45) [1]. Se repiten todos los años (reestructuración «Fit for Future» y ventas de marcas), así que no son excepcionales: en la valoración se tratan como parte del coste vía la tasa de reinversión y se dicen en el texto. El EBITDA es el de la empresa (PRO más amortizaciones), el mismo que usa para la deuda neta/EBITDA (3,7x) y que da MarketScreener (2.836 M).',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T25', ingresos: 2278, crecimiento_pct: -2.9, crecimiento_organico_pct: -3.2, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '4T25', ingresos: 2506, crecimiento_pct: -5.8, crecimiento_organico_pct: -0.3, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1T26', ingresos: 2384, crecimiento_pct: -14.3, crecimiento_organico_pct: -7.3, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '2T26', ingresos: 2869, crecimiento_pct: -15.4, crecimiento_organico_pct: -4.3, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '3T26', ingresos: 1946, crecimiento_pct: -14.6, crecimiento_organico_pct: 0.0, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '4T26', ingresos: 2205, crecimiento_pct: -12.0, crecimiento_organico_pct: -2.3, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1T27', ingresos: 2234, crecimiento_pct: -6.3, crecimiento_organico_pct: -0.9, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'Pernod publica ventas cada trimestre y resultados cada semestre (el trimestre fiscal empieza en julio: 1T27 = julio-septiembre de 2026). En los resultados del FY26 (27-ago) la dirección habló de un año de «transición»: orgánico del 1S −5,9 % y del 2S −1,3 %, guía FY27 de ventas orgánicas «ampliamente estables» con caídas en EE. UU. y China por ajuste de inventarios, y marco FY27-FY29 «cerca del extremo bajo» del +3 % a +6 % [2, 5]. Los analistas preguntaron sobre todo por el margen bruto (líquido envejecido más caro, conflicto de Oriente Medio, devolución de aranceles en EE. UU.) y por cómo encaja una media del 3 % con un FY27 plano: la directora financiera entrante dijo que el arancel neto en EE. UU. y China se compensa en parte con el tratado India-Reino Unido y no dio cifras [5]. Frente a febrero, cuando la guía FY26 hablaba de mejora «sesgada al 2S» y de inversiones estratégicas de 750 M, el discurso ya da por tocado fondo en China (ventas al consumidor de vuelta al crecimiento en el Medio Otoño) [7, 4]. El 1T27 (15-oct) batió el consenso que recopila la propia empresa: −0,9 % orgánico frente a −1,7 % (rango −3,8 % a −0,2 %) [4, 12]. La dirección evitó cuantificar el margen operativo orgánico del FY27 («lo defenderemos con fuerza») y la salida a bolsa de Pernod Ricard India, que dice estar preparando [4, 5].',
    confianza: 'Alta',
  },
  balance: {
    historico: historicoB,
    vencimientos: [
      { anio: 'FY2027', importe: 490 }, { anio: 'FY2028', importe: 1833 }, { anio: 'FY2029', importe: 1350 }, { anio: 'FY2030', importe: 1500 },
      { anio: 'FY2031', importe: 1500 }, { anio: 'FY2032', importe: 1300 }, { anio: 'FY2033+', importe: 4249 },
    ],
    liquidez: 'Caja de 1.993 M a 30-jun-2026 y unos 2.800 M de líneas comprometidas no dispuestas, de ellas una sindicada revolving de 2.100 M [1].',
    rating: 'Moody’s Baa1/P2 y S&P BBB+/A2 [1].',
    coste_deuda_pct: 3.4,
    vida_media_anios: null,
    otros_pasivos: 'Factoring y titulización de clientes por 1.105 M a 30-jun-2026 (1.122 M un año antes): las cuentas a cobrar brutas son 2.332 M y las netas 1.228 M [2]; es financiación y en el puente se suma a la deuda. El dividendo a cuenta de 592 M figuraba como pasivo corriente al cierre y se pagó el 24-jul-2026 [1]. Provisiones para pensiones de 216 M (265 M en el FY25), otras provisiones no corrientes de 310 M y corrientes de 125 M [1]. Los préstamos tienen covenants de apalancamiento financiero según el URD; la deuda neta/EBITDA es de 3,7x con objetivo por debajo de 3x en el FY29 [1, 2]. Pasivos por impuestos diferidos de 3.125 M ligados sobre todo a las marcas [1]. Sin litigios materiales provisionados por encima de lo habitual.',
    comentario: 'La deuda neta publicada (con arrendamientos) bajó de 10.951 M en el FY24 a 10.727 M en el FY25 y 10.662 M en el FY26, pero el ratio sobre EBITDA subió de 3,3x a 3,7x porque el EBITDA cayó un 16 % [2]. El circulante es el rasgo del negocio: 7.203 M de existencias envejecidas (whisky, coñac) sobre 8.470 M de inventario, un 77 % de las ventas; la empresa recortó la inversión en existencias estratégicas de 645 M (FY24) a 233 M (FY26) [2]. La caja libre cubre los dividendos solo con el factoring y las ventas de marcas: FCF de 1.197 M frente a 1.226 M de dividendos en el FY26 [2]. En el FY28 vencen 1.833 M de bonos con cupones del 0,5-3,75 %, que se refinanciarán por encima del 3,4 % de coste medio.',
    confianza: 'Alta',
  },
  flujos: {
    historico: historicoF,
    comentario: 'El flujo operativo (después de intereses e impuestos, que la empresa clasifica en explotación) cayó de 2.294 M en el FY22 a 1.579 M en el FY26 [1, 10]. La inversión en existencias estratégicas va dentro del circulante del flujo operativo (233 M en el FY26, 557 M en el FY25), y el capex de 391 M es la mitad del máximo de 773 M del FY24 [1, 2]. La empresa define la «caja libre» como flujo operativo menos capex neto: 1.197 M en el FY26, +6 %, con una conversión de caja del 91 % (74 % en el FY25) [2]. El capex de mantenimiento no se publica; estimación propia: unos 350-400 M, cerca de la amortización (413 M), porque el capex del FY26 ya está en ese nivel y la empresa habla de «inversiones estratégicas» que no pasarán de 700 M entre capex y existencias [2, 4]. Las ventas de marcas aportaron 438 M en el FY26 y 308 M en el FY25.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte & Associés y KPMG SA',
    anios_auditor: 23,
    opinion: 'Favorable (sin salvedades) sobre las cuentas consolidadas del FY26 [1]',
    comentario: 'Cuentas NIIF-UE auditadas por Deloitte (23 años seguidos) y KPMG (10 años) sin salvedades [1]. Los «otros gastos operativos» se repiten todos los años (−261 M en el FY26, −208 M en el FY25), sobre todo reestructuración y deterioros (106 M de deterioros netos en el FY26), y la empresa los excluye de su beneficio recurrente: el BPA publicado (4,77) queda un 18 % por debajo del recurrente (5,85) [1, 2]. Las existencias envejecidas no se amortizan y su coste sube con la inflación pasada del líquido, lo que retrasa el impacto en el margen [5]. El factoring de 1.105 M mejora la caja y el circulante; está estable desde hace dos años [2]. Los pagos en acciones son pequeños (16 M). El auditor señala como cuestión clave el deterioro de marcas: 40 M en la sociedad matriz [1].',
    senales: [
      { senal: 'Partidas «no recurrentes» que se repiten cada año', nivel: 'Media', comentario: 'Entre −208 y −261 M al año en el FY25-FY26: el BPA recurrente sobrestima el beneficio publicado en un 13-18 % [1, 2].' },
      { senal: 'Factoring de clientes por 1.105 M', nivel: 'Media', comentario: 'Reduce las cuentas a cobrar netas a 1.228 M frente a 2.332 M brutas; se trata como deuda en el puente [2].' },
      { senal: 'Dividendo por encima de la caja libre', nivel: 'Media', comentario: 'Dividendos de 1.226 M frente a FCF de 1.197 M en el FY26; el saldo del FY26 se ofrece en acciones [2, 1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: inversión en existencias y capex, gestión activa de la cartera (compras que creen valor), dividendo progresivo con un pago de en torno al 50 % del beneficio neto recurrente y recompras cuando lo anterior esté cubierto, manteniendo el grado de inversión [2]. El dividendo está en 4,70 EUR desde el FY23, un 80 % del BPA recurrente del FY26 (5,85); el saldo del FY26 (2,35 EUR, fecha ex 25-nov-2026, pago 18-dic) se podrá cobrar en acciones nuevas emitidas con un 10 % de descuento [1]. No hay recompras desde el FY24 (334 M) [1]. Objetivo de deuda neta/EBITDA por debajo de 3x en el FY29 [2].',
    adquisiciones: [
      { anio: '2023', objetivo: 'Compras de participaciones y marcas del FY23 (1.159 M en el estado de flujos)', importe: 1159, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Minoritarios contables de 998 M desde el FY23; sin deterioro material publicado del fondo de comercio [9].' },
      { anio: '2025', objetivo: 'Venta de la cartera de vinos (Jacob’s Creek, Campo Viejo y otras) y de Mumm Napa y Kenwood', importe: 308, ev_ebitda: null, financiacion: 'Venta (cobro)', resultado: 'Cobros de 308 M en el FY25 y parte de los 438 M del FY26; mejora el margen [1, 2].' },
      { anio: '2025', objetivo: 'Venta de Imperial Blue (India) a Tilaknagar, efectiva en diciembre de 2025', importe: null, ev_ebitda: null, financiacion: 'Venta (cobro)', resultado: 'Inmediatamente acretiva en margen según la empresa; resta ventas al perímetro hasta diciembre de 2026 [2, 1].' },
      { anio: '2026', objetivo: 'Fusión entre iguales con Brown-Forman (conversaciones confirmadas el 26-mar-2026)', importe: null, ev_ebitda: null, financiacion: 'Canje de acciones (propuesto)', resultado: 'Terminadas sin acuerdo el 28-abr-2026.' },
    ],
    comentario: 'En diez años la dirección pasó de comprar (marcas premium, RTD, agave) a vender: unos 1.500 M de ingresos brutos por ventas de marcas no estratégicas [2]. El capital se ha ido sobre todo a existencias envejecidas: las inversiones estratégicas llegaron a 1.400 M en el FY24, cuando ya caían las ventas, y ahora se recortan a 616 M [2]. El retorno de esa inversión no aparece todavía: el beneficio recurrente es un 37 % inferior al del FY23. El dividendo plano de 4,70 EUR con un pago del 80 % y la opción de cobro en acciones indican que se defiende el dividendo con dilución en vez de recortarlo, a diferencia de Diageo, que lo redujo a la mitad en febrero de 2026.',
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'vida_media_anios', tipo: 'Complemento', intentos: '1) Nota 4.8 de deuda del URD FY26 (no publica la vida media); 2) presentación FY26, diapositiva de vencimientos (imagen sin cifras); 3) calcularla con la lista de bonos de la diapositiva 66: posible, pero el saldo en USD no cuadra con el contable', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Universal Registration Document 2025-2026: capítulo 2 (gobierno y remuneraciones) y capítulo 9 (capital)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-09-16', url: 'https://www.pernod-ricard.com/system/files/2026-09/PERNOD_RICARD_DEU_2025-2026_EN.pdf' },
  { id: 2, titulo: 'Assemblée générale mixte du 27 octobre 2025: résultat du vote des résolutions', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2025-10-27', url: 'https://www.pernod-ricard.com/sites/default/files/2025-10/Re%CC%81sultat%20Des%20Vote_V2.pdf' },
  { id: 3, titulo: 'Déclarations des dirigeants (BDIF): Pernod Ricard, octubre de 2025 a octubre de 2026 (última, 2026DD1144515 del 16-oct: pignoración de 950.917 acciones por Société Paul Ricard el 14-oct; consultada el 19-oct)', editor: 'AMF', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://bdif.amf-france.org/back/api/v1/informations?RechercheTexte=PERNOD%20RICARD&TypesInformation=DD&From=0&Size=40' },
  { id: 4, titulo: 'Nombre total de droits de vote et d’actions au 30.09.2026', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-10-08', url: 'https://www.pernod-ricard.com/system/files/2026-10/DROITSVOTE_2026%2009%2030.pdf' },
  { id: 5, titulo: 'Pernod Ricard confirms discussions with Brown-Forman (nota de prensa)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-03-26', url: 'https://www.pernod-ricard.com/system/files/news/downloads/2026-03/2026%2003%2026%20Pernod%20ricard%20and%20Brown%20Forman.pdf' },
  { id: 6, titulo: 'Pernod and Brown-Forman fail to reach merger agreement', editor: 'The Spirits Business', tipo: 'Prensa', fecha: '2026-04-28', url: 'https://www.thespiritsbusiness.com/2026/04/pernod-and-brown-forman-fail-to-reach-merger-agreement/' },
  { id: 7, titulo: 'FY26 Sales and Results (presentación) y Q1 FY27 Sales (guía)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.pernod-ricard.com/system/files/news/downloads/2026-10/2026%2010%2015%20Pernod%20Ricard%20Q1%20FY27%20Release.pdf' },
  { id: 8, titulo: 'Sales and Results FY25 y H1 FY26 (guías publicadas)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-02-19', url: 'https://www.pernod-ricard.com/sites/default/files/2026-02/Pernod%20Ricard%20FY26%20H1%20Financial%20Communication.pdf' },
];
const cons = (nombre, cargo, tipo, desde, comisiones = null) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  _estado: 'Completo con el URD 2025-26, el acta de la junta de 2025 y la BDIF de la AMF (consultada el 19-oct-2026: sin declaraciones nuevas desde el 16-oct).',
  directivos: {
    equipo: [
      { nombre: 'Alexandre Ricard', cargo: 'Presidente y consejero delegado', desde: '2015', participacion_pct: 0.10, trayectoria: 'Nieto del fundador; en el grupo desde 2003, consejero delegado desde febrero de 2015 y presidente desde noviembre de 2015 [1]. Llevó las ventas a su máximo de 12.137 M en el FY23 y ha presidido la caída a 9.404 M; tiene 245.000 acciones a título personal y compró 22.581 en el último año [1, 3].' },
      { nombre: 'Mauve Croizat', cargo: 'Directora financiera (EVP Finance & IT)', desde: '2026', participacion_pct: null, trayectoria: 'Sustituye a Hélène de Tissot, que dejó el grupo el 30-sep-2026; presentó ya las cifras del FY26 en la conferencia de agosto [1].' },
      { nombre: 'Conor McQuaid', cargo: 'Presidente y consejero delegado de Pernod Ricard USA', desde: null, participacion_pct: null, trayectoria: 'Miembro del comité ejecutivo; responde del primer mercado (17 % de las ventas), que cayó un 14 % orgánico en el FY26 y no cumplió el objetivo de evolucionar en línea con el mercado [1].' },
      { nombre: 'Gilles Bogaert', cargo: 'EVP Global Markets', desde: null, participacion_pct: null, trayectoria: 'Miembro del comité ejecutivo a 30-jun-2026; dirige la red comercial reorganizada en 10 entidades [1].' },
      { nombre: 'Patricia Barbizet', cargo: 'Consejera coordinadora independiente', desde: '2018', participacion_pct: null, trayectoria: 'Contrapeso independiente de un presidente-consejero delegado de la familia; su mandato vence en la junta de 2026 [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2024', guia: 'Crecimiento orgánico de ventas bajo de un dígito y expansión del margen operativo', real: 'Ventas −1 % orgánico; resultado operativo recurrente +1,5 % orgánico', cumplida: 'Parcial' },
      { anio: 'FY2025', guia: 'Caída orgánica de ventas de un dígito bajo y defensa del margen', real: 'Ventas −3 % orgánico; margen operativo publicado estable (26,9 %)', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'Año de transición con mejora sesgada al 2S; inversiones estratégicas de unos 750 M; conversión de caja ≥ 80 %', real: 'Ventas −3,9 % (1S −5,9 %, 2S −1,3 %); inversiones de 616 M; conversión del 91 %', cumplida: 'Parcial' },
      { anio: 'FY27-FY29 (marco a medio plazo)', guia: 'Antes +3 % a +6 % de ventas orgánicas al año; desde ago-2026 «cerca del extremo bajo» de media', real: 'FY27 guiado plano; 1T27 −0,9 %', cumplida: 'No' },
    ],
    comentario: 'Equipo estable en la cúpula: Alexandre Ricard lleva once años al frente, sin cambios de presidente o consejero delegado en 24 meses [1]. La credibilidad de la guía es media: cumplió la defensa del margen y la caja, pero el marco de crecimiento a medio plazo se ha rebajado dos veces (4-7 % a 3-6 % y ahora al extremo bajo) [7, 8]. El cambio de directora financiera en septiembre de 2026 y la intentona fallida con Brown-Forman (marzo-abril) muestran presión para cambiar algo [1, 5, 6]. El presidente y la familia compran acciones (161,7 M el 19-jun-2026 por una sociedad familiar), señal de que ven el precio bajo [3]. No hay plan de sucesión público.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('Alexandre Ricard', 'Presidente y consejero delegado', 'Ejecutivo', '2012'),
      cons('Patricia Barbizet', 'Consejera coordinadora', 'Independiente', '2018'),
      cons('Albert Baladi', 'Consejero', 'Independiente', '2025'),
      cons('Virginie Fauvel', 'Consejera', 'Independiente', '2020'),
      cons('Max Koeune', 'Consejero', 'Independiente', '2023'),
      cons('Anne Lange', 'Consejera', 'Independiente', '2016'),
      cons('Jean Lemierre', 'Consejero', 'Independiente', '2025'),
      cons('Philippe Petitcolin', 'Consejero', 'Independiente', '2019'),
      cons('Kory Sorenson', 'Consejera', 'Independiente', '2015'),
      cons('Ian Gallienne', 'Consejero (presidente de Groupe Bruxelles Lambert)', 'Dominical', '2012'),
      cons('César Giron', 'Consejero (presidente de Société Paul Ricard)', 'Dominical', '2008'),
      cons('Société Paul Ricard (Patricia Ricard Giron)', 'Consejero', 'Dominical', '1983'),
      cons('Veronica Vargas', 'Consejera (familia Ricard)', 'Dominical', '2015'),
      cons('Carla Machado Leite', 'Consejera en representación de los empleados', 'Otro externo', '2022'),
      cons('Brice Thommen', 'Consejero en representación de los empleados', 'Otro externo', '2021'),
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 89.24, voto_remuneracion_contra_pct: 10.76, voto_remuneracion_contra_libre_pct: 14.6, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 5.25, fijo: 1.33, variable_corto: 1.17, variable_largo: 2.23, ratio_salario_medio: 63 },
    remuneracion: 'En el FY26 Alexandre Ricard devengó 1,33 M de fijo, 1,17 M de variable anual (108 % del fijo frente a un objetivo del 110 % y un máximo del 180 %) y acciones de rendimiento valoradas en 2,23 M: 5,25 M en total, 63 veces el coste medio por empleado del grupo [1]. El variable anual pesa un 80 % en cuatro métricas financieras (resultado operativo recurrente, beneficio neto recurrente, caja libre recurrente y margen, un 20 % cada una) y un 30 % en criterios no financieros; no cobró el criterio de EE. UU. [1]. Las acciones de rendimiento dependen del resultado operativo a tres años y del TSR frente a ocho competidores [1]. En la junta de 2025 la remuneración del FY25 obtuvo un 89,2 % a favor y un 10,8 % en contra; descontados los votos de la familia (22 % de los derechos), el rechazo del capital libre ronda el 14,6 % (estimación propia) [2].',
    accionistas: [
      { nombre: 'Concierto familiar Paul Ricard (Société Paul Ricard, Le Delos Invest I-III, Rigivar y miembros de la familia)', pct: 16.16, tipo: 'Familiar (22,84 % de los derechos de voto)', variacion: '+1,0 pt desde dic-2025 (15,16 %): compra de 2,52 M de acciones el 19-jun-2026 [1, 3]' },
      { nombre: 'Groupe Bruxelles Lambert', pct: 6.8, tipo: 'Inversor de referencia (consejero)', variacion: 'Estimación de la empresa a 31-mar-2026 [1]' },
      { nombre: 'Goldman Sachs Group (indirecta)', pct: 6.47, tipo: 'Financiero', variacion: 'Cruza el 5 % de los votos el 15-jun-2026, a la vez que la operación con derivados de Le Delos Invest II [1, 3]' },
      { nombre: 'Massachusetts Financial Services', pct: 6.27, tipo: 'Institucional', variacion: 'Supera el 5 % de los votos en julio de 2025 [1]' },
      { nombre: 'BlackRock', pct: 5.22, tipo: 'Institucional', variacion: 'Supera el 5 % el 29-may-2026 [1]' },
      { nombre: 'Capital Group', pct: 4.79, tipo: 'Institucional', variacion: 'Baja del 5 % el 24-mar-2026 [1]' },
      { nombre: 'Empleados', pct: 1.47, tipo: 'Empleados', variacion: 'A 30-jun-2026 [1]' },
      { nombre: 'Autocartera', pct: 0.18, tipo: 'Autocartera', variacion: '465.733 acciones sin voto a 30-sep-2026 [4]' },
    ],
    insiders: [
      { fecha: '2025-11-06', persona: 'Alexandre Ricard (presidente y consejero delegado)', operacion: 'Compra', acciones: 10000, importe: 0.83 },
      { fecha: '2025-11-14', persona: 'Alexandre Ricard (presidente y consejero delegado)', operacion: 'Compra', acciones: 6500, importe: 0.53 },
      { fecha: '2025-11-11', persona: 'Directivo (entrega de acciones de rendimiento, venta parcial)', operacion: 'Venta', acciones: 695, importe: 0.06 },
      { fecha: '2025-11-26', persona: 'Directivo', operacion: 'Venta', acciones: 526, importe: 0.04 },
      { fecha: '2025-12-08', persona: 'Persona vinculada a un consejero', operacion: 'Compra', acciones: 525, importe: 0.04 },
      { fecha: '2026-04-29', persona: 'Alexandre Ricard (presidente y consejero delegado)', operacion: 'Compra', acciones: 6081, importe: 0.38 },
      { fecha: '2026-04-29', persona: 'Persona vinculada a Veronica Vargas (consejera)', operacion: 'Compra', acciones: 3000, importe: 0.19 },
      { fecha: '2026-06-19', persona: 'Le Delos Invest II (sociedad de Société Paul Ricard, consejero)', operacion: 'Compra', acciones: 2523628, importe: 161.67 },
    ],
    control_y_defensas: 'La familia Ricard actúa en concierto con el 16,16 % del capital y el 22,84 % de los votos gracias al voto doble de las acciones nominativas con más de dos años: 50,7 M de acciones tenían voto doble a 30-jun-2026 [1]. Preside y dirige un miembro de la familia y tiene otros tres consejeros (Société Paul Ricard, César Giron y Veronica Vargas); GBL, con un 6,8 %, tiene otro [1]. Ocho de los doce consejeros elegidos por la junta son independientes, con una consejera coordinadora [1]. Con un 22,8 % de los votos y una asistencia del 80 % del capital en la junta, la familia tiene de hecho minoría de bloqueo y decide quién preside; la fusión con Brown-Forman, otra empresa familiar, se rompió sin acuerdo en un mes [5, 6]. Las sociedades de la familia han pignorado acciones (950.917 el 14-oct-2026 y 2,84 M en junio de 2026, ligadas a instrumentos a plazo) [3].',
    alertas: [
      'Cambio de directora financiera: Hélène de Tissot dejó el grupo el 30-sep-2026; la sustituye Mauve Croizat [1].',
      'Pignoraciones de acciones por las sociedades familiares (Société Paul Ricard, Le Delos Invest II) en octubre de 2025, enero, junio y octubre de 2026, y compra de 2,52 M de acciones con instrumentos a plazo el 19-jun-2026: la familia se apalanca para aumentar su participación [3].',
      'Presidente y consejero delegado en la misma persona, de la familia de control, con voto doble [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'votos de remuneración de las juntas de 2023 y 2024', tipo: 'Complemento', intentos: '1) Página de juntas de la web (solo el acta de 2025 enlazada); 2) URD FY26 (no repite los porcentajes); 3) búsqueda de prensa', decision: 'Omitido: se usa el voto de 2025' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const bolsa = leer('bolsa.json');
const fD = [
  { id: 1, titulo: 'Históricos diarios de RI.PA, CAC 40 (^FCHI) y STOXX Europe 600 Food & Beverage (EXH3.DE), hasta el cierre del 19-oct-2026 (herramientas/bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/RI.PA/history' },
  { id: 2, titulo: 'Pernod Ricard: Financial Data, Forecasts, Estimates (ventas, EBITDA, EBIT, beneficio, BPA, DPA, deuda neta FY25-FY29)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/PERNOD-RICARD-4681/finances/' },
  { id: 3, titulo: 'Pernod Ricard: consensus (20 analistas, «outperform», objetivo medio 80,45 EUR, mínimo 60, máximo 122)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/PERNOD-RICARD-4681/consensus/' },
  { id: 4, titulo: 'Rendimiento del Bund a 10 años (serie BBSIS R10XX): 3,49 % el 19-oct-2026', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
  { id: 5, titulo: 'Tipos de cambio de referencia del euro (19-oct-2026: 1,1225 USD; 0,84205 GBP)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Pernod Ricard: vers une huitième hausse consécutive (Deutsche Bank conservar 63 EUR; Jefferies comprar 90 EUR)', editor: 'Zonebourse / TradingSat', tipo: 'Prensa', fecha: '2026-10-16', url: 'https://www.tradingsat.com/pernod-ricard-FR0000120693/actualites/pernod-ricard-pernod-ricard-vers-une-huitieme-hausse-consecutive-1171888.html' },
  { id: 8, titulo: 'Q1 sales beat expectations at Pernod Ricard (Sharecast)', editor: 'Hargreaves Lansdown', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://www.hl.co.uk/shares/stock-market-news/company--news/q1-sales-beat-expectations-at-pernod-ricard' },
  { id: 9, titulo: 'Pernod Ricard confirms discussions with Brown-Forman', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-03-26', url: 'https://www.pernod-ricard.com/system/files/news/downloads/2026-03/2026%2003%2026%20Pernod%20ricard%20and%20Brown%20Forman.pdf' },
  { id: 10, titulo: 'RBC relève sa cible sur Pernod Ricard, le titre recule quand même (RBC: «performance de marché», objetivo de 69 a 71 EUR)', editor: 'Zonebourse', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://www.zonebourse.com/actualite-bourse/rbc-releve-sa-cible-sur-pernod-ricard-le-titre-recule-quand-meme-ce785cdbda81f721' },
  { id: 11, titulo: 'ii view: new Diageo strategy involves massive dividend cut', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-02-25', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-new-diageo-strategy-involves-massive-dividend-cut-ii538260' },
  { id: 12, titulo: 'Comparables de bebidas a 12-oct-2026 (MarketScreener, en EUR), tomados de los análisis de Heineken y Diageo del repositorio y llevados al cierre del 19-oct (Europa) o del 16-oct (EE. UU.) con la variación del precio de Yahoo', editor: 'MarketScreener / Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/DIAGEO-PLC-4000237/finances/' },
  { id: 13, titulo: 'Transacciones del sector de bebidas (Asahi-EABL, Campari-Courvoisier, Caffo-Cinzano, Diageo-Don Papa, Diageo-Aviation), recogidas en el análisis de Diageo del 12-oct-2026', editor: 'Notas de prensa de las partes', tipo: 'Prensa', fecha: '2026-10-12', url: 'https://www.diageo.com/en/news-and-media/press-releases' },
  { id: 14, titulo: 'Pernod and Brown-Forman fail to reach merger agreement', editor: 'The Spirits Business', tipo: 'Prensa', fecha: '2026-04-28', url: 'https://www.thespiritsbusiness.com/2026/04/pernod-and-brown-forman-fail-to-reach-merger-agreement/' },
  { id: 15, titulo: 'Universal Registration Document 2025-2026: cotización mensual (Bloomberg) y número de acciones', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-09-16', url: 'https://www.pernod-ricard.com/system/files/2026-09/PERNOD_RICARD_DEU_2025-2026_EN.pdf' },
  { id: 16, titulo: 'Actualités Pernod Ricard (titulares del 1 al 19-oct-2026: BNP Paribas infraponderar con objetivo de 58 a 60 EUR el 16-oct; Rothschild & Co Redburn neutral con objetivo de 82 a 65 EUR el 9-oct; Berenberg comprar el 16-oct; «Pernod Ricard et Diageo feraient l’objet d’une enquête fiscale en Inde sur la classification d’importations de whisky écossais en vrac», MT Newswires, 19-oct)', editor: 'Zonebourse', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://www.zonebourse.com/cours/action/PERNOD-RICARD-4681/actualite/' },
  { id: 17, titulo: 'Pernod Ricard en tête du CAC 40, Deutsche Bank vise plus haut (conservar, objetivo de 61 a 63 EUR)', editor: 'ABC Bourse', tipo: 'Prensa', fecha: '2026-09-30', url: 'https://www.abcbourse.com/marches/newsContent/703413' },
  { id: 19, titulo: 'Déclarations de positions courtes nettes (BDIF): Marshall Wace LLP 0,58 % a 15-oct-2026 (0,60 % a 13-oct; 0,50 % a 2-oct) y AQR Capital Management 0,59 % a 30-sep-2026 (0,60 % a 23-sep)', editor: 'AMF', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://bdif.amf-france.org/back/api/v1/informations?RechercheTexte=PERNOD%20RICARD&From=0&Size=40' },
  { id: 18, titulo: 'Nombre total de droits de vote et d’actions au 30.09.2026 (252.269.195 acciones; 465.733 con voto suspendido)', editor: 'Pernod Ricard', tipo: 'Primaria', fecha: '2026-10-08', url: 'https://www.pernod-ricard.com/system/files/2026-10/DROITSVOTE_2026%2009%2030.pdf' },
];
// Comparables del 12-oct llevados al 19-oct: capitalización y PER por el cociente de precios; EV por el cambio de la capitalización.
const prev = leer('../../pernod-ricard-2026-10-14/notas/D.json').comparables.empresas;
// Cierres de Yahoo: 12-oct → 19-oct (Europa) o 16-oct (EE. UU., sesión del 19-oct sin cerrar): ABI 69,72→73,78; STZ 126,40→131,35; DGE 1.673→1.761,5 GBp; BF.B 26,81→28,88; CPR 6,27→6,61; RCO 43,30→49,92; HEIA 72,24→76,28.
const factor = { 'ABI.BR': 1.0582, STZ: 1.0392, 'DGE.L': 1.0529, 'BF.B': 1.0772, 'CPR.MI': 1.0542, 'RCO.PA': 1.1529, 'HEIA.AS': 1.0559 };
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const empresas = prev.map((e) => {
  const k = factor[e.ticker];
  const peso = e.dn_ebitda != null && e.ev_ebitda_ltm ? 1 - e.dn_ebitda / e.ev_ebitda_ltm : null; // capitalización / EV
  const ev = (m) => (m == null ? null : peso == null ? m : m * (1 + (k - 1) * peso));
  return {
    ...e, capitalizacion: Math.round(e.capitalizacion * k), ev_ventas: r2(ev(e.ev_ventas)), ev_ebitda_ltm: r1(ev(e.ev_ebitda_ltm)), ev_ebitda_ntm: r1(ev(e.ev_ebitda_ntm)),
    per_ntm: r1(e.per_ntm * k), dn_ebitda: e.dn_ebitda == null ? null : r2(e.dn_ebitda), fcf_yield_pct: e.fcf_yield_pct == null ? null : r1(e.fcf_yield_pct / k),
  };
});
const id = bolsa.identificacion;
const DD = {
  _estado: 'Completo a 19-oct-2026: precio (cierre del 19-oct), rango y bolsa de Yahoo (bolsa.mjs); consenso de MarketScreener consultado el 19-oct; comparables del 12-oct llevados al 19-oct.',
  identificacion: {
    nombre: 'Pernod Ricard SA', nombre_corto: 'Pernod Ricard', ticker: 'RI', isin: 'FR0000120693', mercado: 'Euronext París', indice_referencia: 'CAC 40',
    pais: 'Francia', pais_iso: 'FR', sector: 'Consumo básico', industria: 'Bebidas: destiladores y bodegas', sede: 'París', fundacion: '1975', empleados: 16893, web: 'https://www.pernod-ricard.com',
    precio: id.precio, fecha_precio: id.fecha_precio, acciones: 252.4, capitalizacion_publicada: null, free_float_pct: 82.4,
    max_52s: id.max_52s, min_52s: id.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses)`, proximos_resultados: '2027-02-18',
  },
  consenso: {
    guidance: 'FY27 (guía del 27-ago-2026, confirmada el 15-oct-2026): ventas orgánicas «ampliamente estables», con caídas en EE. UU. y China por ajuste de inventarios desde el 1T y crecimiento en el resto del mundo, sobre todo India; publicidad en torno al 16 % de las ventas; defensa «fuerte» del margen operativo orgánico; inversiones estratégicas de unos 700 M y conversión de caja del 90 % [A4, A2]. Medio plazo FY27-FY29: crecimiento orgánico de ventas de media «cerca del extremo bajo» del +3 % a +6 %, expansión del margen orgánico con 1.000 M de eficiencias acumuladas entre el FY26 y el FY28 (la mitad ya lograda), conversión del 90 % y deuda neta/EBITDA por debajo de 3x en el FY29 [A4].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 9322, ebitda: 2811, ebit: 2407, bpa: 5.35, dpa: 4.65, fuente: 'MarketScreener, 19-oct-2026 (BPA en NIIF, con partidas no recurrentes) [2]' },
      { periodo: 'FY2028e', ingresos: 9500, ebitda: 2896, ebit: 2488, bpa: 5.68, dpa: 4.66, fuente: 'MarketScreener, 19-oct-2026 [2]' },
      { periodo: 'FY2029e', ingresos: 9761, ebitda: 2975, ebit: 2562, bpa: 5.96, dpa: 4.65, fuente: 'MarketScreener, 19-oct-2026 [2]' },
    ],
    recomendaciones: { n_analistas: 20, comprar: null, mantener: null, vender: null, po_medio: 80.45, po_min: 60, po_max: 122 },
    revisiones: 'Las estimaciones llevan un año a la baja: el FY26 acabó con ventas de 9.404 M y BPA recurrente de 5,85 (−19 %) y, tras los resultados de agosto, Mediobanca y Deutsche Bank rebajaron sus objetivos [3, 17]. Desde finales de septiembre los objetivos se mueven poco y en los dos sentidos: Deutsche Bank sube de 61 a 63 EUR por el dólar aunque recorta ventas (30-sep), Rothschild & Co Redburn baja de 82 a 65 EUR (9-oct), BNP Paribas sube de 58 a 60 EUR en infraponderar y Berenberg revisa estimaciones manteniendo comprar tras el 1T27 (16-oct), y RBC sube de 69 a 71 EUR en «performance de marché» el 19-oct, con un orgánico del FY27 del −0,2 % y dudas sobre el dividendo y el desapalancamiento [17, 16, 10]. El 1T27 batió el consenso de la propia empresa (−0,9 % orgánico frente a −1,7 %) [A12]. Las estimaciones de MarketScreener del 19-oct apenas cambian frente al 16-oct (ventas FY27e 9.322 M frente a 9.325 M; BPA igual). Solo hay una fuente gratuita con estimaciones completas (MarketScreener); su EBITDA y su EBIT son los recurrentes de la empresa y su BPA es el NIIF (4,77 en el FY26 frente a 5,85 recurrente).',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: 1.17,
    comentario: 'La acción pierde un 24,4 % en un año y un 19,2 % anual en cinco, frente a −3,7 % y +3,4 % anual del CAC 40 en precio [1]: el mercado ha pasado de pagar el ciclo alcista poscovid de los destilados (máximo de 217 EUR en 2022) a descontar una caída estructural. La caída máxima de cinco años es del −68,9 % (abril de 2023 a marzo de 2026), y el mínimo de 52 semanas, 57,86 EUR, se marcó el 5-oct-2026 [1]. En 2026 la peor parte llegó con los resultados de Diageo (25-feb, −7,9 % en Pernod por el recorte del dividendo de Diageo), la confirmación de las conversaciones con Brown-Forman (26-mar, −5,7 %) y los resultados del FY26 (27-ago, −4,6 %) [1, 11, 9]. Desde el mínimo de octubre sube un 16,6 %, con todo el sector y un 1T27 mejor de lo esperado [1, 7, 8]; el 19-oct cede un 1,1 % (67,46 EUR) pese a la subida de objetivo de RBC [10]. Posiciones cortas publicadas (por encima del 0,5 %): Marshall Wace 0,58 % (15-oct) y AQR 0,59 % (30-sep), un 1,17 % del capital entre las dos [19]. Beta de 0,62 mensual a cinco años y 0,96 semanal a dos años frente al CAC 40 [1].',
    contexto: null,
  },
  multiplos_historicos: {
    serie: [
      { anio: 'FY2021', precio_cierre: 187.2, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2022', precio_cierre: 175.3, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2023', precio_cierre: 202.4, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2024', precio_cierre: 126.7, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2025', precio_cierre: 84.6, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2026', precio_cierre: 63.86, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Grupos de bebidas alcohólicas con marcas globales: los destiladores cotizados (Diageo, Brown-Forman, Campari, Rémy Cointreau), Constellation Brands y las dos grandes cerveceras (AB InBev y Heineken). Las cifras son de MarketScreener a 12-oct-2026 (en EUR) y se llevan al cierre del 19-oct (Europa; EE. UU. al del 16-oct, porque la sesión del 19-oct no había cerrado) con la variación del precio de cada una: la capitalización y el PER, por el cociente de precios; el valor empresa, por el cambio de la capitalización (en Diageo, sin deuda neta en la ficha, solo el PER) [12, 1]. Fuera LVMH (el lujo pesa el 90 % de su beneficio) y Kweichow Moutai (mercado chino regulado). Rémy Cointreau (+15 % en una semana) distorsiona por arriba; con ella fuera la mediana del PER apenas cambia. Sin cambio de divisa: el EUR/USD pasa de 1,1253 a 1,1225 entre el 16 y el 19-oct [5].',
    empresas,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: { ...leer('../../pernod-ricard-2026-10-14/notas/D.json').transacciones, comentario: 'Pocas operaciones de destilados publican el múltiplo de EBITDA: Asahi paga 17 veces el EBITDA ajustado por EABL y Campari pagó unas 17 veces la contribución tras publicidad por Courvoisier (5,3 veces ventas), mientras las marcas de vino y vermú salen a 1,3 veces ventas [13]. Pernod tiene un concierto familiar con el 22,8 % de los votos: una opa hostil es inviable, y la única operación corporativa intentada, la fusión entre iguales con Brown-Forman de marzo de 2026, terminó sin acuerdo un mes después [9, 14]. El valor de control no es un escenario de este informe.', confianza: 'Media' },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'reparto de recomendaciones (comprar, mantener, vender)', tipo: 'Complemento', intentos: '1) MarketScreener (solo la media «outperform» y 20 analistas); 2) página de consenso de la empresa (solo el 1T27); 3) prensa (Jefferies comprar, Deutsche Bank conservar, Berenberg comprar)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'múltiplos de EBITDA de las transacciones', tipo: 'Complemento', intentos: '1) Notas de prensa de las partes (solo Asahi-EABL publica el EBITDA); 2) informes anuales de Diageo y Campari; 3) prensa sectorial', decision: 'Omitido: solo una con múltiplo de EBITDA' },
  ],
};

// ---------------------------------------------------------------- B. Sector (nota del 18-oct, releída el 19-oct)
// La nota B del 18-oct ya lleva negocio, segmentos, KPI y ESG con fuentes primarias de Pernod. El 19-oct se recomprueban
// segmentos FY25-FY26 y pesos regionales contra la nota de resultados del 27-ago (cuadran) y se mantiene el resto (sector estructural).
const B = leer('B-anterior.json');
B._estado = 'Nota del 18-oct releída el 19-oct-2026: segmentos FY25-FY26 (Américas 3.154/847 y 2.584/659; Asia y resto 4.635/1.360 y 3.920/1.074; Europa 3.170/744 y 2.900/690) comprobados contra la nota de resultados del FY26; sector y competidores sin cambios (datos anuales).';

// ---------------------------------------------------------------- E. Sentimiento (nota del 18-oct, ventana de tres meses al 19-oct)
const E = leer('E-anterior.json');
const ne = E.fuentes.length;
E.fuentes.push(
  { id: ne + 1, titulo: 'Pernod Ricard SA: News and Analysis (fuente RSS: «Pernod Ricard: Weakness Persists, But Long-Term Upside Remains», 7-sep-2026; «Trump to lift 10% tariff on Irish whiskey», 14-sep-2026; transcripción del 1T27, 15-oct-2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://seekingalpha.com/api/sa/combined/PRNDY.xml' },
);
// Fuera de la ventana de tres meses: la lectura de Seeking Alpha de octubre de 2025.
E.sentimiento.revisadas = E.sentimiento.revisadas.filter((r) => !(r.plataforma.startsWith('Seeking Alpha') && r.fecha === '2025-10'));
E.sentimiento.revisadas.unshift(
  { plataforma: 'Seeking Alpha (análisis y titulares)', fecha: '2026-09', n_comentarios: 6, tono: 'Dividido', resumen: `El análisis de septiembre ve debilidad a corto plazo pero recorrido a largo; el titular de la retirada del arancel del 10 % al whiskey irlandés en EE. UU. (14-sep) se lee como alivio para Jameson [${ne + 1}].` },
);
E.sentimiento.tono = 'Dividido';
E.sentimiento.tendencia = 'Mejora';
E._estado = 'Nota del 18-oct con la ventana de tres meses al 19-oct-2026: fuera la lectura de octubre de 2025; añadida la de Seeking Alpha de septiembre de 2026.';

escribir('A.json', A);
escribir('B.json', B);
escribir('C.json', C);
escribir('D.json', DD);
escribir('E.json', E);
console.log('Notas A-E escritas.', empresas.map((e) => `${e.nombre} PER ${e.per_ntm} EV/EBITDA NTM ${e.ev_ebitda_ntm}`).join('; '));

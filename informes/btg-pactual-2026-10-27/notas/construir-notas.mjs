// Escribe las notas A-E de BTG Pactual (BPAC11, corte 2026-10-27, precio: cierre del 26-oct-2026 en B3) a partir de los
// documentos de notas/docs: informes trimestrales de la web de RI (BR GAAP de gestión, lucro líquido AJUSTADO), datos abiertos
// de la CVM (DFP/ITR, NIIF consolidadas: cvm-btg-niif.csv), bolsa.json (Yahoo), yahoo-datos.json (consenso y comparables),
// Banco Central (Focus, PTAX, Selic), Trading Economics (bono a 10 años) y prensa. Cada nota cita solo con [n] de su lista.
// Ejecutar: node informes/btg-pactual-2026-10-27/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const MZ = 'https://api.mziq.com/mzfilemanager/v2/d/0afe1b62-e299-4dec-a938-763ebc4e2c11';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Earnings Release Second Quarter 2026 (resultados del 2T26: cuenta ajustada, segmentos, balance, VaR, Basilea, cartera de crédito por fases)', editor: 'Banco BTG Pactual S.A.', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://d169uzu5o4xu1k.cloudfront.net/78a5a309-f13a-41ed-a7d1-814e37b63259/2026/85fd094c-f223-42e0-b774-fbc5de1b78ef.pdf' },
  { id: 2, titulo: 'Earnings Release Fourth Quarter 2025 (ejercicio 2025 y 2024, tabla pro forma con Banco Pan, JCP, financiación)', editor: 'Banco BTG Pactual S.A.', tipo: 'Primaria', fecha: '2026-02-09', url: `${MZ}/e6d18b06-6a36-4841-06a8-571f09d51b4e?origin=2` },
  { id: 3, titulo: 'Earnings Release Fourth Quarter 2023 (ejercicios 2023 y 2022)', editor: 'Banco BTG Pactual S.A.', tipo: 'Primaria', fecha: '2024-02-05', url: `${MZ}/25c966d3-d604-1a77-f8ee-8f182b43be47?origin=2` },
  { id: 4, titulo: 'Earnings Release Fourth Quarter 2021 (ejercicios 2021 y 2020)', editor: 'Banco BTG Pactual S.A.', tipo: 'Primaria', fecha: '2022-02-16', url: `${MZ}/f096bfcc-10f7-4d91-ab73-72ee69c1c91e?origin=2` },
  { id: 5, titulo: 'Earnings Release First Quarter 2025', editor: 'Banco BTG Pactual S.A.', tipo: 'Primaria', fecha: '2025-05-12', url: `${MZ}/8e9ab7de-d070-0873-6141-19d7b72de3ec?origin=2` },
  { id: 6, titulo: 'Earnings Release Second Quarter 2025', editor: 'Banco BTG Pactual S.A.', tipo: 'Primaria', fecha: '2025-08-12', url: `${MZ}/d5d6c716-c6f9-a869-a68a-acf83fcfd6cc?origin=2` },
  { id: 7, titulo: 'Datos abiertos de la CVM: DFP 2021, 2023 y 2025 e ITR 2026 de BCO BTG PACTUAL S.A. (código 022616), estados consolidados en NIIF (resultado, balance y flujos)', editor: 'Comissão de Valores Mobiliários (dados.cvm.gov.br)', tipo: 'Primaria', fecha: '2026-10-25', url: 'https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/DFP/DADOS/' },
  { id: 8, titulo: 'Política de dividendos (expectativa de reparto del 25 % del beneficio consolidado)', editor: 'Banco BTG Pactual S.A. (RI)', tipo: 'Primaria', fecha: '2026-10', url: 'https://ri.btgpactual.com/governanca-corporativa/politica-de-dividendos' },
  { id: 9, titulo: 'Composição Societária: composición de la unit (1 ON + 2 PNA) y accionistas a 30-jun-2026', editor: 'Banco BTG Pactual S.A. (RI)', tipo: 'Primaria', fecha: '2026-06-30', url: 'https://ri.btgpactual.com/governanca-corporativa/composicao-societaria' },
];
const anios = ['2021', '2022', '2023', '2024', '2025'];
// Cuenta AJUSTADA de gestión (BR GAAP) que publica el banco [A1-A4]: «ingresos» = total adjusted revenues (ingresos netos del
// coste de financiación por línea de negocio); «gastos generales» = gastos operativos sin la amortización del fondo de comercio;
// EBITDA = EBIT = beneficio antes de impuestos ajustado (un banco no tiene EBITDA; la amortización del fondo de comercio la
// quita el propio ajuste). 2022 y 2024: el informe del 4T da los gastos con fondo de comercio (839 y 968 M) y el beneficio
// antes de impuestos contable (9.491 y 14.703): se suma el fondo de comercio y el impuesto sale de la diferencia con el ajustado.
const cta = {
  2021: { ing: 13900.6, opx: 5454.2, bai: 8446.4, imp: 1953.3, bn: 6493.0, bpa: 1.69, acc: 3835.373, dpa: 0.46 },
  2022: { ing: 17247, opx: 6917, bai: 10330, imp: 2024, bn: 8306, bpa: 2.17, acc: 3825.373, dpa: 0.53 },
  2023: { ing: 21558.9, opx: 8227.8, bai: 13331.1, imp: 2912.0, bn: 10419.1, bpa: 2.73, acc: 3811.254, dpa: 0.75 },
  2024: { ing: 25054, opx: 9383, bai: 15671, imp: 3349, bn: 12322, bpa: 3.24, acc: 3807.904, dpa: 0.79 },
  2025: { ing: 33039.3, opx: 11710.6, bai: 21328.7, imp: 4643.9, bn: 16684.8, bpa: 4.32, acc: 3862.552, dpa: 1.04 },
};
// DPA = JCP pagado en el año (estado de flujos NIIF [A7]: 1.746, 2.025, 2.845, 2.995 y 4.020 M) ÷ units; base «pagado».
const cuenta = anios.map((p) => {
  const c = cta[p];
  return { periodo: p, ingresos: c.ing, coste_ventas: null, gastos_generales: c.opx, ebitda: c.bai, amortizaciones: 0, ebit: c.bai, resultado_financiero: 0, bai: c.bai, impuestos: c.imp, minoritarios: 0, beneficio_neto: c.bn, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: c.bpa, dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: c.acc };
});
// Balance de gestión (BR GAAP) al cierre [A1-A4]: activo total y patrimonio ajustado de la dominante. Deuda y caja a CERO a
// propósito: en un banco los depósitos, las emisiones y la caja son la materia prima del negocio, no financiación del accionista;
// así el capital invertido del motor es el patrimonio y su «ROIC» es el ROE. Minoritarios fuera (el beneficio ajustado es el de
// la dominante; los minoritarios NIIF eran 6.941 M a dic-2025 y 6.808 M a jun-2026 [A7]).
const bal = { 2021: [346100, 37380], 2022: [450600, 42372], 2023: [493200, 49382], 2024: [587200, 57467], 2025: [806000, 69970] };
const balance = anios.map((p) => ({ periodo: p, activo_total: bal[p][0], activo_corriente: null, pasivo_corriente: null, pasivo_total: bal[p][0] - bal[p][1], fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: 0, clientes: 0, proveedores: 0, activos_contrato: null, pasivos_contrato: null, caja: 0, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: bal[p][1], minoritarios: 0, reservas: null }));
// Flujos NIIF [A7]: el flujo operativo de un banco recoge la variación de depósitos, repos y cartera, no la caja del accionista.
const fl = { 2021: [16276, 231, 1746, 0, 5797], 2022: [21106, 277, 2025, 231, 0], 2023: [-16500, 138, 2845, 301, 0], 2024: [7914, 245, 2995, 102, 0], 2025: [-26619, 263, 4020, 110, 0] };
const flujos = anios.map((p) => ({ periodo: p, flujo_operativo: fl[p][0], capex: fl[p][1], pagos_arrendamientos: 0, adquisiciones: null, desinversiones: 0, dividendos: fl[p][2], recompras: fl[p][3], emision_acciones: fl[p][4], intereses_en_financiacion: 0 }));

const seg = (nombre, descripcion, v) => ({ nombre, descripcion, tipo_resultado: null, historico: anios.map((p, i) => ({ periodo: p, ingresos: v[i], resultado: null })) });
const tri = (p, ing, g, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa, vs_consenso: vs });

const A = {
  _estado: 'Completa. Cuenta y balance de gestión (BR GAAP, lucro líquido AJUSTADO, la base del mercado) de los informes trimestrales; NIIF de la CVM como contraste. Deuda y caja a cero a propósito (banco).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 38247, ebitda: 23831, ebit: 23831, beneficio_neto: 19085, bpa: 4.91, dpa: 1.30, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'Compra del resto de Banco Pan (canje de 0,2128 units por acción preferente, cerrada en ene-2026): el patrimonio de dic-2025 la incluye; desde 2026 Pan consolida al 100 % en «Consumer Finance & Banking» y sus ingresos dejan de ser «Participations».' },
      { periodo: '2021', descripcion: 'Ampliación de capital de 5.797 M BRL (oferta de units) y compras de Necton, Fator y otras: el activo salta de 244,9 a 346,1 miles de M.' },
    ],
    comentario: 'Los ingresos ajustados pasaron de 13.900,6 M BRL en 2021 a 33.039,3 M en 2025 (+24,2 % anual) y el lucro líquido ajustado de 6.493 M a 16.684,8 M (+26,6 % anual) [A2, A4]. El crecimiento es sobre todo orgánico y de cuota: crédito a empresas (2.595 → 8.432 M), gestión de patrimonios (1.526 → 5.023 M) y gestión de activos (1.186 → 2.967 M); además, la remuneración del patrimonio a la Selic («Interest & Others», 831 → 5.875 M) sube con el tipo y con el capital [A2, A4]. La eficiencia mejora: gastos sobre ingresos del 41,1 % en 2021, 40,1 % en 2022, 38,2 % en 2023, 37,5 % en 2024 y 35,4 % en 2025 [A2-A4]. En el 1S26 los ingresos fueron 20.338,9 M (+24,2 %, con Pan al 100 %) y el beneficio ajustado 9.950,5 M (+31,4 %), con una eficiencia del 37,6 % [A1]. 2022 lleva la provisión de Americanas (crédito a empresas de solo 105 M en el 4T22) [A3].',
    ajustes: 'El beneficio ajustado quita la amortización del fondo de comercio de las compras (Pan, Órama, Sertrading, Julius Baer Brasil, JGP, Justa) y su efecto fiscal: 438,7 M antes de impuestos en el 2T26, 1.341 M en 2025 y 968 M en 2024 [A1, A2]. Es la cifra por unit que publica el banco (4,32 BRL en 2025; 2,58 en el 1S26) y la que sigue el mercado [A1, A2]. El contable BR GAAP fue de 15.947,1 M en 2025 y el NIIF consolidado atribuido a la dominante (DFP en la CVM) de 16.006 M; en 2024, 11.789 M y 10.734 M, y en 2021, 6.342 M y 7.168 M [A2, A4, A7]. La diferencia NIIF − BR GAAP viene de valoración de instrumentos, provisiones de crédito esperada y fondo de comercio, y cambia de signo: no se usa para la valoración. En el 1S26 el NIIF fue de 9.663 M frente a 9.950 M ajustado [A1, A7].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      tri('3T24', 6445, null, 0.84, null),
      tri('4T24', 6728, null, 0.86, null),
      tri('1T25', 6837, 16.1, 0.88, null),
      tri('2T25', 8294, 38.5, 1.10, 'Superior'),
      tri('3T25', 8818, 36.8, 1.19, null),
      tri('4T25', 9090, 35.1, 1.19, 'En línea'),
      tri('1T26', 9968, 45.8, 1.24, 'Superior'),
      tri('2T26', 10371, 25.0, 1.33, 'Superior'),
    ],
    ultima_presentacion: 'En el 2T26 (11-ago-2026) la dirección repitió que el modelo «para todo tiempo» compensa la caída de la banca de inversión (421,4 M, −46 % interanual, por menos emisiones de deuda) con las líneas recurrentes: crédito a empresas récord (2.500 M), gestión de activos y patrimonios con 59 miles de M de captación neta y un 26,7 % de ROAE [A1]. El VaR medio bajó al 0,22 % del patrimonio desde el 0,32 % del 1T26: menos riesgo de tesorería en un entorno de incertidumbre [A1]. En el 4T25 (9-feb-2026) se fijó el mensaje de «mantener el ROAE por encima del 25 %» y se presentó la nueva línea de crédito al consumo con Pan al 100 % [A2]. Entre una y otra cambió el tono del crédito: más prudente en pymes (cartera de pymes de 32,9 a 26,6 miles de M en dos trimestres) y más crecimiento en consignado privado [A1]. El mercado reaccionó con caídas el día de ambos resultados pese a superar previsiones: le preocupa la parte volátil (banca de inversión, tesorería) y el tipo impositivo bajo (19,5 %) que explica parte de la sorpresa [A1].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'LCR del 160,3 % a jun-2026 (176,8 % a dic-2025); caja y equivalentes de 103,3 miles de M BRL; financiación no garantizada de 405,3 miles de M (+32 % interanual): depósitos a plazo 186,9, emisiones 129,9, subordinada 23,8, perpetua 6,5 miles de M [A1, A2].',
    rating: 'Sin rating de emisor recogido en esta nota; en ene-2026 colocó 750 M USD de deuda sénior al 5,5 %, el menor diferencial sobre el soberano de su historia [A2].',
    coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: 'Capital: ratio de Basilea del 16,0 % a jun-2026, con capital de nivel 1 del 12,6 % y CET1 del 11,6 % (11,3 % en dic-2025) [A1]. Provisiones para contingencias de 7.907 M BRL y garantías prestadas con provisión de 856 M a dic-2025 (NIIF) [A7]. Exposición de crédito amplia de 406,8 miles de M: fase 1 379,3, fase 2 12,3 y fase 3 15,2 miles de M (3,7 %; incluye Pan) [A1]. Pérdida esperada de crédito en NIIF: 4.651 M en 2022 (Americanas), 2.280 en 2023, 3.236 en 2024, 6.401 en 2025 (con Pan) y 3.832 en el 1S26 [A7].',
    comentario: 'El activo creció de 346,1 a 925,2 miles de M BRL entre dic-2021 y jun-2026 y el patrimonio ajustado de 37.380 a 79.553 M: el apalancamiento (activo ÷ patrimonio) pasó de 9,3 a 11,6 veces, sobre todo por repos y cartera de negociación (265,0 miles de M) [A1, A4]. Es un balance de banco de inversión: mucho valor razonable, financiación mayorista y repos, y una cartera de crédito de 366,6 miles de M (+24 % interanual) [A1]. Deuda y caja van a cero en el modelo porque son materia prima, no deuda del accionista.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El estado de flujos NIIF de un banco no mide la caja del accionista: el flujo operativo (−26.619 M en 2025, −16.500 M en 2023) recoge la variación de depósitos, repos y cartera [A7]. Lo que cuenta es la distribución: JCP pagados de 1.746 M en 2021, 2.025 M en 2022, 2.845 M en 2023, 2.995 M en 2024 y 4.020 M en 2025 (≈ 24 % del beneficio ajustado de 2025, en línea con la política del 25 % [A8]), recompras pequeñas (≤ 301 M al año) y una ampliación de 5.797 M en 2021 [A7]. La inversión en inmovilizado es mínima (138-277 M al año) [A7]. El crecimiento lo financia el beneficio retenido: el patrimonio ajustado sube ≈ 20 % al año.',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'EY (Ernst & Young Auditores Independentes)', anios_auditor: null, opinion: 'Favorable',
    comentario: 'Los indicadores del motor (Altman Z, Piotroski F, Beneish M) no tienen sentido en un banco y no se usan. Lo que importa: (1) la distancia entre el beneficio ajustado y el contable es pequeña y estable (la amortización del fondo de comercio: 4,5 % del ajustado en 2025) [A2]; (2) el NIIF de la CVM está cerca del ajustado en 2025 (16.006 frente a 16.685 M) y por debajo en 2024 (10.734 frente a 12.322 M) [A7]; (3) una parte de los ingresos depende de valoraciones a mercado (tesorería, inversiones propias); (4) el tipo efectivo baja al 19,5 % en el 2T26 por la mezcla de ingresos y el JCP, y sostiene parte de la sorpresa del beneficio [A1]; (5) la pérdida esperada de crédito se duplicó en 2025 con Pan (6.401 M) [A7]. Auditor según los estados de la CVM; la opinión de 2025 es sin salvedades [A7].',
    senales: [
      { senal: 'Ingresos de tesorería y valor razonable', nivel: 'Media', comentario: 'Sales & Trading fue el 21,7 % de los ingresos en 2025 (30,8 % en 2021) y depende de valoraciones; VaR medio 0,22-0,38 % del patrimonio [A1, A2].' },
      { senal: 'Tipo impositivo bajo por JCP y mezcla', nivel: 'Baja', comentario: '19,5 % en el 2T26 y 20,2 % en 2025: el JCP es deducible; una reforma que lo elimine subiría el tipo [A1, A2].' },
      { senal: 'Diferencia NIIF − BR GAAP variable', nivel: 'Baja', comentario: '2024: NIIF 10.734 M frente a 11.789 M BR GAAP; 2025: 16.006 frente a 15.947 M [A2, A7].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Política de dividendos: «expectativa del 25 % del beneficio neto consolidado», pagado sobre todo como JCP, deducible en el impuesto [A8]. JCP pagados de 4.020 M BRL en 2025 (1,04 BRL por unit) [A7]. Recompras pequeñas y oportunistas (programa de hasta 1.000 M aprobado en ene-2022) [A4, A7]. La prioridad declarada es retener para crecer en crédito, banca de consumo y fuera de Brasil, con Basilea en torno al 15-16 % [A1, A2].',
    adquisiciones: [
      { anio: '2025', objetivo: 'Resto de Banco Pan (canje de acciones; Pan deja la bolsa)', importe: null, ev_ebitda: null, financiacion: 'Units nuevas (54,6 M de units: de 3.807,9 a 3.862,6 M)', resultado: 'Pan al 100 % desde ene-2026: ingresos de consumo de 1.545,7 M en el 2T26 (+74 % interanual) [A1, A2].' },
      { anio: '2025', objetivo: 'Julius Baer Brasil, JGP Wealth Management, Justa y HSBC Uruguay (cerrada el 10-jul-2026)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas en gestión de patrimonios y en la expansión regional; fondo de comercio que se amortiza (438,7 M en el 2T26) [A1, A2].' },
      { anio: '2025', objetivo: 'M.Y. Safra Bank (Nueva York)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Aprobada por los reguladores de EE. UU. en dic-2025: banco completo en EE. UU. [A2].' },
      { anio: '2026', objetivo: 'MeuTudo (48 %, originación digital de crédito al consumo)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Cerrada en el 2T26; aporta ingresos de consumo proporcionales [A1].' },
    ],
    comentario: 'Buena asignadora de capital: el patrimonio ajustado por unit subió de 9,7 BRL en 2021 a 20,6 BRL en jun-2026 (+18 % anual) con un ROAE ajustado del 20,3 % al 26,9 % y un reparto de solo ≈ 25 % [A1, A2, A4]. Las compras son de distribución y de captación (Pan, patrimonios, EE. UU.) y se pagan en parte con units (Pan: +1,4 % de dilución) [A2]. El riesgo es que el capital retenido rinda menos cuando baje la Selic: «Interest & Others» (remuneración del patrimonio tangible al tipo oficial) fue el 17,3 % de los ingresos del 1S26 [A1].',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      seg('Investment Banking', 'Fusiones, salidas a bolsa y emisiones de deuda (n.º 1 en Brasil y Latinoamérica en número de operaciones)', [2310, 1846, 1620, 2102, 2498]),
      seg('Corporate Lending & Business Banking', 'Crédito a empresas y pymes (288,5 miles de M a jun-2026)', [2595, 2736, 5144, 6512, 8432]),
      seg('Sales & Trading', 'Tesorería y negociación por cuenta de clientes y propia (renta fija, divisas, renta variable, energía)', [4288, 5308, 6235, 5981, 7175]),
      seg('Asset Management', 'Gestión y administración de fondos (1,36 billones BRL a jun-2026)', [1186, 1554, 1849, 2389, 2967]),
      seg('Wealth Management & Personal Banking', 'Banca privada y de rentas altas, banco digital (1,31 billones BRL de patrimonio de clientes)', [1526, 2533, 3074, 3778, 5023]),
      seg('Participaciones e inversiones propias', 'Resultado de Banco Pan y Too Seguros por puesta en equivalencia y, hasta 2023, Principal Investments; desde 2026 pasa a Consumer Finance & Banking', [1165, 688, 325, 915, 1070]),
      seg('Interest & Others', 'Remuneración del patrimonio tangible al tipo Selic (coste de financiación interno)', [831, 2582, 3311, 3378, 5875]),
    ],
    geografias: [],
    geografias_criterio: null,
    kpis: [
      { kpi: 'Activos de clientes (AuM + WuM, billones BRL)', valor_anterior: '2,15 (jun-25)', valor_actual: '2,68 (jun-26)', variacion: '+24,6 %', comentario: 'Captación neta de 332 miles de M en 12 meses [A1].' },
      { kpi: 'Cartera de crédito (miles de M BRL)', valor_anterior: '295,7 (jun-25)', valor_actual: '366,6 (jun-26)', variacion: '+24,0 %', comentario: 'Empresas 288,5 y consumo 78,2 [A1].' },
      { kpi: 'ROAE ajustado anualizado', valor_anterior: '27,2 % (2T25)', valor_actual: '26,7 % (2T26)', variacion: '−0,5 pp', comentario: '26,9 % en 2025 y 23,1 % en 2024 [A1, A2].' },
      { kpi: 'Gastos sobre ingresos ajustado', valor_anterior: '38,5 % (2T25)', valor_actual: '37,1 % (2T26)', variacion: '−1,4 pp', comentario: '35,4 % en el ejercicio 2025 [A1, A2].' },
      { kpi: 'Ratio de Basilea / CET1', valor_anterior: '16,2 % / 12,0 % (2T25)', valor_actual: '16,0 % / 11,6 % (2T26)', variacion: '−0,2 / −0,4 pp', comentario: 'Nivel 1 del 12,6 % [A1].' },
      { kpi: 'VaR medio diario (% del patrimonio medio)', valor_anterior: '0,22 % (2T25)', valor_actual: '0,22 % (2T26)', variacion: '0', comentario: '0,13 % en el 4T24, 0,38 % en el 4T25 y 0,32 % en el 1T26 [A1, A2].' },
      { kpi: 'Fase 3 sobre la exposición de crédito amplia', valor_anterior: null, valor_actual: '3,7 % (2T26)', variacion: null, comentario: '15,2 de 406,8 miles de M; incluye el crédito al consumo de Pan [A1].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'geografias', tipo: 'Complemento', intentos: '1) Informe del 2T26 y del 4T25: no desglosan ingresos por país; 2) estados NIIF de la CVM: nota de segmentos por líneas de negocio, no por geografía en los datos abiertos; 3) prensa: solo menciones cualitativas (Chile, Colombia, Perú, EE. UU., Europa)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Informe del 2T26: composición de la financiación, no calendario; 2) datos abiertos de la CVM: sin notas; 3) no aplica a un banco en el sentido del motor (deuda = materia prima)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Renda fixa, FIPs e FIDCs puxam a captação e indústria de fundos encerra 2025 no azul (patrimonio de 10,7 billones BRL)', editor: 'ANBIMA', tipo: 'Sectorial', fecha: '2026-01-06', url: 'https://www.anbima.com.br/pt_br/imprensa/renda-fixa-fips-e-fidcs-puxam-a-captacao-e-industria-de-fundos-encerra-2025-no-azul.htm' },
  { id: 2, titulo: 'Indústria de fundos cresce 10,7 % e atinge R$ 10,4 trilhões em setembro (2025)', editor: 'Capital Aberto (datos de ANBIMA)', tipo: 'Prensa', fecha: '2025-10', url: 'https://capitalaberto.com.br/economia-e-financas/2025/10/industria-de-fundos-cresce-107-e-atinge-r-104-tri-em-setembro' },
  { id: 3, titulo: 'BTG Pactual (historia, UBS Pactual, BSI, crisis de 2015, expansión 2020-2026)', editor: 'Wikipedia', tipo: 'Prensa', fecha: '2026-10', url: 'https://en.wikipedia.org/wiki/BTG_Pactual' },
  { id: 4, titulo: 'Earnings Release Second Quarter 2026 (cuotas en M&A, ECM, DCM; AuM y WuM)', editor: 'Banco BTG Pactual S.A.', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://d169uzu5o4xu1k.cloudfront.net/78a5a309-f13a-41ed-a7d1-814e37b63259/2026/85fd094c-f223-42e0-b774-fbc5de1b78ef.pdf' },
  { id: 5, titulo: 'Earnings Release Fourth Quarter 2025', editor: 'Banco BTG Pactual S.A.', tipo: 'Primaria', fecha: '2026-02-09', url: `${MZ}/e6d18b06-6a36-4841-06a8-571f09d51b4e?origin=2` },
  { id: 6, titulo: 'Yahoo Finance quoteSummary (rentabilidad sobre recursos propios, P/VC y capitalización de los comparables), 27-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/' },
  { id: 7, titulo: 'Ações de bancos devolvem o rali do 1º turno: BB cai 29 % (cierres oficiales del 26-oct-2026, DI 2031 al 15,185 %)', editor: 'Investir é Coisa de Começar', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://investirecocaresocomecar.com.br/acoes-de-bancos-queda-reeleicao-lula/' },
];
const comp = (nombre, pais, ticker, t, comentario) => ({ nombre, pais, ticker, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `${comentario} ROE ${r1((Y[t]?.roe ?? 0) * 100)} %, P/VC ${r2(Y[t]?.pvc)} [B6].` });
const Bn = {
  _estado: 'Completa con fuentes sectoriales limitadas (ANBIMA para fondos; cuotas de banca de inversión de la propia empresa).',
  sector: {
    definicion: 'BTG compite en tres mercados: (1) banca de inversión y mercados de capitales en Brasil y Latinoamérica; (2) gestión de activos y de patrimonios en Brasil, cuyo tamaño de referencia es el patrimonio de la industria de fondos (ANBIMA) y el ahorro financiero de rentas altas; (3) crédito a empresas y, desde 2026, al consumo. Se usa la industria de fondos como mercado medible: 10,7 billones BRL a dic-2025 [B1] (10,4 billones a sep-2025 [B2]); los activos gestionados y administrados de BTG (1,25 billones a dic-2025) son ≈ 12 % de ella [B5].',
    tamano: '≈ 10,7 billones BRL de patrimonio de fondos a dic-2025 (ANBIMA) [B1]', unidad_serie: null, serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Tipos de interés (Selic)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Selic del 13,75 % (BCB, 17-sep-2026); «Interest & Others» = remuneración del patrimonio a la Selic, 17 % de los ingresos de BTG; tipos altos frenan salidas a bolsa y renta variable [B4, B7].' },
      { driver: 'Actividad de mercados de capitales', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Banca de inversión de BTG −46 % interanual en el 2T26 por menos emisiones de deuda [B4].' },
      { driver: 'Financiarización del ahorro de rentas altas', efecto: '+', horizonte: 'Estructural', evidencia: 'Captación neta de BTG de 354 miles de M BRL en 2025 y 332 en 12 meses a jun-2026 [B4, B5]; la industria captó 88,4 miles de M en 2025 [B1].' },
      { driver: 'Riesgo fiscal y político', efecto: '−', horizonte: 'Cíclico', evidencia: 'Tras la victoria de Lula (25-oct-2026) el DI de 2031 subió 2,54 puntos al 15,185 % y los bancos cayeron un 4,5-29,3 % en un día [B7].' },
      { driver: 'Crédito a empresas y consignado privado', efecto: '+', horizonte: 'Estructural', evidencia: 'Cartera de BTG de 366,6 miles de M (+24 %), consumo +35 % interanual por el consignado privado [B4].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Itaú BBA, Bradesco BBI, XP, Santander y bancos globales en banca de inversión; XP, Itaú y bancos digitales en patrimonios [B4, B6].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Clientes de rentas altas y empresas comparan comisiones; la captación neta récord muestra que BTG gana cuota [B4].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Proveedores = financiación y talento: el coste de la financiación no garantizada bajó (emisión a 5,5 % en ene-2026) y los socios retienen talento [B5].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Licencia bancaria, capital (Basilea 16 %) y marca: barreras altas en banca de inversión; menores en distribución digital [B4].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Plataformas digitales y ETF baratos presionan comisiones de gestión y de distribución [B1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El sector llega a fin de 2026 con Selic alta (13,75 %, tras recortes desde el 15 %), morosidad al alza en el consumo y un choque político: el 26-oct el Ibovespa cayó un 13,5 % con circuit breaker [B7]. En 2015-2016 (recesión y crisis propia) BTG vendió activos y se refinanció; en 2020 su beneficio ajustado subió igualmente (ROAE 16,9 %); en 2022 sufrió la provisión de Americanas [B3, B5].' },
    regulacion: 'Banco Central del Brasil (Basilea III, Resolución CMN 4.966 de pérdida esperada desde 2025), CVM para fondos y mercados. En tramitación o en debate: la eliminación o el recorte del JCP (deducción fiscal de la remuneración del capital) y cambios en la tributación de las rentas financieras, que el nuevo Gobierno puede retomar para cerrar el déficit; el BCB endureció en oct-2026 las reglas de oferta de crédito para frenar el endeudamiento excesivo [B7].',
    tendencias: 'Digitalización de la distribución de inversiones (BTG+, plataformas), consolidación de gestoras independientes, crecimiento del crédito privado (FIDC y debentures) y entrada de los bancos brasileños en EE. UU. y otros países latinoamericanos. BTG gana con la concentración del ahorro en plataformas grandes y con la expansión regional (Perú, Uruguay, EE. UU.) [B4, B5].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 11.7, posicion: 'Mayor banco de inversión independiente de Latinoamérica: n.º 1 en número y volumen de fusiones en Brasil y Latinoamérica en el 2T26; ≈ 12 % de la industria de fondos de Brasil por activos gestionados y administrados [B1, B4].',
    competidores: [
      comp('Itaú Unibanco (Itaú BBA, Itaú Asset)', 'Brasil', 'ITUB4', 'ITUB4.SA', 'Mayor banco privado; rival directo en banca de inversión, crédito a empresas y patrimonios.'),
      comp('XP Inc.', 'Brasil', 'XP', 'XP', 'Rival principal en distribución de inversiones y patrimonios de rentas altas.'),
      comp('Bradesco (BBI)', 'Brasil', 'BBDC4', 'BBDC4.SA', 'Banca de inversión y gestión de activos.'),
      comp('Santander Brasil', 'Brasil', 'SANB11', 'SANB11.SA', 'Banca mayorista y de empresas.'),
      comp('Nu Holdings', 'Brasil', 'NU', 'NU', 'Rival en banca digital y crédito al consumo.'),
      comp('Goldman Sachs', 'EE. UU.', 'GS', 'GS', 'Banca de inversión global en las grandes operaciones latinoamericanas.'),
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Plataforma que junta emisores e inversores: liderazgo en número de operaciones de M&A y ECM [B4].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Clientes de banca privada y gestión: captación neta positiva en todos los trimestres [B4, B5].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Marca y equipo de análisis (n.º 1 de Extel en Latinoamérica), licencias bancarias en varios países [B4].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Gastos sobre ingresos del 35,4 % en 2025, por debajo de los grandes bancos [B5].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: '2,7 billones BRL de activos de clientes y 925 miles de M de balance [B4].' },
      ],
    },
    amenazas: 'Lo que más podría erosionar el foso: (1) que el talento se vaya en una crisis de los socios (como en 2015) [B3]; (2) que las plataformas digitales abaraten la distribución de inversiones; (3) que un ciclo largo de tipos altos y menos actividad en Brasil reduzca la banca de inversión y la tesorería. Probabilidad media para (3) tras el 26-oct, baja para (1).',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Pactual nace en 1983 en Río como distribuidora y en 1989 entra André Esteves, que lo dirige desde 1998 [B3]. UBS lo compra en 2006 por 2.500 M USD; en 2008 Esteves y otros socios fundan BTG y en 2009 recompran UBS Pactual [B3]. Sale a bolsa en 2012. En nov-2015 Esteves es detenido en la investigación Lava Jato; hay salida de depósitos y el banco vende activos (BSI, participaciones) para reforzar la liquidez; Esteves vuelve como socio sénior en 2016, es absuelto en 2018 y vuelve a presidir el consejo en 2022 [B3]. Desde 2020 crece en banca digital, patrimonios, crédito y fuera de Brasil [B3, B5].',
    hitos: [
      { anio: '1983', hito: 'Fundación de Pactual en Río de Janeiro [B3].' },
      { anio: '2006', hito: 'UBS compra Banco Pactual por 2.500 M USD [B3].' },
      { anio: '2009', hito: 'BTG Investments compra UBS Pactual: nace BTG Pactual [B3].' },
      { anio: '2012', hito: 'Salida a bolsa en B3 (units) [B3].' },
      { anio: '2015', hito: 'Detención de André Esteves (25-nov) y crisis de liquidez; venta de BSI y de participaciones [B3].' },
      { anio: '2018', hito: 'Absolución de Esteves por el tribunal federal de Brasilia [B3].' },
      { anio: '2022', hito: 'Esteves vuelve a presidir el consejo; provisión por Americanas [B3].' },
      { anio: '2025', hito: 'Compra del resto de Banco Pan, Julius Baer Brasil y M.Y. Safra Bank (EE. UU.) [B5].' },
      { anio: '2026', hito: 'MeuTudo, HSBC Uruguay y licencia bancaria en Perú [B4].' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es la gobernanza y la conducta (un caso como el de 2015 provoca una salida de depósitos), el riesgo climático de la cartera de crédito (agro, energía, minería: ≈ 25 % de la exposición amplia) y la financiación sostenible: 36 % del volumen de la cuarta subasta de Eco Invest Brasil del Tesoro en mayo de 2026 [B4].',
    controversias: 'La principal es la de 2015 (detención de Esteves en la Lava Jato, absuelto en 2018) [B3]. En los últimos tres años no hemos encontrado sanciones relevantes del Banco Central o de la CVM en las fuentes consultadas.',
    confianza: 'Baja',
  },
  negocio: {
    descripcion: 'BTG Pactual es el mayor banco de inversión independiente de Latinoamérica y una plataforma de gestión de activos y de patrimonios: asesora fusiones y salidas a bolsa, emite y negocia deuda, presta a empresas y pymes, gestiona 1,36 billones BRL en fondos y 1,31 billones de patrimonio de clientes privados y, desde 2026, tiene banca de consumo con Banco Pan al 100 % [B4]. Opera en Brasil, Chile, Colombia, Perú, México, Argentina, Uruguay, EE. UU. y Europa, con 12.169 empleados y 436 socios [B4].',
    como_gana_dinero: 'En el 1S26: crédito a empresas 23,8 % de los ingresos, tesorería 18,4 %, remuneración del patrimonio («Interest & Others») 17,3 %, patrimonios 14,6 %, consumo 13,1 %, gestión de activos 7,8 % y banca de inversión 5,2 % [B4]. Más de la mitad es recurrente (comisiones de gestión, margen de crédito, remuneración del capital); la parte volátil es la tesorería y la banca de inversión. El margen depende de la eficiencia (37,6 % de gastos sobre ingresos en el 1S26), del bonus (% de los ingresos operativos netos) y del tipo Selic, que remunera el patrimonio [B4].',
    clientes: 'Clientes muy diversificados: empresas grandes y medianas, inversores institucionales, rentas altas y, con Pan, consumidores. La exposición de crédito amplia de 406,8 miles de M está repartida por sectores (eléctrico, agro, inmobiliario, petróleo, minería; ninguno por encima del 19 %) [B4]. Poder de precio demostrado en la captación: 59 miles de M de captación neta en el 2T26 mientras la industria de fondos tenía salidas netas [B4].',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'serie', tipo: 'Complemento', intentos: '1) ANBIMA: cifra anual de 2025, sin serie descargable sin registro; 2) Capital Aberto: dato de sep-2025; 3) informes de BTG: no publican el tamaño del mercado', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Web de RI de BTG (sostenibilidad): sin calificaciones en la parte estática; 2) informes trimestrales: no las citan; 3) búsqueda de MSCI y Sustainalytics: sin página pública abierta', decision: 'Omitido' },
  ],
};
guarda('B', Bn);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Diretoria e Conselho de Administração (consejo, directores y comités, mandato desde el 30-abr-2026)', editor: 'Banco BTG Pactual S.A. (RI)', tipo: 'Primaria', fecha: '2026-04-30', url: 'https://ri.btgpactual.com/governanca-corporativa/diretoria-e-conselho-de-administracao' },
  { id: 2, titulo: 'Composição Societária (accionistas y voto por clase a 30-jun-2026)', editor: 'Banco BTG Pactual S.A. (RI)', tipo: 'Primaria', fecha: '2026-06-30', url: 'https://ri.btgpactual.com/governanca-corporativa/composicao-societaria' },
  { id: 3, titulo: 'Partnership (modelo de socios y derecho de los socios a forzar ventas de participaciones)', editor: 'Banco BTG Pactual S.A. (RI)', tipo: 'Primaria', fecha: '2026-10', url: 'https://ri.btgpactual.com/sobre-o-banco/partnership' },
  { id: 4, titulo: 'André Esteves (detención en 2015, absolución en 2018, vuelta a la presidencia en 2022)', editor: 'Wikipedia', tipo: 'Prensa', fecha: '2026-10', url: 'https://en.wikipedia.org/wiki/Andr%C3%A9_Esteves' },
  { id: 5, titulo: 'BTG Pactual (control por los socios)', editor: 'Wikipedia', tipo: 'Prensa', fecha: '2026-10', url: 'https://en.wikipedia.org/wiki/BTG_Pactual' },
  { id: 6, titulo: 'Earnings Release Fourth Quarter 2025 (objetivo de ROAE > 25 %)', editor: 'Banco BTG Pactual S.A.', tipo: 'Primaria', fecha: '2026-02-09', url: `${MZ}/e6d18b06-6a36-4841-06a8-571f09d51b4e?origin=2` },
  { id: 7, titulo: 'Earnings Release Fourth Quarter 2023', editor: 'Banco BTG Pactual S.A.', tipo: 'Primaria', fecha: '2024-02-05', url: `${MZ}/25c966d3-d604-1a77-f8ee-8f182b43be47?origin=2` },
];
const C = {
  _estado: 'Parcial: consejo, control y historia de 2015 con fuentes; sin formulario de referencia (remuneración, votos de junta, operaciones de directivos de la CVM).',
  directivos: {
    equipo: [
      { nombre: 'Roberto Balls Sallouti', cargo: 'Consejero delegado (CEO) y consejero', desde: '2016', participacion_pct: null, trayectoria: 'Socio desde Pactual; consejero delegado desde 2016, tras la crisis de 2015. Con él el ROAE ajustado pasó del 16,9 % (2020) al 26,9 % (2025) y el patrimonio por unit de 7,4 a 18,1 BRL [C1, C6].' },
      { nombre: 'André Santos Esteves', cargo: 'Presidente del consejo y socio sénior', desde: '2022', participacion_pct: null, trayectoria: 'Entró en Pactual en 1989; consejero delegado de UBS Pactual en 2006, fundador de BTG en 2008 y artífice de la recompra de UBS Pactual en 2009. Detenido en nov-2015 (Lava Jato), absuelto en 2018; presidente del consejo desde abril de 2022 [C1, C4].' },
      { nombre: 'Renato Hermann Cohn', cargo: 'Director (Diretoria estatutária)', desde: null, participacion_pct: null, trayectoria: 'Socio y miembro de la dirección estatutaria [C1].' },
      { nombre: 'John Huw Gwili Jenkins', cargo: 'Vicepresidente del consejo (Londres)', desde: '2009', participacion_pct: null, trayectoria: 'Ex consejero delegado de UBS Investment Bank (2005-2007); socio de BTG desde 2009 [C1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Mantener un ROAE ajustado por encima del 20 % (mensaje de 2024)', real: '26,9 %', cumplida: 'Sí' },
      { anio: '2026', guia: 'Sostener el ROAE por encima del 25 % (feb-2026)', real: '26,6 % en el 1S26', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y de casa: los directores son socios con carrera en el banco, y el consejero delegado lleva diez años. La credibilidad descansa en la ejecución (seis años seguidos de récord de beneficio) más que en una guía numérica, que el banco no publica salvo el ROAE [C6, C7]. Sucesión: el modelo de socios produce relevo interno; el riesgo de persona clave es Esteves, socio de control de hecho.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'André Santos Esteves', cargo: 'Presidente', tipo: 'Dominical', desde: '2022', comisiones: null },
      { nombre: 'John Huw Gwili Jenkins', cargo: 'Vicepresidente', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Roberto Balls Sallouti', cargo: 'Consejero (CEO)', tipo: 'Ejecutivo', desde: null, comisiones: 'Remuneración' },
      { nombre: 'Guillermo Ortiz Martínez', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Eduardo Henrique de Mello Motta Loyo', cargo: 'Consejero', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'Mark Clifford Maletz', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Maíra Habimorad', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
      { nombre: 'Nelson Azevedo Jobim', cargo: 'Consejero', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'João Marcello Dantas Leite', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Riesgos y capital' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'El bonus de toda la plantilla es un porcentaje de los ingresos operativos netos de gastos (sin «Interest & Others»): premia el beneficio del año, no el uso del capital, pero el ROE lo mide indirectamente porque los socios cobran sobre todo como accionistas [C3]. El ratio de compensación (bonus + sueldos ÷ ingresos) fue del 19,5 % en el 2T26. No hemos leído el formulario de referencia de la CVM (remuneración individual y votos de la junta): queda como hueco.',
    accionistas: [
      { nombre: 'BTG Pactual Holding Financeira Ltda. (socios)', pct: 61.8, tipo: 'Control (partnership)', variacion: 'Estable' },
      { nombre: 'BTG Pactual Holding S.A. (socios)', pct: 3.1, tipo: 'Control (partnership)', variacion: 'Estable' },
      { nombre: 'Vehículos de inversión vinculados al partnership', pct: 3.7, tipo: 'Partes vinculadas', variacion: null },
      { nombre: 'Autocartera', pct: 0.7, tipo: 'Autocartera', variacion: null },
      { nombre: 'Capital flotante', pct: 30.7, tipo: 'Flotante', variacion: null },
    ],
    insiders: [],
    control_y_defensas: 'Los socios (partnership) tienen el 68,6 % del capital económico (64,9 % directo o por las dos holdings y 3,7 % por vehículos vinculados) y el 79,6 % de las acciones ordinarias, las únicas con voto: la unit (1 ON + 2 PNA) da al minoritario un tercio de voto por unit y las PNA no votan [C2]. El grupo de socios puede obligar a cualquier socio a vender su participación, lo que impide que un socio venda en bloque al mercado salvo en una venta del banco o una oferta pública [C3]. André Esteves es el socio sénior y preside el consejo: controla de hecho la junta y el nombramiento del consejero delegado [C1, C5]. El caso de 2015 mostró el riesgo: su detención provocó salida de depósitos y ventas de activos; fue absuelto en 2018 [C4].',
    alertas: [
      'Control concentrado en los socios con voto (79,6 % de las ON) y presidente que es el socio de control [C2].',
      'Riesgo de persona clave y de reputación: la detención de André Esteves en 2015 provocó una crisis de liquidez; absuelto en 2018 [C4].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo', tipo: 'Complemento', intentos: '1) Web de RI (documentos CVM): el formulario de referencia no está en la parte estática; 2) datos abiertos de la CVM: no incluyen la remuneración individual (solo la del órgano en el FRE, que no hemos descargado); 3) prensa: sin cifras fiables', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct', tipo: 'Complemento', intentos: '1) Web de RI: actas de junta no accesibles sin JavaScript; 2) CVM: mapas de votación no descargados; 3) prensa: sin datos', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) CVM, formularios del art. 11 de la Resolución 44: no descargados (portal con JavaScript); 2) RI de BTG: sin listado; 3) prensa: sin operaciones relevantes de directivos en los últimos 12 meses', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (BPAC11.SA, ^BVSP, BOVA11.SA) e intradía del 26-oct-2026 (cierre 60,00 BRL)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://query1.finance.yahoo.com/v8/finance/chart/BPAC11.SA' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary: consenso de BPA por unit, precios objetivo y recomendaciones de BTG y comparables (27-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/BPAC11.SA' },
  { id: 3, titulo: 'Brazil 10-Year Government Bond Yield: 15,44 % el 26-oct-2026 (+2,46 puntos)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://tradingeconomics.com/brazil/government-bond-yield' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), oct-2026: 4,20 % (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Focus, expectativas de mercado anuales (IPCA y Selic), 23-oct-2026', editor: 'Banco Central do Brasil (Olinda)', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://olinda.bcb.gov.br/olinda/servico/Expectativas/versao/v1/odata/ExpectativasMercadoAnuais' },
  { id: 6, titulo: 'PTAX: dólar a 5,0377 BRL el 23-oct y 5,5007 BRL el 26-oct-2026', editor: 'Banco Central do Brasil (Olinda)', tipo: 'Primaria', fecha: '2026-10-26', url: 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/' },
  { id: 7, titulo: 'Serie SGS 432, meta de la Selic (13,75 % desde el 17-sep-2026)', editor: 'Banco Central do Brasil', tipo: 'Primaria', fecha: '2026-10-27', url: 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados' },
  { id: 8, titulo: 'Temporada de balanços do 3T26: BTG Pactual publica el 10-nov-2026 antes de la apertura', editor: 'Seu Dinheiro', tipo: 'Prensa', fecha: '2026-10', url: 'https://www.seudinheiro.com/2026/economia/temporada-de-balancos-do-3t26-bate-a-porta-veja-as-datas-das-divulgacoes-e-das-teleconferencias-davs/' },
  { id: 9, titulo: 'Ibovespa desaba 13 % após eleição, em dia de circuit breaker; dólar dispara 8 % (directo del 26-oct-2026)', editor: 'InfoMoney', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://www.infomoney.com.br/mercados/ibovespa-hoje-bolsa-de-valores-ao-vivo-26102026/' },
  { id: 10, titulo: 'Ações de bancos devolvem o rali do 1º turno (BPAC11 −24,83 % en el cierre oficial; mínimo de 48,93 BRL)', editor: 'Investir é Coisa de Começar', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://investirecocaresocomecar.com.br/acoes-de-bancos-queda-reeleicao-lula/' },
  { id: 11, titulo: 'Titulares de prensa sobre BPAC11 (Google News, RSS): JP Morgan sube a Comprar (22-jun-2026), Itaú BBA «cerca del suelo histórico de múltiplo» (18-ago), Citi sube el objetivo (19-sep), JCP de hasta 0,77 BRL por unit (5-ago), salto del 27 % tras la primera vuelta (5-oct)', editor: 'Google News (agregador)', tipo: 'Prensa', fecha: '2026-10-27', url: 'https://news.google.com/rss/search?q=BPAC11&hl=pt-BR&gl=BR&ceid=BR:pt-419' },
  { id: 12, titulo: 'O que fez a XP elevar o BTG Pactual (BPAC11) para compra (objetivo de 63 BRL para fin de 2026)', editor: 'Money Times', tipo: 'Prensa', fecha: '2025-11-28', url: 'https://www.moneytimes.com.br/o-que-fez-a-xp-elevar-btg-pactual-bpac11-para-compra-e-aumentar-quase-r-30-no-preco-alvo-acoes-sobem-forte-na-b3-lils/' },
  { id: 13, titulo: 'BTG Pactual (BPAC11) entrega resultado «difícil de criticar», mas ações caem na B3 (1T26)', editor: 'Seu Dinheiro', tipo: 'Prensa', fecha: '2026-05-11', url: 'https://www.seudinheiro.com/2026/empresas/btg-pactual-bpac11-entrega-resultado-dificil-de-criticar-mas-acoes-caem-na-b3-o-que-explica-a-queda-das-acoes-miql/' },
  { id: 14, titulo: 'BTG Pactual propõe incorporação de ações do Banco Pan (0,2128 units por acción preferente; prima > 30 %)', editor: 'Money Times', tipo: 'Prensa', fecha: '2025-10-14', url: 'https://www.moneytimes.com.br/btg-pactual-propoe-incorporacao-de-acoes-do-banco-pan-jals/' },
];
const cmp = (nombre, ticker, pais, t, perManual = null) => {
  const x = Y[t];
  const fx = x.divisa === 'USD' ? 5.4064 : 1; // capitalización en BRL al cierre del 26-oct (USD/BRL 5,4064, Yahoo)
  return { nombre, ticker, pais, capitalizacion: Math.round((x.cap * fx) / 1e6), ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: perManual ?? r1(x.per_adelantado), crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: x.roe != null ? r1(x.roe * 100) : null, dn_ebitda: null, fcf_yield_pct: null };
};
// XP: el PER de Yahoo mezcla precio en USD y BPA en BRL; se recalcula: 15,705 USD × 5,4064 ÷ 12,63 BRL (2027e) = 6,7x.
const empresas = [
  cmp('Itaú Unibanco', 'ITUB4', 'BR', 'ITUB4.SA'), cmp('Bradesco', 'BBDC4', 'BR', 'BBDC4.SA'), cmp('Santander Brasil', 'SANB11', 'BR', 'SANB11.SA'),
  cmp('Banco do Brasil', 'BBAS3', 'BR', 'BBAS3.SA'), cmp('XP Inc.', 'XP', 'BR', 'XP', 6.7), cmp('Nu Holdings', 'NU', 'BR', 'NU'),
  cmp('Goldman Sachs', 'GS', 'US', 'GS'), cmp('Morgan Stanley', 'MS', 'US', 'MS'),
];
const ys = Y['BPAC11.SA'];
const D = {
  _estado: 'Completa. Precio = cierre del 26-oct-2026 (60,00 BRL), el día de la caída por la victoria de Lula; consenso y comparables de Yahoo al 27-oct (los objetivos de los analistas son en su mayoría ANTERIORES a las elecciones).',
  identificacion: {
    nombre: 'Banco BTG Pactual S.A.', nombre_corto: 'BTG Pactual', ticker: 'BPAC11', isin: 'BRBPACUNT006', mercado: 'B3 (São Paulo), units BPAC11 (1 ON + 2 PNA)', indice_referencia: 'Ibovespa',
    pais: 'Brasil', pais_iso: 'BR', sector: 'Financials', industria: 'Capital Markets / Banks', sede: 'São Paulo', fundacion: '1983', empleados: 12169, web: 'https://ri.btgpactual.com',
    precio: 60.0, fecha_precio: '2026-10-26', acciones: 3862.552, capitalizacion_publicada: Math.round(ys.cap / 1e6), free_float_pct: 30.7,
    max_52s: B.identificacion.max_52s, min_52s: 47.53, volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M BRL/día (3 meses)`, proximos_resultados: '2026-11-10',
  },
  consenso: {
    guidance: 'BTG no publica guía de beneficio; el único objetivo es «sostener un ROAE por encima del 25 %» (informe del 4T25, 9-feb-2026), que cumplió en el 1S26 (26,6 %) [A2]. Después del 26-oct no ha cambiado ningún mensaje: los resultados del 3T26 se publican el 10-nov-2026 antes de la apertura [D8].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(ys.trend[2].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(ys.trend[2].bpa), dpa: null, fuente: `Yahoo Finance, ${ys.trend[2].n} analistas [D2]` },
      { periodo: '2027e', ingresos: Math.round(ys.trend[3].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(ys.trend[3].bpa), dpa: null, fuente: `Yahoo Finance, ${ys.trend[3].n} analistas [D2]` },
    ],
    recomendaciones: { n_analistas: ys.n_analistas, comprar: ys.reco.strongBuy + ys.reco.buy, mantener: ys.reco.hold, vender: ys.reco.sell + ys.reco.strongSell, po_medio: r2(ys.po_medio), po_min: ys.po_min, po_max: ys.po_max },
    revisiones: `El BPA de 2026e pasó de ${String(r2(ys.trend[2].bpa_hace90)).replace('.', ',')} a ${String(r2(ys.trend[2].bpa)).replace('.', ',')} BRL por unit en 90 días y el de 2027e de ${String(r2(ys.trend[3].bpa_hace90)).replace('.', ',')} a ${String(r2(ys.trend[3].bpa)).replace('.', ',')} (subidas tras el 2T26) [D2]. Los objetivos subieron durante 2026: XP lo puso en 63 BRL a fin de 2026 en nov-2025, JP Morgan pasó a Comprar en junio y Citi subió el suyo en septiembre [D11, D12]. Ninguno recoge todavía la caída del 26-oct: el objetivo medio de ${String(r2(ys.po_medio)).replace('.', ',')} BRL es de antes de las elecciones.`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...B.bolsa, beta: B.betas.ajustada_mensual_5a, volatilidad_pct: 48.5, max_drawdown_pct: -37.8, posicion_corta_pct: null, comentario: 'BTG subió un 67 % en el año hasta el 23-oct (frente al 20 % del Ibovespa) por beneficios récord y por la apuesta de una victoria de Flávio Bolsonaro: +27 % tras la primera vuelta (5-oct) [D10, D11]. El 26-oct, primer día tras la victoria de Lula, cayó un 24,83 % a 60,00 BRL (mínimo de 48,93, −38,7 %), después de un circuit breaker en el Ibovespa (−13,5 %) [D1, D9, D10]. Es la acción de banco más sensible al ciclo político y de mercados de capitales: beta ajustada de 1,28 frente al Ibovespa (1,42 sin ajustar, 1,60 semanal a 2 años) [D1].' },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: B.cierres_ejercicio.find((c) => c.anio === a).precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Con el beneficio ajustado del año siguiente, BTG cotizó a 13,9x (cierre de 2020), 9,7x (2021), 8,8x (2022), 11,6x (2023), 6,3x (2024) y 10,0x (2025, con nuestro 2026e) [D1, A2-A4]. A 60 BRL cotiza a 10,2x nuestro BPA de 2027e y a 2,91 veces el valor contable de jun-2026: el PER está en su mediana, pero el P/VC es el más alto de los bancos brasileños porque el ROE (26-27 %) también lo es. El EV/EBITDA no tiene sentido en un banco.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Bancos brasileños cotizados (Itaú, Bradesco, Santander Brasil, Banco do Brasil), las dos plataformas financieras brasileñas más parecidas en inversión y banca digital (XP, Nu) y los dos bancos de inversión globales con negocio de patrimonios (Goldman Sachs, Morgan Stanley). Solo se usa el PER de los próximos 12 meses (2027e de Yahoo) y el ROE; el EV/EBITDA no aplica a bancos. B3 queda fuera (bolsa, no banco). Precios del 26-oct-2026, ya con la caída electoral.',
    empresas,
    comentario: 'La mediana del PER 2027e de los ocho es de 7,5x (Itaú 8,3x, Bradesco 5,6x, Santander 6,1x, Banco do Brasil 4,2x, XP 6,7x, Nu 11,2x, Goldman 12,1x, Morgan Stanley 13,5x) [D2]. BTG a 10,2x nuestro 2027e (9,8x el consenso) cotiza con prima sobre los brasileños, justificada por el ROE (26,7 % frente al 21,5 % de Itaú y 11-14 % de Bradesco y Santander) y por el crecimiento del 20-25 % anual del beneficio, y con descuento frente a los bancos de inversión de EE. UU., que tienen menos riesgo país [D2].',
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) Informes de BTG de 2025-2026: compras de Julius Baer Brasil, JGP, Justa, HSBC Uruguay, M.Y. Safra y MeuTudo sin precio ni múltiplo publicado; 2) prensa sobre la compra del resto de Banco Pan: canje de 0,2128 units por acción y prima > 30 % sobre el precio, sin P/VC calculable con fuente [D14]; 3) operaciones de bancos y gestoras brasileñas (XP-Itaú 2017-2021): sin múltiplos homogéneos con fuente primaria abierta', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'r/investimentos, últimos mensajes (26-27 oct-2026): pánico, «compras en la caída» y bancos tras la reelección de Lula', editor: 'Reddit (RSS)', tipo: 'Foros y redes', fecha: '2026-10-27', url: 'https://www.reddit.com/r/investimentos/new/.rss' },
  { id: 2, titulo: 'Ideas de inversión sobre BMFBOVESPA:BPAC11', editor: 'TradingView', tipo: 'Foros y redes', fecha: '2026-10-27', url: 'https://www.tradingview.com/symbols/BMFBOVESPA-BPAC11/ideas/' },
  { id: 3, titulo: 'Ibovespa desaba 13 % após eleição (directo del 26-oct-2026, con opiniones de gestoras y bancos sobre comprar en la caída)', editor: 'InfoMoney', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://www.infomoney.com.br/mercados/ibovespa-hoje-bolsa-de-valores-ao-vivo-26102026/' },
];
const E = {
  _estado: 'Parcial: los foros de Brasil más usados (ADVFN, Status Invest, Investing) dan 403; solo Reddit (RSS) y TradingView abren. Sin cifras.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Reddit r/investimentos', fecha: '2026-10', n_comentarios: 25, tono: 'Dividido', resumen: 'El 26-27 oct domina el pánico (posiciones con pérdidas, preguntas sobre sacar el dinero de Brasil) frente a quienes ven la caída como ocasión de compra en bancos, sobre todo Banco do Brasil; se comparte que tras un circuit breaker el Ibovespa suele recuperar en unos 34 pregones [E1].' },
      { plataforma: 'TradingView (ideas de BPAC11)', fecha: '2026-10', n_comentarios: 5, tono: 'Dividido', resumen: 'Ideas de análisis técnico: compra en retroceso con objetivo por encima de 100 BRL frente a otras que esperan confirmación de giro bajista [E2].' },
      { plataforma: 'Directo de InfoMoney (comentarios de gestoras)', fecha: '2026-10', n_comentarios: 10, tono: 'Negativo', resumen: 'JP Morgan, Morgan Stanley y el propio BTG esperan una corrección relevante de la bolsa; parte de los inversores defiende comprar con horizonte largo [E3].' },
    ],
    temas: [
      { tema: 'Riesgo fiscal y tipos tras la victoria de Lula', postura: 'Bajista', peso: 'Alto', contraste: 'El bono a 10 años subió 2,46 puntos al 15,44 %: con ese tipo, nuestro coste del capital sube del 20,0 % al 22,5 % y el valor intrínseco baja de 32,8 a 26,4 BRL. La preocupación es fundada.' },
      { tema: 'Comprar bancos en la caída', postura: 'Alcista', peso: 'Medio', contraste: 'Con la regla a 12 meses BTG queda a +7 % ponderado: la caída no lo convierte en compra; los bancos estatales son otro caso.' },
      { tema: 'BTG como «trade» electoral', postura: 'Dividida', peso: 'Medio', contraste: 'Subió un 27 % tras la primera vuelta y lo devolvió en un día: el precio se movió por la política, no por los resultados (beneficio +31 % en el 1S26).' },
    ],
    lectura: 'El sentimiento es de capitulación parcial: pánico en los foros de particulares y gestoras que esperan más corrección, frente a una minoría que compra la caída. No aporta un riesgo que el análisis no tenga (el fiscal y de tipos ya está en el coste del capital) y no contradice al consenso de analistas, que aún no ha bajado objetivos. Fuentes escasas: confianza baja.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas');

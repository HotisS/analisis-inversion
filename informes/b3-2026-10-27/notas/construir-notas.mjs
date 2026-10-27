// Escribe las notas A-E de B3 (corte 2026-10-27) con lo leído en notas/docs: datos abiertos de la CVM (DFP 2017-2025 e ITR 2026,
// filas de B3 en notas/docs/b3cvm), notas de resultados 4T24, 4T25 y 2T26, informe de 2023 y 4T20 (ri.b3.com.br / mziq),
// Yahoo (notas/bolsa.json, notas/yahoo-datos.json) y búsquedas web citadas. Ejecutar: node informes/b3-2026-10-27/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(dir, '..', '..', '..');
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
// Tipos de cambio al cierre del 26-oct-2026 (Yahoo; el USD es el dólar comercial de InfoMoney, 5,403)
const FX = { BRL: 1, USD: 5.403, HKD: 0.689, EUR: 6.0345, GBP: 7.2042, GBp: 0.072042, JPY: 0.0341, MXN: 0.2906, SGD: 4.217, AUD: 3.7924 };

// ---------------------------------------------------------------- A. Cuentas (CVM, DFP consolidada, NIIF; millones de BRL)
const fA = [
  { id: 1, titulo: 'DFP 2025 consolidada de B3 S.A. (DRE, balance, DFC, DVA; versión 1 recibida el 26-feb-2026), datos abiertos de la CVM', editor: 'CVM, Portal de Dados Abertos (dfp_cia_aberta_2025.zip)', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/DFP/DADOS/dfp_cia_aberta_2025.zip' },
  { id: 2, titulo: 'DFP 2023 consolidada de B3 S.A. (ejercicios 2022 y 2023)', editor: 'CVM, Portal de Dados Abertos', tipo: 'Primaria', fecha: '2024-02-22', url: 'https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/DFP/DADOS/dfp_cia_aberta_2023.zip' },
  { id: 3, titulo: 'DFP 2021 y DFP 2019 consolidadas de B3 S.A. (ejercicios 2018-2021)', editor: 'CVM, Portal de Dados Abertos', tipo: 'Primaria', fecha: '2022-03', url: 'https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/DFP/DADOS/dfp_cia_aberta_2021.zip' },
  { id: 4, titulo: 'ITR 1T26 y 2T26 consolidados de B3 S.A. (recibidos el 7-may y el 11-ago-2026)', editor: 'CVM, Portal de Dados Abertos (itr_cia_aberta_2026.zip)', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/ITR/DADOS/itr_cia_aberta_2026.zip' },
  { id: 5, titulo: 'Release de Resultados 2T26 (ingresos por segmento, despesas ajustadas, EBITDA recurrente, lucro recurrente, deuda, JCP, Dimensa)', editor: 'B3 S.A. (ri.b3.com.br; copia en Poder360)', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://static.poder360.com.br/uploads/2026/08/Release-de-Resultados-2T26.pdf' },
  { id: 6, titulo: 'Release de Resultados 4T25 (imposto diferido de R$ 1,04 bi por la subida de la CSLL, JCP extraordinario, payout 2025, guía de gastos 2025)', editor: 'B3 S.A. (copia en Poder360)', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://static.poder360.com.br/2026/02/B3-4T25.pdf' },
  { id: 7, titulo: 'Demonstrações Financeiras 2023 y Relatório da Administração (lucro recurrente 2022 y 2023, fin del beneficio fiscal del ágio de Cetip en el 2T22)', editor: 'B3 S.A. (ri.b3.com.br, mziq)', tipo: 'Primaria', fecha: '2024-02-22', url: 'https://api.mziq.com/mzfilemanager/v2/d/5fd7b7d8-54a1-472d-8426-eb896ad8a3c4/d1122f03-9e28-8411-262d-fb93ae66aa9f?origin=1' },
  { id: 8, titulo: 'Release de Resultados 4T24 (lucro recurrente del 4T24 y del 3T24)', editor: 'B3 S.A. (copia en Poder360)', tipo: 'Primaria', fecha: '2025-02-20', url: 'https://static.poder360.com.br/2025/02/balanco-financeiro-b3-4o-tri-2024.pdf' },
  { id: 9, titulo: 'Release de Resultados 4T23 (lucro recurrente del 4T23)', editor: 'B3 S.A. (ri.b3.com.br, mziq)', tipo: 'Primaria', fecha: '2024-02-22', url: 'https://api.mziq.com/mzfilemanager/v2/d/5fd7b7d8-54a1-472d-8426-eb896ad8a3c4/cd9d7c4b-7079-cb54-752e-795c07debea4?origin=1' },
  { id: 10, titulo: 'B3 bate recorde com receita de R$ 3,2 bi no primeiro trimestre de 2026 (lucro recurrente 1T26 +33,1 %)', editor: 'Eu Quero Investir', tipo: 'Prensa', fecha: '2026-05-07', url: 'https://euqueroinvestir.com/acoes/b3-bate-recorde-com-receita-de-r-32-bi-no-primeiro-trimestre-de-2026' },
  { id: 11, titulo: 'Lucro líquido recorrente da B3 cai 7,1 % em 12 meses para R$ 1,130 bi no 1º trimestre (2024)', editor: 'Folha Vitória / Estadão Conteúdo', tipo: 'Prensa', fecha: '2024-05-09', url: 'https://www.folhavitoria.com.br/economia/lucro-liquido-recorrente-da-b3-cai-7-1-em-12-meses-para-r-1-130-bi-no-1-trimestre/' },
  { id: 12, titulo: 'B3 (B3SA3) lucra R$ 1,22 bilhão no segundo trimestre (2T24)', editor: 'Suno Notícias', tipo: 'Prensa', fecha: '2024-08-08', url: 'https://www.suno.com.br/noticias/?p=569873' },
  { id: 13, titulo: 'Release de Resultados 4T20 (conciliación del lucro recurrente: amortización de intangibles de Cetip e imposto diferido do ágio)', editor: 'B3 S.A. (ri.b3.com.br, mziq)', tipo: 'Primaria', fecha: '2021-03-04', url: 'https://api.mziq.com/mzfilemanager/v2/d/5fd7b7d8-54a1-472d-8426-eb896ad8a3c4/5c816e59-e27a-60b3-3b44-17ecc9afa153?origin=1' },
];

// Cuenta: ingresos = receita líquida (3.03: ingresos menos PIS, Cofins e ISS); EBIT = 3.05 menos la equivalencia (3.04.06);
// amortizaciones de la DVA (7.04.01); BPA diluido de la DRE (2018-2019 divididos entre 3 por el desdoblamiento de 2021).
const C = [
  // periodo, ingresos, gastos (G&A), ebit, D&A, fin (bai−ebit), bai, impuestos, minor, bn, gfin, impairment, bpa dil, dpa total, dpa extra
  ['2018', 4832, 2433, 2390, 953, -52, 2338, 250, 1, 2087, 541, 9, 0.3388, 0.234, 0],
  ['2019', 5908, 2679, 3229, 1030, 110, 3339, 626, -1, 2714, 446, 0, 0.4405, 0.442, 0],
  ['2020', 8383, 2702, 5600, 1041, -84, 5516, 1365, -2, 4152, 460, 80, 0.6757, 0.678, 0],
  ['2021', 9248, 2928, 6317, 1057, 199, 6516, 1799, 0, 4717, 730, 4, 0.7739, 0.776, 0],
  ['2022', 9092, 3519, 5572, 1056, 218, 5790, 1564, 1, 4226, 1594, 0, 0.7116, 0.386, 0],
  ['2023', 8930, 3686, 5245, 1090, 313, 5558, 1426, 1, 4132, 1475, 0, 0.7222, 0.446, 0],
  ['2024', 9513, 3395, 6051, 572, 73, 6124, 1547, 0, 4577, 1571, 68, 0.8344, 0.296, 0],
  ['2025', 10068, 3436, 6632, 387, 314, 6946, 2359, 1, 4586, 1901, 0, 0.8812, 0.584, 0.290],
];
const cuenta = C.map(([periodo, ingresos, gg, ebit, am, fin, bai, imp, mi, bn, gf, nr, bpa, dpa, dx]) => ({
  periodo, ingresos, coste_ventas: null, gastos_generales: gg, ebitda: ebit + am, amortizaciones: am, ebit, resultado_financiero: fin, bai, impuestos: imp, minoritarios: mi,
  beneficio_neto: bn, gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr || null, bpa, dpa, dpa_extraordinario: dx, acciones_diluidas: r1(bn / bpa),
}));

// Balance: activo y pasivo sin las garantías en efectivo de los participantes de la cámara (2.01.05.02.04) ni los proventos de títulos en custodia (2.01.05.02.05),
// que se restan también de la caja (están invertidos en aplicações financeiras). Caja = disponibilidades + aplicações corto y largo − esas dos partidas.
const B = [
  // periodo, activo, act corr, pas corr, pas total, ágio, software, inmov, clientes, prov, caja bruta, garantías, proventos, deuda, PN dominante, minor, reservas
  ['2018', 37672, 7476, 5756, 12628, 22339, 4796, 627, 324, 191, 6842 + 274 + 1738 + 0, 2111, 60, 4509, 25033, 11, 3523],
  ['2019', 40027, 10469, 8055, 14626, 22416, 4071, 690, 339, 184, 9471 + 33 + 1940 + 65, 3013, 70, 4365, 25388, 13, 3870],
  ['2020', 46333, 17101, 9678, 21811, 22409, 3276, 809, 412, 221, 15507 + 96 + 2247 + 66, 5696, 76, 7059, 24510, 11, 3684],
  ['2021', 52532, 21095, 12959, 30112, 23604, 3027, 904, 436, 218, 19138 + 8 + 2634 + 321, 6357, 97, 14198, 22408, 11, 2527],
  ['2022', 47595, 17130, 9306, 27311, 23697, 2098, 921, 504, 219, 14905 + 9 + 2226 + 574, 4757, 141, 12111, 20271, 12, 3896],
  ['2023', 49422, 18844, 12154, 29135, 24459, 1762, 873, 566, 293, 15989 + 63 + 1854 + 501, 3617, 163, 14009, 20273, 13, 5651],
  ['2024', 45229, 15173, 9160, 26846, 24334, 1312, 857, 507, 335, 13300 + 186 + 1826 + 406, 3829, 181, 13228, 18370, 13, 6916],
  ['2025', 48488, 17712, 9292, 31024, 24359, 1212, 880, 618, 391, 15541 + 390 + 2044 + 633, 3712, 189, 14945, 17442, 22, 6808],
];
const historico = B.map(([periodo, at, ac, pc, pt, ag, sw, inm, cli, prov, cb, ga, pr, deuda, pn, mi, res]) => ({
  periodo, activo_total: at - ga - pr, activo_corriente: ac - ga - pr, pasivo_corriente: pc - ga - pr, pasivo_total: pt - ga - pr, fondo_comercio: ag, intangibles: sw,
  inmovilizado_material: inm, existencias: 0, clientes: cli, proveedores: prov, activos_contrato: null, pasivos_contrato: null, caja: cb - ga - pr, deuda_financiera: deuda,
  arrendamientos: 0, patrimonio_neto: pn, minoritarios: mi, reservas: res,
}));

// Flujos: operativo = caixa gerado nas operações (que suma los intereses devengados) − IR pagado; sin las variaciones de aplicações financeiras,
// garantías de la cámara ni coberturas (tesorería, no explotación). 2018-2019: IR pagado aproximado por el impuesto corriente (la DFP no lo separa).
// Intereses pagados en financiación: 2022-2025 de la DFC; 2018-2021 aproximados por el gasto de intereses sumado en el operativo.
const F = [
  ['2018', 3973 + 10, 271, 0, 0, 1529, 0, 372],
  ['2019', 4788 - 194, 297, 51, 0, 2062, 76, 316],
  ['2020', 6282 - 594, 442, 12, 0, 3884, 798, 259],
  ['2021', 7343 - 870, 381, 1868, 0, 6705, 729, 597],
  ['2022', 7091 - 1287, 215, 22, 12, 2643, 3746, 1300],
  ['2023', 6352 - 1177, 231, 646, 1, 2036, 2150, 1243],
  ['2024', 6766 - 1435, 249, 8, 3, 2044, 3835, 1389],
  ['2025', 7948 - 1540, 287, 44, 5, 1445, 3008, 1495],
];
const flujos = F.map(([periodo, fo, capex, adq, des, div, rec, int]) => ({ periodo, flujo_operativo: fo, capex, pagos_arrendamientos: 0, adquisiciones: adq, desinversiones: des, dividendos: div, recompras: rec, emision_acciones: 0, intereses_en_financiacion: int }));

const A = {
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 10068 - 4930 + 5639, ebitda: (6638 - 3258 + 3867) - (6 - 0 + (-2)) - 124 + (387 - 194 + 191), ebit: (6638 - 3258 + 3867) - 4 - 124, beneficio_neto: 4586 - 2432 + 3176, bpa: r2(0.8812 - 0.4643 + 0.6300), dpa: null, dpa_extraordinario: null, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Compra de Neoway (datos y analítica, ≈ R$ 1.800 M en caja) en diciembre de 2021; base de la línea Trillia (Soluções Analíticas de Dados).' },
    ],
    comentario: 'Los ingresos netos (receita líquida, tras PIS, Cofins e ISS) pasaron de 4.832 M BRL en 2018 a 10.068 M en 2025 [A1, A3]: el salto de 2020-2021 (8.383 y 9.248 M) fue el auge de la bolsa con tipos del 2 %, y en 2022-2023 los ingresos bajaron con la Selic al 13,75 % (9.092 y 8.930 M) [A2]. En 2024-2025 volvieron a crecer (+6,5 % y +5,8 %) por la diversificación: renta fija, datos (Trillia), tecnología y servicios para fondos [A1, A6]. En el 1S26 los ingresos netos fueron de 5.639 M (+14,4 %): el volumen medio diario de contado subió un 20 % y los ingresos recurrentes un 17 % [A4, A5]. El margen EBITDA publicado pasó del 69 % al 69,7 % en 2025; las amortizaciones cayeron de 1.090 M en 2023 a 387 M en 2025 al terminar de amortizarse los intangibles de la combinación con Cetip, y eso explica la subida del EBIT (de 5.245 a 6.632 M) más que el negocio [A1, A7]. El beneficio neto de 2025 (4.586 M) lleva un cargo no recurrente de 1.043,9 M por actualizar el impuesto diferido de la amortización fiscal del ágio tras la subida de la CSLL, compensado en parte por 510 M de ahorro fiscal de un JCP extraordinario [A6].',
    ajustes: 'B3 publica un «lucro líquido recorrente» que suma la amortización de intangibles de compras (la de Cetip, ≈ 500-520 M netos al año hasta 2023) y quita partidas no recurrentes; es la base del consenso y la que usa este informe para el BPA a 12 meses [A6, A7, A13]. Cifras del lucro recurrente: 4.766,6 M en 2022 y 4.601,3 M en 2023 [A7]; 2024 ≈ 4.777 M (suma de trimestres: 1.130 [A11], ≈ 1.220 [A12], 1.226,0 y 1.201,0 [A8]; estimación propia por trimestre de prensa); 2025 ≈ 5.123 M (≈ 1.126,7 del 1T25, derivado del +33,1 % del 1T26 [A10]; 1.274,9; 1.257,5; 1.464,3 [A5, A6]). En 2026: 1.499,6 M en el 1T y 1.376,6 M en el 2T [A5]. Partidas no recurrentes recientes: impuesto diferido de 1.043,9 M y beneficio de JCP extraordinario de 510 M en el 4T25 [A6]; plusvalía de 123,9 M por la venta del 37,5 % de Dimensa, 277,5 M de beneficio fiscal de JCP extraordinario y 40,5 M de costes del cambio de dirección en el 2T26 [A5]. El impairment de 2018, 2020, 2021 y 2024 va en no recurrentes del EBITDA.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 2399, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1598, margen_ebitda_pct: 66.6, bpa: 0.23, vs_consenso: null },
      { periodo: '1T25', ingresos: 2388, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.22, vs_consenso: null },
      { periodo: '2T25', ingresos: 2542, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1716, margen_ebitda_pct: 67.5, bpa: 0.25, vs_consenso: null },
      { periodo: '3T25', ingresos: 2486, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1727, margen_ebitda_pct: 69.5, bpa: 0.24, vs_consenso: null },
      { periodo: '4T25', ingresos: 2652, crecimiento_pct: 10.5, crecimiento_organico_pct: null, ebitda: 1830, margen_ebitda_pct: 69.0, bpa: 0.29, vs_consenso: 'Superior' },
      { periodo: '1T26', ingresos: 2873, crecimiento_pct: 20.3, crecimiento_organico_pct: null, ebitda: 2053, margen_ebitda_pct: 71.5, bpa: 0.30, vs_consenso: null },
      { periodo: '2T26', ingresos: 2766, crecimiento_pct: 8.8, crecimiento_organico_pct: null, ebitda: 1939, margen_ebitda_pct: 70.1, bpa: 0.28, vs_consenso: null },
    ],
    ultima_presentacion: 'En el 2T26 (11-ago-2026) los ingresos totales fueron de 3.081,4 M BRL (+12,2 %) y los netos de 2.765,7 M (+8,8 %): los ingresos ligados al ciclo crecieron un 7,9 % y los recurrentes un 17,3 % [A5]. El volumen medio diario de contado fue de 31.310 M (+20,1 %), con BDR +41,8 % y fondos cotizados +73,6 %, pero los derivados cayeron un 8,3 % en contratos (futuros de bitcoin −84,5 % tras subir las garantías exigidas) [A5]. Hubo el primer IPO en cinco años (3.000 M) y 8.600 M de ampliaciones [A5]. Los gastos ajustados subieron un 6,2 % (IPCA + 1,5 %); el EBITDA recurrente fue de 1.938,6 M (margen 70,2 %) y el lucro recurrente de 1.376,6 M (+8,0 %; BPA recurrente 0,28, +12,3 %) [A5]. B3 vendió su 37,5 % de Dimensa por 665 M y pagó 1.106 M de JCP (750 M extraordinarios) y 196,9 M de recompras [A5]. En junio anunció a Christian Egan como consejero delegado en sustitución de Gilson Finkelsztain; el mensaje de la dirección pasa de la eficiencia a «clientes, tecnología y personas» [A5]. Frente al 4T25, el discurso cambia de los volúmenes (que en el 4T25 aún no se recuperaban) a la diversificación: datos para el mercado de capitales +28,4 %, servicios para fondos +31,4 %, duplicata escritural en producción desde julio y la stablecoin B3RL en pruebas [A5, A6]. No hay transcripción de la conferencia en las fuentes leídas.',
    confianza: 'Media',
  },
  balance: {
    historico,
    vencimientos: [],
    liquidez: 'Disponibilidades y aplicaciones de 19.291 M BRL a 30-jun-2026, de las que 2.655 M son garantías en efectivo de participantes de la cámara y 184 M proventos de títulos en custodia (no son de B3) [A4, A5]. Endeudamiento bruto de 14.933 M (83 % a largo plazo), 2,0 veces el EBITDA recurrente de 12 meses [A5].',
    rating: null,
    coste_deuda_pct: 12.7,
    vida_media_anios: null,
    otros_pasivos: 'Las garantías depositadas por los participantes en las cámaras de B3 son en su mayoría títulos fuera del balance; la parte en efectivo (2.655 M a 30-jun-2026; 3.712 M en diciembre de 2025) figura como pasivo con su contrapartida en aplicaciones financieras y se quita de la caja, del activo y del pasivo de este informe [A4]. Pasivo por impuesto diferido de 6.841 M, creado por la amortización fiscal del ágio (BM&FBovespa y Cetip): solo se pagaría si se vendiera el negocio, y no se trata como deuda [A4, A6]. Provisiones para litigios fiscales, civiles y laborales de 655 M [A4]. JCP declarado y pendiente de pago de 1.582 M a 30-jun-2026 (va al puente) [A4]. Quedan ≈ 3.250 M de saldos de JCP de años anteriores por distribuir en próximos ejercicios con su ahorro fiscal (4.000 M al cierre de 2025 menos 750 M usados en el 2T26) [A5, A6].',
    comentario: 'La deuda bruta subió de 4.509 M en 2018 a 14.945 M en 2025 para financiar recompras (3.746 M en 2022, 3.835 M en 2024 y 3.008 M en 2025) y la compra de Neoway [A1, A3]; la caja propia (sin garantías de terceros) se mantiene en 14.000-16.500 M, así que la deuda neta es casi nula (63 M en el puente de junio de 2026). El circulante comercial es pequeño (clientes 618 M frente a proveedores 391 M en 2025). El patrimonio baja de 25.033 M a 17.442 M por las recompras y la amortización de acciones; el ágio (24.359 M) es mayor que el patrimonio [A1, A4].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo de este informe es el «caixa gerado nas operações» menos el impuesto pagado, sin los movimientos de aplicaciones financieras, garantías de la cámara ni coberturas, que en la DFC de B3 van dentro de explotación y la hacen saltar de −637 M a 9.893 M según el año [A1, A2]. Así medido, pasó de 3.983 M en 2018 a 6.408 M en 2025, por encima del beneficio neto todos los años porque la amortización y el impuesto diferido no son caja [A1]. El capex es pequeño: 287 M en 2025 (2,9 % de los ingresos netos) y una guía de 260-350 M para 2026; B3 lleva a gasto parte de la modernización (451 M de desembolsos totales de tecnología en el 1S26) [A5, A6]. Las compras grandes fueron Neoway (2021, 1.868 M) y Neurotech (2023, 646 M); la caja va sobre todo a JCP, dividendos y recompras (6.300 M en 2025, un 137 % del beneficio) [A6]. 2018-2019 y los intereses de 2018-2021 son estimación propia (la DFP de esos años no separa el impuesto ni los intereses pagados).',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers Auditores Independentes', anios_auditor: null, opinion: 'Favorable (DFP 2025)',
    comentario: 'Las cuentas de la CVM cuadran con las notas de resultados (ingresos, balance, deuda bruta de 14,9 mil millones) [A1, A5, A6]. Las diferencias entre beneficio publicado y recurrente vienen de cargos fiscales: el impuesto diferido del ágio (1.043,9 M en el 4T25, sin caja) y los JCP extraordinarios (510 M y 277,5 M de ahorro fiscal), que no se repiten [A5, A6]. La amortización de intangibles de Cetip terminó en 2024, así que el BPA publicado de 2025-2026 ya se parece al recurrente salvo esos efectos. La remuneración en acciones es moderada (182,3 M en 2025, un 4 % del beneficio) [A6]. Las cifras de balance quitan las garantías en efectivo de la cámara. El motor calcula Altman, Piotroski y Beneish sobre ese balance; con un ágio mayor que el patrimonio y caja casi igual a la deuda, el Altman Z no dice mucho de una infraestructura de mercado. Auditor: no verificado en el parecer (dato de memoria de la DFP; ver huecos).',
    senales: [
      { senal: 'Cargos fiscales no recurrentes grandes (impuesto diferido del ágio y JCP extraordinarios)', nivel: 'Media', comentario: 'Mueven el beneficio publicado un 10-20 % en algunos trimestres [A5, A6].' },
      { senal: 'Flujo operativo de la DFC mezclado con tesorería y garantías', nivel: 'Baja', comentario: 'Se reconstruye sin esos movimientos [A1].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Guía de reparto para 2026 de entre el 90 % y el 110 % del beneficio, en JCP, dividendos y recompras, y programa de recompra de hasta 230 M de acciones (≈ 4,5 % del capital en circulación) para 2026-2027 [D6]. Quedan ≈ 3.250 M de saldos de JCP de años anteriores por pagar en próximos ejercicios con su ahorro fiscal [A5, A6]. En 2025 devolvió 6.300 M (3.000 M de JCP y 3.300 M de recompras, el 4,6 % del capital: payout del 137 %) [A6]. Deuda bruta en torno a 2 veces el EBITDA recurrente [A5].',
    adquisiciones: [
      { anio: '2017', objetivo: 'Cetip (registro, custodia y negociación de renta fija y gravámenes de vehículos)', importe: null, ev_ebitda: null, financiacion: 'Caja y acciones', resultado: 'Integrada; generó ≈ 7.900 M de ágio y ≈ 500 M netos al año de amortización de intangibles hasta 2023-2024; es la base de Renda Fixa, Trillia (SNG) y Tecnologia [A1, A7].' },
      { anio: '2021', objetivo: 'Neoway (datos y analítica)', importe: 1868, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en Trillia, que crece un 22 % en el 2T26 (en parte por el cambio de cobro del SNG) [A5].' },
      { anio: '2023', objetivo: 'Neurotech (crédito y prevención de fraude)', importe: 646, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en Trillia [A5].' },
      { anio: '2026', objetivo: 'Venta del 37,5 % de Dimensa (opción de venta)', importe: 665, ev_ebitda: null, financiacion: 'Desinversión', resultado: 'Plusvalía no recurrente de 123,9 M en el 2T26 [A5].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Mercados', descripcion: 'Derivados (tipos, índices, divisa, cripto), renta variable (negociación, compensación y custodia), renta fija y crédito, préstamo de títulos.', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 7196, resultado: null }, { periodo: '2025', ingresos: 7415, resultado: null }] },
      { nombre: 'Soluções para Mercado de Capitais', descripcion: 'Datos de mercado, depositaria de contado, cotización y servicios a emisores.', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 611, resultado: null }, { periodo: '2025', ingresos: 672, resultado: null }] },
      { nombre: 'Soluções Analíticas de Dados (Trillia)', descripcion: 'SNG (gravámenes de vehículos), inmobiliario, crédito y prevención de fraude (Neoway, Neurotech).', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 1018, resultado: null }, { periodo: '2025', ingresos: 1124, resultado: null }] },
      { nombre: 'Tecnologia e Plataformas', descripcion: 'Uso de sistemas de balcão, servicios para fondos, co-location.', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 1664, resultado: null }, { periodo: '2025', ingresos: 1909, resultado: null }] },
      { nombre: 'Otros e impuestos sobre ingresos', descripcion: 'Otros ingresos y reversión de provisiones menos PIS, Cofins e ISS (los segmentos se publican en bruto).', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 84 - 1060, resultado: null }, { periodo: '2025', ingresos: 1 - 1054, resultado: null }] },
    ],
    geografias: [],
    geografias_criterio: null,
    kpis: [
      { kpi: 'Volumen medio diario de contado (ADTV)', valor_anterior: '26.067 M BRL (2T25)', valor_actual: '31.310 M BRL (2T26)', variacion: '+20,1 %', comentario: 'Acciones +21,2 %, BDR +41,8 %, fondos cotizados +73,6 % [A5].' },
      { kpi: 'Contratos medios diarios de derivados (ADV)', valor_anterior: '12,1 M (2T25)', valor_actual: '11,1 M (2T26)', variacion: '−8,3 %', comentario: 'Por los futuros de bitcoin; tipos en BRL +6,7 % [A5].' },
      { kpi: 'Receita por contrato (RPC) media', valor_anterior: '1,134 BRL', valor_actual: '1,180 BRL', variacion: '+4,1 %', comentario: 'Mezcla con menos opciones de IDI [A5].' },
      { kpi: 'Margen de negociación y postnegociación de contado', valor_anterior: '3,159 pb', valor_actual: '3,074 pb', variacion: '−0,085 pb', comentario: 'Escalado por volumen [A5].' },
      { kpi: 'Inversores individuales en la depositaria (media)', valor_anterior: '5,335 M', valor_actual: '5,667 M', variacion: '+6,2 %', comentario: '[A5]' },
      { kpi: 'Stock medio de Tesouro Direto', valor_anterior: '164.000 M BRL', valor_actual: '236.000 M BRL', variacion: '+43,7 %', comentario: 'Con tipos altos el ahorro va a renta fija, donde B3 también cobra [A5].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Datos abiertos de la CVM (sin nota de deuda); 2) release 2T26 (solo el 83 % a largo plazo); 3) notas explicativas de la DFP 2025 (PDF no descargado)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'rating', tipo: 'Complemento', intentos: '1) Release 2T26 y 4T25 (no lo citan); 2) datos abiertos de la CVM (no lo traen); 3) no se buscó en Moody\'s o S&P por tiempo', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos (2018-2023 y resultado por segmento)', tipo: 'Complemento', intentos: '1) DFP 2025 (segmentación nueva desde 2024); 2) releases 4T25 y 2T26 (solo ingresos); 3) DFP 2023 con la segmentación antigua, no comparable', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Release de Resultados 2T26 (productos, Tesouro Direto, duplicata escritural, B3RL, índices)', editor: 'B3 S.A.', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://static.poder360.com.br/uploads/2026/08/Release-de-Resultados-2T26.pdf' },
  { id: 2, titulo: 'Release de Resultados 4T25 (lanzamientos de productos, renta fija, Tesouro Direto)', editor: 'B3 S.A.', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://static.poder360.com.br/2026/02/B3-4T25.pdf' },
  { id: 3, titulo: 'Demonstrações Financeiras 2023 y Relatório da Administração (historia desde la combinación con Cetip en 2017)', editor: 'B3 S.A.', tipo: 'Primaria', fecha: '2024-02-22', url: 'https://api.mziq.com/mzfilemanager/v2/d/5fd7b7d8-54a1-472d-8426-eb896ad8a3c4/d1122f03-9e28-8411-262d-fb93ae66aa9f?origin=1' },
  { id: 4, titulo: 'Datos de los comparables (márgenes y crecimiento) de Yahoo Finance quoteSummary, 26-oct-2026', editor: 'Yahoo Finance (notas/yahoo-datos.json)', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://finance.yahoo.com/quote/B3SA3.SA' },
  { id: 5, titulo: 'Informes value del repositorio de bolsas (HKEX 16-oct, CME 26-oct, LSEG 26-oct): estructura del sector de infraestructura de mercados', editor: 'Repositorio analisis-inversion', tipo: 'Datos de mercado', fecha: '2026-10-26', url: null },
];
const yd = JSON.parse(fs.readFileSync(path.join(dir, 'yahoo-datos.json'), 'utf8')).datos;
const comp = (t, nombre, pais) => { const x = yd[t]; return { nombre, pais, ticker: t, ingresos: Math.round((x.ventas / 1e6) * FX[x.divisa === 'GBp' ? 'GBP' : x.divisa]), cuota_pct: null, margen_ebit_pct: r1(x.margen_op * 100), comentario: null }; };
const Bn = {
  historia: {
    resumen: 'B3 nace en marzo de 2017 de la combinación de BM&FBovespa (que ya unía desde 2008 la Bolsa de São Paulo y la de mercadorias e futuros) con Cetip, el registro y depósito de renta fija y de gravámenes de vehículos [B3]. Es la única bolsa de Brasil: negocia, compensa, liquida y custodia acciones, derivados y renta fija, y registra la mayor parte de los títulos de deuda y de los gravámenes de vehículos del país. Cotiza en el Novo Mercado (una sola clase de acciones, sin accionista de control). Desde 2020 compró empresas de datos (Neoway en 2021, Neurotech en 2023) y en 2024 reorganizó la información por segmentos con Trillia como marca de datos [A1]. En 2026 cambió de consejero delegado (Christian Egan sustituye a Gilson Finkelsztain tras nueve años) [C3].',
    hitos: [
      { anio: '2008', hito: 'Fusión de Bovespa y BM&F (BM&FBovespa).' },
      { anio: '2017', hito: 'Combinación con Cetip: nace B3 [B3].' },
      { anio: '2020', hito: 'Récord de inversores particulares y de volumen con la Selic en el 2 %.' },
      { anio: '2021', hito: 'Desdoblamiento de 3 por 1 y compra de Neoway.' },
      { anio: '2022', hito: 'Fin del beneficio fiscal de la amortización del ágio de Cetip (2T22) [B3].' },
      { anio: '2023', hito: 'Compra de Neurotech; los volúmenes caen con la Selic al 13,75 %.' },
      { anio: '2025', hito: 'Nueva tarifa de renta variable, opciones semanales de Ibovespa y contratos de eventos financieros [B2].' },
      { anio: '2026', hito: 'Primer IPO en cinco años, duplicata escritural, stablecoin B3RL en pruebas, venta de Dimensa y nuevo consejero delegado (Christian Egan) [B1].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'B3 es la infraestructura de mercado de Brasil: bolsa de acciones y derivados, cámara de compensación central, depositaria de valores, registro de renta fija y de derivados de balcão, y proveedor de datos [B1]. Mercados aportó el 67 % de los ingresos brutos de 2025 (derivados, renta variable, renta fija y crédito, préstamo de títulos); Tecnologia e Plataformas el 17 % (uso de los sistemas de balcão por bancos y fondos, servicios a fondos); Trillia el 10 % (registro de gravámenes de vehículos SNG, datos de crédito y fraude) y Soluções para Mercado de Capitais el 6 % (datos de mercado, depositaria, cotización) [A1]. Sus clientes son bancos, corretoras, gestoras, emisores, financieras de automóviles y, a través de ellos, 5,7 millones de inversores particulares [B1].',
    como_gana_dinero: 'Cobra por operación (un margen en puntos básicos sobre el volumen de contado y una tarifa por contrato en derivados) y por stock (custodia, registro de renta fija, uso mensual de sistemas, gravámenes registrados), con tarifas que se ajustan por inflación cada año [B1]. Alrededor del 60 % de los ingresos depende del ciclo del mercado (volúmenes) y el resto es recurrente [B1]. Los costes son casi fijos (2.346 M de gastos ajustados en 2025, que crecen cerca del IPCA), así que el margen EBITDA recurrente (≈ 70 %) sube con los volúmenes [A6]. La caja propia rinde el CDI, y la deuda, en su mayoría, también lo paga: el efecto neto de los tipos sobre el resultado financiero es pequeño. Los tipos altos sí mueven el negocio: menos volumen en acciones y más en renta fija y derivados de tipos.',
    clientes: 'No hay un cliente que pese de forma significativa (no se publica concentración). La relación es casi obligatoria: B3 es la única bolsa y cámara del país, y la mayor parte del registro de renta fija privada y de gravámenes de vehículos pasa por sus sistemas [B1]. El poder de precio se ve en las tarifas ajustadas por inflación (depositaria y cotización en 2026) y en que el margen de contado ha bajado poco (3,07 pb) pese a los descuentos por volumen [B1]. El riesgo de precio viene del regulador y de los clientes grandes: la CVM y el Banco Central vigilan las tarifas y han abierto la puerta a otras infraestructuras.',
  },
  sector: {
    definicion: 'El mercado relevante es la **infraestructura de mercados de capitales de Brasil** (negociación, compensación, depósito y registro de valores y derivados), donde B3 es casi monopolista; no hay una fuente independiente que lo mida en reales, así que el tamaño se aproxima con los ingresos de B3 en Mercados y con los volúmenes de mercado que publica la propia empresa [B1]. Como referencia mundial, las bolsas cotizadas comparables (HKEX, CME, ICE, Nasdaq, Cboe, LSEG, BMV, SGX, ASX) facturan entre 1.300 y 11.000 M USD con márgenes operativos del 35-76 % [B4].',
    tamano: 'Sin fuente independiente en BRL: el contado de acciones de Brasil negoció 31.310 M BRL al día en el 2T26, sobre una capitalización media de 5,15 billones BRL; derivados de balcão con un stock de 8,9 billones [B1].',
    unidad_serie: null,
    serie: [],
    tcac_historico_pct: null,
    tcac_previsto_pct: null,
    cr5_pct: null,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Tipos de interés (Selic) y flujo hacia la renta variable', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Con la Selic al 2 % (2020-2021) los ingresos subieron a 9.248 M; con el 13,75 % (2023) bajaron a 8.930 M [A1].' },
      { driver: 'Volatilidad y cobertura (derivados de tipos y divisa)', efecto: '+', horizonte: 'Cíclico', evidencia: 'ADV de tipos en BRL en máximo histórico en mar-2026 por el conflicto de Oriente Medio [B1].' },
      { driver: 'Profundización de la renta fija privada y del Tesouro Direto', efecto: '+', horizonte: 'Estructural', evidencia: 'Stock de deuda corporativa +14,4 % y Tesouro Direto +43,7 % en el 2T26 [B1].' },
      { driver: 'Diversificación a datos y tecnología', efecto: '+', horizonte: 'Estructural', evidencia: 'Ingresos recurrentes +17,3 % en el 2T26 [B1].' },
      { driver: 'Flujo extranjero y capitalización bursátil en BRL', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El margen de contado se cobra sobre el volumen en reales: el Ibovespa cayó un 13,9 % el 26-oct-2026 y el real un 8 % [D10, D12].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 1, justificacion: 'Única bolsa y cámara de Brasil; los competidores potenciales (ATG, otras infraestructuras de registro) no tienen cuota relevante en las fuentes leídas.' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Los grandes bancos y corretoras negocian descuentos por volumen y presionan por tarifas; el margen de contado baja con el volumen [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Personal y tecnología (nube); gastos ajustados que crecen cerca del IPCA [B1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Licencias de la CVM y del Banco Central, efecto red de la liquidez y de la cámara; el regulador quiere más competencia.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Listados en el exterior (ADR, BDR) y negociación de balcão; los BDR y ETF se negocian en la propia B3 [B1].' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'Hasta el 23-oct el ciclo era de expansión (ADTV +20 % en el 2T26, primer IPO en cinco años) [B1]. La victoria de Lula del 25-oct lo da la vuelta: Ibovespa −13,9 % y real −8 % el 26-oct, DI de 2031 al 15,24 % (+2,7 puntos) y el mercado espera subidas de la Selic [D10, D12]. En 2021-2023, con la Selic subiendo del 2 % al 13,75 %, los ingresos de B3 cayeron un 3,4 % en dos años y el BPA publicado bajó de 0,77 a 0,71 [A1]; en 2020 subió. La volatilidad de los primeros meses suele subir los volúmenes de derivados.' },
    regulacion: 'B3 está supervisada por la CVM y el Banco Central (infraestructura del mercado financiero). En 2025-2026 cambian tres cosas que tocan sus cifras: la Lei Complementar 224/2025 sube la CSLL desde el 2T26 (tipo nominal del 37 % en vez del 34 %) y obligó a actualizar el impuesto diferido (1.043,9 M en el 4T25) [A5, A6]; desde 2026 se gravan los dividendos por encima de 50.000 BRL al mes en la persona física; y la duplicata escritural abre un mercado de registro nuevo con varias registradoras autorizadas [B1]. Tras el 25-oct, el riesgo regulatorio es fiscal: el mercado teme más impuestos sobre dividendos y JCP o un impuesto sobre la riqueza, que bajarían el atractivo de la renta variable y el ahorro fiscal de B3 [D13].',
    tendencias: 'La tokenización (stablecoin B3RL en pruebas), los contratos de eventos y la negociación de BDR y ETF amplían la oferta sin depender del ciclo local [B1]. La duplicata escritural y el registro de crédito son nuevas fuentes de ingresos recurrentes, pero con competencia de otras registradoras. La IA afecta poco a una infraestructura regulada; puede ayudar en datos (Trillia) y en costes.',
    confianza: 'Baja',
  },
  competencia: {
    cuota_pct: null,
    posicion: '**Única bolsa y cámara central de contraparte de Brasil**, y mayor registradora de renta fija privada y de gravámenes de vehículos del país; tercera bolsa de América por capitalización de sus listadas tras las de EE. UU. y Canadá (estimación propia) [B1].',
    competidores: [
      comp('CME', 'CME Group', 'EE. UU.'), comp('ICE', 'Intercontinental Exchange', 'EE. UU.'), comp('NDAQ', 'Nasdaq', 'EE. UU.'),
      comp('0388.HK', 'HKEX', 'Hong Kong'), comp('LSEG.L', 'LSEG', 'Reino Unido'), comp('BOLSAA.MX', 'Bolsa Mexicana de Valores', 'México'),
    ].map((c) => ({ ...c, comentario: 'No compite en Brasil; referencia de margen operativo (Yahoo, últimos 12 meses), ingresos convertidos a BRL al 26-oct [B4].' })),
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 5, evidencia: 'Toda la liquidez de acciones y derivados listados de Brasil está en B3; 5,7 M de inversores en su depositaria [B1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Bancos, fondos y corretoras conectados a sus sistemas de balcão (24.328 clientes de uso mensual) [B1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Licencias de bolsa, cámara, depositaria y registradora de la CVM y el Banco Central.' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Margen EBITDA recurrente del 70 %, por encima del 35-66 % operativo de las grandes bolsas comparables [A5, B4].' },
        { fuente: 'Escala eficiente', puntuacion: 5, evidencia: 'Un mercado de este tamaño no sostiene dos cámaras con la misma liquidez.' },
      ],
    },
    amenazas: 'Tres amenazas, todas regulatorias o macro: (1) que la CVM y el Banco Central fuercen competencia en negociación o registro (probabilidad media a cinco años; el registro de duplicatas ya es abierto); (2) que la política fiscal tras las elecciones (impuestos sobre dividendos y JCP, riqueza) aleje el ahorro de la renta variable y quite a B3 el ahorro fiscal de sus JCP (media); (3) que la fuga de capital extranjero hunda la capitalización en reales y con ella el volumen de contado (media, cíclica) [D10, D13].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es la resiliencia operativa y la ciberseguridad de una infraestructura sistémica (cámara y depositaria) y la gobernanza de los datos de inversores. En 2026 B3 entró en el Dow Jones Best in Class global y de mercados emergentes, y registra más de 6,4 M de créditos de carbono [B1].',
    controversias: 'Sin sanciones relevantes en los tres últimos años en las fuentes leídas (releases 2025-2026).',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamano y serie del mercado', tipo: 'Núcleo', intentos: '1) Releases de B3 (volúmenes, no tamaño en BRL); 2) ficha sectorial del repo (no hay de bolsas emergentes); 3) informes de las comparables (otro perímetro)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Release 2T26 (solo índices DJSI); 2) release 4T25; 3) no se buscó en MSCI/Sustainalytics por tiempo', decision: 'Omitido' },
  ],
};
guarda('B', Bn);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Christian Egan é escolhido como novo CEO da B3 (19-may-2026)', editor: 'Bora Investir (B3)', tipo: 'Primaria', fecha: '2026-05-19', url: 'https://borainvestir.b3.com.br/noticias/empresas/christian-egan-e-escolhido-como-novo-ceo-da-b3/' },
  { id: 2, titulo: 'Release de Resultados 2T26 (cambios en la Dirección Ejecutiva, costes extraordinarios, JCP)', editor: 'B3 S.A.', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://static.poder360.com.br/uploads/2026/08/Release-de-Resultados-2T26.pdf' },
  { id: 3, titulo: 'Christian George Egan é eleito novo diretor-presidente de B3', editor: 'Mercado & Consumo', tipo: 'Prensa', fecha: '2026-05-19', url: 'https://mercadoeconsumo.com.br/19/05/2026/gestao/christian-george-egan-e-eleito-novo-diretor-presidente-de-b3/' },
  { id: 4, titulo: 'Composición del capital (acciones emitidas y en tesorería) a 30-jun-2026, ITR 2T26', editor: 'CVM, Portal de Dados Abertos', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/ITR/DADOS/itr_cia_aberta_2026.zip' },
  { id: 5, titulo: 'Release de Resultados 4T25 y 2025 (guía de gastos cumplida en el punto medio)', editor: 'B3 S.A.', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://static.poder360.com.br/2026/02/B3-4T25.pdf' },
];
const Cn = {
  directivos: {
    equipo: [
      { nombre: 'Christian George Egan', cargo: 'Consejero delegado (diretor-presidente)', desde: '2026', participacion_pct: null, trayectoria: 'Más de 30 años en banca de inversión, mercados, tesorería y gestión de activos en Credit Suisse, Itaú, Tivio Capital y Santander Brasil [C1]. Elegido el 19-may-2026; sin historial en el cargo.' },
      { nombre: 'Gilson Finkelsztain', cargo: 'Consejero delegado saliente', desde: '2017', participacion_pct: null, trayectoria: 'Dirigió B3 nueve años: integración de Cetip, diversificación a datos y recompras; sale en 2026 [C1, C3].' },
      { nombre: 'Caio Ibrahim David', cargo: 'Presidente del consejo', desde: null, participacion_pct: null, trayectoria: 'Presidente del consejo en el nombramiento de Egan [C1].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Gastos ajustados (guía anual)', real: 'En la parte baja del intervalo; +6,2 % (IPCA + 1,4 %) [A8]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Gastos ajustados de 2.260-2.450 M; amortización de 340-400 M', real: '2.345,5 M y 387,0 M [C5]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Gastos ajustados de 2.400-2.600 M; capex de 260-350 M; reparto del 90-110 % [D6]', real: '1S26: gastos ajustados 1.192 M (+5,7 %), capex 112 M [C2]', cumplida: 'Parcial' },
    ],
    comentario: 'La guía de B3 es de gastos y reparto, no de ingresos, y la ha cumplido en 2024-2025 [A8, C5]. El cambio de consejero delegado en 2026, tras nueve años, costó 40,5 M de gastos extraordinarios en el 2T26 (rescisiones y pactos de no competencia) [C2]. El nuevo, Christian Egan, viene de la banca (Santander) y llega sin historial en B3; su primera guía será la de 2027 (diciembre). No hay información pública de un plan de sucesión más allá del relevo.',
    confianza: 'Baja',
  },
  gobierno: {
    consejo: [
      { nombre: 'Caio Ibrahim David', cargo: 'Presidente del consejo', tipo: 'Independiente', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: null, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: null,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'El programa de incentivo a largo plazo en acciones costó 182,3 M en 2025 y 107,9 M en el 1S26, más 40,5 M de aceleración de planes y rescisiones por el cambio de dirección en el 2T26 [C2, C5]. No se ha leído la propuesta de la junta (Formulário de Referência, sección 8) con las métricas y los votos: ver huecos.',
    accionistas: [
      { nombre: 'Autocartera', pct: 0.96, tipo: 'Autocartera', variacion: '48,2 M de acciones de 5.046,5 M a 30-jun-2026 (35,7 M a 31-mar); se amortizan periódicamente [C4].' },
    ],
    insiders: [],
    control_y_defensas: 'B3 cotiza en el Novo Mercado: una sola clase de acciones ordinarias con voto, capital disperso y sin accionista de control ni pacto conocido; los estatutos limitan el derecho de voto de un accionista (no verificado el porcentaje en esta iteración) [C4]. Como infraestructura del mercado, los cambios de control y de consejeros están sometidos a la CVM y al Banco Central.',
    alertas: ['Cambio de consejero delegado en 2026 tras nueve años, con 40,5 M de costes extraordinarios [C2].'],
    confianza: 'Baja',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'consejo completo, comisiones y votos de remuneración', tipo: 'Núcleo', intentos: '1) ri.b3.com.br (Formulário de Referência no descargado por tiempo); 2) datos abiertos de la CVM (FRE no bajado); 3) prensa (solo el presidente del consejo)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'accionistas significativos', tipo: 'Complemento', intentos: '1) Composición de capital de la CVM (solo totales y tesorería); 2) Yahoo (68 % institucional, sin nombres); 3) Formulário de Referência no descargado', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders (operaciones de directivos de 12 meses)', tipo: 'Complemento', intentos: '1) Formulários consolidados del art. 11 (CVM) no descargados; 2) prensa: sin compras o ventas relevantes citadas; 3) releases: no las mencionan', decision: 'Omitido' },
  ],
};
guarda('C', Cn);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'B3SA3.SA, BOVA11.SA, ^BVSP: históricos diarios hasta el 26-oct-2026 (precio, rango, volumen, beta, rentabilidades, cierres de año; movimiento.mjs)', editor: 'Yahoo Finance (herramientas/bolsa.mjs y movimiento.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://finance.yahoo.com/quote/B3SA3.SA/history' },
  { id: 2, titulo: 'B3SA3.SA y comparables: consenso de BPA (earningsTrend), objetivo medio, recomendaciones, valor empresa y EBITDA (quoteSummary)', editor: 'Yahoo Finance (notas/yahoo-datos.json)', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://finance.yahoo.com/quote/B3SA3.SA/analysis' },
  { id: 3, titulo: 'Brazil 10Y government bond yield: 15,435 % el 26-oct-2026 (anterior 12,98 %)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://tradingeconomics.com/brazil/government-bond-yield' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Release de Resultados 2T26 (deuda bruta, caja, JCP declarado)', editor: 'B3 S.A.', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://static.poder360.com.br/uploads/2026/08/Release-de-Resultados-2T26.pdf' },
  { id: 6, titulo: 'B3 promete payout elevado em 2026, mas guidance de custos acende alerta (guía 2026: gastos ajustados de 2.400-2.600 M, capex de 260-350 M, payout del 90-110 %, recompra de hasta 230 M de acciones)', editor: 'InfoMoney', tipo: 'Prensa', fecha: '2025-12-15', url: 'https://www.infomoney.com.br/?p=3141347' },
  { id: 7, titulo: 'ITR 2T26 de la CVM: balance consolidado y composición del capital a 30-jun-2026', editor: 'CVM, Portal de Dados Abertos', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/ITR/DADOS/itr_cia_aberta_2026.zip' },
  { id: 8, titulo: 'Transacciones del informe de S&P Global del repo (Refinitiv, IHS Markit, Adenza, MarketAxess, With Intelligence, Preqin, Black Knight)', editor: 'Repositorio analisis-inversion (informes/sp-global-2026-10-12)', tipo: 'Datos de mercado', fecha: '2026-10-12', url: null },
  { id: 9, titulo: 'Tipos de cambio frente al real al cierre del 26-oct-2026 (USDBRL, HKDBRL, EURBRL, GBPBRL, JPYBRL, MXNBRL, SGDBRL, AUDBRL)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://finance.yahoo.com/quote/BRL=X' },
  { id: 10, titulo: 'Ibovespa desaba 13 % após eleição, em dia de circuit breaker; dólar dispara 8 % (cierre del 26-oct: Ibovespa 176.608 puntos, −13,88 %; dólar 5,403; DI1F27 13,723 %, DI1F31 15,240 %, DI1F35 15,195 %; B3 −36,28 %)', editor: 'InfoMoney', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://www.infomoney.com.br/mercados/ibovespa-hoje-bolsa-de-valores-ao-vivo-26102026/' },
  { id: 11, titulo: 'B3 (B3SA3): ação chega a cair 50 % após reeleição de Lula, mas fecha em queda de 36 % (Lula 51,79 % frente a 48,21 %)', editor: 'InfoMoney', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://www.infomoney.com.br/mercados/b3-b3sa3-desempenho-eleicoes-segundo-turno-26102026/' },
  { id: 12, titulo: 'Brazil Stocks Plunge 13.88 % After Lula Win (circuit breaker, bancos −13 a −22 %, temores fiscales y de control estatal)', editor: 'The Rio Times', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://www.riotimesonline.com/brazil-markets-ibovespa-real-monday-october-26-2026/' },
  { id: 13, titulo: 'Ação da B3 despenca após vitória de Lula (temor a impuestos sobre dividendos o a la riqueza; nota de B3 de que sigue el escenario)', editor: 'Brasil em Folhas', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://brasilemfolhas.com.br/2026/10/acao-da-b3-despenca-apos-vitoria-de-lula/' },
  { id: 14, titulo: 'Brazil stocks brace for selloff after Lula\'s win; EWZ ETF falls 27 % in premarket', editor: 'Invezz', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://invezz.com/news/2026/10/26/brazil-stocks-brace-for-selloff-after-lulas-win-ewz-etf-falls-27-in-premarket/' },
  { id: 15, titulo: 'Calendario de resultados del 3T26: B3 publica el 12-nov-2026', editor: 'BP Money', tipo: 'Prensa', fecha: '2026-10', url: 'https://www.bpmoney.com.br/negocios/empresas-na-bolsa/resultados-3t26-calendario-balancos-b3/' },
  { id: 16, titulo: 'BOLSY (ADR de B3 en OTC, 1 ADR = 3 acciones): cierre del 26-oct-2026 en 8,38 USD', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://finance.yahoo.com/quote/BOLSY' },
];
const lista = [['CME', 'CME Group', 'US'], ['ICE', 'Intercontinental Exchange', 'US'], ['NDAQ', 'Nasdaq', 'US'], ['CBOE', 'Cboe Global Markets', 'US'], ['0388.HK', 'HKEX', 'HK'], ['LSEG.L', 'LSEG', 'GB'], ['BOLSAA.MX', 'Bolsa Mexicana de Valores', 'MX'], ['S68.SI', 'Singapore Exchange', 'SG'], ['ASX.AX', 'ASX', 'AU']];
const empresas = lista.map(([t, nombre, pais]) => {
  const x = yd[t]; const cur = x.divisa === 'GBp' ? 'GBP' : x.divisa; const precio = x.divisa === 'GBp' ? x.precio / 100 : x.precio;
  const y0 = x.trend.find((r) => r.periodo === '0y'); const y1 = x.trend.find((r) => r.periodo === '+1y');
  const bpaNtm = (2 / 12) * y0.bpa + (10 / 12) * y1.bpa; const g = y1.crec_ventas ?? 0;
  const cap = (x.cap / 1e6) * FX[cur]; const evL = x.ev / 1e6; const capL = x.cap / 1e6;
  return { nombre, ticker: t, pais, capitalizacion: Math.round(cap), ev_ventas: r2(evL / (x.ventas / 1e6)), ev_ebitda_ltm: r1(x.ev_ebitda), ev_ebitda_ntm: r1(x.ev_ebitda / (1 + g)), per_ntm: r1(precio / bpaNtm), crecimiento_pct: r1(g * 100), margen_ebitda_pct: r1((x.ebitda / x.ventas) * 100), roic_pct: null, dn_ebitda: r2((evL - capL) / (x.ebitda / 1e6)), fcf_yield_pct: x.fcf ? r1((x.fcf / x.cap) * 100) : null };
});
const tx = JSON.parse(fs.readFileSync(path.join(raiz, 'informes', 'sp-global-2026-10-12', 'notas', 'D.json'), 'utf8')).transacciones.operaciones
  .map((o) => ({ ...o, ev: Math.round(o.ev * FX.USD), comentario: (o.comentario || '').replace(/\s*\[[\d,\s-]+\]/g, '') + ' Valor empresa pasado a BRL a 5,403 [8].' }));
const Dn = {
  identificacion: {
    nombre: 'B3 S.A. – Brasil, Bolsa, Balcão', nombre_corto: 'B3', ticker: 'B3SA3', isin: 'BRB3SAACNOR6', mercado: 'B3 (Novo Mercado); ADR nivel I en OTC (BOLSY, 1 ADR = 3 acciones)', indice_referencia: 'Ibovespa',
    pais: 'Brasil', pais_iso: 'BR', sector: 'Finanzas', industria: 'Bolsas e infraestructura de mercados', sede: 'São Paulo', fundacion: '2017', empleados: null, web: 'https://ri.b3.com.br',
    precio: 15.07, fecha_precio: '2026-10-26', acciones: 4998.3, capitalizacion_publicada: Math.round(yd['B3SA3.SA'].cap / 1e6), free_float_pct: null,
    max_52s: 24.28, min_52s: 11.83, volumen_medio_diario: '≈ 900 M BRL/día (3 meses; 49 M de acciones)', proximos_resultados: '2026-11-12',
  },
  consenso: {
    guidance: 'Guía de 2026 (diciembre de 2025): gastos ajustados de 2.400-2.600 M BRL, capex de 260-350 M, desembolsos totales de 3.170-3.610 M y reparto del 90-110 % del beneficio, con un programa de recompra de hasta 230 M de acciones [D6]. B3 no da guía de ingresos ni de beneficio. En el 1S26 los gastos ajustados fueron de 1.192,4 M (+5,7 %) y el capex de 112 M [D5]. La guía de 2027 se publica normalmente en diciembre.',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(yd['B3SA3.SA'].trend.find((r) => r.periodo === '0y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(yd['B3SA3.SA'].trend.find((r) => r.periodo === '0y').bpa), dpa: null, fuente: 'Yahoo Finance, 8 analistas (anterior a las elecciones) [D2]' },
      { periodo: '2027e', ingresos: Math.round(yd['B3SA3.SA'].trend.find((r) => r.periodo === '+1y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(yd['B3SA3.SA'].trend.find((r) => r.periodo === '+1y').bpa), dpa: null, fuente: 'Yahoo Finance, 8 analistas [D2]' },
    ],
    recomendaciones: { n_analistas: 14, comprar: 10, mantener: 4, vender: 0, po_medio: 22.64, po_min: 16.0, po_max: 30.0 },
    revisiones: 'Las estimaciones de Yahoo son anteriores al 25-oct: el BPA de 2026 apenas cambió en 90 días (1,207 → 1,202) y el de 2027 subió (1,308 → 1,346) [D2]. El objetivo medio (22,64 BRL, 14 analistas, 10 comprar y 4 mantener) es de antes de la caída del 26-oct y queda un 50 % por encima del precio: es de esperar que se revise a la baja con la Selic más alta y el real más débil. Solo hay un proveedor gratuito con estimaciones; no se ha podido contrastar con MarketScreener ni con notas de bancos posteriores a las elecciones (hueco temporal).',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: null,
  multiplos_historicos: {
    serie: [
      { anio: '2018', precio_cierre: 8.94, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2019', precio_cierre: 14.32, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2020', precio_cierre: 20.66, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2021', precio_cierre: 11.14, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 13.21, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 14.55, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 10.32, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 13.89, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Nueve bolsas cotizadas con cámara o depositaria propias: CME, ICE, Nasdaq y Cboe (EE. UU.), HKEX, LSEG, Bolsa Mexicana (la más parecida por país emergente y tipos altos), Singapur y ASX. Fuera Deutsche Börse (Yahoo no da valor empresa), Euronext (sin capitalización) y JPX (consenso de un solo analista para 2026). Cifras de Yahoo Finance al cierre del 26-oct-2026: PER de los próximos 12 meses con 2/12 del BPA de 2026 y 10/12 del de 2027 del consenso; EV/EBITDA de los próximos 12 meses estimado con el crecimiento de ventas del consenso (estimación propia); capitalización en M BRL al cambio del 26-oct [D2, D9]. Las bolsas de países con tipos bajos cotizan a 18-25 veces: su PER no se puede aplicar a una empresa que descuenta con un bono al 15,4 %; por eso pesan poco.',
    empresas,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: { operaciones: tx, comentario: null, confianza: 'Baja' },
  fuentes: fD,
  huecos: [],
};
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
Dn.bolsa = { ...bolsa.bolsa, posicion_corta_pct: null, comentario: null, confianza: 'Media' };
guarda('D', Dn);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'B3 (B3SA3): ação chega a cair 50 % após reeleição de Lula (noticia y reacción del mercado)', editor: 'InfoMoney', tipo: 'Foros y redes', fecha: '2026-10-26', url: 'https://www.infomoney.com.br/mercados/b3-b3sa3-desempenho-eleicoes-segundo-turno-26102026/' },
  { id: 2, titulo: 'Ação da B3 derrete até 50 % e fecha com queda de 36 % após reeleição de Lula', editor: 'BP Money', tipo: 'Foros y redes', fecha: '2026-10-26', url: 'https://bpmoney.com.br/mercado/acoes/b3-b3sa3-queda-36-apos-reeleicao-lula-segundo-turno/' },
  { id: 3, titulo: 'Brazil stocks sell off after Lula win as Weiss Ratings flags Nu Holdings, EWZ opportunity', editor: 'Traders Union', tipo: 'Foros y redes', fecha: '2026-10-26', url: 'https://tradersunion.com/news/stocks/show/3974620-brazil-stocks-selloff-lula-win-nu-ewz/' },
  { id: 4, titulo: 'B3 (B3SA3): resultado do 2T26 acende alerta no mercado', editor: 'Eu Quero Investir', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://euqueroinvestir.com/acoes/b3-resultado-acende-alerta-no-mercado' },
  { id: 5, titulo: 'B3 (B3SA3) resultado 2T26: diversificação amortece a perda de força dos volumes', editor: 'Genial Investimentos (Analisa)', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://analisa.genialinvestimentos.com.br/acoes/b3/b3-b3sa3-resultado-2t26-diversificacao-amortece-a-perda-de-forca-dos-volumes' },
];
const En = {
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'InfoMoney (noticia del día y comentarios)', fecha: '2026-10', n_comentarios: null, tono: 'Negativo', resumen: 'La caída de B3 (−36 %, hasta −50 % en la apertura) se lee como apuesta contra el mercado de capitales brasileño tras la victoria de Lula, sin una noticia propia de la empresa [E1].' },
      { plataforma: 'BP Money (noticia y lectores)', fecha: '2026-10', n_comentarios: null, tono: 'Negativo', resumen: 'Atribuye la caída del sector financiero a la reelección; sin explicación específica para B3 [E2].' },
      { plataforma: 'Traders Union (análisis para particulares, EWZ)', fecha: '2026-10', n_comentarios: null, tono: 'Dividido', resumen: 'Parte de los comentaristas ve oportunidad en el desplome de Brasil (EWZ) y otros esperan más salidas de capital [E3].' },
      { plataforma: 'Eu Quero Investir y Genial (análisis del 2T26)', fecha: '2026-08', n_comentarios: null, tono: 'Dividido', resumen: 'Antes de las elecciones el debate era la pérdida de fuerza de los volúmenes compensada por la diversificación [E4, E5].' },
    ],
    temas: [
      { tema: 'Riesgo político y fiscal (dividendos, JCP, riqueza)', postura: 'Bajista', peso: 'Alto', contraste: 'El ahorro fiscal de los JCP vale ≈ 0,10-0,11 BRL por acción y año y quedan ≈ 3.250 M de saldos por usar (releases de B3): si se eliminaran, el BPA bajaría ≈ 8 % (estimación propia).' },
      { tema: 'Volúmenes con la Selic al alza', postura: 'Bajista', peso: 'Alto', contraste: 'En 2021-2023 la subida de la Selic bajó los ingresos un 3,4 % en dos años, no un 36 %; los derivados de tipos suben con la volatilidad (releases de B3).' },
      { tema: 'Diversificación y recurrentes', postura: 'Alcista', peso: 'Medio', contraste: 'Ingresos recurrentes +17,3 % en el 2T26 (release 2T26).' },
      { tema: 'Oportunidad tras el desplome', postura: 'Dividida', peso: 'Medio', contraste: 'A 15,07 BRL el PER sobre nuestro BPA de 2027 es de 12,7 veces, frente a 13,8 de mediana adelantada en 2021-2025.' },
    ],
    lectura: 'Lo leído son noticias con comentarios y análisis para particulares, no hilos de foro (los foros brasileños y Reddit no abren desde este entorno): confianza baja. El tono pasó en un día de dividido a negativo, con capitulación en la apertura (−50 %) y rebote parcial al cierre. Los inversores ven a B3 como la forma más directa de vender el mercado brasileño, que es lo que mide su beta de 1,57 frente al Ibovespa. El riesgo que señalan (impuestos sobre dividendos y JCP) está en el informe como bajista; no hay una noticia propia de B3 que explique la diferencia con el Ibovespa (−36 % frente a −14 %).',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', En);
console.log('Notas A-E escritas');

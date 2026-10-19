// Escribe las notas A-E de TUI AG (TUI1.DE, Xetra; corte 2026-10-19). Ejercicio a 30 de septiembre (FY2025 = oct-24 a sep-25).
// Fuentes primarias: informes anuales FY2022-FY2025, informes trimestrales Q1-Q3 FY2025 y Q1-Q3 FY2026, actualización previa al
// cierre del 22-sep-2026, presentaciones, informe de remuneraciones y declaración de gobierno FY2025, resultados de la junta de
// 2026 (todo en el CMS público de TUI: cdn.sanity.io/files/b6xulh2p), XBRL ESEF FY2021-FY2023 (filings.xbrl.org), BCE y Bundesbank.
// Mercado: Yahoo Finance y finanzen.net. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/tui-2026-10-19/notas/construir-notas.mjs. Cifras en millones de EUR salvo que se diga otra cosa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const SAN = (id, ext = 'pdf') => `https://cdn.sanity.io/files/b6xulh2p/production/${id}.${ext}`;
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const raw = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8'));

const U = {
  ar25: SAN('ea23b2d7f68b200d24a6d3c81181463332034342'), ar24: SAN('5d9f57cdc308c1b9b1d0d701e6eb142652a8a50d'),
  ar23: SAN('de9043afda46d400f448773c06c0ea8642e599ab'), ar22: SAN('11ad4fa52991c839c81cafd1a2e1c1482496fdf0'),
  q3_26: SAN('93e469c6800760565e5250c4cb693a9faa69d624'), q3_26a: SAN('9d1364d7df1d5c32a2c24f016480149dc3b30aba'), q3_26p: SAN('9ab0cfed9d117b45e5bab5bba7511c8da494d081'),
  h1_26: SAN('796aabd1286af241b34f8283fbdd18e78b22e862'), h1_26a: SAN('526a2aae3f546f23135401d818fbda917466bcae'),
  q1_26: SAN('01d2b5945e95ba746782ab59f1721394d2151804'), q1_26a: SAN('f9daf00c1d9bfea3281a9eac894836f02b15b594'),
  pre26: SAN('0a3392ea284cad090527a7b89d37726a4e28ca84'), pre26s: SAN('1a592d6e134367d32af5c188b866039e656bd18d'),
  fy25p: SAN('06299581b8e91bd733a1747bb2aa8cf7ed5828a0'), fy25r: SAN('9550ac6194997799453ccb8b328054234864c08f'),
  remun: SAN('78658da812c82062a72a829ba4b51a0ed8438d34'), gob: SAN('00820acd308fb5376ccf08018d141153d1cd72b6'), estr: SAN('a98995dbec43313e479b58838157fb305e8ed681'),
  junta: SAN('f4b088c0efa28595d6cfd34841a5615ebefea54d'), juntad: SAN('b43c7df0c9f172f757b9efe4ef2d88b5a6c8d2bd'), inv: SAN('da6002d3cb92d9d0491915604d6dfc8aa27a91a3'),
  q3_25: SAN('6a412ef50f334093bf1a67232208912ef9034c14'), h1_25: SAN('7e192e2c094cfbd1198c4bbfa7ef6e26ac404ebb'), q1_25: SAN('6ebc307c560832924e21b6b046d849d5a3320c34'),
  opa: SAN('08f1d79a2ab96bd74e8f8b097bbf73fd3630fd30'), fact: SAN('56d15022da32c12ec5054307dd8f2368094090d3'),
  seg26: SAN('45b468a64c14fd7faf089d3f0cbcda1daf6dad10', 'xlsx'), seg25: SAN('18e8814dc133c3408ae9c43f11d1254b3af93af3', 'xlsx'),
};

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025 (FY2025): estados consolidados FY2025 y FY2024, segmentos, deuda, arrendamientos, participadas (TUI Cruises, Riu), pensiones y anticipos de clientes', editor: 'TUI AG', tipo: 'Primaria', fecha: '2025-12-10', url: U.ar25 },
  { id: 2, titulo: 'Quarterly Statement Q3 2026 (9M FY2026: cuenta, balance a 30-jun-2026, flujos, deuda neta, supuestos de FY2026)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-08-12', url: U.q3_26 },
  { id: 3, titulo: 'Half-Year Financial Report H1 2026', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-05-13', url: U.h1_26 },
  { id: 4, titulo: 'Quarterly Statement Q1 2026', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-02-10', url: U.q1_26 },
  { id: 5, titulo: 'Annual Report 2024 (FY2024, con FY2023 reexpresado)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2024-12-04', url: U.ar24 },
  { id: 6, titulo: 'Annual Report 2023 (FY2023 y FY2022)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2023-12-06', url: U.ar23 },
  { id: 7, titulo: 'Annual Report 2022 (FY2022 y FY2021)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2022-12-14', url: U.ar22 },
  { id: 8, titulo: 'Informes anuales ESEF FY2021-FY2023 en XBRL (cuenta, balance y flujos; concepto propio tuiag:ShareOfResultOfInvestmentsAccountedForUsingTheEquityMethod)', editor: 'XBRL International (filings.xbrl.org) / TUI AG', tipo: 'Primaria', fecha: '2023-12-06', url: 'https://filings.xbrl.org/api/filings?filter[entity.identifier]=529900SL2WSPV293B552' },
  { id: 9, titulo: 'Pre-close Trading Update FY2026 (guía de EBIT subyacente de 1.200-1.300 M, reservas de verano 2026 e invierno 2026/27, coberturas)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-09-22', url: U.pre26 },
  { id: 10, titulo: 'Q3 2026 results announcement y presentación (guía de FY2026, costes de la guerra de Irán y del huracán de Jamaica)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-08-12', url: U.q3_26a },
  { id: 11, titulo: 'FY2025 results presentation (ambiciones a medio plazo, dividendo, ahorros de Markets + Airline)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2025-12-10', url: U.fy25p },
  { id: 12, titulo: 'Quarterly segment data Q3 FY2026 y FY2025 (EBIT subyacente por segmento y trimestre)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-08-12', url: U.seg26 },
  { id: 13, titulo: 'Factbook 2026 (modelo de negocio, ROIC por segmento, flota, hoteles y barcos)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-02-10', url: U.fact },
  { id: 14, titulo: 'H1 2026 results announcement (rebaja de la guía de FY2026 del 22-abr, coste de la guerra de Irán en el Q2)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-05-13', url: U.h1_26a },
  { id: 15, titulo: 'Quarterly Statement Q3 2025, Half-Year Report H1 2025 y Q1 2025 (comparativos trimestrales)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2025-08-13', url: U.q3_25 },
];

const cuenta = [
  { periodo: 'FY2021', ingresos: 4731.6, coste_ventas: 5955.4, gastos_generales: 840.5, ebitda: -1000.4, amortizaciones: 1012.4, ebit: -2012.8, resultado_financiero: -448.9, bai: -2461.7, impuestos: 19.2, minoritarios: -13.8, beneficio_neto: -2467.2, gastos_financieros: 464.1, participadas_en_ebitda: -232.7, no_recurrentes_en_ebitda: 5.0, bpa: -15.48, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 159.4 },
  { periodo: 'FY2022', ingresos: 16544.9, coste_ventas: 15613.3, gastos_generales: 746.3, ebitda: 1203.3, amortizaciones: 883.5, ebit: 320.0, resultado_financiero: -465.9, bai: -145.9, impuestos: 66.7, minoritarios: 64.6, beneficio_neto: -277.3, gastos_financieros: 509.5, participadas_en_ebitda: 100.7, no_recurrentes_en_ebitda: 1.6, bpa: -1.02, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 271.9 },
  { periodo: 'FY2023', ingresos: 20665.9, coste_ventas: 19052.9, gastos_generales: 1015.6, ebitda: 1858.4, amortizaciones: 859.1, ebit: 999.3, resultado_financiero: -448.1, bai: 551.2, impuestos: 95.5, minoritarios: 149.9, beneficio_neto: 305.8, gastos_financieros: 533.6, participadas_en_ebitda: 407.2, no_recurrentes_en_ebitda: -5.4, bpa: 0.80, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 384.3 },
  { periodo: 'FY2024', ingresos: 23167.3, coste_ventas: 21221.2, gastos_generales: 1045.8, ebitda: 2121.9, amortizaciones: 846.6, ebit: 1275.3, resultado_financiero: -413.9, bai: 861.4, impuestos: 154.0, minoritarios: 200.3, beneficio_neto: 507.1, gastos_financieros: 518.3, participadas_en_ebitda: 371.7, no_recurrentes_en_ebitda: 0.2, bpa: 1.00, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 507.4 },
  { periodo: 'FY2025', ingresos: 24178.7, coste_ventas: 22163.6, gastos_generales: 1122.0, ebitda: 2248.6, amortizaciones: 879.8, ebit: 1368.9, resultado_financiero: -334.7, bai: 1034.2, impuestos: 192.4, minoritarios: 205.8, beneficio_neto: 635.9, gastos_financieros: 429.0, participadas_en_ebitda: 463.9, no_recurrentes_en_ebitda: 23.6, bpa: 1.25, dpa: 0.10, dpa_extraordinario: 0, acciones_diluidas: 507.4 },
];

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 23786.5, ebitda: 2201.4, ebit: 1294.4, beneficio_neto: 601.4, bpa: 1.18, dpa: 0.10, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: 455.5, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: 'FY2023', descripcion: 'Agrupación de acciones 10:1 (feb-2023) y ampliación con derechos de 1.800 M (abr-2023) para devolver la ayuda del fondo alemán WSF: el BPA y las acciones de FY2021-FY2022 se reexpresan con un factor de ≈ 6 [5, 6].' },
      { periodo: 'FY2024', descripcion: 'Venta de hoteles a la sociedad conjunta con Riu (RIUSA NEC) y compras pequeñas de hoteles; sin cambios relevantes de perímetro en los ingresos [5].' },
    ],
    comentario: 'Los ingresos pasan de 4.732 M en FY2021 (pandemia) a 24.179 M en FY2025 [1, 7]; FY2022-FY2023 son la reapertura y FY2024-FY2025 crecen un 12 % y un 4 % [1, 5]. TUI presenta la cuenta por función y mete el resultado de sus participadas (TUI Cruises al 50 %, hoteles de Riu en sociedad conjunta, Royalton) dentro del EBIT: 463,9 M en FY2025, un 34 % del EBIT [1]. El motor lo saca del EBITDA y del EBIT (campo participadas_en_ebitda) y las participadas se valoran aparte en el puente. Sin participadas, el EBITDA de FY2025 es de 1.785 M (7,4 % de las ventas) y el EBIT de 905 M (3,7 %) [1]. El EBIT subyacente de la empresa (con participadas y sin partidas extraordinarias ni amortización de compras) fue de 977 M en FY2023, 1.296 M en FY2024 y 1.413 M en FY2025 [1, 5]. Por segmentos en FY2025: Hoteles 735 M, Cruceros 481 M (314 M de TUI Cruises), TUI Musement 67 M y Markets + Airline 200 M (1,0 % de margen) [12]. En FY2026 la guerra de Irán (desde marzo) y el huracán de Jamaica costaron 81 M en 9 meses y la guía de EBIT subyacente bajó a 1.200-1.300 M (−8 a −15 %) [2, 9].',
    ajustes: 'Cifras publicadas NIIF. no_recurrentes_en_ebitda: deterioros y reversiones de participadas incluidos en la línea de participadas (FY2021 5,0; FY2022 1,6; FY2023 −5,4; FY2024 0,2) [5, 6, 7] y, en FY2025, las partidas que TUI separa («separately disclosed items», 23,6 M: reestructuración y litigios) [1]. La amortización de intangibles de compras (20,6 M en FY2025) se deja en la amortización [1]. Ajustes de la propia TUI en FY2026: −70 a −90 M (guía) [2]. FY2021 y FY2022 están reexpresados por la agrupación 10:1 y la ampliación de 2023; el BPA de FY2021 (−15,48 €) y las acciones (159,4 M) son una reexpresión propia con el factor de ≈ 6 que la empresa aplicó a FY2022 (−0,17 € original a −1,02 €) [5, 7]. BPA básico (el diluido coincide salvo FY2025: 1,17 € con el convertible de 2031, que hoy está fuera de dinero) [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 4872.0, crecimiento_pct: 13.2, crecimiento_organico_pct: null, ebitda: 278.1, margen_ebitda_pct: 5.7, bpa: -0.17, vs_consenso: null },
      { periodo: '2T25', ingresos: 3704.6, crecimiento_pct: 1.5, crecimiento_organico_pct: null, ebitda: 11.0, margen_ebitda_pct: 0.3, bpa: -0.60, vs_consenso: null },
      { periodo: '3T25', ingresos: 6199.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 543.0, margen_ebitda_pct: 8.8, bpa: 0.36, vs_consenso: null },
      { periodo: '4T25', ingresos: 9402.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1439.5, margen_ebitda_pct: 15.3, bpa: 1.66, vs_consenso: null },
      { periodo: '1T26', ingresos: 4861.2, crecimiento_pct: -0.2, crecimiento_organico_pct: null, ebitda: 299.1, margen_ebitda_pct: 6.2, bpa: -0.09, vs_consenso: null },
      { periodo: '2T26', ingresos: 3701.0, crecimiento_pct: -0.1, crecimiento_organico_pct: null, ebitda: 37.8, margen_ebitda_pct: 1.0, bpa: -0.56, vs_consenso: null },
      { periodo: '3T26', ingresos: 5821.7, crecimiento_pct: -6.1, crecimiento_organico_pct: null, ebitda: 466.3, margen_ebitda_pct: 8.0, bpa: 0.16, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'Trimestres del ejercicio de TUI (1T = oct-dic). EBITDA subyacente con participadas. En el 3T26 (12-ago) el EBIT subyacente fue de 233,8 M frente a 320,6 M, con 20 M de costes de la guerra de Irán; en 9 meses, 118,3 M frente a 164,7 M, con 81 M de partidas puntuales (Irán 60 M, huracán de Jamaica 21 M) [2, 10]. La dirección repitió que Hoteles y Cruceros siguen creciendo (precio medio por noche +4 %, días de crucero +12 % en el 4T) y que Markets + Airline sufre reservas más tardías y un 5 % menos de capacidad propia [9, 10]. El 22-sep la actualización previa al cierre estrechó la guía de EBIT subyacente de FY2026 a 1.200-1.300 M a tipo de cambio constante (FY2025: 1.413 M): ingresos reservados del verano 2026 −5 % (Reino Unido −7 %, Alemania −2 %) y del invierno 2026/27 −7 %, pero solo −1 % en las últimas cuatro semanas [9]. Coberturas de combustible: 98 % del verano 2026, 63 % del invierno 2026/27 y 39 % del verano 2027 [9]. Resultados de FY2026 el 9-dic-2026.',
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: 'FY2021', activo_total: 14155.7, activo_corriente: 2933.3, pasivo_corriente: 6240.3, pasivo_total: 14574.1, fondo_comercio: 2993.1, intangibles: 498.6, inmovilizado_material: 3159.3, existencias: 42.8, clientes: 471.6, proveedores: 2052.4, activos_contrato: null, pasivos_contrato: null, caja: 1583.9, deuda_financiera: 3320.7, arrendamientos: 3229.4, patrimonio_neto: -1085.8, minoritarios: 667.3, reservas: -8525.7 },
      { periodo: 'FY2022', activo_total: 15255.5, activo_corriente: 3903.8, pasivo_corriente: 8742.7, pasivo_total: 14609.8, fondo_comercio: 2970.6, intangibles: 507.6, inmovilizado_material: 3400.9, existencias: 56.1, clientes: 1011.8, proveedores: 3316.5, activos_contrato: null, pasivos_contrato: null, caja: 1736.9, deuda_financiera: 2051.3, arrendamientos: 3207.5, patrimonio_neto: -141.6, minoritarios: 787.3, reservas: -8432.7 },
      { periodo: 'FY2023', activo_total: 16152.4, activo_corriente: 4546.5, pasivo_corriente: 8876.9, pasivo_total: 14205.2, fondo_comercio: 2949.2, intangibles: 538.0, inmovilizado_material: 3480.3, existencias: 62.1, clientes: 1090.4, proveedores: 3373.7, activos_contrato: 939.9, pasivos_contrato: 3530.2, caja: 2060.3, deuda_financiera: 1297.0, arrendamientos: 2918.1, patrimonio_neto: 1122.9, minoritarios: 824.3, reservas: -8474.6 },
      { periodo: 'FY2024', activo_total: 17416.7, activo_corriente: 5268.8, pasivo_corriente: 10029.3, pasivo_total: 15642.4, fondo_comercio: 2998.7, intangibles: 589.6, inmovilizado_material: 3697.4, existencias: 66.4, clientes: 1145.7, proveedores: 3393.2, activos_contrato: 1086.1, pasivos_contrato: 4017.1, caja: 2848.2, deuda_financiera: 1902.4, arrendamientos: 2639.8, patrimonio_neto: 956.4, minoritarios: 817.9, reservas: -7531.5 },
      { periodo: 'FY2025', activo_total: 18148.9, activo_corriente: 5681.1, pasivo_corriente: 10275.4, pasivo_total: 15462.2, fondo_comercio: 2933.6, intangibles: 596.8, inmovilizado_material: 4133.3, existencias: 69.0, clientes: 1047.4, proveedores: 3355.4, activos_contrato: 1109.8, pasivos_contrato: 4094.3, caja: 3120.2, deuda_financiera: 1982.8, arrendamientos: 2454.5, patrimonio_neto: 1762.5, minoritarios: 924.2, reservas: -6725.4 },
    ],
    vencimientos: [
      { anio: 'FY2026', importe: 420.6 },
      { anio: 'FY2027', importe: 79.1 },
      { anio: 'FY2028-FY2030', importe: 999.7 },
      { anio: 'FY2031+', importe: 483.4 },
    ],
    liquidez: 'Caja de 2.220,5 M a 30-jun-2026 y línea de crédito sindicada (RCF) de 1.890 M sin disponer, con vencimiento en marzo de 2030 (ampliada en 76 M) [2]. Liquidez total de ≈ 4.100 M en el punto más alto de la temporada; la caja es estacional: sube en primavera con los cobros anticipados del verano y baja en invierno [1, 2].',
    rating: 'S&P BB- (estable), Moody\'s Ba3 (perspectiva positiva desde feb-2026), Fitch BB (estable) [1, 2].',
    coste_deuda_pct: 5.9,
    vida_media_anios: null,
    otros_pasivos: 'Pensiones de 573,4 M más 26,0 M de otras a 30-jun-2026 (583,0 + 35,6 a sep-25) [1, 2]. Cobros anticipados de clientes («touristic advance payments received») de 4.094 M a sep-25 y 6.105 M a jun-26: no son deuda, pero se devuelven si se cancela un viaje (lo que pasó en 2020) [1, 2]. Pagos anticipados a hoteles («touristic payments on account») de 1.110 M a sep-25 [1]. Convertible de 487 M al 1,95 % con vencimiento en julio de 2031 (precio de conversión por encima de la cotización) y bono ligado a la sostenibilidad de 500 M al 5,875 % con vencimiento en marzo de 2029; Schuldschein de 328 M [1]. El convenio del RCF pide deuda neta / EBITDA ≤ 3,0 veces [1]. Los minoritarios (sobre todo la familia Riu en RIUSA II) se llevan ≈ 200 M al año de beneficio [1].',
    comentario: 'La deuda neta con arrendamientos fue de 1.305 M a sep-25 (1.641 M a sep-24), 0,6 veces el EBITDA subyacente [1]. A 30-jun-2026: deuda financiera de 2.303,7 M, arrendamientos de 2.275,1 M y caja e inversiones a corto de 2.230,8 M: deuda neta de 2.347,9 M (1.910,6 M a jun-25), más alta por menos cobros anticipados y la recompra del convertible de 2021 [2]. El capital circulante es muy negativo (−22 % de las ventas a sep-25) por los cobros anticipados: es una fuente de caja mientras las ventas crecen y un riesgo si caen [1]. El patrimonio atribuido es pequeño (1.763 M a sep-25) porque arrastra 6.725 M de pérdidas acumuladas de la pandemia; las reservas negativas hunden el Altman Z sin que hoy haya riesgo de liquidez [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: 'FY2021', flujo_operativo: -151.3, capex: 299.7, pagos_arrendamientos: 587.2, adquisiciones: 0, desinversiones: 105.5, dividendos: 0, recompras: 0, emision_acciones: 542.5, intereses_en_financiacion: 404.8 },
      { periodo: 'FY2022', flujo_operativo: 2077.8, capex: 515.7, pagos_arrendamientos: 583.6, adquisiciones: 0, desinversiones: 25.2, dividendos: 0.9, recompras: 0, emision_acciones: 1522.7, intereses_en_financiacion: 385.6 },
      { periodo: 'FY2023', flujo_operativo: 1637.3, capex: 666.2, pagos_arrendamientos: 595.1, adquisiciones: 0, desinversiones: 258.0, dividendos: 120.4, recompras: 0, emision_acciones: 1760.9, intereses_en_financiacion: 435.6 },
      { periodo: 'FY2024', flujo_operativo: 1910.8, capex: 712.5, pagos_arrendamientos: 619.6, adquisiciones: 0, desinversiones: 189.4, dividendos: 145.8, recompras: 0, emision_acciones: 101.8, intereses_en_financiacion: 384.7 },
      { periodo: 'FY2025', flujo_operativo: 2058.2, capex: 738.9, pagos_arrendamientos: 580.0, adquisiciones: 0, desinversiones: 102.9, dividendos: 99.5, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 329.7 },
    ],
    comentario: 'La caja de explotación (2.058 M en FY2025) va antes de intereses (330 M) y del principal de los arrendamientos (580 M), que TUI clasifica en financiación [1]. Incluye 268 M de dividendos de las participadas (sobre todo TUI Cruises) y la variación de los cobros anticipados, que la hace muy sensible a las reservas: en 9M FY2026 bajó a 517 M frente a 1.035 M por menos cobros anticipados [1, 2]. El capex (739 M en FY2025: hoteles propios de Riu y Robinson, barcos de Marella, aviones y TI) está por encima de la amortización; la empresa habla de «inversión neta» de 810-830 M en FY2026 [2]. Los aviones arrendados no pasan por el capex: las altas de derechos de uso (≈ 300-400 M al año, estimación propia con la variación de los pasivos por arrendamiento) se suman en el DCF. Los «dividendos» son los pagados a minoritarios (Riu); a los accionistas de TUI, 0,10 € por acción (≈ 51 M) en feb-2026 [1]. Las emisiones de acciones de FY2021-FY2023 son la recapitalización con el fondo alemán WSF y la ampliación de 2023; la de FY2024 es el componente de patrimonio del convertible de 2031 [5, 6].',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'Deloitte GmbH Wirtschaftsprüfungsgesellschaft',
    anios_auditor: 9,
    opinion: 'Favorable, sin salvedades (FY2025) [1]',
    comentario: 'Tres asuntos de juicio. Primero, el EBIT incluye el resultado de las participadas (464 M en FY2025), que no es caja salvo por los dividendos (268 M) [1]; el motor lo saca del EBIT y el ROIC se mide sin él. Segundo, la estacionalidad: el balance de septiembre es el de más caja; los cobros anticipados de clientes (4.094 M) financian el circulante y su caída en 9M FY2026 recortó la caja de explotación a la mitad [1, 2]. Tercero, los ajustes del EBIT subyacente (23,6 M de partidas separadas y 20,6 M de amortización de compras en FY2025) son pequeños frente al EBIT y la diferencia con el publicado es estable [1]. El patrimonio arrastra 6.725 M de pérdidas acumuladas de la pandemia, lo que hunde el Altman Z sin riesgo inmediato de liquidez (RCF de 1.890 M sin disponer) [1, 2].',
    senales: [
      { senal: 'Resultado de participadas dentro del EBIT (34 % del EBIT de FY2025)', nivel: 'Media', comentario: 'Se valoran aparte en el puente; los dividendos cobrados son el 58 % del resultado [1].' },
      { senal: 'Caja de explotación ligada a los cobros anticipados de clientes', nivel: 'Media', comentario: 'En 9M FY2026 cayó un 50 % por reservas más tardías [2].' },
      { senal: 'Minoritarios de ≈ 200 M al año (familia Riu)', nivel: 'Baja', comentario: 'Parte del EBIT de Hoteles no es de los accionistas de TUI [1].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Desde FY2025 TUI vuelve a pagar dividendo: 0,10 € por acción por FY2025 (pagado en feb-2026, ≈ 51 M) y una política de repartir el 10-20 % del BPA subyacente desde FY2026 [11]. Las prioridades son bajar el apalancamiento por debajo de 0,5 veces (0,6 a sep-25), la calificación de grado de inversión a medio plazo e invertir en hoteles y barcos con un rendimiento por encima del 11 % [11, 13]. Sin recompras. Los barcos nuevos de TUI Cruises se financian dentro de la sociedad conjunta (fuera del balance de TUI) [13].',
    adquisiciones: [],
    comentario: 'Desde la recapitalización de 2020-2023 (el Estado alemán aportó 4.300 M entre préstamos y participaciones, devueltos en 2023 con la ampliación de 1.800 M) la asignación del capital ha sido prudente: deuda neta de 6.400 M a sep-21 bajó a 1.305 M a sep-25, venta de hoteles a sociedades conjuntas con Riu y barcos nuevos financiados en TUI Cruises [1, 6]. El coste fue una dilución enorme: el número de acciones pasó de ≈ 590 M antes de la pandemia a 1.785 M en 2022 y, tras la agrupación 10:1 y la ampliación, a 507 M [5, 6]. No hay compras relevantes en los últimos cinco años.',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Hotels & Resorts', descripcion: 'Hoteles propios y en sociedad conjunta: Riu (49 % de la familia Riu), Robinson, TUI Blue, Royalton y otros; 463 hoteles.', tipo_resultado: 'EBIT subyacente', historico: [{ periodo: 'FY2024', ingresos: null, resultado: 668.4 }, { periodo: 'FY2025', ingresos: 1243.8, resultado: 735.0 }] },
      { nombre: 'Cruises', descripcion: 'TUI Cruises (Mein Schiff y Hapag-Lloyd Cruises; 50 % con Royal Caribbean, por puesta en equivalencia) y Marella Cruises (100 %); 19 barcos.', tipo_resultado: 'EBIT subyacente', historico: [{ periodo: 'FY2024', ingresos: null, resultado: 374.3 }, { periodo: 'FY2025', ingresos: 883.4, resultado: 481.1 }] },
      { nombre: 'TUI Musement', descripcion: 'Excursiones, actividades y traslados en destino.', tipo_resultado: 'EBIT subyacente', historico: [{ periodo: 'FY2024', ingresos: null, resultado: 49.2 }, { periodo: 'FY2025', ingresos: 1044.8, resultado: 67.2 }] },
      { nombre: 'Markets + Airline', descripcion: 'Turoperador y agencias en 3 regiones (Norte: Reino Unido y Nórdicos; Centro: Alemania, Austria, Suiza, Polonia; Oeste: Benelux y Francia) y TUI Airline (125 aviones).', tipo_resultado: 'EBIT subyacente', historico: [{ periodo: 'FY2024', ingresos: null, resultado: 303.9 }, { periodo: 'FY2025', ingresos: 20993.5, resultado: 199.9 }] },
      { nombre: 'All other segments', descripcion: 'Sede central e inmobiliario.', tipo_resultado: 'EBIT subyacente', historico: [{ periodo: 'FY2024', ingresos: null, resultado: -99.6 }, { periodo: 'FY2025', ingresos: 13.2, resultado: -70.0 }] },
    ],
    geografias: [
      { nombre: 'Región Norte (Reino Unido, Irlanda, Nórdicos)', peso_pct: 36.6 }, { nombre: 'Región Centro (Alemania, Austria, Suiza, Polonia)', peso_pct: 36.6 },
      { nombre: 'Región Oeste (Bélgica, Países Bajos, Francia)', peso_pct: 13.6 }, { nombre: 'Holiday Experiences (hoteles, cruceros y actividades, ventas externas)', peso_pct: 13.2 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Clientes del grupo (millones)', valor_anterior: '—', valor_actual: '34,7 (FY2025)', variacion: '—', comentario: '20,2 M de Markets + Airline y 14,5 M de Holiday Experiences [13].' },
      { kpi: 'Precio medio por noche de Hoteles', valor_anterior: '+4 % (4T26)', valor_actual: '+1 % (1S FY2027)', variacion: 'sube', comentario: 'Ocupación −2 puntos; noches disponibles +7 % en el 1S FY2027 [9].' },
      { kpi: 'Días de crucero disponibles', valor_anterior: '+12 % (4T26)', valor_actual: '+17 % (1S FY2027)', variacion: 'sube', comentario: 'Mein Schiff Flow desde junio de 2026; ocupación del 1S FY2027 −6 puntos [9].' },
      { kpi: 'Ingresos reservados de Markets + Airline', valor_anterior: 'verano 2026: −5 %', valor_actual: 'invierno 2026/27: −7 % (últimas 4 semanas −1 %)', variacion: 'baja', comentario: 'Capacidad propia −5 %; precio medio «aguanta» [9].' },
      { kpi: 'Combustible cubierto (Markets + Airline)', valor_anterior: '98 % verano 2026', valor_actual: '63 % invierno 2026/27; 39 % verano 2027', variacion: 'menos cobertura', comentario: 'Euro 77 %/43 % y dólar 82 %/50 % [9].' },
      { kpi: 'Margen EBIT subyacente de Markets + Airline', valor_anterior: '1,5 % (FY2024)', valor_actual: '1,0 % (FY2025)', variacion: '−0,5 pp', comentario: 'Objetivo a medio plazo: más del 3 % con ≈ 250 M de ahorros hasta FY2028 [11, 13].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'Crecimiento interanual del 3T25 y del 4T25', tipo: 'Complemento', intentos: '1) Quarterly Statement Q3 2025 (da 9 meses); 2) datos trimestrales por segmento FY2025 (EBIT, no ventas de FY2024 por trimestre); 3) informe anual 2024 (anual)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'Consenso previo de cada trimestre', tipo: 'Complemento', intentos: '1) Comunicados de TUI (no lo publican); 2) MarketScreener (403); 3) prensa (solo el 3T26 «por debajo» por el EBIT subyacente)', decision: 'Omitido salvo 3T26' },
    { seccion: 'negocio', campo: 'Ingresos por segmento de FY2024 en Holiday Experiences', tipo: 'Complemento', intentos: '1) Informe anual 2025 (ventas externas totales); 2) Factbook 2026; 3) datos trimestrales por segmento', decision: 'Omitido' },
  ],
};

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report 2025: modelo de negocio, estrategia, riesgos, segmentos y mercado', editor: 'TUI AG', tipo: 'Primaria', fecha: '2025-12-10', url: U.ar25 },
  { id: 2, titulo: 'Factbook 2026 (integración vertical, clientes, hoteles, barcos, aviones, ROIC por segmento)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-02-10', url: U.fact },
  { id: 3, titulo: 'UN Tourism / Amadeus: Travel Insights Europe (mayo 2025-abril 2026): ingresos por exportación turística de Europa de 707.000 M EUR en 2025 y 793 M de llegadas', editor: 'UN Tourism / Amadeus Hospitality', tipo: 'Sectorial', fecha: '2026-05', url: 'https://connect.amadeus-hospitality.com/hubfs/Travel%20Insights%20UN%20tourism%20report/UN_Tourism_Report_May_2025_April_2026_Europe.pdf' },
  { id: 4, titulo: 'UN Tourism reports 2 % rise in international arrivals in the first quarter of 2026 (Europa +4 %)', editor: 'Comisión Europea (Transition Pathways for Tourism)', tipo: 'Sectorial', fecha: '2026-05', url: 'https://transition-pathways.europa.eu/tourism/news/un-tourism-reports-2-rise-international-arrivals-first-quarter-2026' },
  { id: 5, titulo: 'IATA Jet Fuel Price Monitor (media mundial semanal de 192,44 USD/barril en octubre de 2026)', editor: 'IATA', tipo: 'Sectorial', fecha: '2026-10-16', url: 'https://www.iata.org/en/publications/economics/fuel-monitor/' },
  { id: 6, titulo: 'Pre-close Trading Update FY2026 y presentación', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-09-22', url: U.pre26 },
  { id: 7, titulo: 'Fichas de Yahoo Finance de Jet2, easyJet, Carnival, Royal Caribbean, Norwegian Cruise Line, Meliá, Lufthansa, IAG, Accor y Ryanair', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/JET2.L/' },
  { id: 8, titulo: 'Strategy section FY2025 (Holiday Experiences, asset-right, metas a medio plazo)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2025-12-10', url: U.estr },
  { id: 9, titulo: 'Investor presentation (septiembre de 2026)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-09-22', url: U.inv },
  { id: 10, titulo: 'Annual Report 2022 (pandemia, ayuda del WSF y recapitalización)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2022-12-14', url: U.ar22 },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'TUI nace de Preussag, un grupo industrial y minero alemán de 1923 que entre 1997 y 2002 vendió la industria y compró Hapag-Lloyd y el turoperador TUI [1]. En 2007 fusionó su negocio de viajes con First Choice en TUI Travel, cotizada en Londres, y en 2014 TUI AG y TUI Travel se fusionaron [1]. En la pandemia TUI casi quiebra: recibió 4.300 M de ayudas del Estado alemán (WSF) y préstamos de KfW, que devolvió en 2023 con una ampliación de capital [10]. Desde 2023 la estrategia es pasar de turoperador a grupo de «experiencias» (hoteles, cruceros, actividades) con poco capital propio («asset-right») [8].',
    hitos: [
      { anio: '1923', hito: 'Fundación de Preussag (minería e industria) [1].' },
      { anio: '2002', hito: 'Preussag pasa a llamarse TUI AG tras vender la industria [1].' },
      { anio: '2007', hito: 'Fusión con First Choice: TUI Travel en Londres [1].' },
      { anio: '2014', hito: 'Fusión de TUI AG y TUI Travel [1].' },
      { anio: '2020-2021', hito: 'Pandemia: 4.300 M de ayuda del Estado alemán; pérdida de 3.100 M en FY2020 y 2.467 M en FY2021 [10].' },
      { anio: '2023', hito: 'Agrupación 10:1, ampliación de 1.800 M y devolución completa de la ayuda; cotización principal vuelve a Fráncfort (2024) [1].' },
      { anio: '2025', hito: 'EBIT subyacente récord de 1.413 M y primer dividendo desde 2019 [1].' },
      { anio: '2026', hito: 'Guerra de Irán: queroseno disparado, guía de FY2026 rebajada a 1.100-1.400 M (abril) y estrechada a 1.200-1.300 M (septiembre) [6].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'TUI es el mayor grupo de viajes de vacaciones de Europa: vende paquetes (vuelo, hotel y traslado) a 20 M de clientes de Alemania, Reino Unido, Benelux, Nórdicos, Francia y Polonia, con su propia aerolínea (125 aviones) [1, 2]. Además tiene el negocio de destino, que da la mayor parte del beneficio: 463 hoteles (Riu, Robinson, TUI Blue), 19 barcos de crucero (TUI Cruises con Royal Caribbean y Marella) y TUI Musement (excursiones y traslados) [2]. Los hoteles y cruceros se llenan en parte con los clientes de los turoperadores del grupo («integración vertical») [2]. En FY2025, con 24.179 M de ventas, Markets + Airline generó el 87 % de las ventas pero solo el 14 % del EBIT subyacente; Hoteles y Cruceros, el 86 % [1].',
    como_gana_dinero: 'El turoperador cobra el viaje por adelantado y paga a hoteles y proveedores después: gana un margen pequeño (1 % de EBIT en FY2025) y genera caja con el circulante negativo [1]. Hoteles y cruceros ganan con la ocupación y el precio por noche o por día de crucero, con márgenes altos (ROIC del 18-26 % según el factbook) [2]. El resultado es muy estacional: TUI pierde dinero de octubre a marzo y gana en julio-septiembre (el 4T aporta ≈ 90 % del EBIT anual) [1]. El combustible y el dólar pesan en la aerolínea; TUI cubre la mayor parte con 12-18 meses de antelación y fija el precio del paquete con esas coberturas [6].',
    clientes: 'Sin concentración: 34,7 M de clientes en FY2025 (20,2 M de Markets + Airline) [2]. Vende sobre todo por su app y su web; las tiendas pierden peso [2]. Poder de precios demostrado en hoteles y cruceros (precio por noche +4 % en el 4T FY2026, días de crucero +2 %) y escaso en el paquete, donde compiten Jet2, easyJet holidays, las agencias en línea y el viajero que reserva por su cuenta [6].',
  },
  sector: {
    definicion: 'Mercado relevante: el gasto en viajes de vacaciones de los europeos y el turismo receptor en Europa y el Mediterráneo, donde TUI vende paquetes y tiene hoteles y barcos [1]. Como medida de tamaño se usan los ingresos por exportación turística de los destinos europeos (UN Tourism): 707.000 M EUR en 2025 [3]. Es una aproximación: incluye viajes de negocios y gasto en destino que no pasa por un turoperador, y no incluye los destinos de fuera de Europa (Egipto, Caribe).',
    tamano: '≈ 707.000 M EUR de ingresos por exportación turística en Europa en 2025 y 793 M de llegadas internacionales [3]; TUI: 24.179 M de ventas (≈ 3,4 %) [1].',
    unidad_serie: 'miles de millones de EUR de ingresos turísticos internacionales en Europa',
    serie: [{ anio: '2025', tamano: 707 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 4.0,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Renta disponible y confianza del consumidor europeo', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Reservas del verano 2026 −5 % y del invierno 2026/27 −7 % con incertidumbre geopolítica [6].' },
      { driver: 'Precio del queroseno y dólar', efecto: '−', horizonte: 'Cíclico', evidencia: 'Queroseno a 192 USD/barril en octubre de 2026 frente a ≈ 90 en 2025 [5]; TUI cubre el 39 % del verano 2027 [6].' },
      { driver: 'Llegadas internacionales a Europa', efecto: '+', horizonte: 'Estructural', evidencia: 'Europa +4 % en el 1T de 2026; 793 M de llegadas en 2025 [3, 4].' },
      { driver: 'Demanda de cruceros (capacidad limitada de astilleros)', efecto: '+', horizonte: 'Estructural', evidencia: 'Días de crucero +17 % en el 1S FY2027 con precio +2 % [6].' },
      { driver: 'Geopolítica en destinos (Mediterráneo oriental, Oriente Medio)', efecto: '−', horizonte: 'Cíclico', evidencia: 'La guerra de Irán costó ≈ 60 M en 9M FY2026 [6].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Jet2 y easyJet holidays en Reino Unido, DER Touristik y las agencias en línea en Alemania; el paquete se compara en internet [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Particulares que pueden armar el viaje por su cuenta [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Hoteleros de terceros, aeropuertos y refinerías; TUI controla parte de la oferta con sus hoteles [2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'La escala y la licencia de turoperador (garantías de los cobros anticipados) frenan; las plataformas en línea entran fácil [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Reserva directa de vuelo y alojamiento (Booking, Airbnb, Ryanair) [1].' },
    ],
    ciclo: { posicion: 'Desaceleración', comentario: 'Indicadores: reservas de Markets + Airline en negativo (−5 % el verano 2026, −7 % el invierno 2026/27), queroseno disparado por la guerra de Irán y estimaciones de BPA de 2027 recortadas un 5 % en 90 días [6, 7]. Pero los destinos aguantan: llegadas a Europa +4 % en el 1T de 2026, precios de hoteles y cruceros al alza [3, 4, 6]. Antecedentes: en 2019 la quiebra de Thomas Cook; en 2020-21 la pandemia llevó a TUI al rescate público; en 2008-09 el beneficio cayó sin pérdidas grandes [1, 10].' },
    regulacion: 'La directiva europea de viajes combinados obliga a garantizar los cobros anticipados y a devolverlos si se cancela el viaje (en 2020 TUI devolvió miles de millones) [1]. La aerolínea paga el EU ETS (sin derechos gratuitos desde 2026) y la mezcla obligatoria de SAF de ReFuelEU [1]. Los barcos afrontan normas de emisiones en puerto y límites de cruceros en algunas ciudades [1].',
    tendencias: 'Tres tendencias. Primera, el paso al paquete dinámico y a la app, que abarata la venta [2]. Segunda, el crecimiento de hoteles y cruceros con capital ajeno (sociedades conjuntas y contratos de gestión), donde está el beneficio [8]. Tercera, la IA generativa como canal de búsqueda y reserva, que TUI cita como riesgo de cuota [1]. TUI gana con las dos primeras.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 3.4,
    posicion: '1.º grupo de viajes de vacaciones de Europa por clientes y ventas [1, 2]; ≈ 3,4 % de los ingresos turísticos internacionales de Europa (aproximación) [3].',
    competidores: [
      { nombre: 'Jet2', pais: 'GB', ticker: 'JET2', ingresos: 8867, cuota_pct: null, margen_ebit_pct: null, comentario: 'Aerolínea + paquetes en Reino Unido, el rival más rentable; ventas LTM de Yahoo en EUR [7].' },
      { nombre: 'easyJet (easyJet holidays)', pais: 'GB', ticker: 'EZJ', ingresos: 12474, cuota_pct: null, margen_ebit_pct: null, comentario: 'Aerolínea de bajo coste con paquetes [7].' },
      { nombre: 'DER Touristik (grupo REWE)', pais: 'DE', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Segundo turoperador alemán; no cotiza [1].' },
      { nombre: 'Carnival', pais: 'US', ticker: 'CCL', ingresos: 24521, cuota_pct: null, margen_ebit_pct: 26.4, comentario: 'Mayor naviera de cruceros; margen operativo LTM de Yahoo [7].' },
      { nombre: 'Royal Caribbean', pais: 'US', ticker: 'RCL', ingresos: 16602, cuota_pct: null, margen_ebit_pct: 27.1, comentario: 'Socio de TUI en TUI Cruises [7].' },
      { nombre: 'Meliá Hotels', pais: 'ES', ticker: 'MEL', ingresos: 2147, cuota_pct: null, margen_ebit_pct: 17.2, comentario: 'Hotelera vacacional española [7].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Los 20 M de clientes del turoperador llenan los hoteles y barcos del grupo [2].' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'El viajero compara precios cada año [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marcas TUI, Riu, Robinson y Mein Schiff; hoteles en primera línea difíciles de replicar [2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala en compras de camas y asientos; ROIC de Hoteles del 18 % y de TUI Cruises del 26 % [2].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Cruceros: pocas navieras y astilleros con años de espera [2, 6].' },
      ],
    },
    amenazas: 'Que Jet2 y easyJet holidays sigan ganando cuota en Reino Unido con aerolínea propia (probabilidad alta), que las agencias en línea y los asistentes de IA desintermedien el paquete (media), que una crisis en el Mediterráneo oriental o en Egipto vacíe destinos clave (media) y que el combustible caro no se traslade al precio (alta en FY2027) [1, 5, 6].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Clima: la aerolínea y los cruceros son la mayor parte de las emisiones; TUI tiene objetivos validados por SBTi y paga el EU ETS [1]. Agua y biodiversidad en los hoteles de costa; derechos laborales en la cadena de hoteles de terceros [1]. Riesgo físico: huracanes en el Caribe (Jamaica en 2026) y olas de calor en el Mediterráneo [1, 6].',
    controversias: 'Rescate público de 2020-2021, devuelto en 2023 [10]. El bloque de acciones atribuido a Alexey Mordashov está congelado por las sanciones de la UE [1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'Serie histórica y CR5 del mercado de viajes de vacaciones europeo', tipo: 'Complemento', intentos: '1) UN Tourism (solo 2025 en dinero); 2) Eurostat (noches, no ingresos); 3) informe anual de TUI (no da cuota)', decision: 'Omitido; tamaño de 2025 como aproximación' },
    { seccion: 'esg', campo: 'Calificaciones ESG publicadas', tipo: 'Complemento', intentos: '1) Informe anual 2025 (cita CDP sin nota); 2) MSCI y Sustainalytics (de pago); 3) web de TUI (sin cifras)', decision: 'Omitido' },
  ],
};

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: Executive Board, Supervisory Board, accionistas y gobierno', editor: 'TUI AG', tipo: 'Primaria', fecha: '2025-12-10', url: U.ar25 },
  { id: 2, titulo: 'Remuneration Report FY2025 (remuneración individual del consejo de dirección)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2025-12-10', url: U.remun },
  { id: 3, titulo: 'Corporate Governance Statement FY2025', editor: 'TUI AG', tipo: 'Primaria', fecha: '2025-12-10', url: U.gob },
  { id: 4, titulo: 'Annual General Meeting 2026: resultados de las votaciones (10-feb-2026)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-02-10', url: U.juntad },
  { id: 5, titulo: 'AGM 2026 press release (consejo de supervisión reducido de 20 a 16 miembros)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-02-10', url: U.junta },
  { id: 6, titulo: 'Directors\' dealings de TUI AG (compras de Ebel, Kiep, Reiss y Schelp, feb-sep 2026)', editor: 'Hargreaves Lansdown / EQS', tipo: 'Primaria', fecha: '2026-09-23', url: 'https://www.hl.co.uk/shares/shares-search-results/t/tui-ag-ord-reg-shs-npv-di/director-deals' },
  { id: 7, titulo: 'H1 2026 results announcement (salida de David Schelp y Peter Krueger; Marco Ciomperlik, director de operaciones desde el 1-may-2026)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-05-13', url: U.h1_26a },
  { id: 8, titulo: 'Information pursuant to takeover law (estructura de capital y derechos de cambio de control) FY2025', editor: 'TUI AG', tipo: 'Primaria', fecha: '2025-12-10', url: U.opa },
  { id: 9, titulo: 'Comunicados de resultados FY2023-FY2025 y actualizaciones de guía de FY2026 (22-abr y 22-sep-2026)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-09-22', url: U.pre26 },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Sebastian Ebel', cargo: 'Consejero delegado', desde: '2022', participacion_pct: 0.02, trayectoria: 'En TUI desde 2014 (director de Hoteles, Cruceros y Destino); antes, director de Eurowings y de World of TUI. Consejero delegado desde el 1-oct-2022; llevó la devolución de la ayuda pública y el EBIT récord de FY2025. Compró 30.000 acciones en 2026 (≈ 0,21 M) [1, 6].' },
      { nombre: 'Mathias Kiep', cargo: 'Director financiero', desde: '2023', participacion_pct: 0.0, trayectoria: 'En TUI desde 2004 (finanzas del grupo y de TUI Deutschland); director financiero desde 2023 [1].' },
      { nombre: 'Sybille Reiss', cargo: 'Directora de personal y de Holiday Experiences', desde: '2022', participacion_pct: 0.0, trayectoria: 'Directora de personal; compró acciones en marzo y septiembre de 2026 [1, 6].' },
      { nombre: 'Marco Ciomperlik', cargo: 'Director de operaciones (Markets + Airline)', desde: '2026', participacion_pct: 0.0, trayectoria: 'Antes, responsable de la región Centro; sustituye a David Schelp y Peter Krueger, que salieron a finales de abril de 2026 [7].' },
      { nombre: 'Dieter Zetsche', cargo: 'Presidente del consejo de supervisión', desde: '2022', participacion_pct: null, trayectoria: 'Ex consejero delegado de Daimler (2006-2019) [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2023', guia: 'EBIT subyacente «significativamente por encima» de FY2022', real: '977 M frente a 409 M', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'EBIT subyacente +25 % como mínimo', real: '1.296 M (+33 %)', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'EBIT subyacente +7-10 %', real: '1.413 M (+12,6 %, +9,6 % a tipo de cambio constante)', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'EBIT subyacente +7-10 % (dic-2025); 1.100-1.400 M (22-abr-2026); 1.200-1.300 M (22-sep-2026)', real: 'Pendiente (9-dic-2026); 9 meses: 118 M frente a 165 M', cumplida: 'No' },
    ],
    comentario: 'Ebel cumplió la guía tres años seguidos y devolvió la ayuda pública [9]. FY2026 rompe la racha: la guerra de Irán obligó a retirar la guía de crecimiento en abril [9]. Cambios en la cúpula: los responsables de Markets + Airline (Schelp) y de la aerolínea (Krueger) salieron en abril de 2026 y un solo director de operaciones lleva ahora el negocio que más sufre [7]. Los cuatro directivos compraron acciones en 2026, con la acción a 6,4-8,6 € [6].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Dieter Zetsche', cargo: 'Presidente del consejo de supervisión', tipo: 'Independiente', desde: '2022', comisiones: 'Presidencia, Nombramientos' },
      { nombre: 'Frank Jakobi', cargo: 'Vicepresidente (representante de los empleados)', tipo: 'Otro externo', desde: '2014', comisiones: 'Presidencia' },
      { nombre: 'Jutta Dönges', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Ingrid-Helen Arnold', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: null },
      { nombre: 'María Garaña Corces', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: null },
      { nombre: 'Janina Kugel', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: null },
      { nombre: 'Johan Lundgren', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Mark Muratovic', cargo: 'Consejero (representante de los empleados)', tipo: 'Otro externo', desde: '2020', comisiones: null },
      { nombre: 'Joan Trían Riu', cargo: 'Consejero', tipo: 'Dominical', desde: '2021', comisiones: null },
      { nombre: 'Thomas Köhler', cargo: 'Consejero (nuevo en 2026)', tipo: 'Independiente', desde: '2026', comisiones: null },
      { nombre: 'Daniel Dülm', cargo: 'Consejero (nuevo en 2026)', tipo: 'Otro externo', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 2,
    voto_remuneracion_pct: 83.99, voto_remuneracion_contra_pct: 16.01, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: 98.0,
    remuneracion_ceo: { anio: 'FY2025', total: 2.70, fijo: 1.12, variable_corto: 1.51, variable_largo: 0.07, ratio_salario_medio: null },
    remuneracion: 'Remuneración total del consejero delegado en FY2025: 2,70 M € (fijo 1,10 M, beneficios 0,02 M, variable anual 1,51 M y variable a largo plazo 0,07 M), con un máximo de 7,5 M [2]. El variable anual depende un 75 % del EBIT publicado y un 25 % de la caja, con un factor ESG de 0,8-1,2; el de largo plazo, del BPA y de la cotización [2]. Ebel tenía acciones por 0,51 M € a sep-25 frente a la meta de 1,65 M [2]. La junta del 10-feb-2026 aprobó el informe de remuneraciones con un 83,99 % (16,01 % en contra) [4].',
    accionistas: [
      { nombre: 'Unifirm / Alexey Mordashov (participación congelada por sanciones)', pct: null, tipo: 'Inversor de referencia', variacion: 'Sin derechos de voto ni de venta mientras duren las sanciones [1, 8].' },
      { nombre: 'Familia Riu', pct: null, tipo: 'Socio estratégico', variacion: 'Socio al 49 % en RIUSA II y consejero en TUI; derecho de cambio de control sobre RIUSA II [8].' },
      { nombre: 'Capital flotante', pct: 89, tipo: 'Institucional y minorista', variacion: 'Free float ≈ 89 % (estimación con los avisos de participaciones) [1].' },
    ],
    insiders: [
      { fecha: '2026-02-11', persona: 'Sebastian Ebel y Mathias Kiep', operacion: 'Compra', acciones: 9625, importe: 0.08 },
      { fecha: '2026-02-13', persona: 'David Schelp', operacion: 'Compra', acciones: 5100, importe: 0.04 },
      { fecha: '2026-03-02', persona: 'Sebastian Ebel', operacion: 'Compra', acciones: 6000, importe: 0.04 },
      { fecha: '2026-03-03', persona: 'Ebel, Kiep y Reiss', operacion: 'Compra', acciones: 13000, importe: 0.09 },
      { fecha: '2026-03-13', persona: 'Sebastian Ebel', operacion: 'Compra', acciones: 7000, importe: 0.05 },
      { fecha: '2026-09-22', persona: 'Sebastian Ebel y Sybille Reiss', operacion: 'Compra', acciones: 7000, importe: 0.05 },
    ],
    control_y_defensas: 'Sin accionista de control. El bloque atribuido a Alexey Mordashov está congelado por las sanciones de la UE y no vota [1, 8]. La familia Riu es socia en los hoteles (RIUSA II, 49 %) y puede comprar la parte de TUI si cambia el control de TUI: un freno a una opa [8]. El consejo de supervisión es paritario (la mitad elegida por los empleados, ley alemana de cogestión) y la junta de 2026 lo redujo de 20 a 16 miembros [5]. Una acción, un voto [3].',
    alertas: [
      'Salida de los dos responsables de Markets + Airline y de la aerolínea en abril de 2026 [7].',
      'Voto en contra del 16,01 % al informe de remuneraciones en la junta de 2026 [4].',
      'Derecho de cambio de control de la familia Riu sobre RIUSA II [8].',
    ],
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Porcentaje exacto de los mayores accionistas', tipo: 'Complemento', intentos: '1) Informe anual 2025 (avisos de umbral sin tabla actualizada); 2) web de TUI (notificaciones de derechos de voto en JavaScript); 3) Yahoo (holders sin datos fiables para TUI1.DE)', decision: 'Omitido; free float estimado' },
  ],
};

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de TUI1.DE, EXS3.DE (MDAX) y EXV9.DE (viajes y ocio europeo) (bolsa.mjs) y movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/TUI1.DE/history/' },
  { id: 2, titulo: 'TUI1.DE: earningsTrend (BPA FY2026 y FY2027 de 12-13 analistas, revisiones a 90 días), recomendación y objetivo medio', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/TUI1.DE/analysis/' },
  { id: 3, titulo: 'TUI-Aktie: Analysten und Kursziele (Barclays, Deutsche Bank, JPMorgan, Jefferies, Bernstein, UBS; sep-oct 2026)', editor: 'finanzen.net', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.finanzen.net/kursziele/tui' },
  { id: 4, titulo: 'Fichas quoteSummary de diez comparables (turoperadores, aerolíneas, cruceros, hoteles)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/JET2.L/key-statistics/' },
  { id: 5, titulo: 'Rendimiento del Bund a 10 años (curva de Svensson, BBSIS)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lastNObservations=5' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Damodaran Online (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Tipos de cambio de referencia del BCE (USD 1,1253; GBP 0,84385; 16-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 8, titulo: 'Pre-close Trading Update FY2026 (fecha de resultados: 9-dic-2026)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-09-22', url: U.pre26 },
  { id: 9, titulo: 'Quarterly Statement Q3 2026 (deuda neta y acciones a 30-jun-2026)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2026-08-12', url: U.q3_26 },
  { id: 10, titulo: 'Annual Report 2025 (convertible 2031, acciones)', editor: 'TUI AG', tipo: 'Primaria', fecha: '2025-12-10', url: U.ar25 },
];
const fx = { EUR: 1, GBp: 1 / 84.385, GBP: 1 / 0.84385, USD: 1 / 1.1253 };
const nombres = { 'JET2.L': ['Jet2', 'JET2', 'GB'], 'EZJ.L': ['easyJet', 'EZJ', 'GB'], 'CCL': ['Carnival', 'CCL', 'US'], 'RCL': ['Royal Caribbean', 'RCL', 'US'], 'NCLH': ['Norwegian Cruise Line', 'NCLH', 'US'], 'MEL.MC': ['Meliá Hotels', 'MEL', 'ES'], 'LHA.DE': ['Lufthansa', 'LHA', 'DE'], 'IAG.L': ['IAG', 'IAG', 'ES'], 'AC.PA': ['Accor', 'AC', 'FR'], 'RYA.IR': ['Ryanair', 'RYA', 'IE'] };
const r1 = (x) => (x === null || x === undefined || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x === null || x === undefined || !isFinite(x) ? null : Math.round(x * 100) / 100);
const empresas = Object.entries(nombres).map(([s, [nombre, ticker, pais]]) => {
  const v = raw[s] || {}; const p = v.price || {}; const f = v.financialData || {}; const k = v.defaultKeyStatistics || {}; const sd = v.summaryDetail || {};
  const cur = p.currency || 'EUR';
  return { nombre, ticker, pais, capitalizacion: Math.round((p.marketCap?.raw ?? 0) / 1e6 * (cur === 'GBp' ? fx.GBP : fx[cur] ?? 1)), ev_ventas: r2(k.enterpriseToRevenue?.raw), ev_ebitda_ltm: r1(k.enterpriseToEbitda?.raw), ev_ebitda_ntm: null, per_ntm: r1(sd.forwardPE?.raw ?? k.forwardPE?.raw), crecimiento_pct: r1((f.revenueGrowth?.raw ?? null) * 100), margen_ebitda_pct: r1((f.ebitdaMargins?.raw ?? null) * 100), roic_pct: null, dn_ebitda: null, fcf_yield_pct: null };
});
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'TUI AG', nombre_corto: 'TUI', ticker: 'TUI1', isin: 'DE000TUAG505', mercado: 'Xetra (Deutsche Börse)', indice_referencia: 'MDAX',
    pais: 'Alemania', pais_iso: 'DE', sector: 'Consumer Discretionary', industria: 'Hotels, Resorts & Cruise Lines / Travel', sede: 'Hannover, Alemania', fundacion: '1923', empleados: 66854, web: 'https://www.tuigroup.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 507.4, capitalizacion_publicada: 3371, free_float_pct: 89,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses; ${(bolsa.volumen_3m.acciones_dia / 1e6).toFixed(1).replace('.', ',')} M de acciones)`, proximos_resultados: '2026-12-09',
  },
  consenso: {
    guidance: 'Guía de FY2026 (22-sep-2026): EBIT subyacente de 1.200-1.300 M a tipo de cambio constante (FY2025: 1.413 M); intereses netos de −325 a −350 M (parte baja), ajustes de −70 a −90 M, inversión neta de 810-830 M, tipo impositivo ≈ 18 % y deuda neta al alza [8, 9]. A medio plazo (diciembre de 2025): crecimiento anual del EBIT subyacente del 7-10 %, apalancamiento por debajo de 0,5 veces, margen de Markets + Airline por encima del 3 % y dividendo del 10-20 % del BPA subyacente [10]. No hay guía de FY2027.',
    estimaciones: [
      { periodo: 'FY2026e', ingresos: 23487, ebitda: null, ebit: null, bpa: 1.033, dpa: null, fuente: 'Yahoo, 12-13 analistas (1,061 hace 90 días) [2]' },
      { periodo: 'FY2027e', ingresos: 24306, ebitda: null, ebit: null, bpa: 1.33, dpa: null, fuente: 'Yahoo (1,398 hace 90 días) [2]' },
    ],
    recomendaciones: { n_analistas: 13, comprar: 8, mantener: 5, vender: 0, po_medio: 9.85, po_min: 7.0, po_max: 13.5 },
    revisiones: 'Recortes moderados: el BPA de FY2026 bajó de 1,061 a 1,033 € y el de FY2027 de 1,398 a 1,33 € en 90 días [2]. Los objetivos recientes van de 7,00 € (Jefferies, mantener, 22-sep) a 12,20 € (JPMorgan, sobreponderar, 23-sep); Barclays bajó a 8,75 € el 2-oct manteniendo sobreponderar; Deutsche Bank 10,10 € (comprar), Bernstein 8,60 € (igual que el mercado), UBS 9,60 € (neutral) [3]. Media de los seis últimos: 9,38 €. Es probable que el BPA del consenso mezcle subyacente y publicado (TUI publica los dos).',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.9,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: null, comentario: 'La acción cotiza a 6,75 € (cierre del 16-oct-2026), un 29 % por debajo del máximo de 52 semanas (9,56 € el 9-feb-2026) [1]. En el año pierde un 24 % frente al −0,8 % del MDAX y al +0,4 % del ETF europeo de viajes y ocio [1]. La caída tiene tres fases: febrero-marzo (resultados del 1T, guerra de Irán desde el 2-mar: −9,9 % ese día), abril (rebaja de la guía el 22-abr) y mayo (resultados del 1S con reservas de verano −7 %) [1]. A tres años la acción gana un 11,9 % anual, en línea con el sector; a cinco y diez años pierde mucho por la dilución del rescate (de 2020 a 2023) [1]. Beta de 1,45 mensual a 5 años frente al MDAX (1,12 semanal a 2 años) [1].', tipo_rentabilidad: bolsa.bolsa.tipo_rentabilidad },
  multiplos_historicos: {
    serie: [
      { anio: 'FY2021', precio_cierre: 16.89, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: 'FY2022', precio_cierre: 6.54, ev_ebitda_ntm: null, per_ntm: 8.2, excluir: false },
      { anio: 'FY2023', precio_cierre: 5.22, ev_ebitda_ntm: null, per_ntm: 5.2, excluir: false },
      { anio: 'FY2024', precio_cierre: 6.84, ev_ebitda_ntm: null, per_ntm: 5.5, excluir: false },
      { anio: 'FY2025', precio_cierre: 7.74, ev_ebitda_ntm: null, per_ntm: 8.1, excluir: false },
    ],
    comentario: 'Cierres de septiembre de Yahoo ajustados por la agrupación 10:1 y la ampliación de 2023 [1]. PER adelantado = cierre ÷ BPA real del ejercicio siguiente (FY2025: ÷ el BPA propio de FY2026e, 0,96 €). Excluido FY2021 (el BPA de FY2022 fue negativo). Desde la recapitalización la acción cotiza a 5-8 veces el beneficio del año siguiente: el mercado cobra el rescate, la deuda con arrendamientos y la exposición a crisis.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Grupos europeos y estadounidenses con negocios parecidos a los de TUI: turoperador con aerolínea (Jet2, easyJet), cruceros (Carnival, Royal Caribbean, Norwegian Cruise Line), hoteles (Meliá, Accor) y aerolíneas europeas (Lufthansa, IAG, Ryanair). No hay un comparable puro: TUI mezcla un turoperador de margen bajo con hoteles y cruceros de margen alto. Cifras de Yahoo a 19-oct-2026; capitalización en EUR con el cambio del BCE del 16-oct [4, 7]. PER de los próximos 12 meses = PER adelantado de Yahoo (próximo ejercicio).',
    empresas,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [],
    comentario: 'No hay operaciones comparables recientes con múltiplos publicados: la última compra grande de un turoperador fue la de First Choice (2007) y la quiebra de Thomas Cook (2019) se resolvió con ventas de activos sueltos. Las transacciones no pesan en la valoración.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'Operaciones comparables con múltiplos', tipo: 'Complemento', intentos: '1) Prensa (FTI, DER Touristik, Thomas Cook: sin múltiplos); 2) informes anuales de TUI (sin compras); 3) Mergermarket (de pago)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'Estimaciones de EBITDA y EBIT del consenso y de FY2028', tipo: 'Complemento', intentos: '1) MarketScreener (403); 2) Yahoo (solo ventas y BPA de dos ejercicios); 3) consenso de la web de TUI (en JavaScript, no accesible)', decision: 'Omitido' },
  ],
};

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de $TUIFF (mensajes de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://api.stocktwits.com/api/2/streams/symbol/TUIFF.json' },
  { id: 2, titulo: 'TUI-Aktie: comentarios y noticias (Börse Express, finanztrends)', editor: 'Börse Express / finanztrends', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://www.boerse-express.com/' },
  { id: 3, titulo: 'TUI-Aktie: Analysten und Kursziele', editor: 'finanzen.net', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.finanzen.net/kursziele/tui' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Stocktwits ($TUIFF)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Pocos seguidores; mensajes alcistas por la perspectiva positiva de Moody\'s, el 1T y el PER bajo [1].' },
      { plataforma: 'Prensa financiera alemana (Börse Express, finanztrends)', fecha: '2026-10', n_comentarios: 6, tono: 'Dividido', resumen: 'Ven la acción barata pero sin catalizador hasta los resultados de diciembre; preocupa el invierno 2026/27 (−7 %) [2].' },
      { plataforma: 'Analistas (finanzen.net)', fecha: '2026-10', n_comentarios: 6, tono: 'Positivo', resumen: 'Cuatro de seis recomiendan comprar o sobreponderar; Barclays recorta el objetivo a 8,75 € [3].' },
    ],
    temas: [
      { tema: 'PER bajo frente al historial', postura: 'Alcista', peso: 'Alto', contraste: 'Es cierto: 6-7 veces el beneficio, pero siempre ha cotizado así desde el rescate.' },
      { tema: 'Reservas de invierno y queroseno', postura: 'Bajista', peso: 'Alto', contraste: 'Reservas −7 % y solo el 39 % del verano 2027 cubierto [3].' },
      { tema: 'Rating y deuda', postura: 'Alcista', peso: 'Medio', contraste: 'Moody\'s con perspectiva positiva; deuda neta 0,6 veces el EBITDA a sep-25.' },
    ],
    lectura: 'El sentimiento está dividido: los analistas y los pocos foros visibles ven la acción barata, la prensa alemana espera a diciembre. No hay euforia ni capitulación: la acción está un 8 % por encima del mínimo de 52 semanas. El foro no aporta riesgos nuevos frente a los del informe (reservas, combustible, geopolítica).',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'Foros alemanes (wallstreet-online, ariva) y Reddit', tipo: 'Complemento', intentos: '1) wallstreet-online (sin contenido accesible); 2) ariva (sin contenido); 3) Seeking Alpha (404)', decision: 'Omitido' },
  ],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('A-E escritas;', empresas.length, 'comparables');

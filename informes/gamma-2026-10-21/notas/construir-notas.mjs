// Escribe las notas A-E de Gamma Communications (corte 2026-10-21) a partir de los documentos de notas/docs (resultados,
// informe anual 2025, RNS de Investegate), del ESEF de filings.xbrl.org (cuentas-xbrl.json, 2024-2025), de bolsa.json, de
// yahoo-datos.json (Yahoo quoteSummary del 21-oct-2026, tras el cierre) y de fx.json. Cada nota cita solo con [n] de su lista.
// Ejecutar: node informes/gamma-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const n2 = (x) => String(x).replace('.', ',');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const FX = lee('fx.json').fx;
const M = lee('docs/_manifest.json');
const u = (k) => M[k].url;
const INV = 'https://www.investegate.co.uk/announcement/rns/gamma-communications--gama';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report and Accounts 2025 (cuentas auditadas, segmentos, combinaciones de negocios, deuda, remuneración)', editor: 'Gamma Communications plc', tipo: 'Primaria', fecha: '2026-04-07', url: u('ar-2025') },
  { id: 2, titulo: 'Full year results 2025 (conciliación ajustado-estatutario, segmentos, ingresos recurrentes, perspectivas 2026)', editor: 'Gamma Communications plc', tipo: 'Primaria', fecha: '2026-03-24', url: u('fy-2025') },
  { id: 3, titulo: 'Interim results six months to 30 June 2026 (sin auditar): cuenta, balance, deuda neta, recompras, segmentos', editor: 'Gamma Communications plc', tipo: 'Primaria', fecha: '2026-09-07', url: u('hy-2026') },
  { id: 4, titulo: 'Full year results 2024, 2023, 2022, 2021 y 2019 (cuentas y BPA ajustado de cada año)', editor: 'Gamma Communications plc', tipo: 'Primaria', fecha: '2025-03-25', url: u('fy-2024') },
  { id: 5, titulo: 'Cuentas ESEF de 2024 y 2025 (filings.xbrl.org, LEI 213800LAQZXPRIZUEH50), herramienta cuentas.mjs', editor: 'filings.xbrl.org (FCA, Reino Unido)', tipo: 'Primaria', fecha: '2026-04-07', url: 'https://filings.xbrl.org/' },
  { id: 6, titulo: 'Interim results six months to 30 June 2025', editor: 'Gamma Communications plc', tipo: 'Primaria', fecha: '2025-09-08', url: u('hy-2025') },
  { id: 7, titulo: 'Gamma agrees to acquire STARFACE (precio, ventas y EBITDA de 2024)', editor: 'Gamma Communications plc (RNS, Investegate)', tipo: 'Primaria', fecha: '2025-01-14', url: u('rns-starface-2025-01-14') },
  { id: 8, titulo: 'Full Year Results 2025: transcripción de la presentación (Alemania, Reino Unido, PSTN, IA, inversión)', editor: 'Gamma Communications plc', tipo: 'Primaria', fecha: '2026-03-24', url: u('transcr-fy-2025') },
  { id: 9, titulo: 'Half Year 2026 investor presentation (ROCE, conversión de caja, ingresos recurrentes, Webex for Gamma)', editor: 'Gamma Communications plc', tipo: 'Primaria', fecha: '2026-09-07', url: u('pres-hy-2026') },
];

// Cuenta 2021-2025 de las notas de resultados [4, 2] (ESEF de 2024-2025 [5] coincide). EBITDA = EBIT + amortización total
// (incluida la de intangibles comprados); no recurrentes = EBITDA ajustado de la empresa − ese EBITDA.
const fila = (p, ing, cv, ebitda, am, ebit, rf, bai, imp, min, bn, gf, nr, bpa, dpa, acc) => ({
  periodo: p, ingresos: ing, coste_ventas: cv, gastos_generales: r1(ing - cv - ebitda), ebitda, amortizaciones: am, ebit, resultado_financiero: rf, bai, impuestos: imp,
  minoritarios: min, beneficio_neto: bn, gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
});
const cuenta = [
  fila('2021', 447.7, 219.2, 95.4, 27.1, 68.3, -1.1, 67.2, 13.2, 0.4, 53.6, 1.2, 0, 0.552, 0.132, 97.06),
  fila('2022', 484.6, 236.9, 92.6, 27.2, 65.4, -0.5, 64.9, 15.4, 0.2, 49.3, 1.3, 12.5, 0.506, 0.150, 97.49),
  fila('2023', 521.7, 254.5, 98.3, 31.3, 67.0, 4.5, 71.5, 17.8, 0.1, 53.6, 0.9, 16.0, 0.549, 0.171, 97.70),
  fila('2024', 579.4, 279.1, 124.1, 33.8, 90.3, 5.3, 95.6, 25.8, 0, 69.8, 1.8, 1.4, 0.720, 0.195, 96.98),
  fila('2025', 645.8, 297.6, 130.9, 40.0, 90.9, -3.2, 87.7, 22.7, 0.1, 64.9, 6.1, 10.8, 0.693, 0.222, 93.69),
];
const bal = (p, at, ac, pc, pt, fc, int, ppe, ex, cl, pr, acon, pcon, caja, deuda, arr, nci, res) => ({
  periodo: p, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: fc, intangibles: int, inmovilizado_material: ppe,
  existencias: ex, clientes: cl, proveedores: pr, activos_contrato: acon, pasivos_contrato: pcon, caja, deuda_financiera: deuda, arrendamientos: arr,
  patrimonio_neto: r1(at - pt - nci), minoritarios: nci, reservas: res,
});
const balance = [
  bal('2021', 361.8, 164.2, 66.2, 107.6, 83.1, 46.2, 47.0, 7.9, 98.4, 48.1, null, 7.4, 52.8, 3.3, 11.9, 2.2, 239.1),
  bal('2022', 406.8, 221.1, 72.6, 107.1, 76.7, 47.6, 42.9, 10.2, 75.0, 54.0, 34.4, 9.2, 94.6, 2.1, 11.1, 0.8, 273.9),
  bal('2023', 474.8, 260.5, 89.1, 130.6, 112.7, 42.0, 38.4, 11.8, 76.1, 66.5, 32.5, 14.1, 136.5, 1.7, 10.0, 0.2, 315.1),
  bal('2024', 528.0, 281.1, 95.0, 155.3, 115.2, 74.1, 33.6, 10.0, 80.4, 68.4, 35.0, 18.5, 153.7, 0, 7.9, 0.2, 368.3),
  bal('2025', 621.3, 154.1, 109.7, 236.3, 214.0, 182.8, 40.0, 7.5, 78.4, 70.3, 41.8, 20.2, 23.7, 33.0, 17.6, 0.3, 368.6),
];
const flu = (p, fo, cx, arr, adq, des, div, rec, em, int) => ({ periodo: p, flujo_operativo: fo, capex: cx, pagos_arrendamientos: arr, adquisiciones: adq, desinversiones: des, dividendos: div, recompras: rec, emision_acciones: em, intereses_en_financiacion: int });
const flujos = [
  flu('2021', 76.5, 16.8, 3.1, 49.3, 0.1, 11.7, 0, 5.9, 0.5),
  flu('2022', 84.7, 20.7, 2.8, 9.8, 0.1, 13.3, 0, 3.1, 0.1),
  flu('2023', 108.2, 23.0, 2.3, 30.5, 0, 15.2, 0, 1.9, 0.1),
  flu('2024', 92.9, 19.2, 3.3, 15.4, 0, 17.3, 27.3, 1.8, 0),
  flu('2025', 88.4, 24.3, 5.1, 159.3, 0, 18.9, 45.1, 0.9, 3.0),
];
const sem = (p, ing, g, ebitda, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r2(ebitda / ing * 100), bpa, vs_consenso: vs });

const A = {
  _estado: 'Completa. ESEF de 2024-2025 (filings.xbrl.org) comprobado con las notas de resultados; 2021-2023 de las notas de resultados anuales; 1S 2026 sin auditar. La amortización del ESEF solo recoge intangibles: se usa la total de las notas. Patrimonio = activo − pasivo − minoritarios (incluye la reserva de −1,1 M de opciones de venta sobre minoritarios).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 659.2, ebitda: 139.2, ebit: 98.5, beneficio_neto: 69.2, bpa: 0.754, dpa: 0.222, dpa_extraordinario: 0, fcf: 73.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 4.1 },
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'Starface (Alemania, telefonía para pymes en la nube y en local), comprada el 19-feb-2025 por 196 M EUR (≈ 165 M GBP) sin caja ni deuda; aportó 35,7 M de ingresos y 9,4 M de BAI en 2025 [1, 7]. Año completo de Placetel (comprada a Cisco en septiembre de 2024) [1].' },
      { periodo: '2024', descripcion: 'Placetel (Alemania, septiembre), Coolwave (Irlanda, mayorista de voz) y BrightCloud (contact center) [4].' },
      { periodo: '2023', descripcion: 'Pragma/EnableX (≈ 19,5 M) y deterioro del fondo de comercio y los intangibles de España [4].' },
      { periodo: '2021', descripcion: 'Mission Labs (40,8 M, contact center sobre Amazon Connect), Satisnet (ciberseguridad), Allnet y Desatel [4].' },
    ],
    comentario: 'Los ingresos pasaron de 447,7 M GBP en 2021 a 645,8 M en 2025 (TCAC del 9,6 %) y 659,2 M en los 12 meses a junio de 2026 [4, 2, 3]. Casi todo el crecimiento reciente es comprado: en 2025 los ingresos crecieron un 11,5 %, pero sin compras solo un 1 %, el margen bruto bajó un 1 % y el EBITDA ajustado quedó plano [2]. El EBITDA ajustado subió de 95,4 M a 141,7 M (21,9 % de las ventas) [2]. En el 1S 2026, ventas +4,2 % y EBITDA ajustado +2,3 % (72,5 M); Alemania crece (margen bruto +30 %, +11 % orgánico) y el Reino Unido pyme baja (margen bruto −7 %) por el apagado de la red de cobre (PSTN), precios y pérdida de puestos [3]. El 89-90 % de los ingresos es recurrente (se reconoce «a lo largo del tiempo»: cuotas de puestos en la nube, llamadas, líneas): 572,0 M de 645,8 M en 2025 [2, 9]. Lo de una vez son equipos (teléfonos y centralitas Starface), instalación y proyectos de Enterprise.',
    ajustes: 'El BPA ajustado de la empresa excluye la amortización de intangibles de compras (18,6 M en 2025), los extraordinarios (10,6 M en 2025: 5,1 de costes de Starface, 2,2 de la salida al mercado principal y 3,3 de reestructuración en el Reino Unido), otros ajustes (0,2 M; 1,4 en 2024 por el nuevo ERP), la actualización financiera de los pagos aplazados de compras y el crédito fiscal del patent box de años anteriores [2]. BPA diluido de 2025: 69,3 p estatutario frente a 94,5 p ajustado [2]. Los extraordinarios se han repetido en 2022 (deterioro de España 12,2 M), 2023 (16,0 M, con 12,7 de deterioro de intangibles) y 2025: el DCF resta 0,4 puntos de margen por ellos. En 2026 habrá costes de la oferta (asesores) en el 2S [3].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      sem('1S 2025', 316.6, null, 70.9, 0.479, null),
      sem('2S 2025', 329.2, null, 70.8, 0.466, 'En línea'),
      sem('1S 2026', 330.0, 4.2, 72.5, 0.477, 'En línea'),
    ],
    ultima_presentacion: 'Gamma publica semestres, no trimestres; EBITDA ajustado y BPA ajustado diluido de la empresa (2S 2025 = año − 1S) [2, 3, 6]. 1S 2026 (7-sep-2026, ya dentro de la oferta de Epiris): ingresos de 330,0 M GBP (+4,2 %), margen bruto de 178,1 M, EBITDA ajustado de 72,5 M (+2,3 %), BPA ajustado plano (47,7 p) por más amortización propia y menos intereses cobrados, y BPA estatutario +18 % (40,2 p) porque en 2025 hubo extraordinarios [3]. Conversión de caja del 97 % y deuda neta de 3,8 M [3]. La empresa espera 2026 en el rango del consenso (EBITDA ajustado 138,0-144,6 M y BPA ajustado 90,0-96,6 p, rango del 23-mar-2026) [2]. No hubo presentación a analistas: la empresa está en oferta.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2029', importe: 25.6 }],
    liquidez: 'Caja de 21,8 M GBP a 30-jun-2026 y línea de crédito revolvente de 130 M (104,5 M sin disponer) [3]. Covenants: deuda neta ≤ 3 veces el EBITDA y cobertura de intereses ≥ 4 veces; margen de SONIA + 1,5-2,25 % [1]. Vencimiento de la línea: sin confirmar en las cuentas leídas (se pone 2029 como estimación).',
    rating: 'Sin calificación crediticia',
    coste_deuda_pct: 6.0,
    vida_media_anios: 3.0,
    otros_pasivos: 'Pasivos de compras de 18,0 M GBP a 30-jun-2026 (8,0 a corto y 10,0 a largo): aplazados de Placetel y contingentes de Pragma (hasta 9,8 M) [3, 1]; a fin de 2025 eran 23,0 M (13,6 aplazados, 7,9 contingentes y 1,5 de opción de venta) [1]. Arrendamientos de 16,4 M [3]. Recompra: el programa del 13-ene-2026 dejó 21,5 M en «otras cuentas a pagar» a 30-jun (la parte aún no ejecutada); tras junio se compraron 703.820 acciones más (≈ 7,0 M) y está suspendido [3]. Sin pensiones de prestación definida [1].',
    comentario: 'Balance casi sin deuda: la compra de Starface (152,2 M de caja en febrero de 2025) se pagó con caja (153,7 M a fin de 2024) y la línea de crédito, y la deuda neta ya bajó a 9,3 M en diciembre de 2025 y 3,8 M en junio de 2026, aun con 66 M de recompras [2, 3]. Con arrendamientos y pasivos de compras, ≈ 38 M, 0,3 veces el EBITDA ajustado. El fondo de comercio y los intangibles (396,8 M) son ya el 64 % del activo por Starface: el riesgo de deterioro está en los Países Bajos (holgura de solo 2,4 M en la prueba de 2025) y en Alemania si el crecimiento decae [1]. El circulante comercial es pequeño (existencias + clientes − proveedores = 15,6 M, 2,4 % de las ventas), más 54,5 M de activos de contrato (comisiones a distribuidores diferidas) [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'Flujo operativo de 88,4 M GBP en 2025 (92,9 en 2024) tras impuestos y 9,4 M de extraordinarios en caja; inversión de 24,3 M (3,8 % de las ventas: plataformas propias y desarrollo capitalizado) y 5,1 M de arrendamientos: flujo libre de ≈ 59 M (≈ 63 de media en 2021-2025) [2, 4]. En los 12 meses a junio de 2026, ≈ 74 M [3]. Conversión de caja ajustada del 93 % en 2025 y del 97 % en el 1S 2026 [2, 3]. En 2021-2025 el flujo libre (≈ 316 M) pagó compras por 264 M, dividendos por 76 M y recompras por 72 M: la caja bajó de 52,8 a 23,7 M y se usó la línea de crédito [4, 2]. La dirección guía una inversión de ≈ 27-28 M al año («no vamos a entrar en la carrera armamentística de la IA») [8].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte LLP', anios_auditor: null, opinion: 'Favorable (sin salvedades) en 2025; Deloitte fue reelegido tras un concurso en 2024 y cambió el socio responsable [1]',
    comentario: 'Cuentas limpias y conservadoras: el BPA ajustado solo excluye amortizaciones de compras, extraordinarios identificados y efectos contables de las compras, y el EBITDA ajustado no excluye la remuneración en acciones (1,9 M en 2025) [1, 2]. Los extraordinarios no son raros (2022, 2023 y 2025) y vienen casi siempre de compras: deterioros de España (2022-2023) y costes de Starface (2025) [4, 2]. La señal más importante es la calidad del crecimiento: el crecimiento orgánico fue del 1 % en 2025 y el del Reino Unido pyme es negativo en 2026; las cifras de crecimiento publicadas dependen de Alemania comprada [2, 3]. Los activos de contrato (54,5 M, comisiones pagadas a distribuidores que se amortizan) suben más rápido que las ventas [1].',
    senales: [
      { senal: 'BPA ajustado frente a estatutario', nivel: 'Baja', comentario: '94,5 p frente a 69,3 p en 2025; la diferencia es sobre todo amortización de compras (18,6 M) y extraordinarios (10,6 M) [2].' },
      { senal: 'Crecimiento orgánico débil', nivel: 'Media', comentario: 'Ingresos +1 % y margen bruto −1 % sin compras en 2025; Reino Unido pyme −7 % de margen bruto en el 1S 2026 [2, 3].' },
      { senal: 'Extraordinarios repetidos', nivel: 'Media', comentario: '12,5 M en 2022, 16,0 M en 2023 y 10,8 M en 2025; deterioros de España en dos años seguidos [4, 2].' },
      { senal: 'Fondo de comercio e intangibles', nivel: 'Media', comentario: '396,8 M, el 64 % del activo; holgura de 2,4 M en los Países Bajos [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: inversión orgánica, compras selectivas (sobre todo Alemania), dividendo progresivo (≈ 25-30 % del beneficio ajustado) y recompras con el exceso de caja [1]. Por la oferta de Epiris no se pagarán más dividendos antes de que se cierre (la oferta se reduciría en el mismo importe) y la recompra está suspendida [3].',
    adquisiciones: [
      { anio: '2025', objetivo: 'STARFACE (Alemania)', importe: 165, ev_ebitda: 13.1, financiacion: 'Caja y línea de crédito', resultado: '35,7 M de ingresos y 9,4 M de BAI en 2025; con Placetel, ≈ 600.000 puestos en la nube y ≈ 15 % de cuota en Alemania [1, 7].' },
      { anio: '2024', objetivo: 'Placetel (Alemania, comprada a Cisco)', importe: null, ev_ebitda: null, financiacion: 'Caja (con pago aplazado de 13,1 M)', resultado: 'Venta directa por internet a pymes; crece al 13-15 % según la dirección [8].' },
      { anio: '2024', objetivo: 'Coolwave y BrightCloud', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Voz mayorista internacional y contact center [4].' },
      { anio: '2023', objetivo: 'Pragma/EnableX', importe: 19.5, ev_ebitda: null, financiacion: 'Caja y contingente', resultado: 'Contingente de 6,4 M (hasta 9,8) pendiente [1].' },
      { anio: '2021', objetivo: 'Mission Labs', importe: 40.8, ev_ebitda: null, financiacion: 'Caja', resultado: 'Contact center sobre Amazon Connect; base del negocio de CCaaS (48.000 puestos) [4, 2].' },
    ],
    comentario: 'Asignación de capital buena en conjunto: ROCE del 27,8 % en 2025 y del 30 % en el 12 meses a junio de 2026 según la empresa [1, 9], dividendo creciente todos los años de 2018 (9,3 p) a 2025 (22,2 p) y recompras desde 2024 (66 M hasta junio de 2026). Lo débil son las compras fuera de los mercados fuertes: España (deteriorada en 2022-2023) y los Países Bajos (holgura mínima). Alemania es la gran apuesta: Placetel y Starface costaron ≈ 200 M GBP y Starface se pagó a ≈ 13 veces el EBITDA [7], más del doble de lo que el mercado pagaba por la propia Gamma (≈ 6 veces antes de la oferta).',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Gamma Business (Reino Unido pyme y Service Provider)', descripcion: 'Telefonía en la nube (Horizon, iPECS, Webex for Gamma), troncales SIP, voz para Microsoft Teams, conectividad (fibra) y móvil vendidos por ≈ 1.000 distribuidores a pymes del Reino Unido, y servicios mayoristas a otros operadores.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 368.9, resultado: 95.0 }, { periodo: '2025', ingresos: 374.6, resultado: 93.7 }] },
      { nombre: 'Gamma Enterprise', descripcion: 'Venta directa a grandes empresas y sector público del Reino Unido: comunicaciones, contact center (CCaaS), redes y ciberseguridad.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 126.5, resultado: 31.4 }, { periodo: '2025', ingresos: 130.5, resultado: 29.9 }] },
      { nombre: 'Gamma Germany', descripcion: 'Placetel (venta por internet) y Starface (plataforma propia vendida por distribuidores, en la nube y en local).', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 54.3, resultado: 7.0 }, { periodo: '2025', ingresos: 110.2, resultado: 22.5 }] },
      { nombre: 'Otros Europa (Países Bajos y España)', descripcion: 'Comunicaciones en la nube para pymes y empresas.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 29.7, resultado: 4.8 }, { periodo: '2025', ingresos: 30.5, resultado: 4.7 }] },
      { nombre: 'Costes centrales', descripcion: 'Gastos de grupo no repartidos.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 0, resultado: -12.7 }, { periodo: '2025', ingresos: 0, resultado: -9.1 }] },
    ],
    geografias: [{ nombre: 'Reino Unido', peso_pct: 72.4 }, { nombre: 'Alemania', peso_pct: 19.0 }, { nombre: 'Resto de Europa', peso_pct: 7.3 }, { nombre: 'Resto del mundo', peso_pct: 1.3 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Puestos en la nube en el Reino Unido (miles)', valor_anterior: '1.040', valor_actual: '1.087', variacion: '+4,5 %', comentario: 'Fin de 2025 [2].' },
      { kpi: 'Puestos en la nube en Alemania (miles)', valor_anterior: '536 (proforma)', valor_actual: '594', variacion: '+11 %', comentario: 'Placetel y Starface; ≈ 15 % de cuota [2, 1].' },
      { kpi: 'Troncales SIP en el Reino Unido (miles)', valor_anterior: '932', valor_actual: '892', variacion: '−4 %', comentario: 'Producto heredado que baja a medida que las centralitas pasan a la nube [2].' },
      { kpi: 'Puestos de Teams con voz de Gamma (miles)', valor_anterior: '467', valor_actual: '555', variacion: '+19 %', comentario: 'Gamma vende la voz que va dentro de Microsoft Teams (Operator Connect y Direct Routing) [2].' },
      { kpi: 'Ingresos recurrentes', valor_anterior: '89 %', valor_actual: '90 % (1S 2026)', variacion: '=', comentario: 'Se reconocen a lo largo del tiempo [2, 9].' },
      { kpi: 'Webex for Gamma (miles de puestos)', valor_anterior: '56', valor_actual: '≈ 90', variacion: '+61 %', comentario: 'Junio de 2026; una de las mayores bases de Webex Calling mayorista del mundo [3].' },
    ],
    clientes: 'Sin concentración de clientes finales: cientos de miles de pymes a través de ≈ 1.000 distribuidores en el Reino Unido (canal indirecto) y venta directa a grandes cuentas y sector público en Enterprise [1]. La dependencia está en el canal: los distribuidores eligen qué plataforma vender y pueden pasar a otra (RingCentral, 8x8, Zoom Phone o la de los propios operadores). Poder de precios moderado: subidas anuales ligadas a la inflación en contratos de pymes; en 2026 la dirección calcula que el Reino Unido pyme pierde ≈ 2 puntos por precios y 2-3 por puestos [8]. Proveedores clave: BT Openreach (acceso), Cisco (Webex), Microsoft (Teams), Amazon (Connect).',
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report and Accounts 2025: mercado, motores de crecimiento, competencia, riesgos (cita Cavell Cloud Communications Market Report UK y Germany Q2 2025, Analysys Mason y Ofcom)', editor: 'Gamma Communications plc', tipo: 'Primaria', fecha: '2026-04-07', url: u('ar-2025') },
  { id: 2, titulo: 'Full Year Results 2025: transcripción (cuotas en puestos de nube del Reino Unido y Alemania, PSTN, Zoom, IA)', editor: 'Gamma Communications plc', tipo: 'Primaria', fecha: '2026-03-24', url: u('transcr-fy-2025') },
  { id: 3, titulo: 'Interim results 1S 2026 (segmentos, PSTN, Webex, IA)', editor: 'Gamma Communications plc', tipo: 'Primaria', fecha: '2026-09-07', url: u('hy-2026') },
  { id: 4, titulo: 'Fichas de competidores (ventas, EBITDA, valor empresa) de Yahoo Finance: RingCentral, 8x8, Zoom, Bandwidth, NFON, Sinch, Five9', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com' },
  { id: 5, titulo: 'Full year results 2025 (segmentos, KPI de puestos)', editor: 'Gamma Communications plc', tipo: 'Primaria', fecha: '2026-03-24', url: u('fy-2025') },
  { id: 6, titulo: 'Offer for Gamma Communications plc (anuncio de la Regla 2.7: riesgos de la estrategia en solitario según el consejo)', editor: 'Gamma y Bradbury Bidco (RNS)', tipo: 'Primaria', fecha: '2026-09-01', url: u('rns-oferta-2026-09-01') },
];
const usd = 1 / FX['GBPUSD=X'].precio, eur = 1 / FX['GBPEUR=X'].precio, sek = 1 / FX['GBPSEK=X'].precio;
const aGBP = { USD: usd, EUR: eur, SEK: sek, GBp: 0.01 };
const B_ = {
  _estado: 'Completa con un hueco: no hay serie pública del tamaño del mercado en libras; el tamaño es una estimación propia a partir de las cuotas de puestos que da la empresa y del crecimiento que cita de Cavell.',
  sector: {
    definicion: 'Mercado relevante: comunicaciones de empresa en la nube (telefonía en la nube o UCaaS, voz para Teams y Webex, contact center) y los servicios de voz y conectividad que las acompañan, para pymes y empresas del Reino Unido y Alemania, que dan el 91 % de las ventas de Gamma [5]. Se mide en puestos (usuarios con línea en la nube): Gamma tiene ≈ 13-14 % de los del Reino Unido y ≈ 15 % de los de Alemania según su consejero delegado [2], lo que da ≈ 8 millones de puestos en el Reino Unido y ≈ 4 millones en Alemania (estimación propia). En libras, el mercado se aproxima como las ventas de Gamma divididas por su cuota (≈ 4.600 M GBP en 2025, estimación propia que incluye la voz y la conectividad ligadas).',
    tamano: '≈ 4.600 M GBP en 2025 (estimación propia: 645,8 M de ventas de Gamma ÷ ≈ 14 % de cuota en puestos) [5, 2]',
    unidad_serie: 'millones de GBP (estimación propia a partir de la cuota en puestos y del crecimiento de usuarios de nube previsto por Cavell)',
    serie: [{ anio: '2025', tamano: 4600 }, { anio: '2026e', tamano: 4900 }, { anio: '2027e', tamano: 5250 }, { anio: '2028e', tamano: 5600 }],
    tcac_historico_pct: null, tcac_previsto_pct: 7, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Paso de centralitas locales a la nube', efecto: '+', horizonte: 'Estructural', evidencia: 'Usuarios de nube +7 % anual en el Reino Unido y +16 % en Alemania en 2025-2028 (Cavell, citado por Gamma) [1].' },
      { driver: 'Apagado de la red de cobre británica (PSTN, 31-ene-2027)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Empuja migraciones a fibra y nube, pero la fibra cuesta más a Gamma: ≈ 4 M de margen bruto perdido en 2025 y otro tanto en 2026; el efecto termina a finales de 2027 [2, 1].' },
      { driver: 'Plataformas de colaboración (Teams, Zoom, Webex) con voz', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Gamma vende la voz de 555.000 puestos de Teams y ≈ 90.000 de Webex: es canal y competidor a la vez [5, 3].' },
      { driver: 'Economía de las pymes británicas', efecto: '−', horizonte: 'Cíclico', evidencia: 'El Reino Unido pyme perdió margen bruto (−7 % en el 1S 2026) por puestos y precios [3].' },
      { driver: 'IA en contact center y agentes de voz', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Lanzamientos de Placetel AI y del «AI concierge»; los agentes de IA usan números y llamadas, pero pueden reducir puestos humanos de contact center [3, 2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Muchos proveedores de UCaaS (RingCentral, 8x8, Zoom Phone, Teams Phone, NFON, operadores) y precios que bajan en el Reino Unido pyme [3, 2].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Pymes atomizadas, pero el distribuidor decide la plataforma y negocia margen [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Openreach en acceso; Microsoft, Cisco y Amazon fijan las condiciones de sus plataformas [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Las grandes plataformas de colaboración pueden vender voz directamente; la red propia y la interconexión regulada son barreras [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Teams Phone de Microsoft, móviles y apps de mensajería sustituyen la línea fija [1].' },
    ],
    ciclo: { posicion: 'Madurez', comentario: 'En el Reino Unido el paso a la nube está avanzado (≈ 60 % de penetración según los analistas en la conferencia [2]) y el apagado del cobre de enero de 2027 adelanta migraciones que luego no se repetirán. Alemania está a mitad de camino y crece; el resto de Europa es pequeño. La demanda depende poco del ciclo (las líneas son esenciales), pero las altas de puestos y las subidas de precio sí dependen de la confianza de las pymes.' },
    regulacion: 'Ofcom regula la interconexión, la portabilidad y el apagado del PSTN (31-ene-2027) [1]. En Alemania, la Bundesnetzagentur. Riesgo de normas sobre llamadas de emergencia y protección de vulnerables en el paso a voz por internet, que encarecen las migraciones [1].',
    tendencias: 'Convergencia de telefonía, colaboración y contact center en una sola plataforma; venta de voz dentro de Teams, Zoom y Webex; IA en atención al cliente (agentes de voz, transcripción, resúmenes); fibra hasta el local (78 % de cobertura en el Reino Unido [1]); en Alemania, paso del hardware local a la nube, que es donde Starface tiene su base instalada.',
    confianza: 'Baja',
  },
  competencia: {
    cuota_pct: 14, posicion: 'Líder del canal de distribuidores de comunicaciones de empresa en el Reino Unido (≈ 13-14 % de los puestos en la nube) y «principal retador» en Alemania (≈ 15 %) [2, 1]',
    competidores: [
      { nombre: 'Microsoft (Teams Phone)', pais: 'EE. UU.', ticker: 'MSFT', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Teams es la plataforma de colaboración dominante; Gamma vende la voz que va dentro (555.000 puestos), así que Teams es a la vez canal y amenaza si Microsoft vende directamente sus planes de llamadas [5].' },
      { nombre: 'RingCentral', pais: 'EE. UU.', ticker: 'RNG', ingresos: Math.round(Y.RNG.ventas / 1e6 * usd), cuota_pct: null, margen_ebit_pct: null, comentario: `UCaaS mundial con canal de operadores; EBITDA del ${r1(Y.RNG.ebitda / Y.RNG.ventas * 100)} % de las ventas [4].` },
      { nombre: 'Zoom Communications (Zoom Phone)', pais: 'EE. UU.', ticker: 'ZM', ingresos: Math.round(Y.ZM.ventas / 1e6 * usd), cuota_pct: null, margen_ebit_pct: null, comentario: 'Colaboración con telefonía propia; Gamma es socio en Zoom Provider Exchange [4, 2].' },
      { nombre: '8x8', pais: 'EE. UU.', ticker: 'EGHT', ingresos: Math.round(Y.EGHT.ventas / 1e6 * usd), cuota_pct: null, margen_ebit_pct: null, comentario: 'UCaaS con fuerte presencia en el Reino Unido; ventas planas y deuda [4].' },
      { nombre: 'NFON', pais: 'Alemania', ticker: 'NFN.DE', ingresos: Math.round(Y['NFN.DE'].ventas / 1e6 * eur), cuota_pct: null, margen_ebit_pct: null, comentario: 'Telefonía en la nube alemana por distribuidores, el rival más directo de Starface y Placetel [4].' },
      { nombre: 'Operadores (BT, Vodafone, Telekom)', pais: 'Reino Unido y Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Venden telefonía y conectividad directamente a pymes y grandes empresas [1].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: '≈ 1.000 distribuidores que comparten portal, red y productos: cuantos más productos, más difícil cambiar de mayorista [1].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Ingresos 89-90 % recurrentes; el distribuidor tendría que migrar a sus clientes; troncales y números portados [5].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 1, evidencia: 'Plataformas propias (Horizon, Starface) pero muchas se licencian (Cisco, Broadsoft); sin patentes relevantes [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Red propia de voz e interconexión; margen EBITDA ajustado del 21,9 % frente al 10-20 % de rivales mayores [5, 4].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Primer mayorista del canal británico; en Alemania todavía construye escala [2].' },
      ],
    },
    amenazas: 'Lo que más puede erosionar el foso: (1) Microsoft vendiendo la voz de Teams directamente, sin operador; (2) los distribuidores grandes cambiando de mayorista o integrándose en grupos con su propia plataforma (consolidación del canal); (3) el fin del apagado del cobre, que ha sostenido altas y conversaciones con clientes y termina en enero de 2027 [1, 2]; (4) la IA si reduce los puestos humanos de atención; (5) en Alemania, NFON y los operadores con precios agresivos.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Gamma Communications vende telefonía y comunicaciones de empresa: líneas y centralitas en la nube, voz dentro de Microsoft Teams, Webex y Zoom, contact center, fibra, móvil y ciberseguridad [1]. En el Reino Unido (72 % de las ventas) vende sobre todo a través de ≈ 1.000 distribuidores que atienden a cientos de miles de pymes, y directamente a grandes empresas y sector público (Enterprise); en Alemania (19 %) vende por internet (Placetel) y por distribuidores (Starface); tiene negocios menores en los Países Bajos y España [5]. Emplea a 2.243 personas [1].',
    como_gana_dinero: 'Cobra cuotas mensuales por puesto, línea, troncal o conexión, más el consumo de llamadas: el 89-90 % de los ingresos es recurrente [5]. Su margen bruto es del 54 % (71 % en Alemania, donde la plataforma es propia), y el EBITDA ajustado del 21,9 % [5]. Gana más cuando el cliente usa su plataforma propia (Horizon, Starface) que cuando revende la de otro (Webex, Teams), y menos en conectividad de fibra que en el cobre antiguo. La caja se convierte casi entera (93-97 %) porque el negocio pide poca inversión (≈ 4 % de las ventas) [3].',
  },
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado en libras (serie oficial)', tipo: 'Complemento', intentos: '1) informe anual 2025 (solo crecimientos de usuarios de Cavell); 2) transcripciones de resultados (cuotas en puestos); 3) Ofcom Connected Nations (sin cifra de UCaaS)', decision: 'Estimación propia a partir de la cuota en puestos' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report and Accounts 2025: consejo, comisiones, remuneración, participaciones de consejeros, accionistas significativos', editor: 'Gamma Communications plc', tipo: 'Primaria', fecha: '2026-04-07', url: u('ar-2025') },
  { id: 2, titulo: 'Result of AGM (13-may-2026): votos por resolución', editor: 'Gamma Communications plc (RNS)', tipo: 'Primaria', fecha: '2026-05-13', url: u('rns-agmres-2026-05-13') },
  { id: 3, titulo: 'Appointment of Chief Financial Officer (Damien Maltarp; salida de Bill Castell)', editor: 'Gamma Communications plc (RNS)', tipo: 'Primaria', fecha: '2026-03-20', url: u('rns-cfo-2026-03-20') },
  { id: 4, titulo: 'Director/PDMR Shareholding: concesión de opciones del LTIP (7-sep-2026)', editor: 'Gamma Communications plc (RNS)', tipo: 'Primaria', fecha: '2026-09-07', url: u('rns-pdmr-2026-09-07') },
  { id: 5, titulo: 'Interim results 1S 2025 y full year 2025 (rangos de consenso y cumplimiento)', editor: 'Gamma Communications plc', tipo: 'Primaria', fecha: '2026-03-24', url: u('fy-2025') },
  { id: 6, titulo: 'Offer for Gamma Communications plc (compromisos irrevocables de los consejeros, intenciones de Epiris)', editor: 'Gamma y Bradbury Bidco (RNS)', tipo: 'Primaria', fecha: '2026-09-01', url: u('rns-oferta-2026-09-01') },
  { id: 7, titulo: 'Interim results 1S 2025 (rango de consenso de 2025)', editor: 'Gamma Communications plc', tipo: 'Primaria', fecha: '2025-09-08', url: u('hy-2025') },
  { id: 8, titulo: 'Total voting rights (30-sep-2026)', editor: 'Gamma Communications plc (RNS)', tipo: 'Primaria', fecha: '2026-10-01', url: u('rns-tvr-2026-10-01') },
];
const C = {
  _estado: 'Completa. Informe anual 2025, junta de 2026, cambio de director financiero y concesiones de opciones de septiembre de 2026. No hay compras ni ventas de directivos en el mercado en 12 meses en los RNS revisados.',
  directivos: {
    equipo: [
      { nombre: 'Andrew Belshaw', cargo: 'Consejero delegado', desde: '2022', participacion_pct: 0.11, trayectoria: 'En Gamma desde 2007 (director financiero del canal y del grupo); consejero delegado desde 2022. Con él llegaron las compras alemanas (Placetel, Starface), la salida al mercado principal y las recompras [1].' },
      { nombre: 'Damien Maltarp', cargo: 'Director financiero', desde: '2026', participacion_pct: null, trayectoria: 'Incorporado el 10-ago-2026 en sustitución de Bill Castell, que salió el 31-mar-2026 [3].' },
      { nombre: 'Rachael Matzopoulos', cargo: 'Secretaria del consejo', desde: null, participacion_pct: null, trayectoria: 'Secretaria del consejo [1].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'EBITDA ajustado «en el rango de las expectativas del mercado»', real: '125,5 M', cumplida: 'Sí' },
      { anio: '2025', guia: 'Rango de consenso (sep-2025): EBITDA ajustado 139,4-143,1 M y BPA 89,9-93,9 p', real: '141,7 M y 94,5 p', cumplida: 'Sí' },
      { anio: '2026', guia: 'Rango de consenso (mar-2026): EBITDA ajustado 138,0-144,6 M y BPA 90,0-96,6 p', real: 'En curso (1S: 72,5 M y 47,7 p)', cumplida: 'En curso' },
    ],
    comentario: 'Equipo que cumple lo que anuncia: Gamma guía con el rango de los analistas y lo ha cumplido en 2024 y 2025 [5, 7]. Pero en mayo de 2025 avisó de «debilidad continuada en el Reino Unido» y la acción cayó ≈ 10 % en un día, y los resultados de 2025 (24-mar-2026) trajeron una guía de 2026 plana y otra caída del 11,9 % [5]. El consejo vendió la empresa al primer ciclo de precio bajo: un resultado aceptable para el accionista a corto plazo, pero que dice que el propio consejo no veía fácil volver a cotizar a los múltiplos de antes en solitario [6]. Cambio de director financiero en 2026.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Martin Hellawell', cargo: 'Presidente (independiente al nombramiento)', tipo: 'Independiente', desde: '2023', comisiones: 'Nombramientos (presidente); ESG; Remuneración' },
      { nombre: 'Andrew Belshaw', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2014', comisiones: 'ESG' },
      { nombre: 'Damien Maltarp', cargo: 'Director financiero', tipo: 'Ejecutivo', desde: '2026', comisiones: '—' },
      { nombre: 'Rachel Addison', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneración; Auditoría y Riesgos; Nombramientos' },
      { nombre: 'Charlotta Ginman', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría y Riesgos (presidenta); Nombramientos' },
      { nombre: 'Shaun Gregory', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'ESG; Remuneración' },
      { nombre: 'Xavier Robert', cargo: 'Consejero (director de inversiones de Bridgepoint)', tipo: 'Independiente', desde: '2020', comisiones: '—' },
      { nombre: 'Chris Jagusz', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: true,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 99.96, voto_remuneracion_contra_pct: 0.04, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: 79.35,
    remuneracion_ceo: { anio: '2025', total: 1.374, fijo: 0.604, variable_corto: 0.568, variable_largo: 0.202, ratio_salario_medio: 27 },
    remuneracion: 'El consejero delegado cobró 1,37 M GBP en 2025: 0,60 M de fijo (salario de 575.000, +21 % en el año), 0,57 M de bonus y 0,20 M del plan a largo plazo [1]. El bonus se liga en un 60 % al BAI ajustado, un 20 % al margen bruto y un 20 % a objetivos personales (65,8 % cobrado); el plan a largo plazo, al BPA ajustado y a la rentabilidad total frente al FTSE 250 [1]. Ratio frente al empleado mediano: 27 veces [1]. La política de remuneración tuvo un 97,95 % a favor y el informe un 99,96 % en la junta de 2026 [2]. En septiembre de 2026 se concedieron 143.163 opciones del plan a largo plazo al consejero delegado y 134.052 al nuevo director financiero (parte para compensar lo que dejó en su anterior empleo) [4]: con la oferta, se liberarán en la medida que permitan las reglas del plan.',
    accionistas: [
      { nombre: 'Liontrust', pct: 9.87, tipo: 'Institucional', variacion: 'Informe anual 2025 (20-mar-2026)' },
      { nombre: 'BlackRock', pct: 5.15, tipo: 'Institucional', variacion: 'Informe anual 2025' },
      { nombre: 'Jupiter', pct: 5.03, tipo: 'Institucional', variacion: 'Informe anual 2025' },
      { nombre: 'Allianz Global Investors', pct: 4.99, tipo: 'Institucional', variacion: 'Informe anual 2025' },
      { nombre: 'Aegon', pct: 3.94, tipo: 'Institucional', variacion: 'Informe anual 2025' },
      { nombre: 'Fondos de arbitraje de fusiones', pct: 50, tipo: 'Institucional', variacion: '≈ 50 % del interés económico según el consejo (19-oct-2026), comprado tras el anuncio de la oferta' },
    ],
    insiders: [],
    control_y_defensas: 'Sin accionista de control: el mayor era Liontrust con el 9,87 % antes de la oferta [1]; hoy ≈ la mitad del interés económico está en fondos de arbitraje de fusiones, que compran para cobrar la diferencia hasta 1.120 p. Una acción, un voto; 6 de 8 consejeros independientes; presidente separado del consejero delegado [1]. Los consejeros solo tienen 114.824 acciones (0,13 %), todas comprometidas a votar a favor de la oferta [6]. Acciones con derecho de voto: 89.285.079 a 30-sep-2026 [8].',
    alertas: [
      'El presidente, Martin Hellawell, fue reelegido en la junta de mayo de 2026 con solo un 79,35 % a favor (el resto de resoluciones, por encima del 97 %); el consejo dijo no conocer el motivo [2].',
      'El consejo aceptó una oferta de capital privado a 1.120 p, un 27 % por debajo del cierre de 2024 (1.530 p) y un 32 % por debajo del máximo de 2021, tras 18 meses de caída: los accionistas que entraron antes de 2025 salen con pérdidas [6].',
      'Cambio de director financiero en 2026 (salida en marzo y llegada en agosto) [3].',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de GAMA.L, FTSE 250 (MIDD.L) y Stoxx Europe 600 Telecom (EXV2.DE): precio, rango, rentabilidades, beta, cierres de ejercicio; herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/GAMA.L/history' },
  { id: 2, titulo: 'Consenso de GAMA.L y comparables (BPA, ventas, objetivos, recomendaciones; cierre del 21-oct a las 15:38 UTC): quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/GAMA.L/analysis' },
  { id: 3, titulo: 'Offer for Gamma Communications plc: oferta en efectivo de 1.120 p de Bradbury Bidco (Epiris), recomendada; valor empresa ≈ 1.079 M GBP', editor: 'Gamma y Bradbury Bidco (RNS)', tipo: 'Primaria', fecha: '2026-09-01', url: u('rns-oferta-2026-09-01') },
  { id: 4, titulo: 'Offer update: oferta declarada final; juntas aplazadas al 2-nov-2026 por participación inferior al 40 %; ≈ 50 % en fondos de arbitraje; autorización de competencia alemana; cierre esperado en el 1T 2027', editor: 'Gamma Communications plc (RNS)', tipo: 'Primaria', fecha: '2026-10-19', url: u('rns-update-2026-10-19') },
  { id: 5, titulo: 'Rendimiento del gilt a 10 años (serie IUDMNPY): 5,30 % el 16-oct-2026 (dato recogido en el informe de Kainos del 21-oct)', editor: 'Bank of England', tipo: 'Oficial', fecha: '2026-10-16', url: 'https://www.bankofengland.co.uk/boeapps/database/' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Movimiento del precio de GAMA.L (1-12 meses, máximos, media de 200, avisos P1-P5): herramienta movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/GAMA.L/history' },
  { id: 8, titulo: 'Response to speculation (7-abr-2026): inicio del periodo de oferta; y anuncios del 13 y 15-may (Providence, Epiris, Oakley/Giacom)', editor: 'Gamma Communications plc (RNS)', tipo: 'Primaria', fecha: '2026-04-07', url: u('rns-esp-2026-04-07') },
  { id: 9, titulo: 'Statement of intention not to make an offer (Providence, 24-jun-2026)', editor: 'Providence Equity Partners (RNS)', tipo: 'Primaria', fecha: '2026-06-24', url: u('rns-noofer-2026-06-24') },
  { id: 10, titulo: 'Response to press speculation (21-ago-2026: conversaciones con Waterland/Giacom)', editor: 'Gamma Communications plc (RNS)', tipo: 'Primaria', fecha: '2026-08-21', url: u('rns-prensa-2026-08-21') },
  { id: 11, titulo: 'Rule 2.8 announcement (1-oct-2026: Waterland no hará oferta)', editor: 'Waterland (RNS)', tipo: 'Primaria', fecha: '2026-10-01', url: u('rns-28-2026-10-01') },
  { id: 12, titulo: 'Final Results 2025 (24-mar-2026) y AGM trading update (13-may-2026)', editor: 'Gamma Communications plc (RNS)', tipo: 'Primaria', fecha: '2026-05-13', url: u('rns-agm-2026-05-13') },
  { id: 13, titulo: 'Publication of Scheme Document (25-sep-2026)', editor: 'Gamma Communications plc (RNS)', tipo: 'Primaria', fecha: '2026-09-25', url: u('rns-scheme-2026-09-25') },
  { id: 14, titulo: 'Form 8.3 de Nursery Road Capital (compra de 150.000 acciones a 1.088 p el 19-oct)', editor: 'Nursery Road Capital (RNS)', tipo: 'Primaria', fecha: '2026-10-20', url: u('rns-nursery-2026-10-20') },
  { id: 15, titulo: 'Gamma agrees to acquire STARFACE (196 M EUR; ventas ≈ 44 M EUR y EBITDA ajustado ≈ 15 M EUR de 2024)', editor: 'Gamma Communications plc (RNS)', tipo: 'Primaria', fecha: '2025-01-14', url: u('rns-starface-2025-01-14') },
  { id: 16, titulo: 'Vonage Holdings 8-K (ex. 99.1): Ericsson compra Vonage por 6.200 M USD de valor empresa', editor: 'Vonage Holdings (SEC)', tipo: 'Primaria', fecha: '2021-11-22', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=vonage&type=8-K' },
  { id: 17, titulo: 'Sinch to acquire Inteliquent for $1.14B (ventas de 533 M USD y EBITDA de 135 M)', editor: 'TechCrunch', tipo: 'Prensa', fecha: '2021-05-16', url: 'https://techcrunch.com/2021/05/16/sinch-inteliquent/' },
  { id: 18, titulo: 'Gamma Communications says takeover offer is final (Alliance News)', editor: 'AJ Bell', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://www.ajbell.co.uk/news/articles/brief-gamma-communications-says-takeover-offer-final' },
  { id: 19, titulo: 'Tipos de cambio GBP/USD, GBP/EUR y GBP/SEK (21-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/GBPUSD=X' },
];
const g = Y['GAMA.L'];
const t = Object.fromEntries(g.trend.map((x) => [x.periodo, x]));
// PER de los próximos 12 meses de cada comparable: 0,19 del año en curso + 0,81 del siguiente (ejercicios a diciembre;
// Zoom cierra en enero: 0,25/0,75). BPA ajustado de Yahoo (para los estadounidenses, sin remuneración en acciones).
const compT = [['RNG', 'RingCentral', 'US'], ['ZM', 'Zoom Communications', 'US'], ['EGHT', '8x8', 'US'], ['BAND', 'Bandwidth', 'US'], ['NFN.DE', 'NFON', 'DE'], ['SINCH.ST', 'Sinch', 'SE'], ['FIVN', 'Five9', 'US']];
const comps = compT.map(([k, nombre, pais]) => {
  const y = Y[k]; const tr = Object.fromEntries(y.trend.map((x) => [x.periodo, x]));
  const w = k === 'ZM' ? 0.25 : 0.19;
  const bpaNtm = w * tr['0y'].bpa + (1 - w) * tr['+1y'].bpa;
  const f = aGBP[y.divisa];
  return {
    nombre, ticker: k, pais, capitalizacion: Math.round(y.cap * f / 1e6), ev_ventas: r2(y.ev / y.ventas), ev_ebitda_ltm: r1(y.ev_ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(y.precio / bpaNtm), crecimiento_pct: tr['+1y'].ventas && tr['0y'].ventas ? r1((tr['+1y'].ventas / tr['0y'].ventas - 1) * 100) : null,
    margen_ebitda_pct: r1(y.ebitda / y.ventas * 100), roic_pct: null, dn_ebitda: r1((y.ev - y.cap) / y.ebitda), fcf_yield_pct: null,
  };
});
const perMed = (() => { const v = comps.map((x) => x.per_ntm).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : (v[n / 2 - 1] + v[n / 2]) / 2; })();
const hora = new Date(g.hora * 1000).toISOString().slice(11, 16);
const bol = B.bolsa;
const D = {
  _estado: `Completa. Precio de cierre del 21-oct-2026 (1.088 GBp = 10,88 GBP, último dato a las ${hora} UTC). Mediana del PER NTM de los comparables: ${perMed}.`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Gamma Communications plc', nombre_corto: 'Gamma Communications', ticker: 'GAMA', isin: 'GB00BQS10J50', mercado: 'Bolsa de Londres (Main Market, FTSE 250; en el AIM hasta mayo de 2025)', indice_referencia: 'FTSE 250',
    pais: 'Reino Unido', pais_iso: 'GB', sector: 'Telecomunicaciones', industria: 'Comunicaciones de empresa en la nube (UCaaS) y servicios de voz', sede: 'Londres (domicilio social en Mánchester)', fundacion: null, empleados: 2243, web: 'https://gammagroup.co',
    precio: B.identificacion.precio / 100, fecha_precio: B.identificacion.fecha_precio, acciones: 90.6, capitalizacion_publicada: Math.round(g.cap / 1e6), free_float_pct: 99.9,
    max_52s: B.identificacion.max_52s / 100, min_52s: B.identificacion.min_52s / 100, volumen_medio_diario: `≈ ${r1(B.volumen_3m.importe_dia_millones / 100)} M GBP/día (3 meses; ≈ 1,1 M de acciones)`, proximos_resultados: null,
  },
  consenso: {
    guidance: 'Para 2026 la empresa espera un EBITDA ajustado y un BPA ajustado dentro del rango de los analistas: 138,0-144,6 M GBP y 90,0-96,6 p (rango del 23-mar-2026; en mayo, 138,1-142,8 M de EBITDA) [12]. Inversión de ≈ 27-28 M al año. Desde la oferta (1-sep-2026) no hay más guía ni dividendos [3].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(t['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['0y'].bpa), dpa: null, fuente: `Yahoo Finance, ${t['0y'].n} analistas (BPA ajustado) [2]` },
      { periodo: '2027e', ingresos: Math.round(t['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['+1y'].bpa), dpa: null, fuente: `Yahoo Finance, ${t['+1y'].n} analistas [2]` },
    ],
    recomendaciones: { n_analistas: g.reco ? g.reco.strongBuy + g.reco.buy + g.reco.hold + g.reco.sell + g.reco.strongSell : g.n_analistas, comprar: g.reco ? g.reco.strongBuy + g.reco.buy : null, mantener: g.reco ? g.reco.hold : null, vender: g.reco ? g.reco.sell + g.reco.strongSell : null, po_medio: r2(g.po_medio / 100), po_min: r2(g.po_min / 100), po_max: r2(g.po_max / 100) },
    revisiones: `El consenso de BPA ajustado es de ${n2(r1(t['0y'].bpa * 100))} p para 2026 (${t['0y'].n} analistas) y ${n2(r1(t['+1y'].bpa * 100))} p para 2027 (${t['+1y'].n}) [2]. Los objetivos de precio de Yahoo (media de ${n2(Math.round(g.po_medio))} p, entre ${g.po_min} y ${g.po_max}) son viejos: la mayoría de los analistas dejó de publicar cuando empezó el periodo de oferta (7-abr-2026) y hoy el precio lo fija la oferta de 1.120 p [2, 3]. Sin consenso de EBITDA gratuito.`,
    base_ebitda: 'ajustado (definición de la empresa)', ajuste_ebitda_pct_ventas: 0.4,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    posicion_corta_pct: g.corto_pct == null ? null : r1(g.corto_pct * 100),
    comentario: 'Rentabilidad total en GBP. La acción fue una de las mejores del FTSE 250 entre 2016 y 2020 (+82 % en 2019) y una de las peores desde 2021: −34 % en 2022 y −40 % en 2025, con una caída máxima del −62 % entre noviembre de 2021 y marzo de 2026 [1]. A cinco años pierde un 9,9 % anual frente al +0,9 % del FTSE 250 [1]. La caída la explica el múltiplo, no el beneficio: el BPA ajustado subió de 64,0 p (2021) a 94,5 p (2025) mientras el PER adelantado bajaba de ≈ 23 a ≈ 10 veces, porque el crecimiento orgánico se paró en el Reino Unido [1, 2]. Desde abril de 2026 la cotización la mueve la venta de la empresa: +17 % el 8-abr al conocerse el interés de compradores, y desde septiembre se queda pegada a la oferta de 1.120 p [7, 3]. Beta de 0,99 (mensual a cinco años) y 0,83 (semanal ajustada); volatilidad del 34 % [1].',
    contexto: {
      movimiento: { fecha: '2026-10-21', var_1m_pct: -2.8, var_3m_pct: 14.5, var_6m_pct: 14.4, var_12m_pct: 6.7, dist_max_52s_pct: -8.0, dist_min_52s_pct: 55.2, dist_max_historico_pct: -41.3, tendencia: 'alcista', volatilidad_60d_pct: 28.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: '2026-03-24', var_pct: -11.9, causa: 'Resultados de 2025: crecimiento orgánico del 1 %, Reino Unido pyme débil y guía de 2026 plana (EBITDA ajustado 138,0-144,6 M frente a 141,7 M en 2025) [12].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr-may 2026', var_pct: 31.4, causa: 'Inicio del periodo de oferta (7-abr: conversaciones con varios interesados; +16,7 % el 8-abr) y nombres de los posibles compradores (Providence, Epiris, Oakley/Giacom) [8].', veredicto: 'no cambia', condicion: null },
        { periodo: '2026-06-24', var_pct: -5.4, causa: 'Providence anuncia que no hará oferta [9].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun 2026', var_pct: -15.4, causa: 'Retirada de Oakley (12-jun) y de Providence (24-jun): el mercado reduce la probabilidad de una oferta [9].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago 2026', var_pct: 11.6, causa: 'Conversaciones con Waterland/Giacom confirmadas el 21-ago y, el 1-sep, oferta en firme de Epiris a 1.120 p [10, 3].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-19', tipo: 'fusión u oferta', hecho: 'Bidco declara la oferta de 1.120 p FINAL (no se subirá salvo oferta rival); juntas aplazadas al 2-nov por falta de quórum (votos por debajo del 40 %), ≈ 50 % del interés económico en fondos de arbitraje; autorización de competencia alemana recibida; cierre esperado en el 1T 2027 [4].', veredicto: 'descarta', condicion: 'Mientras la oferta siga viva, la acción no puede subir más del ≈ 3 % hasta 1.120 p: la regla a 12 meses no aplica. Se reabriría solo si la oferta fracasa (votación del 2-nov o tribunal) y el precio cae.' },
        { fecha: '2026-11-02', tipo: 'fusión u oferta', hecho: 'Junta del tribunal y junta general aplazadas al 2-nov-2026: el esquema necesita mayoría de accionistas y el 75 % del valor votado; si no se aprueba, la acción volvería hacia su valor sin oferta (732 p el 7-abr) [4, 13].', veredicto: 'descarta', condicion: 'Hecho binario pendiente que puede mover el precio más de un 30 %.' },
        { fecha: '2026-10-19', tipo: 'accionista de referencia', hecho: 'Nursery Road Capital compra 150.000 acciones a 1.088 p (Form 8.3): los arbitrajistas siguen comprando con un diferencial del ≈ 3 % [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-01', tipo: 'fusión u oferta', hecho: 'Waterland anuncia que no hará oferta (Regla 2.8): no hay rival a la vista [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-07', tipo: 'resultados', hecho: 'Resultados del 1S 2026: EBITDA ajustado +2,3 %, Reino Unido pyme −7 % de margen bruto, Alemania +30 %; sin dividendo a cuenta y recompra suspendida por la oferta [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-01', tipo: 'fusión u oferta', hecho: 'Oferta recomendada de Bradbury Bidco (Epiris, con HarbourVest y Limewood) a 1.120 p en efectivo: 1.015 M GBP por el capital diluido y ≈ 1.079 M de valor empresa; prima del 53 % sobre los 732 p del 7-abr [3].', veredicto: 'descarta', condicion: 'Igual que el 19-oct.' },
        { fecha: '2026-03-20', tipo: 'directivos', hecho: 'Nombramiento de Damien Maltarp como director financiero (desde el 10-ago) tras la salida de Bill Castell (31-mar) [3].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: null,
      veredicto: 'descarta',
      condicion: 'La oferta en efectivo de 1.120 p, final y recomendada, fija el precio: comprar hoy rinde como mucho un 2,9 % en 3-5 meses y, si la oferta fracasa el 2-nov o en el tribunal, el precio caería hacia el valor sin oferta. Revisar solo si la oferta no se completa.',
      comentario: 'No salta ningún aviso P de la herramienta, pero el precio no se mueve por el negocio: desde el 1-sep-2026 cotiza a un 2-5 % por debajo de la oferta de Epiris (1.120 p) [3, 7]. La subida de abril a octubre (+55 % desde el mínimo de 687 p del 30-mar) es la prima de la oferta, no una revalorización del negocio. Hay un hecho binario pendiente que puede mover el precio más de un 5 %: las juntas del 2-nov-2026 (tribunal y general) y la sanción del tribunal; la oferta es final, no hay rival (Providence, Oakley y Waterland se retiraron) y la autorización alemana ya está [4, 9, 11]. Veredicto: descarta. La regla de compra a 12 meses no tiene sentido para una acción que va a desaparecer de bolsa en el 1T 2027 a un precio fijo.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => +x.anio >= 2021).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre / 100, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Cierres de cada año en GBP (Yahoo) [1]. En base adelantada (precio de cierre ÷ BPA ajustado del año siguiente), Gamma cotizó a 23-26 veces en 2019-2021, cuando crecía al 15-25 % con el paso a la nube en el Reino Unido, a 13-16 veces en 2022-2024 y a ≈ 10 veces a finales de 2025, con el crecimiento orgánico parado; el 7-abr-2026, antes de la oferta, a ≈ 7,7 veces el BPA ajustado de 2026 [2]. La oferta paga ≈ 11,7 veces el BPA de 2026 y ≈ 7,5 veces el EBITDA ajustado de los 12 meses a junio [3].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Proveedores cotizados de telefonía en la nube y voz para empresas: RingCentral, Zoom, 8x8 y NFON (los rivales directos), Bandwidth y Sinch (voz y mensajería mayorista, como el negocio de Service Provider) y Five9 (contact center) [4]. Ninguno es igual: los estadounidenses venden directo y con remuneración en acciones muy alta (su BPA ajustado la excluye, el de Gamma no), NFON es pequeña y casi sin beneficio. No hay un mayorista de canal británico cotizado comparable.',
    empresas: comps,
    comentario: `A 1.088 p, Gamma cotiza a ≈ 11 veces nuestro BPA ajustado de los próximos 12 meses, por debajo de la mediana de los comparables (${n2(perMed)}x) aunque con un BPA de más calidad (incluye la remuneración en acciones) y con caja neta casi nula [2]. Antes de la oferta cotizaba a ≈ 7,7 veces, menos que 8x8 (5,5x, endeudada y sin crecimiento) y muy por debajo de RingCentral y Zoom (15-16x). El EV/EBITDA de la oferta (≈ 7,5 veces) también queda por debajo de los comparables (12-20 veces) [3]: el mercado y el comprador ven a Gamma como un negocio británico maduro con un trozo alemán que crece, no como una plataforma de software.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-09', objetivo: 'Gamma Communications', comprador: 'Epiris (Bradbury Bidco)', ev: 1079, ev_ventas: 1.64, ev_ebitda: 7.5, prima_pct: 53, excluir: false, comentario: 'Oferta en efectivo de 1.120 p, recomendada y final; EV/EBITDA ajustado de los 12 meses a junio de 2026 [3].' },
      { fecha: '2025-01', objetivo: 'STARFACE (Alemania)', comprador: 'Gamma Communications', ev: 165, ev_ventas: 4.45, ev_ebitda: 13.1, prima_pct: null, excluir: false, comentario: '196 M EUR sobre ventas de ≈ 44 M EUR y EBITDA ajustado de ≈ 15 M EUR de 2024 [15].' },
      { fecha: '2021-05', objetivo: 'Inteliquent (EE. UU., voz mayorista)', comprador: 'Sinch', ev: 820, ev_ventas: 2.14, ev_ebitda: 8.4, prima_pct: null, excluir: false, comentario: '1.140 M USD sobre ventas de 533 M y EBITDA de 135 M [17].' },
      { fecha: '2021-11', objetivo: 'Vonage (EE. UU., UCaaS y API)', comprador: 'Ericsson', ev: 4460, ev_ventas: 4.4, ev_ebitda: 31.6, prima_pct: 28, excluir: true, comentario: 'Valor empresa de 6.200 M USD: precio de plataforma de API en plena burbuja; se excluye [16].' },
    ],
    comentario: 'La única transacción que importa es la propia oferta de Epiris: 1.079 M GBP de valor empresa, 7,5 veces el EBITDA ajustado y 1,64 veces las ventas, con una prima del 53 % sobre el precio sin oferta [3]. Hubo una subasta de seis meses con al menos cinco interesados (Providence, Epiris, Oakley/Giacom, Waterland/Giacom y otros que pujaban por partes); ninguno pagó más [8, 9, 10, 11]. Es un buen indicio del valor de control. Gamma pagó por Starface casi el doble en múltiplo (13,1 veces el EBITDA): un negocio alemán que crece se paga mucho más que el británico maduro [15].',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'identificacion', campo: 'año de fundación', tipo: 'Complemento', intentos: '1) informe anual 2025; 2) anuncio de la oferta (sección «Information on Gamma»); 3) notas de resultados', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'próximos resultados', tipo: 'Complemento', intentos: '1) RNS de octubre; 2) web de inversores; 3) calendario de Yahoo', decision: 'Sin fecha: la empresa deja de cotizar si la oferta se completa en el 1T 2027' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'The Motley Fool UK: «FTSE 250 correction: a rare chance to buy cheap shares» (Gamma barata tras los resultados; apagado del cobre como catalizador)', editor: 'The Motley Fool UK', tipo: 'Foros y redes', fecha: '2026-03-24', url: 'https://www.fool.co.uk/2026/03/24/ftse-250-correction-a-rare-chance-to-buy-cheap-shares/' },
  { id: 2, titulo: 'AJ Bell / Alliance News: Gamma says takeover offer is final; Gamma shares fall as Providence withdraws', editor: 'AJ Bell', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://www.ajbell.co.uk/news/articles/brief-gamma-communications-says-takeover-offer-final' },
  { id: 3, titulo: 'Business UK ISP Gamma reach agreement on £1bn cash offer by Epiris', editor: 'ISPreview', tipo: 'Prensa', fecha: '2026-09-01', url: 'https://www.ispreview.co.uk/index.php/2026/09/business-uk-isp-gamma-reach-agreement-on-1bn-cash-offer-by-epiris.html' },
  { id: 4, titulo: 'Gamma Communications slumps as Providence abandons pursuit', editor: 'Hargreaves Lansdown', tipo: 'Prensa', fecha: '2026-06-24', url: 'https://www.hl.co.uk/shares/stock-market-news/company--news/archive/gamma-communications-slumps-as-providence-abandons-pursuit' },
  { id: 5, titulo: 'Offer update (aplazamiento de las juntas por baja participación)', editor: 'Gamma Communications plc (RNS)', tipo: 'Primaria', fecha: '2026-10-19', url: u('rns-update-2026-10-19') },
];
const E = {
  _estado: 'Completa con fuentes limitadas: Motley Fool UK, prensa financiera británica (AJ Bell, Hargreaves Lansdown, ISPreview); Stocktwits y Reddit sin conversación útil sobre GAMA.',
  sentimiento: {
    tono: 'Neutral', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'The Motley Fool UK', fecha: '2026-03', n_comentarios: 2, tono: 'Positivo', resumen: 'Antes de la oferta, artículos que veían a Gamma barata (≈ 14 veces el beneficio en sep-2025 frente a ≈ 23 de media de cinco años) con el apagado del cobre como catalizador, y avisaban del riesgo de que se retrasara [1].' },
      { plataforma: 'Prensa financiera británica (AJ Bell, HL, ISPreview)', fecha: '2026-10', n_comentarios: 6, tono: 'Neutral', resumen: 'Cobertura de la subasta: caída al retirarse Providence, prima del 53 % de Epiris, oferta final y juntas aplazadas por la baja participación; sin debate de fondo sobre el negocio [2, 3, 4].' },
    ],
    temas: [
      { tema: '¿Es 1.120 p un precio bajo?', postura: 'Dividida', peso: 'Alto', contraste: 'Es un 27 % menos que el cierre de 2024 y ≈ 11,7 veces el BPA ajustado de 2026, pero hubo una subasta de seis meses y nadie pagó más [5].' },
      { tema: 'Arbitraje de fusiones', postura: 'Neutral', peso: 'Alto', contraste: '≈ 50 % del capital en fondos de arbitraje: votarán a favor; la baja participación es de los accionistas a largo plazo [5].' },
      { tema: 'Apagado del cobre como catalizador', postura: 'Alcista', peso: 'Medio', contraste: 'Las cuentas dicen lo contrario a corto plazo: la migración a fibra resta ≈ 4 M de margen bruto al año hasta finales de 2027 [5].' },
    ],
    lectura: 'Ya no hay un sentimiento sobre el negocio sino sobre la operación: la acción la tienen arbitrajistas que esperan cobrar 1.120 p. La baja participación en las juntas apunta a accionistas antiguos poco entusiasmados, no a una rebelión organizada: no hemos encontrado ningún accionista grande que haya dicho que votará en contra. Opiniones, no datos: ninguna cifra sale de aquí.',
    confianza: 'Baja',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm} cap ${x.capitalizacion}`).join(', '));

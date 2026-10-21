// Escribe las notas A-E de Otis Worldwide (corte 2026-10-21) a partir de los documentos de notas/docs (EDGAR y web de
// inversores), del XBRL de la SEC (cuentas-xbrl.json), de bolsa.json (cierre del 20-oct-2026), de yahoo-datos.json
// (Yahoo quoteSummary del 21-oct-2026, 14:44 UTC, sesión abierta) y de la ficha sectorial de ascensores (14-oct-2026) y los
// informes de KONE (18-oct) y Schindler (14-oct). Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/otis-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const ED = 'https://www.sec.gov/Archives/edgar/data/1781335';
const anios = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025: cuentas consolidadas, segmentos, ventas por tipo y país, deuda, pensiones, reestructuración (UpLift), contingencias', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000178133526000011/otis-20251231.htm` },
  { id: 2, titulo: 'Otis Reports Fourth Quarter and Full Year 2025 Results (conciliación GAAP-ajustado, segmentos, guía 2026)', editor: 'Otis Worldwide Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-01-28', url: `${ED}/000178133526000004/a2025-12x318xkerexhibit99.htm` },
  { id: 3, titulo: 'Otis Reports First Quarter 2026 Results (guía rebajada a 4,20-4,24 USD de BPA ajustado)', editor: 'Otis Worldwide Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-22', url: `${ED}/000178133526000072/a2026-03x318xkerexhibit99.htm` },
  { id: 4, titulo: 'Otis Reports Second Quarter 2026 Results (cuenta, balance y flujos del semestre; guía rebajada a 4,01-4,05 USD)', editor: 'Otis Worldwide Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-22', url: `${ED}/000178133526000110/a2026-06x308xkerexhibit99.htm` },
  { id: 5, titulo: 'Form 10-Q del 2T26 (30-jun-2026): deuda, WeMaintain, litigio fiscal alemán, financiación de proveedores, acciones en circulación', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-23', url: `${ED}/000178133526000113/otis-20260630.htm` },
  { id: 6, titulo: 'Q2 2026 Earnings Call, transcripción corregida (FactSet CallStreet)', editor: 'Otis Worldwide Corporation (relación con inversores)', tipo: 'Primaria', fecha: '2026-07-22', url: 'https://s203.q4cdn.com/227649559/files/doc_financials/2026/q2/2Q26-Otis-Earnings-Transcript.pdf' },
  { id: 7, titulo: 'Q1 2026 Earnings Call, transcripción corregida (FactSet CallStreet)', editor: 'Otis Worldwide Corporation (relación con inversores)', tipo: 'Primaria', fecha: '2026-04-22', url: 'https://s203.q4cdn.com/227649559/files/doc_financials/2026/q1/1Q26-Otis-Earnings-Transcript.pdf' },
  { id: 8, titulo: 'Form 10-K del ejercicio 2024 (segmentos de 2022 reexpresados sin Rusia)', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2025-02-04', url: `${ED}/000178133525000010/otis-20241231.htm` },
  { id: 9, titulo: 'Form 10-K del ejercicio 2023 (coste de productos y servicios 2021-2023)', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2024-02-02', url: `${ED}/000178133524000013/otis-20231231.htm` },
  { id: 10, titulo: 'Form 10-K del ejercicio 2021 (segmentos y coste de 2019-2021, separación de UTC)', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2022-02-04', url: `${ED}/000178133522000007/otis-20211231.htm` },
  { id: 11, titulo: 'Notas de resultados del 4T y del ejercicio 2020 a 2024 (beneficio operativo y BPA ajustados, guías anuales)', editor: 'Otis Worldwide Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-01-29', url: `${ED}/000178133525000004/a2024-12x318xkerexhibit99.htm` },
  { id: 12, titulo: 'Otis Reports Third Quarter 2025 Results (cartera de mantenimiento +4 %)', editor: 'Otis Worldwide Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-10-29', url: `${ED}/000178133525000046/a2025-09x308xkerexhibit99.htm` },
  { id: 13, titulo: 'XBRL company facts de Otis Worldwide (series anuales de cuenta, balance y flujos)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001781335.json' },
  { id: 14, titulo: 'Form 8-K: emisión de 700 M USD al 4,488 % con vencimiento en 2029', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2026-05-07', url: `${ED}/000114036126019547/ef20072421_8k.htm` },
];

// Coste de productos + servicios [1, 9, 10]; no recurrentes dentro del EBIT = beneficio operativo ajustado − GAAP − «otras
// reestructuraciones» (recurrentes: 40-77 M todos los años, se quedan dentro) [1, 8, 11].
const COSTE = { 2019: 4640 + 4652, 2020: 4439 + 4538, 2021: 5293 + 4812, 2022: 4949 + 4816, 2023: 4843 + 5173, 2024: 4459 + 5545, 2025: 4182 + 5879 };
const ADJ_OP = { 2019: 1872, 2020: 1919, 2021: 2191, 2022: 2126, 2023: 2269, 2024: 2356, 2025: 2434 };
const OTRA_REESTR = { 2019: 54, 2020: 77, 2021: 56, 2022: 60, 2023: 42, 2024: 40, 2025: 54 };
const BPA_AJ = { 2019: 2.24, 2020: 2.52, 2021: 3.01, 2022: 3.17, 2023: 3.54, 2024: 3.83, 2025: 4.05 };
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => {
  const nr = ADJ_OP[c.periodo] - c.ebit - OTRA_REESTR[c.periodo];
  return { ...c, fin: undefined, coste_ventas: COSTE[c.periodo], no_recurrentes_en_ebitda: nr > 0 ? nr : null, participadas_en_ebitda: null, dpa_extraordinario: 0, gastos_financieros: c.gastos_financieros || null };
});
for (const c of cuenta) delete c.fin;
// Arrendamientos: US GAAP, operativos; su gasto ya está en el EBITDA → fuera de la deuda (0). Deuda = largo + corto.
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => { const o = { ...b, arrendamientos: 0 }; delete o.fin; return o; });
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => { const o = { ...f, pagos_arrendamientos: 0, desinversiones: f.desinversiones ?? 0, recompras: f.recompras ?? 0 }; delete o.fin; return o; });

// LTM a 30-jun-2026 = 2025 − 1S25 + 1S26 [2, 4]
const ltm = {
  periodo: 'LTM jun-26', fecha_fin: '2026-06-30',
  ingresos: 14431 - 6945 + 7425, ebit: 2133 - 958 + 1114, beneficio_neto: 1384 - 636 + 768,
  bpa: r2(3.50 - 1.60 + 1.99), dpa: r2(1.65 - 0.81 + 0.86), dpa_extraordinario: 0,
  fcf: (1596 - 405 + 680) - (152 - 70 + 77), participadas_en_ebitda: null,
  // ajustado − GAAP − otras reestructuraciones: (2.434 − 1.172 + 1.137) − 2.289 − (54 − 35 + 18)
  no_recurrentes_en_ebitda: (2434 - 1172 + 1137) - (2133 - 958 + 1114) - (54 - 35 + 18),
};
ltm.ebitda = ltm.ebit + (175 - 86 + 83);

const segH = (n, ing, res) => ({ periodo: n, ingresos: ing, resultado: res });
const A = {
  _estado: 'Completa (analista, sin subagentes). XBRL de la SEC comprobado contra los 10-K 2021, 2023, 2024 y 2025 y las notas de resultados.',
  financieros: {
    cuenta, ltm,
    cambios_perimetro: [
      { periodo: '2020', descripcion: 'Separación de United Technologies el 3-abr-2020: 2019 son cuentas combinadas de la división (sin la deuda de 6.300 M emitida en febrero de 2020 ni recompras); el patrimonio pasa de +1.700 M a −3.862 M [10].' },
      { periodo: '2022', descripcion: 'Venta del negocio de Rusia (2022): sus 106 M de ventas de 2022 quedan fuera de los segmentos reexpresados [8].' },
    ],
    comentario: 'Las ventas crecieron poco: de 13.118 M USD en 2019 a 14.431 M en 2025 (+1,6 % anual), con un año 2021 inflado por la recuperación (+12 %) y 2022 golpeado por el dólar fuerte (−4,3 %) [1, 10]. Debajo hay dos negocios que van en sentidos opuestos. El servicio subió de 7.470 M en 2019 a 9.442 M en 2025 (+4,0 % anual) y es el 65 % de las ventas; el equipo nuevo cayó de 6.428 M en 2021 a 4.989 M en 2025 (−22 %), arrastrado por China, que pasó de 2.444 M de ventas en 2023 a 1.650 M en 2025 [1]. El margen operativo ajustado subió de 14,3 % en 2019 a 16,9 % en 2025 (+260 pb) por la mezcla: el servicio gana un 25,1 % de margen de segmento y el equipo nuevo un 4,8 % [1, 2, 11]. En 2026 la tendencia se ha roto: con las ventas del primer semestre un 7 % arriba, el margen ajustado cayó 160 pb (15,3 %) por inversiones en calidad de servicio, costes de mano de obra y precio en China [4].',
    ajustes: 'Otis publica un beneficio operativo y un BPA «ajustados» que excluyen reestructuraciones, costes de la transformación UpLift, ajustes con RTX por el acuerdo fiscal de la separación, litigios no ordinarios, deterioros y partidas fiscales no recurrentes [2, 4]. Usamos las cifras publicadas y tratamos como no recurrente solo lo que no se repite: UpLift (2023-2025: 41, 145 y 145 M entre reestructuración y transformación), el ajuste con RTX por el litigio fiscal alemán (177 M en 2024 y 70 M en 2025), litigios (18 y 21 M) y deterioros de activos en venta (18 y 10 M), y en 2020 los costes de la separación de UTC [1, 8, 11]. Las «otras reestructuraciones» (40-77 M todos los años) se quedan dentro como coste recurrente. El BPA ajustado (4,05 USD en 2025 frente a 3,50 GAAP) también excluye intereses e impuestos no recurrentes del litigio alemán; es la base de la guía y del consenso [2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 3548, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 599 + 48, margen_ebitda_pct: r1((599 + 48) / 3548 * 100), bpa: 0.96, vs_consenso: null },
      { periodo: '4T24', ingresos: 3675, crecimiento_pct: 1.5, crecimiento_organico_pct: null, ebitda: 583 + 48, margen_ebitda_pct: r1((583 + 48) / 3675 * 100), bpa: 0.93, vs_consenso: null },
      { periodo: '1T25', ingresos: 3350, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 560 + 42, margen_ebitda_pct: r1((560 + 42) / 3350 * 100), bpa: 0.92, vs_consenso: null },
      { periodo: '2T25', ingresos: 3595, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 612 + 44, margen_ebitda_pct: r1((612 + 44) / 3595 * 100), bpa: 1.05, vs_consenso: null },
      { periodo: '3T25', ingresos: 3690, crecimiento_pct: 4.0, crecimiento_organico_pct: 2.0, ebitda: 632 + 44, margen_ebitda_pct: r1((632 + 44) / 3690 * 100), bpa: 1.05, vs_consenso: null },
      { periodo: '4T25', ingresos: 3796, crecimiento_pct: 3.0, crecimiento_organico_pct: 1.0, ebitda: 630 + 45, margen_ebitda_pct: r1((630 + 45) / 3796 * 100), bpa: 1.03, vs_consenso: null },
      { periodo: '1T26', ingresos: 3566, crecimiento_pct: 6.0, crecimiento_organico_pct: 1.0, ebitda: 550 + 41, margen_ebitda_pct: r1((550 + 41) / 3566 * 100), bpa: 0.89, vs_consenso: 'Inferior' },
      { periodo: '2T26', ingresos: 3859, crecimiento_pct: 7.0, crecimiento_organico_pct: 6.0, ebitda: 587 + 42, margen_ebitda_pct: r1((587 + 42) / 3859 * 100), bpa: 1.01, vs_consenso: 'En línea' },
    ],
    ultima_presentacion: 'EBITDA de cada trimestre = beneficio operativo ajustado + amortizaciones del estado de flujos; BPA ajustado [2, 3, 4, 12]. En la conferencia del 1T26 (22-abr) la dirección anunció 50 M USD de inversión en «excelencia de servicio» y precios con IA, dijo que la retención de clientes (sin China) se había estabilizado y rebajó el BPA a 4,20-4,24 USD [7]. En la del 2T26 (22-jul) el tono cambió: la retención «tarda más de lo esperado», bajó en América, y Otis frena las subidas de precio por «micro-precios» con IA en mantenimiento para no perder clientes (−20 M USD de beneficio), con otros 50 M de costes de productividad (mecánicos nuevos que tardan en rendir, horas extra para ejecutar modernizaciones) [6]. Los analistas preguntaron una y otra vez por el margen de servicio y por cuánto de los 50 M es temporal: la directora financiera dijo que 30 M lo son y que el margen de servicio pasará del 23,1 % del semestre a «mediados de 24 %» en el 3T y a ≈ 25 % en el 4T [6]. Se negaron a dar cifras de retención («solo una vez al año») y a guiar 2027 [6, 7]. La consejera delegada negó haber perdido cuota en equipo nuevo y atribuyó la caída de pedidos (−5 %) a comparaciones difíciles en Asia [6].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: '2026', importe: 695 }, { anio: '2027', importe: 1499 }, { anio: '2028', importe: 750 },
      { anio: '2029', importe: 700 }, { anio: '2030', importe: 1500 }, { anio: '2031+', importe: 3188 },
    ],
    liquidez: 'Caja de 813 M USD y línea de crédito no dispuesta de 1.500 M hasta agosto de 2030; programas de papel comercial de 1.500 M sin saldo a 30-jun-2026 [5].',
    rating: 'Grado de inversión de Moody\'s y S&P (el 10-K no da la nota) [1]',
    coste_deuda_pct: 3.1,
    vida_media_anios: 6.0,
    otros_pasivos: 'Pensiones: déficit neto de 284 M USD a finales de 2025 (312 M en 2024) [1]. Financiación de proveedores (confirming): 716 M a 30-jun-2026 dentro de proveedores, de ellos 98 M a 240 días, que tratamos como deuda en el puente [5]. Litigio fiscal alemán: Otis ganó en 2024 y espera cobrar unos 356 M USD netos; a 30-jun quedaban 55 M por cobrar y 55 M a pagar a RTX por el acuerdo fiscal de la separación, que RTX discute [5]. Amianto: pasivo estimado de 11-31 M hasta 2059 [5]. Riesgo fiscal de la separación: si Hacienda de EE. UU. considerase gravable la escisión de 2020, Otis podría deber importes relevantes (factor de riesgo, sin provisión) [1]. Sin covenants financieros apretados: cumple todos a 30-jun [5].',
    comentario: 'La deuda financiera bruta pasó de 39 M USD en 2019 a 8.436 M a 30-jun-2026: la separación de UTC en 2020 cargó a Otis con 6.300 M y desde entonces la empresa ha ido recomprando acciones (5.000 M desde 2020) con deuda y caja [1, 5]. Por eso el patrimonio es negativo (−5.748 M a 30-jun-2026): no es una señal de quiebra sino de un balance que reparte más de lo que gana, apoyado en un circulante negativo. Los anticipos de clientes (pasivos por contrato de 3.023 M) y los proveedores (2.099 M) financian los cobros (3.985 M) y la obra en curso (824 M) [4]. Deuda neta de 7.623 M frente a un EBITDA ajustado de unos 2.570 M: ≈ 3 veces, alta para el sector (KONE y Schindler tienen caja neta) [4].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'Otis convierte casi todo el beneficio en caja: flujo operativo de 1.469-1.750 M USD al año entre 2019 y 2025 con un capex de solo 115-183 M (≈ 1 % de las ventas), porque el servicio no necesita fábricas y el equipo nuevo cobra por adelantado [1]. El FCF publicado de 2025 fue de 1.444 M (1.596 − 152), un 104 % del beneficio neto [1, 2]. El de los últimos 12 meses (1.712 M) está inflado por 129 M de devoluciones del litigio fiscal alemán y por la entrada de anticipos del semestre; la guía de FCF ajustado de 2026 (1.500-1.550 M) es más baja que la de enero (1.600-1.700 M) [4]. Casi todo el capex es de mantenimiento; el crecimiento se compra con adquisiciones pequeñas de carteras de mantenimiento (36-109 M al año y WeMaintain, 170 M, en abril de 2026) [1, 5]. Desde 2021 la caja se va en dividendos (393-647 M) y recompras (725-1.007 M) [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 7, opinion: 'Favorable (sin salvedades) [1]',
    comentario: 'Auditor desde 2019 (PwC), opinión limpia y control interno eficaz [1]. Tres asuntos que mirar. Primero, el uso de cifras «ajustadas»: entre 2023 y 2025 Otis excluyó 593 M de costes de UpLift, del acuerdo con RTX, litigios y deterioros; son reales y en caja, aunque no se repitan, y 2026 ya trae otros 18 M de reestructuración [1, 4]. Segundo, el reconocimiento por grado de avance en el equipo nuevo y la modernización: los pasivos por contrato (anticipos) suben y bajan con los pedidos y mueven el flujo operativo de un trimestre a otro (+284 M en el 1S26) [4]. Tercero, la remuneración en acciones es baja (≈ 80 M al año, 0,5 % de las ventas) [4]. Los indicadores del motor deben leerse con cuidado: el Altman Z sale castigado por el patrimonio negativo y las reservas negativas, que vienen de recompras y de la separación, no de pérdidas; el Beneish y el Piotroski no muestran manipulación (véase el cálculo).',
    senales: [
      { senal: 'Patrimonio neto negativo (−5.748 M a 30-jun-2026)', nivel: 'Media', comentario: 'Viene de la deuda de la separación y de 5.000 M de recompras; deja sin sentido el ROE y castiga el Altman Z. Deuda neta / EBITDA ≈ 3 veces.' },
      { senal: 'Ajustes recurrentes en el beneficio «ajustado»', nivel: 'Baja', comentario: 'UpLift ya está terminado; las «otras reestructuraciones» (40-77 M al año) las tratamos como recurrentes.' },
      { senal: 'Disputa con RTX por la indemnización del litigio alemán', nivel: 'Baja', comentario: '55 M pagaderos que RTX discute; importe pequeño.' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: invertir en el servicio (contratación de unos 1.000 mecánicos al año, calidad, digital), compras de carteras de mantenimiento, dividendo creciente y recompras con el resto [1, 6]. Dividendo trimestral de 0,44 USD desde abril de 2026 (+4,8 %), un 120 % más que tras la separación [4, 7]. Programa de recompra de 2.000 M aprobado en enero de 2025, con 1.300 M por usar a finales de 2025; en 2026 la empresa recompró 800 M en el primer semestre, todo lo previsto para el año [1, 4, 7]. Deuda: grado de inversión y emisión de 700 M en mayo de 2026 para refinanciar el bono en euros de diciembre [14].',
    adquisiciones: [
      { anio: '2026', objetivo: 'WeMaintain (Francia; mantenimiento con tecnología digital e IA), participación mayoritaria', importe: 170, ev_ebitda: null, financiacion: 'Caja y papel comercial', resultado: 'Recién cerrada (abril de 2026): 142 M de fondo de comercio y 64 M de intangibles [5].' },
      { anio: '2025', objetivo: 'Minoritarios de Otis Electric (China)', importe: 215, ev_ebitda: null, financiacion: '80 M de caja y 135 M de deuda', resultado: 'Compra del 100 %; simplifica China y reduce los minoritarios [1].' },
      { anio: '2024', objetivo: 'Minoritarios de la filial de Japón', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Parte de la recompra de minoritarios en España, Japón, China e India desde 2020 [1].' },
      { anio: '2022', objetivo: 'Venta del negocio de Rusia', importe: null, ev_ebitda: null, financiacion: '—', resultado: 'Cargos de 28 M en 2022; 106 M de ventas fuera [8].' },
    ],
    comentario: 'Desde la separación Otis ha devuelto 8.400 M USD (3.400 M en dividendos y 5.000 M en recompras), más que todo su flujo de caja libre, y ha financiado la diferencia con deuda [1]. Las recompras se hicieron a precios de 80-95 USD; con la acción hoy en 72 USD, no han creado valor para quien vendió, aunque sí redujeron las acciones de 433 M a 383 M (−12 %) [1, 4]. Las compras son pequeñas y de cartera, con poco riesgo; la recompra de minoritarios (China, Japón, España, India) sube la parte del beneficio que es del accionista. El fallo está en no haber guardado margen para el ciclo: con 3 veces de deuda neta sobre EBITDA y el beneficio a la baja en 2026, el ritmo de recompras (800 M) se mantiene igual que el de 2025.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Equipo nuevo', descripcion: 'Diseño, fabricación, venta e instalación de ascensores, escaleras y pasillos mecánicos; China ≈ 1/5 de las ventas y más de la mitad de las unidades [1].', tipo_resultado: 'EBIT', historico: [segH('2021', 6428, null), segH('2022', 5778, 381), segH('2023', 5812, 381), segH('2024', 5367, 329), segH('2025', 4989, 240)] },
      { nombre: 'Servicio', descripcion: 'Mantenimiento y reparación (2,5 millones de unidades) y modernización de equipos propios y de otras marcas [1].', tipo_resultado: 'EBIT', historico: [segH('2021', 7870, null), segH('2022', 7801, 1832), segH('2023', 8397, 2014), segH('2024', 8894, 2185), segH('2025', 9442, 2374)] },
      { nombre: 'Otros (Rusia)', descripcion: 'Negocio de Rusia, vendido en 2022 y excluido de los segmentos reexpresados [8].', tipo_resultado: 'EBIT', historico: [segH('2022', 106, null)] },
    ],
    geografias: [
      { nombre: 'Estados Unidos', peso_pct: r1(4192 / 14431 * 100) }, { nombre: 'China', peso_pct: r1(1650 / 14431 * 100) },
      { nombre: 'Resto del mundo', peso_pct: r1(100 - r1(4192 / 14431 * 100) - r1(1650 / 14431 * 100)) },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Cartera de mantenimiento (unidades)', valor_anterior: '≈ 2,4 millones (2024)', valor_actual: '≈ 2,5 millones (2025)', variacion: '+4 % (3T25); +3 % (1T26 y 2T26)', comentario: 'El crecimiento se frena; la retención fuera de China bajó en el 2T26 [6, 7, 12].' },
      { kpi: 'Ventas de modernización', valor_anterior: '1.683 M USD (2024)', valor_actual: '1.858 M USD (2025)', variacion: '+10 %; +24 % orgánico en el 2T26', comentario: 'La línea que más crece; cartera +26 % a tipos constantes en junio de 2026 [1, 4].' },
      { kpi: 'Ventas de mantenimiento y reparación', valor_anterior: '7.211 M USD (2024)', valor_actual: '7.584 M USD (2025)', variacion: '+5 %', comentario: 'Mantenimiento +3 % orgánico (cartera +3 %, precio +3 %, mezcla y bajas en contra); reparación +12 % en el 2T26 [1, 6].' },
      { kpi: 'Margen del segmento de servicio', valor_anterior: '24,6 % (2024)', valor_actual: '25,1 % (2025); 23,2 % (2T26)', variacion: '−170 pb interanual en el 2T26', comentario: 'Objetivo de la dirección: ≈ 25 % en el 4T26 [2, 4, 6].' },
      { kpi: 'Ventas de equipo nuevo en China', valor_anterior: '2.444 M USD (2023)', valor_actual: '1.650 M USD (2025, ventas de origen China, todos los negocios)', variacion: '−32 % en dos años', comentario: 'El equipo nuevo en China cae a ritmo de «high teens» en el 2T26 [1, 4].' },
      { kpi: 'Cartera de pedidos de equipo nuevo', valor_anterior: '—', valor_actual: '+4 % a tipos constantes (jun-26); +9 % sin China', variacion: '—', comentario: 'Pedidos −5 % en el 2T26 con América +13 % y China −20 % [4, 6].' },
      { kpi: 'Unidades conectadas (Otis ONE)', valor_anterior: '—', valor_actual: '≈ 1,1 millones (dic-25)', variacion: '—', comentario: 'Base para el mantenimiento predictivo [1].' },
    ],
  },
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento y consenso de 3T24-2T25', tipo: 'Complemento', intentos: '1) notas de resultados de 3T25 y 4T25 (solo dan el trimestre comparable, sin crecimiento del año anterior); 2) titulares de Seeking Alpha (solo desde abr-26); 3) Yahoo (no guarda el consenso previo)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'resultado de segmento de 2021 en la segmentación vigente', tipo: 'Complemento', intentos: '1) 10-K 2024 (reexpresa solo 2022); 2) 10-K 2023 (2021 en la segmentación antigua, con Rusia y otro reparto de costes); 3) 10-K 2021', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025: negocio, China, empleados, I+D, riesgos', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000178133526000011/otis-20251231.htm` },
  { id: 2, titulo: 'Elevator Market Outlook 2030 – Spring 2026 update', editor: 'Roland Berger', tipo: 'Sectorial', fecha: '2026-06-11', url: 'https://www.rolandberger.com/en/Insights/Publications/Elevator-Market-Outlook-2030-Spring-2026-update.html' },
  { id: 3, titulo: 'Investment in Real Estate Development from January to June 2026', editor: 'National Bureau of Statistics of China', tipo: 'Sectorial', fecha: '2026-07-17', url: 'https://www.stats.gov.cn/english/PressRelease/202607/t20260717_1964157.html' },
  { id: 4, titulo: 'Ascensores y escaleras mecánicas: ficha sectorial corta (perímetro, tamaño, cuotas, comparables)', editor: 'Repositorio de análisis (sectores/ascensores-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/ascensores-2026-10-14.md' },
  { id: 5, titulo: 'KONE: análisis value del 18-oct-2026 (cuentas de KONE, Schindler, TKE, Hitachi y Mitsubishi Electric de sus informes oficiales; operación KONE-TKE)', editor: 'Repositorio de análisis (informes/kone-2026-10-18)', tipo: 'Analistas', fecha: '2026-10-18', url: 'informes/kone-2026-10-18/' },
  { id: 6, titulo: 'Schindler: análisis value del 14-oct-2026', editor: 'Repositorio de análisis (informes/schindler-2026-10-14)', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/schindler-2026-10-14/' },
  { id: 7, titulo: 'Q2 2026 Earnings Call, transcripción corregida', editor: 'Otis Worldwide Corporation', tipo: 'Primaria', fecha: '2026-07-22', url: 'https://s203.q4cdn.com/227649559/files/doc_financials/2026/q2/2Q26-Otis-Earnings-Transcript.pdf' },
  { id: 8, titulo: 'Q1 2026 Earnings Call, transcripción corregida', editor: 'Otis Worldwide Corporation', tipo: 'Primaria', fecha: '2026-04-22', url: 'https://s203.q4cdn.com/227649559/files/doc_financials/2026/q1/1Q26-Otis-Earnings-Transcript.pdf' },
  { id: 9, titulo: 'Otis Reports Second Quarter 2026 Results', editor: 'Otis Worldwide Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-22', url: `${ED}/000178133526000110/a2026-06x308xkerexhibit99.htm` },
  { id: 10, titulo: 'KONE / TK Elevator merger inquiry', editor: 'Competition and Markets Authority (GOV.UK)', tipo: 'Primaria', fecha: '2026-09-22', url: 'https://www.gov.uk/cma-cases/kone-slash-tk-elevator-merger-inquiry' },
  { id: 11, titulo: 'Form 10-K del ejercicio 2021 (historia de la separación de UTC)', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2022-02-04', url: `${ED}/000178133522000007/otis-20211231.htm` },
  { id: 12, titulo: 'Otis Implements Long-Standing CEO Succession Plan (nota de prensa)', editor: 'Otis Worldwide Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-09-15', url: `${ED}/000114036126036566/ef20081992_ex99-1.htm` },
  { id: 13, titulo: 'Proxy statement 2026 (DEF 14A): sostenibilidad y métricas', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2026-04-17', url: `${ED}/000114036126015389/ny20061782x1_def14a.htm` },
];
const BN = {
  historia: {
    resumen: 'Elisha Otis presentó en 1853 el freno de seguridad que hizo posibles los ascensores de pasajeros; la Otis Elevator Company instaló el primero en Nueva York en 1857 [1, 11]. United Technologies la compró en 1976 y durante 44 años fue su división de ascensores. El 3-abr-2020, en plena pandemia, UTC la escindió junto con Carrier y se fusionó con Raytheon; Otis salió a bolsa con 6.300 M USD de deuda y patrimonio negativo [11]. Desde entonces, con Judy Marks al frente (presidenta en 2017, consejera delegada en 2019), ha girado hacia el servicio, recomprado minoritarios en España, Japón, China e India, vendido Rusia (2022) y aplicado el programa UpLift (2023-2025) [1, 12]. En septiembre de 2026 anunció la retirada de Marks en 2027 [12].',
    hitos: [
      { anio: '1853', hito: 'Elisha Otis presenta el freno de seguridad para ascensores [11].' },
      { anio: '1976', hito: 'United Technologies compra Otis [11].' },
      { anio: '2017', hito: 'Judy Marks, presidenta de Otis (consejera delegada desde 2019) [12].' },
      { anio: '2020', hito: 'Separación de UTC (3 de abril) y salida a bolsa con 6.300 M de deuda [11].' },
      { anio: '2022', hito: 'Venta de Rusia; oferta por los minoritarios de Zardoya Otis (España) [1].' },
      { anio: '2023', hito: 'Lanzamiento de UpLift: ahorro anual de unos 200 M y nuevo modelo de servicio [1].' },
      { anio: '2025', hito: 'Reorganización de China y compra del 100 % de Otis Electric [1].' },
      { anio: '2026', hito: 'Compra de WeMaintain, dos rebajas de guía y anuncio de la retirada de la consejera delegada [7, 9, 12].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Otis es el mayor fabricante y mantenedor de ascensores y escaleras mecánicas del mundo: 14.431 M USD de ventas en 2025, 72.000 empleados (45.000 en campo, 37.000 mecánicos de servicio), más de 1.400 delegaciones, 16 fábricas y presencia directa en más de 70 países [1]. Vende equipo nuevo a promotores y constructoras (35 % de las ventas, 9 % del beneficio de los segmentos) y servicio a propietarios y administradores de edificios (65 % y 91 %) [1]. El servicio incluye mantenimiento preventivo y reparaciones de 2,5 millones de unidades, propias y de otras marcas, y la modernización de equipos viejos [1]. Ningún cliente pesa más del 10 % [1]. Las plataformas Gen2, Gen3 y Gen360 cubren la vivienda y la oficina; SkyRise, los rascacielos; Otis ONE conecta 1,1 millones de unidades a la nube [1].',
    como_gana_dinero: 'El dinero se gana en el mantenimiento: contratos de varios años (unos cuatro), con subida anual de precio y una visita que depende de la densidad de equipos por mecánico en cada ciudad [1, 7]. El 91 % del beneficio de los segmentos sale del servicio, con un margen del 25,1 % en 2025, frente al 4,8 % del equipo nuevo [1]. El equipo nuevo se vende casi a coste porque alimenta la cartera: cada ascensor instalado puede dar 20-30 años de mantenimiento si se retiene al cliente. El margen depende del precio frente a los salarios (la mano de obra es el coste principal; los materiales, 600-700 M al año) y de la mezcla: la modernización crece más pero gana menos que el mantenimiento [7]. Poca estacionalidad: el equipo nuevo baja en el 1T por el Año Nuevo chino [1].',
    clientes: 'Clientes muy repartidos: el cliente medio tiene unas cuatro unidades y ninguno supera el 10 % de las ventas [1, 7]. Los contratos de mantenimiento duran unos cuatro años, así que solo se puede renegociar el precio de una cuarta parte de la cartera cada año [7]. El poder de precios es real pero limitado: el mantenimiento subió un 3 % de precio en 2026, a la par que la inflación salarial, y cuando Otis intentó subir más con «micro-precios» por IA, las bajas aumentaron y frenó [7]. La retención cayó a finales de 2024, se estabilizó en el 1T26 y volvió a bajar en América en el 2T26; Otis no publica la cifra salvo una vez al año [7, 8]. En China, la cartera crece a un ritmo «high single digit» y la modernización se duplica por los estímulos [7].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es el mundial de ascensores y escaleras mecánicas en sus tres negocios (equipo nuevo, mantenimiento y modernización), que es el perímetro de las cuotas de los grandes. Usamos Roland Berger: 110.000 M USD en 2025 y 133.000 M USD en 2030, con el mantenimiento como mayor negocio y la modernización como el que más crece (≈ 7 % anual) [2]. Otras casas dan cifras de 85.000 a 160.000 M según el perímetro; preferimos la de Roland Berger porque cuadra con las ventas de los cinco grandes (unos 55.000 M USD, la mitad) [4, 5].',
    tamano: '≈ 110.000 M USD en 2025 [2]',
    unidad_serie: 'miles de millones de USD',
    serie: [{ anio: '2025', tamano: 110 }, { anio: '2030e', tamano: 133 }],
    tcac_historico_pct: null, tcac_previsto_pct: 3.9, cr5_pct: 51.3, estructura: 'Concentrada',
    drivers: [
      { driver: 'Construcción residencial en China', efecto: '−', horizonte: 'Cíclico', evidencia: 'En enero-junio de 2026 la superficie de obra nueva iniciada cayó un 23,4 % y la inversión inmobiliaria un 18,0 % [3]. Las ventas de Otis con origen China bajaron de 2.444 M USD en 2023 a 1.650 M en 2025 y el equipo nuevo en China cae a ritmo de «high teens» en 2026 [1, 9]. Roland Berger no ve mejora antes de 2027 [2].' },
      { driver: 'Envejecimiento de la base instalada (modernización y reparación)', efecto: '+', horizonte: 'Estructural', evidencia: 'Modernización ≈ 7 % anual hasta 2030 [2]; las ventas de modernización de Otis crecieron un 24 % orgánico en el 2T26 y su cartera un 26 % a tipos constantes; la dirección habla de una ola «hasta los años 2030» [7, 9].' },
      { driver: 'Crecimiento de la base mantenida', efecto: '+', horizonte: 'Estructural', evidencia: 'El mantenimiento aportará 13.000 de los 23.000 M USD de crecimiento del mercado hasta 2030 [2]; la cartera de Otis crece un 3-4 % al año [7].' },
      { driver: 'Equipo nuevo fuera de China (América, India, Oriente Medio)', efecto: '+', horizonte: 'Cíclico', evidencia: 'Pedidos de equipo nuevo de Otis en América +24 % en el 1T26 y +15 % en el 2T26; cartera sin China +9 % [7].' },
      { driver: 'Coste de la mano de obra y escasez de mecánicos', efecto: '−', horizonte: 'Estructural', evidencia: 'Otis contrata unos 1.000 mecánicos al año y sufre 50 M de sobrecostes de productividad en 2026 por la formación y las horas extra [7].' },
      { driver: 'Concentración del sector (KONE-TKE)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'KONE compra TK Elevator por 29.400 M EUR de valor empresa; juntas mantendrían 3,2 millones de unidades, más que Otis (2,5 millones); la CMA británica abrió consulta el 22-sep-2026 [5, 10].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cuatro grandes con el 45 % del mercado; en equipo nuevo se compite en precio (margen del 3-5 % en Otis), en mantenimiento la rivalidad es local y por calidad de servicio [1, 2].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Clientes atomizados (cuatro unidades de media), pero pueden cambiar de mantenedor al vencer el contrato; la retención de Otis bajó en 2025-2026 y las subidas de precio por encima de la inflación provocan bajas [7].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Materiales de 600-700 M al año, cubiertos al 98 % para 2026; la mano de obra especializada es el verdadero cuello de botella [7].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hace falta densidad de mecánicos por ciudad, piezas y certificación; los independientes y los fabricantes chinos entran por precio en mantenimiento y en equipo nuevo de vivienda [1, 5].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'No hay sustituto del ascensor en un edificio de más de cuatro plantas, y la inspección y el mantenimiento son obligatorios por ley [1].' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'El ciclo va partido: el equipo nuevo cae en China por tercer año (obra nueva −23 % en el 1S26) mientras crece en América e India, y el servicio crece en todas las regiones [3, 7, 9]. En 2020 las ventas de Otis cayeron solo un 2,8 % y el beneficio operativo ajustado subió [11]; en 2022 el golpe vino del dólar y de los costes, con ventas −4,3 % y margen ajustado estable (15,5 %) [1]. No hay datos de Otis como empresa independiente en 2008-09.' },
    regulacion: 'Las normas de seguridad (inspecciones obligatorias, códigos ASME A17 en EE. UU. y EN 81 en Europa) garantizan la demanda de mantenimiento y empujan la modernización de equipos viejos [1]. La regulación que más pesa ahora es la de competencia: la compra de TKE por KONE necesita autorización en la UE, el Reino Unido y EE. UU.; la CMA abrió consulta en septiembre de 2026 [10]. En China, los estímulos con bonos especiales para renovar viviendas antiguas impulsan la modernización (pedidos de modernización en China +100 % en el 2T26) [7]. Aranceles de EE. UU.: Otis espera un pequeño beneficio en 2026 frente a 2025 [8].',
    tendencias: 'Tres tendencias. La primera, la conectividad y la IA en el mantenimiento: 1,1 millones de unidades de Otis conectadas, mantenimiento predictivo y precios por segmentos con IA [1, 7]; favorece a quien tiene escala y datos, y también a independientes digitales como WeMaintain, que Otis ha preferido comprar [7]. La segunda, la modernización de una base envejecida, que la dirección ve como una ola de varios años [7]. La tercera, la escasez de mecánicos y la presión salarial, que Otis está pagando en 2026 [7]. Otis gana con las dos primeras por su base de 2,5 millones de unidades; la tercera le resta margen a corto plazo.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 13.1,
    posicion: '1.º mundial en ascensores y escaleras (≈ 13 % del mercado de 110.000 M USD) y la mayor cartera de mantenimiento (2,5 millones de unidades); en equipo nuevo en China compite con KONE, Schindler, Mitsubishi, Hitachi y fabricantes locales [1, 2, 5].',
    competidores: [
      { nombre: 'KONE', pais: 'Finlandia', ticker: 'KNEBV', ingresos: Math.round(11245 * 1.13), cuota_pct: 11.6, margen_ebit_pct: 12.2, comentario: '11.245 M EUR de ventas en 2025 (convertidas a 1,13 USD/EUR) y margen EBIT ajustado del 12,2 %; compra TK Elevator y pasaría a ser el número uno en unidades mantenidas [5].' },
      { nombre: 'Schindler', pais: 'Suiza', ticker: 'SCHP', ingresos: Math.round(11683 * 1.13), cuota_pct: 12.0, margen_ebit_pct: 13.3, comentario: '10.947 M CHF en 2025 y margen ajustado del 13,3 %; caja neta; ha dicho que recurrirá KONE-TKE [5, 6].' },
      { nombre: 'TK Elevator', pais: 'Alemania', ticker: null, ingresos: Math.round(9200 * 1.13), cuota_pct: 9.5, margen_ebit_pct: 14.8, comentario: 'De Advent y Cinven; ≈ 9.200 M EUR en el ejercicio a sep-25 y margen EBIT ajustado del 14,8 %; más de 1,4 millones de unidades; en venta a KONE [5].' },
      { nombre: 'Hitachi (Building Systems)', pais: 'Japón', ticker: '6501', ingresos: Math.round(4864 * 1.13), cuota_pct: 5.0, margen_ebit_pct: 12.0, comentario: 'Previsión de 850.000 M JPY (−9 %) por la caída del equipo nuevo en China [5].' },
      { nombre: 'Mitsubishi Electric (Building Systems)', pais: 'Japón', ticker: '6503', ingresos: Math.round(4050 * 1.13), cuota_pct: 4.2, margen_ebit_pct: 9.4, comentario: '707.800 M JPY en el ejercicio a mar-26 (+6 %) [5].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'No hay efecto de red entre clientes; la densidad de unidades por ciudad abarata cada visita, que es escala, no red [1].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Cambiar de mantenedor es posible al vencer el contrato (unos cuatro años) y las piezas propias lo encarecen; pero la retención de Otis bajó en 2025-2026 cuando falló la calidad, lo que demuestra que el coste de cambio no es alto [7].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca de 170 años, 4.600 patentes y 1.300 solicitudes; pesa en rascacielos y obra pública, menos en vivienda [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen de servicio del 25 % frente a un margen EBIT total del 12-15 % en KONE, Schindler y TKE, por la mayor cartera y el peso de EE. UU. [1, 5].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: '2,5 millones de unidades, 1.400 delegaciones y 37.000 mecánicos: en una ciudad, el que más unidades tiene hace la ruta más barata; los cuatro grandes tienen ≈ 45 % del mercado [1, 2].' },
      ],
    },
    amenazas: 'Tres amenazas. Primera, KONE-TKE: si se aprueba, KONE tendrá 3,2 millones de unidades y más escala que Otis en Europa y Asia, y podría competir en precio por carteras (probabilidad de cierre alta en 2027) [5, 10]. Segunda, la retención: los independientes locales y digitales ganan clientes cuando la calidad de servicio falla, como le ha pasado a Otis en América en 2025-2026 (probabilidad media) [7]. Tercera, los fabricantes chinos de bajo coste en equipo nuevo de vivienda en Asia y Oriente Medio, que presionan el precio en el segmento menos rentable (probabilidad alta, impacto bajo) [5].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Tres asuntos con cifras. Seguridad laboral: con 45.000 empleados de campo, los accidentes son el principal riesgo humano y reputacional; Otis la sitúa como primer «absoluto» y la cultura de servicio la mide por retención [7, 12]. Eficiencia energética: los ascensores con variador regenerativo y los equipos modernizados consumen menos, lo que convierte la descarbonización de edificios en un motor de la modernización [1]. Gobierno de la remuneración: el voto consultivo sobre retribución se rechazó en 2025 (39 % a favor) por las concesiones extraordinarias de 2024 [13].',
    controversias: 'Sin sanciones relevantes encontradas en tres años en los documentos leídos. Pasivos menores por amianto (11-31 M USD hasta 2059) y litigios de 18-21 M en 2024-2025 fuera del curso ordinario [1]. En octubre de 2026 un despacho anunció una «investigación» por posibles incumplimientos de deberes fiduciarios, sin demanda conocida.',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K y proxy 2026 (no dan calificaciones); 2) búsqueda de MSCI y Sustainalytics (de pago); 3) informe de sostenibilidad (no descargado por tiempo)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'tcac_historico_pct', tipo: 'Complemento', intentos: '1) Roland Berger (solo 2025 y 2030); 2) ficha sectorial (mismo dato); 3) Credence Research (perímetro distinto)', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', BN);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comités, remuneración, voto de 2025, accionistas', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2026-04-17', url: `${ED}/000114036126015389/ny20061782x1_def14a.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta de 2026 (27-may-2026)', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2026-05-29', url: `${ED}/000178133526000102/otis-20260527.htm` },
  { id: 3, titulo: 'Form 8-K: resultados de la junta de 2025 (15-may-2025; voto consultivo de retribución rechazado)', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2025-05-16', url: `${ED}/000178133525000024/otis-20250515.htm` },
  { id: 4, titulo: 'Form 8-K: retirada de Judith Marks (consejera delegada y presidenta) en 2027 y acuerdo de transición', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2026-09-15', url: `${ED}/000114036126036566/ef20081992_8k.htm` },
  { id: 5, titulo: 'Form 8-K: nombramiento de Enrique Miñarro Viseras como director de operaciones', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2026-01-20', url: `${ED}/000114036126001569/ef20063351_8k.htm` },
  { id: 6, titulo: 'Formularios 4 de directivos y consejeros (21-oct-2025 a 21-oct-2026), herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001781335&type=4' },
  { id: 7, titulo: 'Notas de resultados del 4T de 2020 a 2025 (guías anuales y resultados)', editor: 'Otis Worldwide Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-01-28', url: `${ED}/000178133526000004/a2025-12x318xkerexhibit99.htm` },
  { id: 8, titulo: 'Notas de resultados del 1T26 y del 2T26 (guías rebajadas)', editor: 'Otis Worldwide Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-22', url: `${ED}/000178133526000110/a2026-06x308xkerexhibit99.htm` },
  { id: 9, titulo: 'Form 10-K 2025: directivos (Item 10) y separación', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000178133526000011/otis-20251231.htm` },
  { id: 10, titulo: 'Noticias de 12 meses de Otis clasificadas (herramientas/noticias.mjs: Reuters, CNBC, Pluang, Simply Wall St)', editor: 'Varios (agregado de prensa)', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://www.reuters.com/business/' },
];
const C = {
  _estado: 'Completa (analista).',
  directivos: {
    equipo: [
      { nombre: 'Judith F. Marks', cargo: 'Presidenta del consejo, consejera delegada y presidenta ejecutiva', desde: '2017', participacion_pct: 0.04, trayectoria: 'Antes, consejera delegada de Siemens USA y de Dresser-Rand. Llevó la separación de UTC en 2020, el giro al servicio y UpLift; desde la separación, rentabilidad total del 77 % y 8.400 M devueltos [4]. Se retira en el 1S27 (como tarde el 31-jul-2027) [4].' },
      { nombre: 'Cristina Méndez', cargo: 'Directora financiera', desde: '2024', participacion_pct: 0.0, trayectoria: 'Llegó en 2024; ha presentado las dos rebajas de guía de 2026 [1, 8].' },
      { nombre: 'Enrique Miñarro Viseras', cargo: 'Director de operaciones', desde: '2026', participacion_pct: 0.01, trayectoria: 'Presidente de Otis EMEA desde octubre de 2023; antes, Ingersoll Rand. Nombrado director de operaciones en enero de 2026; candidato interno natural a la sucesión [5].' },
      { nombre: 'Sally Loh', cargo: 'Presidenta de Otis China', desde: '2023', participacion_pct: 0.01, trayectoria: 'Antes directora financiera y de operaciones de Otis China; lleva la reorganización de 2025 [9].' },
      { nombre: 'Christopher J. Kearney', cargo: 'Consejero coordinador independiente y presidente del comité de sucesión', desde: '2020', participacion_pct: 0.02, trayectoria: 'Antes presidente y consejero delegado de SPX; dirige la búsqueda del nuevo consejero delegado con Spencer Stuart [4].' },
    ],
    historial_guidance: [
      { anio: '2021', guia: 'BPA ajustado de 2,67-2,77 USD', real: '3,01 USD', cumplida: 'Sí' },
      { anio: '2022', guia: 'BPA ajustado de 3,20-3,30 USD', real: '3,17 USD (dólar fuerte)', cumplida: 'No' },
      { anio: '2023', guia: 'BPA ajustado de 3,35-3,50 USD', real: '3,54 USD', cumplida: 'Sí' },
      { anio: '2024', guia: 'BPA ajustado de 3,80-3,90 USD', real: '3,83 USD', cumplida: 'Sí' },
      { anio: '2025', guia: 'BPA ajustado de 4,00-4,10 USD', real: '4,05 USD', cumplida: 'Sí' },
      { anio: '2026', guia: 'BPA ajustado con subida «mid to high single digits» (≈ 4,25-4,40 USD); rebajada a 4,20-4,24 en abril y a 4,01-4,05 en julio', real: 'Pendiente (3T26 el 28-oct)', cumplida: 'No' },
    ],
    comentario: 'Hasta 2025 la dirección cumplió casi siempre su guía de BPA (cuatro de cinco años) [7]. 2026 rompe esa racha: dos rebajas en tres meses, desde un crecimiento de «mid to high single digits» hasta un BPA plano, por costes de servicio que la dirección no anticipó en enero [8]. La sucesión llega en mal momento: Marks se va en el 1S27, con búsqueda interna y externa; Miñarro, director de operaciones desde enero, es el candidato interno visible [4, 5]. La directora financiera lleva dos años. El riesgo es de ejecución en la transición, no de continuidad: el consejo tiene plan y fecha.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Judith F. Marks', cargo: 'Presidenta y consejera delegada', tipo: 'Ejecutivo', desde: '2020', comisiones: 'Ninguna' },
      { nombre: 'Christopher J. Kearney', cargo: 'Consejero coordinador', tipo: 'Independiente', desde: '2020', comisiones: 'Comité de sucesión (presidente)' },
      { nombre: 'Thomas A. Bartlett', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría; Nombramientos y Gobierno' },
      { nombre: 'Jeffrey H. Black', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Jill C. Brannon', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría; Nombramientos y Gobierno' },
      { nombre: 'Nelda J. Connors', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría; Retribuciones' },
      { nombre: 'Kathy Hopinkah Hannan', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'Retribuciones (presidenta)' },
      { nombre: 'Margaret M. V. Preston', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'Nombramientos y Gobierno (presidenta)' },
      { nombre: 'Shelley Stewart, Jr.', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Retribuciones; Nombramientos y Gobierno' },
      { nombre: 'John H. Walker', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Retribuciones' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: r1(131352789 / (131352789 + 202204629 + 1074705) * 100),
    voto_remuneracion_contra_pct: r1(202204629 / (131352789 + 202204629 + 1074705) * 100),
    voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 16.98, fijo: 1.4, variable_corto: 1.97, variable_largo: 13.18, ratio_salario_medio: 286 },
    remuneracion: 'Variable anual: objetivos financieros de la empresa (incluidos pedidos de equipo nuevo y modernización y, desde 2025, el crecimiento neto de la cartera de unidades en vez de las ventas orgánicas) con un multiplicador ESG [1]. Variable a largo plazo: acciones por objetivos (60 % BPA ajustado acumulado de tres años, resto crecimiento orgánico medio) con un multiplicador de 0,8-1,2 por la rentabilidad total relativa; desde 2026, tope del 100 % si la rentabilidad absoluta de tres años es negativa [1]. En 2024 Marks recibió 42,1 M USD con concesiones extraordinarias, y la junta de 2025 rechazó el voto consultivo (39,3 % a favor, 60,4 % en contra); el consejo cambió de asesores y en 2026 el voto se aprobó con un 93,6 % a favor [1, 2, 3]. Ratio frente al empleado medio: 286 veces. Hay cláusulas de recuperación (clawback) [1].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 12.6, tipo: 'Institucional (índices)', variacion: 'Estable; desde enero de 2026 algunas filiales declaran por separado [1].' },
      { nombre: 'BlackRock', pct: 7.0, tipo: 'Institucional', variacion: 'Estable [1].' },
      { nombre: 'Consejeros y directivos (20 personas)', pct: 0.2, tipo: 'Dirección', variacion: 'Ventas en 2026; ninguna compra [1, 6].' },
    ],
    insiders: [
      { fecha: '2026-02-05', persona: 'Judith F. Marks (consejera delegada)', operacion: 'Venta', acciones: 102887, importe: 9.29 },
      { fecha: '2026-02-12', persona: 'Stephane de Montlivault (presidente Asia-Pacífico)', operacion: 'Venta', acciones: 47944, importe: 4.42 },
      { fecha: '2026-02-10', persona: 'Nora E. LaFreniere (directora jurídica)', operacion: 'Venta', acciones: 27418, importe: 2.48 },
      { fecha: '2026-02-02', persona: 'Neil Green (director digital)', operacion: 'Venta', acciones: 6000, importe: 0.52 },
      { fecha: '2026-02-10', persona: 'Michael P. Ryan (controller)', operacion: 'Venta', acciones: 4210, importe: 0.38 },
      { fecha: '2026-05-07', persona: 'Thibault Lefebure (presidente EMEA)', operacion: 'Venta', acciones: 1628, importe: 0.13 },
    ],
    control_y_defensas: 'Sin accionista de control: el mayor es Vanguard (12,6 %) y el resto es capital disperso e institucional [1]. Una acción, un voto; consejo elegido cada año por mayoría [2]. La presidenta del consejo es también consejera delegada, compensado con un consejero coordinador independiente con poderes amplios (aprueba agendas y dirige la sucesión) [1, 4]. Nueve de diez consejeros son independientes; la comisión de auditoría la preside un independiente [1]. Sin operaciones vinculadas relevantes. Con la retirada de Marks el consejo podría separar los cargos; no lo ha decidido [4].',
    alertas: [
      'Voto consultivo de retribución rechazado en 2025 (60,4 % en contra) por las concesiones extraordinarias de 2024; corregido en 2026 (93,6 % a favor) [1, 2, 3].',
      'Retirada de la consejera delegada anunciada el 15-sep-2026 tras dos rebajas de guía; sucesor por nombrar (1S27) [4, 8].',
      'Ventas de directivos por 17,2 M USD en 12 meses (9,3 M de la consejera delegada con plan 10b5-1), casi todas en febrero de 2026 a 86-92 USD; ninguna compra [6].',
      'Un despacho de abogados anunció en octubre de 2026 una investigación por posibles incumplimientos de deberes fiduciarios; sin demanda presentada que conste [10].',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fx = { USD: 1, EUR: Y['EURUSD=X'].precio, CHF: Y['CHFUSD=X'].precio, SEK: Y['SEKUSD=X'].precio, KRW: Y['KRWUSD=X'].precio, JPY: Y['JPYUSD=X'].precio };
// Pesos de los próximos 12 meses a 21-oct-2026: quedan 2,3 meses de 2026 (y 5,3 de un ejercicio a marzo)
const peso = { dic: [2.3 / 12, 9.7 / 12], mar: [5.3 / 12, 6.7 / 12] };
const comp = [
  ['Schindler', 'SCHP.SW', 'SCHP', 'CH', 'dic'], ['KONE', 'KNEBV.HE', 'KNEBV', 'FI', 'dic'], ['Hyundai Elevator', '017800.KS', '017800', 'KR', 'dic'],
  ['ASSA ABLOY', 'ASSA-B.ST', 'ASSA B', 'SE', 'dic'], ['Atlas Copco', 'ATCO-A.ST', 'ATCO A', 'SE', 'dic'], ['Konecranes', 'KCR.HE', 'KCR', 'FI', 'dic'],
  ['Mitsubishi Electric', '6503.T', '6503', 'JP', 'mar'], ['Legrand', 'LR.PA', 'LR', 'FR', 'dic'],
].map(([nombre, y, ticker, pais, cierre]) => {
  const d = Y[y]; const f = fx[d.divisa];
  const t0 = d.trend.find((x) => x.periodo === '0y'), t1 = d.trend.find((x) => x.periodo === '+1y');
  const [w0, w1] = peso[cierre];
  const bpaNtm = w0 * t0.bpa + w1 * t1.bpa, vNtm = w0 * t0.ventas + w1 * t1.ventas;
  const cap = d.cap || (d.ev - d.deuda + d.caja);
  return {
    nombre, ticker, pais, capitalizacion: Math.round(cap * f / 1e6), ev_ventas: r2(d.ev / d.ventas), ev_ebitda_ltm: r1(d.ev / d.ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(d.precio / bpaNtm), crecimiento_pct: r1((Math.pow(vNtm / d.ventas, 12 / 15.7) - 1) * 100), margen_ebitda_pct: r1(d.margen_ebitda * 100),
    roic_pct: null, dn_ebitda: r1((d.deuda - d.caja) / d.ebitda), fcf_yield_pct: r1(d.fcf / cap * 100),
  };
});
const pers = comp.map((c) => c.per_ntm).sort((a, b) => a - b);
const medPer = (pers[3] + pers[4]) / 2;
const O = Y.OTIS;
const cierres = Object.fromEntries(B.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const fD = [
  { id: 1, titulo: 'Históricos diarios de OTIS, SPY y XLI hasta el 20-oct-2026 (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/OTIS/history' },
  { id: 2, titulo: 'Otis y comparables: consenso de BPA y ventas, objetivos, recomendaciones, valor empresa, EBITDA (quoteSummary, 21-oct-2026 14:44 UTC)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/OTIS/analysis' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Form 10-Q del 2T26: acciones en circulación (380,7 M el 15-jul-2026), deuda y caja a 30-jun-2026', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2026-07-23', url: `${ED}/000178133526000113/otis-20260630.htm` },
  { id: 6, titulo: 'Otis Third Quarter 2026 Earnings Advisory (resultados el 28-oct-2026)', editor: 'Otis Worldwide Corporation (PR Newswire, copia en Finviz)', tipo: 'Primaria', fecha: '2026-10-07', url: 'https://finviz.com/news/399693/otis-third-quarter-2026-earnings-advisory' },
  { id: 7, titulo: 'Otis Worldwide stock forecast (objetivo medio de 86,54 USD, 15 analistas, S&P Global)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://stockanalysis.com/stocks/otis/forecast/' },
  { id: 8, titulo: 'KONE: análisis value del 18-oct-2026 (transacciones KONE-TKE, Advent-TKE y ASSA-HHI con sus fuentes oficiales)', editor: 'Repositorio de análisis (informes/kone-2026-10-18)', tipo: 'Analistas', fecha: '2026-10-18', url: 'informes/kone-2026-10-18/' },
  { id: 9, titulo: 'Form 10-K 2025 (compra de los minoritarios de Otis Electric) y 10-Q 2T26 (WeMaintain)', editor: 'Otis Worldwide Corporation (SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000178133526000011/otis-20251231.htm` },
  { id: 10, titulo: 'Movimiento del precio (herramientas/movimiento.mjs OTIS, 21-oct-2026)', editor: 'Yahoo Finance (históricos diarios)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/OTIS/history' },
  { id: 11, titulo: 'Noticias de 12 meses de Otis clasificadas (herramientas/noticias.mjs): Morgan Stanley inicia con «mantener» y 75 USD (20-oct), Wells Fargo «infraponderar» 77 USD (25-sep), investigación de un despacho (8-oct)', editor: 'Varios (Moomoo, Pluang, Reuters, CNBC)', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://www.moomoo.com/news/' },
  { id: 12, titulo: 'Otis Took Another Guidance Cut—But the Story Isn\'t Over', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://www.marketbeat.com/articles/otis-took-another-guidance-cutbut-the-story-isnt-over/' },
  { id: 13, titulo: 'Titulares de Seeking Alpha sobre OTIS (RSS): resultados, guía y retirada de la consejera delegada', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/OTIS.xml' },
  { id: 14, titulo: 'Otis Reports Second Quarter 2026 Results / First Quarter 2026 Results', editor: 'Otis Worldwide Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-22', url: `${ED}/000178133526000110/a2026-06x308xkerexhibit99.htm` },
];
const id = B.identificacion;
const D = {
  _estado: 'Completa (analista).',
  _per_mediana_comparables: medPer,
  identificacion: {
    nombre: 'Otis Worldwide Corporation', nombre_corto: 'Otis', ticker: 'OTIS', isin: 'US68902V1070', mercado: 'Bolsa de Nueva York (NYSE)', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Maquinaria (ascensores y escaleras mecánicas)', sede: 'Farmington (Connecticut)', fundacion: '1853', empleados: 72000, web: 'https://www.otis.com',
    precio: id.precio, fecha_precio: id.fecha_precio, acciones: 381.6, capitalizacion_publicada: Math.round(O.cap / 1e6), free_float_pct: 99.8,
    max_52s: id.max_52s, min_52s: id.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'Guía de 2026 (22-jul-2026): ventas de 15.100-15.300 M USD, crecimiento orgánico «low to mid single digits» (equipo nuevo de −bajo a plano, servicio «mid to high single digits»), beneficio operativo ajustado de unos 2.400 M (−30 M a plano a tipos reales), BPA ajustado de 4,01-4,05 USD y FCF ajustado de 1.500-1.550 M [14]. Es la segunda rebaja: en enero preveía un BPA con subida de «mid to high single digits» y un beneficio operativo de 2.500-2.600 M, y en abril 4,20-4,24 USD [14]. Para el 3T26 la empresa anticipó beneficio operativo plano y BPA a la baja; para el 4T, vuelta al crecimiento con margen de servicio ≈ 25 %. Sin guía de 2027 ni objetivos a medio plazo vigentes [14].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(O.trend.find((x) => x.periodo === '0y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(O.trend.find((x) => x.periodo === '0y').bpa), dpa: null, fuente: `Yahoo Finance, ${O.trend.find((x) => x.periodo === '0y').n} analistas [2]` },
      { periodo: '2027e', ingresos: Math.round(O.trend.find((x) => x.periodo === '+1y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(O.trend.find((x) => x.periodo === '+1y').bpa), dpa: null, fuente: `Yahoo Finance, ${O.trend.find((x) => x.periodo === '+1y').n} analistas [2]` },
    ],
    recomendaciones: { n_analistas: 15, comprar: 7, mantener: 7, vender: 1, po_medio: r2(O.po_medio), po_min: O.po_min, po_max: O.po_max },
    revisiones: `Recortes: el BPA de 2026 del consenso bajó de ${r2(O.trend.find((x) => x.periodo === '0y').bpa_hace90)} USD hace 90 días a ${r2(O.trend.find((x) => x.periodo === '0y').bpa)} y el de 2027 de ${r2(O.trend.find((x) => x.periodo === '+1y').bpa_hace90)} a ${r2(O.trend.find((x) => x.periodo === '+1y').bpa)}, por la rebaja de guía de julio [2]. Los objetivos también bajan: Bernstein de 97 a 90 USD y Evercore de 100 a 95 (23-jul), Wells Fargo inicia con «infraponderar» y 77 USD (25-sep) y Morgan Stanley con «mantener» y 75 USD (20-oct) [2, 11]. Stock Analysis da el mismo objetivo medio (86,54 USD, 15 analistas) [7]. Solo una fuente gratuita (Yahoo) con estimaciones; sin consenso gratuito de 2028.`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    tramo_drawdown: undefined,
    posicion_corta_pct: r1(O.corto_pct * 100),
    comentario: 'Otis lleva cinco años por detrás del mercado: −1,7 % anual en cinco años frente a +12,7 % del S&P 500 (SPY) y +11,5 % de los industriales (XLI), con dividendos [1]. Tras la separación cotizó con prima por su servicio recurrente (PER de 27,5 veces el beneficio del año siguiente a finales de 2021); desde entonces la caída del equipo nuevo en China le ha quitado crecimiento y el mercado ha dejado de pagar la prima. En 2026 cae un 16,1 % en el año por las dos rebajas de guía (abril y julio), la retirada de la consejera delegada (septiembre) y la caída del margen de servicio; tocó un mínimo de 63,58 USD el 2-oct-2026, el más bajo desde 2020 [1, 14]. Caída máxima del 37,2 % desde octubre de 2024. Beta de 0,90 (mensual, 5 años) y volatilidad del 22 % [1].',
    contexto: {
      movimiento: { fecha: '2026-10-21', var_1m_pct: 5.6, var_3m_pct: 1.6, var_6m_pct: -7.7, var_12m_pct: -21.4, dist_max_52s_pct: -23.2, dist_min_52s_pct: 12.3, dist_max_historico_pct: -32.2, tendencia: 'bajista', volatilidad_60d_pct: 22, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'mar-2026', var_pct: -6.7, causa: 'Caída de un día (18-mar) dentro de la corrección de marzo; la prensa la relaciona con rebajas de analistas y la presión técnica tras los resultados de enero; causa concreta no confirmada en tres búsquedas (8-K, Seeking Alpha, prensa) [11, 13].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr-may 2026', var_pct: -12.6, causa: 'Resultados del 1T26 (22-abr): BPA de 0,89 USD por debajo de lo esperado, margen de servicio −160 pb, guía rebajada a 4,20-4,24, conflicto de Oriente Medio; Wolfe rebaja a «neutral» (8-abr) y Barclays y Wells Fargo bajan objetivos [2, 13, 14].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-oct 2026', var_pct: -14.0, causa: 'Segunda rebaja de guía (22-jul: BPA 4,01-4,05), retirada de la consejera delegada (15-sep) y nuevas coberturas negativas (Wells Fargo «infraponderar», 25-sep); mínimo de 63,58 USD el 2-oct [2, 11, 14].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct-2026', var_pct: 12.3, causa: 'Rebote desde el mínimo del 2-oct hasta 72,07 USD el 20-oct sin noticia de la empresa; coincide con compras de fondos de dividendos (ClearBridge entra en el 3T) y con la cercanía de los resultados; causa concreta no encontrada [13].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-28', tipo: 'resultados', hecho: 'Resultados del 3T26 el 28-oct-2026 antes de la apertura; la empresa anticipó beneficio operativo plano y BPA a la baja en el trimestre [6, 14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-20', tipo: 'recomendación', hecho: 'Morgan Stanley inicia cobertura con «mantener» y objetivo de 75 USD [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-08', tipo: 'demanda o regulador', hecho: 'Un despacho de abogados anuncia una investigación por posibles incumplimientos de deberes fiduciarios (habitual tras caídas; sin demanda presentada) [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-25', tipo: 'recomendación', hecho: 'Wells Fargo inicia con «infraponderar» y 77 USD [2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-15', tipo: 'directivos', hecho: 'Judith Marks se retirará como consejera delegada y presidenta en el 1S27; búsqueda interna y externa con Spencer Stuart [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-22', tipo: 'resultados', hecho: 'Segunda rebaja de la guía de 2026 (BPA 4,01-4,05 USD; FCF 1.500-1.550 M) por costes de servicio y retención [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-02-05', tipo: 'directivos', hecho: 'Ventas de directivos en febrero a 86-92 USD: la consejera delegada 9,3 M (plan 10b5-1), el presidente de Asia-Pacífico 4,4 M y la directora jurídica 2,5 M; ninguna compra en 12 meses [6 de la nota C].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-28',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción cae un 21 % en 12 meses y está un 23 % bajo su máximo de 52 semanas, con tendencia bajista (bajo la media de 200 sesiones) y un rebote del 12 % desde el mínimo del 2-oct [10]. Las causas están en el informe: dos rebajas de guía por el margen de servicio, China y la sucesión. No hay ningún hecho pendiente ajeno al análisis que pueda mover el precio más de un 5 % en contra (sin colocaciones, ampliaciones ni ofertas); los resultados del 28-oct no aplazan una decisión (regla 11). Las ventas de directivos fueron en febrero, a precios de 86-92 USD, tras la entrega de acciones, y la de la consejera delegada con plan 10b5-1: no son una señal de que «vende quien mejor conoce» a precios de hoy. Veredicto global: no cambia.',
    },
  },
  multiplos_historicos: {
    serie: ['2020', '2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cierres[a], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Precio de cierre de cada año de Yahoo (OTIS cotiza desde el 3-abr-2020; 2019 no tiene precio) [1]. Con el BPA ajustado del año siguiente, el PER adelantado fue de 22,4 veces a finales de 2020, 27,5 en 2021, 22,1 en 2022, 23,4 en 2023, 22,9 en 2024 y 21,6 en 2025; hoy, con nuestro BPA de los próximos 12 meses, ronda las 16 veces. El descuento frente a su historia es grande y tiene causas: el crecimiento del BPA se ha frenado (plano en 2026), el margen de servicio baja, el equipo nuevo en China sigue cayendo y la deuda neta es de unas 3 veces el EBITDA. El mercado ha pasado de pagar a Otis como «servicio puro» a pagarla como industrial cíclico; KONE y Schindler, con caja neta y más crecimiento esperado, cotizan a 22-23 veces [2].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Los dos grandes de ascensores cotizados (KONE y Schindler) y el coreano Hyundai Elevator, que son los comparables puros; ASSA ABLOY (puertas y accesos con mucho servicio), Legrand (equipamiento eléctrico de edificios), Atlas Copco y Konecranes (bienes de equipo con base instalada y servicio recurrente) y Mitsubishi Electric (número uno en Japón y fuerte en China, pero conglomerado). Fuera: TKE (no cotiza), Fujitec (excluida de bolsa por EQT), Hitachi (ascensores pequeños dentro del grupo). Datos de Yahoo del 21-oct-2026 a las 14:44 UTC [2], convertidos a USD con sus tipos del momento: valor empresa y EBITDA de los últimos 12 meses publicado (no ajustado); PER de los próximos 12 meses = precio ÷ (2,3/12 del BPA de 2026e + 9,7/12 del de 2027e; Mitsubishi, ejercicio a marzo: 5,3/12 y 6,7/12); crecimiento = ventas de los próximos 12 meses frente a las de los últimos 12, anualizado a 15,7 meses (incluye divisa). Sin EV/EBITDA adelantado: Yahoo no da EBITDA estimado. Hyundai Elevator tiene muy pocos analistas: frágil.',
    empresas: comp,
    comentario: `La mediana del PER de los próximos 12 meses de los comparables es de ${String(r1(medPer)).replace('.', ',')} veces; Otis cotiza a unas 16 veces su propio BPA (15,9 con el consenso de Yahoo) [2]. Frente a KONE (${String(comp[1].per_ntm).replace('.', ',')}x) y Schindler (${String(comp[0].per_ntm).replace('.', ',')}x), el descuento es de unas 6-7 veces. Se justifica en parte: Otis tiene deuda neta de unas 3 veces el EBITDA cuando KONE y Schindler tienen caja, y su BPA de 2026 no crece. No se justifica por la calidad: su margen EBITDA (17,7 %) es el más alto de los ascensores y su servicio pesa lo mismo (65 %). Usaríamos el PER, no el EV/EBITDA, porque el EBITDA de Yahoo mezcla bases; el de valor empresa sí recoge la deuda de Otis. El descuento frente a los suyos es, en buena parte, la tesis.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-04', objetivo: 'TK Elevator (TKE)', comprador: 'KONE', ev: Math.round(29400 * fx.EUR), ev_ventas: 3.19, ev_ebitda: 18.2, prima_pct: null, excluir: false, comentario: '29.400 M EUR de valor empresa (convertidos a USD al tipo de hoy) sobre las ventas (9.230 M EUR) y el EBITDA ajustado (1.617 M EUR) del ejercicio a sep-25 de TKE; con el EBITDA publicado, 20,2 veces. Sin sinergias [8].' },
      { fecha: '2020-02', objetivo: 'thyssenkrupp Elevator Technology', comprador: 'Advent, Cinven y fundación RAG', ev: Math.round(17200 * fx.EUR), ev_ventas: 2.16, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '17.200 M EUR; ventas de 7.960 M EUR y EBIT ajustado de 907 M en 2018/19 (19,0 veces el EBIT ajustado); EBITDA no publicado [8].' },
      { fecha: '2021-09', objetivo: 'Hardware and Home Improvement (Spectrum Brands)', comprador: 'ASSA ABLOY', ev: 4300, ev_ventas: 3.2, ev_ebitda: 14.0, prima_pct: null, excluir: false, comentario: '4.300 M USD; 14 veces el EBITDA ajustado esperado. Accesos residenciales, no ascensores: referencia de lo que se paga por negocios de edificios con marca [8].' },
      { fecha: '2025-10', objetivo: 'Minoritarios de Otis Electric (China)', comprador: 'Otis', ev: 215, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '215 M USD por la parte minoritaria; múltiplo no publicado [9].' },
      { fecha: '2026-04', objetivo: 'WeMaintain (participación mayoritaria)', comprador: 'Otis', ev: 170, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Mantenimiento digital en Francia; 170 M USD con 142 M de fondo de comercio; múltiplo no publicado [9].' },
    ],
    comentario: 'Las dos operaciones grandes del sector se han pagado caras: 18,2 veces el EBITDA ajustado (KONE por TKE, 2026) y unas 19 veces el EBIT ajustado (Advent por TKE, 2020) [8]. Otis cotiza a unas 13,5 veces su EBITDA de los últimos 12 meses [2], un 25 % por debajo del precio de control de TKE. Una oferta por Otis es improbable por tamaño (35.000 M USD de valor empresa) y competencia: KONE ya está comprando TKE y la unión de cualquiera de los grandes con Otis no pasaría los reguladores. Las transacciones son referencia de valor, no catalizador; por eso pesan poco.',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'consenso', campo: 'estimaciones de 2028e', tipo: 'Complemento', intentos: '1) Yahoo (solo 2026 y 2027); 2) MarketScreener (WebFetch no abre la página de finanzas); 3) Stock Analysis (2027 y 2028 de pago)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'causa de la caída del 18-mar-2026 y del rebote de octubre', tipo: 'Complemento', intentos: '1) 8-K de marzo y octubre (no hay); 2) titulares de Seeking Alpha (nada ese día); 3) búsquedas de prensa (solo atribuciones genéricas)', decision: 'Omitido' },
  ],
  fuentes: fD,
};
delete D.bolsa.tramo_drawdown;
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $OTIS (30 mensajes, 15-ago a 18-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-18', url: 'https://api.stocktwits.com/api/2/streams/symbol/OTIS.json' },
  { id: 2, titulo: 'Seeking Alpha: titulares y artículos de opinión sobre OTIS (abril-octubre de 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/symbol/OTIS/analysis' },
  { id: 3, titulo: 'Otis Took Another Guidance Cut—But the Story Isn\'t Over', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-07-23', url: 'https://www.marketbeat.com/articles/otis-took-another-guidance-cutbut-the-story-isnt-over/' },
];
const E = {
  _estado: 'Completa (analista). Reddit no abre; Stocktwits por la API y Seeking Alpha por el RSS.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($OTIS)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Diez mensajes marcados alcistas y uno bajista, pero muchos sin marcar hablan de «trampa de valor», «dinero muerto» y mínimos de cuatro años en septiembre; en octubre aparecen compras iniciales con la tesis de «franquicia de servicio a precio deprimido» [1].' },
      { plataforma: 'Seeking Alpha (artículos)', fecha: '2026-09', n_comentarios: 8, tono: 'Dividido', resumen: 'Artículos alcistas («dupliqué tras caer un 22 %», «potencial difícil de ignorar») frente a escépticos («el servicio es fuerte pero la deuda importa», «falta ver la expansión de margen», «¿se justifica la prima?») [2].' },
      { plataforma: 'MarketBeat (artículo y comentarios)', fecha: '2026-07', n_comentarios: 3, tono: 'Neutro', resumen: 'Tras la segunda rebaja de guía, la lectura es que la historia de servicio sigue, pero el mercado no pagará hasta ver el margen [3].' },
    ],
    temas: [
      { tema: 'Trampa de valor o franquicia barata', postura: 'Dividida', peso: 'Alto', contraste: 'El PER de ≈ 16 veces es el más bajo de su historia y de los grandes del sector; los datos apoyan que la franquicia sigue (servicio +9 % orgánico en el 2T26), pero el beneficio de 2026 no crece [1, 2].' },
      { tema: 'Margen de servicio y retención de clientes', postura: 'Bajista', peso: 'Alto', contraste: 'Correcto: margen −170 pb en el 2T26 y retención a la baja en América; la dirección promete ≈ 25 % en el 4T, que es el dato a vigilar el 28-oct [2, 3].' },
      { tema: 'Deuda y recompras', postura: 'Bajista', peso: 'Medio', contraste: 'Deuda neta ≈ 3 veces el EBITDA y patrimonio negativo por recompras; el riesgo es de flexibilidad, no de solvencia (grado de inversión) [2].' },
      { tema: '«La IA no sustituye a un ascensor»', postura: 'Alcista', peso: 'Bajo', contraste: 'Cierto para el producto; la IA toca el mantenimiento y los precios, donde Otis la usa y donde puede dar armas a independientes digitales [1].' },
    ],
    lectura: 'El sentimiento de los particulares pasó de la capitulación de septiembre («dinero muerto», mínimos de cuatro años) a compras iniciales en octubre, y los autores de Seeking Alpha están divididos entre «franquicia barata» y «trampa de valor» [1, 2]. Los analistas también están partidos (7 comprar, 7 mantener, 1 vender) y con objetivos a la baja. No hay euforia que temer; la preocupación dominante, el margen de servicio, es la misma que la del informe. No aporta ningún riesgo nuevo. Opiniones, no datos: ninguna cifra sale de aquí.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', r1(medPer), comp.map((c) => `${c.nombre} ${c.per_ntm}`).join(' · '));

// Escribe las notas A-E de Stryker (corte 2026-10-14). Ejecutar: node informes/stryker-2026-10-14/notas/construir-notas.mjs
// A parte del XBRL de la SEC (cuentas-xbrl.json) corregido con la nota de deuda del 10-K (deuda = largo + corto + papel comercial)
// y el patrimonio de 2019-2025 (el XBRL solo lo da hasta 2018).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { nota } from './fuentes.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (l, o) => fs.writeFileSync(path.join(dir, `${l}.json`), JSON.stringify(o, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));

// ---------------------------------------------------------------- A. Cuentas
{
  const { fuentes, c } = nota(['k10', 'xbrl', 'q2pr', 'q10', 'q1pr', 'q4pr25', 'q4pr22', 'q4pr21', 'q4pr19', 'q4pr17', 'cyb1', 'cyb2', 'inari', 'cmr', 'seg']);
  const imp = { 2018: 14, 2019: 16, 2020: 215, 2021: 264, 2022: 270, 2023: 36, 2024: 977, 2025: 170 }; // «Goodwill and other impairments» (AssetImpairmentCharges)
  const dpa = { 2016: 1.565, 2017: 1.745, 2018: 1.93, 2019: 2.135, 2020: 2.355, 2021: 2.585, 2022: 2.835, 2023: 3.05, 2024: 3.24, 2025: 3.4 }; // declarado por año
  const cuenta = X.financieros.cuenta.map((r) => ({
    periodo: r.periodo, ingresos: r.ingresos, coste_ventas: r.coste_ventas, gastos_generales: r.gastos_generales,
    ebitda: r.ebitda, amortizaciones: r.amortizaciones, ebit: r.ebit, resultado_financiero: r.resultado_financiero, bai: r.bai,
    impuestos: r.impuestos, minoritarios: 0, beneficio_neto: r.beneficio_neto, gastos_financieros: r.gastos_financieros,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: imp[r.periodo] ?? null, bpa: r.bpa, dpa: dpa[r.periodo], dpa_extraordinario: 0, acciones_diluidas: r.acciones_diluidas,
  }));
  const deudaCorta = { 2016: 228, 2017: 632, 2018: 1373, 2019: 859, 2020: 761, 2021: 7, 2022: 1191, 2023: 2094, 2024: 1409, 2025: 1000 };
  const pn = { 2019: 12807, 2020: 13084, 2021: 14877, 2022: 16616, 2023: 18593, 2024: 20634, 2025: 22420 };
  const ap = { 2016: 437, 2017: 487, 2018: 646, 2019: 675, 2020: 810, 2021: 1129, 2022: 1413, 2023: 1517, 2024: 1679, 2025: 1799 };
  const balance = X.balance.historico.map((r) => ({
    periodo: r.periodo, activo_total: r.activo_total, activo_corriente: r.activo_corriente, pasivo_corriente: r.pasivo_corriente, pasivo_total: r.pasivo_total,
    fondo_comercio: r.fondo_comercio, intangibles: r.intangibles, inmovilizado_material: r.inmovilizado_material, existencias: r.existencias, clientes: r.clientes,
    proveedores: ap[r.periodo], activos_contrato: null, pasivos_contrato: null, caja: r.caja,
    deuda_financiera: r.deuda_financiera + deudaCorta[r.periodo], arrendamientos: 0,
    patrimonio_neto: r.patrimonio_neto ?? pn[r.periodo], minoritarios: 0, reservas: r.reservas,
  }));
  const flujos = X.flujos.historico.map((r) => ({
    periodo: r.periodo, flujo_operativo: r.flujo_operativo, capex: r.capex, pagos_arrendamientos: 0, adquisiciones: r.adquisiciones,
    desinversiones: 0, dividendos: r.dividendos, recompras: r.recompras ?? 0, emision_acciones: 0, intereses_en_financiacion: 0,
  }));
  const A = {
    _estado: 'completa',
    financieros: {
      cuenta,
      ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 25837, ebitda: 7132, ebit: 5534, beneficio_neto: 3729, bpa: 9.65, dpa: 3.52, dpa_extraordinario: 0, fcf: 4702, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 81 },
      cambios_perimetro: [
        { periodo: '2025', descripcion: 'Inari Medical, consolidada desde el 19-feb-2025 (4.810 M USD netos de caja; ≈600 M USD de ventas anuales); venta de Spinal Implants a VB Spine en abril de 2025 (≈0,7 % de las ventas).' },
        { periodo: '2020', descripcion: 'Wright Medical, consolidada desde noviembre de 2020 (≈5.400 M USD de valor empresa): entra en balance con dos meses de cuenta.' },
      ],
      comentario: `Las ventas pasan de 11.325 M USD en 2016 a 25.116 M en 2025 (TCAC del 9,3 %), con el orgánico casi siempre entre el 8 y el 11 % (10,3 % en 2025, con 9,9 puntos de volumen y 0,4 de precio) ${c('q4pr25')}. El resto son compras: Wright Medical (2020), Vocera (2022) e Inari (2025), y salidas como Spinal Implants (2025) ${c('k10')}. El margen operativo ajustado de la empresa subió 100 pb en 2024 y otros 100 pb en 2025, hasta el 26,3 %, por volumen, precio y control del gasto general ${c('q4pr25')}. El EBIT publicado oscila más (16,3 % en 2024, 19,5 % en 2025) por deterioros (977 M en 2024 por el negocio de columna), amortización de intangibles comprados (732 M en 2025) y costes de integración ${c('k10')}. 2026 está distorsionado: el ciberataque de marzo paró pedidos, fábricas y envíos (orgánico del 1T26 del 2,4 %) y el 2T26 recuperó (9,0 %), con una reversión de aranceles de 2025 de 158 M en el coste de ventas ${c('cyb2', 'q1pr', 'q2pr')}.`,
      ajustes: `Usamos las cifras contables en la cuenta (BPA diluido publicado: 8,40 USD en 2025) y el BPA ajustado de la empresa para el objetivo a 12 meses, porque es la base del consenso y de los comparables (13,63 USD en 2025). La diferencia de 2025 (5,23 USD) son amortización de intangibles comprados (1,49), impuestos por traspasos de propiedad intelectual (1,71), integración de Inari y revalorización de existencias (1,12), reestructuración (0,37), deterioros (0,31) y retiradas y regulación (0,23) ${c('k10')}. Los deterioros de cada año van en no recurrentes del EBITDA. La reestructuración y los costes de integración se repiten todos los años (1,5-3 % de las ventas): no son no recurrentes y los restamos también en el DCF. 2018 lleva un beneficio fiscal de 1.197 M (traspasos de propiedad intelectual): BPA de 9,34 USD no repetible.`,
      confianza: 'Alta',
    },
    trimestres: {
      items: [
        { periodo: '1T25', ingresos: 5866, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.84, vs_consenso: null },
        { periodo: '2T25', ingresos: 6022, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.13, vs_consenso: null },
        { periodo: '3T25', ingresos: 6057, crecimiento_pct: 10.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.19, vs_consenso: null },
        { periodo: '4T25', ingresos: 7171, crecimiento_pct: 11.4, crecimiento_organico_pct: 11.0, ebitda: null, margen_ebitda_pct: null, bpa: 4.47, vs_consenso: null },
        { periodo: '1T26', ingresos: 6020, crecimiento_pct: 2.6, crecimiento_organico_pct: 2.4, ebitda: null, margen_ebitda_pct: null, bpa: 2.6, vs_consenso: null },
        { periodo: '2T26', ingresos: 6589, crecimiento_pct: 9.4, crecimiento_organico_pct: 9.0, ebitda: null, margen_ebitda_pct: null, bpa: 3.69, vs_consenso: 'Superior' },
      ],
      ultima_presentacion: `En enero la dirección prometió crecer «en la parte alta de la tecnología médica» en 2026: orgánico del 8-9,5 % y BPA ajustado de 14,90-15,10 USD ${c('q4pr25')}. El ciberataque del 11 de marzo (sin rescate ni programa malicioso, según la empresa) paró pedidos, fabricación y envíos hasta comienzos de abril ${c('cyb1', 'cyb2')}; el 1T26 creció un 2,4 % orgánico, el margen operativo ajustado bajó 180 pb al 21,1 % y el BPA ajustado cayó un 8,5 %, pero la guía se mantuvo ${c('q1pr')}. En el 2T26 el orgánico volvió al 9,0 %, el margen ajustado subió 170 pb al 27,4 % y la guía se estrechó a 8,3-9,3 % y 14,95-15,10 USD ${c('q2pr')}. Lo que no cuadra: Vascular cayó un 6,7 % en EE. UU. por un problema de suministro en vascular periférico (Inari), y la reversión de aranceles de 158 M y el coste del ciberataque hacen que el margen del semestre (24,4 % ajustado) no sea limpio ${c('q2pr', 'q10')}. La guía exige un segundo semestre con un orgánico de ≈12 % sobre una base fácil.`,
      confianza: 'Alta',
    },
    balance: {
      historico: balance,
      vencimientos: [
        { anio: '2026', importe: 1000 }, { anio: '2027', importe: 1379 }, { anio: '2028', importe: 1998 }, { anio: '2029', importe: 1683 },
        { anio: '2030', importe: 2548 }, { anio: '2031', importe: 876 }, { anio: '2032+', importe: 6375 },
      ],
      liquidez: `Caja e inversiones líquidas de 3.476 M USD a 30-jun-2026 más una línea de crédito no dispuesta de 3.000 M USD hasta febrero de 2030; papel comercial dispuesto de 250 M ${c('q10', 'k10')}`,
      rating: 'Grado de inversión (la empresa no da la nota en el 10-Q; hueco registrado)',
      coste_deuda_pct: 4.1, vida_media_anios: 8.0,
      otros_pasivos: `Contraprestación contingente de compras de 756 M USD a 30-jun-2026 (518 M a cierre de 2025; 271 M de AVS, comprada en mayo de 2026 por 435 M más hitos de hasta 400 M) ${c('q10')}: la tratamos como deuda en el puente. Arrendamientos operativos de 501 M (US GAAP: su coste ya está en el EBITDA, no van al puente). Provisiones por retiradas de productos (prótesis de cadera Rejuvenate y ABG II) y litigios con cargos anuales de 17-58 M en 2023-2025 ${c('k10')}. Sin pensiones relevantes ni factoring. La compra de CMR Surgical (≈400 M en acciones preferentes con opción de compra del 100 %) se anunció el 12-oct-2026 y aún no ha cerrado ${c('cmr')}.`,
      comentario: `La deuda bruta sube con cada compra grande y baja después: 13.991 M en 2020 (Wright), 12.995 M en 2023, 15.859 M en 2025 (Inari, financiada con 3.000 M de bonos en febrero de 2025) y 14.942 M en junio de 2026 tras amortizar 1.000 M ${c('k10', 'q10')}. Deuda neta de ≈11.470 M a junio, 1,6 veces el EBITDA ajustado de 2025 (7.064 M). El circulante comercial es alto para el sector (≈30 % de las ventas: existencias de 5.521 M, 245 días de coste de ventas), por los juegos de implantes en consigna en hospitales; es la partida que más caja consume al crecer. El fondo de comercio (19.291 M) y los intangibles (5.681 M) son el 52 % del activo: el ROIC publicado los incluye.`,
      confianza: 'Alta',
    },
    flujos: {
      historico: flujos,
      comentario: `El flujo operativo pasa de 1.915 M en 2016 a 5.044 M en 2025 y el capex en inmovilizado se mantiene en el 2,5-3,4 % de las ventas (761 M en 2025) ${c('xbrl', 'k10')}. Caja libre de 4.283 M en 2025 (0,81 veces el BPA ajustado por acción × acciones). En diez años Stryker ha gastado 22.488 M en compras y 9.191 M en dividendos, y solo 850 M en recompras (ninguna desde 2020) ${c('xbrl')}. Los años con poca conversión (2017, 2022) coinciden con pagos de impuestos por traspasos de propiedad intelectual y con acumulación de existencias. El capex de mantenimiento no se publica; estimación propia: ≈2 % de las ventas (la depreciación es el 1,8 %). Los sistemas Mako se venden o se ceden con contratos de uso; la empresa no separa los traspasos de existencias a inmovilizado, así que el capex del DCF va algo por encima del histórico.`,
      confianza: 'Alta',
    },
    calidad: {
      auditor: 'Ernst & Young LLP', anios_auditor: null, opinion: 'Favorable (sin salvedades); control interno efectivo con Inari excluido en 2025',
      comentario: `Las cuentas son limpias pero con muchos ajustes: el BPA ajustado de 2025 (13,63 USD) es 1,6 veces el publicado (8,40) ${c('k10')}. La amortización de intangibles comprados (1,49 USD) es un coste real en un comprador en serie, y la reestructuración «estructural» aparece todos los años (138-191 M en 2023-2025). La mitad del ajuste de 2025 es fiscal: 660 M por traspasos de propiedad intelectual entre países, que en 2018 dieron un beneficio de 1.197 M y que vuelven en 2026 (75 M en el semestre) ${c('k10', 'q2pr')}. Pagos en acciones de 243 M (1 % de las ventas). La reversión de 158 M de aranceles de 2025 en el 2T26 se excluye del ajustado, lo que es coherente. Los indicadores del motor (Altman, Piotroski, Beneish) se leen con el cambio de perímetro de 2025.`,
      senales: [
        { senal: 'Diferencia grande entre BPA ajustado y publicado', nivel: 'Media', comentario: 'Ajustes de 5,23 USD por acción en 2025; parte se repite cada año (reestructuración, integración).' },
        { senal: 'Tipo fiscal muy variable por traspasos de propiedad intelectual', nivel: 'Media', comentario: 'Tipo efectivo del −51 % en 2018, 28,1 % en 2025; el ajustado es del 15 %.' },
        { senal: 'Debilidad de control interno por el ciberataque', nivel: 'Baja', comentario: 'Los sistemas se restauraron desde copias; el 10-Q no informa de debilidad material.' },
      ],
      confianza: 'Media',
    },
    negocio: {
      segmentos: [
        { nombre: 'MedSurg y Neurotecnología', descripcion: 'Instrumental y navegación, endoscopia, camas y equipos de emergencia, neurovascular y vascular periférico (Inari), neurocirugía craneal.', tipo_resultado: 'EBIT', historico: [
          { periodo: '2023', ingresos: 12163, resultado: 3466 }, { periodo: '2024', ingresos: 13518, resultado: 4001 }, { periodo: '2025', ingresos: 15647, resultado: 4678 } ] },
        { nombre: 'Ortopedia', descripcion: 'Prótesis de rodilla y cadera, traumatología y extremidades, Ortho Tech (robot Mako, motores y accesorios de corte).', tipo_resultado: 'EBIT', historico: [
          { periodo: '2023', ingresos: 8335, resultado: 2267 }, { periodo: '2024', ingresos: 9077, resultado: 2587 }, { periodo: '2025', ingresos: 9469, resultado: 2822 } ] },
      ],
      geografias: [{ nombre: 'Estados Unidos', peso_pct: 75.7 }, { nombre: 'Resto del mundo', peso_pct: 24.3 }],
      geografias_criterio: 'origen',
      kpis: [
        { kpi: 'Crecimiento orgánico del grupo', valor_anterior: '9,7 % (2024)', valor_actual: '10,3 % (2025)', variacion: '+0,6 pp', comentario: `9,9 pp de volumen y 0,4 de precio ${c('q4pr25')}` },
        { kpi: 'Ventas de rodilla (2T26)', valor_anterior: '640 M USD', valor_actual: '693 M USD', variacion: '+8,0 % a tipo constante', comentario: `Arrastre de Mako ${c('q2pr')}` },
        { kpi: 'Ventas de Ortho Tech, incluido Mako (2T26)', valor_anterior: '649 M USD', valor_actual: '717 M USD', variacion: '+10,0 % a tipo constante', comentario: `Otros de ortopedia (Mako) 194 M frente a 148 M ${c('q2pr')}` },
        { kpi: 'Vascular en EE. UU. (2T26)', valor_anterior: '268 M USD', valor_actual: '250 M USD', variacion: '−6,7 %', comentario: `Problema de suministro en vascular periférico (Inari) ${c('q2pr')}` },
        { kpi: 'Margen operativo ajustado', valor_anterior: '25,3 % (2024)', valor_actual: '26,3 % (2025)', variacion: '+100 pb', comentario: `Segundo año seguido con +100 pb ${c('q4pr25')}` },
        { kpi: 'Empleados', valor_anterior: '53.000', valor_actual: '56.000', variacion: '+5,7 %', comentario: `${c('k10')}` },
      ],
    },
    huecos: [
      { seccion: 'trimestres', campo: 'crecimiento y consenso de 1T25-3T25', tipo: 'Complemento', intentos: '1) notas de prensa trimestrales de 2025 no descargadas por tiempo; 2) XBRL trimestral sin el año anterior; 3) prensa: sin cifras primarias', decision: 'Omitido' },
      { seccion: 'negocio', campo: 'segmentos 2021-2022 con la segmentación vigente', tipo: 'Complemento', intentos: '1) 10-K 2025 (solo 2023-2025); 2) 8-K de 26-jun-2026 (reexpresa trimestres 2023-2025); 3) 10-K anteriores con Ortopedia y Columna juntas, no comparables', decision: 'Omitido' },
    ],
    fuentes,
  };
  guarda('A', A);
}

// ---------------------------------------------------------------- B. Sector y competencia
{
  const { fuentes, c } = nota(['fbi', 'gmi', 'mm', 'k10', 'repoComp', 'ficha', 'cmr', 'cmr2', 'q2pr', 'inari', 'jnj', 'axon', 'wright', 'q4pr25']);
  const B = {
    _estado: 'completa',
    historia: {
      resumen: `Fundada en 1941 en Kalamazoo (Michigan) por el cirujano Homer Stryker para fabricar camas y férulas, cotiza desde 1979. Entró en implantes de cadera y rodilla con Howmedica (1998, comprada a Pfizer) y desde entonces crece con compras: Mako (2013, robot ortopédico), Physio-Control (2016, desfibriladores), Wright Medical (2020, extremidades), Vocera (2022, comunicación clínica) e Inari (2025, trombectomía venosa). Bajo Kevin Lobo (consejero delegado desde 2012) las ventas se triplicaron y la empresa completó más de 60 compras; en 2025 vendió su negocio de implantes de columna ${c('k10')}.`,
      hitos: [
        { anio: '1941', hito: 'Homer Stryker funda la empresa en Kalamazoo.' },
        { anio: '1979', hito: 'Salida a bolsa.' },
        { anio: '1998', hito: 'Compra de Howmedica a Pfizer: entrada en prótesis articulares.' },
        { anio: '2013', hito: 'Compra de Mako Surgical (≈1.650 M USD): robot para rodilla y cadera.' },
        { anio: '2016', hito: 'Compra de Physio-Control (desfibriladores) y Sage.' },
        { anio: '2020', hito: `Compra de Wright Medical (≈5.400 M USD de valor empresa) ${c('wright')}.` },
        { anio: '2022', hito: 'Compra de Vocera (comunicación clínica).' },
        { anio: '2025', hito: 'Compra de Inari Medical (4.810 M USD netos de caja) y venta de Spinal Implants a VB Spine.' },
        { anio: '2026', hito: `Ciberataque en marzo; inversión de ≈400 M USD en CMR Surgical con opción de compra (octubre) ${c('cmr')}.` },
      ],
      confianza: 'Media',
    },
    negocio: {
      descripcion: `Stryker vende tecnología médica a hospitales y centros de cirugía ambulatoria: un 62 % de las ventas en MedSurg y Neurotecnología (instrumental quirúrgico, endoscopia, camas y equipos de emergencia, neurovascular y, desde 2025, trombectomía venosa de Inari) y un 38 % en Ortopedia (rodilla, cadera, traumatología y extremidades y el robot Mako) ${c('k10')}. El 76 % de las ventas es en EE. UU. Vende con equipos comerciales especializados por división que acompañan al cirujano en quirófano; fabrica sobre todo en EE. UU., Irlanda, Puerto Rico y México.`,
      como_gana_dinero: `Combina bienes de equipo (camas, torres de endoscopia, robots Mako, ≈25-30 % de las ventas según la empresa) con consumibles e implantes que se usan en cada intervención. El robot ancla al cirujano en las prótesis de Stryker: cada Mako instalado arrastra ventas de rodillas y caderas durante años. El margen bruto ajustado es del 65 % y el operativo ajustado del 26,3 % ${c('q4pr25')}; el precio aporta poco (0,4 pp en 2025) y casi todo el crecimiento es volumen. Apalancamiento operativo moderado: la empresa promete +100 pb de margen al año con crecimientos del 8-10 %.`,
      clientes: `Clientes: hospitales y grupos de compra en EE. UU., sistemas públicos en Europa y Japón; ningún cliente supera el 10 % de las ventas ${c('k10')}. Contratos de suministro de 3-5 años con grupos de compra. El poder de precios es limitado: el precio sumó 0,4 pp en 2025 y 0,1 pp en el 2T26, con la ortopedia en precio plano o negativo ${c('q4pr25', 'q2pr')}. El poder está en el volumen y en el coste de cambiar de sistema (formación del cirujano, robot instalado).`,
      confianza: 'Media',
    },
    sector: {
      definicion: `Mercado relevante: tecnología médica para quirófano y hospital en la que compite Stryker, con la ortopedia como núcleo de su foso. Usamos el mercado mundial de dispositivos ortopédicos como referencia de tamaño (prótesis articulares, traumatología, extremidades, columna y artroscopia) y la ficha sectorial del repositorio ${c('ficha')}. Las fuentes difieren por perímetro: 65.280 M USD en 2025 según Fortune Business Insights y ≈56.500 M según Global Market Insights ${c('fbi', 'gmi')}; tomamos la intermedia de MarketsandMarkets (51.610 M en 2024 y un 4,8 % anual) ${c('mm')}. MedSurg no tiene una cifra de mercado única: lo cubren varias categorías.`,
      tamano: `≈54.000 M USD en 2025 (dispositivos ortopédicos; 51.610 M en 2024 más un 4,8 %) ${c('mm')}`,
      unidad_serie: 'millones de USD (dispositivos ortopédicos, MarketsandMarkets)',
      serie: [{ anio: '2023', tamano: 49630 }, { anio: '2024', tamano: 51610 }, { anio: '2030e', tamano: 68500 }],
      tcac_historico_pct: 4.0, tcac_previsto_pct: 4.8, cr5_pct: null, estructura: 'Moderadamente concentrada',
      drivers: [
        { driver: 'Envejecimiento y obesidad', efecto: '+', horizonte: 'Estructural', evidencia: `Las prótesis articulares son el 37,5 % del mercado ortopédico ${c('fbi')}.` },
        { driver: 'Robótica y cirugía ambulatoria', efecto: '+', horizonte: 'Estructural', evidencia: `Ortho Tech (Mako) crece un 10 % a tipo constante en el 2T26 ${c('q2pr')}.` },
        { driver: 'Bienes de equipo hospitalarios', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Las compras de camas y torres dependen del presupuesto de los hospitales (caída en 2020).' },
        { driver: 'Aranceles y cadena de suministro', efecto: '−', horizonte: 'Cíclico', evidencia: `Stryker reversó 158 M de aranceles de 2025 en el 2T26 tras su anulación ${c('q2pr')}.` },
        { driver: 'Precio y reembolso', efecto: '−', horizonte: 'Estructural', evidencia: `El precio aportó 0,4 pp en 2025 ${c('q4pr25')}.` },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cuatro grandes en prótesis (Stryker, Zimmer Biomet, J&J DePuy, Smith & Nephew) con precios planos; competencia por robots.' },
        { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Grupos de compra hospitalarios y sistemas públicos negocian precio; precio plano o negativo en ortopedia.' },
        { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Materias primas (titanio, cobalto-cromo, polietileno) con varios proveedores; el ciberataque mostró dependencia de sistemas propios.' },
        { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Barreras regulatorias (FDA, MDR europeo), datos clínicos de largo plazo y fuerza comercial en quirófano.' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Fármacos para la artrosis o la obesidad (GLP-1) podrían retrasar prótesis; sin efecto visible en volúmenes de 2025-2026.' },
      ],
      ciclo: { posicion: 'Expansión', comentario: `Los volúmenes de cirugía siguen altos tras la recuperación pos-COVID (orgánico de Stryker del 9,7-11 % en 2023-2025) ${c('q4pr25')}. En 2009 el sector creció poco pero no cayó; en 2020 las ventas de Stryker bajaron un 3,6 % por la suspensión de cirugías programadas; en 2022 la inflación de costes recortó márgenes. Indicadores: volúmenes de cirugía en EE. UU., pedidos de bienes de equipo y ocupación hospitalaria.` },
      regulacion: `Reglamento europeo de productos sanitarios (MDR): coste de recertificación de 38-96 M USD al año en 2023-2025 para Stryker ${c('k10')}. En EE. UU., reembolso de Medicare para prótesis (paso de prótesis de rodilla y cadera a cirugía ambulatoria) y aranceles: los de 2025 (IEEPA) se anularon y Stryker reversó 158 M en el 2T26 ${c('q2pr')}; sigue abierta la investigación de la Sección 232 sobre dispositivos médicos.`,
      tendencias: `Robots: Mako supera los 2,5 millones de intervenciones según la prensa; competidores con ROSA (Zimmer), Velys (J&J) y CORI (Smith & Nephew). Stryker amplía a tejidos blandos con la inversión en CMR Surgical (robot Versius, distribución exclusiva en EE. UU. y opción de compra) ${c('cmr', 'cmr2')}. Trombectomía venosa y periférica (Inari, AVS) es el área de crecimiento rápido. La IA entra en planificación quirúrgica, navegación y comunicación clínica: Stryker la usa más que la sufre.`,
      confianza: 'Media',
    },
    competencia: {
      cuota_pct: 17.0,
      posicion: 'Líder mundial en dispositivos ortopédicos junto a Zimmer Biomet (≈17 % del mercado ortopédico con 9.469 M USD de ventas de Ortopedia en 2025, estimación propia sobre ≈54.000 M); n.º 1 en camas y equipos de emergencia, n.º 1-2 en instrumental motorizado.',
      competidores: [
        { nombre: 'Zimmer Biomet', pais: 'EE. UU.', ticker: 'ZBH', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Líder en rodilla; robot ROSA; crece ≈4 % ${c('repoComp')}.` },
        { nombre: 'Johnson & Johnson (DePuy Synthes)', pais: 'EE. UU.', ticker: 'JNJ', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Ortopedia en proceso de escisión; robot Velys.' },
        { nombre: 'Smith & Nephew', pais: 'Reino Unido', ticker: 'SN.L', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Robot CORI; reestructuración de ortopedia ${c('repoComp')}.` },
        { nombre: 'Medtronic', pais: 'Irlanda', ticker: 'MDT', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival en neurovascular, columna e instrumental.' },
        { nombre: 'Boston Scientific', pais: 'EE. UU.', ticker: 'BSX', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival de Inari en vascular periférico (AngioJet, compra de Silk Road).' },
        { nombre: 'Penumbra', pais: 'EE. UU.', ticker: 'PEN', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival directo de Inari en trombectomía venosa.' },
      ],
      foso: { veredicto: 'Amplio', tendencia: 'Estable', fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Datos de intervenciones Mako mejoran la planificación, efecto pequeño.' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Robot instalado, formación del cirujano y juegos de instrumental en consigna atan al hospital a las prótesis de Stryker.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Patentes de Mako y datos clínicos; marca sólida entre cirujanos.' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen operativo ajustado del 26,3 %, similar al de los grandes; sin ventaja clara de coste.' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Fuerza comercial especializada en quirófano y presencia en casi todos los hospitales de EE. UU.' },
      ] },
      amenazas: `Tres amenazas con probabilidad media: (1) robots rivales y la entrada de Intuitive en ortopedia, que erosionarían el arrastre de Mako; (2) presión de precios de grupos de compra y de Medicare; (3) que la integración de Inari no recupere el crecimiento (el vascular de EE. UU. cayó un 6,7 % en el 2T26) ${c('q2pr')}. Fármacos GLP-1 para la obesidad: riesgo de largo plazo, sin efecto observado en volúmenes.`,
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: `Lo que mueve las cifras: calidad y seguridad del producto (retiradas de caderas Rejuvenate y ABG II, cargos de 17-58 M al año) y cumplimiento del MDR europeo (38-96 M al año) ${c('k10')}; ciberseguridad (ataque de marzo de 2026 que paró la fabricación).`,
      controversias: 'Ciberataque de marzo de 2026 atribuido por la prensa a un grupo vinculado a Irán; investigaciones de bufetes por la información sobre el problema de fabricación de septiembre de 2026; litigios históricos de prótesis de cadera.',
      confianza: 'Baja',
    },
    huecos: [
      { seccion: 'competencia', campo: 'ingresos y márgenes de los competidores', tipo: 'Complemento', intentos: '1) informes anuales de Zimmer y Smith & Nephew no descargados por tiempo; 2) comparables del repositorio (márgenes EBITDA, no EBIT); 3) prensa sin cifras primarias', decision: 'Omitido' },
      { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) web de Stryker; 2) MSCI y Sustainalytics (de pago o sin fecha); 3) sin búsqueda adicional', decision: 'Omitido' },
    ],
    fuentes,
  };
  guarda('B', B);
}

// ---------------------------------------------------------------- C. Gobierno y directivos
{
  const { fuentes, c } = nota(['proxy', 'votos', 'form4', 'ceo', 'coo', 'cao', 'k10', 'q4pr25', 'q4pr22', 'q4pr21', 'q4pr19', 'q1pr', 'q2pr']);
  const C = {
    _estado: 'completa',
    directivos: {
      equipo: [
        { nombre: 'Kevin A. Lobo', cargo: 'Presidente y consejero delegado (presidente ejecutivo desde el 1-ene-2027)', desde: '2012', participacion_pct: 0.31, trayectoria: `Consejero delegado desde octubre de 2012; ventas de 8.700 M USD en 2012 a más de 26.000 M en 2026, más de 60 compras y rentabilidad total del accionista del 450 % según la empresa ${c('ceo')}.` },
        { nombre: 'Spencer S. Stiles', cargo: 'Presidente y director de operaciones; consejero delegado desde el 1-ene-2027', desde: '2026', participacion_pct: 0.06, trayectoria: `27 años en Stryker; dirigió Ortopedia y Columna desde 2019 (la etapa de Mako y la venta de columna) ${c('coo', 'ceo')}.` },
        { nombre: 'Preston W. Wells', cargo: 'Director financiero', desde: '2024', participacion_pct: 0.01, trayectoria: `Director financiero desde 2024; sus comentarios del 8-sep-2026 sobre vascular periférico tumbaron la acción un 8,8 % ${c('form4')}.` },
        { nombre: 'J. Andrew Pierce', cargo: 'Presidente del grupo MedSurg y Neurotecnología', desde: '2019', participacion_pct: 0.06, trayectoria: 'Dirige la división que integra Inari y AVS; consejero de CMR Surgical tras la inversión.' },
        { nombre: 'Dylan Crotty', cargo: 'Presidente del grupo Ortopedia', desde: '2026', participacion_pct: null, trayectoria: `Sustituye a Stiles en Ortopedia desde el 1-ene-2026; antes, Instruments ${c('coo')}.` },
      ],
      historial_guidance: [
        { anio: '2025', guia: 'Orgánico 8-9 %, BPA ajustado 13,45-13,65 USD (enero de 2025)', real: `Orgánico 10,3 %, BPA ajustado 13,63 USD ${c('q4pr25')}`, cumplida: 'Sí' },
        { anio: '2022', guia: 'Orgánico 6,5-8,5 %, BPA ajustado 9,85-10,25 USD (enero de 2022)', real: `Orgánico 9,7 %, BPA ajustado 9,34 USD (inflación de costes) ${c('q4pr22')}`, cumplida: 'Parcial' },
        { anio: '2021', guia: 'Recuperación pos-COVID', real: `Orgánico 9,0 %; BPA ajustado 9,09 USD ${c('q4pr21')}`, cumplida: 'Sí' },
        { anio: '2019', guia: 'Orgánico 6,5-7 %', real: `Orgánico 8,0 %, BPA ajustado 8,26 USD ${c('q4pr19')}`, cumplida: 'Sí' },
        { anio: '2026', guia: 'Orgánico 8-9,5 %, BPA 14,90-15,10 USD; estrechada a 8,3-9,3 % y 14,95-15,10 en julio', real: `Pendiente; 1S26: orgánico 5,8 % y BPA ajustado 6,29 USD ${c('q2pr')}`, cumplida: 'Parcial' },
      ],
      comentario: `Equipo estable y con sucesión ordenada: Stiles fue nombrado director de operaciones en diciembre de 2025 y consejero delegado para enero de 2027, con Lobo como presidente ejecutivo ${c('ceo', 'coo')}. La dirección suele cumplir la guía (2019, 2021, 2025) y falló el BPA en 2022 por la inflación. Dos señales a vigilar: el relevo del director contable en septiembre de 2026 ${c('cao')} y la comunicación del problema de vascular periférico, que en julio se dio por casi resuelto y en septiembre seguía abierto.`,
      confianza: 'Media',
    },
    gobierno: {
      consejo: [
        { nombre: 'Kevin A. Lobo', cargo: 'Presidente', tipo: 'Ejecutivo', desde: '2012', comisiones: '—' },
        { nombre: 'Sherilyn S. McCoy', cargo: 'Consejera coordinadora independiente', tipo: 'Independiente', desde: '2018', comisiones: 'Retribuciones, Nombramientos' },
        { nombre: 'Mary K. Brainerd', cargo: 'Consejera', tipo: 'Independiente', desde: '2009', comisiones: 'Retribuciones, Nombramientos (presidenta)' },
        { nombre: 'Giovanni Caforio', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Retribuciones (presidente), Nombramientos' },
        { nombre: 'Emmanuel P. Maceda', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Retribuciones, Nombramientos' },
        { nombre: 'Rachel M. Ruggeri', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría' },
        { nombre: 'Andrew K. Silvernail', cargo: 'Consejero', tipo: 'Independiente', desde: '2013', comisiones: 'Auditoría (presidente)' },
        { nombre: 'Lisa M. Skeete Tatum', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría' },
        { nombre: 'Ronda E. Stryker', cargo: 'Consejera (familia fundadora, 4,0 %)', tipo: 'Dominical', desde: '1984', comisiones: 'Nombramientos' },
        { nombre: 'Rajeev Suri', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría' },
      ],
      presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
      operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
      accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
      voto_remuneracion_pct: 92.8, voto_remuneracion_contra_pct: 6.4, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: 94.5,
      remuneracion_ceo: { anio: '2025', total: 21.40, fijo: 1.49, variable_corto: 2.25, variable_largo: 16.68, ratio_salario_medio: 264 },
      remuneracion: `Lobo cobró 21,4 M USD en 2025: 1,49 de fijo, 2,25 de bonus, 9,76 en acciones por objetivos y 6,92 en opciones ${c('proxy')}. El bonus pesa ventas y BPA ajustado (30 % el BPA) y el plan de acciones a tres años mide crecimiento de ventas frente a un grupo de comparables y crecimiento del BPA ajustado; el de 2023-2025 pagó el 200 %. Ninguna métrica de retorno sobre el capital: premia crecer, también comprando, y el BPA ajustado excluye la amortización de lo comprado. Ratio de 264 veces el empleado mediano. El voto consultivo obtuvo un 92,8 % a favor en 2026 ${c('votos')}.`,
      accionistas: [
        { nombre: 'The Vanguard Group', pct: 8.1, tipo: 'Institucional', variacion: 'Último 13G de 2024' },
        { nombre: 'BlackRock', pct: 6.5, tipo: 'Institucional', variacion: 'Último 13G de 2024' },
        { nombre: 'John W. Brown (expresidente)', pct: 5.2, tipo: 'Particular', variacion: 'Último 13G de 2021' },
        { nombre: 'Ronda E. Stryker', pct: 4.0, tipo: 'Familia fundadora (consejera)', variacion: 'Vendió ≈581 M USD en mayo-agosto de 2026' },
      ],
      insiders: [
        { fecha: '2026-08-19', persona: 'Ronda E. Stryker (consejera), mayo-agosto de 2026 (suma de las ventas)', operacion: 'Venta', acciones: null, importe: 580.89 },
        { fecha: '2026', persona: 'Otros directivos (6), total 12 meses', operacion: 'Venta', acciones: null, importe: 5.24 },
        { fecha: '2026', persona: 'Mary K. Brainerd (consejera), total 12 meses', operacion: 'Compra', acciones: null, importe: 0.03 },
      ],
      control_y_defensas: `Sin accionista de control: la familia Stryker (Ronda Stryker, 4,0 %) y John Brown (5,2 %) no controlan la junta. Una acción, un voto; consejeros elegidos cada año por mayoría ${c('proxy')}. El presidente es ejecutivo y lo seguirá siendo con Lobo desde 2027, con una consejera coordinadora independiente. Ronda Stryker vendió acciones por ≈581 M USD entre mayo y agosto de 2026 a 310-344 USD ${c('form4')}: es diversificación de una consejera de 71 años, pero coincide con la caída de la acción.`,
      alertas: [
        'Ventas de la consejera Ronda Stryker por ≈581 M USD en mayo-agosto de 2026, antes del aviso del 8-sep.',
        'Bufetes investigan si se informó a tiempo del problema de fabricación de vascular periférico (septiembre de 2026).',
        'Relevo del director contable (septiembre de 2026) en un año con ciberataque.',
      ],
      confianza: 'Media',
    },
    huecos: [
      { seccion: 'gobierno', campo: 'importe exacto por operación de Ronda Stryker', tipo: 'Complemento', intentos: '1) form4.mjs (varias ejecuciones por día); 2) suma total 580,9 M USD; 3) se resume el total', decision: 'Calculado y marcado como estimación' },
      { seccion: 'directivos', campo: 'años del auditor', tipo: 'Complemento', intentos: '1) proxy 2026; 2) 10-K; 3) sin dato en el texto descargado', decision: 'Omitido' },
    ],
    fuentes,
  };
  guarda('C', C);
}

// ---------------------------------------------------------------- D. Mercado y valoración
{
  const { fuentes, c } = nota(['bolsa', 'ms', 'barchart', 'repoComp', 'bce', 'fred', 'damo', 'inari', 'wright', 'jnj', 'axon', 'q10', 'q2pr', 'q4pr25', 'k10', 'q3fecha', 'fmp', 'wells']);
  const usdChf = 1.1195 / 0.9330;
  const D = {
    _estado: 'completa',
    identificacion: {
      nombre: 'Stryker Corporation', nombre_corto: 'Stryker', ticker: 'SYK', isin: 'US8636671013', mercado: 'NYSE', indice_referencia: 'S&P 500',
      pais: 'Estados Unidos', pais_iso: 'US', sector: 'Salud', industria: 'Equipos y suministros sanitarios', sede: 'Portage (Michigan)', fundacion: '1941', empleados: 56000, web: 'www.stryker.com',
      precio: 281.62, fecha_precio: '2026-10-14', acciones: 386.0, capitalizacion_publicada: null, free_float_pct: 95.6,
      max_52s: 392.55, min_52s: 267.0, volumen_medio_diario: `≈786 M USD/día (3 meses) ${c('bolsa')}`, proximos_resultados: '2026-10-29',
    },
    consenso: {
      guidance: `Guía 2026 (30-jul-2026): orgánico del 8,3-9,3 % y BPA ajustado de 14,95-15,10 USD, con efecto de precio ligeramente positivo y divisa algo favorable ${c('q2pr')}. En enero era del 8-9,5 % y 14,90-15,10 ${c('q4pr25')}. El 8-sep el director financiero dijo que el problema de vascular periférico seguía en el 3T, pero mantuvo la guía ${c('wells')}. Objetivo a medio plazo: crecer en la parte alta del sector y +100 pb de margen operativo ajustado al año.`,
      estimaciones: [
        { periodo: '2026e', ingresos: 27195, ebitda: 7792, ebit: 7264, bpa: 14.98, dpa: 3.59, fuente: `MarketScreener (ventas, EBITDA y EBIT ajustados) y Barchart (BPA ajustado) ${c('ms', 'barchart')}` },
        { periodo: '2027e', ingresos: 29530, ebitda: 8559, ebit: 8028, bpa: 16.58, dpa: 3.82, fuente: `MarketScreener y Barchart ${c('ms', 'barchart')}` },
        { periodo: '2028e', ingresos: 31843, ebitda: 9429, ebit: 8855, bpa: null, dpa: 4.11, fuente: `MarketScreener; sin BPA ajustado de consenso (el de MarketScreener, 16,59 USD, es contable) ${c('ms')}` },
      ],
      recomendaciones: { n_analistas: 29, comprar: null, mantener: null, vender: null, po_medio: 362.62, po_min: null, po_max: null },
      revisiones: `Tendencia de recortes en 3 meses: Truist bajó su objetivo de 340 a 310 USD tras la conferencia de septiembre ${c('fmp')}, Stifel de 360 a 330 y BTIG de 371 a 358 tras el 2T26. El BPA de 2026 apenas se mueve (guía mantenida) y el recorte es de múltiplo. Una sola fuente gratuita con estimaciones completas (MarketScreener), cuyo BPA es contable; el ajustado de 2026-2027 sale de Barchart.`,
      base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.7,
      confianza: 'Media',
    },
    bolsa: {
      tipo_rentabilidad: 'de precio (sin dividendos)',
      rentabilidades: [
        { periodo: 'En el año', accion_pct: -19.9, indice_pct: 12.8, sector_pct: 12.4 },
        { periodo: '1 año', accion_pct: -23.9, indice_pct: 16.2, sector_pct: 22.2 },
        { periodo: '3 años (anual.)', accion_pct: 3.0, indice_pct: 21.3, sector_pct: 10.1 },
        { periodo: '5 años (anual.)', accion_pct: 1.3, indice_pct: 11.7, sector_pct: 6.4 },
        { periodo: '10 años (anual.)', accion_pct: 9.5, indice_pct: 13.7, sector_pct: 9.6 },
      ],
      anual: [
        { anio: '2016', accion_pct: 28.9, indice_pct: 9.5 }, { anio: '2017', accion_pct: 29.2, indice_pct: 19.4 }, { anio: '2018', accion_pct: 1.2, indice_pct: -6.2 },
        { anio: '2019', accion_pct: 33.9, indice_pct: 28.9 }, { anio: '2020', accion_pct: 16.7, indice_pct: 16.3 }, { anio: '2021', accion_pct: 9.1, indice_pct: 26.9 },
        { anio: '2022', accion_pct: -8.6, indice_pct: -19.4 }, { anio: '2023', accion_pct: 22.5, indice_pct: 24.2 }, { anio: '2024', accion_pct: 20.2, indice_pct: 23.3 }, { anio: '2025', accion_pct: -2.4, indice_pct: 16.4 },
      ],
      beta: 0.8, volatilidad_pct: 30.1, max_drawdown_pct: -32.5, posicion_corta_pct: null,
      comentario: `La acción cae un 23,9 % en un año frente al +16,2 % del S&P 500 y el +22,2 % del sector salud (XLV) ${c('bolsa')}. Desde el máximo de 392,55 USD (22-oct-2025) acumula una caída del 32,5 %, con cinco golpes: guía de 2026 por debajo de lo esperado, ciberataque (marzo), 1T26 (−6,5 % el 1-may), 2T26 pese a batir (−6,4 % el 31-jul) y el aviso de vascular periférico en la conferencia de Wells Fargo (−8,8 % el 8-sep) ${c('wells')}. El mínimo de 52 semanas, 267 USD, es del 11-sep-2026.`,
      confianza: 'Alta',
    },
    multiplos_historicos: {
      serie: [
        { anio: '2016', precio_cierre: 119.81, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
        { anio: '2017', precio_cierre: 154.84, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
        { anio: '2018', precio_cierre: 156.75, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
        { anio: '2019', precio_cierre: 209.94, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
        { anio: '2020', precio_cierre: 245.04, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
        { anio: '2021', precio_cierre: 267.42, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
        { anio: '2022', precio_cierre: 244.49, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
        { anio: '2023', precio_cierre: 299.46, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
        { anio: '2024', precio_cierre: 360.05, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
        { anio: '2025', precio_cierre: 351.47, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      ],
      comentario: `Con el BPA ajustado, Stryker cotizó entre 23 y 29 veces el beneficio del año siguiente en 2020-2025 (mediana de 5 años de 24,6x) y hoy cotiza a 17,0 veces nuestro BPA de 2027 ${c('bolsa')}. Es el nivel más bajo en una década: el mercado ha pasado de pagar una prima de crecedor de calidad a pagar el múltiplo de Medtronic (14,1x) o Abbott (16,5x). Se excluyen 2018 (BPA contable inflado por un beneficio fiscal de 1.197 M) y 2024 (deterioro de 977 M de columna) del PER contable.`,
      confianza: 'Media',
    },
    comparables: {
      criterio: `Grandes fabricantes de tecnología médica con exposición a quirófano, ortopedia o vascular: Zimmer Biomet y Smith & Nephew (prótesis), Medtronic, Boston Scientific y Abbott (diversificados, rivales de Inari y en neurovascular), Intuitive (robots), Edwards y Straumann (crecedores de calidad del repositorio). Cifras de los informes del repositorio a 6-14 de octubre de 2026 (MarketScreener y Stock Analysis) sin cambios; Straumann pasada a USD con el BCE ${c('repoComp', 'bce')}. J&J (ortopedia en escisión) no tiene múltiplo propio de ese negocio.`,
      empresas: [
        { nombre: 'Zimmer Biomet', ticker: 'ZBH', pais: 'US', capitalizacion: 17110, ev_ventas: 2.85, ev_ebitda_ltm: 8.8, ev_ebitda_ntm: 8.4, per_ntm: 10.0, crecimiento_pct: 3.8, margen_ebitda_pct: 32.7, roic_pct: 6.2, dn_ebitda: 2.6, fcf_yield_pct: 7.0 },
        { nombre: 'Smith & Nephew', ticker: 'SN.L', pais: 'GB', capitalizacion: null, ev_ventas: 2.26, ev_ebitda_ltm: 8.7, ev_ebitda_ntm: 8.2, per_ntm: 15.2, crecimiento_pct: 5.1, margen_ebitda_pct: 26.1, roic_pct: null, dn_ebitda: 1.7, fcf_yield_pct: 7.4 },
        { nombre: 'Medtronic', ticker: 'MDT', pais: 'IE', capitalizacion: 111400, ev_ventas: 3.48, ev_ebitda_ltm: 12.6, ev_ebitda_ntm: 11.7, per_ntm: 14.1, crecimiento_pct: 5.5, margen_ebitda_pct: 27.6, roic_pct: 8.6, dn_ebitda: 1.85, fcf_yield_pct: 5.5 },
        { nombre: 'Boston Scientific', ticker: 'BSX', pais: 'US', capitalizacion: 61140, ev_ventas: 3.49, ev_ebitda_ltm: 11.8, ev_ebitda_ntm: 10.9, per_ntm: 12.5, crecimiento_pct: 4.9, margen_ebitda_pct: 29.8, roic_pct: 11.2, dn_ebitda: 1.94, fcf_yield_pct: 6.0 },
        { nombre: 'Abbott Laboratories', ticker: 'ABT', pais: 'US', capitalizacion: 169850, ev_ventas: 4.23, ev_ebitda_ltm: 16.1, ev_ebitda_ntm: 14.0, per_ntm: 16.5, crecimiento_pct: 14.9, margen_ebitda_pct: 26.5, roic_pct: 7.5, dn_ebitda: 2.22, fcf_yield_pct: 4.6 },
        { nombre: 'Intuitive Surgical', ticker: 'ISRG', pais: 'US', capitalizacion: 144297, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: 28.6, per_ntm: 39.2, crecimiento_pct: 13.2, margen_ebitda_pct: 37.9, roic_pct: 30.2, dn_ebitda: null, fcf_yield_pct: null },
        { nombre: 'Edwards Lifesciences', ticker: 'EW', pais: 'US', capitalizacion: 49432, ev_ventas: 7.0, ev_ebitda_ltm: 22.9, ev_ebitda_ntm: 19.4, per_ntm: 27.1, crecimiento_pct: 10.5, margen_ebitda_pct: 29.7, roic_pct: null, dn_ebitda: -1.85, fcf_yield_pct: 2.2 },
        { nombre: 'Straumann', ticker: 'STMN.SW', pais: 'CH', capitalizacion: Math.round(14674 * usdChf), ev_ventas: 5.62, ev_ebitda_ltm: 18.7, ev_ebitda_ntm: null, per_ntm: 26.2, crecimiento_pct: 6.5, margen_ebitda_pct: 30.1, roic_pct: 25.6, dn_ebitda: 0.2, fcf_yield_pct: 2.4 },
      ],
      confianza: 'Media',
    },
    transacciones: {
      operaciones: [
        { fecha: '2025-01', objetivo: 'Inari Medical (trombectomía venosa)', comprador: 'Stryker', ev: 4900, ev_ventas: 8.1, ev_ebitda: null, prima_pct: null, excluir: false, comentario: `80 USD por acción; ventas 2024 guiadas de 601,5-604,5 M ${c('inari', 'k10')}` },
        { fecha: '2019-11', objetivo: 'Wright Medical (extremidades)', comprador: 'Stryker', ev: 5400, ev_ventas: 5.4, ev_ebitda: null, prima_pct: null, excluir: false, comentario: `Ventas «cercanas a 1.000 M USD»; múltiplo aproximado ${c('wright')}` },
        { fecha: '2024-01', objetivo: 'Axonics (neuromodulación)', comprador: 'Boston Scientific', ev: 3400, ev_ventas: 9.3, ev_ebitda: null, prima_pct: null, excluir: false, comentario: `Ingresos 2023 preliminares de ≈366 M USD ${c('axon')}` },
        { fecha: '2024-04', objetivo: 'Shockwave Medical (litotricia intravascular)', comprador: 'Johnson & Johnson', ev: 13100, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: `Valor empresa de ≈13.100 M USD ${c('jnj')}` },
        { fecha: '2026-05', objetivo: 'Amplitude Vascular Systems (AVS)', comprador: 'Stryker', ev: 706, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: `435 M en caja y 271 M de hitos a valor razonable; sin ventas (en desarrollo) ${c('q10')}` },
      ],
      comentario: `Las compras de crecimiento en vascular se pagan a 8-9 veces ventas (Inari, Axonics) y Shockwave aún más: son activos sin beneficio que Stryker amortiza durante años. Stryker es comprador, no objetivo: con ≈108.700 M USD de capitalización y sin accionista de control, una OPA es improbable. Las transacciones no entran en la valoración (peso 0).`,
      confianza: 'Media',
    },
    huecos: [
      { seccion: 'consenso', campo: 'recomendaciones por tipo y objetivo mínimo y máximo', tipo: 'Complemento', intentos: '1) MarketScreener (solo media y número); 2) Barchart (sin desglose); 3) Investing no consultado por tiempo', decision: 'Omitido' },
      { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) bolsa.mjs (no la da); 2) Stock Analysis no consultado; 3) FINRA no consultado', decision: 'Omitido' },
    ],
    fuentes,
  };
  guarda('D', D);
}

// ---------------------------------------------------------------- E. Sentimiento
{
  const { fuentes, c } = nota(['saRss', 'st', 'wells', 'glancy', 'q2pr', 'cmr']);
  const E = {
    _estado: 'completa',
    sentimiento: {
      tono: 'Dividido', tendencia: 'Empeora',
      revisadas: [
        { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-10', n_comentarios: 6, tono: 'Positivo', resumen: `Cinco artículos de ago-oct ven la caída como oportunidad («finalmente barata otra vez», «los problemas operativos crean una oportunidad»); uno pide esperar a otra caída ${c('saRss')}.` },
        { plataforma: 'Seeking Alpha (noticias)', fecha: '2026-09', n_comentarios: 12, tono: 'Negativo', resumen: `Titulares de caídas tras el 2T26 pese a batir, tras la conferencia de septiembre y salida de un fondo sectorial de Baron ${c('saRss', 'wells')}.` },
        { plataforma: 'Stocktwits ($SYK)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: `Mezcla de compradores que ven suelo («buen momento para empezar posición») y bajistas que hablan de despidos y de investigaciones; quejas por el daño de los comentarios del director financiero ${c('st')}.` },
        { plataforma: 'Webs de bufetes', fecha: '2026-09', n_comentarios: 2, tono: 'Negativo', resumen: `Investigaciones sobre si la empresa informó a tiempo del problema de fabricación ${c('glancy')}.` },
      ],
      temas: [
        { tema: 'Problema de suministro en vascular periférico (Inari)', postura: 'Bajista', peso: 'Alto', contraste: `Real: el vascular de EE. UU. cayó un 6,7 % en el 2T26 ${c('q2pr')} y el problema sigue en el 3T. Pesa ≈2 % de las ventas del grupo; no rompe la tesis, pero sí la credibilidad.` },
        { tema: 'Valoración en mínimos de una década', postura: 'Alcista', peso: 'Alto', contraste: '17,0 veces nuestro BPA ajustado de 2027 frente a una mediana adelantada de 24,6x: es cierto.' },
        { tema: 'Relevo del consejero delegado', postura: 'Dividida', peso: 'Medio', contraste: 'Sucesión interna anunciada con tres meses de margen y Lobo como presidente ejecutivo: bajo riesgo operativo.' },
        { tema: 'Inversión en CMR Surgical (robot de tejidos blandos)', postura: 'Dividida', peso: 'Bajo', contraste: `≈400 M USD con opción de compra ${c('cmr')}: abre un frente frente a Intuitive y añade riesgo de otra compra grande.` },
        { tema: '«Maquillaje de cuentas» y despidos', postura: 'Bajista', peso: 'Bajo', contraste: 'Sin indicio en el 10-Q: opinión sin datos.' },
      ],
      lectura: `El particular está dividido: los artículos largos ven una compra de calidad a buen precio y los mensajes cortos castigan la pérdida de credibilidad de la dirección tras el aviso de septiembre. No hay euforia ni capitulación clara. Lo que aporta: el riesgo de vascular periférico y de la comunicación de la dirección ya está en el precio y en el informe; el foco en una posible demanda colectiva es ruido salvo que aparezca algo en el 3T26 (29-oct).`,
      confianza: 'Media',
    },
    huecos: [],
    fuentes,
  };
  guarda('E', E);
}
console.log('Notas A-E escritas');

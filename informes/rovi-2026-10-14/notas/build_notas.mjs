// Escribe las notas A-E de Rovi (corte 2026-10-14) a partir de los extractos de búsqueda (entorno nube: solo WebSearch).
// Ejecutar: node informes/rovi-2026-10-14/notas/build_notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const w = (k, o) => fs.writeFileSync(path.join(dir, `${k}.json`), JSON.stringify(o, null, 1));
const ENTORNO = 'Entorno nube: solo WebSearch (sin WebFetch, curl ni descargas); extractos de búsqueda de la fuente citada.';

// ---------------- A. Cuentas ----------------
const A = {
  _estado: 'Completo con lo que permite la búsqueda web (14-oct-2026). Cifras de cabecera de las notas de resultados y series de TipRanks/Yahoo/MarketScreener; EBIT 2021-2023, resultado financiero e impuestos son estimaciones marcadas.',
  negocio: {
    segmentos: [
      { nombre: 'Especialidades farmacéuticas', descripcion: 'Heparinas de bajo peso molecular (enoxaparina, bemiparina), Okedi y Risvan (risperidona ISM), Neparvis y cartera de licencias en España.', tipo_resultado: null, historico: [
        { periodo: '2024', ingresos: 426.9, resultado: null }, { periodo: '2025', ingresos: 473.9, resultado: null } ] },
      { nombre: 'Fabricación a terceros (CDMO)', descripcion: 'Llenado aséptico de jeringas precargadas, viales y cartuchos para grandes farmacéuticas (Moderna, contrato de jeringas con una farmacéutica global; planta de Phoenix con contrato de BMS desde abril de 2026).', tipo_resultado: null, historico: [
        { periodo: '2024', ingresos: 336.8, resultado: null }, { periodo: '2025', ingresos: 269.6, resultado: null } ] },
    ],
    geografias: null,
    kpis: [
      { kpi: 'Ventas de heparinas (M EUR)', valor_anterior: '249,3 (2024)', valor_actual: '266,8 (2025)', variacion: '+7 %', comentario: 'Enoxaparina +9 % hasta 157,7 M; en el 1S26 caen un 4 % (130,1 M) por inventario alto de socios y presión de precios [1, 2, 3].' },
      { kpi: 'Ventas de Okedi (M EUR)', valor_anterior: '28,8 (2024)', valor_actual: '56,7 (2025)', variacion: '+97 %', comentario: '34,0 M en el 1S26 (+27 %) [1, 2].' },
      { kpi: 'Ventas CDMO (M EUR)', valor_anterior: '77,0 (1S25)', valor_actual: '106,3 (1S26)', variacion: '+38 %', comentario: 'Incluye desde abril la planta de Phoenix comprada a BMS [2, 13].' },
      { kpi: 'Margen bruto', valor_anterior: '62,6 % (2024)', valor_actual: '66,5 % (2025)', variacion: '+3,9 p.', comentario: 'Mezcla hacia especialidades y menor peso de la vacuna de Moderna [10].' },
    ],
    confianza: 'Media',
  },
  financieros: {
    cuenta: [
      { periodo: '2021', ingresos: 648.7, coste_ventas: null, gastos_generales: null, ebitda: 204.7, amortizaciones: 19.0, ebit: 185.7, resultado_financiero: -1.5, bai: 184.2, impuestos: 31.1, minoritarios: 0, beneficio_neto: 153.1, gastos_financieros: 1.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.76, dpa: 0.9529, dpa_extraordinario: 0, acciones_diluidas: 55.5 },
      { periodo: '2022', ingresos: 817.7, coste_ventas: null, gastos_generales: null, ebitda: 281.5, amortizaciones: 21.5, ebit: 260.0, resultado_financiero: -1.5, bai: 258.5, impuestos: 58.8, minoritarios: 0, beneficio_neto: 199.7, gastos_financieros: 1.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.73, dpa: 1.2938, dpa_extraordinario: 0, acciones_diluidas: 53.5 },
      { periodo: '2023', ingresos: 829.5, coste_ventas: null, gastos_generales: null, ebitda: 244.5, amortizaciones: 25.0, ebit: 219.5, resultado_financiero: -1.5, bai: 218.0, impuestos: 47.7, minoritarios: 0, beneficio_neto: 170.3, gastos_financieros: 1.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.29, dpa: 1.1037, dpa_extraordinario: 0, acciones_diluidas: 51.8 },
      { periodo: '2024', ingresos: 763.7, coste_ventas: 285.7, gastos_generales: null, ebitda: 207.4, amortizaciones: 28.0, ebit: 179.4, resultado_financiero: -1.5, bai: 177.9, impuestos: 41.0, minoritarios: 0, beneficio_neto: 136.9, gastos_financieros: 2.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.67, dpa: 0.9351, dpa_extraordinario: 0, acciones_diluidas: 51.3 },
      { periodo: '2025', ingresos: 743.5, coste_ventas: 248.8, gastos_generales: null, ebitda: 216.2, amortizaciones: 30.4, ebit: 185.8, resultado_financiero: -1.5, bai: 184.3, impuestos: 43.9, minoritarios: 0, beneficio_neto: 140.4, gastos_financieros: 3.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.74, dpa: 0.9594, dpa_extraordinario: 0, acciones_diluidas: 51.24 },
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 773.1, ebitda: 271.8, ebit: 239.6, beneficio_neto: 185.1, bpa: 3.61, dpa: 0.9594, dpa_extraordinario: 0, fcf: 177.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -62.4 },
    cambios_perimetro: [{ periodo: '2026', descripcion: 'Planta de Phoenix (Arizona) comprada a Bristol Myers Squibb, consolidada desde el 1-abr-26, con contrato de fabricación de cinco años (mínimo 50 M USD anuales) y una diferencia negativa de consolidación (badwill) de 62,4 M en el 2T26.' }],
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 156.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 30.3, margen_ebitda_pct: 19.4, bpa: 0.36, vs_consenso: null },
      { periodo: '2T25', ingresos: 158.4, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 35.3, margen_ebitda_pct: 22.3, bpa: 0.42, vs_consenso: null },
      { periodo: '1T26', ingresos: 152.5, crecimiento_pct: -2.4, crecimiento_organico_pct: null, ebitda: 20.3, margen_ebitda_pct: 13.3, bpa: 0.18, vs_consenso: 'Inferior' },
      { periodo: '2T26', ingresos: 191.7, crecimiento_pct: 21.0, crecimiento_organico_pct: null, ebitda: 100.9, margen_ebitda_pct: 52.6, bpa: 1.46, vs_consenso: null },
    ],
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 732.7, activo_corriente: null, pasivo_corriente: null, pasivo_total: 261.7, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 99.0, deuda_financiera: 73.1, arrendamientos: 0, patrimonio_neto: 471.0, minoritarios: 0, reservas: null },
      { periodo: '2022', activo_total: 878.7, activo_corriente: null, pasivo_corriente: null, pasivo_total: 358.7, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 124.9, deuda_financiera: 72.1, arrendamientos: 0, patrimonio_neto: 520.0, minoritarios: 0, reservas: null },
      { periodo: '2023', activo_total: 799.9, activo_corriente: null, pasivo_corriente: null, pasivo_total: 260.5, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 25.3, deuda_financiera: 65.4, arrendamientos: 0, patrimonio_neto: 539.4, minoritarios: 0, reservas: null },
      { periodo: '2024', activo_total: 832.0, activo_corriente: null, pasivo_corriente: null, pasivo_total: 260.0, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: 260.8, clientes: 135.4, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 27.4, deuda_financiera: 114.4, arrendamientos: 0, patrimonio_neto: 572.0, minoritarios: 0, reservas: null },
      { periodo: '2025', activo_total: 955.7, activo_corriente: null, pasivo_corriente: null, pasivo_total: 291.3, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: 218.7, clientes: 110.7, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 98.0, deuda_financiera: 121.7, arrendamientos: 0, patrimonio_neto: 664.4, minoritarios: 0, reservas: null },
    ],
    vencimientos: null,
    liquidez: 'Caja neta de 22,5 M a 30-jun-26 (deuda neta de 21,9 M a 31-dic-25); deuda bruta de 121,7 M y caja de 98,0 M a cierre de 2025 [2, 5].',
    rating: 'Sin rating',
    coste_deuda_pct: null, vida_media_anios: null,
    confianza: 'Media',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 149.4, capex: 40.9, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 21.4, recompras: null, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 237.6, capex: 51.4, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 53.6, recompras: null, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 115.1, capex: 55.2, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 69.9, recompras: null, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 138.3, capex: 62.2, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 59.6, recompras: null, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 187.8, capex: 67.8, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 47.9, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    confianza: 'Baja',
  },
  calidad: { auditor: null, anios_auditor: null, opinion: null, confianza: 'Baja' },
  capital: {
    politica: 'Reparte el 35 % del beneficio neto consolidado: 0,9594 EUR por acción con cargo a 2025 (0,9351 con cargo a 2024, 47,9 M pagados en julio de 2025) [10, 11, 12]. Entre 2021 y junio de 2024 ejecutó tres programas de recompra por 300 M; el tercero, terminado en junio de 2024, compró 2.233.466 acciones por 130 M [12]. Prioridades declaradas: capacidad de fabricación (jeringas, viales y cartuchos) y la cartera ISM [14, 19].',
    adquisiciones: [
      { anio: '2026', objetivo: 'Planta de fabricación de Phoenix (Arizona), de Bristol Myers Squibb', importe: null, ev_ebitda: null, financiacion: 'Caja (precio no publicado; según la empresa, menos del 1 % de su capitalización)', resultado: 'Badwill de 62,4 M en el 2T26; contrato de fabricación de cinco años con mínimo de 50 M USD anuales [2, 20].' },
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Resultados del ejercicio 2025, nota de prensa', editor: 'Rovi', tipo: 'Primaria', fecha: '2026-02-25', url: 'https://www.rovi.es/sites/default/files/rovi_results_press_release_vdef_3.pdf' },
    { id: 2, titulo: 'Resultados del primer semestre de 2026, nota de prensa', editor: 'Rovi', tipo: 'Primaria', fecha: '2026-07-23', url: 'https://www.rovi.es/sites/default/files/1s_2026_resultados_nota_de_prensa_def.pdf' },
    { id: 3, titulo: 'Resultados del primer trimestre de 2026, nota de prensa', editor: 'Rovi', tipo: 'Primaria', fecha: '2026-05-06', url: 'https://rovi.es/sites/default/files/1t_2026_resultados_nota_de_prensa_def.pdf' },
    { id: 4, titulo: 'Rovi: cuenta de resultados anual 2021-2025', editor: 'TipRanks', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.tipranks.com/stocks/gb:0ill/financials/income-statement' },
    { id: 5, titulo: 'Rovi: balance anual 2021-2025', editor: 'TipRanks', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.tipranks.com/stocks/es:rovi/financials/balance-sheet' },
    { id: 6, titulo: 'ROVI.MC financials (BPA 2020-2023)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://finance.yahoo.com/quote/ROVI.MC/financials' },
    { id: 7, titulo: 'Financials Laboratorios Farmaceuticos Rovi (capex y FCF 2021-2025)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.marketscreener.com/quote/stock/LABORATORIOS-FARMACEUTICO-157409115/finances/' },
    { id: 8, titulo: 'Financial Ratios Laboratorios Farmaceuticos Rovi (días de cobro e inventario)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.marketscreener.com/quote/stock/LABORATORIOS-FARMACEUTICO-157409115/finances-ratios/' },
    { id: 9, titulo: 'Rovi gana 137 millones en 2024, un 20 % menos, y recorta un 8 % sus ingresos por la vacuna covid', editor: 'Bolsamanía', tipo: 'Prensa', fecha: '2025-02-26', url: 'https://www.bolsamania.com/noticias/empresas/economiaempresas--rovi-gana-137-millones-en-2024-un-20-menos-y-recorta-un-8-sus-ingresos-por-la-vacuna-covid--19005710.html' },
    { id: 10, titulo: 'Rovi gana 140,4 millones de euros en 2025, un 3 % más, y pagará dividendo de 0,9594 euros por acción', editor: 'Bolsamanía', tipo: 'Prensa', fecha: '2026-02-25', url: 'https://www.bolsamania.com/noticias_print/empresas/economia--amp-rovi-gana-1404-millones-de-euros-en-2025-un-3-mas-y-pagara-dividendo-de-09594-euros-por-accion--21821474.html' },
    { id: 11, titulo: 'Rovi aprueba un dividendo de 0,9351 euros por acción y mantiene su guidance para el año', editor: 'Estrategias de Inversión', tipo: 'Prensa', fecha: '2025-06', url: 'https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/rovi-aprueba-un-dividendo-de-09351-euros-por-accion-n-823897' },
    { id: 12, titulo: 'ROVI held its 2025 General Shareholders’ Meeting', editor: 'Rovi', tipo: 'Primaria', fecha: '2025-06', url: 'https://rovi.es/en/node/4170' },
    { id: 13, titulo: 'Rovi gana 84 millones, el doble que hace un año, y eleva los ingresos de fabricación a terceros', editor: 'El Español (Invertia)', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://www.elespanol.com/invertia/observatorios/sanidad/20260723/rovi-gana-millones-doble-ano-eleva-ingresos-fabricacion-terceros/1003744331249_0.html' },
    { id: 14, titulo: 'Laboratorios Farmacéuticos Rovi (ROVI) Q2 2026 earnings summary', editor: 'Quartr', tipo: 'Datos de mercado', fecha: '2026-07-23', url: 'https://quartr.com/events/laboratorios-farmaceuticos-rovi-s-a-rovi-q2-2026_ojfVy307' },
    { id: 15, titulo: 'Laboratorios Rovi stock questioned as one-off gain lifts reported margins', editor: 'Simply Wall St (vía Webull)', tipo: 'Prensa', fecha: '2026-07', url: 'https://www.webull.com/news/15284167123215360' },
    { id: 16, titulo: 'Las acciones de Rovi se desploman más de un 15 % tras presentar resultados', editor: 'XTB', tipo: 'Prensa', fecha: '2026-05-06', url: 'https://www.xtb.com/es/analisis-de-mercado/las-acciones-de-rovi-se-desploman-mas-de-un-15-tras-presentar-resultados' },
    { id: 17, titulo: 'Rovi gana 9,4 millones hasta marzo y rebaja su previsión de ingresos para el año', editor: 'El Español (Invertia)', tipo: 'Prensa', fecha: '2026-05-06', url: 'https://www.elespanol.com/invertia/observatorios/sanidad/20260506/rovi-gana-millones-euros-marzo-rebaja-prevision-ingresos-ano/1003744235073_0.html' },
    { id: 18, titulo: 'Rovi: un primer trimestre flojo puede mostrar una debilidad que sólo es temporal', editor: 'Merca2', tipo: 'Prensa', fecha: '2026-05-05', url: 'https://www.merca2.es/2026/05/05/rovi-trimestre-debilidad-temporal-2376200/' },
    { id: 19, titulo: 'Rovi sube en bolsa y apuesta por el CDMO (capacidades previstas para 2027)', editor: 'Estrategias de Inversión', tipo: 'Prensa', fecha: '2026', url: 'https://www.estrategiasdeinversion.com/actualidad/noticias/empresas/rovi-sube-en-bolsa-y-apuesta-por-el-cdmo-para-n-957561' },
    { id: 20, titulo: 'Rovi acquires pharmaceutical manufacturing plant in Arizona from Bristol Myers Squibb', editor: 'The Corner', tipo: 'Prensa', fecha: '2026', url: 'https://thecorner.eu/?p=122207' },
  ],
  huecos: [
    { seccion: 'financieros', campo: 'amortizaciones, EBIT, resultado financiero e impuestos 2021-2023; coste de ventas 2021-2023; gastos generales', tipo: 'Núcleo', intentos: '1) Notas de resultados de 2021-2023 en rovi.es: la búsqueda solo devuelve cifras de cabecera (ingresos, EBITDA, beneficio); 2) TipRanks y Yahoo: EBITDA, beneficio y BPA, sin EBIT ni impuestos en el extracto; 3) búsqueda de «EBIT» en la nota de 2025: da EBIT 2024-2025 (179,4 y 185,8 M). ' + ENTORNO, decision: 'Calculado y marcado como estimación: amortizaciones 2021-2023 interpoladas (19,0; 21,5; 25,0 M), resultado financiero de −1,5 M al año (caja neta casi nula) e impuestos como diferencia con el beneficio neto publicado.' },
    { seccion: 'balance', campo: 'activo y pasivo corriente, existencias, clientes, proveedores, inmovilizado, intangibles y reservas', tipo: 'Núcleo', intentos: '1) Cuentas anuales 2025 en rovi.es (no se pueden abrir); 2) TipRanks y Fintel: solo totales, caja, deuda y patrimonio; 3) MarketScreener: solo días de cobro (54) y de inventario (321) de 2025. ' + ENTORNO, decision: 'Calculado y marcado como estimación: existencias y clientes de 2024-2025 = días de MarketScreener × coste de ventas o ventas ÷ 365 (2025: 218,7 y 110,7 M); el resto, omitido. Sin proveedores, el circulante está sobrestimado.' },
    { seccion: 'flujos', campo: 'flujo operativo publicado y recompras por año', tipo: 'Núcleo', intentos: '1) Estados de flujos de las cuentas anuales: no accesibles; 2) MarketScreener: capex y FCF 2021-2025; 3) nota de la junta de 2025: recompras acumuladas de 300 M en tres programas sin reparto anual. ' + ENTORNO, decision: 'Calculado y marcado como estimación: flujo operativo = FCF + capex de MarketScreener; dividendos pagados = 35 % del beneficio del año anterior (47,9 M confirmados en 2025); recompras anuales sin dato.' },
    { seccion: 'negocio', campo: 'segmentos 2021-2023 y geografías', tipo: 'Complemento', intentos: '1) Notas de resultados anuales (solo 2024-2025 en el extracto); 2) presentaciones de resultados; 3) prensa (El Español, Bolsamanía): sin desglose geográfico. ' + ENTORNO, decision: 'Omitido' },
    { seccion: 'calidad', campo: 'auditor, años y opinión', tipo: 'Complemento', intentos: '1) Informe anual 2025; 2) IAGC 2025; 3) búsqueda en prensa. ' + ENTORNO, decision: 'Omitido' },
  ],
};
w('A', A);

// ---------------- B. Sector y competencia ----------------
const B = {
  historia: {
    resumen: 'Rovi nace en 1946 en Madrid como laboratorio de la familia López-Belmonte y se especializa en heparinas de bajo peso molecular: desarrolló la bemiparina y, desde 2017, comercializa su biosimilar de enoxaparina en Europa. Salió a bolsa en 2007 y entró en el Ibex 35 en diciembre de 2021, en pleno contrato de fabricación de la vacuna de Moderna, que llevó el beneficio a su máximo en 2022 (199,7 M) [A4, 3]. Desde 2023 la caída de la vacuna se compensa con especialidades (Okedi, la risperidona de liberación prolongada con su tecnología ISM) y con nuevos contratos de llenado de jeringas, más la compra en 2026 de la planta de Phoenix a BMS [A2, A20].',
    hitos: [
      { anio: '1946', hito: 'Fundación del laboratorio en Madrid por la familia López-Belmonte.' },
      { anio: '2007', hito: 'Salida a bolsa en Madrid.' },
      { anio: '2017', hito: 'Lanzamiento del biosimilar de enoxaparina en Europa.' },
      { anio: '2021', hito: 'Fabricación de la vacuna de Moderna y entrada en el Ibex 35 (diciembre) [3].' },
      { anio: '2022', hito: 'Aprobación de Okedi (risperidona ISM) en Europa y beneficio récord de 199,7 M [A4].' },
      { anio: '2024', hito: 'Contrato de llenado de jeringas con una farmacéutica global y tercera recompra (130 M) [A12].' },
      { anio: '2026', hito: 'Compra de la planta de Phoenix (Arizona) a Bristol Myers Squibb con contrato de cinco años [A20].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Rovi tiene dos negocios. Especialidades farmacéuticas (473,9 M en 2025, el 64 % de los ingresos operativos): heparinas de bajo peso molecular (266,8 M: enoxaparina biosimilar en Europa y bemiparina vendida por socios en más de 50 países), los antipsicóticos inyectables de liberación prolongada con tecnología ISM (Okedi, 56,7 M, y Risvan) y una cartera de productos licenciados en España (Neparvis, Volutsa, Orvatez) [A1, A10]. Fabricación a terceros o CDMO (269,6 M): llenado aséptico de jeringas precargadas, viales y cartuchos en Madrid (San Sebastián de los Reyes, Alcalá) y desde abril de 2026 en Phoenix (EE. UU.), para Moderna, una farmacéutica global con un contrato de jeringas firmado en 2024 y BMS [A2, A19, A20].',
    como_gana_dinero: 'Las heparinas y los productos licenciados dan una base estable con margen bruto alto pero presión de precios en licitaciones hospitalarias; Okedi, con patente propia, es la palanca de margen. La CDMO cobra por lote llenado y depende de los volúmenes de cada cliente: con la vacuna de Moderna en 2021-2022 el EBITDA llegó a 281,5 M y con su caída bajó a 207,4 M en 2024 [A4]. Hay mucho apalancamiento operativo: las plantas se construyeron antes de tener la demanda y el margen sube con la ocupación. Estacionalidad marcada: la CDMO y las heparinas pesan más en el segundo semestre (en 2025, el 72 % del beneficio salió del 2S) [A1, A2].',
    clientes: 'Concentración alta en CDMO: Moderna fue el gran cliente de 2021-2024 y hoy pesan el contrato de jeringas con una farmacéutica global (retrasado en 2026 por la autorización regulatoria) y el mínimo de 50 M USD anuales de BMS en Phoenix [A17, A20]. En heparinas vende a hospitales por licitación y a socios internacionales, que en 2026 piden menos por exceso de inventario [A3]. El poder de precios es limitado en heparinas (la dirección habla de «creciente presión competitiva en precios») y mayor en Okedi [A17].',
  },
  sector: {
    definicion: 'Rovi compite en tres mercados: heparinas de bajo peso molecular (mercado mundial de 5.400-9.500 M USD según la fuente, con crecimientos del 5-7 %), antipsicóticos inyectables de liberación prolongada (segmento del mercado de antipsicóticos de 18.500-20.100 M USD que crece al 7,5 % anual) y fabricación aséptica para terceros (llenado de inyectables). Usamos la cifra baja de heparinas (5.400 M USD en 2026, Research and Markets) porque la alta no explica su método [1, 3, 4].',
    tamano: '≈ 5.400 M USD en heparinas de bajo peso molecular (2026) [4]; ≈ 20.100 M USD en antipsicóticos (2025), con los inyectables creciendo al 7,55 % anual 2026-2031 [1].',
    unidad_serie: null, serie: null,
    tcac_historico_pct: null, tcac_previsto_pct: 5.6, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Biosimilares de enoxaparina en hospitales europeos', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Enoxaparina de Rovi +9 % en 2025 (157,7 M), pero presión de precios y caída del 12 % de heparinas en el 1T26 [A1, A3].' },
      { driver: 'Paso a inyectables de liberación prolongada en esquizofrenia', efecto: '+', horizonte: 'Estructural', evidencia: 'Segmento LAI previsto al 7,55 % anual 2026-2031; Okedi +97 % en 2025 [1, A1].' },
      { driver: 'Externalización del llenado aséptico por las grandes farmacéuticas (GLP-1, biológicos)', efecto: '+', horizonte: 'Estructural', evidencia: 'CDMO de Rovi +38 % en el 1S26 y capacidad prevista de 690-880 M de jeringas en 2027 [A2, A19].' },
      { driver: 'Demanda de vacunas de ARN mensajero', efecto: '−', horizonte: 'Cíclico', evidencia: 'Caída de la CDMO en 2023-2025 por la vacuna de Moderna (ingresos −8 % en 2024) [A9].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Heparinas genéricas y biosimilares compiten por precio en licitaciones; la dirección lo cita como causa de la rebaja de 2026 [A17].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Sistemas públicos de salud y unos pocos clientes de CDMO con mucho peso (Moderna, farmacéutica global, BMS) [A20].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'La heparina sale de mucosa porcina, con suministro concentrado en China y precios volátiles [A17].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Las plantas estériles aprobadas por FDA/EMA tardan años y cientos de millones; Rovi lleva desde 2021 ampliando capacidad [A7].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Anticoagulantes orales directos frente a heparinas fuera del hospital; antipsicóticos orales y otros LAI (Invega, Abilify Maintena) frente a Okedi [1].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'La farmacia es poco cíclica: en 2008-09 y 2020 la demanda de heparinas se mantuvo y la covid la aumentó. El ciclo propio de Rovi lo marca la CDMO: pico en 2021-2022 con la vacuna, caída en 2023-2025 y recuperación desde 2026 con nuevos contratos (CDMO +38 % en el 1S26) [A2, A4].' },
    regulacion: 'Los precios de las heparinas en España y Europa los fijan licitaciones hospitalarias y sistemas de precios de referencia. En EE. UU., los aranceles farmacéuticos de 2025-2026 favorecen fabricar allí (la planta de Phoenix) [A20]. El contrato de jeringas con la farmacéutica global depende de una autorización regulatoria pendiente que retrasó su arranque en 2026 [A17].',
    tendencias: 'Las grandes farmacéuticas externalizan el llenado de inyectables (biológicos, GLP-1) y piden plantas en EE. UU.; Rovi gana con ambas cosas si llena su capacidad. En heparinas, los biosimilares baratos y los anticoagulantes orales presionan precios [1, A19].',
    confianza: 'Baja',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Líder en heparinas en España y uno de los principales vendedores de biosimilar de enoxaparina en Europa; pequeño en antipsicóticos LAI frente a J&J y Otsuka/Lundbeck, y fabricante aséptico mediano frente a Lonza, Catalent (Novo) o Recipharm.',
    competidores: [
      { nombre: 'Sanofi (Lovenox)', pais: 'FR', ticker: 'SAN', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Original de la enoxaparina; defiende precio con marca.' },
      { nombre: 'Techdow / Hepalink', pais: 'CN', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Biosimilares chinos de enoxaparina, integrados en materia prima.' },
      { nombre: 'Johnson & Johnson (Invega Sustenna/Trinza)', pais: 'US', ticker: 'JNJ', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en antipsicóticos LAI.' },
      { nombre: 'Lonza', pais: 'CH', ticker: 'LONN', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'CDMO de referencia, mucho mayor.' },
    ],
    foso: { veredicto: 'Estrecho', tendencia: 'Estable', fuentes: [
      { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica.' },
      { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Cambiar de fabricante aséptico exige revalidar ante FDA/EMA; contrato de BMS a cinco años con mínimos [A20].' },
      { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Tecnología ISM patentada (Okedi +97 % en 2025) y bemiparina propia [A1].' },
      { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen bruto del 66,5 % en 2025, pero las heparinas pierden precio [A10].' },
      { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Capacidad prevista de 690-880 M de jeringas en 2027; nicho de llenado europeo [A19].' },
    ] },
    amenazas: 'La principal es el precio de las heparinas (biosimilares chinos y licitaciones), con probabilidad alta. En CDMO, que un cliente grande no llene la capacidad reservada (ya pasó con Moderna y con el retraso de 2026). En Okedi, la competencia de los LAI de J&J, Otsuka y Teva.',
    confianza: 'Baja',
  },
  esg: { calificaciones: null, materialidad: 'Lo material es la calidad y el cumplimiento de normas de fabricación estéril (una carta de advertencia de la FDA pararía la CDMO) y la trazabilidad de la heparina de origen porcino. No hay datos de emisiones accesibles en este entorno.', controversias: 'No se han encontrado sanciones ni litigios relevantes en 2023-2026 en la prensa consultada.', confianza: 'Baja' },
  fuentes: [
    { id: 1, titulo: 'Antipsychotic Drugs Market Size and Share (2026-2031)', editor: 'Mordor Intelligence', tipo: 'Sectorial', fecha: '2026', url: 'https://www.mordorintelligence.com/industry-reports/antipsychotic-drugs-market' },
    { id: 2, titulo: 'Antipsychotic Drugs Market 2025-2035', editor: 'Market Research Future', tipo: 'Sectorial', fecha: '2025', url: 'https://www.marketresearchfuture.com/reports/antipsychotic-drugs-market-2784' },
    { id: 3, titulo: 'Rovi entrará en el Ibex a partir del 20 de diciembre', editor: 'Redacción Médica', tipo: 'Prensa', fecha: '2021-12-09', url: 'https://www.redaccionmedica.com/empresas/industria-farmaceutica/20211209/rovi-entrara-en-el-ibex-partir-del-de-diciembre/176638_0.html' },
    { id: 4, titulo: 'Low Molecular Weight Heparin Market Outlook', editor: 'Research and Markets', tipo: 'Sectorial', fecha: '2026', url: 'https://www.researchandmarkets.com/reports/6242291/low-molecular-weight-heparin-market-outlook' },
  ],
  huecos: [
    { seccion: 'sector', campo: 'serie histórica del mercado, cr5 y cuota de Rovi', tipo: 'Núcleo', intentos: '1) Informes anuales de Rovi (cuota en heparinas): no accesibles; 2) estudios de mercado de heparinas y antipsicóticos: tamaños discrepantes sin serie; 3) IQVIA España: sin acceso. ' + ENTORNO, decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos y margen EBIT de competidores', tipo: 'Núcleo', intentos: '1) Cuentas de Sanofi y J&J (segmentos no comparables); 2) Hepalink/Techdow (sin cifras accesibles); 3) Lonza (sin búsqueda por cupo). ' + ENTORNO, decision: 'Omitido; la comparación de márgenes se hace con los comparables cotizados.' },
  ],
};
w('B', B);

// ---------------- C. Equipo y gobierno ----------------
const C = {
  directivos: {
    equipo: [
      { nombre: 'Juan López-Belmonte Encina', cargo: 'Presidente y consejero delegado', desde: null, participacion_pct: null, trayectoria: 'Tercera generación de la familia fundadora y socio de Norbel Inversiones, que controla el 58,2 % [1, 3]. Ha llevado la transformación hacia CDMO e ISM: ingresos de 381 M en 2019 a 743,5 M en 2025.' },
      { nombre: 'Javier López-Belmonte Encina', cargo: 'Vicepresidente primero y director financiero', desde: null, participacion_pct: null, trayectoria: 'Hermano del presidente; consejero ejecutivo; responsable de la relación con inversores y de las recompras de 300 M de 2021-2024 [A12].' },
      { nombre: 'Iván López-Belmonte Encina', cargo: 'Vicepresidente segundo y director de desarrollo corporativo', desde: null, participacion_pct: null, trayectoria: 'Hermano del presidente; consejero ejecutivo; lleva el desarrollo de negocio y las licencias.' },
    ],
    historial_guidance: [
      { anio: '2026', guia: 'Feb-26: ingresos operativos con crecimiento de un dígito alto a doble dígito bajo; may-26: rebajada a 0-10 % (bajo-medio dígito) [A14, A17].', real: '1S26: +9,4 % en ingresos operativos; guía mantenida en julio [A2].', cumplida: 'Parcial' },
      { anio: '2024', guia: 'Caída de ingresos por la vacuna de Moderna.', real: 'Ingresos operativos −8 % (763,7 M) [A9].', cumplida: 'Sí' },
    ],
    confianza: 'Baja',
  },
  gobierno: {
    consejo: [
      { nombre: 'Juan López-Belmonte Encina', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Javier López-Belmonte Encina', cargo: 'Vicepresidente primero', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Iván López-Belmonte Encina', cargo: 'Vicepresidente segundo', tipo: 'Ejecutivo', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: null, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: null,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    accionistas: [
      { nombre: 'Norbel Inversiones (familia López-Belmonte)', pct: 58.19, tipo: 'Control (familia fundadora)', variacion: 'Bajó desde el 63,1 % de 2019 [1, 2]' },
      { nombre: 'Indumenta Pueri (familia Domínguez, Mayoral)', pct: 11.25, tipo: 'Significativo', variacion: 'Aumentó su participación en 2025 [2, 4]' },
      { nombre: 'Invesco', pct: 1.17, tipo: 'Institucional', variacion: 'n.d.' },
    ],
    insiders: [],
    alertas: ['Ninguna relevante detectada en la prensa consultada; IAGC, IARC y registro de operaciones de directivos de la CNMV no accesibles desde este entorno.'],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'The López-Belmonte family increase their interest in ROVI to 63.1%', editor: 'Rovi', tipo: 'Primaria', fecha: '2019-05', url: 'https://www.rovi.es/en/node/2234' },
    { id: 2, titulo: 'Los dueños de Mayoral suben su participación en Rovi', editor: 'The Objective', tipo: 'Prensa', fecha: '2025-08-11', url: 'https://theobjective.com/economia/2025-08-11/duenos-mayoral-suben-participacion-rovi/' },
    { id: 3, titulo: 'Informe Anual de Gobierno Corporativo 2019', editor: 'Rovi', tipo: 'Primaria', fecha: '2020-02', url: 'https://www.rovi.es/sites/default/files/I.A.G.C.%202019.pdf' },
    { id: 4, titulo: 'Mayoral aumenta sus acciones en Rovi', editor: 'Forbes España', tipo: 'Prensa', fecha: '2025', url: 'https://forbes.es/health/955625/mayoral-aumenta-sus-acciones-en-rovi/' },
  ],
  huecos: [
    { seccion: 'gobierno', campo: 'consejeros externos, comisiones, remuneración del primer ejecutivo y votos de la junta', tipo: 'Núcleo', intentos: '1) IAGC e IARC 2025 en la CNMV y rovi.es: no accesibles; 2) búsqueda de consejeros independientes en prensa: sin lista fiable; 3) acta de la junta de 2026: sin extracto. ' + ENTORNO, decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos de 12 meses', tipo: 'Complemento', intentos: '1) Registro de la CNMV (requiere navegador); 2) búsqueda de prensa; 3) MarketScreener: sin dato. ' + ENTORNO, decision: 'Omitido' },
  ],
};
w('C', C);

// ---------------- D. Mercado y valoración ----------------
// Comparables de la carpeta de Almirall (7-oct-2026, Stock Analysis y MarketScreener), sin Rovi y con Almirall añadida.
const D = {
  identificacion: {
    nombre: 'Laboratorios Farmacéuticos Rovi, S.A.', nombre_corto: 'Rovi', ticker: 'ROVI', isin: 'ES0157261019', mercado: 'Bolsa de Madrid (Mercado Continuo)', indice_referencia: 'Ibex 35',
    pais: 'España', pais_iso: 'ES', sector: 'Salud', industria: 'Farmacéuticas', sede: 'Madrid', fundacion: '1946', empleados: null, web: 'www.rovi.es',
    precio: 58.94, fecha_precio: '2026-10-07', acciones: 51.24, capitalizacion_publicada: 3020, free_float_pct: 30.4,
    max_52s: 86.7, min_52s: 53.1, volumen_medio_diario: null, proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: 'En febrero de 2026 Rovi esperaba que los ingresos operativos crecieran entre un dígito alto y un doble dígito bajo; el 6 de mayo la rebajó a un crecimiento del 0-10 % (de un dígito bajo a medio según la conferencia), con heparinas cayendo un dígito medio, por el retraso del contrato de jeringas con una farmacéutica global (pendiente de autorización) y la presión de precios en heparinas [A14, A17]. La guía se mantuvo el 23 de julio [A2]. Sin guía de margen ni plan a medio plazo publicado; para 2027 la empresa da capacidades (690-880 M de jeringas, 85-110 M de cartuchos y 140-180 M de viales) [A19].',
    estimaciones: [
      { periodo: '2026e', ingresos: 770.2, ebitda: 197.6, ebit: null, bpa: 2.56, dpa: null, fuente: 'MarketScreener (beneficio neto 131,3 M ÷ 51,24 M de acciones) [2, 3]' },
      { periodo: '2027e', ingresos: 890.2, ebitda: 257.3, ebit: null, bpa: 3.40, dpa: null, fuente: 'MarketScreener (174,1 M) [2, 3]' },
      { periodo: '2028e', ingresos: 975.5, ebitda: null, ebit: null, bpa: 4.15, dpa: null, fuente: 'MarketScreener (212,6 M) [2]' },
    ],
    recomendaciones: { n_analistas: null, comprar: null, mantener: null, vender: 0, po_medio: 75.48, po_min: 64.2, po_max: 86.0 },
    revisiones: 'Tras la rebaja de la guía de mayo, las casas recortaron objetivos: Renta 4 bajó de 95 a 86 EUR y luego mantuvo «sobreponderar» con 85 EUR [4, 5]. El consenso de Reuters recoge 75,48 EUR y ninguna recomendación de venta [4]. Una casa citada en prensa subió el BPA de 2027-2030 entre un 4 % y un 11 % por la planta de EE. UU. y el contrato de jeringas [2]. No hay series de revisiones a 3 y 12 meses accesibles.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: null,
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 73.80, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 36.06, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2023', precio_cierre: 60.20, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 62.95, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 63.45, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: {
    empresas: [
      { nombre: 'Galderma', ticker: 'GALD', pais: 'CH', capitalizacion: 40229, ev_ventas: 8.11, ev_ebitda_ltm: 32.8, ev_ebitda_ntm: 22.9, per_ntm: 36.8, crecimiento_pct: 19.3, margen_ebitda_pct: 24.7, roic_pct: 10.28, dn_ebitda: 1.27, fcf_yield_pct: 2.32 },
      { nombre: 'UCB', ticker: 'UCB', pais: 'BE', capitalizacion: 38530, ev_ventas: 5.04, ev_ebitda_ltm: 14.5, ev_ebitda_ntm: 11.8, per_ntm: 17.4, crecimiento_pct: 11.4, margen_ebitda_pct: 34.7, roic_pct: 15.03, dn_ebitda: 0.99, fcf_yield_pct: 4.01 },
      { nombre: 'Ipsen', ticker: 'IPN', pais: 'FR', capitalizacion: 11750, ev_ventas: 2.52, ev_ebitda_ltm: 6.5, ev_ebitda_ntm: 5.9, per_ntm: 11.7, crecimiento_pct: 7.5, margen_ebitda_pct: 38.8, roic_pct: 23.16, dn_ebitda: -0.61, fcf_yield_pct: 10.64 },
      { nombre: 'Recordati', ticker: 'REC', pais: 'IT', capitalizacion: 10870, ev_ventas: 4.73, ev_ebitda_ltm: 12.7, ev_ebitda_ntm: 11.5, per_ntm: 16.5, crecimiento_pct: 7.9, margen_ebitda_pct: 37.1, roic_pct: 15.35, dn_ebitda: 1.91, fcf_yield_pct: 5.52 },
      { nombre: 'Faes Farma', ticker: 'FAE', pais: 'ES', capitalizacion: 1490, ev_ventas: 2.68, ev_ebitda_ltm: 13.3, ev_ebitda_ntm: 10.6, per_ntm: 14.1, crecimiento_pct: 12.6, margen_ebitda_pct: 20.1, roic_pct: 8.57, dn_ebitda: 2.31, fcf_yield_pct: 4.23 },
      { nombre: 'Almirall', ticker: 'ALM', pais: 'ES', capitalizacion: 2190, ev_ventas: 1.93, ev_ebitda_ltm: 8.8, ev_ebitda_ntm: 7.3, per_ntm: 20.2, crecimiento_pct: 6.5, margen_ebitda_pct: 21.9, roic_pct: 3.0, dn_ebitda: -0.2, fcf_yield_pct: 3.4 },
    ],
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: [
    { id: 1, titulo: 'Laboratorios Farmacéuticos Rovi (BME:ROVI) Statistics (capitalización de 3.020 M a 7-oct-2026, vía el informe de Almirall de este repositorio)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://stockanalysis.com/quote/bme/ROVI/statistics/' },
    { id: 2, titulo: 'Finanzas Laboratorios Farmacéuticos Rovi: estimaciones 2026-2028', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://es.marketscreener.com/cotizacion/accion/LABORATORIOS-FARMACEUTICO-115958460/finanzas/' },
    { id: 3, titulo: 'Laboratorios Farmacéuticos Rovi: Financial Data Forecasts Estimates (EBITDA 2026-2027)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://www.marketscreener.com/quote/stock/LABORATORIOS-FARMACEUTICO-388853/finances/' },
    { id: 4, titulo: 'Potencial de más del 25 % para una acción del Ibex 35 en pleno rebote y que nadie aconseja vender', editor: 'Estrategias de Inversión', tipo: 'Analistas', fecha: '2026-08', url: 'https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/potencial-de-mas-del-25-para-una-accion-del-ibex-n-944011' },
    { id: 5, titulo: 'Una farmacéutica española ofrece un potencial… (Renta 4, sobreponderar, 85 EUR)', editor: 'Estrategias de Inversión', tipo: 'Analistas', fecha: '2026-07', url: 'https://www.estrategiasdeinversion.com/analisis/los-brokers-recomiendan/recomendaciones-espana/una-farmaceutica-espanola-ofrece-un-potencial-n-936675' },
    { id: 6, titulo: 'BME:ROVI (rango de objetivos de analistas)', editor: 'TradingView', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://es.tradingview.com/symbols/BME-ROVI/' },
    { id: 7, titulo: 'Laboratorios Farmacéuticos Rovi (ROVI/EUR) Historical Price Data (cierres anuales)', editor: 'Traders Union', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://tradersunion.com/currencies/price-history/rovi-eur/' },
    { id: 8, titulo: 'Rovi market cap y acciones en circulación (51.235.764)', editor: 'TipRanks', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.tipranks.com/stocks/es:rovi/market-cap' },
    { id: 9, titulo: 'Rendimiento del Bund a 10 años (9-oct-2026), serie BBSIS (vía informes de L’Oréal y Moncler de este repositorio)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-09', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
    { id: 10, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 11, titulo: 'Comparables farmacéuticos europeos a 7-oct-2026 (Stock Analysis y MarketScreener), informe de Almirall de este repositorio', editor: 'Stock Analysis / MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://stockanalysis.com/quote/bme/ALM/statistics/' },
    { id: 12, titulo: 'Laboratorios Farmaceuticos Rovi share price (cotizaciones de agosto-octubre de 2026)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://uk.marketscreener.com/quote/stock/LABORATORIOS-FARMACEUTICO-115958460/graphics/' },
  ],
  huecos: [
    { seccion: 'identificacion', campo: 'precio de cierre del 13-oct-2026', tipo: 'Núcleo', intentos: '1) bolsa.mjs (Yahoo) sin red; 2) búsquedas de la cotización de octubre: sin dato del día; 3) capitalización de Stock Analysis a 7-oct (3.020 M) ÷ 51,24 M de acciones = 58,94 EUR, coherente con los 57-59 EUR de MarketScreener a principios de octubre. ' + ENTORNO, decision: 'Calculado y marcado como estimación (precio del 7-oct)' },
    { seccion: 'bolsa', campo: 'rentabilidades, beta, volatilidad, caída máxima y posición corta', tipo: 'Complemento', intentos: '1) bolsa.mjs sin red; 2) WebFetch a Yahoo bloqueado; 3) búsqueda de beta en Stock Analysis y MarketScreener: sin extracto. ' + ENTORNO, decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'operaciones comparables con múltiplo', tipo: 'Complemento', intentos: '1) Compras de CDMO (Catalent por Novo Holdings) sin múltiplo en extracto; 2) compras de especialidades farmacéuticas europeas; 3) el informe de Almirall del repositorio tampoco las tiene. ' + ENTORNO, decision: 'Omitido' },
    { seccion: 'consenso', campo: 'número de analistas y reparto de recomendaciones', tipo: 'Complemento', intentos: '1) MarketScreener consenso; 2) Investing; 3) prensa (solo «ninguno recomienda vender»). ' + ENTORNO, decision: 'Omitido' },
  ],
};
w('D', D);

// ---------------- E. Sentimiento ----------------
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Simply Wall St (narrativas de la comunidad)', fecha: '2026-08', n_comentarios: 2, tono: 'Dividido', resumen: 'Dos valoraciones de usuarios opuestas: una ve la acción cara (valor justo cerca de 51 EUR) por la presión en heparinas y otra barata (cerca de 75 EUR) por la expansión de la CDMO [1].' },
      { plataforma: 'Simply Wall St / Webull (artículo con comentarios)', fecha: '2026-07', n_comentarios: 1, tono: 'Negativo', resumen: 'Cuestiona la calidad del beneficio del 1S26: el margen neto LTM sube al 24 % por el badwill de 62,4 M, no por el negocio [2].' },
      { plataforma: 'Merca2 (análisis y comentarios de lectores)', fecha: '2026-05', n_comentarios: 3, tono: 'Positivo', resumen: 'Lee el 1T26 como una debilidad temporal: el aumento de gastos de I+D y comerciales es deliberado y el 2S debe acelerar [3].' },
      { plataforma: 'XTB (análisis de mercado para particulares)', fecha: '2026-05', n_comentarios: 1, tono: 'Negativo', resumen: 'Desplome de más del 15 % tras la rebaja de la guía; el foco de los particulares está en heparinas y en el retraso del contrato de jeringas [4].' },
      { plataforma: 'Rankia (foro de Laboratorios Rovi)', fecha: '2026-09', n_comentarios: 0, tono: 'Neutro', resumen: 'El buscador solo devuelve la portada del foro, sin hilos legibles; no se usa para el tono [5].' },
    ],
    temas: [
      { tema: 'Calidad del beneficio de 2026 (badwill de Phoenix)', postura: 'Bajista', peso: 'Alto', contraste: 'Tienen razón: sin los 62,4 M, el EBITDA del 1S26 cae un 10 % (58,8 M) [A2, A15]. El informe usa el EBITDA sin badwill.' },
      { tema: 'Heparinas: precios e inventarios de socios', postura: 'Bajista', peso: 'Alto', contraste: 'Coincide con la empresa: heparinas −4 % en el 1S26 y guía de caída de un dígito medio [A2, A14].' },
      { tema: 'Crecimiento de la CDMO (jeringas, Phoenix)', postura: 'Alcista', peso: 'Medio', contraste: 'Los datos lo apoyan (CDMO +38 % en el 1S26), pero el contrato de jeringas sigue pendiente de autorización [A2, A17].' },
      { tema: 'La acción ya ha corregido (−30 % desde abril)', postura: 'Alcista', peso: 'Medio', contraste: 'Cotiza a 23x el BPA de 2025, en la mediana de 2023-2025: barata frente a su historia solo si 2027 cumple [D7].' },
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Laboratorios Farmacéuticos Rovi (BME:ROVI): narrativas de la comunidad', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://simplywall.st/stock/bme/rovi' },
    { id: 2, titulo: 'Laboratorios Rovi (BME:ROVI) stock questioned as one-off gain lifts reported margins', editor: 'Simply Wall St (vía Webull)', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://www.webull.com/news/15284167123215360' },
    { id: 3, titulo: 'Rovi: un primer trimestre flojo puede mostrar una debilidad que sólo es temporal', editor: 'Merca2', tipo: 'Foros y redes', fecha: '2026-05-05', url: 'https://www.merca2.es/2026/05/05/rovi-trimestre-debilidad-temporal-2376200/' },
    { id: 4, titulo: 'Las acciones de Rovi se desploman más de un 15 % tras presentar resultados', editor: 'XTB', tipo: 'Foros y redes', fecha: '2026-05-06', url: 'https://www.xtb.com/es/analisis-de-mercado/las-acciones-de-rovi-se-desploman-mas-de-un-15-tras-presentar-resultados' },
    { id: 5, titulo: 'Foro de Laboratorios Rovi (ROVI)', editor: 'Rankia', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.rankia.com/acciones/laboratorios-rovi-rovi' },
  ],
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit, Stocktwits, Seeking Alpha y hilos de Rankia', tipo: 'Complemento', intentos: '1) Búsqueda de Rovi en Seeking Alpha, Reddit y Stocktwits: sin hilos; 2) búsqueda de opiniones en Rankia y foros españoles: solo la portada; 3) búsqueda de comentarios de lectores de julio-septiembre: solo prensa. ' + ENTORNO, decision: 'Omitido' },
  ],
};
w('E', E);
console.log('notas A-E escritas');

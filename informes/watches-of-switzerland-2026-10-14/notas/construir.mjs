// Escribe las notas A-E (hechos con fuente) de Watches of Switzerland, corte 2026-10-14.
// Entorno nube: solo WebSearch. Cifras de los extractos de búsqueda de los comunicados citados.
// Base de las cuentas: la de la propia empresa en sus indicadores (ajustada y ANTES de NIIF 16): el alquiler va dentro del EBITDA
// y los arrendamientos NO van a la deuda (ver limitaciones en propio).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const w = (n, o) => fs.writeFileSync(path.join(dir, n + '.json'), JSON.stringify(o, null, 2));

const nullBal = { activo_corriente: null, pasivo_corriente: null, pasivo_total: null, fondo_comercio: null, intangibles: null, inmovilizado_material: null, clientes: null, activos_contrato: null, pasivos_contrato: null, minoritarios: 0, reservas: null };

// ---------- A. Cuentas ----------
const A = {
  _estado: 'terminado (parcial: entorno nube)',
  negocio: {
    segmentos: [],
    geografias: [ { nombre: 'Estados Unidos', peso_pct: 51 }, { nombre: 'Reino Unido y Europa', peso_pct: 49 } ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Ventas del grupo (M GBP)', valor_anterior: '1.651,5 (FY25)', valor_actual: '1.827,9 (FY26, 53 semanas)', variacion: '+11 % (+13 % a tipo constante)', comentario: 'Récord; EE. UU. pasa a ser el primer mercado [1, 11].' },
      { kpi: 'Ventas en EE. UU. (M USD)', valor_anterior: 'n.d.', valor_actual: '1.240 (FY26)', variacion: '+24 % a tipo constante', comentario: 'Más de la mitad de las ventas del grupo [11].' },
      { kpi: 'Margen EBIT ajustado', valor_anterior: '9,1 % (FY25)', valor_actual: '8,5 % (FY26)', variacion: '−60 pb', comentario: 'Mezcla hacia EE. UU. y aranceles; guía FY27 de +40 a +80 pb [1, 13].' },
      { kpi: 'Conversión en caja libre', valor_anterior: '51 % (FY25)', valor_actual: '80 % (FY26)', variacion: '+29 puntos', comentario: 'Guía FY27 de ≈70 % [1, 12].' },
      { kpi: 'Peso de los relojes de lujo en ventas', valor_anterior: 'n.d.', valor_actual: '82 % (FY26)', variacion: null, comentario: 'Rolex, Patek Philippe, Audemars Piguet, Cartier, Omega, Tudor [14].' },
    ],
  },
  financieros: {
    cuenta: [
      { periodo: 'FY2022', ingresos: 1234, coste_ventas: null, gastos_generales: null, ebitda: null, amortizaciones: null, ebit: 130, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 0, beneficio_neto: 100.0, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.418, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 239.3 },
      { periodo: 'FY2023', ingresos: 1543, coste_ventas: null, gastos_generales: null, ebitda: null, amortizaciones: null, ebit: 165, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 0, beneficio_neto: 125.4, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.527, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 237.9 },
      { periodo: 'FY2024', ingresos: 1538, coste_ventas: null, gastos_generales: null, ebitda: null, amortizaciones: null, ebit: 135, resultado_financiero: null, bai: null, impuestos: null, minoritarios: 0, beneficio_neto: 89.8, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.380, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 236.4 },
      { periodo: 'FY2025', ingresos: 1651.5, coste_ventas: null, gastos_generales: null, ebitda: 192.3, amortizaciones: 42.3, ebit: 150, resultado_financiero: -13.6, bai: 136.4, impuestos: 38.2, minoritarios: 0, beneficio_neto: 98.2, gastos_financieros: 13.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.416, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 236.0 },
      { periodo: 'FY2026', ingresos: 1827.9, coste_ventas: null, gastos_generales: null, ebitda: 202.2, amortizaciones: 47.2, ebit: 155, resultado_financiero: -11.4, bai: 143.6, impuestos: 38.6, minoritarios: 0, beneficio_neto: 105.0, gastos_financieros: 11.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.452, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 232.4 },
    ],
    ltm: { periodo: 'LTM may-26 (FY2026)', fecha_fin: '2026-05-03', ingresos: 1827.9, ebitda: 202.2, ebit: 155, beneficio_neto: 105.0, bpa: 0.452, dpa: 0, dpa_extraordinario: 0, fcf: 161.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [ { periodo: 'FY2025', descripcion: 'Compras de Roberto Coin Inc. (distribución en EE. UU.) y de joyerías en EE. UU. (Hodinkee, Deutsch & Deutsch) en FY25-FY26: la deuda neta subió a 96 M GBP en FY25 [4, 1].' } ],
    comentario: 'Las ventas pasaron de 1.234 M GBP en FY2022 a 1.827,9 M en FY2026 (53 semanas), con un FY2024 plano (1.538 M) por la normalización del mercado de relojes de lujo tras la pandemia y un repunte desde FY2025 apoyado en EE. UU., que ya es más de la mitad de las ventas (1.240 M USD, +24 % a tipo constante en FY26) [1, 6, 11]. El margen EBIT ajustado tocó máximo en FY2023 (10,7 %), cayó al 8,8 % en FY2024 por menor apalancamiento operativo y aperturas, subió al 9,1 % en FY2025 y bajó al 8,5 % en FY2026 por la mezcla (más EE. UU. y joyería de menor margen) y los aranceles a los relojes suizos [5, 6, 4, 13]. La guía FY27 pide +40 a +80 pb de margen y un 5-10 % de crecimiento a tipo constante [1, 12].',
    ajustes: 'Se usan las cifras ajustadas y antes de NIIF 16 que la empresa publica como indicadores (EBITDA, EBIT y BPA ajustados), porque la guía, la deuda neta y la conversión en caja se dan en esa base. Las ajustadas excluyen partidas excepcionales (deterioros de tiendas y de fondo de comercio en el Reino Unido, costes de adquisiciones), que hundieron el BPA estatutario a 25,0 p en FY24 y 22,8 p en FY25 frente a 38,0 p y 41,6 p ajustados; en FY26 el estatutario (42,6 p) casi converge con el ajustado (45,2 p) [1, 4]. El beneficio neto ajustado es estimación propia: BPA ajustado × acciones medias deducidas del beneficio y el BPA estatutarios.',
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: null, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1S26', ingresos: null, crecimiento_pct: 10, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '2S26', ingresos: null, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En los resultados de FY26 (14 de julio de 2026) la dirección destacó un año récord, con EE. UU. como motor (+24 % a tipo constante) y el Reino Unido de nuevo en crecimiento (+5 %), y mantuvo la guía de FY27: crecimiento del 5-10 % a tipo constante, +40 a +80 pb de margen EBIT ajustado, capex de 60-70 M GBP y conversión de caja de ≈70 % [1, 11, 13]. El EBIT ajustado (155 M) superó la guía de 152-155 M que se dio en mayo y el consenso previo de 148,4 M que citaba Jefferies [11, 15]. Los analistas preguntaron por el efecto de los aranceles de EE. UU. a los relojes suizos (39 % desde agosto de 2025), por la asignación de Rolex y por el preowned certificado; la dirección no comentó las conversaciones con posibles compradores que Reuters publicó la víspera [13, 16]. En la actualización de la junta (3 de septiembre de 2026) dijo que las 17 semanas hasta el 30 de agosto siguieron la tendencia y reiteró la guía [12].',
    confianza: 'Baja',
  },
  balance: {
    historico: [
      { periodo: 'FY2022', activo_total: null, ...nullBal, existencias: null, proveedores: null, caja: null, deuda_financiera: null, arrendamientos: 0, patrimonio_neto: null },
      { periodo: 'FY2023', activo_total: null, ...nullBal, existencias: null, proveedores: null, caja: null, deuda_financiera: null, arrendamientos: 0, patrimonio_neto: null },
      { periodo: 'FY2024', activo_total: null, ...nullBal, existencias: null, proveedores: null, caja: null, deuda_financiera: null, arrendamientos: 0, patrimonio_neto: null },
      { periodo: 'FY2025', activo_total: 1475.6, ...nullBal, existencias: 447.4, proveedores: 259.5, caja: 96.6, deuda_financiera: 192.8, arrendamientos: 0, patrimonio_neto: null },
      { periodo: 'FY2026', activo_total: 1461.1, ...nullBal, existencias: 458.1, proveedores: 251.2, caja: 63.5, deuda_financiera: 120.5, arrendamientos: 0, patrimonio_neto: 628.7 },
    ],
    vencimientos: [],
    liquidez: 'Deuda neta antes de NIIF 16 de 57,0 M GBP a 3-may-2026 (96,2 M un año antes); préstamos de 120,5 M; caja ≈63,5 M (estimación: préstamos − deuda neta) [1, 2].',
    rating: 'Sin rating',
    coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: 'Pasivos por arrendamiento de 427,6 M GBP a 3-may-2026 (454,6 M en FY25), con 83,9 M de pagos e intereses de 25,5 M en FY26; derechos de uso de 338,2 M [1]. Con NIIF 16 la deuda neta es de 483,0 M [1]. En este informe el alquiler se trata como gasto de explotación (base antes de NIIF 16), igual que la guía y la deuda neta de la empresa, y por eso los arrendamientos no entran en el puente: sumarlos y no quitar el alquiler del EBITDA los contaría dos veces.',
    comentario: 'Las existencias (458,1 M GBP, 25 % de las ventas) son el gran activo de circulante y subieron solo 10,7 M en FY26 pese al +11 % de ventas, por la compra de Deutsch & Deutsch y la joyería de diamante de laboratorio [1]. Los proveedores bajaron a 251,2 M. La deuda neta antes de NIIF 16 cayó de 96,2 a 57,0 M por una caja libre de 161,7 M, después de 13 M de recompras [1, 3].',
    confianza: 'Baja',
  },
  flujos: {
    historico: [
      { periodo: 'FY2026', flujo_operativo: 227.7, capex: 66, pagos_arrendamientos: 0, adquisiciones: null, desinversiones: 0, dividendos: 0, recompras: 13, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    comentario: 'La caja libre (definición de la empresa, después de alquileres y capex) fue de 112 M GBP en FY22, 146 M en FY23, 118 M en FY24, 98 M en FY25 y 161,7 M en FY26, con una conversión sobre el EBITDA ajustado del 80 % en FY26 frente al 51 % de FY25 [1, 4, 5]. El flujo operativo de FY26 (227,7 M) es estimación propia: caja libre + capex (≈66 M, que la empresa describe como de expansión dentro de una guía de 60-70 M anuales) [1, 7]. La empresa no separa capex de mantenimiento; con amortizaciones de 47 M, la parte de crecimiento sería de unos 20 M (estimación propia).',
    confianza: 'Baja',
  },
  calidad: {
    auditor: null, anios_auditor: null, opinion: 'Favorable (informe anual 2026 publicado el 3-ago-2026 sin salvedades conocidas)',
    comentario: 'La distancia entre el BPA estatutario y el ajustado fue grande en FY24 (25,0 p frente a 38,0 p) y FY25 (22,8 p frente a 41,6 p) por deterioros de tiendas y fondo de comercio en el Reino Unido y costes de compras, y casi desaparece en FY26 (42,6 p frente a 45,2 p) [1, 4]. Que los ajustes se concentren en años malos es una señal a vigilar, pero son deterioros sin caja. Con un balance incompleto (solo FY25-FY26), el motor no puede calcular Altman, Piotroski ni Beneish con fiabilidad: no se interpretan.',
    senales: [ { senal: 'Excepcionales recurrentes en FY24-FY25', nivel: 'Media', comentario: 'Deterioros en el Reino Unido y costes de adquisiciones: el BPA ajustado casi duplicó el estatutario dos años seguidos [1, 4].' } ],
    confianza: 'Baja',
  },
  capital: {
    politica: 'No paga dividendo: la caja va a aperturas y reformas de showrooms (capex de 60-70 M GBP al año), a compras en EE. UU. y a recompras. Completó un programa de recompra de 25 M GBP en junio de 2025 (13 M dentro de FY26) [1, 14]. No hay un programa nuevo anunciado a la fecha de corte.',
    adquisiciones: [
      { anio: 'FY2025', objetivo: 'Roberto Coin Inc. (distribuidor en EE. UU. de la marca de joyería)', importe: null, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Integrada; la deuda neta subió a 96 M en FY25 [4].' },
      { anio: 'FY2026', objetivo: 'Deutsch & Deutsch (joyero de Texas)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Explica parte de la subida de existencias [1].' },
    ],
    comentario: 'La empresa ha crecido con caja propia y sin dividendos; sus compras son pequeñas y en EE. UU. Los deterioros de FY24-FY25 en el Reino Unido indican que parte del capex de expansión de 2021-2023 rindió menos de lo previsto. La recompra de 25 M en 2025 se hizo a 355-453 p, muy por debajo del precio actual [14].',
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'FY26 Results (53 semanas a 3-may-2026)', editor: 'Watches of Switzerland Group', tipo: 'Primaria', fecha: '2026-07-14', url: 'https://www.thewosgroupplc.com/media/spwhxg4u/wosg-fy26-results-statement-final.pdf' },
    { id: 2, titulo: 'FY26 Results (RNS)', editor: 'Investegate', tipo: 'Primaria', fecha: '2026-07-14', url: 'https://www.investegate.co.uk/announcement/rns/watches-of-switzerland-group--wosg/fy26-results/9666649' },
    { id: 3, titulo: 'FY26 Results (copia del comunicado)', editor: 'MarketScreener', tipo: 'Primaria', fecha: '2026-07-14', url: 'https://www.marketscreener.com/news/watches-of-switzerland-fy26-results-press-release--ce7f5edcdf89f120' },
    { id: 4, titulo: 'FY25 Results', editor: 'Watches of Switzerland Group', tipo: 'Primaria', fecha: '2025-07-03', url: 'https://www.thewosgroupplc.com/media/qbkp2c0z/fy25-wosg-results.pdf' },
    { id: 5, titulo: 'FY23 Results (RNS)', editor: 'Investegate', tipo: 'Primaria', fecha: '2023-07-13', url: 'https://www.investegate.co.uk/announcement/rns/watches-of-switzerland-group--wosg/fy23-results-/7629618' },
    { id: 6, titulo: "Watches of Switzerland's FY24 revenues up but profit drops", editor: 'FashionUnited', tipo: 'Prensa', fecha: '2024-06-27', url: 'https://fashionunited.uk/news/business/watches-of-switzerlands-fy24-revenues-up-but-profit-drops/2024062776356' },
    { id: 7, titulo: 'Watches of Switzerland FY26 slides: US overtakes UK as top market', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-07-14', url: 'https://www.investing.com/news/company-news/watches-of-switzerland-fy26-slides-us-overtakes-uk-as-top-market-93CH-4789976' },
    { id: 8, titulo: 'Watches of Switzerland financial summary', editor: 'Investing.com', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://uk.investing.com/equities/watches-of-switzerland-group-plc-financial-summary' },
    { id: 9, titulo: 'Watches of Switzerland Group (LON:WOSG) Revenue', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/lon/WOSG/revenue/' },
    { id: 10, titulo: 'H1 FY26 Results', editor: 'Watches of Switzerland Group', tipo: 'Primaria', fecha: '2025-12-04', url: 'https://www.thewosgroupplc.com/media/3enbieez/wosg-h1-fy26-rns-vfinal.pdf' },
    { id: 11, titulo: 'FY26 Trading Update', editor: 'Watches of Switzerland Group', tipo: 'Primaria', fecha: '2026-05-14', url: 'https://www.thewosgroupplc.com/media/jfjhgnef/wosg-fy26-trading-update-rns-vfinal.pdf' },
    { id: 12, titulo: 'AGM Trading Update', editor: 'Watches of Switzerland Group', tipo: 'Primaria', fecha: '2026-09-03', url: 'https://www.thewosgroupplc.com/media/1xah51o3/wosg-agm-trading-update.pdf' },
    { id: 13, titulo: 'Earnings call transcript: Watches of Switzerland posts record H2 2026 sales', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-07-14', url: 'https://www.investing.com/news/transcripts/earnings-call-transcript-watches-of-switzerland-posts-record-h2-2026-sales-93CH-4789939' },
    { id: 14, titulo: 'Transaction in Own Shares (marzo de 2025)', editor: 'Investegate', tipo: 'Primaria', fecha: '2025-03', url: 'https://www.investegate.co.uk/announcement/rns/watches-of-switzerland-group--wosg/transaction-in-own-shares/8797048' },
    { id: 15, titulo: 'Watches of Switzerland FY adjusted EBIT seen ahead of previous guidance', editor: 'Sharecast', tipo: 'Prensa', fecha: '2026-05-14', url: 'https://www.sharecast.com/news/news-and-announcements/watches-of-switzerland--22487642.html' },
    { id: 16, titulo: 'Exclusive: Watches of Switzerland held talks over potential takeover offers (Reuters)', editor: 'Reuters (vía WHBL)', tipo: 'Prensa', fecha: '2026-07-13', url: 'https://whbl.com/2026/07/13/exclusive-watches-of-switzerland-held-talks-over-potential-takeover-offers-sources-say/' },
  ],
  huecos: [
    { seccion: 'financieros', campo: 'EBITDA, amortizaciones, resultado financiero e impuestos FY2022-FY2024; coste de ventas y gastos generales de todos los años', tipo: 'Núcleo', intentos: '1) Comunicados FY23-FY26 de la web de la empresa: la red solo deja buscar, no abrir los PDF; 2) Investegate y MarketScreener: los extractos dan solo cabeceras; 3) Investing y Stock Analysis: solo ingresos, resultado de explotación y beneficio en otra base', decision: 'Omitido' },
    { seccion: 'balance', campo: 'balance FY2022-FY2024 y patrimonio FY2025; activo y pasivo corriente, fondo de comercio, clientes', tipo: 'Núcleo', intentos: '1) Comunicados de resultados FY23-FY25 (PDF no accesible); 2) Simply Wall St y Stockopedia: solo FY26; 3) Investing: solo cabeceras', decision: 'Omitido' },
    { seccion: 'flujos', campo: 'flujo operativo y capex FY2022-FY2025', tipo: 'Núcleo', intentos: '1) Comunicados de resultados: solo la caja libre (112, 146, 118 y 98 M); 2) MarketScreener: guía de capex; 3) prensa: sin desglose', decision: 'Omitido (la caja libre se da en el comentario)' },
    { seccion: 'trimestres', campo: 'ventas y EBIT de los semestres', tipo: 'Complemento', intentos: '1) H1 FY26 RNS (no se abre); 2) FashionUnited: solo +10 % en 1S26; 3) Yahoo transcript: sin cifras', decision: 'Omitido' },
  ],
};
w('A', A);

// ---------- B. Sector y competencia ----------
const B = {
  historia: {
    resumen: 'Watches of Switzerland Group nace del grupo Aurum, dueño de Goldsmiths, Mappin & Webb y Watches of Switzerland en el Reino Unido, que compró el fondo Apollo en 2013. Con Brian Duffy como consejero delegado desde 2014 se centró en relojes de lujo de marcas de asignación limitada (Rolex, Patek Philippe, Audemars Piguet), entró en EE. UU. con la compra de Mayors en 2017 y salió a bolsa en Londres en 2019. Entre 2021 y 2023 vivió el auge del reloj de lujo; desde 2024 la normalización del mercado, la compra de Bucherer por Rolex y los aranceles de EE. UU. a Suiza la han puesto a prueba [3, 4].',
    hitos: [
      { anio: '2013', hito: 'Apollo compra el grupo Aurum.' },
      { anio: '2017', hito: 'Compra de Mayors (Florida): entrada en EE. UU.' },
      { anio: '2019', hito: 'Salida a bolsa en Londres.' },
      { anio: '2022', hito: 'Máximo histórico en bolsa (≈1.440 p en enero) [D13].' },
      { anio: '2023', hito: 'Rolex compra Bucherer, competidor en distribución.' },
      { anio: '2025', hito: 'Aranceles de EE. UU. del 39 % a los productos suizos desde agosto [4, 5].' },
      { anio: '2026', hito: 'EE. UU. supera al Reino Unido en ventas; Reuters publica conversaciones con posibles compradores (13-jul) [3].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Minorista de relojes de lujo y joyería con unos 186 showrooms en el Reino Unido y EE. UU. a septiembre de 2026, de ellos 75 boutiques monomarca, y venta en línea. Marcas: Watches of Switzerland, Mappin & Webb, Goldsmiths (Reino Unido); Mayors, Betteridge y Analog:Shift (EE. UU.). Los relojes de lujo son el 82 % de las ventas, con Rolex como primer proveedor; el resto es joyería (propia y de terceros, como Roberto Coin) y servicios [1].',
    como_gana_dinero: 'Compra relojes a las marcas con un margen de distribución fijado por ellas y los vende a precio de catálogo: no hay descuentos en las marcas de asignación limitada, que tienen listas de espera. El margen bruto depende de la mezcla (relojes frente a joyería) y el EBIT, del apalancamiento sobre alquileres y personal de tiendas caras. La asignación de producto la decide cada marca, sobre todo Rolex: es el factor de volumen principal. Las aperturas y reformas de showrooms exigen 60-70 M GBP de capex al año. El negocio no es recurrente, pero las listas de espera dan visibilidad.',
    clientes: 'Clientes particulares de renta alta: sin concentración de clientes. La concentración está en los proveedores: Rolex (incluido Tudor) supera, según la prensa, la mitad de las ventas, y Rolex es a la vez competidor desde que compró Bucherer en 2023 [2]. Poder de precios: las marcas suben precios cada año (Rolex subió en 2025 en EE. UU. para cubrir parte del arancel) y el minorista mantiene su margen porcentual; la empresa no fija el precio [4].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'Distribución minorista de relojes suizos de lujo en el Reino Unido y EE. UU. No hay una estadística pública del mercado minorista; se usa como referencia la exportación de relojes suizos (Federación de la Industria Relojera, FH), que mide el mercado mayorista. No se encontró una segunda fuente con cifras en el entorno de esta sesión.',
    tamano: null, unidad_serie: null, serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Demanda de EE. UU. de relojes de lujo', efecto: '+', horizonte: 'Estructural', evidencia: 'Ventas de la empresa en EE. UU. +24 % a tipo constante en FY26 [A11].' },
      { driver: 'Aranceles de EE. UU. a Suiza', efecto: '−', horizonte: 'Cíclico', evidencia: '39 % desde el 1-ago-2025; las marcas subieron precios y el margen EBIT bajó 60 pb en FY26 [4, 5].' },
      { driver: 'Integración vertical de las marcas (Rolex-Bucherer, boutiques propias)', efecto: '−', horizonte: 'Estructural', evidencia: 'Rolex compró Bucherer en 2023 [2].' },
      { driver: 'Mercado de segunda mano certificado', efecto: '+/−', horizonte: 'Estructural', evidencia: 'La empresa lo ve como área de crecimiento [2].' },
      { driver: 'Fiscalidad del Reino Unido (fin del tax-free para turistas)', efecto: '−', horizonte: 'Estructural', evidencia: 'Riesgo citado por interactive investor [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Pocos distribuidores autorizados por ciudad; compiten Bucherer (Rolex), boutiques propias de las marcas y joyeros independientes.' },
      { fuerza: 'Poder de los clientes', intensidad: 1, justificacion: 'Sin descuentos en las marcas con lista de espera.' },
      { fuerza: 'Poder de los proveedores', intensidad: 5, justificacion: 'Rolex decide asignación, margen, ubicaciones y formato de tienda, y es competidor.' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hace falta la autorización de las marcas, que es escasa.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Venta directa de las marcas y segunda mano.' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'Tras el auge de 2021-2022 y la normalización de 2023-2024 (exportaciones suizas a la baja, precios de segunda mano hundidos), FY25-FY26 muestran recuperación en EE. UU. y estabilización en el Reino Unido [A12]. En 2008-09 y 2020 el sector cayó con fuerza y se recuperó en uno-dos años.' },
    regulacion: 'Aranceles de EE. UU. a Suiza (39 % desde agosto de 2025) y fin del IVA reembolsable para turistas en el Reino Unido desde 2021, que restó ventas de turistas en Londres [4, 1].',
    tendencias: 'Más venta directa de las marcas, mayor peso del segunda mano certificado y desplazamiento de la demanda hacia EE. UU. La empresa gana con EE. UU. y con el preowned; pierde si Rolex amplía su red propia (Bucherer).',
    confianza: 'Baja',
  },
  competencia: {
    cuota_pct: null, posicion: 'Mayor distribuidor de Rolex del Reino Unido y uno de los mayores de EE. UU.',
    competidores: [
      { nombre: 'Bucherer (Rolex)', pais: 'Suiza', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Propiedad de Rolex desde 2023; red en Europa y EE. UU. (Tourneau).' },
      { nombre: 'Signet Jewelers', pais: 'EE. UU.', ticker: 'SIG', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Joyería de gama media; poco peso en relojes de lujo.' },
      { nombre: 'Chow Tai Fook', pais: 'Hong Kong', ticker: '1929.HK', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Joyería y relojes en Asia.' },
      { nombre: 'Boutiques propias de las marcas (Richemont, Swatch)', pais: 'Suiza', ticker: 'CFR / UHR', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Integración vertical creciente.' },
    ],
    foso: { veredicto: 'Estrecho', tendencia: 'Estable', fuentes: [
      { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica.' },
      { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Listas de espera y relación con el cliente, pero transferibles.' },
      { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Las autorizaciones de distribución de Rolex, Patek y AP son escasas y no se compran.' },
      { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'Margen fijado por las marcas.' },
      { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Mayor red de showrooms del Reino Unido; ROCE del 18 % en FY26 [A7].' },
    ] },
    amenazas: 'La mayor es que Rolex (o Patek/AP) reduzca la asignación o abra más tiendas propias tras comprar Bucherer: probabilidad media a cinco años. Le siguen una caída de la demanda en EE. UU. y los aranceles.',
    confianza: 'Baja',
  },
  esg: { calificaciones: [], materialidad: 'Lo material es el abastecimiento responsable de diamantes y oro, la seguridad de las tiendas y la dependencia de proveedores; no se encontraron calificaciones con fecha en esta sesión.', controversias: 'Sin controversias relevantes encontradas.', confianza: 'Baja' },
  fuentes: [
    { id: 1, titulo: 'ii view: Watches of Switzerland maintains growth forecasts', editor: 'interactive investor', tipo: 'Prensa', fecha: '2026-09-03', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-watches-switzerland-maintains-growth-forecasts-ii540183' },
    { id: 2, titulo: 'A compelling compounder at a retailer’s multiple', editor: 'Simply Wall St', tipo: 'Prensa', fecha: '2026', url: 'https://www.simplywall.st/narratives/z8su2ltg-a-compelling-compounder-at-a-retailers-multiple' },
    { id: 3, titulo: 'Top UK Rolex seller surges after report of takeover offers', editor: 'Swissinfo / Bloomberg', tipo: 'Prensa', fecha: '2026-07-13', url: 'https://www.swissinfo.ch/eng/top-uk-rolex-seller-surges-after-report-of-takeover-offers/91739255' },
    { id: 4, titulo: 'Business as usual for Watches of Switzerland and Swatch Group despite US tariff hike', editor: 'WatchPro', tipo: 'Prensa', fecha: '2025-08', url: 'https://usa.watchpro.com/business-as-usual-for-watches-of-switzerland-and-swatch-group-despite-us-tariff-hike/' },
    { id: 5, titulo: 'Swiss luxury watchmakers drop after Trump tariff shock', editor: 'Reuters (vía Yahoo)', tipo: 'Prensa', fecha: '2025-08-04', url: 'https://finance.yahoo.com/news/swiss-luxury-watchmakers-drop-trump-083202539.html' },
  ],
  huecos: [
    { seccion: 'sector', campo: 'tamaño y serie del mercado', tipo: 'Núcleo', intentos: '1) FH (exportaciones suizas): sin acceso; 2) informes de Deloitte/Morgan Stanley: sin cifras en extractos; 3) prensa: sin cifra fiable del mercado minorista', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos y márgenes de competidores, cuota', tipo: 'Núcleo', intentos: '1) Bucherer no publica; 2) cuentas de Signet y Chow Tai Fook no abiertas; 3) sin presupuesto de búsquedas', decision: 'Omitido' },
  ],
};
w('B', B);

// ---------- C. Equipo y gobierno ----------
const C = {
  directivos: {
    equipo: [
      { nombre: 'Brian Duffy', cargo: 'Consejero delegado', desde: '2014', participacion_pct: null, trayectoria: 'Dirige el grupo desde antes de la salida a bolsa; llevó la entrada en EE. UU. y la apuesta por las marcas de asignación limitada. Según Reuters atendió a los posibles compradores porque cree que la bolsa infravalora la empresa [4].' },
      { nombre: 'Anders Romberg', cargo: 'Director financiero', desde: null, participacion_pct: null, trayectoria: 'Firma la actualización de la junta de septiembre de 2026 [5].' },
      { nombre: 'Paul Edgecliffe-Johnson', cargo: 'Consejero independiente', desde: '2026', participacion_pct: null, trayectoria: 'Nombrado el 19-feb-2026; miembro de auditoría, remuneración, nombramientos y ESG [2]. Compró 7.450 acciones en septiembre de 2026 [3].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'Crecimiento del 6-10 % a tipo constante (jul-2025); EBIT ajustado de 152-155 M (may-2026)', real: '+13 % a tipo constante; EBIT ajustado de 155 M', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Ventas de 1.670-1.730 M GBP (jul-2024)', real: '1.651,5 M', cumplida: 'No' },
      { anio: 'FY2028 (plan a largo plazo)', guia: 'Duplicar ventas y beneficio para 2028 (plan de 2023)', real: 'La empresa planea abandonar el objetivo, según Bloomberg', cumplida: 'No' },
    ],
    comentario: 'Equipo estable con el mismo consejero delegado desde 2014. Cumplió la guía de FY26 tras fallar la de ventas de FY25 y abandonar el objetivo a largo plazo de duplicar el negocio para 2028. Que el consejero delegado haya atendido a posibles compradores es una señal de que la dirección ve la acción barata, y también de que no descarta una venta.',
    confianza: 'Baja',
  },
  gobierno: {
    consejo: [ { nombre: 'Paul Edgecliffe-Johnson', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría y riesgos, Remuneración, Nombramientos, ESG' } ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'No se pudo leer el informe de remuneraciones del informe anual 2026 (publicado el 3-ago-2026) [1].',
    accionistas: [],
    insiders: [ { fecha: '2026-09', persona: 'Paul Edgecliffe-Johnson (consejero)', operacion: 'Compra', acciones: 7450, importe: null } ],
    control_y_defensas: 'Sin accionista de control conocido desde que Apollo vendió su participación; una acción, un voto (sociedad anónima inglesa sujeta al Takeover Code). Reuters informó el 13-jul-2026 de conversaciones con fondos de capital riesgo y compradores estratégicos para excluirla de bolsa, y de que la empresa pedía bastante más de 7,50 GBP por acción; no hubo oferta formal [4].',
    alertas: [ 'Conversaciones de exclusión de bolsa publicadas por Reuters (jul-2026) sin anuncio formal bajo el Takeover Code [4].' ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Annual Financial Report (informe anual 2026 y convocatoria de la junta)', editor: 'Investegate', tipo: 'Primaria', fecha: '2026-08-03', url: 'https://www.investegate.co.uk/announcement/rns/watches-of-switzerland-group--wosg/annual-financial-report/9701733' },
    { id: 2, titulo: 'Appointment of Non-Executive Director', editor: 'LSE (RNS)', tipo: 'Primaria', fecha: '2026-02-19', url: 'https://www.lse.co.uk/rns/WOSG/appointment-of-non-executive-director-idf95d79ehrw9rz.html' },
    { id: 3, titulo: 'Insider Paul Edgecliffe-Johnson buys 7,450 shares', editor: 'Defense World', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://www.defenseworld.net/2026/09/23/watches-of-switzerland-group-lonwosg-insider-paul-edgecliffe-johnson-buys-7450-shares-of-stock.html' },
    { id: 4, titulo: 'Exclusive: Watches of Switzerland held talks over potential takeover offers (Reuters)', editor: 'Reuters (vía WHBL)', tipo: 'Prensa', fecha: '2026-07-13', url: 'https://whbl.com/2026/07/13/exclusive-watches-of-switzerland-held-talks-over-potential-takeover-offers-sources-say/' },
    { id: 5, titulo: 'AGM Trading Update', editor: 'Watches of Switzerland Group', tipo: 'Primaria', fecha: '2026-09-03', url: 'https://www.thewosgroupplc.com/media/1xah51o3/wosg-agm-trading-update.pdf' },
  ],
  huecos: [
    { seccion: 'gobierno', campo: 'consejo completo, accionistas significativos, votos de remuneración y remuneración del consejero delegado', tipo: 'Núcleo', intentos: '1) Informe anual 2026 (PDF no accesible); 2) RNS de resultados de la junta: no apareció; 3) MarketScreener/Stockopedia: sin extracto', decision: 'Omitido' },
  ],
};
w('C', C);

// ---------- D. Mercado y valoración ----------
const D = {
  identificacion: {
    nombre: 'Watches of Switzerland Group PLC', nombre_corto: 'Watches of Switzerland', ticker: 'WOSG', isin: 'GB00BJDQQ870', mercado: 'London Stock Exchange (Main Market)', indice_referencia: 'FTSE 250',
    pais: 'Reino Unido', pais_iso: 'GB', sector: 'Consumo discrecional', industria: 'Distribución especializada', sede: 'Londres', fundacion: '1924', empleados: null, web: 'https://www.thewosgroupplc.com',
    precio: 6.735, fecha_precio: '2026-10-13', acciones: 233.5, capitalizacion_publicada: null, free_float_pct: null,
    max_52s: 8.015, min_52s: 3.58, volumen_medio_diario: null, proximos_resultados: '2026-12-10',
  },
  consenso: {
    guidance: 'Guía FY27 (52 semanas, antes de NIIF 16, orgánica), dada el 14-jul-2026 y reiterada el 3-sep-2026: crecimiento de ventas del 5-10 % a tipo constante, margen EBIT ajustado +40 a +80 pb sobre el 8,5 % de FY26, capex de 60-70 M GBP y conversión de caja libre de ≈70 % [A1, A12]. El objetivo de largo plazo de duplicar ventas y beneficio para 2028 se va a abandonar, según Bloomberg [6].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 1996, ebitda: null, ebit: null, bpa: 0.50, dpa: 0, fuente: 'MarketScreener (beneficio neto 116,3 M ÷ 233,5 M acciones, estimación propia del BPA) y Stockopedia (51 p) [7, 2]' },
      { periodo: 'FY2028e', ingresos: null, ebitda: null, ebit: null, bpa: 0.55, dpa: 0, fuente: 'MarketScreener (beneficio neto 128,5 M ÷ 233,5 M acciones); Stocksguide da 50 p [7, 6]' },
    ],
    recomendaciones: { n_analistas: null, comprar: null, mantener: null, vender: null, po_medio: 7.00, po_min: null, po_max: 8.50 },
    revisiones: 'Los objetivos subieron con fuerza en 2026: Jefferies pasó de 440 a 740 p (rebajando a Mantener por valoración), RBC a 800 p, UBS a 850 p y Barclays mantiene Comprar [4, 5, 9]. El objetivo medio ronda los 697-709 p según el proveedor [5]. Solo hay una fuente con estimaciones de beneficio de los dos ejercicios (MarketScreener, en beneficio neto); Stocksguide da un BPA de FY28 menor (50 p).',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: null,
  multiplos_historicos: {
    serie: [
      { anio: 'FY2022', precio_cierre: null, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2023', precio_cierre: 7.785, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2024', precio_cierre: 3.32, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2025', precio_cierre: 3.40, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2026', precio_cierre: 6.445, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Los precios de cierre de ejercicio son aproximados (no hay histórico accesible en este entorno): FY23, cota inferior por el máximo de julio de 2026 (778,5 p, «el más alto desde mayo de 2023») [10]; FY24, mínimo de cinco años del verano de 2024 (332 p) [13]; FY25, ≈340 p tras la caída de abril de 2025 [12]; FY26, cierre previo a la actualización del 14-may-2026 (644,5 p) [8]. PER sobre BPA ajustado: ≈14,8x, 8,7x, 8,2x y 14,3x.',
    confianza: 'Baja',
  },
  comparables: {
    criterio: 'Grupos cotizados de relojería y joyería de lujo: Richemont y Movado (marcas), Signet y Chow Tai Fook (minoristas de joyería). Swatch y Pandora no tienen PER fiable en esta sesión. No hay un minorista de relojes de lujo cotizado comparable: Bucherer es de Rolex.',
    empresas: [
      { nombre: 'Richemont', ticker: 'CFR.SW', pais: 'CH', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 22.2, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Signet Jewelers', ticker: 'SIG', pais: 'US', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 9.7, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Movado', ticker: 'MOV', pais: 'US', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 16.0, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Chow Tai Fook', ticker: '1929.HK', pais: 'HK', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 12.3, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
    ],
    comentario: 'Mediana del PER de los próximos 12 meses: 14,2x (Richemont 22,2x, Movado 16,0x, Chow Tai Fook 12,3x, Signet 9,7x) [15, 16, 17]. Watches of Switzerland cotiza a ≈13x nuestro BPA de FY27e: en línea con los minoristas y muy por debajo de las marcas, lo lógico para un distribuidor cuyo margen fijan sus proveedores. Fechas y proveedores distintos: confianza baja.',
    confianza: 'Baja',
  },
  transacciones: null,
  fuentes: [
    { id: 1, titulo: 'Share price information', editor: 'Watches of Switzerland Group', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://www.thewosgroupplc.com/investors/share-price-information/' },
    { id: 2, titulo: 'WOSG — Watches of Switzerland share price', editor: 'Stockopedia', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.stockopedia.com/share-prices/watches-of-switzerland-LON:WOSG/' },
    { id: 3, titulo: 'WOSG.L', editor: 'eToro', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://www.etoro.com/markets/WOSG.L' },
    { id: 4, titulo: 'Jefferies cuts Watches of Switzerland on fading valuation upside', editor: 'Investing.com', tipo: 'Analistas', fecha: '2026', url: 'https://www.investing.com/news/stock-market-news/jefferies-cuts-watches-of-switzerland-on-fading-valuation-upside-shares-down-3-4785520' },
    { id: 5, titulo: 'Watches of Switzerland Group (BST:5WS) — analistas', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10', url: 'https://stockanalysis.com/quote/bst/5WS/' },
    { id: 6, titulo: 'Watches Of Switzerland Group stock forecast', editor: 'Stocksguide', tipo: 'Analistas', fecha: '2026-10', url: 'https://stocksguide.com/en/forecast/Watches-Of-Switzerland-Group-GB00BJDQQ870' },
    { id: 7, titulo: 'Watches of Switzerland Group: Financial data, forecasts, estimates', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10', url: 'https://www.marketscreener.com/quote/stock/WATCHES-OF-SWITZERLAND-GR-61661923/finances/' },
    { id: 8, titulo: 'WOSG quote', editor: 'ticker.app', tipo: 'Datos de mercado', fecha: '2026-05-14', url: 'https://www.ticker.app/lse/WOSG' },
    { id: 9, titulo: 'Barclays keeps their Buy rating on Watches of Switzerland', editor: 'The Globe and Mail', tipo: 'Analistas', fecha: '2026-10-02', url: 'https://www.theglobeandmail.com/investing/markets/stocks/WOSGF/pressreleases/4458165/barclays-keeps-their-buy-rating-on-watches-of-switzerland-group-plc-wosg/' },
    { id: 10, titulo: 'Exclusive: Watches of Switzerland held talks over potential takeover offers (Reuters)', editor: 'Reuters (vía WHBL)', tipo: 'Prensa', fecha: '2026-07-13', url: 'https://whbl.com/2026/07/13/exclusive-watches-of-switzerland-held-talks-over-potential-takeover-offers-sources-say/' },
    { id: 11, titulo: 'UK 10 year yield', editor: 'thetrading.tools', tipo: 'Datos de mercado', fecha: '2026-08-19', url: 'https://www.thetrading.tools/uk-10-year-yield' },
    { id: 12, titulo: 'Watches of Switzerland Group: quick update', editor: 'Asym Ventures (Substack)', tipo: 'Prensa', fecha: '2025-05', url: 'https://asymventures.substack.com/p/watches-of-switzerland-group-quick' },
    { id: 13, titulo: 'Business as usual for Watches of Switzerland and Swatch Group despite US tariff hike', editor: 'WatchPro', tipo: 'Prensa', fecha: '2025-08', url: 'https://usa.watchpro.com/business-as-usual-for-watches-of-switzerland-and-swatch-group-despite-us-tariff-hike/' },
    { id: 14, titulo: 'Implied ERP by month (oct-2026: 4,20 %)', editor: 'Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 15, titulo: 'SIG vs. CFRUY: Which stock is the better value option?', editor: 'Zacks (vía Nasdaq)', tipo: 'Datos de mercado', fecha: '2026', url: 'https://www.nasdaq.com/articles/sig-vs-cfruy-which-stock-better-value-option' },
    { id: 16, titulo: 'Movado Group valuation metrics', editor: 'Seeking Alpha', tipo: 'Datos de mercado', fecha: '2026-04-02', url: 'https://seekingalpha.com/symbol/MOV/valuation/metrics' },
    { id: 17, titulo: 'Chow Tai Fook Jewellery Group (CJEWF)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-08', url: 'https://stockanalysis.com/quote/otc/CJEWF/' },
  ],
  huecos: [
    { seccion: 'bolsa', campo: 'rentabilidades, beta, volatilidad, caída máxima, posición corta', tipo: 'Complemento', intentos: '1) bolsa.mjs (Yahoo): sin red; 2) Investing/LSE históricos: no se abren; 3) búsqueda: solo cifras sueltas', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'operaciones precedentes con múltiplo', tipo: 'Complemento', intentos: '1) Rolex-Bucherer (2023): precio no publicado; 2) otras compras de minoristas de relojes: sin múltiplos; 3) sin presupuesto de búsquedas', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'capitalización, EV/EBITDA, crecimiento y márgenes; Swatch y Pandora', tipo: 'Núcleo', intentos: '1) MarketScreener (no abre); 2) Zacks/Seeking Alpha/Stock Analysis: solo PER; 3) búsqueda de Swatch y Pandora: sin dato', decision: 'Solo PER de cuatro comparables' },
  ],
};
w('D', D);

// ---------- E. Sentimiento ----------
const E = {
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'interactive investor (análisis y comentarios)', fecha: '2026-09', n_comentarios: 5, tono: 'Positivo', resumen: 'La acción venía +40 % en el año antes de la junta; se ve el negocio en EE. UU. sólido y la fiscalidad británica como riesgo [1].' },
      { plataforma: 'Option Finance (prensa francesa)', fecha: '2026-09', n_comentarios: 0, tono: 'Neutro', resumen: 'Recogida de beneficios tras una actualización «sin sorpresas» [2].' },
      { plataforma: 'Simply Wall St (narrativas de usuarios)', fecha: '2026-08', n_comentarios: 10, tono: 'Positivo', resumen: 'Narrativas que la ven como «compounder a múltiplo de minorista» y que siguen las subidas de objetivo de diez analistas; dudan de la dependencia de Rolex tras Bucherer [3, 4].' },
      { plataforma: 'Prensa de joyería y relojería (Centurion, WatchPro)', fecha: '2026-07', n_comentarios: 0, tono: 'Positivo', resumen: 'El foco es la posible exclusión de bolsa y los resultados récord [5].' },
    ],
    temas: [
      { tema: 'Posible OPA o exclusión de bolsa', postura: 'Alcista', peso: 'Alto', contraste: 'Reuters habló de conversaciones y de un precio pedido «bastante superior a 7,50 GBP» [C4]; no hay oferta formal tres meses después: es una opción, no una base de valoración.' },
      { tema: 'Dependencia de Rolex (Bucherer)', postura: 'Dividida', peso: 'Medio', contraste: 'Rolex es la mayor marca y competidor; el informe lo trata como primer riesgo.' },
      { tema: 'Aranceles de EE. UU.', postura: 'Dividida', peso: 'Medio', contraste: 'El margen EBIT bajó 60 pb en FY26; la guía FY27 espera recuperarlo [A1].' },
      { tema: 'Valoración tras doblar en un año', postura: 'Dividida', peso: 'Medio', contraste: 'Jefferies rebajó a Mantener por valoración [D4]; nuestro PER base (11,5x) es inferior al actual.' },
    ],
    lectura: 'El sentimiento es positivo y ha mejorado con los resultados récord y los rumores de OPA, pero no es eufórico: la junta de septiembre trajo recogida de beneficios. La conversación descuenta en parte una oferta, lo que crea un riesgo a la baja si no llega. No contradice a los analistas, que suben objetivos con más cautela en la recomendación. No se pudo leer Reddit, Stocktwits ni LSE Chat desde este entorno.',
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'ii view: Watches of Switzerland maintains growth forecasts', editor: 'interactive investor', tipo: 'Foros y redes', fecha: '2026-09-03', url: 'https://www.ii.co.uk/analysis-commentary/ii-view-watches-switzerland-maintains-growth-forecasts-ii540183' },
    { id: 2, titulo: 'Watches of Switzerland confirme ses prévisions mais cède aux prises de profits', editor: 'Option Finance', tipo: 'Prensa', fecha: '2026-09-03', url: 'https://www.optionfinance.fr/info-financiere-en-continu/d/2026-09-03-watches-of-switzerland-confirme-ses-previsions-mais-cede-aux-prises-de-profits.html' },
    { id: 3, titulo: 'A compelling compounder at a retailer’s multiple (narrativa)', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026', url: 'https://www.simplywall.st/narratives/z8su2ltg-a-compelling-compounder-at-a-retailers-multiple' },
    { id: 4, titulo: '10 analysts have raised their price target for Watches of Switzerland (comunidad)', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026', url: 'https://simplywall.st/community/narratives/gb/retail/lse-wosg/watches-of-switzerland-group-shares/rtrrdqkr-wosg-sector-tailwinds-and-measured-risk-will-shape-us-expansion-strategy/updates/10-analysts-have-raised-their-price-target-for-watches-of-switz' },
    { id: 5, titulo: 'Watches of Switzerland reports strong results after takeover talks surface', editor: 'Centurion Jewelry', tipo: 'Prensa', fecha: '2026-07', url: 'https://news.centurionjewelry.com/articles/detail/watches-of-switzerland-reports-strong-results-after-takeover-talks-surface' },
  ],
  huecos: [ { seccion: 'sentimiento', campo: 'Reddit, Stocktwits, LSE Chat', tipo: 'Complemento', intentos: '1) búsqueda Reddit: sin hilos; 2) Stocktwits: sin resultados; 3) LSE Chat/ADVFN: no accesibles', decision: 'Omitido' } ],
};
w('E', E);
console.log('notas A-E escritas');

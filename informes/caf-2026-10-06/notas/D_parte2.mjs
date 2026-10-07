// Completa transacciones y huecos en D.json (después de D_parte1.mjs). Añade fuentes a continuación.
import { readFileSync, writeFileSync } from 'node:fs';
const P = new URL('./D.json', import.meta.url);
const D = JSON.parse(readFileSync(P, 'utf8'));
const F = D.fuentes.filter(f => f.id <= 21);
const add = (titulo, editor, tipo, fecha, url) => { const id = F.length + 1; F.push({ id, titulo, editor, tipo, fecha, url }); return id; };
const tBomb = add('Alstom Completes €4.4 Billion Acquisition of Bombardier Transportation (nota del despacho asesor de Alstom)', 'Cleary Gottlieb', 'Prensa', '2021-01', 'https://www.clearygottlieb.com/news-and-insights/news-listing/alstom-completes-4-4-billion-acquisition-of-bombardier-transportation');
const tGts = add('Hitachi Rail enters into agreement to acquire Thales Ground Transportation Systems business (nota de prensa)', 'Hitachi', 'Primaria', '2021-08-04', 'https://www.hitachi.com/New/cnews/month/2021/08/210804.pdf');
const tKb = add('Alstom completes sale of North American signal business to Knorr-Bremse', 'Trains News Wire', 'Prensa', '2024-09-03', 'https://www.trains.com/trn/news-reviews/news-wire/alstom-completes-sale-of-north-american-signal-business-to-knorr-bremse/');
const tEv = add('Wabtec to Acquire Evident\'s Inspection Technologies Division (nota de prensa)', 'Wabtec', 'Primaria', '2025-01-14', 'https://www.wabteccorp.com/newsroom/press-releases/wabtec-to-acquire-evident-s-inspection-technologies-division');
const tDel = add('Wabtec to Acquire Dellner Couplers (nota de prensa)', 'Wabtec', 'Primaria', '2025-03-18', 'https://www.wabteccorp.com/newsroom/press-releases/wabtec-to-acquire-dellner-couplers');
const tIv = add('De Brauw advises Iveco Group on the recommended public offer by Tata Motors and the concurrent sale of its defence business, together valued at EUR 5.5bn', 'De Brauw Blackstone Westbroek', 'Prensa', '2025-07-31', 'https://www.debrauw.com/matters/de-brauw-advises-iveco-group-on-the-recommended-public-offer-by-tata-motors-and-the-concurrent-sale-of-its-defence-business-together-valued-at-eur-5-5bn');
const tTal = add('Sidenor, Gobierno vasco, BBK y Vital cierran la compra del 29,7 % de Talgo por 156 millones de euros', 'elDiario.es', 'Prensa', '2025-11-07', 'https://www.eldiario.es/euskadi/sidenor-gobierno-vasco-bbk-vital-cierran-compra-30-talgo-156-millones-euros_1_12749561.amp.html');
const tSol = add('Informe anual 2019 de CAF (cuentas consolidadas 2019 con la combinación de negocios de Solaris de 2018)', 'CAF / CNMV', 'Primaria', '2020-02', 'https://www.cnmv.es');
const tIvMs = add('Iveco Group: cotización, capitalización y estimaciones (ratios de valoración)', 'MarketScreener', 'Datos de mercado', '2026-10-06', 'https://www.marketscreener.com/quote/stock/IVECO-GROUP-N-V-131301260/valuation/');
const sBce = 11, sMsTalgo = 14;

D.transacciones = {
  operaciones: [
    { fecha: '2021-01', objetivo: 'Bombardier Transportation', comprador: 'Alstom', ev: 5500, ev_ventas: null, ev_ebitda: null, prima_pct: null,
      comentario: `Precio de referencia de 5.500 M EUR (parte baja del rango de 5.500-5.900 M), libre de caja y deuda; Alstom pagó 4.400 M tras 1.100 M de ajuste por la caja neta negativa de Bombardier Transportation a 31-dic-2020 [${tBomb}]. Múltiplos no publicados en el documento leído.` },
    { fecha: '2021-08', objetivo: 'Thales Ground Transportation Systems (señalización ferroviaria)', comprador: 'Hitachi Rail', ev: 1660, ev_ventas: 1.04, ev_ebitda: null, prima_pct: null,
      comentario: `Valor empresa de 1.660 M EUR; ventas de 1.600 M EUR en 2020 (EV/ventas calculado); Hitachi estimaba un EV/EBIT «forward» de unas 10x al cierre [${tGts}]. Anuncio del 4-ago-2021.` },
    { fecha: '2024-04', objetivo: 'Alstom Signaling North America (señalización convencional)', comprador: 'Knorr-Bremse', ev: 648, ev_ventas: null, ev_ebitda: null, prima_pct: null,
      comentario: `Precio de unos 690 M USD (648 M EUR al tipo del BCE del 19-abr-2024, 1,0653), anunciado en abril y cerrado en septiembre de 2024; parte del plan de desinversiones de 2.000 M de Alstom [${tKb}, ${sBce}]. Ventas y márgenes no publicados en el documento leído.` },
    { fecha: '2025-01', objetivo: 'Evident Inspection Technologies (inspección industrial)', comprador: 'Wabtec', ev: 1737, ev_ventas: 4.11, ev_ebitda: 12.0, prima_pct: null,
      comentario: `1.780 M USD (1.737 M EUR al BCE del 14-ene-2025, 1,0245); ventas esperadas de 2024 de unos 433 M USD y EBITDA de 112 M (margen 25,9 %): 15,9x el EBITDA de 2024; Wabtec publica 12,0x el EBITDA proyectado de 2025 ajustado por costes, beneficios fiscales y 25 M USD de sinergias [${tEv}, ${sBce}]. No es material rodante: referencia de componentes y servicios de alto margen.` },
    { fecha: '2025-03', objetivo: 'Dellner Couplers (enganches y conexiones de trenes de pasajeros)', comprador: 'Wabtec', ev: 879, ev_ventas: 3.84, ev_ebitda: 12.5, prima_pct: null,
      comentario: `960 M USD en efectivo (879 M EUR al BCE del 18-mar-2025, 1,0918); ventas esperadas de 2025 de unos 250 M USD (EV/ventas calculado); 12,5x el EBITDA proyectado de 2025 ajustado por costes de la operación y 22 M USD de sinergias [${tDel}, ${sBce}]. Vendedor: EQT (no verificado en el documento leído).` },
    { fecha: '2025-07', objetivo: 'Iveco Defence (vehículos militares)', comprador: 'Leonardo', ev: 1700, ev_ventas: null, ev_ebitda: null, prima_pct: null,
      comentario: `Valor empresa de 1.700 M EUR, anunciado a la vez que la oferta de Tata Motors sobre Iveco, que está condicionada a la separación del negocio de defensa [${tIv}].` },
    { fecha: '2025-07', objetivo: 'Iveco Group (camiones y autobuses, sin defensa)', comprador: 'Tata Motors', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null,
      comentario: `OPA voluntaria recomendada por todas las acciones de Iveco por unos 3.800 M EUR (valor de las acciones, no valor empresa); con la venta de defensa, unos 5.500 M EUR para los accionistas [${tIv}]. Iveco cotizaba a 14,30 EUR el 6-oct-2026 [${tIvMs}]: la oferta seguía pendiente a la fecha de corte (prima y calendario no verificados en un documento original). Incluye Iveco Bus, competidor directo de Solaris.` },
    { fecha: '2025-11', objetivo: 'Talgo (29,76 % del capital)', comprador: 'Consorcio de Sidenor, Gobierno Vasco (Finkatuz), BBK y Vital', ev: 930, ev_ventas: 1.39, ev_ebitda: null, prima_pct: null,
      comentario: `Compra del 29,76 % a Pegaso (Trilantic) y otros minoritarios por 156,67 M EUR, a 4,25 EUR por acción; el organismo público aporta además 45 M a una ampliación de capital [${tTal}]. Estimación propia: 100 % de las acciones ≈ 526 M (156,67 / 0,2976) + deuda neta de 404 M a 31-dic-2024 (MarketScreener) ≈ 930 M de valor empresa, 1,39x las ventas de 2024 (669 M) [${tTal}, ${sMsTalgo}]. Paquete minoritario sin OPA y con EBITDA de 2024 negativo: no es un precio de control.` },
    { fecha: '2018-09', objetivo: 'Solaris Bus & Coach (autobuses)', comprador: 'CAF', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null,
      comentario: `Contraprestación de 197,98 M EUR por el 100 % de las acciones; activos netos adquiridos (definitivos) 105,54 M y fondo de comercio 92,44 M; consolidada desde el 4-sep-2018 [${tSol}]. Fuera de la ventana de 5-7 años; sirve de referencia del precio que pagó la propia CAF por su segmento de autobuses. Valor empresa no publicado de forma limpia en la nota (tabla de pasivos financieros desordenada en el PDF).` }
  ],
  comentario: null,
  confianza: 'Media',
  extra: {
    hechos: `Con múltiplo publicado o calculable a partir de cifras publicadas: Thales GTS 1,04x ventas [${tGts}]; Evident 4,11x ventas y 12,0x EBITDA proyectado con sinergias [${tEv}]; Dellner 3,84x ventas y 12,5x EBITDA proyectado con sinergias [${tDel}]; Talgo 1,39x ventas (estimación propia, paquete minoritario) [${tTal}]. Los múltiplos de Wabtec son de componentes de alto margen (EBITDA del 25,9 % en Evident) y llevan sinergias: no se trasladan a un fabricante de material rodante con margen EBITDA del ≈ 8 %.`,
    caf_objetivo: 'Hechos de accionariado relevantes para una operación sobre CAF (de identificacion.extra): Cartera Social 23,12 %, BBK 13,23 %, Fundació Daniel Bravo Andreu 5,23 %, Indumenta Pueri 5,02 % e Instituto Vasco de Finanzas 3,00 % a 30-jun-2026 [1]: ≈ 50 % en manos estables y vascas. El caso Talgo muestra la intervención de las instituciones vascas para mantener un fabricante ferroviario bajo control local [' + tTal + '].'
  }
};

D.huecos = [
  { seccion: 'consenso', campo: 'revisiones (cambio de las estimaciones de BPA y EBITDA en 3 y 12 meses)', tipo: 'Núcleo',
    intentos: '1) MarketScreener, página «consensus-revisions» de CAF: los gráficos se cargan con JavaScript y la descarga no trae los datos; 2) web de CAF «Cobertura y consenso»: solo publica el consenso del 1S26 (20-jul-2026), no la serie anual; 3) contraste de precios objetivo: la lista de CAF (20-jul) y MarketScreener (6-oct) muestran al menos una subida (máximo de 80,0 a 87,5 EUR), pero no la revisión de BPA/EBITDA',
    decision: 'Omitido (solo hechos indirectos en consenso.extra: sorpresa del 1S26 y subida del precio objetivo máximo)' },
  { seccion: 'consenso', campo: 'recomendaciones (desglose a la fecha de corte)', tipo: 'Complemento',
    intentos: '1) MarketScreener: da 9 analistas, media 73,95 y rango 60,00-87,50, pero el desglose comprar/mantener/vender se dibuja con JavaScript; 2) web de CAF: desglose completo de 13 entidades, pero a 20-jul-2026; 3) Investing/Stock Analysis no consultados por presupuesto',
    decision: 'Se usa la lista de CAF del 20-jul-2026 (13 analistas) y MarketScreener como contraste en consenso.extra' },
  { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento',
    intentos: '1) CNMV, notificaciones de posiciones cortas de CAF (ES0121975009): la página no muestra ninguna posición publicada (≥ 0,5 %); 2) búsqueda de un listado consolidado de posiciones cortas de la CNMV: no aparece un fichero descargable; 3) Stock Analysis (estadísticas de CAF): no da posición corta para valores españoles',
    decision: 'Omitido (ninguna posición ≥ 0,5 % publicada; dicho en bolsa.extra)' },
  { seccion: 'multiplos_historicos', campo: 'ev_ebitda_ntm y per_ntm por año', tipo: 'Complemento',
    intentos: '1) MarketScreener (valoración de CAF): da múltiplos del mismo ejercicio, no de los 12 meses siguientes; 2) web de CAF: publica «cotización media/EBITDA ajustado» y PER sobre cotización media del año, tampoco NTM; 3) Yahoo/Investing: sin series históricas gratuitas de múltiplos a futuro',
    decision: 'Omitido (el motor calcula los LTM con los precios de cierre; los del proveedor van en multiplos_historicos.extra)' },
  { seccion: 'transacciones', campo: 'múltiplos de Alstom-Bombardier Transportation, Knorr-Bremse-Alstom Signaling NA y Tata-Iveco (prima)', tipo: 'Complemento',
    intentos: '1) notas de prensa de Alstom y Hitachi en sus webs: 404 en las URL probadas; 2) Railway Gazette y Railway Age: 503 y 403; Knorr-Bremse (EQS): página sin texto; 3) prensa secundaria (Cleary Gottlieb, Trains, De Brauw): dan el precio pero no las ventas ni el EBITDA del objetivo ni la prima de Tata',
    decision: 'Omitido (múltiplos a null; precio y fuente en el comentario de cada operación)' },
  { seccion: 'comparables', campo: 'LTM a 30-jun-2026 de los comparables', tipo: 'Complemento',
    intentos: '1) MarketScreener, tablas semestrales: el texto descargado solo trae la anual y la trimestral, con el EBITDA trimestral vacío en la mayoría; 2) Stock Analysis: da EV y ROIC de 12 meses pero no el EBITDA del mismo proveedor que el NTM; 3) informes semestrales de cada comparable: fuera de presupuesto',
    decision: 'Calculado y marcado como estimación: LTM = último ejercicio cerrado (2025; Alstom a mar-2026), igual para todos' }
];
D.fuentes = F;
writeFileSync(P, JSON.stringify(D, null, 2));
console.log('ok', F.length);

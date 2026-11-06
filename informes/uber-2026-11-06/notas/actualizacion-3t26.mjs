// Iteración del 6-nov-2026 tras los resultados del 3T26 (4-nov-2026): actualiza las notas A, C, D, E y F copiadas de
// uber-2026-10-28 con el 10-Q y el comunicado del 3T26, la conferencia, el consenso posterior y las noticias.
// Se ejecuta UNA vez (node notas/actualizacion-3t26.mjs) sobre las notas copiadas; reescribe los JSON.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const aqui = dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(readFileSync(join(aqui, f), 'utf8'));
const guarda = (f, j) => writeFileSync(join(aqui, f), JSON.stringify(j, null, 2) + '\n', 'utf8');
const A = lee('A.json'), C = lee('C.json'), D = lee('D.json'), E = lee('E.json'), F = lee('F.json');
if (A._iteracion === '2026-11-06') { console.log('Ya aplicada'); process.exit(0); }

// ---------------- A: cuentas ----------------
for (const f of A.fuentes) f.titulo = f.titulo.replace('tÃ©rminos', 'términos');
A.fuentes.push(
  { id: 18, titulo: 'Uber Technologies, Form 10-Q 3T26 (30-sep-2026)', editor: 'Uber Technologies / SEC', tipo: 'Primaria', fecha: '2026-11-04', url: 'https://www.sec.gov/Archives/edgar/data/1543151/000154315126000041/uber-20260930.htm' },
  { id: 19, titulo: 'Uber Announces Results for Third Quarter 2026 (8-K, anexo 99.1)', editor: 'Uber Technologies / SEC', tipo: 'Primaria', fecha: '2026-11-04', url: 'https://www.sec.gov/Archives/edgar/data/1543151/000154315126000039/uberq326earningspressrelea.htm' },
  { id: 20, titulo: 'Uber Technologies (UBER) Q3 2026 earnings call transcript and summary (4-nov-2026)', editor: 'Gloom (transcripción de la conferencia)', tipo: 'Primaria', fecha: '2026-11-04', url: 'https://gloom.sh/stocks/uber/transcripts/q3-2026' },
);
// Trimestres: los 8 últimos (4T24-3T26). EBITDA = resultado de explotación GAAP + amortizaciones (criterio de la serie).
A.trimestres.items = A.trimestres.items.filter((t) => t.periodo !== '3T24');
A.trimestres.items.push({ periodo: '3T26', ingresos: 14766, crecimiento_pct: 9.6, crecimiento_organico_pct: null, ebitda: 1659, margen_ebitda_pct: 11.2, bpa: 0.25, vs_consenso: 'En línea' });
A.trimestres.ultima_presentacion = 'En el 2T26 (5-ago-26) el discurso giró hacia la inversión: la compra de Delivery Hero, la plataforma de vehículos autónomos y la IA; la recompra cayó a 510 M en el trimestre [3, 16]. En el 3T26 (4-nov-26) el mensaje fue «crecer con beneficio» con un matiz nuevo: Mobility creció por debajo de lo previsto porque la oferta de conductores no siguió a la demanda en Brasil, India y Canadá (combustible caro por la guerra de Oriente Medio y cambios migratorios), y la dirección invierte en captar y retener conductores; dice que las horas de oferta mejoraron en octubre [19, 20]. Reservas brutas de 59.819 M (+20 % a tipo constante; Mobility +17 %, Delivery +23 %), 215 millones de consumidores activos al mes, 55 millones de socios de Uber One y flujo libre de 10.400 M en doce meses [19, 20].\n\nLos analistas preguntaron por la financiación de las flotas autónomas (las primeras irán al balance de Uber porque el valor residual de los vehículos no está establecido; a largo plazo, capital de terceros), por la persistencia de la falta de conductores, por la inversión en supermercados y tiendas oscuras (lo harán con Delivery Hero y de forma selectiva) y por la rentabilidad del viaje autónomo: la dirección habló de un 30 % más de utilización en su red y de márgenes «comparables» a los del viaje con conductor «con el tiempo», sin objetivo de rentabilidad [20]. No dio cifras de lo que costará la inversión en oferta ni del capital para los autónomos más allá de la cifra de 10.000 M de compromiso. Anunció menos compras de empresas en 2027 y recompras «oportunistas» [20]. Guía del 4T26: reservas de 63.250-65.250 M (+18-22 % a tipo constante), BPA no GAAP de 0,95-0,99 USD (el consenso esperaba en torno a 1,00) y EBITDA ajustado de 3.130-3.230 M [19].';
// LTM a 30-sep-2026 = 2025 − 9M25 + 9M26 [19].
A.financieros.ltm = { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 56526, ebitda: 7803, ebit: 7034, beneficio_neto: 3465, bpa: 1.7, dpa: 0, dpa_extraordinario: 0, fcf: 10421, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 945 };
const kp = A.negocio.kpis;
kp[0] = { kpi: 'Segment Operating Income (medida vigente desde 2026), M USD: Mobility / Delivery / Freight / Corporativo = Non-GAAP Operating Income', valor_anterior: '5.180 / 2.248 / −91 / −2.802 = 4.535 (9M25)', valor_actual: '6.606 / 3.073 / −87 / −3.262 = 6.330 (9M26)', variacion: '+28 % / +37 % / n.s. / +16 % = +40 %', comentario: 'Suma del 1S26 y del 3T26 (3T26: 2.362 / 1.057 / −33 / −1.082 = 2.304 M, +38 %). La medida incluye la remuneración en acciones y las amortizaciones salvo las de intangibles comprados; el 3T25 ya está reexpresado en el comunicado del 3T26 [3, 19].' };
kp[1] = { kpi: 'Reservas brutas (Gross Bookings), M USD', valor_anterior: '162.773 (2024)', valor_actual: '193.454 (2025); 225.701 en los doce meses a sep-26', variacion: '+19 % (+20 % a divisa constante)', comentario: '3T26: 59.819 M, +20 % (+20 % a divisa constante); guía del 4T26: 63.250-65.250 M [1, 19].' };
kp[2] = { kpi: 'Reservas brutas por segmento, M USD (Mobility / Delivery / Freight)', valor_anterior: '25.111 / 23.322 / 1.307 (3T25)', valor_actual: '29.512 / 28.539 / 1.768 (3T26)', variacion: '+18 % / +22 % / +35 % (+17 % / +23 % / +35 % a divisa constante)', comentario: 'Mobility, por debajo de lo previsto por la falta de conductores en varios mercados internacionales [19, 20].' };
kp[3] = { kpi: 'Tasa de cobro (ingresos / reservas brutas), % (total; Mobility; Delivery)', valor_anterior: '27,1; 30,6; 19,2 (3T25)', valor_actual: '24,7; 25,5; 19,2 (3T26)', variacion: 'Mobility −5,1 pp', comentario: 'La caída de Mobility es contable: desde el 2-ene-26 el pago al conductor en parte del Reino Unido resta ingresos; los cambios de modelo restan 8 puntos al crecimiento de los ingresos del 3T26 [19]. Cálculo propio con cifras de la empresa.' };
kp[4] = { kpi: 'Consumidores activos mensuales (MAPCs), millones', valor_anterior: '189 (3T25)', valor_actual: '215 (3T26)', variacion: '+14 %', comentario: 'Media mensual del trimestre [19].' };
kp[5] = { kpi: 'Viajes (Trips), millones', valor_anterior: '3.512 (3T25)', valor_actual: '4.061 (3T26)', variacion: '+16 %', comentario: 'Viajes por usuario al mes +2 % [19]. En 2025: 13.567 M (+20 %) [1].' };
kp[6] = { kpi: 'Socios de Uber One, millones', valor_anterior: '50 (1T26)', valor_actual: '55 (3T26)', variacion: '+10 % en dos trimestres', comentario: 'Cifra dada por el primer ejecutivo en la conferencia del 3T26 [20].' };
kp[7] = { kpi: 'Adjusted EBITDA en % de reservas brutas', valor_anterior: '4,5 % (3T25)', valor_actual: '5,0 % (3T26)', variacion: '+0,5 pp', comentario: 'Adjusted EBITDA de 2.963 M en el 3T26 (+31 %); Non-GAAP Operating Income del 3,9 % de las reservas, récord [19].' };
kp[8] = { kpi: 'Flujo de caja libre (operativo − capex), M USD', valor_anterior: '9.763 (2025)', valor_actual: '10.421 en los doce meses a sep-26', variacion: '+7 % sobre 2025', comentario: 'Definición de Uber; 3T26: 2.535 M (+14 %). Incluye el aumento de las reservas de seguros (+1.253 M en 9M26) [19].' };
A.balance.comentario = (A.balance.comentario || '') + ' A 30-sep-2026: deuda a largo plazo de 15.664 M (15.787 M de nominal, con 4.500 M EUR de bonos en euros emitidos el 15-sep) y caja no restringida más inversiones a corto de 10.068 M; el préstamo a plazo de 2.000 M se devolvió en septiembre [18].';
A._iteracion = '2026-11-06';

// ---------------- C: equipo y gobierno ----------------
C.fuentes.push({ id: 28, titulo: 'Uber Technologies, Form 8-K de 4-nov-2026 (puntos 2.02 y 5.02: salida de Jill Hazelbaker)', editor: 'Uber Technologies / SEC', tipo: 'Primaria', fecha: '2026-11-04', url: 'https://www.sec.gov/Archives/edgar/data/1543151/000154315126000039/uber-20261104.htm' });
C.fuentes.push({ id: 29, titulo: 'Uber Announces Results for Third Quarter 2026 (8-K, anexo 99.1)', editor: 'Uber Technologies / SEC', tipo: 'Primaria', fecha: '2026-11-04', url: 'https://www.sec.gov/Archives/edgar/data/1543151/000154315126000039/uberq326earningspressrelea.htm' });
C.directivos.historial_guidance.push({ anio: '3T26', guia: 'Reservas brutas de 58.250-60.250 M (+18-22 %), BPA no GAAP de 0,84-0,88 USD y EBITDA ajustado de 2.860-2.960 M [14].', real: 'Reservas brutas de 59.819 M (+20 %), BPA no GAAP de 0,88 USD y EBITDA ajustado de 2.963 M, en lo alto o por encima del rango [29]. Guía del 4T26: reservas de 63.250-65.250 M, BPA no GAAP de 0,95-0,99 USD y EBITDA ajustado de 3.130-3.230 M [29].', cumplida: 'Sí' });
for (const e of C.directivos.equipo) if (e.nombre === 'Jill Hazelbaker') e.cargo = 'Presidenta y directora de Asuntos Corporativos (sale el 30-nov-2026)';
C.gobierno.alertas.unshift('Salida de Jill Hazelbaker, presidenta y directora de Asuntos Corporativos desde hace diez años, el 30-nov-2026 «por una oportunidad externa» (OpenAI, según el primer ejecutivo en la conferencia); no afecta al primer ejecutivo, al financiero ni a la presidencia del consejo [28].');
C.directivos.comentario = (C.directivos.comentario || '') + ' El 4-nov-2026 Uber anunció la salida de Jill Hazelbaker el 30-nov; su equipo asume sus funciones [28]. La guía del 3T26 se cumplió otra vez [29].';
C.gobierno.insiders_nota = 'Sin compras ni ventas en mercado de consejeros o directivos del 1-oct al 6-nov-2026: los Form 4 de octubre son entregas de acciones de remuneración (form4.mjs, SEC EDGAR).';

// ---------------- D: mercado y valoración ----------------
D.fuentes.push(
  { id: 29, titulo: 'Uber Technologies (UBER) Stock Forecast & Price Target (actualizada el 5-nov-2026)', editor: 'Stock Analysis (S&P Global y TipRanks)', tipo: 'Datos de mercado', fecha: '2026-11-05', url: 'https://stockanalysis.com/stocks/uber/forecast/' },
  { id: 30, titulo: 'Uber Technologies, Form 10-Q 3T26 (30-sep-2026): deuda, participaciones e inversiones', editor: 'Uber Technologies / SEC', tipo: 'Primaria', fecha: '2026-11-04', url: 'https://www.sec.gov/Archives/edgar/data/1543151/000154315126000041/uber-20260930.htm' },
  { id: 31, titulo: 'DoorDash to acquire Instacart (8-K, anexo 99.1, 29-oct-2026)', editor: 'DoorDash / SEC', tipo: 'Primaria', fecha: '2026-10-29', url: 'https://www.sec.gov/Archives/edgar/data/1792789/000114036126041111/ef20084547_ex99-1.htm' },
  { id: 33, titulo: 'Uber Announces Results for Third Quarter 2026 (8-K, anexo 99.1)', editor: 'Uber Technologies / SEC', tipo: 'Primaria', fecha: '2026-11-04', url: 'https://www.sec.gov/Archives/edgar/data/1543151/000154315126000039/uberq326earningspressrelea.htm' },
  { id: 34, titulo: 'Uber Technologies: Financial Data, Forecasts, Estimates (página del 23-oct-2026)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://www.marketscreener.com/quote/stock/UBER-TECHNOLOGIES-INC-57860975/finances/' },
  { id: 35, titulo: 'Uber Stock Gains 4.9% After Q3 Earnings as Delivery Bookings Rise 22%', editor: 'FX Leaders', tipo: 'Prensa', fecha: '2026-11-05', url: 'https://www.fxleaders.com/news/2026/11/05/uber-stock-gains-4-9-after-q3-earnings-as-delivery-bookings-rise-22/' },
  { id: 32, titulo: 'Uber Non-GAAP EPS of $0.88 beats by $0.01, revenue of $14.77B beats by $100M; Uber outperforms Q3 expectations but Q4 outlook misses lofty estimates (titulares del RSS)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-11-04', url: 'https://seekingalpha.com/api/sa/combined/UBER.xml' },
);
D.consenso.guidance = 'Guía del 4T26 (comunicado del 4-nov-2026) [33]: reservas brutas de 63.250-65.250 M USD (+18-22 % a tipo constante, con ~1 punto de efecto divisa en contra), BPA no GAAP de 0,95-0,99 USD (+34-39 %) y EBITDA ajustado de 3.130-3.230 M USD. Uber solo da guía trimestral, no anual ni a medio plazo. En el 3T26 cumplió la guía: reservas brutas +20 % (59.819 M), BPA no GAAP de 0,88 (lo alto del rango) y EBITDA ajustado de 2.963 M (por encima) [33]. La OPA sobre Delivery Hero (cierre previsto en el 2S27) y la compra de ezCater (2.300 M en efectivo, pendiente) no están en la guía [30].';
D.consenso.estimaciones = [
  { periodo: '2026e', ingresos: 57880, ebitda: 11378, ebit: 8433, bpa: 3.36, dpa: 0, fuente: 'Stock Analysis (S&P Global), 50 analistas, 5-nov-2026 (ingresos y BPA no GAAP); EBITDA y EBIT de MarketScreener, 23-oct-2026 [29, 34]' },
  { periodo: '2027e', ingresos: 66700, ebitda: 13835, ebit: 10755, bpa: 4.41, dpa: 0, fuente: 'Stock Analysis (S&P Global), 5-nov-2026 (ingresos y BPA no GAAP); EBITDA y EBIT de MarketScreener, 23-oct-2026 [29, 34]' },
  { periodo: '2028e', ingresos: 76340, ebitda: 16508, ebit: 13146, bpa: 5.81, dpa: 0, fuente: 'MarketScreener, 23-oct-2026, anterior a los resultados [34]' },
];
D.consenso.recomendaciones = { n_analistas: 50, comprar: 41, mantener: 8, vender: 1, po_medio: 100.77, po_min: 70, po_max: 150 };
D.consenso.revisiones = 'Tras los resultados (Stock Analysis, 5-nov-2026 [29]): 50 analistas, 41 compras (32 fuertes), 8 mantener y 1 venta; objetivo medio de 100,77 USD (100,86 el 26-oct; mediana 100,50; rango 70-150). El 5-nov TD Cowen (118) y BMO (119) mantienen compra, Susquehanna (90) y Wedbush (91) también, y Canaccord baja de 72 a 70 USD con mantener. Estimaciones: ingresos de 2026e de 57.880 M (+11,3 %) y de 2027e de 66.700 M (+15,2 %); BPA no GAAP de 3,36 y 4,41 USD. El consenso de BPA del 3T26 era de 0,87 y el de ingresos de 14.670 M (Uber dio 0,88 y 14.766 M); la guía de BPA del 4T26 (0,95-0,99) quedó algo por debajo del consenso de ~1,00 [32, 35]. MarketScreener seguía con datos del 23-oct (2028e: ingresos de 76.340 M y BPA de 5,81) [34]. No hay series gratuitas de revisiones a 3 y 12 meses.';
D.valoracion.puente = { fecha: '2026-09-30', deuda_financiera: 15664, arrendamientos: 222, caja: 10068, minoritarios: 1304, pensiones: 0, asociadas: 12355, otros_ajustes: 1060 };
// Comparables: Instacart sale (DoorDash la compra a 65 USD); se queda como transacción.
D.comparables.empresas = D.comparables.empresas.filter((e) => e.ticker !== 'CART');
D.transacciones.operaciones.unshift({ fecha: '2026-10', objetivo: 'Instacart (Maplebear)', comprador: 'DoorDash', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: 25.8, excluir: false, comentario: '65 USD por acción, unos 17.000 M USD de valor de las acciones, al menos un 75 % en efectivo; prima del 26 % sobre el cierre del 22-oct-2026 (51,68 USD); cierre previsto a finales de 2027 o en el 1S28. El comunicado no da múltiplo ni deuda neta: valor empresa sin publicar [31].' });
D.huecos = D.huecos || [];
D._iteracion = '2026-11-06';

// ---------------- E: identificación y transacciones ----------------
E.identificacion.proximos_resultados = 'Resultados del 4T26: Uber no ha anunciado fecha a 6-nov-2026; los del 4T25 se publicaron el 4-feb-2026 [14].';

// ---------------- F: sentimiento ----------------
F.fuentes = [
  { id: 1, titulo: 'UBER: flujo de mensajes (API pública), 5 y 6-nov-2026', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-11-06', url: 'https://api.stocktwits.com/api/2/streams/symbol/UBER.json' },
  { id: 2, titulo: 'Uber Technologies: noticias y análisis (RSS combinado), 23-oct a 5-nov-2026', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-11-05', url: 'https://seekingalpha.com/api/sa/combined/UBER.xml' },
  { id: 3, titulo: 'Uber (UBER-N): opiniones de expertos, julio-octubre de 2026', editor: 'Stockchase', tipo: 'Foros y redes', fecha: '2026-10-06', url: 'https://stockchase.com/UBER-N' },
  { id: 4, titulo: 'Uber Announces Results for Third Quarter 2026 (8-K, anexo 99.1)', editor: 'Uber Technologies / SEC', tipo: 'Primaria', fecha: '2026-11-04', url: 'https://www.sec.gov/Archives/edgar/data/1543151/000154315126000039/uberq326earningspressrelea.htm' },
  { id: 5, titulo: 'Uber Technologies (UBER) Q3 2026 earnings call transcript and summary (4-nov-2026)', editor: 'Gloom (transcripción de la conferencia)', tipo: 'Primaria', fecha: '2026-11-04', url: 'https://gloom.sh/stocks/uber/transcripts/q3-2026' },
  { id: 6, titulo: 'Amazon ditches Grubhub, taps Uber Eats for Prime', editor: 'TechCrunch', tipo: 'Prensa', fecha: '2026-11-05', url: 'https://techcrunch.com/2026/11/05/amazon-ditches-grubhub-taps-uber-eats-for-prime/' },
  { id: 7, titulo: 'DoorDash to acquire Instacart (8-K, anexo 99.1, 29-oct-2026)', editor: 'DoorDash / SEC', tipo: 'Primaria', fecha: '2026-10-29', url: 'https://www.sec.gov/Archives/edgar/data/1792789/000114036126041111/ef20084547_ex99-1.htm' },
];
F.sentimiento = {
  tono: 'Dividido', tendencia: 'Mejora',
  revisadas: [
    { plataforma: 'Stocktwits (flujo de mensajes de UBER)', fecha: '2026-11', n_comentarios: 30, tono: 'Dividido', resumen: 'Treinta mensajes del 5 y 6-nov-2026, tras los resultados: cinco marcados como alcistas y uno como bajista; se comenta el acuerdo con Amazon para Uber Eats, la caída de DoorDash ese día, las recompras y las rebajas de precios objetivo de varios bancos sin cambio de recomendación; los bajistas hablan del pago a los conductores y de opciones de venta a enero [1].' },
    { plataforma: 'Seeking Alpha (artículos de colaboradores y noticias)', fecha: '2026-11', n_comentarios: 20, tono: 'Dividido', resumen: 'Veinte titulares del 23-oct al 5-nov: tras los resultados dominan los alcistas («The robotaxi discount has truly gone too far», «The business grew while the multiple fell by half», «Great print and great guidance»), con una rebaja de un colaborador (4-nov) y antes un «The sell-side overestimates its moat» (28-oct). Noticias: Waymo pone fin a la exclusividad con Uber en dos ciudades (4-nov) y Amazon elige a Uber Eats (5-nov) [2].' },
    { plataforma: 'Stockchase (opiniones de gestores en la televisión financiera)', fecha: '2026-10', n_comentarios: 13, tono: 'Dividido', resumen: 'Trece opiniones del 15-jul al 6-oct-2026: seis favorables, una de operar en rango (70-78 USD) y cinco de no comprar; los críticos citan el coche autónomo y los favorables la caja, las recompras y Uber One [3].' },
  ],
  temas: [
    { tema: 'Coche autónomo y fin de la exclusividad con Waymo', postura: 'Dividida', peso: 'Alto', contraste: 'Es el bajista del informe. Waymo deja de ser exclusiva de Uber en Austin y Atlanta, pero Uber da 700 vehículos sin conductor en su red a fin de 2026 y más de 2.000 en 2027, y una utilización un 30 % mayor que la de las flotas propias [5].' },
    { tema: 'Resultados y guía', postura: 'Alcista', peso: 'Alto', contraste: 'Respaldado: reservas +20 %, BPA no GAAP +35 % y flujo libre de 10.400 M en doce meses; la guía de BPA del 4T26 quedó un poco por debajo del consenso, y la acción subió un 4,9 % el día de resultados [4].' },
    { tema: 'Delivery: Amazon y la compra de Instacart por DoorDash', postura: 'Alcista', peso: 'Medio', contraste: 'Amazon deja Grubhub y lleva Uber Eats a sus socios Prime en EE. UU. sin gastos de envío por encima de 25 USD [6]; DoorDash cayó ese día. La compra de Instacart (65 USD por acción) refuerza al rival en supermercados [7].' },
    { tema: 'Pago a conductores y falta de oferta', postura: 'Bajista', peso: 'Medio', contraste: 'La dirección lo reconoce: Mobility creció 1-2 puntos menos de lo previsto por la falta de conductores en Brasil, India y Canadá, y la inversión en oferta puede bajar la tasa de cobro del 4T26 [5].' },
  ],
  lectura: 'El tono de los particulares ha mejorado desde los mínimos del 29-oct: los resultados y el acuerdo con Amazon cambiaron el cansancio de octubre por un debate dividido, con mayoría alcista en los artículos y desconfianza en el flujo de mensajes por los incentivos a conductores y el coche autónomo. Los analistas siguen con 41 compras de 50 y han recortado poco el objetivo medio. No aporta un riesgo que el informe no recoja; confirma que el debate es el coche autónomo y que el precio no descuenta euforia.',
  confianza: 'Baja',
};
F.huecos = [];

guarda('A.json', A); guarda('C.json', C); guarda('D.json', D); guarda('E.json', E); guarda('F.json', F);
console.log('Notas actualizadas');

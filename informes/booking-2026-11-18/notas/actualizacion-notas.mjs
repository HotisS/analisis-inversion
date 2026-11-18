// Actualiza las notas A, C, D y E copiadas del informe del 2-nov-2026 con lo publicado después
// (10-Q y nota de prensa del 3T26, conferencia del 3-nov, 8-K del 13-nov, Form 4, Yahoo del 18-nov,
// Tesoro y BCE del 17-nov, Damodaran de noviembre). Se ejecuta una vez: node notas/actualizacion-notas.mjs
// (desde la carpeta del informe). Cada cifra nueva sale de los documentos de notas/docs.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = dirname(fileURLToPath(import.meta.url));
const leer = (f) => JSON.parse(readFileSync(join(dir, f), 'utf8'));
const guardar = (f, d) => writeFileSync(join(dir, f), JSON.stringify(d, null, 2) + '\n');
const SEC = 'https://www.sec.gov/Archives/edgar/data/1075531/';

// ---------------- A: cuentas ----------------
const A = leer('A.json');
A._estado = 'Actualizada el 18-nov-2026 sobre la nota del 2-nov: 3T26 (10-Q, nota de prensa y conferencia), LTM sep-26 y KPI. Las series anuales no cambian (no hay 10-K nuevo).';
A.fuentes.find((f) => f.id === 21).fecha = '2026-11-18';
A.fuentes.push(
  { id: 22, titulo: 'Booking Holdings, Form 10-Q 3T26 (septiembre 2026): balance, flujos, nota 13 (FTC, CNMC) y recompras', editor: 'Booking Holdings / SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-03', url: SEC + '000107553126000045/bkng-20260930.htm' },
  { id: 23, titulo: 'Booking Holdings Reports Third Quarter 2026 Financial Results (nota de prensa, Ex. 99.1)', editor: 'Booking Holdings / SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-03', url: SEC + '000107553126000044/q3-26bkngearningsrelease.htm' },
  { id: 24, titulo: 'Booking Holdings Q3 2026 Earnings Call, transcripción corregida (3-nov-2026)', editor: 'Booking Holdings (web de inversores) / FactSet CallStreet', tipo: 'Primaria', fecha: '2026-11-03', url: 'https://s25.q4cdn.com/383369491/files/content_files/CORRECTED-TRANSCRIPT-Booking-Holdings-Inc-BKNG-US-Q3-2026-Earnings-Call-3-November2026.pdf' },
  { id: 25, titulo: 'Booking Holdings, 8-K del 13-nov-2026: emisión de bonos senior en euros', editor: 'Booking Holdings / SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-13', url: SEC + '000110465926127223/tm2629703d1_8k.htm' },
);
// Trimestres: fuera el 3T24, entra el 3T26. Ingresos = ingresos ajustados (sin la rebaja de 900 M por la FTC), EBITDA ajustado, BPA publicado.
A.trimestres.items = A.trimestres.items.filter((t) => t.periodo !== '3T24');
A.trimestres.items.push({ periodo: '3T26', ingresos: 9793, crecimiento_pct: 8.7, crecimiento_organico_pct: 10.0, ebitda: 4607, margen_ebitda_pct: 47.0, bpa: 3.61, vs_consenso: 'Superior' });
A.trimestres.ultima_presentacion = 'En el 3T26 (3-nov-2026) las noches crecieron un 7 % (5 % en el 2T26), las reservas brutas un 10 % (11 % a divisa constante) y los ingresos ajustados un 9 % (10 % a divisa constante), todo por encima de lo alto de la guía (+3-5 % en noches, +4-6 % en ingresos y EBITDA). El EBITDA ajustado subió un 9 % con un margen del 47,0 % y el BPA ajustado, 4,66 USD, un 17 % (consenso de Yahoo antes de publicar: 4,50 USD) [23, 21]. Los ingresos publicados bajaron un 1 % porque la empresa registró una rebaja de ingresos de 900 M USD y una provisión de 100 M USD por la acción de la FTC contra Priceline, que excluye de sus cifras ajustadas [22, 23]. La guía del 4T26 es floja: noches +1-3 %, reservas +2-4 %, ingresos ajustados 0-2 % y EBITDA ajustado plano (+2 % a divisa constante), con un efecto de la divisa de −2 puntos, más inversión en vuelos, atracciones, restaurantes e IA, y los efectos de Oriente Medio y de los disturbios en ciudades europeas durante todo el trimestre; la de 2026 no cambia (un dígito alto en reservas, ingresos y EBITDA; BPA ajustado «low to mid-teens») [23, 24].\n\nEn la conferencia los analistas preguntaron casi solo por la IA: si hay mejoras medibles (JPMorgan), por la alianza de Agoda con Muse de Meta (Evercore), si los agentes generan demanda nueva (Morgan Stanley), por la normativa europea (Redburn) y si los agentes prefieren las webs de los hoteles a las agencias (Bank of America). La dirección dio cifras de conversión (los usuarios de Penny y del asistente de Agoda convierten el doble) y repitió que el tráfico de modelos de lenguaje sigue «muy por debajo del 1 %» de las noches. Bank of America preguntó por la inversión de 2027 y el director financiero no dio cifra (la guía llega en febrero); solo dijo que el margen de 2026 será estable y que las reservas ya hechas para el 1S27 «parecen sanas» [24]. Frente al 2T26, el discurso pasa de «la demanda resiste» a «el entorno es mixto»: se modera el viaje internacional a final de trimestre y sube la inversión.';
A.financieros.ltm = { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 29026, ebitda: 10713, ebit: 10119, beneficio_neto: 7178, bpa: 9.21, dpa: 1.644, dpa_extraordinario: 0, fcf: 9237, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 100 };
A.financieros.ajustes += ' **LTM sep-26** = 2025 − 9M25 + 9M26 [1, 22, 23]. Los ingresos del LTM son los ajustados (29.026 M): el publicado (28.126 M) lleva la rebaja de 900 M de la FTC, que es un pago único a clientes y al regulador, no menos negocio; por eso el EBITDA y el EBIT del LTM suman esos 900 M (EBITDA publicado 9.813 M + 900). En no_recurrentes_en_ebitda quedan los 100 M de provisión de la FTC, los costes de transformación (73 M en 9M26 y ≈ 30 M en el 4T25), la ganancia de litigios del 1T26 (−89 M) y la devolución del impuesto digital de Canadá (−14 M): 100 M. El beneficio neto (7.178 M) y el BPA (9,21 USD) son los publicados, con la FTC dentro; el BPA ajustado del LTM es 10,20 USD (9,12 − 7,17 + 8,25). La FTC pagada (≈ 1.000 M, en «Accrued expenses») va en el puente como deuda.';
const kp = (pref) => A.negocio.kpis.find((k) => k.kpi.startsWith(pref));
const addC = (pref, t) => { const k = kp(pref); if (k) k.comentario = `${k.comentario} ${t}`; };
addC('Noches reservadas', '3T26: 345 M, +6,7 %; guía del 4T26 +1-3 % [23].');
addC('Volumen de reservas', '3T26: 54.500 M, +9,6 % (+11 % a divisa constante); guía del 4T26 +2-4 % [23].');
addC('Peso merchant', 'En el 3T26, ≈ 75 % del volumen (+3 puntos) [24].');
addC('Billetes de avión', 'Se recupera en el 3T26: 21 M, +19,4 % [23].');
addC('Días de alquiler', '3T26: 23 M, −0,7 % [23].');
addC('Noches de alojamiento alternativo', '3T26: +7 %, ≈ 37 % de las noches de Booking.com; anuncios +9 % [24].');
A.balance.otros_pasivos += ' A 30-sep-2026: provisión de 1.000 M USD por la FTC (rebaja de ingresos de 900 M y pérdida de 100 M; la FTC puede pedir más) en «Accrued expenses» y 469 M USD por la CNMC en otros pasivos a largo [22]. El 13-nov-2026 emitió 3.550 M EUR en bonos (2029, 2032, 2035 y 2038, cupones del 3,95-5,00 %) [25].';
guardar('A.json', A);

// ---------------- C: gobierno ----------------
const C = leer('C.json');
C._estado = 'Actualizada el 18-nov-2026: Form 4 hasta el 17-nov y guía del 3T26.';
const f5 = C.fuentes.find((f) => f.id === 5); f5.fecha = '2026-11-17';
C.fuentes.push({ id: 21, titulo: 'Booking Holdings Reports Third Quarter 2026 Financial Results (nota de prensa, Ex. 99.1)', editor: 'Booking Holdings / SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-03', url: SEC + '000107553126000044/q3-26bkngearningsrelease.htm' });
C.gobierno.insiders.push(
  { fecha: '2026-11-16', persona: 'Peter J. Millones (secretario general; cinco ventas el mismo día, plan 10b5-1)', operacion: 'Venta', acciones: 50000, importe: 7.89 },
  { fecha: '2026-11-16', persona: 'Paulo Pisano (RR. HH.; cuatro ventas, plan 10b5-1)', operacion: 'Venta', acciones: 1500, importe: 0.24 },
);
C.gobierno.alertas[0] = 'Ventas de directivos por 62,7 M USD en 12 meses (18-nov-2025 a 17-nov-2026) y ninguna compra en mercado; todas con planes 10b5-1 (Millones 28,5 M USD, Fogel 25,9 M USD, Steenbergen 4,2 M USD) [5].';
const hg = C.directivos.historial_guidance;
const i26 = hg.findIndex((h) => h.anio.startsWith('2026'));
hg.splice(i26, 0, { anio: '3T26', guia: 'Noches +3-5 %, reservas e ingresos +4-6 %, EBITDA ajustado +4-6 % (agosto de 2026)', real: 'Noches +7 %, reservas +10 %, ingresos ajustados +9 %, EBITDA ajustado +9 %, BPA ajustado +17 %', cumplida: 'Sí' });
const h26 = hg.find((h) => h.anio.startsWith('2026'));
h26.real = 'Pendiente. Tras nueve meses los ingresos ajustados suben un 10,3 % y el EBITDA ajustado un 10,4 %; en noviembre mantiene la guía anual (un dígito alto y BPA ajustado «low to mid-teens») con un 4T26 plano en EBITDA [21].';
guardar('C.json', C);

// ---------------- D: mercado ----------------
const D = leer('D.json');
D._estado = 'Actualizada el 18-nov-2026: precio del cierre del 17-nov (la sesión del 18-nov no había cerrado), acciones de la portada del 10-Q del 3T26, consenso de Yahoo del 18-nov, comparables de Yahoo del 18-nov, Tesoro y BCE del 17-nov, prima de Damodaran de noviembre y puente del 30-sep-2026.';
const fD = (id, campos) => Object.assign(D.fuentes.find((f) => f.id === id), campos);
fD(1, { titulo: 'Booking Holdings, Form 10-Q del tercer trimestre de 2026 (balance del 30-sep-2026, nota 13, recompras y acciones a 26-oct)', fecha: '2026-11-03', url: SEC + '000107553126000045/bkng-20260930.htm' });
fD(2, { titulo: 'Booking Holdings Reports Third Quarter 2026 Financial Results (8-K, anexo 99.1)', fecha: '2026-11-03', url: SEC + '000107553126000044/q3-26bkngearningsrelease.htm' });
fD(4, { fecha: '2026-11-18', titulo: 'Yahoo Finance quoteSummary BKNG (earningsTrend, recommendationTrend, financialData, upgradeDowngradeHistory, earningsHistory)' });
fD(5, { fecha: '2026-11-13' });
fD(8, { titulo: 'Booking Holdings Inc.: estimaciones anuales 2025-2028 (página con precio del 23-oct-2026, sin actualizar tras los resultados)' });
fD(9, { fecha: '2026-11-17', titulo: 'Históricos diarios de BKNG, SPY y XLY hasta el 17-nov-2026 (herramientas/bolsa.mjs y movimiento.mjs)' });
fD(11, { fecha: '2026-11-17', titulo: 'Daily Treasury Par Yield Curve Rates 2026 (CSV): 10 años, 5,10 % el 17-nov-2026' });
fD(13, { fecha: '2026-11', titulo: 'Implied ERP by month (ERPbymonth.xlsx): noviembre de 2026, 4,41 % (S&P 500 en 7.580, bono al 4,94 %)' });
fD(14, { fecha: '2026-11-18', titulo: 'Yahoo Finance quoteSummary de EXPE, ABNB, TCOM, MMYT, EDR.MC, AMS.MC y TRVG (precio del 17-nov, financialData, earningsTrend)' });
fD(15, { fecha: '2026-11-17', titulo: 'Tipos de cambio de referencia del euro (17-nov-2026): 1 EUR = 1,0989 USD y 7,3254 CNY' });
D.fuentes.push(
  { id: 22, titulo: 'Booking Holdings, 8-K del 13-nov-2026: emisión de bonos senior en euros (3.550 M EUR, 2029-2038)', editor: 'Booking Holdings / SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-13', url: SEC + '000110465926127223/tm2629703d1_8k.htm' },
  { id: 23, titulo: 'Why Is Booking (BKNG) Stock Soaring Today', editor: 'StockStory', tipo: 'Prensa', fecha: '2026-11-04', url: 'https://stockstory.org/us/stocks/nasdaq/bkng/news/why-up-down/why-is-booking-bkng-stock-soaring-today-3' },
  { id: 24, titulo: 'Expedia Sinks 12% as Soft Q4 Outlook Overshadows a Beat and Raise', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-11-05', url: 'https://www.tikr.com/blog/expedia-sinks-12-as-soft-q4-outlook-overshadows-a-beat-and-raise-jpmorgan-sees-transitory-slowdown' },
  { id: 25, titulo: 'OpenAI Acquires Odessia, the AI Travel Agent From Sonder’s Co-Founder', editor: 'Skift', tipo: 'Prensa', fecha: '2026-11-10', url: 'https://skift.com/2026/11/10/a-year-after-sonders-collapse-francis-davidson-sells-his-ai-travel-startup-to-openai/' },
  { id: 26, titulo: 'Booking Holdings, Form 4 presentados del 18-nov-2025 al 17-nov-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-17', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001075531&type=4' },
);
Object.assign(D.identificacion, {
  precio: 154.46, fecha_precio: '2026-11-17', acciones: 746.7, capitalizacion_publicada: 114872,
  max_52s: 220.81, min_52s: 146.28, volumen_medio_diario: '≈ 1.244 M USD/día (7,40 M acciones, 3 meses)', proximos_resultados: null,
});
D.consenso.guidance = 'Guía del 3-nov-2026, con los resultados del 3T26 [2]. Para el 4T26: noches +1-3 %, reservas brutas +2-4 % (+4-6 % a divisa constante), ingresos ajustados 0-2 % (+2-4 % a divisa constante) y EBITDA ajustado plano (+2 % a divisa constante), con −2 puntos de divisa y más inversión en vuelos, atracciones, restaurantes, IA y tecnología. Para 2026 la mantiene: reservas, ingresos ajustados y EBITDA ajustado con crecimiento de un dígito alto y BPA ajustado «low to mid-teens»; en lo alto, dice la empresa, es su ambición a largo plazo (al menos +8 % de reservas e ingresos y +15 % de BPA ajustado a divisa constante). Supone que los efectos de Oriente Medio duran todo el 4T y el euro a 1,12 USD. La guía de 2027 llegará con los resultados del 4T26 (febrero de 2027); el director financiero solo adelantó que las reservas ya hechas para el 1S27 «parecen sanas» y que el margen EBITDA de 2026 será estable [2]. La FTC no entra en las cifras ajustadas: 900 M USD de rebaja de ingresos y 100 M de provisión en el 3T26 [1].';
D.consenso.estimaciones = [
  { periodo: '2026e', ingresos: 28495, ebitda: 10849, ebit: 10339, bpa: 10.42, dpa: 1.68, fuente: 'Ingresos y BPA ajustado: Yahoo Finance, 18-nov-2026, 25 y 29 analistas (BPA 10,04-10,80; los ingresos mezclan publicados y ajustados: el mínimo, 28.193 M, ya resta la FTC) [4]. Stock Analysis/S&P Global (13-nov): 28.500 M y 10,42 [5]. EBITDA y EBIT: MarketScreener, página del 23-oct, antes de los resultados [8]. DPA: 0,384 + 3 × 0,42 USD declarados [2].' },
  { periodo: '2027e', ingresos: 31505, ebitda: 12230, ebit: 11543, bpa: 12.23, dpa: 1.85, fuente: 'Ingresos y BPA ajustado: Yahoo Finance, 18-nov-2026, 34 y 29 analistas (BPA 11,35-13,40) [4]. EBITDA, EBIT y DPA: MarketScreener, página del 23-oct [8].' },
  { periodo: '2028e', ingresos: 34646, ebitda: 13561, ebit: 12815, bpa: 14.17, dpa: 2.0, fuente: 'Solo MarketScreener, página con precio del 23-oct-2026, anterior a los resultados del 3T26: no recoge la guía del 4T [8]. Yahoo no da 2028 y en Stock Analysis es de pago [4, 5].' },
];
D.consenso.recomendaciones = { n_analistas: 36, comprar: 29, mantener: 7, vender: 0, po_medio: 215.53, po_min: 150.0, po_max: 267.0 };
D.consenso.revisiones = 'Tras los resultados (3-nov) bajan el 4T y 2027, no 2026. Según Yahoo, el BPA ajustado del 4T26 pasa de 2,30 USD hace 30 días a 2,12 (−8 %; 15 revisiones a la baja y 3 al alza), el de 2027 de 12,38 a 12,23 (−1,2 %; 16 a la baja y 4 al alza) y el de 2026 de 10,45 a 10,42, porque el 3T batió (4,66 frente a 4,50) [4]. Los objetivos bajaron casi todos el 4-nov: JPMorgan de 248 a 205 USD, Morgan Stanley de 230 a 200, Barclays de 210 a 170, Citi de 236 a 220, Evercore de 270 a 250, RBC de 220 a 205, Wells Fargo de 190 a 179 y Cantor de 170 a 150; UBS subió de 265 a 267 [4]. El objetivo medio baja de 232,71 USD (30-oct) a 215,53 USD (−7,4 %), con 36 analistas y la misma mezcla de recomendaciones (29 comprar, 7 mantener) [4, 5]. La revisión del BPA a 12 meses no está en ninguna fuente gratuita.';
const bj = leer('bolsa.json');
D.bolsa = { ...D.bolsa, ...bj.bolsa };
delete D.bolsa.tramo_drawdown;
D.bolsa.posicion_corta_pct = 2.3;
D.bolsa.comentario = 'Booking cerró el 17-nov-2026 a 154,46 USD. Pierde un 27,4 % en el año, con dividendos, frente al +8,2 % del S&P 500 (SPY) y el −1,3 % del consumo discrecional (XLY) [9]. El mínimo de 52 semanas sigue siendo el del 28-oct (146,28 USD) y el máximo el del 16-dic-2025 (220,81 USD) [9]. Tras los resultados del 3T26 subió un 9,8 % el 4-nov (de 155,67 a 170,97 USD) por el BPA por encima del consenso [23]; lo devolvió casi todo en dos semanas: −4,8 % el 6-nov, cuando Expedia cayó un 12 % por una guía del 4T parecida a la de Booking [24], y −2,6 % el 10-nov con la compra de la agencia de viajes con IA Odessia por OpenAI [25]. Su beta mensual a 5 años frente a SPY es 1,13 (ajustada 1,09; semanal a 2 años 1,01) y la volatilidad diaria anualizada es del 39,3 % [9]. Las posiciones cortas suman 17,19 M de acciones (el 2,3 % del flotante), según Yahoo [4]. A cinco años la acción rinde un 10,7 % anual, igual que el S&P 500 y por encima de XLY [9].';
D.comparables.criterio = 'Las agencias de viajes en línea cotizadas con modelo de comisión y comercio de reservas: Expedia (la competidora directa en EE. UU. y Europa), Airbnb (alojamiento alternativo, donde crece Booking.com), Trip.com (Asia), MakeMyTrip (India) y eDreams (vuelos en Europa). Se añade Amadeus, el distribuidor de viajes con margen y escala parecidos. Fuera quedan Trivago (margen EBITDA del 1 % y capitalización de 298 M USD, sin múltiplos con sentido), Despegar (comprada por Prosus) y Uber o Visa, plataformas sin exposición al viaje. Las cifras salen todas de Yahoo, con precio del 17-nov-2026 y el consenso posterior a los resultados del 3T de todas salvo MakeMyTrip, eDreams y Trip.com (que publica el 19-nov); el EBITDA es el de Yahoo/S&P, que resta los pagos en acciones, igual que el ajustado de Booking. El valor empresa se recalcula con caja y deuda brutas, convertidas con el BCE (1 EUR = 1,0989 USD; 1 USD = 6,666 CNY) [14, 15]. El PER NTM no está en la misma base en todas: el BPA ajustado de Expedia y de Trip.com excluye los pagos en acciones (el de Booking no), el de Airbnb es GAAP y el de Amadeus excluye la amortización de intangibles comprados [14].';
const comp = {
  EXPE: { capitalizacion: 28833, ev_ventas: 1.78, ev_ebitda_ltm: 9.2, per_ntm: 9.9, crecimiento_pct: 6.9, margen_ebitda_pct: 19.3, dn_ebitda: 0.04, fcf_yield_pct: 8.1 },
  ABNB: { capitalizacion: 107975, ev_ventas: 7.03, ev_ebitda_ltm: 31.1, per_ntm: 28.8, crecimiento_pct: 14.6, margen_ebitda_pct: 22.6, dn_ebitda: -3.2, fcf_yield_pct: 3.0 },
  TCOM: { capitalizacion: 27455, ev_ventas: 1.99, ev_ebitda_ltm: 11.4, per_ntm: 10.7, crecimiento_pct: 9.5, margen_ebitda_pct: 17.4, dn_ebitda: -4.6, fcf_yield_pct: null },
  MMYT: { capitalizacion: 4606, ev_ventas: 4.93, ev_ebitda_ltm: 29.4, per_ntm: 21.9, crecimiento_pct: 22.8, margen_ebitda_pct: 16.8, dn_ebitda: 3.66, fcf_yield_pct: 0.8 },
  'EDR.MC': { capitalizacion: 522, ev_ventas: 1.21, ev_ebitda_ltm: 11.7, per_ntm: 16.0, crecimiento_pct: 5.0, margen_ebitda_pct: 10.3, dn_ebitda: 4.8, fcf_yield_pct: 14.7 },
  'AMS.MC': { capitalizacion: 28393, ev_ventas: 4.24, ev_ebitda_ltm: 11.3, per_ntm: 16.0, crecimiento_pct: 10.1, margen_ebitda_pct: 37.5, dn_ebitda: 1.03, fcf_yield_pct: 4.3 },
};
for (const e of D.comparables.empresas) Object.assign(e, comp[e.ticker] ?? {});
// Puente del 30-sep-2026 y WACC
D.valoracion.puente = { fecha: '2026-09-30', deuda_financiera: 20061, arrendamientos: 0, caja: 15814, minoritarios: 0, pensiones: 0, asociadas: 435, otros_ajustes: 3009 };
D.valoracion.referencia_mercado = { mercado: 'S&P 500 (prima implícita de Damodaran, «ERP (T12 m with sustainable payout)»)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx, última fila (inicio de noviembre): S&P 500 en 7.580 y bono a 4,94 % [13]' };
D.valoracion.notas_integrador = 'PUENTE del 30-sep-2026 (10-Q del 3T26) [1]: bonos a valor contable 1.987 M a corto + 18.074 M a largo = 20.061 M; caja 15.814 M (sin inversiones a corto); inversiones a largo plazo 435 M en «asociadas». otros_ajustes = 3.009 M: (a) 1.180 M de exceso estacional de reservas cobradas por adelantado (6.450 M en septiembre frente a 5.270 M en diciembre): el DCF solo cuenta la fracción de 2026e que queda y con circulante anual; (b) 1.000 M de la FTC provisionados y sin pagar (la rebaja de ingresos y la pérdida están fuera del EBITDA ajustado de la proyección); (c) 469 M de la multa de la CNMC provisionada en otros pasivos a largo; (d) ≈ 360 M de recompras entre el 30-sep y el 26-oct (≈ 746 M de acciones el 30-sep, 1.618 emitidas − 872 en autocartera, frente a 743,70 M el 26-oct, a ≈ 155 USD; estimación propia). La emisión de bonos de 3.550 M EUR del 13-nov no cambia la deuda neta (entra caja por el mismo importe). Acciones: 743,70 M de la portada del 10-Q (26-oct) + 3,0 M de dilución (diluidas medias 753 frente a básicas 750 en el 3T26) = 746,7 M. WACC: Tesoro a 10 años 5,10 % (17-nov) [11]; beta ajustada mensual de 5 años 1,09 (bruta 1,13; semanal de 2 años 1,01) [9]; Kd 5,4 %; peso de la deuda 14,8 % (20.061 / (20.061 + 115.330)).';
D.dcf = { wacc: { tasa_libre_pct: 5.10, beta: 1.09, coste_deuda_pct: 5.4, peso_deuda_pct: 14.8 } };
guardar('D.json', D);

// ---------------- E: sentimiento ----------------
const E = leer('E.json');
E.fuentes.find((f) => f.id === 1).fecha = '2026-11-18';
Object.assign(E.fuentes.find((f) => f.id === 2), { fecha: '2026-11-18', titulo: 'Flujo de mensajes de $BKNG, hasta el 18-nov-2026 (unos 30 mensajes desde los resultados)' });
E.sentimiento.revisadas.unshift(
  { plataforma: 'Stocktwits (flujo BKNG tras los resultados del 3T26)', fecha: '2026-11', n_comentarios: 30, tono: 'Dividido', resumen: 'Tras la subida del 4-nov y la vuelta a 155 USD, conviven los que ven «una gran oportunidad» y destacan las recompras con los que se marchan porque «las noches no crecen» y los que acusan a la empresa de maquillar las cifras por la FTC. Se comenta la compra de Odessia por OpenAI (10-nov) y el bloqueo de los agentes de IA por United (11-nov) [2].' },
  { plataforma: 'Seeking Alpha (titulares y artículos de colaboradores tras los resultados)', fecha: '2026-11', n_comentarios: 8, tono: 'Positivo', resumen: 'Los artículos de colaboradores del 4 y 5-nov son de compra (uno sube la recomendación: «la IA multiplica los ingresos») y uno pide separar el sentimiento de las cifras; los titulares de noticias resaltan la guía del 4T y la mayor inversión en IA [1].' },
);
E.sentimiento.lectura = (E.sentimiento.lectura ?? '') + ' Tras los resultados del 3T26 el tono sigue dividido: el debate ya no es solo la IA sino también el frenazo del 4T y la FTC; la subida del 4-nov se deshizo en dos semanas.';
guardar('E.json', E);
console.log('Notas A, C, D y E actualizadas.');

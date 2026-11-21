// Segunda parte de la actualización del 1T FY27: negocio, LTM, balance, flujos, capital, huecos.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const f = path.join(dir, 'A.json');
const d = JSON.parse(fs.readFileSync(f, 'utf8'));
const guarda = (m) => { fs.writeFileSync(f, JSON.stringify(d, null, 2)); console.log(m); };

// ---------- negocio ----------
const n = d.negocio;
const viejoGBS = n.segmentos.find(s => s.nombre === 'Global Business Solutions');
const viejoCons = n.segmentos.find(s => s.nombre === 'Consumer');
const pre = (s) => s.historico.filter(h => ['FY2018', 'FY2019', 'FY2020', 'FY2021'].includes(h.periodo));
n.segmentos = [
  {
    nombre: 'Global Business Solutions',
    descripcion: 'QuickBooks Online y Desktop, Intuit Enterprise Suite, Intuit Accountant Suite, nóminas, cobros, pagos de facturas y QuickBooks Capital; sin Mailchimp desde el 1-ago-2026 (FY2024-FY2026 reexpresados por la empresa [13]). FY2018-FY2021: Small Business & Self-Employed, anterior a Mailchimp y por tanto comparable en ingresos; FY2022-FY2023 se omiten porque no hay cifras sin Mailchimp [1, 4, 13].',
    tipo_resultado: 'EBIT',
    historico: pre(viejoGBS).concat([
      { periodo: 'FY2024', ingresos: 8266, resultado: 6340 },
      { periodo: 'FY2025', ingresos: 9790, resultado: 7553 },
      { periodo: 'FY2026', ingresos: 11592, resultado: 8928 },
    ]),
  },
  {
    nombre: 'Consumer',
    descripcion: 'TurboTax, Credit Karma (desde dic-2020) y ProTax. Ingresos FY2018-FY2021 como suma de las líneas que publica la empresa; resultado de segmento solo con la definición reexpresada (FY2024-FY2026) [1, 4, 13].',
    tipo_resultado: 'EBIT',
    historico: pre(viejoCons).concat([
      { periodo: 'FY2024', ingresos: 6752, resultado: 5012 },
      { periodo: 'FY2025', ingresos: 7754, resultado: 5760 },
      { periodo: 'FY2026', ingresos: 8584, resultado: 6308 },
    ]),
  },
  {
    nombre: 'Mailchimp',
    descripcion: 'Automatización de marketing por correo, SMS y redes para pymes; segmento propio desde el 1-ago-2026 y en venta a Bending Spoons (cierre previsto a principios de 2027). Su resultado de segmento ya incluye desarrollo de producto y atención al cliente, pero no pagos en acciones, gastos corporativos ni amortización de intangibles [12, 13, 15].',
    tipo_resultado: 'EBIT',
    historico: [
      { periodo: 'FY2018', ingresos: 0, resultado: null },
      { periodo: 'FY2019', ingresos: 0, resultado: null },
      { periodo: 'FY2020', ingresos: 0, resultado: null },
      { periodo: 'FY2021', ingresos: 0, resultado: null },
      { periodo: 'FY2024', ingresos: 1267, resultado: 516 },
      { periodo: 'FY2025', ingresos: 1287, resultado: 548 },
      { periodo: 'FY2026', ingresos: 1272, resultado: 604 },
    ],
  },
  {
    nombre: 'Costes no asignados',
    descripcion: 'Gastos corporativos, atención al cliente y desarrollo de producto de GBS y Consumer, pagos en acciones, amortización de intangibles adquiridos y reestructuración, que la empresa no reparte entre segmentos. Sin ingresos [13].',
    tipo_resultado: 'EBIT',
    historico: [
      { periodo: 'FY2024', ingresos: 0, resultado: -8238 },
      { periodo: 'FY2025', ingresos: 0, resultado: -8938 },
      { periodo: 'FY2026', ingresos: 0, resultado: -9956 },
    ],
  },
];
n.extra = n.extra || {};
n.extra.segmentos_1t27 = 'Segmentos 1T27 (ago-oct 2026), ingresos y resultado de segmento: Global Business Solutions 3.083 M (+15 %) y 2.353 M (76 %); Consumer 958 M (+7 %) y 628 M; Mailchimp 313 M (-1 %) y 202 M (65 %, +45 % por menos personal, marketing y servicios externos); costes no asignados -2.315 M (pagos en acciones 495 M, otros gastos corporativos 1.644 M, amortización de intangibles 165 M, reestructuración 11 M) [11, 15]. Por líneas: QuickBooks Online Accounting 1.434 M (+19 %), Online Services 999 M (+21 %), ecosistema online 2.433 M (+20 %), escritorio 650 M (+2 %), TurboTax 199 M (+1 %), Credit Karma 708 M (+9 %), ProTax 51 M (+13 %) [11, 15].';
n.extra.kpis_1t27 = 'KPI del 1T27: ingresos online de mercado medio (QBO Advanced e Intuit Enterprise Suite) +41 %; Intuit Enterprise Suite a 177 M anualizados; clientes de mercado medio +30 %; contratos nuevos de IES +145 %; volumen de pagos de Business Money +33 %; 430.000 contables en Intuit Accountant Suite; más de 20.000 empresas con ventas de más de 20 M en la plataforma [14].';
n.extra.credit_karma_1t27 = 'Credit Karma creció un 9 % en el 1T27 (préstamos personales y seguros; tarjetas a la baja), frente al +27 % de un año antes y por debajo de lo que esperaba la empresa por tipos de interés más altos y por el paso de los consumidores a asistentes de IA [14, 15]. La guía del año baja del +11-13 % al +3-7 % [6, 10].';
n.extra.mailchimp = 'Mailchimp estancado: 1.267 M (FY2024), 1.287 M (FY2025) y 1.272 M (FY2026), el 5,9 % de los ingresos de FY2026; resultado de segmento reexpresado de 516, 548 y 604 M (47 % de margen en FY2026; el 3,8 % del resultado de segmentos) [13]. En la reexpresión pasaron a Mailchimp 313 M de gastos de GBS y 355 M de corporativos en FY2026 [15].';
n.extra.venta_mailchimp = 'Venta de Mailchimp (19-nov-2026): comprador Bending Spoons US Inc., filial de la italiana Bending Spoons S.p.A.; precio base de 3.680 M (3.310 M en efectivo y unos 368 M en 8.818.595 acciones nuevas de Bending Spoons, con seis meses de bloqueo), sujeto a ajustes de caja, deuda, circulante y gastos; se vende el 100 % de The Rocket Science Group LLC y activos asociados [10, 11, 12]. Cierre previsto a principios del año natural 2027, sujeto a la ley HSR y otras autorizaciones; fecha límite el 19-ago-2027, ampliable tres meses; no requiere voto de los accionistas ni tiene condición de financiación; no competencia de dos años y acuerdos de licencia de propiedad intelectual y de servicios de transición [12]. Intuit espera una plusvalía antes de impuestos al cierre, aún sin cuantificar; a 31-oct-2026 Mailchimp no estaba clasificado como mantenido para la venta (el consejo lo aprobó en noviembre) y no hubo deterioro [11]. Fondo de comercio asignado a Mailchimp: 641 M, repartido por valor razonable relativo al crear su unidad en FY2026 [11, 13]. Uso del efectivo: recompras adicionales dentro de FY2027 tras el cierre [10, 14]. Precio frente a lo pagado: unos 12.000 M en nov-2021 (5.700 M en efectivo y 6.300 M en acciones) [3]. Múltiplos (estimación propia): 2,9 veces las ventas de FY2026 y 6,1 veces su resultado de segmento, que no soporta pagos en acciones ni gastos corporativos.';
delete n.extra.guia_fy27;
n.extra.guia_fy27 = 'Guía FY2027 actualizada (19-nov): ingresos 23.081-23.365 M (+8-9 %, antes 23.279-23.512 M); GBS 13.068-13.158 M (+13-14 %); Consumer 8.757-8.941 M (+2-4 %); TurboTax 5.377-5.453 M (+2-3 %); Credit Karma 2.721-2.826 M (+3-7 %, antes +11-13 %); ProTax 659-662 M (+2 %); Mailchimp 1.256-1.266 M (-1 % a 0 %). Sin efecto de la venta de Mailchimp [6, 10].';
n.confianza = 'Alta';
guarda('negocio ok');

// ---------- financieros: LTM y perímetro ----------
const fi = d.financieros;
fi.ltm = { periodo: 'LTM oct-26', fecha_fin: '2026-10-31', ingresos: 21917, ebitda: 7067, ebit: 6218, beneficio_neto: 4815, bpa: 17.46, dpa: 4.98, dpa_extraordinario: 0, fcf: 9005, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 304 };
fi.cambios_perimetro = (fi.cambios_perimetro || []).filter(x => !/Bending/.test(x.descripcion));
fi.cambios_perimetro.push({ periodo: 'FY2027', descripcion: 'Venta de Mailchimp a Bending Spoons firmada el 19-nov-2026 (3.680 M), cierre previsto a principios de 2027: sale 1.272 M de ingresos anuales; la guía de FY2027 aún la incluye.' });
fi.extra = fi.extra || {};
fi.extra.ltm_oct26 = 'LTM a 31-oct-2026 = FY2026 - 1T26 + 1T27: ingresos 21.448 - 3.885 + 4.354 = 21.917 M; EBIT 5.884 - 534 + 868 = 6.218 M; amortizaciones 846 - 209 + 212 = 849 M; EBITDA 7.067 M; beneficio neto 4.566 - 446 + 695 = 4.815 M; BPA 16,46 - 1,59 + 2,59 = 17,46 USD; dividendo declarado 4,80 - 1,20 + 1,38 = 4,98 USD; reestructuración 293 + 11 = 304 M [1, 10]. El FCF (estimación propia) es 8.617 - (637 - 38) + (1.062 - 75) = 9.005 M, con el capex trimestral solo de inmovilizado material. El beneficio LTM incluye 265 M de plusvalías de inversiones a largo plazo (31 + 46 + 69 + 119 M en los últimos cuatro trimestres) [10].';
fi.extra.comprobacion_10k = 'Comprobado el 20-nov: ingresos 21.448 M, EBIT 5.884 M, beneficio neto 4.566 M, BPA 16,46 USD, activo 36.786 M, patrimonio 18.992 M y flujo operativo 8.838 M de cuentas-xbrl.json casan con el 10-K FY2026 y con su reexpresión por segmentos del 19-nov, que no cambia las cifras consolidadas [1, 13].';
guarda('financieros ok');

// ---------- balance ----------
const b = d.balance;
b.extra = b.extra || {};
b.extra.balance_oct26 = 'Balance a 31-oct-2026: caja 4.042 M e inversiones a corto 1.279 M (5.321 M, frente a 7.200 M en julio); inversiones a largo plazo 371 M (participaciones no cotizadas, con 118 M de revalorización en el trimestre); deuda 500 M a corto y 6.422 M a largo (6.922 M; en el trimestre devolvió 750 M de bonos); deuda neta de unos 1.600 M (estimación propia: 6.922 - 5.321). Préstamos a cobrar 1.566 M para mantener y 92 M para vender; fondo de comercio 14.077 M (96 M nuevos por una compra) e intangibles 4.517 M; patrimonio 18.235 M; fondos de clientes 5.749 M a ambos lados [10, 11].';
b.liquidez = 'Caja 4.042 M + inversiones a corto plazo 1.279 M (5.321 M) a 31-oct-2026; línea de crédito no garantizada de 2.200 M sin disponer hasta ene-2031 y programa de pagarés de 2.200 M [1, 10]. La venta de Mailchimp aportará 3.310 M en efectivo al cierre, destinados a recompras [10].';
guarda('balance ok');

// ---------- flujos ----------
const fl = d.flujos;
fl.extra = fl.extra || {};
fl.extra.t1_fy27 = 'Flujos del 1T27: flujo operativo 1.062 M (637 M un año antes); inmovilizado material 75 M; FCF de unos 987 M (estimación propia); compra de un negocio por 126 M netos de caja (Sequence, plataforma de gestión de ingresos con IA, según el guion); recompras pagadas 1.472 M; dividendos 378 M; retenciones de RSU 120 M; devolución de deuda 750 M; préstamos de QuickBooks Capital: originaciones 1.798 M, ventas 781 M y cobros 1.048 M [10, 14].';
guarda('flujos ok');

// ---------- capital ----------
const c = d.capital;
c.politica = 'Dividendo trimestral de 1,38 USD por acción (pagado el 16-oct-2026 y declarado otra vez el 19-nov para el 15-ene-2027), un 15 % más que un año antes [6, 10]; el dividendo declarado por acción subió de 1,36 USD en FY2017 a 4,80 USD en FY2026 [5, 1]. Recompras: 5.463 M en FY2026 y 1.500 M en el 1T27 (4,6 millones de acciones, +73 %); quedan 6.400 M autorizados [1, 10, 11]. La dirección prevé seguir recomprando cada trimestre y dedicar a recompras adicionales, dentro de FY2027, los 3.310 M en efectivo de la venta de Mailchimp [11, 14].';
const mc = c.adquisiciones.find(a => a.objetivo === 'Mailchimp');
if (mc) mc.resultado = 'Ingresos estancados: 1.267 M (FY2024), 1.287 M (FY2025), 1.272 M (FY2026); vendido a Bending Spoons en nov-2026 por 3.680 M (3.310 M en efectivo y 368 M en acciones), menos de un tercio de lo pagado; sin deterioro contable y con plusvalía contable prevista porque solo le correspondían 641 M de fondo de comercio [3, 10, 11, 13].';
if (!c.adquisiciones.find(a => a.objetivo.startsWith('Sequence'))) c.adquisiciones.push({ anio: 'FY2027', objetivo: 'Sequence (gestión de ingresos con IA, mercado medio)', importe: 126, ev_ebitda: null, financiacion: 'Caja (126 M netos de caja adquirida)', resultado: 'Recién comprada; 96 M de fondo de comercio en GBS [11, 14].' });
c.confianza = 'Alta';
guarda('capital ok');

// ---------- huecos ----------
const h = d.huecos.filter(x => x.campo !== 'items[].vs_consenso');
h.push(
  { seccion: 'trimestres', campo: 'items[].vs_consenso de 2T25-4T26', tipo: 'Complemento', intentos: '1) Notas de resultados y guiones de la empresa: no citan el consenso previo; 2) series XBRL de EDGAR: sin estimaciones; 3) prensa del 19/20-nov: solo da el consenso del 1T27', decision: 'Omitido' },
  { seccion: 'negocio', campo: 'Resultado completo de Mailchimp (con pagos en acciones, gastos corporativos y amortización de sus intangibles) y plusvalía esperada de la venta', tipo: 'Complemento', intentos: '1) 10-Q del 1T27 (nota 14): plusvalía sin cuantificar; 2) 8-K de la venta y nota de resultados: sin cuenta de Mailchimp; 3) reexpresión del 10-K FY2026: solo resultado de segmento (604 M) e intangibles sin desglose por compra', decision: 'Omitido' },
  { seccion: 'negocio', campo: 'Tratamiento de Mailchimp como operación interrumpida', tipo: 'Complemento', intentos: '1) 10-Q del 1T27: no mantenido para la venta a 31-oct y sin mención a operaciones interrumpidas; 2) nota de resultados: la guía lo incluye hasta el cierre; 3) guion de la conferencia: no lo trata', decision: 'Omitido' },
  { seccion: 'trimestres', campo: 'ultima_presentacion: turno de preguntas de la conferencia del 1T27', tipo: 'Complemento', intentos: '1) Guion publicado en investors.intuit.com: solo intervenciones preparadas; 2) 8-K del 19-nov: sin transcripción; 3) prensa del 20-nov consultada: solo cifras', decision: 'Omitido' },
);
d.huecos = h;
d._estado = { terminado: '2026-11-20', resumen: '1T27 en trimestres (8 trimestres 2T25-1T27): ingresos 4.354 M (+12 %), EBIT GAAP 868 M, no GAAP 1.046 M, BPA GAAP 2,59 y no GAAP 2,91 USD, por encima de la guía y del consenso. Guía 2T27 4.931-4.954 M (+6-7 %) frente a 5.110 M de consenso; FY2027 ingresos rebajados a 23.081-23.365 M por Credit Karma (+3-7 %), BPA mantenido. Venta de Mailchimp a Bending Spoons por 3.680 M (3.310 M en efectivo), cierre a principios de 2027, recompras con el efectivo. Segmentos reexpresados en tres (GBS sin Mailchimp, Consumer, Mailchimp) FY2024-FY2026. LTM oct-26, balance y flujos del trimestre en extra. Cifras anuales XBRL comprobadas contra el 10-K.' };
guarda('huecos ok');

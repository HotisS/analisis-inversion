// Actualiza la nota A con los resultados del 3T26 (8-K del 21-oct-2026). Uso: node A-actualizar-3T26.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const ruta = path.join(dir, 'A.json');
const a = JSON.parse(fs.readFileSync(ruta, 'utf8'));
const r1 = (x) => Math.round(x * 10) / 10;

// Fuentes nuevas
const E = 'https://www.sec.gov/Archives/edgar/data/1413329/000162828026066596';
const nuevas = [
  { titulo: 'PMI Reports 2026 Third-Quarter & First Nine-Months Results; guía de BPA ajustado 2026 de 8,29-8,44 USD (solo cambia la divisa)', editor: 'Philip Morris International Inc. (SEC, 8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-10-21', url: `${E}/earningsreleasepm-ex991xq3.htm` },
  { titulo: 'Anexo 99.2 del 8-K del 3T26: cuenta, balance a 30-sep-2026, deuda neta y EBITDA ajustado de 12 meses, flujo operativo y conciliaciones', editor: 'Philip Morris International Inc. (SEC, 8-K, anexo 99.2)', tipo: 'Primaria', fecha: '2026-10-21', url: `${E}/glossaryselectfininfoandno.htm` },
  { titulo: 'XBRL companyconcept: depreciación y amortización trimestral y pagos de inversión (10-Q 2024-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyconcept/CIK0001413329/us-gaap/DepreciationDepletionAndAmortization.json' },
];
let id = Math.max(...a.fuentes.map((f) => f.id));
const ids = nuevas.map((f) => { id += 1; a.fuentes.push({ id, ...f }); return id; });
const [N3, T3, XC] = ids; // 17, 18, 19

// LTM a sep-26 = 2025 − 9M25 + 9M26 [2, N3, T3]
const fcfCapexEst = (1569 - 1125) + 733 + 383; // inversión 4T25 + 1S26 + 3T26 estimado (guía 1.500 − 1S26 733, la mitad)
const cfoLtm = 12233 - 7524 + 10445;
a.financieros.ltm = {
  periodo: 'LTM sep-26', fecha_fin: '2026-09-30',
  ingresos: 40648 - 30286 + 32776,
  ebitda: (14892 - 11519 + 13289) + 2055,
  ebit: 14892 - 11519 + 13289,
  beneficio_neto: 11348 - 9207 + 8568,
  bpa: Math.round((7.26 - 5.89 + 5.48) * 100) / 100,
  dpa: 6.01, dpa_extraordinario: 0,
  fcf: cfoLtm - fcfCapexEst,
  participadas_en_ebitda: null,
  no_recurrentes_en_ebitda: 92 + 19,
};

a.financieros.comentario = `Los ingresos netos (sin impuestos especiales) pasaron de 28.694 M USD en 2020 a 40.648 M en 2025 (TCAC del 7,2 %) y a 43.138 M en los doce meses a septiembre de 2026 [1, ${T3}]. El crecimiento orgánico de 2025 fue del 6,5 %: precio de los cigarrillos (+1.771 M en el año en International Combustibles) y mezcla hacia los productos sin humo, que ya son el 41,5 % de los ingresos y el 43 % del margen bruto [2, 6]. En los nueve meses de 2026 los ingresos crecen un 8,2 % (5,9 % orgánico) y el resultado operativo ajustado un 10,6 %, con un margen del 42,9 % (+0,9 puntos); en el 3T26 el margen ajustado llegó al 44,7 % (+1,6 puntos) [${N3}]. Swedish Match aportó desde 2023 el negocio de ZYN en EE. UU. (3.216 M de ingresos en 2025) [6]. Años no comparables: 2023 (deterioros de 680 M, cargo fiscal en Corea de 204 M y la integración de Swedish Match), 2024 (deterioro de 2.316 M de la participación en RBH, por debajo del resultado operativo, que dejó el BPA publicado en 4,52 USD) y 2026 (otro deterioro de RBH de 511 M en el 2T y ajustes de valor razonable de participaciones de −0,22 USD por acción en nueve meses) [7, 8, ${N3}].`;

a.financieros.ajustes = `El BPA ajustado de la empresa excluye la amortización de intangibles comprados (1.003 M USD en 2025, 0,50 USD por acción, casi toda de Swedish Match), la reestructuración (241 M en 2025, fábricas de Alemania), los deterioros, el litigio de clasificación fiscal en Alemania (176 M), la pérdida por la venta prevista de accesorios (94 M), el efecto fiscal de la financiación de Swedish Match, los ajustes de valor razonable de participaciones y, en 2026, el deterioro de RBH (0,33 USD) y la pérdida por la compra de las pensiones holandesas (74 M, 0,04 USD) [2, ${N3}, ${T3}]. BPA ajustado: 5,17 USD en 2020, 6,08 en 2021, 5,98 en 2022, 6,01 en 2023, 6,57 en 2024 y 7,54 en 2025 (publicado 7,26); 6,52 en los nueve meses de 2026 frente a 5,48 publicado [10, 9, 8, 7, 2, ${N3}]. Las partidas excluidas del resultado operativo (sin amortización) sumaron 513, 503, 1.284, 451 y 533 M de 2021 a 2025 y solo 19 M en los nueve meses de 2026: casi todos los años hay alguna, así que el DCF resta 0,3 puntos de margen por ellas. LTM a septiembre de 2026 (2025 − 9M25 + 9M26): EBITDA = resultado operativo publicado + 2.055 M de amortización de doce meses; el EBITDA ajustado de la empresa es 18.830 M [${T3}].`;

// Trimestres: resultado operativo publicado + D&A real del trimestre (XBRL; 3T26 = 1.534 de 9M26 − 1.023 de 1S26)
const trim = (p, ing, g, go, oi, da, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: go, ebitda: oi + da, margen_ebitda_pct: r1((oi + da) / ing * 100), bpa, vs_consenso: vs });
a.trimestres.items = [
  trim('4T24', 9706, 7.3, 7.3, 3259, 477, 1.55, null),
  trim('1T25', 9301, 5.8, 10.2, 3544, 480, 1.69, null),
  trim('2T25', 10140, 7.1, 6.8, 3712, 490, 1.91, null),
  trim('3T25', 10845, 9.4, 5.9, 4263, 505, 2.24, 'Superior'),
  trim('4T25', 10362, 6.8, 3.7, 3373, 521, 1.70, null),
  trim('1T26', 10146, 9.1, 2.7, 3893, 510, 1.96, 'Superior'),
  trim('2T26', 11192, 10.4, 7.6, 4530, 513, 2.20, 'Superior'),
  trim('3T26', 11438, 5.5, 7.1, 4866, 511, 2.36, 'Superior'),
];
a.trimestres.ultima_presentacion = `En el 3T26 (21-oct-2026, antes de la apertura) el BPA ajustado fue de 2,36 USD (+5,4 %; +5,8 % sin divisa), por encima de la guía de 2,29-2,34 que la empresa dio el 8-sep; el publicado cayó un 4,9 % a 2,12 USD por el ajuste de valor razonable de participaciones [${N3}, 13]. Los ingresos subieron un 5,5 % (7,1 % orgánico) a 11.438 M, récord trimestral, y el resultado operativo un 14,1 % (10,5 % orgánico), con un margen ajustado del 44,7 % [${N3}]. Cigarrillos: envíos planos, precio del +8,9 % y cuota del 25,9 % (+0,4 puntos); la empresa avisa de que parte del crecimiento viene de una reestructuración de las condiciones de distribución en algunos mercados que no se repetirá al mismo nivel [${N3}]. Sin humo: ingresos solo +0,7 % (3,4 % orgánico) por el calendario de envíos de Japón, aunque las ventas al consumidor de IQOS crecieron un 7,1 % (un 10 % sin Japón ni Polonia) [${N3}]. EE. UU.: envíos de ZYN +4,2 % a 3.200 M de bolsas y ingresos +22,7 % frente a un 3T25 con promociones, pero el resultado del segmento cayó un 3,3 % por la inversión comercial; la dirección subirá aún más el gasto en el 4T (campaña y paso de latas de 15 a 20 bolsas) [${N3}]. Guía 2026: BPA ajustado de 8,29-8,44 USD (antes 8,35-8,50) solo por menos divisa favorable (0,18 frente a 0,24 USD); sin divisa sigue en 7,5-9,5 %, con ingresos orgánicos en la mitad alta del 5-7 % y resultado operativo orgánico en la mitad baja del 7-9 % por la energía (Oriente Medio), Ucrania y la inversión en EE. UU.; flujo operativo ≈ 13.500 M, inversión de 1.400-1.600 M y sin recompras [${N3}]. La conferencia con analistas es a las 9:00 ET del mismo día: no está en esta nota.`;

// Balance: el histórico anual no cambia; comentario y liquidez a 30-sep-2026
a.balance.liquidez = `Caja de 6.683 M USD a 30-sep-2026 (4.872 a 31-dic-2025); líneas de crédito comprometidas de 6.300 M sin disponer y programas de pagarés de 8.000 M; la deuda a corto subió de 168 a 2.525 M en nueve meses [${T3}, 1].`;
a.balance.comentario = `El patrimonio atribuido es negativo (−9.994 M USD a 31-dic-2025 y −7.937 M a 30-sep-2026) por 35.459 M de autocartera recomprada antes de 2022 y por los dividendos, no por pérdidas [3, ${T3}]. La deuda financiera subió de 27.806 M en 2021 a 48.835 M en 2025 por la compra de Swedish Match (préstamo en euros de 2022) y los pagos a Altria por los derechos de IQOS en EE. UU.; en 2026 baja a 47.562 M a 30-sep (con 1.000 M EUR del préstamo de Swedish Match amortizados por anticipado en junio) [3, 15, ${T3}]. Deuda neta a 30-sep-2026: 47.562 − 6.683 = 40.879 M, 2,17 veces el EBITDA ajustado de doce meses (18.830 M) frente a 2,53 a final de 2025; la empresa apunta a cerca de 2 veces a final de 2026 [${T3}, ${N3}]. Las participaciones bajan de 2.891 a 1.975 M en nueve meses (deterioro de RBH y valor razonable) [${T3}]. El circulante comercial es alto (28,6 % de las ventas en 2025: hoja de tabaco que se cura más de un año y producto terminado en 90 mercados) [1].`;
a.balance.otros_pasivos = a.balance.otros_pasivos.replace('Pensiones: déficit neto', `Pensiones: en el 3T26 traspasó a una aseguradora el plan holandés, con una pérdida de 74 M USD por debajo del resultado operativo [${T3}]; déficit neto`);

// Flujos
a.flujos.comentario = `El flujo operativo ha ido de 9.812 M USD en 2020 a 12.233 M en 2025; en los nueve meses de 2026 fue de 10.445 M (+38,8 %, 5.352 M en el 3T) y en los doce meses a septiembre de 15.154 M, por encima de la guía anual de ≈ 13.500 M que la empresa mantiene «sujeta al circulante de fin de año»: parte del adelanto es de calendario [1, ${T3}, ${N3}]. La inversión de 2026 hasta junio fue de 733 M y la de septiembre no se publica hasta el 10-Q; el flujo libre de doce meses (≈ 13.600 M) usa una estimación propia de 383 M para el 3T26 (la mitad de lo que queda hasta el centro de la guía de 1.400-1.600 M) [${XC}, ${N3}]. La inversión publicada en 2022 (2.079 M) y 2023 (3.096 M) incluye 1.002 y 1.775 M de pagos por intangibles (sobre todo los derechos de IQOS en EE. UU. comprados a Altria); la inversión en inmovilizado fue de 1.321-1.569 M en 2023-2025, casi toda para los productos sin humo [12, 14]. Conversión: flujo libre de 10.664 M en 2025 frente a un beneficio atribuido de 11.348 M. Usos de la caja: dividendos (8.624 M en 2025, 70 % del flujo operativo) y reducción de deuda; no hay recompras desde 2022 ni previstas en 2026 [1, ${N3}].`;

// Calidad
a.calidad.senales = a.calidad.senales.map((s) => s.senal === 'Ajuste de divisa en el BPA'
  ? { ...s, comentario: `La guía de 2026 incluye +0,18 USD de divisa (antes +0,24) y, en el 2T26, ganancias transaccionales por el rublo en impuestos diferidos [${N3}, 4].` }
  : s);
a.calidad.senales.push(
  { senal: 'Ingresos del 3T26 apoyados en un cambio de condiciones de distribución', nivel: 'Media', comentario: `International Combustibles creció un 7,8 % orgánico con ayuda de una reestructuración de las condiciones de distribución en algunos mercados que «no se repetirá al mismo nivel»; la empresa no da el importe [${N3}].` },
  { senal: 'Valor razonable de participaciones dentro del BPA publicado', nivel: 'Baja', comentario: `−0,22 USD por acción en nueve meses de 2026 frente a +0,33 en 2025: mueve el publicado y se excluye del ajustado [${N3}].` },
);
a.calidad.comentario = a.calidad.comentario.replace('El patrimonio negativo', `En el 3T26 la distancia es de 2,12 frente a 2,36 USD, sobre todo por la amortización (0,13) y el valor razonable de participaciones (0,06) [${N3}]. El patrimonio negativo`);

// Capital
a.capital.politica = a.capital.politica.replace('reducir deuda hasta ≈ 2 veces el EBITDA ajustado a final de 2026; sin recompras en 2026 [16, 13, 14].', `reducir deuda hasta cerca de 2 veces el EBITDA ajustado a final de 2026 (2,17 veces a 30-sep); sin recompras en 2026 [16, 13, 14, ${N3}, ${T3}].`);
a.capital.comentario = a.capital.comentario.replace('La asignación de capital se juzga', `En 2026 la caja va a dividendo y deuda: la deuda neta baja de 43.963 a 40.879 M en nueve meses [${T3}]. La asignación de capital se juzga`);

// Negocio
const k = a.negocio.kpis;
k[1].comentario = `IQOS: 76 % del volumen mundial de la categoría; en el 3T26 envíos +1,5 % y ventas al consumidor +7,1 % [6, 2, ${N3}].`;
k[2].comentario = `Cuota del 25,9 % de la categoría (sin China ni EE. UU.) en el 3T26, +0,4 puntos; envíos de nueve meses −1,2 % [6, ${N3}].`;
k[3].comentario = `En nueve meses de 2026, envíos de bolsas en EE. UU. −5,8 %; en el 3T26, +4,2 % y +1 punto de cuota de junio a septiembre según Nielsen [6, ${N3}].`;
k[4].comentario = `Más del 40 % en el 3T26 y ≈ 42 % en nueve meses [2, ${N3}].`;
k[5].comentario = `9M26: 6,52 (+11,8 %). Guía 2026: 8,29-8,44 (8,11-8,26 sin divisa) [2, ${N3}].`;
a.negocio.clientes = a.negocio.clientes.replace('y el 10 % en el 2T26 [6, 4].', `el 10 % en el 2T26 y el 8,9 % en el 3T26 [6, 4, ${N3}].`);
a.negocio.clientes = a.negocio.clientes.replace('pero en 2026 tuvo que lanzar ZYN ULTRA a menor precio por bolsa [2, 4].', `pero en 2026 tuvo que lanzar ZYN ULTRA a menor precio por bolsa y pasará la mayoría de la gama a latas de 20 bolsas en el 4T26 «para optimizar la prima de precio» [2, 4, ${N3}].`);

// Huecos
a.huecos.push({ seccion: 'financieros', campo: 'ltm.fcf (inversión del 3T26)', tipo: 'Complemento', intentos: '1) Nota de resultados del 3T26 (anexo 99.1): solo flujo operativo y guía de inversión; 2) anexo 99.2, Schedule 17: solo flujo operativo; 3) XBRL de la SEC (companyconcept PaymentsToAcquirePropertyPlantAndEquipment): llega al 2T26, el 10-Q del 3T26 aún no está presentado', decision: 'Calculado y marcado como estimación (inversión del 3T26 = 383 M, mitad de lo que queda hasta el centro de la guía)' });

a._estado = 'terminado';
fs.writeFileSync(ruta, JSON.stringify(a, null, 2));
console.log('fuentes nuevas', ids, 'LTM', a.financieros.ltm);

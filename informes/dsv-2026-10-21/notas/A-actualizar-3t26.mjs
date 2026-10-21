// Actualiza la nota A de DSV con el informe del 3T26 (anuncio 1175, 21-oct-2026).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const ruta = join(dir, 'A.json');
const d = JSON.parse(readFileSync(ruta, 'utf8'));
const out = { _estado: 'terminado', ...d };

// ---------- fuentes nuevas ----------
out.fuentes = d.fuentes.filter(f => f.id <= 14);
out.fuentes.push(
  { id: 15, titulo: 'DSV Interim Financial Report Q3 2026 (anuncio 1175)', editor: 'DSV A/S', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://ml-eu.globenewswire.com/Resource/Download/c7949206-ddf2-4dd1-a4ce-bea6b5459fa3' },
  { id: 16, titulo: 'Launch of new share buyback programme according to the Safe Harbour method (anuncio 1174)', editor: 'DSV A/S', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://ml-eu.globenewswire.com/Resource/Download/59a867f7-2e62-4da3-9aaf-f4102a25e30f' },
  { id: 17, titulo: 'DSV shares surge on third-quarter revenue beat, share buyback launch', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://ca.investing.com/news/earnings/dsv-shares-surge-on-thirdquarter-revenue-beat-share-buyback-launch-4892392' },
  { id: 18, titulo: 'DSV slår förväntningarna (2T26 frente al consenso de S&P Global Market Intelligence)', editor: 'EFN', tipo: 'Prensa', fecha: '2026-07-22', url: 'https://efn.se/dsv-slar-forvantningarna' },
  { id: 19, titulo: 'S&P revises DSV’s A- rating outlook to negative following Schenker deal', editor: 'Air Cargo News', tipo: 'Prensa', fecha: '2024-09-18', url: 'https://aircargonews.net/sandp-revises-dsvs-a-rating-outlook-to-negative-following-schenker-deal/1073617.article' },
);

// ---------- financieros ----------
const f = out.financieros;
// LTM sep-26 = 2025 + 9M26 - 9M25 (antes de partidas especiales)
f.ltm = {
  periodo: 'LTM sep-26',
  fecha_fin: '2026-09-30',
  ingresos: 247331 + 227806 - 175646,      // 299.491
  ebitda: 28244 + 25688 - 20184,            // 33.748
  ebit: 19611 + 17716 - 14019,              // 23.308
  beneficio_neto: 8095 + 6907 - 7178,       // 7.824
  bpa: 32.81,                               // 7.824 / 238,430 M acciones diluidas medias LTM
  dpa: 7,
  dpa_extraordinario: 0,
  fcf: 16335 + 8742 - 10976,                // 14.101 (flujo libre ajustado de DSV)
  participadas_en_ebitda: null,
  no_recurrentes_en_ebitda: null,
};
f.comentario = f.comentario.replace(
  /El LTM a jun-26 \(290\.772 M de ingresos, 22\.136 M de EBIT antes de partidas especiales\) ya tiene Schenker los doce meses y es la primera base limpia de perímetro \[2\]\./,
  'El LTM a sep-26 (299.491 M de ingresos, 33.748 M de EBITDA y 23.308 M de EBIT antes de partidas especiales) tiene Schenker los doce meses y compara limpio con el LTM a jun-26 (290.772 M y 22.136 M) [2, 15]. En el 3T26 los ingresos suben un 10,5 % a tipo constante y sin cambio de perímetro (Schenker ya estaba en el 3T25), pero el margen bruto solo un 2,3 %: el margen bruto sobre ventas cae de 27,1 % a 25,1 % porque los fletes y el combustible más caros se repercuten sin margen; el EBIT antes de partidas especiales sube un 19,5 % (margen operativo de 7,5 % a 8,2 %, conversión de 27,9 % a 32,6 %) por las sinergias, que bajan los costes en 427 M, y por 300 M de plusvalías inmobiliarias [15].'
);
f.ajustes = 'DSV presenta el EBITDA y el EBIT antes de partidas especiales (special items); en la cuenta de esta nota van esas cifras tal como las publica, y las partidas especiales quedan entre el EBIT y el beneficio antes de impuestos (por eso bai = ebit + resultado financiero − partidas especiales) y no dentro del EBITDA, de ahí que `no_recurrentes_en_ebitda` vaya vacío. Partidas especiales (M DKK): 2016 1.002 (UTi); 2017 525; 2018 0; 2019 800 (Panalpina); 2020 2.164 (Panalpina); 2021 478 (GIL); 2022 1.117; 2023 0; 2024 853 (Schenker, de ellas 196 de costes de transacción); 2025 4.527 (Schenker; 554 de transacción) [1, 4, 6, 7]. 9M26: 4.197 (1.276 en el 3T26), todo integración de Schenker; acumulado desde la compra unos 8.700 M de un total previsto de unos 11.000 M; para 2026 se esperan ahora unos 5.500 M (antes 6.500 M) y el resto en 2027 [15]. Se repiten en cada compra grande: son recurrentes para un consolidador. Dentro del EBIT antes de partidas especiales sí van plusvalías por venta de inmuebles de Schenker: unos 250 M en el 2T26 y 300 M en el 3T26 (550 M en 9M26), y la guía de 2026 cuenta con otras parecidas en el 4T26 [2, 15]; no se restan aquí porque el consenso y la guía las incluyen, pero son el 4,5 % del EBIT del 3T26 y no se repetirán cuando acabe la venta de inmuebles. 2025 incluye una pérdida de actividades interrumpidas de 291 M [1]. LTM sep-26 calculado como 2025 − 9M25 + 9M26 con cifras antes de partidas especiales; el beneficio atribuido LTM (7.824 M) cuadra con el BPA básico LTM publicado (32,9 DKK × 237,924 M acciones) y el BPA diluido LTM (32,81) es ese beneficio entre 238,430 M acciones diluidas medias [1, 11, 15]. El BPA diluido ajustado LTM que publica DSV (antes de partidas especiales y de amortización de intangibles comprados) es 56,1 DKK (50,3 un año antes) [15]. El FCF LTM (14.101 M) es el flujo libre ajustado de DSV (después de arrendamientos, antes de partidas especiales pagadas y de compras): 16.335 M de 2025 − 10.976 M de 9M25 + 8.742 M de 9M26; incluye 6.405 M de venta de inmovilizado en 9M26 [1, 15]. Para 2016 y 2019, bai e impuestos derivados de la tabla de cinco años [6, 7]. Los crecimientos trimestrales se calculan sobre los ingresos del mismo trimestre del año anterior publicados en cada informe, y el EBITDA del 4T como el anual menos los nueve meses [1, 3, 8-12, 15]. Desde 2027 DSV aplicará la NIIF 18, que reclasificará líneas de la cuenta y redefinirá sus indicadores clave [15].';
f.confianza = 'Alta';
out.financieros = f;

// ---------- trimestres ----------
const t = out.trimestres;
const items = t.items.filter(i => i.periodo !== '3T24');
const i3t25 = items.find(i => i.periodo === '3T25');
i3t25.bpa = 8.7;
const i2t26 = items.find(i => i.periodo === '2T26');
i2t26.vs_consenso = 'Superior';
items.push({ periodo: '3T26', ingresos: 80702, crecimiento_pct: 12.1, crecimiento_organico_pct: 10.5, ebitda: 9314, margen_ebitda_pct: 11.5, bpa: 12.6, vs_consenso: 'En línea' });
t.items = items;
t.ultima_presentacion = 'La conferencia del 3T26 (21-oct-2026, 11:00 CEST) no se había celebrado al cerrar esta nota; lo que sigue compara los informes del 2T26 y del 3T26 [2, 15]. El 3T26 dio ingresos de 80.702 M DKK (+10,5 % a tipo constante), margen bruto de 20.253 M (+2,3 %), EBIT antes de partidas especiales de 6.606 M (+19,5 %, con 300 M de plusvalías inmobiliarias) y beneficio ajustado de 4.065 M [15]. Frente al consenso previo que recoge Investing.com (sin citar proveedor), superó en ingresos (74.700 M) y en beneficio ajustado (3.850 M) y quedó un 0,8 % por debajo en EBIT (6.660 M) [17]; en el 2T26 el EBIT (6.255 M) había batido los 6.100 M del consenso de S&P Global Market Intelligence [18]. Cambian cuatro mensajes. La guía de EBIT antes de partidas especiales de 2026 se estrecha a 24.000-25.000 M (antes 23.500-25.500 M): sube el suelo, baja el techo y el punto medio sigue en 24.500 M, con plusvalías inmobiliarias en el 4T incluidas [15]. Las sinergias siguen «al nivel» de 9.000 M anuales, pero ahora en parte compensadas por la inflación y por los costes del crecimiento de Contract Logistics, y las de Road y algunas funciones de grupo se retrasan a 2027; por eso las partidas especiales de 2026 bajan a unos 5.500 M (antes 6.500 M), con el total de unos 11.000 M intacto y unos 8.700 M ya reconocidos [2, 15]. En Road, que en el 2T26 llevó a cambiar equipos y a poner al COO al frente, el EBIT cae un 35,1 % (526 M, 195 M de ellos plusvalías) con volumen negativo, aunque la operativa «se normalizó» al final del trimestre [2, 15]. Y con el apalancamiento en 2,5x DSV lanza su primera recompra desde Schenker (1.500 M DKK hasta el 1-feb-2027) [15, 16]. Lo flojo: volumen aéreo y marítimo −3 % y pérdida de pequeños y medianos clientes en Europa [15].';
t.confianza = 'Alta';
out.trimestres = t;

// ---------- balance ----------
const b = out.balance;
b.liquidez = 'A 30-sep-2026: caja 13.753 M DKK y líneas de crédito comprometidas no dispuestas de 13.500 M DKK (1.800 M EUR), más líneas no comprometidas; bonos por 13.100 M DKK (1.750 M EUR) vencen en los 12 meses siguientes; en 9M26 se devolvieron 7.547 M de préstamos y se tomaron 2.159 M [15]. A 30-jun-2026: caja 10.058 M y 11.800 M de líneas comprometidas [2]. A 31-dic-2025: caja 13.179 M [1].';
b.rating = 'S&P: A- (confirmado en sep-2024 con perspectiva negativa por la compra de Schenker) [19]. No se ha podido abrir la nota vigente de S&P ni la opinión de crédito de Moody’s de 7-oct-2026 que DSV aloja en su web (acceso denegado).';
b.vida_media_anios = 5.1;
b.comentario = 'La deuda neta con arrendamientos (definición de DSV, que incluye pensiones) pasó de −529 M DKK a cierre de 2024 (caja de la ampliación y los bonos aún sin usar) a 86.624 M a cierre de 2025, 87.331 M a 30-jun-2026 y 82.868 M a 30-sep-2026 (88.985 M un año antes) [1, 2, 15]. El apalancamiento (deuda neta / EBITDA de 12 meses) baja de 2,8x a cierre de 2025 y 2,7x en jun-26 a 2,5x en sep-26 [15]. Antes de Schenker se movía entre 18.000 y 35.000 M (29.245 M en 2021, 34.583 M en 2023) [1, 6]. El circulante neto que publica DSV sube a 10.926 M en sep-26 (5.018 M en sep-25; 3,4 % de las ventas anuales estimadas, 3,0 % sin los cobros pendientes por inmuebles vendidos, frente al objetivo de 2-3 %) por fletes y combustible más caros [15]. A 30-sep-2026: bonos 61.038 M y créditos 989 M (deuda financiera 62.027 M: 48.232 M a largo y 13.795 M a corto), arrendamientos 32.951 M, caja 13.753 M, pensiones 1.844 M, patrimonio de la dominante 129.297 M y minoritarios 375 M; clientes 56.173 M, activos de contrato 14.311 M, existencias 1.625 M, proveedores 27.275 M y coste devengado de servicios 14.433 M [15]. La contabilidad de la compra de Schenker quedó cerrada en 2026 (fondo de comercio de 74.986 M) [15].';
b.confianza = 'Alta';
out.balance = b;

// clave aparte para el puente
out.balance_30sep26 = {
  fecha: '2026-09-30',
  deuda_financiera: 62027,
  deuda_financiera_detalle: 'Bonos 61.038 M + descubiertos y líneas de crédito 989 M; 48.232 M a largo y 13.795 M a corto [15]',
  arrendamientos: 32951,
  arrendamientos_detalle: '26.035 M a largo + 6.916 M a corto [15]',
  caja: 13753,
  pensiones: 1844,
  minoritarios: 375,
  nibd_publicada: 82868,
  nibd_comentario: 'NIBD de DSV con arrendamientos NIIF 16. Deuda financiera + arrendamientos − caja = 81.225 M; la diferencia de 1.643 M con la publicada es casi toda las pensiones (1.844 M) menos unos 200 M de otros activos que devengan intereses [15].',
  apalancamiento_x: 2.5,
  acciones_emitidas_mill: 240.445,
  autocartera_mill: 1.666,
  acciones_diluidas_mill: 238.353,
  fuente: '[15]',
};

// ---------- flujos ----------
const fl = out.flujos;
fl.comentario = fl.comentario.replace(
  /En el 2T26 cayó a 786 M \(conversión ajustada del 36,9 %\) por la subida temporal del circulante \[2\]\./,
  'En el 2T26 cayó a 786 M (conversión ajustada del 36,9 %) por la subida temporal del circulante [2]; en el 3T26 subió a 6.439 M (conversión del 128,6 %) gracias a 3.189 M de caja de la venta de inmuebles de Schenker [15]. En 9M26 el flujo libre ajustado es de 8.742 M (10.976 M en 9M25): flujo operativo de 5.705 M, lastrado por −10.329 M de circulante y 4.649 M de partidas especiales pagadas, más 6.405 M de venta de inmovilizado, menos 2.716 M de capex y 5.339 M de arrendamientos [15]. Sin la venta de inmuebles, el flujo libre de 2026 sería muy inferior al de 2025: la caja de 2026 depende de desinversiones que no se repetirán.'
);
fl.confianza = 'Alta';
out.flujos = fl;

// ---------- calidad ----------
const c = out.calidad;
c.comentario = c.comentario
  .replace('La contabilidad de Schenker es provisional: de 86.807 M DKK pagados', 'La contabilidad de Schenker quedó cerrada en 2026 (ajustes de 120 M en el periodo de medición): de 86.807 M DKK pagados')
  .replace('en el 1S26 el fondo de comercio se ajustó a 74.986 M [2].', 'el fondo de comercio definitivo es 74.986 M [2, 15].')
  .replace('En el 2T26, unos 250 M del EBIT de Road (999 M) vienen de ventas de inmuebles [2].', 'En el 2T26, unos 250 M del EBIT de Road (999 M) vienen de ventas de inmuebles, y en el 3T26 son 300 M del EBIT del grupo (195 M en Road y 105 M en Contract Logistics), contabilizados dentro del margen bruto [2, 15]. Los minoritarios se llevan 375 M del beneficio de 9M26 frente a 60 M en 9M25 (solo 11 M en el 3T26), un salto que el informe no explica [15].');
c.senales = c.senales.map(s => {
  if (s.senal.startsWith('Asignación del precio')) return { senal: 'Poco intangible amortizable en la compra de Schenker', nivel: 'Media', comentario: 'Asignación ya definitiva: relaciones con clientes de 1.627 M frente a 74.986 M de fondo de comercio; menos amortización futura y más riesgo de deterioro si la integración falla [1, 15].' };
  if (s.senal.startsWith('Partidas especiales')) return { ...s, comentario: 'Aparecen en 2016-2017, 2019-2022 y 2024-2026; unos 11.000 M para Schenker, ~8.700 M ya reconocidos a sep-26 y parte desplazada a 2027. El EBIT «antes de partidas especiales» sobrestima el beneficio de un consolidador en serie [1, 15].' };
  if (s.senal.startsWith('Flujo de caja')) return { ...s, comentario: 'Conversión ajustada del 117 % en 2025, 36,9 % en el 2T26 y 128,6 % en el 3T26, este gracias a 3.189 M de venta de inmuebles; el circulante resta 10.329 M en 9M26 [1, 2, 15].' };
  if (s.senal.startsWith('Plusvalías')) return { ...s, comentario: 'Unos 250 M en el 2T26 y 300 M en el 3T26 (550 M en 9M26; el 4,5 % del EBIT del 3T26), y la guía de 2026 cuenta con más en el 4T26 [2, 15].' };
  return s;
});
c.senales.push({ senal: 'Salto del beneficio atribuido a minoritarios', nivel: 'Baja', comentario: '375 M en 9M26 frente a 60 M en 9M25, con 341 M de dividendos a minoritarios; el informe no da la causa [15].' });
c.senales.push({ senal: 'Cambio de presentación con la NIIF 18 en 2027', nivel: 'Baja', comentario: 'DSV reclasificará líneas de la cuenta y redefinirá sus indicadores clave; las series de EBIT y conversión pueden no ser comparables desde 2027 [15].' });
out.calidad = c;

// ---------- capital ----------
const k = out.capital;
k.politica = 'Orden de prioridades declarado para el flujo libre: 1) reducir deuda cuando el apalancamiento supera el objetivo (deuda neta con arrendamientos por debajo de 2,0x el EBITDA antes de partidas especiales); 2) compras e inversiones que creen valor; 3) devolver capital, sobre todo con recompras y con un dividendo de aproximadamente el 10 % del beneficio neto [1]. El dividendo pagado en 2026 por el ejercicio 2025 fue de 7,00 DKK por acción (1.683 M), igual que en 2023 y 2024 [1, 15]. Las recompras se suspendieron al anunciar Schenker (sep-2024); con el apalancamiento en 2,5x a sep-26 (2,8x a cierre de 2025) y la integración casi terminada, el 21-oct-2026 DSV lanzó una recompra de hasta 1.500 M DKK y 2,6 millones de acciones (1,09 % del capital) hasta el 1-feb-2027, para ajustar la estructura de capital y cubrir planes de incentivos; las acciones que no se usen se propondrán amortizar [15, 16]. Entre 2021 y 2023 DSV recompró acciones por 52.151 M DKK [1].';
k.adquisiciones = k.adquisiciones.map(a => a.anio === '2025' ? { ...a, resultado: 'Cerrada el 30-abr-2025 [14]. Valor empresa anunciado de 14.300 M EUR (unos 107.000 M DKK): 0,77x ventas y 14,0x EBIT de los últimos 12 meses [13]. Fondo de comercio definitivo de 74.986 M [15]. Sinergias de unos 9.000 M DKK al año, ahora en parte compensadas por la inflación y con las de Road y algunas funciones de grupo retrasadas a 2027; costes de integración de ~11.000 M, ~8.700 M ya reconocidos a sep-26 [15]. ROIC antes de impuestos del 11,4 % LTM sep-26 frente al 15,4 % de 2024; Road con EBIT −35,1 % en el 3T26 por problemas operativos en Alemania, Francia y Benelux, normalizados a final de trimestre [15].' } : a);
k.comentario = k.comentario.replace('El juicio sobre la compra depende de las sinergias de 2026-2027 y de recuperar Road.', 'A 30-sep-2026 hay 240,445 millones de acciones emitidas, 1,666 millones en autocartera (igual a 20-oct) y 238,353 millones diluidas; en 9M26 DSV vendió autocartera por 2.838 M para opciones ejercidas [15]. La recompra de 1.500 M anunciada el 21-oct-2026 compensa algo más que esa venta y no reduce el número de acciones de forma relevante [16]. El juicio sobre la compra depende de las sinergias de 2026-2027, retrasadas en parte, y de recuperar Road.');
out.capital = k;

// ---------- negocio (datos) ----------
const n = out.negocio;
n.segmentos = n.segmentos.map(s => s.nombre.startsWith('Otros') ? { ...s, nombre: 'Global Products, grupo y eliminaciones', descripcion: 'Partidas no asignadas y eliminaciones entre divisiones; desde el 3T26 incluye Global Products (ferias, paquetería y aduanas, unos 3.000 FTE) [15].' } : s);
const kp = n.kpis;
const set = (pref, campos) => { const x = kp.find(q => q.kpi.startsWith(pref)); if (x) Object.assign(x, campos); };
set('Volumen marítimo', { comentario: 'Con Schenker 8 meses. Serie: 1.389.611 (2017), 1.442.348 (2018), 2.204.902 (2020), 2.493.951 (2021), 2.665.147 (2022), 2.519.295 (2023). 9M26: 3.029.414 TEU (+13 %); 3T26: 1.045.436 (−3 % frente a 1.072.808), por Oriente Medio y la integración en Alemania [1, 2, 4, 6, 7, 15].' });
set('Margen bruto por TEU', { comentario: 'Schenker aporta rendimientos más bajos: 4.026 DKK en 9M26 frente a 4.454 en 9M25; en el 3T26, 4.142 frente a 4.118 [1, 15].' });
set('Volumen aéreo', { comentario: 'Serie: 635.655 (2017), 689.045 (2018), 1.272.405 (2020), 1.510.833 (2021), 1.557.972 (2022), 1.305.827 (2023). 9M26: 1.637.146 t (+15 %); 3T26: 560.890 t (−3 % frente a 578.569) [1, 2, 4, 6, 7, 15].' });
set('Margen bruto por tonelada', { comentario: '9M26: 8.638 frente a 8.514; 3T26: 8.936 frente a 8.196 por la escasez de capacidad y los recargos ligados a Oriente Medio [1, 15].' });
set('Ratio de conversión', { comentario: 'Por división en 2025: Air & Sea 40,2 % (48,1 %), Road 16,5 % (24,2 %), Contract Logistics 20,4 % (23,2 %). Máximo de 48,3 % en 2022. 3T26: grupo 32,6 % (27,9 %), Air & Sea 45,8 %, Road 11,7 %, Contract Logistics 28,1 %; 9M26: 29,8 %. Objetivo 2030 de al menos el 45 % [1, 15].' });
set('ROIC antes de impuestos', { comentario: 'Serie: 21,5 % (2016), 23,4 % (2017), 26,7 % (2018), 13,4 % (2019), 14,3 % (2020), 19,6 % (2021), 25,1 % (2022), 17,8 % (2023); 10,8 % LTM jun-26 y 11,4 % LTM sep-26 (Air & Sea 13,5 %, Road 7,3 %, Contract Logistics 10,9 %). Sin fondo de comercio ni relaciones con clientes: 77,9 % (2021), 105,1 % (2022), 76,3 % (2023), 57,7 % (2024), 48,1 % (2025), 43,5 % LTM sep-26 [1, 2, 6, 7, 15].' });
set('Empleados', { comentario: '148.405 FTE a 30-sep-2026 (159.490 un año antes); más de 8.000 puestos de oficina menos desde el inicio de la integración (a jun-26) [1, 2, 15].' });
kp.push({ kpi: 'EBIT antes de partidas especiales por división (3T26, M DKK)', valor_anterior: 'Air & Sea 3.532; Road 798; Contract Logistics 1.098 (3T25)', valor_actual: 'Air & Sea 4.278; Road 526; Contract Logistics 1.673 (3T26)', variacion: '+18,9 %; −35,1 %; +50,3 % (tipo constante)', comentario: 'Ingresos del 3T26: Air & Sea 45.645 M (+15,9 %), Road 23.375 M (−1,0 %), Contract Logistics 14.280 M (+7,3 %); margen bruto 9.342 M (+0,2 %), 4.498 M (−11,2 %) y 5.956 M (+1,0 %). Road y Contract Logistics incluyen 195 M y 105 M de plusvalías inmobiliarias. Por geografía, Europa es el 53,4 % de los ingresos de servicios del 3T26 [15].' });
out.negocio = n;

// ---------- huecos ----------
out.huecos = d.huecos.map(h => {
  if (h.campo.startsWith('rating')) return { ...h, intentos: '1) Informes anuales 2024-2025 e informes del 1S26 y 3T26: no citan el rating de DSV; 2) investor.dsv.com y su espejo dsv.gcs-web.com alojan una actualización de S&P (may-2026) y una opinión de crédito de Moody’s (7-oct-2026), pero devuelven acceso denegado con curl y WebFetch; 3) prensa: Air Cargo News confirma A- de S&P con perspectiva negativa (sep-2024)', decision: 'Dato de prensa de 2024; perspectiva vigente sin confirmar' };
  if (h.campo.startsWith('BPA trimestral')) return { ...h, intentos: '1) Informes trimestrales: el BPA ajustado solo se publica en 12 meses (56,1 DKK a sep-26); el diluido trimestral solo en el 3T (12,6 en 3T26 y 8,7 en 3T25); 2) informe anual 2025: sin BPA trimestral; 3) consenso previo: Investing.com para el 3T26 y EFN (S&P Global MI) para el 2T26; los anteriores, no buscados', decision: 'Omitido para 4T24-2T26' };
  if (h.campo.startsWith('transcripciones')) return { ...h, campo: 'transcripciones de las conferencias del 2T26 y 3T26', intentos: '1) investor.dsv.com: acceso denegado; 2) MFN: solo los avisos de convocatoria; 3) la del 3T26 es el 21-oct a las 11:00 CEST, después del cierre de esta nota', decision: 'Omitido' };
  return h;
});

writeFileSync(ruta, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log('ok', out.financieros.ltm, out.trimestres.items.map(i => i.periodo).join(' '));

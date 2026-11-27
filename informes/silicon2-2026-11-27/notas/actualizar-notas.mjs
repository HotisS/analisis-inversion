// Iteración del 27-nov-2026 (corte 2026-11-27, cierre del 27-nov en Seúl) tras el 3T26 (aviso provisional del 11-nov e
// informe trimestral 분기보고서 del 13-nov). Se ejecuta DESPUÉS de construir-notas.mjs (que reescribe A-E con la estructura y
// los hechos estables del informe del 20-oct, ya con bolsa.json y comparables-yahoo-raw.json del 27-nov) y vuelve a escribir
// lo que cambia o se ha vuelto a comprobar: 3T26, LTM, balance de 30-sep, recompra, accionistas, consenso posterior a los
// resultados, bolsa, comparables y foro. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node construir-notas.mjs && node actualizar-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (l) => JSON.parse(fs.readFileSync(path.join(dir, `${l}.json`), 'utf8'));
const guarda = (l, o) => fs.writeFileSync(path.join(dir, `${l}.json`), JSON.stringify(o, null, 2) + '\n', 'utf8');
const DART = (r) => `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${r}`;
const WR = (p) => `https://navercomp.wisereport.co.kr/v2/company/${p}.aspx?cmp_cd=257720`;
const nueva = (lista, f) => { const id = lista.length + 1; lista.push({ id, ...f }); return id; };
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const PRECIO = 30250; // cierre del 27-nov-2026 en el KOSDAQ (Yahoo; FnGuide da 29.600 al 26-nov)

const prensa = {
  sedaily: { titulo: '해외서 돈 벌어도 순이익은 \'뚝\'…환율 급락에 소비재 기업 \'울상\' (con datos de la FSS: el resultado por cambio de Silicon2 pasó de +7.400 M en el 3T25 a −56.500 M en el 3T26; USD/KRW de 1.541,5 a 1.358,4 entre junio y septiembre)', editor: 'Seoul Economic Daily', fecha: '2026-11-19', url: 'https://www.sedaily.com/article/20116169' },
  mkcut: { titulo: '원화 강세에 수익성 악화…실리콘투 목표주가 \'뚝\' (3T26: beneficio operativo 15 % bajo el consenso de 81.800 M; coste de ventas del 68 % al 71 % por un cambio medio ≈ 6 % peor; pérdidas de cambio de 57.700 M)', editor: 'Maeil Business (MK Economy)', fecha: '2026-11-13', url: 'https://www.mk.co.kr/article/12208029' },
  kis: { titulo: '한국투자 "실리콘투 목표주가 하향, 환율·신사업 비용에 수익성 불확실성 커져" (KIS: objetivo de 65.000 a 46.000; margen bruto del 28,7 %, −3,3 puntos; gastos de personal +71 %; subida de precios para volver al ≈ 30 % en el 4T)', editor: 'BusinessPost', fecha: '2026-11-13', url: 'https://www.businesspost.co.kr/BP?command=article_view&num=451918' },
  kb: { titulo: 'KB증권, 11월 둘째주 27종목 매수 추천 (KB: 3T26 en línea con su estimación; Norteamérica +49,4 % y Latinoamérica +123,3 %; objetivo de 52.000 a 45.000 con DCF al 9,8 %)', editor: 'Bigta News', fecha: '2026-11-14', url: 'https://www.bigtanews.co.kr/article/view/big202611140003' },
  samsung: { titulo: '삼성증권, 11월 둘째주 41종목 매수 추천 (Samsung: insolvencias de clientes de 2.300 M y gastos de personal de moida y filiales nuevas; objetivo de 47.000 a 40.000)', editor: 'Bigta News', fecha: '2026-11-14', url: 'https://www.bigtanews.co.kr/article/view/big202611140004' },
  yuanta: { titulo: '[모닝 리포트] "실리콘투, 최대 매출에도 환율에 발목…목표가 45% 하향" (Yuanta: objetivo de 56.000 a 31.000)', editor: 'Newspim', fecha: '2026-11-16', url: 'https://www.newspim.com/news/view/20261116000124' },
  rally: { titulo: '"폭락장서 나 홀로 27% 급등"…증권가 목표가 줄상향한 \'이 종목\' (cosmética coreana del 19 al 26-nov: Silicon2 +24,9 % tras la cumbre China-Corea del 18-nov; exportaciones de cosmética del 1 al 20-nov +61,7 %; USD/KRW de vuelta a 1.343)', editor: 'Edaily', fecha: '2026-11-26', url: 'https://www.edaily.co.kr/News/Read?newsId=03968806645649656&mediaCodeNo=257' },
  koreareport: { titulo: '올리브영·실리콘투·에이피알·코스맥스 질주...K-뷰티 성장축 다변화 (3T26: margen operativo del 21,1 % al 16,4 %)', editor: 'Korea Report', fecha: '2026-11-18', url: 'https://www.koreareport.co.kr/news/articleView.html?idxno=55167' },
};

// ============================================================ A. Cuentas
const A = lee('A');
const a19 = nueva(A.fuentes, { titulo: '분기보고서 3T26 (informe trimestral, revisión limitada): cuenta del 3T26 y 9M26 con el 3T25/9M25 comparativo, balance a 30-sep-2026, flujos de 9M26, notas de resultado financiero (diferencias de cambio), otros resultados, RCPS, asociadas, ventas por región y canal, accionistas y hechos posteriores', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2026-11-13', url: DART('20261113000882') });
const a20 = nueva(A.fuentes, { titulo: '연결재무제표기준영업(잠정)실적(공정공시): resultados provisionales consolidados del 3T26 (ventas 424.363 M, beneficio operativo 69.617 M, BAI 22.083 M, beneficio 8.801 M)', editor: 'Silicon2 / KRX', tipo: 'Primaria', fecha: '2026-11-11', url: DART('20261111900551') });
const a21 = nueva(A.fuentes, { ...prensa.sedaily, tipo: 'Prensa' });
const a22 = nueva(A.fuentes, { ...prensa.mkcut, tipo: 'Prensa' });
const a23 = nueva(A.fuentes, { ...prensa.kis, tipo: 'Analistas' });
const a24 = nueva(A.fuentes, { ...prensa.kb, tipo: 'Analistas' });
const a25 = nueva(A.fuentes, { titulo: '주요사항보고서(자기주식취득신탁계약해지결정) y 신탁계약해지결과보고서: fideicomiso de recompra terminado con 163.500 acciones compradas; autocartera de 286.700 acciones; 65.576.252 ordinarias emitidas', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2026-11-13', url: DART('20261113000442') });
const a26 = nueva(A.fuentes, { ...prensa.samsung, tipo: 'Analistas' });

// LTM sep-26 = 2025 − 9M25 + 9M26 [A1, A19]. Amortización: 8.851 − 6.107 + 12.117 = 14.861. BPA diluido 2.714 − 2.086 + 2.124.
// FCF = flujo operativo (1.141 + 2.602 + 109.714 = 113.457) − capex (7.039 − 5.410 + 52.176 = 53.805) − arrendamientos
// (5.846 − 4.068 + 8.675 = 10.453) = 49.199.
A.financieros.ltm = { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 1479465, ebitda: 274366, ebit: 259505, beneficio_neto: 171275, bpa: 2752, dpa: 306, dpa_extraordinario: 0, fcf: 49199, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null };
A.financieros.comentario = `Las ventas pasaron de 131.002 M KRW en 2021 a 1.116.287 M en 2025: un crecimiento anual del 70,8 %, todo orgánico, que se duplicó en 2023 (+107 %) y en 2024 (+102 %) y siguió en 2025 (+61 %) [1, 2]. En 9M26 crecieron un 44,8 % (1.173.516 M, ya más que todo 2025) y en el 3T26 un 41,7 % (424.363 M), pese a un won que se apreció un 11,9 % frente al dólar entre junio y septiembre [${a19}, ${a21}]. **El 94,1 % de las ventas de 9M26 fue mayorista a empresas** (1.104.641 M), el 4,6 % venta al público (Stylekorean.com y tiendas moida) y el 1,2 % fulfillment [${a19}]. El margen operativo subió del 6,7 % (2021) al 19,9 % (2024), bajó al 18,4 % en 2025 y fue del 19,7 % en el 1S26, pero **cayó al 16,4 % en el 3T26** (21,1 % en el 3T25): el margen bruto bajó 3,3 puntos (al 28,7 %) por un cambio medio ≈ 6 % peor y los gastos de personal subieron un 71 % por moida y las filiales nuevas, más 2.300 M de insolvencias de clientes [${a19}, ${a23}, ${a26}]. Es un margen muy alto para un distribuidor: el margen bruto del 29-32 % sale de comprar en won a marcas pequeñas y vender en dólares y euros a minoristas de 175 países.`;
A.financieros.ajustes = `Cifras publicadas K-IFRS, sin ajustes. **El 3T26 lleva 55.088 M de pérdida neta por cambio por debajo del beneficio operativo** (diferencias realizadas −20.695 M y de conversión −27.922 M; anulación de 11.308 M de ganancias de conversión del 1S; +3.415 M y +1.422 M de ganancias realizadas y de seguros de cambio) y 2.612 M de pérdida en derivados de cambio [${a19}]; la FSS lo cifra en −56.500 M frente a +7.400 M en el 3T25 [${a21}]. Además, 3.931 M de deterioro de asociadas (Sukoshi Mart, Canadá), −999 M de puesta en equivalencia y 15.642 M de «otros ingresos varios» sin explicar en las notas [${a19}]. Con un tipo efectivo del 60 % en el trimestre (13.282 M sobre 22.083 M de BAI), el beneficio cayó un 84,9 % (8.801 M; BPA diluido de 134 KRW frente a 873) [${a19}, ${a20}]. Las pérdidas de cambio no son de caja en su mayor parte (conversión de clientes, caja y saldos con filiales en dólares y euros) y no se repiten si el won se queda donde está; los gastos de personal y el margen bruto más bajo sí son recurrentes con el won de hoy. Otros avisos: el 4T25 llevó bonus y una provisión de existencias (margen operativo del 13,9 %); las RCPS de CVC (300.000 M) son pasivo financiero a coste amortizado (261.854 M a 30-sep) y su acreción pasa por gastos financieros hasta que se conviertan [${a19}].`;
A.financieros.confianza = 'Alta';

A.trimestres.items = A.trimestres.items.filter((t) => t.periodo !== '3T24');
// 3T26: beneficio operativo 69.617 + amortización 4.723 (12.117 de 9M26 − 7.394 del 1S26) = 74.340 [A19].
A.trimestres.items.push({ periodo: '3T26', ingresos: 424363, crecimiento_pct: 41.7, crecimiento_organico_pct: 41.7, ebitda: 74340, margen_ebitda_pct: 17.5, bpa: 134, vs_consenso: 'Inferior' });
A.trimestres.ultima_presentacion = `Silicon2 dio el 3T26 el 11-nov (aviso provisional y conferencia en línea con analistas a las 17:00) y presentó el informe trimestral el 13-nov; el 19-nov hizo reuniones con inversores en Seúl con KB [${a20}, ${a19}]. No publica transcripción: lo que sigue sale de las notas de las casas. **Ventas récord por séptimo trimestre (424.363 M, +41,7 %) y beneficio operativo de 69.617 M (+10,4 %), un 15 % por debajo del consenso de 81.800 M** [${a20}, ${a22}]. El mensaje de la dirección cambió entre agosto y noviembre: en el 2T26 (margen del 20,6 %) el discurso era de capacidad y existencias compradas por adelantado; en el 3T26 reconoció el golpe del won (margen bruto del 28,7 %, −3,3 puntos) y anunció subidas de precio para volver a un margen bruto del ≈ 30 % en el 4T, además de gastos de personal adelantados (+71 %) para moida, Japón y Latinoamérica [${a23}, ${a26}]. Lo que más preguntaron los analistas: cuánto margen se recupera con el won a 1.330-1.350, el coste de moida y si las existencias bajan; Norteamérica (+49,4 %, con los minoristas nacionales ya ≈ 30 % del canal) y Latinoamérica (+123,3 %) tiraron de las ventas [${a24}]. La dirección no dio cifras de margen para 2027 ni guía de 2026. **El beneficio neto se hundió (−84,9 %, a 8.801 M) por 55.088 M de pérdidas de cambio y un tipo efectivo del 60 %**, no por el negocio [${a19}, ${a21}]. Las 10 casas que publicaron tras los resultados bajaron el objetivo (de un 15 % a un 45 %) y mantuvieron la compra.`;
A.trimestres.confianza = 'Alta';

A.balance.liquidez = `A 30-sep-2026: efectivo de 447.550 M (ya con los 300.000 M de las RCPS de CVC cobrados el 15-sep) y otros activos financieros a corto de 44.649 M (492.199 M); deuda financiera de 65.733 M (préstamos a corto de 65.376 M) y arrendamientos de 63.409 M; RCPS de CVC a coste amortizado de 261.854 M (300.000 M nominales) [${a19}]. Después del cierre salieron 45.900 M del almacén de Yongin (pago final del 7-oct; 51.000 M en total) y ≈ 5.000 M de la recompra en fideicomiso, terminada el 13-nov con 163.500 acciones [${a19}, ${a25}].`;
A.balance.comentario = `El balance es el de un distribuidor que crece: el activo pasó de 97.392 M (2021) a 1.235.118 M (sep-2026), con 492.199 M de caja y depósitos tras la ronda de CVC. **Las existencias, la cifra que vigilar, bajaron por fin en el 3T26**: 300.125 M a fin de 2025, 450.971 M a 30-jun-2026 y 364.931 M a 30-sep-2026 (−19 % en el trimestre, con ventas +5 %) [1, 3, ${a19}]. Los proveedores subieron de 5.637 M a 51.759 M y los clientes a 111.224 M. El circulante comercial (existencias + clientes − proveedores) quedó en 424.396 M, ≈ 25 % de las ventas anualizadas del 3T26, frente al 35 % de 2025: el flujo operativo de 9M26 fue de 109.714 M (96.231 M solo en el 3T) [${a19}]. Las RCPS de CVC son deuda a efectos de valoración mientras la acción esté por debajo de 45.000 KRW: el inversor puede pedir el reembolso desde sep-2029 al 2 % anual compuesto (≈ 318.000 M en 2029).`;
A.balance.confianza = 'Alta';

A.flujos.comentario = A.flujos.comentario + ` En 9M26 el flujo operativo fue de 109.714 M (frente a −2.602 M en 9M25) porque las existencias dejaron de crecer en el 3T26; el capex de 9M26 fue de 52.176 M (almacenes y tiendas) más 5.122 M de compras de filiales (Silicon2 Japan, 50 % restante) [${a19}].`;

A.calidad.comentario = A.calidad.comentario + ` En el 3T26 aparecen tres partidas nuevas fuera del negocio: 55.088 M de pérdidas de cambio, 3.931 M de deterioro de asociadas y 15.642 M de «otros ingresos varios» que las notas no explican; y un tipo efectivo del 60 % en el trimestre [${a19}].`;
A.calidad.senales = [
  ...A.calidad.senales.filter((s) => !/diferencias de cambio/i.test(s.senal)),
  { senal: 'Pérdidas de cambio grandes por debajo del beneficio operativo', nivel: 'Media', comentario: `−55.088 M netos en el 3T26 tras +16.206 M de resultado no operativo en el 1S26: el beneficio neto oscila con el won mucho más que el operativo [${a19}, ${a21}].` },
  { senal: '«Otros ingresos varios» de 15.642 M sin explicación', nivel: 'Baja', comentario: `잡이익 del 3T26 (432 M en el 3T25); las notas no dicen qué es [${a19}].` },
  { senal: 'Existencias de nuevo a la baja', nivel: 'Baja', comentario: `De 450.971 M (jun) a 364.931 M (sep-2026), con flujo operativo de 96.231 M en el trimestre: alivia la señal del 1S26 [${a19}].` },
];
A.capital.politica = `Primer dividendo en 2026: 306 KRW por acción de 2025 (20.029 M, el 12 % del beneficio) [1, 3]. Primera recompra en el 1S26 (4.998 M; 123.200 acciones) y un fideicomiso de recompra de 5.000 M firmado el 19-oct-2026 y terminado el 13-nov con 163.500 acciones compradas: la autocartera es de 286.700 acciones (0,44 %), para retribución de empleados y valor del accionista [${a25}]. Sin plan de valor publicado con objetivo de reparto.`;
A.negocio.kpis = [
  { kpi: 'Peso mayorista en las ventas', valor_anterior: '93,4 % (2025)', valor_actual: '94,1 % (9M26)', variacion: '+0,7 puntos', comentario: `Venta al público 4,6 % y fulfillment 1,2 % [1, ${a19}].` },
  { kpi: 'Ventas en la UE', valor_anterior: '226.824 M (9M25)', valor_actual: '366.067 M (9M26)', variacion: '+61,4 %', comentario: `31,2 % de las ventas de 9M26; Reino Unido +108 % (103.444 M) [${a19}].` },
  { kpi: 'Ventas en EE. UU.', valor_anterior: '145.034 M (9M25)', valor_actual: '235.014 M (9M26)', variacion: '+62,0 %', comentario: `Vuelve a crecer tras un 2025 plano; minoristas nacionales ≈ 30 % del canal [${a19}, ${a24}].` },
  { kpi: 'Existencias', valor_anterior: '450.971 M (jun-2026)', valor_actual: '364.931 M (sep-2026)', variacion: '−19,1 %', comentario: `Primera bajada en un año; flujo operativo de 96.231 M en el 3T26 [${a19}].` },
  { kpi: 'Margen operativo trimestral', valor_anterior: '21,1 % (3T25)', valor_actual: '16,4 % (3T26)', variacion: '−4,7 puntos', comentario: `Won (margen bruto 28,7 %, −3,3 puntos frente al 2T) y gastos de personal +71 % [${a19}, ${a23}].` },
];
A.huecos = (A.huecos ?? []).filter((h) => h.campo !== 'Flujo libre de los últimos doce meses');
A.huecos.push({ seccion: 'financieros', campo: 'Naturaleza de los otros ingresos varios del 3T26 (15.642 M)', tipo: 'Complemento', intentos: '1) Nota 32 del informe del 3T26 (solo el importe); 2) nota de flujos y de combinaciones de negocio (sin desglose); 3) prensa y notas de casas (no lo mencionan)', decision: 'Omitido' });
guarda('A', A);

// ============================================================ C. Gobierno
const C = lee('C');
const c12 = nueva(C.fuentes, { titulo: '분기보고서 3T26: accionistas principales a 30-sep-2026 (Kim Sung-woon 18.892.039 acciones, 26,15 % del total con las RCPS; Starlink 6.666.666 RCPS, 9,23 %; Shin Eun-ha 6,78 %; Son Robert Inho 3,25 %) y consejo', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2026-11-13', url: DART('20261113000882') });
const c13 = nueva(C.fuentes, { titulo: 'Lista de presentaciones de Silicon2 en DART del 1-ago al 27-nov-2026 (ninguna declaración de directivos ni de participaciones después del 18-sep)', editor: 'DART (FSS)', tipo: 'Primaria', fecha: '2026-11-27', url: 'https://dart.fss.or.kr/dsab007/main.do' });
C.gobierno.accionistas = C.gobierno.accionistas.map((a) => {
  if (/Kim Sung-woon/.test(a.nombre)) return { ...a, variacion: `${a.variacion}; a 30-sep-2026, 18.892.039 acciones a título personal (28,8 % de las ordinarias; 26,15 % con las RCPS) [${c12}]` };
  if (/Autocartera/.test(a.nombre)) return { ...a, pct: 0.44, variacion: `286.700 acciones tras terminar el fideicomiso de recompra el 13-nov-2026 (163.500 compradas) [${c12}]` };
  return a;
});
C.gobierno.alertas = [...(C.gobierno.alertas ?? []).filter((x) => !/^Ninguna/.test(x)), `Sin declaraciones de directivos ni de accionistas significativos en DART desde el 18-sep-2026 (revisado el 27-nov) [${c13}].`];
guarda('C', C);

// ============================================================ D. Mercado y valoración
const D = lee('D');
D.fuentes[0] = { ...D.fuentes[0], titulo: 'Históricos diarios de 257720.KQ, del KOSDAQ (^KQ11) y del ETF TIGER 화장품 (228790.KS); cierres, betas y volatilidad; cierre del 27-nov-2026 (30.250 KRW)', fecha: '2026-11-27' };
D.fuentes[1] = { ...D.fuentes[1], titulo: 'Consenso anual 2026e-2028e y trimestral (media de 3 meses, a 26-nov-2026): 2026e ventas 1.600.130 M, beneficio operativo 278.050 M, BPA 2.941; 2027e 2.050.710 M, 356.660 M, 3.990; 2028e 2.490.450 M, 439.690 M, 4.867', fecha: '2026-11-26' };
D.fuentes[2] = { ...D.fuentes[2], titulo: 'Objetivos y recomendaciones de 13 casas a 26-nov-2026 (Hana 40.000, KB 45.000, Yuanta 31.000, KIS 46.000, NH 41.000, Kiwoom 47.000, SK 38.000, Samsung 40.000, Shinyoung 35.000, Hanwha 46.000, Sangsangin 54.000, IBK 56.000, Meritz 52.000): media 43.923, todas en comprar', fecha: '2026-11-26' };
D.fuentes[3] = { ...D.fuentes[3], titulo: 'Fichas de comparables (precio, capitalización, valor empresa, ventas, EBITDA, estimaciones de BPA) y tipos de cambio KRW=X (1.333,57), JPYKRW=X (8,341) y EURKRW=X (1.461,7)', fecha: '2026-11-27' };
const d13 = nueva(D.fuentes, { ...prensa.mkcut, tipo: 'Prensa' });
const d14 = nueva(D.fuentes, { ...prensa.kis, tipo: 'Analistas' });
const d15 = nueva(D.fuentes, { ...prensa.yuanta, tipo: 'Analistas' });
const d16 = nueva(D.fuentes, { ...prensa.rally, tipo: 'Prensa' });
const d17 = nueva(D.fuentes, { ...prensa.sedaily, tipo: 'Prensa' });
const d18 = nueva(D.fuentes, { titulo: 'DART: 분기보고서 3T26 (13-nov), aviso provisional del 3T26 (11-nov) y terminación del fideicomiso de recompra (13-nov)', editor: 'Silicon2 / DART (FSS)', tipo: 'Primaria', fecha: '2026-11-13', url: DART('20261113000882') });
const d19 = nueva(D.fuentes, { titulo: 'USD/KRW y EUR/KRW semanales (KRW=X, EURKRW=X), jun-nov 2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/KRW=X' });

D.identificacion.precio = PRECIO;
D.identificacion.fecha_precio = '2026-11-27';
D.identificacion.acciones = 65.29; // 65.576.252 ordinarias − 286.700 de autocartera (13-nov) [D18]
D.identificacion.free_float_pct = 56.2;
D.identificacion.proximos_resultados = '2027-02-10';
D.consenso = {
  guidance: `La empresa no publica guía anual de ventas ni de beneficio. En la conferencia del 3T26 (11-nov) anunció subidas de precio para devolver el margen bruto al ≈ 30 % en el 4T y siguió con el plan de tiendas moida (34 a fin de 2026, más de 100 en 2027 según la prensa) [${d14}]. Las casas esperan para 2026 ventas de ≈ 1,60 billones (+43-44 %) y un beneficio operativo de ≈ 274.000-278.000 M [2, ${d14}]. Próximos resultados (4T26) hacia el 10-feb-2027 (estimado; en 2026 el aviso anual fue a primeros de febrero).`,
  estimaciones: [
    { periodo: '2026e', ingresos: 1600130, ebitda: null, ebit: 278050, bpa: 2941, dpa: 352, fuente: 'FnGuide, media de 3 meses a 26-nov-2026 [D2]' },
    { periodo: '2027e', ingresos: 2050710, ebitda: null, ebit: 356660, bpa: 3990, dpa: null, fuente: 'FnGuide [D2]' },
    { periodo: '2028e', ingresos: 2490450, ebitda: null, ebit: 439690, bpa: 4867, dpa: null, fuente: 'FnGuide [D2] (≈ 72,2 M de acciones: incluye las RCPS de CVC)' },
  ],
  recomendaciones: { n_analistas: 13, comprar: 13, mantener: 0, vender: 0, po_medio: 43923, po_min: 31000, po_max: 56000 },
  revisiones: `Recortes fuertes tras el 3T26: 10 de las 13 casas bajaron el objetivo entre el 12 y el 16-nov (Yuanta de 56.000 a 31.000, Shinyoung de 60.000 a 35.000, SK de 62.000 a 38.000, KIS de 65.000 a 46.000, NH de 58.000 a 41.000, Kiwoom de 58.000 a 47.000, Hana de 52.000 a 40.000, Samsung de 47.000 a 40.000, Hanwha de 55.000 a 46.000, KB de 52.000 a 45.000); el objetivo medio pasa de 58.385 KRW (19-oct) a 43.923 (−24,8 %) y todas siguen en comprar [3, ${d14}, ${d15}]. El BPA de consenso baja más en 2026e (de 3.576 a 2.941, −17,8 %, por las pérdidas de cambio del 3T) que en 2027e (de 4.233 a 3.990, −5,7 %) y 2028e (de 5.143 a 4.867, −5,4 %); las ventas casi no cambian (2027e de 2.049.300 a 2.050.710 M) y el beneficio operativo de 2027e baja un 5,7 % (de 378.200 a 356.660 M) [2].`,
  base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
  confianza: 'Media',
};
D.bolsa = {
  ...bolsa.bolsa,
  posicion_corta_pct: null,
  comentario: `La acción multiplicó por diez su precio entre 2022 y 2024 (de 2.455 a 32.700 KRW) con el salto del beneficio [1]. Llegó a 56.100 KRW el 30-ene-2026 y hoy cotiza a 30.250 (cierre del 27-nov), un 44,2 % por debajo del máximo y un 30,4 % por encima del mínimo de 52 semanas (22.700, 23-nov-2026) [1]. En el año cae un 21,7 % (KOSDAQ −23,4 %; ETF de cosmética +20,5 %) y a un año un 30,6 % (KOSDAQ −19,4 %) [1]. Del 20-oct (32.800) bajó a 23.200 el 20-nov (−29 %) con el won fuerte y el 3T26 por debajo de lo esperado (−6,7 % el 12-nov, con 2,3 M de acciones) y desde ahí rebota un 30 % con toda la cosmética coreana tras la cumbre China-Corea del 18-nov, la vuelta del dólar a 1.343 KRW y unas exportaciones de cosmética del 1 al 20-nov un 61,7 % por encima de 2025 [${d13}, ${d16}]. Beta mensual de 5 años de 0,66 frente al KOSDAQ (semanal de 2 años 0,94) y volatilidad del 63,6 % [1].`,
  contexto: {
    movimiento: { fecha: '2026-11-27', var_1m_pct: 5.6, var_3m_pct: -41.6, var_6m_pct: -20.5, var_12m_pct: -32.9, dist_max_52s_pct: -44.2, dist_min_52s_pct: 30.4, dist_max_historico_pct: -51.1, tendencia: 'bajista', volatilidad_60d_pct: 53, avisos: ['P3 Caída fuerte: −42 % en tres meses', 'P5 Un 21 % por debajo de la media de 200 sesiones (tendencia bajista)'] },
    movimientos_fuertes: [
      { periodo: 'sep-2026', var_pct: -26.5, causa: `De 51.900 (1-sep) a 38.150 (30-sep): el won se aprecia un 11,9 % frente al dólar en el 3T y las casas recortan el margen del 3T26 [${d17}, 7].`, veredicto: 'no cambia', condicion: null },
      { periodo: 'oct-nov-2026', var_pct: -31.1, causa: `Mayor caída de un mes en seis meses (−31,1 % al 17-nov): el 3T26 (11-nov) queda un 15 % bajo el consenso en beneficio operativo y el neto se hunde por 55.088 M de pérdidas de cambio; diez casas bajan el objetivo [${d13}, ${d18}, ${d15}].`, veredicto: 'no cambia', condicion: null },
      { periodo: '19-27-nov-2026', var_pct: 30.4, causa: `Rebote desde el mínimo de 23.200 (20-nov) con todo el sector (APR +27 %, Cosmecca +20 %): cumbre China-Corea del 18-nov, won algo más débil (1.343 por dólar) y exportaciones de cosmética de noviembre +61,7 % [${d16}].`, veredicto: 'no cambia', condicion: null },
    ],
    noticias: [
      { fecha: '2026-11-11', tipo: 'resultados', hecho: `3T26: ventas 424.363 M (+41,7 %), beneficio operativo 69.617 M (+10,4 %, margen 16,4 %), beneficio neto 8.801 M (−84,9 %) por pérdidas de cambio [${d18}].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-11-12', tipo: 'recomendación', hecho: `Diez casas bajan el objetivo (de −15 % a −45 %), todas siguen en comprar; objetivo medio 43.923 KRW [3, ${d15}].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-11-13', tipo: 'directivos', hecho: `Termina el fideicomiso de recompra de 5.000 M con 163.500 acciones compradas; sin ventas de directivos ni del fundador desde el 8-sep [${d18}].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2026-09-15', tipo: 'ampliación o convertible', hecho: `RCPS de CVC (300.000 M, 6.666.666 acciones a 45.000 KRW), convertibles desde el 15-sep-2027: dilución del 10,2 % ya en nuestro BPA [nota A].`, veredicto: 'no cambia', condicion: null },
      { fecha: '2027-02-10', tipo: 'resultados', hecho: 'Resultados del 4T26 (fecha estimada).', veredicto: 'no cambia', condicion: null },
    ],
    proximos_resultados: '2027-02-10',
    veredicto: 'no cambia',
    condicion: null,
    comentario: `La caída de sep-nov tiene causas conocidas y ya en las cifras de este informe: el won (de 1.533 a 1.334 por dólar y de 1.746 a 1.462 por euro desde junio) y el 3T26 con menos margen [${d19}, ${d18}]. No hay colocaciones, ampliaciones nuevas, litigios ni ventas de directivos pendientes: las RCPS de CVC no se pueden convertir hasta sep-2027. El rebote de la última semana es sectorial. Veredicto: no cambia.`,
  },
  confianza: 'Alta',
};
const blend = (e0, e1) => 0.09 * e0 + 0.91 * e1;
const sil = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8')).find((c) => c.s === '257720.KQ');
const pers = D.comparables.empresas.map((c) => c.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
const medianaPER = pers.length % 2 ? pers[(pers.length - 1) / 2] : (pers[pers.length / 2 - 1] + pers[pers.length / 2]) / 2;
D.comparables.criterio = D.comparables.criterio.replace('0,2 × BPA 2026e + 0,8 × BPA 2027e', '0,09 × BPA 2026e + 0,91 × BPA 2027e');
D.comparables.comentario = `No hay un comparable perfecto: las marcas coreanas tienen más margen y más riesgo de moda; los distribuidores maduros (Paltac, Arata, Sally) crecen un 1-3 % con márgenes EBITDA del 2-10 %. Mediana del grupo a 27-nov: ${String(Math.round(medianaPER * 10) / 10).replace('.', ',')} veces el BPA de los próximos doce meses (12,7 el 20-oct) [4]. Silicon2, a 30.250 KRW, cotiza a ${String(Math.round((PRECIO / blend(sil.et.find((t) => t.p === '0y').eps, sil.et.find((t) => t.p === '+1y').eps)) * 10) / 10).replace('.', ',')} veces el BPA de consenso de Yahoo de los próximos doce meses, con un crecimiento de ventas del 28 % en 2027e frente al 7-50 % del grupo [4, 2]. El descuento frente a APR (14,9x) y Cosmax (16,3x) se explica por un margen operativo menor y más expuesto al won, el riesgo de desintermediación y el capital de CVC con reembolso; frente a VT o Clio (7-8x), Silicon2 crece mucho más. Usamos la mediana como referencia del alcista de la regla a 12 meses.`;
D.multiplos_historicos.comentario = 'Cinco cierres como cotizada. PER adelantado (cierre ÷ BPA real del año siguiente): 2021 18,1x (3.216,67 ÷ 178); 2022 3,9x (2.455 ÷ 623); 2023 3,9x (7.710 ÷ 1.981); 2024 12,0x (32.700 ÷ 2.714); 2025 ≈ 14x sobre nuestro BPA de 2026e, que ya lleva las pérdidas de cambio del 3T26 [1, nota A]. Los de 2022 y 2023 miden la sorpresa del crecimiento (el BPA se multiplicó por 3,5 en 2023 y por 3,2 en 2024) más que una valoración y se excluyen como BPA atípico; quedan tres años, una historia corta.';
D.transacciones.comentario = 'No hay compras de distribuidores de cosmética comparables con precio público (la de Hansung USA por Goodai Global no publicó importe). Las dos rondas de capital de Silicon2 dan una referencia: CVC pagó 45.000 KRW por acción en agosto de 2026 (con protección a la baja), un 49 % más que el precio de hoy.';
guarda('D', D);

// ============================================================ E. Sentimiento
const E = lee('E');
const e5 = nueva(E.fuentes, { titulo: 'Foro de Naver (종목토론실) de 257720: 100 mensajes del 26 y 27-nov-2026 (hora de Corea)', editor: 'Naver Pay Securities', tipo: 'Foros y redes', fecha: '2026-11-27', url: 'https://m.stock.naver.com/domestic/stock/257720/discussion' });
const e6 = nueva(E.fuentes, { ...prensa.rally, tipo: 'Prensa' });
const e7 = nueva(E.fuentes, { ...prensa.mkcut, tipo: 'Prensa' });
E.fuentes[0] = { ...E.fuentes[0], tipo: 'Foros y redes' };
E.sentimiento = {
  tono: 'Dividido', tendencia: 'Mejora',
  revisadas: [
    { plataforma: 'Foro de Naver (종목토론실), 26 y 27-nov-2026', fecha: '2026-11', n_comentarios: 100, tono: 'Dividido', resumen: `Tras el rebote del 30 % desde 23.200, mezcla de euforia de corto plazo («cuatro días seguidos al alza», «a por 34.000-40.000»), quejas contra las ventas a corto y los extranjeros, y escépticos que esperan volver a 24.000 o recuerdan que «a 30.000 también parecía suelo»; casi nadie habla del 3T26 ni del margen [${e5}].` },
    { plataforma: 'Foro de Naver (종목토론실), 13 al 20-oct-2026', fecha: '2026-10', n_comentarios: 400, tono: 'Negativo', resumen: 'Frustración tras caer de 54.200 a ≈ 32.000 KRW en siete semanas; críticas a la empresa por no defender la acción y dudas sobre el won [E1].' },
    { plataforma: 'Prensa económica coreana tras el 3T26', fecha: '2026-11', n_comentarios: 3, tono: 'Neutro', resumen: `El 3T26 se lee como un golpe del won sobre un negocio que sigue creciendo un 42 %; los recortes de objetivo se dan por excesivos una semana después, cuando el sector rebota [${e7}, ${e6}].` },
  ],
  temas: [
    { tema: 'El won y el margen', postura: 'Dividida', peso: 'Alto', contraste: `Cierto: margen operativo del 16,4 % en el 3T26 (21,1 % un año antes) y 55.088 M de pérdidas de cambio; el dólar volvió a 1.334-1.343 KRW, lejos aún de los 1.500 del 1S [nota A, ${e6}].` },
    { tema: 'Ventas a corto y de extranjeros', postura: 'Bajista', peso: 'Medio', contraste: 'Es flujo, no negocio; no hay dato oficial de posición corta a mano (hueco en bolsa).' },
    { tema: 'Rebote sectorial (China, exportaciones, Black Friday)', postura: 'Alcista', peso: 'Alto', contraste: `Cierto para el sector: exportaciones de cosmética del 1 al 20-nov +61,7 % [${e6}]; para Silicon2 el margen depende más del won que del volumen.` },
    { tema: 'Desintermediación (Goodai, APR)', postura: 'Bajista', peso: 'Bajo', contraste: 'Riesgo estructural recogido en el bajista (nota B).' },
  ],
  lectura: 'El foro pasó de la capitulación de octubre a un rebote nervioso: se habla de gráficos, cortos y flujos, casi nada del negocio. No contradice a los analistas (todos en comprar con objetivos recortados un 25 %). No hay euforia que avise de un techo ni un riesgo nuevo que el informe no recoja; el sentimiento no entra en la valoración.',
  confianza: 'Media',
};
guarda('E', E);
console.log('Notas actualizadas a 27-nov: A', A.fuentes.length, 'C', C.fuentes.length, 'D', D.fuentes.length, 'E', E.fuentes.length, 'mediana PER', medianaPER);

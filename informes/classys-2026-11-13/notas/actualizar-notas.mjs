// Iteración del 13-nov-2026 (corte 2026-11-13, cierre del 13-nov en Seúl) tras el 3T26 (publicado el 12-nov, 15:00 KST).
// Se ejecuta DESPUÉS de construir-notas.mjs (que reescribe A-E con la estructura y los hechos estables de la iteración del
// 19-oct, ya con bolsa.json y comparables-yahoo-raw.json del 13-nov) y vuelve a escribir todo lo que cambia o se ha
// vuelto a comprobar: 3T26, LTM, guía, auditor, consejo y accionistas (DART ya responde desde la nube), consenso posterior
// a los resultados, bolsa, comparables y foros. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node construir-notas.mjs && node actualizar-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (l) => JSON.parse(fs.readFileSync(path.join(dir, `${l}.json`), 'utf8'));
const guarda = (l, o) => fs.writeFileSync(path.join(dir, `${l}.json`), JSON.stringify(o, null, 2) + '\n', 'utf8');
const W = 'https://classys.com/wp-content/uploads/sites/2';
const DART = (r) => `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${r}`;
const nueva = (lista, f) => { const id = lista.length + 1; lista.push({ id, ...f }); return id; };

// ============================================================ A. Cuentas
const A = lee('A');
const a16 = nueva(A.fuentes, { titulo: 'DART: 연결재무제표기준영업(잠정)실적(공정공시), resultados provisionales consolidados del 3T26 (ventas 83.023 M, beneficio operativo 27.004 M, BAI 7.669 M, beneficio atribuido 6.282 M; 9M26)', editor: 'CLASSYS Inc. / Korea Exchange (KIND)', tipo: 'Primaria', fecha: '2026-11-12', url: DART('20261112900535') });
const a17 = nueva(A.fuentes, { titulo: 'IR Book (Finance) 3Q26: ventas por línea y región, cuenta del 3T26 y 9M26, gastos generales, resultado no operativo (pérdidas de cambio de 4.500 M por operaciones y 10.600 M por conversión) e hitos 2026-2028', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-11-12', url: `${W}/2026/11/Classys-IR-Book_3Q26_Eng_vFF_261111.pdf` });
const a18 = nueva(A.fuentes, { titulo: 'DART: 반기보고서 (informe semestral) a 30-jun-2026: auditor (EY Hanyoung desde 2025; Samduk en 2024), opiniones, cuestiones clave de auditoría, consejo y retribuciones', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-08-14', url: DART('20260814004072') });
const a19 = nueva(A.fuentes, { titulo: 'DART: corrección de la previsión de resultados de 2026 (ventas de 4.900 a 4.450 億 KRW, banda 4.300-4.600 億)', editor: 'CLASSYS Inc. / KIND', tipo: 'Primaria', fecha: '2026-08-12', url: DART('20260812900270') });
const a20 = nueva(A.fuentes, { titulo: 'Kiwoom Securities, «가을이 막 끝났는데 보릿고개» (3T26: ventas −22,7 % y beneficio operativo −40,5 % frente al consenso; cuenta trimestral 1T25-4T26e por línea)', editor: 'Kiwoom Securities', tipo: 'Analistas', fecha: '2026-11-13', url: 'https://stock.pstatic.net/stock-research/company/39/20261113_company_900479000.pdf' });

A.financieros.ltm = { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 369123, ebitda: 175900, ebit: 159304, beneficio_neto: 110948, bpa: 1703, dpa: 1000, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null };
A.financieros.comentario = 'Las ventas pasaron de 100.597 M KRW en 2021 a 336.820 M en 2025: un crecimiento anual del 35 %, que la empresa atribuye al aumento de la base instalada de equipos (más de 45.000 unidades acumuladas en 2025) y a los consumibles que estos generan [1, 8]. Casi todo es orgánico salvo el cuarto trimestre de 2024 y los tres primeros de 2025, que llevan Iruda (fusionada el 1-oct-2024) [1, 5]. El margen EBIT se mantuvo entre el 48,6 % y el 51,4 % de 2021 a 2025 [2, 1]. **2026 rompe la serie.** En 9M26 las ventas suben un 13,3 % (275.714 M) pero solo por la consolidación de Sudamérica: Corea cae un 24,9 % (59.500 M) y los distribuidores de fuera crecen un 21,2 % [' + a16 + ', ' + a17 + ']. El 3T26 deja ventas planas (83.023 M, +0,0 %), Corea −35,9 %, distribuidores +2,1 % y Latinoamérica directa 16.600 M; sin Latinoamérica directa las ventas caen un 14 % (estimación propia: 66.400 frente a 77.300 M) [' + a17 + ']. El margen operativo baja del 45,3 % al 32,5 % en el trimestre y del 49,1 % al 39,2 % en 9M26: margen bruto −3,0 puntos (dólar más débil, más equipos en la mezcla y en Sudamérica solo se reconoce el margen de distribuidor mientras se vende el inventario caro de antes de la compra) y gastos generales del 41,2 % de las ventas (+9,8 puntos: estructura de Sudamérica, contratación en Japón y 1.500 M de marketing previo al lanzamiento de cuidado en casa en EE. UU.) [' + a17 + ']. Los últimos doce meses suman 369.123 M de ventas, 175.900 M de EBITDA y 159.304 M de EBIT (43,2 %).';
A.financieros.ajustes = 'Cifras publicadas K-IFRS, sin ajustes. Partidas no recurrentes por debajo del EBIT: en 2022, 30.374 M de otros ingresos (plusvalía de la venta de edificios) [2]; en 2024, 11.689 M de pérdida por la baja de la participación en Iruda al fusionarla [1]. **El −81 % del beneficio del 3T26.** El beneficio atribuido cae de 33.008 M a 6.282 M (−81,0 %) por dos cosas de peso parecido: (1) el beneficio operativo cae 10.614 M (−28,2 %), recurrente a corto plazo (Corea y costes de la venta directa); (2) el resultado no operativo pasa de +5.200 M a −19.300 M (24.500 M de diferencia): 4.500 M de pérdidas de cambio por operaciones y 10.600 M por conversión (el real cayó un 6,7 % y el dólar un 2 % frente al won en el trimestre, y la matriz presta en won a las filiales de Brasil y Japón), más ≈ 4.200 M de intereses y otros [' + a17 + ', ' + a16 + ']. Las diferencias de cambio no son caja y no son recurrentes en ese importe (2025: 2.649 M en todo el año) [1]. Estimación propia: sin los 15.100 M de cambio y con un impuesto del 24 %, el beneficio del 3T26 habría sido de unos 17.300 M, un 48 % menos que el 3T25: la mitad de la caída es contable y la otra mitad es negocio. El impuesto del trimestre fue de solo 1.800 M y los minoritarios restan pérdidas (atribuido 6.282 M frente a 5.894 M del grupo) [' + a16 + '].';

A.trimestres.items = A.trimestres.items.filter((t) => t.periodo !== '3T24');
A.trimestres.items.push({ periodo: '3T26', ingresos: 83023, crecimiento_pct: 0.0, crecimiento_organico_pct: -14.1, ebitda: 31900, margen_ebitda_pct: 38.4, bpa: 96, vs_consenso: 'Inferior' });
A.trimestres.ultima_presentacion = 'Las dos últimas presentaciones (12-ago y 12-nov-2026) muestran un deterioro que la dirección ha ido reconociendo tarde. En agosto bajó la guía de ventas de 2026 de 490.000 M a 445.000 M (banda 430.000-460.000 M) «a la vista del semestre» y prometió un segundo semestre mejor con Quadessy, Fortra y China [' + a19 + ', 6]. El 12-nov publicó un 3T26 muy por debajo: ventas de 83.023 M y beneficio operativo de 27.004 M, un 22,7 % y un 40,5 % por debajo del consenso (≈ 107.400 M y 45.400 M) [' + a16 + ', ' + a20 + ']. La presentación se titula «Bottomed Out» y atribuye el trimestre a la transición de generación de los productos estrella en Corea (Shurink y Volnewmer maduros; Quadessy y Fortra retrasados al 4T), al coste de pasar a venta directa en Latinoamérica y Japón y al tipo de cambio [' + a17 + ']. No retira la guía, pero llegar a 430.000 M exigiría un 4T26 de 154.000 M (+65 %): ninguno de los informes posteriores lo cree [' + a20 + ']. La dirección traslada la recuperación a 2027 con fechas: Volnewmer en China (aprobación en el 4T26 y lanzamiento en el 1T27), Viclara en EE. UU. y Europa (1T27), Reepot en EE. UU. (2T27), nuevo Shurink en Corea (2T27) y Ultraformer en EE. UU. (4T27) [' + a17 + ']. Lo que no explica: por qué Corea cae un 36 % (competencia de Ulthera Prime y de equipos baratos, o saturación) ni cuándo vuelve el margen de la venta directa; tampoco da guía de margen ni de 2027.';
A.trimestres.confianza = 'Alta';

A.balance.liquidez = 'Último balance publicado: 30-jun-2026 (el informe del 3T26 se presenta hasta el 16-nov; el avance del 12-nov no trae balance). Caja, depósitos y activos financieros a corto de 136.101 M, frente a 146.660 M de préstamos (141.079 M a corto: el préstamo de la sede reclasificado a corto y las deudas de Sudamérica) [5, 6]. Deuda neta de 10.559 M sin arrendamientos. Sin rating.';
A.calidad.auditor = 'EY Hanyoung (한영회계법인) desde el ejercicio 2025; Samduk (Nexia) en 2022-2024';
A.calidad.anios_auditor = 2;
A.calidad.opinion = 'Favorable (2025, consolidadas e individuales), sin salvedades ni incertidumbre sobre empresa en funcionamiento';
A.calidad.comentario = 'El auditor cambió en 2025: Samduk (Nexia), que firmó 2022-2024 con opinión favorable y cuestiones clave en el reconocimiento de ingresos, la provisión de insolvencias y la combinación de negocios con Iruda, dejó paso a EY Hanyoung, que firmó 2025 con opinión favorable y una cuestión clave: el deterioro del fondo de comercio [' + a18 + ', 4]. Los honorarios son pequeños (182 M en 2025) [' + a18 + ']. Criterios a vigilar: (1) se capitalizan desarrollos y ensayos clínicos (intangibles en desarrollo de 14.805 M a junio de 2026, frente a 6.671 M a cierre de 2024) [5]; (2) la fusión con Iruda creó 135.000 M de intangibles que se amortizan (7.985 M en 2025) [1]; (3) los pagos en acciones son pequeños (1.225 M en 2025) [1]; (4) lo más importante: los cobros. La provisión de clientes pasó de 1.739 M a 62.314 M en seis meses y la cartera de más de un año de 685 M (2024) a 41.879 M (jun-2026), al consolidar Sudamérica [5]; en febrero de 2026 el consejo aprobó «cambiar las condiciones de cobro» de clientes [' + a18 + ']; (5) en 2026 las diferencias de cambio por préstamos a filiales mueven el beneficio (15.100 M de pérdida en el 3T26) [' + a17 + ']. Lectura de los indicadores del motor en la sección de calidad: el Beneish de 2025 recoge el salto de clientes (+31 %) y el Altman y el Piotroski siguen holgados.';
A.calidad.senales = [
  { senal: 'Cartera de clientes vencida y provisión disparada tras consolidar Sudamérica', nivel: 'Alta', comentario: 'Provisión de 62.314 M sobre 109.668 M brutos a jun-2026; 41.879 M con más de 12 meses; cambio de condiciones de cobro aprobado en febrero [5, ' + a18 + '].' },
  { senal: 'Ventas a un distribuidor que después se compra (MedSystems)', nivel: 'Media', comentario: 'Tras la compra solo se reconoce el margen de distribuidor mientras se vende el inventario anterior: el margen consolidado se recupera cuando llegue producto nuevo, según la empresa [' + a17 + '].' },
  { senal: 'Diferencias de cambio grandes por préstamos a filiales', nivel: 'Media', comentario: '15.100 M de pérdida en el 3T26 (4.500 M de operaciones y 10.600 M de conversión), frente a 2.649 M en todo 2025 [' + a17 + ', 1].' },
  { senal: 'Cambio de auditor en 2025', nivel: 'Baja', comentario: 'De Samduk a EY Hanyoung, con opinión favorable; en Corea la rotación es obligatoria por designación periódica [' + a18 + '].' },
  { senal: 'Capitalización de desarrollo y ensayos clínicos en aumento', nivel: 'Baja', comentario: 'Intangibles en desarrollo de 6.671 M (2024) a 14.805 M (jun-2026) [5].' },
];
A.calidad.confianza = 'Media';
A.negocio.kpis = [
  { kpi: 'Ventas en Corea (millones de KRW)', valor_anterior: '79.200 (9M25)', valor_actual: '59.500 (9M26)', variacion: '−24,9 % (3T26: −35,9 %)', comentario: 'Equipos −38,3 % y consumibles −15,0 % en 9M26 [' + a17 + '].' },
  { kpi: 'Ventas a distribuidores fuera de Corea (millones de KRW)', valor_anterior: '120.600 (9M25)', valor_actual: '146.100 (9M26)', variacion: '+21,2 % (3T26: +2,1 %)', comentario: 'Europa +16 % y EE. UU. +19 % en el 3T26; Tailandia y Australia a la baja tras un 2T fuerte [' + a17 + '].' },
  { kpi: 'Latinoamérica en venta directa (millones de KRW)', valor_anterior: '22.800 (9M25, envíos al distribuidor)', valor_actual: '50.600 (9M26)', variacion: '+121,8 %', comentario: 'Consolidada desde marzo de 2026; 3T26 16.600 M (−22 % frente al 2T por el fin de las promociones) [' + a17 + '].' },
  { kpi: 'Ventas de consumibles (millones de KRW)', valor_anterior: '113.500 (9M25)', valor_actual: '122.400 (9M26)', variacion: '+7,8 %', comentario: 'Fuera de Corea +23,2 %; en Corea −15,0 % [' + a17 + '].' },
  { kpi: 'Margen operativo consolidado', valor_anterior: '45,3 % (3T25)', valor_actual: '32,5 % (3T26)', variacion: '−12,8 puntos', comentario: 'Gastos generales del 41,2 % de las ventas (31,5 % un año antes) [' + a17 + '].' },
  { kpi: 'Base instalada acumulada (unidades)', valor_anterior: '45.000 (2025)', valor_actual: '48.000 (jun-2026)', variacion: '+3.000 en seis meses', comentario: 'Último dato publicado [6].' },
];
A.huecos = A.huecos.filter((h) => !(h.seccion === 'calidad' && /Auditor/.test(h.campo)));
A.huecos.push({ seccion: 'balance', campo: 'Balance y flujos a 30-sep-2026', tipo: 'Complemento', intentos: '1) DART: el informe trimestral del 3T26 aún no está presentado (plazo hasta el 16-nov); 2) IR Book 3Q26 (solo cuenta y gastos); 3) informes de analistas del 13-nov (solo previsiones anuales)', decision: 'Omitido; el puente usa el balance de 30-jun-2026' });
A._estado = 'completa (13-nov)';
guarda('A', A);

// ============================================================ B. Sector y competencia (estable; se añade lo nuevo del 3T26)
const B = lee('B');
const b11 = nueva(B.fuentes, { titulo: 'IR Book (Finance) 3Q26: Corea −36 % por la transición de productos; Europa +16 %, EE. UU. +19 %; hitos de China, EE. UU., Europa y Latinoamérica', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-11-12', url: `${W}/2026/11/Classys-IR-Book_3Q26_Eng_vFF_261111.pdf` });
B.competencia.amenazas = (B.competencia.amenazas || '') + ' Novedad del 3T26: las ventas en Corea caen un 35,9 % (equipos −45 %, consumibles −29 %) mientras PharmaResearch y Hugel siguen creciendo en el mismo canal de clínicas; la empresa lo atribuye a su propio ciclo de productos, pero es la primera prueba de que el foso en Corea se estrecha [' + b11 + '].';
B.competencia.foso.tendencia = 'Se estrecha';
B._estado = 'completa (13-nov)';
guarda('B', B);

// ============================================================ C. Equipo y gobierno
const C = lee('C');
const c12 = nueva(C.fuentes, { titulo: 'DART: 반기보고서 a 30-jun-2026: consejo de 7 (3 independientes y 4 no ejecutivos de Bain), sistema de consejeros ejecutivos separados desde dic-2025, comisiones, auditor y retribuciones del 1S26', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-08-14', url: DART('20260814004072') });
const c13 = nueva(C.fuentes, { titulo: 'DART: 최대주주 변경을 수반하는 주식담보제공계약체결 (prenda de 30.072.418 acciones de BCPE Centur por un préstamo de adquisición de 950.000 M KRW, 30-sep-2025 a 30-sep-2030; Mirae, Hana, Samsung, Daishin y otros)', editor: 'CLASSYS Inc. / KIND', tipo: 'Primaria', fecha: '2026-06-26', url: DART('20260626900920') });
const c14 = nueva(C.fuentes, { titulo: 'DART: 불성실공시법인지정예고 (aviso de designación por tres comunicaciones tardías de prendas de 2023, 2024 y 2025) y 미지정 (no designada por atenuantes, 12-ago-2026)', editor: 'Korea Exchange (KIND)', tipo: 'Primaria', fecha: '2026-07-24', url: DART('20260724900921') });
const c15 = nueva(C.fuentes, { titulo: 'DART: 주식등의대량보유상황보고서 de Capital Research and Management (5,05 % en julio, 6,16 % el 7-ago y 5,10 % el 28-ago-2026)', editor: 'CLASSYS Inc. / FSS', tipo: 'Primaria', fecha: '2026-09-03', url: DART('20260903000007') });
const c16 = nueva(C.fuentes, { titulo: 'DART: 대표집행임원변경 (Yoon Jun-oh, primer ejecutivo; 15-jul y 3-ago-2026)', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-08-03', url: DART('20260803900525') });
const c17 = nueva(C.fuentes, { titulo: 'Kiwoom Securities: estructura de la financiación de Bain (recapitalizaciones de 2024 y 2025, préstamo de 9.500 億 KRW, ratio de garantía exigido del 70 % y estimado por encima del 80 % a 11-nov)', editor: 'Kiwoom Securities', tipo: 'Analistas', fecha: '2026-11-13', url: 'https://stock.pstatic.net/stock-research/company/39/20261113_company_900479000.pdf' });
const c18 = nueva(C.fuentes, { titulo: 'WiseReport/FnGuide: accionistas principales a 12-nov-2026 (BCPE Centur y una parte vinculada 49,08 %, Jung Sung-jae 9,86 %, Capital Research 5,10 %)', editor: 'FnGuide (Naver WiseReport)', tipo: 'Datos de mercado', fecha: '2026-11-12', url: 'https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=214150' });
const c19 = nueva(C.fuentes, { titulo: 'DART: previsión de ventas de 2026 rebajada de 4.900 a 4.450 億 KRW (12-ago-2026) y avance del 3T26 (12-nov-2026)', editor: 'CLASSYS Inc.', tipo: 'Primaria', fecha: '2026-11-12', url: DART('20261112900535') });

C.directivos.historial_guidance = C.directivos.historial_guidance.map((h) => h.anio === '2026'
  ? { anio: '2026', guia: 'Ventas de 490.000 M (banda 470.000-510.000 M), febrero de 2026; rebajada a 445.000 M (430.000-460.000 M) el 12-ago', real: '9M26 275.714 M; llegar a 430.000 M exige un 4T de 154.000 M (+65 %); los analistas esperan 367.000-378.000 M', cumplida: 'No' }
  : h);
C.directivos.historial_guidance.push({ anio: '2025', guia: 'Crecimiento de ventas de alrededor del 30 % (IR Book 4Q24)', real: '+38,6 % (336.820 M)', cumplida: 'Sí' });
C.directivos.historial_guidance.sort((a, b) => a.anio.localeCompare(b.anio));
C.directivos.comentario = 'La credibilidad de la dirección está en mínimos. Hasta 2025 la empresa superaba sus objetivos [11]. En 2026 dio una guía de 490.000 M en febrero, la mantuvo en mayo con un primer trimestre ya por debajo, la recortó a 445.000 M en agosto y en noviembre publicó un 3T26 que la deja inalcanzable sin retirarla [9, ' + c19 + ']. Tres primeros ejecutivos en cuatro años: Baek Seung-han (2022-dic-2025), Choi Yoon-seok (dic-2025 a jul-2026, sigue como director financiero) y Yoon Jun-oh desde el 15-jul-2026, que viene de fusiones y adquisiciones en Samsung Electronics [3, ' + c16 + ']. Desde diciembre de 2025 la empresa separa consejo y ejecutivos (consejeros ejecutivos nombrados por el consejo) [' + c12 + ']. El nuevo equipo ha limpiado deprisa: el 3T26 lleva el inventario caro de Sudamérica, las pérdidas de cambio y los costes de pasar a venta directa en Japón, lo que el foro llama «big bath». El equipo de producto (I+D de Siemens, GE y Samsung) sigue estable [1]. No hay plan de sucesión publicado.';
C.directivos.confianza = 'Media';

C.gobierno.consejo = [
  { nombre: 'Kwon Hyuk-jin', cargo: 'Consejero independiente; preside la comisión de retribuciones', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría, retribuciones (presidente)' },
  { nombre: 'Park Jun-hong', cargo: 'Consejero independiente; preside la comisión de nombramientos', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría, nombramientos (presidente)' },
  { nombre: 'Shin Kyung-ja', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría' },
  { nombre: 'Kim Dong-wook', cargo: 'Consejero no ejecutivo (Bain Capital)', tipo: 'Dominical', desde: '2022', comisiones: 'Retribuciones' },
  { nombre: 'Kim Hyun-seung', cargo: 'Consejero no ejecutivo (Bain Capital)', tipo: 'Dominical', desde: '2022', comisiones: 'Nombramientos' },
  { nombre: 'Park Wan-jin', cargo: 'Consejero no ejecutivo (Bain Capital)', tipo: 'Dominical', desde: '2022', comisiones: 'Retribuciones' },
  { nombre: 'Lee Eun-ji', cargo: 'Consejera no ejecutiva (Bain Capital)', tipo: 'Dominical', desde: null, comisiones: 'Nombramientos' },
];
C.gobierno.consejero_coordinador = true;
C.gobierno.presidente_ceo_separados = true;
C.gobierno.presidente_ejecutivo = false;
C.gobierno.cambios_cupula_24m = 2;
C.gobierno.remuneracion = 'En Corea la junta vota un límite global para los consejeros, no la política individual: 3.000 M KRW en 2024 y 2025 y 500 M en 2026, porque desde diciembre de 2025 los ejecutivos ya no son consejeros y su retribución la fija la comisión de retribuciones (un independiente y dos consejeros de Bain) [' + c12 + ']. En el 1S26 consejeros y ejecutivos cobraron 4.558 M, de los que 3.851 M fueron pagos en acciones (opciones de 2023 ejercidas); nadie cobró más de 500 M en 2025, así que no hay retribución individual publicada [' + c12 + ']. La comisión aprobó en 2026 la retribución variable a corto plazo del primer ejecutivo, una guía de tenencia de acciones y una política de recuperación (clawback), sin publicar las métricas [' + c12 + ']. Hay opciones vivas sobre 519.748 acciones (0,8 % del capital) con precios de 19.587 a 56.360 KRW. El incentivo está ligado al precio de la acción, no al ROIC.';
C.gobierno.accionistas = [
  { nombre: 'BCPE Centur Investments, LP (Bain Capital) y una parte vinculada', pct: 49.08, tipo: 'Capital privado; accionista de control', variacion: 'Del 60,84 % (2022) al 49,08 % tras las ventas en bloque de mayo de 2025 (6,0 %) y febrero de 2026 (8,25 %); 30.072.418 acciones prendadas por un préstamo de adquisición de 950.000 M KRW [' + c18 + ', ' + c13 + ', 6]' },
  { nombre: 'Jung Sung-jae (fundador)', pct: 9.86, tipo: 'Fundador', variacion: 'Sin cambios [' + c18 + ']' },
  { nombre: 'Capital Research and Management Company', pct: 5.1, tipo: 'Institucional', variacion: 'Compró hasta el 6,16 % (7-ago-2026) y vendió hasta el 5,10 % (28-ago) [' + c15 + ']' },
  { nombre: 'Autocartera', pct: 0.13, tipo: 'Autocartera', variacion: '82.170 acciones tras amortizar 17.100 M el 19-feb-2026 [1, ' + c18 + ']' },
  { nombre: 'Capital flotante', pct: 35.8, tipo: 'Flotante', variacion: 'Estimación propia: 100 − 49,08 − 9,86 − 5,10 − 0,13' },
];
C.gobierno.control_y_defensas = 'Bain Capital (BCPE Centur) controla la empresa con el 49,08 % y nombra cuatro de los siete consejeros; los tres independientes presiden auditoría, retribuciones y nombramientos y uno es consejero coordinador desde abril de 2026 [' + c12 + ', ' + c18 + ']. Bain busca salir desde 2024: no vendió el control al precio pedido y desde entonces vende en bloques con descuento (6 % en mayo de 2025 a 57.915 KRW, 8,25 % en febrero de 2026 a 60.000 KRW) y ha sacado caja con dos recapitalizaciones de su vehículo (2024 y 2025) [6, ' + c17 + ']. **Lo nuevo**: el 26-jun-2026 la empresa comunicó, con hasta tres años de retraso, que 30.072.418 acciones de Bain están prendadas por un préstamo de adquisición de 950.000 M KRW que vence el 30-sep-2030 [' + c13 + ']; la bolsa la avisó por comunicación tardía y no la sancionó por atenuantes [' + c14 + ']. A 23.800 KRW las acciones de Bain valen ≈ 762.000 M. Kiwoom estima que el ratio préstamo/garantía supera el 80 % frente al 70 % pactado; en casos parecidos en Corea el banco cobra más interés, pero si la caída sigue puede pedir más garantías o vender acciones [' + c17 + ']. Una acción, un voto; en Corea un comprador del control no tiene que ofrecer el mismo precio a los minoritarios.';
C.gobierno.alertas = [
  'Prenda de 30,1 M de acciones del accionista de control por un préstamo de 950.000 M KRW, comunicada con hasta tres años de retraso (aviso de la bolsa, no sancionada) [' + c13 + ', ' + c14 + '].',
  'Ratio de garantía del préstamo de Bain estimado por encima del 80 % frente al 70 % pactado (Kiwoom, estimación, no comunicado por la empresa) [' + c17 + '].',
  'Tres primeros ejecutivos en cuatro años; dos cambios en siete meses (diciembre de 2025 y julio de 2026) [3, ' + c16 + '].',
  'Guía de 2026 recortada en agosto e inalcanzable tras el 3T26, sin retirarla [' + c19 + '].',
  'Fusión con Iruda, empresa de otro fondo de Bain (operación vinculada) [1].',
];
C.gobierno.confianza = 'Media';
C.huecos = [
  { seccion: 'gobierno', campo: 'Votos de la junta de marzo de 2026', tipo: 'Complemento', intentos: '1) DART, resultado de la junta (31-mar-2026: solo aprobado o rechazado); 2) informe semestral (no da porcentajes); 3) prensa coreana (sin cifras)', decision: 'Omitido' },
  { seccion: 'gobierno', campo: 'Remuneración individual del primer ejecutivo', tipo: 'Complemento', intentos: '1) DART, informe de negocio 2025 (nadie supera 500 M: no hay detalle individual); 2) informe semestral 2026 (tampoco); 3) prensa (sin cifras)', decision: 'Omitido' },
];
C._estado = 'completa (13-nov)';
guarda('C', C);

// ============================================================ D. Mercado y valoración
const D = lee('D');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
// Las fuentes 1, 6 y 8 de D se reescriben con la fecha nueva (mismo editor y tipo; los datos son del 13-nov).
D.fuentes[0] = { ...D.fuentes[0], fecha: '2026-11-13', titulo: 'Históricos diarios de 214150.KQ, del índice KOSDAQ (^KQ11) y del ETF TIGER Healthcare (143860.KS) hasta el 13-nov-2026; cierres de cada ejercicio, betas y volatilidad' };
D.fuentes[1] = { ...D.fuentes[1], fecha: '2026-11-12', titulo: 'Consenso anual 2026e-2028e de FnGuide (media de tres meses de las casas coreanas) a 12-nov-2026: BPA 2.176 / 2.798 / 3.591 KRW' };
D.fuentes[2] = { ...D.fuentes[2], fecha: '2026-11-13', titulo: 'Informes de analistas del 13-nov-2026 tras el 3T26, con recomendación y objetivo (DB, KIS, Kyobo, Shinhan, Samsung, NH, Kiwoom, Daol, Daishin) y de octubre (KB, NH, Kyobo, KIS, Daol)' };
D.fuentes[5] = { ...D.fuentes[5], fecha: '2026-11-13', titulo: 'Fichas de comparables de Yahoo Finance a 13-nov-2026 (precio, capitalización, valor empresa, ventas y EBITDA de los últimos doce meses, estimaciones de BPA y ventas)' };
D.fuentes[7] = { ...D.fuentes[7], fecha: '2026-11-13', titulo: 'Tipos de cambio KRW=X (1.337,98) y CNYKRW=X (200,59), 13-nov-2026' };
D.fuentes[8] = { ...D.fuentes[8], fecha: '2026-11', titulo: 'Implied ERP by month (ERPbymonth.xlsx): noviembre de 2026, 4,41 % (T12m with sustainable payout)' };
const d17 = nueva(D.fuentes, { titulo: 'Shinhan Investment, «길어지는 성장통» (3T26; objetivo 35.000 KRW; ventas 377.700 / 468.600 / 566.200 M y BPA 1.345 / 2.210 / 2.804 KRW en 2026e-2028e)', editor: 'Shinhan Investment Corp.', tipo: 'Analistas', fecha: '2026-11-13', url: 'https://stock.pstatic.net/stock-research/company/21/20261113_company_976745000.pdf' });
const d18 = nueva(D.fuentes, { titulo: 'Kyobo Securities, «3Q26 Review: 내년을 바라보자» (objetivo 45.000 KRW; ventas 376.000 / 508.500 / 628.000 M y BPA 1.465 / 2.647 / 3.294 KRW; sin nueva corrección de la guía)', editor: 'Kyobo Securities', tipo: 'Analistas', fecha: '2026-11-13', url: 'https://stock.pstatic.net/stock-research/company/62/20261113_company_269321000.pdf' });
const d19 = nueva(D.fuentes, { titulo: 'Kiwoom Securities, «가을이 막 끝났는데 보릿고개» (objetivo 35.000 KRW, −35,2 %; ventas 367.200 / 428.100 M y BPA 1.249 / 2.004 KRW en 2026e-2027e; financiación de Bain)', editor: 'Kiwoom Securities', tipo: 'Analistas', fecha: '2026-11-13', url: 'https://stock.pstatic.net/stock-research/company/39/20261113_company_900479000.pdf' });
const d20 = nueva(D.fuentes, { titulo: 'DART: avance de resultados del 3T26 (12-nov-2026)', editor: 'CLASSYS Inc. / KIND', tipo: 'Primaria', fecha: '2026-11-12', url: DART('20261112900535') });
const d21 = nueva(D.fuentes, { titulo: 'DART: prenda de 30.072.418 acciones de BCPE Centur por 950.000 M KRW (comunicada el 26-jun-2026)', editor: 'CLASSYS Inc. / KIND', tipo: 'Primaria', fecha: '2026-06-26', url: DART('20260626900920') });

D.identificacion = {
  ...D.identificacion,
  precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio,
  capitalizacion_publicada: 1552400, free_float_pct: 35.8,
  max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s,
  volumen_medio_diario: '≈ 7.210 M KRW/día (3 meses; 236.954 acciones)', proximos_resultados: '2027-02-12',
};
D.consenso.guidance = 'Guía de ventas de 2026 dada el 13-feb-2026: 490.000 M KRW (banda 470.000-510.000 M). Se confirmó el 13-may y se rebajó a 445.000 M (banda 430.000-460.000 M) el 12-ago-2026 «para reflejar el entorno» [nota A: ' + 19 + ']. Tras el 3T26 (9M26: 275.714 M) la empresa no la ha retirado ni cambiado [' + d18 + '], pero exigiría un 4T26 de 154.000-184.000 M frente a 83.023 M del 3T26 [' + d19 + ']. No da guía de margen ni de 2027; presenta 2027 como el año de vuelta al crecimiento (China, EE. UU., Europa, Corea con productos nuevos y Latinoamérica normalizada) [' + d20 + ']. A medio plazo, el objetivo de 1.000 M USD de ventas en 2030 (≈ 1,34 billones KRW) sigue en las presentaciones de la empresa, sin actualizar.';
D.consenso.estimaciones = [
  { periodo: '2026e', ingresos: 373600, ebitda: null, ebit: 140600, bpa: 1353, dpa: 1000, fuente: 'Media de Kiwoom, Shinhan y Kyobo del 13-nov-2026 [' + d19 + ', ' + d17 + ', ' + d18 + ']' },
  { periodo: '2027e', ingresos: 468400, ebitda: null, ebit: 190600, bpa: 2287, dpa: 1000, fuente: 'Media de Kiwoom, Shinhan y Kyobo del 13-nov-2026 [' + d19 + ', ' + d17 + ', ' + d18 + ']' },
  { periodo: '2028e', ingresos: 597100, ebitda: null, ebit: 260300, bpa: 3049, dpa: 1000, fuente: 'Media de Shinhan y Kyobo del 13-nov-2026 [' + d17 + ', ' + d18 + ']' },
];
D.consenso.recomendaciones = { n_analistas: 10, comprar: 9, mantener: 1, vender: 0, po_medio: 35900, po_min: 26000, po_max: 47000 };
D.consenso.revisiones = 'Recortes fuertes y sucesivos. En abril Samsung Securities esperaba un BPA de 2.931 KRW en 2026e [5]; el consenso de FnGuide (media de tres meses, todavía con estimaciones anteriores al 3T26) estaba a 12-nov en 2.176 / 2.798 / 3.591 KRW para 2026e-2028e [2]. Los tres informes posteriores al 3T26 que hemos leído bajan el BPA de 2026e a 1.249-1.465 KRW (−38 % a −27 % sobre 2025) y el de 2027e a 2.004-2.647 KRW [' + d19 + ', ' + d17 + ', ' + d18 + ']. El 13-nov nueve casas publicaron objetivos de 26.000 a 45.000 KRW (DB pasa a mantener con 26.000; KIS 33.000; Kyobo 45.000; Shinhan 35.000; Samsung 30.000; NH 36.000; Kiwoom 35.000; Daol 29.000; Daishin 43.000), con una media de 34.700 KRW, frente a los 40.000-67.000 KRW de agosto-octubre [3]. Con KB (47.000 KRW, 29-oct) la media de diez es de 35.900 KRW. Yahoo sigue dando 2.230 KRW para 2026e: desfasado [6].';
D.consenso.confianza = 'Media';
D.bolsa = {
  ...D.bolsa, ...bolsa.bolsa, posicion_corta_pct: null,
  comentario: 'La acción subió de 18.400 KRW (fin de 2022) a un máximo de cierre de 75.600 KRW el 29-ene-2026 y desde entonces ha caído un 68,5 %, hasta 23.800 KRW el 13-nov [1]. En el año pierde un 56,3 % frente al −24,4 % del KOSDAQ y el −31,0 % del ETF de salud coreano [1]. Causas, por orden: (1) las ventas en bloque de Bain con descuento (8,25 % a 60.000 KRW el 25-feb, −11,1 % ese día) y la prenda de sus acciones [10, ' + d21 + ']; (2) tres trimestres por debajo del consenso, con la guía recortada el 12-ago (−27,9 % en cinco sesiones) y un 3T26 un 40 % por debajo en beneficio operativo (12-nov, −4,4 %; el 13-nov llegó a 21.650 KRW y cerró en 23.800) [3, ' + d20 + ']; (3) la caída del KOSDAQ (−42 % en seis meses) y del sector estético coreano [1, 6]. A 23.800 KRW cotiza a 14 veces el BPA de los últimos doce meses (1.703 KRW) y a 9,1 veces el EBITDA.',
  confianza: 'Alta',
};
D.multiplos_historicos.comentario = 'De 2020 a 2024 la acción cotizó entre 16 y 25 veces el beneficio real del año siguiente (mediana de 22,8 veces) y entre 16 y 33 veces el del propio año; 2025 no tiene todavía el BPA real de 2026 y no entra en la historia adelantada. Hoy, a 23.800 KRW, cotiza a unas 12,7 veces nuestro BPA de 2027e y a 14 veces el de los últimos doce meses: en el mínimo de su historia como empresa de crecimiento. Lo que ha cambiado: Corea, que era el 31 % de las ventas y la parte más rentable, cae un 25-36 %; el margen operativo ha bajado del 50 % al 33-39 %; la caja neta se ha convertido en una pequeña deuda neta, y hay un vendedor apalancado con casi la mitad del capital. Parte del descuento es estructural.';
D.comparables.comentario = 'El sector estético coreano entero cotiza barato: Hugel y PharmaResearch a 12-13 veces el BPA de los próximos doce meses con márgenes operativos del 38-39 % y crecimientos del 20-30 %; Wontech a 6 veces. CLASSYS cotiza a unas 12,7 veces nuestro BPA de 2027e, en la mediana del grupo, pero hoy crece menos (9M26 +13 % con Sudamérica; −14 % sin ella en el 3T) y su margen ha caído por debajo del de Hugel y PharmaResearch. InMode, el fabricante occidental más parecido, cotiza a 10 veces con ventas planas y margen hundido: es el precedente de lo que pasa cuando un fabricante de equipos estéticos deja de crecer. La regresión múltiplo-crecimiento no tiene poder explicativo con tan pocos datos.';
D.transacciones.comentario = 'Las compras de fabricantes coreanos de equipos estéticos por capital privado se pagaron a 3,7 veces las ventas (Lutronic, 2023) y a ≈ 1 billón KRW por Jeisys (2024); Bain pagó por CLASSYS 20 veces el EBITDA en 2022. Hoy CLASSYS vale en bolsa ≈ 1,6 billones de valor empresa, unas 9 veces el EBITDA de los últimos doce meses. Es candidata natural a una operación (Bain quiere salir y su préstamo pesa), pero el intento de 2024 fracasó porque nadie pagó la prima pedida, y la ley coreana no obliga a extender el precio de control a los minoritarios [11].';
D._estado = 'completa (13-nov)';
guarda('D', D);

// ============================================================ E. Sentimiento
const E = lee('E');
const e4 = nueva(E.fuentes, { titulo: 'Foro de Naver (종목토론실) de 214150: 300 mensajes del 13-oct al 13-nov-2026 (API pública front-api/discussion)', editor: 'Naver Pay Securities', tipo: 'Foros y redes', fecha: '2026-11-13', url: 'https://m.stock.naver.com/domestic/stock/214150/discussion' });
E.sentimiento.tono = 'Negativo';
E.sentimiento.tendencia = 'Empeora';
E.sentimiento.revisadas = [
  { plataforma: 'Foro de Naver, 12 y 13 de noviembre de 2026 (tras el 3T26)', fecha: '2026-11-13', n_comentarios: 90, tono: 'Negativo', resumen: 'Capitulación y rabia: «la dirección no cumple ni su propia guía», «Bain no saldrá sin hundirla», «el próximo trimestre será de pérdidas», objetivos de 12.000-18.000 KRW. Una minoría ve un «big bath» del nuevo primer ejecutivo (limpiar inventario de Sudamérica y diferencias de cambio de una vez) y compra por debajo de 25.000 KRW; otros esperan una venta forzosa de la prenda de Bain para comprar más abajo [' + e4 + '].' },
  ...E.sentimiento.revisadas.slice(0, 3),
];
E.sentimiento.temas = [
  { tema: 'Bain y su préstamo: venta forzosa de la prenda', postura: 'Bajista', peso: 'Alto', contraste: 'La prenda existe (30,1 M de acciones por 950.000 M KRW, nota C) y Kiwoom estima el ratio de garantía por encima del 80 % frente al 70 % pactado. No hay comunicación de ejecución ni de venta; en Corea lo habitual es un recargo de interés. Es el riesgo que más pesa en el precio.' },
  { tema: 'La guía no se cumple: dirección poco creíble', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: la guía de 2026 se recortó en agosto y tras el 3T26 es inalcanzable (nota A). Lo recogemos con un 2026e de 370.000 M, por debajo de la banda.' },
  { tema: '«Big bath»: el nuevo equipo limpia y 2027 rebota', postura: 'Alcista', peso: 'Medio', contraste: 'En parte: 15.100 M del −81 % del beneficio son diferencias de cambio que no son caja (nota A). Pero el beneficio operativo cae un 28 % por Corea, que no es limpieza contable.' },
  { tema: 'Brasil: la caja se va', postura: 'Bajista', peso: 'Medio', contraste: 'La compra consolidó deuda y una cartera de cobro deteriorada (provisión de 62.314 M a junio, nota A); no hay indicio de desvío de caja.' },
  { tema: 'Está barata (PER de 12-13 sobre 2027)', postura: 'Alcista', peso: 'Medio', contraste: 'Barata frente a su historia (22,8 veces de mediana adelantada), en línea con Hugel y PharmaResearch (nota D).' },
];
E.sentimiento.lectura = 'El sentimiento de los particulares coreanos ha pasado de enfado a capitulación tras el 3T26: el foro da por perdido 2026, desconfía de la dirección y espera que Bain venda (o que el banco venda por él). Los analistas, en cambio, siguen casi todos en comprar con objetivos de 26.000-47.000 KRW. La distancia entre los dos es la de siempre en la acción: los particulares venden y las casas esperan 2027. Ningún tema del foro trae un hecho que no recojamos en las notas A-D; el de la prenda de Bain es el que más puede mover el precio y está en riesgos y en el contexto de bolsa.';
E._estado = 'completa (13-nov)';
guarda('E', E);
console.log('Notas actualizadas al 13-nov: A', A.fuentes.length, 'fuentes; B', B.fuentes.length, '; C', C.fuentes.length, '; D', D.fuentes.length, '; E', E.fuentes.length);

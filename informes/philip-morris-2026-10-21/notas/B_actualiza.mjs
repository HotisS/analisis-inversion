// Actualización de la nota B tras los resultados del 3T26 (21-oct-2026).
import fs from 'node:fs';
const ruta = new URL('./B.json', import.meta.url);
const b = JSON.parse(fs.readFileSync(ruta, 'utf8'));

// Fuentes nuevas
b.fuentes.push(
  { id: 13, titulo: 'PMI Reports 2026 Third-Quarter & First Nine-Months Results (volúmenes, cuotas, ZYN en EE. UU., guía de 2026)', editor: 'Philip Morris International Inc. (SEC, 8-K, exhibit 99.1)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/Archives/edgar/data/1413329/000162828026066596/earningsreleasepm-ex991xq3.htm' },
  { id: 14, titulo: 'EU hits an impasse on tobacco taxation, again (voto de la comisión ECON del 3-jun-2026 y retirada del orden del día del Ecofin)', editor: 'Eunews', tipo: 'Prensa', fecha: '2026-06-04', url: 'https://www.eunews.it/en/2026/06/04/eu-hits-an-impasse-on-tobacco-taxation-again/' },
  { id: 15, titulo: 'EU Tobacco Tax Reform Targets November Push as Sweden Holds Nicotine-Pouch Minimum at €20 per Kilogram', editor: '2Firsts (citando a Law360)', tipo: 'Prensa', fecha: '2026-09-17', url: 'https://www.2firsts.com/news/eu-tobacco-tax-reform-targets-november-push-as-sweden-holds-nicotine-pouch-minimum-at-20-per-kilogram' },
  { id: 16, titulo: 'Altria Group: hechos XBRL del Form 10-K de 2025 (ingresos y resultado operativo)', editor: 'SEC (companyfacts)', tipo: 'Primaria', fecha: '2026-02', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000764180.json' },
  { id: 17, titulo: 'Turning Point Brands: hechos XBRL del Form 10-K de 2025 (ingresos y resultado operativo)', editor: 'SEC (companyfacts)', tipo: 'Primaria', fecha: '2026-03', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001290677.json' },
);

const s = b.sector;
s.definicion = s.definicion.replace('PMI publica sus ingresos netos de ellos [1].', 'PMI publica sus ingresos netos de ellos [1]. En el 3T26 el volumen de la industria de cigarrillos y calentado sin China ni EE. UU. fue estable (−0,1 %; −0,4 % en nueve meses) [13].');
s.drivers = [
  { driver: 'Caída del volumen de cigarrillos', efecto: '−', horizonte: 'Estructural', evidencia: 'Industria sin China ni EE. UU.: −2 % anual en 2022-2025 y −3,1 % en los mercados con productos sin humo [3]; en 2026 se frena: cigarrillos y calentado −0,4 % en nueve meses y −0,1 % en el 3T26 [13].' },
  { driver: 'Paso a productos sin humo (calentado, bolsas, vapeo)', efecto: '+', horizonte: 'Estructural', evidencia: 'Volumen sin humo +19 % anual en 2022-2025 [3]; en el 3T26 PMI vendió +2,7 % (ventas al consumidor del calentado +7,1 %), VEEV +61,6 % y bolsas modernas fuera de EE. UU. +20,6 % [13].' },
  { driver: 'Poder de precios de los cigarrillos', efecto: '+', horizonte: 'Estructural', evidencia: 'Precio del +8,9 % en International Combustibles en el 3T26 con volumen plano; margen bruto ajustado del segmento del 68,5 % (+1,3 puntos) [13].' },
  { driver: 'Impuestos especiales', efecto: '−', horizonte: 'Estructural', evidencia: 'Japón subió el impuesto del calentado dos veces en 2026 (40 JPY por paquete el 1-abr y 20 JPY el 1-oct) [13]; la UE negocia mínimos para calentado y bolsas [14, 15].' },
  { driver: 'Regulación de la FDA en EE. UU.', efecto: '+/−', horizonte: 'Estructural', evidencia: 'ZYN suma 31 variedades autorizadas (11 de ZYN ULTRA el 21-ago-2026) y la declaración de riesgo reducido de 20 variedades (30-jun-2026); ILUMA sigue pendiente desde oct-2023 [13, 2].' },
  { driver: 'Divisas de emergentes y costes de energía', efecto: '+/−', horizonte: 'Cíclico', evidencia: '−0,77 USD de BPA por divisa en 2022 [3]; +0,18 USD en la guía de 2026 de octubre (antes +0,24) y más coste de energía por el conflicto de Oriente Medio en el 3T26 y el 4T26 [13].' },
];
s.porter[0].justificacion = 'Cuatro grandes (PMI, BAT, JT, Imperial) más Altria en EE. UU.; en bolsas de nicotina la rivalidad sube: PMI amplía ZYN (ULTRA, sabores secos, 1,5 y 8 mg), pasa a latas de 20 bolsas para ajustar su prima de precio y sube la inversión comercial en el 4T26 para recuperar cuota (+1 punto entre junio y septiembre según Nielsen, citado por PMI) [13].';
s.ciclo.comentario = 'El tabaco es poco cíclico: en 2008-09 PMI mantuvo el volumen y subió precios; en 2020 la pandemia restó viajes y duty-free pero el BPA ajustado solo cayó un 0,4 % (+7 % sin divisa) [3]. En 2022 el golpe vino de la divisa y de Rusia (BPA −2,4 % en USD) [3]. Lo cíclico es el tipo de cambio de los emergentes y, en 2026, la energía: el conflicto de Oriente Medio encareció los insumos en el 3T26 y PMI espera algo más de impacto en el 4T26; los ataques en Ucrania alteran la logística [13].';
s.regulacion = 'UE: la Comisión propuso en julio de 2025 revisar la directiva de impuestos especiales del tabaco (mínimos más altos para los cigarrillos e inclusión del calentado, el vapeo y las bolsas desde 2028) [2]. La comisión ECON del Parlamento aprobó el 3-jun-2026 una versión rebajada (mínimo de 200 EUR por 1.000 cigarrillos, frente a 215 de la Comisión y 94 hoy, desde el 1-ene-2028) y ese día el texto salió del orden del día del Ecofin por falta de unanimidad [14]. La presidencia irlandesa busca un acuerdo político en el Ecofin del 9-nov-2026; Suecia no acepta un mínimo para las bolsas por encima de 20 EUR/kg [15]. Reino Unido: ley del 29-abr-2026 que prohíbe vender tabaco, también calentado, a los nacidos desde 2009 [2]. EE. UU.: la FDA autorizó 31 variedades de ZYN y la declaración de riesgo reducido de 20; el 8-may-2026 dijo que no perseguirá productos con solicitudes avanzadas, e ILUMA sigue en revisión [13, 2]. Sabores: prohibidos en el calentado en la UE desde 2023 y en Polonia desde enero de 2026 [8].';
s.tendencias = 'El consumo se desplaza hacia productos sin combustión: en 2025 el 32 % de los consumidores de nicotina fuera de China ya usaba alguno [3]. PMI gana con ello en calentado (las unidades de IQOS son ya el 9,9 % del volumen de cigarrillos y calentado en sus mercados, +1,0 punto en el 3T26) y en vapeo cerrado (VEEV, primero en Europa, +61,6 %) [13], pero pierde terreno relativo en bolsas de EE. UU., la categoría que más crece, donde los rivales venden sabores y potencias que ZYN no tenía autorizados; ZYN ULTRA y los nuevos formatos buscan cerrar ese hueco [8, 13]. PMI fabricará cigarrillos para Altria fuera de EE. UU. desde 2027, señal de que los dos optimizan un negocio que se encoge [12].';

const c = b.competencia;
c.cuota_pct = 25.9;
c.posicion = '1.º mundial sin China ni EE. UU.: 25,9 % del volumen de cigarrillos en el 3T26 (+0,4 puntos; Marlboro 11,4 %, récord) [13]; ≈ tres cuartos del volumen de tabaco calentado mundial con IQOS [13]; ≈ dos tercios del valor de las bolsas de nicotina de EE. UU. con ZYN en 2025 [11].';
const mo = c.competidores.find(x => x.ticker === 'MO');
mo.margen_ebit_pct = 42.5;
mo.comentario = 'Marlboro en EE. UU. (licencia de la marca separada de PMI desde 2008) y on! en bolsas. Ingresos de doce meses de 20.444 M USD (Yahoo) [10]; margen EBIT de 2025 del 42,5 % (9.899 M USD sobre 23.279 M de ingresos que incluyen el impuesto especial federal, así que sobre ingresos netos de impuestos sería mayor) [16].';
const tpb = c.competidores.find(x => x.ticker === 'TPB');
tpb.margen_ebit_pct = 20.6;
tpb.comentario = 'Zig-Zag, Stoker\'s y FRE, bolsas de nicotina que ganan cuota en EE. UU. Ingresos de doce meses de 507 M USD (Yahoo) [10]; margen EBIT de 2025 del 20,6 % (95 M USD sobre 463 M) [17].';
const f = Object.fromEntries(c.foso.fuentes.map(x => [x.fuente, x]));
f['Costes de cambio'].evidencia = 'Dispositivo propio (IQOS solo usa TEREA, SENTIA o LEVIA) y fidelidad a la marca: en Japón IQOS mantiene el 68 % de la categoría tras dos subidas de impuestos en 2026, con SENTIA para los más sensibles al precio [13].';
f['Intangibles (marca, patentes, licencias)'].evidencia = 'Marlboro con récord del 11,4 % de cuota en el 3T26, IQOS con ≈ tres cuartos del calentado, ZYN con 31 variedades autorizadas y la primera declaración de riesgo reducido de la FDA en bolsas [13].';
f['Ventaja en costes'].evidencia = 'Margen operativo ajustado del 44,7 % en el 3T26 (40,4 % en 2025) frente al 42,5 % de margen EBIT de Altria con impuestos dentro de los ingresos y al 21 % de EBITDA de Imperial [13, 16, 10].';
c.amenazas = 'Las amenazas reales son tres. Primera, las bolsas de nicotina en EE. UU.: la categoría crece más que ZYN (+4,2 % en el 3T26) porque Velo Plus, on! PLUS y productos importados sin autorizar ofrecen sabores y potencias que ZYN no tenía; PMI responde con ZYN ULTRA, latas de 20 bolsas y más gasto comercial en el 4T26, que ya bajó el resultado del segmento un 3,3 % en el trimestre [13]. Segunda, los impuestos al calentado (Japón dos veces en 2026, la UE desde 2028 si hay unanimidad), que estrechan la ventaja fiscal de IQOS frente al cigarrillo [13, 14, 15]. Tercera, prohibiciones de sabores y generacionales (Polonia, Reino Unido) [2]. Probabilidad media; el foso de marca y de autorizaciones aguanta.';

const h = b.historia.hitos.find(x => x.anio === '2026');
h.hito = 'Nueva organización (International y U.S.); ZYN obtiene la declaración de riesgo reducido (30-jun) y la autorización de 11 variedades de ZYN ULTRA (21-ago); Massimo Andolina, director financiero [2, 13].';

b.esg.materialidad = 'Lo material es la salud: PMI sostiene que sus productos sin humo reducen el daño frente al cigarrillo y lo respaldan las autorizaciones de la FDA (IQOS y ZYN como productos de riesgo o exposición reducidos) [2]. El cigarrillo aún aporta el 58,8 % de los ingresos netos del 3T26 (6.725 de 11.438 M USD; estimación propia con la tabla por segmentos) [13]. El segundo asunto es el ilícito y la regulación: las bolsas de nicotina son más fáciles de falsificar y PMI amplía sus controles [2]. Muchos fondos excluyen el tabaco por política, lo que limita la base de accionistas y puede explicar parte del descuento histórico frente al consumo básico.';

const hu = b.huecos.find(x => x.campo === 'margen EBIT de los competidores');
hu.campo = 'margen EBIT de BAT, Japan Tobacco, Imperial, KT&G e ITC';
hu.intentos = '1) Yahoo: margen EBITDA, no EBIT; 2) XBRL de la SEC: Altria y Turning Point resueltos, BAT (20-F en NIIF) sin ingresos en el XBRL; 3) informes anuales de JT, Imperial, KT&G e ITC: no leídos por tiempo';

b._estado = 'terminado';
fs.writeFileSync(ruta, JSON.stringify({ _estado: b._estado, ...b }, null, 2) + '\n');
console.log('ok');

// Textos del analista (LVMH, corte 2026-10-21, tras las ventas del 3T26; base: los del 8-oct). Las cifras del motor se leen de datos.json (calc de la última
// ejecución); tras cambiar supuestos se integra y calcula dos veces para que los textos queden al día.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { filas } from './supuestos.mjs';

const DIR = dirname(fileURLToPath(import.meta.url));
const RUTA = join(DIR, '..', 'datos.json');
const D = existsSync(RUTA) ? JSON.parse(readFileSync(RUTA, 'utf8')) : {};
const c = D.calc || {};
const g = (ruta, def = null) => ruta.split('.').reduce((o, k) => (o == null ? o : o[k]), c) ?? def;
const n = (x, d = 1) => (x == null || isNaN(x) ? 'n.d.' : Number(x).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: Math.abs(x) >= 10000 ? true : false }));
const m = (x) => (x == null ? 'n.d.' : Math.round(x).toLocaleString('es-ES', { useGrouping: true }).replace(/(\d)(\d{3})$/, (s) => s)); // millones con punto de miles
const M = (x) => { if (x == null) return 'n.d.'; const s = String(Math.round(Math.abs(x))); const r = s.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return (x < 0 ? '−' : '') + r; };
const e2 = (x) => n(x, 2);
const pc = (x, d = 1) => (x == null ? 'n.d.' : (x > 0 ? '+' : '') + n(x, d).replace('-', '−') + ' %');

// Cifras del motor usadas en los textos.
const precio = 386.75;
const O12 = 481.96, O12R = 28.0, O12B = 23.6; // objetivo 12 m de apuntar-12m (21-oct, precio 386,75)
const VO = g('sintesis.valor_objetivo');
const POT = g('sintesis.potencial_pct');
const RT = g('recomendacion.rentabilidad_total_pct');
const ASIM = g('recomendacion.asimetria');
const DIVY = g('recomendacion.dividendo_pct');
const REL = g('recomendacion.relativo') || {};
const DCF = g('dcf.valor_accion');
const WACC = g('dcf.wacc');
const KE = g('dcf.ke');
const VT = g('dcf.peso_terminal_pct');
const INV = g('dcf.inverso') || {};
const ESC = g('escenarios') || [];
const esc = (k) => ESC.find((x) => x.escenario === k) || {};
const SP = g('suma_partes') || {};
const SPV = SP.valor_accion ?? SP.valor_por_accion ?? null;
const CL = g('clave') || {};
const MH = g('multiplos_historicos') || [];
const mhE = MH.find((x) => x.campo === 'ev_ebitda_ltm') || {};
const mhP = MH.find((x) => x.campo === 'per_ltm') || {};
const COMP = (g('comparables.implicito') || []);
const compE = COMP.find((x) => /EV\/EBITDA próximos/.test(x.metodo)) || {};
const compP = COMP.find((x) => /PER próximos/.test(x.metodo)) || {};
const SENS2 = g('dcf.sensibilidad2.filas') || [];
const SENS = g('dcf.sensibilidad.filas') || [];
const v = (fila, col) => (fila ? fila['v' + col] : null);
const sMargMenos1 = v(SENS2.find((f) => f.margen === '-1 pp'), 2);
const sMargMenos2 = v(SENS2.find((f) => f.margen === '-2 pp'), 2);
const sWaccMas = v(SENS[3], 2);
const sWaccMenos = v(SENS[1], 2);
const NIV = g('recomendacion.comprar_por_debajo');
const NIVV = g('recomendacion.vender_por_encima');
const ROIC25 = (g('rentabilidad') || []).at(-1)?.roic_pct;
const f27 = filas[1];
const f26 = filas[0];

export const limitaciones = `Línea cotizada: la acción ordinaria de Euronext París (MC); no hay otras clases cotizadas. Cuentas en euros, NIIF-UE; la acción cotiza en euros. Con NIIF 16, el EBITDA excluye los alquileres fijos, los pasivos por arrendamiento (16.261 M a 30-jun-26) van en la deuda del puente y el capex del DCF incluye las altas de derechos de uso; los alquileres variables ligados a ventas (2.184 M en 2025) siguen dentro del EBITDA. Los compromisos de compra de minoritarios (6.416 M, sobre todo la opción de venta de Diageo por el 34 % de Moët Hennessy) se tratan como deuda, porque el 34 % de Diageo ya no figura en los minoritarios contables. LVMH publica ventas trimestrales y resultados semestrales: la sección de resultados recientes usa semestres. El consenso procede de un solo proveedor gratuito (MarketScreener), sin desglose de recomendaciones. LVMH no publica transcripciones de sus conferencias. La desinversión de DFS (Gran China en marzo de 2026; Los Ángeles, San Francisco y Okinawa en el segundo semestre) y la venta de Marc Jacobs (cerrada el 1-sep-2026, sin precio publicado) cambian el perímetro de Distribución Selectiva y de Moda en 2026-2027. Precio del informe: cierre de Euronext del 20-oct-2026 (386,75 EUR), del CSV oficial; el 3T26 (12-oct) solo trae ventas, así que el LTM y el balance son de 30-jun-2026; el puente resta además las recompras de agosto-octubre (844 M) para que acciones y caja vayan a la misma fecha. LVMH no publica regiones del 3T26: lo de Asia sale de la conferencia, vía prensa.`;

export const controles_explicados = [
  { control: 'Regresión múltiplo-crecimiento', explicacion: 'Los comparables de lujo cotizan por calidad de marca y margen, no por crecimiento a 12 meses (Hermès a 15,6x el EBITDA con un crecimiento inferior al de Richemont): la regresión no se usa.' },
  { control: 'Comparables estables al quitar una empresa', explicacion: 'La muestra mezcla Hermès, Cucinelli y L\'Oréal (múltiplos altos) con Prada, Moncler y Kering (bajos). Por eso los comparables pesan solo un 15 % y la valoración relativa se apoya en la suma de partes por grupo de negocio.' },
];

export const parches = [
  { ruta: 'bolsa.posicion_corta_pct', valor: 0 },
];

export const huecos_resueltos = [
  { seccion: 'bolsa', campo: 'posicion_corta_pct' },
];

export const fuentes = [
  { id: 2, titulo: 'Financial calendar: 2026 Q3 Revenue (12 de octubre de 2026)', editor: 'LVMH', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://www.lvmh.com/en/financial-calendar' },
  { id: 3, titulo: 'Historique des positions courtes nettes sur actions rendues publiques (exportación del 7-oct-2026)', editor: 'AMF, vía data.gouv.fr', tipo: 'Primaria', fecha: '2026-10-07', url: 'https://www.data.gouv.fr/datasets/historique-des-positions-courtes-nettes-sur-actions-rendues-publiques-depuis-le-1er-novembre-2012' },
];

// ---------- Secciones de juicio ----------
const rentabilidad = {
  comentario: `LVMH crea valor, pero cada vez menos. El ROIC (capital invertido con fondo de comercio, marcas y derechos de uso) bajó del 20,1 % de 2022 al 12,7 % de 2025, frente a un WACC del ${n(WACC, 2)} %: el diferencial pasó de unos 11 puntos a ${n(ROIC25 - WACC, 1)}. Lo mueve el margen, no la rotación: el margen operativo recurrente cayó 4,5 puntos (del 26,5 % al 22,0 %) mientras la rotación del capital se mantuvo en 0,55-0,62 veces las ventas [A2]. El ROIC incremental de 2021-2025 es negativo (${n(g('roic_incremental_pct'), 1)} %): el capital invertido creció 21.000 M (Tiffany, existencias +43 % y tiendas) y el NOPAT acabó por debajo del de 2021 [A2, A3]. El ROE (16,1 %) supera al ROIC por un apalancamiento moderado. Frente a sus pares, Hermès gana un 41 % de margen operativo y Moncler un 29 %, mientras Kering ha bajado al 11 % [B8, B9, B13]: LVMH sigue en la mitad alta del sector, pero su diferencial sobre el coste de capital ya no justifica un DCF de tres etapas.`,
  confianza: 'Alta',
};

const calidadComentario = null;

const suma_partes = {
  aplica: true,
  descuento_holding_pct: 10,
  partes: [
    { segmento: 'Moda y Marroquinería', metrica: 'Resultado operativo recurrente 2027e', valor_metrica: Math.round(f27.pro.flg), multiplo: 15.0, ev_directo: null, justificacion: 'Louis Vuitton, Dior, Loro Piana y Celine: margen del 34-35 %, entre Hermès (41 %) y Prada o Moncler (23-29 %) [A2, B8]. 15 veces el EBIT de los próximos 12 meses, la mediana de Hermès (17,5x), Kering (15,4x), Prada (11,1x), Moncler (10,2x) y Cucinelli (22,3x) [D12, D13, D15, D16, D17].' },
    { segmento: 'Vinos y Licores', metrica: 'Resultado operativo recurrente 2027e', valor_metrica: Math.round(f27.pro.ws), multiplo: 11.0, ev_directo: null, justificacion: 'Champán y coñac en el fondo del ciclo (margen del 19 % en 2025 frente al 32 % de 2023) [A2]. Pernod Ricard cotiza a 10,7 veces el EBIT [D18]; se valora el 100 % y el 34 % de Diageo se resta en el puente como compromiso de compra.' },
    { segmento: 'Perfumes y Cosmética', metrica: 'Resultado operativo recurrente 2027e', valor_metrica: Math.round(f27.pro.pc), multiplo: 14.0, ev_directo: null, justificacion: 'L\'Oréal cotiza a 19,7 veces el EBIT [D19], pero con un margen del 20 % frente al 9-10 % de este grupo, que vende en buena parte a mayoristas [A2]; Estée Lauder, el par más parecido, no se pudo documentar. 14 veces, con descuento sobre L\'Oréal.' },
    { segmento: 'Relojería y Joyería', metrica: 'Resultado operativo recurrente 2027e', valor_metrica: Math.round(f27.pro.wj), multiplo: 15.0, ev_directo: null, justificacion: 'Tiffany y Bvlgari: Richemont, su comparable directo, cotiza a 16,5 veces el EBIT de los próximos 12 meses con un margen del 20 % [D14]; aquí el margen es del 14-16 % [A2], de ahí el descuento.' },
    { segmento: 'Distribución Selectiva', metrica: 'Resultado operativo recurrente 2027e', valor_metrica: Math.round(f27.pro.sr), multiplo: 11.0, ev_directo: null, justificacion: 'Sephora y Le Bon Marché, sin DFS a partir de 2027: distribución con margen del 10-11 % [A2]. Ulta no se pudo documentar; 11 veces, en línea con los grupos de margen medio de la muestra (Pernod 10,7x, Prada 11,1x) [D16, D18].' },
    { segmento: 'Otras actividades y holding', metrica: 'Resultado operativo recurrente 2027e', valor_metrica: Math.round(f27.pro.ot), multiplo: 13.0, ev_directo: null, justificacion: 'Costes centrales, medios (Les Echos, Le Parisien), Belmond y Royal Van Lent netos: se capitalizan al múltiplo medio del grupo.' },
  ],
  comentario: null, // se completa tras el cálculo
  confianza: 'Media',
};

const SPtxt = () => `LVMH reúne negocios con perfiles distintos y la suma de partes lo hace visible. Moda y Marroquinería aporta ${M(Math.round(f27.pro.flg) * 15)} M de valor empresa antes del descuento, unas tres cuartas partes del total; Relojería y Joyería, ${M(Math.round(f27.pro.wj) * 15)} M; Distribución Selectiva, ${M(Math.round(f27.pro.sr) * 11)} M; Vinos y Licores, ${M(Math.round(f27.pro.ws) * 11)} M, y Perfumes y Cosmética, ${M(Math.round(f27.pro.pc) * 14)} M. Aplicamos un 10 % de descuento de conglomerado por el control familiar y el rechazo de los minoritarios a la remuneración [C1]. El resultado es de ${e2(SPV)} EUR por acción, ${pc(SPV / precio * 100 - 100)} sobre el precio. El mercado valora hoy el grupo entero a ${n(CL.ev_ebit_ltm, 1)} veces el EBIT de los últimos 12 meses, menos que cualquiera de sus pares de moda salvo Moncler y Prada [D15, D16]: o descuenta un descuento de conglomerado mayor, o duda de que Louis Vuitton y Dior recuperen crecimiento. Los múltiplos se aplican al resultado de 2027e, que recoge ya la salida de DFS y Marc Jacobs.`;

const catalizadores = {
  items: [
    { fecha: '22-oct y finales de octubre de 2026', evento: 'Ventas del 3T26 de Hermès y Kering', efecto: 'Dirán si la caída de LVMH en China es del sector o propia: Richemont crecía a doble dígito en China en su trimestre a junio [B22].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '3-dic-2026', evento: 'Dividendo a cuenta de 5,50 EUR [A5]', efecto: 'Rentabilidad por dividendo del 3,4 %; sin riesgo de recorte visible: el flujo libre cubrió 1,75 veces el dividendo en 2025 [A2].', probabilidad: 'Alta', sentido: '+' },
    { fecha: '2S26-1S27', evento: 'Cierre de la venta de DFS (Los Ángeles, San Francisco, Okinawa) y de Marc Jacobs [A4, A8]', efecto: 'Sale perímetro de bajo margen; caja de la venta y menos ruido en Distribución Selectiva.', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Finales de enero de 2027', evento: 'Resultados de 2026 y dividendo complementario', efecto: 'Si Moda vuelve a dar negativo en el 4T26, la señal de alarma se cumple entera; dirá también si el margen de Moda se estabiliza en el 34 %.', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Aranceles: Sección 301 de EE. UU. al 10 % desde el 24-7-2026 y antidumping de China al brandy europeo hasta 2030 [B6, B15]', efecto: 'Una exención para los licores europeos, como la del whisky británico, aliviaría a Hennessy; una subida al 15 % o más restaría margen a Vinos y Licores.', probabilidad: 'Media', sentido: '+/−' },
    { fecha: 'Abril de 2027', evento: 'Junta general', efecto: 'Votación de la remuneración del PDG: en 2026 el 76 % de los votos libres fue en contra (estimación propia) [C2]; cualquier paso en la sucesión de Bernard Arnault (77 años; límite de edad de 85).', probabilidad: 'Alta', sentido: '+/−' },
  ],
  confianza: 'Media',
};

const riesgos = {
  items: [
    { riesgo: 'Fatiga de precios en Moda y Marroquinería: el cliente aspiracional no vuelve y el rico prefiere marcas más exclusivas', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: `${pc(sMargMenos2 / DCF * 100 - 100)} con 2 puntos menos de margen EBITDA en todos los años (${e2(sMargMenos2)} EUR)`, mitigante: 'Renovación creativa en Dior, Celine, Loewe y Givenchy; Louis Vuitton mantuvo un margen de grupo del 34,1 % en el 1S26 [A5].', senal: 'Crecimiento orgánico de Moda por debajo del 0 % dos trimestres seguidos.' },
    { riesgo: 'La demanda china sigue cayendo (Asia sin Japón −5 % y la clientela china de Moda ≈ −15 % en el 3T26)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: `${pc(esc('Bajista').potencial_pct)} en el escenario bajista (${e2(esc('Bajista').valor)} EUR)`, mitigante: 'EE. UU. (+5 %), Japón (+6 %) y Europa (+4 %) crecen en el 3T26 y septiembre fue mejor que el trimestre [A].', senal: 'Asia sin Japón otra vez negativa en el 4T26.' },
    { riesgo: 'Divisas: el 80 % de las ventas se factura fuera del euro', tipo: 'Financiero', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'La divisa restó 1.065 M al resultado recurrente de 2025 (6 %) y 686 M en el 1S26 [A2, A5]', mitigante: 'Coberturas de flujos comerciales a 12-18 meses.', senal: 'EUR/USD por encima de 1,25.' },
    { riesgo: 'Aranceles sobre coñac y lujo europeo (EE. UU. y China)', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Vinos y Licores es el 6 % del resultado recurrente; un margen 5 puntos menor restaría unos 270 M de EBIT (estimación propia)', mitigante: 'Compromiso de precio mínimo de Hennessy en China [B15]; producción local de Moët Hennessy en EE. UU. solo para vinos espumosos.', senal: 'Arancel estadounidense a licores de la UE por encima del 10 %.' },
    { riesgo: 'Gobierno y sucesión: control familiar con voto doble, remuneración rechazada por los minoritarios y sucesión sin nombre', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: `Justifica el 10 % de descuento de conglomerado de la suma de partes (≈ ${n((SP.partes || []).reduce((s, p) => s + (p.ev || 0), 0) * 0.1 / 493.47, 0)} EUR por acción)`, mitigante: 'La familia compra (659 M EUR entre enero y marzo de 2026, a 534-546 EUR) y los cinco hijos están en el consejo o al frente de casas [C5, C1].', senal: 'Nombramiento de un director general delegado de fuera de la familia o salida de un hijo de su casa.' },
    { riesgo: 'Coste de capital: la acción tiene beta alta (1,25-1,40) y los tipos europeos están altos (Bund al 3,48 %)', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: `${pc(sWaccMas / DCF * 100 - 100)} con medio punto más de WACC (${e2(sWaccMas)} EUR)`, mitigante: 'Rating Aa3/AA- y deuda financiera neta de solo 8.245 M [A6, A4].', senal: 'Bund a 10 años por encima del 4 %.' },
    { riesgo: 'Reputación en la cadena de suministro italiana', tipo: 'ESG', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Sin efecto directo en cuentas hasta hoy; el riesgo es de marca', mitigante: 'Administraciones judiciales de Dior y Loro Piana levantadas antes de plazo, con 2.400 auditorías [C11, C12].', senal: 'Nuevo expediente en Milán contra una casa del grupo.' },
  ],
  premortem: `Octubre de 2029: LVMH vale 230 EUR. La historia empieza en el primer semestre de 2027. La recuperación del segundo trimestre de 2026 resultó ser rebote técnico: China volvió a caer con la debilidad inmobiliaria y el turista chino no regresó a Europa. En EE. UU., la subida de tipos del BCE y la Fed enfrió al cliente aspiracional, que ya había dejado de comprar en 2024. Louis Vuitton, que había subido mucho los precios desde 2021, tuvo que elegir entre volumen y margen y eligió el margen: las ventas de Moda cayeron un 4 % en 2027 y el margen del grupo bajó al 20 %, el de 2019. Las nuevas direcciones creativas de Dior y Celine gustaron a la crítica, pero no compensaron la caída del bolso de entrada. Al mismo tiempo, el euro se apreció hasta 1,30 dólares y restó otros 1.500 M al resultado. El mercado dejó de ver a LVMH como un compuesto de calidad y la pasó a cotizar como un cíclico de consumo, a 7 veces el EBITDA. La sucesión, sin nombre, añadió un descuento. Los indicadores que lo habrían anticipado: dos trimestres seguidos de crecimiento orgánico negativo en Moda, un margen semestral por debajo del 21 % y existencias creciendo más que las ventas (+43 % frente a +32 % en 2021-2024 ya fue un aviso) [A2, A3].`,
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'Precio frente a volumen', pregunta: '¿Cuánto del crecimiento orgánico de Louis Vuitton y Dior en 2026 vino de precio y cuánto de unidades, y qué subida media de precios prevén para 2027?', por_que: 'El margen de Moda cayó del 39,9 % al 35,0 % en dos años; si el crecimiento es solo precio, la recuperación del volumen no ha empezado.' },
    { tema: 'Existencias', pregunta: '¿Qué parte de los 26.303 M de existencias brutas y de su provisión del 13,9 % corresponde a Moda y a coñac, y cuánto envejecido se destruirá en 2026-2027?', por_que: 'Las existencias crecieron más que las ventas en 2021-2024 [A2]; una depuración costaría margen y caja.' },
    { tema: 'Opción de Diageo', pregunta: '¿Hay conversaciones con Diageo sobre su 34 % de Moët Hennessy y a qué valor? ¿Por qué el compromiso bajó de 11.919 M en 2023 a 6.331 M en 2025?', por_que: 'Es un pasivo de 6.416 M en el puente [A4]; su ejercicio costaría caja o daría una referencia de valor para Vinos y Licores.' },
    { tema: 'Sucesión', pregunta: '¿Cuál es el plan de sucesión del PDG y qué papel tendrá la sociedad de los cinco hijos que controla Agache?', por_que: 'Con el límite de edad en 85 años, Bernard Arnault puede seguir hasta 2034 sin un sucesor nombrado [C1, C9].' },
    { tema: 'Remuneración', pregunta: '¿Piensa el consejo introducir ROIC o rentabilidad para el accionista en las acciones de rendimiento, tras el rechazo del 76 % de los votos libres?', por_que: 'Hoy basta con que mejore uno de tres indicadores [C1]; el ROIC ha caído del 20 % al 12,7 %.' },
    { tema: 'Tiffany', pregunta: '¿Cuál es el margen de Tiffany y cuándo recuperará el 19-20 % que tenía Relojería y Joyería antes de la compra?', por_que: 'Se pagó 3,8 veces ventas y el grupo pasó del 19,8 % al 14,4 % de margen sin deterioros [A2, D20].' },
    { tema: 'Capex', pregunta: '¿Qué parte de las inversiones operativas de 2023-2025 (17.576 M) fue en inmuebles comerciales y cuál es el capex de mantenimiento?', por_que: 'El capex excluidas las altas de derechos de uso bajó del 8,7 % al 5,7 % de las ventas; saber cuál es el normal cambia el DCF.' },
  ],
  confianza: 'Media',
};

export const secciones = { rentabilidad, suma_partes: { ...suma_partes, comentario: SP.valor_accion != null || SPV != null ? SPtxt() : null }, catalizadores, riesgos, preguntas };

// ---------- DCF ----------
export const etapa2_justificacion = null;
export const dcf_justificacion = {
  crecimiento: `Modelamos cada grupo de negocio. 2026e cae un ${n(-f26.g_ing, 1)} %: el primer semestre bajó un 3 % (+2 % orgánico, −5 puntos de divisa, −1 de perímetro) [A5] y el segundo suma la salida de DFS en Gran China, Los Ángeles, San Francisco y Okinawa. 2027e crece un ${n(f27.g_ing, 1)} % (Distribución Selectiva aún −1 % por DFS) y 2028e-2030e entre el 5 % y el 5,5 %, en la banda del 4-6 % anual que Bain prevé para el lujo hasta 2035 [B7] y por debajo del 5,9 % anual de LVMH en 2021-2025. Después converge al 3 % en 2035e. Nuestras ventas quedan un 3-4 % por debajo del consenso en 2026e-2028e porque descontamos la salida de DFS y la divisa [D4]; el resultado operativo recurrente, solo un 1-2 % por debajo.`,
  margenes: `El margen EBITDA (NIIF 16, sin otros gastos operativos) sube del 30,0 % de 2025 al ${n(filas[4].margen, 1)} % en 2030e, con un margen operativo recurrente del ${n(filas[4].margen_pro, 1)} %: a medio camino entre el 22,0 % de 2025 y el 26,5 % del pico de 2021-2023 [A2], y por encima del 21 % de 2017-2019. Por grupos: Moda vuelve al 35,8 % (35,0 % en 2025, 39,9 % en 2023), Relojería y Joyería al 17 % (14,4 % en 2025, 19,8 % en 2023) y Vinos y Licores al 24 % (19,0 % en 2025, 31,9 % en 2023) [A2]. Restamos un 0,2 % de las ventas por reestructuraciones recurrentes en caja. No proyectamos la vuelta al pico: el margen de 2021-2023 se apoyó en subidas de precio que el cliente aspiracional ya ha rechazado.`,
  inversion: `Con los arrendamientos en la deuda, el capex incluye las inversiones operativas y las altas de derechos de uso. Las inversiones operativas fueron el 8,7 % de las ventas en 2023 (con compras de inmuebles en París), el 6,5 % en 2024, el 5,7 % en 2025 y el 5,3 % en el 1S26; las altas de derechos de uso, entre 3.500 y 4.600 M al año, un 4,3-5,3 % de las ventas [A2, A4]. Proyectamos un capex total del 9,4 % en 2026e, del 10 % en 2029e-2030e y del 9,2 % en 2035e, frente a unas amortizaciones del 8,2-8,5 % (incluidos los derechos de uso, 3.091 M en 2025) [A2]. El circulante se mantiene en el 23,5 % de las ventas (23,2 % en 2024-2025). El tipo impositivo es del 30 % en 2026e (el 1S26 lleva el recargo francés) y del 26 % a largo plazo (26,2 % en 2021 y 2023) [A2, A4].`,
  wacc: `WACC del ${n(WACC, 2)} %. Tasa libre: el Bund a 10 años, 3,48 % el 20-oct-26 (Bundesbank) [D10]; no añadimos prima país, porque LVMH vende el 92 % fuera de Francia y en mercados desarrollados en su mayoría. Beta de 1,25: la ajustada mensual a cinco años frente al Stoxx Europe 600 (1,25; 1,27 frente al MSCI Europe). Frente al CAC 40 sale 1,40 y frente al Euro Stoxx 50 1,28, pero LVMH pesa cerca del 10 % en esos índices; frente a los ETF de lujo, 0,98-1,14, también sesgada porque LVMH es su mayor valor [D1]. Prima de mercado del 5,5 %: coste de los fondos propios del ${n(KE, 2)} %. Coste de la deuda del 4,0 % antes de impuestos (estimación propia: el Bund más el diferencial de un emisor Aa3/AA-) [A6], y un 16 % de deuda (bonos, pagarés y arrendamientos) sobre el valor de mercado.`,
  terminal: `Crecimiento a perpetuidad del 2,5 %: inflación de la zona euro del 2 % más medio punto real, por debajo del Bund menos medio punto (3,07 %). Equivale a ${n(g('dcf.multiplo_implicito'), 1)} veces el EBITDA de salida, por debajo de las 8,5 veces a las que cotiza hoy el grupo y de las 13-18 de 2021-2025 (cierre de cada año): el valor terminal no descuenta una vuelta a los múltiplos históricos. El valor terminal pesa un ${VT} % del valor. No usamos un DCF de tres etapas: el ROIC de 2025 (12,7 %) supera al WACC en menos de 5 puntos.`,
};

const dcfLectura = () => `El DCF da ${e2(DCF)} EUR por acción, ${pc(g('dcf.potencial_pct'))} frente al precio, con un WACC del ${n(WACC, 2)} % y un ${VT} % del valor en el terminal. El DCF inverso dice que el precio de 386,75 EUR descuenta un crecimiento anual del ${n(INV.crecimiento_implicito_pct, 1)} % en 2027e-2035e con nuestros márgenes, frente al ${n(INV.crecimiento_base_pct, 1)} % de nuestro caso base, o un margen EBITDA final del ${n(INV.margen_implicito_pct, 1)} % frente a nuestro ${n(INV.margen_base_pct, 1)} %. La rentabilidad anual implícita en el precio es del ${n(INV.rentabilidad_implicita_pct, 1)} %. Leído así, el mercado no exige nada extraordinario: un crecimiento algo inferior al del 2021-2025 (5,9 %) y al previsto para el lujo (4-6 %), y un margen operativo recurrente de unos 24 puntos, por debajo del 26,5 % de 2021-2023. Tampoco regala nada: con nuestro coste de capital (beta 1,25 y prima del 5,5 %) LVMH vale lo que cotiza. La diferencia está en la tasa: con la prima implícita del mercado (4,2 %) el WACC baja al ${n(REL.wacc, 2)} % y el DCF sube a ${e2(REL.dcf)} EUR. El precio ofrece un ${n(INV.rentabilidad_implicita_pct, 1)} % anual a quien crea en el caso base, más de lo que hoy pide el mercado a un valor de su beta.`;

export const narrativas = {
  Bajista: 'Repetición de 2024-2025: China y el cliente aspiracional de EE. UU. vuelven a caer en 2027 (ventas −4 %, margen 3,5 puntos menor, como en 2024) y la recuperación posterior es lenta, con un crecimiento 1,5 puntos inferior y un margen 2 puntos por debajo del caso base en todos los años: el margen operativo recurrente se queda en el 21-22 %, el de 2017-2019 y 2025.',
  Base: 'El lujo crece un 4-6 % anual desde 2027, Moda recupera volumen con la renovación creativa sin nuevas subidas agresivas de precio, Vinos y Licores sale del fondo y Tiffany mejora margen. El margen operativo recurrente sube al 23,8 % en 2030e, entre el de 2025 y el pico de 2021-2023.',
  Alcista: 'Recuperación como la de 2021-2023 pero más suave: China y Japón vuelven al crecimiento de dos dígitos, Dior y Celine ganan cuota y el margen operativo recurrente se acerca al 25,5 %, aún por debajo del pico del 26,5 %. Crecimiento 1,5 puntos superior y terminal del 3 %.',
};
const escTxt = () => `La asimetría con nuestro coste de capital es de ${n(ASIM, 2)} veces: el alcista gana un ${n(esc('Alcista').potencial_pct, 1)} % (${e2(esc('Alcista').valor)} EUR) y el bajista pierde un ${n(-esc('Bajista').potencial_pct, 1)} % (${e2(esc('Bajista').valor)} EUR). No compensa por sí sola: el bajista es verosímil porque ya ocurrió en 2024-2025, cuando el margen cayó 4,5 puntos en dos años [A2]. Con la prima implícita del mercado la asimetría pasa a ${n(REL.asimetria, 2)} veces (alcista ${e2(REL.alcista)} EUR, bajista ${e2(REL.bajista)} EUR): el bajista queda por debajo del precio, pero mucho menos, porque una tasa de descuento menor pesa más sobre el valor terminal. Ponderamos un 25 % cada extremo.`;

const valoracionComentario = () => `El DCF pesa un 40 %: LVMH tiene historia larga, márgenes publicados por grupo y un balance sencillo, así que es el método más controlable. La suma de partes pesa un 25 %, porque sus cinco grupos tienen comparables distintos y permite ver qué paga el mercado por Moda. Los comparables pesan solo un 15 %: la muestra es frágil (la mediana del EV/EBITDA va de 9,3 a 12,8 veces según qué empresa se quite) y Hermès o Cucinelli no son el mismo negocio. Los escenarios, un 20 %, recogen la asimetría. Las transacciones no pesan: llevan prima de control y LVMH no es comprable. La dispersión es grande: DCF ${e2(DCF)} EUR, escenarios ${e2(g('valor_ponderado'))} EUR, suma de partes ${e2(SPV)} EUR y comparables ${e2(g('sintesis.tabla')?.find((x) => /Comparables/.test(x.metodo))?.valor)} EUR. Los métodos de mercado (comparables, múltiplos históricos y transacciones) dan más que los de flujos: LVMH cotiza a ${n(CL.ev_ebitda_ltm, 1)} veces el EBITDA de los últimos 12 meses, en mínimo de cinco años (${n(mhE.minimo, 1)}-${n(mhE.maximo, 1)} veces a cierre de 2021-2025). El valor objetivo, ${e2(VO)} EUR, se apoya en los flujos.`;

// ---------- Resumen ----------
const resumen = () => ({
  recomendacion: 'Comprar',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis: [
    `**La recomendación y por qué.** Comprar, con convicción baja. A 386,75 EUR (cierre del 20-oct), el objetivo a 12 meses con nuestra regla de múltiplos es de ${e2(O12)} EUR: +${n(O12R, 1)} % ponderado y +${n(O12B, 1)} % en el base, con dividendo; con la regla de control (v2), +16,1 %, y con un BPA un 10 % más bajo, +15,6 %: aguanta. El valor intrínseco es de ${e2(VO)} EUR (${pc(POT)}). Pagamos 16,7 veces nuestro BPA de 2027e, frente a una mediana de 25,9 veces en cinco años, y ya descontamos que Moda no vuelva a crecer hasta 2028. La convicción es baja porque, con nuestro WACC (${n(WACC, 1)} %), el DCF (${e2(DCF)}) queda por debajo del precio, porque el ROIC (12,7 %) solo supera al WACC en 3,5 puntos y porque Moda puede seguir cayendo; subiría si el 4T26 devuelve a Moda al crecimiento y bajaría si vuelve a caer. Límite robusto (con la excepción de calidad del 20-oct): 385,40 EUR; nivel B1 hasta 400,54.`,
    `**Qué ha cambiado con el 3T26 (12-oct).** Ventas de 18.504 M (+1 % orgánico, frente al +3 % del 2T) y 57.148 M en nueve meses (−2 % publicado, +2 % orgánico) [A11]. Moda y Marroquinería cae un 5 % orgánico en el trimestre, frente al −2 % que esperaba el mercado, por China: Asia sin Japón −5 % y la clientela china de Moda en torno a −15 %, con EE. UU. +5 %, Japón +6 % y Europa +4 % [A13, B21]. Relojería y Joyería (+6 %), Distribución Selectiva (+8 %) y Vinos (+6 %) compensan [A11]. Retrasamos un año la vuelta de Moda (2027e plano, margen del 34,0 %): el BPA base de 2028e baja de 26,66 a 25,26 EUR. LVMH recompra a buen ritmo (844 M desde julio) y el consenso apenas recorta el BPA (−2 % en 2028e) pero sí el objetivo medio, de 526,49 a 498,36 EUR [D4].`,
    `**El negocio.** El mayor grupo de lujo del mundo, con 80.807 M de ventas en 2025 y el 47 % en Moda y Marroquinería, que gana un 35 % de margen [A2]. El ROIC ha bajado del 20,1 % de 2022 al 12,7 %, 3,5 puntos por encima del WACC: crea valor, pero menos que antes. Hotis la trata como excepción de calidad (20-oct). La prueba de sostenibilidad da «Sí»: el crecimiento proyectado (≈ 4 %) está por debajo de su historia y del sector.`,
    `**Finanzas.** El margen operativo recurrente bajó del 26,5 % de 2023 al 22,0 % de 2025 [A2]. La caja aguanta: 11.333 M de flujo libre operativo en 2025 tras arrendamientos y una deuda financiera neta de 8.245 M a junio; con arrendamientos y el compromiso con Diageo, 1,0 veces el EBITDA [A4].`,
    `**Equipo y gobierno.** Resta. La familia Arnault controla el 66,39 % de los votos con voto doble y el 50,21 % del capital [C6, C17]; el 76 % de los votos libres rechazó en 2026 la remuneración del PDG (estimación propia) [C2]. A favor: la familia compró 659 M EUR de acciones entre enero y marzo de 2026, a 534-546 EUR [C5].`,
    `**Valoración.** El DCF da ${e2(DCF)} EUR; la suma de partes, ${e2(SPV)} EUR; los comparables, más. El precio descuenta un crecimiento del ${n(INV.crecimiento_implicito_pct, 1)} % anual en 2027e-2035e frente al ${n(INV.crecimiento_base_pct, 1)} % de nuestro base. Cotiza a ${n(CL.ev_ebitda_ltm, 1)} veces el EBITDA y ${n(CL.per_ltm, 1)} el beneficio de los últimos 12 meses, mínimos de cinco años.`,
    `**Riesgos y catalizadores.** China (bajista: ${e2(esc('Bajista').valor)} EUR), fatiga de precios en Moda (2 puntos menos de margen: ${e2(sMargMenos2)} EUR) y coste de capital (medio punto más de WACC: ${e2(sWaccMas)} EUR). La acción está en mínimos de 52 semanas, un 20 % por debajo de su media de 200 sesiones, y Francia añade ruido (disturbios del 17-19-oct, diferencial con el Bund en máximos desde 2012) [E]. Catalizadores: ventas de Hermès (22-oct) y Kering, y resultados de 2026 a finales de enero.`,
    `**Qué cambiaría la decisión.** Compra robusta por debajo de 385,40 EUR (nivel B1 hasta 400,54); venta por encima de ${e2(NIVV)} EUR. Pasaríamos a Mantener si Moda vuelve a dar crecimiento orgánico negativo en el 4T26 o si el margen semestral baja del 21 %.`,
  ].join('\n\n'),
  tesis: [
    `LVMH es el mayor grupo de lujo del mundo: 80.807 M EUR de ventas en 2025, 17.755 M de resultado operativo recurrente y 11.333 M de flujo libre operativo después de arrendamientos [A2]. Su núcleo, Louis Vuitton y Dior, gana un 35 % de margen; Sephora, Tiffany, Bvlgari, Moët y Hennessy diversifican. El ROIC (12,7 %) supera aún al coste de capital, aunque ha perdido 7 puntos desde 2022.`,
    `El precio de 386,75 EUR descuenta un crecimiento del ${n(INV.crecimiento_implicito_pct, 1)} % anual en 2027e-2035e con un margen EBITDA del 32 %, o una rentabilidad del ${n(INV.rentabilidad_implicita_pct, 1)} % anual con nuestro caso base. Cotiza a ${n(CL.ev_ebitda_ntm, 1)} veces el EBITDA de los próximos 12 meses y ${n(CL.per_ntm, 1)} veces el beneficio, frente a 13-18 y 24-30 veces a cierre de 2021-2025.`,
    `El mercado ha pasado de pagar a LVMH como un compuesto de calidad a cotizarlo como un cíclico de consumo. Para invertir hay que creer que el margen operativo recurrente se estabiliza en el 22-24 % y que las ventas vuelven a crecer un 4-5 %, lo que el 2T26 empieza a mostrar [A5]. No hay que creer en una vuelta al pico de 2021-2023. Lo que no tenemos es una visión distinta del consenso sobre el negocio: la oportunidad es de precio y de tasa de descuento.`,
  ].join('\n\n'),
  vision_diferencial: {
    mercado_descuenta: `Un crecimiento del ${n(INV.crecimiento_implicito_pct, 1)} % anual y un margen en torno al actual, con una prima de riesgo alta para un valor Aa3/AA-: la beta a cinco años frente a los índices europeos amplios es de 1,25-1,40 [D1].`,
    nuestra_vision: `Coincidimos con el consenso en las cifras (nuestro resultado operativo recurrente queda un 1-2 % por debajo en 2026e-2028e) [D4]. Discrepamos en el riesgo: a 8,5 veces el EBITDA, el precio ya recoge un ciclo malo y deja un ${n(INV.rentabilidad_implicita_pct, 1)} % anual.`,
    por_que: 'La familia de control compró 659 M EUR a 534-546 EUR en 2026 [C5], el balance tiene una deuda financiera neta de 0,3 veces el EBITDA y el flujo libre cubre 1,75 veces el dividendo. Pero no tenemos un catalizador propio con fecha: por eso la convicción es baja.',
  },
  a_favor: [
    `**Múltiplos en mínimos de cinco años**: ${n(CL.ev_ebitda_ltm, 1)} veces el EBITDA y ${n(CL.per_ltm, 1)} el beneficio de los últimos 12 meses, frente a 13-18 y 24-30 veces en 2021-2025.`,
    '**Vuelta al crecimiento orgánico**: +2 % en el 1S26 y +3 % en el 2T, con EE. UU. al +6 % y Japón al +14 % [A5].',
    '**Caja abundante**: 11.333 M de flujo libre operativo en 2025, 1,75 veces el dividendo, y 3.299 M de recompras en 18 meses [A2, A4].',
    '**La familia compra**: 659 M EUR en el mercado entre enero y marzo de 2026, a 534-546 EUR por acción [C5].',
    '**Balance de calidad**: Aa3/AA-, con una deuda financiera neta de 8.245 M y una ratio de endeudamiento del 11,8 % [A4, A6].',
  ],
  en_contra: [
    '**Margen en caída**: el operativo recurrente pasó del 26,5 % (2023) al 22,0 % (2025) y Moda del 39,9 % al 35,0 % [A2].',
    `**ROIC en descenso**: del 20,1 % en 2022 al 12,7 % en 2025, con un ROIC incremental negativo en 2021-2025.`,
    '**Gobierno**: voto doble, el 76 % de los votos libres contra la remuneración del PDG y sucesión sin nombre [C1, C2].',
    '**Divisa y aranceles**: la divisa restó 1.065 M al resultado de 2025 y Hennessy perdió seis puntos de cuota en coñac [A2, B1].',
    `**Sin margen de seguridad con nuestro WACC**: el DCF (${e2(DCF)} EUR) está al nivel del precio.`,
  ],
  que_vigilar: 'La tesis depende de que Moda y Marroquinería vuelva a crecer en 2028 sin perder más margen. El 3T26 ya dio −5 % orgánico: la señal de alarma se cumple entera si el 4T26 (finales de enero) vuelve a dar Moda negativa, o si el margen operativo recurrente semestral baja del 21 %. También el euro: por encima de 1,25 dólares, la divisa volvería a restar más de 1.000 M al resultado.',
  cambiaria_recomendacion: [
    `Si la cotización supera ${e2(NIV)} EUR sin mejora de las estimaciones, pasaríamos a Mantener.`,
    `Si supera ${e2(NIVV)} EUR, pasaríamos a Vender.`,
    'Si el crecimiento orgánico de Moda y Marroquinería vuelve a ser negativo en el 4T26 (el 3T26 dio −5 %), pasaríamos a Mantener.',
    'Si el margen operativo recurrente del 2S26 o del 1S27 baja del 21 %, pasaríamos a Mantener.',
    'Si el Bund a 10 años supera el 4 %, revisaríamos el valor (medio punto más de WACC resta un 8 %).',
  ],
  kpis_seguimiento: [
    { kpi: 'Crecimiento orgánico de Moda y Marroquinería', nivel_actual: '−5 % en el 3T26; −2 % en nueve meses', umbral_alerta: 'Negativo dos trimestres seguidos', por_que: 'Es el 47 % de las ventas y el 75 % del resultado.' },
    { kpi: 'Margen operativo recurrente del grupo', nivel_actual: '22,5 % en el 1S26; 22,0 % en 2025', umbral_alerta: 'Por debajo del 21 %', por_que: 'El caso base proyecta una subida al 23,8 % en 2030e.' },
    { kpi: 'Crecimiento orgánico en Asia sin Japón', nivel_actual: '−5 % en el 3T26 (prensa)', umbral_alerta: 'Negativo otra vez en el 4T26', por_que: 'Es el 29 % de las ventas y origen de la caída de 2024-2025.' },
    { kpi: 'EUR/USD', nivel_actual: 'Divisa −5 puntos sobre ventas en el 1S26', umbral_alerta: 'Por encima de 1,25', por_que: 'El 28 % de las ventas se factura en dólares.' },
    { kpi: 'Existencias sobre ventas', nivel_actual: 'Rotación de 303 días en 2025', umbral_alerta: 'Por encima de 320 días', por_que: 'Indicaría que se produce más de lo que se vende.' },
  ],
  confianza: 'Media',
});

export const resumenFn = resumen;
export const dcf_lectura = DCF != null ? dcfLectura() : null;
export const escenarios_comentario = ASIM != null ? escTxt() : null;
export const valoracion_comentario = VO != null ? valoracionComentario() : null;
export { resumen as _resumen };
export const resumenObj = VO != null ? resumen() : null;

// Calidad y capital: el texto de A con sus citas en forma [A n] más nuestra lectura.
const A = JSON.parse(readFileSync(join(DIR, 'A.json'), 'utf8'));
const conLetra = (t, L) => (t || '').replace(/\[(\d+(?:\s*[-,]\s*\d+)*)\]/g, (s, grupo) => '[' + grupo.split(/\s*,\s*/).map((x) => x.split(/\s*-\s*/).map((y) => L + y).join('-')).join(', ') + ']');
const cal = g('calidad') || {};
parches.push({ ruta: 'calidad.comentario', valor: conLetra(A.calidad.comentario, 'A') + `\n\nLos tres indicadores no muestran alertas. El Altman Z de 2025 es ${n(cal.altman_z, 2)} (zona segura), el Piotroski F es ${cal.piotroski_f} sobre 9 (fallan la mejora del ROA y del margen bruto, coherente con el ciclo) y el Beneish M es ${n(cal.beneish_m, 2)}, lejos del umbral de manipulación (−1,78), aunque el motor lo marca como poco fiable en un grupo con tanto intangible. Lo que sí pide atención son tres cosas: las existencias (303 días de rotación y una provisión del 13,9 %), la política propia de llevar los cambios de valor de la opción de Diageo a fondo de comercio y no a resultados, y que el resultado financiero de 2025 incluya 835 M de revalorización de participaciones [A2].` });
parches.push({ ruta: 'capital.comentario', valor: conLetra(A.capital.comentario, 'A') + `\n\nVeredicto: buena asignadora en dividendos y balance, mediocre en compras recientes. En 2021-2025 devolvió 34.468 M a los accionistas (dividendos y recompras), el 64 % de un flujo libre acumulado de 53.559 M, y la deuda financiera neta cayó a 8.245 M [A2, A4]. Pero el ROIC incremental del periodo es negativo: Tiffany se pagó 3,8 veces las ventas y Relojería y Joyería ha perdido 5,4 puntos de margen desde entonces, sin deterioro registrado [A2, D20]. Las recompras de 2025-2026 (3.299 M) se hicieron a precios muy superiores a los de hoy. La rotación de cartera (DFS, Off-White, Marc Jacobs) es sensata y libera capital de negocios de bajo margen.` });
for (const [k, v] of Object.entries({ sector: 'Consumo discrecional', industria: 'Textil, confección y bienes de lujo', pais: 'Francia', pais_iso: 'FR', sede: 'París', fundacion: '1987', empleados: 213932, web: 'www.lvmh.com', free_float_pct: 49.24 })) parches.push({ ruta: 'identificacion.' + k, valor: v });

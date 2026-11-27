// Textos del analista (Krones, corte 2026-11-27). Citas: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// Fuentes nuevas de esta iteración: A16 informe 9M26, A17 presentación 3T26, A18 entrevista Börsen-Zeitung;
// D29 Yahoo históricos, D30 Yahoo quoteSummary, D31 Stock Analysis, D32 recortes de objetivo, D33 RTTNews,
// D34 Bund, D35 BCE, D36 Damodaran nov-26, D37 9M26, D38 hecho relevante 22-oct, D39 Börsen-Zeitung 22-oct,
// D40 MarketScreener 22-oct, D41 entrevista; C17 operaciones de directivos, C18 9M26, C19 hecho relevante.
// Las cifras del motor se copian tal cual de calc tras el último cálculo.
import { resumen as resumenTxt } from './resumen.mjs';

export const resumen = resumenTxt;

export const limitaciones = `Una sola línea cotizada (Xetra, KRN), en euros como las cuentas. Fecha de corte 27-nov-2026; el precio es el cierre del 26-nov (103,40 EUR), porque la sesión del 27 no había cerrado [D29]. Rentabilidades, beta y volatilidad llegan al 26-nov [D29]; el bloque de movimiento usa la toma del 27-nov a media sesión (105,20 EUR). La cuenta se presenta por naturaleza [A1]. Los tres segmentos se publican desde 2021 [A1]. Esta iteración parte del informe del 9-oct-2026 para las cuentas anuales auditadas (2018-2025), la historia, el sector, la competencia y el consejo, que no cambian, y rehace con los documentos del 3T26 el trimestre, los últimos doce meses, el puente, la guía, el consenso, la bolsa, el WACC y los comparables. El puente es del 30-sep-2026; los arrendamientos (159,0 M) son una estimación propia, porque el trimestral los agrupa con otros pasivos financieros [A16]. Krones no publica el peso del servicio. No hemos tenido la transcripción del turno de preguntas del 6-nov (de pago), solo la presentación y una entrevista al primer ejecutivo [A17, A18]. El consenso de 2026e-2027e es de Yahoo (10 analistas, posterior al aviso); el de 2028e de MarketScreener es anterior al aviso y no se usa para decidir [D30, D40].`;

export const controles_explicados = [
  { control: 'Regresión múltiplo-crecimiento', explicacion: 'Los comparables cotizan por margen y calidad, no por crecimiento. No se usa el valor de la regresión.' },
];

export const huecos_resueltos = [];

const rentabilidad = {
  comentario: `**Krones crea valor desde 2022, y con holgura.** El ROIC después de impuestos pasó del 1,8 % de 2020 al 11,1 % en 2021, al 16,6 % en 2022 y al 17,6 % en 2025, el doble del WACC del 8,85 %. En 2019-2020 no cubría su coste de capital: el margen EBITDA había caído al 6,6 % y el circulante se comía el 24-25 % de las ventas [A1, A7]. Lo que ha movido el ROIC es el margen, no la rotación: los ingresos por euro de capital invertido se quedan en 1,1-1,2 veces, mientras el margen EBIT pasa del 0,9 % de 2020 al 7,4 % de 2025. El ROIC incremental de 2018-2025 es del 31,7 %, porque el circulante bajó del 22,9 % al 15,9 % de las ventas [A1]. **La señal nueva va en contra**: el ROCE de la empresa baja al 17,6 % a 30-sep-2026 (19,5 % un año antes) porque el circulante medio sube al 18,9 % de las ventas con proveedores a la baja y existencias de seguridad, mientras el beneficio operativo sube [A16, A17]. KHS, su rival más directo, gana un margen EBIT del 6,1 % [B10]. La duda no es si crea valor, sino si el 17-18 % aguanta un año malo: en 2020 bajó al 1,8 %.`,
  confianza: 'Media',
};

const comparables_comentario = `Krones cotiza a 5,1 veces el EBITDA de los últimos doce meses y a 10,0 veces el BPA de los próximos doce, frente a unas medianas de 12,2 y 17,5 veces de los siete comparables rehechos con Yahoo el 27-nov [D30]. Buena parte del descuento está justificada: su margen EBITDA (11,0 % en los últimos doce meses) queda por debajo de todos salvo Bucher (8,6 %), cuya mediana de grupo es del 16,4 %, y su crecimiento esperado para 2027 (+3,0 % de consenso) está por debajo de la mediana (6,1 %) [D30]. Bucher, con menos margen y un ciclo agrícola a la baja, cotiza a 17,3 veces el beneficio, y JBT Marel, con deuda, a 13,2. El PER de los comparables da 180,85 EUR, pero pesa solo un 10 % en el valor: ninguno vende líneas de embotellado con un 25 % de cuota y ciclos de pedido de 30 semanas. Para el objetivo a 12 meses, la mediana del PER (17,5x) solo entra en el techo del alcista, que la regla limita a 15,7x.`;

export const secciones = { rentabilidad, comparables: { comentario: comparables_comentario } };
export { comparables_comentario };

export const dcf_justificacion = {
  crecimiento: `2026e queda fijado: +0,6 % reportado (5.698 M). La guía rebajada del 22-oct es del 1-2 % sin divisas; los nueve meses dan +0,8 % sin divisas y −0,2 % reportado, con unos 40 M de efecto divisa y 20 M de ventas menos por la devolución de aranceles [A16, D38]; el consenso espera 5.703 M [D30]. Para 2027e proyectamos +2,0 %, el «crecimiento ligero» del primer ejecutivo, frente al +3,0 % del consenso [A18, D30]; para 2028e, +3,5 %, que deja las ventas en 6.015 M, en el suelo del objetivo nuevo de 6.000-6.200 M [A16]. Después bajamos del 3,5 % al 2,5 %. Los pedidos de nueve meses suben un 2,9 % y la cartera es de 4.314 M, pero parte se factura a finales de 2027 o después [A16, A17]. El mercado de bebidas envasadas crece un 2,6 % anual y el PET un 4,8 % [B1].`,
  margenes: `El margen EBITDA del 11,0 % en 2026e cuadra con los nueve meses (11,1 % publicado, 10,8 % sin los 10 M de aranceles devueltos) y con un cuarto trimestre como el de 2025 (11,0 %) [A16, A1]; está en la parte alta de la guía (10,7-11,1 %). En 2027e lo dejamos plano en el 11,0 %: con ventas que crecen un 2 % y salarios por convenio (+3,9 % de gasto de personal en nueve meses), la mejora de compras (materiales del 45,3 % de la producción frente al 47,7 %) no se repite entera [A16]. Sube al 11,3 % en 2028e, en la parte baja del objetivo nuevo (11-12 %), y desde 2030e baja hasta el 10,5 %, nuestro margen de ciclo completo, por encima de la media de 2016-2025 (8,4 %) pero lejos del pico [A1]. El precio descuenta un margen del 9,3 %.`,
  inversion: `Con NIIF 16 el capex incluye las altas de derechos de uso: 4,7 % de las ventas en 2026e (3,7 % en inmovilizado e intangibles en nueve meses, por India, China y EE. UU., más arrendamientos nuevos) [A16], frente al 4,3 % de 2025 [A1]. Baja al 3,9 % desde 2031e, por encima de una amortización del 3,6 %. El circulante comercial, con activos y pasivos por contrato, sube al 17,5 % de las ventas (17,0 % en el informe anterior): la media de cuatro trimestres es del 18,9 % a 30-sep-2026 y el 15,9 % del cierre de 2025 era estacional [A16, A1]. Impuestos del 29,5 % (28,9 % en nueve meses) [A16].`,
  wacc: `Tasa libre del 3,32 %: el Bund a 10 años del 26-nov-2026 de la curva del Bundesbank [D34] (3,57 % en el informe anterior). **Beta de 1,10**, la del informe anterior: media de las betas ajustadas de cinco años frente al DAX (1,05) y al STOXX Europe 600 (1,15) [D3]; la de bolsa.mjs frente al ETF del MDAX sale en 0,76 porque ese índice está lleno de cíclicas alemanas que caen con Krones, y el inversor marginal (el 42 % que no está en manos de las familias) tiene una cartera europea [D29]. Prima del 5,5 %, sin prima adicional: el 48,5 % de las ventas va a emergentes, pero repartido [A16]. Coste de la deuda del 4,0 % antes de impuestos con un peso del 8 % (arrendamientos y pensiones; no hay deuda bancaria). WACC del 8,85 %.`,
  terminal: `Gordon con un crecimiento del 2,25 %: inflación del euro del 2 % y algo de crecimiento real por los emergentes y el PET, por debajo del techo de coherencia (Bund menos medio punto, 2,82 %). El valor terminal pesa el 55 % del valor empresa. No usamos la etapa de transición aunque el ROIC (17,6 %) supera al WACC en más de cinco puntos: el mercado de Krones crece un 2,6-4,8 % al año y la empresa ya tiene un 25 % de cuota en llenado [B1, B5].`,
};

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0.5, precio_pct: 1.0, otros_pct: -0.9, comentario: 'Guía del 1-2 % sin divisas; nueve meses +0,8 % sin divisas, unos 40 M de efecto divisa y 20 M menos de ventas por aranceles devueltos (−0,9 puntos en «otros»). Precios de máquinas «estables» según la empresa: el reparto volumen/precio es estimación propia [A16].' },
    { periodo: '2027e', volumen_pct: 1.0, precio_pct: 1.0, otros_pct: 0, comentario: '«Crecimiento ligero» del primer ejecutivo; pedidos de nueve meses +2,9 % y cartera de 4.314 M, parte facturable a finales de 2027 [A16, A18].' },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: 1.5, otros_pct: 0, comentario: 'Suelo del objetivo de 6.000-6.200 M; consumo de bebidas envasadas +2,6 % y PET +4,8 % anual [A16, B1].' },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 1.5, otros_pct: 0, comentario: 'Ritmo del mercado, sin compras [B1].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí: proyectamos un 2,6 % anual, por debajo del 5,7 % histórico y en línea con su mercado (maquinaria +3 %, bebidas envasadas +2,6 %, PET +4,8 %) y con el objetivo rebajado de la empresa (un 3 % anual hasta 2028) [A16, B1]. Foso estrecho pero real: escala, base instalada y servicio, con un 25 % del llenado [B5]. Poder de precios: el margen siguió subiendo en 2026 con precios estables y ventas planas (11,1 % en nueve meses) [A16]. La reinversión prevista (21 % del beneficio operativo después de impuestos) financia un 3,7 % al ROIC del 17,6 % y pide al capital nuevo un 8,9 %, frente a un 31,7 % histórico. La cuota no sube: el segmento de llenado al ritmo del grupo seguiría en torno al 25 % de un mercado que crece un 3 % (cálculo a mano: la cuota publicada es solo de ese segmento). El riesgo es el ciclo, y lo recoge el bajista.',
};

export const dcf_lectura = `El DCF da **127,50 EUR por acción**, un 23,3 % sobre el cierre de 103,40 EUR, con un valor terminal que pesa el 55 % y un WACC del 8,85 %. Casi no cambia frente al 9-oct (127,88 EUR): el recorte de crecimiento de 2026-2028 (unos 190 M menos de ventas en 2028e) lo compensa un Bund 25 puntos básicos más bajo. El DCF inverso es la pregunta central: **al precio actual, el mercado descuenta que las ventas caigan un 4,1 % al año entre 2027e y 2035e, o un margen EBITDA del 9,3 %** en vez del 10,5 % de nuestro caso base, con una rentabilidad implícita del 10,5 % frente a un WACC del 8,85 %. Es conservador frente a la historia reciente (margen del 10,6 % en 2025 y del 11,1 % en nueve meses de 2026) y frente a la propia empresa, que acaba de rebajar el crecimiento pero no el margen [A16]. Pero no es absurdo para una cíclica: el margen medio de 2016-2025 es del 8,4 %. El valor intrínseco no es el problema; lo es el plazo: sin un catalizador, el PER no vuelve a su mediana en un año.`;

export const narrativas = {
  Bajista: 'Se repite 2019-2020 un año después del aviso: con Oriente Medio encareciendo el PET, el vidrio y la energía, los embotelladores congelan la inversión, los pedidos caen como en 2020 y las ventas de 2027 bajan un 13 % con un margen EBITDA del 7,0 %. 2028 sale casi plano con un 8,3 % y, después, la competencia china y la de KHS dejan el margen en torno al 9 %, la media de 2016-2025.',
  Base: 'Las ventas crecen un 2 % en 2027 y un 3,5 % en 2028 hasta 6.015 M, el suelo del objetivo nuevo, con la cartera de 4.314 M cubriendo 2027; el margen se queda en el 11 % y toca el 11,3 % en 2028 antes de volver al 10,5 % de ciclo completo.',
  Alcista: 'Los clientes recuperan la inversión en 2027 con la energía más barata: las ventas suben un 4 % en 2027 y un 5,5 % en 2028 hasta unos 6.250 M, el techo del objetivo nuevo, y el margen EBITDA llega al 12 %, el máximo del rango de 2028.',
};

export const escenarios_comentario = `Con nuestro coste de capital, el alcista vale 151,90 EUR (+46,9 %) y el bajista 77,75 EUR (−24,8 %), una asimetría de 1,89 veces (2,58 el 9-oct); el valor ponderado (30/50/20) es de 117,46 EUR. La asimetría empeora porque el alcista ya no es el plan de 7.000 M, que la propia empresa ha retirado, sino el techo del objetivo nuevo. El bajista no es cosmético: suma una caída de un año como la de 2020 (ventas −16,1 %, margen del 6,2 % antes de partidas especiales) y un margen que no vuelve al 11 %. Mantenemos un 30 % de probabilidad: el aviso de octubre es la primera señal de que la inversión de los clientes se frena, aunque la cartera de 4.314 M amortigua 2027 [A16].`;

export const valoracion_comentario = `El valor intrínseco es de **128,32 EUR** (+24,1 %): DCF 45 %, escenarios ponderados 45 % y comparables 10 %, los mismos pesos del 9-oct. El DCF y los escenarios mandan porque Krones es cíclica y solo un modelo con un año malo explícito mide bien su riesgo. Los comparables pesan poco: su PER da 180,85 EUR, pero todos salvo Bucher ganan márgenes EBITDA del 13-21 % frente al 11 % de Krones. Las transacciones no pesan: son compras de negocios con más margen y la familia Kronseder (51,86 %) descarta una venta [C18]. Con la prima del mercado (4,41 %, WACC del 7,74 %) el valor sería de 149,25 EUR. La dispersión entre métodos (77,75-180,85 EUR) es grande, pero todos menos el bajista quedan por encima del precio.`;

export const diferencia_consenso = `Nuestro BPA de 2027e (9,78 EUR) queda un 5,8 % por debajo del consenso posterior al aviso (10,38 EUR) y el de 2026e (9,59) un 3,0 % por debajo (9,89) [D30]: proyectamos menos crecimiento en 2027 (+2,0 % frente a +3,0 %) y un margen plano. Para 2028e no hay consenso actualizado (el 12,01 de MarketScreener es anterior al aviso). Nuestro precio base a 12 meses (122,38 EUR) queda un 11,1 % por debajo del objetivo medio de los analistas (137,70 EUR); la diferencia es de múltiplo más que de beneficio: la regla común sube el PER de 10,6x solo hasta 11,7x, mientras los analistas suponen una vuelta hacia las 13-14 veces.`;

export const objetivo_comentario = `El valor intrínseco (128,32 EUR, +24,1 %) queda muy por encima del objetivo a 12 meses ponderado (113,16 EUR, +12,1 % con el dividendo; base +21,1 %). La distancia sale del bajista: con un 30 % de probabilidad, un año como 2020 deja el BPA de 2028e en 5,29 EUR y el precio en 49,20 EUR. Para cerrar la distancia hace falta un hecho con fecha que descarte ese año malo: una guía de 2027 con crecimiento y margen estable el 18-feb-2027, o pedidos del cuarto trimestre con una relación pedidos/ventas por encima de 1. La tesis del valor intrínseco es a más de un año.`;

export const casos12m = {
  Bajista: 'Ventas de 2027e −13 % y margen del 7,0 %; 2028e casi plano (4.932 M) con un margen del 8,3 %: BPA de 5,29 EUR, como en 2021 tras la crisis.',
  Base: 'Ventas de 6.015 M en 2028e (suelo del objetivo nuevo) con un margen del 11,3 %: BPA de 10,46 EUR, un 3,4 % anual sobre los 9,45 de 2025.',
  Alcista: 'Techo del objetivo nuevo: 6.252 M y margen del 12,0 % en 2028e: BPA de 11,85 EUR.',
};

export const suma_partes = {
  aplica: false, descuento_holding_pct: 0, partes: [],
  comentario: 'No aplica. Los tres segmentos venden a los mismos clientes (embotelladoras, cerveceras y lácteas), comparten el ciclo de inversión y tienen márgenes parecidos: EBITDA del 11,5 % en llenado y envasado, 10,7 % en Process Technology y 5,5 % en Intralogistics en los nueve meses de 2026 [A16]. Llenado y envasado es el 84 % de las ventas, así que una suma de partes repetiría el DCF del grupo.',
  confianza: 'Media',
};

export const contexto = {
  movimiento: { fecha: '2026-11-27', var_1m_pct: -7.9, var_3m_pct: -11.6, var_6m_pct: -8.0, var_12m_pct: -19.4, dist_max_52s_pct: -26.2, dist_min_52s_pct: 3.3, dist_max_historico_pct: -27.3, tendencia: 'bajista', volatilidad_60d_pct: 23.7, avisos: [] },
  movimientos_fuertes: [
    { periodo: 'feb-2026', var_pct: -7.1, causa: 'Caída del 19-feb el día de las cifras de 2025 y la guía de 2026, aunque cuadraban con lo esperado; después, el inicio de la guerra de Irán (28-feb) [A16].', veredicto: 'no cambia', condicion: null },
    { periodo: 'may-jun-2026', var_pct: -11.2, causa: 'Mayor caída de un mes en seis meses (hasta el 8-jun): Oriente Medio y rotación hacia valores de inteligencia artificial; sin noticia propia [A16].', veredicto: 'no cambia', condicion: null },
    { periodo: 'oct-nov-2026', var_pct: 9.4, causa: 'Rebote de un mes hasta el 5-nov, tras caer casi un 9 % intradía el 22-oct con la rebaja de la guía y del plan de 2028 (cerró −3 %/−4 %) [D39, D33]; la víspera de los nueve meses. Después vuelve a bajar hasta el mínimo de 52 semanas del 20-nov (101,20 EUR) [D29].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-10-22', tipo: 'resultados', hecho: 'Hecho relevante: guía de ventas de 2026 rebajada al 1-2 % sin divisas (antes 3-5 %) y objetivo de 2028 a 6.000-6.200 M (antes unos 7.000 M) con margen del 11-12 %; margen y ROCE de 2026 confirmados [D38].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-23', tipo: 'recomendación', hecho: 'Seis bancos recortan el objetivo (MPCM 173, Oddo 134, Berenberg 158, Bernstein 108, MWB 140, LBBW 120) y LBBW rebaja a mantener [D32].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-12', tipo: 'directivos', hecho: 'Schawei GmbH, vinculada a la consejera Petra Schadeberg-Herrmann, compra 5.200 acciones a 105,02 EUR (0,55 M); en enero había vendido 4.200 a 142,35 EUR [C17].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-11-06', tipo: 'resultados', hecho: 'Nueve meses: ventas −0,2 % (+0,8 % sin divisas), margen EBITDA del 11,1 % y BPA de 6,94 EUR (+2,8 %); flujo libre sin compras de −5,0 M; guía rebajada confirmada [A16].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: '2027-02-18',
  veredicto: 'no cambia',
  condicion: null,
  comentario: 'La acción pierde un 19,4 % en doce meses y está un 26,2 % bajo su máximo de 52 semanas, con tendencia bajista (un 9,1 % bajo la media de 200 sesiones). La causa está en el informe: la rebaja de la guía y del plan de 2028, la incertidumbre de Oriente Medio y la rotación hacia la inteligencia artificial, no un deterioro del margen. No hay colocaciones, ampliaciones, litigios ni ofertas pendientes; la familia Kronseder tiene el 51,86 % y no vende, y la única operación de un consejero en el año reciente es una compra. Los próximos resultados (cifras de 2026 y guía de 2027) son el 18-feb-2027 y no retrasan nada (regla 11). Fuentes: hechos relevantes de EQS, prensa alemana (Börsen-Zeitung, goldesel), operaciones de directivos y Yahoo [D29, D32, D38, C17].',
};

export const catalizadores = {
  items: [
    { fecha: '18-feb-2027', evento: 'Cifras preliminares de 2026 y guía de 2027', efecto: 'La prueba del ciclo: una guía de ventas de +2-4 % con margen del 11 % descartaría el bajista; una guía plana o con margen por debajo del 10,7 % lo acercaría [A16, A18].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '18-feb-2027', evento: 'Pedidos del cuarto trimestre de 2026', efecto: 'La empresa espera una relación pedidos/ventas «algo por encima de 1» en el año; por debajo de 0,95 en el 4T, la cartera empezaría a bajar [A17].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '19-mar-2027', evento: 'Informe anual 2026', efecto: 'Circulante y anticipos: si los pasivos por contrato siguen bajando (884 M en dic-25, 865 M en sep-26), anticipa menos pedidos [A16].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '5-may-2027', evento: 'Resultados del 1T 2027', efecto: 'Primer trimestre del año que la dirección ve de crecimiento ligero [A18].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '15-jun-2027', evento: 'Junta general 2027', efecto: 'Dividendo (2,80 EUR en 2026) y primer año completo de Thomas Ricker como primer ejecutivo [A16].', probabilidad: 'Alta', sentido: '+' },
    { fecha: '2026-2027', evento: 'Arranque de la fábrica de India y ampliación de Taicang', efecto: 'Producción local más barata para Asia; parte del capex del 3,7 % de las ventas [A16].', probabilidad: 'Alta', sentido: '+' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Caída cíclica de la inversión de embotelladoras y cerveceras', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−25 % (escenario bajista: 77,75 EUR)', mitigante: 'Cartera de 4.314 M, unos nueve meses de ventas, y servicio de ciclo de vida que cae menos [A16, B18].', senal: 'Relación pedidos/ventas por debajo de 0,95 dos trimestres seguidos o cartera por debajo de 4.000 M.' },
    { riesgo: 'Margen: vuelta a la media del ciclo anterior por precios y absorción de costes', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Un margen del 9,3 % a largo plazo es lo que descuenta el precio (103,40 EUR)', mitigante: 'Disciplina de precios, compras más baratas (material del 45,3 % de la producción) y plantas en Hungría, China e India [A16, B1].', senal: 'Margen EBITDA por debajo del 10,5 % en un semestre.' },
    { riesgo: 'Circulante: proveedores a la baja y menos anticipos', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Cada 5 puntos de circulante sobre ventas restan en torno a un 10 % del valor', mitigante: 'Caja neta de 410 M y 982 M de líneas sin disponer [A17].', senal: 'Circulante medio por encima del 19 % (18,9 % a sep-26) o pasivos por contrato por debajo de 850 M (865 M) [A16].' },
    { riesgo: 'Oriente Medio y coste de la energía y los envases de los clientes', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Causa de la rebaja de octubre; un año más de retraso es el bajista', mitigante: 'Clientes repartidos: Oriente Medio/África es un 11-12 % de las ventas [A17].', senal: 'Pedidos de Oriente Medio/África y de China a la baja otros dos trimestres.' },
    { riesgo: 'Aranceles de EE. UU.', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Bajo: en 2026 incluso hubo una devolución de unos 30 M de aranceles [A16]', mitigante: 'Fabricación en EE. UU.; Norteamérica es un 21 % de las ventas [A17].', senal: 'Aranceles específicos a la maquinaria.' },
    { riesgo: 'Competencia china en líneas de velocidad media y baja', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Un punto de margen EBITDA vale unos 20 EUR por acción', mitigante: 'Liderazgo en PET, lata y vidrio de alta velocidad y gama media propia [B1].', senal: 'Pedidos de Asia-Pacífico y China a la baja con mercados que crecen.' },
    { riesgo: 'Ejecución en Intralogistics y Process Technology', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−2 a −3 % (16 % de las ventas con margen inferior)', mitigante: 'Selección de proyectos y programa de eficiencia [A16].', senal: 'Margen de Intralogistics por debajo del 7,5 % en el año (5,5 % en nueve meses frente a una guía del 7,5-8,5 %) [A16].' },
    { riesgo: 'Gobierno: control familiar y comisión de auditoría poco independiente', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'Sin efecto directo en el valor; impide una opa', mitigante: 'Remuneración moderada; un consejero vinculado compró en octubre [C3, C17].', senal: 'Operaciones con empresas de consejeros por encima de los 30,8 M de 2025 [C1].' },
  ],
  premortem: `Noviembre de 2029: Krones vale 62 EUR, un 40 % menos. La historia empezó con la guía de febrero de 2027, que salió plana: los pedidos del cuarto trimestre de 2026 cayeron en Oriente Medio y Asia y la cartera bajó de 4.000 M por primera vez desde 2021. En 2027 los grandes embotelladores, con la energía y los envases más caros por Oriente Medio, aplazaron líneas como en 2020. Las ventas cayeron un 12 % y Krones, con 21.400 empleados y un 32 % de costes de personal, no pudo ajustar a tiempo: el margen EBITDA bajó al 7 % [A16]. A la vez, los anticipos se hundieron con los pedidos y el circulante volvió al 22 % de las ventas: la caja neta se evaporó y el flujo libre fue negativo dos años. Los fabricantes chinos ganaron concursos de gama media en Asia y África y el margen no volvió al 11 %, sino al 9 %. Las señales estaban a la vista: el aviso de octubre de 2026, el ROCE a la baja con más circulante y un flujo libre negativo en nueve meses de 2026 [A16, A17].`,
  ia: { exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '±3 %', comentario: 'Krones vende máquinas físicas; la inteligencia artificial no sustituye una línea de llenado. Toca el servicio (mantenimiento predictivo, puesta en marcha más rápida, control de calidad por visión) y el diseño de máquinas: es una oportunidad si Krones la cobra en el servicio digital y un riesgo si un rival con mejor software gana la relación con el cliente. Indirectamente, la euforia por la IA ha retirado inversores de industriales como Krones en 2026 (lo dice la propia empresa) [A16]. Señal: peso del servicio digital en los pedidos y cuota frente a rivales con plataformas propias.' },
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Pedidos de 2027', pregunta: '¿Cuánto de la cartera de 4.314 M se factura en 2027 y qué parte se ha desplazado a 2028?', por_que: 'El primer ejecutivo dice que parte se factura a finales de 2027 o después; decide si 2027 crece [A18].' },
    { tema: 'Plan a 2028', pregunta: '¿Qué crecimiento de 2027 y de 2028 hay detrás de los 6.000-6.200 M? ¿Incluye compras?', por_que: 'El suelo exige un 3 % anual; nuestro base queda en 6.015 M [A16].' },
    { tema: 'Margen de 2027', pregunta: '¿Cuánto de la mejora de materiales (45,3 % frente al 47,7 %) es mezcla y cuánto compras duraderas?', por_que: 'Con ventas planas, el margen decide el BPA; cada punto vale unos 20 EUR por acción [A16].' },
    { tema: 'Circulante', pregunta: '¿Por qué bajan los proveedores un 14 % y suben las existencias de seguridad? ¿Se revierte en el cuarto trimestre?', por_que: 'El flujo libre sin compras es de −5,0 M en nueve meses [A17].' },
    { tema: 'Servicio', pregunta: '¿Qué peso tienen las ventas de servicio y recambios y qué margen ganan?', por_que: 'Es la parte recurrente y Krones no la publica; de ella depende cuánto cae el margen en un año malo.' },
    { tema: 'Precios y competencia', pregunta: '¿Cómo han evolucionado los precios de las líneas de gama media frente a los fabricantes chinos?', por_que: 'La «disciplina de precios» que cita el primer ejecutivo puede costar pedidos [A18].' },
    { tema: 'Gobierno', pregunta: '¿Creará el consejo de supervisión una comisión de nombramientos y reforzará la independencia de la comisión de auditoría?', por_que: 'Solo un miembro de la comisión de auditoría es independiente [C1].' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];

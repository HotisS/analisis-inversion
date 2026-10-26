// Resumen, síntesis y lecturas de valoración de EIC (corte 2026-10-26; iteración tras el 3T26). Las cifras del motor se leen del
// último cálculo (copia de datos.json → calc en el scratchpad tras cada `calcular-empresa.mjs`; se calcula dos veces para que cuadren).
import fs from 'node:fs';
import * as O from './objetivo.mjs';

const RUTA = '/tmp/claude-0/-home-user/c623183c-2d6f-5529-bb62-3a7636e11d71/scratchpad/eic/calc.json';
let c = null;
try { c = JSON.parse(fs.readFileSync(RUTA, 'utf8')); } catch { c = null; }

const es = (x, d = 2) => (x === null || x === undefined ? 'n.d.' : (+x).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));
const pc = (x, d = 1) => `${x > 0 ? '+' : ''}${es(x, d)} %`;

let R = { resumen: null };
if (c) {
  const P = c.mercado.precio;
  const o = c.recomendacion.objetivo_12m;
  const f = Object.fromEntries(o.filas.map((x) => [x.escenario, x]));
  const dcf = c.dcf, inv = dcf.inverso;
  const esc = Object.fromEntries(c.escenarios.map((x) => [x.escenario, x]));
  const roic = c.rentabilidad.at(-1).roic_pct, wacc = dcf.wacc;
  const rel = c.recomendacion.relativo;
  const reco = c.recomendacion.regla;
  const vi = c.sintesis.valor_objetivo, viPot = c.sintesis.potencial_pct, viEsc = c.valor_ponderado, viEscPot = c.potencial_ponderado_pct;
  const pcomp = c.sintesis.rangos.find((x) => x.metodo === 'Comparables: PER NTM');

  const objetivo_comentario = `El objetivo a 12 meses (ponderado ${es(o.objetivo_ponderado)} SAR; base ${es(o.objetivo_base)}) queda por debajo del precio (${es(P)}) y por encima del valor intrínseco (${es(vi)}): a un año el mercado puede seguir pagando un beneficio que ya no crece, pero no hay recorrido. El base pierde porque el PER actual (${es(O.actual, 1)} veces nuestro BPA de 2027e) está por encima de su mediana adelantada (${es(O.mediana, 1)}) y la regla lo acerca a mitad de camino, y el BPA de 2028e (0,69) apenas crece desde 2027e (0,68) porque la subida de ventas se la come la bajada del margen. El bajista pesa mucho (${es(f.Bajista.precio)} SAR) porque combina el BPA de un margen del 23 % con el PER mínimo de 2022 (5,2 veces): es duro, pero es lo que pagó el mercado la última vez que dudó del ciclo saudí. La v2 de control da ${pc(o.v2.rentabilidad_ponderada_pct)}: tampoco llega a comprar. Cerrar la distancia con el valor intrínseco (${pc(viPot)}) pediría que el margen aguantara por encima del 30 % hasta 2028; no hay un catalizador con fecha que lo anticipe.`;

  const dcf_lectura = `El DCF da ${es(dcf.valor_accion)} SAR por acción, un ${es(Math.abs(dcf.potencial_pct), 1)} % menos que el precio, con un WACC del ${es(wacc)} % y un crecimiento terminal del 3 %; el valor terminal pesa el ${dcf.peso_terminal_pct} %. El DCF inverso no encuentra un crecimiento que justifique el precio con nuestros márgenes: lo que el precio de ${es(P)} SAR descuenta es un margen EBITDA terminal del ${es(inv.margen_implicito_pct, 1)} %, frente al 31 % de 2025 y de los 9M26 (máximo histórico) y al 13-19 % de 2021-2023, o una rentabilidad implícita del ${es(inv.rentabilidad_implicita_pct, 1)} %, por debajo de nuestro WACC. Sigue siendo exigente, aunque menos que el 19-oct (margen implícito del 41,8 % a 11,99 SAR): el mercado ha recortado el precio un 15 % y ya no paga un margen que siga subiendo, pero sí uno que no baje nunca. Con la prima implícita del mercado (4,2 %) el DCF sube a ${es(rel.dcf)} SAR, todavía muy por debajo del precio. Nuestra lectura: el DCF, con márgenes que vuelven hacia el 24,5 %, es el valor de largo plazo; a 12 meses manda el PER.`;

  const escenarios_comentario = `La asimetría es negativa en valor intrínseco: incluso el alcista (${es(esc.Alcista.valor)} SAR, ${pc(esc.Alcista.potencial_pct)}) queda por debajo del precio, y el bajista (${es(esc.Bajista.valor)} SAR, ${pc(esc.Bajista.potencial_pct)}) repite el margen de 2023. Con un WACC del ${es(wacc)} % y márgenes que vuelven hacia la media del ciclo, el valor ponderado de los escenarios (${es(viEsc)} SAR) es un ${es(Math.abs(viEscPot), 1)} % inferior al precio, y el valor intrínseco de la síntesis, con los comparables, un ${es(Math.abs(viPot), 1)} % (${es(vi)} SAR). A 12 meses la asimetría es de ${es(o.asimetria)} (el alcista gana ${pc(f.Alcista.rentabilidad_pct, 0)} y el bajista pierde ${pc(f.Bajista.rentabilidad_pct, 0)}): no compensa.`;

  const valoracion_comentario = `Pesos: DCF 40 %, escenarios 40 % y comparables 20 %; transacciones sin peso (operaciones de control en EE. UU. en pleno auge, sin referencias en el Golfo). La dispersión entre métodos es grande y dice algo: los comparables (PER de los próximos doce meses, de ${es(pcomp?.min)} a ${es(pcomp?.max)} SAR) quedan por encima del precio porque usan el BPA del consenso, anterior al 3T26, y todo el sector cotiza el mismo pico; el DCF (${es(dcf.valor_accion)}) descuenta la vuelta del margen. El puente parte del balance de junio de 2026, el último accesible: deuda de murabahas, arrendamientos e indemnizaciones por cese (139,6 M SAR), y resta el dividendo del 1S26 pagado el 23-ago (139,1 M) neto del reembolso de la multa cobrado en julio (26,1 M) [D16, A14, A15].`;

  const sintesis = `**La recomendación y por qué.** ${reco}, con convicción baja. El objetivo a 12 meses es de ${es(o.objetivo_ponderado)} SAR (ponderado) y ${es(o.objetivo_base)} SAR en el caso base, frente a un precio de ${es(P)} SAR (cierre del 25-oct): la rentabilidad a 12 meses, con el dividendo ordinario, es del ${pc(o.rentabilidad_ponderada_pct)} ponderada y del ${pc(o.rentabilidad_base_pct)} en el base, y la asimetría de ${es(o.asimetria)}. El valor intrínseco (${es(vi)} SAR, ${pc(viPot)}) queda por debajo; el objetivo medio del único analista (15,50 SAR, anterior al 3T26) queda fuera de nuestro rango de valor y casi en el alcista a 12 meses [D3]. La razón: tras el 3T26, el beneficio recurrente ya no crece y el precio aún pide un margen que no baje. Convicción baja, y no la media que sugiere el motor, porque faltan los estados de los 9M26 (balance y caja a septiembre) y el consenso no se ha revisado; la subiría ver el margen bruto del 4T26 (por encima del 36 %, guerra pasajera; por debajo del 33 %, ciclo).

**Qué ha cambiado desde el 19-oct.** El 3T26 (22-oct) decepcionó: ventas de 630,5 M (+12,6 %, −11 % frente al 2T26), margen bruto del 33,9 % (39,9 % un año antes) y beneficio de 177,7 M que, sin los 26,1 M del reembolso de la multa, cae un 6 %; ANB esperaba 219,5 M [A15, A16, D23]. La empresa lo atribuye a entregas retrasadas y fletes y seguros más caros por la guerra [A15]. Bajamos las ventas de 2026e de 2.870 a 2.700 M y el margen un año antes en la senda: el BPA de 2028e pasa de 0,80 a 0,69 SAR. El precio cayó de 11,99 a ${es(P)} SAR, casi lo mismo que el objetivo, así que la señal no cambia: Mantener, con la ponderada del −7,5 % al ${pc(o.rentabilidad_ponderada_pct)}.

**El negocio.** EIC es el único fabricante saudí de transformadores de alta tensión y vende el 89,5 % en el Reino, con Saudi Electricity como primer cliente (16 %) [A1, B1]. Su ROIC del ${es(roic, 1)} % en 2025 frente a un WACC del ${es(wacc)} % es de pico de ciclo: en 2021 era del 7 %. La sostenibilidad del crecimiento es «Sí»: crecer un 8,3 % anual pide una reinversión del 21 % del beneficio operativo y el plan de SEC lo cubre; el problema es el margen, no el volumen.

**Sector y ciclo.** Madurez del ciclo: la escasez mundial y el plan de SEC (220.000 M SAR en 2025-2030) llevaron el margen EBITDA del 13 % al 31 % en cuatro años; la cartera solo creció un 3 % en 2025, Voltamp construye fábrica en el Reino y la guerra encarece la logística del Golfo [A1, B5, A11, B7, B14].

**Valoración.** DCF de ${es(dcf.valor_accion)} SAR con un WACC del ${es(wacc)} %; el precio descuenta un margen terminal del ${es(inv.margen_implicito_pct, 1)} %. A 12 meses, el PER actual (${es(O.actual, 1)} veces nuestro BPA de 2027e) supera su mediana adelantada (${es(O.mediana, 1)}); nuestro BPA de 2028e (0,69) queda un 37 % por debajo del consenso (1,09), que no ha incorporado el 3T26 y espera márgenes del 36 % [D2].

**Riesgos y catalizadores.** Fin de la escasez (bajista de ${es(esc.Bajista.valor)} SAR en el DCF y ${es(f.Bajista.precio)} SAR a 12 meses), guerra prolongada en el Golfo y capacidad nueva en el Reino. La fábrica de cubas (150 M SAR, 2029) no mueve el valor. Próximo hecho: resultados anuales y cartera hacia marzo de 2027. La caída de un mes (−31 %) tiene causa propia, ya incorporada (regla 13: no cambia).

**Qué cambiaría la decisión.** Compraríamos por debajo de ${es(o.comprar_por_debajo)} SAR y venderíamos por encima de ${es(o.vender_por_encima)} SAR. Mejoraría la tesis una cartera de fin de 2026 por encima de 4.000 M SAR con margen bruto por encima del 36 %; la empeoraría un 4T26 con margen bruto por debajo del 33 % o ventas por debajo de 650 M.`;

  R = {
    objetivo_comentario, dcf_lectura, escenarios_comentario, valoracion_comentario,
    resumen: {
      recomendacion: reco, conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
      sintesis,
      tesis: `EIC es el único fabricante saudí de transformadores de alta tensión y el primero del Reino en distribución, con Saudi Electricity y Aramco como clientes [B1]. La escasez mundial de transformadores y el plan de inversión de SEC triplicaron sus ventas en 2021-2025 y llevaron el margen EBITDA del 13 % al 31 %; con deuda casi nula, reparte casi todo el beneficio [A1].\n\nEl precio (${es(P)} SAR) ha caído un 45 % desde abril, la última parte con un 3T26 flojo (margen bruto del 33,9 %, beneficio recurrente −6 %) [A15, A16]. Aun así descuenta un margen terminal del ${es(inv.margen_implicito_pct, 1)} %: el DCF da ${es(dcf.valor_accion)} SAR y, a 12 meses, el PER adelantado y nuestro BPA dan ${es(o.objetivo_ponderado)} SAR.\n\nPara invertir hay que creer que el 3T26 es solo la guerra y que el margen se queda por encima del 30 % hasta 2028. Nosotros creemos que el volumen está asegurado pero el margen es de ciclo: no hay margen de seguridad.`,
      vision_diferencial: {
        mercado_descuenta: `Que el margen EBITDA del 31 % se mantiene: el precio descuenta un margen terminal del ${es(inv.margen_implicito_pct, 1)} % con nuestro WACC. El único analista, sin revisar tras el 3T26, espera un 36 % en 2028e y pone un objetivo de 15,50 SAR [D2, D3].`,
        nuestra_vision: 'El volumen está asegurado por el plan de SEC hasta 2030, pero el margen es de ciclo: volverá hacia el 24-25 % cuando la capacidad nueva llegue a los concursos de SEC, y el 3T26 adelanta esa presión.',
        por_que: 'La historia propia (margen del 13-19 % en 2021-2023, cuatro años de caídas en 2016-2019), la cartera estancada en 2025 (+3 %), el 3T26 (margen bruto del 33,9 %) y las ventas de la familia fundadora y de los directivos [A1, A11, A15, C2].',
      },
      a_favor: [
        '**Único fabricante saudí de transformadores de alta tensión**, con contenido local que puntúa en los concursos [B1].',
        '**Plan de SEC de 220.000 M SAR** en 2025-2030 y 39.000 M invertidos en el 1S26 [B5, B6].',
        '**Margen EBITDA del 31 %** y ROIC del 70 % en 2025, con deuda casi nula [A1].',
        '**Ventas de los 9M26 +25,2 %** y demanda «creciente en todos los sectores» según la empresa [A15].',
        '**Dividendo**: 0,25 SAR ordinarios al año y 0,25 extraordinarios en 2025 [A11].',
      ],
      en_contra: [
        '**3T26 por debajo de lo esperado**: beneficio recurrente −6 % y margen bruto del 33,9 % [A15, A16].',
        '**Margen de pico de ciclo**: 13 % en 2021, 31 % en 2025 [A1].',
        '**Cartera estancada**: +3 % en 2025 con ventas +16 % [A11].',
        '**Guerra en el Golfo**: entregas retrasadas y fletes y seguros más caros [A15, B14].',
        '**Ventas de la familia fundadora** (28 % → 15 %) y de directivos [C2].',
      ],
      que_vigilar: 'La tesis depende del margen. La señal está en el margen bruto del 4T26 y en la cartera de pedidos del informe anual (hacia marzo de 2027): si el margen se queda por debajo del 33 % con la cartera estancada, el pico ha pasado y no es solo la guerra; si vuelve por encima del 36 % y la cartera crece, nos equivocamos con el ciclo.',
      cambiaria_recomendacion: [
        `Precio por debajo de ${es(o.comprar_por_debajo)} SAR: pasaría a Comprar (ponderada a 12 meses ≥ 15 %).`,
        `Precio por encima de ${es(o.vender_por_encima)} SAR: pasaría a Vender (ponderada ≤ −10 %).`,
        'Margen bruto del 4T26 por debajo del 33 % o ventas por debajo de 650 M SAR: bajaríamos el caso base.',
        'Cartera de pedidos a fin de 2026 por encima de 4.000 M SAR con margen bruto por encima del 36 %: subiríamos el base.',
        'Recorte del plan de inversión de SEC: bajaríamos el volumen de 2027-2030e.',
      ],
      kpis_seguimiento: [
        { kpi: 'Margen bruto trimestral', nivel_actual: '33,9 % (3T26)', umbral_alerta: '< 33 %', por_que: 'Fin de la escasez o precio de los concursos, más allá de la guerra.' },
        { kpi: 'Ventas trimestrales', nivel_actual: '630,5 M SAR (3T26)', umbral_alerta: '< 650 M SAR en el 4T26', por_que: 'Si las entregas retrasadas no vuelven, es demanda y no logística.' },
        { kpi: 'Cartera de pedidos', nivel_actual: '3.300 M SAR (fin 2025)', umbral_alerta: '< 3.000 M SAR', por_que: 'Ventas futuras.' },
        { kpi: 'Anticipos de clientes', nivel_actual: '582 M SAR (jun-26)', umbral_alerta: '< 450 M SAR', por_que: 'Pedidos nuevos y caja.' },
        { kpi: 'Inversión de SEC', nivel_actual: '39.000 M SAR (1S26)', umbral_alerta: 'Caída interanual', por_que: 'Demanda del primer cliente.' },
      ],
      confianza: 'Media',
    },
  };
}
export default R;

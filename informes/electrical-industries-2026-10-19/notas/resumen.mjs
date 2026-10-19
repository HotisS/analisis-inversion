// Resumen, síntesis y lecturas de valoración de EIC (corte 2026-10-19). Las cifras del motor se leen del último cálculo
// (copia de datos.json → calc en el scratchpad tras cada `calcular-empresa.mjs`; se calcula dos veces para que cuadren).
import fs from 'node:fs';
import * as O from './objetivo.mjs';

const RUTA = '/tmp/claude-0/-home-user/f0bd2848-976d-547f-94c0-627b77f16946/scratchpad/eic/calc.json';
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
  const yo = c.comparables.tabla.find((x) => x.es_objetivo);
  const rel = c.recomendacion.relativo;
  const reco = c.recomendacion.regla;
  const vi = c.sintesis.valor_objetivo, viPot = c.sintesis.potencial_pct, viEsc = c.valor_ponderado, viEscPot = c.potencial_ponderado_pct;

  const objetivo_comentario = `El objetivo a 12 meses (ponderado ${es(o.objetivo_ponderado)} SAR; base ${es(o.objetivo_base)}) queda por debajo del precio (${es(P)}) y muy por encima del valor intrínseco (${es(vi)}): el mercado puede seguir pagando el beneficio del pico durante un año, pero no hay recorrido. El base pierde porque el PER actual (${es(O.actual, 1)} veces nuestro BPA de 2027e) está por encima de su mediana adelantada (${es(O.mediana, 1)}) y la regla lo acerca a mitad de camino, y el BPA de 2028e (0,80) apenas crece desde 2027e (0,77) por la bajada del margen. El bajista pesa mucho (${es(f.Bajista.precio)} SAR) porque combina el BPA de un margen del 24 % con el PER mínimo de 2022 (5,2 veces): es duro, pero es lo que pagó el mercado la última vez que dudó del ciclo saudí. La v2 de control da ${pc(o.v2.rentabilidad_ponderada_pct)}: tampoco llega a comprar.`;

  const dcf_lectura = `El DCF da ${es(dcf.valor_accion)} SAR por acción, un ${es(Math.abs(dcf.potencial_pct), 1)} % menos que el precio, con un WACC del ${es(wacc)} % y un crecimiento terminal del 3 %; el valor terminal pesa el ${dcf.peso_terminal_pct} %. El DCF inverso no encuentra un crecimiento que justifique el precio con nuestros márgenes: lo que el precio de ${es(P)} SAR descuenta es un margen EBITDA terminal del ${es(inv.margen_implicito_pct, 1)} %, frente al 31 % de 2025 (máximo histórico) y al 13-19 % de 2021-2023, o una rentabilidad implícita del ${es(inv.rentabilidad_implicita_pct, 1)} %, muy por debajo de nuestro WACC. Es exigente: el mercado paga como si el margen del pico de escasez fuera permanente y aún subiera. Con la prima implícita del mercado (4,2 %) el DCF sube a ${es(rel.dcf)} SAR, todavía muy por debajo del precio. Cada punto de margen EBITDA en toda la proyección mueve el valor en torno al 5 %; ni con el margen de 2025 congelado para siempre llega al precio.`;

  const escenarios_comentario = `La asimetría es negativa: incluso el alcista (${es(esc.Alcista.valor)} SAR, ${pc(esc.Alcista.potencial_pct)}) queda por debajo del precio, y el bajista (${es(esc.Bajista.valor)} SAR, ${pc(esc.Bajista.potencial_pct)}) repite el margen de 2023. Las probabilidades 25/50/25 no esconden nada: con un WACC del 12,4 % y márgenes que vuelven hacia la media del ciclo, el valor ponderado de los escenarios (${es(viEsc)} SAR) es un ${es(Math.abs(viEscPot), 1)} % inferior al precio, y el valor intrínseco de la síntesis, con los comparables, un ${es(Math.abs(viPot), 1)} % (${es(vi)} SAR).`;

  const valoracion_comentario = `Pesos: DCF 40 %, escenarios 40 % y comparables 20 %; transacciones sin peso (operaciones de control en EE. UU. en pleno auge, sin referencias en el Golfo). La dispersión entre métodos es grande y dice algo: los comparables (PER de los próximos doce meses, de 14,46 a 22,10 SAR) están cerca del precio porque todo el sector cotiza el mismo pico, mientras el DCF (${es(dcf.valor_accion)}) descuenta la vuelta del margen. El puente parte del balance de junio de 2026: deuda de murabahas, arrendamientos e indemnizaciones por cese (139,6 M SAR), y resta el dividendo del 1S26 pagado el 23-ago (139,1 M) neto del reembolso de la multa (26,1 M) [D16, A14, C5].`;

  const sintesis = `**La recomendación y por qué.** ${reco}, con convicción baja. El objetivo a 12 meses es de ${es(o.objetivo_ponderado)} SAR (ponderado) y ${es(o.objetivo_base)} SAR en el caso base, frente a un precio de ${es(P)} SAR: la rentabilidad a 12 meses, con el dividendo ordinario, es del ${pc(o.rentabilidad_ponderada_pct)} ponderada y del ${pc(o.rentabilidad_base_pct)} en el base, cerca del umbral de venta (−10 %, que se cruza por encima de ${es(o.vender_por_encima)} SAR). El valor intrínseco (${es(vi)} SAR, ${pc(viPot)}) dice vender: el DCF descuenta que el margen vuelve desde el pico. La convicción es baja porque las dos medidas se separan mucho: a un año el mercado puede seguir pagando el beneficio del pico; a varios años, el precio pide un margen del ${es(inv.margen_implicito_pct, 0)} % para siempre. Solo compraríamos por debajo de ${es(o.comprar_por_debajo)} SAR.

**El negocio.** EIC es el primer fabricante saudí de transformadores y el único que diseña y fabrica los de alta tensión; vende el 89,5 % en el Reino, con Saudi Electricity como primer cliente (16 %) [A1, B1]. Su ROIC del ${es(roic, 1)} % en 2025 frente a un WACC del ${es(wacc)} % es de pico de ciclo: en 2021 era del 7 %. La sostenibilidad del crecimiento es «Sí»: crecer un 7,4 % anual en 2027-2031e pide poca inversión y el plan de SEC lo cubre; el problema es el margen, no el volumen.

**Sector y ciclo.** Fase alta de un ciclo excepcional: la escasez mundial de transformadores y el plan de SEC (220.000 M SAR en 2025-2030) han llevado el margen EBITDA del 13 % al 31 % en cuatro años [A1, B5]. La cartera de pedidos solo creció un 3 % en 2025 y Voltamp construye fábrica en el Reino [A11, B7].

**Finanzas.** Ventas de 771 a 2.296 M SAR en 2021-2025 y 2.628 M en los últimos doce meses; beneficio de 49 a 630 M; deuda casi nula. Cuentas de KPMG sin salvedades; el riesgo es el circulante (1.709 M de existencias y clientes) [A1, A6].

**Equipo y gobierno.** Sin accionista de control: la familia fundadora (Adja) ha bajado del 28 % al 15 % y directivos y familias de consejeros venden [C2]. Ni los Al-Muhaidib ni los Zamil son accionistas significativos; los extranjeros tienen el 18,96 % (máximo del 46 %).

**Valoración.** DCF de ${es(dcf.valor_accion)} SAR con un WACC del ${es(wacc)} % (Treasury más diferencial soberano y prima de país). El precio cotiza a ${es(yo.per_ntm, 1)} veces el beneficio de los próximos doce meses, por debajo de los fabricantes coreanos y taiwaneses (mediana de 21), pero descuenta un margen del ${es(inv.margen_implicito_pct, 1)} % a perpetuidad. Nuestro BPA de 2028e (0,80) queda un 27 % por debajo del único analista con estimaciones (1,09) porque bajamos el margen; su objetivo (15,50 SAR) queda fuera de nuestro rango de valor intrínseco (${es(esc.Bajista.valor)}-${es(esc.Alcista.valor)} SAR) y dentro del rango a 12 meses (${es(f.Bajista.precio)}-${es(f.Alcista.precio)} SAR) [D3].

**Riesgos y catalizadores.** El riesgo dominante es el fin de la escasez (bajista de ${es(esc.Bajista.valor)} SAR en el DCF); le siguen un recorte del plan de SEC y la capacidad nueva en el Reino. Catalizador: resultados del 3T26 hacia el 22-oct. La acción ha caído un 36,8 % en seis meses sin noticias propias (regla 13: no cambia).

**Qué cambiaría la decisión.** Compraríamos por debajo de ${es(o.comprar_por_debajo)} SAR y venderíamos por encima de ${es(o.vender_por_encima)} SAR. Mejoraría la tesis una cartera de pedidos que vuelva a crecer con márgenes estables; la empeoraría un margen bruto trimestral por debajo del 33 %.`;

  R = {
    objetivo_comentario, dcf_lectura, escenarios_comentario, valoracion_comentario,
    resumen: {
      recomendacion: reco, conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
      sintesis,
      tesis: `EIC es el único fabricante saudí de transformadores de alta tensión y el primero del Reino en distribución, con Saudi Electricity y Aramco como clientes [B1]. La escasez mundial de transformadores y el plan de inversión de SEC triplicaron sus ventas en 2021-2025 y llevaron el margen EBITDA del 13 % al 31 %; con deuda casi nula, reparte casi todo el beneficio [A1].\n\nEl precio (${es(P)} SAR) ya ha caído un 37 % desde abril, pero aún descuenta que el margen del pico sea permanente: el DCF da ${es(dcf.valor_accion)} SAR. A 12 meses, con el PER histórico adelantado y nuestro BPA, el objetivo es de ${es(o.objetivo_ponderado)} SAR: no hay margen de seguridad.`,
      vision_diferencial: {
        mercado_descuenta: `Que el margen EBITDA del 31-32 % se mantiene y aún sube: el precio descuenta un margen terminal del ${es(inv.margen_implicito_pct, 1)} % con nuestro WACC. El único analista espera un 36 % en 2028e y pone un objetivo de 15,50 SAR [D2, D3].`,
        nuestra_vision: 'El volumen está asegurado por el plan de SEC hasta 2030, pero el margen es de ciclo: volverá hacia el 24-25 % cuando la capacidad nueva (Voltamp, fabricantes extranjeros en el Reino) llegue a los concursos de SEC.',
        por_que: 'La historia propia (margen del 13-19 % en 2021-2023, cuatro años de caídas en 2016-2019), la cartera estancada en 2025 (+3 %) y las ventas de la familia fundadora y de los directivos [A1, A11, C2].',
      },
      a_favor: [
        '**Único fabricante saudí de transformadores de alta tensión**, con contenido local que puntúa en los concursos [B1].',
        '**Plan de SEC de 220.000 M SAR** en 2025-2030 y 39.000 M invertidos en el 1S26 [B5, B6].',
        '**Margen EBITDA del 31 %** y ROIC del 70 % en 2025, con deuda casi nula [A1].',
        '**Beneficio del 2T26 +55 %** y ventas del 1S26 +32 % [A13, A6].',
        '**Dividendo**: 0,25 SAR ordinarios al año y 0,25 extraordinarios en 2025 [A11].',
      ],
      en_contra: [
        '**Margen de pico de ciclo**: 13 % en 2021, 31 % en 2025 [A1].',
        '**Cartera estancada**: +3 % en 2025 con ventas +16 % [A11].',
        '**Capacidad nueva** en el Reino (Voltamp) y fabricantes extranjeros localizados [B7].',
        '**Un gran cliente** que adjudica por concurso (SEC, 16 % de las ventas) [A1].',
        '**Ventas de la familia fundadora** (28 % → 15 %) y de directivos [C2].',
      ],
      que_vigilar: 'La tesis depende del margen. La señal está en el margen bruto trimestral (37,8 % en el 1S26) y en la cartera de pedidos del informe anual: si el margen baja del 33 % con la cartera estancada, el pico ha pasado; si la cartera vuelve a crecer con márgenes de más del 35 %, nos equivocamos con el ciclo.',
      cambiaria_recomendacion: [
        `Precio por debajo de ${es(o.comprar_por_debajo)} SAR: pasaría a Comprar (ponderada a 12 meses ≥ 15 %).`,
        `Precio por encima de ${es(o.vender_por_encima)} SAR: pasaría a Vender (ponderada ≤ −10 %).`,
        'Margen bruto trimestral por debajo del 33 %: bajaríamos el caso base.',
        'Cartera de pedidos a fin de 2026 por encima de 4.000 M SAR con márgenes estables: subiríamos el base.',
        'Recorte del plan de inversión de SEC: bajaríamos el volumen de 2027-2030e.',
      ],
      kpis_seguimiento: [
        { kpi: 'Margen bruto trimestral', nivel_actual: '37,8 % (2T26)', umbral_alerta: '< 33 %', por_que: 'Fin de la escasez o precio de los concursos.' },
        { kpi: 'Cartera de pedidos', nivel_actual: '3.300 M SAR (fin 2025)', umbral_alerta: '< 3.000 M SAR', por_que: 'Ventas futuras.' },
        { kpi: 'Anticipos de clientes', nivel_actual: '582 M SAR (jun-26)', umbral_alerta: '< 450 M SAR', por_que: 'Pedidos nuevos y caja.' },
        { kpi: 'Inversión de SEC', nivel_actual: '39.000 M SAR (1S26)', umbral_alerta: 'Caída interanual', por_que: 'Demanda del primer cliente.' },
        { kpi: 'Ventas trimestrales', nivel_actual: '708,6 M SAR (2T26)', umbral_alerta: 'Caída interanual', por_que: 'Primer síntoma del fin del ciclo.' },
      ],
      confianza: 'Media',
    },
  };
}
export default R;

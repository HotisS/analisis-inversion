// Resumen, síntesis y lecturas de valoración de Elm (corte 2026-10-19). Las cifras del motor se leen del último cálculo
// (copia de datos.json → calc en el scratchpad tras cada `calcular-empresa.mjs`; se calcula dos veces para que cuadren).
import fs from 'node:fs';
import * as O from './objetivo.mjs';

const RUTA = '/tmp/claude-0/-home-user/fe7d36be-f320-582f-ada1-36b66fec5b44/scratchpad/elm/calc.json';
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

  const objetivo_comentario = `El objetivo a 12 meses (ponderado ${es(o.objetivo_ponderado)} SAR, ${pc(o.rentabilidad_ponderada_pct)} con el dividendo; base ${es(o.objetivo_base)} SAR, ${pc(o.rentabilidad_base_pct)}) supera los umbrales de compra de la regla, pero el valor intrínseco (${es(vi)} SAR) queda un ${es(Math.abs(viPot), 1)} % por debajo del precio, y sin valor real por encima del precio no hay compra. El base sube porque el PER actual (${es(O.actual, 1)} veces nuestro BPA de 2027e) está muy por debajo de su mediana adelantada (${es(O.mediana, 1)} veces, de los años de crecimiento del 25-30 %), y la regla le deja recuperar un 10 %. El alcista (${es(f.Alcista.precio)} SAR) es optimista: aplica ${es(f.Alcista.multiplo, 1)} veces, el tope de la regla, a un BPA cercano al del consenso. La v2 de control da ${pc(o.v2.rentabilidad_ponderada_pct)} ponderada y ${pc(o.v2.rentabilidad_base_pct)} en el base: no pasaría el umbral del base (12 %). Lectura: el múltiplo ya es bajo frente a su historia, pero la historia (cuatro años de un régimen de crecimiento que ya no existe) es poca prueba.`;

  const dcf_lectura = `El DCF da ${es(dcf.valor_accion)} SAR por acción, un ${es(Math.abs(dcf.potencial_pct), 1)} % menos que el precio, con un WACC del ${es(wacc)} % y un crecimiento terminal del 3 %; el valor terminal pesa el ${dcf.peso_terminal_pct} %. El DCF inverso dice que el precio de ${es(P)} SAR descuenta un crecimiento del ${es(inv.crecimiento_implicito_pct, 1)} % anual en 2027-2032e (nuestro base: ${es(inv.crecimiento_base_pct, 1)} %) o un margen EBITDA terminal del ${es(inv.margen_implicito_pct, 1)} % (base: ${es(inv.margen_base_pct, 1)} %; máximo histórico, 25,6 % en 2024), o una rentabilidad implícita del ${es(inv.rentabilidad_implicita_pct, 1)} %, por debajo de nuestro WACC. Es exigente: el precio pide volver al crecimiento de 2023-2025 sin compras, cuando el orgánico ya es de un dígito alto. Con la prima implícita del mercado (4,2 %) el DCF sube a ${es(rel.dcf)} SAR. La conclusión depende mucho del WACC: un negocio de tasas públicas recurrentes podría merecer menos prima, pero la dependencia de un solo cliente (el Estado) y de un solo país justifica la prima de país.`;

  const escenarios_comentario = `La asimetría es negativa en valor intrínseco: incluso el alcista (${es(esc.Alcista.valor)} SAR, ${pc(esc.Alcista.potencial_pct)}) queda por debajo del precio, y el bajista (${es(esc.Bajista.valor)} SAR, ${pc(esc.Bajista.potencial_pct)}) recoge un Estado que aprieta el reparto y la IA en el BPO. Con probabilidades 25/50/25, el valor ponderado de los escenarios (${es(viEsc)} SAR) es un ${es(Math.abs(viEscPot), 1)} % inferior al precio, y el valor intrínseco de la síntesis, con los comparables, un ${es(Math.abs(viPot), 1)} % (${es(vi)} SAR).`;

  const valoracion_comentario = `Pesos: DCF 40 %, escenarios 40 % y comparables 20 %; transacciones sin peso (la única es la compra vinculada de Thiqah). Los comparables dan valores cercanos al DCF porque la mediana del grupo (PER de 12 veces) castiga a los contratistas públicos de EE. UU. y a los saudíes de proyectos, con menos margen. El puente parte del balance de junio de 2026: préstamo de SNB, arrendamientos e indemnizaciones por cese (625,9 M SAR) como deuda, caja y murabahas (3.906 M) y asociadas (287 M), y resta el dividendo del 1S26 pagado en agosto (389,9 M) [D15, D13].`;

  const sintesis = `**La recomendación y por qué.** ${reco}, con convicción media. La rentabilidad a 12 meses con la regla común es alta, ${pc(o.rentabilidad_ponderada_pct)} ponderada y ${pc(o.rentabilidad_base_pct)} en el base (objetivo de ${es(o.objetivo_ponderado)} SAR frente a ${es(P)}), porque el PER ha caído a ${es(O.actual, 1)} veces nuestro BPA de 2027e desde 35-42 veces en 2023-2024. Pero el valor intrínseco es de ${es(vi)} SAR (${pc(viPot)}): el DCF no justifica el precio con un crecimiento orgánico de un dígito alto. Sin valor real por encima del precio no hay compra; y la v2 de control (${pc(o.v2.rentabilidad_base_pct)} en el base) tampoco pasaría. La convicción es media porque las dos medidas se separan: a 12 meses el múltiplo deprimido da recorrido, pero el valor intrínseco no; la subiría un crecimiento orgánico que vuelva al 12-15 % con la caja cobrada, y la bajaría un contrato público renovado con menos reparto. Solo compraríamos por debajo de ${es(o.comprar_por_debajo)} SAR.

**El negocio.** Elm opera las plataformas digitales del Estado saudí (Absher, Muqeem, Tamm, Nusuk) y cobra tasas por trámite que reparte con los ministerios; el 48 % de las ventas va directo a organismos y entidades públicas y el resto son tasas de servicios públicos [B8, B4]. ROIC contable del ${es(roic, 1)} % (≈ 40 % sumando lo pagado de más por Thiqah) frente a un WACC del ${es(wacc)} %. Sostenibilidad del crecimiento: «Sí», con poco capital; el riesgo es la tasa que deje cobrar el Estado.

**Sector y ciclo.** Gobierno digital en expansión madura: los servicios básicos ya están digitalizados y el gasto público se prioriza con déficit, lo que frena los proyectos [B1, D14]. La IA es mixta: amenaza el BPO (27 % de las ventas) y abre nuevos servicios (Nuha, diez servicios en producción) [B5].

**Finanzas.** Ventas de 3.828 a 9.465 M SAR en 2021-2025 (+25 % anual; ≈ 13 % orgánico en 2025) y beneficio de 567 a 2.090 M; caja neta de ≈ 2.370 M sin arrendamientos [A1, D15]. Alerta: flujo operativo del 35 % del beneficio en el 1S26 y cobros a 166 días [A10].

**Equipo y gobierno.** El PIF controla el 67 % y le vendió Thiqah por 3.385,9 M SAR con pérdidas; el presidente asesora al ministro del Interior, el gran cliente [C8, C1, A11]. Equipo de la casa, con guía cumplida a medias.

**Valoración.** DCF de ${es(dcf.valor_accion)} SAR con WACC del ${es(wacc)} %; el precio descuenta un crecimiento del ${es(inv.crecimiento_implicito_pct, 1)} % anual. Cotiza a ${es(yo.per_ntm, 1)} veces el beneficio de los próximos doce meses, sobre la mediana de los comparables (12). Nuestro BPA de 2028e (${es(O.bpa.Base)}) queda un 14 % por debajo del consenso (38,83) por crecimiento; su objetivo medio (748,77 SAR) queda fuera de nuestro rango intrínseco (${es(esc.Bajista.valor)}-${es(esc.Alcista.valor)} SAR) y dentro del de 12 meses (${es(f.Bajista.precio)}-${es(f.Alcista.precio)} SAR) [D2].

**Riesgos y catalizadores.** Dominante: que el Estado renegocie el reparto o internalice plataformas (bajista de ${es(esc.Bajista.valor)} SAR); después la IA en el BPO y el cobro público. Catalizador: resultados del 3T26 hacia el 2-nov. La acción ha caído un 41 % en un año por causas propias (regla 13: cambia la tesis, ya recogido).

**Qué cambiaría la decisión.** Compraríamos por debajo de ${es(o.comprar_por_debajo)} SAR, o si el crecimiento orgánico volviera al 12-15 % con la caja cobrada (flujo operativo del 85-95 % del beneficio), lo que subiría el DCF; venderíamos por encima de ${es(o.vender_por_encima)} SAR o si un gran contrato se renovara con menos reparto.`;

  R = {
    objetivo_comentario, dcf_lectura, escenarios_comentario, valoracion_comentario,
    resumen: {
      recomendacion: reco, conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
      sintesis,
      tesis: `Elm es el operador de las plataformas digitales del Estado saudí (Absher, Muqeem, Tamm, Nusuk): cobra tasas por trámite que reparte con los ministerios, con márgenes EBITDA del 24-26 %, capex del 3,5 % de las ventas y caja neta [A1, B4]. El PIF tiene el 67 %.\n\nEl precio (${es(P)} SAR) ha caído un 41 % en un año y el PER a 17,8 veces el BPA de 2027e, la mitad que en 2023-2024: a 12 meses, la regla común da ${pc(o.rentabilidad_ponderada_pct)}. Pero el DCF (${es(dcf.valor_accion)} SAR) dice que el precio aún pide crecer al ${es(inv.crecimiento_implicito_pct, 0)} % anual, y el crecimiento orgánico ya es de un dígito alto: no hay margen de seguridad en valor.`,
      vision_diferencial: {
        mercado_descuenta: `Que el crecimiento vuelve a dos dígitos: el consenso espera ventas de 14.203 M SAR en 2028e (+14 % anual) y un BPA de 38,83 SAR, y el precio descuenta un crecimiento del ${es(inv.crecimiento_implicito_pct, 1)} % anual con nuestro WACC [D2].`,
        nuestra_vision: 'Las plataformas siguen creciendo con la población y los nuevos servicios, pero el orgánico baja a un dígito alto, Thiqah resta margen y la IA presiona el BPO; el Estado, que fija tasas y reparto, captura parte del valor.',
        por_que: 'El orgánico del 2T26 (≈ 7 %), las adjudicaciones más lentas por la priorización del gasto, el flujo operativo del 35 % del beneficio en el 1S26 y la compra de Thiqah al PIF [A10, D14, A11].',
      },
      a_favor: [
        '**Monopolio de facto** de las plataformas de trámites del Estado (Absher, Muqeem, Tamm, Nusuk) [B4].',
        '**Margen EBITDA del 24 %** y capex del 3,5 % de las ventas: ROIC de ≈ 40 % aun sumando el sobreprecio de Thiqah [A1].',
        '**Caja neta** de ≈ 2.370 M SAR sin arrendamientos y dividendo creciente [D15, A12].',
        '**Contratos nuevos de cinco años** con el Ministerio de Comercio y SASO [D10, D11].',
        '**PER de 17,8 veces** nuestro BPA de 2027e, la mitad que en 2023-2024 [D1].',
      ],
      en_contra: [
        '**Un solo cliente**: el Estado fija tasas, reparto y renovaciones [B8].',
        '**Crecimiento orgánico a la baja**: ≈ 13 % en 2025 y ≈ 7 % en el 2T26 [A1, A9].',
        '**Thiqah**: 3.385,9 M SAR pagados al PIF por una empresa con pérdidas [A11].',
        '**Cobro público más lento**: flujo operativo del 35 % del beneficio en el 1S26 [A10].',
        '**IA**: amenaza a la externalización (27 % de las ventas) [B5].',
      ],
      que_vigilar: 'La tesis depende del crecimiento orgánico y de la caja. La señal está en los seis primeros productos (+14 % en el 1S26), en las adjudicaciones de proyectos y en el flujo operativo frente a la guía (85-95 % del beneficio): si el orgánico baja del 7 % con la caja atascada, el bajista gana peso; si vuelve al 12-15 % con la caja cobrada, el DCF se queda corto.',
      cambiaria_recomendacion: [
        `Precio por debajo de ${es(o.comprar_por_debajo)} SAR: el valor intrínseco superaría al precio y pasaría a Comprar.`,
        `Precio por encima de ${es(o.vender_por_encima)} SAR: pasaría a Vender.`,
        'Crecimiento orgánico del 12-15 % en 2027 con flujo operativo del 85-95 % del beneficio: subiríamos el base.',
        'Renovación de un gran contrato (Absher, Muqeem, Tamm) con menos reparto: bajaríamos el base.',
        'Nueva compra a una empresa del PIF a un múltiplo alto: bajaríamos la nota de gobierno.',
      ],
      kpis_seguimiento: [
        { kpi: 'Ventas de los seis primeros productos', nivel_actual: '2.359 M SAR en el 1S26 (+14 %)', umbral_alerta: '< +8 %', por_que: 'El núcleo de tasas.' },
        { kpi: 'Flujo operativo / beneficio', nivel_actual: '35 % (1S26)', umbral_alerta: '< 85 % en el año', por_que: 'Cobro del Estado.' },
        { kpi: 'Días de cobro', nivel_actual: '166 (1S26)', umbral_alerta: '> 180', por_que: 'Circulante y caja.' },
        { kpi: 'Margen EBIT', nivel_actual: '23 % (1S26)', umbral_alerta: '< 21 %', por_que: 'Guía y mezcla con Thiqah.' },
        { kpi: 'Ventas del BPO', nivel_actual: '2.558 M SAR (2025)', umbral_alerta: 'Caída interanual', por_que: 'Primer síntoma de la IA.' },
      ],
      confianza: 'Media',
    },
  };
}
export default R;

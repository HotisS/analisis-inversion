// Resumen, síntesis y lecturas de valoración de Saudi Azm (corte 2026-10-19). Las cifras del motor se leen del último cálculo
// (../datos.json → calc); se calcula dos veces para que cuadren.
import fs from 'node:fs';
import * as O from './objetivo.mjs';

let c = null;
try { c = JSON.parse(fs.readFileSync(new URL('../datos.json', import.meta.url), 'utf8')).calc ?? null; } catch { c = null; }

const es = (x, d = 2) => (x === null || x === undefined ? 'n.d.' : (+x).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));
const pc = (x, d = 1) => `${x > 0 ? '+' : ''}${es(x, d)} %`;

let R = { resumen: null };
if (c?.recomendacion?.objetivo_12m?.filas) {
  const P = c.mercado.precio;
  const o = c.recomendacion.objetivo_12m;
  const v3 = o.selector?.v3_sin_selector ?? null, v2 = o.selector?.v2 ?? null;
  const dcf = c.dcf, inv = dcf.inverso ?? {};
  const esc = Object.fromEntries(c.escenarios.map((x) => [x.escenario, x]));
  const roic = c.rentabilidad.at(-1).roic_pct, wacc = dcf.wacc;
  const rel = c.recomendacion.relativo ?? {};
  const reco = c.recomendacion.regla;
  const vi = c.sintesis.valor_objetivo, viPot = c.sintesis.potencial_pct, viEsc = c.valor_ponderado, viEscPot = c.potencial_ponderado_pct;
  const regla = o.selector?.regla ?? o.version;
  const s = c.dcf.sostenibilidad ?? {};
  const evE = c.comparables.tabla.find((x) => x.es_objetivo)?.ev_ebitda_ltm;
  const compar = c.sintesis.tabla.find((x) => x.metodo.startsWith('Comparables'))?.valor;
  const limite = o.comprar_por_debajo;

  const objetivo_comentario = `El objetivo a 12 meses lo decide la ${regla}. Ponderado ${es(o.objetivo_ponderado)} SAR (${pc(o.rentabilidad_ponderada_pct)}) y base ${es(o.objetivo_base)} SAR (${pc(o.rentabilidad_base_pct)}), sin dividendo. El PER actual (${es(O.actual, 1)} veces nuestro BPA de los próximos doce meses) está por encima de la mediana de su historia adelantada (${es(O.mediana, 1)} veces), así que la regla común recorta el múltiplo base hacia ella y todo el potencial tiene que venir del crecimiento del BPA (+11 % de FY2027e a FY2028e). ${v2 ? `La v2 de control da ${pc(v2.rentabilidad_ponderada_pct)} ponderada y ${pc(v2.rentabilidad_base_pct)} en el base. ` : ''}No se llega a los umbrales de compra (15 % y 12 %); compraríamos por debajo de ${es(limite)} SAR, un ${es(Math.abs(limite / P * 100 - 100), 1)} % por debajo del cierre. El valor intrínseco (${es(vi)} SAR, ${pc(viPot)}) también queda por debajo del precio.`;

  const dcf_lectura = `El DCF da ${es(dcf.valor_accion)} SAR por acción (${pc(dcf.potencial_pct)} frente a ${es(P)} SAR) con un WACC del ${es(wacc)} % y un crecimiento terminal del 3 %; el valor terminal pesa el ${dcf.peso_terminal_pct} %. El DCF inverso dice que el precio descuenta que las ventas crezcan ≈ ${es(inv.crecimiento_implicito_pct, 1)} % anual en FY2027-FY2032e (frente al ${es(inv.crecimiento_base_pct, 1)} % del base) o un margen EBITDA del ${es(inv.margen_implicito_pct, 1)} % (frente al ${es(inv.margen_base_pct, 1)} %), y que paga una rentabilidad implícita del ${es(inv.rentabilidad_implicita_pct, 1)} % anual, por debajo del WACC. Es exigente: supone mantener durante años el ritmo de FY2026, con la mitad del trabajo subcontratada a vinculadas, un 75 % de clientes públicos y la IA abaratando lo que vende. Con la prima implícita del mercado (4,2 %) el DCF sube a ${es(rel.dcf)} SAR, todavía lejos del precio. La distancia no es de margen sino de crecimiento: el mercado paga a Azm como a una plataforma, y su historia es la de un integrador de proyectos.`;

  const escenarios_comentario = `La asimetría es desfavorable: el bajista (${es(esc.Bajista.valor)} SAR, ${pc(esc.Bajista.potencial_pct)}) recoge un frenazo del gasto público y la presión de la IA (margen EBITDA del 14 % al final); el alcista llega a ${es(esc.Alcista.valor)} SAR (${pc(esc.Alcista.potencial_pct)}), también por debajo del precio. Con probabilidades 25/50/25, el valor ponderado de los escenarios es de ${es(viEsc)} SAR (${pc(viEscPot)}) y el valor intrínseco de la síntesis, con los comparables, de ${es(vi)} SAR (${pc(viPot)}).`;

  const evc = c.comparables.implicito?.find((x) => x.metodo.startsWith('EV/EBITDA'));
  const valoracion_comentario = `Pesos previstos: DCF 40 %, escenarios 40 % y comparables 20 %; transacciones sin peso (no hay operaciones con múltiplos publicados; la compra de AZM FinTech no tiene precio). Los comparables no entran en la síntesis porque no hay EBITDA de los próximos 12 meses publicado para ellos, así que el valor intrínseco es la media de DCF y escenarios. Como contraste, la mediana de los comparables (${es(evc?.multiplo_mediana, 1)} veces el EBITDA de doce meses y ${es(O.compPer, 1)} veces el beneficio adelantado) daría ${es(evc?.valor_mediana)} SAR por acción. El puente parte del balance de junio de 2026 (fuente secundaria): préstamos (9,4 M) y arrendamientos (18,6 M) como deuda, indemnizaciones por cese (8,9 M), caja con fondos y sukuk (146,8 M) y asociadas e inversiones (11,9 M), sobre 60 M acciones [A10].`;

  const sostenibilidad_justificacion = `En parte. El crecimiento proyectado (${es(s.crecimiento_proyectado_pct ?? 14, 0)} % anual de media en FY2027-FY2032e, del 22 % al 8 %) está por debajo del histórico (+19 % anual en FY2022-FY2026) y casi no necesita capital: la reinversión es pequeña y el ROIC del ${es(roic, 1)} % lo financia. La cuota pasaría de ≈ 0,7 % a ≈ 0,9 % del mercado saudí de servicios informáticos (IMARC), una ganancia moderada [B1]. Pero la calidad no lo asegura: no hay foso (proyectos licitados, competidores 50-80 veces mayores), no hay poder de precios demostrado, el 75 % de las ventas depende del gasto público, la mitad del trabajo lo hacen empresas de los fundadores y la IA abarata justo lo que vende [B2, A5]. Por eso «En parte»: el crecimiento es posible, pero no está protegido.`;

  const sintesis = `**La recomendación y por qué.** ${reco}, con convicción media. A 12 meses, la regla común (${regla}) da ${pc(o.rentabilidad_ponderada_pct)} ponderada y ${pc(o.rentabilidad_base_pct)} en el base (objetivo de ${es(o.objetivo_ponderado)} SAR frente a ${es(P)}), lejos de los umbrales de compra (15 % y 12 %). El valor intrínseco es de ${es(vi)} SAR (${pc(viPot)}): el precio paga ${es(O.actual, 1)} veces nuestro BPA de doce meses (Elm, 16 veces el adelantado), por un integrador pequeño sin foso. Calidad: ROIC − WACC de ${es(roic - wacc, 1)} puntos (pasa), pero sostenibilidad «En parte» (no pasa): el ROIC es alto porque los clientes adelantan dinero y la mitad del trabajo la hacen subcontratistas vinculados, no por una ventaja duradera. Falla todo a la vez: rentabilidad a 12 meses, valor intrínseco y calidad; aunque el precio bajara al límite (${es(limite)} SAR), seguiría fallando la calidad. La convicción es media porque el negocio crece de verdad (+21 % de ventas y +36 % de beneficio en FY2026) y la dirección guía +40 %; la subirían unos términos limpios de la compra de AZM FinTech (en dinero y a un múltiplo razonable) y un margen sostenido del 20 %; la bajarían un pago en acciones a los fundadores o retrasos de cobro públicos. Regla 13: retrasa hasta conocer los términos de AZM FinTech.

**El negocio.** Saudi Azm desarrolla y opera plataformas digitales para ministerios, entidades semipúblicas (75 % de las ventas) y empresas en Arabia Saudí, con consultoría, reventa de software y algunas plataformas propias (Wasl) [A5, B3]. Margen EBITDA del 17 % y ROIC del ${es(roic, 1)} %, con poco capital propio.

**Sector y ciclo.** Mercado de servicios informáticos saudí de ≈ 45.000 M SAR que crece ≈ 7 % al año (IMARC), empujado por la Visión 2030; fragmentado, con grandes estatales (Elm, solutions by stc) que se quedan los grandes contratos [B1, B2]. Riesgo estructural: la IA generativa abarata el desarrollo y la consultoría (exposición alta, amenaza).

**Finanzas.** Ventas de 152,6 M SAR en FY2022 a 307,4 M en FY2026 (+19 % anual); beneficio de 19,1 M a 51,0 M [A4, A8]. Caja neta de ≈ 120 M; flujo operativo muy irregular por los cobros públicos (1,6 M en FY2024, 108,9 M en FY2025); sin dividendos y con recompras para empleados [A2, A1, A10].

**Equipo y gobierno.** Dos fundadores con ≈ 41 % dirigen desde 2017 y son dueños de los subcontratistas que ejecutan ≈ 50 % de las ventas (AZM FinTech, Azm Digital); la empresa negocia comprarles AZM FinTech sin precio fijado y la junta del 5-nov vota 191,6 M de contratos marco con sus empresas [A5, C3, C4].

**Valoración.** DCF de ${es(dcf.valor_accion)} SAR con WACC del ${es(wacc)} %; cotiza a ${es(evE, 1)} veces el EBITDA de FY2026, frente a 11-17 de las grandes saudíes. Un analista (GIB, sobreponderar) [D10]. Tamaño (≈ 470 M USD) y liquidez (≈ 1,4 M USD al día) bastan para una posición pequeña desde IBKR, con orden limitada [D2, D11].

**Riesgos y catalizadores.** Dominantes: IA, gasto público y vinculadas. Bajista de ${es(esc.Bajista.valor)} SAR. Catalizadores: junta del 5-nov (recompra y contratos), 1T FY2027 (≈ nov-2026), términos de AZM FinTech y arranque de Wasl.

**Qué cambiaría la decisión.** Compraríamos por debajo de ${es(limite)} SAR solo si además se aclarara el gobierno (compra de AZM FinTech en términos limpios y menos subcontratación vinculada); venderíamos por encima de ${es(o.vender_por_encima)} SAR.`;

  R = {
    objetivo_comentario, dcf_lectura, escenarios_comentario, valoracion_comentario, sostenibilidad_justificacion,
    resumen: {
      recomendacion: reco, conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
      sintesis,
      tesis: `Saudi Azm es un integrador informático saudí pequeño que crece rápido (+19 % anual en cuatro años) con contratos de la Administración y casi sin capital, porque los clientes adelantan dinero y la mitad del trabajo lo subcontrata a empresas de sus fundadores [A8, A5].\n\nEl precio (${es(P)} SAR, ${es(c.mercado.capitalizacion, 0)} M de capitalización) paga ${es(O.actual, 1)} veces el beneficio de doce meses: descuenta años de crecimiento alto sin foso que lo proteja, con un 75 % de ventas públicas, la IA abaratando lo que vende y un gobierno con conflictos de interés. Valor intrínseco de ${es(vi)} SAR y ${pc(o.rentabilidad_ponderada_pct)} a 12 meses: no es una compra.`,
      vision_diferencial: {
        mercado_descuenta: 'Que Azm sigue creciendo al 20-40 % muchos años (la guía de +40 % de beneficio, la alianza con Elm, Wasl) y que merece un múltiplo de plataforma.',
        nuestra_vision: 'Un integrador de proyectos públicos sin foso, con crecimiento real pero no protegido, márgenes expuestos a la IA y a la relicitación, y un reparto de valor con los fundadores aún por aclarar.',
        por_que: 'La mitad de las ventas la ejecutan vinculadas, los intangibles capitalizados saltaron ×5 en un año y las grandes saudíes, más rentables y con más foso, cotizan a la mitad [A5, A10, D3].',
      },
      a_favor: [
        '**Crecimiento**: ventas +21 % y beneficio +36 % en FY2026; 4T +36 % [A8, A9].',
        `**Rentabilidad**: ROIC del ${es(roic, 1)} % y caja neta de ≈ 120 M [A10].`,
        '**Cartera**: más de 300 M y guía de +40 % de beneficio en FY2027 [D9].',
        '**Opciones**: Wasl con licencia de SAMA y alianza con Elm [B7, B5].',
        '**Momento del mercado**: +16 % en un año con el índice saudí −11 % [D1].',
      ],
      en_contra: [
        `**Precio**: ${es(O.actual, 1)} veces el BPA de doce meses; DCF de ${es(dcf.valor_accion)} SAR.`,
        '**Vinculadas**: ≈ 50 % de las ventas subcontratadas a empresas de los fundadores; compra de AZM FinTech sin precio [A5, C3].',
        '**IA**: abarata el desarrollo y la consultoría (≈ 75 % de las ventas).',
        '**Gasto público**: 75 % de las ventas; cobros por hitos [A5, A2].',
        '**Calidad del beneficio**: 29,1 M de desarrollo capitalizado y 16,6 M de pagos en acciones [A10, A9].',
      ],
      que_vigilar: 'La tesis depende de cuánto valor se queda el accionista frente a los fundadores y de si el margen aguanta la IA. Las señales: los términos de la compra de AZM FinTech, el peso de las compras a vinculadas en cada intermedio, el margen bruto (32 % en FY2026), los activos de contrato frente a las ventas y la capitalización de desarrollo.',
      cambiaria_recomendacion: [
        `Precio por debajo de ${es(limite)} SAR: la regla a 12 meses daría compra, pero seguiría fallando la calidad.`,
        `Precio por encima de ${es(o.vender_por_encima)} SAR: Vender.`,
        'Compra de AZM FinTech en dinero a un múltiplo razonable y menos subcontratación vinculada: revisaríamos la sostenibilidad.',
        'Pago a los fundadores con acciones nuevas o retrasos de cobro públicos: bajaríamos el base.',
        'Resultados del 1T FY2027 por encima de 20 M con margen bruto > 33 %: subiríamos el base.',
      ],
      kpis_seguimiento: [
        { kpi: 'Compras a vinculadas / ventas', nivel_actual: '≈ 52 % (9M FY2026)', umbral_alerta: '> 55 %', por_que: 'Valor que sale a los fundadores.' },
        { kpi: 'Ventas a la Administración / total', nivel_actual: '75,5 % (9M FY2026)', umbral_alerta: '> 80 %', por_que: 'Dependencia del gasto público.' },
        { kpi: 'Margen bruto', nivel_actual: '32,5 % (FY2026)', umbral_alerta: '< 28 %', por_que: 'IA y precios.' },
        { kpi: 'Activos de contrato + clientes / ventas', nivel_actual: '44 % (FY2026)', umbral_alerta: '> 55 %', por_que: 'Cobros públicos.' },
        { kpi: 'Intangibles capitalizados en el año', nivel_actual: '29,1 M (FY2026)', umbral_alerta: '> 35 M', por_que: 'Calidad del beneficio.' },
      ],
      confianza: 'Media',
    },
  };
}
export default R;

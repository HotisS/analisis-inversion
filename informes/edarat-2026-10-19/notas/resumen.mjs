// Resumen, síntesis y lecturas de valoración de Edarat (corte 2026-10-19). Las cifras del motor se leen del último cálculo
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
  const v3 = o.selector?.v3_sin_selector, v2 = o.selector?.v2;
  const f = Object.fromEntries(o.filas.map((x) => [x.escenario, x]));
  const dcf = c.dcf, inv = dcf.inverso;
  const esc = Object.fromEntries(c.escenarios.map((x) => [x.escenario, x]));
  const roic = c.rentabilidad.at(-1).roic_pct, wacc = dcf.wacc;
  const rel = c.recomendacion.relativo;
  const reco = c.recomendacion.regla;
  const vi = c.sintesis.valor_objetivo, viPot = c.sintesis.potencial_pct, viEsc = c.valor_ponderado, viEscPot = c.potencial_ponderado_pct;
  const regla = o.selector?.regla ?? o.version;

  const objetivo_comentario = `El objetivo a 12 meses lo decide la ${regla}: con tres años de historia útil, el selector toma la más baja de v3 y v2. Ponderado ${es(o.objetivo_ponderado)} SAR (${pc(o.rentabilidad_ponderada_pct)}) y base ${es(o.objetivo_base)} SAR (${pc(o.rentabilidad_base_pct)}), sin dividendo. La v3 daría ${pc(v3?.rentabilidad_ponderada_pct)} ponderada y ${pc(v3?.rentabilidad_base_pct)} en el base: su base solo baja el PER actual (${es(O.actual, 1)} veces nuestro BPA de 2027e) un 10 % y cobra el salto del BPA de 2028e (+31 % con las GPU), mientras el bajista vuelve al mínimo de la historia (${es(O.minimo, 1)} veces). La v2 parte de la mediana al cierre (${es(O.v2.mediana, 1)} veces). Ninguna llega a los umbrales de compra (15 % y 12 %) y el valor intrínseco (${es(vi)} SAR) es un ${es(Math.abs(viPot), 0)} % menor que el precio. Con el 2022 incluido (8,7 veces), la v3 decidiría y daría menos.`;

  const dcf_lectura = `El DCF da ${es(dcf.valor_accion)} SAR por acción, un ${es(Math.abs(dcf.potencial_pct), 1)} % menos que el precio, con un WACC del ${es(wacc)} % y un crecimiento terminal del 3 %; el valor terminal pesa el ${dcf.peso_terminal_pct} %. El DCF inverso no encuentra un crecimiento ni un margen razonables que justifiquen ${es(P)} SAR (${inv.margen_implicito_texto ?? 'sin solución'}): con un circulante del 32 % de las ventas y las GPU que reponer, crecer más consume casi todo el flujo adicional. Lo que sí sale es la rentabilidad implícita: el precio solo cuadra si el accionista se conforma con un ${es(inv.rentabilidad_implicita_pct, 1)} % anual, apenas por encima de la tasa libre en dólares (5,61 %). Con la prima implícita del mercado (4,2 %) el DCF sube a ${es(rel.dcf)} SAR. Ni con un WACC de 10 % se acerca al precio: la distancia no es de tasa, es de flujo de caja.`;

  const escenarios_comentario = `La asimetría en valor intrínseco es muy negativa: incluso el alcista (${es(esc.Alcista.valor)} SAR, ${pc(esc.Alcista.potencial_pct)}) queda lejos del precio, y el bajista (${es(esc.Bajista.valor)} SAR, ${pc(esc.Bajista.potencial_pct)}) recoge un MIS que frena y unas GPU medio vacías. Con probabilidades 25/50/25, el valor ponderado de los escenarios (${es(viEsc)} SAR) es un ${es(Math.abs(viEscPot), 1)} % inferior al precio, y el valor intrínseco de la síntesis, con los comparables, un ${es(Math.abs(viPot), 1)} % (${es(vi)} SAR).`;

  const valoracion_comentario = `Pesos: DCF 40 %, escenarios 40 % y comparables 20 %; transacciones sin peso (la única es la venta privada del 10 % por MIS en 2024, a ≈ 81 SAR por acción de hoy). Los comparables (mediana de 17 veces el EBITDA y 16,5 veces el beneficio) dan valores parecidos al DCF: el mercado no paga en ningún sitio 40 veces el EBITDA por ingeniería o nube. El puente parte del balance de junio de 2026: préstamo, arrendamientos e indemnizaciones por cese (11,0 M SAR) como deuda, caja de 36,2 M y la asociada (0,4 M) [D7]. La deuda del pedido de GPU (127,5 M) aún no está en el balance, pero su capex sí está en el DCF.`;

  const sintesis = `**La recomendación y por qué.** ${reco}, con convicción media. A 12 meses, la regla común da ${pc(o.rentabilidad_ponderada_pct)} ponderada y ${pc(o.rentabilidad_base_pct)} en el base (objetivo de ${es(o.objetivo_ponderado)} SAR frente a ${es(P)}), lejos de los umbrales de compra, y el valor intrínseco es de ${es(vi)} SAR (${pc(viPot)}): el precio pide 43 veces nuestro BPA de 2027e, que ya incluye el salto de las GPU. No es Vender (la ponderada no llega a −10 %) porque el beneficio crece de verdad y el múltiplo puede sostenerse mientras lleguen contratos de MIS. Calidad: ROIC del ${es(roic, 1)} % frente a un WACC del ${es(wacc)} %, pero sostenibilidad «En parte»: no pasa el filtro de calidad. La convicción es media porque las dos medidas apuntan al mismo sitio (sin recorrido en valor y poco a 12 meses), pero la historia de múltiplos es corta y el precio de una acción tan poco líquida puede alejarse mucho del valor durante años; subirían la convicción un cliente grande distinto de MIS y contratos de GPU firmados, y la bajaría un frenazo de MIS. Solo compraríamos por debajo de ${es(o.comprar_por_debajo)} SAR.

**El negocio.** Edarat diseña y supervisa centros de datos (60 % de las ventas) y alquila nube local y espacio en centros de datos (40 %) en Arabia Saudí [A3]. MIS, su accionista del 30 %, compró el 55 % de las ventas del 1S26 y le debe 56,5 M SAR [A2]. ROIC alto (${es(roic, 1)} %) porque la ingeniería apenas necesita capital; sostenibilidad del crecimiento «En parte»: sin foso, con la nube al 7,6 % de margen bruto y con 150 M SAR de GPU sin clientes anunciados.

**Sector y ciclo.** Centros de datos de Arabia Saudí en plena expansión: 7.900 M SAR en 2025 y +13 % anual (Mordor), colocation al +34 % (Arizton) [B1, B2]. La IA y la soberanía de datos tiran; los hiperescaladores llegan y aprietan precios.

**Finanzas.** Ventas de 37 a 192 M SAR en 2021-2025 (+53 % anual) y beneficio de 6,5 a 36,3 M; 1S26 +22 % y +30 % [A1, A3, A6]. Caja neta de 30 M a jun-26, que se convertirá en deuda con las GPU [D7, D11]. Flujo operativo irregular (28-92 % del beneficio) por el cobro de MIS.

**Equipo y gobierno.** Fundadores al mando desde 2008 con ≈ 13 % cada uno (dato de 2022); consejo nuevo con mayoría independiente desde sep-2026 y sin consejero de MIS [C1, C3]. Alertas: MIS es cliente, deudor, accionista y avalista; el consejero delegado tiene parte de una proveedora vinculada (Edarat Lebanon) [C4].

**Valoración.** DCF de ${es(dcf.valor_accion)} SAR con WACC del ${es(wacc)} %; el DCF inverso no encuentra crecimiento razonable que justifique el precio. Cotiza a ${es(c.comparables.tabla.find((x) => x.es_objetivo)?.ev_ebitda_ltm, 1)} veces el EBITDA de doce meses frente a una mediana de 17 de los comparables. Sin analistas que la sigan.

**Riesgos y catalizadores.** Dominante: MIS (bajista de ${es(esc.Bajista.valor)} SAR); después, las GPU y la liquidez (≈ 1 M SAR al día). Catalizadores: la entrega de las GPU (4T26-1T27), los resultados de 2026 (≈ 9-feb-2027) y el paso al mercado principal. Regla 13: no cambia (subida de un año con causa en resultados y contratos; sin colocación anunciada).

**Qué cambiaría la decisión.** Compraríamos por debajo de ${es(o.comprar_por_debajo)} SAR; venderíamos por encima de ${es(o.vender_por_encima)} SAR o si MIS frenara sus proyectos sin otros clientes que lo compensen.`;

  R = {
    objetivo_comentario, dcf_lectura, escenarios_comentario, valoracion_comentario,
    resumen: {
      recomendacion: reco, conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
      sintesis,
      tesis: `Edarat es una pequeña ingeniería saudí de centros de datos con una nube local, que ha multiplicado sus ventas por cinco en cuatro años (192 M SAR en 2025) gracias, sobre todo, a los proyectos de MIS, su accionista del 30 % [A3, A2]. Ahora apuesta 150 M SAR en GPU para alquilar capacidad de IA [B6].\n\nEl precio (${es(P)} SAR, 2.079 M de capitalización) paga 51 veces el beneficio de doce meses y 43 veces nuestro BPA de 2027e. El DCF (${es(dcf.valor_accion)} SAR) y los comparables dicen que es caro; a 12 meses, la regla común da ${pc(o.rentabilidad_ponderada_pct)}. Crece de verdad, pero con un cliente vinculado, sin foso y con poca liquidez.`,
      vision_diferencial: {
        mercado_descuenta: 'Que Edarat será una plataforma de IA y centros de datos que crece al 30-40 % durante años: a 43 veces el BPA de 2027e y 40 veces el EBITDA, el precio no tiene solución en el DCF con un crecimiento razonable.',
        nuestra_vision: 'Un buen negocio de ingeniería con poco capital, muy dependiente de MIS, que ahora se convierte en uno de capital intensivo (GPU) sin clientes anunciados; crece, pero la calidad del crecimiento no está probada.',
        por_que: 'El 55 % de las ventas del 1S26 a MIS, el margen bruto de la nube en el 7,6 % y la amortización de 30 M al año de las GPU, seis veces la de 2025 [A2, D11].',
      },
      a_favor: [
        '**Crecimiento real**: ventas +53 % anual en 2021-2025 y +22 % en el 1S26 [A3, A6].',
        '**ROIC alto** (≈ 59 % en 2025) con poco capital en ingeniería [A3].',
        '**Contrato de 200 MW** de MIS (197,8 M SAR con IVA) que da trabajo para 2027-2028 [D10].',
        '**Mercado en expansión**: centros de datos +13 % anual y colocation +34 % [B1, B2].',
        '**Consejo con mayoría independiente** desde sep-2026 [C1].',
      ],
      en_contra: [
        '**MIS**: 55 % de las ventas del 1S26, 56,5 M por cobrar, accionista del 30 % [A2].',
        '**Valoración**: 51 veces el beneficio y DCF de ≈ 71 SAR [D3].',
        '**GPU**: 150 M SAR, más que el patrimonio, sin clientes anunciados [D11].',
        '**Liquidez**: ≈ 1 M SAR al día en Nomu, solo para inversores cualificados [D1].',
        '**Nube sin margen**: 7,6 % bruto en el 1S26 [A2].',
      ],
      que_vigilar: 'La tesis depende de dos cosas: que MIS siga adjudicando y pagando, y que las GPU se alquilen. Las señales están en el peso de MIS en las ventas y su saldo pendiente, en los primeros contratos de GPU (4T26-1T27) y en el margen bruto de la nube: si MIS baja del 30 % sin otros clientes que lo compensen, o las GPU llegan sin contratos, el bajista gana peso.',
      cambiaria_recomendacion: [
        `Precio por debajo de ${es(o.comprar_por_debajo)} SAR: el valor intrínseco superaría al precio.`,
        `Precio por encima de ${es(o.vender_por_encima)} SAR: pasaría a Vender.`,
        'Contratos de GPU firmados a buen precio y clientes de ingeniería distintos de MIS: subiríamos el base y la sostenibilidad.',
        'MIS por debajo del 30 % de las ventas sin sustituto, o retrasos en sus pagos: bajaríamos el base.',
        'Colocación de MIS o de los fundadores al pasar al mercado principal: revisaríamos la regla 13.',
      ],
      kpis_seguimiento: [
        { kpi: 'Ventas a MIS / total', nivel_actual: '55 % (1S26)', umbral_alerta: '> 60 % o < 30 % sin sustituto', por_que: 'Concentración y margen.' },
        { kpi: 'Saldo a cobrar de MIS', nivel_actual: '56,5 M SAR (jun-26)', umbral_alerta: '> 70 M', por_que: 'Caja y riesgo de crédito.' },
        { kpi: 'Margen bruto de la nube', nivel_actual: '7,6 % (1S26)', umbral_alerta: '< 10 % otro semestre', por_que: 'Competencia y coste de capacidad.' },
        { kpi: 'Contratos de GPU', nivel_actual: 'Ninguno anunciado', umbral_alerta: 'Ninguno al 1T27', por_que: '150 M SAR de inversión.' },
        { kpi: 'Volumen medio diario', nivel_actual: '≈ 3.600 acciones', umbral_alerta: '< 2.000', por_que: 'Liquidez.' },
      ],
      confianza: 'Media',
    },
  };
}
export default R;

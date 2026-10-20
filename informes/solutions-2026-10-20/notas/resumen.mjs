// Resumen, síntesis y lecturas de valoración de solutions by stc (corte 2026-10-20). Las cifras del motor se leen del último cálculo
// (copia del calc de datos.json en el scratchpad tras cada `calcular-empresa.mjs`; se calcula dos veces para que cuadren).
import fs from 'node:fs';
import * as O from './objetivo.mjs';

const RUTA = '/tmp/claude-0/-home-user-analisis-inversion/fe7d36be-f320-582f-ada1-36b66fec5b44/scratchpad/sol/calc.json';
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
  const viArriba = viPot >= 0;
  const v2b = o.v2?.rentabilidad_base_pct, v2p = o.v2?.rentabilidad_ponderada_pct;

  const objetivo_comentario = `El objetivo a 12 meses (ponderado ${es(o.objetivo_ponderado)} SAR, ${pc(o.rentabilidad_ponderada_pct)} con el dividendo; base ${es(o.objetivo_base)} SAR, ${pc(o.rentabilidad_base_pct)}) sale de aplicar al BPA de 2028e un PER que la regla deja subir un 10 % desde el actual (${es(O.actual, 1)} veces nuestro BPA de 2027e), muy por debajo de su mediana adelantada (${es(O.mediana, 1)} veces, de los años de crecimiento del 9-25 %). El valor intrínseco es de ${es(vi)} SAR, un ${es(Math.abs(viPot), 1)} % ${viArriba ? 'por encima' : 'por debajo'} del precio. El alcista (${es(f.Alcista.precio)} SAR) aplica ${es(f.Alcista.multiplo, 1)} veces a un BPA cercano al del consenso; el bajista (${es(f.Bajista.precio)} SAR), ${es(f.Bajista.multiplo, 1)} veces a un BPA con 2 puntos menos de margen. La v2 de control da ${pc(v2p)} ponderada y ${pc(v2b)} en el base. Lectura: el múltiplo ya es bajo frente a su historia, pero la historia viene de un régimen de crecimiento y de márgenes que la IA y el menor gasto público ponen en duda.`;

  const dcf_lectura = `El DCF da ${es(dcf.valor_accion)} SAR por acción, un ${es(Math.abs(dcf.potencial_pct), 1)} % ${dcf.potencial_pct >= 0 ? 'más' : 'menos'} que el precio, con un WACC del ${es(wacc)} % y un crecimiento terminal del 3 %; el valor terminal pesa el ${dcf.peso_terminal_pct} %. El DCF inverso dice que el precio de ${es(P)} SAR descuenta un crecimiento del ${es(inv.crecimiento_implicito_pct, 1)} % anual en 2027-2032e (nuestro base: ${es(inv.crecimiento_base_pct, 1)} %) o un margen EBITDA terminal del ${es(inv.margen_implicito_pct, 1)} % (base: ${es(inv.margen_base_pct, 1)} %; máximo histórico, 16,1 % en 2024), o una rentabilidad implícita del ${es(inv.rentabilidad_implicita_pct, 1)} %. Con la prima implícita del mercado (4,2 %) el DCF sube a ${es(rel.dcf)} SAR. El circulante pesa: con el 11 % de las ventas (frente a un circulante negativo hasta 2024), cada año de crecimiento retiene caja; si los cobros volvieran a 2023-2024, el DCF subiría con fuerza.`;

  const escenarios_comentario = `Con probabilidades 25/50/25, el valor ponderado de los escenarios es de ${es(viEsc)} SAR (${pc(viEscPot)}). El bajista (${es(esc.Bajista.valor)} SAR, ${pc(esc.Bajista.potencial_pct)}) recoge la IA en digital y upsource, la Administración que recorta y stc que aprieta precios; el alcista (${es(esc.Alcista.valor)} SAR, ${pc(esc.Alcista.potencial_pct)}), la infraestructura de IA que acelera. El valor intrínseco de la síntesis, con los comparables, es de ${es(vi)} SAR (${pc(viPot)}).`;

  const valoracion_comentario = `Pesos: DCF 40 %, escenarios 40 % y comparables 20 %; transacciones sin peso (solo las compras propias, sin múltiplo). Los comparables (mediana de PER de ≈ 10 veces) castigan a los integradores europeos y a Cognizant, con menos crecimiento. El puente parte del balance de junio de 2026: préstamos (873 M SAR), arrendamientos estimados (≈ 347 M) e indemnizaciones por cese (734 M) como deuda; caja y murabahas (1.566 M) y la participación en Devoteam Middle East (346 M, valor en libros) [D12, A1].`;

  const sintesis = `**La recomendación y por qué.** ${reco}, con convicción media. La rentabilidad a 12 meses con la regla común es de ${pc(o.rentabilidad_ponderada_pct)} ponderada y ${pc(o.rentabilidad_base_pct)} en el base (objetivo de ${es(o.objetivo_ponderado)} SAR frente a ${es(P)}), porque el PER ha caído a ${es(O.actual, 1)} veces nuestro BPA de 2027e desde 17-26 veces en 2021-2025. Pero el valor intrínseco es de ${es(vi)} SAR (${pc(viPot)}): sin valor real por encima del precio no hay compra, aunque la rentabilidad a 12 meses pase los umbrales (15 % ponderada y 12 % en el base). La v2 de control da ${pc(v2b)} en el base, por debajo del 12 %. La convicción es media: el precio ya recoge mucho miedo (IA, gasto público, márgenes), pero la conversión de beneficio en caja se rompió en 2025 y el margen depende de stc. La subiría un flujo operativo de vuelta al 90-100 % del beneficio; la bajaría otro trimestre con digital y upsource a la baja. ${o.comprar_por_debajo ? `Compraríamos por debajo de ${es(o.comprar_por_debajo)} SAR.` : ''}

**El negocio.** solutions es la mayor integradora de TI de Arabia Saudí (22,7 % de cuota según IDC): monta y opera centros de datos, redes, nube, ciberseguridad, centros de contacto y aplicaciones para la Administración (41 % de las ventas), su matriz stc (32 %) y empresas privadas (26 %) [B3, A8]. ROIC del ${es(roic, 1)} % frente a un WACC del ${es(wacc)} %, por la poca inversión que necesita. Sostenibilidad del crecimiento: «Sí», por debajo del mercado; el riesgo es de margen.

**Sector y ciclo.** Expansión madura: el gasto público baja (del 29,2 % al 25,7 % del PIB en 2027e) y frena las adjudicaciones, mientras la inversión en centros de datos e IA y el sector privado crecen [B4, B8]. La IA es mixta y con exposición alta: amenaza digital (−23 % en el 2T26) y upsource (estancada) y alimenta la infraestructura, de menos margen [A8].

**Finanzas.** Ventas de 7.208 a 12.730 M SAR en 2021-2025 y beneficio de 833 a 1.503 M, con el crecimiento frenando (+5,5 % en 2025) y el margen bruto del 23,5 % al 21,0 % [A2]. Alerta: flujo operativo negativo en 2025 (−100,7 M) por los cobros públicos; recuperado en el 1S26 (flujo libre de 315 M) [A2, A3]. Caja neta de 693 M sin arrendamientos [D12].

**Equipo y gobierno.** stc controla el 79 %, es el primer cliente y cobra regalías de marca redefinidas en 2026; 801,6 M de la caja están en stc Bank [C9, C5, C6, A3]. Equipo de stc con la guía cumplida en 2023-2024 y a medias en 2025.

**Valoración.** DCF de ${es(dcf.valor_accion)} SAR con WACC del ${es(wacc)} %; el precio descuenta un crecimiento del ${es(inv.crecimiento_implicito_pct, 1)} % anual. Cotiza a ${es(yo?.per_ntm, 1)} veces el beneficio de los próximos doce meses, sobre la mediana de los comparables (≈ 10). Nuestro BPA de 2028e (${es(O.bpa.Base)}) queda un 8 % por debajo del consenso (7,95) por margen; su objetivo medio (127,30 SAR) queda ${127.3 > esc.Alcista.valor ? 'por encima' : 'dentro'} de nuestro rango intrínseco (${es(esc.Bajista.valor)}-${es(esc.Alcista.valor)} SAR) y ${127.3 > f.Alcista.precio ? 'por encima' : 'dentro'} del de 12 meses (${es(f.Bajista.precio)}-${es(f.Alcista.precio)} SAR) [D2].

**Riesgos y catalizadores.** Dominantes: la IA sobre digital y centros de contacto y la dependencia de stc y de la Administración (bajista de ${es(esc.Bajista.valor)} SAR). Catalizador: resultados del 3T26 hacia el 28-oct. La caída del último mes (−17,7 %) es del mercado saudí y del sector, sin noticia propia (regla 13: no cambia).

**Qué cambiaría la decisión.** ${o.comprar_por_debajo ? `Por debajo de ${es(o.comprar_por_debajo)} SAR pasaría a Comprar` : 'Un precio más bajo'}; ${o.vender_por_encima ? `por encima de ${es(o.vender_por_encima)} SAR, a Vender` : ''}. Subiríamos el base con el flujo operativo de vuelta al 90-100 % del beneficio y el margen bruto estable; lo bajaríamos con stc apretando precios o regalías.`;

  R = {
    objetivo_comentario, dcf_lectura, escenarios_comentario, valoracion_comentario,
    resumen: {
      recomendacion: reco, conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
      sintesis,
      tesis: `solutions by stc es la mayor integradora de TI de Arabia Saudí: centros de datos, redes, nube, ciberseguridad, centros de contacto y aplicaciones para la Administración, su matriz stc (79 % del capital) y empresas privadas, con un margen EBITDA del 15-16 %, poco capital y caja neta [A2, C9].\n\nEl precio (${es(P)} SAR) ha caído un 29 % en un año y el PER a ${es(O.actual, 1)} veces el BPA de 2027e, frente a 17-26 veces en 2021-2025: la regla común da ${pc(o.rentabilidad_ponderada_pct)} a 12 meses. El DCF (${es(dcf.valor_accion)} SAR) pesa la ruptura de la caja de 2025, la IA sobre las horas que vende y la dependencia de stc y del gasto público.`,
      vision_diferencial: {
        mercado_descuenta: `Los analistas esperan un BPA de 7,95 SAR en 2028e (+10 % anual) y un objetivo de 127,30 SAR; el precio, en cambio, descuenta un crecimiento del ${es(inv.crecimiento_implicito_pct, 1)} % anual con nuestro WACC [D2].`,
        nuestra_vision: 'Las ventas crecen con la infraestructura de IA y el sector privado, pero el margen baja algo por la mezcla y la IA, y el circulante no vuelve a ser negativo: un BPA un 8 % por debajo del consenso.',
        por_que: 'Servicios digitales −23 % en el 2T26, upsource estancada, margen bruto del 23,5 % al 21 % en dos años y flujo operativo negativo en 2025 [A8, A2].',
      },
      a_favor: [
        '**Número 1 de la TI saudí** (22,7 % de cuota) con el canal de stc y homologaciones de ciberseguridad [B3].',
        '**Infraestructura de IA**: contrato de supercomputación con Aramco (1.400 M SAR) y centro de datos de Center3 [B8, B6].',
        '**Poco capital** y caja neta de 693 M SAR [A2, D12].',
        `**PER de ${es(O.actual, 1)} veces** nuestro BPA de 2027e, el más bajo desde la salida a bolsa [D1].`,
        '**2026 por encima del consenso** en los dos trimestres y guía reiterada [A8, A9].',
      ],
      en_contra: [
        '**IA**: servicios digitales −23 % en el 2T26 y centros de contacto estancados [A8].',
        '**stc**: accionista, primer cliente y dueño de la marca; precios de transferencia y caja en stc Bank [C5, A3].',
        '**Gasto público a la baja** y cobros más lentos: flujo operativo negativo en 2025 [B4, A2].',
        '**Margen bruto a la baja**: del 23,5 % (2023) al 21,0 % (2025) [A2].',
        '**Flotante del 20 %** y sin opa posible sin stc [C9].',
      ],
      que_vigilar: 'La tesis depende del margen y de la caja. La señal está en el margen bruto del grupo (21 % en 2025), en las ventas de servicios digitales y de upsource (las más expuestas a la IA) y en el flujo operativo frente al beneficio: si el margen bruto baja del 20 % con la caja atascada, el bajista gana peso; si el flujo vuelve al 90-100 % del beneficio, el DCF se queda corto.',
      cambiaria_recomendacion: [
        o.comprar_por_debajo ? `Precio por debajo de ${es(o.comprar_por_debajo)} SAR: pasaría a Comprar.` : 'Precio más bajo con el valor intrínseco por encima.',
        o.vender_por_encima ? `Precio por encima de ${es(o.vender_por_encima)} SAR: pasaría a Vender.` : 'Precio mucho más alto: Vender.',
        'Flujo operativo de 2026 por encima del 90 % del beneficio: subiríamos el base.',
        'Servicios digitales y upsource a la baja otros dos trimestres: bajaríamos el margen.',
        'Cambios en regalías o precios con stc en contra de solutions: bajaríamos la nota de gobierno.',
      ],
      kpis_seguimiento: [
        { kpi: 'Margen bruto del grupo', nivel_actual: '21,0 % (2025)', umbral_alerta: '< 20 %', por_que: 'Mezcla e IA.' },
        { kpi: 'Ventas de servicios digitales', nivel_actual: '−23 % (2T26)', umbral_alerta: 'Caída en el año', por_que: 'Primer síntoma de la IA.' },
        { kpi: 'Flujo operativo / beneficio', nivel_actual: '−7 % (2025); 61 % (1S26)', umbral_alerta: '< 60 % en el año', por_que: 'Cobro público.' },
        { kpi: 'Deudas públicas de más de un año', nivel_actual: '380 M SAR (2025)', umbral_alerta: '> 500 M', por_que: 'Calidad del cobro.' },
        { kpi: 'Peso de stc en las ventas', nivel_actual: '32 % (1S26)', umbral_alerta: 'Caída sin sustituto', por_que: 'Dependencia de la matriz.' },
      ],
      confianza: 'Media',
    },
  };
}
export default R;

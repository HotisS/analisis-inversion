// Resumen, síntesis, lecturas de valoración, riesgos, catalizadores, preguntas y contexto de bolsa de Salik (corte 2026-10-21).
// Las cifras del motor se leen del último cálculo guardado en ../datos.json (se calcula dos veces para que cuadren).
import fs from 'node:fs';
import O from './objetivo.mjs';

let c = null;
try { c = JSON.parse(fs.readFileSync(new URL('../datos.json', import.meta.url), 'utf8')).calc ?? null; } catch { c = null; }

const es = (x, d = 2) => (x === null || x === undefined ? 'n.d.' : (+x).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));
const pc = (x, d = 1) => `${x > 0 ? '+' : ''}${es(x, d)} %`;
const bpa = Object.fromEntries(O.casos.map((x) => [x.escenario, x.beneficio_por_accion]));

// Regla 13. Variaciones de calendario con los cierres de Yahoo (la serie del DFM tiene sesiones sin dato; la herramienta, que cuenta
// 252 sesiones, da −20,0 % a 12 meses; de cierre a cierre de calendario, 5,81 → 5,14, es −11,5 %; la herramienta tomó 5,12, una cotización anterior al cierre definitivo).
const bolsa_contexto = {
  movimiento: {
    fecha: '2026-10-21', var_1m_pct: -3.9, var_3m_pct: -7.7, var_6m_pct: -9.3, var_12m_pct: -11.5,
    dist_max_52s_pct: -24.2, dist_min_52s_pct: 3.6, dist_max_historico_pct: -24.2, tendencia: 'bajista', volatilidad_60d_pct: 22,
    avisos: [
      'Cerca de mínimos de 52 semanas (4 % sobre el mínimo del 31-mar-2026) y un 11 % bajo la media de 200 sesiones [D1].',
      'La serie de Yahoo del DFM tiene sesiones sin dato: las variaciones son de calendario (cierres del 21-sep, 21-jul, 21-abr-2026 y 21-oct-2025); contando 252 sesiones, la herramienta da −20,0 % a 12 meses (con 5,12 AED) [D1].',
      'El precio de hoy ya no lleva el dividendo a cuenta de 9,39 fils (fecha ex el 15-oct): 5,35 → 5,21 AED ese día [D1, D9].',
    ],
  },
  movimientos_fuertes: [
    { periodo: 'feb-mar 2026', var_pct: -20.6, causa: 'De 6,41 AED (26-feb) a 5,09 AED (31-mar): guerra de EE. UU. e Israel con Irán desde el 28-feb; el índice de Dubái perdió ≈ 16 % en marzo y el DFM cerró dos sesiones [D1, P5]. Salik no dio noticia propia; luego atribuyó al conflicto la caída de viajes del 1S26 (−9,5 %) [A4].', veredicto: 'no cambia', condicion: 'El 2026e ya recoge la guía rebajada (−2,5 %), el bajista un tráfico que no vuelve y la prima adicional de 1 punto el riesgo de un solo país' },
    { periodo: 'may 2026', var_pct: 15.2, causa: 'Rebote del mercado y resultados del 1T26 (11-may): ingresos −3 %, mejor de lo temido, con el margen EBITDA del 69,6 % [A5, D1].', veredicto: 'no cambia', condicion: null },
    { periodo: 'ago-oct 2026', var_pct: -5.9, causa: 'De 5,46 AED (4-ago) a 5,14: rebaja de la guía de 2026 (5-ago), perspectiva negativa de Fitch (30-jul) y fecha ex del dividendo a cuenta (15-oct, −2,6 % ese día) [C5, C8, D9].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-10-15', tipo: 'dividendo', hecho: 'Fecha ex del dividendo a cuenta del 1S26: 9,3872 fils por acción (704,0 M AED, el 100 % del beneficio del semestre), aprobado por el consejo el 6-oct [D9].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-09-06', tipo: 'contrato', hecho: 'Renovación por cinco años del contrato de operación y mantenimiento con TransCore, con un gasto del 5-5,5 % de los ingresos [C6].', veredicto: 'no cambia', condicion: 'Recogido en el margen del 68,0-68,8 %' },
    { fecha: '2026-08-05', tipo: 'resultados', hecho: '2T26: ingresos −11,9 % (683,1 M), viajes de pago −17,2 %; guía 2026 rebajada a ingresos de −3 % a 0 % y margen EBITDA del 67,5-68,5 %; tráfico casi normal en junio; refinanciación de los 4.000 M antes de jun-2027 [A4, C8, P6].', veredicto: 'no cambia', condicion: 'Recogido en el 2026e (−2,5 %)' },
    { fecha: '2026-07-30', tipo: 'rating', hecho: 'Fitch confirma la A y pasa la perspectiva de estable a negativa por el entorno regional, no por la empresa [C5].', veredicto: 'no cambia', condicion: 'Coste de la refinanciación de 2027 en el bajista' },
    { fecha: '2026-06-01', tipo: 'regulacion', hecho: 'IVA del 5 % sobre el peaje (anunciado el 22-may), a cargo del conductor: 6,30 AED en punta; sin efecto en el beneficio. La RTA compensó el IVA histórico (489,3 M) [B5, C3].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-05-11', tipo: 'resultados', hecho: '1T26: ingresos de 728,9 M (−3 %) y margen EBITDA del 69,6 %; el conflicto empezó al final del trimestre [A5].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-03-04', tipo: 'resultados', hecho: 'Resultados de 2025: ingresos +35,1 % (3.096,9 M), beneficio de 1.553,4 M y dividendo total de 0,2215 AED con 1,44 fils extraordinarios; guía 2026 inicial de +4-6 % [A6, C7].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-02-28', tipo: 'geopolitica', hecho: 'Empieza la guerra de EE. UU. e Israel con Irán: el DFM cierra dos sesiones y su índice pierde ≈ 16 % en marzo [P5].', veredicto: 'no cambia', condicion: 'Prima adicional de 1 punto en el WACC y bajista con tráfico que no vuelve' },
    { fecha: '2025-12-09', tipo: 'mercado', hecho: 'Interactive Brokers abre el DFM y el ADX a sus clientes de todo el mundo [D7].', veredicto: 'no cambia', condicion: null },
    { fecha: '2025-11-13', tipo: 'resultados', hecho: '3T25: ingresos +36,9 % (747,7 M) y nueve meses +38,6 % [A7].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: '2026-11-12',
  veredicto: 'no cambia',
  condicion: null,
  comentario: 'El precio lleva un año bajando (−11,5 % de calendario; −8,1 % con dividendos frente al +5,0 % del ETF de Emiratos) y está un 4 % sobre el mínimo de 52 semanas. La caída tiene tres causas conocidas y ninguna escondida: la guerra con Irán de marzo (−21 % en un mes, con todo el mercado de Dubái), la rebaja de la guía de agosto (ingresos de −3 % a 0 % en 2026) con la perspectiva negativa de Fitch, y la fecha ex del dividendo el 15-oct. Las tres están en el caso base (2026e −2,5 %) o en el bajista (refinanciación más cara, tráfico que no vuelve). No hay noticia propia que cambie la tesis. Veredicto: no cambia. Los resultados del 3T26 (hacia el 12-nov, estimado por el calendario de 2025) no retrasan la decisión: con el valor intrínseco muy por debajo del precio, no hay compra que retrasar.',
};

let R = { bolsa_contexto };
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
  const v2b = o.selector?.v2?.rentabilidad_base_pct ?? o.v2?.rentabilidad_base_pct, v2p = o.selector?.v2?.rentabilidad_ponderada_pct ?? o.v2?.rentabilidad_ponderada_pct;

  const objetivo_comentario = `El objetivo a 12 meses (ponderado ${es(o.objetivo_ponderado)} AED, ${pc(o.rentabilidad_ponderada_pct)} con el dividendo; base ${es(o.objetivo_base)} AED, ${pc(o.rentabilidad_base_pct)}) sale de aplicar al BPA de 2028e (${es(bpa.Base, 4)} AED en el base) un PER de ${es(f.Base.multiplo, 1)} veces, casi el actual (${es(O.per_historico.actual, 1)} veces nuestro BPA de 2027e) porque la mediana adelantada de los cuatro cierres desde la salida a bolsa (${es(O.per_historico.mediana_5a, 1)} veces) está en el mismo sitio. El bajista (${es(f.Bajista.precio)} AED, ${pc(f.Bajista.rentabilidad_pct)}) aplica el mínimo de la historia (${es(f.Bajista.multiplo, 1)} veces, el de 2022) a un BPA con 2,5 puntos menos de crecimiento y 2 de margen; el alcista (${es(f.Alcista.precio)} AED), ${es(f.Alcista.multiplo, 1)} veces con el tráfico de vuelta antes y alguna puerta o tarifa nueva. La regla v2 (PER al cierre) daría ${pc(v2p)} ponderada y ${pc(v2b)} en el base; decide la v3 (cuatro años de historia). Ni el base (${pc(o.rentabilidad_base_pct)}) llega al 12 % ni la ponderada al 15 %, y el valor intrínseco (${es(vi)} AED) queda muy por debajo del precio.`;

  const dcf_lectura = `El DCF da ${es(dcf.valor_accion)} AED por acción, un ${es(Math.abs(dcf.potencial_pct), 1)} % menos que el precio, con un WACC del ${es(wacc)} % y un crecimiento terminal del 2,75 %; el valor terminal pesa el ${dcf.peso_terminal_pct} %. El DCF inverso dice que el precio de ${es(P)} AED descuenta un crecimiento del ${es(inv.crecimiento_implicito_pct, 1)} % anual en ${inv.periodo} (nuestro base: ${es(inv.crecimiento_base_pct, 1)} %), o una rentabilidad del ${es(inv.rentabilidad_implicita_pct, 1)} % al año; ${inv.margen_implicito_texto ?? `con nuestro crecimiento haría falta un margen EBITDA del ${es(inv.margen_implicito_pct, 1)} % (el base es del ${es(inv.margen_base_pct, 1)} %), que no es posible con un canon del 22,5 %`}. Es decir, el mercado valora Salik como un bono de concesión con un WACC del 7-8 %, o espera que el Gobierno siga dando puertas y tarifas nuevas como en 2024-2025. Con la prima implícita del mercado (4,2 %) el DCF sube a ${es(rel.dcf)} AED, todavía un ${es(Math.abs(rel.potencial_pct), 1)} % por debajo. La diferencia está en el descuento: con tipos en dólares del 5,15 % y un solo país, un WACC del 7,5 % sería el de una deuda con calificación A, no el de una acción.`;

  const escenarios_comentario = `Con probabilidades 25/50/25, el valor ponderado de los escenarios es de ${es(viEsc)} AED (${pc(viEscPot)}). El bajista (${es(esc.Bajista.valor)} AED, ${pc(esc.Bajista.potencial_pct)}) recoge un tráfico que no vuelve y una refinanciación más cara; el alcista (${es(esc.Alcista.valor)} AED, ${pc(esc.Alcista.potencial_pct)}), puertas o tarifas nuevas. Ni siquiera el alcista llega al precio: lo que separa el valor del precio es el descuento, no los escenarios de negocio.`;

  const valoracion_comentario = `Pesos: DCF 60 %, escenarios 25 % y comparables 15 %; transacciones sin peso (no hay ventas de concesiones de peaje urbano comparables). Los comparables (Parkin, Transurban, Vinci, Ferrovial, Getlink, Eiffage, Jiangsu y Zhejiang Expressway; mediana de PER de ≈ 17 veces) son concesiones de transporte, casi todas con la infraestructura en el balance y más capex; Salik cotiza a ${es(yo?.per_ntm, 1)} veces el beneficio de los próximos doce meses, en línea con Parkin (22,5) [D3, P7]. El puente parte del balance de junio de 2026: préstamo de 3.996,8 M y derechos de las puertas nuevas con la RTA (1.631,9 M, que devengan coste y la empresa incluye en su deuda neta) como deuda, arrendamientos (4,5 M), indemnizaciones por cese (5,3 M) y el dividendo a cuenta ya descontado del precio (704,0 M) frente a 594,6 M de caja y depósitos [D8, D9].`;

  const sintesis = `**La recomendación y por qué.** ${reco}, con convicción media. Con la regla común, la rentabilidad a 12 meses es del ${pc(o.rentabilidad_ponderada_pct)} ponderada y del ${pc(o.rentabilidad_base_pct)} en el base (objetivo de ${es(o.objetivo_ponderado)} AED frente a ${es(P)}): ninguna llega al listón (15 % y 12 %) porque el PER ya está en su mediana y el bajista pierde un ${es(Math.abs(f.Bajista.rentabilidad_pct), 0)} %. Y el valor intrínseco es de ${es(vi)} AED (${pc(viPot)}): el precio paga una concesión de crecimiento modesto al tipo de un bono. Compraríamos por debajo de ${es(o.comprar_por_debajo)} AED; venderíamos por encima de ${es(o.vender_por_encima)} AED. La convicción subiría con puertas nuevas aprobadas o el tráfico por encima de 2025; bajaría con una refinanciación cara o otro conflicto regional.

**El negocio.** Salik cobra en exclusiva hasta 2071 el peaje urbano de Dubái: diez puertas sin barreras que cargan cada paso a una cuenta de prepago. Uso de peajes (88 % de los ingresos de 2025), multas (9 %), etiquetas y otros [A1]. Paga a la RTA un canon del 22,5 % del uso de peajes; no posee la carretera ni la mantiene [B2]. ROIC del ${es(roic, 1)} % frente a un WACC del ${es(wacc)} % (20 puntos de diferencia): pasa el listón de calidad. Sostenibilidad del crecimiento: «Sí», porque el base (≈ 4 % anual) no pide capital.

**Sector y ciclo.** Dubái crece en población (4,81 M en sep-2026, +5 % en el año) y el tráfico volvió casi a la normalidad en junio tras la guerra con Irán [P2, P6]. Pero el salto de 2025 (+35 %) fue de dos decisiones del Gobierno (dos puertas nuevas y la tarifa variable), no de volumen orgánico, que crece al 3 % al año [A1, B3]. Repetirlo depende de otra decisión del Consejo Ejecutivo.

**Finanzas.** Ingresos de 2.291,9 M en 2024 y 3.096,9 M en 2025 y beneficio de 1.164,5 a 1.553,4 M; en el último año, 2.981,6 M de ingresos y 1.486,5 M de beneficio, a la baja por la guerra [A1, A4]. Margen EBITDA del 69 %, capex casi nulo y todo el beneficio en dividendo (rentabilidad del ${es(c.recomendacion.dividendo_pct, 1)} %) [A1]. Deuda neta de 5.038,6 M (2,45 veces el EBITDA), con el préstamo de 4.000 M a refinanciar antes de jun-2027 [A4, A3].

**Equipo y gobierno.** El Fondo de Inversión de Dubái tiene el 75,1 % y el presidente es el director general de la RTA, el concedente que fija tarifas, canon y puertas [C1, C2]. Gobierno aceptable para una empresa pública, pero el minoritario depende de que al Gobierno le interese el dividendo.

**Valoración.** DCF de ${es(dcf.valor_accion)} AED; el precio descuenta un crecimiento del ${es(inv.crecimiento_implicito_pct, 1)} % anual o una rentabilidad del ${es(inv.rentabilidad_implicita_pct, 1)} %. Cotiza a ${es(yo?.per_ntm, 1)} veces el beneficio de los próximos doce meses frente a una mediana de comparables de ≈ 17. Nuestro BPA de 2028e (${es(bpa.Base, 4)}) queda un 6 % bajo el consenso (0,2542) por los intereses; su objetivo medio (6,19 AED) está por encima de todo nuestro rango intrínseco (${es(esc.Bajista.valor)}-${es(esc.Alcista.valor)} AED) y del de 12 meses (${es(f.Bajista.precio)}-${es(f.Alcista.precio)} AED) [D2].

**Riesgos y catalizadores.** Dominantes: una sola concesión, un solo Gobierno y un solo emirato (guerra con Irán: viajes −9,5 % en el semestre), la refinanciación de 4.000 M en 2027 y el transporte público (metro en 2029). La IA es de exposición baja: no sustituye el paso por la puerta; los robotaxis pagan peaje, pero a largo plazo pueden reducir coches. Catalizadores: resultados del 3T26 (hacia el 12-nov), la refinanciación y cualquier decreto de puertas nuevas. Regla 13: el precio ha caído por causas conocidas que ya están en el base; no cambia.

**Qué cambiaría la decisión.** Por debajo de ${es(o.comprar_por_debajo)} AED pasaría a Comprar; por encima de ${es(o.vender_por_encima)} AED, a Vender. Subiríamos el base con puertas nuevas aprobadas o una tarifa variable más amplia; lo bajaríamos con otro conflicto regional o una refinanciación por encima del 6 %.`;

  R = {
    bolsa_contexto, objetivo_comentario, dcf_lectura, escenarios_comentario, valoracion_comentario,
    resumen: {
      recomendacion: reco, conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
      sintesis,
      tesis: `Salik tiene hasta 2071 la exclusiva del peaje urbano de Dubái: un negocio con un margen EBITDA del 69 %, sin capex, que reparte todo lo que gana [A1, B2]. Creció un 35 % en 2025 por dos puertas nuevas y la tarifa variable, y en 2026 baja por la guerra con Irán [A1, A4].\n\nEl precio (${es(P)} AED, ${es(yo?.per_ntm, 1)} veces el beneficio de los próximos doce meses) ya paga la vuelta del tráfico y algo más: el DCF (${es(dcf.valor_accion)} AED) y la regla común a 12 meses (${pc(o.rentabilidad_ponderada_pct)} ponderada) no dan para comprar. Los riesgos que el precio no recoge son que el crecimiento por encima del tráfico lo decide un solo Gobierno y que la deuda (4.000 M) vence en jun-2027 con los tipos en dólares al 5 %.`,
      vision_diferencial: {
        mercado_descuenta: `Doce analistas esperan un BPA de 0,2542 AED en 2028e (+8 % anual desde 2026e) y un objetivo medio de 6,19 AED; la mitad dice comprar [D2, D3]. El precio descuenta un crecimiento del ${es(inv.crecimiento_implicito_pct, 1)} % anual con nuestro WACC.`,
        nuestra_vision: 'Rebote del tráfico en 2027 y después un crecimiento del 3-5 % anual sin tarifas ni puertas nuevas, margen estable y un descuento de empresa de un solo país y un solo concedente (WACC del 9,7 %), no el de un bono.',
        por_que: 'El crecimiento orgánico de los viajes fue del 3,1 % anual en 2014-2024; los saltos vinieron de decisiones del Gobierno, y la única de 2026 fue el IVA, que no da beneficio [B3, B5]. La refinanciación de 2027 llega con la perspectiva negativa de Fitch [C5].',
      },
      a_favor: [
        '**Monopolio legal hasta 2071** del peaje de Dubái, también para las puertas futuras [B2].',
        '**Margen EBITDA del 69 %, ROIC cercano al 30 %** y capex casi nulo: la carretera es de la RTA [A1].',
        '**Dividendo del 100 % del beneficio** (≈ 4 % de rentabilidad) [A1, D9].',
        '**Población creciendo un 5 % al año** y tráfico casi normal desde junio [P2, P6].',
        '**Muy líquida y accesible desde IBKR**: ≈ 21,8 M AED al día en el DFM [D1, D7].',
      ],
      en_contra: [
        '**Un solo concedente y un solo Gobierno**: la RTA decide puertas, tarifas y canon, y su director general preside Salik [B2, C1].',
        '**Crecimiento de 2025 no repetible** sin otra decisión pública; el orgánico es del ≈ 3 % [A1, B3].',
        '**Préstamo de 4.000 M a corto** (vence jun-2027) con Fitch en perspectiva negativa [A3, C5].',
        '**Riesgo de país**: guerra con Irán en marzo (−21 % en un mes, viajes −9,5 % en el semestre) [D1, A4].',
        `**Precio exigente**: ${es(yo?.per_ntm, 1)} veces el beneficio, con el DCF en ${es(dcf.valor_accion)} AED [D1].`,
      ],
      que_vigilar: 'La tesis depende del tráfico y de lo que decida el Gobierno de Dubái. La señal está en tres cifras de cada trimestre: viajes de pago (−17,2 % en el 2T26), peso de la hora punta (6 AED) y margen EBITDA (68,6 % en el 2T26), y en dos noticias: el coste de la refinanciación de los 4.000 M y cualquier decreto de puertas nuevas. Si los viajes vuelven a crecer por encima del 5 % y llegan puertas, el base se queda corto; si siguen cayendo, el bajista gana peso.',
      cambiaria_recomendacion: [
        `Precio por debajo de ${es(o.comprar_por_debajo)} AED: pasaría a Comprar.`,
        `Precio por encima de ${es(o.vender_por_encima)} AED: pasaría a Vender.`,
        'Decreto de puertas nuevas o tarifa variable ampliada: subiríamos el base hacia el alcista.',
        'Refinanciación por encima del 6 % o un canon más alto: bajaríamos el beneficio.',
        'Nuevo conflicto regional o tráfico a la baja en el 2S26: bajaríamos el crecimiento de 2027e.',
      ],
      kpis_seguimiento: [
        { kpi: 'Viajes de pago', nivel_actual: '−17,2 % (2T26)', umbral_alerta: 'Caída en el 3T26 o el 4T26', por_que: 'Volumen sin ayuda de precio.' },
        { kpi: 'Margen EBITDA', nivel_actual: '68,6 % (2T26)', umbral_alerta: '< 67 %', por_que: 'Costes fijos y TransCore.' },
        { kpi: 'Coste de la refinanciación', nivel_actual: 'EIBOR + 0,82 % (vence jun-2027)', umbral_alerta: '> 6 % total', por_que: 'Cada punto son ≈ 40 M de beneficio.' },
        { kpi: 'Puertas y tarifas', nivel_actual: 'Diez puertas; tarifa variable desde ene-2025', umbral_alerta: 'Sin cambios hasta 2028', por_que: 'Separa el base del alcista.' },
        { kpi: 'Población de Dubái', nivel_actual: '4,81 M (sep-2026)', umbral_alerta: 'Crecimiento < 2 %', por_que: 'Motor orgánico del tráfico.' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Dependencia de la RTA y del Gobierno de Dubái: puertas nuevas, tarifas y canon se deciden fuera de la empresa', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−20 % (escenario bajista)', mitigante: 'Concesión de 49 años con exclusividad de las puertas futuras, compensación por inflación vía canon y un accionista (Fondo de Inversión de Dubái) que cobra el 75 % del dividendo [B2, C2].', senal: 'Canon más alto o puertas nuevas a un precio que no rinda' },
        { riesgo: 'Geopolítica del Golfo (Irán) y de un solo emirato', tipo: 'País', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % en precio, −5 % en valor', mitigante: 'Ingresos en AED anclado al dólar; el tráfico volvió casi a la normalidad en tres meses; prima adicional de 1 punto en el WACC [P6, D5].', senal: 'Nuevo conflicto; en marzo de 2026 la acción cayó un 21 % y el índice un 16 % [D1, P5]' },
        { riesgo: 'Refinanciación del préstamo de 4.000 M (vence el 30-jun-2027)', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−2 % por cada punto de tipo', mitigante: 'Calificación A, banco del Gobierno y 2.000 M de EBITDA (2,45 veces de deuda neta) [C5, A4].', senal: 'Coste por encima del 6 % o plazo corto' },
        { riesgo: 'El crecimiento de 2025 no se repite: fue de puertas nuevas y tarifa variable', tipo: 'Negocio', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Población +5 % al año; el base ya crece solo el 4 % de media [P2, B3].', senal: 'Viajes por habitante a la baja dos años seguidos' },
        { riesgo: 'Metro, teletrabajo y transporte compartido', tipo: 'Tecnológico', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a largo plazo', mitigante: 'La línea azul (2029) va por zonas que hoy no tienen puerta; la ciudad sigue creciendo en coches [P3].', senal: 'Viajes de pago estancados con la población creciendo' },
        { riesgo: 'Venta de acciones del Fondo de Inversión de Dubái (75,1 %)', tipo: 'Mercado', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Precio −5-10 % temporal', mitigante: 'Más flotante y peso en índices [C2].', senal: 'Colocación acelerada anunciada' },
      ],
      premortem: 'Octubre de 2027: la acción ha perdido un 25 %. No hubo ningún escándalo: tras otro episodio de tensión con Irán en 2027, el turismo y la actividad no volvieron a 2025, y los viajes de pago se quedaron un 5 % por debajo. El Consejo Ejecutivo, ante el coste de la vida, no aprobó puertas ni tarifas nuevas. Salik refinanció los 4.000 M al 6 %, con la perspectiva negativa de Fitch convertida en rebaja a A−, y el beneficio no creció. El mercado dejó de pagar 23 veces por una concesión que crece como una utility y la llevó a 18, la de sus comparables. La señal que se ignoró: la guía rebajada de agosto de 2026 y el préstamo clasificado a corto.',
      ia: {
        exposicion: 'Baja', sentido: 'Neutral', efecto_valor: '0 a −3 %',
        comentario: 'La IA no sustituye el negocio: cada paso de un vehículo por una puerta paga, lo conduzca una persona o un algoritmo, y la concesión es exclusiva. En el lado de costes ayuda poco porque el sistema ya es automático (RFID y lectura de matrículas, operado por TransCore). El riesgo indirecto es de largo plazo: los robotaxis que Dubái quiere para el 25 % de los viajes en 2030 pueden reducir el número de coches privados y los pasos por persona (más ocupación por vehículo), aunque también pueden aumentar los kilómetros recorridos en vacío [P4]. El teletrabajo con herramientas de IA reduce los viajes en hora punta, los de 6 AED. Neto, exposición baja y ligeramente negativa a partir de 2030; el bajista la recoge con menos crecimiento.',
      },
      confianza: 'Media',
    },
    catalizadores: {
      items: [
        { fecha: '≈ 12-nov-2026 (estimado)', evento: 'Resultados del 3T26', efecto: 'Primer trimestre entero tras la guerra: viajes de pago, peso de la punta y margen [A4]', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Antes de jun-2027', evento: 'Refinanciación del préstamo de 4.000 M', efecto: 'Coste financiero de los próximos años [C8]', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'mar-2027', evento: 'Resultados de 2026, guía de 2027 y dividendo final', efecto: 'Ritmo de recuperación del tráfico [C7]', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Sin fecha', evento: 'Decreto de puertas nuevas o cambio de tarifa', efecto: 'Separa el base del alcista [B2]', probabilidad: 'Baja', sentido: '+' },
        { fecha: 'sep-2029', evento: 'Línea azul del metro', efecto: 'Menos viajes por el centro en algunas rutas [P3]', probabilidad: 'Alta', sentido: '−' },
      ],
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Refinanciación', pregunta: '¿Con qué banco, plazo y coste se refinanciarán los 4.000 M que vencen en jun-2027, y habrá bonos?', por_que: 'Cada punto de tipo son ≈ 40 M de beneficio.' },
        { tema: 'Puertas', pregunta: '¿Hay estudios de tráfico en marcha con la RTA para puertas nuevas y cómo se fijaría su precio?', por_que: 'Es lo que separa el base del alcista.' },
        { tema: 'Tráfico', pregunta: '¿Cuánto de la caída de viajes del 2T26 fue de la guerra y cuánto de cambios de hábito por la tarifa variable?', por_que: 'Saber si el volumen vuelve solo.' },
        { tema: 'Canon', pregunta: '¿Cómo funciona la compensación por inflación vía canon si no se suben las tarifas?', por_que: 'Margen de los próximos 45 años.' },
        { tema: 'Gobierno', pregunta: '¿Cómo se gestionan los conflictos de interés cuando el presidente de Salik dirige la RTA, que fija el canon y vende las puertas?', por_que: 'Precio de las puertas futuras.' },
        { tema: 'Diversificación', pregunta: '¿Qué margen dejan los pagos de aparcamiento y combustible con el monedero de Salik?', por_que: 'Crecimiento fuera del peaje.' },
      ],
      confianza: 'Media',
    },
  };
}
export default R;

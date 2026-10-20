// Resumen, síntesis, lecturas de valoración, riesgos, catalizadores, preguntas y contexto de bolsa de Parkin (corte 2026-10-20).
// Las cifras del motor se leen del último cálculo guardado en ../datos.json (se calcula dos veces para que cuadren).
import fs from 'node:fs';
import * as O from './objetivo.mjs';

let c = null;
try { c = JSON.parse(fs.readFileSync(new URL('../datos.json', import.meta.url), 'utf8')).calc ?? null; } catch { c = null; }

const es = (x, d = 2) => (x === null || x === undefined ? 'n.d.' : (+x).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));
const pc = (x, d = 1) => `${x > 0 ? '+' : ''}${es(x, d)} %`;

// Regla 13. Variaciones de calendario con los cierres de Yahoo (la serie de Yahoo del DFM tiene huecos de sesiones y la herramienta,
// que cuenta 252 sesiones, compara con el 30-jul-2025: −6,6 %; de cierre a cierre de calendario es +5,5 %).
const bolsa_contexto = {
  movimiento: {
    fecha: '2026-10-20', var_1m_pct: -4.6, var_3m_pct: 4.0, var_6m_pct: 10.1, var_12m_pct: 5.5,
    dist_max_52s_pct: -11.1, dist_min_52s_pct: 30.0, dist_max_historico_pct: -14.0, tendencia: 'alcista', volatilidad_60d_pct: 20,
    avisos: ['La serie de Yahoo del DFM tiene sesiones sin dato: las variaciones son de calendario (cierre del 17-sep, 20-jul, 20-abr y 20-oct-2025); contando 252 sesiones, la herramienta da −6,6 % a 12 meses porque llega al 30-jul-2025 [D1].'],
  },
  movimientos_fuertes: [
    { periodo: 'feb-mar 2026', var_pct: -32.6, causa: 'De 6,50 AED (10-feb) a 4,38 AED (16-mar): guerra con Irán; el DFM perdió un 22 % desde su máximo y entró en mercado bajista; −9,6 % el 9-mar en una sola sesión [D1, D11, D14]. La empresa no dio ninguna noticia propia; luego atribuyó al conflicto las transacciones públicas más bajas del 2T26 (−7 %) [A4].', veredicto: 'no cambia', condicion: 'El bajista ya recoge menos transacciones y la prima adicional de 1 punto el riesgo de un solo país' },
    { periodo: 'abr-jun 2026', var_pct: 19.5, causa: 'Rebote del mercado y resultados del 1T26 (6-may) con los ingresos +41 % por la tarifa variable de abril de 2025, los abonos y los promotores; acuerdo de control de aparcamiento con Emaar (4-may) [A5, B5].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-10-14', tipo: 'dividendo', hecho: 'Fecha ex del dividendo del 1S26: 0,117 AED por acción (≈ 351 M AED, el 100 % del beneficio del semestre) [D9].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-08-25', tipo: 'analistas', hecho: 'FAB sube a Comprar con objetivo de 6,50 AED (DCF con un WACC del 8,5 %) [D5].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-08-24', tipo: 'expansion', hecho: 'Parkin anuncia que llevará su modelo a Bahréin y Egipto; antes, a Abu Dabi y a promotores fuera de Dubái. Sin contratos firmados ni cifras [B6].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-08-13', tipo: 'resultados', hecho: '2T26: ingresos +13,6 %, beneficio de 166 M AED (FAB esperaba 198 M); transacciones públicas −7 % por la guerra y tres días menos de cobro; guía de aparcamiento público rebajada de 560-610 a 510-550 M y subida en abonos y promotores; total «sustancialmente sin cambios» [A4, A12, C5].', veredicto: 'no cambia', condicion: 'Recogido en el 2026e (+12,5 %) y en el margen del 58,5 %' },
    { fecha: '2026-05-22', tipo: 'regulacion', hecho: 'IVA del 5 % en todos los servicios de aparcamiento desde el 1-jun-2026, a cargo del usuario [B8].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-05-06', tipo: 'resultados', hecho: '1T26: ingresos +41 %; canon variable provisionado al 27,5 % (máximo) mientras se negocia con la RTA; guía «en revisión» [A5].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-05-04', tipo: 'contrato', hecho: 'Acuerdo con Emaar para controlar con cámaras e IA el aparcamiento de Dubai Mall, Dubai Hills Mall y otros centros [B5].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-02-26', tipo: 'regulacion', hecho: 'Parkin pide a la RTA revisar el precio de los abonos y las tarifas; depende del Consejo Ejecutivo y el consejero delegado dice que «no hay garantía» [B9].', veredicto: 'no cambia', condicion: 'Solo en el alcista' },
    { fecha: '2026-02-25', tipo: 'resultados', hecho: 'Resultados de 2025: ingresos +43 %, beneficio de 625 M AED (+48 %) y dividendo total de 0,2186 AED [A6, A1].', veredicto: 'no cambia', condicion: null },
    { fecha: '2025-11-07', tipo: 'resultados', hecho: '3T25: beneficio +50 % y guía de 2025 al alza [A7, C6].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: '2026-11-06',
  veredicto: 'no cambia',
  condicion: null,
  comentario: 'El precio apenas se ha movido en el último mes (−4,6 %) y está un 11 % bajo el máximo de febrero. La gran caída del año (−33 % de febrero a marzo) fue del mercado por la guerra con Irán, sin noticia propia, y se recuperó en dos meses con unos buenos resultados del 1T26. Lo único propio de los últimos doce meses que pesa es el 2T26 por debajo de lo esperado y la rebaja de la guía de aparcamiento público, que el caso base ya recoge, y la petición de revisar tarifas y abonos, que solo está en el alcista. Veredicto: no cambia. Los resultados del 3T26 (hacia el 6-nov, estimado) no retrasan la decisión: con el valor intrínseco muy por debajo del precio, no hay compra que retrasar.',
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
  const v2b = o.v2?.rentabilidad_base_pct, v2p = o.v2?.rentabilidad_ponderada_pct;

  const objetivo_comentario = `El objetivo a 12 meses (ponderado ${es(o.objetivo_ponderado)} AED, ${pc(o.rentabilidad_ponderada_pct)} con el dividendo; base ${es(o.objetivo_base)} AED, ${pc(o.rentabilidad_base_pct)}) sale de aplicar al BPA de 2028e (${es(O.bpa.Base, 4)} AED en el base) un PER de ${es(f.Base.multiplo, 1)} veces, a medio camino entre el actual (${es(O.actual, 1)} veces nuestro BPA de 2027e) y la mediana de los dos cierres desde la salida a bolsa (${es(O.mediana, 1)} veces). El bajista (${es(f.Bajista.precio)} AED, ${pc(f.Bajista.rentabilidad_pct)}) aplica ${es(f.Bajista.multiplo, 1)} veces a un BPA con 3 puntos menos de crecimiento y de margen; el alcista (${es(f.Alcista.precio)} AED), ${es(f.Alcista.multiplo, 1)} veces con la revisión de abonos y tarifas aprobada. Con solo dos años de historia decide la más baja de las dos reglas: la v2 (PER al cierre) daría ${pc(v2p)} ponderada y ${pc(v2b)} en el base. El base pasa por poco el 12 %, pero la ponderada (${pc(o.rentabilidad_ponderada_pct)}) queda lejos del 15 % y el valor intrínseco (${es(vi)} AED) muy por debajo del precio.`;

  const dcf_lectura = `El DCF da ${es(dcf.valor_accion)} AED por acción, un ${es(Math.abs(dcf.potencial_pct), 1)} % menos que el precio, con un WACC del ${es(wacc)} % y un crecimiento terminal del 2,75 %; el valor terminal pesa el ${dcf.peso_terminal_pct} %. El DCF inverso dice que el precio de ${es(P)} AED descuenta un crecimiento del ${es(inv.crecimiento_implicito_pct, 1)} % anual en ${inv.periodo} (nuestro base: ${es(inv.crecimiento_base_pct, 1)} %), o una rentabilidad del ${es(inv.rentabilidad_implicita_pct, 1)} % al año; ${inv.margen_implicito_texto}. Es decir, el mercado descuenta un WACC de 7-8 %, el de un bono de concesión, o que la RTA siga dando subidas de precio como la de 2025. Con la prima implícita del mercado (4,2 %) el DCF sube a ${es(rel.dcf)} AED, todavía un ${es(Math.abs(rel.potencial_pct), 1)} % por debajo. El peso de la diferencia está en el descuento: con un WACC del 8,5 % (el de FAB) y nuestro flujo, el valor se acercaría a 5 AED [D5].`;

  const escenarios_comentario = `Con probabilidades 25/50/25, el valor ponderado de los escenarios es de ${es(viEsc)} AED (${pc(viEscPot)}). El bajista (${es(esc.Bajista.valor)} AED, ${pc(esc.Bajista.potencial_pct)}) recoge una RTA que no concede subidas y más peso de promotores; el alcista (${es(esc.Alcista.valor)} AED, ${pc(esc.Alcista.potencial_pct)}), la revisión de abonos y tarifas aprobada. Ni siquiera el alcista llega al precio: lo que separa el valor del precio es el descuento, no los escenarios de negocio.`;

  const valoracion_comentario = `Pesos: DCF 40 %, escenarios 40 % y comparables 20 %; transacciones sin peso (no hay ventas de concesiones de aparcamiento comparables publicadas). Los comparables (Salik, Dubai Taxi, Park24, Transurban, Vinci, Getlink, Aena y Flughafen Zürich; mediana de PER de ≈ 17 veces) son concesiones y operadores de infraestructura, casi todos con más deuda y menos crecimiento; Parkin cotiza a ${es(yo?.per_ntm, 1)} veces el beneficio de los próximos doce meses, en línea con Salik (22,9) y con prima sobre todos menos Getlink (30,8) [D3, B7]. El puente parte del balance de junio de 2026: préstamo de 1.100 M y arrendamientos (74,7 M) como deuda, indemnizaciones por cese (26,2 M) y el dividendo del 1S26 ya descontado (351,3 M) frente a 463,2 M de caja [A4, D9, D13]. Los 300 M de canon diferido no se restan: solo se pagan si Parkin quiebra [B10].`;

  const sintesis = `**La recomendación y por qué.** ${reco}, con convicción media. Con la regla común, la rentabilidad a 12 meses es del ${pc(o.rentabilidad_ponderada_pct)} ponderada y del ${pc(o.rentabilidad_base_pct)} en el base (objetivo de ${es(o.objetivo_ponderado)} AED frente a ${es(P)}): el base pasa el 12 % por poco, pero la ponderada no llega al 15 % porque el bajista pierde un ${es(Math.abs(f.Bajista.rentabilidad_pct), 0)} %. Y el valor intrínseco es de ${es(vi)} AED (${pc(viPot)}): el precio paga una concesión de crecimiento al tipo de un bono, y no hay valor real por encima del precio. Compraríamos por debajo de ${es(o.comprar_por_debajo)} AED; venderíamos por encima de ${es(o.vender_por_encima)} AED. La convicción subiría con la revisión de abonos y tarifas aprobada; bajaría con otro trimestre de transacciones públicas a la baja.

**El negocio.** Parkin cobra el aparcamiento público de Dubái en exclusiva hasta 2072: tarifas (40 % de los ingresos de 2025), multas (31 %), abonos (17 %), aparcamientos de promotores privados (7 %) y edificios y otros (5 %) [A1]. Paga a la RTA un canon de hasta el 27,5 % de los ingresos de aparcamiento y comparte con ella las subidas de tarifa por encima de la inflación [B10]. ROIC del ${es(roic, 1)} % frente a un WACC del ${es(wacc)} % (más de 40 puntos de diferencia): pasa el listón de calidad. Sostenibilidad del crecimiento: «Sí», porque el base (5,7 % anual) pide poco capital.

**Sector y ciclo.** Dubái crece en población (4,58 M de habitantes a fin de 2025, +7,5 %) y en coches, y queda mucho por cobrar: ≈ 392.000 plazas públicas sin cobrar según el folleto, frente a ≈ 203.000 de pago hoy [B1, B2, B3]. Pero los saltos de 2025 fueron de precio, no de volumen: la tarifa variable de abril de 2025 subió la tarifa media de 2,0 a 3,0 AED, y repetirlo depende de una decisión del Gobierno [A4, B9].

**Finanzas.** Ingresos de 915,8 M en 2024 y 1.308,3 M en 2025 (+43 %) y beneficio de 423,5 a 625,5 M; en el último año, 1.461,6 M de ingresos y 691,8 M de beneficio [A1, A4]. Margen EBITDA del 60 %, poca inversión (capex del 3-6 % de las ventas) y todo el beneficio se reparte (dividendo de 0,2186 AED en 2025, rentabilidad del ${es(c.recomendacion.dividendo_pct, 1)} %) [A1]. Deuda neta de 710 M (0,8 veces el EBITDA) [D13].

**Equipo y gobierno.** El Fondo de Inversión de Dubái tiene el 75,01 % y seis de los siete consejeros son dominicales; el regulador, la RTA, es a la vez concedente, socio en las subidas y quien decide tarifas y plazas [C1, B10]. Nota de gobierno baja (6 de 13).

**Valoración.** DCF de ${es(dcf.valor_accion)} AED; el precio descuenta un crecimiento del ${es(inv.crecimiento_implicito_pct, 1)} % anual o un WACC de 7-8 %. Cotiza a ${es(yo?.per_ntm, 1)} veces el beneficio de los próximos doce meses frente a una mediana de comparables de ≈ 17. Nuestro BPA de 2028e (${es(O.bpa.Base, 4)}) queda un 5 % bajo el consenso (0,2753) por margen; su objetivo medio (6,51 AED) está por encima de todo nuestro rango intrínseco (${es(esc.Bajista.valor)}-${es(esc.Alcista.valor)} AED) y dentro del de 12 meses (${es(f.Bajista.precio)}-${es(f.Alcista.precio)} AED) [D2].

**Riesgos y catalizadores.** Dominantes: una sola concesión, un solo Gobierno y un solo emirato (guerra con Irán en marzo: −33 % en un mes) y la vuelta de las multas a lo normal. La IA es neutra a favorable: abarata la vigilancia y amplía el cobro a centros comerciales. Catalizadores: resultados del 3T26 (hacia el 6-nov) y la decisión del Consejo Ejecutivo sobre abonos y tarifas. Regla 13: el precio no se ha movido por noticias propias; no cambia.

**Qué cambiaría la decisión.** Por debajo de ${es(o.comprar_por_debajo)} AED pasaría a Comprar; por encima de ${es(o.vender_por_encima)} AED, a Vender. Subiríamos el base con la revisión de tarifas aprobada o la expansión fuera de Dubái con contratos firmados; lo bajaríamos con un canon por encima del 27,5 % o transacciones públicas a la baja otro trimestre.`;

  R = {
    bolsa_contexto, objetivo_comentario, dcf_lectura, escenarios_comentario, valoracion_comentario,
    resumen: {
      recomendacion: reco, conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
      sintesis,
      tesis: `Parkin tiene hasta 2072 la exclusiva del aparcamiento público de pago de Dubái: un negocio con un margen EBITDA del 60 %, poca inversión, deuda baja y que reparte todo lo que gana [A1, B10]. Creció un 43 % en 2025 por la tarifa variable, los abonos y los promotores [A1].\n\nEl precio (${es(P)} AED, ${es(yo?.per_ntm, 1)} veces el beneficio de los próximos doce meses) ya paga ese crecimiento: el DCF (${es(dcf.valor_accion)} AED) y la regla común a 12 meses (${pc(o.rentabilidad_ponderada_pct)} ponderada) no dan para comprar. Los dos riesgos que el precio no recoge son que todo depende de un solo Gobierno, que decide tarifas, plazas y canon, y que el salto de 2025 fue de precio, no de volumen.`,
      vision_diferencial: {
        mercado_descuenta: `Nueve analistas esperan un BPA de 0,2753 AED en 2028e (+10 % anual) y un objetivo medio de 6,51 AED; FAB, Comprar a 6,50 con un WACC del 8,5 % [D2, D5]. El precio descuenta un crecimiento del ${es(inv.crecimiento_implicito_pct, 1)} % anual con nuestro WACC.`,
        nuestra_vision: 'Crecimiento del 6-7 % anual sin nuevas subidas de tarifa, margen estable y un descuento de empresa de un solo país y un solo concedente (WACC del 10 %), no el de un bono.',
        por_que: 'Las transacciones públicas cayeron un 7 % en el 2T26 y la guía de aparcamiento público se rebajó; la revisión de abonos y tarifas lleva ocho meses sin respuesta y la RTA se queda la mitad de lo que suba por encima de la inflación [A4, B9, B10].',
      },
      a_favor: [
        '**Monopolio legal hasta 2072** del aparcamiento público de Dubái, con compensación del 130 % si el Gobierno cancela plazas [B10].',
        '**Margen EBITDA del 60 %, ROIC por encima del 50 %** y capex del 3-6 % de las ventas [A1].',
        '**Dividendo del 100 % del beneficio** (≈ 4 % de rentabilidad) y deuda neta de 0,8 veces el EBITDA [A1, D13].',
        '**Mucho por cobrar**: ≈ 392.000 plazas gratuitas, promotores (Dubai Holding, DAMAC, Emaar) y población +7,5 % en 2025 [B1, B2, B4, B5].',
        '**La IA ayuda**: cámaras y vehículos de control abaratan la vigilancia y abren centros comerciales y promotores [B5].',
      ],
      en_contra: [
        '**Un solo concedente y un solo Gobierno**: la RTA decide tarifas, plazas y canon, y el Fondo de Inversión de Dubái controla el 75 % [B10, C1].',
        '**Crecimiento de 2025 de precio**: la tarifa variable de abril de 2025 no se repite sin otra decisión pública [A4, B9].',
        '**Canon al máximo (27,5 %)** provisionado desde el 1T26 y subidas por encima de la inflación repartidas a medias con la RTA [A5, B10].',
        '**Riesgo de país**: la guerra con Irán tiró la acción un 33 % en un mes y las transacciones un 7 % en el 2T26 [D11, A4].',
        `**Precio exigente**: ${es(yo?.per_ntm, 1)} veces el beneficio, con el DCF en ${es(dcf.valor_accion)} AED [D1].`,
      ],
      que_vigilar: 'La tesis depende de lo que decida el Gobierno de Dubái. La señal está en tres cifras de cada trimestre: transacciones de aparcamiento público (−7 % en el 2T26), plazas públicas nuevas (3,5-5k en el 2S26) y multas emitidas y cobradas (75 % de cobro en el 2T26), y en una noticia: la decisión del Consejo Ejecutivo sobre abonos y tarifas. Si las transacciones vuelven a crecer y llega una subida, el base se queda corto; si siguen cayendo sin subida, el bajista gana peso.',
      cambiaria_recomendacion: [
        `Precio por debajo de ${es(o.comprar_por_debajo)} AED: pasaría a Comprar.`,
        `Precio por encima de ${es(o.vender_por_encima)} AED: pasaría a Vender.`,
        'Revisión de abonos y tarifas aprobada por el Consejo Ejecutivo: subiríamos el base hacia el alcista.',
        'Canon variable por encima del 27,5 % o nuevas obligaciones de la RTA: bajaríamos el margen.',
        'Contratos firmados fuera de Dubái (Abu Dabi, Bahréin, Egipto): subiríamos el crecimiento a largo plazo.',
      ],
      kpis_seguimiento: [
        { kpi: 'Transacciones de aparcamiento público', nivel_actual: '−7 % (2T26)', umbral_alerta: 'Caída dos trimestres más', por_que: 'Volumen sin ayuda de precio.' },
        { kpi: 'Plazas de pago (públicas y de promotores)', nivel_actual: '203,2k públicas y 61,5k de promotores (jun-26)', umbral_alerta: '< 3,5k públicas nuevas en el 2S26', por_que: 'Crecimiento del base.' },
        { kpi: 'Multas: emitidas y tasa de cobro', nivel_actual: '75 % de cobro (2T26)', umbral_alerta: '< 70 %', por_que: 'Un tercio de los ingresos.' },
        { kpi: 'Canon variable provisionado', nivel_actual: '27,5 % (máximo)', umbral_alerta: 'Obligación nueva de la RTA', por_que: 'Margen.' },
        { kpi: 'Decisión sobre abonos y tarifas', nivel_actual: 'Pendiente desde feb-26', umbral_alerta: 'Rechazo o sin decisión en 2027', por_que: 'Separa el base del alcista.' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Dependencia de la RTA y del Gobierno de Dubái: tarifas, plazas nuevas, abonos y canon se deciden fuera de la empresa', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−25 % (escenario bajista)', mitigante: 'Concesión de 49 años con compensación del 130 % del valor de mercado si se cancelan plazas, subidas por inflación previstas y un accionista (Fondo de Inversión de Dubái) que quiere dividendos [B10, C1].', senal: 'Sin decisión sobre abonos y tarifas en 2027, o canon por encima del 27,5 %' },
        { riesgo: 'El crecimiento de 2025 no se repite: fue de precio (tarifa variable) y de multas', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Plazas gratuitas por convertir, promotores y población; el base ya crece solo el 6,5 % [B1, B3].', senal: 'Transacciones públicas a la baja otros dos trimestres' },
        { riesgo: 'Riesgo geopolítico del Golfo (Irán) y de un solo emirato', tipo: 'País', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % en precio, −5 % en valor', mitigante: 'Ingresos en AED anclado al dólar y caja; prima adicional de 1 punto en el WACC [D7].', senal: 'Nuevo conflicto; en marzo de 2026 la acción cayó un 33 % y el DFM un 22 % [D11, D14]' },
        { riesgo: 'Multas: menos emisión o cobro peor', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Control automático con coches con cámaras (37 en el 2T26, 25 un año antes) [A4].', senal: 'Tasa de cobro por debajo del 70 %' },
        { riesgo: 'Venta de acciones del Fondo de Inversión de Dubái (75 %)', tipo: 'Mercado', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Precio −5-10 % temporal', mitigante: 'Más flotante y peso en índices [C1].', senal: 'Colocación acelerada anunciada' },
        { riesgo: 'Cambio en la movilidad: transporte público, coche autónomo y alquiler por minutos', tipo: 'Tecnológico', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 % a largo plazo', mitigante: 'Dubái sigue planificando con coche privado y la población crece [B2].', senal: 'Transacciones por habitante a la baja varios años' },
      ],
      premortem: 'Octubre de 2027: la acción ha perdido un 25 %. No hubo ningún escándalo: el Consejo Ejecutivo de Dubái, ante el coste de la vida, no aprobó la subida de abonos ni de tarifas, y la RTA fijó el canon variable al 27,5 % de forma definitiva. Las transacciones públicas se estancaron tras el cambio de usuarios a abonos baratos, las multas se normalizaron y el crecimiento bajó al 4 % con los promotores, de poco margen. El mercado dejó de pagar 23 veces por una concesión que crece como una utility y la llevó a 18, la de sus comparables, mientras un repunte de tensión con Irán vaciaba el DFM. La señal que se ignoró: en el 2T26 ya caían las transacciones públicas y la petición de febrero de 2026 seguía sin respuesta.',
      ia: {
        exposicion: 'Baja', sentido: 'Favorable', efecto_valor: '+0 a +5 %',
        comentario: 'La IA no amenaza el negocio: nadie aparca menos porque exista la IA, y la concesión es exclusiva. Lo que hace es abaratar y ampliar el cobro: cámaras y vehículos de control automático con reconocimiento de matrículas (más multas por inspector y menos coste de personal) y acuerdos como el de Emaar para vigilar con IA Dubai Mall y Dubai Hills Mall [B5]. El riesgo indirecto es de largo plazo y pequeño: coches autónomos y alquiler por minutos que reduzcan el aparcamiento en la calle; en Dubái no se ve antes de 2035. Un riesgo menor: que más eficiencia del control dé más multas y más presión pública contra las tarifas. Neto, ligeramente favorable para el margen, sin efecto en el caso base.',
      },
      confianza: 'Media',
    },
    catalizadores: {
      items: [
        { fecha: '≈ 6-nov-2026 (estimado)', evento: 'Resultados del 3T26', efecto: 'Transacciones públicas tras la guerra, cobro de multas y plazas nuevas; primer trimestre con IVA completo [A4, B8]', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Sin fecha', evento: 'Decisión del Consejo Ejecutivo sobre abonos y tarifas', efecto: 'Separa el base (sin subida) del alcista [B9]', probabilidad: 'Media', sentido: '+' },
        { fecha: 'feb-2027', evento: 'Resultados de 2026, guía de 2027 y dividendo del 2S26', efecto: 'Guía de plazas y de promotores; canon definitivo con la RTA [A6]', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2027', evento: 'Primeros contratos fuera de Dubái (Abu Dabi, Bahréin, Egipto)', efecto: 'Crecimiento sin depender de la RTA [B6]', probabilidad: 'Baja', sentido: '+' },
        { fecha: '2026-2028', evento: 'Fases de Dubai Holding (29,6k plazas) y DAMAC', efecto: 'Ingresos de promotores, de menos margen [B4]', probabilidad: 'Alta', sentido: '+' },
      ],
      confianza: 'Media',
    },
    preguntas: {
      items: [
        { tema: 'Tarifas', pregunta: '¿Qué pidió exactamente Parkin a la RTA en febrero de 2026 (precio de abonos, tarifas, zonas) y qué calendario tiene la decisión?', por_que: 'Es lo que separa el base del alcista.' },
        { tema: 'Canon', pregunta: '¿Por qué se provisiona el canon al 27,5 % y qué falta para cerrar la negociación con la RTA?', por_que: 'Margen de los próximos 46 años.' },
        { tema: 'Volumen', pregunta: '¿Cuánto de la caída de transacciones públicas del 2T26 es de la guerra y cuánto del paso a abonos baratos?', por_que: 'Saber si el volumen crece sin subidas.' },
        { tema: 'Multas', pregunta: '¿Por qué bajó la tasa de cobro al 75 % y cuántas multas se emiten por control automático?', por_que: 'Un tercio de los ingresos.' },
        { tema: 'Expansión', pregunta: '¿Qué margen y qué capital exigen los contratos fuera de Dubái y los de promotores con renta mínima?', por_que: 'Crecimiento futuro con menos margen.' },
      ],
      confianza: 'Media',
    },
  };
}
export default R;

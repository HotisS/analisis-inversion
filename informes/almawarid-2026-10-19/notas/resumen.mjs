// Resumen, síntesis y lecturas de valoración de Almawarid (corte 2026-10-19). Las cifras del motor se leen del último cálculo
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
  const dcf = c.dcf, inv = dcf.inverso;
  const esc = Object.fromEntries(c.escenarios.map((x) => [x.escenario, x]));
  const roic = c.rentabilidad.at(-1).roic_pct, wacc = dcf.wacc;
  const rel = c.recomendacion.relativo;
  const reco = c.recomendacion.regla;
  const vi = c.sintesis.valor_objetivo, viPot = c.sintesis.potencial_pct, viEsc = c.valor_ponderado, viEscPot = c.potencial_ponderado_pct;
  const regla = o.selector?.regla ?? o.version;
  const s = c.dcf.sostenibilidad ?? c.sostenibilidad ?? {};
  const evE = c.comparables.tabla.find((x) => x.es_objetivo)?.ev_ebitda_ltm;

  const objetivo_comentario = `El objetivo a 12 meses lo decide la ${regla}: con tres años de historia útil (cotiza desde jun-2023), el selector toma la más baja de v3 y v2. Ponderado ${es(o.objetivo_ponderado)} SAR (${pc(o.rentabilidad_ponderada_pct)}) y base ${es(o.objetivo_base)} SAR (${pc(o.rentabilidad_base_pct)}), con el dividendo de ≈ 3 SAR. La v2 deja el PER base en el actual (${es(O.actual, 1)} veces nuestro BPA de 2027e) y solo cobra el crecimiento del BPA; la v3 daría ${pc(v3?.rentabilidad_ponderada_pct)} ponderada y ${pc(v3?.rentabilidad_base_pct)} en el base, porque deja subir el PER un 10 % hacia su mediana adelantada (${es(O.mediana, 1)} veces). Con la v2 no se llega a los umbrales de compra (15 % y 12 %); compraríamos por debajo de ${es(o.comprar_por_debajo)} SAR, un ${es(Math.abs(o.comprar_por_debajo / P * 100 - 100), 1)} % por debajo del cierre. El valor intrínseco (${es(vi)} SAR, ${pc(viPot)}) sí está muy por encima del precio.`;

  const dcf_lectura = `El DCF da ${es(dcf.valor_accion)} SAR por acción, un ${es(dcf.potencial_pct, 1)} % más que el precio, con un WACC del ${es(wacc)} % y un crecimiento terminal del 3 %; el valor terminal pesa el ${dcf.peso_terminal_pct} %. El DCF inverso dice que el precio de ${es(P)} SAR descuenta una caída de las ventas del ${es(Math.abs(inv.crecimiento_implicito_pct), 1)} % anual en 2027-2032e (frente al +${es(inv.crecimiento_base_pct, 1)} % del base) o un margen EBITDA del ${es(inv.margen_implicito_pct, 1)} % (frente al ${es(inv.margen_base_pct, 1)} %), y que paga una rentabilidad implícita del ${es(inv.rentabilidad_implicita_pct, 1)} % anual, por encima del WACC. Con la prima implícita del mercado (4,2 %) el DCF sube a ${es(rel.dcf)} SAR. La distancia no es de flujo de caja (el negocio convierte bien y casi no invierte) sino de confianza: el mercado no cree que el beneficio de 2026 se sostenga.`;

  const escenarios_comentario = `La asimetría es favorable en valor intrínseco: el bajista (${es(esc.Bajista.valor)} SAR, ${pc(esc.Bajista.potencial_pct)}) recoge un frenazo de la construcción y un margen EBITDA del 6,1 % al final; el alcista llega a ${es(esc.Alcista.valor)} SAR (${pc(esc.Alcista.potencial_pct)}). Con probabilidades 25/50/25, el valor ponderado de los escenarios es de ${es(viEsc)} SAR (${pc(viEscPot)}), y el valor intrínseco de la síntesis, con los comparables, de ${es(vi)} SAR (${pc(viPot)}).`;

  const valoracion_comentario = `Pesos: DCF 40 %, escenarios 40 % y comparables 20 %; transacciones sin peso (no hay operaciones del sector con múltiplos publicados). Los comparables (mediana de 8,5 veces el EBITDA y ${es(O.compPer, 1)} veces el beneficio adelantado) dan ${es(c.sintesis.tabla.find((x) => x.metodo.startsWith('Comparables'))?.valor)} SAR: el mercado paga poco por todo el sector de personal, en Arabia Saudí y fuera. El puente parte del balance de junio de 2026: sin deuda financiera, arrendamientos (66,4 M), indemnizaciones por cese (144,5 M) como deuda, caja con fondos y sukuk (232,7 M) y el dividendo del 1S26 (32 M) pagado en agosto [A1, A11].`;

  const sostenibilidad_justificacion = `Sí. El crecimiento proyectado (${es(s.crecimiento_proyectado_pct ?? 10, 0)} % anual de media en 2027-2032e, del 13 % al 5 %) es la cuarta parte del histórico (+${es(s.tcac_ingresos_historica_pct ?? 40.8, 0)} % anual en 2021-2025) y apenas necesita capital: la reinversión es del ${es(s.tasa_reinversion_pct ?? 13, 0)} % del NOPAT y el ROIC es del ${es(roic, 1)} %, así que se financia sola. Prueba de cuota a mano (no hay cifra fiable del mercado: los estudios miden comisiones, no la facturación con sueldos) [B1]: Almawarid factura ≈ 30 % de lo que facturan las cuatro cotizadas del sector (≈ 9.700 M SAR en doce meses); con un sector al 7-10 % anual y Almawarid al 10 % de media, la cuota pasaría al ≈ 32-35 % en 2032e, una ganancia moderada frente a la de 2021-2025 [B4, A1]. Lo sostiene la calidad: foso estrecho (licencia, escala, costes generales del 2,6 % de las ventas, contratos de uno a dos años) y poder de precios demostrado en particulares y por horas [A1, B2]. Lo que lo pondría en duda: la construcción (46 % de las ventas) y el grupo vinculado Al Ayuni (15,7 %).`;

  const sintesis = `**La recomendación y por qué.** ${reco}, con convicción media. A 12 meses, la regla común (${regla}, por historia corta) da ${pc(o.rentabilidad_ponderada_pct)} ponderada y ${pc(o.rentabilidad_base_pct)} en el base (objetivo de ${es(o.objetivo_ponderado)} SAR frente a ${es(P)}), justo por debajo de los umbrales de compra (15 % y 12 %); la v3 daría ${pc(v3?.rentabilidad_ponderada_pct)}. El valor intrínseco es de ${es(vi)} SAR (${pc(viPot)}): el precio paga ${es(O.actual, 1)} veces nuestro BPA de 2027e por un negocio sin deuda que crece al 25 % y rinde un ROIC del ${es(roic, 1)} %. Calidad: ROIC − WACC de ${es(roic - wacc, 1)} puntos y sostenibilidad «Sí»: pasa el filtro de calidad. No es Comprar porque la regla común no deja que el múltiplo suba si la historia es corta, y el mercado lleva tres años pagando menos por cada riyal de beneficio. La convicción es media porque el valor (DCF y escenarios) y la regla a 12 meses apuntan en sentidos distintos: el negocio vale más que el precio, pero nada asegura que el mercado vuelva a pagar más por él en un año. La subirían un 3T26 fuerte (28-oct) con mejor conversión en caja y menos peso de la construcción; la bajarían una subida de tasas sin repercutir o un frenazo de Al Ayuni. Compraríamos por debajo de ${es(o.comprar_por_debajo)} SAR.

**El negocio.** Almawarid trae trabajadores extranjeros con visados a su nombre y los cede a empresas (81 % de las ventas del 1S26, sobre todo construcción, hostelería y comercio) y a familias (trabajadoras domésticas y limpieza por horas, 19 %) en Arabia Saudí; cobra una tarifa mensual que cubre el sueldo, las tasas, el alojamiento y su margen [A1]. Margen fino (EBITDA del 8 %) y casi sin capital: ROIC del ${es(roic, 1)} %.

**Sector y ciclo.** Cuatro cotizadas con licencia del Ministerio de Recursos Humanos (Maharah, Almawarid, SMASCO, Tamkeen) y cientos de oficinas pequeñas en Musaned [B2, B4]. La demanda depende del gasto público y de los gigaproyectos (construcción), del turismo y de la regulación del trabajo extranjero; en 2026, sueldos de las domésticas por canales oficiales de Musaned y un proyecto de nuevo reglamento [B3].

**Finanzas.** Ventas de 664 M SAR en 2021 a 2.611 M en 2025 y 2.940 M en doce meses; beneficio de 56 M a 138 M y 178 M [A8, A3, A1]. 1S26: ventas +27 % y beneficio +64 % [A1]. Sin deuda y con 233 M de caja e inversiones; el punto débil son los cobros (clientes y activos de contrato de 699 M) [A1].

**Equipo y gobierno.** Equipo estable, sin guía numérica; previsiones cualitativas cumplidas [C1]. Dos grupos de contratistas con el 23,94 % cada uno tras la salida a bolsa; uno de ellos (Al Ayuni) compra el 15,7 % de las ventas [C4, A9]. Sin registro de accionistas ni informe de remuneraciones accesibles.

**Valoración.** DCF de ${es(dcf.valor_accion)} SAR con WACC del ${es(wacc)} %; el DCF inverso dice que el precio descuenta ventas a la baja. Cotiza a ${es(evE, 1)} veces el EBITDA de doce meses, como sus comparables saudíes, que crecen la mitad. Cuatro analistas: comprar, objetivo medio de 126,14 SAR [D3].

**Riesgos y catalizadores.** Dominantes: la regulación del trabajo extranjero y doméstico, la construcción (46 %) y Al Ayuni (15,7 %); después, los cobros. Bajista de ${es(esc.Bajista.valor)} SAR. Catalizadores: resultados del 3T26 (28-oct) y de 2026 (≈ feb-2027), y una política de dividendos. Regla 13: no cambia (caída del 21 % desde agosto sin causa propia, sin colocaciones ni bloqueos pendientes).

**Qué cambiaría la decisión.** Compraríamos por debajo de ${es(o.comprar_por_debajo)} SAR; venderíamos por encima de ${es(o.vender_por_encima)} SAR o si la construcción y Al Ayuni recortaran contratos.`;

  R = {
    objetivo_comentario, dcf_lectura, escenarios_comentario, valoracion_comentario, sostenibilidad_justificacion,
    resumen: {
      recomendacion: reco, conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
      sintesis,
      tesis: `Almawarid es la segunda empresa saudí de cesión de mano de obra: trae trabajadores extranjeros y los cede a empresas y familias con un margen fino y casi sin capital [A1]. Ha multiplicado sus ventas por cuatro desde 2021 y el beneficio por tres, sin deuda y repartiendo un tercio del beneficio [A8, A3].\n\nEl precio (${es(P)} SAR, ${es(c.mercado.capitalizacion, 0)} M de capitalización) paga ${es(O.actual, 1)} veces nuestro BPA de 2027e; el DCF (${es(dcf.valor_accion)} SAR) dice que vale bastante más. Pero a 12 meses, con la regla común, la rentabilidad es de ${pc(o.rentabilidad_ponderada_pct)}: no basta para comprar sin que el mercado vuelva a pagar más por el beneficio, y los riesgos (regulación, construcción, un cliente vinculado) explican por qué no lo hace.`,
      vision_diferencial: {
        mercado_descuenta: 'Que el beneficio de 2026 es un máximo de ciclo: a 8 veces el BPA de 2027e y con el DCF inverso pidiendo ventas a la baja, el precio supone que la construcción, las tasas o la competencia se comerán el crecimiento.',
        nuestra_vision: 'Un negocio de alta rentabilidad sobre el capital que seguirá creciendo, más despacio (13 % en 2027e), con la hostelería, el ocio y la saudización compensando una construcción plana.',
        por_que: 'Hostelería y ocio +91 % y saudización +199 % en el 1S26, margen bruto de particulares +5,6 puntos y contratos del 70 % de las ventas a más de un año [A1, A5].',
      },
      a_favor: [
        `**Rentabilidad**: ROIC del ${es(roic, 1)} % sin deuda y con 233 M de caja e inversiones [A1].`,
        '**Crecimiento**: ventas +41 % anual en 2021-2025 y +27 % en el 1S26 [A8, A1].',
        `**Precio**: ${es(O.actual, 1)} veces nuestro BPA de 2027e; DCF de ${es(dcf.valor_accion)} SAR.`,
        '**Dividendo**: 3 SAR por acción en 2026 (≈ 3,4 %) con margen para subir [A11].',
        '**Analistas**: cuatro con comprar y objetivo medio de 126 SAR [D3].',
      ],
      en_contra: [
        '**Regulación**: tasas, Musaned y el nuevo reglamento de trabajadoras domésticas [B3].',
        '**Construcción**: 46 % de las ventas y plana desde 2025 [A1].',
        '**Vinculadas**: Al Ayuni, accionista del 23,94 %, compra el 15,7 % de las ventas [A9].',
        '**Cobros**: clientes y activos de contrato del 24 % de las ventas [A1].',
        '**Información**: cuentas anuales y registro de accionistas no accesibles; historia en bolsa de tres años.',
      ],
      que_vigilar: 'La tesis depende de que el crecimiento siga sin la construcción y de que la regulación no suba costes que no se puedan repercutir. Las señales: las ventas por tipo de cliente de cada trimestre (construcción frente a hostelería y comercio), el margen bruto de particulares, la provisión de insolvencias y el flujo operativo frente al beneficio, y la aprobación del reglamento de trabajadoras domésticas.',
      cambiaria_recomendacion: [
        `Precio por debajo de ${es(o.comprar_por_debajo)} SAR: pasaría a Comprar con la regla común.`,
        `Precio por encima de ${es(o.vender_por_encima)} SAR: pasaría a Vender.`,
        'Un 3T26 por encima de 55 M y un flujo operativo que alcance al beneficio: subiríamos la convicción.',
        'Ventas a construcción o a Al Ayuni a la baja sin sustituto, o tasas nuevas sin repercutir: bajaríamos el base.',
        'Colocación de Alomaier o de Al-Ayuni: revisaríamos la regla 13.',
      ],
      kpis_seguimiento: [
        { kpi: 'Ventas a construcción / total', nivel_actual: '46 % (1S26)', umbral_alerta: '< 330 M por trimestre', por_que: 'Concentración y ciclo.' },
        { kpi: 'Ventas a Al Ayuni y Limak / total', nivel_actual: '14,4 % (1S26)', umbral_alerta: '> 20 % o caída brusca', por_que: 'Vinculada.' },
        { kpi: 'Margen bruto de particulares', nivel_actual: '13,9 % (1S26)', umbral_alerta: '< 10 %', por_que: 'Competencia y regulación.' },
        { kpi: 'Flujo operativo / beneficio', nivel_actual: '49 % (1S26)', umbral_alerta: '< 50 % en un año entero', por_que: 'Cobros.' },
        { kpi: 'Provisión de insolvencias', nivel_actual: '60,1 M (jun-26)', umbral_alerta: '> 80 M', por_que: 'Calidad de los clientes.' },
      ],
      confianza: 'Media',
    },
  };
}
export default R;

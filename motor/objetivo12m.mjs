// Objetivo de precio a 12 meses (método v2/v3, `verticales/empresa/objetivo-12m.md`): NUESTRO BPA × NUESTRO PER,
// con la misma regla de múltiplos para todas las empresas. El consenso solo se compara, nunca entra en el cálculo.
// Sin dependencias: lo usan el motor (`calcular-empresa.mjs`) y `herramientas/apuntar-12m.mjs`.
//
// Regla de múltiplos v2 (cerrada el 14-oct-2026 para que sea igual en todas; historia del PER «al cierre»):
//   base    = el menor entre el PER actual (precio ÷ nuestro BPA del ejercicio siguiente) y la mediana de 5 años;
//   bajista = el mínimo de 5 años si queda por debajo del base; si no (la empresa ya cotiza en mínimos), base × 0,85;
//   alcista = la mayor entre la media histórica larga (sin años de pérdidas, burbuja o BPA atípico) y la mediana
//             de los comparables, sin bajar del base y con un techo de base × 1,30.
// Regla de múltiplos v3 (14-oct-2026, tras el backtest de `motor/backtest-multiplos.mjs`; solo si la historia
// viene en la MISMA base que el actual, `per_historico.base: "adelantado"` = precio de cierre de cada año ÷ BPA del
// año siguiente). El backtest con 188 cierres de 117 empresas mostró que v2 compara un PER adelantado con una
// historia al cierre (más alta) y por eso en el 83 % de los informes el base no supone ninguna revalorización, aunque
// las acciones por debajo de su mediana la revalorizaron un 11 % de mediana al año siguiente:
//   base    = el actual con la MITAD del camino hacia la mediana de 5 años (media geométrica), en los dos sentidos,
//             sin alejarse del actual más de ×1,3 ni menos de ÷1,3 (tope añadido tras la migración masiva del 14-oct);
//   bajista = el menor entre el mínimo de 5 años y base × 0,80;
//   alcista = la mayor entre la media larga, la mediana de 5 años y la de los comparables, sin bajar del base y con
//             un techo de base × 1,35.
// Con historia al cierre (informes anteriores al 14-oct) se sigue aplicando v2: el backtest enseñó que v3 sobre esa
// historia sobrestima (+12 % fuera de muestra).
// Objetivo = media de los tres ponderada con las probabilidades de los escenarios del informe (decisión del usuario,
// 13-oct); la media simple se da al lado. Rentabilidad = objetivo / precio − 1 + dividendo. Los pesos 15/70/15 se
// probaron en el backtest y no mejoran: se mantienen las probabilidades del informe (25/50/25 por defecto).
// Señal: Comprar si la ponderada ≥ 15 %, la del base ≥ 12 % y el valor intrínseco ≥ precio; Vender si la
// ponderada ≤ −10 %; Mantener en el resto. Con confianza de datos «Baja» (decisión del usuario, 14-oct), un
// Comprar se queda en Mantener hasta confirmar las cifras con fuente primaria (`senal_sin_confirmar` guarda el Comprar).

export const REGLA_12M = {
  descuentoBajista: 0.85, techoAlcista: 1.3, comprar: 15, comprarBase: 12, vender: -10,
  // topeBase: ×1,3 del 14-oct (mediodía) pasó a ×1,1 el mismo día por la tarde (backtest: en las desrateadas el sesgo baja de
  // +21 % a +3 % fuera de muestra). `topeBaseAnterior` se usa para dar la cifra con el tope viejo al lado.
  v3: { reversion: 0.5, descuentoBajista: 0.8, techoAlcista: 1.35, topeBase: 1.1, topeBaseAnterior: 1.3 },
  // Selector de método (14-oct-2026, 18:00; preregistro y backtest en verticales/empresa/backtest/selector-*.md): con historia
  // v3 y la v2 guardada al lado, decide v2 si la empresa está desrateada (mediana adelantada ≥ 1,8 × PER de hoy: la historia es
  // de otro régimen) y la más baja de las dos con 3 años o menos de historia adelantada. Los años con BPA atípico ya los limpia
  // `herramientas/historia-adelantada.mjs` (regla 1 del selector). `selector: false` da la v3 sin selector (versión anterior).
  selector: { activo: true, desrateada: 1.8, historiaCorta: 3 },
};

const num = (v) => (v === null || v === undefined || v === '' || Number.isNaN(Number(v)) ? null : Number(v));
const r = (x, d = 2) => (x === null || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);

// PER de cada escenario con la regla. h = { actual, mediana_5a, minimo_5a, media_larga, base? }, comps = { mediana }.
// h.base: "adelantado" (historia en la misma base que el actual → regla v3) o "cierre" / ausente (regla v2).
export function multiplosRegla(h = {}, comps = {}, { topeBase = null } = {}) {
  const actual = num(h.actual), med = num(h.mediana_5a), min = num(h.minimo_5a), larga = num(h.media_larga), cm = num(comps.mediana);
  const v3 = /^adelantad/i.test(String(h.base || ''));
  if (v3 && actual > 0 && med > 0) {
    const P = topeBase ? { ...REGLA_12M.v3, topeBase } : REGLA_12M.v3;
    const sinTope = actual * (med / actual) ** P.reversion;
    // Tope: el base no se aleja del actual más de ×1,1 ni menos de ÷1,1. Una acción que ha caído a un cuarto de su
    // múltiplo (Adobe en 2026) no recupera la mitad del camino en un año: en el backtest, en las que cotizan a menos
    // de 2/3 de su mediana, con ×1,3 el sesgo era +21 % y el error 21 %; con ×1,1, +2,6 % y 15 % (fuera de muestra).
    const base = Math.min(Math.max(sinTope, actual / P.topeBase), actual * P.topeBase);
    const conTope = Math.abs(base - sinTope) > 1e-9;
    const bajista = min !== null && min > 0 && min < base * P.descuentoBajista ? min : base * P.descuentoBajista;
    const arriba = Math.max(...[larga, med, cm].filter((x) => x !== null && x > 0), base);
    const alcista = Math.min(arriba, base * P.techoAlcista);
    return {
      version: 'v3', bajista: r(bajista, 1), base: r(base, 1), alcista: r(alcista, 1),
      bajista_origen: bajista === min ? 'mínimo de 5 años' : `base × ${P.descuentoBajista}`,
      base_origen: Math.abs(med - actual) < 1e-9 ? 'PER actual (igual a la mediana)' : conTope ? `PER actual (${r(actual, 1)}x) ${actual < med ? '×' : '÷'} ${P.topeBase} (tope: la mediana de 5 años, ${r(med, 1)}x, queda más lejos)` : actual < med ? `PER actual (${r(actual, 1)}x) a mitad de camino hacia la mediana de 5 años (${r(med, 1)}x)` : `PER actual (${r(actual, 1)}x) a mitad de camino hacia abajo, hacia la mediana de 5 años (${r(med, 1)}x)`,
      alcista_origen: alcista === base ? 'el base (ni la historia ni los comparables pagan más)'
        : alcista < arriba - 1e-9 ? `techo de base × ${P.techoAlcista}` : arriba === larga ? 'media histórica larga' : arriba === med ? 'mediana de 5 años' : 'mediana de los comparables',
    };
  }
  const cand = [actual, med].filter((x) => x !== null && x > 0);
  if (!cand.length) return null;
  const base = Math.min(...cand);
  const bajista = min !== null && min > 0 && min < base ? min : base * REGLA_12M.descuentoBajista;
  const arriba = Math.max(...[larga, cm].filter((x) => x !== null && x > 0), base);
  const alcista = Math.min(arriba, base * REGLA_12M.techoAlcista);
  return {
    version: 'v2', bajista: r(bajista, 1), base: r(base, 1), alcista: r(alcista, 1),
    bajista_origen: bajista === min ? 'mínimo de 5 años' : `base × ${REGLA_12M.descuentoBajista} (el mínimo de 5 años no queda por debajo del base)`,
    base_origen: base === actual ? 'PER actual' : 'mediana de 5 años',
    alcista_origen: alcista === base ? 'el base (ni la historia ni los comparables pagan más)'
      : alcista < arriba - 1e-9 ? `techo de base × ${REGLA_12M.techoAlcista}` : arriba === larga ? 'media histórica larga' : 'mediana de los comparables',
  };
}

export function senal12m(pond, base, vi = null, precio = null) {
  if (pond === null || pond === undefined) return null;
  if (pond <= REGLA_12M.vender) return 'Vender';
  const valorReal = vi === null || vi === undefined || !precio || vi >= precio;
  return pond >= REGLA_12M.comprar && base !== null && base >= REGLA_12M.comprarBase && valorReal ? 'Comprar' : 'Mantener';
}

// o = valoracion.objetivo_12m del informe; prob = [bajista, base, alcista] en %; dpa = dividendo por acción ordinario;
// confianza = la del resumen del informe («Baja» deja un Comprar en Mantener hasta confirmar los datos).
// Los casos con métrica distinta del PER (EV/EBITDA) llevan su precio y no se recalculan.
export function calcularObjetivo12m(o, opciones = {}) {
  const { precio, selector = REGLA_12M.selector.activo } = opciones;
  if (!o || !Array.isArray(o.casos) || !precio) return null;
  const ph = o.per_historico || {};
  const sinSel = calcularRegla(o, opciones);
  if (!selector || !sinSel?.completo || sinSel.version !== 'v3' || !ph.v2 || !num(ph.actual) || !num(ph.mediana_5a)) return sinSel ? { ...sinSel, selector: null } : sinSel;
  const oV2 = { ...o, per_historico: { ...ph.v2, actual: ph.actual, base: 'cierre' } };
  const conV2 = calcularRegla(oV2, opciones);
  const S = REGLA_12M.selector, q = ph.mediana_5a / ph.actual;
  const resumen = (c) => ({ version: c.version, rentabilidad_ponderada_pct: c.rentabilidad_ponderada_pct, rentabilidad_base_pct: c.rentabilidad_base_pct, senal: c.senal, objetivo_ponderado: c.objetivo_ponderado });
  let elegido = sinSel, regla = 'v3', motivo = 'sin marcas: decide la v3';
  if (conV2?.completo && q >= S.desrateada) { elegido = conV2; regla = 'v2'; motivo = `desrateada: la mediana adelantada (${r(ph.mediana_5a, 1)}x) es ${r(q, 1)} veces el PER de hoy (${r(ph.actual, 1)}x); la historia es de otro régimen y decide la v2`; }
  else if (conV2?.completo && num(ph.anios) !== null && ph.anios <= S.historiaCorta) {
    elegido = conV2.rentabilidad_ponderada_pct < sinSel.rentabilidad_ponderada_pct ? conV2 : sinSel; regla = elegido === conV2 ? 'v2' : 'v3';
    motivo = `historia adelantada de ${ph.anios} años: decide la más baja de v3 y v2 (${regla})`;
  }
  return { ...elegido, version: elegido.version, selector: { regla, motivo, v3_sin_selector: resumen(sinSel), v2: conV2?.completo ? resumen(conV2) : null } };
}

// La regla de múltiplos (v2 o v3 según la historia) sin el selector.
function calcularRegla(o, { precio, dpa = 0, prob = null, valorIntrinseco = null, confianza = null, topeBase = null } = {}) {
  if (!o || !Array.isArray(o.casos) || !precio) return null;
  const caso = (e) => o.casos.find((c) => new RegExp(e, 'i').test(c?.escenario || '')) || null;
  const regla = multiplosRegla(o.per_historico, o.comparables_per, { topeBase });
  const filas = ['Bajista', 'Base', 'Alcista'].map((e) => {
    const c = caso(e) || {}, k = e.toLowerCase();
    const bpa = num(c.beneficio_por_accion), esPer = !c.metrica || /^PER/i.test(c.metrica);
    const multiplo = esPer && regla ? regla[k] : num(c.multiplo);
    const precioObj = esPer ? (multiplo !== null && bpa !== null ? multiplo * bpa : null) : num(c.precio);
    return { escenario: e, metrica: c.metrica || 'PER', beneficio_por_accion: bpa, multiplo: r(multiplo, 1),
      multiplo_informe: num(c.multiplo), origen: esPer && regla ? regla[`${k}_origen`] : 'métrica propia del caso',
      precio: r(precioObj), rentabilidad_pct: precioObj === null ? null : r((100 * (precioObj + dpa)) / precio - 100, 1), justificacion: c.justificacion ?? null };
  });
  if (filas.some((f) => f.precio === null)) return { filas, regla, completo: false };
  const p = Array.isArray(prob) && prob.length === 3 && prob.every((x) => num(x) !== null) && prob.reduce((s, x) => s + +x, 0) > 0 ? prob.map(Number) : [25, 50, 25];
  const ponderado = filas.reduce((s, f, i) => s + f.precio * p[i], 0) / p.reduce((s, x) => s + x, 0);
  const simple = filas.reduce((s, f) => s + f.precio, 0) / 3;
  const rent = (v) => (100 * (v + dpa)) / precio - 100;
  const [baj, bas, alc] = filas;
  const rp = rent(ponderado), rb = rent(bas.precio);
  const cons = num(o.consenso?.objetivo_medio);
  const senalRegla = senal12m(rp, rb, valorIntrinseco, precio);
  const confianzaBaja = /^baja/i.test(String(confianza || ''));
  const senal = confianzaBaja && senalRegla === 'Comprar' ? 'Mantener' : senalRegla;
  return {
    completo: true, filas, regla, version: regla?.version ?? 'v2', probabilidades: p,
    objetivo_ponderado: r(ponderado), objetivo_simple: r(simple), objetivo_base: bas.precio,
    rentabilidad_ponderada_pct: r(rp, 1), rentabilidad_simple_pct: r(rent(simple), 1), rentabilidad_base_pct: r(rb, 1),
    asimetria: baj.precio < precio ? r((alc.precio / precio - 1) / Math.abs(baj.precio / precio - 1), 2) : null,
    senal, senal_sin_confirmar: senal !== senalRegla ? senalRegla : null, confianza_baja: confianzaBaja,
    // Precios a los que cambia la señal (con el dividendo por acción fijo).
    comprar_por_debajo: r(Math.min((ponderado + dpa) / (1 + REGLA_12M.comprar / 100), (bas.precio + dpa) / (1 + REGLA_12M.comprarBase / 100), valorIntrinseco ?? Infinity)),
    vender_por_encima: r((ponderado + dpa) / (1 + REGLA_12M.vender / 100)),
    consenso_objetivo: cons, diferencia_consenso_pct: cons ? r((100 * bas.precio) / cons - 100, 1) : null,
  };
}

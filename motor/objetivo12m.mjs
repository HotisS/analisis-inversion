// Objetivo de precio a 12 meses (método v2, `verticales/empresa/objetivo-12m.md`): NUESTRO BPA × NUESTRO PER,
// con la misma regla de múltiplos para todas las empresas. El consenso solo se compara, nunca entra en el cálculo.
// Sin dependencias: lo usan el motor (`calcular-empresa.mjs`) y `herramientas/apuntar-12m.mjs`.
//
// Regla de múltiplos (v2, cerrada el 14-oct-2026 para que sea igual en todas):
//   base    = el menor entre el PER actual (precio ÷ nuestro BPA del ejercicio siguiente) y la mediana de 5 años;
//   bajista = el mínimo de 5 años si queda por debajo del base; si no (la empresa ya cotiza en mínimos), base × 0,85;
//   alcista = la mayor entre la media histórica larga (sin años de pérdidas, burbuja o BPA atípico) y la mediana
//             de los comparables, sin bajar del base y con un techo de base × 1,30 (en un año el mercado no
//             revaloriza más de un 30 % el múltiplo: es lo que salió, caso a caso, en las revisiones del 12-oct).
// Objetivo = media de los tres ponderada con las probabilidades de los escenarios del informe (decisión del usuario,
// 13-oct); la media simple se da al lado. Rentabilidad = objetivo / precio − 1 + dividendo.
// Señal: Comprar si la ponderada ≥ 15 %, la del base ≥ 12 % y el valor intrínseco ≥ precio; Vender si la
// ponderada ≤ −10 %; Mantener en el resto.

export const REGLA_12M = { descuentoBajista: 0.85, techoAlcista: 1.3, comprar: 15, comprarBase: 12, vender: -10 };

const num = (v) => (v === null || v === undefined || v === '' || Number.isNaN(Number(v)) ? null : Number(v));
const r = (x, d = 2) => (x === null || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);

// PER de cada escenario con la regla. h = { actual, mediana_5a, minimo_5a, media_larga }, comps = { mediana }.
export function multiplosRegla(h = {}, comps = {}) {
  const actual = num(h.actual), med = num(h.mediana_5a), min = num(h.minimo_5a), larga = num(h.media_larga), cm = num(comps.mediana);
  const cand = [actual, med].filter((x) => x !== null && x > 0);
  if (!cand.length) return null;
  const base = Math.min(...cand);
  const bajista = min !== null && min > 0 && min < base ? min : base * REGLA_12M.descuentoBajista;
  const arriba = Math.max(...[larga, cm].filter((x) => x !== null && x > 0), base);
  const alcista = Math.min(arriba, base * REGLA_12M.techoAlcista);
  return {
    bajista: r(bajista, 1), base: r(base, 1), alcista: r(alcista, 1),
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

// o = valoracion.objetivo_12m del informe; prob = [bajista, base, alcista] en %; dpa = dividendo por acción ordinario.
// Los casos con métrica distinta del PER (EV/EBITDA) llevan su precio y no se recalculan.
export function calcularObjetivo12m(o, { precio, dpa = 0, prob = null, valorIntrinseco = null } = {}) {
  if (!o || !Array.isArray(o.casos) || !precio) return null;
  const caso = (e) => o.casos.find((c) => new RegExp(e, 'i').test(c?.escenario || '')) || null;
  const regla = multiplosRegla(o.per_historico, o.comparables_per);
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
  return {
    completo: true, filas, regla, probabilidades: p,
    objetivo_ponderado: r(ponderado), objetivo_simple: r(simple), objetivo_base: bas.precio,
    rentabilidad_ponderada_pct: r(rp, 1), rentabilidad_simple_pct: r(rent(simple), 1), rentabilidad_base_pct: r(rb, 1),
    asimetria: baj.precio < precio ? r((alc.precio / precio - 1) / Math.abs(baj.precio / precio - 1), 2) : null,
    senal: senal12m(rp, rb, valorIntrinseco, precio),
    // Precios a los que cambia la señal (con el dividendo por acción fijo).
    comprar_por_debajo: r(Math.min((ponderado + dpa) / (1 + REGLA_12M.comprar / 100), (bas.precio + dpa) / (1 + REGLA_12M.comprarBase / 100), valorIntrinseco ?? Infinity)),
    vender_por_encima: r((ponderado + dpa) / (1 + REGLA_12M.vender / 100)),
    consenso_objetivo: cons, diferencia_consenso_pct: cons ? r((100 * bas.precio) / cons - 100, 1) : null,
  };
}

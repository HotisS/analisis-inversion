// Convicción sugerida a partir de las cifras del motor (aprobado por el usuario el 9 oct 2026). La convicción
// mide cuánto nos jugamos en la recomendación; antes se decidía a ojo y casi todo salía «Baja» porque nuestras
// previsiones suelen coincidir con el consenso. Estos criterios la hacen comparable entre informes. El analista
// puede apartarse, pero entonces explica en la síntesis por qué.
//
//   Alta, Comprar: las dos reglas dan Comprar, rentabilidad total esperada ≥ 25 %, asimetría ≥ 2, el bajista no
//     pierde más del 25 % y el precio descuenta al menos 3 puntos menos de crecimiento que nuestro caso base.
//   Alta, Vender: las dos reglas dan Vender, rentabilidad ≤ −20 % (≤ −15 % con la prima del mercado) y el precio
//     descuenta al menos 5 puntos más de crecimiento que nuestro caso base.
//   Baja: las reglas discrepan, o la recomendación está a menos de 3 puntos de su umbral (15 % para Comprar,
//     −10 % para Vender) con la regla que manda.
//   Media: el resto.

const UMBRAL = { Comprar: 15, Vender: -10 };

export function conviccionSugerida({ recomendacion, reglaAbs, reglaRel, rte, rteRel, asimetria, bajista, gImplicito, gBase }) {
  const razones = [];
  const v = (x) => x !== null && x !== undefined && Number.isFinite(+x);
  const f = (x, d = 1) => (+x).toFixed(d).replace('.', ',');
  const brecha = v(gImplicito) && v(gBase) ? gBase - gImplicito : null; // > 0: el precio pide menos de lo que proyectamos
  if (!recomendacion || !v(rte)) return { conviccion: null, razones: ['Faltan la recomendación o la rentabilidad esperada.'] };

  const coinciden = !reglaRel || !reglaAbs || reglaAbs === reglaRel;
  if (!coinciden) razones.push(`las reglas discrepan (absoluta ${reglaAbs}, relativa ${reglaRel})`);
  const rteManda = reglaRel && v(rteRel) ? rteRel : rte;
  if (UMBRAL[recomendacion] !== undefined && Math.abs(rteManda - UMBRAL[recomendacion]) < 3)
    razones.push(`la rentabilidad que decide (${f(rteManda)} %) está a menos de 3 puntos del umbral de ${recomendacion} (${f(UMBRAL[recomendacion], 0)} %)`);
  if (razones.length) return { conviccion: 'Baja', razones };

  if (recomendacion === 'Comprar' && coinciden) {
    const fallos = [];
    if (rte < 25) fallos.push(`rentabilidad del ${f(rte)} % (< 25 %)`);
    if (!v(asimetria) || asimetria < 2) fallos.push(`asimetría de ${v(asimetria) ? f(asimetria, 2) : 'n.d.'} (< 2)`);
    if (!v(bajista) || bajista < -25) fallos.push(`bajista del ${v(bajista) ? f(bajista) : 'n.d.'} % (pierde más del 25 %)`);
    if (brecha === null || brecha < 3) fallos.push(`el precio descuenta ${brecha === null ? 'un crecimiento sin calcular' : `solo ${f(brecha)} puntos menos de crecimiento que el caso base`} (< 3)`);
    if (!fallos.length) return { conviccion: 'Alta', razones: [`las dos reglas dan Comprar, rentabilidad del ${f(rte)} %, asimetría de ${f(asimetria, 2)}, bajista del ${f(bajista)} % y el precio descuenta ${f(brecha)} puntos menos de crecimiento que el caso base`] };
    return { conviccion: 'Media', razones: [`no llega a Alta: ${fallos.join('; ')}`] };
  }
  if (recomendacion === 'Vender' && coinciden) {
    const fallos = [];
    if (rte > -20) fallos.push(`rentabilidad del ${f(rte)} % (> −20 %)`);
    if (v(rteRel) && rteRel > -15) fallos.push(`con la prima del mercado, ${f(rteRel)} % (> −15 %)`);
    if (brecha === null || brecha > -5) fallos.push(`el precio pide ${brecha === null ? 'un crecimiento sin calcular' : `${f(-brecha)} puntos más de crecimiento que el caso base`} (< 5)`);
    if (!fallos.length) return { conviccion: 'Alta', razones: [`las dos reglas dan Vender, rentabilidad del ${f(rte)} %${v(rteRel) ? ` (${f(rteRel)} % con la prima del mercado)` : ''} y el precio pide ${f(-brecha)} puntos más de crecimiento que el caso base`] };
    return { conviccion: 'Media', razones: [`no llega a Alta: ${fallos.join('; ')}`] };
  }
  return { conviccion: 'Media', razones: ['Mantener con las dos reglas de acuerdo y lejos de los umbrales'] };
}

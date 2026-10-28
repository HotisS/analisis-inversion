// Pruebas de robustez (14-oct-2026): detectan los informes en los que el método puede chirriar ANTES de dar una señal,
// y dicen cómo se trata cada caso. No cambian el método ni los datos: leen el último datos*.json de cada informe,
// `verticales/empresa/objetivo12m-revisados.json` y `verticales/empresa/precios.json`, y recalculan con la MISMA función
// del motor (`motor/objetivo12m.mjs`) bajo variantes razonables. Procedimiento y significado de cada prueba:
// `verticales/empresa/robustez.md`. Paso obligatorio de `/analiza-empresa` y de cualquier orden.
//
//   node herramientas/robustez.mjs <carpeta> [<carpeta> …]      informe de pruebas de esas empresas
//   node herramientas/robustez.mjs --todas                      todas las de informes/ (escribe verticales/empresa/robustez.json
//                                                               y verticales/empresa/robustez.md con --escribir)
//   … --escribir                                                guarda los resultados (si no, solo imprime)
//   … --json                                                    imprime el JSON en vez del texto
//   … --actual                                                  con la sesión en curso de precios.json (si la hay) en vez del
//                                                               último cierre (escáner diario, herramientas/escaner-diario.mjs)
//   … --bpa-factor 0,95                                         «Vup» del escáner: BPA de los tres escenarios × factor (resultados
//                                                               publicados después del informe); solo en memoria, no toca el informe
//
// DOS PREGUNTAS DISTINTAS (27-oct-2026, caso Aon: la foto de cartera leyó «No mantener» de la acción robusta como venta):
//   «¿se compra?»  → `compra_robusta` (sí/no) y `accion_robusta` (Comprar, Esperar, No comprar…). Sale de la PEOR lectura
//                    defendible: sirve para NO comprar, nunca para vender.
//   «¿se queda?»   → `senal_cartera` (Mantener / Vender). Sale de la regla VIGENTE (filtro de mantener) y de la calidad
//                    (ROIC − WACC < 4,5 sin excepción). Es la única que puede dar una venta (y luego mandan las reglas de
//                    Hotis: 3 meses, no_vender). `lectura_mas_dura` guarda la peor lectura solo como dato.
//
// Niveles de compra (regla 16, 20-oct-2026): «nivel» (A, B1, B2, C o null) al precio de hoy y «limites_nivel_cot» con el
// límite de cada nivel al que puede llegar la empresa. La acción robusta sigue siendo la de A.
//
// Tratamientos (columna «tratamiento»):
//   CORREGIR   el dato está mal (precio, divisa, BPA): no se da señal hasta corregirlo.
//   VARIANTE   el dato está bien, pero la regla no sirve para esta empresa: decide la variante que se indica.
//   CONFIANZA  la cifra depende de algo poco firme: un Comprar baja a Mantener (como la confianza «Baja»).
//   AVISO      no cambia la señal; se dice en la defensa.
// Veredicto de la señal: SÓLIDA (todas las variantes razonables dan la misma acción), FRÁGIL (alguna la cambia; se dice
// cuál) o BLOQUEADA (hay un CORREGIR).
import { RUTA_MOVIMIENTO } from './movimiento.mjs';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { ultimoDatos } from './objetivo12m.mjs';
import { calcularObjetivo12m, multiplosRegla, senal12m, REGLA_12M } from '../motor/objetivo12m.mjs';
import { leerPrecios, factorDivisa } from './precios.mjs';
import { slugCarpeta, carpetaMasNueva } from './carpetas.mjs';
import { calidadAmpliada, avisoRiesgo } from '../motor/calidad-ampliada.mjs';

const args = process.argv.slice(2);
const bandera = (k) => { const i = args.indexOf(k); if (i >= 0) args.splice(i, 1); return i >= 0; };
const iBpa = args.indexOf('--bpa-factor'), BPA_FACTOR = iBpa >= 0 ? Number(String(args.splice(iBpa, 2)[1]).replace(',', '.')) : 1;
if (!(BPA_FACTOR > 0)) throw new Error('--bpa-factor necesita un número positivo (ej. 0.95)');
const todas = bandera('--todas'), escribir = bandera('--escribir'), comoJson = bandera('--json'), actual = bandera('--actual');
const HOY = new Date().toISOString().slice(0, 10);
const num = (v) => (v === null || v === undefined || v === '' || Number.isNaN(Number(v)) ? null : Number(v));
const r = (x, d = 1) => (x === null || x === undefined || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
const f = (x, d = 1) => (x === null || x === undefined ? 'n.d.' : x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));
const dias = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);

const REV = JSON.parse(readFileSync(new URL('../verticales/empresa/objetivo12m-revisados.json', import.meta.url), 'utf8')).revisados;
const PRECIOS = leerPrecios()?.precios || {};
const REGLAS = existsSync('escaner/reglas.json') ? JSON.parse(readFileSync('escaner/reglas.json', 'utf8')) : {}; // exclusiones del usuario (MEMORIA.md)
const MOVIMIENTO = existsSync(RUTA_MOVIMIENTO) ? JSON.parse(readFileSync(RUTA_MOVIMIENTO, 'utf8')) : null; // herramientas/movimiento.mjs --todas --escribir
// Umbrales de MEMORIA.md: comprar (motor) y seguir en cartera (ponderada ≥ 10 %, base ≥ 5 %, VI no más de un 15 % bajo el precio).
const U = { comprar: REGLA_12M.comprar, comprarBase: REGLA_12M.comprarBase, mantener: 10, mantenerBase: 5, viMantener: 0.85 };
// Tipos de cambio aproximados para reconocer un precio en otra divisa (prueba D2).
const FX = { 'USD/EUR': 1.11, 'GBP/EUR': 0.85, 'USD/GBP': 1.32, 'CHF/EUR': 0.94, 'CAD/USD': 1.38, 'JPY/USD': 150, 'DKK/EUR': 7.46, 'SEK/EUR': 11, 'peniques': 100, 'AUD/USD': 1.5 };

const carpetas = todas
  ? readdirSync('informes', { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort()
  : args.map((a) => a.replace(/\/$/, '').replace(/^informes\//, ''));
if (!carpetas.length) throw new Error('Indica carpetas de informes/ o --todas');

// ---------- Cálculo con variantes ----------
// Igual que apuntar-12m: con otro precio, el PER actual se mueve en proporción; dividendo y VI fijos.
function contexto(d) {
  const o = d.valoracion?.objetivo_12m;
  const precioInforme = num(d.identificacion?.precio);
  const div = num(d.calc?.recomendacion?.dividendo_pct) || 0;
  const prob = ['bajista', 'base', 'alcista'].map((e) => (d.escenarios?.casos || []).find((c) => new RegExp(e, 'i').test(c.escenario || ''))?.probabilidad_pct ?? null);
  // Calidad (§4.1): sostenibilidad del crecimiento y ROIC − WACC del último ejercicio real (como en escaner-diario.mjs).
  const rw = (d.calc?.roic_frente_wacc || []).filter((x) => num(x.roic_pct) !== null && num(x.wacc_pct) !== null && !/e$/i.test(String(x.periodo))).at(-1);
  return { o, precioInforme, dpa: (div / 100) * precioInforme, div, prob: prob.every((x) => x !== null) ? prob : null,
    vi: num(d.calc?.sintesis?.valor_objetivo), confianza: d.resumen?.confianza ?? null,
    sost: d.calc?.dcf?.sostenibilidad?.veredicto ?? d.dcf?.sostenibilidad?.veredicto ?? null, roicWacc: rw ? rw.roic_pct - rw.wacc_pct : null,
    contextoMercado: d.bolsa?.contexto ?? d.contexto_mercado ?? null };
}
function evaluar(cx, { precio, historia = 'vigente', topeBase = null, prob = null, escalaBpa = 1, sinDobleCastigo = false, sinConfianza = false, sinSelector = false, moverPer = false } = {}) {
  // Objetivo FIJO (regla vigente desde cd21cd3): el objetivo se calcula al precio del informe y la rentabilidad, al precio pedido.
  const o2 = JSON.parse(JSON.stringify(cx.o));
  const ph = o2.per_historico || {};
  if (historia === 'v2' && ph.v2) o2.per_historico = { ...ph.v2, actual: ph.actual, base: 'cierre' };
  // Solo para medir M6 (cuánto se movería el objetivo si se recalculase con el PER de otro precio).
  const pCalc = moverPer ? precio : cx.precioInforme;
  if (moverPer && o2.per_historico?.actual) o2.per_historico.actual = Math.round(+o2.per_historico.actual * (precio / cx.precioInforme) * 100) / 100;
  for (const c of o2.casos) if (num(c.beneficio_por_accion) !== null) c.beneficio_por_accion = +c.beneficio_por_accion * escalaBpa;
  if (sinDobleCastigo) {
    // Si el BPA bajista ya recoge el riesgo (≥ 15 % bajo el base), el PER bajista no baja de base × 0,80 (propuesta Edenred).
    const reg = multiplosRegla(o2.per_historico, o2.comparables_per, { topeBase });
    const baj = o2.casos.find((c) => /bajista/i.test(c.escenario || '')), bas = o2.casos.find((c) => /base/i.test(c.escenario || ''));
    if (reg && baj && bas && (!baj.metrica || /^PER/i.test(baj.metrica)) && +baj.beneficio_por_accion <= 0.85 * +bas.beneficio_por_accion && reg.bajista < 0.8 * reg.base) {
      baj.metrica = 'Múltiplo corregido (PER base × 0,80)'; baj.precio = 0.8 * reg.base * +baj.beneficio_por_accion;
    }
  }
  const c = calcularObjetivo12m(o2, { precio: pCalc, dpa: cx.dpa, prob: prob || cx.prob, valorIntrinseco: cx.vi, confianza: sinConfianza ? null : cx.confianza, topeBase, selector: !sinSelector });
  if (!c?.completo || precio === pCalc) return c;
  const rent = (v) => Math.round((1000 * (v + cx.dpa)) / precio - 1000) / 10;
  const rp = rent(c.objetivo_ponderado), rb = rent(c.objetivo_base);
  const senalRegla = senal12m(rp, rb, cx.vi, precio);
  const senal = c.confianza_baja && senalRegla === 'Comprar' ? 'Mantener' : senalRegla;
  return { ...c, rentabilidad_ponderada_pct: rp, rentabilidad_base_pct: rb, senal, senal_sin_confirmar: senal !== senalRegla ? senalRegla : null };
}
const pasaComprar = (c, precio, vi) => c && c.rentabilidad_ponderada_pct >= U.comprar && c.rentabilidad_base_pct >= U.comprarBase && (vi === null || vi >= precio);
const pasaMantener = (c, precio, vi) => c && c.rentabilidad_ponderada_pct >= U.mantener && c.rentabilidad_base_pct >= U.mantenerBase && (vi === null || vi >= U.viMantener * precio);

// ---------- Pruebas ----------
function probar(carpeta) {
  const d = ultimoDatos(carpeta);
  if (!d?.valoracion?.objetivo_12m?.casos) return null;
  const cx = contexto(d);
  if (BPA_FACTOR !== 1) for (const c of cx.o.casos || []) if (num(c.beneficio_por_accion) !== null) c.beneficio_por_accion = +c.beneficio_por_accion * BPA_FACTOR;
  const id = d.identificacion || {}, meta = d.meta || {};
  // La clave sale de objetivo12m-revisados.json; si apunta a otro informe de la misma empresa (uno más viejo), se reconoce por
  // el nombre de la carpeta (caso CR Sanjiu, 26-oct: el escáner usaba el límite del informe viejo).
  const revExacto = Object.entries(REV).find(([, v]) => v.carpeta === carpeta);
  const rev = revExacto || Object.entries(REV).find(([, v]) => slugCarpeta(v.carpeta || '') === slugCarpeta(carpeta));
  const clave = rev?.[0] || String(id.ticker || '').trim().toUpperCase().replace(/\s+/g, '-');
  const pr = PRECIOS[clave] || Object.values(PRECIOS).find((x) => x.carpeta === carpeta) || null;
  const tc = num(meta.tipo_cambio) || 1, divCot = meta.divisa_cotizacion || meta.divisa;
  const fac = pr && !pr.error ? factorDivisa(pr.divisa, divCot) : null;
  const prP = actual && pr?.en_curso ? pr.en_curso.precio : pr?.precio; // --actual: sesión en curso si la hay
  const precioYahoo = pr && fac !== null && !pr.error ? prP * fac * tc : null; // en la divisa de las cuentas
  const precio = precioYahoo ?? revExacto?.[1]?.precio_ref ?? cx.precioInforme;
  const marcas = [];
  const marca = (codigo, tratamiento, texto) => marcas.push({ codigo, tratamiento, texto });

  // --- D: datos ---
  // D1 precio del informe frente al mercado; D2 si la diferencia es un tipo de cambio o peniques.
  if (precioYahoo) {
    const ratio = cx.precioInforme / precioYahoo;
    const min52 = num(id.min_52s), max52 = num(id.max_52s);
    if (ratio < 0.8 || ratio > 1.25) {
      const fx = Object.entries(FX).find(([, v]) => [v, 1 / v].some((x) => Math.abs(ratio / x - 1) < 0.08));
      if (fx) marca('D2', 'CORREGIR', `El precio del informe (${f(cx.precioInforme, 2)}) es ${f(ratio, 3)} veces el de mercado (${f(precioYahoo, 2)}): parece otra divisa (${fx[0]}). Revisar divisa de cotización y tipo de cambio.`);
      else marca('D1', 'CORREGIR', `El precio del informe (${f(cx.precioInforme, 2)}) se separa un ${f((ratio - 1) * 100, 0)} % del de mercado (${f(precioYahoo, 2)}). Comprobar el precio antes de usar el informe.`);
    }
    if (min52 && max52 && cx.precioInforme / tc > 0 && (cx.precioInforme < min52 * 0.9 || cx.precioInforme > max52 * 1.1)) {
      // El rango de 52 semanas va en la divisa de cotización en unos informes y en la de cuentas en otros: se prueban las dos.
      const pc = cx.precioInforme / tc;
      if ((pc < min52 * 0.9 || pc > max52 * 1.1)) marca('D1', 'CORREGIR', `El precio del informe queda fuera de su rango de 52 semanas (${f(min52, 2)}-${f(max52, 2)}): precio o rango mal leídos.`);
    }
  } else marca('D3', 'AVISO', `Sin cierre de mercado en precios.json${pr?.error ? ` (${pr.error})` : ''}: no se puede comprobar el precio.`);
  const fechaPrecio = (actual && pr?.en_curso?.fecha) || pr?.fecha || revExacto?.[1]?.fecha_precio || id.fecha_precio;
  if (fechaPrecio && dias(fechaPrecio, HOY) > 4) marca('D3', 'CORREGIR', `Precio del ${fechaPrecio} (${dias(fechaPrecio, HOY)} días): actualizar con herramientas/precios.mjs antes de dar señal.`);
  // D4 BPA real coherente con beneficio ÷ acciones.
  const cuenta = (d.financieros?.cuenta || []).filter((c) => num(c.bpa) !== null);
  const u = cuenta.at(-1), pen = cuenta.at(-2);
  if (u && num(u.beneficio_neto) && num(u.acciones_diluidas)) {
    const calc = u.beneficio_neto / u.acciones_diluidas, q = u.bpa / calc;
    if (q < 0.85 || q > 1.15) marca('D4', 'AVISO', `BPA ${u.periodo} (${f(u.bpa, 2)}) no casa con beneficio ÷ acciones (${f(calc, 2)}): ¿BPA ajustado, otra divisa o acciones en otra unidad? Comprobar que los escenarios usan la misma base.`);
  }
  // D5 beneficio con partidas que no se repiten: tipo efectivo raro, beneficio > EBIT, o salto de BPA sin salto de EBIT.
  if (u && num(u.bai) > 0 && num(u.impuestos) !== null) {
    const t = (100 * u.impuestos) / u.bai;
    if (t < 8) marca('D5', 'VARIANTE', `Tipo impositivo efectivo ${u.periodo} del ${f(t, 0)} % (impuestos ${f(u.impuestos, 0)} sobre BAI ${f(u.bai, 0)}): BPA inflado por créditos o liberaciones fiscales (caso Uber). La historia del PER y el contraste deben ir con BPA normalizado (tipo del DCF); no usar la historia v3 construida con ese BPA.`);
    if (t > 45) marca('D5', 'AVISO', `Tipo efectivo ${u.periodo} del ${f(t, 0)} %: BPA deprimido por algo puntual; la historia del PER de ese año sale alta.`);
  }
  if (u && num(u.ebit) > 0 && num(u.beneficio_neto) > 1.05 * u.ebit) marca('D5', 'VARIANTE', `Beneficio neto ${u.periodo} (${f(u.beneficio_neto, 0)}) mayor que el EBIT (${f(u.ebit, 0)}): hay ganancias que no son del negocio (participadas, ventas de activos, impuestos). Decidir con el BPA normalizado.`);
  if (u && pen && pen.bpa > 0 && u.bpa / pen.bpa > 1.5 && num(u.ebit) && num(pen.ebit) > 0 && u.ebit / pen.ebit < 1.25) marca('D5', 'VARIANTE', `El BPA salta un ${f((u.bpa / pen.bpa - 1) * 100, 0)} % en ${u.periodo} con el EBIT subiendo solo un ${f((u.ebit / pen.ebit - 1) * 100, 0)} %: beneficio no recurrente.`);
  // D6 crecimiento implícito del BPA hasta el ejercicio objetivo.
  const o = cx.o, casos = o.casos || [];
  const bpaBase = num(casos.find((c) => /base/i.test(c.escenario || ''))?.beneficio_por_accion);
  const anioObj = num(String(o.ejercicio || '').match(/(\d{4})/)?.[1]);
  const anioU = num(String(u?.periodo || '').match(/(\d{4})/)?.[1]);
  let cagr = null;
  if (bpaBase > 0 && u?.bpa > 0 && anioObj && anioU && anioObj > anioU) {
    cagr = 100 * ((bpaBase / u.bpa) ** (1 / (anioObj - anioU)) - 1);
    // Rebote ya visible (robustez.md: «salvo rebote explicado»): si desde el BPA de los últimos doce meses el crecimiento
    // hasta el objetivo es ≤ 25 % anual, el año malo ya se ha recuperado en las cuentas y la marca queda en AVISO.
    const ltm = d.financieros?.ltm, finLtm = ltm?.fecha_fin ? new Date(ltm.fecha_fin) : null;
    const aniosLtm = finLtm && !isNaN(finLtm) ? (new Date(`${anioObj}-12-31`) - finLtm) / (365.25 * 864e5) : null;
    const cagrLtm = num(ltm?.bpa) > 0 && aniosLtm > 0.5 ? 100 * ((bpaBase / ltm.bpa) ** (1 / aniosLtm) - 1) : null;
    if (cagr > 25 && cagrLtm !== null && cagrLtm <= 25) marca('D6', 'AVISO', `Nuestro BPA base ${o.ejercicio} (${f(bpaBase, 2)}) supone crecer un ${f(cagr, 0)} % al año desde ${u.periodo} (${f(u.bpa, 2)}), pero solo un ${f(cagrLtm, 0)} % desde el BPA de los últimos doce meses (${ltm.periodo || 'LTM'}: ${f(ltm.bpa, 2)}): rebote ya visible en las cuentas.`);
    else if (cagr > 25) marca('D6', 'CONFIANZA', `Nuestro BPA base ${o.ejercicio} (${f(bpaBase, 2)}) supone crecer un ${f(cagr, 0)} % al año desde ${u.periodo} (${f(u.bpa, 2)}). Si es un rebote de un año malo, decirlo; si no, la cifra depende de un crecimiento difícil de sostener.`);
    if (cagr < -5) marca('D6', 'AVISO', `Nuestro BPA base cae un ${f(-cagr, 0)} % al año hasta ${o.ejercicio}: comprobar que no se castiga dos veces con el múltiplo.`);
  }
  // D7 contraste con el consenso del mismo ejercicio.
  const cons = (d.consenso?.estimaciones || []).find((e) => String(e.periodo || '').includes(String(anioObj)) && num(e.bpa) > 0);
  const bpaCons = num(cons?.bpa) ?? null;
  const difCons = bpaCons && bpaBase ? 100 * (bpaBase / bpaCons - 1) : null;
  if (difCons !== null && Math.abs(difCons) > 15) marca('D7', difCons > 0 ? 'VARIANTE' : 'AVISO', `Nuestro BPA base ${o.ejercicio} (${f(bpaBase, 2)}) se separa un ${f(difCons, 0)} % del consenso (${f(bpaCons, 2)}). ${difCons > 0 ? 'Por encima de la calle: la señal tiene que aguantar con el BPA del consenso (variante «BPA consenso»).' : 'Por debajo de la calle: somos prudentes; comprobar que no es un error de base (ajustado frente a publicado).'}`);

  // --- M: múltiplo ---
  const ph = o.per_historico || {};
  const v3 = /^adelantad/i.test(String(ph.base || ''));
  const kP = precio / cx.precioInforme;
  const actualHoy = num(ph.actual) ? ph.actual * kP : null;
  if (v3 && actualHoy && num(ph.mediana_5a)) {
    const q = ph.mediana_5a / actualHoy;
    if (q >= 1.8) marca('M1', 'VARIANTE', `Desrateada: la mediana adelantada de 5 años (${f(ph.mediana_5a, 1)}x) es ${f(q, 1)} veces el PER de hoy (${f(actualHoy, 1)}x). La v3 está en su tope (×${REGLA_12M.v3.topeBase}) y supone que una parte del múltiplo perdido vuelve en 12 meses. Si la caída es de régimen (regulación, IA, competencia, tipos), esa historia no vuelve: decide la v2 (control) o, si no hay, la v3 sin recuperación (base = PER actual).`);
    else if (q <= 0.6) marca('M1', 'AVISO', `Sobrerrateada: cotiza a ${f(actualHoy, 1)}x frente a una mediana de ${f(ph.mediana_5a, 1)}x; la v3 ya le quita múltiplo.`);
  }
  // La historia adelantada pierde el último año (falta el BPA del siguiente): con 4 años es normal; con 3 o menos, poco firme.
  if (v3 && num(ph.anios) !== null && ph.anios <= 3) marca('M2', 'CONFIANZA', `Historia del PER de solo ${ph.anios} años: el múltiplo de referencia es poco firme.`);
  else if (v3 && num(ph.anios) === 4) marca('M2', 'AVISO', 'Historia del PER de 4 años (la adelantada pierde el último): la «mediana de 5 años» es de 4.');
  if (!v3 && !num(ph.mediana_5a)) marca('M2', 'CONFIANZA', 'Sin historia del PER útil: el base es el PER actual y el alcista sale de los comparables. La rentabilidad es solo crecimiento del BPA + dividendo.');
  // M3 dos reglas muy separadas.
  const vig = evaluar(cx, { precio });
  const cv2 = ph.v2 ? evaluar(cx, { precio, historia: 'v2' }) : null;
  if (vig?.completo && cv2?.completo && Math.abs(vig.rentabilidad_ponderada_pct - cv2.rentabilidad_ponderada_pct) > 15) marca('M3', 'VARIANTE', `Vigente (${f(vig.rentabilidad_ponderada_pct)} %) y v2 (${f(cv2.rentabilidad_ponderada_pct)} %) se separan ${f(Math.abs(vig.rentabilidad_ponderada_pct - cv2.rentabilidad_ponderada_pct), 0)} puntos: la cifra depende de qué historia del PER se crea. Decide la más baja hasta revisar la historia a mano.`);
  // M4 doble castigo del bajista.
  if (vig?.completo) {
    const [b, m] = vig.filas;
    if (b.multiplo && m.multiplo && b.multiplo / m.multiplo < 0.79 && b.beneficio_por_accion <= 0.85 * m.beneficio_por_accion) marca('M4', 'VARIANTE', `Doble castigo en el bajista: BPA un ${f((1 - b.beneficio_por_accion / m.beneficio_por_accion) * 100, 0)} % bajo el base y además PER ${f(b.multiplo, 1)}x (${f(b.multiplo / m.multiplo, 2)} del base). Variante «sin doble castigo»: PER bajista = base × 0,80.`);
  }
  if (cv2?.completo) {
    const [b, m] = cv2.filas;
    if (b.multiplo && m.multiplo && b.multiplo / m.multiplo < 0.79 && b.beneficio_por_accion <= 0.85 * m.beneficio_por_accion) marca('M4', 'VARIANTE', `Doble castigo en el bajista de la v2 (control): BPA un ${f((1 - b.beneficio_por_accion / m.beneficio_por_accion) * 100, 0)} % bajo el base y PER mínimo de 5 años al cierre ${f(b.multiplo, 1)}x (${f(b.multiplo / m.multiplo, 2)} del base). Variante «v2 sin doble castigo» (caso Edenred).`);
  }
  // M5 la rentabilidad sale del alcista.
  if (vig?.completo && vig.rentabilidad_base_pct < 5 && vig.rentabilidad_ponderada_pct >= U.mantener) marca('M5', 'CONFIANZA', `La ponderada (${f(vig.rentabilidad_ponderada_pct)} %) sale del alcista: el base solo da ${f(vig.rentabilidad_base_pct)} %.`);

  // --- V: valor real y confianza ---
  if (cx.vi && precio) {
    const q = cx.vi / precio;
    if (q < U.viMantener) marca('V1', 'AVISO', `Valor intrínseco (${f(cx.vi, 2)}) un ${f((1 - q) * 100, 0)} % bajo el precio: no pasa el filtro de seguir en cartera.`);
    if (vig?.completo && cx.vi > 1.6 * vig.objetivo_ponderado) marca('V2', 'AVISO', `El DCF (${f(cx.vi, 2)}) queda un ${f((cx.vi / vig.objetivo_ponderado - 1) * 100, 0)} % sobre el objetivo a 12 meses: tesis a varios años, o un DCF optimista (WACC, terminal). La señal la da el objetivo a 12 meses.`);
  }
  if (/^baja/i.test(String(cx.confianza || ''))) marca('V3', 'CONFIANZA', 'Confianza de datos «Baja»: un Comprar queda en Mantener hasta confirmar con fuente primaria.');

  // --- E: eventos y vigencia ---
  const prox = String(id.proximos_resultados || '').match(/\d{4}-\d{2}-\d{2}/)?.[0];
  const corte = meta.fecha_corte;
  if (prox && corte && prox > corte && prox <= HOY) marca('E1', 'CONFIANZA', `Publicó resultados el ${prox}, después del corte del informe (${corte}): las cifras no los recogen. Actualizar antes de comprar.`);
  else if (prox && prox > HOY && dias(HOY, prox) <= 14) marca('E2', 'AVISO', `Resultados el ${prox} (en ${dias(HOY, prox)} días): no aplazan la compra (regla 11); revisar lo publicado al día siguiente.`);
  const mov = precio / cx.precioInforme - 1;
  if (Math.abs(mov) > 0.15) marca('E3', 'CONFIANZA', `El precio se ha movido un ${f(mov * 100, 0)} % desde el informe (${f(cx.precioInforme, 2)} → ${f(precio, 2)}): algo ha cambiado; revisar la tesis antes de usar la cifra.`);

  // --- S: estabilidad de la señal frente a variantes razonables ---
  const variantes = [
    ['vigente', {}],
    ['v3 sin selector', { sinSelector: true }],
    ['v2 (control)', { historia: 'v2' }],
    ['v3 tope ×1,3', { topeBase: REGLA_12M.v3.topeBaseAnterior, sinSelector: true }],
    ['sin doble castigo', { sinDobleCastigo: true }],
    ['v2 sin doble castigo', { historia: 'v2', sinDobleCastigo: true }],
    ['pesos 25/50/25', { prob: [25, 50, 25] }],
    ['BPA −10 %', { escalaBpa: 0.9 }],
    // El BPA del consenso solo como prueba a la baja (si el nuestro va por encima de la calle).
    ...(bpaCons && bpaBase && bpaCons < bpaBase ? [['BPA consenso', { escalaBpa: bpaCons / bpaBase }]] : []),
    ['precio +5 %', { precioK: 1.05 }],
    ['precio −5 %', { precioK: 0.95 }],
  ].filter(([n]) => !/^v2/.test(n) || (ph.v2 && v3)).filter(([n]) => !/^v3/.test(n) || v3);
  const tabla = variantes.map(([nombre, op]) => {
    const p = precio * (op.precioK || 1);
    const c = evaluar(cx, { ...op, precio: p });
    return c?.completo ? { variante: nombre, ponderada: c.rentabilidad_ponderada_pct, base: c.rentabilidad_base_pct, senal: c.senal,
      comprar: pasaComprar(c, p, cx.vi), mantener: pasaMantener(c, p, cx.vi) } : { variante: nombre, error: 'incompleto' };
  });
  const v0 = tabla[0];
  // Variantes que pesan en el veredicto: las que corrigen un fallo conocido o son igual de defendibles que la vigente.
  // «BPA −10 %» y «precio ±5 %» miden el colchón (no cambian el veredicto, se dicen en la defensa).
  const defendibles = tabla.filter((t) => !t.error && !/BPA −10|precio/.test(t.variante));
  // Etiquetas de cada lectura (solo dentro de esta función y en `frente`): «No pasa mantener» NO es una señal de venta.
  const accion = (t) => (t.comprar ? 'Comprar' : t.mantener ? 'Mantener en cartera' : 'No pasa mantener');
  const acciones = [...new Set(defendibles.map(accion))];
  const bloq = marcas.some((m) => m.tratamiento === 'CORREGIR');
  const frente = defendibles.filter((t) => accion(t) !== accion(v0)).map((t) => `${t.variante}: ${accion(t)} (${f(t.ponderada)} %)`);
  const veredicto = bloq ? 'BLOQUEADA' : acciones.length === 1 ? 'SÓLIDA' : 'FRÁGIL';
  // Acción robusta = la peor de las variantes defendibles (si una lectura igual de razonable no pasa, no se compra).
  const orden = ['No pasa mantener', 'Mantener en cartera', 'Comprar'];
  let robusta = defendibles.length ? orden[Math.min(...defendibles.map((t) => orden.indexOf(accion(t))))] : null;
  const masDura = robusta;
  // Una marca de CONFIANZA baja el Comprar a Mantener. Excepción: la historia corta de la v3 (M2) no baja si la regla de
  // control (v2, con su historia al cierre, más larga) también da Comprar.
  const ctrlComprar = tabla.find((t) => t.variante === 'v2 (control)')?.comprar;
  const confianza = marcas.filter((m) => m.tratamiento === 'CONFIANZA' && !(m.codigo === 'M2' && ctrlComprar));
  if (confianza.length && robusta === 'Comprar') robusta = 'Mantener en cartera';
  // Requisito 3 de §4.1 (15-oct-2026, DO & CO en la 8ª hora: «Comprar» robusto con sostenibilidad «En parte»): sin sostenibilidad
  // «Sí» o con ROIC − WACC < 5 no se compra ni se amplía; la acción robusta baja a Mantener. ROIC n.d. (capital invertido
  // negativo) no bloquea: se juzga con el del informe.
  const sostOk = cx.sost !== null && /^s[ií]/i.test(cx.sost), roicOk = cx.roicWacc === null || cx.roicWacc >= 5;
  if (robusta === 'Comprar' && (!sostOk || !roicOk)) {
    robusta = 'Mantener en cartera';
    marca('Q1', 'AVISO', `No cumple el requisito de calidad para comprar (§4.1): sostenibilidad ${cx.sost ?? 'n.d.'}${roicOk ? '' : `, ROIC − WACC ${f(cx.roicWacc, 1)} puntos (< 5)`}. La acción robusta baja a Mantener: no se compra ni se amplía.`);
  }
  // Q2 (28-oct-2026, usuario: «introdúcelo como check»): deuda neta / EBITDA > 3 o dilución > 2 % anual. Solo avisa: no cambia la acción.
  const calAmp = calidadAmpliada(d), riesgoCal = avisoRiesgo(calAmp);
  if (riesgoCal) marca('Q2', 'AVISO', riesgoCal);
  // Exclusiones del usuario (MEMORIA.md, copiadas en escaner/reglas.json; auditoría de homogeneidad del 15-oct: Dunelm salía «Comprar»):
  // la acción robusta nunca es Comprar en una excluida.
  const exclu = REGLAS.exclusiones?.[clave] ?? REGLAS.exclusiones?.[String(id.ticker || '').toUpperCase()] ?? null;
  if (exclu) { marca('X1', 'AVISO', `Excluida por el usuario (${exclu}): no se compra ni se amplía, diga lo que diga la regla.`); if (robusta === 'Comprar') robusta = 'No comprar (excluida)'; }
  // Regla 13 de §4 (15-oct-2026): precio y noticias con veredicto. C1 = el informe dice «retrasa» (la compra espera a la condición);
  // C2 = «descarta»; C3 = el informe no trae el bloque `bolsa.contexto` (análisis anteriores al 15-oct: comprobarlo a mano antes de
  // una orden). P1-P5 = avisos de movimiento del precio de `movimiento.json` (no cambian la señal: el backtest del 15-oct no encontró
  // regla numérica que mejore; piden explicación).
  const ctx = cx.contextoMercado;
  let espera = null;
  if (ctx?.veredicto) {
    const ver = String(ctx.veredicto).toLowerCase();
    if (/retrasa/.test(ver)) { marca('C1', 'AVISO', `Precio y noticias: el informe retrasa la compra${ctx.condicion ? ` hasta: ${ctx.condicion}` : ''}.`); if (robusta === 'Comprar') { robusta = 'Esperar'; espera = ctx.condicion || 'ver bolsa.contexto'; } }
    else if (/descarta/.test(ver)) { marca('C2', 'AVISO', `Precio y noticias: el informe descarta la compra (${ctx.comentario ? String(ctx.comentario).slice(0, 160) : 'ver bolsa.contexto'}).`); if (robusta === 'Comprar') robusta = 'Mantener en cartera'; }
  } else if (robusta === 'Comprar') marca('C3', 'AVISO', 'Sin bloque de precio y noticias (`bolsa.contexto`, regla 13): antes de una orden, `movimiento.mjs` y repaso de noticias con veredicto.');
  const movP = MOVIMIENTO?.movimientos?.[clave] || Object.values(MOVIMIENTO?.movimientos || {}).find((m) => m.carpeta === carpeta) || null;
  if (movP && !movP.error) for (const a of movP.avisos || []) marca(a.codigo, 'AVISO', `${a.texto} (${movP.fecha}; explicar la causa en bolsa.contexto)`);
  const colchon = v0 && !v0.error ? { comprar: r(v0.ponderada - U.comprar), mantener: r(v0.ponderada - U.mantener) } : null;
  // Límites con el OBJETIVO FIJO (regla del 14-oct tras el caso Nu): si el precio sube, el objetivo no sube con él.
  const limFijo = (c) => (c?.completo ? {
    comprar: Math.min((c.objetivo_ponderado + cx.dpa) / (1 + U.comprar / 100), (c.objetivo_base + cx.dpa) / (1 + U.comprarBase / 100), cx.vi ?? Infinity),
    mantener: Math.min((c.objetivo_ponderado + cx.dpa) / (1 + U.mantener / 100), (c.objetivo_base + cx.dpa) / (1 + U.mantenerBase / 100), cx.vi ? cx.vi / U.viMantener : Infinity),
  } : null);
  const lim = limFijo(vig), limCtrl = cv2?.completo ? limFijo(cv2) : null;
  // Regla 12 de §4 (15-oct-2026, caso Viscofan: «Comprar» con un colchón de BPA del 7 %): la compra robusta exige las TRES cosas a la
  // vez: pasar v3 y v2 (ya arriba), aguantar un BPA un 10 % peor (la variante «BPA −10 %» sigue pasando la compra) y el precio por
  // debajo del límite común (el menor de los límites de compra con v3 y con v2). Si falla una, la acción robusta es Mantener.
  const bpa10 = tabla.find((t) => t.variante === 'BPA −10 %');
  if (robusta === 'Comprar' && bpa10 && !bpa10.error && !bpa10.comprar) {
    robusta = 'Mantener en cartera';
    marca('B1', 'AVISO', `No aguanta un BPA un 10 % peor (ponderada ${f(bpa10.ponderada)} %, base ${f(bpa10.base)} %; la compra pide ${U.comprar} % y ${U.comprarBase} %): no es compra robusta (regla 12). La acción robusta baja a Mantener.`);
  }
  const limComun = lim ? (limCtrl ? Math.min(lim.comprar, limCtrl.comprar) : lim.comprar) : null;
  if (robusta === 'Comprar' && limComun !== null && precio > limComun) {
    robusta = 'Mantener en cartera';
    marca('L1', 'AVISO', `Precio ${f(precio, 2)} por encima del límite común de compra ${f(limComun, 2)} (el menor de v3 y v2, objetivo fijo): no es compra robusta (regla 12). La acción robusta baja a Mantener.`);
  }
  // M6: ¿el objetivo se mueve con el precio? (base = PER actual o PER actual × tope). Si sí, la rentabilidad no baja al
  // subir el precio y un «límite» calculado recalculando a otro precio no limita nada (caso Nu en growth).
  const sube = evaluar(cx, { precio: precio * 1.1, moverPer: true }), quieto = evaluar(cx, { precio, moverPer: true });
  const elast = quieto?.completo && sube?.completo ? (sube.objetivo_ponderado / quieto.objetivo_ponderado - 1) / 0.1 : null;
  if (elast !== null && elast > 0.5) marca('M6', 'AVISO', `El objetivo se mueve con el precio (elasticidad ${f(elast, 2)}: un 10 % más de precio sube el objetivo un ${f(elast * 10, 1)} %), porque el base es el PER de hoy${v3 ? ' con el tope' : ''}. La rentabilidad solo mide crecimiento del BPA + dividendo${v3 ? ' + el tope' : ''}; los límites de compra se calculan con el objetivo fijo (no recalculando a otro precio).`);
  // Colchón de BPA: cuánto puede bajar nuestro BPA (los tres escenarios) antes de perder la acción de hoy.
  // Límite robusto (regla 12): el precio más alto al que se cumplen a la vez el límite común (v3 y v2) y la compra con un BPA
  // un 10 % peor. Es el límite que va al broker; el «límite de compra» solo mide el método.
  const limRobusto = (() => {
    if (limComun === null || !vig?.completo) return null;
    const pasa = (p) => pasaComprar(evaluar(cx, { precio: p, escalaBpa: 0.9 }), p, cx.vi);
    if (pasa(limComun)) return limComun;
    let lo = limComun * 0.3, hi = limComun;
    if (!pasa(lo)) return null;
    for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (pasa(m)) lo = m; else hi = m; }
    return lo;
  })();
  // Niveles de compra value (Hotis 20-oct-2026, regla 16 de METODO-VIGENTE.md): A = la compra robusta de siempre; B1 afloja los
  // números (v2 y BPA −10 % solo aguantan Mantener; precio ≤ límite B); B2 afloja la calidad (sostenibilidad «En parte» con
  // ROIC − WACC ≥ 5, o «Sí» con 4,5-5); C afloja las dos cosas. En todos: v3 en Comprar al precio de hoy, sin dato que corregir,
  // sin marca de confianza, sin exclusión y sin «retrasa» ni «descarta» en precio y noticias.
  const excQ = REGLAS.calidad_excepciones?.[clave] ?? REGLAS.calidad_excepciones?.[String(id.ticker || '').toUpperCase()] ?? null;
  const calidadA = (sostOk && roicOk) || !!excQ;
  const calidadB = calidadA || (cx.roicWacc === null || cx.roicWacc >= 5 ? /^en parte/i.test(String(cx.sost || '')) : sostOk && cx.roicWacc >= 4.5);
  const limB = (() => {
    if (!vig?.completo) return null;
    const ok = (p) => pasaComprar(evaluar(cx, { precio: p }), p, cx.vi) && pasaMantener(evaluar(cx, { precio: p, escalaBpa: 0.9 }), p, cx.vi)
      && (!(ph.v2 && v3) || pasaMantener(evaluar(cx, { precio: p, historia: 'v2' }), p, cx.vi));
    let hi = precio * 3; if (ok(hi)) return hi; let lo = precio * 0.3; if (!ok(lo)) return null;
    for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; if (ok(m)) lo = m; else hi = m; }
    return lo;
  })();
  const sinBloqueo = !bloq && !confianza.length && !exclu && !(ctx?.veredicto && /retrasa|descarta/i.test(String(ctx.veredicto)));
  // Límite de cada nivel (el precio más alto al que pasa) y nivel al precio de hoy. Los números A son los de la compra robusta
  // (todas las variantes defendibles en Comprar, BPA −10 % en Comprar, precio ≤ límite robusto); los B, v3 en Comprar y todo
  // lo demás al menos en Mantener (precio ≤ límite B).
  const limitesNivel = {};
  if (sinBloqueo && (calidadA || calidadB)) {
    if (limRobusto !== null) limitesNivel[calidadA ? 'A' : 'B2'] = limRobusto;
    if (limB !== null) limitesNivel[calidadA ? 'B1' : 'C'] = limB;
  }
  const hoyA = v0?.comprar && defendibles.every((t) => t.comprar) && bpa10?.comprar && limRobusto !== null && precio <= limRobusto;
  const hoyB = v0?.comprar && defendibles.every((t) => t.mantener) && bpa10?.mantener && limB !== null && precio <= limB;
  const nivel = !sinBloqueo ? null : calidadA ? (hoyA ? 'A' : hoyB ? 'B1' : null) : calidadB ? (hoyA ? 'B2' : hoyB ? 'C' : null) : null;
  const limNivel = nivel ? limitesNivel[nivel] : null;
  // H1 (27-oct-2026, informes viejos): la historia del PER y los escenarios tienen que usar el MISMO BPA (los dos ajustados o
  // los dos publicados). Si el informe declara `per_historico.base_bpa` y `objetivo_12m.base_bpa` y no coinciden, o los textos
  // dicen una cosa en la historia y otra en los escenarios, se avisa (no cambia la señal: se revisa a mano).
  {
    const AJ = /ajustad|recurrente|normalizad|sin extraordinari|扣非|non-gaap|subyacente|underlying|adjusted/i, PUB = /publicad|contable|reportad|\bgaap\b|estatutari/i;
    const decl = (v) => (v ? (/ajust|recurr|normal/i.test(v) ? 'ajustado' : /public|contab|report/i.test(v) ? 'publicado' : null) : null);
    const bH = decl(ph.base_bpa), bE = decl(o.base_bpa);
    const tH = `${ph.excluidos || ''} ${ph.nota || ''}`, tE = casos.map((c) => c.justificacion || '').join(' ');
    const lee = (t) => (AJ.test(t) ? 'ajustado' : PUB.test(t) ? 'publicado' : null);
    const h = bH || lee(tH), e = bE || lee(tE);
    if (h && e && h !== e) marca('H1', 'AVISO', `La historia del PER parece en BPA ${h} y los escenarios en BPA ${e}${bH && bE ? ' (declarado)' : ' (por el texto)'}: mezclar bases infla o desinfla el múltiplo. Revisar a mano y declarar \`base_bpa\` en los dos.`);
  }
  // Señal para lo que YA está en cartera (regla vigente + calidad). Una lectura dura que no pasa mantener no vende.
  const excQv = REGLAS.calidad_excepciones?.[clave] ?? REGLAS.calidad_excepciones?.[String(id.ticker || '').toUpperCase()] ?? null;
  const calidadVende = cx.roicWacc !== null && cx.roicWacc < 4.5 && !excQv;
  const senalCartera = bloq || !v0 || v0.error ? null : !v0.mantener ? 'Vender (no pasa el filtro de mantener con la regla vigente)' : calidadVende ? `Vender (calidad: ROIC − WACC ${f(cx.roicWacc, 1)} < 4,5)` : 'Mantener';
  const colchonBpa = (cond) => { if (!vig?.completo || !cond(vig, precio, cx.vi)) return null; for (let e = 1; e >= 0.5; e -= 0.01) { const c = evaluar(cx, { precio, escalaBpa: e }); if (!c?.completo || !cond(c, precio, cx.vi)) return r((1 - e) * 100, 0); } return 50; };
  return {
    carpeta, clave, nombre: id.nombre_corto || id.nombre, ...(BPA_FACTOR !== 1 ? { bpa_factor: BPA_FACTOR } : {}), divisa: meta.divisa, precio: r(precio, 2), fecha_precio: fechaPrecio,
    version: vig?.version, ponderada: vig?.rentabilidad_ponderada_pct ?? null, base: vig?.rentabilidad_base_pct ?? null, senal: vig?.senal ?? null,
    v2: cv2?.completo ? cv2.rentabilidad_ponderada_pct : null, cagr_bpa: r(cagr), dif_consenso: r(difCons),
    veredicto, accion_vigente: v0 && !v0.error ? accion(v0) : null,
    // Compra: `accion_robusta` nunca dice «mantener» ni «vender» (27-oct): Comprar / Esperar / No comprar (…) / Sin señal.
    accion_robusta: bloq ? 'Sin señal (corregir dato)' : robusta === 'Comprar' || robusta === 'Esperar' || /^No comprar/.test(robusta || '') ? robusta : robusta ? 'No comprar (no es compra robusta)' : null,
    compra_robusta: !bloq && robusta === 'Comprar', senal_cartera: senalCartera, lectura_mas_dura: masDura,
    obsoleto: carpetaMasNueva(carpeta) !== carpeta ? carpetaMasNueva(carpeta) : null, espera, frente, colchon,
    contexto_mercado: ctx ? { veredicto: ctx.veredicto ?? null, condicion: ctx.condicion ?? null, proximos_resultados: ctx.proximos_resultados ?? null } : null,
    movimiento: movP && !movP.error ? { fecha: movP.fecha, var_1m_pct: movP.var_1m_pct, var_3m_pct: movP.var_3m_pct, var_12m_pct: movP.var_12m_pct, dist_max_52s_pct: movP.dist_max_52s_pct, dist_min_52s_pct: movP.dist_min_52s_pct, tendencia: movP.tendencia } : null,
    // Límites en la divisa de COTIZACIÓN (la del broker): el informe puede llevar las cuentas en otra (Constellation USD/CAD,
    // Experian USD/GBp). Un límite en la divisa de las cuentas puesto en el broker es el fallo de Constellation.
    divisa_cotizacion: divCot, limite_comprar_cot: lim ? r(lim.comprar / tc, 2) : null, limite_mantener_cot: lim ? r(lim.mantener / tc, 2) : null,
    limite_comprar_control_cot: limCtrl ? r(limCtrl.comprar / tc, 2) : null, precio_cot: r(precio / tc, 2), limite_robusto_cot: limRobusto !== null ? Math.floor((100 * limRobusto) / tc) / 100 : null,
    limite_comprar: r(lim?.comprar, 2), limite_comprar_control: r(limCtrl?.comprar, 2), limite_mantener: r(lim?.mantener, 2), limite_mantener_control: r(limCtrl?.mantener, 2),
    nivel, limite_nivel_cot: limNivel !== null ? Math.floor((100 * limNivel) / tc) / 100 : null,
    limites_nivel_cot: Object.fromEntries(Object.entries(limitesNivel).map(([k, v]) => [k, Math.floor((100 * v) / tc) / 100])), limite_b_cot: limB !== null ? Math.floor((100 * limB) / tc) / 100 : null,
    calidad_sost: cx.sost, calidad_roic_wacc: r(cx.roicWacc),
    // Calidad ampliada (28-oct-2026): 10 pruebas INFORMATIVAS (backtest calidad-ampliada-2026-10-28): no tocan señal, nivel ni acción.
    calidad_pruebas: calAmp.texto, calidad_pruebas_pasa: calAmp.pasa, calidad_pruebas_con_dato: calAmp.con_dato, calidad_fallan: calAmp.fallan, aviso_riesgo: riesgoCal,
    elasticidad_objetivo: r(elast, 2), colchon_bpa_comprar: colchonBpa(pasaComprar), colchon_bpa_mantener: colchonBpa(pasaMantener),
    marcas, variantes: tabla,
  };
}

const res = carpetas.map((c) => { try { return probar(c); } catch (e) { return { carpeta: c, error: e.message }; } }).filter(Boolean);
if (comoJson) { console.log(JSON.stringify(res, null, 1)); }
else for (const x of res) {
  if (x.error) { console.log(`${x.carpeta}: ERROR ${x.error}`); continue; }
  console.log(`\n${x.nombre} (${x.carpeta}) · ${x.version} ${f(x.ponderada)} % / base ${f(x.base)} % → ${x.senal}${x.v2 !== null ? ` · v2 ${f(x.v2)} %` : ''} · precio ${f(x.precio, 2)} ${x.divisa} (${x.fecha_precio})`);
  if (x.obsoleto) console.log(`  OJO: hay un informe más nuevo (${x.obsoleto}); este no vale para señales.`);
  console.log(`  Veredicto: ${x.veredicto}. Si la tienes: ${x.senal_cartera ?? '—'}. ¿Compra robusta?: ${x.compra_robusta ? 'sí' : 'no'} (${x.accion_robusta}).${x.frente.length ? ` Otras lecturas: ${x.frente.join('; ')}.` : ''}`);
  if (Object.keys(x.limites_nivel_cot || {}).length) console.log(`  Nivel de compra hoy: ${x.nivel ?? 'ninguno'}. Límites por nivel (${x.divisa_cotizacion}): ${Object.entries(x.limites_nivel_cot).map(([k, v]) => `${k} ${f(v, 2)}`).join('; ')}.`);
  console.log(`  En ${x.divisa_cotizacion} (broker): precio ${f(x.precio_cot, 2)}; límite de compra (objetivo fijo) ${f(x.limite_comprar_cot, 2)}${x.limite_comprar_control_cot !== null ? ` (v2: ${f(x.limite_comprar_control_cot, 2)})` : ''}; filtro de mantener hasta ${f(x.limite_mantener_cot, 2)}; límite robusto (v3 y v2 con BPA −10 %) ${x.limite_robusto_cot !== null ? f(x.limite_robusto_cot, 2) : '—'}. Colchón de BPA: ${x.colchon_bpa_comprar ?? '—'} % para Comprar, ${x.colchon_bpa_mantener ?? '—'} % para mantener.`);
  console.log(`  Calidad: ROIC − WACC ${f(x.calidad_roic_wacc)} puntos, sostenibilidad ${x.calidad_sost ?? 'n.d.'}; pruebas ampliadas (informativas) ${x.calidad_pruebas}.`);
  for (const m of x.marcas) console.log(`  [${m.codigo} ${m.tratamiento}] ${m.texto}`);
  console.log(`  Variantes: ${x.variantes.filter((t) => !t.error).map((t) => `${t.variante} ${f(t.ponderada)}/${f(t.base)}`).join(' · ')}`);
}
if (escribir) {
  const out = { fecha: HOY, nota: 'herramientas/robustez.mjs: pruebas de robustez por informe (verticales/empresa/robustez.md).', resultados: res };
  writeFileSync(new URL('../verticales/empresa/robustez.json', import.meta.url), JSON.stringify(out, null, 1) + '\n');
  console.error(`Escrito verticales/empresa/robustez.json (${res.length} informes).`);
}

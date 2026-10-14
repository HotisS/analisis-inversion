// Apunta la rentabilidad a 12 meses (verticales/empresa/objetivo-12m.md, reglas v2/v3) de uno o varios informes en
// verticales/empresa/objetivo12m-revisados.json. Lee `valoracion.objetivo_12m` del último datos*.json de cada carpeta
// y calcula con la MISMA función que el motor (motor/objetivo12m.mjs): múltiplos con la regla común, media ponderada
// con las probabilidades de los escenarios, rentabilidad del base y señal. Sin dependencias.
//
//   node herramientas/apuntar-12m.mjs <carpeta> [<carpeta> …] [--fecha AAAA-MM-DD]
//   node herramientas/apuntar-12m.mjs <carpeta> --precio 2447          precio de hoy EN LA DIVISA DE COTIZACIÓN (la del
//                                                                      broker: peniques si el informe cotiza en GBp)
//   node herramientas/apuntar-12m.mjs --precios [--todos | <carpeta> …] último cierre de verticales/empresa/precios.json
//                                                                      (node herramientas/precios.mjs) para todas al
//                                                                      mismo cierre: antes de una cartera o una compra
//   … --actual                                                         con la sesión en curso de precios.json (si la hay) en vez
//                                                                      del último cierre: la regla de «precio actual antes de
//                                                                      cada orden» (MEMORIA.md), normalmente con --simular
//   … --simular                                                        enseña lo que cambia sin escribir
//   … --mover-per                                                      (solo para comparar) recalcula el objetivo moviendo el PER actual con el precio
//
// Con un precio nuevo, EL OBJETIVO QUEDA FIJO (los múltiplos y el BPA del informe no cambian) y solo se mueve la
// rentabilidad: objetivo ÷ precio actual. Hasta el 14-oct por la tarde el PER actual se escalaba con el precio y, como
// el base de la regla parte del actual, el objetivo subía con la cotización y un Comprar nunca dejaba de serlo
// (descubierto en Nu, growth; mismo fallo aquí). El precio se guarda en la divisa de las cuentas (la del informe),
// pasado con `meta.tipo_cambio` del informe. Recalcular el objetivo con el precio nuevo es hacer una versión del informe.
//
// Después: node herramientas/seguimiento.mjs.
import { readFileSync, writeFileSync } from 'node:fs';
import { ultimoDatos } from './objetivo12m.mjs';
import { calcularObjetivo12m, REGLA_12M } from '../motor/objetivo12m.mjs';
import { leerPrecios, factorDivisa } from './precios.mjs';

const P = new URL('../verticales/empresa/objetivo12m-revisados.json', import.meta.url);
const J = JSON.parse(readFileSync(P, 'utf8'));
const args = process.argv.slice(2);
const opcion = (k) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : null; };
const bandera = (k) => { const i = args.indexOf(k); if (i >= 0) args.splice(i, 1); return i >= 0; };
const fechaPedida = opcion('--fecha'), precioPedido = opcion('--precio');
const usarPrecios = bandera('--precios'), todos = bandera('--todos'), simular = bandera('--simular'), actual = bandera('--actual'), moverPer = bandera('--mover-per');
const hoy = new Date().toISOString().slice(0, 10);
const f = (x, d = 2) => (x === null || x === undefined ? 'n.d.' : x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));
const r = (x, d = 2) => (x === null || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);

const precios = usarPrecios ? leerPrecios() : null;
if (usarPrecios && !precios) throw new Error('No hay verticales/empresa/precios.json: node herramientas/precios.mjs');
if (precioPedido !== null && (args.length !== 1 || usarPrecios)) throw new Error('--precio X va con una sola carpeta y sin --precios');
const carpetas = todos ? [...new Set(Object.values(J.revisados).map((v) => v.carpeta))] : args.map((a) => a.replace(/\/$/, '').replace(/^informes\//, ''));
if (!carpetas.length) throw new Error('Indica una carpeta de informes/ (o --todos con --precios)');
const cambios = [];

for (const carpeta of carpetas) {
  const d = ultimoDatos(carpeta);
  if (!d) throw new Error(`Carpeta sin datos: ${carpeta}`);
  const o = d.valoracion?.objetivo_12m;
  if (!o) throw new Error(`${carpeta}: falta valoracion.objetivo_12m`);
  const precioInforme = +d.identificacion.precio, div = +(d.calc?.recomendacion?.dividendo_pct || 0);
  const tc = +(d.meta?.tipo_cambio || 1), divCot = d.meta?.divisa_cotizacion || d.meta?.divisa;
  const previo = Object.entries(J.revisados).find(([, v]) => v.carpeta === carpeta)?.[0];
  const t = previo || String(d.identificacion.ticker).trim().toUpperCase().replace(/\s+/g, '-');
  // Precio: el del informe, el pedido (--precio, en la divisa de cotización) o el último cierre de precios.json.
  let precio = precioInforme, fechaPrecio = d.identificacion.fecha_precio || null, origen = 'informe';
  if (precioPedido !== null) { precio = +precioPedido * tc; fechaPrecio = fechaPedida || hoy; origen = `--precio ${precioPedido} ${divCot}`; }
  if (usarPrecios) {
    const p = precios.precios[t] || Object.values(precios.precios).find((x) => x.carpeta === carpeta);
    const fac = p && !p.error ? factorDivisa(p.divisa, divCot) : null;
    if (!p || p.error) console.error(`AVISO ${t}: sin cierre en precios.json${p?.error ? ` (${p.error})` : ''}; se deja el precio del informe.`);
    else if (fac === null) console.error(`AVISO ${t}: Yahoo cotiza en ${p.divisa} y el informe en ${divCot}; se deja el precio del informe.`);
    else if (actual && p.en_curso) { precio = p.en_curso.precio * fac * tc; fechaPrecio = p.en_curso.fecha; origen = `sesión en curso Yahoo ${p.simbolo}, ${precios.actualizado}`; }
    else { precio = p.precio * fac * tc; fechaPrecio = p.fecha; origen = `cierre Yahoo ${p.simbolo}`; }
  }
  const k = precio / precioInforme;
  const o2 = JSON.parse(JSON.stringify(o)); // objetivo fijo: no se toca per_historico.actual (salvo --mover-per, solo para comparar)
  if (moverPer && k !== 1 && o2.per_historico?.actual) o2.per_historico.actual = r(+o2.per_historico.actual * k, 2);
  const prob = ['bajista', 'base', 'alcista'].map((e) => (d.escenarios?.casos || []).find((c) => new RegExp(e, 'i').test(c.escenario || ''))?.probabilidad_pct ?? null);
  const c = calcularObjetivo12m(o2, { precio, dpa: (div / 100) * precioInforme, prob: prob.every((x) => x !== null) ? prob : null, valorIntrinseco: d.calc?.sintesis?.valor_objetivo ?? null, confianza: d.resumen?.confianza ?? null });
  if (!c?.completo) throw new Error(`${carpeta}: objetivo_12m incompleto`);
  // Informes pasados a v3 por herramientas/historia-adelantada.mjs: guardan la historia v2 en per_historico.v2; se
  // calcula también con ella (misma regla v2, mismo precio) para tener las dos cifras al lado y avisar si se alejan.
  let v2 = null;
  if (o2.per_historico?.v2 && /^adelantad/i.test(String(o2.per_historico.base || ''))) {
    const o3 = JSON.parse(JSON.stringify(o2));
    o3.per_historico = { ...o2.per_historico.v2, actual: o2.per_historico.actual, base: 'cierre' };
    const c2 = calcularObjetivo12m(o3, { precio, dpa: (div / 100) * precioInforme, prob: prob.every((x) => x !== null) ? prob : null, valorIntrinseco: d.calc?.sintesis?.valor_objetivo ?? null, confianza: d.resumen?.confianza ?? null });
    if (c2?.completo) v2 = { rentabilidad_ponderada_pct: c2.rentabilidad_ponderada_pct, rentabilidad_base_pct: c2.rentabilidad_base_pct, senal: c2.senal, objetivo_ponderado: c2.objetivo_ponderado, multiplos: c2.filas.map((x) => x.multiplo) };
  }
  // Y con el tope anterior del base (×1,3, 14-oct mediodía), para ver qué cambia el tope nuevo.
  let v3Anterior = null;
  if (/^adelantad/i.test(String(o2.per_historico?.base || '')) && REGLA_12M.v3.topeBaseAnterior) {
    const c3 = calcularObjetivo12m(o2, { precio, dpa: (div / 100) * precioInforme, prob: prob.every((x) => x !== null) ? prob : null, valorIntrinseco: d.calc?.sintesis?.valor_objetivo ?? null, confianza: d.resumen?.confianza ?? null, topeBase: REGLA_12M.v3.topeBaseAnterior, selector: false });
    if (c3?.completo) v3Anterior = { tope: REGLA_12M.v3.topeBaseAnterior, rentabilidad_ponderada_pct: c3.rentabilidad_ponderada_pct, rentabilidad_base_pct: c3.rentabilidad_base_pct, senal: c3.senal, objetivo_ponderado: c3.objetivo_ponderado };
  }
  const salto = v2 ? Math.abs(c.rentabilidad_ponderada_pct - v2.rentabilidad_ponderada_pct) : 0;
  const revisar = salto > 15 ? `v3 se aleja ${f(salto, 0)} puntos de v2 (${f(v2.rentabilidad_ponderada_pct, 1)} %): revisar la historia del PER a mano antes de usarla` : null;
  const [b, m, a] = c.filas;
  const nota = `${c.version} regla común${c.senal_sin_confirmar ? ` (${c.senal_sin_confirmar} pendiente de confirmar datos: confianza baja)` : ''}: bajista ${f(b.multiplo, 1)}x × ${f(b.beneficio_por_accion)} = ${f(b.precio)}; base ${f(m.multiplo, 1)}x × ${f(m.beneficio_por_accion)} = ${f(m.precio)}; alcista ${f(a.multiplo, 1)}x × ${f(a.beneficio_por_accion)} = ${f(a.precio)}; ejercicio ${o.ejercicio}; precio ${f(precio)}${fechaPrecio ? ` (${fechaPrecio}${origen === 'informe' ? '' : `, ${origen}`})` : ''}${v2 ? `; con la historia v2: ${f(v2.rentabilidad_ponderada_pct, 1)} % ${v2.senal}` : ''}${v3Anterior ? `; con tope ×${v3Anterior.tope}: ${f(v3Anterior.rentabilidad_ponderada_pct, 1)} % ${v3Anterior.senal}` : ''}${c.selector ? `. Selector: ${c.selector.motivo}${c.selector.regla !== 'v3' ? ` (v3 sin selector: ${f(c.selector.v3_sin_selector.rentabilidad_ponderada_pct, 1)} % ${c.selector.v3_sin_selector.senal})` : ''}` : ''}${revisar ? `. REVISAR: ${revisar}` : ''}`;
  const ant = J.revisados[t];
  const nuevo = { fecha: fechaPedida || hoy, carpeta, precio_ref: r(precio), fecha_precio: fechaPrecio, precio_informe: precioInforme, precio_origen: origen,
    objetivo_12m: c.objetivo_ponderado, rentabilidad_12m_pct: c.rentabilidad_simple_pct, senal: c.senal,
    objetivo_base: c.objetivo_base, nota, objetivo_bajista: b.precio, objetivo_alcista: a.precio, multiplos: c.filas.map((x) => x.multiplo),
    probabilidades: c.probabilidades, objetivo_ponderado: c.objetivo_ponderado, rentabilidad_ponderada_pct: c.rentabilidad_ponderada_pct,
    rentabilidad_base_pct: c.rentabilidad_base_pct, senal_ponderada: c.senal, comprar_por_debajo: c.comprar_por_debajo, vender_por_encima: c.vender_por_encima,
    divisa_cotizacion: divCot, comprar_por_debajo_cot: r(c.comprar_por_debajo / tc), vender_por_encima_cot: r(c.vender_por_encima / tc), precio_cot: r(precio / tc),
    version: c.version, tope_base: c.version === 'v3' ? REGLA_12M.v3.topeBase : null, anios_historia: o2.per_historico?.anios ?? null, v2, v3_tope_anterior: v3Anterior, revisar,
    selector: c.selector ? { regla: c.selector.regla, motivo: c.selector.motivo } : null, v3_sin_selector: c.selector?.v3_sin_selector ?? null };
  const cambio = ant && (ant.senal !== c.senal || Math.abs((ant.rentabilidad_ponderada_pct ?? 0) - c.rentabilidad_ponderada_pct) >= 0.05);
  if (cambio) cambios.push(`${t}: ${ant.senal} ${f(ant.rentabilidad_ponderada_pct, 1)} % (precio ${f(ant.precio_ref)}) → ${c.senal} ${f(c.rentabilidad_ponderada_pct, 1)} % (precio ${f(precio)}, ${fechaPrecio})`);
  if (!simular) J.revisados[t] = nuevo;
  console.log(`${t}: ${c.version} ponderada ${c.rentabilidad_ponderada_pct} %, base ${c.rentabilidad_base_pct} % → ${c.senal}${c.selector && c.selector.regla !== 'v3' ? ` [selector: ${c.selector.regla}; v3 sin selector ${c.selector.v3_sin_selector.rentabilidad_ponderada_pct} %]` : ''}${v2 ? ` (v2: ${v2.rentabilidad_ponderada_pct} % ${v2.senal})` : ''}${revisar ? ' ¡REVISAR!' : ''}${k !== 1 ? ` (precio ${f(precio)} frente a ${f(precioInforme)} del informe, ${k >= 1 ? '+' : ''}${f((k - 1) * 100, 1)} %)` : ''}`);
}
if (cambios.length) console.log(`\n${simular ? 'Cambiarían' : 'Han cambiado'} ${cambios.length} de ${carpetas.length}:\n${cambios.join('\n')}`);
else if (carpetas.length > 1) console.log(`\nSin cambios de señal ni de rentabilidad en ${carpetas.length} informes.`);
if (!simular) writeFileSync(P, JSON.stringify(J, null, 2) + '\n');
else console.log('(--simular: no se ha escrito nada)');

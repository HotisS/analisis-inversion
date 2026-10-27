// Valoración bancaria de Itaú Unibanco (corte 27-oct-2026): modelo de exceso de rentabilidad (residual income) y P/VC
// justificado. Escribe informes/itau-unibanco-2026-10-27/valoracion-banco.md y exporta el resultado para propio.mjs.
// Base: resultado recurrente gerencial (BR GAAP, el BPA de referencia del mercado) y patrimonio neto gerencial del 2T26.
// Ejecutar: node informes/itau-unibanco-2026-10-27/notas/valoracion-banco.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const n = (x, d = 2) => (x === null || x === undefined ? 'n.d.' : x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));

// ---- Datos (fuentes en el informe: MD&A 2T26 y 20-F 2025, Yahoo, tradingeconomics, BCB Focus)
export const DATOS = {
  pn_jun26: 208512, acciones: 11022, vc_jun26: 18.92, // MD&A 2T26: patrimonio 208.512 M, 11.022 M de acciones, VC 18,92 R$
  roe_1s26: 24.5, roe_2025: 23.4, roe_2t26: 24.3, cet1: 12.3, cet1_objetivo: 11.5, rwa_dic25: 1505475,
  precio_usd: 7.70, tc: 5.4064, // ADR NYSE, cierre 26-oct-2026; USD/BRL Yahoo (BRL=X) al cierre del 26-oct
  tasa_libre: 15.44, tasa_libre_pre: 12.98, beta: 1.10, prima: 5.5, prima_damodaran: 4.2,
  g_terminal: 5.0, // IPCA a largo plazo del Focus (3,5 %) + 1,5 de crecimiento real (BCB Focus, 23-oct-2026)
};
export const PRECIO_BRL = r2(DATOS.precio_usd * DATOS.tc);
export const KE = r2(DATOS.tasa_libre + DATOS.beta * DATOS.prima);
export const KE_PRE = r2(DATOS.tasa_libre_pre + DATOS.beta * DATOS.prima);
export const KE_DAM = r2(DATOS.tasa_libre + DATOS.beta * DATOS.prima_damodaran);

// ---- Supuestos por año (año 1 = jul-2026 a jun-2027). ROE recurrente y crecimiento del patrimonio (= de la cartera y de los
// activos ponderados por riesgo, para mantener el CET1 cerca del objetivo del 11,5 %).
const ROE_BASE = [24.5, 24.0, 23.5, 23.0, 22.5, 22.3, 22.1, 21.9, 21.7, 21.5];
const G_BASE = [8.0, 8.0, 7.5, 7.0, 6.5, 6.2, 5.9, 5.6, 5.3, 5.0];
export const ESC = {
  Bajista: { dRoe: -3.0, dG: -2.0, prob: 25, texto: 'coste del riesgo un 25-30 % mayor (ciclo de crédito tras el giro fiscal) y cartera que crece 2 puntos menos' },
  Base: { dRoe: 0, dG: 0, prob: 50, texto: 'ROE recurrente del 24,5 % que baja medio punto al año hasta el 22,5 % y luego al 21,5 %; patrimonio al ritmo de la cartera (8 % → 5 %)' },
  Alcista: { dRoe: 1.5, dG: 1.0, prob: 25, texto: 'el ROE se sostiene cerca del 25 % (eficiencia e IA) y la cartera crece 1 punto más' },
};

export function residual(ke, { dRoe = 0, dG = 0, vc0 = DATOS.vc_jun26, roeT = null } = {}) {
  let vc = vc0, va = 0;
  const filas = [];
  for (let i = 0; i < 10; i++) {
    const roe = ROE_BASE[i] + dRoe, g = Math.max(G_BASE[i] + (i < 9 ? dG : 0), 0);
    const bpa = vc * roe / 100;
    const ri = vc * (roe - ke) / 100;
    const fd = 1 / (1 + ke / 100) ** (i + 1);
    va += ri * fd;
    const vcFin = vc * (1 + g / 100);
    filas.push({ anio: i + 1, vc_ini: vc, roe, ri, fd, va_ri: ri * fd, bpa, dividendo: bpa - (vcFin - vc), vc_fin: vcFin, g });
    vc = vcFin;
  }
  const roeTerm = roeT ?? (ROE_BASE[9] + dRoe);
  const riT = vc * (roeTerm - ke) / 100;
  const tv = riT / ((ke - DATOS.g_terminal) / 100);
  const vaTv = tv / (1 + ke / 100) ** 10;
  const valorJun = vc0 + va + vaTv;
  // Al 27-oct-2026: el valor de junio crece al coste del capital 119 días (0,326 años). No se restan los dividendos
  // mensuales y el JCP pagados entre julio y octubre (≈ 0,1-0,3 R$ por acción, estimación): diferencia < 1 %.
  const valor = valorJun * (1 + ke / 100) ** 0.326;
  return { ke, filas, va_ri: va, vc_final: vc, roe_terminal: roeTerm, ri_terminal: riT, tv, va_tv: vaTv, valor_jun: valorJun, valor };
}

export function pvcJustificado(roe, ke, g = DATOS.g_terminal) { return (roe - g) / (ke - g); }
export function keImplicito(precio, roe = 24.0, g = DATOS.g_terminal, vc = DATOS.vc_jun26) { return g + (roe - g) / (precio / vc); }

const base = residual(KE);
const esc = Object.fromEntries(Object.entries(ESC).map(([k, e]) => [k, residual(KE, e)]));
const ponderado = Object.entries(ESC).reduce((s, [k, e]) => s + e.prob / 100 * esc[k].valor, 0);
const varPre = residual(KE_PRE), varDam = residual(KE_DAM);
// Ke que iguala el valor del caso base al precio (búsqueda por bisección).
let lo = 5.5, hi = 30;
for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (residual(m).valor > PRECIO_BRL) lo = m; else hi = m; }
const keMercado = (lo + hi) / 2;
const pvc = { hoy: pvcJustificado(24.0, KE), pre: pvcJustificado(24.0, KE_PRE), dam: pvcJustificado(24.0, KE_DAM) };

export const RESULTADO = {
  precio_brl: PRECIO_BRL, ke: KE, ke_pre: KE_PRE, ke_damodaran: KE_DAM,
  valor_base: r2(base.valor), valor_ponderado: r2(ponderado),
  valores: Object.fromEntries(Object.entries(esc).map(([k, v]) => [k, r2(v.valor)])),
  valor_pre: r2(varPre.valor), valor_damodaran: r2(varDam.valor),
  pvc_justificado: { hoy: r2(pvc.hoy), pre: r2(pvc.pre), damodaran: r2(pvc.dam) },
  valor_pvc: { hoy: r2(pvc.hoy * DATOS.vc_jun26), pre: r2(pvc.pre * DATOS.vc_jun26), damodaran: r2(pvc.dam * DATOS.vc_jun26) },
  pvc_mercado: r2(PRECIO_BRL / DATOS.vc_jun26), ke_mercado: r2(keMercado), ke_implicito_gordon: r2(keImplicito(PRECIO_BRL)),
  roe_menos_ke: { roe2025: r2(DATOS.roe_2025 - KE), roe1s26: r2(DATOS.roe_1s26 - KE), roe2025_pre: r2(DATOS.roe_2025 - KE_PRE), roe1s26_pre: r2(DATOS.roe_1s26 - KE_PRE) },
};

// ---- Markdown
const L = [];
L.push('# Itaú Unibanco: valoración bancaria (exceso de rentabilidad y P/VC justificado)', '');
L.push('Corte 27-oct-2026. Precio de la línea de compra: ADR ITUB (NYSE) 7,70 USD al cierre del 26-oct-2026 × 5,4064 BRL/USD = ' + n(PRECIO_BRL) + ' BRL por acción (1 ADR = 1 acción preferente ITUB4; ITUB4 cerró a 41,70 BRL en B3 el mismo día). Base contable: **BR GAAP gerencial** (resultado recurrente gerencial y patrimonio del MD&A del 2T26), que es la que sigue el mercado; las cuentas NIIF del 20-F se usan para la serie histórica del informe Word. Generado por `notas/valoracion-banco.mjs`.', '');
L.push('## Por qué este modelo y no el DCF de EBITDA', '');
L.push('En un banco la deuda (depósitos, emisiones) es la materia prima, no financiación: no hay EBITDA, ni capital invertido, ni valor empresa, ni circulante con sentido. El valor para el accionista es el patrimonio contable más el valor actual de lo que el banco gane **por encima** de su coste del capital propio (Ke): valor = VC₀ + Σ (ROEₜ − Ke) × VCₜ₋₁ / (1 + Ke)ᵗ + terminal. Como contraste, el P/VC justificado en estado estacionario: (ROE − g) / (Ke − g). Este es el valor intrínseco que manda. El DCF del motor se ha adaptado a flujo para el accionista (beneficio − retención para crecer con el CET1 objetivo; deuda y caja 0 en el puente; peso de la deuda 0, WACC = Ke) y solo sirve de comprobación.', '');
L.push('## Coste del capital propio en reales', '');
L.push('| Concepto | Hoy (26-oct) | Antes de las elecciones (23-oct) | Con la prima de Damodaran |', '|---|---|---|---|');
L.push(`| Tasa libre: bono del Tesoro brasileño a 10 años en BRL | ${n(DATOS.tasa_libre)} % | ${n(DATOS.tasa_libre_pre)} % | ${n(DATOS.tasa_libre)} % |`);
L.push(`| Beta (ajustada; medida 1,11-1,19 frente a Ibovespa y EWZ) | ${n(DATOS.beta)} | ${n(DATOS.beta)} | ${n(DATOS.beta)} |`);
L.push(`| Prima de mercado | ${n(DATOS.prima, 1)} % | ${n(DATOS.prima, 1)} % | ${n(DATOS.prima_damodaran, 1)} % |`);
L.push('| Prima país adicional | 0 (ya está en el bono en reales) | 0 | 0 |');
L.push(`| **Ke** | **${n(KE)} %** | **${n(KE_PRE)} %** | **${n(KE_DAM)} %** |`, '');
L.push('El riesgo país ya está dentro del rendimiento del bono en reales: sumar 3 puntos encima, como hacía el escáner, lo contaría dos veces. Crecimiento terminal: 5,0 % nominal en BRL (IPCA de largo plazo del Focus, 3,5 %, más 1,5 de crecimiento real), entre la inflación y la tasa libre menos medio punto.', '');
L.push('## Calidad: ROE recurrente − Ke (equivalente de ROIC − WACC)', '');
L.push('| ROE recurrente | ROE | − Ke hoy (' + n(KE) + ' %) | − Ke pre-elecciones (' + n(KE_PRE) + ' %) |', '|---|---|---|---|');
L.push(`| Ejercicio 2025 | ${n(DATOS.roe_2025, 1)} % | ${n(RESULTADO.roe_menos_ke.roe2025)} | ${n(RESULTADO.roe_menos_ke.roe2025_pre)} |`);
L.push(`| 1S26 anualizado | ${n(DATOS.roe_1s26, 1)} % | ${n(RESULTADO.roe_menos_ke.roe1s26)} | ${n(RESULTADO.roe_menos_ke.roe1s26_pre)} |`, '');
L.push('Regla del método: nunca por debajo de 4,5 puntos; ≥ 5 para comprar (niveles A y B1), 4,5-5 solo B2/C. **Con el Ke de hoy, Itaú queda entre 1,9 y 3,0 puntos: no pasa el suelo de 4,5 y no es comprable en ningún nivel.** Con el bono de antes de las elecciones quedaba en 4,4-5,5 (al filo). La conclusión depende más de la tasa libre brasileña que del banco.', '');
L.push('## Supuestos del caso base (año 1 = jul-2026 a jun-2027)', '');
L.push('| Año | VC inicial (R$) | ROE % | Exceso (ROE − Ke) × VC | Factor de descuento | VA del exceso | BPA implícito | Dividendo implícito | Crecimiento del VC % |', '|---|---|---|---|---|---|---|---|---|');
for (const f of base.filas) L.push(`| ${f.anio} | ${n(f.vc_ini)} | ${n(f.roe, 1)} | ${n(f.ri)} | ${n(f.fd, 3)} | ${n(f.va_ri)} | ${n(f.bpa)} | ${n(f.dividendo)} | ${n(f.g, 1)} |`);
L.push('', `Terminal: VC del año 10 ${n(base.vc_final)} R$, ROE ${n(base.roe_terminal, 1)} %, exceso ${n(base.ri_terminal)} R$, crecimiento ${n(DATOS.g_terminal, 1)} % → valor terminal ${n(base.tv)} R$, VA ${n(base.va_tv)} R$.`, '');
L.push(`**Valor a 30-jun-2026: ${n(DATOS.vc_jun26)} (VC) + ${n(base.va_ri)} (VA de los excesos de 10 años) + ${n(base.va_tv)} (terminal) = ${n(base.valor_jun)} R$; llevado al 27-oct-2026: ${n(base.valor)} R$ por acción** (${n(base.valor / DATOS.tc)} USD por ADR), frente a ${n(PRECIO_BRL)} R$ de precio (${n(100 * (base.valor / PRECIO_BRL - 1), 1)} %).`, '');
L.push('## Escenarios (Ke de hoy)', '');
L.push('| Escenario | Prob. | Supuesto | Valor (R$) | Valor (USD por ADR) | Frente al precio |', '|---|---|---|---|---|---|');
for (const [k, e] of Object.entries(ESC)) L.push(`| ${k} | ${e.prob} % | ${e.texto} | ${n(esc[k].valor)} | ${n(esc[k].valor / DATOS.tc)} | ${n(100 * (esc[k].valor / PRECIO_BRL - 1), 1)} % |`);
L.push(`| **Ponderado** | | | **${n(ponderado)}** | **${n(ponderado / DATOS.tc)}** | **${n(100 * (ponderado / PRECIO_BRL - 1), 1)} %** |`, '');
L.push('## Sensibilidad al coste del capital', '');
L.push('| Ke | Valor caso base (R$) | P/VC justificado (ROE 24 %, g 5 %) | Valor por P/VC (R$) |', '|---|---|---|---|');
L.push(`| Hoy ${n(KE)} % | ${n(base.valor)} | ${n(pvc.hoy)}x | ${n(pvc.hoy * DATOS.vc_jun26)} |`);
L.push(`| Prima de Damodaran ${n(KE_DAM)} % | ${n(varDam.valor)} | ${n(pvc.dam)}x | ${n(pvc.dam * DATOS.vc_jun26)} |`);
L.push(`| Antes de las elecciones ${n(KE_PRE)} % | ${n(varPre.valor)} | ${n(pvc.pre)}x | ${n(pvc.pre * DATOS.vc_jun26)} |`);
for (const k of [17, 15, 13.5]) { const v = residual(k); L.push(`| ${n(k, 1)} % | ${n(v.valor)} | ${n(pvcJustificado(24, k))}x | ${n(pvcJustificado(24, k) * DATOS.vc_jun26)} |`); }
L.push('', `**Qué descuenta el precio.** A ${n(PRECIO_BRL)} R$ el banco cotiza a ${n(RESULTADO.pvc_mercado)} veces su valor contable. Con el caso base de ROE, el Ke que iguala el valor al precio es ${n(keMercado)} %; con la fórmula de Gordon (ROE 24 %, g 5 %), ${n(RESULTADO.ke_implicito_gordon)} %. Es decir: el mercado descuenta un coste del capital **por debajo de la tasa libre de hoy** (${n(DATOS.tasa_libre)} %) e incluso de la de antes de las elecciones. O espera que los tipos en reales bajen mucho y por mucho tiempo (el Focus del 23-oct ve la Selic en 10 % desde 2028), o paga la calidad de Itaú con un Ke de banco de país estable. Con la regla del método (Ke constante con el bono de hoy), ningún banco brasileño con ROE del 24 % vale más de 1,2-1,4 veces su valor contable.`, '');
L.push('## Contraste con el DCF del motor', '');
L.push('El motor solo sabe hacer un DCF de EBITDA. Se ha adaptado así: ingresos = margen financiero + comisiones + seguros netos de pérdidas esperadas (NIIF); «margen EBITDA» = beneficio antes de impuestos sin participadas sobre esos ingresos; impuestos + minoritarios ≈ 10 % (tipo efectivo NIIF con el JCP deducible); «capex» = retención necesaria para que el patrimonio crezca con la cartera y el CET1 se quede en el objetivo; circulante 0; deuda 0, caja 0 y minoritarios 0 en el puente; peso de la deuda 0 (WACC = Ke). Así el DCF es un descuento del flujo para el accionista y debe acercarse al modelo de exceso de rentabilidad. Su cifra se usa solo como comprobación; ROIC, EV/EBITDA, DN/EBITDA y circulante del motor no significan nada en un banco.', '');
L.push('Calibración usada (notas/supuestos.mjs): el «margen EBITDA» de cada año es ROE × (patrimonio / ingresos de 2025 = 1,47) ÷ (1 + g) ÷ (1 − 9 %), de modo que el beneficio después de impuestos es el ROE del caso base por el patrimonio inicial; el «capex» es g × 1,47 ÷ (1 + g) de los ingresos, la retención que mantiene el patrimonio al ritmo de la cartera. **Resultado del motor: 22,55 R$ por acción en el caso base (16,79 bajista y 25,86 alcista)**, a menos de un 4 % del modelo de exceso de rentabilidad (21,74): las dos vías cuadran porque descuentan lo mismo (lo que el banco puede repartir) al mismo Ke. El valor terminal pesa solo el 26 % porque con un Ke del 21,5 % lo lejano casi no vale. El DCF tiene peso 0 en la síntesis; el valor intrínseco es el ponderado del modelo de exceso de rentabilidad (21,34 R$), que entra en el motor como una «parte» con valor directo (suma de partes al 100 %).', '');
L.push('## Sensibilidad a la Selic y a la tasa libre', '');
L.push('| Canal | Efecto de +1 punto | Lectura |', '|---|---|---|');
L.push('| Ke (tasa libre + 1 punto, Ke 22,49 %) | valor base de 21,74 a ' + n(residual(KE + 1).valor) + ' R$ | El canal que domina: cada punto de tasa libre quita ≈ 6 % del valor |');
L.push('| Ke (tasa libre − 1 punto, Ke 20,49 %) | valor base a ' + n(residual(KE - 1).valor) + ' R$ | |');
L.push('| Tasa libre de 13,5 % (Ke 19,55 %) | valor base a ' + n(residual(13.5 + DATOS.beta * DATOS.prima).valor) + ' R$ | Nivel aproximado de antes de las elecciones citado en el encargo; medido, el 23-oct estaba en 12,98 % |');
L.push('| Margen del capital propio («working capital and other»: 137.357 M de saldo medio al 12,0 % en el 2T26) | ≈ +1.370 M antes de impuestos y ≈ +0,9 mil M después (≈ +1,8 % del resultado recurrente), antes de coberturas | Itaú cubre parte de ese capital a tipo fijo, así que el efecto real es menor (estimación propia) |');
L.push('| Coste del crédito y demanda de crédito | negativo con retraso (particulares y pymes) | Una Selic alta más tiempo sube la morosidad de 15-90 días y frena la cartera |');
L.push('', 'Neto: una Selic más alta apenas mueve el beneficio de Itaú (el margen del capital propio compensa parte del coste del crédito), pero el método la castiga a fondo por el Ke. Por eso el valor intrínseco es sobre todo una apuesta sobre la tasa libre en reales, no sobre el banco.', '');
L.push('## Regla a 12 meses (v3) con el BPA recurrente', '');
L.push('BPA recurrente gerencial: 2026e 4,56 R$ (1S26 real 24.689 M + 2S ≈ 25.600 M), 2027e 4,91 y 2028e 5,25 (bajista 4,45, alcista 5,55). PER adelantado de B3 (cierre ÷ BPA del año siguiente; sin 2019 por la COVID): mediana de 5 años 6,8x, mínimo 6,4x, media larga 8,6x; PER actual 8,5x (41,63 ÷ 4,91). Base 7,7x (8,5 ÷ 1,1, tope), bajista 6,2x (base × 0,8), alcista 9,8x (mediana de los comparables). Resultado del motor: bajista 27,59, base 40,43 y alcista 54,39 R$; rentabilidad con dividendo (6,9 %) del +4,0 % en el base y del +4,7 % ponderada: **Mantener**, lejos del 15 % de compra. Y aunque llegara, el valor intrínseco (21,34) está muy por debajo del precio y la calidad no pasa el suelo.', '');
fs.writeFileSync(path.join(dir, '..', 'valoracion-banco.md'), L.join('\n') + '\n', 'utf8');
if (process.argv[1] && process.argv[1].endsWith('valoracion-banco.mjs')) console.log(JSON.stringify(RESULTADO, null, 1));

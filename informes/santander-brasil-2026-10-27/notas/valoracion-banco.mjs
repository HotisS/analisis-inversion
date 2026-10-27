// Valoración bancaria de Santander Brasil (unit SANB11, corte 27-oct-2026): modelo de exceso de rentabilidad (residual
// income), P/VC justificado y valor de la oferta de canje de la matriz. Escribe informes/santander-brasil-2026-10-27/
// valoracion-banco.md y exporta el resultado para propio.mjs y supuestos.mjs.
// Base: resultado gerencial recurrente y patrimonio BR GAAP del Informe de Resultados del 2T26 (el que sigue el mercado).
// Ejecutar: node informes/santander-brasil-2026-10-27/notas/valoracion-banco.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const r2 = (x) => Math.round(x * 100) / 100;
const n = (x, d = 2) => (x === null || x === undefined ? 'n.d.' : x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));

// ---- Datos (fuentes: Informe de Resultados 2T26, presentación 1T26, 6-K y 425 en la SEC, Yahoo, Trading Economics, BCB)
export const DATOS = {
  pn_jun26: 98210, acciones_tot: 7488, units: 3744, vc_jun26: 25.77, // 2T26: patrimonio 98.210 M, 7.488 M de acciones, VC por unit 25,77
  roe_2025: 17.3, roe_1s26: 14.3, roe_2t26: 12.5, roe_1t26: 16.0, cet1: 11.2, rwa: 773911,
  precio: 26.30, // SANB11 en B3, cierre del 26-oct-2026 (−4,47 %)
  tasa_libre: 15.435, tasa_libre_pre: 12.98, beta: 1.0, prima: 5.5, prima_damodaran: 4.2,
  g_terminal: 5.0, // IPCA de largo plazo del Focus (3,5 %) + 1,5 de crecimiento real, como Itaú y BTG
  // Oferta de canje de Banco Santander, S.A. (30-jul-2026): 0,4056 acciones SAN por unit, ajustable por dividendos y JCP.
  ratio_anuncio: 0.4056, unit_eur_anuncio: 4.97, san_eur_anuncio: 12.248, jcp_oct_brl: 0.40100389962, eurbrl_20oct: 5.637,
  san_eur_26oct: 11.154, san_eur_23oct: 11.51, eurbrl_26oct: 6.0345, eurbrl_ptax_26oct: 6.1487, ratio_unit_14: null,
};
export const KE = r2(DATOS.tasa_libre + DATOS.beta * DATOS.prima);
export const KE_PRE = r2(DATOS.tasa_libre_pre + DATOS.beta * DATOS.prima);
export const KE_DAM = r2(DATOS.tasa_libre + DATOS.beta * DATOS.prima_damodaran);
export const KE_135 = r2(13.5 + DATOS.beta * DATOS.prima);

// Ratio ajustado por el JCP de 0,401 BRL por unit con fecha de registro el 20-oct (se resta en euros del precio en euros de
// la unit, 4,97 EUR) [Q&A del 14-ago]. Sin dividendo de SAN con registro entre el 30-jul y el 26-oct (estimación propia).
export const RATIO = Math.round((DATOS.unit_eur_anuncio - DATOS.jcp_oct_brl / DATOS.eurbrl_20oct) / DATOS.san_eur_anuncio * 1e4) / 1e4;
export const OFERTA = {
  ratio: RATIO,
  valor_26oct: r2(RATIO * DATOS.san_eur_26oct * DATOS.eurbrl_26oct),
  valor_26oct_ptax: r2(RATIO * DATOS.san_eur_26oct * DATOS.eurbrl_ptax_26oct),
  valor_anuncio: 29.04,
};

// ---- Supuestos por año (año 1 = jul-2026 a jun-2027): ROE recurrente y crecimiento del patrimonio (= de la cartera y de
// los activos ponderados por riesgo, para que el CET1 no baje del 11 %).
const ROE_BASE = [13.5, 14.5, 15.5, 16.0, 16.5, 16.5, 16.8, 17.0, 17.0, 17.0];
const G_BASE = [6.0, 6.5, 6.5, 6.5, 6.0, 6.0, 5.5, 5.5, 5.0, 5.0];
export const ESC = {
  Bajista: { dRoe: -3.0, dG: -1.5, prob: 25, texto: 'coste del crédito que se queda en el 4,2-4,5 % de la cartera con la Selic alta más tiempo (ROE del 10,5-14 %) y cartera que crece 1,5 puntos menos' },
  Base: { dRoe: 0, dG: 0, prob: 50, texto: 'ROE recurrente del 13,5 % en el primer año (2S26-1S27), que vuelve al 16-17 % en tres-cinco años (su nivel de 2024-2025, 17,3 %); patrimonio +6-6,5 % → 5 %' },
  Alcista: { dRoe: 2.0, dG: 1.0, prob: 25, texto: 'la Selic baja desde 2027, el coste del crédito vuelve al 3,5 % y el ROE recupera el 17,5-19 % (el 21 % de 2021 no se repite)' },
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
  // Al 27-oct-2026: el valor de junio crece al Ke 119 días (0,326 años) menos el JCP de 0,401 BRL por unit con fecha de
  // registro el 20-oct, que ya no recibe quien compra hoy (la unit cotiza «ex» desde el 21-oct).
  const valor = valorJun * (1 + ke / 100) ** 0.326 - DATOS.jcp_oct_brl;
  return { ke, filas, va_ri: va, vc_final: vc, roe_terminal: roeTerm, ri_terminal: riT, tv, va_tv: vaTv, valor_jun: valorJun, valor };
}

export function pvcJustificado(roe, ke, g = DATOS.g_terminal) { return (roe - g) / (ke - g); }
export function keImplicito(precio, roe = 16.0, g = DATOS.g_terminal, vc = DATOS.vc_jun26) { return g + (roe - g) / (precio / vc); }

const base = residual(KE);
const esc = Object.fromEntries(Object.entries(ESC).map(([k, e]) => [k, residual(KE, e)]));
const ponderado = Object.entries(ESC).reduce((s, [k, e]) => s + e.prob / 100 * esc[k].valor, 0);
const varPre = residual(KE_PRE), varDam = residual(KE_DAM), var135 = residual(KE_135);
let lo = 3, hi = 30;
for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (residual(m).valor > DATOS.precio) lo = m; else hi = m; }
const keMercado = (lo + hi) / 2;
const pvc = { hoy: pvcJustificado(16.0, KE), pre: pvcJustificado(16.0, KE_PRE), dam: pvcJustificado(16.0, KE_DAM) };

export const RESULTADO = {
  precio_brl: DATOS.precio, ke: KE, ke_pre: KE_PRE, ke_damodaran: KE_DAM, ke_135: KE_135,
  valor_base: r2(base.valor), valor_ponderado: r2(ponderado),
  valores: Object.fromEntries(Object.entries(esc).map(([k, v]) => [k, r2(v.valor)])),
  valor_pre: r2(varPre.valor), valor_damodaran: r2(varDam.valor), valor_135: r2(var135.valor),
  pvc_justificado: { hoy: r2(pvc.hoy), pre: r2(pvc.pre), damodaran: r2(pvc.dam) },
  valor_pvc: { hoy: r2(pvc.hoy * DATOS.vc_jun26), pre: r2(pvc.pre * DATOS.vc_jun26), damodaran: r2(pvc.dam * DATOS.vc_jun26) },
  pvc_mercado: r2(DATOS.precio / DATOS.vc_jun26), ke_mercado: r2(keMercado), ke_implicito_gordon: r2(keImplicito(DATOS.precio)),
  roe_menos_ke: { roe2025: r2(DATOS.roe_2025 - KE), roe1s26: r2(DATOS.roe_1s26 - KE), roe2t26: r2(DATOS.roe_2t26 - KE), roe2025_pre: r2(DATOS.roe_2025 - KE_PRE), roe1s26_pre: r2(DATOS.roe_1s26 - KE_PRE) },
  oferta: OFERTA,
  sens: { mas1: r2(residual(KE + 1).valor), menos1: r2(residual(KE - 1).valor) },
};

// ---- Markdown
const P = DATOS.precio;
const pct = (v) => n(100 * (v / P - 1), 1);
const L = [];
L.push('# Santander Brasil: valoración bancaria (exceso de rentabilidad, P/VC justificado y oferta de canje)', '');
L.push(`Corte 27-oct-2026. Línea de compra: **unit SANB11 en B3 (BRL)**, 1 unit = 1 ordinaria + 1 preferente (acta del consejo del 9-oct-2026). Precio ${n(P)} BRL, cierre del 26-oct-2026 (−4,47 %). El ADR BSBR sigue cotizando en la NYSE (1 ADR = 1 unit; 4,82 USD el 26-oct) y el banco sigue registrado en la SEC (20-F 2025 presentado el 27-feb-2026): no se ha deslistado. Base contable: **BR GAAP gerencial** (resultado gerencial recurrente y patrimonio del Informe de Resultados del 2T26), la que sigue el mercado; el ROE recurrente del banco excluye el fondo de comercio (1.746 M). Las cuentas NIIF de la CVM se usan para la serie histórica del informe Word. Generado por \`notas/valoracion-banco.mjs\`.`, '');
L.push('## Por qué este modelo y no el DCF de EBITDA', '');
L.push('En un banco la deuda (depósitos, emisiones) es la materia prima: no hay EBITDA, capital invertido ni valor empresa con sentido. Valor para el accionista = valor contable + valor actual de lo que el banco gane **por encima** de su coste del capital propio (Ke): VC₀ + Σ (ROEₜ − Ke) × VCₜ₋₁ / (1 + Ke)ᵗ + terminal. Contraste: P/VC justificado (ROE − g) / (Ke − g). Mismo método y misma tasa libre que Itaú y BTG (27-oct) para que las cifras se puedan comparar. **Si el ROE queda por debajo del Ke, el banco vale menos que su valor contable**, que es lo que pasa aquí.', '');
L.push('## Coste del capital propio en reales', '');
L.push('| Concepto | Hoy (26-oct) | Antes de las elecciones (23-oct) | Con la prima de Damodaran |', '|---|---|---|---|');
L.push(`| Tasa libre: bono del Tesoro brasileño a 10 años en BRL | ${n(DATOS.tasa_libre, 3)} % | ${n(DATOS.tasa_libre_pre)} % | ${n(DATOS.tasa_libre, 3)} % |`);
L.push(`| Beta (medida 0,97-0,99 mensual a 5 años y 0,84 semanal frente a BOVA11; se usa 1,0) | ${n(DATOS.beta)} | ${n(DATOS.beta)} | ${n(DATOS.beta)} |`);
L.push(`| Prima de mercado | ${n(DATOS.prima, 1)} % | ${n(DATOS.prima, 1)} % | ${n(DATOS.prima_damodaran, 1)} % |`);
L.push('| Prima país adicional | 0 (ya está en el bono en reales) | 0 | 0 |');
L.push(`| **Ke** | **${n(KE)} %** | **${n(KE_PRE)} %** | **${n(KE_DAM)} %** |`, '');
L.push(`El riesgo país ya está dentro del rendimiento del bono en reales: sumar 3 puntos encima, como hacía el escáner, lo contaría dos veces. Con la tasa libre de ≈ 13,5 % que cita el encargo, Ke ${n(KE_135)} %. Crecimiento terminal: 5,0 % nominal en BRL (IPCA de largo plazo del Focus, 3,5 %, + 1,5 real).`, '');
L.push('## Calidad: ROE recurrente − Ke (equivalente de ROIC − WACC)', '');
L.push(`| ROE recurrente (BR GAAP, sin fondo de comercio) | ROE | − Ke hoy (${n(KE)} %) | − Ke pre-elecciones (${n(KE_PRE)} %) |`, '|---|---|---|---|');
L.push(`| Ejercicio 2025 (media de los cuatro trimestres: 17,5 / 16,4 / 17,5 / 17,6) | ${n(DATOS.roe_2025, 1)} % | ${n(RESULTADO.roe_menos_ke.roe2025)} | ${n(RESULTADO.roe_menos_ke.roe2025_pre)} |`);
L.push(`| 1S26 (16,0 % en el 1T26 y 12,5 % en el 2T26) | ${n(DATOS.roe_1s26, 1)} % | ${n(RESULTADO.roe_menos_ke.roe1s26)} | ${n(RESULTADO.roe_menos_ke.roe1s26_pre)} |`, '');
L.push(`Regla del método: nunca por debajo de 4,5 puntos; ≥ 5 para comprar (A y B1), 4,5-5 solo B2/C. **Santander Brasil queda entre ${n(RESULTADO.roe_menos_ke.roe2025)} y ${n(RESULTADO.roe_menos_ke.roe1s26)} puntos con el Ke de hoy, y entre ${n(RESULTADO.roe_menos_ke.roe2025_pre)} y ${n(RESULTADO.roe_menos_ke.roe1s26_pre)} con el de antes de las elecciones: no pasa en ningún caso y no es comprable en ningún nivel.** A diferencia de Itaú (al filo con el bono anterior), aquí la conclusión no depende de la tasa libre: el ROE del banco no cubre ni la tasa libre más la prima con un bono del 13 %. El ROIC NIIF del motor (patrimonio NIIF con el fondo de comercio de Banco Real) sale aún más bajo.`, '');
L.push('## Supuestos del caso base (año 1 = jul-2026 a jun-2027)', '');
L.push('| Año | VC inicial (R$) | ROE % | Exceso (ROE − Ke) × VC | Factor de descuento | VA del exceso | BPA implícito | Dividendo implícito | Crecimiento del VC % |', '|---|---|---|---|---|---|---|---|---|');
for (const f of base.filas) L.push(`| ${f.anio} | ${n(f.vc_ini)} | ${n(f.roe, 1)} | ${n(f.ri)} | ${n(f.fd, 3)} | ${n(f.va_ri)} | ${n(f.bpa)} | ${n(f.dividendo)} | ${n(f.g, 1)} |`);
L.push('', `Terminal: VC del año 10 ${n(base.vc_final)} R$, ROE ${n(base.roe_terminal, 1)} %, exceso ${n(base.ri_terminal)} R$, crecimiento ${n(DATOS.g_terminal, 1)} % → valor terminal ${n(base.tv)} R$, VA ${n(base.va_tv)} R$.`, '');
L.push(`**Valor a 30-jun-2026: ${n(DATOS.vc_jun26)} (VC) ${base.va_ri < 0 ? '−' : '+'} ${n(Math.abs(base.va_ri))} (VA de los excesos de 10 años) ${base.va_tv < 0 ? '−' : '+'} ${n(Math.abs(base.va_tv))} (terminal) = ${n(base.valor_jun)} R$; llevado al 27-oct-2026 y sin el JCP de 0,40 R$ ya descontado: ${n(base.valor)} R$ por unit**, frente a ${n(P)} R$ de precio (${pct(base.valor)} %).`, '');
L.push('## Escenarios (Ke de hoy)', '');
L.push('| Escenario | Prob. | Supuesto | Valor (R$ por unit) | Frente al precio |', '|---|---|---|---|---|');
for (const [k, e] of Object.entries(ESC)) L.push(`| ${k} | ${e.prob} % | ${e.texto} | ${n(esc[k].valor)} | ${pct(esc[k].valor)} % |`);
L.push(`| **Ponderado** | | | **${n(ponderado)}** | **${pct(ponderado)} %** |`, '');
L.push('## Sensibilidad al coste del capital', '');
L.push('| Ke | Valor caso base (R$) | P/VC justificado (ROE 16 %, g 5 %) | Valor por P/VC (R$) |', '|---|---|---|---|');
L.push(`| Hoy ${n(KE)} % | ${n(base.valor)} | ${n(pvc.hoy)}x | ${n(pvc.hoy * DATOS.vc_jun26)} |`);
L.push(`| Prima de Damodaran ${n(KE_DAM)} % | ${n(varDam.valor)} | ${n(pvc.dam)}x | ${n(pvc.dam * DATOS.vc_jun26)} |`);
L.push(`| Antes de las elecciones ${n(KE_PRE)} % | ${n(varPre.valor)} | ${n(pvc.pre)}x | ${n(pvc.pre * DATOS.vc_jun26)} |`);
L.push(`| Tasa libre del 13,5 % (Ke ${n(KE_135)} %) | ${n(var135.valor)} | ${n(pvcJustificado(16, KE_135))}x | ${n(pvcJustificado(16, KE_135) * DATOS.vc_jun26)} |`);
for (const k of [16, 14]) { const v = residual(k); L.push(`| ${n(k, 1)} % | ${n(v.valor)} | ${n(pvcJustificado(16, k))}x | ${n(pvcJustificado(16, k) * DATOS.vc_jun26)} |`); }
L.push('', `**Qué descuenta el precio.** A ${n(P)} R$ la unit cotiza a ${n(RESULTADO.pvc_mercado)} veces su valor contable BR GAAP. Con el caso base de ROE, el Ke que iguala el valor al precio es ${n(keMercado)} %; con Gordon (ROE 16 %, g 5 %), ${n(RESULTADO.ke_implicito_gordon)} %: el precio pide un coste del capital igual a la tasa libre (${n(DATOS.tasa_libre, 3)} %) sin prima de riesgo. Pero el precio de hoy **no lo fija el negocio sino la oferta de canje** (siguiente apartado).`, '');
L.push('## La oferta de canje de la matriz: lo que de verdad fija el precio', '');
L.push(`Banco Santander, S.A. (89,53 % del capital) anunció el 30-jul-2026 una oferta voluntaria de canje por el ≈ 10 % que no tiene: **0,4056 acciones nuevas de Banco Santander por unit o ADR** (0,2028 por acción), en BDR en B3 o en ADS en la NYSE, sin aceptación mínima y sin buscar la exclusión de bolsa; prima del 15 % sobre el cierre de 25,25 R$ del 30-jul (29,04 R$ por unit al anunciarla). El ratio baja con los JCP y dividendos de Santander Brasil y sube con los dividendos de Banco Santander con fecha de registro antes del fin de la oferta. Se presentó a la CVM, B3 y SEC (Form F-4) el 21-sep-2026 con el laudo de UBS BB; la matriz espera cerrarla en el 1S27.`, '');
L.push('| Concepto | Valor |', '|---|---|');
L.push(`| Ratio ajustado por el JCP de 0,401 R$ (registro 20-oct) | ${n(RATIO, 4)} acciones SAN por unit (estimación propia: 4,97 € − 0,401 R$ ÷ ${n(DATOS.eurbrl_20oct, 3)} = ${n(DATOS.unit_eur_anuncio - DATOS.jcp_oct_brl / DATOS.eurbrl_20oct, 4)} €, ÷ 12,248 €) |`);
L.push(`| SAN en Madrid, cierre del 26-oct | ${n(DATOS.san_eur_26oct, 3)} € (−3,1 % en el día; 11,51 € el 23-oct) |`);
L.push(`| Valor de la oferta por unit el 26-oct (EUR/BRL 6,0345 de Yahoo) | **${n(OFERTA.valor_26oct)} R$** |`);
L.push(`| Ídem con la PTAX del euro del 26-oct (6,1487) | ${n(OFERTA.valor_26oct_ptax)} R$ |`);
L.push(`| Precio de SANB11 el 26-oct | ${n(P)} R$ (descuento del ${n(100 * (1 - P / OFERTA.valor_26oct), 1)} % al ${n(100 * (1 - P / OFERTA.valor_26oct_ptax), 1)} %) |`, '');
L.push(`Lectura: la unit cotiza como un derivado de la acción de la matriz por el tipo de cambio, con un descuento pequeño por plazo (hasta el 1S27) y riesgo de que la oferta no se cierre. Por eso cayó solo un 4,5 % el 26-oct, mientras Itaú caía un 13 % y Bradesco un 21 %: el real se depreció ≈ 7-9 % frente al euro y eso **subió** el valor en reales de la contraprestación, que compensó la caída de SAN (−3,1 %). Mientras la oferta siga viva, el valor intrínseco del banco (${n(ponderado)} R$) es un suelo teórico muy lejano y el «techo» práctico es el valor de canje.`, '');
L.push('## Contraste con el DCF del motor', '');
L.push('Igual que en Itaú: «ingresos» = ingresos operativos NIIF netos de pérdidas por deterioro (39.835 M en 2025); «margen EBITDA» calibrado para que el beneficio después de impuestos sea ROE BR GAAP × patrimonio BR GAAP (patrimonio / ingresos = 2,47); impuestos del 20 %; «capex» = retención para que el patrimonio crezca con la cartera; amortización y circulante 0; deuda, caja y minoritarios 0; WACC = Ke. Es un descuento de dividendos y debe acercarse al modelo de exceso de rentabilidad. Peso 0 en la síntesis: el valor intrínseco es el ponderado del modelo bancario, que entra como «suma de partes» al 100 %.', '');
L.push('## Sensibilidad a la Selic y a la tasa libre', '');
L.push('| Canal | Efecto de +1 punto | Lectura |', '|---|---|---|');
L.push(`| Ke (tasa libre + 1 punto) | valor base de ${n(base.valor)} a ${n(RESULTADO.sens.mas1)} R$ | Cada punto de tasa libre quita ≈ ${n(100 * (1 - RESULTADO.sens.mas1 / base.valor), 0)} % del valor |`);
L.push(`| Ke (tasa libre − 1 punto) | valor base a ${n(RESULTADO.sens.menos1)} R$ | |`);
L.push('| Margen financiero | Santander Brasil es **pasivo-sensible**: el margen con el mercado fue de −718 M en el 2T26 y −1.486 M en el 4T25 por el coste de la financiación de la cartera de títulos y de la cartera a tipo fijo; en 2025 la subida de la Selic restó margen («sensibilidad negativa al aumento de la tasa de interés», 4T25) | Una Selic alta más tiempo tras las elecciones retrasa la recuperación del margen con el mercado |');
L.push('| Coste del crédito | Ya en el 3,81 % de la cartera (12 meses) y subiendo; PDD del 2T26 +20,6 % en el trimestre por pymes, agro, segmento masivo y casos de mayorista | Es el canal que más pesa en el ROE |', '');
L.push('Neto: a diferencia de Itaú (activo-sensible por su capital propio), una Selic más alta perjudica a Santander Brasil en el margen y en el coste del riesgo, y además el método la castiga en el Ke.', '');
fs.writeFileSync(path.join(dir, '..', 'valoracion-banco.md'), L.join('\n') + '\n', 'utf8');
if (process.argv[1] && process.argv[1].endsWith('valoracion-banco.mjs')) console.log(JSON.stringify(RESULTADO, null, 1));

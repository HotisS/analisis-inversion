// Valoración bancaria de Banco Santander (SAN en la Bolsa de Madrid, corte 27-oct-2026): modelo de exceso de rentabilidad
// (residual income) sobre el valor contable TANGIBLE por acción, P/VTC justificado, Ke en euros con prima por país ponderada
// y efecto de la oferta de canje por Santander Brasil. Escribe informes/banco-santander-2026-10-27/valoracion-banco.md y
// exporta el resultado para propio.mjs y supuestos.mjs.
// Base: resultado ordinario («underlying») y RoTE ordinario del Informe Financiero del 2T26 (el que sigue el mercado).
// Ejecutar: node informes/banco-santander-2026-10-27/notas/valoracion-banco.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const r2 = (x) => Math.round(x * 100) / 100;
const n = (x, d = 2) => (x === null || x === undefined ? 'n.d.' : x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));

// ---- Peso de cada país en el beneficio ordinario del 1S26 (segmentos secundarios, sin el centro corporativo) [A1] y prima
// por riesgo país de Damodaran (actualización de ene-2026, método por calificación: diferencial de impago × 1,52) [D5].
export const PAISES = [
  { pais: 'España', bn: 2534, crp: 1.55 },
  { pais: 'Reino Unido', bn: 725, crp: 0.78 },
  { pais: 'Portugal', bn: 471, crp: 1.55 },
  { pais: 'Openbank Europa (Alemania, España, Francia, Italia, nórdicos…)', bn: 253, crp: 1.0, nota: 'estimación: media de la zona euro donde opera' },
  { pais: 'Estados Unidos', bn: 989, crp: 0.23 },
  { pais: 'México', bn: 897, crp: 2.46 },
  { pais: 'Brasil', bn: 1093, crp: 3.24 },
  { pais: 'Chile', bn: 469, crp: 1.10 },
  { pais: 'Argentina', bn: 194, crp: 9.71 },
  { pais: 'Resto del grupo', bn: 229, crp: 1.5, nota: 'estimación' },
];
const TOT = PAISES.reduce((s, p) => s + p.bn, 0);
for (const p of PAISES) p.peso = 100 * p.bn / TOT;
export const CRP = r2(PAISES.reduce((s, p) => s + p.peso / 100 * p.crp, 0));
// Brasil tras el 26-oct: el bono a 10 años en reales subió 2,46 puntos (12,98 → 15,44 %); con la misma subida en su prima,
// la ponderada sube ≈ 0,34 puntos.
const pesoBR = PAISES.find((p) => p.pais === 'Brasil').peso;
export const CRP_LULA = r2(CRP + pesoBR / 100 * 2.46);

export const DATOS = {
  vtc_jun26: 6.32, acciones_jun26: 14689, // TNAV por acción 6,32 € y 14.689 M de acciones a 30-jun-2026 [A1]
  // Webster (cerrada el 20-ago-2026): 329,8 M de acciones nuevas a 10,7896 € (3.559 M €) + 48,75 USD × 162,0 M de acciones
  // de Webster en efectivo (7.899 M USD = 7.089 M € a 1,1143); valor contable tangible de Webster 38,81 USD × 162,0 M =
  // 6.288 M USD = 5.643 M €. Fondo de comercio e intangibles nuevos ≈ 3.559 + 7.089 − 5.643 = 5.005 M € (sin ajustes de
  // valor razonable, estimación propia).
  webster_acc: 329.846, webster_eq: 3559, webster_fc: 5005,
  roe_2025: 13.0, rote_2025: 15.2, rote_1s26: 15.6, rote_2t26: 16.0, roe_1s26: 13.6, cet1: 14.0,
  precio: 11.154, // SAN en Madrid, cierre del 26-oct-2026 (−3,1 %)
  tasa_libre: 3.43, beta: 1.24, prima: 5.5, prima_damodaran: 4.2,
  g_terminal: 3.0, // nominal en euros: inflación del BCE (2 %) + 1 real; el negocio en divisas emergentes se convierte a euros
  dividendo_oct: 0.127, // a cuenta de 2026: último día con derecho el 28-oct, pago el 2-nov [A12]
};
DATOS.vtc_pf = r2((DATOS.vtc_jun26 * DATOS.acciones_jun26 + DATOS.webster_eq - DATOS.webster_fc) / (DATOS.acciones_jun26 + DATOS.webster_acc));
export const KE = r2(DATOS.tasa_libre + DATOS.beta * DATOS.prima + CRP);
export const KE_SIN = r2(DATOS.tasa_libre + DATOS.beta * DATOS.prima);
export const KE_DAM = r2(DATOS.tasa_libre + DATOS.beta * DATOS.prima_damodaran + CRP);
export const KE_LULA = r2(DATOS.tasa_libre + DATOS.beta * DATOS.prima + CRP_LULA);
export const KE_B1 = r2(DATOS.tasa_libre + 1.0 * DATOS.prima + CRP);

// ---- Supuestos por año (año 1 = jul-2026 a jun-2027): RoTE ordinario y crecimiento del valor contable tangible por acción.
// El banco reparte ≈ 50 % (efectivo + recompras) y retiene el resto; las recompras a 1,8 veces el VTC lo diluyen algo.
const ROE_BASE = [16.0, 16.8, 17.5, 18.0, 18.0, 17.5, 17.0, 17.0, 16.5, 16.5];
const G_BASE = [7.0, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
export const ESC = {
  Bajista: { dRoe: -3.0, dG: -1.5, prob: 25, texto: 'el coste del riesgo sube (Brasil y México tras el 26-oct, consumo en EE. UU.), los tipos del BCE y del Banco de Inglaterra bajan y el RoTE se queda en el 13-15 %' },
  Base: { dRoe: 0, dG: 0, prob: 50, texto: 'RoTE ordinario del 16 % en el primer año (15,6 % en el 1S26) que sube al 17,5-18 % con las sinergias de TSB y Webster, sin llegar al >20 % del plan de 2028; luego vuelve al 16,5 %' },
  Alcista: { dRoe: 2.0, dG: 1.0, prob: 25, texto: 'se cumple el plan de 2028 (RoTE > 20 %, beneficio > 20.000 M) y el RoTE se queda en el 18-20 %' },
};

export function residual(ke, { dRoe = 0, dG = 0, vc0 = DATOS.vtc_pf } = {}) {
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
  const roeTerm = ROE_BASE[9] + dRoe;
  const riT = vc * (roeTerm - ke) / 100;
  const tv = riT / ((ke - DATOS.g_terminal) / 100);
  const vaTv = tv / (1 + ke / 100) ** 10;
  const valorJun = vc0 + va + vaTv;
  // Al 27-oct-2026: el valor de junio crece al Ke 119 días (0,326 años). Quien compra hoy (27-oct) cobra todavía el
  // dividendo a cuenta de 0,127 € (último día con derecho el 28-oct): no se resta.
  const valor = valorJun * (1 + ke / 100) ** 0.326;
  return { ke, filas, va_ri: va, vc_final: vc, roe_terminal: roeTerm, ri_terminal: riT, tv, va_tv: vaTv, valor_jun: valorJun, valor };
}

export function pvcJustificado(roe, ke, g = DATOS.g_terminal) { return (roe - g) / (ke - g); }
export function keImplicito(precio, roe = 17.0, g = DATOS.g_terminal, vc = DATOS.vtc_pf) { return g + (roe - g) / (precio / vc); }

const base = residual(KE);
const esc = Object.fromEntries(Object.entries(ESC).map(([k, e]) => [k, residual(KE, e)]));
const ponderado = Object.entries(ESC).reduce((s, [k, e]) => s + e.prob / 100 * esc[k].valor, 0);
const varSin = residual(KE_SIN), varDam = residual(KE_DAM), varLula = residual(KE_LULA), varB1 = residual(KE_B1);
const pondCon = (ke) => Object.entries(ESC).reduce((s, [k, e]) => s + e.prob / 100 * residual(ke, e).valor, 0);
let lo = 3, hi = 30;
for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (residual(m).valor > DATOS.precio) lo = m; else hi = m; }
const keMercado = (lo + hi) / 2;
const pvc = { hoy: pvcJustificado(17.0, KE), sin: pvcJustificado(17.0, KE_SIN), dam: pvcJustificado(17.0, KE_DAM) };

// ---- Oferta de canje por Santander Brasil (anunciada el 30-jul-2026): ≈ 0,4000 acciones SAN por unit tras el JCP de octubre
// (0,4056 al anunciarla) por el ≈ 10 % que no tiene: ≈ 378 M de units equivalentes → ≈ 151 M de acciones nuevas de SAN
// (hasta el 1,1 % del capital según la matriz; contraprestación de hasta 1.908 M €). Neutra en el CET1 según la matriz.
// Beneficio que se compra: los minoritarios de Brasil ≈ 10,5 % del beneficio de la filial: 2 × 1.093 M (1S26) ÷ 0,895 × 0,105.
const unitsMin = 3744 * 0.101;
const CANJE = { ratio: 0.4000, units_min: unitsMin, acciones_nuevas: unitsMin * 0.4000, pct_capital: null, beneficio_comprado: 2 * 1093 / 0.895 * 0.105 };
CANJE.pct_capital = 100 * CANJE.acciones_nuevas / 14450;
CANJE.efecto_bpa_pct = 100 * ((1 + CANJE.beneficio_comprado / 15200) / (1 + CANJE.acciones_nuevas / 14450) - 1);

export const RESULTADO = {
  precio: DATOS.precio, ke: KE, ke_sin_prima_pais: KE_SIN, ke_damodaran: KE_DAM, ke_lula: KE_LULA, ke_beta1: KE_B1, crp: CRP, crp_lula: CRP_LULA,
  vtc_pf: DATOS.vtc_pf,
  valor_base: r2(base.valor), valor_ponderado: r2(ponderado),
  valores: Object.fromEntries(Object.entries(esc).map(([k, v]) => [k, r2(v.valor)])),
  valor_sin_prima: r2(varSin.valor), valor_ponderado_sin_prima: r2(pondCon(KE_SIN)), valor_damodaran: r2(varDam.valor), valor_lula: r2(varLula.valor), valor_beta1: r2(varB1.valor),
  pvc_justificado: { hoy: r2(pvc.hoy), sin: r2(pvc.sin), damodaran: r2(pvc.dam) },
  valor_pvc: { hoy: r2(pvc.hoy * DATOS.vtc_pf), sin: r2(pvc.sin * DATOS.vtc_pf), damodaran: r2(pvc.dam * DATOS.vtc_pf) },
  pvc_mercado: r2(DATOS.precio / DATOS.vtc_pf), ke_mercado: r2(keMercado), ke_implicito_gordon: r2(keImplicito(DATOS.precio)),
  rote_menos_ke: {
    rote2025: r2(DATOS.rote_2025 - KE), rote1s26: r2(DATOS.rote_1s26 - KE), roe1s26: r2(DATOS.roe_1s26 - KE),
    rote2025_sin: r2(DATOS.rote_2025 - KE_SIN), rote1s26_sin: r2(DATOS.rote_1s26 - KE_SIN), roe1s26_sin: r2(DATOS.roe_1s26 - KE_SIN),
    rote1s26_lula: r2(DATOS.rote_1s26 - KE_LULA),
  },
  canje: { acciones_nuevas_m: Math.round(CANJE.acciones_nuevas), pct_capital: r2(CANJE.pct_capital), beneficio_comprado_m: Math.round(CANJE.beneficio_comprado), efecto_bpa_pct: r2(CANJE.efecto_bpa_pct) },
  sens: { mas1: r2(residual(KE + 1).valor), menos1: r2(residual(KE - 1).valor) },
};

// ---- Markdown
const P = DATOS.precio;
const pct = (v) => n(100 * (v / P - 1), 1);
const L = [];
L.push('# Banco Santander: valoración bancaria (exceso de rentabilidad sobre el valor tangible, P/VTC justificado y Ke con prima por país)', '');
L.push(`Corte 27-oct-2026. Línea de compra: **SAN en la Bolsa de Madrid (EUR)**; también ADS SAN en la NYSE (1 ADS = 1 acción). Precio ${n(P, 3)} €, cierre del 26-oct-2026 (−3,1 %). Base: **resultado y RoTE ordinarios** (sin la plusvalía de Polonia ni los costes de TSB) del Informe Financiero del 2T26, los que sigue el mercado. El 3T26 se publica mañana, 28-oct, antes de la apertura: este cálculo usa el 2T26/1S26. Generado por \`notas/valoracion-banco.mjs\`.`, '');
L.push('## Por qué este modelo y no el DCF de EBITDA', '');
L.push('En un banco la deuda (depósitos, emisiones) es la materia prima: no hay EBITDA, capital invertido ni valor empresa con sentido. Valor para el accionista = valor contable tangible + valor actual de lo que el banco gane **por encima** de su coste del capital propio (Ke): VTC₀ + Σ (RoTEₜ − Ke) × VTCₜ₋₁ / (1 + Ke)ᵗ + terminal. Contraste: P/VTC justificado (RoTE − g) / (Ke − g). Mismo método que Itaú, BTG y Santander Brasil (27-oct). Se usa el valor **tangible** porque es el que publica el banco por acción y el que usa el mercado; el fondo de comercio de las compras (TSB, Webster) queda fuera del capital: por eso la calidad se da también con el RoE, que sí lo incluye.', '');
L.push('## Valor contable tangible por acción de partida (30-jun-2026, con Webster)', '');
L.push(`TNAV por acción del 2T26: ${n(DATOS.vtc_jun26)} € con ${n(DATOS.acciones_jun26, 0)} M de acciones. Webster se cerró el 20-ago-2026 (después del 2T26): ${n(DATOS.webster_acc, 1)} M de acciones nuevas a 10,7896 € (${n(DATOS.webster_eq, 0)} M €) más 48,75 USD por acción en efectivo; el valor contable tangible de Webster era de 38,81 USD por acción (162,0 M de acciones). Fondo de comercio e intangibles nuevos ≈ ${n(DATOS.webster_fc, 0)} M € (estimación propia, sin los ajustes de valor razonable de la compra). **VTC por acción pro forma: ${n(DATOS.vtc_pf)} €** (−${n(DATOS.vtc_jun26 - DATOS.vtc_pf)} €). La propia matriz estima que Webster resta ≈ 150 puntos básicos de CET1.`, '');
L.push('## Coste del capital propio en euros', '');
L.push('| Concepto | Hoy | Sin prima país | Prima de mercado de Damodaran | Brasil con la subida del 26-oct |', '|---|---|---|---|---|');
L.push(`| Tasa libre: Bund a 10 años (Bundesbank, 26-oct-2026) | ${n(DATOS.tasa_libre)} % | ${n(DATOS.tasa_libre)} % | ${n(DATOS.tasa_libre)} % | ${n(DATOS.tasa_libre)} % |`);
L.push(`| Beta (medida: mensual a 5 años frente al STOXX 600, bolsa.mjs) | ${n(DATOS.beta)} | ${n(DATOS.beta)} | ${n(DATOS.beta)} | ${n(DATOS.beta)} |`);
L.push(`| Prima de mercado | ${n(DATOS.prima, 1)} % | ${n(DATOS.prima, 1)} % | ${n(DATOS.prima_damodaran, 1)} % | ${n(DATOS.prima, 1)} % |`);
L.push(`| Prima por riesgo país ponderada (\`prima_adicional_pct\`) | ${n(CRP)} % | 0 | ${n(CRP)} % | ${n(CRP_LULA)} % |`);
L.push(`| **Ke** | **${n(KE)} %** | **${n(KE_SIN)} %** | **${n(KE_DAM)} %** | **${n(KE_LULA)} %** |`, '');
L.push('La tasa libre en euros es el Bund, no el bono español (la sede no es dónde gana el dinero). El riesgo país va aparte, ponderado por el peso de cada país en el beneficio ordinario del 1S26, con la prima por país de Damodaran (actualización de enero de 2026, método por calificación soberana):', '');
L.push('| País o negocio | Beneficio ordinario 1S26 (M €) | Peso | Prima país (Damodaran) | Aportación |', '|---|---|---|---|---|');
for (const p of PAISES) L.push(`| ${p.pais}${p.nota ? ` (${p.nota})` : ''} | ${n(p.bn, 0)} | ${n(p.peso, 1)} % | ${n(p.crp)} % | ${n(p.peso / 100 * p.crp)} |`);
L.push(`| **Total (sin el centro corporativo, −525 M)** | **${n(TOT, 0)}** | 100 % | | **${n(CRP)} %** |`, '');
L.push(`Brasil pesa el ${n(pesoBR, 1)} % del beneficio ordinario de los países en el 1S26 (cálculo propio con los segmentos secundarios; el encargo cita el 14,9 % del 1S26 y el 15,4 % de 2025, probablemente sobre otra base). Argentina pesa poco (2,5 %) pero, con una prima del 9,7 %, aporta casi tanto como México. España aporta 0,5 puntos con una prima de 1,55 (calificación A3); con la prima por CDS de Damodaran (0,47 %) la ponderada bajaría ≈ 0,4 puntos.`, '');
L.push('## Calidad: RoTE (y RoE) ordinario − Ke (equivalente de ROIC − WACC)', '');
L.push(`| Rentabilidad ordinaria | Valor | − Ke hoy (${n(KE)} %) | − Ke sin prima país (${n(KE_SIN)} %) |`, '|---|---|---|---|');
L.push(`| RoTE ordinario 2025 (reexpresado sin Polonia) | ${n(DATOS.rote_2025, 1)} % | ${n(RESULTADO.rote_menos_ke.rote2025)} | ${n(RESULTADO.rote_menos_ke.rote2025_sin)} |`);
L.push(`| RoTE ordinario 1S26 (16,0 % en el 2T26) | ${n(DATOS.rote_1s26, 1)} % | ${n(RESULTADO.rote_menos_ke.rote1s26)} | ${n(RESULTADO.rote_menos_ke.rote1s26_sin)} |`);
L.push(`| RoE ordinario 1S26 (con el fondo de comercio) | ${n(DATOS.roe_1s26, 1)} % | ${n(RESULTADO.rote_menos_ke.roe1s26)} | ${n(RESULTADO.rote_menos_ke.roe1s26_sin)} |`, '');
L.push(`Regla del método: nunca por debajo de 4,5 puntos; ≥ 5 para comprar (A y B1), 4,5-5 solo B2/C. **Con el Ke de hoy (prima país incluida) Banco Santander queda entre ${n(RESULTADO.rote_menos_ke.rote2025)} y ${n(RESULTADO.rote_menos_ke.rote1s26)} puntos con el RoTE: no pasa el suelo de 4,5 y no es comprable en ningún nivel.** Sin la prima país pasaría (${n(RESULTADO.rote_menos_ke.rote1s26_sin)} en el 1S26, ${n(RESULTADO.rote_menos_ke.rote2025_sin)} en 2025): la conclusión de calidad depende de esa prima, y la mantenemos porque el banco gana el 40 % de su beneficio en América Latina. Con el RoE (que incluye el fondo de comercio pagado por TSB, Webster y compras anteriores) no pasa en ningún caso. Con la prima de Brasil subida como su bono el 26-oct, el exceso baja a ${n(RESULTADO.rote_menos_ke.rote1s26_lula)}. El plan de 2028 (RoTE > 20 %) sí pasaría con holgura si se cumple.`, '');
L.push('## Supuestos del caso base (año 1 = jul-2026 a jun-2027)', '');
L.push('| Año | VTC inicial (€) | RoTE % | Exceso (RoTE − Ke) × VTC | Factor de descuento | VA del exceso | BPA implícito | Reparto implícito | Crecimiento del VTC % |', '|---|---|---|---|---|---|---|---|---|');
for (const f of base.filas) L.push(`| ${f.anio} | ${n(f.vc_ini)} | ${n(f.roe, 1)} | ${n(f.ri, 3)} | ${n(f.fd, 3)} | ${n(f.va_ri, 3)} | ${n(f.bpa, 3)} | ${n(f.dividendo, 3)} | ${n(f.g, 1)} |`);
L.push('', `Terminal: VTC del año 10 ${n(base.vc_final)} €, RoTE ${n(base.roe_terminal, 1)} %, exceso ${n(base.ri_terminal, 3)} €, crecimiento ${n(DATOS.g_terminal, 1)} % → valor terminal ${n(base.tv)} €, VA ${n(base.va_tv)} €.`, '');
L.push(`**Valor a 30-jun-2026: ${n(DATOS.vtc_pf)} (VTC pro forma) + ${n(base.va_ri)} (VA de los excesos de 10 años) + ${n(base.va_tv)} (terminal) = ${n(base.valor_jun)} €; llevado al 27-oct-2026 (con el dividendo a cuenta de 0,127 € aún dentro): ${n(base.valor)} € por acción**, frente a ${n(P, 3)} € de precio (${pct(base.valor)} %).`, '');
L.push('## Escenarios (Ke de hoy)', '');
L.push('| Escenario | Prob. | Supuesto | Valor (€ por acción) | Frente al precio |', '|---|---|---|---|---|');
for (const [k, e] of Object.entries(ESC)) L.push(`| ${k} | ${e.prob} % | ${e.texto} | ${n(esc[k].valor)} | ${pct(esc[k].valor)} % |`);
L.push(`| **Ponderado** | | | **${n(ponderado)}** | **${pct(ponderado)} %** |`, '');
L.push('## Sensibilidad al coste del capital', '');
L.push('| Ke | Valor caso base (€) | P/VTC justificado (RoTE 17 %, g 3 %) | Valor por P/VTC (€) |', '|---|---|---|---|');
L.push(`| Hoy ${n(KE)} % | ${n(base.valor)} | ${n(pvc.hoy)}x | ${n(pvc.hoy * DATOS.vtc_pf)} |`);
L.push(`| Sin prima país ${n(KE_SIN)} % | ${n(varSin.valor)} (ponderado ${n(RESULTADO.valor_ponderado_sin_prima)}) | ${n(pvc.sin)}x | ${n(pvc.sin * DATOS.vtc_pf)} |`);
L.push(`| Prima de Damodaran ${n(KE_DAM)} % | ${n(varDam.valor)} | ${n(pvc.dam)}x | ${n(pvc.dam * DATOS.vtc_pf)} |`);
L.push(`| Beta 1,0 ${n(KE_B1)} % | ${n(varB1.valor)} | ${n(pvcJustificado(17, KE_B1))}x | ${n(pvcJustificado(17, KE_B1) * DATOS.vtc_pf)} |`);
L.push(`| Brasil tras el 26-oct ${n(KE_LULA)} % | ${n(varLula.valor)} | ${n(pvcJustificado(17, KE_LULA))}x | ${n(pvcJustificado(17, KE_LULA) * DATOS.vtc_pf)} |`);
L.push(`| Ke + 1 punto (${n(KE + 1)} %) | ${n(RESULTADO.sens.mas1)} | ${n(pvcJustificado(17, KE + 1))}x | ${n(pvcJustificado(17, KE + 1) * DATOS.vtc_pf)} |`);
L.push(`| Ke − 1 punto (${n(KE - 1)} %) | ${n(RESULTADO.sens.menos1)} | ${n(pvcJustificado(17, KE - 1))}x | ${n(pvcJustificado(17, KE - 1) * DATOS.vtc_pf)} |`);
L.push('', `**Qué descuenta el precio.** A ${n(P, 3)} € la acción cotiza a ${n(RESULTADO.pvc_mercado)} veces su VTC pro forma (1,76 veces el de junio sin Webster; el banco publicaba 1,91 veces a 12,084 € el 30-jun). Con el caso base de RoTE, el Ke que iguala el valor al precio es ${n(keMercado)} %; con Gordon (RoTE 17 %, g 3 %), ${n(RESULTADO.ke_implicito_gordon)} %: el mercado le pone un coste del capital de ≈ ${n(keMercado, 1)} %, entre el Ke sin prima país (${n(KE_SIN)} %) y el nuestro (${n(KE)} %). Dicho de otro modo: el precio ya da por buena la mitad del camino al plan de 2028 o no cobra la prima por América Latina.`, '');
L.push('## La oferta de canje por Santander Brasil (efecto en el grupo)', '');
L.push(`Banco Santander anunció el 30-jul-2026 una oferta voluntaria de canje por el ≈ 10 % de Santander Brasil que no tiene: 0,4056 acciones nuevas de SAN por unit o ADR (≈ 0,4000 tras el JCP de octubre, estimación del informe de Santander Brasil), sin aceptación mínima, con una contraprestación de hasta 1.908 M € y **hasta el 1,1 % del capital** de SAN; neutra en el CET1 según la matriz. Registrada en la CVM, B3 y SEC (Form F-4) el 21-sep-2026; cierre esperado en el 1S27.`, '');
L.push('| Concepto | Valor |', '|---|---|');
L.push(`| Units de minoritarios (10,1 % de 3.744 M) | ${n(CANJE.units_min, 0)} M |`);
L.push(`| Acciones nuevas de SAN con aceptación total (× 0,4000) | **${n(CANJE.acciones_nuevas, 0)} M (${n(CANJE.pct_capital)} % de las ≈ 14.450 M en circulación)** |`);
L.push(`| Beneficio ordinario que pasa al grupo (≈ 10,5 % del de la filial, con el 1S26 anualizado) | ≈ ${n(CANJE.beneficio_comprado, 0)} M € al año |`);
L.push(`| Efecto en el BPA (sobre un beneficio de ≈ 15.200 M en 2026e) | **+${n(CANJE.efecto_bpa_pct)} %** |`);
L.push('| Efecto en el CET1 | Neutro según la matriz (paga con acciones; los minoritarios de Brasil ya restaban poco capital) |', '');
L.push(`Lectura: SAN emite papel a ≈ 1,8 veces su VTC para comprar una filial que cotiza a ≈ 1,0 vez su valor contable: es acrecitiva en BPA (pequeña) y sube la exposición a Brasil del 89,5 % al ≈ 100 %, justo cuando el riesgo país brasileño sube. Si la aceptación es parcial, el efecto es proporcional. No cambia la valoración de forma material.`, '');
L.push('## Contraste con el DCF del motor', '');
L.push('Igual que en los bancos brasileños: «ingresos» = margen bruto NIIF menos pérdidas por deterioro de activos financieros; «margen EBITDA» calibrado para que el beneficio después de impuestos sea RoTE ordinario × patrimonio tangible; «capex» = retención para que el capital crezca con el balance; amortización y circulante 0; deuda, caja y minoritarios 0; WACC = Ke. Es un descuento de dividendos y debe acercarse al modelo de exceso de rentabilidad. Peso 0 en la síntesis: el valor intrínseco es el ponderado del modelo bancario, que entra como «suma de partes» al 100 %.', '');
L.push('## Sensibilidad a los tipos de interés', '');
L.push('| Canal | Efecto | Lectura |', '|---|---|---|');
L.push(`| Ke (tasa libre + 1 punto) | valor base de ${n(base.valor)} a ${n(RESULTADO.sens.mas1)} € | Cada punto de Ke quita ≈ ${n(100 * (1 - RESULTADO.sens.mas1 / base.valor), 0)} % del valor |`);
L.push('| Margen de intereses | Más del 95 % de los ingresos ligados a la actividad con clientes; margen de intereses +7 % en el 1S26 con los tipos del BCE ya bajados, gracias a volúmenes (TSB) y a la gestión del balance; cartera de renta fija de 165.000 M con una duración de 1,9 años en la de disponible para la venta | La bajada de tipos en Europa ya pasó; en Brasil y México los tipos altos suben el margen pero también el coste del riesgo |');
L.push('| Coste del riesgo | 1,15 % del crédito (12 meses); Brasil 4,14 %, Argentina 11,1 %, México 2,74 %, España 0,41 % | Un punto más de coste del riesgo en Brasil (100.000 M de crédito) resta ≈ 1.000 M antes de impuestos, ≈ 4 % del beneficio del grupo |', '');
fs.writeFileSync(path.join(dir, '..', 'valoracion-banco.md'), L.join('\n') + '\n', 'utf8');
if (process.argv[1] && process.argv[1].endsWith('valoracion-banco.mjs')) console.log(JSON.stringify(RESULTADO, null, 1));

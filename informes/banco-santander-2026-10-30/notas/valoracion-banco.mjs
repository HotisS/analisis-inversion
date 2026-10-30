// Valoración bancaria de Banco Santander (SAN en la Bolsa de Madrid, corte 30-oct-2026): modelo de exceso de rentabilidad
// (residual income) sobre el valor contable TANGIBLE por acción, P/VTC justificado, Ke en euros con prima por país ponderada
// y efecto de la oferta de canje por Santander Brasil. Escribe informes/banco-santander-2026-10-30/valoracion-banco.md y
// exporta el resultado para propio.mjs y supuestos.mjs.
// Base: resultado ordinario («underlying») y RoTE ordinario del Informe Financiero del 3T26 (28-oct-2026; el que sigue el mercado).
// Iteración 2: la anterior (27-oct) usaba el 1S26 y un VTC pro forma con Webster estimado; ahora el VTC de sep-2026 es real.
// Ejecutar: node informes/banco-santander-2026-10-30/notas/valoracion-banco.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const r2 = (x) => Math.round(x * 100) / 100;
const n = (x, d = 2) => (x === null || x === undefined ? 'n.d.' : x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));

// ---- Peso de cada país en el beneficio ordinario de 9M26 (segmentos secundarios, sin el centro corporativo) [A1] y prima
// por riesgo país de Damodaran (actualización de ene-2026, método por calificación: diferencial de impago × 1,52) [D5].
export const PAISES = [
  { pais: 'España', bn: 3695, crp: 1.55 },
  { pais: 'Reino Unido', bn: 1282, crp: 0.78 },
  { pais: 'Portugal', bn: 712, crp: 1.55 },
  { pais: 'Openbank Europa (Alemania, España, Francia, Italia, nórdicos…)', bn: 516, crp: 1.0, nota: 'estimación: media de la zona euro donde opera' },
  { pais: 'Estados Unidos', bn: 1514, crp: 0.23 },
  { pais: 'México', bn: 1402, crp: 2.46 },
  { pais: 'Brasil', bn: 1596, crp: 3.24 },
  { pais: 'Chile', bn: 648, crp: 1.10 },
  { pais: 'Argentina', bn: 341, crp: 9.71 },
  { pais: 'Resto del grupo', bn: 335, crp: 1.5, nota: 'estimación' },
];
const TOT = PAISES.reduce((s, p) => s + p.bn, 0);
for (const p of PAISES) p.peso = 100 * p.bn / TOT;
export const CRP = r2(PAISES.reduce((s, p) => s + p.peso / 100 * p.crp, 0));
// Brasil tras el 26-oct: el bono a 10 años en reales subió 2,46 puntos (12,98 → 15,44 %); con la misma subida en su prima,
// la ponderada sube ≈ 0,34 puntos.
const pesoBR = PAISES.find((p) => p.pais === 'Brasil').peso;
export const CRP_LULA = r2(CRP + pesoBR / 100 * 2.46);

export const DATOS = {
  vtc_jun26: 6.32, acciones_jun26: 14689, // TNAV por acción 6,32 € y 14.689 M de acciones a 30-jun-2026 (iteración anterior)
  vtc_sep26: 5.92, acciones_sep26: 14556, // TNAV por acción publicado a 30-sep-2026, ya con Webster y neto del dividendo a cuenta [A1]
  acciones_hoy: 14406, // 14.556 M − 150,6 M de la recompra de 1.825 M terminada el 28-oct (a amortizar) [A6]
  // Webster (cerrada el 20-ago-2026): 329,8 M de acciones nuevas a 10,7896 € (3.559 M €) + 48,75 USD × 162,0 M de acciones
  // de Webster en efectivo (7.899 M USD = 7.089 M € a 1,1143); valor contable tangible de Webster 38,81 USD × 162,0 M =
  // 6.288 M USD = 5.643 M €. Fondo de comercio e intangibles nuevos ≈ 3.559 + 7.089 − 5.643 = 5.005 M € (sin ajustes de
  // valor razonable, estimación propia).
  webster_acc: 329.846, webster_eq: 3559, webster_fc: 5005,
  roe_2025: 13.0, rote_2025: 15.2, rote_1s26: 15.6, rote_9m26: 16.0, rote_3t26: 16.8, roe_9m26: 13.7, cet1: 12.7,
  precio: 10.512, // SAN en Madrid, cierre del 29-oct-2026 (ya sin el dividendo a cuenta: ex el 29-oct)
  tasa_libre: 3.42, beta: 1.20, prima: 5.5, prima_damodaran: 4.2,
  g_terminal: 3.0, // nominal en euros: inflación del BCE (2 %) + 1 real; el negocio en divisas emergentes se convierte a euros
  dividendo_oct: 0.127, // a cuenta de 2026: último día con derecho el 28-oct, ex el 29-oct, pago el 2-nov [A10]
};
// Pro forma que estimaba la iteración del 27-oct (jun-2026 + Webster): se guarda para comparar con el dato real de sep-2026.
DATOS.vtc_pf_anterior = r2((DATOS.vtc_jun26 * DATOS.acciones_jun26 + DATOS.webster_eq - DATOS.webster_fc) / (DATOS.acciones_jun26 + DATOS.webster_acc));
DATOS.vtc_pf = DATOS.vtc_sep26;
export const KE = r2(DATOS.tasa_libre + DATOS.beta * DATOS.prima + CRP);
export const KE_SIN = r2(DATOS.tasa_libre + DATOS.beta * DATOS.prima);
export const KE_DAM = r2(DATOS.tasa_libre + DATOS.beta * DATOS.prima_damodaran + CRP);
export const KE_LULA = r2(DATOS.tasa_libre + DATOS.beta * DATOS.prima + CRP_LULA);
export const KE_B1 = r2(DATOS.tasa_libre + 1.0 * DATOS.prima + CRP);

// ---- Supuestos por año (año 1 = oct-2026 a sep-2027): RoTE ordinario y crecimiento del valor contable tangible por acción.
// El banco reparte ≈ 50 % (efectivo + recompras) y retiene el resto; las recompras a 1,8 veces el VTC lo diluyen algo.
// Iteración 2: el año 1 sube del 16,0 al 16,5 % y el 2 del 16,8 al 17,0 % (RoTE ordinario del 16,8 % en el 3T26 y 16,0 % en 9M26).
const ROE_BASE = [16.5, 17.0, 17.5, 18.0, 18.0, 17.5, 17.0, 17.0, 16.5, 16.5];
const G_BASE = [7.0, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
export const ESC = {
  Bajista: { dRoe: -3.0, dG: -1.5, prob: 25, texto: 'el coste del riesgo sube (Brasil y México tras el 26-oct, consumo en EE. UU.), los tipos del BCE y del Banco de Inglaterra bajan y el RoTE se queda en el 13-15 %' },
  Base: { dRoe: 0, dG: 0, prob: 50, texto: 'RoTE ordinario del 16,5 % en el primer año (16,0 % en 9M26 y 16,8 % en el 3T26) que sube al 17,5-18 % con las sinergias de TSB y Webster, sin llegar al >20 % del plan de 2028; luego vuelve al 16,5 %' },
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
  // Al 29-oct-2026 (fecha del precio): el valor de 30-sep crece al Ke 29 días (0,079 años). El VTC de septiembre ya es neto
  // del dividendo a cuenta de 0,127 € y el precio del 29-oct ya cotiza sin él: no hay que ajustar nada.
  const valor = valorJun * (1 + ke / 100) ** 0.079;
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
const CANJE = { ratio: 0.4000, units_min: unitsMin, acciones_nuevas: unitsMin * 0.4000, pct_capital: null, beneficio_comprado: 4 / 3 * 1596 / 0.895 * 0.105 };
CANJE.pct_capital = 100 * CANJE.acciones_nuevas / DATOS.acciones_hoy;
CANJE.efecto_bpa_pct = 100 * ((1 + CANJE.beneficio_comprado / 15200) / (1 + CANJE.acciones_nuevas / DATOS.acciones_hoy) - 1);

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
    rote2025: r2(DATOS.rote_2025 - KE), rote9m26: r2(DATOS.rote_9m26 - KE), rote3t26: r2(DATOS.rote_3t26 - KE), roe9m26: r2(DATOS.roe_9m26 - KE),
    rote2025_sin: r2(DATOS.rote_2025 - KE_SIN), rote9m26_sin: r2(DATOS.rote_9m26 - KE_SIN), roe9m26_sin: r2(DATOS.roe_9m26 - KE_SIN),
    rote9m26_lula: r2(DATOS.rote_9m26 - KE_LULA), rote9m26_beta124: r2(DATOS.rote_9m26 - r2(DATOS.tasa_libre + 1.24 * DATOS.prima + CRP)),
  },

  canje: { acciones_nuevas_m: Math.round(CANJE.acciones_nuevas), pct_capital: r2(CANJE.pct_capital), beneficio_comprado_m: Math.round(CANJE.beneficio_comprado), efecto_bpa_pct: r2(CANJE.efecto_bpa_pct) },
  sens: { mas1: r2(residual(KE + 1).valor), menos1: r2(residual(KE - 1).valor) },
};

// ---- Markdown
const P = DATOS.precio;
const pct = (v) => n(100 * (v / P - 1), 1);
const L = [];
L.push('# Banco Santander: valoración bancaria (exceso de rentabilidad sobre el valor tangible, P/VTC justificado y Ke con prima por país)', '');
L.push(`Corte 30-oct-2026 (iteración 2; la anterior es del 27-oct, antes del 3T26). Línea de compra: **SAN en la Bolsa de Madrid (EUR)**; también ADS SAN en la NYSE (1 ADS = 1 acción). Precio ${n(P, 3)} €, cierre del 29-oct-2026, ya sin el dividendo a cuenta (ex el 29-oct); la sesión del 30-oct sigue abierta (≈ 10,2 €). Base: **resultado y RoTE ordinarios** (sin la plusvalía de Polonia ni los costes de integración de TSB y Webster) del Informe Financiero del 3T26 (28-oct-2026), los que sigue el mercado. Generado por \`notas/valoracion-banco.mjs\`.`, '');
L.push('## Qué cambia frente al 27-oct', '');
L.push(`| Dato | 27-oct (1S26) | 30-oct (9M26) |`, '|---|---|---|');
L.push(`| Precio | 11,154 € (26-oct, con el dividendo de 0,127 € dentro) | ${n(P, 3)} € (29-oct, sin él) |`);
L.push(`| VTC por acción de partida | ${n(DATOS.vtc_pf_anterior)} € (jun-2026 + Webster, estimado) | **${n(DATOS.vtc_sep26)} € (sep-2026, publicado, ya neto del dividendo a cuenta)** |`);
L.push(`| RoTE ordinario | 15,6 % (1S26) | 16,0 % (9M26); 16,8 % en el 3T26 |`);
L.push(`| CET1 | 14,0 % (jun, antes de Webster) | 12,7 % (sep; −147 p.b. por Webster) |`);
L.push(`| Tasa libre y beta | Bund 3,43 %, beta 1,24 | Bund ${n(DATOS.tasa_libre)} % (29-oct), beta ${n(DATOS.beta)} (bolsa.mjs) |`);
L.push(`| Prima país ponderada | 1,81 % (pesos del 1S26) | ${n(CRP)} % (pesos de 9M26) |`, '');
L.push('## Por qué este modelo y no el DCF de EBITDA', '');
L.push('En un banco la deuda (depósitos, emisiones) es la materia prima: no hay EBITDA, capital invertido ni valor empresa con sentido. Valor para el accionista = valor contable tangible + valor actual de lo que el banco gane **por encima** de su coste del capital propio (Ke): VTC₀ + Σ (RoTEₜ − Ke) × VTCₜ₋₁ / (1 + Ke)ᵗ + terminal. Contraste: P/VTC justificado (RoTE − g) / (Ke − g). Mismo método que Itaú, BTG y Santander Brasil (27-oct). Se usa el valor **tangible** porque es el que publica el banco por acción y el que usa el mercado; el fondo de comercio de las compras (TSB, Webster) queda fuera del capital: por eso la calidad se da también con el RoE, que sí lo incluye.', '');
L.push('## Valor contable tangible por acción de partida (30-sep-2026)', '');
L.push(`TNAV por acción del 3T26: **${n(DATOS.vtc_sep26)} €** (6,32 € en junio; −6 % en el trimestre por Webster, cerrada el 20-ago con 329,8 M de acciones nuevas y 7.089 M € en efectivo), con ${n(DATOS.acciones_sep26, 0)} M de acciones. Con los dividendos en efectivo, +11 % interanual. La iteración anterior lo estimaba en ${n(DATOS.vtc_pf_anterior)} € pro forma: el dato real es ${n(DATOS.vtc_pf_anterior - DATOS.vtc_sep26)} € más bajo (el dividendo a cuenta de 0,127 € ya restado, más fondo de comercio de Webster del estimado y la recompra a ≈ 2 veces el VTC). Acciones hoy: ${n(DATOS.acciones_hoy, 0)} M (se restan las 150,6 M de la recompra de 1.825 M terminada el 28-oct).`, '');
L.push('## Coste del capital propio en euros', '');
L.push('| Concepto | Hoy | Sin prima país | Prima de mercado de Damodaran | Brasil con la subida del 26-oct |', '|---|---|---|---|---|');
L.push(`| Tasa libre: Bund a 10 años (Bundesbank, 29-oct-2026) | ${n(DATOS.tasa_libre)} % | ${n(DATOS.tasa_libre)} % | ${n(DATOS.tasa_libre)} % | ${n(DATOS.tasa_libre)} % |`);
L.push(`| Beta (medida: mensual a 5 años frente al STOXX 600, bolsa.mjs) | ${n(DATOS.beta)} | ${n(DATOS.beta)} | ${n(DATOS.beta)} | ${n(DATOS.beta)} |`);
L.push(`| Prima de mercado | ${n(DATOS.prima, 1)} % | ${n(DATOS.prima, 1)} % | ${n(DATOS.prima_damodaran, 1)} % | ${n(DATOS.prima, 1)} % |`);
L.push(`| Prima por riesgo país ponderada (\`prima_adicional_pct\`) | ${n(CRP)} % | 0 | ${n(CRP)} % | ${n(CRP_LULA)} % |`);
L.push(`| **Ke** | **${n(KE)} %** | **${n(KE_SIN)} %** | **${n(KE_DAM)} %** | **${n(KE_LULA)} %** |`, '');
L.push('La tasa libre en euros es el Bund, no el bono español (la sede no es dónde gana el dinero). El riesgo país va aparte, ponderado por el peso de cada país en el beneficio ordinario de 9M26, con la prima por país de Damodaran (actualización de enero de 2026, método por calificación soberana):', '');
L.push('| País o negocio | Beneficio ordinario 9M26 (M €) | Peso | Prima país (Damodaran) | Aportación |', '|---|---|---|---|---|');
for (const p of PAISES) L.push(`| ${p.pais}${p.nota ? ` (${p.nota})` : ''} | ${n(p.bn, 0)} | ${n(p.peso, 1)} % | ${n(p.crp)} % | ${n(p.peso / 100 * p.crp)} |`);
L.push(`| **Total (sin el centro corporativo, −865 M)** | **${n(TOT, 0)}** | 100 % | | **${n(CRP)} %** |`, '');
L.push(`Brasil pesa el ${n(pesoBR, 1)} % del beneficio ordinario de los países en 9M26 (13,9 % en el 1S26). Argentina pesa poco (${n(PAISES.find((p) => p.pais === 'Argentina').peso, 1)} %) pero, con una prima del 9,7 %, aporta casi tanto como México. España aporta ≈ 0,5 puntos con una prima de 1,55 (calificación A3); con la prima por CDS de Damodaran (0,47 %) la ponderada bajaría ≈ 0,3 puntos.`, '');
L.push('## Calidad: RoTE (y RoE) ordinario − Ke (equivalente de ROIC − WACC)', '');
L.push(`| Rentabilidad ordinaria | Valor | − Ke hoy (${n(KE)} %) | − Ke sin prima país (${n(KE_SIN)} %) |`, '|---|---|---|---|');
L.push(`| RoTE ordinario 2025 (reexpresado sin Polonia) | ${n(DATOS.rote_2025, 1)} % | ${n(RESULTADO.rote_menos_ke.rote2025)} | ${n(RESULTADO.rote_menos_ke.rote2025_sin)} |`);
L.push(`| **RoTE ordinario 9M26** | **${n(DATOS.rote_9m26, 1)} %** | **${n(RESULTADO.rote_menos_ke.rote9m26)}** | ${n(RESULTADO.rote_menos_ke.rote9m26_sin)} |`);
L.push(`| RoTE ordinario del 3T26 (un trimestre) | ${n(DATOS.rote_3t26, 1)} % | ${n(RESULTADO.rote_menos_ke.rote3t26)} | ${n(DATOS.rote_3t26 - KE_SIN)} |`);
L.push(`| RoE ordinario 9M26 (con el fondo de comercio) | ${n(DATOS.roe_9m26, 1)} % | ${n(RESULTADO.rote_menos_ke.roe9m26)} | ${n(RESULTADO.rote_menos_ke.roe9m26_sin)} |`, '');
L.push(`Regla del método: nunca por debajo de 4,5 puntos; ≥ 5 para comprar (A y B1), 4,5-5 solo B2/C. **Con el Ke de hoy (prima país incluida) Banco Santander queda en ${n(RESULTADO.rote_menos_ke.rote9m26)} puntos con el RoTE de 9M26 (${n(RESULTADO.rote_menos_ke.rote2025)} en 2025): mejora frente al 27-oct (3,5), pero sigue sin pasar el suelo de 4,5 y no es comprable en ningún nivel.** Solo el 3T26 aislado (16,8 %) daría ${n(RESULTADO.rote_menos_ke.rote3t26)}: un trimestre no basta; si el 4T26 repite ese nivel, el año cerraría en ≈ 16,2 % (≈ ${n(16.2 - KE)} puntos), aún por debajo. Con la beta anterior (1,24) el exceso sería ${n(RESULTADO.rote_menos_ke.rote9m26_beta124)}. Sin la prima país pasaría (${n(RESULTADO.rote_menos_ke.rote9m26_sin)}): la conclusión de calidad depende de esa prima, y la mantenemos porque el banco gana ≈ 34 % de su beneficio en América Latina. Con el RoE no pasa en ningún caso. Con la prima de Brasil subida como su bono el 26-oct, el exceso baja a ${n(RESULTADO.rote_menos_ke.rote9m26_lula)}. Pasaría con un RoTE ordinario anual de ≈ ${n(KE + 4.5, 1)} %: el plan de 2028 (> 20 %) lo daría con holgura si se cumple.`, '');
L.push('## Supuestos del caso base (año 1 = oct-2026 a sep-2027)', '');
L.push('| Año | VTC inicial (€) | RoTE % | Exceso (RoTE − Ke) × VTC | Factor de descuento | VA del exceso | BPA implícito | Reparto implícito | Crecimiento del VTC % |', '|---|---|---|---|---|---|---|---|---|');
for (const f of base.filas) L.push(`| ${f.anio} | ${n(f.vc_ini)} | ${n(f.roe, 1)} | ${n(f.ri, 3)} | ${n(f.fd, 3)} | ${n(f.va_ri, 3)} | ${n(f.bpa, 3)} | ${n(f.dividendo, 3)} | ${n(f.g, 1)} |`);
L.push('', `Terminal: VTC del año 10 ${n(base.vc_final)} €, RoTE ${n(base.roe_terminal, 1)} %, exceso ${n(base.ri_terminal, 3)} €, crecimiento ${n(DATOS.g_terminal, 1)} % → valor terminal ${n(base.tv)} €, VA ${n(base.va_tv)} €.`, '');
L.push(`**Valor a 30-sep-2026: ${n(DATOS.vtc_pf)} (VTC) + ${n(base.va_ri)} (VA de los excesos de 10 años) + ${n(base.va_tv)} (terminal) = ${n(base.valor_jun)} €; llevado al 29-oct-2026: ${n(base.valor)} € por acción**, frente a ${n(P, 3)} € de precio (${pct(base.valor)} %).`, '');
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
L.push('', `**Qué descuenta el precio.** A ${n(P, 3)} € la acción cotiza a ${n(RESULTADO.pvc_mercado)} veces su VTC de septiembre (el banco publicaba 2,08 veces a 12,328 € el 30-sep). Con el caso base de RoTE, el Ke que iguala el valor al precio es ${n(keMercado)} %; con Gordon (RoTE 17 %, g 3 %), ${n(RESULTADO.ke_implicito_gordon)} %: el mercado le pone un coste del capital de ≈ ${n(keMercado, 1)} %, entre el Ke sin prima país (${n(KE_SIN)} %) y el nuestro (${n(KE)} %).`, '');
L.push('## La oferta de canje por Santander Brasil (efecto en el grupo)', '');
L.push(`Banco Santander anunció el 30-jul-2026 una oferta voluntaria de canje por el ≈ 10 % de Santander Brasil que no tiene: 0,4056 acciones nuevas de SAN por unit o ADR (≈ 0,4000 tras el JCP de octubre, estimación del informe de Santander Brasil), sin aceptación mínima, con una contraprestación de hasta 1.908 M € y **hasta el 1,1 % del capital** de SAN; neutra en el CET1 según la matriz. Registrada en la CVM, B3 y SEC (Form F-4) el 21-sep-2026; necesita la aprobación de la junta de SAN para la ampliación; cierre esperado en el 1S27.`, '');
L.push('| Concepto | Valor |', '|---|---|');
L.push(`| Units de minoritarios (10,1 % de 3.744 M) | ${n(CANJE.units_min, 0)} M |`);
L.push(`| Acciones nuevas de SAN con aceptación total (× 0,4000) | **${n(CANJE.acciones_nuevas, 0)} M (${n(CANJE.pct_capital)} % de las ${n(DATOS.acciones_hoy, 0)} M en circulación)** |`);
L.push(`| Beneficio ordinario que pasa al grupo (≈ 10,5 % del de la filial, con 9M26 anualizado) | ≈ ${n(CANJE.beneficio_comprado, 0)} M € al año |`);
L.push(`| Efecto en el BPA (sobre un beneficio de ≈ 15.200 M en 2026e) | **+${n(CANJE.efecto_bpa_pct)} %** |`);
L.push('| Efecto en el CET1 | Neutro según la matriz (paga con acciones; los minoritarios de Brasil ya restaban poco capital) |', '');
L.push(`Lectura: SAN emite papel a ≈ 1,8 veces su VTC para comprar una filial que cotiza a ≈ 1,0 vez su valor contable: es acrecitiva en BPA (pequeña) y sube la exposición a Brasil del 89,5 % al ≈ 100 %, justo cuando el riesgo país brasileño sube. Santander Brasil no cumplió el consenso en el 3T26 (29-oct). No cambia la valoración de forma material.`, '');
L.push('## Contraste con el DCF del motor', '');
L.push('Igual que en los bancos brasileños: «ingresos» = margen bruto NIIF menos pérdidas por deterioro de activos financieros; «margen EBITDA» calibrado para que el beneficio después de impuestos sea RoTE ordinario × patrimonio tangible; «capex» = retención para que el capital crezca con el balance; amortización y circulante 0; deuda, caja y minoritarios 0; WACC = Ke. Es un descuento de dividendos y debe acercarse al modelo de exceso de rentabilidad. Peso 0 en la síntesis: el valor intrínseco es el ponderado del modelo bancario, que entra como «suma de partes» al 100 %.', '');
L.push('## Sensibilidad a los tipos de interés', '');
L.push('| Canal | Efecto | Lectura |', '|---|---|---|');
L.push(`| Ke (tasa libre + 1 punto) | valor base de ${n(base.valor)} a ${n(RESULTADO.sens.mas1)} € | Cada punto de Ke quita ≈ ${n(100 * (1 - RESULTADO.sens.mas1 / base.valor), 0)} % del valor |`);
L.push('| Margen de intereses | ≈ 95 % de los ingresos ligados a la actividad con clientes; margen de intereses de 34.614 M en 9M26 (+10 %; +7 % sin compras) y 11.903 M en el 3T26 (+1,8 % en el trimestre) | La bajada de tipos en Europa ya pasó; en Brasil y México los tipos altos suben el margen pero también el coste del riesgo |');
L.push('| Coste del riesgo | 1,16 % del crédito (12 meses); Brasil 4,25 %, Argentina 10,80 %, México 2,73 %, EE. UU. 1,39 %, España 0,43 % | Un punto más de coste del riesgo en Brasil (≈ 100.000 M de crédito) resta ≈ 1.000 M antes de impuestos, ≈ 4 % del beneficio del grupo |', '');
fs.writeFileSync(path.join(dir, '..', 'valoracion-banco.md'), L.join('\n') + '\n', 'utf8');
if (process.argv[1] && process.argv[1].endsWith('valoracion-banco.mjs')) console.log(JSON.stringify(RESULTADO, null, 1));

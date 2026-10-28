// Cifras del motor (calc) para los textos: se leen de la última ejecución de calcular-empresa,
// para que los textos usen las cifras del motor tal cual.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
// calc de la última ejecución del motor: el de datos.json de esta carpeta (o el del informe anterior en la primera pasada).
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const aqui = dirname(fileURLToPath(import.meta.url));
const datos = [join(aqui, '..', 'datos.json'), join(aqui, '..', '..', 'uber-2026-10-10', 'datos-v5.json')].find((f) => existsSync(f) && JSON.parse(readFileSync(f, 'utf8')).calc);
const c = JSON.parse(readFileSync(datos, 'utf8')).calc;
export const calc = c;
export const n = (x, dec = 2) => { if (x == null || Number.isNaN(x)) return 'n.d.'; const [e, f] = Math.abs(x).toFixed(dec).split('.'); return (x < 0 ? '−' : '') + e.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (f ? ',' + f : ''); };
export const m = (x) => n(Math.round(x), 0);
const r = c.recomendacion, rel = r.relativo, d = c.dcf, e = c.escenarios, k = c.clave, sp = c.suma_partes;
const esc = Object.fromEntries(e.map((x) => [x.escenario, x]));
const imp = Object.fromEntries(c.comparables.implicito.map((x) => [x.metodo, x]));
export const K = {
  precio: n(c.mercado.precio), objetivo: n(c.sintesis.valor_objetivo), potencial: n(c.sintesis.potencial_pct, 1),
  rent: n(r.rentabilidad_total_pct, 1), asim: n(r.asimetria), alc: n(r.alcista_pct, 1), baj: n(r.bajista_pct, 1),
  relObj: n(rel.valor_objetivo), relPot: n(rel.potencial_pct, 1), relAsim: n(rel.asimetria), relWacc: n(rel.wacc), relDcf: n(rel.dcf),
  relAlc: n(rel.alcista), relBaj: n(rel.bajista),
  dcf: n(d.valor_accion), dcfPot: n(d.potencial_pct, 1), wacc: n(c.dcf.wacc), ke: n(d.ke), vt: n(d.peso_terminal_pct, 0), mult: n(d.multiplo_implicito, 1),
  invG: n(d.inverso.crecimiento_implicito_pct, 1), invBase: n(d.inverso.crecimiento_base_pct, 1), invRent: n(d.inverso.rentabilidad_implicita_pct, 1),
  invMargen: n(d.inverso.margen_implicito_pct, 1),
  ev: m(k.valor_empresa), cap: m(k.capitalizacion), evLtm: n(k.ev_ebitda_ltm, 1), evNtm: n(k.ev_ebitda_ntm, 1), perNtm: n(k.per_ntm, 1), fcfy: n(k.fcf_yield_pct, 1),
  roic: n(k.roic_pct, 1), roicInc: n(c.roic_incremental_pct, 1), dnAj: m(k.deuda_neta_ajustada), dnEbitda: n(k.dn_ebitda_ajustada, 1),
  ebitdaNtm: m(k.ebitda_ntm), ebitdaLtm: m(k.ebitda_ltm), margenLtm: n(k.margen_ebitda_pct, 1),
  bajV: n(esc.Bajista.valor), baseV: n(esc.Base.valor), alcV: n(esc.Alcista.valor), pond: n(c.valor_ponderado),
  bajP: n(esc.Bajista.potencial_pct, 1), alcP: n(esc.Alcista.potencial_pct, 1),
  comprar: n(r.comprar_por_debajo), vender: n(r.vender_por_encima),
  sp: n(sp.valor_accion), spPot: n(sp.potencial_pct, 1), spEv: m(sp.ev_total),
  cNtmMed: n(imp['EV/EBITDA próximos 12 meses'].multiplo_mediana, 1), cNtmV: n(imp['EV/EBITDA próximos 12 meses'].valor_mediana),
  cPerMed: n(imp['PER próximos 12 meses'].multiplo_mediana, 1), cPerV: n(imp['PER próximos 12 meses'].valor_mediana),
  cLtmMed: n(imp['EV/EBITDA últimos 12 meses'].multiplo_mediana, 1), cLtmV: n(imp['EV/EBITDA últimos 12 meses'].valor_mediana),
  regAbs: r.regla_absoluta, regRel: r.regla_relativa,
  altman: n(c.calidad.altman_z), piot: c.calidad.piotroski_f, beneish: n(c.calidad.beneish_m),
  mhActual: n(c.multiplos_historicos[0].actual, 1), mhMedia: n(c.multiplos_historicos[0].media, 1),
  sens: d.sensibilidad, sens2: d.sensibilidad2,
};

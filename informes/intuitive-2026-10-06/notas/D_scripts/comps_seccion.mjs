// Escribe comparables.json (sección) y añade las fuentes de los comparables a fuentes.json (idempotente).
import { readFileSync, writeFileSync } from 'node:fs';
const P = 'informes/intuitive-2026-10-06/notas/D_scripts';
const { filas, control } = JSON.parse(readFileSync(`${P}/comps_filas.json`, 'utf8'));
let F = JSON.parse(readFileSync(`${P}/fuentes.json`, 'utf8')).filter((f) => f.id <= 22);
const ms = { syk: 'STRYKER-CORPORATION-14536', bsx: 'BOSTON-SCIENTIFIC-CORPORA-11935', mdt: 'MEDTRONIC-PLC-20661655', abt: 'ABBOTT-LABORATORIES-11506', ew: 'EDWARDS-LIFESCIENCES-CORP-12521', dxcm: 'DEXCOM-INC-9115', podd: 'INSULET-CORPORATION-50468', idxx: 'IDEXX-LABORATORIES-INC-9641', rmd: 'RESMED-INC-14259', zbh: 'ZIMMER-BIOMET-HOLDINGS-IN-14996' };
const nom = Object.fromEntries(filas.map((f) => [f.ticker.toLowerCase(), f.nombre]));
const ref = {};
let id = 23;
for (const t of Object.keys(ms)) {
  const n = nom[t];
  ref[t] = { ms: id, st: id + 1, fc: id + 2, tt: id + 3 };
  F.push({ id: id++, titulo: `Financials ${n} (cuenta anual y trimestral real y estimada, S&P Global Market Intelligence)`, editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-06', url: `https://www.marketscreener.com/quote/stock/${ms[t]}/finances/` });
  F.push({ id: id++, titulo: `${n} (${t.toUpperCase()}) Statistics & Valuation`, editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-06', url: `https://stockanalysis.com/stocks/${t}/statistics/` });
  F.push({ id: id++, titulo: `${n} (${t.toUpperCase()}) Stock Forecast (BPA no GAAP de S&P Global)`, editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-06', url: `https://stockanalysis.com/stocks/${t}/forecast/` });
  F.push({ id: id++, titulo: `${n} (${t.toUpperCase()}) cuenta de resultados y flujos de los últimos 12 meses (TTM)`, editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-06', url: `https://stockanalysis.com/stocks/${t}/financials/?p=trailing` });
}
writeFileSync(`${P}/fuentes.json`, JSON.stringify(F, null, 2));
const c = Object.fromEntries(control.map((x) => [x.t, x]));
const f1 = (x, d = 1) => (x == null ? 'n.d.' : x.toFixed(d).replace('.', ','));
const linea = (t) => { const x = c[t], R = ref[t]; return `${nom[t]}: capitalización ${Math.round(x.cap).toLocaleString('es-ES')} M y valor empresa ${Math.round(x.ev).toLocaleString('es-ES')} M al cierre del 6-oct-2026 (precio ${f1(x.precio, 2)} USD) [${R.st}]; ventas de 12 meses ${Math.round(x.ventas_ltm).toLocaleString('es-ES')} M y próximos 12 meses ${Math.round(x.ventas_ntm).toLocaleString('es-ES')} M; EBITDA de 12 meses ${Math.round(x.ebitda_ms_ltm).toLocaleString('es-ES')} M y próximos 12 meses ${Math.round(x.ebitda_ms_ntm).toLocaleString('es-ES')} M (MarketScreener) [${R.ms}]${x.ajustado_sbc ? `, a los que se resta la remuneración en acciones (${f1(x.sbc_ltm)} M en 12 meses, ${f1(x.sbc_pct)} % de las ventas) [${R.tt}]` : ''}; BPA no GAAP ${x.eps_ng.map((e) => f1(e, 2)).join(' y ')} USD en el ejercicio en curso y el siguiente (${x.analistas} analistas) [${R.fc}]; ejercicio que cierra en el mes ${x.fy_ultimo ? '' : ''}${t === 'mdt' ? 'de abril' : t === 'rmd' ? 'de junio' : 'de diciembre'}, peso del ejercicio en curso en los próximos 12 meses ${f1(x.peso_fy0, 3)}.`; };
const defin = (t) => { const x = c[t], R = ref[t]; return `${nom[t]}: EBITDA de MarketScreener 12 meses ${Math.round(x.ebitda_ms_ltm)} M frente a resultado operativo GAAP + amortizaciones ${Math.round(x.ebitda_gaap_ltm)} M (${Math.round(x.ebit_gaap_ltm)} + ${Math.round(x.da_ltm)}) y remuneración en acciones ${f1(x.sbc_ltm)} M [${R.ms}, ${R.tt}]: ${x.ajustado_sbc ? 'la diferencia se parece a la remuneración en acciones, así que se trata como EBITDA sin ella y se le resta' : Math.abs(x.ebitda_ms_ltm - x.ebitda_gaap_ltm) < 100 ? 'cuadra con el EBITDA GAAP: incluye la remuneración en acciones como gasto' : 'la diferencia supera o no encaja con la remuneración en acciones; se atribuye a amortización de intangibles y partidas no recurrentes que la empresa excluye: se trata como EBITDA con la remuneración en acciones como gasto (sin confirmar)'}.`; };
const sec = {
  criterio: null,
  empresas: filas,
  comentario: null,
  confianza: 'Media',
  extra: {
    metodo: [
      'Todas las cifras de mercado al cierre del 6-oct-2026 en Stock Analysis (capitalización y valor empresa = capitalización + deuda - caja e inversiones a corto) [ver cada fila]. EV/ventas = valor empresa / ventas de 12 meses; EV/EBITDA de 12 meses = valor empresa / suma de los cuatro últimos trimestres publicados del EBITDA de MarketScreener; EV/EBITDA de los próximos 12 meses = valor empresa / combinación de los dos ejercicios estimados de MarketScreener según los meses que quedan del ejercicio en curso (2,8 meses para los que cierran en diciembre; 6,8 para Medtronic, que cierra en abril; 8,8 para ResMed, que cierra en junio). Mismo proveedor para los dos EBITDA (cálculo propio).',
      'PER de los próximos 12 meses = precio / BPA no GAAP del consenso de S&P Global (Stock Analysis), combinado igual. No se usa el BPA de MarketScreener porque mezcla bases: para Intuitive es GAAP (9,23 USD en 2026e) y para Stryker o Boston Scientific da saltos entre el real GAAP y la estimación ajustada [8, 23, 27].',
      'Crecimiento = ventas de los próximos 12 meses / ventas de los últimos 12 meses - 1 (MarketScreener). Margen EBITDA del último ejercicio cerrado (MarketScreener, con el mismo ajuste de remuneración en acciones). ROIC y rentabilidad por FCF de los últimos 12 meses (Stock Analysis). DN/EBITDA = (valor empresa - capitalización) / EBITDA de 12 meses; negativo = caja neta.',
      'Intuitive con el mismo método, para comparar (no va en la lista; el motor la añade con sus cifras): EV de Stock Analysis 137.760 M (resta solo caja e inversiones a corto); EBITDA de 12 meses de MarketScreener 5.038 M (sin remuneración en acciones) → 27,3x; con la remuneración en acciones como gasto (826,2 M en 12 meses) 4.212 M → 32,7x; próximos 12 meses 5.718 M → 24,1x, o 4.750 M restando el 7,5 % de las ventas → 29,0x; PER con BPA no GAAP 34,3x y con BPA GAAP de MarketScreener 39,2x; crecimiento 17,0 %; margen EBITDA 2025 43,5 % ajustado (35,6 % con la remuneración en acciones como gasto); ROIC 21,9 %; caja neta; rentabilidad por FCF 2,25 % [5, 6, 8] (cálculos propios).'
    ],
    datos_por_empresa: Object.keys(ms).map(linea),
    definicion_ebitda: [
      'Intuitive es la única del grupo cuyo EBITDA de consenso excluye de forma declarada la remuneración en acciones (su resultado operativo no GAAP la excluye: 788,1 M en 2025) [16, 8]; por eso consenso.base_ebitda = "ajustado". Los comparables se dejan con la remuneración en acciones como gasto, que es como el motor tratará a Intuitive tras restar el ajuste.',
      ...Object.keys(ms).map(defin),
    ],
    avisos: [
      'Abbott: el crecimiento del 14,9 % de los próximos 12 meses no es orgánico: las ventas estimadas de 2026 (50.201 M) frente a las de 2025 (44.328 M) incorporan una adquisición (MarketScreener ajusta al perímetro actual) [35]. Su BPA GAAP de MarketScreener baja en 2026 (3,42 frente a 3,72), señal de amortizaciones de adquisición [35].',
      'ResMed: el consenso espera solo un +2,7 % de ventas en su ejercicio a junio de 2027 (5.806 M frente a 5.653 M) y un EBITDA que baja (2.249 frente a 2.329 M); lo confirma Stock Analysis (5,81 mil M, +2,69 %) [55, 57].',
      'Boston Scientific: crecimiento esperado del 5,6 % en 2026 y 4,9 % en 2027 según Stock Analysis [29]; su BPA GAAP de MarketScreener baja de 2,64 (2026e) a 2,52 (2027e) mientras el no GAAP sube de 3,26 a 3,41 [27, 29].',
      'Dexcom (ROIC 44,5 %) e IDEXX (47,2 %) tienen el ROIC más alto según Stock Analysis [44, 52]; Zimmer Biomet el más bajo (6,2 %) [60].',
      'Si se excluye Abbott (crecimiento inorgánico) y Zimmer (ortopedia madura) la mediana del EV/EBITDA de los próximos 12 meses sube; el motor avisa si quitar una sola cambia mucho la mediana.',
      'Comparables descartados: Globus Medical y Align no se descargaron (sin identificador de MarketScreener a mano); J&J (Ottava) es un conglomerado farmacéutico; MicroPort MedBot y Edge Medical cotizan en Hong Kong con pérdidas y sin EBITDA positivo comparable (los estudia B).'
    ]
  }
};
writeFileSync(`${P}/comparables.json`, JSON.stringify(sec, null, 2));
console.log(JSON.stringify(ref));

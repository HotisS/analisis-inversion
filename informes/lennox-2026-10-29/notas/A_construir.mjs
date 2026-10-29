// Construye notas/A.json a partir de cuentas-xbrl.json (comprobado contra los 10-K) y de A_textos.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = dirname(fileURLToPath(import.meta.url));
const x = JSON.parse(readFileSync(join(dir, 'cuentas-xbrl.json'), 'utf8'));
const t = JSON.parse(readFileSync(join(dir, 'A_textos.json'), 'utf8'));

// No recurrentes dentro del EBIT (resultado de segmentos − EBIT, sin las partidas que se repiten cada año:
// medio ambiente, litigios ordinarios y futuros no liquidados). Positivo = gasto.
const noRec = { 2016: 32.8, 2017: 9.7, 2018: 19.3, 2019: -59.3, 2020: 14.9, 2021: -0.7, 2022: 1.5, 2023: 52.2, 2024: 1.5, 2025: 16.2 };
// Resultado de participadas por el método de la participación (empresa conjunta con Samsung y otras), dentro del EBIT.
const part = { 2016: 18.4, 2017: 18.4, 2018: 12.0, 2019: 13.4, 2020: 15.6, 2021: 11.8, 2022: 5.1, 2023: 8.5, 2024: 7.9, 2025: 6.0 };

const cuenta = x.financieros.cuenta.map(({ fin, ...c }) => ({ ...c, participadas_en_ebitda: part[c.periodo], no_recurrentes_en_ebitda: noRec[c.periodo], dpa_extraordinario: 0 }));

const balance = x.balance.historico.map(({ fin, ...b }) => ({ ...b, arrendamientos: 0, intangibles: b.intangibles ?? 0, minoritarios: b.minoritarios ?? 0, activos_contrato: null }));

const desinv = { 2018: 114.7, 2019: 43.5, 2023: 23.2, 2024: -7.7 };
const flujos = x.flujos.historico.map(({ fin, ...f }) => ({ ...f,
  pagos_arrendamientos: f.pagos_arrendamientos ?? 0,
  adquisiciones: f.adquisiciones ?? 0,
  desinversiones: +((f.desinversiones || 0) + (desinv[f.periodo] || 0)).toFixed(1) }));

const nota = {
  _estado: t._estado || 'en curso',
  negocio: t.negocio,
  financieros: { cuenta, ltm: t.ltm, cambios_perimetro: t.cambios_perimetro, comentario: t.fin_comentario, ajustes: t.fin_ajustes, confianza: 'Alta' },
  trimestres: t.trimestres,
  balance: { historico: balance, ...t.balance },
  flujos: { historico: flujos, comentario: t.flujos_comentario, confianza: 'Alta' },
  calidad: t.calidad,
  rentabilidad: null,
  capital: t.capital,
  fuentes: t.fuentes,
  huecos: t.huecos,
};
writeFileSync(join(dir, 'A.json'), JSON.stringify(nota, null, 1));
console.log('A.json escrito');

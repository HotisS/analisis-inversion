// Lista la información regulada de Dassault Systèmes en info-financiere.gouv.fr (DILA) desde 2024.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = dirname(fileURLToPath(import.meta.url));
const base = 'https://www.info-financiere.gouv.fr/api/explore/v2.1/catalog/datasets/flux-amf-new-prod/records';
const out = [];
for (let off = 0; off < 1000; off += 100) {
  const u = new URL(base);
  u.searchParams.set('where', `identificationsociete_iso_cd_lei="96950065LBWY0APQIM86" and informationdeposee_inf_dat_emt >= "2023-12-01"`);
  u.searchParams.set('order_by', 'informationdeposee_inf_dat_emt desc');
  u.searchParams.set('limit', '100');
  u.searchParams.set('offset', String(off));
  const r = await fetch(u); const j = await r.json();
  if (!j.results) { console.log(JSON.stringify(j).slice(0, 500)); break; }
  for (const x of j.results) out.push({ fecha: x.informationdeposee_inf_dat_emt?.slice(0, 10), titulo: x.informationdeposee_inf_tit_inf, tipo: x.subtype_of_information, lengua: x.informationdeposee_inf_lng_inf, url: x.url_de_recuperation });
  if (j.results.length < 100) break;
}
writeFileSync(join(process.env.TEMP, 'analisis-inversion/dassault-C/C-infofi.json'), JSON.stringify(out, null, 1));
for (const o of out) console.log(o.fecha, '|', o.tipo, '|', o.lengua, '|', o.titulo, '|', o.url);

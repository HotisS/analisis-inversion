// Resume las declaraciones de directivos (AMF) descargadas en texto: persona, fecha, naturaleza, acciones, importe.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const D = process.argv[2];
const rows = [];
for (const f of readdirSync(D).filter(f => f.endsWith('.txt')).sort()) {
  const t = readFileSync(join(D, f), 'latin1').replace(/\r/g, '');
  // una declaración puede tener varias transacciones: se separan por "DATE DE LA TRANSACTION"
  const persona = (t.match(/PERSONNE ETROITEMENT LIEE :\s*\n\s*(.+)/) || [])[1]?.trim();
  const bloques = t.split(/DATE DE LA TRANSACTION :/).slice(1);
  for (const b of bloques) {
    const fecha = b.split('\n')[0].trim();
    const nat = (b.match(/NATURE DE LA TRANSACTION :\s*(.+)/) || [])[1]?.trim();
    const instr = (b.match(/DESCRIPTION DE L'INSTRUMENT FINANCIER :\s*(.+)/) || [])[1]?.trim();
    const ag = b.split(/INFORMATIONS AGREGEES/)[1] || '';
    const precio = parseFloat(((ag.match(/PRIX\s*:\s*([\d .,]+)/) || [])[1] || '').replace(/ /g, '').replace(',', '.'));
    const vol = parseFloat(((ag.match(/VOLUME\s*:\s*([\d .,]+)/) || [])[1] || '').replace(/ /g, '').replace(',', '.'));
    const info = ((b.match(/PERFORMANCES : (OUI|NON)/) || [])[1] || "") + " " + ((b.match(/Cours de r.f.rence[^\n]*/) || [])[0] || "");
    rows.push({ archivo: f, persona, fecha, naturaleza: nat, instrumento: instr, precio, acciones: vol, importe_meur: precio && vol ? +(precio * vol / 1e6).toFixed(3) : null, info });
  }
}
writeFileSync(join(D, 'resumen.json'), JSON.stringify(rows, null, 1));
for (const r of rows) console.log([r.fecha, r.persona, r.naturaleza, r.instrumento, r.acciones, r.precio, r.importe_meur, (r.info || '').slice(0, 90)].join(' | '));

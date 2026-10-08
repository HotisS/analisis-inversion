import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const f = path.join(path.dirname(fileURLToPath(import.meta.url)), 'A.json');
const a = JSON.parse(fs.readFileSync(f, 'utf8'));
if (!a.trimestres.ultima_presentacion.startsWith('El crecimiento orgánico')) {
  a.trimestres.ultima_presentacion = 'El crecimiento orgánico operativo se frenó trimestre a trimestre: 14 % en el 3T24 (operativo, antes de vender el MFA), 9 % en el 4T24 y el 1T25, 8 % en el 2T25, 4 % en el 3T25 y el 4T25, 0 % en el 1T26 y −1 % en el 2T26 [9-16]. Los trimestres de 2026 se comparan con 2025 reexpresado por el cambio de cierre internacional (el 1T25 pasa de 2.220 M a 2.198 M) [3]. ' + a.trimestres.ultima_presentacion;
}
a.calidad.senales[1].comentario = 'Aplicado de forma retroactiva desde el 1-ene-26; el 1T25 reexpresado tiene 22 M menos de ventas y 29 M menos de beneficio, y el 1S25, 8 M y 21 M menos; el patrimonio a 31-dic-25 sube 84 M [2, 3].';
a.negocio.kpis[1].comentario = 'Cae por la venta del MFA (2.890 M en 2023, plano en 2024); en el 1S26 sube un 14 % (vacuna aviar y vacuno en EE. UU.) [1, 4, 9].';
a.calidad.comentario = a.calidad.comentario.replace(' Indicadores del motor: se leen en calc.calidad.', '');
fs.writeFileSync(f, JSON.stringify(a, null, 2));
const t = JSON.stringify(a);
console.log('comillas invertidas:', t.includes('`'), 'calc:', /calc/.test(t));

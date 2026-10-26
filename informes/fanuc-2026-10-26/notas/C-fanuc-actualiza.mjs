// Nota C (equipo y gobierno) de la iteración del 26-oct-2026: parte de la C del 7-oct y comprueba lo
// publicado después: notificaciones de Fanuc (recompra y dividendo del 23-oct), informes de gran
// participación (IRBANK: ninguno nuevo desde el 15-may-2026) y la segunda subida de la guía de FY2026.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const aqui = dirname(fileURLToPath(import.meta.url));
const C = JSON.parse(readFileSync(join(aqui, '../../fanuc-2026-10-07/notas/C.json'), 'utf8'));

C.fuentes.push(
  { id: 33, titulo: 'Notice of Share Buyback (consejo del 23-10-2026)', editor: 'FANUC Corporation', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://www.fanuc.co.jp/en/ir/announce_other/index.html' },
  { id: 34, titulo: 'Consolidated Interim Financial Results for the six months ended September 30, 2026 (Kessan Tanshin 1S FY2026)', editor: 'FANUC Corporation', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://www.fanuc.co.jp/en/ir/announce/pdf/2026/financialresult202609_e.pdf' },
  { id: 35, titulo: 'ファナック（6954）の大量保有（5%ルール）: informes presentados hasta el 23-oct-2026', editor: 'IRBANK (datos de EDINET)', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://irbank.net/E01946/share' },
);
// La fuente 18 (IRBANK a 7-oct) queda sustituida por la 35 (misma página, consultada el 26-oct)
C.fuentes = C.fuentes.filter(f => f.id !== 18);
const re18 = s => typeof s === 'string' ? s.replace(/\[([^\]]*)\]/g, (m, x) => '[' + x.split(',').map(t => t.trim() === '18' ? '35' : t.trim()).join(', ') + ']') : s;
const recorre = o => { if (Array.isArray(o)) return o.map(recorre); if (o && typeof o === 'object') { for (const k of Object.keys(o)) o[k] = recorre(o[k]); return o; } return re18(o); };
C.directivos = recorre(C.directivos); C.gobierno = recorre(C.gobierno); C.huecos = recorre(C.huecos);

// Autocartera a 30-sep y recompra nueva
const auto = C.gobierno.accionistas.find(a => a.nombre === 'Autocartera');
auto.pct = 5.84;
auto.variacion = '57,36 M de acciones a 30-9-2026 (5,84 % del capital emitido de 982,27 M), tras comprar 8,27 M entre julio y el 17-9-2026 por 50.011 M JPY [12, 34]; la política es amortizar cada año lo que supere el 5 %: 13,04 M de acciones amortizadas en mayo de 2025 y 0,11 M en mayo de 2026 [13, 14]. El 23-10-2026 aprobó otra recompra de hasta 10 M de acciones (1,08 %) o 50.000 M JPY, en mercado, del 26-10-2026 al 30-4-2027 [33, 34]';

// Guía de FY2026: dos subidas
C.directivos.historial_guidance.push({ anio: 'FY2026 (en curso)', guia: 'Guía inicial de abril de 2026: ventas 909.600, beneficio operativo 212.200 y beneficio neto 184.900 M JPY; subida el 31-7-2026 (948.100 / 218.000 / 198.000) y el 23-10-2026 (1.013.700 / 240.700 / 228.300) [28, 34]', real: 'Primer semestre: ventas 473.708 (+1,7 % sobre la guía semestral de julio), beneficio operativo 116.662 (+11,7 %) y beneficio neto 112.576 M JPY (+12,2 %) [34]', cumplida: 'Sí' });
C.directivos.comentario = C.directivos.comentario.replace('Para FY2026 subió en julio la guía de beneficio operativo de 212.200 a 218.000 M JPY [27, 28].', 'Para FY2026 subió la guía de beneficio operativo en julio (de 212.200 a 218.000 M JPY) y otra vez el 23-oct (a 240.700 M), tras batir en un 11,7 % la del primer semestre [28, 34]. El patrón es una guía prudente que se sube con el año: la de octubre supone el yen a 150 por dólar en el segundo semestre, frente a 159,37 en el primero [34].');
C.gobierno.alertas = C.gobierno.alertas.map(a => a.startsWith('Nomura Asset Management') ? 'Nomura Asset Management ha ido subiendo su participación hasta el 9,26 % (mayo de 2026); es una gestora de fondos, no un activista declarado. No hay informes de gran participación nuevos entre el 15-5-2026 y el 23-10-2026 [1, 35].' : a);

writeFileSync(join(aqui, 'C.json'), JSON.stringify(C, null, 1));
console.log('C.json fuentes', C.fuentes.length);

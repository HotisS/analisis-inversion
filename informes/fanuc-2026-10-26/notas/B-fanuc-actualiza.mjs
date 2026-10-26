// Nota B (sector y competencia) de la iteración del 26-oct-2026: parte de la B del 7-oct (World Robotics
// 2026 de la IFR, del 24-sep-2026, sigue siendo la última) y comprueba lo que se mueve: pedidos de máquina
// herramienta (septiembre), cierre de ABB Robotics–SoftBank, Sección 232, y las ventas por región del 1S.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const aqui = dirname(fileURLToPath(import.meta.url));
const B = JSON.parse(readFileSync(join(aqui, '../../fanuc-2026-10-07/notas/B.json'), 'utf8'));

B.fuentes.push(
  { id: 32, titulo: 'Japan Machine Tool Orders Notch Fresh High (pedidos JMTBA de septiembre de 2026, dato preliminar)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://tradingeconomics.com/japan/machine-tool-orders' },
  { id: 33, titulo: 'SoftBank Acquires ABB Robotics: EU Approved $5.375B Deal (caso M.12248; cierre pendiente de China y EE. UU.)', editor: 'PLC Matrix', tipo: 'Prensa', fecha: '2026-10-24', url: 'https://www.plcmatrix.com/softbank-abb-robotics-eu-approval-spare-parts-transition/' },
  { id: 34, titulo: 'Financial Results for the Six Months Ended September 30, 2026 (presentación de resultados 1S FY2026)', editor: 'FANUC Corporation', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://www.fanuc.co.jp/en/ir/announce/pdf/2026/reference202609_e.pdf' },
  { id: 35, titulo: 'ファナックの中間純利益41%増の1126億円、通期予想を上方修正 自社株買い500億円も (alianza con Hitachi del 30-sep y robot con Gemini Enterprise del 11-sep)', editor: 'Business+IT (Yahoo! News Japan)', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://news.yahoo.co.jp/articles/80ca242bbaf48f5ae9616eef301d1a2629b6fc8d' },
);

// Ciclo: pedidos JMTBA de septiembre y pedidos de Fanuc del 2T
B.sector.ciclo.comentario = `Pedidos de máquina herramienta japonesa en máximo histórico: 223.209 M JPY en septiembre de 2026 (+60,4 % interanual, decimocuarto mes de subida; exterior +66,8 %), +43,3 % en enero-septiembre [32]; los de Fanuc, récord de 306,0 mil M en el 2T FY26 (+49,0 %; FA +130,1 %), en parte adelantados por plazos largos [3, 34]. El PMI manufacturero oficial de China volvió a 50,1 en septiembre [17]. En 2009 los pedidos JMTBA cayeron un 68,4 % [15] y las ventas de Fanuc, un 46 % de pico a valle (ejercicios a marzo de 2008-2010) [9]; en 2020 los pedidos bajaron un 26,7 % [15] y Fanuc vendió un 20 % menos [5]; tras el récord de 2022, cayeron un 15,5 % en 2023 [15]. Catorce meses de subidas y un récord sitúan el ciclo en su tramo alto.`;
const drv = B.sector.drivers;
drv.find(d => d.driver === 'Ciclo de inversión en máquina herramienta').evidencia = 'Pedidos JMTBA: 1,76 billones de JPY en 2022 (récord), −15,5 % en 2023, −0,1 % en 2024, +8,0 % en 2025 [15]; +65,4 % en agosto y +60,4 % en septiembre de 2026, con 223.209 M JPY, máximo histórico mensual [16, 32].';
drv.find(d => d.driver.startsWith('Inversión en semiconductores')).evidencia = 'Fanuc atribuye a estos sectores el salto de los pedidos de CNC en China, Japón, Corea y Taiwán: pedidos FA +63,8 % en el 1T y +130,1 % en el 2T del FY2026 (112,2 mil M) [2, 3, 34]. Los pedidos de máquina herramienta japonesa desde China subieron un 55,8 % en enero-julio de 2026 (341.801 M JPY) [15].';
drv.find(d => d.driver === 'Tipo de cambio del yen').evidencia = 'El 87 % de las ventas es fuera de Japón y el 79 % del inmovilizado está en Japón [1]; en el 1S FY2026 el dólar medio fue 159,37 JPY frente a 146,04 un año antes, con ventas +16,2 %, y la guía del 2S supone 150 JPY por dólar [34].';

// Competencia: estado de ABB Robotics
const abb = B.competencia.competidores.find(c => c.nombre.startsWith('ABB Robotics'));
abb.comentario = abb.comentario.replace('no hemos encontrado comunicado de cierre a la fecha de corte.', 'la UE la aprobó el 11-mar-2026 y a 24-oct-2026 seguía sin cerrar, pendiente de China y EE. UU. [33].');
B.sector.tendencias = B.sector.tendencias.replace('y en septiembre de 2026 firmó con Hitachi una alianza para comercializar IA física desde el FY2027 [30].', 'en septiembre de 2026 firmó con Hitachi una alianza para comercializar IA física desde el FY2027 [30] y presentó un robot que usa Gemini Enterprise de Google [35]; en la feria IMTS de Chicago (septiembre) enseñó cinco sistemas de IA física con NVIDIA y Google y un CNC con IA generativa y gemelo digital [34].');
B.sector.tendencias = B.sector.tendencias.replace('SoftBank compra ABB Robotics con la misma tesis [26].', 'SoftBank compra ABB Robotics con la misma tesis (cierre aún pendiente) [26, 33].');
B.competencia.amenazas = B.competencia.amenazas.replace('La principal es **China**, en torno al 27-30 % de las ventas [2]:', 'La principal es **China**, el 27,4 % de las ventas del 2T FY26 [34], donde las ventas de robots cayeron un 14,3 % en el 2T mientras las de FA subían un 25,6 % [34]:');

for (const h of B.huecos) if (typeof h.intentos === 'string') h.intentos = h.intentos.replace('con las cuentas del subagente A', 'con las cuentas del informe');
writeFileSync(join(aqui, 'B.json'), JSON.stringify(B, null, 1));
console.log('B.json fuentes', B.fuentes.length);

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
const dir = path.dirname(fileURLToPath(import.meta.url));
const ruta = path.join(dir, 'B.json');
const j = JSON.parse(fs.readFileSync(ruta, 'utf8'));

function cambia(obj, clave, viejo, nuevo) {
  if (!obj[clave].includes(viejo)) throw new Error('No encuentro en ' + clave + ': ' + viejo.slice(0, 60));
  obj[clave] = obj[clave].replace(viejo, nuevo);
}

// Fuentes nuevas
if (!j.fuentes.find(f => f.id === 25)) {
  j.fuentes.push({ id: 25, titulo: 'SAP SE, Quarterly Statement Q3 2026', editor: 'SAP SE', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sap.com/docs/download/investors/2026/sap-2026-q3-statement.pdf' });
  j.fuentes.push({ id: 26, titulo: 'SAP buys TechWolf in record Belgian VC-backed deal', editor: 'Tech.eu', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://tech.eu/2026/10/06/sap-buys-techwolf-in-record-belgian-vc-backed-deal/' });
}

// Historia
const h = j.historia;
cambia(h, 'resumen', 'y reestructurar la plantilla en 2024 [1].', 'y reestructurar la plantilla en 2024 [1]. En 2026 compró Reltio, Dremio y Prior Labs para su capa de datos e IA y en el 3T26 superó por primera vez los 10.000 M EUR de ingresos trimestrales [25].');
if (h.hitos.length === 11) {
  h.hitos.push({ anio: '2026', hito: 'Cierra las compras de Reltio (7 de mayo, 1.076 M EUR), Dremio (6 de julio, ≈515 M) y Prior Labs (16 de julio, ≈518 M) para Business Data Cloud e IA, y en octubre acuerda comprar TechWolf [25, 26]; en el 3T26 supera por primera vez los 10.000 M EUR de ingresos y los 3.000 M de beneficio operativo no NIIF en un trimestre [25].' });
}

// Negocio
const n = j.negocio;
cambia(n, 'descripcion', 'Tiene más de 110.000 empleados y 216 sociedades [1].', 'En los nueve primeros meses de 2026 facturó 29.703 M EUR (+10 %; +12 % a tipo constante), el 64 % en la nube [25]. Tenía 216 sociedades a cierre de 2025 [1] y 113.076 empleados a tiempo completo equivalentes el 30 de septiembre de 2026 [25].');
cambia(n, 'como_gana_dinero', '; en el 2T26 la primera llegó a 22.900 M (+27 %) [16].', '; en el 2T26 la primera llegó a 22.900 M (+27 %) [16] y en el 3T26 a 24.144 M (+28 %; +26 % a tipo constante) [25]. En el 3T26 la nube creció un 26 % (Cloud ERP Suite, +29 %) y el mantenimiento cayó un 5 %, pero el margen bruto de la nube bajó al 73,9 % (74,6 % un año antes); parte del crecimiento de la nube fueron cobros atrasados de clientes que salían de dificultades financieras, que SAP no cuantifica [25]. SAP prevé que la caída del mantenimiento se acelere en los próximos años, a medida que más clientes pasen a la nube [25].');
cambia(n, 'clientes', 'y desde 2026 se sustituye por la satisfacción de clientes de la nube (CSAT) [1].', 'y desde 2026 se sustituye por la satisfacción de clientes de la nube (Cloud CSAT), del 75 % en 2025, con un objetivo del 75-76 % para 2026 [1, 25].');

// Sector
const s = j.sector;
const d = Object.fromEntries(s.drivers.map(x => [x.driver, x]));
cambia(d['Fin del mantenimiento de ECC (SAP Business Suite 7)'], 'evidencia', 'Cloud ERP Suite creció un 28 % en 2025, hasta 18.119 M EUR [1].', 'Cloud ERP Suite creció un 28 % en 2025, hasta 18.119 M EUR [1], y un 29 % en el 3T26, hasta 5.924 M [25].');
cambia(d['Paso a la nube (RISE with SAP y GROW)'], 'evidencia', 'La cartera de nube a 12 meses creció un 27 % en el 2T26, hasta 22.900 M EUR [16].', 'La cartera de nube a 12 meses creció un 27 % en el 2T26 [16] y un 28 % en el 3T26, hasta 24.144 M EUR; en 2026 la nube supone el 64 % de los ingresos de enero a septiembre [25].');
cambia(d['Aranceles, divisa e incertidumbre macro'], 'evidencia', 'en el 2T26 los ingresos crecieron un 9 % en euros frente a un 11 % a tipo constante por el dólar [16].', 'en los nueve primeros meses de 2026 los ingresos crecieron un 10 % en euros frente a un 12 % a tipo constante por el dólar, y la previsión de cartera de nube supone un entorno macro estable en el 4T26 [25].');
cambia(s, 'tendencias', 'La segunda tendencia es la nube soberana en Europa [1].', 'En SAP Connect (6 de octubre de 2026) presentó la «empresa autónoma» con Joule Work y Joule Assistants y acordó comprar TechWolf, cuyo grafo de tareas y habilidades alimentará los agentes de SuccessFactors [25, 26]; antes, en 2026, compró Reltio, Dremio y Prior Labs para su capa de datos e IA [25]. La segunda tendencia es la nube soberana en Europa [1].');

// Competencia
const c = j.competencia;
cambia(c, 'amenazas', 'y su respuesta (Joule, Business Data Cloud) aún no tiene cifras propias.', 'y su respuesta (Joule, Business Data Cloud) aún no tiene cifras propias; las compras de 2026 para reforzarla (Reltio, Dremio, Prior Labs) restaron 39 M EUR al beneficio operativo no NIIF del 3T26 [25].');
const fo = Object.fromEntries(c.foso.fuentes.map(x => [x.fuente, x]));
cambia(fo['Ventaja en costes'], 'evidencia', 'Margen bruto de la nube del 73,9 % en 2025 [1],', 'Margen bruto de la nube del 73,9 % en 2025 [1] y también en el 3T26, por debajo del 74,6 % del 3T25 [25],');
cambia(fo['Costes de cambio'], 'evidencia', 'y la cae solo por conversión a su propia nube [1];', 'y la cae solo por conversión a su propia nube [1] (−5 % en el 3T26, con la nube al +26 %) [25];');

// ESG
const e = j.esg;
cambia(e, 'materialidad', 'más de 110.000 empleados,', '113.076 empleados a tiempo completo equivalentes en septiembre de 2026 [25],');
cambia(e, 'materialidad', 'ha firmado contratos de compra de electricidad renovable con entrega desde 2026 [1].', 'ha firmado contratos de compra de electricidad renovable con entrega desde 2026 [1]. Con la medición vigente, las emisiones de la cadena de valor relevante fueron de 3,6 Mt en 2025 y SAP prevé reducirlas de forma continuada en 2026 [25].');

j._estado = { terminado: '2026-10-21', resumen: 'Puesta al día con el Quarterly Statement Q3 2026 (sap.com, 21-oct; el 6-K aún no está en EDGAR).' };
fs.writeFileSync(ruta, JSON.stringify(j, null, 2));
console.log('ok', j.fuentes.length, j.historia.hitos.length);

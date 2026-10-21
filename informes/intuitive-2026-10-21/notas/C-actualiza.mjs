import fs from 'fs';
const f = new URL('./C.json', import.meta.url);
const c = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = c.gobierno, d = c.directivos;
// Fuentes
const f15 = c.fuentes.find(x => x.id === 15);
f15.titulo = 'Form 4 de consejeros y directivos de Intuitive Surgical (91 formularios, 21-10-2025 a 21-10-2026)';
f15.fecha = '2026-10-21';
c.fuentes.push(
  { id: 41, titulo: 'Nota de resultados del 3T26 y perspectivas 2026 (anexo 99.1 al 8-K)', editor: 'Intuitive Surgical (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/Archives/edgar/data/1035267/000103526726000067/q326ex-991earningsrelease.htm' },
  { id: 42, titulo: 'Lista de presentaciones de Intuitive Surgical en EDGAR (8-K, Form 3/4/144, Schedule 13G)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/submissions/CIK0001035267.json' }
);
// Guía 2026
d.historial_guidance.push(
  { anio: '2026', guia: 'Procedimientos da Vinci: +13 % a +15 % en enero [25]; +13,5 % a +15,5 % en abril [26]; igual en julio, «más cerca del punto medio» [27]; +14 % a +15 % en octubre, «más cerca del punto medio» [41]', real: 'En curso: +16 % en el 1T, +15 % en el 2T y +14 % en el 3T [26, 27, 41]; el punto medio de octubre (14,5 %) supone un 4T de en torno al 13 % (estimación propia). Va en camino de cumplirse dentro del rango inicial, pero por primera vez desde 2021 sin superar su techo', cumplida: 'Parcial' },
  { anio: '2026', guia: 'Margen bruto no GAAP: 67 %-68 % en enero, con 1,2 pp de aranceles [25]; 67,5 %-68,5 % en abril [26]; 68 %-69 % en julio [27]; 68,7 %-69,3 % en octubre, con 0,9 pp de aranceles sin contar devoluciones [41]', real: 'En curso: 69,2 % en enero-septiembre y 69,9 % en el 3T, con devoluciones de aranceles IEEPA (22 M USD netos en el 3T) [41]. Por encima del techo de la guía inicial', cumplida: 'Parcial' },
  { anio: '2026', guia: 'Gastos operativos no GAAP: +11 % a +15 % en enero [25]; +11 % a +14 % en abril [26]; +11 % a +13 % en julio [27] y en octubre [41]', real: 'En curso: +13,9 % en enero-septiembre (2.468 frente a 2.168 M USD, calculado como margen bruto no GAAP menos resultado operativo no GAAP, incluye los distribuidores de Italia, España y Portugal comprados en el 1T) y +18 % en el 3T [41]; para quedar en el 11-13 % el 4T tendría que crecer por debajo del 10 % (estimación propia)', cumplida: 'Parcial' }
);
d.comentario = 'Equipo creíble y estable en lo que importa: la guía de procedimientos se superó de 2021 a 2025, casi siempre por encima del techo del rango inicial (18 % frente a 13-16 % en 2025), y solo se falló la de margen bruto de 2022 [21-25, 30-35]. La sucesión fue ordenada: Dave Rosa, en la empresa desde 1996, sustituyó a Gary Guthart el 1-jul-2025 y Guthart sigue como presidente ejecutivo [6, 7]. En 2026 el patrón cambia: la guía de procedimientos se ha movido dentro del rango inicial (13-15 % en enero, 14-15 % en octubre) en vez de superarlo, con el crecimiento bajando del 16 % al 14 % trimestre a trimestre, mientras la de margen bruto sí se ha subido tres veces [25-27, 41]. Hay rotación en la segunda línea (Patton sustituye a Charlton; Miller deja de reportar al CEO) [9, 10] y ningún cambio en la cúpula desde el 6-oct [42]. La dirección posee el 0,6 % y vendió 93,4 M USD en 12 meses, sin compras [1, 15].';
// Extras de guía en curso: sustituir
g.extra = g.extra.filter(t => !t.startsWith('Guía 2026 en curso') && !t.startsWith('Margen bruto no GAAP 2026'));
g.extra = g.extra.map(t => t.startsWith('Form 4 revisados') ?
  'Form 4 revisados (21-10-2026): 91 formularios presentados entre el 21-10-2025 y el 21-10-2026, 224 operaciones; códigos: 83 ventas (S), 89 ejercicios o entregas (M), 49 retenciones fiscales (F, no son ventas en mercado), 2 donaciones (G: Rosa 5.454 acciones el 3-11-2025 y Leonard 1.606 el 12-11-2025) y 1 J (Leonard, 369 acciones); ninguna compra (P). Todas las ventas llevan la marca de plan 10b5-1 [15].' : t);
g.extra.push(
  'Desde el 6-oct solo hay dos Form 4 nuevos (13-10-2026): entregas de acciones a Patricia Wadors y Gary Loeb con retención fiscal (código F: 1.062 y 1.296 acciones a 423,96 USD), que no son ventas en mercado; los dos Form 144 de septiembre corresponden a ventas ya declaradas [15, 42].',
  'Sin 8-K del Item 5.02 desde el del 28-5-2026: ningún cambio en el consejo ni en la cúpula entre el 6 y el 21-oct; el único 8-K nuevo es el de resultados del 20-10-2026 (Items 2.02 y 9.01) [42].',
  'Sin Schedule 13G ni 13D nuevos desde el de Vanguard Capital Management del 30-4-2026 [42].',
  'Recompras del 3T26: 7,8 millones de acciones por 2.940 M USD [41].'
);
// Accionistas: autocartera
const ac = g.accionistas.find(a => a.nombre === 'Autocartera');
ac.variacion = 'Las acciones recompradas se amortizan; 353.278.038 acciones en circulación a 16-7-2026, frente a 355,1 millones a 31-12-2025 [38, 39]; en el 3T26 recompró otros 7,8 millones de acciones por 2.940 M USD [41]';
// Alertas
g.alertas.unshift(
  'Acuerdo de 450 M USD (cargo antes de impuestos en el 3T26; 347 M USD netos, 0,99 USD por acción) para cerrar la demanda colectiva antimonopolio de hospitales «In re: da Vinci Surgical Robot Antitrust Litigation», sobre la reparación de instrumentos EndoWrist, con medidas cautelares pactadas y sin reconocer culpa; pendiente de la aprobación del tribunal [41, 39].'
);
g.alertas.push(
  'Siguen abiertos dos pleitos antimonopolio por la reparación de EndoWrist, ambos ganados en primera instancia y recurridos: SIS ante el Noveno Circuito (vista oral el 25-6-2026) y Restore Robotics ante el Undécimo; además, demandas individuales por responsabilidad de producto con una pérdida posible superior a la provisión que la empresa no puede estimar [39].'
);
// Huecos
const h = c.huecos.find(x => x.campo.startsWith('equipo[Taylor Patton]'));
h.intentos = '1) Proxy DEF 14A 2026 (tabla de participaciones a 31-12-2025): no figura, aún no era directivo; 2) Form 4 de los últimos 12 meses (91 formularios, form4.mjs a 21-10-2026): ninguno suyo; 3) Lista de presentaciones de EDGAR a 21-10-2026: sin Form 3 suyo (los únicos Form 3 de 2026 son de Jeddi y Wadors, 5-2-2026)';
c.huecos.push({ seccion: 'directivos', campo: 'historial_guidance 2026 (real)', tipo: 'Complemento', intentos: '1) Nota del 3T26: guía de octubre y datos de enero-septiembre; 2) Notas del 4T25, 1T26 y 2T26: guías de enero, abril y julio; 3) El ejercicio no ha terminado', decision: 'Calculado y marcado como estimación' });
c._estado = 'terminado';
fs.writeFileSync(f, JSON.stringify(c, null, 2));

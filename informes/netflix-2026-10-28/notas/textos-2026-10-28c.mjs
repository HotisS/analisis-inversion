// Tercera pasada de textos.mjs (28-oct): riesgo de IA obligatorio (faltaba) y confianza de rentabilidad. Se ejecuta una vez.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const f = join(dirname(fileURLToPath(import.meta.url)), 'textos.mjs');
let t = readFileSync(f, 'utf8');
const r = (a, b) => { if (!t.includes(a)) throw new Error('No encuentro: ' + a.slice(0, 60)); t = t.replace(a, b); };

r('Paramount DTC perdió dinero en 2024 [B9, B10].`,\n};', 'Paramount DTC perdió dinero en 2024 [B9, B10].`,\n  confianza: \'Alta\',\n};');
const ia = "  ia: { exposicion: 'Media', sentido: 'Mixto', efecto_valor: '−10 % a +5 %', comentario: `La IA toca a Netflix por los dos lados. Como amenaza, abarata la producción de vídeo y multiplica la oferta de los creadores, que ya ganan tiempo de televisión: YouTube tiene el 14,2 % del tiempo de televisión en EE. UU. frente al ≈ 8-9 % de Netflix [B13]; si el vídeo generado baja aún más el coste de llenar la pantalla, el catálogo caro de Netflix pierde parte de su ventaja de escala. Como oportunidad, rebaja el coste de los efectos, el doblaje y los subtítulos (la amortización de contenidos es el 36 % de las ventas) y mejora la recomendación y la publicidad dirigida [A1, A14]. Nuestro bajista (−40,5 %) recoge un freno de altas y precios que incluye este riesgo; asignamos −10 % al valor si la cuota de tiempo cae por debajo del 7,5 % y +5 % si el coste de los contenidos crece claramente menos que las ventas. Señal: cuota de Netflix en The Gauge de Nielsen y ratio de pagos de contenidos sobre amortización.` },\n";
r('  premortem: `Octubre de 2029', ia + '  premortem: `Octubre de 2029');
writeFileSync(f, t);
console.log('textos.mjs: riesgo de IA y confianza añadidos');

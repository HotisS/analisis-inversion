// Nota E (sentimiento en foros) de Elevance Health, 26-oct-2026. Lecturas del 26-oct: RSS de Seeking Alpha de ELV
// (titulares y análisis de jul-oct), flujo de Stocktwits de ELV (30 mensajes del 8 al 24-oct), SentiSense (Reddit, X,
// noticias, 30 días) y cambios de recomendación de MarketBeat del 22-23 oct. Reddit no se abre desde la nube (bloqueo).
// Ninguna cifra sale de aquí. Escribe notas/E.json.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const aqui = dirname(fileURLToPath(import.meta.url));

const fuentes = [
  { id: 1, titulo: 'Elevance Health: Better Results, But Not Enough To Buy; Why I Don\'t Believe In The Stock At This Price; Has Upside, But Not Yet A Buy (análisis de autores externos, titulares y entradillas del RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://seekingalpha.com/api/sa/combined/ELV.xml' },
  { id: 2, titulo: 'ELV: flujo de mensajes (30 mensajes, 8 a 24 de octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-24', url: 'https://stocktwits.com/symbol/ELV' },
  { id: 3, titulo: 'Elevance Health, Inc. (ELV) Sentiment: Bullish or Bearish? (30 días: noticias, X, Reddit y YouTube)', editor: 'SentiSense', tipo: 'Foros y redes', fecha: '2026-10-26', url: 'https://app.sentisense.ai/stocks/ELV/sentiment' },
  { id: 4, titulo: 'Elevance Health (ELV) Stock Forecast & Price Target: cambios de recomendación del 22 y 23 de octubre de 2026', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-23', url: 'https://www.marketbeat.com/stocks/NYSE/ELV/forecast/' },
];

const sentimiento = {
  tono: 'Dividido',
  tendencia: 'Mejora',
  revisadas: [
    { plataforma: 'Seeking Alpha (análisis de autores)', fecha: '2026-10', n_comentarios: 3, tono: 'Negativo', resumen: 'Los tres análisis desde julio no recomiendan comprar: el del 21-oct reconoce mejores resultados pero «no suficientes para comprar» y el del 19-oct no ve valor a este precio; en julio, «potencial, pero aún no es compra» [1].' },
    { plataforma: 'Seeking Alpha (noticias del valor)', fecha: '2026-10', n_comentarios: 20, tono: 'Neutro', resumen: 'Los titulares de agosto a octubre mezclan buenas noticias propias (guía subida, encuesta de UBS a empleadores que pone a Elevance primera) con regulación adversa: bajas en el ACA, transparencia de precios y primas de Medicare Advantage que bajan en 2027 [1].' },
    { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Mensajes sobre todo informativos alrededor de los resultados; pocos marcados (3 alcistas, ningún bajista). Se celebra que el coste de Medicare Advantage está bajo control, pero se señala que la mejora vino de la renta de inversiones, la caída del final del 21-oct y la venta de acciones del director financiero [2].' },
    { plataforma: 'SentiSense (Reddit, X, noticias y YouTube)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Tono «ligeramente alcista» a 30 días pero enfriándose: alcista en noticias y X, neutro en Reddit y YouTube; el tema principal es que la mayor parte del batido de BPA fue no operativo [3].' },
  ],
  temas: [
    { tema: 'Calidad del batido del 3T26', postura: 'Bajista', peso: 'Alto', contraste: 'Con razón: el BPA ajustado de 6,99 USD incluye ganancias no operativas netas de 1,85 USD (valoración de inversiones); sin ellas habría sido ≈ 5,14 USD, aún por encima del consenso de 4,71 USD. El informe trata esa renta como no recurrente en 2026.' },
    { tema: 'El coste médico de Medicare Advantage está bajo control', postura: 'Alcista', peso: 'Alto', contraste: 'Las cifras lo apoyan: el ratio de prestaciones bajó 70 pb al 90,6 % y la dirección habla de tendencia «elevada pero estable», como UnitedHealth una semana antes. Medicaid sigue siendo el punto débil (2026 es el suelo de margen).' },
    { tema: 'Precio ya en máximos de 52 semanas', postura: 'Bajista', peso: 'Medio', contraste: 'Razonable: la acción sube un 27 % en el año y cotiza a ≈ 14,5 veces el BPA ajustado de 2027e, en línea con su mediana de cinco años; el descuento que veían los inversores de valor en primavera ya no existe.' },
    { tema: 'Venta del director financiero (22-oct)', postura: 'Bajista', peso: 'Bajo', contraste: 'Venta de 4,66 M USD sin plan 10b5-1 un día después de subir la guía; es su primera venta relevante y en julio la consejera delegada y el presidente compraron. Señal débil: se registra en `bolsa.contexto` como «no cambia».' },
    { tema: 'Regulación: ACA, Medicaid y primas de Medicare Advantage 2027', postura: 'Bajista', peso: 'Medio', contraste: 'Riesgo real y recogido en el informe: la ley H.R. 1 y el fin de los subsidios del ACA restan afiliados en 2027, y Elevance lo compensa con salidas de mercados y precios.' },
  ],
  lectura: 'El sentimiento no es extremo y sigue por detrás de los analistas. Los particulares y los autores de Seeking Alpha reconocen la mejora del coste médico pero dudan de la calidad del batido (casi un tercio del BPA del trimestre fue renta de inversiones no operativa) y de comprar en máximos de 52 semanas. Los analistas, en cambio, subieron objetivos el 22-23 de octubre (UBS a 523, TD Cowen a 495, Guggenheim a 485, Morgan Stanley a 449, RBC a 455; Baird a 406 con «neutral») [4]. Nada de lo que se lee añade un riesgo que el informe no tenga; refuerza dos cautelas: no capitalizar la renta de inversiones de 2026 y no pagar por la recuperación de 2027 antes de verla en los márgenes de Medicaid.',
  confianza: 'Media',
};

const E = {
  _estado: 'completa (26-oct-2026): Seeking Alpha (RSS), Stocktwits (API pública), SentiSense y MarketBeat leídos hoy; Reddit bloqueado desde la nube (se lee vía SentiSense). Ninguna cifra del informe sale de aquí.',
  sentimiento,
  fuentes,
  huecos: [
    { seccion: 'sentimiento', campo: 'Hilos de Reddit leídos directamente', tipo: 'Complemento', intentos: '1) reddit.com/search.json (bloqueado desde la nube); 2) búsqueda web de hilos sobre el 3T26 (sin resultados del mes); 3) agregado de SentiSense (Reddit neutro a 30 días)', decision: 'Calculado y marcado como estimación' },
  ],
};
writeFileSync(join(aqui, 'E.json'), JSON.stringify(E, null, 2));
console.log('E.json', E.sentimiento.revisadas.length, 'sitios', E.sentimiento.temas.length, 'temas');

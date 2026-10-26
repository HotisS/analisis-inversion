// Nota E (Sentimiento) de Eni, corte 2026-10-26. Opiniones, no cifras. Cita solo con [n] de su propia lista.
// Ejecutar: node informes/eni-2026-10-26/notas/nota-e.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));

const fE = [
  { id: 1, titulo: 'Eni S.p.A. (E): artículos y noticias en Seeking Alpha (RSS), ago-oct 2026: «I Sold Out In Early/Mid-2026 And Why I Won\'t Buy Back Here (Downgrade)» (24-oct), «Upside In Shareholders\' Return And Satellite Strategy Keep The Buy Case Intact» (14-oct), «Eni\'s Windfall Tax Scare Explained» (31-ago)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-24', url: 'https://seekingalpha.com/symbol/E' },
  { id: 2, titulo: 'Stocktwits, flujo de mensajes de $E (jul-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-24', url: 'https://stocktwits.com/symbol/E' },
  { id: 3, titulo: 'Azioni Eni, previsioni e dividendo straordinario 2026: il CdA decide il 22 ottobre, conti il 23', editor: 'Rankia Italia', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://rankia.it/azioni-eni-previsioni/' },
  { id: 4, titulo: 'E News Today: Why did ENI stock go up today? (resumen de noticias y reacción tras los resultados)', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-10-24', url: 'https://www.marketbeat.com/stocks/NYSE/E/news/' },
];

const E = {
  _estado: 'Parcial: Seeking Alpha (titulares y noticias), Stocktwits, Rankia Italia y MarketBeat; FinanzaOnline da 403 y Money.it pide verificación de Cloudflare; Reddit no se intentó (403 conocido).',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de opinión y noticias)', fecha: '2026-10', n_comentarios: 15, tono: 'Dividido', resumen: 'Dos tesis opuestas en diez días: una mantiene el «comprar» por la retribución y los satélites (14-oct) y otra, tras los resultados, explica por qué el autor vendió en 2026 y no recompra a estos precios (24-oct). En agosto, la conversación giró sobre un posible impuesto italiano a los beneficios extraordinarios [1].' },
      { plataforma: 'Stocktwits ($E)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Poco debate y casi todo alcista: celebra el beneficio del 3T26 por encima del consenso y los máximos de 52 semanas; ningún mensaje bajista con argumentos [2].' },
      { plataforma: 'Rankia Italia (artículo de previsión)', fecha: '2026-10', n_comentarios: 0, tono: 'Positivo', resumen: 'Pone el foco en el dividendo extraordinario, la recompra (más de la mitad ejecutada a 9-oct) y el Brent por encima de 100 USD; recuerda que la subida del año (+52 % al 8-oct) ya descuenta mucho [3].' },
      { plataforma: 'MarketBeat (noticias y reacción)', fecha: '2026-10', n_comentarios: 0, tono: 'Positivo', resumen: 'Atribuye la subida a la sorpresa en beneficio, el dividendo extraordinario y la recompra; cita como contrapesos el tope de precios de los carburantes en Italia hasta fin de año y la posible venta de parte de Libia a XRG (ADNOC) [4].' },
    ],
    temas: [
      { tema: 'Dividendo extraordinario y recompra', postura: 'Alcista', peso: 'Alto', contraste: 'Es real: 0,46 EUR de dividendo extraordinario (1,7 % del precio) y recompra de 3.800 M (≈4,8 % de la capitalización). Pero es la política de devolver el exceso de caja por encima de 90 USD de Brent: depende del precio y se reduce cuando el Brent vuelva a la curva de futuros [3, 4].' },
      { tema: 'Brent por encima de 100 USD', postura: 'Alcista', peso: 'Alto', contraste: 'La curva de futuros pone el Brent en 78,8 USD a finales de 2028; el informe proyecta con ella [3].' },
      { tema: 'Impuesto italiano a los beneficios extraordinarios y tope de precios', postura: 'Bajista', peso: 'Medio', contraste: 'El riesgo es real pero, por ahora, acotado: el tope de los carburantes es temporal (hasta fin de año) y el informe recoge en riesgos lo aprobado y lo que se discute en la ley de presupuestos, comprobado en prensa económica y no en los foros [1, 4].' },
      { tema: 'Valoración tras el +80 % en un año', postura: 'Dividida', peso: 'Medio', contraste: 'Coincide con el informe: a 27,65 EUR la acción cotiza en el objetivo medio de los analistas (26,99 EUR) [1].' },
    ],
  },
  fuentes: fE,
};

fs.writeFileSync(path.join(dir, 'E.json'), JSON.stringify(E, null, 2) + '\n', 'utf8');
console.log('Nota E escrita');

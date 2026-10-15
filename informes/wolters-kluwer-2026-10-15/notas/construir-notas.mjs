// Iteración del 15-oct-2026 sobre las notas del 8-oct (copiadas de informes/wolters-kluwer-2026-10-08/notas).
// A, B y C no cambian: no hay cuentas nuevas desde el 1S26 (5-ago-2026); el XBRL ESEF de 2020-2025 se ha vuelto a bajar
// (cuentas-xbrl.json) y cuadra con A (ingresos, EBIT, beneficio; la deuda de A incluye la de corto plazo que el XBRL no trae).
// D: precio, bolsa, consenso, comparables y tasa libre a 14/15-oct. E: sentimiento (nuevo).
// Uso: node informes/wolters-kluwer-2026-10-15/notas/construir-notas.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const dir = fileURLToPath(new URL('.', import.meta.url));
const leer = (n) => JSON.parse(readFileSync(dir + n, 'utf8'));
const D = leer('D.json');
const B = leer('bolsa.json');

// --- identificación (cierre del 14-oct: la sesión del 15 no había cerrado a las 11:17 UTC)
Object.assign(D.identificacion, {
  precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio,
  max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s,
  volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses)`,
  capitalizacion_publicada: 17400, proximos_resultados: '2026-11-04',
});

// --- bolsa
const com = D.bolsa.comentario;
D.bolsa = { ...D.bolsa, ...B.bolsa, posicion_corta_pct: D.bolsa.posicion_corta_pct, confianza: 'Alta' };
D.bolsa.comentario = 'En un año la acción ha perdido un 26,0 % con dividendos, frente al +20,6 % del ETF del AEX y el +0,4 % del ETF de medios europeo; en lo que va de año, −8,0 % frente a +21,2 % [5]. La caída máxima de cinco años, del −67,8 %, va del 12-feb-2025 al 13-may-2026 [5]. Es sobre todo una caída de múltiplo y del sector. El 3-feb-2026 cayó un 12,7 %, el mismo día que RELX (−14,4 %), Thomson Reuters (−15,7 %) y LSEG (−12,8 %) [5, 18], cuando Anthropic presentó herramientas de IA para el trabajo jurídico [17]. Hubo dos caídas propias: −7,3 % el 6-may-2026, con el avance del primer trimestre [13], y −7,8 % el 6-nov-2025, tras el avance de nueve meses [12]. Desde el mínimo del 25-jun-2026 (54,64 EUR) ha subido un 43 %, y un 8,7 % solo entre el 8 y el 14 de octubre, en bloque con RELX (+6,9 %), Experian (+4,7 %) y Thomson Reuters (+3,8 %) [5, 42], mientras los analistas hablaban de que el miedo a la disrupción por IA se enfriaba en el software [43]. El 21-sep-2026 salió del EURO STOXX 50 en la revisión anual (entró Engie) [44]: la venta forzosa de los fondos indexados ya ha pasado. No hay posiciones cortas netas declaradas a la AFM por encima del 0,5 % [16].';

// --- consenso (MarketScreener, 15-oct-2026)
const est = { '2026e': [6282, 2096, 1762, 5.19, 2.70], '2027e': [6639, 2231, 1884, 5.69, 2.95], '2028e': [7004, 2370, 2002, 6.34, 3.25] };
D.consenso.estimaciones = Object.entries(est).map(([periodo, [ingresos, ebitda, ebit, bpa, dpa]]) => ({ periodo, ingresos, ebitda, ebit, bpa, dpa, fuente: 'MarketScreener, 16 analistas, 15-oct-2026 [7]' }));
D.consenso.recomendaciones = { n_analistas: 16, comprar: 12, mantener: 3, vender: 1, po_medio: 89.91, po_min: 56, po_max: 120 };
D.consenso.revisiones = 'No hay serie gratuita de revisiones con cifras: MarketScreener solo las publica como gráficos [8]. Frente al 8-oct las estimaciones apenas se mueven (BPA 2026e 5,19 frente a 5,18; 2028e 6,34 frente a 6,32) y el precio objetivo medio sube de 89,78 a 89,91 EUR con un mínimo que pasa de 54 a 56 EUR [7, 8]. Tras los resultados semestrales del 5-ago-2026 UBS y Goldman Sachs se quedaron en neutral (Goldman con 71 EUR de objetivo) mientras Deutsche Bank y Bernstein mantenían compra; KBC Securities recortó su precio objetivo el 25-ago sin cambiar la recomendación; TD Cowen empezó a cubrir con compra el 11-sep y Bernstein reiteró compra el 7-oct [8]. El BPA del consenso es el NIIF (5,64 EUR en 2025 con la plusvalía de FRR), no el ajustado de la empresa (5,29 EUR en 2025) [7, 10]. El objetivo medio queda un 15 % por encima de la cotización, con un rango muy ancho (56-120 EUR): los analistas discrepan sobre cuánto daño hará la IA [8, 9].';

// --- comparables: llevados del 8 al 14-oct con la variación de precio en su divisa (cierres de Yahoo [42])
const px = { 'REL.L': [2595, 2775], TRI: [101.55, 105.40], 'LSEG.L': [8470, 8398], VRSK: [175.49, 180.58], 'EXPN.L': [2574, 2696], INTU: [303.88, 310.44], VEEV: [284.84, 297.35], IT: [195.41, 195.77] };
for (const e of D.comparables.empresas) {
  const p = px[e.ticker]; if (!p) continue;
  const r = p[1] / p[0];
  const evOld = e.capitalizacion / (1 - (e.dn_ebitda || 0) / e.ev_ebitda_ltm);
  const evNew = evOld + e.capitalizacion * (r - 1);
  const k = evNew / evOld;
  e.capitalizacion = Math.round(e.capitalizacion * r);
  for (const m of ['ev_ventas', 'ev_ebitda_ltm', 'ev_ebitda_ntm']) if (e[m] != null) e[m] = Math.round(e[m] * k * 100) / 100;
  if (e.per_ntm != null) e.per_ntm = Math.round(e.per_ntm * r * 10) / 10;
  if (e.fcf_yield_pct != null) e.fcf_yield_pct = Math.round(e.fcf_yield_pct / r * 10) / 10;
}
D.comparables.criterio += ' Cifras del 8-oct-2026 llevadas al cierre del 14-oct con la variación de precio de cada acción en su divisa (el EV con la deuda neta del 8-oct; el BPA y el EBITDA estimados no cambian en una semana) [42].';

// --- tasa libre a la fecha del precio
D.dcf = { ...D.dcf, wacc: { ...D.dcf.wacc, tasa_libre_pct: 3.51 } };

// --- fuentes: fechas nuevas y tres fuentes añadidas
const fu = (id, cambios) => Object.assign(D.fuentes.find((f) => f.id === id), cambios);
fu(5, { fecha: '2026-10-14', titulo: 'Históricos diarios de WKL.AS, IAEX.AS y EXH6.DE (herramientas/bolsa.mjs, corte 15-oct-2026: cierre del 14-oct)' });
fu(7, { fecha: '2026-10-15' }); fu(8, { fecha: '2026-10-15' });
fu(14, { fecha: '2026-10-14' }); fu(15, { fecha: '2026-10-14', titulo: 'Tipos de cambio de referencia del euro, 14-oct-2026' });
D.fuentes.push(
  { id: 42, titulo: 'Cierres diarios 6-15 oct 2026 de WKL.AS, REL.L, TRI, LSEG.L, VRSK, EXPN.L, INTU, VEEV e IT (API chart)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://query1.finance.yahoo.com/v8/finance/chart/WKL.AS' },
  { id: 43, titulo: 'US software stocks scale fresh 2026 highs as AI disruption worries fade (Reuters)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://www.investing.com/news/stock-market-news/us-software-stocks-scale-fresh-2026-highs-as-ai-disruption-worries-fade-4934831' },
  { id: 44, titulo: 'STOXX Blue-chip indices composition changes (Sep 01, 2026): EURO STOXX 50, alta de Engie y baja de Wolters Kluwer, efectiva el 21-sep-2026', editor: 'STOXX', tipo: 'Primaria', fecha: '2026-09-01', url: 'https://stoxx.com/stoxx-blue-chip-indices-composition-changes-sep-01-2026/' },
);
D.notas_integrador = (D.notas_integrador || '') + ' | 15-oct: precio, bolsa, consenso, comparables y Bund actualizados por construir-notas.mjs; puente y acciones sin cambio (no hay balance nuevo; recompras del 17-sep al 14-oct de pocas acciones).';
writeFileSync(dir + 'D.json', JSON.stringify(D, null, 2));

// --- E: sentimiento (últimos 3 meses; sin nombres de usuario)
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits (WTKWY)', fecha: '2026-09', n_comentarios: 8, tono: 'Positivo', resumen: 'Pocos mensajes y casi todos de particulares que compran o promedian a la baja («la venta es teórica, por miedo a la IA, no por cifras»); el único hecho comentado en septiembre es la salida del EURO STOXX 50 [1].' },
      { plataforma: 'Seeking Alpha (análisis de colaboradores)', fecha: '2026-09', n_comentarios: 4, tono: 'Positivo', resumen: 'Tres artículos de julio a septiembre, todos alcistas («compra antes de que desaparezca el descuento por IA», «compounder infravalorado», «el negocio de la verdad que la IA no reemplaza») [2].' },
      { plataforma: 'De Belegger (blog neerlandés de inversión)', fecha: '2026-10', n_comentarios: 3, tono: 'Neutro', resumen: 'Artículos de septiembre y octubre que piden pruebas: la IA tiene que traducirse en ingresos pagados, retención y caja; si no, el gasto en desarrollo es una defensa cara. Sin comentarios de lectores [3].' },
      { plataforma: 'Simply Wall St (narrativas de la comunidad)', fecha: '2026-10', n_comentarios: 6, tono: 'Dividido', resumen: 'La narrativa más seguida pone el valor razonable en unos 71 EUR (cerca del precio) y otra en 50 EUR, con el argumento de que el gasto en IA y las recompras no sostienen el múltiplo [4].' },
      { plataforma: 'Investing.com (noticias y consenso)', fecha: '2026-08', n_comentarios: 3, tono: 'Dividido', resumen: 'Tras el semestre, el debate se centra en si la adopción de UpToDate Expert AI se traduce en precio; Morningstar la ve positiva pero de efecto gradual [5].' },
    ],
    temas: [
      { tema: 'La IA generativa sustituye a UpToDate y al contenido jurídico', postura: 'Dividida', peso: 'Alto', contraste: 'Los datos del 1S26 no muestran sustitución en el grupo (recurrentes +7 % orgánico, renovaciones sólidas), pero Clinical Solutions bajó del 6 % al 5 % y la parte más expuesta es la que más se frena ' },
      { tema: 'Valoración: «PER de un dígito» y descuento histórico', postura: 'Alcista', peso: 'Alto', contraste: 'La cifra de algunos foros (PER de 6-7) no cuadra: a 78 EUR la acción cotiza a unas 15 veces el BPA NIIF de 2026e y 13,7 veces el de 2027e del consenso El descuento frente a su historia (25-28 veces adelantado) sí es real.' },
      { tema: 'Recompras y dividendo', postura: 'Alcista', peso: 'Medio', contraste: 'Las recompras de 2026 (hasta 500 M) son la mitad que en 2025 y en septiembre-octubre casi se pararon: quedan unos 236 M para antes del 28-dic ' },
      { tema: 'Salida del EURO STOXX 50', postura: 'Dividida', peso: 'Bajo', contraste: 'Efectiva el 21-sep-2026, la venta de los fondos indexados ya ocurrió y la acción ha subido desde entonces.' },
    ],
    lectura: 'El particular que escribe es más alcista que el analista: en Stocktwits y Seeking Alpha casi todo es compra por descuento, mientras el consenso tiene 3 mantener y 1 vender y objetivos de 56 a 120 EUR. No hay euforia: hay poco debate y el tono cambia con cada caída sectorial por noticias de IA. Los foros no traen un riesgo que el informe no tenga; sí repiten una cifra de PER equivocada, que no usamos. Aporta poco a la decisión: confirma que el precio lo mueve el relato de la IA y no las cifras trimestrales.',
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Stream de mensajes de WTKWY (API pública)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/WTKWY.json' },
    { id: 2, titulo: 'Wolters Kluwer N.V.: News and Analysis (RSS): artículos de jul-sep 2026', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://seekingalpha.com/api/sa/combined/WTKWY.xml' },
    { id: 3, titulo: 'AI moet bij Wolters Kluwer nu betaalde omzet opleveren', editor: 'De Belegger', tipo: 'Foros y redes', fecha: '2026-10-01', url: 'https://www.debelegger.nl/post/ai-moet-bij-wolters-kluwer-nu-betaalde-omzet-opleveren' },
    { id: 4, titulo: 'Wolters Kluwer (ENXTAM:WKL): narrativas de la comunidad', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://simplywall.st/stocks/nl/commercial-services/ams-wkl/wolters-kluwer-shares' },
    { id: 5, titulo: 'Wolters Kluwer Earnings: UpToDate Expert AI Adoption Positive, But Impact Will Be Gradual', editor: 'Morningstar', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://www.morningstar.com/company-reports/1493805-wolters-kluwer-earnings-uptodate-expert-ai-adoption-positive-but-impact-will-be-gradual' },
  ],
  huecos: [],
};
writeFileSync(dir + 'E.json', JSON.stringify(E, null, 2));
console.log('D y E escritos');

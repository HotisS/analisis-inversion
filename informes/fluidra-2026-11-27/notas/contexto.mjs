// Bolsa a 26/27-nov-2026 (bolsa.mjs y movimiento.mjs), regla 13 (precio y noticias), riesgo de IA y narrativas de los escenarios.
// Citas: [D1] Yahoo; [D9] Stock Analysis previsiones; [D39] cortos CNMV; [D41-D44] recompra y prensa de analistas;
// [A2-A7] documentos del 1S26; [C10-C12] CFO y Puig; [E9] Leslie's; [P3-P8] prensa propia; [A13-A16] documentos de los nueve meses.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const b = JSON.parse(readFileSync(join(aqui, 'bolsa.json'), 'utf8'));

export const fuentesP = [
    { id: 3, titulo: 'Fluidra registra la mayor caída del IBEX, de más del 5 %, tras recortar su precio Citi', editor: 'EFE / Investing.com España', tipo: 'Prensa', fecha: '2026-03-09', url: 'https://news.google.com/rss/articles/CBMi1gFBVV95cUxOdTRzc20xSlNlenhLdFprdDdoVXF0ak5iazJHZW42S2wzSTU1S0lWUEVpdm1EMXRqZnNXcHBPV2ZUbWRKU05RQ2gwVHZIX2RXVnFmRFhncWMxOXd4OFF0TkRCTlY2WlJ1Q3N1MFpqbGJsc3lmcjlqYk5hdEJOelBsbkFEVHB3U2lwcDF4STAwUXJFbnZIMnZqaHJ1aHFYT01XRk5KM3Uta3NTejAxdk5lelRfMHNHZFY3Njk0UWpGZjhvMjFtRlBCOG0teVI3Q3J2X1lBVm1n' },
    { id: 4, titulo: 'Barclays enfría Fluidra por los inventarios en Estados Unidos, pero aún ve potencial', editor: 'Benzinga España', tipo: 'Prensa', fecha: '2026-05-22', url: 'https://news.google.com/rss/articles/CBMipgFBVV95cUxNTHoyM2prNUV5VzJ6Zl83ejctbDluRG1lV241M1AwTlVnR0hLeFRqSmNKcFBjT01NQlRTWVlCeG1pb1VyY0VjMExKeWxkMGc0ODN5TjVRWDVNbzRDeU5UR2RYMm9IMllleUZyRFFUaVFobXhXV1F3djN1UUNXYWhMandaWVFjd1ViMWp6ZnpJU0lkNlByZDQybUxFUGdPZjBTM1luMUZB' },
    { id: 5, titulo: 'Fluidra cae arrastrada por Pentair, que se desploma tras decepcionar con sus cuentas y reducir previsiones', editor: 'Bolsamanía', tipo: 'Prensa', fecha: '2026-07-15', url: 'https://news.google.com/rss/articles/CBMi1gFBVV95cUxPQ2hqbG4zd3JRSzNhcFBDUC1uRXFwUzdWXzJDaDc0ZnFNWVJ1NFlWMUtxbkttQlJMTFpDOWpjdUhITmhVdnFFRkNhTFoycUJxU0g5ampOUThEQ3FBSS1OUUtUYTRHQ3I1Nm1DNUN4azQ1UE4wV1Z1U1hUbWpMR1I1ekh4WGZaZkJ3eHpMUVZ1QU1IME80ZFlSc2E5MGMycnF2RS0xRWpxR0U5T1ROOE9qTzVXSWNkVXZ1TlRiV1VCWllrc2FSMkwyR1c4bW1TTGtNNnRyVzNR' },
    { id: 6, titulo: 'Fluidra lleva a juicio a la china Wybotics por copiar sus robots limpiapiscinas', editor: 'elEconomista', tipo: 'Prensa', fecha: '2026-06-16', url: 'https://news.google.com/rss/articles/CBMi3wFBVV95cUxPOExNd1ZnWUdQb2EtSTBZZGRXYkhiSU1ERzdNalNWU0hUQXhHZTYzU3NBcWNmb1pBT1NwTFpoM21CMExEYTRFNWhvM0xzUk5rQVpndHBNQkpHX2lraWNLRzA1OVBNX0NBX2ZaZ3d1eXpJT2Q2OE5XVlBXWFlEWEJ5dm9QR0RBRmh4dzJMVC16VURkdGtlb0d0d2JYZVNIbkcxc3R6RFF0cGpOSmo0SG1iX08zRXJBUXFMd1J3Zml5eHphdDYyUDJxbzByRk02b2dYT040OWN3QlRQMnBXUG9j' },
    { id: 7, titulo: 'Fluidra signs agreement to acquire Hydrapro from Ydéo Group', editor: 'EuroSpaPoolNews', tipo: 'Prensa', fecha: '2026-09-04', url: 'https://news.google.com/rss/articles/CBMitgFBVV95cUxOalM1S1J2bVJKamQ1N2d6bmw4ME9iVlhRWWtWMS1lZ0JOLVFPTGlpX1FpNERVQW8tU2tfMl9zbFBRelBieDY5SGh5U216NS1UbkZlM3JxNGFmUXBjX0tYM3dmSmxPRkJCYlRQeVB5UFl3Tm9XeHZMWmtXSVBIM2RKM3FWQVdNaWloWW1MSGxsUE02amE2TS1fMTVkMUNfa3F1MjB2M1ZCQ3NXUndacFVnTDFQQ2VGQQ' },
    { id: 8, titulo: 'Fluidra adquiere Datapool para liderar la digitalización y eficiencia en el sector de las piscinas', editor: 'Fluidra (nota de prensa) / Capital-Riesgo.es', tipo: 'Primaria', fecha: '2026-05-29', url: 'https://www.fluidra.com/press-room/' },
];

export const contexto = {
  bolsa: {
    tipo_rentabilidad: b.bolsa.tipo_rentabilidad,
    rentabilidades: b.bolsa.rentabilidades,
    anual: b.bolsa.anual,
    beta: 1.10,
    volatilidad_pct: b.bolsa.volatilidad_pct,
    max_drawdown_pct: b.bolsa.max_drawdown_pct,
    posicion_corta_pct: 0.49,
    comentario: 'Fluidra pierde un 23,0 % en un año frente a una subida del 16,5 % del IBEX 35 y del 3,5 % del ETF sectorial europeo (EXH4), y cierra el 26 de noviembre en 18,70 EUR, un 10,6 % por encima del mínimo de 52 semanas (16,91 EUR, 8-oct) y un 29 % por debajo del máximo de 26,22 EUR del 11-feb [D1]. Las caídas del año vinieron de los resultados de 2025 (26-feb, −6,2 % en la sesión), del recorte de Citi (9-mar), de un primer trimestre flojo y de la rebaja de Barclays en mayo [D1, P3, P4]. Desde el mínimo de octubre rebota un 10,6 %: los nueve meses (29-oct) confirmaron la guía estrechada (+1,1 % ese día) y los rivales de EE. UU. subieron con fuerza tras sus propios resultados del tercer trimestre (Pool Corp, Hayward y Pentair, un 30-36 % desde mediados de octubre, frente al +6 % de Fluidra) [D1, D17-D21]. La beta de 1,10 es la del STOXX Europe 600 (frente al IBEX, 0,92). Posiciones cortas: ninguna por encima del 0,5 % a 26-nov (Connor, Clark & Lunn baja al 0,49 %) [D39].',
    contexto: {
      movimiento: {
        fecha: '2026-11-27', var_1m_pct: -0.3, var_3m_pct: -0.4, var_6m_pct: 1.4, var_12m_pct: -20.2,
        dist_max_52s_pct: -27.3, dist_min_52s_pct: 10.9, dist_max_historico_pct: -46.4, tendencia: 'bajista',
        volatilidad_60d_pct: 22.1, avisos: [],
      },
      movimientos_fuertes: [
        { periodo: 'oct-nov-2026', var_pct: 15.3, causa: 'Rebote desde el mínimo de 52 semanas (16,91 EUR el 8-oct) hasta 19,86 EUR el 4-nov: entrada de Magallanes y mejora de Bestinver a comprar (octubre), resultados de nueve meses en línea con la guía estrechada (29-oct, +1,1 %) y subida del 4,7 % el 2-nov sin noticia propia localizada, en plena revalorización de los rivales de EE. UU. tras sus resultados del 3T (Hayward de 12,7 a 16,1 USD y Pentair de 55 a 66 USD en la semana del 26-oct) [D1, D17-D21, D42, E8]. Desde entonces devuelve parte (18,03 EUR el 20-nov).', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-2026', var_pct: -10.0, causa: 'Caída de un mes hasta el 24-sep: Leslie\'s, la mayor cadena minorista de piscina de EE. UU., prepara un capítulo 11 [E9], y el sector seguía castigado desde el recorte de Pentair de julio [P5]. Recogido en riesgos (exposición pequeña: Fluidra vende sobre todo a distribuidores).', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr-may-2026', var_pct: -12.3, causa: 'Primer trimestre con ventas planas en euros (+5,4 % a tipo constante) y EBITDA ajustado de 124 M (22,0 %, frente al 23,2 %), con más opex y más reestructuración; después Barclays rebajó a mantener por los inventarios del canal en EE. UU. [A4, A5, P4]. Recogido en el bajista.', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb-mar-2026', var_pct: -12.8, causa: 'Resultados de 2025 (26-feb: −6,2 %) con una guía de 2026 de +3 % a +7 % a tipo constante y el dólar en contra; el 9-mar Citi recortó su objetivo (−5,1 %) [D1, A6, P3].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-11-26', tipo: 'demanda o regulador', hecho: 'Posiciones cortas: Connor, Clark & Lunn baja del 0,60 % al 0,49 % y AQR ya no figura; ninguna posición viva por encima del 0,5 % [D39].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-29', tipo: 'resultados', hecho: 'Nueve meses: ventas +4,3 % a tipo constante, EBITDA ajustado 428 M (24,1 %), beneficio −5,9 % por la reestructuración (40 M frente a 13 M) y **guía estrechada recortando la parte alta**: ventas +3,5/+5,5 % (antes +3/+7 %), margen ajustado 23,3-23,5 % (antes 23,3-24,3 %) y BPA ajustado +5/+9 % (antes +4/+13 %) [A13, A15]. El informe ya proyectaba el margen en la parte baja-media; esta versión baja tres décimas el margen de 2027e-2029e. No es un recorte de la parte baja ni un deterioro del negocio.', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-29', tipo: 'resultados', hecho: 'En la conferencia, subida de precios del 3,5-5 % en EE. UU. y del 2 % en Europa para 2027; sin guía de 2027; las devoluciones de aranceles (6 M netos en el 3T) son puntuales [A14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-19', tipo: 'recomendación', hecho: 'Barclays (mantener) baja su objetivo de 20 a 19 EUR, el más bajo de los 15 analistas; el 15-oct JP Morgan lo sube a 28 EUR y el 7-oct Bestinver pasa a comprar [D42-D44]. Objetivo medio sin cambios en 25,93 EUR a 27-nov [D8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-15', tipo: 'accionista de referencia', hecho: 'Magallanes Value Investors entra en el capital [E8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-24', tipo: 'demanda o regulador', hecho: "Leslie's prepara un capítulo 11 [E9]; Fluidra no publicó exposición ni provisión en los nueve meses [A13].", veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-18', tipo: 'directivos', hecho: 'Fin de la recompra de 40 M: 2.071.424 acciones (1,08 % del capital) [D41].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-04', tipo: 'fusión u oferta', hecho: 'Acuerdo para comprar Hydrapro (Francia, unos 30 M de ventas), que cerrará a principios de 2027; antes, Riaan Pool, Datapool y Variopool: compras pequeñas a 5-6,5 veces EBITDA [A7, A14, P7, P8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-28', tipo: 'directivos', hecho: 'Relevo planificado del director financiero: Juan Graham desde el 1-ago-2026 [C10, C11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-27', tipo: 'directivos', hecho: 'Manuel Puig, consejero dominical, compra unos 14 M y supera el 9 % [C12]. Sin ventas de directivos publicadas en 12 meses.', veredicto: 'no cambia', condicion: null },
        { fecha: '2027-02-25', tipo: 'resultados', hecho: 'Resultados de 2026 y primera guía de 2027 (fecha estimada: finales de febrero, como el 26-feb-2026; aún no publicada) [P1, P9]. Ex-dividendo el 8-dic-2026 [P1].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2027-02-25',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción sigue en tendencia bajista de largo plazo (−20 % en 12 meses, un 2,5 % bajo la media de 200 sesiones), pero ha rebotado un 10,6 % desde el mínimo de octubre y se ha quedado atrás de sus rivales de EE. UU., que subieron un 30-36 % tras sus resultados del tercer trimestre. El único hecho nuevo con peso es la guía estrechada del 29-oct, que recorta la parte alta y no la baja: la recoge esta versión (margen de 2027e-2029e tres décimas más bajo y BPA de 2028e de 1,31 a 1,28 EUR). No hay colocación, ampliación, oferta ni decisión regulatoria pendiente que pueda mover el precio más de un 5 % en contra; Rhône (11,7 %) no ha anunciado venta. Los resultados de febrero no aplazan (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  riesgos: {
    ia: {
      exposicion: 'Baja',
      sentido: 'Mixto',
      efecto_valor: '±3 % (estimación propia: los robots limpiafondos, el 6 % de las ventas, son la parte expuesta; equivale a algo menos de medio punto de margen EBITDA)',
      comentario: 'Fluidra vende equipos físicos (bombas, filtros, calentadores, cloradores, robots) instalados por profesionales: la IA no sustituye el producto. Toca dos partes. Los robots limpiafondos (el 6 % de las ventas), donde la navegación con visión e IA de fabricantes chinos como Aiper, Beatbot o Wybotics abarata la innovación y presiona precios; Fluidra responde con su 27 % de Aiper y con demandas por patentes [A1, P6]. Y el software conectado (iAquaLink y Datapool, comprado en mayo de 2026 para gestionar piscinas comerciales con datos), donde la IA puede subir la venta de servicios y la reposición predictiva [P8]. En costes, el centro de servicios de Pune y el plan de eficiencia de 120 M pueden apoyarse en automatización. Señal a vigilar: la caída del precio medio de los robots o del margen bruto por debajo del 55 %.',
    },
  },
};

export const textos2 = {
  escenarios: {
    casos: [
      { escenario: 'Bajista', narrativa: 'La obra nueva en EE. UU. vuelve a caer y Pool Corporation y el resto del canal reducen inventarios en 2027, como en 2023: ventas −5,5 % ese año y margen EBITDA reportado del 19,5-21 %. Los robots chinos y los aranceles impiden recuperar margen hasta 2029.' },
      { escenario: 'Base', narrativa: 'La reposición y el mantenimiento crecen con la base instalada, la obra nueva deja de caer y el plan de eficiencia lleva el margen reportado del 21,0 % de 2026e al 23,5 % en 2030e. Ventas de unos 2.480 M en 2028e, en línea con el consenso.' },
      { escenario: 'Alcista', narrativa: 'Bajan los tipos hipotecarios en EE. UU. y la obra nueva vuelve hacia su media; Fluidra crece 1,5 puntos más al año y llega al margen ajustado de más del 25 % que se ha marcado.' },
    ],
  },
};

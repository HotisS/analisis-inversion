// Bolsa a 19-oct-2026 (bolsa.mjs y movimiento.mjs), regla 13 (precio y noticias), riesgo de IA y narrativas de los escenarios.
// Citas: [D1] Yahoo; [D9] Stock Analysis previsiones; [D39] cortos CNMV; [D41-D44] recompra y prensa de analistas;
// [A2-A7] documentos del 1S26; [C10-C12] CFO y Puig; [E9] Leslie's; [P3-P8] prensa propia de esta iteración.
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
    posicion_corta_pct: 1.1,
    comentario: 'Fluidra pierde un 24,5 % en un año frente a una subida del 22 % del IBEX 35 y del 8,3 % del ETF sectorial europeo (EXH4), y cierra el 19 de octubre en 17,61 EUR, un 3,6 % por encima del mínimo de 52 semanas (16,91 EUR, 8-oct) y un 32 % por debajo del máximo de 26,22 EUR del 11 de febrero [D1]. Las caídas vinieron de los resultados de 2025 (26-feb, −6,2 % en la sesión), del recorte de Citi (9-mar, −5,1 %), de un primer trimestre con el EBITDA ajustado por debajo de lo esperado y de la rebaja de Barclays a mantener en mayo [D1, P3, P4]. La recompra de 40 M (2.071.424 acciones entre el 31-jul y el 17-sep) no frenó la caída [D41]. Desde el mínimo del 8-oct la acción rebota un 4 %, con la entrada de Magallanes y la mejora de Bestinver [D42, E8]. A diez años sube un 15,3 % anual gracias a la fusión con Zodiac y al ciclo de 2020-2021; la caída del 65,8 % entre octubre de 2021 y octubre de 2022 muestra su sensibilidad a la obra nueva en EE. UU. La beta de 1,10 es la del STOXX Europe 600 (frente al IBEX, 0,86). Posiciones cortas netas publicadas: 1,10 % del capital (AQR 0,50 % y Connor, Clark & Lunn 0,60 %) [D39].',
    contexto: {
      movimiento: {
        fecha: '2026-10-19', var_1m_pct: -0.4, var_3m_pct: -2.6, var_6m_pct: -16.0, var_12m_pct: -25.0,
        dist_max_52s_pct: -32.2, dist_min_52s_pct: 3.6, dist_max_historico_pct: -52.4, tendencia: 'bajista',
        volatilidad_60d_pct: 20.2, avisos: [],
      },
      movimientos_fuertes: [
        { periodo: 'feb-2026', var_pct: -12.8, causa: 'Resultados de 2025 (26-feb: −6,2 % en la sesión) con una guía de 2026 de +3 % a +7 % de ventas a tipo constante y el dólar restando unos dos puntos; el 9-mar Citi recortó su objetivo y la acción cayó otro 5,1 % [D1, A6, P3]. El 19-mar cayó un 5,7 % en una sesión de caída general (IBEX −2,3 %) [D1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr-may-2026', var_pct: -12.3, causa: 'Primer trimestre con ventas planas en euros (+5,4 % a tipo constante) y EBITDA ajustado de 124 M (22,0 % de margen, frente al 23,2 % un año antes), con más opex y más reestructuración; después Barclays rebajó a mantener por los inventarios del canal en EE. UU. (de 30 a 20 EUR) [A4, A5, P4]. Recogido en el informe: el bajista repite el desestocaje.', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-19', tipo: 'recomendación', hecho: 'Barclays (mantener desde mayo) baja su objetivo de 20 a 19 EUR [D44]. Es el objetivo más bajo de los 15 analistas (media 25,93 EUR) [D8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-15', tipo: 'recomendación', hecho: 'JP Morgan sube su objetivo a 28 EUR; el 7-oct Bestinver subió a comprar [D42, D43].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-15', tipo: 'accionista de referencia', hecho: 'Magallanes Value Investors entra en el capital en su última rotación de carteras [E8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-24', tipo: 'demanda o regulador', hecho: "Leslie's, la mayor cadena de tiendas de piscina de EE. UU., prepara un concurso de acreedores (capítulo 11) que entregaría la empresa a sus acreedores [E9]. Fluidra vende sobre todo a distribuidores y constructores; no publica su exposición a Leslie's.", veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-18', tipo: 'directivos', hecho: 'Fin de la recompra de 40 M: 2.071.424 acciones (1,08 % del capital) que se amortizarán antes de la próxima junta [D41].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-04', tipo: 'fusión u oferta', hecho: 'Acuerdo para comprar Hydrapro (tratamiento de agua, Francia, unos 30 M de ventas); antes, Riaan Pool (unos 10 M), Datapool (software de gestión de piscinas, mayo) y Variopool (diciembre de 2025): compras pequeñas pagadas a 5-6,5 veces EBITDA según la dirección [A7, P7, P8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-15', tipo: 'resultados', hecho: 'Pentair se desploma tras recortar previsiones y arrastra a Fluidra; dos semanas después Fluidra mantuvo su guía y subió un 3 % con los resultados del semestre [P5, A2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-16', tipo: 'demanda o regulador', hecho: 'Fluidra demanda a la china Wybotics por copiar sus robots limpiafondos [P6]. Litigio ofensivo, sin cuantía relevante para la cuenta.', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-28', tipo: 'directivos', hecho: 'Relevo planificado del director financiero: Juan Graham sustituye a Xavier Tintoré (CFO desde 2010) desde el 1-ago-2026 [C10, C11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-27', tipo: 'directivos', hecho: 'Manuel Puig, consejero dominical, invierte otros unos 14 M y supera el 9 % del capital [C12]. Compra de un consejero: no hay ventas de directivos publicadas en 12 meses.', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-29', tipo: 'resultados', hecho: 'Resultados de los nueve meses de 2026, los primeros con el nuevo director financiero [P1].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-29',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La caída del año (−25 % en 12 meses, tendencia bajista y un 13 % bajo la media de 200 sesiones) tiene causas conocidas y recogidas en el informe: guía de 2026 modesta con el dólar en contra, un primer trimestre flojo y el miedo a los inventarios del canal en EE. UU., avivado por Pentair y por la quiebra de Leslie\'s. No hay un hecho pendiente ajeno al análisis que pueda mover el precio más de un 5 % en contra (no hay colocación anunciada de Rhône, ampliación ni oferta); los resultados del 29-oct no aplazan la decisión (regla 11 de METODO-VIGENTE). Los insiders compran (Manuel Puig) y la empresa recompró. Veredicto: no cambia.',
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
      { escenario: 'Bajista', narrativa: 'La obra nueva en EE. UU. vuelve a caer y Pool Corporation y el resto del canal reducen inventarios en 2027, como en 2023: ventas −5,5 % ese año y margen EBITDA reportado del 19-21 %. Los robots chinos y los aranceles impiden recuperar margen hasta 2029.' },
      { escenario: 'Base', narrativa: 'La reposición y el mantenimiento crecen con la base instalada, la obra nueva deja de caer y el plan de eficiencia lleva el margen reportado del 21,2 % de 2026e al 23,5 % en 2030e. Ventas de unos 2.480 M en 2028e, en línea con el consenso.' },
      { escenario: 'Alcista', narrativa: 'Bajan los tipos hipotecarios en EE. UU. y la obra nueva vuelve hacia su media; Fluidra crece 1,5 puntos más al año y llega al margen ajustado de más del 25 % que se ha marcado.' },
    ],
  },
};

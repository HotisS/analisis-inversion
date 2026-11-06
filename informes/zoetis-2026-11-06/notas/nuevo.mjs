// Bloques del informe del 6-nov-2026 (tras el 3T26). Citas con letra de nota; [P n] = fuentes propias.
export const fuentesPropias = [
  { id: 2, titulo: 'Michael Burry-Backed ZTS Stock / Michael Burry Sells FLUT To Pile Into LULU Under $100 — Plus A New Bet On ZTS', editor: 'Stocktwits News', tipo: 'Prensa', fecha: '2026-09-11', url: 'https://stocktwits.com/news-articles/markets/equity/michael-burry-sells-flutter-to-pile-into-lulu-under-100-plus-a-new-bet-on-zts/cZtXHCxRBbi' },
  { id: 3, titulo: 'Burry flags six stocks as likely tax-loss sale candidates (noticia del canal de ZTS)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://seekingalpha.com/api/sa/combined/ZTS.xml' },
  { id: 5, titulo: 'Zoetis Announces Agreement to Acquire VitalRADS, Accelerating Diagnostic Capabilities (nota de prensa)', editor: 'Zoetis Inc. (Business Wire, vía BioSpace)', tipo: 'Primaria', fecha: '2026-07-14', url: 'https://www.biospace.com/press-releases/zoetis-announces-agreement-to-acquire-vitalrads-accelerating-diagnostic-capabilities' },
  { id: 4, titulo: 'Zoetis (ZTS): cierres, máximos, mínimos y volumen diarios del 6-oct al 5-nov-2026 (chart API)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-05', url: 'https://query1.finance.yahoo.com/v8/finance/chart/ZTS?range=1mo&interval=1d' },
  { id: 6, titulo: 'Movimiento del precio de ZTS a 5-nov-2026 (herramienta movimiento.mjs sobre los históricos de Yahoo Finance)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-05', url: 'https://finance.yahoo.com/quote/ZTS/history/' },
];

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -0.5, precio_pct: -1.0, otros_pct: -0.6,
      comentario: 'Guía del 5-nov: orgánico de −2 % a −1 % y 9.268 M en el punto medio [A22]. En el 3T26 el volumen fue plano y el precio restó un 1 % por los descuentos «del bruto al neto» [A23, A24]. Otros: el cambio de cierre de las filiales internacionales y la divisa, en parte compensados por VitalRADS y VPG. Reparto del año, estimación propia con los datos del 3T.' },
    { periodo: '2027e', volumen_pct: 1.0, precio_pct: -0.5, otros_pct: 0.5,
      comentario: 'Rebajado de +2,0 % a +1,0 % frente al informe del 28-oct: la dirección no supone mejora del consumo ni de la competencia y espera poca venta de los lanzamientos [A24]; el consenso posterior a resultados espera +0,8 % [D43]. Volumen de internacional, ganadería y diagnóstico; el precio neto sigue restando mientras duren los descuentos; otros: compras de diagnóstico del año completo.' },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: 1.0, otros_pct: 0.5,
      comentario: 'Consenso de 9.739 M (+3,7 %) [D7]. Volumen: Cytopoint de larga duración, Simparica Duo, Convenia RTU y Lenivia en EE. UU. [A23, A24]. Precio: Zoetis subió por encima de la inflación hasta 2025 [A1]; suponemos solo un 1 % mientras dura la competencia.' },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0.5,
      comentario: 'Mercado al +2,7 % (IMARC) [B22] y mascotas de Elanco y Merck creciendo [B10, B13]: volumen al ritmo del mercado, sin recuperar cuota; precio como antes de 2026.' },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 1.0, otros_pct: 0.5,
      comentario: 'Vence la patente principal de Apoquel en EE. UU. (abril de 2030) [B23]: el precio aporta menos.' },
  ],
  mercado_final: { periodo: '2035e', tamano: 52419 },
  veredicto: 'Sí',
  justificacion: 'Sí, porque la proyección pide poco: un 2,6 % anual de media en 2026e-2035e, un tercio del 7,6 % de 2016-2025 y cerca del mercado (2,7 % según IMARC, que infravalora las mascotas) [B22]. Apenas exige reinversión neta (el 4 % del NOPAT, con un ROIC del 29 %) y la cuota implícita pasa del 23,6 % al 23,4 %: no hay que ganar a nadie. El foso es estrecho y se estrecha [B1]: el poder de precios demostrado hasta 2025 se ha roto en 2026 (el precio resta un 1 % en el 3T26 [A23]), y por eso el precio aporta −0,5 % en 2027e y solo un 1-2 % después. El motor trata a Zoetis como de reinversión neta baja, así que la prueba se hace con precio y cuota, y las dos pasan. Volver al 7-8 % no lo sostiene la calidad actual: queda fuera, ni siquiera en el alcista (4,7 %).',
};

export const objetivo12m = {
  ejercicio: '2028e',
  base_bpa: 'publicado',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 4.83, multiplo: null, precio: null,
      justificacion: 'Ventas de 8.986 M (−4,0 % en 2027e por el perfil del bajista y +1,0 % en 2028e), margen EBITDA del 36,8 %, amortización de la cifra base (523 M: plantas ya hechas), intereses netos de 300 M y un 21 % de impuestos: 1.962 M de beneficio entre 406,4 M de acciones.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 5.99, multiplo: null, precio: null,
      justificacion: 'Ventas de 9.688 M (+1,0 % y +3,5 %), margen EBITDA del 40,3 %, amortización del 5,4 % (EBIT de 3.381 M), intereses netos de 300 M (215 M en 2026 según la guía más la refinanciación de 2.100 M de vencimientos de 2027-2028 al 6 %) y un 21 % de impuestos: 2.434 M y 5,99 USD.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 6.38, multiplo: null, precio: null,
      justificacion: 'Ventas de 9.975 M (+2,5 % y +5,0 %: lanzamientos y vuelta de la cuota), margen EBITDA del 41,3 %, amortización del 5,4 %, los mismos intereses y un 21 % de impuestos: 2.592 M y 6,38 USD.' },
  ],
  per_historico: {
    base: 'adelantado', base_bpa: 'publicado', actual: 14.1, mediana_5a: 28.9, minimo_5a: 22.7, media_larga: 30.6, anios: 5,
    excluidos: 'Historia adelantada en BPA contable publicado (cierre de cada año ÷ BPA real del año siguiente; para 2025, el punto medio de la guía contable de 2026, 5,55 USD [A22]): 2016 30,6x; 2017 24,6x; 2018 27,5x; 2019 38,7x; 2020 38,8x; 2021 54,3x; 2022 28,9x; 2023 36,1x; 2024 27,1x; 2025 22,7x. Excluidos: 2016 (el BPA de 2017 lleva el cargo fiscal de 229 M de la reforma de EE. UU.: atípico) y 2021 (burbuja de las mascotas de la pandemia). Últimos 5 válidos: 2020, 2022-2025. Media larga: 8 años de 2017 a 2025 sin 2021. Actual: 82,11 ÷ 5,81 (nuestro BPA contable de 2027e).',
    v2: { actual: 14.1, mediana_5a: 32.6, minimo_5a: 20.9, media_larga: 34.4, base: 'cierre' },
  },
  comparables_per: { mediana: 16.4 },
  consenso: { bpa_ano1: 6.02, bpa_ano2: 6.55, objetivo_medio: 88.38, objetivo_min: 74, objetivo_max: 115, analistas: 13, tendencia_3m: 'recortes', fuente: 'MarketScreener (BPA contable de 2027e y 2028e, sin actualizar tras el 3T26) [D7]; Yahoo Finance (objetivos de 13 analistas y BPA ajustado de 2027e de 6,41 USD, a 6-nov) [D43]' },
  diferencia_consenso: 'Nuestro BPA base de 2028e (5,99) queda un 8,5 % por debajo del consenso contable (6,55), que MarketScreener aún no ha actualizado tras el 3T26 [D7]. Las ventas casi coinciden (9.688 frente a 9.739 M). La diferencia está en el EBIT (3.381 frente a 3.669 M: el consenso no resta partidas que la cuenta sí resta, un 2,2 % de las ventas), en los intereses de refinanciar 2.100 M de vencimientos y en que no contamos recompras más allá de las hechas. Nuestro precio base (84,46 USD) queda un 4,4 % por debajo del objetivo medio (88,38). No acercamos la cifra: son supuestos explícitos.',
  media: 86.39,
  comentario: 'El valor intrínseco (98,60 USD, +20,1 %) queda un 19 % por encima del objetivo a 12 meses ponderado (82,97 USD, +3,6 % con dividendo; base +5,4 %). La distancia es el múltiplo: el valor intrínseco supone que el mercado paga por la caja de una empresa que vuelve a crecer al 3-4 %, y el objetivo a 12 meses, que el PER se queda en el de hoy (14,1x) porque la historia (28,9x) es de otro régimen. El 3T26 quitó la amenaza de una tercera rebaja, pero no trajo el hecho que cerraría la distancia: una guía de 2027 con crecimiento orgánico (febrero de 2027), que la propia dirección ya anticipa prudente. Sin eso, la tesis del valor intrínseco es a más de un año.',
};

export const contexto = {
  movimiento: { fecha: '2026-11-05', var_1m_pct: 14.8, var_3m_pct: 13.0, var_6m_pct: -6.0, var_12m_pct: -34.0, dist_max_52s_pct: -37.4, dist_min_52s_pct: 18.8, dist_max_historico_pct: -66.8, tendencia: 'bajista', volatilidad_60d_pct: 36.1, avisos: [] },
  movimientos_fuertes: [
    { periodo: 'may-2026', var_pct: -38.6, causa: 'Peor mes del año (−38,6 % hasta el 13-may): −21,5 % el 7-may con el primer recorte de la guía de 2026 por la competencia en dermatología y antiparasitarios, y −7,4 % el 11-may [A10, D4]. Está en la tesis del informe.', veredicto: 'no cambia', condicion: null },
    { periodo: 'ago-2026', var_pct: -6.0, causa: '−6,0 % el 7-ago tras la segunda rebaja de la guía (ventas de 9.120-9.320 M) y el cambio de director financiero [A9, C5].', veredicto: 'no cambia', condicion: null },
    { periodo: 'oct-nov-2026', var_pct: 25.1, causa: 'Mayor subida de un mes en seis (+25,1 % hasta el 4-nov; +30 % desde el mínimo de 68,77 del 2-oct): sin noticia propia en octubre (dividendo y consejera nueva [D53, D46]); apoyo público de Michael Burry [P2]; +4,3 % el 2-nov el día en que IDEXX subió un 21,8 % con sus resultados, y +7,5 % el 4-nov, víspera de resultados, con el sector salud (XLV) +3,1 % [P4, D55].', veredicto: 'no cambia', condicion: null },
    { periodo: '5-nov-2026', var_pct: -7.9, causa: '−7,9 % el día del 3T26 pese a batir en ventas y BPA: la guía implica un 4T flojo (ventas adelantadas al 3T con promociones), la dirección avisa de un 2027 prudente y el S&P 500 cayó un 4,4 % la misma sesión (XLV −2,5 %) [A22, A24, D55]. La caída relativa al sector (≈ −5 puntos) es la lectura de 2027, que ya recoge el caso base (+1,0 %).', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-11-05', tipo: 'resultados', hecho: '3T26: ventas de 2.391 M (−1 % orgánico) frente a 2.300 M de consenso y BPA ajustado de 1,75 USD frente a 1,51; contable de 1,44 USD con 89 M de deterioros (PetMedix). Guía de ventas estrechada a 9.220-9.320 M, BPA ajustado subido a 6,25-6,35 y contable bajado a 5,50-5,60 [A22, D52, D43].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-11-05', tipo: 'directivos', hecho: 'El nuevo director financiero, en su primera conferencia, anuncia que revisará qué métricas de guía publica y que 2027 se planificará con prudencia [A24].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-29', tipo: 'recomendación', hecho: 'Morgan Stanley mantiene Sobreponderar y baja el objetivo de 85 a 82 USD; el 27-oct UBS (Neutral) lo subió de 80 a 85 [D43].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-20', tipo: 'recomendación', hecho: 'Jefferies baja de Comprar a Mantener y el objetivo de 103 a 83 USD; el 16-oct Goldman Sachs empieza con Neutral y 74 USD [D43].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-13', tipo: 'directivos', hecho: 'Iris Knobloch entra en el consejo el 1-dic-2026 [D46]. Sin compras ni ventas de directivos desde mayo; la única venta de 12 meses es de la consejera delegada (2,5 M USD en febrero, con plan 10b5-1) [C26].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-06', tipo: 'rumor', hecho: 'Michael Burry, accionista declarado, cita a ZTS entre las candidatas a ventas por pérdidas fiscales antes de fin de año [P3].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-05-27', tipo: 'demanda o regulador', hecho: 'Demanda colectiva de accionistas por las declaraciones sobre Librela, Simparica Trio, Apoquel y Cytopoint (Nueva York) [C21].', veredicto: 'no cambia', condicion: null },
    { fecha: '2025-12-15', tipo: 'ampliación o convertible', hecho: 'Convertibles al 0,25 % a 2029 por 2.000 M (conversión a 148,20 USD; el nominal se paga en efectivo) para recomprar acciones [A20].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: '2027-02',
  veredicto: 'no cambia',
  condicion: null,
  comentario: 'La acción sube un 14,8 % en un mes y un 18,8 % sobre el mínimo de 52 semanas, pero sigue un 11,4 % bajo la media de 200 sesiones (tendencia bajista) y un 34 % abajo en un año [P6]. La subida hasta el 4-nov no tuvo causa propia; la caída del 5-nov sí: unos resultados mejores de lo esperado con un 4T y un 2027 flojos, en un mal día de bolsa. Los dos hechos están en el informe (2027e +1,0 %). No hay colocaciones, ampliaciones ni ofertas pendientes; los próximos resultados (febrero de 2027) no retrasan nada por la regla 13. Veredicto: no cambia.',
};

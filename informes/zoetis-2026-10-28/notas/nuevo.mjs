// Bloques nuevos del informe del 28-oct-2026 (sobre la base del 7-oct). Citas con letra de nota; [P n] = fuentes propias.
export const fuentesPropias = [
  { id: 2, titulo: 'Michael Burry-Backed ZTS Stock / Michael Burry Sells FLUT To Pile Into LULU Under $100 — Plus A New Bet On ZTS', editor: 'Stocktwits News', tipo: 'Prensa', fecha: '2026-09-11', url: 'https://stocktwits.com/news-articles/markets/equity/michael-burry-sells-flutter-to-pile-into-lulu-under-100-plus-a-new-bet-on-zts/cZtXHCxRBbi' },
  { id: 3, titulo: 'Burry flags six stocks as likely tax-loss sale candidates (noticia del canal de ZTS)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://seekingalpha.com/api/sa/combined/ZTS.xml' },
  { id: 5, titulo: 'Zoetis Announces Agreement to Acquire VitalRADS, Accelerating Diagnostic Capabilities (nota de prensa)', editor: 'Zoetis Inc. (Business Wire, vía BioSpace)', tipo: 'Primaria', fecha: '2026-07-14', url: 'https://www.biospace.com/press-releases/zoetis-announces-agreement-to-acquire-vitalrads-accelerating-diagnostic-capabilities' },
  { id: 4, titulo: 'Zoetis (ZTS): cierres diarios de agosto a octubre de 2026 (chart API)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://query1.finance.yahoo.com/v8/finance/chart/ZTS?range=2mo&interval=1d' },
];

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.5, precio_pct: -0.5, otros_pct: -0.6,
      comentario: 'Guía de agosto, sin cambios a 28-oct: orgánico de −3 % a −1 % y 9.221 M en el punto medio [A9]. Zoetis amplía los descuentos «del bruto al neto» para defender cuota [A19]; el volumen cae en mascotas de EE. UU. y sube en ganadería [A9]. Otros: divisa y cambio de cierre de las filiales. Reparto entre volumen y precio, estimación propia.' },
    { periodo: '2027e', volumen_pct: 0.5, precio_pct: 1.0, otros_pct: 0.5,
      comentario: 'Rebajado de +2,5 % a +2,0 % frente al informe del 7-oct: el consenso de ventas de 2027 baja de 9.477 a 9.396 M y el de BPA ajustado un 12,9 % en 90 días [D7, D43]. Volumen casi plano (internacional y ganadería compensan la cuota perdida en EE. UU.) y precio de solo un 1 % [A9, A19].' },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0.5,
      comentario: 'Consenso de 9.739 M (+3,7 %) [D7]. Precio: Zoetis subió por encima de la inflación hasta 2025 [A1]; suponemos la mitad de esa capacidad mientras dura la competencia en dermatología y antiparasitarios.' },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0.5,
      comentario: 'Mercado al +2,7 % (IMARC) [B22] y mascotas de Elanco y Merck creciendo en 2026 [B10, B13]: volumen al ritmo del mercado, sin recuperar cuota.' },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 1.0, otros_pct: 0.5,
      comentario: 'Vence la patente principal de Apoquel en EE. UU. (abril de 2030) [B23]: el precio aporta menos.' },
  ],
  mercado_final: { periodo: '2035e', tamano: 52419 },
  veredicto: 'Sí',
  justificacion: 'Sí, porque la proyección pide poco: un 2,8 % anual de media en 2026e-2035e, menos de la mitad del 7,6 % de 2016-2025 y cerca del mercado (2,7 % según IMARC, que infravalora las mascotas) [B22]. Apenas exige reinversión neta (con un ROIC del 29 %), y la cuota implícita se queda en torno al 23,6 % actual: no hay que ganar a nadie. El foso es estrecho y se estrecha [B1]: el poder de precios demostrado hasta 2025 se agrieta en 2026, con descuentos para defender cuota [A19], y por eso el precio aporta solo un 1-2 % anual. El motor trata a Zoetis como de reinversión neta baja, así que la prueba se hace con precio y cuota, y las dos pasan. Volver al 7-8 % no lo sostiene la calidad actual: queda para el alcista.',
};

export const objetivo12m = {
  ejercicio: '2028e',
  base_bpa: 'publicado',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 4.83, multiplo: null, precio: null,
      justificacion: 'Ventas de 9.079 M (−3,0 % en 2027e por el perfil del bajista y +1,5 % en 2028e), margen EBITDA del 37,3 %, amortización de la cifra base (528 M: plantas ya hechas), intereses de 327 M y un 21 % de impuestos: 2.000 M de beneficio entre 414,3 M de acciones.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 5.98, multiplo: null, precio: null,
      justificacion: 'Ventas de 9.782 M (+2,0 % y +4,0 %), margen EBITDA del 40,8 %, amortización del 5,4 % (EBIT de 3.463 M), intereses de 327 M (deuda de 9.150 M al 2,8 % y refinanciación de 2.100 M de vencimientos de 2027-2028 al 6,2 %) y un 21 % de impuestos: 2.477 M y 5,98 USD.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 6.37, multiplo: null, precio: null,
      justificacion: 'Ventas de 10.069 M (+3,5 % y +5,5 %: la cartera y la vuelta de la cuota), margen EBITDA del 41,8 %, amortización del 5,4 %, los mismos intereses y un 21 % de impuestos: 2.637 M y 6,37 USD.' },
  ],
  per_historico: {
    base: 'adelantado', base_bpa: 'publicado', actual: 13.6, mediana_5a: 28.9, minimo_5a: 22.3, media_larga: 30.5, anios: 5,
    excluidos: 'Historia adelantada en BPA contable publicado (cierre de cada año ÷ BPA real del año siguiente; para 2025, nuestro BPA de 2026e, 5,65): 2016 30,6x; 2017 24,6x; 2018 27,5x; 2019 38,7x; 2020 38,8x; 2021 54,3x; 2022 28,9x; 2023 36,1x; 2024 27,1x; 2025 22,3x. Excluidos: 2016 (el BPA de 2017 lleva el cargo fiscal de 229 M de la reforma de EE. UU.: atípico) y 2021 (burbuja de las mascotas de la pandemia). Últimos 5 válidos: 2020, 2022-2025. Media larga: 8 años de 2017 a 2025 sin 2021. Actual: 78,23 ÷ 5,76 (nuestro BPA contable de 2027e).',
    v2: { actual: 13.6, mediana_5a: 32.6, minimo_5a: 20.9, media_larga: 34.4, base: 'cierre' },
  },
  comparables_per: { mediana: 15.3 },
  consenso: { bpa_ano1: 6.02, bpa_ano2: 6.55, objetivo_medio: 88.62, objetivo_min: 74, objetivo_max: 115, analistas: 13, tendencia_3m: 'recortes', fuente: 'MarketScreener (BPA contable de 2027e y 2028e) [D7]; Yahoo Finance (objetivos de 13 analistas) [D43]' },
  diferencia_consenso: 'Nuestro BPA base de 2028e (5,98) queda un 8,7 % por debajo del consenso contable (6,55) [D7]. Las ventas casi coinciden (9.782 frente a 9.739 M). La diferencia está en el EBIT (3.463 frente a 3.669 M: el consenso no resta partidas que la cuenta sí resta, un 2,2 % de las ventas), en los intereses de refinanciar 2.100 M de vencimientos al 6,2 % y en que no contamos recompras sin calendario. No acercamos la cifra: son supuestos explícitos.',
  media: 83.37,
  comentario: 'El valor intrínseco (95,87 USD, +22,5 %) queda un 20 % por encima del objetivo a 12 meses ponderado (80,02 USD, +5,0 % con dividendo; base +6,6 %). La distancia es el múltiplo: el valor intrínseco supone que el mercado paga por la caja de una empresa que vuelve a crecer al 3-4 %, y el objetivo a 12 meses, que el PER se queda en el de hoy (13,6x) porque la historia (28,9x) es de otro régimen. Para cerrarla hace falta un hecho con fecha: un 3T26 sin tercera rebaja (5-nov) y, sobre todo, una guía de 2027 con crecimiento orgánico (febrero de 2027). Sin eso, la tesis del valor intrínseco es a más de un año.',
};

export const contexto = {
  movimiento: { fecha: '2026-10-27', var_1m_pct: 9.5, var_3m_pct: 0.4, var_6m_pct: -32.9, var_12m_pct: -46.4, dist_max_52s_pct: -47.0, dist_min_52s_pct: 13.2, dist_max_historico_pct: -68.3, tendencia: 'bajista', volatilidad_60d_pct: 32, avisos: ['P5 Un 17 % por debajo de la media de 200 sesiones (tendencia bajista)'] },
  movimientos_fuertes: [
    { periodo: 'nov-2025', var_pct: -13.8, causa: 'Caída del 13,8 % el 4-nov-2025 al rebajar la guía de ingresos de 2025 con los resultados del 3T25 [A12, D4].', veredicto: 'no cambia', condicion: null },
    { periodo: 'may-2026', var_pct: -38.6, causa: 'Peor mes del año (−38,6 % hasta el 13-may): −21,5 % el 7-may con el primer recorte de la guía de 2026 por la competencia en dermatología y antiparasitarios, y −7,4 % el 11-may [A10, D4]. Está en la tesis del informe.', veredicto: 'no cambia', condicion: null },
    { periodo: 'ago-2026', var_pct: -6.0, causa: '−6,0 % el 7-ago tras la segunda rebaja de la guía (ventas de 9.120-9.320 M) y el cambio de director financiero [A9, C5].', veredicto: 'no cambia', condicion: null },
    { periodo: 'oct-2026', var_pct: 15.3, causa: 'Rebote del 15,3 % desde el mínimo del 2-oct (68,77) hasta 82,00 el 22-oct, sin noticia de la empresa que lo explique: el dividendo de 0,53 USD (8-oct) y un consejero nuevo (13-oct) [D45, D46]. Coincide con el apoyo público de Michael Burry, que dijo haber ampliado en la zona de 72 [P2], y con rotación hacia defensivas; el 27-oct devolvió un 3,4 % [P4].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-11-05', tipo: 'resultados', hecho: 'Resultados del 3T26 el 5-nov antes de la apertura; consenso de BPA ajustado de 1,51 USD y ventas de 2.302 M [D43, D6].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-27', tipo: 'recomendación', hecho: 'UBS mantiene Neutral y sube el objetivo de 80 a 85 USD [D43].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-20', tipo: 'recomendación', hecho: 'Jefferies baja de Comprar a Mantener y el objetivo de 103 a 83 USD; el 16-oct Goldman Sachs empieza con Neutral y 74 USD [D43].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-13', tipo: 'directivos', hecho: 'Iris Knobloch entra en el consejo el 1-dic-2026 (de 12 a 13 miembros) [D46]. Sin compras ni ventas de directivos desde mayo; la única venta de 12 meses es de la consejera delegada (2,5 M USD en febrero, con plan 10b5-1) [D47].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-06', tipo: 'rumor', hecho: 'Michael Burry, accionista declarado, cita a ZTS entre las candidatas a ventas por pérdidas fiscales antes de fin de año [P3].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-05-27', tipo: 'demanda o regulador', hecho: 'Demanda colectiva de accionistas por las declaraciones sobre Librela, Simparica Trio, Apoquel y Cytopoint (Nueva York) [C21].', veredicto: 'no cambia', condicion: null },
    { fecha: '2025-12-15', tipo: 'ampliación o convertible', hecho: 'Convertibles al 0,25 % a 2029 por 2.000 M (conversión a 148,20 USD; el nominal se paga en efectivo) para recomprar acciones [A20].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: '2026-11-05',
  veredicto: 'no cambia',
  condicion: null,
  comentario: 'La acción sube un 9,5 % en un mes y rebota un 13,2 % desde el mínimo de 52 semanas, pero sigue un 17 % bajo la media de 200 sesiones (P5) y un 46 % abajo en un año. El rebote no tiene una causa de la empresa: los dos hechos de octubre (dividendo y consejera) no mueven el valor, y los analistas siguen recortando (Jefferies) o empiezan en Neutral (Goldman). No hay colocaciones, ampliaciones ni ofertas pendientes; el único hecho con fecha son los resultados del 5-nov, que por la regla 13 no retrasan nada. Veredicto: no cambia.',
};

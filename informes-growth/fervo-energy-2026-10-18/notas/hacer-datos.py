import json
d = {
 "empresa": "Fervo Energy Company", "ticker": "FRVO", "simbolo_yahoo": "FRVO", "bolsa": "NASDAQ", "moneda": "USD", "fecha": "2026-10-18",
 "precio": 9.68,
 "acciones_diluidas_m": 327.4,
 "caja_m": 2106.4,
 "deuda_m": 418.3,
 "nota_balance": "Precio: cierre del viernes 16-oct-2026 (9,68 USD; MarketBeat y Stocktwits) [5][15]. Acciones: 294,76 M (286,98 M clase A + 7,79 M clase B, 10-ago-2026) + 31,76 M opciones + 0,59 M RSU + 0,27 M ESPP = 327,4 M totalmente diluidas (sin método de tesorería: no se publica el precio medio de ejercicio; prudente) [1]. Caja y deuda al 30-jun-2026 (último balance publicado): caja 2.106,4 M (+11 M restringida, no se cuenta); deuda = principal de Granite 212,3 M (SOFR+3 %, 2031) + Mercuria 30,0 M = 231,3 M, más 187,0 M de participaciones minoritarias rescatables en Cape Phase I (105,1 + 81,9 M; socio financiero del proyecto, se tratan como deuda en el valor de empresa) [1]. Después del cierre: cuarta disposición de Granite de 25,1 M (8-jul) y un 3T con ~400-450 M de capex: la caja de septiembre será del orden de 1.650-1.750 M (estimación propia, se verá en el 10-Q del 3T).",
 "crecimiento": {
  "ventas_12m_pct": None, "ultimo_trimestre_pct": None, "cagr_2a_propio_pct": None, "aceleracion_pp": None,
  "nrr_pct": None, "guia_12m_pct": None, "exceso_guia_pp": None,
  "nota_crecimiento": "No medible: ventas de 12 meses a jun-2026 de 0,312 M USD (2S25 0,138 + 1S26 0,174), con 1S25 a cero y 2024 de 0,199 M que incluye cuotas accesorias; el 2T26 (0,113 M) se compara con un 2T25 de 0. Cualquier porcentaje sale infinito o sin sentido, y son ventas del piloto de Project Red, no del negocio. Se dejan en null: el bloque A puntúa 0 y la proyección mecánica parte de crecimiento 0 (ver la variante en el informe) [1][2].",
  "nota_guia": "Sin guía formal. En la llamada del 2T la dirección dio 60-80 M USD de ventas de 2027 «que no son guía formal», rebajadas por un recorte de la línea de transmisión de Cape en 2027, y «unos pocos millones» en el 4T26 [3]."
 },
 "mercado": {
  "tam_m": 10000, "ventas_12m_m": 0.312, "tecnologia_0a5": 4, "posicion_0a5": 4,
  "clientes_top2_pct": None, "clientes_top3_pct": 74,
  "nota_tam": "Mercado alcanzable en 2028: ~10.000 M USD/año de energía firme y limpia nueva contratable en el oeste de EE. UU. (estimación propia: rampa lineal hacia los ~70.000 M USD/año que Rystad estima para 2035 si la geotermia mejorada cubre el hueco de capacidad firme de EE. UU., con precios de 100-130 USD/MWh) [4]. Con 0,3 M de ventas la penetración es ~0 % con cualquier cifra.",
  "nota_clientes": "Ventas de hoy: un solo contrato (GeoBlock 1). Sobre la cartera contratada (1.054 MW vinculantes): Google 396 MW + SCE y Clean Power Alliance 384 MW = 74 % (tres clientes) [4][6][8]."
 },
 "riesgos": {"decision_pendiente_pct": None},
 "tendencia": {
  "senales": {
   "revisiones_al_alza": {"valor": False, "evidencia": "A la baja: Baird 50→35 USD (13-ago), Jefferies 41→34 (20-jul, aunque sube a Comprar), BofA 36→30 (25-sep, «desplazamiento de calendario en Cape» y múltiplo de comparables de 14,2x a 12,8x); solo Bernstein reitera 47 (2-oct). El objetivo medio de 40,87 USD no se ha movido con el precio [5][9][10]"},
   "precio_sobre_media_200": {"valor": False, "evidencia": "Sin 200 sesiones de historia (cotiza desde el 13-may-2026, 109 sesiones). Cierre de 9,68 USD frente a una media de 50 sesiones de 16,41 USD, en el mínimo desde la salida a bolsa [5][7]"},
   "fuerza_relativa_6m": {"valor": False, "evidencia": "Desde el primer cierre (36,54 USD, 13-may) −73,5 %; −64 % sobre el precio de la oferta (27 USD), con el Nasdaq en positivo en el mismo periodo [7]"},
   "mejora_de_multiplo": {"valor": False, "evidencia": "El EV/ventas está en su mínimo desde la salida a bolsa: el precio marca mínimo el 16-oct (9,68 USD); no hay subida desde el mínimo [7]"},
   "inflexion_operativa": {"valor": False, "evidencia": "Primera venta comercial (COD del GeoBlock 1 el 30-sep, 33 MW), pero sin beneficio operativo ni FCF y con la pérdida operativa ampliándose: 2T26 −28,7 M frente a −10,3 M en el 2T25; FCF de 12 meses −733 M [1][2][6]"},
   "sentimiento_mejorando": {"valor": False, "evidencia": "Empeora: informe bajista de Morpheus Research (6-oct), cuatro bufetes buscando demandantes por la OPV (8-12-oct), Stocktwits «bajista» (33), titulares de mínimos [11][12][15]"},
   "compras_directivos_o_institucionales": {"valor": False, "evidencia": "Sin compras de directivos registradas (formularios 4 solo de mayo, por la OPV); los 13G de agosto son de accionistas previos; solo entradas pequeñas de gestoras en 13F [5][13]"},
   "catalizador_nuevo": {"valor": True, "evidencia": "GeoBlocks 2 y 3 con COD contractual el 1-ene-2027 (~66 MW más); jornada para inversores en Cape Station el 19-nov; contrato detrás del contador anunciado «antes de fin de año»; resultados del 3T en noviembre [3][6][14]"}
  },
  "subida_12m_pct": -73.5,
  "euforia": False
 },
 "economia": {"margen_bruto_pct": -353, "margen_fcf_pct": -235000, "rentabilidad": "lejos",
   "nota": "Margen bruto del 1S26: ventas 0,174 M frente a operación y mantenimiento 0,788 M (−353 %). Una central geotérmica madura deja ~75-80 % antes de amortizaciones (ventas − O&M), pero eso no se ha visto todavía. FCF de 12 meses −733,4 M (FCO −81,8 M, capex −651,6 M) sobre 0,312 M de ventas. Consenso: pérdidas netas en 2027 (−92 M) y 2028 (−95 M) [1][2][16]."},
 "finanzas": {"quema_anual_m": 733.4, "dilucion_anual_pct": 81, "sbc_sobre_ventas_pct": 3980,
   "nota": "Quema de 12 meses: FCF de jul-25 a jun-26 = (FCO 2S25 −38,0 + 1S26 −43,8) + (capex 2S25 −252,3 + 1S26 −399,3) = −733,4 M [1][2]. La de los 12 meses siguientes será mayor: capex de 850-900 M en el 2S26 y ~2.200 M de la Fase II hasta 2028, en parte con deuda de proyecto. Dilución: de ~180,8 M de acciones totalmente diluidas a jun-25 (preferentes 160,8 + comunes ~6,5 + opciones 13,5, tras el contrasplit 0,7194) a 327,4 M (+81 %), sobre todo por la OPV (80,5 M) y las preferentes de la serie E. Pagos en acciones de 12 meses ~12,4 M (2S25 ~1,6 + 1S26 10,8) sobre 0,312 M de ventas [1][2]."},
 "ejecucion": {"historial_0a5": 3, "direccion_0a5": 3,
   "nota": "Historial: el GeoBlock 1 llegó al COD un día antes de lo contratado y la perforación bate récords (Sawtooth 7: 21 días), pero a los tres meses de la OPV la dirección reveló el recorte de transmisión de 2027 y retrasó la «primera potencia» de los GeoBlocks 2-3 a «principios de 2027» (el folleto hablaba de ~100 MW a principios de 2027). Dirección: fundadores (Latimer y Norbeck) con ~53 % del voto por acciones B de 40 votos y ~3 % del capital; no han vendido; sin respuesta pública al informe de Morpheus [3][6][8][11]."},
 "valoracion": {
  "ejercicio_objetivo": "12 meses a jun-2028 (dos años sobre los 12 meses a jun-2026, como en el backtest)",
  "metrica": "EV/ventas NTM", "anios_hasta_objetivo": 2,
  "ventas_objetivo_m": {"bajista": 60, "base": 90, "alcista": 130},
  "nota_ventas_obj": "Proyección propia de jul-27 a jun-28: Fase I (~100 MW) entera desde 2027, con el recorte de transmisión que la dirección limita a 2027, y las primeras GeoBlocks de la Fase II en 2028 (Google desde el 3T28). ~100 MW × 8.760 h × 90-95 % × 85-100 USD/MWh ≈ 70-80 M/año solo la Fase I. Bajista: recorte más largo y Fase II tarde; alcista: parte de la Fase II en el 1S28.",
  "multiplo_actual": 42.3, "mediana_3a": None, "minimo_3a": None, "mediana_comparables": 8,
  "comparables": ["Ormat Technologies (ORA): EV/ventas ~7,4-8,3x (Yahoo y ROIC.ai, jun-oct 2026)", "BofA usa un múltiplo de comparables de 12,8x (EV/EBITDA, suma de partes)", "Oklo y NuScale (sin ventas relevantes: no sirven de múltiplo)"],
  "crecimiento_actual_pct": 11118, "crecimiento_obj_pct": 157,
  "nota_multiplo": "EV = 9,68 × 327,4 + 418,3 − 2.106,4 = 1.481 M USD. Ventas NTM (jul-26 a jun-27) ≈ 35 M (3T26 ~0,2, 4T26 ~5 por la llamada del 2T, 1S27 ~30 dentro de los 60-80 M de 2027) → crecimiento NTM +11.118 % y EV/ventas NTM 42,3x. Sin historia de 3 años (cotiza desde mayo).",
  "probabilidades": {"bajista": 35, "base": 50, "alcista": 15},
  "nota_probabilidades": "35/50/15: depende de un solo proyecto (Cape Station) y la ejecución está en duda (recorte de transmisión, informe de Morpheus sin respuesta).",
  "dividendo_pct": 0,
  "consenso_ventas_obj_m": 141, "nota_consenso": "Media simple del consenso de 2027 (72 M, 13 analistas) y 2028 (211 M, 11) para la ventana jul-27 a jun-28; exagera la ventana, porque 2028 carga la Fase II en la segunda mitad [16].",
  "consenso_precio_objetivo": 40.87,
  "dcf_inverso_crecimiento_10a_pct": None,
  "nota_dcf_inverso": "No tiene sentido con ventas de 0,3 M. Contraste propio: el valor de empresa (1.481 M) está por debajo de lo ya invertido en activos (activo total 3.535 M − caja 2.117 M ≈ 1.420 M, casi todo planta en construcción): el precio de hoy apenas paga lo construido y nada por los 1.054 MW contratados ni por la cartera."
 },
 "tesis_rota": False,
 "proximos_resultados": "2026-11-11 (estimada): sin fecha confirmada a 18-oct; therighttrader la proyecta el 11-nov y Stocktwits el 16-nov. El 2T se anunció el 3-ago para el 12-ago (antes de la apertura) [14][15]"
}
json.dump(d, open('datos.json','w'), ensure_ascii=False, indent=2)

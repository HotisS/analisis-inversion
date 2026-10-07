// Datos del subagente D (Almirall, corte 2026-10-07). Se vuelca a D.json con D_escribir.mjs.
export default {
  identificacion: {
    nombre: "Almirall, S.A.", nombre_corto: "Almirall", ticker: "ALM", isin: "ES0157097017", mercado: "Bolsas españolas (Mercado Continuo, BME)", indice_referencia: "IBEX Medium Cap (comparación con el IBEX 35)",
    pais: "España", pais_iso: "ES", sector: "Salud", industria: "Farmacéutica", sede: "Barcelona", fundacion: "1943", empleados: null, web: "www.almirall.com",
    precio: 10.18, fecha_precio: "2026-10-06",
    acciones: 217.62,
    _acciones_calculo: "217.777.331 acciones tras el aumento del dividendo flexible (4-jun-2026) [2] menos la autocartera del contrato de liquidez a 30-jun-2026: 0,07 % del capital, valor nominal 18,7 miles EUR / 0,12 EUR = 155.833 acciones [3]. Sin instrumentos dilutivos a 30-jun-2026 [3]. Las 2.510.952 acciones del equity swap con CaixaBank son de la entidad, no autocartera, y no se restan [3]. Stock Analysis da 217,78 M de acciones (sin restar la autocartera) [8].",
    capitalizacion_publicada: 2230, free_float_pct: 35.9,
    max_52s: 13.98, min_52s: 10.02,
    volumen_medio_diario: "≈ 1,4 M EUR/día (130.163 acciones; 3 meses, 65 sesiones)",
    proximos_resultados: "2026-11-09",
    _nota_precio: "Cierre del 6-oct-2026: el del 7-oct (fecha de corte, sesión en curso) no está publicado [1]."
  },
  consenso: null,
  bolsa: null,
  multiplos_historicos: null,
  comparables: null,
  transacciones: null,
  valoracion: null,
  _wacc: null,
  fuentes: [
    { id: 1, titulo: "Históricos diarios de ALM.MC, ^IBEX, EXV4.DE y ^STOXX (herramientas/bolsa.mjs) hasta 2026-10-06", editor: "Yahoo Finance", tipo: "Datos de mercado", fecha: "2026-10-06", url: "https://finance.yahoo.com/quote/ALM.MC/history" },
    { id: 2, titulo: "OIR: resultado del aumento de capital del dividendo flexible y compra de derechos", editor: "Almirall", tipo: "Primaria", fecha: "2026-06-04", url: "https://blob.almirall.com/files/2026-06/20260604-Almirall-OIR-Resultado-aumento-y-ejercicio-compra-ENG.pdf" },
    { id: 3, titulo: "Estados financieros intermedios consolidados resumidos a 30-jun-2026", editor: "Almirall", tipo: "Primaria", fecha: "2026-07-27", url: "https://blob.almirall.com/files/2026-07/EN-H1-2026-Accounts.pdf" },
    { id: 4, titulo: "H1 2026 Financial Results & Business Update (presentación)", editor: "Almirall", tipo: "Primaria", fecha: "2026-07-27", url: "https://blob.almirall.com/files/2026-07/EN-Financial_Results_Business_Update_H1-2026-vFinal.pdf" },
    { id: 5, titulo: "FY 2025 Financial Results & Business Update (presentación)", editor: "Almirall", tipo: "Primaria", fecha: "2026-02-23", url: "https://blob.almirall.com/files/2026-05/Financial_Results_Business_Update_ENG_FY2025_Final.pdf" },
    { id: 6, titulo: "Almirall, S.A.: Financial Data Forecasts Estimates and Expectations", editor: "MarketScreener", tipo: "Datos de mercado", fecha: "2026-10-07", url: "https://www.marketscreener.com/quote/stock/ALMIRALL-S-A-268048/finances/" },
    { id: 7, titulo: "Almirall, S.A.: Target Price Consensus and Analysts Recommendations", editor: "MarketScreener", tipo: "Datos de mercado", fecha: "2026-10-07", url: "https://www.marketscreener.com/quote/stock/ALMIRALL-S-A-268048/consensus/" },
    { id: 8, titulo: "Almirall (BME:ALM) Statistics", editor: "Stock Analysis", tipo: "Datos de mercado", fecha: "2026-10-07", url: "https://stockanalysis.com/quote/bme/ALM/statistics/" }
  ],
  huecos: []
};

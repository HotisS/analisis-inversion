# Diario · Pernod Ricard (RI.PA) · 18-oct-2026

- Commit de partida: 583cbbe («Precios del 18-oct»). Sin git pull, commit ni push (encargo de subagente). Inicio 16:12 UTC, fin 16:45 UTC.
- Iteración nueva del informe del 14-oct (`informes/pernod-ricard-2026-10-14`, FRÁGIL, Mantener, confianza «Baja»), que era anterior a las ventas del 1T27 (publicadas el **15-oct-2026** a las 7:30, no el 16-oct que decía el encargo y el informe anterior). Carpeta anterior sin tocar.
- Símbolo de Yahoo: **RI.PA** (índice ^FCHI, sector EXH3.DE). Próximos resultados: **1S FY27 el 18-feb-2027** (nota de prensa del 1T27, calendario financiero); ventas del 3T el 15-abr-2027; junta el 20-nov-2026; fecha ex del saldo del dividendo (2,35 EUR) el 25-nov-2026.
- Entorno con red: cuentas.mjs `--esef` (FY2021-FY2025, LEI 52990097YFPX9J0H5D87), bolsa.mjs (`--accion RI.PA --indice ^FCHI --sector EXH3.DE --corte 2026-10-18 --cierre-mes 6`), movimiento.mjs RI.PA y descargar.mjs (URD FY26 de 447 páginas, URD FY24 y FY22, presentaciones y transcripciones FY26 y 1S26, nota del 1T27, derechos de voto a 30-sep, votos de la junta 2025, BDIF). Notas A-E con `notas/construir-notas.mjs` (B y E parten de las del 14-oct con negocio, KPI, ESG y foros rehechos); `propio.mjs` + `textos.mjs`.
- **Lo que dejó la confianza baja, resuelto con fuente primaria**: precio (cierre real 68,22 EUR del 16-oct frente a 64,00 derivado), balance completo a 30-jun-2026 (deuda bruta 12.206 tras coberturas, arrendamientos 449, caja 1.993, minoritarios 1.040, pensiones 216, factoring 1.105, dividendo a cuenta 592), flujos FY21-FY26 del ESEF y del URD, beta propia (0,91 ajustada semanal), consenso (MarketScreener, 20 analistas), gobierno y operaciones de directivos (BDIF). Confianza pasa a «Media».
- Decisiones:
  - DCF: capex 5,4 % (4,2 % de capex más los pagos de arrendamientos, regla NIIF 16 del prompt) y circulante 79,5 % de ventas (77,2 % real; las existencias envejecidas van en el circulante), en vez del capex del 7,5-9 % con circulante 0 del 14-oct. Así el FCFF del FY27e (1.686 M) se acerca a la caja libre publicada más intereses (≈1.500 M, con reestructuración).
  - FY27e −3 %: orgánico 0 (guía), perímetro −2,8 % (Imperial Blue y vinos: −127 M en el 1T27, hasta diciembre), divisa casi neutra.
  - Puente con minoritarios, pensiones netas de impuesto, asociadas y otros ajustes 1.697 (factoring + dividendo a cuenta): resta unos 11 EUR por acción frente al 14-oct.
  - Pesos 40/20/40 (DCF/comparables/escenarios): los comparables entran porque ya hay consenso NTM.
  - Historia del PER: FY2021-FY2023 excluidos (auge poscovid), quedan 3 años → `per_historico.anios: 3` y `v2` al cierre; el selector elige la v2 (la más baja).
  - Sostenibilidad «En parte» aunque el motor diga «Sí»: el poder de precios no está demostrado (precio/mezcla negativos en FY26 y 1T27).
- Resultado: DCF 91,36 EUR (+33,9 %, VT 75 %); escenarios 54,76 / 91,36 / 101,85; **valor intrínseco 85,16 EUR (+24,8 %)**; DCF inverso: ventas −5,8 % anual o margen final 27,8 %; rentabilidad implícita 7,5 % frente a WACC 6,59 %.
- **Línea 12 m: v2 por el selector, objetivo 69,86 EUR, ponderada +9,3 %, base +7,2 % → Mantener** (v3 sin selector +18,1 % / +20,9 %, Comprar). Comprar < 64,84; vender > 82,85.
- Calidad: ROIC 6,77 % − WACC 6,59 % = 0,18 puntos; no pasa (≥ 5). Sostenibilidad «En parte».
- Robustez `--actual`: FRÁGIL; acción vigente y robusta «No mantener» (filtro de mantener 67,79); límite robusto 58,79 EUR; colchón de BPA «—». Cambia con v3 sin selector o tope ×1,3 (Comprar 18,1 %).
- apuntar-12m `--simular`: RI pasaría de Mantener 16,5 % (precio 66,10) a Mantener 9,3 % (68,22). No escrito (el encargo lo prohíbe).
- Word y PDF (soffice): 18 de 19 controles y 1 explicado (regresión de comparables, R² 0,09). Cobertura 90 %. Huecos: vida media de la deuda, cuota de mercado, votos de remuneración 2023-2024, reparto de recomendaciones, posición corta, múltiplos de EBITDA de transacciones.

## Lecciones (para que el hilo principal decida si van a lecciones*.md)

- Las ventas del 1T de Pernod salen el día 15 a las 7:30, no el 16: la fecha de resultados del informe anterior estaba mal. Mirar el calendario financiero de la empresa, no la estimación del agregador.
- Con la deuda neta publicada como único ajuste, el valor por acción de Pernod sale unos 11 EUR más alto: el factoring sin recurso (1.105 M), el dividendo a cuenta pendiente al cierre de junio (592 M) y los minoritarios (1.040 M) no están en la deuda neta publicada. En empresas con ejercicio a junio y dividendo a cuenta en julio, mirar el pasivo corriente del balance.
- En destiladores, la inversión en existencias envejecidas va en el circulante, no en el capex: con capex + arrendamientos y el circulante del balance el flujo cuadra con la caja libre publicada.
- `per_historico.anios` es lo que activa la regla de historia corta del selector; sin ese campo el motor aplica la v3 aunque solo haya tres años (aquí cambiaba la señal: Comprar 18,1 % frente a Mantener 9,3 %). Integrar lo marca como «fuera del esquema», pero el motor lo lee.
- El crecimiento de India en el 1T27 (+19 %) lleva llenado de canal por la posible salida a bolsa de la filial: no es tendencia.

# Diario · Burckhardt Compression (BCHN.SW) · 15-oct-2026

- Commit de partida: e1c6cd6 (Seguimiento: regenerado). Sin `git pull` ni commits (encargo de la 8.ª hora: los hace el coordinador).
- Entorno: nube de Claude Code con red abierta. Sin subagentes: notas A-E escritas por mí con `notas/construir-notas.mjs`; `propio.mjs` + `supuestos.mjs` + `textos.mjs`.
- Fecha de corte 2026-10-15; divisa CHF; Swiss GAAP FER; ejercicio de abril a marzo. **Etiqueta: la de la empresa** («FY2025» = abr-25 a mar-26, `etiqueta_ejercicio: "inicio"`), no la del encargo (que llamaba FY2026 a abr-25 a mar-26); MarketScreener etiqueta por el año de cierre (su «2027» es nuestro FY2026e). Ejercicio objetivo a 12 meses: FY2028e (cierra en mar-29, el primero a más de 18 meses). PER actual sobre FY2027e (como hizo Kuehne+Nagel con el año siguiente al en curso).
- Fuentes: informes anuales FY2020-FY2025 (PDF de la web; Suiza no tiene XBRL), semestral 1S FY2025, presentaciones, CMD 2022, acta de la junta 2026, notas ad hoc (reestructuración, Fornovo, cambio en Systems), MarketScreener (consenso), Yahoo (bolsa y comparables), SEC (transacciones), BCE.
- Precio: 486,00 CHF, cierre del 14-oct (MarketScreener). `bolsa.mjs` no tenía el cierre del 14-oct (Yahoo lo da vacío) y tomó el del 13-oct (490,50); las rentabilidades de bolsa son a esa fecha. El 15-oct abrió a 473-474,5 (−2,4 %, sin noticia encontrada).
- Decisiones: anticipos de clientes en `pasivos_contrato` (circulante neto de anticipos: 17,4 % de las ventas en FY2025; proyección 19-21 %). FY2023 reexpresado (grado de avance); FY2020-FY2022 sin reexpresar (en `cambios_perimetro`). Sin NIIF 16 (arrendamientos 0). Comparables: 10 de Yahoo en CHF; transacciones: Howden ×2, Chart (con sinergias), Exterran excluida. Pesos DCF 40 / comparables 20 / escenarios 40. Bajista con perfil cíclico (FY2027e −8 pp de crecimiento y −3 pp de margen).
- Resultado: DCF 598,86 CHF; valor intrínseco 581,39 (+19,6 %); DCF inverso −3,5 % anual de ventas FY2026e-FY2032e (base +1,7 %) o margen EBITDA del 13,5 %. ROIC 43,1 % frente a WACC 6,74 % (+36 puntos; ROIC sin fondo de comercio = el mismo: Swiss GAAP FER y fondo de comercio teórico de 9 M). Sostenibilidad «Sí» (motor «Sí»: no salta el control). 21 de 21 controles correctos; cobertura 88,9 %.
- **Línea 12 m (v3 ×1,1, selector sin marcas)**: objetivo 541,27 CHF, ponderada +15,1 %, base +17,0 %; v2 +16,3 % / +13,2 %. **Comprar, convicción baja** (motor sugiere Media; la bajo porque la ponderada está a 0,1 puntos del umbral). Robustez: **FRÁGIL**, acción robusta **Mantener** (con el BPA del consenso, 14,2 %). Compra robusta por debajo de ~482,60 CHF; límite de la regla 486,32; venta por encima de 621,41. Detalle en revision-12m-2026-10-15.md.
- Una acción ≈ 520,90 EUR (486,00 ÷ 0,9330): 1,7 % de una cartera de 30.000 EUR.
- Ficha sectorial nueva: `sectores/compresores-2026-10-15.md` (+ comparables JSON); las de hidráulica y transferencia de calor no servían.
- Para subir la confianza: cartera de pedidos en CHF (no publicada), pedidos del 1S FY2026 (3-nov-2026), operaciones de directivos (SIX, anónimas) y precio de Fornovo.

## Lecciones

- Burckhardt (y otras suizas en Swiss GAAP FER) etiqueta el ejercicio por el año de inicio; MarketScreener, por el de cierre: comprobar la etiqueta antes de copiar el consenso.
- En las notas A-E escritas a mano, las citas van con `[n]` sin la letra de la nota: `integrar` no traduce `[A3]` dentro de A.json (deja las fuentes sin citar). Se arregla quitando la letra al guardar.
- El scratchpad lo comparten los análisis paralelos: un `comps.json` mío lo pisó otro análisis. Nombres de archivo con el ticker.

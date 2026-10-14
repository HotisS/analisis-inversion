# Diario · CME Group (CME) · 14-oct-2026

- Commit de partida: a3fc7ce (Shimano, 14-oct). Prompt y método v2 de ese commit.
- Entorno: nube de Claude Code. La red solo deja WebSearch; WebFetch, curl, descargar.mjs y bolsa.mjs no funcionan. Unas 40 búsquedas. Cifras de los extractos de búsqueda de los comunicados (8-K), 10-K citados y proveedores (Macrotrends, Barchart, edgar.tools, Stockopedia), con su URL; lo que no cuadra va a null y a huecos. Comparables, transacciones y betas reutilizados de los informes de ICE (8-oct) y Deutsche Börse (14-oct) del repo; tasa libre (5,22 %) y prima (5,5 %) como el resto de informes del 14-oct.
- Confianza: media en cuentas anuales (varias fuentes que cuadran entre sí: antes de impuestos, impuestos y resultado no operativo de los 10-K); media-baja en trimestres (cifras redondeadas o por diferencia); baja en gobierno (proxy no legible: consejo incompleto) y bolsa (sin rentabilidades totales).
- Tiempos: 13:13 inicio; 13:30 notas A-E escritas; 13:31 primer cálculo; 13:35 informe cerrado (Word y PDF, 43 páginas). Unos 25 minutos.
- Decisiones:
  - Precio 278,08 USD (sesión del 13-oct, Robinhood), cotejado con los cierres del 9 y 12 de octubre (280,56 y 277,24).
  - Acciones 364,5 M: 359,6 M de clase A más las que participan en el beneficio (preferentes de Google y clase B), el denominador implícito del BPA publicado.
  - El resultado no operativo (diferencial de las garantías reinvertidas y S&P DJI, 1.101 M en 2025) no está en el EBITDA: va al puente como «asociadas» por 9.400 M (estimación propia: S&P DJI a 16 veces su beneficio después de impuestos y el diferencial de las garantías a 10 veces). Es la cifra más incierta.
  - Dividendo variable anual tratado como ordinario (se paga todos los años desde 2012); DPA = trimestrales + variable del ejercicio.
  - WACC 8,92 % (beta 0,70: la de CME frente al S&P 500 es 0,20 con R² 1 %; cesta de bolsas 0,53, ajustada 0,69). Terminal 3,0 % (el motor marca > 3 %).
  - Sostenibilidad: «Sí»; la reinversión es negativa (activos ligeros) y la prueba es el poder de precios y la cuota; mercado_final null (cuota en contratos).
- Resultado: Mantener, convicción baja (sugerida: las reglas discrepan, absoluta Vender y relativa Mantener). DCF 216,51; valor intrínseco 245,93 (−11,6 %); con la prima del mercado 267,24. DCF inverso: 9,3 % de crecimiento o 7,5 % de rentabilidad.
- Línea 12 m: objetivo 293,06 USD, ponderada +9,5 %, base +8,2 % (dividendo 4,1 % incluido), asimetría 2,54 → Mantener; compra < 245,93, venta > 338,23. Detalle en revision-12m-2026-10-14.md. Consenso 291,81 USD (base −0,7 %).
- No se ha ejecutado apuntar-12m.mjs ni seguimiento.mjs (lo hace el integrador).

## Lecciones

- Bolsas y cámaras (CME, ICE, Cboe): el beneficio no operativo de las garantías reinvertidas y de las participadas (S&P DJI) es una quinta parte del beneficio y no entra en el EBITDA del DCF: hay que valorarlo en el puente (asociadas) y sumarlo al BPA del objetivo a 12 meses; el activo total (garantías de los miembros) dispara el control de perímetro y deja el Altman Z sin sentido.

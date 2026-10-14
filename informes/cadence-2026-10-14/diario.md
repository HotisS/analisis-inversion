# Diario · Cadence Design Systems (CDNS) · 14-oct-2026

- Commit de partida: 9226480 (Mastercard 14-oct; método v2 con regla de múltiplos común).
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Todas las cifras salen de extractos de búsqueda (8-K de resultados, CFO Commentary, 10-K y 10-Q citados por la búsqueda, edgar.tools, Kalkine, Finboard, Stock Analysis, Macrotrends), con la URL como fuente. Sin subagentes: fases A-E hechas por mí, en una sola pasada (≈ 25 búsquedas).
- Fecha de corte: 2026-10-14. Divisa: USD. Cierre: diciembre. US GAAP.
- **Confianza**: media en cuentas de resultados, flujo operativo, guía y trimestres (cuadran entre comunicados y proveedores); media-baja en el balance (faltan caja y deuda de 2021-2022, patrimonio de 2022, impuestos y capex/recompras de 2021-2023); baja en gobierno (no se pudo leer el proxy de 2026), consenso de 2027-2028 (una sola fuente gratuita), comparables (reutilizados del informe de Dassault del 7-oct y el de Adobe del 10-oct, con el PER de Synopsys en base ajustada de otra búsqueda) y sentimiento (solo agregadores).
- **Precio**: no apareció el cierre del 13-oct. Usamos el del 9-oct (352,84 USD, Syfe), coherente con 352,60 (2-oct) y 351,35 (4-oct). Ojo: el 18-sep cotizaba a 282,90 USD; ha rebotado un 25 % en tres semanas antes de los resultados del 26-oct. El cierre de 2025 (313,6 USD) es estimación propia a partir de la subida en el año (≈ +12 % el 4-oct) y de la caída del 7,8 % en otro momento del año.
- Decisiones:
  - DCF en US GAAP con la remuneración en acciones como coste (455 M, 8,6 % de las ventas en 2025). Margen EBITDA «limpio» = operativo non-GAAP − remuneración en acciones + depreciación (≈ 38,4 % en 2025); los costes de adquisición e integración se tratan como no recurrentes (estimación propia, sin desglose). WACC 11,04 % (bono 5,22 %, beta 1,1 estimada, prima 5,5 %). Terminal 3,0 % con etapa de transición de 10 años (ROIC − WACC = 12,7 puntos).
  - Objetivo a 12 meses en base **non-GAAP** (la de la guía, del PER histórico y de los comparables). PER histórico sin 2020-2021 (burbuja del software).
  - Sostenibilidad: «Sí». Prueba de reinversión no aplicable (reinversión negativa: la amortización incluye intangibles comprados); hecha a mano con margen (37 % → 45,5 % non-GAAP) y cuota (25,0 % → 27,2 % en 2035e, mercado ESD Alliance de ≈ 21.200 M creciendo al 9 %).
  - Transacciones a `null`: no pudimos leer los comunicados de Synopsys-Ansys ni Siemens-Altair, y Hexagon D&E no publica ingresos.
  - Consejo de administración vacío (no verificado): con un solo consejero el motor daba 0 % de independientes.
- 14-oct, ≈ 14:15: informe cerrado, 19 de 19 controles; Word y PDF (soffice, 37 páginas). Cobertura de campos 75,1 %.
- **Línea 12 m**: Mantener (convicción media). Objetivo ponderado 388,98 USD (+10,2 %), base 400,23 USD (+13,4 %), bajista 301,78 / alcista 453,66; valor intrínseco 147,55 USD (−58,2 %); DCF 139,69 USD (171,41 con la prima del mercado); DCF inverso 19,3 % de crecimiento anual frente al 9,0 % del base. Consenso: 401,44 USD (18 analistas). Comprar < 147,55 USD; vender > 432,19 USD. Detalle en `revision-12m-2026-10-14.md`.
- Pendiente para quien integre: `apuntar-12m.mjs` y `seguimiento.mjs` (no ejecutados por encargo).

## Lecciones

- Con un solo consejero en `gobierno.consejo` el motor calcula «0 % de independientes» y puntúa el criterio como incumplido: si no se puede leer el consejo, mejor lista vacía y hueco registrado.
- Empresas de software de EE. UU. con remuneración en acciones alta (8-9 % de ventas): el DCF GAAP queda un 50-60 % por debajo del precio y el objetivo a 12 meses en base non-GAAP lo supera; la regla «VI ≥ precio» bloquea el Comprar casi siempre. Decirlo en la síntesis y no forzar ninguna de las dos cifras.

# Diario · Lennox (LII) · 2026-10-15

Trabajo en solitario, sin subagentes. Repo al empezar: 70ba47e. No he hecho commit, pull ni push ni he escrito fuera de esta carpeta.

## Pasos
- Cuentas XBRL de la SEC (`cuentas.mjs --sec LII`), 2016-2025. El cambio de LIFO a FIFO del 4T25 reexpresa solo 2023 y 2024: la serie anterior no es del todo comparable en existencias y márgenes.
- Precio: cierre del 14-oct (348,84) porque la sesión del 15 no había cerrado. Movimiento: −38 % desde máximos; 3 m −34,7 %; 12 m −33,1 %.
- Notas A-E generadas a mano con `notas/construir-notas.mjs`; supuestos en `supuestos.mjs`; textos en `textos.mjs`; parte propia en `propio.mjs`.
- Cálculo: 20 de 21 controles. Falla solo «Compra robusta», porque v2 da Mantener (12,2 %). Es esperado y queda explicado.
- Word con 89,1 % de cobertura. Avisos que quedan, sin solución: suma de partes (no aplica), calificaciones ESG (no publicadas gratis), y los gráficos de EV/EBITDA adelantado de comparables (sin EBITDA NTM de un mismo proveedor; mejor vacío que mezclar).
- Robustez: FRÁGIL. Acción robusta Mantener, límite robusto 336,68 USD. Con BPA −10 %: Mantener o No mantener.

## Decisiones
- Comparables con un peso de solo el 15 %, porque el PER de los rivales lo infla la prima de los centros de datos (Vertiv, Trane). Sin ellos, el valor intrínseco baja a ≈332, por debajo del precio.
- Los arrendamientos operativos no cuentan como deuda (US GAAP). Heat Controller va en otros ajustes (205 M).
- Convicción baja: la regla relativa da Comprar y la absoluta Mantener.

## Lecciones (para que el hilo principal decida si van a lecciones)
- La web de inversores de Lennox (Akamai) da 403 a WebFetch y a curl en las transcripciones. Hay que usar resúmenes de terceros (GuruFocus) y los 8-K.
- La búsqueda de MarketScreener lleva a la empresa equivocada. Para el consenso, Yahoo quoteSummary es más fiable.
- Comparables: no mezclar el EBITDA LTM de las cuentas con el NTM de otro proveedor. Si no hay NTM homogéneo, dejarlo en null.
- Cambio de LIFO a FIFO (US GAAP): la reexpresión solo cubre 2 años, así que hay que avisar del salto de serie en calidad y márgenes.

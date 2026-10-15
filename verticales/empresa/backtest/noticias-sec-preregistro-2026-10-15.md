# Preregistro: ¿los hechos de la SEC anticipan peor rentabilidad? (15-oct-2026)

Escrito y subido **antes de mirar ningún dato**. Se ejecuta un domingo (§4.10). Lo pidió el usuario al aprobar el rastreador de noticias (`herramientas/noticias.mjs`): hoy sus avisos solo informan el veredicto de la regla 13; este backtest dice si alguna categoría merece una regla numérica.

## Datos

- Universo: las empresas de EE. UU. de `verticales/empresa/simbolos.json` con CIK en la SEC (las mismas de `fechas-resultados-sec.mjs`). Periodo: 2016-01-01 a 2026-09-30.
- Eventos (fecha de presentación en EDGAR; si se presenta después del cierre, cuenta la sesión siguiente):
  - **E1 salida de directivos**: 8-K con punto 5.02 cuyo texto diga *resign*, *retire*, *depart*, *terminat* o *step down* del CEO o del CFO.
  - **E2 deterioro o reestructuración**: 8-K con punto 2.05 o 2.06.
  - **E3 contabilidad**: 8-K con punto 4.01 (cambio de auditor) o 4.02 (las cuentas anteriores no son fiables).
  - **E4 ventas de directivos en racimo**: tres o más formularios 4 con código de transacción S (venta en mercado) de personas distintas en 30 días naturales, sin marca de plan 10b5-1.
  - **E5 operación corporativa**: 8-K con punto 1.01 o 2.01 que no sea de deuda (sin *credit agreement*, *indenture* ni *notes* en el título del documento).
- Se excluyen los eventos de un 8-K que también lleve el punto 2.02 (resultados), y los que caigan a 3 sesiones o menos de unos resultados, para no medir el salto de los resultados.
- Precio: cierres diarios de Yahoo (`movimiento.mjs`, `serie`). Referencia: SPY.

## Medida

- Rentabilidad relativa frente a SPY a **20 y 60 sesiones** desde el cierre de la sesión del evento.
- Base de comparación: la misma medida en todas las sesiones sin evento de la misma empresa (mediana por empresa y después mediana de empresas).
- Mitades por ticker (`backtest-comun.mjs`): diseño = tickers con orden alfabético impar; validación = pares.

## Criterio (fijado ahora)

Una categoría pasa a **propuesta de regla numérica** (por ejemplo, «retrasa 20 sesiones la compra tras E1») solo si se cumplen las cuatro condiciones:
1. hay al menos 30 eventos en cada mitad;
2. la mediana relativa a 20 sesiones es como mínimo **2 puntos peor que la base** en las dos mitades;
3. la proporción de eventos con relativa negativa a 20 sesiones supera el 55 % en las dos mitades;
4. aplicada a las compras robustas del backtest común, no pierde más del 10 % de las compras y no baja la mediana a 12 meses.

Si no se cumplen, la categoría se queda como **aviso** (que es lo que es hoy) y se anota en el registro de METODO-VIGENTE.md. Nada se adopta sin las palabras del usuario.

## Lo que no mide

Europa y Japón (sin una SEC equivalente cómoda), la prensa (Google Noticias no da un histórico fiable para un backtest) y colocaciones o ampliaciones (son raras en este universo). La prensa se mide aparte con el registro prospectivo de `noticias.mjs --seguimiento`.

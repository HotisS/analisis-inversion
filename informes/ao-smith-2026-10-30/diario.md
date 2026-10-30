# Diario · A. O. Smith (AOS) · 2026-10-30 (hora de Madrid)

Encargo del escáner: versión nueva tras la venta del 81 % de China (8-K del 27-oct) y el 3T26 (29-oct). Repo al empezar: 77bc122.

## Pasos
- 9:51 Carpeta nueva; cuentas XBRL de la SEC (`cuentas.mjs --sec AOS`); `bolsa.mjs` (SPY, XLI): cierre del 29-oct, 63,49 USD (la sesión del 30 no había abierto); `movimiento.mjs AOS`.
- 9:53 Cinco notas en paralelo (A-E), partiendo de las del 9-oct (E nueva) y comprobando en EDGAR.
- 9:56-10:05 Notas terminadas (E, C, A, B y D por ese orden).
- 10:05-10:07 Propio y textos; integrar y calcular: Mantener / Mantener, controles 19/19.
- 10:08 Word (cobertura 91,4 %), PDF, `apuntar-12m --precios`, robustez y `comprobar.mjs` (0 errores; simbolos.json apunta ya a la carpeta nueva).

## Decisiones
- DCF y escenarios solo de la empresa que queda (sin China); China en el puente como asociada por 444 M (81 % a precio de la operación con un 10 % de impuestos supuestos, el 19 % y las regalías). Estimación propia: la empresa no publica el impuesto.
- BPA de los casos: ajustado sin China, con la renta del 19 %, las regalías y ≈5,7 M de acciones recompradas con el dinero de la venta. Historia del PER: ajustado publicado de cada año, con China (el contable del informe anterior inflaba 2021).
- Bajista −3 pp de crecimiento y −1,5 pp de margen, terminal 2,5 %; alcista +2 y +1; 25/50/25.
- Convicción baja (la sugerida por el motor: la regla absoluta da Vender y la relativa Mantener).

## Resultado
- Mantener. v3 17,9 % / base 19,8 %; v2 17,3 %; BPA −10 % 6,3 %. Valor intrínseco 58,07 (< precio). Robustez SÓLIDA; sin nivel; compra robusta por debajo de 58,07; filtro de mantener 68,05.
- Revisión a 12 meses en `revision-12m-2026-10-30.md`; apuntada con `apuntar-12m.mjs --precios`.

# Diario · SILICON2 Co., Ltd. (257720.KQ) · 27-nov-2026

- Commit de partida: **3d983a2** («Escáner 27-nov 9:00: revisiones y señales»). Checkout compartido con otros cuatro agentes (tanda del 27-nov). Sin `git pull/commit/push/stash/checkout/reset/add`. Solo se escribió en esta carpeta y, con `flock`, en lo que escriben `apuntar-12m.mjs silicon2-2026-11-27 --precios` y `robustez.mjs … --actual`. Temporales en `/tmp/claude-0/tanda-1127/silicon2/`. No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md`, `simbolos.json` ni `seguimiento.xlsx`. Del escáner (`/mnt/project-files/cartera/real/escaner/`) solo se leyó el motivo; ningún dato de cartera en el repo.
- Horas (Madrid): inicio 09:57; carpeta nueva 10:01; DART 3T26, consenso, prensa y foro hasta ≈ 10:10 (con una compactación del contexto por medio); textos 10:13; resumen, cálculo, Word y PDF 10:17-10:18; revisión a 12 m, robustez y comprobar 10:19-10:20; diario 10:20.
- Encargo: iteración nueva (la del 20-oct solo como punto de partida). Motivo: el escáner la daba como compra posible de nivel B, el 3T26 hunde el neto (BPA ×0,97 en el escáner) y había un dato marcado.
- Sin subagentes: fases A-E propias (`notas/construir-notas.mjs` y, después, `notas/actualizar-notas.mjs`, que pone al día A, C, D y E con el 3T26, el consenso del 26-nov, el precio y el foro); parte propia en `propio.mjs`, `supuestos.mjs`, `textos.mjs` y `resumen.mjs`.

## Motivo del encargo: resultado

- **Dato marcado**: D2 CORREGIR del 18-nov («precio del informe 1,384 veces el de mercado: parece otra divisa»). Falso positivo: la acción cayó de 32.800 (20-oct, comprobado) a 23.700 de verdad. Hoy, a 30.250, ya no salta.
- **3T26**: neto de 8.801 M (−84,9 %) por −55.088 M de diferencias de cambio (el dólar −11,9 % frente al won en el trimestre), deterioro de Sukoshi Mart (−3.931 M) y un impuesto del 60 %: no recurrente. Recurrente: margen operativo del 16,4 % (bruto 28,7 %, personal +71 %).
- **BPA base 2028e**: 4.119 → 3.903 (×0,948, más que el ×0,97 del escáner).
- **Nivel hoy: ninguno** (A 27.892,09; B 29.160,49).

## Pasos y fecha de los datos

| Paso | Herramienta / fuente | Fecha del dato |
|---|---|---|
| Dato marcado por el escáner | `robustez.mjs informes/silicon2-2026-10-20`, `escaneo-ultimo.json`, `mensaje-ultimo.md` (solo lectura) | 18 y 27-nov-2026 |
| Beta, rentabilidades, volatilidad, máximos y mínimos | `bolsa.mjs --accion 257720.KQ --indice ^KQ11 --sector 228790.KS --corte 2026-11-27` | cierre 27-nov-2026 |
| Precio | Yahoo y `apuntar-12m.mjs --precios` | cierre 27-nov-2026: 30.250 KRW |
| Movimiento (regla 13) | `movimiento.mjs 257720.KQ` | 27-nov-2026 |
| Resultados provisionales 3T26 | DART, aviso 20261111900551 | 11-nov-2026 |
| Trimestral 3T26 (cuenta, notas de cambio, balance, flujos, accionistas, recompra) | DART, rcp 20261113000882; fin de recompra 20261113000442 y 20261113000832 | 13-nov-2026 (datos a 30-sep) |
| Cuentas 2021-2025 y 1S26 | las del informe del 20-oct (DART), sin cambios | 2023-03-22 a 2026-08-14 |
| Consenso y objetivos | FnGuide/WiseReport (`c1050001_data.aspx`), 13 casas | 26-nov-2026 |
| Prensa e informes de casas (3T26, won, objetivos, rebote) | Seoul Economic, Maeil, KIS, Yuanta, Samsung, KB, Edaily, Korea Report | 11 al 26-nov-2026 |
| Bono coreano a 10 años | FRED IRLTLT01KRM156N | octubre de 2026 (4,21 %) |
| Prima de mercado | Damodaran ERPbymonth | noviembre de 2026 (4,41 %) |
| Comparables y tipos de cambio | Yahoo (10 fichas), KRW=X, JPYKRW=X, EURKRW=X | 27-nov-2026 |
| Foro | Naver 종목토론실, 100 mensajes | 26 y 27-nov-2026 (hora de Corea) |
| Integración, cálculo, Word y PDF | `motor/integrar.mjs`, `motor/calcular-empresa.mjs`, `motor/rellenar.mjs`, LibreOffice | 27-nov-2026 |
| Objetivo a 12 m | `flock … apuntar-12m.mjs silicon2-2026-11-27 --precios` | 27-nov-2026 |
| Robustez | `flock … robustez.mjs informes/silicon2-2026-11-27 --actual` | 27-nov-2026 (30.250 KRW) |
| Comprobación | `comprobar.mjs` (sin `--escribir`) | 27-nov-2026: ningún ERROR de esta carpeta |

## Decisiones

- **2026e fijo** con 9M publicados: ventas de 1.602.988 M (+43,6 %) y BPA publicado de 2.629 KRW (beneficio de 173.500 M con las pérdidas de cambio del 3T; 4T con beneficio operativo ≈ 57.000 M, el del consenso). Después 24 / 16 / 11 / 8 / 6 / 5 / 4 %; margen EBITDA 18,1 % → 16,8 % → 16,6 % → 16,0 % (antes 17,5 % en 2028e): el 3T confirma el won y el poder de las marcas.
- **Circulante** del 27 % en 2026e (el dato de sep-2026) y 29 % después; los dos controles que fallan quedan explicados.
- WACC 11,71 % (bono 4,21 %, prima 4,41 % + ajustes); RCPS de CVC como deuda en el DCF y como acciones en el BPA (71,96 M).
- **Historia del PER**: 2022 y 2023 excluidos (BPA atípico); 3 años → selector → **v2** (17,7 %) frente a v3 (30,3 %).
- **Recomendación Mantener** pese a la regla Comprar: B1 (BPA −10 % → 6,0 %) y M2 CONFIANZA; se comunica la acción robusta.
- Regla 13: **no cambia** (causas conocidas: won, 3T por debajo, recortes; recompra terminada; sin ventas del fundador).
- Lecciones propuestas (no escritas): la marca D2 de `robustez.mjs` salta como «otra divisa» tras una caída real del precio ≥ 28 %; consenso coreano por WiseReport `c1050001_data.aspx` cuando las páginas de Naver vuelven vacías.

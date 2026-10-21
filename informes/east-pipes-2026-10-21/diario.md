# Diario · East Pipes (1321.SR) · análisis value · corte 21-oct-2026

- Encargo: análisis value completo desde cero, en un checkout compartido con otros análisis en paralelo (sin pull, commit ni push; solo esta carpeta, mi entrada de `simbolos.json` y lo que escriben `precios.mjs` y `apuntar-12m.mjs` para 1321.SR).
- Commit de partida: `117aa0b Fastenal: precios tras rebase` (durante el trabajo el coordinador hizo `333c18b SHIFT…`; mi entrada de `simbolos.json` se añadió después y `precios.mjs` y `apuntar-12m.mjs` se pasaron después de ese commit).
- Horas (UTC, reloj del contenedor): inicio ≈ 14:06; cuentas y bolsa ≈ 14:10-14:12; cálculo final, Word y PDF 14:28-14:29; precios, 12 meses y robustez ≈ 14:31-14:33.

## Decisiones

- **Ejercicio a 31 de marzo, etiqueta «fin»** (FY2026 = abr-2025 a mar-2026). `bolsa.mjs` se repitió con `--etiqueta fin` porque la primera vez etiquetó por año de inicio. Ejercicio objetivo a 12 meses: FY2029e; PER actual = precio ÷ BPA de FY2028e.
- **Cuentas**: estados financieros anuales completos de FY2026 (EY) y FY2025/FY2024 (con FY2023 comparativo) de Argaam; FY2022 (PwC) leído de las páginas escaneadas. No hay XBRL utilizable de Tadawul en `cuentas.mjs`. 2T27: nota de resultados del 1S FY2027, publicada hoy a las 15:49 de Riad (después del cierre).
- **EBITDA sin los intereses de los depósitos**: van al resultado financiero (la empresa los incluye en su EBITDA: 655,8 frente a 640,0 M en FY2026).
- **Impuestos**: zakat más el 20 % sobre la parte extranjera (Welspun) → tipo efectivo del 8-10 %; el DCF usa el 8 %. Robustez D5 lo marca: falso positivo (lecciones-paises, Arabia Saudí).
- **WACC 12,49 %**: Treasury a 10 años 5,15 % (FRED, 19-oct) + diferencial soberano 0,51 % = 5,66 %; beta 1,10; prima 5,5 %; prima de país 0,78 %; sin deuda. Prima implícita del mercado 4,2 % (Damodaran, oct-2026).
- **Caso base**: FY2027e −14,5 % (1S publicado + 2S con el contrato de Aramco), FY2028e +12 % y después casi plano; margen EBITDA del 25 % bajando al 20,5 % de mitad de ciclo. Los pedidos récord de 2024-2026 se tratan como pico: no hay cartera publicada desde 2022 y la historia (margen del 6,5 % en FY2022) lo aconseja.
- **Puente**: balance a 30-sep-2026 (caja 995,2 M, sin deuda), arrendamientos e indemnizaciones de mar-2026, y el dividendo de 2 SAR (63 M; derecho el 22-oct) restado porque quien compra al cierre del 21-oct no lo cobra.
- **Comparables** calculados desde Yahoo con un script (`notas/yahoo.mjs`), no tecleados; Tenaris por TEN.MI (el ADR daba un EV/EBITDA erróneo). Sin EV/EBITDA adelantado de los comparables: el gráfico de dispersión no se dibuja (hueco registrado).
- **ISIN**: el primero que puse era inventado; se sustituyó por SA15GH80KKH0, comprobado en dos fuentes.
- **Sentimiento y transacciones**: null con hueco registrado (Stocktwits, Hawamer e Investing devolvieron 403/404; no hay transacciones con múltiplo publicado).
- **Regla 13**: −18,6 % en un mes, explicado por el 1T27 y la espera del 2T27, que el caso base ya recoge → no cambia.
- **IA**: riesgo bajo (fabricación pesada de tubo; efecto 0 % a +2 %).
- **Tamaño y liquidez para IBKR**: capitalización 5.459 M SAR (≈ 1.460 M USD), ≈ 43 M SAR al día (≈ 11,5 M USD). IBKR da acceso a Tadawul (vía SNB Capital); conviene confirmar el permiso de la cuenta.
- **Controles**: 20 de 27 correctos y 7 explicados (tipo efectivo FY2024-26, perímetro FY2024 por el circulante de Aramco, proyección frente a consenso FY2027-29e).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales FY2022-FY2026 | Estados financieros auditados (Argaam / web de la empresa) | 31-mar-2026 (FY2026, EY) |
| Trimestres y 1S FY2027 | Notas de resultados a Tadawul (1T27, 2T27) | 30-sep-2026 (publicado 21-oct, 15:49 Riad) |
| Cotización, betas, cierres de ejercicio | `herramientas/bolsa.mjs` (Yahoo) | Cierre 21-oct-2026 (173,30 SAR) |
| Movimiento (regla 13) | `herramientas/movimiento.mjs 1321.SR` | 21-oct-2026 |
| Comparables | `notas/yahoo.mjs` (Yahoo quoteSummary) | 21-oct-2026 |
| Consenso y objetivos de analistas | MarketScreener (3 analistas) | Anterior al 2T27 (oct-2026) |
| Tasa libre | FRED DGS10 | 19-oct-2026 (5,15 %) |
| Prima de país, diferencial soberano, prima implícita | Damodaran | Ene-2026 / oct-2026 |
| Mercado de tubo saudí | P&S Intelligence | 2025 (previsión a 2030) |
| Gobierno y accionistas | Informe del consejo FY2026, Tadawul | Mar-2026 / jul-2026 |
| Cálculo | `motor/integrar.mjs` + `motor/calcular-empresa.mjs` (dos pasadas) | 21-oct-2026 |
| Word y PDF | `motor/rellenar.mjs` + soffice | 21-oct-2026 |
| Precio en `precios.json` | `herramientas/precios.mjs 1321.SR` | Cierre 21-oct-2026 (173,30 SAR) |
| Rentabilidad a 12 meses apuntada | `herramientas/apuntar-12m.mjs` | 21-oct-2026 |
| Robustez | `herramientas/robustez.mjs --actual` | Precio 173,30 SAR del 21-oct |

## Resultado

Mantener (convicción baja; reglas absoluta Vender y relativa Mantener). 12 meses −6,8 % ponderada / −0,7 % base; valor intrínseco 162,35 SAR (−6,3 %). Robustez: SÓLIDA, acción robusta «No mantener»; límite robusto de compra 127,08 SAR. Calidad: pasa (ROIC − WACC ≈ 40 puntos, sostenibilidad «Sí»).

## Lecciones propuestas (no escritas en lecciones*.md)

- `bolsa.mjs` con ejercicio no natural: pasar siempre `--etiqueta` con el valor del informe (`fin` si el ejercicio se nombra por el año en que acaba); si no, los cierres de ejercicio salen desplazados un año.
- Empresas saudíes que publican resultados después del cierre del día del corte: decir en la regla 13 que el precio no recoge aún la noticia y que el caso base sí.
- El EBITDA que publican algunas saudíes incluye los intereses de los depósitos: separarlos para no inflar el margen de explotación.

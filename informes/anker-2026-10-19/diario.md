# Diario · Anker Innovations (300866.SZ) · 19-oct-2026

- Commit de partida: `8423ff3b02a6844db49a7a02c9986fad46ad9951` (2026-10-19 17:05 UTC). Checkout compartido con otro análisis en paralelo: sin pull, commit, push, checkout ni stash desde este hilo.
- Inicio: 17:06 UTC. Fin: ≈ 17:40 UTC (reloj del sistema; la sesión se partió en dos por contexto).
- Análisis nuevo, método completo (no había informe anterior de Anker). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, con la forma de `informes/sieyuan-2026-10-19/` (China, CAS) y `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Cuentas**: `cuentas.mjs` no cubre China. Estados CAS 2019-2025 y trimestrales 2024-2026 transcritos de la base F10 de Eastmoney (`cuentas-cas-*.json`) y comprobados contra los anuales 2021-2025, el semestral 2026 y los trimestrales de CNINFO; el folleto H (jun-2026) y los resultados NIIF del 1S26 de HKEX completan Amazon, aranceles, retiradas y pleitos.
2. **EBIT** = resultado de explotación + gastos financieros netos − ingresos de inversiones − valor razonable + resultado no operativo (misma definición que Sieyuan). Subvenciones (55 M) y deterioro de existencias dentro.
3. **Devolución de aranceles IEEPA del 1S26**: la empresa la restó del coste de ventas sin cifra; se usa la estimación de los analistas (≈ 700 M: Sinolink, por el aumento de las devoluciones en caja; Soochow, ≈ 100 M USD) como no recurrente con signo negativo en el LTM y no se proyecta (ya está en la caja de junio). El resto de lo pagado en 2025 (143 M USD de aranceles en total) es un posible cobro pendiente no contabilizado: solo catalizador.
4. **BPA y DPA de 2021-2022 ÷ 1,3** (ampliación gratuita de 3 por 10 de 2024); 2023 ya venía reexpresado.
5. **Acciones**: 539,36 M A + 50,08 M H (30-sep-2026) + 10,4 M del convertible en el dinero (conversión a 105,96 CNY) = 599,9 M. El convertible no va como deuda.
6. **Puente (30-jun-2026)**: deuda bancaria 1.678,4; arrendamientos 279,6; caja 6.472,7 (tesorería + renta fija + certificados de depósito); asociadas 2.048,1 (puesta en equivalencia + participaciones cotizadas y no cotizadas); minoritarios 161,3; otros ajustes −3.666,7 (caja neta de la salida a Hong Kong, 4.860,9 M HKD × 0,8511, menos el dividendo de septiembre de 470,4).
7. **WACC 7,97 %**: tasa 1,6497 % (ChinaBond), beta 1,0 (0,99 mensual 5 a), prima 5,5 % + 1,0 % (0,5 China + 0,5 Amazon y aranceles). Terminal 1 %.
8. **Margen**: EBITDA 9,0 % en 2026e (sin la devolución), 9,5 % en 2027e y 10 % desde 2028e, el de 2023-2025; el consenso espera 11,8 %. Diferencia explicada en los controles.
9. **Historia del PER adelantada**: 2020 (67,9x, año de la salida a bolsa) fuera; 2021-2025 dentro (mediana 19,13x, mínimo 14,95x, media 21,68x). Comparables sin Sonos ni Arlo (márgenes del 1-2 %).
10. **Precio**: el informe usa el cierre del 19-oct de Sina (110,40 CNY, dato de las 15:35 de Pekín = 07:35 UTC). Yahoo, `bolsa.mjs`, `movimiento.mjs`, `precios.mjs` y `robustez.mjs --actual` solo tienen el cierre del 16-oct (108,91): la robustez se calculó a 108,91; a 110,40 la acción robusta no cambia (ambos por encima del límite robusto de 106,25).
11. **Stock Connect / IBKR**: 300866 está en la lista de HKEX de valores de Shenzhen comprables por el Northbound (n.º 1750, 16-oct-2026), pero el FAQ de HKEX limita el ChiNext a inversores profesionales institucionales: un particular no puede comprar la A desde IBKR; sí la H (0668.HK, 105,90 HKD ≈ 90,1 CNY, ≈ 18 % por debajo de la A).
12. **Pleitos**: solo se citan los del folleto H (Sloan, Fundamental, Powermat; provisión de 198,5 M). El de NEC (Texas) aparece en prensa pero no en el folleto ni en los informes: no se cita.
13. **Regla 13**: veredicto «no cambia». Caída del 20,6 % desde el máximo del 3-sep con causas con fecha y ajenas a la empresa (venta de hardware del 8-oct, ChiNext −3,15 %) y dudas sobre el margen sin la devolución, que el base ya quita. Resultados del 3T26 el 29-oct: no aplazan (regla 11).

## Resultado

- Regla a 12 meses (v3, sin marcas del selector) a 110,40: ponderada 22,6 %, base 24,3 % → **Comprar** (convicción baja); `apuntar-12m`: 22,7 % / 24,4 % (v2 28,1 %).
- Valor intrínseco 114,72 CNY (+3,9 %); DCF 113,46 (WACC 7,97 %); con la prima del mercado 132,64. Regla absoluta Mantener, relativa Comprar.
- Calidad: ROIC 34,2 % − WACC 7,97 % = 26,2 puntos; sostenibilidad «Sí». Pasa.
- Robustez (`--actual`, 108,91): SÓLIDA; acción vigente Comprar, **acción robusta Mantener en cartera**; falla B1 (BPA −10 %: 12,1 % / 13,7 %). Límite robusto común **106,25 CNY**; límite de compra 114,72; filtro de mantener 123,12.
- Controles: 22 de 29 correctos y 7 explicados (tipos impositivos de 2023-2025, múltiplos LTM/NTM de Anker y proyección frente a consenso 2026e-2028e).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2021-2025, 1S26, 1T26, 3T25 | Informes de CNINFO (anuales, semestral, trimestrales) + base F10 de Eastmoney comprobada | Anual 2025 del 10-abr-2026; semestral del 31-ago-2026 (cierre 30-jun-2026) |
| Folleto y resultados NIIF | HKEXnews (folleto H, resultados del 1S26, retorno mensual de septiembre) | 23-jun-2026; 30-ago-2026; 7-oct-2026 |
| Anuncios (H, convertible, dividendos, juntas, dilución) | CNINFO hisAnnouncement (orgId gfbj0839473) | oct-2025 a 19-oct-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs` (Yahoo) | cierre del 16-oct-2026 |
| Precio de la decisión | Sina hq.sinajs.cn (sz300866, hk00668) | cierre del 19-oct-2026 (110,40 CNY; 15:35 Pekín) |
| Consenso | Eastmoney (notas de analistas) y notas de Soochow, Guosen, Kaiyuan, Sinolink; Yahoo earningsTrend | 31-ago a 3-sep-2026; Yahoo 19-oct-2026 |
| Comparables | `notas/comparables-yahoo.mjs` (Yahoo) | 19-oct-2026 |
| Tasa libre | ChinaBond, curva de deuda pública | 19-oct-2026 (1,6497 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Sector | Frost & Sullivan en el folleto H | 2025 y previsiones 2026-2030 |
| Stock Connect | HKEX: lista de valores de SZSE y FAQ | 16-oct-2026; FAQ del 6-jul-2026 |
| Sentimiento | Guba de Eastmoney | 8 a 19-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs 300866.SZ` | cierre del 16-oct-2026 (108,91) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 19-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs anker-2026-10-19` | precio del informe 110,40 (19-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada 300866 añadida) | 19-oct-2026 |
| Precios | `herramientas/precios.mjs 300866` | cierre del 16-oct-2026 (Yahoo sin el del 19-oct) |
| Robustez | `herramientas/robustez.mjs informes/anker-2026-10-19 --actual` | 108,91 (16-oct; sin sesión en curso) |

## Comprobación de la vía H (0668.HK), 17:40 UTC

- **Precio H**: 105,90 HKD, cierre del 16-oct-2026 a las 16:08 de Hong Kong (Sina hk00668 y Yahoo; Hong Kong cerrado el 19-oct). **Cambio HKD/CNY de hoy**: 0,8511 (Yahoo HKDCNY=X, 17:37 UTC; Sina 0,85127). H en CNY: 90,13; la A el mismo día (16-oct) 108,91: descuento del 17 % (≈ 18 % frente al cierre de hoy de la A).
- **Robustez con la H** (copia temporal en el scratchpad, `precios.json` del repo sin tocar; misma función de `robustez.mjs`): a 90,13 CNY, v3 50,3 % / 52,3 %, v2 56,9 % / 50,7 %, BPA −10 % 35,5 % / 37,4 %, precio por debajo del límite común (106,25) y del valor real (114,72), calidad igual (ROIC − WACC 26,2 puntos, sostenibilidad «Sí»). La herramienta da acción robusta «Mantener en cartera» solo por la marca E3 (precio −18 % frente al del informe), que aquí es el descuento A/H y no una noticia; con el precio del informe igualado a la H la acción robusta es Comprar (límite 105,84). **Mecánicamente sería COMPRA ROBUSTA, pero no lo doy por bueno**: el objetivo sale de la historia de PER de la A y el descuento de la H es estructural (mediana ≈ 19 %, rango 3-29 % desde el 2-jul, cambio aproximado constante 0,853); con el descuento constante la H rinde lo mismo que la A y su límite equivalente es 106,25 × 0,829 = 88,1 CNY ≈ 103,5 HKD, por debajo de 105,90.
- **Límite común en HKD**: 106,25 / 0,8511 = 124,84 HKD (mecánico, sin descuento A/H); 103,5 HKD manteniendo el descuento del 16-oct.
- **Regla 13 de la H**: `movimiento.mjs 0668.HK` no funciona («serie demasiado corta»: Yahoo solo tiene un día); con la serie de Tencent: 1 m −11,1 %, desde el 20-jul +3,1 %, −23,2 % desde el máximo del 4-sep (137,87), +14,8 % sobre el mínimo del 17-jul, +6,6 % sobre el precio de salida (99,32), volatilidad de 60 sesiones del 57 %; mismos días fuertes que la A (−6,7 % el 8-oct). Hecho con fecha propio de la H: el 2-ene-2027 vence el bloqueo de seis meses de los inversores ancla (23.271.700 acciones H, el 46 % de las H, ≈ 190 días de negociación). **Veredicto de la H: retrasa** hasta el fin del bloqueo (2-ene-2027) o hasta un descuento frente a la A que lo descuente (≥ 25 %, el extremo alto del rango). La A no se ve afectada.
- **Liquidez de la H**: ≈ 13,1 M HKD al día de media en 20 sesiones (mediana 12,9 M; 32,4 M de media en 60 por los primeros días), unas 40 veces menos que la A (≈ 466 M CNY al día).
- Párrafo añadido en la sección de bolsa (fuente nueva D20); Word y PDF regenerados. Sin cambios en cifras, objetivo ni recomendación.

# Diario · ASPEED (5274.TWO) · análisis value · corte 13-nov-2026

- Commit de partida: `645f096` (tanda de 10 análisis paralelos; sin pull, commit ni push en este encargo; sin subagentes: notas A-E hechas por el orquestador).
- Punto de partida: `informes/aspeed-2026-10-20/` (mismo ticker 5274.TWO). Cada dato se vuelve a comprobar a la fecha de corte.

## Pasos (hora de Madrid)

| Hora | Paso |
|---|---|
| 13-11 08:54 | Inicio: lectura de analiza-empresa.md, prompt.md, lecciones (núcleo y Taiwán), METODO-VIGENTE (reglas 13 y 16). Robustez del informe viejo con candado: D2 CORREGIR. |
| 13-11 09:04 | Datos nuevos: 3T26 de MOPS (mopsov, XBRL del 3T26), resultados 9M del OpenAPI del TPEx, ventas de octubre (API de la empresa), bolsa.mjs y movimiento.mjs (cierre 13-nov 12.000), Yahoo quoteSummary (consenso y 10 comparables), bono 10 años (1,86 %), Damodaran nov-2026 (4,41 %), prensa del 3T y del desplome del 5-6 nov, PTT. |
| 13-11 09:07 | Notas A-E escritas (A: 3T26, LTM sep-26, balance y puente de sep-26; B: Marvell IMCS; C: registros del TPEx; D: identificación, consenso, bolsa con contexto, comparables rehechos; E: PTT de noviembre). |
| 13-11 09:11 | propio (supuestos, bpa12m, textos, resumen) reescrito; integrar y calcular: Mantener, 18 de 20 controles + 2 explicados. |
| 13-11 09:13 | Word (24 gráficos, cobertura 83,9 %) y PDF con soffice; revisión 12 m escrita; `apuntar-12m.mjs aspeed-2026-11-13 --precios` y `robustez.mjs` con candado. |

| 13-11 09:13 | comprobar.mjs: 1 ERROR (C1, 2636.HK Transsion, de otra carpeta de la tanda) y ninguno de ASPEED. Fin. |

## Decisiones

- **Causa del «Sin señal (corregir dato)» del informe anterior**: la marca D2 de `robustez.mjs`. El precio de aquel informe (15.900, 20-oct) frente al de mercado tras el 3T26 (11.955, 12-nov) da un cociente de 1,33, a menos de un 8 % del cambio libra-dólar, y la prueba lo toma por un precio en otra divisa. No había dato mal puesto: la caída es real (TAIEX −14 % y ASPEED −34 % del 28-oct al 6-nov, con −10 % el 5 y el 6-nov). Comprobado en el 3T26 oficial (MOPS): capital social 415,83 M TWD = 41,583 M acciones (las mismas del informe), BPA diluido de enero-septiembre 126,28 ya en la base de hoy, 9M-2025 reexpresado (65,51) y el dividendo en acciones de 1 por 10 (Yahoo: «split» 1.100:1.000 el 6-jul-2026) ya recogido; cierres de Yahoo ajustados. El límite de 5.610 del informe viejo no era un error: es su valor intrínseco (requisito «valor real ≥ precio»). Corregido en la versión nueva con el precio del 13-nov (12.000): ya no salta D2.
- **Base de BPA**: publicado (diluido reexpresado) en historia y escenarios (`base_bpa: "publicado"`).
- **Cuentas**: el 3T26 no está aún en la web de la empresa (403); MOPS (mopsov.twse.com.tw, `t164sb01`, en Big5) sí abre desde la nube y da el XBRL completo. 3T26 = 9M − 1S (EBITDA del 3T: 2.605,6 M con 109,1 M de amortización).
- **Puente** a sep-26: caja 8.883,9 (efectivo, depósitos a plazo, activos financieros a corto y renta fija a largo a coste amortizado), deuda bancaria 400, arrendamientos 317,8, minoritarios 29,4, participaciones financieras 640,8 en «asociadas»; sin dividendo pendiente (pagado en julio).
- **DCF**: mismo esquema que el 20-oct; margen EBITDA 2027e-2028e del 57 % al 56 % (gastos del 3T26), 2026e 55,3 %, bono 1,86 % y terminal 1,35 % (techo: bono − 0,5). Sin tres etapas.
- **Comparables** rehechos con Yahoo del 13-nov (no llevados al precio); eMemory fuera (sin capitalización en Yahoo). Mediana PER NTM 28,7x.
- **Regla 13**: veredicto «no cambia»; caída de mercado y de múltiplo, sin hechos pendientes (colocaciones, ampliaciones, preavisos de venta).
- **Resultado**: Mantener (regla 12 m: +24,2 % / +29,8 %, pero valor intrínseco 5.261,40 < precio). Robustez SÓLIDA; si la tienes: Vender (filtro de mantener hasta 6.189,88); compra robusta no; nivel ninguno; límite 5.261,40 TWD.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales 2018-2025 | Web de la empresa (Deloitte), contrastadas con el comparativo del 3T26 | 31-dic-2025 |
| 3T26 | MOPS XBRL (mopsov) y TPEx OpenAPI | 30-sep-2026 (publicado 6-nov) |
| Ventas de octubre | API de la empresa | 5-nov-2026 |
| Bolsa, beta, cierres, movimiento | `bolsa.mjs`, `movimiento.mjs 5274.TWO` | 13-nov-2026 (12.000) |
| Consenso y comparables | Yahoo quoteSummary | 13-nov-2026 |
| Bono 10 años | Trading Economics | 13-nov-2026 (1,86 %) |
| Prima implícita | Damodaran ERPbymonth | nov-2026 (4,41 %) |
| Sentimiento | PTT Stock | 5-nov-2026 |
| Revisión 12 m y robustez | `apuntar-12m.mjs --precios`, `robustez.mjs` | precio de precios.json (11.955, 12-nov) |

## Para quien mantenga las lecciones (no tocadas)

- Taiwán: MOPS sí abre desde la nube por `mopsov.twse.com.tw/server-java/t164sb01?step=1&CO_ID=XXXX&SYEAR=AAAA&SSEASON=N&REPORT_ID=C` (XBRL completo, Big5); `mops.twse.com.tw` sigue bloqueado.
- `robustez.mjs` D2 da falsos CORREGIR tras caídas o subidas del 20-35 % (cociente cerca de 1,27-1,36 = GBP/USD): convendría que mirase la historia de precios antes de suponer otra divisa.

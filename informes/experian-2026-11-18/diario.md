# Diario · Experian (EXPN.L) · 18-nov-2026

- Commit de partida: 254cbac (Nvidia 18-nov). Tanda de 10 informes value en paralelo (encargo común); sin subagentes: fases A-E hechas por mí, notas A-E escritas con `notas/notas_build.py` (B y E parten de la iteración del 14-oct).
- Motivo: semestral FY27 publicado hoy, 18-nov-2026 a las 7:00 (RNS). Informe anterior: `informes/experian-2026-10-14/` (sin red, precio y balance estimados).
- Fecha de corte 2026-11-18. Cuentas en USD; cotiza en GBp. Ejercicio a marzo, etiqueta «fin» (FY2026 = abr-25 a mar-26). Próximos resultados: actividad del 3T FY27, 2-feb-2027 (RNS del semestral).

## Pasos (hora de Madrid)

- 12:21 Lectura del encargo, procedimiento, prompt, lecciones (núcleo, Reino Unido, casos), METODO-VIGENTE §2 y §4.
- 12:22 `cuentas.mjs --esef "Experian"` → `notas/cuentas-xbrl.json` (ESEF FY2020-FY2026, LEI 635400RXXHHYT1JTSZ26; una sola entidad).
- 12:23 Documentos: web de Experian bloqueada por Incapsula; RNS por Investegate (semestral 18-nov, recompra 500 M, TVR 30-sep y 30-oct, nombramiento de presidente, bono, PDMR, declaración de consejera) y resultados FY26; informe anual 2026 (PDF de experianplc.com sí baja).
- 12:24 Precio: `bolsa.mjs` → cierre 17-nov 2.819 p (la sesión del 18-nov abierta; 2.857 p a media sesión). GBP/USD BCE 17-nov 1,3191 → 37,19 USD. Bono EE. UU. 10 años 5,10 % (Tesoro, 17-nov). `movimiento.mjs EXPN.L`. `noticias.mjs --meses 12 --valores EXPN-(LSE)` (la clave `experian` no existe en simbolos.json; da 0 valores).
- 12:27 Consenso y comparables al día con Yahoo quoteSummary (EXPN.L y 9 comparables). Noticias del sector (FHFA, FICO) por búsqueda web.
- 12:30 Notas A-E, `supuestos.mjs`, `propio.mjs`; 12:33 primer cálculo; 12:36 `apuntar-12m --precios`; 12:37 textos y resumen; 12:38 Word y PDF (soffice); 12:39 revisión 12 m, `apuntar-12m --precios` y `robustez --actual` con flock; `comprobar.mjs`: 0 errores (aviso C10 de simbolos.json → carpeta vieja, lo cambia el coordinador).

## Decisiones

- Base de BPA: **benchmark (ajustado)** en cuenta, historia del PER y escenarios (`base_bpa: "ajustado"` en los dos sitios). Serie de ingresos, EBIT benchmark y BPA benchmark FY20-FY26 del informe anual 2026 (págs. 44 y 65). Amortización benchmark FY25-26 publicada (547, 613); FY20-24 estimada (72 % de la amortización total del ESEF).
- Historia adelantada a mano con la misma lógica que `historia-adelantada.mjs` (cierre de marzo × GBP/USD del BCE ÷ BPA benchmark real del año siguiente); el cierre del FY26 no entra (falta el BPA real del FY27). FY2019 fuera (BPA no verificado). Mediana 27,6x, mínimo 22,6x, media 26,6x; v2 al cierre 29,4x / 19,1x / 27,8x.
- BPA FY29e: 2,29 / 2,48 / 2,61 (FY27e en la guía, ≈2,02; FY28e 2,27 = consenso). Acciones 853 M (880,6 hoy menos las recompras anunciadas pendientes).
- WACC: bono de EE. UU. 5,10 %, beta 1,0 (1,01 mensual 5 años y 0,91 semanal 2 años frente al FTSE 100), prima 5,5 %, 16 % de deuda → 9,44 %. La beta en USD frente al S&P salió 0,04 con mensuales de Yahoo (fechas desalineadas); descartada.
- Comparables rehechos (no llevados al precio): los 8 del informe anterior + RELX (LexisNexis Risk compite en identidad y fraude). Mediana PER NTM 19,2x.
- Sostenibilidad «Sí» con prueba a mano (reinversión neta 1 % del NOPAT): 6,1 % proyectado frente a 7-8 % orgánico real; reinversión bruta financia 5,7 % y el resto es precio. `mercado_final` null (sector heredado, cuota en volumen no medible).
- Convicción Baja (la sugerida): absoluta Mantener / relativa Comprar; la diferencia es la tasa libre de EE. UU.
- Nota B (sector y competencia) heredada sin rehacer cifras de mercado; añadidos los drivers de la FHFA y de los tipos hipotecarios.

## Resultado

- **Rentabilidad a 12 meses (v3, decide)**: ponderada +26,9 %, base +21,9 % → Comprar; objetivo ponderado 46,49 USD (≈3.524 p). **v2 de control**: 15,4 % / 11,3 % → Mantener. Valor intrínseco 39,60 USD (≈3.002 p, +6,5 %); DCF 39,18 (WACC 9,44 %), DCF inverso 5,2 % frente a 5,9 %.
- **Robustez (--actual, 2.854 p)**: FRÁGIL; si la tienes: Mantener; compra robusta: no (No comprar como A); **nivel B hoy** (límite B 2.933,47 p; límite A 2.768,65 p); filtro de mantener 3.252,60 p; colchón de BPA 8 % (comprar) y 13 % (mantener); ROIC − WACC 8,0; marca M6 (aviso de elasticidad). Regla 13: no cambia.
- Selector cerca del umbral: mediana adelantada / PER actual = 1,68 (umbral 1,8); a ≈2.630 p decidiría la v2.

## Qué cambió frente al informe del 14-oct

- El anterior se hizo sin red: precio 2.457,5 p (recompra del 2-oct) y GBP/USD supuesto 1,35; balance, capex y cierres de marzo estimados; confianza baja. Este parte del ESEF, del informe anual, del semestral y del cierre real (2.819 p, +15 %).
- Señal: Mantener (v2, desrateada con relación 1,9) → Comprar v3 (relación 1,68, ya no desrateada). BPA FY29e 2,47 → 2,48; valor intrínseco 42,03 → 39,60 (deuda neta real 6.045 M frente a 5.180 estimada, beta 1,0 frente a 0,9 supuesta).
- Guía FY27: orgánico 6-8 % → 6-7 % (hipotecas EE. UU.), BPA «dos dígitos» → ≈ +12 %, margen ≈ +50 pb → ≥ +50 pb; recompra nueva de 500 M USD.
- **Señal de alarma anterior** («B2B de Norteamérica por debajo del 5 % orgánico»): **no se cumplió** (B2B Norteamérica +11 % orgánico en el semestre, 11 % en el 1T y en el 2T). El orgánico total de Norteamérica sí baja al 5 % en el 2T por Consumer Services (−7 %).

## Lecciones

- `noticias.mjs --valores` usa la clave de `simbolos.json` (aquí `EXPN-(LSE)`), no el nombre corto de la carpeta: con `experian` devuelve 0 valores sin avisar.
- Web de Experian (experianplc.com) bloqueada por Incapsula para las páginas, pero los PDF de `/content/dam/…` bajan con `descargar.mjs`; los RNS completos, por Investegate (saltar el «Summary by AI»).
- En burós de crédito los saltos de precio de 2026 son de sector (FHFA, FICO): comparar el día con EFX y TRU antes de buscar una causa propia.

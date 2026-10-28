# Diario — Zoetis (ZTS), corte 2026-10-28

- Commit de partida: `a7272a4 Escáner: el motivo de «no se amplía» sale de reglas.json (Daiichi no lo decidió Hotis); comprobar.mjs vigila C7 en los grupos de cerca y C20`.
- Encargo: análisis completo nuevo antes de decidir sobre una posición que el usuario mantiene por decisión propia. Iteración del informe `zoetis-2026-10-07` (v4). Fases 2-4 hechas por el propio analista, sin subagentes (cinco análisis en paralelo).
- Horas en hora de Madrid (UTC+1).

## Fase 1 — Identificación (10:16)
- Zoetis Inc., NYSE ZTS, ISIN US98978V1035, CIK 0001555280, USD, US GAAP, ejercicio a 31-dic, cuenta por función.
- Precio: cierre del 27-oct-2026, 78,23 USD (la sesión del 28 no había abierto; bolsa.mjs).
- Próximos resultados: 3T26 el 5-nov-2026 (calendarEvents de Yahoo, no estimado; anuncio del webcast [D6]).
- Sin 10-Q nuevo desde el 7-oct: último balance, 30-jun-2026. EDGAR desde el 7-oct: 8-K del 8-oct (dividendo de 0,53 USD del 4T26) y 8-K del 13-oct (Iris Knobloch, consejera desde el 1-dic); Form 4 del 13-oct (consejeros; form4.mjs no muestra compras ni ventas en mercado desde mayo).

## Fases 2-4 (10:16-10:25)
- `cuentas.mjs --sec ZTS`: las cuentas de 2016-2025 de A.json coinciden con el XBRL campo a campo (diferencias < 1 %). Se reutilizan A, B y C del 7-oct (sin cuentas nuevas); en C, el consejo nuevo va en `bolsa.contexto`.
- D actualizado con `notas/D-actualizar.mjs` desde `D-07oct.json`: precio y rango (bolsa.mjs), consenso (MarketScreener: ventas 2027e 9.396 M, BPA contable 6,02 / 6,55; Yahoo quoteSummary: BPA ajustado 2027 6,44, −12,9 % en 90 días; 5 compras y 11 mantener; objetivo medio 88,62), comparables llevados al cierre del 27-oct con su variación de precio, tasa libre 4,99 % (CSV del Tesoro del 27-oct), coste de la deuda 6,05 % (ICE BofA BBB del 26-oct), peso de la deuda 20,7 %.
- Movimiento (`movimiento.mjs ZTS`): 1 m +9,5 %, 12 m −46,4 %, +13,2 % sobre el mínimo de 52 semanas, P5 (17 % bajo la media de 200). Rebote de octubre sin noticia de la empresa; Burry dijo haber ampliado en ~72 (Stocktwits News, 11-sep). Noticias de 12 meses con `noticias.mjs --meses 12`: dos rebajas de guía, convertible, VitalRADS, Neogen genómica, demanda colectiva, cambios de recomendación (Jefferies a Mantener el 20-oct, Goldman Neutral 74 el 16-oct, UBS 85 el 27-oct). Veredicto de la regla 13: **no cambia**.
- E (sentimiento): RSS de Seeking Alpha, API de Stocktwits y Stocktwits News. Dividido, mejora con el rebote.

## Supuestos y cálculo (10:25-10:29)
- Cambio de supuestos frente al 7-oct: crecimiento de 2027e de 2,5 % a **2,0 %** (consenso de ventas de 2027 −0,9 % y de BPA ajustado −12,9 % en 90 días); WACC 8,53 % → **8,32 %** (tasa libre 5,31 → 4,99, coste de la deuda 6,2 → 6,05). El resto igual.
- DCF 100,56 USD (antes 96,44); valor intrínseco 95,87 (+22,5 %); DCF inverso −0,2 % anual de ventas 2027e-2035e (antes −0,9 %), margen implícito 34,6 %, rentabilidad implícita 9,6 %.
- Sostenibilidad: Sí (2,7 % anual proyectado; cuota 23,6 % → 23,6 %; reinversión neta baja, prueba con precio y cuota). Puente de 2027e rehecho (0,5 volumen / 1,0 precio / 0,5 otros).
- Objetivo a 12 meses: BPA contable 2028e 4,83 / 5,98 / 6,37 (ahora con el perfil del bajista de 2027e). **Base de BPA: publicado en historia y escenarios** (`base_bpa: "publicado"` en los dos). Historia adelantada con 2025 (÷ nuestro 2026e de 5,65): mediana 28,9x, mínimo 22,3x, media larga 30,5x; excluidos 2016 (BPA de 2017 con el cargo fiscal) y 2021 (burbuja). Comparables 15,3x.
- Controles: 20 correctos y 2 explicados (regresión R² 0,18; comparables frágiles 9,1x-13,7x). Ningún «Revisar».
- Revisión de comité: recomendación de la regla (Mantener) sin apartarse; convicción Media (los criterios del DCF sugieren Alta, pero decide el objetivo a 12 meses, a 10 puntos del umbral de compra; explicado en la síntesis). Riesgo de IA añadido (faltaba en el informe del 7-oct: «Baja / Oportunidad», VitalRADS con fuente primaria).

## Word y PDF (10:29-10:30)
- `Zoetis - 2026-10-28.docx` y `.pdf` (57 páginas): cobertura 92,2 %, 28 gráficos, 99 fuentes, 20 huecos de complemento. Páginas 1-4 revisadas como imagen: portada, síntesis y «La decisión» con las cifras del motor. Síntesis de 643 palabras.

## Rentabilidad a 12 meses y robustez (10:30-10:31)
- `flock … apuntar-12m.mjs zoetis-2026-10-28 --precios`: **v2 ponderada 5,0 %, base 6,7 % → Mantener** (selector v2 por desrateada; v3 sin selector 15,2 %). Antes (7-oct, v4, a 71,33): 5,6 % Mantener.
- `flock … robustez.mjs zoetis-2026-10-28 --actual`: **FRÁGIL** (v3 sin selector y v3 ×1,3 darían Comprar). **Si la tienes: Vender** (no pasa el filtro de mantener); `limite_mantener_cot` **74,67 USD**. Banda Vender de la regla (`vender_por_encima`): 91,24. ¿Compra robusta?: no; nivel ninguno (A 64,49; B1 67,42; regla 71,40). Colchón de BPA: ninguno. Avisos E2, P5, M6.
- Detalle en `revision-12m-2026-10-28.md`.
- 2026-10-28: revisión 12 m v2 (regla vigente, selector v2): objetivo 80,02 USD, ponderada +5,0 %, base +6,6 % (6,7 % en apuntar-12m), señal Mantener; senal_cartera Vender (filtro de mantener ≤ 74,67).

## Pendiente para el hilo principal
- `verticales/empresa/simbolos.json` sigue apuntando `ZTS` a `zoetis-2026-10-07` (no se ha tocado por ser compartido).
- No se han ejecutado `cobertura.mjs`, `seguimiento.mjs` ni `comprobar.mjs`, ni git.

## Fallos del sistema vistos
1. `integrar.mjs` marca `objetivo_12m.base_bpa` y `per_historico.base_bpa` como «claves fuera del esquema» aunque el método (27-oct) las exige: el aviso confunde. Arreglo: añadirlas al esquema del integrador.
2. El informe del 7-oct no tenía `riesgos.ia` (obligatorio) y nadie lo vio en las regeneraciones: `rellenar.mjs` solo avisa con «riesgos por debajo del 60 %». Arreglo: un control del motor que exija `riesgos.ia`.
3. La historia adelantada del 7-oct (v3 migrada) no incluía el último cierre (2025 ÷ BPA del año en curso), que el prompt sí pide, y dejaba dentro 2021 (burbuja) que la historia v2 sí excluía: con las dos cosas, la mediana adelantada pasa de 36,1x a 28,9x (no cambia la señal, porque decide la v2 por desrateada). Arreglo: que `historia-adelantada.mjs` añada el último cierre con el BPA propio del ejercicio en curso.
- Fin: 10:31.

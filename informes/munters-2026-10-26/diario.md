# Diario · Munters (MTRS.ST) · 26-oct-2026

- Encargo de Hotis (26-oct-2026): rehacer el análisis value completo tras los resultados del 3T26 (23-oct-2026), posteriores al informe del 19-oct. Iteración nueva (3.ª: 15-oct, 19-oct, 26-oct). Sin subagentes (cuatro análisis a la vez): fases A-E a mano, en orden. Sin git pull, commit ni push. Horas en Madrid (UTC+1 desde el 25-oct).
- **Commit de partida 862ee5a** («Semanal 25-oct: índices, salidas a bolsa, calendario y cobertura»). Empezado 09:06 Madrid.
- Ticker y clave iguales que el informe anterior: MTRS (Yahoo MTRS.ST).

## Pasos
1. 09:06 · Cuentas: `cuentas.mjs --esef "Munters"` → ESEF 2020-2024, idéntico al del 19-oct (diff sin cambios). 2025 sigue saliendo del informe anual 2025.
2. 09:10 · Calendario y comunicados (MFN, 26-oct 09:06 CET): **informe del 3T26 publicado el 23-oct-2026 a las 07:30** («Significant order growth as operational improvements progress»); dividendo 0,80 con fecha ex el 4-nov; día del inversor el 11-nov; anual el 28-ene-2027; junta el 29-abr-2027. Descargado el informe del 3T26 (23 págs., PDF de Cision) y el comunicado de MFN.
3. 09:15 · Conferencia del 3T26 (23-oct, 09:00 CEST): la web de Munters y la de Inderes dan 403/Cloudflare (presentación no descargable); leídos el resumen de preguntas y respuestas de GuruFocus (descargado) y la transcripción de Investing.com (WebFetch, citas literales): retraso de DCT de ≈1 trimestre, «gran parte de 2027 ya llena», los ≈11.000 M de ventas de DCT en 2027 «probablemente algo bajos», ahorro de 180 M (objetivo 250 M), capex 2026 como 2025, apalancamiento objetivo 1,5-2,5x, venta de FoodTech «según plan» para fin de año. Consenso previo del 3T (Investing): BPA 1,24 y ventas 4.360 M.
4. 09:18 · Precio: `bolsa.mjs --corte 2026-10-23` → **cierre del viernes 23-oct-2026, 131,45 SEK** (la sesión del lunes 26-oct no ha cerrado: 09:18 Madrid). `movimiento.mjs MTRS.ST --json` (toma intradía del 26-oct, 131,50): 1 m −0,5 %, 3 m −19,8 %, 6 m −31,8 %, 12 m +3,9 %, −23,9 % bajo la media de 200 (P5).
5. 09:25 · Consenso: MarketScreener (WebFetch, página con datos al 16-oct) sin actualizar tras el 3T: 8 analistas, objetivo medio 206,25, BPA 4,94 / 9,67 / 12,17 (2026-2028). Yahoo (26-oct) igual: 206,25, 8 analistas. Consenso del trimestre (Infront, 8 analistas, en Privata Affärer/Di del 23-oct): EBITA ajustado 473 M (real 546), ventas 4.203 M (real 4.473), pedidos 4.993 M (real 7.070) → **Superior**. No se encontró ningún cambio de objetivo publicado después del 23-oct (MarketScreener, Placera, Affärsvärlden bloqueado): hueco.
6. 09:30 · `noticias.mjs --meses 12 --valores MTRS --todas`: sin noticias de gravedad alta; tras el 3T, titulares de Di, EFN, Affärsvärlden e Investing («orderkross», «resultado mejor de lo esperado», «Köp vid nedgång»). Speria: ofertas indicativas a fin de octubre (EFN, 16-oct); la empresa: «según plan» para fin de año.
7. 09:33 · Directivos: Finansinspektionen (insynsregistret, 26-oct): última operación el 10-ago-2026, sin ventas en 12 meses. **Cortos: blankningsregistret de FI (26-oct) da un total de 5,4 % a 21-oct** (suma de posiciones ≥ 0,1 %; nominativas ≥ 0,5 %: Eleva 0,71 %, Millennium 0,59 %). El informe del 19-oct ponía 1,31 % (solo las nominativas): se corrige.
8. 09:35 · Tasa libre: Riksbank SEGVB10YC **3,112 % (23-oct)**; se usa 3,1 % (antes 3,2 %). BCE 23-oct: 11,131 SEK/EUR y 1,1193 USD/EUR (USD/SEK 9,945). Comparables: `comparables-yahoo.mjs` (26-oct; EE. UU. al cierre del 23-oct, suecas en sesión; USD/SEK 9,93).
9. 09:45 · Notas A-E reescritas (`notas/construir-notas.mjs`, partiendo del script del 19-oct y cambiando dato a dato): A con el 3T26 (LTM sep-26, segmentos LTM, 3T26 en trimestres —«Superior» frente a Infront—, KPI, liquidez y vida media a 30-sep, guía 2026 mantenida), B (hito del 3T; tamaño de mercado y competidores sin cambios: no hay cuentas nuevas de los rivales —Vertiv publica después—), C (FI sin operaciones nuevas; accionistas a 30-sep del informe del 3T), D (precio 23-oct, rango, volumen, cortos 5,4 %, bono, BCE, consenso marcado como anterior al 3T y hueco), E (titulares de prensa tras el 3T, Placera, TradeDesk, Seeking Alpha, Substack; confianza baja). Sin «Ã/Â».
   - **Corrección de horas:** el reloj del sistema (`TZ=Europe/Madrid date`) marcaba 09:05 al empezar y 09:20 al integrar. Las horas de los pasos 2-9 se apuntaron a ojo y van adelantadas: todos esos pasos caen entre las 09:06 y las 09:20. Desde el paso 10, la hora es la del reloj.
10. 09:15-09:20 · Propio, supuestos y textos (`propio.mjs`, `supuestos.mjs`, `textos.mjs`):
    - puente a 30-sep-2026 (deuda financiera 6.487, arrendamientos 2.029, caja 1.391);
    - tasa libre del 3,1 %;
    - BPA 2026e/2027e/2028e de 4,59 / 7,34 / 8,77 en el base (bajista 5,79 y alcista 10,16 en 2028e);
    - textos reescritos con las cifras nuevas y la síntesis de «qué cambió frente al 19-oct».
11. 09:20 · `integrar.mjs`: 44 fuentes y 8 huecos; todas las citas tienen fuente. `calcular-empresa.mjs`:
    - 19 de 22 controles correctos y 3 explicados (tipo de 2023, rendimiento del capital nuevo, crecimiento del BPA);
    - DCF 140,74 (WACC 8,73 %); valor intrínseco 145,57 (+10,7 %);
    - escenarios 79,12 / 140,74 / 175,98;
    - regla Comprar y análisis Mantener, convicción Baja.
12. 09:21 · Word `Munters - 2026-10-26.docx`: 26 gráficos, cobertura del 89,7 % y 4 avisos, los mismos que en el informe anterior. PDF con LibreOffice (perfil /tmp/lo-munters): 48 páginas.
13. 09:21 · `revision-12m-2026-10-26.md` escrito.
14. 09:21 · `apuntar-12m.mjs munters-2026-10-26`: MTRS pasa de Comprar 34,8 % (132,05) a Comprar 34,4 % (131,45, 2026-10-23). El grep confirma que `munters-2026-10-26` está en `objetivo12m-revisados.json`.
15. 09:21 · `robustez.mjs munters-2026-10-26 --actual` (y `--json`):
    - veredicto SÓLIDA; acción robusta Mantener en cartera;
    - nivel: ninguno (`limites_nivel_cot` vacío, porque falla la calidad); `limite_b_cot` 144,71;
    - límite robusto 138,42; colchón de BPA del 15 % / 19 %;
    - calidad: ROIC − WACC +0,5 y sostenibilidad «En parte»;
    - marcas D6, D7, P5 y M6; ningún CORREGIR.

## Decisiones
- **Ventas.** 2026e se calcula con enero-septiembre más un 4T de ≈4.840 M (la conferencia da ≈2.500 M de DCT). En 2027e-2028e, más ventas por la cartera (27.851 M frente a 24.542): +27 % en 2027.
- **Margen.** El margen EBITDA de 2027-2028 baja al 15,5 % y al 16,0 % (retraso de DCT de ≈1 trimestre). El final del DCF (16,5 %) se mantiene.
- **Sostenibilidad «En parte».** Se mantiene y se explica: el rendimiento del capital nuevo (31 %) sale de recuperar el margen de 2023-2024, no de capital nuevo. El base no se baja más, porque pasar la prueba exigiría usar el margen del bajista.
- **Recomendación: Mantener (la regla dice Comprar), convicción baja.** Los motivos son los mismos que el 19-oct:
  - calidad (ROIC − WACC +0,5 < 5);
  - sostenibilidad «En parte»;
  - marca D6.
- **Venta de FoodTech.** No entra en el base (no hay oferta firme); es un catalizador.
- **Posiciones cortas.** Se corrige el dato: 5,4 % en total (FI), no 1,31 %.
- **Regla 13: no cambia.** La noticia que más pesa es el propio 3T26: pedidos +70 % y resultado por encima del consenso, con DCT retrasado.

## Línea 12 m
MTRS (escrita con `apuntar-12m.mjs` y comprobada en `objetivo12m-revisados.json`): v3 34,4 % ponderada / 32,6 % base → Comprar (v2 22,7 %).
- Objetivo 175,04 SEK (base 172,77).
- Valor intrínseco 145,57.
- Precio 131,45 (23-oct).
- Robustez: SÓLIDA, acción robusta **Mantener en cartera**, límite robusto 138,42.

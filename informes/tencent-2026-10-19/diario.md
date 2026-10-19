# Diario · Tencent (0700.HK) · 19-oct-2026

- Commit de partida: 250a336 (19-oct-2026 17:42 UTC). Sin `git pull` ni otras operaciones git (encargo: cinco sesiones en el mismo clon).
- Inicio: 17:53 UTC. Punto de partida: `informes/tencent-2026-10-14/` (confianza Baja-Media: sin acceso a documentos primarios). Esta iteración vuelve a comprobar cada dato.
- Sin herramienta Agent: fases A-E hechas en orden por el orquestador, con notas A..E.json.

## Pasos (hora UTC según el reloj del contenedor · fecha de los datos)

- 17:54 `bolsa.mjs --accion 0700.HK --indice 2800.HK --sector 3033.HK --corte 2026-10-19`: último cierre **16-oct-2026 (viernes), 417,80 HKD, HKEX**; el 19-oct Hong Kong cerró por la fiesta de Chung Yeung, así que el precio es de la última sesión, una antes del corte. Beta 1,30 (ajustada 1,20), 52 s 411-664 HKD.
- 17:55-18:05 documentos primarios con `descargar.mjs` (`notas/docs/`, `_manifest.json`): informes anuales 2022-2025, intermedio 2026 (datos a 30-jun-2026), resultados y presentación del 2T26 (12-ago-2026), bonos de junio y octubre (pricing 14-oct), aviso de consejo (3T26 el 18-nov-2026), retornos de HKEX (15-oct y septiembre), votos de las juntas 2024 y 2025; bono chino a 10 años 1,66 % (19-oct); tipo del BCE 0,85194 RMB/HKD (16-oct).
- 18:00-18:05 consenso y comparables: Yahoo (`notas/yahoo-consenso.mjs`, 19-oct: BPA 2026e 28,89 y 2027e 30,50; objetivo 655,19 HKD, 41 analistas) y MarketScreener (43 analistas, 560,64 RMB). Comparables a 16/17-oct.
- 18:05-18:11 notas A-E (`notas/construir.py`, cuentas a dic-25 y jun-26), supuestos y `propio.mjs` (historia del PER 2018-2025 calculada a mano: cierres de Yahoo × BCE ÷ BPA no NIIF).
- 18:12 primer `integrar` + `calcular-empresa`; 18:12-18:19 `textos.mjs` y `resumen.mjs`; revisión de comité (cambios: justificación del alcista, bonos ≈5.500 M USD en octubre, crecimiento de los comparables pasado a próximos 12 meses con el consenso de Yahoo, adquisiciones 2022-2025 de las notas 42/44 de las cuentas, geografías de la nota 6).
- 18:20 Word (`rellenar.mjs`: cobertura 84,8 %, 3 avisos de datos que no existen) y PDF (LibreOffice, 43 páginas).
- 18:21 `revision-12m-2026-10-19.md`; `apuntar-12m.mjs tencent-2026-10-19` (0700.HK: Mantener 26,0 % → Comprar 22,9 %, precio 355,94 RMB del 16-oct).
- 18:21 `movimiento.mjs 0700.HK` (cierre 16-oct): 1 m −3,6 %, 12 m −38,1 %, +1,6 % sobre el mínimo de 52 s (P4). `bolsa.contexto` relleno: veredicto global «no cambia».
- 18:21 `robustez.mjs --actual` (último cierre disponible: 16-oct, HKEX; sin cierre más nuevo): FRÁGIL, acción robusta **Mantener**; sin CORREGIR.

## Decisiones

- Precio: el cierre del 16-oct (una sesión antes del corte por el festivo); no hay sesión del 19.
- EBITDA = el de Tencent (operativo sin otras ganancias + todas las amortizaciones, también contenidos y licencias); capex = inmovilizado + intangibles + suelo; caja = «caja total». Esto sube el margen EBITDA de 2025 al 41,3 % (antes 37,2 %) y el capex al 15 %.
- BPA de la regla a 12 meses en base no NIIF diluida, cuadrado con 2025 (259.626 M). Puente: participadas 875.100 M con un 20 % de descuento = 700.080 M; deuda y caja a 30-jun-2026.
- WACC: bono chino 1,66 %, beta ajustada 1,20 (de `bolsa.mjs`, antes 1,0 a ojo), prima 5,5 %, adicional 1,5 (antes 2,9); WACC 8,95 % (antes 9,31 %). Terminal 1,1 %.
- Historia del PER: ahora 2018-2025 (antes 2022-2025) con los cierres de Yahoo ajustados por los repartos en especie; 2020 fuera de la media larga. BPA no NIIF 2018-2021 estimados.
- Sostenibilidad «Sí» (antes «En parte»): crecimiento proyectado 6,7 % < histórico 7,6 %; capital nuevo de IA a ≈20 % de rendimiento, como el ROIC actual.
- Recomendación: la regla v3 da Comprar, pero la acción robusta es Mantener (v2 11,5 %, BPA −10 % 10,7 %); convicción Media.

## Resultado

- 19 de 20 controles correctos, 1 explicado (compra robusta: v2 da Mantener).
- DCF 460,38 RMB; valor intrínseco 454,33 RMB (533,29 HKD, +27,6 %); DCF inverso: crecimiento implícito 1,0 % (base 6,3 %). ROIC 18,9 % − WACC 8,95 % = 9,95 puntos.
- **Línea 12 m**: objetivo ponderado 432,84 RMB (508,06 HKD) → +22,9 %; base 416,84 RMB → +18,4 %; regla Comprar; v2 11,5 % / 7,7 % Mantener; BPA −10 % 10,7 % / 6,7 %. Acción robusta Mantener; límite robusto 398,20 HKD; límite v3 441,71 HKD. Detalle en `revision-12m-2026-10-19.md`.
- Frente al 14-oct (v2 del motor): precio 425,20 → 417,80 HKD; v3 23,8 % → 22,9 %; v2 12,1 % → 11,5 %; valor intrínseco 470,61 → 454,33 RMB; sostenibilidad «En parte» → «Sí»; misma acción (Mantener).
- Huecos: transacciones precedentes, EV/EBITDA de los próximos 12 meses de los comparables, calificaciones ESG, operaciones de consejeros.
- No ejecutados por encargo: `seguimiento.mjs`, `cobertura.mjs`, cambios en cola.md, MEMORIA.md, lecciones y simbolos.json, git.

## Lecciones

- Tencent publica sus informes en PDF descargables con `descargar.mjs` desde su web de inversores (Hong Kong sin XBRL): las cuentas primarias cambian bastante frente a búsquedas (margen EBITDA 41,3 % frente a 37,2 % por la definición de amortización).
- Cierres de Yahoo de Tencent ajustados por repartos en especie (JD.com 2021, Meituan 2023): sirven para el PER histórico, pero no coinciden con el cierre real del día.

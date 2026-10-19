# Diario · JYP Entertainment (035900.KQ) · corte 19-oct-2026

- **Commit de partida**: `30ed604 Cola de índices: NextVision (pareja 12)` (checkout compartido con otro análisis: sin pull, commit, push ni stash).
- **Inicio**: ≈ 18:14 UTC (reloj del sistema; `notas/_commit.txt`). **Fin**: ≈ 19:00 UTC. Análisis nuevo: no había informe anterior de JYP.
- **Procedimiento**: `.claude/commands/analiza-empresa.md` y `verticales/empresa/prompt.md`; notas A-E escritas por mí en orden con `notas/construir-notas.mjs` (patrón de APR), `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs`; `integrar.mjs` → `calcular-empresa.mjs` (21 de 21 controles correctos) → `rellenar.mjs` → PDF con LibreOffice.

## Tiempos (aprox., UTC)

| Hora | Paso |
|---|---|
| 18:14 | Lectura de CLAUDE.md, METODO-VIGENTE.md, MEMORIA.md, procedimiento, prompt y lecciones; carpeta |
| 18:15-18:30 | DART (informes anuales 2021-2025, semestral 2026, trimestrales, avisos), bolsa.mjs, movimiento.mjs, WiseReport, comparables de Yahoo |
| 18:30-18:45 | Noticias de 12 meses (Naver News), foro de Naver, IFPI |
| 18:45-18:53 | Notas A-E, supuestos y primer cálculo |
| 18:53-19:00 | Textos, resumen, Word y PDF, apuntar-12m, símbolo, precios, robustez, revisión y diario |

## Decisiones

1. **Cuentas**: DART por su visor de secciones (`notas/dart.mjs`, copia del de APR); la búsqueda por nombre no devolvía nada y se hizo por código bursátil. Corea no está en `cuentas.mjs`.
2. **Precio**: 40.200 KRW, cierre oficial de la KRX del 19-oct (Naver Finance, `siseJson` y `polling`). Yahoo da 40.400 a las 15:30:26 KST, que es el máximo del día; `precios.mjs` guardó ese 40.400 y con él corrió `robustez --actual` (−3,6 % / −8,7 % frente a −3,2 % / −8,2 % al cierre real). `bolsa.mjs` y `movimiento.mjs` se quedaron en el cierre del 16-oct (39.050 en Yahoo; 39.000 en Naver).
3. **BPA normalizados** para la historia del PER: 2021 sin 37.541 M de plusvalías y ganancias de valor razonable (≈ 1.203 KRW) y 2025 sin la plusvalía de Dear U de 73.160 M neta de un 22 % de impuesto (≈ 3.124 KRW).
4. **Proyección**: 2026e fijo (−6 %, el 1S publicado y el 2S de las casas que revisaron en octubre); 2027e +3 % (gira de estadios de Stray Kids frente a menos TWICE); 2028e −8 % con margen EBITDA del 17 % (servicio militar de Stray Kids; Bang Chan y Felix son australianos). Resultado no operativo recurrente de +5.000 M (la media sin extraordinarios de 2022-2025 fue ≈ +1.000 M; la caja da más intereses). Circulante del 12 % (el de 2025) tras el aviso del primer cálculo con un 5 %.
5. **WACC** 11,45 % (bono coreano 4,45 % de FRED, beta 1,0 frente a la medida de 0,51-0,67, prima 5,5 % + 1,5 puntos por concentración en dos grupos, servicio militar y China); g = 2,5 %.
6. **Puente** a 30-jun-2026: caja 376.636; arrendamientos 8.649; participadas 34.272; minoritarios 4.599; otros ajustes −36.486 (= +96.000 de la compra de Seongnae − 75.537 del terreno de Godeok que se venderá − 56.949 de activos financieros a largo).
7. **Perímetro**: solo 2021 como cambio declarado; la venta de Dear U (2025) y el terreno (2024) no cambian el perímetro de consolidación y van en «ajustes» (con ellos el motor daba Altman y Beneish como no fiables).
8. **Comparables**: HYBE, SM, YG, Dear U, Universal, Warner, Sony (mediana PER 15,2x); fuera Live Nation, Spotify, Tencent Music (BPA en CNY) y Avex (sin estimaciones).
9. **Gobierno**: `accionista_control` y `presidente_vinculado_control` en true (Park Jin-young 15,95 % con relacionados; el primer ejecutivo y presidente, Jung Wook, es persona vinculada); `insiders_sin_operaciones` true tras comprobar en DART que no hay avisos de operaciones desde el 18-ene-2024.
10. **Riesgo de IA**: medio, negativo (≈ −5 % a 3-5 años): grupos virtuales (PLAVE, AMA) sin servicio militar ni contratos, y música hecha con IA en las plataformas.
11. **Regla 13**: no cambia.
12. **simbolos.json**: añadida solo la entrada `035900` al final de `empresas`, releyendo el archivo justo antes y sin reordenar. Tras el aviso del coordinador (rebase que dejó `precios.json` como el remoto), `precios.mjs` y `apuntar-12m.mjs` se ejecutaron después del aviso y se comprobó que las entradas siguen.

## Resultado

Regla v3 (selector sin marcas): ponderada −3,2 %, base −8,2 % → **Mantener** (v2: −12,5 %, Vender). Valor intrínseco 45.052 KRW (+12,1 %). Calidad: ROIC 39,0 % − WACC 11,45 % = 27,5 puntos; sostenibilidad Sí. Robustez `--actual`: **FRÁGIL, acción robusta No mantener**; límite robusto 29.731,84 KRW.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales 2020-2025 | DART: informes anuales 2025 (20260318001519), 2023, 2022 y 2021 | 31-dic-2025 (publicado 18-mar-2026) |
| Cuentas semestrales y trimestrales | DART: semestral 2026 (20260814003204), 1T26, 3T25, 1T25, 3T24, 1S24 | 30-jun-2026 (publicado 14-ago-2026) |
| Avisos (junta, plan de valor, Godeok, Seongnae) | DART | 20-feb a 8-oct-2026 |
| Accionistas y flotante | DART (semestral) y FnGuide/WiseReport | 30-jun-2026 y 16-oct-2026 |
| Consenso y objetivos | FnGuide/WiseReport (c1050001, c1080001) | 16-oct a 19-oct-2026 |
| Bolsa, betas, rentabilidades | `herramientas/bolsa.mjs` (Yahoo) | cierre del 16-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs 035900.KQ` | cierre del 16-oct-2026 |
| Precio del informe | Naver Finance (KRX) | cierre del 19-oct-2026 (40.200) |
| Precio de `precios.json` | `herramientas/precios.mjs 035900` (Yahoo) | 19-oct-2026 (40.400, máximo del día) |
| Comparables y tipos de cambio | `notas/comparables-yahoo.mjs` (Yahoo) | 19-oct-2026 |
| Bono coreano a 10 años | FRED (IRLTLT01KRM156N) | septiembre de 2026 |
| Prima de mercado | Damodaran, ERPbymonth | octubre de 2026 |
| Mercado de música grabada | IFPI Global Music Report 2026 | 2025 (publicado 18-mar-2026) |
| Noticias de 12 meses | Naver News (`notas/noticia.mjs`) | nov-2025 a 19-oct-2026 |
| Sentimiento | Foro de Naver (400 mensajes) | 30-sep a 20-oct-2026 (KST) |
| Objetivo a 12 meses | `herramientas/apuntar-12m.mjs jyp-2026-10-19` | precio 40.200 (19-oct-2026) |
| Robustez | `herramientas/robustez.mjs informes/jyp-2026-10-19 --actual` | precio 40.400 de `precios.json` (19-oct-2026) |

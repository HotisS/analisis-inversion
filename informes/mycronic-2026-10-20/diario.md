# Diario: Mycronic (MYCR), análisis value del 20-oct-2026

- Commit de partida: `9d75f1e93eded9e83d62514840d02296e4fc7fd1` (09:33 UTC). Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: 09:34 UTC.
- Análisis nuevo, método completo (no hay informe anterior de Mycronic en `informes/`). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, siguiendo la forma de `informes/cardinal-health-2026-10-19/`.
- Sector sin ficha corta en `sectores/` (equipos para fabricar electrónica y máscaras). El encargo limita la escritura a la carpeta del informe, así que el trabajo sectorial va en las secciones 3 y 4 y la ficha queda pendiente para el hilo principal.

## Decisiones (20-oct-2026, 09:34-10:06 UTC)

- **Cuentas**: XBRL ESEF de 2020-2024 (`notas/cuentas-xbrl.json`, LEI 549300S5CCFESE4C6Y07) completado con los informes anuales de 2021, 2023 y 2025 (gastos de venta, fondo de comercio, arrendamientos) y los trimestrales 3T24-2T26. 2025 del informe anual auditado. BPA de 2016-2024 reexpresado por el desdoblamiento 2:1 de junio de 2025 (informe anual 2025, págs. 151-152).
- **Precio**: cierre del 19-oct (300,20 SEK) en el informe; sesión del 20-oct 293,20 SEK a las 11:37 de Estocolmo (precios.mjs y movimiento.mjs). Resultados del 3T26 el 22-oct, después del corte.
- **DCF**: 2026e fijo (+17,2 %, margen EBITDA 30,5 %, previsión 9.250 M); 2027e +5 % por la cartera corta de máscaras (3 Prexision + 1 SLX); 10 % en 2028e-2029e bajando al 4 %; margen 28-29 % (objetivo de EBIT ≈ 25 %). Capex con pagos de arrendamiento (NIIF 16). WACC 9,16 % (bono sueco 3,22 %, beta 1,0, prima 5,5 % + 0,5 por China y concentración). Terminal 2,5 %.
- **Escenarios**: bajista con perfil (2027e −12/−6 puntos, 2028e −4/−4, después −3/−3) para recoger un año sin máscaras como 2022 sin hacerlo permanente entero.
- **Puente**: caja 2.687, pasivos con interés 421 (casi todo arrendamientos), pagos contingentes de compras por su máximo (592 M, prudente). Anticipos de clientes al circulante (se compensan con entregas).
- **Regla a 12 m**: BPA propio calibrado con 2025 (7,99); historia adelantada 2018-2025; PER actual con BPA NTM (2,4/12 de 2026e + 9,6/12 de 2027e). Selector sin marcas: v3. BPA 2028e un 15 % bajo el consenso: se mantiene (cartera de 2027, SB1 −21,5 % en EBIT de 2027, margen del consenso sobre el objetivo de la empresa).
- **Sentimiento**: hueco tras tres intentos (Stocktwits, Simply Wall St, foros nórdicos).
- **Ficha de sector**: no existe; queda pendiente para el hilo principal (este hilo solo escribe en su carpeta).
- **simbolos.json**: añadida la entrada MYCR (MYCR.ST) al final de `empresas`, edición atómica.

## Resultado

- Recomendación: **Mantener**, convicción media. Objetivo 12 m 270,06 SEK: ponderada −9,0 % con dividendo, base +2,4 % (al cierre del 19-oct). Con el precio de la sesión (293,20): −6,8 % / +4,9 %.
- Valor intrínseco 214,01 SEK (DCF 194,17; con la prima del mercado 240,44). ROIC 34,5 % frente a WACC 9,16 %; sostenibilidad «Sí».
- Robustez (`--actual`): SÓLIDA; acción robusta «No mantener»; límite de compra 214,01 SEK (v3 y v2, también con BPA −10 %).
- Regla 13 (movimiento.mjs): −12,6 % en un mes, −18,3 % desde el máximo del 6-oct; veredicto «no cambia» (rebaja de SEB y aviso de SB1 sobre 2027, ya recogidos en el caso base).
- Controles del motor: 19 de 19 correctos. Avisos del Word: tablas vacías de suma de partes y calificaciones ESG, gráficos de mapa de comparables y transacciones sin datos suficientes.

## Pasos y fecha de los datos

| Paso | Hora (UTC) | Fecha de los datos |
|---|---|---|
| Commit de partida | 09:33 | 9d75f1e |
| Cuentas XBRL ESEF (cuentas.mjs) | 09:36 | Ejercicios 2020-2024 |
| Bolsa (bolsa.mjs) | 09:37 | Cierre del 19-oct-2026 |
| Movimiento (movimiento.mjs, regla 13) | 09:37 | Sesión del 20-oct-2026, 293,20 SEK |
| Datos de Yahoo (consenso, comparables, divisas) | 09:42 | 20-oct-2026 |
| Informes anuales y trimestrales | 09:40-09:55 | Informe anual 2025; 2T26 (14-jul-2026) |
| Noticias y analistas (12 meses) | 09:45-09:55 | Hasta el 15-oct-2026 (SEB) |
| Notas A-E (construir-notas.mjs) | 09:57 | Corte 20-oct-2026 |
| propio + integrar + calcular | 09:58-10:04 | Corte 20-oct-2026 |
| Word y PDF | 10:04 | — |
| apuntar-12m.mjs | 10:04 | Cierre del 19-oct-2026 |
| precios.mjs MYCR | 10:03 | Cierre del 19-oct; sesión 293,20 |
| robustez.mjs --actual | 10:06 | Sesión del 20-oct-2026 |

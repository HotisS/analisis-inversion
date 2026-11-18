# Diario · DLocal Limited (DLO, Nasdaq) · 18-nov-2026

- Commit de partida: 254cbac («Nvidia 18-nov: análisis value tras los resultados del 3T FY27»). Tanda de 10 informes en paralelo sobre un checkout compartido: sin `git pull`, `commit`, `push`, `stash` ni `checkout`; no se ejecutaron `precios.mjs`, `seguimiento.mjs`, `cobertura.mjs` ni `comprobar.mjs --escribir`; no se tocaron `cola.md`, `MEMORIA.md`, `lecciones*.md` ni `simbolos.json`. Fuera de la carpeta solo escribieron `apuntar-12m.mjs … --precios` y `robustez.mjs … --actual` (con `flock /tmp/tanda-1118.lock`).
- Motivo: resultados del 3T26 publicados el 12-nov y caída de ≈ −15 % desde el informe del 19-oct (14,67 → 12,46 USD); el escáner la sacó de compras posibles «sin límite hasta revisarlo».
- Entorno: nube con proxy (`NODE_USE_ENV_PROXY=1`), sin subagentes: las fases A-E las hice yo actualizando dato a dato el generador de notas del informe anterior (`notas/construir-notas.mjs`, que escribe A.json … E.json); supuestos en `notas/propio.mjs` y textos en `notas/textos.mjs`, reescritos tras el primer cálculo.

## Tiempos (hora de Madrid, `TZ=Europe/Madrid date +%H:%M`)

| Paso | Hora |
|---|---|
| Inicio, lectura del encargo, procedimiento, prompt, lecciones y método | 12:21 |
| `cuentas.mjs --sec DLO` (sin cambios: último 20-F es 2025) | 12:22 |
| 6-K del 3T26 (nota, estados intermedios, carta a accionistas como imágenes), 6-K de la junta, Form 144, 13G/A | 12:22-12:26 |
| Bolsa, movimiento, noticias, consenso y comparables (Yahoo), bono, BCE, Damodaran | 12:26-12:31 |
| Notas A-E, supuestos, primer cálculo, robustez previa | 12:31 |
| Textos, segundo cálculo, Word y PDF | 12:32-12:34 |
| Revisión 12 m, `apuntar-12m --precios`, `robustez --actual`, `comprobar` | 12:35 |

(El reloj del contenedor avanzó poco entre pasos; las horas son las que dio `date`.)

## Pasos hechos y fecha de los datos

| Paso | Herramienta / fuente | Fecha de los datos |
|---|---|---|
| Cuentas anuales 2019-2025 | `cuentas.mjs --sec DLO` (XBRL de los 20-F) | Ejercicio 2025 (20-F del 18-mar-2026); sin cambios |
| Resultados leídos | 6-K del 3T26 (anexo 99.1 nota de prensa; 99.2 estados intermedios a 30-sep-2026; 99.3 carta a los accionistas en imágenes: páginas 3, 4, 6, 11, 12 y 14) | 3T26 (30-sep-2026; 6-K del 12-nov-2026) |
| Conferencia del 3T26 | Transcripción no accesible (Nasdaq 403 y límite de peticiones; Earnings Whispers con JavaScript); resúmenes de Nasdaq/MarketBeat, FXC Intelligence y 24/7 Wall St. | 12-13-nov-2026 |
| Precio y bolsa | `bolsa.mjs DLO` (SPY, IPAY), `movimiento.mjs DLO`, `movimiento-precio.mjs DLO`, gráfico diario de Yahoo | Cierre del 17-nov-2026: 12,46 USD |
| Consenso | Yahoo quoteSummary (2026-2027, objetivos, recomendaciones; 17-nov) y MarketScreener (2028 y EBITDA; página con datos del 23-oct) | 17-nov y 23-oct-2026 |
| Comparables | Yahoo quoteSummary de 10 empresas (`notas/docs/yahoo-comparables-2026-11-18.json`), tipos del BCE | 17-18-nov-2026 |
| Tasa libre | CSV diario del Tesoro de EE. UU. | 17-nov-2026 (10 años 5,10 %) |
| Prima implícita | Damodaran, noviembre de 2026 (4,41 %, la que usan los informes de la tanda) | Noviembre de 2026 |
| Accionistas e insiders | Form 144 de General Atlantic (17-nov), 13G/A de Azar (12-nov), 6-K de la junta (4-nov), `form4.mjs` (sin Form 4 nuevos desde el 5-ago) | Hasta el 18-nov-2026 |
| Noticias | `noticias.mjs --meses 12 --valores dlocal` (0 noticias), RSS de Seeking Alpha, Stocktwits, Al Jazeera y Demócrata (Brasil 26-oct) | Hasta el 18-nov-2026 |

## Decisiones

- **Por qué cayó (−15,1 % desde el 19-oct)**: no por el trimestre (el 13-nov cerró −0,1 %). Dos tramos: (1) 23-30-oct, −13,9 %, reelección inesperada de Lula el 25-oct (51,79 %), real −11 % y Bovespa −17 % en la apertura del 26-oct; dLocal −4,1 % el 26-oct y −5,1 % el 30-oct; (2) 9-17-nov, −13,4 %, con el Form 144 de General Atlantic del 17-nov (12,8 M de acciones, ≈ 165 M USD, J.P. Morgan): −6,6 % con 10,9 M de acciones, casi cinco veces lo normal.
- **Lo que dijo el 3T26**: volumen +77 % (+68 % en moneda constante), ingresos 398,0 M (+41 %, planos frente al 2T; ≈ 1 % bajo el consenso), margen bruto récord 132,0 M (+28 %), comisión neta 0,72 % (plana frente al 2T, −27 pb interanual, con ayudas de Argentina y Nigeria), gastos operativos −11 % trimestral, beneficio operativo 76,2 M (+37 %), BPA 0,23 USD (consenso 0,21), FCF ajustado 99,1 M. Guía 2026 mantenida pero con el beneficio operativo en el **extremo bajo** (≈ +27,5 %) por divisas en Brasil, México y Argentina (≈ 6 puntos menos de crecimiento del margen bruto en el 4T). 2027 «año de inversión», sin guía. Brasil 21 % y México 18 % de los ingresos de 9M26; México con margen bruto −17 % trimestral.
- Supuestos: 2026e +42 % (fijo; 4T ≈ 420 M) y margen del 20 %; 2027e +24 % (antes +25: −3 puntos por el real compensados en parte) con margen del 20 % (antes 20,5 %); 2028e +18 % y 20,5 % (antes 21 %); 21 % desde 2029. Puente de ingresos 2026e volumen +70 / precio −28; 2027e +40 / −13 / otros −3 (divisa). Mercado final 94.900 M (TAM 4,2 billones × 2,26 % de 9M26).
- Puente 30-sep-2026: deuda 163,5 M (préstamo de 150 M + pesos), arrendamientos 3,8 M, caja 617,0 M (corporate cash 536,9 + activos financieros 80,1), minoritarios 0,5 M. Acciones 293,8 M (286,5 M a 23-oct + 7,4 M potenciales). WACC 14,33 % (bono 5,10 %, beta 1,30, prima 5,5 %, adicional 2,5 % sin subir tras Lula porque el soberano en dólares solo subió 20 pb, deuda 4,3 % al 6,3 %).
- BPA 2028e 0,87 / 1,15 / 1,38 (antes 0,92 / 1,21 / 1,45). **Historia y escenarios en BPA publicado** (`base_bpa: "publicado"` en los dos sitios). Historia adelantada 31,8x / 45,4x / 17,3x / 17,5x (2021 excluido); actual 13,0x.
- **El selector cambia de versión por el precio**: mediana/actual = 1,89 (≥ 1,8) → desrateada → decide la v2 (en octubre, 1,71 → v3). A menos de un 5 % del umbral: se da la v3 al lado (40,9 %).
- Recomendación: **Comprar según la regla, convicción Baja** (regla absoluta Mantener, relativa Comprar; B1); acción robusta Mantener / Esperar.

## Resultado

- DCF 13,87 USD (+11,3 %); escenarios 8,57 / 13,87 / 19,83 (ponderado 14,04); **valor intrínseco 13,56 USD (+8,8 %)**; con la prima del mercado 14,98 (+20,2 %). DCF inverso: crecimiento implícito del 8,8 % (base 10,9 %), rentabilidad implícita del 15,7 %.
- **12 m**: decide la v2 (selector, desrateada): objetivo 15,70 USD; ponderada **+27,5 %**, base **+21,5 %**; v3 sin selector 40,9 % / 33,5 %. Señal de la regla: Comprar.
- Sostenibilidad «Sí»; ROIC − WACC 69,1 puntos (83,4 % frente a 14,33 %).
- Robustez (`--actual`): **SÓLIDA**; «Si la tienes»: Mantener; compra robusta: no (Esperar por C1; además B1: con BPA −10 % ponderada 14,9 % y base 9,4 %). Colchón de BPA: 8 % para comprar, 14 % para mantener. Límite robusto (A) 12,18 USD; límite B 12,99 USD; nivel hoy: ninguno por el C1 (sin él sería B, al estar 12,46 ≤ 12,99). Filtro de mantener: 14,42 USD. Banda Vender de la regla: 17,65 USD.
- **Regla 13: retrasa** hasta el 13D/A de General Atlantic que confirme la venta de las 12,8 M de acciones (≈ 19-20-nov) o hasta cotizar por debajo de 12,18 USD. Brasil/Lula: no cambia (recogido en la proyección).
- Word: 21 de 21 controles correctos; cobertura 88,9 % (gobierno y rentabilidad por debajo del 60 %: emisor extranjero sin voto de remuneración; ROIC sin desglose operativo). PDF con soffice (perfil propio). `comprobar.mjs`: 1 ERROR y 5 avisos, ninguno de esta carpeta (el ERROR es de Experian).

## Frente al informe anterior (19-oct) y su señal de alarma

- Cambia la señal: Mantener (valor intrínseco 13,46 < precio 14,67) → Comprar por regla (valor intrínseco 13,56 > precio 12,46), con acción robusta Mantener/Esperar.
- Señales de alarma del informe anterior: **no se cumplió ninguna**. Comisión ≥ 0,65 % (0,72 %), margen bruto ≥ +20 % (+28 %), volumen ≥ +35 % (+77 %), top 10 ≤ 65 % (62 %), caja propia ≥ 250 M (536,9 M), ningún gran comerciante perdido. El disparador de compra «por debajo de 13,46 USD» se cumplió por precio, pero ahora la compra no es robusta (B1) y la regla 13 la retrasa.
- Bajan: BPA 2028e (−5 %), objetivo ponderado (20,30 → 15,70) por el selector (v3 → v2) y el BPA; sube la asimetría (de 0,78 a 1,89) por el precio.

## Huecos

- Transcripción completa del 3T26 (Nasdaq 403/límite de peticiones; Earnings Whispers con JavaScript; Seeking Alpha de pago): se usaron la carta, la nota y dos resúmenes de prensa.
- Causa propia de la caída del 30-oct (−5,1 %): sin 6-K ni Form 4; coincide con la presión sobre Brasil.
- Consenso de 2028 posterior al 3T26 (MarketScreener servía la página del 23-oct).

## Lecciones

- Un aviso de venta de un accionista de referencia (Form 144) el mismo día de una caída fuerte con volumen anómalo es un hecho pendiente de la regla 13 hasta que el 13D/A confirme la venta: el escáner y `noticias.mjs` no lo recogen (0 noticias); mirar siempre la lista de presentaciones de EDGAR (`submissions/CIK….json`) de los últimos días.
- La carta a los accionistas de dLocal (anexo 99.3) y la presentación (99.4) del 6-K son solo imágenes JPG: el `.txt` de `descargar.mjs` sale vacío; el orden de las páginas está en los `src` del HTML y se leen como imagen.

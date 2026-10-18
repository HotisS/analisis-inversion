# Diario · Shenzhen Transsion Holdings, línea H (2636.HK) · 18-oct-2026

- Commit de partida: 583cbbe («Precios del 18-oct»). Sin `git pull`, `commit` ni `push` por encargo (checkout compartido con otros análisis). No se ejecutaron `precios.mjs`, `apuntar-12m.mjs`, `seguimiento.mjs`, `cobertura.mjs`, `calendario.mjs` ni `regenerar.mjs`; no se tocaron `cola.md`, `simbolos.json`, `lecciones*.md`, `MEMORIA.md`, `METODO-VIGENTE.md` ni `objetivo12m-revisados.json`. Tiempos: según las marcas de los archivos, de ≈ 16:10 a ≈ 16:50 (UTC) la última parte (notas, cálculo, Word); la investigación empezó antes, en la sesión anterior a la compactación del contexto.
- Encargo del coordinador: análisis value completo, compra de la línea H (2636.HK, cotiza desde el 15-oct-2026), precio y límite en HKD; comprobar acciones A+H y descuento H/A; explicar la caída de márgenes de 2025-26.
- Entorno: nube con proxy (`NODE_USE_ENV_PROXY=1`). `bolsa.mjs` para 2636.HK (solo 2 sesiones) y para 688036.SS frente a 510300.SS (CSI 300) y 588000.SS (STAR 50); `movimiento.mjs 688036.SS`; `descargar.mjs` para el folleto de HKEX (514 páginas) y los informes CAS de CNINFO (en `notas/docs/`); comparables con la ficha de Yahoo (`herramientas/yahoo.mjs`, script en el scratchpad); consenso de MarketScreener por WebFetch; bono chino de ChinaBond. `cuentas.mjs` no sirve para China.
- Notas A-E por mí, sin subagentes (`notas/construir-notas.mjs`); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de Midea).
- **Confianza de los datos de núcleo: media-alta.** 2023-2025 y 1S25/1S26 NIIF del informe de los contables del folleto H; 2021-2022 CAS del anual 2022; trimestres CAS. Huecos: EBITDA trimestral, calificaciones ESG, voto de la remuneración, historial de guía (no da), transacciones con múltiplo, posición corta.

## Comprobaciones pedidas

- **Acciones tras la salida**: 1.237.832.845 = 1.151.184.545 A + 86.648.300 H (anuncio de asignación de HKEX). Sobreasignación hasta 12.997.200 H (1,05 %), que con la H por debajo de la oferta (35,30 HKD) el estabilizador cubrirá comprando en bolsa: no se cuenta. Sin autocartera.
- **Descuento H/A**: H 34,62 HKD × 0,8526 = 29,52 CNY frente a A 48,12 CNY → H/A 0,6134, **descuento del 38,7 %** (la oferta se fijó con un 38-44 % frente al cierre de la A del 30-sep).

## Decisiones

- `meta.divisa` CNY, `divisa_cotizacion` HKD, `tipo_cambio` 0,8526 (HKDCNY=X del 16-oct). `identificacion.precio` = 29,52 CNY.
- **EBIT limpio**: resultado operativo − ganancias de productos de tesorería − plusvalía por venta de filiales de 2024 (al resultado financiero). Las diferencias de cambio se quedan en el EBIT (son del negocio en monedas emergentes).
- **ROIC prudente**: caja del motor = solo efectivo; los productos de tesorería quedan en el capital invertido. ROIC 2025 16,10 % frente a WACC 9,76 % = **+6,34 puntos** (36-64 % en 2021-2024). El puente sí resta toda la tesorería (15.576 M) y suma 2.531 M netos de la salida a bolsa menos el dividendo a cuenta de agosto (921 M) como `otros_ajustes` −1.609,6.
- BPA y DPA de 2021-2023 ÷ 1,4 por la ampliación liberada de 4 × 10 de 2024.
- WACC 9,76 % (bono 1,648 %, beta 1,0, prima 5,5 % + 3,0 de China y mercados emergentes, Kd 3 %, deuda 5 %); g 1,2 %. Pesos DCF 60 / comparables 10 / escenarios 30.
- **Margen**: 5,2 % en 2026e, 5,9 % en 2027e, 6,5 % en 2028e y 6,8 % desde 2029e, por debajo de la media 2021-2025 (8,0 %): la caída de 2025 es en parte cíclica (memoria) y en parte estructural (Honor, Xiaomi, fin del móvil básico).
- Ventas 2026e +10,4 % fijo (1S real 35.431 M + 2S ≈ 37.000 M); 2027e +5 %, 2028e +6 %, luego hasta 2,5 %. Puente 2026e: volumen −6 %, precio +15 %.
- Circulante −1 % en 2026e (memoria comprada por adelantado: existencias 18.935 M en jun-26), −3 % y −4 % después. Control explicado.
- Mercado final: Frost & Sullivan 266.700 M USD en 2030e × 6,677 ÷ 0,891 (peso de los teléfonos en las ventas) → cuota 4,7 % → 4,4 %. Sostenibilidad **Sí** (motor y analista).
- **Historia del PER**: la de la A × H/A de hoy (base H), sin suponer que el descuento se cierra. Adelantado: 43,7 / 10,0 / 17,5 / 25,9 / 15,7 → mediana 17,5x, mínimo 10,0x; actual 10,16x. v2 en `per_historico.v2` (mediana 18,0x). Selector: 1,72 < 1,8 → v3.
- Consenso de objetivos (para la A) pasado a base H con 0,6134.
- `base_ebitda` del consenso como «publicado»: el EBITDA de MarketScreener no casa con su EBIT (incluye ganancias financieras); el control frente al consenso queda explicado.

## Resultado

- DCF 51,70 CNY; valor intrínseco 51,73 CNY (60,67 HKD, +75,2 %); con la prima del mercado 57,69. DCF inverso: −7,5 % anual de ventas o margen EBITDA del 3,6 % perpetuo; la rentabilidad implícita no se resuelve (> 20 %, control explicado).
- **12 m (v3 ×1,1, selector sin marcas)**: objetivo 39,67 CNY (46,53 HKD); ponderada +40,1 %, base +34,0 % (v2 27,3 % / 22,6 %). **Comprar**, convicción media. Comprar < 41,44 HKD; vender > 53,92 HKD.
- Robustez (`--actual`) SÓLIDA, acción robusta **Comprar**; límite robusto 37,48 HKD; colchón de BPA 18 % (23 % para mantener).
- Regla 13: **no cambia**. Próximos resultados ≈ **28-oct-2026** (estimada: el 3T25 salió el 28-oct-2025 en CNINFO; sin fecha anunciada).
- Word (42 páginas en PDF, soffice con perfil propio): 19 de 22 controles correctos y 3 explicados; cobertura 83,9 % (capital sin adquisiciones, directivos sin guía y transacciones vacías, de verdad).

## Para el coordinador (no lo he escrito en archivos comunes)

- **Símbolo de Yahoo**: 2636.HK (línea H, la que se compra); historia y beta con 688036.SS. Índices: 510300.SS y 588000.SS (ETF).
- **Próximos resultados**: 2026-10-28 (estimada).

## Lecciones

- Línea H recién salida (sin historia): la historia del PER se hace con la A × el cociente H/A de hoy, y la beta y las rentabilidades con la A. Así historia y precio miden lo mismo sin suponer que el descuento se cierra.
- El foro de Eastmoney (Guba) abre con curl: los mensajes van en un JSON incrustado como `article_list=`; se lee con `json.JSONDecoder().raw_decode`.
- ChinaBond (curva del bono chino) no da nada por GET; con POST al servicio de la curva sí sale el 10 años.
- El EBITDA de consenso de MarketScreener para empresas chinas puede incluir ganancias financieras (EBIT mayor que EBITDA): usar solo BPA y ventas, y no marcarlo como «ajustado» (el motor pediría un ajuste que no existe).
- Con caja neta grande, la rentabilidad implícita del DCF inverso puede no resolverse (tope del 20 %): se explica con el margen implícito.

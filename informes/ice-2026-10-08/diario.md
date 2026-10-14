# Diario — Intercontinental Exchange (ICE), corte 2026-10-08

- Inicio: 2026-10-08 17:38 (hora de Madrid).
- Commit del repo al empezar: f42067e Informe de Daiichi Sankyo (Mantener, convicción media).
- Prompt: verticales/empresa/prompt.md de ese commit (no se cambia a mitad).

## Fase 1 — Identificación
- Intercontinental Exchange, Inc. (Delaware), NYSE: ICE (también NYSE Texas). ISIN US45866F1049. CIK 0001571949. USD, ejercicio natural (31-dic), US GAAP.
- Corte 2026-10-08; a las 17:38 de Madrid la sesión de NY del 8 está abierta → precio de cierre del 7-oct-2026.
- Hecho clave hallado en EDGAR: el 29-jul-2026 ICE firmó la compra de MarketAxess a 167 USD por acción en efectivo (crédito puente de 6.250 M, préstamo a plazo del 20-ago-2026). Pendiente de cierre (fecha límite 29-jul-2027). Comisión por ruptura regulatoria a cargo de ICE: 327,4 M.
- Próximos resultados (3T26): ICE no publica calendario en la presentación; el 3T25 fue el 30-oct-2025. Pendiente de confirmar (D).
- Subagentes A-D lanzados a las 17:42. Prima implícita de Damodaran comprobada en ERPbymonth.xlsx (fila de oct-2026, columna «ERP (T12 m with sustainable payout)»): 4,20 %; su tasa del bono en esa fila, 5,29 %.
- 17:51 recordatorio a A-D (las cuatro notas seguían en esqueleto a los 10 min); C guardó a los 15 min; A, B y D seguían vacías a las 18:02 (trabajando en %TEMP%).

## Trabajo propio mientras tanto
- Precio 152,59 USD (cierre 7-oct). Beta frente a SPY: 0,86 mensual 5 años (ajustada 0,91), 0,58 semanal 2 años.
- LTM a jun-26 por segmento (10-K 2025 + 1S26 − 1S25, 10-Q 2T26): ingresos netos 10.558 M; EBITDA (resultado operativo + amortizaciones + costes de integración) Exchanges 4.645 (79 %), FIDS 1.365 (54 %), Mortgage 1.087 (50 %); total 7.097 (67 %).
- 1T26 extraordinario: energía +46 % (814 M) por la volatilidad geopolítica; en 2T26 energía −13 % (518 M). El LTM está inflado por un trimestre de pico: no proyectar desde él.
- Guía 2026 (2T26): gastos GAAP 5.140-5.180 M (ajustados 4.190-4.230), capex ~850 M, recurrentes de Exchanges al alza de un dígito alto, FIDS recurrentes +7-8 %.
- Amortización de intangibles adquiridos: 994 M en 2025; calendario 946 M (2026), 901, 803, 769, 744. En el DCF uso la amortización sin ella (no es deducible en caja en compras de acciones; si no, el DCF cuenta un escudo fiscal que no existe).
- Pasivo por impuesto diferido de intangibles: 4.064 M sobre 15.353 M de intangibles (10-K 2025): casi sin base fiscal, lo que apoya quitar su amortización del escudo fiscal del DCF.
- Próximos resultados: 3T26 el 29-oct-2026 (conferencia fijada, nota de 2T26).
- Ingresos de energía (futuros y opciones): 1.236 (2021), 1.162 (2022), 1.498 (2023), 1.876 (2024), 2.182 (2025); LTM jun-26 2.362. ADV energía 2025: 5,0 M contratos/día (+15 %), ingreso por contrato 1,74 USD. 1T26 814 M (+46 %), 2T26 518 M (−13 %).
- Compra de MarketAxess valorada en ~6.000 M USD; cierre previsto en el 1S27 (10-Q 2T26).
- 18:50 D terminó (108 llamadas, 68 min). 18:58 B terminó (89 llamadas, 70 min). A seguía en cuentas; C, en gobierno.
- Estadísticas de ICE del 3T26 (5-oct-2026): volumen medio diario +31 % interanual (energía +18 %, Brent +38 %, TTF +39 %, financieros +45 %); septiembre +51 %, interés abierto +13 %. Con eso el 2026e del consenso (11.038 M, +11,1 %) es alcanzable: lo fijo en +11,0 %.
- Primer cálculo con supuestos provisionales: DCF 154 USD (WACC 8,8 %), regla absoluta Mantener y relativa Comprar (rentabilidad implícita 8,8 % frente a 8,2 % que pide el mercado).
- Decisión: amortización del DCF solo la de inmovilizado y software propio (5,5 % de ventas); la de intangibles adquiridos no da escudo fiscal en caja (pasivo diferido de 4.064 M sobre 15.353 M de intangibles).
- Etapa 2 descartada: ROIC del motor 8,1 % frente a WACC 8,8 % (fondo de comercio de 30.646 M).

## Interrupción
- Corte de red/sesión hacia las 18:55; reanudado a las 22:07. Por indicación del coordinador no se relanzan subagentes: sigo yo desde las notas. A quedó guardada a las 18:55 con todo salvo `calidad` (que me reservé); C completa a las 18:38.

## Integración, cálculo y redacción (22:07-22:16)
- Rating resuelto: A3/A- estable, del pricing term sheet de los bonos de ago-26 (EDGAR, FWP). El bono a 2036 salió a 82 pb sobre el Tesoro: coste de la deuda del 6,1 %.
- Pensiones: déficit neto de 65 M (superávit del plan 69, complementario −19, posjubilación −115), 49 M tras impuestos, al puente.
- Beta elegida: 0,91 (ajustada, mensual 5 años frente al SPY). Contraste: 0,85 frente a XLF, 1,01 frente a la cesta CME/NDAQ/CBOE; CME (0,20) y Cboe (0,41) casi acíclicas con R² < 0,1.
- WACC 8,84 % (Rf 5,27 % FRED, prima 5,0 %, Kd 6,1 %, deuda 19 %). Terminal 3,0 %. Etapa 2 no (ROIC 8,1 % < WACC).
- Suma de partes sobre EBITDA LTM por segmento: Exchanges 4.645 × 16, FIDS 1.365 × 16, Mortgage 1.087 × 13 → 167,40 USD.
- Bajista calibrado: 2027 con −7 pp de crecimiento y −2 pp de margen (la base de costes fija no da −5 pp con −3,5 % de ventas).
- Resultado: DCF 154,01; valor objetivo 160,42 (+5,1 %); con la prima del mercado 173,73 (+13,9 %). Regla absoluta Mantener, relativa Comprar → Comprar, convicción baja (la diferencia es solo la tasa de descuento; cifras a menos de un 2 % del consenso).
- Revisión de la portada: corregidas 173,72 → 173,73, DN aj./EBITDA 2,6 → 2,7 y escenarios ponderados 151,46 → 151,50 en los textos.
- Word y PDF generados (59 páginas, 28 gráficos, cobertura 93 %); Word abre sin reparar.
- Fin: 22:16. Tiempo efectivo ≈ 1 h 30 min (17:38-18:55 y 22:07-22:16), más largo de lo previsto por la lentitud de A y el corte.

## Fallos del sistema
1. **Las notas tardan en tener contenido.** A los 10 minutos las cuatro eran esqueleto; A no guardó nada hasta los 46 minutos pese a dos recordatorios. Arreglo: que `prompt-de.mjs` incluya un paso explícito «guarda financieros.cuenta antes de seguir» y un guardado mínimo a los 8 minutos, y un vigilante (`Monitor`) que avise si una nota sigue por debajo de 1 KB a los 10 minutos.
2. **Nombres de campo dentro de textos** (A escribió `coste_ventas` y `caja` entre comillas invertidas). Integrar lo avisa, pero el arreglo exige un parche de texto en propio. Arreglo: que el extracto de cada subagente prohíba nombrar campos en los textos.
3. **Huecos con notas para el integrador** («lo debe completar el integrador», «subagente B»): salen en el anexo impreso. Arreglo: que integrar retire o reescriba la decisión cuando el hueco se resuelve, y que los subagentes usen `notas_integrador` para eso.
4. **El rating no se buscó** por el cupo de búsquedas, y estaba en EDGAR (FWP de la emisión de bonos). Arreglo: añadir a lecciones que los pricing term sheets (FWP) de EDGAR traen la calificación esperada de Moody's y S&P.
5. **Corte de sesión a las 18:55** con los subagentes a medio cerrar: se perdió el cierre de textos de A. Arreglo: el guardado por partes funcionó (no se perdió nada guardado); mantenerlo.
6. **El consenso mezcla bases** (EBITDA ajustado, BPA de 2026e GAAP). D lo detectó; el ajuste del 0,7 % de ventas se aplicó con `base_ebitda: "ajustado"`.
7. **Cuota de mercado de Encompass/MSP**: núcleo sin dato (la demanda de la FTC daba 404). Queda en huecos.

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json` y `Intercontinental Exchange - 2026-10-08 v2.docx` (y .pdf). Mismo precio (152,59 USD) y corte. Sin fuentes nuevas: el puente cita [1, 6, 7, 8, 27, 33, 34, 35, 56].

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Comprar · Baja | Comprar · Baja (sin cambio) |
| Valor objetivo y rentabilidad total (WACC 8,84 %) | 160,42 USD, RTE +6,4 %, asimetría 0,85x | igual |
| Con la prima del mercado (4,20 %, WACC 8,25 %) | 173,73 USD, RTE +15,2 %, asimetría 1,93x | igual |
| Comprar por debajo / vender por encima | 152,72 / 186,57 USD | igual |
| Sostenibilidad del crecimiento | (no existía) | **Sí** |

- **Veredicto: Sí.** El base pide un 4,7 % anual en 2027e-2035e (5,3 % con 2026e), menos que el 8,6 % de 2021-2025 y que el 7,9 % previsto para el mercado; el DCF inverso pide lo mismo (4,6 %). Foso amplio, poder de precios demostrado (ingreso por contrato de energía 1,70 → 1,74 USD; subidas contractuales en el software hipotecario) y activos ligeros: reinversión neta acumulada de 1.962 M, el 3 % del NOPAT, con ROIC incremental del 11,5 %.
- **Puente** 2026e-2030e: volumen 9 / 2,5 / 3,5 / 3,5 / 3 y precio 1,5 / 2,5 / 2,5 / 2,5 / 2,5 (2026e, +0,5 de divisa). El reparto es estimación propia: ICE no separa volumen y precio en el grupo.
- **Mercado final: null.** `competencia.cuota_pct` es null (no hay cuota de Encompass, MSP ni del TTF en un documento primario) y el sector no tiene un tamaño único con el perímetro de ICE: no hay prueba de cuota; dicho en la justificación.
- **Sin cambios de supuestos** (la prueba no pide nada que la empresa no pueda financiar). Textos: solo la frase obligatoria en «El negocio»; para no pasar de las 650 palabras se quitó de «Finanzas» la frase sobre la amortización de intangibles (la síntesis ya tenía 653 en v1; queda en 673).

**Fallos del sistema vistos**
1. Con ROIC < WACC (8,1 % frente a 8,84 %, por el fondo de comercio) el motor no da `crecimiento_financiable_pct` ni avisa: en un negocio de activos ligeros la prueba de reinversión no dice nada y todo descansa en el puente, que es estimación propia.
2. El texto del motor da el crecimiento medio con 2026e (5,3 %) y la tabla «La decisión» compara el implícito 2027e-2035e (4,6 %): dos medias distintas para la misma pregunta.
3. Sin perímetro comparable de cuota (empresas multimercado), la prueba de cuota queda vacía sin aviso en el Word; convendría una fila «No aplica: sin cuota publicada».

- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 177,1 USD, rentabilidad +17,4 %, señal Comprar (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +15,1 % → +11,4 %, base +8,4 %, señal Mantener (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v3.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 25.8x, mínimo 16.1x, media larga 29.2x; antes v2 23.3x/19.4x/23.4x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v3.json y «Intercontinental Exchange - 2026-10-08 v3.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Comprar 22,8 % (antes v3 Comprar 32,3 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 15,2x / 17,9x / 23,3x, 11,4 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): 32,3 % Comprar. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

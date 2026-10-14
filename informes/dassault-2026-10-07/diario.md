# Diario — Dassault Systèmes (DSY.PA), corte 2026-10-07

- Commit de partida: `db0342a Viscofan v3, CAF v2, Enagás v2 e Indra v3 con la regla relativa`.
- Inicio: 17:21 (hora local). La sesión del 7-oct no había cerrado (Euronext cierra a las 17:30): se usa el cierre del 6-oct.

## Fase 1 — Identificación (17:21-17:27)
- Dassault Systèmes SE, Euronext Paris DSY (Yahoo DSY.PA), ISIN FR0014003TT8, EUR, ejercicio a diciembre, NIIF-UE.
- Último informe: 2T26 (comunicado del 23-jul-2026, cifras sin auditar). Próximos resultados: 3T26 el 28-oct-2026 (calendario del comunicado del 2T26, p. 9).
- Pascal Daloz es ya primer ejecutivo **y presidente** del consejo (comunicado 2T26).
- Hecho reciente: compra de ArisGlobal anunciada con el 2T26 (julio de 2026).
- investor.3ds.com no responde a curl (tiempo agotado); los PDF de `www.3ds.com/assets/invest/...` bajan bien con descargar.mjs.

## Fases 2-4 — Subagentes (lanzados 17:26)
- A (cuentas), B (sector), C (gobierno), D (mercado) lanzados a la vez en segundo plano.
- Petición nueva del coordinador (17:28): además del Word, PDF en la carpeta del informe con el mismo nombre (`a-pdf.ps1 … -Salida …pdf`); rehacerlo si se rehace el Word.
- Prima implícita comprobada en ERPbymonth.xlsx (última fila, 219): columna I «ERP (T12 m with sustainable payout)» = 4,20 %; columna J «ERP (T12m)» = 3,70 % (la que no se usa).
- Guía 2026 non-IFRS (23-jul-2026): ingresos 6.296-6.416 M (+3-5 % a tipo constante), margen operativo 32,2-32,6 %, BPA 1,30-1,34 EUR. Remuneración en acciones prevista ~115 M y amortización de intangibles adquiridos ~315 M. Día del inversor el 17-nov-2026.

- 17:37 control de 10 minutos: A y B sin contenido (recordatorio enviado); C con gobierno; D con identificación, bolsa, múltiplos históricos, puente y WACC. C había dejado dos JSON auxiliares en notas/ (pedido moverlos).
- ~17:42 corte de la sesión (límite): se paran los cuatro subagentes. B, C y D llegan a terminar (17:41). A.json quedó vacío pese a haber bajado los comunicados de 4T22-4T25 y 1T26.
- 17:56 se retoma: A reanudado con SendMessage (conserva su contexto) con orden de núcleo y guardado tras cada campo; mientras, preparo propio.
- 18:05 A termina (A.json completo). Primera integración y cálculo: DCF 25,31, objetivo 26,61, regla Comprar (sin escenarios aún).
- ~18:08 Supuestos cerrados (margen NIIF con remuneración en acciones normalizada al ~3 % de ventas). DCF 25,30; objetivo 25,20 (+17,2 %); relativa 30,40; ambas reglas Comprar. Variantes del motor para riesgos (copias en TEMP): dólar −10 % → 24,02; crecimiento −1 pp → 23,72; margen −1,5 pp → 24,11; Ciencias de la vida −3 pp 2027-29 → 23,43.
- ~18:09 Coste de la deuda subido al 4,0 % (estimación propia, emisor A): DCF 25,17; objetivo 25,08 (+16,6 %); rentabilidad total 17,9 %; asimetría 2,05x; relativa 30,22 (+40,5 %). Variantes del motor rehechas sobre esta base: dólar −10 % → 23,89 (−5,1 %); crecimiento −1 pp → 23,59 (−6,3 %); margen −1,5 pp → 23,98 (−4,7 %); Ciencias de la vida −3 pp en 2027-29 → 23,31 (−7,4 %); ArisGlobal a valor cero → 23,95 (−4,8 %). WACC +0,5 → 23,21 (tabla del motor).

## Fases 6-9 — Supuestos, redacción, revisión y entrega (18:05-18:17)
- Beta 0,95 (frente al STOXX 600; CAC 40 da 0,58 mensual y EXV3 0,65-0,82). Tasa libre: Bund 3,52 % (la OAT ≈4,0 % subiría el WACC ~0,45 puntos). Prima 5,5 %; implícita 4,20 % en la regla relativa.
- Etapa de transición no usada: ROIC con fondo de comercio 13,8 % (5,7 puntos sobre el WACC, justo por encima del mínimo); sin él, >90 %. El crecimiento por debajo del mercado desde 2024 no la justifica; se alarga la proyección explícita a diez años.
- NIIF: remuneración en acciones normalizada al ~3 % de ventas desde 2027 (2026: guía de ~115 M). Ajuste del consenso de EBITDA: 2,4 % de ventas (remuneración en acciones + otros gastos operativos).
- Revisión de comité: lo más agresivo es volver al 5-5,5 % en 2027-29 (crecimiento a tipo constante del 3-4 % en 2025-26); proyección 1,3-4,8 % por debajo del consenso; bajista = repetición de 2024-25.
- Primer Word: cobertura 89,7 %; faltaba `suma_partes.comentario` (añadido). Portada con EV/EBITDA NTM 11,9x frente a 11,8x en los textos (el motor cambió al fijar el ajuste en 2,4 %): corregido en textos.
- Limpieza de notas de trabajo en campos impresos (comillas invertidas con nombres de campo y «subagente C» en huecos y comentarios de A y B).
- 18:13 nueva regla del coordinador: trabajar solo en el repo y en %TEMP%. PDF a la carpeta del informe; PNG a %TEMP%.
- Entrega: Word y PDF (54 páginas) abren sin reparar; revisadas como imagen la portada, la síntesis, el resumen con «La decisión» y la síntesis de valoración. Controles: 14 de 15 correctos y 1 explicado (regresión R² 0,10).
- Duración: 17:21-18:17, con unos 14 minutos perdidos por el corte de 17:42-17:56.

## Fallos del sistema
1. **Corte por límite de uso a las ~17:42 con los cuatro subagentes a la vez.** A no había guardado nada pese al recordatorio de los 10 minutos (lo leyó tarde: el mensaje se entrega en la siguiente ronda de herramientas). Arreglo: reanudarlo con SendMessage (conserva el contexto) funcionó y terminó en 6 minutos. Proponer en el comando que la primera escritura de la nota sea obligatoria antes de la primera descarga larga (un esqueleto con `fuentes` y la cuenta a medias).
2. **investor.3ds.com no responde a curl ni a descargar.mjs** (tiempo agotado). Los PDF de `www.3ds.com/assets/invest/` y la copia DILA (info-financiere.gouv.fr) sí bajan. Añadir a lecciones: para Francia, la DILA da el URD en ESEF y los comunicados; la API de la AMF da las operaciones de directivos.
3. **El consenso de MarketScreener mezcla bases** (EBITDA y EBIT non-IFRS, BPA NIIF) y en los comparables de EE. UU. el EBITDA es ajustado. El motor resta el ajuste a Dassault y la deja en otra base que los comparables. Arreglo propuesto: un `base_ebitda` por comparable o una columna de remuneración en acciones para homogeneizar.
4. **Remuneración en acciones anómala en 2026** (39 M en el 1S26 frente a 196 M): el motor no tiene forma de normalizarla salvo a mano en el margen del DCF. Proponer un campo `remuneracion_acciones` en la cuenta para que el motor la muestre y avise si cae más de un 50 %.
5. **Riesgo de divisa sin sensibilidad en el motor**: se sacó con copias de `datos.json` en %TEMP% modificando el DCF. Proponer una tabla de sensibilidad a la divisa (porcentaje de ingresos y costes en moneda extranjera).
6. **Los subagentes dejan notas de trabajo en campos impresos** (nombres de campo entre comillas invertidas, «PENDIENTE», «subagente C»). El integrador solo avisa de «PENDIENTE». Ampliar el aviso a comillas invertidas y a «subagente».
7. **Cifra del motor que cambia tras redactar** (EV/EBITDA NTM 11,8x → 11,9x al fijar el ajuste). Proponer una comprobación final que busque en los textos las cifras de `calc.clave` con un decimal distinto.

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Dassault Systèmes - 2026-10-07 v2.docx` y su PDF. Mismo precio (21,51 EUR, cierre del 6-oct) y fecha de corte. No se tocan supuestos del DCF.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Comprar · Media | Comprar · Media (la sugerida por los criterios) |
| Valor objetivo (WACC 8,13 %) | 25,08 EUR, RTE 17,9 % | 25,08 EUR, RTE 17,9 % |
| Objetivo con la prima del mercado (4,2 %, WACC 7,03 %) | 30,22 EUR, RTE 41,7 % | 30,22 EUR, RTE 41,7 % |
| Comprar por debajo / vender por encima | 25,73 / 31,95 EUR | 24,13 / 31,95 EUR (cambio del motor, no de supuestos) |
| Sostenibilidad del crecimiento | — | **Sí** (4,1 % anual; sin inversión neta; cuota 8,3 % → 8,6 % en 2035e) |

- **Veredicto «Sí»**: el base pide un 4,1 % anual, en línea con el 4 % a tipo constante de 2025 y por debajo del ARR (+6 %) y del 9,6 % previsto para el PLM amplio [1, 2, 27]. Reinversión neta de 665 M en diez años (3 % del NOPAT): la prueba es la cuota y el precio, no el capital.
- **Mercado final**: mismo perímetro que la cuota (PLM amplio de CIMdata). CIMdata solo prevé hasta 2029e (126.700 M USD); para 2035e se congela en ese nivel y se pasa a EUR a 1,175 (107.830 M EUR). Es una cota baja del mercado y, por tanto, alta de la cuota implícita (8,6 %).
- **Puente volumen/precio** (2026e-2028e): la empresa no publica precios ni renovaciones; el reparto (≈ 1,5 puntos de precio al año) es estimación propia, apoyada solo en el margen non-IFRS estable con inflación salarial. La divisa resta 1,9 puntos en 2026e (guía +3-5 % a tipo constante, +1-3 % publicado).
- **Textos**: frase del veredicto en «El negocio», explicación de la convicción en la síntesis (control nuevo «La síntesis explica la convicción») y el nivel de compra de 25,73 a 24,13 EUR en la síntesis y en `cambiaria_recomendacion`.

**Fallos del sistema vistos**
1. El motor nuevo cambia el nivel de «comprar por debajo» (25,73 → 24,13 EUR) sin tocar ningún dato: las actualizaciones de método deben releer `calc.recomendacion.niveles` y buscar la cifra vieja en todos los textos.
2. La prueba de cuota necesita el mercado en el último año explícito, pero las fuentes de mercado rara vez llegan a diez años; el prompt no dice cómo extrapolar (aquí, congelar en el último año previsto como cota conservadora).
3. «Crecimiento medio proyectado» (4,1 %, toda la proyección) y el crecimiento base del DCF inverso (4,3 %, años no fijos) conviven en el informe; fácil mezclarlos en la justificación.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 30,60 EUR, rentabilidad 43,6 %, señal Comprar (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +28,1 % → +9,3 %, base +10,3 %, señal Mantener (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v3.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 49.2x, mínimo 37.2x, media larga 52.2x; antes v2 47.8x/26.5x/41.9x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.

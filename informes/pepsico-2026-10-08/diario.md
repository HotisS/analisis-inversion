# Diario · PepsiCo (PEP) · corte 2026-10-08

- Commit de partida: `a0e01d7 seguimiento.xlsx con Zoetis, DSV y Rentokil`. No se cambió el prompt durante el análisis. Sin commits.
- Inicio: 10:08 (hora de Madrid). Fin: 10:43. Unos 35 minutos de reloj; los subagentes trabajaron 12-18 minutos cada uno.

## Tiempos
- 10:08-10:13 · Fase 1: procedimiento, prompt y lecciones; identificación en EDGAR (lista de presentaciones), nota de prensa del 2T26 y 8-K del 17-sep-2026. Último periodo publicado: 2T26 (24 semanas al 13-jun-2026). Se detecta el 403 de la SEC y se preparan copias de las herramientas en %TEMP%.
- 10:13 · Lanzados los cuatro subagentes (A cuentas, B sector, C gobierno, D mercado).
- 10:24 · Control de los 10 minutos: A, B y D con contenido; C seguía con el esqueleto (78 bytes) y se le recordó guardar. Terminó a las 10:25 con la nota completa.
- 10:25-10:30 · Betas sectoriales de Damodaran (página HTML; el .xls no se puede leer). Primer cálculo con notas parciales. Terminan A (10:29), B (10:30) y D (10:31). Aviso a D por texto mal codificado en su nota; lo corrigió.
- 10:30-10:36 · Fase 6: supuestos del DCF alineados con el consenso en 2026-2028, margen medio punto por debajo por los cargos de reestructuración que se repiten, beta 0,65 reapalancada; escenarios con bajista calibrado en 2021-2022 y 2025. DCF inverso: crecimiento del −0,1 % o margen del 16,9 %; rentabilidad implícita del 8,7 %.
- 10:36-10:41 · Fases 7 y 8: textos, revisión de comité, limpieza de nombres de campo en los huecos, informe Word (60 páginas, 28 gráficos, cobertura del 91,8 %) y PDF. Revisadas como imagen las páginas 1-4.

## Decisiones
- **Resultados del 3T26 el mismo día del corte** (8-oct, antes de la apertura de Nueva York, hacia las 12:00 de Madrid). El informe se cierra sin ellos, con el precio del 7-oct, y lo dice en la síntesis, en limitaciones y en catalizadores.
- **Beta 0,65**: reapalancada desde Damodaran (bebidas no alcohólicas 0,58 y alimentación 0,47 desapalancadas, ponderadas por ventas). Contraste: frente al S&P 500, 0,55 ajustada; frente al MSCI World, 0,58; frente a XLP, 0,91, que mide el riesgo frente al sector y no sirve para el CAPM.
- **Consenso de EBITDA en la misma base que el de los últimos 12 meses** (`base_ebitda` «NIIF»): D proponía restar un 0,9 % de las ventas, pero el EBITDA de los últimos 12 meses ya es recurrente con `no_recurrentes_en_ebitda`; restarlo habría contado el ajuste dos veces.
- **Sin etapa de transición**: el ROIC supera al WACC en casi 14 puntos, pero el crecimiento orgánico de 2024-2025 (2,0 % y 1,7 %) no justifica alargarlo.

## Fallos del sistema
1. **`descargar.mjs` y `form4.mjs` reciben HTTP 403 de www.sec.gov.** La SEC ya no acepta el User-Agent «analisis-inversion (uso personal, investigacion)»; data.sec.gov sí lo acepta. Con un User-Agent de la forma «nombre contacto@dominio» responde 200. Arreglo provisional: copias con el User-Agent cambiado en `%TEMP%\analisis-inversion\pepsico\`. **Arreglo propuesto:** que las dos herramientas usen un User-Agent «analisis-inversion contacto@dominio», configurable con una variable de entorno (`SEC_UA`).
2. **FRED (DGS10) agotó el tiempo tres veces.** D usó la curva diaria del Tesoro, que es la fuente original. **Arreglo propuesto:** que `lecciones.md` dé como alternativa la curva del Tesoro (home.treasury.gov, «Daily Treasury Par Yield Curve Rates», CSV del año).
3. **Los cierres de ejercicio de 52/53 semanas rompieron los múltiplos históricos sin avisar.** D etiquetó la serie como «FY2016…FY2025» y la cuenta usa «2016…2025»: el cálculo dejó los múltiplos históricos vacíos sin ningún control en «Revisar». Arreglado con `_parches`. **Arreglo propuesto:** un control que avise si los años de `multiplos_historicos.serie` no casan con los de `financieros.cuenta`, y que `bolsa.mjs` acepte `--cierres` con las fechas reales de cada ejercicio.
4. **Texto doblemente codificado en una nota** («reafirmÃ³»): D escribió una parte de D.json con una lectura en latin1. **Arreglo propuesto:** que `integrar.mjs` avise de secuencias «Ã», «Â» en cualquier texto.
5. **`descargar.mjs` guardó como .xlsx un .xls antiguo (BIFF)** de Damodaran (betas sectoriales), que no se puede abrir como zip. Se usó la página HTML. **Arreglo propuesto:** detectar la firma del archivo (D0 CF 11 E0 = .xls) y avisar.
6. **Interacción entre `no_recurrentes_en_ebitda` y `consenso.base_ebitda`.** El prompt no dice qué hacer cuando el EBITDA de los últimos 12 meses ya es recurrente y el consenso también lo es: D aplicó el ajuste del 0,9 % y habría restado dos veces. **Arreglo propuesto:** añadir al prompt que, con `no_recurrentes_en_ebitda`, el consenso core está en la misma base y no se ajusta.
7. **Nombres de campo en `meta.huecos`** (vs_consenso, vida_media_anios, tcac_previsto_pct, cr5_pct, participacion_pct): salían impresos en el anexo. Se corrigieron a mano en las notas. **Arreglo propuesto:** que `integrar.mjs` avise de nombres de campo en `huecos[].campo`, igual que hace con las notas de trabajo.
8. **El índice sectorial `^SP500-30` no tiene datos en Yahoo**; no hay alternativa de índice de consumo básico de precio. Se usó XLP. **Arreglo propuesto:** anotarlo en `lecciones.md`.
9. **Fecha de corte el día de resultados.** El calendario financiero se miró en la fase 1, pero el procedimiento no prevé qué hacer si los resultados salen el mismo día del corte. **Arreglo propuesto:** una regla en el comando: si los resultados caen en las 48 horas siguientes al corte, avisar al usuario antes de empezar y ofrecer esperar.
- 2026-10-14: datos-v2.json y «PepsiCo - 2026-10-08 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: sin objetivo a 12 m.

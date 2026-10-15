# Diario · FactSet (FDS) · 15-oct-2026

- Commit de partida: ffbb0d3 (Cola: octava hora retomada). Sin `git pull` ni commits (los hace el coordinador).
- Entorno: nube, red abierta. Reutilizado de ayer (comprobado): `notas/cuentas-xbrl.json` (SEC FY2018-FY2025), `notas/docs/` (10-K FY23 y FY25, proxy 2025, junta, 8-K, notas de resultados FY2017-FY2026), `form4.json`. `bolsa.mjs` relanzado con corte 2026-10-15: precio = cierre del 14-oct, 289,74 USD (la sesión del 15-oct no había abierto a las 07:30 UTC).
- Ejercicio a 31 de agosto, etiqueta «fin». FY2026 de la nota de resultados del 30-sep-2026 (el 10-K de FY2026 no estaba presentado). Notas A-E con `notas/construir-notas.mjs`; propio = `propio.mjs` + `supuestos.mjs` + `textos.mjs`. Ficha sectorial reutilizada: `sectores/bolsas-datos-financieros-2026-10-14.md` (comparables y tamaño de mercado). Transacciones de los informes de LSEG y MSCI del 14-oct.
- Decisiones: BPA normalizado = ajustado − amortización de intangibles comprados (16,41 en FY2026), en la historia y en los casos. EBITDA con 79,2 M de no recurrentes devueltos (FY2026) y pagos en acciones como gasto. Arrendamientos operativos fuera del puente y del balance de deuda (US GAAP). WACC 9,46 % (bono 5,21 %, beta 0,90 por encima de la histórica 0,73 por el riesgo de régimen de IA). Terminal 2,5 %. Bajista severo (−3 pp de crecimiento, −2,5 pp de margen, terminal 1,5 %). Pesos DCF 45 / comparables 10 / escenarios 45 (los comparables, en BPA ajustado y con activos de referencia, sobrevaloran a FactSet). Sostenibilidad «En parte» (el motor da «Sí»: no salta el control; lo rebajamos por el riesgo de IA sobre el poder de precio).
- Hallazgos: ASV orgánico +7,0 % (récord) y retención > 95 %; EY dio opinión **adversa sobre el control interno** en FY2024 y FY2025 (TI de ingresos); Morningstar retiró el foso (valor 275); Redburn Vender (215) el 18-jun; ChatGPT para servicios financieros (10-sep) −5,8 % ese día. Cúpula nueva (CEO sep-25, CFO abr-26).
- Resultado: DCF 305,45; valor intrínseco 314,93 (+8,7 %); DCF inverso 3,9 % (base 4,7 %). ROIC 20,2 % − WACC 9,46 % = +10,7 puntos (sin fondo de comercio 34,1 %; el motor lo clasifica como comprador en serie). Controles 18/20 + 2 explicados. Cobertura 90,7 %.
- **Línea 12 m**: v3 (decide, selector sin marcas: mediana/actual 1,66) ponderada 22,8 %, base 19,2 % → Comprar; v2 11,5 % / 8,8 % → Mantener. Objetivo 351,37 USD. Recomendación del informe: **Mantener**, convicción baja (justificada). Comprar < 280,80 (robusto) / 308,54 (v3); vender > 395,36.
- Robustez: FRÁGIL; acción robusta Mantener (cambia con v2). D3 aviso: FDS no está en `precios.json`/`simbolos.json` (el coordinador debe añadir el símbolo `FDS`).
- Próximos resultados: 1T FY2027 ≈ 17-dic-2026 (estimado por el calendario de 2024 y 2025); día del inversor 10-nov-2026.
- Tiempo: ≈ 07:30-08:05 UTC.

## Lecciones

- FactSet llama «no recurrentes» a reestructuraciones que aparecen en cuatro de seis años: para la historia del PER es más limpio usar ajustado − amortización de intangibles (de la conciliación anual por acción de cada nota de resultados del 4T), que deja la misma base en la historia y en los casos.
- Con un ejercicio recién cerrado y el 10-K sin presentar, la nota de resultados del 4T trae cuenta, balance y flujos completos; las reservas hay que estimarlas.
- Los comparables de la ficha sectorial están en BPA ajustado y son en su mayoría dueños de activos de referencia: para la empresa más expuesta a la IA del grupo, su múltiplo implícito sobrevalora; bajar su peso y decirlo.

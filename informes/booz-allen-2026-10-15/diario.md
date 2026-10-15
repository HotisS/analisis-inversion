# Diario · Booz Allen Hamilton (BAH) · 15-oct-2026

- Commit de partida: 76166ce. Sin pull ni commits propios (los hace el coordinador). Encargo de la 9ª hora (cribado de gestores y escáner).
- Entorno: nube de Claude Code con red abierta. Sin subagentes: notas A-E escritas por `notas/construir-notas.mjs`; la parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs`.
- Documentos (EDGAR, `notas/docs`): 10-K FY2026, proxy 2026, notas de resultados 1T27, 4T26, 3T26, 2T26 y 4T de FY2020-FY2025, presentación del 1T27, 8-K de Ultra (acuerdo y cierre), bonos de agosto (8-K, 424B2, FWP con el rating), cambios de directivos y junta de julio. XBRL con `cuentas.mjs --sec BAH`; Form 4 con `form4.mjs`; `bolsa.mjs` con `--cierre-mes 3 --etiqueta fin` (sin `--etiqueta` nombraba los ejercicios por el año de inicio). Comparables de Stock Analysis; consenso de MarketScreener (abre con la URL de uk.marketscreener).
- Ficha sectorial nueva: `sectores/consultoria-gobierno-2026-10-15.md` (+ comparables JSON).
- Fecha de corte 2026-10-15; USD; ejercicio a 31 de marzo, etiqueta «fin» (FY2026 = abr-25 a mar-26). Precio: cierre del 14-oct (71,87 USD = 64,20 EUR al BCE 1,1195; una acción es el 0,2 % de una cartera de 30.000 EUR).
- Decisiones de datos: coste de ventas = coste de ingresos + gastos facturables (el XBRL solo daba el primero); la amortización del XBRL ya incluye la de intangibles comprados (cuadra con la conciliación de EBITDA). No recurrentes en el EBITDA: DOJ 350 M (FY2023), −228 M (FY2025: costes reclamados y seguro), 33 M (FY2026). Activos por contrato fuera (están dentro de clientes). Arrendamientos operativos fuera. Puente a 30-jun-2026 con Ultra (720 M) en `otros_ajustes`.
- BPA: normalizado (BPA ajustado de la empresa − amortización de compras después de impuestos; FY2026 con tipo normal, sin la liberación fiscal). FY2029e 5,03 / 6,42 / 7,17.
- Resultado: DCF 105,85 (WACC 8,05 %, beta 0,85, bono 5,21 %); valor intrínseco 97,00 (+35,0 %); DCF inverso −2,7 % de crecimiento anual (base 3,1 %) o margen 9,0 %; rentabilidad implícita 9,8 %. ROIC 25,0 % (58,0 % sin fondo de comercio; motor: «compra única grande»); ROIC − WACC ≈ 17 puntos. Sostenibilidad: motor «Sí», nuestro veredicto «En parte» (sin control: el control solo salta al revés): pruebas financieras pasan, pero sin poder de precios, orgánico negativo y 81 % de ingresos por horas/costes expuestos a la IA y al precio fijo.
- **Línea 12 m**: selector → v3 ×1,1 (mediana adelantada 19,0x / actual 13,0x = 1,46; 8 años). v3 ponderada +34,5 %, base +31,0 %; v2 +22,8 % / +19,4 %. Objetivo 94,30 USD. Regla Comprar; **informe Mantener** (convicción media) por la calidad. Comprar < 84,05 (robusto 76,64); vender > 107,40.
- Robustez: SÓLIDA; acción vigente Comprar, **acción robusta Mantener** (Q1: sostenibilidad En parte). D5 VARIANTE (tipo fiscal del 1,3 % en FY2026: la historia ya va con BPA normalizado), E2 (resultados el 23-oct), D3 (BAH no está en `precios.json`: falta añadir el símbolo a `verticales/empresa/simbolos.json`, archivo compartido que no toco), M6 aviso. Colchón de BPA: 15 % para Comprar.
- Riesgo IA: exposición Alta, sentido Mixto, −20 % a 3-5 años en el caso adverso (+10 % si captura la productividad).
- Word y PDF (soffice): 42 páginas, cobertura 89,2 %, 20 de 21 controles y 1 explicado (tipo fiscal).
- Para subir la confianza: ventas y múltiplo de Ultra, crecimiento orgánico de Seguridad nacional (2T27, 23-oct-2026), reparto de recomendaciones, márgenes EBIT de los competidores, calificaciones ESG.
- Tiempo: unos 20 minutos de reloj (09:21-09:41 UTC).

## Lecciones

- `bolsa.mjs` con ejercicio no natural a marzo: pasar `--etiqueta fin` si la empresa nombra el ejercicio por el año en que termina (Booz Allen); si no, los cierres salen un año corridos.
- `cuentas.mjs --sec` con contratistas federales que presentan «billable expenses» en una línea aparte (Booz Allen): `coste_ventas` sale sin ellos; recalcular como ingresos − G&A − amortización − EBIT. Y `activos_contrato` (cuentas no facturadas) ya está dentro de `clientes`: no sumarlo dos veces.
- MarketScreener abre con WebFetch en `uk.marketscreener.com/quote/stock/<SLUG>/finances/` y `/consensus/` (la URL de www dio la portada).

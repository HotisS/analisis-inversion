# Diario · DO & CO (DOC) · corte 15-oct-2026

- Commit de partida: a225607. Inicio 07:50 UTC; fin a las 08:20 UTC. Análisis value completo por un subagente (fases 2-4 sin subagentes: notas A-E y `propio.mjs` con `supuestos.mjs` y `textos.mjs`).
- Origen: escáner «calidad a precio» (PER adelantado ≈ 15x; ROIC − WACC ≈ +15; ventas +20 % anual; sin deuda neta financiera).

## Datos y herramientas
- Cuentas FY2021-FY2026 del ESEF (`cuentas.mjs --esef "DO & CO"`, LEI 5299002NFQKOBT1E8569). El XBRL no trae deuda ni arrendamientos separados ni coste de ventas: completados con las notas de los informes anuales (cuenta por naturaleza: coste de ventas = aprovisionamientos). El BPA diluido de FY2022 (1,29) sale mayor que el básico (1,13): se usa el básico.
- Precio: 195,00 EUR, cierre del 13-oct-2026 (Yahoo no tenía el 14-oct). Dos sesiones antes del corte: válido.
- `descargar.mjs --lista` no encontró PDF en la web de inversores; se bajaron a mano (q1_2627, q3_2526, etc.). `q2_2425` falló: el 2T25 queda sin variación interanual.
- La guía «ventas +6-8 %, margen EBIT 8,6-9,0 %» que daba un resumen de búsqueda no aparece en documentos de la empresa: no se usa.

## Decisiones
- **Minoritarios de Turkish Airlines (THY DO & CO, 50 %)**: BPA atribuible; en el puente, a valor de mercado = 14 × 31,55 M (beneficio de FY2026 atribuido a minoritarios) = 441,7 M, frente a 100,3 M en libros. Resta ≈ 31 EUR por acción frente al valor contable; dicho en la síntesis y en `controles_explicados`.
- **NIIF 29**: BPA publicado sin quitar la hiperinflación (se repite cada año; en FY2026 restó 29,2 M al resultado financiero y sumó 12,9 M al EBITDA). Resultado financiero proyectado de −10/−8/−6 M, coherente con el 1T FY2027 (−0,4 M).
- **NIIF 16**: arrendamientos de cocinas (235,5 M) en el puente; capex con altas de derechos de uso (4,5 % → 3,8 %, siempre ≥ amortización del 3,6 %).
- WACC 9,32 % (Bund 3,48 %, beta 1,0, prima 5 % + 1,5 por Turquía). Terminal 2,5 %. Pensiones: 26,2 M netos de impuestos = 19,7 M.
- Sostenibilidad: el motor dice «Sí»; nosotros «En parte» (concentración y lira). Prueba de cuota manual: catering aéreo FY2032e ≈ 3.094 M / mercado ≈ 28.700 M = 10,8 % frente al 10 % de hoy; pasa. `mercado_final` en null porque el motor compararía con las ventas del grupo.
- Calidad: veredicto **Sí** (ROIC 25,1 % − WACC 9,32 % = +15,8 puntos, sin fondo de comercio, Piotroski 9, Altman 4,91). Foso estrecho.
- Riesgo de IA: exposición Baja, Mixto, ±2 %.
- Recomendación: Comprar, convicción Baja (sugerida por el motor: reglas absoluta Mantener y relativa Comprar; ponderada a 1,8 puntos del umbral). Robustez: SÓLIDA, acción robusta Comprar; colchón de BPA del 2 %.
- Tamaño: una acción cuesta 195 EUR, menos del 7 % de una cartera de 30.000 EUR (2.100 EUR): unas 10 acciones caben en una posición del 7 %.
- Próximos resultados: primer semestre FY2026/27, 12-nov-2026.

## Lecciones
- Empresas con sociedad conjunta al 50 % que consolidan (DO & CO con Turkish Airlines): los minoritarios en libros infravaloran mucho la parte del socio cuando la filial gana casi la mitad del beneficio; valorarlos por múltiplo de su beneficio mueve el valor más de un 10 %.
- Con hiperinflación (NIIF 29), la ganancia de EBITDA y la pérdida financiera van juntas: el BPA publicado es el prudente; no quitar solo una de las dos.
- La prueba de cuota del motor compara con las ventas del grupo: si el `mercado_final` solo cubre una división, dejarlo en null y hacer la prueba a mano en la justificación.
- Los resúmenes de búsqueda inventan guías de empresas sin guía publicada: comprobar siempre en la nota de resultados.

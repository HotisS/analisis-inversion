# Diario — Fluidra (FDR.MC), corte 2026-10-08

- Commit de partida: eaa7192 (Informe de Cochlear (Vender, convicción baja)).
- 23:07 inicio. Fase 1: identificación.
  - Fluidra, S.A.; ISIN ES0137650018; Bolsa de Madrid (Mercado Continuo, IBEX 35); EUR; ejercicio a 31-dic; NIIF-UE.
  - Precio: bolsa.mjs con --incluir-hoy 1 da 17,00 EUR el 2026-10-08; Yahoo regularMarketTime 15:35:27 UTC (subasta de cierre de Madrid): es el cierre del 8, no la sesión anterior (7-oct: 17,15).
  - fluidra.com tiene antibot Incapsula en las páginas HTML; los PDF de /wp-content/uploads/ bajan bien con descargar.mjs.
  - Próximos resultados (9M 2026): 2026-10-29 (MarketScreener, calendario). 1S26 publicado el 30-jul-26: ventas 1.258 M, EBITDA ajustado 321 M, guía mantenida.
- 23:12 lanzados los cuatro subagentes (A cuentas, B sector, C gobierno, D mercado) en segundo plano.
- ~23:20 un límite de uso cortó la sesión principal y las de los cuatro subagentes. Notas guardadas: A 10 KB (financieros, balance, flujos), B 30 KB (casi completa), C 8 KB (gobierno parcial), D 17 KB (identificación, consenso, puente).
- 09:27 (9-oct) reanudación: SendMessage a los cuatro con su nota como punto de partida. Corte y precio sin cambios (8-oct, 17,00).
- 09:40 los cuatro subagentes terminan (C 09:35, B 09:36, D 09:38, A 09:40). Integración.
- 09:40-09:55 integración, supuestos (DCF sobre EBITDA reportado; reestructuración recurrente descontada en el margen), escenarios, textos, resumen, Word (53 páginas, 28 gráficos, cobertura 90,1 %) y PDF. Revisadas como imagen las páginas 1-4.

## Resultado
- Comprar, convicción media. Valor objetivo 22,22 EUR (+30,7 %; rentabilidad total 34,5 %); con la prima implícita del mercado (4,20 %), 26,89 EUR (+58,2 %). Las dos reglas, Comprar.
- DCF 23,80 (WACC 8,17 %, g 2,25 %, VT 67 %). DCF inverso: −2,0 % de ventas anual 2027-2033 o margen del 19,6 %; rentabilidad implícita 9,9 % frente a 8,2 % y 7,1 %.
- Beta 1,10 (STOXX Europe 600, mensual 5a); IBEX 0,87; sectorial Pool/Hayward reapalancada 1,17.
- Consenso: EBITDA ajustado (501 de 2025 = publicado); base_ebitda "ajustado", ajuste 2,2 % de ventas. Proyección propia a menos del 1 % del consenso en EBITDA 2026-2028.
- No recurrentes: no se usa no_recurrentes_en_ebitda (reestructuración todos los años: 56 M 2024, 29 M 2025, 50-55 M 2026).
- Controles: 14 de 15 correctos y 1 explicado (regresión múltiplo-crecimiento, R² 0,14).

## Fallos del sistema
1. **Límite de uso a las 23:20 que cortó a la vez la sesión principal y los cuatro subagentes.** Las notas guardadas por partes salvaron el trabajo (A 10 KB, B 30 KB, C 8 KB, D 17 KB) y SendMessage los reanudó con contexto. Arreglo propuesto: mantener la regla de guardar en los primeros 5 minutos; añadir al procedimiento el paso «reanudar con SendMessage a cada ID» como primera opción tras un corte.
2. **Búsqueda web y WebFetch sin servicio para los subagentes tras la reanudación** (límite de uso compartido): C se quedó sin historial de guía 2020-2024 ni votos de la junta de 2026; D sin transacciones de piscina con múltiplo. Arreglo: lista de URL conocidas de Fluidra (wp-content/uploads) en lecciones, y que el principal reserve 2-3 búsquedas para las URL de documentos antes de lanzar.
3. **fluidra.com con antibot Incapsula en todo el HTML** (también en el navegador integrado, que no renderiza); los PDF de /wp-content/uploads/AAAA/MM/ bajan bien con descargar.mjs, pero solo si se conoce la URL. Business Wire da 403 a curl y WebFetch. Arreglo: anotar en lecciones el patrón de URL y que la CNMV (IPP) es la vía para los informes semestrales.
4. **Informes anuales 2018-2023 no descargados**: la serie queda en cinco ejercicios (2021-2023 del proveedor, sin EBITDA ajustado). Arreglo: añadir a descargar.mjs un modo «IPP de la CNMV» por NIF y periodo.
5. **Trimestres incompletos**: Fluidra no aparece con 3T/4T separados en lo obtenido; se mezclan trimestres (1T, 2T) y el 2S25. Arreglo: aceptar en el esquema una marca de tipo de periodo para que el gráfico no compare trimestres con semestres.
6. **Recompra cerrada sin número de acciones** (CNMV 403, noticia de pago): acciones estimadas con el precio medio ponderado. Arreglo: el comunicado semanal de la recompra está en OIR; probar descargar.mjs con la URL directa del PDF de la CNMV.
7. **Cifras de las notas que no casaban con el motor**: D escribió 7,6x de EV/EBITDA NTM y 8,7x LTM con su propio cálculo; el motor da 8,4x y 9,4x. Se reescribieron los comentarios de comparables y múltiplos históricos. D también daba el margen ajustado de 2025 como «máximo histórico» (falso: 2021 fue mayor). Arreglo: que los subagentes no calculen múltiplos de la propia empresa en textos; que dejen el cálculo al motor.
8. **Síntesis con DN/EBITDA 2,4x y portada 2,6x (ajustada)**: corregido. El control de coherencia síntesis-portada sigue siendo manual. Arreglo: que integrar avise si la síntesis cita un DN/EBITDA distinto del de la portada.

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Fluidra - 2026-10-08 v2.docx` y su PDF. Mismo precio (17,00 EUR) y fecha de corte (8-oct-2026). No se cambia ningún supuesto del DCF.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Comprar · Media | Comprar · Media (los criterios sugieren Alta; explicado en la síntesis) |
| DCF (WACC 8,17 %) | 23,80 EUR | 23,80 EUR |
| Valor objetivo | 22,22 EUR, RTE 34,5 %, asimetría 4,42x | 22,22 EUR, RTE 34,5 %, asimetría 4,42x |
| Objetivo con la prima del mercado (WACC 7,13 %) | 26,89 EUR, RTE 62,0 % | 26,89 EUR, RTE 62,0 % |
| Niveles | Comprar < 23,89; Vender > 30,42 | Comprar < 21,78; Vender > 30,42 |
| Sostenibilidad del crecimiento | — | **Sí** (4,1 % anual proyectado; cuota del 13,0 % al 11,7 % en 2033e; sin inversión neta) |

- **Veredicto Sí**: la proyección crece por debajo del mercado (4-6 % según Fluidra, 4,6-4,7 % según dos estudios) y del objetivo de la empresa (6-8 %), con la cuota a la baja. Puente 2026e-2030e: volumen 2,5-3 % y precio 2-3 % (2026e con −2 puntos de divisa), calibrado con el 1S26 (volumen +2 %, precio +3 %) y el 2T26 (precio +2 %, volumen +3 %); el precio cae al 2 % por la fatiga de precios que cita la dirección.
- **Mercado final**: 25.700 M EUR en 2033e = 17.400 M de 2025 (mismo perímetro que la cuota) al 5 % anual, punto medio de la previsión de Fluidra. Con el 4,7 % de los estudios, 25.100 M y cuota del 12,0 %: igual conclusión.
- **Reinversión**: el motor da −3 M acumulados (tasa del 0 %) y trata a Fluidra como de activos ligeros, porque la amortización incluye la de la asignación del precio de Zodiac (57 M en 2025), que no hay que reponer. Dicho en la justificación; la prueba útil es la cuota y el precio.
- **Nivel de compra 23,89 → 21,78 EUR**: no lo mueve la sostenibilidad sino el motor actual (regla combinada: un Comprar solo relativo exige ≥ 5 % con nuestro coste de capital). Actualizado en la síntesis y en `cambiaria_recomendacion`.
- **Convicción**: el control nuevo sugiere Alta; se queda en Media porque las cifras son las del consenso y el precio puede seguir descontando el valle mientras la obra nueva no repunte. Dicho en la síntesis.
- Controles: 18 de 19 correctos y 1 explicado (regresión, como en v1). Aviso de `rellenar`: solo la tabla vacía de suma de partes.

**Fallos del sistema vistos**
1. La prueba de reinversión no separa la amortización de intangibles de compras (PPA): en un industrial con 2.759 M de capital invertido sale «activos ligeros» y el texto del motor habla de «negocio de activos ligeros» o «comprador en serie», que no es el caso. Arreglo: un campo `amortizacion_ppa_pct_ventas` (o similar) que la prueba reste de la amortización.
2. El ROIC incremental histórico sale nulo (ventas y capital de 2025 por debajo de 2021): la prueba no tiene referencia histórica con la que comparar.
3. Los niveles de compra y venta cambian al recalcular con el motor nuevo aunque no cambie ninguna cifra: cualquier actualización debe releer `calc.recomendacion.niveles` y buscar el nivel antiguo en todos los textos.
4. `soffice` falla en silencio (código 1, sin mensaje ni PDF) si otra instancia usa el perfil por defecto (varias actualizaciones en paralelo); funciona con `-env:UserInstallation=file://<carpeta propia>`.
5. `competencia.cuota_pct` es 13 (redondeado) y el sector da 12,6 %: la tabla de la prueba compara 11,7 % con 13,0 %.

# Diario — Tomra Systems (corte 2026-10-08)

- Commit de partida: `0dfbed7 Informe de DSV (Comprar, convicción media)`.
- Inicio: 09:20 (hora local; el reloj del sistema marcaba 09:27 al leer el procedimiento). Fecha de corte 2026-10-08; la sesión de Oslo del día 8 está abierta: se usa el cierre del 7.

## Fase 1 — Identificación (09:20-09:29)
- TOMRA Systems ASA, Oslo Børs (TOM), cuentas en **EUR** (moneda de presentación) bajo NIIF-UE; cotiza en NOK. Ejercicio a diciembre.
- Segmentos vigentes: Collection, Recycling, Food, Horizon y funciones de grupo.
- Último informe: 2T26 (17-jul-2026). Acciones emitidas 296.040.156, autocartera 339.778 → 295,70 M en circulación a 30-jun-26.
- Calendario (web de inversores): 3T26 el **23-oct-2026**; Capital Markets Day el **24-nov-2026**; 4T26 el 12-feb-2027.
- Guía 2S26: Collection 400-440 M ingresos; Food 340-360 M en 2026; capex 90-100 M; Horizon 45-50 M.
- DN/EBITDA 2,5x tras Clynk y la compra de minoritarios de Tomra Collection Australia.

## Fases 2-4 — subagentes (lanzados 09:30)
- A cuentas, B sector, C gobierno, D mercado. Cada uno con la regla de carpetas y su carpeta temporal `%TEMP%\analisis-inversion\tomra-<letra>`.
- Mientras: descargada la hoja de Damodaran (última fila, oct-2026: ERP con payout sostenible 4,20 %; la de 3,70 % es la T12m sin ajustar).
- 09:40 (control de los 10 minutos): A 6,8 KB, C 1,3 KB, D 18 KB y cinco `bolsa-*.json`; **B vacío** (155 bytes): recordatorio con SendMessage. B guardó a las 09:41.
- A terminó hacia las 09:49 (74 llamadas): cuentas 2022-2025 en EUR (2022 convertido de NOK), 7 trimestres, Collection por tipo de ingreso (venta 287,3 / servicio 165,5 / arrendamiento y throughput 164,9 / material 122,8 M en 2025), EBITA por división 2023-2025, pedidos y cartera. Reanudado con SendMessage para completar 2021 desde el informe anual 2022 (NOK) y verificar el rating: **Scope bajó a BBB+ el 3-jun-2026** (D traía el A- de 2025, ya no vigente). Cerró a las ~09:58.
- C terminó hacia las 09:50 (62 llamadas): Latour 21,08 % y presidente del consejo (su CEO); 36-42 % en contra de la remuneración en 2024-2026 (≈53 % del capital libre); posición corta 3,59 %; CEO desde ago-2021 (no 2020); **no hay cambio de responsable en Food**: la novedad es que se estudia vender TOMRA Mining (Recycling) y que Recycling tuvo tres jefes en 2025.
- D terminó hacia las 09:58 (92 llamadas): cierre oficial del 7-oct 92,95 NOK = 8,677 EUR (BCE 10,7120); betas frente a 5 referencias; Bund 3,55 %; consenso MarketScreener (6 analistas) contrastado con el de la propia Tomra (9 casas); 8 comparables; solo 2 transacciones con EV/EBITDA.
- B terminó a las ~10:02 (90 llamadas, el más lento): tabla de 24 mercados de depósito, curva tras el pico (nuevos mercados 20 % → 13 % de Collection y Collection −4 % en 2025), Envipco, Bühler, JBT Marel, Steinert; cuota mundial sin fuente primaria.

## Integración, cálculo y redacción (10:00-10:13)
- Modelo propio por división en `supuestos.mjs` (Collection, Recycling, Food, Horizon, funciones de grupo, con EBITA y depreciación dentro del EBITDA). 2026e fijado por la guía: 1.477 M (+12,1 %), EBITDA 259 M (17,6 %). 2027e +11,3 % con el Reino Unido; 2029e +4,6 % (hueco tras el pico); 2030e +6,2 % (PPWR). EBITA del grupo hasta 16,5 % (ambición de la dirección: 18 %). Frente al consenso: EBITDA −2,3 / −11,2 / −5,7 % en 2026-2028.
- WACC 8,26 %: Bund 3,55 %, **beta 1,10** (punto medio entre la ajustada local, 0,96 frente al OSEBX, y la europea sectorial en EUR, 1,20; la del STOXX 600 amplio en EUR, 1,42, está inflada por la corona), prima 5,5 %, deuda 4,5 % (BBB+), 21,7 %. Terminal 2,5 %. **Sin etapa 2**: ROIC 9,8 % frente a WACC 8,26 % (1,5 puntos, no 5) y ROIC incremental −1,1 %; el pico es temporal (2024 → 2025).
- Suma de partes por EBITA 2027e: Collection 14x, Recycling 13x, Food 11x, Horizon a una vez ventas, funciones de grupo 12x → 8,86 EUR.
- Resultado: DCF 8,70 (+0,3 %); escenarios 5,74 / 8,70 / 11,27 (25/50/25); comparables 13,72; suma de partes 8,86; **objetivo 9,45 EUR (101,23 NOK), +8,9 %, RT 11,2 %, asimetría 0,88** → regla absoluta Mantener; relativa (prima 4,20 %) Comprar con 11,42 EUR y RT 33,9 %. Manda la relativa: **Comprar, convicción baja** (el precio descuenta nuestro caso base; la diferencia es de tasa; gobierno débil y cortos al 3,59 %).
- DCF inverso: crecimiento 5,3 % (base 5,4 %), margen 22,9 % (base 23,0 %), rentabilidad implícita 8,3 %.
- Controles: 13 correctos y 4 explicados, ninguno en «Revisar». 67 fuentes (42 primarias), 3 sin citar. Cobertura 93,3 %, 28 gráficos, 58 páginas, sin avisos. Síntesis de 644 palabras; cifras de la síntesis cotejadas con la portada (corregido 101,2 → 101,23 NOK).
- Correcciones tras la primera generación: los segmentos de A desaparecían porque `negocio.segmentos` de B (solo descripciones) los sustituía entero; se fusionan en `propio.mjs`. Funciones de grupo con ingresos a 0 (salía un margen del 2.816 %). Retirados de las notas los nombres de campo y las comillas invertidas que se imprimían en el anexo de huecos y en `financieros.ajustes`. Quitados los cambios de perímetro de c-trace y CLYNK (≤3 % del activo): anulaban Altman y Beneish de 2025.

## Revisión de comité (resumen)
1. Convergencia: no hay convergencia con nuestra tasa (el precio ya es nuestro DCF); la hay con la del mercado (11,53 EUR). Lo dice la síntesis y por eso la convicción es baja.
2. DCF inverso: ni exigente ni conservador; exactamente nuestro caso base, que ya está por debajo del consenso.
3. Supuesto más agresivo: EBITA de Collection del 19 % desde 2028 con mercados nuevos de menor margen (17,0 % en 2025).
4. Consenso: −11,2 % de EBITDA en 2027 (Reino Unido), explicado en crecimiento y márgenes.
5. Comparables frágiles (compounders frente a fabricantes): 15 % de peso.
8. Bajista verosímil: combina tres cosas que ya pasaron por separado (−33,8 %).
9. Dato crítico: la beta (1,10 frente a 1,20: el DCF baja a 7,76) y el tamaño del Reino Unido.

## Fallos del sistema
1. **`integrar.mjs` sustituye listas enteras**: B escribió `negocio.segmentos` solo con descripciones y borró la historia de A sin aviso; el informe salió sin gráficos de segmentos. Arreglo: fusionar las listas de segmentos por `nombre` (campo a campo) o avisar cuando una nota sustituye una lista con números por otra sin ellos.
2. **Los nombres de campo y las notas de trabajo de los subagentes se imprimen en el anexo de huecos** («extra.drs», «cuota_pct», «no al alcance de este subagente», «pedido en el encargo»). Arreglo: que `integrar.mjs` avise de cadenas con guion bajo, comillas invertidas, «subagente», «encargo» o «extra.» fuera de `notas_integrador`; y decirlo en `prompt-de.mjs`.
3. **Cambios de perímetro pequeños anulan Altman y Beneish**: A declaró c-trace y CLYNK (≤3 % del activo) y el motor marcó 2025 como no interpretable. Arreglo: umbral de materialidad (p. ej. >10 % del activo o de las ventas) en el prompt o en el motor.
4. **Segmento de funciones de grupo con ingresos negativos casi nulos**: el motor imprime un margen del 2.816 %. Arreglo: no calcular margen cuando los ingresos del segmento son menores que el 1 % de los del grupo.
5. **B tardó 32 minutos y no guardó hasta el recordatorio de los 10 minutos.** Arreglo: en el encargo, «primer guardado antes de la llamada 10» (como en DSV) y no «a los 10 minutos».
6. **Rating contradictorio entre subagentes** (A: BBB+ de jun-2026; D: A- de 2025). Arreglo: en `lecciones.md`, «Noruega: Scope califica a emisores nórdicos; el último comunicado manda; buscar en NewsWeb/Cision»; y que el integrador cruce los campos que dan dos notas.
7. **Parchear `propio.mjs` desde un heredoc perdió las barras de una expresión regular** y la integración falló una vez (y las citas de B se tradujeron mal hasta corregirlo). Ya estaba en lecciones («scripts con Write, no con heredocs»); arreglo: que `integrar.mjs` valide que las citas de cada texto llevan letra de nota cuando vienen de `propio`.
8. **La herramienta de cierre de Yahoo no trae el 7-oct en Oslo**: D tuvo que ir a Euronext para el cierre oficial. Arreglo: `bolsa.mjs` podría aceptar `--precio` manual y citarlo aparte.
- Fin: 10:15. Tiempo total ≈ 55 min (09:20-10:15).

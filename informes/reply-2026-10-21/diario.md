# Diario: Reply (REY.MI), análisis value del 21-oct-2026

- Commit de partida: `d5d7f370050e30bca64adb089ce1e27bb1b83e54` («United Therapeutics: precios, cobertura y seguimiento tras rebase», 10:43 UTC). Checkout compartido con otro análisis en paralelo (Salik): sin pull, commit, push, checkout ni stash desde este hilo.
- Inicio: ≈ 10:45 UTC. Fin: ≈ 11:25 UTC (reloj del sistema).
- Análisis nuevo y completo desde cero. El intento del 19-oct, parado a medias, no se usa. Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, en la forma de `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Cuentas oficiales primero**: `cuentas.mjs --esef "Reply"` (filings.xbrl.org, LEI 815600DAEFB0388F3521, 2020-2025) funcionó. Lo cuadré con los informes anuales de 2025 y 2023 (ESEF, en italiano), los de 2024, 2021 y 2019 (en inglés) y el semestral de 2026. El XBRL no trae deuda bancaria, capex, BPA ni el beneficio de 2024-2025: los saqué de los informes. El DPA de 2023 del XBRL salía mal (37.278.000): se corrigió a 1,00.
2. **Formato por naturaleza** (`coste_ventas` = «Acquisti»). El EBITDA es el de la empresa. El **ajuste de valor razonable de los earn-out**, que Reply pone entre el EBITDA y el EBIT, va al resultado financiero: no es explotación. Así, el EBIT y el resultado financiero difieren del XBRL y el BAI es el mismo.
3. **No recurrentes dentro del EBITDA**: +25,2 M en 2024 (provisión de responsabilidad profesional y secuestro) y −29,0 M en 2025 (liberación de esa provisión y del fondo del secuestro). El EBITDA subyacente creció un 0,6 % en 2025 y su margen bajó del 19,0 % al 17,9 %. Esto es lo que más pesa en la lectura de la IA.
4. **Ingresos = cuenta NIIF**, sin las subvenciones públicas que la empresa suma desde el 3T25 a sus «ingresos de gestión» (33,6 M en 2025). En los segmentos, una fila «Eliminaciones y subvenciones» cuadra con los ingresos NIIF.
5. **Caja neta y puente a 30-jun-2026**:
   - Deuda bancaria 39,8; arrendamientos 139,9; caja más activos financieros corrientes 581,9; minoritarios 2,1; asociadas 11,0.
   - Pensiones: TFR de 83,0 M × (1 − 24 %) = 63,1.
   - `otros_ajustes` = 84,2: los earn-out y las opciones de venta de minoritarios (63,2) más la recompra pagada entre el 30-jun y el 30-jul (≈ 21 M; las acciones de hoy ya la descuentan).
   - FedTec (julio) no tiene precio publicado y queda fuera.
6. **Familia Rizzante**: Alika tiene el 37,08 % del capital y ≈ 63-64 % de los votos con el voto aumentado. Por eso `accionista_control` = true, `una_accion_un_voto` = false y `presidente_vinculado_control` = true. En la junta de 2026 la política de remuneración tuvo un 22,9 % en contra del total. Sobre el capital libre presente eso es ≈ 91 % en contra (12,7 de ≈ 14,0 M de votos; Alika vota con ≈ 41,6 M). Ese dato se usa en `voto_remuneracion_contra_libre_pct`.
7. **Acciones**: 36,33 M a 30-jul-2026 (2,9 % en autocartera), sin más recompras. El programa termina el 23-oct y la nueva autorización (hasta oct-2027) no tiene anuncio de uso.
8. **BPA de la regla en base publicada** (no hay ajustado). 2026e = 7,50 (primer semestre real más proyección; el consenso dice 7,70), 2027e = 8,25 y 2028e = 8,85 / 7,40 / 9,40.
9. **PER actual = precio ÷ BPA de los próximos 12 meses** (2,3/12 × 2026e + 9,7/12 × 2027e = 8,11): 15,8x. La señal no depende de esta elección; lo que decide es el valor intrínseco.
10. **DCF**:
    - WACC del 8,64 %: Bund 3,44 %, beta 0,90, prima 5,5 % y prima adicional del 0,5 % por Italia y la volatilidad.
    - Margen plano del 18,3 %, porque las tarifas bajan y la productividad de la IA se devuelve al cliente.
    - El capex incluye los derechos de uso (NIIF 16) y ≈ 1 punto de compras pequeñas.
    - Crecimiento terminal del 2 %.
11. **Riesgo de IA como escenario**:
    - Bajista: −4 puntos de crecimiento y −1,5 de margen (DCF −26 %; BPA 2028e 7,40, por debajo de 2026e).
    - Alcista: +1,5 y +0,5.
    - `riesgos.ia`: exposición Alta y sentido Mixto, separando lo que suma (volumen, ofertas propias, precio fijo, contratistas) de lo que resta (tarifas, horas, T&M, margen subyacente a la baja, ingresos por empleado planos, coste de tokens).
12. **Sostenibilidad «Sí»**:
    - Puente: volumen del 5,5-7 %, precio de −1 a 0 % y compras de 0,5-2,3 puntos.
    - `mercado_final` = null. El único tamaño fiable es el de Italia (Anitec-Assinform), con otro perímetro que el del grupo. A mano, la cuota italiana pasaría de 6,4 % a ≈ 7,9 % en 2030 (×1,23).
    - Reinversión: el capital nuevo rinde un 25,8 % frente a un incremental del 21,1 %.
13. **Precio**: el informe usa el cierre del 20-oct (128,30 EUR). En la sesión del 21-oct cotizaba a 129,20 a las 10:34 UTC (Yahoo) y a 129,70 a las 11:16 UTC (`precios.mjs`), que es el precio con que decide `robustez.mjs --actual`.
14. **Regla 13: veredicto «no cambia»**.
    - El aviso P2 (máximo de 52 semanas tras +29 % en tres meses) se explica por la recompra, dos trimestres buenos y las subidas de objetivo.
    - Ni la caída del 12-mar (−14,8 %, día de resultados; la causa es lectura propia) ni la de junio (−15,6 %, sin causa encontrada) apuntan a algo que la tesis no recoja.
    - El fin de la recompra el 23-oct retira a un comprador, pero no hay colocación ni hecho con fecha.
15. **Sentimiento** = null con su hueco: Stocktwits (404 y vacío), Reddit (403), Seeking Alpha (solo titulares) y FinanzaOnline (sin hilos).
16. **Comparables** (Yahoo, 21-oct): 10 empresas, con mediana del PER NTM de 10,7x. Sin EV/EBITDA NTM porque no hay consenso de EBITDA, así que no se dibujan tres gráficos (EV/EBITDA NTM, mapa de comparables y transacciones).

## Resultado

- **Regla a 12 meses** (v3, sin marcas del selector), con dividendo y al cierre:
  - Ponderada +21,1 % y base +21,1 %.
  - Con la sesión (129,70): 19,8 % y 19,8 %.
  - **Señal: Mantener**, porque el valor intrínseco (124,09 EUR) queda un 3,3 % bajo el precio.
  - v2 de control: +12,5 % / +10,1 %, Mantener.
- **Valor**: intrínseco 124,09 EUR; DCF 130,97 (WACC 8,64 %); con la prima del mercado, 147,03. El DCF inverso descuenta un crecimiento del 4,8 % frente al 5,6 % de nuestro base.
- **Robustez** (`--actual`, 129,70 EUR):
  - Veredicto SÓLIDA. Acción robusta «Mantener en cartera». Nivel de compra hoy: ninguno.
  - Límite A (robusto) 121,74 EUR; B1 124,09.
  - BPA −10 %: 7,9 % / 7,9 %. Colchón de BPA para mantener: 9 %.
- **Calidad**: ROIC 22,8 % − WACC 8,64 % = +14,2 puntos y sostenibilidad «Sí». Pasa.
- **Controles**: 20 de 20 correctos.
- **Cobertura del Word**: 83,9 %; sin sentimiento.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2020-2025 | `herramientas/cuentas.mjs --esef "Reply"` (filings.xbrl.org) | Informe anual 2025 (ESEF), aprobado el 12-mar-2026 (cierre 31-dic-2025) |
| Documentos primarios | Informes anuales 2025/2023 (ESEF), 2024, 2021 y 2019; semestral 2026; trimestrales 3T25 y 1T26; transcripciones 4T25, 1T26 y 2T26; informes de gobierno y remuneración de 2025; votos de la junta de 2026; nota del 12-mar-2026; recompra del 9-abr-2026 | 2019 a 30-jul-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs --accion REY.MI --indice FTSEMIB.MI --sector EXV3.DE` (Yahoo) | Cierre del 20-oct-2026 (128,30) |
| Consenso y comparables | `notas/yahoo-datos.mjs` y quoteSummary (Yahoo) | 21-oct-2026, 10:34 UTC (sesión abierta, 129,20) |
| Analistas y prensa | Teleborsa, Milano Finanza, Websim, Simply Wall St, Money.it, Forbes Italia, Corriere Comunicazioni | 17-nov-2025 a 29-sep-2026 |
| Sector | Anitec-Assinform (vía Affaritaliani); Gartner (vía Campus Technology) | 1-jul-2026; 20-may-2026 |
| Tasa libre | Bundesbank (Bund a 10 años) y curva AAA del BCE | 21-oct-2026 (3,44 %) |
| Prima de mercado | Damodaran, ERPbymonth | Oct-2026 (4,20 %) |
| Tipo de cambio | BCE | 20-oct-2026 (1,1215 USD por EUR) |
| Sentimiento | Stocktwits, Reddit, Seeking Alpha, FinanzaOnline | 21-oct-2026 (sin datos) |
| Movimiento (regla 13) | `herramientas/movimiento.mjs REY.MI` | 21-oct-2026 (129,20 EUR) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 21-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice --headless --convert-to pdf` | 21-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs reply-2026-10-21` | Precio 128,30 (20-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada REY añadida) | 21-oct-2026 |
| Precios | `herramientas/precios.mjs REY` | Cierre del 20-oct-2026; sesión del 21-oct a 129,70 (11:16 UTC) |
| Robustez | `herramientas/robustez.mjs informes/reply-2026-10-21 --actual` | Sesión del 21-oct-2026 (129,70) |

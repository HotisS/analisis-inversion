# Diario — Pro Medicus (PME.AX), corte 2026-10-12

- Commit de partida: 28a1d55 (Informe de Amazon). Prompt: verticales/empresa/prompt.md de ese commit.
- 11:53 (Madrid; 20:53 en Melbourne, sesión de la ASX cerrada) Inicio. Fase 1: identificación.
  - Pro Medicus Limited, ASX PME, ISIN AU000000PME8, AUD, AASB (NIIF), cierre 30-jun, etiqueta «fin» (FY26 = jul-25 a jun-26). Semestres.
  - Anuncios ASX 2021-2026 resueltos a PDF con un script en el scratchpad (listado anual + displayAnnouncement): 346 en `notas/anuncios_asx.tsv`.
  - `bolsa.mjs` (PME.AX, ^AXJO, ^AXHJ, cierre-mes 6): cierre del 12-oct-2026, 168,37 AUD (máx. 52s 300 el 13-oct-25, mín. 107,75 el 24-feb-26; −23,9 % el día de los resultados HY26).
  - Hechos clave: FY26 ingresos 261,7 M (+22,9 %; +28,4 % cc), EBIT subyacente 196,1 M (74,9 %), BN estatutario 265,3 M con 174,2 M de valor razonable (4DX, Echo IQ), subyacente 144,7 M; caja 252,3 M sin deuda; DPA 69 c; contratado mínimo a 5 años 1.300 M; cuota EE. UU. ~11 %. Junta 25-nov-26; HY27 ~mediados de feb-27.
- 12:02 Lanzo los cinco subagentes A-E en primer plano con `notas/ENCARGO_COMUN.md`.
- 12:02-12:16 Los cinco subagentes terminaron en primer plano (E 3 min, C 9, A 10, D 12, B 14), con `_estado` y notas válidas. E solo pudo abrir Motley Fool Australia (HotCopper, Strawman, Market Index, Livewire, Reddit: 403 o JavaScript).
- Decisiones de integración:
  - Valor razonable de 4D Medical y Echo IQ (174,2 M) y diferencias de cambio: entre los gastos operativos en la cuenta; A los sacó con `no_recurrentes_en_ebitda` (EBIT = subyacente de la empresa, 196,1 M). LTM con beneficio neto subyacente (144,7 M; BPA 1,383) por parche, para que el PER LTM no cuente las plusvalías.
  - Puente de D: caja 252,3; 4D Medical a la cotización del corte (169,6 M) + Elucid 7,3 en `asociadas`; `otros_ajustes` 86,5 = dividendo final pagado el 29-sep (38,65) + impuesto latente estimado de la plusvalía (47,9).
  - Beta 1,25 (semanal 2 años 1,19; Damodaran software corregida por caja 1,25) en vez de la mensual ajustada 1,39 (recoge la burbuja y caída 2025-26). Tasa libre 5,40 % (RBA F2, 7-oct). WACC 12,28 %; relativo 10,65 %.
  - Capex del DCF con el aumento de comisiones activadas (lección de ATOSS). Etapa 2 de 5 años (aporta 4,9 %).
  - Sostenibilidad: puente volumen × precio con el TAM que publica la empresa (690 M de estudios en EE. UU., +3 %) y un ingreso por estudio estimado por B (~3,1 AUD, plano desde FY2024). Mercado final FY2036e: 3.700 M AUD (estudios × tarifa con +2,5 % anual). Cuota implícita 31,1 % frente al 11 %: veredicto «En parte».
  - Transacciones: añadida Intelerad por GE HealthCare (8,5x ventas, de B); peso 0.
- Resultado: DCF 45,92; objetivo 50,61 (−69,9 %; total −69,5 %); relativo 58,79 (−64,7 %). Escenarios: alcista 69,54 (−58,7 %), bajista 27,75 (−83,5 %). DCF inverso: 33,0 % anual en diez años frente al 16,1 % base; rentabilidad implícita 5,7 % (bono 5,40 %). Las dos reglas, Vender; convicción sugerida Alta, la mantengo (la diferencia no es de tasa: aun con la prima del mercado se pierde un 65 %, y el crecimiento implícito daría unos ingresos superiores al mercado de EE. UU. a su tarifa). Consenso FY27-FY29 a −2,6/−3,5 % del nuestro.
- Word (58 páginas, cobertura 93,1 %) y PDF; revisadas como imagen las páginas 1-4. Síntesis de 638 palabras. Quedan 5 controles en «Revisar», todos explicados.

## Lecciones nuevas
- **Australia, anuncios de la ASX**: un script de 40 líneas (listado anual `announcements.do?...&year=` + `displayAnnouncement.do?display=pdf&idsId=`) resolvió 346 anuncios 2021-2026 a PDF directo en un minuto y lo usaron los cinco subagentes. B y A pidieron empezar en 2017 (historia y cuentas antiguas). Merece ser herramienta (`herramientas/asx.mjs --ticker PME --desde 2015`), y otra para extraer los Appendix 3Y (fecha, compra o venta, acciones, precio), como `form4.mjs`.
- **Plusvalías de valor razonable dentro de los gastos operativos** (Pro Medicus: 174,2 M de 4D Medical en FY26, el 66 % del beneficio): sacarlas con `no_recurrentes_en_ebitda` y usar el beneficio subyacente en el LTM; el BPA estatutario de MarketScreener las incluye (PER LTM de 65x en vez de 122x). El ROIC del motor mete la inversión en el capital invertido (110 % en vez de ~250 %): explicarlo.
- **Prueba de sostenibilidad con TAM en unidades**: cuando la empresa publica su cuota en volumen (estudios, transacciones), el mercado final se puede expresar a su propio precio unitario (volumen × tarifa) y así la cuota implícita del motor compara lo mismo. Con PME el crecimiento implícito en el precio daba unos ingresos superiores a todo el mercado de EE. UU.: el argumento más claro del informe.
- **Sentimiento en Australia**: HotCopper, Strawman, Market Index, Livewire y Simply Wall St dan 403 o necesitan JavaScript; solo abre Motley Fool Australia (`fool.com.au/tickers/asx-pme/page/N/`). E terminó en 3 minutos con confianza baja.
- **Beta de valores que pasaron por una burbuja**: la mensual de 5 años (1,58; 1,39 ajustada) recoge la subida y caída de 2025-26; contrastar con la semanal de 2 años y la sectorial de Damodaran corregida por caja.
- `bolsa.mjs` con rutas `/c/...` desde Git Bash no escribe la salida y no avisa (D). El xlsx F2 del RBA ocupa 8 MB y hubo que leerlo con un lector propio: una `herramientas/tasa.mjs --pais AU|US|EU` ahorraría tiempo en cada análisis.

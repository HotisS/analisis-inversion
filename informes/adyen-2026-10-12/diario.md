# Diario — Adyen N.V. (ADYEN), corte 2026-10-12

- Commit de partida: `5d3dc20 Informe de Pro Medicus (Vender, convicción alta) y rentabilidad a 6 meses de las dos carteras`. Prompt `verticales/empresa/prompt.md` de ese commit.
- Primer análisis de Adyen en `informes/` (no hay iteraciones anteriores).
- Inicio: 2026-10-12 17:24 (hora local). Euronext cierra a las 17:30: se usa el cierre del viernes 9-oct-2026 si `bolsa.mjs` no ve la sesión del 12.

## Fase 1 — Identificación
- Adyen N.V., Euronext Ámsterdam, ticker ADYEN, ISIN NL0012969182. Sede: Ámsterdam (Países Bajos). Divisa de cuentas y de cotización: EUR (tipo de cambio 1). Ejercicio a diciembre, NIIF-UE. Cuenta por naturaleza (ingresos netos, coste de ventas, salarios, otros gastos).
- Publica semestres (carta al accionista H1/H2 con estados financieros intermedios) y actualizaciones trimestrales de negocio (Q1 y Q3, sin cuenta completa).
- Próximos resultados: Business Update Q3 2026, 28-oct-2026 (web de inversores, «Upcoming Events»).
- Documentos de la web de inversores: enlaces en `notas/ir_enlaces.txt`, con la fecha de subida descodificada en `notas/ir_enlaces_fechados.txt` (las etiquetas de tipo son aproximadas). La carta H1 2026 es id136768 (13-ago-2026); informe anual 2025, id122309 (5-mar-2026).
- Criterio clave: fondos de comerciantes. La caja del balance incluye fondos de comerciantes (pasivo «payables to merchants and financial institutions») y depósitos. Regla del puente: solo caja propia. Hay que limpiar también la caja del balance histórico (lección de Pluxee).
- Puente de crecimiento natural: volumen procesado × take rate (ingresos netos / volumen procesado).

## Fases 2-4 bis
- Lanzados A-E en primer plano a la vez.
- A-E terminaron en 6-16 minutos (E 32 llamadas, el resto 74-83). Notas válidas y sin «Ã».
- Aviso de B y C: los `ar20XX.pdf` de id122309… son los informes Pillar 3, no los anuales (las etiquetas de mi lista estaban desplazadas). El anual 2025 es id122308 (C) o el ESEF id122310 (B, A).

## Integración y cálculo
- Criterio del flotante: caja propia 4.898,3 M (caja bruta 12.392,8 − pasivos con comerciantes 8.097,4 + cobros 602,8), la misma que publica Adyen; puente con caja 4.908,6 (más 10,4 a coste amortizado), arrendamientos 409,4, inversiones 16,7, otros ajustes −805,7 = Orb +294,3 y valor del flotante −1.100 (estimación propia: 60 % de los ingresos financieros anualizados del 1S26 tras impuestos, ≈ 131 M, capitalizados al Ke 11,8 % sin crecimiento; ≈ 35 EUR/acción). Balance histórico ya limpio por A (caja propia).
- Beta 1,50 (semanal 2 años 1,74 ajustada); la mensual de 5 años (1,89 ajustada, 2,33 bruta) recoge la burbuja. WACC 11,65 %; relativo 9,73 %.
- Primer cálculo (sin flotante): DCF 905,16, objetivo 861,60. Con flotante: DCF 939,87 (+6,1 %), VT 52 %, objetivo 908,88 (+2,6 %), escenarios 659,05 / 939,87 / 1.136,19 (−25,6 % / +28,2 %), asimetría 1,10x. Relativa 1.110,27 (+25,3 %). Regla: absoluta Mantener, relativa Comprar → Mantener (Comprar solo relativo exige ≥ 5 % absoluto). Convicción sugerida Baja, se mantiene.
- DCF inverso: 11,7 % de crecimiento 2027e-2035e frente a 12,9 % base; rentabilidad implícita 12,3 %. Proyección −0,3/−1,5/−2,5 % frente al consenso en ingresos 2026e-2028e.
- Sostenibilidad: puente volumen × take rate; mercado final en unidades de Adyen (volumen de las redes 2030e 34,4 billones EUR × 16,6 pb = 57.054 M); cuota 5,6 → 9,6 %. Veredicto «En parte».
- Controles: 17/19 correctos y 2 explicados (salto de activo 2020 por fondos de comerciantes; EV/EBITDA frente a PER de los comparables).
- Word: 65 páginas, 27 gráficos, cobertura 90,6 %. PDF sin reparar. Revisadas portada, síntesis y «La decisión».

## Lecciones nuevas
- **Procesadores de pagos con fondos de comerciantes (Adyen)**: la caja propia que publica la empresa (caja − pasivos con comerciantes + cobros pendientes) cuadra; el DCF sobre el EBITDA no recoge los intereses del flotante (≈ 60 % de los ingresos financieros): valóralo aparte en `otros_ajustes` (negativo) o se pierden ~4 % del valor. El PER de los consensos sí lo incluye.
- **Prueba de cuota con volumen procesado**: si `competencia.cuota_pct` es en volumen, `mercado_final.tamano` debe ir al precio unitario de la empresa (volumen × take rate), como en Pro Medicus; en millones de volumen la cuota sale 0.
- **Lista de la web de inversores de Adyen**: el orden de los enlaces de `--lista` no coincide con las filas de la tabla; descodificar el id/fecha del enlace ayuda, pero hay que abrir cada PDF (el id122309 era el Pillar 3).
- **Parches sobre `meta.huecos[i]`** no se aplican (los huecos de las notas se juntan después); usa `huecos_resueltos` y vuelve a registrar el hueco en `propio`.
- **Beta de una ex-burbuja**: Adyen da 2,33 mensual a 5 años frente al Stoxx 600; con ella el WACC pasa del 13 %. La decisión depende de la beta (con una más baja la regla absoluta se acercaría a Comprar): dilo en la síntesis.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 1.337,2 EUR, rentabilidad +50,9 %, señal Comprar (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +50,9 % → +23,0 %, base +19,6 %, señal Comprar (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 57.5x, mínimo 39.4x, media larga 77x; antes v2 52.1x/40.9x/47.2x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Adyen - 2026-10-12 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Comprar 35,7 % (antes v3 Comprar 60,4 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 17,0x / 20,0x / 26,0x, 23,0 % Comprar; con el tope anterior del base (×1,3, 14-oct mediodía): 60,4 % Comprar. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

- 2026-10-14: datos-v3.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 54.4x, mínimo 37.9x, media larga 76.4x; antes v2 57.5x/39.4x/77x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v3.json y «Adyen - 2026-10-12 v3.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Comprar 35,7 % (antes v3 Comprar 35,7 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 17,0x / 20,0x / 26,0x, 23,0 % Comprar; con el tope anterior del base (×1,3, 14-oct mediodía): 60,4 % Comprar. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

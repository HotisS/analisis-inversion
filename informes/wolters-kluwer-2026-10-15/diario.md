# Diario · Wolters Kluwer (WKL.AS) · corte 15-oct-2026

- Commit de partida: 740bc0a (9ª hora: cuentas.mjs con ejercicios no naturales…); al cerrar, la copia de trabajo está en fab4d69 (commits del coordinador). Sin git pull/commit (encargo).
- Entorno: nube, sin subagentes. Iteración completa pedida por el usuario sobre `informes/wolters-kluwer-2026-10-08/` (notas A-D copiadas; E nueva). Inicio 11:15 UTC, fin ≈12:25 UTC.
- Fase 1: Wolters Kluwer N.V., WKL (Euronext Ámsterdam), ISIN NL0000395903, EUR, cierre en diciembre, NIIF-UE. Próximos resultados: actualización de nueve meses, **4-nov-2026** (calendario del inversor; 20 días).
- Precio: `bolsa.mjs --corte 2026-10-15` → 78,06 EUR del 14-oct (la sesión del 15 no había cerrado a las 11:17 UTC). Bund 3,51 % del 14-oct (Bundesbank). ECB 14-oct.
- `cuentas.mjs --esef "Wolters Kluwer"`: 2020-2025 cuadran con A (ingresos, EBIT, beneficio). Aviso de deuda solo a largo: A ya trae la deuda total (2025: 4.667 frente a 4.193 del XBRL). DPA del XBRL = pagado; A usa el devengado. Sin cuentas nuevas desde el 1S26.
- Novedades desde el 8-oct: ninguna noticia propia; +8,7 % en bloque con el sector (RELX, Experian, TR), con el miedo a la IA enfriándose en el software; salida del EURO STOXX 50 el 21-sep (ya pasada); consenso estable (BPA 2028e 6,34; objetivo 89,91, mínimo 56); recompra lenta (236 M pendientes).
- Divisiones (1S26): Health 5 % (Clinical Solutions 5 % frente al 7 % de 2025), T&A 6 % (Norteamérica 5 %, nube +18 %; Europa 8 %), FCC 4 %, L&R 5 %, CP&ESG 7 % (CCH Tagetik 12 %). Recurrentes +7 %, suscripciones digitales +7 %, nube +14 %. Guía de 2026 reiterada.
- Decisiones de supuestos: 2027e-2028e del 4,5 % al 5,0 % (el orgánico de hoy, medio punto bajo el consenso); margen EBITDA 2027e-2028e = el del consenso (33,5/33,8 %); coste financiero 110 M (guía ≈105; el 8-oct usaba 149 sin justificar); acciones 220,1 M (incluye la recompra **anunciada** pendiente); probabilidades 35/45/20 sin cambio (no hay hecho nuevo que las mueva).
- Historia del PER: se añade el cierre de 2025 (÷ nuestro 2026e) y se normalizan 2022 y 2025 (plusvalías de desinversión): mediana adelantada 27,8x (antes 25,8x), mínimo 17,4x. v2 al cierre: 31,6 / 19,0 / 29,0 sin exclusiones a mano.
- **Por qué decide la v2**: el selector (regla 1, desrateada): 27,8 / 14,2 = 1,96 ≥ 1,8. No es la lista de los 11 informes en v2. Con el método vigente es correcto: la caída es de régimen (IA) y M1 dice justo eso. Con la historia del 8-oct sin normalizar (25,8x) también decide la v2 (1,82).
- Resultado: DCF 127,64 (WACC 6,80 %); valor intrínseco 117,15 (+50,1 %); objetivo 12 m 80,18: **v2 +6,0 % / base +10,1 % → Mantener**; v3 sin selector +16,0 % / +20,6 %. Comprar < 71,98; vender > 91,98. ROIC 25,4 % (publicado 18,0 %) frente a WACC 6,80; sostenibilidad «Sí» (motor «Sí»: no salta el control). 20/21 controles, 1 explicado. Word 58 páginas, cobertura 93,6 %; PDF con soffice.
- Robustez: FRÁGIL, acción robusta no comprar (ni mantener: v2 5,0 % < 10 %), M1 y M6, sin CORREGIR; límite 71,96 (precio de precios.json del 13-oct, 78,84).
- `apuntar-12m.mjs --simular`: Mantener −3,0 % (informe viejo a 78,06) → Mantener 6,0 %.
- Revisión de comité: la síntesis explica la distancia entre valor intrínseco (+50 %) y objetivo a 12 m (+6 %); la diferencia con el mercado está en la tasa (9,2 % implícita), no en las cifras.
- Extra: `conservadurismo.md` (prueba pedida por el usuario; `notas/conservadurismo.mjs`), `precio-noticias.md` (añadido del coordinador) y ficha sectorial nueva `sectores/informacion-profesional-2026-10-15.md` + comparables JSON.

**Línea 12 m**: v2 (selector, desrateada) 80,18 EUR, ponderada +6,0 %, base +10,1 %, Mantener; v3 +16,0 %; precio 78,06 (14-oct).

## Lecciones

- En una desrateada, la v2 es casi independiente del precio (base = PER de hoy): en un informe nuevo da la misma rentabilidad a 72 que a 78 EUR; el límite de compra solo existe con el objetivo fijo. Ver «Para Mejoras» en `conservadurismo.md`.
- El selector es no monótono: Wolters a 86 EUR pasaría a v3 (16 %) y a 78 se queda en v2 (6 %).
- La historia adelantada del 8-oct omitía el último cierre (÷ BPA del año en curso) y no normalizaba plusvalías de desinversión que el BPA de los casos sí excluye: revisarlo en las historias hechas por `historia-adelantada.mjs` de compradores/vendedores de negocios.
- `robustez.mjs` toma el precio de `precios.json` (13-oct), no el del informe: difiere unas décimas.

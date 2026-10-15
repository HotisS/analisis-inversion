# Diario · Rai Way (RWAY, Euronext Milan) · 15-oct-2026

- Commit de partida: a225607 (Seguimiento: regenerado); al terminar, main en dd1e35a por los commits de los otros análisis. Sin `git pull` ni commits propios (encargo de la 8.ª hora: los hace el coordinador).
- Entorno: nube de Claude Code con la red abierta. Sin subagentes: notas A-E y propio escritas por mí (`notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `textos.mjs` + `resumen.mjs`). Unos 45 minutos.
- Fecha de corte 2026-10-15; EUR; ejercicio natural; NIIF-UE; cuenta por naturaleza.
- **Cuentas**: `cuentas.mjs --esef "Rai Way"` no encuentra la entidad y con el LEI (815600303CCB3CFD2264, de GLEIF) da 404: Rai Way no está en filings.xbrl.org. Cuentas 2021-2025 copiadas de los estados NIIF de los informes anuales 2022, 2024 y 2025 y del comunicado de FY2025 (web de Rai Way: API Plone `/++api++/@search` para listar documentos, descarga con `/@@download/file`). LTM de la semestral de junio de 2026.
- **Precio**: 4,20 EUR, cierre del 13-oct (Yahoo no da el del 14-oct; el 15-oct en sesión cotiza a 4,23). Una acción = 4,20 EUR (muy por debajo del 7 % de una cartera de 30.000 EUR).
- **Decisiones**: amortizaciones = amortización + deterioros + provisiones (EBITDA − amortizaciones = EBIT publicado). No recurrentes en el EBITDA: 5,3 M (2023), 0,3 (2024), 4,4 (2025), 5,6 (LTM). Puente a 30-jun-2026: deuda 156,7, arrendamientos 26,7, caja 15,5, TFR neto 6,1. WACC 7,03 % (Bund 3,51 %, beta 0,60 frente a 0,29 bruta y 0,52 ajustada, prima 5,5 %, riesgo país 0,9 por el diferencial BTP-Bund de septiembre). Terminal 1,0 % (TDT madura). Bajista con perfil: −8 pp de crecimiento y −4 pp de margen en 2029 (recorte del canon de RAI tras la renovación de junio de 2028) y terminal 0 %. Pesos DCF 45 / comparables 10 / escenarios 45. Sin transacciones con múltiplo (hueco). Sentimiento sin foros legibles (FinanzaOnline 403, Reddit bloqueado, Stocktwits sin símbolo): prensa y brókeres, confianza baja.
- **Resultado**: DCF 6,26 EUR; valor intrínseco 6,23 (+48,3 %); DCF inverso −4,8 % anual de ingresos 2027-2032 (base +2,4 %) o margen 52,6 %. ROIC 29,6 % frente a WACC 7,03 % (+22,6 puntos; sin fondo de comercio, `roic_sin_fc_pct` no aplica). Sostenibilidad «Sí» y `veredicto_motor` «Sí»: no salta el control. Calidad: **Sí**.
- **Línea 12 m (v3 ×1,1, selector sin marcas)**: objetivo 5,01 EUR, ponderada +27,1 %, base +22,9 % → **Comprar**, convicción media. v2: +16,3 % / +12,6 % (Comprar). Comprar < 4,61; vender > 5,93; límite robusto 4,22. Detalle en revision-12m-2026-10-15.md. `apuntar-12m.mjs --simular`: «RWAY: v3 ponderada 27.1 %, base 22.9 % → Comprar (v2: 16.3 % Comprar)».
- **Robustez**: SÓLIDA, acción robusta Comprar; colchón de BPA del 10 % para Comprar; avisos D3 (RWAY no está en `precios.json`: falta el símbolo en `simbolos.json`, lo añade el coordinador) y M6.
- Próximos resultados: 11-nov-2026 (9M26).
- Para subir la confianza: acta de la junta con los votos (PDF escaneado), relación de remuneración, multiplos de transacciones (OPA de EI Towers de 2018), foros de los últimos tres meses.

## Lecciones

- ESEF en Italia: algunas cotizadas (Rai Way) no están en filings.xbrl.org ni con el LEI; la web de Rai Way es Plone y su API (`https://www.raiway.it/++api++/@search?path.query=/it/documents/documenti-investitori&b_size=100`) lista todos los documentos, que se bajan añadiendo `/@@download/file`.
- FinanzaOnline (foro) da 403 a WebFetch y curl; para Italia, el sentimiento solo sale de Websim y Teleborsa.

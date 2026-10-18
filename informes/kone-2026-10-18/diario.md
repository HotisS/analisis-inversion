# Diario · KONE Oyj (KNEBV) · 18-oct-2026

- Commit de partida: 33958a6. Prompt `verticales/empresa/prompt.md` sin cambios durante el análisis.
- Por qué: Hotis pidió «correr Kone por el análisis value». La primera respuesta (≈20:45 UTC) solo refrescó el informe del 14-oct (precio, noticias y robustez), que se había hecho sin documentos completos (confianza baja). Hotis exigió la metodología completa: esta es una iteración nueva entera.
- Fecha de corte 2026-10-18; precio 55,26 EUR (cierre del viernes 16-oct, Yahoo). EUR, NIIF-UE, cierre en diciembre. Próximos resultados 28-oct-2026.
- Cuentas: `cuentas.mjs --esef 2138001CNF45JP5XZK38` (el nombre «KONE» devolvía primero Konecranes: hay que pasar el LEI). 2020-2025 del XBRL, comprobado contra los informes anuales.
- Notas A-E con cinco subagentes en paralelo (≈11-14 min cada uno), con documentos primarios descargados en `notas/docs/`. Integración `motor/integrar.mjs`, cálculo y Word/PDF (soffice).
- Decisiones: KONE sola, sin TKE; puente a 30-jun-2026 con depósitos dentro de la caja (1.130,6 M), pensiones netas 117,8 M y derivados de TKE (48,6 M) en otros ajustes; circulante al 6,0 % de las ventas (el de 2025); WACC 8,66 % (Bund 3,45 %, beta 0,89 frente al STOXX 600, prima 5,5 % + 0,5 por China); g 2,3 %.
- Resultado: 20 de 20 controles; cobertura 90,3 %. DCF 40,53; valor intrínseco 41,05 EUR (−25,7 %). Objetivo 12 m 59,73 EUR: ponderada +11,4 %, base +17,1 % (v2 control 11,3/13,2) → **Mantener**, convicción media. Robustez `--actual`: SÓLIDA, acción robusta **No mantener** (V1). Límite de compra 41,05 EUR.
- Revisión a 12 meses en `revision-12m-2026-10-18.md`; apuntada con `apuntar-12m.mjs`; cobertura y seguimiento actualizados.

# Diario · Almawarid Manpower Company (1833.SR, Tadawul) · 27-nov-2026

Commit de partida: `3d983a2` (checkout compartido de la tanda del 27-nov; sin git pull/commit/push). Iteración nueva tras el 3T26 sobre `informes/almawarid-2026-10-19/`, sin tocarla. Motivo del encargo: a ≈ 0,4 % de su nivel B y 3T26 flojo según el escáner (BPA ×0,97). Fases A-E a mano en un hilo, sin subagentes. Horas de Madrid: inicio 09:57, fin ≈ 10:20.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Hora (Madrid) | Fecha del dato |
|---|---|---|---|
| Lectura del encargo, procedimiento, prompt, lecciones (núcleo, Arabia Saudí), METODO-VIGENTE (reglas 13 y 16, §2) y criterio de la cola | archivos del repo | 09:57-10:00 | — |
| Movimiento (regla 13) | `movimiento.mjs 1833.SR` | 10:00 | cierre 26-nov-2026 (82,00) |
| Resultados del 3T26: tabla y causas | Argaam (company-report 2026/72) | 10:01 | 5-nov-2026 |
| **XBRL oficiales de Saudi Exchange** (3T26 y cuentas anuales auditadas de 2025) y anuncios a Tadawul (9M26, ampliación gratuita, DMTT) | financialfilings.com / cdn.financialreports.eu con `descargar.mjs` (Saudi Exchange: 403) | 10:02-10:04 | 30-sep-2026 (BDO, 10-nov); 31-dic-2025 (BDO, 5-abr-2026); 5-nov y 26-nov-2026 |
| Noticias: CMA aprueba la gratuita 5 por 4; DMTT; conferencia del 3T26 (solo titular) | Argaam | 10:01 | 16, 22 y 26-nov-2026 |
| Comparables, consenso y tipos de cambio | `notas/yahoo.mjs` (quoteSummary) | 10:02 | 26-nov-2026 |
| Bolsa (KSA, XLI) | `bolsa.mjs --corte 2026-11-26` | 10:02 | cierre 26-nov-2026 |
| Bono a 10 años EE. UU. | CSV diario del Tesoro (4,85 %); FRED DGS10 (4,91 % el 24-nov) | 10:03 | 25-nov-2026 |
| Prima implícita | Damodaran ERPbymonth.xlsx (4,41 %) | 10:05 | 1-nov-2026 |
| Notas A-D rehechas (A: LTM sep-26, 3T26, segmentos y KPI de 9M26, auditoría; C: gratuita, DMTT, guía; D: precio, consenso, comparables) | `notas/construir-notas.mjs` | 10:04-10:06 | 30-sep-2026 / 26-nov-2026 |
| Supuestos (2026e +19 %, 2027e +11 %, 2028e +9 %; circulante 8 %; tasa libre 5,36 %), puente a 30-sep | `supuestos.mjs`, `propio.mjs` | 10:06 | 30-sep-2026 |
| Integración y cálculo (19 de 22 controles correctos y 3 explicados: zakat) | `integrar.mjs`, `calcular-empresa.mjs` | 10:07-10:11 | — |
| Textos (síntesis, riesgos, catalizadores, regla 13) | `textos.mjs`, `textos-final.mjs`, `resumen.mjs` | 10:07-10:11 | — |
| Word (cobertura 76,7 %) y PDF (41 páginas) | `rellenar.mjs`; soffice | 10:11 | — |
| Revisión a 12 meses y apunte (clave `1833.SR`) | `revision-12m-2026-11-27.md`; `apuntar-12m.mjs --precios` (con flock) | 10:11 | precio 82,00 (26-nov) |
| Robustez: FRÁGIL; si la tienes, Mantener (filtro hasta 83,88); límite B 75,80, robusto 72,19; nivel: ninguno | `robustez.mjs --actual` (con flock) | 10:11 | precio 82,00 (26-nov) |
| Comprobación: sin errores en esta carpeta (aviso C10: `simbolos.json` apunta aún a la carpeta del 19-oct) | `comprobar.mjs` | 10:11 | — |

## Decisiones

- **Precio**: cierre del jueves 26-nov-2026, 82,00 SAR (Yahoo y Argaam coinciden); el 27-nov Tadawul no abre.
- **Cuentas**: lección nueva: los XBRL oficiales de Saudi Exchange (anuales y trimestrales) y los anuncios a Tadawul están en financialfilings.com (descarga de `cdn.financialreports.eu` con `descargar.mjs`). Con ellos 2024, 2025 y 9M26 son primarios; 2021-2023 siguen de fuentes secundarias. El control de 10 fuentes primarias pasa ahora.
- **Fecha de resultados**: el calendario de la web decía 28-oct; el 3T26 salió el 5-nov (anuncio n.º 99068).
- **BPA**: 2028e 11,68 (×0,97 frente a 12,04): coincide con el escáner. 2026e se ancla en 9M26 (7,58) + 4T26 ≈ 2,50.
- **Ampliación gratuita 5 por 4 pendiente de junta**: todo en 20 M de acciones y precio actual; tras la junta, ÷ 1,25.
- **Historia del PER**: misma construcción que el 19-oct (2025 con nuestro BPA de 2026e, ya con 9M26 publicado), base «publicado» en historia y casos.
- **Selector**: historia de 3 años → decide la v2 (+12,5 % / +9,1 %, Mantener); v3 sin selector +24,1 %.
- **Nivel**: la regla vigente da Mantener al precio de hoy, así que no hay nivel A ni B; límite B 75,80 y robusto (A) 72,19 SAR.
- **Filtro del usuario**: pequeña saudí (≈ 437 M USD) y de cesión de personal: cae en las exclusiones del criterio de la cola del 19-oct. No es candidata.
- **Sentimiento**: sin fuentes nuevas (como el 19-oct); sección omitida.
- Línea de la revisión a 12 meses: v2 +12,5 % ponderada, +9,1 % base → Mantener; objetivo 89,23 SAR; valor intrínseco 119,02.

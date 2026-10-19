# Diario · Ningbo Deye (605117.SS) · 19-oct-2026

Commit de partida: `99bd934 Escáner fuera de hora 19-oct 10:34`. Procedimiento completo desde cero (`/analiza-empresa`), no un refresco. Horas del contenedor (UTC) según las marcas de los archivos; la primera fase (descargas y lectura) se reconstruye por la fecha de los documentos.

## Pasos, con la fecha de los datos

| Paso | Hora (UTC) | Datos a fecha de |
|---|---|---|
| Identificación: acciones A en Shanghái, ISIN CNE1000052S3; sin acciones H (solicitud en HKEX del 27-ene-2026, actualizada el 28-jul-2026, pendiente) ni GDR → solo Stock Connect | inicio | CNINFO y HKEX hasta el 19-oct-2026 |
| Descarga de cuentas (sin XBRL en China): informes anuales 2021-2025, semestrales 1S24-1S26, trimestrales y avances de CNINFO; folleto de Hong Kong (informe NIIF de BDO 2023-2025) | ≈09:17 | 2025 anual; 1S26 a 30-jun-2026; avance de 9M26 del 14-oct-2026 |
| `bolsa.json` y `movimiento.mjs` (1 m −14,1 %, 3 m −16,7 %, 12 m +33,6 %; −41,7 % desde máximos; aviso P5) | ≈09:17 | cierre del 19-oct-2026 (71,35 CNY) |
| Notas A-E (`construir-notas.mjs`): cuenta, balance, flujos, trimestres, 5 segmentos, 7 geografías, sector, foso, gobierno, consenso, 8 comparables, sentimiento (Guba) | hasta 09:39 | consenso MarketScreener 16-oct; Soochow 15-oct y Guosen 18-oct; comparables Yahoo 16/17-oct; noticias hasta el 19-oct |
| WACC: ChinaBond 10 años 1,648 %, beta 1,15, ERP 5,5 + 1,0 de país → 8,84 %; tipos de cambio del BCE | 09:35 | bono 16-oct-2026; BCE 16-oct-2026; Damodaran oct-2026 |
| Supuestos y puente (`supuestos.mjs`, `propio.mjs`) | 09:34-09:35 | balance a 30-jun-2026 menos dividendo a cuenta y recompra |
| Textos, riesgo de IA, `bolsa.contexto` (`textos.mjs`, `textos-final.mjs`) | hasta 09:43 | — |
| `integrar.mjs` + `calcular-empresa.mjs` (19 de 22 controles y 3 explicados; todas las citas con fuente) | 09:43 | — |
| Word (`rellenar.mjs`, cobertura 86,2 %) y PDF (soffice, 45 páginas) | 09:43 | — |
| `simbolos.json` (605117 → 605117.SS) y `precios.mjs 605117` | 09:44 | cierre del 19-oct-2026 |
| `robustez.mjs --actual`: FRÁGIL, acción robusta No mantener | 09:44 | precio del 19-oct-2026 |
| `revision-12m-2026-10-19.md` y `apuntar-12m.mjs` | 09:44 | — |

## Decisiones

- **Base contable**: NIIF 2023-2025 del folleto de Hong Kong (más detalle y auditadas por BDO), CAS en 2021-2022 y en 2026; la diferencia entre ambas en el beneficio es pequeña. Diferencias de cambio y valor razonable, al resultado financiero.
- **BPA por acción de hoy**: ampliaciones liberadas (factor 4,939 desde 2022, la última de 0,4 en mayo de 2026); el objetivo de los analistas parece en parte sin ajustar.
- **2026e casi cerrado** (fijo): +92 % de ventas con el 1S26 y el avance de 9M26; luego 25 %, 12 %, 8 %, 6 % y 4 %, margen EBITDA del 29,5 % al 25 %.
- **Escenarios** 25/50/25; el bajista replica la caída de 2023 (perfil 2027e −35 pp de crecimiento y −5 pp de margen).
- **ROIC**: el del motor (183,5 % en 2025) sale de un capital invertido diminuto por el circulante negativo; se da también uno prudente con toda la caja en el capital (21,5 %, estimación propia).
- **Controles explicados**: perímetro 2022 (sin compras: deuda y depósitos), caja proyectada (beneficio de 9M26 ya por encima de todo 2025) y crecimiento del BPA > 25 % (rebote ya visible: 22 % anual desde el LTM).
- **Huecos**: transacciones (sin múltiplos publicados), ESG externo, voto de remuneración, posiciones cortas, otras plataformas de sentimiento, previsiones de crecimiento y EV/EBITDA NTM de los comparables (el mapa no se dibuja).
- **Fuente retirada**: Bamboo Works (403); afirmaciones sin fuente quitadas (Lituania, VDE, precio de la ampliación).

## Resultado

Mantener, convicción baja. A 12 m (v3): ponderado 71,18 CNY (+2,7 %), base 76,43 (+10,0 %); v2 +10,6 %. Valor intrínseco 76,72 (+7,5 %). Comprar por debajo de 63,69; vender por encima de 81,39. Robustez FRÁGIL (No mantener; la v2 la cambia a Mantener). Próximos resultados: 3T26 el 30-oct-2026.

# Diario · Munters (MTRS.ST) · 19-oct-2026

- Encargo: análisis value completo (iteración del 15-oct), en paralelo con Olympus y Booz Allen. **Commit de partida cbe789c** («Cola de índices: APR (pareja 8, primera)»). Empezado 16:01 UTC, terminado ≈16:15 UTC. Sin herramienta Agent: fases A-E hechas a mano partiendo de los scripts del 15-oct (`notas/construir-notas.mjs`, `propio.mjs`, `supuestos.mjs`, `textos.mjs`) copiados y comprobados dato a dato. Sin `git pull`, sin commit ni push; la carpeta del 15-oct no se ha tocado.
- Pasos y fecha de los datos:
  1. Cuentas: `cuentas.mjs --esef "Munters"` → ESEF 2020-2024 (idéntico al del 15-oct); 2025 del informe anual 2025 (descargado de nuevo: ventas 14.712, BPA continuadas 3,01, activo 19.728, caja 1.492, comprobados); LTM y puente a 30-jun-2026 del informe del 2T26 (descargado: cartera 24.542, caja 1.427, deuda con interés 6.048, deuda neta 6.684, 182.541.440 acciones).
  2. Calendario (MFN, 19-oct 18:02 CEST): **3T26 el 23-oct-2026 a las 07:30** (aún no publicado), fecha ex del 2.º dividendo (0,80) el 4-nov, día del inversor el 11-nov, anual el 28-ene-2027. Sin comunicados nuevos de la empresa desde el 9-oct.
  3. Precio: `bolsa.mjs` y `movimiento.mjs` → **cierre del 19-oct-2026, 132,05 SEK** (Yahoo; última operación 17:29:35 CEST = 15:29 UTC; la sesión cierra a las 17:30, así que el precio del día es el cierre). `precios.mjs MTRS` actualizó solo Munters en `precios.json` (132,05, sin sesión en curso).
  4. Comparables: Yahoo del 19-oct (USD/SEK 9,927; las de EE. UU. con la sesión en curso a ≈12:00 ET).
  5. Consenso: MarketScreener del 19-oct (sin cambios: 8 analistas, 206,25; BPA 4,94 / 9,67 / 12,17). UBS 245 (14-oct, Finwire).
  6. Tasa libre: Riksbank SEGVB10YC 3,162 % (16-oct, último dato); se mantiene el 3,20 %. BCE 19-oct: 11,104 SEK/EUR, 1,1225 USD/EUR.
  7. Directivos: Finansinspektionen consultado el 19-oct, última operación el 10-ago-2026 (nueve compras, ninguna venta). Cortos: blankningsregistret del 19-oct, 1,31 % (Eleva 0,71 % a 1-oct; Millennium 0,60 % a 12-oct): hueco del 15-oct resuelto.
  8. Noticias (regla 13): `noticias.mjs --meses 12` y MarketScreener hasta el 19-oct: Speria con ofertas indicativas a fin de octubre (16-oct, EFN), UBS 245 (14-oct), Pareto 240 (12-oct), SB1 200 (7-oct), Swedbank Robur < 5 % (4,83 % a 2-oct). Veredicto: **no cambia**.
  9. Sentimiento: se mantiene el del 15-oct (Placera/EFN, hasta oct-2026); confianza baja.
- Decisiones:
  - Supuestos del DCF, escenarios, pesos (40/20/0/0/40) y BPA (5,72 / 8,57 / 9,90) sin cambios: no hay información operativa nueva antes del 3T26. La venta de Speria no entra en el base (sin oferta firme); se cita como catalizador.
  - Riesgo de IA ampliado (a favor: cartera de DCT; en contra: frenazo del capex de IA y chips sin enfriadoras).
  - Recomendación del informe: Mantener (regla: Comprar), por calidad (ROIC − WACC +0,4), sostenibilidad «En parte», D6 y v2 con BPA −10 % por debajo del 15 %.
  - `simbolos.json`: la entrada MTRS ya existía; se cambió solo su `carpeta` a `munters-2026-10-19`.
- Línea 12 m (escrita con `apuntar-12m.mjs`, comprobada en `objetivo12m-revisados.json`): MTRS v3 34,8 % ponderada / 35,5 % base → Comprar (v2 25,3 %). Valor intrínseco 141,02. Robustez `--actual`: SÓLIDA, acción robusta **Mantener en cartera** (no comprar); límite robusto de la herramienta 139,49 SEK; con la v2 también a BPA −10 %, ≈129,6 SEK.
- Word `Munters - 2026-10-19.docx` (26 gráficos, cobertura 89,7 %) y PDF con LibreOffice (perfil /tmp/lo-munters), 44 páginas.

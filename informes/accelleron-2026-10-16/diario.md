# Diario · Accelleron Industries (ACLN.SW) · corte 16-oct-2026

- Commit de partida: 0f09d25 (sin git pull/commit/push: lo consolida el coordinador). Entorno sin subagentes: fases A-E hechas por el mismo agente; notas con [n] propios en `notas/construir-notas.mjs`.
- Suiza sin XBRL: cuentas 2021-2025 y 1S26 leídas de los PDF (AR 2022-2025, informe semestral 2026) en `notas/docs/`. Segmentos 2021-2023 corregidos con las notas de los AR 2022 y 2023.
- Precio: cierre del 15-oct a 68,80 CHF (MarketScreener; Yahoo aún no lo tenía) = 82,87 USD con el BCE (1,2045). Beta de Yahoo (−0,21) inservible: beta 1,0.
- WACC 10,22 % con el bono de EE. UU. a 10 años (5,10 %, CSV del Tesoro; FRED no descargó). Terminal Gordon 3 %.
- Puente a 30-jun-2026: deuda 531,8, caja 252,9, minoritarios 190 (beneficio minoritario LTM 12,7 × 15), otros 22 (recompra posterior); arrendamientos operativos fuera (US GAAP); superávit de pensiones no sumado.
- No recurrentes devueltos: costes de puesta en marcha tras la escisión (2022 37,0; 2023 77,4; 2024 15,8). 2025 dentro.
- Comparables (Yahoo, `notas/comparables-yahoo.mjs`): Rolls-Royce corregido de peniques a libras (PER 27,1x) y sin ROIC. Sin EV/EBITDA NTM de los comparables: el gráfico de dispersión no se dibuja.
- Regla a 12 m: v3 ×1,1; historia adelantada de 3 años → `per_historico.anios: 3` para que el selector lo vea; decide v3 (la más baja). Bajista con doble castigo (BPA −36 % y PER 17,3x): la variante sin él da −8,4 %, misma acción.
- Convicción Baja (el motor sugiere Media): la ponderada (−8,9 %) está a 1,1 puntos del umbral de Vender y el precio a un 1,2 % del nivel de venta.
- Robustez: SÓLIDA, acción robusta No mantener (valor intrínseco −44 %).
- Ficha sectorial corta de turbocompresores en `notas/ficha-sector-turbocompresores.md` (no podía escribir en `sectores/`).
- Revisión a 12 m: accelleron-2026-10-16 · 2028e · 73,60 USD (61,10 CHF) · −8,9 % / +1,7 % · Mantener · v3. Pendiente del coordinador: ACLN.SW en simbolos.json, apuntar-12m, cobertura, calendario (17-mar-2027).

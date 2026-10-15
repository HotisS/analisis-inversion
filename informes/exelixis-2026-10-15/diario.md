# Diario · Exelixis (EXEL) · 15-oct-2026

Commit de partida: 70ba47e. Análisis value completo hecho por un solo analista (sin subagentes), según el encargo del 15-oct (sin commits ni escritura fuera de la carpeta).

## Flujo
1. `cuentas.mjs` (SEC XBRL) → `notas/cuentas-xbrl.json`; `bolsa.mjs` → `notas/bolsa.json` (precio 60,99, cierre del 14-oct).
2. Documentos en `notas/docs/` (notas de prensa 3T25-2T26, 10-Q 2T26, 10-K 2025 y 2022, proxy 2026, 8-K de mayo, agosto y septiembre).
3. `notas/construir-notas.mjs` → A-E.json; `supuestos.mjs`, `propio.mjs` y `textos.mjs` → propio.
4. `integrar.mjs` → `calcular-empresa.mjs` (19 de 19 controles) → `rellenar.mjs` (cobertura 88,6 %; avisos de tablas o gráficos vacíos: suma de partes no aplica, sin ESG, sin deuda, comparables sin EV/EBITDA NTM) → PDF con soffice.
5. Robustez (`--actual` y `--bpa-factor 0.9`) y `apuntar-12m.mjs --simular`: v3 15,8 % / 11,4 %, Mantener; v2 28,7 %.

## Decisiones
- El primer DCF dio 31,73 USD. Revisado el caso base: genérico de cabozantinib en 2030 con el 55 % de peso (MSN desde el 15-ene-2030; Teva y Cipla desde 2031) y zanzalintinib más alto. DCF final 37,42 USD.
- Sostenibilidad: el motor dice «Sí», pero el analista pone «En parte», porque el crecimiento de 2026-2029 se corta con el genérico de 2030-2031.
- Recomendación Mantener: la regla de 12 meses da 15,8 % con la base en 11,4 %, y el valor intrínseco queda un 35 % por debajo del precio. No se compra.
- El juicio de la patente '039 (2-nov-2026) es el catalizador más claro: si se gana, el genérico se retrasa a 2032.

## Lecciones (para quien integre)
- **XBRL con ejercicio de 52/53 semanas** (cierre a principios de enero): `cuentas.mjs` etiqueta el ejercicio por la fecha de cierre, con un año de desfase (el FY2025 acaba el 2-ene-2026 y sale como 2026). Hay que reetiquetarlo a mano. Es candidata a arreglarse en la herramienta.
- ir.exelixis.com devuelve 403 desde la nube: usar EDGAR para los 8-K y las notas de prensa.
- En las farmacéuticas con caída de patente dentro del horizonte, la regla de 12 meses (PER × BPA de 2028) y el DCF divergen mucho (70,6 frente a 39,7). El valor intrínseco es lo que decide, vía el filtro V1.

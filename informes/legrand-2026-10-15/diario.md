# Diario · Legrand (LR.PA) · análisis value · 15-oct-2026

- Commit de partida: 30aee4a. Trabajo en solitario, sin subagentes, sin commits (encargo del coordinador). Hora de Madrid.
- Tiempos (Madrid): ≈18:45 inicio · 18:59 cuentas XBRL y bolsa · 19:09 documentos AMF y notas A-E · 19:20 supuestos, DCF y 12 m · 19:26 Word y PDF · 19:30 robustez y entrega.
- Precio: cierre del 15-oct-2026, 133,70 EUR (la sesión de París ya había cerrado).

## Decisiones
- Cuentas 2020-2025 del XBRL ESEF (`cuentas.mjs --esef`, LEI 969500XXRPGD7HCAFA90); EBITDA, capex, DPA, BPA diluido y deuda neta de los comunicados depositados en la AMF.
- La deuda financiera de Legrand incluye los arrendamientos NIIF 16 (432 M a 31-mar-26): `arrendamientos: 0` y capex con las altas de derechos de uso. El bono convertible (OCEANE 800 M, conversión a 159,03 EUR, 2033) va como deuda; acciones diluidas 263,4 M.
- Crecimiento: 2026e fijo en la guía (+15,5 % con compras y divisa); 2027e con +3 puntos de arrastre de las siete compras de 2026; desde 2028e solo orgánico. Por eso nuestro BPA 2028e (6,61) queda un 8 % bajo el consenso (7,20), que incluye compras nuevas.
- WACC 8,48 % (Bund 3,45 %, beta 1,1 entre la mensual 1,23 y la semanal 0,96-1,03, prima 5,5 %). g terminal 2,5 %.
- ETF sectorial: EXH4.DE (industriales europeos); EXV1.DE es de bancos y estaba mal en la primera pasada.
- `mercado_final` en null: el mercado de Dell'Oro solo cubre los centros de datos (un tercio de las ventas).
- Recomendación Mantener con la convicción sugerida (Baja: absoluta Vender, relativa Mantener).
- Calidad: ROIC − WACC 3,6 (< 5 para comprar; < 4,5 de la banda de mantener), por el fondo de comercio (64 % del capital); sin fondo de comercio el ROIC es 35 % y el incremental 16,4 %. Caso parecido al de LVMH (excepción del usuario); no lo propongo como excepción: lo decide el usuario.

## Revisión a 12 meses (línea para el registro; solo simulada)
`LR: v3 ponderada 10.8 %, base 8.6 % → Mantener (v2: 14.4 % Mantener)` · robustez SÓLIDA, acción robusta «Mantener en cartera», colchón de BPA 1 %; con BPA −10 %, «No mantener». Límite robusto 116,18 EUR.

## Lecciones (para que el coordinador decida si van a `lecciones*.md`)
- **Francia/AMF**: los comunicados de Euronext París están en el opendata de la AMF (echanges.dila.gouv.fr/OPENDATA/AMF/BWR/<año>/<mes>/FCBWR<n>_<fecha>.pdf). Escanear el directorio del mes y leer la primera línea de cada PDF (`pdftotext -l 1`) encuentra los comunicados de resultados sin pasar por la web de la empresa.
- **Legrand y otros franceses**: la deuda neta publicada incluye los arrendamientos; no sumarlos otra vez.
- **BDIF (operaciones de directivos)**: los nombres y los importes solo salen bien con `pdftotext -raw`; sin `-raw` las columnas se mezclan.
- MarketScreener: comprobar el código de la URL (LEGRAND-16719); otro código devolvió Ubisoft.
- Cuidado con el ETF sectorial por defecto: comprobar que el símbolo es del sector de la empresa.

## Pendiente para el coordinador
- Apuntar la revisión (`apuntar-12m.mjs`), `simbolos.json` (LR.PA si no está), `seguimiento.mjs`, `cola.md`, las lecciones y el commit.
- Huecos: remuneración del CEO, rating, auditor, calificaciones y controversias ESG, CR5 y posiciones cortas.

# Diario · Giant Biogene Holding Co., Ltd (2367.HK) · 19-oct-2026

## Punto de partida y reglas del checkout

- **Commit de partida**: c72687b («Cola de índices: Harbour Energy (pareja 8)»; c72687b2e8295086bf8970fefb219a699c4badf4).
- **Checkout compartido** con otro análisis en paralelo (Manhattan Associates). No usé `git pull`, `commit`, `push`, `checkout` ni `stash`.
- **Escrito solo en**:
  - esta carpeta;
  - `verticales/empresa/simbolos.json` (entrada `2367.HK`, insertada como texto al principio de `empresas`, sin reordenar);
  - lo que escriben para esta empresa `precios.mjs 2367.HK` (`precios.json`) y `apuntar-12m.mjs giant-biogene-2026-10-19` (`objetivo12m-revisados.json`).
- **Sin tocar**: `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`.
- **Sin ejecutar**: `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`. No usé herramientas de hearthbot ni de IBKR.
- **Rebase del coordinador** hacia las 16:31 UTC (HEAD 118594d):
  - comprobé que la entrada `2367.HK` sigue en `simbolos.json` y que el JSON es válido;
  - volví a ejecutar `precios.mjs 2367.HK`, `apuntar-12m.mjs giant-biogene-2026-10-19` y `robustez.mjs … --actual`, con el mismo resultado.

## Tiempos (UTC)

| Hora | Fase |
|---|---|
| 16:01 | Inicio |
| 16:02-16:10 | Descargas de HKEXnews y bolsa |
| ≈ 16:24 | Notas A-E (una compactación del contexto por medio) |
| 16:25-16:29 | Parte propia, motor, Word y PDF |
| ≈ 16:33 | Revisión a 12 meses, símbolos, precios y robustez |

## Encargo

- Análisis value completo desde cero.
- Valorar en serio la caída de 2025-2026: la polémica del colágeno, que había que **comprobar**, no dar por hecha; la competencia; y Tmall y Douyin.
- Riesgo regulatorio chino y riesgo de IA.
- Las fases A-E las hice yo: `notas/construir-notas.mjs` escribe A-E.json. La parte propia está en `propio.mjs`, `supuestos.mjs`, `textos.mjs` y `resumen.mjs`.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Lista de documentos de la empresa | HKEXnews (búsqueda por stockId 1000171758) → `notas/hkex-lista.json` | hasta 2026-10-16 |
| Cuentas 2021-2025 | HKEXnews: informes anuales de 2022, 2023, 2024 y 2025 (`herramientas/descargar.mjs` → `notas/docs/`) | 2023-04-26 a 2026-04-29 |
| Resultados de 2025 (marcas, canales, dividendos) | HKEXnews: anuncio de resultados anuales | 2026-03-19 |
| Semestre 2026 y balance de 30-jun-2026 | HKEXnews: anuncio de resultados del 1S26 y Interim Report 2026 (revisado por KPMG) | 2026-08-18 / 2026-09-24 |
| Semestres de 2024 y 2025 | HKEXnews: anuncios de resultados semestrales | 2024-08-19 / 2025-08-27 |
| Acciones emitidas | HKEXnews: Monthly Return de septiembre de 2026 | 2026-10-06 |
| Recompras, colocación, compras de la familia, auditor, junta, registros NMPA | HKEXnews: anuncios sueltos | 2025-04-17 a 2026-06-17 |
| Polémica del colágeno | Caixin Global, Yicai y Lanjinger | 2025-06-02 a 2025-06-24 |
| Sector | NBS (ventas minoristas de cosmética de 2025); Xinhua (asociación sectorial); ficha `sectores/higiene-cosmetica-2026-10-14.md` | 2026-01-19 / 2026-03-18 / 2026-10-14 |
| Precio, beta, rentabilidades, cierres de año | `bolsa.mjs --accion 2367.HK --indice 2800.HK --sector 2828.HK --corte 2026-10-19 --cierre-mes 12` | cierre del 16-oct-2026 (HK cerrado el 19-oct) |
| Precio común | `precios.mjs 2367.HK` | 22,60 HKD, cierre del 16-oct-2026 (Yahoo, 16:08 HKT); sin sesión el 19-oct |
| Movimiento (regla 13) | `movimiento.mjs 2367.HK` | 16-oct-2026 |
| Comparables, consenso de Yahoo, tipos de cambio | Yahoo quoteSummary (`notas/yahoo-datos.mjs`; 12 fichas, Jinbo sin datos) y HKD/CNY | 15-16-oct-2026 |
| Consenso de ventas, EBITDA y BPA, y objetivos | MarketScreener (16 analistas) | 2026-10-16 |
| Bono chino a 10 años | ChinaBond (1,648 %) | 2026-10-16 |
| Prima de mercado | Damodaran ERPbymonth (4,20 %) | octubre de 2026 |
| Transacciones | FundComb (rhode, RoC), Keystone-SDA (ZO Skin), Personal Care Insights (ISDIN) | 2024-01 a 2026-10-14 |
| Movimientos de 2025-2026 | cnyes, Zhitong/Investing.com China | 2025-09-24 / 2026-10-14 |
| Foro | Guba (Eastmoney) de 2367: agosto, septiembre y octubre | hasta 2026-10-19 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` (21 controles correctos y 4 explicados) | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs` (cobertura del 90,5 %), LibreOffice con perfil propio | 19-oct-2026 |
| Objetivo a 12 m | `apuntar-12m.mjs giant-biogene-2026-10-19` | 19-oct-2026 |
| Robustez | `robustez.mjs informes/giant-biogene-2026-10-19 --actual` | 19-oct-2026 (precio del 16-oct) |

## Decisiones

### Divisas y precio

- `meta.divisa` es RMB, `divisa_cotizacion` HKD y `tipo_cambio` 0,8528 RMB por HKD (Yahoo, 15-16-oct).
- Precio: 22,60 × 0,8528 = 19,27 RMB.
- Hong Kong no abrió el 19-oct (día siguiente al Chung Yeung), así que el cierre de hoy no existe: se usa el del 16-oct.
- Consenso y objetivos de MarketScreener pasados de HKD a RMB.

### Polémica del colágeno de 2025

- **Comprobado**:
  - acusación del bloguero (0,0177 %, 24-may-2025);
  - retractación del laboratorio (30-may);
  - análisis de Giant de varios laboratorios por encima del 0,1 %;
  - participación de Bloomage en un fondo ligado al bloguero (1-jun).
- **No encontrado**: ninguna sanción de la NMPA.
- **No verificado**:
  - la causa del −11/−12 % del 24-sep-2025;
  - las nuevas acusaciones de finales de septiembre de 2025, vistas solo en un resumen de buscador. No se usan.

### Proyección

- **2026e fijo**: −2 % (1S real −6,3 % y un 2S de +3,5 %), margen EBITDA del 34 %.
- **Después**: +6 / +6 / +5 / +4 / +3 / +2,5 / +2 % y margen del 34,5 %.
- El consenso (+9,8 % en 2026e, sin recortes tras el 1S26) se considera atrasado: nuestro BPA de 2028e queda un 20 % por debajo.
- **Escenarios** 25/50/25: bajista −3 pp de crecimiento, −4 pp de margen y g del 0,5 %; alcista +2 / +2.
- **Resultado financiero recurrente**: 280 / 240 / 230 M. Impuesto del 17 % en 2026e (14,2 % en el 1S26) y del 18 % después.

### Coste de capital

- WACC del 9,65 %: bono chino del 1,648 %, beta 1,0, prima del 5,5 % y 2,5 puntos adicionales (país y regulador, plataformas, producto estrella dañado); sin deuda.
- g del 1,5 %, por debajo del bono.

### Pesos de la valoración

- DCF 50, escenarios 40, comparables 10. Los comparables bajan de 20 a 10 porque el motor aplica la mediana de PER de los comparables al BPA del consenso, que creemos atrasado; con 20 el valor intrínseco subía a 30,18.

### Puente (30-jun-2026)

| Partida | M RMB |
|---|---|
| Caja (efectivo 4.852,5 + FVTPL 2.543,3 + depósitos a largo ≈ 198,7) | 7.594,5 |
| Arrendamientos | 12,3 |
| Minoritarios | 13,1 |
| Asociadas | 227,4 |
| Deuda | 0 |

El dividendo de 2025 (1.285 M) ya estaba pagado a esa fecha.

### Sostenibilidad

- Veredicto: **En parte** (el motor dice «Sí»).
- Las tres pruebas numéricas pasan, pero el foso se estrecha (margen bruto del 82,1 al 79,5 %, gasto comercial del 36 al 43 %) y las ventas llevan dos semestres cayendo.
- Consecuencia: Q1 bloquea la compra robusta.

### Historia del PER

- 4 años adelantados (2022-2025); selector → v3 ×1,1.
- La v2 queda en 12,5 % (Mantener).

### ISIN

- El que había escrito (KYG3897F1035) no pasaba el dígito de control.
- Corregido a KYG3887G1091: sale de listados de mercado y pasa el control. Dicho en `limitaciones`.

### Regla 13

- Veredicto: **no cambia**.
- No hay colocación anunciada: el mandato general es genérico y la empresa tiene caja.
- La familia compra.
- El cambio de auditor es por rotación.
- P4 y P5 tienen la causa explicada.

## Resultado

- **Regla v3**: Comprar (ponderada del 23,2 %, base del 19,0 %); v2: 12,5 %.
- **Valor intrínseco**: 28,43 RMB (33,34 HKD) frente a 19,27 RMB (22,60 HKD).
- **Robustez**: FRÁGIL, y la acción robusta es **Mantener**.
- **Límites**:
  - común: 22,05 HKD (el de la v2);
  - robusto con BPA −10 %: 21,68 HKD.
- **Por qué no es compra**: B1 (11,2 % con BPA −10 %) y Q1 (sostenibilidad «En parte»), además de la v2 por debajo del 15 % (que fija el límite común). Bajar a 21,68 HKD no arreglaría Q1.

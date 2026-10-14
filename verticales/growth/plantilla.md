# Análisis growth: plantilla del informe y de `datos.json`

Se sigue entera en cada empresa. Método y reglas: [metodo.md](metodo.md). Todo en castellano.

## Reglas de datos

- **Fecha de corte** = la del análisis. Cifras con fuente `[n]` (lista al final). Prioridad: cuentas y presentaciones de la empresa, regulador (SEC, CNMV, etc.), después prensa financiera y agregadores. No inventar: si un dato no aparece tras tres búsquedas, `null` y se dice.
- **Precio y múltiplos de hoy**: dos fuentes si es posible (cotización de cierre del último día hábil).
- **Consenso** solo para la señal 1 y para el contraste, nunca en el cálculo.
- **Foros y sentimiento** (obligatorio): Reddit (r/stocks, r/investing y el subreddit de la empresa), StockTwits o X, Seeking Alpha y un foro en castellano (Rankia, Investing.com ES). Qué se dice, si cambia, si hay euforia; nunca como fuente de cifras.
- **Nunca datos personales del usuario** en consultas, URL ni cabeceras.
- Cifras en millones de la moneda de cotización salvo que se diga otra cosa; si las cuentas van en otra moneda, se convierte al tipo de hoy y se dice.

## `datos.json`

```json
{
  "empresa": "Nombre", "ticker": "TICK", "bolsa": "NASDAQ", "moneda": "USD", "fecha": "AAAA-MM-DD",
  "precio": 0, "acciones_diluidas_m": 0, "caja_m": 0, "deuda_m": 0,
  "crecimiento": { "ventas_12m_pct": 0, "ultimo_trimestre_pct": 0, "cagr_2a_propio_pct": 0, "aceleracion_pp": 0, "nrr_pct": null, "guia_12m_pct": null, "exceso_guia_pp": null, "nota_guia": "" },
  "mercado": { "tam_m": 0, "ventas_12m_m": 0, "tecnologia_0a5": 0, "posicion_0a5": 0 },
  "tendencia": {
    "senales": {
      "revisiones_al_alza": { "valor": false, "evidencia": "" },
      "precio_sobre_media_200": { "valor": false, "evidencia": "" },
      "fuerza_relativa_6m": { "valor": false, "evidencia": "" },
      "mejora_de_multiplo": { "valor": false, "evidencia": "" },
      "inflexion_operativa": { "valor": false, "evidencia": "" },
      "sentimiento_mejorando": { "valor": false, "evidencia": "" },
      "compras_directivos_o_institucionales": { "valor": false, "evidencia": "" },
      "catalizador_nuevo": { "valor": false, "evidencia": "" }
    },
    "subida_12m_pct": 0,
    "euforia": false
  },
  "economia": { "margen_bruto_pct": 0, "margen_fcf_pct": 0, "rentabilidad": "fcf_creciente|fcf_positivo|breakeven_12m|breakeven_24m|lejos|sin_camino" },
  "finanzas": { "quema_anual_m": 0, "dilucion_anual_pct": 0, "sbc_sobre_ventas_pct": 0 },
  "ejecucion": { "historial_0a5": 0, "direccion_0a5": 0 },
  "valoracion": {
    "ejercicio_objetivo": "2028", "metrica": "EV/ventas", "anios_hasta_objetivo": 2,
    "ventas_objetivo_m": { "bajista": 0, "base": 0, "alcista": 0 },
    "multiplo_actual": 0, "mediana_3a": 0, "minimo_3a": 0, "mediana_comparables": 0,
    "comparables": ["…"],
    "crecimiento_actual_pct": 0, "crecimiento_obj_pct": 0,
    "probabilidades": { "bajista": 25, "base": 50, "alcista": 25 },
    "dividendo_pct": 0,
    "consenso_ventas_obj_m": null, "consenso_precio_objetivo": null,
    "dcf_inverso_crecimiento_10a_pct": null
  },
  "tesis_rota": false,
  "fuentes": ["[1] …"]
}
```

Notas de los campos:
- `ultimo_trimestre_pct`: crecimiento interanual del último trimestre. `subida_12m_pct`: revalorización de la acción en 12 meses (la usa la regla de euforia). `ventas_objetivo_m`: la proyección del analista; desde v4 es solo contraste, la que cuenta la calcula el código.
- `aceleracion_pp`: crecimiento interanual del último trimestre − media de los cuatro anteriores.
- `guia_12m_pct`, `exceso_guia_pp`, `nota_guia` (opcionales; los usa la candidata v9, `backtest/resultados-v9.md`): crecimiento de ingresos que guía la empresa para los 12 meses siguientes (punto medio; si el ejercicio en curso ya pasó su primera mitad, el crecimiento implícito en lo que queda del año guiado, o la guía del año siguiente si ya existe; solo guía trimestral → `null`) y lo que de media la bate, en puntos de crecimiento (media de los 4 últimos trimestres; si solo hay guía anual, crecimiento real del último ejercicio − el de su primera guía; desconocido → `null` = 0). v9 parte como mucho de guía + exceso; solo recorta. Sin guía, `null`.
- `tam_m`: mercado **alcanzable** en el ejercicio objetivo (no el «mercado total» de la presentación si es inflado); se dice de dónde sale.
- `tecnologia_0a5`: 5 = tecnología propia que nadie replica en 3 años (patentes, datos, efecto red); 3 = buena pero con alternativas; 1 = producto commodity.
- `posicion_0a5`: 5 = líder claro con cuota creciente; 3 = entre los 3 primeros; 1 = seguidor.
- `historial_0a5`: 5 = cumple o supera la guía en ≥ 7 de los últimos 8 trimestres; 3 = la mayoría; 1 = la recorta a menudo.
- `direccion_0a5`: 5 = fundador o equipo con participación relevante, asignación de capital sensata, sin ventas masivas; 1 = rotación, ventas fuertes o gobierno dudoso.
- `quema_anual_m`: FCF negativo de los últimos 12 meses en positivo (0 si el FCF es positivo).
- `dilucion_anual_pct`: aumento de acciones diluidas en 12 meses (incluye convertibles que entrarán).
- `crecimiento_actual_pct` / `crecimiento_obj_pct`: crecimiento de ventas de los próximos 12 meses y del ejercicio objetivo (escenario base), para la rebaja por desaceleración.
- `probabilidades`: 25/50/25 salvo los casos de `metodo.md` §2.5.
- `tesis_rota`: true solo con los supuestos de venta de `metodo.md` §3.

Después: `node motor/growth.mjs informes-growth/<carpeta>/datos.json` escribe `calc` (puntuación, casos, señal, precio máximo) y el informe copia esas cifras.

## `informe.md` (3-6 páginas)

```
# <Empresa> (<ticker>): análisis growth, <fecha>

**Señal: <Comprar/Mantener/Vender> (<convicción>)** · Puntuación <x>/100 · Señales de cambio de tendencia <n>/8
Precio <p> · Objetivo 12 m <o> (ponderada <+x %>, base <+y %>, bajista <z %>, alcista <w %>) · Compra hasta <precio máx.>
Peso orientativo: <x %> o «no entra»

## 1. La tesis en cinco líneas
## 2. Negocio y tecnología        (qué vende, a quién, qué tiene de nuevo)
## 3. Crecimiento                  (tabla ventas por trimestre y año, aceleración, retención, guía)
## 4. Mercado y competencia         (mercado alcanzable con fuente, cuota, rivales, por qué gana)
## 5. Cambio de tendencia           (tabla de las 8 señales: sí/no, prueba, fuente; euforia sí/no)
## 6. Economía unitaria y camino a la rentabilidad (margen bruto, regla del 40, FCF, apalancamiento operativo)
## 7. Caja, deuda y dilución        (pista, convertibles, pagos en acciones sobre ventas)
## 8. Dirección y ejecución
## 9. Valoración                    (tabla de escenarios: ventas, múltiplo, precio, rentabilidad; contraste con el consenso; DCF inverso)
## 10. Foros y sentimiento          (qué se dice y dónde, si cambia, contraste con los datos)
## 11. Riesgos y qué rompería la tesis (señales de venta concretas)
## 12. Catalizadores con fecha
## 13. Encaje en cartera            (frente a la cartera value vigente y a otras growth; peso y tramos)
## 14. Puntuación                   (tabla de los seis bloques con sus puntos)
## Fuentes
```

Word y PDF: `pandoc informe.md -o "<Empresa> - growth - <fecha>.docx"` y `soffice --headless --convert-to pdf` sobre el Word.

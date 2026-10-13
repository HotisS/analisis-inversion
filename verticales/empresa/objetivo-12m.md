# Objetivo realista a 12 meses (método del 12/13-oct-2026)

**Qué problema resuelve.** Los informes (`motor/calcular-empresa.mjs`) toman el valor intrínseco de la síntesis (DCF, escenarios y comparables ponderados) como «precio objetivo a 12 meses». Eso supone que el mercado cierra todo el descuento en un año, e infla la rentabilidad esperada de las empresas baratas (Trigano +57 %, Wolters Kluwer +55 %) y la pérdida de las caras. Para decidir compras y la cartera se usa este objetivo realista. El valor intrínseco sigue siendo la referencia de «valor real del activo».

**Origen.** El usuario lo pidió el 12-oct en el hilo del proyecto de claude.ai «PROYECTOS GH - INV», que revisó a mano Alphabet y las seis compras del rebalanceo sin poder abrir el repo. Ese hilo no dejó su regla en el repo. El 13-oct se reconstruyó la regla con sus resultados y se dejó aquí y en `herramientas/objetivo12m.mjs` (sesión de Claude Code «¿Puedo?»).

## La regla

```
objetivo_12m     = precio + k × (valor_intrínseco − precio)
k                = 0,5 por defecto (en un año se cierra la mitad del descuento o de la prima)
                 = 0,25 con convicción «Baja» o con un evento binario en los próximos ~3 meses (EVENTOS en la herramienta)
recorte          = si objetivo_12m > objetivo máximo del consenso, se queda en ese máximo
                   (el consenso solo recorta: no sube nuestro objetivo; si su objetivo medio no está entre 0,4 y 2,5 veces
                   el precio, se entiende que está en otra unidad, como GBp frente a GBP o un ADS, y no se usa)
rentabilidad_12m = objetivo_12m / precio − 1 + dividendo
señal_12m        = Comprar ≥ 15 % · Vender ≤ −10 % · Mantener en medio (los umbrales del motor)
```

`valor_intrínseco` = `calc.sintesis.valor_objetivo` de la **última versión** del informe (con nuestro WACC, no con la prima del mercado: prima el valor real). Precio y dividendo, los del informe.

**Revisiones manuales.** `verticales/empresa/objetivo12m-revisados.json` guarda las del hilo del 12-oct y **mandan sobre la regla**:

| Empresa | Antes (DCF) | Revisión 12-oct | Regla, para comparar |
|---|---|---|---|
| Alphabet | −28 % | ≈ 0 %, Mantener (valoración rehecha: capex de IA normalizado) | — |
| Trigano | +57 % | +27 % | +30 % |
| Wolters Kluwer | +55 % | +28 % | +29 % |
| Auto Trader | +42 % | +26 % | +22 % |
| Deckers | +31 % | +16 %, Mantener | +16 % |
| Coloplast | +29,5 % | +9 %, Mantener | +11 % |
| Technip Energies | +40,5 % | +15 % (esperar al 29-oct) | +13 % |

## Cómo se usa

- `node herramientas/objetivo12m.mjs` imprime la tabla de todos los informes.
- `node herramientas/seguimiento.mjs` la lleva al Excel: columnas «Objetivo 12 m realista», «Rentabilidad 12 m realista», «Señal 12 m» y «Origen del objetivo 12 m».
- **Cartera y compras**: se ordenan por la rentabilidad a 12 meses realista. El valor intrínseco y la rentabilidad del informe se dan al lado como «valor real».
- **Al cerrar un informe nuevo**: comunicar las dos rentabilidades, la del informe (al valor intrínseco) y la realista a 12 meses.
- Una revisión manual nueva (empresa a fondo) va a `objetivo12m-revisados.json`, con fecha y nota, y se dice en el diario de la carpeta.

## Qué no es

- No es la «metodología nueva» del 10-oct. Esa es la **sostenibilidad del crecimiento** en el DCF: `dcf.sostenibilidad`, columna «Metodología» del Excel. Son dos cosas distintas:
  1. **Metodología del informe** (columna «Metodología»): la del DCF. «Nueva» = con la prueba de sostenibilidad. El 13-oct se pasaron a «Nueva» la cartera y todas las Comprar (actualización rápida, `notas/actualizacion-vN.mjs`). Si la prueba falla, se rebaja el caso base al crecimiento financiable.
  2. **Objetivo a 12 meses** (este documento): cómo se pasa del valor intrínseco a una rentabilidad esperada en un año.

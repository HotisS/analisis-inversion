# Distribución farmacéutica mayorista: ficha sectorial corta (15-oct-2026)

Hecha con el análisis value de Cencora (`informes/cencora-2026-10-15/`). Cifras en millones de USD salvo que se diga otra cosa. Comparables en `distribucion-farmaceutica-2026-10-15-comparables.json` (Yahoo Finance, 14/15-oct-2026; caducan el 14-nov-2026).

## 1. Perímetro

Distribución mayorista de medicamentos con receta (marca, genéricos, especialidad y biosimilares) a farmacias, hospitales, consultas y gestores de farmacia (PBM). GICS 35102010 (Health Care Distributors); NACE 46.46. Fuera: fabricación, farmacias minoristas, gestores de farmacia y distribución de productos médicos (salvo como segmento aparte de Cardinal y Henry Schein). **`mercado_final` para los informes value: la distribución farmacéutica de EE. UU.**, medida por las ventas de los segmentos farmacéuticos de EE. UU. de los tres grandes. Las cuotas que publican las empresas son de su segmento de EE. UU.: en el DCF, `mercado_final: null` y la prueba de cuota a mano con las ventas del segmento (lección de `lecciones.md`). Europa, Japón y Australia son mercados nacionales aparte, con precios regulados.

## 2. Tamaño y crecimiento

- **EE. UU., ≈ 866.000 M USD** (estimación: McKesson North American Pharmaceutical 336.652 M en FY a mar-2026; Cardinal Pharmaceutical and Specialty Solutions 234.833 M en FY a jun-2026; Cencora U.S. Healthcare Solutions ≈ 294.000 M en los 12 meses a jun-2026). Fuentes: nota de resultados de McKesson FY2026, 10-K FY2026 de Cardinal, 10-K FY2025 y 10-Q del 3T26 de Cencora.
- **Crecimiento**: ≈ 10 % anual en 2019-2025 en las ventas de los tres (GLP-1, especialidad, inflación de marcas). Previsión: IQVIA, citado en el 10-K de Cencora, espera que el gasto farmacéutico de EE. UU. crezca un **8,4 % anual en 2024-2029**; la ficha usa un 6 % para las ventas del distribuidor (los precios negociados de Medicare desde 2026 y la política de nación más favorecida restan precio facturado). Segunda fuente independiente de tamaño de mercado: n.d. (IQVIA publica gasto neto, no ventas mayoristas).
- **De qué depende**: volumen de recetas (población mayor de 65 años, ≈ 71 millones en 2029), mezcla (especialidad, GLP-1 con margen casi nulo), precio de lista de las marcas (las comisiones de servicio son un porcentaje) y conversión a genéricos (bajan ventas, suben margen).

## 3. Estructura competitiva y cotizadas

Oligopolio: **McKesson ≈ 39 %, Cencora ≈ 34 %, Cardinal ≈ 27 %** del volumen de los tres (estimación con las ventas de segmento); CR3 > 90 % del mercado de EE. UU. (n.d. una fuente con el HHI).

| Empresa | Ticker | Capitalización (M USD) | Crec. ventas NTM | Margen EBITDA LTM | ROIC | DN/EBITDA | PER NTM | EV/EBITDA NTM |
|---|---|---|---|---|---|---|---|---|
| McKesson | MCK | 113.859 | 9,0 % | 1,72 % | n.d. (capital negativo) | 0,9x | 20,4x | 16,0x |
| Cencora | COR | 64.150 | 4,4 % | 1,5 % (ajustado) | 15-17 % sin circulante negativo | 1,7x (2,8x con opioides) | 17,0x | n.d. |
| Cardinal Health | CAH | 57.367 | 6,4 % | 1,67 % | 32,9 % | 1,2x | 19,1x | 13,9x |
| Henry Schein | HSIC | 9.535 | 5,2 % | 7,94 % | 8,2 % | 3,4x | 14,6x | 13,0x |
| Galenica | GALE.SW | 5.195 | 5,0 % | 5,97 % | 13,2 % | 4,2x | 20,8x | 19,9x |
| Medipal | 7459.T | 3.998 | 3,7 % | 2,15 % | 8,1 % | caja neta | 13,4x | 5,5x |
| Alfresa | 2784.T | 2.555 | 3,5 % | 1,59 % | 7,8 % | caja neta | 15,9x | 4,6x |
| EBOS | EBO.AX | 2.383 | 5,4 % | 3,46 % | 7,4 % | 3,5x | 13,6x | 10,0x |
| Suzuken | 9987.T | 2.246 | 3,6 % | 1,88 % | 9,2 % | caja neta | 14,4x | 4,2x |

ROIC de Yahoo (EBIT después de impuestos sobre capital invertido); el de los tres grandes de EE. UU. sale altísimo o sin sentido por el circulante negativo. Mediana del PER NTM de los ocho comparables de Cencora: 15,3x; de los dos rivales directos: 19,8x.

## 4. Economía del negocio

- **Márgenes**: operativo ajustado del 1,0-1,2 % en EE. UU. (McKesson 1,03 %, Cardinal 1,19 %, Cencora 1,15 %); 2-3 % en Europa y Japón; 5-8 % en distribución dental o con farmacias propias (Henry Schein, Galenica).
- **Capital**: inversión del 0,2-0,3 % de las ventas; **circulante negativo** en EE. UU. (Cencora −2,8 % de las ventas): los proveedores financian existencias y cobros, crecer genera caja.
- **Conversión en caja**: flujo libre ≈ beneficio ajustado a lo largo del ciclo, con mucho ruido trimestral por el circulante.
- **ROIC**: sin sentido con el capital publicado; con inmovilizado + fondo de comercio + intangibles, 15-17 % (Cencora).
- **Qué separa a las mejores**: escala (coste por unidad), mezcla de especialidad (oncología, retina, biosimilares, servicios a laboratorios) y no depender de un solo cliente (McKesson tiene menos concentración que Cencora con Walgreens).

## 5. Ciclo y regulación

- **Ciclo**: no cíclico; las ventas crecieron en 2009, 2020 y 2022-2023. Lo que se mueve es la inflación de precios (crédito o cargo LIFO) y la mezcla.
- **Regulación vigente**: acuerdo nacional de opioides de los distribuidores (2022; Cencora debe ≈ 4.200 M USD en 13 años), Ley de Reducción de la Inflación (precios negociados de Medicare: 10 fármacos desde ene-2026, 15 más desde ene-2027), licencias de la DEA.
- **Lo que viene**: política de «nación más favorecida» y acuerdos directos de precio con laboratorios; aranceles a medicamentos importados; demandas de opioides fuera del acuerdo (Baltimore, Departamento de Justicia).
- **Más expuestas**: Cencora (Walgreens, 25 % de sus ventas, y Express Scripts, 13 %, renuevan en 2029) y Cardinal (concentración en grandes cadenas); McKesson menos.

## 6. Lo que vigilar

1. Crecimiento de ingresos de los segmentos de EE. UU. (trimestral, notas de resultados): por debajo del 3 % sin pérdida de clientes indica presión de precios.
2. Margen operativo ajustado de los segmentos de EE. UU. (trimestral): por debajo del 1,10 % en Cencora o del 1,0 % en McKesson, cesión de diferencial.
3. Renovaciones y concursos de grandes clientes (Walgreens/Sycamore, Express Scripts, CVS, OptumRx): 8-K y conferencias.
4. Lista anual de fármacos negociados de Medicare (CMS, febrero) y decretos de precios (nación más favorecida).

Riesgos que debe recoger la sección 25 de un informe de empresa: concentración de clientes y renovaciones, precios de lista de marcas, opioides fuera del acuerdo, compras caras de consultas médicas y GLP-1 sin margen.

## Cierre

- El dinero se gana en la **especialidad** (oncología, retina, biosimilares, servicios a laboratorios) y en los genéricos; la distribución de marcas y GLP-1 da volumen con margen casi nulo.
- El sector es de calidad (oligopolio, circulante negativo, ROIC alto), pero en oct-2026 cotiza caro frente a su historia: 17-20 veces el BPA adelantado frente a 10-14 en 2019-2024.
- Merece la pena buscar oportunidades en **caídas por noticias de clientes o regulación** (Cencora −17 % el 6-may-2026), no al precio de hoy.
- Cencora (Mantener, límite de compra 270,55 USD) sufre más que McKesson si un gran cliente renegocia; McKesson y Cardinal no tienen informe en el repositorio.
- Nada en cartera ni en cola de este sector a la fecha.

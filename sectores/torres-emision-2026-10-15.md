# Ficha sectorial: torres de emisión y difusión (Italia, con torres de telecomunicaciones como referencia) · 15-oct-2026

Hecha con el análisis value de Rai Way (`informes/rai-way-2026-10-15/`). Cifras de mercado a 14-15 de octubre de 2026; caducan a los 30 días. Comparables en `torres-emision-2026-10-15-comparables.json`.

## 1. Perímetro

- **Entra**: infraestructura mayorista de difusión de radio y televisión (torres, transmisores, redes de radioenlaces, mantenimiento y nivel de servicio para emisoras: TDT, FM, DAB+) y el alquiler de espacio en esas torres a operadores móviles, de acceso inalámbrico fijo (FWA) y radios. NACE 61.10/60.20 (parte) y 68.20 (alquiler de emplazamientos); GICS 50102010 (servicios de telecomunicaciones alternativos) o REIT de torres en EE. UU.
- **No entra**: las emisoras (RAI, Mediaset), la producción de contenidos, las torres propias de los operadores móviles, los centros de datos hiperescala (otro sector).
- **`mercado_final` para los informes value**: ingresos de las dos redes nacionales de difusión de Italia (Rai Way + EI Towers). Es el perímetro de `competencia.cuota_pct` (Rai Way ≈ 51 %). Como la cuota es de un segmento muy concentrado y los ingresos dependen de un contrato, en el informe va `mercado_final: null` y la prueba de cuota se hace a mano (lección general de `lecciones.md`).

## 2. Tamaño y crecimiento

- **Difusión mayorista en Italia**: ≈ 550 M EUR en 2025 (Rai Way 282,8 M, informe anual 2025; EI Towers 266,9 M, comentario de Websim del 18-may-2026 sobre sus resultados). No hay estadística oficial (AGCOM no publica el mercado mayorista de difusión): **estimación propia** con las dos empresas, que son prácticamente todo el mercado nacional. Crecimiento 2024-2025 ≈ 0 % (Rai Way +2,4 %; EI Towers −3 % por la renegociación con MFE).
- **Previsión a 5 años**: ≈ 1 % anual nominal. Depende de **precio** (indexación de los contratos a la inflación: +10,8 % en Rai Way en 2023), del **volumen** de DAB+ (cobertura de RAI del 56 % al 70 % en 2024-2025) y de la **renegociación** de los contratos con las dos emisoras (EI Towers ya bajó sus tarifas con MFE en julio de 2025; Rai Way renueva con RAI en junio de 2028).
- **Torres de telecomunicaciones en Italia** (referencia): ≈ 31.000 torres de torreras y ≈ 50 % del total en tejados en 2027 según el plan de Rai Way (fuentes TowerXchange, Berenberg); INWIT factura ≈ 1.070 M EUR (Stock Analysis).
- **Centros de datos regionales**: demanda empresarial en Italia de ≈ 240 MW en 2024 a ≈ 450 MW en 2035 (Altman Solon, julio de 2025, en la presentación del 1S26 de Rai Way). Es la vía de diversificación de las torreras de difusión.

## 3. Estructura competitiva y cotizadas

Difusión en Italia: **duopolio** de redes ligadas a su gran cliente (CR2 ≈ 100 %). Rai Way (64,97 % RAI) y EI Towers (60 % F2i, 40 % MFE, no cotiza). La fusión de las dos (memorando RAI-F2i-MFE de diciembre de 2024) expiró el 1-jul-2026 sin acuerdo.

Cotizadas de referencia (Stock Analysis, 14-15 de octubre de 2026; capitalización en M EUR con el BCE del 14-oct; crecimiento = previsión de ingresos a 3 años; EV/EBITDA de los últimos 12 meses):

| Empresa | Ticker | Cap. (M EUR) | EV/EBITDA | PER próx. 12 m | Crec. % | Margen EBITDA % | ROIC % | DN/EBITDA |
|---|---|---|---|---|---|---|---|---|
| Rai Way | RWAY | 1.128 | 6,8 | 12,4 | 2-3 | 66 | 29,6 | 0,9 |
| INWIT | INW | 6.650 | 12,5 | 19,3 | 1,3 | 71,2 | 5,5 | 5,6 |
| Cellnex | CLNX | 16.710 | 11,4 | n.d. | 4,8 | 62,6 | 1,9 | 6,0 |
| American Tower | AMT | 74.667 | 18,0 | 26,7 | 4,3 | 64,4 | 8,0 | 6,1 |
| SBA Communications | SBAC | 17.124 | 18,6 | 22,8 | 2,7 | 63,9 | 9,2 | 8,1 |
| Crown Castle | CCI | 30.165 | 20,9 | 29,8 | −0,5 | 64,7 | 5,2 | 8,3 |
| Helios Towers | HTWS | 2.631 | 9,8 | 22,2 | 9,6 | 51,9 | 5,4 | 3,7 |

Sin comparables puros de difusión cotizados: EI Towers, TDF (Francia) y Arqiva (Reino Unido) son privadas.

## 4. Economía del negocio

- **Márgenes**: EBITDA del 52-71 % (mediana de las torreras ≈ 64 %); Rai Way 67,8 % ajustado y EI Towers 58,4 %.
- **Intensidad de capital**: capex de mantenimiento ≈ 6 % de los ingresos en difusión; las torreras de telecomunicaciones invierten más en construcción y compras. Circulante pequeño (8-9 % de los ingresos en Rai Way).
- **Conversión en caja**: alta (flujo operativo ≈ 50 % de los ingresos en Rai Way); el dividendo absorbe casi todo.
- **ROIC**: 2-9 % en las torreras cotizadas, hundido por el fondo de comercio de sus compras; ≈ 30 % en Rai Way, cuya red se aportó a valor contable. Lo que separa a las mejores: contratos largos indexados con varios clientes por torre (tasa de ocupación), deuda moderada y escala.

## 5. Ciclo y regulación

- **Ciclo**: poco sensible a la economía. En 2009 y 2020 los ingresos de difusión no cayeron (contratos fijos); en 2022-2023 la indexación protegió de la inflación. Lo cíclico es el coste de la energía (Rai Way: ±0,7 M EUR de EBITDA por cada 10 EUR/MWh) y el de la deuda en las torreras apalancadas (2022-2023: caída de múltiplos de AMT, CCI y Cellnex con la subida de tipos).
- **Regulación vigente y con fecha**: concesión de servicio público de RAI hasta el 30-abr-2027; contrato de servicio RAI-Ministerio 2023-2028; contrato Rai Way-RAI hasta el 30-jun-2028 con renovación tácita a 2035 (rescindible sin penalización desde entonces); frecuencias de TDT de RAI hasta 2032; banda UHF por debajo de 700 MHz reservada a la difusión en la UE hasta 2030 (revisión prevista). DPCM de 2022/2024: RAI puede bajar al 30 % de Rai Way; poderes especiales del Estado sobre la red.
- **Más exposición**: Rai Way y EI Towers (dependientes de un cliente cada una).

## 6. Lo que vigilar

1. **Ingresos de RAI en Rai Way** (semestral): por debajo de la inflación italiana, señal de presión sobre el canon.
2. **Decisión europea sobre la banda UHF después de 2030** y número de múltiplex de RAI (anual).
3. **Precio de la electricidad (PUN)** (mensual, GME).
4. **Contratos de centros de datos regionales y CDN** de las torreras de difusión (trimestral).

Riesgos del sector para la sección 25 de un informe: renegociación con el cliente ancla, sustitución de la TDT por la distribución por internet, energía, tipos de interés (acciones sustitutas de bono) y gobierno del accionista público.

## Cierre

Se gana dinero en el eslabón de la red física, con contratos largos indexados y márgenes del 65-70 %, no en la emisora. El sector merece seguimiento solo por el precio: las redes de difusión son activos maduros que se pagan como bonos indexados, y hoy Rai Way cotiza a ≈ 7 veces el EBITDA frente a 11-21 veces las torreras. Se beneficia Rai Way (si se renueva el contrato en 2028); sufren las emisoras con presión de costes (RAI, MFE), que empujan a la baja las tarifas. Ninguna otra empresa de la cola o de la cartera está en el sector.

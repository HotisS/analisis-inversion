# Diario: Uber Technologies (UBER), corte 2026-10-08

- Commit de partida: 425783d Informe de ICE (Comprar, convicción baja)
- 22:16 Inicio. Lectura del comando, prompt y lecciones.
- 22:18 Fase 1: identificación. Uber Technologies, Inc., NYSE: UBER, ISIN US90353T1007, CIK 0001543151, USD, ejercicio a 31-dic, US GAAP. Último 10-Q: 2T26 (5-ago-26). Último 10-K: FY2025 (13-feb-26). Guía 3T26: reservas brutas 58.250-60.250 M USD, EBITDA ajustado 2.860-2.960 M, BPA no GAAP 0,84-0,88. CFO nuevo: Balaji Krishnamurthy.
- 22:20 Lanzados A, B, C, D en paralelo.
- 22:28 C terminado (8 min, 57 llamadas). A y D con contenido; B solo negocio y competencia parcial.
- 22:34 A, B y D terminados (12 min cada uno). D sin múltiplos de transacciones (solo Delivery Hero), sin flotante, posición corta ni fecha del 3T26. Yahoo sin el cierre del 8-oct a las 22:34.
- 22:36 Lanzado E (transacciones, flotante, posición corta, fecha de resultados).
- 22:36 Primer cálculo completo (precio 68,45 del 7-oct): DCF 74,56; objetivo 73,56; regla absoluta Mantener, relativa Comprar. Reservas legales tratadas como recurrentes; comparables pasados a EBITDA después de pagos en acciones.
- 22:40 Cierre del 8-oct (70,24 USD) confirmado en Stock Analysis; Yahoo aún sin él. Con ese precio las dos reglas dan Mantener (relativa +14,5 %, a medio punto del umbral).
- 22:41 E terminado (8 min): JET 14,3x y Deliveroo 17,1x con múltiplo; resultados del 3T26 el 4-nov-2026; posición corta 2,24 %.
- 22:44 Textos (textos.mjs, resumen.mjs) con las cifras del motor leídas de la última ejecución (cifras.mjs); ciclo calcular → integrar → calcular.
- 22:47 Word y PDF (62 páginas). Revisadas como imagen portada, síntesis (642 palabras), resumen y «La decisión». Corregidos: industria en inglés, doble paréntesis en la tesis, efecto en valor del bajista, fila de empleados vacía.

## Decisiones del analista
- Precio: cierre del 8-oct (70,24 USD, Stock Analysis); rentabilidades, beta y participadas cotizadas a 7-oct (Yahoo sin el 8 a las 22:40).
- EBITDA del DCF y de los múltiplos: contable, con la remuneración en acciones dentro (DCF después de pagos en acciones). Reservas legales y regulatorias tratadas como recurrentes (aparecen todos los años): `no_recurrentes_en_ebitda` solo con deterioros, compras/ventas y reestructuración (2025: 56 M; LTM: 112 M). Consenso ajustado con el 4,7 % de las ventas (coherente con lo anterior).
- Comparables pasados a EBITDA después de remuneración en acciones con el gasto de 2025 de cada uno (XBRL). Sin ese ajuste, la mediana NTM aplicada a Uber daba 55 USD en vez de 76.
- Beta 1,21 (ajustada mensual 5 años frente al S&P 500). Contraste: Nasdaq 100 0,99, XLY 0,99, IYT 1,11.
- Puente: participaciones a mercado (12.357 M), multa neerlandesa de 825 M EUR del 8-oct sumada a otros ajustes (+923 M), bonos en euros de sep-26 neutros (fuera).
- Delivery Hero fuera de la proyección; solo la participación y el derivado ya poseídos.
- Etapa 2 no usada pese a ROIC 19,9 % > WACC + 5: la incertidumbre del coche autónomo no permite alargar el crecimiento.
- Resultado: Mantener por las dos reglas (absoluta +4,7 %; relativa +14,5 %, a medio punto del umbral). Convicción media.

## Tiempos
- Fase 1: 6 min. Subagentes A-D: 12-15 min cada uno (C: 8 min). E (huecos de mercado): 8 min. Integración, supuestos, textos y revisión: unos 15 min en paralelo con E. Total ≈ 31 min (22:16-22:47), por debajo de los 30-60 previstos solo por el paralelo; la profundidad está en las notas (A 74 llamadas, B 95, C 57, D 65, E 56).

## Fallos del sistema
1. **bolsa.mjs y el cierre del día en EE. UU.**: a las 22:40 Madrid Yahoo no tenía el cierre del 8-oct aunque Stock Analysis sí. Arreglo propuesto: que bolsa.mjs acepte `--precio-cierre` y `--fuente-precio` manuales, o que intente la página de históricos de Stock Analysis como respaldo y lo diga.
2. **descargar.mjs añade la extensión al nombre**: con `submissions.json` como nombre guardó `submissions.json.json`. Arreglo: si el nombre ya trae la extensión correcta, no duplicarla.
3. **Comparables con EBITDA ajustado frente a EBITDA contable de la empresa**: el motor compara el EV/EBITDA ajustado (sin remuneración en acciones) de los comparables con el contable de Uber y no avisa; infravaloraba a Uber un 28 %. Arreglo: campo `comparables.empresas[].sbc_pct_ventas` (o `base_ebitda` por comparable) y aviso cuando la base de la empresa y la de los comparables difieren.
4. **Medida de segmento que cambia a mitad de serie** (Uber pasó del EBITDA ajustado de segmento al resultado operativo de segmento en 2026): el subagente A mezcló filas semestrales con anuales. Arreglo: decir en el prompt de A que no se mezclan periodos en `negocio.segmentos` y que el cambio de medida va a `meta.limitaciones`.
5. **«No recurrentes» que se repiten**: Uber excluye cada año reservas legales; A las metió en `no_recurrentes_en_ebitda`. Arreglo: regla en el prompt («si una partida aparece en 4 de 5 años, es recurrente») y un control del motor que avise si `no_recurrentes_en_ebitda` es positivo en todos los ejercicios.
6. **Subagente D sin múltiplos de transacciones** (sin tiempo): hubo que lanzar un quinto subagente. Arreglo: separar transacciones en su propio encargo cuando el sector tiene muchas compras de empresas en pérdidas, o pedir a D que empiece por las dos operaciones con OPA pública.
7. **El integrador no señala textos de nota con «BORRADOR»**: D dejó cinco comentarios que empezaban por «BORRADOR». integrar.mjs solo lo detectó en uno. Arreglo: añadir «BORRADOR» y «notas_integrador» a la lista de notas de trabajo que avisa.
8. **form4.mjs mezcla operaciones de Uber como accionista de otras empresas** (ventas de acciones de Aurora por 1.133 M USD declaradas en Form 4 con Uber como presentador): C tuvo que excluirlas a mano. Arreglo: filtrar por emisor (issuerCik = CIK de la empresa analizada).

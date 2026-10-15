# Puntos de método de la novena hora (15-oct-2026), para el hilo Mejoras

1. **El escáner sobrestima el ROIC − WACC fuera de las divisas que tiene** (Borregaard: +6 en el escáner, +2,6 en el informe con el bono noruego al 4,6 %). Falta la tasa libre de NOK (y DKK, MXN) en el perfil.
2. **SFS publica en Swiss GAAP FER**, que resta el fondo de comercio del patrimonio: sin sumarlo de vuelta, el ROIC sale el 14,8 % en vez del 8,1 % y la calidad pasa por error. Lección general para FER (Suiza).
3. **`cuentas.mjs --sec` falla con ejercicios que cierran en junio** (ADP) y con el cierre de septiembre-octubre de Tetra Tech; los agentes tiraron de companyfacts de la SEC.
4. **`cuentas.mjs --esef` aún no trae 2025** de Noruega ni de Suecia (Borregaard, Sweco).
5. **Yahoo rompe la serie de CPG.L** por el cambio de cotización a USD en Londres (1-abr-2026); Compass se hizo con el ADR CMPGY.
6. **Diez de 16 caen por valor intrínseco** con el escáner alineado en tipos. El filtro `margen_seguridad ≥ 1` del escáner usa el crecimiento pasado de las ventas; el informe, el futuro. Sigue pendiente de backtest la propuesta de la 8.ª (que Mejoras probó con el consenso y no mejoró).
7. **Citas de terceros en los informes**: el de Qualys (8.ª hora) atribuía a Qualys una sanción de la SEC por SolarWinds que fue a Unisys, Avaya, Check Point y Mimecast. Corregido (0c7635d). Conviene que el subagente compruebe en la fuente primaria cada sanción o litigio que cite.

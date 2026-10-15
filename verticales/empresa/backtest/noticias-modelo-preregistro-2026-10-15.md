# Preregistro: modelo de aprendizaje automático sobre las noticias (15-oct-2026)

Escrito **antes de tener ningún dato con resultado**. Lo pidió el usuario: «a medida que acumulemos señales, busquemos patrones, leads… machine learning con RSS». Lo ejecuta `herramientas/noticias-modelo.mjs`. Los criterios están en el código (`CRITERIO`) y no se cambian después de ver resultados; cualquier cambio exige un preregistro nuevo con fecha.

## Datos

- Una fila por noticia de un expediente de empresa (`noticias.mjs`, carpeta privada), quitando las de gravedad baja sin categoría y repetidas el mismo día con la misma categoría y el mismo tono.
- Rasgos: categoría, tono, gravedad, nº de medios, variación del precio a un mes, distancia al máximo de 52 semanas y a la media de 200 sesiones (todo con datos hasta ese día).
- Resultado: rentabilidad frente al índice de referencia (`reglas.json`, IWDA) a 5, 20 y 60 sesiones. El objetivo del modelo es **batir al índice a 20 sesiones**.
- Marcas para el análisis posterior, sin usarlas como rasgo: si la noticia acabó en lead, en candidata del escáner o en compra.

## Dos tipos de datos

1. **Histórico** (`noticias.mjs --historico`, 12 meses de Google Noticias cargados el 15-oct): sirve para entrenar y para explorar. **No vale para validar**, porque Google guarda lo que guarda (sesgo de supervivencia de las noticias) y las reglas de clasificación se afinaron mirando octubre de 2026.
2. **En vivo** (lo que recoge la vigilancia cada mañana desde el 16-oct-2026): es lo único que cuenta para validar.

## Validación (fijada ahora)

- Por meses hacia delante. En cada mes de prueba se entrena solo con filas cuyo resultado a 20 sesiones ya se conocía 30 días naturales antes de empezar ese mes. Se prueba en ese mes y no hay solapamiento.
- **El modelo es apto** solo si se cumplen las cinco condiciones:
  1. al menos 6 meses de entrenamiento;
  2. los **2 últimos meses de prueba son en vivo** (desde noviembre de 2026);
  3. hay al menos 2.000 filas de prueba en vivo;
  4. hay al menos 100 empresas;
  5. en esos 2 meses, el AUC es de al menos 0,55 **y** el decil con más probabilidad bate a la mediana del mes por 2 puntos o más a 20 sesiones.
- **Primera fecha posible:** el mes de prueba de diciembre necesita 20 sesiones más para tener resultado, así que la validación no puede ser antes de **mediados de enero de 2027**. Antes de eso, todo resultado es exploratorio y se dice como tal.

## Qué puede hacer si es apto

Solo **ordenar** los leads del día (cuál se mira primero) y proponer qué patrones convertir en reglas explícitas, cada una con su backtest (§4.10). No da señales, no cambia límites ni órdenes, y lo que llega al usuario sigue pasando el análisis completo, la compra robusta y la calidad. Para usarlo hace falta el visto bueno del usuario.

## Revisión

Se reentrena el primer domingo de cada mes con la rutina del backtest mensual. Si deja de cumplir los criterios en dos meses seguidos, vuelve a no apto.

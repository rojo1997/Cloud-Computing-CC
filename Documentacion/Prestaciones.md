# REFOOD
## Prestaciones
### Tests
Con el objetivo de realizar unos tests más representativos que en la anterior experimentación, y tomar las consideraciones oportunas para mejorar las prestaciones de nuestro servicio en relación a los resultados obtenidos, hemos diseñado unos tests que ejecutaremos emplando la herramienta OpenSource denominada **Taurus**.

Definiremos dos archivos .yml, donde configuraremos los tests a realizar para cada uno de los micro-servicios desarrollados. En estos archivos podremos encontrar las siguientes opciones de configuración:
* Concurrency: Establece el número de usuario simultáneos.
* Ramp-up: Tiempo en alcanzar el número de usuarios simultáneos establecido.
* Hold-for: Tiempo que se mantendrán dichos usuarios.
* Scenario: Nombre del escenario donde se definirán las peticiones a realizar.
* Default-address: Dirección base sobre la que se realizarán las peticiones, una vez compuestas por el campo url.
* Requests: Definición de peticiones a realizar.
* Url: Dirección sobre la que realizar la petición, obviando la dirección base.
* Method: Verbo HTTP a ejecutar sobre la dirección formada.

> Puede consultar el archivo de [prestaciones para el servicio de gestión de productos](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/gestion_de_productos_test_prestaciones.yml) si desea obtener más información.

> Puede consultar el archivo de [prestaciones para el servicio de análisis de recetas](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/analisis_test_prestaciones.yml) si desea obtener más información.

### Gestión de productos
Para la **experimentación** realizada sobre el micro-servicio de gestión de productos, se han lanzado **10 instancias** de la aplicación con el gestor de procesos pm2. Destacar que la base de datos asociada se encontraba iniciada en modo local. 

El **test** fue diseñado incrementando la concurrencia de usuarios, hata llegar a **4000 usuarios concurrentes**, con un tiempo de ramp-up de 10 segundos, mantenidos **durante 60 segundos**. Las peticiones realizadas fueron peticiones `GET`, sobre dos recursos diferentes, uno para la obtención de un **producto mediante su identificador**, y la segunda para obtener una **lista** completa de **productos** disponibles dado un **nombre** específico.

Para su ejecución, deberemos de emplear el siguiente comando:
```
bzt -report <nombre del fichero .yml del test> 
```
Con la opción `-report` indicamos que nos genere un reporte en html de manera que los resultados se presenten de una manera más visual y atractiva.

Los resultados obtenidos fueron los siguientes:

#### 10 usuarios concurrentes

![Prestaciones 10 users](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/test_10u_gp.png)

Como se puede comprobar, el nivel de prestaciones es bastante bueno, con una media de 2 ms de respuesta y casi 4000 hits/s.

En vista de los resultados, se pretendió observar cual es el límite de peticiones que puede soportar sin verse reducido considerablemente el valor de prestaciones obtenido, antes de llegar a superar el 0% de error en las peticiones servidas.

#### 3000 usuarios concurrentes

Se probó de esta forma con 3000 usuarios concurrentes, obteniendo los siguientes resultados:

![Prestaciones 3000 users](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/test_3000u_gp.png)

Como se puede ver, el número de hits/s se mantiene entorno al mismo valor que para 10 usuarios, sin dar error en las peticiones servidas. En contraposición, vemos como el tiempo medio de respuesta se ve severamente incrementado hasta 514 ms, sirviendose el 90% de las peticiones en 1.36s, lo que no sería un tiempo aceptable, aunque debemos tener claro el contexto en el que nos encontramos.

#### 4000 usuarios concurrentes

El siguiente experimento se realizó con 4000 usuarios concurrentes, valor en el que obtuvimos el límite soportado para gestionar las peticiones sin errores. En este caso obtuvimos un 11.45% de error en las peticiones servidas.

![Prestaciones 4000 users](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/test_4000u_gp.png)

#### 3000 usuarios concurrentes con un gran número de documentos

Por último, quisimos comprobar las prestaciones con un gran número de documentos en la BD, aproximadamente 12000 documentos formados por atributos compuestos o incrustados. Podemos ver como las prestaciones bajan considerablemente, aunque no se queda lejos del objetivo planteado de 1000 hits/s para 10 usuarios concurrentes, considerando que el experimento fue realizado con 3000 usuarios, aunque como podemos ver en los 2 primeros casos, no dista mucho la capacidad de servir a 10 que a 3000 en cuanto a hits/s se refiere. El tiempo de respuesta si se ve gravemente incrementado, llegando casi a 5 segundos.

![Prestaciones 3000 users con mayor número de documentos en la BD](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/test_3000u_gp_12000docs.png)

### Análisis de recetas
Para la **experimentación** realizada sobre el micro-servicio de análisis de recetas, se han lanzado **10 workers asincronos** de la aplicación con gunicorn empleando 2 hebras. Destacar que la base de datos asociada se encontraba iniciada en modo local. 

El proceso de experimentación realizado fue exactamente igual que para el micro-servicio de gestión de productos. En cuanto a las peticiones, se definieron dos peticiones GET, una que obtenía la colección de la base de datos completa, y la segunda, que obtenía una lista de recetas que contuviesen los ingredientes o productos pasados como parámetros.

Los resultados obtenidos fueron los siguientes:

#### 10 usuarios concurrentes

![Prestaciones 10 users](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/test_10u_ar.png)

Como se puede comprobar, el nivel de prestaciones similar al obtenido para el micro-servicio anterior. Los tiempos de respuesta son asequibles y los hits/s son algo superiores, aunque no daría especialmente relevancia a esta diferencia ya que para que el experimento fuera 100% comparable, habría que considerar el mismo tamaño para la BD.

#### 3000 usuarios concurrentes

Se probó de igual forma con 3000 usuarios concurrentes, obteniendo los siguientes resultados:

![Prestaciones 3000 users](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/test_3000u_ar.png)

Como era de esperar, sucede lo mismo que en el caso del anterior micro-servicio, manteniendo los hits/s, pero aumentando el tiempo de respuesta considerablemente.

#### 4000 usuarios concurrentes

Al igual que antes, obtuvimos el límite de peticiones soportadas sin errores en 4000 usuarios concurrentes, con un 11.38% de error.

![Prestaciones 4000 users](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/test_4000u_ar.png)


Cabe mencionar que se realizaron los experimentos para ambos micro-servicios empleando un servicio remoto de almacenamiento, pero el valor de prestaciones era pésimo, llegando apenas a 300 hits/s, debido a las limitaciones de red ofrecidas, al tratarse además de un servicio de almacenamiento gratuito. Fue por ello por lo que se decidió realizar la medición de prestaciones con una conexión local.
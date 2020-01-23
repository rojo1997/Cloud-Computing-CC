# REFOOD
* Gestión de productos
* Análisis de recetas

## Tests elaborados

### Gestión de productos 

Se han desarrollado una serie de **test** para comprobar la funcionalidad del microservicio de **gestión de productos**. Para ello hemos seguido una serie de **buenas prácticas**, y no solo se ha **comprobado** la **correcta funcionalidad** de cada una de las funcionalidades definidas, sino que éstas **fallen si deben de hacerlo** frente a entradas de argumentos erroneas, o salidas no esperadas.

Concretamente, para cada uno de los tipos de schemas definidos, se han **comprobado** tanto que la **salida** es la **esperada** frente a **argumentos** y campos de salida **válidos**, como que se produce una **excepción** cuando alguno de éstos no se encuentra definido o **no** es de un tipo **válido**.

Respecto a las **queries y mutaciones** desarrolladas para estas definiciones de tipos se han elaborado una serie de test a los que se les pasa como argumento uno de estos resolver, junto a los parámetros de entrada.

Para comprobar la **integración** del módulo de aplicación junto con la base de datos hemos hecho uso del módulo `supertest` al que le pasamos el módulo de la aplicación, y ejecutamos una llamada **POST** sobre el **endpoint graphql** definido, pasandole como **argumentos** la **mutación o query** que deseemos testear, comprobandose la **salida esperada** con la función `expect` del módulo **Chai**.

```
npm test
```

![Resultados de tests](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/tests_results.png)

### Análisis de recetas

Se han desarrollado una serie de **test** para comprobar la funcionalidad del microservicio de **análisis de recetas**. Al igual que para el micro-servicio de gestión de productos, se han seguido una serie de **buenas prácticas**, y no solo se ha **comprobado** la **correcta funcionalidad** de cada una de las funcionalidades definidas, sino que éstas **fallen si deben de hacerlo** frente a entradas de argumentos erroneas, o salidas no esperadas.

Para cada una de los posibles métodos habilitados para las peticiones `GET` y `POST` elaboradas para el recurso `receipes`, se han simulado las peticiones pertinentes empleando el módulo `testing` ofrecido por **falcon**, lo que nos ha facilitado enormemente el testeo del micro-servicio sin necesidad de emplear módulos adicionales.

Con el objetivo de ejecutar los tests y obtener el reporte de cobertura en codecov, se ha utilizado `coverage` junto a `unittest` para llevar a cabo dicha ejecución.

La orden definida para la realización de dichos tests definida en el tasks.py puede ser llamada empleando el siguiente comando:

```
invoke test --ms ar
```

De igual forma, podemos testear el servicio completo con la orden anterior no indicando ningún parámetro, o testear el micro-servicio de gestión de productos empleando el valor `gp` para el parámetro `--ms`.
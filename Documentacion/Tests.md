# REFOOD

## Tests elaborados
Se han desarrollado una serie de **test** para comprobar la funcionalidad del microservicio de **gestión de productos**. Para ello hemos seguido una serie de **buenas prácticas**, y no solo se ha **comprobado** la **correcta funcionalidad** de cada una de las funcionalidades definidas, sino que éstas **fallen si deben de hacerlo** frente a entradas de argumentos erroneas, o salidas no esperadas.

Concretamente, para cada uno de los tipos de schemas definidos, se han **comprobado** tanto que la **salida** es la **esperada** frente a **argumentos** y campos de salida **válidos**, como que se produce una **excepción** cuando alguno de éstos no se encuentra definido o **no** es de un tipo **válido**.

Respecto a las **queries y mutaciones** desarrolladas para estas definiciones de tipos se han elaborado una serie de test a los que se les pasa como argumento uno de estos resolver, junto a los parámetros de entrada.

Para comprobar la **integración** del módulo de aplicación junto con la base de datos hemos hecho uso del módulo `supertest` al que le pasamos el módulo de la aplicación, y ejecutamos una llamada **POST** sobre el **endpoint graphql** definido, pasandole como **argumentos** la **mutación o query** que deseemos testear, comprobandose la **salida esperada** con la función `expect` del módulo **Chai**.

```
npm test
```

![Resultados de tests](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/tests_results.png)

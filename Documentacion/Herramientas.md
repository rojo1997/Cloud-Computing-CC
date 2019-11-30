# REFOOD

## Herramientas
### Tests
Para el desarrollo y ejecución de los tests elaborados, se han empleado las siguientes herramientas o paquetes:

En primer lugar, hemos utilizado [**easygraphql-tester**](https://easygraphql.com/docs/getting-started/overview) que es una librería para Node Js creada para realizar **tests de GraphQL** basados en los **schemas**, que nos permitirá testear tanto estos schemas, como los **resolvers** (queries y mutaciones) que hallamos definido y desarrollado. Podremos comprobar así que las definiciones de tipos, campos requeridos o argumentos sean los correctos, entre otros.

> Esta documentación ha sido elaborada gracias a la documentación oficial. Si desea conocer más acerca del uso o posibilidades de esta librería visite [**EasyGraphQL**](https://easygraphql.com/docs/easygraphql-tester/overview/).

En un segundo nivel superior, hemos utilizado [**Mocha**](https://mochajs.org/) como marco de pruebas que usa un sistema denominado **Behavior Driven Development** o BDD, que nos permitirá definir nuestros tests de una manera descriptiva empleando un lenguaje natural.

Adicionalmente, se han llevado a cabo **tests de cobertura**, que nos permitirán obtener un **porcentaje** relativo al número de **líneas** de nuestro **código testeadas**, lo que nos será de gran utilidad para **comprobar** que partes de nuestro **código** se encuentran **sin testear**. Además nos permite incluir varias opciones como por ejemplo, que el test realizado no resulte satisfactorio a no ser que se supere un mínimo de cobertura (porcentaje de código testeado), o en caso de que esa cobertura se vea decrementada, con lo que **aseguramos** unos **mínimos de calidad**.

Para ello hemos utilizado [**Nyc**](https://github.com/istanbuljs/nyc) como cliente de línea de órdenes para [**Istanbul**](https://istanbul.js.org/) que trabaja bien con **mocha**, y que hemos integrado con [**Codecov**](https://github.com/istanbuljs/nyc/blob/master/docs/setup-codecov.md), que nos permitirá **reportar** los **resultados** del test de **cobertura** a la plataforma, desde la que podremos obtener información de un modo más visual en relación a dichos test realizados.

Puede consultar [**más información sobre los test**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Tests.md) que se han desarrollado.

### Construcción

buildtool: package.json

#### Package.json
Para el desarrollo de este proyecto se empleará [**package.json**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/package.json) como **herramienta de construcción**, donde definiremos las **dependencias** necesarias para que nuestro servicio pueda ejecutarse y responder de manera esperada. Además podremos definir una serie de **scripts** como comandos que se ejecutarán al ser llamados empleando la herramienta [**npm**](https://www.npmjs.com/) (node package manager), donde definiremos las órdenes necesarias para ejecutar los tests y generar los reportes mencionados sobre nuestro proyecto.

##### Dependencias
En este archivo encontraremos dos apartados de dependencias:
* `Dependecies`: En esta sección se incluyen las dependencias necesarias y que deben de ser instaladas para que nuestro proyecto funcione correctamente. Por ejemplo `express-graphql`.
* `devDependencies`: En esta entrada se añaden las dependencias necesarias para el desarrollo del proyecto, y que no serán necesarias para el estado de producción. Por ejemplo `mocha`.

Podemos incluir los paquetes o herramientas necesarias en nuestras dependencias empleando las siguientes órdenes:

```
npm install <paquete> --save
```
```
npm install <paquete> --save-dev
```
De esta forma, podremos emplear la siguiente orden para que nuestro proyecto se pueda ejecutar adecuadamente y no se generen conflictos de versiones o de falta de dependecias:
```
npm install 
```
Con esta orden, `npm` instalará aquellas dependecias que hallamos indicado en el package.json. de nuestro proyecto. 

##### Scripts
Como ya hemos mencionado, en esta sección podremos definir órdenes como una secuencia de comandos que podremos ejecutar con npm. En nuestro caso,por ahora solo hemos definido las órdenes **`start`**, **`stop`**, **`restart`** y **`test`**:

```
npm start
```
Tras ejecutar esta orden, se lanzarán 2 instancias del micro-servicio definido, accesibles en el puerto `8080`.

```
npm test 
```
Con esta orden, se realizarán los test y se enviarán los reportes del test de cobertura adiconal a la plataforma de [**codecov.io**](https://codecov.io/gh/yoskitar/Cloud-Computing-CC).

```
npm stop
```
Tras ejecutar esta orden, se detendrán las instancias del micro-servicio definido, accesibles en el puerto `8080`.

```
npm restart
```
Tras ejecutar esta orden, volverán a renaudarse las instancias detenidas del micro-servicio definido, accesibles en el puerto `8080`.

> Puede consultar el archivo [**package.json**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/package.json) si aún no lo ha hecho para una mejor comprensión, donde se encuentran los aspectos detallados anteriormente.
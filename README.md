[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
[![Build Status](https://travis-ci.org/yoskitar/Cloud-Computing-CC.svg?branch=master)](https://travis-ci.org/yoskitar/Cloud-Computing-CC)
[![codecov](https://codecov.io/gh/yoskitar/Cloud-Computing-CC/branch/master/graph/badge.svg)](https://codecov.io/gh/yoskitar/Cloud-Computing-CC)
[![DevQAGRX](https://img.shields.io/badge/DevQAGRX-blueviolet?style=svg&logo=Git)](https://github.com/JJ/curso-tdd)


# Cloud-Computing-CC
Repositorio para el desarrollo del proyecto y ejercicios pertenecientes a la asignatura de Cloud Comuting (CC-UGR).

## Tabla de contenidos
 1. **REFOOD**  
  1.1. **Descripción**  
  1.2. **Arquitectura**  
  1.3. **Herramientas para TDD**  
  1.4. **Integración continua**  
3. **Justificaciones**
4. **Licencia**  

## REFOOD
### Descripción
El proyecto que realizaremos ha sido denominado **ReFood** de acorde al **objetivo** principal del servicio, que es **evitar desechar alimentos**, poniéndolos a la venta a un menor precio, de manera que se incite a los consumidores a llevárselos antes de que perezcan. 

En el siguiente enlace, puede consultar más detalles relacionados con la [**descripción completa del servicio**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Descripci%C3%B3n.md).

### Arquitectura
Para el desarrollo del servicio descrito se empleará una **arquitectura basada en microservicios**, sobre la que desarrollaremos 3 micro-servicios. Aprovecharemos una de las ventajas que nos ofrece esta arquitectura para desarrollar los micro-servicios en el lenguaje que mejor nos permita realizar cada una de las funciones de éstos.


Puede obtener más información en el siguiente enlace, donde se encuentra toda la [**documentación de la arquitectura**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Arquitectura%20e%20infraestructura.md).


### Herramientas para el desarrollo basado en pruebas
#### Tests
Para el desarrollo y ejecución de los tests elaborados, se han empleado las siguientes herramientas o paquetes:

* **En primer lugar**, hemos utilizado [**easygraphql-tester**](https://easygraphql.com/docs/getting-started/overview) que es una librería para Node Js creada para realizar **tests de GraphQL** basados en los **schemas**, que nos permitirá testear tanto estos schemas, como los **resolvers** (queries y mutaciones) que hallamos definido y desarrollado. Podremos comprobar así que las definiciones de tipos, campos requeridos o argumentos sean los correctos, entre otros.

> Esta documentación ha sido elaborada gracias a la documentación oficial. Si desea conocer más acerca del uso o posibilidades de esta librería, visite [**EasyGraphQL**](https://easygraphql.com/docs/easygraphql-tester/overview/).

* **En un segundo nivel superior** , hemos utilizado [**Mocha**](https://mochajs.org/) como marco de pruebas que usa un sistema denominado **Behavior Driven Development** o BDD, que nos permitirá **definir** nuestros **tests** de una manera descriptiva empleando un **lenguaje natural**.

Adicionalmente, se han llevado a cabo **tests de cobertura**, que nos permitirán obtener un **porcentaje** relativo al número de **líneas** de nuestro **código testeadas**, lo que nos será de gran utilidad para **comprobar** que partes de nuestro **código** se encuentran **sin testear**. Además nos permite incluir varias opciones como por ejemplo, que el test realizado no resulte satisfactorio a no ser que se supere un mínimo de cobertura (porcentaje de código testeado), o en caso de que esa cobertura se vea decrementada, con lo que **aseguramos** unos **mínimos de calidad**.

Para ello hemos utilizado [**Nyc**](https://github.com/istanbuljs/nyc) como cliente de línea de órdenes para [**Istanbul**](https://istanbul.js.org/) que trabaja bien con **mocha**, y que hemos integrado con [**Codecov**](https://github.com/istanbuljs/nyc/blob/master/docs/setup-codecov.md), que nos permitirá **reportar** los **resultados** del test de **cobertura** a la plataforma, desde la que podremos obtener información de un modo más visual en relación a dichos test realizados.

Puede consultar [**más información sobre los test**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Tests.md) que se han desarrollado.

#### Construcción

buildtool: package.json

##### Package.json
Para el desarrollo de este proyecto se empleará [**package.json**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/package.json) como **herramienta de construcción**, donde definiremos las **dependencias** necesarias para que nuestro servicio pueda ejecutarse y responder de manera esperada. Además podremos definir una serie de **scripts** como comandos que se ejecutarán al ser llamados empleando la herramienta [**npm**](https://www.npmjs.com/) (node package manager), donde definiremos las órdenes necesarias para ejecutar los tests y generar los reportes mencionados sobre nuestro proyecto.

###### Dependencias
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

###### Scripts
Como ya hemos mencionado, en esta sección podremos definir órdenes como una secuencia de comandos que podremos ejecutar con npm. En nuestro caso,por ahora solo hemos definido la orden **`test`**, que se encargará de ejecutar los tests desarrollados empleando las herramientas de test definidas anteriormente.
```
npm test 
```
Así tras ejecutar esta orden, se realizarán los test y se enviarán los reportes del test de cobertura adicional a la plataforma de [**codecov.io**](https://codecov.io/gh/yoskitar/Cloud-Computing-CC).


> Puede consultar el archivo [**package.json**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/package.json) si aún no lo ha hecho para una mejor comprensión, donde se encuentran los aspectos detallados anteriormente.

### Integración continua
* Se ha empleado el sistema de integración continua [**TravisCI**](https://travis-ci.org/yoskitar/Cloud-Computing-CC), que hemos configurado empleando el archivo [**`.travis.yml`**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/.travis.yml) con el objetivo de que se ejecuten los test diseñados automáticamente tras realizar un push al repositorio.

* Adicionalmente se ha empleado como segundo sistema de integración continua [**GitHub Actions**](https://github.com/yoskitar/Cloud-Computing-CC/actions), con el que hemos testeado sobre la versión mínima para la que hemos ejecutado nuestros tests (8.16.2 Carbon).

#### .travis.yml
En este archivo de configuración encontramos diferentes secciones:
* **languaje**: En ésta se especifica el lenguaje con el que se ha desarrollado el proyecto.
* **<lenguaje indicado en `languaje`>**: En esta sección se indican las versiones del lenguaje sobre las que se ejecutarán las órdenes especificadas en el apartado `script`, que en nuestro caso, es la ejecución de los tests.
* **before_install**: Se indican las acciones necesarias a llevar a cabo antes de la ejecución de los scripts. En nuestro caso, la instalación de las dependencias necesarias con la orden `npm install`. **No es necesario instalar npm** ya que viene por **defecto instalado** en la **configuración** de **travisCI**.
* **script**: Aquí definiremos las órdenes que se llevarán a cabo, como por ejemplo, `npm test`, que lanzará la orden declarada en el package.json y que ejecutará los tests.

En nuestro caso, el lenguaje será `node_js`, y las **versiones mínima y máxima**  irán desde la versión sobre la que se está desarrollando localmente el proyecto (13.0.1), hasta la versión 8.16.2 (Carbon). Antes de que se ejecute la órden indicada en script, se ejcutará el comando `npm install` que instalará las dependencias requeridas, y posteriormente se ejecutará la orden `npm test`, que ejecutará los test y enviará los resultados del test de cobertura a la plataforma de [codecov](https://codecov.io/gh/yoskitar/Cloud-Computing-CC).
* Versiones de node testeadas con Travis-CI:
  * v13.0.1 --> Actual de desarrollo
  * v12.13.0 --> Erbium
  * v10.17.0 --> Dubnium

> Puede consultar el archivo [**.travis.yml**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/.travis.yml) si aún no lo ha hecho para una mejor comprensión, donde se encuentran los aspectos detallados anteriormente.

#### .github/workflows/IC-workflow.yml
Esta es la ruta donde se definen los archivos de configuración necesarios para ejecutar nuestros test empleando GitHub Actions. En este archivo de configuración podremos definir diferentes [**acciones**](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/configuring-a-workflow) tales como se muestran a continuación:

* **name**: Nombre asignado al workflow o acción definida en este archivo.
* **on**: Define cuando ejecutar el workflow, como por ejemplo en nuestro caso, al realizar push sobre el repositorio, indicado con `[push]`.
* **runs-on**: Indicamos el SO donde ejecutar las acciones. Además podemos definir estrategias donde podemos especificar tanto las versiones del SO, como del lenguaje con las que queremos ejecutar dichas acciones.
* **uses**: Nos permite importar una acción predefinida, como por ejemplo `actions/setup-node@v1` para especificar la versión con la que ejecutar las acciones.
* **run**: Nos permite ejeutar las ordenes que hemos definido en nuestra herramienta de construcción, como por ejemplo `npm test` para la ejecución de los tests.

Al igual que antes, el lenguaje empleado sera Node Js, pero en este caso, ejecutaremos los tests sobre la versión mínima para la que actualmente hemos testeado el servicio (8.16.2 Carbon). La forma de definir las diversas acciones a ejecutar es bastante similar a como se definen en .travis.yml, lo que facilita en una primera instancia su integración.

* Versión de node testeada con GitHub Actions:
  * v8.16.2 --> Carbon

> Puede consultar el archivo [**IC-workflow.yml**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/.github/workflows/continuous-integration-workflow.yml) si aún no lo ha hecho para una mejor comprensión, donde se encuentran los aspectos detallados anteriormente.

> Si desea obtener más información, consulte la [**documentación completa del proyecto**](https://github.com/yoskitar/Cloud-Computing-CC/tree/master/Documentacion).

## Justificaciones
[Justificaciones adicionales referentes a los diversos hitos de la asignatura.](https://github.com/yoskitar/Cloud-Computing-CC/tree/master/Justificaciones)

## Licencia
Para el desarrollo de este proyecto se ha seleccionado la licencia **GNU General Public License v3.0**, que es una de las menos restrictivas, permitiendo y garantizando el objetivo de software libre, al evitar la distribución de versiones de código cerrado.

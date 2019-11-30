# REFOOD
## Integración continua
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
* **env**: Nos permite emplear **variables de entorno** que podemos definir insitu, u obtenerlas desde el entorno de las variables declaradas en las sección **secrets de GitHub**.

Al igual que antes, el lenguaje empleado sera Node Js, pero en este caso, ejecutaremos los tests sobre la versión mínima para la que actualmente hemos testeado el servicio (8.16.2 Carbon). La forma de definir las diversas acciones a ejecutar es bastante similar a como se definen en .travis.yml, lo que facilita en una primera instancia su integración.

* Versión de node testeada con GitHub Actions:
  * v8.16.2 --> Carbon

> Puede consultar el archivo [**IC-workflow.yml**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/.github/workflows/continuous-integration-workflow.yml) si aún no lo ha hecho para una mejor comprensión, donde se encuentran los aspectos detallados anteriormente.
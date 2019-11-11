# REFOOD
## Integración continua
Se ha empleado el sistema de integración continua [**TravisCI**](https://travis-ci.org/yoskitar/Cloud-Computing-CC), que hemos configurado empleando el archivo [**`.travis.yml`**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/.travis.yml) con el objetivo de que se ejecuten los test diseñados automáticamente tras realizar un push al repositorio.

### .travis.yml
En este archivo de configuración encontramos diferentes secciones:
* **languaje**: En ésta se especifica el lenguaje con el que se ha desarrollado el proyecto.
* **<lenguaje indicado en `languaje`>**: En esta sección se indican las versiones del lenguaje sobre las que se ejecutarán las órdenes especificadas en el apartado `script`, que en nuestro caso, es la ejecución de los tests.
* **before_install**: Se indican las acciones necesarias a llevar a cabo antes de la ejecución de los scripts. En nuestro caso, la instalación de las dependencias necesarias con la orden `npm install`. **No es necesario instalar npm** ya que viene por **defecto instalado** en la **configuración** de **travisCI**.
* **script**: Aquí definiremos las órdenes que se llevarán a cabo, como por ejemplo, `npm test`, que lanzará la orden declarada en el package.json y que ejecutará los tests.

En nuestro caso, el lenguaje será `node_js`, y las **versiones mínima y máxima**  irán desde la versión sobre la que se está desarrollando localmente el proyecto (13.0.1), hasta la versión **X**. Antes de que se ejecute la órden indicada en script, se ejcutará el comando `npm install` que instalará las dependencias requeridas, y posteriormente se ejecutará la orden `npm test`, que ejecutará los test y enviará los resultados del test de cobertura a la plataforma de [codecov](https://codecov.io/gh/yoskitar/Cloud-Computing-CC).

> Puede consultar el archivo [**.travis.yml**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/.travis.yml) si aún no lo ha hecho para una mejor comprensión, donde se encuentran los aspectos detallados anteriormente.
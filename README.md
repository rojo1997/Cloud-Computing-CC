[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
[![Build Status](https://travis-ci.org/yoskitar/Cloud-Computing-CC.svg?branch=master)](https://travis-ci.org/yoskitar/Cloud-Computing-CC)
[![CircleCI](https://circleci.com/gh/yoskitar/Cloud-Computing-CC/tree/master.svg?style=svg)](https://circleci.com/gh/yoskitar/Cloud-Computing-CC/tree/master)
[![codecov](https://codecov.io/gh/yoskitar/Cloud-Computing-CC/branch/master/graph/badge.svg)](https://codecov.io/gh/yoskitar/Cloud-Computing-CC)
[![DevQAGRX](https://img.shields.io/badge/DevQAGRX-blueviolet?style=svg&logo=Git)](https://github.com/JJ/curso-tdd)


# Cloud-Computing-CC
Repositorio para el desarrollo del proyecto y ejercicios pertenecientes a la asignatura de Cloud Comuting (CC-UGR).

## Tabla de contenidos
 1. **REFOOD**  
  1.1. **Descripción**  
  1.2. **Arquitectura**  
  1.3. **Herramientas**  
  1.4. **Micro-servicios**  
  1.5. **Prestaciones**  
  1.6. **Contenedores**  
2. **Justificaciones**
3. **Licencia**  

## REFOOD
### Descripción
El proyecto que realizaremos ha sido denominado **ReFood** de acorde al **objetivo** principal del servicio, que es **evitar desechar alimentos**, poniéndolos a la venta a un menor precio, de manera que se incite a los consumidores a llevárselos antes de que perezcan. 

En el siguiente enlace, puede consultar más detalles relacionados con la [**descripción completa del servicio**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Descripci%C3%B3n.md).

### Arquitectura
Para el desarrollo del servicio descrito se empleará una **arquitectura basada en microservicios**, sobre la que desarrollaremos 3 micro-servicios. Aprovecharemos una de las ventajas que nos ofrece esta arquitectura para desarrollar los micro-servicios en el lenguaje que mejor nos permita realizar cada una de las funciones de éstos.


Puede obtener más información en el siguiente enlace, donde se encuentra toda la [**documentación de la arquitectura**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Arquitectura%20e%20infraestructura.md).


### Herramientas
#### Construcción
Como herramienta de construcción para el servicio completo, hemos reemplazado el **package.json** por **tasks.py**, aunque mantenemos el uso de las acciones definidas en éste.

> Puede consultar el archivo [**package.json**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/package.json) si aún no lo ha hecho para una mejor comprensión.

buildtool: tasks.py

Algunas de las tareas definidas son las siguientes:

#### Build
```
invoke install
```
Al invocar esta tarea, se instalaran las dependencias especificadas para cada uno de los respectivos micro-servicios; en el caso de python, localizadas en el `requirements.txt`, y en el `package.json` para NodeJs.

#### Start
```
invoke start
```
NOs permitirá iniciar el servicio completo, empleando `pm2` como gestor de procesos para el servicio NodeJs, gunicorn para el Api desarrollado con Falcon, y con Python iniciaremos una instancia del listener de la cola de mensajes desarrollado.

#### Stop
```
invoke stop
```
Nos permitirá detener los procesos del servicio ejecutados, empleando el comando `pkill` seguido del nombre del proceso, para el caso de Python, y la orden stop definida en el package.json para NodeJs, que detiene el proceso a través de pm2.

#### Tests
```
invoke test
```

>Puede consultar [**la información completa**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Herramientas.md) sobre los [test que se han desarrollado](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Tests.md).
Tras ejecutar esta orden, se realizarán los test y se enviarán los reportes del test de cobertura adicional a la plataforma de [**codecov.io**](https://codecov.io/gh/yoskitar/Cloud-Computing-CC).

>Puede consultar más información sobre las [herramientas de construcción](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Herramientas.md) empleadas.

#### Integración continua
* Se ha empleado el sistema de integración continua [**TravisCI**](https://travis-ci.org/yoskitar/Cloud-Computing-CC), que hemos configurado empleando el archivo [**`.travis.yml`**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/.travis.yml) con el objetivo de que se ejecuten los test diseñados automáticamente tras realizar un push al repositorio.

* Adicionalmente se ha empleado como segundo sistema de integración continua [**GitHub Actions**](https://github.com/yoskitar/Cloud-Computing-CC/actions), con el que hemos testeado sobre la versión mínima para la que hemos ejecutado nuestros tests (8.16.2 Carbon).

* Como tercer sistema de integración continua empleado para el testeo del micro-servicio de gestión de análisis hemos empleado [**CircleCI**](https://circleci.com/).

>Si lo desea, puede obtener toda la información relativa a la [documentación de integración continua](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Integraci%C3%B3n%20continua.md).

### Micro-servicios
Se han desarrollado 2 micro-servicios, empleando los lenguajes NodeJs y Python, junto a tecnologías como GraphQL y Falcon.

> Puede obtener la [información completa sobre el desarrollo y definición de arquitectura](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Micro-servicios.md), respetando el SSOT (Single Source of Truth) para cada uno de los dos micro-servicios desarrolados.

### Prestaciones
Se han llevado a cabo varios tests con el objetivo de analizar las prestaciones para cada uno de los micro-servicios desarrollados, empleando la herramienta `Taurus`, con la que ejecutar los tests definidos en ficheros como el siguiente: 

Prestaciones: gestion_de_productos_test_prestaciones.yml

En estos ficheros definimos la configuración del test a realizar. Se realizaron una serie de experimentos con la finalidad de obtener el mínimo de prestaciones establecido en 1000 hists/s para 10 usuarios simultáneos, superado con resultados de casi 4000 hists/s para 10 usuarios simultáneos para cada uno de los micro-servicios desarrollados.

> Puede obtener toda la [información relativa a los tests de prestaciones](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Prestaciones.md) realizados si desea conocer más.

### Contenedores
#### Publicación del contenedor docker
Una vez tenemos creada la imagen del contenedor y hemos comprobado que funciona adecuadamente, podemos publicarla en un repositorio de modo que otros usuarios puedan descargarse nuestra imagen y usarla. Para ello, podemos hacer uso de diversas plataformas que nos brindan dicha posibilidad. 

En nuestro caso, hemos seleccionado cuatro, [dockerhub](https://docs.docker.com/docker-hub/) y [github packages](https://help.github.com/es/github/managing-packages-with-github-packages/configuring-docker-for-use-with-github-packages), ambas bastante sencillas de utilizar, como explicaremos a continuación. La tercera ha sido publicada en [Google Cloud](https://cloud.google.com/cloud-build/) para posteriormente poder realizar el despliegue del contenedor en esta misma plataforma. Como cuarta opción encontramos [heroku](https://www.heroku.com), donde construiremos y desplegaremos el contenedor asociado al análisis de recetas. 

##### DockerHub
En la siguiente dirección encontramos publicado el contenedor del micro-servicio de gestión de productos:
```
Contenedor: https://hub.docker.com/r/yoskitar/cc-refood-gestiondeproductos
```

Adicionalmente, además de en heroku, se ha desplegado el segundo micro-servicio con la finalidad de en un futuro
poder realizar el provisionamiento de las máquinas virtuales de manera sencilla empleando los contenedore docker
publicados en dockerhub.
```
Contenedor ms análisis: https://hub.docker.com/r/yoskitar/cc-refood-analisisderecetas
```

##### Heroku
En la siguiente dirección encontramos desplegado el contenedor del micro-servicio de análisis de recetas:
```
Despliegue: https://cc-refood-analisis.herokuapp.com/
```

Algunas de las rutas disponibles para el recurso son:
* https://cc-refood-analisis.herokuapp.com/receipes?method=receipes&value=all
* https://cc-refood-analisis.herokuapp.com/receipes?method=byIngredients&value=Setas&value=Pollo

> Puede obtener la documentación completa referente a la [construcción de **Dockerfiles** y la automatización de la construcción y despliegue de los contenedores](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Contenedores%20Docker.md) si desea obtener más información.

## Justificaciones
[Justificaciones adicionales de la asignatura.](https://github.com/yoskitar/Cloud-Computing-CC/tree/master/Justificaciones)

## Licencia
Para el desarrollo de este proyecto se ha seleccionado la licencia **GNU General Public License v3.0**, que es una de las menos restrictivas, permitiendo y garantizando el objetivo de software libre, al evitar la distribución de versiones de código cerrado.

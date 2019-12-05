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
  1.3. **Herramientas**  
  1.4. **Micro-servicio: Gestión de productos**  
  1.5. **Contenedores**  
3. **Justificaciones**
4. **Licencia**  

## REFOOD
### Descripción
El proyecto que realizaremos ha sido denominado **ReFood** de acorde al **objetivo** principal del servicio, que es **evitar desechar alimentos**, poniéndolos a la venta a un menor precio, de manera que se incite a los consumidores a llevárselos antes de que perezcan. 

En el siguiente enlace, puede consultar más detalles relacionados con la [**descripción completa del servicio**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Descripci%C3%B3n.md).

### Arquitectura
Para el desarrollo del servicio descrito se empleará una **arquitectura basada en microservicios**, sobre la que desarrollaremos 3 micro-servicios. Aprovecharemos una de las ventajas que nos ofrece esta arquitectura para desarrollar los micro-servicios en el lenguaje que mejor nos permita realizar cada una de las funciones de éstos.


Puede obtener más información en el siguiente enlace, donde se encuentra toda la [**documentación de la arquitectura**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Arquitectura%20e%20infraestructura.md).


### Herramientas
#### Tests
Para el desarrollo y ejecución de los tests elaborados, se han empleado las siguientes herramientas o paquetes:

* **En primer lugar**, hemos utilizado [**easygraphql-tester**](https://easygraphql.com/docs/getting-started/overview) que es una librería para Node Js creada para realizar **tests de GraphQL** basados en los **schemas**, que nos permitirá testear tanto estos schemas, como los **resolvers** (queries y mutaciones) que hallamos definido y desarrollado. Podremos comprobar así que las definiciones de tipos, campos requeridos o argumentos sean los correctos, entre otros.

> Esta documentación ha sido elaborada gracias a la documentación oficial. Si desea conocer más acerca del uso o posibilidades de esta librería, visite [**EasyGraphQL**](https://easygraphql.com/docs/easygraphql-tester/overview/).

* **En un segundo nivel superior** , hemos utilizado [**Mocha**](https://mochajs.org/) como marco de pruebas que usa un sistema denominado **Behavior Driven Development** o BDD, que nos permitirá **definir** nuestros **tests** de una manera descriptiva empleando un **lenguaje natural**.

>Puede consultar [**la información completa**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Herramientas.md) sobre los test que se han desarrollado.

#### Construcción

buildtool: package.json

##### Package.json
Para el desarrollo de este proyecto se empleará [**package.json**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/package.json) como **herramienta de construcción**, donde definiremos las **dependencias** necesarias para que nuestro servicio pueda ejecutarse y responder de manera esperada. Además podremos definir una serie de **scripts** como comandos que se ejecutarán al ser llamados empleando la herramienta [**npm**](https://www.npmjs.com/) (node package manager), donde definiremos las órdenes necesarias para ejecutar los tests y generar los reportes mencionados sobre nuestro proyecto.

Algunas de las órdendes declaradas son las siguientes:

```
npm start
```
Tras ejecutar esta orden, se lanzarán 2 instancias del micro-servicio definido, accesibles en el puerto `8080`.

```
npm test 
```
Tras ejecutar esta orden, se realizarán los test y se enviarán los reportes del test de cobertura adicional a la plataforma de [**codecov.io**](https://codecov.io/gh/yoskitar/Cloud-Computing-CC).


> Puede consultar el archivo [**package.json**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/package.json) si aún no lo ha hecho para una mejor comprensión, donde se encuentran los aspectos detallados anteriormente.

>Puede consultar más información sobre las [herramientas de construcción](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Herramientas.md) empleadas.

#### Integración continua
* Se ha empleado el sistema de integración continua [**TravisCI**](https://travis-ci.org/yoskitar/Cloud-Computing-CC), que hemos configurado empleando el archivo [**`.travis.yml`**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/.travis.yml) con el objetivo de que se ejecuten los test diseñados automáticamente tras realizar un push al repositorio.

* Adicionalmente se ha empleado como segundo sistema de integración continua [**GitHub Actions**](https://github.com/yoskitar/Cloud-Computing-CC/actions), con el que hemos testeado sobre la versión mínima para la que hemos ejecutado nuestros tests (8.16.2 Carbon).

>Si lo desea, puede obtener más información en la [documentación de integración continua](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Integraci%C3%B3n%20continua.md).

### Micro-servicio: Gestión de productos
#### Gestión de productos
Como primer **micro-servicio** se ha desarrollado el relacionado con la **gestión** del catálogo de **productos** disponibles, el cual nos permitirá desde **registrar** nuevos productos, hasta modificar el estado de éstos o **obtener** una lista de los **productos** con la posibilidad de **filtrar** por diversos parámetros.

##### Arquitectura en capas
Nuestro micro-servicio presenta un modelo de **arquitectura** basada en **capas**, que nos facilita el seguir unas buenas prácticas como el TDD, permitiendonos testear nuestras clases independientemente de los módulos adicionales integrados. En nuestro caso distinguimos tres capas:

* **Nivel superior o de interfaz**: En esta capa se situaría el **Api-Graph**, que nos seviría de punto de acceso desde el exterior al interior de la lógica del micro-servicio. 
* **Nivel interno o de lógica**: En ésta se situarían todos nuestros modelos y esquemas de datos que graphql necesita para gestionar la lógica asociada a las funcionalidades definidas para los productos.
* **Nivel inferior o de almacenamiento**: En esta capa situaríamos la **integración** de nuestro micro-servicio con la **base de datos** donde almacenaremos la información relativa a nuestros productos. 

Esta organización nos facilita como se ha mencionado la realización de los **test unitarios** referentes a los tipos, schemas y modelos definidos, junto con los **test de integración** descritos para comprobar la integración de nuestra aplicación junto con la base de datos y dichos **modelos** y **schemas graphql** que actuarán de **interfaces**.

>Puede consultar la documentación restante referente al [desarrollo del micro-servicio](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Micro-servicios.md) si desea obtener más información.

##### Arranque automático
Entre las órdenes declaradas, podemos encontrar la órden `npm start`, definida en el archivo package.json, que a través del uso del gestor de procesos **pm2**, lanzará 2 instancias del micro-servicio empleando la opción `-i`, con la orden `start` seguida del módulo de la aplicación que se pretende ejecutar, y que recibirán el nombre de 'gp' (gestión de productos), indicado con el flag `--name` (gestión de productos).

Como **consideración adicional**, deberemos de definir un archivo de **variables de entorno** donde definir las siguientes variables:
* `PORT`: **Puerto** desde el que se encontrará accesible el micro-serivicio.
* `DB`: URI de la **base de datos** que empleará mongoose para conectarse.

> Si desea conocer más información sobre las órdenes definidas, puede consultar el fichero de [documentación de herramientas](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Herramientas.md).

> Puede consultar directamente el arhivo [package.json](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/package.json) si desea obtener más detalles.

### Contenedores
#### Dockerfiles
##### Imagen base
Para la realización del **contenedor docker** asociado al micro-servicio de **gestión de productos**, se han desarrollado varios **dockerfiles** con el objetivo de seleccionar aquel que nos ofrezca unas mejores prestaciones.

Para ello, hemos empleado dos **imágenes base** distintas:
* La primera [imagen](https://hub.docker.com/_/alpine) seleccionada es `alpine:latest`, ya que se trata de una imagen muy básica y ligera basada en **Linux** de tan solo **5 MB**. A partir de ésta será necesario instalar los paquetes y las dependencias necesarias para poder ejecutar nuestro micro-servicio satisfactoriamente.

* Como segunda imagen hemos empleado `node:alpine`, como se mostraba en el [repositorio](https://github.com/nodejs/docker-node) de **node js** junto al uso de **docker**. Para esta segunda imagen no será necesario instalar ningún paquete base, puesto que vienen instaladas por defecto las herramientas necesarias. Tan solo tendremos que instalar las dependencias de nuestra aplicación.

Tras construir los contenedores asociados a cada uno de las imágenes mencionadas, **listamos** con la orden `sudo docker images`, los dos contenedores creados para **comprobar** el **tamaño** de cada uno. Para la imagen de **alpine**, el tamaño del contenedor era de **121 MB**, mientras que para el caso de la imagen de **node** era de **176 GB**. 

A continuación, se procedió a emplear la herramienta [Apache Benchmark](https://httpd.apache.org/docs/2.4/programs/ab.html), para comprobar las prestaciones de cada uno de estos contenedores una vez iniciados, haciendo uso de la orden **ab** como se muestra a continuación:
```
ab -c <Número de request lanzadas simultáneamente> -n <Número de request en total> <URL>
```
>Puede consultar los [experimentos realizados junto a los resultados](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Contenedores%20Docker.md) si desea conocer más detalles.

Tras comparar los resultados, vimos como la imagen **Node:Alpine** presenta unas mejores prestaciones con unos **mejores tiempos de respuesta** para todos los casos de experimentación realizados. Por esta razón, y puesto que el tamaño de la imagen en nuestro caso apenas es superior, seleccionaremos dicha imagen como base para nuestro contenedor.


##### Construcción del archivo dockerfile
Para la **construcción** de un **dockerfile** debemos tener en cuenta varias etiquetas que nos permitirán definir desde la imagen base de nuestro contenedor, hasta las acciones o comandos a ejecutar:
* `FROM`: Nos permite establecer la **imagen base** del contenedor.
* `LABEL`: Nos permite generar **etiquetas** a las que **asignar** un **valor**, como en nuestro caso, el nombre del encargado de mantener el repositorio.
* `RUN`: **Ejecuta** la **acción** especificada a continuación de ésta. Nos permitirá por ejemplo, instalar paquetes necesarios para la ejecución de una acción concreta.
* `WORKDIR`: Servirá para especificar el **directorio de trabajo** dentro del contenedor docker.
* `COPY`: Permite copiar elementos de una ruta a otra.
* `EXPOSE`: Se empleará a **modo informativo** para indicar el **puerto expuesto** internamente en nuestro contenedor para la ejecución del micro-servicio.
* `USER`: Establece el **usuario** asociado dentro del **contenedor**.
* `CMD`: **Ejecuta** el **comando** indicado como parámetro **cada vez que** el **contenedor es ejecutado**. La emplearemos en nuestro caso para lanzar nuestro micro-servicio.

> Puede consultar más información relativa a las diferentes opciones en la [documentación de docker](https://docs.docker.com/get-started/part2/).

###### Alpine dockerfile
En nuestro caso, el [dockerfile](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/DockerfileAlpine) concreto que hemos definido empleando la imagen de **alpine:latest** tiene la siguiente estructura:
```
FROM alpine:latest
LABEL maintainer="osc9718@gmail.com"
RUN apk add --no-cache nodejs npm 
WORKDIR /usr/src
COPY package*.json ./
RUN npm install --production
COPY app/graphql app/graphql/
COPY app/models app/models/
COPY app/utils app/utils/
COPY app/app.js app/
COPY .babelrc .
COPY LICENSE .
EXPOSE 8080
RUN adduser -D dockeruser
USER dockeruser
CMD ["npm","start"]
```

>Si lo desea, puede otener toda la información relativa al [detalle de la construcción de los diversos dockerfiles](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Contenedores%20Docker.md) elaborados en la documentación de contenedores del repositorio.


#### Publicación del contenedor docker.
Una vez tenemos creada la imagen del contenedor y hemos comprobado que funciona adecuadamente, podemos publicarla en un repositorio de modo que otros usuarios puedan descargarse nuestra imagen y usarla. Para ello, podemos hacer uso de diversas plataformas que nos brindan dicha posibilidad. 

En nuestro caso, hemos seleccionado tres, [dockerhub](https://docs.docker.com/docker-hub/) y [github packages](https://help.github.com/es/github/managing-packages-with-github-packages/configuring-docker-for-use-with-github-packages), ambas bastante sencillas de utilizar, como explicaremos a continuación. La tercera ha sido publicada en [Google Cloud](https://cloud.google.com/cloud-build/) para posteriormente poder realizar el despliegue del contenedor en esta misma plataforma.

##### DockerHub
Lo primero que deberemos de hacer será de disponer de una cuenta en [dockerhub](https://docs.docker.com/docker-hub/), y crear un repositorio, clickando sobre el botón `create repository`. Una vez creado, deberemos logearnos con el comando `docker login`, que nos solicitará nuestro usuario y contraseña para la cuenta de dockerhub creada. Tras estos primeros pasos, usaremos el siguiente comando, que publicará el contenedor indicado, en el repositorio que especifiquemos:
```
sudo docker push <nombre de usuario>/<repositorio>
```
En nuestro caso:
```
sudo docker push yoskitar/cc-refood-gestiondeproductos
```
Aclararemos que el ID del contenedor tendrá la forma `<nombre de usuario>/<repositorio>`, de modo que coincida con la anterior orden.

Tras esto, el contenedor se encontrará accesible en la siguiente dirección:

```
Contenedor: https://hub.docker.com/r/yoskitar/cc-refood-gestiondeproductos
```
De este modo, podemos descargarnos y hacer uso del contenedor con el siguiente comando:
```
sudo docker pull yoskitar/cc-refood-gestiondeproductos:latest
```
###### Construcción automática del contenedor en DockerHub
Una vez realizados los pasos anteriores, podemos configurar nuestro proyecto en Dockerhub para que cada vez que se realice un push al repositorio vinculado en GitHub, se reconstruya automáticamente el contenedor con las modificaciones añadidas. Para ello bastará con vincular dicho repositorio en GitHub, con el de DockerHub, como se muestra en la siguiente imagen:

![DockerHub Auto-Build](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/docker-hub-auto-build.png)

##### GitHub Packages
Este caso es igual de simple que el anterior, aunque deberemos de tener en cuenta algunas consideraciones a la hora de nombrar los repositorios como las imágenes.

Lo primero que necesitaremos será disponer de un **token de usuario de github** con permisos de lectura de paquetes. Para ello deberá dirigirse a la sección settings de su cuenta en github y crear un nuevo token. 

>Puede consultar más información sobre como crear un token de acceso en la siguiente [documentación](https://help.github.com/es/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

Una vez disponemos de nuestro token, deberemos **logearnos** empleando nuestro nombre de usuario de github y el token obtenido, tal como se muestra en el siguiente comando:
```
sudo docker login docker.pkg.github.com -u <username> -p <token>
```

Tras ello, deberemos de ejecutar la siguiente orden:
```
sudo docker tag <image ID> docker.pkg.github.com/<owner>/<repository>/<image name>:<version>
```
Donde deberemos completar los respectivos campos con los datos del contenedor que hemos creado. En nuestro caso quedaría:
```
 sudo docker tag 8dd8b0974200 docker.pkg.github.com/yoskitar/cloud-computing-cc/cc_refood_gestiondeproductos:latest
```
Una vez realizado, tan solo queda **publicar el contenedor** en el repositorio de la siguiente forma:
```
docker push docker.pkg.github.com/<owner>/<repository>/<image name>:<version>
```
En nuestro caso:
```
sudo docker push docker.pkg.github.com/yoskitar/cloud-computing-cc/cc_refood_gestiondeproductos:latest
```

Tras esto, nuestro contenedor se encontrará **accesible** desde la siguiente ruta:
```
https://github.com/yoskitar/Cloud-Computing-CC/packages/65803
```

Al igual que para dockerhub, podremos **descargar** la imagen empleando la orden:
```
docker pull docker.pkg.github.com/yoskitar/cloud-computing-cc/cc_refood_gestiondeproductos:latest
```
O incluso hacer **uso** de ella directamente en nuestro **dockerfile** como **imagen base** con el comando:
```
FROM docker.pkg.github.com/yoskitar/cloud-computing-cc/cc_refood_gestiondeproductos:latest
```

>Puede consultar más información sobre como trabajar con github packages en la [documentación oficial](https://help.github.com/es/github/managing-packages-with-github-packages/configuring-docker-for-use-with-github-packages).

###### Construcción automática del contenedor en GitHub Packages
En este caso, si será necesario redactar un par de líneas de código. Deberemos de crear un **workflow** si no lo habíamos creado ya, donde configuraremos la **acción de github** que nos permitirá **construir** el **contenedor** cada vez que se de la condición de activación del workflow, como en nuestro caso, será el **push** al repositorio.

>Puede consultar más información sobre la construcción del workflow elaborado para este proyecto en la documentación sobre [Integración continua](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Integraci%C3%B3n%20continua.md).

El código que deberemos de añadir a dicho workflow será el siguiente:
```
- name: Publish Docker Image to GPR
        uses: JJ/gpr-docker-publish@master
        with:
          IMAGE_NAME: 'cc_refood_gestiondeproductos'
          DOCKERFILE_PATH: 'Dockerfile'
          BUILD_CONTEXT: '.'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          INPUT_TAG: latest
```
Haremos así uso de la acción localizada en el [repositorio indicado](https://github.com/machine-learning-apps/gpr-docker-publish), aunque concretamente, la versión forkeada por el [repositorio de JJ](https://github.com/JJ/gpr-docker-publish), ya que solventa el error relacionado con la imposibilidad de introducir mayúsculas en el nombre del repositorio o contenedor. En esta acción indicaremos el **nombre** de la imagen, la **ruta** donde se encuentre el ****dockerfile**, y el **contexto** donde se construirá la imagen; todos estos parámetros de igual forma a cuando lo construimos manualmente. Como **tag** se emplearán los 12 primeros caracteres del código SHA generado tras la construcción del contenedor. Con la etiqueta `INPUT_TAG` establecemos la imagen del contenedor publicada como la versión **latest**. **Adiconalmente**, recordaremos que era necesario incluir un **token de autorización de GitHub** para permitir la lectura y escritura en GitHub Packages. En este caso lo usaremos a través de la variable de entorno definida en la etiqueta `env`. Si desea obtener más información respecto al uso de cada una de las etiquetas, puede consultar la nota anterior para acceder a la documentación sobre integración continua, donde se detallan.

##### Google Cloud
###### Construcción automática del contenedor en Google Cloud
Para este tercer caso, deberemos primeramente disponer de una cuenta en la plataforma con la facturación activada, que en mi caso, al disponer de la beca estudiantil ofrecida por el porfesor JJ para el curso de Cloud Computing, ha resultado suficiente, sin tener que añadir otra cuenta personal adicional.

Una vez tengamos acceso, deberemos de **crear un proyecto**, en el que instalaremos la Api de **Cloud-Build**, siguiendo la siguiente [documentación](https://cloud.google.com/cloud-build/docs/run-builds-on-github), que nos instalará dicha api para el repositorio que indiquemos en GitHub.

Una vez instalada, nos ofrece una herramienta denominada **triggers** o activadores, con los que podemos programar que se ejecute la build del contenedor cada vez que se realice un push al repositorio, como se muestra en la [documentación oficial](https://cloud.google.com/cloud-build/docs/running-builds/automate-builds). Para ello podemos emplear un archivo **dockerfile**, o bien, elaborar un archivo **cloudbuild.yml** y subirlo a nuestro repositorio, que la api empleará por defecto en lugar del dockerfile, donde podremos programar las acciones a realizar, como la construcción del contenedor, y posteriormente, su despliegue.

En nuestro caso por ahora, hemos usado el dockerfile, ya que para el uso de variables de entorno secretas será necesario elaborar lo que ellos denominan, un **llavero**, junto con una **clave de encriptación**, con el que haciendo uso de una de las herramientas que ofrecen denominada [KMS](https://cloud.google.com/cloud-build/docs/securing-builds/use-encrypted-secrets-credentials), podremos encriptar y desencriptar nuestro archivo `.env` para usar dichas variables de entorno dentro de nuestro contenedor de forma segura. Por todo ello y por motivos de tiempo, no hemos podido desplegar el contenedor de forma automática siguiendo este procedimiento, aunque se llevará a cabo para actualizaciones del repositorio.

Siguiendo con la construcción automática del contenedor, una vez llevado a cabo todas las acciones anteriores, cada vez que realizemos un push en el repositorio, podremos consultar el estado de la build del contenedor en la sección de **actions de GitHub**, que nos mostrará si todo ha salido bien, o se han producido fallos en la construcción.

>Puede consultar más información sobre como trabajar con github packages en la [documentación oficial](https://help.github.com/es/github/managing-packages-with-github-packages/configuring-docker-for-use-with-github-packages).

> Si desea obtener más información, consulte la [**documentación completa del proyecto**](https://github.com/yoskitar/Cloud-Computing-CC/tree/master/Documentacion).

## Justificaciones
[Justificaciones adicionales de la asignatura.](https://github.com/yoskitar/Cloud-Computing-CC/tree/master/Justificaciones)

## Licencia
Para el desarrollo de este proyecto se ha seleccionado la licencia **GNU General Public License v3.0**, que es una de las menos restrictivas, permitiendo y garantizando el objetivo de software libre, al evitar la distribución de versiones de código cerrado.

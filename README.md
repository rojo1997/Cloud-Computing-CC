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
Como primer **micro-servicio** se ha desarrollado el relacionado con la **gestión** del catálogo de **productos** disponibles, el cual nos permitirá desde **registrar** nuevos productos, hasta modificar el estado de éstos o **obtener** una lista de los **productos** con la posibilidad de **filtrar** por diversos parámetros.

#### Arquitectura en capas
Nuestro micro-servicio presenta un modelo de **arquitectura** basada en **capas**, que nos facilita el seguir unas buenas prácticas como el TDD, permitiendonos testear nuestras clases independientemente de los módulos adicionales integrados. En nuestro caso distinguimos dos capas:

* **Nivel superior**: En esta capa se situaría el **Api-Graph**, que nos seviría de punto de acceso desde el exterior al interior de la lógica del micro-servicio. 
* **Nivel interno**: En ésta se situarían todos nuestros modelos y esquemas de datos que graphql necesita para gestionar la lógica asociada a las funcionalidades definidas para los productos.
* **Nivel inferior**: En esta capa situaríamos la **integración** de nuestro micro-servicio con la **base de datos** donde almacenaremos la información relativa a nuestros productos. 

Esta organización nos facilita como se ha mencionado la realización de los **test unitarios** referentes a los tipos, schemas y modelos definidos, junto con los **test de integración** descritos para comprobar la integración de nuestra aplicación junto con la base de datos y dichos **modelos** y **schemas graphql** que actuarán de **interfaces**.

#### Api-GraphQL
Como ya se mencionó en la descripción del servicio junto a la [documentación de su infraestructura](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Arquitectura%20e%20infraestructura.md), para el micro-servicio de gestión de productos se emplará el framework de aplicaciones web [**express**](https://expressjs.com/es/starter/hello-world.html) para Node Js, junto con el módulo [**express-graphql**](https://graphql.org/graphql-js/running-an-express-graphql-server/) que nos permitirá crear nuestro **GraphQL API server**.

>Puede consultar más detalles referentes a la [implementación del módulo app](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/app.js) si desea obtener más información.

##### Schemas
GrahpQL se basa en la **definición** de una serie de **schemas** que definen la **estructura** y los **tipos** de los **modelos de datos** que podremos encontrar, junto a las **funcionalidades** que tendrán y tipos de éstas.

Como ejemplo ilustraremos una de las partes de la definición de schemas para la clase producto:
```
type Product{
    _id: ID!
    name: String!
    description: Description!
    state: String!
    owner: String!
    createdAt: String!
}
```
Observamos como haciendo uso de la palabra reservada `type`, seguida del nombre del tipo a definir, podremos establecer los diversos **atributos** que tendrá junto a sus tipos. El uso del caracter `!` nos servirá para establecer **restricciones** de manera que dicho atributo deba de contener un valor, del tipo indicado, sin posibilidad de ser null.

**Destacar** que cuando el **tipo** a definir deba **actuar** como una definición para un tipo de **entrada**, deberemos de emplear la palabra reservada `input`.

Adicional a los tipos de datos que definamos para las clases de nuestro modelo, debremos definir dos tipos adicionales:
* `Query`: Dentro de este tipo deberemos definir las consultas o resolvers cuya finalidad sea la de obtener unos resultados de una búsqueda. Por ejemplo, en nuestro caso tenemos:
```
type Query{
    productById(_id: String!): Product     
    productByName(name: String!): [Product]                           
    products: [Product]                                                
}
```

* `Mutation`: En este tipo deberemos definir los resolvers cuya finalidad sea la de realizar algún cambio en el modelo de datos. En nuestro caso:

```
type Mutation{
    registerProduct(name: String!, description: iDescription!, state: String, owner: String): Response
    modifyProductState(_id:String!, state: String!): Response
}
```
> Puede consultar mas detalles sobre la [definición de tipos](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/graphql/types/Product/index.js) completa si desea obtener más información.

##### Models
Para la integración de nuestro micro-servicio junto con la base de datos en MongoDB, haremos uso del cliente `mongoose`, para el que deberemos de definir los **modelos** de esquema de los **documentos** para las diferentes **colecciones** que definamos, que en nuestro caso, será la colección 'productos'.

Es por ello que atendiendo a la definición de tipos o **types**, crearemos los `schemas` de mongoose. En esta definición emplearemos una herramienta que nos será de gran utilidad a la hora de gestionar pre-condiciones como por ejemplo la seguridad en una contraseña, la longuitud de un nombre de usuario, o la definición de un correo. Esto se puede hacer de una manera extremadamente fácil gracias al módulo `mongoose-validator`.

Como ejemplo, en nuestro caso hemos establecido la restricción de que el nombre del producto deba de ser una cadena de entre 2 y 20 caracteres:
```
const ProductSchema = new Schema({
	name: {
		type: String,
		validate: [
			validate({
				validator: 'isLength',
				arguments: [2,20],
				message: 'El nombre de producto debe contener entre {ARGS[0]} Y {ARGS[1]} caracteres.'
			})
		]
	},
```
Para ello, hemos empleado como se puede ver en el ejemplo, el **validador** `isLength` para la longuitud, cuyos **argumentos** son el mínimo y máximo de la longuitud deseada, junto al **mensaje** que se lanzará si no se cumple la **pre-condición**.

>Si desea conocer más detalles, puede consultar las [posibilidades de validación](https://www.npmjs.com/package/mongoose-validator) para obtener más información.

>Puede consultar la [definición del modelo](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/models/Product.js) completa si desea obtener más detalles.

##### Resolvers
Una vez tenemos la definición de `types`, podremos implementar los resolvers atendiendo a su definición de tipo.

Deberá presentar la misma estructura que en dicha definición, declarando en un nivel superior, `Query` junto a `Mutation`, dentro de las cuales definiremos las funciones respectivas.

En los resolvers definiremos la **lógica** de nuestra aplicación, por lo que lo que llevemos a cabo en éstos dependerá de las funcionalidades que deseemos implementar en nuestro micro-servicio. De acuerdo a ésto, en nuestro caso hemos desarrollado las siguientes funcionalidades, en consonancia con las [**historias de usuario**](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Estudio%20del%20dominio%20del%20problema.md) identificadas para la **gestión de productos**:
* **Consulta de productos**
    * **productById**: Obtener un **producto** por su **identificador** único.
    * **productByName**: Obtener una **lista** producto por un **nombre**.        
    * **products**: Obtener el **catálogo completo** de productos.         

* **Registro de productos**
    * **registerProduct**: **Registrar** un nuevo **producto**.

* **Modificación del estado de productos**
    * **modifyProductState**: **Modificar** el **estado** de un producto en caso de que algún usuario lo reserve o lo compre.

Como ejemplo, ilustraremos la implementación de la consulta del catálogo completo de productos:
```
products: async () => {
                return new Promise((resolve, reject) => {
                    Product.find()
                    .exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                });
        }
```
Empleando el **modelo de mongoose** creado para los documentos de la **colección de productos**, ejecutamos el comando `find`, que nos devolverá un array con todos los documentos encontrados en la colección.

> Puede consultar la [implementación de los resolvers](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/graphql/resolvers/Product/index.js) completa si desea conocer más detalles.

#### Arranque automático
Entre las órdenes declaradas, podemos encontrar la órden `npm start`, definida en el archivo package.json, que a través del uso del gestor de procesos **pm2**, lanzará 2 instancias del micro-servicio empleando la opción `-i`, que recibirán el nombre de gp (gestión de productos).

Como **consideración adicional**, deberemos de definir un archivo de **variables de entorno** donde definir las siguientes variables:
* `PORT`: **Puerto** desde el que se encontrará accesible el micro-serivicio.
* `DB`: URI de la **base de datos** que empleará mongoose para conectarse.

> Si desea conocer más información sobre las órdenes definidas, puede consultar el fichero de [documentación de herramientas](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Herramientas.md).

> Puede consultar directamente el arhivo [package.json](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/package.json) si desea obtener más detalles.


### Contenedores
#### Dockerfiles
##### Imagen base
Para la realización del **contenedor docker** asociado al micro-servicio de **gestión de productos**, se han desarrollado varios **dockerfiles** con el objetivo de **reducir** el **tamaño** del contenedor al **menor espacio** posible.

Para ello, hemos empleado dos **imágenes base** distintas:
* La primera [imagen](https://hub.docker.com/_/alpine) seleccionada es `alpine:latest`, ya que se trata de una imagen muy básica y ligera basada en **Linux** de tan solo **5 MB**. A partir de ésta será necesario instalar los paquetes y las dependencias necesarias para poder ejecutar nuestro micro-servicio satisfactoriamente.
* Como segunda imagen hemos empleado `node:latest`, como se mostraba en la [guía](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/) de **node js** junto al uso de **docker**. Para esta segunda imagen no será necesario instalar ningún paquete base, puesto que vienen instaladas por defecto las herramientas necesarias. Tan solo tendremos que instalar las dependencias de nuestra aplicación.

Tras construir los contenedores asociados a cada uno de las imágenes mencionadas, **listamos** con la orden `sudo docker images`, los dos contenedores creados para **comprobar** el **tamaño** de cada uno. Para la imagen de **alpine**, el tamaño del contenedor era de **121 MB**, mientras que para el caso de la imagen de **node** era de **1.05 GB**. Tras comprobar este resultado, seleccionamos la imagen de **alpine** como **imagen base** de nuestro **contenedor**.

##### Construcción del archivo dockerfile
Para la **construcción** de un **dockerfile** debemos tener en cuenta varias etiquetas que nos permitirán definir desde la imagen base de nuestro contenedor, hasta las acciones o comandos a ejecutar:
* `FROM`: Nos permite establecer la **imagen base** del contenedor.
* `RUN`: **Ejecuta** la **acción** especificada a continuación de ésta. Nos permitirá por ejemplo, instalar paquetes necesarios para la ejecución de una acción concreta.
* `WORKDIR`: Servirá para especificar el **directorio de trabajo** dentro del contenedor docker.
* `COPY`: Permite copiar elementos de una ruta a otra.
* `EXPOSE`: Se empleará a **modo informativo** para indicar el **puerto expuesto** internamente en nuestro contenedor para la ejecución del micro-servicio.
* `CMD`: **Ejecuta** el **comando** indicado como parámetro **cada vez que** el **contenedor es ejecutado**. La emplearemos en nuestro caso para lanzar nuestro micro-servicio.

> Puede consultar más información relativa a las diferentes opciones en la [documentación de docker](https://docs.docker.com/get-started/part2/).

###### Alpine dockerfile
En nuestro caso, el [dockerfile](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Dockerfile) concreto que hemos definido tiene la siguiente estructura:
```
FROM alpine:latest
RUN apk add --no-cache nodejs npm 
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8080
CMD ["npm","start"]
```
* En éste observamos como la **imagen** a partir de la que construiremos el contenedor será la última versión de **alpine** como se ha indicado anteriormente, indicada en la opción `FROM`. 

* Puesto que necesitaremos **node js** para la ejecución del micro-servicio y **npm** para la instalación de las dependencias necesarias, **deberemos** de **instalarlas** ya que no vienen instaladas por defecto en dicha imagen. Esto lo haremos con la opción `RUN`. En ésta llamaremos a la **herramienta de gestión** de paquetes de Alpine Linux denominada `apk`, que nos permitirá **instalar** con la opción `add` los paquetes deseados. El **flag** `--no-cache` nos permitirá reemplazar el update, reduciendo el tamaño del contenedor al **no** emplear ningún **índice** de **cache** local.

* Como **directorio de trabajo** hemos definido la ruta `/usr/src/app` dentro del contenedor, ya que se trata de una ruta 'estandarizada' a lo largo de la literatura y de numerosos [ejemplos](https://docs.docker.com/get-started/part2/), aunque se podría definir cualquier otra.

* Como deberemos de intalar las dependencias de nuestra aplicación, indicadas en el archivo package.json, lo copiaremos al directorio definido. El asterisco nos permitirá copiar además el package-lock, en caso de que la verisón de npm sea inferior a la 4, con lo que no se generaría. **Nótese**, que en vez de copiar todo el contenido, aprovecharemos la **construcción por capas** que nos ofrece docker para intentar **optimizar la construcción de nuestros contenedores**. Ello se debe a que docker tratará de usar una **capa existente en cache** para la construcción de una nueva capa.

>Si desea obtener más información relativa a la construcción de dockerfiles de una manera eficiente, puede consultar el siguiente [recurso](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/).

* Una vez copiado el package.json, ejecutamos con el comando `RUN` la orden **install** junto con el **flag --production** para instalar solo las **dependencias** del entorno de **producción** y minimizar el tamaño del contenedor, evitando instalar también las dependencias de desarrollo.

* A continuación, **copiamos** en el directorio de trabajo el contenido de los **fuentes** de nuestra **aplicación**, localizados en la misma ruta que el archivo dockerfile.

* Indicamos a modo informativo el **puerto interno expuesto** del contenedor, que en nuestro caso será el `:8080`.

* Por último, especificamos la órden que se lanzará cada vez que el contenedor sea ejecutado, a través del comando `CMD`. En nuestro caso, la órden **start** definida en el package.json a través de **npm**, que lanzará con el gestor de procesos pm2, 2 instancias de la aplicación.

###### Node dockerfile
Respecto a la contrucción del segundo [dockerfile](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/DockerfileNode), destacaremos las principales diferencias, que serán en nuestro caso, la imagen base seleccionada (node:latest), que trae por defecto instalados 'Node JS' junto a 'npm', por lo que nos evitaremos tener que instalarlos. Adicional a ello, no habrá ninguna diferencia respecto del dockerfile descrito en el apatado anterior.

#### Construcción y ejecución del contenedor docker
Una vez tenemos definido nuestro archivo dockerfile, podremos **construir el contenedor**. Para ello, podemos emplear la siguiente orden:
```
sudo docker build -t <ID del contenedor> <ruta del dockerfile>
```
En nuestro caso:
```
sudo docker build -t yoskitar/cc-refood-gestiondeproductos .
```

Tras ejecutar la orden de construcción anterior, docker construirá el contenedor a partir de la dockerfile creado, y podremos **listarla** con el comando `sudo docker images`.

En el caso de que todo se haya realizado correctamente y la imagen nos aparezca al listarla, podremos ejecutarla con la orden:
```
sudo docker run -it --env-file=<ENV> -p <puerto externo>:<puerto interno> <ID del contenedor>:<version>
```
En nuestro caso:
```
sudo docker run -it --env-file=.env -p 8080:8080 yoskitar/cc-refood-gestiondeproductos:latest
```
Como podemos observar, empleamos diversos flags para la ejecución de nuestro contenedor:
* `-t`: Ejecuta el contenedor en **modo pseudo-terminal**.
* `-i`: Ejecuta el contenedor en **modo interactivo**.
* `--env-file`: Nos permite pasarle mediante un nombre de fichero, las [**variables de entorno**](https://docs.docker.com/compose/env-file/) necesarias para la correcta ejecución de nuestra aplicación dentro del contenedor.
* `-p`: Establece la **conexión** entre el **puerto externo** del contenedor, con el puerto **interno** que empleará nuestra aplicación.

>Si desea obtener más información relativa a las diferentes opciones disponibles para la construcción y ejecución de contenedores docker, puede consultar la [doumentación oficial](https://docs.docker.com/engine/reference/run/).

#### Publicación del contenedor docker.
Una vez tenemos creada la imagen del contenedor y hemos comprobado que funciona adecuadamente, podemos publicarla en un repositorio de modo que otros usuarios puedan descargarse nuestra imagen y usarla. Para ello, podemos hacer uso de diversas plataformas que nos brindan dicha posibilidad. 

En nuestro caso, hemos seleccionado dos, [dockerhub](https://docs.docker.com/docker-hub/) y [github packages](https://help.github.com/es/github/managing-packages-with-github-packages/configuring-docker-for-use-with-github-packages), ambas bastante sencillas de utilizar, como explicaremos a continuación.

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

Contenedor: https://hub.docker.com/layers/yoskitar/cc-refood-gestiondeproductos/latest/images/sha256-40a7df847e513133cc176e4394175ce07ec1b5da19e7aaf66e885855d0faf122


```
 https://hub.docker.com/layers/yoskitar/cc-refood-gestiondeproductos/latest/images/sha256-40a7df847e513133cc176e4394175ce07ec1b5da19e7aaf66e885855d0faf122
```
De este modo, podemos descargarnos y hacer uso del contenedor con el siguiente comando:
```
sudo docker pull yoskitar/cc-refood-gestiondeproductos:latest
```

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




> Si desea obtener más información, consulte la [**documentación completa del proyecto**](https://github.com/yoskitar/Cloud-Computing-CC/tree/master/Documentacion).

## Justificaciones
[Justificaciones adicionales de la asignatura.](https://github.com/yoskitar/Cloud-Computing-CC/tree/master/Justificaciones)

## Licencia
Para el desarrollo de este proyecto se ha seleccionado la licencia **GNU General Public License v3.0**, que es una de las menos restrictivas, permitiendo y garantizando el objetivo de software libre, al evitar la distribución de versiones de código cerrado.

# Cloud-Computing-CC
Repositorio para el desarrollo del proyecto y ejercicios pertenecientes a la asignatura de Cloud Comuting (CC-UGR).

## Tabla de contenidos
1. **REFOOD**  
  1.1. **Descripción**  
  1.2. **Arquitectura**  
  1.3. **Servicios**  
  1.3. **Testeo**  
  1.4. **Resumen de lenguajes y tecnologías empleadas**  
3. **Justificaciones**
4. **Licencia**  

## REFOOD
### Descripción
El proyecto que realizaremos ha sido denominado **ReFood** de acorde al **objetivo** principal del servicio, que es **evitar desechar alimentos**, poniéndolos a la venta a un menor precio, de manera que se incite a los consumidores a llevárselos antes de que perezcan. En el siguiente enlace, puede consultar más detalles relacionados con las [**historias de usuario y entidades**](https://github.com/yoskitar/Cloud-Computing-CC/tree/master/Documentacion) que intervienen en el proyecto.

### Arquitectura
Para el desarrollo del servicio descrito se empleará una **arquitectura basada en microservicios**, sobre la que desarrollaremos 3 micro-servicios. Aprovecharemos una de las ventajas que nos ofrece esta arquitectura para desarrollar los micro-servicios en el lenguaje que mejor nos permita realizar cada una de las funciones de éstos.

Cada uno de estos **micro-servicios**, salvo el de análisis, estará **accesible** mediante una **API GrahpQL**, aprovechando las ventajas de esta tecnología frente a las de tipo **REST**, que nos permitirá realizar las consultas de una manera más sencilla y eficaz, gracias a que nos facilita obtener los datos que deseemos con tan solo una consulta, sin necesidad de realizar diversos 'Request', ni de disponer de varios **Endpoints**. Respecto al micro-servicio de **análisis de productos**, se empleará una **API Rest**, mostrando el uso de tecnologías diferentes independientemente del micro-servicio, y aprovechando una vez más las características de esta arquitectura. Se puede consultar la tecnología empleada en el apartado de 'lenguajes y tecnologías empleadas'.

La **comunicación interna** entre los diversos **micro-servicios** se realizará siguiendo el protocolo **[AMQP](https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol)**.
Nos basaremos así en una **comunicación asíncrona** implementando una **cola de mensajes** donde los micro-servicios podrán suscribirse a los diversos canales para actuar en consecuencia. Para ello haremos uso de una capa de abstracción, empleando un **agente de mensajes** como [RabbitMq](https://www.rabbitmq.com/).

Puede obtener información más detallada en el siguiente enlace, donde se describen
las [funcionalidades asociadas a cada uno de estos micro-servicios](https://github.com/yoskitar/Cloud-Computing-CC/tree/master/Documentacion):

* **Microservicio 1**: Gestión de productos.
* **Microservicio 2**: Gestión de alertas a usuarios.
* **Microservicio 3**: Análisis de productos.

A continuación se muestra un diagrama donde se refleja la arquitectura descrita:
![Arquitectura del servicio](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/Arquitectura%20CC-Project-ReFood.png)

### Servicios
#### Configuración distribuida
Como servicio de configuración distribuida emplearemos **etcd**, que nos ofrece las funcionalidades necesarias para conectar nuestros micro-servicios y de la que se puede encontrar numerosos ejemplos para su [implementación y documentación](https://www.npmjs.com/package/node-etcd).

#### Logs
Como servicio de **logs** emplearemos por un lado, para los micro-servicios en NodeJs, el paquete [**'Winston'**](https://www.npmjs.com/package/winston), y para el micro-servicio en Python, usaremos [**'Logging'**](https://realpython.com/python-logging/). La elección de éstos se ha realizado en base a la documentación y literatura existente en la web, que la ilustra de manera sencilla y con numerosos ejemplos.

#### Almacén de datos
Como **almacén de datos**, utilizaremos para cada uno de los micro-servicios definidos, una base de datos **NoSQL**, basada en **documentos**, debido a la naturaleza de nuestros micro-servicios, que trabajarán con **catálogos** y modelos de datos de diferente estructura, aprovechando así dos de los [puntos fuertes](https://aws.amazon.com/es/nosql/document/) de este tipo de bases de datos. En base a ello, usaremos **MongoDB**. La idea será emplear el lenguaje de consulta **GraphQL**, junto con su API, que nos facilitará testear en una primera instancia, las diversas consultas que implementemos.

### Testeo
Para la fase de testeo de nuestro servicio, contaremos con la ayuda del paquete **'easygraphql-tester'**, que nos proporcionará funciones para comprobar de una manera sencilla la respuesta esperada a cada una de las consultas.
Para el caso del micro-servicio en python empleando **Flask**, haremos uso de la librería '**pytest**'.

### Resumen de lenguajes y tecnologías empleadas
Como ya se ha indicado, en el desarrollo de los micro-servicios emplearemos los **lenguajes** de programación **Node JS** y **Python**.  
Como **tecnologías** emplearemos **Express**, junto con el paquete **express-graphql** para NodeJs y **Flask** en el caso de Python. Del lado de almacén de datos, usaremos **Mongoose** como ODM que nos permitirá definir los modelos de datos de nuestro servicio, junto con **GraphQL**. Respecto a la implementación de la comunicación entre micro-servicios, haremos uso de librerías como '**pika**' o '**amqplib**', que nos ofrece **RabbitMq**.

Puede obtener más información en el siguiente enlace, donde se encuentra toda la [documentación del proyecto](https://github.com/yoskitar/Cloud-Computing-CC/tree/master/Documentacion).

## Justificaciones
[Justificaciones adicionales referentes a los diversos hitos de la asignatura.](https://github.com/yoskitar/Cloud-Computing-CC/tree/master/Justificaciones)

## Licencia
Para el desarrollo de este proyecto se ha seleccionado la licencia **GNU General Public License v3.0**, que es una de las menos restrictivas, permitiendo y garantizando el objetivo de software libre, al evitar la distribución de versiones de código cerrado.

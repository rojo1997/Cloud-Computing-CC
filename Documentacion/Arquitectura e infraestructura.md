# REFOOD
## Arquitectura del servicio
Para el desarrollo del servicio descrito se empleará una **arquitectura basada en microservicios**, sobre la que desarrollaremos 4 micro-servicios. Aprovecharemos una de las ventajas que nos ofrece esta arquitectura para desarrollar los micro-servicios en el lenguaje que mejor nos permita realizar cada una de las funciones de éstos. Adicionalmente consideraremos un 5º micro-servicio de **Log**.

Cada uno de estos micro-servicios, salvo el de análisis, estará accesible mediante una **API GrahpQL**, aprovechando las ventajas de esta tecnología frente a las de tipo **REST**, que nos permitirá realizar las consultas de una manera más sencilla y eficaz, gracias a que nos facilita obtener los datos que deseemos con tan solo una consulta, sin necesidad de realizar diversos 'Request', ni de disponer de varios **Endpoints**. Respecto al micro-servicio de **análisis de productos**, se empleará una **API Rest**, mostrando el uso de tecnologías diferentes independientemente del micro-servicio, y aprovechando una vez más las características de esta arquitectura.

La **comunicación interna** entre los diversos **micro-servicios** se realizará siguiendo el protocolo **[AMQP](https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol)**.
Nos basaremos así en una **comunicación asíncrona** implementando una **cola de mensajes** donde los micro-servicios podrán suscribirse a los diversos canales para actuar en consecuencia. Para ello haremos uso de una capa de abstracción, empleando un **agente de mensajes** como [RabbitMq](https://www.rabbitmq.com/).

Como se ha mencionado, se planea que se puedan usar diferentes lenguajes en el servicio, por lo que la idea será emplear **Node JS** para los 2 primeros micro-servicios y **Python** para el 3º de los micro-servicios, aprovechando las ventajas de cada uno de estos lenguajes en relación a las funcionalidades de los micro-servicios, como se definen a continuación:

* **Microsercicio 1**: Gestión de usuarios (tipos supermercado y comprador)
  * Registro de usuarios
  * Borrado de usuarios
  * Consulta de usuarios
  * Autenticación de usuarios
* **Microservicio 2**: Gestión de productos
  * Registrar producto rebajado
  * Modificar estado de producto rebajado ([disponible - reservado - comprado])
  * Consultar productos
* **Microservicio 3**: Gestión de alertas a usuarios de tipo comprador
  * Registrar alertas de productos
  * Registrar alertas de posibles recetas
* **Microservicio 4**: Análisis de productos
  * Buscar posibles recetas con productos rebajados disponibles
* **Microservicio 5**: Log del servicio
  * Registro de operación
  * Consulta de log del servicio

A continuación se muestra un diagrama donde se refleja la arquitectura descrita:
![Arquitectura del servicio](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/Arquitectura%20CC-Project-ReFood.png)

## Servicios
### Configuración distribuida
Como servicio de configuración distribuida emplearemos **etcd**, que nos ofrece las funcionalidades necesarias para conectar nuestros micro-servicios y de la que se puede encontrar numerosos ejemplos para su [implementación y documentación](https://www.npmjs.com/package/node-etcd).

### Logs
Como servicio de **logs** emplearemos por un lado, para los micro-servicios en NodeJs, el paquete [**'Winston'**](https://www.npmjs.com/package/winston), y para el micro-servicio en Python, usaremos [**'Logging'**](https://realpython.com/python-logging/). La elección de éstos se ha realizado en base a la documentación y literatura existente en la web, que la ilustra de manera sencilla y con numerosos ejemplos.

### Almacén de datos
Como **almacén de datos**, utilizaremos para cada uno de los micro-servicios definidos, una base de datos **NoSQL**, basada en **documentos**, debido a la naturaleza de nuestros micro-servicios, que trabajarán con **catálogos** y modelos de datos de diferente estructura, aprovechando así dos de los [puntos fuertes](https://aws.amazon.com/es/nosql/document/) de este tipo de bases de datos. En base a ello, usaremos **MongoDB**. La idea será emplear el lenguaje de consulta **GraphQL**, junto con su API, que nos facilitará testear en una primera instancia, las diversas consultas que implementemos.

## Resumen de lenguajes y tecnologías empleadas
Como ya se ha indicado, en el desarrollo de los micro-servicios emplearemos los **lenguajes** de programación **Node JS** y **Python**.  
Como **tecnologías** emplearemos **Express**, junto con el paquete **express-graphql** para NodeJs y **Flask** en el caso de Python. Del lado de almacén de datos, usaremos **Mongoose** como ODM que nos permitirá definir los modelos de datos de nuestro servicio, junto con **GraphQL**. Respecto a la implementación de la comunicación entre micro-servicios, haremos uso de librerías como '**pika**' o '**amqplib**', que nos ofrece **RabbitMq**.
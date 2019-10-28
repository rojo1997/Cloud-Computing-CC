# Documentación del Proyecto
Este documento se irá completando progresivamente durante el desarrollo del proyecto con las diversas actualizaciones que se vayan introduciendo, referentes al avance en el temario de la asignatura y de los diferentes hitos.

## REFOOD
### Tabla de contenidos
 1. [Idea principal]()  
 2. [Breve descripción]()  
 3. [Resumen]()  
 4. [DDD - Entidades e historias de usuario]()  
 5. [Descripción técnica]()  
   - 5.1. [Arquitectura]()  
   - 5.2. [Especificación de funcionalidades]()  
   - 5.3. [Servicios]()   
      - 5.3.1 [Configuración distribuida]()  
      - 5.3.2 [Logs]()  
      - 5.3.3 [Almacén de datos]()  
  - 5.4. [Testeo]()  
  - 5.5. [Resumen de lenguajes y tecnologías]()

### Idea principal sobre la que se basará el servicio
La idea inicial para el desarrollo de este proyecto la he heredado de un proyecto propio personal, sobre el que basé igualmente mi [trabajo de fin de grado](). Esta idea consiste en el desarrollo de un sistema para la **gestión de eventos**. Concretamente, en el TFG, se desarrollo un modelo basado en la generación y definición de unas entidades que se denominaron **'servicios'** y **'micro-servicios'**, que permitía una fácil adaptación de cualquier problema **'productor-consumidor'**, con la finalidad de poder **explotar los datos recogidos**.

### Breve descripción del servicio
El **servicio** que desarrollaremos se basará en la **idea** anterior pero de una manera mucho más **simplificada**. En lugar de reutilizar la misma idea del sistema de gestión de eventos, partiremos de una idea que últimamente ha cobrado fuerza entre varios restaurantes, como es la posibilidad de **vender comida a un menor precio antes de desecharla**, pero adaptada al sector de los **supermercados**. Actualmente vemos como estos supermercados ya ponen en práctica esta idea, pero de un modo que no consigue en muchos casos su objetivo, ya que en las últimas horas al cierre, bajan productos de precio; evidentemente, si no vas al supermercado a comprar y ves estas ofertas, el método no podrá cumplir su objetivo. Se tratará de suplir así esta carencia con el sistema que pretendemos desarrollar.

### Resumen
El proyecto que realizaremos ha sido denominado **ReFood** de acorde al objetivo principal del servicio, que es evitar desechar alimentos, poniéndolos a la venta a un menor precio, de manera que se incite a los consumidores a llevárselos antes de que perezcan.

Como ya adelantábamos en la descripción inicial del proyecto, los supermercados ya realizan este proceso de bajar productos de precio cuya fecha de caducidad se encuentra próxima, pero pecan en un aspecto fundamental, y es en la difusión de esa posible oferta o reducción del precio, puesto que tan solo si te desplazas al supermercado a comprar algún otro producto y lo ves rebajado, podrás incluirlo en tu compra.

### Entidades e historias de usuario (DDD)
En nuestro problema encontramos 3 entidades principales:
* **Producto**: Un producto es un alimento rebajado de precio, que la empresa o supermercado introduce en nuestro sistema para que la gente tenga conciencia de esta rebaja, relacionada con la cercanía de la fecha máxima de consumo del producto, y se incite a su compra a través de dicha rebaja. He de aclarar que se consideran productos, y no existencias, ya que cada existencia individual de un producto podrá tener un precio distinto, sin ser dependiente de que se trate del mismo producto.

  * Un usuario perteneciente a un supermercado o empresa relacionada con la venta de alimentos introduce un producto rebajado de precio en nuestro catálogo.
  * Un usuario perteneciente a un supermercado o empresa relacionada con la venta de alimentos modifica el estado de un producto indicando si se encuentra disponible, reservado o comprado.
  * Un usuario consulta uno o varios productos disponibles en el catálogo.  


* **Alerta**: Una alerta atiende a su propia definición, siendo un aviso que se crea para los usuarios, indicándoles que producto se encuentra rebajado, además de información relativa al precio, descripción, y localización (supermercado que lo ha puesto a la venta) del producto.

  * Un usuario introduce un producto en el catálogo y se crea una alerta con la información relativa.
  * Un usuario consulta las alertas de productos y recetas que se han creado.


* **Receta**: Una receta atiende a una serie de pasos en los que intervienen un conjunto de productos para la elaboración de una comida. El interés de esta entidad en el dominio de nuestro problema será poder analizar que recetas se pueden realizar en función de los productos rebajados, con el objetivo de incentivar a su compra a través de estas sugerencias.

  * Un usuario introduce un producto en el catálogo y se analiza si existe alguna receta que se pueda elaborar con los productos rebajados disponibles.


### Descripción técnica del servicio
#### Arquitectura
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

#### Especificación de funcionalidades
* **Microservicio 1**
  * **Registrar producto rebajado**:
    * **Descripción**: Función para insertar un nuevo producto rebajado
    * **Datos de entrada**: Nombre del producto, categoría, precio inicial, precio rebajado.
    * **Salida**: Confirmación de operación, identificador de producto, errores
  * **Modificar estado de producto rebajado ([disponible - reservado - comprado])**:
    * **Descripción**: Función para modificar el estado de un producto rebajado.
    * **Datos de entrada**: Identificador del producto, nuevo estado.
    * **Salida**: Confirmación de operación, identificador del producto, errores
  * **Consultar productos**:
    * **Descripción**: Función para obtener los productos rebajados
    * **Datos de entrada**: Identificador del producto o  vacío en caso de obtener lista completa
    * **Salida**: Confirmación de operación, lista de productos, errores
* **Microservicio 2**
  * **Registrar alertas de productos**:
    * **Descripción**: Función para insertar alertas de productos rebajados para usuarios de posible interés.
    * **Datos de entrada**: UUIDs de usuarios, identificadores de productos
    * **Salida**: Confirmación de operación, lista de identificadores de alertas, errores
  * **Consultar alertas**:
      * **Descripción**: Función para obtener las alertas de productos
      * **Datos de entrada**: Identificador de alerta o  vacío en caso de obtener lista completa
      * **Salida**: Confirmación de operación, lista de alertas, errores
  * **Registrar alertas de posibles recetas**:
    * **Descripción**: Función para insertar alertas de recetas para usuarios de posible interés, en relación a los productos rebajados disponibles.
    * **Datos de entrada**: UUIDs de usuarios, identificadores de productos, identificadores de recetas
    * **Salida**: Confirmación de operación, lista de identificadores de alertas, errores
* **Microservicio 3**
  * **Buscar posibles recetas con productos rebajados disponibles**:
    * **Descripción**: Función para analizar los productos rebajados disponibles y buscar posibles recetas que se puedan realizar con ellos.
    * **Datos de entrada**: Identificadores de productos disponibles
    * **Salida**: Confirmación de operación, lista de identificadores de recetas, errores

#### Servicios
##### Configuración distribuida
Como servicio de configuración distribuida emplearemos **etcd**, que nos ofrece las funcionalidades necesarias para conectar nuestros micro-servicios y de la que se puede encontrar numerosos ejemplos para su [implementación y documentación](https://www.npmjs.com/package/node-etcd).

##### Logs
Como servicio de **logs** emplearemos por un lado, para los micro-servicios en NodeJs, el paquete [**'Winston'**](https://www.npmjs.com/package/winston), y para el micro-servicio en Python, usaremos [**'Logging'**](https://realpython.com/python-logging/). La elección de éstos se ha realizado en base a la documentación y literatura existente en la web, que la ilustra de manera sencilla y con numerosos ejemplos.

##### Almacén de datos
Como **almacén de datos**, utilizaremos para cada uno de los micro-servicios definidos, una base de datos **NoSQL**, basada en **documentos**, debido a la naturaleza de nuestros micro-servicios, que trabajarán con **catálogos** y modelos de datos de diferente estructura, aprovechando así dos de los [puntos fuertes](https://aws.amazon.com/es/nosql/document/) de este tipo de bases de datos. En base a ello, usaremos **MongoDB**. La idea será emplear el lenguaje de consulta **GraphQL**, junto con su API, que nos facilitará testear en una primera instancia, las diversas consultas que implementemos.

#### Testeo
Para la fase de testeo de nuestro servicio, contaremos con la ayuda del paquete **'easygraphql-tester'**, que nos proporcionará funciones para comprobar de una manera sencilla la respuesta esperada a cada una de las consultas.
Para el caso del micro-servicio en python empleando **Flask**, haremos uso de la librería '**pytest**'.

#### Resumen de lenguajes y tecnologías empleadas
Como ya se ha indicado, en el desarrollo de los micro-servicios emplearemos los **lenguajes** de programación **Node JS** y **Python**.  
Como **tecnologías** emplearemos **Express**, junto con el paquete **express-graphql** para NodeJs y **Flask** en el caso de Python. Del lado de almacén de datos, usaremos **Mongoose** como ODM que nos permitirá definir los modelos de datos de nuestro servicio, junto con **GraphQL**. Respecto a la implementación de la comunicación entre micro-servicios, haremos uso de librerías como '**pika**' o '**amqplib**', que nos ofrece **RabbitMq**.

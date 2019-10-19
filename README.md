# Cloud-Computing-CC
Repositorio para el desarrollo del proyecto y ejercicios pertenecientes a la asignatura de Cloud Comuting (CC-UGR).

## Descripción inicial del proyecto
El **servicio** que desarrollaremos parte de una **idea** que últimamente ha cobrado fuerza entre varios restaurantes, como es la posibilidad de **vender comida a un menor precio antes de desecharla**, pero adaptada al sector de los **supermercados**. Actualmente vemos como estos supermercados ya ponen en práctica esta idea, pero de un modo que no consigue en muchos casos su objetivo, ya que en las últimas horas al cierre, bajan productos de precio; evidentemente, si no vas al supermercado a comprar y ves estas ofertas, el método no podrá cumplir su objetivo. Se tratará de suplir así esta carencia con el sistema que pretendemos desarrollar.

El proyecto que realizaremos ha sido denominado **ReFood** de acorde al objetivo principal del servicio, que es evitar desechar alimentos, poniéndolos a la venta a un menor precio, de manera que se incite a los consumidores a llevárselos antes de que perezcan.

### Descripción técnica del servicio
#### Arquitectura
Para el desarrollo del servicio descrito se empleará una **arquitectura basada en microservicios**, sobre la que desarrollaremos 4 micro-servicios. Aprovecharemos una de las ventajas que nos ofrece esta arquitectura para desarrollar los micro-servicios en el lenguaje que mejor nos permita realizar cada una de las funciones de éstos. Adicionalmente consideraremos un 5º micro-servicio de **Log**.

Cada uno de estos micro-servicios estará accesible mediante una **API GrahpQL**, aprovechando las ventajas de esta tecnología frente a las de tipo **REST**, que nos permitirá realizar las consultas de una manera más sencilla y eficaz, gracias a que nos facilita obtener los datos que deseemos con tan solo una consulta, sin necesidad de realizar diversos 'Request', ni de disponer de varios **Endpoints**.

La comunicación interna entre los diversos micro-servicios se realizará siguiendo el protocolo **[AMQP](https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol)**.
Nos basaremos así en una **comunicación asíncrona** implementando una **cola de mensajes** donde los micro-servicios podrán suscribirse a los diversos canales para actuar en consecuencia. Para ello haremos uso de una capa de abstracción, empleando un **agente de mensajes** como [RabbitMq](https://www.rabbitmq.com/).

Como se ha mencionado, se planea que se puedan usar diferentes lenguajes en el servicio, por lo que la idea será emplear **Node JS** para los 3 primeros micro-servicios y **Python** para el 4º de los micro-servicios, aprovechando las ventajas de cada uno de estos lenguajes en relación a las funcionalidades de los micro-servicios, como se definen a continuación:

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
* **Microservicio 5**: Log del servicio.
  * Registro de operación
  * Consulta de log del servicio

A continuación se muestra un diagrama donde se refleja la arquitectura descrita:
![Arquitectura del servicio](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/Arquitectura%20CC-Project-ReFood.png)


#### Especificación de funcionalidades
* **Microsercicio 1**
  * **Registro de usuarios**:
      * **Descripción**: Función para la inserción de usuarios en el servicio.
      * **Datos de entrada**: Email, contraseña, tipo de usuario (productor-consumidor)  
      * **Salida**: Confirmación de operación, identificador de usuario, errores
  * **Borrado de usuarios**:
      * **Descripción**: Función para la eliminación de usuarios en el servicio.
      * **Datos de entrada**: Email o identificador único de usuario (UUID)
      * **Salida**: Confirmación de operación, errores
  * **Consulta de usuarios**:
      * **Descripción**: Función para obtener una lista de usuarios del servicio.
      * **Datos de entrada**: Emails o UUIDs de usuarios a consultar, o vacío en caso de obtener la lista completa.
      * **Salida**: Confirmación de operación, lista de usuarios, errores
  * **Autenticación de usuarios**:
    * **Descripción**: Función para la autorización y autenticación de usuarios en el servicio.
    * **Datos de entrada**: Token de autenticación del usuario
    * **Salida**: Confirmación de operación, errores
* **Microservicio 2**
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
* **Microservicio 3**
  * **Registrar alertas de productos**:
    * **Descripción**: Función para insertar alertas de productos rebajados para usuarios de posible interés.
    * **Datos de entrada**: UUIDs de usuarios, identificadores de productos
    * **Salida**: Confirmación de operación, lista de identificadores de alertas, errores
  * **Registrar alertas de posibles recetas**:
    * **Descripción**: Función para insertar alertas de recetas para usuarios de posible interés, en relación a los productos rebajados disponibles.
    * **Datos de entrada**: UUIDs de usuarios, identificadores de productos, identificadores de recetas
    * **Salida**: Confirmación de operación, lista de identificadores de alertas, errores
* **Microservicio 4**
  * **Buscar posibles recetas con productos rebajados disponibles**:
    * **Descripción**: Función para analizar los productos rebajados disponibles y buscar posibles recetas que se puedan realizar con ellos.
    * **Datos de entrada**: Identificadores de productos disponibles
    * **Salida**: Confirmación de operación, lista de identificadores de recetas, errores
* **Microservicio 5**
    * **Registro de operación**:
      * **Descripción**: Función para registrar las operaciones y estado del servicio.
      * **Datos de entrada**: Operación realizada, estado de la operación.
      * **Salida**: Confirmación de operación, errores
    * **Consulta de log del servicio**:
      * **Descripción**: Función para consultar el log del servicio
      * **Datos de entrada**: Vacío.
      * **Salida**: Log del servicio

#### Almacén de datos
Como **almacén de datos**, utilizaremos para cada uno de los micro-servicios definidos, una base de datos **NoSQL**, empleando **MongoDB**. La idea será emplear el lenguaje de consulta **GraphQL**, junto con su API, que nos facilitará testear en una primera instancia, las diversas consultas que implementemos.

#### Testeo
Para la fase de testeo de nuestro servicio, contaremos con la ayuda del paquete **'easygraphql-tester'**, que nos proporcionará funciones para comprobar de una manera sencilla la respuesta esperada a cada una de las consultas.

#### Resumen de lenguajes y tecnologías empleadas
Como ya se ha indicado, en el desarrollo de los micro-servicios emplearemos los **lenguajes** de programación **Node JS** y **Python**.  
Como **tecnologías** emplearemos **Express** para NodeJs y **Flask** en el caso de Python. Del lado de almacén de datos, usaremos **Mongoose** como ODM que nos permitirá definir los modelos de datos de nuestro servicio, junto con **GraphQL**. Respecto a la implementación de la comunicación entre micro-servicios, haremos uso de librerías como '**pika**' o '**amqplib**', que nos ofrece **RabbitMq**.

Puede obtener más información en el siguiente enlace, donde se encuentra toda la [documentación del proyecto]().

## Justificaciones
[Justificaciones adicionales referentes a los diversos hitos de la asignatura.](https://github.com/yoskitar/Cloud-Computing-CC/tree/master/Justificaciones)

## Licencia
Para el desarrollo de este proyecto se ha seleccionado la licencia **GNU General Public License v3.0**, que es una de las menos restrictivas, permitiendo y garantizando el objetivo de software libre, al evitar la distribución de versiones de código cerrado.

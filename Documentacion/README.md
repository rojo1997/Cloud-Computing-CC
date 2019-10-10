# Documentación del Proyecto
Este documento se irá completando progresivamente durante el desarrollo del proyecto con las diversas actualizaciones que se vayan introduciendo, referentes al avance en el temario de la asignatura y de los diferentes hitos.
## REFOOD
### Resumen
El proyecto que realizaremos ha sido denominado **ReFood** de acorde al objetivo principal del servicio, que es evitar desechar alimentos, poniéndolos a la venta a un menor precio, de manera que se incite a los consumidores a llevárselos antes de que perezcan.

Como ya adelantábamos en la descripción inicial del proyecto, los supermercados ya realizan este proceso de bajar productos de precio cuya fecha de caducidad se encuentra próxima, pero pecan en un aspecto fundamental, y es en la difusión de esa posible oferta o reducción del precio, puesto que tan solo si te desplazas al supermercado a comprar algún otro producto y lo ves rebajado, podrás incluirlo en tu compra.

### Descripción
Para el desarrollo del servicio descrito se empleará una **arquitectura basada en microservicios**, sobre la que desarrollaremos al menos 2 microservicios, cuya comunicación entre ellos se realice mediante una cola de eventos, similar a como se realizaría en una arquitectura basada en eventos, empleando [RabbitMq](https://www.rabbitmq.com/) para el entorno de desarrollo o de prueba.

Se planea que se puedan usar diferentes lenguajes en el servicio, por lo que la idea será emplear **Node JS** para los 3 primeros microsercicios y **Python** para el 4º de los microsercicios, como se definen a continuación:

* **Microsercicio 1**: Gestión de usuarios (tipos supermercado y comprador)
  * Registro de usuarios
  * Borrado de usuarios
  * Autenticación de usuarios
* **Microservicio 2**: Gestión de productos
  * Registrar producto rebajado
  * Modificar estado de producto rebajado ([disponible - reservado - comprado])
* **Microservicio 3**: Gestión de alertas a usuarios de tipo comprador
  * Registrar alertas de productos
  * Registrar alertas de posibles recetas
* **Microservicio 4**: Análisis de productos
  * Buscar posibles recetas con productos rebajados disponibles

Como almacén de datos, utilizaremos una base de datos NoSQL, empleando **MongoDB**, y la idea será emplear el lenguaje de consulta **GraphQL**, junto con su API, que nos permitirá testear fácilmente las diversas consultas que implementemos.

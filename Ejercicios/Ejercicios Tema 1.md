# Tema 1: Arquitectura software para la nube

## Ejercicio 1.- Buscar una aplicación de ejemplo, preferiblemente propia, y deducir qué patrón es el que usa. ¿Qué habría que hacer para evolucionar a un patrón tipo microservicios?

Como ejemplo he seleccionado una aplicación que diseñé y desarrollé junto a otros 2 compañeros para la asignatura de diseño y desarrollo de sistemas de información (DDSI), consistente en un sistema para la gestión de una escuela de baile, empleando el framework NetBeans de Java, y una base de datos SQL remota en Oracle.

El patrón que utilizaba se basaba en una [**arquitectura en capas**](https://en.wikipedia.org/wiki/Multitier_architecture), donde desde la interfaz de usuario (capa 1), el usuario enviaba órdenes a la capa de lógica de negocio (capa 2), que se encargaba de coordinar la aplicación y procesar los comandos, actuando de intermediario a su vez con la capa de datos (capa 3), donde se realizaba la gestión de los datos almacenados en una base de datos SQL.

Para evolucionar a un patrón del tipo [**microservicios**](https://microservices.io/), cada uno de los módulos en los que dividimos la lógica de la aplicación podría ser estructurada como diferentes microservicios, coordinados por una API rest, empleando el lenguaje de programación NodeJs por ejemplo, y desarrollar una aplicación Android para la interacción con la API, o bien desarrollar una interfaz empleando por ejemplo React.

## Ejercicio 2.- En la aplicación que se ha usado como ejemplo en el ejercicio anterior, ¿podría usar diferentes lenguajes? ¿Qué almacenes de datos serían los más convenientes?

Podríamos emplear diversos lenguajes de programación sin ningún problema en cada uno de los microservicios o componentes, o como indicábamos en el anterior ejercicio, emplear un lenguaje para el front-end y otro para la lógica de la aplicación en el back-end. Por ejemplo, **Javascript** para un microservicio encargado de la gestión de usuarios, y **Scala** o **Python** para un segundo microservicio encargado de realizar análisis de diversas interacciones de estos usuarios con nuestro sistema.

De cara a trabajar con estas arquitecturas, se recomienda enormemente trabajar con bases de datos NoSQL, debido a la naturaleza de éstas, que facilitan el trabajo en entornos desectructurados, ahorrando en muchos casos una gran cantidad de espacio, al no tener que emplear datos con la misma estructura. Para nuestro caso, y por familiaridad, podríamos emplear **MongoDB** como almacén de datos, junto al lenguaje **GraphQL** como lenguaje de consulta, que nos ofrece numerosas ventajas a la hora de realizar gestión de errores en las precondiciones de nuestras funciones, y nos será de gran ayuda si por ejemplo realizamos una aplicación Android para la interacción del usuario con la API.

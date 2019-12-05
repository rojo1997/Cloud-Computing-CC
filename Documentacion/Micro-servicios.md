# Micro-servicios
## Gestión de productos
Como primer **micro-servicio** se ha desarrollado el relacionado con la **gestión** del catálogo de **productos** disponibles, el cual nos permitirá desde **registrar** nuevos productos, hasta modificar el estado de éstos o **obtener** una lista de los **productos** con la posibilidad de **filtrar** por diversos parámetros.

### Arquitectura en capas
Nuestro micro-servicio presenta un modelo de **arquitectura** basada en **capas**, que nos facilita el seguir unas buenas prácticas como el TDD, permitiendonos testear nuestras clases independientemente de los módulos adicionales integrados. En nuestro caso distinguimos tres capas:

* **Nivel superior o de interfaz**: En esta capa se situaría el **Api-Graph**, que nos seviría de punto de acceso desde el exterior al interior de la lógica del micro-servicio. 
* **Nivel interno o de lógica**: En ésta se situarían todos nuestros modelos y esquemas de datos que graphql necesita para gestionar la lógica asociada a las funcionalidades definidas para los productos.
* **Nivel inferior o de almacenamiento**: En esta capa situaríamos la **integración** de nuestro micro-servicio con la **base de datos** donde almacenaremos la información relativa a nuestros productos. 

Esta organización nos facilita como se ha mencionado la realización de los **test unitarios** referentes a los tipos, schemas y modelos definidos, junto con los **test de integración** descritos para comprobar la integración de nuestra aplicación junto con la base de datos y dichos **modelos** y **schemas graphql** que actuarán de **interfaces**.

### Api-GraphQL
Como ya se mencionó en la descripción del servicio junto a la [documentación de su infraestructura](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Arquitectura%20e%20infraestructura.md), para el micro-servicio de gestión de productos se emplará el framework de aplicaciones web [**express**](https://expressjs.com/es/starter/hello-world.html) para Node Js, junto con el módulo [**express-graphql**](https://graphql.org/graphql-js/running-an-express-graphql-server/) que nos permitirá crear nuestro **GraphQL API server**.

>Puede consultar más detalles referentes a la [implementación del módulo app](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/app/app.js) si desea obtener más información.

#### Schemas
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
> Puede consultar mas detalles sobre la [definición de tipos](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/app/graphql/types/Product/index.js) completa si desea obtener más información.

#### Models
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

>Puede consultar la [definición del modelo](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/app/models/Product.js) completa si desea obtener más detalles.

#### Resolvers
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

> Puede consultar la [implementación de los resolvers](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/app/graphql/resolvers/Product/index.js) completa si desea conocer más detalles.

### Arranque automático
Entre las órdenes declaradas, podemos encontrar la órden `npm start`, definida en el archivo package.json, que a través del uso del gestor de procesos **pm2**, lanzará 2 instancias del micro-servicio empleando la opción `-i`, con la orden `start` seguida del módulo de la aplicación que se pretende ejecutar, y que recibirán el nombre de 'gp' (gestión de productos), indicado con el flag `--name` (gestión de productos).

Como **consideración adicional**, deberemos de definir un archivo de **variables de entorno** donde definir las siguientes variables:
* `PORT`: **Puerto** desde el que se encontrará accesible el micro-serivicio.
* `DB`: URI de la **base de datos** que empleará mongoose para conectarse.

> Si desea conocer más información sobre las órdenes definidas, puede consultar el fichero de [documentación de herramientas](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/Documentacion/Herramientas.md).

> Puede consultar directamente el arhivo [package.json](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/package.json) si desea obtener más detalles.
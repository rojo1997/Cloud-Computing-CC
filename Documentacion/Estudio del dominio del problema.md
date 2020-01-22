# REFOOD
## Domain Driven Design
### Entidades e historias de usuario 
En nuestro problema encontramos 3 entidades principales:
* **Producto**: Un producto es un alimento rebajado de precio, que la empresa o supermercado introduce en nuestro sistema para que la gente tenga conciencia de esta rebaja, relacionada con la cercanía de la fecha máxima de consumo del producto, y se incite a su compra a través de dicha rebaja. He de aclarar que se consideran productos, y no existencias, ya que cada existencia individual de un producto podrá tener un precio distinto, sin ser dependiente de que se trate del mismo producto.

  * Un usuario perteneciente a un supermercado o empresa relacionada con la venta de alimentos introduce un producto rebajado de precio en nuestro catálogo.
    * [Issue #20](https://github.com/yoskitar/Cloud-Computing-CC/issues/20): Creación de API GRAPH para micro-servicio de gestión de productos.
    * [Issue #21](https://github.com/yoskitar/Cloud-Computing-CC/issues/21): Creación del modelo de datos de producto.
    * [Issue #22](https://github.com/yoskitar/Cloud-Computing-CC/issues/22): Definición de mutación 'agregar producto' de producto.
    * [Issue #23](https://github.com/yoskitar/Cloud-Computing-CC/issues/23): Implementación de resolver definido.
  * Un usuario perteneciente a un supermercado o empresa relacionada con la venta de alimentos modifica el estado de un producto indicando si se encuentra disponible, reservado o comprado.
    * [Issue #24](https://github.com/yoskitar/Cloud-Computing-CC/issues/24): Definición de mutación 'modificar producto' de producto.
    * [Issue #25](https://github.com/yoskitar/Cloud-Computing-CC/issues/25): Implementación de resolver 'modificar producto'.
  * Un usuario consulta uno o varios productos disponibles en el catálogo.
    * [Issue #26](https://github.com/yoskitar/Cloud-Computing-CC/issues/26): Definición de query 'get producto' de producto.
    * [Issue #27](https://github.com/yoskitar/Cloud-Computing-CC/issues/27): Implementación de resolver definido.


* **Alerta**: Una alerta atiende a su propia definición, siendo un aviso que se crea para los usuarios, indicándoles que producto se encuentra rebajado, además de información relativa al precio, descripción, y localización (supermercado que lo ha puesto a la venta) del producto.

  * Un usuario introduce un producto en el catálogo y se crea una alerta con la información relativa.
    * [Issue #28](https://github.com/yoskitar/Cloud-Computing-CC/issues/28): Creación de API GRAPH para micro-servicio de gestión de alertas.
    * [Issue #29](https://github.com/yoskitar/Cloud-Computing-CC/issues/29): Creación del modelo de datos de alerta.
    * [Issue #30](https://github.com/yoskitar/Cloud-Computing-CC/issues/30): Definición de mutación 'crear alerta' de alerta.
    * [Issue #31](https://github.com/yoskitar/Cloud-Computing-CC/issues/31): Implementación de resolver definido.
  * Un usuario consulta las alertas de productos y recetas que se han creado.
    * [Issue #32](https://github.com/yoskitar/Cloud-Computing-CC/issues/32): Definición de query 'get alerta' de alerta.
    * [Issue #33](https://github.com/yoskitar/Cloud-Computing-CC/issues/33): Implementación de resolver definido.



* **Receta**: Una receta atiende a una serie de pasos en los que intervienen un conjunto de productos para la elaboración de una comida. El interés de esta entidad en el dominio de nuestro problema será poder analizar que recetas se pueden realizar en función de los productos rebajados, con el objetivo de incentivar a su compra a través de estas sugerencias.

  * Un usuario introduce un producto en el catálogo y se analiza si existe alguna receta que se pueda elaborar con los productos rebajados disponibles.
    * [Issue #34](https://github.com/yoskitar/Cloud-Computing-CC/issues/34): Creación de API REST para micro-servicio de análisis de productos.
    * [Issue #35](https://github.com/yoskitar/Cloud-Computing-CC/issues/35): Implementación de 'get receta'.
    * [Issue #36](https://github.com/yoskitar/Cloud-Computing-CC/issues/36): Implementación de función de análisis.

# REFOOD
## Especificaciones del servicio
### Especificación de funcionalidades
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
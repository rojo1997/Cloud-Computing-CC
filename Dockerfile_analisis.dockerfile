#Imagen y versión que usaremos de base para la 
#construcción del contenedor.
FROM python:3.7-slim-buster
#Indicamos a modo informativo, el responsable encargado de 
#mantener el repositorio, con la etiqueta LABEL, ya que 
#MAINTAINER se encuentra [deprecated]
LABEL maintainer="osc9718@gmail.com"
#Definimos las variables de entorno necesarias
ENV PORT ${PORT}
ENV DB_RECEIPES ${DB_RECEIPES}
ENV URI_AMQP_SERVER ${URI_AMQP_SERVER}

#Establecemos el directorio de trabajo.
WORKDIR /usr/service/
#Copiamos el requirements donde hemos especificado
#las dependencias de nuestro microservicio.
#Copiamos el buildtool del micro-servicio con la
#que podremos llamar a las diferentes funciones definidas.
COPY requirements.txt .
COPY tasks.py .
#Instalamos las dependencias especificadas en el 
#requirements.txt.
RUN pip3 install -r requirements.txt
#Copiamos el contenido del código de la aplicación 
#al directorio de trabajo definido dentro del contenedor.
#El segundo argumento hace referencia a la dirección donde se copiará
#el contenido. Si se usa el punto, estamos indicando que se escoja
#la ruta definida en el WORKDIR.
COPY src/analyzer.py src/
COPY src/app.py src/
COPY src/dbManager.py src/
COPY src/receipe.py src/
#Indicamos a modo informativo el puerto interno
#de nuestro microservicio. 
EXPOSE 8000
#Creamos un usuario sin privilegios de root para ejecutar
#el contenedor
RUN useradd -m dockeruser
#Establecemos el usuario creado sin privilegios de root
#para ejecutar el contenedor de la imagen. Esta es una
#práctica aconsejada para evitar problemas de seguridad
#derivados de los permisos de un usuario root.
USER dockeruser
#Definimos la acción a ejecutar, que en nuestro caso,
#será el comando start definido en las tareas del 
#tasks.py de nuestro microservicio, encargado de 
#iniciar el microservicio indicado como argumento,
#que en este caso, sería el ms de análisis.
#Esta acción se ejecutará automáticamente 
#al ejecutar el contenedor.
CMD ["invoke","start", "--ms", "ar"]
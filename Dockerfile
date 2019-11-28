#Imagen y versión que usaremos de base
FROM alpine:latest
#Instalamos node y npm ya que no vienen por defecto instalados
#en la imagen elegida.
#Al usar --no-cache, evitamos tener que usar update y no tener que almacenar
#los índices localmente. Tras ello hacemos uso de upgrade para actualizar las versiones
#de los paquetes instalados.
RUN apk add --no-cache nodejs npm 
#Establecemos el directorio de trabajo
WORKDIR /usr/src/app
#Copiamos el package.json junto al package-lock.json donde hemos especificado las
#dependencias de nuestro microservicio.
COPY package*.json ./
#Instalamos las dependencias especificadas en el 
#package.json
RUN npm install --production
#Copiamos el contenido del código de la aplicación 
#al directorio de trabajo definido dentro del contenedor
COPY . .
#Indicamos a modo informativo el puerto interno
#de nuestro microservicio
EXPOSE 8080
#Definimos la acción a ejecutar, que en nuestro caso,
#será el comando start definido en los scripts del 
#package.json de nuestro microservicio, encargado de 
#iniciar el microservicio.
CMD ["npm","start"]

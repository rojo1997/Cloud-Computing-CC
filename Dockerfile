#Imagen y versión que usaremos de base para la 
#construcción del contenedor.
FROM node:alpine
#Establecemos el directorio de trabajo.
WORKDIR /usr/src
#Copiamos el package.json junto al package-lock.json donde 
#hemos especificado las dependencias de nuestro microservicio.
COPY package*.json ./
#Instalamos las dependencias de producción especificadas en el 
#package.json gracias al flag --production. Si simplemente 
#install, npm instalaría las dependencias especificadas en el 
#apartado de dependencias de desarrollo. 
RUN npm install --production
#Copiamos el contenido del código de la aplicación 
#al directorio de trabajo definido dentro del contenedor.
#Si el contenido de los fuentes necesarios se encontrase en otra
#ruta distinta, sería necesario indicarla, en lugar del primer punto,
#que indicaría que se encuentra en la misma localización que el dockerfile.
#El segundo argumento hace referencia a la dirección donde se copiará
#el contenido. Si se usa el punto, estamos indicando que se escoja
#la ruta definida en el WORKDIR.
COPY app/graphql app/graphql/
COPY app/models app/models/
COPY app/utils app/utils/
COPY app/app.js app/
COPY .babelrc .
COPY LICENSE .
#Indicamos a modo informativo el puerto interno
#de nuestro microservicio.
EXPOSE 8080
#Definimos la acción a ejecutar, que en nuestro caso,
#será el comando start definido en los scripts del 
#package.json de nuestro microservicio, encargado de 
#iniciar el microservicio. Esta acción se ejecutará
#automáticamente al ejecutar el contenedor.
CMD ["npm","start"]
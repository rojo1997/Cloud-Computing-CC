//Importamos los módulos de express, graphql y mongoose
//necesarios para la construcción de nuestro micro-servicio.
const express = require("express");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//Importamos los schemas definidos 
const schema = require("./graphql/");
//Hacemos uso del módulo dotenv para obtener
//las variables de entorno definidas
require('dotenv').config();
const PORT = process.env.PORT;
const db = process.env.DB;

//Creamos la aplicación express
const app = express();
//Indicamos la ruta graphql donde podremos acceder
//a la API graphiql desde nuestro navegador, y 
//desde la que podremos otener documentación de los
//resolver definidos y ejecutarlos.
//Usaremos bodyparser como middleware para
//pasear solo las respuestas definidas como
//Conten-Type/json, además de que el body
//sea del tipo URL-encoded y que los objetos
//tengan valores de alguno de los tipos,
//y no simple string.
app.use(
  "/graphql",
  bodyParser.urlencoded({extended:true}),
  bodyParser.json(),
  expressGraphQL((req)=>{
    return {
      schema,
      graphiql: true
    }
  })
);

//Levantamos el servidor express en el puerto indicado
app.listen(PORT|8080, () => {
  //console.log(new Date().toString() + ": " + `Server running on port ${PORT}`);
  //Conectar a MongoDB empleando el cliente Mongoose.
  mongoose.connect(db,
    {
      //Indexación de los modelos para cada secuencia de
      //eventos disparada.
      useCreateIndex: true,
      //Necesario ya que el parser string por defecto
      //esta deprecated.
      useNewUrlParser: true,
      //Permite usar el nuevo motor de monitorización
      //y decubrimiento del servidor.
      useUnifiedTopology: true
    }
  ).then(() => {
    //console.log(new Date().toString() + ": " + "MongoDB connected");
  }).catch(err => console.log(err));
});

//Exportamos el módulo app para los test de integración
module.exports = app;
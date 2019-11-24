const express = require("express");
const expressGraphQL = require("express-graphql");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
//importamos los schemas definidos 
const schema = require("./graphql/");
//Creamos la aplicación express
const app = express();
const PORT = process.env.PORT;

app.use(
    "/graphql",
    cors(),
    bodyParser.urlencoded({extended:true}),
    bodyParser.json(),
    expressGraphQL((req)=>{
      return {
        schema,
        graphiql: true
      }
    })
  );



  //Levantamos el servidor express en el puerto 4000
  app.listen(PORT|4000, () => {
    console.log(new Date().toString() + ": " + `Server running on port ${PORT}`);
  });
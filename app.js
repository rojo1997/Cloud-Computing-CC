import express from "express";
import expressGraphQL from "express-graphql";
//import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

//importamos los schemas definidos 
import schema from "./graphql/";
//Creamos la aplicación express
const app = express();
const PORT = process.env.PORT;
//const db = process.env.DB;

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

// Conectar a MongoDB empleando el cliente Mongoose.
/*mongoose
  .connect(
    db,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log(new Date().toString() + ": " + "MongoDB connected");
  }).catch(err => console.log(err));*/

  //Levantamos el servidor express en el puerto 4000
  app.listen(PORT|4000, () => {
    console.log(new Date().toString() + ": " + `Server running on port ${PORT}`);
  });
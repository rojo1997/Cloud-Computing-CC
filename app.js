import express from "express";
import expressGraphQL from "express-graphql";
//import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { graphqlUploadExpress } from 'graphql-upload'

import schema from "./graphql/";

const app = express();
const PORT = process.env.PORT;
//const db = process.env.DB;


app.use(auth.checkHeaders);
app.use(
    "/graphql",
    cors(),
    bodyParser.urlencoded({extended:true}),
    bodyParser.json(),
    graphqlUploadExpress(),
    expressGraphQL((req)=>{
      return {
        schema,
        /*context:{
          SECRET: process.env.SECRET,
          user: req.user
        },*/
        graphiql: true
      }
    })
  );

// Connect to MongoDB with Mongoose.
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
    //setInterval(checkConsumesState,86400000);
    setTimeout(function () {
      checkConsumesState()
    }, 10000);
    setTimeout(function () {
      setRecommendations(5)
    }, 5000);

  }).catch(err => console.log(err));*/

  app.listen(PORT|4000, () => {
    console.log(new Date().toString() + ": " + `Server running on port ${PORT}`);
  });
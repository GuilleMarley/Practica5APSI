import mongoose from "mongoose";
import express from "express";

import { addClient } from "./resolvers/addClient.ts";
import { getClient } from "./resolvers/getClient.ts";
import { getRestaurant } from "./resolvers/getRestaurant.ts";
import { deleteAllRestaurants } from "./resolvers/deleteAllRestaurants.ts";
import { deleteRestaurant } from "./resolvers/deleteRestaurant.ts";
import { addRestaurant } from "./resolvers/addRestaurant.ts";
import { getBooking } from "./resolvers/getBooking.ts";
import { addBooking } from "./resolvers/addBooking.ts";
import { deleteBooking } from "./resolvers/deleteBooking.ts";

try{
  const MONGO_URL = Deno.env.get("MONGO_URL")

  if(!MONGO_URL) {
    console.log("MONGO_URL is requiered")
    Deno.exit(1)
  }

  await mongoose.connect(MONGO_URL)
  const app = express()
  app.use(express.json())
  
  app
  .get("/client/:id", getClient)
  .get("/restaurant/:id", getRestaurant)
  .delete("/restaurant/:id", deleteRestaurant)
  .delete("/restaurant", deleteAllRestaurants)
  .post("/client", addClient) 
  .post("/restaurant",addRestaurant)
  .post("/booking",addBooking) 
  .get("/booking/:id",getBooking)
  .delete("/booking/:id",deleteBooking)


  app.listen(3000, () => {
    console.log("Server is listening on port 3000")
  })

}catch(e){
  console.log(e);
}
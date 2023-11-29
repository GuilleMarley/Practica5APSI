// @deno-types="npm:@types/express@4"
import {Request, Response} from "express"
import { Restaurant } from "../types.ts";
import { RestaurantModel } from "../db/restaurant.ts";

export const deleteAllRestaurants = async(req: Request<{},{},{}>,res:Response<Restaurant>) => {
    try{
        await RestaurantModel.deleteMany({});
        res.status(200).send("All restaurants deleted")
    }
    catch(e){
        res.status(500).send(e);
    }
}
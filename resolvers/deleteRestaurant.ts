// @deno-types="npm:@types/express@4"
import {Request, Response} from "express"
import { Restaurant } from "../types.ts";
import { RestaurantModel } from "../db/restaurant.ts";

export const deleteRestaurant = async(req: Request<{},{},{}>,res:Response<Restaurant>) => {
    
    try{
        const id = req.params.id
        const restaurant = await RestaurantModel.findOneAndDelete(id).exec()
        res.status(200).send("Restaurant deleted")

    }catch(e){
        res.status(500).send(e);
    }

}
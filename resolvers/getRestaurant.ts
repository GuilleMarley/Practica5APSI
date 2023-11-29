// @deno-types="npm:@types/express@4"
import {Request, Response} from "express"
import { Restaurant } from "../types.ts";
import { RestaurantModel } from "../db/restaurant.ts";

export const getRestaurant = async(req: Request<{},{},{}>,res:Response<Restaurant>) => {
    try {
        const id = req.params.id
        const restaurant = await RestaurantModel.findById(id).exec()
        if(!restaurant){
            return res.status(404).json({error: "Restaurant not found"}).send();
        }
        res.status(200).json(restaurant).send();
    }
    catch(e){
        console.log(e);
        res.status(500).json({error: "Internal server error"}).send();
    }
}
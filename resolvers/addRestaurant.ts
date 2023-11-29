// @deno-types="npm:@types/express@4"
import {Request, Response} from "express"
import { Restaurant } from "../types.ts";
import { RestaurantModel } from "../db/restaurant.ts";

export const addRestaurant = async(req: Request<{},{},{}>,res:Response<Restaurant>) => {
    const {name, address, CIF} = req.body;
    try{
        const restaurant = new RestaurantModel({
            name, address, CIF
        })

        await restaurant.save();
        res.status(200).send("Restaurant added")

    }catch(e){
        res.status(500).send(e);
    }

}
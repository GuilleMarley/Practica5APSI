// @deno-types="npm:@types/express@4"
import {Request, Response} from "express"
import { Booking } from "../types.ts";
import { BookingModel } from "../db/bookings.ts";
import { RestaurantModel } from "../db/restaurant.ts";
import { ClientModel } from "../db/client.ts";

export const addBooking = async(req: Request<{},{},{}>,res:Response<Booking>) => {
    const {date} = req.body
    const { idClient, idRestaurant} = req.body

    try{

        const client = await ClientModel.findById(idClient).exec()
        if(!client){
            return res.status(404).json({error: "Client not found"}).send();
        }
        
        const restaurant = await RestaurantModel.findById(idRestaurant).exec()
        if(!restaurant){
            return res.status(404).json({error: "Restaurant not found"}).send();
        }

        const autoDate = new Date() || date

        const booking = new BookingModel({
            date: autoDate, idClient, idRestaurant
        })

        await booking.save();
        res.status(200).send("Booking added")

    }catch(e){
        res.status(500).send(e);
    }

}
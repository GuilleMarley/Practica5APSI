// @deno-types="npm:@types/express@4"
import {Request, Response} from "express"
import { Booking } from "../types.ts";
import { BookingModel } from "../db/bookings.ts";

export const deleteBooking = async(req: Request<{},{},{}>,res:Response<Booking>) => {
    //delete a booking by findOneAndDelete from the database
    try{
        const id = req.params.id
        const booking = await BookingModel.findOneAndDelete(id);
        res.status(200).send("Booking deleted")
    }catch(e){
        res.status(500).send(e);
    }
}
// @deno-types="npm:@types/express@4"
import {Request, Response} from "express"
import { Booking } from "../types.ts";
import { BookingModel } from "../db/bookings.ts";

//get a booking by id fromthe database
export const getBooking = async (req: Request<{}, {}, {}>, res: Response<Booking>) => {
    try {
        const id = req.params.id

        let booking = await BookingModel.findById(id);

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" }).send();
        }

        try {
            booking = await BookingModel.findById(id)
                .populate('idClient', 'firstName lastName')
                .populate('idRestaurant', 'name');
        } catch (e) {
            console.error('Error populating idClient and idRestaurant:', e);
        }

        console.log(booking);

        res.status(200).json(booking).send();
    } catch (e) {
        res.send(e);
    }
};
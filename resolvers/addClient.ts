// @deno-types="npm:@types/express@4"
import {Request, Response} from "express"
import { Client } from "../types.ts";
import { ClientModel } from "../db/client.ts";

export const addClient = async(req: Request<{},{},{}>,res:Response<Client>) => {
    const {firstName, lastName, DNI, email, phoneNumber} = req.body;
    try{
        const client = new ClientModel({
            firstName, lastName, DNI, email, phoneNumber
        })

        await client.save();
        res.status(200).send("Client added")

    }catch(e){
        res.status(500).send(e);
    }

}
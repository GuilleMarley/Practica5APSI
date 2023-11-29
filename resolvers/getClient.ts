// @deno-types="npm:@types/express@4"
import {Request, Response} from "express"
import { Client } from "../types.ts";
import { ClientModel } from "../db/client.ts";

export const getClient = async(req: Request<{},{},{}>,res:Response<Client>) => {

    try {
        const id = req.params.id
        const client = await ClientModel.findById(id).exec()
        if(!client){
            return res.status(404).json({error: "Client not found"}).send();
        }
        res.status(200).json(client).send();
    }
    catch(e){
        console.log(e);
        res.status(500).json({error: "Internal server error"}).send();
    }
}
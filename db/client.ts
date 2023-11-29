import mongoose from "mongoose";
import { Client } from "../types.ts";

const Schema = mongoose.Schema

const ClientSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    DNI: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true, unique: true },
    bookings: { type: Schema.Types.ObjectId, ref: "Booking" },
  },
  { timestamps: true }
);

ClientSchema.path("DNI").validate((dni) => {
    //validar estructura de dni
    //https://stackoverflow.com/questions/9222376/testing-mongoosejs-validations
    //https://sio2sio2.github.io/doc-linux/02.conbas/10.texto/01.regex.html
    // El /d se refiere a un caracter que sea un digito [0-9]
    const dniStructure = /^\d{8}[a-zA-Z]$/
    return dniStructure.test(dni);
}) ;

ClientSchema.path("email").validate((email) => {
    //validar estructura de email
    //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    //https://sio2sio2.github.io/doc-linux/02.conbas/10.texto/01.regex.html
    // El /w se refiere a un caracter de palabra es decir letra, digito o "_"
    const emailStructure = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/
    return emailStructure.test(email);
}) ;

ClientSchema.path("phoneNumber").validate((phone) => {
    if(phone.toString().length != 9) return false
    return true
}) ;

//https://mongoosejs.com/docs/api/document.html#Document.prototype.isModified()
//para el isModified me he ayudado de los docs de mongoose.
//El manejo de charAt y slice lo he sacado del manejo de strings de typescript al igual que el toUpperCase.
ClientSchema.pre('save', function(next) {
  if (this.isModified('firstName')) {
    this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1);
  }

  if (this.isModified('lastName')) {
    this.lastName = this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1);
  }

  if(this.isModified('DNI')){
    this.DNI = this.DNI.slice(0, 8) + this.DNI.charAt(8).toUpperCase();
  }

  next();
});

//funcion post que muestra el cliente que se ha creado
ClientSchema.post("save", async function () {
  const client = await mongoose.model("Client").findById(this._id).exec()
  console.log(client)
})

export type ClientModelType = mongoose.Document & Omit<Client, "bookings" | "id">
export const ClientModel = mongoose.model<ClientModelType> ("Client", ClientSchema)
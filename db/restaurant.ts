import mongoose from "mongoose";
import { Restaurant } from "../types.ts";

const Schema = mongoose.Schema

const restaurantSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    CIF: { type: String, required: true, unique: true },
    bookings: { type: Schema.Types.ObjectId, ref: "Booking" },
  },
  { timestamps: true }
);

restaurantSchema.path("CIF").validate((cif) => {
    //validar estructura de cif
    // El /w se refiere a un caracter de palabra es decir letra, digito o "_"
    const cifStructure = /^[a-zA-Z]\d{8}$/
    return cifStructure.test(cif);
})

//https://mongoosejs.com/docs/api/document.html#Document.prototype.isModified()
//lo mismo que en cliente para el nombre y la direccion dek restaurante con el isModified
restaurantSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
  }

  if (this.isModified('address')) {
    this.address = this.address.charAt(0).toUpperCase() + this.address.slice(1);
  }

  next();
});

//funcion post que muestra el restaurante que se ha creado
restaurantSchema.post("save", async function () {
  const restaurant = await mongoose.model("Restaurant").findById(this._id).exec()
  console.log(restaurant)
})

restaurantSchema.post("deleteMany", async function () {
  await mongoose.model("Booking").deleteMany({idRestaurant: this._id}).exec()
  await mongoose.model("Client").updateMany({}, { $pull: { bookings: { $in: this._id } } }).exec()
})

restaurantSchema.post("findOneAndDelete", async function (doc) {
  if(!doc) return

  await mongoose.model("Booking").deleteMany({idRestaurant: doc._id}).exec()
  await mongoose.model("Client").updateMany({}, { $pull: { bookings: { $in: doc._id } } }).exec()
})

export type RestaurantModelType = mongoose.Document & Omit<Restaurant, "bookings" | "id">
export const RestaurantModel = mongoose.model<RestaurantModelType>("Restaurant", restaurantSchema)

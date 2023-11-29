import mongoose from "mongoose";
import { Booking } from "../types.ts";

const Schema = mongoose.Schema

const bookingSchema = new Schema(
  {
    date: { type: String, required: true },
    idClient: { type: Schema.Types.ObjectId, ref: "Client" },
    idRestaurant: { type: Schema.Types.ObjectId, ref: "Restaurant"},
  },
  { timestamps: true }
);


bookingSchema.post("save", async function () {

  const client = await mongoose.model("Client").findById(this.idClient).exec()
  const restaurant = await mongoose.model("Restaurant").findById(this.idRestaurant).exec()

  if(!client || !restaurant) return

  await mongoose.model("Client").findByIdAndUpdate(this.idClient, { $push: { bookings: this._id } }).exec()
  await mongoose.model("Restaurant").findByIdAndUpdate(this.idRestaurant, { $push: { bookings: this._id } }).exec()

  //Y se muestra el booking 
  const booking = await mongoose.model("Booking").findById(this._id).exec()

})

bookingSchema.post("findOneAndDelete", async function (doc) {
  if(!doc) return

  const client = await mongoose.model("Client").findById(doc.idClient).exec()
  const restaurant = await mongoose.model("Restaurant").findById(doc.idRestaurant).exec()

  if(!client || !restaurant) return

  await mongoose.model("Client").findByIdAndUpdate(doc.idClient, { $pull: { bookings: doc._id } }).exec()
  await mongoose.model("Restaurant").findByIdAndUpdate(doc.idRestaurant, { $pull: { bookings: doc._id } }).exec()
})

export type BookingModelType = mongoose.Document & Omit<Booking, "id">
export const BookingModel = mongoose.model<BookingModelType>("Booking", bookingSchema)
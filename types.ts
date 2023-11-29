export type Client = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number,
    DNI: string,
    bookings: Booking[]
}

export type Restaurant = {
    id: string,
    name: string,
    CIF: string,
    address: string,
    bookings: Booking[]
}

export type Booking = {
    id: string,
    date: string,
    client: string,
    restaurant: string
}
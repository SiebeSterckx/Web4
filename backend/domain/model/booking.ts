import { Car } from "./car";

/**
Represents a booking of one or more cars made by a user.
*/
export class Booking {
    private id: number;
    private startDate: Date;
    private endDate: Date;
    private userId: number;
    private cars: Car[];

    /**
     Creates a new booking instance.
     */
    constructor(id: number, startDate: Date, endDate: Date, userId: number, cars: Car[]) {
        this.setId(id);
        this.setStartDate(startDate);
        this.setEndDate(endDate);
        this.setUserId(userId);

        this.setCars(cars);
    }

    /**
    Sets the booking's ID.
    @param id - The booking's ID.
    */
    public setId(id: number) {
        this.id = id;
    }

    /**
    Sets the start date of the booking.
    @param startDate - The start date of the booking.
    */
    public setStartDate(startDate: Date) {
        this.startDate = startDate;
    }

    /**
    Sets the end date of the booking.
    @param endDate - The end date of the booking.
    */
    public setEndDate(endDate: Date) {
        this.endDate = endDate;
    }

    /**
    Sets the ID of the user who made the booking.
    @param id - The ID of the user who made the booking.
    */
    public setUserId(id: number) {
        this.userId = id;
    }

    /**
    Sets the array of cars included in the booking.
    @param cars - An array of cars included in the booking.
    */
    public setCars(cars: Car[]) {
        this.cars = cars;
    }

    //ipv mapper, krijgt Booking object mee en maakt nieuwe Booking op basis van zijn parameters
    static from(booking: Booking): Booking{
        return new Booking(booking.id, booking.startDate, booking.endDate, booking.userId, booking.cars);
    }
}
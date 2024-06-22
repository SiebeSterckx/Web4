import { Booking } from "../domain/model/booking";
import { getAllBookings, getBookingById, createBooking, deleteBooking } from "../domain/data-access/booking.db";
import {CreateBookingDto} from "../types/bookingDto";

/**
 * Service class that provides functionality for managing bookings.
 */
export class BookingService {

    /**
     * Fetches all bookings from the database and returns an array of Booking objects.
     * @returns {Promise<Booking[]>} A Promise that resolves to an array of Booking objects.
     */
    public async getAllBookings(): Promise<Booking[]> {
        return await getAllBookings();
    }

    /**
     * Fetches a single booking from the database by ID and returns a Booking object.
     * @param {number} id - The ID of the booking to fetch.
     * @returns {Promise<Booking|undefined>} A Promise that resolves to a Booking object, or undefined if the booking does not exist.
     */
    public async getBookingById(id: number): Promise<Booking | undefined> {
        return await getBookingById(id);
    }

    /**
     * Creates a new booking in the database with the specified start and end dates, booker ID, and an array of car objects. Returns a Promise that resolves to a Booking object.
     * @param {Booking} booking - An object containing the start and end dates, booker ID, and an array of car objects to be added to the booking.
     * @returns {Promise<Booking>} A Promise that resolves to a Booking object representing the newly created booking.
     * @throws Will throw an error if the booking could not be created.
     */
    public async createBooking(booking: CreateBookingDto): Promise<Booking> {
        return await createBooking(booking);
    }

    /**
     * Deletes a booking from the database by ID.
     * @param {number} id - The ID of the booking to delete.
     * @returns {Promise<void>} A Promise that resolves when the booking has been successfully deleted.
     * @throws {Error} If the booking could not be deleted.
     */
    public async deleteBooking(id: number): Promise<void> {
        return await deleteBooking(id);
    }
}

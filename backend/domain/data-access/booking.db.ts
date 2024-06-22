/*
import database from "../data-access/database";
//OF
import { PrismaClient } from '@prisma/client';
*/

import {Booking} from "../model/booking";
import { PrismaClient, Booking as prismaBooking } from '@prisma/client';
import {CreateBookingDto} from "../../types/bookingDto";
import {Car} from "../model/car";


const prisma = new PrismaClient();


/**
 * Fetches all bookings from the database and returns an array of Booking objects.
 * @returns {Promise<Booking[]>} A Promise that resolves to an array of Booking objects.
 */
export async function getAllBookings(): Promise<any[]> {
    const bookings = await prisma.booking.findMany({
        select: {
            id: true,
            startDate: true,
            endDate: true,
            userId: true,
            cars: {
                select: {
                    chassisNumber: true,
                },
            },
        },
    });

    return bookings.map((booking) => {
        return {
            id: booking.id,
            startDate: booking.startDate,
            endDate: booking.endDate,
            userId: booking.userId,
            cars: booking.cars.map((car) => car.chassisNumber),
        };
    });
}



/**
 * Fetches a single booking from the database by ID and returns a Booking object.
 * @param {number} id - The ID of the booking to fetch.
 * @returns {Promise<Booking|undefined>} A Promise that resolves to a Booking object, or undefined if the booking does not exist.
 */
export async function getBookingById(id: number) : Promise<Booking | undefined > {
    const booking : prismaBooking = await prisma.booking.findUnique({
        where: {
            id: id,
        },
        include: {
            cars: true,
        },
    });

    return booking ? Booking.from(<Booking><unknown>booking) : undefined;
}

/**

 Inserts the chassis numbers of the cars in the database associated with a new booking with the specified start and end dates, booker ID, and an array of car objects. Returns a Promise that resolves to a Booking object.
 @param {CreateBookingDto} booking - An object containing the start and end dates, booker ID, and an array of car objects to be added to the booking.
 @returns {Promise<Booking>} A Promise that resolves to a Booking object representing the newly created booking.
 @throws Will throw an error if the booking could not be created.
 */

export async function createBooking(booking: CreateBookingDto): Promise<Booking> {
    console.log(booking.endDate, booking.startDate, booking.userId, booking.cars)
    try {
        const prismaBooking = await prisma.booking.create({
            data: {
                startDate: booking.startDate,
                endDate: booking.endDate,
                booker: {
                    connect: { id: booking.userId },
                },
                cars: {
                    connect: booking.cars.map((chassisNumber) => ({ chassisNumber })),
                },
            },
            include: {
                cars: true,
                booker: true,
            },
        });

        return booking ? Booking.from(<Booking><unknown>prismaBooking) : undefined;
    } catch (error) {
        throw new Error(`Could not create booking: ${error.message}`);
    }
}



/**
 * Deletes a booking from the database by ID.
 * @param {number} id - The ID of the booking to delete.
 * @returns {Promise<void>} A Promise that resolves when the booking has been successfully deleted.
 * @throws {Error} If the booking could not be deleted.
 */
export async function deleteBooking(id: number): Promise<void> {
    try {
        await prisma.booking.delete({
            where: {
                id: id,
            },
        });
    } catch (error) {
        throw new Error('Could not delete booking with ID ${id}: ${error.message}');
    }
}
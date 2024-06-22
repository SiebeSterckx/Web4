import {Booking} from "../types";

const backendUrl = process.env.BACKENDURL;

// Retrieve all bookings + authenticate user
const getAllBookings = async () => {
    const token = sessionStorage.getItem("token");

    return fetch(backendUrl + "/bookings", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

}

// Create a booking + authenticate user
const createBooking = async (booking: Booking) => {
    const token = sessionStorage.getItem("token");

    // Extract the necessary properties from the booking object
    const { startDate, endDate, userId, cars } = booking;

    // Create a new booking object with the required properties
    const createBookingObj = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        userId: userId,
        cars: cars.map((car) => car.chassisNumber),
    };

    console.log(createBookingObj);

    return fetch(backendUrl + "/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(createBookingObj),
    });
};


// Delete a booking + authenticate user
const deleteBooking = (bookingId: number) => {
    console.log("deleteBooking");
    const token = sessionStorage.getItem("token");
    return fetch(backendUrl + "/bookings/" + bookingId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

// BookingService object that contains all the functions
const BookingService = {
    getAllBookings,
    createBooking,
    deleteBooking,
}

export default BookingService;
import React, { useEffect, useState } from "react";
import { Booking } from "../../types";
import styles from "../../styles/Home.module.css";
import { getCarByChassisNumber } from "../../services/CarService";

type Props = {
    bookings: Array<Booking>;
    onDelete: (booking: Booking) => void;
};

const BookingOverviewTable: React.FC<Props> = ({bookings, onDelete}: Props) => {
    // State variable to store car data retrieved from API
    const [cars, setCars] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        // Fetch car data for each booking's chassis number
        const fetchCars = async () => {
            // Create a map to store car data by chassis number
            const carMap: { [key: string]: any } = {};
            if (bookings) {
                for (const booking of bookings) {
                    for (const chassisNumber of booking.cars) {
                        // Check if car data is not already fetched
                        if (!carMap[chassisNumber]) {
                            // Fetch car data from API
                            const response = await getCarByChassisNumber(chassisNumber);
                            const car = await response.json();
                            carMap[chassisNumber] = car;
                        }
                    }
                }
                // Update the state variable with the fetched car data
                setCars(carMap);
            }
        };
        // Call the fetchCars function
        fetchCars();
    }, [bookings]);

    return (
        <div className={styles.bookingContainer}>
            {bookings &&
                bookings.map((booking, index) => (
                    <div key={index}>
                        <div className={styles.firstRowBookingOverview}>
                            <p className={styles.bookingId}>
                                {"Booking ID : " + booking.id}
                            </p>
                            <p className={styles.bookingStartDateAndEndDate}>
                                {"Van " +
                                    new Date(booking.startDate).toLocaleDateString()}{" "}
                                <br />
                                {" Tot " + new Date(booking.endDate).toLocaleDateString()}
                            </p>
                            <div className={styles.bookingButtons}>
                                <button className={styles.deleteButton} onClick={() => onDelete(booking)}>
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className={styles.secondRowBookingOverview}>
                        </div>

                        <div className={styles.thirdRowBookingOverview}>
                            <h2 className={styles.bookingCarHeader}>Selected car(s)</h2>
                        </div>

                        <div className={styles.fourthRowBookingOverviewOutline}>
                            {booking.cars.map((chassisNumber, index) => {
                                const car = cars[chassisNumber];
                                return (
                                    <div key={index} className={styles.fourthRowBookingOverview}>
                                        <p className={styles.bookingCarChassis}>{chassisNumber}</p>
                                        <p className={styles.bookingCarBrandAndModel}>
                                            {car?.brand + " - " + car?.model}
                                        </p>
                                        <p className={styles.bookingCarFuelType}>{car?.fuelType}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default BookingOverviewTable;

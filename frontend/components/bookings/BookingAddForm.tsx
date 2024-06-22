import React, { useState, useEffect } from "react";
import { Booking, Car } from "../../types";
import styles from "../../styles/Home.module.css";
import {getAllCars, getAllCarsBooking} from "../../services/CarService";
import {getUserByUsername} from "../../services/UserService";


type Props = {
    onSubmit: (booking: Booking) => void;
    onCancel: () => void;
};

const BookingAddForm: React.FC<Props> = ({ onSubmit, onCancel }: Props) => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [userId, setUserId] = useState();
    const [selectedCars, setSelectedCars] = useState<Car[]>([]);
    const [carsList, setCars] = useState<Car[]>([]);

    useEffect(() => {
        getCars();
        fetchUserId();
    }, []);

    const getCars = async () => {
        try {
            const cars = await getAllCarsBooking();
            setCars(cars);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUserId = async () => { // OK
        const userName = sessionStorage.getItem("username");
        const loggedInUserResponse = await getUserByUsername(userName);
        const userId = await loggedInUserResponse.id;
        setUserId(userId);
    };



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const booking: Booking = {
            id: 0,
            startDate: startDate,
            endDate: endDate,
            userId: userId,
            cars: selectedCars,
        };
        console.log(booking);
        onSubmit(booking);
    };


    const handleCancel = () => {
        onCancel();
    };


    return (
        <div className={styles.bookingFormsContainer}>
            <h2>Create new Booking</h2>

            <form onSubmit={handleSubmit}>
                <div className={styles.firstRowBookingForm}>
                    <div>
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate.toISOString().split("T")[0]}
                            onChange={(event) => setStartDate(new Date(event.target.value))}
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate.toISOString().split("T")[0]}
                            onChange={(event) => setEndDate(new Date(event.target.value))}
                        />
                    </div>
                </div>

                <div className={styles.secondRowBookingForm}>
                    <h2>Select the car(s)</h2>
                </div>

                <div className={styles.thirdRowBookingForm}>
                    {carsList.map((car) => (
                        <div key={car.chassisNumber}>
                            <input
                                type="checkbox"
                                id={car.chassisNumber}
                                value={car.chassisNumber}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        setSelectedCars([...selectedCars, car]);
                                    } else {
                                        setSelectedCars(
                                            selectedCars.filter(
                                                (selectedCar) => selectedCar.chassisNumber !== car.chassisNumber
                                            )
                                        );
                                    }
                                }}
                            />
                            <label htmlFor={car.chassisNumber}>
                                {car.chassisNumber} - {car.brand} {car.model} ({car.carType} - {car.fuelType}) - Mileage: {car.mileage}
                            </label>
                        </div>
                    ))}
                </div>

                <div>
                    <button className={styles.confirmButton} type="submit">
                        Confirm
                    </button>
                    <button className={styles.cancelButton} type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingAddForm;
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Booking, Car} from "../../types";
import React, {useEffect, useState} from "react";
import BookingService from "../../services/BookingService";
import BookingOverview from "../../components/bookings/BookingOverviewTable";
import BookingAddForm from "../../components/bookings/BookingAddForm";
import styles from "../../styles/Home.module.css";
import Nav from "../../components/Nav";

const Bookings : React.FC = () => {

    // State variable for storing bookings
    const [bookings, setBookings] = useState<Array<Booking>>();
    // State variable for controlling the visibility of the add form
    const [showAddForm, setShowAddForm] = useState(false);
    // State variable for storing error messages
    const [error, setError] = useState<string>("");

    // Fetches all bookings from the db
    const getBookings = async () => {
        console.log("index-getBookings");
        setError("");
        const response = await BookingService.getAllBookings();

        if (!response.ok) {
            if (response.status === 401) {
                setError("Unauthorized");
            } else {
                setError(response.statusText);
            }
        } else {
            try {
                const bookings = await response.json();
                setBookings(bookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                throw new Error(error.message);
            }
        }
    };

    // Handles the add booking action
    const handleAddBooking = () => {
        setShowAddForm(true);
    };

    // Handles canceling the add form
    const handleCancelAddForm = () => {
        setShowAddForm(false);
    };

    // Handles saving a new booking
    const handleSaveBooking = async (booking: Booking) => {
        try {
            await BookingService.createBooking(booking);
            await getBookings();
            setShowAddForm(false);
        } catch (error) {
            console.error("Error adding booking:", error);
            throw new Error(error.message);
        }
    };

    // Handles deleting a booking
    const handleDeleteBooking = async (booking: Booking) => {
        try {
            await BookingService.deleteBooking(booking.id);
            getBookings();
        } catch (error) {
            console.error("Error deleting booking:", error);
            throw new Error(error)
        }
    }

    // Fetches bookings when the component mounts
    useEffect(() => {
        console.log("index-useEffect")
        getBookings()
    }, [])

    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>Bookings</title>
                </Head>
                <Header></Header>
                <Nav></Nav>
                <main>
                    <section className={styles.containerBookings}>
                        <div className={styles.bookingForms}>
                            {showAddForm && (
                                <BookingAddForm
                                    onSubmit={handleSaveBooking}
                                    onCancel={handleCancelAddForm}
                                />
                            )}
                        </div>
                        <div className={styles.bookingOverview}>
                            <button onClick={handleAddBooking} className={styles.addButton}>
                                Create Booking
                            </button>
                            <BookingOverview bookings={bookings}
                                          onDelete={handleDeleteBooking}
                            />
                        </div>
                    </section>
                </main>
                <Footer></Footer>
            </div>
        </>
    )
}


export default Bookings
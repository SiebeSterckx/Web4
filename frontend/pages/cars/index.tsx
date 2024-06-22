import React, { useState } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Car } from "../../types";
import CarService from "../../services/CarService";
import CarsOverview from "../../components/cars/CarOverviewTable";
import CarAddForm from "../../components/cars/CarAddForm";
import CarUpdateForm from "../../components/cars/CarUpdateForm";
import styles from "../../styles/Home.module.css";
import Nav from "../../components/Nav";

const Cars: () => void = () => {

    // State variable for storing cars
    const [cars, setCars] = useState<Array<Car>>();
    // State variable for controlling the visibility of the add form
    const [showAddForm, setShowAddForm] = useState(false);
    // State variable for controlling the visibility of the update form
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    // State variable for storing the selected car for update
    const [selectedCar, setSelectedCar] = useState<Car>();
    // State variable for storing error messages
    const [error, setError] = useState<string>("");

    // Fetches all cars from the db
    const getCars = async () => {
        console.log("index-getCars");
        setError("");
        const response = await CarService.getAllCars();

        if (!response.ok) {
            if (response.status === 401) {
                setError("Unauthorized");
            } else {
                setError(response.statusText);
            }
        } else {
            try {
                const cars = await response.json();
                setCars(cars);
            } catch (error) {
                console.error("Error fetching cars:", error);
                throw new Error(error.message);
            }
        }
    };

    // Handles the add car action
    const handleAddCar = () => {
        setShowAddForm(true);
        setShowUpdateForm(false)
    };

    // Handles canceling the add form
    const handleCancelAddForm = () => {
        setShowAddForm(false);
    };

    // Handles saving a new car
    const handleSaveCar = async (car: Car) => {
        try {
            await CarService.createCar(car);
            getCars();
            setShowAddForm(false);
        } catch (error) {
            console.error("Error adding car:", error);
            throw new Error(error.message);
        }
    };

    // Handles managing a car
    const handleManageCar = (car: Car) => {
        setSelectedCar(car);
        setShowUpdateForm(true);
        setShowAddForm(false)
    };

    // Handles canceling the update form
    const handleCancelUpdateForm = () => {
        setShowUpdateForm(false);
    };

    // Handles updating a car
    const handleUpdateCar = async (car: Car) => {
        try {
            await CarService.updateCar(car.chassisNumber, car);
            getCars();
            setShowUpdateForm(false);
        } catch (error) {
            console.error("Error updating car:", error);
            throw new Error(error.message);
        }
    };

    // Handles deleting a car
    const handleDeleteCar = async (car: Car) => {
        try {
            await CarService.deleteCar(car.chassisNumber);
            getCars();
            setShowUpdateForm(false);
        } catch (error) {
            console.error("Error deleting car:", error);
            throw new Error(error)
        }
    }

    // Fetches cars when the component mounts
    React.useEffect(() => {
        console.log("index-useEffect");
        getCars();
    }, []);

    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>Cars</title>
                </Head>
                <Header/>
                <Nav/>
                <main>
                    <section className={styles.containerCars}>
                        <div className={styles.carForms}>
                            {showAddForm && (
                                <CarAddForm
                                    onSubmit={handleSaveCar}
                                    onCancel={handleCancelAddForm}
                                />
                            )}
                            {showUpdateForm && (
                                <CarUpdateForm
                                    car={selectedCar}
                                    onSubmit={handleUpdateCar}
                                    onCancel={handleCancelUpdateForm}
                                />
                            )}
                        </div>
                        <div className={styles.carOverview}>
                            <button onClick={handleAddCar} className={styles.addButton}>
                                Add Car
                            </button>
                            <CarsOverview cars={cars}
                                          onManage={handleManageCar}
                                          onDelete={handleDeleteCar}
                            />
                        </div>
                    </section>
                </main>
                <Footer/>
            </div>
        </>
    );
};

export default Cars;

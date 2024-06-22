import React, { useState } from "react";
import { Car } from "../../types";
import styles from "../../styles/Home.module.css";

type Props = {
    onSubmit: (car: Car) => void;
    onCancel: () => void;
};

// CarAddForm component
const CarAddForm: React.FC<Props> = ({ onSubmit, onCancel }: Props) => {

    // State variables for storing the car parameters
    const [chassisNumber, setChassisNumber] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [carType, setCarType] = useState("");
    const [buildYear, setBuildYear] = useState("");
    const [color, setColor] = useState("");
    const [mileage, setMileage] = useState("");
    const [fuelType, setFuelType] = useState("");

    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newCar: Car = {
            chassisNumber,
            brand,
            model,
            carType,
            buildYear: parseInt(buildYear),
            color,
            mileage: parseInt(mileage),
            fuelType,
        };
        onSubmit(newCar);
    };

    // Handle cancel button click
    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className={styles.carFormsContainer}>
            <h2>Add new Car</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.firstRowCarForm}>
                    <div className={styles.carChassisInput}>
                        <label htmlFor="chassisNumber">Chassis Number:</label>
                        <input
                            type="text"
                            id="chassisNumber"
                            value={chassisNumber}
                            onChange={(event) => setChassisNumber(event.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.secondRowCarForm}>
                    <div className={styles.carBrandInput}>
                        <label htmlFor="brand">Brand:</label>
                        <input
                            type="text"
                            id="brand"
                            value={brand}
                            onChange={(event) => setBrand(event.target.value)}
                        />
                    </div>
                    <div className={styles.carModelInput}>
                        <label htmlFor="model">Model:</label>
                        <input
                            type="text"
                            id="model"
                            value={model}
                            onChange={(event) => setModel(event.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.thirdRowCarForm}>
                    <div className={styles.carType}>
                        <label htmlFor="carType">Car Type:</label>
                        <input type="text"
                               id="carType"
                               value={carType}
                               onChange={(event) => setCarType(event.target.value)}
                        />
                    </div>
                    <div className={styles.carFuelTypeInput}>
                        <label htmlFor="fuelType">Fuel Type:</label>
                        <input
                            type="text"
                            id="fuelType"
                            value={fuelType}
                            onChange={(event) => setFuelType(event.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.fourthRowCarForm}>
                    <div className={styles.carColorInput}>
                        <label htmlFor="color">Color:</label>
                        <input
                            type="text"
                            id="color"
                            value={color}
                            onChange={(event) => setColor(event.target.value)}
                        />
                    </div>
                    <div className={styles.carBuildYearInput}>
                        <label htmlFor="buildYear">Build Year:</label>
                        <input
                            type="number"
                            id="buildYear"
                            value={buildYear}
                            onChange={(event) => setBuildYear(event.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.fifthRowCarForm}>
                    <div className={styles.carMileageInput}>
                        <label htmlFor="mileage">Mileage:</label>
                        <input
                            type="number"
                            id="mileage"
                            value={mileage}
                            onChange={(event) => setMileage(event.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.carAddFormButtons}>
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

export default CarAddForm;

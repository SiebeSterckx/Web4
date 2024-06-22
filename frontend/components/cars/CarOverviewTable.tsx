import React from "react"
import { Car } from "../../types"
import styles from "../../styles/Home.module.css";

type Props = {
    cars: Array<Car>
    onManage: (car: Car) => void
    onDelete: (car: Car) => void
}

// CarOverviewTable component
const CarOverviewTable : React.FC<Props> = ({cars, onManage, onDelete}:Props) => {
    return (
        <div className={styles.carContainer}>
            {cars && cars.map((car, index) => (
                <div key={index}>
                    <div className={styles.firstRowCarOverview}>
                        <p className={styles.carType}>
                            {car.carType}
                        </p>
                        <p className={styles.carBrandAndModel}>
                            {car.brand + ' ' + car.model}
                        </p>
                        <div className={styles.carButtons}>
                            <button className={styles.updateButton} onClick={() => onManage(car)}>
                                Update
                            </button>
                            <button className={styles.deleteButton} onClick={() => onDelete(car)}>
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className={styles.secondRowCarOverview}>
                        <p className={styles.carColor}>
                            ( {car.color} )
                        </p>
                    </div>

                    <div className={styles.thirdRowCarOverview}>
                        <p className={styles.carChassisText}>
                            Chassis n°:
                        </p>
                        <p className={styles.carMileageText}>
                            Mileage:
                        </p>
                        <p className={styles.carBuildYearText}>
                            Build Year:
                        </p>
                        <p className={styles.carFuelTypeText}>
                            Fuel Type:
                        </p>
                    </div>

                    <div className={styles.fourthRowCarOverview}>
                        <p className={styles.carChassis}>
                            {car.chassisNumber}
                        </p>
                        <p className={styles.carMileage}>
                            {car.mileage}
                        </p>
                        <p className={styles.carBuildYear}>
                            {car.buildYear}
                        </p>
                        <p className={styles.carFuelType}>
                            {car.fuelType}
                        </p>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default CarOverviewTable

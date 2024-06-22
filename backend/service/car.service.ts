import { Car } from "../domain/model/car";
import { getAllCars, getCarByChassisNumber, getCarsByBrand, getCarsByModel, getCarsByCarType, getCarsByBuildYear, getCarsByColor, getCarsByFuelType, createCar, deleteCar, updateCar } from "../domain/data-access/car.db";
import {CreateCarDto, UpdateCarDto} from "../types/carDto";

/**
 * Service class for handling car-related operations.
 */
export class CarService {

    /**
     * Retrieves all cars from the database and returns an array of Car objects.
     * @returns {Promise<Car[]>} A Promise that resolves to an array of Car objects.
     */
    public async getAllCars(): Promise<Car[]> {
        return await getAllCars();
    }

    /**
     * Retrieves a car from the database by its chassis number.
     * @param {string} chassisNumber - The chassis number of the car to retrieve.
     * @returns {Promise<Car>} A Promise that resolves to the retrieved Car object.
     */
    public async getCarByChassisNumber(chassisNumber: string): Promise<Car> {
        return await getCarByChassisNumber(chassisNumber);
    }

    /**
     * Retrieves all cars from the database with a matching brand.
     * @param {string} brand - The brand of the cars to retrieve.
     * @returns {Promise<Car[]>} A Promise that resolves to an array of Car objects with the specified brand.
     */
    public async getCarsByBrand(brand: string): Promise<Car[]> {
        return await getCarsByBrand(brand);
    }

    /**
     * Retrieves all cars from the database with a matching model.
     * @param {string} model - The model of the cars to retrieve.
     * @returns {Promise<Car[]>} A Promise that resolves to an array of Car objects with the specified model.
     */
    public async getCarsByModel(model: string): Promise<Car[]> {
        return await getCarsByModel(model);
    }

    /**
     * Retrieves all cars from the database with a matching car type.
     * @param {string} carType - The car type of the cars to retrieve.
     * @returns {Promise<Car[]>} A Promise that resolves to an array of Car objects with the specified car type.
     */
    public async getCarsByCarType(carType: string): Promise<Car[]> {
        return await getCarsByCarType(carType);
    }

    /**
     * Retrieves all cars from the database with a matching build year.
     * @param {number} buildYear - The build year of the cars to retrieve.
     * @returns {Promise<Car[]>} A Promise that resolves to an array of Car objects with the specified build year.
     */
    public async getCarsByBuildYear(buildYear: number): Promise<Car[]> {
        return await getCarsByBuildYear(buildYear);
    }

    /**
     * Retrieves all cars from the database with a matching color.
     * @param {string} color - The color of the cars to retrieve.
     * @returns {Promise<Car[]>} A Promise that resolves to an array of Car objects with the specified color.
     */
    public async getCarsByColor(color: string): Promise<Car[]> {
        return await getCarsByColor(color);
    }

    /**
     * Retrieves all cars from the database with a matching fuel type.
     * @param {string} fuelType - The fuel type of the cars to retrieve.
     * @returns {Promise<Car[]>} A Promise that resolves to an array of Car objects with the specified fuel type.
     */
    public async getCarsByFuelType(fuelType: string): Promise<Car[]> {
        return await getCarsByFuelType(fuelType);
    }

    /**
     * Creates a new car in the database with the specified details.
     * @param {CreateCarDto} car - The car object containing the details for the new car.
     * @returns {Promise<Car>} A Promise that resolves to the created car.
     * @throws {Error} If the car could not be created.
     */
    public async createCar(car: CreateCarDto): Promise<Car> {
        return await createCar(car);
    }

    /**
     * Deletes a car from the database by its chassis number.
     * @param {string} chassisNumber - The chassis number of the car to delete.
     * @returns {Promise<void>} A Promise that resolves when the car has been successfully deleted.
     * @throws {Error} If the car could not be deleted.
     */
    public async deleteCar(chassisNumber: string): Promise<void> {
        return await deleteCar(chassisNumber);
    }

    /**
     * Updates a car in the database with the specified chassis number and new data.
     * @param {string} chassisNumber - The chassis number of the car to update.
     * @param {UpdateCarDto} car - An object representing the updates to apply to the car.
     * @returns {Promise<Car>} A Promise that resolves to the updated car.
     * @throws {Error} If the car with the specified chassis number does not exist, or if there is an error while updating the car.
     */
    public async updateCar(chassisNumber: string, car: UpdateCarDto): Promise<Car> {
        return await updateCar(chassisNumber, car);
    }
}


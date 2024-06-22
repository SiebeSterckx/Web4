import {Car} from "../model/car";
import { PrismaClient, Car as prismaCar } from '@prisma/client';
import {CreateCarDto, UpdateCarDto} from "../../types/carDto";


const prisma = new PrismaClient();

/**
 * Fetches all cars from the database and returns an array of Cars objects.
 * @returns {Promise<Car[]>} A promise that resolves to an array of Car objects.
 */
export async function getAllCars(): Promise<Car[]> {
    const cars: prismaCar[] = await prisma.car.findMany();
    return cars.map(car => Car.from(<Car><unknown>car));
}

/**
 * Retrieves a car by their chassisnumber.
 * @param chassisNumber - The chassisnumber of the car to retrieve.
 * @returns The retrieved car, or undefined if the car does not exist.
 */
export async function getCarByChassisNumber(chassisNumber: string) : Promise<Car | undefined > {
    const car : prismaCar = await prisma.car.findUnique({
        where: {
            chassisNumber: chassisNumber,
        },
    });

    return car ? Car.from(<Car><unknown>car) : undefined;
}

/**
 * Gets an array of cars from the database with the specified brand.
 * @param brand - The brand of the cars to be retrieved.
 * @returns A Promise that resolves to an array of cars with the specified brand, or undefined if no cars were found.
 */
export async function getCarsByBrand(brand: string) : Promise<Car[] | undefined> {
    const cars : prismaCar[] = await prisma.car.findMany({
        where: {
            brand: brand,
        },
    });

    return cars ? cars.map(car => Car.from(<Car><unknown>car)) : undefined;
}

/**
 * Gets an array of cars from the database with the specified model.
 * @param model - The model of the cars to be retrieved.
 * @returns A Promise that resolves to an array of cars with the specified model, or undefined if no cars were found.
 */
export async function getCarsByModel(model: string) : Promise<Car[] | undefined> {
    const cars : prismaCar[] = await prisma.car.findMany({
        where: {
            model: model,
        },
    });

    return cars ? cars.map(car => Car.from(<Car><unknown>car)) : undefined;
}

/**
 * Gets an array of cars from the database of the specified carType.
 * @param carType - The cartype of the cars to be retrieved.
 * @returns A Promise that resolves to an array of cars with the specified cartype, or undefined if no cars were found.
 */
export async function getCarsByCarType(carType: string) : Promise<Car[] | undefined> {
    const cars : prismaCar[] = await prisma.car.findMany({
        where: {
            carType: carType,
        },
    });

    return cars ? cars.map(car => Car.from(<Car><unknown>car)) : undefined;
}

/**
 * Gets an array of cars from the database with the specified build year.
 * @param buildYear - The build year of the cars to be retrieved.
 * @returns A Promise that resolves to an array of cars with the specified build year, or undefined if no cars were found.
 */
export async function getCarsByBuildYear(buildYear: number) : Promise<Car[] | undefined> {
    const cars : prismaCar[] = await prisma.car.findMany({
        where: {
            buildYear: buildYear,
        },
    });

    return cars ? cars.map(car => Car.from(<Car><unknown>car)) : undefined;
}

/**
 * Gets an array of cars from the database with the specified color.
 * @param color - The color of the cars to be retrieved.
 * @returns A Promise that resolves to an array of cars with the specified color, or undefined if no cars were found.
 */
export async function getCarsByColor(color: string) : Promise<Car[] | undefined> {
    const cars : prismaCar[] = await prisma.car.findMany({
        where: {
            color: color,
        },
    });

    return cars ? cars.map(car => Car.from(<Car><unknown>car)) : undefined;
}

/**
 * Gets an array of cars from the database with the specified fuel type.
 * @param fuelType - The fuel type of the cars to be retrieved.
 * @returns A Promise that resolves to an array of cars with the specified fuel type, or undefined if no cars were found.
 */
export async function getCarsByFuelType(fuelType: string) : Promise<Car[] | undefined> {
    const cars : prismaCar[] = await prisma.car.findMany({
        where: {
            fuelType: fuelType,
        },
    });

    return cars ? cars.map(car => Car.from(<Car><unknown>car)) : undefined;
}

/**
 * Creates a new car in the database with the specified details.
 * @param car - The car object containing the details for the new car.
 * @returns A Promise that resolves to the created car.
 * @throws An error if the car could not be created.
 */
export async function createCar(car: CreateCarDto): Promise<Car> {
    try {
        const prismaCar = await prisma.car.create({
            data: {
                chassisNumber: car.chassisNumber,
                brand: car.brand,
                model: car.model,
                carType: car.carType,
                buildYear: car.buildYear,
                color: car.color,
                mileage: car.mileage,
                fuelType: car.fuelType,
            },
            });
        return Car.from(<Car><unknown>prismaCar);

    } catch (error) {
        throw new Error('Could not create car: ${error.message}');
    }
}

/**
 * Deletes the car with the provided chassisnumber.
 * @param chassisNumber - The chassisnumber of the car to delete.
 * @throws Error if the car cannot be deleted.
 */
export async function deleteCar(chassisNumber: string): Promise<void> {
    try {
        await prisma.car.delete({
            where: {
                chassisNumber: chassisNumber,
            },
        });
    } catch (error) {
        throw new Error('Could not delete car with Chassisnumber ${chassisNumber}: ${error.message}');
    }
}

/**
 * Updates the car with the provided chassinumber using the provided car object and returns the updated car.
 * @param chassisNumber - The chassisnumber of the car to update.
 * @param data - An object representing the updates to apply to the car.
 * @returns The updated car.
 * @throws Error if the car cannot be updated.
 */
export async function updateCar(chassisNumber: string, data: UpdateCarDto): Promise<Car> {
    try {
        const updateCar = await prisma.car.update({
            where: {
                chassisNumber: chassisNumber,
            },
            data: {
                chassisNumber: data.chassisNumber,
                brand: data.brand,
                model: data.model,
                carType: data.carType,
                buildYear: data.buildYear,
                color: data.color,
                mileage: data.mileage,
                fuelType: data.fuelType,
            },
        });
        return Car.from(<Car><unknown>updateCar);
    } catch (error) {
        throw new Error('Could not update booking with ID ${id}: ${error.message}');
    }
}
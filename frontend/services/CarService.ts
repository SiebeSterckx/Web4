import { Car, UpdateCar } from '../types'

const backendUrl = process.env.BACKENDURL;

// Retrieve all cars + authenticate user
export const getAllCars = async () => {
        const token = sessionStorage.getItem("token");

        return fetch(backendUrl + "/cars", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
}

// Retrieve all cars for bookings + authenticate user
export const getAllCarsBooking = async () => {
    const token = sessionStorage.getItem("token");

    const response = await fetch(backendUrl + "/cars", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.ok) {
        return response.json(); // Parse the response as JSON
    } else {
        throw new Error("Failed to fetch cars");
    }
};

// Retrieve cars by chassis number + authenticate user
export const getCarByChassisNumber = (chassisNumber: string) => {
    const token = sessionStorage.getItem("token");

    return fetch(backendUrl + '/cars/' + chassisNumber, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

// Retrieve cars by brand + authenticate user
const getCarsByBrand = (brand: string) => {
    console.log('getCarsByBrand')
    const token = sessionStorage.getItem("token");

    return fetch(backendUrl + '/cars/brand/' + brand, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

// Retrieve cars by model + authenticate user
const getCarsByModel = (model: string) => {
    console.log('getCarsByModel')
    const token = sessionStorage.getItem("token");

    return fetch(backendUrl + '/cars/model/' + model, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

// Retrieve cars by build year + authenticate user
const getCarsByBuildYear = (buildYear: number) => {
    console.log('getCarsByBuildYear')
    const token = sessionStorage.getItem("token");

    return fetch(backendUrl + '/cars/buildYear/' + buildYear, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

// Retrieve cars by color + authenticate user
const getCarsByColor = (color: string) => {
    console.log('getCarsByColor')
    const token = sessionStorage.getItem("token");

    return fetch(backendUrl + '/cars/color/' + color, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

// Retrieve cars by fuel type + authenticate user
const getCarsByFuelType = (fuelType: string) => {
    console.log('getCarsByFuelType')
    const token = sessionStorage.getItem("token");

    return fetch(backendUrl + '/cars/fuelType/' + fuelType, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

// Create a car + authenticate user
const createCar = (car: Car) => {
    const token = sessionStorage.getItem("token");

    return fetch(backendUrl + '/cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(car)
    })
}

// Delete a car + authenticate user
const deleteCar = (chassisNumber: string) => {
    const token = sessionStorage.getItem("token");

    return fetch(backendUrl + '/cars/' + chassisNumber, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
}

// Update a car + authenticate user
const updateCar = (chassisNumber: string, car: UpdateCar) => {
    const token = sessionStorage.getItem("token");

    return fetch(backendUrl + '/cars/' + chassisNumber, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(car)
    })
}

// CarService object that contains all the functions
const CarService = {
    getAllCars,
    getAllCarsBooking,
    getCarByChassisNumber,
    getCarsByBrand,
    getCarsByModel,
    getCarsByBuildYear,
    getCarsByColor,
    getCarsByFuelType,
    createCar,
    deleteCar,
    updateCar,
}

export default CarService
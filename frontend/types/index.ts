export interface Car {
    chassisNumber: string;
    brand: string;
    model: string;
    carType: string;
    buildYear: number;
    color: string;
    mileage: number;
    fuelType: string;
}

export interface UpdateCar {
    chassisNumber?: string;
    brand?: string;
    model?: string;
    carType?: string;
    buildYear?: number;
    color?: string;
    mileage?: number;
    fuelType?: string;
}

export interface Booking {
    id: number;
    startDate: Date;
    endDate: Date;
    userId: number;
    cars: Car[];
}

export interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export interface User {
    username: string;
    password: string;
    profile: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
    };
}
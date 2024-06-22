export interface CreateCarDto {
    chassisNumber: string;
    brand: string;
    model: string;
    carType: string;
    buildYear: number;
    color: string;
    mileage: number;
    fuelType: string;
}

export interface UpdateCarDto {
    chassisNumber?: string;
    brand?: string;
    model?: string;
    carType?: string;
    buildYear?: number;
    color?: string;
    mileage?: number;
    fuelType?: string;
}

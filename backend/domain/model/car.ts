/**
 * Represents a car in the system.
 */
export class Car {

    private chassisNumber: string;
    private brand: string;
    private model: string;
    private carType: string;
    private buildYear: number;
    private color: string;
    private mileage: number;
    private fuelType: string;

    /**
     * Creates a new car instance.
     */
    constructor( chassisNumber: string, brand: string, model: string, carType: string, buildYear: number, color: string, mileage: number, fuelType: string) {
        this.setChassisNumber(chassisNumber);
        this.setBrand(brand);
        this.setModel(model);
        this.setCarType(carType);
        this.setBuildYear(buildYear);
        this.setColor(color);
        this.setMileage(mileage);
        this.setFuelType(fuelType);
    }

    /**
     * Sets the car's chassis number.
     * @param chassisnr - The car's chassis number.
     */
    setChassisNumber(chassisnr: string) {
        this.chassisNumber = chassisnr;
    }

    /**
     * Sets the car's brand.
     * @param brand - The car's brand.
     */
    setBrand(brand: string) {
        this.brand = brand;
    }

    /**
     * Sets the car's model.
     * @param model - The car's model.
     */
    setModel(model: string) {
        this.model = model;
    }

    /**
     * Sets the car's chassis number.
     * @param carType - The car's cartype.
     */
    setCarType(carType: string) {
        this.carType = carType;
    }

    /**
     * Sets the car's build year.
     * @param buildYear - The car's build year.
     */
    setBuildYear(buildYear: number) {
        this.buildYear = buildYear;
    }

    /**
     * Sets the car's color.
     * @param color - The car's color.
     */
    setColor(color: string) {
        this.color = color;
    }

    /**
    Sets the car's mileage.
    @param mileage - The car's mileage.
    */
    setMileage(mileage: number) {
        this.mileage = mileage;
    }

    /**
    Sets the car's fuel type.
    @param fuelType - The car's fuel type.
    */
    setFuelType(fuelType: string) {
        this.fuelType = fuelType;
    }

    //ipv mapper, krijgt Car object mee en maakt nieuwe Car op basis van zijn parameters
    static from(car: Car): Car{
        return new Car(car.chassisNumber, car.brand, car.model,car.carType, car.buildYear, car.color, car.mileage, car.fuelType);
    }
}



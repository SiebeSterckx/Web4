/**
 * @swagger
 * components:
 *  schemas:
 *    Car:
 *      type: object
 *      properties:
 *        chassisNumber:
 *          type: string
 *          description: The chassisnumber of the car.
 *        brand:
 *          type: string
 *          description: The brand of the car.
 *        model:
 *          type: string
 *          description: The model of the car.
 *        carType:
 *          type: string
 *          description: The carType of the car.
 *        buildYear:
 *          type: number
 *          description: The buildYear of the car.
 *        color:
 *          type: string
 *          description: The color of the car.
 *        mileage:
 *          type: number
 *          description: The mileage of the car.
 *        fuelType:
 *          type: string
 *          description: The fuelType of the car.
 *    CreateCarDto:
 *      type: object
 *      properties:
 *        chassisNumber:
 *          type: string
 *          description: The chassisnumber of the car.
 *        brand:
 *          type: string
 *          description: The brand of the car.
 *        model:
 *          type: string
 *          description: The model of the car.
 *        carType:
 *          type: string
 *          description: The carType of the car.
 *        buildYear:
 *          type: number
 *          description: The buildYear of the car.
 *        color:
 *          type: string
 *          description: The color of the car.
 *        mileage:
 *          type: number
 *          description: The mileage of the car.
 *        fuelType:
 *          type: string
 *          description: The fuelType of the car.
 *    UpdateCarDto:
 *      type: object
 *      properties:
 *        chassisNumber:
 *          type: string
 *          description: The chassisnumber of the car.
 *        brand:
 *          type: string
 *          description: The brand of the car.
 *        model:
 *          type: string
 *          description: The model of the car.
 *        carType:
 *          type: string
 *          description: The carType of the car.
 *        buildYear:
 *          type: number
 *          description: The buildYear of the car.
 *        color:
 *          type: string
 *          description: The color of the car.
 *        mileage:
 *          type: number
 *          description: The mileage of the car.
 *        fuelType:
 *          type: string
 *          description: The fuelType of the car.
 *
 *
 */

import express, { Request, Response } from 'express';
import { CarService } from '../service/car.service';
import { CreateCarDto, UpdateCarDto } from '../types/carDto';

const router = express.Router();
const carService = new CarService();

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Car management
 */

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCarDto'
 *     responses:
 *       200:
 *         description: The created car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/', async (req: Request, res: Response) => {
    const { carType, chassisNumber, brand, model, buildYear, color, mileage, fuelType } = req.body;
    const createCarDto: CreateCarDto = { carType, chassisNumber, brand, model, buildYear, color, mileage, fuelType };

    try {
        const createdCar = await carService.createCar(createCarDto);
        res.status(200).json(createdCar);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: An array of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const cars = await carService.getAllCars();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /cars/{chassisNumber}:
 *   get:
 *     summary: Get a car by chassisNumber
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: chassisNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: chassisNumber of the car to get
 *     responses:
 *       200:
 *         description: The car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/:chassisNumber', async (req: Request, res: Response) => {
    const chassisN = req.params.chassisNumber;

    try {
        const car = await carService.getCarByChassisNumber(chassisN);
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /cars/brand/{brand}:
 *   get:
 *     summary: Get all cars from a specific brand
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: brand
 *         schema:
 *           type: string
 *         required: true
 *         description: brand of the cars to get
 *     responses:
 *       200:
 *         description: An array of the found cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/brand/:brand', async (req: Request, res: Response) => {
    const br = req.params.brand;
    try {
        const cars = await carService.getCarsByBrand(br);
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /cars/model/{model}:
 *   get:
 *     summary: Get all cars from a specific model
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: model
 *         schema:
 *           type: string
 *         required: true
 *         description: model of the cars to get
 *     responses:
 *       200:
 *         description: An array of the found cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/model/:model', async (req: Request, res: Response) => {
    const model = req.params.model;
    try {
        const cars = await carService.getCarsByModel(model);
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /cars/carType/{carType}:
 *   get:
 *     summary: Get all cars from a specific car type
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: carType
 *         schema:
 *           type: string
 *         required: true
 *         description: car type of the cars to get
 *     responses:
 *       200:
 *         description: An array of the found cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/carType/:carType', async (req: Request, res: Response) => {
    const ct = req.params.carType;
    try {
        const cars = await carService.getCarsByCarType(ct);
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /cars/buildYear/{buildYear}:
 *   get:
 *     summary: Get all cars from a specific buildyear
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: buildYear
 *         schema:
 *           type: number
 *         required: true
 *         description: buildyear of the cars to get
 *     responses:
 *       200:
 *         description: An array of the found cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/buildYear/:buildYear', async (req: Request, res: Response) => {
    const buildYear = parseInt(req.params.buildYear);
    try {
        const cars = await carService.getCarsByBuildYear(buildYear);
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /cars/color/{color}:
 *   get:
 *     summary: Get all cars with a specific color
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: color
 *         schema:
 *           type: string
 *         required: true
 *         description: color of the cars to get
 *     responses:
 *       200:
 *         description: An array of the found cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/color/:color', async (req: Request, res: Response) => {
    const color = req.params.color;
    try {
        const cars = await carService.getCarsByColor(color);
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /cars/fuelType/{fuelType}:
 *   get:
 *     summary: Get all cars with a specific fueltype
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: fuelType
 *         schema:
 *           type: string
 *         required: true
 *         description: fueltype of the cars to get
 *     responses:
 *       200:
 *         description: An array of the found cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/fuelType/:fuelType', async (req: Request, res: Response) => {
    const fuelType = req.params.fuelType;
    try {
        const cars = await carService.getCarsByFuelType(fuelType);
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /cars/{chassisNumber}:
 *   put:
 *     summary: Update an existing car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: chassisNumber
 *         required: true
 *         description: chassisNumber of the car to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCarDto'
 *     responses:
 *       200:
 *         description: The updated car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/:chassisNumber', async (req: Request, res: Response) => {
    const chassisN = req.params.chassisNumber;
    const { chassisNumber, brand, model, buildYear, color, mileage, fuelType } = req.body;
    const updateCarDto: UpdateCarDto = { chassisNumber, brand, model, buildYear, color, mileage, fuelType };

    try {
        const updatedCar = await carService.updateCar(chassisN, updateCarDto);
        res.json(updatedCar);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /cars/{chassisNumber}:
 *   delete:
 *     summary: Delete a car by chassisNumber
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: chassisNumber
 *         description: chassisNumber of the car to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       204:
 *         description: Car deleted successfully with no response body
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:chassisNumber', async (req: Request, res: Response) => {
    const chassisN = req.params.chassisNumber;

    try {
        await carService.deleteCar(chassisN);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



export default router;
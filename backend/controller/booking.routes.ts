/**
 * @swagger
 * components:
 *  schemas:
 *    Booking:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: The auto-generated id of the booking.
 *        startDate:
 *          type: string
 *          description: The username of the user.
 *        endDate:
 *          type: string
 *          description: The password of the user.
 *        userId:
 *          type: number
 *          description: The ID of the user who made the booking.
 *        cars:
 *          type: array
 *          description: The array of cars included in the booking.
 *    CreateBookingDto:
 *      type: object
 *      properties:
 *        startDate:
 *          type: string
 *          description: The username of the user.
 *        endDate:
 *          type: string
 *          description: The password of the user.
 *        userId:
 *          type: number
 *          description: The ID of the user who made the booking.
 *        cars:
 *          type: array
 *          description: The array of cars included in the booking.
 */

import express, { Request, Response } from 'express';
import { BookingService } from '../service/booking.service';
import { CreateBookingDto } from '../types/bookingDto';

const router = express.Router();
const bookingService = new BookingService();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               userId:
 *                 type: number
 *               cars:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               startDate: "2023-05-01T00:00:00.000Z"
 *               endDate: "2023-05-07T23:59:59.999Z"
 *               userId: 123
 *               cars:
 *                 - "chassisNumber1"
 *                 - "chassisNumber2"
 *     responses:
 *       200:
 *         description: The created booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Bad request
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
router.post('/', async (req: Request, res: Response) => {
    try {
        let [startDate, endDate, userId, cars] = [req.body.startDate, req.body.endDate, req.body.userId, req.body.cars];
        console.log(startDate, endDate, userId, cars);
        if (cars == undefined) { cars = []; }
        const booking: CreateBookingDto = { startDate, endDate, userId, cars };
        const newBooking = await bookingService.createBooking(booking);
        res.json(newBooking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: An array of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
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
        const bookings = await bookingService.getAllBookings();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the booking to get
 *     responses:
 *       200:
 *         description: The booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
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
router.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        const booking = await bookingService.getBookingById(id);
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the booking to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       204:
 *         description: Booking deleted successfully with no response body
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        await bookingService.deleteBooking(id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



export default router;

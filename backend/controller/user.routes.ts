/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: The auto-generated id of the user.
 *        username:
 *          type: string
 *          description: The username of the user.
 *        password:
 *          type: string
 *          description: The password of the user.
 *        profile:
 *          type: object
 *          description: The profile of the user.
 *          properties:
 *            id:
 *              type: number
 *              description: The auto-generated id of the profile.
 *            firstName:
 *              type: string
 *              description: The first name of the user.
 *            lastName:
 *              type: string
 *              description: The last name of the user.
 *            email:
 *              type: string
 *              description: The email of the user.
 *            phoneNumber:
 *              type: string
 *              description: The phone number of the user.
 *    CreateUserDto:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: The username of the user.
 *        password:
 *          type: string
 *          description: The password of the user.
 *        profile:
 *          type: object
 *          description: The profile of the user.
 *          properties:
 *            id:
 *              type: number
 *              description: The auto-generated id of the profile.
 *            firstName:
 *              type: string
 *              description: The first name of the user.
 *            lastName:
 *              type: string
 *              description: The last name of the user.
 *            email:
 *              type: string
 *              description: The email of the user.
 *            phoneNumber:
 *              type: string
 *              description: The phone number of the user.
 *    UpdateUserDto:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: The username of the user.
 *        password:
 *          type: string
 *          description: The password of the user.
 *        profile:
 *          type: object
 *          description: The profile of the user.
 *          properties:
 *            id:
 *              type: number
 *              description: The auto-generated id of the profile.
 *            firstName:
 *              type: string
 *              description: The first name of the user.
 *            lastName:
 *              type: string
 *              description: The last name of the user.
 *            email:
 *              type: string
 *              description: The email of the user.
 *            phoneNumber:
 *              type: string
 *              description: The phone number of the user.
 */

import express, { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { CreateUserDto, UpdateUserDto } from '../types/userDto';

const router = express.Router();
const userService = new UserService();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       200:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
    const { username, password, profile } = req.body;
    const createUserDto: CreateUserDto = { username, password, profile };

    try {
        const createdUser = await userService.createUser(createUserDto);
        res.status(200).json(createdUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: An array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
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
router.get('/', async (req: Request & { auth }, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to get
 *     responses:
 *       200:
 *         description: The user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
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
        const user = await userService.getUserById(id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /users/username/{username}:
 *   get:
 *     summary: Get a user by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: username of the user to get
 *     responses:
 *       200:
 *         description: The user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
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
router.get('/username/:username', async (req: Request, res: Response) => {
    const username = req.params.username;

    try {
        const user = await userService.getUserByUsername(username);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
router.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { username, password, profile } = req.body;
    const updateUserDto: UpdateUserDto = { username, password, profile };

    try {
        const updatedUser = await userService.updateUser(id, updateUserDto);
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       204:
 *         description: User deleted successfully with no response body
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        await userService.deleteUser(id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Login successful message.
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication.
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Login failed status message.
 *                 errorMessage:
 *                   type: string
 *                   description: Error message for login failure.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message for internal server error.
 */
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const token = await userService.login(username, password);
        res.status(200).json({message: 'Login successful', token});
        console.log('Login successful');
    } catch (error) {
        res.status(401).json({status: 'Login failed', errorMessage: error.message});
    }
});



export default router;

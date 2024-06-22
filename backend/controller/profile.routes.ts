/**
 * @swagger
 * components:
 *  schemas:
 *    Profile:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: The auto-generated id of the profile.
 *        firstName:
 *          type: string
 *          description: The first name of the user.
 *        lastName:
 *          type: string
 *          description: The last name of the user.
 *        email:
 *          type: string
 *          description: The email of the user.
 *        phoneNumber:
 *          type: string
 *          description: The phone number of the user.
 *    CreateProfileDto:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *          description: The first name of the user.
 *        lastName:
 *          type: string
 *          description: The last name of the user.
 *        email:
 *          type: string
 *          description: The email of the user.
 *        phoneNumber:
 *          type: string
 *          description: The phone number of the user.
 *    UpdateProfileDto:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *          description: The first name of the user.
 *        lastName:
 *          type: string
 *          description: The last name of the user.
 *        email:
 *          type: string
 *          description: The email of the user.
 *        phoneNumber:
 *          type: string
 *          description: The phone number of the user.
 */

import express, { Request, Response } from 'express';
import { ProfileService } from '../service/profile.service';
import { CreateProfileDto, UpdateProfileDto } from '../types/profileDto';

const router = express.Router();
const profileService = new ProfileService();

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: Profile management
 */

/**
 * @swagger
 * /profiles/{id}:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProfileDto'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to make profile for
 *     responses:
 *       200:
 *         description: The created profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
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
router.post('/:id', async (req: Request, res: Response) => {
    const { firstName, lastName, email, phoneNumber } = req.body;
    const userId = parseInt(req.params.id);
    const createProfileDto: CreateProfileDto = { firstName, lastName, email, phoneNumber };

    try {
        const createdProfile = await profileService.createProfile(userId, createProfileDto);
        res.status(200).json(createdProfile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Get all profiles
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: An array of profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
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
        const profiles = await profileService.getAllProfiles();
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     summary: Get a profile by ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the profile to get
 *     responses:
 *       200:
 *         description: The profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
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
        const profile = await profileService.getProfileById(id);
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /profiles/{id}:
 *   put:
 *     summary: Update an existing profile
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the profile to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileDto'
 *     responses:
 *       200:
 *         description: The updated profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
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
    const { firstName, lastName, email, phoneNumber } = req.body;
    const updateProfileDto: UpdateProfileDto = { firstName, lastName, email, phoneNumber };

    try {
        const updatedProfile = await profileService.updateProfile(id, updateProfileDto);
        res.json(updatedProfile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /profiles/{id}:
 *   delete:
 *     summary: Delete a profile by ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the profile to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       204:
 *         description: Profile deleted successfully with no response body
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        await profileService.deleteProfile(id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



export default router;

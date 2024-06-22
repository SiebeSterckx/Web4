import { User } from "../domain/model/user";
import { getAllUsers, getUserById, getUserByUsername, deleteUser, updateUser, createUser } from "../domain/data-access/user.db";
import {CreateUserDto, UpdateUserDto} from "../types/userDto";
import bcrypt from "bcrypt";
import {generateJwtToken} from "../jwt";

/**
 * Service class for handling user-related operations.
 */
export class UserService {

    /**
     * Fetches all users from the database and returns an array of User objects.
     * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
     */
    public async getAllUsers(): Promise<User[]> {
        console.log('getAllUsers BACKEND')
        return await getAllUsers();
    }

    /**
     * Retrieves a user by their ID.
     * @param id - The ID of the user to retrieve.
     * @returns The retrieved user, or undefined if the user does not exist.
     */
    public async getUserById(id: number): Promise<User | undefined> {
        return await getUserById(id);
    }

    /**
     * Retrieves a user from the database by its username.
     * @param {string} username - The username of the user to retrieve.
     * @returns {Promise<User>} A Promise that resolves to the retrieved User object.
     */
    public async getUserByUsername(username: string): Promise<User | undefined> {
        return await getUserByUsername(username);
    }

    /**
     * Creates a new user in the database with the specified details.
     * @param user - The user object containing the details for the new user.
     * @returns A Promise that resolves to the created user.
     * @throws An error if the user could not be created.
     */
    public async createUser(user: CreateUserDto): Promise<User> {
        const existingUser = await getUserByUsername(user.username);

        if (existingUser) {
            throw new Error('User with username ${username} already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 12);
        return await createUser(user.username, hashedPassword);
    }

    /**
     * Deletes the user with the provided ID.
     * @param id - The ID of the user to delete.
     * @throws Error if the user cannot be deleted.
     */
    public async deleteUser(id: number): Promise<void> {
        return await deleteUser(id);
    }

    /**
     * Updates the user with the provided ID using the provided user object and returns the updated user.
     * @param id - The ID of the user to update.
     * @param user - An object representing the updates to apply to the user.
     * @returns The updated user.
     * @throws Error if the user cannot be updated.
     */
    public async updateUser(id: number, user: UpdateUserDto): Promise<User> {
        return await updateUser(id, user);
    }


    /**
     * Authenticates a user by their username and password and generates a JWT token upon successful login.
     * @param username - The username of the user trying to log in.
     * @param password - The password of the user trying to log in.
     * @returns A Promise that resolves to a JWT token.
     * @throws Error if the username/password combination is invalid.
     */
    public async login(username: string, password: string): Promise<string> {
        console.log(username, password + " Trying to login");

        const user = await getUserByUsername(username);
        //Check if user exists
        if(!user) {
            throw new Error('Username does not exist');
        }

        // Compares hashed password of db and the provided login password
        const isValidPassword = await bcrypt.compare(password, user.getPassword());
        //Check if password is valid
        if(!isValidPassword) {
            throw new Error('Invalid password');
        }

        // Generate and return a JWT token for the authenticated user
        return generateJwtToken(username)
    }
}
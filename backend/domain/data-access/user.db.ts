import { PrismaClient, User as prismaUser } from '@prisma/client';
import {User} from "../model/user";
import { Profile } from '../model/profile';
import {CreateUserDto, UpdateUserDto} from "../../types/userDto";


const prisma = new PrismaClient();

/**
 * Gets all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
 */
export async function getAllUsers(): Promise<User[]> {
    console.log('getAllUsers BACKEND DB')
    // Retrieve all users and include their associated profile objects
    const users = await prisma.user.findMany({
        include: {
            Profile: true,
        },
    });

    // Map each user object to a User class object
    return users.map((user) => {
        // If the user has a profile object, convert it to a Profile class object
        const profile = user.Profile?.[0] ? Profile.from(user.Profile[0]) : undefined;
        // Return a new User class object
        return new User( user.username, user.password, profile, user.id);
    });
}


/**
 * Retrieves a user by their ID.
 * @param id - The ID of the user to retrieve.
 * @returns The retrieved user, or undefined if the user does not exist.
 */
export async function getUserById(id: number): Promise<User | undefined> {
    console.log("id : " + id);
    const foundUser: prismaUser = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            Profile: true,
        },
    });
    console.log("foundUser : " + foundUser);
    return foundUser ? User.from(<User><unknown>foundUser) : undefined;
}

/**
 * Retrieves a user by their username.
 * @param username - The username of the user to retrieve.
 * @returns The retrieved user, or undefined if the user does not exist.
 */
export async function getUserByUsername(username: string): Promise<User | undefined> {
    console.log("username : " + username);
    const foundUser: prismaUser = await prisma.user.findUnique({
        where: {
            username: username,
        },
        include: {
            Profile: true,
        },
    });
    console.log("foundUser : " + foundUser);
    return foundUser ? User.from(<User><unknown>foundUser) : undefined;
}


/*
*
 * Creates a new user in the database with the specified details.
 * @param user - The user object containing the details for the new user.
 * @returns A Promise that resolves to the created user.
 * @throws An error if the user could not be created.
*/
/*export async function createUser(user: CreateUserDto): Promise<User> {
    try {
        const prismaUser = await prisma.user.create({
            data: {
                username: user.username,
                password: user.password,
                Profile: {
                    create: user.profile,
                },
            },
            include: {
                Profile: true,
            },
        });
        console.log(prismaUser)
        return User.from(<User><unknown>prismaUser);
    } catch (error) {
        console.log(error.message);
        throw new Error('Could not create user: '+ error.message);
    }
}*/

/**
 * Creates a new user in the database with the specified details.
 * @param username - Username for the new user.
 * @param password - Password for the new user.
 * @returns A Promise that resolves to the created user.
 * @throws An error if the user could not be created.
 */
export async function createUser(username: string, password: string): Promise<User> {
    try {
        const prismaUser = await prisma.user.create({
            data: {
                username: username,
                password: password
            },
        });
        return User.from(<User><unknown>prismaUser);
    } catch (error) {
        throw new Error('Could not create user: '+ error.message);
    }
}


/**
 * Deletes the user with the provided ID.
 * @param id - The ID of the user to delete.
 * @throws Error if the user cannot be deleted.
 */
export async function deleteUser(id: number): Promise<void> {
    try {
        await prisma.user.delete({
            where: {
                id: id,
            },
        });
    } catch (error) {
        throw new Error('Could not delete user with ID ${id}: ${error.message}');
    }
}

/**
 * Updates the user with the provided ID using the provided user object and returns the updated user.
 * @param id - The ID of the user to update.
 * @param user - An object representing the updates to apply to the user.
 * @returns The updated user.
 * @throws Error if the user cannot be updated.
 */
export async function updateUser(id: number, user: UpdateUserDto): Promise<User> {
    try {
        const updateUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                username: user.username,
                password: user.password,
                Profile: {
                    connect: {
                        email: user.profile.email,
                    },
                },
            },
            include: {
                Profile: true,
            },
        });
        return User.from(<User><unknown>updateUser)
    } catch (error) {
        throw new Error(`Could not update user with ID ${id}: ${error.message}`);
    }
}


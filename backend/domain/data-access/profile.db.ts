import {Profile} from "../model/profile";
import { PrismaClient, Profile as prismaProfile } from '@prisma/client';
import {CreateProfileDto, UpdateProfileDto} from "../../types/profileDto";


const prisma = new PrismaClient();

/**
 * Retrieves all profiles from the database.
 * @returns A Promise that resolves to an array of Profile objects.
 * @throws An error if the profiles could not be retrieved.
 */
export async function getAllProfiles(): Promise<Profile[]> {
    const profiles: prismaProfile[] = await prisma.profile.findMany();
    return profiles.map(profile => Profile.from(<Profile><unknown>profile));
}

/**
 * Retrieves a profile from the database by its ID.
 * @param id - The ID of the profile to retrieve.
 * @returns A Promise that resolves to the Profile object with the specified ID, or undefined if it does not exist.
 * @throws An error if the profile could not be retrieved.
 */
export async function getProfileById(id: number) : Promise<Profile | undefined > {
    const profile : prismaProfile = await prisma.profile.findUnique({
        where: {
            id: id,
        },
    });

    return profile ? Profile.from(<Profile><unknown>profile) : undefined;
}

/**
 * Creates a new profile in the database with the specified details.
 * @param userId - The ID of the user that the profile belongs to.
 * @param profile - The profile object containing the details for the new profile.
 * @returns A Promise that resolves to the created Profile object.
 * @throws An error if the profile could not be created.
 */
export async function createProfile(userId: number, profile: CreateProfileDto): Promise<Profile> {
    try {
        const prismaProfile = await prisma.profile.create({
            data: {
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                phoneNumber: profile.phoneNumber,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return Profile.from(<Profile><unknown>prismaProfile);
    } catch (error) {
        console.log('Could not create profile: '+error.message)
        throw new Error('Could not create profile: '+error.message);
    }
}

/**
 * Deletes a profile from the database by its ID.
 * @param id - The ID of the profile to delete.
 * @returns A Promise that resolves when the profile has been successfully deleted.
 * @throws An error if the profile could not be deleted.
 */
export async function deleteProfile(id: number): Promise<void> {
    try {
        await prisma.profile.delete({
            where: {
                id: id,
            },
        });
    } catch (error) {
        throw new Error('Could not delete profile with ID ${id}: ${error.message}');
    }
}

/**
 * Updates the details of an existing profile in the database.
 * @param id - The ID of the profile to update.
 * @param profile - The profile object containing the updated details.
 * @returns A Promise that resolves to the updated profile.
 * @throws An error if the profile could not be updated.
 */
export async function updateProfile(id: number, profile: UpdateProfileDto): Promise<Profile> {
    try {
        const prismaProfile = await prisma.profile.update({
            where: { id: id },
            data: {
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                phoneNumber: profile.phoneNumber,
            },
        });
        return Profile.from(<Profile><unknown>prismaProfile);
    } catch (error) {
        throw new Error(`Could not update profile with ID ${id}: ${error.message}`);
    }
}
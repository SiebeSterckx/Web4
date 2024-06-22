import { Profile } from '../domain/model/profile';
import { getAllProfiles, getProfileById, createProfile, deleteProfile, updateProfile } from "../domain/data-access/profile.db";
import {CreateProfileDto, UpdateProfileDto} from "../types/profileDto";

/**
 * Service class for managing user profiles.
 */
export class ProfileService {

    /**
     * Gets all profiles from the database.
     * @returns A Promise that resolves to an array of Profile objects.
     * @throws An error if the profiles could not be retrieved.
     */
    public async getAllProfiles(): Promise<Profile[]> {
        return await getAllProfiles();
    }

    /**
     * Gets all profiles from the database.
     * @returns A Promise that resolves to an array of Profile objects.
     * @throws An error if the profiles could not be retrieved.
     */
    public async getProfileById(id: number): Promise<Profile | undefined> {
        return await getProfileById(id);
    }

    /**
     * Creates a new profile in the database with the specified details.
     * @param userId - The ID of the user associated with the profile.
     * @param profile - The profile object containing the details for the new profile.
     * @returns A Promise that resolves to the created profile.
     * @throws An error if the profile could not be created.
     */
    public async createProfile(userId: number, profile: CreateProfileDto): Promise<Profile> {
        return await createProfile(userId, profile);
    }

    /**
     * Deletes a profile from the database by ID.
     * @param id - The ID of the profile to delete.
     * @returns A Promise that resolves when the profile has been deleted.
     * @throws An error if the profile could not be deleted.
     */
    public async deleteProfile(id: number): Promise<void> {
        return await deleteProfile(id);
    }

    /**
     * Updates a profile in the database with the specified ID and new profile details.
     * @param id - The ID of the profile to update.
     * @param profile - The profile object containing the updated details.
     * @returns A Promise that resolves to the updated profile.
     * @throws An error if the profile could not be updated.
     */
    public async updateProfile(id: number, profile: UpdateProfileDto): Promise<Profile> {
        return await updateProfile(id, profile);
    }
}

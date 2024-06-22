import { Profile } from "./profile";

/**
 * Represents a user in the system.
 */
export class User {
    private id: number;
    private username: string;
    private password: string;
    private profile: Profile;

    /**
     * Creates a new user instance.
     */
    constructor(username: string, password: string, profile?: Profile, id?: number) {
        this.setId(id);
        this.setUsername(username);
        this.setPassword(password);
        this.setProfile(profile);
    }

    /**
     * Sets the user's ID.
     * @param id - The user's ID.
     */
    public setId(id: number) {
        this.id = id;
    }

    /**
     * Sets the user's username.
     * @param username - The user's username.
     */
    public setUsername(username: string) {
        this.username = username;
    }

    /**
     * Sets the user's password.
     * @param password - The user's password.
     */
    public setPassword(password: string) {
        this.password = password;
    }

    /**
     * Gets the user's password.
     * @returns The user's password.
     */
    public getPassword(): string {
        return this.password;
    }

    /**
     * Sets the user's profile information.
     * @param profile - The user's profile information.
     */
    public setProfile(profile: Profile) {
        this.profile = profile;
    }

    //ipv mapper, krijgt User object mee en maakt nieuwe User op basis van zijn parameters
    static from(user: User): User {
        if (user.profile != null) {
            const profile = new Profile(
                user.profile.getId(),
                user.profile.getFirstName(),
                user.profile.getLastName(),
                user.profile.getEmail(),
                user.profile.getPhoneNumber()
            );
            return new User(user.username, user.password, profile, user.id);
        } else {
            return new User(user.username, user.password, null, user.id);
        }
    }
}

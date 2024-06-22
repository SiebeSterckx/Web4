/**
 * Class representing a user profile.
 */
export class Profile {

    private id: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private phoneNumber: string;

    /**
     * Creates a new profile instance.
     */
    constructor(id: number, firstName: string, lastName: string, email: string, phoneNumber: string) {
        this.setId(id);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setPhoneNumber(phoneNumber);
    }

    /**
     * Sets the ID of the profile.
     * @param {number} id - The ID to set.
     */
    public setId(id: number) {
        this.id = id;
    }

    /**
     * Returns the ID of the profile.
     * @returns {number} The ID of the profile.
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Sets the first name of the profile.
     * @param {string} firstName - The first name to set.
     */
    public setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    /**
     * Returns the first name of the profile.
     * @returns {string} The first name of the profile.
     */
    public getFirstName(): string {
        return this.firstName;
    }

    /**
     * Sets the last name of the profile.
     * @param {string} lastName - The last name to set.
     */
    public setLastName(lastName: string) {
        this.lastName = lastName;
    }

    /**
     * Returns the last name of the profile.
     * @returns {string} The last name of the profile.
     */
    public getLastName(): string {
        return this.lastName;
    }

    /**
     * Sets the email of the profile.
     * @param {string} email - The email to set.
     */
    public setEmail(email: string) {
        this.email = email;
    }

    /**
     * Returns the email of the profile.
     * @returns {string} The email of the profile.
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Sets the phone number of the profile.
     * @param {string} phoneNumber - The phone number to set.
     */
    public setPhoneNumber(phoneNumber: string) {
        this.phoneNumber = phoneNumber;
    }

    /**
     * Returns the phone number of the profile.
     * @returns {string} The phone number of the profile.
     */
    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    //ipv mapper, krijgt Profile object mee en maakt nieuwe Profile op basis van zijn parameters
    static from(json: any): Profile {
        const profile = new Profile(json.id, json.firstName, json.lastName, json.email, json.phoneNumber);
        return profile;
    }
}

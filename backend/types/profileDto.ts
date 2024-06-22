export interface CreateProfileDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export interface UpdateProfileDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
}
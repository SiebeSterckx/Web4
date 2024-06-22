export interface CreateUserDto {
    username: string;
    password: string;
    profile?: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
    };
}

export interface UpdateUserDto {
    username?: string;
    password?: string;
    profile?: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phoneNumber?: string;
    };
}
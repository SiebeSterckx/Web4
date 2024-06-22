import {User} from "../types";

const backendUrl = process.env.BACKENDURL;

// Retrieve all users
const getAllUsers = async () => {
   try {
        console.log('getAllUsers');
        const response = await fetch(backendUrl + '/users');
        const contentType = response.headers.get('Content-Type');

        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('Invalid JSON response');
        }
        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error(error.message);
    }
}

// Register user
const registerUser = (user: User) => {
    console.log('registerUser ', user);
    try {
        return fetch (backendUrl + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error(error.message);
    }
}

// Login user
const loginUser = (user: User) => {
    try {
        return fetch (backendUrl + '/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        throw new Error(error.message);
    }
}

export const getUserByUsername = async (username: string) => {
    console.log('getUserByUsername');
    const token = sessionStorage.getItem("token");

    const response = await fetch(backendUrl + '/users/username/' + username, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user by username");
    }

    return response.json();
};


// UserService object that contains all the functions
const UserService = {
    getAllUsers,
    registerUser,
    loginUser,
    getUserByUsername
}

export default UserService
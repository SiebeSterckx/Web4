import {Profile} from "../types";

const backendUrl = process.env.BACKENDURL;

// Retrieve all profiles
const getAllProfiles = async () => {
    try {
        console.log('getAllProfiles');
        const response = await fetch(backendUrl  + '/profiles');
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('Invalid JSON response');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw new Error(error.message);
    }
}

// ProfileService object that contains all the functions
const ProfileService = {
    getAllProfiles
}

export default ProfileService
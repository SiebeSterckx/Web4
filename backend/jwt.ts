import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresHours = process.env.JWT_EXPIRES_HOURS;

const generateJwtToken = (username: string): string => {
    const options = { expiresIn: `${jwtExpiresHours}h` };

    try {
        return jwt.sign({ username }, jwtSecret, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token')
    }
}

export { generateJwtToken, jwtSecret, jwtExpiresHours };
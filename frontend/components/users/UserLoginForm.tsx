import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import { User } from "../../types";
import UserService from "../../services/UserService";

type Props = {
    onSubmit: (user: User) => void;
};

// UserLoginForm component
const UserLoginForm: React.FC<Props> = ({ onSubmit }: Props) => {

    const router = useRouter();
    // State variable for storing username
    const [username, setUsername] = useState<string>("");
    // State variable for storing password
    const [password, setPassword] = useState<string>("");
    // State variable for storing error messages
    const [error, setError] = useState<string>("");

    // Handles form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        clearError();

        if (!validate()) {
            return;
        }

        const user: User = {
            username,
            password,
            profile: {
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
            },
        };

        try {
            const response = await UserService.loginUser(user);
            if (response.status === 200) {
                const { token } = await response.json();
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("username", username);
                onSubmit(user);
                // Redirect to the home page
                router.push("/");
            } else {
                const { errorMessage } = await response.json();
                setError(errorMessage);
            }
        } catch (error) {
            setError("An error occurred during login.");
        }
    };

    // Validates the form fields
    const validate = () => {
        if (!username || !password) {
            setError("Please enter username and password.");
            return false;
        }
        return true;
    };

    // Clears the error message
    const clearError = () => {
        setError("");
    };

    return (
        <div>
            <h2 className={styles.firstRowLoginOut}>Login</h2>

            {error && <div className={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className={styles.secondRowLoginOut}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className={styles.thirdRowLoginOut}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={styles.fourthRowLoginLogout}>
                    <button className={styles.confirmButton} type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserLoginForm;

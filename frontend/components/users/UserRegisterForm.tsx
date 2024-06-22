import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import UserService from "../../services/UserService";
import {User} from "../../types";

type Props = {
    onSubmit: (user: User) => void;
}

const USerRegisterForm: React.FC<Props> = ({onSubmit}: Props) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

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
            const response = await UserService.registerUser(user);
            if (response.status === 200) {
                onSubmit(user);
            } else {
                const { errorMessage } = await response.json();
                setError(errorMessage);
            }
        } catch (error) {
            setError("An error occurred during registration.");
        }
    };

    const validate = () => {
        if (!username || !password) {
            setError("Please enter username and password.");
            return false;
        }
        return true;
    }

    const clearError = () => {
        setError("");
    }


    return (
        <div className={styles.userFormsContainer}>
            <h2>Register new User</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.firstRowUserForm}>
                    <div className={styles.userUsernameInput}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className={styles.userPasswordInput}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.userFormButtons}>
                    <button className={styles.confirmButton} type="submit">Register</button>
                </div>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default USerRegisterForm;
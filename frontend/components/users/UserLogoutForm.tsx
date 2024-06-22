import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

type Props = {
    onSubmit: () => void;
};

// UserLogoutForm component
const UserLogoutForm: React.FC<Props> = ({ onSubmit }: Props) => {
    const router = useRouter();

    // Handles the logout action
    const handleLogout = () => {
        // Redirect to the login page
        router.push("/login");

        // Clear the session storage
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
    };

    return (
        <form onSubmit={handleLogout}>
            <button className={styles.deleteButton} type="submit">
                Logout
            </button>
        </form>
    );
};

export default UserLogoutForm;

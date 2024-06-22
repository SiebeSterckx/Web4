import Link from "next/link"
import React from "react";
import styles from "../styles/Home.module.css"
import UserLogoutForm from "./users/UserLogoutForm";


// Nav component
const Nav : React.FC = () => {
    const [showElements, setshowElements] = React.useState(false);
    const [showLogout, setShowLogout] = React.useState(false);

    // Check if the user is logged in
    const checkIfLoggedIn = () => {
        console.log("Checking if you are logged in...");
        const token = sessionStorage.getItem("token");
        if (token == null) {
            setshowElements(false);
            setShowLogout(false);
        } else {
            setshowElements(true);
            setShowLogout(true);
        }
    }

    React.useEffect(() => {
        checkIfLoggedIn();
    })

    // Handle user logout
    const handleLogoutUser = () => {
        console.log("logged out:")
        setShowLogout(false);
    };


    return (
            <nav className={styles.nav}>
                <Link href={"/"} className={styles.navItem}>Home</Link>

                {showElements && (
                    <Link href={"/cars"} className={styles.navItem}>Cars</Link>
                )}

                <Link href={"/profiles"} className={styles.navItem}>Profiles</Link>

                <Link href={"/users"} className={styles.navItem}>Users</Link>

                {showElements && (
                    <Link href={"/bookings"} className={styles.navItem}>Bookings</Link>
                )}

                {!showLogout && (
                    <Link href={"/login"} className={styles.navItem}>Login</Link>
                )}
                {showLogout && (
                    <UserLogoutForm onSubmit={handleLogoutUser}/>
                )}
            </nav>

    )
}

export default Nav;
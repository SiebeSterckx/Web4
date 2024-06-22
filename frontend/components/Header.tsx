import React from "react";
import styles from "../styles/Home.module.css"


// Header component
const Header : React.FC = () => {
    return (
        <header>
            <h1 className={styles.header}>AutoGo Rentals</h1>
        </header>
    )
}

export default Header;
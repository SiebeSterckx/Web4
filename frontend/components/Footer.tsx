import React from "react";
import styles from "../styles/Home.module.css"


// Footer component
const Footer : React.FC = () => {
    return (
        <footer className={styles.footer}>
            <ul className={styles.list}>
                <li className={styles.listItem}>Webontwikkeling 4</li>
                <li className={styles.listItem}>Michiel Verhulst, Siebe Sterckx</li>
            </ul>
        </footer>
    )
}

export default Footer;
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { User } from "../../types";
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import UsersOverview from "../../components/users/UserOverviewTable";
import styles from "../../styles/Home.module.css";
import Nav from "../../components/Nav";


// Declaring the Users functional component
const Users: React.FC = () => {

    // Declaring the users state variable using useState
    const [users, setUsers] = useState<Array<User>>();

    // Fetching users from the UserService
    const getUsers = async () => {
        console.log("index-getUsers")
        const users = await UserService.getAllUsers();
        // Updating the users state variable
        setUsers(users);

    };

    // useEffect hook to fetch users when the component mounts
    useEffect(() => {
        console.log("index-useEffect");
        getUsers();
    }, []);

    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>Users</title>
                </Head>
                <Header></Header>
                <Nav></Nav>
                <main>
                    <section className={styles.containerUsers}>
                        <div className={styles.userOverview}>
                            <UsersOverview users={users} />
                        </div>
                    </section>
                </main>
                <Footer></Footer>
            </div>
        </>
    );
};

// Exporting the Users component as the default export
export default Users;

import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.css";
import Nav from "../../components/Nav";
import React, {useState} from "react";
import UserLoginForm from "../../components/users/UserLoginForm";
import UserRegisterForm from "../../components/users/UserRegisterForm";
import UserService from "../../services/UserService";
import {User} from "../../types";


const Login: React.FC = () => {

    // Handling the login action for a user
    const handleLoginUser = async (user: User) => {
        try {
            await UserService.loginUser(user);
            console.log("Logged in:", user);
        } catch (error) {
            console.error("Error logging in:", error);
            throw new Error(error.message);
        }
    };

    const handleRegisterUser = async (user: User) => {
        try {
            await UserService.registerUser(user);
            console.log("Registered:", user);
        } catch (error) {
            console.error("Error registering:", error);
            throw new Error(error.message);
        }
    }


    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>Login</title>
                </Head>
                <Header></Header>
                <Nav></Nav>
                <main className={styles.loginContainer}>
                        <UserLoginForm onSubmit={handleLoginUser} />

                        <UserRegisterForm onSubmit={handleRegisterUser} />
                </main>
                <Footer></Footer>
            </div>
        </>
    )
}

export default Login

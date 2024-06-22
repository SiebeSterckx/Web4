import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Profile } from "../../types"
import {useEffect, useState} from "react"
import ProfileService from "../../services/ProfileService"
import ProfileOverview from "../../components/profiles/ProfileOverviewTable"
import styles from "../../styles/Home.module.css"
import Nav from "../../components/Nav";


// Declaring the Profiles functional component
const Profiles : React.FC = () => {

    // Declaring the profiles state variable using useState
    const [profiles, setProfiles] = useState<Array<Profile>>()

    // Fetching profiles from the ProfileService
    const getProfiles = async () => {
        console.log("index-getProfiles");
        try {
            const profiles = await ProfileService.getAllProfiles();
            // Updating the profiles state variable
            setProfiles(profiles);
        } catch (error) {
            console.error("Error fetching profiles:", error);
            throw new Error(error.message);
        }
    };

    // useEffect hook to fetch profiles when the component mounts
    useEffect(() => {
        console.log("index-useEffect")
        getProfiles()
    },[])

    return (
        <>
            <div className={styles.container}>
            <Head>
                <title>Profiles</title>
            </Head>
            <Header></Header>
            <Nav></Nav>
            <main>
                <section className={styles.containerProfiles}>
                    <div className={styles.profileOverview}>
                    <ProfileOverview profiles={profiles}/>
                    </div>
                </section>
            </main>
            <Footer></Footer>
            </div>
        </>
    )
}

// Exporting the Profiles component as the default export
export default Profiles;
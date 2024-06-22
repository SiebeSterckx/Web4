import Head from "next/head"
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css"


// Declaring the Index functional component
const Index : React.FC = () => {

    return (
        <>
            <div className={styles.container}>
            <Head >
                <title className={styles.title}>Home</title>
            </Head>
            <Header></Header>
            <Nav></Nav>
            <main>
                <div className={styles.welkomContainer}>
                <h1 className={styles.h1}>Welkom!</h1>
                <p className={styles.p}>
                    Welkom bij AutoGo Rentals, uw betrouwbare partner voor autoverhuur.<br/>
                    Wij bieden een ruim assortiment aan voertuigen aan, van compacte stadsauto's tot ruime gezinswagens en luxe SUV's.
                    Onze missie is om u een zorgeloze en comfortabele rijervaring te bieden, waarbij u altijd kunt vertrouwen op onze uitstekende service.<br/>
                    Ontdek ons aanbod en reserveer vandaag nog uw ideale huurauto bij AutoGo Rentals.
                </p>
                </div>
            </main>
            <Footer></Footer>

            </div>
        </>
    )
}

// Exporting the Index component as the default export
export default Index;
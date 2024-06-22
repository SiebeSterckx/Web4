import React from "react"
import { Profile } from "../../types"
import styles from "../../styles/Home.module.css";

type Props = {
    profiles: Array<Profile>
}

// ProfileOverviewTable component
const ProfileOverviewTable : React.FC<Props> = ({profiles}:Props) => {
    return (
        <div className={styles.profileContainer}>
            {profiles && profiles.map((profile, index) => (
                    <div key={index}>

                        <div className={styles.firstRowProfileOverview}>
                            <p className={styles.profileFirstNameText}>
                                Firstname:
                            </p>
                            <p className={styles.profileLastNameText}>
                                Lastname:
                            </p>
                            <p className={styles.profileEmailText}>
                                Email:
                            </p>
                            <p className={styles.profilePhoneNumberText}>
                                Phonenumber:
                            </p>
                        </div>

                        <div className={styles.secondRowProfileOverview}>
                            <p className={styles.profileFirstName}>
                                {profile.firstName}
                            </p>
                            <p className={styles.profileLastName}>
                                {profile.lastName}
                            </p>
                            <p className={styles.profileEmail}>
                                {profile.email}
                            </p>
                            <p className={styles.profilePhoneNumber}>
                                {profile.phoneNumber}
                            </p>
                        </div>
                    </div>

                )
            )}
        </div>
    )
}

export default ProfileOverviewTable
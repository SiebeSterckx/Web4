import React from "react";
import { User } from "../../types";
import styles from "../../styles/Home.module.css";

type Props = {
    users: Array<User>;
};

// UserOverviewTable component
const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
    return (
        <div className={styles.userContainer}>
            {users && users.map((user, index) => (
                    <div key={index}>

                        <div className={styles.firstRowUserOverview}>
                            <p className={styles.userUsernameText}>
                                Username:
                            </p>
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

                        <div className={styles.secondRowUserOverview}>
                            <p className={styles.userUsername}>
                                {user.username}
                            </p>
                            <p className={styles.profileFirstName}>
                                {user.profile?.firstName || "-"}
                            </p>
                            <p className={styles.profileLastName}>
                                {user.profile?.lastName || "-"}
                            </p>
                            <p className={styles.profileEmail}>
                                {user.profile?.email || "-"}
                            </p>
                            <p className={styles.profilePhoneNumber}>
                                {user.profile?.phoneNumber || "-"}
                            </p>
                        </div>
                    </div>

                )
            )}
        </div>
    )
}
export default UserOverviewTable;

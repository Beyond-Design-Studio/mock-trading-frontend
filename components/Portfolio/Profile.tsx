import React from "react";
import Image from "next/image";
import styles from "@styles/portfolio.module.scss";
import { useAuth } from "@components/contexts/authContext";
interface Props {
  toggleModal: () => void;
  textRank: string;
}
const Profile = (props: Props): JSX.Element => {

  const { user } = useAuth();

  return (
    <div className={styles.profileContainer}>
      <div className={styles.avatarContainer}>
        <Image
          src={`https://avatars.dicebear.com/api/identicon/${user.username}.svg?radius=50&backgroundColor=%23eee`}
          alt={"Your face"}
          className={styles.avatar}
          height={100}
          width={100}
          layout="responsive"
        />
      </div>
      <div className={styles.personalInfoContainer}>
        <h1>
          Welcome, <a>{user.username}</a>
        </h1>
        <p>
          You are currently{" "}
          <span onClick={props.toggleModal}>#{props.textRank} on the leaderboard</span>!
        </p>
      </div>
    </div>
  );
};
export default Profile;

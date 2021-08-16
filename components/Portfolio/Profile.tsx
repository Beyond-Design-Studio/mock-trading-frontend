import React from 'react';
import Image from 'next/image';
import styles from "@styles/portfolio.module.scss"
interface Props {
	toggleModal: () => void;
}
const Profile = (props: Props):JSX.Element => {
  return(
    <div className={styles.profileContainer}>
				<div className={styles.avatarContainer}>
					<Image src="/portfolio/avatar-placeholder2.png" alt={"Your face"} className={styles.avatar}
					height={100} width={100} layout="responsive"  />
				</div>
				<div className={styles.personalInfoContainer}>
					<h1>Welcome, <a>Bill Gates</a></h1>
					<p>You are currently <span onClick={props.toggleModal}>#21 on the leaderboard</span>!</p>
				</div>
			</div>
  )
}
export default Profile;
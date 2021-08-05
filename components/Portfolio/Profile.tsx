import React from 'react';
import Image from 'next/image';
import styles from "@styles/portfolio.module.scss"

const Profile = ():JSX.Element => {
  return(
    <div className={styles.profileContainer}>
				<div className={styles.avatarContainer}>
					<Image src="/portfolio/avatar-placeholder2.png" alt={"Your dumb fucking face"} className={styles.avatar}
					height={100} width={100} layout="responsive"  />
				</div>
				<div className={styles.personalInfoContainer}>
					<h1>Welcome, <a>Bill Gates</a></h1>
					<p>You are currently #21 on the leaderboard!</p>
				</div>
			</div>
  )
}
export default Profile;
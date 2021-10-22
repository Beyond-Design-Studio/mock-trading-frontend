// Photo by <a href="https://unsplash.com/@rupixen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">rupixen.com</a> on <a href="https://unsplash.com/s/photos/coins?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

import React from "react";
import Link from 'next/link';

import styles from "@styles/nav.module.scss";

const Nav = ():JSX.Element => {
	return (
		<nav className={styles.container}>
			<ul className={styles.nav}>
				{/* <li style={{width: "3rem"}}></li> */}
				<li className={styles.title}>
					<Link href="/">
						<a>BODHI CAPITAL</a>
					</Link>
				</li>

				<li className={styles["nav-right"]}>
          <a href={`${process.env.NEXT_PUBLIC_DATABASE_URL}/connect/auth0`}>
            <a><button className={styles.navLogInButton}>Login</button></a>
          </a>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;	

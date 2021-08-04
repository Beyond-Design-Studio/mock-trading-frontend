import React from "react";
import Head from "next/head";
import Sidenav from "@components/sidenav";
import styles from "@styles/home.module.scss"
import News from "@components/Home/News";
import Rules from "@components/Home/Rules";

const Home = ():JSX.Element => {
	return (
		<div>
			<Head>
				<title>Mock Stock Market | Home</title>
			</Head>
			<Sidenav />
			<div className={styles.pageContainer}>
				<div className={styles.topRow}>
						<News />
						<Rules />
				</div>
			</div>
		</div>
	);
}

export default Home;
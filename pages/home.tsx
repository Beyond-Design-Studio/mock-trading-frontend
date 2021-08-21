import React from "react";
import Head from "next/head";

import Sidenav from "@components/sidenav";
import styles from "@styles/home.module.scss"
import Rules from "@components/Home/Rules";
import AboutUs from "@components/Home/AboutUs";
import Sponsors from "@components/Home/Sponsors";

const Home = ():JSX.Element => {
	return (
		<div>
			<Head>
				<title>Mock Stock Market | Home</title>
			</Head>

			<Sidenav />

			<div className={styles.pageContainer}>
				{/* <News /> */}
				<Rules />
				<AboutUs/>
				<Sponsors/>
			</div>

		</div>
	);
}

export default Home;
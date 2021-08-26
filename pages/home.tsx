import React, { useEffect } from "react";
import Head from "next/head";
import router from "next/router";

import Sidenav from "@components/sidenav";
import styles from "@styles/home.module.scss"
import Rules from "@components/Home/Rules";
import AboutUs from "@components/Home/AboutUs";
import Sponsors from "@components/Home/Sponsors";
import { useAuth } from "@components/contexts/authContext";


const Home = ():JSX.Element => {

	const {user} = useAuth();

	useEffect(() => {
		if (!user.jwt) router.push("/auth");
	}, [user])

	return (
		<div>
			<Head>
				<title>Mock Stock Market | Home</title>
			</Head>

			<Sidenav />

			<div className={styles.pageContainer}>
				<Rules />
				<AboutUs/>
				<Sponsors/>
			</div>

		</div>
	);
}

export default Home;
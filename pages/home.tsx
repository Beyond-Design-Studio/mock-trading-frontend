import React, { useEffect } from "react";
import Head from "next/head";

import Sidenav from "@components/sidenav";
import styles from "@styles/home.module.scss"
import Rules from "@components/Home/Rules";
import AboutUs from "@components/Home/AboutUs";
import Sponsors from "@components/Home/Sponsors";
import { useAuth } from "@components/contexts/authContext";
// import withAuth from "@components/functions/withAuth";
// import axios from "axios";
// import useUser from "hooks/useUser";
import router from "next/router";

const Home = ():JSX.Element => {

	const {user, setUser} = useAuth();

	useEffect(() => {
		if (!user) router.push("/auth")
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
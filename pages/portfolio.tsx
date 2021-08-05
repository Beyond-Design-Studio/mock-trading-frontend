import React from 'react';
import Head from "next/head";
import styles from "@styles/portfolio.module.scss"
import Sidenav from "@components/sidenav";
import Image from 'next/image';
import Profile from '@components/Portfolio/Profile';
import Funds from '@components/Portfolio/Funds';
import Holdings from '@components/Portfolio/Holdings';

const Portfolio = ():JSX.Element => {
	return (
		<div>
			<Head>
				<title>Your Portfolio</title>
			</Head>

			<Sidenav />
			<div className={styles.pageContainer}>
				<Profile />
				<div className={styles.statsContainer}>
					<Holdings />
					<Funds/>
				</div>
			</div>
		</div>
	)
}

export default Portfolio;

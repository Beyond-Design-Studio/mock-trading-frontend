import React from "react";
import Head from "next/head";

import Sidenav from "@components/sidenav";
import styles from "@styles/market.module.scss";

const Markets = ():JSX.Element => {
	return (
		<div>
			<Head>
				<title>Mock Stock Market</title>
			</Head>

			<Sidenav />
			
			<div className={`${styles.container}`}>
				<div className={`${styles.notification} ${styles.section}`}>
					notification
				</div>

				<div className={`${styles.portfolio} ${styles.section}`}>
					portfolio
				</div>
				
				<div className={`${styles.market} ${styles.section}`}>
					market
				</div>
				
				<div className={`${styles.leader} ${styles.section}`}>
					leader
				</div>
			</div>

		</div>
	);
}

export default Markets;
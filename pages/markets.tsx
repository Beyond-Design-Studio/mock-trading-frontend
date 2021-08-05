import React from "react";
import Head from "next/head";

import Sidenav from "@components/sidenav";
import styles from "@styles/market.module.scss";
import { Notification, Portfolio, Market, Leader } from "@components/Markets/misc";

const Markets = ():JSX.Element => {
	return (
		<div>
			<Head>
				<title>Mock Stock Market</title>
			</Head>

			<Sidenav />
			
			<div className={`${styles.container}`}>
				<div className={`${styles.notification} ${styles.section}`}>
					<Notification />
				</div>

				<div className={`${styles.portfolio} ${styles.section}`}>
					<Portfolio />
				</div>
				
				<div className={`${styles.market} ${styles.section}`}>
					<Market />
				</div>
				
				<div className={`${styles.leader} ${styles.section}`}>
					<Leader />
				</div>
			</div>

		</div>
	);
}

export default Markets;
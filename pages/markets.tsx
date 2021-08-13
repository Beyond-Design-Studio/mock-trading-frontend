import React from "react";
import Head from "next/head";

import Sidenav from "@components/sidenav";
import styles from "@styles/market.module.scss";
import { Notification, Market, Leader } from "@components/Markets/misc";
import News from "@components/Home/News";
import Funds from "@components/Portfolio/Funds";
import PortfolioSnapshot from "@components/Markets/portfolio";

const Markets = ():JSX.Element => {
	return (
		<div>
			<Head>
				<title>Mock Stock Market</title>
			</Head>

			<Sidenav />
			<div className={styles.pageContainer}>
				<div className={styles.newsPort}>
					<News />
					<PortfolioSnapshot/>
				</div>
				<Market />
			</div>

			

		</div>
	);
}

export default Markets;
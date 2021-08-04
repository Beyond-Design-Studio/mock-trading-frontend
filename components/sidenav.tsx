import React, { useEffect } from "react";
import Link from "next/link";

import { HomeIcon, LogOutIcon, PortfolioIcon, MarketIcon, BodhiIcon } from "./icons";
import styles from "@styles/sidenav.module.scss";

const Sidenav = (): JSX.Element => {

	useEffect(() => {
		console.log("a")
	}, [])

	return (
		<aside className={`${styles.leftbar}`}>
			<Link href="/">
				<a className={`${styles.linkIcon}`}>
					Bodhi
					<BodhiIcon />
				</a>
			</Link>
			
			<div className={`${styles.centerIcons}`}>
				<Link href="/">
					<a className={`${styles.linkIcon}`}>
						Home
						<HomeIcon />
					</a>
				</Link>
				
				<Link href="/">
					<a className={`${styles.linkIcon}`}>
						Portfolio
						<PortfolioIcon />
					</a>
				</Link>

				<Link href="/markets">
					<a className={`${styles.linkIcon}`}>
						Market
						<MarketIcon />
					</a>
				</Link>
			</div>
			
			<Link href="/">
				<a className={`${styles.linkIcon}`}>
					logout
					<LogOutIcon />
				</a>
			</Link>
		</aside>
	)
}

export default Sidenav;
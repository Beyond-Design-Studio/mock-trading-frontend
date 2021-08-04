import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { HomeIcon, LogOutIcon, PortfolioIcon, MarketIcon, BodhiIcon } from "@components/icons";
import styles from "@styles/sidenav.module.scss";

const Sidenav = (): JSX.Element => {

	const router = useRouter();

	useEffect(() => {
		if (router && router.query) {
			console.log("hello", router.pathname);
		}
	}, [router]);

	return (
		<aside className={`${styles.leftbar}`}>
			<div className={`${styles.bodhiTitle}`}>
				<Link href="/">
					<a className={`${styles.linkIcon}`}>
						<p>Bodhi</p>
						<BodhiIcon />
					</a>
				</Link>
			</div>
			
			<div className={`${styles.centerIcons}`}>
				<Link href="/">
					<a className={`${styles.linkIcon}`}>
						<p>Home</p>
						<HomeIcon />
					</a>
				</Link>
				
				<Link href="/">
					<a className={`${styles.linkIcon}`}>
						<p>Portfolio</p>
						<PortfolioIcon />
					</a>
				</Link>

				<Link href="/markets">
					<a className={`${styles.linkIcon}`}>
						<p>Market</p>
						<MarketIcon />
					</a>
				</Link>
			</div>
			
			<div className={`${styles.logout}`}>
				<Link href="/">
					<a className={`${styles.linkIcon}`}>
						<p>Logout</p>
						<LogOutIcon />
					</a>
				</Link>
			</div>
		</aside>
	)
}

export default Sidenav;
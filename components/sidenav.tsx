import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { HomeIcon, LogOutIcon, PortfolioIcon, MarketIcon, BodhiIcon, NewsIcon } from "@components/icons";
import styles from "@styles/sidenav.module.scss";

const Sidenav = (): JSX.Element => {

	const router = useRouter();

	useEffect(() => {
		if (router && router.query) {
			console.log("hello", router.pathname);
		}
	}, [router]);

	function LogOutHandler() {
		localStorage.removeItem('token')
		router.push("/")
	}

	return (
		<aside className={`${styles.leftbar}`}>
			<div className={`${styles.bodhiTitle}`}>
				<Link href="/">
					<a tabIndex={0} className={`${styles.linkIcon}`}>
						<p>Bodhi</p>
						<BodhiIcon />
					</a>
				</Link>
			</div>
			
			<div className={`${styles.centerIcons}`}>
				<Link href="/home">
					<a tabIndex={0} className={`${styles.linkIcon}`}>
						<p>Home</p>
						<HomeIcon />
					</a>
				</Link>
				<Link href="/markets">
					<a tabIndex={0} className={`${styles.linkIcon}`}>
						<p>Market</p>
						<MarketIcon />
					</a>
				</Link>
				<Link href="/portfolio">
					<a tabIndex={0} className={`${styles.linkIcon}`}>
						<p>Portfolio</p>
						<PortfolioIcon />
					</a>
				</Link>
				<Link href="/all-news">
					<a tabIndex={0} className={`${styles.linkIcon}`}>
						<p>News</p>
						<NewsIcon />
					</a>
				</Link>
			</div>
			
			<div className={`${styles.logout}`}>
		
					<a tabIndex={0} className={`${styles.linkIcon}`} onClick={LogOutHandler}>
						<p>Logout</p>
						<LogOutIcon />
					</a>

			</div>
		</aside>
	)
}

export default Sidenav;
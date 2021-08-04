import React from 'react';
import Head from "next/head";

import Sidenav from "@components/sidenav";


const Portfolio = ():JSX.Element => {
	return (
		<div>
			<Head>
				<title>Your Portfolio</title>
			</Head>

			<Sidenav />

		</div>
	)
}

export default Portfolio;

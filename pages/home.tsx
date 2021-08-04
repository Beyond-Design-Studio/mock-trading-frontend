import React from "react";
import Head from "next/head";
import Sidenav from "@components/sidenav";

const Home = ():JSX.Element => {
	return (
		<div>
			<Head>
				<title>Mock Stock Market | Home</title>
			</Head>

			<Sidenav />

			<div style={{marginLeft: "7rem"}}>
				classname
			</div>

		</div>
	);
}

export default Home;
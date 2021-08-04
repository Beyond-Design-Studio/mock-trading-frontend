import React from "react";
import Head from "next/head";
import Sidenav from "@components/sidenav";

const Markets = ():JSX.Element => {
	return (
		<div style={{minHeight: "200vh"}}>
			<Head>
				<title>Mock Stock Market</title>
			</Head>

			<Sidenav />
			
			<div>
				hello
			</div>

		</div>
	);
}

export default Markets;
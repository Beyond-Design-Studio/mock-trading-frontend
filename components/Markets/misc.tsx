import React, { FC } from "react";
import Image from "next/image";

import { LoaderIcon } from "@components/icons";
import styles from "@styles/market.module.scss";

export const Notification = (): JSX.Element => {
	return (
		<>notification</>
	);
}

export const Portfolio = (): JSX.Element => {
	return (
		<>portfolio</>
	);
}

interface TableProps {
	name: string,
	img: string,
	previousBid: number,
	currentBid: number,
}

const TableRow: FC<TableProps > = ({name, img, previousBid, currentBid}):JSX.Element => {

	const gain = ((currentBid - previousBid) / previousBid)
	const color = gain < 0 ? "red" : gain === 0 ? "grey" : "green";

	console.log(img);
	return (
		<tr>
			<td>
				{img ? <Image src={img} alt={"Logo"} height={70} width={70} objectFit="contain" /> : <LoaderIcon />}
			</td>
			<td>
				<p>{name}</p>
			</td>
			<td>{previousBid}</td>
			<td>{currentBid}</td>
			<td>
				<div>
					<p>{currentBid - previousBid}</p>
					<p style={{color: `${color}`}}>{`(${gain < 0 ? "" : gain === 0 ? "" : "+"}${gain.toFixed(2)})`}</p>
				</div>
			</td>
		</tr>
	)
}

export const Market = (): JSX.Element => {
	return (
		<>
			<table className={`${styles.marketTable}`}>
				<tr>
					<th colSpan={2}>MARKET</th>
					<th>PREVIOUS BID</th>
					<th>CURRENT BID</th>
					<th>CHANGE</th>
				</tr>

				<TableRow 
					name={"Adani Gas"}
					img={"/markets/adani.png"}
					previousBid={132}
					currentBid={136}
				/>
				<TableRow 
					name={"Avenue Supermarkets"}
					img={""}
					previousBid={136}
					currentBid={136}
				/>
				<TableRow 
					name={"Divis Labs"}
					img={""}
					previousBid={132}
					currentBid={130}
				/>
				<TableRow 
					name={"Adani Gas"}
					img={""}
					previousBid={132}
					currentBid={136}
				/>
				<TableRow 
					name={"Adani Gas"}
					img={""}
					previousBid={132}
					currentBid={136}
				/>
				<TableRow 
					name={"Adani Gas"}
					img={""}
					previousBid={132}
					currentBid={136}
				/>
			</table>
		</>
	);
}

export const Leader = (): JSX.Element => {
	return (
		<>leader</>
	);
}
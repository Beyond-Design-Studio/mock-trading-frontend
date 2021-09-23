import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSocket from './../hooks/useSocket';
import styles from "@styles/floating.module.scss";


const Floating = (): JSX.Element => {
	const socket = useSocket();
	const [time, setTime] = useState(90);
	const [roundNumber, setRoundNumber] = useState(0);
	// useEffect(() => {
	// 	socket.on("round-update", (eventTimer: any) => {
	// 		console.log("ROUND UPDATE", eventTimer)
	// 		setTime(0);
	// 		setRoundNumber(eventTimer.roundNumber);
	// 	});
	// }, [])


	// useEffect(() => {
	// 	if (roundNumber > 0) {
	// 		const interval = setInterval(() => {
	// 			setTime(time > 0 ? time - 1 : 90);
	// 		}, 1000);

	// 		return () => {
	// 			clearInterval(interval)
	// 		}
	// 	}
	// }, [time]);

	return (
		<Link href="/all-news">
			<a className={styles.fixedContainer}>
				{time}
			</a>
		</Link>
	);
}

export default Floating;
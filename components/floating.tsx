import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@styles/floating.module.scss";


const Floating = ({num}: {num: number}): JSX.Element => {
	
	const [time, setTime] = useState(num);
	
	useEffect(() => {
		
		const interval = setInterval(() => {
			setTime(time > 0 ? time - 1 : num);
		}, 1000);

		return () => {
			clearInterval(interval)
		}
	}, [time, num])

	return (
		<Link href="/all-news">
			<a className={styles.fixedContainer}>
				{time}
			</a>
		</Link>
	);
}

export default Floating;
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@styles/floating.module.scss";
import { io } from "socket.io-client";


const Floating = (): JSX.Element => {
	
	const [time, setTime] = useState(90);
	
	useEffect(() => {
    const socket = io('https://bodhi-stock-cms.herokuapp.com');

    socket.on("connect", () => {
      console.log(socket.id); // "G5p5..."
    });
    console.log("socket", socket.connected);
    
    socket.io.on("error", (error: any) => {
      console.error("Socket Error: ", error);
    });
    
    socket.on("news-update", (newsUpdate: any) => {
      console.log("!!!!!!!!!!!news update!!!!!!!!!!!!", newsUpdate);
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);


	useEffect(() => {
		
		const interval = setInterval(() => {
			setTime(time > 0 ? time - 1 : 90);
		}, 1000);

		return () => {
			clearInterval(interval)
		}
	}, [time])

	return (
		<Link href="/all-news">
			<a className={styles.fixedContainer}>
				{time}
			</a>
		</Link>
	);
}

export default Floating;
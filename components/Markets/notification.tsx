import React, { useEffect, useState } from "react";

import { NewsIcon } from "@components/icons";
import NewsData, { NewsMain } from "@data/news";
import Loading from "@components/loading";
import styles from "@styles/market.module.scss";


const NotificationComponent = (): JSX.Element => {

	const [news, setNews] = useState<NewsMain | null>(null);

	useEffect(() => {
		
		const timeout = setTimeout(() => {
			setNews(NewsData[0]);
		}, 700);

		return () => {
			clearTimeout(timeout);
		}
	}, []);

  return (
    <div className={styles.newsContainer}>
      <div className={styles.headerContainer}>
				<div>
					<div>
						<span>
							<NewsIcon />
						</span>
						<h2>News</h2>
					</div>
					
					<h5>Next news update in 10 seconds (3/12)</h5>
				</div>

				{
					news && <div>
						<h5>{"9:30 pm"}</h5>
						<div>NEW</div>
					</div>
				}
			</div>

      <hr />

      {
				news ?
				<ul>
					{news.headlines.map((head, index) => <li key={index}>{head}</li>)}
        </ul> 
					:
				<div style={{paddingTop: "1rem", width: "100%"}}>
					<Loading />
				</div>
			}
    </div>
  );
};

export default NotificationComponent;
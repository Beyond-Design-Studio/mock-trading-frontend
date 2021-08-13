import React, { useState, useEffect } from "react";
import styles from "@styles/market.module.scss"
import { RightArrow, LeftArrow, NewsIcon } from "@components/icons";
import NewsData, { NewsMain } from "@data/news";
import Loading from "@components/loading";
import Link from "next/link";

const News = ():JSX.Element => {
	// console.log(NewsData);
	//newsLimit is the number of news updates that has been done so far (different from final limit)
	const newsLimit = 4;

	const [currentArticle, setCurrentArticle] = useState<NewsMain | null>(null)
	
	useEffect(() => {
		setCurrentArticle(NewsData[2]);
	}, [])



  return(
    <div className={styles.newsContainer}>
			{currentArticle && (
			<>
				<div className={styles.headerContainer}>
					<div className={styles.headerLeft}>
						<div>
							<span >
								<NewsIcon />	
							</span>
							<h1>News</h1>
						</div>
						<h5>Next news update in 10 seconds ({newsLimit}/12)</h5>
					</div>
					<div className={styles.headerRight}>
						<h5>{currentArticle.time}</h5>
						{currentArticle.new && (
							<div>
							NEW
							</div>
						)}
					</div>
				</div>
				<hr/>
				<div className={styles.newsBody}>
				<ul>
					{currentArticle.headlines.map((item, i) => <li key={i}>{item}</li>)}
			
				</ul>
				</div>
				<div className={styles.linkContainer}>
					<Link href={"/all-news"}>
					<h5>View all news updates</h5>
					</Link>
				</div>
			</>
			)}
			{!currentArticle && (
				<>
					<Loading />
				</>
			)}
		</div>
  )
}

export default News;
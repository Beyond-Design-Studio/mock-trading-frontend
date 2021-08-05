import React, { useState, useEffect } from "react";
import styles from "@styles/home.module.scss"
import { RightArrow, LeftArrow, NewsIcon } from "@components/icons";
import NewsData from "../../data/news"
import Loading from "@components/loading";
interface NewsMain {
  time: string;
  serialNo: number;
  headlines: string[];
	new?: boolean;
}

const News = ():JSX.Element => {
	console.log(NewsData);
	//newsLimit is the number of news updates that has been done so far (different from final limit)
	const newsLimit = 4;
	const [newsNo, setNewsNo] = useState<number>(1)
	const [currentArticle, setCurrentArticle] = useState<NewsMain | null>(null)

	useEffect(() => {
		// setCurrentArticle(null)
		setCurrentArticle(NewsData[newsNo-1]);
	}, [newsNo])

	function increaseNewsNo() {
		if (newsNo >= newsLimit) {
			return
		}
		else {
			setNewsNo(newsNo+1)
		}
	}
	function decreaseNewsNo() {
		if (newsNo <= 1) {
			return
		}
		else {
			setNewsNo(newsNo-1)
		}
	}

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
					{currentArticle.headlines.map((item,ind) => <li key={ind}>{item}</li>)}
			
				</ul>
				</div>
				<div className={styles.arrowContainer}>
					<a onClick={decreaseNewsNo}>
						<LeftArrow />
					</a>
					<p>{newsNo}/{newsLimit}</p>
					<a onClick={increaseNewsNo}>
						<RightArrow />
					</a>
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
import React from "react";
import styles from "@styles/home.module.scss"
import { RightArrow, LeftArrow, NewsIcon } from "@components/icons";
const News = ():JSX.Element => {
  return(
    <div className={styles.newsContainer}>
			<div className={styles.headerContainer}>
				<div className={styles.headerLeft}>
					<div>
						<span >
							<NewsIcon />	
						</span>
						<h1>News</h1>
					</div>
					<h5>Next news update in 10 seconds (5/12)</h5>
				</div>
				<div className={styles.headerRight}>
					<h5>9:00 pm</h5>
					<div>
					NEW
					</div>
				</div>
			</div>
			<hr/>
			<div className={styles.newsBody}>
			<ul>
				<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, at.</li>
				<li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo nisi corrupti quidem delectus possimus rem similique exercitationem! Corporis, inventore beatae?</li>
				<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, at.</li>
				<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem recusandae minus ratione tempora consectetur numquam dolorum nam quo, alias quia!</li>						
				<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, at.</li>
				<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem recusandae minus ratione tempora consectetur numquam dolorum nam quo, alias quia!</li>						
			</ul>
			</div>
			<div className={styles.arrowContainer}>
				<LeftArrow />
				<p>5/5</p>
				<RightArrow />
			</div>
		</div>
  )
}

export default News;
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Sidenav from "@components/sidenav";
import styles from "@styles/allNews.module.scss"
import { NewsData, NewsUpdateInterface } from "@data/news";
import {NewsIcon } from "@components/icons";

const AllNews = (): JSX.Element => {

  const [newsUpdates, setNewsUpdates] = useState<NewsUpdateInterface[]>([])
  useEffect(() => {
    setNewsUpdates(NewsData)
  }, [])

  return(
    <>
    <Head>
      <title>Mock Stock Market</title>
    </Head>

    <Sidenav />
    
    <div className={styles.allNewsPage}>
      <h1>All News Updates</h1>
      
      {newsUpdates.map((item, ind) => (
        <div className={styles.newsContainer} key={ind}>
          <div className={styles.headerContainer}>
            <div className={styles.headerLeft}>
              <div>
                <span >
                  <NewsIcon />	
                </span>
                <h1>News Update {item.id}</h1>
              </div>
            </div>
            <div className={styles.headerRight}>
              <h5>{item.published}</h5>
              {ind === (newsUpdates.length -1) && (
                <div>
                NEW
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.line}></div>

          <div className={styles.newsBody}>
            <ul>
              {item.Article1 ? <li>{item.Article1}</li> : null}
              {item.Article2 ? <li>{item.Article2}</li> : null}
              {item.Article3 ? <li>{item.Article3}</li> : null}
              {item.Article4 ? <li>{item.Article4}</li> : null}
              {item.Article5 ? <li>{item.Article5}</li> : null}
            </ul>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default AllNews;
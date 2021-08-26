import React, { useState, useEffect } from "react";
import router from "next/router";
import Head from "next/head";
import Sidenav from "@components/sidenav";
import styles from "@styles/allNews.module.scss"
import { NewsUpdateInterface } from "@data/news";
import { useAuth } from "@components/contexts/authContext";
import { NewsIcon } from "@components/icons";
import { useGetUrl } from "@components/functions/useGetUrl";
import Loading from "@components/loading";

const AllNews = (): JSX.Element => {

  const { user } = useAuth();

  const {data, error} = useGetUrl(user.jwt, "/news-updates")
  console.log("25", data, error);
  const [newsUpdates, setNewsUpdates] = useState<NewsUpdateInterface[]>([])

  useEffect(() => {
    if (!user.jwt) router.push("/auth");
  
    setNewsUpdates(data);
  }, [user, data]);

  return(
    <>
    <Head>
      <title>Mock Stock Market</title>
    </Head>

    <Sidenav />
    
    <div className={styles.allNewsPage}>
      <h1>All News Updates</h1>
      
      {
        newsUpdates ? 
        [...newsUpdates].reverse().map((item, ind) => (
          <div className={styles.newsContainer} key={item.id}>
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
                {ind === (0) && (
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
        )) : 
        <Loading />
      }
    </div>
    </>
  )
}

export default AllNews;
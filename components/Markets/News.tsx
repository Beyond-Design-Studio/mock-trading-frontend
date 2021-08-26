import React, { useState, useEffect } from "react";
import styles from "@styles/market.module.scss";
import { NewsIcon } from "@components/icons";
import { NewsData, NewsUpdateInterface } from "@data/news";
import Loading from "@components/loading";
import Link from "next/link";
import { useAuth } from "@components/contexts/authContext";
import { useGetUrl } from "@components/functions/useGetUrl";
import router from "next/router";

const News = (): JSX.Element => {
  //newsLimit is the number of news updates that has been done so far (different from final limit)
  const newsLimit = 4;
  const { user } = useAuth();

  const {data, error} = useGetUrl(user.jwt, "/news-updates")

  console.log("25", data, error);

  const [currentArticle, setCurrentArticle] =
    useState<NewsUpdateInterface | null>(null);

  useEffect(() => {
    if (!user.jwt) router.push("/auth");
		
    if (data) setCurrentArticle(data[data.length - 1]);
  }, [user, data]);

  return (
    <div className={styles.newsContainer}>
      {currentArticle && (
        <>
          <div className={styles.headerContainer}>
            <div className={styles.headerLeft}>
              <div>
                <span><NewsIcon /></span>
                <h1>News</h1>
              </div>
              <h5>Next news update in 10 seconds ({newsLimit}/12)</h5>
            </div>
            <div className={styles.headerRight}>
              <h5>{currentArticle.published}</h5>

              <div>NEW</div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "2px",
              backgroundColor: "var(--accent-color)",
            }}
          ></div>

          <div className={styles.newsBody}>
            <ul>
              {currentArticle.Article1 ? (
                <li>{currentArticle.Article1}</li>
              ) : null}
              {currentArticle.Article2 ? (
                <li>{currentArticle.Article2}</li>
              ) : null}
              {currentArticle.Article3 ? (
                <li>{currentArticle.Article3}</li>
              ) : null}
              {currentArticle.Article4 ? (
                <li>{currentArticle.Article4}</li>
              ) : null}
              {currentArticle.Article5 ? (
                <li>{currentArticle.Article5}</li>
              ) : null}
            </ul>
          </div>
          <div className={styles.linkContainer}>
            <Link href={"/all-news"}>
              <a>View all news updates</a>
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
  );
};

export default News;

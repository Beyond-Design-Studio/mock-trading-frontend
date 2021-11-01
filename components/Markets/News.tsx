import React, { useState, useEffect } from "react";
import styles from "@styles/market.module.scss";
import { NewsIcon } from "@components/icons";
import { NewsUpdateInterface } from "@data/news";
import Link from "next/link";
import useGetNews from "hooks/useGetNews";
import { useAuth } from "@components/contexts/authContext";
import { useRound } from "@components/contexts/roundContext";

const News = (): JSX.Element => {

  const { round } = useRound();
  const { user } = useAuth();
  const { data } = useGetNews(user.jwt);
  // console.log(user);
  // console.log("[NEWS MARKETS PAGE]", data, error);

  const [currentArticle, setCurrentArticle] =
    useState<NewsUpdateInterface | null>(null);

  useEffect(() => {
    if (data) {
      // console.log(data);
      const sorted_news = [...data].sort((a, b) => b.round_number - a.round_number)
      setCurrentArticle(sorted_news[0]);
    }
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
              <h5 style={{ fontSize: "medium" }}>Next news update in {round.timer} seconds ({round.roundNumber}/{round.max_rounds})</h5>
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
              {currentArticle.Article6 ? (
                <li>{currentArticle.Article6}</li>
              ) : null}
              {currentArticle.Article7 ? (
                <li>{currentArticle.Article7}</li>
              ) : null}
            </ul>
          </div>
          <div className={styles.linkContainer}>
            <Link href={"/all-news"}>
              <a>View previous news updates</a>
            </Link>
          </div>
        </>
      )}
      {!currentArticle && (
        <>
          <p>No Articles Yet. Round Will Start at 19:40</p>
        </>
      )}
    </div>
  );
};

export default News;

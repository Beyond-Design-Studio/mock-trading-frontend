import React from "react";

import Head from "next/head";
import Sidenav from "@components/sidenav";
import styles from "@styles/allNews.module.scss";
import Loading from "@components/loading";
import useGetNews from "hooks/useGetNews";
import useUser from "hooks/useUser";

import { NewsIcon } from "@components/icons";
import { UserInterface } from "@components/contexts/authContext";
import Floating from "@components/floating";

const Wrapped = ({ user }: { user: UserInterface }): JSX.Element => {
  const { data } = useGetNews(user.jwt);

  return (
    <>
      {data ? (
        [...data].sort((a, b) => b.round_number - a.round_number).map((item, ind) => (
          <div className={styles.newsContainer} key={item.id}>
            <div className={styles.headerContainer}>
              <div className={styles.headerLeft}>
                <div>
                  <span>
                    <NewsIcon />
                  </span>
                  <h1>{item.Title}</h1>
                </div>
              </div>
              <div className={styles.headerRight}>
                <h5>{item.published}</h5>
                {ind === 0 && <div>NEW</div>}
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
                {item.Article6 ? <li>{item.Article6}</li> : null}
                {item.Article7 ? <li>{item.Article7}</li> : null}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </>
  );
};

const AllNews = (): JSX.Element => {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Mock Stock Market</title>
      </Head>

      <Sidenav />
      <Floating />

      <div className={styles.allNewsPage}>
        <h1>All News Updates</h1>

        {user.jwt && <Wrapped user={user} />}
      </div>
    </>
  );
};

export default AllNews;

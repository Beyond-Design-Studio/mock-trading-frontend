import React, { useEffect } from "react";

import Head from "next/head";
import Sidenav from "@components/sidenav";
import styles from "@styles/allNews.module.scss";
import Loading from "@components/loading";
import useGetNews from "hooks/useGetNews";
import useUser from "hooks/useUser";
import useSocket from "hooks/useSocket";

import { NewsIcon } from "@components/icons";
import { UserInterface } from "@components/contexts/authContext";

const socket = useSocket();
const Wrapped = ({ user }: { user: UserInterface }): JSX.Element => {
  const { data, refetch } = useGetNews(user.jwt);

  useEffect(() => {
    console.log("socket", socket.connected);

    socket.io.on("error", (error: any) => {
      console.error("Socket Error: ", error);
    });

    socket.on("news-update", (newsUpdate: any) => {
      console.log("!!!!!!!!!!!news update!!!!!!!!!!!!", newsUpdate);
      refetch();
    });



    return () => {
      socket.disconnect();
    };
  }, [refetch]);

  return (
    <>
      {data ? (
        [...data].reverse().map((item, ind) => (
          <div className={styles.newsContainer} key={item.id}>
            <div className={styles.headerContainer}>
              <div className={styles.headerLeft}>
                <div>
                  <span>
                    <NewsIcon />
                  </span>
                  <h1>News Update {item.id}</h1>
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

      <div className={styles.allNewsPage}>
        <h1>All News Updates</h1>

        {user.jwt && <Wrapped user={user} />}
      </div>
    </>
  );
};

export default AllNews;

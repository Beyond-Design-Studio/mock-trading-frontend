import React, { Fragment } from "react";
import styles from "@styles/auth0.module.scss";
import loadingstyle from "@styles/loading.module.scss";

const Test = () => {
  const text = "Loading..."

  return (
    <Fragment>
      <div className={ styles["top-div"] }>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
          <div className={loadingstyle.bouncingLoader}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p>{text}</p>
        </div>
      </div>

    </Fragment>

  )
}

export default Test;

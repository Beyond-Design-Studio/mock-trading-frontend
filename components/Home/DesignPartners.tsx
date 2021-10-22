import React from "react";
import styles from "@styles/home.module.scss"
import { SponsorsIcon } from "@components/icons";

const Sponsors = (): JSX.Element => {
    return (
        <div className={styles.sponsorsContainer}>
            <div className={styles.containerHeader}>
                <span>
                    <SponsorsIcon />
                </span>
                <h1>Our Design Partner</h1>
            </div>

            <div style={{
                width: "100%",
                height: "2px",
                backgroundColor: "var(--accent-color)",
                marginBottom: "1rem"
            }}>
            </div>

            <div style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
            }}>
                <a tabIndex={0} target="_blank" rel="noreferrer" href="https://www.beyonddesignstudio.com/">
                    <img alt="beyond logo" width={200} height={200} src="/sponsors/bynd.png"></img>
                </a>
            </div>
        </div>
    )
}

export default Sponsors;

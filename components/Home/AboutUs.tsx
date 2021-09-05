import React from "react";
import styles from "@styles/home.module.scss"
import { InfoIcon } from "@components/icons";
const AboutUs = ():JSX.Element => {
  return(
    <div className={styles.aboutUsContainer}>
      <div className={styles.containerHeader}>
        <span>
          <InfoIcon/>
        </span>

        <h1>About Us</h1>
      </div>

      <div style={{width: "100%", height: "2px", backgroundColor: "var(--accent-color)"}}></div>

      <div className={styles.aboutBody}>
        <div className={styles.aboutSection}>
          <h2>Bodhi Capital</h2>
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, ducimus repellendus quasi pariatur consequatur dolore culpa temporibus, eligendi natus, itaque eaque voluptatibus nemo alias. Cumque tempore suscipit quibusdam cupiditate labore soluta maxime quos iusto? Ullam, officiis corrupti ex beatae sequi saepe sit veritatis asperiores, recusandae facere similique vel possimus tempora.</p>
          </div>
        </div>

        <div className={styles.aboutLine}/>
        
        <div className={styles.aboutSection}>
          <h2>Ashoka Investments Club</h2>
          <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero placeat explicabo accusantium inventore ratione, fuga fugiat esse optio tempore ab totam facere veritatis asperiores vel ut repudiandae! Necessitatibus, unde corrupti! Labore adipisci deleniti cum ut repudiandae mollitia vitae quis, minima nisi ex, minus corporis sunt accusantium laudantium ipsa iure. In!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AboutUs;
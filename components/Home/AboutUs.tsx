import React from "react";
import styles from "@styles/home.module.scss"
import { InfoIcon } from "@components/icons";
const AboutUs = (): JSX.Element => {
  return (
    <div className={styles.aboutUsContainer}>
      <div className={styles.containerHeader}>
        <span>
          <InfoIcon />
        </span>

        <h1>About Us</h1>
      </div>

      <div style={{ width: "100%", height: "2px", backgroundColor: "var(--accent-color)" }}></div>

      <div className={styles.aboutBody}>
        <div className={styles.aboutSection}>
          <h2><a href="https://tinyurl.com/ashokainv" target="_blank" rel="noreferrer">Ashoka Investments Club </a></h2>
          <div>
            <p>AIC, the investments club of Ashoka University, consists of finance enthusiasts committed to
              establishing an investment ethos in a liberal arts environment at Ashoka. We meet regularly to discuss stock
              picks and investment philosophies, along with hosting speaker sessions on different aspects of investing.
              Our aim is to establish a working knowledge of personal finance in our surroundings, by organising competitions
              like the MockStock, Cryptic Hunts, etc. We also run India’s first student-led undergraduate fund -
              <b><a href="https://bodhicapital.in/" target="_blank" rel="noreferrer">Bodhi Capital </a></b>. It was founded and incorporated as a partnership firm in 2019. Led by a team of 7 Portfolio Managers and 16 Analysts to make key investment decisions,
              the vision of Bodhi is to produce superior risk-adjusted returns through equity research based on bottom-up fundamental analysis.</p>
          </div>
        </div>

        <div className={styles.aboutLine} />

        <div className={styles.aboutSection}>
          <h2>
            <a href=" https://www.ashoka.edu.in/CFE" target="_blank" rel="noreferrer">
              InfoEdge Centre for Entrepreneurship
            </a>
          </h2>
          <div>
            <p>
              The InfoEdge Centre for Entrepreneurship is the creative hub at Ashoka University that nurtures
              the entrepreneurial endeavours of all students, fellows, faculty and founders alike. With the
              mission of creating a strong foundation of academic learning in the field of entrepreneurship,
              and inculcating a culture of innovation and entrepreneurial spirit on campus, The Centre is committed
              to assisting students in every stage of the lifecycle of an enterprise– from inspiration, ideation and
              initiation, to incubation, investments and internationalisation for both mainstream innovations as well
              as ventures around social innovation and sustainability. The CFE is the perfect amalgamation of Liberal Arts and
              Entrepreneurship, facilitating a vibrant community of Entrepreneurs to work in a wide range of sectors spanning
              from the mainstream to the niche sectors.
            </p>
          </div>
        </div>
      </div>
    </div >
  )
}
export default AboutUs;
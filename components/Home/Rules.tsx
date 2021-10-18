import React from "react";
import styles from "@styles/home.module.scss"
import { RulesIcon } from "@components/icons";
const Rules = (): JSX.Element => {
  return (
    <div className={styles.rulesContainer}>
      <div className={styles.containerHeader}>
        <span>
          <RulesIcon />
        </span>
        <h1>Rules</h1>
      </div>

      <div style={{ width: "100%", height: "2px", backgroundColor: "var(--accent-color)" }}></div>

      <div>
        <ul>
          <li>The stock market will be open for <b> 80 minutes for a total of 20 rounds. Each round shall be 4 minutes long. </b></li>
          <li>There will be a new set of news updates at the beginning of each round on the basis of which participants should make their investing decisions.</li>
          <li>Each individual will have <b>Rs. 10,00,000</b>to invest.</li>
          <li>For rounds 1-10, investors may only buy <b>Rs. 5,00,000 worth of one stock, Rs. 2,00,000 worth of one cryptocurrency, and Rs. 2,00,000 worth of one commodity in each round.
          </b></li>
          <li>For rounds 11-20, the investment limits shall be increased to <b>Rs. 7,50,000 for a particular stock, Rs. 5,00,000 for a particular cryptocurrency, and Rs. 5,00,000 for a particular commodity in each round.</b></li>
          <li>Stocks, cryptocurrencies, and commodities may be bought and sold at any given time</li>
          <li>At the end of the event the individuals with the 3 highest net worths will be declared as the winners.
          </li>
          <li>Use of calculators is permitted. </li>
          <li>Use of the internet is permitted. </li>
          <li>In case of technical difficulties, please contact any of the organisers at the event helpdesk.</li>
        </ul>
      </div>
    </div>
  )
}
export default Rules;
import React from "react";
import styles from "@styles/home.module.scss"
import { RulesIcon } from "@components/icons";
const Rules = (): JSX.Element => {
  return (
    <div className={styles.rulesContainer}>
      <style jsx>{`
        .hoverColor {
          color: white
        }
        .hoverColor:hover {
          color: var(--accent-color);
        }
      `}</style>


      <div className={styles.containerHeader}>
        <span>
          <RulesIcon />
        </span>
        <h1>Rules</h1>
      </div>

      <div style={{ width: "100%", height: "2px", backgroundColor: "var(--accent-color)" }}></div>

      <div>
        <ul>
          <li>The stock market will be open for <b> 60 minutes for a total of 15 rounds. Each round shall be 4 minutes long. </b></li>
          <li>The 1st round shall begin at <b>7:40PM sharp.</b></li>
          <li>There will be a new set of news updates at the beginning of each round on the basis of which participants should make their investing decisions.</li>
          <li>Each individual will have <b>Rs. 10,00,000</b> to invest.</li>
          <li>For <b>rounds 1-5</b>, the <b>investment limits</b> are <b>Rs. 5,00,000 per stock, Rs. 2,00,000 per cryptocurrency</b>, and <b>Rs. 2,00,000 per commodity</b> in each round.</li>
          <li>For <b>rounds 6-15</b>, the <b>investment limits</b> shall be increased to <b>Rs. 7,50,000 per stock, Rs. 5,00,000 per cryptocurrency</b>, and <b>Rs. 5,00,000 per commodity</b> in each round.</li>
          <li>Investors may buy/sell any number of stocks, cryptocurrencies, and commodities at any time during the event.</li>
          <li>Stock can only be purchased in whole quantities (eg. 10, 1134 etc.), while crypto currencies and commodities may be purchased in fractional units upto 2 decimal places (eg. 12.35, 0.56 etc.).</li>
          <li>At the end of the event the individuals with the <b>3 highest net worths</b> will be declared as the <b>winners</b>.
          </li>
          <li>Use of calculators is permitted. </li>
          <li>Use of the internet is permitted. </li>
          <li>In case your timer is not working, please switch to a different network as some Indian telecoms do not support polling/sockets which might make the timer to not work. If you don't have a different network, please note that the rounds last 4 minutes each so please time yourself accordingly. </li>
          <li>In case of technical difficulties, please contact the organisers at the event <a href='https://zoom.us/j/94677452623?pwd=R1ZkNWh0c2VSN2ZxbGdISWl6NW5CUT09' target="_blank" rel="noreferrer" style={{ 'textDecoration': 'underline' }} className="hoverColor">helpdesk.</a></li>
        </ul>
      </div>
    </div>
  )
}
export default Rules;

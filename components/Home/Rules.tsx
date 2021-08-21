import React from "react";
import styles from "@styles/home.module.scss"
import { RulesIcon } from "@components/icons";
const Rules = ():JSX.Element => {
  return(
    <div className={styles.rulesContainer}>
      <div className={styles.containerHeader}>
        <span>
          <RulesIcon />
        </span>
        <h1>Rules</h1>
      </div>

      <div style={{width: "100%", height: "2px", backgroundColor: "var(--accent-color)"}}></div>

      <div>
      <ul>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt, amet.</li>
        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugit fugiat unde laborum veniam debitis!</li>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt, amet.</li>
        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugit fugiat unde laborum veniam debitis!</li>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt, amet.</li>
        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugit fugiat unde laborum veniam debitis!</li>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt, amet.</li>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt, amet.</li>
        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugit fugiat unde laborum veniam debitis!</li>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt, amet.</li>
      </ul>		
      </div>
    </div>
  )
}
export default Rules;
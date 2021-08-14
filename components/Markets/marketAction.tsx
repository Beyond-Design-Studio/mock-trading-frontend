import React from "react"
import styles from "@styles/market.module.scss";
interface ModalValues  {
  name: string,
  img: string,
  previousBid: number,
  currentBid: number
}
interface Props {
  values: ModalValues,
  action: string,
}

const MarketActions = (props:Props): JSX.Element => {
  console.log(props);
  
  return(
    <div className={styles.actionModal}>
      <h2>{props.action.toLocaleUpperCase()} {props.values.name}</h2>
    </div>
  )
}
export default MarketActions;
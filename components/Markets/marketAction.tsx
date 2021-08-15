import React, { useEffect, useState } from "react"
import styles from "@styles/market.module.scss";
import useMediaQuery from "react-responsive"
import indianNumberConverter from "@components/functions/numberConvertor"
interface ModalValues  {
  name: string,
  img: string,
  previousPrice: number,
  currentPrice: number
}
interface Props {
  values: ModalValues,
  action: string,
  toggleModal: () => void;
}

const MarketActions = (props:Props): JSX.Element => {
  const isMedium = useMediaQuery({ query: "(min-width: 769px)" });
  const availableFunds:number = 100000;
  const [desiredQty, setDesiredQty] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  function calculateTotal() : void {
    setTotal(desiredQty * props.values.currentPrice)
  }
  useEffect(() => {
    calculateTotal();
  }, [desiredQty])

  function maxOutBuy() {
    let maxValue:number = (Math.round(availableFunds/props.values.currentPrice));
    //TODO handle case maxValue is above allocation limit
    setDesiredQty(maxValue);
  }
  return(
    <div className={styles.actionModal}>
      <h2><span>{props.action.toLocaleUpperCase()}</span> {props.values.name}</h2>
      <div className={styles.actionRow}>
        <h4>Current Price: {props.values.currentPrice}</h4>
        <h4>Current Qty Held: 20</h4>
      </div>
      <div className={styles.actionRow} style={isMedium ? {width: '80%'} : {width: '60%'}}>
        <h4>Desired Qty:</h4>
        <input type="number" min={0} max={9999} defaultValue={0} value={desiredQty} onChange={(e)=>setDesiredQty(parseInt(e.target.value))}/>
        {props.action === "buy" && (
          <button onClick={maxOutBuy} className={styles.selButton}>MAX</button>
        )}
      </div>
      <div className={styles.actionRow} style={isMedium ? {width: '80%'} : {width: '30%'}}>
        <h4>Total:</h4>
        <h4>{indianNumberConverter(total)}</h4>
      </div>
      <div className={styles.actionRow} style={isMedium ? {width: '50%'} : {width: '40%'}}>
        <button onClick={props.toggleModal} className={styles.unselButton}>cancel</button>
        <button className={styles.selButton}>{props.action}</button>
      </div>
    </div>
  )
}
export default MarketActions;
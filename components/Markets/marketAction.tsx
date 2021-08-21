import React, { useEffect, useState } from "react"
import styles from "@styles/market.module.scss";
import useMediaQuery from "react-responsive"
import indianNumberConverter from "@components/functions/numberConvertor"
interface ModalValues  {
  name: string,
  img: string,
  previousPrice: number,
  currentPrice: number,
  type: string
}
interface Props {
  values: ModalValues,
  action: string,
  toggleModal: () => void;
}

const MarketActions = (props:Props): JSX.Element => {
  const isMedium = useMediaQuery({ query: "(min-width: 769px)" });
  const ownedStock = 100;
  const availableFunds = 100000000;
  const allocationLimit:number = props.values.type === "stocks" ? 400000 : 300000; 
  const quantityLimit: number = Math.floor(allocationLimit/props.values.currentPrice);
  console.log(allocationLimit, quantityLimit);
  //TODO make the limits also count securities owned by user beforehand
  const [desiredQty, setDesiredQty] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [error, setError] = useState<string|null>(null)

  function desiredQtyHandler(val: number) {
    if (props.action === 'buy' && val > quantityLimit) {
      setError("The input quanity is above the allocation limit.")
    }
    //TODO error for exceeded held quantity when selling
    else if (props.action === "sell" && val > ownedStock) {
      setError("The input quanity is greater than your owned quantity.")
    }
    else {
      setError(null)
      setDesiredQty(val)
    }
  }

  useEffect(() => {
    setTotal(desiredQty * props.values.currentPrice)

  }, [desiredQty, props.values.currentPrice])


  function maxOutBuy() {
    const maxValue:number = (Math.round(availableFunds/props.values.currentPrice));
    
    if (maxValue > quantityLimit) {
      setDesiredQty(quantityLimit);
    }
    else {
      setDesiredQty(maxValue);
    }
  }
  
  return(
    <div className={styles.actionModal}>
      <h2><span>{props.action.toLocaleUpperCase()}</span> {props.values.name}</h2>
      <div className={styles.actionRow}>
        <h4>Current Price: {props.values.currentPrice}</h4>
        <h4>Current Qty Held: {ownedStock}</h4>
      </div>
      <div className={styles.actionRow} style={isMedium ? {width: '80%'} : {width: '60%'}}>
        <h4>Desired Qty:</h4>
        <input type="number" min={0} max={9999} defaultValue={0} value={desiredQty} onChange={(e)=>desiredQtyHandler(parseInt(e.target.value))}/>
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
      {error && (
        <div className={styles.errorCont}>
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}
export default MarketActions;
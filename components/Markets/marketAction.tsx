import React, { useEffect, useState } from "react"
import styles from "@styles/market.module.scss";
import useMediaQuery from "react-responsive"
import indianNumberConverter from "@components/functions/numberConvertor"
import { useAuth } from "@components/contexts/authContext";
import { useGetUrl } from "@components/functions/useGetUrl";
import { mutate } from "swr";
import axios from "axios";


interface ModalValues  {
  id: number
  name: string,
  img: string,
  previousPrice: number,
  currentPrice: number,
  type: string
  ticker: string
}

interface Props {
  values: ModalValues,
  action: string,
  toggleModal: () => void;
}

const MarketActions = (props:Props): JSX.Element => {
  
  const {user} = useAuth();

  const { data: portfolioData, err } = useGetUrl(user.jwt, `/portfolios/${user.portfolio}`);
  const { data } = useGetUrl(user.jwt, `/holdings?portfolio=${user.portfolio}`);

  const isMedium = useMediaQuery({ query: "(min-width: 769px)" });
  
  const [holdingData, setholdingData] = useState<any>(null)  
  const [ownedStock, setOwnedStock] = useState(0);
  
  const allocationLimit:number = props.values.type === "stocks" ? 400000 : 300000; 
  const quantityLimit: number = Math.floor(allocationLimit/props.values.currentPrice);
  
  // console.log(allocationLimit, quantityLimit);
  
  //TODO make the limits also count securities owned by user beforehand
  const [desiredQty, setDesiredQty] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [error, setError] = useState<string|null>(null)
  const [availableFunds, setAvailableFunds] = useState(0);

  function desiredQtyHandler(val: number) {

    if (desiredQty < 1) {
      setError("Ye have to buy atleast one");
    } else {
      setError(null)
      setDesiredQty(val)
    }

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
    if (data) setholdingData(data.filter((hold: any) => hold.security.name === props.values.name)[0])
    if (holdingData) setOwnedStock(holdingData ? holdingData.OwnedQuantity : 0);
    if (portfolioData) setAvailableFunds(portfolioData.AvailableFunds);
    
  }, [desiredQty, err, props.values.currentPrice, holdingData, data, props.values.name, portfolioData])

  const buyClick = () => {
    if (total > availableFunds || error) {
      console.error(total, availableFunds);
      setError("Buy Limit exceeded");
    }
    else {

      if (ownedStock === 0) {
        axios({
          url: `/holdings`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
          data: {
            "StockTicker": `${props.values.ticker}`,
            "PurchasePrice": props.values.currentPrice,
            "OwnedQuantity": desiredQty,
            "portfolio": user.portfolio,
            "security": props.values.id
          }
        })
          .then(res => {
            console.log("Added data");
            return res.data;
          })
          .catch(err => {
            console.error(err);
          })

        mutate(`/holdings?portfolio=${user.portfolio}`);

      } else if (ownedStock > 0) {
        mutate(`/holdings/${holdingData.id}`, {...holdingData, desiredQty}, false);

        mutate(`/holdings/${holdingData.id}`,
          axios({
            url: `/holdings/${holdingData.id}`,
            method: "PUT",
            headers: {
              Authorization: `Bearer ${user.jwt}`,
            },
            data: {
              "OwnedQuantity": holdingData.OwnedQuantity + desiredQty,
              "PurchasePrice": props.values.currentPrice
            }
          })
            .then(res => {
              console.log("mutated data");
              return res.data;
            }));
      }

      props.toggleModal();
    }
  }

  const sellClick = () => {
    if (ownedStock < desiredQty) {
      setError("Can't sell more than ye have");
    } else if (ownedStock === desiredQty) {
      axios({
        url: `/holdings/${holdingData.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        }
      })
        .then(res => {
          console.log("Added data");
          return res.data;
        })
        .catch(err => {
          console.error(err);
        })

      mutate(`/holdings/${holdingData.id}`);
    } else {
      mutate(`/holdings/${holdingData.id}`, {...holdingData, desiredQty}, false);

      mutate(`/holdings/${holdingData.id}`,
        axios({
          url: `/holdings/${holdingData.id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
          data: {
            "OwnedQuantity": holdingData.OwnedQuantity - desiredQty,
            "PurchasePrice": props.values.currentPrice
          }
        })
          .then(res => {
            console.log("mutated data");
            return res.data;
          }));
    }

    props.toggleModal();
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
        <input type="number" min={0} max={9999} value={desiredQty} onChange={(e) => desiredQtyHandler(parseInt(e.target.value))}/>
      </div>
      
      <div className={styles.actionRow} style={isMedium ? {width: '80%'} : {width: '30%'}}>
        <h4>Total:</h4>
        <h4>{indianNumberConverter(total)}</h4>
      </div>
      
      <div className={styles.actionRow} style={isMedium ? {width: '50%'} : {width: '40%'}}>
        <button onClick={props.toggleModal} className={styles.unselButton}>cancel</button>
        {
          props.action === "buy" ?
          <button onClick={buyClick} className={styles.selButton}>{props.action}</button>
            :
          <button onClick={sellClick} className={styles.selButton}>{props.action}</button>
        }
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
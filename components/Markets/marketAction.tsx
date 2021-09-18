import React, { useEffect, useState } from "react";

import styles from "@styles/market.module.scss";
import useMediaQuery from "react-responsive";
import useGetHoldings from "hooks/useGetHoldings";
import useGetPortfolio from "hooks/useGetPortfolio";
import indianNumberConverter from "@components/functions/numberConvertor";

import { useAuth } from "@components/contexts/authContext";
import { postHolding, deleteHolding, putHolding } from "@components/functions/postHoldings";
import putPortfolio from "@components/functions/postPortfolio";
import useGetFilteredHolding from "hooks/useGetFilteredHoldings";


interface ModalValues {
  id: number;
  name: string;
  img: string;
  previousPrice: number;
  currentPrice: number;
  type: string;
  ticker: string;
}

interface Props {
  values: ModalValues;
  action: string;
  toggleModal: () => void;
}

const MarketActions = (props: Props): JSX.Element => {
  const { user } = useAuth();

  const { data: portfolioData, refetch: portRefetch } = useGetPortfolio(user.jwt, user.portfolio);
  const { data: holdingDatas, refetch: holdingsRefetch } = useGetHoldings(user.jwt, user.portfolio);
  const { filteredData: data, refetch: filteredRefetch } = useGetFilteredHolding();

  const isMedium = useMediaQuery({ query: "(min-width: 769px)" });

  const [holdingData, setholdingData] = useState<any>(null);
  const [ownedStock, setOwnedStock] = useState(0);

  const allocationLimit: number =
    props.values.type === "stocks" ? 400000 : 300000;
  const quantityLimit: number = Math.floor(
    allocationLimit / props.values.currentPrice
  );

  //TODO make the limits also count securities owned by user beforehand
  const [desiredQty, setDesiredQty] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [availableFunds, setAvailableFunds] = useState(0);

  function desiredQtyHandler(val: number) {
    if (desiredQty < 1) {
      setError("Ye have to buy atleast one");
    } else {
      setError(null);
      setDesiredQty(val);
    }

    if (props.action === "buy" && val > quantityLimit) {
      setError("The input quanity is above the allocation limit.");
    }
    //TODO error for exceeded held quantity when selling
    else if (props.action === "sell" && val > ownedStock) {
      setError("The input quanity is greater than your owned quantity.");
    } else {
      setError(null);
      setDesiredQty(val);
    }
  }

  useEffect(() => {
    setTotal(desiredQty * props.values.currentPrice);
    if (data)
      setholdingData(
        data.filter((hold: any) => hold.security.name === props.values.name)[0]
      );
      console.log(data, holdingData);
      
    if (holdingData) setOwnedStock(holdingData ? holdingData.OwnedQuantity : 0);
    if (portfolioData) setAvailableFunds(portfolioData.AvailableFunds);
  }, [
    desiredQty,
    props.values.currentPrice,
    holdingData,
    data,
    props.values.name,
    portfolioData,
  ]);

  const buyClick = () => {
    if (total > availableFunds || error) {
      console.error(total, availableFunds);
      setError("Buy Limit exceeded");
    } else if (desiredQty > 0) {
      postHolding(user.jwt, {
        StockTicker: `${props.values.ticker}`,
        PurchasePrice: props.values.currentPrice,
        OwnedQuantity: desiredQty,
        portfolio: user.portfolio,
        security: props.values.id,
      }),
      putPortfolio(user.jwt, user.portfolio, {
        AllocatedFunds: portfolioData.AllocatedFunds + desiredQty * props.values.currentPrice,
        AvailableFunds: portfolioData.AvailableFunds - desiredQty * props.values.currentPrice
      }).then(res => {
        portRefetch();
        holdingsRefetch();
        filteredRefetch();
        console.log(res);
      })
      props.toggleModal();
    }
  };

  const sellClick = () => {
    if (ownedStock < desiredQty) {
      setError("Can't sell more than ye have");

    } else {
      let desQty = desiredQty;

      const desiredStocks = holdingDatas.filter((hold: any) => hold.security.name === props.values.name)
      if (ownedStock === desiredQty) {
        desiredStocks.map((hold: any) => deleteHolding(user.jwt, hold.id));
      } else if (ownedStock > desiredQty ) {
        while (desQty > 0) {
          const mostRecent = desiredStocks.pop()
          console.log("mostRecentQty and desQty", mostRecent, desQty)

          // If Desired Quantity is greater than or equal to the most recently bought stocks OwnedQty, then delete that holding
          if (desQty >= mostRecent.OwnedQuantity) {
            deleteHolding(user.jwt, mostRecent.id)
            console.log( "deletedHolding" )

          } else {
            putHolding(user.jwt, {
              "OwnedQuantity": mostRecent.OwnedQuantity - desQty,
              "PurchasePrice": props.values.currentPrice
            }, mostRecent.id)
            console.log( "edited holding" )
          }
          desQty -= mostRecent.OwnedQuantity;
        }
      }
      putPortfolio(user.jwt, user.portfolio, {
        AllocatedFunds: portfolioData.AllocatedFunds - desiredQty * props.values.currentPrice > 0 ? portfolioData.AllocatedFunds - desiredQty * props.values.currentPrice : 0,
        AvailableFunds: portfolioData.AvailableFunds + desiredQty * props.values.currentPrice
      }).then(() => {
        portRefetch();
        holdingsRefetch();
        filteredRefetch();
      })
      props.toggleModal();
    }
  };

  function maxOutBuy() {
    const maxValue:number = (Math.round(availableFunds / props.values.currentPrice));
    
    if (maxValue > quantityLimit) {
      setDesiredQty(quantityLimit);
    }
    else {
      setDesiredQty(maxValue);
    }
  }

  return (
    <div className={styles.actionModal}>
      <h2>
        <span>{props.action.toLocaleUpperCase()}</span> {props.values.name}
      </h2>

      <div className={styles.actionRow}>
        <h4>Current Price: {props.values.currentPrice}</h4>
        <h4>Current Qty Held: {ownedStock}</h4>
      </div>

      <div
        className={styles.actionRow}
        style={isMedium ? { width: "80%" } : { width: "60%" }}
      >
        <h4>Desired Qty:</h4>
        <input
          type="number"
          min={0}
          max={9999}
          value={desiredQty}
          onChange={(e) => desiredQtyHandler(parseInt(e.target.value))}
        />
        {props.action === "buy" && (
          <button onClick={maxOutBuy} className={styles.selButton}>MAX</button>
        )}
      </div>

      <div
        className={styles.actionRow}
        style={isMedium ? { width: "80%" } : { width: "30%" }}
      >
        <h4>Total:</h4>
        <h4>{indianNumberConverter(total)}</h4>
      </div>

      <div
        className={styles.actionRow}
        style={isMedium ? { width: "50%" } : { width: "40%" }}
      >
        <button onClick={props.toggleModal} className={styles.unselButton}>
          cancel
        </button>
        {props.action === "buy" ? (
          <button onClick={buyClick} className={styles.selButton}>
            {props.action}
          </button>
        ) : (
          <button onClick={sellClick} className={styles.selButton}>
            {props.action}
          </button>
        )}
      </div>

      {error && (
        <div className={styles.errorCont}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default MarketActions;

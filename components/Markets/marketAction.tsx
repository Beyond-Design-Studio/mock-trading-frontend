import React, { useEffect, useState } from "react";

import styles from "@styles/market.module.scss";
import loadingstyle from "@styles/loading.module.scss";
import useMediaQuery from "react-responsive";
import useGetHoldings from "hooks/useGetHoldings";
import useGetPortfolio from "hooks/useGetPortfolio";
import indianNumberConverter from "@components/functions/numberConvertor";

import { useAuth } from "@components/contexts/authContext";
// import { deleteHolding, putHolding } from "@components/functions/postHoldings";
// import putPortfolio from "@components/functions/postPortfolio";
import useGetFilteredHolding from "hooks/useGetFilteredHoldings";
import axios from "axios";
import toFixed from "@components/functions/toFixed";
import { useGetStockById } from "hooks/useGetStocks";


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
  const { data: holdings, refetch: holdingsRefetch } = useGetHoldings(user.jwt, user.portfolio);
  const { filteredData: data } = useGetFilteredHolding(holdings);
  const { data: stockData } = useGetStockById(user.jwt, props.values.id);

  const isMedium = useMediaQuery({ query: "(min-width: 769px)" });

  const [holdingData, setholdingData] = useState<any>(null);
  const [ownedStock, setOwnedStock] = useState(0);
  const [desiredQty, setDesiredQty] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [availableFunds, setAvailableFunds] = useState(0);
  const [allocationLimit, setAllocationLimit] = useState(1000);
  const [loading, setLoading] = useState(false);

  const quantityLimit: number = props.values.type === "stock" ? Math.floor(
    allocationLimit / props.values.currentPrice
  ) : (allocationLimit / props.values.currentPrice);

  //TODO make the limits also count securities owned by user beforehand

  function desiredQtyHandler(val: number) {
    if (desiredQty < 1) {
      setError("Ye have to buy atleast one");
    } else {
      setError(null);
      setDesiredQty(val);
    }

    if (props.action === "buy" && val > quantityLimit) {
      setError("The input quantity is above the allocation limit.");
    }
    //TODO error for exceeded held quantity when selling
    else if (props.action === "sell" && val > ownedStock) {
      setError("The input quantity is greater than your owned quantity.");
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

    if (stockData) {
      console.log("MarketActions.tsx stockData", stockData);
      setLoading(false);
    }
    else {
      console.log("welp");
      setLoading(true);
    }

    console.log(holdingData);
    if (holdingData) setOwnedStock(holdingData ? holdingData.OwnedQuantity : 0);
    if (portfolioData) setAvailableFunds(portfolioData.AvailableFunds);
    holdingData ? setAllocationLimit(holdingData.price_limit) : setAllocationLimit(stockData ? stockData.price_limit : allocationLimit);
  }, [
    desiredQty,
    props.values.currentPrice,
    holdingData,
    data,
    props.values.name,
    portfolioData,
    stockData
  ]);

  const buyClick = () => {
    // console.log({
    //   "portfolio_id": portfolioData.id,
    //   "stock_id": props.values.id,
    //   "quantity": desiredQty
    // })
    axios({
      url: `/stocks/buy`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.jwt}`
      },
      data: {
        "portfolio_id": portfolioData.id,
        "stock_id": props.values.id,
        "quantity": desiredQty
      }
    }).then(() => {
      portRefetch();
      holdingsRefetch();
      props.toggleModal();
    }).catch((err) => {
      if (err.response) {
        const errMsg = err.response.data.message[0].messages[0].id
        console.error("[BUY ERROR]", JSON.stringify(errMsg));
        setError(errMsg);
      } else {
        setError("Some Error Occurred")
      }
    })
  };

  const sellClick = () => {
    axios({
      method: "POST",
      url: `/stocks/sell`,
      headers: {
        Authorization: `Bearer ${user.jwt}`
      },
      data: {
        "portfolio_id": portfolioData.id,
        "stock_id": props.values.id,
        "quantity": desiredQty
      }
    }).then(() => {
      portRefetch();
      holdingsRefetch();
      props.toggleModal();
    }).catch((err) => {
      if (err.response) {
        const errMsg = err.response.data.message[0].messages[0].id
        console.error("[BUY ERROR]", JSON.stringify(errMsg));
        setError(errMsg);
      } else {
        setError("Some Error Occurred")
      }
    })
  };

  const sellAll = () => {
    setDesiredQty(ownedStock);
  }

  function maxOutBuy() {
    const maxValue: number = props.values.type === "stock" ?
      (Math.floor(availableFunds / props.values.currentPrice)) :
      toFixed((availableFunds / props.values.currentPrice), 2);

    if (maxValue > quantityLimit) {
      setDesiredQty(toFixed(quantityLimit, 2));
    } else {
      setDesiredQty(maxValue);
    }
  }

  return (
    <div className={styles.actionModal}>
      {
        !loading ?
        <>
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
              onChange={(e) => desiredQtyHandler(e.target.value ? parseFloat(e.target.value) : 0)}
            />
            {props.action === "buy" && (
              <button onClick={maxOutBuy} className={styles.selButton}>MAX</button>
            )}
            {props.action === "sell" && (
              <button onClick={sellAll} className={styles.selButton}>ALL</button>
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
        </>
        :
        <div className={ loadingstyle.bouncingLoader }>
          <div></div>
          <div></div>
          <div></div>
        </div>
      }
    </div>
  );
};

export default MarketActions;

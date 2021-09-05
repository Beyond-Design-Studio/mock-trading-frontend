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
  const { filteredData: data } = useGetFilteredHolding();

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

  // const { mutate: portMutation } = useMutation(
  //   putPortfolio(user.jwt, user.portfolio, {
  //    AllocatedFunds: portfolioData.AllocatedFunds - desiredQty * props.values.currentPrice,
  //    AvailableFunds: portfolioData.AvailableFunds + desiredQty * props.values.currentPrice
  //   }),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["portfolios", user.portfolio]);
  //     },
  //   }
  // );

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
        console.log(res);
      })
      props.toggleModal();
    }
  };

  const sellClick = () => {
    if (ownedStock < desiredQty) {
      setError("Can't sell more than ye have");
    } else {
      // let desQty = desiredQty;
      if (ownedStock === desiredQty) {
        deleteHolding(user.jwt, holdingData.id);

      } else if (ownedStock > desiredQty ) {
        // update the existing holding
        putHolding(user.jwt, {
          "OwnedQuantity": holdingData.OwnedQuantity - desiredQty,
          "PurchasePrice": props.values.currentPrice
        }, holdingData.id)
      }
      putPortfolio(user.jwt, user.portfolio, {
        AllocatedFunds: portfolioData.AllocatedFunds - desiredQty * props.values.currentPrice,
        AvailableFunds: portfolioData.AvailableFunds + desiredQty * props.values.currentPrice
      }).then(res => {
        portRefetch();
        console.log(res);
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

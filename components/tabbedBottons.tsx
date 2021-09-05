import React, { FC } from "react";
import styles from "@styles/market.module.scss";

interface propType {
	market: string;
	setMarket: (str: string) => void;
}


const TabbedButtons: FC<propType> = ({market, setMarket}) => {
  return (
    <>
      <a onClick={() => {setMarket("stock")}}>
        <button
          className={
            market === "stock" ? styles.selButton : styles.unselButton
          }
        >
          Stocks
        </button>
      </a>

      <a onClick={() => {setMarket("crypto")}}>
        <button
          className={
            market === "crypto" ? styles.selButton : styles.unselButton
          }
        >
          Crypto
        </button>
      </a>

      <a onClick={() => {setMarket("commodity")}}>
        <button
          className={
            market === "commodity" ? styles.selButton : styles.unselButton
          }
        >
          Commodities
        </button>
      </a>
    </>
  );
};


export default TabbedButtons;
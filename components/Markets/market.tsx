import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import Modal from "@components/modal";
import useModal from "@components/functions/useModal";
import { LoaderIcon } from "@components/icons";
import { SecurityInterface, StonksData, CryptoData, CommodityData } from "@data/stonks";
import styles from "@styles/market.module.scss";
import MarketActions from "./marketAction";

const TableRow: FC<SecurityInterface> = ({
  name,
  img,
  previousPrice,
  currentPrice,
  type
}): JSX.Element => {
  const gain = (currentPrice - previousPrice) / previousPrice;
  const color = gain < 0 ? "#ff3535" : gain === 0 ? "#888" : "#029d02";
  const { isVisible, toggleModal } = useModal();
  const isMedium = useMediaQuery({ query: "(min-width: 769px)" });
  const [secAction, setSecAction] = useState<string>("");

  function modalHandler(action:string) {
    setSecAction(action);
    toggleModal();
  }
  const modalProps = {
    name: name,
    img: img,
    previousPrice: previousPrice,
    currentPrice: currentPrice,
    type: type
  }

  return (
    <>
      <Modal showClose={true} isVisible={isVisible} toggleModal={toggleModal}>
        <MarketActions values={modalProps} action={secAction} toggleModal={toggleModal}/>
      </Modal>

      <tr tabIndex={1} >
        <td>
          {img ? (
            <Image
              src={img}
              alt={"Logo"}
              height={70}
              width={70}
              objectFit="contain"
            />
          ) : (
            <LoaderIcon />
          )}
        </td>

        <td>
          <p>{name}</p>
        </td>

        {isMedium ? (
          <>
            <td>{previousPrice}</td>
            <td>{currentPrice}</td>
            
          </>
        ) : null}

        <td>
          <div>
            {!isMedium && <p>{currentPrice}</p>}
            <div>
            <p style={{ color: `${color}` }}>{currentPrice - previousPrice}</p>
            <p style={{ color: `${color}` }}>{`(${
              gain < 0 ? "" : gain === 0 ? "" : "+"
            }${(gain * 100).toFixed(2)}%)`}</p>
            </div>
          </div>
        </td>

        <td>
          <div onClick={() => modalHandler('buy')}><button className={styles.selButton}>BUY</button></div>
          <div onClick={() => modalHandler('sell')}><button className={styles.unselButton}>SELL</button></div>
        </td>
      
      </tr>
    </>
  );
};

const MarketComponent = (): JSX.Element => {
  const [securities, setSecurities] = useState<SecurityInterface[]>([]);
  const [marketView, setMarketView] = useState<string>("stocks")
  const isMedium = useMediaQuery({ query: "(min-width: 769px)" });

  useEffect(() => {
    if (marketView === "stocks") {
      setSecurities(StonksData);
    }
    else if (marketView === "crypto") {
      setSecurities(CryptoData);
    }
    else if (marketView === "commodities") {
      setSecurities(CommodityData)
    }
    else {
      setSecurities([])
    }

  }, [marketView]);

  return (
    <section className={styles.marketCont}>
      {/* <button onClick={toggleModal}>click meh</button> */}
      <div className={styles.marketMenu}>
        <a onClick={()=>setMarketView('stocks')}><button className={marketView === "stocks" ? styles.selButton : styles.unselButton}>
          Stocks
        </button></a>
        <a onClick={()=>setMarketView('crypto')}><button className={marketView === "crypto" ? styles.selButton : styles.unselButton}>
          Crypto
        </button></a>
        <a onClick={()=>setMarketView('commodities')}><button className={marketView === "commodities" ? styles.selButton : styles.unselButton}>
          Commodities
        </button></a>
      </div>
      <table className={`${styles.marketTable}`}>
        <thead>
          <tr>
            <th colSpan={2}>STOCK</th>
            {isMedium ? (
              <>
                <th>PREVIOUS PRICE</th>
                <th>CURRENT PRICE</th>
              </>
            ) : null}
            <th>CHANGE</th>
          </tr>
        </thead>

        {securities ? (
          <tbody>
            {securities.map((data, index) => {
              return (
                <TableRow
                  key={index}
                  name={data.name}
                  img={data.img}
                  previousPrice={data.previousPrice}
                  currentPrice={data.currentPrice}
                  type={data.type}
                />
              );
            })}
          </tbody>
        ) : (
          <tbody></tbody>
        )}
      </table>
    </section>
  );
};

export default MarketComponent;

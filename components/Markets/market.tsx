import React, { FC, useState } from "react";

import Modal from "@components/modal";
import Image from "next/image";
import styles from "@styles/market.module.scss";
import Loading from "@components/loading";
import useModal from "@components/functions/useModal";
import useGetStocks from "hooks/useGetStocks";
import MarketActions from "./marketAction";
import TabbedButtons from "@components/tabbedBottons";

import { useAuth } from "@components/contexts/authContext";
import { LoaderIcon } from "@components/icons";
import { useMediaQuery } from "react-responsive";
import { SecurityInterface } from "@data/stonks";

const TableRow: FC<SecurityInterface> = ({
  name,
  img,
  previousPrice,
  currentPrice,
  type,
  id,
  ticker
}): JSX.Element => {
  const gain = (currentPrice - previousPrice) / previousPrice;
  const color = gain < 0 ? "#ff3535" : gain === 0 ? "#888" : "#029d02";
  const { isVisible, toggleModal } = useModal();
  const isMedium = useMediaQuery({ query: "(min-width: 769px)" });
  const [secAction, setSecAction] = useState<string>("");

  function modalHandler(action: string) {
    setSecAction(action);
    toggleModal();
  }
  const modalProps = {
    id: id,
    name: name,
    img: img,
    previousPrice: previousPrice,
    currentPrice: currentPrice,
    type: type,
    ticker: ticker
  };

  return (
    <>
      <Modal showClose={true} isVisible={isVisible} toggleModal={toggleModal}>
        <MarketActions
          values={modalProps}
          action={secAction}
          toggleModal={toggleModal}
        />
      </Modal>

      <tr tabIndex={1}>
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
              <p style={{ color: `${color}` }}>
                {currentPrice - previousPrice}
              </p>
              <p style={{ color: `${color}` }}>{`(${
                gain < 0 ? "" : gain === 0 ? "" : "+"
              }${(gain * 100).toFixed(2)}%)`}</p>
            </div>
          </div>
        </td>

        <td>
          <div onClick={() => modalHandler("buy")}>
            <button className={styles.selButton}>BUY</button>
          </div>
          <div onClick={() => modalHandler("sell")}>
            <button className={styles.unselButton}>SELL</button>
          </div>
        </td>
      </tr>
    </>
  );
};

const MarketComponent = (): JSX.Element => {
  const [marketView, setMarketView] = useState<string>("stock");
  const isMedium = useMediaQuery({ query: "(min-width: 769px)" });

  const { user } = useAuth();
  const { data } = useGetStocks(user.jwt);

  const clickHandler = (str: string): void => {
    setMarketView(str);
  };

  return (
    <section className={styles.marketCont}>
      <div className={styles.marketMenu}>
        <TabbedButtons market={marketView} setMarket={clickHandler} />
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

        {data ? (
          <tbody>
            {data
              .filter((item: any) => item.type === marketView)
              .map((stock: any, index: number) => {
                return (
                  <TableRow
                    id={stock.id}
                    key={index}
                    name={stock.name}
                    img={stock.img}
                    previousPrice={stock.previousPrice}
                    currentPrice={stock.currentPrice}
                    type={stock.type}
                    ticker={stock.ticker}
                  />
                );
              })}
          </tbody>
        ) : (
          <tbody>
            <Loading />
          </tbody>
        )}
      </table>
    </section>
  );
};

export default MarketComponent;

import styles from "@styles/portfolio.module.scss";
import indianNumberConverter from "@components/functions/numberConvertor";
import useModal from "@components/functions/useModal";
import Modal from "@components/modal";
import React, { useEffect, useState } from "react";
import MarketActions from "./marketAction";
import useGetStock from "hooks/useGetStock";
import { useAuth } from "@components/contexts/authContext";


const RowTable = ({ index, hold }: {
  index: number,
  hold: any,
}) => {

  const { user } = useAuth();
  const { data: stock } = useGetStock(user.jwt, hold.stock_id);
  const { isVisible, toggleModal } = useModal();

  const [modalProps, setModalProps] = useState<any>();

  const sellAction = () => {
    toggleModal();
  }

  useEffect(() => {
    if (stock) {
      // console.log(stock)
      setModalProps({
        name: stock.name,
        ticker: stock.ticker,
        id: hold.stock_id,
        previousPrice: stock.previousPrice,
        currentPrice: stock.currentPrice,
        type: stock.type,
        img: stock.img,
      });
    }
  }, [])

  return (
    <>
      <Modal showClose={true} isVisible={isVisible} toggleModal={toggleModal}>
        <MarketActions
          action={"sell"}
          toggleModal={toggleModal}
          values={modalProps}
        />
      </Modal>
      <tr key={index}>
        {/* Stocks */}
        <td>{`${stock ? stock.ticker : "-loading-"}`}</td>

        {/* Average Price */}
        <td>{`${indianNumberConverter(
          hold.average_price
        )}`}</td>

        {/* Current Price */}
        <td>{`${stock ? indianNumberConverter(
          stock.currentPrice
        ) : "-loading-"}`}</td>

        {/* Owned Quantity */}
        <td>{`${hold.total_quantity}`}</td>

        {/* Invested */}
        <td>{`${indianNumberConverter(
          hold.total_quantity * hold.average_price
        )}`}</td>

        {/* Current */}
        <td>{`${stock ? indianNumberConverter(
          hold.total_quantity * stock.currentPrice
        ) : "-loading-"}`}</td>

        {/* Profit / Loss */}
        {
          stock ?
            <td
              className={
                stock.currentPrice - hold.average_price >= 0
                  ? styles.pnlProfit
                  : styles.pnlLoss
              }
            >{`${indianNumberConverter(
              (stock.currentPrice - hold.average_price) *
              hold.total_quantity
            )}`}</td> : <td>loading</td>
        }

        {/* Sell */}
        <td>
          <button onClick={sellAction} className={styles.selButton}>
            SELL
          </button>
        </td>
      </tr>
    </>
  )

}

export default RowTable;

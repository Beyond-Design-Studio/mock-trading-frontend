import styles from "@styles/portfolio.module.scss";
import indianNumberConverter from "@components/functions/numberConvertor";
import useModal from "@components/functions/useModal";
import Modal from "@components/modal";
import React from "react";
import MarketActions from "./marketAction";


const RowTable = ({ index, hold, profits }: {
  index: number,
  hold: any,
  profits: number[],
}) => {

  const { isVisible, toggleModal } = useModal();
  const sellAction = () => {
    toggleModal();
  }

  const modalProps = {
    name: hold.security.name,
    ticker: hold.StockTicker,
    id: hold.security.id,
    previousPrice: hold.security.previousPrice,
    currentPrice: hold.security.currentPrice,
    type: hold.security.type,
    img: hold.security.img,
  }

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
        <td>{`${hold.StockTicker}`}</td>
        <td>{`${indianNumberConverter(
          hold.PurchasePrice
        )}`}</td>
        <td>{`${indianNumberConverter(
          profits[hold.StockTicker]
        )}`}</td>
        <td>{`${hold.OwnedQuantity}`}</td>

        {/* Invested */}
        <td>{`${indianNumberConverter(
          hold.PurchasePrice * hold.OwnedQuantity
        )}`}</td>

        {/* Current */}
        <td>{`${indianNumberConverter(
          hold.OwnedQuantity * profits[hold.StockTicker]
        )}`}</td>

        {/* Profit / Loss */}
        <td
          className={
            profits[hold.StockTicker] - hold.PurchasePrice >= 0
              ? styles.pnlProfit
              : styles.pnlLoss
          }
        >{`${indianNumberConverter(
          (profits[hold.StockTicker] - hold.PurchasePrice) *
          hold.OwnedQuantity
        )}`}</td>

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

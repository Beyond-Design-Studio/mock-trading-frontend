import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

import Modal from "@components/modal";
import useModal from "@components/functions/useModal";
import { LoaderIcon } from "@components/icons";
import StonksData, { StonksInterface } from "@data/stonks";
import styles from "@styles/market.module.scss";

const TableRow: FC<StonksInterface> = ({
  name,
  img,
  previousBid,
  currentBid,
}): JSX.Element => {
  const gain = (currentBid - previousBid) / previousBid;
  const color = gain < 0 ? "#ff3535" : gain === 0 ? "#888" : "#029d02";

  const { isVisible, toggleModal } = useModal();
  const isMedium = useMediaQuery({ query: "(min-width: 769px)" });

  return (
    <>
      <Modal showClose={true} isVisible={isVisible} toggleModal={toggleModal}>
        <div>
          <p>{name}</p>
          <p>{previousBid}</p>
        </div>
      </Modal>

      <tr tabIndex={1} onClick={toggleModal}>
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
            <td>{previousBid}</td>
            <td>{currentBid}</td>
          </>
        ) : null}

        <td>
          <div>
            {!isMedium && <p>{currentBid}</p>}
            <div>
            <p style={{ color: `${color}` }}>{currentBid - previousBid}</p>
            <p style={{ color: `${color}` }}>{`(${
              gain < 0 ? "" : gain === 0 ? "" : "+"
            }${(gain * 100).toFixed(2)}%)`}</p>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

const MarketComponent = (): JSX.Element => {
  const [stonks, setStonks] = useState<StonksInterface[]>([]);
  const isMedium = useMediaQuery({ query: "(min-width: 769px)" });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStonks(StonksData);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {/* <button onClick={toggleModal}>click meh</button> */}
      <table className={`${styles.marketTable}`}>
        <thead>
          <tr>
            <th colSpan={2}>MARKET</th>
            {isMedium ? (
              <>
                <th>PREVIOUS BID</th>
                <th>CURRENT BID</th>
              </>
            ) : null}
            <th>CHANGE</th>
          </tr>
        </thead>

        {stonks ? (
          <tbody>
            {stonks.map((data, index) => {
              return (
                <TableRow
                  key={index}
                  name={data.name}
                  img={data.img}
                  previousBid={data.previousBid}
                  currentBid={data.currentBid}
                />
              );
            })}
          </tbody>
        ) : (
          <tbody></tbody>
        )}
      </table>
    </>
  );
};

export default MarketComponent;

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

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

  return (
    <tr>
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

      <td>{previousBid}</td>
      <td>{currentBid}</td>

      <td>
        <div>
          <p>{currentBid - previousBid}</p>
          <p style={{ color: `${color}` }}>{`(${
            gain < 0 ? "" : gain === 0 ? "" : "+"
          }${gain.toFixed(2)})`}</p>
        </div>
      </td>
    </tr>
  );
};

const MarketComponent = (): JSX.Element => {

  const [stonks, setStonks] = useState<StonksInterface[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStonks(StonksData)
    }, 1000);
    
    return () => {
      clearTimeout(timeout);
    }
  }, [])

  return (
    <>
      <table className={`${styles.marketTable}`}>
        <thead>
          <tr>
            <th colSpan={2}>MARKET</th>
            <th>PREVIOUS BID</th>
            <th>CURRENT BID</th>
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
        ) : 
          <tbody>
          </tbody>
        }
      </table>
    </>
  );
};

export default MarketComponent;

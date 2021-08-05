import React from "react";

import MarketComponent from "./market";
import NotificationComponent from "./notification";


export const Notification = (): JSX.Element => <NotificationComponent />

export const Portfolio = (): JSX.Element => {
  return <>portfolio</>;
};

export const Market = (): JSX.Element => <MarketComponent />

export const Leader = (): JSX.Element => {
  return <>leader</>;
};

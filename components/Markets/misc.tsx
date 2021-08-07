import React from "react";

import LeaderComponent from "./lead";
import MarketComponent from "./market";
import NotificationComponent from "./notification";
import PortfolioComponent from "./portfolio";


export const Notification = (): JSX.Element => <NotificationComponent />

export const Portfolio = (): JSX.Element => <PortfolioComponent />

export const Market = (): JSX.Element => <MarketComponent />

export const Leader = (): JSX.Element => <LeaderComponent />

import { createContext, useContext, useState, ReactNode } from "react";


export interface RoundInterface {
  roundNumber: number,
  timer: number,
  max_rounds: number,
  eventStarted: boolean,
}

export interface roundContextType {
  round: RoundInterface,
  setRound: (round: RoundInterface) => void;
}

const defaultValue: roundContextType = {
  round: {
    roundNumber: 0,
    timer: 90,
    max_rounds: 20,
    eventStarted: false,
  },
  setRound: (round: RoundInterface) => {
    console.log(round)
  }
}

const RoundContext = createContext<roundContextType>(defaultValue);

export function useRound(): roundContextType {
  return useContext(RoundContext);
}

export const RoundProvider = ({ children }: { children: ReactNode }): any => {

  const [round, setround] = useState<RoundInterface>({ roundNumber: 0, timer: 90, max_rounds: 20, eventStarted: false });
  const setRound = (round: RoundInterface) => {
    setround(round);
  }

  const value = {
    round,
    setRound,
  }

  return (
    <RoundContext.Provider value={value}>
      {children}
    </RoundContext.Provider>
  );
}

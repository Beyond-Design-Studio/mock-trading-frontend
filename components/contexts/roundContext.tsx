import { createContext, useContext, useState, ReactNode } from "react";

export interface RoundInterface {
  roundNumber: number,
}

export interface roundContextType {
  round: RoundInterface,
  setRound: (roundInterface: any) => void;
}

const defaultValue: roundContextType = {
  round: {
    roundNumber: 0,
  },
  setRound: (roundInterface: any) => {console.log(roundInterface)}
}

const RoundContext = createContext<roundContextType>(defaultValue);

export function useRound(): roundContextType {
  return useContext(RoundContext);
}

export const RoundProvider = ({ children }: { children: ReactNode }): any => {

  const [round, setround] = useState<RoundInterface>({ roundNumber: 0 });
  const setRound = (round: RoundInterface) => {
    setround(round);
  }

  const value = {
    round,
    setRound
  }

  return (
    <RoundContext.Provider value={value}>
      {children}
    </RoundContext.Provider>
  );
}

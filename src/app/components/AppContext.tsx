"use client"
import React, { createContext, useContext } from "react";
import { Usuario, Desafio } from "../interfaces/interfaces";

interface AppContextType {
  userData: Usuario | null;
  desafio: Desafio[] | null;
}

const AppContext = createContext<AppContextType>({
  userData: null,
  desafio: null,
});


export const useAppContext = () => useContext(AppContext);


export const AppProvider = ({children,value,}: {children: React.ReactNode;value: AppContextType;}) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

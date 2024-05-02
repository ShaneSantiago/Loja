import React, { createContext, useContext, useEffect, useState } from "react";
import propTypes from "prop-types";

const Results = createContext<any>(null);

export function useResults() {
  return useContext(Results);
}

export function ResultsProvider({ children }: any) {
  const [carrinho, setCarrinho] = useState([]);

  return (
    <Results.Provider
      value={{
        carrinho,
        setCarrinho,
      }}
    >
      {children}
    </Results.Provider>
  );
}
ResultsProvider.propTypes = {
  children: propTypes.node.isRequired,
};

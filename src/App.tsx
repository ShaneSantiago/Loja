import React from "react";
import Home from "./Page/Home/Home";
import { ResultsProvider } from "./Components/Context/GlobalContext";
import "./global.css";

function App() {
  return (
    <div>
      <ResultsProvider>
        <Home />
      </ResultsProvider>
    </div>
  );
}

export default App;

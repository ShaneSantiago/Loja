import React from "react";
import Home from "./Page/Home/Home";
import { ResultsProvider } from "./Components/Context/GlobalContext";
import "./global.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ResultsProvider>
        <Home />
        <ToastContainer />
      </ResultsProvider>
    </div>
  );
}

export default App;

import React from "react";
import { DataProvider } from "./GlobalState";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/headers/Header";
import MainPages from "./components/mainpages/Pages";

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;

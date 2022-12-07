import React from "react";
import { DataProvider } from "./GlobalState";
import Header from "./components/headers/Header";
import MainPages from "./components/mainpages/Pages";

const App = () => {
  return (
    <DataProvider>
      <div className="App">
        <Header />
        <MainPages />
      </div>
    </DataProvider>
  );
};

export default App;

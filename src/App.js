import React from "react";
import { Header } from "./components/Header";
import MainPage from "./pages/MainPage";
import Store from "./Store";

export const App = (props) =>
  <Store>
    <div className="App" >
      <Header />
      <MainPage />
    </div>
  </Store>

import React, { Component } from "react";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";


import Store from "./Store";

class App extends Component {

  render() {

    return (
      <Store>
        <div className="App" >
          <Header />
 <MainPage />
        </div>
      </Store>
    )
  }
}

export default App;

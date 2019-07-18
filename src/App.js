import React, { Component } from "react";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";


import Store from "./Store";
import { Fade } from "./animations/Fade";

class App extends Component {
  state = {
    mounted: false
  }
  componentDidMount = () => { this.setState({ mounted: true }) }
  render() {

    return (
      <Store>
        <div></div>

        <div className="App" >
          <Header />
          <MainPage />
        </div>

      </Store>
    )
  }
}

export default App;

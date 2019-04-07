import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import { Main } from './components/Main'
import { FirebaseContext } from './firebase';
import { GoldenRatio } from "./components/GoldenRatio";

class App extends Component {

  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          return <div className="App" >
            <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet" />
            <Header firebase={firebase} />
            <div style={{ height: '-webkit-fill-available;' }}>
              <Main />
            </div>
          </div>
        }}
      </FirebaseContext.Consumer>
    );
  }
}

export default App;

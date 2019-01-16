import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import { Main } from './components/Main'

import { FirebaseContext } from './firebase';



class App extends Component {

  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          return <div className="App">
         <link href="https://fonts.googleapis.com/css?family=Lora|Nanum+Gothic" rel="stylesheet"/>
              <Header firebase={firebase} />
              <Main />
          </div>
        }}
      </FirebaseContext.Consumer>
    );
  }
}

export default App;

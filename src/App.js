import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import HSL from "./pages/color-generation/HSL/HSL";
import Login from './components/account/Login'
import firebase from 'firebase/app';
import { Main } from './components/Main'

import { FirebaseContext } from './firebase';



class App extends Component {

  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          return <div className="App">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
            <Header firebase={firebase} />
            <Main />
          </div>
        }}
      </FirebaseContext.Consumer>
    );
  }
}

export default App;

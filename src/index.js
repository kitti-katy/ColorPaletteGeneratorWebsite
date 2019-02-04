import React from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.css'; 
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./redux/index";
import { BrowserRouter } from "react-router-dom";


import Firebase, { FirebaseContext } from './firebase';

const store = createStore(rootReducer);

ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </BrowserRouter>
  </Provider >
  ,
  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Palette} from './Components/Palette'
import Color from './Components/Color';
import Styledux from "./Styledux/src/Styledux"
import sxProvider from "./Styledux/src/sxProvider"
import {CustomColorContainer} from "./Components/CustomColorContainer"

class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="App">

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Yekaterina's Color Palette Playground</h1>
                </header>
                <CustomColorContainer/>
            </div>
        );
    }
}



const store = {state:{baseColor: new Color(100,100,100,0)}}
const activators = {}
let styledux = new Styledux(store, activators)
window.sx  = styledux.store

export default sxProvider(styledux)(App)



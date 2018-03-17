import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import StyleduxProvider, { createStyleduxProvider, Styledux, } from "./Styledux/src/Styledux"

ReactDOM.render(


    <App />


    , document.getElementById('root'));
registerServiceWorker();

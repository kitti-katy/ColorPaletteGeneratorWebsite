import React, { Suspense, lazy } from "react";
import { Header } from "./components/Header";
import Store from "./Store";
import StoreColorMixer from "./StoreColorMixer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
const Landing = lazy(() => import("./pages/LandingPage"));
const Main = lazy(() => import("./pages/MainPage"));
const About = lazy(() => import("./pages/Articles"));
const ColorMixer = lazy(() => import("./pages/ColorMixerPage"));
export const App = (props) => (
  <Store>
      <Router>
        <div className="App">
          
          <Header />
          <Suspense fallback={<CircularProgress style={{margin:'auto'}}/>}>
            <Switch>
            <Route exact path="/" component={Landing} />
              <Route exact path="/create" component={Main} />
              <Route path="/about" component={Main} />
              <StoreColorMixer>
              <Route path="/mix" component={ColorMixer} />
              </StoreColorMixer>
            </Switch>
          </Suspense>
        </div>
      </Router>
  </Store>
);

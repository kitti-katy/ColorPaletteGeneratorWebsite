import React, { Component } from "react";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { switchLayout } from './redux/LayoutReducer'
import MainPage2 from "./pages/MainPage2";
import Store from "./Store";

let mapDispatchToProps = (dispatch) => { return bindActionCreators({ switchLayout: switchLayout }, dispatch) }

let mapStateToProps = (state) => {
  return {
    layout: state.LayoutReducer.layout
  }
}

class App extends Component {

  componentDidMount = () => {
    let switchLayout = this.props.switchLayout
    document.addEventListener("keydown", function (zEvent) {
      if (zEvent.ctrlKey) {  // case sensitive
        // DO YOUR STUFF HERE
        switchLayout()
      }
    });
  }
  render() {
    let layout = this.props.layout
    return (
      <Store>
        <div className="App" >
          <Header />
          {layout == '1' ? <MainPage /> : <MainPage2 />}
        </div>
      </Store>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import HSLBasicContainer from "./components/HSLBasic/HSLBasicContainer";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
  return {
    isAdvanced: state.HSLModeReducer.isAdvanced
  }
}
class HSL extends Component {
  state = {
    isAdvanced: false
  }
  handleSelectMode = (bool) => { this.setState({ isAdvanced: bool }) }
  render() {
    return (<HSLBasicContainer />);
  }
}

export default connect(mapStateToProps)(HSL);


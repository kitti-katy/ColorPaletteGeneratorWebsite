import React, { Component } from "react";
import { withRouter } from 'react-router-dom'

class Header extends Component {
  state = {
    newPaletteAnchor: null,
    loginAnchor: null,
    signUpAnchor: null
  };
  handleClickPalette = event => this.setState({ newPaletteAnchor: event.currentTarget });
  handleClosePalette = () => this.setState({ newPaletteAnchor: null });
  navigateTo = (link) => this.props.history.push(link);
  render() {

    return (
      <div className='header'>
        <h2>PALETTE</h2>
      </div>

    );
  }
}

export default withRouter(Header);

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
      <div style={{ padding: '16px 12px 16px 24px' }}>
        <h2 style={{ margin: '0', color: 'rgb(33, 33, 33)', fontWeight: '600' }}>Awesome Color Palette Generator</h2>
      </div>

    );
  }
}

export default withRouter(Header);

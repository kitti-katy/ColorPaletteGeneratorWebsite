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
      <div style={{ padding: '12px 12px 12px 24px', background: 'rgb(218, 223, 231)' }}>
        <h2 style={{ margin: '0', color: 'rgb(36, 44, 56)', fontWeight: '700' }}>Awesome Color Palette Generator</h2>
      </div>

    );
  }
}

export default withRouter(Header);

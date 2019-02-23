import React, { Component } from "react";
import { Button, Navbar, Alignment } from "@blueprintjs/core";
import {  withRouter } from 'react-router-dom'

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
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Awesome Color Palette Generator</Navbar.Heading>
            <Navbar.Divider />
            <Button className="bp3-minimal" icon="build" text="Generate Palette Style" onClick={() => this.navigateTo('/generate/hsl')}  />
            <Button className="bp3-minimal" icon="media" text="From Image" onClick={() => this.navigateTo('/generate/picture')}  />
            <Button className="bp3-minimal" icon="drag-handle-horizontal" text="Custom" onClick={() => this.navigateTo('/generate/custom')}  />
        </Navbar.Group>
      </Navbar>
    );
  }
}

export default withRouter(Header);

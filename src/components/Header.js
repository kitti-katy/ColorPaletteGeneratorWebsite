import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
      <AppBar position="static" className="header">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Menu" id="menu-button">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ color: 'white' }}>
            Palette Generator
        </Typography>
        </Toolbar>
      </AppBar>


    );
  }
}

export default withRouter(Header);

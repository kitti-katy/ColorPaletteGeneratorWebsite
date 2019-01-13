import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Login from "./account/Login"
import Register from "./account/Register"
import { Link } from 'react-router-dom'

class Header extends Component {
  state = {
    newPaletteAnchor: null,
    loginAnchor: null,
    signUpAnchor: null
  };
  handleClickPalette = event => this.setState({ newPaletteAnchor: event.currentTarget });
  handleClosePalette = () => this.setState({ newPaletteAnchor: null });



  render() {
    const { newPaletteAnchor, loginAnchor } = this.state;

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit"> Awesome CPG </Typography>
           {/* <div>
              <Button aria-owns={newPaletteAnchor ? "simple-menu" : null} aria-haspopup="true" onClick={this.handleClickPalette}> New Palette</Button>
              <Menu id="new-palette" anchorEl={newPaletteAnchor} open={Boolean(newPaletteAnchor)} onClose={this.handleClosePalette} >
                <MenuItem onClick={this.handleClosePalette} component={Link} to='/generate/hsl'>From HSL</MenuItem>
                <MenuItem onClick={this.handleClosePalette} component={Link} to='/generate/custom'>Custom</MenuItem>
                <MenuItem onClick={this.handleClosePalette} component={Link} to='/generate/picture'>From Picture</MenuItem>
              </Menu>
           </div>*/}
            <Button component={Link} to='/generate/hsl'>From HSL</Button>
            <Button component={Link} to='/generate/custom'>Custom</Button>
            <Button component={Link} to='/generate/picture'>From Picture</Button>
            <Button component={Link} to='/community'>Community</Button>
            <Login />
            <Register firebase={this.props.firebase} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;

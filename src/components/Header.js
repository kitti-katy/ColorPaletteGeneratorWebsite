import React, { Component } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Login from "./account/Login"
import Register from "./account/Register"
import { Link } from 'react-router-dom'
import { Icon, Button } from 'antd';



class Header extends Component {
  state = {
    newPaletteAnchor: null,
    loginAnchor: null,
    signUpAnchor: null
  };
  handleClickPalette = event => this.setState({ newPaletteAnchor: event.currentTarget });
  handleClosePalette = () => this.setState({ newPaletteAnchor: null });



  render() {

    return (
      <div style={{ padding: '24px', display: 'flex', justifyContent: 'left' }}>
        <Link to='/generate/hsl' className="header-button"> <Icon type="setting" theme="filled" /> Generate Palette Style {/*<Icon type="build" />*/} </Link>
        <Link to='/generate/custom' className="header-button"> <Icon type="edit" theme="filled" /> Custom </Link>
        <Link to='/generate/picture' className="header-button"> <Icon type="picture" theme="filled" /> From Picture {/*<Icon type="picture" /> */} </Link>
        {/*<Button component={Link} to='/community'>Community</Button>
            }
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

        {/*<Button component={Link} to='/generate/hsl'>From HSL</Button>
            <Button component={Link} to='/generate/custom'>Custom</Button>
            <Button component={Link} to='/generate/picture'>From Picture</Button>
            <Button component={Link} to='/community'>Community</Button>
            <Login />
            <Register firebase={this.props.firebase} />
          </Toolbar>
        </AppBar>*/}
      </div>
    );
  }
}

export default Header;

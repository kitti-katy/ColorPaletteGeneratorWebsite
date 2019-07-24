import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuList from "../sections/menu/MenuList";

export const Header =(props) =>  
      <AppBar position="static" className="header">
        <Toolbar>
          <MenuList />
          <Typography variant="h6" style={{ color: 'white' }}>
            Palette Generator
          </Typography>
        </Toolbar>
      </AppBar>


import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuList from "../sections/menu/MenuList";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

export const Header = (props) => (
  <AppBar position="static" className="header">
    <Toolbar>
      <MenuList />
      <Link to="/">
        <Typography variant="h6" style={{ color: "white" }}>
          Color Scheme Generator
        </Typography>
      </Link>
      <div style={{flexGrow: 1}}/>

      <Button color="inherit" style={{ color: "#ededed" }}  href='/mix'>Color Mixer</Button>
      <Button color="inherit" style={{ color: "#ededed" }}  href='/create'>Create Palette</Button>
    {/*
      <Button color="inherit" style={{ color: "#ededed" }} href='/create'>Color Techniques</Button>
    */}


      

    </Toolbar>
  </AppBar>
);

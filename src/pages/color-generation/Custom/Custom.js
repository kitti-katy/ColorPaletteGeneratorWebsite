import React, { Component } from 'react';
import ColorPicker from "../../../components/color-picker/ColorPicker";
import GeneratedColors from "./components/GeneratedColors";
import TryIt from "../../../components/TryIt";
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';

class Custom extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <CardContent>
            <ColorPicker />
            <GeneratedColors />
          </CardContent>
        </Grid>
        <Grid item xs={9}>
          <CardContent>
            <TryIt />
          </CardContent>
        </Grid>
      </Grid >
    );
  }
}

export default Custom;

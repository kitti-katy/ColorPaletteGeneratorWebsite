import React, { Component } from 'react';
import ColorPicker from "../../../components/color-picker/ColorPicker";
import HSLFilters from "./components/HSLFilters";
import TryIt from "../../../components/TryIt";
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';

class HSL extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <CardContent>
            <h2  style={{ textAlign: 'left' }} >Pick Color:</h2>
            <ColorPicker />
            <HSLFilters />
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

export default HSL;

import React, { Component } from 'react';
import ColorPicker from "../../../components/color-picker/ColorPicker";
import HSLFilters from "../HSL/components/HSLFilters";
import TryIt from "../../../components/TryIt";
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import PictureUpload from './components/PictureUpload';

class Picture extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <CardContent>
            <PictureUpload/>
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

export default Picture;

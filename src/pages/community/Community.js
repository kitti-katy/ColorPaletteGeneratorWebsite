import React, { Component } from 'react';
import ColorPicker from "../../components/color-picker/ColorPicker";
import HSLFilters from "../color-generation/HSL/components/HSLFilters";
import TryIt from "../../components/TryIt/TryIt";
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
class Community extends Component {
  state = {
    palettes: [1,1,1,1,1,1,1,1,1,1,1,1]
  }
  render() {
    return (
      <Grid container spacing={24} style={{marginTop:'24px'}}>
      {this.state.palettes.map(p=> ( <Grid item xs={3}> <Card style = {{padding:'50px'}}>A</Card> </Grid>) )}
      </Grid >
    );
  }
}

export default Community;

import React from "react";
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

export const Checkbox_ = (props) =>
    <Typography variant="subtitle2" gutterBottom className="slider-label" style={props.style}>
        <Checkbox
            checked={props.checked}
            onChange={props.onChange}
        />
        {props.label} <span style={{ float: 'right' }}>{props.value}</span>
        
    </Typography>
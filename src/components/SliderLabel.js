import React from "react";
import Typography from '@material-ui/core/Typography';

export const SliderLabel = (props) =>
    <Typography variant="subtitle2" gutterBottom className="slider-label">
        {props.label} <span style={{ float: 'right' }}>{props.value}</span>
    </Typography>
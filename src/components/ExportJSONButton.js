import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export const ExportJSONButton = (props) => (
    <FormControl style={{ minWidth: 150 }}>
        <InputLabel>Export Palette</InputLabel>
        <Select onChange={props.onClick} value={'JSON'}>
            <MenuItem value={'JSON'}>JSON</MenuItem>)}
        </Select>
    </FormControl>
)

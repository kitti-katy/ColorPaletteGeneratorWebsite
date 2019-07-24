import React, { useContext } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { blindnessNames } from "../../utilities/BlindConversion";
import { StoreContext } from '../../Store';

export default function SelectBlindness(props) {
    const [state, dispatch] = useContext(StoreContext)
    const { blindness } = state
    const handleChange = event => dispatch({ name: 'blindness', value: event.target.value }) 

    return (
        <FormControl style={{ minWidth: 150 }}>
            <InputLabel>Color Blindness</InputLabel>
            <Select
                value={blindness}
                onChange={handleChange}
            >
                {blindnessNames.map(name => <MenuItem value={name} key={name}>{name}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

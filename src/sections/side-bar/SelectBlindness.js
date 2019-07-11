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
    const setBlindness = (v) => dispatch({ type: 'setBlindness', payload: v })

    const handleChange = event => setBlindness(event.target.value)

    return (
        <FormControl style={{ minWidth: 150 }}>
            <InputLabel htmlFor="age-simple">Color Blindness</InputLabel>
            <Select
                value={blindness}
                onChange={handleChange}
            >
                {blindnessNames.map(name => <MenuItem value={name} key={name}>{name}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

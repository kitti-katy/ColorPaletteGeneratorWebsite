import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setBlindness } from '../../redux/ColorBlindnessReducer'
import { blindnessNames } from "../../utilities/BlindConversion";

let mapStateToProps = (state) => {
    return {
        blindness: state.ColorBlindnessReducer.blindness
    }
}
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ setBlindness: setBlindness }, dispatch) }


class SelectBlindness extends React.Component {

    handleChange = event =>
        this.props.setBlindness(event.target.value)

    render() {

        return (
            <FormControl style={{ minWidth: 150 }}>
                <InputLabel htmlFor="age-simple">Color Blindness</InputLabel>
                <Select
                    value={this.props.blindness}
                    onChange={this.handleChange}
                >
                    {blindnessNames.map(name => <MenuItem value={name} key={name}>{name}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectBlindness);
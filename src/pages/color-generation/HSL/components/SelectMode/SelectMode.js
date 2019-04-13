import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeHSLMode } from '../../../../../redux/HSLModeReducer'
import StarIcon from '@material-ui/icons/Star'
import PaletteIcon from '@material-ui/icons/Palette'
import BrushIcon from '@material-ui/icons/Brush'
import ImageIcon from '@material-ui/icons/Image'
import './SelectMode.scss'

const iconStyle = { verticalAlign: 'sub', marginRight: '4px' }

let mapStateToProps = (state) => {
    return {
        isAdvanced: state.HSLModeReducer.isAdvanced
    }
}
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ changeHSLMode: changeHSLMode }, dispatch) }

class SelectMode extends Component {
    navigateTo = (link) => this.props.history.push(link);
    render() {
        return (
            <div className="select-mode-table">
                <div onClick={() => this.navigateTo('/generate/hsl')} ><div><PaletteIcon style={iconStyle} fontSize="small" /> BASIC</div> </div>
                <div onClick={() => this.navigateTo('/generate/hsl')} ><div><BrushIcon style={iconStyle} fontSize="small" /> ADVANCED </div></div>
                <div onClick={() => this.navigateTo('/generate/custom')}><div><StarIcon style={iconStyle} fontSize="small" /> CUSTOM </div></div>
                <div onClick={() => this.navigateTo('/generate/picture')}><div><ImageIcon style={iconStyle} fontSize="small" /> FROM PICTURE </div></div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectMode);


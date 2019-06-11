import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeHSLMode } from '../../../redux/HSLModeReducer'
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
    getRoute = (link, icon, text) => {
        let currentLocation = ''
        if (this.props.history)
            currentLocation = this.props.history.location.pathname
        return <div className={currentLocation == link ? 'selected-mode' : ''} onClick={() => this.navigateTo(link)} ><div> {icon} {text} </div></div>
    }
    render() {

        return (
            <div className="select-mode-table">
                {this.getRoute('/hsl-basic', <PaletteIcon style={iconStyle} fontSize="small" />, 'BASIC')}
                {this.getRoute('/hsl-advanced', <BrushIcon style={iconStyle} fontSize="small" />, 'ADVANCED')}
                {/*this.getRoute('/custom', <StarIcon style={iconStyle} fontSize="small" />, 'CUSTOM')*/}
                {this.getRoute('/picture', <ImageIcon style={iconStyle} fontSize="small" />, 'FROM IMAGE')}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectMode);


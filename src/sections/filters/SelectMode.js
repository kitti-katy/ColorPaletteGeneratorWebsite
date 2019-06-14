import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeFilter } from '../../redux/FilterModeReducer'
import StarIcon from '@material-ui/icons/Star'
import PaletteIcon from '@material-ui/icons/Palette'
import BrushIcon from '@material-ui/icons/Brush'
import ImageIcon from '@material-ui/icons/Image'

const iconStyle = { verticalAlign: 'sub', marginRight: '4px' }

let mapStateToProps = (state) => {
    return {
        filterMode: state.FilterModeReducer.filterMode
    }
}
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ changeFilter:changeFilter }, dispatch) }

class SelectMode extends Component {
    getTab = (mode, icon, text) =>  <div className={this.props.filterMode == mode ? 'selected-mode' : ''} onClick={() => this.props.changeFilter(mode)} ><div> {icon} {text} </div></div>
    
    render() {

        return (
            <div className="select-mode-table">
                {this.getTab('BASIC', <PaletteIcon style={iconStyle} fontSize="small" />, 'BASIC')}
                {this.getTab('ADVANCED', <BrushIcon style={iconStyle} fontSize="small" />, 'ADVANCED')}
                {/*this.getRoute('/custom', <StarIcon style={iconStyle} fontSize="small" />, 'CUSTOM')*/}
                {this.getTab('FROM_IMAGE', <ImageIcon style={iconStyle} fontSize="small" />, 'FROM IMAGE')}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectMode);


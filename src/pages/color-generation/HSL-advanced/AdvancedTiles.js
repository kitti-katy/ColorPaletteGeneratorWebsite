import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import HSLPaletteGenerator from "../../../utilities/HSLPaletteGenerator";
import { convertToBlind } from "../../../utilities/BlindConversion";
import { selectColor } from '../../../redux/SelectedColorReducer'

let mapStateToProps = (state) => {
    return {
        baseColor: state.BaseColorReducer.baseColor,
        selected: state.SelectedColorReducer.selected,

        hueChange: state.HSLAdvancedReducer.hueChange,
        satChange: state.HSLAdvancedReducer.satChange,
        lightChange: state.HSLAdvancedReducer.lightChange,
        hueStep: state.HSLAdvancedReducer.hueStep,
        satStep: state.HSLAdvancedReducer.satStep,
        lightStep: state.HSLAdvancedReducer.lightStep,
        numberOfColors: state.HSLAdvancedReducer.numberOfColors,
        blindness: state.ColorBlindnessReducer.blindness
    }
}
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ selectColor: selectColor }, dispatch) }

class AdvancedTiles extends Component {
    state = {
        selectedKey: ''
    };
    
    handleSelectColor = (hexValue, selectedKey) => {
        this.setState({ selectedKey })
        this.props.selectColor(hexValue)
    }

    render() {
        const { hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors } = this.props
        let palette = new HSLPaletteGenerator(this.props.baseColor, hueChange, satChange, lightChange, hueStep, satStep, lightStep, numberOfColors).palette

        return (
            <div style={{ display: 'table', alignItems: 'center', height: '100%', width: '100%' }}>
                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}} >

                        {palette.map((color, index) => {
                            let hex = color.HEXString
                            let blindedColor = convertToBlind(color, this.props.blindness)
                            let colorKey = index + hex
                            let isSelected = this.state.selectedKey == colorKey
                            return <div key={colorKey} id={hex}
                                className={"single-tile-basic " + (isSelected ? 'selected-tile' : '')}
                                style={{
                                    background: blindedColor, padding: '5%', width: '10%', height: '10%',
                                    border: 'none'
                                }}
                                onClick={() => this.handleSelectColor(hex, colorKey)} />
                        }
                        )}
                    </div>
                </div>
            </div >

        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdvancedTiles);



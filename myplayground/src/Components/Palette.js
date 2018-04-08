/**
 * Created by kate on 3/3/18.
 */
import React, {Component} from 'react';
import PalettePiece from './PalettePiece';
import * as _ from 'lodash'
import CircledPalettePiece from "./CircledPalettePiece";
import TryItPage from "./TryItPage";
import {ColorPickerCanvas} from "./ColorPickerCanvas";
import Color from './Color';
import sxConnect from "../Styledux/src/sxConnect"

class PaletteClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colorNumber: 4,
            hue: 40,
            sat: 0,
            light: 20,
            angle: 45,
            header: '',
            text: '',
            button: '',
            buttonText: '',
            colors: []
        },


        this.handleHueChange = this.handleHueChange.bind(this)
        this.handleSatChange = this.handleSatChange.bind(this)
        this.handleLightChange = this.handleLightChange.bind(this)
        this.getNextColor = this.getNextColor.bind(this)

    }

    handleHueChange(event) {
        this.setState({hue: event.target.value})
    }

    handleSatChange(event) {
        this.setState({sat: event.target.value})
    }

    handleLightChange(event) {
        this.setState({light: event.target.value})
    }


    setColorNumber(event) {
        this.setState({colorNumber: event.target.value})
    }

    getNextColor(i){
        let color = new Color(this.props.state.baseColor ,
            {   hueChange: this.state.hue * (i) - 360 * (Math.floor( this.state.hue * i / 360)),
                satChange : this.state.sat * (i) - 100 * (Math.floor(this.state.sat * i  / 100)),
                lightChange : this.state.light * (i) - 100 * (Math.floor(this.state.light * i / 100))}
            , 0, 3)

        return color
    }




    render() {
        return (
            <div style={paletteStyle.container}>
                <ColorPickerCanvas/>

                <TryItPage header = {this.state.header} text = {this.state.text}
                           button = {this.state.button} buttonText = {this.state.buttonText}/>
                <div style={paletteStyle.inputsContainer}>

                    <div style={paletteStyle.labelAndInput}>
                        <div>Colors Number:</div>
                        <input style={paletteStyle.textField} type='text' maxLength='3'
                               value={this.state.colorNumber} onChange={(event) => this.setColorNumber(event)}/>
                    </div>
                    <input type="range"
                           onChange={(event) => this.setColorNumber(event)} min="0" max="100"
                           value={this.state.colorNumber}/>

                    <div style={paletteStyle.labelAndInput}>
                        <div>Hue Change:</div>
                        <input style={paletteStyle.textField} type='text' maxLength='3'
                               value={this.state.hue} onChange={(event) => this.handleHueChange(event)}/>
                    </div>
                    <input type="range"
                           onChange={(event) => this.handleHueChange(event)} min="0" max="359" value={this.state.hue}/>


                    <div style={paletteStyle.labelAndInput}>
                        <div>Saturation Change:</div>
                        <input style={paletteStyle.textField} type='text' maxLength='3'
                               value={this.state.sat} onChange={(event) => this.handleSatChange(event)}/>
                    </div>
                    <input type="range"
                           onChange={(event) => this.handleSatChange(event)} min="0" max="100" value={this.state.sat}/>


                    <div style={paletteStyle.labelAndInput}>
                        <div>Light Change:</div>
                        <input style={paletteStyle.textField} type='text' maxLength='3'
                               value={this.state.light} onChange={(event) => this.handleLightChange(event)}/>
                    </div>
                    <input type="range"
                           onChange={(event) => this.handleLightChange(event)} min="0" max="100"
                           value={this.state.light}/>


                </div>




                <div style={paletteStyle.paletteLine}>
                    {
                        _.range(this.state.colorNumber).map(i =>
                            <PalettePiece
                                color={this.getNextColor(i)}/>)
                    }
                </div>



                <div style={paletteStyle.paletteLine}>
                    <svg height="600" width="600">
                        {
                            _.range(this.state.colorNumber).map(i =>
                                <CircledPalettePiece numberOfColor={i}
                                                     angle={360 / this.state.colorNumber}
                                                     color={this.getNextColor(i)}
                                                     />)
                                                     }
                            </svg>
                            </div>

                            </div>
                            );
                        }
                        }

                        const paletteStyle = {
                        paletteLine: {
                        height: '100px',
                        width: '60%',
                        display: 'inline-flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    },
                        container: {
                        margin: 'auto',
                        width: '100%'
                    },

                        inputsContainer: {
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '200px'
                    },

                        textField:{
                        width: '30px',
                        padding: '1px'
                    },
                        labelAndInput:{
                        display: 'flex',
                        margin: '5px',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }


                    }

export const Palette = sxConnect(null, ['state.baseColor'])(PaletteClass);
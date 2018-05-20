/**
 * Created by kate on 3/10/18.
 */
import React, {Component} from 'react';
import Color from './Color';
import sxConnect from "../Styledux/src/sxConnect"
import _ from 'lodash'


class ColorPickerCanvasClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseDownPicker : false,
            mouseDownSaturation: false,
            pickerCirclePositionX:0,
            pickerCirclePositionY:0

        }

        // Picker
        this.generatePickerCanvas = this.generatePickerCanvas.bind(this)
        this.mouseMovePicker = this.mouseMovePicker.bind(this)
        this.resetMouseDownPicker = this.resetMouseDownPicker.bind(this)

        //Saturation
        this.generateSaturationCanvas = this.generateSaturationCanvas.bind(this)
        this.mouseMoveSaturation = this.mouseMoveSaturation.bind(this)
        this.resetMouseDownSaturation = this.resetMouseDownSaturation.bind(this)

        // HSL changers

        // RGB changers

        //this._throttledMouseMove = _.throttle(this.mouseMovePicker.bind(this), 50)
        //this._throttledMouseMove = _.throttle(this.getColor.bind(this), 50)

    }

    /*throttledMouse = (e) => {
        this._throttledMouseMove(e)
    }
    */
    generatePickerCanvas(color){
        let sat = color.hsl.sat
        let canvas = document.getElementById('canvasColorPicker')
        let ctx = canvas.getContext("2d");
        let imageData = ctx.getImageData(0, 0, 360, 202);
        for(let i=0; i<360; i+=1){
        for(let j=0; j<202; j+=2){
            ctx.fillStyle = 'hsl(' + i  + ', ' + sat + '%, ' + j/2 + '%)'
            ctx.fillRect(i, j, i, j+2);
        }
        }
    }

    generateSaturationCanvas(color){
        let canvas = document.getElementById('canvasSaturationPicker')
        let ctx = canvas.getContext("2d");
        let imageData = ctx.getImageData(0, 0, 20, 202);
            for(let j=0; j<202; j+=2){
                for(let i=0; i<20; i+=1){
                    //no idea why without 360 it will show a wrong color but for others it works without 360
                ctx.fillStyle = 'hsl(' + (360-color.hsl.hue) + ', ' + j/2 + '%, ' + color.hsl.light + '%)'
                ctx.fillRect(i, j, i, j+2);
            }
        }
    }


    componentDidMount() {
        this.props.state.setSlice('pickerPositionX', 5 )
        this.props.state.setSlice('pickerPositionY', 5 )
      this.generatePickerCanvas(this.props.state.baseColor)
        this.generateSaturationCanvas(this.props.state.baseColor)
    }

    mouseMovePicker(evt){
        if(this.state.mouseDownPicker) {
            this.getColor(evt)
            console.log(evt.clientX)

        }
    }

    mouseMoveSaturation(evt){
        if(this.state.mouseDownSaturation)
            this.changeSaturation(evt)
    }


    resetMouseDownPicker(){
        this.setState({mouseDownPicker:false})
    }

    resetMouseDownSaturation(){
        this.setState({mouseDownSaturation:false})
    }

    getColor(evt){


        this.setState({mouseDownPicker:true})
        let canvas = document.getElementById('canvasColorPicker')
        let rect = canvas.getBoundingClientRect()
        let x = evt.clientX - rect.left
        let y = evt.clientY - rect.top
        this.props.state.setSlice('pickerPositionX', x-5  )
        this.props.state.setSlice('pickerPositionY', y-5 )
        let ctx = canvas.getContext("2d");
        let imageData = ctx.getImageData(360-x, y, 1, 1).data;
        let newColor = new Color( imageData[0],  imageData[1],  imageData[2],0)
        this.props.state.setSlice('baseColor', newColor )
        this.generateSaturationCanvas(newColor)
        }

    changeSaturation(evt){
        this.setState({mouseDownSaturation:true})
        let canvas = document.getElementById('canvasSaturationPicker')
        let rect = canvas.getBoundingClientRect()
        let x = evt.clientX - rect.left
        let y = evt.clientY - rect.top
        let ctx = canvas.getContext("2d");
        let imageData = ctx.getImageData(x, y, 1, 1).data;
        let color = this.props.state.baseColor
        let hue = color.hsl.hue
        let light = color.hsl.light
        let newColor = new Color( imageData[0],  imageData[1],  imageData[2],0)
        //did not work just without sat
        let sat = newColor.hsl.sat
        let newColor2 = new Color( hue,  sat,  light,1)
        this.props.state.setSlice('baseColor', newColor2 )
        this.generatePickerCanvas(this.props.state.baseColor)

    }




render(){
        return (
            <div>

            <svg width="15" height="15" style={{...pickerStyle.PickerCircle,
        marginLeft: this.props.state.pickerPositionX, marginTop:this.props.state.pickerPositionY }}>
        <circle cx='7.5' cy='7.5' r="7.5" stroke="green" stroke-width="1" fill="yellow" />
        </svg>

            <canvas id = 'canvasColorPicker' width = '360' height = '200'
                    onMouseMove= {(e)=>this.mouseMovePicker(e)}//{this.throttledMouse}
                    onMouseDown = {(e)=> this.getColor(e)}
                    onMouseUp={this.resetMouseDownPicker}></canvas>

            <canvas id = 'canvasSaturationPicker' width = '20' height = '200'
    onMouseMove={(e) => this.mouseMoveSaturation(e)}
    onMouseDown = {(e)=>this.changeSaturation(e)}
    onMouseUp={this.resetMouseDownSaturation}></canvas>
            </div>
        );
    }
}

const pickerStyle = {
    PickerCircle: {
        position: 'absolute', zIndex: 4000
}}

export const ColorPickerCanvas = sxConnect(null, ['state.baseColor', 'state.pickerPositionX', 'state.pickerPositionY'])(ColorPickerCanvasClass);
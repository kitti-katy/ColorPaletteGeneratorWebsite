/**
 * Created by kate on 3/10/18.
 */
import React, {Component} from 'react';
import Color from './Color';
import sxConnect from "../Styledux/src/sxConnect"


class ColorPickerCanvasClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseDown : false
        }

        this.generateCanvas = this.generateCanvas.bind(this)
        this.getColor = this.getColor.bind(this)
        this.mouseMove = this.mouseMove.bind(this)
        this.resetMouseDown = this.resetMouseDown.bind(this)

    }

    generateCanvas(sat){
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

    componentDidMount() {
      this.generateCanvas(100)
    }

    mouseMoveColorPicker(evt){
        if(this.state.mouseDownPicker)
            this.getColor(evt)
    }

    mouseMoveSaturation(evt){
        if(this.state.mouseDownSaturation)
            this.changeSaturation(evt)
    }


    resetMouseDown(){
        this.setState({mouseDown:false})
    }

    getColor(evt){
        this.setState({mouseDown:true})
        let canvas = document.getElementById('canvasColorPicker')
        let rect = canvas.getBoundingClientRect()
        let x = evt.clientX - rect.left
        let y = evt.clientY - rect.top
        let ctx = canvas.getContext("2d");
        let imageData = ctx.getImageData(360-x, y, 1, 1).data;
        this.props.state.setSlice('baseColor', new Color( imageData[0],  imageData[1],  imageData[2],0))
        }

    changeSaturation(){

    }




render(){
        return (
            <div>

            <canvas id = 'canvasColorPicker' width = '360' height = '200'
                    onMouseMove={(e) => this.mouseMove(e)}
                    onMouseDown = {(e)=>this.getColor(e)}
                    onMouseUp={this.resetMouseDown}></canvas>

            <canvas id = 'canvasSaturationPicker' width = '10' height = '200'
    onMouseMove={(e) => this.mouseMove(e)}
    onMouseDown = {(e)=>this.getColor(e)}
    onMouseUp={this.resetMouseDown}></canvas>
            </div>
        );
    }
}

export const ColorPickerCanvas = sxConnect(null, ['a'])(ColorPickerCanvasClass);
import React, { Component } from "react";
import { drawHueCanvas, drawSaturationCanvas, getColorFromSaturationCanvas, getColorFromHueCanvas, getScaledHueWidth } from './CanvasFunctions'

class ColorPickerCanvas extends Component {
    state = {
        allowClrChange: false,
        allowSatChange: false,
        mouseDownMainCanvas: false,
        mouseDownSatCanvas: false,

        pickerCirclePositionX: 0,
        pickerCirclePositionY: 0,
        saturationRectPositionY: 0,
    };
    componentDidMount = () => {
        drawHueCanvas(this.props.baseColor, this.props.id);
        drawSaturationCanvas(this.props.baseColor, this.props.id);
        window.addEventListener("mouseup", this.onWindowMouseUp);
        window.addEventListener("resize", this.redrawCanvaseOnResize);
        
    }
    redrawCanvaseOnResize = () => {
         drawSaturationCanvas(this.props.baseColor, this.props.id)
         drawHueCanvas(this.props.baseColor, this.props.id)
        }
    componentWillUnmount() {
        window.removeEventListener("resize", this.redrawCanvaseOnResize);
        window.removeEventListener("mouseup", this.onWindowMouseUp);
    }

    enableColorChange = () => this.setState({ allowClrChange: true });
    disableColorChange = () => this.setState({ allowClrChange: false });

    // Main Canvas events
    handleMouseDownMainCanvas = evt => {
        this.setMouseDownToTrue();
        this.enableColorChange();
        this.setColorFromMainCanvas(evt.clientX, evt.clientY);
        this.makeAllUnselectable()
        window.addEventListener("mousemove", this.onWindowMouseMove)
    };
    handleMouseMoveMainCanvas = evt => {
        if (this.state.mouseDownMainCanvas && this.state.allowClrChange)
            this.setColorFromMainCanvas(evt.clientX, evt.clientY);
    };
    setMouseDownToTrue = () => this.setState({ mouseDownMainCanvas: true });
    setMouseDownToFalse = () => this.setState({ mouseDownMainCanvas: false });

    setColorFromMainCanvas = (clientX, clientY) => {
        let color = getColorFromHueCanvas(clientX, clientY, this.props.baseColor, this.props.id)
        this.props.onChange(color);
        drawSaturationCanvas(color, this.props.id);
        this.props.setHexInput(color.HEXString.substring(1))
    };


    // Saturation Canvas events
    handleMouseDownSatCanvas = evt => {
        this.setSatMouseDownToTrue();
        this.enableColorChange();
        this.setColorFromSatCanvas(evt.clientY);
        this.makeAllUnselectable()
        window.addEventListener("mousemove", this.onWindowMouseMove)
    };
    handleMouseMoveSatCanvas = evt => {
        if (this.state.mouseDownSatCanvas && this.state.allowClrChange)
            this.setColorFromSatCanvas(evt.clientY);
    };
    setSatMouseDownToTrue = () => this.setState({ mouseDownSatCanvas: true });
    setSatMouseDownToFalse = () => this.setState({ mouseDownSatCanvas: false });

    setColorFromSatCanvas = clientY => {
        let color = getColorFromSaturationCanvas(clientY, this.props.baseColor, this.props.id)
        this.props.onChange(color);
        drawHueCanvas(color, this.props.id);
        this.props.setHexInput(color.HEXString.substring(1))
    };

    // Window Events
    makeAllUnselectable = () => {
        window.document.body.className = window.document.body.className + ' unselectable'
        document.getElementById('canvases-container'+this.props.id).className = document.getElementById('canvases-container'+this.props.id).className + ' unselectable'
    }
    makeAllSelectable = () => {
        window.document.body.className = window.document.body.className.replace('unselectable', '');
        document.getElementById('canvases-container'+this.props.id).className = document.getElementById('canvases-container'+this.props.id).className.replace('unselectable', '');
    }
    onWindowMouseMove = (evt) => {
        if (this.state.mouseDownMainCanvas && this.state.allowClrChange) {
            this.setColorFromMainCanvas(evt.clientX, evt.clientY)
        }
        if (this.state.mouseDownSatCanvas && this.state.allowClrChange) {
            this.setColorFromSatCanvas(evt.clientY)
        }
    }

    onWindowMouseUp = () => {
        if (this.state.allowClrChange && (this.state.mouseDownMainCanvas || this.state.mouseDownSatCanvas)) {
            this.makeAllSelectable()
            this.setMouseDownToFalse()
            this.setSatMouseDownToFalse()
            this.disableColorChange()
            window.removeEventListener("mousemove", this.onWindowMouseMove);
        }
    }

    render() {
        let baseColor = this.props.baseColor;
        const {  light } = baseColor.hsl
        let hexString = baseColor.HEXString;

        return (
            <div id={"canvases-container"+this.props.id}>
                <div>
                    <div id={"pickerCircle"+this.props.id} style={{ borderColor: light > 50 ? "#757575" : "white", backgroundColor: hexString }} />
                        <canvas height="200" width={getScaledHueWidth()} id={"main-canvas-color-picker"+this.props.id}
                            onMouseDown={this.handleMouseDownMainCanvas} onMouseMove={this.handleMouseMoveMainCanvas}
                            onMouseEnter={this.enableColorChange}  />
                </div>

                <div style={{ marginLeft: "10px" }}
                    onMouseDown={this.handleMouseDownSatCanvas} onMouseMove={this.handleMouseMoveSatCanvas}
                    onMouseEnter={this.enableColorChange}>
                    <div id={"saturationCircle"+this.props.id} style={{ backgroundColor: hexString}} />
                    <canvas id={"saturation-canvas-color-picker"+this.props.id} height="200" width="10" />
                </div>

            </div>
        );
    }
}
export default ColorPickerCanvas;

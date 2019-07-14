
import React, { Component } from "react";
import Color from "../../utilities/Color";
import { Throttle } from "react-throttle";
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

        selectedColor: new Color('#edb407', 0, 0, 'Hex'),
        hexValue: 'edb407'
    };
    componentDidMount = () => {
        drawHueCanvas(this.props.baseColor);
        drawSaturationCanvas(this.props.baseColor);
        window.addEventListener("mouseup", this.onWindowMouseUp, false);
        document.getElementById('canvases-container').addEventListener("mouseup", this.onWindowMouseUp, false);
        window.addEventListener("resize", () => drawSaturationCanvas(this.state.selectedColor));
        window.addEventListener("resize", () => drawHueCanvas(this.state.selectedColor));
        window.addEventListener("mousemove", this.onWindowMouseMove)
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.drawSaturationCanvas);
        window.removeEventListener("resize", this.drawHueCanvas);
        window.removeEventListener("mouseup", this.onWindowMouseUp);
        window.removeEventListener("mousemove", this.onWindowMouseMove);
        document.getElementById('canvases-container').removeEventListener("mouseup", this.onWindowMouseUp);
    }

    enableColorChange = () => this.setState({ allowClrChange: true });
    disableColorChange = () => this.setState({ allowClrChange: false });

    // Main Canvas events
    handleMouseDownMainCanvas = evt => {
        this.setMouseDownToTrue();
        this.enableColorChange();
        this.setColorFromMainCanvas(evt.clientX, evt.clientY);
        this.makeAllUnselectable()
    };
    handleMouseMoveMainCanvas = evt => {
        if (this.state.mouseDownMainCanvas && this.state.allowClrChange)
            this.setColorFromMainCanvas(evt.clientX, evt.clientY);
    };
    setMouseDownToTrue = () => this.setState({ mouseDownMainCanvas: true });
    setMouseDownToFalse = () => this.setState({ mouseDownMainCanvas: false });

    setColorFromMainCanvas = (clientX, clientY) => {
        let color = getColorFromHueCanvas(clientX, clientY, this.props.baseColor)
        this.setState({ selectedColor: color })
        this.props.onChange(color);
        drawSaturationCanvas(color);
        this.props.setHexInput(color.HEXString.substring(1))
    };


    // Saturation Canvas events
    handleMouseDownSatCanvas = evt => {
        this.setSatMouseDownToTrue();
        this.enableColorChange();
        this.setColorFromSatCanvas(evt.clientY);
        this.makeAllUnselectable()
    };
    handleMouseMoveSatCanvas = evt => {
        if (this.state.mouseDownSatCanvas && this.state.allowClrChange)
            this.setColorFromSatCanvas(evt.clientY);
    };
    setSatMouseDownToTrue = () => this.setState({ mouseDownSatCanvas: true });
    setSatMouseDownToFalse = () => this.setState({ mouseDownSatCanvas: false });

    setColorFromSatCanvas = clientY => {
        let color = getColorFromSaturationCanvas(clientY, this.props.baseColor)
        this.props.onChange(color);
        this.setState({ selectedColor: color })
        drawHueCanvas(color);
        this.props.setHexInput(color.HEXString.substring(1))
    };

    // Window Events
    makeAllUnselectable = () => {
        window.document.body.className = window.document.body.className + ' unselectable'
        document.getElementById('canvases-container').className = document.getElementById('canvases-container').className + ' unselectable'
    }
    makeAllSelectable = () => {
        window.document.body.className = window.document.body.className.replace('unselectable', '');
        document.getElementById('canvases-container').className = document.getElementById('canvases-container').className.replace('unselectable', '');
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
        }
    }



    render() {
        let baseColor = this.props.baseColor;
        const { hue, sat, light } = baseColor.hsl
        let hexString = baseColor.HEXString;

        return (
            <div id="canvases-container">
                <div>
                    <div id="pickerCircle" style={{ borderColor: light > 50 ? "#757575" : "white", backgroundColor: hexString }} />
                    <Throttle time="20" handler="onMouseMove">
                        <canvas height="200" width={getScaledHueWidth()} id="main-canvas-color-picker"
                            onMouseDown={this.handleMouseDownMainCanvas} onMouseMove={this.handleMouseMoveMainCanvas}
                            onMouseEnter={this.enableColorChange}  />
                    </Throttle>
                </div>

                <div style={{ marginLeft: "10px" }}
                    onMouseDown={this.handleMouseDownSatCanvas} onMouseMove={this.handleMouseMoveSatCanvas}
                    onMouseEnter={this.enableColorChange}>
                    <div id="saturationCircle" style={{ backgroundColor: hexString, borderColor: "#394B59"}} />
                    <canvas id="saturation-canvas-color-picker" height="200" width="10" />
                </div>

            </div>
        );
    }
}
export default ColorPickerCanvas;

import React, { Component } from "react";
import { connect } from "react-redux";
import Color, { RGBtoHSL } from '../../utilities/Color';
import { exportJSON } from '../../utilities/ExportJSON';
import { changeColorsInPixelArray } from '../../utilities/ChangeColorsInPixelArray';
import "./TryIt.scss"
import { Tooltip, Slider } from 'antd'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import IconButton from '@material-ui/core/IconButton';
import * as _ from 'lodash'

let mapStateToProps = (state) => { return { selected: state.SelectedColorReducer.selected } }
let mapDispatchToProps = (dispatch) => { /*return bindActionCreators({ changeBaseColor: changeBaseColor }, dispatch)*/ }

class TryPixelArt extends Component {
    state = this.initialState;
    get initialState() {
        return {
            ...this.initialComponentsState,
            historyStack: [],
            futureStack: []
        };
    }
    get initialComponentsState() {
        return {
            distinguishColors: [],
            originalColors: [],
            currentPixelArray: [],
            image: null
        }
    }


    reset = (e) => { e.stopPropagation(); this.pushCurrentStateToHistory(); this.setState(this.initialComponentsState); }


    setColor = (e, colorIndex) => {
        e.stopPropagation()
        this.pushCurrentStateAndClearFuture()
        let newColors = this.state.gradientColors
        newColors[colorIndex] = this.getSelectedColor()
        this.setState({ gradientColors: newColors })
    }

    // Add/Remove History

    // TODO: rename it? 
    pushCurrentStateAndClearFuture = () => {
        this.pushCurrentStateToHistory()
        this.clearFutureStack()
    }

    pushCurrentStateToHistory = () => {
        let historyStack = Array.from(this.state.historyStack)
        let gradientColors = this.getCurrentComponentsStateCopy()
        if (!_.isEqual(historyStack[0], gradientColors)) {
            historyStack.push(gradientColors)
            this.setState({ historyStack })
        }
    }
    clearFutureStack = () =>
        this.setState({ futureStack: [] })

    undo = () => {
        this.addCurrentStateToFutureStack()
        this.setCurrentStateFromHistory()
    }
    addCurrentStateToFutureStack = () => {
        let futureStack = Array.from(this.state.futureStack)
        futureStack.push(this.getCurrentComponentsStateCopy())
        this.setState({ futureStack })
    }
    setCurrentStateFromHistory = () => {
        let historyStack = Array.from(this.state.historyStack)
        let gradientColors = historyStack.pop()
        this.setState({ historyStack, gradientColors })
    }

    redo = () => {
        this.pushCurrentStateToHistory()
        this.setStateFromFuture()
    }
    setStateFromFuture = () => {
        let futureStack = Array.from(this.state.futureStack)
        let gradientColors = futureStack.pop()
        this.setState({ futureStack, gradientColors })
    }

    getCurrentComponentsStateCopy = () =>
        JSON.parse(JSON.stringify(this.state.gradientColors))


    // IMAGE ACTIONS

    handleSubmit = e => {
        //e.preventDefault();
        let img = new Image();
        img.src = this.state.imagePreviewUrl;
        img.onload = () => {
            let canvas = document.getElementById("pixel-canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            let pixelArray = ctx.getImageData(0, 0, img.width, img.height).data;

            let distinguishColors = []
            console.log(pixelArray)
            for (let i = 0; i < pixelArray.length - 4; i += 4) {
                let r = pixelArray[i];
                let g = pixelArray[i + 1];
                let b = pixelArray[i + 2];
                let rgb = { r, g, b }
                if (!_.find(distinguishColors, rgb))
                    distinguishColors.push(rgb)
            }

            this.setState({ distinguishColors, currentPixelArray: pixelArray, image: img })

        }
    };

    handleChangeColor = (i) => {

        let distinguishColors = this.state.distinguishColors


        let oldPixelArray = this.state.currentPixelArray
        let oldRGBColor = distinguishColors[i]
        let newRGBColor = new Color(this.props.selected, 0, 0, 'Hex').rgb

        let newPixelArray = changeColorsInPixelArray(oldPixelArray, oldRGBColor, newRGBColor)
        distinguishColors[i] = newRGBColor

        this.setState({ currentPixelArray: newPixelArray, distinguishColors })

        let img = this.state.image
        let canvas = document.getElementById("pixel-canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        //ctx.putImageData(imageData, 0, 0);
        var data = imageData.data;

        let rgbaArr = []
        console.log(data)
        for (var i = 0; i < data.length; i += 4) {
            let r = newPixelArray[i]
            let g = newPixelArray[i + 1]
            let b = newPixelArray[i + 2]
            rgbaArr.push(r);     // red
            rgbaArr.push(g) // green
            rgbaArr.push(b) // blue
            let alpha = r == 0 && g == 0 && b == 0 ? 0 : 255
            rgbaArr.push(alpha) // alpha
        }
        console.log(data)
        imageData.data.set(new Uint8ClampedArray(rgbaArr))
        console.log(rgbaArr)
        ctx.putImageData(imageData, 0, 0);

    }
    /*
        changeOldPixelArrayToNew = (oldPixelArray, oldRGBColor, newRGBColor) => {
            let distinguishColors = this.state.distinguishColors
    
    
            let oldPixelArray = this.state.currentPixelArray
            let oldRGBColor = distinguishColors[i]
            let newRGBColor = new Color(this.props.selected, 0, 0, 'Hex').rgb
    
            let newPixelArray = changeColorsInPixelArray(oldPixelArray, oldRGBColor, newRGBColor)
    
            distinguishColors[i] = selectedColorRGB
    
            this.setState({ currentPixelArray: newPixelArray, distinguishColors })
        }
    */
    redrawCanvas = () => {

    }


    handleImageChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.onloadend = (obj) => {
                this.setState({ image: file, imagePreviewUrl: reader.result }, this.handleSubmit);
            }
            reader.readAsDataURL(file);
        }
    };



    render() {

        let distinguishColors = this.state.distinguishColors

        return (
            <div className='try-web'>

                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <canvas id="pixel-canvas" style={{ minHeight: '200px', maxHeight: '250px', marginBottom: '16px', maxWidth: '100%' }} />
                    <div>
                        <label htmlFor="upload-pixel-art" style={{ cursor: 'pointer' }} className="upload-photo-label">
                            Upload image...
                            </label>
                        <input type="file" name="pixel-art" id="upload-pixel-art"
                            className='upload-image-input'
                            onChange={this.handleImageChange}
                        />
                    </div>

                </div>

                <div className="applied-colors-container">
                    {distinguishColors.map((rgb, i) =>
                        <div className="applied-color" key={'pixel-picture-color-' + i}
                            style={{ backgroundColor: "rgb(" + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')' }}
                            onClick={(e) => this.handleChangeColor(i)}>
                        </div>)}
                </div>

                <div className='try-actions-container'>
                    <Tooltip placement="bottom" title={"Export JSON"}>
                        <IconButton size='small' onClick={() => exportJSON(distinguishColors)} > <CloudDownloadIcon /> </IconButton>
                    </Tooltip>

                    <Tooltip placement="bottom" title={"Reset Applied Colors"}>
                        <IconButton size='small' onClick={this.reset} > <AutorenewIcon /></IconButton>
                    </Tooltip>

                    <IconButton size='small' onClick={this.undo} disabled={this.state.historyStack.length == 0}>
                        <UndoIcon />
                    </IconButton>

                    <IconButton size='small' onClick={this.redo} disabled={this.state.futureStack.length == 0}>
                        <RedoIcon />
                    </IconButton>

                </div>

            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TryPixelArt);
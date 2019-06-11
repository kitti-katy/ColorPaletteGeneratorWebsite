import React, { Component } from "react";
import { connect } from "react-redux";
import Color from '../../utilities/Color'
import { exportJSON } from '../../utilities/ExportJSON';
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

class TryItGradient extends Component {
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
            gradientColors: ['#81042b', '#9a6a79', '#dda7b8', '#040102'],
            numberOfColors: 4
        }
    }
    componentDidUpdate = () => { }
    componentDidMount = () => { this.setHoverEffects() }

    setHoverEffects = () => {
        let allTryElements = this.getAllTryElements()
        allTryElements.forEach(el => {
            this.addMouseEnterListener(el, allTryElements)
            this.addMouseLeaveListener(el)
            this.addMouseOverListener(el)
        }
        )
    }
    getOutlineStyle = () => '3px dotted ' + this.getSelectedColor()
    getAllTryElements = () => this.state.gradientColors.map((color, i) => document.getElementById('gradient-' + i))
    // add outline
    addMouseEnterListener = (el, allTryElements) => el.addEventListener("mouseenter", (e) => { allTryElements.forEach(elem => elem.style.outline = 'none'); el.style.outline = this.getOutlineStyle(); })
    // remove outline when mouse leave
    addMouseLeaveListener = (el) => el.addEventListener("mouseleave", (e) => e.target.style.outline = 'none')
    // add outline to parent element when mouseleave from inner element
    addMouseOverListener = (el) => el.addEventListener("mouseover", (e) => {
        e.stopPropagation()
        let innerElements = el.querySelectorAll('*')
        let allNoneHovered = true
        innerElements.forEach(elem => { if (allNoneHovered) allNoneHovered = !elem.style.outline.includes('3px dotted ') })
        el.style.outline = allNoneHovered ? this.getOutlineStyle() : 'none'
    }
    )

    reset = (e) => { e.stopPropagation(); this.pushCurrentStateToHistory(); this.setState(this.initialComponentsState);  }

    setNumberOfColors = (n) => {
        let oldN = this.state.numberOfColors
        let gradientColors = Array.from(this.state.gradientColors)
        if (n > oldN)
            for (let i = 0; i < n - oldN; i++) {
                gradientColors.push('#ffffff')
            }
        if (n < oldN) {
            for (let i = 0; i < oldN - n; i++) {
                gradientColors.pop()
            }
        }
        this.setState({ numberOfColors: n, gradientColors: gradientColors }, this.setHoverEffects)
    }
    setColor = (e, colorIndex) => {
        e.stopPropagation()
        this.pushCurrentStateAndClearFuture()
        let newColors = this.state.gradientColors
        newColors[colorIndex] = this.getSelectedColor()
        this.setState({ gradientColors: newColors })
    }
    // selectedColor when passed from a compononent
    getSelectedColor = () => this.props.selectedColor != null ? this.props.selectedColor : this.props.selected


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



    render() {
        let gradientColors = this.state.gradientColors
        let selectedColor = this.getSelectedColor()

        let gradientString = "linear-gradient(to right," + gradientColors.join(',') + ")"

        return (
            <div className='try-web'>

                <div className="try-colors-container" style={{ backgroundImage: gradientString, gridAutoFlow: 'column', display: 'grid' }}>
                    {gradientColors.map(
                        (color, i) =>
                            <div style={{ paddingTop: '150px', }}
                                onClick={(e) => this.setColor(e, i)} id={'gradient-' + i} />
                    )}
                </div>

                <div >
                    <Slider className="slider-input gradient-slider" style={{ width: '100%' }} min={2} max={8} onChange={this.setNumberOfColors} value={this.state.numberOfColors} />
                </div>

                <div className="applied-colors-container">
                    {gradientColors.map( (color, i) =>
                        <div className="applied-color"
                            style={{ backgroundColor: color, color: new Color(color, 0, 0, 'Hex').hsl.light > 40 ? 'rgb(33, 33, 33)' : 'white' }}
                            onClick={(e) => this.setColor(e, i)}>
                        </div>)}
                </div>

                <div className='try-actions-container'>
                    <Tooltip placement="bottom" title={"Export JSON"}>
                        <IconButton size='small' onClick={() => exportJSON(gradientColors)} > <CloudDownloadIcon /> </IconButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(TryItGradient);

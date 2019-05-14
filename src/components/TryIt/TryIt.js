import React, { Component } from "react";
import { connect } from "react-redux";
import Color from '../../utilities/Color'
import { exportJSON } from '../../utilities/ExportJSON';
import { ExportJSONButton } from '../ExportJSONButton'
import { Button } from "@blueprintjs/core";
import "./TryIt.scss"

import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import AutorenewIcon from '@material-ui/icons/Autorenew'

import { Tooltip } from 'antd'

let mapStateToProps = (state) => { return { selected: state.SelectedColorReducer.selected } }
let mapDispatchToProps = (dispatch) => { /*return bindActionCreators({ changeBaseColor: changeBaseColor }, dispatch)*/ }

const tryIds = ["try-background", "try-title", "try-header", "try-text", "try-button-primary",
    "try-button-primary-font", "try-button-secondary", "try-button-secondary-font", "try-button-success",
    "try-button-warning-font", "try-button-warning",
    "try-button-success-font", "try-button-info", "try-button-info-font", "try-button-danger", "try-button-danger-font"]

const texts = ['title', 'header', 'primaryButtonFont', 'secondaryButtonFont', 'successButtonFont', 'dangerButtonFont', 'warningButtonFont', 'infoButtonFont', 'paragraph']
const backgrounds = ['background', 'primaryButton', 'secondaryButton', 'successButton', 'warningButton', 'dangerButton', 'infoButton']

const backgroundColor = 'white'
const textColor = '#030202'

class TryIt extends Component {
    state = this.initialState;
    get initialState() {
        return {
            ...this.initialComponentsState,
            historyStack: [],
            futureQueue: []
        };
    }
    get initialComponentsState() {
        return {
            components: {
                background: backgroundColor,
                primaryButton: backgroundColor,
                secondaryButton: backgroundColor,
                successButton: backgroundColor,
                warningButton: backgroundColor,
                dangerButton: backgroundColor,
                infoButton: backgroundColor,

                title: textColor,
                header: textColor,
                primaryButtonFont: textColor,
                secondaryButtonFont: textColor,
                successButtonFont: textColor,
                dangerButtonFont: textColor,
                warningButtonFont: textColor,
                infoButtonFont: textColor,
                paragraph: textColor,
            },
            hovered: null
        }
    }
    componentDidUpdate = () => { }
    componentDidMount = () => {
        this.setHoverEffects()
        this.pushCurrentHistoryToStack()
    }
    setHoverEffectInPalette = (color) => {
        this.setState({ hovered: color })
    }
    pushCurrentHistoryToStack = () => {
        let historyStack = Array.from(this.state.historyStack)
        historyStack.push(Object.assign(this.state.components))
        console.log(historyStack)
        this.setState({ historyStack, futureQueue: [] })
    }
    popHistoryStack = () => {
        let historyStack = this.state.historyStack
        let futureQueue = this.state.futureQueue
        futureQueue.push(this.state.components)
        console.log(historyStack)
        let components = historyStack.pop()
        console.log(components)
        this.setState({ historyStack, futureQueue, components })
        console.log(this.state)
    }
    dequeueFutureQueue = () => {
        let futureQueue = this.state.futureQueue
        let historyStack = this.state.historyStack
        historyStack.push(this.state.components)
        let components = futureQueue.shift()
        this.setState({ historyStack, futureQueue, components })
    }

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
    getAllTryElements = () => tryIds.map(id => document.getElementById(id))
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

    reset = (e) => { e.stopPropagation(); this.setState(this.initialComponentsState); this.pushCurrentHistoryToStack() }

    setColor = (e, compName) => {
        e.stopPropagation()
        this.pushCurrentHistoryToStack()
        let newColors = this.state.components
        newColors[compName] = this.getSelectedColor()
        this.setState({ components: newColors })
    }
    // selectedColor when passed from a compononent
    getSelectedColor = () => this.props.selectedColor != null ? this.props.selectedColor : this.props.selected

    getTryButton = (component, id, background, font, text) =>
        <button className='try-button'
            onClick={(e) => this.setColor(e, component)} id={id} style={{
                backgroundColor: background, color: font, border: '1px solid ' + font + '80'
            }}>
            <div onClick={(e) => this.setColor(e, component + 'Font')} id={id + "-font"}>{text} </div></button>

    render() {
        let components = this.state.components
        const { appBar, title, header,
            background, primaryButton, secondaryButton, successButton,
            dangerButton, infoButton, primaryButtonFont, warningButton, warningButtonFont,
            secondaryButtonFont, successButtonFont, dangerButtonFont, infoButtonFont, paragraph } = components
        let selectedColor = this.getSelectedColor()

        let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'
        return (
            <div className='try-web'>


                <div className="try-card-holder">

                    <div id="try-background" onClick={(e) => this.setColor(e, 'background')}
                        style={{ backgroundColor: background, border: '1px solid #d4d4d4', borderRadius: '1%'  }}> {/*  headStyle={{ backgroundColor: appBar }} > */}

                        <h3 className="try-title-holder" style={{ color: title }}>
                            <span id="try-title" onClick={(e) => this.setColor(e, 'title')}>Apply Selected Color Here </span>
                        </h3>

                        <h4 style={{ color: header }} id="try-header" onClick={(e) => this.setColor(e, 'header')}> Header </h4>
                        <p id="try-text" onClick={(e) => this.setColor(e, 'paragraph')} style={{ color: paragraph, lineHeight: '1.6' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            {/* Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. */}
                        </p>
                        <br />
                        <div style={{ display: 'flex' }}>
                            {this.getTryButton('primaryButton', "try-button-primary", primaryButton, primaryButtonFont, 'Primary')}
                            {this.getTryButton('secondaryButton', "try-button-secondary", secondaryButton, secondaryButtonFont, 'Secondary')}
                        </div>
                        <br />

                        <div style={{ display: 'flex' }}>
                            {this.getTryButton('successButton', "try-button-success", successButton, successButtonFont, 'Success')}
                            {this.getTryButton('infoButton', "try-button-info", infoButton, infoButtonFont, 'Info')}
                            {this.getTryButton('warningButton', "try-button-warning", warningButton, warningButtonFont, 'Warning')}
                            {this.getTryButton('dangerButton', "try-button-danger", dangerButton, dangerButtonFont, 'Danger')}
                        </div>
                    </div >
                </div>

                <div className="applied-colors-container">
                    {backgrounds.map((name, i) => {
                        let key = "text_" + name + "_" + i
                        let is_hovered = this.state.hovered == key
                        let bg_color = is_hovered ? selectedColor : components[name]
                        return (
                            <div className="applied-color" key={key}
                                onMouseOver={() => this.setHoverEffectInPalette(name)}
                                onMouseLeave={() => this.setHoverEffectInPalette(null)}
                                onClick={(e) => this.setColor(e, name)}
                                style={{
                                    backgroundColor: bg_color,
                                    color: new Color(bg_color, 0, 0, 'Hex').hsl.light > 40 ? 'rgba(33, 33, 33, 0.9)' : 'rgba(255, 255, 255, 0.75)'
                                }} />)
                    }
                    )}
                    {texts.map((key, i) =>
                        <div className="applied-color" key={"bg_" + key + "_" + i}
                            onClick={(e) => this.setColor(e, key)}
                            style={{
                                backgroundColor: components[key],
                                color: new Color(components[key], 0, 0, 'Hex').hsl.light > 40 ? 'rgba(33, 33, 33, 0.9)' : 'rgba(255, 255, 255, 0.75)'
                            }}>
                            {}
                        </div>)}
                </div>

                <div className='try-actions-container'>

                    <Tooltip placement="bottom" title={"Export JSON"}>
                        <IconButton className='' size='small' onClick={(e) => { e.stopPropagation(); exportJSON(components) }}> <CloudDownloadIcon /> </IconButton>
                    </Tooltip>

                    <Tooltip placement="bottom" title={"Reset Applied Colors"}>
                        <IconButton className='' size='small' onClick={this.reset}> <AutorenewIcon />  </IconButton>
                    </Tooltip>

                    <IconButton className='' size='small' onClick={this.dequeueFutureQueue}>
                        <UndoIcon />
                    </IconButton>

                    <IconButton className='' size='small' onClick={this.popHistoryStack} disabled={this.state.futureQueue}>
                        <RedoIcon />
                    </IconButton>

                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TryIt);

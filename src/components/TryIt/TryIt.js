import React, { Component } from "react";
import { connect } from "react-redux";
import Color from '../../utilities/Color'
import { exportJSON } from '../../utilities/ExportJSON';
import { ExportJSONButton } from '../ExportJSONButton'
import { Icon } from "@blueprintjs/core";
import "./TryIt.scss"
import { GoldenRatio } from "../GoldenRatio";
import { borderStyle } from '../../styles'
import { Tooltip } from 'antd'

let mapStateToProps = (state) => { return { selected: state.SelectedColorReducer.selected } }
let mapDispatchToProps = (dispatch) => { /*return bindActionCreators({ changeBaseColor: changeBaseColor }, dispatch)*/ }

const tryIds = ["try-background", "try-title", "try-header", "try-text", "try-button-primary",
    "try-button-primary-font", "try-button-secondary", "try-button-secondary-font", "try-button-success",
    "try-button-warning-font", "try-button-warning",
    "try-button-success-font", "try-button-info", "try-button-info-font", "try-button-danger", "try-button-danger-font"]

const texts = ['title', 'header', 'primaryButtonFont', 'secondaryButtonFont', 'successButtonFont', 'dangerButtonFont', 'warningButtonFont', 'infoButtonFont', 'paragraph']
const backgrounds = ['background', 'primaryButton', 'secondaryButton', 'successButton', 'warningButton', 'dangerButton', 'infoButton']

class TryIt extends Component {
    state = this.initialState;
    get initialState() {
        return {
            components: {
                background: '#f7f3f4',
                primaryButton: '#f7f3f4',
                secondaryButton: '#f7f3f4',
                successButton: '#f7f3f4',
                warningButton: '#f7f3f4',
                dangerButton: '#f7f3f4',
                infoButton: '#f7f3f4',

                title: '#030202',
                header: '#030202',
                primaryButtonFont: '#030202',
                secondaryButtonFont: '#030202',
                successButtonFont: '#030202',
                dangerButtonFont: '#030202',
                warningButtonFont: '#030202',
                infoButtonFont: '#030202',
                paragraph: '#030202',
            }
        };
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

    reset = (e) => { e.stopPropagation(); this.setState(this.initialState) }

    setColor = (e, compName) => {
        e.stopPropagation()
        let newColors = this.state.components
        newColors[compName] = this.getSelectedColor()
        this.setState({ components: newColors })
    }
    // selectedColor when passed from a compononent
    getSelectedColor = () => this.props.selectedColor != null ? this.props.selectedColor : this.props.selected

    getTryButton = (component, id, background, font, text) => {

        return (
            <button class='try-button'
                onClick={(e) => this.setColor(e, component)} id={id} style={{
                    backgroundColor: background, color: font, border: '1px solid ' + font + '80'
                }}>
                <div onClick={(e) => this.setColor(e, component + 'Font')} id={id + "-font"}>{text} </div></button>)
    }

    render() {
        let components = this.state.components
        const { appBar, title, header, header2,
            background, primaryButton, secondaryButton, successButton,
            dangerButton, infoButton, primaryButtonFont, warningButton, warningButtonFont,
            secondaryButtonFont, successButtonFont, dangerButtonFont, infoButtonFont, paragraph } = components
        let selectedColor = this.getSelectedColor()

        let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

        return (
            <div style={{ width: '100%', background: 'white', height: '-webkit-fill-available', border: borderStyle }} className='horizontal-holder-ls'>

                <div style={{ direction: 'rtl', padding: '24px', borderRight: '2px dashed rgb(202, 210, 221)', height: '-webkit-fill-available', lineHeight: '2' }}>
                    <div style={{ color: 'rgb(97, 97, 97)' }}>
                        <Tooltip placement="top" title={"Reset Applied Colors"}>
                            <Icon icon="repeat" onClick={this.reset} style={{ cursor: 'pointer' }} />
                        </Tooltip>
                        <ExportJSONButton onClick={() => exportJSON(components)} /></div>
                    <br />
                    <h4> Backgrounds </h4>
                    <div className="applied-colors-container">
                        {backgrounds.map(key =>
                            <div className="applied-color"
                                style={{
                                    backgroundColor: components[key],
                                    color: new Color(components[key], 0, 0, 'Hex').hsl.light > 40 ? 'rgb(33, 33, 33)' : 'white'
                                }}>
                                {components[key]}
                            </div>)}
                    </div>
                    <br />
                    <h4> Texts </h4>
                    <div className="applied-colors-container">
                        {texts.map(key =>
                            <div className="applied-color"
                                style={{ backgroundColor: components[key], color: new Color(components[key], 0, 0, 'Hex').hsl.light > 40 ? 'rgb(33, 33, 33)' : 'white' }}>
                                {components[key]}
                            </div>)}
                    </div>
                </div>

                <div className="try-colors-container">
                    <div className="try-card-holder">
                        <div id="try-background" onClick={(e) => this.setColor(e, 'background')}
                            style={{ backgroundColor: background }} headStyle={{ backgroundColor: appBar }} >
                            <h3 className="try-title-holder" style={{ color: title }}>
                                <span id="try-title" onClick={(e) => this.setColor(e, 'title')}>Apply Selected Color Here </span>
                            </h3>

                            <h4 style={{ color: header }} id="try-header" onClick={(e) => this.setColor(e, 'header')}> Header </h4>
                            <p id="try-text" onClick={(e) => this.setColor(e, 'paragraph')} style={{ color: paragraph, lineHeight: '2' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TryIt);

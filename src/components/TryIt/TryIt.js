import React, { Component } from "react";
import { connect } from "react-redux";
import Color from '../../utilities/Color'
import { exportJSON } from '../../utilities/ExportJSON';
import { Button } from 'primereact/button';
import { ExportJSONButton } from '../ExportJSONButton'
import { Card, Label, Icon } from "@blueprintjs/core";
import "./TryIt.css"

let mapStateToProps = (state) => { return { selected: state.SelectedColorReducer.selected } }
let mapDispatchToProps = (dispatch) => { /*return bindActionCreators({ changeBaseColor: changeBaseColor }, dispatch)*/ }


const tryIds = ["try-background", "try-title", "try-header", "try-text", "try-button-primary",
    "try-button-primary-font", "try-button-secondary", "try-button-secondary-font", "try-button-success",
    "try-button-warning-font", "try-button-warning",
    "try-button-success-font", "try-button-info", "try-button-info-font", "try-button-danger", "try-button-danger-font"]
const hoverStyle = '3px dotted red'

class TryIt extends Component {
    state = this.initialState;
    get initialState() {
        return {
            components: {
                background: '#ffffff',
                primaryButton: '#ffffff',
                secondaryButton: '#ffffff',
                successButton: '#ffffff',
                warningButton: '#ffffff',
                dangerButton: '#ffffff',
                infoButton: '#ffffff',

                title: '#353535',
                header: '#353535',
                primaryButtonFont: '#353535',
                secondaryButtonFont: '#353535',
                successButtonFont: '#353535',
                dangerButtonFont: '#353535',
                warningButtonFont: '#353535',
                infoButtonFont: '#353535',
                paragraph: '#353535',
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

    getTryButton = (component, id, background, font, text) => <Button
        onClick={(e) => this.setColor(e, component)} id={id} style={{ backgroundColor: background, color: font, marginRight: '16px', borderColor: 'transparent', fontSize: '9.5pt' }}
        label={<div onClick={(e) => this.setColor(e, component + 'Font')} id={id + "-font"}>{text} </div>} />

    render() {
        let components = this.state.components
        const { appBar, title, header, header2,
            background, primaryButton, secondaryButton, successButton,
            dangerButton, infoButton, primaryButtonFont, warningButton, warningButtonFont,
            secondaryButtonFont, successButtonFont, dangerButtonFont, infoButtonFont, paragraph } = components
        let selectedColor = this.getSelectedColor()
        let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

        let componentsKeys = Object.keys(components)

        return (
            <Card style={{ width: '100%', /* minHeight: '750px' */ }} >
                <div className="try-colors-container">
                    <div className="try-card-holder">

                        <Card id="try-background" onClick={(e) => this.setColor(e, 'background')}
                            style={{ backgroundColor: background }} headStyle={{ backgroundColor: appBar }} >

                            <h2 className="try-title-holder" style={{ color: title }}>
                                <span id="try-title" onClick={(e) => this.setColor(e, 'title')}>Apply Selected Color Here </span>
                                <Button className="reset-try-card-btn" onClick={this.reset} label={<Icon icon="repeat" />} />
                            </h2>
                            <br />
                            <h3 style={{ color: header, fontFamily: "'Lora', serif" }} id="try-header" onClick={(e) => this.setColor(e, 'header')}> Header </h3>
                            <p id="try-text" onClick={(e) => this.setColor(e, 'paragraph')} style={{ color: paragraph, fontFamily: "'Nanum Gothic', sans-serif", lineHeight: '2' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                           </p>
                            <br />
                            <div>
                                {this.getTryButton('primaryButton', "try-button-primary", primaryButton, primaryButtonFont, 'Primary')}
                                {this.getTryButton('secondaryButton', "try-button-secondary", secondaryButton, secondaryButtonFont, 'Secondary')}
                                {this.getTryButton('successButton', "try-button-success", successButton, successButtonFont, 'Success')}
                                {this.getTryButton('infoButton', "try-button-info", infoButton, infoButtonFont, 'Info')}
                                {this.getTryButton('warningButton', "try-button-warning", warningButton, warningButtonFont, 'Warning')}
                                {this.getTryButton('dangerButton', "try-button-danger", dangerButton, dangerButtonFont, 'Danger')}
                            </div>
                            <br />
                        </Card >

                    </div>

                    <div>
                        <div className="applied-colors-header">
                            {/* <Label>Applied Colors:</Label> */}
                            <ExportJSONButton onClick={() => exportJSON(components)} />
                        </div>

                        <div className="applied-colors-container">
                            {componentsKeys.map(key =>
                                <div className="applied-color"
                                    style={{ backgroundColor: components[key], color: new Color(components[key], 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white' }}>
                                    {components[key]}
                                </div>)}
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TryIt);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Icon } from 'antd';
import Color from '../utilities/Color'
import { exportJSON } from '../utilities/ExportJSON'

let mapStateToProps = (state) => { return { selected: state.SelectedColorReducer.selected } }
let mapDispatchToProps = (dispatch) => { /*return bindActionCreators({ changeBaseColor: changeBaseColor }, dispatch)*/ }

const exportJSONButtonStyle = {float: 'right', marginLeft: '18px', fontSize: '22px', lineHeight: '2' }

const tryIds = ["try-background", "try-title", "try-header", "try-text", "try-button-primary",
            "try-button-primary-font", "try-button-secondary", "try-button-secondary-font", "try-button-success",
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
                dangerButton: '#ffffff',
                infoButton: '#ffffff',

                title: '#353535',
                header: '#353535',
                primaryButtonFont: '#353535',
                secondaryButtonFont: '#353535',
                successButtonFont: '#353535',
                dangerButtonFont: '#353535',
                infoButtonFont: '#353535',
                paragraph: '#353535',
            }
        };
    }
    componentDidUpdate = () => {}
    componentDidMount = () => {this.setHoverEffects()}

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
    addMouseEnterListener = (el, allTryElements) => el.addEventListener("mouseenter", (e) => { allTryElements.forEach(elem => elem.style.outline = 'none'); el.style.outline = this.getOutlineStyle(); } ) 
    // remove outline when mouse leave
    addMouseLeaveListener = (el) => el.addEventListener("mouseleave", (e) => e.target.style.outline = 'none' )
    // add outline to parent element when mouseleave from inner element
    addMouseOverListener = (el) => el.addEventListener("mouseover", (e) => { 
                                                                        e.stopPropagation()
                                                                        let innerElements = el.querySelectorAll('*')
                                                                        let allNoneHovered = true
                                                                        innerElements.forEach(elem => { if(allNoneHovered) allNoneHovered = !elem.style.outline.includes('3px dotted ')} )
                                                                        el.style.outline = allNoneHovered ? this.getOutlineStyle() : 'none' } 
                                                                        )
    
    reset = (e) => { e.stopPropagation(); this.setState(this.initialState) }

    setColor = (e, compName) => {
        e.stopPropagation()
        let newColors = this.state.components
        newColors[compName] = this.getSelectedColor()
        this.setState({ components: newColors })
    }
    // selectedColor when passed from a compononent
    getSelectedColor = () => this.props.selectedColor!=null ? this.props.selectedColor : this.props.selected


    render() {
        let components = this.state.components
        const { appBar, title, header, header2,
            background, primaryButton, secondaryButton, successButton,
            dangerButton, infoButton, primaryButtonFont,
            secondaryButtonFont, successButtonFont, dangerButtonFont, infoButtonFont, paragraph } = components
        let selectedColor = this.getSelectedColor()
        let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

        let  componentsKeys = Object.keys(components)

        return (
            <div style={{ width: '25vw', display: 'inline-block' /*background: '#f5f5f5',*/ }}>

                <div style={{ width: '450px',  cursor: 'pointer' }}>
                    <Card style={{}} id="try-background"
                        onClick={(e) => this.setColor(e, 'background')}
                        style={{ backgroundColor: background, borderColor: '#b8b8b8' }}
                        headStyle={{ backgroundColor: appBar }}
                        >

                        <h2 style={{ color: title, fontFamily: "'Lora', serif", borderBottom: '1px solid #e8e8e8', paddingBottom: '12px'}}>
                            <span id="try-title" onClick={(e) => this.setColor(e, 'title')}   >Title </span>
                            <Button style={{ float: 'right' }} onClick={this.reset}> <Icon type="reload" />  </Button>
                        </h2>
                        <br />
                        <h2    style={{ color: header, fontFamily: "'Lora', serif" }} id="try-header" onClick={(e) => this.setColor(e, 'header')}> Header </h2>
                        <p   
                        id="try-text"
                            style={{ color: paragraph, fontFamily: "'Nanum Gothic', sans-serif", lineHeight: '2' }}
                            onClick={(e) => this.setColor(e, 'paragraph')}>
                            Click here to apply the colors and see how it will look.
                        <br />
                            <br />
                            1. Pick a base color; <br />
                            2. Apply HSL Filters: For every consecutive color choose Hue, Saturation and Light changes.
                            Change step values to specify how frequently the change will be applied (e.g. hue value will change every 2nd square);
                           <br />
                            3. Have fun!
                            </p>
                        <br />
                        <div style={{ margin: '15px 0' }}>
                            <Button
                                onClick={(e) => this.setColor(e, 'primaryButton')} id="try-button-primary"
                                style={{ backgroundColor: primaryButton, color: primaryButtonFont }}>
                                <div    onClick={(e) => this.setColor(e, 'primaryButtonFont')} onMouseOver={(e) => e.stopPropagation()} id="try-button-primary-font">Primary </div>
                            </Button>
                            <Button
                                id="try-button-secondary" onClick={(e) => this.setColor(e, 'secondaryButton')}
                                style={{ backgroundColor: secondaryButton, color: secondaryButtonFont, marginLeft: '15px' }}>
                                <div   onClick={(e) => this.setColor(e, 'secondaryButtonFont')} id="try-button-secondary-font"> Secondary</div>
                            </Button>
                        </div>
                        <div style={{ margin: '15px 0' }}>
                            <Button
                                onClick={(e) => this.setColor(e, 'successButton')} id="try-button-success"
                                style={{ backgroundColor: successButton, color: successButtonFont }}>
                                <div   onClick={(e) => this.setColor(e, 'successButtonFont')} id="try-button-success-font"><Icon type="check-circle" /> Success</div>
                            </Button>
                            <Button
                                onClick={(e) => this.setColor(e, 'infoButton')}
                                id="try-button-info" style={{ backgroundColor: infoButton, color: infoButtonFont, marginLeft: '15px' }}>
                                <div   onClick={(e) => this.setColor(e, 'infoButtonFont')} id="try-button-info-font"><Icon type="info-circle" /> Info</div>
                            </Button>
                            <Button
                                onClick={(e) => this.setColor(e, 'dangerButton')}
                                id="try-button-danger" style={{ backgroundColor: dangerButton, color: dangerButtonFont, marginLeft: '15px' }}>
                                <div   onClick={(e) => this.setColor(e, 'dangerButtonFont')} id="try-button-danger-font"><Icon type="warning" /> Danger</div>
                            </Button>
                        </div>
                    </Card >
                
                <Icon type="export" style={exportJSONButtonStyle} onClick={() => exportJSON(components)} /> 
                <h3> Applied Colors: </h3>
                
                <div style={{display:'flex', justifyContent:'start', flexWrap: 'wrap', overflow: 'auto'}}> 
                {componentsKeys.map(key => 
                    <div style={{padding:'0.4vw', backgroundColor: components[key], fontSize: '9pt', color: new Color(components[key], 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white' }}> { components[key] }</div>)}
                </div>
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TryIt);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Icon } from 'antd';
import Color from '../utilities/Color'
import { exportJSON } from '../utilities/ExportJSON'

let mapStateToProps = (state) => { return { selected: state.SelectedColorReducer.selected } }
let mapDispatchToProps = (dispatch) => { /*return bindActionCreators({ changeBaseColor: changeBaseColor }, dispatch)*/ }
const selectButtonStyle = { color: 'black', padding: '4px', borderRadius: '14px', margin: '5px' }

const SetButton = (props) => {
    let color = new Color(props.background, 0, 0, 'Hex')
    let fontColor = color.hsl.light > 50 ? 'black' : 'white'

    return (<Button onClick={props.onClick} style={{ ...selectButtonStyle, backgroundColor: props.background, color: fontColor }}>
        <span style={{ margin: '0 10px' }}> {props.children} </span></Button>)
}

class TryIt extends Component {
    state = this.initialState;
    get initialState() {
        return {
            components: {
                appBar: '#ffffff',
                title: '#353535',
                header: '#353535',
                header2: '#353535',
                background: '#ffffff',
                primaryButton: '#ffffff',
                secondaryButton: '#ffffff',
                successButton: '#ffffff',
                dangerButton: '#ffffff',
                infoButton: '#ffffff',

                primaryButtonFont: '#353535',
                secondaryButtonFont: '#353535',
                successButtonFont: '#353535',
                dangerButtonFont: '#353535',
                infoButtonFont: '#353535',
                paragraph: '#353535',
            }
        };
    }

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

        return (
            <div style={{ width: '450px',  /*background: '#f5f5f5',*/ }}>

                <div style={{ width: '450px', display: 'inline-block', cursor: 'pointer' }}>
                    <Card style={{}} id="try-background"
                        onClick={(e) => this.setColor(e, 'background')}
                        style={{ backgroundColor: background, borderColor: '#b8b8b8' }}
                        headStyle={{ backgroundColor: appBar }}
                    >
                        <h2
                            style={{
                                color: title, fontFamily: "'Lora', serif",
                                borderBottom: '1px solid #e8e8e8', paddingBottom: '12px',
                            }}
                        >
                            <span id="try-title" onClick={(e) => this.setColor(e, 'title')}>Title </span>

                            <Button style={{ float: 'right' }} onClick={this.reset}> <Icon type="reload" />  </Button>
                        </h2>
                        <br />
                        <h2 style={{ color: header, fontFamily: "'Lora', serif" }} id="try-header" onClick={(e) => this.setColor(e, 'header')}> Header </h2>
                        <p id="try-text"
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
                        <br /><br />
                        <div style={{ margin: '15px 0' }}>
                            <Button
                                onClick={(e) => this.setColor(e, 'primaryButton')} id="try-button-primary"
                                style={{ backgroundColor: primaryButton, color: primaryButtonFont }}>
                                <div onClick={(e) => this.setColor(e, 'primaryButtonFont')} onMouseOver={(e) => e.stopPropagation()} id="try-button-primary-font">Primary </div>
                            </Button>
                            <Button
                                id="try-button-secondary" onClick={(e) => this.setColor(e, 'secondaryButton')}
                                style={{ backgroundColor: secondaryButton, color: secondaryButtonFont, marginLeft: '15px' }}>
                                <div onClick={(e) => this.setColor(e, 'secondaryButtonFont')} id="try-button-secondary-font"> Secondary</div>
                            </Button>
                        </div>
                        <div style={{ margin: '15px 0' }}>
                            <Button
                                onClick={(e) => this.setColor(e, 'successButton')} id="try-button-success"
                                style={{ backgroundColor: successButton, color: successButtonFont }}>
                                <div onClick={(e) => this.setColor(e, 'successButtonFont')} id="try-button-success-font"><Icon type="check-circle" /> Success</div>
                            </Button>
                            <Button
                                onClick={(e) => this.setColor(e, 'infoButton')}
                                id="try-button-info" style={{ backgroundColor: infoButton, color: infoButtonFont, marginLeft: '15px' }}>
                                <div onClick={(e) => this.setColor(e, 'infoButtonFont')} id="try-button-info-font"><Icon type="info-circle" /> Info</div>
                            </Button>
                            <Button
                                onClick={(e) => this.setColor(e, 'dangerButton')}
                                id="try-button-danger" style={{ backgroundColor: dangerButton, color: dangerButtonFont, marginLeft: '15px' }}>
                                <div onClick={(e) => this.setColor(e, 'dangerButtonFont')} id="try-button-danger-font"><Icon type="warning" /> Danger</div>
                            </Button>
                        </div>
                    </Card >
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TryIt);

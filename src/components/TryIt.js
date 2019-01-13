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
                appBarFont: '#353535',
                header1: '#353535',
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

    reset = () => this.setState(this.initialState)

    setColor = (compName) => {
        let newColors = this.state.components
        newColors[compName] = this.props.selected
        this.setState({ components: newColors })
    }

    render() {
        let components = this.state.components
        const { appBar, appBarFont, header1, header2,
            background, primaryButton, secondaryButton, successButton,
            dangerButton, infoButton, primaryButtonFont,
            secondaryButtonFont, successButtonFont, dangerButtonFont, infoButtonFont, paragraph } = components
        let selectedColor = this.props.selected
        let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

        return (
            <div style={{ width: '450px', textAlign: 'left' }}>

                <Card
                    style={{ backgroundColor: background }}
                    headStyle={{ backgroundColor: appBar }}
                    title={<h3 style={{ color: appBarFont }} >Awesome Title</h3>}>
                    <h3 style={{ color: header1 }}> Header </h3>
                    <p style={{ color: paragraph }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        <br />
                        <br />
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <br />
                    <div style={{ margin: '15px 0' }}>
                        <Button style={{ backgroundColor: primaryButton, color: primaryButtonFont }}> Primary </Button>
                        <Button style={{ backgroundColor: secondaryButton, color: secondaryButtonFont, marginLeft: '15px' }}> Secondary </Button>
                    </div>
                    <div style={{ margin: '15px 0' }}>
                        <Button style={{ backgroundColor: successButton, color: successButtonFont }}> <Icon type="check-circle" /> Success </Button>
                        <Button style={{ backgroundColor: infoButton, color: infoButtonFont, marginLeft: '15px' }}> <Icon type="info-circle" /> Info </Button>
                        <Button style={{ backgroundColor: dangerButton, color: dangerButtonFont, marginLeft: '15px' }}> <Icon type="warning" /> Danger </Button>
                    </div>
                </Card >
                <br />

                <div>

                    <h3 style={{ margin:'15px 0' }}> Apply Color:
                        <Button style={{ float: 'right', marginLeft:'5px' }} onClick={() => exportJSON(components)}> ExportJSON  </Button>
                        <Button style={{ float: 'right' }} onClick={this.reset}> <Icon type="reload" />  </Button>
                    </h3>
                    <h3
                        style=
                        {{
                            backgroundColor: selectedColor, padding: '15px 0', textAlign: 'center', color: selectedColorFont,
                            border: '1px solid ' + selectedColorFont
                        }}>
                        {selectedColor}
                    </h3>

                    <h3 > Backgrounds:</h3>
                    <SetButton background={appBar} onClick={() => this.setColor('appBar')}> App Bar </SetButton>
                    <SetButton background={background} onClick={() => this.setColor('background')}> Background </SetButton>
                    <SetButton background={primaryButton} onClick={() => this.setColor('primaryButton')}> Primary Button</SetButton>
                    <SetButton background={secondaryButton} onClick={() => this.setColor('secondaryButton')}> Secondary Button</SetButton>
                    <SetButton background={successButton} onClick={() => this.setColor('successButton')}> Success Button </SetButton>
                    <SetButton background={infoButton} onClick={() => this.setColor('infoButton')}> Info Button </SetButton>
                    <SetButton background={dangerButton} onClick={() => this.setColor('dangerButton')}> Danger Button </SetButton>

                    <h3 > Fonts:</h3>
                    <SetButton background={appBarFont} onClick={() => this.setColor('appBarFont')}> App Bar </SetButton>
                    <SetButton background={header1} onClick={() => this.setColor('header1')}> Header </SetButton>
                    <SetButton background={paragraph} onClick={() => this.setColor('paragraph')}> Paragraph </SetButton>
                    <SetButton background={primaryButtonFont} onClick={() => this.setColor('primaryButtonFont')}> Primary Button  </SetButton>
                    <SetButton background={secondaryButtonFont} onClick={() => this.setColor('secondaryButtonFont')}> Secondary Button  </SetButton>
                    <SetButton background={successButtonFont} onClick={() => this.setColor('successButtonFont')}> Success Button  </SetButton>
                    <SetButton background={infoButtonFont} onClick={() => this.setColor('infoButtonFont')}> Info Button  </SetButton>
                    <SetButton background={dangerButtonFont} onClick={() => this.setColor('dangerButtonFont')}> Danger Button  </SetButton>

                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TryIt);

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

    reset = () => this.setState(this.initialState)

    setColor = (e, compName) => {
        e.stopPropagation()
        let newColors = this.state.components
        newColors[compName] = this.props.selected
        this.setState({ components: newColors })
    }

    render() {
        let components = this.state.components
        const { appBar, title, header, header2,
            background, primaryButton, secondaryButton, successButton,
            dangerButton, infoButton, primaryButtonFont,
            secondaryButtonFont, successButtonFont, dangerButtonFont, infoButtonFont, paragraph } = components
        let selectedColor = this.props.selected
        let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

        return (
            <div style={{ width: '450px',  /*background: '#f5f5f5',*/ }}>
                <h2>
                   {/* Apply Color*/}
                    <div
                        style=
                        {{
                            backgroundColor: selectedColor, padding: '10px 20px', margin: '15px', textAlign: 'center', color: selectedColorFont,
                            border: '1px solid ' + selectedColorFont, display: 'inline', fontSize: '14px'
                        }}>
                        {selectedColor}
                    </div>
                   {/* <Button style={{ float: 'right', marginLeft: '5px' }} onClick={() => exportJSON(components)}> ExportJSON  </Button>*/}
                    <Button style={{ float: 'right' }} onClick={this.reset}> <Icon type="reload" />  </Button>
                </h2>

                <br />

                <div style={{ width: '450px', display: 'inline-block' }}>
                    <Card style={{}} id="try-background"
                        onClick={(e) => this.setColor(e, 'background')}
                        style={{ backgroundColor: background, borderColor:'black' }}
                        headStyle={{ backgroundColor: appBar }}
                    >
                        <h2 id="try-title"
                            style={{
                                color: title, fontFamily: "'Lora', serif",
                                borderBottom: '1px solid #e8e8e8', paddingBottom: '12px',
                            }}
                            onClick={(e) => this.setColor(e, 'title')}> Title</h2>
                        <br />
                        <h2 style={{ color: header, fontFamily: "'Lora', serif" }} id="try-header" onClick={(e) => this.setColor(e, 'header')}> Header </h2>
                        <p id="try-text" 
                        style={{ color: paragraph, fontFamily: "'Nanum Gothic', sans-serif", lineHeight:'2' }} 
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

                {/*}
                <div style={{ display: 'inline-block', verticalAlign: 'top', width: '320px', marginLeft: '24px' }}>
                    {/*} <h3> Selected Color: </h3>
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
                    <SetButton background={title} onClick={() => this.setColor('title')}> App Bar </SetButton>
                    <SetButton background={header} onClick={() => this.setColor('header')}> Header </SetButton>
                    <SetButton background={paragraph} onClick={() => this.setColor('paragraph')}> Paragraph </SetButton>
                    <SetButton background={primaryButtonFont} onClick={() => this.setColor('primaryButtonFont')}> Primary Button  </SetButton>
                    <SetButton background={secondaryButtonFont} onClick={() => this.setColor('secondaryButtonFont')}> Secondary Button  </SetButton>
                    <SetButton background={successButtonFont} onClick={() => this.setColor('successButtonFont')}> Success Button  </SetButton>
                    <SetButton background={infoButtonFont} onClick={() => this.setColor('infoButtonFont')}> Info Button  </SetButton>
                    <SetButton background={dangerButtonFont} onClick={() => this.setColor('dangerButtonFont')}> Danger Button  </SetButton>
                </div>
                    */}

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TryIt);

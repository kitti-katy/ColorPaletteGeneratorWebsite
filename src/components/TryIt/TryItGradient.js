import React, { Component } from "react";
import { connect } from "react-redux";
import Color from '../../utilities/Color'
import { exportJSON } from '../../utilities/ExportJSON';
import { ExportJSONButton } from '../ExportJSONButton'
import { Icon } from "@blueprintjs/core";
import "./TryIt.scss"
import { GoldenRatio } from "../GoldenRatio";
import { borderStyle } from '../../styles'
import { Tooltip, Slider } from 'antd'
import { Label } from "@blueprintjs/core";

let mapStateToProps = (state) => { return { selected: state.SelectedColorReducer.selected } }
let mapDispatchToProps = (dispatch) => { /*return bindActionCreators({ changeBaseColor: changeBaseColor }, dispatch)*/ }

class TryItGradient extends Component {
    state = this.initialState;
    get initialState() {
        return {
            gradientColors: ['#81042b', '#9a6a79', '#dda7b8', '#040102'],
            numberOfColors: 4
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

    reset = (e) => { e.stopPropagation(); this.setState(this.initialState) }

    setNumberOfColors = (n) => {
        let oldN = this.state.numberOfColors
        let gradientColors = Array.from(this.state.gradientColors)
        console.log(n - oldN)
        if (n > oldN)
            for (let i = 0; i < n - oldN; i++) {
                gradientColors.push('#ffffff')
            }
        if (n < oldN) {
            for (let i = 0; i <  oldN - n; i++) {
                gradientColors.pop()
            }
        }
        console.log(gradientColors)
        this.setState({ numberOfColors: n, gradientColors: gradientColors }, this.setHoverEffects)
    }
    setColor = (e, colorIndex) => {
        e.stopPropagation()
        let newColors = this.state.gradientColors
        newColors[colorIndex] = this.getSelectedColor()
        this.setState({ gradientColors: newColors })
    }
    // selectedColor when passed from a compononent
    getSelectedColor = () => this.props.selectedColor != null ? this.props.selectedColor : this.props.selected


    render() {
        let gradientColors = this.state.gradientColors
        let selectedColor = this.getSelectedColor()

        let gradientString = "linear-gradient(to right," + gradientColors.join(',') + ")"

        let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

        return (
            <div style={{ width: '100%', background: 'white', height: '-webkit-fill-available', border: borderStyle }} >
                <GoldenRatio
                    direction="horizontal"
                    longFirst={true}
                    shortChild={
                        <div className="try-colors-container" style={{ backgroundImage: gradientString }}>
                            {gradientColors.map(
                                (color, i) =>
                                    <div style={{ padding: '10px', width: '100%', }}
                                        onClick={(e) => this.setColor(e, i)} id={'gradient-' + i} />
                            )}
                        </div>
                    }
                    longChild={
                        <div style={{ direction: 'rtl', padding: '24px', borderRight: '2px dashed rgb(202, 210, 221)', height: '-webkit-fill-available', lineHeight: '2' }}>
                            <div style={{ color: 'rgb(97, 97, 97)' }}>
                                <Tooltip placement="top" title={"Reset Applied Colors"}>
                                    <Icon icon="repeat" onClick={this.reset} style={{ cursor: 'pointer' }} />
                                </Tooltip>
                                <ExportJSONButton onClick={() => exportJSON(gradientColors)} /></div>
                            <br />
                            <div className="hsl-slider">
                                <Label className="slider-label" style={{ textAlign: 'right' }}>Number of Gradients</Label>
                                <Slider className="slider-input" min={2} max={8} onChange={this.setNumberOfColors} value={this.state.numberOfColors} />
                            </div>

                            <br />
                            <h4> Gradient Colors </h4>

                            <div className="applied-colors-container">
                                {gradientColors.map(color =>
                                    <div className="applied-color"
                                        style={{ backgroundColor: color, color: new Color(color, 0, 0, 'Hex').hsl.light > 40 ? 'rgb(33, 33, 33)' : 'white' }}>
                                        {color}
                                    </div>)}
                            </div>

                        </div>}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TryItGradient);

import React, { Component } from "react";
import { Icon } from "@blueprintjs/core";
import { borderStyle } from '../../styles'
import TryItGradient from "./TryItGradient";
import TryIt from "./TryIt";
import { SelectedColorPanel } from "../SelectedColorPanel";
import { connect } from "react-redux";


let mapStateToProps = (state) => {
    return {
        selected: state.SelectedColorReducer.selected
    }
}

const switchers = [
    {
        label: 'Web App', component: () => <TryIt />
    },
    {
        label: 'Gradient', component: () => <TryItGradient />
    }]

class TryMain extends Component {
    state = {
        selectedTryIndex: 0
    }
    switchNext = () => {
        let selected = this.state.selectedTryIndex
        if (selected == switchers.length - 1)
            this.setState({ selectedTryIndex: 0 })
        else
            this.setState({ selectedTryIndex: selected + 1 })
    }
    switchPrevious = () => {
        let selected = this.state.selectedTryIndex
        if (selected == 0)
            this.setState({ selectedTryIndex: switchers.length - 1 })
        else
            this.setState({ selectedTryIndex: selected - 1 })
    }

    render() {
        const selectedTryIndex = this.state.selectedTryIndex

        const label = switchers[selectedTryIndex].label
        const tryComponent = switchers[selectedTryIndex].component()

        return (
            <div style={{ width: '100%', background: 'white', border: borderStyle }} >
                <div className='horizontal-holder-ls' style={{ padding: '8px' }}>
                    <div/>
                    <div style={{ textAlign: 'center' }}>

                        <Icon icon="arrow-left" className="arrow-btn" onClick={this.switchPrevious} />
                        {label}
                        <Icon icon="arrow-right" className="arrow-btn" style={{ marginLeft: '16px' }} onClick={this.switchNext} />

                        <SelectedColorPanel selectedColor={this.props.selected} />

                    </div>
                </div>
                {tryComponent}
            </div>
        )
    }
}

export default connect(mapStateToProps)(TryMain);

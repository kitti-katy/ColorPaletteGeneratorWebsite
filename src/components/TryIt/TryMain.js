import React, { Component } from "react";
import { Icon } from "@blueprintjs/core";
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
        label: 'WEB', component: () => <TryIt />
    },
    {
        label: 'GRADIENT', component: () => <TryItGradient />
    }/*,
    {
        label: 'IMAGE', component: () => <TryItGradient />
    },
    {
        label: 'PIXEL ART', component: () => <TryItGradient />
    },
    {
        label: 'SHADER', component: () => <TryItGradient />
    }*/]

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
    setSelected = (i) => this.setState({ selectedTryIndex: i })

    render() {
        const selectedTryIndex = this.state.selectedTryIndex
        //<SelectedColorPanel selectedColor={this.props.selected} />

        const label = switchers[selectedTryIndex].label
        const tryComponent = switchers[selectedTryIndex].component()

        return (
            <div className='try-holder'>
                <div className="select-mode-table">
                    {switchers.map(
                        (option, i) => <div key={"switcher" + i} onClick={() => this.setSelected(i)} className={i == selectedTryIndex ? 'selected-mode' : ''}><div> {option.label}</div> </div>)}
                </div>
                {tryComponent}
            </div>
        )
    }
}

export default connect(mapStateToProps)(TryMain);

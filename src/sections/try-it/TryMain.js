import React, { Component } from "react";
import TryItGradient from "./TryItGradient";
import TryWeb from "./TryWeb";
import { connect } from "react-redux";
import TryPixelArt from "./TryPixelArt";

let mapStateToProps = (state) => {
    return {
        selected: state.SelectedColorReducer.selected
    }
}

const switchers = [
    {
        label: 'WEB', component: () => <TryWeb />
    },
    {
        label: 'GRADIENT', component: () => <TryItGradient />
    },
    {
        label: 'PIXEL ART', component: () => <TryPixelArt />
    }
    /*,
    {
        label: 'IMAGE', component: () => <TryItGradient />
    },
    {
        label: 'PIXEL ART', component: () => <TryPixelArt />
    },
    {
        label: 'SHADER', component: () => <TryItGradient />
    }*/]

class TryMain extends Component {
    state = {
        selectedTryIndex: 0
    }

    setSelected = (i) => this.setState({ selectedTryIndex: i })

    render() {
        const selectedTryIndex = this.state.selectedTryIndex

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

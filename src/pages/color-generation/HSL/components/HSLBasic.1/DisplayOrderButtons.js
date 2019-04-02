import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setDisplayOrder } from '../../../../../redux/HSLBasicReducer'
import { Icon } from "@blueprintjs/core";
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ setDisplayOrder: setDisplayOrder }, dispatch) }

const displayOptions = [['h', 's', 'l'], ['h', 'l', 's'], ['s', 'h', 'l'], ['l', 'h', 's'], ['s', 'l', 'h'], ['l', 's', 'h']]

class DisplayOrderButtons extends Component {
    state = { selectedDisplayOption: 0 };

    setLevels = (i) => this.props.setDisplayOrder(displayOptions[i][0], displayOptions[i][1], displayOptions[i][2])

    handleChangeOrderUpClick = () => {
        let next = this.state.selectedDisplayOption + 1
        next = next == displayOptions.length ? 0 : next
        this.setState({ selectedDisplayOption: next })
        this.setLevels(next)
    }
    handleChangeOrderDownClick = () => {
        let next = this.state.selectedDisplayOption - 1
        next = next == -1 ? displayOptions.length - 1 : next
        this.setState({ selectedDisplayOption: next })
        this.setLevels(next)
    }

    render() {
        return (
            <div>
                {/* Change Order Up */}
                <Icon icon="arrow-up" className="arrow-btn" onClick={this.handleChangeOrderUpClick} />
                {/* Change Order Down*/}
                <Icon icon="arrow-down" className="arrow-btn" onClick={this.handleChangeOrderDownClick} />
            </div>

        );
    }
}

export default connect(null, mapDispatchToProps)(DisplayOrderButtons);

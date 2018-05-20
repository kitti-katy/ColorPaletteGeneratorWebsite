import React, {Component} from 'react';

class TopMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={style.mainHolder}>


            </div>
        );
    }
}

const style = {
    mainHolder: {
        gridRow: 1,
        gridColumn: '1 / 3',
        backgroundColor: 'green',
    }
}


export default TopMenu;
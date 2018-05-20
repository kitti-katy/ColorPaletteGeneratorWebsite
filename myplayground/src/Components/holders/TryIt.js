import React, {Component} from 'react';

class TryIt extends Component {
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
        gridRow: '2 / 3',
        gridColumn: 2,
        backgroundColor: 'red',
    }
}


export default TryIt;
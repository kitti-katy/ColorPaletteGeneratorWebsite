import React, {Component} from 'react';
import TopMenu from "./TopMenu";
import Filters from "./Filters";
import TryIt from "./TryIt";

class MainHolder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={style.mainHolder}>
                <div style={style.topMenu}></div>
                <div style={style.filters}>
                    <Filters/>
                </div>\
                <div style={style.tryIt}></div>
            </div>
        );
    }
}

const style = {
    mainHolder: {
        height: '100%',
        margin: '5%',
        display: 'grid',
        gridGap: '50px',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '100px auto ',
        backgroundColor: 'grey',
    },
    topMenu:{
        gridRow: 1,
        gridColumn: '1 / 3',
        backgroundColor: 'black',
    },
    filters:{
        gridRow: '2 / 3',
        gridColumn: 1,
        backgroundColor: 'white',
    },
    tryIt:{
        gridRow: '2 / 3',
        gridColumn: 2,
        backgroundColor: 'white',
    },


}


export default MainHolder;
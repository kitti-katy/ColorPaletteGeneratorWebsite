import React, {Component} from 'react';
import {HSL} from "../Filters/HSL";
import * as _ from "lodash";

class Filters extends Component {
    constructor(props) {
        super(props);

    }



    render() {
        return (
            <div style={style.mainHolder}>

                <div style={style.filtersMenu}>
                    {
                        menuHeaders.map(header =>
                            <p style={{display:'inline', float:'left', marginLeft:'2%'}}>{header}</p>
                        )
                    }
                </div>

                <div style={style.filtersBody}>
                    <HSL/>
                </div>

                <div style={style.commonFilters}></div>

            </div>
        );
    }
}

const menuHeaders = ['HSL', 'Starndards', 'Custom', 'From Picture' ]

const style = {
    mainHolder: {
        width: '100%',
        height: '100%',
        display: 'grid',
        gridGap: '2.5%',
        gridTemplateColumns: 'auto',
        gridTemplateRows: '50px auto 200px ',
    },
    filtersMenu:{
        gridRow: 1,
    },
    filtersBody:{
        gridRow: 2,
        backgroundColor: 'green',
    },
    commonFilters:{
        gridRow: 3,
        backgroundColor: 'black',
    }
}


export default Filters;
/**
 * Created by kate on 3/10/18.
 */
/**
 * Created by kate on 3/3/18.
 */
import React, {Component} from 'react';

class TryItPage extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div style = {{...paletteStyle.container, backgroundColor:this.props.button}}>

                <div >  </div>
                <h1 style = {{color:this.props.header}}> Header 1 </h1>
                <p style = {{color:this.props.text}}> <span  > Sample: </span>
                    Bacon ipsum dolor sit amet salami ham hock ham, hamburger corned beef short ribs kielbasa biltong t-bone drumstick tri-tip tail sirloin pork chop.
                    Kielbasa turducken turkey cow shoulder pig prosciutto
                    <span >hamburger corned beef</span>
                    short loin, meatloaf tri-tip drumstick.
                    Shankle sirloin ground round fatback, cow pancetta boudin t-bone pig.
                    Ham short ribs cow tri-tip ribeye beef ribs boudin.
                    Short ribs pork belly leberkas salami chuck, pork loin ball tip tenderloin turkey chicken pork chop filet mignon biltong.
                </p>

                <button> Button 1 </button>

            </div>
        );
    }
}

const paletteStyle = {
    container: {
        width: '40%',
        padding: '25px',
        marginLeft: '300px'
    }
}


export default TryItPage;
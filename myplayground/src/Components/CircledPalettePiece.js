/**
 * Created by kate on 3/10/18.
 */
import React, {Component} from 'react';

class CircledPalettePiece extends Component {
    constructor(props) {
        super(props);

        this.generatePoints = this.generatePoints.bind(this)
        this.getTriangle = this.getTriangle.bind(this)
    }


    generatePoints(angle)
    {
        let x = 75
        let y = 20
        let c = 75
        angle = (angle ) * (Math.PI/180); // Convert to radians
        let rotatedX = Math.cos(angle) * (x - c) - Math.sin(angle) * (y - c) + c;
        let rotatedY = Math.sin(angle) * (x - c) + Math.cos(angle) * (y - c) + c;
        return {x: rotatedX,
            y: rotatedY};

    }

    getTriangle(rotationAngle, n){
        let newPointA = this.generatePoints(n*rotationAngle)
        let newPointB = this.generatePoints((n+1)*rotationAngle)
        let coordinates = '75,75 ' + newPointA.x + ', ' + newPointA.y + ' ' + newPointB.x + ', ' + newPointB.y
        return coordinates
    }

    render(){
        return (
            <polygon points={this.getTriangle(this.props.angle, this.props.numberOfColor)} style={{fill:this.props.color.HEXString}} />
        );
    }
}


export default CircledPalettePiece;
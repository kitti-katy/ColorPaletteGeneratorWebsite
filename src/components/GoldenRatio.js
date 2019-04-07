
import React from "react";

export const GoldenRatio = (props) => {
    // direction: vertical or horizontal
    // longFirst : true
    // long
    // short
    const { direction, longFirst, longChild, shortChild } = props

    // styling
    let isVertical = direction == 'vertical'
    let measure = isVertical ? 'height' : 'width'
    let maxMeasure = !isVertical ? 'height' : 'width'
    let firstStyle = {}, secondStyle = {}
    firstStyle[measure] = longFirst ? '62%' : '38%'
    secondStyle[measure] = longFirst ? '38%' : '62%'
    firstStyle[maxMeasure] = '-webkit-fill-available'
    secondStyle[maxMeasure] = '-webkit-fill-available'
    if (!isVertical) {
        firstStyle.display = 'inline-block'
        secondStyle.display = 'inline-block'
        firstStyle.verticalAlign = 'top'
        secondStyle.verticalAlign = 'top'
    }


    // apply styling
    let long = <div style={longFirst ? firstStyle : secondStyle}>{longChild}</div>
    let short = <div style={longFirst ? secondStyle : firstStyle}>{shortChild}</div>

    return (
        <div style={{ display: direction == 'vertical' ? 'inline-table' : 'inherit', height: '-webkit-fill-available', width: '100%', ...props.style }}>
            {longFirst ? long : short}
            {longFirst ? short : long}
        </div>
    )
}
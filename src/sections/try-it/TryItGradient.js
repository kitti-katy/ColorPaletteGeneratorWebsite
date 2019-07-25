import React, { useState, useContext, useEffect } from "react";
import Color from '../../utilities/Color'
import { exportJSON } from '../../utilities/ExportJSON';
import { Tooltip } from 'antd'
import Slider from '@material-ui/core/Slider';
import AutorenewIcon from '@material-ui/icons/Autorenew'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import IconButton from '@material-ui/core/IconButton';
import * as _ from 'lodash'
import { StoreContext } from '../../Store';

const getInitialGradientColors = () => (["#4dd1f9", "#c9f1fd", "#c9c9fd", "#020345"])


export default function TryItGradient(props) {

    const [historyStack, setHistoryStack] = useState([]);
    const [futureStack, setFutureStack] = useState([]);
    const [showBlindness, setShowBlindness] = useState(true);
    const [componentDidMount, setComponentDidMount] = useState(false);
    const [gradientColors, setGradientColors] = useState(getInitialGradientColors());
    const [numberOfColors, setNumberOfColors] = useState(4);

    const [state] = useContext(StoreContext)
    const { selected, blindness } = state

    useEffect(() => {
        setHoverEffects()
        if (!componentDidMount) {
            pushCurrentStateAndClearFuture()
        }
        setComponentDidMount(true)
    });


    const setHoverEffects = () => {
        let allTryElements = getAllTryElements()
        allTryElements.forEach(el => {
            addMouseEnterListener(el, allTryElements)
            addMouseLeaveListener(el)
            addMouseOverListener(el)
        }
        )
    }
    const getOutlineStyle = () => '3px dotted ' + selected
    const getAllTryElements = () => gradientColors.map((color, i) => document.getElementById('gradient-' + i))
    // add outline
    const addMouseEnterListener = (el, allTryElements) => el.addEventListener("mouseenter", (e) => { allTryElements.forEach(elem => elem.style.outline = 'none'); el.style.outline = getOutlineStyle(); })
    // remove outline when mouse leave
    const addMouseLeaveListener = (el) => el.addEventListener("mouseleave", (e) => e.target.style.outline = 'none')
    // add outline to parent element when mouseleave from inner element
    const addMouseOverListener = (el) => el.addEventListener("mouseover", (e) => {
        e.stopPropagation()
        let innerElements = el.querySelectorAll('*')
        let allNoneHovered = true
        innerElements.forEach(elem => { if (allNoneHovered) allNoneHovered = !elem.style.outline.includes('3px dotted ') })
        el.style.outline = allNoneHovered ? getOutlineStyle() : 'none'
    }
    )

    const reset = (e) => { e.stopPropagation(); pushCurrentStateToHistory(); setGradientColors(getInitialGradientColors); setNumberOfColors(4) }

    const handleNumberOfColorsInputChange = (e, n) => {
        let oldN = numberOfColors
        let newGradientColors = Array.from(gradientColors)
        if (n > oldN)
            for (let i = 0; i < n - oldN; i++) {
                newGradientColors.push('#ffffff')
            }
        if (n < oldN) {
            for (let i = 0; i < oldN - n; i++) {
                newGradientColors.pop()
            }
        }
        setGradientColors(newGradientColors)
        setNumberOfColors(n)

    }
    const setColor = (e, colorIndex) => {
        e.stopPropagation()
        pushCurrentStateAndClearFuture()
        let newColors = gradientColors
        newColors[colorIndex] = selected
        setGradientColors(newColors)
    }


    // Add/Remove History

    // TODO: rename it? 
    const pushCurrentStateAndClearFuture = () => {
        pushCurrentStateToHistory()
        clearFutureStack()
    }

    const pushCurrentStateToHistory = () => {
        let newHistoryStack = Array.from(historyStack)
        let historyGradientColors = getCurrentComponentsStateCopy()
        if (!_.isEqual(newHistoryStack[0], historyGradientColors)) {
            newHistoryStack.push(historyGradientColors)
            setHistoryStack(newHistoryStack)
        }
    }

    
    const clearFutureStack = () =>
        setFutureStack([])


    const undo = () => {
        addCurrentStateToFutureStack()
        setCurrentStateFromHistory()
    }
    const addCurrentStateToFutureStack = () => {
        let newFutureStack = Array.from(futureStack)
        newFutureStack.push(getCurrentComponentsStateCopy())
        setFutureStack(newFutureStack)
    }
    const setCurrentStateFromHistory = () => {
        let newHistoryStack = Array.from(historyStack)
        let newGradientColors = newHistoryStack.pop()
        setHistoryStack(newHistoryStack)
        setGradientColors(newGradientColors)
    }

    const redo = () => {
        pushCurrentStateToHistory()
        setStateFromFuture()
    }
    const setStateFromFuture = () => {
        let newFutureStack = Array.from(futureStack)
        let newGradientColors = newFutureStack.pop()
        setFutureStack(newFutureStack)
        setGradientColors(newGradientColors)
    }

    const getCurrentComponentsStateCopy = () =>
        JSON.parse(JSON.stringify(gradientColors))


    let gradientString = "linear-gradient(to right," + gradientColors.join(',') + ")"

    return (
        <div className='try-web'>

            <div className="try-colors-container" style={{ backgroundImage: gradientString, gridAutoFlow: 'column', display: 'grid' }}>
                {gradientColors.map(
                    (color, i) =>
                        <div style={{ paddingTop: '150px', }} key={color + i}
                            onClick={(e) => setColor(e, i)} id={'gradient-' + i} />
                )}
            </div>

            <div >
                <Slider className="slider-input gradient-slider" style={{ width: '100%' }} min={2} max={8} onChange={handleNumberOfColorsInputChange} value={numberOfColors} tooltipVisible />
            </div>

            <div className="applied-colors-container">
                {gradientColors.map((color, i) =>
                    <div className="applied-color" key={'applied' + color + i}
                        style={{ backgroundColor: color, color: new Color(color, 0, 0, 'Hex').hsl.light > 40 ? 'rgb(33, 33, 33)' : 'white' }}
                        onClick={(e) => setColor(e, i)}>
                    </div>)}
            </div>

            <div className='try-actions-container'>
                <Tooltip placement="bottom" title={"Export JSON"}>
                    <IconButton size='small' onClick={() => exportJSON(gradientColors)} > <CloudDownloadIcon /> </IconButton>
                </Tooltip>

                <Tooltip placement="bottom" title={"Reset Applied Colors"}>
                    <IconButton size='small' onClick={reset} > <AutorenewIcon /></IconButton>
                </Tooltip>

                <IconButton size='small' onClick={undo} disabled={historyStack.length == 0}>
                    <UndoIcon />
                </IconButton>

                <IconButton size='small' onClick={redo} disabled={futureStack.length == 0}>
                    <RedoIcon />
                </IconButton>

            </div>

        </div>
    );
}

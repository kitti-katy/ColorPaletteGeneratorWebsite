import React, { useState, useContext, useEffect } from "react";
import Color from '../../utilities/Color'
import { exportJSON } from '../../utilities/ExportJSON';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import { convertToBlind } from "../../utilities/BlindConversion";
import { Tooltip } from 'antd'
import * as _ from 'lodash'
import { StoreContext } from '../../Store';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';

const tryIds = ["try-background", "try-title", "try-title-background", "try-header", "try-text", "try-button-primary",
    "try-button-primary-font", "try-button-secondary", "try-button-secondary-font", "try-button-success",
    "try-button-warning-font", "try-button-warning",
    "try-button-success-font", "try-button-info", "try-button-info-font", "try-button-danger", "try-button-danger-font"]

const texts = ['title', 'header', 'primaryButtonFont', 'secondaryButtonFont', 'successButtonFont', 'dangerButtonFont', 'warningButtonFont', 'infoButtonFont', 'paragraph']
const backgrounds = ['titleBackground', 'background', 'primaryButton', 'secondaryButton', 'successButton', 'warningButton', 'dangerButton', 'infoButton']

const backgroundColor = '#ffffff'
const textColor = '#030202'

const getInitialComponentsState = () => ({
    background: backgroundColor,
    titleBackground: '#0695c1',
    primaryButton: backgroundColor,
    secondaryButton: backgroundColor,
    successButton: backgroundColor,
    warningButton: backgroundColor,
    dangerButton: backgroundColor,
    infoButton: backgroundColor,

    title: backgroundColor,
    header: textColor,
    primaryButtonFont: textColor,
    secondaryButtonFont: textColor,
    successButtonFont: textColor,
    dangerButtonFont: textColor,
    warningButtonFont: textColor,
    infoButtonFont: textColor,
    paragraph: textColor,
})



export default function TryIt(props) {

    const [historyStack, setHistoryStack] = useState([]);
    const [futureStack, setFutureStack] = useState([]);
    const [showBlindness, setShowBlindness] = useState(true);
    const [hovered, setHoverEffectInPalette] = useState(null);
    const [componentDidMount, setComponentDidMount] = useState(false);
    const [components, setComponents] = useState(getInitialComponentsState());

    const [state] = useContext(StoreContext)
    const { selected, blindness } = state

    useEffect(() => {
        setHoverEffects()
        if (!componentDidMount) {
            pushCurrentStateAndClearFuture()
            setComponentDidMount(true)
        }

    });



    // Add/Remove History

    // TODO: rename it? 
    const pushCurrentStateAndClearFuture = () => {
        pushCurrentStateToHistory()
        clearFutureStack()
    }

    const pushCurrentStateToHistory = () => {
        let newHistoryStack = Array.from(historyStack)
        let components = getCurrentComponentsStateCopy()
        if (!_.isEqual(newHistoryStack[0], components)) {
            newHistoryStack.push(components)
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
        let components = newHistoryStack.pop()
        setHistoryStack(newHistoryStack)
        setComponents(components)
    }

    const redo = () => {
        pushCurrentStateToHistory()
        setStateFromFuture()
    }
    const setStateFromFuture = () => {
        let newFutureStack = Array.from(futureStack)
        let components = newFutureStack.pop()
        setFutureStack(newFutureStack)
        setComponents(components)
    }

    const getCurrentComponentsStateCopy = () =>
        JSON.parse(JSON.stringify(components))

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
    const getAllTryElements = () => tryIds.map(id => document.getElementById(id))
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

    const reset = (e) => {
        e.stopPropagation(); pushCurrentStateToHistory();
        setComponents(getInitialComponentsState)
        setHoverEffectInPalette(null)
    }

    const setColor = (e, compName) => {
        e.stopPropagation()
        pushCurrentStateAndClearFuture()
        let newColors = components
        newColors[compName] = selected
        setComponents(newColors)
    }

    const getTryButton = (component, id, background, font, text) =>
        <Button style={{ backgroundColor: background, color: font }} variant="contained" className='try-button' size='small'
            onClick={(e) => setColor(e, component)} id={id} style={{
                backgroundColor: background, color: font,// border: '1px solid ' + font + '80'
            }}>
            <div onClick={(e) => setColor(e, component + 'Font')} id={id + "-font"}>{text} </div>
        </Button>

    const getBlindComponentsColors = () => {
        let oldComponents = components
        let newComponents = {}
        if (showBlindness && blindness != 'None') {
            Object.keys(oldComponents).forEach(key =>
                newComponents[key] = convertToBlind(new Color(oldComponents[key], 0, 0, 'Hex'), blindness)
            )
            return newComponents
        }

        return oldComponents
    }

    let blindComponents = getBlindComponentsColors()
    const { title, header,
        background, primaryButton, secondaryButton, successButton,
        dangerButton, infoButton, primaryButtonFont, warningButton, warningButtonFont,
        secondaryButtonFont, successButtonFont, dangerButtonFont, infoButtonFont, paragraph, titleBackground } = blindComponents
    let selectedColor = selected

    return (
        <div className='try-web'>


            <Card className="try-card-holder">
                <CardHeader
                    onClick={(e) => setColor(e, 'titleBackground')}
                    title={
                        <span id="try-title" style={{ color: title }} onClick={(e) => setColor(e, 'title')} >Header </span>
                    } style={{ backgroundColor: titleBackground }} id="try-title-background" />
                <CardContent id="try-background" onClick={(e) => setColor(e, 'background')}
                    style={{ backgroundColor: background }}>

                    <Typography variant="h6" gutterBottom style={{ color: header }} id="try-header" onClick={(e) => setColor(e, 'header')}>
                    Title
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom id="try-text" onClick={(e) => setColor(e, 'paragraph')} style={{ color: paragraph }}>
                       {/* Click on the compononets in this section to see how the selected colors look together. You can see what color is currently selected on the left panel.*/}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            {/* Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. */}

                    </Typography>

                    <br />
                    <CardActions>
                        <div style={{ display: 'flex' }}>
                            {getTryButton('primaryButton', "try-button-primary", primaryButton, primaryButtonFont, 'Primary')}
                            {getTryButton('secondaryButton', "try-button-secondary", secondaryButton, secondaryButtonFont, 'Secondary')}
                        </div>
                        <br />
                    </CardActions><CardActions>
                        <div style={{ display: 'flex' }} id="try-buttons-group-2">
                            {getTryButton('successButton', "try-button-success", successButton, successButtonFont, 'Success')}
                            {getTryButton('infoButton', "try-button-info", infoButton, infoButtonFont, 'Info')}
                            {getTryButton('warningButton', "try-button-warning", warningButton, warningButtonFont, 'Warning')}
                            {getTryButton('dangerButton', "try-button-danger", dangerButton, dangerButtonFont, 'Danger')}
                        </div>
                    </CardActions>
                </CardContent >
            </Card>

            <div className="applied-colors-container">
                {backgrounds.map((name, i) => {
                    let key = "text_" + name + "_" + i
                    let is_hovered = hovered == key
                    let bg_color = is_hovered ? selectedColor : blindComponents[name]
                    return (
                        <div className="applied-color" key={key}
                            onMouseOver={() => setHoverEffectInPalette(name)}
                            onMouseLeave={() => setHoverEffectInPalette(null)}
                            onClick={(e) => setColor(e, name)}
                            style={{ backgroundColor: bg_color }} />)
                }
                )}
                {texts.map((key, i) =>
                    <div className="applied-color" key={"bg_" + key + "_" + i}
                        onClick={(e) => setColor(e, key)}
                        style={{ backgroundColor: blindComponents[key] }}>
                        {}
                    </div>)}
            </div>

            <div className='try-actions-container'>

                <Tooltip placement="bottom" title={"Export JSON"}>
                    <IconButton size='small' onClick={(e) => { e.stopPropagation(); exportJSON(blindComponents) }}> <GetAppIcon /> </IconButton>
                </Tooltip>

                <Tooltip placement="bottom" title={"Reset Applied Colors"}>
                    <IconButton size='small' onClick={reset}> <AutorenewIcon />  </IconButton>
                </Tooltip>

                <IconButton size='small' onClick={undo} disabled={historyStack.length == 0}>
                    <UndoIcon />
                </IconButton>

                <IconButton size='small' onClick={redo} disabled={futureStack.length == 0}>
                    <RedoIcon />
                </IconButton>

                <Tooltip placement="bottom" title={showBlindness ? "Hide blind colors" : "Show blind colors"}>
                    <IconButton size='small' onClick={() => setShowBlindness(!showBlindness)}>
                        {showBlindness && <VisibilityOffIcon /> || <VisibilityIcon />}
                    </IconButton>
                </Tooltip>

            </div>

        </div>
    );
}

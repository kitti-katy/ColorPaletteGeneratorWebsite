import React, { createContext, useReducer } from 'react';
import Color from './utilities/Color'

export const StoreContext = createContext({})

const initialState = {
    baseColor: new Color('#81042b', 0, 0, 'Hex'),
    selected: new Color('#81042b', 0, 0, 'Hex').HEXString,
    hueSplit: 1, satSplit: 4, lightSplit: 4,
    blindness: 'None'
};

const changeStateMappings = {
    'changeBaseColor': 'baseColor',
    'setHueSplit': 'hueSplit',
    'setSatSplit': 'satSplit',
    'setLightSplit': 'lightSplit',
    'selectColor': 'selected',
    'setBlindness': 'blindness'
}

function reducer(state, action) {
    let stateName = changeStateMappings[action.type]
    if (stateName)
        return { ...state, [stateName]: action.payload }
    throw new Error('Action type must be defined')
}

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <StoreContext.Provider value={[state, dispatch]}>{children}</StoreContext.Provider>
    )
}

export default Store;
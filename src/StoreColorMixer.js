import React, { createContext, useReducer } from 'react';
import Color from './utilities/Color'

export const StoreContext = createContext({})

const initialState = {
    selectedColorsMixer: [],
    firstColorMixer: new Color(240, 200, 210, 'RGB'),
    mixerMode: 'MIX COLORS'
};


function reducer(state, action) {
    //let stateName = changeStateMappings[action.type]
    if (action.name)
        return { ...state, [action.name]: action.value }
    throw new Error('State name must be defined')
}

const StoreColorMixer = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <StoreContext.Provider value={[state, dispatch]}>{children}</StoreContext.Provider>
    )
}

export default StoreColorMixer;
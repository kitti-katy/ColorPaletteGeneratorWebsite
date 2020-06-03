import React, { createContext, useReducer } from 'react';
import Color from './utilities/Color'

export const StoreContext = createContext({})

const initialState = {
    baseColor: new Color('#0695c1', 0, 0, 'Hex'),
    selected: '#0695c1',
    hueSplit: 8, satSplit: 4, lightSplit: 4,
    blindness: 'None',
    hueChange: 27, satChange: 0, lightChange: 20,
    hueStep: 1, satStep: 1, lightStep: 1,
    numberOfColors: 72, 
    filterMode: 'BASIC',
    picturePalettes: [],
    picturePalettesQuantized: [],
    aiNumberOfColorsIndex: 1,
    categories: 'opencountry',
    withBaseColorAi: false,
    aiAlgorithm: 'Agglomerative Clustering',
    GRNumberOfColorsIndex: 1,
    selectedAIDataset: 'Landscape',
    openMainTour: false,
    mainLoaded: false,
    selectionOn: false,
    colorsSelectedToExport: new Set(),
    exportColorsDialogueOpen: false,
    exportSelectedColorFormat: 'Hex #',
    exportFormat: 'None',
    exportTileWidth: 12.5,
    landingColors: []
};


function reducer(state, action) {
    //let stateName = changeStateMappings[action.type]
    if (action.name)
        return { ...state, [action.name]: action.value }
    throw new Error('State name must be defined')
}

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <StoreContext.Provider value={[state, dispatch]}>{children}</StoreContext.Provider>
    )
}

export default Store;
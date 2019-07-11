import Color from '../utilities/Color'
export const baseColorInitialState = new Color('#81042b', 0, 0, 'Hex') ;
export const baseColorReducer = (state, action) => action;

// baseColor, changeBaseColor
// layout, changeLayout

export const selectedInitialState = new Color('#81042b', 0, 0, 'Hex').HEXString  ;
export const selectedReducer = (state, action) => action;

// BASIC
export const hueSplitInitialState = 1;
export const hueSplitReducer = (state, action) => action;

export const satSplitInitialState = 4 ;
export const satSplitReducer = (state, action) => action;

export const lightSplitInitialState = 4 ;
export const lightSplitReducer = (state, action) => action;

// Display order
// REMOVE IT?

export const l1InitialState = 'h' ;
export const l1Reducer = (state, action) => action;
export const l2InitialState = 's' ;
export const l2Reducer = (state, action) => action;
export const l3InitialState = 'l' ;
export const l3Reducer = (state, action) => action;

export const blindnessInitialState = 'None' ;
export const blindnessReducer = (state, action) => action;

export const InitialState = new Color('#81042b', 0, 0, 'Hex') ;
export const Reducer = (state, action) => action;

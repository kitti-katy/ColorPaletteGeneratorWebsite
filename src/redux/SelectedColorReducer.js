import Color from '../utilities/Color'
const SELECT_COLOR = 'SELECT_COLOR'
/* ---------------------- Actions ---------------------- */
export let selectColor = (color) => { return { type: SELECT_COLOR, color } }

/* ---------------------- Initial State ---------------------- */
const initial_state = { selected: new Color(200, 20, 50, 'HSL').HEXString };

/* ---------------------- Export Reducer ---------------------- */
export const SelectedColorReducer = (state = initial_state, action) =>  action.type == SELECT_COLOR ? { ...state, selected: action.color, } : state


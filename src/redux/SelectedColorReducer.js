import Color from '../utilities/Color'
const SELECT_COLOR = 'SELECT_COLOR'
/* ---------------------- Actions ---------------------- */
export let selectColor = (color) => { return { type: SELECT_COLOR, color } }

/* ---------------------- Initial State ---------------------- */
const initial_state = { selected: new Color('#edb407', 0, 0, 'Hex').HEXString };

/* ---------------------- Export Reducer ---------------------- */
export const SelectedColorReducer = (state = initial_state, action) =>  action.type == SELECT_COLOR ? { ...state, selected: action.color, } : state


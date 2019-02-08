import Color from '../utilities/Color'
const CHANGE_COLOR = 'CHANGE_COLOR'
/* ---------------------- Actions ---------------------- */
export let changeBaseColor = (color) => { return { type: CHANGE_COLOR, color } }

/* ---------------------- Initial State ---------------------- */
const initial_state = { baseColor: new Color('#edb407', 0, 0, 'Hex') };

/* ---------------------- Export Reducer ---------------------- */
export const BaseColorReducer = (state = initial_state, action) =>  action.type == CHANGE_COLOR ? { ...state, baseColor: action.color, } : state


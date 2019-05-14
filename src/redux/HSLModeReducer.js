
const CHANGE_MODE = 'CHANGE_MODE'
/* ---------------------- Actions ---------------------- */
export let changeHSLMode = (isAdvanced) => { return { type: CHANGE_MODE, isAdvanced } }

/* ---------------------- Initial State ---------------------- */
const initial_state = { isAdvanced: false };

/* ---------------------- Export Reducer ---------------------- */
export const HSLModeReducer = (state = initial_state, action) =>  action.type == CHANGE_MODE ? { ...state, isAdvanced: action.isAdvanced, } : state


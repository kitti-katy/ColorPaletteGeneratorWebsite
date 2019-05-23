
const SET_BLINDNESS = 'SET_BLINDNESS'
/* ---------------------- Actions ---------------------- */
export let setBlindness = (blindnessType) => { return { type: SET_BLINDNESS, blindnessType } }

/* ---------------------- Initial State ---------------------- */
const initial_state = { blindness: 'None' };

/* ---------------------- Export Reducer ---------------------- */
export const ColorBlindnessReducer = (state = initial_state, action) =>  action.type == SET_BLINDNESS ? { ...state, blindness: action.blindnessType, } : state


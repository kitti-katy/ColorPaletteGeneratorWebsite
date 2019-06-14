
const CHANGE_MODE = 'CHANGE_MODE'

/* ---------------------- Actions ---------------------- */
export let changeFilter = (filterMode) => { return { type: CHANGE_MODE, filterMode } }

/* ---------------------- Initial State ---------------------- */
const initial_state = { filterMode: 'BASIC' };

/* ---------------------- Export Reducer ---------------------- */
export const FilterModeReducer = (state = initial_state, action) =>  action.type == CHANGE_MODE ? { ...state, filterMode: action.filterMode } : state


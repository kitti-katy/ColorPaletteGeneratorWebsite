const SWITCH_LAYOUT = 'SWITCH_LAYOUT'
/* ---------------------- Actions ---------------------- */
export let switchLayout = (layout) => { return { type: SWITCH_LAYOUT, layout } }

/* ---------------------- Initial State ---------------------- */
const initial_state = { layout: '1' };

/* ---------------------- Export Reducer ---------------------- */
export const LayoutReducer = (state = initial_state, action) => action.type == SWITCH_LAYOUT ? { ...state, layout: state.layout == '1' ? '2' : '1', } : state


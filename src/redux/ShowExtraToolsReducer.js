const SHOW_EXTRA_TOOLS = 'SHOW_EXTRA_TOOLS'
const HIDE_EXTRA_TOOLS = 'HIDE_EXTRA_TOOLS'

/* ---------------------- Actions ---------------------- */
export let showExtraTools = () => { return { type: SHOW_EXTRA_TOOLS, show_extra_tools: true } }
export let hideExtraTools = () => { return { type: HIDE_EXTRA_TOOLS, show_extra_tools: false } }

/* ---------------------- Initial State ---------------------- */
const initial_state = { show_extra_tools: false };

/* ---------------------- Export Reducer ---------------------- */
export const ShowExtraToolsReducer = (state = initial_state, action) =>
    action.type == SHOW_EXTRA_TOOLS ? { show_extra_tools: true } :
        action.type == HIDE_EXTRA_TOOLS ? { show_extra_tools: false } :
            state

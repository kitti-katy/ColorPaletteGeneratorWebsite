
const SET_HUE_SPLIT = 'SET_HUE_SPLIT'
const SET_SAT_SPLIT = 'SET_SAT_SPLIT'
const SET_LIGHT_SPLIT = 'SET_LIGHT_SPLIT'
const SET_DISPLAY_ORDER = 'SET_DISPLAY_ORDER'
/* ---------------------- Actions ---------------------- */
export let setHueSplit = ( hueSplit) => { return { type: SET_HUE_SPLIT,  hueSplit } }
export let setSatSplit = (satSplit) => { return { type: SET_SAT_SPLIT, satSplit } }
export let setLightSplit = (lightSplit) => { return { type: SET_LIGHT_SPLIT, lightSplit } }
export let setDisplayOrder = (l1, l2, l3) => { return { type: SET_DISPLAY_ORDER, l1, l2, l3 } }

/* ---------------------- Initial State ---------------------- */
const initial_state = {  hueSplit: 8, satSplit: 4, lightSplit: 4, l1: 'h', l2: 's', l3: 'l' };

/* ---------------------- Export Reducer ---------------------- */
export const HSLBasicReducer = (state = initial_state, action) => {

    switch (action.type) {
        case SET_HUE_SPLIT: return { ...state,  hueSplit: action. hueSplit }
        case SET_SAT_SPLIT: return { ...state, satSplit: action.satSplit }
        case SET_LIGHT_SPLIT: return { ...state, lightSplit: action.lightSplit }
        case SET_DISPLAY_ORDER: return { ...state, l1: action.l1, l2: action.l2, l3: action.l3 }
        default: return { ...state }
    }

}


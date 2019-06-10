
const SET_HUE_CHANGE = 'SET_HUE_CHANGE'
const SET_SAT_CHANGE = 'SET_SAT_CHANGE'
const SET_LIGHT_CHANGE = 'SET_LIGHT_CHANGE'
const SET_HUE_STEP = 'SET_HUE_STEP'
const SET_SAT_STEP = 'SET_SAT_STEP'
const SET_LIGHT_STEP = 'SET_LIGHT_STEP'
const SET_NUMBER_OF_COLORS = 'SET_NUMBER_OF_COLORS'
const SET_DISPLAY_ORDER = 'SET_DISPLAY_ORDER'

const SET_ADVANCED_HSL_INPUT = 'SET_ADVANCED_HSL_INPUT'

/* ---------------------- Actions ---------------------- */
export let setHueChange = (hueChange) => { return { type: SET_HUE_CHANGE, hueChange } }
export let setSatChange = (satChange) => { return { type: SET_SAT_CHANGE, satChange } }
export let setLightChange = (lightChange) => { return { type: SET_LIGHT_CHANGE, lightChange } }

export let setHueStep = (hueStep) => { return { type: SET_HUE_STEP, hueStep } }
export let setSatStep = (satStep) => { return { type: SET_SAT_STEP, satStep } }
export let setLightStep = (lightStep) => { return { type: SET_LIGHT_STEP, lightStep } }

export let setNumberOfColors = (numberOfColors) => { return { type: SET_NUMBER_OF_COLORS, numberOfColors } }
export let setDisplayOrder = (l1, l2, l3) => { return { type: SET_DISPLAY_ORDER, l1, l2, l3 } }

export let setAdvancedHSLInput = (evt) => { return { type: SET_ADVANCED_HSL_INPUT, evt } }

/* ---------------------- Initial State ---------------------- */
const initial_state = {
    hueChange: 27, satChange: 0, lightChange: 20,
    hueStep: 1, satStep: 1, lightStep: 1,
    numberOfColors: 72,
};

/* ---------------------- Export Reducer ---------------------- */
export const HSLAdvancedReducer = (state = initial_state, action) => {



    switch (action.type) {
        case SET_ADVANCED_HSL_INPUT: {
            const target = action.evt.target;
            const value = target.value;
            const name = target.name;
            return { ...state, [name]: value }
        }
        case SET_HUE_CHANGE: return { ...state, hueChange: action.hueChange }
        case SET_SAT_CHANGE: return { ...state, satChange: action.satChange }
        case SET_LIGHT_CHANGE: return { ...state, lightChange: action.lightChange }
        case SET_HUE_STEP: return { ...state, hueStep: action.hueStep }
        case SET_SAT_STEP: return { ...state, satStep: action.satStep }
        case SET_LIGHT_STEP: return { ...state, lightStep: action.lightStep }
        case SET_NUMBER_OF_COLORS: return { ...state, numberOfColors: action.numberOfColors }
        default: return { ...state }
    }


}


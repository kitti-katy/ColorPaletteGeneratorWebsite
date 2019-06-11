const SET_PALETTES = 'SET_PALETTES'
/* ---------------------- Actions ---------------------- */
export let setPalettes = (palettes) => { return { type: SET_PALETTES, palettes } }

/* ---------------------- Initial State ---------------------- */
const initial_state = { palettes: [] };

/* ---------------------- Export Reducer ---------------------- */
export const PictureReducer = (state = initial_state, action) =>  action.type == SET_PALETTES ? { ...state, palettes: action.palettes, } : state


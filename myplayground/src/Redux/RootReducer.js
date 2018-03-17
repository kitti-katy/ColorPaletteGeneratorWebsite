/**
 * Created by kate on 3/16/18.
 */
import { combineReducers } from 'redux';
import ColorReducer from './reducer_color.js'
const rootReducer = combineReducers({
    color: ColorReducer
});
export default rootReducer;
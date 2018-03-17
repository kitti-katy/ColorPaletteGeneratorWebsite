import Color from '../Components/Color'

export default function (state = {colorPicked:new Color(255,0,247, 0)}, action) {
    switch (action.type) {
        case 'COLOR_PICKED':
            return action.payload
    }
    return state;
}
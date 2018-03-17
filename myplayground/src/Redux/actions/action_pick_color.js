/**
 * Created by kate on 3/16/18.
 */
function pickColor(color) {
    return {
        type: 'COLOR_PICKED',
        payload: color
    }
}

export default pickColor;
import React, { useState } from "react";
import TryItGradient from "./TryItGradient";
import TryWeb from "./TryWeb";

const switchers = [
    {
        label: 'CARD', component: () => <TryWeb />
    },
    {
        label: 'GRADIENT', component: () => <TryItGradient />
    }
]


export default function TryMain(props) {

    const [selectedTryIndex, setSelectedTryIndex] = useState(0);
    const tryComponent = switchers[selectedTryIndex].component()

    return (
        <div className='try-holder'>

            <div className="select-mode-table">
                {switchers.map(
                    (option, i) => 
                    <div key={"switcher" + i} onClick={() => setSelectedTryIndex(i)} className={i == selectedTryIndex ? 'selected-mode' : ''}><div> {option.label}</div> </div>)}
            </div>
            {tryComponent}
        </div>
    )
}


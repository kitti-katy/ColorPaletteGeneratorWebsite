import React, { useContext } from "react";
import { StoreContext } from '../Store';

export default function Articles() {
    const [state] = useContext(StoreContext)
    const { filterMode } = state


    return (
        <div className='horizontal-holder-ls'>
            Articles

        </div>
    );
}


import React from "react";
import { Tooltip } from 'antd'
import { Icon } from "@blueprintjs/core";

export const ResetColorsButton = (props) =>
    <Tooltip placement="top" title={"Reset"}>
        <Icon icon="repeat" className="reset-btn" onClick={props.onClick} />
    </Tooltip>

import React from "react";
import { Icon, Tooltip } from 'antd'

export const ResetColorsButton = (props) =>
    <Tooltip placement="top" title={"Reset"}>
        <Icon type="reload" className="reset-btn" onClick={props.onClick} />
    </Tooltip>

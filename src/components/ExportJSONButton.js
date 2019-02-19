import React from "react";
import { Icon, Tooltip } from 'antd'

export const  ExportJSONButton = (props) =>
    <Tooltip placement="top" title={"Export JSON"}>
        <Icon type="export" className="export-json-btn" onClick={props.onClick} />
    </Tooltip>
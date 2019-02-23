import React from "react";
import { Icon } from "@blueprintjs/core";
import { Tooltip } from 'antd'

export const  ExportJSONButton = (props) =>
    <Tooltip placement="top" title={"Export JSON"}>
        <Icon icon="export" className="export-json-btn" onClick={props.onClick} />
    </Tooltip>
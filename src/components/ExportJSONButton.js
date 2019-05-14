import React from "react";
import { Icon } from "@blueprintjs/core";
import { Tooltip } from 'antd'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
export const  ExportJSONButton = (props) =>
    <Tooltip placement="top" title={"Export JSON"}>
        <CloudDownloadIcon className="export-json-btn" onClick={props.onClick} />
    </Tooltip>
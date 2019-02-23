import React from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {message,   } from 'antd';
import { Icon } from "@blueprintjs/core";

message.config({
  top: 10,
  duration: 1
});

export const ClipboardCopier = (props) => (
  <CopyToClipboard text={props.value} onCopy={() => message.success(props.value + ' copied to clipboard', 1)}>
   <Icon id="copy-to-clipboard-icon" icon="duplicate" style={{cursor:'pointer', verticalAlign: 'bottom'}} />
  </CopyToClipboard>
 
)



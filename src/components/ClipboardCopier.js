import React from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {message, Icon   } from 'antd';

message.config({
  top: 10,
  duration: 1
});

export const ClipboardCopier = (props) => (
  <CopyToClipboard text={props.value} onCopy={() => message.success(props.value + ' copied to clipboard', 1)}>
   <Icon id="copy-to-clipboard-icon" type="copy" style={{cursor:'pointer'}} />
  </CopyToClipboard>
 
)



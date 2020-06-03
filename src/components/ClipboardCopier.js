import React from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message, } from 'antd';

message.config({
  top: 10,
  duration: 1
});

export const ClipboardCopier = (props) => (
  <CopyToClipboard text={props.value} onCopy={() => message.success((props.value.length > 40 ? props.value.substring(0, 40) + '...' : props.value) + ' copied to clipboard', 1)}>
    <span style={{ cursor: 'pointer' }}>
      {props.children}
    </span>
  </CopyToClipboard>
)



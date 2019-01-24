import React from "react";
import { Form, Input } from 'antd';

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
  wrapperCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
};

export const LabelInput = (props) => (
  <Form.Item style={{margin:0}} {...layout} label={props.label} > {props.input}  </Form.Item>
)

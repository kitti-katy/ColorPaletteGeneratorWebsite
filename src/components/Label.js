import React from "react";

export const Label = (props) =>
    <div class="ant-form-item-label">
        <label class={props.labelClass} title={props.title} style={{ ...props.labelStyle, color: '#3d3d3d' }}>{props.title}</label>
    </div>
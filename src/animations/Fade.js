import { Transition } from 'react-transition-group';
import React from "react";

const duration = 1000;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  width: '100%'
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

export const Fade = ({ in: inProp , element, style}) => (
  <Transition in={inProp} timeout={duration} style={style}>
    {state => {
      console.log(state)
      return (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
       {element}
      </div>)}
    }
  </Transition>
);
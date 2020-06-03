import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import { StoreContext } from "../../Store";
import Tour from "reactour";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const steps = [
    {
      selector: '.first-step-main-page',
      content: 'This panel generates colors based on selected Hue-Saturation-Light combination.',
    },
    {
        selector: '.try-holder',
        content: 'This panel generates colors based on selected Hue-Saturation-Light combination.',
      },
    
  ]


export default function MainPageTour() {
  const [state, dispatch] = useContext(StoreContext);
  const { openMainTour } = state;

  const set = (name, value) => dispatch({ name, value })
  const open = () => set('openMainTour', true)
  const close = () => set('openMainTour', false)

  return (
    <div>
      <IconButton aria-label="delete" onClick={open}>
        <HelpOutlineIcon />
      </IconButton>
      <Tour
        steps={steps}
        isOpen={openMainTour}
        onRequestClose={close}
      />
    </div>
  );
}

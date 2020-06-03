import React, { useContext } from "react";
import { StoreContext } from '../Store';
import palette from "../palette.PNG"
import BasicTiles from "../sections/tiles/BasicTiles";
import AnimationHandler from "../components/animation-handler/AnimationHandler";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function LandingPage() {
    const [state] = useContext(StoreContext)
    const { filterMode, landingColors } = state


    return (
        <div className='landing-page-holder horizontal-holder-ls'>
            
            {/*<img src={palette} alt="palette" />*/}
            <div className='animation-holder'>
                <BasicTiles  animationOn={true}/>
            
                <div style={{width:'100%', display:'flex'}}>{landingColors.length!=0 && <ArrowDownwardIcon style={{fontSize:'48px', margin:'auto'}}/>}</div>
                <div style={{display:'flex', flexDirection:'row', paddingLeft: '10px', paddingRight:'10px'}}>
                    {landingColors.map(color => <div style={{padding:'12.5%', width:'25%', height:'25%', background: color}}/>)}
                </div>
            </div>
            <div style={{display:'flex'}}>
                <div>
                    <Typography variant="h4" style={{ color: "black" }}>
                        Create color schemes <br/> with patterns!
                    </Typography>
                    <div>
                    <Button variant='outlined' href='/create'>Start New Palette</Button>
                    </div>
                </div>
            </div>
            <AnimationHandler/>
        </div>
    );
}


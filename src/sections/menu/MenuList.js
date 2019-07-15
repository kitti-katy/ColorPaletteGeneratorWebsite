import React, { useState } from "react";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import { Icon } from 'antd'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
export default function MenuList(props) {

    const [state, setState] = useState({
        left: false
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            style={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '1.25rem', fontWeight: 500 }}>
                    Palette Generator
                </ListItem>
                <ListItem style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '0.875rem' }}>
                    V1.0.0
                </ListItem>

            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon><Icon type="github" style={{ fontSize: '24px' }} /></ListItemIcon>
                    <ListItemText>
                        <Link href={'https://github.com/kitti-katy'} target="_blank">
                            github
                        </Link>
                    </ListItemText>
                </ListItem>
            </List>
        </div >
    );
    return (
        <div>
            <IconButton edge="start" color="inherit" aria-label="Menu" id="menu-button" onClick={toggleDrawer('left', true)}>
                <MenuIcon />
            </IconButton>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}
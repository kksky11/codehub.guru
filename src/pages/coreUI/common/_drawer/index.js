import React,{useState,useEffect} from "react";
import PropTypes                  from 'prop-types';
import SwipeableDrawer            from '@mui/material/SwipeableDrawer';
import './style/drawer.scss';



function Drawer(props){
    const { isOpen, onCloseHandler,customClass, anchorDirection, children, disableSwipeToOpen, disableDiscovery } = props;
    const [isDrawerOpen, setIsDrawerOpen]  = useState(isOpen);
   
    useEffect(() => {
        setIsDrawerOpen(isOpen)
    },[isOpen]);    

    const drawerHandler = () => {
        setIsDrawerOpen(!isDrawerOpen);
        onCloseHandler();
    } 
    return (
        <SwipeableDrawer 
            className          = {`swipeableDrawer ${customClass}`}
            anchor             = {anchorDirection === "none" ? "bottom" : anchorDirection}
            open               = {isDrawerOpen}
            onClose            = {drawerHandler}
            onOpen             = {drawerHandler}
            disableSwipeToOpen = {disableSwipeToOpen ? disableSwipeToOpen: false}
            disableDiscovery   = {disableDiscovery ? disableDiscovery : false}
            //transitionDuration = {{enter: duration.enteringScreen, exit: duration.leavingScreen }}
        >
            {children}
        </SwipeableDrawer>
    );
}

Drawer.propTypes = {
    customClass         :   PropTypes.string, 
    anchorDirection     :   PropTypes.string, 
    children            :   PropTypes.node,
    onCloseHandler      :   PropTypes.func,
    isOpen              :   PropTypes.bool,
    disableSwipeToOpen  :   PropTypes.bool,
    disableDiscovery    :   PropTypes.bool
};

export default Drawer;
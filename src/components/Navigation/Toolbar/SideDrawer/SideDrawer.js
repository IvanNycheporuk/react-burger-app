import React from 'react';

import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../../UI/BackDrop/BackDrop';

import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let toggleClasses = props.open ? [classes.SideDrawer, classes.Open].join(' ') : [classes.SideDrawer, classes.Close].join(' ');

    return (
        <>
            <BackDrop show={props.open} hideModal={props.close}/>
            <div className={toggleClasses}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>            
            </div>
        </>
    )
}

export default sideDrawer;
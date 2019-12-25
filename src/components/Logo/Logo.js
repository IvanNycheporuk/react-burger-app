import React from 'react';

import classes from './Logo.module.css';

import LogoImg from '../../asserts/images/burger-logo.png';

const logo = () => (
    <div className={classes.Logo}>
        <img src={LogoImg} alt={'logo'}/>
    </div>
);

export default logo;
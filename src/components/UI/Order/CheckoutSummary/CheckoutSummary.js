import React from 'react';

import Burger from '../../../Burger/Burger';
import Button from '../../Button/Button';

import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h2>We hope it tastes well :)</h2>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>            

            <Button 
                btnType="Danger"
                clicked={() => {alert('cancel')}}>Cancel</Button>            
            <Button 
                btnType="Success"
                clicked={() => {alert('continue')}}>Continue</Button>
        </div>
    )
}

export default checkoutSummary;
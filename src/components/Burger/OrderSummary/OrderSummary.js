import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    
    let ingredients = Object.keys(props.ingredients).map(ing => {
        return <li key={ing}><span>{ing}: <strong>{props.ingredients[ing]}</strong></span></li>
    });

    return (
        <>
            <h3>Your super order below</h3>
            <ul>
                {ingredients}
            </ul>
            <p>Total sum is: <strong>{props.totalSum.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType={'Danger'} clicked={props.cancelPurchase}>Cancel</Button>
            <Button btnType={'Success'} clicked={props.continuePurchase}>Continue</Button>
        </>
    )
}

export default orderSummary;
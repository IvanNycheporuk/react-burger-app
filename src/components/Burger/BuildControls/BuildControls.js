import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const controls = [
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Salad', type: 'salad'}
];

const buildControls = (props) => {
    
    return (
        <div className={classes.BuildControls}>
            <span>total price: <strong>{props.price.toFixed(2)}</strong></span>
            {controls.map( ctrl => <BuildControl 
                    add={() => props.addIngredient(ctrl.type)} 
                    remove={() => props.removeIngredient(ctrl.type)} 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    isDisabled={props.disableControl[ctrl.type]}
                />)
            }
            <button 
                disabled={!props.isPurchasable}
                className={classes.OrderButton}
                onClick={props.showModal}
            >
                ORDER NOW
            </button>
        </div>
    )
}

export default buildControls;
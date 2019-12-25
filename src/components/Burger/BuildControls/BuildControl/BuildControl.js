import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <span className={classes.Label}>{props.label}</span>
            <button 
                onClick={props.remove} 
                className={classes.Less} 
                disabled={props.isDisabled}
            >
                Less
            </button>
            <button 
                onClick={props.add} 
                className={classes.More}
            >
                More
            </button>
        </div>
    )
}

export default buildControl;
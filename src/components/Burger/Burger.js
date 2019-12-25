import React from 'react';
import PropTypes from 'prop-types';

import Ingredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.module.css';

const Burger = (props) => {
    let ingredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])]
            .map((_, index) => {
                    return <Ingredient key={igKey + index} type={igKey}/>
                })
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
        
    if (ingredients.length === 0) {
        ingredients = 'please add ingredients';
    }
    return (
        <div className={classes.Burger}>
            <Ingredient type='bread-top'/>
            {ingredients}
            <Ingredient type='bread-bottom'/>
        </div>
    )
}

Burger.propTypes = {
    ingredients: PropTypes.object
}

export default Burger;
import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHadling/withErrorHandling';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.3,
    cheese: 0.7,
    meat: 2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        isPurchasable: false,
        purchase: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-app-95251.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({
                    ingredients: res.data
                })
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    updatePurchaseButton(ingredients) {
        let sum = 0;

        for (let key in ingredients) {
            sum += ingredients[key]
        }

        this.setState({isPurchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        let updatedCount = this.state.ingredients[type] + 1;
        const ingredientsState = {...this.state.ingredients};
        
        let oldPrice = this.state.totalPrice;

        let updatedPrice = oldPrice + INGREDIENT_PRICES[type];

        ingredientsState[type] = updatedCount;

        this.setState({
            ingredients: ingredientsState,
            totalPrice: updatedPrice
        });

        this.updatePurchaseButton(ingredientsState);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] !== 0) {
            let updatedCount = this.state.ingredients[type] - 1;
            const ingredientsState = {...this.state.ingredients};

            let oldPrice = this.state.totalPrice;

            let updatedPrice = oldPrice - INGREDIENT_PRICES[type];
    
            ingredientsState[type] = updatedCount;
    
            this.setState({
                ingredients: ingredientsState,
                totalPrice: updatedPrice
            });

            this.updatePurchaseButton(ingredientsState);
        }
    }

    purchaseShowHandler = () => {
        this.setState({
            purchase: true
        })
    }

    hideModalHandler = () => {
        this.setState({
            purchase: false
        })
    }

    continuePurchaseHandler = () => {
        //alert('yay, lets continue');
        const data = {
            ingredients: this.state.ingredients,
            userName: 'Ivan Nycheporuk',
            address: {
                street: 'test',
                city: 'Kyiv',
                country: 'Ukraine'
            },
            email: 'test@test.mail',
            totalPrice: this.state.totalPrice.toFixed(2)
        }

        this.setState({
            loading: true
        })

        axios.post('orders.json', data)
            .then(response => {
                this.setState({
                    purchase: false,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({
                    purchase: false,
                    loading: false
                })
            });
    }

    render() {
        let isDisabled = {...this.state.ingredients};

        for (let val in isDisabled) {
            if (isDisabled[val] === 0) {
                isDisabled[val] = true;
            } else {
                isDisabled[val] = false;
            }
        }

        let orderSummary = null;
        
        let burger = this.state.error ? <p>Network issue</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        disableControl={isDisabled} 
                        addIngredient={this.addIngredientHandler} 
                        removeIngredient={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        isPurchasable={this.state.isPurchasable}
                        showModal={this.purchaseShowHandler}
                    />
                </>
            )

            orderSummary = <OrderSummary 
                cancelPurchase={this.hideModalHandler}
                continuePurchase={this.continuePurchaseHandler}
                ingredients={this.state.ingredients}
                totalSum={this.state.totalPrice}
            />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return(
            <>
                {burger}
                <Modal 
                    show={this.state.purchase} 
                    hideModal={this.hideModalHandler}>
                    {orderSummary}
                </Modal>


            </>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);
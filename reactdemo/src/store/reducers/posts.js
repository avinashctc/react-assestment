import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../utility';

const burgerBuilderReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                purchaseable: (Object.keys(state.ingredients).map(ingKey => {
                    return state.ingredients[ingKey]
                }).reduce((sum, el) => {
                    return sum + el;
                }, 0) + 1) > 0,
                building : true
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] > 0 ? state.ingredients[action.ingredientName] - 1 : 0
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
                purchaseable: (Object.keys(state.ingredients).map(ingKey => {
                    return state.ingredients[ingKey]
                }).reduce((sum, el) => {
                    return sum + el;
                }, 0) - 1) > 0,
                building: true
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
    }

    return state;
};

export default burgerBuilderReducer;

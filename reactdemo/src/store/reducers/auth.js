import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    errors: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.tokenId,
                userId: action.userId,
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                errors: action.error
            };

        default: return state;
    }
}

export default authReducer;
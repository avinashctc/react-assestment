import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts: [],
    isPostSelected: false,
    error: false,
    post: null,
    newPostSubmitted: false
}

const postsReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_POST_SUCCESS:
            // console.log(...state, action.posts);
            return {
                ...state,
                posts: action.posts
            };
        case actionTypes.FETCH_POST_FAIL:
            return {
                ...state,
                error: true
            };
        case actionTypes.IS_POST_SELECTED:
            return {
                ...state,
                isPostSelected: true
            };
        case actionTypes.FETCH_SELECTED_POST_SUCCESS:
            return {
                ...state,
                post: action.post
            };
        case actionTypes.FETCH_SELECTED_POST_FAIL:
            return {
                ...state,
                error: true
            };
        case actionTypes.ADD_NEW_POST_SUCCESS:
            return {
                ...state,
                newPostSubmitted: true
            };
        case actionTypes.ADD_NEW_POST_FAIL:
            return {
                ...state,
                error: true
            };
        case actionTypes.INITIALISE_POST_SUBMITTED:
            return {
                ...state,
                newPostSubmitted: false
            };
        default: return state;
    }
};

export default postsReducer;

import * as actionTypes from './actionTypes';
import axios from 'axios';


const fetchPostFail = (error) => {
    return {
        type: actionTypes.FETCH_POST_FAIL,
        error: error
    };
};


const fetchPostSuccess = (postData) => {
    return {
        type: actionTypes.FETCH_POST_SUCCESS,
        posts: postData
    };
};


export const fetchPostOnSelection = () => {
    return {
        type: actionTypes.IS_POST_SELECTED,
        isPostSelected: true
    };
};

const fetchSelectedPostFail = (error) => {
    return {
        type: actionTypes.FETCH_SELECTED_POST_FAIL,
        error: error
    };
};


const fetchSelectedPostSuccess = (selectePost) => {
    return {
        type: actionTypes.FETCH_SELECTED_POST_SUCCESS,
        post: selectePost
    };
};

const addNewPostFail = (error) => {
    return {
        type: actionTypes.ADD_NEW_POST_FAIL,
        error: error
    };
};


const addNewPostSuccess = () => {
    return {
        type: actionTypes.ADD_NEW_POST_SUCCESS,
    };
};

export const initialisePostSubmitted = () => {
    return {
        type: actionTypes.INITIALISE_POST_SUBMITTED,
    };
};

export const fetchPosts = () => {
    return dispatch => {
        let url = 'https://jsonplaceholder.typicode.com/posts';

        axios.get(url)
            .then(response => {
                const posts = response.data.slice(0, 10);
                // const updatedPosts = posts.map(post => {
                //     return {
                //         ...post,
                //         author: "ABC"
                //     }
                // })
                dispatch(fetchPostSuccess(posts));
            })
            .catch(error => {
                dispatch(fetchPostFail(error.response.data.error));
            })
    }
}

export const fetchSelectedPost = (postId) => {
    return dispatch => {
        let url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

        axios.get(url)
            .then(response => {
                dispatch(fetchSelectedPostSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchSelectedPostFail(error));
            })
    }
}

export const saveNewPost = (inputParam) => {
    return dispatch => {
        let url = 'https://jsonplaceholder.typicode.com/posts';

        axios.post(url, inputParam)
            .then(response => {
                dispatch(addNewPostSuccess());
            })
            .catch(error => {
                dispatch(addNewPostFail(error));
            })
    }
}


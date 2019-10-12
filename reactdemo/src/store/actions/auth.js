import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const authSucces = (tokenId, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: tokenId,
        userId: userId
    };
};

export const authenticate = (email, password) => {
    return dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKeoPU9ohWcBu6QO4orfa4T2NrMs1Q9KM';

        axios.post(url, authData)
            .then(response => {
                dispatch(authSucces(response.data.idToken, response.data.localId));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            })
    }
}


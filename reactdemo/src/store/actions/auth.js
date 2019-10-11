import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const authSucces = (tokenId, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        // token: authToken,
        tokenId: tokenId,
        userId: userId
    };
};

export const authenticate = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKeoPU9ohWcBu6QO4orfa4T2NrMs1Q9KM';

        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKeoPU9ohWcBu6QO4orfa4T2NrMs1Q9KM'
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSucces(response.data.idToken, response.data.localId));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            })
    }
}


import {AUTH} from '../constants/actionTypes';
import * as api from '../api';

// get form data that is dispatch from Form.js
export const signin = (formData, history) => async(dispatch) => {
    try {
        // send data to backend to signup
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data});
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, history) => async(dispatch) => {
    try {
        // send data to backend to signup
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data});
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}
import * as api from "../api";
import {AUTH} from '../constance/actionTypes';

export const signin = (formData,router) => async (dispatch)=>{
    console.log(formData);
    try {
        // log in the user
        console.log(formData);
        const {data}=await api.signIn(formData);

        dispatch({type:AUTH,data});

        router.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup=(formData,history)=>async (dispatch)=>{
    try {
        // sign up the user
        const {data}=await api.signUp(formData);

        dispatch({type:AUTH,data});


        history.push('/');
    } catch (error) {
        console.log(error);
    }
}
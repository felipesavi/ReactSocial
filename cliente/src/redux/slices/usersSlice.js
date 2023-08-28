import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
    name:'users',
    initialState:{
        list: []
    },
    reducers:{
        setUserForm:(state, actions) =>{
            state.list = actions.payload;
        }
    }
})

export const{setUserForm}= userSlice.actions

export default userSlice.reducer;


export const fetchUserByForm = (form) => async(dispatch) =>{
    try{
        dispatch(setUserForm(form))

    }catch(error){
        console.log(error);
        alert('Error Crear usuario')
    }
}
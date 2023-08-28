import { configureStore } from '@reduxjs/toolkit';
//reducer
import users from './slices/usersSlice'

export default configureStore({
    reducer:{
        users,
    }
})
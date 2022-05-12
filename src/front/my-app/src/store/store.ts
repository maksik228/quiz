import {configureStore} from '@reduxjs/toolkit'
import reducer, {checkToken} from "./reducer";

const store = configureStore({reducer: reducer})

const token = localStorage.getItem('token');
if (token) {
    store.dispatch(checkToken(token));
}

export default store;
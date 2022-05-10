import {configureStore} from '@reduxjs/toolkit'
import postsReducers from "./reducer";

const store = configureStore({reducer: {posts: postsReducers}})
export default store;
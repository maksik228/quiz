import {combineReducers, createSlice} from "@reduxjs/toolkit";


const counterSlice = createSlice({
    name: "counter",
    initialState: {right: 0, all: 0},
    reducers: {
        increment: (state) => {state.right = state.right + 1},
        resetRight: (state) => {state.right = 0},
        setAll: (state, action) => {state.all = action.payload}
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {id:0, token:''},
    reducers: {
        setId: (state,action) => {state.id = action.payload},
        setToken: (state, action) => {state.token = action.payload},
    }
});

export const { increment, resetRight, setAll} = counterSlice.actions;
export const { setId, setToken} = userSlice.actions;

export default combineReducers({
    counter: counterSlice.reducer,
    user: userSlice.reducer,
})

// export default counterSlice.reducer;
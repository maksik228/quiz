import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: "1", title: "First Post!", content: "Hello!" },
    { id: "2", title: "Second Post", content: "More text" }
];

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded(state, action) {
            state.push(action.payload);
        },
        postDeleted(state, action) {
            const idx = state.findIndex((el) => el.id === action.payload.id);
            state.splice(idx, 1);
        }
    }
});

export const { postAdded, postDeleted } = postsSlice.actions;

export default postsSlice.reducer;
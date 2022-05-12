import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const counterSlice = createSlice({
    name: "counter",
    initialState: {right: 0, all: 0},
    reducers: {
        increment: (state) => {
            state.right = state.right + 1
        },
        resetRight: (state) => {
            state.right = 0
        },
        setAll: (state, action) => {
            state.all = action.payload
        }
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {id: 0, token: ''},
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.token = action.payload.token
        },
        setId: (state, action) => {
            state.id = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
    }
});

export const {increment, resetRight, setAll} = counterSlice.actions;
export const {setId, setToken, setUser} = userSlice.actions;

export default combineReducers({
    counter: counterSlice.reducer,
    user: userSlice.reducer,
})

export const checkToken = createAsyncThunk('checkToken',async (token: string, ThankApi) => {
        const q = `
                    query isUser($token: String) {
                      checkToken(token:$token){
                        status
                        id
                        token
                      }
                    }
                    `;
        const result = await fetch('http://localhost:3002/graphql',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: q,
                    variables: {token:token}
                })
            });
        const res_json = await result.json();
        const info = res_json.data.checkToken;
        console.log(info);
        ThankApi.dispatch(setUser({id:info.id, token: info.token}));
    });


// export default counterSlice.reducer;
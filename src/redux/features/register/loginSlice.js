import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginUser : {}
}


const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers : {
        loginedUser : (state, action)=>{
            state.loginUser = action.payload
        }
    }
})

export default loginSlice.reducer;
export const { loginedUser } = loginSlice.actions;
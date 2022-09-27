import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    registeredUsers : [
        {
            name: "yusuf",
            email: "yusufkdalal@gmail.com",
            password: "skng@810",
            acceptTnC: true,
        }
    ]};
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers : {
    userAdded : (state, action)=>{ 
        state.registeredUsers.push(action.payload)   
    }
  }
});

export default registerSlice.reducer
export const { userAdded } = registerSlice.actions    

import { configureStore  } from "@reduxjs/toolkit"
import userAddedReducer from "./features/register/registerSlice"
import loginedUserReducer from "./features/register/loginSlice"

const store = configureStore({
    reducer: {
        register: userAddedReducer,
        login: loginedUserReducer
    }
})

export default store
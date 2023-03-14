import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginStatus: "",
    userData : {},
    userName: "",
}

export const login_detail_slice = createSlice({
    name: "login_data",
    initialState,
    reducers: {
        setloginStatus: (state, action) => {
            state.loginStatus = action.payload
        },
        setuserData: (state, action) => {
            state.userData = action.payload
        },
        setuserName: (state, action) => {
            state.userName = action.payload
        }
    }
})

export const { setloginStatus, setuserData, setuserName } = login_detail_slice.actions;

export default login_detail_slice.reducer 

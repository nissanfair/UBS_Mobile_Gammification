import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timestate: "RESTART", //RUN, PAUSE, RESTART, END 
    
}

export const question_detail_slice = createSlice({
    name: "topic_information",
    initialState,
    reducers: {
        setSelectedTimeState: (state, action) => {
            state.timestate = action.payload
        }
    }
})

export const { setSelectedTimeState } = question_detail_slice.actions;

export default question_detail_slice.reducer

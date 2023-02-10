import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timestate: "", //PAUSE, STOP 

}

export const question_detail_slice = createSlice({
    name: "topic_information",
    initialState,
    reducers: {
        selectedTimeState: (state, action) => {
            state.timestate = action.payload
        }
    }
})

export const { selectedTimeState } = question_detail_slice.actions;

export default question_detail_slice.reducer

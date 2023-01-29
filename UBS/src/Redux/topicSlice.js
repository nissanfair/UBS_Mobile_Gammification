import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    topic: "",
}

export const topic_detail_slice = createSlice({
    name: "topic_information",
    initialState,
    reducers: {
        selectedTopic: (state, action) => {
            state.topic = action.payload
        }
    }
})

export const { selectedTopic } = topic_detail_slice.actions;

export default topic_detail_slice.reducer

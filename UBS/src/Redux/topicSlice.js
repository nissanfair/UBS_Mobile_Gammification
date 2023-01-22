import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    topicquestionsdata: [],
    topiceducationdata: [],
    topicintroductiontopicdata: []
}

export const login_detail_slice = createSlice({
    name: "topic_information",
    initialState,
    reducers: {
        retrieveIntroductionData: (state) => {
            state.topicintroductiontopicdata = action.payload
            
        },
        
        retrieveEducationData: (state) => {
            state.topiceducationdata = action.payload
            
        },

        retrieveQuestionsData: (state) => {
            state.topicquestionsdata = action.payload
            
        }



        
    }
})

export const { setlogin, set_profile_name, set_inventory } = login_detail_slice.actions;

export default login_detail_slice.reducer

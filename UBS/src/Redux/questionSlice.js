import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timestate: "RESTART", //RUN, PAUSE, RESTART, END 
    showSummary: false, // true, false 

    total_question: 0,
    answered_correctly: 0,
    answered_wrongly:0,
    
    gamestatus: "RESET"
}

export const question_detail_slice = createSlice({
    name: "topic_information",
    initialState,
    reducers: {
        setSelectedTimeState: (state, action) => {
            state.timestate = action.payload
        }
        ,
        setShowSummary : (state,action) => {
            state.showSummary = action.payload
        }
        ,
        setTotal_Questions : (state,action) => {
            state.total_question = action.payload
        }
        ,
        set_answered_correctly : (state,action) => {
            state.answered_correctly += action.payload
        }
        ,
        set_answered_wrongly : (state,action) => {
            state.answered_wrongly += action.payload
        },

        set_game_status: (state,action) => {
            state.gamestatus = action.payload
        }
    }
})

export const { setSelectedTimeState , setShowSummary,setTotal_Questions,set_answered_correctly,set_answered_wrongly,set_game_status } = question_detail_slice.actions;

export default question_detail_slice.reducer

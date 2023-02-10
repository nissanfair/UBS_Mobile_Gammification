import { configureStore } from "@reduxjs/toolkit";

// Step 1: Import all the slices that you need here!! 
import loginSlice from "./loginSlice"
import topicSlice from "./topicSlice"
import questionSlice from "./questionSlice";
export default store = configureStore({
    // This reducer 
    reducer: {
        // Step 2: Add the imported files here. 
        login: loginSlice,
        topic: topicSlice,
        question: questionSlice
        // alan: alanSlice
    }
} 
// 

)
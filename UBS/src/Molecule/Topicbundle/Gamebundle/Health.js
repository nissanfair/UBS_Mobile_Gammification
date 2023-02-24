import { current } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector,useStore } from 'react-redux';
import {setSelectedTimeState, setShowSummary , setTotal_Questions, set_answered_correctly, set_answered_wrongly, set_game_status} from "../../../Redux/questionSlice"

const HealthBar = ({ numWrongAnswers, timeState, gameStatus }) => {
    const dispatch = useDispatch()
    const gamestate = useSelector((state) => state.question.gamestatus);
    
    // Max health to keep track of future equipment i guess
    const [maxHealth,setMaxHealth] = useState(3)
    const [currentHealth, updateCurrentHealth] = useState(maxHealth) 
    
    
    useEffect(() => {
        // alert("gamestate is this " + gameStatus)
        // alert("timestate is this " + timeState)

        // Check when timeState is paused because they would have answered the question + Check whether gamestatus is running
        if (timeState == "PAUSE" && gameStatus == "RUNNING"){
            alert("pause blocked")
            if (currentHealth > 0) {
                updateCurrentHealth(currentHealth - 1)
            }
            else if (currentHealth < 0) {
                dispatch(set_game_status("RESET"))
                updateCurrentHealth(maxHealth)

        } 
        }
        // Check when timeState has ended because they would missed their chance to answer their question  + Check whether gamestatus is running
        if (timeState == "END" && gameStatus == "RUNNING") {
            if (currentHealth > 0) {
                updateCurrentHealth(currentHealth - 1)
            }
            else if (currentHealth < 0) {
                dispatch(set_game_status("RESET"))
                updateCurrentHealth(maxHealth)
        } 
        }

        // gameStatus is account for when game ends at the questions.js side
    
      }, [numWrongAnswers]);
    

    //     // Check if timestate end 
    //     if (timeState == "END" && currentHealth != 0 || currentHealth > 0) {
    //         currenthealth = currenthealth - numWrongAnswers - 1
    //     } 
    //     else if (timeState == "END" && currentHealth <= 0 || currentHealth <= 0) {
    //         // dispatch game status change to RESET, to hear from the question side to reset index 
    //         dispatch(set_game_status("RESET"))
    //         // Set the Total Questions 
    //         dispatch(setTotal_Questions(sample_questions.length))
    //         // Navigate the person out to the Summary Page
    //         navigation.navigate("Summary")

    //     } 
    // }
    // else if (gamestatus == "RESET") {
    //     updateCurrentHealth(maxHealth)
    // }


    return (
        <View>
            <Text>Current health: {currentHealth} / {maxHealth} </Text>
        </View>
    );
};

export default HealthBar;

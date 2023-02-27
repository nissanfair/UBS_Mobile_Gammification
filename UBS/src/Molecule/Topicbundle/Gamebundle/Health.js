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

        // Check when timeState is paused because they would have answered the question + Check whether gamestatus is running
        if (timeState == "PAUSE" && gameStatus == "RUNNING"){
            // One because if minus 1 and get wrong, it would end the 
            if (currentHealth == 1) {
                updateCurrentHealth(maxHealth)
                // Reset time to run for the next iteration and set game status to reset
                dispatch(setSelectedTimeState("RUN"))
                dispatch(set_game_status("RESET"))

            } else {
                updateCurrentHealth(currentHealth - 1)

            }
            
        //     if (currentHealth == 0) {

        // } 
        }
        // Check when timeState has ended because they would missed their chance to answer their question  + Check whether gamestatus is running
        if (timeState == "END" && gameStatus == "RUNNING") {
            if (currentHealth == 1 ) {
                updateCurrentHealth(maxHealth)
                // Reset time to run for the next iteration and set game status to reset
                dispatch(setSelectedTimeState("RUN"))
                dispatch(set_game_status("RESET"))            }
                else {
                    updateCurrentHealth(currentHealth - 1)
                }
        }
        // gameStatus is account for when game ends at the questions.js side
      }, [numWrongAnswers]);
    

    return (
        <View>
            <Text style={{color: "black"}}>Current health: {currentHealth} / {maxHealth} </Text>
        </View>
    );
};

export default HealthBar;

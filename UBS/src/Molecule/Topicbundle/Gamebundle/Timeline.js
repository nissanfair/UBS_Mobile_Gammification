import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress'

import { useDispatch, useSelector,useStore } from 'react-redux';
import { setSelectedTimeState, set_answered_correctly, set_answered_wrongly  } from "../../../Redux/questionSlice"


const Timer = () => {   
    const dispatch = useDispatch(); 
    const timestate = useSelector((state) => state.question.timestate);
    const [timeLeft, setTimeLeft] = useState(30);
    const intervalId = useRef(null);

    const percentage = (timeLeft) / 30;
    useEffect( () => {
      if (timestate === "RUN") {
        intervalId.current = setInterval( () => {
          if (timeLeft === 0 ) {
            setTimeLeft(0)
            clearInterval(intervalId.current);
            dispatch(setSelectedTimeState("END"))
          }
          else {
            setTimeLeft(timeLeft -1)
          }
          // setTimeLeft(prevTime => {
          //   if (prevTime === 0){
          //     clearInterval(intervalId.current);
          //     dispatch(setSelectedTimeState("END"))
          //     return 0;
          //   }
          //   return prevTime -1
          // });
        },1000);
      } 
      else if (timestate === "PAUSE") {
        clearInterval(intervalId.current);
      }
      else if (timestate === "RESTART") {
        setTimeLeft(30)
        dispatch(setSelectedTimeState("RUN"))
      }
      else if (timestate === "END") {
        clearInterval(intervalId.current);
        // Over here, once time end the question is wrong, so need to account for this
        dispatch(set_answered_wrongly(1))
      }
      return () => clearInterval(intervalId.current);
    },[timestate,timeLeft])

    
    return (
        <View style={{justifyContent:"center", alignItems:"center"}}>
            <View>
                    {/* Missing Duration left */}
                    {percentage == 0 
                    ?
                    <Progress.Bar borderRadius={30} progress={100} width={400} height={30} color={"black"}>
                    </Progress.Bar>
                    :
                    <>
                      {
                        percentage <= 0.1
                        ? 
                        <Progress.Bar borderRadius={30} progress={percentage} width={400} height={30} color={"red"}>
                        </Progress.Bar>
                        : 
                        <Progress.Bar borderRadius={30} progress={percentage} width={400} height={30} color={"green"}>
                        </Progress.Bar>
                      }
                    </>  
                    }
            </View>
            <View>
              {percentage == 0 
                ?
                <Text style={{color:"white"}}>Time's up!</Text> 
                :
                <Text style={{color:"white"}}>{timeLeft} seconds left</Text>}
            </View>
        </View>
    );
};

export default Timer
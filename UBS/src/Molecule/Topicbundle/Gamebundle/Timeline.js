import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Progress from 'react-native-progress'
const Stack = createStackNavigator();

const Timeline = () => {     
    const [timeLeft, setTimeLeft] = useState(30);
    // const [percentage , setPercentage ] = useState(1)
    const intervalId = useRef(null);
  
    useEffect(() => {
      intervalId.current = setInterval(() => {

        setTimeLeft(timeLeft => {
          if (timeLeft <= 1) {
            clearInterval(intervalId.current);
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
      return () => clearInterval(intervalId.current);
    }, []);

    const percentage = (timeLeft) / 30;
    // Probably have to set the percentage to be global variable. 

    return (
        <View style={{justifyContent:"center", alignItems:"center"}}>
            <View>
                    {/* Missing Duration left */}
                    {timeLeft == 0 
                    ?
                    <Progress.Bar borderRadius={30} progress={100} width={400} height={30} color={"black"}>
                    </Progress.Bar>
                    :
                    <>
                      {
                        timeLeft <= 10 
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
              {timeLeft == 0 ?<Text style={{color:"white"}}>Time's up!</Text> :<Text style={{color:"white"}}>{timeLeft} seconds left</Text>}
            </View>
        </View>
    );
};

export default Timeline
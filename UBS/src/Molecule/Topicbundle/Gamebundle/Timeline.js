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

    // useEffect(() => {
    //     // use setInterval() to start an interval that will run decreaseNum function every 1 second. decreaseNum simply updates the num state to 1 less than the previous value
    //     intervalRef.current = setInterval(decreaseNum, 1000);
    //     // store the reference to the interval we just set in intervalRef.current
    //     return () => clearInterval(intervalRef.current);
    //   }, []);
    const percentage = (timeLeft) / 30;

    return (
        <View>
            <View>
                <Text>

                {timeLeft}
                
                </Text>
                {/* <Button title="StartTimer" onPress={handleClickStart} />
                <Button title="ResetTimer" onPress={handleClickReset} />
                <Button title="PauseTimer" onPress={handleClickPause} /> */}
                <Progress.Bar progress={percentage} width={400} height={50} />
            </View>
        </View>
    );
};

export default Timeline
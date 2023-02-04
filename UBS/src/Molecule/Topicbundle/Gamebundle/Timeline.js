import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Timeline = () => {     
    let intervalRef = useRef();
    const [time, setTime] = useState(100);
    const [reset, enableReset] = useState(false);
    const [intervalid,getIntervalId] = useState(); 

    const decreaseNum = () => setTime((prev) => prev - 1);


    const handleClickReset = () => {

            setTime(100)
            clearInterval(intervalRef.current)
            // intervalRef.current = setInterval(() => {
            //     if (time === 0) {
            //         clearInterval(intervalId);
            //     }

            // },1000);


    };
    const handleClickStart = () => {
        intervalRef.current = setInterval(decreaseNum, 1000);


    }

    const handleClickPause = () => {
        clearInterval(intervalRef.current)
    }

    // useEffect(() => {
    //     // use setInterval() to start an interval that will run decreaseNum function every 1 second. decreaseNum simply updates the num state to 1 less than the previous value
    //     intervalRef.current = setInterval(decreaseNum, 1000);
    //     // store the reference to the interval we just set in intervalRef.current
    //     return () => clearInterval(intervalRef.current);
    //   }, []);

    return (
        <View>
            <View>
                <Text>
                    {time}
                </Text>
                <Button title="StartTimer" onPress={handleClickStart} />
                <Button title="ResetTimer" onPress={handleClickReset} />
                <Button title="PauseTimer" onPress={handleClickPause} />


            </View>

        </View>
    );
};

export default Timeline
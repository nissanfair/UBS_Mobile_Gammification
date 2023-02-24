// React Imports 
import React, {useState, useEffect} from 'react';
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image, TouchableHighlight, BackHandler,Button} from 'react-native';
import { useDispatch, useSelector,useStore } from 'react-redux'
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import TopicIntroduction from '../TopicIntroduction';

// Redux Toolkit Variables 

const styles = StyleSheet.create({
    background : {
        width: "100%",
        height: "100%"
    }
})


export default function Summary({navigation}) {
    
    // Get the Total Score 
    const total_question = useSelector((state) => state.question.total_question);

    // Get the Answered Correctly
    const answer_correctly = useSelector((state) => state.question.answered_correctly);

    // Get the Answer Wrongly
    const answered_wrongly = useSelector((state) => state.question.answered_wrongly);

    // Get the health of the user 
    

    const handlePress = () => {
      // Handle button press here
      console.log('Button pressed!');
      navigation.navigate(TopicIntroduction) 
    }
    // Disable back button
    useEffect(() => {
      const handleBackButton = () => true; // returning true disables the back button
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }, []);
    
  return (
    <View>
        <TouchableHighlight >
          <Text >This is the Summary Page
            Out of {total_question}, correctly:  {answer_correctly}, wrong: {answered_wrongly}
          </Text>

        </TouchableHighlight>
          <Button title="Back To Topic" onPress={handlePress}/>
    </View>
  )
}

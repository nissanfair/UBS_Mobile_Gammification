// React Imports 
import React, {useState, useEffect} from 'react';
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image, TouchableHighlight, BackHandler,Button, ImageBackground} from 'react-native';
import { useDispatch, useSelector,useStore } from 'react-redux'
import {NavigationContainer, useNavigation} from '@react-navigation/native';

// sfx
import { fight } from '../TopicIntroduction';
import { adven } from '../../homescreen';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');
//end sfx

import TopicIntroduction from '../TopicIntroduction';
// Redux Toolkit Variables 

const styles = StyleSheet.create({
    background : {
        width: "100%",
        height: "100%",
        alignItems:'center',
        // alignContent:'center',
        justifyContent:'center'
        

    }
})


export default function Summary({navigation}) {
    
    // Get the Total Score 
    const total_question = useSelector((state) => state.question.total_question);

    // Get the Answered Correctly
    const answer_correctly = useSelector((state) => state.question.answered_correctly);

    // Get the Answer Wrongly
    const answered_wrongly = useSelector((state) => state.question.answered_wrongly);

    const is_win = null;
    // Get the Status of Lost or Win
    if (answered_wrongly > 3) {
      const is_win = false
    }
    else{
      const is_win = true;
    }

    const handlePress = () => {
      // Handle button press here
      console.log('Button pressed!');
      navigation.navigate(TopicIntroduction) 

      //sfx stop and start
      fight.stop();
      adven.setVolume(0.5);
      adven.play();
      adven.setNumberOfLoops(-1);
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
      <ImageBackground source={require("../../../../media/Summarypage.gif")} style={styles.background}>
        <View style ={{"borderRadius":10,"width":'80%','height':'90%','backgroundColor':"white"}}>
          <View style={{"flexDirection":'row',"flex":1}}>
            <View style={{"flex":1}}></View>
            <View style={{"flex":8}}>
              <View style={{"flexDirection":"column","flex":1}}>
                <View style={{"flex":1}}></View>
                  <View style={{"flex":1}}>
                    <Text>Summary Page</Text>
                  </View>
                  <View style={{"flex":7}}>
                    {is_win ? <Text>You have won!</Text> : <Text>You have lost!</Text>}
                    <Button title='Back' onPress={ () => handlePress()  }></Button>
                  </View>
                <View style={{"flex":1}}></View>
              </View>
            </View>
            <View style={{"flex":1}}></View>

          </View>
        </View>
      </ImageBackground>
    // <View>
    //     <TouchableHighlight >
    //       <Text >This is the Summary Page
    //         Out of {total_question}, correctly:  {answer_correctly}, wrong: {answered_wrongly}
    //       </Text>

    //     </TouchableHighlight>
    //       <Button title="Back To Topic" onPress={handlePress}/>
    // </View>
  )
}

// React Imports 
import React, {useState, useEffect, useRef} from 'react';
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image, TouchableHighlight, BackHandler,Button, ImageBackground} from 'react-native';
import { useDispatch, useSelector,useStore } from 'react-redux'
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import { Animated } from 'react-native';


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
    // This is the Fading In Effect. 
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

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
    }
    // Disable back button
    useEffect(() => {
      const handleBackButton = () => true; // returning true disables the back button
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }, []);
  
  
  
  const [displayText, setDisplayText] = useState('');
  // This will render the Type Writer Effect
  const typeWriter = (text, i) => {
    if (i < text.length) {
      setDisplayText(text.substring(0, i + 1));
      setTimeout(() => {
        typeWriter(text, i + 1);
      }, 50);
    }
  }

  useEffect(() => {
    if (is_win) {
      typeWriter("Congratulations, we are one step closer in winning the cyber war.", 0);
    }
    else {
      typeWriter("You died. You have failed to protect the world from cyberthreats..", 0);

    }

  }, []);
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.delay(3000),
      Animated.parallel([
        Animated.timing(fadeInAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ]).start();
  }, []);

    
  return (
      <ImageBackground source={require("../../../../media/Summarypage.gif")} style={styles.background}>
        <View style ={{"borderRadius":20,"width":'80%','height':'90%','backgroundColor':"black","opacity":0.8}}>
         <View style={{flex:1, flexDirection:"row"}}>

            <View style={{"flex":1}}></View>
            <View style={{"flex":10}}>
              <View style={{"flex":1,flexDirection:"column"}}>
                <View style={{"flex":3, "alignItems":'center'}}>
                  {/* This is the Rendering of the Win or Death Picture */}
                  {is_win ? 
                  <Animated.Image source={require("../../../../media/Characters/Adventurer/Individual_Sprites/adventurer-idle-2-00.png")} style={{opacity: fadeAnim, height:"80%",aspectRatio:1, opacity:1}} />
                  :
                  <Animated.Image source={require("../../../../media/Characters/Adventurer/Grave.png")} style={{opacity: fadeAnim, height:"80%",aspectRatio:1, opacity:1}} />
                  }
                </View>
                <View style={{"flex":3,alignItems:'center'}}>
                  {/* This will render the Button as well as the Type Script Effect */}
                  <Text style={{color:"#656894", opacity:1, fontSize:26,align:"center"}}>{displayText}</Text>
                </View>
                <Animated.View style={{"flex":1,alignItems:'center',opacity: fadeInAnim, transform: [{ translateY: slideAnim }]}}>
                  {/* This will render the Button as well as the Type Script Effect */}
                  <TouchableHighlight style={{height:"50%", width:"20%",borderRadius:15, justifyContent:'center', alignItems: 'center',backgroundColor:"#656894"}}>
                    <View>
                        <Text style={{margin:"1%", textDecorationLine:"underline",fontSize:20,color:"white"}} onPress={()=> handlePress()}>Return Home</Text>
                    </View>
                  </TouchableHighlight>
                </Animated.View>

              </View>
            </View>
            <View style={{"flex":1}}></View>

         </View>
        </View>
      </ImageBackground>

  )
}

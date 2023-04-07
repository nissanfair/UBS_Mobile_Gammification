// React Imports 
import React, {useState, useEffect, useRef} from 'react';
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image, TouchableHighlight, BackHandler,Button, ImageBackground} from 'react-native';
import { useDispatch, useSelector,useStore } from 'react-redux'
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Dimensions ,Platform, PixelRatio} from 'react-native';
import { Animated } from 'react-native';


// sfx
import { fight } from '../TopicIntroduction';
import { adven } from '../../homescreen';
import press from '../../../../media/Soundtracks/main/press.wav';
import Sound from 'react-native-sound';
import gameover from "../../../../media/Soundtracks/main/gameover.wav";
import success from "../../../../media/Soundtracks/main/success.wav"
import Forest from "../../../../media/Soundtracks/main/theme_foret.mp3"

// Function
Sound.setCategory('Playback');
export var userPress = new Sound(press, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
});
//end sfx

import TopicIntroduction from '../TopicIntroduction';
// Redux Toolkit Variables 

// Front-Related Implementation
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 500;

export function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'andriod') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

// New Sound for Winning 
var SuccessObject = new Sound(success, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

// New Sound for Losing
var LosingObject = new Sound(gameover, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

var ForestObject = new Sound(Forest,(error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

export default function Summary() {
  const navigation = useNavigation();


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

    var is_win = null;
    // Get the Status of Lost or Win
    if (answered_wrongly == 3) {
      is_win = false
      // Playing the 
    }
    else if (answered_wrongly < 3){
      is_win = true;
    }

    // OnLoad 
    useEffect(() => {
      //sfx stop and start
      fight.stop();

      console.log(is_win + "i am executed here")
      if (is_win){
        SuccessObject.setVolume(0.5)
        SuccessObject.play();

        ForestObject.setVolume(0.5)
        ForestObject.play()
      }
      else{
        LosingObject.setVolume(0.5)
        LosingObject.play()

        ForestObject.setVolume(0.5)
        ForestObject.play()
      }
    },[])



    const handlePress = () => {
      // Handle button press here
      console.log('Button pressed!');
      navigation.navigate(TopicIntroduction) 

      ForestObject.stop();

      adven.setVolume(0.5);
      adven.play();
      adven.setNumberOfLoops(-1);

      userPress.setVolume(1.0);
      userPress.play();

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
      <ImageBackground source={require("../../../../media/Environment/bulkhead-walls-files/bulkhead-wallsx3.png")} style={{width: "100%",height: "100%",alignItems:'center',
      // alignContent:'center',
      justifyContent:'center'}}>
            {is_win ? 
            <Animated.Image source={require("../../../../media/Summary/WinPage2.gif")} style={{opacity: fadeAnim, height:"40%",aspectRatio:1, opacity:1}} />
            :
            <Animated.Image source={require("../../../../media/Summary/LosingPage.gif")} style={{opacity: fadeAnim, height:"40%",aspectRatio:1, opacity:1}} />
            }
        <View style ={{"borderRadius":20,"width":'80%','height':'30%','backgroundColor':"black","opacity":0.8}}>
         <View style={{flex:1, flexDirection:"row"}}>

            <View style={{"flex":1}}></View>
            <View style={{"flex":10}}>
              <View style={{"flex":1,flexDirection:"column"}}>
                <View style={{"flex":1, "alignItems":'center'}}>
                </View>
                <View style={{"flex":3,alignItems:'center'}}>
                  {/* This will render the Button as well as the Type Script Effect */}
                  <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(10),lineHeight:normalize(10),color:"#656894", opacity:1,align:"center"}}>{displayText}</Text>
                </View>
                <Animated.View style={{"flex":3,alignItems:'center',opacity: fadeInAnim, transform: [{ translateY: slideAnim }]}}>
                  {/* This will render the Button as well as the Type Script Effect */}
                  <TouchableHighlight style={{height:"70%", width:"50%",borderRadius:15, justifyContent:'center', alignItems: 'center',backgroundColor:"#656894"}}>
                    <View>
                        <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(10),lineHeight:normalize(10),margin:"1%", textDecorationLine:"underline",color:"white"}} onPress={()=> handlePress()}>Return Home</Text>
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

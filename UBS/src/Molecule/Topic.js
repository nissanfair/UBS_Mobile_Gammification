/* eslint-disable prettier/prettier */

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button, ImageBackground, TouchableHighlight, Animated, PixelRatio, Platform, processColor } from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import TopicLearning from './Topicbundle/TopicLearning';
import TopicIntroduction from './Topicbundle/TopicIntroduction';

import {ProgressBar} from '@react-native-community/progress-bar-android';
import press from '../../media/Soundtracks/main/press.wav';
import Sound from 'react-native-sound';
import intro from '../../media/Soundtracks/main/theme_topic.mp3'

import { adven } from './homescreen'
import { AppState } from 'react-native';

//sfx
Sound.setCategory('Playback');
var userPress = new Sound(press, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
});

var topic_intro = new Sound(intro, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
});



// Redux slices 
import { selectedTopic } from "../Redux/topicSlice"
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');
  
  const scale = SCREEN_WIDTH / 500;
  
function normalize(size) {
    const newSize = size * scale 
    if (Platform.OS === 'andriod') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }
const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Topic = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [levels, addLevels] = useState([{}]);

    // Handle the click when user clicks on a topic - Redirects them to the page 
    const handleClickInformation = (levelinformation) => {
        console.log("hiihi")
        console.log("Handle Click Information")
        // Reset stores for introduction, questions, and education - Rationale is that the user might have clicked other topics before
        dispatch(selectedTopic(""))
        // dispatch level information
        dispatch(selectedTopic(levelinformation));
        // Once done, navigate to the topicsIntroduction page 
        navigation.navigate(TopicIntroduction);

        //sfx
        userPress.setVolume(1.0);
        userPress.play();

        adven.stop();
        topic_intro.setVolume(0.5);
        topic_intro.play(success => {  
            if (success) {  
              console.log('topic intro playing ended successfully here');  
            } 
            else {  
              console.log('topic intro sound failed by audio decoding error');
            }
          });
        topic_intro.setNumberOfLoops(-1);
    }

    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        return () => {
        AppState.removeEventListener('change', handleAppStateChange);
        };
    }, []);

  
    const handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
        // App has come to the foreground
        // Start playing sound again
        topic_intro.getCurrentTime((seconds) => {
            if (seconds != 0) {
            topic_intro.setVolume(0.5);
            topic_intro.play();
            topic_intro.setNumberOfLoops(-1);
            }
    });
    } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
      // App has gone to the background
      // Stop playing sound
      topic_intro.pause();
    }
    setAppState(nextAppState);
  };

    // Handle the educational content
    const handleClickInformationEducation = (levelinformation) => {
        console.log("Handle Click Education Information")

        // Reset stores for introduction, questions, and education - Rationale is that the user might have clicked other topics before
        dispatch(selectedTopic(""))
        dispatch(selectedTopic(levelinformation));
        // Once done, navigate to the topicsLearning page 
        navigation.navigate(TopicLearning);

        //sfx
        userPress.setVolume(1.0);
        userPress.play();
    }

    // Getting the firebase to display and generate the topics
    useEffect(() => {
        // Get all the relevant stages from the firebase from express

        // For some reason have to specify 10.0.2. This is because of the android emulator requiring different network config
        // For JP use for his phone
        // var fetchTopics = "http://192.168.29.14:3000/6bit/topics/totalquizzes"
        // For Emulator
        var fetchTopics = "http://10.0.2.2:3000/6bit/topics/totalquizzes"
        console.log("i am in use Effect")
        // Dynamically get all the topics from firebase - On the firebase side i tweaked it in a way so i /3 lol
        fetch(fetchTopics)
            .then(response => response.json())
            .then(data => {
                // Manipulating the data here 
                var topicDict = []
                for (let i = 1; i < data.topics + 1; i++) {
                    topicDict.push({ topic: `Topic${i}`, display: `Topic ${i}`, education: `Topic${i}`, topicName: data.mainbody[`Topic${i}_Learning`]["Topic Name"] })
                }
                // add the new data to the list of dictionaries
                console.log(topicDict)
                addLevels(topicDict)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    // ANIMATIONS STUFF

    const moveFromLeft = useRef(new Animated.ValueXY({ x: -1000, y: 0 })).current;
    const moveFromRight = useRef(new Animated.ValueXY({ x: 1000, y: 0 })).current;
    const movePopup = useRef(new Animated.ValueXY({ x: 0 ,y: 0 })).current;
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const popupAnimation = Animated.sequence([
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true
        }),        Animated.timing(movePopup, {
            toValue: { x: 0, y: 0 },
            duration: 1000,
            useNativeDriver: true
        }),
        Animated.timing(movePopup, {
            toValue: { x: 0, y: -1000 },
            duration: 1000,
            useNativeDriver: true
        }),
    ]);

    const flyInAnimation = Animated.parallel([
        Animated.timing(moveFromLeft, {
            toValue: { x: 0, y: 0 },
            duration: 500,
            useNativeDriver: true
        }),
        Animated.timing(moveFromRight, {
            toValue: { x: 0, y: 0 },
            duration: 500,
            useNativeDriver: true
        }),
    ]);

    const scaleValue = useRef(new Animated.Value(1)).current;
    const opacityValue = useRef(new Animated.Value(0.8)).current;
    const translateValue = useRef(new Animated.Value(0)).current;

    const animation = Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(scaleValue, {
                        toValue: 1.05,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityValue, {
                        toValue: 0.6,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(scaleValue, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityValue, {
                        toValue: 0.8,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateValue, {
                        toValue: -10,
                        duration: 4000,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(scaleValue, {
                        toValue: 1.05,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityValue, {
                        toValue: 0.6,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(scaleValue, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityValue, {
                        toValue: 0.8,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateValue, {
                        toValue: 0,
                        duration: 4000,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        );
    popupAnimation.start(() => {
        Animated.sequence([
            Animated.delay(2500), // delay the start of flyInAnimation by 1000ms
            flyInAnimation,
          ]).start();    });

    animation.start();






    return (

        <View style={{ width: "100%", height: "100%", flexDirection: "column" }} >
            <ImageBackground source={require("../../media/TopicJs/Topic.gif")} style={{ width: "100%", height: "100%" }}>
                {/* Popup */}

                {/* Pop up  */}
                {/* <Animated.View style={{
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 20,
                    alignItems: 'center',
                    position: 'absolute'
                }}>
                    <Text>My Popup</Text>
                </Animated.View> */}

                {/* To Account for the  Character Badge and Currency*/}
                <View style={{ flex: 1}}>
                    <ImageBackground resizeMode="cover" style={[{ marginTop: "2%", aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "100%", flex: 4 }]} source={require("../../media/TopicJs/menulogo.png")} />

                    {/* For settings button */}
                    <View style={{ position: "absolute", width: "20%", height: "100%", zIndex: 2 }}>
                        <TouchableOpacity style={{ width: "100%", height: "100%" }} onPress={() => console.log("Settings button pressed")}>
                            {/* <ImageBackground resizeMode="cover" style={[{ marginTop: "2%", aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "100%", flex: 4 }]} source={require("../../media/TopicJs/setting.png")} >
                            </ImageBackground> */}

                            <ImageBackground source={require("../../media/Username.png")} resizeMode="contain" style={{ width:"100%", height:"100%"}}>
                            <View style={{ width:"100%", top:"10%", paddingTop: "8%",}}>
                            <Text style={{color: 'black', fontFamily: 'PressStart2P-Regular', fontSize: normalize(8.2), alignSelf: 'center'}}>17 TIBIXS</Text>
                            </View>
                            </ImageBackground>
                        
                        
                        </TouchableOpacity>

                    </View>

                    {/* For user button */}
                    <View style={{ position: "absolute", width: "20%", height: "100%", zIndex: 2, right: 0 }}>
                        <TouchableOpacity style={{ width: "100%", height: "100%" }} onPress={() => console.log("Profile button pressed")}>
                            {/* <ImageBackground resizeMode="cover" style={[{ marginTop: "2%", aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "100%", flex: 4 }]} source={require("../../media/TopicJs/profile.png")} >
                            </ImageBackground> */}

                            <ImageBackground source={require("../../media/Coin.png")} resizeMode="contain" style={{ width:"100%", height:"100%"}}>
                            <View style={{ width:"100%", top:"10%",left:"5%", paddingTop: "8%"}}>
                            <Text style={{color: 'black', fontFamily: 'PressStart2P-Regular', fontSize: normalize(8.2), alignSelf: 'center'}}>2819</Text>
                            </View>
                            </ImageBackground>
                        </TouchableOpacity>

                    </View>
                </View>
                {/* End of the Character Badge */}

                {/* Insert of Topic */}
                {/* <View style={{
                    alignItems: 'center', justifyContent: "center", flex: 4, flexDirection: "column",
                    // backgroundColor: 'rgba(40, 40, 40, 0.8)',
                    // shadowColor: 'rgba(0, 0, 0, 0.3)',
                    // shadowOpacity: 0.8,
                    shadowRadius: 6, padding: 20, width: "60%", borderRadius: 24, alignItems: 'center', alignSelf: "center", justifyContent: "center", flex: 5, flexDirection: "column"
                }}> */}


                {/*Container for all three buttons */}
                <View style={{flex: 5, flexDirection: "row", alignItems: "center"}}>

                    {/* Pop up Shield to be inside the flex 4 container */}

                    <Animated.View
                        style={{
                            borderRadius: 10,
                            // backgroundColor: 'rgba(0, 0, 0, 0.1)', // Set alpha to 0.7 for slight transparency
                            width: "100%",
                            height: "100%",
                            zIndex: 1,
                            padding: 20,
                            alignItems: "center",
                            justifyContent: "center",
                            position: "absolute",
                            opacity: opacityAnim,
                            transform: movePopup.getTranslateTransform(),
                            // transform: [{ scale: scaleAnim }],
                            fontSize: 32,
                            fontWeight: 'bold',
                            color: "black"
                        }}
                    >
                        <Image style={{
                            borderWidth: 2,
                            top:0,
                            
                            aspectRatio:1,
                            height: '120%'}}  source={require("../../media/TopicJs/bgattack.png")}/>
                    </Animated.View>

                    {/*Container for Learning Content Title */}
                <View style={{position: "absolute", top:"0%",left:"25%", width:"50%",paddingTop:"5%", height: "20%"}}>
                    <Text style={{color: 'white', fontFamily: 'PressStart2P-Regular', fontSize: normalize(10), textAlign: 'center'}}>Select Your Boss Fight:</Text>
                           
                </View>


                {/*Container for Malware Attacks */}
                {levels.map((topic, index) => (
                <View style={{flex: 2, flexDirection: "column" }}>
                        
                    <Animated.View style={[{ flex: 4, transform: [{ scale: scaleValue }] }]}>
                    <TouchableOpacity onPress={() => {handleClickInformation(topic.topic); userPress.setVolume(1.0); userPress.play()}}>
                    <ImageBackground
                        source={index == 0 ? require('../../media/UI/play_panelv2.png'): index == 1 ? require('../../media/UI/learn_panelv2.png'):require('../../media/UI/setting_panelv2.png')}
                        resizeMode="cover"
                        style={{height: "100%", width:"100%"}} >

                        {/*/Image */}  
                        <View style={{ flex:2, marginTop: "30%", marginLeft: "3%", alignItems: "center"}}>
                        <Image
                            source={index == 0 ? require('../../media/sorcerer_lg.gif'): index == 1? require('../../media/Characters/Dark_Knight/dark_knight_sm.gif'):require('../../media/slime.gif')}
                            resizeMode="contain"
                            style={index == 0 ?{height: "100%", width:"100%"}:{height: "80%", width:"100%", marginTop:"5%"}} />

                        </View>
                        {/*/Text */}     
                        <View style={{ flex:1, marginLeft:"13%", marginBottom:"25%", width:"75%"}}>
                        <Text style={{color: 'white', fontFamily: 'PressStart2P-Regular', fontSize: normalize(8), alignSelf: 'center', marginBottom: "5%"}}>{topic.topicName}</Text>
                        </View> 
                    </ImageBackground>
                    </TouchableOpacity>
                    </Animated.View>    
                
                </View>
                ))}
                
                
                    
                    <View style={{ position: "absolute", height:"20%", width:"30%", bottom: "0%", paddingLeft:"0%",}}>
                    <TouchableOpacity onPress={() => {navigation.navigate("MainScreen"); userPress.setVolume(1.0); userPress.play()}}>
                    <Image
                        source={require('../../media/UI/back_v2.png')}
                        resizeMode="cover"
                        style={{height:"90%", width:"50%", marginTop:"2%"}} />
                    </TouchableOpacity>
                    </View>






                    {/* {levels.map((topic, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                index % 2 == 0 ? { transform: moveFromLeft.getTranslateTransform() } : { transform: moveFromRight.getTranslateTransform() },
                                { flexDirection: "row", width: "100%", height: "100%", flex: 2, alignItems: 'center', justifyContent: "center" },

                            ]}
                        > */}
                            {/* {console.log(topic)} */}
                            {/* Image swords */}
                            {/* <Animated.View style={[{ flex: 4 }]}>
                                <TouchableOpacity onPress={() => handleClickInformation(topic.topic)} style={{ width: "100%", height: "100%", alignItems: 'center', justifyContent: "center", alignSelf: "center", alignContent: "center" }}>
                                    <ImageBackground resizeMode="cover" style={[{ aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "80%", flex: 4 }]} source={index % 2 == 0 ? require("../../media/TopicJs/attack.png") : require("../../media/TopicJs/attack.png")}>
                                        <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize:normalize(8),lineHeight:normalize(8), textAlign: "center", paddingStart: "7%", paddingEnd: "14%", color:"white" }}>{topic.topicName}</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </Animated.View>
                        </Animated.View> */}
                    {/* ))} */}

                </View>

            </ImageBackground>

        </View>
    )
};




export default Topic;
export { topic_intro };

// Code Dump
{/* {levels.map((level, index) => (
    // <View style={styles.levelButton}>
    // <Text
    //     key={index}
    //     style={styles.levelText}
    //     onPress={() => handleClickInformation(level.topic)}>
    //     {level.display}
        
    // </Text>
    // <TouchableOpacity onPress={() => handleClickInformationEducation()}>
    //     <Image source={require("../../media/Environment/mortarboard.png")} style={styles.levelIcon}/>
    // </TouchableOpacity>

    </View>
    
))} */}
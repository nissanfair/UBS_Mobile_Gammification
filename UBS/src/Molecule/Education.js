/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button, ImageBackground, TouchableHighlight, Animated, PixelRatio, Platform } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import TopicLearning from './Topicbundle/TopicLearning';
import TopicIntroduction from './Topicbundle/TopicIntroduction';
import { ProgressBar } from '@react-native-community/progress-bar-android';

//sfx
import press from '../../media/Soundtracks/main/press.wav';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');
export var userPress = new Sound(press, (error) => {
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
  
  export function normalize(size) {
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

        userPress.setVolume(1.0);
        userPress.play();
    }

    // Handle the educational content
    const handleClickInformationEducation = (levelinformation) => {
        console.log("Handle Click Education Information")

        // Reset stores for introduction, questions, and education - Rationale is that the user might have clicked other topics before
        dispatch(selectedTopic(""))
        dispatch(selectedTopic(levelinformation));
        // Once done, navigate to the topicsLearning page 
        navigation.navigate(TopicLearning);

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
        var fetchTopics = "https://express-6bit.onrender.com/6bit/topics/totalquizzes"
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
            <ImageBackground source={require("../../media/TopicJs/Topic_static.jpg")} style={{ width: "100%", height: "100%" }}>
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
               {/* Logo & Top Container */}
               <View style={{ flex: 1}}>
                    <ImageBackground resizeMode="cover" style={[{ marginTop: "2%", aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "100%", flex: 4 }]} source={require("../../media/TopicJs/FYP_Logo_White.png")} />

                    {/* For settings button */}
                    <View style={{ position: "absolute", width: "20%", height: "100%", zIndex: 2 }}>
                        <TouchableOpacity style={{ width: "100%", height: "100%" }} onPress={() => console.log("Settings button pressed")}>
                            {/* <ImageBackground resizeMode="cover" style={[{ marginTop: "2%", aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "100%", flex: 4 }]} source={require("../../media/TopicJs/setting.png")} >
                            </ImageBackground> */}

                            <ImageBackground source={require("../../media/UI/username.png")} resizeMode="cover" style={{ width:"100%", height:"100%"}}>
                            </ImageBackground>
                        
                        
                        </TouchableOpacity>

                    </View>

                    {/* For user button */}
                    <View style={{ position: "absolute", width: "20%", height: "100%", zIndex: 2, right: 0 }}>
                        <TouchableOpacity style={{ width: "100%", height: "100%" }} onPress={() => console.log("Profile button pressed")}>
                            {/* <ImageBackground resizeMode="cover" style={[{ marginTop: "2%", aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "100%", flex: 4 }]} source={require("../../media/TopicJs/profile.png")} >
                            </ImageBackground> */}

                            <ImageBackground source={require("../../media/UI/coin.png")} resizeMode="cover" style={{ width:"100%", height:"100%", bottom: "10%"}}>
                            </ImageBackground>
                        </TouchableOpacity>

                    </View>
                </View>
                {/* End of the Character Badge */}
              

                {/*Container for all three buttons */}
                <View style={{flex: 5, flexDirection: "row", alignItems: "center"}}>

                {/*Container for Learning Content Title */}
                <View style={{position: "absolute", top:"0%",left:"25%", width:"50%",paddingTop:"5%",  height: "15%"}}>
                    <Text style={{color: 'white', fontFamily: 'PressStart2P-Regular', fontSize: normalize(10), alignSelf: 'center'}}>Learning Contents</Text>
                           
                </View>

                
                   
                {/*Container for Malware Attacks */}
                {levels.map((topic, index) => (

                <View style={{flex: 2, flexDirection: "column" }}>
                    {console.log(index)}
                    
                    <TouchableOpacity onPress={() => {handleClickInformationEducation(topic.education); userPress.setVolume(1.0); userPress.play()}}>
                    <ImageBackground
                        source={index == 0 ? require('../../media/UI/play_panelv3.png'): index == 1 ? require('../../media/UI/learn_panelv3.png'):require('../../media/UI/setting_panelv3.png')}
                        resizeMode="cover"
                        style={{height: "100%", width:"100%"}} >

                        {/*/Image */}  
                        <View style={{ flex:3, marginTop: "10%", marginLeft: "3%", alignItems: "center"}}>
                        <Image
                            source={ index == 0 ? require('../../media/UI/Shield_trans.gif'): index== 1 ? require("../../media/UI/Sword_trans.gif"):require("../../media/UI/star_trans.gif")}
                            resizeMode="contain"
                            style={{height: "80%", width:"100%", top:"20%"}} />

                        </View>
                        {/*/Text */}     
                        <View style={{ flex:1,marginLeft:"20%", paddingLeft:"2%", marginBottom:"25%", width:"60%"}}>
                        <Text style={{color: 'white', fontFamily: 'PressStart2P-Regular', fontSize: normalize(7),lineHeight: normalize(9), alignSelf: 'center', marginBottom: "5%"}}>{topic.topicName}</Text>
                        </View> 
                    </ImageBackground>
                    </TouchableOpacity>
              
                
                </View>
                
                ))}
                
               
                    
                    <View style={{ position: "absolute", height:"20%", width:"30%", bottom: "0%", paddingLeft:"0%"}}>
                    <TouchableOpacity onPress={() => {navigation.navigate("MainScreen"); userPress.setVolume(1.0); userPress.play()}}>
                    <Image
                        source={require('../../media/UI/back_v2.png')}
                        resizeMode="cover"
                        style={{height:"90%", width:"50%", marginTop:"2%"}} />
                    </TouchableOpacity>
                    </View>

                </View>

                {/* Insert of Topic */}
                {/* <View style={{
                    alignItems: 'center', justifyContent: "center", flex: 4, flexDirection: "column",
                    // backgroundColor: 'rgba(40, 40, 40, 0.8)',
                    // shadowColor: 'rgba(0, 0, 0, 0.3)',
                    // shadowOpacity: 0.8,
                    shadowRadius: 6, padding: 20, width: "60%", borderRadius: 24, alignItems: 'center', alignSelf: "center", justifyContent: "center", flex: 5, flexDirection: "column"
                }}> */}

                    {/* Pop up to be inside the flex 4 container
                    <Animated.View
                        style={{
                            borderRadius: 10,
                            // backgroundColor: 'rgba(0, 0, 0, 0.1)', // Set alpha to 0.7 for slight transparency
                            width: "130%",
                            height: "130%",
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
                    > */}
                        {/* <Image style={{
                            borderWidth: 2,
                            top:0,
                            aspectRatio:1,
                            height: '120%'}}  source={require("../../media/TopicJs/bgeducation.png")}/>
                    </Animated.View> */}

                   


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
                                <TouchableOpacity onPress={() => handleClickInformationEducation(topic.education)} style={{ width: "100%", height: "100%", alignItems: 'center', justifyContent: "center", alignSelf: "center", alignContent: "center" }}>
                                    <ImageBackground resizeMode="cover" style={[{ aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "80%", flex: 4 }]} source={index % 2 == 0 ? require("../../media/TopicJs/education.png") : require("../../media/TopicJs/education.png")}>
                                    <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize:normalize(8),lineHeight:normalize(8), textAlign: "center", paddingStart: "7%", paddingEnd: "7%", color:"white" }}>{topic.topicName} [E]</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                             </Animated.View>
                        </Animated.View> */}
                    {/* ))}  */}

                {/* </View> */}
                {/* // <View style={{ flex: 1 }}></View> */}

            </ImageBackground>

        </View>

    )
};




export default Topic;

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
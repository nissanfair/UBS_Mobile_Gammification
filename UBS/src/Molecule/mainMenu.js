/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button, ImageBackground, TouchableHighlight, Animated, PixelRatio , Platform} from 'react-native';
import { DarkTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import TopicLearning from './Topicbundle/TopicLearning';
import TopicIntroduction from './Topicbundle/TopicIntroduction';
import { ProgressBar } from '@react-native-community/progress-bar-android';
// import {Dimensions ,Platform, PixelRatio} from 'react-native';

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
const MainScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [levels, addLevels] = useState([{}]);


    // ANIMATIONS STUFF
    const scaleValue = useRef(new Animated.Value(1)).current;
    const opacityValue = useRef(new Animated.Value(0.8)).current;
    const translateValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
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
        animation.start();
        return () => animation.stop();
    }, [scaleValue, opacityValue, translateValue]);


    return (

        <View style={{ width: windowWidth, height: windowHeight, flexDirection: "column" }} >
            <ImageBackground source={require("../../media/TopicJs/Topic.gif")} style={{ width: "100%", height: "100%" }}>

                {/* Logo */}
                <View style={{flex: 2 }}>
                    <ImageBackground resizeMode="cover" style={[{ marginTop: "2%", aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "100%", flex: 4 }]} source={require("../../media/TopicJs/menulogo.png")} />
                <View style={{ position: "absolute", borderWidth: 2, width: "20%" , height: "100%",zIndex: 2 }}>
                    <TouchableOpacity style={{ width: "100%", height: "100%" }}onPress={() => console.log("Settings button pressed")}>
                    <ImageBackground resizeMode="cover" style={[{ marginTop: "2%", aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "100%", flex: 4 }]} source={require("../../media/TopicJs/setting.png")} >
                    </ImageBackground>
                    </TouchableOpacity>

                </View>
                </View>

                {/* Settings button */}

                {/* <View style={{borderWidth: 2, flex:1}}>

                </View> */}

                <Animated.View style={{
                  
                    shadowOpacity: 0.8,
                    shadowRadius: 6, padding: 20, width: "60%", borderRadius: 24, alignItems: 'center', alignSelf: "center", justifyContent: "center", flex: 5, flexDirection: "column"
                }}>

                    <Animated.View style={[{ flex: 4, transform: [{ scale: scaleValue }] }]}>
                        <TouchableOpacity onPress={() => navigation.navigate("Topic")} style={{ width: "100%", height: "100%", alignItems: 'center', justifyContent: "center", alignSelf: "center", alignContent: "center" }}>
                            <ImageBackground resizeMode="cover" style={[{ aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "100%", flex: 4 }]} source={require("../../media/TopicJs/block.png")}>
                                <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(10),lineHeight:normalize(10), paddingBottom: "7%", paddingEnd: "3%" }}>Play</Text>
                            </ImageBackground>

                        </TouchableOpacity>
                    </Animated.View>


                    <Animated.View style={[{ flex: 4, transform: [{ scale: scaleValue }] }]}>
                        <TouchableOpacity  onPress={() => navigation.navigate("Education")}  style={{ width: "100%", height: "100%", alignItems: 'center', justifyContent: "center", alignSelf: "center", alignContent: "center" }}>
                            <ImageBackground resizeMode="cover" style={[{ aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "100%", flex: 4 }]} source={require("../../media/TopicJs/block.png")}>
                                <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize:normalize(10),lineHeight:normalize(10), paddingBottom: "7%", paddingEnd: "3%" }}>Get Educated</Text>
                            </ImageBackground>

                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View style={[{ flex: 4, transform: [{ scale: scaleValue }] }]}>
                        <TouchableOpacity style={{ width: "100%", height: "100%", alignItems: 'center', justifyContent: "center", alignSelf: "center", alignContent: "center" }}>
                            <ImageBackground resizeMode="cover" style={[{ aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "100%", flex: 4 }]} source={require("../../media/TopicJs/block.png")}>
                                <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(10),lineHeight:normalize(10), paddingBottom: "7%", paddingEnd: "3%" }}>About</Text>
                            </ImageBackground>

                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
                <View style={{ flex: 1 }}></View>
                {/* End of Topic */}


                {/* I removed these parts ba, cos very hard to align @jiEPeng */}

                {/* Final Rows */}
                {/* <View style={{ flexDirection: "row", gap: "10%" }}>
                    <View style={{ flex: 5 }}>
                        <Text style={{ alignSelf: "center", color: 'white' }}>MARKETPLACE</Text>
                    </View>
                    <View style={{ flex: 5 }}>
                        <Text style={{ alignSelf: "center", color: 'white' }}>TOPIC  SELECTION</Text>
                    </View>
                    <View style={{ flex: 5 }}>
                        <Text style={{ alignSelf: "center", color: 'white' }}>EQUIPMENT</Text>
                    </View>
                </View> */}
            </ImageBackground>

        </View>
    )
};




export default MainScreen;

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
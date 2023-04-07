/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button, ImageBackground, TouchableHighlight, Animated, PixelRatio, Platform } from 'react-native';
import { DarkTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import TopicLearning from './Topicbundle/TopicLearning';
import TopicIntroduction from './Topicbundle/TopicIntroduction';
import { ProgressBar } from '@react-native-community/progress-bar-android';

import { PanResponder } from 'react-native';

// import {Dimensions ,Platform, PixelRatio} from 'react-native';

// Redux slices 
import { selectedTopic } from "../Redux/topicSlice"

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

// Sliding Panel Component 
const SlidingPanel = ({ visible }) => {
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation, {
          toValue: visible ? 1 : 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, [animation, visible]);

    const transform = [    {      translateX: animation.interpolate({        inputRange: [0, 1],
        outputRange: [200, 0],
        }),
        },
    ];

    return (
    <Animated.View style={[        Slidingstyles.panel,        visible ? Slidingstyles.visible : null,        { transform },      ]} >
      <View style={[Slidingstyles.panel, visible ? Slidingstyles.visible : null]}>
        {/* Content of the sliding panel goes here */}
        <View style={{flexDirection:'column',flex:1}}>
            <View style={{flex:1}}></View>
            <View style={{flex:4,alignContent:'center',alignItems:'center'}}>
                {/* origins_trans.gif */}
                <Image source={require('../../media/UI/origins_trans.gif')} resizeMode="contain" style={{height: "50%", width:"100%"}} />
                <Text style={{fontFamily: 'PressStart2P-Regular', fontSize: normalize(8),lineHeight: normalize(8), alignItems:"center"}}>6 Bit Games</Text>
            </View>

            <View style={{flex:3, alignItems:'center'}}>
                {/* About Us */}
                <View style={{ borderRadius: 20, backgroundColor: '#D6C4FF', padding: 10, width:"50%"}}>
                    <Text style={{fontFamily: 'PressStart2P-Regular', fontSize: normalize(8),lineHeight: normalize(8), color: 'white', fontWeight: 'bold', textAlign: 'center' }}>About Us</Text>
                </View>
                {/* Sign Out */}
                <View style={{ borderRadius: 20, backgroundColor: '#D2D3D4', padding: 10, width:"50%", marginTop:"5%"}}>
                    <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(8),lineHeight: normalize(8),color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Sign Out</Text>
                </View>
            </View>
            <View style={{flex:3}}></View>

        </View>
    </View>
    </Animated.View>

    );
};

const Slidingstyles = StyleSheet.create({
    panel: {
      position: "absolute",
      top: 0,
      right: -200, // start off-screen
      width: 200,
      height: "100%",
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      zIndex: 100, // set a high z-index value
      elevation: 5,
    },
    visible: {
      right: 0, // slide into view
    },
  });


const MainScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [levels, addLevels] = useState([{}]);
    // Swipe Right 
    // const [panResponder, setPanResponder] = useState(null);


    // Add the MainScreen Page
    const [panelVisible, setPanelVisible] = useState(false);

    const SettingToggle = () => {
        userPress.setVolume(1.0); 
        userPress.play();

        setPanelVisible(!panelVisible);
        console.log(panelVisible)

    }

    const closeToggle =  () => {
        setPanelVisible(false);
        console.log("closeToggle")
    }

    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderRelease: (e, gestureState) => {
            if (gestureState.dx > 50) {
              closeToggle();
            }
          },
        })
      ).current;



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

        <View style={{ width: "100%", height: "100%", flexDirection: "column" }} >

            <ImageBackground source={require("../../media/TopicJs/Topic_static.jpg")} style={{ width: "100%", height: "100%" }}
                {...panResponder.panHandlers} // <-- add this
            >

            {/* {panelVisible ?<TouchableOpacity onPress={() => closeToggle()} style={{ position: 'absolute',height:"100%",width:"100%",backgroundColor: 'red',zIndex: 101}}></TouchableOpacity> : <></>} */}

                {/* Logo & Top Container */}
                <View style={{ flex: 1}}>
                    <ImageBackground resizeMode="cover" style={[{ marginTop: "2%", aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "100%", flex: 4 }]} source={require("../../media/TopicJs/FYP_Logo_White.png")} />

                    {/* For settings button */}
                    <View style={{ position: "absolute", width: "20%", height: "100%", zIndex: 2, }}>
                        <TouchableOpacity style={{ width: "100%", height: "100%" }} onPress={() => console.log("Settings button pressed")}>
                            {/* <ImageBackground resizeMode="cover" style={[{ marginTop: "2%", aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "100%", flex: 4 }]} source={require("../../media/TopicJs/setting.png")} >
                            </ImageBackground> */}

                            <ImageBackground source={require("../../media/UI/username.png")} resizeMode="cover" style={{ width:"100%", height:"100%"}}>
                            </ImageBackground>
                        
                        
                        </TouchableOpacity>

                    </View>

                    {/* For user button */}
                    <View style={{ position: "absolute", width: "20%", height: "100%", zIndex: 2, right: "0%",  }}>
                        <TouchableOpacity style={{ width: "100%", height: "100%" }} onPress={() => console.log("Profile button pressed")}>
                            {/* <ImageBackground resizeMode="cover" style={[{ marginTop: "2%", aspectRatio: 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row", width: "100%", height: "100%", flex: 4 }]} source={require("../../media/TopicJs/profile.png")} >
                            </ImageBackground> */}

                            <ImageBackground source={require("../../media/UI/coin.png")} resizeMode="cover" style={{ width:"100%", height:"100%", bottom: "10%"}}>
                            
                            </ImageBackground>
                        </TouchableOpacity>

                    </View>
                </View>

                {/*Bottom Container*/}
                <View style={{flex: 5, flexDirection: "row", alignItems: "center"}}>

                    
                    <View style={{flex: 2, flexDirection: "column" }}>
                    
                    <TouchableOpacity onPress={() => {closeToggle();navigation.navigate("Topic"); userPress.setVolume(1.0); userPress.play()}}>
                    <ImageBackground
                        source={require('../../media/UI/play_panelv3.png')}
                        resizeMode="cover"
                        style={{height: "100%", width:"100%"}} >

                        {/*/Image */}  
                        <View style={{ flex:3, marginTop: "10%",top:"10%", marginLeft: "3%"}}>
                        <Image
                            source={require('../../media/UI/play_trans.gif')}
                            resizeMode="contain"
                            style={{height: "100%", width:"100%"}} />

                        </View>
                        {/*/Text */}     
                        <View style={{ flex:1, marginTop:"3%", marginBottom:"25%"}}>
                        <Text style={{color: 'white', fontFamily: 'PressStart2P-Regular', fontSize: normalize(13), alignSelf: 'center', marginBottom: "5%"}}>Play</Text>
                        </View> 
                    </ImageBackground>
                    </TouchableOpacity>
                    
                    
                
                    </View>

                    <View style={{flex: 2,flexDirection: "column" }}>
                    
                    <TouchableOpacity onPress={() => {closeToggle();navigation.navigate("Education"); userPress.setVolume(1.0); userPress.play()}}>
                    <ImageBackground
                        source={require('../../media/UI/learn_panelv3.png')}
                        resizeMode="cover"
                        style={{height: "100%", width:"100%"}} >

                        {/*/Image */}  
                        <View style={{ flex:3, marginTop: "10%", marginLeft: "3%", alignItems: "center"}}>
                        <Image
                            source={require('../../media/Characters/LearningPartner/orangeman.gif')}
                            resizeMode="contain"
                            style={{height: "100%", width:"100%"}} />

                        </View>
                        {/*/Text */}     
                        <View style={{ flex:1, marginTop:"3%", marginBottom:"25%"}}>
                        <Text style={{color: 'white', fontFamily: 'PressStart2P-Regular', fontSize: normalize(13), alignSelf: 'center', marginBottom: "5%"}}>Learn</Text>
                        </View> 
                    </ImageBackground>
                    </TouchableOpacity>
                    

                    </View>

                    <View style={{flex: 2, flexDirection: "column" }}>
                        
                        <TouchableOpacity onPress={() => SettingToggle()}>
                        <ImageBackground
                            source={require('../../media/UI/setting_panelv3.png')}
                            resizeMode="cover"
                            style={{height: "100%", width:"100%"}} >

                        {/*/Image */}  
                        <View style={{ flex:3, marginTop: "10%", marginLeft: "3%", alignItems: "center"}}>
                        <Image
                            source={require('../../media/UI/setting_trans.gif')}
                            resizeMode="contain"
                            style={{height: "140%", width:"100%"}} />

                        </View>
                        {/*/Text */}     
                        <View style={{ flex:1, marginTop:"3%", marginBottom:"25%"}}>
                        <Text style={{color: 'white', fontFamily: 'PressStart2P-Regular', fontSize: normalize(13), alignSelf: 'center', marginBottom: "5%"}}>Settings</Text>
                        </View> 
                        </ImageBackground>
                        </TouchableOpacity>
                        

                    </View>



                </View>
                <SlidingPanel visible={panelVisible} />
            </ImageBackground>

        </View>
    )
};




export default MainScreen;

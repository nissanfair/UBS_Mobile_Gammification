/* eslint-disable prettier/prettier */
import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button, ImageBackground, TouchableHighlight, Animated } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import TopicLearning from './Topicbundle/TopicLearning';
import TopicIntroduction from './Topicbundle/TopicIntroduction';
import { ProgressBar } from '@react-native-community/progress-bar-android';

// Redux slices 
import { selectedTopic } from "../Redux/topicSlice"

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
        console.log("Handle Click Information")
        // Reset stores for introduction, questions, and education - Rationale is that the user might have clicked other topics before
        dispatch(selectedTopic(""))
        // dispatch level information
        dispatch(selectedTopic(levelinformation));
        // Once done, navigate to the topicsIntroduction page 
        navigation.navigate(TopicIntroduction);
    }

    // Handle the educational content
    const handleClickInformationEducation = (levelinformation) => {
        console.log("Handle Click Education Information")

        // Reset stores for introduction, questions, and education - Rationale is that the user might have clicked other topics before
        dispatch(selectedTopic(""))
        dispatch(selectedTopic(levelinformation));
        // Once done, navigate to the topicsLearning page 
        navigation.navigate(TopicLearning);
    }

    // Getting the firebase to display and generate the topics
    useEffect(() => {
        // Get all the relevant stages from the firebase from express

        // For some reason have to specify 10.0.2. This is because of the android emulator requiring different network config
        // For JP use for his phone
        var fetchTopics = "http://192.168.29.14:3000/6bit/topics/totalquizzes"
        // For Emulator
        // var fetchTopics = "http://10.0.2.2:3000/6bit/topics/totalquizzes"

        // Dynamically get all the topics from firebase - On the firebase side i tweaked it in a way so i /3 lol
        fetch(fetchTopics)
            .then(response => response.json())
            .then(data => {
                // Manipulating the data here 
                var topicDict = []
                for (let i = 1; i < data.topics + 1; i++) {
                    topicDict.push({ topic: `Topic${i}`, display: `Topic ${i}`, education: `Topic${i}`, topicName: data.mainbody[`Topic${i}_Learning`]["Topic Name"]})
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

  
    //   Handle press animation end
    const moveFromLeft = new Animated.ValueXY({ x: -500, y: 0 });
    const moveFromRight = new Animated.ValueXY({ x: 500, y: 0 });
    const pulseValue = new Animated.Value(0);

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

    const pulseAnimation = Animated.loop(
        Animated.timing(pulseValue, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true
        })
    );

    const combinedAnimation = Animated.sequence([
        flyInAnimation,
    ]);

    combinedAnimation.start();





    return (

        <View style={{ width: windowWidth, height: windowHeight, flexDirection: "column" }} >
            <ImageBackground source={require("../../media/TopicJs/Topic.gif")} style={{ width: "100%", height: "100%" }}>
                {/* To Account for the  Character Badge and Currency*/}
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginTop: "2%" }}>
                    <View style={{ marginLeft: "5%", flex: 2, backgroundColor: "" }}>
                        {/* Insert the user name here */}
                        <Image source={require("../../media/Username.png")} resizeMode="contain" style={{ width: windowWidth * 0.2 }} />
                        {/* Insert the user name here */}
                    </View>

                    <View style={{ flex: 2, backgroundColor: "red" }}></View>

                    <View style={{ marginRight: "0%", flex: 2, alignItems: "center", marginRight: "5%" }}>
                        {/* To make the Currency Sign */}
                        <Image source={require("../../media/Coin.png")} resizeMode="contain" style={{ width: windowWidth * 0.2 }}></Image>
                    </View>

                </View>
                {/* End of the Character Badge */}

                {/* Insert of Topic */}
                <View style={{flex:1}}></View>

                <View style={{alignItems: 'center', justifyContent: "center", flex: 4, flexDirection: "column" }}>


                    {levels.map((topic, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                index % 2 == 0 ? { transform: moveFromLeft.getTranslateTransform() } : { transform: moveFromRight.getTranslateTransform() },
                                { flexDirection: "row", width: "100%", height: "100%", flex: 2, alignItems: 'center', justifyContent: "center" },

                            ]}
                        >
                            {/* Image swords */}
                            <Animated.View style={[{flex:4}]}>
                                <TouchableOpacity style={{ width: "100%", height: "100%", alignItems: 'center', justifyContent: "center", alignSelf: "center",alignContent: "center"}}>
                                    <ImageBackground resizeMode="cover" style={[{ aspectRatio: 4, alignSelf: "center",justifyContent: "center", alignItems: "center", paddingLeft: "1%", flexDirection: "row" ,width: "100%", height: "100%", flex: 4}]} source={index % 2 == 0 ? require("../../media/TopicJs/block.png") : require("../../media/TopicJs/block.png")}>
                                    <Text style={{paddingBottom: "7%", paddingEnd: "3%"}}>{topic.topicName}</Text>
                                    </ImageBackground>

                                </TouchableOpacity>
                            </Animated.View>

                            {/* <View style={{borderWidth:2, flex:1, flexDirection: "column", borderWidth: 2, width: '100%', height: '100%', alignContent: "flex-start",justifyContent: "flex-start", alignSelf: "flex-start"}}>
                                <View style={{borderWidth:2, flex:5}}>
                                <TouchableOpacity style={{borderWidth:2, borderColor: "cyan", width: '100%', height: '100%'}}>
                                <Image resizeMode='cover' style={{ borderWidth:2,height: "120%", width: "120%"}} source={require("../../media/TopicJs/learn.png")} />
                                </TouchableOpacity>
                                </View>
                                <View style={{borderWidth:2, flex:2}}>
                                    <Text>hi</Text>
                                </View>

                            </View> */}
                         


                        </Animated.View>
                    ))}
                    {/* <View style={{ flexDirection: "row", width: "100%", height: "100%", flex: 2, alignItems: 'center', justifyContent: "center", borderWidth: 2, borderColor: "white" }}>

                        <Image style={{ flex: 4, border: 2, borderColor: "magenta", width: "40%", height: "125%" }}
                            source={require("../../media/TopicJs/SwordReversed.png")}
                            resizeMode='stretch'
                        />


                        <ImageBackground resizeMode='contain' source={require("../../media/TopicJs/book.png")} style={{ flex: 1, height: "80%", width: "60%" }} >
                            <TouchableOpacity onPress={() => handleClickInformationEducation(topic.education)}>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>

                    <View style={{ width: "100%", height: "100%", flex: 2, borderWidth: 2, borderColor: "green" }}>
                        <View style={{ borderWidth: 2, width: '100%', height: '100%', alignItems: "center", justifyContent: "center" }}>
                            <TouchableWithoutFeedback onPress={() => handleClickInformationEducation(topic.education)}>
                                <Image resizeMode='repeat' style={{ height: "10%", width: "10%" }} source={require("../../media/TopicJs/book.png")} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View style={{ width: "100%", height: "100%", flex: 2, borderWidth: 2, borderColor: "yellow" }}>
                        <Text>helo</Text>

                    </View> */}
                </View>
                <View style={{flex:1}}></View>
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
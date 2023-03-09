/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button, ImageBackground, TouchableHighlight, Animated } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import TopicLearning from './Topicbundle/TopicLearning';
import TopicIntroduction from './Topicbundle/TopicIntroduction';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import LinearGradient from 'react-native-linear-gradient';

// Redux slices 
import { selectedTopic } from "../Redux/topicSlice"

const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');

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
                    topicDict.push({ topic: `Topic${i}`, display: `Topic ${i}`, education: `Topic${i}` })
                }
                // add the new data to the list of dictionaries
                addLevels(topicDict)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    // ANIMATIONS STUFF
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

        <View>
            <ImageBackground source={require("../../media/TopicJs/Topic.gif")} style={{ width: "100%", height: "100%" }} >
                {/* To Account for the  Character Badge and Currency*/}
                <View style={{ flex: 3, flexDirection: "row", alignItems: "center", marginTop: "2%" }}>
                    <View style={{ marginLeft: "5%", flex: 4, backgroundColor: "" }}>
                        {/* Insert the user name here */}
                        <Image source={require("../../media/Username.png")} resizeMode="contain" style={{ width: "100%" }} />
                        {/* Insert the user name here */}

                    </View>

                    <View style={{ flex: 10, backgroundColor: "red" }}></View>

                    <View style={{ marginRight: "0%", flex: 4, alignItems: "center", marginRight: "5%" }}>
                        {/* To make the Currency Sign */}
                        <Image source={require("../../media/Coin.png")} resizeMode="contain" style={{ width: "100%" }}></Image>
                    </View>

                </View>
                {/* End of the Character Badge */}

                {/* Insert of Topic */}
                <View style={{ width: "100%", borderColor: "red", alignItems: 'center', flex: 10 }}>
                    <View>
                        {levels.map((topic, index) => (
                            <Animated.View
                                key={index}
                                style={[
                                    index % 2 == 0 ? { transform: moveFromLeft.getTranslateTransform() } : { transform: moveFromRight.getTranslateTransform() },
                                    { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, 

                                ]}
                            >
                                <Animated.View >
                                    <ImageBackground resizeMode="contain" style={[
                                        { width: 300, height: 80, alignItems: "center", alignContent: "center" }
                                    ]} source={index % 2 == 0 ? require("../../media/TopicJs/Sword.png") : require("../../media/TopicJs/SwordReverse.png")}>
                                        <View style={{ position: 'absolute', bottom: "40%", width: "100%", alignItems: "center" }}>
                                            <Text onPress={() => handleClickInformation(topic.topic)} style={{ color: 'white' }}>{topic.display}</Text>
                                        </View>
                                        <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                                            <LinearGradient
                                                colors={['rgba(255, 255, 255, 0.5)', 'transparent']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                style={{ flex: 1 }}
                                            />
                                        </View>
                                    </ImageBackground>
                                </Animated.View>
                                <View style={{ width: '15%', height: '50%' }}>
                                    <TouchableWithoutFeedback onPress={() => handleClickInformationEducation(topic.education)}>
                                        <Image resizeMode='contain' style={{ height: 40, width: 50 }} source={require("../../media/TopicJs/book.png")} />
                                    </TouchableWithoutFeedback>
                                </View>
                            </Animated.View>
                        ))}
                    </View>
                </View>
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

const styles = StyleSheet.create({
    example: {
        marginHorizontal: 5
    },

    levelText: {
        fontSize: 30,
        textAlign: 'center',
        width: width / 2,
        borderWidth: 2,
        borderColor: '#F00',
        borderRadius: 10,
        padding: 10,
        marginVertical: height * 0.05,

    },
    levelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 1,
        flexWrap: 'wrap',
    },
    levelButton: {
        alignItems: 'center',
        flexDirection: 'row'
    },

    //     levelIcon: {
    //         width: 30,
    //         height: 30,
    //         marginRight: 10,
    //     },
});

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
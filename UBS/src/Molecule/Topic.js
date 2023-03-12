/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button, ImageBackground, TouchableHighlight } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import TopicLearning from './Topicbundle/TopicLearning';
import TopicIntroduction from './Topicbundle/TopicIntroduction';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {styles} from '../Styling';

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
        // var fetchTopics = "http://192.168.29.14:3000/6bit/topics/totalquizzes"
        // For Emulator
        var fetchTopics = "http://10.0.2.2:3000/6bit/topics/totalquizzes"
        
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
                console.log(topicDict)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (

        <View>
            <ImageBackground source={require("../../media/TopicJs/TopicBackground.png")} style={styles.background} >
                {/* To Account for the  Character Badge and Currency*/}
                <View style={styles.userBadgeTop}>
                    <View style={styles.userBadgeAlign}>
                        <View style={styles.userBadgeColour}>
                            {/* Insert the User Name Here */}
                        </View>
                    </View>

                    <View style={styles.userBadge}></View>

                    <View style={styles.userBadgeColour}>
                        {/* To make the Currency Sign */}
                        {/* Outer Circle */}
                        <View style={styles.userBadgeCurrency}>
                            {/* Inner Circle */}
                            {/* Maybe can add a SVG Here */}
                        </View>
                    </View>

                </View>
                {/* End of the Character Badge */}

                {/* Insert of Topic */}
                <View style={styles.topicHome}>
                    <View >
                        {/* First topic */}
                        {levels.map((topic, index) => (
                            index % 2 == 0 ? (
                                <View style={styles.topicHome2}>
                                    <View>
                                        <ImageBackground resizeMode="contain" style={styles.topicIntroIcon} source={require("../../media/TopicJs/Sword.png")} >
                                            <View style={styles.topicHomeAlign}>
                                                <Text style={styles.topicHomeFont} onPress={() => handleClickInformation(topic.topic)}>{topic.display}</Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View style={styles.TopicLearning}>
                                        <TouchableWithoutFeedback onPress={() => handleClickInformationEducation(topic.education)}>
                                            <Image resizeMode='contain' style={styles.topicLearningIcon} source={require("../../media/TopicJs/book.png")}>
                                            </Image>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            ) : (

                                <View style={styles.topicHome2}>
                                    <View >
                                        <ImageBackground resizeMode="contain" style={styles.topicIntroIcon} source={require("../../media/TopicJs/SwordReverse.png")} >
                                            <View style={styles.topicHomeAlign}>
                                                <Text style={styles.topicHomeFont} onPress={() => handleClickInformation(topic.topic)}>{topic.display}</Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View style={styles.topicLearning}>
                                        <TouchableWithoutFeedback onPress={() => handleClickInformationEducation(topic.education)}>
                                            <Image resizeMode='contain' style={styles.topicLearningIcon} source={require("../../media/TopicJs/book.png")}>
                                            </Image>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            )
                        ))}



                    </View>
                </View>
                {/* End of Topic */}

                {/* Final Rows */}
                <View style={styles.topicTab}>
                    <View style={styles.topicTabAlign}>
                        <Text style={styles.topicTabFont}>MARKETPLACE</Text>
                    </View>
                    <View style={styles.topicTabAlign}>
                        <Text style={styles.topicTabFont}>TOPIC  SELECTION</Text>
                    </View>
                    <View style={styles.topicTabAlign}>
                        <Text style={styles.topicTabFont}>EQUIPMENT</Text>
                    </View>
                </View>
            </ImageBackground>

        </View>
    )
};

// const styles = StyleSheet.create({
//     example: {
//         marginHorizontal: 5
//     },

//     levelText: {
//         fontSize: 30,
//         textAlign: 'center',
//         width: width / 2,
//         borderWidth: 2,
//         borderColor: '#F00',
//         borderRadius: 10,
//         padding: 10,
//         marginVertical: height * 0.05,

//     },
//     levelContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         padding: 1,
//         flexWrap: 'wrap',
//     },
//     levelButton: {
//         alignItems: 'center',
//         flexDirection: 'row'
//     },

// //     levelIcon: {
// //         width: 30,
// //         height: 30,
// //         marginRight: 10,
// //     },
// });

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
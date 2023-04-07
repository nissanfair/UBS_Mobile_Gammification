import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableHighlight, TouchableOpacity, Button, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, Platform, PixelRatio } from 'react-native';

// Redux
import { setSelectedTimeState, setShowSummary, setTotal_Questions, set_answered_correctly, set_answered_wrongly, set_game_status } from "../../../Redux/questionSlice"
import { current } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux'


// SFX
import press from '../../../../media/Soundtracks/main/press.wav'
import Sound from 'react-native-sound';
Sound.setCategory('Playback');
export var userPress = new Sound(press, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });
// end sfx

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


const Question = ({ gameStatus }) => {

    // Front-Related Implementation

    const navigation = useNavigation();
    const dispatch = useDispatch()
    // Change between different questions, by default we set the first question first

    // Questions to simulate the firebase
    const actual_questions = useSelector((state) => state.question.topicQuestionObject)

    // Use State for Changing between Prompts 
    const [showQuestion, setShowQuestion] = useState(true)
    const [correct, setCorrect] = useState(false)
    const [prompt, setPrompt] = useState("")

    const [displayText, setDisplayText] = useState('');
    const [isQuestionRendered, setIsQuestionRendered] = useState(false);

    const [questionNum, setquestionNum] = useState(1)

    const typeWriter = (text, i) => {
        if (i < text.length) {
            setDisplayText(text.substring(0, i + 1));
            setTimeout(() => {
                typeWriter(text, i + 1);
            }, 10);
        }
    }
    // UseSelector
    const timestate = useSelector((state) => state.question.timestate);

    // Number for index of question
    const [questionIndex, setQuestionIndex] = useState(0)
    // Set current question
    const [currentQuestion, setQuestion] = useState(actual_questions[questionIndex])

    // Function for Shuffle of Random Questions. 
    const shuffle = (array) => {
        
        let currentIndex = array.length;
        let temporaryValue, randomIndex;
    
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
    }
    
    // Random Option
    const [randomOptionA, setrandomOptionA] = useState(null);
    const [randomOptionB, setrandomOptionB] = useState(null);
    const [randomOptionC, setrandomOptionC] = useState(null);
    const [randomOptionD, setrandomOptionD] = useState(null);


    // I have a UseEffect, that each time the Current Question Changes, it will trigger the Fisher Yates Algorithm. 
    useEffect(()=>{
        const shuffledOptions = shuffle(["optionA","optionB","optionC","optionD"])
        setrandomOptionA(shuffledOptions[0])
        setrandomOptionB(shuffledOptions[1])
        setrandomOptionC(shuffledOptions[2])
        setrandomOptionD(shuffledOptions[3])
    },[currentQuestion])


    // Not sure whether this is need , yuxiang this is your code
    useEffect(() => {
        dispatch(setTotal_Questions(actual_questions.length))
    }, [])
    // This useEffect is to track if the Timer has ended.
    useEffect(() => {
        if (timestate === "END") {
            // Ran out of Time 
            setShowQuestion(false);

            setCorrect(false)

            setPrompt(actual_questions[questionIndex]["Explanation"])
        }
        // This is to ensure that each time i change the question index, i set the current question
        setQuestion(actual_questions[questionIndex])
    }, [timestate, questionIndex])

    const userAnswer = (tempinput) => {
        // Internal Map
        const map = {"optionA": "A", "optionB":"B", "optionC":"C", "optionD":"D"};
        const answer = map[tempinput]
        console.log(tempinput);
        console.log(answer)
        // console.log(answer), Yes this is working. 
        if (answer == currentQuestion['Answer']) {

            // Step 1: Ensure that Timer is Paused 
            dispatch(setSelectedTimeState("PAUSE"))

            // Step 2: Hide The Questions
            setShowQuestion(false)

            //Step 3: Set it to Correct Answer 
            setCorrect(true)

            //Step 4: Set The Prompt (To be Changed to Fetching API)
            setPrompt(actual_questions[questionIndex]["Explanation"])

            // Step 5: Change the Answered Correctly +1 
            dispatch(set_answered_correctly(1))


            // sfx for pressing
            userPress.setVolume(1.0);
            userPress.play();

        }
        else {
            // Step 1: Ensure that Timer is Paused 
            dispatch(setSelectedTimeState("PAUSE"))

            // Step 2: Hide The Questions
            setShowQuestion(false)

            //Step 3: Set it to Wrong Answer 
            setCorrect(false)

            //Step 4: Set The Prompt (To be Changed to Fetching API)
            setPrompt(actual_questions[questionIndex]["Explanation"])

            //Step 5: Set the Answered Wrongly to +1 
            console.log(" i am triggered in userAnswer for wrong questions")
            dispatch(set_answered_wrongly(1))

            // sfx for pressing
            userPress.setVolume(1.0);
            userPress.play();
        }
    }

    const NextQuestion = () => {
        // Step 1: Change the Question Index
        setquestionNum(questionNum+1);
        if (questionIndex + 1 == actual_questions.length) {
            // Set the Global Variable to show the Summary Table: 
            dispatch(setShowSummary(true))
            console.log("You have reached the end of the questions")

            // reset the state of the question
            // Reset health, reset the index of the questions 
            setQuestionIndex(0)
            setQuestion(actual_questions[questionIndex])
            dispatch(set_game_status("RESET"))


            // Set the Total Questions 
            // dispatch(setTotal_Questions(actual_questions.length))

            // Navigate the person out to the Summary Page
            navigation.navigate("Summary")
        }
        else {
            setQuestionIndex(questionIndex + 1);
            userPress.setVolume(1.0);
            userPress.play();
        }
        // Step 2: Set True to Show Question
        setShowQuestion(true)
        // Step 3: Restart the Timer
        dispatch(setSelectedTimeState("RESTART"))
        // Step 4: Set Prompt to Empty Again
        setPrompt("")
    }

    useEffect(() => {
        typeWriter(currentQuestion["Question"], 0);
        setIsQuestionRendered(true);

    }, [currentQuestion]);


    return (
        <View style={{ height: "100%", width: "100%", backgroundColor: '#072205' }}>
            <View style={{ width: "98%", backgroundColor: "#4FB45C", display: "flex", margin: "1%" }}>
                <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(7), margin: "1%", width: "100%" }} >QUESTION {questionNum} </Text>
            </View>

            <View style={{ margin: "1%", marginTop: "1%" }}>
                <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(7), color: "#4FB45C" }}>{displayText} </Text>
            </View>

            {showQuestion ?
                <>
                    {/* This is for Option A and B */}
                    <View style={{ width: "98%", height: "30%", flexDirection: "row", margin: "1%" }}>
                        <TouchableHighlight underlayColor='#4FB45C' style={{ height: "100%", width: "49%", backgroundColor: "#4FB45C", borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => userAnswer(randomOptionA)}>
                            <View>
                                <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(6), lineHeight: normalize(10), margin: 5, color: "black", padding:10 }}>{currentQuestion[randomOptionA]}</Text>
                            </View>
                        </TouchableHighlight>


                        <View style={{ height: "100%", width: "2%" }}></View>

                        <TouchableHighlight underlayColor='#4FB45C' style={{ height: "100%", width: "49%", backgroundColor: "#4FB45C", borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => userAnswer(randomOptionB)}>
                            <View>
                                <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(6), lineHeight: normalize(10), margin: 5, color: "black",padding:10 }}>{currentQuestion[randomOptionB]}</Text>
                            </View>
                        </TouchableHighlight>

                    </View>
                    {/* THIS IS FOR OPTION C AND D  */}
                    <View style={{ width: "98%", height: "30%", flexDirection: "row", margin: "1%" }}>
                        <TouchableHighlight underlayColor='#4FB45C' style={{ height: "100%", width: "49%", backgroundColor: "#4FB45C", borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => userAnswer(randomOptionC)}>
                            <View>
                                <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(6), lineHeight: normalize(10), margin: 5, color:"black",padding:10 }}>{currentQuestion[randomOptionC]}</Text>
                            </View>
                        </TouchableHighlight>


                        <View style={{ height: "100%", width: "2%" }}></View>

                        <TouchableHighlight underlayColor='#4FB45C' style={{ height: "100%", width: "49%", backgroundColor: "#4FB45C", borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => userAnswer(randomOptionD)}>
                            <View>
                                <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(6), lineHeight: normalize(10), margin: 5, color:"black",padding:10 }}>{currentQuestion[randomOptionD]}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </>
                :
                <>
                    {/* This Part will show if the  */}
                    {correct ?
                        <View style={{ height: "70%", width: "98%", margin: "1%", borderRadius: 10, backgroundColor: "#4FB45C", justifyContent: 'center', alignItems: 'center' }} >
                            {/* require("../../media/UI/star_trans.gif") */}
                            <Image source={require('../../../../media/UI/star_trans.gif')} style={{height:"20%", aspectRatio:1}} />
                            <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(7), lineHeight: normalize(7),color:'black' }}>You are correct! </Text>
                            <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(7), lineHeight: normalize(7),padding:10, color:"black" }}>Explanation: {currentQuestion['Explanation']}</Text>
                            <TouchableHighlight style={{ height: "20%", width: "20%", borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <TouchableOpacity onPress={NextQuestion} style={{ backgroundColor: 'green', borderRadius: 5, padding: 10 }}>
                                        <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(6), lineHeight: normalize(8), margin: '1%', color: 'white' }}>N E X T</Text>
                                    </TouchableOpacity>

                                </View>

                            </TouchableHighlight>
                        </View>
                        :
                        <>
                            {timestate === "END" ?
                                <View style={{ height: "70%", width: "98%", margin: "1%", borderRadius: 10, backgroundColor: "black", justifyContent: 'center', alignItems: 'center' }} >
                                    <Image source={require('../../../../media/UI/play_trans.gif')} style={{height:"20%", aspectRatio:1}} />
                                    <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(7), lineHeight: normalize(7), color:"white", padding:10 }}>You ran out of time.</Text>
                                    <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(7), lineHeight: normalize(7), color:"white", padding:"5%"}}>                                                </Text>

                                    {/* <Button  title="Next" onPress={()=> NextQuestion()}/> */}
                                    <TouchableHighlight style={{ height: "20%", width: "20%", borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <View>
                                            <TouchableOpacity onPress={NextQuestion} style={{ backgroundColor: '#9F1313', borderRadius: 5, padding: 10 }}>
                                                <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(6), lineHeight: normalize(6), margin: '1%', color: 'white' }}>N E X T</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </TouchableHighlight>
                                </View>
                                :
                                <>
                                    {/* Incorrect Answer:  */}
                                    <View style={{ height: "70%", width: "98%", margin: "1%", borderRadius: 10, backgroundColor: "black", justifyContent: 'center', alignItems: 'center' }} >
                                        <Image source={require('../../../../media/UI/play_trans.gif')} style={{height:"20%", aspectRatio:1}} />
                                        <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(7), lineHeight: normalize(7), color:"white" }}>Incorrect Answer...</Text>
                                        <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(7), lineHeight: normalize(7), color:"white", padding:"5%"}}>Answer: {currentQuestion['Explanation']}</Text>

                                        {/* <Button  title="Next" onPress={()=> NextQuestion()}/> */}
                                        <TouchableHighlight style={{ height: "20%", width: "20%", borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                            <View>
                                                <TouchableOpacity onPress={NextQuestion} style={{ backgroundColor: '#9F1313', borderRadius: 5, padding: 10 }}>
                                                    <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize: normalize(6), lineHeight: normalize(6), margin: '1%', color: 'white' }}>N E X T</Text>
                                                </TouchableOpacity>

                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </>
                            }
                        </>
                    }
                </>
            }
        </View>
    );
};

export default Question;
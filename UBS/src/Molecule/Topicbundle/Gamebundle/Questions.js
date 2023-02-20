import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, TouchableHighlight, Button} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

// Redux
import {setSelectedTimeState} from "../../../Redux/questionSlice"
import { current } from '@reduxjs/toolkit';

// sfx
import press from '../../../../media/Soundtracks/main/press.wav';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

var song = new Sound(press, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // when loaded successfully
  console.log('duration in seconds: ' + song.getDuration() + 'number of channels: ' + song.getNumberOfChannels());
})

const Question = () => {
    const dispatch = useDispatch()
    // Change between different questions, by default we set the first question first
    
    // Questions to simulate the firebase
    const sample_questions = [ {
        "Answer": "A",
        "Explanation": 'Malware is short for "malicious software" and it refers to any intrusive software developed by criminals (who are often refered to as "hackers") to steal data and damage or destroy computers and computer systems!',
        "S/N": 21,
        "optionA" : "A malicious software developed by cybercriminals to steal data or destroy computers and computer systems",
        "optionB" : "A malicious software designed to block access to a computer system until a sum of money is paid",
        "optionC" : "A failure of a machine's hardware",
        "optionD" : "A failure of a machine's software",
        "Question": "What is malware?"
    },  {
        "Answer": "B",
        "Explanation": 'Yuxiang is geyzser',
        "S/N": 22,
        "optionA" : "A malicious software developed by cybercriminals to steal data or destroy computers and computer systems",
        "optionB" : "A malicious software designed to block access to a computer system until a sum of money is paid",
        "optionC" : "A failure of a machine's hardware",
        "optionD" : "A failure of a machine's software",
        "Question": "Question 2?"
    }]
    // Use State for Changing between Prompts 
    const [showQuestion, setShowQuestion ] = useState(true)
    const [correct, setCorrect ] = useState(false)
    const [prompt, setPrompt ] = useState("")
    
    // Number for index of question
    const [questionIndex, setQuestionIndex] = useState(0)
    // Set current question
    const [currentQuestion, setQuestion] = useState(sample_questions[questionIndex])


    const userAnswer = (answer) => {
        // console.log(answer), Yes this is working. 
        if (answer == currentQuestion['Answer']) {
            
            // Step 1: Ensure that Timer is Paused 
            dispatch(setSelectedTimeState("PAUSE"))
            
            // Step 2: Hide The Questions
            setShowQuestion(false)

            //Step 3: Set it to Correct Answer 
            setCorrect(true)

            //Step 4: Set The Prompt (To be Changed to Fetching API)
            setPrompt(sample_questions[questionIndex]["Explanation"])

            // play sfx 
            song.setVolume(1);
            song.play();

        }
        else {
            // Step 1: Ensure that Timer is Paused 
            dispatch(setSelectedTimeState("PAUSE"))

            // Step 2: Hide The Questions
            setShowQuestion(false)

            //Step 3: Set it to Wrong Answer 
            setCorrect(false)

            //Step 4: Set The Prompt (To be Changed to Fetching API)
            setPrompt(sample_questions[questionIndex]["Explanation"])

            // play sfx
            song.setVolume(1);
            song.play();
        }
    }
    
    const NextQuestion = () => {
        // Step 1: Change the Question Index
        if (questionIndex + 1 ==sample_questions.length){
            console.log("You have reached the end of the questions")
        }
        else {
            setQuestionIndex(questionIndex + 1);
        }
        // Step 2: Set True to Show Question
        setShowQuestion(true)
        // Step 3: Restart the Timer
        dispatch(setSelectedTimeState("RESTART"))
        // Step 4: Set Prompt to Empty Again
        setPrompt("")
        

        // play sfx
        song.setVolume(1);
        song.play();
    }

    return (
        <>

            <View style={{height:"20%", width: "100%", backgroundColor: "white", borderRadius:20, display:"flex", justifyContent:'center', alignItems: 'center'}}>
                <Text>{currentQuestion["Question"]}</Text>
            </View>

            {showQuestion ?
                <>
                    {/* This is for Option A and B */}
                    <View style={{width:"100%",height:"35%",marginTop:10, flexDirection:"row"}}> 
                        <TouchableHighlight style={{height:"100%", width:"49%", backgroundColor:"white", borderRadius:10, justifyContent:'center', alignItems: 'center'}} onPress={()=> userAnswer("A")}>
                            <View>
                                <Text style={{margin:5}}>{currentQuestion['optionA']}</Text>
                            </View>
                        </TouchableHighlight>


                        <View style={{height:"100%",width:"2%"}}></View>
                        
                        <TouchableHighlight style={{height:"100%", width:"49%", backgroundColor:"white", borderRadius:10, justifyContent:'center', alignItems: 'center'}} onPress={()=> userAnswer("B")}>
                            <View>
                                <Text style={{margin:5}}>{currentQuestion['optionB']}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    {/* THIS IS FOR OPTION C AND D  */}
                    <View style={{width:"100%",height:"35%",marginTop:10, flexDirection:"row"}}> 
                        <TouchableHighlight style={{height:"100%", width:"49%", backgroundColor:"white", borderRadius:10, justifyContent:'center', alignItems: 'center'}} onPress={()=> userAnswer("C")}>
                            <View>
                                <Text style={{margin:5}}>{currentQuestion['optionC']}</Text>
                            </View>
                        </TouchableHighlight>


                        <View style={{height:"100%",width:"2%"}}></View>
                        
                        <TouchableHighlight style={{height:"100%", width:"49%", backgroundColor:"white", borderRadius:10, justifyContent:'center', alignItems: 'center'}} onPress={()=> userAnswer("D")}>
                            <View>
                                <Text style={{margin:5}}>{currentQuestion['optionD']}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </>
                :
                <> 
                    {/* This Part will show if the  */}
                    {correct ?
                        <View style={{height:"70%", width:"100%",marginTop:10, borderRadius:10,backgroundColor:"lightgreen",justifyContent:'center', alignItems: 'center'}} >
                            <Text style={{margin:10}}>You are correct! {currentQuestion['Explanation']}</Text>
                            <Button title="Next" onPress={()=> NextQuestion()}/>
                        </View>
                    :
                        <View style={{height:"70%", width:"100%",marginTop:10, borderRadius:10,backgroundColor:"red",justifyContent:'center', alignItems: 'center'}} >
                            <Text style={{margin:10}}>You are wrong. {currentQuestion['Explanation']}</Text>
                            <Button title="Next" onPress={()=> NextQuestion()}/>
                        </View>
                    }
                </>
            }
        </>
    );
};

export default Question
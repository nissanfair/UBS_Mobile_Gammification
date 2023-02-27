import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, TouchableHighlight, Button} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Redux
import {setSelectedTimeState, setShowSummary , setTotal_Questions, set_answered_correctly, set_answered_wrongly, set_game_status} from "../../../Redux/questionSlice"
import { current } from '@reduxjs/toolkit';
import { useDispatch, useSelector,useStore } from 'react-redux'

const Question = ({gameStatus}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    // Change between different questions, by default we set the first question first
    
    // Questions to simulate the firebase
    const actual_questions = useSelector((state) => state.question.topicQuestionObject)
    // const actual_questions = [ {
    //     "Answer": "A",
    //     "Explanation": 'Malware is short for "malicious software" and it refers to any intrusive software developed by criminals (who are often refered to as "hackers") to steal data and damage or destroy computers and computer systems!',
    //     "S/N": 21,
    //     "optionA" : "A malicious software developed by cybercriminals to steal data or destroy computers and computer systems",
    //     "optionB" : "A malicious software designed to block access to a computer system until a sum of money is paid",
    //     "optionC" : "A failure of a machine's hardware",
    //     "optionD" : "A failure of a machine's software",
    //     "Question": "Question 1?"
    // },  {
    //     "Answer": "B",
    //     "Explanation": 'Yuxiang is geyzser',
    //     "S/N": 22,
    //     "optionA" : "A",
    //     "optionB" : "B",
    //     "optionC" : "C",
    //     "optionD" : "D",
    //     "Question": "Question 2?"
    // }]

    // Use State for Changing between Prompts 
    const [showQuestion, setShowQuestion ] = useState(true)
    const [correct, setCorrect ] = useState(false)
    const [prompt, setPrompt ] = useState("")
    
    // UseSelector
    const timestate = useSelector((state) => state.question.timestate);
    
    // Number for index of question
    const [questionIndex, setQuestionIndex] = useState(0)
    // Set current question
    const [currentQuestion, setQuestion] = useState(actual_questions[questionIndex])
    

    // Not sure whether this is need , yuxiang this is your code
    useEffect(() => {
        dispatch(setTotal_Questions(actual_questions.length))
    },[])
    // This useEffect is to track if the Timer has ended.
    useEffect(()=> {
        if (timestate === "END") {
            // Ran out of Time 
            setShowQuestion(false);

            setCorrect(false)

            setPrompt(actual_questions[questionIndex]["Explanation"])
        }
        // This is to ensure that each time i change the question index, i set the current question
        setQuestion(actual_questions[questionIndex])
    },[timestate,questionIndex])

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
            setPrompt(actual_questions[questionIndex]["Explanation"])

            // Step 5: Change the Answered Correctly +1 
            dispatch(set_answered_correctly(1))


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
            dispatch(set_answered_wrongly(1))
        }
    }
    
    const NextQuestion = () => {
        // Step 1: Change the Question Index
        console.log("help me ?")
        console.log(actual_questions.length)
        console.log(questionIndex)
        console.log(currentQuestion)
        if (questionIndex + 1 == actual_questions.length){
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
        }
        // Step 2: Set True to Show Question
        setShowQuestion(true)
        // Step 3: Restart the Timer
        dispatch(setSelectedTimeState("RESTART"))
        // Step 4: Set Prompt to Empty Again
        setPrompt("")
        
    }

    // UseEffect to track props gameStatus
    // useEffect(()=> {

    //     if (gameStatus == "RESET") {
    //         setQuestionIndex(0)
    //         setQuestion(actual_questions[questionIndex])
    //         dispatch(setTotal_Questions(0))
    //         dispatch(set_answered_correctly( - useSelector((state) => state.question.answered_correctly)))
    //         dispatch(set_answered_wrongly( - useSelector((state) => state.question.answered_wrongly)))


    //         // Reset number of questions correct and incorrect and total number of questions

    //     } 
    //     // if (timestate === "END") {
    //     //     // Ran out of Time 
    //     //     setShowQuestion(false);

    //     //     setCorrect(false)

    //     //     setPrompt(actual_questions[questionIndex]["Explanation"])
    //     // }
    //     // // This is to ensure that each time i change the question index, i set the current question
    //     // setQuestion(actual_questions[questionIndex])
    // },[gameStatus])

    return (
        <>

            <View style={{height:"20%", width: "100%", backgroundColor: "white", borderRadius:20, display:"flex", justifyContent:'center', alignItems: 'center'}}>
                <Text>{currentQuestion["Question"]}{timestate}</Text>
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
                        <>
                        { timestate === "END" ?
                            <View style={{height:"70%", width:"100%",marginTop:10, borderRadius:10,backgroundColor:"red",justifyContent:'center', alignItems: 'center'}} >
                                <Text style={{margin:10}}>You ran out of time.</Text>
                                <Button title="Next" onPress={()=> NextQuestion()}/>
                            </View>
                            :
                            <>
                            <View style={{height:"70%", width:"100%",marginTop:10, borderRadius:10,backgroundColor:"red",justifyContent:'center', alignItems: 'center'}} >
                                <Text style={{margin:10}}>You are wrong. {currentQuestion['Explanation']}</Text>
                                <Button title="Next" onPress={()=> NextQuestion()}/>
                            </View>
                            </>
                        }
                        </>
                    }
                </>
            }
        </>
    );
};

export default Question
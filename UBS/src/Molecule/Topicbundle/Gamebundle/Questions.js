import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableHighlight, Button} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Dimensions, Platform, PixelRatio} from 'react-native';

// Redux
import {setSelectedTimeState, setShowSummary , setTotal_Questions, set_answered_correctly, set_answered_wrongly, set_game_status} from "../../../Redux/questionSlice"
import { current } from '@reduxjs/toolkit';
import { useDispatch, useSelector,useStore } from 'react-redux'


// Front-Related Implementation
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

const Question = ({gameStatus}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    // Change between different questions, by default we set the first question first
    
    // Questions to simulate the firebase
    const actual_questions = useSelector((state) => state.question.topicQuestionObject)

    // Use State for Changing between Prompts 
    const [showQuestion, setShowQuestion ] = useState(true)
    const [correct, setCorrect ] = useState(false)
    const [prompt, setPrompt ] = useState("")

    const [displayText, setDisplayText] = useState('');
    const [isQuestionRendered, setIsQuestionRendered] = useState(false);

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

    useEffect(() => {
        typeWriter(currentQuestion["Question"], 0);
        setIsQuestionRendered(true);

      }, [currentQuestion]);


    return (
        <View style={{height:"100%",width:"100%",backgroundColor:'#072205'}}>
            <View style={{ width: "98%", backgroundColor: "#4FB45C", display:"flex", margin:"1%"}}>
                <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(6),margin:"1%",width:"100%"}} >Q U E S T I O N </Text>
            </View>

            <View style={{margin:"1%", marginTop:"1%"}}>
                <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize:normalize(7), color:"#4FB45C"}}>{displayText} </Text>
            </View>

            {showQuestion && isQuestionRendered ?
                <>
                    {/* This is for Option A and B */}
                    <View style={{width:"98%",height:"30%", flexDirection:"row",margin:"1%"}}> 
                        <TouchableHighlight style={{height:"100%", width:"49%", backgroundColor:"#4FB45C", borderRadius:10, justifyContent:'center', alignItems: 'center'}} onPress={()=> userAnswer("A")}>
                            <View>
                                <Text style={{ fontFamily: 'PressStart2P-Regular', fontSize:normalize(6),lineHeight:normalize(10), margin:5, color:"black"}}>{currentQuestion['optionA']}</Text>
                            </View>
                        </TouchableHighlight>


                        <View style={{height:"100%",width:"2%"}}></View>
                        
                        <TouchableHighlight style={{height:"100%", width:"49%", backgroundColor:"#4FB45C", borderRadius:10, justifyContent:'center', alignItems: 'center'}} onPress={()=> userAnswer("B")}>
                            <View>
                                <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(6),lineHeight:normalize(10),margin:5}}>{currentQuestion['optionB']}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    {/* THIS IS FOR OPTION C AND D  */}
                    <View style={{width:"98%",height:"30%", flexDirection:"row",margin:"1%"}}> 
                        <TouchableHighlight style={{height:"100%", width:"49%", backgroundColor:"#4FB45C", borderRadius:10, justifyContent:'center', alignItems: 'center'}} onPress={()=> userAnswer("C")}>
                            <View>
                                <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(6),lineHeight:normalize(10),margin:5}}>{currentQuestion['optionC']}</Text>
                            </View>
                        </TouchableHighlight>


                        <View style={{height:"100%",width:"2%"}}></View>
                        
                        <TouchableHighlight style={{height:"100%", width:"49%", backgroundColor:"#4FB45C", borderRadius:10, justifyContent:'center', alignItems: 'center'}} onPress={()=> userAnswer("D")}>
                            <View>
                                <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(6),lineHeight:normalize(10),margin:5}}>{currentQuestion['optionD']}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </>
                :
                <> 
                    {/* This Part will show if the  */}
                    {correct ?
                        <View style={{height:"70%", width:"98%",margin:"1%", borderRadius:10,backgroundColor:"#4FB45C",justifyContent:'center', alignItems: 'center'}} >
                            <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(7),lineHeight:normalize(7)}}>You are correct! </Text>
                            <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(7),lineHeight:normalize(7)}}>{currentQuestion['Explanation']}</Text>

                            <TouchableHighlight style={{height:"20%", width:"20%", borderRadius:10, justifyContent:'center', alignItems: 'center'}} onPress={()=> userAnswer("D")}>
                                    <View>
                                        <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(6),lineHeight:normalize(6),margin:"1%", textDecorationLine:"underline"}} onPress={()=> NextQuestion()}>N E X T</Text>
                                    </View>
                                </TouchableHighlight>
                        </View>
                    :
                        <>
                        { timestate === "END" ?
                            <View style={{height:"70%", width:"98%",margin:"1%", borderRadius:10,backgroundColor:"#CF3B2E",justifyContent:'center', alignItems: 'center'}} >
                                <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(7),lineHeight:normalize(7),margin:10}}>You ran out of time.</Text>
                                <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(7),lineHeight:normalize(7),margin:10}}>                                                    </Text>

                                <TouchableHighlight style={{height:"20%", width:"20%", borderRadius:10, justifyContent:'center', alignItems: 'center'}} >
                                    <View>
                                        <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(6),lineHeight:normalize(6),margin:"1%", textDecorationLine:"underline"}} onPress={()=> NextQuestion()}>N E X T</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            :
                            <>
                            <View style={{height:"70%", width:"98%",margin:"1%", borderRadius:10,backgroundColor:"#CF3B2E",justifyContent:'center', alignItems: 'center'}} >
                                <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(7),lineHeight:normalize(7)}}>You are wrong.</Text>
                                <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(7),lineHeight:normalize(7)}}>{currentQuestion['Explanation']}</Text>

                                {/* <Button  title="Next" onPress={()=> NextQuestion()}/> */}
                                <TouchableHighlight style={{height:"20%", width:"20%", borderRadius:10, justifyContent:'center', alignItems: 'center'}}>
                                    <View>
                                        <Text style={{fontFamily: 'PressStart2P-Regular', fontSize:normalize(6),lineHeight:normalize(6),margin:"1%", textDecorationLine:"underline"}} onPress={()=> NextQuestion()}>N E X T</Text>
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

export default Question
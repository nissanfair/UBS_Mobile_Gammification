import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, TouchableHighlight} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Question = () => {
    const sample_question = {
        "Answer": "A",
        "Explanation": 'Malware is short for "malicious software" and it refers to any intrusive software developed by criminals (who are often refered to as "hackers") to steal data and damage or destroy computers and computer systems!',
        "S/N": 21,
        "optionA" : "A malicious software developed by cybercriminals to steal data or destroy computers and computer systems",
        "optionB" : "A malicious software designed to block access to a computer system until a sum of money is paid",
        "optionC" : "A failure of a machine's hardware",
        "optionD" : "A failure of a machine's software",
        "Question": "What is malware?"
    }



    const userAnswer = (answer) => {
        // console.log(answer), Yes this is working. 
        if (answer == sample_question['Answer']) {
            // This must Trigger the Answer Box to be appear. 
            setShowQuestion(false)
            setCorrect(true)
        }
        else {
            // This must Trigger the Wrong to appear. 
            setShowQuestion(false)
            setCorrect(false)
        }
    }

    // Use State for Changing between Prompts 
    const [showQuestion, setShowQuestion ] = useState(true)
    const [correct, setCorrect ] = useState(false)
    const [prompt, setPrompt ] = useState("")


    return (
        <>

            <View style={{height:"20%", width: "100%", backgroundColor: "white", borderRadius:20, display:"flex", justifyContent:'center', alignItems: 'center'}}>
                <Text>{sample_question["Question"]}</Text>
            </View>

            {showQuestion ?
                <>
                    {/* This is for Option A and B */}
                    <View style={{width:"100%",height:"35%",marginTop:10, flexDirection:"row"}}> 
                        <TouchableHighlight style={{height:"100%", width:"49%", backgroundColor:"white", borderRadius:10, justifyContent:'center', alignItems: 'center'}} onPress={()=> userAnswer("A")}>
                            <View>
                                <Text style={{margin:5}}>{sample_question['optionA']}</Text>
                            </View>
                        </TouchableHighlight>


                        <View style={{height:"100%",width:"2%"}}></View>
                        
                        <TouchableHighlight style={{height:"100%", width:"49%", backgroundColor:"white", borderRadius:10, justifyContent:'center', alignItems: 'center'}} onPress={()=> userAnswer("B")}>
                            <View>
                                <Text style={{margin:5}}>{sample_question['optionB']}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    {/* THIS IS FOR OPTION C AND D  */}
                    <View style={{width:"100%",height:"35%",marginTop:10, flexDirection:"row"}}> 
                        <TouchableHighlight style={{height:"100%", width:"49%", backgroundColor:"white", borderRadius:10, justifyContent:'center', alignItems: 'center'}} onPress={()=> userAnswer("C")}>
                            <View>
                                <Text style={{margin:5}}>{sample_question['optionC']}</Text>
                            </View>
                        </TouchableHighlight>


                        <View style={{height:"100%",width:"2%"}}></View>
                        
                        <TouchableHighlight style={{height:"100%", width:"49%", backgroundColor:"white", borderRadius:10, justifyContent:'center', alignItems: 'center'}} onPress={()=> userAnswer("D")}>
                            <View>
                                <Text style={{margin:5}}>{sample_question['optionD']}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </>
                :
                <> 
                    {correct ?
                        <View style={{height:"70%", width:"100%",marginTop:10, borderRadius:10,backgroundColor:"lightgreen",justifyContent:'center', alignItems: 'center'}} >
                            <Text style={{margin:10}}>You are correct! {sample_question['Explanation']}</Text>
                        </View>
                    :
                        <View style={{height:"70%", width:"100%",marginTop:10, borderRadius:10,backgroundColor:"red",justifyContent:'center', alignItems: 'center'}} >
                            <Text style={{margin:10}}>You are wrong. {sample_question['Explanation']}</Text>
                        </View>
                    }
                </>
            }
        </>
    );
};

export default Question
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState} from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch, useSelector,useStore } from 'react-redux';
import {setSelectedTimeState, setShowSummary , setTotal_Questions, set_answered_correctly, set_answered_wrongly, set_game_status} from "../../../Redux/questionSlice"
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import Question from './Questions';
import Timer from './Timeline';
import HealthBar from './Health';

const Stack = createStackNavigator();
const styles = StyleSheet.create({
    background : {
        width: "100%",
        height: "100%"
    }
})
const Game = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    // const navigation = useNavigation();
    // Get relevant information from the store
    const styles = StyleSheet.create({
        background : {
            width: "100%",
            height: "100%"
        }
    })
    
    // Health variables
    const [health,modifyHealth] = useState(3)


    // Health decreases due to wrong question
    const wronglyAnsweredQuestion = useSelector((state) => state.question.answered_wrongly);
    // Health decrease due to lack of time
    const noTimeLeft = useSelector((state) => state.question.timestate)
    // Accounting for gamestatus 
    const gamestatus = useSelector((state) => state.question.gamestatus)

    const showSummary = useSelector((state) => state.question.showSummary);

    useEffect(() => {
        if (gamestatus == "RESET") {
            navigation.navigate("Summary") 
        }
    },[gamestatus])

    return (
        <View style={{flexDirection: "column", flex: 1,}} >
            <View style={{flex:10}}>
            <ImageBackground source={require("../../../../media/Environment/craftpix-897715-free-pixel-art-fantasy-2d-battlegrounds/PNG/Battleground3/Bright/Battleground3.png")} style={styles.background}>
                <View style={{width:"100%", height:"100%"}}>
                    <View style={{alignContent:"center",alignItems:"center", marginTop:15}}>
                        <Timer/>
                    </View>
                    {/* Character Side */}
                    <View style={{marginTop:25, height:"70%", flexDirection:"row"}}>
                        
                        {/* Character 1  */}
                        <View style={{flex:1, height:"100%", width:'100%'}}>
                            <View style={{flexDirection:"column", height:"100%", width:'100%'}}>
                                <View style={{flex:3}}></View>
                                <View style={{flex:6}}>
                                    <Image style={{height:"100%", width:"100%",alignSelf:'center'}}  source={require("../../../adventure.gif")} />                                    
                                </View>
                                <View style={{flex:1}}></View>


                            </View>
                        </View>
                        {/* Questions */}

                        <View style={{height:"100%", width:'100%',flex:3, alignContent:'center', alignItems:'center'}}>
                            <Question gameStatus={gamestatus}/>
                        </View>
                        


                        {/* Character 2 */}
                        <View style={{flex:1}}>
                            <View style={{flexDirection:"column", height:"100%", width:'100%'}}>
                                    <View style={{flex:3}}></View>
                                    <View style={{flex:7}}>
                                        <Image style={{height:"100%", width:"100%",alignSelf:'center'}}  source={require("../../../sorcereridle.gif")} />                                    
                                    </View>
                                    <View style={{flex:1}}></View>

                            </View>
                        </View>
                    </View>

                </View>
            </ImageBackground>

            </View>


            <View style={{flex:1}}>
                <View style={{flex: 1, backgroundColor: 'lightgray', flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
                        {/* Passing down from global state to props */}
                        <HealthBar numWrongAnswers={wronglyAnsweredQuestion} timeState={noTimeLeft} gameStatus = {gamestatus}/>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default Game 
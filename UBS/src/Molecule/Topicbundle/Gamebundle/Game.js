import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState} from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch, useSelector,useStore } from 'react-redux';

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
    // Track this 

    // Health decrease due to wrong time

    const showSummary = useSelector((state) => state.question.showSummary);


    // Calling of the question should be here 
    return (
        <View style={{flexDirection: "column", flex: 1,
    }} >
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
                            <Question/>
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
                        <HealthBar numWrongAnswers={wronglyAnsweredQuestion}/>
                    </View>

                    <View>
                        <Text>adasdas</Text>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default Game 
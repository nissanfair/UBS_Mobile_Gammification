import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, TouchableHighlight, ImageBackground} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Question from './Questions';
import Health from './Health'
import Timeline from './Timeline'
import Background from '../../../../media/Environment/craftpix-897715-free-pixel-art-fantasy-2d-battlegrounds/PNG/Battleground3/Bright/Battleground3.png'

const Stack = createStackNavigator();
const styles = StyleSheet.create({
    background : {
        width: "100%",
        height: "100%"
    }
})
const Game = () => {
    const navigation = useNavigation();
    // Get relevant information from the store
    const styles = StyleSheet.create({
        background : {
            width: "100%",
            height: "100%"
        }
    })
    

    // Calling of the question should be here 
    

    return (
        <View>
            <ImageBackground source={require("../../../../media/Environment/craftpix-897715-free-pixel-art-fantasy-2d-battlegrounds/PNG/Battleground3/Bright/Battleground3.png")} style={styles.background}>
                <View style={{width:"100%", height:"100%"}}>
                    <View style={{alignContent:"center",alignItems:"center", marginTop:15}}>
                        <Timeline/>
                    </View>
                    {/* Character Side */}
                    <View style={{marginTop:25, borderColor:"#FF3D00", borderWidth:5, height:"70%", flexDirection:"row"}}>
                        
                        {/* Character 1  */}
                        <View style={{borderColor:"#FF3D00", borderWidth:5,flex:1, height:"100%", width:'100%'}}>
                            <View style={{flexDirection:"column", height:"100%", width:'100%'}}>
                                <View style={{flex:6}}></View>
                                <View style={{flex:3}}>
                                    <Image source={require("../../../../media/Characters/Adventurer/characteridle.gif")} />

                                    
                                </View>
                                <View style={{flex:1}}></View>

                            </View>
                        </View>
                        {/* Questions */}
                        <View style={{height:"100%", width:'100%',borderColor:"#FF3D00", borderWidth:5,flex:3, alignContent:'center', alignItems:'center'}}>
                            <Question/>
                        </View>

                        {/* Character 2 */}
                        <View style={{borderColor:"#FF3D00", borderWidth:5,flex:1}}>

                        </View>
                    </View>

                </View>
            </ImageBackground>
        </View>
    );
};

export default Game
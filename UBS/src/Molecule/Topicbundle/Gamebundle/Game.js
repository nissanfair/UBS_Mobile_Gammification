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
                    <View style={{marginTop:25, borderColor:"#FF3D00", borderWidth:5, height:"70%"}}>
                        
                    </View>

                </View>
            </ImageBackground>
        </View>
    );
};

export default Game
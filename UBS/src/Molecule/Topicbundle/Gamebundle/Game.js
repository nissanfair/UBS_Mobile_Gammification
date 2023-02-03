import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, TouchableHighlight} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Game = () => {
    const navigation = useNavigation();
    // Get relevant information from the store
    

    const styles = StyleSheet.create({
        background : {
            width: "100%",
            height: "100%"
        }
    })

    return (
        <View>
            <TouchableHighlight >
                <Image source={require("../../../../media/Environment/craftpix-897715-free-pixel-art-fantasy-2d-battlegrounds/PNG/Battleground1/Pale/Battleground1.png")} style={styles.background} />
                {/* Enter your components here */}
                
                {/* End of Components here */}
            </TouchableHighlight>
        </View>
    );
};

export default Game
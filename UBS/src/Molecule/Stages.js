import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const { width,height } = Dimensions.get('window');

// Tasks
// Set up barebones template
// Establsih connection to database
// Setup relevant links to the different topics and education aspects

const Stages = () => {
    const navigation = useNavigation();
    // Hardcoded will 
    const levels = [{topic: 'Topic1', display: "Topic 1"}];

    return (
        <ScrollView>
        <View style={styles.levelContainer}>
            {levels.map((level, index) => (
                <View style={styles.levelButton}>
                <Text
                    key={index}
                    style={styles.levelText}
                    onPress={() => navigation.navigate(level.topic)}>
                    {level.display}
                </Text>
                <Image source={require("../../media/Environment/mortarboard.png")} style={styles.levelIcon} />

                </View>
                
            ))}
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    levelText: {
        fontSize: 30,
        textAlign: 'center',
        width: width / 2,
        borderWidth: 2,
        borderColor: '#F00',
        borderRadius: 10,
        padding: 10,
        marginVertical: height * 0.05,
        
    },
    levelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 1,
        flexWrap: 'wrap',
    },
    levelButton: {
        alignItems: 'center',
        flexDirection: 'row'
      },

    levelIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
});

export default Stages;

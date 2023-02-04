import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button, Title, Alert, Modal } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons'
import { current } from '@reduxjs/toolkit';

const Health = () => {
    // const navigation = useNavigation();
    // Base health would be 3 in this case
    const [playerhealth, decrementHealth] = useState(3);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
    const [questionSets, setQuestionSets] = useState([
        {
            questions: [
                'Question1',
                'What is your name?',
                'What is your favorite color?'
            ]
        },
        {
            questions: [
                'Question2',
                'What is your favorite food?',
                'What is your favorite hobby?'
            ]
        },
        // add more question sets here
    ]);

    const simulateDamage = () => {

        if (playerhealth != 0) {
            decrementHealth(playerhealth - 1)
            setModalVisible(true)
        }
    }
// Flow.
/* 
1. When the player is damaged, popup would appear and show which statement is correct etc. In this case we use a modal
2. Upon pressing the button,set the currentquestion to the next one. 

- In the actual scenario, we would populate all the questions and answers in the Game.js page instead of hardcoding



*/


    return (
        <View style={styles.container}>
            <View>
                <Image source={require('./heart.png')} style={{ height: 30, width: 30 }} />
                <Text style={styles.text}>{playerhealth}</Text>
                <Button onPress={simulateDamage} title="Press Me To Simulate Damage decrease" />
                <Button onPress={restoreHealth} title="Press Me To Simulate Damage decrease" />

            </View>

            <View style={{ padding: 20 }}>
                <Text>{questionSets[currentQuestionSet].questions}</Text>
            </View>

            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>You took damage!</Text>
                    <Button
                        title="Close"
                        onPress={() => {
                            setModalVisible(false);
                            setCurrentQuestionSet((currentQuestionSet + 1) % questionSets.length);
                        }}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "white"
    },
    label: {
        fontWeight: 'bold',
        marginRight: 8,
    },
    text: {
        fontSize: 20,
        marginHorizontal: 8
    }
});
export default Health
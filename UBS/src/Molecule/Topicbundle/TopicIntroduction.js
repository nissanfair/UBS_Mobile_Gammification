/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, ImageBackground } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { styles } from "./TopicIntroStyle";

const Stack = createStackNavigator();

const TopicIntroduction = () => {
    const navigation = useNavigation();
    // Get relevant information from the store

    // Get what topic to be displayed here
    // Redux
    // useSelector()
    // dispatch()
    const topic = useSelector(state => state.topic.topic);

    const [topicChosen, setTopic] = useState(topic);
    const [introSelectedTopic, pushIntro] = useState("");



    useEffect(() => {
        // Idea
        var fetchSelectedTopic = `http://10.0.2.2:3000/6bit/topics/${topic}`;

        fetch(fetchSelectedTopic)
            .then(response => response.json())
            .then(data => {
                // pushing the intro here. We can add more stuff here then use redux accordingly 
                pushIntro(data.data[`${topic}_Introduction`])

            })
            .catch(error => {
                console.log(error)
            })






    }, [])







    return (
        <View style={styles.main}>

            <View style={styles.backgroundContainer}>
                <Image source={require("../../../media/Environment/s4m_ur4i-bg_clouds.png")} resizeImage='stretch' style={styles.backdrop} />

                
            </View>


            <View style={styles.leftbox}>
                <ImageBackground source={require("../../../media/Environment/panel_Example2.png")} resizeMode='stretch' style={styles.leftbackdrop} />

                <View style={styles.desc}>
                    <Text>
                        {introSelectedTopic}
                    </Text>
                </View>


            </View>

            <View style={styles.rightbox}>
                
                <View style={styles.monsterbox}>
                <ImageBackground source={require("../../../media/Characters/EVil Wizard 2/Sprites/Idle.png")} resizeMode='stretch' style={styles.leftbackdrop} />

                </View>

                <View>
                    <Text>Buttons to be placed here</Text>
                </View>

            </View>


        </View>
    );
};

export default TopicIntroduction
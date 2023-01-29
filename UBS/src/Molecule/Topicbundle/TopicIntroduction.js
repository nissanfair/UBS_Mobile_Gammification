import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

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
        var fetchSelectedTopic =   `http://10.0.2.2:3000/6bit/topics/${topic}`;

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
        <Text>
            {introSelectedTopic}
            This is the topic introduction page; 
        </Text>
    );
};

export default TopicIntroduction
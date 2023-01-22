import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const TopicIntroduction = () => {
    const navigation = useNavigation();
    // Get relevant information from the store

    const topic = useSelector(state => state.topic.topic);
    const [topicChosen, setTopic] = useState(topic);

    useEffect(() => {
        // Idea
        
    
    
    }, [])
    

    
    

    return (
        <Text>
            {topicChosen}
            This is the topic introduction page; 
        </Text>
    );
};

export default TopicIntroduction
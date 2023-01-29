import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const TopicLearning = () => {
    const navigation = useNavigation();

    return (
        <Text>
            Topic learning page
            Retrieve stuff from the store to make it dynamic - Not implement yet
        </Text>
       
    );
};

export default TopicLearning
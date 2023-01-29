import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Topic = () => {
    const navigation = useNavigation();
    // Get relevant information from the store
    



    return (
        <Text>
            Test only FOR TOPIC in general
        </Text>
    );
};

export default Topic
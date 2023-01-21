import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Topic1 = () => {
    const navigation = useNavigation();

    return (
        <Text>
            Test only FOR TOPIC 1
        </Text>
       
    );
};

export default Topic1
import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Topic1Learning = () => {
    const navigation = useNavigation();

    return (
        <Text>
            Topic 1 learning!
        </Text>
       
    );
};

export default Topic1Learning
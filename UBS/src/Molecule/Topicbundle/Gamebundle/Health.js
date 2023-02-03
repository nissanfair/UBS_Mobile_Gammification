import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button, Title, Alert} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons'

const Health = () => {
    // const navigation = useNavigation();
    // Base health would be 3 in this case
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [playerhealth, decrementHealth] = useState(3);

    const simulateDamage = () => {

    if (playerhealth != 0 ){
        decrementHealth(playerhealth-1)
    } 
    }



    return (
        <View style={styles.container}>
            <Image source={require('./heart.png')} style={{ height: 30, width: 30}}/>
            <Text style={styles.text}>{playerhealth}</Text>

            <View>
                <Button onPress={simulateDamage} title="Press Me To Simulate Damage decrease"/>
            </View>
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
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const { width,height } = Dimensions.get('window');

// Tasks
// Set up barebones template - Done
// Establsih connection to database
// Setup relevant links to the different topics and education aspects - Done, topics

const Stages = () => {
    const navigation = useNavigation();
    const [levels, addLevels] = useState([{}]);

    // levels = [{topic:  "Topic1", display:  "Topic 1", education:  "Topic1Learning"}]

    // Functions
    // Usage of redux store, dispatch 
    
    
    // Getting the firebase to display and generate the topics
    useEffect(() => {
        // Get all the relevant stages from the firebase from express

        // For some reason have to specify 10.0.2. This is because of the android emulator requiring different network config
        var fetchTopics = "http://10.0.2.2:3000/6bit/topics/totalquizzes"

        fetch(fetchTopics)
        .then(response => response.json())
        .then(data => {
            // Manipulating the data here 
            alert("i am triggered here")
            var topicDict = []
            for (let i=1; i< data.topics + 1; i++) {
                topicDict.push({topic:  `Topic${i}`, display:  `Topic ${i}`, education:  `Topic${i}Learning`})
            }
          // add the new data to the list of dictionaries
          addLevels(topicDict)

        })
        .catch(error => {
            console.log(error)
        })

        // 
     
    }, [])
    

   


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
                <TouchableOpacity onPress={() => navigation.navigate(level.education)}>
                    <Image source={require("../../media/Environment/mortarboard.png")} style={styles.levelIcon}/>
                </TouchableOpacity>

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

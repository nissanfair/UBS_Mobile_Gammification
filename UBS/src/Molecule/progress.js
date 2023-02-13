import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button, ImageBackground} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import TopicLearning from './Topicbundle/TopicLearning';
import TopicIntroduction from './Topicbundle/TopicIntroduction';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';


const Progress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [levels, addLevels] = useState([{}]);

  
  // Getting the firebase to display and generate the topics
  useEffect(() => {
      // Get all the relevant stages from the firebase from express

      // For some reason have to specify 10.0.2. This is because of the android emulator requiring different network config
      var fetchTopics = "http://10.0.2.2:3000/6bit/topics/topicStatus"

      // Dynamically get all the topics from firebase - On the firebase side i tweaked it in a way so i /3 lol
      fetch(fetchTopics)
      .then(response => response.json())
      .then(data => {
          // Manipulating the data here 
          var topicDict = []
          // console.log(data.totalnumber)
          for (let i=1; i < data.totalnumber + 1; i++) {

              topicDict.push({topic:  `Topic ${i}`, status: data.topic_status[`Topic${i}`]})
          }
        // add the new data to the list of dictionaries
        addLevels(topicDict)
        // console.log(topicDict)
        

      })
      .catch(error => {
          console.log(error)
      })
      // 
      
   
  }, [])

  function IsComplete(props) {
    return <View style={styles.complete}>
            <ImageBackground source={require("../../media/Environment/panel_Example2.png")}/>
            <Text style={styles.completeText}>  {props.topic}: Completed  </Text>
              <ProgressBar
                styleAttr="Horizontal"
                indeterminate={false}
                progress={1}
                color="green"
              />
            </View>
  }

  function IsNotComplete(props) {
    return <View style={styles.incomplete}>
    <Text style={styles.incompleteText}>{props.topic}: Not Completed</Text>
      <ProgressBar
        styleAttr="Horizontal"
        indeterminate={false}
        progress={0}
        color="red"
      />
    </View>
  }

  function trueOrFalse(obj) {
    if (obj["status"]) {
      return <IsComplete topic = {obj["topic"]}/>
    }
    else {
      return <IsNotComplete topic = {obj["topic"]}/>
    }
  }
 


  return (
      
      <ScrollView>
        
      <View style={styles.levelContainer}>
      <ImageBackground source={require("../../media/Environment/s4m_ur4i-bg_clouds.png")} resizeMode="cover" style={styles.backgroundContainer}/>

    
      <View style={styles.title}>
        <Text style={styles.titleText}>Topic Progress</Text>
      </View>

     {
       levels.map((level) => {
         return (
           trueOrFalse(level)
         )
       })
     }

      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  complete: {
      marginHorizontal: 5,
      marginVertical: 30,    
      flex: 2,
      backgroundColor: 'rgba(173, 255, 47, 1.0)',
      borderRadius: 20,
      borderWidth: 5,
      padding: 10,
  },
  incomplete: {
    marginHorizontal: 5,
    marginVertical: 30,    
    flex: 2,
    backgroundColor: 'rgba(128, 128, 128, 0.8)',
    borderRadius: 20,
    borderWidth: 5,
    padding: 10,
    color: 'white',
},
  levelContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      flexDirection: 'column',
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: 'white',
  },
  title: {
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    borderWidth: 5,
    backgroundColor: 'rgba(128,0,0, 0.8)',
    borderColor: 'burlywood',
    shadowColor: 'black',
    borderRadius: 10,
  },

  image: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  completeText: {
    fontFamily: 'monospace',
  },
  incompleteText: {
    fontFamily: 'monospace',
    color: 'white',
  }

});


export default Progress;
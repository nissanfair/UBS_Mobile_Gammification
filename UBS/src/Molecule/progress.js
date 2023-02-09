import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Button} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import TopicLearning from './Topicbundle/TopicLearning';
import TopicIntroduction from './Topicbundle/TopicIntroduction';
import {ProgressBar} from '@react-native-community/progress-bar-android';


const Progress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [levels, addLevels] = useState([{}]);

  // levels = [{topic:  "Topic1", display:  "Topic 1", education:  "Topic1Learning"}]

  // Functions
  // Usage of redux store, dispatch 

  // Handle the click when user clicks on a topic - Redirects them to the page 
  const handleClickInformation= (levelinformation) => {
      // Reset stores for introduction, questions, and education - Rationale is that the user might have clicked other topics before
      dispatch(selectedTopic(""))
      // dispatch level information
      dispatch(selectedTopic(levelinformation));
      // Once done, navigate to the topicsIntroduction page 
      navigation.navigate(TopicIntroduction);


  }
  
  // Handle the educational content
  const handleClickInformationEducation = (levelinformation) => {
      // Reset stores for introduction, questions, and education - Rationale is that the user might have clicked other topics before
      dispatch(selectedTopic(""))
      dispatch(selectedTopic(levelinformation));
      // Once done, navigate to the topicsLearning page 
      navigation.navigate(TopicLearning);
  }
  
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
          console.log(data.totalnumber)
          for (let i=1; i < data.totalnumber + 1; i++) {

              topicDict.push({topic:  `Topic ${i}`, status: data.topic_status[`Topic${i}`]})
          }
        // add the new data to the list of dictionaries
        addLevels(topicDict)
        console.log(topicDict)
        

      })
      .catch(error => {
          console.log(error)
      })
      // 
      
   
  }, [])
  


 


  return (
      
      <ScrollView>
      <View style={styles.levelContainer}>

      

      

      <View style={styles.example}>
        <Text style={styles.titleText}>Topic Progress</Text>
      </View>
        

      <View style={styles.example}>
                 <Text>Topic 1: Not Completed</Text>
                   <ProgressBar
                     styleAttr="Horizontal"
                     indeterminate={false}
                     progress={0}
                     color="red"
                   />
      </View>
                 
      <View style={styles.example}>
                 <Text>Topic 2: Not Completed</Text>
                   <ProgressBar
                     styleAttr="Horizontal"
                     indeterminate={false}
                     progress={0}
                     color="red"
                   />
                   
      </View>

      <View style={styles.example}>
                 <Text>Topic 3: Not Completed</Text>
                   <ProgressBar
                     styleAttr="Horizontal"
                     indeterminate={false}
                     progress={0}
                     color="red"
                   />
      </View>

      <View style={styles.example}>
                 <Text>Topic 4: Not Completed</Text>
                   <ProgressBar
                     styleAttr="Horizontal"
                     indeterminate={false}
                     progress={0}
                     color="red"
                   />
      </View>


      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  example: {
      marginHorizontal: 5,
      marginVertical: 24
  },
  levelContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

});


// const Progress = () => {
//   var fetchUserInfo = "http://10.0.2.2:3000/6bit/topics/topicStatus"
//   fetch(fetchUserInfo)
//   .then (response => response.json())
//   .then(data => {
//       var topicStatusDict = [];
//       for (let i=1; i < data.topic_status + 1; i++) {
//           topicStatusDict.push(data.topic_status[i]);
//       }

//   })
//   .catch(error => {
//       console.log(error)
//   })

//   for (let i=0; i < topicStatusDict.size(); i++) {
//     if (topicStatusDict[i] == true) {
//       return `<View style={styles.example}>
//                <Text>Topic {i+1}: Completed</Text>
//                <ProgressBar
//                  styleAttr="Horizontal"
//                  indeterminate={false}
//                  progress={1.0}
//                  color="green"
//                />
//              </View>`
//     }
//     else {
//       return `<View style={styles.example}>
//                 <Text>Topic {i+1}: Not Completed</Text>
//                   <ProgressBar
//                     styleAttr="Horizontal"
//                     indeterminate={false}
//                     progress={0}
//                     color="red"
//                   />
//                 </View>`

//     }
//   }


//   useEffect(() => {
//     // Get all the relevant stages from the firebase from express

//     // For some reason have to specify 10.0.2. This is because of the android emulator requiring different network config
//     var fetchTopics = "http://10.0.2.2:3000/6bit/topics/topicStatus"

//     // Dynamically get all the topics from firebase - On the firebase side i tweaked it in a way so i /3 lol
//     fetch(fetchTopics)
//     .then(response => response.json())
//     .then(data => {
//         // Manipulating the data here 
//         alert("i am triggered here")
//         var topicDict = []
//         for (let i=1; i< data.topics + 1; i++) {
//             topicDict.push({topic:  `Topic${i}`, display:  `Topic ${i}`, education:  `Topic${i}Learning`})
//         }
//       // add the new data to the list of dictionaries
//       addLevels(topicDict)

//     })
//     .catch(error => {
//         console.log(error)
//     })
//     // 
    
 
// }, [])

// }


export default Progress;
/* eslint-disable prettier/prettier */
// eslint-disable prettier/prettier
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, Image, ScrollView} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {styles} from './TopicIntroStyle';

const Stack = createStackNavigator();

const TopicLearning = () => {
  const navigation = useNavigation();

  const topic = useSelector(state => state.topic.topic);

  const [topicChosen, setTopic] = useState(topic);
  const [learningSelectedTopic, pushLearn] = useState('');

  useEffect(() => {
    var fetchSelectedTopic = `http://10.0.2.2:3000/6bit/topics/${topic}`;

    fetch(fetchSelectedTopic)
      .then(response => response.json())
      .then(data => {
        pushLearn(data.data['${topic}_Learning[0]']);
      })

      .catch(error => {
        console.log(error);
      });
  }, );

  return (
    <View style={styles.main}>

      <View style={styles.backgroundContainer}>
        <Image
          source={require('../../../media/Environment/learning_background.png')}
          resizeImage="stretch"
          style={styles.backdrop}/>
      </View>

      <Text>Welcome fighter! Here, you will learn more about this topic!</Text>

      <View style={styles.leftbox}>
        {/* <ImageBackground source={require("../../../media/Environment/textboxImage.png")} 
                resizeMode='stretch' 
                style={styles.leftbackdrop} /> */}
      </View>

        <View style={styles.desc}>
          <Text> {learningSelectedTopic} 
          Content goes here, issues with feching data after merge conflict (ded)
          </Text>
        </View>

          <Image
            source={require('../../../media/UI/skipButton.png')}
            resizeMode="contain"/>
        <Text> Skip All Learning</Text>

        <View style={styles.rightbox}>
            <View style={styles.innerrightbox}>
                <View style={styles.monsterbox}></View>
                    <View style={styles.buttonbox}>
                        <View style={styles.back}></View>
                            <View style={styles.start}>
                            <Image
                                source={require('../../../media/UI/nextButton.png')}
                                resizeMode="contain"/>
            </View>
          </View>
        </View>
      </View>

    </View>
  );
};

export default TopicLearning;

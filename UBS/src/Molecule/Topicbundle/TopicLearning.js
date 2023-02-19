/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {styles} from './TopicLearnStyle';

const Stack = createStackNavigator();

const TopicLearning = () => {
  const navigation = useNavigation();

  const Backbutton = () => {
   navigation.navigate("TopicLearning2")
  };

  const Forwardbutton = () => {
    navigation.navigate("TopicLearning2")
  };

  const Exitbutton = () => {
    navigation.navigate("Topic")
  };

  const topic = useSelector(state => state.topic.topic);

  const [topicChosen, setTopic] = useState(topic);
  const [learnSelectedTopic, pushLearn] = useState('');

  useEffect(() => {
    var fetchSelectedTopic = `http://10.0.2.2:3000/6bit/topics/${topic}`;
    console.log(topic);

    fetch(fetchSelectedTopic)
      .then(response => response.json())
      .then(data => {
        pushLearn(data.data[`${topic}_Learning`]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.main}>

      <View style={styles.backgroundContainer}>
        <Image
          source={require('../../../media/Environment/topicLearningBackground.png')}
          resizeImage="stretch"
          style={styles.backdrop}/>
      </View>

      <View style={styles.leftbox}>
        <TouchableOpacity style={styles.button} onPress={Backbutton}>
          <Image
            source={require('../../../media/UI/previous.png')}
            resizeMode="contain"/>
        </TouchableOpacity>
      </View>

      <View style={styles.middlebox}>
        <ImageBackground
          source={require('../../../media/UI/topicLearningScroll.png')}
          resizeMode="contain"
          style={styles.leftbackdrop}/>

        <View style={styles.desc}>
          <Text style={{color: "black"}}>{learnSelectedTopic[0]}
          </Text>

        </View>
      </View>

      <View style={styles.rightbox}>
        <View style>
          <TouchableOpacity onPress={Forwardbutton}>
            <Image
              source={require('../../../media/UI/forward.png')}
              resizeMode="contain"/>
          </TouchableOpacity>
        </View>

        <View style={styles.exitbutton}>
          <TouchableOpacity style={styles.exitbutton} onPress={Exitbutton}>
            <Image
              source={require('../../../media/UI/exit.png')}
              resizeMode="contain"/>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default TopicLearning;

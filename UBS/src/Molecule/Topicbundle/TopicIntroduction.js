/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { styles } from './TopicIntroStyle';

const Stack = createStackNavigator();


const TopicIntroduction = ({ navigation }) => {
  const Backbutton = () => {
    navigation.navigate("Topic")
  }
  const Startbutton = () => {
    navigation.navigate("Game")
  }
  // Get relevant information from the store

  // Get what topic to be displayed here
  // Redux
  // useSelector()
  // dispatch()
  const topic = useSelector(state => state.topic.topic);

  const [topicChosen, setTopic] = useState(topic);
  const [introSelectedTopic, pushIntro] = useState('');

  useEffect(() => {
    // Idea
    var fetchSelectedTopic = `http://10.0.2.2:3000/6bit/topics/${topic}`;
    console.log(topic)
    fetch(fetchSelectedTopic)
      .then(response => response.json())
      .then(data => {
        // pushing the intro here. We can add more stuff here then use redux accordingly
        pushIntro(data.data[`${topic}_Introduction`])
      })
      .catch(error => {
        console.log(error);
      });
  },);

  return (
    <View style={styles.main}>
      <View style={styles.backgroundContainer}>
        <Image
          source={require('../../../media/UI/matrix_bg.jpg')}
          resizeImage="stretch"
          style={styles.backdrop}
        />
      </View>

      <View style={styles.leftbox}>
        <View style={styles.back}>
          <TouchableOpacity style={styles.button} onPress={Backbutton}>
            <Image
              source={require('../../../media/UI/back_v2.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.desc}>
            <Text style={{ color: 'black', fontFamily: 'PressStart2P-Regular' }}>{introSelectedTopic}</Text>
          </View>
        </View>


      </View>

      <View style={styles.centerbox}>
      
        <ImageBackground
          source={require('../../../media/UI/computer_screen.png')}
          resizeImage="contain"
          style={styles.backdrop}
        />
       

      </View>

      <View style={styles.rightbox}>
        <View style={styles.innerrightbox}>
          <View style={styles.monsterbox}>
            <Image
              source={require('../../../media/sorcereridle.gif')}
              resizeMode="contain"
              styles={styles.wizard}
            />
            <Text style={{ color: 'white', fontFamily: 'PressStart2P-Regular' }}>Malware Wizard</Text>
          </View>

          <View style={styles.buttonbox}>

            <View style={styles.start}>

              <TouchableOpacity style={styles.button} onPress={Startbutton}>
                <Image
                  source={require('../../../media/UI/start_v2.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TopicIntroduction;

/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
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
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {styles} from './TopicIntroStyle';
import fighting from '../../../media/Soundtracks/main/fighting.wav'
import press from '../../../media/Soundtracks/main/press.wav';
import { adven } from '../homescreen';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

var song = new Sound(fighting, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // when loaded successfully
  console.log('duration in seconds: ' + song.getDuration() + 'number of channels: ' + song.getNumberOfChannels());
})


var userPress = new Sound(press, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // when loaded successfully
  console.log('duration in seconds: ' + song.getDuration() + 'number of channels: ' + song.getNumberOfChannels());
})

const Stack = createStackNavigator();


const TopicIntroduction = ({navigation}) => {
  const Backbutton = () => {
    navigation.navigate("Topic");
    userPress.setVolume(1);
    userPress.play();
  }
  const Startbutton = () => {
    navigation.navigate("Game")
    song.setVolume(0.5);
    song.play();
    song.setNumberOfLoops(-1);

    userPress.setVolume(1);
    userPress.play();

    adven.stop();
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

    fetch(fetchSelectedTopic)
      .then(response => response.json())
      .then(data => {
        // pushing the intro here. We can add more stuff here then use redux accordingly
        pushIntro(data.data[`${topic}_Introduction`])
      })
      .catch(error => {
        console.log(error);
      });
  }, );

  return (
    <View style={styles.main}>
      <View style={styles.backgroundContainer}>
        <Image
          source={require('../../../media/Environment/s4m_ur4i-bg_clouds.png')}
          resizeImage="stretch"
          style={styles.backdrop}
        />
      </View>

      <View style={styles.leftbox}>
        <ImageBackground
          source={require('../../../media/Environment/panel_Example2.png')}
          resizeMode="stretch"
          style={styles.leftbackdrop}
        />

        <View style={styles.desc}>
          <Text>{introSelectedTopic}</Text>
        </View>
      </View>

      <View style={styles.rightbox}>
        <View style={styles.innerrightbox}>
          <View style={styles.monsterbox}>
            <Image
              source={require('../../../media/sorcereridle.gif')}
              resizeMode="contain"
              styles={styles.wizard}
            />
            <Text>Malware Wizard</Text>
          </View>

          <View style={styles.buttonbox}>
            <View style={styles.back}>
              <TouchableOpacity style={styles.button} onPress={Backbutton}>
                <Image
                  source={require('../../../media/UI/back_v2.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
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

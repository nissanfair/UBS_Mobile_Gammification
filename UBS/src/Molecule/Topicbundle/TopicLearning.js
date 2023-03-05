/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity, TouchableHighlight} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {styles} from './TopicLearnStyle';
import press from '../../../media/Soundtracks/main/press.wav';
import { fight } from './TopicIntroduction';
import { adven } from '../homescreen'
import Sound from 'react-native-sound';

//sfx
Sound.setCategory('Playback');
export var userPress = new Sound(press, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
});


const Stack = createStackNavigator();

const TopicLearning = () => {
  const navigation = useNavigation();

// const TopicLearning = ({navigation}) => { //reference to homepage

const[Index, setIndex] = useState(0);

  const playSound = () => {
    userPress.setVolume(1.0);
    userPress.play();
  }

  const Backbutton = () => {
    setIndex(Index - 1);
    userPress.setVolume(1.0);
    userPress.play();
  };

  const Forwardbutton = () => {
    setIndex(Index + 1);
    userPress.setVolume(1.0);
    userPress.play();
  };

  const Exitbutton = () => {
    navigation.navigate("Topic");
    userPress.setVolume(1.0);
    userPress.play();
  };

  const Startbutton = () => {
    navigation.navigate("Game");
    userPress.setVolume(1.0);
    userPress.play();

    // start and stop bg music
    adven.stop();
    
    fight.setVolume(0.5);
    fight.play();
    fight.setNumberOfLoops(-1);
  }

  const topic = useSelector(state => state.topic.topic);

  const [topicChosen, setTopic] = useState(topic);
  const [learnSelectedTopic, pushLearn] = useState('');

  useEffect(() => {
    var fetchSelectedTopic = `http://10.0.2.2:3000/6bit/topics/${topic}`;
    console.log(topic);
    console.log(Index);

    fetch(fetchSelectedTopic)
      .then(response => response.json())
      .then(data => {
        pushLearn(data.data[`${topic}_Learning`]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  //   // WITHOUT INDEXING
  // return (
  //   <View style={styles.main}>

  //   <View style={styles.backgroundContainer}>
  //     <Image
  //       source={require('../../../media/Environment/topicLearningBackground.png')}
  //       resizeImage="stretch"
  //       style={styles.backdrop}/>
  //   </View>

  //   <View style={styles.leftbox}>
  //     <TouchableOpacity style={styles.button} onPress={Backbutton}>
  //       <Image
  //         source={require('../../../media/UI/previous.png')}
  //         resizeMode="contain"/>
  //     </TouchableOpacity>
  //   </View>

  //   <View style={styles.middlebox}>
  //     <ImageBackground
  //       source={require('../../../media/UI/topicLearningScroll.png')}
  //       resizeMode="contain"
  //       style={styles.leftbackdrop}/>

  //     <View style={styles.desc}>
  //       <Text style={{color: "black"}}>{learnSelectedTopic[0]}
  //       </Text>

  //     </View>
  //   </View>

  //   <View style={styles.rightbox}>
  //     <View style>
  //       <TouchableOpacity onPress={Forwardbutton}>
  //         <Image
  //           source={require('../../../media/UI/forward.png')}
  //           resizeMode="contain"/>
  //       </TouchableOpacity>
  //     </View>

  //     <View style={styles.exitbutton}>
  //       <TouchableOpacity style={styles.exitbutton} onPress={Exitbutton}>
  //         <Image
  //           source={require('../../../media/UI/exit.png')}
  //           resizeMode="contain"/>
  //       </TouchableOpacity>
  //     </View>
  //   </View>

  // </View>

  // );
  //   // WITHOUT INDEXING END

  if (Index === 0) {
    return (
      // <View>
      //     <TouchableHighlight onPress={setIndex(Index === 1)}>
      //       <Image source={require('../../../media/Environment/topicLearning1.png')} />
      //     </TouchableHighlight>
      // </View>
      <View style={styles.main}>

        <View style={styles.backgroundContainer}>
          <TouchableOpacity onPress={Forwardbutton}>
            <Image
              source={require('../../../media/Environment/topicLearning1.png')}
              resizeImage="stretch"
              style={styles.backdrop}/>
          </TouchableOpacity>
        </View>

      </View>
    );
  };

  if (Index === 1) {
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
            {/* <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}> PLACEHOLDER HERE!! </Text> */}
            <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}>{learnSelectedTopic[0]}</Text>

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

  if (Index === 2) {
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
            {/* <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}> PLACEHOLDER HERE!! </Text> */}
            <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}>{learnSelectedTopic[1]}</Text>

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

  if (Index === 3) {
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
            {/* <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}> PLACEHOLDER HERE!! </Text> */}
            <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}>{learnSelectedTopic[2]}</Text>

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

  if (Index === 4) {
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
            {/* <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}> PLACEHOLDER HERE!! </Text> */}
            <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}>{learnSelectedTopic[3]}</Text>

          </View>
        </View>

        <View style={styles.rightbox}>
          <View style>
          </View>

          <View style={styles.exitbutton}>
            <TouchableOpacity style={styles.exitbutton} onPress={Startbutton}>
              <Image
                source={require('../../../media/UI/start_v2.png')}
                resizeMode="contain"/>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  };

};



export default TopicLearning;

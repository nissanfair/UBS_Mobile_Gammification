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
import {useDispatch, useSelector,useStore} from 'react-redux';
import {styles} from './TopicIntroStyle';
import {setSelectedTimeState, setShowSummary , setTotal_Questions, set_answered_correctly, set_answered_wrongly, set_game_status, set_topic_selected} from "../../Redux/questionSlice"

// Import Music  
import press from '../../../media/Soundtracks/main/press.wav';
import fighting from '../../../media/Soundtracks/main/fighting.wav'
import Sound from 'react-native-sound';
import { adven } from '../homescreen';
import { AppState } from 'react-native';

//sfx
Sound.setCategory('Playback');

// This is the Fighting Music
export var fight = new Sound(fighting, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

// The button sound 
var userPress = new Sound(press, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

// end sfx

const Stack = createStackNavigator();

const TopicIntroduction = ({navigation}) => {
  const dispatch = useDispatch()
  // To substract away from the 
  const gamestate = useSelector((state) => state.question.gamestatus);
  const total_question = useSelector((state) => state.question.total_question);
  const answered_correctly = useSelector((state) => state.question.answered_correctly);
  const answered_wrongly = useSelector((state) => state.question.answered_wrongly);


  const Backbutton = () => {
    userPress.setVolume(1.0);
    userPress.play();
    navigation.navigate('Topic');
  };
  const Startbutton = () => {
    // At this point the Gamestatus is reset, reset the total number of questions , correct questions and wrong questions
    dispatch(setTotal_Questions(0))
    dispatch(set_answered_correctly(-answered_correctly))
    dispatch(set_answered_wrongly(-answered_wrongly))
    console.log(total_question)
    console.log(answered_correctly)
    console.log(answered_wrongly) 

    // Change status to running again
    dispatch(setSelectedTimeState("RUN")) //TRY, the problem is the thing thing is triggering 2 times
    dispatch(set_game_status("RUNNING"))
    navigation.navigate("Loading")

    // stop bg music
    adven.stop();

    //sfx for pressing
    userPress.setVolume(1.0);
    userPress.play();

    // start fighting music
    fight.setVolume(0.5);
    fight.play();
    fight.setNumberOfLoops(-1);
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
    // For JP phone 
    // var fetchSelectedTopic = `http://192.168.29.14:3000/6bit/topics/${topic}`;
    // For emulator 
    var fetchSelectedTopic = `http://10.0.2.2:3000/6bit/topics/${topic}`;
    // state.question.topicQuestionObject
    console.log(topic + " asdas I AM IN TOPIC INTRO");
    fetch(fetchSelectedTopic)
      .then(response => response.json())
      .then(data => {
        // pushing the intro here. We can add more stuff here then use redux accordingly
        pushIntro(data.data[`${topic}_Introduction`])
        dispatch(set_topic_selected(data.data[`${topic}_Questions`]))
      })
      .catch(error => {
        console.log(error);
      });
  });

  const [appState, setAppState] = useState(AppState.currentState);


  useEffect (() => {
    const handleAppStateChange = () => {
      console.log("Sound tEst "+appState)
      if (appState === 'active') {
        // App has come to the foreground
        // Start playing sound again
        fight.getCurrentTime((seconds) => {
          if (seconds != 0) {
            fight.setVolume(0.5);
            fight.play();
            fight.setNumberOfLoops(-1);
          }
        });
      } else if (appState === 'background' && appState==="inactive") {
        // App has gone to the background
        // Stop playing sound
        fight.pause();
      }
      setAppState(appState);
    };
    handleAppStateChange('change')
  },[appState])
  // useEffect(() => {
  //   AppState.addEventListener('change', handleAppStateChange);
  //   return () => {
  //     AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);

  
  // const handleAppStateChange = (nextAppState) => {
  //   if (nextAppState === 'active') {
  //     // App has come to the foreground
  //     // Start playing sound again
  //     fight.getCurrentTime((seconds) => {
  //       if (seconds != 0) {
  //         fight.setVolume(0.5);
  //         fight.play();
  //         fight.setNumberOfLoops(-1);
  //       }
  //     });
  //   } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
  //     // App has gone to the background
  //     // Stop playing sound
  //     fight.pause();
  //   }
  //   setAppState(nextAppState);
  // };

  return (
    <View style={styles.main}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require('../../../media/UI/windowscreen.png')}
          resizeImage="stretch"
          style={styles.backdrop}
        />
      </View>

      <View style={styles.leftbox}>
        <View>
                    <TouchableOpacity onPress={() => {navigation.navigate("Topic"); userPress.setVolume(1.0); userPress.play()}}>
                    <Image
                        source={require('../../../media/UI/back_v2.png')}
                        resizeMode="contain"
                        style={{height:"90%", width:"100%", top:"55%"}} />
                    </TouchableOpacity>

        </View>
      </View>

      <View style={styles.centerbox}>
       

          <View style={styles.topbox}>

            <View style={styles.lefttopbox}>
              
              <View style={styles.monsterbox}>
                <Image
                  source={topic == "Topic1" ? require('../../../media/sorcerer_lg.gif'):topic == "Topic2"? require('../../../media/Characters/Dark_Knight/dark_knight_sm.gif'):require('../../../media/slime.gif')}
                  resizeMode={topic == "Topic2"? "contain": "cover"}
                  style={ topic == "Topic1" ? styles.monster: styles.monsterr}
                />
                 <View style={styles.monstername}>
                <Text style={styles.textstyle}>Target</Text>
              </View>
                
              </View>
             

            </View>

            <View style={styles.righttopbox}>
              <View style={styles.reward}>
                <Text style={styles.textrewardheaderstyle}>Reward</Text>
                <Text style={styles.textrewardstyle}>E$15000</Text>
              </View>
            </View>
            
          </View>

          <View style={styles.bottombox}>
            <View style={styles.desc}>
              <Text
                style={styles.textdescheaderstyle}>
                Description
              </Text>
              <Text
                style={styles.textdescstyle}>
                {introSelectedTopic}
              </Text>
            </View>
          </View>

      </View>

      <View style={styles.rightbox}>
      
              <TouchableOpacity style={styles.button} onPress={Startbutton}>
                <Image
                  source={require('../../../media/UI/start_v2.png')}
                  resizeMode="contain"
                  style={{height:"90%", width:"100%",top:"46%"}}
                />
              </TouchableOpacity>
          
      </View>
    </View>
  );
};

export default TopicIntroduction;

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

const Stack = createStackNavigator();

const TopicIntroduction = ({navigation}) => {
  const dispatch = useDispatch()
  // To substract away from the 
  const gamestate = useSelector((state) => state.question.gamestatus);
  const total_question = useSelector((state) => state.question.total_question);
  const answered_correctly = useSelector((state) => state.question.answered_correctly);
  const answered_wrongly = useSelector((state) => state.question.answered_wrongly);


  const Backbutton = () => {
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
    dispatch(set_game_status("RUNNING"))
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
    // For JP phone 
    // var fetchSelectedTopic = `http://192.168.29.14:3000/6bit/topics/${topic}`;
    // For emulator
    var fetchSelectedTopic = `http://10.0.2.2:3000/6bit/topics/${topic}`;

    // state.question.topicQuestionObject
    console.log(topic);
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

  return (
    <View style={styles.main}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
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
        </View>
      </View>

      <View style={styles.centerbox}>
        <ImageBackground
          source={require('../../../media/UI/computer_screen.png')}
          resizeImage="contain"
          style={styles.backdrop}>

          <View style={styles.topbox}>

            <View style={styles.lefttopbox}>
              <View style={styles.monsterbox}>
                <Image
                  source={require('../../../media/sorcereridle_sm.gif')}
                  resizeMode="contain"
                  style={styles.monster}
                />
                <Text style={styles.textstyle}>Malware Wizard</Text>
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
        </ImageBackground>
      </View>

      <View style={styles.rightbox}>
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
  );
};

export default TopicIntroduction;

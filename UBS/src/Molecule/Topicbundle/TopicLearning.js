/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity, TouchableHighlight} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {styles} from './TopicLearnStyle';

const Stack = createStackNavigator();

// const TopicLearning = ({navigation}) => { //reference to homepage
const TopicLearning = () => {
  const navigation = useNavigation();

const[Index, setIndex] = useState(0);

  const Backbutton = () => {
  setIndex(Index - 1)
  };

  const Forwardbutton = () => {
    setIndex(Index + 1)
  };

  const Exitbutton = () => {
    navigation.navigate("Topic")
  };

  const Startbutton = () => {
    navigation.navigate("Game")
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

        var learnDict = data.data[`${topic}_Learning`]
        varLearnDictKeys = Object.keys(learnDict)
        console.log(varLearnDictKeys)
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
              source={require('../../../media/Environment/topicLearningBackground.png')}
              resizeImage="stretch"
              style={styles.backdrop}/>
          </TouchableOpacity>
        </View>

          <View style={styles.desc}>
              {/* <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}> PLACEHOLDER HERE!! </Text> */}
              <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}>{varLearnDictKeys[3]}</Text>
              <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}>{varLearnDictKeys[2]}</Text>
              <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}>{varLearnDictKeys[1]}</Text>
              <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}>{varLearnDictKeys[0]}</Text>
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

        <Image
            source={require('../../../media/Characters/LearningPartner/idle.gif')}
            resizeMode="contain"/>

          <ImageBackground
            source={require('../../../media/UI/topicLearningScroll.png')}
            resizeMode="contain"
            style={styles.leftbackdrop}/>

          <View style={styles.desc}>
            {/* <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}> PLACEHOLDER HERE!! </Text> */}
            <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}>{learnSelectedTopic['Origin of the Attack']}</Text>
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
            <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}>{learnSelectedTopic['Introducing the Attack']}</Text>

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
            <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}>{learnSelectedTopic['Common Types of Attacks']}</Text>

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
            <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}>{learnSelectedTopic['Avoid Falling Victim']}</Text>

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

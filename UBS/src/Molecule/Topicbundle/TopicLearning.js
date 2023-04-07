/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { styles } from './TopicLearnStyle';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import press from '../../../media/Soundtracks/main/press.wav';
import { fight } from './TopicIntroduction';
import { adven } from '../homescreen'
import Sound from 'react-native-sound';
import { AppState } from 'react-native';

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

  const [Index, setIndex] = useState(0);

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
    navigation.navigate("Education");
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
  const [displayText, setDisplayText] = useState('');
  const [currentPage, setPage] = useState(["Origin of the Attack","Introducing the Attack","Common Types of Attacks","Avoid Falling Victim"]);

  const typeWriter = (text, i) => {
     if (i < text.length) {
      setDisplayText(text.substring(0, i + 1));
       setTimeout(() => {
         typeWriter(text, i + 1);
       }, 5);
     }
   }
  useEffect(() => {
    var fetchSelectedTopic = `https://express-6bit.onrender.com/6bit/topics/${topic}`;
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

  // const [appState, setAppState] = useState(AppState.currentState);

  
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
  //       fight.setVolume(0.5);
  //       fight.play();
  //       fight.setNumberOfLoops(-1);
  //   } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
  //     // App has gone to the background
  //     // Stop playing sound
  //     fight.pause();
  //   }
  //   setAppState(nextAppState);
  // };


  //Keep track of the index 
  useEffect(() => {
    if(Index !=0){
      console.log(learnSelectedTopic[currentPage[Index-1]]);
      typeWriter(learnSelectedTopic[currentPage[Index-1]],0);
      
    }
    

    //setIsQuestionRendered(true);

  }, [Index]);

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
          <ImageBackground
            source={require('../../../media/Environment/LearningGround.png')}
            resizeImage="contain"
            style={styles.backdrop} />
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={Exitbutton}>
              <Image
                source={require('../../../media/UI/previous.png')}
                resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleText}>Learning About {learnSelectedTopic["Topic Name"]}</Text>
        </View>

        <View style={styles.middleContainer}>

          <View style={styles.firstContainer}>
            <Image
              source={require('../../../media/UI/origins_trans.gif')}
              resizeMode="contain"
              style={styles.origins} />
            <Text style={styles.textstyle}>Origins</Text>
          </View>

          <View style={styles.secondContainer}>
            <Image
              source={require('../../../media/UI/reading_trans.gif')}
              resizeMode="contain"
              style={styles.origins} />
            <Text style={styles.textstyle}>Introduction</Text>
          </View>

          <View style={styles.thirdContainer}>
            <Image
              source={require('../../../media/UI/Sword_trans.gif')}
              resizeMode="contain"
              style={styles.origins} />
            <Text style={styles.textstyle}>Common Attacks</Text>
          </View>

          <View style={styles.fourthContainer}>
            <Image
              source={require('../../../media/UI/Shield_trans.gif')}
              resizeMode="contain"
              style={styles.origins} />
            <Text style={styles.textstyle}>Protecting Ourselves</Text>
          </View>

        </View>

        <View style={styles.bottomContainer}>

          <ImageBackground
            source={require('../../../media/Environment/speech_box.png')}
            resizeImage="contain"
            style={styles.speechImage}>

            <View style={styles.avatar}>
              <Image
                source={require('../../../media/Characters/LearningPartner/orangeman.gif')}
                resizeMode="contain"
                style={styles.teacher} />
              <Text style={styles.avatarText}>Teacher</Text>
            </View>

            <View style={styles.speechBox}>
              <TouchableWithoutFeedback onPress={Forwardbutton}>
                <Text style={styles.speechText}>Hey Newbie, these are the topics you will learn about to better prepare for {learnSelectedTopic["Topic Name"]}. {"\n"}</Text>
                <Text style={styles.speechText}>Click Here To Continue.</Text>
              </TouchableWithoutFeedback>
            </View>

          </ImageBackground>

        </View>

      </View>
    );
  };

  if (Index === 1) {
    return (
      <View style={styles.main}>

        <View style={styles.backgroundContainer}>
          <Image
            source={require('../../../media/Environment/LearningGround.png')}
            resizeImage="stretch"
            style={styles.backdrop} />
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={Backbutton}>
              <Image
                source={require('../../../media/UI/previous.png')}
                resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleText}>Learning About {learnSelectedTopic["Topic Name"]}</Text>
        </View>

        <View style={styles.middleContainer}>
          <View style={styles.desc}>
            <Image
              source={require('../../../media/UI/origins_trans.gif')}
              resizeMode="contain"
              style={styles.origins} />
            <Text style={styles.textstyle}>Origins</Text>

          </View>
        </View>

        <View style={styles.bottomContainer}>

          <ImageBackground
            source={require('../../../media/Environment/speech_box.png')}
            resizeImage="contain"
            style={styles.speechImage}>
            <View style={styles.avatar}>
              <Image
                source={require('../../../media/Characters/LearningPartner/orangeman.gif')}
                resizeMode="contain"
                style={styles.teacher} />
              <Text style={styles.avatarText}>Teacher</Text>
            </View>

            <View style={styles.speechBox}>
              <TouchableWithoutFeedback onPress={Forwardbutton}>
                <Text style={styles.speechText}> {displayText} {"\n"}</Text>
                <Text style={styles.speechText}>Click Here To Continue.</Text>
              </TouchableWithoutFeedback>
            </View>

          </ImageBackground>

          <View style={styles.exitContainer}>
            <TouchableOpacity style={styles.exitbutton} onPress={Exitbutton}>
              <Image
                source={require('../../../media/UI/exit.png')}
                resizeMode="contain" />
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
            source={require('../../../media/Environment/LearningGround.png')}
            resizeImage="stretch"
            style={styles.backdrop} />
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={Backbutton}>
              <Image
                source={require('../../../media/UI/previous.png')}
                resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleText}>Learning About {learnSelectedTopic["Topic Name"]}</Text>
        </View>

        <View style={styles.middleContainer}>
          <View style={styles.desc}>
            {/* <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}> PLACEHOLDER HERE!! </Text> */}
            <Text style={{ color: "black", fontFamily: 'PressStart2P-Regular' }}></Text>
            <Image
              source={require('../../../media/UI/reading_trans.gif')}
              resizeMode="contain"
              style={styles.origins}
            />
            <Text style={styles.textstyle}>Introduction</Text>

          </View>
        </View>
        <View style={styles.bottomContainer}>


          <ImageBackground
            source={require('../../../media/Environment/speech_box.png')}
            resizeImage="contain"
            style={styles.speechImage}
          >
            <View style={styles.avatar}>
              <Image
                source={require('../../../media/Characters/LearningPartner/orangeman.gif')}
                resizeMode="contain"
                style={styles.teacher}
              />
              <Text style={styles.avatarText}>Teacher</Text>
            </View>

            <View style={styles.speechBox}>
              <TouchableWithoutFeedback onPress={Forwardbutton}>
                <Text style={styles.speechText}> {displayText} {"\n"}</Text>
                <Text style={styles.speechText}>Click Here To Continue.</Text>
              </TouchableWithoutFeedback>
            </View>


          </ImageBackground>


          <View style={styles.exitContainer}>
            <TouchableOpacity style={styles.exitbutton} onPress={Exitbutton}>
              <Image
                source={require('../../../media/UI/exit.png')}
                resizeMode="contain" />
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
            source={require('../../../media/Environment/LearningGround.png')}
            resizeImage="stretch"
            style={styles.backdrop} />
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={Backbutton}>
              <Image
                source={require('../../../media/UI/previous.png')}
                resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleText}>Learning About {learnSelectedTopic["Topic Name"]}</Text>
        </View>

        <View style={styles.middleContainer}>
          <View style={styles.desc}>
            <Image
              source={require('../../../media/UI/Sword_trans.gif')}
              resizeMode="contain"
              style={styles.origins}
            />
            <Text style={styles.textstyle}>Common Attacks</Text>

          </View>
        </View>
        <View style={styles.bottomContainer}>


          <ImageBackground
            source={require('../../../media/Environment/speech_box.png')}
            resizeImage="contain"
            style={styles.speechImage}
          >
            <View style={styles.avatar}>
              <Image
                source={require('../../../media/Characters/LearningPartner/orangeman.gif')}
                resizeMode="contain"
                style={styles.teacher}
              />
              <Text style={styles.avatarText}>Teacher</Text>
            </View>

            <View style={styles.speechBox}>
              <TouchableWithoutFeedback onPress={Forwardbutton}>
                <Text style={styles.speechText}> {displayText} {"\n"}</Text>
                <Text style={styles.speechText}>Click Here To Continue.</Text>
              </TouchableWithoutFeedback>
            </View>


          </ImageBackground>


          <View style={styles.exitContainer}>
            <TouchableOpacity style={styles.exitbutton} onPress={Exitbutton}>
              <Image
                source={require('../../../media/UI/exit.png')}
                resizeMode="contain" />
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
            source={require('../../../media/Environment/LearningGround.png')}
            resizeImage="stretch"
            style={styles.backdrop} />
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={Backbutton}>
              <Image
                source={require('../../../media/UI/previous.png')}
                resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleText}>Learning About {learnSelectedTopic["Topic Name"]}</Text>
        </View>

        <View style={styles.middleContainer}>
          <View style={styles.desc}>
            {/* <Text style={{color: "black", fontFamily: 'PressStart2P-Regular'}}> PLACEHOLDER HERE!! </Text> */}
      
            <Image
              source={require('../../../media/UI/Shield_trans.gif')}
              resizeMode="contain"
              style={styles.origins}
            />
            <Text style={styles.textstyle}>Protecting Ourselves</Text>

          </View>
        </View>
        <View style={styles.bottomContainer}>


          <ImageBackground
            source={require('../../../media/Environment/speech_box.png')}
            resizeImage="contain"
            style={styles.speechImage}
          >
            <View style={styles.avatar}>
              <Image
                source={require('../../../media/Characters/LearningPartner/orangeman.gif')}
                resizeMode="contain"
                style={styles.teacher}
              />
              <Text style={styles.avatarText}>Teacher</Text>
            </View>

            <View style={styles.speechBox}>

              <Text style={styles.speechText}> {displayText} {"\n"}</Text>

            </View>


          </ImageBackground>


          <View style={styles.exitContainer}>
            <TouchableOpacity style={styles.exitbutton} onPress={Exitbutton}>
              <Image
                source={require('../../../media/UI/exit.png')}
                resizeMode="contain" />
            </TouchableOpacity>
          </View>

        </View>

      </View>
    );
  };

};



export default TopicLearning;

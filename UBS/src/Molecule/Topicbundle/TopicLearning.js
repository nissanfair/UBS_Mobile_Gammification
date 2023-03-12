/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { styles } from './TopicLearnStyle';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const TopicLearning = () => {
  const navigation = useNavigation();

  // const TopicLearning = ({navigation}) => { //reference to homepage

  const [Index, setIndex] = useState(0);

  const Backbutton = () => {
    setIndex(Index - 1)
  };

  const Forwardbutton = () => {
    setIndex(Index + 1)
  };

  const Exitbutton = () => {
    navigation.navigate("Education")
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
              style={styles.origins}/>
            <Text style={styles.textstyle}>Origins</Text>
          </View>

          <View style={styles.secondContainer}>
            <Image
              source={require('../../../media/UI/reading_trans.gif')}
              resizeMode="contain"
              style={styles.origins}/>
            <Text style={styles.textstyle}>Introduction</Text>
          </View>

          <View style={styles.thirdContainer}>
            <Image
              source={require('../../../media/UI/Sword_trans.gif')}
              resizeMode="contain"
              style={styles.origins}/>
            <Text style={styles.textstyle}>Common Attacks</Text>
          </View>

          <View style={styles.fourthContainer}>
            <Image
              source={require('../../../media/UI/Shield_trans.gif')}
              resizeMode="contain"
              style={styles.origins}/>
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
                  style={styles.teacher}/>
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
              style={styles.origins}/>
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
                  style={styles.teacher}/>
                <Text style={styles.avatarText}>Teacher</Text>
              </View>

              <View style={styles.speechBox}>
                <TouchableWithoutFeedback onPress={Forwardbutton}>
                  <Text style={styles.speechText}> {learnSelectedTopic["Origin of the Attack"]} {"\n"}</Text>
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
                  <Text style={styles.speechText}> {learnSelectedTopic["Introducing the Attack"]} {"\n"}</Text>
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
                <Text style={styles.speechText}> {learnSelectedTopic["Common Types of Attacks"]} {"\n"}</Text>
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
          <Text style={{ color: "black", fontFamily: 'PressStart2P-Regular' }}>{learnSelectedTopic[0]}</Text>
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
              
                <Text style={styles.speechText}> {learnSelectedTopic["Avoid Falling Victim"]} {"\n"}</Text>
              
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

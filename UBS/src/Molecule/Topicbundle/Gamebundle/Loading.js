import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSelectedTimeState, setShowSummary, setTotal_Questions, set_answered_correctly, set_answered_wrongly, set_game_status } from "../../../Redux/questionSlice";
import Video from 'react-native-video';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useSelector, useStore } from 'react-redux';

const Loading = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const gamestate = useSelector((state) => state.question.gamestatus);
  const total_question = useSelector((state) => state.question.total_question);
  const answered_correctly = useSelector((state) => state.question.answered_correctly);
  const answered_wrongly = useSelector((state) => state.question.answered_wrongly);
  const topic = useSelector(state => state.topic.topic);


  useEffect(() => {
    // Wait for 4 seconds before routing to start the game
    const timer = setTimeout(() => {
      dispatch(setTotal_Questions(0))
      dispatch(set_answered_correctly(-answered_correctly))
      dispatch(set_answered_wrongly(-answered_wrongly))
      console.log(total_question)
      console.log(answered_correctly)
      console.log(answered_wrongly)

      // Change status to running again
      dispatch(set_game_status("RUNNING"))
      //   Replace 'StartGame' with the name of the screen you want to navigate to
      navigation.navigate('Game');
    }, 3000);

    // Clear the timer if the component is unmounted or the current health changes
    // return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* Replace 'video.mp4' with the name of your video file */}
      {topic === "Topic1" ? (
        <Video source={require('../../../../media/LoadingScreen1.mp4')} resizeMode="cover" style={styles.video} />
      ) : null}

      {topic === "Topic2" ? (
        <Video source={require('../../../../media/LoadingScreen2.mp4')} resizeMode="cover" style={styles.video} />
      ) : null}

      {topic === "Topic3" ? (
        <Video source={require('../../../../media/LoadingScreen3.mp4')} resizeMode="cover" style={styles.video} />
      ) : null}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    height: "100%",
    width: "100%"
  },
  video: {
    flex: 1,
  },
});

export default Loading;
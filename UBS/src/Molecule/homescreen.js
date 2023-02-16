import React, { useState, useEffect }  from 'react';
// import Sound from 'react-native-sound';
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image, TouchableHighlight} from 'react-native';


import adventure from '../../media/Soundtracks/main/adventure.wav'

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

var song = new Sound(adventure, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // when loaded successfully
  console.log('duration in seconds: ' + song.getDuration() + 'number of channels: ' + song.getNumberOfChannels());
})


const styles = StyleSheet.create({
    background : {
        width: "100%",
        height: "100%"
    }
})

export default function HomeScreen({navigation}) {
  const GoogleSSO = () => {
    navigation.navigate("Topic");
    song.setVolume(1);
      song.play(success => {
        if (success) {
          console.log('successfully finished playing');
        }
        else {
          console.log('playback failed due to audio decoding errors');
        }
      })
  }

  const playSong = () => {
    song.setVolume(1);
    song.play(success => {
      if (success) {
        console.log('successfully finished playing');
      }
      else {
        console.log('playback failed due to audio decoding errors');
      }
    })
  }

  useEffect(() => {
    playSong();
  }, [])

  return (
    <View onLoad={playSong}>
        <TouchableHighlight onPress={GoogleSSO}>
          <Image source={require("../../media/Environment/SSO.png")} style={styles.background} />
        </TouchableHighlight>
    </View>
  )
}

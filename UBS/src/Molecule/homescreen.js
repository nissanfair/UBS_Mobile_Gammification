import React, { useState, useEffect } from 'react'
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image, TouchableHighlight} from 'react-native';
import {styles} from '../Styling';
import adventure from '../../media/Soundtracks/main/adventure.wav';
import Sound from 'react-native-sound';
import { AppState } from 'react-native';

// const styles = StyleSheet.create({
//     background : {
//         width: "100%",
//         height: "100%"
//     }
// })

Sound.setCategory('Playback');

// export var adven = new Sound(adventure, (error) => {
//   if (error) {
//     console.log('failed to load the sound', error);
//     return;
//   }
// });

var adven;

export default function HomeScreen({navigation}) {
  const [activeScreen, setActiveScreen] = useState('');
  const [appState, setAppState] = useState(AppState.currentState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    adven = new Sound(adventure, (error) => {
      if (error) {
        console.log('Error loading sound: ', error);
      } else {
        console.log('Sound loaded successfully');
        setIsLoaded(true);
        adven.setVolume(0.5);
        adven.play();
        adven.setNumberOfLoops(-1);
      };
    }
    );
  }, []);


  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      // App has come to the foreground
      // Start playing sound again
        adven.getCurrentTime((seconds) => {
          if (seconds != 0) {
            adven.setVolume(0.5);
            adven.play();
            adven.setNumberOfLoops(-1);
          }
        });
    } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
      // App has gone to the background
      // Stop playing sound
      adven.pause();
    }
    setAppState(nextAppState);
  };
  
  const GoogleSSO = () => {
    navigation.navigate("MainScreen")
  }

  

  return (
    <View>
        <TouchableHighlight onPress={GoogleSSO}>
          <Image source={require("../../media/Environment/SSO.png")} style={styles.background} />
        </TouchableHighlight>
    </View>
  )
}


export { adven };
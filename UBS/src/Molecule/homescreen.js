import React from 'react'
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image, TouchableHighlight} from 'react-native';
import {styles} from '../Styling';
import adventure from '../../media/Soundtracks/main/adventure.wav';
import Sound from 'react-native-sound';

// const styles = StyleSheet.create({
//     background : {
//         width: "100%",
//         height: "100%"
//     }
// })
Sound.setCategory('Playback');

export var adven = new Sound(adventure, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});




export default function HomeScreen({navigation}) {
  const GoogleSSO = () => {
    navigation.navigate("Topic")
    adven.setVolume(0.5);
    adven.play();
    adven.setNumberOfLoops(-1);
  }

  return (
    <View>
        <TouchableHighlight onPress={GoogleSSO}>
          <Image source={require("../../media/Environment/SSO.png")} style={styles.background} />
        </TouchableHighlight>
    </View>
  )
}

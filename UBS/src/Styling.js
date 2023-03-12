import {StyleSheet} from 'react-native';
import {Dimensions, Platform, PixelRatio} from 'react-native';

// start of size mathing
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 500;

export function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'android') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}
// end of size mathing


const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
    },

    userBadge: {
      flex: 10
    },

    userBadgeTop:{
      flexDirection: "row", 
      alignContent: "flex-end", 
      alignItems: "center", 
      marginTop: "2%", 
      height: "10%"
    },

    userBadgeAlign:{
      marginLeft: "5%", 
      flex: 2
    },

    userBadgeColour:{
      marginRight: "5%", 
      flex: 2, 
      backgroundColor: "#FCD250", 
      height: "100%", 
      width: "100%", 
      borderRadius: 20, 
      alignContent: "center"
    },

    userBadgeCurrency: {
      width: "30%", 
      height: "100%", 
      borderRadius: 50, 
      backgroundColor: "#FFA100", 
      alignContent: "center", 
      alignItems: "center"
    },

    topicHome: {
      width: "100%", 
      marginTop: 10, 
      alignItems: 'center'
    },

    topicHome2: {
      flexDirection: 'row', 
      alignItems: 'center'
    },

    topicHomeAlign: {
      position: 'absolute', 
      bottom: "40%", 
      width: "100%", 
      alignItems: "center"
    },

    topicHomeFont: {
      fontFamily: 'PressStart2P-Regular',
      color: 'white',
      fontSize: normalize(5),
    },

    topicIntroIcon: {
      width: 300, 
      height: 80, 
      alignItems: "center", 
      alignContent: "center"
    },

    topicLearning: {
      width: '15%', 
      height: '50%'
    },

    topicLearningIcon: {
      height: 40, 
      width: 50
    },
    topicTab: {
      flexDirection: "row", 
      gap: "10%" 
    },

    topicTabAlign: {
      flex: 5
    },

    topicTabFont: {
      fontFamily: 'PressStart2P-Regular',
      color: 'white',
      alignSelf:"center",
      fontSize: normalize(9),
    },

    // topicLearning: {
    //   fontFamily: 'PressStart2P-Regular',
    //   color: 'white',
    //   alignSelf:"center",
    //   fontSize: normalize(10),
    // }, // still dependent on TopicLearnStyle.js

    // topicIntro: {
    //   fontFamily: 'PressStart2P-Regular',
    //   color: 'white',
    //   alignSelf:"center",
    //   fontSize: normalize(),
    // } // still dependent on TopicIntroStyle.js

});

export {styles};
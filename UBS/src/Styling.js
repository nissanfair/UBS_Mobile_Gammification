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
    background : {
        width: "100%",
        height: "100%",
    },

    topicHome: {
      fontFamily: 'PressStart2P-Regular',
      color: 'white',
      fontSize: normalize(5),
    },

    topicTabs: {
      fontFamily: 'PressStart2P-Regular',
      color: 'white',
      alignSelf:"center",
      fontSize: normalize(9),
    },

    topicLearning: {
      fontFamily: 'PressStart2P-Regular',
      color: 'white',
      alignSelf:"center",
      fontSize: normalize(10),
    }, // still dependent on TopicLearnStyle

    topicIntro: {
      fontFamily: 'PressStart2P-Regular',
      color: 'white',
      alignSelf:"center",
      fontSize: normalize(),
    } // still dependent on TopicLearnStyle

});

export {styles};
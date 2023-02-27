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
  if (Platform.OS === 'andriod') {
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

    topicDesc: {
      fontFamily: 'PressStart2P-Regular',
      color: 'white',
      fontSize: normalize(5),
    }

});

export {styles};